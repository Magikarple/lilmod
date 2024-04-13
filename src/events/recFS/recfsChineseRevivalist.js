App.Events.recFSChineseRevivalist = class recFSChineseRevivalist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSChineseRevivalist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 26, maxAge: 42, disableDisability: 1, ageOverridesPedoMode: 1
		});
		slave.origin = "$He offered $himself to you for enslavement because $he thought $he would have prospects of advancement among your slaves.";
		slave.devotion = random(30, 35);
		slave.trust = random(30, 35);
		slave.career = "a businesswoman";
		setHealth(slave, jsRandom(10, 30), undefined, undefined, 0, 0);
		slave.face = 15;
		slave.skill.oral = random(15, 40);
		slave.skill.anal = random(15, 40);
		slave.skill.whoring = random(15, 40);
		slave.skill.entertainment = random(15, 40);
		slave.intelligence = random(51, 95);
		slave.intelligenceImplant = 15;
		slave.teeth = "normal";
		slave.behavioralFlaw = either("arrogant");
		const {
			He,
			his, he, him, himself, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The call comes in from an office, and you suppress the urge to check whether ${V.assistant.name} has misidentified a business communication. The caller is a middle-aged ${woman}, not unattractive, whose face is lined with stress and worry. ${He} draws ${himself} up and says,`);
		r.push(Spoken(slave, `"I would like to apply to be your slave."`));
		r.push(`There is a flash of bitter amusement at the absurd statement, but ${he} continues,`);
		r.push(Spoken(slave, `"Business circumstances make it inevitable. I have considerable skills and experience, and it is my understanding that you value such things."`));
		r.push(`${He} forwards ${his} qualifications: they are comprehensive and open, including ${his} sexual skills as if they were merely another business asset. Which, in a way, they are.`);

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`${He} arrives in a simple, sturdy suit, which ${he} obviously wore in the correct anticipation of immediately removing and never seeing again. ${He} cooperates with the enslavement process as best ${he} can, ${his} glance confident and watchful. ${He}'s obviously calculating how to get ahead within this new place, and ${he} pays particularly close attention as the ebb and flow of business through your office brings your various slaves into ${his} view for the first time.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} arrives and works ${his} way through the enslavement process, doing ${his} best to ingratiate ${himself}. When a buyer's agent arrives, ${he} immediately understands that ${he} has been sold. ${He} looks rueful for a moment, obviously realizing that you made no commitment not to do this, and that such a commitment would have been worthless in any case. ${He} transfers ${his} focus to the agent without hesitation, doing ${his} best to improve ${his} rapidly changing position.`;
		}
	}
};
