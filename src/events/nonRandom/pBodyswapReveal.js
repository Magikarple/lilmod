App.Events.PBodyswapReveal = class PBodyswapReveal extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() > 45,
			() => V.bodyswapAnnounced === 0,
			() => V.surgeryUpgrade === 1,
		];
	}

	execute(node) {
		V.nextButton = "Continue";

		V.bodyswapAnnounced = 1;
		App.Events.addParagraph(node, [`You receive countless messages throughout the day; mostly worthless spam, several uninteresting business offers and the occasional enslavement request. This one catches your eye however. It's an offer from a top surgeon who has recently been experimenting with radical new surgeries. You've been loosely following their work for the last few weeks, ever since they successfully swapped the consciousness from one slave to another with minimal side effects, assuming they are kept on a special suppressant, and it seems they are now offering their work to anyone with a surgical suite capable of performing the surgery and willing to undertake the risk.`]);

		App.Events.addParagraph(node, [`It's an interesting offer and your remote surgery will suffice should you want to change up your slaves' bodies more than any drug or implant ever could. You'll need a slave to swap them with, however. Perhaps one of the mindless slaves from the Flesh Heap will suit your needs, should you not wish to use your own stock.`]);
	}
};
