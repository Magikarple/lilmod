/**
 * @returns {string}
 */
App.Intro.cheatModeSlaves = function() {
	const slaveNames = [];
	let baseSlave = BaseSlave();

	let cheatSlave = clone(baseSlave);
	cheatSlave.slaveName = "Miss Anne";
	cheatSlave.birthName = "Lindy Anne";
	cheatSlave.ID = 990000;
	cheatSlave.relationship = 4;
	cheatSlave.relationshipTarget = 990001;
	cheatSlave.rivalry = 1;
	cheatSlave.rivalryTarget = 990002;
	cheatSlave.assignment = "be your Head Girl";
	cheatSlave.birthWeek = random(0, 51);
	cheatSlave.actualAge = 42;
	cheatSlave.physicalAge = 42;
	cheatSlave.visualAge = 42;
	cheatSlave.ovaryAge = 42;
	cheatSlave.ageImplant = 1;
	setHealth(cheatSlave, 50);
	cheatSlave.devotion = 100;
	cheatSlave.nationality = "Stateless";
	cheatSlave.natural.height = 175;
	cheatSlave.height = 175;
	cheatSlave.race = "white";
	cheatSlave.eye.origColor = "green";
	cheatSlave.origHColor = "honey blonde";
	cheatSlave.origSkin = "pale";
	cheatSlave.hStyle = "neat";
	cheatSlave.hLength = 40;
	cheatSlave.waist = -55;
	cheatSlave.boobs = 1000;
	cheatSlave.natural.boobs = 400;
	cheatSlave.boobsImplant = 600;
	cheatSlave.boobsImplantType = "normal";
	cheatSlave.areolae = 1;
	cheatSlave.butt = 4;
	cheatSlave.buttImplant = 2;
	cheatSlave.buttImplantType = "normal";
	cheatSlave.face = 55;
	cheatSlave.lips = 35;
	cheatSlave.anus = 1;
	cheatSlave.makeup = 1;
	cheatSlave.nails = 1;
	cheatSlave.piercing.ear.weight = 1;
	cheatSlave.skill.oral = 100;
	cheatSlave.skill.penetrative = 100;
	cheatSlave.skill.anal = 100;
	cheatSlave.skill.whoring = 100;
	cheatSlave.skill.entertainment = 100;
	cheatSlave.clothes = "a slave gown";
	cheatSlave.intelligence = 100;
	cheatSlave.energy = 65;
	cheatSlave.attrXY = 40;
	cheatSlave.fetishKnown = 1;
	cheatSlave.custom.tattoo = "'Miss Anne' is tattooed in lovely flowing script over $his collarbone.";
	cheatSlave.custom.desc = "$He speaks with the rich accent of the Old South.";
	if (V.seeDicks !== 100) {
		cheatSlave.genes = "XX";
		cheatSlave.vagina = 2;
		cheatSlave.ovaries = 1;
		cheatSlave.skill.vaginal = 100;
		cheatSlave.pubertyXX = 1;
	} else {
		cheatSlave.genes = "XY";
		cheatSlave.vagina = -1;
		cheatSlave.dick = 4;
		cheatSlave.balls = 4;
		cheatSlave.scrotum = 4;
		cheatSlave.foreskin = 4;
		cheatSlave.prostate = 1;
		cheatSlave.pubertyXY = 1;
	}
	newSlave(cheatSlave);
	V.HeadGirlID = cheatSlave.ID;
	slaveNames.push(cheatSlave.slaveName);

	cheatSlave = clone(baseSlave);
	cheatSlave.slaveName = "Cornelia";
	cheatSlave.birthName = "Cora";
	cheatSlave.ID = 990001;
	cheatSlave.relationship = 4;
	cheatSlave.relationshipTarget = 990000;
	cheatSlave.assignment = "whore";
	cheatSlave.birthWeek = random(0, 51);
	cheatSlave.actualAge = 36;
	cheatSlave.physicalAge = 36;
	cheatSlave.visualAge = 36;
	cheatSlave.ovaryAge = 36;
	cheatSlave.ageImplant = 1;
	setHealth(cheatSlave, 10);
	cheatSlave.devotion = 100;
	cheatSlave.nationality = "Stateless";
	cheatSlave.muscles = 20;
	cheatSlave.natural.height = 190;
	cheatSlave.height = 190;
	cheatSlave.race = "black";
	cheatSlave.origHColor = "black";
	cheatSlave.pubicHColor = "black";
	cheatSlave.origSkin = "dark";
	cheatSlave.hLength = 40;
	cheatSlave.hStyle = "neat";
	cheatSlave.pubicHStyle = "waxed";
	cheatSlave.waist = -55;
	cheatSlave.boobs = 1200;
	cheatSlave.boobsImplant = 1000;
	cheatSlave.boobsImplantType = "fillable";
	cheatSlave.areolae = 2;
	cheatSlave.butt = 5;
	cheatSlave.buttImplant = 3;
	cheatSlave.buttImplantType = "fillable";
	cheatSlave.preg = -2;
	cheatSlave.face = 15;
	cheatSlave.faceImplant = 65;
	cheatSlave.lips = 35;
	cheatSlave.lipsImplant = 10;
	cheatSlave.anus = 2;
	cheatSlave.makeup = 1;
	cheatSlave.nails = 1;
	cheatSlave.piercing.ear.weight = 1;
	cheatSlave.skill.oral = 100;
	cheatSlave.skill.anal = 100;
	cheatSlave.skill.penetrative = 100;
	cheatSlave.skill.whoring = 100;
	cheatSlave.skill.entertainment = 100;
	cheatSlave.clothes = "a slave gown";
	cheatSlave.energy = 65;
	cheatSlave.attrXX = 80;
	cheatSlave.attrXY = 40;
	cheatSlave.fetishKnown = 1;
	App.Medicine.Modification.addBrand(cheatSlave, "left hand", "a large letter 'S'");
	cheatSlave.custom.desc = "$He speaks with the demeaning accent of slaves from the Old South.";
	if (V.seeDicks !== 0) {
		cheatSlave.genes = "XY";
		cheatSlave.vagina = -1;
		cheatSlave.dick = 3;
		cheatSlave.balls = 3;
		cheatSlave.scrotum = 3;
		cheatSlave.foreskin = 3;
		cheatSlave.prostate = 1;
		cheatSlave.pubertyXY = 1;
	} else {
		cheatSlave.genes = "XX";
		cheatSlave.vagina = 3;
		cheatSlave.ovaries = 1;
		cheatSlave.pubertyXX = 1;
	}
	newSlave(cheatSlave);
	slaveNames.push(cheatSlave.slaveName);

	cheatSlave = clone(baseSlave);
	cheatSlave.slaveName = "Sheba";
	cheatSlave.birthName = "Shaneequa";
	cheatSlave.ID = 990002;
	cheatSlave.rivalry = 1;
	cheatSlave.rivalryTarget = 990000;
	cheatSlave.assignment = "whore";
	cheatSlave.birthWeek = random(0, 51);
	cheatSlave.actualAge = 19;
	cheatSlave.physicalAge = 19;
	cheatSlave.visualAge = 19;
	cheatSlave.ovaryAge = 19;
	setHealth(cheatSlave, 10);
	cheatSlave.devotion = 60;
	cheatSlave.nationality = "Stateless";
	cheatSlave.natural.height = 175;
	cheatSlave.height = 175;
	cheatSlave.race = "black";
	cheatSlave.pubicHColor = "black";
	cheatSlave.origSkin = "brown";
	cheatSlave.hLength = 40;
	cheatSlave.hStyle = "neat";
	cheatSlave.pubicHStyle = "waxed";
	cheatSlave.waist = -55;
	cheatSlave.boobs = 1600;
	cheatSlave.boobsImplant = 600;
	cheatSlave.boobsImplantType = "normal";
	cheatSlave.piercing.nipple.weight = 1;
	cheatSlave.areolae = 1;
	cheatSlave.butt = 6;
	cheatSlave.buttImplant = 2;
	cheatSlave.buttImplantType = "normal";
	cheatSlave.face = 55;
	cheatSlave.faceImplant = 15;
	cheatSlave.lips = 55;
	cheatSlave.lipsImplant = 10;
	cheatSlave.anus = 1;
	cheatSlave.makeup = 1;
	cheatSlave.nails = 1;
	cheatSlave.piercing.ear.weight = 1;
	cheatSlave.skill.oral = 35;
	cheatSlave.skill.penetrative = 35;
	cheatSlave.skill.anal = 35;
	cheatSlave.skill.whoring = 35;
	cheatSlave.skill.entertainment = 35;
	cheatSlave.clothes = "a slave gown";
	cheatSlave.energy = 100;
	cheatSlave.attrXY = 40;
	cheatSlave.fetishKnown = 1;
	App.Medicine.Modification.addBrand(cheatSlave, "left hand", "a large letter 'S'");
	cheatSlave.custom.desc = "$He speaks with the demeaning accent of slaves from the Old South.";
	cheatSlave.mother = 990001;
	if (V.seeDicks !== 100) {
		cheatSlave.genes = "XX";
		cheatSlave.vagina = 1;
		cheatSlave.ovaries = 1;
		cheatSlave.skill.vaginal = 35;
		cheatSlave.pubertyXX = 1;
	} else {
		cheatSlave.genes = "XY";
		cheatSlave.vagina = -1;
		cheatSlave.dick = 2;
		cheatSlave.balls = 2;
		cheatSlave.scrotum = 2;
		cheatSlave.foreskin = 2;
		cheatSlave.prostate = 1;
		cheatSlave.pubertyXY = 1;
	}
	newSlave(cheatSlave);
	slaveNames.push(cheatSlave.slaveName);

	cheatSlave = clone(baseSlave);
	cheatSlave.slaveName = "Cornflower";
	cheatSlave.birthName = "Alysa";
	cheatSlave.ID = 990003;
	cheatSlave.relationship = 3;
	cheatSlave.relationshipTarget = 990005;
	cheatSlave.assignment = "get milked";
	cheatSlave.birthWeek = random(0, 51);
	setHealth(cheatSlave, 20);
	cheatSlave.devotion = 60;
	cheatSlave.nationality = "Stateless";
	cheatSlave.muscles = 50;
	cheatSlave.natural.height = 190;
	cheatSlave.height = 190;
	cheatSlave.race = "black";
	cheatSlave.origHColor = "black";
	cheatSlave.pubicHColor = "black";
	cheatSlave.origSkin = "brown";
	cheatSlave.hLength = 0;
	cheatSlave.hStyle = "shaved";
	cheatSlave.pubicHStyle = "waxed";
	cheatSlave.waist = -100;
	cheatSlave.heels = 1;
	cheatSlave.voice = 0;
	cheatSlave.boobs = 6000;
	cheatSlave.nipples = "huge";
	cheatSlave.areolae = 2;
	cheatSlave.boobsTat = "bovine patterns";
	cheatSlave.lactation = 2;
	cheatSlave.lactationDuration = 2;
	cheatSlave.butt = 3;
	cheatSlave.buttTat = "bovine patterns";
	cheatSlave.face = 15;
	cheatSlave.lips = 35;
	cheatSlave.lipsTat = "bovine patterns";
	cheatSlave.anus = 3;
	cheatSlave.anusTat = "bovine patterns";
	cheatSlave.makeup = 1;
	cheatSlave.nails = 1;
	cheatSlave.piercing.ear.weight = 1;
	cheatSlave.piercing.nose.weight = 2;
	cheatSlave.shouldersTat = "bovine patterns";
	cheatSlave.armsTat = "bovine patterns";
	cheatSlave.legsTat = "bovine patterns";
	cheatSlave.stampTat = "bovine patterns";
	cheatSlave.skill.oral = 15;
	cheatSlave.skill.anal = 35;
	cheatSlave.energy = 65;
	cheatSlave.attrXY = 40;
	cheatSlave.fetish = "boobs";
	cheatSlave.fetishKnown = 1;
	cheatSlave.custom.tattoo = "A pretty blue cornflower is tattooed on each of $his cheeks.";
	cheatSlave.custom.desc = "$He once spoke with the demeaning accent of slaves from the Old South.";
	cheatSlave.mother = 990005;
	if (V.seeDicks !== 100) {
		cheatSlave.genes = "XX";
		cheatSlave.vagina = 1;
		cheatSlave.vaginaTat = "bovine patterns";
		cheatSlave.ovaries = 1;
		cheatSlave.skill.vaginal = 15;
		cheatSlave.pubertyXX = 1;
	} else {
		cheatSlave.genes = "XY";
		cheatSlave.vagina = -1;
		cheatSlave.dick = 3;
		cheatSlave.balls = 3;
		cheatSlave.scrotum = 3;
		cheatSlave.foreskin = 3;
		cheatSlave.prostate = 1;
		cheatSlave.dickTat = "bovine patterns";
		cheatSlave.pubertyXY = 1;
	}
	newSlave(cheatSlave);
	slaveNames.push(cheatSlave.slaveName);

	cheatSlave = clone(baseSlave);
	cheatSlave.slaveName = "Miss Lily";
	cheatSlave.birthName = "Lillian";
	cheatSlave.ID = 990004;
	cheatSlave.assignment = "guard you";
	cheatSlave.birthWeek = random(0, 51);
	setHealth(cheatSlave, 20);
	cheatSlave.devotion = 30;
	cheatSlave.nationality = "Stateless";
	cheatSlave.muscles = 50;
	cheatSlave.natural.height = 175;
	cheatSlave.height = 175;
	cheatSlave.race = "white";
	cheatSlave.eye.origColor = "green";
	cheatSlave.origHColor = "straw blonde";
	cheatSlave.origSkin = "pale";
	cheatSlave.hLength = 10;
	cheatSlave.hStyle = "ponytail";
	cheatSlave.waist = -55;
	cheatSlave.boobs = 600;
	cheatSlave.natural.boobs = 600;
	cheatSlave.butt = 3;
	cheatSlave.face = 15;
	cheatSlave.lips = 35;
	cheatSlave.preg = -2;
	cheatSlave.anus = 2;
	cheatSlave.makeup = 1;
	cheatSlave.nails = 1;
	cheatSlave.piercing.ear.weight = 1;
	cheatSlave.skill.anal = 35;
	cheatSlave.skill.combat = 100;
	cheatSlave.energy = 65;
	cheatSlave.attrXY = 40;
	cheatSlave.fetish = "buttslut";
	cheatSlave.fetishKnown = 1;
	cheatSlave.custom.tattoo = "'Miss Lily' is tattooed in lovely flowing script over $his collarbone.";
	cheatSlave.custom.desc = "$He once spoke with the rich accent of the Old South.";
	cheatSlave.mother = 990000;
	if (V.seeDicks !== 100) {
		cheatSlave.genes = "XX";
		cheatSlave.ovaries = 1;
		cheatSlave.pubertyXX = 1;
	} else {
		cheatSlave.genes = "XY";
		cheatSlave.vagina = -1;
		cheatSlave.dick = 4;
		cheatSlave.balls = 4;
		cheatSlave.scrotum = 4;
		cheatSlave.foreskin = 4;
		cheatSlave.prostate = 1;
		cheatSlave.pubertyXY = 1;
		cheatSlave.skill.penetrative = 15;
	}
	newSlave(cheatSlave);
	V.BodyguardID = cheatSlave.ID;
	slaveNames.push(cheatSlave.slaveName);

	cheatSlave = clone(baseSlave);
	cheatSlave.slaveName = "Lilac";
	cheatSlave.birthName = "Lillian";
	cheatSlave.ID = 990005;
	cheatSlave.relationship = 3;
	cheatSlave.relationshipTarget = 990003;
	cheatSlave.assignment = "get milked";
	cheatSlave.birthWeek = random(0, 51);
	cheatSlave.actualAge = 36;
	cheatSlave.physicalAge = 36;
	cheatSlave.visualAge = 36;
	cheatSlave.ovaryAge = 36;
	setHealth(cheatSlave, 20);
	cheatSlave.devotion = 60;
	cheatSlave.nationality = "Stateless";
	cheatSlave.muscles = 50;
	cheatSlave.natural.height = 190;
	cheatSlave.height = 190;
	cheatSlave.race = "black";
	cheatSlave.origHColor = "black";
	cheatSlave.pubicHColor = "black";
	cheatSlave.origSkin = "brown";
	cheatSlave.hLength = 0;
	cheatSlave.hStyle = "shaved";
	cheatSlave.pubicHStyle = "waxed";
	cheatSlave.waist = -55;
	cheatSlave.heels = 1;
	cheatSlave.boobs = 8000;
	cheatSlave.nipples = "huge";
	cheatSlave.areolae = 2;
	cheatSlave.boobsTat = "bovine patterns";
	cheatSlave.lactation = 2;
	cheatSlave.lactationDuration = 2;
	cheatSlave.butt = 4;
	cheatSlave.buttTat = "bovine patterns";
	cheatSlave.face = 15;
	cheatSlave.lips = 35;
	cheatSlave.lipsTat = "bovine patterns";
	cheatSlave.anus = 3;
	cheatSlave.anusTat = "bovine patterns";
	cheatSlave.makeup = 1;
	cheatSlave.nails = 1;
	cheatSlave.piercing.ear.weight = 1;
	cheatSlave.piercing.nose.weight = 2;
	cheatSlave.shouldersTat = "bovine patterns";
	cheatSlave.armsTat = "bovine patterns";
	cheatSlave.legsTat = "bovine patterns";
	cheatSlave.stampTat = "bovine patterns";
	cheatSlave.skill.oral = 15;
	cheatSlave.skill.anal = 35;
	cheatSlave.energy = 65;
	cheatSlave.attrXY = 40;
	cheatSlave.fetish = "boobs";
	cheatSlave.fetishKnown = 1;
	cheatSlave.custom.tattoo = "A pretty purple lilac is tattooed on each of $his cheeks.";
	cheatSlave.custom.desc = "$He once spoke with the demeaning accent of slaves from the Old South.";
	if (V.seeDicks !== 100) {
		cheatSlave.genes = "XX";
		cheatSlave.vagina = 1;
		cheatSlave.vaginaTat = "bovine patterns";
		cheatSlave.ovaries = 1;
		cheatSlave.skill.vaginal = 15;
		cheatSlave.pubertyXX = 1;
	} else {
		cheatSlave.genes = "XY";
		cheatSlave.vagina = -1;
		cheatSlave.dick = 5;
		cheatSlave.balls = 5;
		cheatSlave.scrotum = 5;
		cheatSlave.foreskin = 5;
		cheatSlave.prostate = 1;
		cheatSlave.dickTat = "bovine patterns";
		cheatSlave.pubertyXY = 1;
		cheatSlave.skill.penetrative = 15;
	}
	newSlave(cheatSlave);
	slaveNames.push(cheatSlave.slaveName);

	return `There are quite a few left; their names are ${toSentence(slaveNames)}.`;
};
