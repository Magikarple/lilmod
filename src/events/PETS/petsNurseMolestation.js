App.Events.petsNurseMolestation = class petsNurseMolestation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Nurse,
			() => (S.Nurse.energy > 95 || (S.Nurse.fetishStrength > 60 && (S.Nurse.fetish === "sadist" || S.Nurse.fetish === "dom")))
		];
	}

	actorPrerequisites() {
		return [[
			s => s.anus !== 0,
			s => s.assignment === Job.CLINIC
		]];
	}

	execute(node) {
		const subSlave = getSlave(this.actors[0]);
		let r = [];
		const {
			He, His,
			he, his, him, himself
		} = getPronouns(S.Nurse);
		const {
			He2,
			he2, his2, him2,
		} = getPronouns(subSlave).appendSuffix("2");
		const {title: Master} = getEnunciation(S.Nurse);

		App.Events.drawEventArt(node, [S.Nurse, subSlave], [null, "no clothing"]);

		r.push(
			`Late at night, you decide to walk through the clinic to look over its patients personally. As soon as you enter the space, left dimly lit at night to encourage sleep, you hear a quiet moaning and the distinct noise of flesh on flesh. Heading over towards that area, you note the noise is coming from where`,
			App.UI.DOM.slaveDescriptionDialog(subSlave),
			`is listed as resting. Appearing quietly, you see`,
			App.UI.DOM.slaveDescriptionDialog(S.Nurse),
			`between ${his} patient's`
		);
		if (hasBothLegs(subSlave)) {
			r.push(`legs,`);
		} else {
			r.push(`hips,`);
		}
		r.push(`which are spread wide by the stirrups provided with each patient bed for examination of a slave's holes.`);
		App.Events.addParagraph(node, r);

		r = [];
		if (canPenetrate(S.Nurse)) {
			r.push(`${He}'s pounding eagerly away and mauling ${his} patient's bare boobs with both hands.`);
			seX(S.Nurse, "penetrative", subSlave, "mammary");
		} else {
			r.push(`${He}'s using one hand to fingerfuck ${his} patient, and the other to masturbate furiously.`);
			seX(S.Nurse, "penetrative", subSlave, "anal");
		}
		r.push(`Moaning in sexual abandon, ${he}'s obviously unaware that ${he}'s being watched. ${subSlave.slaveName} is oddly quiescent. You silently query the Clinic's systems, and learn that ${he2}'s under curative sedation. The advanced curatives applied here often improve slaves' health more quickly if a slave is mildly sedated to let them work. ${S.Nurse.slaveName} has obviously decided to use the almost unconscious ${subSlave.slaveName} for ${his} own gratification.`);
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Punish ${him} for molesting patients`, punish));

		if (canDoVaginal(S.Nurse) || canDoAnal(S.Nurse)) {
			choices.push(new App.Events.Result(`Rape ${him} for molesting patients`, rape));
			choices.push(new App.Events.Result(`Have sex with ${him} while ${he} molests the patient`, sex));
		}

		App.Events.addResponses(node, choices);

		function punish() {
			S.Nurse.devotion += 4;
			if (canDoVaginal(S.Nurse)) {
				seX(S.Nurse, "vaginal", V.PC, "penetrative");
			} else if (canDoAnal(S.Nurse)) {
				seX(S.Nurse, "anal", V.PC, "penetrative");
			}
			actX(S.Nurse, "oral", 20);
			V.slaves.forEach(function(s) {
				if (s.assignment === Job.CLINIC) {
					s.trust += 2;
				}
			});
			return `The next morning, the Clinic's patients awake to see an uncharacteristically subdued ${S.Nurse.slaveName} hurrying around, doing ${his} best to see to ${his} business quietly. ${He} does so a bit gingerly, as though ${he} was fucked without mercy last night, and tries not to meet anyone's eyes. Their attention is immediately drawn, however, to a sign pinned to the chest of ${his} clothing. It reads, 'The Nurse was caught molesting patients last night. ${He} has been ordered to immediately perform oral sex on anyone who asks.' Every patient instantly demands oral sex, and by the time ${he}'s gotten the last one off, the first has placed another request. ${He}'s exhausted by the end of the day; the patients, on the other hand, are <span class="trust inc">very pleased</span> to see the haughty, handsy nurse brought low.`;
		}

		function rape() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You shove ${S.Nurse.slaveName} hard, forcing a surprised shriek out of ${him} as ${he} crashes forward into ${subSlave.slaveName}'s`);
			if (subSlave.boobs > 2000) {
				r.push(`helpfully pillowlike bosom,`);
			} else if (subSlave.boobs > 500) {
				r.push(`healthy tits,`);
			} else {
				r.push(`chest,`);
			}
			r.push(`and then ram your pelvis up against ${him}, pinning ${him} against ${his} patient. ${subSlave.slaveName}'s eyelids flicker, but ${he2} does not wake up, despite your assault`);
			if (canPenetrate(S.Nurse)) {
				r.push(`shoving ${S.Nurse.slaveName}'s cock as far up ${his2} asshole as it will go.`);
			} else {
				r.push(`trapping ${S.Nurse.slaveName}'s hands between them and pushing ${his} fingers even farther up ${subSlave.slaveName}'s asshole.`);
			}
			r.push(`${S.Nurse.slaveName} tries to shift a little, but receives a peremptory push back to where ${he} was. ${He} realizes ${he}'s to lie still and take what's coming to ${him}, and ${he} does ${his} best to relax.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (V.PC.dick !== 0) {
				if (canDoVaginal(S.Nurse)) {
					if (S.Nurse.vagina > 2) {
						r.push(`${His} roomy cunt takes your brutal thrusting without trouble. To communicate your message, ${he} needs to be uncomfortable, so you deliberately force ${him} down farther and fuck ${him} at an awkward angle. Your harsh pounding begins to force groans out of ${him}.`);
					} else if (S.Nurse.vagina > 1) {
						r.push(`${He} gasps as you force your cock inside ${his} cunt without any accommodation for ${his} comfort. This is supposed to send a message, so you send a message, fucking ${him} without mercy. ${He} begins to groan under the harsh pounding.`);
					} else {
						r.push(`${He} whines as you force your cock inside ${his} tight cunt. This is supposed to send a message, so you send a message, treating ${him} like a veteran whore who can take anything. ${He} begins to groan under the harsh pounding, ${his} poor little pussy unused to this kind of abuse.`);
					}
					seX(S.Nurse, "vaginal", V.PC, "penetrative");
				} else {
					if (S.Nurse.anus > 2) {
						r.push(`${His} roomy anus takes your brutal thrusting without trouble. To communicate your message, ${he} needs to be uncomfortable, so you push a couple of fingers up there alongside your dick. ${He} wriggles helplessly, starting to groan as you rape ${his} asshole.`);
					} else if (S.Nurse.anus > 1) {
						r.push(`${He} gasps as you force your cock up ${his} ass without waiting for ${him} to relax or get ready. This is supposed to send a message, so you send a message, buttfucking ${him} without mercy. ${He} begins to groan under the harsh anal pounding.`);
					} else {
						r.push(`${He} whines as you force your cock up ${his} tight ass. This is supposed to send a message, so you send a message, treating ${him} like a veteran anal whore who can take anything. ${He} begins to scream under the harsh pounding, ${his} poor little butthole unused to this kind of abuse.`);
					}
					seX(S.Nurse, "anal", V.PC, "penetrative");
				}
			} else {
				if (canDoVaginal(S.Nurse)) {
					if (S.Nurse.vagina > 2) {
						r.push(`To communicate your message, ${he} needs to be uncomfortable, so you carefully form your fingers into a beak shape and push your fist up inside ${him}. ${He} screams as your knuckles push past ${his} pussylips, and then starts to groan as you fistfuck ${his} lewd cunt.`);
					} else if (S.Nurse.vagina > 1) {
						r.push(`${He} gasps as you ram three fingers into ${his} cunt without any accommodation for ${his} comfort. This is supposed to send a message, so you send a message, fingerfucking ${him} without mercy. ${He} begins to groan under the harsh molestation.`);
					} else {
						r.push(`${He} whines as you force two fingers inside ${his} tight cunt. This is supposed to send a message, so you send a message, treating ${him} like a veteran whore who can take a serious fingerfucking. ${He} begins to groan under the harsh molestation, ${his} poor little pussy unused to this kind of abuse.`);
					}
					seX(S.Nurse, "vaginal", V.PC, "penetrative");
				} else {
					if (S.Nurse.anus > 2) {
						r.push(`To communicate your message, ${he} needs to be uncomfortable, so you carefully form your fingers into a beak shape and push your fist up ${his} ass. ${He} screams as your knuckles push past ${his} sphincter, and then starts to groan as you fistfuck ${his} lewd butthole.`);
					} else if (S.Nurse.anus > 1) {
						r.push(`${He} gasps as you ram three fingers up ${his} butt without any accommodation at all. This is supposed to send a message, so you send a message, fingerfucking ${his} asshole without mercy. ${He} begins to groan under the harsh anal molestation.`);
					} else {
						r.push(`${He} whines as you force two fingers inside ${his} tight ass. This is supposed to send a message, so you send a message, treating ${him} like a veteran whore who can take a serious anal fingerfucking. ${He} begins to groan under the harsh molestation, ${his} girly little butthole unused to this kind of abuse.`);
					}
					seX(S.Nurse, "anal", V.PC, "penetrative");
				}
			}
			r.push(`${subSlave.slaveName} lies forgotten underneath ${him}, insensible even with the Nurse's body being sawed back and forth across ${him2}. ${S.Nurse.slaveName} is such a horny slut that ${he} starts to enjoy ${himself} a little once ${he} gets used to what you're doing to ${him}, but then you climax and discard ${him}, leaving ${him} looking forlorn and tousled. ${He} knows ${he} crossed a line, and <span class="devotion inc">privately resolves</span> to be a little less handsy in the future.`);
			S.Nurse.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sex() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You announce your presence to ${S.Nurse.slaveName} by groping ${his}`);
			if (subSlave.butt > 7) {
				r.push(`absurd butt.`);
			} else if (subSlave.butt > 3) {
				r.push(`generous buttocks.`);
			} else {
				r.push(`cute behind.`);
			}
			r.push(`${He} jumps, startled, and emits a short scream of surprise that trails off into a moan of sexual anticipation as you continue to knead and massage ${his} ${S.Nurse.skin} bottom. ${He} starts thrusting again, but carefully, so gently that ${he} doesn't need to stop for you to insert`);
			if (V.PC.dick !== 0) {
				r.push(`your hard cock into ${his}`);
				if (canDoVaginal(S.Nurse)) {
					r.push(`hot cunt.`);
					seX(S.Nurse, "vaginal", V.PC, "penetrative");
				} else {
					r.push(`willing anus.`);
					seX(S.Nurse, "anal", V.PC, "penetrative");
				}
				if (V.PC.vagina !== -1) {
					r.push(`Then you grab one of ${his} hands and pull it down under ${him}. ${He} gets the idea, and fingers your pussy while you fuck ${him}.`);
				}
			} else {
				r.push(`a couple of fingers into ${his}`);
				if (canDoVaginal(S.Nurse)) {
					r.push(`hot cunt.`);
					seX(S.Nurse, "vaginal", V.PC, "penetrative");
				} else {
					r.push(`willing anus.`);
					seX(S.Nurse, "anal", V.PC, "penetrative");
				}
				r.push(`One of ${his} hands, now freed, snakes around between you to pleasure you in turn. Its index and ring fingers slide deliciously between your folds to either side of your moist channel, into which the middle finger begins to delve.`);
			}
			r.push(`You nip ${his} neck and pull ${his} upper torso and neck around far enough around for you to plant half a kiss on the side of ${his} panting mouth.`);
			App.Events.addParagraph(frag, r);
			r = [];
			App.Events.addParagraph(frag, [
				`This is far too much for ${S.Nurse.slaveName}, and ${he} shakes with orgasm. ${He} isn't getting off that easily; you fuck ${him} slowly, letting ${him} ride aftershocks until ${he} bottoms out and ${his} arousal starts to build again. ${He} never stopped gently thrusting into the insensible ${subSlave.slaveName}, who is so thoroughly affected by the drugs that only ${his2} unconscious bodily reactions offer any indication that ${he2}'s getting fucked too.`
			]);
			r.push(`When you finally finish with ${S.Nurse.slaveName} and step away, allowing ${him} to step back in turn, ${he} looks at you with <span class="trust inc">flirty confidence</span> and husks, "${Master}, that was really pervertedly good. Even by the standards around here." You make no verbal reply, but give ${him} an open-handed swat across ${his} ${S.Nurse.skin} buttocks as ${he} turns to clean up ${his} patient's asshole. ${He} squeaks with surprise a second time, so startled that`);
			if (V.PC.dick !== 0) {
				r.push(`${his} well-fucked`);
				if (canDoVaginal(S.Nurse)) {
					r.push(`cunt`);
				} else {
					r.push(`backdoor`);
				}
				r.push(`releases a blob of cum to go sliding down ${his} leg as ${he} works.`);
			} else {
				r.push(`${he} stumbles against ${subSlave.slaveName}'s boobs again.`);
			}
			App.Events.addParagraph(frag, r);
			App.Events.addParagraph(frag, [
				`The next morning, ${subSlave.slaveName} notices that ${his2} ass is a little sore, and ${he2} can't remember any reason why it would be. ${He2} shrugs. In ${his2} life, this is unsurprising.`
			]);
			S.Nurse.trust += 4;
			return frag;
		}
	}
};
