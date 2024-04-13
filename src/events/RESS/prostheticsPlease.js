App.Events.RESSProstheticsPlease = class RESSProstheticsPlease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.researchLab.level >= 1,
			() => V.researchLab.speed >= 300
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				s => canTalk(s),
				s => s.devotion > 50,
				s => s.trust > 20,
				s => isAmputee(s),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		App.Events.drawEventArt(node, eventSlave);

		App.Events.addNode(node, [
			`As you are inspecting ${eventSlave.slaveName}, you notice ${he} seems distant and lost in thought.`,
			`This isn't unusual, however ${eventSlave.slaveName} is quite devoted and trusting of you, so tends to be willing to speak ${his} mind.`,
			`You ask ${him} if there's something the disabled slave would like to tell you.`,
			`${He} pretends there isn't anything wrong, so you make telling you an order.`
		], "p");
		App.Events.addNode(node, [
			`"${Spoken(eventSlave, `Well, ${Master}, I'm very happy being with you, and you're a such good master, but I don't know well I can serve you like this...`)}`,
			`${Spoken(eventSlave, `I-I just think that it would be a lot easier, and I would be able to do so much better, if you gave me some prosthetics.`)}`,
			`${Spoken(eventSlave, `Then I could pleasure you without you having to do all the work. Can I please have prosthetics, ${Master}?`)}"`
		], "p");

		const interfaces = App.Data.prosthetics.interfaceP3.costs * 2 + App.Data.prosthetics.interfaceP3.adjust * 50; // borrowed from src\interaction\prostheticConfig.js
		const limbs = App.Data.prosthetics.basicL.costs * 2 + App.Data.prosthetics.basicL.adjust * 50; // borrowed from src\interaction\prostheticConfig.js
		const totalCost = interfaces + limbs;

		App.Events.addResponses(node, [
			new App.Events.Result(`Grant ${his} request`, grant, `Costs ${cashFormat(totalCost)}`),
			new App.Events.Result(`Deny ${his} request`, deny),
		]);

		function grant() {
			cashX(totalCost, "capEx");
			configureLimbs(eventSlave, "all", 2);
			eventSlave.devotion += 5;
			eventSlave.trust += 15;
			App.Events.addNode(node, [
				`You have ${eventSlave.slaveName} taken down to the prosthetic lab, to be immediately fitted for ${his} new appendages.`,
				`${He} smiles throughout the process of measuring and choosing ${his} prosthetics, and can barely contain ${himself} once the anchors are implanted in ${him} and ${his} new limbs installed.`,
				`Tentatively, ${he} uses them for the first time, and almost breaks into tears when ${he} <span class="trust inc">realizes the gift</span> you have given ${him} by doing this.`,
				`${He} is <span class="devotion inc">overwhelmingly happy</span> with you.`
			], "p");
		}

		function deny() {
			eventSlave.devotion -= 5;
			eventSlave.trust -= 5;
			App.Events.addNode(node, [
				`You tell ${eventSlave.slaveName} that <span class="trust dec">no, you will not</span> be fitting ${him} for prosthetics.`,
				`The way ${he} is now is the way you want ${him}, and unless you desire to change ${him}, ${he} will remain that way.`,
				`${He} looks dejected, but ${he}'s <span class="devotion dec">devoted enough</span> to understand that you know what's best for ${him}.`
			], "p");
		}
	}
};
