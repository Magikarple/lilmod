/**
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLDivElement}
 */
App.MainView.useFucktoy = function(slave) {
	const {him, his} = getPronouns(slave);

	const div = document.createElement("div");
	div.classList.add("note");

	div.append(App.Interact.ToyChest(slave));

	div.append(" In the coming week you plan to concentrate on ");

	if (slave.toyHole !== "all her holes") {
		div.append(`${his} ${slave.toyHole}`);
	} else {
		div.append(`all of ${his} holes equally`);
	}

	if (slave.fuckdoll === 0) {
		div.append(", but for now:");

		const showScene = (passage, ...args) => $(linkDiv).empty().append(App.Interact[passage](slave, ...args));

		const linkArray = [];

		linkArray.push(
			App.UI.DOM.link(`Use ${his} mouth`, showScene, ["fLips"]),
			App.UI.DOM.link(`Play with ${his} tits`, showScene, ["fBoobs"])
		);

		if (canDoVaginal(slave)) {
			linkArray.push(App.UI.DOM.link(`Fuck ${him}`, showScene, ["fVagina"]));
			if (canDoAnal(slave)) {
				linkArray.push(App.UI.DOM.link(`Use ${his} holes`, showScene, ["fButt"]));
			}
		}
		if (canDoAnal(slave)) {
			linkArray.push(App.UI.DOM.link(`Fuck ${his} ass`, showScene, ["fAnus"]));
		}
		if (canDoVaginal(slave) || canDoAnal(slave)) {
			if (slave.belly >= 300000) {
				linkArray.push(App.UI.DOM.link(`Fuck ${him} over ${his} belly`, showScene, ["fBellyFuck"]));
			}
		}
		if (slave.dick > 0 && !slave.chastityPenis) {
			if (V.experimental.interactions) {
				linkArray.push(App.UI.DOM.link(`Suck ${him}`, showScene, ["fSuckDick"]));
			}
		}
		if (canPenetrate(slave)) {
			linkArray.push(App.UI.DOM.link(`Ride ${him}`, showScene, ["fDick"]));
		}
		linkArray.push(App.UI.DOM.link(`Abuse ${him}`, showScene, ["fAbuse"]));

		const linkDiv = App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(linkArray), "indent");
	} else {
		div.append(".");
	}

	return div;
};

/**
 * @returns {HTMLDivElement}
 */
App.MainView.useGuard = function() {
	const guard = S.Bodyguard;

	const outerDiv = document.createElement("div");

	if (!guard || guard.assignment !== Job.BODYGUARD) {
		return outerDiv;
	}

	App.UI.DOM.appendNewElement("span", outerDiv, App.Interact.guardPose(guard), "scene-intro");

	const showScene = (passage, ...args) => $(linkDiv).empty().append(App.Interact[passage](guard, ...args));

	const {him, his} = getPronouns(guard);
	const linkArray = [];

	linkArray.push(
		App.UI.DOM.link(`Use ${his} mouth`, showScene, ["fLips"]),
		App.UI.DOM.link(`Play with ${his} tits`, showScene, ["fBoobs"])
	);

	if (canDoVaginal(guard)) {
		linkArray.push(App.UI.DOM.link(`Fuck ${him}`, showScene, ["fVagina"]));
		if (canDoAnal(guard)) {
			linkArray.push(App.UI.DOM.link(`Use ${his} holes`, showScene, ["fButt"]));
		}
	}
	if (canDoAnal(guard)) {
		linkArray.push(App.UI.DOM.link(`Fuck ${his} ass`, showScene, ["fAnus"]));
	}
	if (canDoVaginal(guard) || canDoAnal(guard)) {
		if (guard.belly >= 300000) {
			linkArray.push(App.UI.DOM.link(`Fuck ${him} over ${his} belly`, showScene, ["fBellyFuck"]));
		}
	}
	if (guard.dick > 0 && !guard.chastityPenis) {
		if (V.experimental.interactions) {
			linkArray.push(App.UI.DOM.link(`Suck ${him}`, showScene, ["fSuckDick"]));
		}
	}
	if (canPenetrate(guard)) {
		linkArray.push(App.UI.DOM.link(`Ride ${him}`, showScene, ["fDick"]));
	}
	linkArray.push(App.UI.DOM.passageLink(`Abuse ${him}`, "Gameover", () => { V.gameover = "idiot ball"; }));
	const linkDiv = App.UI.DOM.appendNewElement("div", outerDiv, App.UI.DOM.generateLinksStrip(linkArray), "indent");

	return outerDiv;
};

App.MainView.full = function() {
	/**
	 * @returns {DocumentFragment}
	 */
	function errors() {
		const fragment = document.createDocumentFragment();

		/**
		 * @returns {HTMLParagraphElement}
		 */
		function newError() {
			const error = document.createElement("p");
			fragment.append(error);
			return error;
		}

		// check for correct version
		if (V.releaseID >= 1000 || ["0.9", "0.8", "0.7", "0.6"].includes(V.ver)) {
			if (V.releaseID < App.Version.release) {
				newError().append(App.UI.DOM.makeElement("span", "INCOMPATIBILITY WARNING:", "major-warning"),
					` Your saved game was created using version: ${V.ver}, build: ${V.releaseID}. You must run `,
					App.UI.DOM.passageLink("Backwards Compatibility", "Backwards Compatibility"));
			}
		} else {
			newError().append(App.UI.DOM.makeElement("span", "INCOMPATIBLE SAVE WARNING:", "major-warning"),
				` Your saved game was created using version: ${V.ver}, and you are using a later version which New Game Plus cannot reconcile. Please start a new game.`);
		}

		// check for correct rules
		if (V.defaultRules.length > 0 && (V.defaultRules[0].condition === undefined || V.defaultRules[0].set === undefined)) {
			const error = newError();
			error.append(App.UI.DOM.makeElement("span", "INCOMPATIBILITY WARNING:", "major-warning"),
				" The rules assistant format has changed. In the Options Menu, please ");
			const ra = document.createElement("strong");
			ra.append("Reset RA Rules");
			error.append(ra);
		}

		// check for NaN
		if (V.NaNArray.length > 0) {
			const error = newError();
			error.id = "NaNArray";
			error.append(App.UI.DOM.makeElement("span", "ERROR: The following variables are NaN! Please report this.", "error"));
			V.NaNArray.forEach(e => {
				const div = document.createElement("div");
				div.append(e);
				error.append(div);
			});
			error.append(App.UI.DOM.link("Hide NaN variables until next week",
				() => {
					error.outerHTML = "";
					V.NaNArray = [];
				})
			);
		}

		// check custom slaves
		if (App.Utils.IsCustomSlaveMutated(V.customSlave)) {
			newError().append(App.UI.DOM.makeElement("span", "ERROR: Your custom slave order has taken on a mutated life of its own and has been summarily shot. Refile your custom slave order, if necessary, and notify the appropriate authorities if you see this message again.", "error"));
			V.customSlave = new App.Entity.CustomSlaveOrder();
		}
		if (App.Utils.IsCustomSlaveMutated(V.huskSlave)) {
			newError().append(App.UI.DOM.makeElement("span", "ERROR: Your husk slave order has taken on a mutated life of its own and has been summarily shot. Refile your husk slave order, if necessary, and notify the appropriate authorities if you see this message again.", "error"));
			V.huskSlave = new App.Entity.CustomSlaveOrder();
		}

		return fragment;
	}

	/**
	 * All main passage logic that should be performed at the beginning of the passage but generate no visual output.
	 */
	function cleanup() {
		if (V.tabChoice.SlaveInteract !== "Description") {
			V.tabChoice.SlaveInteract = "Description";
		}

		penthouseCensus();
		V.costs = Math.trunc(calculateCosts.predict());
		if (V.defaultRules.length > 0) {
			V.currentRule = V.defaultRules[0].ID;
		} else {
			V.currentRule = null;
		}
		SlaveSort.slaves(V.slaves);

		App.UI.SlaveList.ScrollPosition.restore();
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function mainMenu() {
		const div = document.createElement("div");

		const links = [];

		App.UI.DOM.appendNewElement("h2", div, `Main Menu`, ['margin-top', 'uppercase', 'center']);

		if (V.rulesAssistantMain) {
			const RALink = App.UI.DOM.passageLink("Rules Assistant Options", "Rules Assistant");

			RALink.append(' ', App.UI.DOM.makeElement("span", App.UI.Hotkeys.hotkeys("Rules Assistant"), "hotkey"));
			links.push(RALink);

			if (V.rulesAssistantAuto !== 1) {
				links.push(App.UI.DOM.link(`Apply Rules Assistant at week end`, () => {
					V.rulesAssistantAuto = 1;

					App.UI.reload();
				}));
			} else {
				links.push(App.UI.DOM.link(`Stop applying Rules Assistant at week end`, () => {
					V.rulesAssistantAuto = 0;

					App.UI.reload();
				}));
			}

			links.push(App.UI.DOM.link(`Re-apply Rules Assistant now`, () => {
				for (const slave of V.slaves) {
					if (assignmentVisible(slave) && slave.useRulesAssistant === 1) {
						DefaultRules(slave);
					}
				}

				App.UI.reload();
			}, null, '', `This will only check slaves in the Penthouse.`));
		}

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['center', 'margin-bottom']);

		return div;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function useFucktoys() {
		const fragment = document.createDocumentFragment();
		for (const slave of V.slaves) {
			if (slave.assignment !== Job.FUCKTOY) {
				continue;
			}
			fragment.append(App.MainView.useFucktoy(slave));
		}
		return fragment;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function walkPast() {
		const outerDiv = document.createElement("div");
		outerDiv.id = "walkpast";

		const slave = V.slaves.filter(s => ![Job.BODYGUARD, Job.FUCKTOY].includes(s.assignment) && (!getPersonalAttention(s.ID, "torture") || onBedRest(V.PC, true))).random();
		if (slave) {
			App.UI.DOM.appendNewElement("span", outerDiv, globalThis.walkPast(slave), "scene-intro");
		}

		return outerDiv;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function assemble() {
		const fragment = new DocumentFragment();

		App.UI.DOM.appendNewElement("h1", fragment, V.arcologies[0].name, ['margin-bottom', 'center']);

		if (V.newModelUI === 1) {
			fragment.append(V.building.render());
		}

		if (V.seeArcology === 1) {
			fragment.append(App.Desc.playerArcology(
				App.UI.DOM.passageLink("Hide", "Main", () => { V.seeArcology = 0; })));
		}

		if (V.seeDesk === 1) {
			fragment.append(App.Desc.officeDescription(
				App.UI.DOM.passageLink("Hide", "Main", () => { V.seeDesk = 0; })));
		}

		if (V.seeFCNN === 1) {
			const div = document.createElement("div");
			div.classList.add("main-fcnn");
			div.append(App.FCNN.getText(), App.UI.DOM.passageLink("Hide", passage(), () => { V.seeFCNN = 0; })
			);
			fragment.append(div);
		}

		fragment.append(mainMenu());

		fragment.append(App.UI.SlaveList.penthousePage());

		if (V.fucktoyInteractionsPosition === 0) {
			fragment.append(useFucktoys());
		}
		if (V.useSlaveSummaryOverviewTab === 0) {
			fragment.append(App.MainView.useGuard());
		}
		fragment.append(walkPast());

		return fragment;
	}

	const fragment = document.createDocumentFragment();

	fragment.append(errors());

	// wrap everything in a try/catch statement, so App.MainView.errors() always gets shown. At the end print error out
	// as well.
	try {
		cleanup();

		fragment.append(assemble());
	} catch (ex) {
		fragment.append(App.UI.DOM.formatException(ex));
	}

	return fragment;
};
