App.Events.SEPoorKnight = class SEPoorKnight extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() >= 37,
			() => V.arcologies[0].FSNeoImperialistLaw1 === 1,
			() => V.arcologies[0].FSNeoImperialistLaw2 === 1,
			() => V.poorKnight !== 1,
			() => App.Events.effectiveWeek() >= V.imperialEventWeek + 3,
		];
	}

	execute(node) {
		V.poorKnight = 1;
		V.imperialEventWeek = App.Events.effectiveWeek();

		App.Events.addParagraph(node, [`Word reaches your ears through the idle gossip of your well-to-do Barons of a particular citizen whose name has been on everyone's lips the last few days. During the visit of a wealthy trader from a neighboring arcology, the merchant, supposedly at the prompting of one particularly pompous Knight of yours who referred to the peasantry as "little more than mindless toys", had his guards beat some of your lower-class citizens for amusement, molesting a young girl and treating them generally as slaves.`]);

		App.Events.addParagraph(node, [`The cruel rambunctiousness of this trader and your own Knights continued for a few hours, with nearby guards both pretending not to notice and not reporting their activities to you, until a factory-working peasant by the name of Valentin approached them in the marketplace and demanded they stop. When the merchant's guards attempted to apprehend him, although you aren't clear on the exact details, it seems he managed to somehow strike down all five, despite being both unarmed and unarmored. The present Knight promptly challenged him to fight, out-of-armor and one-on-one, and was then knocked flat by the peasant in front of the watching marketplace as well.`]);

		App.Events.addParagraph(node, [`This "Valentin", a quiet man built like a mountain, has very rapidly become a local hero to your peasantry. You have heard petitions calling for him to be Knighted, and the public has nearly immediately come to see him as a courageous fighter against the various injustices of your hierarchical Imperial society. Your Barons, on the other hand, murmur that he is a rabblerouser, a peasant who has clearly forgotten his station at the bottom of the pyramid, and that to do anything but punish him for his insolence will surely lead to riots and unrest. Such a man would surely be a proud and capable Imperial Knight, but to Knight him would undoubtedly be seen as condoning liberal freedoms in your lower classes, and a Knight drawn from the filthy, unwashed peasants is totally unheard of.`]);

		const festiveCost = 5000;
		const quietCost = 500;
		const choices = [];
		if (V.cash >= festiveCost) {
			choices.push(new App.Events.Result(`Knight him in a grand festival`, festival, `Costs ${cashFormat(festiveCost)}.`));
		} else {
			choices.push(new App.Events.Result(null, null, `Cannot afford a grand festival.`));
		}
		if (V.cash >= quietCost) {
			choices.push(new App.Events.Result(`Knight him in a quiet ceremony`, quiet, `Costs ${cashFormat(quietCost)}.`));
		} else {
			choices.push(new App.Events.Result(null, null, `Cannot afford even a quiet ceremony. Maybe, uh, Valentin could spot you a few ¤?`));
		}
		choices.push(new App.Events.Result(`Have him flogged for attacking your honored guests`, floggingMeat));
		App.Events.addResponses(node, choices);

		function festival() {
			cashX(-festiveCost, "event");
			V.arcologies[0].prosperity -= 2;
			repX(5000, "event");
			return `You make your stance on the issue known with a large public ceremony, awarding Valentin with his own private apartment, coat of arms, and a set of Imperial Plate in the very marketplace where he bested a group of brutish foreign thugs and an overly-cocky Knight. A swarm of peasantry surround every inch of the ceremony, <span class="green">cheering your name</span> and celebrating Sir Valentin as you demonstrate that skill and courage is more important than social station. The furious foreign merchant sends you a message a few days later swearing to <span class="red">never return to your arcology,</span> and the Barons grumble about the wildly dancing and celebrating peasants <span class="red">undermining your authority.</span>`;
		}

		function quiet() {
			cashX(-quietCost, "event");
			V.arcologies[0].prosperity -= 1;
			repX(2000, "event");
			return `You quietly award the brave peasant a set of Imperial Plate and his own apartment in a private ceremony attended only by a handful of your Barons and Knights. Many of the watching oligarchs seem thoroughly unenthusiastic about the enormous, grease-stained man joining their hallowed ranks, but politely clap and congratulate him nevertheless. Even the pompous Knight who he beat a few days ago, still sporting a black eye, claps him on the back after you have him rise as Sir Valentin and congratulates him on a fight "befitting of a real man". Word of your decision soon reaches the peasantry, who <span class="green">celebrate</span> the rewards given for honor, but you later receive a message from the foreign merchant infuriated that you would reward such insolence and claiming that he'll <span class="red">hike his prices for you.</span>`;
		}

		function floggingMeat() {
			repX(-2000, "event");
			V.arcologies[0].prosperity += 1;
			return `You have the uppity peasant flogged for a few hours in the marketplace where he beat the merchant's guards. He accepts the punishment quietly and without any protest, submitting his muscled back to the bite of the lash as your Barons nod their head in agreement with your decision. The watching peasants are utterly <span class="red">horrified</span> at your treatment of one of their heroes, but a day later you receive a message from the pleased merchant saying that he'll be sure to give you a <span class="green">steep discount</span> the next time he visits your arcology for 'putting that uppity vermin in its place - beneath us.'`;
		}
	}
};
