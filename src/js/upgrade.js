/** @implements {FC.IUpgrade} */
App.Upgrade = class Upgrade {
	/**
	 * @param {string} property The variable name of the property.
	 * @param {FC.IUpgradeTier[]} tiers A list of tiers available for the upgrade.
	 * @param {object} [object] Any object to attach the upgrade to, if not the default `V`.
	 */
	constructor(property, tiers, object = V) {
		/** @private */
		this._property = property;

		/** @private */
		this._div = document.createElement("div");
		/** @private @type {Object} */
		this._object = object || V;
		/** @private @type {FC.IUpgradeTier[]} */
		this._tiers = tiers;
	}

	/**
	 * Puts the different sections together into one passage.
	 *
	 * @private
	 * @returns {DocumentFragment}
	 */
	 _assemble() {
		const frag = new DocumentFragment();

		this.tiers.forEach(tier => {
			const {
				value, link, text, upgraded, handler, notes, prereqs, nodes,
			} = tier;

			const cost = Math.trunc(tier.cost) || 0;

			if ((!prereqs || prereqs.every(prereq => prereq === true)) &&
				_.isEqual(value, this._object[this._property])) {
				App.UI.DOM.appendNewElement("div", frag, text);

				if (link) {
					App.UI.DOM.appendNewElement("div", frag, makePurchase(link, cost, "capEx", {
						notes,
						handler: () => {
							this._object[this._property] = upgraded;

							if (handler) {
								handler();
							}
						},
					}));
				}

				if (nodes) {
					App.Events.addNode(frag, nodes);
				}
			}
		});

		return frag;
	}

	/**
	 * Renders the upgrade on-screen.
	 *
	 * @returns {HTMLDivElement}
	 */
	 render() {
		this._div.append(this._assemble());

		return this._div;
	}

	/**
	 * Refreshes the upgrade on-screen.
	 *
	 * @returns {void}
	 */
	 refresh() {
		App.UI.DOM.replace(this._div, this._assemble());
	}

	/**
	 * Adds new tiers to the upgrade.
	 *
	 * @param {FC.IUpgradeTier[]} tiers
	 * @returns {this}
	 */
	addTiers(...tiers) {
		this._tiers.push(...tiers);

		return this;
	}

	/**
	 * The variable name of the property.
	 *
	 * @returns {string}
	 */
	get property() {
		return this._property;
	}

	/**
	 * All tiers that are available.
	 *
	 * @returns {FC.IUpgradeTier[]}
	 */
	get tiers() {
		return this._tiers;
	}

	/**
	 * The object the upgrade is attached to.
	 *
	 * @returns {object}
	 */
	get object() {
		return this._object;
	}
};
