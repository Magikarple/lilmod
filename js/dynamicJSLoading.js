App.Loader = (function() {
	/**
	 * Remember the last loaded script.
	 * @type {string}
	 */
	let lastScript = "";

	/**
	 * @param {string} name
	 * @param {string} path Relative to the HTML file
	 * @returns {HTMLScriptElement}
	 */
	function loadScript(name, path) {
		lastScript = name;

		const script = document.createElement("script");
		script.setAttribute("src", `${path}`);
		document.head.append(script);
		return script;
	}

	/**
	 * To make sure the scripts are loaded series, keep a queue of scripts to be loaded and only load the next once the
	 * previous one is finished.
	 *
	 * @see nextScript
	 *
	 * @type {Array<()=>void>}
	 */
	const scriptQueue = [];

	class Group {
		/**
		 * @param {string} path
		 */
		constructor(path) {
			this._path = path;
			this._scripts = [];

			group.set(path, this);
			scriptQueue.push(() => {
				this._scripts.push(loadScript(path, path + "/index.js"));
			});
		}

		/**
		 * Loads a script as part of this group
		 * @param {string} subPath relative to group path
		 */
		queueSubscript(subPath) {
			scriptQueue.push(() => {
				this._scripts.push(loadScript(subPath, this._path + "/" + subPath + ".js"));
			});
		}

		/**
		 * Removes all script elements belonging to this Group. Does not undo any changes these scripts did.
		 */
		unload() {
			for (const script of this._scripts) {
				document.head.removeChild(script);
			}
		}
	}

	/**
	 * @type {Map<string, Group>}
	 */
	const group = new Map();

	/**
	 * Loads the group located at path
	 *
	 * @param {string} path
	 */
	function loadGroup(path) {
		if (group.has(path)) {
			group.get(path).unload();
		}
		new Group(path);
	}

	/**
	 * Gives the group located at path
	 *
	 * @param {string} path
	 * @returns {Group}
	 */
	function getGroup(path) {
		return group.get(path);
	}

	function nextScript() {
		if (scriptQueue.length > 0) {
			scriptQueue.shift()();
		}
	}

	return {
		loadGroup: loadGroup,
		getGroup: getGroup,
		nextScript: nextScript,
		executeTests: () => {
			loadGroup("../tests");
			nextScript();
		},
		get lastScript() {
			return lastScript;
		},
		get hasNextScript() {
			return scriptQueue.length > 0;
		}
	};
})();


/**
 * Dedicated Modding API to abstract the loading mechanisms
 */
App.Modding = (function() {
	let loadingDone = false;
	/**
	 * @type {Mod}
	 */
	let currentMod = null;

	/**
	 * @type {string[]}
	 */
	let modsToLoad = [];

	/**
	 * @type {Mod[]}
	 */
	const loadedMods = [];

	class Mod {
		/**
		 * @param {string} directory where this mod is located relative to 'mods/'
		 */
		constructor(directory) {
			this._path = "./mods/" + directory;
			this.name = directory;
			this.version = "0";
			this.description = "";

			currentMod = this;
			loadedMods.push(this);

			App.Loader.loadGroup(this._path);
			App.Loader.nextScript();
		}

		/**
		 * @returns {string}
		 */
		get path() {
			return this._path;
		}

		/**
		 * @param {string} path
		 */
		addSubscript(path) {
			App.Loader.getGroup(this._path).queueSubscript(path);
		}
	}

	/**
	 * Loads the next subscript or mod
	 */
	function nextScript() {
		if (App.Loader.hasNextScript) {
			App.Loader.nextScript();
		} else if (modsToLoad.length > 0) {
			new Mod(modsToLoad.shift());
		} else {
			loadingDone = true;
		}
	}

	/**
	 * Load all mods
	 */
	function loadMods() {
		modsToLoad = loadModList();
		nextScript();
	}

	/**
	 * @returns {string[]} modList
	 */
	function loadModList() {
		return SugarCube.storage.get("modList") || [];
	}

	return {
		internal: {
			load: loadMods,
			/** @returns {string[]} modList */
			get modList() {
				return loadModList();
			},
			/** @param {string[]} modList */
			set modList(modList) {
				SugarCube.storage.set("modList", modList);
			},
			get loadedMods() {
				return loadedMods;
			},
			get done() {
				return loadingDone;
			}
		},
		scriptDone: nextScript,
		get currentMod() {
			return currentMod;
		},
	};
})();

App.UI.playerMods = function() {
	let modList = loadModList();
	const container = document.createElement("div");
	container.append(makeModSettings());
	return container;

	function makeModSettings() {
		const f = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", f, "Player mods");
		App.UI.DOM.appendNewElement("div", f, "Player mods are mods loaded from external files located at 'mods/'. If a mod does not exist loading will fail and never finish. Mods are save independent.");
		if (!App.Modding.internal.done) {
			f.append("Mods have not finished loading. ", App.UI.DOM.link("Refresh", () => {
				modList = loadModList();
				refresh();
			}));
		}
		App.UI.DOM.appendNewElement("h3", f, "Currently loaded mods");
		f.append(loadedList());
		App.UI.DOM.appendNewElement("h3", f, "Edit mod list");
		f.append(makeEditor());
		return f;
	}

	/**
	 * @returns {string[]}
	 */
	function loadModList() {
		if (App.Status.storyReady) {
			return App.Modding.internal.modList;
		} else {
			return [];
		}
	}

	function loadedList() {
		const loadedMods = App.Modding.internal.loadedMods;
		const div = document.createElement("div");
		div.classList.add("grid-3columns-auto");
		for (const mod of loadedMods) {
			App.UI.DOM.appendNewElement("div", div, mod.name);
			App.UI.DOM.appendNewElement("div", div, mod.version);
			App.UI.DOM.appendNewElement("div", div, mod.description);
		}
		return div;
	}

	function refresh() {
		$(container).empty().append(makeModSettings());
	}

	function makeEditor() {
		const div = document.createElement("div");
		div.append("Add new mod. Input the exact name of the directory for the mod at 'mods/': ",
			App.UI.DOM.makeTextBox("", name => {
				modList.push(name);
				refresh();
			}));

		App.UI.DOM.appendNewElement("div", div, "Mods are loaded from top to bottom.");

		const listDiv = document.createElement("div");
		for (let i = 0; i < modList.length; i++) {
			const row = document.createElement("div");
			row.append(up(i), " ", down(i), " ", remove(i), " ", modList[i]);
			listDiv.append(row);
		}
		div.append(listDiv);

		div.append(App.UI.DOM.link("Finalize (Will reload the game!)", () => {
			App.Modding.internal.modList = modList;
			window.location.reload();
		}));
		return div;
	}

	/**
	 * @param {number} index
	 * @returns {HTMLElement}
	 */
	function up(index) {
		if (index === 0) {
			return App.UI.DOM.makeElement("span", "Up", ["gray"]);
		}
		const button = App.UI.DOM.makeElement("a", "Up");
		button.onclick = () => {
			arraySwap(modList, index, index - 1);
			refresh();
		};
		return button;
	}

	/**
	 * @param {number} index
	 * @returns {HTMLElement}
	 */
	function down(index) {
		if (index === modList.length - 1) {
			return App.UI.DOM.makeElement("span", "Down", ["gray"]);
		}
		const button = App.UI.DOM.makeElement("a", "Down");
		button.onclick = () => {
			arraySwap(modList, index, index + 1);
			refresh();
		};
		return button;
	}

	/**
	 * @param {number} index
	 * @returns {HTMLElement}
	 */
	function remove(index) {
		const button = App.UI.DOM.makeElement("a", "Remove");
		button.onclick = () => {
			modList.splice(index, 1);
			refresh();
		};
		return button;
	}
};
