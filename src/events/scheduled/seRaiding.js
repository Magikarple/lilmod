/*
Notes:
Raiding used to have godawful success rates,
especially when playing without the Special Force.
It has been rebalanced to improve capture odds.
If changing values, check your math and make sure that:
no target is completely impossible to capture, with or without SF,
odds of capturing an average target are about 50% WITHOUT the SF,
and odds of capturing a worst-case target are about 50% WITH fully upgraded SF.
*/

App.Events.SERaiding = class SERaiding extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.policies.raidingMercenaries === 1,
			() => V.week > V.raided + 6
		];
	}

	execute(node) {
		V.raided = V.week;
		let r = [];
		let MercCaptureL = -3;
		let MercCaptureU = 6;
		let raidEscapeL = -2;
		let raidEscapeU = 1;

		let artDiv = document.createElement("div"); // named container so we can replace it later
		node.appendChild(artDiv);

		r.push(`The leader of your ${V.mercenariesTitle} has contacted you from the world outside your arcology. It seems that your ${V.mercenariesTitle} have enjoyed a profitable series of raids in their time outside the arcology and have decided to push their luck by plundering one last location on their way back to the arcology. As their nominal leader, they ask your opinion of a small number of potential targets. Given the distance from the arcology and the time sensitivity of conducting such a mission, you have little to base your decision on besides a brief description.`);
		if (V.SF.Toggle && V.SF.Active >= 1) {
			const satEffect = function() {
				MercCaptureL += 2;
				MercCaptureU += 1;
				raidEscapeL -= 1;
			};

			const planeEffect = function() {
				MercCaptureL += 2;
				MercCaptureU += 1;
				raidEscapeL -= 1;
			};

			const comboEffect = function() {
				MercCaptureL += 2;
			};
			const hasSat = (V.SF.Squad.Satellite >= 1 && V.SF.SatLaunched > 0);
			const hasPlane = V.SF.Squad.SpacePlane >= 1;
			if (hasPlane || hasSat) {
				r.push(`By having access to the use of ${V.SF.Lower}'s`);
				if (hasSat && hasPlane) {
					r.push(`satellite and space plane it is even`);
					satEffect();
					planeEffect();
					comboEffect();
				} else if (hasSat) {
					r.push(`satellite it is`);
					satEffect();
				} else if (hasPlane) {
					r.push(`space plane it is`);
					planeEffect();
				}
				r.push(`less likely that the target will escape.`);
			}
		}
		const MercCapture = random(MercCaptureL, MercCaptureU);
		const raidEscape = random(raidEscapeL, raidEscapeU);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`Worthy of consideration is that although the ${V.mercenariesTitle} will enslave the lion's share of enslaved prisoners for the corporation, they will present you the finest slave captured as a gesture of respect for your high position.`);

		let originArray = [];
		if (V.seeDicks !== 100) {
			originArray.push("housewife");
			originArray.push("university professor");
			originArray.push("university student");
			originArray.push("female military officer");
			originArray.push("military soldier");
			originArray.push("doctor");
			originArray.push("nun");
			originArray.push("journalist");
			originArray.push("local news anchor");
			originArray.push("classical dancer");
			originArray.push("law enforcement officer");
			originArray.push("classical musician");
			originArray.push("politician");
			originArray.push("shut-in");
			originArray.push("procuress");
			originArray.push("investor");
			originArray.push("scientist");
			originArray.push("lawyer");
		}
		if (V.seeDicks !== 0) {
			if (V.seeDicks === 100) {
				originArray.push("male military officer", "male military officer", "male military officer");/* TODO: add more XY targets so this isn't necessary*/
			} else {
				originArray.push("male military officer");
			}
		}

		const targets = App.UI.DOM.appendNewElement("p", node, `Your ${V.mercenariesTitle} look to you for guidance and will strike the target of your choosing.`);

		for (let ser = 0; ser < 3; ser++) {
			r = [];
			r.push(`The`);
			if (ser === 0) {
				r.push(`first`);
			} else if (ser === 1) {
				r.push(`second`);
			} else {
				r.push(`third and final`);
			}
			r.push(`target`);

			let targetEscape = 0;
			const origin = originArray.pluck();
			const slave = createRaidee(origin);
			const {
				He, His,
				he, his, him, himself, woman, girl, wife
			} = getPronouns(slave);
			switch (origin) {
				case "housewife":
					r.push(`is an idyllic mansion in the countryside of an old world nation. Its owner is a businessman of some notoriety, but is often away from his expansive estate. A number of servants and maids are in residence, but the primary resident of the mansion is his ${wife}. From the sound of things, ${he} is not a young ${woman} but attractive enough in a fake sort of way.`);
					break;
				case "university professor":
					r.push(`is the department offices of a still operational old world university. The University prides itself on a diverse and capable faculty, often touting its wealth of female professors as a symbol of its progressive agenda. Though they are unlikely to be young, these professors will be educated and quite intelligent. The head of the department is no exception, a ${woman} of considerable academic credentials.`);
					break;
				case "university student":
					r.push(`is the residence dormitories of a still operational old world university. The University prides itself on a diverse and inspired student body, often touting its wealth of female students as a symbol of its progressive agenda. Though they are young, these students will likely have benefited from their education and fairly intelligent. By all accounts the prettiest of them is no exception, a student with a shining academic record.`);
					break;
				case "female military officer":
					r.push(`is a military officer currently traveling to the front of a fresh conflict between rival powers in the old world. In an attempt to disguise ${his} high rank, ${he} is traveling with only a small escort of soldiers and is a prime target for enslavement. The officer is a graduate of a renowned old world military college and no stranger to the battlefield, yet has retained ${his} femininity despite ${his} considerable achievements.`);
					break;
				case "male military officer":
					r.push(`is a military officer currently traveling to the front of a fresh conflict between rival powers in the old world. In an attempt to disguise ${his} high rank, ${he} is traveling with only a small escort of soldiers and is a prime target for enslavement. The officer is a graduate of a renowned old world military college and no stranger to the battlefield.`);
					break;
				case "military soldier":
					r.push(`is the barracks of a local garrison in an old world town. The majority of the town's young men have already been sent to the front of a new conflict, so the town has conscripted a number of young women to fill the ranks of their garrison. Though the soldiers are likely to be untested, they have still received some measure of combat training. Their sergeant is the nominal leader of the group, though ${he} holds the position due to familial connections rather than any real military seniority.`);
					break;
				case "doctor":
					r.push(`is a hospital located in an impoverished old world City. Despite its crime ridden surroundings, the hospital possesses a sterling reputation as a result of its distinguished staff of veteran doctors and nurses. Chief among these medical professionals is a female doctor, an accomplished pioneer in ${his} field.`);
					break;
				case "nun":
					r.push(`is a reclusive religious community in a mountain range between two current conflict zones. The members of the community have withdrawn from the collapsing social order of the world and established a commune in their mountain retreat, filling their days with peaceful reflection and prayer. Though the nuns have no true leader, one among them has emerged as the most pious of the sisters.`);
					break;
				case "journalist":
					r.push(`is the offices of an esteemed old world newspaper firm. The paper is known for its investigative journalism, particularly as one of the few firms willing to delve into the brave new world of the Free Cities. The rising star of the paper is undoubtedly a young journalist who has been an outspoken critic of slaveholding and other Free Cities traditions.`);
					break;
				case "local news anchor":
					r.push(`is the recording studio of a sleepy old world town's local news channel. The news channel itself is unremarkable, a quaint reminder of the tedious life of a small town, save for its news anchor. The anchor stands in stark contrast to ${his} fellow residents by the abundance of ${his} plastic surgery, likely an attempt to cling to youth lest ${his} coveted anchor position be snatched away by a younger ${woman}.`);
					break;
				case "classical dancer":
					r.push(`is the performing arts theater at the heart of an aristocratic old world city. The theater itself would usually not be considered a choice target, except that tonight its stage is graced by a renowned dance troupe. The jewel of the troupe's cast is a young ${girl}${(V.pedo_mode === 0) ? `, barely past ${his} majority,` : ``} whose performance has been said to bring tears to the eyes of audiences the world over.`);
					break;
				case "law enforcement officer":
					r.push(`is the precinct of a small old world town's police department. The department is notoriously underfunded and unlikely to be particularly well staffed. Nonetheless, one of the officers is well known in the area for ${his} adherence to the letter of the law despite ${his} small town cop status.`);
					break;
				case "classical musician":
					r.push(`is the concert hall at the heart of an aristocratic old world city. The concert hall itself would usually not be considered a choice target, except that tonight its stage is graced by a renowned orchestra. The pride of the orchestra's cast is a `);
					if (slave.visualAge < 13) {
						r.push(`little ${girl}`);
					} else if (slave.visualAge <= 18) {
						r.push(`teenager`);
					} else if (slave.visualAge <= 24) {
						r.push(`young ${woman}`);
					} else if (slave.visualAge <= 32) {
						r.push(`${woman}`);
					} else {
						r.push(`mature ${woman}`);
					}
					r.push(`whose skill with ${his} instrument has been known to move listeners to tears.`);
					break;
				case "politician":
					r.push(`is a campaign rally for the reelection of an old world politician. Though the rally will be an extremely public affair, the benefits of capturing a prestigious politician could outweigh the risks.`);
					break;
				case "shut-in":
					r.push(`is the shack of a notorious shut-in located just outside your arcology. Not a particularly distinguished target, but it would save your ${V.mercenariesTitle} considerable time and effort. The shut-in ${himself} has been a fixture of the landscape for `);
					if (slave.visualAge < 13) {
						r.push(`only a little while,`);
					} else if (slave.visualAge <= 18) {
						r.push(`some time,`);
					} else if (slave.visualAge <= 32) {
						r.push(`years,`);
					} else {
						r.push(`decades,`);
					}
					r.push(`with many speculating that ${he} remains a virgin${(slave.visualAge > 32) ? ` despite ${his} mature age` : ``}.`);
					break;
				case "procuress":
					r.push(`is a halfway house for vulnerable women operating in a nearby conflict zone. Far from being a wholesome institution, the proprietor of this halfway house is a notorious procuress who sells ${his} guests into slavery. Raiding the halfway house avoids the procuress' fees on a new shipment of slaves, with the procuress ${himself} as a tempting bonus.`);
					break;
				case "investor":
					r.push(`is one of the last remaining business expositions still operating in the old world. In years past, such expositions were often a showcase for innovation and corporate development but in recent years have become a sad spectacle of industry stagnation. This particular exposition's keynote speaker is a reputable investor with decades of experience, hoping to breathe new life into some valuable yet dying firms.`);
					break;
				case "scientist":
					r.push(`is a research lab operating on the lawless fringe between the old world and the Free Cities. Here, scientists push the boundaries of the known world without the burden of governmental oversight or moral restrictions. Their de facto leader is a fellow scientist, one of the first to leave the old world behind in pursuit of knowledge.`);
					break;
				case "lawyer":
					r.push(`is the offices of a law firm operating on the boundary between the old world and the Free Cities. The lawyers within profit from the shaky legal channels between old world nations and new Free Cities, largely drawing up contracts or facilitating the transfer of goods, services, and slaves. The sole senior partner of the firm is one of the pioneers of this new field of legal work, having been a staunch corporate advocate for much of ${his} life.`);
					break;
			}

			slave.origin = `Your ${V.mercenariesTitle} caught $him while raiding; $he was a ${origin}.`;
			setHealth(slave, random(30, 50));
			slave.devotion = random(-45, -25);
			slave.trust = random(-60, -75);
			slave.oldDevotion = slave.devotion;

			r.push(`The ${origin} is the primary target of the raid. ${He}'s <span class="race">${slave.race}.</span>`);
			if (slave.physicalAge <= 6) {
				r.push(`${He} is a young child and should be easy to corral.`);
				targetEscape -= 2;
			} else if (slave.physicalAge <= 12) {
				r.push(`${He} is just a kid, but might have some surprises up ${his} sleeves.`);
				targetEscape += 1;
			} else if (slave.physicalAge >= 100) {
				r.push(`${He} is really, really old and won't stand a chance of shuffling off.`);
				targetEscape -= 5;
			} else if (slave.physicalAge >= 85) {
				r.push(`${He} is very old and unlikely to be hard to catch.`);
				targetEscape -= 3;
			} else if (slave.physicalAge >= 70) {
				r.push(`${He} is old and slow.`);
				targetEscape -= 1;
			}
			if (slave.weight > 190) {
				r.push(`${His} figure is catastrophically fat, so much so that the raid might be better off laying down speedbumps to thwart ${his} rascal-powered flight.`);
				targetEscape -= 5;
			} else if (slave.weight > 160) {
				r.push(`${His} figure is extremely fat and unlikely to make it far, especially if stairs are involved.`);
				targetEscape -= 3;
			} else if (slave.weight > 95) {
				r.push(`${His} figure is quite fat.`);
				targetEscape -= 2;
			} else if (slave.weight > 30) {
				r.push(`${His} figure is fairly chubby.`);
				targetEscape -= 1;
			} else if (slave.weight < -95) {
				r.push(`${He}'s so skinny that ${he} appears almost emaciated.`);
				targetEscape -= 1;
			} else if (slave.weight < -10) {
				r.push(`${His} slender form is well-suited to wriggling through crowds and tight spaces.`);
				targetEscape += 1;
			} else {
				r.push(`${He} has a fairly average weight.`);
			}
			if (slave.muscles > 30) {
				r.push(`${His} heavy musculature weighs ${him} down.`);
				targetEscape -= 1;
			} else if (slave.muscles > 5) {
				r.push(`${His} muscles are toned, but still nimble.`);
				targetEscape += 1;
			} else if (slave.muscles < -30) {
				r.push(`${His} muscles barely have the strength to keep ${him} standing, let alone power a flight.`);
				targetEscape -= 3;
			} else if (slave.muscles < -5) {
				r.push(`${His} body is soft and toneless.`);
				targetEscape -= 1;
			} else {
				r.push(`${His} body is of average musculature.`);
			}
			if (slave.height >= 185) {
				r.push(`${He}'s tall enough that ${his} height makes ${him} easy to spot.`);
				targetEscape -= 2;
			} else if (slave.height < 150) {
				r.push(`${He}'s short enough that ${his} height makes ${him} difficult to spot.`);
				targetEscape += 1;
			} else {
				r.push(`${He}'s of an average height.`);
			}
			if (slave.boobs >= 2000) {
				r.push(`${He} has absurdly large breasts.`);
				targetEscape -= 3;
			} else if (slave.boobs >= 800) {
				r.push(`${He} has fairly large breasts.`);
				targetEscape -= 1;
			} else if (slave.boobs >= 400) {
				r.push(`${He} has medium sized breasts.`);
			} else if (slave.genes === "XX") { // no flat-chested bonus for men
				r.push(`${He}'s fairly flat chested.`);
				targetEscape += 1;
			}
			if (slave.butt >= 6) {
				r.push(`${He} has an immense posterior.`);
				targetEscape -= 1;
			} else if (slave.butt >= 4) {
				r.push(`${He} has a large ass.`);
			} else if (slave.butt >= 2) {
				r.push(`${He}'s got an ordinary butt.`);
			} else {
				r.push(`${He}'s got a flat ass.`);
				targetEscape += 1;
			}
			if (slave.dick >= 5) {
				r.push(`${His} cock is large enough to slow ${him} down.`);
				targetEscape -= 1;
			}
			if (slave.balls >= 5 && slave.scrotum > 0) {
				r.push(`${His} balls are likely to hurt while running, enough to slow ${him} down.`);
				targetEscape -= 1;
			}
			if (slave.preg >= slave.pregData.normalBirth - 1) {
				r.push(`${His} ripe pregnant belly is very likely to preclude ${him} from escaping without help at all. All it takes is ${his} water breaking to practically doom ${his} flight.`);
				targetEscape -= 10;
			} else if (slave.belly >= 60000) {
				r.push(`${He} is so massively pregnant it'll be next to impossible for ${him} to escape on foot.`);
				targetEscape -= 10;
			} else if (slave.belly >= 10000) {
				r.push(`${His} pregnant belly is likely to preclude ${him} from escaping on foot at all.`);
				targetEscape -= 5;
			} else if (slave.belly >= 5000) {
				r.push(`${He}'s visibly pregnant and likely to be cautious and slow during ${his} escape.`);
				targetEscape -= 3;
			} else if (slave.belly >= 1500) {
				r.push(`There is a slight roundness to ${his} middle, likely an early pregnancy that will distract ${him} from fleeing.`);
				targetEscape -= 1;
			}

			// pity points for players without Special Force
			// 25% chance at 5 and 50% at 6 targetEscape to reduce targetEscape by 1
			// RAISE THESE VALUES if maximum targetEscape is increased
			if (!(V.SF.Toggle && V.SF.Active >= 1)) {
				if (targetEscape >= 5 && random(5, 8) <= targetEscape) {
					targetEscape--;
				}
			}

			r.push(App.UI.DOM.makeElement("div", App.UI.DOM.link(
				`The ${origin}`,
				() => {
					jQuery(targets).empty().append(raidingAssault(slave, origin, targetEscape));
				}
			)));
			App.Events.addParagraph(targets, r);
		}

		function createRaidee(origin) {
			let slave;
			let pram = {};
			switch (origin) {
				case "housewife":
					slave = GenerateNewSlave("XX", {
						minAge: 33, maxAge: 39, disableDisability: 1, ageOverridesPedoMode: 1
					});
					generateSalonModifications(slave);
					slave.boobs += 800;
					slave.boobsImplant += 800;
					slave.boobsImplantType = "normal";
					slave.butt += 1;
					slave.buttImplant += 1;
					slave.buttImplantType = "normal";
					slave.face = 55;
					slave.faceImplant += 20;
					slave.anus = 1;
					slave.vagina = 1;
					slave.ovaries = 1;
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, 0, 0, 0, 5, 10, 20, 30, 39);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.skill.vaginal = 35;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 35;
					slave.teeth = "normal";
					slave.weight = random(-50, 130);
					slave.career = either("a housewife", "a trophy wife");
					slave.clothes = "conservative clothing";
					break;
				case "university professor":
					slave = GenerateNewSlave("XX", {
						minAge: 35, maxAge: 55, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a professor";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 10;
					slave.intelligence = random(70, 90);
					slave.intelligenceImplant = 30;
					slave.teeth = "normal";
					slave.weight = random(-20, 90);
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 5, 10, 20, 30, 39);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "nice business attire";
					break;
				case "university student":
					slave = GenerateNewSlave("XX", {
						minAge: 14, maxAge: 22, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a student";
					generateSalonModifications(slave);
					slave.face = random(15, 100);
					slave.anus = 0;
					slave.vagina = 1;
					slave.skill.vaginal = 0;
					slave.skill.anal = 0;
					slave.skill.oral = 0;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 0;
					slave.intelligence = random(0, 60);
					slave.intelligenceImplant = 15;
					slave.teeth = "normal";
					slave.weight = random(-60, 40);
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 5, 10);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "a schoolgirl outfit";
					break;
				case "female military officer":
					slave = GenerateNewSlave("XX", {
						minAge: 26, maxAge: 45, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a military officer";
					generateSalonModifications(slave);
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.combat = 70;
					slave.skill.entertainment = 10;
					slave.intelligence = random(20, 60);
					slave.intelligenceImplant = 15;
					slave.teeth = "normal";
					slave.weight = 0;
					slave.muscles = 25;
					slave.clothes = "a military uniform";
					break;
				case "male military officer":
					slave = GenerateNewSlave("XY", {
						minAge: 26, maxAge: 45, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a military officer";
					slave.skill.penetrative = 35;
					slave.skill.anal = 0;
					slave.skill.oral = 0;
					slave.skill.whoring = 0;
					slave.skill.combat = 70;
					slave.intelligence = random(20, 60);
					slave.intelligenceImplant = 15;
					slave.hStyle = either("buzzcut", "bun", "shaved", "neat");
					slave.hLength = jsRandom(1, 9);
					slave.boobs = 150;
					slave.vagina = -1;
					slave.clit = 0;
					slave.ovaries = 0;
					slave.preg = 0;
					slave.dick = random(3, 5);
					slave.balls = random(2, 4);
					slave.scrotum = slave.balls;
					slave.anus = 0;
					slave.weight = 0;
					slave.muscles = 50;
					slave.clothes = "battledress";
					break;
				case "military soldier":
					pram = {disableDisability: 1, minAge: 18};
					if (V.pedo_mode === 1) {
						pram.ageOverridesPedoMode = 1;
					} else {
						pram.maxAge = 25;
					}
					slave = GenerateNewSlave("XX", pram);
					slave.career = "a soldier";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.combat = 70;
					slave.skill.entertainment = 10;
					slave.intelligenceImplant = 15;
					slave.teeth = "normal";
					slave.weight = random(0, 20);
					slave.muscles = 10;
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 5, 5);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "battledress";
					break;
				case "doctor":
					slave = GenerateNewSlave("XX", {
						minAge: 28, maxAge: 55, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a doctor";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 10;
					slave.intelligence = random(60, 90);
					slave.intelligenceImplant = 30;
					slave.teeth = "normal";
					slave.weight = random(-40, 40);
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 5, 10);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "a nice nurse outfit";
					break;
				case "nun":
					slave = GenerateNewSlave("XX", {maxAge: 70, disableDisability: 1});
					slave.career = "a nun";
					slave.anus = 0;
					slave.vagina = 0;
					slave.weight = random(-100, -20);
					slave.attrXX = random(10, 50);
					slave.attrXY = random(10, 50);
					slave.energy = random(5, 20);
					slave.skill.vaginal = 0;
					slave.skill.oral = 15;
					slave.skill.anal = 0;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 0;
					slave.behavioralFlaw = "devout";
					slave.sexualFlaw = "repressed";
					slave.clothes = "a penitent nuns habit";
					break;
				case "journalist":
					slave = GenerateNewSlave("XX", {
						minAge: 18, maxAge: 26, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a journalist";
					generateSalonModifications(slave);
					slave.face = random(-20, 0);
					slave.anus = 0;
					slave.vagina = 1;
					slave.skill.vaginal = 0;
					slave.skill.anal = 0;
					slave.skill.oral = 0;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 35;
					slave.intelligence = random(0, 100);
					slave.intelligenceImplant = 15;
					slave.behavioralFlaw = "liberated";
					slave.sexualFlaw = "idealistic";
					slave.weight = random(-40, 40);
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 5, 10);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "nice business attire";
					break;
				case "local news anchor":
					slave = GenerateNewSlave("XX", {
						minAge: 35, maxAge: 39, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.boobs += 800;
					slave.boobsImplant += 800;
					slave.boobsImplantType = "fillable";
					slave.butt += 1;
					slave.buttImplant += 1;
					slave.buttImplantType = "normal";
					slave.face = 55;
					slave.faceImplant += 20;
					slave.anus = 1;
					slave.vagina = 1;
					slave.preg = -1;
					slave.ovaries = 1;
					slave.skill.vaginal = 35;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 35;
					slave.skill.entertainment = 35;
					slave.career = "a local news anchor";
					slave.weight = random(-40, 40);
					slave.clothes = "slutty business attire";
					break;
				case "classical dancer":
					slave = GenerateNewSlave("XX", {maxAge: 20, disableDisability: 1});
					slave.career = "a classical dancer";
					slave.prestige = 1;
					slave.prestigeDesc = "$He was the pride of a renowned dance troupe.";
					slave.face = random(-20, 40);
					slave.anus = 0;
					slave.vagina = 1;
					slave.skill.vaginal = 0;
					slave.skill.anal = 0;
					slave.skill.oral = 0;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 50;
					if (slave.physicalAge >= 12) {
						slave.teeth = "normal";
					}
					slave.weight = random(-100, -10);
					slave.clothes = "a ball gown";
					break;
				case "law enforcement officer":
					pram = {minAge: 18, disableDisability: 1};
					if (V.pedo_mode === 1) {
						pram.ageOverridesPedoMode = 1;
					} else {
						pram.maxAge = 25;
					}
					slave = GenerateNewSlave("XX", pram);
					slave.career = "a law enforcement officer";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.combat = 70;
					slave.skill.entertainment = 10;
					slave.intelligenceImplant = 15;
					slave.weight = random(-10, 90);
					slave.muscles = random(10, 35);
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 5, 5);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "a police uniform";
					break;
				case "classical musician":
					slave = GenerateNewSlave("XX", {maxAge: 43, disableDisability: 1, ageOverridesPedoMode: 1});
					slave.career = "a classical musician";
					slave.prestige = 1;
					slave.prestigeDesc = "$He was the pride of a renowned orchestra.";
					slave.face = random(-20, 0);
					slave.anus = 0;
					slave.skill.vaginal = 0;
					slave.skill.anal = 0;
					slave.skill.oral = 0;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 50;
					if (slave.physicalAge >= 12) {
						slave.teeth = "normal";
					}
					slave.weight = random(-50, 15);
					if (slave.vagina > 0) {
						if (isFertile(slave) && V.seePreg !== 0) {
							slave.preg = either(-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 5, 10);
							if (slave.preg > 0) {
								slave.pregType = setPregType(slave);
								WombImpregnate(slave, slave.pregType, 0, slave.preg);
								slave.pregKnown = 1;
								slave.pregWeek = slave.preg;
								SetBellySize(slave);
							}
						} else {
							slave.preg = -1;
						}
						slave.vagina = 1;
					}
					slave.clothes = "a halter top dress";
					break;
				case "politician":
					slave = GenerateNewSlave("XX", {
						minAge: 35, maxAge: 65, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a politician";
					slave.prestige = 2;
					slave.prestigeDesc = "$He was a widely known politician in $his former life. $His face has graced many campaign posters.";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 10;
					slave.intelligence = random(60, 90);
					slave.intelligenceImplant = 30;
					slave.teeth = "normal";
					slave.weight = random(-10, 60);
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 39);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "nice business attire";
					break;
				case "shut-in":
					slave = GenerateNewSlave("XX", {maxAge: 43, disableDisability: 1});
					generateSalonModifications(slave);
					slave.career = "a shut-in";
					slave.anus = 0;
					slave.face = random(15, 100);
					slave.vagina = 0;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 10;
					slave.weight = random(-100, 60);
					slave.clothes = "spats and a tank top";
					break;
				case "procuress":
					slave = GenerateNewSlave("XX", {
						minAge: 20, maxAge: 65, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a procuress";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 25;
					slave.skill.entertainment = 25;
					slave.intelligence = random(51, 80);
					slave.weight = random(-10, 120);
					slave.clothes = "slutty business attire";
					break;
				case "investor":
					slave = GenerateNewSlave("XX", {
						minAge: 35, maxAge: 55, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "an investor";
					slave.prestige = 1;
					slave.prestigeDesc = "$He is a reputable investor from a bygone age.";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 10;
					slave.intelligence = random(51, 80);
					slave.intelligenceImplant = 15;
					slave.weight = random(-50, 60);
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 39);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "nice business attire";
					break;
				case "scientist":
					slave = GenerateNewSlave("XX", {minAge: 28, maxAge: 55, disableDisability: 1});
					slave.career = "a scientist";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 10;
					slave.intelligence = random(70, 90);
					slave.intelligenceImplant = 30;
					slave.teeth = "normal";
					slave.weight = random(-50, 50);
					slave.clothes = "conservative clothing";
					break;
				case "lawyer":
					slave = GenerateNewSlave("XX", {
						minAge: 30, maxAge: 55, disableDisability: 1, ageOverridesPedoMode: 1
					});
					slave.career = "a lawyer";
					slave.face = random(15, 100);
					slave.vagina = 1;
					slave.skill.oral = 35;
					slave.skill.anal = 15;
					slave.skill.whoring = 0;
					slave.skill.entertainment = 20;
					slave.intelligence = random(20, 50);
					slave.intelligenceImplant = 15;
					slave.weight = random(-50, 140);
					if (isFertile(slave) && V.seePreg !== 0) {
						slave.preg = either(-1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 10, 20, 30, 39);
						if (slave.preg > 0) {
							slave.pregType = setPregType(slave);
							WombImpregnate(slave, slave.pregType, 0, slave.preg);
							slave.pregKnown = 1;
							slave.pregWeek = slave.preg;
							SetBellySize(slave);
						}
					} else {
						slave.preg = -1;
					}
					slave.clothes = "nice business attire";
					break;
			}
			return slave;
		}

		function raidingAssault(slave, origin, targetEscape) {
			const el = new DocumentFragment();
			const r = [];
			r.push(`You make your selection and direct your ${V.mercenariesTitle} begin the raid and attempt to acquire the ${origin}.`);
			const {
				He,
				he, his, him, himself, wife, woman
			} = getPronouns(slave);

			switch (origin) {
				case "housewife":
					if (targetEscape > MercCapture) {
						r.push(`Somehow the house${wife} manages to evade your mercenaries.`);
					} else if (raidEscape === 1) {
						r.push(`Your ${V.mercenariesTitle} pry open the door to the mansion's panic room to find that the ${woman} has hung ${himself} to escape capture. A waste.`);
					} else {
						r.push(`Your ${V.mercenariesTitle} pry open the door to the mansion's panic room and pull the protesting house${wife} from its depths. The house${wife} watches in terror as your ${V.mercenariesTitle} slake their lust on ${his} servants and maids, knowing that ${his} respite from a brutal rape must only be a temporary blessing.`);
						newSlave(slave); // skip New Slave Intro
					}
					break;
				case "university professor":
					if (targetEscape > MercCapture) {
						r.push(`A confrontation with the University's security team allows the professors to escape capture by the ${V.mercenariesTitle}.`);
					} else if (raidEscape === 1) {
						r.push(`Your ${V.mercenariesTitle} are met with surprising resistance by the university's professors and are forced to bid a hasty retreat before security can arrive in greater numbers.`);
					} else {
						r.push(`Your ${V.mercenariesTitle} corner the professors and their department head in one of the university's many conference rooms, hauling them off to the VTOLs when the academics promptly surrender. The department head spends the VTOL ride back to your arcology watching in terror as ${his} colleagues and peers are raped wholesale by your mercenaries. With ${his} educated mind, ${he} knows that being singled out from a similar fate must mean ${he} is being saved for someone and worries about who that might be.`);
						newSlave(slave); // skip New Slave Intro
					}
					break;
				case "university student":
					if (targetEscape > MercCapture) {
						r.push(`A confrontation with the University's security team allows the students to escape capture by the ${V.mercenariesTitle}.`);
					} else if (raidEscape === 1) {
						r.push(`Your ${V.mercenariesTitle} are met with surprising resistance by the university's students and are forced to bid a hasty retreat before security can arrive in greater numbers.`);
					} else {
						r.push(`Your ${V.mercenariesTitle} corner the students in their rooms, hauling them off one by one to the VTOLs as they protest feebly. The peerless student spends the VTOL ride back to your arcology watching in terror as ${his} friends and peers are raped wholesale by your mercenaries. With ${his} educated mind, ${he} knows that being singled out from a similar fate must mean ${he} is being saved for someone and worries about who that might be.`);
						newSlave(slave);// skip New Slave Intro
					}
					break;
				case "female military officer":
				case "male military officer":
					if (targetEscape > MercCapture) {
						r.push(`The officer's escort engages the ${V.mercenariesTitle} in a gunfight and in the confusion the officer manages to escape capture on foot.`);
					} else if (raidEscape === 1) {
						r.push(`As your mercenaries gain the upper hand on the officer's escort, ${he} promptly puts ${his} service weapon to ${his} temple and pulls the trigger. A waste.`);
					} else {
						r.push(`As your mercenaries gain the upper hand on the officer's escort, ${he} promptly puts ${his} service weapon to ${his} temple but hesitates. Luckily one of your ${V.mercenariesTitle} is close by and able to pluck the pistol from ${his} stiff fingers. The despondent officer is cuffed and taken back to the VTOL for transport. The officer spends the VTOL ride back to your arcology watching as your ${V.mercenariesTitle} rape ${his} defeated subordinates. Given their brutal treatment, ${he} doubts ${his} respite from such a fate is due to any battlefield rules of conduct.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "military soldier":
					if (targetEscape > MercCapture) {
						r.push(`The young soldiers fight valiantly against the ${V.mercenariesTitle} until they are routed. Despite defeating them in the field, your ${V.mercenariesTitle} are unable to capture any of the soldiers who escape on foot.`);
					} else if (raidEscape === 1) {
						r.push(`The young soldiers are unfaltering in their conviction and fight to their last last. When the smoke clears, the barracks is chocked with corpses for none of the soldiers are left alive to capture.`);
					} else {
						r.push(`The young soldiers fight valiantly, but when the battle turns against them they decide to surrender. Their sergeant is cuffed with the remaining survivors and taken back to the VTOL for transport. The sergeant spends the VTOL ride back to the arcology watching as ${his} childhood friends turned comrades in arms are raped by your mercenaries. ${He} wonders why ${he} has been spared this seemingly shared fate, but suspects it has little to do with ${his} nominally higher rank.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "doctor":
					if (targetEscape > MercCapture) {
						r.push(`The hospital's security staff alone would prove little match for the ${V.mercenariesTitle}, but just as they are about to be overrun an uneasy coalition of rival gangster and criminals who had been committed as patients join the fray and turn the tide of battle.`);
					} else if (raidEscape === 1) {
						r.push(`The hospital's security staff alone would prove little match for your mercenaries, but they are joined by an uneasy coalition of rival gangster and criminals who had been committed as patients. Though your ${V.mercenariesTitle} prevail, they discover to their chagrin that the doctors and their staff were slain during the wanton exchange of fire.`);
					} else {
						r.push(`The security staff of the hospital is easily overpowered and surrender rapidly, allowing your ${V.mercenariesTitle} to take the doctors and their staff into custody with little fuss. The distinguished doctor spends the VTOL ride looking on at ${his} colleagues and peers being raped by your mercenaries. ${He} naïvely hopes that ${he} has been spared from that fate out of a desire for ${his} medical knowledge rather than ${his} body.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "nun":
					if (targetEscape > MercCapture) {
						r.push(`As the ${V.mercenariesTitle} close in on the commune, they are spotted by a group of young nuns tending to their grounds. Before your ${V.mercenariesTitle} can close the distance, they retreat behind the walls of their community and seal the gate behind them.`);
					} else if (raidEscape === 1) {
						r.push(`The nuns flee into their inner sanctum as your ${V.mercenariesTitle} approach and bar the doors behind them as they go. When the last barrier is pried open, your ${V.mercenariesTitle} discover the nuns have committed suicide as a group rather than be taken prisoner.`);
					} else {
						r.push(`Unarmed and defenseless, the nuns are easily cowed by your ${V.mercenariesTitle} and taken away one by one to the VTOLs. The most pious sister prays vehemently until ${he} is dragged out of the inner sanctum in cuffs. The pious nun spends the VTOL ride engaged in fervent prayer as ${his} sisters are raped by your mercenaries. ${He} naïvely believes that ${his} devotion and piety will see ${him} spared from the same fate as ${his} sisters.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "journalist":
					if (targetEscape > MercCapture) {
						r.push(`Though the ${V.mercenariesTitle} easily overwhelm the single security guard posted at the firm, they are unable to do so before he triggers an alarm. Faced with the prospect of local law enforcement arriving, your ${V.mercenariesTitle} beat a hasty retreat.`);
					} else if (raidEscape === 1) {
						r.push(`Your ${V.mercenariesTitle} are met with fierce resistance by the staff of the newspaper firm, who take the raid as an opportunity to turn their abolitionist words into violent action. Eventually, your ${V.mercenariesTitle} retreat from the building before law enforcement can arrive.`);
					} else {
						r.push(`Once the lone security guard is subdued, the journalists and editors of the firm quietly accept their restraints and file out of the building and into the waiting VTOL. The journalist spends the VTOL ride watching as ${his} colleagues are raped by your mercenaries. ${He} studies every brutal detail and records every anguished scream in ${his} mind, hoping that one day ${he} might escape to produce an editorial to surpass all others.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "local news anchor":
					if (targetEscape > MercCapture) {
						r.push(`Unfortunately for the ${V.mercenariesTitle}, the news channel appears to have been interviewing members of the local militia garrison at the time of the raid. Upon encountering more firepower than they had anticipated, your ${V.mercenariesTitle} wisely retreat from the engagement.`);
					} else if (raidEscape === 1) {
						r.push(`Your ${V.mercenariesTitle} are able to subdue the news anchor and bid a hasty exit from the recording studio. Before they can board the waiting VTOL however, the anchor is struck in the head by a bullet fired by a man who was ${his} longtime fan turned stalker. It seems if he cannot have ${him}, neither can you.`);
					} else {
						r.push(`The news anchor is subdued without issue and quietly escorted out of the recording studio and into the waiting VTOL. The anchor is initially resistant during the VTOL ride, but soon grows complacent when ${he} is told of the luxury of your penthouse.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "classical dancer":
					if (targetEscape > MercCapture) {
						r.push(`Though they are excellent soldiers, the ${V.mercenariesTitle} are crude and uncultured. They are unable to blend into the audience and are soon discovered, giving the dance troupe the warning needed to make an escape from the theater.`);
					} else if (raidEscape === 1) {
						r.push(`As your ${V.mercenariesTitle} close in on the stage and reveal their concealed weapons, the darling star of the dance troupe loses ${his} footing in shock and tumbles off the stage. The sharp crack as ${he} hits the ground drives the crowd and remaining members of the troupe hysterical, while your ${V.mercenariesTitle} exit the theater as chaos surges around them.`);
					} else {
						r.push(`Once your ${V.mercenariesTitle} close in on the stage and reveal their concealed weapons, the dance troupe promptly surrenders. With the shocked audience looking on, each member is cuffed and escorted out the door to the waiting VTOL. The dancer spends the VTOL ride in abject terror as ${his} friends and peers are raped by your ${V.mercenariesTitle} all around ${him}. ${He} clings to the hope that ${he} is being spared from the same fate out of a desire for ${his} dancing talent rather than ${his} body.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "law enforcement officer":
					if (targetEscape > MercCapture) {
						r.push(`Despite the lack of staff, it seems this particular precinct has been the recipient of an alarming quantity of military grade equipment. With their overwhelming firepower, the officers are able to hold off your ${V.mercenariesTitle} until reinforcements arrive and force your troops to retreat.`);
					} else if (raidEscape === 1) {
						r.push(`Despite being outnumbered and outgunned, the officers stand their ground to the last. The sterling officer of the law your ${V.mercenariesTitle} sought to capture is the last to fall, stifled by a hail of bullets.`);
					} else {
						r.push(`Your ${V.mercenariesTitle} break through the door of the precinct with their guns drawn. The precinct is so understaffed that each officer has a number of weapons drawn on them from every angle, so its no surprise when the precinct's sterling police${woman} formally surrenders the precinct and its officers to your mercenaries.`);
						r.push(`The officer spends the VTOL ride watching impassively as ${his} fellow officers are raped by your ${V.mercenariesTitle} all around ${him}. Before ${he} exits the VTOL upon ${his} arrival, ${he} informs your ${V.mercenariesTitle} that ${he} intends to bring each of them to justice for their supposed crimes.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "classical musician":
					if (targetEscape > MercCapture) {
						r.push(`Though they are excellent soldiers, the ${V.mercenariesTitle} are crude and uncultured. They are unable to blend into the audience and are soon discovered, giving the orchestra the warning needed to make an escape from the concert hall.`);
					} else if (raidEscape === 1) {
						r.push(`As your ${V.mercenariesTitle} close in on the stage and reveal their concealed weapons, the crown jewel of the orchestra loses ${his} footing in shock and tumbles off the stage. The sharp crack as ${he} hits the ground drives the crowd and remaining members of the orchestra hysterical, while your ${V.mercenariesTitle} exit the concert hall as chaos surges around them.`);
					} else {
						r.push(`Once your ${V.mercenariesTitle} close in on the stage and reveal their concealed weapons, the orchestra promptly surrenders. With the shocked audience looking on, each member is cuffed and escorted out the door to the waiting VTOL. The musician spends the VTOL ride in abject terror as ${his} friends and peers are raped by your ${V.mercenariesTitle} all around ${him}. ${He} clings to the hope that ${he} is being spared from the same fate out of a desire for ${his} musical talent rather than ${his} body.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "politician":
					if (targetEscape > MercCapture) {
						r.push(`The ${V.mercenariesTitle} clash with the politician's security detail amidst a maelstrom of terrified civilians and the confrontation drags out for some time. By the time your ${V.mercenariesTitle} can advance, they discover that the politician has already been evacuated.`);
					} else if (raidEscape === 1) {
						r.push(`With ${his} security detail defeated and ${his} crowd of supporters offering no protection, the politician tries to take up one of ${his} fallen protectors' pistols to defend ${himself}. Unfortunately for ${him} and for your mercenaries, the politician has a staggeringly poor understanding of firearms and manages to shoot ${himself} in the face when ${he} discharges the weapon. With the politician dead, there is little your ${V.mercenariesTitle} can do but exit the venue.`);
					} else {
						r.push(`With ${his} security detail defeated and ${his} crowd of supporters offering no protection, the politician promptly surrenders in the hopes that ${he} won't be harmed and is escorted to the waiting VTOL. The politician spends the VTOL ride quietly, only breaking ${his} silence to ask your ${V.mercenariesTitle} about where ${he} is being brought and why. When they do not answer ${he} simply fusses with ${his} outfit, as if headed to an important interview.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "shut-in":
					if (targetEscape > MercCapture) {
						r.push(`The ${V.mercenariesTitle} pry open the shut-in's door to discover an empty shack. From the cooked meal still steaming on the dining room table and the remarkable absence of dust, it seems ${he} left only recently. Somehow the crafty `);
						if (slave.visualAge < 13) {
							r.push(`little`);
						} else if (slave.visualAge <= 18) {
							r.push(`teen`);
						} else if (slave.visualAge <= 24) {
							r.push(`young`);
						} else if (slave.visualAge <= 32) { // do nothing
						} else {
							r.push(`old`);
						}
						r.push(`minx must have seen your ${V.mercenariesTitle} coming.`);
					} else if (raidEscape === 1) {
						r.push(`When the ${V.mercenariesTitle} break down the door to the shut-in's shack, they are met with a terrible stench of dust and decay. Judging by the body hanging limply from the banisters, the shut-in took ${his} own life some time ago.`);
					} else {
						r.push(`When your ${V.mercenariesTitle} break down the door to the shut-in's shack, they are met with a surprised and somewhat unkempt ${woman} staring at them. Despite ${his} lack of social interaction, ${he} knows better than to argue with a small army of armed ${V.mercenariesTitle} and quietly accepts being escorted back to the waiting VTOL. The shut-in spends the VTOL ride sitting quietly in ${his} seat. Confused by ${his} silence, your ${V.mercenariesTitle} attempt to engage ${him} in conversation but are granted no response.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "procuress":
					if (targetEscape > MercCapture) {
						r.push(`The ${V.mercenariesTitle} break down the door to the halfway home to discover a throng of sniffling young women, who cling to their boots and beg for rescue. Once they have been accounted for, your ${V.mercenariesTitle} discover the procuress is nowhere to be found. It seems the wily old minx has somehow made ${his} escape before your ${V.mercenariesTitle} even arrived.`);
					} else if (raidEscape === 1) {
						r.push(`When your ${V.mercenariesTitle} enter the halfway house, the impoverished women within mistake them for an international rescue mission. Before your ${V.mercenariesTitle} can say otherwise, the women go berserk with the prospect of freedom and break into the procuress' office to tear ${him} apart with their bare hands.`);
					} else {
						r.push(`When your ${V.mercenariesTitle} enter the halfway house, the impoverished women within mistake them for an international rescue mission. Before your ${V.mercenariesTitle} can say otherwise, the women band together and drag the procuress out of ${his} office and restrain ${him} themselves. The ${V.mercenariesTitle} have to do little more than escort the grinning women to the waiting VTOLs, while they drag the protesting procuress with them. The procuress spends the VTOL ride watching uneasily as the girls ${he} intended to sell into slavery are raped by your mercenaries. Far from having a conscience, ${he} realizes that ${his} own capture indicates that ${he} will not be long spared from such treatment. The revelation brings ${him} to weep tears down ${his} mature face, doomed to the same fate ${he} ${himself} sent many girls to.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "investor":
					if (targetEscape > MercCapture) {
						r.push(`The ${V.mercenariesTitle} raid the business exposition and thoroughly search the premises, only to discover that the investor never arrived. A terrified businessman informs your ${V.mercenariesTitle} that ${he} cited heightened security risks as the reason for ${his} absence.`);
					} else if (raidEscape === 1) {
						r.push(`When your ${V.mercenariesTitle} corner the investor in the exposition, ${he} seemingly mistakes them for international police intent on taking ${him} in for prior economic crimes. Before ${he} can be subdued, the investor swallows a concealed pill and crumples to the ground dead.`);
					} else {
						r.push(`When your ${V.mercenariesTitle} corner the investor in the exposition, ${he} seemingly mistakes them for international police intent on taking ${him} in for prior economic crimes. ${He} begrudgingly surrenders and is subsequently escorted back to a waiting VTOL. The investor spends the VTOL ride practicing ${his} sales pitches, techniques and speeches. It seems ${he} hasn't grasped what ${his} destination is, nor the fate that awaits ${him} upon arrival.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "scientist":
					if (targetEscape > MercCapture) {
						r.push(`When the ${V.mercenariesTitle} make an explosive entrance into the lab with their guns drawn, the chief scientist throws a vial of some mysterious liquid in front of them. The resultant smoke is so thick and choking that your ${V.mercenariesTitle} are forced to retreat from the building, during which time the scientists make their own escape. When your ${V.mercenariesTitle} reenter the building, they find it abandoned.`);
					} else if (raidEscape === 1) {
						r.push(`The bulk of the scientists surrender shortly after your ${V.mercenariesTitle} make an explosive entrance into their lab. Before ${he} can be cuffed, the chief scientist takes a swig from some mysterious beaker of liquid. From the triumphant look on ${his} face as ${he} keels over dead, your ${V.mercenariesTitle} suspect the liquid was intended to have a transformative effect rather than a suicidal one.`);
					} else {
						r.push(`The bulk of the scientists surrender shortly after your ${V.mercenariesTitle} make an explosive entrance into their lab. Before ${he} can be cuffed, the chief scientist takes a swig from some mysterious beaker of liquid. As the triumphant look on ${his} face fades, it becomes clear that the liquid did not have the transformative effect that ${he} desired. The scientist spends the VTOL ride watching as ${his} colleagues and peers are raped around ${him}. That some of the earth's greatest minds have been reduced to sexual objects is disquieting enough, but the realization that ${he} is not likely to be spared from such a fate brings the ${woman} to tears.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
				case "lawyer":
					if (targetEscape > MercCapture) {
						r.push(`It seems the lawyer had anticipated the possibility of conflict on the frontier on the outer rim of the old world, so the ${V.mercenariesTitle} are able to do little more than enter the building before the law firm's offices seal themselves off. Faced with the prospect of lingering in a conflict zone, your ${V.mercenariesTitle} cut their losses and retreat back to their VTOLs.`);
					} else if (raidEscape === 1) {
						r.push(`Your ${V.mercenariesTitle} capture the law firm's staff without much difficulty, but when they open the door to the lawyer's office they find ${him} frothing from the mouth and unresponsive. From the quantity of pill bottles evident on ${his} desk, it seems ${he} found the sole loophole to escape capture.`);
					} else {
						r.push(`Your ${V.mercenariesTitle} capture the law firm's staff without much difficulty, but when they open the door to the lawyer's office they find ${him} frothing from the mouth and unresponsive. Despite ${his} attempts to drug ${himself} into suicide, the effects are temporary and the lawyer soon finds ${himself} being hauled off to a waiting VTOL with ${his} staff. The lawyer spends the VTOL ride scarcely sparing any attention to the rape of ${his} staff all about ${him}. Instead ${he} seems almost lost in thought, as if concentrating on finding some loophole or legal means to escape the fate that has befallen ${his} staff.`);
						newSlave(slave);
						// skip New Slave Intro
					}
					break;
			}
			if (targetEscape > MercCapture || raidEscape === 1) {
				r.push(`Your ${V.mercenariesTitle} return without their final prize, but remain in high spirits given their other successes out in the field.`);
			} else {
				App.Events.drawEventArt(artDiv, slave);
			}
			App.Events.addParagraph(el, r);

			return el;
		}
	}
};
