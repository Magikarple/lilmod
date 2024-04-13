App.Events.recOrphanFemboy = class recOrphanFemboy extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0
		];
	}

	get eventName() {
		return "Orphan Femboy";
	}

	execute(node) {
		const slave = makeSlave();
		const {he, him, himself} = getPronouns(slave);
		const title = (V.PC.title !== 0) ? `Sir` : `Ma'am`;
		let r = [];

		r.push(`An invitation to a 'visitation day' at an orphanage in the arcology pops up in your in-box, prompting you to make some room in your schedule to go have a look. Run by a well-meaning non-profit organization active in numerous of the Free Cities, the facility does house quite a few orphans (both local and saved from the chaos of the old world), doing excellent work in teaching them and finding new homes. Still, with times being what they are, the people running things do have a... realistic outlook, in the end. And so, in order to keep the orphanage going, those living there who aren't adopted till they reach maturity are sold as slaves. Legally this practice is easily arranged, as the life-debt for any of the orphans builds up over the years, pretty much automatically putting them over the limit for enslavement.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Knowing what's coming, the teachers in the facility do train their pupils accordingly and try to instill obedience and acceptance into those soon reaching eighteen years of age, and the young man you're shown in short notice is said to be a good student and receptive for his lessons. It is quite obvious why he hasn't been adopted so far — the eighteen year old is relatively small in stature and his face was too pretty and feminine to appeal to anyone wanting to add a male child to their family. For your uses on the other hand, he's perfect. With a little bit of training, this teen will make an excellent dickgirl. Approaching him, you question the soon-to-be slave a little, finding him nervous but fairly obedient to commands. Testing out his limits, you have him pull down his pants right then and there, revealing that there's one part of his body that's not at all small — his dick. When you pose the question what he'd think about becoming a dickgirl, he is speechless at first, then after a pointed stare stammers out,`);
		r.push(Spoken(slave, `"I — um, I'd do my best, ${title.toLowerCase()}!"`));
		r.push(App.UI.DOM.makeElement("span", `Satisfied, you leave him be and have a short discussion with an administrator, who establishes the young man's — or rather dickgirl's — asking price at ${cashFormat(1500)}.`, "note"));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addParagraph(node, r);
		const contractCost = 1500;
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
			r.push(`Transferring the money with a few clicks on your smartphone, you have your new acquisition brought to your penthouse. ${slave.slaveName} does look rather afraid at the whole business of actually being sold, but ${he} follows your instruction obediently to get naked and let ${himself} be biometrically scanned and registered as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {
				minAge: 18, maxAge: 18,
				ageOverridesPedoMode: 1, disableDisability: 1
			});
			generateSalonModifications(slave);
			slave.origin = "$He was in an orphanage until reaching maturity, at which point $he was sold to you.";
			slave.devotion = random(10, 40);
			slave.trust = random(-25, 0);
			setHealth(slave, jsRandom(10, 40), undefined, undefined, undefined, 0);
			slave.face = random(20, 60);
			if (slave.faceShape === "masculine") {
				slave.faceShape = "cute";
			}
			slave.skill.vaginal = 0;
			slave.skill.anal = 15;
			slave.skill.oral = 35;
			slave.skill.entertainment = 0;
			slave.skill.penetrative = 0;
			slave.skill.whoring = 15;
			slave.boobs = 200;
			slave.dick = random(3, 4);
			slave.balls = random(2, 3);
			slave.scrotum = slave.balls;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.natural.height = random(140, 170);
			slave.height = Height.forAge(slave.natural.height, slave);
			slave.hips = random(-1, 0);
			slave.butt = 1;
			slave.anus = 1;
			slave.weight = random(-80, -20);
			slave.waist = random(-40, 0);
			slave.muscles = 0;
			slave.shoulders = random(-1, 0);
			slave.intelligence = random(-50, 50);
			slave.career = "an orphan";
			slave.fetish = "humiliation";
			slave.behavioralQuirk = either("adores men", "adores women", "funny", "insecure");
			slave.sexualQuirk = either("caring", "gagfuck queen", "strugglefuck queen", "tease", "unflinching");
			return slave;
		}
	}
};
