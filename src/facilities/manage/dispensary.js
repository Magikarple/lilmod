App.UI.dispensary = function() {
	const pcSkillCheck = Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier);

	/**
	 * @type {Array<string|HTMLElement|DocumentFragment>}
	 */
	let r;

	const refreshDiv = document.createElement("div");
	refreshDiv.append(content());
	return refreshDiv;

	function refresh() {
		App.UI.DOM.replace(refreshDiv, content());
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function content() {
		const f = new DocumentFragment();
		f.append(
			intro(),
			hormones(),
			diet(),
			pharma()
		);
		if (V.seePreg !== 0) {
			f.append(fertility());
		}
		f.append(futureSociety());
		return f;
	}

	/**
	 * @param {string} name
	 * @param {string[]} notes
	 * @param {function(): void} callback
	 * @param {number} cost
	 * @param {string} [existingDesc=""]
	 * @returns {DocumentFragment}
	 */
	function upgrade(name, notes, callback, cost, existingDesc = "") {
		const f = new DocumentFragment();
		r = [];
		if (existingDesc !== "") {
			r.push(existingDesc);
		}
		r.push(makePurchase(name, cost, "capEx", {
			handler: callback,
			notes,
			refresh,
		}));

		App.Events.addNode(f, r, "div");

		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function intro() {
		const f = new DocumentFragment();
		App.UI.DOM.appendNewElement("h1", f, "The Dispensary");

		let p = document.createElement("p");
		r = [];
		r.push("The pharmaceutical fabricator is running smoothly.");
		if (V.dispensaryUpgrade === 0) {
			r.push("It can cheaply replicate complex medications, and has already cut the cost of drugs for your slaves by a fourth.");
		} else {
			r.push("It can cheaply and quickly replicate complex medications, and has already cut the cost of drugs for your slaves in half.");
		}
		r.push("It can easily produce advanced drugs should you obtain the data necessary to create them.");
		App.Events.addNode(p, r, "div", "scene-intro");

		if (V.dispensaryUpgrade === 0) {
			if (V.rep > 5000) {
				p.append(upgrade("Upgrade the pharmaceutical fabricator", ["Will improve production efficiency, further decreasing costs."], () => {
					V.dispensaryUpgrade = 1;
					V.drugsCost = (V.drugsCost * 2) / 3;
				}, 30000 * V.upgradeMultiplierArcology));
			} else {
				App.UI.DOM.appendNewElement("div", p, "You lack the reputation to obtain cutting-edge pharmaceutical fabricator upgrades.", ["note"]);
			}
		}
		f.append(p);
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function hormones() {
		const f = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", f, "Hormones Upgrades");

		let p = document.createElement("p");

		let text = "The fabricator is producing";
		if (V.injectionUpgrade === 0) {
			text += " standard growth hormones.";
			if (V.rep > 6000) {
				p.append(upgrade("Purchase data on prototype growth hormone tests",
					["Should improve the reliability of growth injections of all kinds."],
					() => { V.injectionUpgrade = 1; }, 25000 * pcSkillCheck, text));
			} else {
				r = [text];
				r.push(`<span class="note">You lack the reputation to obtain prototype medicines.</span>`);
				App.Events.addNode(p, r, "div", ["note"]);
			}
		} else if (V.injectionUpgrade === 1) {
			text += " prototype growth hormones.";
			if (V.rep > 10000) {
				p.append(upgrade("Upgrade the fabricator to customize each slave's growth hormones",
					["Should improve the reliability of growth injections of all kinds."],
					() => { V.injectionUpgrade = 2; }, 50000 * pcSkillCheck, text));
			} else {
				r = [text];
				r.push(`<span class="note">You lack the reputation to obtain prototype fabricator upgrades.</span>`);
				App.Events.addNode(p, r, "div", ["note"]);
			}
		} else if (V.injectionUpgrade === 2) {
			text += " customized growth hormones.";
			if (V.rep > 14000) {
				p.append(upgrade("Upgrade the fabricator with prototype biomechanical microfactories",
					["Should improve the reliability of growth injections of all kinds."],
					() => { V.injectionUpgrade = 3; }, 100000 * pcSkillCheck, text));
			} else {
				r = [text];
				r.push(`<span class="note">You lack the reputation to obtain prototype biomechanical microfactories.</span>`);
				App.Events.addNode(p, r, "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, [text, "the world's most effective growth hormones."], "div");
		}


		text = "The fabricator is producing";
		if (V.hormoneUpgradeMood === 0) {
			text += " standardized hormone replacement therapies.";
			if (V.rep > 2000) {
				p.append(upgrade("Upgrade for individualized therapy", ["Should eliminate the occasional moodiness and sexual disinterest caused by generalized therapy."], () => { V.hormoneUpgradeMood = 1; }, 10000 * pcSkillCheck, text));
			} else {
				r = [text];
				r.push(`<span class="note">You lack the reputation to obtain advanced drug manufacturing components.</span>`);
				App.Events.addNode(p, r, "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, [text, "individualized hormone replacement therapies."], "div");
		}

		text = "The hormone replacement therapies";
		if (V.hormoneUpgradePower === 0) {
			text += " are traditional: they're formulated to mimic natural hormones.";
			if (V.rep > 4000) {
				p.append(upgrade("Purchase data on advanced HRT", ["Should increase the power of hormone therapies."], () => { V.hormoneUpgradePower = 1; }, 25000 * pcSkillCheck, text));
			} else {
				r = [text];
				r.push(`<span class="note">You lack the reputation to obtain prototype medicines.</span>`);
				App.Events.addNode(p, r, "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, [text, "are advanced: they're formulated to improve on natural hormones."], "div");
		}

		text = "The hormone replacement therapies";
		if (V.hormoneUpgradeShrinkage === 0) {
			text += " are broad-spectrum.";
			if (V.rep > 4000) {
				p.append(upgrade("Purchase data on targeted HRT", ["Should reduce atrophy of organs corresponding to original sex."], () => { V.hormoneUpgradeShrinkage = 1; }, 25000 * pcSkillCheck, text));
			} else {
				r = [text];
				r.push(`<span class="note">You lack the reputation to obtain prototype medicines.</span>`);
				App.Events.addNode(p, r, "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, [text, "are targeted, reducing atrophy of organs corresponding to original sex."], "div");
		}

		if (V.precociousPuberty === 1) {
			if (V.pubertyHormones === 0) {
				if (V.rep > 4500 * pcSkillCheck) {
					p.append(upgrade("Fund research into powerful hormonal injections to jumpstart puberty", ["Will allow the production of powerful hormonal drugs designed to force a slave through puberty without regard for side effects."], () => { V.pubertyHormones = 1; }, 30000 * pcSkillCheck));
				} else {
					App.Events.addNode(p, ["You lack the reputation to fund forced puberty drugs"], "div", ["note"]);
				}
			} else {
				App.Events.addNode(p, ["The fabricator is producing extra strong hormonal drugs designed to force a slave through puberty."], "div");
			}
		}

		f.append(p);
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function diet() {
		const f = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", f, "Dietary Upgrades");

		let p = document.createElement("p");

		if (V.feeder === 1) {
			if (V.dietXXY === 0) {
				if (V.rep > 3500 * pcSkillCheck) {
					p.append(upgrade("Fund research into developing hermaphrodite hormone therapies", ["Will allow for specially balanced meals to be served in the cafeteria designed to promote both halves of a herm's sexuality."], () => { V.dietXXY = 1; }, 10000 * pcSkillCheck));
				} else {
					App.Events.addNode(p, ["You lack the reputation to fund research into hermaphrodite hormones."], "div", ["note"]);
				}
			} else {
				App.Events.addNode(p, ["The fabricator is producing meals to be served in the cafeteria designed to promote both halves of a herm's sexuality."], "div");
			}
		} else {
			App.Events.addNode(p, ["The feeders are incapable of modifying slave diets well enough to adjust hormones for hermaphrodite meals."], "div");
		}

		if (V.seePreg === 1) {
			if (V.feeder === 1) {
				if (V.reproductionFormula === 0) {
					if (V.rep > 10000 * pcSkillCheck) {
						p.append(upgrade("Purchase reputable breeders' dietary blends", ["Will allow for specially refined meals to be served in the cafeteria designed to promote energetic sperm and robust pregnancies. Side effects may include an increased number of twins being conceived."], () => { V.reproductionFormula = 1; }, 25000 * pcSkillCheck));
					} else {
						App.Events.addNode(p, ["You lack the reputation to access breeders' dietary blends."], "div", ["note"]);
					}
				} else {
					App.Events.addNode(p, ["The fabricator is producing meals to be served in the cafeteria that promote energetic sperm and robust pregnancies."], "div");
				}
			} else {
				App.Events.addNode(p, ["The feeders are incapable of modifying slave diets well enough to manage to enhance reproductive ability."], "div");
			}
		}

		if (V.cumProDiet === 0) {
			p.append(upgrade("Purchase recipes to encourage cum production", ["Will allow for specially designed meals to be served in the cafeteria to promote cum production."], () => { V.cumProDiet = 1; }, 5000 * pcSkillCheck));
		} else {
			App.Events.addNode(p, ["The fabricator is producing meals to be served in the cafeteria designed to promote cum production."], "div");
		}

		if (V.seePreg === 1) {
			if (V.dietFertility === 0) {
				p.append(upgrade("Purchase recipes to encourage ovulation", ["Will allow for specially designed meals to be served in the cafeteria to promote slave fertility."], () => { V.dietFertility = 1; }, 5000 * pcSkillCheck));
			} else if (V.dietFertility === 1) {
				App.Events.addNode(p, ["The fabricator is producing meals to be served in the cafeteria designed to promote slave fertility."], "div");
			}
		}

		if (V.dietCleanse === 0) {
			p.append(upgrade("Purchase cleansing recipes to lessen carcinogen buildup", ["Will allow for specially designed meals to be served in the cafeteria to counteract excessive drug use."], () => { V.dietCleanse = 1; }, 10000 * pcSkillCheck));
		} else if (V.dietCleanse === 1) {
			App.Events.addNode(p, ["The fabricator is producing meals to be served in the cafeteria designed to counteract excessive drug use and good health. They smell awful and taste worse than they look, but they're healthy."], "div");
		}
		f.append(p);
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function pharma() {
		const f = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", f, "Pharmacological Upgrades");

		let p = document.createElement("p");

		if (V.curativeUpgrade === 0 && V.rep > 6000 * pcSkillCheck) {
			p.append(upgrade("Purchase data on advanced curatives", ["Should improve the effectiveness of curative treatment."], () => { V.curativeUpgrade = 1; }, 25000 * pcSkillCheck));
		} else if (V.curativeUpgrade === 1) {
			App.Events.addNode(p, ["The fabricator is producing highly effective curative cocktails."], "div");
		}


		if (V.growthStim === 0 && V.rep > 6000 * pcSkillCheck) {
			p.append(upgrade("Purchase data on growth stimulants", ["Will allow the manufacturing of drugs to encourage growth in slave height."], () => { V.growthStim = 1; }, 20000 * pcSkillCheck));
		} else if (V.growthStim === 1) {
			App.Events.addNode(p, ["The fabricator is able to produce growth stimulants."], "div");
		}

		if (V.aphrodisiacUpgradeRefine === 0 && V.rep > 6000 * pcSkillCheck) {
			p.append(upgrade("Purchase data on refined aphrodisiacs", ["Will prevent most physical side effects of aphrodisiacs. Once the formulas are changed they cannot be changed back."], () => { V.aphrodisiacUpgradeRefine = 1; }, 20000 * pcSkillCheck));
		} else if (V.aphrodisiacUpgradeRefine === 1) {
			App.Events.addNode(p, ["The fabricator is producing refined aphrodisiacs with limited hormonal effects."], "div");
		}

		if (V.aphrodisiacUpgrade === 0 && V.rep > 6000 * pcSkillCheck) {
			p.append(upgrade("Purchase data on aphrodisiac withdrawal treatment", ["Should prevent most negative effects of withdrawal."], () => { V.aphrodisiacUpgrade = 1; }, 10000 * pcSkillCheck));
		} else if (V.aphrodisiacUpgrade === 1) {
			App.Events.addNode(p, ["The fabricator is producing a substitute that will protect slaves from aphrodisiac withdrawal."], "div");
		}

		if (V.healthyDrugsUpgrade === 0) {
			if (V.injectionUpgrade !== 0 && V.curativeUpgrade === 1 && V.aphrodisiacUpgrade === 1) {
				if (V.rep >= 15000 * pcSkillCheck) {
					p.append(upgrade("Fund research into drug formulations without negative physical side effects", ["Will prevent the negative side effects of excessive drug usage on your slaves."], () => { V.healthyDrugsUpgrade = 1; }, 500000 * pcSkillCheck));
				} else {
					App.Events.addNode(p, ["You lack the reputation to access the technology necessary to develop advanced drug formulations."], "div", ["note"]);
				}
			} else {
				App.Events.addNode(p, ["You must purchase all other major upgrades before developing advanced drug formulations."], "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, ["The fabricator has been upgraded to optimize the structures of your other drugs, eliminating their negative side effects."], "div");
		}

		if (V.arcologies[0].FSBodyPuristLaw === 1) {
			App.Events.addNode(p, ["The pharmaceutical fabricator is working with your body purist arcology to reduce long term drug side effects."], "div", ["note"]);
		}

		f.append(p);
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function fertility() {
		const f = new DocumentFragment();

		App.UI.DOM.appendNewElement("h2", f, "Fertility Focused Pharmacology");

		let p = document.createElement("p");

		if (V.seeHyperPreg === 1) {
			if (V.pregSpeedControl === 1) {
				App.Events.addNode(p, ["The fabricator is producing extremely complex gestation control agents. They can be used to control gestation speed, and even suppress labor for some time."], "div");
			} else if (V.superFertilityDrugs === 1 && V.rep > 10000 * pcSkillCheck) {
				p.append(upgrade("Fund research pregnancy speed control methods", ["Fund underground research labs to develop methods for controlling pregnancy progress."], () => {
					V.pregSpeedControl = 1;
					V.clinicSpeedGestation = 0;
				}, 200000 * pcSkillCheck));
			} else if (V.rep <= 10000 * pcSkillCheck) {
				App.Events.addNode(p, ["You lack the reputation required to contact underground research labs to develop methods for controlling pregnancy progress."], "div", ["note"]);
			}
		} else if (V.birthsTotal > 10) {
			if (V.pregSpeedControl === 1) {
				App.Events.addNode(p, ["The fabricator is producing extremely complex gestation control agents. They can be used to control gestation speed, and even suppress labor for some time."], "div");
			} else if (V.rep > 10000 * pcSkillCheck) {
				p.append(upgrade("Fund research pregnancy speed control methods", ["Fund underground research labs to develop methods for controlling pregnancy progress."], () => {
					V.pregSpeedControl = 1;
					V.clinicSpeedGestation = 0;
				}, 200000 * pcSkillCheck));
			} else if (V.rep <= 10000 * pcSkillCheck) {
				App.Events.addNode(p, ["You lack the reputation required to contact underground research labs to develop methods for controlling pregnancy progress."], "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, ["You lack the experience handling pregnant slaves required to convince underground research labs to do business with you in the development of controlled fetal development."], "div", ["note"]);
		}

		if (V.superFertilityDrugs === 0 && V.rep > 2500 * pcSkillCheck && V.seeHyperPreg === 1) {
			p.append(upgrade("Purchase data on powerful fertility drugs", ["Should improve the likelihood of conception and multiples."], () => { V.superFertilityDrugs = 1; }, 20000 * pcSkillCheck));
		} else if (V.superFertilityDrugs === 1) {
			App.Events.addNode(p, ["The fabricator is producing highly effective fertility agents. There is a warning present involving overdosing and instances of ten or more children."], "div");
		}

		f.append(p);
		return f;
	}

	function futureSociety() {
		const f = new DocumentFragment();

		App.UI.DOM.appendNewElement("h2", f, "Future Societies Research");
		let p = document.createElement("p");

		if (V.ImplantProductionUpgrade === 1 && V.arcologies[0].FSTransformationFetishistDecoration >= 100) {
			if (V.arcologies[0].FSTransformationFetishistResearch === 0 && V.rep <= 5000 * pcSkillCheck) {
				App.Events.addNode(p, ["You lack the reputation to access experimental gigantic implants and elasticizing filler."], "div", ["note"]);
			} else if (V.arcologies[0].FSTransformationFetishistResearch === 0) {
				p.append(upgrade("Purchase data on gigantic implants and elasticizing filler", ["Will allow the fabrication of gigantic implants using the autosurgery and filler capable of overfilling existing fillable implants."], () => { V.arcologies[0].FSTransformationFetishistResearch = 1; }, 20000 * pcSkillCheck));
			} else if (V.arcologies[0].FSTransformationFetishistResearch > 0) {
				App.Events.addNode(p, ["The fabricator is capable of crafting gigantic implants and elasticizing filler designed to overfill existing implants."], "div");
			}
		} else if (V.arcologies[0].FSTransformationFetishistResearch === 1) {
			App.Events.addNode(p, ["The fabricator is capable of crafting gigantic implants and elasticizing filler designed to overfill existing implants."], "div");
		} else {
			App.Events.addNode(p, ["Transformation Fetishist focused research unavailable."], "div", ["note"]);
		}

		if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
			App.Events.addNode(p, ["The fabricator has been upgraded to manufacture extremely powerful growth drugs."], "div");
		} else if (V.arcologies[0].FSAssetExpansionistDecoration === 100) {
			if (V.rep >= 5000 * pcSkillCheck) {
				p.append(upgrade("Fund research into drug formulations for growth without limit", ["Will allow creation of drugs to push assets to unthinkable sizes."], () => { V.arcologies[0].FSAssetExpansionistResearch = 1; }, 30000 * pcSkillCheck));
			} else {
				App.Events.addNode(p, ["You lack the reputation to access the research necessary to develop advanced growth drug formulations."], "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, ["Asset Expansionist focused research unavailable."], "div", ["note"]);
		}

		if (V.arcologies[0].FSSlaveProfessionalismResearch === 1) {
			App.Events.addNode(p, ["The fabricator has been upgraded to manufacture a compound that steadily improves intelligence."], "div");
		} else if (V.arcologies[0].FSSlaveProfessionalismDecoration === 100) {
			if (V.rep >= 5000 * pcSkillCheck) {
				p.append(upgrade("Fund research into producing an intelligence boosting compound", ["Will allow the creation of a drug that improves mental faculties."], () => { V.arcologies[0].FSSlaveProfessionalismResearch = 1; }, 60000 * pcSkillCheck));
			} else {
				App.Events.addNode(p, ["You lack the reputation to access the research necessary to produce an intelligence boosting compound."], "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, ["Slave Professionalism focused research unavailable."], "div", ["note"]);
		}

		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			App.Events.addNode(p, ["The fabricator has been upgraded to manufacture growth reversing drugs."], "div");
		} else if (V.arcologies[0].FSSlimnessEnthusiastDecoration === 100) {
			if (V.rep >= 5000 * pcSkillCheck) {
				p.append(upgrade("Fund research into drug formulations for slimming slaves", ["Will allow creation of drugs to shrink assets."], () => { V.arcologies[0].FSSlimnessEnthusiastResearch = 1; }, 30000 * pcSkillCheck));
			} else {
				App.Events.addNode(p, ["You lack the reputation to access the research necessary to develop asset reducing drug formulations."], "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, ["Slimness Enthusiast focused research unavailable."], "div", ["note"]);
		}

		if (V.arcologies[0].FSYouthPreferentialistResearch === 1) {
			App.Events.addNode(p, ["The fabricator has been upgraded to manufacture extremely effective beauty creams designed to combat aging."], "div");
		} else if (V.arcologies[0].FSYouthPreferentialistDecoration === 100) {
			if (V.rep >= 5000 * pcSkillCheck) {
				p.append(upgrade("Fund research into skin care designed to reverse the effects of aging", ["Will allow creation of beauty creams designed to make slaves look young again."], () => { V.arcologies[0].FSYouthPreferentialistResearch = 1; }, 30000 * pcSkillCheck));
			} else {
				App.Events.addNode(p, ["You lack the reputation to access the research necessary to develop beauty creams designed to make slaves look young again."], "div", ["note"]);
			}
		} else {
			App.Events.addNode(p, ["Youth Preferentialist focused research unavailable."], "div", ["note"]);
		}

		if (V.arcologies[0].FSHedonisticDecadenceDecoration === 100) {
			if (V.arcologies[0].FSHedonisticDecadenceResearch === 0) {
				if (V.rep >= 5000 * pcSkillCheck) {
					p.append(upgrade("Purchase recipes for concentrated, shaped slave food", [`Will allow production of solid slave food in various familiar shapes and flavors. Addictive and a little fatty.${(!FutureSocieties.isActive('FSDegradationist') ? "" : " Since your slaves don't deserve luxuries, a modified recipe formulated to cause severe stomach cramps minutes after ingestion will be developed.")}`], () => { V.arcologies[0].FSHedonisticDecadenceResearch = 1; }, 50000 * pcSkillCheck));
				} else {
					App.Events.addNode(p, ["You lack the reputation to access the research necessary to purchase concentrated, shaped slave food recipes."], "div", ["note"]);
				}
			} else {
				let text = `The fabricator has been upgraded to manufacture tasty, extremely addictive, solid slave food in various familiar shapes and flavors. While they look and taste like real food, their consistency is all wrong. Slaves gorging on them are likely to experience steady weight gain.${(!FutureSocieties.isActive('FSDegradationist') ? "" : " Since your slaves don't deserve luxuries, all food crafted will cause severe stomach cramps minutes after ingestion. Coupled with their addictive nature, it ought to be quite torturous.")}`;
				if (V.arcologies[0].FSSlimnessEnthusiast > 50 && V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
					p.append(upgrade("Purchase diet recipes", ["Will prevent rampant weight gain from ruining your slim slaves."], () => { V.arcologies[0].FSHedonisticDecadenceDietResearch = 1; }, 10000 * pcSkillCheck, text));
				} else if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 1) {
					App.Events.addNode(p, [text, "A diet recipe is being utilized to prevent unwanted weight gain."], "div");
				}
			}
		} else if (V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
			let text = `The fabricator has been upgraded to manufacture tasty, extremely addictive, solid slave food in various familiar shapes and flavors. While they look and taste like real food, their consistency is all wrong. Slaves gorging on them are likely to experience steady weight gain.${!FutureSocieties.isActive('FSDegradationist') ? "" : "Since your slaves don't deserve luxuries, all food crafted will cause severe stomach cramps minutes after ingestion. Coupled with their addictive nature, it ought to be quite torturous."}`;
			if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
				p.append(upgrade("Purchase diet recipes", [`Will prevent rampant unwanted weight gain from ruining your ${V.arcologies[0].FSSlimnessEnthusiast > 20 ? "slim " : ""}slaves.`], () => { V.arcologies[0].FSHedonisticDecadenceDietResearch = 1; }, 10000 * pcSkillCheck));
			} else if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 1) {
				App.Events.addNode(p, [text, "A diet recipe is being utilized to prevent unwanted weight gain."], "div");
			}

			App.UI.DOM.appendNewElement("div", p, App.UI.DOM.link("Cancel solid slave food production", () => {
				V.arcologies[0].FSHedonisticDecadenceResearch = 0;
				V.merchantFSWares.push("HedonisticDecadenceResearch");
				refresh();
			}), "indent");
			App.Events.addNode(p, ["Will <span class=\"noteworthy\">completely</span> remove this research."]);
		} else {
			App.Events.addNode(p, ["Hedonistic Decadence focused research unavailable."], "div", ["note"]);
		}
		f.append(p);
		return f;
	}
};
