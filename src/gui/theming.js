App.UI.Theme = (function() {
	// NOTE: Due to browser limitations it is not possible to retrieve the path of selected files, only the filename.
	// We therefore expect all files to be located in the same directory as the HTML file. Selected files from somewhere
	// else will simply not be loaded or if a file in the correct place has the same name, it will be loaded instead.
	/** @type {HTMLLinkElement} */
	let currentThemeElement = null;

	return {
		selector: selector,
		loadTheme: loadTheme,
		init: loadFromStorage,
	};

	/**
	 * @returns {HTMLDivElement}
	 */
	function selector() {
		const div = document.createElement("div");

		const selector = document.createElement("input");
		selector.type = "file";
		selector.accept = ".css";
		div.append(selector);

		div.append(" ", App.UI.DOM.link("Load", () => {
			if (selector.files.length > 0) {
				const themeFile = selector.files[0];
				loadTheme(themeFile.name);
			}
		}), " ", App.UI.DOM.link("Unload", unloadTheme));

		return div;
	}

	/**
	 * @param {string} [filename] or filepath relative to the HTML file.
	 */
	function loadTheme(filename) {
		unloadTheme();
		if (filename) {
			SugarCube.storage.set("theme", filename);
			currentThemeElement = document.createElement("link");
			currentThemeElement.setAttribute("rel", "stylesheet");
			currentThemeElement.setAttribute("type", "text/css");
			currentThemeElement.setAttribute("href", `./${filename}`);
			// make it unique to force reloading instead of using the cached version
			currentThemeElement.href += `?id=${Date.now()}`;
			document.head.appendChild(currentThemeElement);
		}
	}

	/**
	 * Unloads the current theme
	 */
	function unloadTheme() {
		if (currentThemeElement !== null) {
			document.head.removeChild(currentThemeElement);
			currentThemeElement = null;
			SugarCube.storage.delete("theme");
		}
	}

	/**
	 * Loads a saved theme from browser storage
	 */
	function loadFromStorage() {
		const file = SugarCube.storage.get("theme");
		if (file !== null) {
			loadTheme(file);
		}
	}
})();
