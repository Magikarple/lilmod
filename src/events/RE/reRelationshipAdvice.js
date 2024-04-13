App.Events.RERelationshipAdvice = class RERelationshipAdvice extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [[
			(s) => s.fetish !== Fetish.MINDBROKEN,
			hasAnyArms,
			canWalk,
			canTalk,
			canSee,
			(s) => s.assignment !== Job.QUARTER,
			(s) => s.relationship >= 2,
			(s) => s.relationship < 5,
			(s) => s.devotion > 20,
			(s) => s.trust >= -20
		]];
	}

	execute(node) {
		const r = [];

		const slave = getSlave(this.actors[0]);
		const relSlave = getSlave(slave.relationshipTarget);

		const {
			He,
			he, his, him, himself, girl
		} = getPronouns(slave);
		const {title: Master} = getEnunciation(slave);

		const {
			He2,
			he2, his2, him2, hers2, woman2, wife2, girl2,
		} = getPronouns(relSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [slave, relSlave], "no clothing");

		r.push(
			App.UI.DOM.slaveDescriptionDialog(slave),
			`is standing for an inspection. ${He}'s a good ${girl}, and is cooperating, but ${he} seems preoccupied. After ignoring it for a while, you give in to curiosity and flatly ask ${him} what's going on.`,
			Spoken(slave, `"I'm sorry, ${Master},"`),
			`${he}`
		);
		if (SlaveStatsChecker.checkForLisp(slave)) {
			r.push(`lisps,`);
		} else {
			r.push(`mutters,`);
		}
		r.push(
			`biting ${his} lip.`,
			Spoken(slave, `"It's`),
			App.UI.DOM.combineNodes(
				App.UI.DOM.slaveDescriptionDialog(relSlave, Spoken(slave, relSlave.slaveName)),
				`."`
			),
		);
		r.push(`${He} hesitates, so you prompt ${him}, asking if ${he}'s having trouble with ${his}`);
		if (slave.relationship === 2) {
			r.push(`friend.`);
		} else if (slave.relationship === 3) {
			r.push(`friend with benefits.`);
		} else if (slave.relationship === 4) {
			r.push(`lover.`);
		}
		r.push(
			`${He} quickly shakes ${his} head no.`,
			Spoken(slave, `"N-no, ${Master}, it's just —"`),
			`${He} subsides into silence again, blushing and staring`
		);
		if (!canSee(slave)) {
			r.push(`blankly`);
		}
		r.push(`at ${his} feet. Comprehension dawning, you ask ${him} if`);
		if (slave.relationship === 2) {
			r.push(`${he} wants to be more than friends with ${relSlave.slaveName}.`);
		} else if (slave.relationship === 3) {
			r.push(`${he}'s wanting to bring emotions into relationship with ${relSlave.slaveName}, rather than keep it friendly and sexual.`);
		} else if (slave.relationship === 4) {
			r.push(`${he} wants to make an honest ${woman2} out of ${relSlave.slaveName}.`);
		}
		r.push(`${He} nods ${his} head quickly, still staring`);
		if (!canSee(slave)) {
			r.push(`blankly`);
		}
		r.push(`at ${his} feet. ${He} shuts ${his} eyes tight and waits for you to weigh in on the situation.`);
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Break them up`, breakUp));
		choices.push(new App.Events.Result(`Build ${his} confidence`, confidence));
		choices.push(new App.Events.Result(`Bring the other ${girl2} in`, bringIn));
		App.Events.addResponses(node, choices);

		function breakUp() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`In a cold tone of voice, you admit your irritation with this school ${girl} nonsense, and tell ${him} ${he}'s to stop spending time with ${relSlave.slaveName}. ${He}'s unable to prevent ${his} eyes from flicking up at you in <span class="devotion dec">shock and horror,</span> but ${he} instantly lowers them again, the tears coming fast. You dismiss ${him}, and ${he} turns to go, but is so discombobulated by anguish that ${he} trips over ${his} own feet and falls with a slap of naked ${slave.skin} flesh against the floor. Their relationship <span class="relationship dec">is over.</span>`);

			slave.devotion -= 5;
			slave.relationship = 0;
			slave.relationshipTarget = 0;
			relSlave.relationship = 0;
			relSlave.relationshipTarget = 0;

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function confidence() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`In a warm tone of voice, you tell ${him} you approve of ${his} relationship with ${relSlave.slaveName}. ${He} raises ${his} chin and looks at you with <span class="devotion inc">growing adoration</span> as you point out how lucky ${relSlave.slaveName} is to have ${him}. You tell ${him} that you're not planning to intervene personally, but that you think ${he} really ought to pursue the relationship, that they're good for each other, and that you're confident ${relSlave.slaveName} feels the same way. ${He} thanks you prettily and leaves at a flat run, in a hurry to tell ${his}`);
			if (slave.relationship === 2) {
				r.push(`sexy friend`);
			} else if (slave.relationship === 3) {
				r.push(`friend with benefits`);
			} else if (slave.relationship === 4) {
				r.push(`dear lover`);
			}
			r.push(`how ${he} feels about ${him2}.`);
			if (slave.relationship === 2) {
				r.push(`The next time you see them together, they're looking like they've been getting a little less sleep lately, but <span class="relationship">can't seem to keep their hands off each other.</span> ${slave.slaveName} mouths a silent thanks to you when ${relSlave.slaveName} isn't looking.`);
			} else if (slave.relationship === 3) {
				r.push(`The next time you see them together, they're <span class="relationship">holding hands at breakfast,</span> looking almost ashamed of themselves, but not letting go. ${slave.slaveName} mouths a silent thanks to you when ${relSlave.slaveName} isn't looking.`);
			} else if (slave.relationship === 4) {
				r.push(`${He} comes running right back, a happy ${relSlave.slaveName}`);
				if (canWalk(relSlave)) {
					r.push(`running in with ${him}.`);
				} else {
					r.push(`being helped in by ${his2} lover.`);
				}
				r.push(`You <span class="relationship">marry them</span> solemnly, and they embrace tightly, hugging each other close. ${slave.slaveName} comes to face you over ${his} ${wife2}'s shoulder, and ${he} mouths a silent, tearful thanks to you.`);
			}

			slave.devotion += 5;
			slave.relationship += 1;
			relSlave.relationship += 1;

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function bringIn() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You tell ${slave.slaveName} to wait, and page ${relSlave.slaveName} up to your office. ${slave.slaveName} looks terrified, but tries to conceal ${his} emotions behind a happy greeting for ${his}`);
			if (slave.relationship === 2) {
				r.push(`friend`);
			} else if (slave.relationship === 3) {
				r.push(`friend with benefits`);
			} else if (slave.relationship === 4) {
				r.push(`lover`);
			}
			r.push(
				`when ${he2} comes in. ${relSlave.slaveName} knows ${him} well enough to detect ${his} inner turmoil, and asks ${him} what's wrong. ${slave.slaveName} flinches and looks to you in desperation, but you just nod at ${him} to spit it out. After two false starts, ${he} manages to say,`,
				Spoken(slave, `"${relSlave.slaveName}, I really want`)
			);

			if (slave.relationship === 2) {
				if (slave.fetish === "buttslut") {
					r.push(
						Spoken(slave, `to fuck your butt."`),
						`${relSlave.slaveName} looks relieved that that's all it is, and ${agrees()}`,
					);
					r.push(`${He2} kisses ${slave.slaveName} and then grinds ${his2} ass against ${slave.slaveName}'s crotch.`);
				} else if (slave.fetish === "cumslut") {
					if (relSlave.dick === 0) {
						r.push(`to eat you out."`);
					} else {
						r.push(`to blow you."`);
					}
					r.push(`${relSlave.slaveName} looks relieved that that's all it is, and ${agrees()} ${He2}`);
					if (relSlave.dick === 0) {
						r.push(`offers ${his2} pussy`);
					} else {
						r.push(`flops ${his2} dick at ${slave.slaveName}`);
					}
					r.push(`comically.`);
				} else if (slave.fetish === "humiliation") {
					r.push(
						Spoken(slave, `to fuck you in public."`),
						` ${relSlave.slaveName} looks relieved that that's all it is, and ${agrees()}`
					);
				} else if (slave.fetish === "masochist") {
					r.push(
						Spoken(slave, `you to hurt me. Like, really hurt me."`),
						` ${relSlave.slaveName} looks relieved that that's all it is, and ${agrees()} ${He2} pinches one of ${slave.slaveName}'s nipples experimentally.`
					);
				} else if (slave.fetish === "sadist") {
					r.push(
						Spoken(slave, `to hold you down."`),
						` ${relSlave.slaveName} looks relieved that that's all it is, and ${agrees()} ${He2} ${canWalk(relSlave) ? "steps in close" : "wiggles closer"} to ${slave.slaveName},`
					);
					if (hasAnyArms(relSlave)) {
						r.push(`takes ${slave.slaveName}'s ${hasBothArms(slave) ? "hands, and places them" : "hand, and places it"} around ${his2} own throat.`);
					} else {
						r.push(`and sticks out ${his2} neck for ${slave.slaveName}`);
					}
				} else if (slave.fetish === "dom") {
					r.push(
						Spoken(slave, `to be your top."`),
						` ${relSlave.slaveName} looks relieved that that's all it is, and ${agrees()} ${He2} sidles up to ${slave.slaveName}, looking up at ${him} submissively.`
					);
				} else if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(
						Spoken(slave, `to be your bottom."`),
						` ${relSlave.slaveName} looks relieved that that's all it is, and says, ${agrees()} `
					);
					if (hasAnyArms(relSlave)) {
						r.push(`${He2} takes ${slave.slaveName}'s face in ${his2} ${hasBothArms(relSlave) ? "hands" : "hand"}`);
					} else {
						r.push(`${He2} leans in`);
					}
					r.push(`and kisses ${him} dominantly.`);
				} else if (slave.fetish === "boobs") {
					r.push(
						Spoken(slave, `to fuck your boobs."`),
						`${relSlave.slaveName} looks relieved that that's all it is, and says, ${agrees()}`
					);
					if (hasAnyArms(relSlave)) {
						r.push(`${He2} takes ${slave.slaveName}'s`);
						if (hasBothArms(slave)) {
							r.push(`hands and places them`);
						} else {
							r.push(`hand and places it`);
						}
						r.push(`right on ${his2} breasts.`);
					} else {
						r.push(`${He2} sticks out ${his2} breasts for ${slave.slaveName} and is not disappointed.`);
					}
				} else {
					r.push(
						Spoken(slave, `to fuck you."`),
						` ${relSlave.slaveName} looks relieved that that's all it is, and ${agrees()}`
					);
					if (hasAnyArms(relSlave)) {
						r.push(`${He2} takes ${slave.slaveName}'s`);
						if (hasBothArms(slave)) {
							r.push(`hands and places them`);
						} else {
							r.push(`hand and places it`);
						}
						r.push(`right on ${his2} breasts.`);
					} else {
						r.push(`${He2} sticks out ${his2} breasts for ${slave.slaveName} and is not disappointed.`);
					}
				}
				r.push(`${slave.slaveName} bursts out laughing. They're now <span class="relationship">friends with benefits.</span>`);
			} else if (slave.relationship === 3) {
				r.push(
					Spoken(slave, `t-to b-be your ${girl} friend."`),
					`${He} takes a deep breath.`,
					Spoken(slave, `"It's fun, just`)
				);
				if (slave.fetish === "buttslut") {
					r.push(`fucking your butt.`);
				} else if (slave.fetish === "cumslut") {
					if (relSlave.dick === 0) {
						r.push(`eating you out.`);
					} else {
						r.push(`blowing you.`);
					}
				} else if (slave.fetish === "humiliation") {
					r.push(`fucking you in public.`);
				} else if (slave.fetish === "masochist") {
					r.push(`having you hurt me.`);
				} else if (slave.fetish === "sadist") {
					r.push(`holding you down.`);
				} else if (slave.fetish === "dom") {
					r.push(`topping you.`);
				} else if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(`being your bottom.`);
				} else if (slave.fetish === "boobs") {
					r.push(`fucking your boobs.`);
				} else {
					r.push(`having sex with you.`);
				}
				r.push(
					Spoken(slave, `But I — I really like you."`),
					` ${relSlave.slaveName} looks relieved, and`
				);
				if (relSlave.voice !== 0) {
					r.push(
						`says,`,
						Spoken(slave, `"I really like you too. And you're really cute! I'd love to be your ${girl2} friend."`),
						`${He2}`
					);
				} else {
					r.push(`lovingly`);
				}
				if (hasAnyArms(relSlave)) {
					r.push(`takes ${slave.slaveName}'s hands in ${hers2}, and then`);
				}
				r.push(`kisses ${him} on the cheek. ${slave.slaveName} crushes ${relSlave.slaveName} in a hug, pressing a squeak out of ${him2}. They're now <span class="relationship">lovers.</span>`);
			} else if (slave.relationship === 4) {
				r.push(
					`- " ${He} stops ${himself}.`,
					Spoken(slave, `"No, I want to do this right."`)
				);
				if (hasAnyArms(relSlave)) {
					r.push(`${He} takes ${relSlave.slaveName}'s hand, and then drops to one knee.`);
				} else {
					r.push(`${He} drops to one knee, holding out ${his} hand to ${relSlave.slaveName}.`);
				}
				r.push(`After a moment of uncomprehending shock, ${relSlave.slaveName} begins to cry.`,
					Spoken(slave, `"Will you marry me?"`),
					`${relSlave.slaveName} turns to you and`
				);
				if (!canTalk(relSlave)) {
					r.push(`wordlessly`);
				}
				r.push(`asks if it's all right with you; you ${canSee(relSlave) ? "nod" : "affirm"}, and ${he2} turns back to ${slave.slaveName}.`);
				if (!canTalk(relSlave)) {
					r.push(`${He2} gestures distractedly that ${slave.slaveName} is being silly, and of course ${he2}'ll marry ${him}, because ${he2} loves ${him}.`);
				} else {
					r.push(Spoken(slave, `"O-of course I'll m-marry you, silly ${girl}. I love you."`));
				}
				r.push(`${slave.slaveName} jumps up and crushes ${relSlave.slaveName} in a hug, kissing ${him2} frantically through ${his} tears. You <span class="relationship">marry them</span> solemnly, and they embrace tightly, hugging each other close. ${slave.slaveName} comes to face you over ${his} ${wife2}'s shoulder, and ${he} mouths a silent thanks to you.`);
			}
			r.push(`If ${slave.slaveName} had doubts about you, <span class="trust inc">they've been addressed.</span>`);

			slave.trust += 10;
			slave.relationship += 1;
			relSlave.relationship += 1;

			App.Events.addParagraph(frag, r);
			return frag;

			function agrees() {
				const r = [];
				if (relSlave.voice !== 0) {
					r.push(
						`says,`,
						Spoken(relSlave, `"Okay!"`)
					);
				} else {
					r.push(`nods.`);
				}
				return r.join(" ");
			}
		}
	}
};

