/**
 * Generates a new vat-grown catgirl that was grown in this arcology.
 * @returns {App.Entity.SlaveState}
 * @param {"XY"|"XX"|""} [sex] null or omit to use default rules
 * @param {object} [Obj]
 */
globalThis.growCatgirl = function(sex, {
	minAge,
	maxAge,
} = {}) {
	const slave = GenerateNewSlave(sex, {
		minAge, maxAge, nationality: "Stateless", disableDisability: 1, race: "catgirl"
	});
	slave.face = random(55, 95);
	slave.faceShape = "feline";
	slave.slaveName = App.Data.misc.catSlaveNames.random();
	slave.birthName = slave.slaveName;
	slave.career = "an orphan";
	slave.intelligenceImplant = 0;
	slave.devotion = 20;
	slave.trust = 30;
	slave.earShape = "none";
	slave.teeth = "fangs";
	slave.earT = "cat";
	slave.earTColor = slave.hColor;
	slave.earImplant = 1;
	slave.tailShape = "cat";
	slave.tailColor = slave.hColor;
	slave.eye.left.pupil = "catlike";
	slave.eye.right.pupil = "catlike";
	slave.weight = 10;
	slave.muscles = 0;
	slave.waist = 10;
	slave.vagina = Math.min(slave.vagina, 0);
	slave.anus = 0;
	slave.accent = 4;
	slave.canRecruit = 0;
	slave.skill = new App.Entity.SlaveSkillsState();
	slave.piercing = new App.Entity.completePiercingState();

	const revivalistNationality = getRevivalistNationality();
	if (typeof revivalistNationality === 'string') {
		slave.nationality = revivalistNationality;
	}

	// they're genetically engineered and very expensive, so go ahead and make their genes conform a bit better to local expectations...
	const arc = V.arcologies[0];
	if (FutureSocieties.isActive('FSStatuesqueGlorification', arc)) {
		slave.natural.height = Math.min(slave.natural.height + 10, 274);
		slave.height = Height.forAge(slave.natural.height, slave);
	} else if (FutureSocieties.isActive('FSPetiteAdmiration', arc)) {
		slave.natural.height = Math.max(slave.natural.height - 10, 85);
		slave.height = Height.forAge(slave.natural.height, slave);
	}
	if (FutureSocieties.isActive('FSIntellectualDependency', arc)) {
		slave.intelligence = Math.max(slave.intelligence - 15, -100);
	} else if (FutureSocieties.isActive('FSSlaveProfessionalism', arc)) {
		slave.intelligence = Math.min(slave.intelligence + 15, 100);
	}
	if (FutureSocieties.isActive('FSAssetExpansionist', arc)) {
		slave.natural.boobs += 500;
		slave.boobs += 500;
	} else if (FutureSocieties.isActive('FSSlimnessEnthusiast', arc)) {
		if (slave.natural.boobs > 500) {
			slave.natural.boobs = 200;
			slave.boobs = 200;
		}
	}

	return slave;
};
