App.Events.SENicaeaPreparation = class SENicaeaPreparation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.nicaea.held !== 1,
			() => FutureSocieties.isActive('FSChattelReligionist'),
			() => V.nicaea.preparation === 1,
			() => V.nicaea.eventWeek !== V.week
		];
	}

	execute(node) {
		let r = [];

		V.nextButton = "Continue";
		V.nicaea.preparation = 0;
		V.nicaea.eventWeek = V.week;

		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		if (V.nicaea.involvement === -1) {
			r.push(`Your vigorous opposition to a religious council to establish an agreed upon creed for Chattel Religionism has been successful, but not without cost. The furious controversy <span class="red">cost you friends and damaged your reputation</span> among those of your religious peers who wanted to see Chattel Religionists draw closer together, and as happens in controversies as heated as this, the influence and reputation you gain from those who agree with you doesn't match what you lose among those who think you're standing in the way of progress. Furthermore, not all of your citizens agreed with you, either. A few citizens of consequence have actually left ${V.arcologies[0].name} over it, <span class="red">damaging its economic prosperity.</span> Also, Chattel Religionists have had a serious disagreement here for the first time. <span class="red">Full acceptance of slaveowning theocracy in your arcology has been set back.</span> A majority of your citizens still approve and participate, but it will take time to rebuild.`);
			V.arcologies[0].prosperity -= 5;
			V.arcologies[0].FSChattelReligionist *= 0.6;
			repX(-4000, "event");
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`But you did win. Chattel Religionism will remain a free and open faith that accepts any slaveowner willing to declare that they consider holding slaves holy. You'll be remembered by those who opposed you as the arcology owner who kept Chattel Religionism from developing into a great force, and by those who agreed with you as the arcology owner who preserved Chattel Religionism as a welcoming and open as it was always meant to be. You have no doubt that the latter view dominates now and will come to predominate as it becomes settled. After all this, there's no chance that anyone who calls for another Chattel Religionist synod any time soon will get a serious hearing.`);
		} else {
			r.push(`You have a busy week preparing for the ${V.nicaea.name} ahead of you. Planning the event itself is the easy part. Modern arcologies are designed to host big events, and it's not like you don't have a lot of labor available to assist you. Furthermore, one of ${V.assistant.name}'s standard functions is event planning. ${HeA} helps manage the thousand details of hosting a group of rich, powerful, opinionated people, letting you focus on the most important matters.`);
			if (V.HeadGirlID !== 0) {
				const {He, his} = getPronouns(S.HeadGirl);
				r.push(`${S.HeadGirl.slaveName} is also a great help. ${He} does ${his} best to supervise your other slaves even more thoroughly than usual, giving you precious time.`);
			}
			if (S.Concubine) {
				r.push(`Of course, ${S.Concubine.slaveName} is always there to help you relax when you need it.`);
			}
			App.Events.addParagraph(node, r);

			App.Events.addParagraph(node, [`The first major choice you have to make concerns the seats on the Council. There are some Chattel Religionists you simply have to invite; they're so prominent that if you don't, the Council's decisions will lack any weight. But that doesn't mean you don't have room to manipulate the list of people invited in order to enhance your influence in the council. It wouldn't be difficult to selectively invite Chattel Religionist slaveowners that have the reputation to support attendance, who you know to be philosophically aligned with your thoughts about the faith. On the other hand, managing the seats on the Council with perfect impartiality would definitely help acceptance of any creed the Council agrees upon.`]);

			App.Events.addResponses(node, [
				new App.Events.Result(`Apportion Council seats impartially`, impartially),
				new App.Events.Result(`Invite Chattel Religionists you agree with`, agree)
			]);

			function impartially() {
				return `You apportion the seats impartially, doing everything you can to help ensure that all Chattel Religionists will see the Council as authoritative.`;
			}

			function agree() {
				V.nicaea.power -= 1;
				V.nicaea.influence += 1;
				return `You do your best to invite Chattel Religionists you hope will agree with you, while trying to keep what you're doing from being too obvious.`;
			}

			App.Events.addParagraph(node, [
				`Second, you need to decide whether you intend to engage in a canvassing campaign before the Council begins. There's nothing stopping you from airing your views with invitees before they arrive. However, swaying them is going to require you to really throw your weight around. These are powerful people, and you'll have to expend Free Cities political capital without holding back if you hope to sway even one of them. It's not like you lack for favors you could call in, though.`
			]);

			App.Events.addResponses(node, [
				new App.Events.Result(`Rely on your prominence`, prominence),
				new App.Events.Result(`Leverage reputation into power`, leverage, "This will cost a great deal of reputation")
			]);

			function prominence() {
				return `You decide that you don't need to spend precious reputational power. You're prominent enough that you expect to achieve your goals without special leverage.`;
			}

			function leverage() {
				V.nicaea.influence += 1;
				repX((V.rep * 0.5) - V.rep, "event");
				return `This isn't an opportunity that will come again. <span class="red">You call in every favor you have.</span> You'll have to rebuild your reputation later.`;
			}

			App.Events.addParagraph(node, [
				`Finally, you could use money to influence the Council. Everyone who's likely to accept a seat is wealthy, so even you don't have the financial resources to buy votes, and many of the attendees are the type of people who would take offense at any attempt to bribe them on a subject as important as the future of Chattel Religionism. You could, however, host the Council as opulently as possible, and turn it into a simultaneous religious festival for all your citizens and any Chattel Religionist people who feel like visiting. A holiday atmosphere you created should buttress your position with the Council.`
			]);
			const festivalCost = 50000;
			App.Events.addResponses(node, [
				new App.Events.Result(`Just host the Council`, just),
				new App.Events.Result(`Host a festival to coincide with their arrival`, festival, `This will cost ${cashFormat(festivalCost)}`)
			]);

			function just() {
				return `The Council doesn't need the distraction of a lot of less important people enjoying themselves loudly nearby, so you decide not to broaden the event.`;
			}

			function festival() {
				V.nicaea.influence += 1;
				cashX(-festivalCost, "event");
				return `Good works will spread the joy of a Chattel Religionist revival, and make you even more influential with the Council. You plan a public festival as part of the event.`;
			}
		}
	}
};
