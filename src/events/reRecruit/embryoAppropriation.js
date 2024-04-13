App.Events.recEmbryoAppropriation = class recEmbryoAppropriation extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0,
			() => V.PC.skill.medicine > 50,
			() => V.PC.skill.hacking > 75,
			() => (random(0, 100) > 75) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return "Embryo Appropriation";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, himself, girl, woman,
		} = getPronouns(slave);
		let r = [];

		r.push(`While perusing the confidential documents in a nearby hospital's databases, you come across a particularly interesting medical record with a rather lovely face attached to it. It would seem an incredibly attractive`);
		if (slave.actualAge > 17) {
			r.push(`young ${woman}`);
		} else if (slave.actualAge > 12) {
			r.push(`teenager`);
		} else {
			r.push(`little ${girl}`);
		}
		r.push(`with desirable genes has been has been receiving frequent prenatal checkups`);
		if (V.seeHyperPreg === 0) {
			r.push(`for ${his} growing pregnancy.`);
		} else {
			r.push(`for the multiples crowding ${his} womb.`);
		}
		r.push(`Judging by ${his} payment plan, the worrisome mother is driving ${himself} into a steep debt and doesn't even realize it. You could easily buy ${him} out and make a tidy profit off ${his} likely to be valuable ${(V.seeHyperPreg === 1) ? `children, or keep them` : `child, or keep it`} for yourself, if you wanted.`);

		App.Events.addParagraph(node, r);
		const contractCost = 10000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`${He} sobs as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} tries to resist placing ${his} biometric signature in testament to the truth of ${his} debt, but when you observe that the alternative is the death of ${him} and ${his} unborn, ${he} complies. The process is completed with a distinct anticlimax: ${he} is one of your slaves now, and soon so shall ${his} spawn.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			const profit = cost * slave.pregType;
			cashX(profit, "slaveTransfer");
			r.push(`${He} sobs as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} tries to resist placing ${his} biometric signature in testament to the truth of ${his} debt, but when you observe that the alternative is the death of ${him} and ${his} unborn, ${he} complies. A purchasing agent appears to take ${him} away, but not after the slave breeder that bought ${him} paid a ludicrous amount of ¤ per child. An additional <span class="yellowgreen">${cashFormat(profit)}</span> overall.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.minAge = Math.max(V.fertilityAge, 8);
			pram.maxAge = (V.pedo_mode === 1 ? 16 : 22);
			pram.ageOverridesPedoMode = 1;
			pram.race = "nonslave";
			const slave = GenerateNewSlave("XX", pram);
			slave.origin = "$His womb held a baby you desired.";
			slave.face = 100;
			slave.intelligence = random(96, 100);
			if (slave.vagina < 1) {
				slave.vagina = 1;
			}

			// block all genetic quirks not marked with goodTrait - can this be condensed by consulting goodTrait?
			slave.geneticQuirks.gigantism = 0;
			slave.geneticQuirks.dwarfism = 0;
			slave.geneticQuirks.neoteny = 0;
			slave.geneticQuirks.progeria = 0;
			slave.geneticQuirks.androgyny = 0;
			slave.geneticQuirks.uFace = 0;
			slave.geneticQuirks.superfetation = 0;
			slave.geneticQuirks.polyhydramnios = 0;
			slave.geneticQuirks.uterineHypersensitivity = 0;
			slave.geneticQuirks.macromastia = 0;
			slave.geneticQuirks.gigantomastia = 0;
			slave.geneticQuirks.galactorrhea = 0;
			slave.geneticQuirks.rearLipedema = 0;
			slave.geneticQuirks.wGain = 0;
			slave.geneticQuirks.wLoss = 0;
			slave.geneticQuirks.mGain = 0;
			slave.geneticQuirks.mLoss = 0;
			slave.geneticQuirks.girlsOnly = 0;
			// 50% chance of an active goodTrait genetic quirk, except wellHung
			const geneRoll = random(1, 10);
			if (geneRoll === 10) {
				slave.geneticQuirks.pFace = 2;
			} else if (geneRoll === 9) {
				slave.geneticQuirks.albinism = 2;
				slave.albinismOverride = makeAlbinismOverride(slave.race);
				applyGeneticColor(slave);
			} else if (geneRoll === 8) {
				slave.geneticQuirks.heterochromia = 2;
				setHeterochromia(slave);
			} else if (geneRoll === 7) {
				slave.geneticQuirks.fertility = 2;
			} else if (geneRoll === 6) {
				slave.geneticQuirks.hyperFertility = 2;
			}

			slave.pubertyXX = 1;
			slave.preg = 20;
			slave.pregWeek = 20;
			slave.pregKnown = 1;
			if (V.seeHyperPreg === 0) {
				slave.pregType = 1;
			} else {
				slave.pregType = random(2, 8);
			}
			SetBellySize(slave);
			return slave;
		}

		// stripped-down copy of generateRacialTraits() from generateNewSlaveJS.js
		function setHeterochromia(slave) {
			switch (slave.race) {
				case "black":
				case "malay":
				case "pacific islander":
				case "amerindian":
					eyeColor(["brown"]);
					break;
				case "white":
					if (["German", "Polish", "Danish", "Estonian", "Latvian", "Lithuanian"].includes(slave.nationality)) {
						eyeColor(["light grey", "blue", "blue", "blue", "blue", "blue", "blue", "brown", "brown", "green"]);
					} else if (["Icelandic", "Norwegian"].includes(slave.nationality)) {
						eyeColor(["light grey", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "brown", "green"]);
					} else if (["Swedish", "Finnish"].includes(slave.nationality)) {
						eyeColor(["light grey", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "brown", "green"]);
					} else if (["Irish", "Scottish"].includes(slave.nationality)) {
						eyeColor(["light grey", "blue", "blue", "blue", "brown", "brown", "green", "green", "green"]);
					} else {
						eyeColor(["light grey", "blue", "blue", "blue", "blue", "blue", "blue", "brown", "brown", "brown", "green"]);
					}
					break;
				case "latina":
					eyeColor(["blue", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "green"]);
					break;
				case "indo-aryan":
					if (["Iranian", "Pakistani", "Tajik", "Kazakh", "Kurdish", "Azerbaijani", "Syrian", "Kyrgyz", "Afghan", "Mongolian", "Turkmen", "Turkish", "Uzbek"].includes(slave.nationality) || (jsRandom(1, 8) === 1)) {
						if (jsRandom(1, 10) === 1) {
							eyeColor(["light grey", "blue", "blue", "brown", "green", "green"]);
						} else {
							eyeColor(["brown", "brown", "brown", "brown", "brown", "brown", "green"]);
						}
					} else {
						eyeColor(["brown"]);
					}
					break;
				case "catgirl":
					eyeColor(["light grey", "blue", "blue", "brown", "brown", "brown", "green"]);
					break;
				case "asian":
					eyeColor(["blue", "brown", "green"]);
					break;
				case "middle eastern":
				case "semitic":
					eyeColor(["blue", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "green"]);
					break;
				case "southern european":
					eyeColor(["blue", "brown", "brown", "brown", "brown", "brown", "green"]);
					break;
				default:
					eyeColor(["blue", "brown", "green"]);
			}

			/**
			 * @param {string[]} colors
			 */
			function eyeColor(colors) {
				setGeneticEyeColor(slave, jsEither(colors), true);
			}
		}
	}
};
