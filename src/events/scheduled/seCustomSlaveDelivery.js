App.Events.SEcustomSlaveDelivery = class SEcustomSlaveDelivery extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.customSlaveOrdered === 1,
			() => V.customSlaveReorder !== 1
		];
	}

	execute(node) {
		V.customSlaveOrdered = 0;
		App.UI.StoryCaption.encyclopedia = "Enslaving People";

		const delivery = generateDelivery();
		const {
			He, His,
			he, him
		} = getPronouns(delivery);

		const cost = slaveCost(delivery) * 2;

		App.UI.DOM.appendNewElement("p", node, "A slave dealer has submitted a slave to satisfy the order you posted.");

		App.UI.DOM.appendNewElement("p", node, "As usual, the asking price is quite high, to cover the costs of finding a slave to order. In compensation, you can freely decline the slave and keep the order open, or even modify it later.", "scene-intro");

		App.UI.DOM.appendNewElement("p", node, App.Desc.longSlave(delivery, {market: "generic"}));

		App.UI.DOM.appendNewElement("p", node, `${His} price is ${cashFormat(cost)}.`);

		const result = App.UI.DOM.appendNewElement("p", node);

		if (V.cash >= cost) {
			App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
				"Accept the offered slave",
				() => {
					cashX(forceNeg(cost), "slaveTransfer", delivery);
					jQuery(result).empty().append(`${He} has been reasonably broken by the dealer that offered ${him} to you. ${He} has also picked up on the fact that ${he} was specially selected, and is a little hopeful that this means ${he} may be treated well. ${He} is now awaiting your instructions.`, App.UI.newSlaveIntro(delivery));
				}
			));
		} else {
			App.UI.DOM.appendNewElement("div", result, App.UI.DOM.disabledLink("Accept the offered slave", [`You lack the necessary funds to accept the offered slave.`]), "note");
		}
		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			"Reject this offer and place the same order again",
			() => {
				V.customSlaveOrdered = 1;
				V.customSlaveReorder = 1;
			},
			[],
			V.nextLink
		));

		function generateDelivery() {
			const pram = {
				mature: 0,
				nationality: (V.customSlave.nationality !== "Nationality is unimportant") ? V.customSlave.nationality : undefined,
				ageOverridesPedoMode: 1
			};
			if (V.customSlave.age === 2) {
				pram.minAge = V.minimumSlaveAge;
				pram.maxAge = 2;
			} else if (V.customSlave.age === 4) {
				pram.minAge = 3;
				pram.maxAge = 4;
			} else if (V.customSlave.age === 6) {
				pram.minAge = 5;
				pram.maxAge = 6;
			} else if (V.customSlave.age === 9) {
				pram.minAge = 7;
				pram.maxAge = 9;
			} else if (V.customSlave.age === 12) {
				pram.minAge = 10;
				pram.maxAge = 12;
			} else if (V.customSlave.age === 14) {
				pram.minAge = 13;
				pram.maxAge = 14;
			} else if (V.customSlave.age === 17) {
				pram.minAge = 15;
				pram.maxAge = 17;
			} else if (V.customSlave.age === 19) {
				pram.minAge = 18;
				pram.maxAge = 19;
			} else if (V.customSlave.age === 20) {
				pram.minAge = 20;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 24) {
				pram.minAge = 20;
				pram.maxAge = 24;
			} else if (V.customSlave.age === 25) {
				pram.minAge = 25;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 29) {
				pram.minAge = 25;
				pram.maxAge = 29;
			} else if (V.customSlave.age === 30) {
				pram.minAge = 30;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 39) {
				pram.minAge = 30;
				pram.maxAge = 39;
			} else if (V.customSlave.age === 40) {
				pram.minAge = 40;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 49) {
				pram.minAge = 40;
				pram.maxAge = 49;
			} else if (V.customSlave.age === 50) {
				pram.minAge = 50;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 59) {
				pram.minAge = 50;
				pram.maxAge = 59;
			} else if (V.customSlave.age === 60) {
				pram.minAge = 60;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 69) {
				pram.minAge = 60;
				pram.maxAge = 69;
			} else if (V.customSlave.age === 70) {
				pram.minAge = 70;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 79) {
				pram.minAge = 70;
				pram.maxAge = 79;
			} else if (V.customSlave.age === 80) {
				pram.minAge = 80;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 89) {
				pram.minAge = 80;
				pram.maxAge = 89;
			} else if (V.customSlave.age === 90) {
				pram.minAge = 90;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 99) {
				pram.minAge = 90;
				pram.maxAge = 99;
			} else if (V.customSlave.age === 100) {
				pram.minAge = 100;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 109) {
				pram.minAge = 100;
				pram.maxAge = 109;
			} else if (V.customSlave.age === 110) {
				pram.minAge = 110;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 119) {
				pram.minAge = 110;
				pram.maxAge = 119;
			} else if (V.customSlave.age === 120) {
				pram.minAge = 120;
				pram.maxAge = V.retirementAge - 1;
			} else if (V.customSlave.age === 129) {
				pram.minAge = 120;
				pram.maxAge = 129;
			} else {
				pram.minAge = 130;
				pram.maxAge = V.retirementAge - 1;
			}
			if (V.customSlave.race !== "ethnicity is unimportant") {
				pram.race = V.customSlave.race;
			}

			const delivery = GenerateNewSlave((V.customSlave.sex === 2) ? "XY" : "XX", pram);

			if (V.customSlave.sex === 2) {
				delivery.dick = V.customSlave.dick;
				delivery.balls = V.customSlave.balls;
				delivery.scrotum = delivery.balls;
				delivery.foreskin = delivery.dick;
				delivery.skill.penetrative = V.customSlave.skills;
			} else {
				if (V.customSlave.virgin === 0) {
					delivery.vagina = V.customSlave.virgin;
				}
				delivery.labia = V.customSlave.labia;
				delivery.vaginaLube = V.customSlave.vaginaLube;
				delivery.skill.vaginal = V.customSlave.skills;
				if (V.customSlave.sex === 3) {
					delivery.dick = V.customSlave.dick;
					delivery.balls = V.customSlave.balls;
					delivery.scrotum = delivery.balls;
					delivery.foreskin = delivery.dick;
					delivery.skill.penetrative = V.customSlave.skills;
					if (delivery.dick === 0) {
						delivery.clit = V.customSlave.clit;
						delivery.foreskin = delivery.clit;
					}
				} else {
					delivery.clit = V.customSlave.clit;
				}
			}

			/* I have no clue what I'm doing here */
			if (V.customSlave.heightMod === "greatly below average") {
				delivery.natural.height = Height.randomAdult(delivery, {skew: -5, spread: 0.15, limitMult: [-5, -2]});
			} else if (V.customSlave.heightMod === "below average") {
				delivery.natural.height = Height.randomAdult(delivery, {skew: -1, limitMult: [-2, 0]});
			} else if (V.customSlave.heightMod === "normal") {
				delivery.natural.height = Height.randomAdult(delivery, {limitMult: [-1, 1]});
			} else if (V.customSlave.heightMod === "above average") {
				delivery.natural.height = Height.randomAdult(delivery, {skew: 1, limitMult: [0, 2]});
			} else {
				delivery.natural.height = Height.randomAdult(delivery, {skew: 5, spread: 0.15, limitMult: [2, 5]});
			}
			delivery.height = Height.forAge(delivery.natural.height, delivery);

			if (V.customSlave.intelligence === 3) {
				delivery.intelligence = random(96, 100);
			} else if (V.customSlave.intelligence === 2) {
				delivery.intelligence = random(51, 95);
			} else if (V.customSlave.intelligence === 1) {
				delivery.intelligence = random(15, 50);
			} else if (V.customSlave.intelligence === -1) {
				delivery.intelligence = random(-50, -16);
			} else if (V.customSlave.intelligence === -2) {
				delivery.intelligence = random(-95, -51);
			} else if (V.customSlave.intelligence === -3) {
				delivery.intelligence = random(-100, -96);
			} else {
				delivery.intelligence = random(-15, 15);
			}
			delivery.intelligenceImplant = V.customSlave.intelligenceImplant;

			if (V.customSlave.analVirgin === 0) {
				delivery.anus = V.customSlave.analVirgin;
			}
			delivery.voice = V.customSlave.voice >= 0 ? V.customSlave.voice : random(0, 3);
			setHealth(delivery, V.customSlave.health * 80, 0, 0, 0, 0);
			delivery.muscles = V.customSlave.muscles;
			delivery.weight = V.customSlave.weight;
			delivery.face = V.customSlave.face;
			delivery.lips = V.customSlave.lips;
			if (V.customSlave.skin !== "left natural") {
				delivery.origSkin = V.customSlave.skin;
				delivery.skin = getGeneticSkinColor(delivery);
			}
			if (V.customSlave.hairColor !== "hair color is unimportant") {
				delivery.origHColor = V.customSlave.hairColor;
				delivery.hColor = getGeneticHairColor(delivery);
				delivery.eyebrowHColor = getGeneticHairColor(delivery);
				delivery.pubicHColor = getGeneticHairColor(delivery);
				delivery.underArmHColor = getGeneticHairColor(delivery);
			}
			if (V.customSlave.eyesColor !== "eye color is unimportant") {
				delivery.eye.origColor = V.customSlave.eyesColor;
				delivery.eye.left.iris = getGeneticEyeColor(delivery);
				delivery.eye.right.iris = getGeneticEyeColor(delivery);
			}
			delivery.boobs = V.customSlave.boobs;
			delivery.natural.boobs = delivery.boobs;
			delivery.butt = V.customSlave.butt;
			delivery.skill.anal = V.customSlave.skills;
			delivery.skill.oral = V.customSlave.skills;
			delivery.skill.entertainment = V.customSlave.skill.whore;
			delivery.skill.whoring = V.customSlave.skill.whore;
			delivery.skill.combat = V.customSlave.skill.combat;
			delivery.eye.left.vision = V.customSlave.eye.left.vision;
			delivery.eye.right.vision = V.customSlave.eye.right.vision;
			delivery.hears = V.customSlave.hears;
			delivery.smells = V.customSlave.smells;
			delivery.tastes = V.customSlave.tastes;
			delivery.arm = V.customSlave.arm;
			delivery.leg = V.customSlave.leg;
			delivery.weekAcquired = V.week;
			delivery.origin = "You purchased $him by special order.";
			delivery.career = "a slave";
			delivery.sexualFlaw = either("none");
			delivery.behavioralFlaw = either("none");
			delivery.devotion = random(-10, 10);
			delivery.trust = random(-10, 10);
			return delivery;
		}
	}
};
