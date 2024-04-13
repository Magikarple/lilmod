App.Events.RESSDevotedEducated = class RESSDevotedEducated extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => (canWalk(s) || (canMove(s) && s.rules.mobility === "permissive")),
				hasAnyArms,
				canTalk,
				s => s.devotion > 50,
				s => s.intelligence + s.intelligenceImplant > 50,
				s => s.intelligenceImplant >= 15,
				s => s.accent < 4
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {say, title: Master} = getEnunciation(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`comes before you for a routine inspection. The ${desc} is a well-educated and obedient slave. Though ${he} performs ${his} duties devotedly and to the best of ${his} abilities, slave life is not particularly conducive to straining an individual's brainpower. You happen to run into ${eventSlave.slaveName} in the hallways of the penthouse, where ${he} takes the opportunity to wordlessly signal ${he} wishes to gain your attention.`);
		if (canTalk(eventSlave)) {
			t.push(`"${Master}," ${he} ${say}s. "${Spoken(eventSlave, `I really enjoy my role as your slave, but I just don't feel like my new life stimulates me.`)}" ${He} blushes prettily at ${his} choice of words before continuing, "${Spoken(eventSlave, `Stimulate my mind, I mean.`)}"`);
		} else {
			t.push(`${He} uses gestures to beg your pardon and explains that while ${he} enjoys life as your slave, ${he} doesn't feel like ${his} new role in your arcology allows ${him} to stimulate ${his} mind as often as it does ${his} body.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Have a conversation with ${him}`, conversation),
			canDoAnal(eventSlave) || canDoVaginal(eventSlave)
				? new App.Events.Result(`Stimulate ${his} mind and body`, stimulate, virginityCheck())
				: new App.Events.Result(),
			FutureSocieties.isActive('FSDegradationist')
				? new App.Events.Result(`A public blowbang will show ${him} what a Degradationist arcology thinks about 'educated' slaves`, blowbang)
				: new App.Events.Result(),
			FutureSocieties.isActive('FSPaternalist')
				? new App.Events.Result(`Allow ${him} to audit some advanced classes at Paternalist slave schools`, schooling)
				: new App.Events.Result()
		]);

		function conversation() {
			t = [];

			t.push(`You linger in the hallway a while with ${eventSlave.slaveName} and enjoy a brief but verbose discussion. It's clear ${he} hasn't had the chance to engage in any meaningful conversations in a while, so ${he} relishes the opportunity energetically.`);
			App.Events.addParagraph(node, t);
			t = [];

			t.push(`Though the two of you only touch upon a handful of sophisticated topics, by the time you leave ${him} to tend to other matters, ${eventSlave.slaveName} is beaming happily as ${he} continues on to ${his} duties for the day. ${He} <span class="mediumaquamarine">trusts you more</span> for taking the time to engage with ${him} intellectually.`);
			App.Events.addParagraph(node, t);
			t = [];

			eventSlave.trust += 4;
			return t;
		}

		function stimulate() {
			t = [];

			t.push(`You find a comfortable seat to sit on ${PC.dick === 0 ? "and don a strap-on" : ""} as ${he} seats ${his}`);
			if (eventSlave.butt < 2) {
				t.push(`narrow`);
			} else if (eventSlave.butt < 5) {
				t.push(`average`);
			} else if (eventSlave.butt < 8) {
				t.push(`plump`);
			} else if (eventSlave.butt < 12) {
				t.push(`impressive`);
			} else {
				t.push(`mind-blowing`);
			}
			t.push(`ass on your ${PC.dick === 0 ? "strap-on" : "dick"} and rides you. While your cock plumbs the depths of ${his} ${canDoVaginal(eventSlave) ? "pussy" : "butt"}, the two of you engage in a casual debate over a number of topics of sophistry.`);
			App.Events.addParagraph(node, t);
			t = [];

			t.push(`At the crux of one of ${his} concluding arguments, the intense pleasure from the prolonged ${canDoVaginal(eventSlave) ? "fucking" : "buttfucking"} pushes ${him} over the edge into orgasm, robbing the thrust of ${his} defense of any gravitas it once had. ${He} doesn't seem to mind however, choosing to instead wrap up ${his} remarks by <span class="hotpink">blowing you a kiss.</span>`);
			if (canDoVaginal(eventSlave)) {
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				t.push(VCheck.Anal(eventSlave, 1));
			}
			App.Events.addParagraph(node, t);
			t = [];

			eventSlave.devotion += 4;
			return t;
		}

		function blowbang() {
			t = [];

			t.push(`You tell ${him} ${he}'ll get fucked in the mouth until ${he} either gets over the idea of being special for ${his} education or until all ${his} learning is fucked out of ${his} head. You drag the protesting ${eventSlave.slaveName} out into a public plaza, restrain ${him} in stocks so that ${his} mouth is available, and inform the gathering crowd of citizens that this particular slave thinks ${himself} more than a fuckhole because of some fancy 'education'.`);
			App.Events.addParagraph(node, t);
			t = [];

			t.push(`When you return later in the evening, it becomes abundantly clear that your citizenry taught ${eventSlave.slaveName} a harsh lesson about a slave's place in ${V.arcologies[0].name}. ${eventSlave.slaveName} has certainly <span class="green">learned to keep any pretentious thoughts about ${his} education in ${his} head.</span> ${He} did, however, <span class="health dec">have quite a rough time</span> sucking all those dicks${eventSlave.skill.oral <= 30 ? `, though ${he} did learn about sucking dick, so ${he} can't claim enslavement isn't educational. ${slaveSkillIncrease('oral', eventSlave, 10)}` : "."} And last of all, you and ${eventSlave.slaveName} did make <span class="green">quite a good impression</span> today, though for widely differing reasons.`);
			App.Events.addParagraph(node, t);
			t = [];

			seX(eventSlave, "oral", "public", "penetrative", jsRandom(65, 80));
			repX(500, "event", eventSlave);
			healthDamage(eventSlave, 10);
			return t;
		}

		function schooling() {
			t = [];

			t.push(`You tell ${him} to take the day off for a trip to audit classes at ${V.arcologies[0].name}'s most renowned Paternalist slave schools. ${eventSlave.slaveName} is shocked into a reverie by your words before running to wrap ${his} ${hasBothArms(eventSlave) ? "arms" : "arm"} around you in a tight hug. When ${he} eventually untangles ${himself} from you, ${he} races off to get ready for ${his} day of intellectualism while you direct ${V.assistant.name} to make the necessary arrangements.`);
			App.Events.addParagraph(node, t);
			t = [];

			t.push(`When ${eventSlave.slaveName} returns, ${he} looks exhausted but happier than you've ever seen ${him}. It seems ${he} benefited greatly from ${V.arcologies[0].name}'s Paternalist institutions, and has grown to <span class="mediumaquamarine">trust you more</span> while also <span class="hotpink">deepening ${his} acceptance of slavery.</span>`);
			App.Events.addParagraph(node, t);
			t = [];

			eventSlave.trust += 4;
			eventSlave.devotion += 4;
			return t;
		}

		function virginityCheck() {
			if (canDoVaginal(eventSlave) && eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			} else if (canDoAnal(eventSlave) && eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}
	}
};
