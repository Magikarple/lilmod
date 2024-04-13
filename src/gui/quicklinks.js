/**
 * Generate a list of links the player can safely jump to.
 *
 * Tags are:
 * jump-to-safe: Allow to jump to this passage from anywhere
 * jump-from-safe: Allow to jump from this passage to anywhere
 * hidden: Allows to jump to via history, but does not show up in the quick links menu; use together with jump-to-safe
 * no-history: Do not record history for this passage, act as if was never opened; mutually exclusive with the jump tags
 *
 * @returns {string|HTMLParagraphElement}
 */
App.UI.quickMenu = (function() {
	// setup passage lists
	const jumpFrom = Story.lookup("tags", "jump-from-safe").map(passage => passage.title);
	const jumpTo = Story.lookup("tags", "jump-to-safe").map(passage => passage.title);
	const hidden = Story.lookup("tags", "jump-hidden").map(passage => passage.title);
	const noHistory = Story.lookup("tags", "no-history").map(passage => passage.title);

	// if property name is a passage name, then it's a link, otherwise only text.
	// category titles are never links to passages
	// Only two values are allowed: true or an object following the same rules
	const layout = addOtherCategory({
		Main: true,
		Manage: {
			"Manage Penthouse": true,
			"Manage Arcology": true,
			"Manage Personal Affairs": true,
			"Manage Corporation": true,
			"Personal assistant options": true,
			"Firebase": true,
			"propagandaHub": true,
			"securityHQ": true,
			"secBarracks": true,
			"riotControlCenter": true,
		},
		Social: {
			"Future Society": true,
			"Policies": true,
			"edicts": true,
			"Universal Rules": true,
			"Neighbor Interact": true,
		},
		Facilities: {
			"Head Girl Suite": true,
			"BG Select": true,
			"Brothel": true,
			"Club": true,
			"Arcade": true,
			"Dairy": true,
			"Farmyard": true,
			"Servants' Quarters": true,
			"Master Suite": true,
			"Schoolroom": true,
			"Spa": true,
			"Nursery": true,
			"Clinic": true,
			"Cellblock": true,
			"Incubator": true,
			"Pit": true,
		},
		Locations: {
			"Gene Lab": true,
			"Dispensary": true,
			"Dressing Room": true,
			"Organ Farm": true,
			"Implant Manufactory": true,
			"Prosthetic Lab": true,
			"Wardrobe": true,
			"Toy Shop": true,
			"Media Studio": true,
			"The Black Market": true,
		},
		Tools: {
			"Find Slave": true,
			"Underperforming Slaves": true,
			"Rules Assistant": true,
			"Personal Attention Select": true,
		},
		Options: {
			"Options": true,
			"Summary Options": true,
			"Description Options": true,
			"Hotkey Settings": true,
		}
	});

	// true means hidden
	const hiddenPassages = cleanPassageMapping({
		"Arcade": () => !V.arcade,
		"BG Select": () => !V.dojo,
		"Brothel": () => !V.brothel,
		"Cellblock": () => !V.cellblock,
		"Clinic": () => !V.clinic,
		"Club": () => !V.club,
		"Dairy": () => !V.dairy,
		"Dispensary": () => !V.dispensary,
		"edicts": () => V.secExpEnabled <= 0,
		"Farmyard": () => !V.farmyard,
		"Firebase": () => !V.SF.Toggle || V.SF.Toggle < 1 || V.SF.Active < 1,
		"Future Society": () => !V.FSAnnounced,
		"Gene Lab": () => !V.geneticMappingUpgrade,
		"Toy Shop": () => !V.toyShop,
		"Media Studio": () => !V.studio,
		"Head Girl Suite": () => !V.HGSuite,
		"Implant Manufactory": () => !V.ImplantProductionUpgrade,
		"Incubator": () => V.incubator.capacity === 0,
		"Manage Corporation": () => V.corp.Announced !== 1,
		"Master Suite": () => !V.masterSuite,
		"Neighbor Interact": () => V.arcologies.length === 0,
		"Nursery": () => !V.nursery,
		"Organ Farm": () => !V.organFarmUpgrade,
		"Pit": () => !V.pit,
		"propagandaHub": () => V.secExpEnabled === 0 || !V.SecExp.buildings.propHub,
		"Prosthetic Lab": () => V.researchLab.level === 0,
		"riotControlCenter": () => V.secExpEnabled === 0 || !V.SecExp.buildings.riotCenter,
		"Schoolroom": () => !V.schoolroom,
		"secBarracks": () => V.secExpEnabled === 0 || !V.SecExp.buildings.barracks,
		"securityHQ": () => V.secExpEnabled === 0 || !V.SecExp.buildings.secHub,
		"Servants' Quarters": () => !V.servantsQuarters,
		"Spa": () => !V.spa,
		"The Black Market": () => V.rep < 10000,
		"Weapons Manufacturing": () => true,
	});

	// show different names than the actual passage name, can be a function
	const uiNames = cleanPassageMapping({
		"Arcade": () => App.Entity.facilities.arcade.UIName,
		"BG Select": "Armory",
		"Brothel": () => App.Entity.facilities.brothel.UIName,
		"Cellblock": () => App.Entity.facilities.cellblock.UIName,
		"Clinic": () => App.Entity.facilities.clinic.UIName,
		"Club": () => App.Entity.facilities.club.UIName,
		"Dairy": () => App.Entity.facilities.dairy.UIName,
		"Dispensary": "Pharmaceutical Fabricator",
		"edicts": "Edicts",
		"Farmyard": () => App.Entity.facilities.farmyard.UIName,
		"Find Slave": "Locate Slave",
		"Firebase": () => `${capFirstChar(V.SF.Lower || "No one")}'s Firebase`,
		"Future Society": "Future Societies",
		"Head Girl Suite": () => App.Entity.facilities.headGirlSuite.UIName,
		"Incubator": () => App.Entity.facilities.incubator.UIName,
		"Master Suite": () => App.Entity.facilities.masterSuite.UIName,
		"Neighbor Interact": "Diplomacy",
		"Nursery": () => App.Entity.facilities.nursery.UIName,
		"Options": "Game Options",
		"Personal assistant options": "Personal Assistant",
		"Personal Attention Select": "Personal Attention",
		"Pit": () => App.Entity.facilities.pit.UIName,
		"propagandaHub": "Manage PR",
		"riotControlCenter": "Manage Rebels",
		"Schoolroom": () => App.Entity.facilities.schoolroom.UIName,
		"secBarracks": "Manage Military",
		"securityHQ": "Manage Security",
		"Servants' Quarters": () => App.Entity.facilities.servantsQuarters.UIName,
		"Spa": () => App.Entity.facilities.spa.UIName,
		"The Black Market": "Black Market",
	});

	// extra information behind the link, is a function
	const f = App.Entity.facilities;
	const extraInfo = cleanPassageMapping({
		"Arcade": () => occupancy(f.arcade),
		"BG Select": () => occupancy(f.armory),
		"Brothel": () => occupancy(f.brothel),
		"Cellblock": () => occupancy(f.cellblock),
		"Clinic": () => occupancy(f.clinic),
		"Club": () => occupancy(f.club),
		"Dairy": () => occupancy(f.dairy),
		"Farmyard": () => occupancy(f.farmyard),
		"Head Girl Suite": () => occupancy(f.headGirlSuite),
		"Incubator": () => occupancy(f.incubator),
		"Master Suite": () => occupancy(f.masterSuite),
		"Nursery": () => occupancy(f.nursery),
		"Pit": () => occupancy(f.pit),
		"Schoolroom": () => occupancy(f.schoolroom),
		"Servants' Quarters": () => occupancy(f.servantsQuarters),
		"Spa": () => occupancy(f.spa),
	});

	// true shows a notification symbol
	const notifications = cleanPassageMapping({
		"Future Society": () => FutureSocieties.availCredits() > 0 || V.FSReminder,
		"Incubator": () => V.incubator.capacity > 0 && V.incubator.readySlaves > 0,
		"Manage Corporation": () => V.corp.SpecToken > 0 && V.corp.SpecTimer === 0,
	});

	/**
	 * The DOM element of name of the currently played passage or any of its parents. Used during generation to
	 * expand the category with the current passage.
	 * @type {HTMLElement}
	 */
	let currentPassage;
	/**
	 * DOM elements that have a notification. Used to traverse upwards to give the categories notifications too.
	 * @type {Array<HTMLElement>}
	 */
	let notificationPassages;

	let hotkeysEnabled = false;

	// register hotkeys
	// this is in its own scope as we can forget the hotkeys object immediately afterwards
	{
		// setup hotkeys list, upper/lower case is important!
		const hotkeys = cleanPassageMapping({
			"BG Select": "b",
			"Buy Slaves": "s",
			"edicts": "shift+e",
			"Firebase": "z",
			"Future Society": "f",
			"Main": "m",
			"Manage Arcology": "c",
			"Manage Corporation": "shift+c",
			"Manage Penthouse": "p",
			"Manage Personal Affairs": "x",
			"Neighbor Interact": "d",
			"Options": "o",
			"Personal assistant options": "t",
			"Personal Attention Select": "a",
			"Policies": "y",
			"propagandaHub": "shift+h",
			"Recruiter Select": "u",
			"riotControlCenter": "shift+r",
			"Rules Assistant": "r",
			"secBarracks": "shift+a",
			"securityHQ": "shift+s",
			"Universal Rules": "v",
			"Find Slave": "l",
			// Facilities
			"Brothel": "1",
			"Club": "2",
			"Arcade": "3",
			"Dairy": "4",
			"Farmyard": "5",
			"Servants' Quarters": "6",
			"Master Suite": "7",
			"Schoolroom": "8",
			"Spa": "9",
			"Nursery": "0",
			"Clinic": "shift+1",
			"Cellblock": "shift+2",
			"Incubator": "shift+3",
			"Pit": "shift+4",
		});

		// register
		for (const passage of jumpTo) {
			if (!hidden.includes(passage) ||
				// some passages may be hidden, but still accessible through hotkeys
				hotkeys.hasOwnProperty(passage)) {
				const action = {
					callback: () => {
						if (hotkeysEnabled &&
							// we are not already on the passage
							State.passage !== passage &&
							// the passage is accessible
							!(hiddenPassages[passage] && hiddenPassages[passage]())) {
							Engine.play(passage);
						}
					},
					combinations: [],
				};
				// add hotkey if there is one
				if (hotkeys[passage]) {
					action.combinations.push(hotkeys[passage]);
				}
				// custom ui text
				if (uiNames[passage]) {
					action.uiName = uiNames[passage];
				}
				App.UI.Hotkeys.add(passage, action);
			}
		}
	}

	// setup history
	let history = [];
	let historyNavigation = false;
	$(document).on(':passageinit', event => {
		// if navigated here normally, add passage to history, otherwise remove last entry from history
		if (!historyNavigation) {
			if (State.passage === event.passage.title || // reloaded
				noHistory.includes(State.passage) || // came from a no-history passage
				noHistory.includes(event.passage.title) // no history for this passage
			) {
				return;
			}
			// if last passage can be jumped to add passage to history, otherwise clear history
			if (jumpTo.includes(State.passage)) {
				history.unshift(State.passage);
			} else {
				history = [];
			}
		} else {
			historyNavigation = false;
			history.shift();
		}
	});
	App.UI.Hotkeys.add("historyBack", {callback: goBack, combinations: ["backspace"], uiName: "Back in history"});

	/**
	 * Goes back in history if possible.
	 */
	function goBack() {
		if (history.length > 0 && jumpFrom.includes(State.passage)) {
			historyNavigation = true;
			Engine.play(history[0]);
		}
	}

	/**
	 * Add a "Return" link at second position if there is a history.
	 * @param {Array<HTMLElement>} linkList
	 */
	function addBackLink(linkList) {
		if (history.length > 0) {
			const div = document.createElement("div");
			div.classList.add("menu-link");
			const a = document.createElement("a");
			a.append("Return");
			a.onclick = goBack;
			const hotkey = App.UI.Hotkeys.hotkeys("historyBack");
			if (hotkey !== "") {
				div.append(a, " ", App.UI.DOM.makeElement("span", hotkey, "hotkey"));
			}
			// insert at second position
			linkList.splice(1, 0, div);
		}
	}

	/**
	 * Generate a quick menu
	 * @returns {string|HTMLParagraphElement}
	 */
	function generateMenu() {
		if (!jumpFrom.includes(State.passage)) {
			hotkeysEnabled = false;
			return "";
		}
		hotkeysEnabled = true;
		currentPassage = null;
		notificationPassages = [];

		const p = document.createElement("p");
		p.classList.add("quick-links");

		try {
			// quick menu
			const links = generateLinkList(layout);

			if (V.debugMode) {
				addCategory(links, "Hidden", hidden.reduce((acc, cur) => {
					acc[cur] = true;
					return acc;
				}, {}));
			}

			addBackLink(links);
			p.append(...links);

			// traverse from current passage up to expand.
			if (currentPassage !== null) {
				while (!currentPassage.classList.contains("quick-links")) {
					currentPassage.classList.remove("collapsed");
					currentPassage = currentPassage.parentElement;
				}
			}

			// traverse from notifications up to add icon
			for (let i = 0; i < notificationPassages.length; i++) {
				while (!notificationPassages[i].classList.contains("quick-links")) {
					if (notificationPassages[i].classList.contains("category")) {
						notificationPassages[i].classList.add("notification");
					}
					notificationPassages[i] = notificationPassages[i].parentElement;
				}
			}
		} catch (e) {
			console.error(e);
			p.append("Quick Links generation failed. Please run ", App.UI.DOM.passageLink("Backwards Compatibility", "Backwards Compatibility"));
		}

		return p;
	}

	/**
	 * Create a list of links and/or categories based on the given category
	 *
	 * @param {object} category
	 * @returns {Array<HTMLElement>}
	 */
	function generateLinkList(category) {
		/** @type {Array<HTMLElement>} */
		const links = [];
		for (const passage in category) {
			if (category[passage] === true) {
				addMenuLink(links, passage);
			} else {
				addCategory(links, passage, category[passage]);
			}
		}
		return links;
	}

	/**
	 * Add a category to a link list
	 *
	 * @param {Array<HTMLElement>} outerLinkList
	 * @param {string} name
	 * @param {object} category
	 */
	function addCategory(outerLinkList, name, category) {
		const innerLinkList = generateLinkList(category);
		if (innerLinkList.length === 0) {
			// category is empty
			return;
		}
		const toggle = document.createElement("button");
		toggle.classList.add("toggle");
		toggle.append(name);
		const content = document.createElement("div");
		content.classList.add("content");
		content.append(...innerLinkList);

		// wrap everything in one div, so we can control collapsing by changing only one class
		const wrapper = document.createElement("div");
		wrapper.classList.add("category", "collapsed");
		toggle.onclick = () => {
			wrapper.classList.toggle("collapsed");
		};
		wrapper.append(toggle, content);
		outerLinkList.push(wrapper);
	}

	/**
	 * Create a link to the given passage and add it to the link list if link is accessible.
	 *
	 * @param {Array<HTMLElement>} linkList
	 * @param {string} passage
	 */
	function addMenuLink(linkList, passage) {
		// passage is hidden
		if (hiddenPassages.hasOwnProperty(passage) && hiddenPassages[passage]()) {
			return;
		}
		// we show some kind of text/link
		const div = document.createElement("div");
		linkList.push(div);
		div.classList.add("menu-link");
		// this passage has a notification
		if (notifications[passage] && notifications[passage]()) {
			notificationPassages.push(div);
			div.classList.add("notification");
		}
		// there is additional non-link info
		if (extraInfo[passage]) {
			div.append(" ", extraInfo[passage]());
		}
		// we are already on this passage
		if (State.passage === passage) {
			div.prepend(uiName(passage));
			currentPassage = div;
			return;
		}
		// That is not a passage we can safely jump to, it's a deco element
		if (!jumpTo.includes(passage)) {
			div.prepend(uiName(passage));
			return;
		}
		// Create link
		const a = document.createElement("a");
		a.append(uiName(passage));
		a.onclick = () => {
			Engine.play(passage);
		};
		div.prepend(a);
		const hotkeyString = App.UI.Hotkeys.hotkeys(passage);
		if (hotkeyString !== "") {
			div.append(" ", App.UI.DOM.makeElement("span", hotkeyString, "hotkey"));
		}
	}

	/**
	 * Gives back the proper name for the passage or the passage title itself if there is none
	 *
	 * @param {string} passage
	 * @returns {string}
	 */
	function uiName(passage) {
		if (uiNames[passage]) {
			if (typeof uiNames[passage] === "function") {
				return uiNames[passage]();
			}
			return uiNames[passage];
		}
		return passage;
	}

	/**
	 * Adds an "Other" category to a given layout consisting of passages that can be jumped to not sorted into the
	 * existing layout.
	 *
	 * @param {object} layout
	 * @returns {object}
	 */
	function addOtherCategory(layout) {
		const passages = jumpTo.slice();

		// filter out passages used in layout
		filterPassages(passages, layout);

		// filter out hidden passages
		for (let i = 0; i < hidden.length; i++) {
			const index = passages.indexOf(hidden[i]);
			if (index > -1) {
				passages.splice(index, 1);
			}
		}

		// Other category
		if (passages.length > 0) {
			const other = {};
			for (let i = 0; i < passages.length; i++) {
				other[passages[i]] = true;
			}
			layout.Other = other;
		}
		return layout;
	}

	/**
	 * Remove all entries from a given list that exist as keys in a given layout.
	 *
	 * @param {Array<string>} passages
	 * @param {object} layout
	 */
	function filterPassages(passages, layout) {
		for (const category in layout) {
			if (layout[category] === true) {
				const index = passages.indexOf(category);
				if (index > -1) {
					passages.splice(index, 1);
				}
			} else {
				filterPassages(passages, layout[category]);
			}
		}
	}

	/**
	 * @param {App.Entity.Facilities.Facility} facility
	 * @returns {string}
	 */
	function occupancy(facility) {
		const desc = facility.occupancyReport(V.abbreviateSidebar === 2);
		if (desc === "") {
			return "";
		}
		return `(${desc})`;
	}

	/**
	 * Cleans out all mappings that are not contained in jumpTo and therefore not considered safe.
	 *
	 * @param {object} keys
	 * @returns {object}
	 */
	function cleanPassageMapping(keys) {
		const result = {};
		for (const key in keys) {
			if (jumpTo.includes(key)) {
				result[key] = keys[key];
			} else {
				console.log("Found mapping to unsafe passage: " + key + " to " + keys[key]);
			}
		}
		return result;
	}

	return generateMenu;
})();
