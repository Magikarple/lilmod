App.Ads = {};
App.Ads.Categories = {};

/* Ad categories can classify individual slaves into many values, but at the facility level they get reduced to positive, zero, and negative to see whether the ads were effective */

App.Ads.Categories.age = {
	varSuffix: "Old",

	classifySlave: function(slave) {
		if (isYoung(slave)) {
			if (slave.physicalAge >= 18) {
				return -1; // young adult
			} else if (slave.physicalAge >= 13) {
				return -2; // teen
			} else {
				return -3; // loli
			}
		}
		return 1; // mature
	},

	classifyLocalPreference: function() {
		if ((FutureSocieties.isActive('FSMaturityPreferentialist')) && (V.arcologies[0].FSMaturityPreferentialist >= 80)) {
			return 1; // mature
		} else if ((FutureSocieties.isActive('FSYouthPreferentialist')) && (V.arcologies[0].FSYouthPreferentialist >= 80)) {
			return -1; // young
		}
		return 0;
	}
};

App.Ads.Categories.assetSize = {
	varSuffix: "Stacked",

	classifySlave: function(slave) {
		if (isStacked(slave)) {
			return 1;
		} else if (isSlim(slave)) {
			return -1;
		} else {
			return 0;
		}
	},

	classifyLocalPreference: function() {
		if ((FutureSocieties.isActive('FSAssetExpansionist')) && (V.arcologies[0].FSAssetExpansionist >= 80)) {
			return 1; // stacked
		} else if ((FutureSocieties.isActive('FSSlimnessEnthusiast')) && (V.arcologies[0].FSSlimnessEnthusiast >= 80)) {
			return -1; // slim
		}
		return 0;
	}
};

App.Ads.Categories.assetOrigin = {
	varSuffix: "Implanted",

	classifySlave: function(slave) {
		if (isSurgicallyImproved(slave)) {
			return 1;
		} else if (isPure(slave)) {
			return -1;
		}
		return 0;
	},

	classifyLocalPreference: function() {
		if ((FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSTransformationFetishist >= 80)) {
			return 1; // implanted
		} else if ((FutureSocieties.isActive('FSBodyPurist')) && (V.arcologies[0].FSBodyPurist >= 80)) {
			return -1; // natural
		}
		return 0;
	}
};

App.Ads.Categories.mods = {
	varSuffix: "Modded",

	classifySlave: function(slave) {
		if (SlaveStatsChecker.isModded(slave)) {
			return 1;
		} else if (SlaveStatsChecker.isUnmodded(slave)) {
			return -1;
		}
		return 0;
	},

	classifyLocalPreference: function() {
		if ((FutureSocieties.isActive('FSDegradationist')) && (V.arcologies[0].FSDegradationist >= 80)) {
			return 1; // modded
		} else if ((FutureSocieties.isActive('FSBodyPurist')) && (V.arcologies[0].FSBodyPurist >= 80)) {
			return -1; // natural
		}
		return 0;
	}
};

App.Ads.Categories.preg = {
	varSuffix: "Preg",

	classifySlave: function(slave) {
		if (isPreg(slave)) {
			return 1;
		} else if (isNotPreg(slave)) {
			return -1;
		}
		return 0;
	},

	classifyLocalPreference: function() {
		if ((FutureSocieties.isActive('FSRepopulationFocus')) && (V.arcologies[0].FSRepopulationFocus >= 80)) {
			return 1; // pregnant
		} else if ((FutureSocieties.isActive('FSRestart')) && (V.arcologies[0].FSRestart >= 80)) {
			return -1; // non-pregnant
		}
		return 0;
	}
};

App.Ads.Categories.genitalia = {
	varSuffix: "XX",

	classifySlave: function(slave) {
		if (slave.dick === 0 && slave.vagina > -1) {
			return 1; // pussies, no dicks
		} else if (slave.dick > 0) {
			return -1; // dicks, pussies optional
		}
		return 0; // null?
	},

	classifyLocalPreference: function() {
		if ((FutureSocieties.isActive('FSGenderFundamentalist')) && (V.arcologies[0].FSGenderFundamentalist >= 80)) {
			return 1; // pussies, no dicks
		} else if ((FutureSocieties.isActive('FSGenderRadicalist')) && (V.arcologies[0].FSGenderRadicalist >= 80)) {
			return -1; // dicks, pussies optional
		}
		return 0;
	}
};

/** Returns all the ad categories in the system. */
App.Ads.getAllCategories = function() {
	return _.values(App.Ads.Categories);
};

/** categorizes a girl in all the categories and returns the total categories in which she matches the advertisements */
App.Ads.getMatchedCategoryCount = function(slave, facility) {
	let matchedCategories = 0;

	for (const cat of App.Ads.getAllCategories()) {
		const result = cat.classifySlave(slave);
		if (result === V[`${facility}Ads${cat.varSuffix}`]) {
			++matchedCategories;
		}
	}

	return matchedCategories;
};

/** Manages the ads for a facility. Use example: adMgr = new App.Ads.AdManager("brothel") */
App.Ads.AdManager = class {
	constructor(facility) {
		this.varPrefix = `${facility}Ads`;
		this.totalSlaves = 0;
		this.missedBonuses = 0;
		for (const cat of App.Ads.getAllCategories()) {
			this[`tally${cat.varSuffix}`] = new Map();
		}
	}

	/** categorizes a girl in all the categories and adds the results to the running totals */
	tallySlave(slave) {
		++this.totalSlaves;
		for (const cat of App.Ads.getAllCategories()) {
			const result = cat.classifySlave(slave);
			this[`tally${cat.varSuffix}`].set(result, (this[`tally${cat.varSuffix}`].get(result) || 0) + 1);
		}
	}

	_coalesceTally(category) {
		const catMap = this[`tally${category.varSuffix}`];
		let neg = 0;
		let pos = 0;
		for (let [key, tally] of catMap) {
			if (key < 0) {
				neg += tally;
			} else if (key > 0) {
				pos += tally;
			} /* index == 0 is deliberately ignored */
		}
		return {neg, pos};
	}

	/** returns -1 if the majority of the girls have a negative value, +1 if the majority of the girls have a positive value, and 0 otherwise */
	slavesMajority(category) {
		const {neg, pos} = this._coalesceTally(category);
		if (neg > this.totalSlaves * 0.5) {
			return -1;
		} else if (pos > this.totalSlaves * 0.5) {
			return +1;
		} else {
			return 0;
		}
	}

	/** returns true if the majority of the girls fit the local preferences in the given category */
	slavesMatchPreferences(category) {
		const majority = this.slavesMajority(category);
		return (majority !== 0 && majority === category.classifyLocalPreference());
	}

	/** returns true if the majority of the girls fit the ad campaign in the given category */
	slavesMatchAds(category) {
		const majority = this.slavesMajority(category);
		return (majority !== 0 && majority === V[`${this.varPrefix}${category.varSuffix}`]);
	}

	/** returns true if the local preferences match the ad campaign in the given category */
	preferencesMatchAds(category) {
		const preferences = category.classifyLocalPreference();
		return (preferences !== 0 && preferences === V[`${this.varPrefix}${category.varSuffix}`]);
	}

	/** returns -1 if the category qualifies for a variety bonus but the facility failed to get it, 1 if the category qualifies for a variety bonus and the facility got it, or 0 if it did not qualify */
	varietyBonus(category) {
		// qualifies for variety bonus only if the category has no preference, we are spending money on ads, and our ads show no preference
		if (category.classifyLocalPreference() !== 0 || V[`${this.varPrefix}Spending`] === 0 || V[`${this.varPrefix}${category.varSuffix}`] !== 0) {
			return 0;
		}
		// check to see if we achieved variety bonus
		const {neg, pos} = this._coalesceTally(category);
		if (neg > 0 && pos > 0 && Math.abs(pos - neg) <= (this.totalSlaves / 3)) {
			return 1; // got it
		} else {
			this.missedBonuses++;
			return -1; // qualified but failed
		}
	}

	overallVarietyBonus() {
		return (this.missedBonuses === 0);
	}
};

/**
 *
 * @param {string} building
 * @param {boolean} [preview]
 * @returns {DocumentFragment}
 */
App.Ads.report = function(building, preview = false) {
	/** @type {App.Entity.Facilities.Facility} */
	const facility = App.Entity.facilities[building];
	const DL = facility.employeesIDs().size;

	let adMgr = new App.Ads.AdManager(building);
	facility.employees().forEach(s => {
		adMgr.tallySlave(s);
	});
	if (facility.manager.currentEmployee) {
		adMgr.tallySlave(facility.manager.currentEmployee);
	}

	let adCampaign = {
		stacked: V[building + "AdsStacked"],
		preg: V[building + "AdsPreg"],
		modded: V[building + "AdsModded"],
		implanted: V[building + "AdsImplanted"],
		XX: V[building + "AdsXX"],
		age: V[building + "AdsOld"],
		spending: V[building + "AdsSpending"]
	};

	return report();

	function report() {
		const frag = new DocumentFragment();
		if (preview) {
			App.UI.DOM.appendNewElement("h3", frag, "Asset size");
			frag.append(stacked());
			frag.append(links("stacked"));

			App.UI.DOM.appendNewElement("h3", frag, "Asset origin");
			frag.append(implanted());
			frag.append(links("implanted"));

			App.UI.DOM.appendNewElement("h3", frag, "Body mods");
			frag.append(modded());
			frag.append(links("modded"));

			if (V.seePreg !== 0) {
				App.UI.DOM.appendNewElement("h3", frag, "Pregnancy");
				frag.append(preg());
				frag.append(links("preg"));
			}

			App.UI.DOM.appendNewElement("h3", frag, "Age");
			frag.append(age());
			frag.append(links("age"));

			if (V.seeDicks !== 0) {
				App.UI.DOM.appendNewElement("h3", frag, "Genitalia");
				frag.append(XX());
				frag.append(links("XX"));
			}
			App.UI.DOM.appendNewElement("p", frag, final());
		} else {
			App.UI.DOM.appendNewElement("div", frag, intro());
			App.UI.DOM.appendNewElement("div", frag, stacked());
			App.UI.DOM.appendNewElement("div", frag, preg());
			App.UI.DOM.appendNewElement("div", frag, modded());
			App.UI.DOM.appendNewElement("div", frag, implanted());
			App.UI.DOM.appendNewElement("div", frag, XX());
			App.UI.DOM.appendNewElement("div", frag, age());
			App.UI.DOM.appendNewElement("p", frag, final());
		}
		return frag;
	}

	function intro() {
		const frag = new DocumentFragment();
		let t = [];
		if (adCampaign.spending !== 0) {
			if (building === "brothel") {
				t.push(App.UI.DOM.makeElement("div", `An ad campaign is supporting business there, and whores that match it make more ¤.`));
			} else if (building === "club") {
				t.push(App.UI.DOM.makeElement("div", `An ad campaign is getting citizens into the ${building} every night, and sluts that match it gratify patrons.`));
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function payBonus() {
		if (!preview) {
			if (building === "brothel") {
				const adsIncome = DL * random(20, 30);
				V.facility[building].adsIncome += adsIncome;
				cashX(adsIncome, (building + "Ads"));
			} else if (building === "club") {
				repX(DL * random(5, 10), (building + "Ads"));
			}
		}
	}

	function stacked() {
		const frag = new DocumentFragment();
		let t = [];
		const pref = App.Ads.Categories.assetSize.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.assetSize);
		if (V.debugMode === 1) {
			t.push(App.UI.DOM.makeElement("div", `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.stacked}`));
		}

		// Ads
		if (adCampaign.spending !== 0) {
			if (adCampaign.stacked === 1) {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls with plenty up top and rears to match.`));
			} else if (adCampaign.stacked === -1) {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature trim girls with little in the way of T&A.`));
			} else {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature a variety of girls, some that are trim and others that are curvaceous.`));
			}
		}

		// Preferences
		if (pref === 1) {
			t.push(`Most customers prefer their girls well endowed.`);
		} else if (pref === -1) {
			t.push(`Most customers prefer their girls light.`);
		} else {
			let variety = adMgr.varietyBonus(App.Ads.Categories.assetSize);
			if (variety === 1) {
				payBonus();
				t.push(
					`The ${building} offers a`,
					App.UI.DOM.makeElement("span", `wide`, (building === "brothel") ? "yellowgreen" : "green"),
					`variety of slim and stacked slaves.`
				);
			}
			t.push(`Most customers don't mind the selection of assets.`);
		}

		// Girls
		if (girls === -1) {
			t.push(`Most of the slaves in the ${building} have small tits and asses.`);
		} else if (girls === 1) {
			t.push(`Most of the slaves in the ${building} have large tits and asses.`);
		} else {
			t.push(`The slaves in the ${building} vary in asset size.`);
		}

		// Results
		if (pref === 0) { /* customers don't care*/
		} else if (adCampaign.spending > 0) {
			if ((adCampaign.stacked === pref) && (girls === adCampaign.stacked)) {
				payBonus();
				t.push(`Its advertising for`);
				if (adCampaign.stacked === 1) {
					t.push(`stacked`);
				} else if (adCampaign.stacked === -1) {
					t.push(`trim`);
				}
				t.push(`girls matched most customers' preferences and the girls in the ${building} matched its advertisements.`);
				t.push(reputation(1));
			} else if ((adCampaign.stacked === pref) && (girls !== adCampaign.stacked)) {
				t.push(`Its advertising for`);
				if (adCampaign.stacked === 1) {
					t.push(`stacked`);
				} else if (adCampaign.stacked === -1) {
					t.push(`trim`);
				}
				t.push(`girls matched most customers preferences, but most of the girls in the ${building} were not as advertised.`);
				t.push(reputation(-1));
			} else if ((girls === pref) && (girls !== adCampaign.stacked)) {
				t.push(`The`);
				if (girls === 1) {
					t.push(`stacked`);
				} else if (girls === -1) {
					t.push(`trim`);
				}
				t.push(`girls in the ${building} did not match its advertisements, but since the girls in the ${building} matched most customers preferences for`);
				if (pref === 1) {
					t.push(`stacked`);
				} else if (pref === -1) {
					t.push(`slim`);
				}
				t.push(`girls,`);
				t.push(reputation(0));
			} else if (girls !== pref) {
				t.push(`Some customers were put off since the`);
				if (girls === 1) {
					t.push(`stacked`);
				} else if (girls === -1) {
					t.push(`trim`);
				}
				t.push(`girls there did not match their preferences for`);
				if (pref === 1) {
					t.push(`stacked`);
				} else if (pref === -1) {
					t.push(`slim`);
				}
				t.push(`girls.`);
				t.push(reputation(-1));
			}
		} else {
			if (girls === pref) {
				t.push(`The`);
				if (girls === 1) {
					t.push(`stacked`);
				} else if (girls === -1) {
					t.push(`trim`);
				}
				t.push(`girls in the ${building} match most customers' preferences for`);
				if (pref === 1) {
					t.push(`stacked`);
				} else if (pref === -1) {
					t.push(`slim`);
				}
				t.push(`girls.`);
				t.push(reputation(1));
			} else {
				t.push(`Some customers were put off since the`);
				if (girls === 1) {
					t.push(`stacked`);
				} else if (girls === -1) {
					t.push(`trim`);
				}
				t.push(`girls there did not match their preferences for`);
				if (pref === 1) {
					t.push(`large`);
				} else if (pref === -1) {
					t.push(`slim`);
				}
				t.push(`girls.`);
				t.push(reputation(-1));
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function preg() {
		const frag = new DocumentFragment();
		let t = [];
		const pref = App.Ads.Categories.preg.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.preg);
		if (V.debugMode === 1) {
			t.push(App.UI.DOM.makeElement("div", `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.preg}`));
		}
		if (V.seePreg === 1) {
			// Ads
			if (adCampaign.spending > 0) {
				if (adCampaign.preg === 1) {
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls that are clearly pregnant.`));
				} else if (adCampaign.preg === -1) {
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls that have flat, usually firm, bellies.`));
				} else {
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature some girls that are pregnant.`));
				}
			}

			// Preferences
			if (pref === 1) {
				t.push(`Most customers prefer their girls rounded with child.`);
			} else if (pref === -1) {
				t.push(`Most customers prefer girls that aren't gravid.`);
			} else {
				let variety = adMgr.varietyBonus(App.Ads.Categories.preg);
				if (variety === 1) {
					payBonus();
					t.push(
						`The ${building} offers a`,
						App.UI.DOM.makeElement("span", `wide`, (building === "brothel") ? "yellowgreen" : "green"),
						`selection of slaves with a variety of middles.`
					);
				}
				t.push(`Most customers don't have preferences for either big-bellied or flat-bellied girls.`);
			}

			// Girls
			if (girls === -1) {
				t.push(`Most of the slaves in the ${building} sport flat bellies.`);
			} else if (girls === 1) {
				t.push(`Most of the slaves in the ${building} sport gravid middles.`);
			} else {
				t.push(`The slaves in the ${building} vary in belly type.`);
			}

			// Results
			if (pref === 0) { /* customers don't care*/
			} else if (adCampaign.spending > 0) {
				if ((adCampaign.preg === pref) && (girls === adCampaign.preg)) {
					payBonus();
					t.push(`Its advertising for`);
					if (adCampaign.preg === 1) {
						t.push(`pregnant`);
					} else if (adCampaign.preg === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls matched most customers' preferences and the girls in the ${building} matched its advertisements.`);
					t.push(reputation(1));
				} else if ((adCampaign.preg === pref) && (girls !== adCampaign.preg)) {
					t.push(`Its advertising for`);
					if (adCampaign.preg === 1) {
						t.push(`pregnant`);
					} else if (adCampaign.preg === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls matched most customers' preferences, but the girls in the ${building} did not.`);
					t.push(reputation(-1));
				} else if ((girls === pref) && (girls !== adCampaign.preg)) {
					t.push(`The`);
					if (girls === 1) {
						t.push(`pregnant`);
					} else if (girls === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls in the ${building} did not match its advertisements, but since the girls in the ${building} matched most customers preferences for`);
					if (pref === 1) {
						t.push(`fecund`);
					} else if (pref === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls,`);
					t.push(reputation(0));
				} else if (girls !== pref) {
					t.push(`Some customers were put off since the`);
					if (girls === 1) {
						t.push(`pregnant`);
					} else if (girls === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls there did not match their preferences for`);
					if (pref === 1) {
						t.push(`fecund`);
					} else if (pref === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls.`);
					t.push(reputation(-1));
				}
			} else {
				if (girls === pref) {
					t.push(`The`);
					if (girls === 1) {
						t.push(`pregnant`);
					} else if (girls === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls in the ${building} match most customers' preferences for`);
					if (pref === 1) {
						t.push(`fecund`);
					} else if (pref === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls.`);
					t.push(reputation(1));
				} else {
					t.push(`Some customers were put off since the`);
					if (girls === 1) {
						t.push(`pregnant`);
					} else if (girls === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls there did not match their preferences for`);
					if (pref === 1) {
						t.push(`fecund`);
					} else if (pref === -1) {
						t.push(`flat-bellied`);
					}
					t.push(`girls.`);
					t.push(reputation(-1));
				}
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function modded() {
		const frag = new DocumentFragment();
		let t = [];
		const pref = App.Ads.Categories.mods.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.mods);
		if (V.debugMode === 1) {
			t.push(App.UI.DOM.makeElement("div", `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.modded}`));
		}

		// Ads
		if (adCampaign.spending > 0) {
			if (adCampaign.modded === 1) {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls that are heavily pierced and tattooed.`));
			} else if (adCampaign.modded === -1) {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls that are free from piercings and tattoos.`));
			} else {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature some girls that are tattooed and pierced, and some that aren't.`));
			}
		}

		// Preferences
		if (pref === 1) {
			t.push(`Most customers prefer heavily modified girls.`);
		} else if (pref === -1) {
			t.push(`Most customers prefer natural girls.`);
		} else {
			let variety = adMgr.varietyBonus(App.Ads.Categories.mods);
			if (variety === 1) {
				payBonus();
				t.push(
					`The ${building} offers`,
					App.UI.DOM.makeElement("span", `both`, (building === "brothel") ? "yellowgreen" : "green"),
					`a selection of heavily altered slaves and those with more natural bodies.`
				);
			}
			t.push(`Most customers don't have preferences for either modded or natural slaves.`);
		}

		// Girls
		if (girls === 1) {
			t.push(`Most of the slaves in the ${building} are heavily pierced and tattooed.`);
		} else if (girls === -1) {
			t.push(`Most of the slaves in the ${building} have natural, unmodded bodies.`);
		} else {
			t.push(`Some girls in the ${building} have piercings or tattoos, some have none and others have both.`);
		}

		// Results
		if (pref === 0) { /* customers don't care*/
		} else if (adCampaign.spending > 0) {
			if ((adCampaign.modded === pref) && (girls === adCampaign.modded)) {
				payBonus();
				t.push(`Its advertising for`);
				if (adCampaign.modded === 1) {
					t.push(`heavily modified`);
				} else if (adCampaign.modded === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls matched most customers' preferences and the girls in the ${building} matched its advertisements.`);
				t.push(reputation(1));
			} else if ((adCampaign.modded === pref) && (girls !== adCampaign.modded)) {
				t.push(`Its advertising for`);
				if (adCampaign.modded === 1) {
					t.push(`heavily modified`);
				} else if (adCampaign.modded === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls matched most customers preferences, but the girls in the ${building} did not.`);
				t.push(reputation(-1));
			} else if ((girls === pref) && (girls !== adCampaign.modded)) {
				t.push(`The`);
				if (girls === 1) {
					t.push(`heavily modified`);
				} else if (girls === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls in the ${building} did not match its advertisements, but since the girls in the ${building} matched most customers preferences for`);
				if (pref === 1) {
					t.push(`heavily modded`);
				} else if (pref === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls,`);
				t.push(reputation(0));
			} else if (girls !== pref) {
				t.push(`Some customers were put off since the`);
				if (girls === 1) {
					t.push(`heavily modified`);
				} else if (girls === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls there did not match their preferences for`);
				if (pref === 1) {
					t.push(`heavily modded`);
				} else if (pref === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls.`);
				t.push(reputation(-1));
			}
		} else {
			if (girls === pref) {
				t.push(`The`);
				if (girls === 1) {
					t.push(`heavily modified`);
				} else if (girls === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls in the ${building} match most customers' preferences for`);
				if (pref === 1) {
					t.push(`heavily modded`);
				} else if (pref === -1) {
					t.push(`natural unmodded`);
				}
				t.push(`girls.`);
				t.push(reputation(1));
			} else {
				t.push(`Some customers were put off since the`);
				if (girls === 1) {
					t.push(`heavily modified`);
				} else if (girls === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls there did not match their preferences for`);
				if (pref === 1) {
					t.push(`heavily modded`);
				} else if (pref === -1) {
					t.push(`natural bodied`);
				}
				t.push(`girls.`);
				t.push(reputation(-1));
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function implanted() {
		const frag = new DocumentFragment();
		let t = [];
		const pref = App.Ads.Categories.assetOrigin.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.assetOrigin);
		if (V.debugMode === 1) {
			t.push(App.UI.DOM.makeElement("div", `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.implanted}`));
		}

		// Ads
		if (adCampaign.spending > 0) {
			if (adCampaign.implanted === 1) {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls that are augmented by implants or improved surgically.`));
			} else if (adCampaign.implanted === -1) {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls that have all natural bodies.`));
			} else {
				t.push(App.UI.DOM.makeElement("div", `Its advertisements feature some girls that are surgically improved and implanted and some that are all-natural.`));
			}
		}

		// Preferences
		if (pref === 1) {
			t.push(`Most customers prefer heavily implanted and surgically enhanced girls.`);
		} else if (pref === -1) {
			t.push(`Most customers prefer all-natural girls.`);
		} else {
			let variety = adMgr.varietyBonus(App.Ads.Categories.assetOrigin);
			if (variety === 1) {
				payBonus();
				t.push(
					`The ${building} offers`,
					App.UI.DOM.makeElement("span", `both`, (building === "brothel") ? "yellowgreen" : "green"),
					`all-natural girls, and slaves whose beauty has been improved by surgical means.`
				);
			}
			t.push(`Most customers don't have preferences for either all-natural or surgically enhanced and implanted girls.`);
		}

		// Girls
		if (girls === 1) {
			t.push(`Most of the slaves in the ${building} are heavily implanted or surgically enhanced.`);
		} else if (girls === -1) {
			t.push(`Most of the slaves in the ${building} have naturally pure bodies.`);
		} else {
			t.push(`The slaves in the ${building} vary in body modification.`);
		}

		// Results
		if (pref === 0) { /* customers don't care*/
		} else if (adCampaign.spending > 0) {
			if ((adCampaign.implanted === pref) && (girls === adCampaign.implanted)) {
				payBonus();
				t.push(`Its advertising for`);
				if (adCampaign.implanted === 1) {
					t.push(`implanted or surgically improved`);
				} else if (adCampaign.implanted === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls matched most customers' preferences and the girls in the ${building} matched its advertisements.`);
				t.push(reputation(1));
			} else if ((adCampaign.implanted === pref) && (girls !== adCampaign.implanted)) {
				t.push(`Its advertising for`);
				if (adCampaign.implanted === 1) {
					t.push(`implanted or surgically improved`);
				} else if (adCampaign.implanted === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls matched most customers preferences, but the girls in the ${building} did not.`);
				t.push(reputation(-1));
			} else if ((girls === pref) && (girls !== adCampaign.implanted)) {
				t.push(`The`);
				if (girls === 1) {
					t.push(`implanted or surgically improved`);
				} else if (girls === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls in the ${building} did not match its advertisements, but since the girls in the ${building} matched most customers preferences for`);
				if (pref === 1) {
					t.push(`implanted or surgically improved`);
				} else if (pref === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls,`);
				t.push(reputation(0));
			} else if (girls !== pref) {
				t.push(`Some customers were put off since the`);
				if (girls === 1) {
					t.push(`implanted or surgically improved`);
				} else if (girls === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls there did not match their preferences for`);
				if (pref === 1) {
					t.push(`implanted or surgically improved`);
				} else if (pref === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls.`);
				t.push(reputation(-1));
			}
		} else {
			if (girls === pref) {
				t.push(`The`);
				if (girls === 1) {
					t.push(`implanted or surgically improved`);
				} else if (girls === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls in the ${building} match most customers' preferences for`);
				if (pref === 1) {
					t.push(`implanted or surgically improved`);
				} else if (pref === -1) {
					t.push(`natural unmodded`);
				}
				t.push(`girls.`);
				t.push(reputation(1));
			} else {
				t.push(`Some customers were put off since the`);
				if (girls === 1) {
					t.push(`implanted or surgically improved`);
				} else if (girls === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls there did not match their preferences for`);
				if (pref === 1) {
					t.push(`implanted or surgically improved`);
				} else if (pref === -1) {
					t.push(`naturally pure`);
				}
				t.push(`girls.`);
				t.push(reputation(-1));
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function XX() {
		const frag = new DocumentFragment();
		let t = [];
		const pref = App.Ads.Categories.genitalia.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.genitalia);
		if (V.debugMode === 1) {
			t.push(App.UI.DOM.makeElement("div", `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.XX}`));
		}
		if (V.seeDicks !== 0) {
			// Ads
			if (adCampaign.spending > 0) {
				if (adCampaign.XX === 1) {
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls with female genitalia.`));
				} else if (adCampaign.XX === -1) {
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature girls with male genitalia.`));
				} else {
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature a variety of girls with both male and female genitalia.`));
				}
			}

			// Preferences
			if (pref === 1) {
				t.push(`Most customers prefer girls with pussies.`);
			} else if (pref === -1) {
				t.push(`Most customers prefer girls with dicks.`);
			} else {
				let variety = adMgr.varietyBonus(App.Ads.Categories.genitalia);
				if (variety === 1) {
					payBonus();
					t.push(
						`The ${building} offers a`,
						App.UI.DOM.makeElement("span", `mix`, (building === "brothel") ? "yellowgreen" : "green"),
						`of`
					);
					if (building === "brothel") {
						t.push(`whores`);
					} else {
						t.push(`sluts`);
					}
					t.push(`that can appeal to varied tastes in genitalia.`);
				}
				t.push(`Most customers don't have preferences for either girls with dicks or girls with pussies.`);
			}

			// Girls
			if (girls === 1) {
				t.push(`Most of the slaves in the ${building} have female genitalia.`);
			} else if (girls === -1) {
				t.push(`Most of the slaves in the ${building} have male genitalia.`);
			} else {
				t.push(`The slaves in the ${building} vary in genitalia.`);
			}

			// Results
			if (pref === 0) { /* customers don't care*/
			} else if (adCampaign.spending > 0) {
				if ((adCampaign.XX === pref) && (girls === adCampaign.XX)) {
					payBonus();
					t.push(`Its advertising for girls`);
					if (adCampaign.XX === 1) {
						t.push(`with pussies`);
					} else if (adCampaign.XX === -1) {
						t.push(`with dicks`);
					}
					t.push(`matches most customers' preferences as advertised.`);
					t.push(reputation(1));
				} else if ((adCampaign.XX === pref) && (girls !== adCampaign.XX)) {
					t.push(`Its advertising for girls`);
					if (adCampaign.XX === 1) {
						t.push(`with pussies`);
					} else if (adCampaign.XX === -1) {
						t.push(`with dicks`);
					}
					t.push(`matched most customers preferences, but the girls in the ${building} are not as advertised.`);
					t.push(reputation(-1));
				} else if ((girls === pref) && (girls !== adCampaign.XX)) {
					t.push(`The girls`);
					if (girls === 1) {
						t.push(`with pussies`);
					} else if (girls === -1) {
						t.push(`with dicks`);
					}
					t.push(`in the ${building} did not match the advertisements, but since the girls in the ${building} matched most customers preferences for girls`);
					if (pref === 1) {
						t.push(`with pussies,`);
					} else if (pref === -1) {
						t.push(`with dicks,`);
					}
					t.push(reputation(0));
				} else if (girls !== pref) {
					t.push(`Some customers were put off since the girls`);
					if (girls === 1) {
						t.push(`with female genitalia`);
					} else if (girls === -1) {
						t.push(`with male genitalia`);
					}
					t.push(`did not match their preferences for girls`);
					if (pref === 1) {
						t.push(`with pussies.`);
					} else if (pref === -1) {
						t.push(`with dicks.`);
					}
					t.push(reputation(-1));
				}
			} else {
				if (girls === pref) {
					t.push(`The girls in the ${building} match most customers preferences for girls`);
					if (girls === 1) {
						t.push(`with female genitalia.`);
					} else if (girls === -1) {
						t.push(`with male genitalia.`);
					}
					t.push(reputation(1));
				} else {
					t.push(`Some customers were put off since the girls`);
					if (girls === 1) {
						t.push(`with female genitalia`);
					} else if (girls === -1) {
						t.push(`with male genitalia`);
					}
					t.push(`did not match their preferences for girls`);
					if (pref === 1) {
						t.push(`with pussies.`);
					} else if (pref === -1) {
						t.push(`with dicks.`);
					}
					t.push(reputation(-1));
				}
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function age() {
		const frag = new DocumentFragment();
		let t = [];
		const pref = App.Ads.Categories.age.classifyLocalPreference();
		let girls = adMgr.slavesMajority(App.Ads.Categories.age);
		if (V.debugMode === 1) {
			t.push(App.UI.DOM.makeElement("div", `Girls: ${girls}, Pref: ${pref}, Ads: ${adCampaign.age}`));
		}

		// Ads
		if (adCampaign.spending > 0) {
			switch (adCampaign.age) {
				case 1:
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature mature slaves.`));
					break;
				case -1:
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature young slaves.`));
					break;
				case -2:
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature teenagers.`));
					break;
				case -3:
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature lolis.`));
					break;
				default:
					t.push(App.UI.DOM.makeElement("div", `Its advertisements feature slaves of a variety of ages.`));
					break;
			}
		}

		// Preferences
		if (pref === 1) {
			t.push(`Most customers prefer mature girls.`);
		} else if (pref === -1) {
			t.push(`Most customers prefer young girls.`);
		} else {
			let variety = adMgr.varietyBonus(App.Ads.Categories.age);
			if (variety === 1) {
				payBonus();
				t.push(
					`The ${building} offers girls`,
					App.UI.DOM.makeElement("span", `both`, (building === "brothel") ? "yellowgreen" : "green"),
					`young and mature.`
				);
			}
			t.push(`Most customers don't have preferences for either mature or young girls.`);
		}

		// Girls
		if (girls === -1) {
			t.push(`Most of the slaves in the ${building} are young.`);
		} else if (girls === 1) {
			t.push(`Most of the slaves in the ${building} are mature.`);
		} else {
			t.push(`The slaves in the ${building} vary in age.`);
		}

		// Results
		if (pref === 0) { /* customers don't care*/
		} else if (adCampaign.spending > 0) {
			if ((adCampaign.age === pref) && (girls === adCampaign.age)) {
				payBonus();
				t.push(`Its advertising matches most customers' age preferences and the girls in the ${building} match the ages as advertised.`);
				t.push(reputation(1));
			} else if ((adCampaign.age === pref) && (girls !== adCampaign.age)) {
				t.push(`Its advertising matched most customers age preferences, but the girls in the ${building} are not as advertised.`);
				t.push(reputation(-1));
			} else if ((girls === pref) && (girls !== adCampaign.age)) {
				t.push(`The ages of girls in the ${building} did not match the ages as advertised, but since the girls in the ${building} matched most customers age preferences,`);
				t.push(reputation(0));
			} else if (girls !== pref) {
				t.push(`Some customers were put off since the ages of girls there did not match their preferences.`);
				t.push(reputation(-1));
			}
		} else {
			if (girls === pref) {
				t.push(`The girls in the ${building} match most customers' age preferences.`);
				t.push(reputation(1));
			} else {
				t.push(`Some customers were put off since the ages of girls there did not match their preferences.`);
				t.push(reputation(-1));
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function final() {
		const frag = new DocumentFragment();
		let t = [];
		if (adMgr.overallVarietyBonus()) {
			if (!preview) {
				if (building === "brothel") {
					const adsIncome = DL * random(40, 60);
					V.facility[building].adsIncome += adsIncome;
					cashX(adsIncome, (building + "Ads"));
				} else if (building === "club") {
					repX(DL * random(10, 15), (building + "Ads"));
				}
			}
			t.push(
				`There is a`,
				App.UI.DOM.makeElement("span", `perfect variety`, [(building === "brothel") ? "yellowgreen" : "green", "bold"]),
				`of slave`
			);
			if (building === "brothel") {
				t.push(`whores`);
			} else if (building === "club") {
				t.push(`sluts`);
			}
			t.push(`working in the ${building}.`);
		} else {
			if (building === "club") {
				t.push(App.UI.DOM.makeElement("div", `${capFirstChar(V.clubName)} does not offer enough variety to satisfy all visitors.`));
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function reputation(change) {
		const minBonus = 50;
		const maxBonus = 150;
		const frag = new DocumentFragment();
		let t = [];
		if (change > 0) {
			if (preview) {
				t.push(`The current campaign would <span class="green">increase</span> your reputation.`);
			} else {
				repX(random(minBonus, maxBonus), building);
				t.push(`Your <span class="green">reputation</span> increased slightly as a result.`);
			}
		} else if (change < 0) {
			if (preview) {
				t.push(`The current campaign would <span class="red">lower</span> your reputation.`);
			} else {
				repX(forceNeg(random(minBonus, maxBonus)), building);
				t.push(`Your <span class="red">reputation</span> dropped slightly as a result.`);
			}
		} else if (change === 0) {
			if (preview) {
				t.push(`your reputation would not be affected.`);
			} else {
				t.push(`your reputation was not affected.`);
			}
		}
		App.Events.addNode(frag, t, "div");
		return frag;
	}

	function links(category) {
		const linkArray = [];

		function radioLink(name, variable, value) {
			if (V[variable] !== value) {
				linkArray.push(
					App.UI.DOM.link(
						name,
						() => {
							V[variable] = value;
							App.UI.reload();
						}
					)
				);
			} else {
				linkArray.push(
					App.UI.DOM.disabledLink(name, ["Selected"])
				);
			}
			return App.UI.DOM.generateLinksStrip(linkArray);
		}

		switch (category) {
			case "stacked":
				radioLink("Stacked", `${building}AdsStacked`, 1);
				radioLink("Slim", `${building}AdsStacked`, -1);
				radioLink("Variety", `${building}AdsStacked`, 0);
				break;
			case "preg":
				radioLink("Gravid", `${building}AdsPreg`, 1);
				radioLink("None", `${building}AdsPreg`, -1);
				radioLink("Variety", `${building}AdsPreg`, 0);
				break;
			case "modded":
				radioLink("Modded", `${building}AdsModded`, 1);
				radioLink("Unmodded", `${building}AdsModded`, -1);
				radioLink("Variety", `${building}AdsModded`, 0);
				break;
			case "implanted":
				radioLink("Implants", `${building}AdsImplanted`, 1);
				radioLink("All natural", `${building}AdsImplanted`, -1);
				radioLink("Variety", `${building}AdsImplanted`, 0);
				break;
			case "XX":
				radioLink("Pussies", `${building}AdsXX`, 1);
				radioLink("Dicks", `${building}AdsXX`, -1);
				radioLink("Variety", `${building}AdsXX`, 0);
				break;
			case "age":
				radioLink("MILF", `${building}AdsOld`, 1);
				radioLink("Young", `${building}AdsOld`, -1);
				if (V.minimumSlaveAge < 18) {
					radioLink("Teen", `${building}AdsOld`, -2);
				}
				if (V.minimumSlaveAge < 13) {
					radioLink("Loli", `${building}AdsOld`, -3);
				}
				radioLink("Variety", `${building}AdsOld`, 0);
				break;
			default:
				console.log("You done fucked up. Building: " + building + " Category: " + category);
		}
		return App.UI.DOM.makeElement("div", App.UI.DOM.generateLinksStrip(linkArray));
	}
};
