App.Events.SEProjectNTechRelease = class SEProjectNTechRelease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.status >= 6,
			() => V.projectN.status !== 9,
			() => V.projectN.decisionMade !== 1,
			() => App.Events.effectiveWeek() >= V.projectN.phase4 + 5
		];
	}

	execute(node) {
		App.Events.addParagraph(node, [`Project N is complete. You've successfully engineered the world's first natural catgirl, ${V.subjectDeltaName}, whose face you occasionally see splayed out on some media report excitedly detailing "new scientific innovations". Despite the unwanted attention from radicals and terrorists the project generated, seeing your face displayed in the news as a patron of progress certainly helps to make it feel as though it was all worth it in the end.`]);
		App.Events.addParagraph(node, [`But even though the project's been finished, you still have one last decision to make. Media attention in the wake of ${V.subjectDeltaName}'s release has generated significant public interest in the technologies and documentation used in project N, and as the sole proprietor of the tech, you've received generous offers from other arcology owners interested in creating their own catgirls along with public petitions to release all documents for public use. If you don't release the project N tech now, it's possible that a competitor might figure out how to engineer their own catgirls in the future, so if you want to capitalize on the short-lived media craze for either public face or money, it'd be best to make a decision on the matter immediately.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Release the Project N documentation and technology for free`, free));
		choices.push(new App.Events.Result(`Patent the Project N technologies and sell them selectively to other wealthy elites`, patent));
		choices.push(new App.Events.Result(`Hoard the Project N technologies to yourself to create a monopoly on catgirl production`, secret, `(WARNING: This decision will PERMANENTLY DISABLE any natural generation of catgirls outside the ones you create yourself.)`));
		App.Events.addResponses(node, choices);

		function free() {
			repX(3000, "event");
			V.projectN.decisionMade = 1;
			V.projectN.techReleased = 1;
			return `You opt to release the project N technologies for free public use, a decision you announce in a brief media conference the next day. The unexpectedly generous decision is met with <span class="green">praise</span> by the general public, although, of course, the only people who have the capital to actually apply the tech will be other exclusive plutocrats. You're sure that at least some nerd in his basement is going to use your open-source code to try and grow a catgirl in his basement, though. Godspeed.`;
		}

		function patent() {
			cashX(80000, "project N tech sale");
			V.projectN.decisionMade = 1;
			V.projectN.techReleased = 1;
			return `You create a patent on the project N technologies and sell them to a select few arcology owners, mostly friends of yours. Although mildly disappointing to some who hoped for an open-source release, this is more or less business as usual in the free cities, and you get to <span class="green">line your own pockets</span> while other elites prepare their own labs to corner the emerging demand for catgirl slaves alongside you. The rich get richer. Just another day in paradise.`;
		}

		function secret() {
			V.projectN.decisionMade = 1;
			repX(-1500, "event");
			return `You opt to leave the other elites completely out of it and refuse to sell or release the project N technologies at all. This decision is seen as <span class="red">open greed</span> by both the general public and other wealthy elites, who make a point of bashing you over the choice on major news networks. Although you've ruffled some feathers by choosing to corner the market yourself, you now have a total monopoly on catgirl production, and as long as you can keep Nieskowitz and the other scientists churning out catgirls, you could make an absolute killing as their sole proprietor...`;
		}
	}
};
