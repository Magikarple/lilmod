App.Events.REFISadist = class REFISadist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave
				s => App.Events.qualifiesForREFIeventSlave(s)
			],
			[ // and subslave
				s => App.Events.qualifiesForREFIsubSlave(s, "sadist"),
				hasAnyArms,
				s => canHear(s) || canSee(s)
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {He2, he2, his2, him2} = getPronouns(subSlave).appendSuffix("2");
		const {HeU, himU, girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
		const {title: master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");

		actX(subSlave, "penetrative");

		let t = [];
		t.push(`You are in your office, watching as`);
		t.push(contextualIntro(V.PC, subSlave, true));
		t.push(`takes a riding crop to another slave. This has become an almost daily occurrence, as ${he2} is liable to strike out against your other slaves out-of-turn if ${he2} isn't allowed to get a chance to satisfy ${his2} sadistic streak. The slave`);
		if (hasBothLegs(subSlave)) {
			t.push(`at ${his2} feet`);
		} else {
			t.push(`before ${him2}`);
		}
		t.push(`is a quivering mess, though you've given ${subSlave.slaveName} strict instructions to not leave any permanent marks on the ${girlU}. The slave had been disobedient, and so you decided that you would let ${subSlave.slaveName} punish ${himU}. ${HeU} winces as ${he2} slowly drags the crop against the ${girlU}'s shoulder, and you do your best to hide the small smile that threatens to escape. After another minute or so of the riding crop, you tell ${subSlave.slaveName} that this is getting boring and to change it up. ${He2} gives you a wicked grin and gives`);
		if (subSlave.dick > 0 && canAchieveErection(subSlave)) {
			t.push(`${his2} cock`);
		} else {
			t.push(`the strap-on ${he2} is wearing`);
		}
		t.push(`a few rubs before unceremoniously stuffing it into ${his2} victim's asshole. You can't hide your smile this time as the poor ${girlU} gives a loud shriek, and a small noise at the doorway catches your attention. To your surprise, you see`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`at the door to your office. You call ${him} in.`);

		App.Events.addParagraph(node, t);
		t = [];
		t.push(`${eventSlave.slaveName} hesitates before explaining ${himself}, and the ${SlaveTitle(eventSlave)} is obviously aroused:`);
		if ((eventSlave.dick > 0) && (eventSlave.chastityPenis === 1)) {
			t.push(`${he}'s got a string of precum leaking out of ${his} chastity cage.`);
		} else if ((eventSlave.dick > 0) && (eventSlave.hormoneBalance >= 100)) {
			t.push(`though ${his} hormone-filled body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} member.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls > 0 && eventSlave.ballType === "sterile") {
			t.push(`though ${his} useless balls can't muster the effort to get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if ((eventSlave.dick > 0) && (eventSlave.balls === 0)) {
			t.push(`though ${his} gelded body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (canAchieveErection(eventSlave)) {
			if (eventSlave.dick > 4) {
				t.push(`${his} gigantic cock is standing out like a mast.`);
			} else if (eventSlave.dick > 2) {
				t.push(`${he}'s sporting an impressive erection.`);
			} else if (eventSlave.dick > 0) {
				t.push(`${his} little penis is rock hard.`);
			}
		} else if (eventSlave.dick > 7) {
			t.push(`${he}'s got a string of precum coming off ${his} engorged member.`);
		} else if (eventSlave.dick > 0) {
			t.push(`${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (eventSlave.clit > 0) {
			t.push(`${his} large clit is visibly engorged.`);
		} else if (eventSlave.vagina > -1) {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there's a sheen on ${his} pussylips.`);
		} else if (eventSlave.balls > 0) {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there is a distinct dribble of precum running from ${his} featureless crotch.`);
		} else {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there is a clear scent of lust around ${him}.`);
		}
		t.push(`It seems ${he} passed by while`);
		t.push(contextualIntro(eventSlave, subSlave));
		t.push(`was beating the ${girlU} and found the`);
		if (canSee(eventSlave)) {
			t.push(`sight`);
		} else {
			t.push(`sounds`);
		}
		t.push(`rather compelling. It should be possible to either encourage this fascination or steer ${him} away from it for now.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Show ${him} how enjoyable causing pain is`, turn),
			new App.Events.Result(`Steer ${him} away from an obsession with causing pain for the moment`, steer),
		]);

		function turn() {
			t = [];
			if (!canTalk(eventSlave)) {
				if (eventSlave.accent >= 3) {
					t.push(`Since ${he} doesn't speak ${V.language} well enough to handle the`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`subject and has no hands, it takes a long, frustrating time`);
					} else {
						t.push(`subject, ${he}'s forced to use gestures`);
					}
					t.push(`to communicate ${his} desire to be abuse someone.`);
				} else if (eventSlave.voice === 0) {
					t.push(`${He}'s`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`mute and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like`);
					} else {
						t.push(`mute, so ${he} uses gestures to ask`);
					}
					t.push(`to hurt someone, too.`);
				} else {
					t.push(`${He}'s incapable of forming`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`words and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like`);
					} else {
						t.push(`words, so ${he} uses gestures to ask`);
					}
					t.push(`to hurt someone, too.`);
				}
			} else {
				if (eventSlave.lips > 70) {
					t.push(`${He} asks through ${his} massive dick-sucking lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					t.push(`${He} asks through ${his} big oral piercings,`);
				} else {
					t.push(`${He} asks,`);
				}
				t.push(Spoken(eventSlave, `"${capFirstChar(master)}, can — can I hurt someone? Like that?"`));
			}
			t.push(`You make ${him} state it more explicitly, so ${he} tries again:`);
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				t.push(`${he} wriggles ${himself} into a position where ${he} can lightly slap ${his} amputee ass against a chair leg.`);
			} else if (!canTalk(eventSlave)) {
				t.push(`${he} turns around and starts to spank ${himself} roughly.`);
			} else {
				t.push(Spoken(eventSlave, `"Please let me beat someone, ${master}!"`));
			}
			t.push(`You call in another slave and have ${himU} kneel on the floor, ass up. You then hand ${him} a leathern cat-o-nine tails and tell ${him} to get busy, or ${he}'ll take the other slave's place. As you note the remorse on ${his} face, you tell ${him} to get used to it. One of ${his} jobs is to cause pain now, second thoughts or not.`);

			if (!hasAnyArms(eventSlave)) {
				t.push(`Using a switch is awkward when one's only means to grip it is with their mouth, so it takes ${him} several attempts before ${he} elicits the first gasp of pain from the slave. ${He} soon gets the hang of things and draws gasp after gasp from the ${girlU} until ${he} finally lands a solid strike, drawing blood and a agonized screech from ${his} toy. ${He} loses ${his} grip on the handle, unable to hold back the`);
				if (canTalk(eventSlave)) {
					t.push(`malicious laugh`);
				} else {
					t.push(`silent laugh`);
				}
				t.push(`that reveals ${his} sadistic side.`);
			} else {
				t.push(`It takes a few swings for ${him} to draw out the first gasp of pain from the slave, but once ${he} does, it's almost like ${he}'s been doing this ${his} entire life. Gasp after gasp escapes the writhing ${girlU} until ${he} lands a truly exquisite blow, drawing blood and a agonized screech from ${his} toy.`);
				if (canTalk(eventSlave)) {
					t.push(`Malicious laughter`);
				} else {
					t.push(`Silent laughter`);
				}
				t.push(`begins to escape ${his} lips as ${he} is properly introduced to the sadist inside ${him}.`);
			}
			t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${he} has started to get off on causing pain.</span>`);
			eventSlave.devotion += 4;
			eventSlave.fetish = "sadist";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function steer() {
			t = [];
			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in dishing out pain,`);
			if (canDoVaginal(eventSlave) || (eventSlave.dick > 0 && eventSlave.chastityPenis === 0)) {
				t.push(`and let ${him} masturbate while`);
				if (V.PC.dick === 0) {
					t.push(`eating you out,`);
					seX(eventSlave, "oral", V.PC, "vaginal");
				} else {
					t.push(`sucking you off,`);
					seX(eventSlave, "oral", V.PC, "penetrative");
				}
			} else {
				t.push(`and play with ${him} until ${he} orgasms while`);
				if (V.PC.dick === 0) {
					t.push(`eating you out, all while`);
					seX(eventSlave, "oral", V.PC, "vaginal");
				} else {
					t.push(`sucking you off, all while`);
					seX(eventSlave, "oral", V.PC, "penetrative");
				}
			}
			t.push(`carefully making sure ${he} only causes pleasure. You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			return t;
		}
	}
};
