App.Events.RESSUsedWhore = class RESSUsedWhore extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => [Job.PUBLIC, Job.WHORE].includes(s.assignment),
				s => s.vagina !== 0,
				s => s.anus !== 0,
				canDoAnal,
				s => s.devotion <= 50,
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
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			`At the end of a long day, you take a moment to watch the comings and goings of your arcology to decompress. While doing so, you notice someone who's clearly had a longer day than you.`,
			contextualIntro(PC, eventSlave, true),
			`is`
		);
		if (eventSlave.belly >= 5000) {
			r.push(`slowly waddling, one hand under ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly and the other on the small of ${his} back,`);
		} else {
			r.push(`making`);
		}
		r.push(`${his} tired way back to the kitchen for a meal and then bed after a long day of sex work. ${He}'s stripped off ${his} soiled clothes already, and is clearly too tired to care about nudity at all.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`${He} comes around the corner and`);
		if (PC.belly >= 100000) {
			r.push(`slams into your massively distended belly, nearly knocking you over.`);
		} else if (PC.belly >= 10000) {
			r.push(`bumps into your heavily gravid middle.`);
		} else if (PC.belly >= 5000) {
			r.push(`bumps into your rounded middle.`);
		} else if (PC.balls >= 14) {
			r.push(`nearly knees your prominent testicles.`);
		} else if (PC.boobs >= 800) {
			r.push(`runs into your prominent rack.`);
		} else {
			r.push(`almost runs into you.`);
		}
		r.push(`${He} stops and`);
		if (canSee(eventSlave)) {
			r.push(`stares,`);
		} else {
			r.push(`faces you,`);
		}
		r.push(`struggling to find the appropriate thing to say or do, but too exhausted to manage it. Even though ${he}'s been obediently cleaning ${himself} between fucks, ${he} looks used up. ${His} ${eventSlave.skin} skin is reddened here and there.`);
		if (eventSlave.belly >= 750000) {
			r.push(`${His} ${belly} belly is heavily bruised, the super-stretched skin nearly at its limit from the weight put on it and the forces pushing against it.`);
		} else if (eventSlave.belly >= 600000) {
			r.push(`${His} ${belly} belly is deep red and heavily bruised; it's clear that at least one client roughly fucked ${him} over it.`);
		} else if (eventSlave.belly >= 450000) {
			r.push(`${His} ${belly} belly looks extremely painful, it's obvious ${he} got fucked over it.`);
		} else if (eventSlave.belly >= 300000) {
			r.push(`${His} ${belly} belly is black and blue, it's obvious ${he} got fucked over it.`);
		} else if (eventSlave.belly >= 150000) {
			r.push(`${His} ${belly} belly is heavily chafed from rubbing the floor as ${he} struggled to keep ${his} weight off it.`);
		} else if (eventSlave.belly >= 100000) {
			r.push(`${His} ${belly} belly is heavily chafed from rubbing against the floor.`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`The tip of ${his} huge belly is chafed from rubbing against the floor.`);
		}
		if (canDoVaginal(eventSlave)) {
			r.push(`${His}`);
			if (eventSlave.labia > 1) {
				r.push(`generous`);
			} else {
				r.push(`poor`);
			}
			r.push(`pussylips are puffy, and you have no doubt ${his} vagina is quite sore.`);
		}
		if (canDoAnal(eventSlave)) {
			r.push(`The awkward way ${he}'s standing suggests that ${his}`);
			if (eventSlave.anus > 2) {
				r.push(`gaping`);
			} else if (eventSlave.anus > 1) {
				r.push(`big`);
			} else {
				r.push(`tight`);
			}
			r.push(`asshole has had more than one dick up it recently.`);
		}
		if (eventSlave.nipples !== "fuckable") {
			r.push(`Even ${his} nipples are pinker than usual, having been cruelly pinched`);
			if (eventSlave.lactation > 0) {
				r.push(`and milked`);
			}
			r.push(r.pop() + `.`);
			if (eventSlave.lactation > 0) {
				eventSlave.lactationDuration = 2;
				eventSlave.boobs -= eventSlave.boobsMilk;
				eventSlave.boobsMilk = 0;
			} else {
				r.push(induceLactation(eventSlave, 2));
			}
		} else {
			r.push(`Even ${his} nipples show signs of wear, having prolapsed slightly from heavy use.`);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Use ${him} anyway`, anyway),
			new App.Events.Result(`Manipulate ${him} into asking to suck you off`, manipulate),
			new App.Events.Result(`Just talk with ${him}`, talk),
		]);

		function anyway() {
			r = [];
			r.push(`You reach out, grab ${his} shoulder, and shove ${him} against the wall.`);
			if (!canTalk(eventSlave)) {
				r.push(`${He} manages to use a gesture to beg you not to,`);
			} else {
				r.push(
					`${He} manages to beg,`,
					Spoken(eventSlave, `"Please no, ${Master}—"`)
				);
			}
			r.push(`before you give ${him} a hard warning slap on the ass to shut ${him} up. ${He}'s quiet, but starts to sob a little when ${he} feels`);
			if (PC.dick === 0) {
				r.push(`the head of a strap-on`);
			} else {
				r.push(`your cock`);
			}
			r.push(`against ${his}`);
			if (canDoAnal(eventSlave)) {
				r.push(`anus.`);
				if (eventSlave.anus > 2) {
					r.push(`It's gaped before you even touch it, but it's clearly sore enough that ${he} dreads anal anyway.`);
				} else if (eventSlave.anus > 1) {
					r.push(`It's been fucked loose, but it's clearly sore enough that ${he} dreads anal anyway.`);
				} else {
					r.push(`It's somehow not gaped yet, and ${he} dreads having it stretched yet again.`);
				}
				if (eventSlave.height >= 185) {
					r.push(`${He}'s tall enough that the angle isn't that uncomfortable for ${him}.`);
				} else if (eventSlave.anus > 0) {
					r.push(`${He} hikes ${himself} desperately up on ${his} tiptoes to make the angle less uncomfortable for ${him}.`);
				} else {
					r.push(`${He} hikes ${himself} desperately up on ${his} tiptoes, but ${he}'s so short the angle is desperately uncomfortable for ${him}.`);
				}
				r.push(`${He} decides to try begging one last time, and`);
				if (canDoVaginal(eventSlave)) {
					if (!canTalk(eventSlave)) {
						r.push(`signs to ask you to use ${his} pussy instead`);
					} else {
						r.push(
							`whines,`,
							Spoken(eventSlave, `"Just use my pussy, please!"`)
						);
					}
				} else {
					if (!canTalk(eventSlave)) {
						r.push(`signs to ask you to let ${him} suck you off instead`);
					} else {
						r.push(
							`whines,`,
							Spoken(eventSlave, `"Let me suck you off, please!"`)
						);
					}
				}
				r.push(`as you shove`);
				if (PC.dick === 0) {
					r.push(`the strap-on`);
				} else {
					r.push(`yourself`);
				}
				r.push(`up ${his} butt. ${He} reflexively tries to get away into the wall,`);
				if (eventSlave.belly > 100000) {
					r.push(`${his} ${belly} belly squashing out to either side.`);
				} else if (eventSlave.boobs > 2000) {
					r.push(`${his} enormous boobs squashing out to either side.`);
				} else if (eventSlave.boobs > 1000) {
					r.push(`${his} big boobs squashing out to either side.`);
				} else if (eventSlave.boobs > 300) {
					r.push(`${his} boobs crashing into it.`);
				} else {
					r.push(`${his} sore nipples giving ${him} a jerk as ${he} does.`);
				}
				r.push(`After some continued whining through ${his} tears, ${he} gives up and just <span class="trust dec">lets you</span> rape ${his} sore ass.`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`pussy lips.`);
				if (eventSlave.vagina > 2) {
					r.push(`It's gaped before you even touch it, but it's clearly sore enough that ${he} dreads penetration anyway.`);
				} else if (eventSlave.vagina > 1) {
					r.push(`It's been fucked loose, but it's clearly been used enough that ${he} dreads penetration anyway.`);
				} else {
					r.push(`It's somehow not loose yet, and ${he} dreads having it stretched yet again.`);
				}
				if (eventSlave.height >= 185) {
					r.push(`${He}'s tall enough that the angle isn't that uncomfortable for ${him}.`);
				} else if (eventSlave.anus > 0) {
					r.push(`${He} hikes ${himself} desperately up on ${his} tiptoes to make the angle less uncomfortable for ${him}.`);
				} else {
					r.push(`${He} hikes ${himself} desperately up on ${his} tiptoes, but ${he}'s so short the angle is desperately uncomfortable for ${him}.`);
				}
				r.push(`${He} decides to try begging one last time, and`);
				if (!canTalk(eventSlave)) {
					r.push(`signs to ask you to let ${him} suck you off instead`);
				} else {
					r.push(
						`whines,`,
						Spoken(eventSlave, `"Let me suck you off, please!"`)
					);
				}
				r.push(`as you shove`);
				if (PC.dick === 0) {
					r.push(`the strap-on`);
				} else {
					r.push(`yourself`);
				}
				r.push(`up ${his} cunt. ${He} reflexively tries to get away into the wall,`);
				if (eventSlave.belly > 100000) {
					r.push(`${his} ${belly} belly squashing out to either side.`);
				} else if (eventSlave.boobs > 2000) {
					r.push(`${his} enormous boobs squashing out to either side.`);
				} else if (eventSlave.boobs > 1000) {
					r.push(`${his} big boobs squashing out to either side.`);
				} else if (eventSlave.boobs > 300) {
					r.push(`${his} boobs crashing into it.`);
				} else {
					r.push(`${his} sore nipples giving ${him} a jerk as ${he} does.`);
				}
				r.push(`After some continued whining through ${his} tears, ${he} gives up and just <span class="trust dec">lets you</span> rape ${his} sore vagina.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			r.push(`When you finally`);
			if (PC.dick !== 0) {
				r.push(`fill ${his}`);
				if (canDoAnal(eventSlave)) {
					r.push(`butt`);
				} else {
					r.push(`pussy`);
				}
				r.push(`with your ejaculate and pull out,`);
				if (PC.vagina !== -1) {
					r.push(`the motion releasing a waft of the combined cum and pussyjuice smell of a satisfied futa,`);
				}
			} else {
				r.push(`shudder with orgasm and withdraw your strap-on,`);
			}
			r.push(`${he} slumps and turns to go, looking a bit sad for some reason.`);
			eventSlave.trust += 4;
			return r;
		}

		function manipulate() {
			r = [];
			r.push(`You reach out, grab ${his} shoulder, and shove ${him} against the wall.`);
			if (!canTalk(eventSlave)) {
				r.push(`${He} manages to use a gesture to beg you not to,`);
			} else {
				r.push(
					`${He} manages to beg,`,
					Spoken(eventSlave, `"Please no, ${Master}—"`)
				);
			}
			r.push(`before you give ${him} a hard warning slap on the ass to shut ${him} up. ${He}'s quiet, but starts to sob a little when ${he} feels`);
			if (PC.dick === 0) {
				r.push(`the head of a strap-on`);
			} else {
				r.push(`an invading`);
				if (PC.vagina !== -1) {
					r.push(`futa`);
				}
				r.push(`cockhead`);
			}
			r.push(`against ${his}`);
			if (canDoAnal(eventSlave)) {
				r.push(`anus.`);
				if (eventSlave.anus > 2) {
					r.push(`It's gaped before you even touch it, but it's clearly sore enough that ${he} dreads anal anyway.`);
				} else if (eventSlave.anus > 1) {
					r.push(`It's been fucked loose, but it's clearly sore enough that ${he} dreads anal anyway.`);
				} else {
					r.push(`It's somehow not gaped yet, and ${he} dreads having it stretched yet again.`);
				}
			} else {
				r.push(`pussy lips.`);
				if (eventSlave.vagina > 2) {
					r.push(`It's gaped before you even touch it, but it's clearly sore enough that ${he} dreads penetration anyway.`);
				} else if (eventSlave.vagina > 1) {
					r.push(`It's been fucked loose, but it's clearly been used enough that ${he} dreads penetration anyway.`);
				} else {
					r.push(`It's somehow not loose yet, and ${he} dreads having it stretched yet again.`);
				}
			}
			r.push(`${He}`);
			if (!canTalk(eventSlave)) {
				r.push(`signs let ${him} suck you off instead.`);
			} else {
				r.push(
					`whines,`,
					Spoken(eventSlave, `"Let me suck you off, please!"`)
				);
			}
			r.push(`Having gotten ${him} to beg for what you wanted all along, you spin ${him} so ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				r.push(`fat`);
			} else if (eventSlave.muscles > 95) {
				r.push(`powerful`);
			} else if (eventSlave.muscles > 30) {
				r.push(`strong`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`feminine`);
			}
			r.push(`back hits the wall with a smack and shove ${him} down it until ${his}`);
			if (eventSlave.lips > 70) {
				r.push(`massive`);
			} else if (eventSlave.lips > 40) {
				r.push(`pillowlike`);
			} else if (eventSlave.lips > 20) {
				r.push(`girlish`);
			} else if (eventSlave.lips > 10) {
				r.push(`average`);
			} else {
				r.push(`minuscule`);
			}
			r.push(`lips are level with your`);
			if (PC.dick === 0) {
				r.push(`fake dick,`);
			} else {
				r.push(`dick,`);
			}
			if (eventSlave.belly >= 100000) {
				r.push(`straddle ${his} ${belly} belly,`);
			}
			r.push(`and push it into ${his} mouth without waiting for ${him} to get ready. ${He} gags, but does ${his} best to work ${his} tired mouth. When you're finally satisfied and you let ${him} up, you aim another slap at ${his}`);
			if (eventSlave.butt > 12) {
				r.push(`inhuman ass`);
			} else if (eventSlave.butt > 5) {
				r.push(`massive ass`);
			} else if (eventSlave.butt > 2) {
				r.push(`big butt`);
			} else if (eventSlave.butt > 0) {
				r.push(`nice ass`);
			} else {
				r.push(`flat ass`);
			}
			r.push(`and let ${him} see it coming; ${he} <span class="devotion inc">accepts</span> the spank due to fright at what you might do if ${he} dodged before fleeing.`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", PC, "penetrative");
			return r;
		}

		function talk() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You take ${him} by the hand, lead ${him} to a nearby couch, and sit down with ${him}, letting ${him} seat ${himself} beside you so ${he} can`);
			if (eventSlave.belly >= 5000) {
				r.push(`rest ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				}
				r.push(`bulk against you`);
			} else {
				r.push(`lean against you`);
			}
			r.push(`without putting too much weight on ${his} poor overused butthole. You ask ${him} about ${his} day.`);
			if (!canTalk(eventSlave)) {
				r.push(`${He} uses gestures to recount it through ${his} tears. Apparently while one guy was using ${his} anus, another thought it was hot and waited for him to be done before using ${him} in turn, without letting ${him} rest or clean ${himself}. It took four cocks total for another slave to notice and rescue ${him}.`);
			} else {
				r.push(
					`${He} ${say}s, a little tearfully,`,
					Spoken(eventSlave, `"${Master}, this guy wanted to use my butt in public. So of course I let him, and he made me sit in his lap to do it, and held my ${hasBothLegs(eventSlave) ? `legs` : "leg"} back so everyone could see! And then another guy thought it was hot and waited, and then fucked me in my ass too. Another slave finally noticed and rescued me after four cocks, ${Master}. I'm really sore."`)
				);
			}
			r.push(`${He}`);
			if (canSee(eventSlave)) {
				r.push(`looks up at you with big ${App.Desc.eyesColor(eventSlave)}`);
			} else {
				r.push(`gazes at you`);
			}
			r.push(`for a long moment, a final tear leaking down ${his} ${eventSlave.skin} cheek, before ${he} suddenly`);
			if (!canTalk(eventSlave)) {
				r.push(`shakes with mute laughter.`);
			} else {
				r.push(`giggles.`);
			}
			r.push(`${He} explains ${himself} after a while: it's not what ${he} thought ${he}'d be doing with ${his} life,`);
			switch (eventSlave.career) {
				case "a bioreactor":
				case "a breeder":
				case "a breeding bull":
				case "a dairy cow":
				case "a dairy slave":
				case "a Fuckdoll":
				case "a Futanari Sister":
				case "a slave":
				case "a slave since birth":
					r.push(`once upon a time.`);
					break;
				default:
					r.push(`back when ${he} was ${convertCareer(eventSlave)}.`);
			}
			if (!canTalk(eventSlave)) {
				r.push(`${He} points to ${himself} and uses both hands to mimic sodomy, as though to suggest that's all ${he} is, before giving you a rueful smile.`);
			} else {
				r.push(
					Spoken(eventSlave, `"${eventSlave.slaveName} the butthole ho, that's me,"`),
					`${he} ${say}s sadly, before giving you a rueful smile.`
				);
			}
			r.push(`${He} kisses you on the cheek and <span class="trust inc">thanks you</span> for listening instead of raping ${him}.`);
			eventSlave.trust += 4;

			App.Events.addParagraph(frag, r);
			App.Events.addResponses(frag, [
				new App.Events.Result(`Kiss ${him} back`, kiss),
				new App.Events.Result(`Rape ${him}`, rape),
			]);
			return frag;

			function kiss() {
				r = [];
				r.push(`You turn to kiss ${him} back, on the lips this time. ${He}`);
				if (canSee(eventSlave)) {
					r.push(`sees`);
				} else {
					r.push(`feels`);
				}
				r.push(`your intention and <span class="trust inc">complies trustingly,</span> closing ${his} eyes and tilting ${his} head slightly so your lips lock perfectly.`);
				if (eventSlave.lips > 70) {
					r.push(`${His} ridiculous, pillowlike lips part softly.`);
				} else if (eventSlave.teeth === "pointy") {
					r.push(`${He} opens ${his} jaw wide, careful to keep ${his} shark's teeth well clear of you.`);
				} else if (eventSlave.teeth === "fangs") {
					r.push(`${He} keeps ${his} jaw steady so you may work around ${his} fangs easier.`);
				} else if (eventSlave.teeth === "fang") {
					r.push(`You try your best to work around ${his} lone fang.`);
				}
				r.push(`After a few seconds, ${he} realizes you aren't planning to break the kiss anytime soon, and softens, ${his}`);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
				r.push(`body relaxing against yours. ${He} scoots closer to you, bringing ${his} legs up under ${him} on the couch cushions so ${he} can face you comfortably. ${He} leans one`);
				if (eventSlave.weight > 160) {
					r.push(`extremely well padded`);
				} else if (eventSlave.weight > 95) {
					r.push(`well padded`);
				} else if (eventSlave.muscles > 30) {
					r.push(`muscular`);
				} else if (eventSlave.weight > 10) {
					r.push(`plush`);
				} else if (eventSlave.hips > -1) {
					r.push(`pretty`);
				}
				r.push(`hip against your leg, hiking ${himself} half onto your lap so ${he} can make out with you without having to sit with any weight on ${his} sore butthole.`);
				eventSlave.trust += 2;
				return r;
			}

			function rape() {
				r = [];
				r.push(`But ${he}'s wrong to place that kind of faith in you. As ${he} withdraws from the kiss, you snake a betraying hand between ${his} butt and the couch, and shove`);
				if (eventSlave.anus <= 1) {
					r.push(`two rude fingers up ${his} sore little anus.`);
				} else if (eventSlave.anus === 2) {
					r.push(`three rude fingers up ${his} sore anus.`);
				} else {
					r.push(`all four of your fingers and your thumb, formed into a point, as far up ${his} loose butt as they will go.`);
				}
				r.push(`${He} lets out a pained "oh," and then goes silent. For such a little sound, it bears a great weight of <span class="trust dec">betrayed trust.</span> You insert your fingers to the knuckle, making ${him} writhe with discomfort, and then turf ${him} off the couch to land`);
				if (eventSlave.belly >= 300000) {
					r.push(`across ${his} ${belly} stomach`);
				} else {
					r.push(`face first`);
				}
				r.push(`on the floor in front of you. ${He} tries to spread ${his} butt and angle ${his} hips like a good ${girl}, but you slap ${his} hands away and push your`);
				if (PC.dick === 0) {
					r.push(`strap-on`);
				} else {
					r.push(`cock`);
				}
				r.push(`inside ${him} without regard for ${his} poor anus. ${He} shudders and begins to cry, and keeps crying as you ravage ${his} asshole. When you climax and pull out, ${he} continues to weep, but stumbles off to wash. When ${he} comes back, ${he}'s still sniffling, but without being prompted,`);
				if (eventSlave.belly >= 300000) {
					r.push(`<span class="devotion inc">${he} leans over ${his} belly and offers you ${his} sore butthole again.</span>`);
				} else {
					r.push(`<span class="devotion inc">${he} gets down on ${his} knees and offers you ${his} sore butthole again.</span>`);
				}
				eventSlave.trust -= 4;
				eventSlave.devotion += 5;
				r.push(VCheck.Anal(eventSlave, 1));
				return r;
			}
		}
	}
};
