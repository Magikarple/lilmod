App.Events.recOverwhelmedFarmgirl = class recOverwhelmedFarmgirl extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0,
			() => V.seeHyperPreg === 1,
			() => (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	get eventName() {
		return "Overwhelmed Farmgirl";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, His,
			he, his, him, girl} = getPronouns(slave);
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];

		r.push(`Your desk flags a video message as having potential. It's a rather homely farmer begging for you to enslave ${him}, not truly unusual given the ever-increasing droughts and dangerous weather patterns. Given the huge stomach rounding out ${his} worn clothing, ${he} is likely ready to drop quints and desperately seeking any sort of future for them. You allow ${him} to speak ${his} plea.`);
		r.push(Spoken(slave, `"Please ${title.toLowerCase()}, I just can't go on out here. I'm always hungry and can barely even work with this belly in the way. I swear, it gets heavier every day and a life of physical labor just won't let me get by. I don't know what I'll do if you say no, so please, have mercy on a poor farmer."`));

		App.Events.addParagraph(node, r);
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`${He} barely manages to waddle into your penthouse before crashing onto your couch with permission. ${He} willingly places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement. ${He} looks almost relieved.`);
			r.push(Spoken(slave, `"I traded my virginity for bread and look what it got me. I'm so glad you took me in, I don't know how I would have carried on in a few months, I mean look at me."`));
			r.push(`${He} gestures to ${his} gravid bulge. 'A few months'? You probe further.`);
			r.push(Spoken(slave, `"Huh? Oh, yes... I'm only four months along... You can see why I needed this now, right? I'm bigger than every other girl I've ever seen and I'm not even halfway there. You saved my life, even if you, um, get rid of them, you still saved me. So thank you."`));
			r.push(`You can't believe what you are hearing, but a quick sonogram confirms it. Both you and ${him} stare in shock at the sheer number of children growing in ${his} womb. A rough estimate places their count at a staggering one-hundred-and-fifty.`);
			r.push(Spoken(slave, `"...No way... There can't be that many in me..."`));
			slave.geneticQuirks.fertility = 2;
			slave.geneticQuirks.hyperFertility = 2;
			slave.preg = 16;
			slave.pregType = 150;
			slave.pregWeek = slave.preg;
			SetBellySize(slave);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} barely manages to waddle into your penthouse before asking to have a seat on your couch. You decline, since ${he} is clearly so skilled at carrying children, ${he} will spend the rest of ${his} enslavement as a volume breeder. ${His} gaze falls to the floor, this at least means ${he}'ll be fed and get to have ${his} children. ${He} cooperates to having ${his} biometric readings taken and logged, before being seated in a wheelchair and taken to ${his} new home.`);
			r.push(`Hours later, you receive a brief message from the facility that purchased ${him}. "150. One hundred and fifty babies. That is how many are crammed into that ${girl}. ${He} was a mere sixteen weeks along. If ${he} lives through this, we may have a record breaking breeder on our hands. Felt the need to pass that along, you might have made us quite a profit this year."`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 16, maxAge: 24,
				ageOverridesPedoMode: 1, disableDisability: 1
			});
			slave.origin = "$He sold $himself into slavery to feed $himself and $his growing brood.";
			slave.career = "a farm laborer";
			generateSalonModifications(slave);
			setHealth(slave, jsRandom(-35, 10), -1, -1, -1, 50);
			slave.devotion = random(35, 45);
			slave.trust = random(15, 25);
			slave.oldDevotion = slave.devotion;
			slave.face = -15;
			slave.vagina = 1;
			slave.anus = 0;
			slave.weight = random(-80, -50);
			slave.muscles = 20;
			slave.underArmHStyle = "bushy";
			slave.pubicHStyle = "bushy";
			slave.boobs = 700;
			slave.natural.boobs = 450;
			slave.boobShape = "torpedo-shaped";
			slave.nipples = "puffy";
			slave.lactation = 1;
			slave.lactationDuration = 2;
			slave.vaginaLube = 1;
			slave.butt = 3;
			slave.sexualQuirk = "caring";
			slave.bellySag = 20;
			slave.bellySagPreg = 20;
			slave.pubertyXX = 1;
			slave.waist = 5;
			if (slave.accent > 2) {
				slave.accent = 2;
			}
			slave.preg = 40;
			slave.pregType = 5;
			slave.pregKnown = 1;
			slave.pregWeek = slave.preg;
			slave.belly = 80000;
			slave.bellyPreg = 80000; // bait and switch!
			slave.pregAdaptation = 750;
			slave.ovaries = 1;
			return slave;
		}
	}
};
