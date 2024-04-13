App.Events.REBusyClub = class REBusyClub extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Entity.facilities.club.employeesIDs().size > 3
		];
	}

	execute(node) {
		App.Events.addParagraph(node, [`The original designers of the modern arcology did not realize how inseparable from slavery their work would become. The club at the social heart of ${V.arcologies[0].name} was not meant as a center of the more friendly kind of sexual slavery, but that is what it has become. Free whores of the highest quality work there, and they are accompanied by a flock of your slaves who have simple orders to dance, add cheer, and perform sexual favors wherever they can.`]);
		App.Events.addParagraph(node, [`Offering slaves for free sex would become unmanageable if the club where your public servants work was open to the unwashed masses, but it is not. The arcology is already selective, and only good citizens can party, dance, and fuck the night away in ${V.clubName}. The upper classes <span class="reputation inc">recognize your contributions</span> to arcology culture, which you could probably parlay into an even greater benefit.`]);

		repX(500, "event");

		App.Events.addResponses(node, [
			new App.Events.Result("Sponsor a special event in the club", sponsor, `This will cost ${cashFormat(2000)}`),
			new App.Events.Result("Host a business exposition", host, `This will cost ${cashFormat(5000)}`),
		]);

		function sponsor() {
			cashX(-2000, "event");
			repX(2500, "event");
			return `The Free Cities are new, and so is their culture. There are new traditions, new expectations, and now, new holidays. One morning, the upper classes of the arcology are surprised and gratified to find that the club has been specially decorated, and all the club sluts are nude. The floor of the club is typically meant for dirty dancing and some light sex, not public penetrative intercourse. Not today; today is special. The festivities <span class="reputation inc">greatly improve your renown;</span> you have set a high bar for what a wealthy arcology owner should do.`;
		}
		function host() {
			cashX(-5000, "event");
			V.arcologies[0].prosperity += 2;
			repX(2500, "event");
			return `With the world economy in a perilous state, the Free Cities are one of the few remaining areas where innovation and new business opportunities still appear. The novel markets associated with the slave trade only reinforce this trend, offering a cornucopia of opportunities for the clear-eyed investor with liquid assets. Every other week there is news of a new fortune being made from smart investments in leather, in human growth hormones, or in psychoactive drugs. You host an exposition for slave services centered on the club, with your slaves serving as greeters who are eager to ensure that all the little wants of visiting notables are thoroughly satisfied. The optimistic outlook projected by this event <span class="green">improves ${V.arcologies[0].name}'s business prospects</span> and even <span class="reputation inc">reflects well on you personally.</span>`;
		}
	}
};
