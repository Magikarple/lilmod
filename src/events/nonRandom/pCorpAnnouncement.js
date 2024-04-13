App.Events.PCorpAnnouncement = class PCorpAnnouncement extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.cash > 120000,
			() => V.rep > 4000,
			() => V.corp.Announced === 0,
		];
	}

	execute(node) {
		V.nextButton = "Continue";

		V.corp.Announced = 1;
		App.Events.addParagraph(node, [`You never understood the power of money until accumulating so much of it yourself. If you were to try to explain it to someone without that power, you would emphasize the access it buys you. You can speak to anyone, about anything; propose anything, to anyone. And recently, you have begun to encounter the trouble of being too powerful.`]);

		App.Events.addParagraph(node, [`Good investment opportunities are hard to come by in the uncertain world of today. The days of government bonds providing steady yields are ending. Markets are volatile, and under attack by forces they cannot begin to control or anticipate. In places, the very consensus on modern capitalism that has held for nearly fifty years is under siege. There's one reliable growth market in the Free Cities: slaves. And there's too much capital chasing too few investment opportunities in that market.`]);

		App.Events.addParagraph(node, [`Reviewing the situation from your desk, the nerve center of your growing empire, you think to yourself: why not? You have the reputation and the capital to become a major player in the slave market, just for the asking. If you announced the incorporation of a publicly traded company dedicated to the industry of slavery, Free Cities investors would be lining up, cash in hand, ready to buy stock.`]);
	}
};
