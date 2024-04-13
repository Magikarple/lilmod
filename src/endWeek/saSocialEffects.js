// cSpell:ignore miscegenating

/** Apply and return description of social effects
 * @param {FC.ReportSlave} slave
 */
App.SlaveAssignment.saSocialEffects = function(slave) {
	const {His, his, him, he, girl, wife} = getPronouns(slave);
	let netFailedElite = 0;

	/** Build a social effect object
	 * @param {FC.FutureSocietyDeco|""} FS
	 * @param {number} magnitude positive or negative value (a small integer, or a fraction between -1 and 1)
	 * @param {string} shortDesc for compact/list mode (text string)
	 * @param {string} longDesc for expanded mode (HTML string)
	 * @param {boolean} [creditFacility=false] true if the effect is only due to the facility she's assigned to
	 */
	function SocialEffect(FS, magnitude, shortDesc, longDesc, creditFacility = false) {
		this.FS = FS;
		this.magnitude = magnitude;
		this.shortDesc = shortDesc;
		this.longDesc = longDesc;
		this.creditFacility = creditFacility;
	}

	/** @returns {FC.SlaveSocialEffect[]} */
	function makeSocialEffects() {
		let t = [];

		const modScore = SlaveStatsChecker.modScore(slave);

		if (FutureSocieties.isActive('FSSupremacist')) {
			if (slave.race === V.arcologies[0].FSSupremacistRace) {
				if ([Job.ARCADE, Job.PUBLIC, Job.CLUB, Job.WHORE, Job.GLORYHOLE, Job.BROTHEL].includes(slave.assignment)) {
					t.push(new SocialEffect("Supremacist", -1, "Degrading job for race",
						`Society <span class="red">${V.arcologies[0].FSSupremacist >= V.FSLockinLevel * 0.6 ? "strongly " : ''}disapproves</span> of your keeping a slave of the ${V.arcologies[0].FSSupremacistRace} race in a degrading, public role; this also holds back acceptance of ${V.arcologies[0].FSSupremacistRace} superiority.`, true));
				} else if (slave.assignment === Job.HEADGIRL) {
					t.push(new SocialEffect("Supremacist", 2, "Headgirl race",
						`Society <span class="green">strongly approves</span> of your keeping a slave of the ${V.arcologies[0].FSSupremacistRace} race in a position of leadership as your Head Girl, advancing the notion that those of the ${V.arcologies[0].FSSupremacistRace} race should be in positions of authority over others.`));
				} else if (slave.assignment === Job.RECRUITER) {
					t.push(new SocialEffect("Supremacist", 2, "Recruiter race",
						`Society <span class="green">strongly approves</span> of your keeping a slave of the ${V.arcologies[0].FSSupremacistRace} race in a position of leadership as your recruiter, advancing the notion that it is only natural that those of the ${V.arcologies[0].FSSupremacistRace} race should lead the charge in enslaving others.`));
				} else if (slave.assignment === Job.CONCUBINE) {
					t.push(new SocialEffect("Supremacist", 2, "Concubine race",
						`Society <span class="green">strongly approves</span> of your keeping a slave of the ${V.arcologies[0].FSSupremacistRace} race in a position of importance as your concubine, advancing the notion that the most favored of your bedslaves should naturally be of the ${V.arcologies[0].FSSupremacistRace} race.`));
				} else {
					t.push(new SocialEffect("Supremacist", 0, "Normal job for race",
						`Society does not disapprove of your keeping a slave of the ${V.arcologies[0].FSSupremacistRace} race, since ${he} is not in a publicly degrading role.`));
				}
				if (slave.pregKnown === 1) {
					if (slave.pregSource > 0) {
						const dad = findFather(slave.pregSource);
						if (dad) {
							if (V.arcologies[0].FSSupremacistRace === "mixed race") {
								t.push(new SocialEffect("Supremacist", 2, "Mixed race breeding",
									`Society <span class="green">strongly approves</span> of your using slave breeders like ${slave.slaveName} to propagate the new mixed race civilization.`));
							} else if (slave.race !== dad.race) {
								t.push(new SocialEffect("Supremacist", -2, "Miscegenation",
									`Society <span class="red">strongly disapproves</span> of your allowing a pure ${V.arcologies[0].FSSupremacistRace} slave's womb to be sullied by ${dad.slaveName}'s ${dad.race} seed.`));
							} else {
								t.push(new SocialEffect("Supremacist", 2, "Pure race breeding",
									`Society <span class="green">strongly approves</span> of your using slave breeders like ${slave.slaveName} to propagate the ${V.arcologies[0].FSSupremacistRace} civilization.`));
							}
						}
					}
				}
				if (slave.fuckdoll > 0) {
					t.push(new SocialEffect("Supremacist", -2, "Superior race fuckdoll",
						`Society <span class="red">strongly disapproves</span> of your owning ${addA(V.arcologies[0].FSSupremacistRace)} Fuckdoll.`));
				}
			} else {
				t.push(new SocialEffect("Supremacist", 1, "Inferior race slave",
					`Society <span class="green">approves</span> of your keeping a slave of an inferior race; this also advances ${V.arcologies[0].FSSupremacistRace} superiority.`));
				if (slave.fuckdoll > 0) {
					t.push(new SocialEffect("Supremacist", 1, "Inferior race fuckdoll",
						`Society <span class="green">approves</span> of your keeping a Fuckdoll of an inferior race.`));
				}
				if (V.arcologies[0].FSSupremacistRace === "mixed race") {
					if (slave.pregKnown === 1) {
						if (slave.pregSource > 0) {
							const dad = findFather(slave.pregSource);
							if (dad) {
								if (slave.race === dad.race) {
									t.push(new SocialEffect("Supremacist", -2, "Pure race breeding",
										`Society <span class="red">strongly disapproves</span> of your allowing your slave breeders to propagate their supposedly pure race instead of contributing to the advancement of race-mixing.`));
								} else {
									t.push(new SocialEffect("Supremacist", 2, "Mixed race breeding",
										`Society <span class="green">strongly approves</span> of your producing superior mixed race offspring from an inferior pureblooded ${slave.race} mother and ${dad.race} father.`));
								}
							}
						}
					}
				}
			}
		}

		if (FutureSocieties.isActive('FSSubjugationist')) {
			if (slave.race === V.arcologies[0].FSSubjugationistRace) {
				t.push(new SocialEffect("Subjugationist", 1, "Inferior race slave",
					`Society <span class="green">approves</span> of your keeping a slave of the subject ${V.arcologies[0].FSSubjugationistRace} race; this also advances ${V.arcologies[0].FSSubjugationistRace} inferiority.`));
				if (slave.ovaries === 0) {
					if (slave.balls === 0 || slave.vasectomy === 1) {
						let r = [];
						r.push(`Society <span class="green">approves</span> of ${slave.slaveName}'s`);
						if (slave.vasectomy === 1 && slave.balls > 0) {
							r.push(`vasectomy,`);
						} else if (slave.dick > 0) {
							r.push(`gelding,`);
						} else {
							r.push(`sterilization,`);
						}
						r.push(`which ensures that ${he} will not propagate the ${V.arcologies[0].FSSubjugationistRace} race.`);
						t.push(new SocialEffect("Subjugationist", 1, "Sterilized inferior slave", r.join(' ')));
					}
				}
				if (slave.fuckdoll > 0) {
					t.push(new SocialEffect("Subjugationist", 1, "Inferior race fuckdoll",
						`Society <span class="green">approves</span> of your keeping a Fuckdoll of the ${V.arcologies[0].FSSubjugationistRace} race.`));
				}
			} else {
				if (slave.pregKnown === 1 && slave.pregSource > 0) {
					const dad = findFather(slave.pregSource);
					if (dad) {
						if (dad.race === V.arcologies[0].FSSubjugationistRace) {
							t.push(new SocialEffect("Subjugationist", -2, "Miscegenation",
								`Society <span class="red">strongly disapproves</span> of your allowing ${slave.slaveName}'s womb to be sullied by ${addA(V.arcologies[0].FSSubjugationistRace)} subhuman like ${dad.slaveName}.`));
						} else if (V.arcologies[0].FSSubjugationistRace === "mixed race" && slave.race !== dad.race) {
							t.push(new SocialEffect("Subjugationist", -2, "Miscegenation",
								`Society <span class="red">strongly disapproves</span> of your producing mixed race mongrels by miscegenating pure-blooded slave stock.`));
						}
					}
				}
			}
		}

		if (FutureSocieties.isActive('FSYouthPreferentialist')) {
			if (slave.geneMods.NCS > 0 && slave.visualAge <= 18) {
				t.push(new SocialEffect("Youth Preferentialist", 2, "NCS Youthening",
					`Society <span class="green">strongly approves</span> of you keeping ${slave.slaveName} forever young and youthening; this furthers the fashion for young slaves.`));
			} else if (slave.visualAge < 30) {
				const youthRepChange = ((30 - slave.visualAge) / 5);
				t.push(new SocialEffect("Youth Preferentialist", youthRepChange, "Young-looking slave",
					`Society <span class="green">approves</span> of ${slave.slaveName}'s youthful body; ${he} furthers the fashion for young slaves.`));
			}
		} else if (FutureSocieties.isActive('FSMaturityPreferentialist')) {
			if (slave.visualAge >= 30) {
				const matureRepChange = ((slave.visualAge - 25) / 5);
				t.push(new SocialEffect("Maturity Preferentialist", matureRepChange, "Mature-looking slave",
					`Society <span class="green">approves</span> of ${slave.slaveName}'s mature body; ${he} furthers the fashion for older ladies.`));
			}
		}

		if (FutureSocieties.isActive('FSPetiteAdmiration')) {
			if (heightPass(slave)) {
				t.push(new SocialEffect("Petite Admiration", 1, "Short slave",
					`Society <span class="green">approves</span> of keeping a slave as short as ${slave.slaveName} is; ${he} furthers the fashion for shorter slaves.`));
			} else if (slave.height >= 170) {
				t.push(new SocialEffect("Petite Admiration", -1, "Tall slave",
					`Society <span class="red">frowns</span> at keeping a slave as tall as ${slave.slaveName}; ${he} hinders the fashion for shorter slaves.`));
			}
		} else if (FutureSocieties.isActive('FSStatuesqueGlorification')) {
			if (heightPass(slave)) {
				t.push(new SocialEffect("Statuesque Glorification", 1, "Tall slave",
					`Society <span class="green">approves</span> of keeping a slave as tall as ${slave.slaveName} is; ${he} furthers the fashion for taller slaves.`));
			} else {
				t.push(new SocialEffect("Statuesque Glorification", -1, "Short slave",
					`Society <span class="red">frowns</span> at keeping someone as embarrassingly short as ${slave.slaveName}; ${he} hinders the fashion for taller slaves.`));
			}
		}

		if (FutureSocieties.isActive('FSGenderRadicalist')) {
			if (slave.balls > 0 && slave.pubertyXY === 0 && slave.physicalAge >= V.potencyAge) {
				t.push(new SocialEffect("Gender Radicalist", 2, "Avoiding male puberty",
					`Society <span class="green">approves</span> of you keeping ${slave.slaveName} from going through puberty; this advances public interest in ${girl}s with soft little dicks.`));
			} else if (slave.balls > 0 && slave.dick > 0 && slave.hormoneBalance >= 100) {
				t.push(new SocialEffect("Gender Radicalist", 1, "Feminization",
					`Society <span class="green">approves</span> of your heavy hormonal feminization of ${slave.slaveName}; this advances public interest in ${girl}s with soft little dicks.`));
			} else if (slave.dick > 0 && slave.balls === 0) {
				t.push(new SocialEffect("Gender Radicalist", 1, "Gelded slave",
					`Society <span class="green">approves</span> of your keeping a gelded slave; this advances public interest in ${girl}s with soft dickclits.`));
			} else if (slave.dick > 0 && slave.anus > 0 && slave.devotion > 20 && slave.trust >= -20) {
				t.push(new SocialEffect("Gender Radicalist", 1, "Contented dickgirl bottom",
					`Society <span class="green">approves</span> of your keeping a contented dickgirl bottom; this advances public interest in ${girl}s who get hard when assfucked.`));
			}
		} else if (FutureSocieties.isActive('FSGenderFundamentalist')) {
			if (!FutureSocieties.isActive('FSRestart')) {
				if (slave.bellyPreg >= 1500) {
					t.push(new SocialEffect("Gender Fundamentalist", 1, "Pregnant",
						`Society <span class="green">${V.arcologies[0].FSGenderFundamentalist >= V.FSLockinLevel * 0.5 ? "strongly " : ""}approves</span> of your keeping a pregnant slave; this also supports the idea that slave women should bear babies.`));
				} else if (slave.preg === 0 && isFertile(slave)) {
					t.push(new SocialEffect("Gender Fundamentalist", 1, "Fertile",
						`Society <span class="green">${V.arcologies[0].FSGenderFundamentalist >= V.FSLockinLevel * 0.5 ? "strongly " : ""}approves</span> of your keeping a slave fertile; this also supports the idea that slave women should bear babies.`));
				}
			} else {
				if (slave.hips > slave.shoulders) {
					t.push(new SocialEffect("Gender Fundamentalist", 1, "Feminine figure",
						`Society <span class="green">approves</span> of keeping a slave with a feminine figure.`));
				}
			}
			if ((slave.intelligenceImplant > 15 || slave.intelligenceImplant < 0) && V.arcologies[0].FSGenderFundamentalistLawBimbo === 1) {
				t.push(new SocialEffect("Gender Fundamentalist", -1, "Educated woman",
					`Society <span class="red">disapproves</span> of encouraging a woman's education.`));
			}
			if (slave.devotion <= 95 && canPenetrate(slave)) {
				t.push(new SocialEffect("Gender Fundamentalist", -1, "Can penetrate, not worshipful",
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s stiff, unrestrained dick, since ${he} isn't even worshipful of you.`));
			}
		}

		function repopRacialPregnancy() {
			if (FutureSocieties.isActive('FSSubjugationist') && (slave.race === V.arcologies[0].FSSubjugationistRace)) {
				t.push(new SocialEffect("Repopulationist", 0, "Undesirable race (Subjugationist)",
					`They just wish ${he} wasn't ${V.arcologies[0].FSSubjugationistRace}, of course.`));
			} else if (FutureSocieties.isActive('FSSupremacist') && (slave.race === V.arcologies[0].FSSupremacistRace)) {
				t.push(new SocialEffect("Repopulationist", 0, "Desirable race (Supremacist)",
					`The fact that ${he} is ${V.arcologies[0].FSSupremacistRace} only makes it better.`));
			}
		}

		if (FutureSocieties.isActive('FSRepopulationFocus')) {
			if (slave.preg > slave.pregData.normalBirth / 1.33) {
				if (slave.pregType >= 20) {
					t.push(new SocialEffect("Repopulationist", 5, "Broodmother",
						`Society is <span class="green">very pleased</span> at ${slave.slaveName}'s dedication to pregnancy.`));
				} else if (slave.pregType >= 10) {
					t.push(new SocialEffect("Repopulationist", 3, "Large multiple pregnancy",
						`Society is <span class="green">pleased</span> by ${slave.slaveName}'s abnormally large pregnancy.`));
				} else {
					t.push(new SocialEffect("Repopulationist", 2, "Advanced pregnancy",
						`Society is <span class="green">pleased</span> by ${slave.slaveName}'s advanced pregnancy.`));
				}
				repopRacialPregnancy();
			} else if (slave.weight > 130) {
				let r = [];
				r.push(`${slave.slaveName} is so fat, society just assumes there is a baby somewhere in there, though they wish it was more obvious.`);
				if (slave.pregWeek < 0) {
					r.push(`But fortunately for ${him}, word of ${his} recent birth has gotten around <span class="green">reassuring the masses</span> that ${he} can still bear children.`);
					t.push(new SocialEffect("Repopulationist", 2, "Fat recent mother", r.join(" ")));
				} else if (slave.collar === "preg biometrics") {
					if (slave.preg > 0) {
						r.push(`<span class="green">Their wish is granted</span> by ${slave.slaveName}'s collar revealing ${his} womb's secret${slave.pregType > 1 ? 's' : ''} even when ${his} body is trying its best to keep ${slave.pregType > 1 ? "them" : "it"} hidden.`);
						t.push(new SocialEffect("Repopulationist", 2, "Fat pregnancy", r.join(" ")));
						repopRacialPregnancy();
					} else if (slave.preg <= 0) {
						r.push(`<span class="red">The illusion is shattered</span> by ${slave.slaveName}'s collar revealing ${his} vacant womb.`);
						t.push(new SocialEffect("Repopulationist", -2, "Fat but not pregnant", r.join(" ")));
					}
				}
			} else if (slave.bellyPreg >= 1500) {
				t.push(new SocialEffect("Repopulationist", 1, "Obviously pregnant",
					`Society is <span class="green">pleased</span> by ${slave.slaveName}'s pregnancy.`));
				repopRacialPregnancy();
			} else if (FutureSocieties.isActive('FSSubjugationist') && (slave.race === V.arcologies[0].FSSubjugationistRace) && slave.bellyImplant >= 1500) {
				t.push(new SocialEffect("", 0.1, "Belly implant for inferior race (Repopulation Focus)",
					`Society <span class="green">is satisfied</span> with ${slave.slaveName}'s implant-filled belly since ${his} kind really shouldn't be breeding.`));
			} else if (slave.bellyImplant >= 1500 && ((slave.ovaries === 0 && slave.mpreg === 0) || slave.preg < -1)) {
				t.push(new SocialEffect("", 0.1, "Belly implant for infertile slave (Repopulation Focus)",
					`Society <span class="green">accepts</span> ${slave.slaveName}'s implant-filled belly due to ${his} infertility.`));
			} else if (slave.collar === "preg biometrics" && slave.preg > 0) {
				t.push(new SocialEffect("Repopulationist", 1, "Pregnancy biometrics",
					`Society is <span class="green">pleased</span> by ${slave.slaveName}'s collar revealing ${his} womb's secret${slave.pregType > 1 ? 's' : ''} even when ${his} body is trying its best to keep ${slave.pregType > 1 ? "them" : "it"} hidden.`));
				repopRacialPregnancy();
			} else if (slave.pregWeek < 0) {
				t.push(new SocialEffect("Repopulationist", 2, "Recently gave birth",
					`Society is <span class="green">pleased</span> by ${slave.slaveName}'s recent birth.`));
			} else if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
				t.push(new SocialEffect("", 0.01, "Fake belly (Repopulation Focus)",
					`Society is <span class="green">placated</span> by ${slave.slaveName}'s fake belly.`));
			} else if (FutureSocieties.isActive('FSSubjugationist') && (slave.race === V.arcologies[0].FSSubjugationistRace)) {
				t.push(new SocialEffect("Repopulationist", 0, "Not pregnant but inferior race (Subjugationist)",
					`Society is perfectly fine with ${slave.slaveName} not reproducing. ${His} belly is still unattractively small, however.`));
			} else if ((slave.ovaries === 0 && slave.mpreg === 0) || (slave.preg < -1) || (slave.pubertyXX === 0)) {
				t.push(new SocialEffect("Repopulationist", -1, "Unable to become pregnant",
					`Society is <span class="red">mildly disappointed</span> that ${slave.slaveName} is unable to become pregnant.`));
			} else if (slave.preg === -1) {
				t.push(new SocialEffect("Repopulationist", -2, "On contraceptives",
					`Society is <span class="red">disapproving</span> of ${slave.slaveName}'s contraceptive regimen.`));
			} else {
				t.push(new SocialEffect("Repopulationist", -2, "Not visibly pregnant",
					`Society is <span class="red">disapproving</span> of ${slave.slaveName}'s lack of a baby bump.`));
			}
			if (slave.abortionTat > 0) {
				t.push(new SocialEffect("Repopulationist", -1, "Abortion tattoos",
					`Society <span class="red">is disgusted</span> by the tally of aborted children adorning ${his} skin.`));
			}
			if (slave.birthsTat > 0) {
				t.push(new SocialEffect("Repopulationist", 1, "Birth tattoos",
					`Society <span class="green">is pleased</span> by the tally of successful births adorning ${his} skin.`));
			}
		} else if (V.arcologies[0].FSRepopulationFocusPregPolicy === 1) {
			if (slave.preg > 30) {
				t.push(new SocialEffect("", 1, "Advanced pregnancy (Repopulation Policy)",
					`Society <span class="green">loves</span> ${slave.slaveName}'s advanced pregnancy. It's very trendy.`));
			} else if (slave.bellyPreg >= 1500) {
				t.push(new SocialEffect("", 0.5, "Big pregnant belly (Repopulation Policy)",
					`Society <span class="green">enjoys</span> ${slave.slaveName}'s pregnancy. Being heavy with child is in right now.`));
			}
		} else if (FutureSocieties.isActive('FSRestart')) {
			if (slave.chastityVagina) {
				t.push(new SocialEffect("Eugenics", 1, "Vaginal chastity",
					`Society is <span class="green">mildly pleased</span> at you keeping ${his} vagina in check.`));
			}
			if (slave.chastityPenis) {
				t.push(new SocialEffect("Eugenics", 1, "Penile chastity",
					`Society is <span class="green">mildly pleased</span> at you keeping ${his} dick in check.`));
			}
			if (slave.breedingMark === 1 && V.propOutcome === 1) {
				if (slave.pregKnown === 1 && (slave.pregSource === -1 || slave.pregSource === -6)) {
					let r = [];
					r.push(`The Societal Elite <span class="green">are pleased</span>`);
					if (slave.pregSource === -1) {
						r.push(`your`);
					} else if (slave.pregSource === -6) {
						r.push(`an Elite`);
					}
					r.push(`child${slave.pregType > 1 ? 'ren are' : ' is'} growing within ${him}. The mark covering ${his} lower belly, coupled with ${his} gravidity and blessing, <span class="green">enamors</span> your populace.`);
					netFailedElite -= (5 + slave.pregType);
					t.push(new SocialEffect("Eugenics", 3, "Breeder carrying elite baby", r.join(' ')));
					if (slave.abortionTat > 0) {
						r = [];
						r.push(`The`);
						if (slave.abortionTat > 1) {
							r.push(`tally of aborted children`);
						} else {
							r.push(`tattoo marking an aborted child`);
						}
						r.push(`adorning ${his} middle <span class="red">is worrying,</span> however.`);
						t.push(new SocialEffect("Eugenics", 3, "Elite breeder abortion tattoo", r.join(' ')));
					}
				}
			} else {
				if (slave.preg > slave.pregData.normalBirth / 1.33) {
					if (slave.pregType >= 10) {
						t.push(new SocialEffect("Eugenics", -10, "Broodmother carrying unapproved babies",
							`Society is <span class="red">furious</span> at ${slave.slaveName}'s infested womb.`));
					} else if (slave.pregType >= 4) {
						t.push(new SocialEffect("Eugenics", -5, "Unapproved advanced multiple pregnancy",
							`Society is <span class="red">disgusted</span> by ${slave.slaveName}'s abnormally large pregnancy.`));
					} else {
						t.push(new SocialEffect("Eugenics", -3, "Unapproved advanced pregnancy",
							`Society is <span class="red">greatly displeased</span> by ${slave.slaveName}'s advanced pregnancy.`));
					}
				} else if (slave.bellyPreg >= 1500) {
					t.push(new SocialEffect("Eugenics", -2, "Visible unapproved pregnancy",
						`Society is <span class="red">very displeased</span> by ${slave.slaveName}'s pregnancy.`));
				} else if (slave.preg < -1 && slave.vagina > -1) {
					t.push(new SocialEffect("Eugenics", 2, "Not fertile",
						`Society is <span class="green">pleased</span> that ${slave.slaveName} is unable to become pregnant.`));
				}
				if (slave.abortionTat > 0) {
					t.push(new SocialEffect("Eugenics", 1, "Abortion tattoos",
						`The tally of aborted pregnancies adorning ${his} middle shows <span class="green">just how responsible</span> of an owner ${he} has.`));
				}
				if (slave.pregKnown === 1 && V.eugenicsFullControl !== 1) {
					t.push(new SocialEffect("Eugenics", 0, "Unapproved pregnancy (ELITE WARNING)",
						`The Societal Elite <span class="red">judge you</span> for keeping pregnant slaves. It falls to the slaveowner to deal with subhuman pregnancies and you are failing in your duties as a member of the Elite.`));
					netFailedElite += (5 + slave.pregType);
				}
			}
			if (slave.balls > 0 && slave.pubertyXY === 1 && slave.vasectomy === 0 && slave.ballType !== "sterile") {
				t.push(new SocialEffect("Eugenics", -slave.balls, "Working testicles",
					`Society <span class="red">disapproves</span> of ${his} working testicles.`));
			} else if (slave.dick > 0 && slave.balls > 0 && slave.vasectomy === 1) {
				t.push(new SocialEffect("Eugenics", 1, "Vasectomy",
					`Society <span class="green">approves</span> of ${his} vasectomy.`));
			} else if (slave.dick > 0 && slave.balls > 0 && slave.ballType === "sterile") {
				t.push(new SocialEffect("Eugenics", 1, "Sterile testicles",
					`Society <span class="green">approves</span> of ${his} useless testicles.`));
			} else if (slave.dick > 0 && slave.balls === 0) {
				t.push(new SocialEffect("Eugenics", 2, "Castrated",
					`Society <span class="green">approves</span> of ${his} lack of testicles.`));
			}
		}
		if (V.arcologies[0].FSRepopulationFocusMilfPolicy === 1 && slave.counter.birthsTotal > 0) {
			t.push(new SocialEffect("", 1, "MILF Policy",
				`Society <span class="green">loves</span> MILFs and as a mother, ${slave.slaveName} fits right in.`));
		}

		if (FutureSocieties.isActive('FSPaternalist')) {
			if (slave.geneMods.NCS > 0 && slave.visualAge <= V.potencyAge && slave.physicalAge >= V.potencyAge) {
				t.push(new SocialEffect("Paternalist", 1, "NCS Youthening",
					`Society <span class="green">approves</span> of you keeping ${slave.slaveName} perpetually young and innocent looking so you can keep taking care of ${him}; this advances paternalistic ideals.`));
			} else if (slave.intelligenceImplant >= 15 && slave.fetish !== Fetish.MINDBROKEN) {
				t.push(new SocialEffect("Paternalist", 1, "Educated",
					`Society <span class="green">approves</span> of ${slave.slaveName} being properly educated; this advances ideas about slave improvement.`));
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.intelligenceImplant <= -15) {
					t.push(new SocialEffect("Paternalist", -2, "Miseducated",
						`Society <span class="red">is appalled</span> by ${slave.slaveName}'s twisted education; it goes against paternalistic values.`));
				} else if (V.arcologies[0].FSGenderFundamentalistLawBimbo !== 1 && !FutureSocieties.isActive('FSIntellectualDependency') && slave.intelligenceImplant < 15) {
					if (slave.assignment !== Job.SCHOOL && slave.assignment !== Job.CLASSES) {
						if (slave.assignment !== Job.REST && slave.assignment !== Job.CLINIC && slave.assignment !== Job.SPA) {
							t.push(new SocialEffect("Paternalist", -1, "Uneducated",
								`Society <span class="red">disapproves</span> of ${slave.slaveName} being uneducated; this holds back ideas about slave improvement.`));
						} else {
							t.push(new SocialEffect("Paternalist", 0, "Uneducated",
								`Society disapproves of ${slave.slaveName} being uneducated, but understands healing comes first.`));
						}
					}
				}
			}
			if (slave.health.condition > 80) {
				t.push(new SocialEffect("Paternalist", 1, "Healthy",
					`Society <span class="green">approves</span> of ${his} shining health; this advances belief in a slaveowner's duty.`));
			}
			if (slave.health.tired > 60 && !slave.slaveUsedRest && ![Job.REST, Job.SPA, Job.CLINIC, Job.CONFINEMENT, Job.CELLBLOCK].includes(slave.assignment)) {
				t.push(new SocialEffect("Paternalist", -2, "Exhausted and not resting",
					`Society <span class="red">is appalled</span> that ${he}'s required to work in ${his} exhausted state.`));
			} else if (slave.health.tired > 70 && slave.assignment === Job.CELLBLOCK && !!S.Wardeness) {
				t.push(new SocialEffect("Paternalist", -1, "Sleep deprived by Wardeness",
					`Society <span class="red">disapproves</span> of the harsh measures that ${S.Wardeness.slaveName} is using to break ${him}.`));
			}
			if (slave.devotion + slave.trust > 180) {
				if (slave.relationship === -3) {
					t.push(new SocialEffect("Paternalist", 5, `Happy slave ${wife}`,
						`Society <span class="green">approves very strongly</span> of ${his} happiness as your ${wife}; this advances paternalistic ideals.`));
				} else if (slave.relationship === -2) {
					t.push(new SocialEffect("Paternalist", 2, `Happy and emotionally bonded`,
						`Society <span class="green">strongly approves</span> of ${his} emotional bond to you; this advances paternalistic ideals.`));
				} else {
					t.push(new SocialEffect("Paternalist", 1, `Devoted and trusting`,
						`Society <span class="green">approves</span> of ${his} attachment to you; this advances paternalistic ideals.`));
				}
			} else {
				if (slave.devotion > 95) {
					t.push(new SocialEffect("Paternalist", 1, `Worshipful`,
						`Society <span class="green">approves</span> of ${his} attachment to you; this advances paternalistic ideals.`));
				}
				if (slave.trust > 95) {
					t.push(new SocialEffect("Paternalist", 1, `Completely trusting`,
						`Society <span class="green">approves</span> of ${his} trust in you; this advances paternalistic ideals.`));
				}
			}
			if (slave.choosesOwnAssignment === 1) {
				t.push(new SocialEffect("Paternalist", 1, `Choosing own assignment`,
					`Society <span class="green">approves</span> of ${slave.slaveName} being allowed to choose ${his} own job, advancing ideals about slave self-actualization.`));
			}
			if (slave.relationship === -3) {
				if (slave.fetish === Fetish.MINDBROKEN) {
					t.push(new SocialEffect("Paternalist", 1, `Mindbroken, married`,
						`Society is mixed over your marriage to the mindbroken ${girl}; on one hand ${he} had no consent, but on the other, you <span class="green">surely must love ${him}</span> to marry ${him}.`));
				} else if (slave.devotion <= 20) {
					t.push(new SocialEffect("Paternalist", -3, `Forced marriage`,
						`Society is <span class="red">thoroughly disgusted</span> that you took ${his} hand in marriage by force.`));
				}
			}
			if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
				t.push(new SocialEffect("Paternalist", -1, `Body mods`,
					`Society <span class="red">disapproves</span> of ${his} degrading body modifications, which dulls the public interest in letting slaves choose their own appearance.`));
			}
			if (slave.fuckdoll > 0) {
				t.push(new SocialEffect("Paternalist", -2, `Fuckdoll`,
					`Society <span class="red">strongly disapproves</span> of your owning a Fuckdoll.`));
			} else if (!canWalk(slave) && canMove(slave) && slave.rules.mobility !== "permissive") {
				t.push(new SocialEffect("Paternalist", -1, `Lack of mobility`,
					`Society <span class="red">disapproves</span> that you are forcing ${him} to crawl instead of aiding ${his} mobility.`));
			}
		} else if (FutureSocieties.isActive('FSDegradationist')) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				t.push(new SocialEffect("Degradationist", 1, `Mindbroken`,
					`Society <span class="green">approves</span> of ${his} broken spirit; ${he} serves as an example of a soulless fuckpuppet.`));
			} else {
				if (slave.trust <= 4) {
					t.push(new SocialEffect("Degradationist", 1, `Fearful`,
						`Society <span class="green">approves</span> of ${slave.slaveName}'s fear of you.`));
				} else {
					if (slave.assignment === Job.HEADGIRL) {
						t.push(new SocialEffect("Degradationist", 0, `Trusting headgirl`,
							`Society accepts ${slave.slaveName} trusting you, since ${he} is your Head Girl and keeps the other slaves down.`));
					} else if (slave.assignment === Job.RECRUITER) {
						t.push(new SocialEffect("Degradationist", 0, `Trusting recruited`,
							`Society accepts ${slave.slaveName} trusting you, since ${he} is your Recruiter and entraps new slaves.`));
					} else if (slave.devotion > 95) {
						t.push(new SocialEffect("Degradationist", 0, `Trusting worshipful`,
							`Society reluctantly accepts of ${slave.slaveName} trusting you, since ${he} is worshipful of you.`));
					} else {
						t.push(new SocialEffect("Degradationist", -1, `Trusting without cause`,
							`Society <span class="red">disapproves</span> of ${slave.slaveName} being trusting of you; ${he} is not being properly degraded for ${his} role.`));
					}
				}
				if (slave.intelligenceImplant <= -15) {
					t.push(new SocialEffect("Degradationist", 1, `Miseducated`,
						`Society <span class="reputation inc">is amused</span> by ${slave.slaveName}'s education and how much it hinders critical thought.`));
				}
			}
			if (slave.assignment === Job.GLORYHOLE || slave.assignment === Job.ARCADE) {
				t.push(new SocialEffect("Degradationist", 1, `Restrained for sex`,
					`Society <span class="green">approves</span> of how ${he} is restrained for involuntary use, seeing this as the future of sexual relations.`));
			}
			if (slave.health.tired > 60 && !slave.slaveUsedRest && ![Job.REST, Job.SPA, Job.CLINIC, Job.CONFINEMENT, Job.CELLBLOCK].includes(slave.assignment)) {
				t.push(new SocialEffect("Degradationist", 1, "Exhausted but still working",
					`Society <span class="green">approves</span> of the harsh discipline required to get ${him} to work productively in ${his} exhausted state.`));
			}
			if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
				t.push(new SocialEffect("Degradationist", 1, `Heavily modified`,
					`Society <span class="green">approves</span> of ${his} many body modifications, which advances the public taste for such degradation of slave bodies.`));
			}
			if (slave.abortionTat > 0 && !FutureSocieties.isActive('FSRepopulationFocus')) {
				t.push(new SocialEffect("Degradationist", FutureSocieties.isActive('FSRestart') ? 2 : 1, `Abortion tattoos`,
					`Society <span class="green">${FutureSocieties.isActive('FSRestart') ? "greatly " : ""}approves</span> of ${his} tally of aborted children.`));
			}
			if (slave.voice !== 0) {
				if (slave.lips > 95) {
					t.push(new SocialEffect("Degradationist", 1, `Facepussy`,
						`Society <span class="green">approves</span> of the way ${his} mouth, with its useless ability to speak, has been replaced with an appealing hole.`));
				}
			}
			if (slave.choosesOwnAssignment === 1) {
				t.push(new SocialEffect("Degradationist", -1, `Choosing own assignment`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName} being allowed to choose ${his} own job; this holds back ideas about slave degradation.`));
			}
			if (slave.fuckdoll > 0) {
				t.push(new SocialEffect("Degradationist", 1, `Fuckdoll`,
					`Society <span class="green">approves</span> of your owning a Fuckdoll.`));
			} else if (!canWalk(slave) && canMove(slave) && slave.rules.mobility === "restrictive") {
				t.push(new SocialEffect("Degradationist", 1, `Lack of mobility`,
					`Society <span class="green">approves</span> that ${he} is forced to crawl like the dog ${he} is.`));
			}
		}

		const scars = App.Medicine.Modification.scarRecord(slave);
		if (!(jQuery.isEmptyObject(scars))) {
			let hasScar = 0;
			for (const scarPlace in scars) {
				for (const scarType in scars[scarPlace]) {
					// exotic scars don't count
					if (scarType !== "exotic") {
						if (FutureSocieties.isActive('FSDegradationist')) {
							t.push(new SocialEffect("Degradationist", 1, `Scarred`,
								`Society <span class="green">mildly approves</span> of your slave's scarring; this encourages the further abuse of slaves.`));
						} else if (FutureSocieties.isActive('FSPaternalist')) {
							t.push(new SocialEffect("Paternalist", -1, `Scarred`,
								`Society <span class="red">mildly disapproves</span> of your scarred slaves, viewing them as a sign of mistreatment.`));
						}
						hasScar = 1;
						break;
					}
				}
				if (hasScar) {
					break;
				}
			}
		}

		if (FutureSocieties.isActive('FSIntellectualDependency')) {
			if (V.arcologies[0].FSIntellectualDependencyLawBeauty === 1) {
				if (bimboScore(slave) >= 6) {
					t.push(new SocialEffect("Intellectual Dependency", 1, `Perfect bimbo`,
						`Society <span class="green">is delighted</span> by ${slave.slaveName}'s perfect bimbo appearance.`));
				}
			}
			if (slave.intelligence + slave.intelligenceImplant < -10) {
				t.push(new SocialEffect("Intellectual Dependency", 1, `Dimwitted`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s dimwitted mind; this supports the idea that slaves should be entirely dependent on their owner.`));
			} else if ([Job.HEADGIRL, Job.ATTENDANT, Job.FARMER, Job.MADAM, Job.MATRON, Job.NURSE, Job.TEACHER, Job.STEWARD, Job.BODYGUARD].includes(slave.assignment)) {
				t.push(new SocialEffect("Intellectual Dependency", 0, `Intelligence required by job`,
					`Society understands the value of intelligence in ${his} appointed position and is willing to overlook it.`));
			} else if ([Job.ARCADE, Job.GLORYHOLE].includes(slave.assignment) && (slave.intelligence + slave.intelligenceImplant > 10)) {
				t.push(new SocialEffect("Intellectual Dependency", 1, `Smart Fuckmeat`,
					`Society finds it <span class="green">amusing</span> to see a smart slave being reduced to nothing but a set of holes; ${his} intelligence will not bore anyone here.`));
			} else if (slave.intelligence + slave.intelligenceImplant > 10) {
				t.push(new SocialEffect("Intellectual Dependency", -1, `Too smart`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s sharp mind; this holds back acceptance of the idea that slaves should be dumb and dependent.`));
			}
			if (slave.energy > 95) {
				t.push(new SocialEffect("Intellectual Dependency", 1, `Nymphomania`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s bottomless lust, showing the public one more way a slave may be reliant on ${his} owner.`));
			} else if ([Job.ARCADE, Job.GLORYHOLE].includes(slave.assignment) && (slave.energy <= 60)) {
				t.push(new SocialEffect("Intellectual Dependency", 0, `Low Libido Fuckmeat`,
					`Society doesn't notice ${slave.slaveName}'s low libido when ${he}'s reduced to nothing more than a fuckhole.`));
			} else if (slave.energy <= 60) {
				t.push(new SocialEffect("Intellectual Dependency", -1, `Low libido`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s restrained libido; to the public, this gives ${him} too much freedom to focus on things other than sex.`));
			}
		} else if (FutureSocieties.isActive('FSSlaveProfessionalism')) {
			if (slave.intelligence + slave.intelligenceImplant > 95) {
				t.push(new SocialEffect("Slave Professionalism", 1, `Brilliant`,
					`Society <span class="green">strongly approves</span> of ${slave.slaveName}'s brilliance; ${his} sharp wit is the foundation of slave perfectionism.`));
			} else if (slave.intelligenceImplant >= 30) {
				t.push(new SocialEffect("Slave Professionalism", 1, `Highly educated`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s advanced education; this advances ideas about crafting the perfect slave.`));
			} else if (slave.intelligenceImplant <= -15) {
				t.push(new SocialEffect("Slave Professionalism", -3, `Miseducated`,
					`Society <span class="red">is appalled</span> by ${slave.slaveName}'s twisted education; why someone would do this is beyond them.`));
			} else if (slave.intelligence < -10 && slave.intelligenceImplant < 15) {
				t.push(new SocialEffect("Slave Professionalism", -2, `Slow and uneducated`,
					`Society <span class="red">frowns</span> upon keeping a slave as slow as ${slave.slaveName}; the lack of an attempt to correct this sets a bad example for other owners.`));
			}
			if (slave.accent > 1 && canTalk(slave) && (slave.rules.speech !== "restrictive" || (slave.rules.speech === "restrictive" && slave.devotion < 20 && slave.trust >= -20))) {
				t.push(new SocialEffect("Slave Professionalism", -2, `Can't speak ${V.language} or be silent`,
					`Society <span class="red">dislikes</span> ${slave.slaveName}'s inability to properly speak ${V.language} or hold ${his} tongue; allowing such a flaw hinders the notion of professional slavery.`));
			}
			if (slave.skill.entertainment + slave.skill.whoring + slave.skill.oral + slave.skill.anal + slave.skill.vaginal + adjustedPenSkill(slave) >= 400) {
				t.push(new SocialEffect("Slave Professionalism", 1, `Highly skilled`,
					`Society <span class="green">appreciates</span> a slave with skills of ${slave.slaveName}'s caliber.`));
			}
			if (slave.energy <= 40 && slave.devotion > 50) {
				t.push(new SocialEffect("Slave Professionalism", 1, `Clearminded (low libido or devoted)`,
					`Society <span class="green">approves</span> of a ${girl} with a clear mind like ${slave.slaveName}; ${he} can pour all ${his} efforts into ${his} lover's pleasure without being lost in ${his} own.`));
			}
		}

		if (FutureSocieties.isActive('FSBodyPurist')) {
			if (slave.boobsImplant === 0 && slave.buttImplant === 0 && slave.lipsImplant === 0 && slave.bellyImplant === -1) {
				t.push(new SocialEffect("Body Purist", 1, `No implants`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s natural body; this supports the fashion for surgically untouched slaves.`));
			} else {
				t.push(new SocialEffect("Body Purist", -1, `Implants`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s implants; this holds back acceptance of the idea that slaves should be all-natural.`));
			}
			if (slave.piercing.corset.weight === 0 && modScore.piercing < 3 && modScore.tat < 2) {
				t.push(new SocialEffect("Body Purist", 1, `Minimal piercings/tats`,
					`Society <span class="green">approves</span> of ${his} unmarked, unblemished skin, advancing the fashion for unspoiled slaves.`));
			}
			if (slave.race !== "catgirl" || V.arcologies[0].FSBodyPuristCatLaw === 0) {
				if ((slave.earShape !== "normal" && slave.earShape !== "damaged") || slave.earT !== "none") {
					t.push(new SocialEffect("Body Purist", -1, `Inhuman ears`,
						`Society finds ${his} inhuman ears <span class="red">appalling.</span>`));
				}
				if (slave.horn !== "none" || slave.tail !== "none") {
					t.push(new SocialEffect("Body Purist", -1, `Inhuman tail or horns`,
						`Society <span class="red">is disgusted</span> by ${his} inhuman attributes.`));
				}
			}
			if (slave.race === "catgirl" && V.arcologies[0].FSBodyPuristCatLaw === 0) {
				t.push(new SocialEffect("Body Purist", -2, `Nonhuman`,
					`Society <span class="red">is disgusted</span> by ${his} feline nature.`));
			}
			if (slave.faceImplant <= 5 && slave.race === slave.origRace) {
				t.push(new SocialEffect("Body Purist", 1, `Unaltered appearance`,
					`Society <span class="green">approves</span> of ${his} natural, untouched appearance, advancing the fashion for unaltered slaves.`));
			} else {
				t.push(new SocialEffect("Body Purist", -2, `Surgically altered appearance`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s surgical beautification; this holds back acceptance of the idea that a natural slave is a beautiful slave.`));
			}
			if (slave.heightImplant < -1 || slave.heightImplant > 1 || (slave.hipsImplant > 0 && slave.hips > 2)) {
				t.push(new SocialEffect("Body Purist", -2, `Inhuman proportions`,
					`Society <span class="red">is disgusted</span> of ${his} clearly unnatural, surgically-altered proportions.`));
			}
			if (slave.fuckdoll === 0) {
				if (slave.vagina === 0 && slave.anus === 0 && slave.counter.vaginal === 0 && slave.counter.anal === 0) {
					t.push(new SocialEffect("Body Purist", 3, `Total virgin`,
						`Society <span class="green">strongly approves</span> of ${his} intact holes, idolizing ${his} pristine body.`));
				} else if (slave.vagina === 0 && slave.counter.vaginal === 0) {
					t.push(new SocialEffect("Body Purist", 1, `Vaginal virgin`,
						`Society <span class="green">approves</span> of ${his} intact hymen, advancing ideals of pure, fresh slaves.`));
				} else if (slave.anus === 0 && slave.counter.anal === 0) {
					t.push(new SocialEffect("Body Purist", 1, `Anal virgin`,
						`Society <span class="green">approves</span> of ${his} intact anus, advancing ideals of pure, fresh slaves.`));
				}
			}
			if (slave.makeup === 0 && slave.face > 10) {
				t.push(new SocialEffect("Body Purist", 1, `Makeup-free beauty`,
					`Society <span class="green">approves</span> of keeping ${his} naturally beautiful face makeup-free.`));
			} else if (slave.makeup > 1) {
				t.push(new SocialEffect("Body Purist", -1, `Heavy makeup`,
					`Society <span class="red">disapproves</span> of ${his} heavy makeup, which covers up ${his} natural features.`));
			}
		} else if (FutureSocieties.isActive('FSTransformationFetishist')) {
			let transformed = 0;
			if (slave.boobsImplant > 0 && slave.buttImplant > 0 && slave.lipsImplant > 0) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Implants`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s thoroughly modified body; this supports the fashion for surgically upgraded slaves.`));
				transformed++;
			}
			if ((slave.lipsImplant / slave.lips >= .50) || (slave.buttImplant / slave.butt >= .50 && slave.butt >= 6) || (slave.buttImplant / slave.butt >= .25 && slave.butt >= 3) || (slave.boobsImplant / slave.boobs >= .75 && slave.boobs >= 10000) || (slave.boobsImplant / slave.boobs >= .50 && slave.boobs >= 2000) || (slave.boobsImplant / slave.boobs >= .25 && slave.boobs >= 1000) || (slave.boobsImplant / slave.boobs >= .10 && slave.boobs >= 400)) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Big implants`,
					`Society <span class="green">approves</span> of ${his} obvious implants.`));
				transformed++;
			}
			if (slave.bellyImplant >= 1500) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Big belly implant`,
					`Society <span class="green">mildly approves</span> of ${slave.slaveName}'s belly bulging implant; this supports interest in more unusual implantations.`));
				transformed++;
			}
			if (isAmputee(slave) || (slave.waist < -95) || (slave.teeth === "pointy") || (slave.teeth === "fangs") || (slave.teeth === "removable") || (slave.hips === 3 && slave.hipsImplant > 0)) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Extreme surgery`,
					`Society <span class="green">approves</span> of ${his} extreme surgeries; interest in ${him} stirs interest in transformations of all kinds.`));
				transformed++;
			}
			if (slave.faceImplant > 30 || slave.race !== slave.origRace) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Surgically improved`,
					`Society <span class="green">approves</span> of ${his} surgically improved appearance; this supports the fashion for surgical corrections.`));
				transformed++;
			}
			if (slave.faceImplant > 95 && slave.face > 40) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Uncannily beautiful face`,
					`Society <span class="green">approves</span> of ${his} beautiful face, considering its uncanny nature a boon rather than a fault; this supports the belief that there is no such thing as too much surgery.`));
				transformed++;
			}
			let addons = [];
			if (hasAnyProstheticLimbs(slave)) {
				addons.push("limbs");
			}
			if (slave.earT !== "none") {
				addons.push("ears");
			}
			if (slave.horn !== "none") {
				addons.push("horns");
			}
			if (slave.tail !== "none") {
				addons.push("tail");
			}
			if (addons.length > 0) {
				t.push(new SocialEffect("Transformation Fetishist", Math.min(addons.length, 2), `Transhuman addons`,
					`Society <span class="green">strongly approves</span> of ${his} transhuman ${toSentence(addons)}.`));
				transformed += addons.length;
			}
			if (slave.dick > 8) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Giant dick`,
					`Society <span class="green">approves</span> of ${his} monolithic dick, since it's such an obvious transformation masterpiece.`));
				transformed++;
			}
			if (slave.lips > 95) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Facepussy`,
					`Society <span class="green">approves</span> of ${his} absurd facepussy as a transformation of ${his} mouth into nothing more than another fuckhole.`));
				transformed++;
			}
			if (slave.nipples === NippleShape.FUCKABLE) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Fuckable nipples`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s fuckable nipples; this supports interest in more unusual body modifications.`));
				transformed++;
			}
			if (slave.fuckdoll > 0) {
				t.push(new SocialEffect("Transformation Fetishist", 1, `Fuckdoll`,
					`Society <span class="green">approves</span> of your owning a Fuckdoll.`));
				transformed += 5; // total transformation
			}
			if (transformed === 0 && [Job.ARCADE, Job.GLORYHOLE].includes(slave.assignment)) {
				t.push(new SocialEffect("Transformation Fetishist", -1, `Totally unmodified fuckmeat`,
					`Society <span class="red">would prefer</span> ${slave.slaveName}'s body to be a little more interesting but agrees that a simple fuckhole probably doesn't deserve much investment.`));
			} else if (transformed === 0) {
				t.push(new SocialEffect("Transformation Fetishist", -2, `Totally unmodified`,
					`Society <span class="red">strongly disapproves</span> of ${slave.slaveName}'s complete lack of any obvious transformations; ${he} does not advance the ideal of body modification.`));
			} else if (transformed === 1 && [Job.ARCADE, Job.GLORYHOLE].includes(slave.assignment)) {
				t.push(new SocialEffect("Transformation Fetishist", 0, `Slightly modified fuckmeat`,
					`Society accepts the minimal amount of modification ${slave.slaveName} has undergone; it's not a smart investment improving a lowly fuckhole's appearance, after all.`));
			} else if (transformed === 1) {
				t.push(new SocialEffect("Transformation Fetishist", -1, `Too few modifications`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s mostly-natural appearance; more transformations would help advance the ideal of body modification.`));
			}
		}

		if (FutureSocieties.isActive('FSEgyptianRevivalist') && V.seeCats === 1) {
			if (slave.race === "catgirl") {
				t.push(new SocialEffect("Egyptian Revivalist", 2, `Catgirl`,
					`Society <span class="green">adores</span> ${slave.slaveName} due to ${his} feline nature, which reminds many of the ancient Egyptian Goddesses.`));
			}
		}

		if (FutureSocieties.isActive('FSAntebellumRevivalist')) {
			if (slave.assignment === Job.QUARTER) {
				if (FutureSocieties.isActive('FSSubjugationist') && slave.race === V.arcologies[0].FSSubjugationistRace) {
					t.push(new SocialEffect("Antebellum Revivalist", 2, `Servants`,
						`Society <span class="green">strongly approves</span> of ${slave.slaveName}, a slave of the inferior race, working as a servant.`));
				} else {
					t.push(new SocialEffect("Antebellum Revivalist", 1, `Servants`,
						`Society <span class="green">approves</span> of ${slave.slaveName} working as a servant.`));
				}
			}

			if (slave.skill.entertainment > 60 && slave.devotion > 20) {
				t.push(new SocialEffect("Antebellum Revivalist", 1, `Entertaining`,
					`Society <span class="green">approves</span> of owning an obedient and affable slave like ${slave.slaveName}.`));
			}
		}

		if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
			if (isSlim(slave)) {
				t.push(new SocialEffect("Slimness Enthusiast", 1, `Slim`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s graceful, girlish form; ${he} furthers the fashion for slaves like ${him}.`));
			}
			let notSlim = [];
			if (slave.boobs > 650) {
				notSlim.push("tits");
			}
			if (slave.butt > 4) {
				notSlim.push("ass");
			}
			if (notSlim.length > 0) {
				t.push(new SocialEffect("Slimness Enthusiast", -1, `Big tits/ass`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s boorishly large ${toSentence(notSlim)}; ${he} damages the fashion for slender slaves.`));
			}
		} else if (FutureSocieties.isActive('FSAssetExpansionist')) {
			let assets = 0;
			if (slave.geneMods.NCS > 0 && (slave.boobs <= 2000 || slave.butt <= 7)) {
				t.push(new SocialEffect("Asset Expansionist", -2, `NCS Youthening`,
					`Society <span class="red">strongly disapproves</span> of ${slave.slaveName} who can't get bigger; ${his} shrinking body hurts the fashion for Asset expansion.`));
			}
			if (slave.boobs > 2000) {
				t.push(new SocialEffect("Asset Expansionist", 1, `Titanic tits`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s huge tits; ${his} breasts further the fashion for bouncing boobs on slaves.`));
				assets++;
			}
			if (slave.butt > 7) {
				t.push(new SocialEffect("Asset Expansionist", 1, `Big butt`,
					`Society <span class="green">approves</span> of ${his} massive ass; ${his} butt furthers the fashion for big behinds on slaves.`));
				assets++;
			}
			if (slave.dick > 8) {
				t.push(new SocialEffect("Asset Expansionist", Math.ceil(slave.dick / 10), `Massive member`,
					`Society <span class="green">approves</span> of ${his} massive member, which might be nonfunctional, but is a wonder of expansionism.`));
				assets++;
			} else if (slave.dick >= 6) {
				t.push(new SocialEffect("Asset Expansionist", 1, `Prodigious penis`,
					`Society <span class="green">approves</span> of ${his} enormous penis; ${his} cock furthers the fashion for dangling dicks on slaves.`));
				assets++;
			}
			if (slave.balls > 6) {
				t.push(new SocialEffect("Asset Expansionist", 1, `Tremendous testicles`,
					`Society <span class="green">approves</span> of ${his} swinging balls; ${his} nuts further the fashion for tremendous testicles on slaves.`));
				assets++;
			}
			if (slave.lips > 95) {
				t.push(new SocialEffect("Asset Expansionist", 1, `Luscious lips`,
					`Society <span class="green">approves</span> of ${his} expanded lips.`));
				assets++;
			}
			if (assets === 0 && [Job.ARCADE, Job.GLORYHOLE].includes(slave.assignment)) {
				t.push(new SocialEffect("Asset Expansionist", 0, `Unexceptional fuckmeat`,
					`Society is not thrilled about ${his} small assets but accepts ${his} role as a mere fuckhole; of course it would be better if ${he} were spilling out of the unit, but why waste the money on a worthless slab of fuckmeat?`));
			} else if (assets === 0) {
				t.push(new SocialEffect("Asset Expansionist", -1, `Unexceptional assets`,
					`Society <span class="red">is disappointed</span> by ${his} normal-sized (or even petite, by expansionist standards) assets.`));
			}
		}

		if (FutureSocieties.isActive('FSPastoralist')) {
			if (slave.lactation > 0) {
				t.push(new SocialEffect("Pastoralist", 1, `Lactating`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s milky udders; the sight of ${his} creamy milk encourages the public taste for dairy straight from the nipple.`));
			}
			if ((slave.assignment === Job.MILKED || slave.assignment === Job.DAIRY) && slave.balls > 0) {
				t.push(new SocialEffect("Pastoralist", 1, `Cockmilked`,
					`Society <span class="green">approves</span> of how ${slave.slaveName} gets cockmilked; the sight of ${his} product encourages experimentation with cum-based concoctions.`));
			}
		}

		if (FutureSocieties.isActive('FSPhysicalIdealist')) {
			if (V.arcologies[0].FSPhysicalIdealistLaw === 1) {
				if (slave.muscles > 50) {
					t.push(new SocialEffect("Physical Idealist", 1, `Overmuscled (Fit Feminine)`,
						`Society <span class="green">approves</span> of ${slave.slaveName}'s commitment to fitness; but thinks ${his} muscles are too big and vascular.`));
				} else if (slave.muscles > 20) {
					t.push(new SocialEffect("Physical Idealist", 2, `Fit (Fit Feminine)`,
						`Society <span class="green">strongly approves</span> of ${slave.slaveName}'s fit body; physical enthusiasts see ${him} as the optimal example of feminine fitness.`));
				} else if (slave.muscles > 5) {
					t.push(new SocialEffect("Physical Idealist", 1, `Toned (Fit Feminine)`,
						`Society <span class="green">approves</span> of ${slave.slaveName}'s toned form; the public sees potential in those guns.`));
				}
			} else {
				if (slave.muscles > 95) {
					t.push(new SocialEffect("Physical Idealist", 2, `Bodybuilder`,
						`Society <span class="green">strongly approves</span> of ${slave.slaveName}'s glorious muscles; everyone wants to train a slave to look as swole as ${him}.`));
				} else if (slave.muscles > 30) {
					t.push(new SocialEffect("Physical Idealist", 1, `Fit`,
						`Society <span class="green">approves</span> of ${slave.slaveName}'s fit body; physical enthusiasts see ${him} as on ${his} way to something great.`));
				} else if (slave.muscles > 5) {
					t.push(new SocialEffect("Physical Idealist", 1, `Toned`,
						`Society <span class="green">approves</span> of ${slave.slaveName}'s toned form; the public sees potential in those guns.`));
				}
			}
			if (slave.muscles < -30) {
				t.push(new SocialEffect("Physical Idealist", -1, `Frail`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s frail state; ${he} needs to build some muscles if ${he}'s going to help the public idolize fitness.`));
			}
			if (slave.height >= 185) {
				t.push(new SocialEffect("Physical Idealist", 1, `Tall`,
					`Society <span class="green">approves</span> of how tall ${he} is; the sexual advantages of ${his} height are impressed on the public mind.`));
			}
			if (slave.health.condition > 80) {
				t.push(new SocialEffect("Physical Idealist", 1, `Healthy`,
					`Society <span class="green">approves</span> of ${his} health; the expectation that slaves should be kept perfectly healthy grows.`));
			}
		} else if (FutureSocieties.isActive('FSHedonisticDecadence')) {
			if (slave.weight > 160) {
				t.push(new SocialEffect("Hedonistic", 3, `Obese`,
					`Society <span class="green">strongly approves</span> of ${slave.slaveName}'s glorious rolls; everyone wants to own a pillowy slave like ${him}.`));
			} else if (slave.weight > 95) {
				t.push(new SocialEffect("Hedonistic", 2, `Voluptuous`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s fat body; it shows just how much luxurious your life must be to pamper a slave as much as ${him}.`));
			} else if (slave.weight > 30) {
				t.push(new SocialEffect("Hedonistic", 1, `Chubby`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s chubby form; the public enjoys the sight of a well rounded slave.`));
			} else if (slave.weight < -30) {
				t.push(new SocialEffect("Hedonistic", -1, `Skin and bones`,
					`Society <span class="red">disapproves</span> of ${slave.slaveName}'s emaciated state; let the poor ${girl} eat, for goodness' sake!`));
			}
			if (slave.muscles < -30) {
				t.push(new SocialEffect("Hedonistic", 1, `Soft and weak`,
					`Society <span class="green">approves</span> of how soft ${he} is; the sexual advantages of being able to effortlessly overpower ${him} are not lost on them.`));
			}
			if (slave.fetishStrength > 95) {
				t.push(new SocialEffect("Hedonistic", 1, `Intense fetish`,
					`Society <span class="green">approves</span> of ${his} intense fetish; the expectation that everyone's deepest desires should be fulfilled grows.`));
			}
			// paraphiliaSatisfied is set in saLongTermMentalEffects.js
			if (slave.paraphiliaSatisfied > 0) {
				t.push(new SocialEffect("Hedonistic", 1, `Satisfied paraphilia`,
					`Society <span class="green">is pleased</span> that ${he} is allowed to fully indulge ${his} paraphilia.`));
			} else if (slave.paraphiliaSatisfied < 0) {
				t.push(new SocialEffect("Hedonistic", -2, `Unsatisfied paraphilia`,
					`Society <span class="red">frowns</span> upon ${him} not being allowed to indulge in ${his} paraphilia.`));
			}
		}

		if (FutureSocieties.isActive('FSChattelReligionist')) {
			const collar = App.Data.slaveWear.collar.get(slave.collar);
			if (collar && collar.fs && collar.fs.loves && collar.fs.loves.has("FSChattelReligionist")) {
				t.push(new SocialEffect("Chattel Religionist", 1, `Punishing collar`,
					`Society <span class="green">approves</span> of ${slave.slaveName}'s collar as an expression of the old ideal of mortification of the flesh, advancing the combination of religious originalism and modern slavery.`));
			}
			const clothes = App.Data.clothes.get(slave.clothes);
			let clothesOK = false;
			if (V.arcologies[0].FSChattelReligionistLaw2 !== 1) {
				if (ChattelReligionistClothingPass(slave.clothes)) {
					t.push(new SocialEffect("Chattel Religionist", 1, `Religious clothing`,
						`Society <span class="green">approves</span> of ${his} religiously themed clothing, strengthening the connection between sexual servitude and faith.`));
					clothesOK = true;
				} else if (clothes && clothes.fs && clothes.fs.tolerates && clothes.fs.tolerates.has("FSChattelReligionist")) {
					t.push(new SocialEffect("Chattel Religionist", 0, `Spartan clothing`,
						`Society accepts ${his} spartan clothing, seeing it as permissible under the new religious mores.`));
					clothesOK = true;
				}
			} else {
				if (clothes && clothes.exposure > 3) {
					t.push(new SocialEffect("Chattel Religionist", 2, `Holy Nudism`,
						`Society <span class="green">strongly approves</span> of ${his} holy nudism, strengthening the connection between sexual servitude and faith.`));
					clothesOK = true;
				} else if (ChattelReligionistClothingPass(slave.clothes)) {
					t.push(new SocialEffect("Chattel Religionist", 1, `Revealing religious clothing`,
						`Society <span class="green">approves</span> of ${his} revealing, religiously themed clothing, strengthening the connection between sexual servitude and faith.`));
					clothesOK = true;
				} else if (clothes && clothes.fs && clothes.fs.loves && clothes.fs.loves.has("FSChattelReligionist")) {
					t.push(new SocialEffect("Chattel Religionist", 0, `Conservative religious clothing`,
						`Society accepts ${his} religiously themed clothing, but finds it insufficiently revealing to promote Holy Nudism.`));
					clothesOK = true;
				}
			}
			if (!clothesOK && slave.fuckdoll === 0) {
				t.push(new SocialEffect("Chattel Religionist", -1, `Extravagant clothing`,
					`Society <span class="red">disapproves</span> of ${his} unnecessarily gaudy attire; this slows acceptance of a link between faith and sexual servitude.`));
			}
			if (slave.devotion > 95) {
				t.push(new SocialEffect("Chattel Religionist", 1, `Worshipful`,
					`Society <span class="green">approves</span> of ${his} devotion to you as a companion to religious devotion, seeing both as the model for holy slaves.`));
			}
			if (slave.trust > 95) {
				t.push(new SocialEffect("Chattel Religionist", 2, `Completely trusting`,
					`Society <span class="green">strongly approves</span> of ${his} faith in you as a companion to faith in God, seeing both as the model for righteous slaves of the future.`));
			}
			if (slave.behavioralFlaw === BehavioralFlaw.DEVOUT) {
				t.push(new SocialEffect("Chattel Religionist", 0, `Devout`,
					`Society does not disapprove of ${his} devout adherence to an old world faith, having confidence that you'll bring ${him} around, and looking forward to seeing ${him} converted into a holy sex object.`));
			} else if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
				t.push(new SocialEffect("Chattel Religionist", 2, `Sinful`,
					`Society <span class="green">strongly approves</span> of ${his} eagerness to transgress against the old world religious mores ${he} once held dear.`));
			}
			if (slave.shouldersTat === "sacrilege" && slave.lipsTat === "sacrilege" && slave.boobsTat === "sacrilege" && slave.armsTat === "sacrilege" && slave.backTat === "sacrilege" && slave.stampTat === "sacrilege" && slave.buttTat === "sacrilege" && slave.vaginaTat === "sacrilege" && slave.dickTat === "sacrilege" && slave.anusTat === "sacrilege" && slave.legsTat === "sacrilege" && slave.fuckdoll === 0) {
				t.push(new SocialEffect("Chattel Religionist", 1, `Sacrilegious tattoos`,
					`Society <span class="green">enjoys the sight</span> of the religious sacrilege scrawled across ${his} skin.`));
			}
		}

		return t;
	}

	function makeShelterGirlEffects() {
		let t = [];
		if (slave.fuckdoll === 0) {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (isShelterSlave(slave)) {
					if ([Job.CLUB, Job.PUBLIC, Job.WHORE, Job.BROTHEL].includes(slave.assignment)) {
						if (slave.trust > 20 && slave.health.condition > 40) {
							if (FutureSocieties.isActive('FSPaternalist')) {
								t.push(new SocialEffect("Paternalist", 2, "Happy shelter girl",
									`Society <span class="green">strongly approves</span> of how you've brought a shelter ${girl} health and happiness.`, true));
							} else if (!FutureSocieties.isActive('FSDegradationist')) {
								t.push(new SocialEffect(null, 1, "Happy shelter girl",
									`The public knows ${he}'s a shelter ${girl} you took in, and is <span class="green">touched</span> that ${he} now seems happy and healthy.`, true));
							}
						}
					}
				}
			}
		}
		return t;
	}

	function applySocialEffects() {
		function applyFacilityCredit(value) {
			switch (slave.assignment) {
				case Job.BROTHEL:
					getSlaveStatisticData(slave, V.facility.brothel).rep += value;
					break;
				/* TODO: presumably more go here? */
			}
		}

		for (const effect of socialEffects) {
			if (effect.FS) { // combined rep & FS
				const repChange = FutureSocieties.Change(effect.FS, effect.magnitude, slave.pornFameBonus);
				if (effect.creditFacility) {
					applyFacilityCredit(repChange);
				}
			} else { // rep only
				repX(V.FSSingleSlaveRep * effect.magnitude, "futureSocieties" /* really? */, slave);
				if (effect.creditFacility) {
					applyFacilityCredit(V.FSSingleSlaveRep * effect.magnitude);
				}
			}
		}

		// apply elite failure
		V.failedElite += netFailedElite;
	}

	function renderTooltip() {
		const el = document.createElement("div");
		el.classList.add("tip-details", "grid-2columns-auto");
		for (const effect of socialEffects) {
			let text = "";
			let className;
			if (effect.magnitude > 0) {
				for (let i = 0; i < effect.magnitude; ++i) {
					text += "+";
				}
				className = "green";
			} else if (effect.magnitude < 0) {
				for (let i = 0; i > effect.magnitude; --i) {
					text += "-";
				}
				className = "red";
			} else {
				text = '0';
				className = "gray";
			}
			App.UI.DOM.appendNewElement("span", el, text, className);

			const div = document.createElement('div');
			div.append(effect.shortDesc);
			if (effect.FS) {
				div.append(` (${effect.FS})`);
			}
			el.appendChild(div);
		}
		return el;
	}

	function report() {
		function displayCompressed() {
			const positiveSum = socialEffects.filter(e => e.magnitude > 0).reduce((acc, cur) => acc += cur.magnitude, 0);
			const negativeSum = socialEffects.filter(e => e.magnitude < 0).reduce((acc, cur) => acc += cur.magnitude, 0);

			const sumFrag = document.createDocumentFragment();
			sumFrag.append(`(`);
			App.UI.DOM.appendNewElement("span", sumFrag, '+' + positiveSum.toString(), positiveSum > 0 ? "green" : "gray");
			sumFrag.append(`/`);
			App.UI.DOM.appendNewElement("span", sumFrag, '-' + Math.abs(negativeSum).toString(), negativeSum < 0 ? "red" : "gray"); // literal '-' + Math.abs needed to handle 0 case
			sumFrag.append(`)`);

			const sum = positiveSum + negativeSum;
			frag.append(`Society has a `);
			if (sum > 0) {
				const opinion = App.UI.DOM.makeElement("span", "positive", ["green", "major-link", "has-tooltip"]);
				tippy(opinion, {content: renderTooltip(), placement: "right"});
				frag.append(opinion, ` overall view of ${slave.slaveName} `, sumFrag, `, which improves your reputation and advances social progress.`);
			} else if (sum === 0) {
				const opinion = App.UI.DOM.makeElement("span", "neutral", ["yellow", "major-link", "has-tooltip"]);
				tippy(opinion, {content: renderTooltip(), placement: "right"});
				frag.append(opinion, ` overall view of ${slave.slaveName} `, sumFrag, `; ${he} had no net impact on your reputation or social progress this week.`);
			} else {
				const opinion = App.UI.DOM.makeElement("span", "negative", ["red", "major-link", "has-tooltip"]);
				tippy(opinion, {content: renderTooltip(), placement: "right"});
				frag.append(opinion, ` overall view of ${slave.slaveName} `, sumFrag, `, which decreases your reputation and retards social progress.`);
			}
		}

		function displayLong() {
			$(frag).append(socialEffects.map(e => e.longDesc).join(" "));
		}

		const frag = document.createDocumentFragment();

		if (V.FSAnnounced > 0) {
			if (V.studio === 1) {
				if (slave.porn.viewerCount > 0) {
					slave.pornFameBonus += (Math.ceil(slave.porn.viewerCount / 100000));
					if (slave.porn.viewerCount >= 100000) {
						frag.append(`${His} near-ubiquitous presence in arcology pornography greatly increases ${his} impact on society. `);
					} else if (slave.porn.viewerCount >= 10000) {
						frag.append(`${His} presence in arcology pornography increases ${his} impact on society. `);
					} else {
						frag.append(`${His} occasional presence in arcology pornography slightly increases ${his} impact on society. `);
					}
				}
			}
		}
		if (socialEffects.length > 0) {
			applySocialEffects();
			if (!V.UI.compressSocialEffects || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
				displayLong();
			} else {
				displayCompressed();
			}
		}

		return frag;
	}

	/** Test what new social effects this slave would gain if a new FS were added
	 *  Note that this function does not currently take into account the social effects
	 *  that would be *lost* if a new FS was enacted; this is a rare but extant case.
	 * @param {FC.FutureSociety} proposedFS
	 */
	function newForFS(proposedFS) {
		// make sure the FS is not currently enacted
		if (V.arcologies[0][proposedFS] !== null) {
			throw new Error(`Cannot test new FS social effects for existing FS ${proposedFS}`);
		}
		// temporarily enact the FS at full strength
		V.arcologies[0][proposedFS] = 100;
		// see what the slave's social effects would be under the proposed FS
		const newSocialEffects = [...makeSocialEffects(), ...makeShelterGirlEffects()];
		// undo the temporary FS enactment
		V.arcologies[0][proposedFS] = null;
		// return the differences between the current and new states
		return _.differenceBy(newSocialEffects, socialEffects, s => s.shortDesc);
	}

	function effects() {
		return socialEffects;
	}

	const socialEffects = [...makeSocialEffects(), ...makeShelterGirlEffects()];

	return {
		report,
		newForFS,
		effects
	};
};
