App.Events.REMaleArcologyOwner = class REMaleArcologyOwner extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.policies.regularParties === 1,
			() => V.PC.vagina > 0,
			() => V.PC.dick === 0,
			() => V.PC.title === 0,
			() => (V.rep-10000 > random(1, 10000) && random(0, 99) < V.seeDicks) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	actorPrerequisites() {
		return [];
	}

	execute(node) {
		let r = [];

		r.push(`The more reputable you've gotten, the more rarefied your entertainments have become. Parties featuring celebrities, old world national leaders, and Free Cities arcology owners have become a nearly nightly experience for you, an expected part of your routine as one of the Free Cities' leading citizens. According to your whims and predilections, you have the choice of participating all night or just making a brief appearance at the start. The important thing is that they're here, come to pay tribute by their presence.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Tonight there are several attendees of such stature that you must exchange pleasantries with each. The last is a fellow arcology owner, not quite up to your stature of course, but certainly worth conciliating. As usual, it's a man. He stands a touch taller than you, and is wearing one of the best-tailored suits you've ever seen. The pants are cut perfectly to draw your eyes to his bulge, and, from what you can see, he is quite toned; the jacket is masculine, and accentuates his fine chest. He is obviously well into middle age, but has made no attempt to hide this fact, allowing his graying hair to proudly display his experience.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`He strikes a fine balance in conversation with you, firm enough to not overpower you, yet neither aggressive nor insistent. He does not take too much of your time, but after you've moved on to your next prominent guest, you receive a brief private message from him. "Surely it's been a while since you've met someone who could make you feel like a woman," it reads. "I'm sure your slaves are fun enough, but letting one of them or some citizen be your man would be fatally stupid. I don't think anyone would look down on you for hooking up with me, though. No strings attached." You glance over at where he's standing${(V.PC.belly >= 5000) ? ` a little surprised; men usually aren't so forthcoming with women as visibly pregnant as you are` : ``}. He's listening politely to a business proposition, and he turns his head slightly toward you, one corner of his firm mouth quirking upward.`);
		App.Events.addParagraph(node, r);

		const responses = [];
		responses.push(new App.Events.Result("Head over and assert yourself", assert));
		responses.push(new App.Events.Result("Walk past him and out onto an unoccupied balcony", past));

		if ((V.PC.preg >= 28 && V.PC.pregMood === 2) || V.PC.boobs >= 1000 || V.PC.butt >= 4) {
			responses.push(new App.Events.Result("Convince him to make the first move", convince));
		}

		if (V.mercenaries > 0 && V.PC.belly < 5000 && V.PC.boobs < 1200 && V.PC.butt < 4) {
			responses.push(new App.Events.Result("Quickly arrange an anonymous night out for him", nightOut));
		}

		App.Events.addResponses(node, responses);

		function assert() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You head over and insert yourself into the conversation between him and the woman trying to convince him to invest in her solar power concern. Your presence and power are such that she gives way rapidly, and you ostentatiously yet nonverbally assert your right to first claim to his company and conversation. After a few minutes of this public display, however, it becomes apparent that this is not what he was looking for. He is likely concerned that you are far too assertive for him to safely manage. He excuses himself and withdraws. You return to your ${generalRefreshment()} consoling yourself that you are not exactly starved for company.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function past() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You walk past him and out onto a balcony. He politely disengages himself and follows, meeting your gaze with a twinkle in his eye. You start talking of nothing of real consequence, but you find that you do have a fair amount to discuss and joke about, since there are oddities to your life that only another slaveowning arcology owner can really understand. You discover that he is very willing to share ${V.PC.refreshment}, and you break out some of your best. The party takes notice of your tête-à-tête, but his judgment was obviously correct. Rather than looking down on you, the other prominent guests seem respectfully envious of his access to you. This is still the case even when he starts to get flirty, leaning into you, brushing against you, and more. ${capFirstChar(V.assistant.name)} cleared your suite long ago, so when he finally nudges his hip against yours and does not take it away, you take him by the hand and lead him there. He stops you with a hand at the door to the suite and unbuttons his shirt, revealing a triathlete's tanned and sculpted body. As you begin to strip, he embraces you, whispering, "You have no idea how nice this is." It's clear it's been a long time since you've let someone else take the lead, and he sometimes has to snap wrestle you for dominance. He leaves a few hours later with a satisfied expression, giving you a deep kiss on his way out in full public view. <span class="reputation inc">Your reputation has greatly improved.</span>`);
			if (canGetPregnant(V.PC)) {
				r.push(knockMeUp(V.PC, 60, 0, -4));
			}
			repX(5000, "event");
			addTrinket("a cologned thank-you note from a male arcology owner of your acquaintance");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function convince() {
			const frag = new DocumentFragment();
			let r = [];
			const randomForeignFS = random(1, 100);
			if (V.PC.preg >= 28 && V.PC.pregMood === 2) {
				r.push(`You move to waddle past him and purposefully stumble, prompting him to catch you. Feigning fatigue, you politely ask if he'd help you out. You aren't exactly subtle as he walks you back to your room, dropping hints at how difficult your pregnancy has been and just how good it feels to be with a man. ${capFirstChar(V.assistant.name)} cleared your suite long ago, so when you enter, disrobe and splay yourself across the bed, it's just you and him.`);
				if (randomForeignFS > 90) {
					r.push(`It's immediately clear by the look on his face that you made a mistake. The man clearly comes from a society that dislikes pregnant women leading, and your attempt to manipulate him into being your lover has pushed him past his level of tolerance. He storms out in anger and, upon returning to the party, makes your underhanded efforts known. <span class="reputation dec">Your reputation has taken a major hit.</span>`);
					repX(-1000, "event");
				} else if (randomForeignFS > 70) { // repop
					r.push(`It's immediately clear by the look on his face that you made a mistake. He wastes no time in leaping onto the bed, and in his haste, barely manages to disrobe. Before you can attempt to take control, he's hilted in your needy vagina and giving you the fucking your body has been craving. He leaves a few hours later with a satisfied expression and returns to the party, where he puts in a good word for just how good you were. <span class="reputation inc">Your reputation has slightly improved,</span> though nowhere near as much as his.`);
					repX(100, "event");
					addTrinket("a thank-you note from a male arcology owner of your acquaintance that smells strongly of lust");
				} else {
					r.push(`He slips out of his clothes, revealing a triathlete's tanned and sculpted body, and joins you in the bed. You direct him onto his back and hilt yourself on his dick. As you savor the feeling of being filled, you notice he doesn't quite know how to properly please a woman of your fecundity, something easily corrected. You're certain he has learned several new positions by the end of your several-hour-long session and after you both stumble back to the party, he gives you a deep kiss in full public view. <span class="reputation inc">Your reputation has greatly improved.</span>`);
					repX(500, "event");
					addTrinket("a flirtatious thank-you note from a male arcology owner you broke in to lusty preggo sex");
				}
			} else if (V.PC.boobs >= 1000) {
				r.push(`You adjust your dress to better emphasize your huge`);
				if (V.PC.boobsImplant > 0) {
					r.push(`fake tits`);
				} else {
					r.push(`soft breasts`);
				}
				r.push(`and head over to join to the`);
				if (randomForeignFS > 80) { // slimness
					r.push(`conversation between him and the woman trying to convince him to invest in her solar power concern. After a few minutes of you jiggling your cleavage around, however, it becomes apparent that this is not turning him on at all. He excuses himself and withdraws. You return to your ${generalRefreshment()} consoling yourself that you are not exactly starved for company.`);
				} else if (randomForeignFS > 60) { // transformation
					r.push(`conversation between him and the woman trying to convince him to invest in her solar power concern.`);
					if (V.PC.boobsImplant === 0) {
						r.push(`After a few minutes of you jiggling your cleavage around, however, it becomes apparent that, while he does frequently eye it, it just isn't to his tastes. He excuses himself and withdraws. You return to your ${generalRefreshment()} consoling yourself that you are not exactly starved for company.`);
					} else {
						r.push(`After a few minutes, it becomes clear that something else is on his mind than renewable energy and he politely excuses himself, though not before dropping something into your cleavage. The women watches dejectedly as you fish out his business card. Taking the hint, you scan the room and find him slowly leaving once he makes eye contact; a clear invitation to follow him. As you wander down the hall, you feel a hand cup one of your firm globes and pull you into an embrace. While he seems content to just grope you, you had other plans and begin undoing his belt. You gasp a little as his member pops out into your hands, eager for some attention of its own. He wastes no time in pulling your ample bust downwards and slipping his eager cock between your breasts. You grab his hips for support as he vigorously pistons into your chest, struggling to retake control of the situation before he renders you unable to return to the party. With a joyous groan, he blows his load deep into your bosom and down your dress. As he helps you to your feet, and the stain under your rack grows larger, you give him a kiss on the cheek and head off to change. He returns to the party, and from what your serving slaves tell you later, seems to have boasted about how well you do business. <span class="reputation inc">Your reputation has slightly improved,</span> though nowhere near as much as his.`);
						repX(100, "event");
						addTrinket("a thank-you note from a male arcology owner of your acquaintance that not-so-subtly suggests getting a bigger pair of implants");
					}
				} else if (randomForeignFS > 40 && V.PC.boobsImplant === 0) { // purist + expansion
					r.push(`conversation between him and the woman trying to convince him to invest in her solar power concern. After a few minutes of you jiggling your cleavage around, it becomes clear that his attention span for renewable energy is nowhere near what it is for big breasts just begging to pop out of their top. He excuses himself from the conversion, though not without intentionally bumping into your rack and slipping into the hall. The woman glares daggers at you and returns to her drink, leaving you to follow suit and slip out of the party. As you wander down the hall, you feel a hand struggle to cup one of your jiggly globes and pull you into an embrace. While he seems content to just grope you, you had other plans and begin undoing his belt. You gasp a little as his member pops out into your hands, eager for some attention of its own. He wastes no time in pulling your ample bust downwards and slipping his eager cock between your breasts. You grab his hips for support as he vigorously pistons into your chest in an attempt to keep your balance under their motion and to make an attempt to retake control of the situation before he renders you unable to return to the party. With a joyous groan, he blows his load deep into your bosom and down your dress. As he helps you to your feet, and the stain under your rack grows larger, you give him a kiss on the cheek and head off to change. He returns to the party, and from what your serving slaves tell you later, seems to have boasted about how well you do business. <span class="reputation inc">Your reputation has slightly improved,</span> though nowhere near as much as his.`);
					repX(100, "event");
					addTrinket("a thank-you note from a male arcology owner of your acquaintance with an attached list of natural supplements to make your tits even bigger");
				} else {
					r.push(`conversation between him and the woman trying to convince him to invest in her solar power concern. Your attempts, at first, appear to be working as he begins to stutter and lose focus on the topic at hand, but he soon apologizes, wraps an arm around your shoulders, pulls you close and starts groping your enormous funbags. He returns to discussing business while using you like a stress ball and manages to seal a rather lucrative business deal. He gives you an appreciative squeeze and heads on his way, leaving you dumbfounded at what just happened. His reputation has improved significantly, while your status <span class="reputation dec">as nothing more than stress relief</span> is made clear.`);
					repX(-500, "event");
				}
			} else { // big butt
				if (randomForeignFS > 80) { // slimness
					r.push(`You wait until he finishes his conversation with the woman trying to convince him to invest in her solar power concern and excuses himself to head for the restroom. You know the layout of the penthouse better than anyone and know that he'll likely take a narrow service hall to get back to the party quick; that is where you will spring your trap. As he makes his return, you attempt to squeeze past him, forcing your enormous`);
					if (V.PC.buttImplant !== 0) {
						r.push(`fake`);
					}
					r.push(`rear up against his crotch. As you wiggle against him, it becomes apparent that any hint of an erection he may have had is quickly fading. He apologizes for the inconvenience and heads on his way. You stop around the corner, out of sight, and console yourself that you are not exactly starved for company.`);
				} else if (randomForeignFS > 60) { // transformation
					if (V.PC.buttImplant === 0) {
						r.push(`You wait until he finishes his conversation with the woman trying to convince him to invest in her solar power concern and excuses himself to head for the restroom. You know the layout of the penthouse better than anyone and know that he'll likely take a narrow service hall to get back to the party quick; that is where you will spring your trap. As he makes his return, you attempt to squeeze past him, forcing your enormous`);
						if (V.PC.buttImplant !== 0) {
							r.push(`fake`);
						}
						r.push(`rear up against his crotch. As you wiggle against him, it becomes apparent that he is a man that enjoys a nice big ass wrapped around his cock. You tense up as you feel his hands sink into your soft cheeks, only to find that he is slipping out from behind you. He apologizes for leading you on and heads back to the party. You're left standing there, pondering why it didn't work, only to realize that he lost interest the moment he realized your butt was real.`);
					} else {
						r.push(`You wait until he finishes his conversation with the woman trying to convince him to invest in her solar power concern and excuses himself to head for the restroom. You know the layout of the penthouse better than anyone and know that he'll likely take a narrow service hall to get back to the party quick; that is where you will spring your trap. As he makes his return, you attempt to squeeze past him, forcing your enormous`);
						if (V.PC.buttImplant !== 0) {
							r.push(`fake`);
						}
						r.push(`rear up against his crotch. As you wiggle against him, it becomes apparent that something hard is slowly snaking its way between your firm cheeks. Your suspicions are confirmed when you feel his hands grab your hips as he begins to dry hump you. Before he can ruin the moment, and his pants, you quickly guide him into one of the many stairwells hidden throughout the penthouse. By the time you've grabbed hold of the rail, he's undone his pants, managed to pull your dress up over your immense bottom, and lined himself up with your moist slit. You push back against him, biting your lip as the length of his member slides into you, letting him know that you are ready as your shelf of an ass blocks any view of your crotch from above. He takes you hard against the railing, enjoying the sensation of your implants slamming against him. With a joyous groan, he pulls out and blows his load in your crack and up your back. As he helps you upright, you lean back give him a kiss on the cheek before heading off to change. He returns to the party, and from what your serving slaves tell you later, seems to have boasted about how well you do business. <span class="reputation inc">Your reputation has slightly improved,</span> though nowhere near as much as his.`);
						repX(100, "event");
						addTrinket("a thank-you note from a male arcology owner of your acquaintance that not-so-subtly suggests getting a bigger pair of ass implants");
					}
				} else if (randomForeignFS > 40 && V.PC.buttImplant === 0) { // purist + expansion
					r.push(`You wait until he finishes his conversation with the woman trying to convince him to invest in her solar power concern and excuses himself to head for the restroom. You know the layout of the penthouse better than anyone and know that he'll likely take a narrow service hall to get back to the party quick; that is where you will spring your trap. As he makes his return, you attempt to squeeze past him, forcing your enormous rear up against his crotch. As you wiggle against him, it becomes apparent that something hard is slowly snaking its way between your expansive cheeks. Your suspicions are confirmed when you feel his hands grab your hips as he begins to dry hump you. Before he can ruin the moment, and his pants, you quickly guide him into one of the many stairwells hidden throughout the penthouse. By the time you've grabbed hold of the rail, he's undone his pants, managed to pull your dress up over your immense bottom, and lined himself up with your moist slit. You push back against him, biting your lip as the length of his member slides into you, letting him know that you are ready as your shelf of an ass blocks any view of your crotch from above. He takes you hard against the railing, enjoying the motion of your butt slamming against him. With a joyous groan, he pulls out and blows his load in your crack and up your back. As he helps you upright, you lean back give him a kiss on the cheek before heading off to change. He returns to the party, and from what your serving slaves tell you later, seems to have boasted about how well you do business. <span class="reputation inc">Your reputation has slightly improved,</span> though nowhere near as much as his.`);
					repX(100, "event");
					addTrinket("a thank-you note from a male arcology owner of your acquaintance with an attached list of natural supplements and diets to add even more weight to your rear");
				} else {
					r.push(`You adjust your dress to better hug your huge`);
					if (V.PC.buttImplant !== 0) {
						r.push(`fake ass`);
					} else {
						r.push(`soft butt`);
					}
					r.push(`and head over to join to the conversation between him and the woman trying to convince him to invest in her solar power concern. Your attempts, at first, appear to be working as he begins to stutter and lose focus on the topic at hand, but he soon apologizes, wraps an arm around your waist, pulls you close and starts groping your enormous rear. He returns to discussing business while using you like a stress ball and manages to seal a rather lucrative business deal. He gives you an appreciative slap on the fanny and heads on his way, leaving you dumbfounded at what just happened. His reputation has improved significantly, while your status <span class="reputation dec">as nothing more than stress relief</span> is made clear.`);
					repX(-500, "event");
				}
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function nightOut() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You immediately enlist ${V.assistant.name} to help you make some hasty preparations, and then send him a message asking him if he'd like to spend a night out with you, as a couple of unremarkable citizens. He glances at you with a curious expression, and you direct him to a side room. He finds you there, changing into the heavy, anonymizing armor of one of your mercenaries; you have a male suit for him, too. Once you're both suited up, you move to show him how to activate the face-obscuring helmet, but you find that he's already got it on and active. "This," he says, "is either the best or the stupidest date idea I have ever heard. Let's fucking do this." You pass a mercenary on your way out onto the club, and he cannot resist giving you a thumbs up, which your fellow arcology owner fortunately fails to notice. You patrol for a while, using internal comms to joke about life as an arcology owner, something he clearly gets to do too infrequently. You don't mind the chance, either. Your mercenaries frequently spend time together off duty, so nobody sees anything unusual about a male and female in mercenary armor sharing a milkshake at a dairy bar, even when they start to engage in increasingly rough public flirting, armor and all. Later, your slaves are obliged to pick up and sort a trail of discarded armor pieces leading from the entry to your penthouse all the way to your suite, which is now emitting the indistinct sounds of very energetic sex. A few hours later, when you're showering up together so he can head back to his domain, he looks at you and says seriously, "That was pretty fun. If things ever go to shit, I wouldn't mind wearing that armor for real." Your mercenaries cannot keep their mouths shut, for once, and the almost unbelievably juicy story of the arcology owners wearing borrowed armor to go on an anonymous date spreads like wildfire. <span class="reputation inc">Your reputation has greatly improved.</span>`);
			addTrinket("a flirtatious thank-you note from a male arcology owner of your acquaintance");
			if (canGetPregnant(V.PC)) {
				r.push(knockMeUp(V.PC, 60, 0, -4));
			}
			repX(5000, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
