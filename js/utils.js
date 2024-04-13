/* eslint no-unused-vars: [2, { "vars": "local" }] */
// cSpell:ignore yxxx

/* This file contains only JS functions without dependencies on FC specific variables/conventions and do not rely on
 * custom functions outside this file
 */

/**
 * Returns whether x is defined. Port of SugarCube's def.
 * @param {any} x
 * @returns {boolean}
 */
function jsDef(x) {
	return !(typeof x === "undefined" || x === null || x === undefined);
}

/**
 * @template {PropertyKey} T
 * @param {Object.<T, number>} obj
 * @returns {T}
 */
function hashChoice(obj) {
	let randint = Math.floor(Math.random() * hashSum(obj));
	let ret;
	Object.keys(obj).some((key) => {
		if (randint < obj[key]) {
			ret = key;
			return true;
		} else {
			randint -= obj[key];
			return false;
		}
	});
	return ret;
}

/**
 * @param {Object.<PropertyKey, number>} obj
 * @returns {number}
 */
function hashSum(obj) {
	let sum = 0;
	Object.keys(obj).forEach((key) => {
		sum += obj[key];
	});
	return sum;
}

/**
 * @template {PropertyKey} T
 * @param {T[]} arr
 * @returns {Object.<T, number>}
 */
function arr2obj(arr) {
	/** @type {Object.<T, number>} */
	const obj = {};
	arr.forEach((item) => {
		obj[item] = 1;
	});
	return obj;
}

/**
 * @param {object} object
 * @param {PropertyKey[]} rest
 */
function hashPush(object, ...rest) {
	rest.forEach((item) => {
		if (object[item] === undefined) {
			object[item] = 1;
		} else {
			object[item] += 1;
		}
	});
}

/**
 * @param {Object.<PropertyKey, number>} obj
 * @param {Object.<PropertyKey, number>} other
 */
function hashMerge(obj, other) {
	Object.keys(other).forEach((key) => {
		if (obj[key] === undefined) {
			obj[key] = other[key];
		} else {
			obj[key] += other[key];
		}
	});
}

/**
 * @template {PropertyKey} T
 * @param {T[]} array
 * @returns {Object.<T, number>}
 */
function weightedArray2HashMap(array) {
	/** @type {Object.<T, number>} */
	const obj = {};
	array.forEach((item) => {
		if (obj[item] === undefined) {
			obj[item] = 1;
		} else {
			obj[item] += 1;
		}
	});
	return obj;
}

/**
 * generate a random, almost unique ID that is compliant (possibly) with RFC 4122
 *
 * @returns {string}
 */
function generateNewID() {
	let date = Date.now(); // high-precision timer
	let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		let r = (date + Math.random() * 16) % 16 | 0;
		date = Math.floor(date / 16);
		return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

/**
 * Swaps two values in an array.
 * @param {Array} array
 * @param {number} indexA
 * @param {number} indexB
 */
function arraySwap(array, indexA, indexB) {
	const tmp = array[indexA];
	array[indexA] = array[indexB];
	array[indexB] = tmp;
}

/**
 * @param {string} string
 * @returns {string}
 */
function capFirstChar(string) {
	return string.charAt(0).toUpperCase() + string.substr(1);
}

/**
 * @param {string} string
 * @returns {string}
 */
function uncapFirstChar(string) {
	return string.charAt(0).toLowerCase() + string.substr(1);
}

/**
 * @param {string} word
 * @returns {string}
 */
function addA(word) {
	let vocal = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
	if (vocal.includes(word.charAt(0))) {
		return `an ${word}`;
	}
	return `a ${word}`;
}

/**
 * Takes a number and appends the appropriate suffix.
 * Example: `ordinalSuffix(1)` gives `1st`.
 * @param {number} i
 * @returns {string}
 */
function ordinalSuffix(i) {
	let j = i % 10;
	let k = i % 100;
	if (j === 1 && k !== 11) {
		return `${i}st`;
	}
	if (j === 2 && k !== 12) {
		return `${i}nd`;
	}
	if (j === 3 && k !== 13) {
		return `${i}rd`;
	}
	return `${i}th`;
}

/**
 * @param {number} i
 * @returns {string}
 * Takes a number and returns the appropriate ordinal.
 * Example: `ordinalSuffix(1)` gives `first`.
 * For number greater than 19 identical to `ordinalSuffix(i)`
 */
function ordinalSuffixWords(i) {
	const text = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth"];
	if (i < text.length) {
		return text[i];
	}
	return ordinalSuffix(i);
}

/**
 * Takes an array and returns a new array without duplicate entries.
 * @template T
 * @param {Iterable<T>} array
 * @returns {T[]}
 */
function removeDuplicates(array) {
	return [...new Set(array)];
}

/**
 * Maps an index from one list onto a matching index on the other.
 * The first and last indexes will be matched to the first and last indexes of the other list,
 * while indexes in between will go to the nearest index.
 * @param {number} index The index in original list to map to new list.
 * @param {*} originalList The original list the index refers into.
 * @param {*} newList The new list which we want an index for
 * @returns {number} The new index into newList
 */
App.Utils.mapIndexBetweenLists = function(index, originalList, newList) {
	if (index === 0) { return 0; }
	if (index === originalList.length - 1) { return newList.length - 1; }
	index--;
	const originalLimitedLength = originalList.length - 2;
	const newLimitedLength = newList.length - 2;
	return Math.round((index / originalLimitedLength) * newLimitedLength) + 1;
};

/**
 * replaces special HTML characters with their '&xxx' forms
 * @param {string} text
 * @returns {string}
 */
App.Utils.escapeHtml = function(text) {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, m => map[m]);
};

App.Utils.expandHTML = (function() {
	const element = document.createElement("div");

	/**
	 * @param {string} s
	 * @returns {string}
	 */
	function expand(s) {
		element.innerHTML = s;
		return element.textContent;
	}

	return expand;
})();

/**
 * Creates an object where the items are accessible via their ids.
 *
 * @param {Iterable} list
 * @returns {{}}
 */
function mapIdList(list) {
	let mappedList = {};
	for (const item of list) {
		mappedList[item.id] = item;
	}
	return mappedList;
}

/**
 * Topological sorting algorithm
 * https://gist.github.com/shinout/1232505
 * Added keys parameter since it better suits our needs and updated to project code style.
 *
 * @template {PropertyKey} T
 * @param {T[]} keys
 * @param {T[][]} edges list of edges. each edge forms Array<ID,ID> e.g. [12, 3]
 * @returns {T[]} Array: topological sorted list of IDs
 * @throws Error: in case there is a closed chain.
 **/
App.Utils.topologicalSort = function(keys, edges) {
	class Node {
		/** @param {T} id */
		constructor(id) {
			this.id = id;
			/** @type {T[]} */
			this.afters = [];
		}
	}

	/** @type {Object.<T, Node>} */
	let nodes = {}; // hash: stringified id of the node => { id: id, afters: list of ids }
	let sorted = []; // sorted list of IDs ( returned value )
	/** @type {Object.<T, boolean>} */
	let visited = {}; // hash: id of already visited node => true

	// 1. build data structures
	keys.forEach(key => {
		nodes[key] = new Node(key);
	});

	edges.forEach(edge => {
		const from = edge[0];
		const to = edge[1];
		if (!nodes[from]) { nodes[from] = new Node(from); }
		if (!nodes[to]) { nodes[to] = new Node(to); }
		nodes[from].afters.push(to);
	});

	/** 2. topological sort with visitor
	 * @param {string} idStr
	 * @param {number[]} [ancestors]
	 */
	function visit(idStr, ancestors = []) {
		let node = nodes[idStr];
		let id = node.id;

		// if already exists, do nothing
		if (visited[idStr]) { return; }

		ancestors.push(id);

		visited[idStr] = true;

		node.afters.forEach((afterID) => {
			if (ancestors.indexOf(afterID) >= 0) { // if already in ancestors, a closed chain exists.
				throw new Error('closed chain : ' + afterID + ' is in ' + id);
			}

			visit(afterID.toString(), ancestors.map(v => v)); // recursive call
		});

		sorted.unshift(id);
	}
	Object.keys(nodes).forEach(node => visit(node));

	return sorted;
};

/**
 * Sorts an array of objects based on the order of the first array.
 * Sorts by values accessible by unsorted[key]
 * Values of the second array must be a subset of sorted
 *
 * @param {Array<any>} sorted
 * @param {Array<object>} unsorted
 * @param {string} key
 * @returns {Array<object>}
 */
function sortArrayByArray(sorted, unsorted, key) {
	const map = {};
	sorted.forEach((value, index) => {
		map[value] = index;
	});

	return unsorted.sort((a, b) => {
		return map[a[key]] - map[b[key]];
	});
}

/**
 * @param {object} target
 * @param {object} source
 */
function deepAssign(target, source) {
	_.merge(target, _.cloneDeep(source));
}

/**
 * Returns the median value for an array
 *
 * For more information about mean vs. median see
 * https://www.clinfo.eu/mean-median/
 * @param {number[]} arr Does not need to be sorted
 * @returns {number}
 */
function median(arr = []) {
	const mid = Math.floor(arr.length / 2);
	const numbers = [...arr].sort((a, b) => a - b);

	return arr.length % 2 === 0 ? (numbers[mid] + numbers[mid - 1]) / 2 : numbers[mid];
}

/**
 * Returns value for point x, computed assuming linear function defined
 * via two points (x0,y0) and (x1,y1)
 * @param {number} x
 * @param {number} x0
 * @param {number} y0
 * @param {number} x1
 * @param {number} y1
 * @returns {number}
 */
function linearInterpolation(x, x0, y0, x1, y1) {
	return y0 + (x - x0) * ((y1 - y0) / (x1 - x0));
}

/**
 * Convert a Blob to a base64 string
 * @param {Blob} blob
 */
async function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = (e) => reject(reader.error);
		reader.onloadend = (e) => {
			const dataUrl = /** @type {string} */ (reader.result);
			// remove mime type prefix from data url
			const base64 = dataUrl.substring(dataUrl.indexOf(',') + 1);
			resolve(base64);
		};
		reader.readAsDataURL(blob);
	});
}
