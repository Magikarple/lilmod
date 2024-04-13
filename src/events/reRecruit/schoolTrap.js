App.Events.recSchoolTrap = class recSchoolTrap extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0,
			() => V.cash > 20000
		];
	}

	get eventName() {
		return "School Trap";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, himself, girl} = getPronouns(slave);
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];
		App.UI.StoryCaption.encyclopedia = "Slave Schools";
		r.push(`A young slave is going door to door offering ${himself} for sale on behalf of ${his} owner. It's rare to see a slave obedient enough to be entrusted with ${his} own sale, and ${he}'s interesting, so you let ${him} up. ${He} stands in front of your desk and waits for instructions. ${He}'s wearing a very skimpy schoolgirl skirt and a white blouse so tight and brief that the tops of ${his} areolae are visible. Something is tenting the front of ${his} skirt slightly. The badge on ${his} blouse identifies ${him} as a product of one of the Free Cities' legal slave orphanages. You instruct ${him} to tell you about ${himself}.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"I was raised and trained by a slave orphanage, ${title.toLowerCase()}. It is not legal to own underage ${girl}s, but it is legal to charge an orphan for the costs of raising ${him} when ${he} reaches ${V.minimumSlaveAge}, and those debts are always high enough to enslave ${him}. My ${ordinalSuffix(slave.actualAge)} birthday was yesterday, ${(slave.actualAge === V.minimumSlaveAge) ? `so I am a slave and for sale now` : `so I'm too old to stay at the orphanage any longer`}."`));
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"I have been trained for obedience since I came to the orphanage. I came as a male, but they reassigned me to female right away. At ${Math.min(14, slave.actualAge - 4)} they put me on drugs to make sure I'd grow nice T&A and look more feminine. Those drugs also stopped my penis from growing much, so it's small, ${title.toLowerCase()}. On my ${ordinalSuffix(Math.min(16, slave.actualAge - 2))} birthday I got my first set of implants. Every time my chest got used to the implants, I got sent in for a bigger set. I'm on my third set."`));
		r.push(`${He} unbuttons ${his} blouse and displays a pair of fake tits.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${He} hikes up ${his} skirt and spins around slowly, displaying a petite, half-hard cock.`);
		r.push(Spoken(slave, `"The drugs also made my butt bigger and my hips wider. ${(slave.actualAge === V.minimumSlaveAge) ? `Since it wasn't okay to fuck me before I had turned ${V.minimumSlaveAge} and been made a slave` : `Since my owner thought it would make me more desirable`}, my anus has never had anything up it, ${title.toLowerCase()}."`));
		r.push(`${He} pulls ${his} buttocks apart to prove it.`);
		r.push(Spoken(slave, `"I... I would be happy to serve you like I am now ${title.toLowerCase()}, or you could send me for surgery to give me a pussy instead, I would like that too, ${title.toLowerCase()}."`));
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"I cost ${cashFormat(2500)}, ${title.toLowerCase()}."`));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 2500;
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
			r.push(`${He} thanks you profusely for purchasing ${him}, and ${he} means it. ${He}'s happy to have been bought by a real master, and to go by the stiffness of ${his} little dick, looking forward to finally taking it up the ass.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {
				minAge: Math.max(V.minimumSlaveAge, 10), maxAge: 16, disableDisability: 1, ageOverridesPedoMode: 1
			});
			slave.origin = "$He was raised in a radical slave school that treated $him from a very young age, up to the point that $he never experienced male puberty.";
			slave.career = "a slave";
			slave.devotion = random(25, 45);
			slave.trust = random(25, 45);
			setHealth(slave, jsRandom(50, 60), undefined, undefined, 0, 0);
			slave.weight = 0;
			slave.face = 15;
			slave.boobs = random(5, 6) * 100;
			slave.boobsImplant = 400;
			slave.boobsImplantType = "normal";
			slave.butt = random(2, 3);
			slave.buttImplant = 1;
			slave.buttImplantType = "normal";
			slave.dick = 1;
			if (slave.foreskin > 0) {
				slave.foreskin = slave.dick;
			}
			if (slave.balls > 0) {
				slave.scrotum = slave.balls;
			}
			slave.balls = 1;
			slave.anus = 0;
			slave.clit = 0;
			slave.skill.oral = 0;
			slave.skill.anal = 0;
			slave.hLength = 5 * random(10, 18); // 50-90cm
			slave.hStyle = "tails"; // custom hairstyle replaced with dictionary item, original dummied out for record-keeping
			// slave.hStyle = "long and in twin schoolgirl tails";
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.pubertyXY = 0;
			slave.pubertyAgeXY = 50;
			slave.birthWeek = 0;
			return slave;
		}
	}
};
