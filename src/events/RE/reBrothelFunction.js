App.Events.REBrothelFunction = class REBrothelFunction extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Entity.facilities.brothel.employeesIDs().size > 5,
		];
	}

	execute(node) {
		const largeCash = 10000;
		const mediumCash = 2000;
		const smallCash = 1000;

		const brothelNameCaps = capFirstChar(V.brothelName);

		App.Events.addParagraph(node, [
			`${brothelNameCaps} is a reputable establishment in ${V.arcologies[0].name}, a veritable bedrock to sexual life in your arcology. As is befitting of its position, requests to rent out your brothel for one function or another come across your desk with some regularity. On this particular day, ${V.assistant.name} has laid out a number of potential clients for your perusal. Given the importance of ${brothelNameCaps} in the arcology's sex trade, it would be unwise to indulge more than one of these requests at this time.`
		]);
		App.Events.addParagraph(node, [
			`One request comes to you written on a letterhead featuring the logo of a fellow arcology owner. She describes her husband's preference for your hard working brothel whores, whom he patronizes on his regular business trips to your arcology. Such indulgences have been a distraction to her husband of late, and she has dispatched him to undertake a task in your arcology that simply cannot go poorly. With this in mind, she beseeches you to close down your brothel for a single day out of solidarity for a fellow arcology owner — and for the significant sum of ${cashFormat(largeCash)}.`
		]);
		App.Events.addParagraph(node, [
			`Another of these bids for your brothel comes in the form of a curious video call. The video comes from an infamous lothario in your arcology, a seducer of powerful and prominent women citizens. Indeed, the recording was surreptitiously recorded in the bedroom of one such influential woman, with the Casanova describing his request in hushed tones while his wealthy host minces about unknowingly in the background. He explains that he is finally ready to hang up his coat and end his days of debauchery and copious casual sex, but that he would like to do so by engaging in a full day of indulgence at ${V.brothelName}.`
		]);
		App.Events.addParagraph(node, [
			`The last of these requests comes in the form of a letter, stamped with the herald of a prominent arcology family. It seems the eldest son of the family, known to you largely as a spoiled child riding on the coattails of his parents, is about to reach the age of majority. At his behest, his parents have contacted you to reserve your brothel for a day so that their son may become a man in true Free Cities fashion — amongst a roil of writhing flesh and wanton debauchery.`
		]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Acquiesce to the arcology owner's request`, arcOwner, `This will earn you ${cashFormat(largeCash)}`),
			new App.Events.Result(`Give this lady-killing rake a proper send off into retirement`, rake, `This will earn you ${cashFormat(mediumCash)}`),
			new App.Events.Result(`Welcome the boy into manhood in Free Cities fashion`, boy, `This will earn you ${cashFormat(smallCash)}`)
		]);

		function arcOwner() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Though you close down ${brothelNameCaps} for a day, it's far from a day off for your hard-working brothel slaves. In the absence of the convenient center for the sale of sexual services that a brothel represents, you disperse them onto the streets to sell their bodies the old fashioned way. At the end of the day you receive a brief message of gratitude from your fellow arcology owner while your whores <span class="devotion inc">appreciate the opportunity to stretch their legs on the street</span> for a change of pace.`);
			for (const slave of V.slaves.filter(s => s.assignment === Job.BROTHEL)) {
				slave.devotion += 4;
			}
			cashX(largeCash, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function rake() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Though a citizen he may be, this serial seducer may have more notches on his proverbial bedpost than even your oldest slaves. Though you are not present to view his mastery of the sexual craft first-hand, the dreamy fucked-out looks of exhaustion and gratified satisfaction painting every single one of your slaves' faces at the end of the day speak volumes. Indeed, all of your brothel slaves with any room for improvement in their whoring skills <span class="skill inc">learn from his skillful coupling,</span> while even those with nothing to learn from him <span class="devotion inc">gain confidence</span> from the intensity of their sexual congress.`);
			for (const slave of V.slaves.filter(s => s.assignment === Job.BROTHEL)) {
				if (slave.skill.whoring < 100) {
					slave.skill.whoring += 10;
				} else {
					slave.devotion += 4;
				}
				if (canDoVaginal(slave) && canDoAnal(slave)) {
					actX(slave, "vaginal", 3);
					actX(slave, "anal", 3);
				} else if (canDoAnal(slave)) {
					actX(slave, "anal", 5);
				} else {
					actX(slave, "oral", 10);
				}
			}
			cashX(mediumCash, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function boy() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Though he was but a boy yesterday, none can say that this newly made man entered his manhood with anything less than a sterling display of enthusiasm and virility, though he is somewhat lacking in general technique. Nevertheless, any man able to fuck his way through an entire brothel of sex slaves and back again is clearly capable of bearing the mantle of citizenry in ${V.arcologies[0].name}. The story of a boy entering manhood in such a spectacular manner spreads rapidly and reflects well in the court of <span class="reputation inc">public opinion,</span> with many citizens recalling their own passage past the age of majority. However, a lifetime of indulgence and spoiling have rendered this new citizen unable to understand the concept of being refused — not that your slaves could refuse him, in any case. His rough treatment has left your poor slave whores <span class="health dec">battered</span> by his brutally selfish lovemaking.`);
			for (const slave of V.slaves.filter(s => s.assignment === Job.BROTHEL)) {
				healthDamage(slave, 5);
				if (canDoVaginal(slave) && canDoAnal(slave)) {
					actX(slave, "vaginal");
					actX(slave, "anal");
				} else if (canDoAnal(slave)) {
					actX(slave, "anal", 2);
				} else {
					actX(slave, "oral", 4);
				}
			}
			cashX(smallCash, "event");
			repX(2500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
