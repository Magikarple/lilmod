globalThis.profileEvents = (function() {
	let passageinit = 0;
	let passagestart = 0;
	let passagerender = 0;
	let passagedisplay = 0;
	let passageend = 0;

	/**
	 * @param {HTMLElement} container
	 */
	function render(container) {
		App.UI.DOM.appendNewElement("h2", container, "Passage Events Profiler");
		const p = document.createElement("p");
		p.classList.add("profile-events");
		row(p, ":passageinit", ":passagestart", "Copy State", passagestart - passageinit);
		row(p, ":passagestart", ":passagerender", "Render", passagerender - passagestart);
		row(p, ":passagerender", ":passagedisplay", "Display", passagedisplay - passagerender);
		row(p, ":passagedisplay", ":passageend", "Cleanup / Auto Save", passageend - passagedisplay);
		container.append(p);
	}

	function row(container, start, stop, desc, value) {
		App.UI.DOM.appendNewElement("div", container, `From ${start}`);
		App.UI.DOM.appendNewElement("div", container, `To ${stop}`);
		App.UI.DOM.appendNewElement("div", container, `(${desc})`);
		App.UI.DOM.appendNewElement("div", container, `${value}ms`);
	}

	return {
		passageinit: () => {
			if (V.profiler) {
				passageinit = performance.now();
			}
		},
		passagestart: () => {
			if (V.profiler) {
				passagestart = performance.now();
			}
		},
		passagerender: () => {
			if (V.profiler) {
				passagerender = performance.now();
			}
		},
		passagedisplay: () => {
			if (V.profiler) {
				passagedisplay = performance.now();
			}
		},
		/**
		 * @param {HTMLElement} content
		 */
		passageend: (content) => {
			if (V.profiler) {
				passageend = performance.now();
				render(content);
			}
		},
	};
})();
