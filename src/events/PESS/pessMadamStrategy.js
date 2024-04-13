App.Events.pessMadamStrategy = class pessMadamStrategy extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Madam,
			() => App.Entity.facilities.brothel.employeesIDs().size >= 5,
			() => S.Madam.actualAge >= 35 || V.AgePenalty === 0,
			() => S.Madam.skill.whoring >= 100
		];
	}

	execute(node) {
		const {
			He,
			he, his, him, himself
		} = getPronouns(S.Madam);
		App.Events.drawEventArt(node, S.Madam);

		App.Events.addParagraph(node, [
			`Your madam`,
			App.UI.DOM.slaveDescriptionDialog(S.Madam),
			`is a perceptive whore mistress. You are a clever and well-informed manager, of course, and ${V.assistant.name} is as well-informed as it is physically possible to be about anything that happens within ${his} sensor net, but the madam has special insight. ${He} sees more sex in person than anyone in the arcology, not excepting you, and may even know some of your brothel slaves better than you do. This certainly extends to their sexualities and skills; if ${he} ever has any doubts about any of them, ${he} usually fucks them ${himself} to get at the truth.`
		]);

		const choices = [];
		choices.push(new App.Events.Result(`Review ${his} charges' skills with ${him}`, review));
		choices.push(new App.Events.Result(`Talk over the whores' appearance and correct any deficiencies`, surgery, "This option will have incidental surgical costs"));

		App.Events.addResponses(node, choices);

		function review() {
			S.Madam.devotion += 4;
			for (const slave of V.slaves) {
				if (slave.assignment === Job.BROTHEL) {
					if (slave.skill.oral < 100) {
						slave.skill.oral += 5;
					} else if (slave.skill.vaginal < 100 && slave.vagina > 0) {
						slave.skill.vaginal += 5;
					} else if (slave.skill.anal < 100) {
						slave.skill.anal += 5;
					} else if (slave.skill.penetrative < 100 && penetrativeSocialUse(slave) >= 40) {
						slave.skill.penetrative += 5;
					}
				}
			}
			return `You call ${S.Madam.slaveName} up to your office; ${he} enters with the clear anticipation of being thrown over your desk, but instead finds ${himself} sitting across it from you, taking part in a three-way strategy session between you and ${V.assistant.name}. The three of you carefully review the sexual advantages and disadvantages of each of ${his} whores. ${He} is <span class="devotion inc">properly deferential,</span> but definitely has insight to offer about how many of them satisfy customers. With ${his} input, you put together a plan to <span class="skill inc">address</span> their deficiencies with instruction and hands-on correction.`;
		}

		function surgery() {
			S.Madam.devotion += 4;
			for (const slave of V.slaves) {
				if (slave.assignment === Job.BROTHEL) {
					if (slave.boobs < 400) {
						slave.boobs += 200;
						slave.boobsImplant += 200;
						if (slave.boobsImplantType === "none") {
							slave.boobsImplantType = "normal";
						}
						cashX(forceNeg(Math.trunc(200*V.upgradeMultiplierMedicine)), "slaveSurgery", slave);
					} else if (slave.butt < 3) {
						slave.butt += 1;
						slave.buttImplant += 1;
						if (slave.buttImplantType === "none") {
							slave.buttImplantType = "normal";
						}
						cashX(forceNeg(Math.trunc(200*V.upgradeMultiplierMedicine)), "slaveSurgery", slave);
					} else if (slave.face < 95 && slave.faceImplant <= 10) {
						slave.face = Math.clamp(slave.face+20, -100, 100);
						slave.faceImplant += 25-5*Math.trunc(V.PC.skill.medicine/100)-5*V.surgeryUpgrade;
						cashX(forceNeg(Math.trunc(200*V.upgradeMultiplierMedicine)), "slaveSurgery", slave);
					} else if (slave.waist > -10) {
						slave.waist -= 20;
						cashX(forceNeg(Math.trunc(200*V.upgradeMultiplierMedicine)), "slaveSurgery", slave);
					} else if (slave.visualAge > 35 && slave.ageImplant === 0 && slave.faceImplant <= 10) {
						applyAgeImplant(slave);
						slave.faceImplant += 25-5*Math.trunc(V.PC.skill.medicine/100)-5*V.surgeryUpgrade;
						cashX(forceNeg(Math.trunc(200*V.upgradeMultiplierMedicine)), "slaveSurgery", slave);
					} else if (slave.lips <= 40) {
						slave.lips += 10;
						slave.lipsImplant += 10;
						cashX(forceNeg(Math.trunc(200*V.upgradeMultiplierMedicine)), "slaveSurgery", slave);
					}
				}
			}
			return `You call ${S.Madam.slaveName} up to your office; ${he} enters with the clear anticipation of being thrown over your desk, but instead finds ${himself} sitting across it from you, taking part in a three-way inventory review with you and ${V.assistant.name}. The three of you carefully review the appearance of each of ${his} whores. ${He} is <span class="devotion inc">properly deferential,</span> but definitely has insight to offer about how many of them appeal to customers. With ${his} input, you put together a plan to <span class="change positive">correct</span> their deficiencies when they can be pulled out of a shift for a quick surgical improvement.`;
		}
	}
};
