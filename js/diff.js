/**
 * The diff proxy records all changes to the original object without changing the original object while emulating the
 * changes for access from outside. The resulting diff object can then be applied on the original. The resulting object
 * is the same as if the changes were applied directly to the original object.
 *
 * NOTE: When doing any changes to this, rerun the tests cases at devNotes/tests.
 */
App.Utils.Diff = (function() {
	const deletedSymbol = Symbol("deleted property");

	/**
	 * @template {object} T
	 * @param {T} base
	 * @returns {FC.Util.DiffRecorder<T>}
	 */
	function getProxy(base) {
		const diff = {};

		/**
		 * @typedef {Array<string|symbol>} path
		 * Can only point to objects or arrays, never to primitives
		 */

		/**
		 * @param {path} path
		 * @returns {any}
		 */
		function localDiff(path) {
			let value = diff;
			for (const key of path) {
				if (key in value) {
					value = value[key];
				} else {
					return {};
				}
			}
			return value;
		}

		/**
		 * @param {path} path
		 * @param {string|symbol} prop
		 * @param {any} value
		 */
		function setDiff(path, prop, value) {
			let localDiff = diff;
			/**
			 * @type {object}
			 */
			let original = base;
			let originalLost = false; // True, if the original object does not have this path
			for (const key of path) {
				if (key in original) {
					original = original[key];
				} else {
					originalLost = true;
				}
				if (!(key in localDiff)) {
					if (originalLost) {
						// Should not happen
						throw new TypeError("Neither original nor diff have this property: " + path);
					}

					if (_.isArray(original)) {
						// clone arrays to make sure push, pop, etc. operations don't mess anything up later
						// Deep copy in case array entries get modified later
						localDiff[key] = _.cloneDeep(original);
					} else if (_.isObject(original)) {
						// TODO: check if there is a way to keep the data structure valid without the need for deep clone
						localDiff[key] = _.cloneDeep(original);
					}
				}
				localDiff = localDiff[key];
			}
			localDiff[prop] = value;
		}

		/**
		 * @template {object} T
		 * @param {T} target
		 * @param {path} path
		 * @returns {FC.Util.DiffRecorder<T>|T}
		 */
		function makeProxy(target, path) {
			if (target == null) { // intentionally ==
				return target;
			}

			if (_.isArray(target)) {
				return new Proxy(target, {
					get: function(o, prop) {
						if (prop === "diffOriginal") {
							return o;
						} else if (prop === "diffChange") {
							return localDiff(path);
						}

						const value = prop in localDiff(path) ? localDiff(path)[prop] : o[prop];
						if (typeof value === "function") {
							if (prop in localDiff(path)) {
								return value.bind(localDiff(path));
							}
							if (["push", "pop", "shift", "unshift", "splice", "fill", "reverse"].includes(prop)) {
								// Deep copy in case array entries get modified later
								const diffArray = _.cloneDeep(o);
								setDiff(path.slice(0, -1), path.last(), diffArray);
								return value.bind(diffArray);
							}
							return value.bind(o);
						}
						if (value === deletedSymbol) {
							return undefined;
						}
						return makeProxy(value, [...path, prop]);
					},
					set: function(o, prop, value) {
						setDiff(path, prop, value);
						return true;
					},
					deleteProperty: function(o, prop) {
						setDiff(path, prop, deletedSymbol);
						return true;
					}
				});
			}

			if (_.isObject(target)) {
				return new Proxy(target, {
					get: function(o, prop) {
						if (prop === "diffOriginal") {
							return o;
						} else if (prop === "diffChange") {
							return localDiff(path);
						}

						if (prop in localDiff(path)) {
							if (localDiff(path)[prop] === deletedSymbol) {
								return undefined;
							}
							return makeProxy(localDiff(path)[prop], [...path, prop]);
						}
						return makeProxy(o[prop], [...path, prop]);
					},
					set: function(o, prop, value) {
						setDiff(path, prop, value);
						return true;
					},
					deleteProperty: function(o, prop) {
						setDiff(path, prop, deletedSymbol);
						return true;
					}
				});
			}

			return target;
		}

		// base is an object, therefore makeProxy() returns FC.Util.DiffRecorder
		// @ts-ignore
		return makeProxy(base, []);
	}

	/**
	 * @template {object} T
	 * @param {T} base
	 * @param {Partial<T>} diff
	 */
	function applyDiff(base, diff) {
		for (const key in diff) {
			const value = diff[key];
			// @ts-ignore
			if (value === deletedSymbol) {
				delete base[key];
			} else if (!_.isObject(value)) {
				base[key] = value;
			} else if (_.isArray(value)) {
				base[key] = value;
			} else if (base[key] === undefined || base[key] === null) {
				base[key] = value;
			} else {
				applyDiff(base[key], value);
			}
		}
	}

	return {
		getProxy: getProxy,
		applyDiff: applyDiff,
	};
})();
