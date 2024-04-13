App.Events.recDesperateBirth = class recDesperateBirth extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0,
			() => V.PC.skill.medicine >= 50
		];
	}

	get eventName() {
		return "Desperate Birth";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, girl, woman,
		} = getPronouns(slave);
		let r = [];

		r.push(`As you are heading back to your penthouse from inspecting a new line of sex shops, you hear a pained moan emanate from a nearby alley. Looking in, you find a heavily pregnant`);
		if (slave.visualAge > 17) {
			r.push(`${girl}`);
		} else if (slave.visualAge > 12) {
			r.push(`teenager`);
		} else {
			r.push(`little ${girl}`);
		}
		r.push(`seated, legs spread as wide as ${he} can, in a pool of ${his} own fluids. Your medical training kicks in and you descend on the laboring ${woman}, only to find ${he} is well into giving birth. Judging by ${his} exhaustion and the ever drying amniotic fluid and blood, ${he} has been struggling for quite some time. The reason is evident,`);
		if (slave.visualAge <= 12) {
			r.push(`${his} body is far too young to birth ${his} child and it has become firmly wedged in ${his} pelvis.`);
		} else {
			r.push(`${his} body is ill-suited for childbirth and the unfortunate thing has lodged in ${his} pelvis.`);
		}
		r.push(`Every push, every desperate contraction must be agonizing to ${him}. Fortunately you know what to do, however, it will not come cheap. Hour after hour you work with the ${girl}, ${his} debt to you growing ever higher, until you finally manage to coax the newborn from ${his} battered body. ${He} smiles at ${his} baby before losing consciousness; ${he} is in really bad shape. Odds are ${his} child will grow up an orphan, even if you call in ${his} debt.`);

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 1000;
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
			r.push(`You complete the legalities and biometric scanning quickly before`);
			if (App.Entity.facilities.clinic.hasFreeSpace) {
				r.push(`rushing ${him} to ${V.clinicName},`);
				slave.assignment = "get treatment in the clinic";
			} else {
				r.push(`putting ${him} to bed,`);
			}
			r.push(`in the hopes that ${he} will pull through.`);
			newSlave(slave); // No intro for them
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const pram = new GenerateNewSlavePram();
			pram.minAge = V.fertilityAge;
			pram.maxAge = 22;
			pram.ageOverridesPedoMode = 1;
			pram.disableDisability = 1;
			pram.race = "nonslave";
			const slave = GenerateNewSlave("XX", pram);
			generateSalonModifications(slave);
			slave.origin = "You helped $him give birth, leaving $him deeply indebted to you.";
			slave.devotion = random(0, 20);
			slave.trust = random(0, 20);
			setHealth(slave, -90, undefined, undefined, undefined, 100);
			slave.weight = random(-100, -50);
			slave.hips = -1;
			slave.boobs += random(3, 6) * 100;
			slave.lactation = 1;
			slave.lactationDuration = 2;
			if (slave.actualAge < 13) {
				slave.career = App.Data.Careers.General.veryYoung.random();
			} else {
				slave.career = App.Data.Careers.General.uneducated.random();
			}
			slave.vagina = 3;
			slave.anus = 0;
			slave.accent = 0;
			slave.geneticQuirks.uterineHypersensitivity = 0;
			slave.preg = 0;
			slave.pregWeek = -4;
			slave.counter.births = 1;
			slave.counter.birthsTotal = 1;
			slave.bellySag = 5;
			slave.bellySagPreg = 5;
			slave.pubertyXX = 1;
			return slave;
		}
	}
};
