App.Events.RECIAdoptFollowUp = class RECIAdoptFollowUp extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() { // single event slave
		return [
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				s => this.validSlave(s),
				s => s.devotion >= 50,
				s => s.trust >= 50,
			]
		];
	}

	validSlave(slave) {
		return V.RECheckInIDs.some((a) => (a.ID === slave.ID && a.type === "adoptFollowUp"));
	}

	get weight() { return 5; } // given the very restrictive qualifiers, give it a bit more weight.

	execute(node) {
		/** @type {Array<App.Entity.SlaveState>} */
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {title: Master} = getEnunciation(eventSlave);
		const {He, he, His, his, him} = getPronouns(eventSlave);
		V.RECheckInIDs.deleteWith((s) => s.ID === eventSlave.ID && s.type === "adoptFollowUp");
		App.Events.drawEventArt(node, eventSlave);

		App.Events.addNode(node, [
			`While in your office, you receive an unscheduled visit from ${eventSlave.slaveName}.`,
			`${He} seems a bit nervous and before you can ask ${him} what ${he} wants,`,
			`${he} suddenly ${canTalk(eventSlave) ? `blurts out`: `attempts to convey via sign language`} a speech that seems half-prepared and half-rambling.`,
		], "p");

		if (canTalk(eventSlave)) {
			App.Events.addNode(node, [`"${Spoken(eventSlave,
				`Thank you for adopting me, ${Master}!
				I'm so grateful that you took me in!
				Everything was bad before, I could barely get food and didn't know where I was or what to do.
				You have taught me so much!
				At first I thought doing the things you wanted was horrible and disgusting, but you gave me such a good life!
				I don't care if I have to get fucked all the time, it's fun anyway!
				I love being with you ${Master}, you made my life so much better!
				You're... you're everything to me!`
			)}"`], "p");
		} else {
			App.Events.addNode(node, [`Profusely thanking you for adopting ${him} and how ${his} life has improved since then, despite a rocky start.`], "p");
		}

		App.Events.addResponses(node, [
			new App.Events.Result(`Reward ${him} with a loving fuck`, love, (eventSlave.anus === 0 || eventSlave.vagina === 0) ? App.UI.DOM.makeElement("span", `Virginity will be lost`, ["yellow"]) : ``),
			new App.Events.Result(`This slave has forgotten ${his} place`, rape, (eventSlave.anus === 0 || eventSlave.vagina === 0) ? App.UI.DOM.makeElement("span", `Virginity will be lost`, ["yellow"]) : ``),
		]);

		function love() {
			SimpleSexAct.Player(eventSlave);
			eventSlave.devotion += 5;
			eventSlave.trust += 5;
			return App.Events.addNode(node, [
				VCheck.Simple(eventSlave),
				`Wordlessly, you move towards ${eventSlave.slaveName}, who flinches slightly at your sudden presence.`,
				`You grip ${his} hips, pulling ${him} in close.`,
				`${His} face is beet red, and you can feel ${his} heart beating against your chest.`,
				`You kiss ${him} deeply before pressing ${his} against a nearby wall and lifting ${him} so you can hilt your ${V.PC.dick > 0 ? 'cock' : 'strap-on'} deep inside.`,
				`You make <span class="trust inc">slow and gentle love</span> to ${him}, savoring every moment.`,
				`When you finally cum inside and gently lower ${him} back down onto the floor, ${he} hugs you and ${canTalk(eventSlave) ? `whispers,`: `stares`}`,
				`"<span class="devotion inc">${canTalk(eventSlave) ? Spoken(eventSlave, `I love you, ${Master}.`) : `into your eyes lovingly.`}</span>"`,
			]);
		}

		function rape() {
			SimpleSexAct.Player(eventSlave);
			eventSlave.devotion -= 5;
			eventSlave.trust -= 5;
			return App.Events.addNode(node, [
				VCheck.Simple(eventSlave),
				`You abruptly stand up from your desk and explain to ${eventSlave.slaveName} that you didn't adopt ${him}... You enslaved ${him}, and that ${he} needs to learn ${his} place and the difference.`,
				`You grab ${him} and <span class="trust dec">roughly throw</span> ${him} onto the nearby couch before grabbing ${him} by the neck and shoving ${his} head into the cushions.`,
				`You penetrate ${him} hard, without warning, and proceed to rape ${him} like ${he}'s never been raped before.`,
				`<span class="devotion dec">By the time you are done,</span> ${he} is a whimpering, sobbing mess with a gaped out hole.`,
			]);
		}
	}
};
