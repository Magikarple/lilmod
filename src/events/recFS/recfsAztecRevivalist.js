App.Events.recFSAztecRevivalist = class recFSAztecRevivalist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSAztecRevivalist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XX", {minAge: 22, maxAge: 28, disableDisability: 1});
		slave.origin = "$He offered $himself to you for enslavement because $he needs to feel a higher call.";
		slave.devotion = random(25, 50);
		slave.trust = random(25, 50);
		slave.career = "a merchant";
		setHealth(slave, jsRandom(-20, 20), undefined, undefined, 0, 0);
		slave.face = random(-20, 0);
		slave.anus = 0;
		if (slave.vagina !== -1) {
			slave.vagina = 0;
		}
		slave.skill.vaginal = 1;
		slave.skill.anal = 1;
		slave.skill.oral = 1;
		slave.skill.whoring = 0;
		slave.skill.entertainment = 0;
		slave.intelligence = random(16, 95);
		slave.intelligenceImplant = 15;
		slave.teeth = "normal";

		const {
			His, He,
			his, he, him, himself, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The call comes in from an old world trading colony. The caller is a ${woman} who humbly explains how tired ${he} is from all the godless people and terrible conditions, and expresses interest to join the old empires. ${He} probably knows only of the incredible architecture and the military accomplishments that are advertised in vids. Though the sacrifice and collaring of slaves is no secret, most people never find out the real truth to what you do. Nevertheless ${he}'s incredibly willing, so much so that ${he} almost signs ${himself} off to you by accident. ${His} file is displayed in front if you, pending your reaction.`);

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
			r.push(`${He} arrives awestruck by`);
			if (canSee(slave)) {
				r.push(`all the sights`);
			} else {
				r.push(`everything`);
			}
			r.push(`${he} passed through to get to your abode. ${He} probably didn't see anything too extreme, but ${he} will soon. Feeling your gaze on ${his} body, ${he} quickly abandons all fears from ${his} past life, strips off ${his} clothes, and submits to you fully. Only time will tell if ${he} made a mistake.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} arrives so terrified, ${he} can't stop shaking and won't acknowledge most of your commands. It seems ${he} realized what really goes on in this arcology. The blood and gruesome mutilation is very far from ${he} envisioned for ${his} future; ${V.arcologies[0].name} is a close reproduction of the miasma of death that accompanied the Aztecs. ${He}'s currently too shaken to realize what awaits ${him}. Whether good or bad, ${he} can't back out. ${He}'s yours.`;
		}
	}
};
