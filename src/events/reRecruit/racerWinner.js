App.Events.recRacerWinner = class recRacerWinner extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Racer Winner";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, girl, woman} = getPronouns(slave);
		let r = [];

		r.push(`Coming to your desk in the morning, you see that your assistant has flagged an interesting news item for you to check out. Looks like the monthly final in the slave racing league was yesterday. With the push of a button on the keyboard, you check out the rankings and then choose to display a video of the race's end — with a very pretty young woman crossing the finish line, immediately followed by half a dozen further slaves. It is quite a show since of course, all of them are naked — or almost so, as anything but smallish breasts make sports bras a necessity.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Whatever your predecessor's faults, he surely did something very right in endorsing the slave racing league when it started to establish itself way back when. These days, many of your residents regularly watch the races going on — and that number rises to include a clear majority in the arcology for the special events that are also in the organizer's program. An absolute favorite of the population is the 'vestalian hunt', in which a dozen virgins are chased along the track by very well-hung dickgirls. Anyone falling behind soon has their cherry taken in the most public way possible, right on the track. Only the quickest manage to make it to the finish line at all without being wrestled down and pounded hard. Quite a risk, with the slave's precious virginity being sacrificed this way, but of course those who make it win their owners large sums of prize money. You've just switched over to see a re-play of the action, seeing the camera move past the very attractive lineup of the race, when your communicator rings with an incoming call.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`As fate has it, the person calling is the owner of the local race-track, wanting to offer you a deal. It turns out that he wants to sell one of his very prestigious virgin runners to you. ${He}'s been the champion of the race track for three years in a row now, the virgin queen of the slave${girl} sprinters... so the man decided he'd maximize his profit by selling ${him} at the height of ${his} popularity instead of chancing a loss in the next big race. It's a young ${woman}'s sport, and with new talent being trained, he feels it's time to give the`);
		if (slave.actualAge >= 20) {
			r.push(`young adult`);
		} else if (slave.actualAge >= 13) {
			r.push(`teenaged`);
		} else {
			r.push(`pre-teen`);
		}
		r.push(`slave${girl} a new purpose. There are numerous interested parties in buying ${him} of course, but out of respect he is coming to you first.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The young ${woman} is really pretty and tall, if a bit plain in the breast department. With the fame ${he} has earned during ${his} racing career, ${he}'d draw quite a bit of interest if used as a whore. The price for ${him} reflects that of course — you doubt you can get a price under ${cashFormat(10000)}.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 10000;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`After some negotiations with the race track owner, you finally agree on a good price. After he tells his subordinates to bring the ${girl} to you, the two of you chat a bit about business matters and you're invited to the owner's booth for the next big race. A short while later, guards bring in the virgin athlete, dressed in a cute yet revealing white dress, highlighting ${his} pureness and virginity. On your orders, ${he} readily takes it off, letting the thin fabric fall to the floor, then submits to biometric scanning, registering ${him} as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: Math.min(21, Math.max(11, V.minimumSlaveAge) + 3),
				maxAge: 24,
				disableDisability: 1
			});
			slave.origin = "$He was a famous virgin runner in the slave races before being sold to you.";
			slave.prestige = 2;
			slave.prestigeDesc = "For years, $he delighted the watchers of slavegirl racing with winning competition after competition with $his virginity intact.";
			slave.devotion = random(15, 25);
			slave.trust = random(10, 20);
			setHealth(slave, jsRandom(30, 60), undefined, undefined, 0, 0);
			slave.face = random(20, 60);
			slave.skill.vaginal = 0;
			slave.skill.anal = random(0, 15);
			slave.skill.oral = random(0, 15);
			slave.skill.whoring = 0;
			slave.boobs = either(100, 200, 300);
			slave.vagina = 0;
			slave.trueVirgin = 1;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.natural.height = random(180, 200);
			slave.height = Height.forAge(slave.natural.height, slave);
			slave.shoulders = random(-1, 1);
			slave.hips = -1;
			slave.butt = 0;
			slave.anus = 0;
			slave.weight = 0;
			slave.muscles = 50;
			slave.intelligence = random(-15, 50);
			slave.skill.entertainment = 35;
			slave.career = "an athlete";
			slave.fetish = "pregnancy";
			slave.behavioralFlaw = "arrogant";
			slave.behavioralQuirk = "fitness";
			slave.sexualQuirk = "tease";
			slave.sexualFlaw = "none";
			return slave;
		}
	}
};
