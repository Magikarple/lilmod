/**
 * @param {FC.ReportSlave} slave
 * @returns {DocumentFragment}
 */
App.SlaveAssignment.longTermEffects = function saLongTermEffects(slave) {
	const r = [];

	const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;
	const rearQuirk = slave.geneticQuirks.rearLipedema === 2 ? 2 : 0;
	const uterineHypersensitivityMod = slave.geneticQuirks.uterineHypersensitivity === 2 ? 2 : 1;
	const oldEnergy = slave.energy;

	const {
		he, him, his, himself, He, His,
	} = getPronouns(slave);

	if (slave.fuckdoll > 0) {
		fuckdollConversion(slave);
	}
	if (assignmentVisible(slave) && (slave.assignment !== Job.HEADGIRLSUITE || V.HGSuiteSurgery === 0)) {
		if (hasSurgeryRule(slave, V.defaultRules) && slave.useRulesAssistant === 1 && slave.indentureRestrictions < 2 && V.cash > 0) {
			r.push(rulesAutosurgery(slave));
		}
	}
	r.push(App.SlaveAssignment.clothes(slave));
	r.push(App.SlaveAssignment.longTermMentalEffects(slave));
	piercingEffects(slave);
	if (slave.lactation >= 2 || (slave.lactation > 0 && slave.lactationAdaptation >= 100)) {
		heavyLactationEffects(slave);
	}
	implantEffects(slave);
	if (slave.diet === Diet.MUSCLE) { // Why is this here? Probably something to do with hormones.
		muscleBuildingEffects(slave);
	}
	if (slave.aphrodisiacs > random(0, 2)) {
		aphrodisiacEffects(slave);
	}
	hormoneBalance(slave); // includes App.SlaveAssignment.hormonesEffects()
	if (slave.pubertyXX === 0 || slave.pubertyXY === 0) {
		puberty(slave);
	}
	r.push(App.SlaveAssignment.pregnancy(slave));
	if (slave.bellyFluid >= 1500) {
		r.push(App.SlaveAssignment.inflation(slave));
		inflationEffects(slave);
	}
	bellySagging(slave);
	bellyImplantStuff(slave);
	if (slave.fetish !== Fetish.MINDBROKEN) {
		mindbreak(slave);
		if (slave.fuckdoll === 0) {
			mentalTension(slave);
			if (!canTalk(slave)) {
				noTalkingFixesFlaws(slave);
			}
			if (slave.breedingMark === 1 && V.propOutcome === 1) {
				breedingMark(slave);
			}
			solidSlaveFoodEffects(slave);
		}
	}
	r.push(App.SlaveAssignment.saSocialEffects(slave).report());
	if (slave.fuckdoll === 0) { // swap to fuckdoll suit in the future
		brandEffects(slave);
		if (slave.fetish !== Fetish.MINDBROKEN) {
			disabilityEffects(slave);
		}
	}
	r.push(App.SlaveAssignment.longTermPhysicalEffects(slave));
	anaphrodisiacEffects(slave, oldEnergy); // must come after all .energy gains!
	if (slave.accent > 0 && slave.fetish !== Fetish.MINDBROKEN) {
		languageLearning(slave);
	}
	if (slave.prestige > 0) {
		prestige(slave);
	}
	pornEffects(slave);
	age(slave);
	if (FutureSocieties.isActive('FSRestart')) {
		pregnancyCheck(slave);
	}
	if (slave.preg > slave.pregData.normalBirth / 8) {
		mainLaborTriggers(slave);
	}
	endWeekHealthDamage(slave); // contained in healthFunctions.js
	slaveDeath(slave);
	if ((slave.hStyle !== "shaved" && slave.hStyle !== "buzzcut" && slave.hStyle !== "trimmed" && slave.hStyle !== "pixie cut" && slave.hStyle !== "bob cut") && slave.bald !== 1 && slave.haircuts === 0) {
		hairGrowth(slave);
	}

	const frag = document.createDocumentFragment();
	$(frag).append(...App.Events.spaceSentences(r));
	return frag;

	/**
	 * Calculate current total base of the slave's boobs, since it'll be changing throughout the passage
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function boobSize(slave) {
		return App.Medicine.fleshSize(slave, 'boobs');
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function fuckdollConversion(slave) {
		if (slave.fuckdoll >= 100) {
			r.push(`${He} is perfectly adapted to life in a Fuckdoll suit.`);
		} else {
			if (slave.fuckdoll <= 5) {
				r.push(`This is ${his} first week as a living sex toy. ${He} is <span class="devotion dec">utterly terrified</span> by the prospect of spending the rest of ${his} life like this. ${He} is <span class="fuckdoll">forced to adapt</span> to life as a Fuckdoll. ${He} must remain still, and do ${his} best to cooperate with anyone who guides ${him} by touch. When ${he} obeys commands relayed by ${his} suit, ${he} is rewarded with orgasms; when ${he} does not, ${he} is punished with pain.`);
				slave.trust -= 10;
				if (slave.skill.entertainment > 50) {
					r.push(`${He} <span class="stat drop">begins to forget ${his} entertainment skills</span> under the terrible stress of total confinement.`);
					slave.skill.entertainment = 50;
				}
			} else if (slave.fuckdoll <= 15) {
				r.push(`This is ${his} second week as a living sex toy. ${His} suit continues ${his} training as a living sex toy, <span class="fuckdoll">forcing ${him} to accept any treatment</span> ${he} is subjected to. Though the suit is capable of resisting unacceptable movement to a degree, and it includes integral shackles to secure the toy in any position desired, the Fuckdoll is now severely punished if ${he} attempts any resistance at all.`);
				if (slave.skill.whoring > 50) {
					r.push(`${He} <span class="stat drop">loses ${his} refined courtesanship,</span> since all ${he} has to remember now is how to be used.`);
					slave.skill.whoring = 50;
				}
			} else if (slave.fuckdoll <= 25) {
				r.push(`This week ${he} <span class="fuckdoll">learns the most basic commands</span> ${his} suit can pass, those for simple postures.`);
				if (isAmputee(slave)) {
					r.push(`These are very simple, since ${he} lacks limbs.`);
				} else {
					r.push(`One command directs ${him} to remain standing, but cock ${his} hips to offer ${his} rear hole. Another requires ${him} to get instantly down`);
					if (hasAllLimbs(slave)) {
						r.push(`on all fours`);
					} else {
						r.push(`to the floor`);
					}
					r.push(`and arch ${his} back, offering both ${his} face hole and`);
					if (slave.vagina > -1) {
						r.push(`lower holes.`);
					} else {
						r.push(`rear hole.`);
					}
				}
				if (slave.behavioralQuirk !== BehavioralQuirk.NONE) {
					r.push(`With no stimulation other than use, ${he} <span class="stat drop">quickly forgets what used to make ${his} behavior special.</span>`);
					slave.behavioralQuirk = BehavioralQuirk.NONE;
				}
				if (slave.career !== "a Fuckdoll") {
					r.push(`${His} procedural memory has largely been overwritten by tonal commands; <span class="noteworthy">${his} only meaningful career experience is now the profession of a living sex toy.</span>`);
					slave.career = "a Fuckdoll";
				}
			} else if (slave.fuckdoll <= 35) {
				r.push(`This week ${he} <span class="fuckdoll">learns more advanced posture commands.</span>`);
				if (!hasAnyLegs(slave)) {
					r.push(`These remain quite simple, since ${he} lacks`);
					if (isAmputee(slave)) {
						r.push(`limbs.`);
					} else {
						r.push(`legs.`);
					}
				} else {
					r.push(`${He} practices balance in the heels integral to the suit, and learns to stand and bend at the waist, all the way down, while keeping ${his}`);
					if (!hasBothLegs(slave)) {
						r.push(`leg`);
					} else {
						r.push(`legs`);
					}
					r.push(`straight, putting ${his} face hole and ${his}`);
					if (slave.vagina > -1) {
						r.push(`lower holes`);
					} else {
						r.push(`rear hole`);
					}
					r.push(`at convenient waist height.`);
				}
				if (slave.sexualQuirk !== SexualQuirk.NONE) {
					r.push(`${His} sex life now consists of things that enter ${his} holes. ${He} learns to desire any use at all, since nothing else interrupts the infinite boredom. ${He} <span class="red">quickly forgets what used to make ${his} sexual tendencies distinctive.</span>`);
					slave.sexualQuirk = SexualQuirk.NONE;
				}
			} else if (slave.fuckdoll <= 45) {
				r.push(`This week ${he} <span class="fuckdoll">learns basic sexual commands</span> from ${his} suit. Usually, if something is inserted into ${his}`);
				if (slave.vagina > -1) {
					r.push(`holes,`);
				} else {
					r.push(`lower hole,`);
				}
				r.push(`${he} is to relax. If a specific command is given, ${he} is taught to rhythmically tighten`);
				if (slave.vagina > -1) {
					r.push(`${his} holes,`);
				} else {
					r.push(`the hole,`);
				}
				r.push(`massaging whatever's inside.`);
				if (slave.skill.vaginal > 25) {
					r.push(`Being trained in this uncomplicated act <span class="stat drop">quickly teaches ${him} to ignore ${his} vaginal talents.</span>`);
					slave.skill.vaginal = 25;
				}
				if (slave.skill.anal > 25) {
					r.push(`${He}'s forced to use ${his} sphincter as hard as ${he} can, and ${he} <span class="stat drop">quickly forgets all anal refinement.</span>`);
					slave.skill.anal = 25;
				}
			} else if (slave.fuckdoll <= 55) {
				r.push(`This week ${he} <span class="fuckdoll">learns more basic sexual commands</span> from ${his} suit. Usually, if something is inserted into ${his} throat, ${he} is to relax and accept a facefucking. If a specific command is given, ${he} is taught to suck as powerfully as ${he} can, on pain of punishment.`);
				if (slave.skill.oral > 25) {
					r.push(`Being trained to suck so hard <span class="stat drop">quickly erases ${his} finer oral habits.</span>`);
					slave.skill.oral = 25;
				}
				if (slave.behavioralFlaw !== BehavioralFlaw.NONE) {
					r.push(`${He} has now been obeying ${his} suit out of a desire to avoid punishment for so long that <span class="flaw break">${he} loses any propensity to misbehave in distinctive ways.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				}
			} else if (slave.fuckdoll <= 65) {
				r.push(`This week ${he} <span class="fuckdoll">receives training for finer arousal control</span> from ${his} suit. ${He} can now be warmed up before use, to make ${him} as desperate as possible; or ${he} can be warmed up and left to suffer.`);
				if (slave.fetishStrength > 50) {
					r.push(`${He}'s now so desperate for any stimulation that ${he} <span class="fetish loss">begins to forget what once aroused ${him}.</span> ${He} now wants whatever ${he} can get.`);
					slave.fetishStrength = 50;
				}
				if (slave.sexualFlaw !== SexualFlaw.NONE) {
					r.push(`${He}'s trained to perform thorough mechanical obedience, <span class="flaw break">utterly destroying ${his} sexual deficiencies.</span>`);
					slave.sexualFlaw = SexualFlaw.NONE;
				}
				if (canAchieveErection(slave)) {
					r.push(`${He} is trained to become erect on command, to endure having ${his} phallus ridden for as long as desired, to ejaculate on demand, or refrain from doing so if ordered.`);
					if (slave.skill.penetrative > 25) {
						r.push(`Since ${his} cock is now a simple accessory to the suit, ${he} <span class="stat drop">quickly loses the finer techniques ${he} once had.</span>`);
						slave.skill.penetrative = 25;
					}
				}
			} else if (slave.fuckdoll <= 75) {
				r.push(`This week ${he} <span class="fuckdoll">begins to learn more advanced commands</span> from ${his} suit. ${He} is taught a command that instructs ${him} to take a more active role in penetrative sex. When that command is given, ${he} must fuck ${himself} against any`);
				if (V.PC.dick !== 0) {
					r.push(`cocks`);
				} else {
					r.push(`phalli`);
				}
				r.push(`that are currently inside ${him}, as hard as ${he} possibly can.`);
				if (slave.fetish !== Fetish.NONE && slave.fetish !== Fetish.MINDBROKEN) {
					r.push(`${He} <span class="fetish loss">no longer retains any sexual preferences</span> at all. ${He} just wants to be penetrated.`);
					slave.fetish = Fetish.NONE;
					slave.fetishStrength = 0;
				}
				if (slave.intelligence + slave.intelligenceImplant > 50) {
					r.push(`${He} was once highly intelligent, but total concentration of all ${his} mental abilities on simple tonal commands <span class="stat drop">dulls ${his} intelligence.</span>`);
					slave.intelligence -= 30;
				}
			} else if (slave.fuckdoll <= 85) {
				r.push(`This week ${he} <span class="fuckdoll">learns some more advanced commands</span> from ${his} suit.`);
				if (isAmputee(slave)) {
					r.push(`If ${his} limbless torso is placed atop a dick and a command is given, ${he} is to do ${his} best to bounce on it.`);
				} else {
					r.push(`${He} learns a special command, on which ${he} is to slowly squat down, impaling ${himself} on any phallus beneath ${him}. Once ${his} hole is filled, ${he} is to bounce up and down, using ${his} hole to milk the phallus.`);
				}
				if (slave.skill.entertainment > 15) {
					r.push(`There is <span class="stat drop">no entertainment and no elegance</span> for ${him} anymore. ${He} cannot even hear the lewd noises ${his} holes make.`);
					slave.skill.entertainment = 15;
				}
				if (slave.skill.whoring > 15) {
					r.push(`${He} <span class="stat drop">cannot remember prostitution</span> at all. ${He} can barely remember anything but being fucked.`);
					slave.skill.whoring = 15;
				}
				if (slave.intelligence + slave.intelligenceImplant > 15) {
					r.push(`${His} <span class="stat drop">mind steadily degrades</span> under the stress of this treatment.`);
					slave.intelligence -= 40;
				}
				if (slave.intelligenceImplant !== 0) {
					r.push(`An education holds no bearing for ${his} new skillset, so it <span class="stat drop">wastes away.</span>`);
					slave.intelligenceImplant = 0;
				}
			} else if (slave.fuckdoll <= 95) {
				r.push(`This week ${he} <span class="fuckdoll">begins ${his} final adaptation</span> into a perfect living sex toy. ${His} suit starts to actively punish any detectable mental activity when ${him} is not obeying commands or being used.`);
				if (slave.intelligence > -50) {
					r.push(`${He} was once reasonably intelligent, but the incredible stress of this treatment <span class="stat drop">suppresses ${his} ability to think coherently.</span>`);
					slave.intelligence = -50;
				}
			}
			slave.fuckdoll = Math.clamp(slave.fuckdoll + 10, 0, 100);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function piercingEffects(slave) {
		let masochistic = 0;
		if (slave.piercing.vagina.weight > 1) {
			if (slave.vagina > -1 && slave.labia < 2 && random(1, 100) > 90) {
				r.push(`The weight of ${his} labial piercings <span class="change positive">stretches out ${his} pussylips a bit.</span>`);
				slave.labia += 1;
			}
		}
		if (slave.piercing.nipple.weight === 1) {
			if (slave.nipples === NippleShape.TINY) {
				if (random(1, 100) > 95) {
					r.push(`${His} piercings keep ${his} nipples half-hard all the time, and <span class="change positive">${his} nipples have stretched out a bit.</span>`);
					slave.nipples = NippleShape.CUTE;
				}
			} else if (slave.nipples === NippleShape.PARTIAL) {
				if (random(1, 100) > 70) {
					r.push(`${His} piercings keep ${his} nipples half-hard all the time, which <span class="change positive">permanently protrudes them.</span>`);
					if (random(1, 2) === 1) {
						r.push(`It turns out they're pretty cute.`);
						slave.nipples = NippleShape.CUTE;
					} else {
						r.push(`It turns out they're nice and puffy.`);
						slave.nipples = NippleShape.PUFFY;
					}
					masochistic = 1;
				} else {
					r.push(`Having ${his} nipples held protruded by ${his} piercings is uncomfortable, which ${he}`);
					masochistic = 2;
				}
			} else if (slave.nipples === NippleShape.INVERTED) {
				if (random(1, 100) > 90) {
					r.push(`${His} piercings keep ${his} nipples half-hard all the time, which eventually <span class="change positive">permanently protrudes them.</span>`);
					if (random(1, 2) === 1) {
						r.push(`It turns out they're absolutely massive.`);
						slave.nipples = NippleShape.HUGE;
					} else {
						r.push(`It turns out they're nice and puffy.`);
						slave.nipples = NippleShape.PUFFY;
					}
					masochistic = 1;
				} else {
					r.push(`Having ${his} nipples held protruded by ${his} piercings is very uncomfortable, which ${he}`);
					masochistic = 2;
				}
			} else if (slave.nipples === NippleShape.FLAT) {
				if (random(1, 100) > 90) {
					r.push(`${His} piercings tug at ${his} nipples constantly, eventually <span class="change positive">preventing the fat nubs from flattening out again.</span>`);
					slave.nipples = NippleShape.HUGE;
				}
			}
		} else if (slave.piercing.nipple.weight === 2) {
			if (slave.nipples === NippleShape.TINY) {
				if (random(1, 100) > 80) {
					r.push(`${He}'s got so much metal in ${his} nipples that the weight <span class="change positive">stretches and lengthens them.</span>`);
					slave.nipples = NippleShape.CUTE;
				}
			} else if (slave.nipples === NippleShape.PARTIAL) {
				if (random(1, 100) > 50) {
					r.push(`${He}'s got so much metal in ${his} nipples that the weight <span class="change positive">permanently protrudes them.</span>`);
					if (random(1, 2) === 1) {
						r.push(`It turns out they're pretty cute.`);
						slave.nipples = NippleShape.CUTE;
					} else {
						r.push(`It turns out they're nice and puffy.`);
						slave.nipples = NippleShape.PUFFY;
					}
					masochistic = 1;
				} else {
					r.push(`Having ${his} nipples held protruded by ${his} piercings is uncomfortable, which ${his}`);
					masochistic = 2;
				}
			} else if (slave.nipples === NippleShape.INVERTED) {
				if (random(1, 100) > 70) {
					r.push(`${He}'s got so much metal in ${his} nipples that the weight <span class="change positive">permanently protrudes them.</span>`);
					if (random(1, 2) === 1) {
						r.push(`It turns out they're absolutely massive.`);
						slave.nipples = NippleShape.HUGE;
					} else {
						r.push(`It turns out they're nice and puffy.`);
						slave.nipples = NippleShape.PUFFY;
					}
					masochistic = 1;
				} else {
					r.push(`Having ${his} nipples held protruded by ${his} piercings is extremely uncomfortable, which ${he}`);
					masochistic = 2;
				}
			} else if (slave.nipples === NippleShape.FLAT) {
				if (random(1, 100) > 50) {
					r.push(`${He}'s got so much metal in ${his} nipples that the weight eventually <span class="change positive">stretches them out.</span>`);
					slave.nipples = NippleShape.HUGE;
				}
			}
		}
		if (masochistic === 1) {
			if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1) {
				r.push(`This is <span class="devotion inc">a long and extremely uncomfortable experience, which ${he} gets off on.</span>`);
				slave.devotion += 4;
			} else {
				r.push(`This is <span class="devotion dec">a long and extremely uncomfortable experience.</span>`);
				slave.devotion -= 4;
			}
		} else if (masochistic === 2) {
			if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1) {
				r.push(`<span class="devotion inc">gets off on.</span>`);
				slave.devotion += 2;
			} else {
				r.push(`<span class="devotion dec">hates.</span>`);
				slave.devotion -= 2;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function heavyLactationEffects(slave) {
		if (slave.nipples !== NippleShape.HUGE && slave.nipples !== NippleShape.FUCKABLE) {
			if (slave.nipples === NippleShape.TINY) {
				if (random(1, 100) > 70) {
					r.push(`Having ${his} heavy milk production forced through ${his} tiny nipples <span class="change positive">stretches and engorges them.</span>`);
					slave.nipples = NippleShape.CUTE;
				}
			} else if (slave.nipples === NippleShape.CUTE) {
				if (random(1, 100) > 80) {
					r.push(`${He}'s lactating so heavily that ${his} permanently swollen nipples gradually become accustomed to the constant flow of milk. They <span class="change positive">become puffy</span> and engorged.`);
					slave.nipples = NippleShape.PUFFY;
				}
			} else if (slave.nipples === NippleShape.PARTIAL || slave.nipples === NippleShape.INVERTED) {
				if (random(1, 100) > 80) {
					r.push(`${He}'s lactating so heavily that ${his} swollen nipples almost never retreat into their inverted state. Lactation has <span class="change positive">permanently protruded them,</span> leaving them engorged and puffy.`);
					slave.nipples = NippleShape.PUFFY;
				}
			} else if (slave.nipples === NippleShape.FLAT) {
				if (random(1, 100) > 50) {
					r.push(`${He}'s lactating so heavily that ${his} swollen nipples almost never get the chance to flatten back out. Lactation has <span class="change positive">permanently engorged them,</span> leaving them positively massive.`);
					slave.nipples = NippleShape.HUGE;
				}
			} else {
				if (random(1, 100) > 90) {
					r.push(`Lactation has <span class="change positive">swollen ${his} nipples</span> to an absurd size, making ${his} status as a cow obvious even when ${his} chest faucets aren't gushing cream.`);
					slave.nipples = NippleShape.HUGE;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function implantEffects(slave) {
		let implantsSwellBoobs = 0;
		if (slave.boobsImplantType === SizingImplantType.STRING) {
			r.push(`${His} string implants absorb fluid, <span class="change positive">slowly swelling ${his} breasts.</span>`);
			slave.boobsImplant += 50;
			slave.boobs += 50;
			const effect = random(1, 10);
			if (slave.boobs > 50000) {
				r.push(`Since they are as large as ${his} body can handle, some serum is drained from them.`);
				slave.boobs -= 100;
				slave.boobsImplant -= 100;
			} else if (slave.boobsImplant > 25000 && effect >= 2) {
				r.push(`As they grow they <span class="health dec">greatly irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 20);
			} else if (slave.boobsImplant > 15000 && effect >= 3) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 10);
			} else if (slave.boobsImplant > 10000 && effect >= 4) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 10);
			} else if (slave.boobsImplant > 8000 && effect >= 5) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 10);
			} else if (slave.boobsImplant > 6000 && effect >= 6) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 10);
			} else if (slave.boobsImplant > 4500 && effect >= 7) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 10);
			} else if (slave.boobsImplant > 3000 && effect >= 8) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 7);
			} else if (slave.boobsImplant > 2000 && effect >= 9) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 5);
			} else if (slave.boobsImplant > 1000 && effect > 9) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} breasts.`);
				healthDamage(slave, 3);
			}
		}
		if (slave.boobsImplant >= slave.boobs + slave.boobsMilk && slave.boobsImplant > 0) {
			/* catch in case breast implants get larger than boobs */
			r.push(`${His} breast tissue has naturally <span class="change positive">stretched and grown</span> to accommodate ${his} implants better.`);
			slave.boobs = slave.boobsImplant + slave.boobsMilk + 10;
		} else if (slave.boobsImplant > 1000) {
			if (slave.boobs - slave.boobsImplant < 1000) {
				if (random(1, 100) > 60) {
					implantsSwellBoobs = 1;
				}
			}
		} else if (slave.boobsImplant > 600) {
			if (slave.boobs - slave.boobsImplant < 500) {
				if (random(1, 100) > 60) {
					implantsSwellBoobs = 1;
				}
			}
		} else if (slave.boobsImplant > 0) {
			if (slave.boobs - slave.boobsImplant < 300) {
				if (random(1, 100) > 60) {
					implantsSwellBoobs = 1;
				}
			}
		}
		if (implantsSwellBoobs === 1) {
			r.push(`${His} breast tissue has naturally <span class="change positive">stretched and grown</span> to accommodate ${his} implants a bit better.`);
			slave.boobs += 50;
		}
		if (slave.buttImplantType === "string") {
			r.push(`${His} string implants absorb fluid <span class="change positive">slowly swelling ${his} ass.</span>`);
			slave.buttImplant += .25;
			slave.butt += .25;
			if (slave.butt + slave.buttImplant > 10 && slave.buttImplant > 1) {
				r.push(`Since they as large as ${his} body can handle, some serum is drained from them.`);
				slave.butt -= 1;
				slave.buttImplant -= 1;
			}
			const effect = random(1, 8);
			if (slave.buttImplant > 7 && effect >= 2) {
				r.push(`As they grow they <span class="health dec">greatly irritate</span> the tissue of ${his} cheeks.`);
				healthDamage(slave, 20);
			} else if (slave.buttImplant > 6 && effect >= 2) {
				r.push(`As they grow they <span class="health dec">greatly irritate</span> the tissue of ${his} cheeks.`);
				healthDamage(slave, 20);
			} else if (slave.buttImplant > 5 && effect >= 3) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} cheeks.`);
				healthDamage(slave, 10);
			} else if (slave.buttImplant > 4 && effect >= 4) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} cheeks.`);
				healthDamage(slave, 10);
			} else if (slave.buttImplant > 3 && effect >= 5) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} cheeks.`);
				healthDamage(slave, 5);
			} else if (slave.buttImplant > 2 && effect >= 6) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} cheeks.`);
				healthDamage(slave, 5);
			} else if (slave.buttImplant > 1 && effect >= 7) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} cheeks.`);
				healthDamage(slave, 3);
			} else if (slave.buttImplant > 0 && effect > 7) {
				r.push(`As they grow they <span class="health dec">irritate</span> the tissue of ${his} cheeks.`);
				healthDamage(slave, 3);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function muscleBuildingEffects(slave) {
		if (slave.muscles > 30) {
			if (slave.face - slave.faceImplant > 10 && random(1, 100) > 90 && slave.drugs === Drug.STEROID) {
				r.push(`All the hormones in ${his} system from ${his} heavy, steroid enhanced workouts <span class="change negative">harden ${his} face a little.</span>`);
				slave.face -= 5;
			}
			if (boobSize(slave) > 250) {
				if (random(1, 100) > 95) {
					r.push(`All the hormones in ${his} system from ${his} heavy workouts <span class="change negative">shrink ${his} breasts slightly.</span>`);
					slave.boobs -= 50;
				}
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 */
	function aphrodisiacEffects(slave) {
		let Effects = [];
		if (V.aphrodisiacUpgradeRefine !== 1) {
			if (slave.dick > 1 && slave.geneticQuirks.wellHung !== 2) {
				Effects.push("DickShrink");
			}
			if (slave.balls > 1) {
				Effects.push("BallsShrink");
			}
			if (slave.clit > 0 && slave.geneticQuirks.wellHung !== 2) {
				Effects.push("ClitSmaller");
			}
			if (slave.voice.isBetween(0, 3)) {
				Effects.push("VoiceHigher");
			}
			if (slave.vagina !== -1 && slave.ovaries !== 0 && slave.vaginaLube < 2) {
				Effects.push("VaginaWetter");
			}
			let rearQuirkDivider = rearQuirk === 0 ? 1 : rearQuirk;
			if (((slave.butt - slave.buttImplant) < 2 + rearQuirk) && (slave.geneMods.NCS === 0 || (random(1, 100) > 75 / rearQuirkDivider))) {
				Effects.push("ButtBigger");
			}
			if ((boobSize(slave) < 500 * gigantomastiaMod) && ((slave.geneMods.NCS === 0) || (random(1, 100) > 75 / gigantomastiaMod))) {
				Effects.push("BoobsBigger");
			}
			if (slave.face - slave.faceImplant <= 10) {
				Effects.push("FaceSofter");
			}
			if (slave.faceShape === FaceShape.MASC) {
				Effects.push("FaceSofterAndrogynous");
			} else if (slave.faceShape === FaceShape.ANDRO && slave.geneticQuirks.androgyny !== 2) {
				Effects.push("FaceNormal");
			}
		}
		if (slave.devotion <= 20) {
			Effects.push("Devoted");
		}
		if (slave.trust <= 20) {
			Effects.push("Trusting");
		}
		if (slave.attrXY < 95) {
			Effects.push("MaleAttracted");
		}
		if (slave.attrXX < 95) {
			Effects.push("FemaleAttracted");
		}
		if (slave.geneticQuirks.galactorrhea === 2 && random(1, 100) < slave.hormoneBalance && slave.lactation === 0) {
			slave.inappropriateLactation = 1;
		}
		if (Effects.length > 0) {
			switch (Effects.random()) {
				case "DickShrink":
					if (slave.geneMods.NCS === 1 && slave.dick > 2 && random(1, 100) > 25) {
						r.push(`Dependence on the hormone-based aphrodisiacs combined with ${his} <span class="ncs">NCS</span> makes <span class="change negative">${his} dick shrink down to be more childlike.</span>`);
						slave.dick -= 1;
					} else {
						r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change negative">${his} dick atrophy.</span>`);
					}
					slave.dick -= 1;
					break;
				case "BallsShrink":
					if (slave.geneMods.NCS === 1 && slave.balls > 2 && random(1, 100) > 25) {
						r.push(`Dependence on the hormone-based aphrodisiacs combined with ${his} <span class="ncs">NCS</span> makes <span class="change negative">${his} balls shrink down to be more childlike.</span>`);
						slave.balls -= 1;
					} else {
						r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change negative">${his} testicles atrophy.</span>`);
					}
					slave.balls -= 1;
					break;
				case "VoiceHigher":
					r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change positive">${his} voice higher and more feminine.</span>`);
					slave.voice += 1;
					break;
				case "VaginaWetter":
					r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change positive">${his} vagina produce more copious natural lubricant.</span>`);
					slave.vaginaLube += 1;
					break;
				case "ButtBigger":
					r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change positive">the natural size of ${his} butt increase.</span>`);
					slave.butt += 1;
					break;
				case "BoobsBigger":
					r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change positive">the natural size of ${his} tits increase.</span>`);
					slave.boobs += 100;
					break;
				case "FaceSofter":
					r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change positive">${his} facial structure soften and become sexier.</span>`);
					r.push(faceIncrease(slave, 10));
					break;
				case "FaceSofterAndrogynous":
					r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change positive">${his} face soften into androgyny.</span>`);
					slave.faceShape = FaceShape.ANDRO;
					break;
				case "FaceNormal":
					r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change positive">${his} face soften into femininity.</span>`);
					slave.faceShape = FaceShape.NORMAL;
					break;
				case "ClitSmaller":
					if (slave.geneMods.NCS === 1 && slave.clit > 1 && random(1, 100) > 50) {
						r.push(`Dependence on the hormone-based aphrodisiacs combined with ${his} <span class="ncs">NCS</span> makes <span class="change negative">${his} clit shrink down to be more childlike.</span>`);
						slave.clit -= 1;
					} else {
						r.push(`Dependence on the hormone-based aphrodisiacs makes <span class="change negative">${his} clit shrink significantly.</span>`);
					}
					slave.clit -= 1;
					break;
				case "Devoted":
					r.push(`Hormonal effects make ${him} a bit more <span class="devotion inc">docile.</span>`);
					slave.devotion += 1;
					break;
				case "Trusting":
					r.push(`Hormonal effects make ${him} a bit more <span class="trust inc">trusting.</span>`);
					slave.trust += 1;
					break;
				case "MaleAttracted":
					r.push(`Dependence on the hormone-based aphrodisiacs makes ${him} become <span class="improvement">more attracted to men.</span>`);
					slave.attrXY += 3;
					break;
				case "FemaleAttracted":
					r.push(`Dependence on the hormone-based aphrodisiacs makes ${him} become <span class="improvement">more attracted to women.</span>`);
					slave.attrXX += 3;
					break;
				default:
					r.push(`ERROR: bad aphro addict effect: ${Effects}`);
			}
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function hormoneBalance(slave) {
		if (slave.diet === Diet.FEMALE) {
			slave.hormoneBalance += 4;
		} else if (slave.diet === Diet.FUTA) {
			if (slave.hormoneBalance > 0) {
				slave.hormoneBalance -= 8;
			} else if (slave.hormoneBalance < 0) {
				slave.hormoneBalance += 8;
			}
		} else if (slave.diet === Diet.MALE) {
			slave.hormoneBalance -= 4;
		}
		if (slave.drugs === Drug.FERTILITY) {
			slave.hormoneBalance += 4;
		} else if (slave.drugs === Drug.HORMONEFEMALE) {
			slave.hormoneBalance += 20;
		} else if (slave.drugs === Drug.HORMONEMALE) {
			slave.hormoneBalance -= 20;
		} else if (slave.drugs === Drug.GROWTESTICLE) {
			slave.hormoneBalance -= 4;
		} else if (slave.drugs === Drug.STEROID) {
			slave.hormoneBalance -= 4;
		} else if (slave.drugs === Drug.SUPERFERTILITY) {
			slave.hormoneBalance += 8;
		} else if (slave.drugs === Drug.HYPERTESTICLE) {
			slave.hormoneBalance -= 12;
		}
		if (slave.hormones === 1) {
			slave.hormoneBalance += 4;
		} else if (slave.hormones === 2) {
			slave.hormoneBalance += 12;
		} else if (slave.hormones === -1) {
			slave.hormoneBalance -= 4;
		} else if (slave.hormones === -2) {
			slave.hormoneBalance -= 12;
		}
		if (V.hormoneUpgradePower === 1) {
			if (slave.hormones === 1) {
				slave.hormoneBalance += 2;
			} else if (slave.hormones === 2) {
				slave.hormoneBalance += 6;
			} else if (slave.hormones === -1) {
				slave.hormoneBalance -= 2;
			} else if (slave.hormones === -2) {
				slave.hormoneBalance -= 6;
			}
		}
		if (slave.drugs === Drug.HORMONEENHANCE) {
			if (slave.hormones === 1) {
				slave.hormoneBalance += 4;
			} else if (slave.hormones === 2) {
				slave.hormoneBalance += 12;
			} else if (slave.hormones === -1) {
				slave.hormoneBalance -= 4;
			} else if (slave.hormones === -2) {
				slave.hormoneBalance -= 12;
			} else {
				slave.drugs = Drug.NONE;
				r.push(`${He} is not on hormones, so ${he} has been taken off hormone enhancers.`);
			}
			if (V.hormoneUpgradePower === 1) {
				if (slave.hormones === 1) {
					slave.hormoneBalance += 1;
				} else if (slave.hormones === 2) {
					slave.hormoneBalance += 3;
				} else if (slave.hormones === -1) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormones === -2) {
					slave.hormoneBalance -= 3;
				}
			}
		}
		/* NCS helps primary sexual maturity */
		if (slave.geneMods.NCS === 1) {
			if (slave.genes === GenderGenes.FEMALE && slave.hormoneBalance > 0 && slave.pubertyXX === 0) {
				slave.hormoneBalance = Math.clamp(slave.hormoneBalance * 1.5, -400, 400);
			} else if (slave.genes === GenderGenes.MALE && slave.hormoneBalance < 0 && slave.pubertyXY === 0) {
				slave.hormoneBalance = Math.clamp(slave.hormoneBalance * 1.5, -400, 400);
			} else if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX === 0) {
				slave.hormoneBalance += 20;
			} else if (slave.balls > 0 && slave.pubertyXY === 0) {
				slave.hormoneBalance -= 20;
			} else if (slave.genes === GenderGenes.FEMALE) {
				slave.hormoneBalance += 5;
			} else if (slave.genes === GenderGenes.MALE) {
				slave.hormoneBalance -= 5;
			}
		}
		/* androgyny really wants to sit around 0 and will fight changes to do so */
		if (slave.geneticQuirks.androgyny === 2) {
			if (slave.hormoneBalance > 6) {
				slave.hormoneBalance -= 10;
			} else if (slave.hormoneBalance < -6) {
				slave.hormoneBalance += 10;
			}
		}
		let supp = 0;
		if (slave.drugs !== Drug.HORMONEBLOCK) {
			r.push(App.SlaveAssignment.hormonesEffects(slave));
		} else if (slave.drugs === Drug.HORMONEBLOCK) {
			r.push(`The hormone blockers ${he} is on suppress ${his} hormones, natural or not.`);
			if (slave.energy > 20) {
				r.push(`${His} libido is similarly`);
				supp = 1;
				slave.energy--;
			}
			if (supp === 1) {
				if ((slave.attrXX !== 50 || slave.attrXY !== 50) && slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
					r.push(`<span class="stat drop">suppressed,</span> alongside what ${he} <span class="stat drop">finds sexually attractive.</span> Though that may not be a bad thing, should ${he} find a sex repulsive.`);
				} else {
					r.push(`<span class="stat drop">suppressed.</span>`);
				}
			} else if ((slave.attrXX !== 50 || slave.attrXY !== 50) && slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
				r.push(`${His} <span class="stat drop">sexual tastes are also suppressed by the drugs,</span> though that may not be a bad thing should ${he} find a sex repulsive.`);
			}
			if (slave.attrXX > 50) {
				slave.attrXX--;
			} else if (slave.attrXX < 50) {
				slave.attrXX++;
			}
			if (slave.attrXY > 50) {
				slave.attrXY--;
			} else if (slave.attrXY < 50) {
				slave.attrXY++;
			}
			if (slave.hormoneBalance > 0) {
				slave.hormoneBalance -= 5;
			} else if (slave.hormoneBalance < 0) {
				slave.hormoneBalance += 5;
			}
		}

		if (slave.genes === GenderGenes.FEMALE) {
			if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX > 0) {
				if (slave.balls > 0 && slave.ballType !== "sterile" && slave.pubertyXY > 0) {
					if (slave.hormoneBalance > 20) {
						slave.hormoneBalance -= Math.ceil((slave.hormoneBalance - 20) / 40);
					} else if (slave.hormoneBalance < 20) {
						slave.hormoneBalance += Math.ceil((20 - slave.hormoneBalance) / 40);
					}
				} else {
					if (slave.hormoneBalance > 60) {
						slave.hormoneBalance -= Math.ceil((slave.hormoneBalance - 60) / 40);
					} else if (slave.hormoneBalance < 60) {
						slave.hormoneBalance += Math.ceil((60 - slave.hormoneBalance) / 40);
					}
				}
			} else {
				if (slave.balls > 0 && slave.ballType !== "sterile" && slave.pubertyXY > 0) {
					if (slave.hormoneBalance > -20) {
						slave.hormoneBalance -= Math.ceil((slave.hormoneBalance + 20) / 40);
					} else if (slave.hormoneBalance < -20) {
						slave.hormoneBalance += Math.ceil((-20 - slave.hormoneBalance) / 40);
					}
				} else {
					if (slave.hormoneBalance > 20) {
						slave.hormoneBalance -= Math.ceil((slave.hormoneBalance - 20) / 40);
					} else if (slave.hormoneBalance < 20) {
						slave.hormoneBalance += Math.ceil((20 - slave.hormoneBalance) / 40);
					}
				}
			}
		} else if (slave.genes === GenderGenes.MALE) {
			if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX > 0) {
				if (slave.balls > 0 && slave.ballType !== "sterile" && slave.pubertyXY > 0) {
					if (slave.hormoneBalance > 20) {
						slave.hormoneBalance -= Math.ceil((slave.hormoneBalance - 20) / 40);
					} else if (slave.hormoneBalance < 20) {
						slave.hormoneBalance += Math.ceil((20 - slave.hormoneBalance) / 40);
					}
				} else {
					if (slave.hormoneBalance > 40) {
						slave.hormoneBalance -= Math.ceil((slave.hormoneBalance - 40) / 40);
					} else if (slave.hormoneBalance < 40) {
						slave.hormoneBalance += Math.ceil((40 - slave.hormoneBalance) / 40);
					}
				}
			} else {
				if (slave.balls > 0 && slave.ballType !== "sterile" && slave.pubertyXY > 0) {
					if (slave.hormoneBalance > -40) {
						slave.hormoneBalance -= Math.ceil((slave.hormoneBalance + 40) / 40);
					} else if (slave.hormoneBalance < -40) {
						slave.hormoneBalance += Math.ceil((-40 - slave.hormoneBalance) / 40);
					}
				} else {
					if (slave.hormoneBalance > 20) {
						slave.hormoneBalance -= Math.ceil((slave.hormoneBalance - 20) / 40);
					} else if (slave.hormoneBalance < 20) {
						slave.hormoneBalance += Math.ceil((20 - slave.hormoneBalance) / 40);
					}
				}
			}
		}
		slave.hormoneBalance = Math.clamp(slave.hormoneBalance, -500, 500);
		if (slave.geneticQuirks.galactorrhea === 2 && random(1, 100) < slave.hormoneBalance && slave.lactation === 0) {
			slave.inappropriateLactation = 1;
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function puberty(slave) {
		if (V.precociousPuberty === 1) {
			let earlyPubertyFlag = 0;
			let precocious = 0;
			if (slave.physicalAge < slave.pubertyAgeXX && (slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX === 0) { // Female type
				/* Just having NCS speeds precocious Puberty, but also hormonal puberty affects are
				* increased while secondary growth is suppressed
				*/
				if (slave.geneMods.NCS === 1) {
					precocious -= 0.8;
				}
				if (slave.diet === Diet.FEMALE || slave.diet === Diet.FUTA) {
					precocious -= 0.1;
				} else if (slave.diet === Diet.FERTILITY) {
					precocious -= 0.1;
				}
				if (slave.drugs === Drug.FERTILITY) {
					precocious -= 0.1;
				} else if (slave.drugs === Drug.HORMONEFEMALE) {
					precocious -= 1;
				} else if (slave.drugs === Drug.HORMONEMALE) {
					precocious += 1;
				} else if (slave.drugs === Drug.GROWTESTICLE) {
					precocious += 0.1;
				} else if (slave.drugs === Drug.STEROID) {
					precocious += 0.2;
					if (boobSize(slave) > 100 && random(1, 100) < 30 / gigantomastiaMod && gigantomastiaMod !== 3) {
						if (slave.geneMods.NCS === 1 && boobSize(slave) > 300 && random(1, 100) > 25 * gigantomastiaMod) {
							r.push(`Hormonal effects work with ${his} <span class="ncs">NCS</span> and cause <span class="change negative">${his} tits to shrink down.</span>`);
							slave.boobs -= 50 / gigantomastiaMod;
							slave.energy += 1;
						} else {
							r.push(`${He} feels an <span class="change negative">unusual calmness</span> in ${his} belly and breasts.`);
						}
						slave.boobs -= 50 / gigantomastiaMod;
					}
					if (slave.geneMods.NCS === 0) {
						if (slave.clit < 2 && slave.vagina !== -1 && slave.dick === 0 && random(1, 100) < 10) {
							r.push(`${He} feels <span class="change positive">unusual warmness</span> in ${his} clitoris.`);
							slave.clit += 1;
						}
					}
				} else if (slave.drugs === Drug.SUPERFERTILITY) {
					precocious -= 0.5;
					if (slave.geneMods.NCS === 0) {
						r.push(`${He} feels an <span class="change positive">unusual warm feeling</span> in ${his} belly and breasts.`);
						if (boobSize(slave) < 400 * gigantomastiaMod && random(1, 100) < 30) {
							r.push(`${His} breasts feel <span class="change positive">heavy, hot and sensitive.</span>`);
							slave.boobs += 50;
							if (random(1, 100) < 10 && slave.boobShape !== BreastShape.PERKY && slave.boobShape !== BreastShape.SPHERICAL && slave.breastMesh !== 1) {
								slave.boobShape = BreastShape.PERKY;
							}
						}
						if (slave.hips < 2 && random(1, 100) < 10 * uterineHypersensitivityMod) {
							r.push(`${He} feels <span class="change positive">strange minor pains</span> in ${his} pelvis.`);
							slave.hips += 1;
						}
						if (slave.butt < 4 && random(1, 100) < 10 + (5 * rearQuirk)) {
							r.push(`${He} feels a <span class="change positive">strange weight</span> on ${his} rear.`);
							slave.butt += 1;
						}
						if (slave.labia < 2 && slave.vagina !== -1 && random(1, 100) < 10) {
							r.push(`${He} feels an <span class="change positive">unusual tenderness</span> in ${his} labia.`);
							slave.labia += 1;
						}
					}
				} else if (slave.drugs === Drug.HYPERTESTICLE) {
					precocious += .5;
				}
				if (slave.hormones === 1) {
					precocious -= 0.1;
				} else if (slave.hormones === 2) {
					precocious -= 0.2;
				} else if (slave.hormones === -1) {
					precocious += 0.2;
				} else if (slave.hormones === -2) {
					precocious += 0.4;
				}
				if (slave.drugs === Drug.HORMONEENHANCE) {
					if (slave.hormones === 1) {
						precocious -= 0.1;
					} else if (slave.hormones === 2) {
						precocious -= 0.2;
					} else if (slave.hormones === -1) {
						precocious += 0.1;
					} else if (slave.hormones === -2) {
						precocious += 0.2;
					}
				} else if (slave.drugs === Drug.HORMONEBLOCK) {
					precocious += 1;
				}
				if (slave.geneticQuirks.neoteny >= 2) {
					precocious += 0.1;
				}
				if (slave.geneMods.NCS === 1) {
					precocious *= 2;
				}
				if (slave.geneticQuirks.progeria === 2) {
					precocious -= 10;
				}
				slave.pubertyAgeXX += precocious;
				if (slave.physicalAge < slave.pubertyAgeXX && slave.physicalAge > slave.pubertyAgeXX - 3 && slave.pubertyAgeXX < V.fertilityAge) {
					if (slave.geneMods.NCS === 0) {
						r.push(`${His} body is showing signs of <span class="puberty">early puberty.</span>`);
					} else {
						r.push(`A routine scan confirms that ${his} body is advancing towards <span class="puberty">early puberty,</span> despite not really showing signs of secondary sexual characteristics.`);
					}
					earlyPubertyFlag = 1;
				}
			}
			if (slave.physicalAge < slave.pubertyAgeXY && slave.balls >= 1 && slave.pubertyXY === 0) { // Male type
				precocious = 0;
				/* Just having NCS speeds precocious Puberty, but also hormonal puberty affects are increased while secondary growth is suppressed */
				if (slave.geneMods.NCS === 1) {
					precocious -= 0.8;
				}
				if (slave.diet === Diet.MALE || slave.diet === Diet.FUTA) {
					precocious -= 0.1;
				}
				if (slave.drugs === Drug.FERTILITY) {
					precocious += 0.2;
				} else if (slave.drugs === Drug.HORMONEFEMALE) {
					precocious += 1;
				} else if (slave.drugs === Drug.HORMONEMALE) {
					precocious -= 1;
				} else if (slave.drugs === Drug.GROWTESTICLE) {
					precocious -= 0.1;
				} else if (slave.drugs === Drug.STEROID) {
					precocious -= 0.2;
				} else if (slave.drugs === Drug.HYPERTESTICLE) {
					precocious -= 0.5;
					if (slave.geneMods.NCS === 0) {
						r.push(`${He} feels an <span class="change positive">unusual warm feeling</span> in ${his} groin.`);
						if (slave.dick.isBetween(0, 4) && random(1, 100) < 30) {
							r.push(`${His} penis feels <span class="change positive">heavy, hot and oversensitive.</span>`);
							slave.dick += 1;
						}
						if (slave.balls < 4 && random(1, 100) < 30) {
							r.push(`${His} balls feel <span class="change positive">heavy, full and oversensitive.</span>`);
							slave.balls += 1;
						}
					}
				} else if (slave.drugs === Drug.SUPERFERTILITY) {
					precocious -= 1;
					if (slave.geneMods.NCS === 0) {
						r.push(`${He} feels <span class="change positive">unusual warm feeling</span> in ${his} breasts.`);
						if (boobSize(slave) < 400 * gigantomastiaMod && random(1, 100) < 30 && gigantomastiaMod !== 3) {
							r.push(`${His} chest feels <span class="change positive">hot and sensitive.</span>`);
							slave.boobs += 50;
							if (random(1, 100) < 10 && slave.boobShape !== BreastShape.PERKY && slave.boobShape !== BreastShape.SPHERICAL && slave.breastMesh !== 1) {
								slave.boobShape = BreastShape.PERKY;
							}
						}
						if (slave.hips < 2 && random(1, 100) < 10 * uterineHypersensitivityMod) {
							r.push(`${He} feels <span class="change positive">strange minor pains</span> in ${his} pelvis.`);
							slave.hips += 1;
						}
						if (slave.butt < 4 && random(1, 100) < 10 + (5 * rearQuirk)) {
							r.push(`${He} feels a <span class="change positive">strange weight</span> to ${his} rear.`);
							slave.butt += 1;
						}
					}
					if (slave.dick > 1 && random(1, 100) < 30) {
						if (slave.geneMods.NCS === 1 && slave.dick > 2 && random(1, 100) > 25) {
							r.push(`Hormonal effects work with ${his} <span class="ncs">NCS</span> and cause <span class="change negative">${his} dick to shrink.</span>`);
							slave.dick -= 1;
						} else {
							r.push(`${He} feels an <span class="change negative">unusual lightness</span> in ${his} penis.`);
						}
						slave.dick -= 1;
					}
					if (slave.balls > 1 && random(1, 100) < 30) {
						if (slave.geneMods.NCS === 1 && slave.balls > 2 && random(1, 100) > 25) {
							r.push(`Hormonal effects work with ${his} <span class="ncs">NCS</span> and cause <span class="change negative">${his} balls to shrink.</span>`);
							slave.balls -= 1;
						} else {
							r.push(`${He} feels an <span class="change negative">unusual emptiness</span> to ${his} scrotum.`);
						}
						slave.balls -= 1;
					}
				}
				if (slave.hormones === 1) {
					precocious += 0.2;
				} else if (slave.hormones === 2) {
					precocious += 0.4;
				} else if (slave.hormones === -1) {
					precocious -= 0.1;
				} else if (slave.hormones === -2) {
					precocious -= 0.2;
				}
				if (slave.drugs === Drug.HORMONEENHANCE) {
					if (slave.hormones === 1) {
						precocious += 0.1;
					} else if (slave.hormones === 2) {
						precocious += 0.2;
					} else if (slave.hormones === -1) {
						precocious -= 0.1;
					} else if (slave.hormones === -2) {
						precocious -= 0.2;
					}
				} else if (slave.drugs === Drug.HORMONEBLOCK) {
					precocious += 1;
				}
				if (slave.geneticQuirks.neoteny >= 2) {
					precocious += 0.1;
				}
				if (slave.geneMods.NCS === 1) {
					precocious *= 2;
				}
				if (slave.geneticQuirks.progeria === 2) {
					precocious -= 10;
				}
				slave.pubertyAgeXY += precocious;
				if (slave.physicalAge < slave.pubertyAgeXY && slave.physicalAge > slave.pubertyAgeXY - 3 && slave.pubertyAgeXY < V.potencyAge && earlyPubertyFlag !== 1) {
					if (slave.geneMods.NCS === 0) {
						r.push(`${His} body is showing signs of <span class="puberty">early puberty.</span>`);
					} else {
						r.push(`A routine scan confirms that ${his} body is advancing towards <span class="puberty">early puberty,</span> despite not really showing signs of secondary sexual characteristics.`);
					}
				}
			}
		}
		/* puberty - not announced for allowing surprise pregnancy */
		if (slave.ovaries === 1 || slave.mpreg === 1) {
			if (slave.pubertyXX === 0) {
				if (slave.physicalAge >= slave.pubertyAgeXX) {
					slave.pubertyXX = 1;
					if (slave.geneticQuirks.gigantomastia === 3 && random(1, 100) < slave.hormoneBalance) {
						slave.geneticQuirks.gigantomastia = 2;
					}
					if (slave.geneticQuirks.macromastia === 3 && random(1, 100) < slave.hormoneBalance) {
						slave.geneticQuirks.macromastia = 2;
					}
					if (slave.geneticQuirks.galactorrhea === 3) {
						slave.geneticQuirks.galactorrhea = 2;
						if (random(1, 100) < slave.hormoneBalance && slave.lactation === 0) {
							slave.inappropriateLactation = 1;
						}
					}
				}
			}
		}
		if (slave.balls > 0 && slave.ballType !== "sterile") {
			if (slave.pubertyXY === 0) {
				if (slave.physicalAge >= slave.pubertyAgeXY) {
					slave.pubertyXY = 1;
					if (slave.geneticQuirks.galactorrhea === 3) {
						slave.geneticQuirks.galactorrhea = 2;
						if (random(1, 100) < slave.hormoneBalance && slave.lactation === 0) {
							slave.inappropriateLactation = 1;
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function inflationEffects(slave) {
		if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
			r.push(`${He} has trouble keeping ${himself} full of`);
			switch (slave.inflationType) {
				case InflationLiquid.CUM:
				case InflationLiquid.FOOD:
				case InflationLiquid.MILK:
				case InflationLiquid.URINE:
				case InflationLiquid.WATER:
					r.push(slave.inflationType);
					break;
				default:
					r.push(`${slave.inflationType}s`);
			}
			r.push(`with the weight of the fake belly resting on ${his} swollen stomach, forcing it to be removed.`);
			slave.bellyAccessory = "none";
		}
		if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
			if (slave.bellyFluid >= 10000) {
				if (slave.fetish !== Fetish.MASOCHIST && slave.sexualFlaw !== SexualFlaw.SELFHATING) {
					r.push(`Being so distended with fluids is <span class="devotion dec">very uncomfortable</span> to ${him}.`);
					slave.devotion -= 3;
				}
				if (slave.fetish === Fetish.NONE && fetishChangeChance(slave) > random(0, 100)) {
					r.push(`Having such a round, heavy belly leads ${him} to <span class="fetish gain">begin fantasizing about being pregnant.</span>`);
					slave.fetish = Fetish.PREGNANCY;
					slave.fetishStrength = 10;
					slave.fetishKnown = 1;
				}
			} else if (slave.bellyFluid >= 1500) {
				if (slave.fetish === Fetish.HUMILIATION) {
					r.push(`Having to ${canWalk(slave) ? `walk` : `lounge`} around with a belly full of`);
					switch (slave.inflationType) {
						case InflationLiquid.CUM:
						case InflationLiquid.FOOD:
						case InflationLiquid.MILK:
						case InflationLiquid.URINE:
						case InflationLiquid.WATER:
							r.push(slave.inflationType);
							break;
						default:
							r.push(`${slave.inflationType}s`);
					}
					r.push(`is completely humiliating, and`);
					if (slave.fetishKnown === 0) {
						r.push(`${he} revels in the attention. <span class="fetish gain">${He}'s a humiliation fetishist!</span>`);
						slave.fetishKnown = 1;
					} else {
						r.push(`${he} <span class="devotion inc">loves it.</span>`);
						slave.devotion += 2;
						if (slave.fetishStrength < 100) {
							r.push(`Every eye on ${his} swollen stomach <span class="fetish inc">strengthens ${his} fetish</span> further.`);
							slave.fetishStrength++;
						}
					}
				} else {
					r.push(`Having to ${canWalk(slave) ? `walk` : `lounge`} around with a belly full of`);
					switch (slave.inflationType) {
						case InflationLiquid.CUM:
						case InflationLiquid.FOOD:
						case InflationLiquid.MILK:
						case InflationLiquid.URINE:
						case InflationLiquid.WATER:
							r.push(slave.inflationType);
							break;
						default:
							r.push(`${slave.inflationType}s`);
					}
					r.push(`is <span class="devotion dec">completely humiliating.</span>`);
					slave.devotion -= 2;
					if (fetishChangeChance(slave) > random(0, 100)) {
						r.push(`However, all the eyes on ${him} and ${his} jiggling middle <span class="fetish gain">makes ${him} begin to crave humiliation.</span>`);
						slave.fetish = Fetish.HUMILIATION;
						slave.fetishStrength = 10;
						slave.fetishKnown = 1;
					}
				}
			}
			const seed = random(1, 100);
			switch (slave.inflationType) {
				case InflationLiquid.CUM:
				case InflationLiquid.MILK:
					if (slave.behavioralFlaw === BehavioralFlaw.NONE && slave.behavioralQuirk === BehavioralQuirk.NONE && seed > 70) {
						r.push(`Filling ${his} guts with ${slave.inflationType} all week <span class="flaw gain">drives ${him} to gluttony.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.GLUTTONOUS;
					} else if (slave.behavioralFlaw === BehavioralFlaw.NONE && slave.behavioralQuirk === BehavioralQuirk.NONE && seed > 40) {
						if (slave.inflationType === InflationLiquid.CUM && slave.fetish === Fetish.CUMSLUT) {
							// cumsluts don't do this
						} else {
							r.push(`Filling ${his} guts with ${slave.inflationType} all week <span class="flaw gain">drives ${him} to hate eating and food.</span>`);
							slave.behavioralFlaw = BehavioralFlaw.ANOREXIC;
						}
					}
					break;
				case InflationLiquid.FOOD:
					if (slave.behavioralFlaw === BehavioralFlaw.NONE && slave.behavioralQuirk !== BehavioralQuirk.FITNESS && seed > 70) {
						r.push(`Stuffing ${his} face with food all week <span class="flaw gain">drives ${him} to gluttony.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.GLUTTONOUS;
					} else if (slave.behavioralFlaw === BehavioralFlaw.NONE && slave.behavioralQuirk !== BehavioralQuirk.FITNESS && seed > 40) {
						r.push(`Stuffing ${his} face with food all week <span class="flaw gain">drives ${him} to hate eating.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.ANOREXIC;
					}
					break;
			}
		}

		if (slave.bellyFluid >= 10000 && V.seeExtreme === 1 && slave.health.health <= -100 && slave.geneMods.rapidCellGrowth !== 1) {
			r.push(`${He} feels an <span class="health dec">unusual intense pain</span> in ${his} bloated belly.`);
			burst(slave);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function bellySagging(slave) {
		if (slave.belly >= 1000000) {
			if (slave.bellySag < 50) {
				slave.bellySag += 1;
				if (slave.preg > 0) {
					slave.bellySagPreg += 1;
				}
			} else if (slave.preg > 0 && slave.bellySagPreg < 50) {
				slave.bellySagPreg += 1;
			}
			if (slave.pregControl === GestationDrug.FAST) {
				slave.bellySag += 5;
				slave.bellySagPreg += 5;
			}
			if (slave.geneMods.rapidCellGrowth === 1) {
				slave.bellySag += 3;
				if (slave.preg > 0) {
					slave.bellySagPreg += 3;
				}
			}
		} else if (slave.belly >= 750000) {
			if (slave.bellySag < 30) {
				slave.bellySag += 0.7;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.7;
				}
			} else if (slave.preg > 0 && slave.bellySagPreg < 30) {
				slave.bellySagPreg += 0.7;
			}
			if (slave.pregControl === GestationDrug.FAST) {
				slave.bellySag += 2;
				slave.bellySagPreg += 2;
			}
			if (slave.geneMods.rapidCellGrowth === 1) {
				slave.bellySag += 1;
				if (slave.preg > 0) {
					slave.bellySagPreg += 1;
				}
			}
		} else if (slave.belly >= 600000) {
			if (slave.bellySag < 20) {
				slave.bellySag += 0.5;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.5;
				}
			} else if (slave.preg > 0 && slave.bellySagPreg < 20) {
				slave.bellySagPreg += 0.5;
			}
			if (slave.pregControl === GestationDrug.FAST) {
				slave.bellySag += 1;
				slave.bellySagPreg += 1;
			}
			if (slave.geneMods.rapidCellGrowth === 1) {
				slave.bellySag += 1;
				if (slave.preg > 0) {
					slave.bellySagPreg += 1;
				}
			}
		} else if (slave.belly >= 450000) {
			if (slave.bellySag < 15) {
				slave.bellySag += 0.4;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.4;
				}
			} else if (slave.preg > 0 && slave.bellySagPreg < 15) {
				slave.bellySagPreg += 0.4;
			}
			if (slave.pregControl === GestationDrug.FAST) {
				slave.bellySag += 0.6;
				slave.bellySagPreg += 0.6;
			}
			if (slave.geneMods.rapidCellGrowth === 1) {
				slave.bellySag += 0.5;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.5;
				}
			}
		} else if (slave.belly >= 300000) {
			if (slave.bellySag < 10) {
				slave.bellySag += 0.3;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.3;
				}
			} else if (slave.preg > 0 && slave.bellySagPreg < 10) {
				slave.bellySagPreg += 0.3;
			}
			if (slave.pregControl === GestationDrug.FAST) {
				slave.bellySag += 0.5;
				slave.bellySagPreg += 0.5;
			}
			if (slave.geneMods.rapidCellGrowth === 1) {
				slave.bellySag += 0.5;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.5;
				}
			}
		} else if (slave.belly >= 100000) {
			if (slave.bellySag < 10) {
				slave.bellySag += 0.2;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.2;
				}
			} else if (slave.preg > 0 && slave.bellySagPreg < 10) {
				slave.bellySagPreg += 0.2;
			}
			if (slave.pregControl === GestationDrug.FAST) {
				slave.bellySag += 0.3;
				slave.bellySagPreg += 0.3;
			}
			if (slave.geneMods.rapidCellGrowth === 1) {
				slave.bellySag += 0.3;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.3;
				}
			}
		} else if (slave.bellyPreg >= 10000 || slave.bellyImplant >= 10000) {
			if (slave.bellySag < 5) {
				slave.bellySag += 0.1;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.1;
				}
			} else if (slave.preg > 0 && slave.bellySagPreg < 5) {
				slave.bellySagPreg += 0.1;
			}
			if (slave.pregControl === GestationDrug.FAST) {
				slave.bellySag += 0.2;
				slave.bellySagPreg += 0.2;
			}
			if (slave.geneMods.rapidCellGrowth === 1) {
				slave.bellySag += 0.2;
				if (slave.preg > 0) {
					slave.bellySagPreg += 0.2;
				}
			}
		}
		if (slave.bellySagPreg > slave.bellySag) {
			slave.bellySagPreg = slave.bellySag;
		}

		if (slave.bellySag > 0 && slave.belly < 1500 && slave.geneMods.rapidCellGrowth !== 1) {
			if (slave.muscles > 95) {
				if (random(1, 100) > 1) {
					r.push(`${His} stretched, extreme muscles <span class="change positive">firm up readily</span> after`);
					if (slave.bellySagPreg > 0) {
						r.push(`${his} pregnancy.`);
						slave.bellySag -= 0.5;
						slave.bellySagPreg -= 0.5;
						if (slave.bellySag < 0) {
							slave.bellySag = 0;
							slave.bellySagPreg = 0;
						}
					} else {
						r.push(`being heavily distended for so long.`);
						slave.bellySag -= 0.5;
						if (slave.bellySag < 0) {
							slave.bellySag = 0;
						}
					}
				}
			} else if (slave.muscles >= 30) {
				if (random(1, 100) > 20) {
					r.push(`${His} stretched, muscular belly <span class="change positive">firms up</span> after`);
					if (slave.bellySagPreg > 0) {
						r.push(`${his} pregnancy.`);
						slave.bellySag -= 0.4;
						slave.bellySagPreg -= 0.4;
						if (slave.bellySag < 0) {
							slave.bellySag = 0;
							slave.bellySagPreg = 0;
						}
					} else {
						r.push(`being heavily distended for so long.`);
						slave.bellySag -= 0.4;
						if (slave.bellySag < 0) {
							slave.bellySag = 0;
						}
					}
				}
			} else if (slave.muscles >= 5) {
				if (random(1, 100) > 40) {
					r.push(`${His} stretched, toned belly <span class="change positive">firms up</span> after`);
					if (slave.bellySagPreg > 0) {
						r.push(`${his} pregnancy.`);
						slave.bellySag -= 0.3;
						slave.bellySagPreg -= 0.3;
						if (slave.bellySag < 0) {
							slave.bellySag = 0;
							slave.bellySagPreg = 0;
						}
					} else {
						r.push(`being heavily distended for so long.`);
						slave.bellySag -= 0.3;
						if (slave.bellySag < 0) {
							slave.bellySag = 0;
						}
					}
				}
			} else {
				if (random(1, 100) > 60) {
					r.push(`${His} belly <span class="change positive">regains some firmness</span> after`);
					if (slave.bellySagPreg > 0) {
						r.push(`${his} pregnancy.`);
						slave.bellySag -= 0.2;
						slave.bellySagPreg -= 0.2;
						if (slave.bellySag < 0) {
							slave.bellySag = 0;
							slave.bellySagPreg = 0;
						}
					} else {
						r.push(`being heavily distended for so long.`);
						slave.bellySag -= 0.2;
						if (slave.bellySag < 0) {
							slave.bellySag = 0;
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function bellyImplantStuff(slave) {
		if (slave.bellyImplant >= 5000) {
			if (slave.fuckdoll === 0) {
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if ((slave.fetish === Fetish.NONE || slave.fetishStrength <= 10) && slave.devotion > 20 && random(1, 100) > 85) {
						r.push(`Having an implant simulating pregnancy drives ${him} to <span class="fetish gain">begin fantasizing about being actually pregnant.</span>`);
						slave.fetish = Fetish.PREGNANCY;
						slave.fetishStrength = 10;
						slave.fetishKnown = 1;
					}
				}
			}
		} else if (slave.bellyImplant >= 1500) {
			if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
				r.push(`${His} implant rounded belly renders ${his} fake one moot.`);
				slave.bellyAccessory = "none";
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mindbreak(slave) {
		if (slave.trust < -95) {
			if (slave.devotion < -50) {
				if (V.week - slave.weekAcquired > 9) {
					if (slave.fuckdoll > 50) {
						r.push(`Denied all stimulation other than sexual use for longer than a human mind can bear, <span class="mindbreak">${he} has been irretrievably broken.</span>`);
						applyMindbroken(slave);
					} else if (!getPersonalAttention(slave.ID, "torture") || App.EndWeek.saVars.slaveTortured === "none") {  // exception handled in personalAttention
						if (random(1, 5) === 1) {
							r.push(`${He} has been used as a sexual slave for so long, and is so hopeless that ${his} future as a slave will be anything but torment, that ${his} mind finally slips. <span class="mindbreak">${He} has been irretrievably broken.</span>`);
							applyMindbroken(slave);
						} else {
							r.push(`${He}'s so unhappy and terrified that the effects of the extreme stress on ${his} mind and body are unpredictable. This week,`);
							switch (random(1, 4)) {
								case 1:
									r.push(`<span class="devotion dec">${his} hatred of sexual slavery was self-reinforcing.</span>`);
									slave.devotion -= 5;
									break;
								case 2:
									r.push(`<span class="health dec">${his} mental state was bad for ${his} health.</span>`);
									healthDamage(slave, 5);
									break;
								case 3:
									r.push(`<span class="change negative">${his} face grew a little more haggard.</span>`);
									slave.face -= 2;
									break;
								default:
									r.push(`${he} managed to bear it without lasting harm.`);
							}
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mentalTension(slave) {
		const pcTraining = V.personalAttention.task === PersonalAttention.TRAINING && !onBedRest(V.PC, true);
		const attentionObjective = V.personalAttention.slaves?.find((s) => s.ID === slave.ID)?.objective;

		if (slave.behavioralFlaw === BehavioralFlaw.NONE) {
			if (slave.trust < -20 && slave.devotion <= 50) {
				if (random(1, 100) > 100 + slave.trust) {
					const effect = random(1, 4);
					r.push(`Being so afraid so constantly drives ${him} to find solace in`);
					if (pcTraining && ["build devotion", "health", "soften behavioral flaw", "soften sexual flaw", "learn skills"].includes(attentionObjective)) {
						r.push(`your attention. Relying on you for <span class="devotion inc">emotional support</span> strengthens ${his} <span class="trust inc">bond</span> with ${getWrittenTitle(slave)}.`);
						slave.devotion++;
						slave.trust++;
					} else if (effect === 1) {
						r.push(`self-denial. <span class="flaw gain">${He} has developed anorexia.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.ANOREXIC;
					} else if (effect === 2) {
						r.push(`stress eating. <span class="flaw gain">${He}'s now a nervous glutton.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.GLUTTONOUS;
					} else if (effect === 3) {
						r.push(`the scraps of prayer and superstition ${he} can remember from ${his} life before ${he} was a slave. <span class="flaw gain">${He}'s now religious.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.DEVOUT;
					} else {
						r.push(`the remnants of modern philosophy and education ${he} can remember from ${his} life before ${he} was a slave. <span class="flaw gain">${He} feels mentally liberated.</span>`);
						slave.behavioralFlaw = BehavioralFlaw.LIBERATED;
					}
				}
			}
		}
		if (slave.sexualFlaw === SexualFlaw.NONE) {
			if (slave.devotion < -20) {
				if (random(1, 500) > 500 + slave.devotion) {
					const effect = random(1, 6);
					r.push(`Being so angry at ${his} life as a sex slave has`);
					if (pcTraining && ["build devotion", "health", "soften behavioral flaw", "soften sexual flaw", "learn skills"].includes(attentionObjective)) {
						r.push(`forced ${him} to face ${his} problems with you. Lending ${him} support makes it <span class="devotion inc">a little more tolerable.</span>`);
						slave.devotion++;
					} else if (effect === 1) {
						r.push(`driven ${him} into <span class="flaw gain">sexual apathy.</span>`);
						slave.sexualFlaw = SexualFlaw.APATHETIC;
					} else if (effect === 2) {
						r.push(`convinced ${him} that the conservative parts of ${his} upbringing were right: sex is evil. <span class="flaw gain">${He}'s now repressed.</span>`);
						slave.sexualFlaw = SexualFlaw.REPRESSED;
					} else if (effect === 3) {
						r.push(`given ${him} a dread of being nude. <span class="flaw gain">${He}'s now shamefast.</span>`);
						slave.sexualFlaw = SexualFlaw.SHAMEFAST;
					} else if (effect === 4) {
						r.push(`deprived ${him} of any motivation to keep sex appealing or even clean. <span class="flaw gain">${He}'s now crude.</span>`);
						slave.sexualFlaw = SexualFlaw.CRUDE;
					} else if (effect === 5) {
						r.push(`driven ${him} to find refuge in high standards. <span class="flaw gain">${He}'s now judgemental.</span>`);
						slave.sexualFlaw = SexualFlaw.JUDGEMENT;
					} else {
						r.push(`convinced ${him} that sex is only this way here. Convinced that sexual slavery is wrong, <span class="flaw gain">${He}'s become sexually idealistic.</span>`);
						slave.sexualFlaw = SexualFlaw.IDEAL;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function noTalkingFixesFlaws(slave) {
		if (slave.behavioralFlaw === BehavioralFlaw.BITCHY) {
			r.push(`If ${he} has anything bitchy to say, <span class="green">no one can tell,</span> since ${he} can't talk.`);
		}
		if (slave.behavioralQuirk === BehavioralQuirk.CUTTING) {
			r.push(`If ${he} has anything witty to say, <span class="red">no one can tell,</span> since ${he} can't talk.`);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function breedingMark(slave) {
		if (slave.devotion < -20) {
			r.push(`${He} views the mark of the Societal Elite <span class="devotion dec">with disgust</span> as it brands ${him} as nothing more than your breeding bitch.`);
			slave.devotion -= 10;
		} else if (slave.devotion <= 50) {
			r.push(`${He} bears the mark of the Societal Elite as a sign of ${his} superiority. As such, ${he} <span class="devotion dec">behaves like a spoiled child</span> and tries to have everything ${his} way.`);
			slave.devotion -= 5;
			if (slave.behavioralFlaw === BehavioralFlaw.NONE && slave.behavioralQuirk !== BehavioralQuirk.CONFIDENT) {
				r.push(`${He} has become <span class="flaw gain">quite arrogant.</span>`);
				slave.behavioralFlaw = BehavioralFlaw.ARROGANT;
			}
		} else {
			r.push(`${He} bears the mark of the Societal Elite <span class="devotion inc">with pride.</span> It signals that ${he} is yours, and yours alone, drawing ${him} ever closer to ${his} beloved ${getWrittenTitle(slave)}.`);
			slave.devotion += 10;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function solidSlaveFoodEffects(slave) {
		if (FutureSocieties.isActive('FSHedonisticDecadence')) {
			if (V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
				if (!FutureSocieties.isActive('FSDegradationist')) {
					if (slave.onDiet !== 1) {
						if (!canTaste(slave)) {
							r.push(`${His} lack of a sense of taste makes ${him} essentially immune to the addictive slave treats, as ${he} can't be enticed by their delicious taste.`);
						} else if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
							r.push(`${He} can't stop ${himself} from eating the <span class="devotion inc">addictive, delicious</span> slave treats available throughout the arcology. ${He} knows they are fattening and <span class="trust dec">starts obsessing</span> even more about ${his} weight, appearance and how others view ${him}.`);
							slave.trust -= 3;
							if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
								slave.weight++;
							}
							slave.devotion++;
						} else if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
							r.push(`${He} hates the availability of the tasty slave treats and how they tempt ${him} away from a fit lifestyle, but often <span class="devotion inc">finds ${himself} absentmindedly snacking on them.</span>`);
							if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
								r.push(`The more ${his} <span class="change positive">waistline grows,</span> the <span class="trust dec">less ${he} finds ${himself} trusting you.</span>`);
								slave.trust--;
								slave.devotion++;
								slave.weight++;
							} else {
								r.push(`${He} finds that no matter how many ${he} eats, ${he} never gains weight, a detail ${he} is <span class="trust inc">thankful</span> for.`);
								slave.trust++;
								slave.devotion++;
							}
						} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
							r.push(`${He} <span class="devotion inc">loves</span> the availability of the tasty slave treats and how ${he} can keep ${his} mouth filled at <span class="devotion inc">nearly all times.</span>`);
							if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
								r.push(`Since ${his} belly is always full thanks to your food supplies, ${he} <span class="trust inc">trusts you to keep ${him} sated,</span> though ${his} constant gorging has a <span class="change positive">huge impact on ${his} waistline.</span>`);
								slave.trust++;
								slave.devotion += 3;
								slave.weight += 3;
							} else {
								r.push(`Since ${his} belly is always full thanks to your food supplies, ${he} <span class="trust inc">trusts you to keep ${him} sated.</span> Since the food is fat free, ${his} waistline is spared ${his} bad habits.`);
								slave.trust++;
								slave.devotion += 3;
							}
						} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
							r.push(`${He} hates the availability of the tasty slave treats and how ${he} <span class="devotion inc">can't stop eating them.</span>`);
							if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
								r.push(`The <span class="change positive">more ${his} waistline grows,</span> the <span class="trust dec">more horrifying ${his} body becomes to ${him}.</span>`);
								slave.trust -= 5;
								slave.devotion++;
								slave.weight++;
							} else {
								r.push(`${He} finds that no matter how many ${he} eats, ${he} never gains weight, a detail ${he} is <span class="trust inc">thankful</span> for, even if ${he} is disgusted by ${his} actions.`);
								slave.trust++;
								slave.devotion++;
							}
						} else {
							r.push(`${He} <span class="devotion inc">loves</span> the availability of the tasty slave treats and <span class="trust inc">trusts you more</span> for having them so accessible.`);
							if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
								r.push(`${He} is so distracted by the luxury that ${he} doesn't notice the <span class="change positive">weight ${he} is gaining.</span>`);
								slave.weight++;
							}
							slave.trust++;
							slave.devotion++;
						}
					} else {
						// no treats for you
						if (!canTaste(slave)) {
							r.push(`${He} lacks permission to eat the slave treats, which ${he} has no real opinion over, as ${he} lacks the sense to taste them anyway.`);
						} else if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
							r.push(`${He} is <span class="trust inc">relieved</span> ${he} doesn't have to fret over eating the treats and gaining weight as ${his} ${getWrittenTitle(slave)} is carefully directing ${him}.`);
							slave.trust++;
						} else if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
							r.push(`${He} is <span class="trust inc">thankful</span> that ${he} isn't permitted to eat the treats. ${He}'s seen others try one, only to start shoveling them down.`);
							slave.trust++;
						} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
							r.push(`${He} <span class="devotion dec">resents</span> not being allowed to stuff ${his} face with the tempting treats like the other slaves ${he} sees.`);
							slave.devotion -= 2;
						} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
							r.push(`${He} <span class="devotion inc">is relieved</span> that ${he} doesn't have to eat the treats and is <span class="trust inc">thankful</span> for your apparent consideration.`);
							slave.trust++;
							slave.devotion += 2;
						} else {
							r.push(`${He}`);
							if (canSee(slave)) {
								r.push(`sees`);
							} else {
								r.push(`knows`);
							}
							r.push(`how much the other slaves enjoy the delicious treats and <span class="devotion dec">resents</span> not being allowed to enjoy them, feeling you are doing this to <span class="trust dec">spite ${him}.</span>`);
							slave.devotion--;
							slave.trust--;
						}
					}
				} else {
					if (slave.onDiet !== 1) {
						r.push(`The treats are designed to cause stomach cramps alongside being extremely addictive. ${He} cannot stop ${himself} from eating them, but ${he} can <span class="trust dec">fear</span> your cruelty as ${his} <span class="devotion inc">will steadily erodes</span> from the concentrated aphrodisiacs in ${his} food.`);
						slave.devotion += 2;
						slave.trust -= 3;
					} else {
						r.push(`The treats are designed to cause stomach cramps alongside being extremely addictive. Since ${he} is not permitted to eat them, <span class="trust inc">${he} breathes a sigh of relief,</span> though ${he} is fully aware of what happens to those not as fortunate as ${him}. ${He} <span class="devotion inc">tries ${his} best to be obedient</span> hoping to not undergo the agony, but ${his} efforts pale in comparison to the effects of the food-based aphrodisiacs.`);
						slave.devotion++;
						slave.trust++;
					}
				}
			} else {
				if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
					r.push(`Watching citizens sculpt their slaves to their ideals fills ${him} with <span class="trust inc">relief</span> that someone will find ${him} attractive; that or make ${him} so.`);
					slave.trust++;
				} else if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
					r.push(`Watching both citizens and other slaves lie around and shirk exercise disappoints ${him}. ${He} <span class="trust dec">fears</span> that ${he}'ll be prevented from exercising and grow soft too.`);
					slave.trust -= 2;
				} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
					r.push(`Being part of a society that welcomes gluttony makes ${him} <span class="trust inc">feel right at home.</span>`);
					slave.trust += 2;
				} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
					r.push(`${He} feels fat just watching your society gorge itself. ${He} <span class="trust dec">fears</span> that ${he}'ll be a bloated hog soon too.`);
					slave.trust -= 5;
				}
			}
		} else if (V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
			if (!FutureSocieties.isActive('FSDegradationist')) {
				if (slave.onDiet !== 1) {
					if (!canTaste(slave)) {
						r.push(`${His} lack of a sense of taste makes ${him} essentially immune to the addictive slave treats, as ${he} can't be enticed by their delicious taste.`);
					} else if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
						r.push(`${He} can't stop ${himself} from eating the <span class="devotion inc">addictive, delicious</span> slave treats available throughout the arcology. ${He}`);
						if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
							r.push(`knows`);
						} else {
							r.push(`believes`);
						}
						r.push(`they are fattening and <span class="trust dec">starts obsessing</span> even more about ${his} weight, appearance and how others view ${him}.`);
						slave.trust -= 3;
						if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
							slave.weight++;
						}
						slave.devotion++;
					} else if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
						r.push(`${He} hates the availability of the tasty slave treats and how they tempt ${him} away from a fit lifestyle, but often <span class="devotion inc">finds ${himself} absentmindedly snacking on them.</span>`);
						if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
							r.push(`The more ${his} <span class="change positive">waistline grows,</span> the <span class="trust dec">less ${he} finds ${himself} trusting you.</span>`);
							slave.trust--;
							slave.devotion++;
							slave.weight++;
						} else {
							r.push(`${He} finds that no matter how many ${he} eats, ${he} never gains weight, a detail ${he} is <span class="trust inc">thankful</span> for.`);
							slave.trust++;
							slave.devotion++;
						}
					} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
						r.push(`${He} <span class="devotion inc">loves</span> the availability of the tasty slave treats and how ${he} can keep ${his} mouth filled at <span class="devotion inc">nearly all times.</span>`);
						if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
							r.push(`Since ${his} belly is always full thanks to your food supplies, ${he} <span class="trust inc">trusts you to keep ${him} sated,</span> though ${his} constant gorging has a <span class="change positive">huge impact on ${his} waistline.</span>`);
							slave.trust++;
							slave.devotion += 3;
							slave.weight += 3;
						} else {
							r.push(`Since ${his} belly is always full thanks to your food supplies, ${he} <span class="trust inc">trusts you to keep ${him} sated.</span> Since the food is fat free, ${his} waistline is spared ${his} bad habits.`);
							slave.trust++;
							slave.devotion += 3;
						}
					} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
						r.push(`${He} hates the availability of the tasty slave treats and how ${he} <span class="devotion inc">can't stop eating them.</span>`);
						if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
							r.push(`The <span class="change positive">more ${his} waistline grows,</span> the <span class="trust dec">more horrifying ${his} body becomes to ${him}.</span>`);
							slave.trust -= 5;
							slave.devotion++;
							slave.weight++;
						} else {
							r.push(`${He} finds that no matter how many ${he} eats, ${he} never gains weight, a detail ${he} is <span class="trust inc">thankful</span> for, even if ${he} is disgusted by ${his} actions.`);
							slave.trust++;
							slave.devotion++;
						}
					} else {
						r.push(`${He} <span class="devotion inc">loves</span> the availability of the tasty slave treats and <span class="trust inc">trusts you more</span> for having them so accessible.`);
						if (V.arcologies[0].FSHedonisticDecadenceDietResearch === 0) {
							r.push(`${He} is so distracted by the luxury that ${he} doesn't notice the <span class="change positive">weight ${he} is gaining.</span>`);
							slave.weight++;
						}
						slave.trust++;
						slave.devotion++;
					}
				} else {
					// no treats for you
					if (!canTaste(slave)) {
						r.push(`${He} lacks permission to eat the slave treats, which ${he} has no real opinion over, as ${he} lacks the sense to taste them anyway.`);
					} else if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
						r.push(`${He} is <span class="trust inc">relieved</span> ${he} doesn't have to fret over eating the treats and gaining weight as ${his} ${getWrittenTitle(slave)} is carefully directing ${him}.`);
						slave.trust++;
					} else if (slave.behavioralQuirk === BehavioralQuirk.FITNESS) {
						r.push(`${He} is <span class="trust inc">thankful</span> that ${he} isn't permitted to eat the treats. ${He}'s seen others try one, only to start shoveling them down.`);
						slave.trust++;
					} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
						r.push(`${He} <span class="devotion dec">resents</span> not being allowed to stuff ${his} face with the tempting treats like the other`);
						if (canSee(slave)) {
							r.push(`slaves ${he} sees.`);
						} else {
							r.push(`slaves.`);
						}
						slave.devotion -= 2;
					} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
						r.push(`${He} <span class="devotion inc">is relieved</span> that ${he} doesn't have to eat the treat and is <span class="trust inc">thankful</span> for your apparent consideration.`);
						slave.trust++;
						slave.devotion += 2;
					} else {
						r.push(`${He}`);
						if (canSee(slave)) {
							r.push(`sees`);
						} else {
							r.push(`knows`);
						}
						r.push(`how much the other slaves enjoy the delicious treats and <span class="devotion dec">resents</span> not being allowed to enjoy them, feeling you are doing this to <span class="trust dec">spite ${him}.</span>`);
						slave.devotion--;
						slave.trust--;
					}
				}
			} else {
				if (slave.onDiet !== 1) {
					r.push(`The treats are designed to cause stomach cramps alongside being extremely addictive. ${He} cannot stop ${himself} from eating them, but ${he} can <span class="trust dec">fear</span> your cruelty as ${his} <span class="devotion inc">will steadily erodes</span> from the concentrated aphrodisiacs in ${his} food.`);
					slave.devotion += 2;
					slave.trust -= 3;
				} else {
					r.push(`The treats are designed to cause stomach cramps alongside being extremely addictive. Since ${he} is not permitted to eat them, <span class="trust inc">${he} breathes a sigh of relief,</span> though ${he} is fully aware of what happens to those not as fortunate as ${him}. ${He} <span class="devotion inc">tries ${his} best to be obedient</span> hoping to not undergo the agony, but ${his} efforts pale in comparison to the effects of the food based aphrodisiacs.`);
					slave.devotion++;
					slave.trust++;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function brandEffects(slave) {
		const brands = App.Medicine.Modification.brandRecord(slave);
		if (!jQuery.isEmptyObject(brands)) {
			if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB].includes(slave.assignment)) {
				r.push(`Since ${he} is in public, your brand against the ${slave.skin} skin of ${his} ${Object.keys(brands)[0]} <span class="reputation inc">slightly increases your reputation</span> as a slaveowner.`);
				repX(5, "futureSocieties", slave);
				switch (slave.assignment) {
					case Job.BROTHEL:
						getSlaveStatisticData(slave, V.facility.brothel).rep += 5;
						break;
				}
			}
			if (V.rep > 10000) {
				r.push(`${His} brand is considered a minor enhancement to ${his} beauty since you are very well liked.`);
			} else if (V.rep < 5000) {
				r.push(`${His} brand is considered a minor blemish on ${his} beauty since you are not well liked.`);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function disabilityEffects(slave) {
		let visionFlag = 0;
		if (getBestVision(slave) === 0) {
			if (slave.hears <= -2) {
				if (slave.devotion > 50) {
					r.push(`Even though ${he} is blind and deaf, ${he} is devoted enough to you to allow ${himself} to lower ${his} guard. ${He} becomes <span class="trust inc">trusting</span> of your ability to keep ${him} safe.`);
					slave.trust += 5;
				} else if (slave.devotion > 20) {
					r.push(`Since ${he}'s blind, deaf and on the cusp of devotion, ${he} becomes <span class="devotion inc">more reliant</span> on you, but also begins to be <span class="trust inc">less fearful</span> of the world around ${him}.`);
					slave.devotion += 5;
					slave.trust += 3;
				} else if ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${He} may be blind and deaf, but ${he} knows nobody would dare harm ${him} under your watch, <span class="trust inc">building ${his} trust</span> in you.`);
					slave.trust += 2;
				} else if (slave.devotion >= -20) {
					r.push(`${His} blindness and deafness forces ${him} to <span class="devotion inc">entirely rely</span> on your mercy. However, it only <span class="trust inc">amplifies ${his} fear</span> as ${he} has only`);
					if (canSmell(slave)) {
						r.push(`the smell of arousal`);
					} else {
						r.push(`a stumbling sense of touch`);
					}
					r.push(`to warn of an impending threat.`);
					slave.devotion += 10;
					slave.trust -= 30;
				} else {
					r.push(`Being blind and deaf forces ${him} to <span class="devotion inc">completely rely</span> on your mercy. It does nothing to stem <span class="trust dec">the horror</span> ${he} faces being unable to sense the world around ${him}.`);
					slave.devotion += 20;
					slave.trust -= 50;
				}
			} else if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs")) {
				if (slave.devotion > 50) {
					r.push(`Even though ${he} is blind and unable to properly hear, ${he} is devoted enough to you to allow ${himself} to lower ${his} guard. ${He} becomes <span class="trust inc">trusting</span> of your ability to keep ${him} safe.`);
					slave.trust += 4;
				} else if (slave.devotion > 20) {
					r.push(`Since ${he}'s blind, hard of hearing and on the cusp of devotion, ${he} becomes <span class="devotion inc">more reliant</span> on you, but also begins to be <span class="trust inc">less fearful</span> of the world around ${him}.`);
					slave.devotion += 4;
					slave.trust += 2;
				} else if ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${He} may be blind and hard of hearing, but ${he} knows nobody would dare harm ${him} under your watch, <span class="trust inc">building ${his} trust</span> in you.`);
					slave.trust += 2;
				} else if (slave.devotion >= -20) {
					r.push(`${His} blindness and trouble hearing forces ${him} to <span class="devotion inc">rely</span> on your mercy. However, it only <span class="trust dec">amplifies ${his} fear</span> as ${he} strains to hear anything potential threats to ${him}.`);
					slave.devotion += 7;
					slave.trust -= 20;
				} else {
					r.push(`Being blind and hard of hearing forces ${him} to <span class="devotion inc">rely</span> on your mercy. It does nothing to stem <span class="trust dec">the terrible sounds</span> ${he} struggles to hear.`);
					slave.devotion += 10;
					slave.trust -= 25;
				}
			} else {
				if (slave.devotion > 50) {
					r.push(`Even though ${he} is blind, ${he} is devoted enough to you to allow ${himself} to lower ${his} guard. ${He} becomes <span class="trust inc">trusting</span> of your ability to keep ${him} safe.`);
					slave.trust += 3;
				} else if (slave.devotion > 20) {
					r.push(`Since ${he}'s blind and on the cusp of devotion, ${he} becomes slightly <span class="devotion inc">more reliant,</span> but also begins to be <span class="trust inc">less fearful</span> of what ${he} can't see.`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${He} may be blind, but ${he} knows nobody would dare harm ${him} under your watch, <span class="trust inc">building ${his} trust</span> in you.`);
					slave.trust += 2;
				} else if (slave.devotion >= -20) {
					r.push(`${His} blindness forces ${him} to <span class="devotion inc">rely</span> on your mercy. However, it only <span class="trust dec">amplifies ${his} fear</span> as ${he} has severely limited capabilities to defend ${himself}.`);
					slave.devotion += 5;
					slave.trust -= 10;
				} else {
					r.push(`Being blind forces ${him} to <span class="devotion inc">completely rely</span> on your mercy. It does nothing to stem <span class="trust dec">the terror</span> ${he} faces constantly being unable to tell what will happen to ${him}.`);
					slave.devotion += 10;
					slave.trust -= 25;
				}
			}
			visionFlag = -2;
		} else if (getBestVision(slave) === 1) {
			if (!canSeePerfectly(slave)) {
				if (slave.devotion > 50) {
					r.push(`${His} vision may be clouded but it doesn't get in the way of ${his} devotion to you.`);
				} else if (slave.devotion > 20) {
					r.push(`Since ${he}'s on the cusp of devotion, ${his} blurred vision makes ${him} <span class="devotion inc">slightly more submissive,</span> since ${he} can't always see what's happening to ${him}.`);
					slave.devotion += 1;
				} else if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB].includes(slave.assignment)) {
					r.push(`${His} blurred vision <span class="devotion inc">reduces ${his} distaste for ${his} life slightly,</span> since ${his} fuzzy vision allows ${him} to ignore the details of everyone ${he}'s expected to fuck.`);
					slave.devotion += 1;
				} else {
					r.push(`${His} blurred vision tends to make ${him} <span class="trust dec">a little more fearful,</span> since ${he} can never tell what's about to happen to ${him}.`);
					slave.trust -= 1;
				}
				visionFlag = -1;
			}
		} else if (getBestVision(slave) === 2) {
			if (!canSeePerfectly(slave)) {
				if (slave.devotion > 50) {
					r.push(`${He} tolerates the annoyance of blurred vision induced by ${his} eyewear.`);
				} else if (slave.devotion > 20) {
					r.push(`Since ${he}'s on the cusp of devotion, the blurred vision induced by ${his} eyewear actually makes ${him} <span class="devotion inc">slightly more submissive.</span>`);
					slave.devotion += 1;
				} else if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB].includes(slave.assignment)) {
					r.push(`The blurred vision induced by ${his} eyewear actually <span class="devotion inc">reduces ${his} distaste for ${his} life slightly,</span> since ${his} fuzzy vision allows ${him} to ignore the details of everyone ${he}'s expected to fuck.`);
					slave.devotion += 1;
				} else {
					r.push(`The blurred vision induced by ${his} eyewear actually <span class="devotion dec">infuriates ${him}.</span>`);
					slave.devotion -= 1;
				}
				visionFlag = -1;
			}
		}
		if (visionFlag === -1) {
			if (slave.hears === -2) {
				if (slave.devotion > 50) {
					r.push(`Since ${he} is also deaf, ${he} begins to <span class="trust inc">rely</span> on you to give ${him} the feedback ${his} body does cannot.`);
					slave.trust += 3;
				} else if (slave.devotion > 20) {
					r.push(`Since ${he} is also deaf, ${he} becomes <span class="devotion inc">very reliant</span> on you, but also begins to <span class="trust inc">trust</span> you to convey what ${his} body does not.`);
					slave.devotion += 3;
					slave.trust += 3;
				} else if ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`Since ${he} is also deaf, ${he} views you as ${his} <span class="trust inc">blurry guardian.</span>`);
					slave.trust += 5;
				} else if (slave.devotion >= -20) {
					r.push(`Since ${he} is also deaf, ${he} <span class="trust dec">descends into paranoia</span> as every blurry shape could be out to get ${him}.`);
					slave.trust -= 20;
				} else {
					r.push(`Since ${he} is also deaf, ${he} <span class="trust dec">delves into the depths of paranoia</span> as every blurry shape could be out to get ${him}. ${He} becomes increasingly <span class="devotion dec">hateful</span> to those around ${him} in an effort to ward off threats.`);
					slave.trust -= 30;
					slave.devotion -= 10;
				}
			} else if (slave.hears === -1) {
				if (slave.earwear !== "hearing aids") {
					if (slave.devotion > 50) {
						r.push(`${His} hearing may be muddled too, but ${he} doesn't let it bother ${him}.`);
					} else if (slave.devotion > 20) {
						r.push(`Since ${he} is also hard of hearing, ${he} is forced into <span class="devotion inc">very submissive state,</span> though <span class="trust dec">worrying thoughts</span> begin to plague ${his} mind.`);
						slave.devotion += 3;
						slave.trust -= 3;
					} else if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB].includes(slave.assignment)) {
						r.push(`Since ${he} is also hard of hearing, ${he} has a hard time understanding what partners want from ${him}, often causing them to <span class="trust dec">get forceful</span> with ${him}.`);
						slave.trust -= 5;
					} else {
						r.push(`Since ${he} is also hard of hearing, <span class="trust dec">${he} becomes increasingly paranoid</span> since ${he} can barely discern other's intent any more.`);
						slave.trust -= 5;
					}
				}
			} else if (slave.hears === 0) {
				if (slave.earwear === "muffling ear plugs") {
					if (slave.devotion > 50) {
						r.push(`${He} tolerates the annoyance of muffled hearing induced by ${his} ear plugs.`);
					} else if (slave.devotion > 20) {
						r.push(`Since ${his} hearing is also muffled, ${he} is forced into <span class="devotion inc">very submissive state,</span> though <span class="trust dec">worrying thoughts</span> begin to plague ${his} mind.`);
						slave.devotion += 3;
						slave.trust -= 3;
					} else if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB].includes(slave.assignment)) {
						r.push(`Since ${his} hearing is also muffled, ${he} has a hard time understanding what partners want from ${him}, often causing them to <span class="trust dec">get forceful</span> with ${him}.`);
						slave.trust -= 5;
					} else {
						r.push(`The muffled hearing induced by ${his} ear plugs <span class="devotion dec">infuriates ${him}</span> with ${his} vision problems.`);
						slave.devotion -= 5;
					}
				}
			}
		} else if (visionFlag !== -2) {
			if (slave.hears === -2) {
				if (slave.devotion > 50) {
					r.push(`Even though ${he} is deaf, ${he} is devoted enough to you to allow ${himself} to lower ${his} guard. ${He} becomes <span class="trust inc">trusting</span> of your ability to watch ${his} back.`);
					slave.trust += 1;
				} else if (slave.devotion > 20) {
					r.push(`Since ${he}'s deaf and on the cusp of devotion, ${he} becomes slightly <span class="devotion inc">more reliant,</span> but also begins to be <span class="trust inc">less fearful</span> of what is lurking out of sight.`);
					slave.devotion += 1;
					slave.trust += 1;
				} else if ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
					r.push(`${He} may be deaf, but no one can sneak up on ${him} while ${he} is with you, <span class="trust inc">developing the trust</span> that you have ${his} back.`);
					slave.trust += 2;
				} else if (slave.devotion >= -20) {
					r.push(`${His} deafness forces ${him} to <span class="trust dec">distrust everyone</span> as everything out of sight is a potential threat to ${him}.`);
					slave.trust -= 10;
				} else {
					r.push(`Being deaf forces ${him} to <span class="trust dec">fear</span> everything ${he} can't see. At any moment, something could jump on ${his} back and force ${him} into position.`);
					slave.trust -= 25;
				}
			} else if (slave.hears === -1) {
				if (slave.earwear !== "hearing aids") {
					if (slave.devotion > 50) {
						r.push(`${His} hearing may be muddled but it doesn't get in the way of ${his} devotion to you.`);
					} else if (slave.devotion > 20) {
						r.push(`Since ${he}'s on the cusp of devotion, ${his} muffled hearing makes ${him} <span class="devotion inc">slightly more submissive,</span> since ${he} can't always hear what's going on around ${him}.`);
						slave.devotion += 1;
					} else if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB].includes(slave.assignment)) {
						r.push(`${His} muffled hearing <span class="devotion inc">reduces ${his} distaste for ${his} life slightly,</span> since ${his} impaired hearing allows ${him} to ignore the disgusting comments from everyone around ${him}.`);
						slave.devotion += 1;
					} else {
						r.push(`${His} muffled hearing tends to make ${him} <span class="trust dec">a little more fearful,</span> since ${he} can never tell what people are saying about ${him}.`);
						slave.trust -= 1;
					}
				}
			} else if (slave.hears === 0) {
				if (slave.earwear === "muffling ear plugs") {
					if (slave.devotion > 50) {
						r.push(`${He} tolerates the annoyance of muffled hearing induced by ${his} ear plugs.`);
					} else if (slave.devotion > 20) {
						r.push(`Since ${he}'s on the cusp of devotion, the muffled hearing induced by ${his} ear plugs actually makes ${him} <span class="devotion inc">slightly more submissive.</span>`);
						slave.devotion += 1;
					} else if ([Job.PUBLIC, Job.WHORE, Job.BROTHEL, Job.CLUB].includes(slave.assignment)) {
						r.push(`The muffled hearing induced by ${his} ear plugs actually <span class="devotion inc">reduces ${his} distaste for ${his} life slightly,</span> since ${his} impaired hearing allows ${him} to ignore the disgusting comments from everyone around ${him}.`);
						slave.devotion += 1;
					} else {
						r.push(`The muffled hearing induced by ${his} ear plugs <span class="devotion dec">irritates ${him}.</span>`);
						slave.devotion -= 1;
					}
				}
			}
		}
		if (slave.muscles < -95) {
			if (slave.devotion > 50) {
				r.push(`${He} knows ${he} is near helpless but is devoted enough to you to allow ${himself} to lower ${his} guard. ${He} becomes <span class="trust inc">trusting</span> of your ability to keep ${him} safe.`);
				slave.trust += 3;
			} else if (slave.devotion > 20) {
				r.push(`Since ${he}'s near helpless and on the cusp of devotion, ${he} becomes slightly <span class="devotion inc">more reliant,</span> but also begins to be <span class="trust inc">less fearful</span> of what could happen to ${him}.`);
				slave.devotion += 3;
				slave.trust += 1;
			} else if ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(slave.assignment)) {
				r.push(`${He} may be physically frail and vulnerable, but ${he} knows nobody would dare harm ${him} under your watch, <span class="trust inc">building ${his} trust</span> in you.`);
				slave.trust += 2;
			} else if (slave.devotion >= -20) {
				r.push(`${His} frailty forces ${him} to <span class="devotion inc">rely</span> on your mercy. However, it only <span class="trust dec">amplifies ${his} fear</span> as ${he} has no chance of defending ${himself}.`);
				slave.devotion += 5;
				slave.trust -= 10;
			} else {
				r.push(`Being frail and near helpless forces ${him} to <span class="devotion inc">heavily rely</span> on your mercy. It does nothing to stem <span class="trust dec">the terror</span> ${he} faces constantly knowing that whatever anyone wants to do to ${him}, there is nothing ${he} can do to stop it.`);
				slave.devotion += 10;
				slave.trust -= 25;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function languageLearning(slave) {
		let minWeeks;
		if (slave.rules.speech === "restrictive") {
			minWeeks = 30;
		} else if (slave.rules.speech === "accent elimination") {
			minWeeks = 15;
		} else if (slave.rules.speech === "language lessons") {
			minWeeks = 10;
		} else {
			minWeeks = 20;
		}
		minWeeks -= Math.trunc((slave.intelligence + slave.intelligenceImplant) / 10);
		if (slave.voice === 0 || slave.lips > 95) {
			// can't speak, but slowly picks up language
			minWeeks += 30;
		} else if (SlaveStatsChecker.checkForLisp(slave)) {
			// moderate speech impediment
			minWeeks += 15;
		}
		if (slave.accent === 4) {
			minWeeks += 40;
		}
		// For starting slaves, this assumes language learning started at the same time as the arcology.
		// In principle, if the lingua franca is the PC's mother tongue, language learning could be assumed to have started earlier.
		// But in that case we would probably want to convert accent to a float that ticks down a little at a time.
		const weeksLearningLinguaFranca = V.week - Math.max(0, slave.weekAcquired);
		if (slave.accent >= 4) {
			if (weeksLearningLinguaFranca > minWeeks - 5) {
				slave.accent -= 1;
				if (slave.rules.speech === "language lessons") {
					slave.rules.speech = "accent elimination";
				}
				if (slave.voice === 0 || slave.lips > 95) {
					r.push(`${He} has managed to pick up enough ${V.language} that <span class="improvement">${he} could now barely get ${his} point across.</span> If ${he} were able to talk, that is.`);
				} else {
					r.push(`${He} has managed to pick up enough ${V.language} that <span class="improvement">${he} can now barely get ${his} point across.</span> ${His} accent is horrible, but it's a start.`);
				}
			}
		} else if (slave.accent >= 3) {
			if (weeksLearningLinguaFranca > minWeeks) {
				slave.accent -= 1;
				if (slave.voice === 0 || slave.lips > 95) {
					r.push(`${He} has managed to pick up enough ${V.language} that <span class="improvement">${he}'s now able to understand most of what ${he} hears.</span>`);
				} else {
					r.push(`${He} has managed to pick up enough ${V.language} that <span class="improvement">${he}'s now reasonably fluent in the language.</span> ${His} accent is quite heavy, but ${he} can make ${himself} understood.`);
				}
			}
		} else if (canTalk(slave)) {
			if (slave.accent === 2) {
				if (weeksLearningLinguaFranca > 5 + minWeeks) {
					slave.accent -= 1;
					r.push(`${He} has heard and spoken a great deal of ${V.language} as your slave. <span class="improvement">${His} accent has diminished to a pleasant exoticism.</span>`);
				}
			} else if (slave.accent === 1 && slave.rules.speech === "accent elimination") {
				if (weeksLearningLinguaFranca > 10 + minWeeks) {
					slave.accent -= 1;
					r.push(`${He} does ${his} best to speak proper, unaccented ${V.language}, as encouraged by the rules. <span class="improvement">${His} accent has diminished to imperceptibility.</span>`);
					slave.rules.speech = "restrictive";
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function prestige(slave) {
		r.push(`Merely owning such a prestigious slave <span class="reputation inc">helps your reputation.</span>`);
		repX((250 * slave.prestige), "prestigiousSlave", slave);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function pornEffects(slave) {
		if (slave.porn.prestige === 3) {
			r.push(`${He} is the whore people envision when they think of ${slave.porn.fameType} porn. ${His} omnipresence on the internet <span class="reputation inc">boosts ${his} owner's reputation.</span>`);
			repX((750 * slave.porn.prestige), "porn", slave);
			const donations = Math.floor(slave.porn.viewerCount / (random(13, 20))) + (random(-5000, 5000));
			if (donations > 0) {
				r.push(`A number of gifts and donations totaling <span class="cash inc">${cashFormat(donations)}</span> were also sent to ${him}, among other things.`);
				cashX(donations, "porn", slave);
			}
		} else if (slave.porn.feed > 0) {
			r.push(App.SlaveAssignment.porn(slave));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function age(slave) {
		if (V.seeAge !== 0) {
			if (slave.birthWeek >= 51) {
				r.push(`${His} birthday was this`);
				if (V.seeAge === 1) {
					r.push(`week; ${he} turned ${num(slave.physicalAge + 1)}.`);
				} else {
					r.push(`week.`);
				}
				if (slave.fuckdoll > 0 || slave.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} did not know.`);
				} else if (slave.devotion > 50) {
					r.push(`${He} did not notice.`);
				} else if (V.week - slave.weekAcquired > 50) {
					r.push(`${He} remembered it only dimly.`);
				} else {
					r.push(`${He} remembered it, but no one cared.`);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function pregnancyCheck(slave) {
		if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1) {
			if (slave.preg > slave.pregData.normalBirth / 13.33 || slave.pregKnown === 1) {
				if (slave.pregSource !== -1 && slave.pregSource !== -6) {
					r.push(`${slave.slaveName}'s weekly health checkup revealed ${he} is pregnant with an unacceptable child. <span class="elites loss">Its life has been terminated, you have been fined ${cashFormat(100000)}, and your rep among the Elite has been severely damaged.</span>`);
					TerminatePregnancy(slave);
					actX(slave, "abortions");
					cashX(-100000, "fines", slave);
					V.failedElite += 150;
					if (slave.abortionTat > -1) {
						r.push(`But hey, ${he} gets a tattoo signifying ${his} abortion. Was it worth it?`);
						slave.abortionTat++;
						cashX(forceNeg(V.modCost), "slaveMod", slave);
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mainLaborTriggers(slave) {
		if (slave.pregControl !== GestationDrug.LABOR && slave.assignment !== Job.BABY_FACTORY) {
			if (slave.broodmother < 1) {
				if (WombBirthReady(slave, slave.pregData.normalBirth * 1.075) > 0) {
					// check for really ready fetuses - 43 weeks - max, overdue
					startLabor(slave);
				} else if (WombBirthReady(slave, slave.pregData.normalBirth) > 0 && (random(1, 100) > 50)) {
					// check for really ready fetuses - 40 weeks - normal
					startLabor(slave);
				} else if (WombBirthReady(slave, slave.pregData.normalBirth / 1.1111) > 0 && (random(1, 100) > 90) && slave.geneMods.progenitor !== 1) {
					// check for really ready fetuses - 36 weeks minimum
					startLabor(slave);
				}
			} else {
				if (WombBirthReady(slave, 37)) {
					// broodmothers are always ready at 37 weeks
					startLabor(slave);
				}
			}
		}
		if (V.dangerousPregnancy === 1 && !isInLabor(slave)) {
			let miscarriage = 0;
			if (((slave.assignment !== Job.DAIRY || V.dairyRestraintsSetting < 2) && slave.pregAdaptation < 500 && slave.broodmother < 1) || (slave.preg > slave.pregData.normalBirth / 2 && slave.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2))) {
				let miscarriageChance = -10;
				miscarriageChance += ((slave.bellyPreg / 1000) - slave.pregAdaptation);
				// this could use to not be linear
				if (slave.inflation > 0) {
					miscarriageChance += 10;
				}
				miscarriageChance -= (slave.curatives === 1 ? 100 : 0);
				if (slave.health.health < -20) {
					miscarriageChance -= (slave.health.health);
					if (slave.trust < -20) {
						miscarriageChance -= (slave.trust / 2);
					}
				} else if (slave.health.health > 80) {
					miscarriageChance -= (slave.health.health / 10);
				}
				if (slave.physicalAge > 60) {
					miscarriageChance += (slave.physicalAge - 60);
				}
				if (slave.weight < -50) {
					miscarriageChance -= slave.weight;
				}
				if (V.masterSuitePregnancySlaveLuxuries === 1 && (slave.assignment === Job.MASTERSUITE || slave.assignment === Job.CONCUBINE)) {
					miscarriageChance -= 300;
				} else if (slave.assignment === Job.REST) {
					miscarriageChance -= 100;
				} else if (slave.assignment === Job.SPA) {
					miscarriageChance -= 50;
				} else if (slave.assignment === Job.CLINIC) {
					if (S.Nurse) {
						miscarriageChance -= 200;
					} else {
						miscarriageChance -= 150;
					}
				}
				if (slave.bellyAccessory === "a support band") {
					miscarriageChance -= 30;
				}
				if (slave.pregControl === GestationDrug.SLOW) {
					miscarriageChance -= 100;
				} else if (slave.pregControl === GestationDrug.LABOR) {
					miscarriageChance -= 10000;
				} else if (slave.pregControl === GestationDrug.FAST) {
					if (miscarriageChance > 0) {
						miscarriageChance *= 2;
					}
				}
				if (slave.preg > slave.pregData.normalBirth / 2 && slave.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2)) {
					if (slave.bellyPreg > 50000) {
						miscarriageChance = 100;
					}
				}
				if (miscarriageChance > random(0, 100) && slave.geneMods.progenitor !== 1) { // Progenitor refuses to miscarry or give birth early.
					const chance = random(1, 100);
					if (slave.preg >= slave.pregData.normalBirth / 1.33) {
						startLabor(slave);
						miscarriage = 1;
					} else if (slave.preg > slave.pregData.normalBirth / 1.48) {
						slave.prematureBirth = 1;
						startLabor(slave);
						miscarriage = 1;
					} else if (slave.preg > slave.pregData.normalBirth / 1.6 && chance > 10) {
						slave.prematureBirth = 1;
						startLabor(slave);
						miscarriage = 1;
					} else if (slave.preg > slave.pregData.normalBirth / 1.73 && chance > 40) {
						slave.prematureBirth = 1;
						startLabor(slave);
						miscarriage = 1;
					} else if (slave.preg > slave.pregData.normalBirth / 1.81 && chance > 75) {
						slave.prematureBirth = 1;
						startLabor(slave);
						miscarriage = 1;
					} else {
						r.push(`${His} overwhelmed body has <span class="miscarriage">forced ${him} to miscarry,</span> possibly saving ${his} life.`);
						slave.preg = rulesDemandContraceptives(slave, V.defaultRules) ? -1 : 0;
						if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
							if (slave.sexualFlaw === SexualFlaw.BREEDER) {
								r.push(`${He} is <span class="devotion dec">filled with violent, all-consuming hatred</span> at ${himself} for failing to carry to term and you for allowing this to happen.`);
								if (slave.pregType > 4) {
									r.push(`The loss of so many children at once <span class="mindbreak">shatters the distraught breeder's mind.</span>`);
									applyMindbroken(slave);
								} else {
									r.push(`${He} cares little for what punishment awaits ${his} actions.`);
									slave.devotion -= 25 * slave.pregType;
								}
							} else if (slave.devotion < -50) {
								r.push(`${He} is <span class="devotion dec">filled with violent, consuming hatred</span> and <span class="trust dec">fear.</span> Even though ${he} knew ${his}`);
								if (slave.pregType > 1) {
									r.push(`babies were`);
								} else {
									r.push(`baby was`);
								}
								r.push(`likely destined for a slave orphanage, it seems ${he} cared for`);
								if (slave.pregType > 1) {
									r.push(`them`);
								} else {
									r.push(`it`);
								}
								r.push(`and blames you for the loss.`);
								slave.devotion -= 25;
								slave.trust -= 25;
							} else if (slave.devotion < -20) {
								r.push(`${He} is <span class="devotion dec">afflicted by desperate, inconsolable grief</span> and <span class="trust dec">horror.</span> Even though ${he} knew ${his}`);
								if (slave.pregType > 1) {
									r.push(`babies were`);
								} else {
									r.push(`baby was`);
								}
								r.push(`likely destined for a slave orphanage, it seems ${he} cared for`);
								if (slave.pregType > 1) {
									r.push(`them.`);
								} else {
									r.push(`it.`);
								}
								slave.devotion -= 10;
								slave.trust -= 20;
							} else if (slave.fetish === Fetish.PREGNANCY) {
								r.push(`${He} is <span class="devotion dec">filled with deep regret</span> and <span class="trust dec">fear.</span>`);
								if (slave.fetishKnown === 1) {
									r.push(`To a pregnancy fetishist, ending it like this hurts far worse than birth ever would.`);
								} else {
									r.push(`It appears ${he} was more attached to ${his} baby bump than ${he} let on and is hurting even more for it.`);
								}
								const fetishModifier = slave.fetishStrength / 2;
								slave.devotion -= fetishModifier;
								slave.trust -= fetishModifier;
							} else if (slave.devotion <= 20) {
								r.push(`${He} is <span class="devotion dec">consumed by enduring sorrow</span> and <span class="trust dec">horror.</span> Even though ${he} knew ${his}`);
								if (slave.pregType > 1) {
									r.push(`babies were`);
								} else {
									r.push(`baby was`);
								}
								r.push(`likely destined for a slave orphanage, it seems ${he} cared for`);
								if (slave.pregType > 1) {
									r.push(`them.`);
								} else {
									r.push(`it.`);
								}
								slave.devotion -= 5;
								slave.trust -= 5;
							} else if (slave.devotion <= 50) {
								r.push(`${He} is dully obedient. ${He} has been broken to slave life so thoroughly that even this is neither surprising nor affecting.`);
							} else {
								r.push(`${He} is <span class="devotion dec">disappointed by this development</span> and <span class="trust dec">afraid</span> of your reaction. By failing to carry to term, ${he} has failed your will.`);
								slave.devotion -= 10;
								slave.trust -= 10;
							}
						}
						TerminatePregnancy(slave);
						actX(slave, "abortions");
						if (slave.abortionTat > -1) {
							slave.abortionTat++;
							r.push(`The temporary tattoo of a child has been replaced with ${his} ${ordinalSuffix(slave.abortionTat)} crossed out infant.`);
							cashX(forceNeg(V.modCost), "slaveMod", slave);
						}
						miscarriage = 1;
					}
				}
			}
			if (V.seeExtreme === 1) {
				if (miscarriage !== 1 && slave.bellyPreg >= 100000 && slave.geneMods.rapidCellGrowth !== 1) {
					// If she can't relieve the pressure that way, will she hold?
					if (slave.bellyPreg >= 500000 || slave.wombImplant !== "restraint") {
						if ((slave.belly > (slave.pregAdaptation * 3200)) || slave.bellyPreg >= 500000) {
							let burstChance = -80;
							burstChance += ((slave.belly / 1000) - slave.pregAdaptation);
							// this could use to not be linear
							if (slave.health.health < -20) {
								burstChance -= (slave.health.health);
							} else if (slave.health.health > 80) {
								burstChance -= (slave.health.health / 10);
							}
							if (slave.weight < 0) {
								burstChance -= slave.weight;
							}
							burstChance -= slave.bellySag;
							burstChance -= slave.muscles;
							if (slave.bellyAccessory === "a support band") {
								burstChance -= 10;
							}
							if (slave.pregControl === GestationDrug.SLOW) {
								burstChance -= 20;
							}
							if (slave.assignment === Job.CLINIC) {
								if (S.Nurse) {
									burstChance -= 100;
								} else {
									burstChance -= 30;
								}
							} else if (slave.assignment === Job.DAIRY && V.dairyPregSetting === 3) {
								burstChance -= 250;
							}
							if (slave.pregControl === GestationDrug.FAST) {
								if (burstChance > 0) {
									burstChance *= 4;
								}
							}
							if (burstChance > random(0, 100)) {
								burst(slave);
							} else {
								r.push(`Constant <span class="health dec">`);
								if (slave.geneticQuirks.uterineHypersensitivity === 2) {
									r.push(`painful orgasms`);
								} else {
									r.push(`sharp pains`);
								}
								r.push(`</span> from ${his} womb strongly suggest <span class="health dec">${his} body is beginning to break.</span>`);
							}
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function slaveDeath(slave) {
		let deathSeed;
		if (burstCheck(slave)) {
			// already scheduled for a different kind of death
		} else {
			if (slave.health.health <= -90 && slave.assignment !== Job.CLINIC) {
				deathSeed = (slave.health.health - slave.physicalAge - (slave.chem * 2) - (slave.addict * 2));
				if (slave.weight < -50 || slave.weight > 95) {
					deathSeed -= 100;
				}
				if (slave.weight > 190) {
					deathSeed -= 100;
				}
				if (slave.aphrodisiacs > 0) {
					deathSeed -= (75 * slave.aphrodisiacs);
				}
				if (slave.inflationType === InflationLiquid.APHRO) {
					deathSeed -= (100 * slave.inflation);
				}
				if (slave.curatives === 1) {
					deathSeed += 200;
				}
				if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
					deathSeed -= 200;
				}
				if (random(1, 1000) > (400 + deathSeed)) {
					planDeath(slave, "lowHealth");
				}
				if ((slave.aphrodisiacs > 0 || slave.inflationType === InflationLiquid.APHRO) && random(1, 1000) > (200 + deathSeed)) {
					planDeath(slave, "overdosed");
				}
			}
			if (V.seeAge === 1) {
				deathSeed = ((slave.health.health * 2) - (slave.physicalAge * 2) - (slave.assignment === Job.CLINIC && S.Nurse && V.clinicUpgradeFilters >= 1 ? slave.chem : (slave.chem * 4)) - (slave.addict * 3));
				if (slave.physicalAge >= Math.max((70 + (slave.health.health / 5) - (slave.addict) - (slave.chem / 20)), 50) && random(1, 1000) > 800 + deathSeed) {
					planDeath(slave, "oldAge");
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function hairGrowth(slave) {
		if (slave.hLength < 150) {
			slave.hLength += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} oldEnergy
	 */
	function anaphrodisiacEffects(slave, oldEnergy) {
		const maxEnergyGain = Math.round((75 - oldEnergy) / 9.3);
		if (slave.aphrodisiacs === -1 && slave.energy - oldEnergy > maxEnergyGain) {
			r.push(`Anaphrodisiacs <span class="libido dec">limit ${his} sex drive.</span>`);
			slave.energy = oldEnergy + maxEnergyGain;
		}
	}
};
