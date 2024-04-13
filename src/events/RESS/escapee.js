App.Events.RESSEscapee = class RESSEscapee extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canWalk,
				s => s.devotion < -50,
				s => s.trust >= -50,
				s => s.assignment !== Job.CONFINEMENT
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him
		} = getPronouns(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push("An escape attempt occurs and is stopped almost before you are informed of it.");
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`made a rash attempt to leave the penthouse, but ${V.assistant.name} monitors everyone constantly and was able to enclose ${him} before ${he} got very far.`);
		if (V.assistant.personality <= 0) {
			t.push("It reports impersonally that the would-be escapee is locked in the entryway awaiting your judgment.");
		} else {
			t.push(`${He} reports suggestively that the would-be escapee is locked in the entryway awaiting your pleasure.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		if (V.arcologyUpgrade.drones === 1) {
			t.push(`Your advanced security systems are able to stop ${him} promptly, and there is no indication to the public that any escape attempt was made.`);
		} else {
			t.push(`Your basic security systems are only able to stop ${him} by briefly locking down your penthouse, exciting <span class="red">some adverse public comment.</span>`);
			repX(-100, "event", eventSlave);
		}
		App.Events.addParagraph(node, t);
		t = [];

		if (eventSlave.indentureRestrictions > 0) {
			t.push(`This behavior has violated ${his} indenture contract, allowing you to apply more severe punishments that might otherwise breach it.`);
			App.Events.addParagraph(node, t);
			t = [];
		}

		App.Events.addResponses(node, [
			new App.Events.Result("Do nothing", nothing),
			new App.Events.Result("Just confine the would-be escapee to prevent future attempts", confine),
			new App.Events.Result("Flog the would-be escapee", flog),
			...(V.seeExtreme === 1 ? [
				(hasAnyNaturalLegs(eventSlave) && eventSlave.heels === 0
					? new App.Events.Result("Clip the would-be escapee's tendons", clip)
					: new App.Events.Result()
				),
				(hasAnyNaturalLimbs(eventSlave)
					? new App.Events.Result("Amputate the would-be escapee's limbs", amputate)
					: new App.Events.Result()
				),
				(canSee(eventSlave)
					? new App.Events.Result("Blind the would-be escapee", blind)
					: new App.Events.Result()
				),
				(canTalk(eventSlave)
					? new App.Events.Result("Mute the would-be escapee", mute)
					: new App.Events.Result()
				)
			] : []
			)
		]);

		function nothing() {
			t = [];

			t.push(`Considering how easily this attempt was thwarted, you don't see much of a point in wasting your valuable time on punishing ${eventSlave.slaveName} in the hopes that ${he}'ll learn ${his} lesson. You send ${him} back to ${his} assigned duties, warning ${him} that you may not be so lenient in the future. ${eventSlave.slaveName} proclaims ${his} obedience, but, privately, it's clear that ${he} views your decision as <span class="mediumorchid">an act of weakness</span> rather than kindness. In addition, every single one of your other slaves not already obedient to you is <span class="orangered">encouraged in their trust that you won't hurt them</span> by this minuscule punishment of an escape attempt.`);

			eventSlave.devotion -= 10;
			eventSlave.trust += 2;
			V.slaves.forEach(function(s) { if (s.devotion <= 20) { s.trust += 8; } });

			return t;
		}

		function confine() {
			t = [];

			t.push(`You order ${eventSlave.slaveName} confined until further notice. ${eventSlave.slaveName} is <span class="hotpink">a little crushed</span> by ${his} failure to escape. However, every single one of your other slaves not already obedient to you is slightly <span class="orangered">encouraged in their trust that you won't hurt them</span> by this moderate punishment of an escape attempt.`);

			eventSlave.devotion += 4;
			assignJob(eventSlave, "stay confined");
			V.slaves.forEach(function(s) { if (s.devotion <= 20) { s.trust += 4; } });

			return t;
		}

		function flog() {
			t = [];

			t.push(`Lesser whippings are usually performed by binding a slave's hands and then securing them to the ceiling so that ${he} will dance titillatingly when struck. This is not such a beating. You tie ${eventSlave.slaveName} to a wall by ${his} wrists and ankles and flog ${him} with workmanlike thoroughness${eventSlave.pregKnown === 1 ? `, making sure to avoid accidentally ending ${his} pregnancy` : ""}. ${He} passes from angry struggles to agonized sobbing and finally to bloody, exhausted weeping before you untie ${his} now-limp form and apply first aid. ${eventSlave.slaveName}'s rebelliousness is <span class="gold">dulled by the experience,</span> and ${his} <span class="health dec">health is damaged.</span> Furthermore, every single one of your other slaves not already obedient to you is <span class="gold">frightened</span> by the example set.`);

			eventSlave.trust -= 5;
			healthDamage(eventSlave, 40);
			V.slaves.forEach(function(s) { if (s.devotion <= 20) { s.trust -= 5; } });

			return t;
		}

		function clip() {
			t = [];

			t.push(`The simple thing to do would be to sedate ${eventSlave.slaveName} and haul ${him} to the remote surgery for ${his} punishment. That would deny ${him} the added weight of terror, however, and would stop your other slaves from learning by the sight of it. So, you restrain ${him}, pronounce judgment, and drag ${his} struggling, weeping form through the penthouse to the surgery. ${eventSlave.slaveName} is <span class="mediumorchid">saddened</span> and <span class="gold">frightened</span> by this punishment, and ${his} <span class="health dec">health is damaged</span> by the surgery. Every single one of your other slaves with any resistance left in them is <span class="gold">sensibly restrained</span> from trying such rash acts.`);

			eventSlave.devotion -= 5;
			eventSlave.trust -= 5;
			eventSlave.heels = 1;
			surgeryDamage(eventSlave, 10);
			V.slaves.forEach(function(s) { if (s.devotion <= 20) { s.trust -= 5; } });

			return t;
		}

		function amputate() {
			t = [];

			t.push(`The simple thing to do would be to sedate ${eventSlave.slaveName} and haul ${him} to the remote surgery for ${his} punishment. That would deny ${him} the added weight of terror, however, and would stop your other slaves from learning by the sight of it. So, you restrain ${him}, pronounce judgment, and drag ${his} struggling, weeping form through the penthouse to the surgery. ${eventSlave.slaveName} is <span class="mediumorchid">filled with implacable hatred</span> by this terrible punishment, and ${his} <span class="health dec">health is damaged</span> by the major surgery. However, every single one of your other slaves not already obedient to you is <span class="gold">utterly terrified</span> by the example set.`);

			eventSlave.devotion -= 50;
			eventSlave.trust -= 50;
			eventSlave.diet = "healthy";
			removeLimbs(eventSlave, "all");
			surgeryDamage(eventSlave, 40);
			V.slaves.forEach(function(s) { if (s.devotion <= 20) { s.trust -= 10; } });

			return t;
		}

		function blind() {
			t = [];

			t.push(`The simple thing to do would be to sedate ${eventSlave.slaveName} and haul ${him} to the remote surgery for ${his} punishment. That would deny ${him} the added weight of terror, however, and would stop your other slaves from learning by the sight of it. So, you restrain ${him}, pronounce judgment, and drag ${his} struggling, weeping form through the penthouse to the surgery. You make sure to point out all the things ${he}'ll never get to see again. ${eventSlave.slaveName} is <span class="mediumorchid">filled with implacable hatred</span> by this terrible punishment, and ${his} <span class="health dec">health is slightly damaged</span> by the surgery. However, every single one of your other slaves not already obedient to you is <span class="gold">utterly terrified</span> by the example set.`);

			eventSlave.devotion -= 50;
			eventSlave.trust -= 50;
			eyeSurgery(eventSlave, "both", "blind");
			surgeryDamage(eventSlave, 20);
			V.slaves.forEach(function(s) { if (s.devotion <= 20) { s.trust -= 10; } });

			return t;
		}

		function mute() {
			t = [];

			t.push(`The simple thing to do would be to sedate ${eventSlave.slaveName} and haul ${him} to the remote surgery for ${his} punishment. That would deny ${him} the added weight of terror, however, and would stop your other slaves from learning by the sight of it. So, you restrain ${him}, pronounce judgment, and drag ${his} struggling, protesting form through the penthouse to the surgery. ${He} is allowed one last chance to verbally resist you, plead with you, and finally to beg with you, all in vain. ${eventSlave.slaveName} is <span class="mediumorchid">filled with hatred</span> and <span class="gold">terror</span> by this harsh punishment, and ${his} <span class="health dec">health is slightly damaged</span> by the surgery. However, every single one of your other slaves not already obedient to you is <span class="hotpink">terrified</span> by the example set.`);

			eventSlave.devotion -= 5;
			eventSlave.trust -= 25;
			eventSlave.voice = 0;
			surgeryDamage(eventSlave, 10);
			V.slaves.forEach(function(s) { if (s.devotion <= 20) { s.trust -= 5; } });

			return t;
		}
	}
};
