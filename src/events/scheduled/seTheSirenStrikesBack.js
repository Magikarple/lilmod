App.Events.SETheSirenStrikesBack = class SETheSirenStrikesBack extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSPaternalistDecoration === 100
		];
	}

	castActors() {
		return (this.actors.length > 0); // this event must be cast when queued
	}

	execute(node) {
		let r = [];

		V.nextButton = "Continue";
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		V.swanSong = 3;

		const swan = getSlave(this.actors[0]); // may be undefined, if the swan was sold/killed since recPaternalistSwanSong

		const minAge = (V.pedo_mode === 1) ? 16 : 30;
		const producer = GenerateNewSlave(null, {
			minAge: minAge, maxAge: 40, ageOverridesPedoMode: 1, disableDisability: 1
		});
		producer.origin = "$He was brought to you to pay for what $he did to one of your slaves.";
		producer.career = "a producer";
		producer.devotion = random(-70, 30);
		producer.trust = random(-100, -70);
		setHealth(producer, jsRandom(-20, 20), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), 0, jsRandom(0, 20));
		producer.anus = 0;
		if (producer.vagina > -1) {
			producer.vagina = 1;
			producer.preg = -1;
		}
		if (producer.dick > 0) {
			producer.skill.penetrative = 15;
		}
		producer.skill.vaginal = 0;
		producer.skill.oral = 0;
		producer.skill.anal = 0;
		producer.behavioralFlaw = "none";
		producer.hStyle = "neat";
		producer.pubicHStyle = "waxed";
		producer.underArmHStyle = "waxed";
		producer.intelligenceImplant = 30;
		producer.intelligence = 100;
		producer.prestige = 3;
		producer.prestigeDesc = "$He was a well known music producer infamous for constantly having musicians disappear on $his watch.";
		producer.accent = 1;
		producer.clothes = "nice business attire";
		const {
			He,
			he, him, his
		} = getPronouns(swan ? swan : {pronoun: App.Data.Pronouns.Kind.neutral});
		const {
			He2,
			he2, hers2, him2, his2, girl2,
		} = getPronouns(producer).appendSuffix("2");

		App.Events.drawEventArt(node, producer);

		App.Events.addParagraph(node, [`Several weeks have passed since you gained the musical prodigy and you couldn't help but notice ${his} constant scowl and muttering about "getting revenge one day" or "wishing ${his} producer would pay for what happened" whenever ${he} was not working. You decide to look into the incident and direct ${V.assistant.name} to look into the financial situation of ${his} record label. It turns out that not only should this slave not be eligible for enslavement due to ${his} performance profits, but a certain someone has been taking that money for themselves. You issue a bounty for ${his} producer and await a response. With surprising speed, an answer comes from a bounty hunter. The underhanded producer never left the arcology, instead opting to make use of the guest living arrangements you had set up for the concert. Only when an announcement of the bounty went out did ${he2} realize ${his2} peril and attempt to flee. The bounty hunter literally drags the escapee by the collar into your penthouse and throws ${him2} at your feet. The coward shivers as your eyes meet ${hers2}.`]);

		App.Events.addParagraph(node, [`"Please, don't hurt me! I'll pay for that slave I sent you to be released, even set ${him} up with the life ${he} would have had if I hadn't embezzled the profits!"`]);

		if (swan && swan.fuckdoll === 0 && swan.fetish !== Fetish.MINDBROKEN) {
			const {title: Master} = getEnunciation(swan);
			r.push(`Just as the little weasel at your feet finishes, ${swan.slaveName}`);
			if (canWalk(swan)) {
				r.push(`walks in,`);
			} else {
				r.push(`is carried in,`);
			}
			r.push(`${his} face quickly donning a scowl of pure anger and hatred.`);
			if (canTalk(swan)) {
				r.push(`"${Master}, please let me have my revenge on this despicable lowlife," ${he} hisses. "I promise not to kill ${him2}, just hurt ${him2} enough to let ${him2} know the suffering ${he2} caused me."`);
			} else {
				r.push(`${He} may not be able to talk anymore, but ${his} request of you is very clear across ${his} face.`);
			}

			App.Events.addParagraph(node, r);

			const choices = [];
			choices.push(new App.Events.Result(`Enslave ${him2}`, enslave));
			if (!isAmputee(swan)) {
				choices.push(new App.Events.Result(`Enslave ${him2} and throw ${him2} to ${swan.slaveName}`, throwTo));
			}
			App.Events.addResponses(node, choices);
		} else {
			App.Events.addParagraph(node, [`You inform the coward at your feet that the slave in question is long gone, making ${him2} panic even more at ${his2} grim situation.`]);

			App.Events.addResponses(node, [
				new App.Events.Result(`Enslave ${him2}`, enslaveNoSwan),
				new App.Events.Result(`Enslave ${him2} and punish ${him2} for their actions`, enslaveAndPunish)
			]);
		}

		function enslave() {
			return [
				`You decide to spare the coward from ${his2} former subordinate's wrath and simply enslave ${him2}.`,
				App.UI.newSlaveIntro(producer)
			];
		}

		function throwTo() {
			const frag = new DocumentFragment();
			let r = [];
			producer.clothes = "no clothing";
			healthDamage(producer, 20);
			swan.devotion += 2;
			swan.trust += 2;
			App.Events.refreshEventArt(producer);

			r.push(`You decide to give the victimized prodigy a chance for payback. ${He} moves over to ${his} former boss and begins to caress the despicable thief as ${he2} shakes with dread of what is to come. As ${he} moves lower, ${he} applies more pressure, peaking right on the genitals. The cowardly former executive yelps in pain, instinctively trying to get away from the`);
			if (hasAnyArms(swan)) {
				r.push(`hand`);
			} else {
				r.push(`foot`);
			}
			r.push(`crushing the most sensitive spot on ${his2} body. After several minutes of the coward screaming in pain, ${his2} former victim gets up and delivers a hard`);
			if (hasBothLegs(swan)) {
				r.push(`kick`);
			} else if (hasAnyLegs(swan)) {
				r.push(`stomp`);
			} else {
				r.push(`punch`);
			}
			r.push(`to the groin, eliciting another scream and causing ${his} former boss to assume the fetal position. You send for another slave to drag the whimpering slave${girl2} to ${his2} feet for inspection. Being given an opportunity for revenge has increased ${swan.slaveName}'s <span class="hotpink">devotion</span> and <span class="mediumaquamarine">trust.</span>`);
			if (swan.fetish !== "sadist" && fetishChangeChance(swan) > jsRandom(0, 100)) {
				r.push(`Abusing the producer has caused ${him} to <span class="lightcoral">develop a fondness for sadism.</span>`);
				swan.fetish = "sadist";
				swan.fetishKnown = 1;
				swan.fetishStrength = 20;
			} else if (swan.fetish === "sadist") {
				if (swan.fetishKnown === 1) {
					r.push(`Abusing the producer has increased ${his} <span class="lightcoral">fondness of sadism.</span>`);
					swan.fetishStrength += 5;
				} else {
					r.push(`Abusing the producer has revealed ${his} <span class="lightcoral">fondness of sadism!</span>`);
					swan.fetishKnown = 1;
				}
			}
			r.push(App.UI.newSlaveIntro(producer));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function enslaveNoSwan() {
			const frag = new DocumentFragment();
			let r = [];
			producer.clothes = "no clothing";
			App.Events.refreshEventArt(producer);
			r.push(`You spare the coward the pain and humiliation ${he2} deserves and simply enslave ${him2}.`);
			r.push(App.UI.newSlaveIntro(producer));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function enslaveAndPunish() {
			const frag = new DocumentFragment();
			let r = [];
			producer.clothes = "no clothing";
			App.Events.refreshEventArt(producer);
			r.push(`You decide the coward needs more punishment. You order a whip brought to you and give ${him2} several lashes directly across ${his2} exposed genitalia. ${He2} cries out with each lash as ${his2} nethers accumulate angry red welts, some even bleeding slightly. After the yelps stop, you feel enough punishment has been given for now and have the producer turned slave hauled to ${his2} feet for a proper inspection.`);
			r.push(App.UI.newSlaveIntro(producer));
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
