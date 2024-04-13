App.Events.recFSPastoralistTwo = class recFSPastoralistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSPastoralist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const contractCost = sexSlaveContractCost();
		const slave = GenerateNewSlave("XX", {
			minAge: 32, maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He offered $himself for voluntary enslavement, hoping to become a valuable source of milk for you.";
		setHealth(slave, jsRandom(-20, 20), undefined, undefined, 0, 0);
		slave.devotion = random(-15, 15);
		slave.trust = random(5, 15);
		slave.lactation = 1;
		slave.lactationDuration = 2;
		slave.vagina = 1;
		slave.boobs = Math.max(slave.boobs, 250);
		slave.boobs += 200 * random(2, 5);
		slave.counter.birthsTotal = random(3, 5);
		const cost = slaveCost(slave) - contractCost;
		const {
			His, He,
			his, he, him, woman, hers
		} = getPronouns(slave);
		const {say} = getEnunciation(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(
			`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. You are understandably surprised when this turns out to not be the case; the ${woman} in the video call is modestly dressed, so ${his} newfound situation must be exceedingly recent. Nonetheless, ${he} asks to be enslaved with the same poignant sadness most people experience during their last free hours.`,
			Spoken(slave, `"All my children are gone and my husband left me,"`),
			`${he} ${say}s through tears.`,
			Spoken(slave, `"I know I'm older than most, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. But,"`),
			`${he} ${say}s as ${he} brings ${his} motherly chest into view,`,
			Spoken(slave, `"I've still got pretty big breasts, and they still give milk. One of my friends told me that you milk women, ${(V.PC.title !== 0) ? "sir" : "ma'am"}. I can't do anything else to make a living."`)
		);

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
			r.push(`${He} speaks to you as a free ${woman} while working through the enslavement process, perhaps ${he} hasn't quite grasped ${his} new role. Nonetheless, it seems as if a vast weight has been lifted from ${his} shoulders. You've seen this before, the perverse internal freedom that comes with the knowledge that ${his} life is in the hands of another now, and that all ${he} has to do or can do is obey. ${His} last words to you as a free ${woman} are an ironic statement that, while people always praised ${his} milk-filled udders as givers of life, ${he} never thought they'd save ${hers} one day.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} speaks to you as a free ${woman} while working through the enslavement process; perhaps ${he} hasn't quite grasped ${his} new role. Nonetheless, it seems as if a vast weight has been lifted from ${his} shoulders. It threatens to descend again when a purchaser's agent comes in to take ${him} away. ${He} begs to know where ${he}'s going, so you tell ${him} ${he}'s to be a cow in a slave dairy. ${He} quails at the term, but you observe that ${he}'ll be well treated and lightly used, if at all, and ${he} seems to take heart at this.`;
		}
	}
};
