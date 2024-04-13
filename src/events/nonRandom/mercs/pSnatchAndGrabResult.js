App.Events.PSnatchAndGrabResult = class PSnatchAndGrabResult extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.eventResults.snatch === 1
		];
	}

	execute(node) {
		let r = [];

		V.nextButton = "Continue";
		V.eventResults.snatch = 2;

		const snatched = GenerateNewSlave("XX", {maxAge: (V.pedo_mode === 1 ? V.minimumSlaveAge : 18), disableDisability: 1});
		if (V.pedo_mode === 1) {
			snatched.boobShape = "saggy";
			snatched.nipples = "partially inverted";
			snatched.areolae = 3;
			snatched.lips = 15;
			snatched.voice = 2;
			snatched.weight = 60;
			snatched.muscles = 0;
			snatched.shoulders = -2;
			snatched.hips = 0;
			snatched.waist = 10;
		} else {
			if (snatched.lips < 10) {
				snatched.lips += 5;
			}
			snatched.height = Height.random(snatched, {skew: 1, limitMult: [0, 2]});
			snatched.weight = 0;
			snatched.muscles = 20;
			snatched.waist = -75;
		}

		snatched.faceShape = (V.pedo_mode === 1 ? "exotic" : "androgynous");
		snatched.anus = 0;
		if (V.seeDicks !== 100) {
			snatched.vagina = 0;
			snatched.ovaries = 1;
		}
		if (V.seeDicks === 0) {
			snatched.dick = 0;
			snatched.balls = 0;
			snatched.scrotum = 0;
		} else if (V.seeDicks > 75) {
			snatched.dick = (V.pedo_mode === 1 ? 2 : 6);
			if (snatched.foreskin > 0) {
				snatched.foreskin = snatched.dick;
			}
			snatched.balls = 1;
			snatched.scrotum = snatched.balls;
		} else {
			snatched.dick = 1;
			snatched.foreskin = 1;
			snatched.balls = 1;
			snatched.scrotum = snatched.balls;
		}

		snatched.boobs += (V.pedo_mode === 1 ? 6000 : 200);
		snatched.butt += (V.pedo_mode === 1 ? 1 : 2);
		snatched.origin = "$He is your share of a raid on an illegal laboratory by your mercenaries.";
		snatched.career = "a slave";
		snatched.devotion = 100;
		snatched.trust = 100;
		setHealth(snatched, 250, 0, 0, 0, 0);
		snatched.face = 15;
		snatched.skill.vaginal = 0;
		snatched.skill.penetrative = 0;
		snatched.skill.oral = 0;
		snatched.skill.anal = 0;
		snatched.skill.whoring = 0;
		snatched.skill.entertainment = 0;
		snatched.birthWeek = 0;
		snatched.hStyle = "shaved";
		snatched.hLength = 0;
		snatched.custom.desc = "$His skin is unnaturally perfect, totally without blemishes. $He radiates unnatural health and resilience.";
		snatched.custom.tattoo = "$He has a barcode tattooed on the top of $his head.";
		snatched.behavioralFlaw = "odd";
		snatched.fetish = "none";
		snatched.energy = 100;
		snatched.fetishKnown = 1;
		snatched.attrKnown = 1;
		if (snatched.physicalAge >= 12) {
			snatched.teeth = "normal";
		}
		snatched.pubicHStyle = "hairless";
		snatched.underArmHStyle = "hairless";

		snatched.slaveCost = -10000;

		const {
			he, himself
		} = getPronouns(snatched);

		r.push(`In the middle of the night, there is a polite knock on your penthouse door. You are alerted by ${V.assistant.name}, who observes`);
		if (V.assistant.personality === 1) {
			r.push(`with some irritation`);
		}
		r.push(`that the mercenary who knocked has gone, has left a large case outside the door, and has satisfied the security systems that the case contains nothing hazardous.`);

		r.push(`The case prompts you for a handprint code; your hand works just fine. It contains a naked, hairless, perfectly healthy young body in the fetal position. This person awakens as the case opens, looks you confidently in the eye, and says "Are you my`);
		if (V.PC.title !== 0) {
			r.push(`Master?"`);
		} else {
			r.push(`Mistress?"`);
		}

		r.push(`When you state that, apparently, you are, ${he} climbs out of the case, prostrates ${himself} in the hall before you, and says reverentially into the floor, "I love you,`);
		if (V.PC.title !== 0) {
			r.push(`Master."`);
		} else {
			r.push(`Mistress."`);
		}

		App.Events.addParagraph(node, r);
		node.append(App.Desc.longSlave(snatched));
		node.append(App.UI.newSlaveIntro(snatched));
	}
};
