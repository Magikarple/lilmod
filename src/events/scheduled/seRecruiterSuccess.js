App.Events.SERecruiterSuccess = class SERecruiterSuccess extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.RecruiterID !== 0,
			() => V.recruiterProgress >= (13 + (V.recruiterEugenics === 1 ? policies.countEugenicsSMRs() * 6 : 0))
		];
	}

	execute(node) {
		let r = [];

		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		V.recruiterProgress = 0;
		let slave;
		if (V.recruiterTarget === "young migrants") {
			slave = GenerateNewSlave(null, {maxAge: 22, disableDisability: 1});
			generateSalonModifications(slave);
			slave.origin = "$He submitted to enslavement for a better chance at survival than $he had as a migrant.";
			slave.devotion = random(-15, 5);
			slave.trust = random(-10, 10);
			setHealth(slave, jsRandom(-80, 20));
			slave.anus = 0;
			if (slave.vagina > 0) {
				slave.vagina = random(1, 3);
				slave.skill.vaginal = random(15, 40);
			}
			slave.skill.anal = 0;
			slave.piercing.ear.weight = pierceMe();
		} else if (V.recruiterTarget === "recent divorcees") {
			slave = GenerateNewSlave(null, {minAge: 30, maxAge: 45, disableDisability: 1});
			slave.origin = "$He submitted to enslavement for a better quality of life than $he had as a recent divorcee.";
			slave.devotion = random(-15, 5);
			slave.trust = random(-10, 10);
			setHealth(slave, jsRandom(-40, 20));
			slave.anus = random(1, 3);
			if (slave.vagina > 0) {
				slave.vagina = random(1, 3);
				slave.skill.vaginal = random(15, 40);
			}
			if (slave.dick > 0 && canAchieveErection(slave)) {
				slave.skill.penetrative = jsRandom(15, 40);
			}
			slave.skill.anal = 0;
			slave.piercing.ear.weight = pierceMe();
		} else if (V.recruiterTarget === "reassignment candidates") {
			slave = GenerateNewSlave("XY", {disableDisability: 1});
			generateSalonModifications(slave);
			slave.origin = "$He submitted to enslavement as $his only way to obtain surgery to transform $him into a woman.";
			slave.devotion = random(-15, 5);
			slave.trust = random(-10, 10);
			setHealth(slave, jsRandom(-40, 20));
			if (slave.balls === 0) {
				slave.balls = random(1, 3);
			}
			slave.skill.penetrative = jsRandom(0, 35);
			slave.piercing.tongue.weight = pierceMe();
			slave.piercing.ear.weight = pierceMe();
			slave.piercing.nose.weight = pierceMe();
			slave.behavioralFlaw = "hates women";
		} else if (V.recruiterTarget === "dissolute sissies") {
			slave = GenerateNewSlave("XY", {disableDisability: 1});
			generateSalonModifications(slave);
			slave.origin = "$He submitted to enslavement out of a misguided desire to join a sexually libertine society.";
			slave.devotion = random(-15, 5);
			slave.trust = random(-10, 10);
			setHealth(slave, jsRandom(-40, 20));
			slave.anus = random(1, 3);
			if (slave.balls === 0) {
				slave.balls = random(1, 3);
			}
			slave.skill.penetrative = jsRandom(15, 40);
			slave.skill.oral = random(15, 40);
			slave.skill.anal = random(15, 40);
			slave.faceImplant = 20*pierceMe();
			slave.face = Math.clamp(slave.face+(slave.faceImplant), -100, 100);
			slave.piercing.lips.weight = pierceMe();
			slave.piercing.tongue.weight = pierceMe();
			slave.piercing.ear.weight = pierceMe();
			slave.piercing.nose.weight = pierceMe();
			slave.piercing.eyebrow.weight = pierceMe();
			slave.piercing.navel.weight = pierceMe();
			slave.piercing.nipple.weight = pierceMe();
			slave.piercing.genitals.weight = pierceMe();
			slave.behavioralFlaw = "hates women";
		} else if (V.recruiterTarget === "expectant mothers") {
			slave = GenerateNewSlave("XX", {minAge: Math.max(V.fertilityAge, V.minimumSlaveAge), ageOverridesPedoMode: 1, disableDisability: 1});
			generateSalonModifications(slave);
			slave.origin = "$He submitted to enslavement to get access to modern prenatal care.";
			slave.devotion = random(-15, 5);
			slave.trust = random(-10, 10);
			setHealth(slave, jsRandom(-80, 20));
			slave.vagina = random(1, 3);
			slave.preg = random(15, 39);
			slave.pregType = setPregType(slave);
			WombImpregnate(slave, slave.pregType, 0, slave.preg);
			slave.pregKnown = 1;
			slave.pregWeek = slave.preg;
			SetBellySize(slave);
			slave.boobs += 50*random(0, 6);
			slave.lactation = pierceMe();
			if (slave.lactation > 0) {
				slave.lactationDuration = 2;
			}
			slave.weight = random(0, 50);
		} else {
			slave = GenerateNewSlave(null, {minAge: 11, maxAge: 22, disableDisability: 1});
			generateSalonModifications(slave);
			slave.origin = "$He submitted to enslavement to escape the hard life of an old world whore.";
			slave.career = "a prostitute";
			slave.devotion = random(-15, 5);
			slave.trust = random(-10, 10);
			setHealth(slave, jsRandom(-80, 20));
			slave.anus = random(1, 3);
			if (slave.balls > 0) {
				slave.vagina = random(1, 3);
				slave.skill.vaginal = random(15, 40);
				slave.skill.penetrative = 15;
			}
			slave.skill.oral = random(15, 40);
			slave.skill.anal = random(15, 40);
			slave.skill.whoring = random(15, 40);
			slave.boobsImplant = random(0, 3)*200;
			slave.boobs += slave.boobsImplant;
			if (slave.boobsImplant > 0) {
				slave.boobsImplantType = "normal";
			}
			slave.buttImplant = random(0, 2);
			slave.butt = slave.buttImplant;
			if (slave.buttImplant > 0) {
				slave.buttImplantType = "normal";
			}
			slave.lipsImplant = either(0, 10);
			slave.lips += slave.lipsImplant;
			slave.piercing.lips.weight = pierceMe();
			slave.piercing.tongue.weight = pierceMe();
			slave.piercing.ear.weight = pierceMe();
			slave.piercing.nose.weight = pierceMe();
			slave.piercing.eyebrow.weight = pierceMe();
			slave.piercing.navel.weight = pierceMe();
			slave.piercing.nipple.weight = pierceMe();
			slave.piercing.genitals.weight = pierceMe();
		}

		if (V.recruiterEugenics === 1) {
			if (V.policies.SMR.eugenics.intelligenceSMR === 1) {
				slave.intelligence = Intelligence.random({limitIntelligence: [40, 100]});
			}
			if (V.policies.SMR.eugenics.heightSMR === 1) {
				slave.natural.height = Height.mean(slave.nationality, slave.race, slave.genes, 20) + random(15, 30);
				slave.height = Height.forAge(slave.natural.height, slave);
			}
			if (V.policies.SMR.eugenics.faceSMR === 1) {
				slave.face = random(40, 100);
			}
		}

		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		const {
			He,
			he, him, his
		} = getPronouns(slave);
		const {
			he2
		} = getPronouns(S.Recruiter).appendSuffix("2");

		if (V.recruiterTarget === "young migrants") {
			r.push(`Your recruiter ${S.Recruiter.slaveName} has succeeded; ${he2}'s convinced a starving young migrant from the old world that ${he}'ll have a better chance at survival as one of your slaves.`);
		} else if (V.recruiterTarget === "recent divorcees") {
			r.push(`Your recruiter ${S.Recruiter.slaveName} has succeeded; ${he2}'s convinced a recent divorcee from the old world that ${he}'ll have a better quality of life as one of your slaves.`);
		} else if (V.recruiterTarget === "reassignment candidates") {
			r.push(`Your recruiter ${S.Recruiter.slaveName} has succeeded; ${he2}'s convinced an old world person desperate for modern reassignment surgery that you'll provide it if ${he} agrees to be a sex slave after ${he}'s recreated as a female.`);
		} else if (V.recruiterTarget === "dissolute sissies") {
			r.push(`Your recruiter ${S.Recruiter.slaveName} has succeeded; ${he2}'s convinced an old world sissy that ${he}'d be better off as a slave in a society that is so totally sexually libertine as to accept as female and respectable anyone who takes cock.`);
		} else if (V.recruiterTarget === "expectant mothers") {
			r.push(`Your recruiter ${S.Recruiter.slaveName} has succeeded; ${he2}'s convinced an unhealthy expectant mother that you'll provide ${him} with modern medicine in return for ${his} enslavement.`);
		} else {
			r.push(`Your recruiter ${S.Recruiter.slaveName} has succeeded; ${he2}'s convinced a desperate old world whore that ${he}'d be better off as a slave in ${V.arcologies[0].name} than as a free prostitute on the rough streets of a traditional city.`);
		}
		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];
		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
			V.recruiterProgress = 7;
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			return App.UI.newSlaveIntro(slave);
		}

		function sell() {
			cashX(cost, "slaveTransfer", S.Recruiter);
			return `${slave.slaveName} accepts being resold without much fuss. ${He}'s merely exchanged one unknown owner for another. For all ${he} knows ${his} new buyer will be less abusive than you would have been. ${He} would be less complacent if ${he} knew who ${his} buyers are; ${he}'ll be immured in an arcade within the hour.`;
		}

		/** @returns {FC.PiercingType} */
		function pierceMe() {
			return random(0, 1);
		}
	}
};
