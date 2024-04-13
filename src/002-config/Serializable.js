/**
 * The basic class for all classes that can be saved and loaded, i.e. serialized and deserialized.
 *
 * All subclasses HAVE to implement get className(), _cleanUpConfigScheme() and clone(),
 * in the SAME WAY they are implemented here.
 */
App.Entity.Serializable = class {
	/**
	 * Returns the name of the class including namespaces
	 *
	 * @returns {string}
	 */
	get className() { return "App.Entity.Serializable"; }

	/**
	 * Updates saved data in case of changes to the class.
	 *
	 * NOTE: new attributes do NOT need to be added here, as they are automatically added with default values.
	 *
	 * @param {object} config
	 * @protected
	 */
	static _cleanupConfigScheme(config) {
		// in subclasses _cleanupConfigScheme() must call
		// super._cleanupConfigScheme(config)
		// BC code
	}

	/**
	 * @returns {App.Entity.Serializable}
	 */
	clone() {
		return (new App.Entity.Serializable())._init(this);
	}

	/**
	 * @param {object} config
	 * @param {boolean} clean
	 * @returns {this}
	 * @protected
	 */
	_init(config, clean = false) {
		if (clean) {
			this.constructor._cleanupConfigScheme(config);
		}

		// Clone the given object's own properties into our own properties.
		deepAssign(this, config);

		// Return `this` to make usage easier.
		return this;
	}

	/**
	 * @returns {[]}
	 */
	toJSON() {
		// Return a code string that will create a new instance containing our
		// own data.
		//
		// NOTE: Supplying `this` directly as the `reviveData` parameter to the
		// `JSON.reviveWrapper()` call will trigger out of control recursion in
		// the serializer, so we must pass it a clone of our own data instead.
		const ownData = {};
		deepAssign(ownData, this);
		return JSON.reviveWrapper(`(new ${this.className}())._init($ReviveData$, true)`, ownData);
	}
};
