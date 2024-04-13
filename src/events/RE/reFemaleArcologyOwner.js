App.Events.REFemaleArcologyOwner = class REFemaleArcologyOwner extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.policies.regularParties === 1,
			() => (V.rep-10000 > random(1, 10000)) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];

		r.push(`The more reputable you've gotten, the more rarefied your entertainments have become. Parties featuring celebrities, old world national leaders, and Free Cities arcology owners have become a nearly nightly experience for you, an expected part of your routine as one of the Free Cities' leading citizens. According to your whims and predilections, you have the choice of participating all night or just making a brief appearance at the start. The important thing is that they're here, come to pay tribute by their presence.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Tonight there are several attendees of such stature that you must exchange pleasantries with each. The last is a fellow arcology owner, not quite up to your stature of course, but certainly worth conciliating. Unusually, she's a woman. She comes up almost to your height, with the aid of very tall spike heels, and is wearing one of the best-tailored suits you've ever seen. The skirt is just short enough to hint at sexuality, and she has lovely, athletic legs; the jacket is feminine, yet makes her trim fitness very clear. She is obviously well into middle age, but has made no attempt to hide the fact, her understated makeup and elegant bun flattering her years rather than concealing them.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`She strikes a fine balance in conversation with you, firm enough for a rising woman of consequence in a world of wealth and power still mostly male, yet neither aggressive nor insistent. She does not take too much of your time, but after you've moved on to your next prominent guest, you receive a brief private message from her. "It's been a while since I've met someone I can allow to treat me like a woman," it reads. "My slaves are fun enough, but letting one of them or some citizen be my man would be fatally stupid.`);
		if (V.PC.title === 1) {
			r.push(`I don't think anyone would look down on me for hooking up with you, though.`);
		} else {
			r.push(`I'm lucky you're a lady!`);
		}
		r.push(`No strings attached." You glance over at where she's standing. She's listening politely to a business proposition, and she turns her head slightly toward you, one corner of her firm mouth quirking upward.`);
		App.Events.addParagraph(node, r);
		r = [];

		const choices = [];
		choices.push(new App.Events.Result(`Head over and assert yourself`, assertYourself));
		choices.push(new App.Events.Result(`Walk past her and out onto an unoccupied balcony`, past));
		if (V.mercenaries > 0) {
			choices.push(new App.Events.Result(`Quickly arrange an anonymous night out for her`, anonymous));
		}

		App.Events.addResponses(node, choices);

		function assertYourself() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You head over and insert yourself into the conversation between her and the man trying to convince her to invest in his solar power concern. Your presence and power are such that he gives way rapidly, and you ostentatiously yet nonverbally assert your right to first claim to her company and conversation. After a few minutes of this public display, however, it becomes apparent that this is not what she was looking for. She is likely concerned that this is too much public`);
			if (V.PC.title === 1) {
				r.push(`submission`);
			} else {
				r.push(`vulnerability`);
			}
			r.push(`for her to safely manage. She excuses herself and withdraws. You return to your ${generalRefreshment()}, consoling yourself that you are not exactly starved for company.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function past() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You walk past her and out onto a balcony. She politely disengages herself and follows, meeting your gaze with a twinkle in her eye. You start talking of nothing of real consequence, but you find that you do have a fair amount to discuss and joke about, since there are oddities to your life that only another slaveowning arcology owner can really understand. You discover that she is very willing to share ${V.PC.refreshment}, and you break out some of your best. The party takes notice of your tête-à-tête, but her judgment was obviously correct.`);
			if (V.PC.title === 0) {
				r.push(`You are a pair of powerful women who are very obviously in the early stages of an assignation, and it's hard to tell which of you excites more envy.`);
			} else {
				r.push(`Rather than looking down on her, the other prominent guests seem respectfully envious of her access to you.`);
			}
			r.push(`This is still the case even when she starts to soften her body language, leaning into you, brushing against you, and more. ${capFirstChar(V.assistant.name)} cleared your suite long ago, so when she finally nudges her hip against yours and does not take it away, you take her by the hand and lead her there. She stops you with a hand at the door to the suite and then strips off her suit piece by piece, revealing a triathlete's tanned and sculpted body. You crush her naked form in your still-clothed arms, and she softens into you, whispering, "You have no idea how relaxing this is."`);
			if (V.PC.title === 1) {
				r.push(`It's clear it's been a long time since she's let someone else take the lead,`);
			} else {
				r.push(`She's obviously an occasional lesbian, at best,`);
			}
			r.push(`and she's awkward as a girl at times. She leaves a few hours later with a satisfied expression, giving you a kiss on her way out in full public view. <span class="reputation inc">Your reputation has greatly improved.</span>`);
			repX(5000, "event");
			addTrinket("a perfumed thank-you note from a female arcology owner of your acquaintance");

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function anonymous() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You immediately enlist ${V.assistant.name} to help you make some hasty preparations, and then send her a message asking her if she'd like to spend a night out with you, as a couple of unremarkable citizens. She glances at you with a curious expression, and you direct her to a side room. She finds you there, changing into the heavy, anonymizing armor of one of your mercenaries; you have a female suit for her, too. Once you're both suited up, you move to show her how to activate the face-obscuring helmet, but you find that she's already got it on and active. "This," she says, "is either the best or the stupidest date idea I have ever heard. Let's fucking do this." You pass a mercenary on your way out onto the club, and he cannot resist giving you a thumbs up, which your fellow arcology owner fortunately fails to notice. You patrol for a while, using internal comms to joke about life as an arcology owner, something she clearly gets to do too infrequently. You don't mind the chance, either. Your mercenaries frequently spend time together off duty, so nobody sees anything unusual about a`);
			if (V.PC.title === 1) {
				r.push(`male and female`);
			} else {
				r.push(`couple of ladies`);
			}
			r.push(`in mercenary armor sharing a milkshake at a dairy bar, even when they start to engage in increasingly rough public flirting, armor and all. Later, your slaves are obliged to pick up and sort a trail of discarded armor pieces leading from the entry to your penthouse all the way to your suite, which is now emitting the indistinct sounds of very energetic sex. A few hours later, when you're showering up together so she can head back to her domain, she looks up at you and says seriously, "That was pretty fun. If things ever go to shit, I wouldn't mind wearing that armor for real." Your mercenaries cannot keep their mouths shut, for once, and the almost unbelievably juicy story of the arcology owners wearing borrowed armor to go on an anonymous`);
			if (V.PC.title === 0) {
				r.push(`lesbian`);
			}
			r.push(`date spreads like wildfire. <span class="reputation inc">Your reputation has greatly improved.</span>`);
			addTrinket("a cute thank-you note from a female arcology owner of your acquaintance");
			repX(5000, "event");

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
