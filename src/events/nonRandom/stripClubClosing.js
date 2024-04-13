App.Events.PStripClubClosing = class PStripClubClosing extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	get eventName() {
		return "Strip Club Closing";
	}

	execute(node) {
		let r = [];
		V.eventResults.strip = 1;
		r.push(`It's been a good few weeks, getting settled in as owner of ${V.arcologies[0].name}. The power of being overlord of this great building and everyone in it is incredible, but so is the responsibility. It's a good thing you have ample opportunities for stress relief. You're going to need them after today. There's a nasty disturbance on a business level of the arcology. Normally, the arcology's public safety drones would suppress this kind of nonsense, but ${V.assistant.name} program is suggesting that you resolve the dispute.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`As you step off the elevator, you hear several`);
		if (V.seeDicks !== 100) {
			r.push(`female`);
		}
		r.push(`voices shouting. Apparently one of ${V.arcologies[0].name}'s few remaining strip joints has closed. It was a topless bar and strip club all in one, but the owner is packing up his things. He's explaining to a crowd of his angry former employees that he can't make ends meet. As the price of a slave whore is barely higher than that of a lap dance from a free stripper, it's not surprising. It looks like the former dancers are on the verge of trashing the place.`);

		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Offer to take them in`, takeIn),
			new App.Events.Result(`Offer them severance pay`, pay, `This will cost ${cashFormat(1000)}`),
			new App.Events.Result(`Offer to set them up independently`, setUp, `This will cost ${cashFormat(500)}`),
		]);

		function takeIn() {
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();
			return `The now-unemployed strippers are not impressed by your offer to take them in. "What," one of them says, "be one of your shivering little cunts? You'd have us signing ourselves into slavery inside two weeks. Fuck off, we'll take the streets." Under the nonlethal riot cannons of the security drones, they file off, muttering mutinously. Unfortunately, you don't have any pretense to enslave or imprison them.`;
		}

		function pay() {
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();
			const el = new DocumentFragment();
			let r = [];
			r.push(`You have a word with them, stepping closer and speaking quietly to defuse the situation. You tell them you're aware that they're in a difficult place, but you also explain that the Free Cities are a new and changing place. No one can rely on the old way of doing things any more. You offer to pay each of them a small stipend to help tide them over until they find other employment. They're surprised at your munificence but <span class="green">accept it with gratitude.</span>`);
			App.Events.addNode(el, r);
			repX(2000, "event");
			cashX(-1000, "event");
			V.eventResults.strip = 2;
			return el;
		}

		function setUp() {
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();
			const el = new DocumentFragment();
			let r = [];
			r.push(`You offer a way out of their situation. They, you suggest, can keep working in the now-vacant shop if they work together to pay the rent. They can move into a couple of vacant rooms nearby that you can easily have set up as a bunkhouse. You'll collect a little more rent, and they'll have a second chance. They <span class="green">accept it with gratitude.</span> It's quite likely they'll either fail or have to accept being whores rather than strippers, but that's not your concern. <span class="green">Your arcology's prosperity has increased.</span>`);
			App.Events.addNode(el, r);
			V.arcologies[0].prosperity++;
			repX(500, "event");
			cashX(-500, "event");
			V.eventResults.strip = 3;
			return el;
		}
	}
};
