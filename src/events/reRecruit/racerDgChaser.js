App.Events.recRacerDgChaser = class recRacerDgChaser extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0
		];
	}

	get eventName() {
		return "Racer Dickgirl Chaser";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, hers, girl} = getPronouns(slave);
		let r = [];

		r.push(`Coming to your desk in the morning, you see that your assistant has flagged an interesting news item for you to check out. Looks like the monthly final in the slave racing league was yesterday. With the push of a button on the keyboard, you check out the rankings and then choose to display a video of the race's end — with a very pretty young woman crossing the finish line, immediately followed by half a dozen further slaves. It is quite a show since of course, all of them are naked — or almost so, as anything but smallish breasts make sports bras a necessity.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Whatever your predecessor's faults, he surely did something very right in endorsing the slave racing league when it started to establish itself way back when. These days, many of your residents regularly watch the races going on — and that number rises to include a clear majority in the arcology for the special events that are also in the organizer's program. An absolute favorite of the population is the 'vestalian hunt', in which a dozen virgins are chased along the track by very well-hung dick-girls. Anyone falling behind soon has their cherry taken in the most public way possible, right on the track. Only the quickest manage to make it to the finish line at all without being wrestled down and pounded hard. Quite a risk, with the slave's precious virginity being sacrificed this way, but of course those who make it win their owners large sums of prize money. You've just switched over to see a re-play of the action, seeing the camera move past the very attractive lineup of the race, when your communicator rings with an incoming call.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`As fate has it, the person calling is the owner of the local race-track, wanting to offer you a deal. It turns out that he wants to sell one of his dick-girls to you at a fairly reasonable price. When you ask for a reason, the man replies, "Well, ${he}'s a crowd-pleaser alright with that big dick of ${hers}, but... a bit headstrong. You see, ${he} punched one of the other girls when they grabbed a virgin at the same time. ${He}'s been a distraction for the rest of the team, so I think it's best to remove ${him} and bring in new talent." He then sends you ${his} file to review, including more than a few videos of ${him} 'in action' on the racetrack — both running as well as fucking.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The dickgirl does have an impressive physique and is tall, fast on the track and has a whopping big dick. ${He} has some prestige from appearing in the races, but with the control issues, you could likely negotiate a bit and get ${him} for ${cashFormat(5000)}.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 5000;
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
			r.push(`After some negotiations with the race track owner, you finally agree on a good price. After he tells his subordinates to bring the ${girl} to you, the two of you chat a bit about business matters and you're invited to the owner's booth for the next big race. A short while later, guards bring in the dickgirl athlete, dressed in nothing but a long bathrobe and with a slightly sullen look on ${his} face. Seems like ${he} was brought here from ${his} former owner's premises without so much as a warning or chance to put on any clothes. He really must have wanted ${him} out of his racing stable quickly. On your orders, ${he} pushes the robe over ${his} shoulders and lets it fall to the floor, then submits to biometric scanning, registering ${him} as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {minAge: 19, maxAge: 22, disableDisability: 1});
			slave.origin = "$He was a dickgirl chaser in the slave races before being sold to you.";
			slave.prestige = 1;
			slave.prestigeDesc = "Many people remember $him from the slavegirl races where $he slammed $his cock into countless runners' pussies after catching them.";
			slave.devotion = random(-15, 10);
			slave.trust = random(-20, 10);
			setHealth(slave, jsRandom(30, 50), undefined, undefined, 0, 0);
			slave.shoulders = random(1, 2);
			slave.face = random(20, 60);
			slave.skill.vaginal = 0;
			slave.skill.anal = random(0, 15);
			slave.skill.oral = random(0, 15);
			slave.skill.penetrative = jsRandom(50, 70);
			slave.skill.whoring = 0;
			slave.boobs = random(1, 4) * 100;
			slave.vagina = -1;
			slave.ovaries = 0;
			slave.preg = -1;
			slave.anus = 0;
			slave.dick = random(4, 5);
			slave.balls = random(3, 4);
			slave.scrotum = slave.balls;
			slave.natural.height = random(180, 200);
			slave.height = Height.forAge(slave.natural.height, slave);
			slave.weight = 0;
			slave.muscles = 50;
			slave.intelligence = random(-50, 50);
			slave.career = "an athlete";
			slave.fetish = "dom";
			slave.behavioralFlaw = "arrogant";
			slave.behavioralQuirk = "fitness";
			slave.sexualQuirk = "perverted";
			slave.sexualFlaw = "judgemental";
			return slave;
		}
	}
};
