App.Markets["Elite Slave"] = function() {
	const el = new DocumentFragment();

	el.append(`You check to see if any potential breeding slaves are on auction. `);
	if (V.eliteAuctioned === 1) {
		el.append(`There are none available right now, but there probably will be next week. `);
	} else {
		V.eliteAuctioned = 1;

		let minAge;
		let maxAge;
		if (V.arcologies[0].FSMaturityPreferentialist > 20) {
			minAge = 25;
		} else {
			minAge = V.fertilityAge;
		}
		if (V.arcologies[0].FSYouthPreferentialist > 20) {
			maxAge = 23;
		} else {
			maxAge = 40;
		}
		let race;
		if (FutureSocieties.isActive('FSSupremacist')) {
			race = V.arcologies[0].FSSupremacistRace;
		} else if (FutureSocieties.isActive('FSSubjugationist')) {
			let races = ["amerindian", "asian", "asian", "asian", "asian", "asian", "asian", "black", "black", "indo-aryan", "indo-aryan", "latina", "latina", "latina", "malay", "malay", "middle eastern", "middle eastern", "mixed race", "pacific islander", "semitic", "semitic", "southern european", "southern european", "white", "white", "white", "white", "white", "white", "white", "white", "white"];
			races = races.delete(V.arcologies[0].FSSubjugationistRace);
			race = races.random();
		}
		let slave = GenerateNewSlave("XX", {
			minAge: minAge, maxAge: maxAge, ageOverridesPedoMode: 1, race: race, disableDisability: 1
		});
		slave.origin = "$He was purchased from a member of the Elite.";
		slave.career = "a slave";
		slave.prestige = 1;
		slave.trust = random(60, 100);
		slave.devotion = random(60, 100);
		if (!heightPass(slave)) {
			if (V.arcologies[0].FSPetiteAdmiration > 20) {
				slave.natural.height = Height.randomAdult(slave, {limitMult: [-4, -2]});
			} else if (V.arcologies[0].FSStatuesqueGlorification > 20) {
				slave.natural.height = Height.randomAdult(slave, {limitMult: [3, 5]});
			}
			slave.height = Height.forAge(slave.natural.height, slave);
		}
		if (V.arcologies[0].FSPaternalist > 20) {
			setHealth(slave, 100, 0, 0, 0, 0);
			slave.intelligenceImplant = 30;
		} else {
			setHealth(slave, jsRandom(10, 60), undefined, undefined, 0);
			slave.intelligenceImplant = either(0, 15, 30);
		}
		let weightMin;
		let weightMax;
		if (V.arcologies[0].FSSlimnessEnthusiast > 20) {
			if (V.arcologies[0].FSHedonisticDecadence > 20 || V.arcologies[0].FSPhysicalIdealistLaw === 1) {
				weightMax = 30;
			} else {
				weightMax = 0;
			}
		} else if (V.arcologies[0].FSPhysicalIdealistLaw === 1) {
			weightMax = 30;
		} else {
			weightMax = 100;
		}
		if (V.arcologies[0].FSHedonisticDecadence > 20) {
			if (V.arcologies[0].FSSlimnessEnthusiast > 20) {
				weightMin = 10;
			} else {
				weightMin = 95;
			}
		} else {
			weightMin = -70;
		}
		slave.weight = random(weightMin, weightMax);

		let musclesMin;
		let musclesMax;
		if (V.arcologies[0].FSPhysicalIdealist > 20) {
			if (V.arcologies[0].FSPhysicalIdealistLaw === 1) {
				musclesMin = 20;
				musclesMax = 50;
			} else {
				musclesMin = 95;
				musclesMax = 100;
			}
		} else if (V.arcologies[0].FSHedonisticDecadence > 20) {
			if (V.arcologies[0].FSHedonisticDecadenceStrongFat === 1) {
				musclesMin = 50;
				musclesMax = 100;
			} else {
				musclesMin = -100;
				musclesMax = 50;
			}
		} else {
			musclesMin = -50;
			musclesMax = 50;
		}
		slave.muscles = random(musclesMin, musclesMax);
		if (V.arcologies[0].FSPhysicalIdealist > 20) {
			slave.height += 5;
		}
		eyeSurgery(slave, "both", "normal");
		slave.hears = 0;
		if (slave.weight < -30) {
			slave.waist = random(-55, 0);
		} else if (slave.physicalAge < 13) {
			slave.waist = random(-25, 25);
		} else if (slave.weight <= 30) {
			slave.waist = random(-45, 5);
		} else if (slave.weight <= 160) {
			slave.waist = random(-20, 10);
		}
		if (slave.voice < 2) {
			slave.voice++;
		}
		if (slave.accent > 1) {
			slave.accent = 1;
		}
		if (slave.shoulders > 0) {
			slave.shoulders -= 2;
		}
		if (V.arcologies[0].FSAssetExpansionist > 20) {
			slave.boobs = (random(50, 500) * 100);
			slave.butt = random(6, 20);
			if (V.arcologies[0].FSTransformationFetishist > 20) {
				slave.boobsImplant = slave.boobs - 200;
				if (slave.boobsImplant > 10000) {
					slave.boobsImplantType = "hyper fillable";
				} else {
					slave.boobsImplantType = "advanced fillable";
				}
				slave.buttImplant = slave.butt - 1;
				if (slave.buttImplant > 9) {
					slave.buttImplantType = "hyper fillable";
				} else {
					slave.buttImplantType = "advanced fillable";
				}
			}
		} else if (V.arcologies[0].FSSlimnessEnthusiast > 20) {
			slave.boobs = (random(3, 5) * 100);
			slave.butt = random(0, 2);
			if (V.arcologies[0].FSTransformationFetishist > 20) {
				slave.boobsImplant = slave.boobs - 50;
				slave.boobsImplantType = "normal";
				if (slave.butt > 1) {
					slave.buttImplant = 1;
					slave.buttImplantType = "normal";
				}
			}
		} else {
			slave.boobs = (random(5, 10) * 100);
			slave.butt = random(3, 7);
			if (V.arcologies[0].FSTransformationFetishist > 20) {
				slave.boobsImplant = slave.boobs - 200;
				slave.boobsImplantType = "normal";
				slave.buttImplant = slave.butt - 1;
				slave.buttImplantType = "normal";
			}
		}
		if (slave.nipples === "tiny") {
			slave.nipples = "puffy";
		}
		if (V.arcologies[0].FSTransformationFetishist > 20) {
			if (slave.boobsImplant / slave.boobs >= 0.90) {
				slave.boobShape = "spherical";
				slave.nipples = "flat";
			} else {
				slave.boobShape = "normal";
			}
		} else {
			slave.boobShape = either("perky", "perky", "torpedo-shaped", "wide-set");
		}
		slave.face = 100;
		slave.faceShape = either("cute", "cute", "exotic", "exotic", "normal", "normal", "sensual", "sensual", "sensual");
		slave.lips = random(45, 75);
		if (V.arcologies[0].FSTransformationFetishist > 20) {
			slave.lips += 25;
			slave.lipsImplant = 25;
		}
		if (slave.teeth !== "normal" && slave.physicalAge >= 12) {
			slave.teeth = "normal";
		}
		if (slave.vaginaLube === 0) {
			slave.vaginaLube++;
		}
		slave.preg = 0;
		slave.counter.birthsTotal = either(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 4);
		if (V.arcologies[0].FSPastoralist > 20 || slave.counter.birthsTotal > 0) {
			slave.lactation = 1;
			if (V.arcologies[0].FSPastoralist > 20) {
				slave.lactationAdaptation = V.arcologies[0].FSPastoralist;
			} else {
				slave.lactationAdaptation = Math.min(slave.counter.birthsTotal * 10, 100);
			}
		} else {
			slave.lactation = either(0, 0, 0, 0, 1);
		}
		if (slave.lactation > 0) {
			slave.lactationDuration = 2;
		}
		if (slave.counter.birthsTotal > 0) {
			slave.vagina = random(2, 3);
			slave.pregWeek = either(-4, -3, -2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		} else {
			slave.vagina = random(0, 3);
			slave.pregWeek = 0;
		}
		if (slave.hips <= 0) {
			slave.hips = 1;
		}
		if (V.arcologies[0].FSGenderRadicalist > 20) {
			slave.dick = random(2, 5);
			slave.balls = random(2, 10);
			slave.scrotum = slave.balls;
			slave.prostate = either(1, 2, 3);
			slave.vasectomy = 1;
		}
		slave.makeup = 2;
		slave.nails = 1;
		if (slave.vagina === 0) {
			slave.skill.vaginal = 30;
		} else {
			slave.skill.vaginal = 60;
		}
		if (slave.anus === 0) {
			slave.skill.anal = 10;
		} else {
			slave.skill.anal = 60;
		}
		slave.skill.oral = 60;
		slave.chastityVagina = 1;
		slave.intelligence = random(51, 100);
		if (V.arcologies[0].FSIntellectualDependency > 20) {
			slave.energy = 100;
			slave.attrXY = 100;
		} else if (V.arcologies[0].FSSlaveProfessionalism > 20) {
			slave.intelligence = Intelligence.random({limitIntelligence: [80, 100]});
			if (slave.vagina >= 0) {
				slave.skill.vaginal = 100;
			}
			if (penetrativeSocialUse(slave) >= 40) {
				slave.skill.penetrative = 100;
			}
			slave.skill.anal = 100;
			slave.skill.oral = 100;
			slave.skill.entertainment = 100;
			slave.skill.whoring = 100;
			slave.intelligenceImplant = 30;
		}
		slave.attrKnown = 1;
		slave.fetishKnown = 1;
		slave.behavioralQuirk = "confident";
		slave.sexualQuirk = either("caring", "caring", "gagfuck queen", "perverted", "romantic", "romantic", "strugglefuck queen", "tease", "unflinching");
		slave.pubertyXX = 1;
		slave.breedingMark = 1;

		const complianceText = App.Desc.lawCompliance(slave, "Elite Slave");
		const cost = slaveCost(slave, false, true);

		App.UI.DOM.appendNewElement("p", el, `It will take ${cashFormat(cost)} to win the auction.`);

		if (V.cash >= cost) {
			App.UI.DOM.appendNewElement(
				"p",
				el,
				App.UI.DOM.link(
					`Place that bid`,
					() => {
						cashX(forceNeg(cost), "slaveTransfer", slave);
						jQuery("#slave-markets").empty().append(App.UI.newSlaveIntro(slave));
					}
				)
			);
		} else {
			App.UI.DOM.appendNewElement("p", el, `You lack the necessary funds to place a winning bid.`, "note");
		}

		el.append(App.Desc.longSlave(slave, {market: "Elite Slave", marketText: complianceText}));
	}
	return el;
};
