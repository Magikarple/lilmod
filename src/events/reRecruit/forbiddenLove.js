App.Events.recForbiddenLove = class recForbiddenLove extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.rep > 16000,
			() => (random(1, 100) < V.rep/1000) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
			() => V.cash >= 100000
		];
	}

	get eventName() {
		return "Forbidden Love";
	}

	execute(node) {
		const slave = makeSlave();
		const {he, his, him, daughter} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];

		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, are lucrative deals with powerful individuals.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness and not someone of high society. This call, as you would expect, is different. The moment the person on the other end introduces themselves you immediately recognize why your assistant brought this to your attention. The caller is the King of an old world kingdom, contacting you by an untraceable means due of the conspiratorial nature of his proposal.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`He explains that his ${daughter}, the princess, attempted to marry a man of improper station, and was deflowered by him. For this, ${his} would-be fiancé was executed and ${he} confined to a cell. Finding his ${daughter} impossible to deal with after killing ${his} boyfriend, he's decided he'd rather just be rid of ${him} than have to continue carrying the shame of having such an unruly slut as a member of the royal family.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `His offer stands at a firm ${cashFormat(100000)}, but you've seen ${his} exploits; you stand to gain quite the addition to your chattel should you take the offer.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 100000;
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
			r.push(`You agree to purchase the princess and wire the money. The next day, a rather expensive-looking VTOL comes and drops off an angry slave wearing fine clothing and a pair of shackles on each set of limbs. You truly wish ${he} came gagged after the string of insults and slurs ${he} hurls at you during the enslavement process.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {minAge: 14, maxAge: 22, disableDisability: 1});
			slave.face = random(90, 100);
			slave.intelligence = random(60, 100);
			slave.intelligenceImplant = 30;
			slave.origin = "You purchased $him as a favor to $his father.";
			slave.career = "a princess";
			slave.prestige = 2;
			slave.prestigeDesc = "$He was once the princess of an old world kingdom up until $his loose habits caught up with $him and $he was exiled.";
			slave.devotion = random(-100, -90);
			slave.trust = random(25, 85);
			setHealth(slave, jsRandom(0, 20), 0, 0, 0, 0);
			slave.skill.vaginal = 30;
			slave.skill.anal = 0;
			slave.skill.oral = 50;
			slave.skill.entertainment = 0;
			slave.skill.whoring = 50;
			slave.vagina = 1;
			slave.vaginaLube = random(1, 2);
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.anus = 0;
			slave.weight = random(-20, 0);
			slave.waist = random(-40, 0);
			slave.muscles = 0;
			slave.shoulders = random(-2, 0);
			slave.behavioralFlaw = "arrogant";
			slave.canRecruit = 0;
			return slave;
		}
	}
};
