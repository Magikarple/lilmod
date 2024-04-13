// cSpell:ignore temazcal

/** @param {App.Entity.SlaveState} sacrifice */
App.UI.SlaveInteract.aztecSlaveSacrificePenance = function(sacrifice) {
	const frag = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(sacrifice);
	const {title: Master, say: say} = getEnunciation(sacrifice);

	const activeSlaveRepSacrifice = repGainSacrifice(sacrifice, V.arcologies[0]);

	r.push(`You inform ${sacrifice.slaveName} that ${he}'s been chosen to take part in a ritual sacrifice to Xochiquetzal, the goddess of carnal love, excess, and sexual release.`);
	if (sacrifice.devotion > 50) {
		if (!canTalk(sacrifice)) {
			r.push(`${He} looks excited at the prospect of suffering for the goddess.`);
		} else if (sacrifice.fetishKnown === 1 && sacrifice.fetishStrength > 60 && sacrifice.fetish !== Fetish.NONE) {
			r.push(`${He} looks excited.`);
			r.push(Spoken(sacrifice, `"${Master}! I'm honored to be chosen! Thank you so much!"`));
			if (sacrifice.fetish === "masochist") {
				r.push(`${He} shudders with excitement.`);
				r.push(Spoken(sacrifice, `"I mean, I know my pain will help to feed the goddess and I'm willing to suffer plenty to please her, but is it really a sacrifice if I'm enjoying it?"`));
			} else if (sacrifice.fetish === "cumslut") {
				r.push(`${He} hesitates, looking concerned.`);
				r.push(Spoken(sacrifice, `"Oh Gods, the sex cleansing will be awful, but I'm willing to sacrifice all that pain for the goddess."`));
			} else if (sacrifice.fetish === "humiliation") {
				r.push(`${He} shudders with excitement.`);
				r.push(Spoken(sacrifice, `"I heard everyone can see me as I suffer. I hope the public penance will please the goddess."`));
			} else if (sacrifice.fetish === "buttslut") {
				r.push(`${He}`);
				if (canSee(sacrifice)) {
					r.push(`looks sadly at the floor.`);
				} else {
					r.push(`tilts ${his} head downwards sadly.`);
				}
				r.push(Spoken(sacrifice, `"Oh Gods, that means no butt sex for me. I hope Xochiquetzal be pleased by all that sacrifice."`));
			}
		} else {
			r.push(`${He} looks determined.`);
			r.push(Spoken(sacrifice, `"${Master}, I'll do my best. No other slave will be cleaner for the goddess than I.`));
		}
	} else if (sacrifice.devotion > 20 || (sacrifice.devotion >= -20 && sacrifice.trust < -20 && sacrifice.trust >= -50)) {
		if (!canTalk(sacrifice)) {
			r.push(`${He} looks cautious at the prospect of suffering for the goddess.`);
		} else if (sacrifice.fetishKnown === 1 && sacrifice.fetishStrength > 60 && sacrifice.fetish !== Fetish.NONE) {
			r.push(`${He} looks cautiously excited.`);
			r.push(Spoken(sacrifice, `"${Master},`));
			if (sacrifice.fetish === Fetish.SUBMISSIVE) {
				r.push(Spoken(sacrifice, `I'll follow your every word to be a good sacrifice for the goddess. I won't even blink if I'm not instructed to.`));
			} else if (sacrifice.fetish === "masochist") {
				r.push(
					Spoken(sacrifice, `sacrifice will be hard, right? Lots of pain the whole week..."`),
					`${he} trails off.`
				);
			} else if (sacrifice.fetish === "cumslut") {
				r.push(
					Spoken(sacrifice, `it's going to be so hard to not be able to drink cum the whole week!"`),
					`An expression of sadness spreads across ${his} face.`,
					Spoken(sacrifice, `"But I'm willing to do it for the goddess."`)
				);
			} else if (sacrifice.fetish === "humiliation") {
				r.push(Spoken(sacrifice, `it's a public sacrifice, right? I hope they all see how much one must suffer to please the goddess."`));
			} else if (sacrifice.fetish === "buttslut") {
				r.push(
					Spoken(sacrifice, `my poor ass, so neglected. I hope Xochiquetzal will be pleased with such a hard sacrifice."`),
					`${He} rubs ${his} butt in anticipation.`
				);
			} else {
				r.push(
					Spoken(sacrifice, `I will do my best to be a good sacrifice,"`),
					`${he} says, trying to put on a brave front. Then, half to ${himself}, ${he} adds in a small voice,`,
					Spoken(sacrifice, `"I can do this."`)
				);
			}
		} else if (sacrifice.sexualFlaw !== "none") {
			r.push(Spoken(sacrifice, `"Yes, ${Master},"`));
			r.push(`${he} ${say}s obediently. ${He} hesitates, looking concerned.`);
			if (sacrifice.sexualFlaw === "hates oral") {
				r.push(
					Spoken(sacrifice, `"So, no sucking dicks for a week, right? It will be hard, but I'll do it to please the goddess."`),
					`A coy little smile appears on ${his} face when ${he} thinks you aren't looking.`
				);
			} else if (sacrifice.sexualFlaw === "hates anal") {
				r.push(
					Spoken(sacrifice, `"So, no taking dicks up my ass for a week, right? It will be hard, but I'll do it to please the goddess."`),
					`A coy little smile appears on ${his} face when ${he} thinks you aren't looking.`
				);
			} else if (sacrifice.sexualFlaw === "shamefast") {
				r.push(
					Spoken(sacrifice, `"That loin cloth seems so small..."`),
					`${His} face turns red as ${he} stutters.`
				);
			} else if (sacrifice.sexualFlaw === "repressed") {
				r.push(
					Spoken(sacrifice, `"So, no sex at all for a week, right? It will be hard, but I'll do it to please the goddess."`),
					`A coy little smile appears on ${his} face when ${he} thinks you aren't looking.`
				);
			} else {
				r.push(
					`${He} tries to be brave.`,
					Spoken(sacrifice, `"${Master}, I will do my best to be a good sacrifice" Then, half to ${himself}, ${he} adds in a small voice, "I can do this..."`)
				);
			}
		} else {
			r.push(
				`${He} tries to be brave.`,
				Spoken(sacrifice, `"${Master}, I will do my best to be a good sacrifice."`),
				`Then, half to ${himself}, ${he} adds in a small voice,`,
				Spoken(sacrifice, `"I can do this..."`)
			);
		}
	} else if (sacrifice.devotion >= -50 && sacrifice.trust < -20) {
		if (!canTalk(sacrifice)) {
			r.push(`${He} looks afraid at the prospect of suffering for the goddess.`);
		} else if (sacrifice.sexualFlaw !== "none") {
			r.push(
				`${He} seems afraid of what's to come and ${his} answer is barely more than a whisper, almost to ${himself},`,
				Spoken(sacrifice, `"Yes ${Master}..."`),
				`Finally ${he} gasps out,`,
				Spoken(sacrifice, `"Gods, I'm going to s-suffer so much."`)
			);
			if (["hates oral", "hates anal", "hates penetration"].includes(sacrifice.sexualFlaw)) {
				r.push(`${He} visibly considers disobedience but the prospect of not having`);
				if (sacrifice.sexualFlaw === "hates oral") {
					r.push(`a dick down ${his} throat`);
				} else if (sacrifice.sexualFlaw === "hates anal") {
					r.push(`${his} butt filled`);
				} else if (sacrifice.sexualFlaw === "hates penetration") {
					r.push(`any hole filled with dick`);
				}
				r.push(
					`for a hole week seems enough to go through any ordeal you order ${him} to do. Trembling, ${he} answers,`,
					Spoken(sacrifice, `"Yes ${Master}, I'll obey."`)
				);
			} else if (sacrifice.sexualFlaw === "shamefast") {
				r.push(
					`${He} bursts into tears.`,
					Spoken(sacrifice, `"I'm going to be practically naked where everyone can see me!"`)
				);
			} else if (sacrifice.sexualFlaw === "repressed") {
				r.push(
					`A big smile appears on ${his} face.`,
					Spoken(sacrifice, `"I'm going to be cleansed. I'll be cleaned for the goddess..."`)
				);
			}
		} else {
			r.push(
				`${He} does ${his} best to control ${himself} and avoid punishment.`,
				Spoken(sacrifice, `"${Master}, I will do it. I'll do the penitence for the goddess."`),
				`${He} holds ${himself} together until you dismiss ${him}; as ${he} turns to leave, the tears come fast, and ${he} almost runs into the door frame on ${his} way out${(canSee(sacrifice)) ? `, blinded with weeping` : ``}.`);
		}
	} else {
		if (canWalk(sacrifice)) {
			r.push(`${He} manages to run halfway to your desk before ${he}'s`);
			if (S.Bodyguard) {
				r.push(`clotheslined by ${S.Bodyguard.slaveName}.`);
			} else if (V.HeadGirlID !== 0) {
				r.push(`restrained by ${S.HeadGirl.slaveName}.`);
			} else {
				r.push(`restrained by another, more obedient slave.`);
			}
			r.push(`${He} kicks and struggles as ${he}'s removed from your office. By the end of the week, it won't matter; ${he}'ll be so hungry and horny that resistance will be the last thing on ${his} mind.`);
		} else if (!canTalk(sacrifice)) {
			r.push(`A long line of slurs and names are screamed at you, none of them particularly pleasant. Your`);
			if (V.HeadGirlID !== 0) {
				r.push(`Head Girl ${S.HeadGirl.slaveName}`);
			} else {
				r.push(`another, more obedient slave`);
			}
			r.push(`removes ${him} as ${he} continues ${his} rant, spitting and resisting as much as ${he} can without limbs. By the end of the week, it won't matter; ${he}'ll be so hungry and horny that resistance will be the last thing on ${his} mind.`);
		} else {
			r.push(`${He} proceeds to drop into a massive tantrum for the lack of better ways to express ${himself}.`);
			if (V.HeadGirlID !== 0) {
				r.push(S.HeadGirl.slaveName);
			} else {
				r.push(`Another, more obedient slave`);
			}
			r.push(`removes ${him} as ${he} continues struggling, spitting and resisting as much as ${he} can. By the end of the week, it won't matter; ${he}'ll be so hungry and horny that resistance will be the last thing on ${his} mind.`);
		}
	}

	App.Events.addParagraph(frag, r);
	r = [];

	const {hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
	r.push(`As tradition dictates, the purification of ${his} body will be used as penance to the goddess in an attempt to pay for the favors bestowed upon your arcology. First, one of your slaves is appointed to represent you as ${his} owner, who willingly gives the slave as sacrifice, and is put in charge of the slave's health while ${he} goes through the penance process. ${sacrifice.slaveName} is thoroughly bathed and ${his} whole body covered in blue paint, while ${his} mouth is covered in black paint, as payment for being a prostitute.`);
	/* Might need a clause here for other jobs besides "whore"*/
	r.push(`${He}'s taken to spend the night at the sexual servitude of another slave who will be sacrificed to Tezcatlipoca, god of the night sky. ${He}'s`);
	if (sacrifice.devotion > 20) {
		r.push(`fucked all night long;`);
	} else {
		r.push(`raped over and over again throughout the night;`);
	}
	r.push(`${his} holes dedicated to the sexual satisfaction of the slave who soon will face a much darker fate than ${him} to please the gods.`);
	if (canDoVaginal(sacrifice) && canDoAnal(sacrifice)) {
		actX(sacrifice, "vaginal", random(1, 2));
		actX(sacrifice, "anal", random(1, 2));
		actX(sacrifice, "oral", random(2, 6));
		if (sacrifice.vagina === 0 && sacrifice.anus === 0) {
			r.push(`${His} sacrifice to the gods naturally meant giving up <span class="lime">both of ${his} virginities.</span>`);
			sacrifice.vagina = 1;
			sacrifice.anus = 1;
		}
		if (canGetPregnant(sacrifice) && sacrifice.eggType === "human") {
			r.push(`${His} lover tried ${hisU} best to plant ${hisU} seed deep within ${him}. ${He}'s likely pregnant after last night.`);
			r.push(knockMeUp(sacrifice, 70, 2, 0));
		}
	} else if (canDoVaginal(sacrifice)) {
		actX(sacrifice, "vaginal", random(1, 3));
		actX(sacrifice, "oral", random(2, 3));
		if (sacrifice.vagina === 0) {
			r.push(`${His} sacrifice to the gods ended up including <span class="lime">${his} virginity.</span>`);
			sacrifice.vagina = 1;
		}
		if (canGetPregnant(sacrifice) && sacrifice.eggType === "human") {
			r.push(`${His} lover tried ${hisU} best to plant ${hisU} seed deep within ${him}. ${He}'s likely pregnant after last night.`);
			r.push(knockMeUp(sacrifice, 70, 0, 0));
		}
	} else if (canDoAnal(sacrifice)) {
		actX(sacrifice, "anal", random(1, 3));
		actX(sacrifice, "oral", random(2, 3));
		if (sacrifice.anus === 0) {
			r.push(`${His} sacrifice to the gods ended up including <span class="lime">${his} anal virginity.</span>`);
			sacrifice.anus = 1;
		}
		if (canGetPregnant(sacrifice) && sacrifice.eggType === "human") {
			r.push(`${His} lover tried ${hisU} best to plant ${hisU} seed deep within ${him}. ${He}'s likely pregnant after last night.`);
			r.push(knockMeUp(sacrifice, 70, 1, 0));
		}
	} else {
		actX(sacrifice, "oral", random(2, 6));
		r.push(`By the following morning ${he}'s sickened from the number of loads blown down ${his} throat. Luckily inducing vomiting will be enough to have ${him} ready for the next step.`);
	}

	App.Events.addParagraph(frag, r);
	r = [];

	r.push(`${He}'s prepared for ${his} public penance. First, ${he} is left to sweat for several hours on the temazcal to remove any impurity of the previous night before being bathed and painted once again. ${He}'s specially dressed for the occasion -`);
	if (sacrifice.sexualFlaw === "shamefast" || sacrifice.sexualFlaw === "repressed") {
		r.push(`a short red loincloth and a chastity belt designed to prevent any forbidden self-stimulation cover as little of ${his} lower body as possible. The setup is adorned with long, red, silky fringes that move as ${he} walks. ${His} chest is bare except for a pair of golden pasties over ${his} nipples joined by three blue chains on cascade.`);
	} else {
		r.push(`a particularly enticing red loincloth covers ${his} lower regions while hiding the chastity belt that will thwart any forbidden self-stimulation. ${His} chest is nearly naked save for a large necklace adorned with feathers, gold and flowers.`);
	}
	r.push(`Lastly, ${his} head is decorated with a huge crest of feathers in the colors of the goddess.`);

	App.Events.addParagraph(frag, r);
	r = [];

	r.push(`You lead the procession through the arcology's halls with ${sacrifice.slaveName},`);
	if (sacrifice.devotion > 20) {
		r.push(`proudly facing destiny,`);
	} else {
		r.push(`restrained and crying while ${he} tries to resist,`);
	}
	r.push(`followed by the sound of drums and flutes with ${his} caretaker bringing up the rear. Finally, you reach the center of your arcology's largest plaza where`);
	if (activeSlaveRepSacrifice <= 0) {
		r.push(`you find nobody cares about ${his} penance. ${He}'s presented to anyone that will listen`);
	} else if (activeSlaveRepSacrifice < 10) {
		r.push(`a few spectators have assembled to watch ${his} internment. ${He}'s presented to the onlookers`);
	} else if (activeSlaveRepSacrifice < 100) {
		r.push(`a small crowd has assembled to watch ${his} internment. ${He}'s presented to the crowd`);
	} else {
		r.push(`a large crowd has assembled to eagerly watch ${his} internment. ${He}'s presented to the excited crowd`);
	}
	r.push(`as the sacrifice and is`);
	if (sacrifice.devotion > 20) {
		r.push(`helped`);
	} else {
		r.push(`pushed`);
	}
	r.push(`into a golden cage, just big enough for ${him} to fit. Once inside, a huge dose of aphrodisiacs are injected into ${him} and the door is locked. During ${his} week-long penance, ${he} will be kept on a strict regimen of aphrodisiacs to keep ${him} aroused but unable to cum, a special spiced tea diet to avoid dehydration, and a constant vigil, with only a few hours of sleep every night.`);

	App.Events.addParagraph(frag, r);
	r = [];
	if (sacrifice.devotion > 50) {
		r.push(`As the week starts, ${he} is proud to fulfill ${his} duty. ${He} fights the urge to touch ${himself}, drinking only when ${he} needs to, and does ${his} best to keep ${himself} pure for the goddess.`);

		if (sacrifice.fetishKnown === 1 && sacrifice.fetishStrength > 60 && sacrifice.fetish !== Fetish.NONE) {
			if (sacrifice.fetish === Fetish.SUBMISSIVE) {
				r.push(`${He} makes sure to be ready to take any instruction, and it's clear that ${he} enjoys it. As the week progresses, the signs of ${his} sexual frustration become more evident. However, ${he} seems to enjoy the struggle of resisting the urges, since ${he} is under strict orders not to touch ${himself}. Every time the slave in charge of feeding ${him} or renewing ${his} aphrodisiacs orders ${him} to come closer, ${his} body shudders with lust-fueled pleasure. ${He} moans lewdly whenever ${he}'s ordered to wake up or to sleep. By the end of the week, ${he} fights to remain standing, almost delusional from lust and starvation. ${He} was told to remain`);
				if (hasBothLegs(sacrifice)) {
					r.push(`on ${his} feet,`);
				} else {
					r.push(`standing,`);
				}
				r.push(`but, much to ${his} chagrin, exhaustion often brings ${him} to`);
				if (hasBothLegs(sacrifice)) {
					r.push(`${his} knees.`);
				} else {
					r.push(`the floor.`);
				}
			} else if (sacrifice.fetish === "masochist") {
				r.push(`${He} seems to enjoy the pain ${his} sacrifice gives ${him}. As the week progresses, it is fairly common to see ${him} moaning and showing other signs of pleasure that seem to be unrelated to the huge amount of aphrodisiacs in ${his} system. Before long, ${he} starts to faint more often as ${he} refuses to even drink the tea to keep ${him} hydrated and avoids any sleep whatsoever. The specially designated slave appointed to ${his} care needs to force ${him} to drink every few hours to avoid dying of dehydration. ${He} seems to enjoy the extra abuse and even fights to retain as little liquid inside ${him} as possible. By the end of the week, ${he} needs to be constantly reanimated to carry out ${his} penance, a process that ${he} also seems to enjoy.`);
			} else if (sacrifice.fetish === "cumslut") {
				r.push(`${He} can be seen frequently crying and desperately fighting the excruciating need to touch ${himself}. As a result of the aphrodisiacs, the paint on ${his}`);
				if (hasAnyLegs(sacrifice)) {
					r.push(`inner ${hasBothLegs(sacrifice) ? "thighs" : "thigh"}`);
				} else {
					r.push(`crotch`);
				}
				r.push(`is constantly wet and steadily drips onto the cage floor. As the week progresses, ${his} whining increase and ${his} body convulses harder and harder with lust. The loincloth ${he}'s wearing is constantly wet, as`);
				if (hasBothLegs(sacrifice)) {
					r.push(`are ${his} legs.`);
				} else {
					r.push(`is most of ${his} lower body.`);
				}
				r.push(`It is common to see ${him} begging strength from the goddess only to burst into tears when no relief comes to ${him} and crying ${himself} to sleep at night only to be awoken a few hours later. As a result of all ${his} crying and lubrication, ${he} needs to be hydrated more often. By the end of the week, ${his} body refuses to lose more liquid, a fact that doesn't stop ${him} from sobbing, immobile in ${his} dried arousal on the floor of the cage, interrupted only by the spasms of ${his} lust raked body and the slave posted to procure ${him} more tea to prevent ${him} from succumbing to dehydration.`);
			} else if (sacrifice.fetish === "humiliation") {
				r.push(`${He} seems to enjoy all the attention ${he} receives as ${he} tries to fight the impulse to touch ${himself}. ${He} takes special care to show how degrading the whole process can be. It is common to see ${him} enjoying every reapplication of aphrodisiacs and when ${he} needs to be awoken. Often, ${he} refuses to drink the tea, hoping the time comes that ${he} will be forced to drink it. As the week progresses and the signs of discomfort become more obvious, ${he} rejoices in the attempts of the slave on duty to force ${him} to drink ${his} tea and the way ${he}'s awakened after just a few hours of sleep. ${His} body shows clear signs of food, sleep and sexual deprivation that increases as the days go by; ${he} shows no shame with displaying ${his} lack of inner strength. By the end of the week, ${he} can't stand up and remains on the floor of the cage, enjoying the soak in ${his} own sexual fluids and saving what little strength ${he} has left to make ${his} waterings thoroughly humiliating.`);
			} else if (sacrifice.fetish === "buttslut") {
				r.push(`${He} tries to keep ${his} butt away from the bars of the cage to avoid any possible stimulation of it. As the week progresses, it is common to see ${him} trying to remain immobile as ${his} body shakes and twitches with lust; the constant stimulation of the soft fabric over ${his} butt, every shift of ${his} weight and even the caress of the air threatening to drive ${him} into a frenzy. The lack of food, sexual release and sleep wears ${his} will down as ${he}'s often ordered back`);
				if (hasBothLegs(sacrifice)) {
					r.push(`to ${his} feet`);
				} else {
					r.push(`into a standing position`);
				}
				r.push(`since ${he} insists on sitting down with the hope that ${his} butt numbs. By the end of the week, ${he} remains on the floor of the cage, sitting on ${his} side, as immobile as ${he} can, interrupted only by the occasional twitch and the need to drink or roll over.`);
			} else if (sacrifice.fetish === "boobs") {
				r.push(`${He} tries to distract ${himself} from the constant stimulation the necklace forces onto ${his} sensitive`);
				if (sacrifice.boobs >= 300) {
					r.push(`breasts.`);
				} else {
					r.push(`chest.`);
				}
				r.push(`${He} can be seen constantly fighting the urge to tweak ${his} nipples every time the aphrodisiacs are injected into to ${his} body. As the week goes by, the lack of food and sleep seem to distract ${him} enough to stop ${him} from clenching the cage's bars in an attempt to avoid cumming from stimulation to ${his} breasts. ${He} needs to be constantly watched during ${his} sleep to make sure`);
				if (hasAnyArms(sacrifice)) {
					r.push(`${his}`);
					if (hasBothArms(sacrifice)) {
						r.push(`hands don't`);
					} else {
						r.push(`hand doesn't`);
					}
					r.push(`slip under`);
				} else {
					r.push(`${he} doesn't toy with`);
				}
				r.push(`${his} necklace. By the end of the week, ${he} remains on the floor of ${his} cage, incapable of moving, from the lack of food, sleep, and sexual release. ${His} nipples are painfully erect from the aphrodisiacs in ${his} body.`);
			} else {
				r.push(`${He} tries to fulfill ${his} sacrifice as best ${he} can by trying to keep ${himself} pure for the goddess. ${He} submits to every instruction to the best of ${his} ability. ${He} can be seen constantly fighting the urge to touch ${himself}, shaking and moaning at the overwhelming lust caused by the aphrodisiacs. ${He} drinks only when told, and kindly refuses it when ${he} thinks ${he} can hold longer without it. As the week progresses, ${his} body shakes and twitches more often as ${he} struggles to stave off the compounding effects of the aphrodisiacs. ${He} tries to minimize any extra stimulation from the soft fabric or the necklace on ${his} chest by staying still, but sometimes ${he} bursts into tears when ${his} strength wavers. The only interactions ${he} faces are the reminders to stay hydrated, the application of more aphrodisiacs and ${his} sleep deprivation. By the end of the week, ${he} can hardly stand and often remains on the floor of the cage, soaked in ${his} own desperation.`);
			}
		} else {
			r.push(`${He} tries to fulfill ${his} sacrifice as best ${he} can by trying to keep ${himself} pure for the goddess. ${He} submits to every instruction to the best of ${his} ability. ${He} can be seen constantly fighting the urge to touch ${himself}, shaking and moaning at the overwhelming lust caused by the aphrodisiacs. ${He} drinks only when told, and kindly refuses it when ${he} thinks ${he} can hold longer without it. As the week progresses, ${his} body shakes and twitches more often as ${he} struggles to stave off the compounding effects of the aphrodisiacs. ${He} tries to minimize any extra stimulation from the soft fabric or the necklace on ${his} chest by staying still, but sometimes ${he} bursts into tears when ${his} strength wavers. The only interactions ${he} faces are the reminders to stay hydrated, the application of more aphrodisiacs and ${his} sleep deprivation. By the end of the week, ${he} can hardly stand and often remains on the floor of the cage, soaked in ${his} own desperation.`);
		}
	} else if (sacrifice.devotion > 20 || (sacrifice.devotion >= -20 && sacrifice.trust < -20 && sacrifice.trust >= -50)) {
		r.push(`As week starts, ${he} tries to fulfill ${his} duty. ${He} fights the urge to touch ${himself}, drinks only when ${he} needs to, and tries to keep ${himself} pure for the goddess.`);

		if (sacrifice.fetishKnown === 1 && sacrifice.fetishStrength > 60 && sacrifice.fetish !== Fetish.NONE) {
			if (sacrifice.fetish === Fetish.SUBMISSIVE) {
				r.push(`${He} makes sure is ready to take any order ${he} might be given, and it's evident that ${he} enjoys it every time ${he} is ordered to do something. As the week progresses ${he} finds ${himself} close to the limits of ${his} submission. As much as ${he} tries to`);
				if (hasAnyArms(sacrifice)) {
					r.push(`keep ${his} ${hasBothArms(sacrifice) ? "hands" : "hand"} to ${himself},`);
				} else {
					r.push(`stay calm,`);
				}
				r.push(
					`${his} sexual frustration finally wins the battle, and ${he} desperately tries to masturbate, only for ${him} to discover how effective the chastity belt really is. ${He} cries in frustration and shame for being unable to fulfill ${his} orders. The signs of sexual frustration are more evident on ${his} body as time goes by and it is common to see ${him} repeating`,
					Spoken(sacrifice, `"${Master} told me 'no touching yourself is allowed'"`),
					`over and over again as ${he} shifts ${his} weight from`
				);
				if (hasBothLegs(sacrifice)) {
					r.push(`foot to foot.`);
				} else {
					r.push(`side to side.`);
				}
				r.push(`The only thing that seems to shut ${him} up is when ${he} is ordered to come closer to drink, renew ${his} dose of aphrodisiacs or when ordered to be prepared to sleep. As soon as ${he}`);
				if (canHear(sacrifice)) {
					r.push(`hears`);
				} else if (canSee(sacrifice)) {
					r.push(`sees`);
				} else {
					r.push(`recognizes`);
				}
				r.push(`the order, ${his} body twitches and a soft moan can be heard. By the end of the week ${he} fights to remain standing up almost delusional as ${he} was told to remain`);
				if (hasBothLegs(sacrifice)) {
					r.push(`on ${his} feet`);
				} else {
					r.push(`standing`);
				}
				r.push(`but the signs of exhaustion often bring ${him} to`);
				if (hasBothLegs(sacrifice)) {
					r.push(`${his} knees.`);
				} else {
					r.push(`the floor.`);
				}
				r.push(`Sometimes ${he} tries to touch ${himself} down there only to burst into tears when ${he} is unable to do so.`);
			} else if (sacrifice.fetish === "masochist") {
				r.push(`${He} seems to enjoy the pain ${his} sacrifice submits ${him} to. Through the week is fairly common to see ${his} moaning and showing other signs of pleasure that seem to be fairly unrelated to the huge amounts of aphrodisiacs that run through ${him}. Every time the shot it is injected to ${his} body ${he} pants and thrusts, enjoying the pain of ${his} swollen`);
				if (sacrifice.dick !== 0) {
					r.push(`dick`);
				} else if (sacrifice.vagina > -1) {
					r.push(`pussy lips`);
				}
				r.push(`throbbing inside ${his} chastity belt. As the week progresses, ${he} starts to frequently faint, as ${he} refuses to even drink the tea that keeps ${him} hydrated or sleep whatsoever, instead choosing to focus on the pain of being constantly aroused. As a precaution, alternative methods to keep ${him} hydrated are put in place to avoid the pleasure of being forced to drink every few hours as ${he} was caught several times trying to cum from it. By the end of the week ${he} needs to be constantly reanimated to fulfill ${his} vigil, moaning as ${he} comes to conscience as the exhaustion and pain on ${his} body washes over to ${him}.`);
			} else if (sacrifice.fetish === "cumslut") {
				r.push(`/*Will need to be completely rewritten*/`);
				r.push(`At first, ${he} seems resigned to not cum at all during ${his} penance. Soon ${his} resolution seems to vanish and ${he} can be seen constantly crying, trying to fight the excruciating need to touch ${himself} yet failing by trying to masturbate through the chastity belt. As a result of the aphrodisiacs in ${his} body the paint on the inner part of ${his}`);
				if (hasBothLegs(sacrifice)) {
					r.push(`legs`);
				} else {
					r.push(`hips`);
				}
				r.push(`seems constantly wet and dripping into the cage which ${he} seems to enjoy. As ${his} whining and tears increases so do the spasms, a direct result of ${his} need to cum. The loincloth ${he} is wearing has to be constantly changed and ${his}`);
				if (hasAnyLegs(sacrifice)) {
					r.push(hasBothLegs(sacrifice) ? "legs" : "leg");
				} else {
					r.push(`lower body`);
				}
				r.push(`constantly cleaned when it becomes apparent they are wet to avoid any evidence of pleasure. ${He} tries to make it more difficult as now it is the only thing ${he} has to fantasize on cumming. At the end of the week is often common to see ${him} beg to be touched by anyone who is close enough to hear ${him} and bursts into tears when ${he} is blatantly ignored. As a result of all this crying, the lack of food and sleep ${he} needs to be hydrated more often also the dose of aphrodisiacs is changed to be less potent but be injected more often to avoid the danger that ${he} might cum from it. ${His} body refuses to lose any more liquids, a fact that doesn't stop ${him} from sobbing and begging to be touched as soon as ${he} finds the strength to it while ${he} remains almost immobile on the bottom of the cage, interrupted by the spasms of ${his} body as a result of being constantly aroused for a week.`);
			} else if (sacrifice.fetish === "humiliation") {
				r.push(`${He} seems to enjoy all the attention ${he} receives every time ${he} tries to fight the impulse to touch ${himself} as ${his} body shows clear signs of arousal and takes special care in showing just how degrading the whole process can be. It's common to see ${him} enjoying every time the dose of aphrodisiacs needs to be injected again or when ${he} needs to be awaken. Often, ${he} refuses to drink the tea provided, hoping that when the moment comes ${he} will be forced to drink it — preferably in a very humiliating way. As the week progresses and ${his} need to cum increases ${he} focuses on the humiliation ${he} gets every time the aphrodisiacs get the best of ${him} and tries to find release and fails as the citizens passing by throw insults and disgusted looks on ${his} direction for failing in trying to please the goddess. As a result, ${he} is immobilized and blindfolded in an attempt to reduce external stimulation. By the end of the week ${he} cannot stand up and remains on the bottom of the cage, saving ${his} strength to procure making the procedures as humiliating as possible with the little strength ${he} has saved.`);
			} else if (sacrifice.fetish === "buttslut") {
				r.push(`At first, is common to see ${him} trying to resist the heavy dose of aphrodisiacs in ${his} body as ${he} cannot find a way to release. As the week progresses, ${he} is constantly crying and whining as ${he} is unable find a way to stimulate ${his} ass when the aphrodisiacs become too much for ${him}. As the week progresses and ${his} strength lingers ${he} tries to find ways to increase stimulation on ${his} ass. ${He} tries to keep ${his} butt as close as possible to the cage's bars, rubbing on them to increase any stimulation on ${his} buttocks or focus on the feel of the sort fabric that covers ${him} as it moves when ${he} readjust ${himself}. ${He} seems particularly angry every time ${his} attempts are put to an end just to burst into tears ashamed of ${his} actions. By the end of the week ${he} remains immobile on the center of ${his} cage and the fabric readjusted to procure as little extra stimulation as possible. ${He} insists on sitting down and rubbing ${his} behind against the floor and is forced to stand up. By the end of the week the lack of food, sexual release and sleep seems to be wearing ${his} will off as ${he} takes longer being able to stand up every time and ${he} remains on the bottom of the cage forced to lay on ${his} chest as immobile as ${he} can, interrupted only by the occasional twitch and the need to drink.`);
			} else if (sacrifice.fetish === "boobs") {
				r.push(`At first, ${he} tries to distract ${himself} from the constant stimulation the necklace over ${his} chest seems to be producing. ${He} can be seen constantly fighting the urge to touch ${his} breasts every time the aphrodisiacs are injected into to ${his} body. As the week progresses ${his} resolutions seem to vanish and ${he} needs to be stopped from touching ${his} breast on several occasions or is constantly caught and forcefully stopped trying to moving ${his} chest to make the necklace rub ${his} breasts. Later on, the necklace is replaced by a breastplate equally colorful and adorned but extremely tight making ${his} breast flatter and unable to move. ${He} soon realizes not only that ${he} can no longer stimulate ${his} breast with it on but that now ${his} breasts are completely hidden from view. As a result, ${he} can be seen constantly crying and trying to rip the breastplate apart to no avail. ${He} is constantly awake during the times ${he} is supposed to be sleeping as ${he} tries to touch ${his} breast but can't seem to find them hidden under the breastplate. At the end of the week ${he} remains on the bottom of ${his} cage unable to move as the lack of food, sleep and sexual release takes a toll on ${his} body, the breastplate is without feathers or other delicate adornments but still in a perfect position.`);
			} else {
				r.push(`At first, ${he} tries to fulfill ${his} sacrifice the best ${he} can by trying to maintain ${himself} pure for the goddess. ${He} submits to every instruction and tries to hold off as much as ${his} body allows ${him}, drinking as little as ${he} can and sleeping only when ${he} is told. Soon the aphrodisiacs make ${his} resolutions useless as ${he} tries to touch ${himself} to find release. It doesn't take ${him} long to discover how efficient the chastity belt is. ${He} cries and tries as much as ${he} can but ${he} is unable to experience any kind of pleasure. As time goes by ${he} seems to shift ${his} efforts from fighting to removing the chastity belt from ${himself} with no avail. ${His} body twitches and shakes frequently as the aphrodisiacs hit ${him} harder every time ${his} dose is renewed. Later on, ${he} tries to please any part of ${his} body which ${he} is able to touch and needs to be restrained. Hunger and sleep deprivation take a toll on ${his} body also ${he} tries to drink as much as possible to fool the hunger ${he} feels. The tea is rationed to be given only when required and ${his} sleep is carefully monitored. By the end of the week ${he} remains on the bottom of ${his} cage trying to save what little energy ${he} has left, only to be interrupted as ${his} body spasms brought about by the aphrodisiacs in ${his} body followed by a soft moan.`);
			}
		} else if (sacrifice.sexualFlaw !== "none") {
			if (sacrifice.sexualFlaw === "hates oral") {
				r.push(`${He} focuses on fulfilling ${his} duty to keeping ${himself} pure for the goddess while fighting the urge to touch ${himself}. ${He} seems to think the worst part of ${his} penance is over as ${he} is no longer going to be raped in the mouth like ${he} was last night. Soon ${he} discovers that is far the truth when ${his} first dose of the tea doesn't come in a tea cup. As a means of keeping ${his} penance in accordance to the suffering the goddess demands the tea will be administered through a similar device used in dairies. A feeding phallus is quickly installed into a side of the cage. If ${he} wants to avoid dehydration ${he} will have to suck it off and only after ${he} does it right is the tea provided. When ${he} realizes what is in store for ${him}, ${he} begins to cry. ${He} tries to drink only when strictly necessary. However, as the week progresses, ${he} starts to faint more frequently as ${his} body receives only the minimum amount of liquids necessary. As a result, ${he} is restrained and the feeding phalli is pressed into ${his} mouth and down ${his} throat to facefuck ${him}. ${He} gags and struggles, tears running down ${his} face as ${he} tries to figure out how to breathe while being facefucked. Only after ${he} manages to control ${himself} is the transparent reservoir of tea injected. ${He} swallows desperately. As per your instructions ${his} feedings are synced with ${his} dose of aphrodisiacs which confuses ${him} to no end and adds to ${his} penance. This procedure occurs several times a day. By the end of the week ${he} can hardly stand up as the lack of food and sleep keeps ${him} weak. ${He} remains on the bottom of the cage only interrupted by ${his} feedings and the body spasms ${he} suffers as a result of the constant arousal.`);
			} else if (sacrifice.sexualFlaw === "shamefast") {
				r.push(`At first, ${he} tries to fulfill ${his} duty to keeping ${himself} pure to the goddess, distracting ${himself} by trying to cover however ${he} can ${his} almost naked body. As a way to keep ${his} penance according to the suffering the goddess demands a big screen set next to ${his} cage. After a few hours, the screen turns on and a live image of ${him} on the cage appears. The screen then shifts to a low shot of ${his} tight dripping wet product of ${his} arousal, showing different stats related to it. After a few minutes, the screens changes to previously recorded footage of ${his} naked body glistening while laying comfortably on the temazcal. After a minute, it shifts again to a close shot of ${his} ass being carefully painted with blue, the camera following the movement of the brush as it moves over ${his} ass cheek and shifts again to a very close shot of ${him} being fucked the night before. The video changes over and over again showing scenes of previously recorded footage of ${his} preparation for ${his} penance, every one carefully picked to give a good look of ${his} body or revealing live shots of ${his} body picked to show where ${his} sexual arousal is more evident. The first time ${he} sees them ${he} burst into tears, begging the screens to be turned off just to see ${his} image begging and crying a few hours later. As the week goes new clips are added showing the best scenes the camera was able to capture while on the cage. Due to ${his} resistance to show ${his} body for the cameras and the citizens passing by ${he} is immobilized to be kept standing, ${his} body conveniently positioned to get the best shots. ${He} tries to ignore the whole situation trying to focus on resisting the signs of ${his} hunger, exhaustion and arousal ${he} constantly feels. By the end of the week as ${he} remains sitting immobilize on a stool to procure a good shot a small screen is set in front of ${him}, the image divided in two, one half showing what the big screen projects and the other the audience and ${his} reactions.`);
			} else if (sacrifice.sexualFlaw === "repressed") {
				r.push(`Although ${he} thinks ${his} clothes are degrading, ${he} seems happy to fulfill ${his} duty keeping ${himself} pure to the goddess and fighting the urge to touch ${himself}. At first, ${he} seems confident ${he} can manage the heavy dose of aphrodisiacs that run through ${his} body and tries to give no indication of the constant arousal ${he} suffers. An occasional shake or moan escapes ${his} lips for what ${he} seems to be deeply ashamed. As the week goes by and ${his} resistance reduces ${his} body betrays ${him} every time more often. ${He} shakes, moans and shivers with the littlest provocation, which horrify ${him} to no end. Little does ${he} know that ${his} dose of aphrodisiacs is being increased every time ${he} is injected and that they are more effective now that the lack of sleep takes a toll on ${his} body. ${He} hates ${himself} for being unable to control the shameful things ${his} body demands and burst into tears when ${his} pelvis thrusts the minute the fringes are moved by the wind and caresses ${his} body or the necklace rubs on ${his} nipples. By the end of the week ${he} cannot handle it and tries to touch ${himself} when ${he} thinks no one is watching ${him} only to be caught right after. The shame is so big ${he} breaks out on tears. ${He} spends the rest of ${his} time left in penance on the bottom of the cage sobbing as ${his} body keeps as much of the energy it can only interrupted by the moans ${he} can no longer control and the shivers to run through ${his} body when the aphrodisiacs overwhelmed ${him}.`);
			} else if (sacrifice.sexualFlaw === "attention whore") {
				r.push(`${He} seems to enjoy all the attention ${he} receives every time ${he} tries to fight the impulse to touch ${himself} as ${his} body shows clear signs of arousal and takes special care in showing ${his} body to the audience. ${He} rejoices with the reactions of the citizens as they gasp and point while ${he} shakes and moans. The first time the tea is offered to ${him} ${he} refuses it hoping to get a reaction of ${his} crowd. As a way to keep ${his} penance according to the suffering the goddess demands after the first night is over ${he} is informed that due to ${his} good behavior ${he} has been granted the chance to finish ${his} penance in private. ${He} cries and begs to be left where ${he} is. ${He} is blindfolded and taken to a minuscule room nearby while cries and begs. Once inside ${he} is left to ${himself}, ${his} only contact with another person is the slave appointed to ${his} care who enters to administer the aphrodisiacs when required, when ${his} ration of tea is left on the room or when ${he} falls sleep and is required to be awake. Little does ${he} know the room is filled with hidden cameras which are connected to a big screen installed where ${his} cage was as the penance must be public. As the week goes by ${he} is left to deal with the hunger, the lack of sleep and the constant need to release. By the end of the week ${he} cannot stand up and remains on the bottom of the room, saving ${his} strength and sobbing.`);
			} else if (sacrifice.sexualFlaw === "self hating") {
				r.push(`As week starts ${he} tries to fulfill ${his} duty, fighting the urge to touch ${himself} and drinking just when ${he} needs to, hoping that by following the rules the penance of such unworthy slave will be enough to please the goddess. As the week progresses ${his} resolution reduces. ${He} soon discovers how efficient a chastity belt could be when, once completely overpowered by ${his} need of release ${he} tries to touch ${himself}, fearing the wrath of the goddess for ${his} lack of strength. ${His} body shakes and twitches every time more often as the aphrodisiacs run through ${his} body, blaming ${himself} for not being able to keep control. ${His} pelvis thrusts every time the airs provides extra stimulation product the sexual frustration and tries to stop it by banging ${his} head against the cage. ${He} soon needs to be immobilized to avoid damage. As ${he} lays on the cage ${he} blames ${himself} for ${his} inability to fulfill ${his} task. The lack of food has a toll on ${him} too, as ${he} often refuses to drink thinking the dehydration is well deserved. As a result of this, it is forced to drink several times a day which seems to infuriate ${him}. By the end of the week ${he} can hardly stand up as the lack of food and sleep keeps ${him} weak. ${He} remains on the bottom of the cage being fed by another slave when it is clear ${he} that needs more liquid in ${his} body and ${his} hours of sleep are over.`);
			} else {
				r.push(`At first, ${he} tries to fulfill ${his} sacrifice the best ${he} can, trying to maintain ${himself} pure for the goddess. ${He} submits to every instruction trying to hold as much as ${his} body allows ${him}, drinking as little as ${he} can and sleeping only when ${he} is told. Soon the aphrodisiacs make ${his} resolutions dilute as ${he} tries to touch ${himself} to find release. It does not take ${him} long to prove how efficient ${his} chastity belt is. ${He} cries and tries as much as ${he} can but ${he} is unable to cause any kind of pleasure. As time goes by ${he} seems to shift ${his} efforts on fighting to remove the chastity belt from ${himself} with no avail. ${His} body twitches and shakes every time more often as the aphrodisiacs hit ${him} harder every time ${his} dose is renewed. Later on, ${he} tries to please any part of ${his} body which is free to touch and needs to be restrained. Hunger and deprivation of sleep take a toll on ${his} body too and tries to drink as much as possible to fool the hunger ${he} feels. The tea is rationed to be given only when need it and the sleep carefully monitored. By the end of the week ${he} remains on the bottom of ${his} cage trying to the little energy ${he} has, only interrupted by the body spasms caused by the aphrodisiacs in ${his} body followed by a soft moan.`);
			}
		} else {
			r.push(`At first, ${he} tries to fulfill ${his} sacrifice the best ${he} can, trying to keep ${himself} pure for the goddess. ${He} submits to every instruction trying to hold as much as ${his} body allows ${him}, drinking as little as ${he} can and sleeping only when ${he} is told. Soon the aphrodisiacs make ${his} resolutions dilute as ${he} tries to touch ${himself} to find release. It does not take ${him} long to prove just how effective ${his} chastity belt is. ${He} cries and tries as much as ${he} can but ${he} is unable to cause any kind of pleasure. As time goes by ${he} seems to shift ${his} efforts on fighting to remove the chastity belt to no avail. ${His} body twitches and shakes more and more often as the aphrodisiacs hit ${him} harder each time ${his} dose is renewed. Later on, ${he} tries to please any part of ${his} body that ${he} is able to, and so needs to be restrained. Hunger and sleep deprivation take a toll on ${his} body, and ${he} tries to drink as much as possible to fool the hunger. The tea is rationed to be given only when need it and the sleep carefully monitored. By the end of the week ${he} remains on the bottom of ${his} cage trying to conserve the little energy ${he} has, interrupted only by the spasms caused by the aphrodisiacs in ${his} body, followed by a soft moan.`);
		}
	} else if (sacrifice.trust < -20) {
		if (sacrifice.sexualFlaw === "hates oral") {
			r.push(`${He} immediately focuses on ${his} need of release, since ${he} thinks the worst part of ${his} penance is over as ${his} mouth is no longer going to be raped like it was last night. Soon ${he} discovers that this is far from the truth when it is time for ${his} first dose of the tea. As a means to keep ${his} penance according to the suffering the goddess demands, the tea it to be administered through a similar device as is used in dairies. A feeding phallus is installed on a side of the cage, and if ${he} wants to avoid dehydration, ${he} will have to suck it off. When ${he} realizes what lies in store for ${him} ${he} begins to cry and refuses to drink at all. As the week progresses ${he} begins to faint more and more often as ${he} vehemently refuses to work for ${his} drink. As a result, ${he} is restrained and the feeding phallus is shoved into ${his} mouth and down ${his} throat. ${He} gags and struggles, tears running down ${his} face as ${he} tries and fails to scream. After several minutes, ${he} stops panicking and finally starts to inhale and exhale regularly. Only after this the transparent reservoir of tea is injected. ${He} chokes on it but swallows desperately. As per your instructions ${his} feedings are synched with ${his} dose of aphrodisiacs which confuses ${him} to no end and adds to ${his} penance. The procedure goes on during the rest of the week several times a day. By the end of the week ${he} can hardly stand up as the lack of food and sleep keeps ${him} weak. ${He} remains on the bottom of the cage, only interrupted by ${his} feedings and the spasms ${he} suffers as a result of the constant arousal.`);
		} else if (sacrifice.sexualFlaw === "shamefast") {
			r.push(`At first, ${he} tries to relieve ${himself} while ${he} tries to hide ${his} body. As a way to keep ${his} penance according to the suffering the goddess demands a big screen is set next to ${his} cage. After a few hours, the screen turns on and a live image of ${him} on the cage appears. The screen then shifts to a low shot of ${his} tight pussy dripping with the wet product of ${his} arousal, showing different stats related to it. After a few minutes, the screens changes to previously recorded footage of ${his} naked body glistening while laying comfortably on the temazcal. After a minute, it shifts again to a close-up shot of ${his} ass being carefully painted with blue, the camera following the movement of the brush as it moves over ${his} ass cheek then shifts again to a very close shot of ${him} being fucked the night before. The video changes over and over again showing scenes of previously recorded footage preparation for ${his} penance, every one carefully picked to give a good view of ${his} body or revealing live shots of ${his} body picked to show where ${his} sexual arousal is more evident. The first time ${he} sees them ${he} burst into tears. As the week goes new clips are added showing the best scenes of ${him} that the camera was able to capture while the aphrodisiacs forced ${him} to masturbate without success. Due ${his} resistance to show ${his} body for the cameras and the citizens passing by, ${he} is immobilized into standing, ${his} body conveniently positioned to get the best shots. ${He} tries to ignore the whole situation by trying to focus on ignoring the screen. As a result, a small screen is set in front of ${him}, the image divided in two, one half showing the big screen's projection and the other reactions of all parties. By the end of the week ${he} remains sitting immobilized on a stool to produce a good shivering shot.`);
		} else if (sacrifice.sexualFlaw === "repressed") {
			r.push(`Although ${he} thinks ${his} clothes are degrading, ${he} seems content to fulfill ${his} duty to keeping ${himself} pure to the goddess and fights the urge to touch ${himself}. At first, ${he} manages to control the heavy dose of aphrodisiacs that run through ${his} body and tries to give no indication of the constant arousal ${he} suffers. An occasional shake or moan escapes ${his} lips for which ${he} seems to be deeply ashamed. As the week goes by and ${his} resistance reduces ${his} body does betray ${him} most of the time. ${He} shakes, moans and shivers at the littlest provocation, which horrifies ${him} to no end. Little does ${he} know that ${his} dosage of aphrodisiacs has being increased every time ${he} is injected and are more effective now that the lack of sleep takes a toll on ${his} body. ${He} hates ${himself} for being unable to control the shameful things ${his} body demands and bursts into tears when ${his} pelvis thrusts the minute the fringes are moved by the wind and caresses ${his} body or the necklace rubs on ${his} nipples. By the end of the week ${he} cannot handle it and tries to touch ${himself} when the arousal becomes too much, which is often. ${He} seems ashamed of ${his} actions and often ${he} breaks out in tears as ${he} tries to masturbate. ${He} remains ${his} time left on penance in the bottom of the cage sobbing as ${his} body keeps as much of the energy it can only interrupted by the moans ${he} can no longer control and the shivers to run through ${his} body when the aphrodisiacs overwhelmed ${him}.`);
		} else if (sacrifice.sexualFlaw === "attention whore") {
			r.push(`${He} seems to enjoy all the attention ${he} receives every time ${he} tries to find release as the citizens passing by scream at ${him} for ${his} lack of faith and takes special care in showing ${his} body to the audience. ${He} rejoices with the reactions of the citizens as they gasp and point while ${he} shakes and moans. The first time the tea is offered to ${him} ${he} refuses it hoping to get a reaction out of the crowd. As a way to keep ${his} penance in accordance to the suffering the goddess demands, after the first night is over ${he} is informed that due to ${his} good behavior ${he} has been granted the chance to finish ${his} penance in private. ${He} curses and swears, fighting with all of ${his} strength to be left where ${he} is. ${He} is taken out by forced and pinned to the floor to be immobilized. ${He} is blindfolded and taken to a minuscule room nearby while ${he} cries and tries to resist. Once inside ${he} is left to ${himself}, ${his} only contact with another person is the slave appointed to ${his} care who enters to administer the aphrodisiacs when required, when ${his} ration of tea is left on the room or when ${he} falls sleep and is required to be awake. Little does ${he} know the room is filled with hidden cameras which are connected to a big screen installed where ${his} cage was as the penance must be public. As the week goes by ${he} is left to deal with the hunger, the lack of sleep and the constant need for release which ${he} can no longer control. By the end of the week ${he} cannot stand up and remains on the bottom of the room, saving ${his} strength and sobbing.`);
		} else if (sacrifice.sexualFlaw === "self hating") {
			r.push(`As week starts ${he} tries to fulfill ${his} duty, fighting the urge to touch ${himself} and drinking just when ${he} needs to, hoping that by following the rules the penance of such an unworthy slave will be enough to please the goddess. As the week progresses ${his} resolution reduces. ${He} soon discovers how efficient a chastity belt could be when, once completely overpowered by ${his} need of release ${he} tried to touch ${himself} fearing the wrath of the goddess for ${his} lack of strength. ${His} body shakes and twitches more frequently as the aphrodisiacs run through ${his} body. ${He} blames ${himself} for not being able to keep ${himself} in control. ${His} pelvis thrusts every time the airs provides extra stimulation that produces sexual frustration and tries to stop it by banging ${his} head against the cage's bars. ${He} soon needs to be immobilized to avoid damage. As ${he} lies down on the cage's floor ${he} blames ${himself} and hating ${his} inability to fulfill ${his} task. The lack of food has taken a toll on ${him} too as ${he} often refuses to drink thinking the dehydration is well deserved. As a result, ${he} is forced to drink several times a day which seems to infuriate ${him}. By the end of the week ${he} can hardly stand up as the lack of food and sleep keeps ${him} weak. ${He} remains on the bottom of the cage fed by another slave when it is clear that ${he} needs more liquids in ${his} body and ${his} hours of sleep are over.`);
		} else {
			r.push(`As ${he} starts to feel the effect of the aphrodisiacs on ${his} body a soft moan leaves ${his} mouth. Soon ${his}`);
			if (hasBothLegs(sacrifice)) {
				r.push(`legs`);
			} else if (!hasAnyLegs(sacrifice)) {
				r.push(`stumps`);
			} else {
				r.push(`leg and stump`);
			}
			r.push(`are shaking and ${his} body is sweating. ${He} tries to reach down there to relieve ${himself} but ${he} cannot do so. ${He} tries to find a way to reach`);
			if (sacrifice.dick !== 0) {
				r.push(`${his} dick or ${his} asshole`);
			} else {
				r.push(`any hole`);
			}
			r.push(`only to discover how efficient a chastity belt could be. ${He} tries to reach harder, desperately trying to find any kind of release but ${he} is unable. Soon all of ${his} efforts seem focus on removing the chastity belt to no avail. After a few hours, ${he} has finally given up and remains holding the bars of ${his} cage, crying in despair, thrusting over and over again while desperately moaning. ${He} begs for release to anyone who passes by and bursts into tears when ${he} is blatantly ignored. ${He} refuses to drink as ${his} need to cum is stronger. As the week goes by ${his} hunger increases and tries to drink as much of the tea ${he} is provided to try to fool ${his} stomach. As a result of this, the tea is only given to ${him} when it is strictly necessary which seems to infuriate ${him}. By the end of the week ${he} can hardly stand up as the lack of food and sleep keeps ${him} weak. ${He} remains on the bottom of the cage fed by another slave when it is clear that ${he} needs more liquids in ${his} body and ${his} hours of sleep are over.`);
		}
	}

	r.push(`Once the time for penance is over, ${he} is carried out of the cage, as ${he} is too weak to support ${his} own weight. After a short ceremony, ${he} is taken back to the penthouse to rest.`);
	if (sacrifice.lactation > 1) {
		r.push(`${His} breasts are grotesquely bloated, super sensitive and leaking milk from a week of neglected hyper-lactation.`);
		sacrifice.boobsMilk += 50*sacrifice.lactationAdaptation;
		sacrifice.boobs += sacrifice.boobsMilk;
	} else if (sacrifice.lactation > 0) {
		r.push(`${His} breasts are hugely swollen from a week of pent up lactation.`);
		sacrifice.boobsMilk += 10*sacrifice.lactationAdaptation;
		sacrifice.boobs += sacrifice.boobsMilk;
	}
	healthDamage(sacrifice, 20);
	r.push(`The penance put ${his} body through great stress <span class="health dec">which impacted ${his} health.</span>`);
	sacrifice.addict = 5;
	sacrifice.clothes = "no clothing";

	if (sacrifice.devotion > 50) {
		if (sacrifice.fetishKnown === 1 && sacrifice.fetishStrength > 60 && sacrifice.fetish !== Fetish.NONE) {
			if (fetishChangeChance(sacrifice) > random(0, 100)) {
				sacrifice.fetishStrength = 10;
				sacrifice.fetishKnown = 1;
				sacrifice.fetish = "masochist";
				sacrifice.devotion += 4;
				sacrifice.trust += 4;
				r.push(`${His} successful penance made ${him} <span class="trust inc">trust</span> and <span class="devotion inc">love</span> you more as ${he} has proved both to you and the goddess how good of a slave ${he} is.`);
			} else if (sacrifice.fetish === "masochist") {
				sacrifice.devotion += 6;
				sacrifice.trust += 6;
				r.push(`The constant pain you submitted ${him} to during ${his} penance made ${him} <span class="trust inc">trust</span> and <span class="devotion inc">love</span> you more.`);
				sacrifice.fetishStrength += 4;
			} else if (sacrifice.fetish === "cumslut") {
				sacrifice.fetishStrength -= 2;
			} else if (sacrifice.fetish === "humiliation") {
				sacrifice.devotion += 6;
				sacrifice.trust += 6;
				r.push(`The constant humiliation during ${his} penance made ${him} <span class="trust inc">trust</span> and <span class="devotion inc">love</span> you more as ${he} has proved both to you and the goddess how good of a slave ${he} is.`);
				sacrifice.fetishStrength += 3;
			} else if (sacrifice.fetish === "buttslut") {
				sacrifice.fetishStrength -= 2;
			} else if (sacrifice.fetish === "boobs") {
				sacrifice.fetishStrength -= 2;
			}
		} else {
			sacrifice.devotion += 5;
			sacrifice.trust += 5;
			r.push(`${He} now understands the importance of ${his} role as a pennant slave, ${his} commitment to you and the goddess makes ${him} <span class="trust inc">trust</span> and <span class="devotion inc">love</span> you more.`);
		}
	} else if (sacrifice.devotion > 20 || (sacrifice.devotion >= -20 && sacrifice.trust < -20 && sacrifice.trust >= -50)) {
		if (sacrifice.fetishKnown === 1 && sacrifice.fetishStrength > 60 && sacrifice.fetishStrength > 60 && sacrifice.fetish !== Fetish.NONE) {
			if (fetishChangeChance(sacrifice) > random(0, 100)) {
				sacrifice.fetishKnown = 1;
				sacrifice.fetish = "masochist";
			}
			if (sacrifice.fetish === Fetish.SUBMISSIVE) {
				sacrifice.devotion += 3;
				sacrifice.trust += 3;
				r.push(`The constant submission ${he} was subjected under your orders made ${him} <span class="trust inc">trust</span> and <span class="devotion inc">love you more.</span>`);
				sacrifice.fetishStrength += 6;
			} else if (sacrifice.fetish === "masochist") {
				sacrifice.devotion += 3;
				sacrifice.trust += 3;
				r.push(`The constant abuse ${he} was subjected under your orders made ${him} <span class="trust inc">trust</span> and <span class="devotion inc">love you more.</span>`);
			} else if (sacrifice.fetish === "cumslut") {
				sacrifice.fetishStrength -= 2;
			} else if (sacrifice.fetish === "humiliation") {
				sacrifice.devotion += 3;
				sacrifice.trust += 3;
				r.push(`The constant humiliation ${he} was subjected under your orders made ${him} <span class="trust inc">trust</span> and <span class="devotion inc">love you more.</span>`);
				sacrifice.fetishStrength += 6;
			} else if (sacrifice.fetish === "buttslut") {
				sacrifice.fetishStrength -= 2;
			} else if (sacrifice.fetish === "boobs") {
				sacrifice.fetishStrength -= 2;
			}
		} else {
			r.push(`${He} now understands the importance of ${his} role as a pennant slave, ${his} commitment to you and the goddess. ${He} neither trusts nor loves you more any more or less.`);
		}
		if (sacrifice.sexualFlaw === "hates oral") {
			sacrifice.devotion -= 5;
			sacrifice.trust -= 5;
			r.push(`The constant abuse to ${his} mouth for ${his} feedings and the pain you subject ${him} to makes ${him} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more.</span>`);
			sacrifice.fetishStrength -= 5;
		} else if (sacrifice.sexualFlaw === "hates anal") {
			sacrifice.devotion -= 5;
			sacrifice.trust -= 5;
			r.push(`${His} constant need of release without the chance to stimulate ${his} ass and the pain you subject ${him} to made ${him} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more.</span>`);
			sacrifice.fetishStrength -= 2;
		} else if (sacrifice.sexualFlaw === "shamefast") {
			sacrifice.devotion -= 5;
			sacrifice.trust -= 5;
			r.push(`The constant exposure of ${his} naked body through the bars to anyone willing to see ${him} and the pain you subjected ${him} to made ${him} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more.</span>`);
			sacrifice.fetishStrength -= 4;
		} else if (sacrifice.sexualFlaw === "self hating") {
			sacrifice.devotion -= 5;
			sacrifice.trust -= 5;
			r.push(`The constant deprivation of food, sleep and sexual release made ${him} hate ${himself} more. As a result ${he} <span class="trust dec">trusts you less</span> and <span class="devotion dec">hates you more.</span>`);
			sacrifice.fetishStrength += 7;
		} else if (sacrifice.sexualFlaw === "repressed") {
			sacrifice.fetishStrength -= 2;
			// r.push(`The constant shame ${he} was subjected in such a public way made ${him} <span class="devotion dec">trust you less</span> and <span class="devotion inc">hate you more.</span>`); TODO: FIXME
		} else {
			sacrifice.devotion -= 5;
			sacrifice.trust -= 5;
			r.push(`The lack of food, sleep and the constant arousal with the chastity belt made ${him} <span class="trust dec">trust you less</span> and <span class="devotion inc">hate you more.</span>`);
		}
	} else if (sacrifice.trust < -20) {
		if (sacrifice.fetish !== Fetish.NONE) {
			if (fetishChangeChance(sacrifice) > random(0, 100)) {
				sacrifice.fetishStrength = 10;
				sacrifice.fetishKnown = 1;
				sacrifice.fetish = "masochist";
			}
		}
	}
	if (sacrifice.sexualFlaw === "hates oral") {
		sacrifice.devotion -= 7;
		sacrifice.trust -= 7;
		r.push(`The constant abuse of ${his} mouth for feedings and the pain you subjected ${him} to made ${him} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more.</span>`);
		sacrifice.fetishStrength -= 6;
	} else if (sacrifice.sexualFlaw === "shamefast") {
		sacrifice.devotion -= 7;
		sacrifice.trust -= 7;
		r.push(`The constant exposure of ${his} naked body through the bars to anyone willing to see ${him} and the pain you subjected ${him} to makes ${him} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more.</span>`);
		sacrifice.fetishStrength -= 5;
	} else if (sacrifice.sexualFlaw === "repressed") {
		sacrifice.devotion -= 7;
		sacrifice.trust -= 7;
		r.push(`The constant shame ${he} was subjected in such a public way makes ${him} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more.</span>`);
	} else if (sacrifice.sexualFlaw === "attention whore") {
		sacrifice.devotion -= 7;
		sacrifice.trust -= 7;
		r.push(`${He} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more</span> for spoiling ${his} chance for attention and depriving ${him} of ${his} audience.`);
		sacrifice.fetishStrength += 2;
	} else if (sacrifice.sexualFlaw === "self hating") {
		sacrifice.devotion -= 7;
		sacrifice.trust -= 7;
		r.push(`The constant deprivation of food, sleep and sexual release made ${him} hate ${himself} more. As a result ${he} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more.</span>`);
		sacrifice.fetishStrength += 5;
	} else {
		sacrifice.devotion -= 3;
		sacrifice.trust -= 3;
		r.push(`The lack of food, sleep and the constant arousal with the chastity belt made ${him} <span class="trust dec">trust you less</span> and <span class="devotion dec">hate you more.</span>`);
	}
	if (FutureSocieties.isActive('FSAztecRevivalist') && V.arcologies[0].FSAztecRevivalist < 100) {
		V.arcologies[0].FSAztecRevivalist += 1;
	}
	V.slavesSacrificedThisWeek = (V.slavesSacrificedThisWeek || 0) + 1;

	App.Events.addParagraph(frag, r);
	return frag;
};
