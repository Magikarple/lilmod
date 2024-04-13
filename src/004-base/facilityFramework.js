/**
 * Creates the facility passage for a facility.
 *
 * Not to be confused with `App.Entity.Facilities.Facility`, which handles the logic.
 */
App.Facilities.Facility = class Facility {
	/**
	 * @param {App.Entity.Facilities.Facility} facility The instance form of the facility. Typically found in `App.Entity.facilities`.
	 * @param {function():void} decommissionHandler
	 */
	constructor(facility, decommissionHandler) {
		this.facility = facility;

		/** @private */
		this._div = document.createElement("div");
		/** @private @type {Array<function():HTMLDivElement>} */
		this._sections = [];
		/** @private @type {FC.IUpgrade[]} */
		this._upgrades = [];
		/** @private @type {FC.Facilities.Rule[]} */
		this._rules = [];

		this._addUpgrades(...this.upgrades);
		this._addRules(...this.rules);

		this._addSections(
			() => this._makeIntro(decommissionHandler),
			() => this._makeExpand(),
			() => this._makeUpgrades(),
			() => this._makeRules(),
			() => this._makeCustomNodes(),
			() => this._makeMenials(),
			() => this._makeStats(),
			() => this._makeAds(),
			() => this._makeSlaves(),
			() => this._makeRename(),
		);
	}

	/**
	 * Puts the different sections together into one passage.
	 *
	 * @private
	 * @returns {DocumentFragment}
	 */
	_assemble() {
		const frag = new DocumentFragment();

		this._sections.forEach(section => frag.append(App.UI.DOM.makeElement("div", section(), ['margin-bottom'])));

		return frag;
	}

	/**
	 * Renders the facility on-screen.
	 *
	 * @returns {HTMLDivElement}
	 */
	render() {
		this._div.append(this._assemble());

		return this._div;
	}

	/**
	 * Refreshes the facility on-screen.
	 *
	 * @returns {void}
	 */
	refresh() {
		App.UI.DOM.replace(this._div, this._assemble());
	}

	/**
	 * Adds new sections to the facility passage.
	 *
	 * @param {...function():HTMLDivElement} args
	 *
	 * @private
	 * @returns {void}
	 */
	_addSections(...args) {
		this._sections.push(...args);
	}

	/**
	 * Adds new purchaseable upgrades.
	 * @param {...FC.IUpgrade} upgrades
	 *
	 * @private
	 * @returns {void}
	 */
	_addUpgrades(...upgrades) {
		this._upgrades.push(...upgrades);
	}

	/**
	 * Adds new rules able to be set by the player.
	 * @param {...FC.Facilities.Rule} rules
	 *
	 * @private
	 * @returns {void}
	 */
	_addRules(...rules) {
		this._rules.push(...rules);
	}

	/**
	 * Sets up the intro scene.
	 *
	 * @param {function():void} decommissionHandler
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeIntro(decommissionHandler) {
		const div = document.createElement("div");

		App.UI.DOM.appendNewElement("h1", div, this.facility.nameCaps);
		App.UI.DOM.appendNewElement("div", div, this.intro, ['scene-intro']);

		if (this.facility.totalEmployeesCount === 0) {
			div.append(App.UI.DOM.makeElement("div", App.UI.DOM.passageLink(`Decommission ${this.facility.name}`, "Main", decommissionHandler), ['indent']));
		}

		return div;
	}

	/**
	 * Allows the facility to be expanded.
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeExpand() {
		const div = document.createElement("div");
		// TODO: rework once all facilities are objects
		const capacity = typeof V[this.facility.desc.baseName] === 'object'
			? V[this.facility.desc.baseName].capacity
			: V[this.facility.desc.baseName];
		const occupancy = this.facility.hostedSlaves();
		const maximum = this.expand.maximum || Number.MAX_SAFE_INTEGER;
		const amount = this.expand.amount;
		const desc = this.expand.desc ||
			`${this.facility.nameCaps} can support ${this.facility.capacity} slaves. There ${this.facility.hostedSlaves() === 1 ? `is` : `are`} currently ${numberWithPluralOne(this.facility.hostedSlaves(), "slave")} here.`;
		const baseCost = 1000 * V.upgradeMultiplierArcology;
		const cost = this.expand.cost || capacity * baseCost;

		div.append(desc);
		if (!this.expand.unexpandable) {
			if (this.expand.maximum) {
				App.UI.DOM.appendNewElement("div", div, `${this.facility.nameCaps} can support a maximum of ${num(maximum)} slaves.`);
			}
			if (capacity < maximum) {
				if (amount) {
					App.UI.DOM.appendNewElement("div", div,
						makePurchase(`Expand slave capacity.`, cost, "capEx", {
							notes: [`increases the capacity of ${this.facility.name} by ${num(amount)}.`],
							handler: () => { expandFacility(amount, cost); }
						})
					);
				} else {
					const link = document.createElement("span");
					const upgrades = [10, 25, 50, 100];
					const available = maximum ? upgrades.filter(s => maximum - occupancy >= s) : upgrades;
					const options = [];
					for (const expand of available) {
						// cost per level follows an arithmetic series; each level costs `5 * baseCost` MORE than the previous level
						// sum of n terms of an arithmetic series is computed as Sn = (n/2)(2a+(n-1)d), where a is the first term being considered and d is the common difference
						const level = expand / 5;
						const exCost = Math.trunc((level / 2) * (2 * cost + (level - 1) * 5 * baseCost));
						const f = new DocumentFragment();
						f.append(App.UI.DOM.link(`x${expand}`, () => {
							expandFacility(expand, exCost);
						}));
						App.Events.addNode(f, [` (${cashFormatColor(exCost)})`]);
						options.push(f);
					}
					link.append(App.UI.DOM.generateLinksStrip(options));

					const linkArray = [];
					App.UI.DOM.appendNewElement("div", div);
					App.Events.addNode(div, [`Expanding ${this.facility.name} by ${num(5)} slots will cost ${cashFormatColor(Math.trunc(cost))}: `]);
					linkArray.push(App.UI.DOM.link(`x5`, () => {
						expandFacility(5, Math.trunc(cost));
					}));
					if (options.length > 0) {
						linkArray.push(App.UI.DOM.linkReplace(`Additional options`, link));
					}
					div.append(App.UI.DOM.generateLinksStrip(linkArray));
				}
			}
		}

		if (this.facility.totalEmployeesCount > 0) {
			App.UI.DOM.appendNewElement("div", div, this.expand.removeAll || removeFacilityWorkers(this.facility, this.expand.removeManager, this.expand.removeSlave), ['indent']);
		}

		const expandFacility = (num, price) => {
			if (typeof V[this.facility.desc.baseName] === 'object') {		// TODO: change this once all facilities are objects
				V[this.facility.desc.baseName].capacity += num;
			} else {
				V[this.facility.desc.baseName] += num;
			}
			V.PC.skill.engineering += 0.1;
			cashX(-price, "capEx");

			App.UI.reload();
		};

		return div;
	}

	/**
	 * Allows the facility to be upgraded.
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeUpgrades() {
		const div = document.createElement("div");

		if (this.upgrades.length > 0) {
			App.UI.DOM.appendNewElement("h2", div, `Upgrades`);

			this._upgrades.forEach(u => {
				const upgrade = new App.Upgrade(u.property, u.tiers, u.object);

				div.append(upgrade.render());
			});
		}

		return div;
	}

	/**
	 * Allows rules to be set up in the facility.
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeRules() {
		const div = document.createElement("div");

		if (this.rules.length > 0 && this.rules.some(rule => rule.prereqs.every(prereq => prereq === true))) {
			App.UI.DOM.appendNewElement("h2", div, `Rules`);

			this._rules.forEach(rule => {
				if (rule.prereqs.every(prereq => prereq === true)) {
					const options = new App.UI.OptionsGroup();
					const option = options.addOption(null, rule.property, rule.object || V);

					rule.options.forEach(o => {
						if (!o.prereqs || o.prereqs.every(prereq => prereq === true)) {
							option.addValue(o.link, o.value);
							if (o.handler) {
								option.addCallback(o.handler);
							}
							if (o.note) {
								option.addComment(o.note);
							}

							if ((rule.object && _.isEqual(rule.object[rule.property], o.value)) ||
								_.isEqual(V[rule.property], o.value)) {
								App.UI.DOM.appendNewElement("div", div, o.text);
							}
						}
					});

					App.UI.DOM.appendNewElement("div", div, options.render(), ['margin-bottom']);
				}

				if (rule.nodes) {
					App.Events.addNode(div, rule.nodes);
				}
			});
		}

		return div;
	}

	/**
	 * Creates any custom nodes and adds them to the facility.
	 *
	 * Custom nodes are always placed between the rules section and the menial slaves section (or where they would be).
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeCustomNodes() {
		const div = document.createElement("div");

		if (this.customNodes) {
			this.customNodes.forEach(node => div.append(node));
		}

		return div;
	}

	/**
	 * Allows menial slaves to be bought, sold, and assigned to the facility.
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeMenials() {
		const div = document.createElement("div");

		if (this.menials) {
			App.UI.DOM.appendNewElement("h2", div, `Menials`);
			App.UI.DOM.appendNewElement("div", div, this.menials, ['margin-bottom']);
		}

		return div;
	}

	/**
	 * Displays a table with statistics relating to the facility.
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeStats() {
		const div = document.createElement("div");

		if (this.stats) {
			App.UI.DOM.appendNewElement("h2", div, `Statistics`);
			App.UI.DOM.appendNewElement("div", div, this.stats, ['margin-bottom']);
		}

		return div;
	}

	/**
	 * Adds a section for managing advertisements to the facility.
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeAds() {
		const div = document.createElement("div");

		if (this.ads) {
			App.UI.DOM.appendNewElement("h2", div, `Advertising`);
			App.UI.DOM.appendNewElement("div", div, this.ads, ['margin-bottom']);
		}

		return div;
	}

	/**
	 * Displays a list of slaves that can be assigned and removed.
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeSlaves() {
		const div = document.createElement("div");

		App.UI.DOM.appendNewElement("h2", div, `Slaves`);
		App.UI.DOM.appendNewElement("div", div, this.slaves || App.UI.SlaveList.stdFacilityPage(this.facility, true), ['margin-bottom']);

		App.UI.SlaveList.ScrollPosition.restore();

		return div;
	}

	/**
	 * Adds a textbox allowing the facility to be renamed.
	 *
	 * @private
	 * @returns {HTMLDivElement}
	 */
	_makeRename() {
		const div = document.createElement("div");

		App.UI.DOM.appendNewElement("h2", div, `Rename`);
		App.UI.DOM.appendNewElement("div", div, App.Facilities.rename(this.facility, () => this.refresh()));

		return div;
	}

	// Getters and Setters

	// Getters that returns a nullish type are used for type checking and autocompletion.

	/**
	 * The text displayed in the intro scene.
	 *
	 * @returns {string}
	 */
	get intro() {
		return null;
	}

	/**
	 * The facility description in the intro scene.
	 *
	 * @returns {string}
	 */
	get decorations() {
		return null;
	}

	/**
	 * Adds an option to expand the facility.
	 *
	 * Describes how many slaves are in the facility out of how many are supported by default.
	 *
	 * @returns {FC.Facilities.Expand}
	 */
	get expand() {
		return {};
	}

	/**
	 * Any upgrades available for purchase.
	 *
	 * @returns {FC.IUpgrade[]}
	 */
	get upgrades() {
		return [];
	}

	/**
	 * Any rules able to be set.
	 *
	 * @returns {FC.Facilities.Rule[]}
	 */
	get rules() {
		return [];
	}

	/**
	 * Any menials that are able to be assigned.
	 *
	 * @returns {HTMLDivElement}
	 */
	get menials() {
		return null;
	}

	/**
	 * Any statistics table to display.
	 *
	 * @returns {HTMLDivElement}
	 */
	get stats() {
		return null;
	}

	/**
	 * Any advertisements to display.
	 *
	 * @returns {HTMLDivElement}
	 */
	get ads() {
		return null;
	}

	/**
	 * Any slave selection menu to display.
	 *
	 * Uses the standard list if not defined.
	 *
	 * @returns {HTMLDivElement}
	 */
	get slaves() {
		return null;
	}

	/**
	 * Allows for the addition of any custom nodes to the facility.
	 *
	 * @returns {Array<HTMLDivElement|DocumentFragment>}
	 */
	get customNodes() {
		return [];
	}
};
