App.Events.pAidResult = class pAidResult extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return []; // always run if queued
	}

	execute(node) {
		let r = [];
		V.eventResults.aid = 2;
		V.nationHate += 2;
		r.push(`You watch on the feeds from your VTOL craft as it settles`);
		if (V.eventResults.aidTarget === "volleyballTeam") {
			r.push(`beside`);
		} else {
			r.push(`onto the roof of`);
		}
		r.push(`the`);
		if (V.eventResults.aidTarget === "convent") {
			r.push(`convent whose remaining women`);
		} else if (V.eventResults.aidTarget === "school") {
			r.push(`girls' school whose remaining students and principal`);
		} else if (V.eventResults.aidTarget === "housewives") {
			r.push(`mansion of the leader of the group of housewives`);
		} else if (V.eventResults.aidTarget === "maternity") {
			r.push(`maternity ward whose remaining patients`);
		} else if (V.eventResults.aidTarget === "conversion") {
			r.push(`religious sexual orientation therapy camp whose inmates and owner`);
		} else if (V.eventResults.aidTarget === "gradeSchool") {
			r.push(`school whose students`);
		} else if (V.eventResults.aidTarget === "volleyballTeam") {
			r.push(`bus whose athletes`);
		} else if (V.eventResults.aidTarget === "seizedMission") {
			r.push(`building the raped missionaries`);
		}
		r.push(`you promised to rescue${(V.eventResults.aidTarget === "seizedMission") ? ` were holed up in` : ``}. Its side doors retract, allowing the escapees to hustle aboard with their bundles of personal possessions. Once they're on board and strapped into their seats, the turbofans howl and the craft peels smoothly off the roof, the hot jet wash setting it alight. Once it transitions fully into level flight, the true plan goes into operation. At a carefully selected moment, injectors concealed within each seat lance into the passengers' buttocks, knocking them out. It works flawlessly, the drugs precisely calibrated to each body based on the weight added to the VTOL as each climbed aboard. This avoids the potential for over- or under-dosage present when using gas or darts to subdue groups. In perfect unison, the passengers slump against the harnesses holding them against the seats.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`When the aircraft lands at your penthouse pad, the would-be escapees are still unconscious. This makes putting them through enslavement physically laborious, though it does cut down on the usual whining; fortunately, you reserved the credits necessary to obscure their questionably legitimate enslavement. By the time they awake, they'll be indistinguishable from any other new slave in the arcology. The possibility remains, however that rumor of the incident will leak out. Your VTOL bird's entry and exit from the capital city was likely noticed and remarked upon.`);
		App.Events.addParagraph(node, r);
		r = [];
		const newSlaves = [];
		let slave;
		if (V.eventResults.aidTarget === "convent") {
			slave = GenerateNewSlave("XX", {minAge: 30, maxAge: 42, disableDisability: 1});
			slave.origin = "$He was the head of a religious community of women you enslaved.";
			slave.career = "a nun";
			slave.devotion = -20;
			slave.trust = random(-90, -75);
			setHealth(slave, jsRandom(-10, 10), undefined, undefined, undefined, 0);
			slave.face = 15;
			slave.anus = 0;
			slave.vagina = 0;
			slave.weight = random(20, 140);
			slave.attrXX = random(60, 90);
			slave.attrXY = random(10, 50);
			slave.energy = random(60, 80);
			slave.skill.vaginal = 0;
			slave.skill.penetrative = 65;
			slave.skill.oral = 35;
			slave.skill.anal = 0;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 0;
			slave.pubicHStyle = "bushy";
			slave.fetish = "dom";
			slave.behavioralFlaw = "devout";
			slave.sexualFlaw = "repressed";
			slave.sexualQuirk = "perverted";
			newSlaves.push(slave);
			const {His} = getPronouns(slave);
			r.push(`In any case, you've enslaved a fine group. The leader is on the older side, but not unattractive. ${His} girls are younger, and probably have all sorts of delightful repressed tendencies to be manipulated.`);
			for (let i = 0; i < 3; i++) {
				slave = GenerateNewSlave("XX", {minAge: 18, maxAge: 24});
				slave.origin = "$He was an initiate in a religious community of women you enslaved.";
				slave.career = "a nun";
				slave.devotion = random(-90, -75);
				slave.trust = -20;
				setHealth(slave, jsRandom(-10, 10), undefined, undefined, undefined, 20);
				slave.anus = 0;
				slave.vagina = 0;
				slave.weight = random(-20, -100);
				slave.attrXX = random(10, 50);
				slave.attrXY = random(10, 50);
				slave.energy = random(5, 20);
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 15;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.pubicHStyle = "bushy";
				slave.behavioralFlaw = "devout";
				slave.sexualFlaw = "repressed";
				newSlaves.push(slave);
			}
		} else if (V.eventResults.aidTarget === "school") {
			slave = GenerateNewSlave("XX", {minAge: 26, maxAge: 42, disableDisability: 1});
			slave.origin = "$He was the principal of a girls' school whose remnants you enslaved. A strap-on and a large quantity of personal lubricant were found in $his possession when $he was enslaved.";
			slave.intelligence = random(16, 80);
			slave.intelligenceImplant = 15;
			slave.teeth = "normal";
			slave.career = "a principal";
			slave.devotion = -20;
			slave.trust = random(-90, -75);
			setHealth(slave, jsRandom(-10, 10), undefined, undefined, undefined, 0);
			slave.anus = 1;
			slave.vagina = 1;
			slave.weight = random(20, 80);
			slave.attrXX = random(60, 90);
			slave.attrXY = random(10, 50);
			slave.energy = random(60, 80);
			slave.skill.vaginal = 15;
			slave.skill.penetrative = 15;
			slave.skill.oral = 15;
			slave.skill.anal = 15;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 15;
			slave.pubicHStyle = "waxed";
			slave.fetish = "dom";
			slave.behavioralFlaw = either("arrogant", "bitchy", "hates men", "hates men", "liberated");
			slave.sexualFlaw = "shamefast";
			newSlaves.push(slave);
			const {his} = getPronouns(slave);
			r.push(`In any case, you've enslaved a fine group. The principal is on the older side, and seems to have paid unusually close attention to ${his} appearance, for the female principal of a girls' school. And for whatever reason, the school's uniform skirt seems to have been rather short in back.`);
			for (let i = 0; i < 3; i++) {
				slave = GenerateNewSlave("XX", {maxAge: 18, disableDisability: 1});
				slave.origin = "$He was a student at a girls' school whose remnants you enslaved.";
				slave.career = "a student";
				generateSalonModifications(slave);
				slave.devotion = random(-90, -75);
				slave.trust = -20;
				setHealth(slave, jsRandom(-10, 10), undefined, undefined, undefined, 10);
				slave.anus = 1;
				slave.vagina = either(0, 0, 1);
				slave.weight = random(-50, 0);
				slave.attrXX = 70;
				slave.attrXY = random(10, 70);
				slave.energy = random(50, 70);
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 15;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.fetish = "buttslut";
				slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy");
				slave.sexualFlaw = either("hates oral", "idealistic", "shamefast");
				newSlaves.push(slave);
			}
		} else if (V.eventResults.aidTarget === "maternity") {
			for (let i = 0; i < 4; i++) {
				const pram = {mature: 0, disableDisability: 1, ageOverridesPedoMode: 1};
				if (V.pedo_mode === 1) {
					pram.minAge = V.fertilityAge;
				} else {
					pram.minAge = 20;
					pram.maxAge = 39;
				}
				slave = GenerateNewSlave("XX", pram);
				slave.origin = "$He was an expectant mother you enslaved when you evacuated $him from a threatened old world hospital.";
				slave.career = "a housewife";
				slave.devotion = random(-90, -75);
				slave.trust = -20;
				slave.preg = random(28, 40);
				slave.pregType = either(1, 1, 1, 1, 1, 1, 2);
				slave.pregKnown = 1;
				slave.pregWeek = slave.preg;
				SetBellySize(slave);
				setHealth(slave, jsRandom(-10, 10), undefined, undefined, undefined, 50);
				slave.vagina = random(1, 3);
				slave.boobs += 100 * random(0, 2);
				slave.lactation = 1;
				slave.lactationDuration = 2;
				slave.nipples = either("cute", "inverted", "partially inverted", "puffy");
				newSlaves.push(slave);
			}
			r.push(`In any case, you've enslaved a fine group. The expectant mothers vary widely; the only thing they have in common is their gravid bellies. None of them are in really serious condition, either, and they should bear the transition to slave life reasonably well despite their pregnancies.`);
		} else if (V.eventResults.aidTarget === "gradeSchool") {
			r.push(`In any case, you've enslaved a fine group. The girls are all within a similar age range, young, and healthy. Their youth and vigor should make them quite popular.`);
			for (let i = 0; i < 4; i++) {
				const pram = {disableDisability: 1, ageOverridesPedoMode: 1};
				if (V.minimumSlaveAge <= 7) {
					pram.minAge = 7;
					pram.maxAge = 10;
				} else if (V.minimumSlaveAge <= 11) {
					pram.minAge = 11;
					pram.maxAge = 14;
				} else if (V.minimumSlaveAge <= 15) {
					pram.minAge = 15;
					pram.maxAge = 18;
				} else {
					pram.minAge = 18;
					pram.maxAge = 18;
				}
				slave = GenerateNewSlave(null, pram);
				slave.origin = "$He was a student you enslaved when you evacuated $him from a threatened old world grade school.";
				slave.career = "a student";
				generateSalonModifications(slave);
				slave.devotion = random(-90, -75);
				slave.trust = random(-90, -75);
				setHealth(slave, jsRandom(-10, 10), undefined, undefined, 0, jsRandom(40, 70));
				newSlaves.push(slave);
			}
		} else if (V.eventResults.aidTarget === "conversion") {
			r.push(`In any case, you've enslaved a fine group. Certain religious groups persist in the hilarious delusion that it's possible to alter sexual orientation through prayer. In your experience, hormones, drugs, and compliance training are far more effective.`);
			slave = GenerateNewSlave("XY", {disableDisability: 1, minAge: 26, maxAge: 42});
			slave.origin = "$He was the owner of a religious orientation conversion therapy camp whose remnants you enslaved.";
			slave.career = "a business owner";
			slave.devotion = -20;
			slave.trust = random(-90, -75);
			setHealth(slave, jsRandom(-10, 10), undefined, undefined, undefined, 0);
			slave.anus = random(2, 3);
			slave.weight = random(20, 80);
			slave.attrXX = random(10, 50);
			slave.attrXY = 90;
			slave.energy = random(30, 80);
			slave.skill.oral = random(50, 100);
			slave.skill.penetrative = random(50, 100);
			slave.skill.anal = random(50, 100);
			slave.skill.whoring = 0;
			slave.skill.entertainment = random(15, 40);
			slave.pubicHStyle = "waxed";
			slave.fetish = either("submissive", "cumslut", "buttslut");
			slave.fetishStrength = random(60, 90);
			slave.behavioralFlaw = either("arrogant", "bitchy", "hates women", "odd", "liberated");
			slave.sexualFlaw = either("repressed", "shamefast");
			newSlaves.push(slave);
			for (let i = 0; i < 3; i++) {
				slave = GenerateNewSlave("XY", {disableDisability: 1, minAge: 16, maxAge: 18});
				slave.origin = "$He was an inmate at a religious orientation conversion therapy camp whose remnants you enslaved.";
				slave.career = "a student";
				slave.devotion = random(-90, -75);
				slave.trust = -20;
				setHealth(slave, jsRandom(-10, 10), undefined, undefined, undefined, 20);
				slave.anus = 1;
				slave.weight = random(-50, 0);
				slave.attrXX = random(10, 50);
				slave.attrXY = random(60, 90);
				slave.energy = random(30, 70);
				slave.skill.oral = random(15, 40);
				slave.skill.penetrative = random(15, 40);
				slave.skill.anal = random(15, 40);
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.fetish = "buttslut";
				slave.behavioralFlaw = either("anorexic", "bitchy", "devout", "odd");
				slave.sexualFlaw = either("apathetic", "repressed", "shamefast");
				newSlaves.push(slave);
			}
		} else if (V.eventResults.aidTarget === "volleyballTeam") {
			r.push(`In any case, you've enslaved a fine group. The girls are in fine health, fit and just past their majority, likely the reason any that stepped off the bus were promptly abducted. Their youth and vigor should make them quite popular, as will their experience with handling balls.`);
			for (let i = 0; i < 4; i++) {
				slave = GenerateNewSlave("XX", {
					disableDisability: 1, ageOverridesPedoMode: 1, minAge: 18, maxAge: 18
				});
				slave.natural.height = Height.randomAdult(slave, {skew: 1, limitMult: [0.5, 2.5]});
				slave.height = Height.forAge(slave.natural.height, slave);
				slave.origin = "$He was a volleyball player you enslaved when you evacuated $him from a broken down bus.";
				slave.career = "a student athlete";
				generateSalonModifications(slave);
				slave.devotion = random(-90, -75);
				slave.trust = random(-90, -75);
				setHealth(slave, jsRandom(20, 60), 0, 0, undefined, 90);
				slave.muscles = random(20, 40);
				slave.weight = random(-10, 5);
				slave.waist = random(-40, 0);
				slave.boobs = random(3, 5) * 100;
				slave.natural.boobs = slave.boobs;
				slave.butt = random(1, 2);
				newSlaves.push(slave);
			}
		} else if (V.eventResults.aidTarget === "seizedMission") {
			/* leader */
			let pram = new GenerateNewSlavePram();
			pram.mature = 0;
			pram.disableDisability = 1;
			pram.ageOverridesPedoMode = 1;
			pram.race = "white";
			if (V.pedo_mode === 1) {
				pram.minAge = 18;
				pram.maxAge = 24;
			} else {
				pram.minAge = 25;
				pram.maxAge = 39;
			}
			let missLeader = GenerateNewSlave("XX", pram);
			missLeader.origin = "$He was the head nun of a conquered mission. Once claimed, $he was reduced to nothing more than a cum dump for $his black masters.";
			missLeader.career = "a nun";
			missLeader.intelligence = random(16, 80);
			missLeader.intelligenceImplant = 15;
			missLeader.devotion = 40;
			missLeader.trust = random(0, 40);
			setHealth(missLeader, jsRandom(-50, 10), normalRandInt(15, 3), undefined, undefined, 60);
			missLeader.anus = 3;
			missLeader.vagina = 5;
			missLeader.weight = random(-80, -20);
			missLeader.muscles = random(-20, 0);
			missLeader.waist = random(-40, 0);
			missLeader.attrXY = random(0, 10);
			missLeader.energy = random(0, 20);
			missLeader.skill.vaginal = 50;
			missLeader.skill.oral = 75;
			missLeader.skill.anal = 25;
			missLeader.pubicHStyle = "bushy";
			missLeader.underArmHStyle = "bushy";
			missLeader.preg = random(15, 25);
			missLeader.pregType = 1;
			missLeader.pregKnown = 1;
			missLeader.pregWeek = missLeader.preg;
			SetBellySize(missLeader);
			WombFatherRace(missLeader, "black");
			missLeader.counter.birthsTotal = 3;
			missLeader.bellySag = 5;
			missLeader.bellySagPreg = 5;
			missLeader.boobs += 100 * random(1, 3);
			missLeader.lactation = 1;
			missLeader.lactationDuration = 2;
			missLeader.boobShape = "saggy";
			missLeader.nipples = "huge";
			newSlaves.push(missLeader);

			/* preggo */
			if (V.pedo_mode === 1) {
				pram.minAge = 16;
				pram.maxAge = 18;
			} else {
				pram.minAge = 18;
				pram.maxAge = 24;
			}
			slave = GenerateNewSlave("XX", pram);
			slave.origin = "$He was a nun in a felled mission. Once claimed, $he was reduced to nothing more than a cum dump for $his black masters.";
			slave.career = "a nun";
			slave.intelligenceImplant = 15;
			slave.devotion = 30;
			slave.trust = random(-20, 20);
			setHealth(slave, jsRandom(-60, -10), normalRandInt(15, 3), undefined, undefined, 40);
			slave.anus = 3;
			slave.vagina = 4;
			slave.weight = random(-90, -20);
			slave.muscles = random(-50, -20);
			slave.waist = random(-40, 0);
			slave.attrXY = random(0, 10);
			slave.energy = random(0, 20);
			slave.skill.vaginal = 50;
			slave.skill.oral = 75;
			slave.skill.anal = 25;
			slave.pubicHStyle = "bushy";
			slave.underArmHStyle = "bushy";
			slave.preg = random(30, 35);
			slave.pregType = 1;
			slave.pregKnown = 1;
			slave.pregWeek = slave.preg;
			SetBellySize(slave);
			WombFatherRace(slave, "black");
			slave.counter.birthsTotal = 3;
			slave.bellySag = 5;
			slave.bellySagPreg = 5;
			slave.boobs += 100 * random(0, 2);
			slave.lactation = 1;
			slave.lactationDuration = 2;
			slave.boobShape = "saggy";
			slave.nipples = either("cute", "puffy");
			newSlaves.push(slave);

			/* post preggo */
			if (V.pedo_mode === 1) {
				pram.minAge = 16;
				pram.maxAge = 18;
			} else {
				pram.minAge = 19;
				pram.maxAge = 22;
			}
			slave = GenerateNewSlave("XX", pram);
			slave.origin = "$He was a nun in a felled mission. Once claimed, $he was reduced to nothing more than a cum dump for $his black masters.";
			slave.career = "a nun";
			slave.devotion = 50;
			slave.trust = random(0, 50);
			setHealth(slave, jsRandom(-90, -50), normalRandInt(15, 3), undefined, undefined, 80);
			slave.anus = 3;
			slave.vagina = 5;
			slave.weight = random(-90, -60);
			slave.muscles = random(-70, -20);
			slave.waist = random(-10, 0);
			slave.attrXY = random(0, 10);
			slave.energy = random(0, 20);
			slave.skill.vaginal = 50;
			slave.skill.oral = 75;
			slave.skill.anal = 25;
			slave.pubicHStyle = "bushy";
			slave.underArmHStyle = "bushy";
			slave.preg = 0;
			slave.pregWeek = -3;
			slave.counter.birthsTotal = 2;
			slave.bellySag = 5;
			slave.bellySagPreg = 5;
			slave.boobs += 100 * random(1, 3);
			slave.lactation = 1;
			slave.lactationDuration = 1;
			slave.boobsMilk = 200;
			slave.boobs += slave.boobsMilk;
			slave.boobShape = "saggy";
			slave.nipples = either("cute", "puffy");
			newSlaves.push(slave);

			/* young preggo*/
			if (V.minimumSlaveAge < V.fertilityAge) {
				if (V.minimumSlaveAge < 8) {
					pram.minAge = 8;
					pram.maxAge = 8;
				} else {
					pram.minAge = V.fertilityAge;
					pram.maxAge = V.fertilityAge;
				}
			} else {
				if (V.fertilityAge < 8) {
					pram.minAge = 8;
					pram.maxAge = 8;
				} else {
					pram.minAge = V.minimumSlaveAge;
					pram.maxAge = V.minimumSlaveAge;
				}
			}
			const missLoli = GenerateNewSlave("XX", pram);
			missLoli.origin = "$He was a fucktoy held in a felled mission. $He was nothing more than a cum dump to $his black masters.";
			missLoli.career = "an orphan";
			missLoli.devotion = -20;
			missLoli.trust = random(-100, -80);
			setHealth(missLoli, jsRandom(-90, -70), normalRandInt(25, 3), undefined, undefined, 100);
			missLoli.anus = 3;
			missLoli.vagina = 5;
			missLoli.pubertyXX = 1;
			missLoli.weight = random(-100, -60);
			missLoli.muscles = random(-100, -80);
			missLoli.waist = random(-40, -10);
			missLoli.attrXY = random(0, 10);
			missLoli.energy = random(0, 20);
			missLoli.skill.vaginal = 75;
			missLoli.skill.oral = 75;
			missLoli.skill.anal = 50;
			missLoli.pubicHStyle = "bushy";
			missLoli.underArmHStyle = "bushy";
			missLoli.preg = 40;
			missLoli.pregType = 1;
			missLoli.pregKnown = 1;
			missLoli.pregWeek = missLoli.preg;
			SetBellySize(missLoli);
			WombFatherRace(missLoli, "black");
			missLoli.counter.birthsTotal = 0;
			missLoli.bellySag = 5;
			missLoli.bellySagPreg = 5;
			if (missLoli.boobs < 300) {
				missLoli.boobs = 400;
			} else {
				missLoli.boobs += 100;
			}
			missLoli.lactation = 1;
			missLoli.lactationDuration = 2;
			missLoli.boobShape = either("perky", "torpedo-shaped");
			missLoli.nipples = either("cute", "puffy");
			newSlaves.push(missLoli);

			const {he, his, him} = getPronouns(missLeader);
			const {he2, his2, him2, girl2} = getPronouns(missLoli).appendSuffix("2");
			r.push(`In any case, you've enslaved a fine group. The women will clean up nicely and are already accustomed to being raped and abused, so they should bear the transition to slave life reasonably well. The leader is a little older than the rest and clearly has been pregnant several times given the sag to ${his} breasts and the stretch marks coating ${his} swollen belly; it's clear ${he} has a rape baby growing inside ${him}. The next two are younger, but no better off; one is hugely pregnant and the other shows signs of a recent birth. The last, however, is the most eye-catching;`);
			if (V.minimumSlaveAge < 8 && V.fertilityAge < 8) {
				r.push(`${he2} is just a little ${girl2} and a massively pregnant one at that. The leader was right to worry about ${his2} well-being; there is no way ${he2} would survive giving birth.`);
			} else if (V.fertilityAge < 18 && V.minimumSlaveAge < 18) {
				r.push(`${he2} is in no way prepared to be as pregnant as ${he2} is. The leader was right to worry about ${his2} well-being; birth is going to be a struggle for ${him2}.`);
			} else {
				r.push(`${his2} stomach has already dropped and ${he2} clearly has no experience with pregnancy. The leader was right to worry about ${his2} well-being; ${his2} body is ill-suited for childbirth.`);
			}
		} else {
			r.push(`In any case, you've enslaved a fine group. The women seem to have banded together when they were left to fend for themselves in their suburban neighborhood. They're older than many slaves, but they seem to have had rich husbands; they're conventionally pretty, and have lived soft lives that have left them healthy.`);
			for (let i = 0; i < 4; i++) {
				slave = GenerateNewSlave("XX", {disableDisability: 1, minAge: 26, maxAge: 42});
				slave.origin = "$He was a wealthy housewife who you enslaved as $he fled societal collapse.";
				slave.career = "a housewife";
				slave.devotion = -20;
				slave.trust = random(-10, 10);
				setHealth(slave, jsRandom(30, 50), 0, 0, 0);
				slave.anus = 1;
				slave.vagina = random(1, 2);
				slave.weight = random(-20, 20);
				slave.boobs += 100 * random(0, 3);
				slave.butt += random(0, 2);
				slave.attrXX = random(10, 50);
				slave.attrXY = random(60, 90);
				slave.energy = random(20, 80);
				slave.skill.vaginal = 15;
				slave.skill.oral = 15;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 15;
				slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy", "liberated");
				slave.sexualFlaw = either("apathetic", "hates anal", "hates oral", "idealistic", "shamefast");
				newSlaves.push(slave);
			}
		}
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Sell your captures immediately`, sell),
			new App.Events.Result(`Enslave them all`, enslave),
		]);
		return node;

		function sell() {
			for (const s of newSlaves) {
				cashX(slaveCost(s), "slaveTransfer");
			}
			return `Prisoners <span class="green">sold.</span>`;
		}

		function enslave() {
			for (const s of newSlaves) {
				newSlave(s); // skip New Slave Intro — TODO: use Bulk Slave Intro
			}
			return `You simply enslave all of the escapees yourself. These slaves will more than make up for the costs you expended, in the long run.`;
		}
	}
};
