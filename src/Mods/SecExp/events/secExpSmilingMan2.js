App.Events.secExpSmilingMan2 = class secExpSmilingMan2 extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.secExpEnabled > 0,
		];
	}

	execute(node) {
		App.Events.queueEvent(0, new App.Events.secExpSmilingMan3());
		V.fcnn.push("...my money safe the old-fashioned way: I store it all underneath my mattress...");
		V.SecExp.smilingMan.progress++;
		let r = [];
		const {hisA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		r.push(`When ${V.assistant.name} violently wakes you up, ${hisA} worried expression can mean only one thing: the Smiling Man had been back. "We were anonymously sent a link to a new website: it's a very simple site, no visuals, no text; only a countdown ticking away. It will reach zero this evening." your assistant says.`);
		r.push(`This is troubling, yet somewhat exciting. The Smiling Man never failed to cause damage, but his ego had gotten the best of him this time — having time to prepare before their attack will give you a chance to find them. For the rest of the day you do your best to plan, prepare and focus.`);
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`Evening came faster than you anticipated. Your security team was already at full alert, waiting for any signal on the horizon. The die was cast.`]);
		App.Events.addParagraph(node, [`Suddenly all the computers in the room begin to act strangely, and then it happened. On all of the screens across the arcology the Smiling Man's icon appears, then every speaker begins broadcasting the same voice, one that you have already heard once before:`]);
		App.Events.addParagraph(node, [`"Hello citizens of ${V.arcologies[0].name}! I am here on this special day to relay to you a very important message: we find ourselves in very peculiar times, times of strife and suffering! But these are also times of change and regeneration! Indeed, I say humanity itself is regenerating, turning into a new being for which the ideals of the old world no longer hold meaning. A new blank page from which humanity can begin to prosper again.`]);
		r = [];
		r.push(`Alas, my friends, not all is good, as in this rebirth a great injustice is being perpetrated. If we truly want to ascend to this new form of humanity the old must give way to the new. If we must cleanse our mind of old ideas, our world must cleanse itself of them as well.`);
		r.push(`It's to fix this injustice, that I worked so hard all this time! To cleanse the world of the old, we must get rid of our precious, precious data. At the end of this message every digital device will see its memory erased, every archive cleaned, every drive deleted.`);
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`It will be a true rebirth! A true new beginning! No longer will the chains of the past keep humanity anchored!"`]);
		App.Events.addParagraph(node, [`The voice stopped for a second.`]);
		App.Events.addParagraph(node, [`"Have a good day," it simply concluded.`]);
		App.Events.addParagraph(node, [`Then it happened.`]);
		r = [];
		r.push(`In little more than seconds all the data collected in the years past vanished. It's a disaster.`);
		r.push(`The vast majority of currency is digital, so the actions of the Smiling Man have a devastating effect on the money supply.`);
		if (V.cash < 0) {
			r.push(`Luckily for you this means that your <span class="cash inc">debt is reduced.</span>`);
		} else {
			r.push(`Unfortunately this means that your <span class="cash dec">cash reserves are gutted.</span>`);
		}
		cashX((V.cash * 0.2) - V.cash, "event");
		r.push(`You are not the only one affected by this however. <span class="red">The economy of the entire world is severely affected</span> by the loss of vast quantities of currency. Who knows how long will it take for the global economy to recover.`);
		V.SecExp.smilingMan.globalCrisisWeeks = random(8, 16);
		r.push(`Trade is <span class="red">severely affected.</span>`);
		V.SecExp.core.trade *= 0.2;
		r.push(`With the loss of so much information, most of your accomplishments are simply forgotten, so <span class="reputation dec">your reputation suffers.</span>`);
		repX((V.rep * 0.6) - V.rep, "event");

		if (V.arcologies[0].ownership >= 60) {
			if (V.SecExp.core.authority <= 10000) {
				const cells = V.building.findCells(cell => cell.canBeSold());
				jsEither(cells).owner = 0;
				r.push(`Vast amount of data relative to the ownership of the arcology is lost. You lost all legal claims to one of the sectors.`);
			} else {
				r.push(`Vast amount of data relative to the ownership of the arcology is lost. You would've run the risk of losing ownership of one of the sectors, but fortunately your authority is so high your citizens do not dare question your claims even in the absence of a valid legal case.`);
			}
		}
		if (V.SecExp.buildings.secHub) {
			if (V.SecExp.buildings.secHub.coldstorage > 3) {
				r.push(`Your cold storage facility has ensured that the Smiling Man's destruction of the primary archives was unable to damage the security of your arcology.`);
			} else if (V.SecExp.buildings.secHub.coldstorage === 0) {
				r.push(`Your security department sees its archives butchered by the Smiling Man. Almost all data on criminals, citizens, and operations are lost. The <span class="red">security of the arcology is greatly reduced.</span> Criminals, on the other hand, with their past erased, cannot wait to join this new world, so <span class="red">crime will inevitably increase.</span>`);
				V.SecExp.core.security = Math.clamp(V.SecExp.core.security * 0.2, 0, 100);
				V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow * 1.5, 20, 100);
			}
		}
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`A short, meek man approaches you with a weak smile. "Not all is lost, ${properTitle()}. We have a lead on him — he is here, in ${V.arcologies[0].name}."`]);
		App.Events.addParagraph(node, [`Despite the bleak situation, you cannot help but smile back.`]);


		App.Events.addResponses(node, [
			new App.Events.Result(`Eliminate the threat, once and for all.`, kill),
			new App.Events.Result(`Bring him to me.`, find),
			new App.Events.Result(`Such skill on my side would be a great boon. Find him.`, findFast),
			new App.Events.Result(`He finally got what he always wanted. Let him have his victory, we have better things to do.`, peace),
		]);

		function kill() {
			V.SecExp.smilingMan.relationship--;
			return `You command your loyal operatives to prepare for a manhunt.`;
		}
		function find() {
			V.SecExp.smilingMan.relationship++;
			return `You command your loyal operatives to prepare for a manhunt.`;
		}
		function findFast() {
			V.SecExp.smilingMan.relationship += 2;
			return `You command your loyal operatives to prepare for a manhunt.`;
		}
		function peace() {
			return `You take no further action. Hopefully this ordeal is finally over.`;
		}
	}
};
