App.Events.RETSSiblingTussle = class RETSSiblingTussle extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.minimumSlaveAge < 18
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				hasAnyArms,
				hasBothLegs,
				s => s.actualAge < 18,
				s => s.sisters > 0
			],
			[ // and her sibling
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				hasAnyArms,
				hasBothLegs,
				isSlaveAvailable,
				s => s.actualAge < 18,
				s => areSisters(getSlave(this.actors[0]), s) > 0, // sibling check
				s => App.Utils.jobForAssignment(getSlave(this.actors[0]).assignment).facility.employeesIDs().has(s.ID), // lives in the same facility
			]
		];
	}

	execute(node) {
		const [sib1, sib2] = this.actors.map(a => getSlave(a));
		const {
			he, his, him
		} = getPronouns(sib1);
		const {
			He2, he2, his2, him2
		} = getPronouns(sib2).appendSuffix("2");
		const hostFacility = App.Utils.jobForAssignment(getSlave(this.actors[0]).assignment).facility;

		App.Events.drawEventArt(node, [sib1, sib2], "no clothing");

		let t = [];
		t.push(`As you're conducting your morning rounds, you hear a commotion coming from the shower and dressing area of ${hostFacility.name}.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Like most siblings who haven't yet developed mature conflict-resolution skills,`);
		t.push(App.UI.DOM.slaveDescriptionDialog(sib1));
		t.push(`and`);
		t.push(contextualIntro(sib1, sib2, true));
		t.push(`sometimes get physical when they annoy one another. Today a tussle has broken out over some minor slight.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`The other slaves around them are mostly ignoring them in their haste to prepare for their workday, but the still wet and naked ${sib1.slaveName} and ${sib2.slaveName} sure manage to get your attention as they hit, kick, and wrestle with each other. You doubt they'll do any lasting damage, and maybe getting some of that hostile energy out will make them more compliant as the day goes on, but you also consider whether imposing some discipline might be a good idea.`);
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result("Make them kiss and make up", kissAndMakeUp), // don't think there's a need for an incest guard here, they'll break off early if necessary
			new App.Events.Result("Punish them together", punish),
			new App.Events.Result("Just watch and see what happens", watch)
		]);

		function kissAndMakeUp() {
			const frag = document.createDocumentFragment();

			t = [];
			t.push(`You walk into the dressing area and clear your throat loudly. The other slaves pause what they're doing and turn to look at you, either from devotion or fear.`);
			t.push(`After a few seconds, ${sib2.slaveName} ${canHear(sib2) ? "realizes" : "manages to realize"} that things have gone strangely quiet and scrambles to stand and pay attention to you, and ${sib1.slaveName} follows suit when ${he} realizes that the nature of their fight has changed.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`You tell the rest of the slaves to go back to what they were doing while you talk to ${sib1.slaveName} and ${sib2.slaveName}. You explain to the two of them that they have responsibilities to attend to, and that doesn't include fighting with each other, and order them to apologize to one another and kiss. When ${sib2.slaveName} tries to pin the blame for the fight on ${sib1.slaveName}, you cut ${him2} off and tell ${him2} that you're not interested in who started it, just how they're going to resolve it, and that ${he2} won't like what happens if you think ${he2}'s backtalking you.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`${He2} gets the idea, and apologizes (with somewhat questionable sincerity) to ${sib1.slaveName} for ${his2} part in things. You turn to ${sib1.slaveName} expectantly, and ${he} also apologizes to ${his} ${siblingTerm(sib1, sib2)}, and then leans in for a ${V.seeIncest === 0 ? "chaste" : ""} kiss, as directed.`);
			App.Events.addParagraph(frag, t);

			if (V.seeIncest > 0 && (sib1.energy > 60 || sib2.energy > 60)) {
				if (App.Utils.sexAllowed(sib1, sib2)) {
					t = [];
					t.push(`The kiss begins to get a little more heated and they glance at you for permission to continue instead of getting back to work immediately. While you know you should really tell them to get back to work, the rules you've set allow them to go further, and they're at least getting along. And it's pretty hot, so you're keen to watch.`);
					App.Events.addParagraph(frag, t);

					t = [];
					t.push(`As soon as they realize you aren't going to stop them, the kiss gets deeper and the groping starts in earnest.`);
					if (sib1.dick > 0) {
						t.push(`${sib2.slaveName} immediately reaches for ${his2} ${siblingTerm(sib2, sib1)}'s dick, fondling and tugging on it to make sure it's ${canAchieveErection(sib1) ? `hard` : `as half-hard as it can be`} for what they're about to do.`);
					} else if (sib1.vagina >= 0) {
						t.push(`${sib2.slaveName} immediately reaches for ${his2} ${siblingTerm(sib2, sib1)}'s soft slit, rubbing and massaging it to make sure ${he}'s good and wet.`);
					} else if (sib1.boobs >= 300) {
						t.push(`${sib2.slaveName} moves ${his2}'s hands to ${his2} ${siblingTerm(sib2, sib1)}'s tits, pawing at them and playing with ${his} ${sib1.nipples} nipples.`);
					} else { // null with no tits? c'mon...
						t.push(`${sib2.slaveName} slides ${his2} hand between ${his2} ${siblingTerm(sib2, sib1)}'s thighs, massaging the soft sensitive skin of ${his} crotch.`);
					}
					// reverse order and add a couple extra options to try to avoid similar text
					t.push(`${sib1.slaveName}, meanwhile,`);
					if (sib2.boobs >= 300) {
						t.push(`moves ${his}'s hands to ${his} ${siblingTerm(sib1, sib2)}'s tits, pawing at them and playing with ${his2} ${sib1.nipples} nipples.`);
					} else if (sib2.balls > 0 && sib1.dick > 0) { // avoid double dick groping by going for the balls
						t.push(`grabs ${his} ${siblingTerm(sib1, sib2)}'s balls, fondling them to make sure ${he2}'s going to make plenty of cum.`);
					} else if (sib2.dick > 0) {
						t.push(`grabs ${his} ${siblingTerm(sib1, sib2)}'s dick, fondling and tugging on it to make sure it's ${canAchieveErection(sib2) ? `hard` : `at least semi-hard`} for what they're about to do.`);
					} else if (sib2.clit > 0 && sib1.vagina >= 0) { // avoid double vagina groping by going for the clit
						t.push(`reaches for ${his} ${siblingTerm(sib1, sib2)}'s clit, rubbing and flicking it to make sure ${he2}'s ready for action.`);
					} else if (sib2.vagina >= 0) {
						t.push(`reaches for ${his} ${siblingTerm(sib1, sib2)}'s soft slit, rubbing and massaging it to make sure ${he2}'s good and wet.`);
					} else {
						t.push(`slides ${his} hand between ${his} ${siblingTerm(sib1, sib2)}'s thighs, massaging the soft sensitive skin of ${his2} crotch.`);
					}
					t.push(`Once they're both good and ready, they get on a dressing bench in a classic 69 position, eagerly bringing each other to orgasm orally while you watch.`);
					seX(sib1, "oral", sib2, "oral");
					App.Events.addParagraph(frag, t);
				} else {
					t = [];
					t.push(`The kiss begins to get a little more heated and you clearly see the lust growing in ${sib1.energy > sib2.energy ? sib1.slaveName : sib2.slaveName}'s eyes, but they know the rules and pull apart before they go too far.`);
					App.Events.addParagraph(frag, t);
				}
			}

			t = [];
			t.push(`They feel better, and they've both learned to <span class="trust inc">trust</span> and <span class="devotion inc">rely on</span> your judgement.`);
			App.Events.addParagraph(frag, t);

			sib1.trust += 2;
			sib1.devotion += 2;
			sib2.trust += 2;
			sib2.devotion += 2;

			return frag;
		}

		function punish() {
			const frag = document.createDocumentFragment();

			t = [];
			t.push(`You step between the two siblings and take a few weak blows before they realize you're there; you see the fear grow on their faces immediately when they realize how much trouble they're in.`);
			t.push(`You grab ${sib2.slaveName} by the throat and throw ${him2} to the ground, ordering ${him2} to stay there until you're ready for ${him2}.`);
			t.push(`Then you push ${sib1.slaveName} into a kneeling position and force your ${V.PC.dick > 0 ? "dick" : "strap-on"} down ${his} throat, facefucking ${him} brutally as you explain that both of them are your property and that every time they fight, they are risking damage to your property.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`Once you think your message has gotten through, you pull ${sib1.slaveName} off your ${V.PC.dick > 0 ? "dick" : "strap-on"} with a pop, pull ${sib2.slaveName} to ${his2} knees and repeat your chosen punishment on ${him2}.`);
			t.push(`${sib1.slaveName} kneels obediently, crying quietly as you abuse ${his} ${siblingTerm(sib1, sib2)}.`);
			t.push(`When you've finished, you're sure both siblings are more likely to <span class="trust dec">respect the rules,</span> out of fear if nothing else.`);
			App.Events.addParagraph(frag, t);

			sib1.trust -= 5;
			sib2.trust -= 5;

			return frag;
		}

		function watch() {
			const dead1 = deadliness(sib1).value;
			const dead2 = deadliness(sib2).value;
			if (Math.abs(dead1 - dead2) <= 1) {
				// fight between equals
				t = [];
				t.push(`The two siblings are fairly closely matched in size and skill, and the nude brawl carries on for a few minutes as the other slaves finish preparing for their day. Eventually, ${sib1.slaveName} notices that they're going to be late to work, and they agree to a truce.`);
				t.push(`As they dress quickly, they see you standing at the door, and a quick flash of <span class="trust dec">fear</span> passes over their faces as they realize you've probably just seen the whole thing.`);
				t.push(`The fear is replaced with relief when they realize that if you'd wanted to punish them, you probably would have done so already, but they'll leave with the lasting impression that you're always watching.`);

				sib1.trust -= 2;
				sib2.trust -= 2;

				return t;
			} else {
				// there's a clear winner
				const winner = dead1 > dead2 ? sib1 : sib2;
				const loser = dead1 > dead2 ? sib2 : sib1;
				const {
					HeW, HisW, heW, himW, hisW, himselfW
				} = getPronouns(winner).appendSuffix("W");
				const {
					heL, himL, hisL
				} = getPronouns(loser).appendSuffix("L");

				t = [];
				t.push(`${winner.slaveName} has a clear advantage over ${hisW} ${siblingTerm(winner, loser)} and quickly subdues ${himL}.`);
				if (V.seeIncest && App.Utils.sexAllowed(winner, loser) && (winner.energy > 40 || winner.fetish === "dom")) {
					t.push(`Excited by ${hisW} dominance of ${hisW} weaker ${siblingTerm(winner, loser)}, ${heW} quickly begins to take advantage of ${himL}.`);
					/** @type {FC.SlaveActs} */
					let sexType = "oral";
					if (canPenetrate(winner)) {
						// no taking of virginities here
						if (canDoVaginal(loser) && loser.vagina > 0) {
							t.push(`${HeW} flips ${himL} onto ${hisL} back, spreads ${hisL} legs and positions ${himselfW} to penetrate ${himL}.`);
							sexType = "vaginal";
						} else if (canDoAnal(loser) && loser.anus > 0) {
							t.push(`${HeW} flips ${himL} onto ${hisL} belly, spreads ${hisL} buttocks and positions ${himselfW} to penetrate ${hisL} ass.`);
							sexType = "anal";
						}
					}
					if (sexType === "oral") {
						t.push(`${HeW} moves over ${loser.slaveName}'s prone body until ${heW}'s above ${hisL} mouth, and orders ${hisW} ${siblingTerm(winner, loser)} to orally service ${himW}.`);
					}
					if (loser.fetish === Fetish.SUBMISSIVE) {
						t.push(`${loser.slaveName} enjoys being dominated anyway, so this situation is good for ${himL} too.`);
					} else if (V.universalRulesConsent === 1) {
						t.push(`${loser.slaveName} knows he's lost; technically ${heL} could reject ${winner.slaveName}'s advances, but ${heL} isn't exactly opposed to this anyway.`);
					} else {
						t.push(`Whether ${loser.slaveName} is OK with this or just accepts that it's happening to ${himL} is unclear, but it doesn't really matter.`);
					}
					seX(winner, "penetrative", loser, sexType);
					if (sexType === "vaginal") {
						t.push(`${winner.slaveName} slides ${hisW} ${winner.dick > 3 ? "stiff prick" : "hard little dick"} into ${hisW} ${siblingTerm(winner, loser)}'s ${loser.vagina < 2 ? "tight slit" : "cunt"} and starts pounding away.`);
						if (canImpreg(loser, winner)) {
							knockMeUp(loser, 10, 0, winner.ID);
						}
					} else if (sexType === "anal") {
						t.push(`${winner.slaveName} slides ${hisW} ${winner.dick > 3 ? "stiff prick" : "hard little dick"} into ${hisW} ${siblingTerm(winner, loser)}'s ${loser.anus < 2 ? "tight ass" : "well-used ass"} and starts pounding away.`);
						if (canImpreg(loser, winner)) {
							knockMeUp(loser, 10, 1, winner.ID);
						}
					} else {
						t.push(`${winner.slaveName} encourages ${loser.slaveName} to ${winner.dick > 0 ? `suck ${himW} off` : `eat ${himW} out`} quickly, knowing that they both still have to get to work.`);
					}
					if (loser.fetish !== "submissive") {
						t.push(`It's not long before ${heW} comes, and the two slaves separate to finish getting ready for work. ${winner.slaveName} had fun this morning, but is still clearly <span class="libido inc">up for more.</span>`);
						if (fetishChangeChance(loser) > jsRandom(0, 100)) {
							loser.fetishKnown = 1;
							loser.fetish = "submissive";
							loser.fetishStrength = 20;
							t.push(`${loser.slaveName}, meanwhile, really enjoyed the feeling of being dominated by ${hisL} ${siblingTerm(loser, winner)}, and has become <span class="fetish gain">submissive.</span>`);
						}
						winner.energy += 4;
					} else {
						t.push(`${HisW} ${siblingTerm(winner, loser)} really gets off on ${hisL} submissive position and comes before ${heW} does, and when they're finished they both leave satisfied, <span class="libido inc">heightening their sex drives.</span>`);
						sib1.energy += 4;
						sib2.energy += 4;
					}
				} else {
					t.push(`${HeW} quickly extracts a promise from ${loser.slaveName} to help ${himW} with ${hisW} work before letting him up, and they resume dressing for work without further incident.`);
					// no stat changes
				}
				return t;
			}
		}
	}
};
