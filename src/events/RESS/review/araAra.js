App.Events.RESSAraAra = class RESSAraAra extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.physicalAge > 35,
				s => s.rules.speech !== "restrictive",
				s => [Job.PUBLIC, Job.WHORE].includes(s.assignment),
				s => s.devotion >= -20,
				s => s.devotion <= 95,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(`Passing by the kitchen in the morning, you take a moment to listen to the low hum of your slaves chatting as they`);
		if (V.cockFeeder !== 0) {
			r.push(`wait their turn at the phallic feeders.`);
		} else {
			r.push(`drink their breakfasts.`);
		}
		r.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		r.push(`is nearest the door, and you overhear ${his}`);
		if (eventSlave.voice === 1) {
			r.push(`low`);
		} else if (eventSlave.voice === 2) {
			r.push(`pretty`);
		} else {
			r.push(`high`);
		}
		r.push(
			`voice clearly as ${he} expresses confusion to another slave.`,
			Spoken(eventSlave, `"I don't understand it,"`),
			`${he} ${say}s.`,
			Spoken(eventSlave, `"Why are so many men interested in an old slave like me? I never got this much attention when I was free! Now`)
		);
		if (eventSlave.assignment === Job.WHORE || eventSlave.assignment === Job.BROTHEL) {
			r.push(Spoken(eventSlave, `guys line up to pay to fuck me!"`));
		} else {
			r.push(Spoken(eventSlave, `every guy I approach wants to fuck me!"`));
		}
		r.toParagraph();
		if (FutureSocieties.isActive('FSMaturityPreferentialist')) {
			r.push(`"It's different here," the other slave explains. "Almost everyone here has a thing for older ${V.seeDicks < 100 ? "women. MILFs" : "men. DILFs"} get all the attention."`); // review seeDicks here
		} else if (FutureSocieties.isActive('FSGenderRadicalist') && (eventSlave.dick > 0 || eventSlave.vagina === -1)) {
			if (eventSlave.vagina > -1) {
				r.push(`"Well, you're a futa," the other slave explains. "A chick with a dick. Everyone here is going to want to fuck you, since you've got both."`);
			} else if (eventSlave.balls > 0) {
				r.push(`"Well, I bet you cum when they fuck you," the other slave explains. "They love it when you do that here."`);
			} else if (eventSlave.dick === 0) {
				r.push(`"You've got nothing in front," the other slave explains. "That's like an advertisement that your ass is public, here."`);
			} else {
				r.push(`"You've got a soft girldick," the other slave explains. "That's like an advertisement that you love it up the butt, here."`);
			}
		} else if (FutureSocieties.isActive('FSAssetExpansionist') && eventSlave.boobs > 4000) {
			r.push(`"It's your boobs," the other slave explains. "There's no such thing as too big, here. Everyone who sees your boobs here is going to want to fuck you."`);
		} else if (FutureSocieties.isActive('FSAssetExpansionist') && eventSlave.butt > 7) {
			r.push(`"It's your ass," the other slave explains. "There's no such thing as too big, here. Everyone who sees your ass here is going to want to fuck you."`);
		} else if ((FutureSocieties.isActive('FSRepopulationFocus')) && eventSlave.belly >= 5000) {
			r.push(`"It's your belly," the other slave explains. "They love how big and round it is. If you look pregnant, they'll be all over you. Even if it's fake, they won't care."`);
		} else if (V.arcologies[0].FSRepopulationFocusPregPolicy === 1 && eventSlave.bellyPreg >= 5000) {
			r.push(`"It's your belly," the other slave explains. "Preggos are in these days and you aren't exactly lacking in the 'with child' department."`);
		} else if (FutureSocieties.isActive('FSPastoralist') && eventSlave.boobs >= 800 && eventSlave.lactation > 0 && eventSlave.lactationAdaptation > 50) {
			r.push(`"It's those plump, milky titties you have," the other slave explains. "Everyone here is thirsty for a motherly body like yours, in more ways than one."`);
		} else if ((FutureSocieties.isActive('FSTransformationFetishist') && eventSlave.boobsImplant/eventSlave.boobs) >= .50) {
			r.push(`"It's your fake tits," the other slave explains. "They love how fake they look, here. If you look like a bimbo, they don't care if you're a little mature."`);
		} else if (FutureSocieties.isActive('FSHedonisticDecadence') && eventSlave.weight > 95) {
			r.push(`"You're so fat," the other slave explains. "Everyone here loves thick ${girl}s. They don't care that you're a little mature; that just means you understand life's pleasures more."`);
		} else if (FutureSocieties.isActive('FSPhysicalIdealist') && eventSlave.muscles > 50) {
			r.push(`"It's how ripped you are," the other slave explains. "It promises you won't give out after one fuck, no matter how old you are."`);
		} else if (FutureSocieties.isActive('FSSlimnessEnthusiast') && eventSlave.boobs < 800 && eventSlave.butt < 3) {
			r.push(`"You're so slim," the other slave explains. "Everyone here loves slender ${girl}s. They don't care that you're a little mature; they think you're hot."`);
		} else if (FutureSocieties.isActive('FSStatuesqueGlorification') && heightPass(eventSlave)) {
			r.push(`"You're really fucking tall," the other slave explains. "Guys here love a ${girl} that tower over them and you're, like, the definition of tall."`);
		} else if (FutureSocieties.isActive('FSPetiteAdmiration') && heightPass(eventSlave)) {
			r.push(`"You're so small," the other slave explains. "A guy can just scoop you up and carry you off for a good time."`);
		} else if (FutureSocieties.isActive('FSBodyPurist') && eventSlave.boobsImplant === 0 && eventSlave.health.condition > 50) {
			r.push(`"It's how healthy you are, and your natural boobs," the other slave explains. "You look good and natural, and everyone likes that here, especially if you're mature."`);
		} else if ((FutureSocieties.isActive('FSIntellectualDependency')) && bimboScore(eventSlave) >= 6) {
			r.push(`"You're so hot," the other slave explains. "Guys love a ${girl} who knows a good time and your body screams 'ravish me'."`);
		} else if (eventSlave.face > 95) {
			r.push(`"It might have something to do with how incredibly beautiful you are," the other slave explains sarcastically. "Come on, you could be a model. Of course they want you."`);
		} else if (eventSlave.boobs > 4000) {
			r.push(`"It might have something to do with the fact that your tits are bigger than your head," the other slave explains sarcastically. "You look like a teenager's wet dream."`);
		} else if (eventSlave.butt > 7) {
			r.push(`"It might have something to do with that outrageous caboose you have," the other slave explains sarcastically. "You look like an ass man's wet dream."`);
		} else if (eventSlave.face > 10) {
			r.push(`"You're very pretty," the other slave explains reassuringly. "Come on, you are. It's not surprising that guys want you."`);
		} else {
			r.push(`"Is it really that surprising?" the other slave asks rhetorically. "Guys like sex. You're sex. Why shouldn't they like you? I bet fucking you feels great."`);
		}
		r.push(`There's a pause, and then the other slave continues in a more serious tone, asking, "You're not, like, unhappy with that, are you? It's really good for a slave to be in demand, you know."`);
		r.toParagraph();
		r.push(
			Spoken(eventSlave, `"Oh no, I didn't mean it like that,"`),
			`replies ${eventSlave.slaveName} hurriedly.`
		);
		if (eventSlave.energy > 80) {
			r.push(Spoken(eventSlave, `"I'm so horny all the time, it's good. I'd probably go crazy if I didn't get that much attention. Whenever anyone's done with me I can't wait for the next.`));
		} else if (eventSlave.fetish === "humiliation") {
			r.push(Spoken(eventSlave, `"It's embarrassing, but I, um, really like being so popular in public, um, like that. Where everyone can see.`));
		} else if (eventSlave.devotion > 50) {
			r.push(Spoken(eventSlave, `"I really want to do well, and it feels good that I'm able to help.`));
		} else if (eventSlave.devotion > 20) {
			r.push(Spoken(eventSlave, `"I, um, know I have to. And it's not bad, I mean, it's okay.`));
		} else {
			r.push(Spoken(eventSlave, `"I know it means I'm worth something. It's reassuring, and I remind myself of it whenever I get scared about being a slave, you know.`));
		}
		r.push(
			Spoken(eventSlave, `I didn't mean to sound conceited, either. I guess I'm still getting used to life here, that's all. Sometimes I think like I'm not, um, here, and I'm surprised so many people want me. It's kind of nice, actually,"`),
			`${he} ${say}s with some self-confidence.`
		);
		if (eventSlave.fetish === "humiliation" && eventSlave.fetishKnown === 0) {
			r.push(`It sounds like ${he} has a <span class="fetish gain">humiliation fetish!</span>`);
			eventSlave.fetishKnown = 1;
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Praise ${his} outlook`, praise),
			new App.Events.Result(`Let ${him} know you think ${he}'s attractive, too`, attractive, virginityWarning()),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0) && V.PC.dick !== 0) {
				return `This option will take ${his} virginity`;
			} else if (canDoAnal(eventSlave) && (eventSlave.anus === 0) && V.PC.dick !== 0) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function praise() {
			const r = new SpacedTextAccumulator();
			r.push(`You speak from where you are, and without preamble, startling both slaves badly. Doing their best to recover, they listen as you tell ${eventSlave.slaveName} that ${he} has a good, praiseworthy outlook on life as a sex slave.`);
			if (eventSlave.energy > 80) {
				r.push(`${His} extreme appetite for sex will serve ${him} well. It's important to love what you do, and if ${he} wakes up every morning wanting to get fucked, ${he}'ll enjoy ${his} life as a`);
				if (eventSlave.assignment === Job.WHORE || eventSlave.assignment === Job.BROTHEL) {
					r.push(`slave prostitute.`);
				} else {
					r.push(`public slut.`);
				}
			} else if (eventSlave.fetish === "humiliation") {
				r.push(`${He} should feel lucky to have a fetish for public use. It's important to love what you do, and if being openly passed around gets ${him} off, ${he}'ll enjoy ${his} life as a`);
				if (eventSlave.assignment === Job.WHORE || eventSlave.assignment === Job.BROTHEL) {
					r.push(`slave prostitute.`);
				} else {
					r.push(`public slut.`);
				}
			} else if (eventSlave.devotion > 50) {
				r.push(`It's great that ${he}'s internalized ${his} role, and wants to do well. As long as ${he} wants to perform well and applies ${himself}, you're confident that ${he}'ll continue to improve and become a better and more valuable slave.`);
			} else if (eventSlave.devotion > 20) {
				r.push(`${His} obedience is commendable. You understand that ${he} struggles with ${his} life as an involuntary sex object at times. ${He}'ll learn to do better, and as ${he} improves, ${he}'ll be all right as long as ${he} obeys you and does ${his} best.`);
			} else {
				r.push(`To describe ${his} situation bluntly, the best possible approach for ${him} is to obey you and do ${his} best. There's not really any possible outcome in which slaves can lose out by doing their best to be useful and valuable. It's in ${his} interest to do ${his} best.`);
			}
			r.push(
				Spoken(eventSlave, `"Yes, ${Master},"`),
				`they chorus automatically. You turn and go. ${eventSlave.slaveName} is taken a bit aback by your apparent omnipresence in the penthouse, but reminds ${himself} that your guidance seemed straightforward and genuine. ${He}'s <span class="trust inc">confirmed in ${his} understanding</span> of what it means to be a good ${SlaveTitle(eventSlave)}.`
			);
			eventSlave.trust += 5;
			r.toParagraph();
			return r.container();
		}

		function attractive() {
			const r = new SpacedTextAccumulator();
			const {himU, heU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
			r.push(`The slaves continue their gossip until ${eventSlave.slaveName} feels a pair of`);
			if (V.PC.title === 1) {
				r.push(`strong`);
			} else {
				r.push(`firm, feminine`);
			}
			r.push(`hands grip the sides of ${his}`);
			if (eventSlave.belly >= 150000) {
				r.push(`${belly} distended`);
			} else if (eventSlave.weight > 95) {
				r.push(`fat`);
			} else if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy-swollen`);
				} else if (eventSlave.bellyImplant >= 3000) {
					r.push(`implant-swollen`);
				} else {
					r.push(`${eventSlave.inflationType}-bloated`);
				}
			} else if (eventSlave.weight > 30) {
				r.push(`pudgy`);
			} else if (eventSlave.waist < -95) {
				r.push(`cartoonishly narrow`);
			} else if (eventSlave.muscles > 30) {
				r.push(`ripped`);
			} else if (eventSlave.waist < -10) {
				r.push(`wasp`);
			} else if (eventSlave.weight > 10) {
				r.push(`soft`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else if (eventSlave.weight >= -10) {
				r.push(`trim`);
			} else {
				r.push(`skinny`);
			}
			r.push(`waist. ${He} starts but doesn't try to turn, and shivers as you run your hands up`);
			if (eventSlave.weight > 130) {
				r.push(`the thick, soft flesh that pads ${his} ribs`);
			} else if (eventSlave.muscles > 30) {
				r.push(`the muscles that jacket ${his} ribs`);
			} else if (eventSlave.weight > 30) {
				r.push(`the soft flesh that pads ${his} ribs`);
			} else {
				r.push(`${his} ribcage`);
			}
			r.push(`and forward`);
			if (eventSlave.boobs > 3000) {
				r.push(`into the soft, weighty place formed by the overhang of ${his} massive breasts`);
			} else if (eventSlave.boobs > 300) {
				r.push(`to cup ${his} breasts`);
			} else {
				r.push(`to clasp ${him} around the sternum`);
			}
			r.push(`and pull ${him} back into your arms. The other slave watches silently, awaiting some cue as to whether ${heU}'s to join in or return to breakfast; you give ${himU} a flick of your chin, and ${heU} turns away, leaving you with ${eventSlave.slaveName}, embracing among the eating slaves.`);
			r.toParagraph();
			r.push(`You whisper into ${his} ear that you think ${he}'s attractive,`);
			if (V.PC.dick !== 0) {
				r.push(`and point out that ${he} can feel the proof between ${his} buttocks. You're hard, and your stiff prick is poking ${him} in the rear. ${He} gasps and shifts a little, and you nestle your dick even closer into the warm place between ${his} legs and ass.`);
			} else {
				r.push(`and tell ${him} that you can prove it. You grab one of ${his} hands and pull it around behind ${him}, between you, making ${him} feel your pussy. ${He} gasps at how wet it is.`);
			}
			r.push(
				Spoken(eventSlave, `"An old slave like me, ${Master}?"`),
				`${he} echoes in a small voice. An old slave like ${him}, you confirm, and tell ${him} that right now,`
			);
			if (V.PC.dick !== 0 && (canDoVaginal(eventSlave) || canDoAnal(eventSlave))) {
				if (canDoVaginal(eventSlave)) {
					r.push(`you've decided to fuck ${his} pussy. ${He} starts at the sudden vulgarity, even with your cock resting against the soft skin between the bottom of ${his} vulva and ${his} anus, and shudders with sudden pleasure as you use a hand to guide yourself inside ${his} welcoming channel.`);
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					r.push(`${his} ass is yours. ${He} starts at the sudden vulgarity, even though`);
					if (canHear(eventSlave)) {
						r.push(`hearing`);
					} else {
						r.push(`discovering`);
					}
					r.push(`that the cock that's pressing against ${his} butt will be going inside it soon can't be that surprising. ${He} cocks ${his} hips obediently, letting you force your dick up ${his} asshole.`);
					r.push(VCheck.Anal(eventSlave, 1));
				}
				r.push(`You take ${him} standing,`);
			} else {
				r.push(`some oral sex from a slave like ${him} sounds just right. You push ${him} to ${his} knees and`);
				if (V.PC.dick !== 0) {
					r.push(`push your dick into ${his} mouth,`);
				} else {
					r.push(`hold ${his} mouth to your cunt,`);
				}
				r.push(`taking your pleasure from ${him}`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			r.push(`right there among your breakfasting slaves, who try to ignore you or watch with appreciation, according to their own natures. When you're finished, you`);
			if (V.PC.dick !== 0) {
				r.push(`spin ${him} around and kiss ${him},`);
			} else {
				r.push(`pull ${him} up to ${his} feet and kiss ${him}, tasting yourself on ${his} lips and`);
			}
			r.push(`making sure ${he} knows <span class="devotion inc">you appreciate ${his} mature body</span> just as much as`);
			if (eventSlave.assignment === Job.WHORE || eventSlave.assignment === Job.BROTHEL) {
				r.push(`${his} customers do.`);
			} else {
				r.push(`your citizens do.`);
			}
			eventSlave.devotion += 5;
			r.toParagraph();
			return r.container();
		}
	}
};
