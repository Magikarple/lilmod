App.Events.recRacerLoser = class recRacerLoser extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Racer Loser";
	}

	execute(node) {
		const slave = makeSlave();
		const {he, his, him, girl, woman} = getPronouns(slave);
		let r = [];

		r.push(`Coming to your desk in the morning, you see that your assistant has flagged an interesting news item for you to check out. Looks like the monthly final in the slave racing league was yesterday. With the push of a button on the keyboard, you check out the rankings and then choose to display a video of the race's end — with a very pretty young woman crossing the finish line, immediately followed by half a dozen further slaves. It is quite a show since of course, all of them are naked — or almost so, as anything but smallish breasts make sports bras a necessity.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Whatever your predecessor's faults, he surely did something very right in endorsing the slave racing league when it started to establish itself way back when. These days, many of your residents regularly watch the races going on — and that number rises to include a clear majority in the arcology for the special events that are also in the organizer's program. An absolute favorite of the population is the 'vestalian hunt', in which a dozen virgins are chased along the track by very well-hung dick-girls. Anyone falling behind soon has their cherry taken in the most public way possible, right on the track. Only the quickest manage to make it to the finish line at all without being wrestled down and pounded hard. Quite a risk, with the slave's precious virginity being sacrificed this way, but of course those who make it win their owners large sums of prize money. You've just switched over to see a re-play of the action, seeing the camera move past the very attractive lineup of the race, when your communicator rings with an incoming call.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`As fate has it, the person calling is the owner of the local race-track, wanting to offer you a deal. It turns out that he wants to sell one of his well-known virgin runners to you. When you ask him why, he is slightly surprised that you don't know already — turns out, the young ${woman} got caught by an especially motivated chaser during the race yesterday, wrestling ${him} to the ground and taking ${his} virginity with their thick shaft. While a great athlete like ${him} usually still would have a place in his stable, the race track's resident doctor just confirmed that ${he}'s pregnant. With abortion being out of the question — as the fans would see that as scandalous cheating defeating the purpose of the virgin race — the owner now wants to sell ${him} before ${his} fame fades.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The young ${woman} is really pretty and tall, if a bit plain in the breast department. With the moderate fame ${he} has earned during ${his} racing career and its spectacular end, ${he}'d draw raised interest if used as a whore. Due to the fact that ${he}'s no longer a virgin, pregnant, and not really trained in sex acts, you could likely negotiate a bit and get ${him} for ${cashFormat(5000)}.`, "note"));

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
			r.push(`After some negotiations with the race track owner, you finally agree on a good price. After he tells his subordinates to bring the ${girl} to you, the two of you chat a bit about business matters and you're invited to the owner's booth for the next big race. A short while later, guards bring in the young athlete, dressed in a cute yet revealing white dress, the 'showing off' outfit used for virgin runners — or ex-virgins, in ${his} case. On your orders, ${he} obediently takes it off, letting the thin fabric fall to the floor, then submits to biometric scanning, registering ${him} as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.disableDisability = 1;
			if (V.pedo_mode === 1) {
				pram.minAge = V.fertilityAge;
				pram.ageOverridesPedoMode = 1;
			} else {
				pram.minAge = Math.max(11, V.fertilityAge);
				pram.maxAge = 21;
			}
			const slave = GenerateNewSlave("XX", pram);
			slave.origin = "$He was a virgin runner in the slave races before being sold to you.";
			slave.prestige = 1;
			slave.prestigeDesc = "After $his short but very promising slave racing career, during which $he made it through several competitions as a virgin, many people fondly remember fantasizing about taking $him.";
			slave.devotion = random(15, 25);
			slave.trust = random(15, 25);
			setHealth(slave, jsRandom(30, 60), undefined, undefined, 0, 10);
			slave.face = random(20, 60);
			slave.skill.vaginal = 0;
			slave.skill.anal = random(0, 15);
			slave.skill.oral = random(0, 15);
			slave.skill.whoring = 0;
			slave.boobs = random(1, 4) * 100;
			slave.vagina = 1;
			slave.labia = 1;
			slave.ovaries = 1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.natural.height = random(180, 200);
			slave.height = Height.forAge(slave.natural.height, slave);
			slave.hips = -1;
			slave.butt = 0;
			slave.anus = 0;
			slave.weight = 0;
			slave.muscles = 20;
			slave.shoulders = 0;
			slave.intelligence = random(-50, 50);
			slave.skill.entertainment = 15;
			slave.career = "an athlete";
			slave.fetish = "submissive";
			slave.behavioralFlaw = "anorexic";
			slave.behavioralQuirk = "fitness";
			slave.sexualQuirk = "tease";
			slave.sexualFlaw = "none";
			slave.trueVirgin = 1;
			slave.preg = 1;
			slave.pregWeek = 1;
			slave.pregType = 1;
			slave.pregKnown = 1;
			WombImpregnate(slave, slave.pregType, slave.pregSource, 1);
			return slave;
		}
	}
};
