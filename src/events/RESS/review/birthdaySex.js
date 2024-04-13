App.Events.RESSBirthdaySex = class RESSBirthdaySex extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [[
			s => s.fetish !== Fetish.MINDBROKEN,
			s => s.devotion > 50,
			s => s.trust > 50,
			s => s.birthWeek >= 51,
			s => canWalk(s),
			s => canTalk(s),
			s => hasAnyArms(s),
		]];
	}

	get weight() {
		return 8;
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, His,
			he, his, him, girl,
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const isVaginalVirgin = canDoVaginal(eventSlave) && eventSlave.vagina === 0;
		const isAnalVirgin = !isVaginalVirgin && eventSlave.anus === 0;
		const isVirgin = isVaginalVirgin || isAnalVirgin;
		const specialGift = isPlayerReceptive(eventSlave) && (canPenetrate(eventSlave) || eventSlave.clit >= 3);
		const playerAVirgin = V.PC.anus === 0;
		const playerVVirgin = V.PC.vagina === 0 && canDoVaginal(V.PC) && !playerAVirgin;
		const playerVirgin = playerVVirgin || playerAVirgin;

		App.Events.drawEventArt(node, eventSlave);

		App.Events.addParagraph(node, [
			`Your assistant interrupts your work one afternoon to inform you that`,
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`has arrived to make an unscheduled visit. You can tell ${he}'s nervous${eventSlave.rules.speech === "restrictive" ? ` so you give ${him} permission to speak,` : ","} and after a few false starts, ${he} finally musters up the courage to ask what ${he} came to ask.`,
		]);

		App.Events.addParagraph(node, [
			Spoken(eventSlave, `"${capFirstChar(Master)},"`),
			`${he} says.`,
			Spoken(eventSlave, `"Today is my birthday."`),
			`A quick glance down at your desk confirms that it is, indeed, ${his} birthday.`,
			Spoken(eventSlave, `"It's tradition to give gifts to people celebrating their birthdays in the old world,"`),
			`${he} continues,`,
			Spoken(eventSlave, `"but gifts and cash are useless to us slaves. Would you please help me celebrate my birthday and ${isVirgin ? `pop my ${isAnalVirgin ? `anal` : ``} cherry` : `fuck me`}?"`),
		]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Oblige`, oblige, isVirgin ? `This option will take ${his} ${isVaginalVirgin ? `` : `anal`} virginity` : null),
			specialGift
				? new App.Events.Result(`Offer ${him} your ${V.PC.anus === 0 ? "virgin sphincter" : V.PC.vagina === 0 ? "cherry" : "backdoor"} instead`, fuckMe, PCPenetrationWarning((V.PC.vagina === 0 ? "vaginal" : "anal")))
				: new App.Events.Result(),
			new App.Events.Result(`Put ${him} in ${his} place`, rape, isVirgin ? `This option will take ${his} ${isVaginalVirgin ? `` : `anal`} virginity` : null),
			new App.Events.Result(`You have better things to do`, no),
		]);

		function oblige() {
			const frag = new DocumentFragment();
			const r = [];
			r.push(
				`The work you were previously doing isn't particularly pressing, and one of your slave${girl}s throwing themselves at you begging for sex is as good a distraction as any. You stand up and extend a hand, then lead ${him} to your bedchambers. After a fair bit of foreplay focused primarily on ${him} (this is your gift, after all), you lay ${him} on ${his} back${(!canDoVaginal || isAnalVirgin) && eventSlave.chastityAnus ? `, remove ${his} anal chastity shield,` : ""} and slowly push your ${canPenetrate(V.PC) ? "cockhead" : penetrationTool(V.PC)} into ${his} ${isVirgin ? `unbelievably tight ` : ``}${canDoVaginal(eventSlave) && (isVaginalVirgin || !isAnalVirgin) ? `pussy` : `asshole`}. Slowly at first and gradually increasing in speed, you begin to fuck ${him}, managing to bring ${him} to climax with the help of some ${canDoVaginal(eventSlave) ? `clitoral` : `manual`} stimulation with one hand. After you ${canPenetrate(V.PC)  ? `blow your own load inside ${him}` : "have yor own orgasm"} and pull out, ${he} impulsively throws ${his} arms around your neck and pulls ${him}self in to plant a deep kiss on your lips.`,
				Spoken(eventSlave, `<span class="devotion inc">"I love you, ${Master},"</span>`), `${he} says in a hushed tone.`,
				!canDoVaginal(eventSlave) || isAnalVirgin ? VCheck.Anal(eventSlave) : VCheck.Vaginal(eventSlave),
			);

			seX(eventSlave, !canDoVaginal(eventSlave) || isAnalVirgin ? "anal" : "vaginal", V.PC);
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 1, !canDoVaginal(eventSlave) || isAnalVirgin ? 1 : 0, -1);
			}
			eventSlave.devotion += 10;

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function rape() {
			const frag = new DocumentFragment();
			const r = [];
			r.push(
				`You had been working on a particularly stressful assignment when ${he} interrupted you, and you need to blow off some steam. You grab ${him} hand and pull ${him} into your bedchambers before ${he} has time to reconsider, throwing ${him} roughly onto the bed and pulling off your clothes in a matter of seconds. ${He} follows suit, but realizes what you have in mind when you grab ${him} by the waist${(!canDoVaginal || isAnalVirgin) && eventSlave.chastityAnus ? `, remove ${his} anal chastity shield,` : ""}  and thrust the entire length of your ${penetrationTool(V.PC)} into ${his} ${canDoVaginal(eventSlave) && (isVaginalVirgin || !isAnalVirgin) ? `cunt` : `asshole`} in one fluid motion. ${He} begins to beg you to slow down and be gentler, but you only speed up in response. After a few minutes of rough pounding from you and weeping from ${him}, you feel your orgasm approaching and bury yourself as deep inside ${him} as you can as it arrives. ${He} doesn't move when you finally pull yourself off of ${him}, opting instead to <span class="trust dec">lie there and cry.</span>`,
			);

			if (isVirgin) {
				r.push(`Though your brutal fucking may not have left any permanent physical damage, <span class="lime">breaking in ${his} ${isVaginalVirgin ? `pussy` : `ass`}</span> in this manner definitely gave ${him} a glimpse of just <span class="devotion dec">what you're capable of.</span>`);
			}

			if (canDoVaginal(eventSlave) && !isAnalVirgin) {
				VCheck.Vaginal(eventSlave);
			} else {
				VCheck.Anal(eventSlave);
			}

			seX(eventSlave, !canDoVaginal(eventSlave) || isAnalVirgin ? "anal" : "vaginal", V.PC);
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 1, !canDoVaginal(eventSlave) || isAnalVirgin ? 1 : 0, -1);
			}
			eventSlave.trust -= 10;
			if (isVirgin) {
				eventSlave.devotion -= 10;
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function no() {
			const frag = new DocumentFragment();
			const r = [];
			const amount = random(2, 7) * 1000;
			r.push(`You say nothing, returning instead to your work. After a silent minute of ${him} standing there, looking uncomfortable, ${he} finally takes the hint. ${He} mutters a quick apology and returns to what ${he} doing before ${he} interrupted you. <span class="cash inc">You manage to close the deal that you had been working on,</span> a twinge of satisfaction in your chest as you`);
			if (V.PC.refreshmentType === 0) {
				r.push(`take another drag from your ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`take a swig of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`do another line of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`inject a little more ${V.PC.refreshment}.`);
			} else {
				r.push(`pop another ${V.PC.refreshment} into your mouth.`);
			}

			cashX(amount, "event");

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function fuckMe() {
			const frag = new DocumentFragment();
			let r = [];
			let intruder = eventSlave.clit > 2 ? "clit" : "cock";
			let theHole = playerVVirgin ? "cunt" : "butthole";
			r.push(`The work you were previously doing isn't particularly pressing, and one of your slave${girl}s throwing themselves at you begging for sex is as good a distraction as any. Even as ${he} asked you to fuck ${him}, the sight of ${his} erect ${penetrationTool(eventSlave)} made you think that ${!playerVirgin ? "it would be nice to put it to good use inside you" : `it's a good time to get rid of your ${playerAVirgin ? "anal " :""}virginity`}.`);
			if (!canWalk(V.PC) || onBedRest(V.PC)) {
				r.push(`You ask ${him} to take you to your bedchambers.`);
			} else {
				r.push(`You ask ${him} to go with you to your bedchambers.`);
			}
			if (V.PC.boobs > 5000 || V.PC.belly > 10000) {
				r.push(`After some foreplay to warm up, you get into a lateral position on your left side, which is more comfortable for your ${V.PC.belly > 10000 ? bellyDesc(V.PC, true, V.PC.pregKnown === 1) : boobsDesc(V.PC)}, and lift your right leg to give ${his} direct access to your ${playerVVirgin ? vaginaDesc(V.PC) : anusDesc(V.PC)}.`);
			} else {
				r.push(`After a little foreplay to warm up, you feel that you are ready to be penetrated,`);
				if (playerVVirgin) {
					r.push(`so you stretch out on the bed, face up, spread your legs as wide as you can, and pull apart your labia, exposing the entrance of your ${vaginaDesc(V.PC)} to ${him}.`);
				} else {
					r.push(`so you get on all fours, lower your shoulders, raise your hips, open your buttocks and relax your ${anusDesc(V.PC)}, exposing it for ${him}.`);
				}
			}
			if (!canSee(eventSlave)) {
				if (canHear(eventSlave)) {
					r.push(`You know ${eventSlave.slaveName} can't see, so you tell ${him} every move you're making, which turns ${him} on immensely.`);
				} else {
					r.push(`You know ${eventSlave.slaveName} cannot see or hear, so you take ${his} hand and guide ${his} index finger to your exposed hole.`);
				}
			}
			App.Events.addParagraph(frag, r);
			r = [];

			if (eventSlave.skill.penetrative >= 100) {
				r.push(`${He} guides the tip of his ${intruder} with ${his} hand so that it smoothly rubs the outer edges of your ${theHole}. ${He} takes ${his} time and your horniness increases to the point that you seem to feel your hole making unwitting sucking movements. Your hips move as if they had a consciousness of their own, seeking greater contact between your bodies, implicitly begging for penetration. ${eventSlave.slaveName} notices this and gently and precisely, confidently, plunges ${his} ${intruder} into your body.`);
				if (eventSlave.dick === 1 && playerVVirgin) {
					r.push(`This small penis, far from being a disadvantage, shows that the saying "size doesn't matter" is true. With impressive dexterity, the slave moves so that the tiny glans touches all the sensitive spots inside your vagina. Without even realizing it, <span class="virginity loss">you are no longer a virgin.</span>`);
				} else if (eventSlave.dick > 5 || eventSlave.clit > 4) {
					r.push(`Although the size of ${his} ${penetrationTool(eventSlave)} should scare you, the slave rocks ${his} hips, pressing firmly and steadily, making it penetrate you like a knife through butter. Before you realize it${playerVVirgin && V.PC.vaginaLube === 0 || playerAVirgin ? `, and despite the lack of natural lubrication` : ""}${playerVirgin ? `, <span class="virginity loss">you are no longer a${playerAVirgin ? "n anal" : ""} virgin,</span> having felt no pain, and` : ""} half of ${his} cock is inside your ${theHole}. You moan like a bitch in heat wanting ${him} to put the whole thing in you.`);
				} else if (playerVirgin) {
					r.push(`The slave rocks ${his} hips, pressing firmly and steadily, making ${his} ${intruder} penetrate you like a knife through butter. The sensation is indescribable, you moan like a bitch in heat because you want to feel full of ${his} ${penetrationTool(eventSlave)}, and you realize that${playerVVirgin && V.PC.vaginaLube === 0 || playerAVirgin ? `, despite the lack of natural lubrication,` : ""} <span class="virginity loss">you are no longer a${playerAVirgin ? "n anal" : ""} virgin</span> and you have not felt pain.`);
				}
				r.push(`${He} starts pumping ${his} ${intruder} at the pace you want, without you giving ${him} any indication, and an orgasm hits you immediately. It is an endless orgasm that, without losing consciousness, makes your mind disconnect from reality. When you finally come to your senses, ${he} is lying next to you with a sweet smile on ${his} lips. You still have some sporadic spasms${intruder === "cock" ? ` that cause semen to come out of your ${theHole}` : ""}. Your body is bathed in sweat${isVirile(V.PC) ? `, your own cum` : ""} and the slave's ${eventSlave.vagina >= 0 ? "vaginal fluids" : "cum"}.`);
				r.push(Spoken(eventSlave, `<span class="devotion inc">"I love fucking you, ${Master},"</span>`), `${he} says in a hushed tone.`);
				eventSlave.devotion += 15;
				eventSlave.trust += 15;
			} else if (eventSlave.skill.penetrative > 60) {
				r.push(`${He} guides the tip of ${his} ${intruder} with ${his} hand and expertly rubs the outer edges of your ${theHole}. ${He} takes ${his} time, until your excitement increases to the point where you can't take it anymore. Crazy with pleasure, you ask ${him} to please put it in you now. ${eventSlave.slaveName} obeys and gently, precisely and confidently introduces ${his} ${intruder} into your body.`);
				if (eventSlave.dick === 1 && playerVVirgin) {
					r.push(`This small penis is able to prove that the saying "size doesn't matter" is true. With great skill, the slave moves so that the tiny glans touches many sensitive points inside your vagina. You hardly even realize it, but <span class="virginity loss">you are no longer a virgin.</span>`);
				} else if (eventSlave.dick > 5 || eventSlave.clit > 4) {
					r.push(`Although the size of ${his} ${penetrationTool(eventSlave)} should scare you, the slave rocks ${his} hips, pressing firmly and steadily, making it penetrate you with minimal discomfort, giving you time to accept the wide girth. Before you realize it${playerVVirgin && V.PC.vaginaLube === 0 || playerAVirgin ? `, and despite the lack of natural lubrication` : ""}${playerVirgin ? `, <span class="virginity loss">you are no longer a${playerAVirgin ? "n anal" : ""} virgin,</span> without almost having felt pain, and` : ""} half of ${his} cock is inside your ${theHole}. You moan and move your hips, indicating that you need ${him} to put the whole thing in you.`);
				} else if (playerVirgin) {
					r.push(`The slave rocks ${his} hips, pressing firmly and steadily, making ${his} ${intruder} penetrate you with minimal discomfort, giving you time to accept the intrusion. The sensation is indescribable, you moan and move your hips, indicating that you want to feel full of ${his} ${penetrationTool(eventSlave)}, and without almost realizing it,${playerVVirgin && V.PC.vaginaLube === 0 || playerAVirgin ? ` despite the lack of natural lubrication,` : ""} <span class="virginity loss">you are no longer a${playerAVirgin ? "n anal" : ""} virgin</span> and you have barely felt pain.`);
				}
				r.push(`${He} starts pumping ${his} ${intruder} at a good pace, your breathing telling ${him} if ${he}'s doing it right. An orgasm hits you immediately. It is a very powerful orgasm that makes you lose consciousness. When you finally come to your senses, ${he} is lying next to you with a sweet smile on ${his} lips. You still have some sporadic spasms${intruder === "cock" ? ` that cause semen to come out of your ${theHole}` : ""}. Your body is bathed in sweat${isVirile(V.PC) ? `, your own cum` : ""} and the slave's ${eventSlave.vagina >= 0 ? "vaginal fluids" : "cum"}.`);
				r.push(Spoken(eventSlave, `<span class="devotion inc">"I love fucking you, ${Master},"</span>`), `${he} says in a hushed tone.`);
				eventSlave.devotion += 15;
				eventSlave.trust += 10;
			} else {
				r.push(`${He} spits on ${his} hand and lubricates the tip of ${his} erect ${intruder} with it. ${He} unceremoniously aims at your hole and you feel ${him} start to enter you.`);
				if (eventSlave.dick === 1) {
					r.push(`You know ${he}'s inside you but ${playerVirgin ? `<span class="virginity loss">even after taking your${playerAVirgin ? " anal" : ""} virginity</span> ` : ""}you can't barely feel ${his} dick.`);
				} else if (eventSlave.dick > 5 || eventSlave.clit > 4) {
					r.push(`Its girth is killing you with pain, and you know ${he} hasn't even pushed it halfway in. ${playerVirgin ? `Being <span class="virginity loss">(no longer) a${playerAVirgin ? "n anal" : ""} virgin</span> doesn't help at all${playerVVirgin && V.PC.vaginaLube === 0 || playerAVirgin ? `, nor does the lack of natural lubrication` : ""}. ` : ""}But you have made a promise to ${him} and you are not going to go back on it. ${His} birthday gift won't end until ${he} has ${his} orgasm while inside you.`);
				} else if (playerVirgin) {
					r.push(`${His} slave's ${intruder} <span class="virginity loss">takes your${playerAVirgin ? " anal" : ""} virginity.</span>`);
				}
				r.push(`${He} withdraws a little and enters you again, this time all the way. You are ready to start getting pumped with a good fuck, but the slave remains still, motionless, inside you. You feel ${his} labored breathing quicken. The excitement of ${playerVirgin ? "deflowering" : "sodomizing"} ${his} own ${Master} has been too much for ${him} and ${he} is cumming on the first thrust. You can feel ${his} ${penetrationTool(eventSlave)} throbbing inside you while ${eventSlave.clit > 2 ? `the fluids from ${his} pussy soak your skin` : `${he} empties ${his} load as far as ${he} can inside you`}.`);
				r.push(`Once ${he}'s finished with ${his} birthday present, ${he} pulls out, leaving you empty${playerVirgin || eventSlave.clit > 3 || eventSlave.dick > 5 ? ", sore" : ""} and horny. Disappointed, but trying to be gentle, you take ${his} head and direct it to your crotch. ${He} understands ${he} must ${V.PC.vagina >= 0 ? `eat your pussy`: "suck your cock"}, and ${he} does. ${He} has come, but you haven't, and this cannot be tolerated.`);
				r.push(`You cum from ${his} oral stimulation and you return to your work with the satisfaction that the slave <span class="devotion inc">loved the gift you gave ${him}.</span>`);
				eventSlave.devotion += 15;
				eventSlave.trust += 5;
				seX(V.PC, "penetrative", eventSlave, "oral");
			}
			if (playerVVirgin) {
				V.PC.vagina += 1;
				seX(V.PC, "vaginal", eventSlave, "penetrative");
			} else {
				if (playerAVirgin) {
					V.PC.anus += 1;
				}
				seX(V.PC, "anal", eventSlave, "penetrative");
			}
			if (canImpreg(V.PC, eventSlave)) {
				knockMeUp(V.PC, 20, playerVVirgin ? 0 : 1, eventSlave.ID);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
