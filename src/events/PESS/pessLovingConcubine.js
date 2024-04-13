App.Events.pessLovingConcubine = class pessLovingConcubine extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Concubine,
			() => canWalk(S.Concubine),
			() => canSee(S.Concubine)
		];
	}

	execute(node) {
		const {
			He, His,
			he, his, him, himself, hers
		} = getPronouns(S.Concubine);
		const {say: say, title: Master} = getEnunciation(S.Concubine);
		App.Events.drawEventArt(node, S.Concubine, "no clothing");

		const r = [];
		r.push(`It's been a long, harassing day as owner of the arcology. You're composing an angry communication to a couple of imbecile tenants who seem to think they're still in their old world shithole of a homeland, insist on acting like it, and are also wealthy enough to make it unwise to simply defenestrate them from the nearest window. Not that you aren't tempted. Suddenly, you feel a moist,`);
		if (S.Concubine.lips > 70) {
			r.push(`massive`);
		} else if (S.Concubine.lips > 40) {
			r.push(`pillowlike`);
		} else {
			r.push(`girlish`);
		}
		r.push(`pair of lips nibbling their way along your ear, and a`);
		if (S.Concubine.muscles > 95) {
			r.push(`powerful`);
		} else if (S.Concubine.muscles > 30) {
			r.push(`strong`);
		} else {
			r.push(`feminine`);
		}
		r.push(`hand over your shoulder. Its owner`);
		if (canTalk(S.Concubine)) {
			r.push(
				`whispers`,
				Spoken(S.Concubine, `"It can wait, ${Master}."`)
			);
		} else {
			r.push(`passes you a handwritten note: "? ? It can wait, ${getWrittenTitle(S.Concubine)}? ?"`);
		}

		r.push(
			`You turn to see your concubine`,
			App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(S.Concubine), "'s ")
		);

		if (S.Concubine.butt > 5) {
			r.push(`massive, nude ass`);
		} else if (S.Concubine.butt > 2) {
			r.push(`big naked butt`);
		} else {
			r.push(`nice, nude rear`);
		}
		r.push(`vanishing back into your suite.`);
		if (S.Concubine.boobs > 2000) {
			r.push(`As ${he} sways away from you, you can clearly see the sides of ${his} massive tits, sticking out on either side of ${his} torso.`);
		}
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`It cannot wait`, cannot));
		choices.push(new App.Events.Result(`It can wait until after some lovemaking with the Concubine`, can));
		if (S.Concubine.anus > 0) {
			choices.push(new App.Events.Result(`It can wait until after some rough sex with the Concubine`, rough));
		}

		App.Events.addResponses(node, choices);

		function cannot() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Your responsibilities will not wait. You keep at it, composing a firm yet even-handed message that <span class="reputation inc">puts the miscreants in their place</span> without ruffling feathers. ${S.Concubine.slaveName} has gone to sleep by the time you enter your suite, but ${he} wakes at your entrance and sleepily holds the sheets open so you can climb in. Once you're bedded down ${he}`);
			if (V.PC.boobs >= 300) {
				if (S.Concubine.boobs > 2000) {
					r.push(`lies close to you with one of ${his} breasts resting half against your own breasts, since ${he} can't fit under your arm with ${his} ridiculous tits.`);
				} else if (S.Concubine.boobs > 1000) {
					r.push(`burrows softly under your arm, ${his} breasts heavy against your own.`);
				} else if (S.Concubine.boobs > 300) {
					r.push(`snuggles under your arm, ${his} breasts softly colliding with your own.`);
				} else {
					r.push(`fits ${himself} under your arm, your breasts lying alongside ${his} flat chest.`);
				}
			} else {
				if (S.Concubine.boobs > 2000) {
					r.push(`lies close to you with one of ${his} breasts resting half on your chest, since ${he} can't fit under your arm with ${his} ridiculous tits.`);
				} else if (S.Concubine.boobs > 1000) {
					r.push(`burrows softly under your arm, ${his} breasts heavy against your chest.`);
				} else if (S.Concubine.boobs > 300) {
					r.push(`snuggles under your arm, ${his} breasts against your chest.`);
				} else {
					r.push(`fits ${himself} under your arm, ${his} flat chest letting ${him} mold ${himself} to your torso perfectly.`);
				}
			}
			repX(500, "event", S.Concubine);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function can() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`When you enter your suite, the dim light reveals ${S.Concubine.slaveName} waiting with ${his} beautiful body laid across the bed. When ${he}`);
			if (canSee(S.Concubine)) {
				r.push(`sees`);
			} else {
				r.push(`figures out`);
			}
			r.push(`the kind of lovemaking you're in the mood for, ${he}`);
			if (hasAnyArms(S.Concubine)) {
				r.push(`spreads ${his} ${hasBothArms(S.Concubine) ? "arms" : "arm"}`);
			} else {
				r.push(`presents ${himself}`);
			}
			r.push(`for you, smiling gently. ${He} kisses you lovingly,`);
			if (!canTalk(S.Concubine) && hasAnyArms(S.Concubine)) {
				r.push(`taking your hand in ${hers} and drawing a heart on your palm with one finger.`);
			} else if (canTalk(S.Concubine)) {
				r.push(
					`${say}ing,`,
					Spoken(S.Concubine, `"${capFirstChar(Master)}, I love you."`)
				);
			} else {
				r.push(`giving you a sultry look`);
			}
			if (V.PC.vagina !== -1) {
				r.push(`${He} lies on ${his} side`);
				if (hasBothLegs(S.Concubine)) {
					r.push(`and raises one leg for you so you can straddle the other,`);
				} else if (!hasAnyLegs(S.Concubine)) {
					r.push(`wiggles ${his} hips,`);
				} else {
					r.push(`motions for you to straddle ${his} leg,`);
				}
				r.push(`sliding up to press your pussy against ${his} submissive groin. You grind against ${him}; the stimulation is so strong that ${he} writhes into the sheets, panting and whining.`);
				if (V.PC.dick !== 0) {
					r.push(`Your stiff dick, unused for once, slides deliciously between your warm bodies.`);
				}
			} else {
				if (S.Concubine.vagina > 0) {
					r.push(`${His} pussy is warm and very wet, making penetration easy; ${he} gasps and arches ${his} back, clasping you between ${his} legs${(canSee(S.Concubine)) ? ` as ${his} ${App.Desc.eyesColor(S.Concubine)} look deep into yours` : ``}.`); // TODO: clean legs
					seX(S.Concubine, "vaginal", V.PC, "penetrative");
				} else if (S.Concubine.anus > 0) {
					r.push(`${His} butt is relaxed and welcoming, and ${he} holds ${his} legs back to take missionary anal loving${(canSee(S.Concubine)) ? ` as ${his} ${App.Desc.eyesColor(S.Concubine)} look deep into yours` : ``}.`);
					seX(S.Concubine, "anal", V.PC, "penetrative");
				} else {
					r.push(`${He} holds ${his} thighs together for frottage so ${he} can love you without losing ${his} virginity.`);
				}
			}
			r.push(`You both know each other quite well, and maintain the gentle communion for a long time. When ${he} senses your climax building, ${he} lets ${himself} climb to orgasm with you, holding`);
			if (V.PC.dick === 0) {
				r.push(`your hips in ${his} hands.`);
			} else {
				r.push(`you in ${his} arms.`);
			}
			r.push(`${He} quickly cleans you with ${his} mouth and heads to the shower. When ${he} gets out you're back at work, but ${he} comes out to <span class="devotion inc">plant another kiss on you.</span>`);
			S.Concubine.devotion += 10;
			seX(S.Concubine, "oral", V.PC, "penetrative");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function rough() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`When you enter your suite, the dim light reveals ${S.Concubine.slaveName} waiting with ${his} beautiful body laid across the bed. When ${he} sees`);
			if (V.PC.dick === 0) {
				r.push(`the big strap-on you're wearing,`);
			} else {
				r.push(`the kind of sex you're in the mood for,`);
			}
			r.push(`${he} turns over and pushes ${his} face down into the sheets. ${He}`);
			if (hasAnyLegs(S.Concubine)) {
				r.push(`pulls ${his} ${hasBothLegs(S.Concubine) ? "knees" : "knee"} under ${himself} and`);
			}
			if (hasAnyArms(S.Concubine)) {
				r.push(`reaches back to pull`);
			} else {
				r.push(`presents`);
			}
			r.push(`${his}`);
			if (S.Concubine.butt > 5) {
				r.push(`huge`);
			} else if (S.Concubine.butt > 2) {
				r.push(`sizable`);
			} else {
				r.push(`pretty`);
			}
			r.push(`buttocks apart, relaxing and then clenching ${his}`);
			if (S.Concubine.anus > 2) {
				r.push(`gaping`);
			} else if (S.Concubine.anus > 1) {
				r.push(`big`);
			} else {
				r.push(`tight`);
			}
			r.push(`asshole invitingly. ${He} starts`);
			if (canTalk(S.Concubine)) {
				r.push(
					`to beg`,
					Spoken(S.Concubine, `"Please assrape me, ${Master.charAt(0)}-"`),
					`into the sheets,`);
			} else {
				r.push(`to point an inviting finger at ${his} backdoor,`);
			}
			r.push(`but you interrupt ${him} by shoving ${him} forward so that ${he}'s all the way face-down on the bed. ${He} knows how you like it and starts to wriggle, struggle, and whine as you roughly sodomize ${him},`);
			if (V.PC.dick === 0) {
				r.push(`the strap-on`);
			} else {
				r.push(`your cock`);
			}
			r.push(`ramming straight up ${his} ass despite the uncomfortable angle,`);
			if (S.Concubine.butt > 5) {
				r.push(`which ${his} huge ass makes easier for ${him} by limiting how deeply you can fuck ${him} without ${his} buttocks spread wide.`);
			} else if (S.Concubine.butt > 2) {
				r.push(`which ${his} big behind makes easier for ${him} by limiting how deeply you can fuck ${him}.`);
			} else {
				r.push(`which ${his} modest ass makes harder for ${him} by allowing you to get really deep inside ${his} anus.`);
			}
			r.push(`${He} continues to wrestle with you, sometimes even managing to dislodge`);
			if (V.PC.dick === 0) {
				r.push(`the strap-on,`);
			} else {
				r.push(`your dick,`);
			}
			r.push(`allowing you the`);
			if (V.PC.dick === 0) {
				r.push(`cruel delight`);
			} else {
				r.push(`delicious sensation`);
			}
			r.push(`of pushing it back up ${his} butt each time. Despite the pretense ${his} enjoyment is obvious;`);
			if (S.Concubine.chastityPenis === 1) {
				r.push(`though ${his} cock has been placed in a chastity cage, ${he}'s grinding against you as eagerly as if it wasn't there at all.`);
			} else if (S.Concubine.dick > 0 && S.Concubine.hormoneBalance >= 100) {
				r.push(`though ${his} hormone-filled body can't get ${his} dick hard any more, ${he}'s leaking precum all over the bed.`);
			} else if (S.Concubine.dick > 0 && S.Concubine.balls > 0 && S.Concubine.ballType === "sterile") {
				r.push(`though ${his} useless balls can't muster the effort to get ${his} dick hard any more, ${he}'s leaking precum all over the bed.`);
			} else if (S.Concubine.dick > 0 && S.Concubine.balls === 0) {
				r.push(`though ${his} gelded body can't get ${his} dick hard any more, ${he}'s leaking precum all over the bed.`);
			} else if (canAchieveErection(S.Concubine)) {
				r.push(`${he} can't stop ${himself} from humping ${his} rock-hard cock against the sheets below ${him}.`);
			} else if (S.Concubine.dick > 7) {
				r.push(`though ${his} oversized dick has grown too large to even dream of becoming erect, ${he}'s leaking precum all over the bed.`);
			} else if (S.Concubine.dick > 0) {
				r.push(`though ${he} can't get hard, ${he}'s leaking precum all over the bed.`);
			} else if (S.Concubine.clit > 1) {
				r.push(`${he} can't stop ${himself} from humping ${his} erect clit against the sheets below ${him}.`);
			} else {
				r.push(`${his} pussy is so wet ${he}'s leaving a wet spot on the sheets beneath ${him}.`);
			}
			r.push(`${He} finally orgasms, sobbing with overstimulation when you pound ${him} for a while longer before`);
			if (V.PC.dick === 0) {
				r.push(`finding your own climax.`);
			} else {
				r.push(`shooting rope after rope of cum into ${him}.`);
			}
			r.push(`${He} quickly cleans you with ${his} mouth and heads to the shower. When ${he} gets out you're back at work, but ${he} comes out to <span class="hotpink">plant a kiss on you.</span>`);
			S.Concubine.devotion += 10;
			seX(S.Concubine, "oral", V.PC, "penetrative");
			seX(S.Concubine, "anal", V.PC, "penetrative", 1);

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
