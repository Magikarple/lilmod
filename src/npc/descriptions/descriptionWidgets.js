// cSpell:ignore neotenous, Immob

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's nails
 */
App.Desc.nails = function(slave) {
	const {He, His, his} = getPronouns(slave);
	if (!hasAnyArms(slave)) {
		return `${He} has no hands, and thus, no nails.`;
	} else if (slave.nails === 1) {
		return `${His} nails are long and elegant.`;
	} else if (slave.nails === 2) {
		return `${His} nails are color-coordinated with ${his} ${slave.hColor} hair.`;
	} else if (slave.nails === 3) {
		return `${His} nails are sharp and claw-like.`;
	} else if (slave.nails === 4) {
		return `${His} nails are bright and glittery.`;
	} else if (slave.nails === 5) {
		return `${His} nails are long and garish, streetwalker-style.`;
	} else if (slave.nails === 6) {
		return `${His} nails are vivid and eye-catching.`;
	} else if (slave.nails === 7) {
		return `${His} nails are vivid, eye-catching and color-coordinated with ${his} ${slave.hColor} hair.`;
	} else if (slave.nails === 8) {
		return `${His} nails are shiny and metallic.`;
	} else if (slave.nails === 9) {
		return `${His} nails are shiny, metallic and color-coordinated with ${his} ${slave.hColor} hair.`;
	} else {
		return `${His} nails are neatly clipped.`;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's makeup
 */
App.Desc.makeup = function(slave) {
	const {He, His, his} = getPronouns(slave);
	if (slave.makeup === 1) {
		return `${He}'s wearing minimal makeup.`;
	} else if (slave.makeup === 2) {
		return `${He}'s wearing expensive, luxurious makeup.`;
	} else if (slave.makeup === 3) {
		return `${His} makeup is color-coordinated with ${his} ${slave.hColor} hair.`;
	} else if (slave.makeup === 4) {
		return `${He}'s wearing stereotypical, garish streetwalker makeup.`;
	} else if (slave.makeup === 5) {
		return `${He}'s wearing eye-catching neon makeup.`;
	} else if (slave.makeup === 6) {
		return `${His} neon makeup is color-coordinated with ${his} ${slave.hColor} hair.`;
	} else if (slave.makeup === 7) {
		return `${He}'s wearing expensive, metallic makeup.`;
	} else if (slave.makeup === 8) {
		return `${His} metallic makeup is color-coordinated with ${his} ${slave.hColor} hair.`;
	} else if (slave.lipsTat === "permanent makeup") {
		return `${His} face appears to bear very heavy, slutty makeup, but on closer inspection, the makeup is actually tattooed on.`;
	} else {
		return `${His} face is makeup-free.`;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} descType
 * @returns {string} Slave's eyes
 */
App.Desc.eyes = function(slave, descType = DescType.NORMAL) {
	let r = ``;
	const {
		he, him, his, He, His
	} = getPronouns(slave);

	if (getBestVision(slave) === 0) {
		if (!hasAnyEyes(slave)) {
			r += `${His} gaze is empty`;
		} else if (getLeftEyeType(slave) === 2 && getRightEyeType(slave) === 2) {
			r += `${He} has ${App.Desc.eyesColor(slave, "colored glass")}`;
		} else {
			const HC = hasVisibleHeterochromia(slave) ? 1 : 0;
			if (hasBothEyes(slave)) {
				r += `${His} eyes are dull`;
			} else {
				r += `${His} eye is dull`;
			}
			if (descType === DescType.MARKET && V.PC.skill.medicine >= 50 || V.PC.skill.slaving >= 50) {
				r += `, unfocused`;
				if (HC) {
					r += `, heterochromatic,`;
				}
				r += ` and clearly nonfunctional`;
			} else {
				if (HC) {
					r += `, heterochromatic,`;
				}
				r += ` and unfocused`;
			}
		}
		r += `, `;
		if (slave.fetish === Fetish.MINDBROKEN) {
			r += `fitting for vacant expression constantly adorning ${his} face; ${he} lacks the ability to form higher thought and is completely reliant on others to think for ${him}.`;
		} else if (slave.intelligence > 95) {
			r += `but ${his} facial expressions reveal ${he} is incisive, quick, cunning; `;
			if (slave.intelligence + slave.intelligenceImplant >= 130) {
				r += `with ${his} education, ${he} is so far <span class="deepskyblue">beyond brilliant</span> that ${he} is nearly peerless. `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 95) {
				r += `with ${his} miseducation, however, ${he} is merely <span class="orangered">highly intelligent.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `${he} is both <span class="deepskyblue">brilliant</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				// placeholder as this is a technical impossibility for now
			} else {
				r += `${he} is so <span class="deepskyblue">brilliant</span> that ${his} `;
				if (slave.intelligenceImplant > 0) {
					r += `meager`;
				} else {
					r += `lack of`;
				}
				r += ` education is unimportant. `;
			}
		} else if (slave.intelligence > 50) {
			if (slave.intelligence + slave.intelligenceImplant > 95) {
				r += `but ${his} facial expressions reveal ${he} is incisive, quick, cunning; with ${his} education, ${he} can be considered <span class="deepskyblue">brilliant.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 50) {
				r += `but ${his} face is alive with intelligence; with ${his} miseducation, however, ${he} performs merely <span class="orangered">above average.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} face is alive with intelligence; ${he} is both <span class="deepskyblue">highly intelligent</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else {
				r += `but ${his} face is alive with intelligence; ${he} is so <span class="deepskyblue">highly intelligent</span> that ${his} `;
				if (slave.intelligenceImplant > 0) {
					r += `meager`;
				} else if (slave.intelligenceImplant <= -15) {
					r += `miseducation`;
				} else {
					r += `lack of`;
				}
				r += ` education is unimportant. `;
			}
		} else if (slave.intelligence > 15) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				r += `but ${his} face is alive with intelligence; with ${his} education, ${he} can be considered <span class="deepskyblue">highly intelligent.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 15) {
				r += `but ${his} facial expressions reveal ${his} cleverness; with ${his} miseducation, however, ${he} performs merely <span class="orangered">averagely.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} facial expressions reveal ${his} cleverness; ${he} is of <span class="deepskyblue">above average intelligence</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `but ${his} facial expressions reveal ${his} cleverness; ${he} is of <span class="deepskyblue">above average intelligence</span> despite ${his} miseducation. `;
			} else {
				r += `but ${his} facial expressions reveal ${his} cleverness; ${he} is of <span class="deepskyblue">above average intelligence</span> despite being undereducated. `;
			}
		} else if (slave.intelligence >= -15) {
			if (slave.intelligence + slave.intelligenceImplant > 15) {
				r += `but ${his} facial expressions reveal ${his} cleverness; with ${his} education, ${he} can be considered of <span class="deepskyblue">above average intelligence.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -15) {
				r += `but ${his} facial expressions reveal ${his} alertness; with ${his} miseducation, however, ${he} exhibits <span class="orangered">below average intelligence.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} facial expressions reveal ${his} alertness; ${he} is of average intelligence due to being `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `but ${his} facial expressions reveal ${his} alertness; ${he} is of average intelligence even with ${his} miseducation. `;
			} else {
				r += `but ${his} facial expressions reveal ${his} alertness; ${he} is of average intelligence and is undereducated. `;
			}
		} else if (slave.intelligence >= -50) {
			if (slave.intelligence + slave.intelligenceImplant >= -15) {
				r += `but ${his} facial expressions reveal ${his} alertness; with ${his} education, ${he} can be considered of average intelligence. `;
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				r += `but ${his} facial expressions reveal ${he} is rather dim; with ${his} miseducation, however, ${he} may as well be <span class="orangered">an idiot.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} facial expressions reveal ${he} is rather dim; ${he} is of <span class="orangered">below average intelligence</span> despite having been `;
				if (slave.intelligenceImplant >= 30) {
					r += `thoroughly `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `but ${his} facial expressions reveal ${he} is rather dim; ${he} is <span class="orangered">below average intelligence</span> before taking ${his} miseducation into account. `;
			} else {
				r += `but ${his} facial expressions reveal ${he} is rather dim; ${he} is of <span class="orangered">below average intelligence</span> and is poorly educated. `;
			}
		} else if (slave.intelligence >= -95) {
			if (slave.intelligence + slave.intelligenceImplant >= -50) {
				r += `but ${his} facial expressions reveal ${he} is rather dim; even with ${his} education, ${he} can only be considered of <span class="orangered">below average intelligence.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -95) {
				r += `but ${his} facial expressions reveal ${he} is as dull as ${his} eyes; with ${his} miseducation, however, ${he} may as well be <span class="orangered">a complete moron.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `but ${his} facial expressions reveal ${he} is as dull as ${his} eyes; ${he} is <span class="orangered">quite stupid</span> despite having `;
				if (slave.intelligenceImplant >= 30) {
					r += `an advanced`;
				} else {
					r += `some`;
				}
				r += ` education. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `but ${his} facial expressions reveal ${he} is as dull as ${his} eyes; ${he} is <span class="orangered">so stupid</span> ${his} miseducation had little effect. `;
			} else {
				r += `but ${his} facial expressions reveal ${he} is as dull as ${his} eyes; ${he} is <span class="orangered">quite stupid</span> and ignorant. `;
			}
		} else {
			r += `though you doubt it would be much different if ${he} could see; `;
			if (slave.intelligence + slave.intelligenceImplant >= -95) {
				r += `even with ${his} education, ${he} is still <span class="orangered">really stupid.</span>`;
			} else if (slave.intelligence + slave.intelligenceImplant < -115) {
				r += `with ${his} miseducation, ${he} may as well be <span class="orangered">brain dead</span> given how long it takes for ${him} to form a coherent thought. `;
			} else if (slave.intelligenceImplant > 0) {
				r += `${he} is <span class="orangered">a moron,</span> yet somehow still remembers the basics of an education. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `${he} is such <span class="orangered">a moron</span> that ${his} miseducation is completely unapparent. `;
			} else {
				r += `${he} is <span class="orangered">a moron,</span> and ignorant to boot. `;
			}
		}
	} else {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye", "eyes", false)} ${hasBothEyes(slave) ? "are" : "is"} dull and vacant; ${he} lacks the capacity for higher thought.`;
		} else if (slave.intelligence > 95) {
			r += `${His} ${App.Desc.eyeColor(slave)}-eyed gaze is incisive, quick, cunning; `;
			if (slave.intelligence + slave.intelligenceImplant >= 130) {
				r += `with ${his} education, ${he} is so far <span class="deepskyblue">beyond brilliant</span> that ${he} is nearly peerless. `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 95) {
				r += `with ${his} miseducation, however, ${he} is merely <span class="orangered">highly intelligent.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `${he} is both <span class="deepskyblue">brilliant</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				// placeholder as this is a technical impossibility for now
			} else {
				r += `${he} is so <span class="deepskyblue">brilliant</span> that ${his} `;
				if (slave.intelligenceImplant > 0) {
					r += `meager`;
				} else {
					r += `lack of`;
				}
				r += ` education is unimportant. `;
			}
		} else if (slave.intelligence > 50) {
			if (slave.intelligence + slave.intelligenceImplant > 95) {
				r += `${His} ${App.Desc.eyeColor(slave)}-eyed gaze is incisive, quick, cunning; with ${his} education, ${he} can be considered <span class="deepskyblue">brilliant.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 50) {
				r += `${His} ${App.Desc.eyesColor(slave, "", "eye", "eyes", false)} ${hasBothEyes(slave) ? "are" : "is"} alive with intelligence; with ${his} miseducation, however, ${he} performs merely <span class="orangered">above average.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `${His} ${App.Desc.eyesColor(slave, "", "eye", "eyes", false)} ${hasBothEyes(slave) ? "are" : "is"} alive with intelligence; ${he} is both <span class="deepskyblue">highly intelligent</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else {
				r += `${His} ${App.Desc.eyesColor(slave, "", "eye", "eyes", false)} ${hasBothEyes(slave) ? "are" : "is"} alive with intelligence; ${he} is so <span class="deepskyblue">highly intelligent</span> that ${his} `;
				if (slave.intelligenceImplant > 0) {
					r += `meager`;
				} else if (slave.intelligenceImplant <= -15) {
					r += `miseducation`;
				} else {
					r += `lack of`;
				}
				r += ` education is unimportant. `;
			}
		} else if (slave.intelligence > 15) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye", "eyes", false)} ${hasBothEyes(slave) ? "are" : "is"} `;
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				r += `alive with intelligence; with ${his} education, ${he} can be considered <span class="deepskyblue">highly intelligent.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant <= 15) {
				r += `clever; with ${his} miseducation, however, ${he} performs merely <span class="orangered">averagely.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `clever; ${he} is of <span class="deepskyblue">above average intelligence</span> and `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `clever; ${he} is of <span class="deepskyblue">above average intelligence</span> despite ${his} miseducation. `;
			} else {
				r += `clever; ${he} is of <span class="deepskyblue">above average intelligence</span> despite being undereducated. `;
			}
		} else if (slave.intelligence >= -15) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye", "eyes", false)} ${hasBothEyes(slave) ? "are" : "is"} `;
			if (slave.intelligence + slave.intelligenceImplant > 15) {
				r += `clever; with ${his} education, ${he} can be considered of <span class="deepskyblue">above average intelligence.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -15) {
				r += `alert; with ${his} miseducation, however, ${he} exhibits <span class="orangered">below average intelligence.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `alert; ${he} is of average intelligence due to being `;
				if (slave.intelligenceImplant >= 30) {
					r += `well `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `alert; ${he} is of average intelligence even with ${his} miseducation. `;
			} else {
				r += `alert; ${he} is of average intelligence and is undereducated. `;
			}
		} else if (slave.intelligence >= -50) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye", "eyes", false)} ${hasBothEyes(slave) ? "are" : "is"} `;
			if (slave.intelligence + slave.intelligenceImplant >= -15) {
				r += `alert; with ${his} education, ${he} can be considered of average intelligence. `;
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				r += `dim; with ${his} miseducation, however, ${he} may as well be <span class="orangered">an idiot.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `dim; ${he} is of <span class="orangered">below average intelligence</span> despite having been `;
				if (slave.intelligenceImplant >= 30) {
					r += `thoroughly `;
				}
				r += `educated. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `dim; ${he} is <span class="orangered">below average intelligence</span> before taking ${his} miseducation into account. `;
			} else {
				r += `dim; ${he} is of <span class="orangered">below average intelligence</span> and is poorly educated. `;
			}
		} else if (slave.intelligence >= -95) {
			r += `${His} ${App.Desc.eyesColor(slave, "", "eye", "eyes", false)} ${hasBothEyes(slave) ? "are" : "is"} `;
			if (slave.intelligence + slave.intelligenceImplant >= -50) {
				r += `dim; even with ${his} education, ${he} can only be considered of <span class="orangered">below average intelligence.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -95) {
				r += `dull; with ${his} miseducation, however, ${he} may as well be <span class="orangered">a complete moron.</span> `;
			} else if (slave.intelligenceImplant >= 15) {
				r += `dull; ${he} is <span class="orangered">quite stupid</span> despite having `;
				if (slave.intelligenceImplant >= 30) {
					r += `an advanced`;
				} else {
					r += `some`;
				}
				r += ` education. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `dull; ${he} is <span class="orangered">so stupid</span> ${his} miseducation had little effect. `;
			} else {
				r += `dull; ${he} is <span class="orangered">quite stupid</span> and ignorant. `;
			}
		} else {
			r += `${His} ${App.Desc.eyeColor(slave)}-eyed gaze betrays near-total insensibility; `;
			if (slave.intelligence + slave.intelligenceImplant >= -95) {
				r += `even with ${his} education, ${he} is still <span class="orangered">really stupid.</span> `;
			} else if (slave.intelligence + slave.intelligenceImplant < -115) {
				r += `with ${his} miseducation, ${he} may as well be <span class="orangered">brain dead</span> given how long it takes for ${him} to form a coherent thought. `;
			} else if (slave.intelligenceImplant > 0) {
				r += `${he} is <span class="orangered">a moron,</span> yet somehow still remembers the basics of an education. `;
			} else if (slave.intelligenceImplant <= -15) {
				r += `${he} is such <span class="orangered">a moron</span> that ${his} miseducation is completely unapparent. `;
			} else {
				r += `${he} is <span class="orangered">a moron,</span> and ignorant to boot. `;
			}
		}
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's age and health
 */
App.Desc.ageAndHealth = function(slave) {
	"use strict";
	const H = slave.health;
	const {
		he, him, his, He, boy, woman
	} = getPronouns(slave);

	let r = ``;
	let array;
	let age;
	let birthday = "";
	if (V.seeAge !== 0) {
		if (slave.birthWeek === 51) {
			birthday = `; ${his} birthday is next week`;
		} else if (slave.birthWeek === 0) {
			birthday = `; ${his} birthday was this past week`;
		} else {
			birthday = `; ${his} birthday is in ${52 - slave.birthWeek} weeks`;
		}
	}

	if (!slave.fuckdoll) {
		if (H.health < -90) {
			r += `${He} is nearly unresponsive and obviously <span class="red">dangerously unhealthy.</span>`;
		} else if (H.condition < -50) {
			r += `${He} is <span class="red">very unhealthy.</span>`;
		} else if (H.condition < -20) {
			r += `${He} is <span class="red">unhealthy.</span>`;
		} else if (H.condition <= 20) {
			r += `${He} is in <span class="yellow">fair health.</span>`;
		} else if (H.condition <= 50) {
			r += `${He} seems to be in <span class="green">good health.</span>`;
		} else if (H.condition <= 90) {
			r += `${He} seems to be in <span class="green">great health.</span>`;
		} else {
			r += `${He} almost gleams; ${he}'s in the absolute <span class="green">best of health.</span>`;
		}

		if (H.shortDamage > 5 || H.longDamage > 5 || H.condition < 0) {
			const ldc = H.longDamage > 5 || H.condition < 0 ? `,` : `.`;
			const c = H.condition < 0 ? `,` : `.`;

			let and = '';

			r += ` Upon closer inspection you note that ${he}`;

			array = [];
			if (H.shortDamage >= 100) {
				array.push(`looks <span class="red">absolutely brutalized</span> and will never be quite the way ${he} was${ldc}`);
			} else if (H.shortDamage >= 70) {
				array.push(`is <span class="red">gravely injured</span> with assured lasting effects${ldc}`);
			} else if (H.shortDamage >= 40) {
				array.push(`is <span class="red">seriously injured</span> with some lasting effects${ldc}`);
			} else if (H.shortDamage >= 20) {
				array.push(`is <span class="orange">injured${ldc}</span>`);
			} else if (H.shortDamage > 5) {
				array.push(`seems to have suffered a <span class="yellow">minor injury</span> recently${ldc}`);
			}

			if (H.longDamage > 5) {
				if (H.shortDamage > 5 && H.condition >= 0) {
					and = `and `;
				}

				if (H.longDamage >= 70) {
					array.push(`${and}is suffering heavily under accumulated <span class="red">permanent health problems${c}</span>`);
				} else if (H.longDamage >= 40) {
					array.push(`${and}has some clear <span class="red">permanent health issues${c}</span>`);
				} else if (H.longDamage >= 20) {
					array.push(`${and}shows signs of <span class="orange">lasting health problems${c}</span>`);
				} else {
					array.push(`${and}carries some <span class="yellow">minor niggles${c}</span>`);
				}
			}

			if (H.condition < 0) {
				if (H.shortDamage > 5 || H.longDamage > 5) {
					and = `and `;
				}

				if (H.condition < -80 && H.shortDamage !== 0 && H.longDamage !== 0) {
					array.push(`${and}has been treated so badly ${he} <span class="red">is close to the brink.</span>`);
				} else if (H.condition < -50) {
					array.push(`${and}appears to be in <span class="red">terrible condition.</span>`);
				} else if (H.condition < -20) {
					array.push(`${and}appears to be in <span class="orange">poor condition.</span>`);
				} else {
					array.push(`${and}could be in <span class="yellow">better condition.</span>`);
				}
			}

			r += ` ${array.join(' ')}`;
		}

		if (H.tired > 30) {
			r += ` Additionally, ${he} is also `;
			if (H.tired > 90) {
				r += ` <span class="red">exhausted.</span>`;
			} else if (H.tired > 60) {
				r += ` <span class="orange">fatigued.</span>`;
			} else {
				r += ` <span class="yellow">tired.</span>`;
			}
		}
		age = slave.actualAge + 1;
		r += ` ${He} `;
		if (slave.actualAge === V.idealAge || (slave.actualAge === V.idealAge - 1 && slave.birthWeek >= 52 && V.seeAge)) {
			if (slave.birthWeek >= 52 && V.seeAge) {
				r += `is going to turn ${age} this week`;
				if (V.showAgeDetail && V.seeAge !== 0 && slave.actualAge !== V.idealAge) {
					r += `, and people are already beginning to eye ${him}.`;
				} else {
					r += `.`;
				}
			} else if (!slave.birthWeek && V.seeAge) {
				r += `just turned ${num(slave.actualAge)} this week, which many citizens find especially appealing.`;
			} else if (slave.birthWeek < 4 && V.seeAge) {
				r += `only turned ${num(slave.actualAge)} this month. `;
			} else {
				r += `is ${num(slave.actualAge)} years old${birthday}. `;
			}
		} else if (slave.birthWeek >= 52 && V.seeAge) {
			r += `is going to turn ${age} this week,`;
		} else if (slave.actualAge < 3) {
			r += `is an infant, only `;
			if (V.showAgeDetail) {
				if (!slave.actualAge) {
					r += `${0 + V.week - slave.weekAcquired} weeks old${birthday}. `;
				} else if (slave.actualAge) {
					r += `${num(slave.actualAge)} year old${birthday}. `;
				} else {
					r += `${num(slave.actualAge)} years old${birthday}. `;
				}
			} else {
				if (!slave.actualAge) {
					r += `${0 + V.week - slave.weekAcquired} weeks old. `;
				} else if (slave.actualAge) {
					r += `${num(slave.actualAge)} year old. `;
				} else {
					r += `${num(slave.actualAge)} years old. `;
				}
			}
		} else if (slave.actualAge < 5) {
			r += `is a toddler, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `only ${num(slave.actualAge)} years old. `;
			}
		} else if (slave.actualAge < 13) {
			r += `is a little ${boy}, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `only ${num(slave.actualAge)} years old. `;
			}
		} else if (slave.actualAge < 16) {
			r += `is almost a child, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `less than 17 years old. `;
			}
		} else if (slave.actualAge < 17) {
			r += `is young and fresh at ${num(slave.actualAge)}${birthday}. `;
		} else if (slave.actualAge < 18) {
			r += `is young, fresh, and nearly 18${birthday}.`;
		} else if (slave.actualAge < 19) {
			r += `is ${num(slave.actualAge)} years old${birthday}. `;
		} else if (slave.actualAge < 20) {
			r += `is in ${his} final year as a teenager at age 19${birthday}. `;
		} else if (slave.actualAge < 26) {
			r += `is a young ${woman}, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `in ${his} early twenties. `;
			}
		} else if (slave.actualAge < 30) {
			r += `is a younger ${woman}, `;
			if (V.showAgeDetail) {
				r += `${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `in ${his} late twenties. `;
			}
		} else if (slave.actualAge < 36) {
			if (V.showAgeDetail) {
				r += `is ${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `is in ${his} early thirties. `;
			}
		} else if (slave.actualAge < 40) {
			r += `is middle-aged for a slave, `;
			if (V.showAgeDetail) {
				r += `at ${num(slave.actualAge)} years old${birthday}. `;
			} else {
				r += `in ${his} late thirties. `;
			}
		} else {
			r += `is old for a slave, `;
			if (V.showAgeDetail) {
				r += `at ${num(slave.actualAge)} years old${birthday}. `;
			} else {
				if (slave.actualAge < 50) {
					r += `in ${his} forties. `;
				} else if (slave.actualAge < 60) {
					r += `in ${his} fifties. `;
				} else if (slave.actualAge < 70) {
					r += `extremely old for a slave, in ${his} sixties. `;
				} else if (slave.actualAge < 80) {
					r += `extremely old for a slave, in ${his} seventies. `;
				} else if (slave.actualAge < 90) {
					r += `extremely old for a slave, in ${his} eighties. `;
				} else if (slave.actualAge < 100) {
					r += `extremely old for a slave, in ${his} nineties. `;
				} else if (slave.actualAge >= 100) {
					r += `ancient by any measure, over a century old. `;
				}
			}
		}

		if (slave.actualAge !== slave.physicalAge) {
			r += ` However, ${he} has the body of a person ${num(slave.physicalAge)} years old; `;
			if (slave.geneticQuirks.progeria === 2 && slave.physicalAge > slave.actualAge && (V.geneticMappingUpgrade >= 1 || (slave.physicalAge >= slave.actualAge + 20 && slave.tankBaby === 0))) {
				if (V.geneticMappingUpgrade > 0) {
					r += `not at all surprising, given ${his} genetic condition. `;
				} else {
					r += `a disturbing contrast that suggests deep medical problems. `;
				}
			} else if (slave.physicalAge < 18 && slave.actualAge >= 18) {
				r += `a stark contrast given ${his} maturity. `;
			} else if (slave.physicalAge >= 18 && slave.actualAge < 18) {
				r += `a noticeable difference thanks to ${his} immaturity. `;
			} else if (slave.physicalAge <= slave.actualAge - 20 || slave.physicalAge >= slave.actualAge + 20) {
				r += `a shocking difference from ${his} actual age. `;
			} else if (slave.physicalAge <= slave.actualAge - 10 || slave.physicalAge >= slave.actualAge + 10) {
				r += `a noticeable difference from ${his} actual age. `;
			} else if (slave.physicalAge <= slave.actualAge - 5 || slave.physicalAge >= slave.actualAge + 5) {
				r += `a barely noticeable difference from ${his} actual age. `;
			} else {
				r += `though it is hard to tell the difference from ${his} actual age. `;
			}
		}
		/*
		 ** This section replaces the age/therapy texts, giving more details for the NCS condition.
		 */
		if (slave.geneMods.NCS) {
			let bodyNCS;
			if (slave.vagina < 0 && slave.dick <= 0) {
				bodyNCS = "childlike";
			} else if (slave.vagina < 0 && slave.dick > 0) {
				bodyNCS = "shota";
			} else if (slave.vagina > 0 && slave.dick <= 0) {
				bodyNCS = "loli";
			} else {
				bodyNCS = "loli/shota";
			}
			r += ` ${He} appears to be ${slave.visualAge} years old and ${he} `;
			if (slave.visualAge <= 8) {
				r += `has induced <span class="orange">NCS</span> and will always have a ${bodyNCS} body, no matter how long ${he} lives. `;
			} else if (slave.visualAge < 13) {
				r += `has induced <span class="orange">NCS</span> and will have a ${bodyNCS} body for the rest of ${his} life. `;
			} else if (slave.visualAge < 20) {
				r += `still has a teen body for now, but with ${his} <span class="orange">NCS,</span> ${he} will eventually regress in age to look like a little ${boy} again. `;
			} else {
				r += `still has the body of an adult, but ${his} <span class="orange">NCS</span> has `;
				if (slave.physicalAge - slave.visualAge <= 5) {
					r += `not really begun to youthen ${his} appearance yet. `;
				} else if (slave.physicalAge - slave.visualAge <= 10) {
					r += `clearly been at work on ${him}, making ${him} appear younger. `;
				} else if (slave.physicalAge - slave.visualAge <= 20) {
					r += `obviously helped take more than a decade off of ${his} age. `;
				} else {
					r += `intensely youthened ${him}. `;
				}
			}
		} else if (slave.physicalAge !== slave.visualAge) {
			let neoteny;
			if (slave.geneticQuirks.neoteny === 2 && slave.physicalAge > slave.visualAge && (V.geneticMappingUpgrade >= 1 || slave.physicalAge >= slave.visualAge + 5)) {
				if (V.geneticMappingUpgrade > 0) {
					r += `Due to ${his} neotenic qualities, `;
				} else {
					r += `Oddly enough, `;
				}
				r += `${he} still resembles a young ${boy} of around ${slave.visualAge}. `;
				neoteny = true;
			} else if (slave.ageImplant > 0 || slave.visualAge >= slave.physicalAge + 5) {
				if (slave.visualAge <= slave.physicalAge - 20 || slave.visualAge >= slave.physicalAge + 20) {
					r += ` ${He} has undergone radical age therapy that makes ${him} look `;
				} else if (slave.visualAge <= slave.physicalAge - 10 || slave.visualAge >= slave.physicalAge + 10) {
					r += ` ${He} has undergone drastic age therapy that makes ${him} look `;
				} else if (slave.visualAge <= slave.physicalAge - 5 || slave.visualAge >= slave.physicalAge + 5) {
					r += ` ${He} has undergone noticeable age therapy that makes ${him} look `;
				} else {
					r += ` ${He} has undergone subtle age therapy that makes ${him} look `;
				}
			} else {
				r += ` For various reasons, ${he} looks `;
			}
			if (!neoteny) {
				if (slave.physicalAge > slave.visualAge) {
					if (slave.physicalAge < slave.visualAge + 5) {
						r += `a slightly younger ${slave.visualAge}. `;
					} else if (slave.visualAge < 20) {
						r += `like ${he}'s barely an adult. `;
					} else if (slave.visualAge < 25) {
						r += `barely into ${his} early twenties. `;
					} else if (slave.visualAge < 30) {
						r += `like ${he}'s still in ${his} twenties. `;
					} else if (slave.visualAge < 35) {
						r += `barely thirty. `;
					} else if (slave.visualAge < 40) {
						r += `still in ${his} thirties. `;
					} else if (slave.visualAge < 45) {
						r += `barely forty. `;
					} else if (slave.visualAge < 50) {
						r += `still in ${his} forties. `;
					} else if (slave.visualAge < 55) {
						r += `barely fifty. `;
					} else if (slave.visualAge < 60) {
						r += `still in ${his} fifties. `;
					} else if (slave.visualAge < 65) {
						r += `barely sixty. `;
					} else if (slave.visualAge < 70) {
						r += `still in ${his} sixties. `;
					} else if (slave.visualAge < 75) {
						r += `barely seventy. `;
					} else if (slave.visualAge < 80) {
						r += `still in ${his} seventies. `;
					} else if (slave.visualAge < 85) {
						r += `barely eighty. `;
					} else if (slave.visualAge < 90) {
						r += `still in ${his} eighties. `;
					} else if (slave.visualAge < 95) {
						r += `barely ninety. `;
					} else if (slave.visualAge < 100) {
						r += `still in ${his} nineties. `;
					} else {
						r += `a younger ${slave.visualAge}. `;
					}
				} else {
					if (slave.physicalAge > slave.visualAge - 5) {
						r += `a slightly older ${slave.visualAge}. `;
					} else if (slave.visualAge < 20) {
						r += `like a fresh adult. `;
					} else if (slave.visualAge < 25) {
						r += `just over twenty. `;
					} else if (slave.visualAge < 30) {
						r += `nearly thirty. `;
					} else if (slave.visualAge < 35) {
						r += `just over thirty. `;
					} else if (slave.visualAge < 40) {
						r += `nearly forty. `;
					} else if (slave.visualAge < 45) {
						r += `just over forty. `;
					} else if (slave.visualAge < 50) {
						r += `nearly fifty. `;
					} else if (slave.visualAge < 55) {
						r += `just over fifty. `;
					} else if (slave.visualAge < 60) {
						r += `nearly sixty. `;
					} else if (slave.visualAge < 65) {
						r += `just over sixty. `;
					} else if (slave.visualAge < 70) {
						r += `nearly seventy. `;
					} else if (slave.visualAge < 75) {
						r += `just over seventy. `;
					} else if (slave.visualAge < 80) {
						r += `nearly eighty. `;
					} else if (slave.visualAge < 85) {
						r += `just over eighty. `;
					} else if (slave.visualAge < 90) {
						r += `nearly ninety. `;
					} else if (slave.visualAge < 95) {
						r += `just over ninety. `;
					} else {
						r += `an ancient ${slave.visualAge}. `;
					}
				}
			}
			if (slave.geneMods.immortality === 1) {
				r += `Due to extensive genetic modification, ${he} is essentially immortal and will not die of old age. `;
			}
		}
	} else {
		r += ` The Fuckdoll gives no external indication of ${his} health or age, but upon query ${his} systems reports that ${he} is `;
		if (H.health < -90) {
			r += `<span class="red">in dangerously poor health,</span>`;
		} else if (H.health < -50) {
			r += `<span class="red">in poor health,</span>`;
		} else if (H.health < -20) {
			r += `<span class="red">unhealthy,</span>`;
		} else if (H.health <= 20) {
			r += `<span class="yellow">healthy,</span>`;
		} else if (H.health <= 50) {
			r += `<span class="green">very healthy,</span>`;
		} else {
			r += `<span class="green">extremely healthy,</span>`;
		}
		r += ` and ${slave.physicalAge} years old.`;

		if (H.shortDamage !== 0 || H.longDamage !== 0 || H.illness > 1) {
			r += ` Diagnostics also report that`;

			if (H.shortDamage > 0) {
				r += ` ${he} is`;
			}
			if (H.shortDamage >= 100) {
				r += ` <span class="red">critically damaged</span>`;
			} else if (H.shortDamage >= 70) {
				r += ` <span class="red">gravely damaged</span>`;
			} else if (H.shortDamage >= 40) {
				r += ` <span class="red">seriously damaged</span>`;
			} else if (H.shortDamage >= 20) {
				r += ` <span class="red">damaged</span>`;
			} else if (H.shortDamage > 0) {
				r += ` <span class="yellow">slightly damaged</span>`;
			}

			if (H.shortDamage !== 0 && H.longDamage !== 0 && H.illness > 1) {
				r += `,`;
			} else if (H.shortDamage !== 0 && H.longDamage !== 0) {
				r += ` and`;
			}
			if (H.longDamage > 0) {
				r += ` projected physical performance falls`;
			}
			if (H.longDamage >= 50) {
				r += ` <span class="red">far below benchmark margins</span>`;
			} else if (H.longDamage >= 30) {
				r += ` <span class="red">below benchmark margins</span>`;
			} else if (H.longDamage >= 10) {
				r += ` <span class="red">barely within benchmark margins</span>`;
			} else if (H.longDamage > 0) {
				r += ` <span class="yellow">just short of the optimal benchmark</span>`;
			}

			if ((H.shortDamage !== 0 || H.longDamage !== 0) && H.illness > 1) {
				r += ` and`;
			}
			if (H.illness > 1) {
				r += ` ${he} is`;
			}
			if (slave.health.illness === 2) {
				r += ` <span class="yellow">affected by a minor illness</span>`;
			} else if (slave.health.illness === 3) {
				r += ` <span class="red">affected by an illness</span>`;
			} else if (slave.health.illness === 4) {
				r += ` <span class="red">seriously affected by an illness</span>`;
			} else if (slave.health.illness === 5) {
				r += ` <span class="red">dangerously affected by an illness</span>`;
			}
		}
		r += `.`;
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Slave's mods.
 * @param {string|undefined} surface
 */
App.Desc.mods = function(slave, surface) {
	if (V.showBodyMods !== 1) {
		return undefined;
	}
	if (slave.fuckdoll !== 0 && !["anus", "lips", "vagina"].includes(surface)) { /* Fuckdoll vulva and anus alone are visible, plus enormous lips */
		return App.Desc.piercing(slave, surface); // Most piercings are part of the suit and have appropriate descriptions
	}
	return [
		App.Desc.piercing(slave, surface),
		App.Desc.tattoo(slave, surface),
		App.Desc.brand(slave, surface),
		App.Desc.scar(slave, surface)
	].join(' ');
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Description of slave's limbs
 */
App.Desc.limbs = function(slave) {
	"use strict";
	let r = ``;
	const {
		he, his, He, him
	} = getPronouns(slave);

	/* TODO: @Arkerthan
	description similar in style to the commented out one instead of this simple version.
	*/

	if (isAmputee(slave)) {
		r += `${He} is a quadruple amputee and has not been equipped with prosthetics.`;
	} else if (getLeftArmID(slave) === getRightArmID(slave) &&
		getLeftArmID(slave) === getLeftLegID(slave) &&
		getLeftArmID(slave) === getRightLegID(slave)) {
		if (getLeftArmID(slave) !== 1 && getLeftArmID(slave) < 6) {
			r += `${He} has ${idToDescription(getLeftArmID(slave))} limbs.`;
		} else if (getLeftArmID(slave) > 6) {
			r += `${He} has ${idToDescription(getLeftArmID(slave))} limbs, making ${him} quadrupedal.`;
		}
	} else {
		if (!hasAnyArms(slave)) {
			r += `Both of ${his} arms have been amputated`;
		} else if (!hasBothArms(slave) && !hasAnyQuadrupedArms(slave)) {
			if (hasLeftArm(slave)) {
				r += `${He} has ${addA(idToDescription(getLeftArmID(slave)))} left arm, but ${his} right has been amputated,`;
			} else {
				r += `${He} has ${addA(idToDescription(getRightArmID(slave)))} right arm, but ${his} left has been amputated,`;
			}
		} else if (!hasBothArms(slave) && hasAnyQuadrupedArms(slave)) {
			if (hasLeftArm(slave)) {
				r += `${He} has ${addA(idToDescription(getLeftArmID(slave)))} left foreleg, but ${his} right has been amputated,`;
			} else {
				r += `${He} has ${addA(idToDescription(getRightArmID(slave)))} right foreleg, but ${his} left has been amputated,`;
			}
		} else if (hasBothQuadrupedArms(slave) && isQuadrupedal(slave) && getLeftArmID(slave) !== getRightArmID(slave)) {
			r += `${He} has ${addA(idToDescription(getLeftArmID(slave)))} left foreleg, ${addA(idToDescription(getRightArmID(slave)))} right foreleg,`;
		} else if (hasBothQuadrupedArms(slave) && isQuadrupedal(slave) && (getLeftArmID(slave) === getRightArmID(slave))) {
			r += `${He} has ${idToDescription(getLeftLegID(slave))} forelegs, with which she can't grab or hold anything,`;
		} else {
			if (getLeftArmID(slave) === getRightArmID(slave) && !hasAnyQuadrupedArms(slave)) {
				r += `${He} has ${idToDescription(getLeftArmID(slave))} arms`;
			} else {
				r += `${He} has ${addA(idToDescription(getRightArmID(slave)))} right arm, but ${addA(idToDescription(getLeftArmID(slave)))} left arm`;
			}
		}
		r += ` and `;
		if (!hasAnyLegs(slave)) {
			r += `both of ${his} legs have been amputated.`;
		} else if (!hasBothLegs(slave) && !hasAnyQuadrupedLegs(slave)) {
			if (hasLeftLeg(slave)) {
				r += `${he} has ${addA(idToDescription(getLeftLegID(slave)))} left leg, but ${his} right has been amputated.`;
			} else {
				r += `${he} has ${addA(idToDescription(getRightLegID(slave)))} right leg, but ${his} left has been amputated.`;
			}
		} else if (!hasBothLegs(slave) && hasAnyQuadrupedLegs(slave)) {
			if (hasLeftLeg(slave)) {
				r += `${he} has ${addA(idToDescription(getLeftLegID(slave)))} left hind leg, but ${his} right has been amputated.`;
			} else {
				r += `${he} has ${addA(idToDescription(getRightLegID(slave)))} right hind leg, but ${his} left has been amputated.`;
			}
		} else if (hasBothQuadrupedLegs(slave) && isQuadrupedal(slave) && getLeftLegID(slave) !== getRightLegID(slave)) {
			r += ` ${addA(idToDescription(getLeftLegID(slave)))} left hind leg, ${addA(idToDescription(getRightLegID(slave)))} right hind leg.`;
		} else if (hasBothQuadrupedLegs(slave) && isQuadrupedal(slave) && (getLeftLegID(slave) === getRightLegID(slave))) {
			r += `${he} has ${idToDescription(getLeftLegID(slave))} hind legs.`;
		} else {
			if (getLeftLegID(slave) === getRightLegID(slave) && !hasAnyQuadrupedLegs(slave)) {
				r += `${he} has ${idToDescription(getLeftLegID(slave))} legs.`;
			} else {
				r += `${he} has ${addA(idToDescription(getRightLegID(slave)))} right leg, but ${addA(idToDescription(getLeftLegID(slave)))} left leg.`;
			}
		}
	}
	if (hasAnyQuadrupedLimbs(slave) && !(getLeftArmID(slave) === getRightArmID(slave) &&
	getLeftArmID(slave) === getLeftLegID(slave) &&
	getLeftArmID(slave) === getRightLegID(slave))){
		r += `The nature of ${his} prosthetics force ${him} to walk like a quadrupedal animal.`;
	}
	return r;
	/*
	if (slave.am p) {
		if (slave.am p === -1) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with a set of modern prosthetic limbs that allow ${him} a fairly normal life. `;
		} else if (slave.am p === -2) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with P-Limbs customized for sex. ${His} fingertips vibrate, ${his} finger joints are masked to prevent pinching, and ${his} hands can dispense lube. `;
		} else if (slave.am p === -3) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with P-Limbs customized to look natural. They are covered in a material that closely mimics living ${slave.skin} skin, and their servos are noise dampened. `;
		} else if (slave.am p === -4) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with P-Limbs customized for combat. They're hardened, strengthened, and more responsive, and they conceal taser knuckles and extensible forearm blades. `;
		} else if (slave.am p === -5) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> but ${he}'s equipped with advanced cybernetic P-Limbs. The ultimate fusion of combat effectiveness and instruments of pleasure, they're capable of performing multiple functions. They can enhance sex through ${his} vibrating hands and increase ${his} combat skills with hardened, yet flexible artificial muscles. They have an advanced artificial skin that can send electrical impulses that can cause stimulation or extreme pain. `;
		} else if (slave.am p > 0) {
			r += `${slave.slaveName} is a <span class="pink">quadruple amputee,</span> making ${him} a convenient torso-only sex toy. `;
		} else {
			r += `The most obvious thing about ${slave.slaveName} is that ${he} is a <span class="pink">quadruple amputee:</span> ${he} has neither arms nor legs. `;
		}
	} else if ((!hasBothArms(slave)) || (!hasBothLegs(slave))) {
		r += `The most obvious thing about ${slave.slaveName} is that ${he} is `;
		if (((!hasAnyArms(slave)) && (!hasBothLegs(slave))) || ((!hasBothArms(slave)) && (!hasAnyLegs(slave)))) {
			r += `a triple `;
		} else if (((hasAnyArms(slave)) && (hasBothLegs(slave))) || ((hasBothArms(slave)) && (hasAnyLegs(slave)))) {
			r += `an `;
		} else {
			r += `a double `;
		}
		r += `amputee: `;
		if (!hasAnyArms(slave)) {
			r += `both of ${his} arms `;
		} else if (!hasLeftArm(slave)) {
			r += `${his} left arm `;
		} else if (!hasRightArm(slave)) {
			r += `${his} right arm `;
		}
		if ((!hasBothArms(slave)) && (!hasBothLegs(slave))) {
			r += `and `;
		}
		if (!hasAnyLegs(slave)) {
			r += `both of ${his} legs `;
		} else if (!hasLeftLeg(slave)) {
			r += `${his} left leg `;
		} else if (!hasRightLeg(slave)) {
			r += `${his} right leg `;
		}
		if (((hasAnyArms(slave)) && (hasBothLegs(slave))) || ((hasBothArms(slave)) && (hasAnyLegs(slave)))) {
			r += `has been reduced to a stump.`;
		} else {
			r += `have been reduced to stumps.`;
		}
	}
	return r;
	}*/
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.inscrip = function(slave) {
	function fetishToObject() {
		switch (slave.fetish) {
			case "buttslut":
				return "Buttsex!";
			case "cumslut":
				return "Cum!";
			case "masochist":
			case "sadist":
				return "Rape!";
			case "dom":
				return "Topping!";
			case "submissive":
				return "Subbing!";
			case "boobs":
				return "Tits!";
			case "pregnancy":
				return "Sperm!";
		}
		if (slave.energy > 95) {
			return "Cock!";
		}
		return null;
	}

	let object = slave.fetishKnown === 1 ? fetishToObject() : null;
	if (!object) {
		object = V.PC.title === 0 ? "Mistress!" : "Master!";
	}
	return `"I <3 ${object}"`;
};

/**
 * @param {string} surface
 * @returns {object} Checks if body part has an opposite side. Returns an object with the appropriate part as center if it has no mirror, or left/right/both if it does.
 */
App.Desc.oppositeSides = function(surface) {
	let parts = {};
	if (["ear", "cheek", "shoulder", "breast", "upper arm", "lower arm", "hand", "wrist", "testicle", "buttock", "thigh", "calf", "ankle", "foot"].includes(surface) || surface.startsWith("left ") || surface.startsWith("right ")) {
		// set up a left part and a right to check for a mirror brand or marking
		if (surface.startsWith("left ") || surface.startsWith("right ")) {
			// find root word
			if (surface.startsWith("left ")) {
				surface = surface.replace("left ", "");
			} else if (surface.startsWith("right ")) {
				surface = surface.replace("right ", "");
			}
		} else if (surface === "feet") {
			parts.both = surface;
			surface = "foot";
		} else if (surface === "calves") {
			parts.both = surface;
			surface = "calf";
		}
		parts.left = "left " + surface;
		parts.right = "right " + surface;
		if (!parts.both) {
			parts.both = surface + "s";
		}
	} else {
		parts.center = surface;
	}
	return parts;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} markType
 * @returns {object} Returns an object containing marks that are not explicitly described elsewhere, so they can be placed in a single sentence.
 */
App.Desc.extraMarks = function(slave, markType) {
	let extras = {};
	let slaveMarks = Object.keys(slave[markType]);
	if (["brand", "scar"].includes(markType)) {
		for (const bodyPart of slaveMarks) {
			if (![
				"left ear", "right ear",
				"left cheek", "right cheek",
				"lips", "neck",
				"left shoulder", "right shoulder",
				"left breast", "right breast",
				"left upper arm", "right upper arm",
				"left lower arm", "right lower arm",
				"left hand", "right hand",
				"left wrist", "right wrist",
				"back", "lower back",
				"penis",
				"left testicle", "right testicle",
				"pubic mound",
				"belly",
				"left buttock", "right buttock",
				"anus", "asshole",
				"left thigh", "right thigh",
				"left calf", "right calf",
				"left ankle", "right ankle",
				"left foot", "right foot"
			].includes(bodyPart)) {
				extras[bodyPart] = slave[markType][bodyPart];
			}
		}
	}
	return extras;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} short description of the slaves limbs.
 */
App.Desc.shortLimbs = function(slave) {
	let r = "";

	function desc(id, limb) {
		switch (id) {
			case 0:
				return limb + "Amp ";
			case 1:
				return "";
			case 2:
				return limb + "P-Limb ";
			case 3:
				return limb + "Sex P-Limb ";
			case 4:
				return limb + "Beauty P-Limb ";
			case 5:
				return limb + "Combat P-Limb ";
			case 6:
				return limb + "Cyber P-Limb ";
			case 7:
				return limb + "Quad-Feline ";
			case 8:
				return limb + "Quad-Canine ";
			case 9:
				return limb + "Combat Feline ";
			case 10:
				return limb + "Combat Canine ";
			default:
				return "unknown ID: " + id;
		}
	}

	if (getLeftArmID(slave) === getRightArmID(slave) &&
		getLeftArmID(slave) === getLeftLegID(slave) &&
		getLeftArmID(slave) === getRightLegID(slave)) {
		r += desc(getLeftArmID(slave), "");
	} else {
		if (getLeftArmID(slave) === getRightArmID(slave)) {
			r += desc(getLeftArmID(slave), "Arms:");
		} else {
			r += desc(getLeftArmID(slave), "LArm:");
			r += desc(getRightArmID(slave), "RArm:");
		}

		if (getLeftLegID(slave) === getRightLegID(slave)) {
			r += desc(getLeftLegID(slave), "Legs:");
		} else {
			r += desc(getLeftLegID(slave), "LLeg:");
			r += desc(getRightLegID(slave), "RLeg:");
		}
	}

	r += " ";
	if (!canMove(slave)) {
		r += " Immob ";
	} else if (!canWalk(slave)) {
		r += " Hindered ";
	}
	if (slave.heels === 1) {
		r += " Heel ";
	}

	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} long description of the slaves limbs.
 */
App.Desc.longLimbs = function(slave) {
	let r = "";
	switch (getLimbCount(slave, 0)) {
		case 1:
			r += "Amputee. ";
			break;
		case 2:
			r += "Double Amputee. ";
			break;
		case 3:
			r += "Triple Amputee. ";
			break;
		case 4:
			r += "Quadruple Amputee. ";
			break;
	}

	if (hasAnyProstheticLimbs(slave)) {
		// count limbs
		switch (getLimbCount(slave, 102)) {
			case 1:
				r = "One ";
				break;
			case 2:
				r = "Two ";
				break;
			case 3:
				r = "Three ";
				break;
			case 4:
				r = "Four ";
				break;
		}

		// find out if all prosthetics are the same:
		let id;
		let count = 0;

		if (getLeftArmID(slave) >= 2) {
			id = getLeftArmID(slave);
			count++;
		}
		if (getRightArmID(slave) >= 2) {
			if (id) {
				if (id === getRightArmID(slave)) {
					count++;
				}
			} else {
				id = getRightArmID(slave);
				count++;
			}
		}
		if (getLeftLegID(slave) >= 2) {
			if (id) {
				if (id === getLeftLegID(slave)) {
					count++;
				}
			} else {
				id = getLeftLegID(slave);
				count++;
			}
		}
		if (getRightLegID(slave) >= 2) {
			if (id) {
				if (id === getRightLegID(slave)) {
					count++;
				}
			} else {
				id = getRightLegID(slave);
				count++;
			}
		}

		if (count === getLimbCount(slave, 102)) { // all prosthetics are the same
			switch (id) {
				case 3:
					r += "sexy ";
					break;
				case 4:
					r += "beautiful ";
					break;
				case 5:
					r += "deadly ";
					break;
				case 6:
					r += "cyber ";
					break;
				case 7:
					r += "quadruped feline ";
					break;
				case 8:
					r += "quadruped canine ";
					break;
				case 9:
					r += "feline combat ";
					break;
				case 10:
					r += "canine combat ";
					break;
			}
			if (count > 1) {
				r += "prosthetic limbs. ";
			} else {
				r += "prosthetic limb. ";
			}
		} else {
			// only reachable with count > 1
			r += "mixed prosthetic limbs. ";
		}
	}

	if (!canMove(slave)) {
		r += "Immobile. ";
	} else if (!canWalk(slave)) {
		r += "Hindered. ";
	}
	if (slave.heels === 1) {
		r += "Heeled. ";
	}

	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} long description of the slave's sexual history.
 */
App.Desc.sexualHistory = function(slave) {
	const {He, he, his} = getPronouns(slave);
	const weeksOwned = V.week - slave.weekAcquired;

	let r = `${He} has been with you `;
	if (slave.weekAcquired <= 0) {
		r += `since before you owned the arcology, `;
	} else if (slave.weekAcquired === 1) {
		r += `since you first took control of the arcology, `;
	} else {
		r += `for ${years(Math.max(weeksOwned, 1))}, `;
	}

	const sexTypes = ["mammary", "vaginal", "anal", "penetrative", "oral", "bestiality", "publicUse"];
	const totalSex = sexTypes.reduce((res, el) => res += slave.counter[el], 0);
	if (totalSex > 0) {
		r += `and has been fucked about ${num(totalSex)} times, including `;
		const sexNames = {
			mammary: "mammary",
			vaginal: "vanilla",
			anal: "anal",
			penetrative: "penetrating",
			oral: "oral",
			bestiality: "bestial",
			publicUse: "citizen",
		};
		r += sexTypes.filter((t) => slave.counter[t] > 0)
			.map((t) => `${num(slave.counter[t])} ${sexNames[t]}`)
			.reduce((res, ch, i, arr) => res + (i === arr.length - 1 ? ' and ' : ', ') + ch);
		r += ` sexual encounters. `;
	} else {
		r += `and has had little or no sexual experience ${slave.weekAcquired > 0 ? "as your slave" : "in your new arcology"} yet. `;
	}

	if (weeksOwned > 0) {
		const sexDescriptions = {
			mammary: `${he}'s put ${his} tits to work`,
			vaginal: `${his} pussy has been fucked`,
			anal: `${he}'s been buttfucked`,
			penetrative: `${he}'s pounded a hole`,
			oral: `${he}'s sucked something off`,
			bestiality: `${he}'s fucked an animal`,
			publicUse: `${he}'s fucked one of your citizens`,
		};
		const getSexTypeScaled = (t) => slave.counter[t] * ((t === "oral") ? 0.5 : 1.0);
		const biggestSexType = sexTypes.reduce((res, el) => (getSexTypeScaled(el) > getSexTypeScaled(res)) ? el : res);
		const frequency = (weeksOwned * 112) / slave.counter[biggestSexType];
		if (frequency < 4.5) {
			r += `Remarkably, this means ${sexDescriptions[biggestSexType]} `;
			if (frequency < 1) {
				r += `more than once every hour `;
			} else if (frequency < 1.5) {
				r += `about once every hour `;
			} else {
				r += `about once every ${num(Math.round(frequency), true)} hours `;
			}
			r += `${he}'s spent awake. `;
		}
	}

	if (slave.lactation > 0 && slave.counter.milk < 20) {
		r += `${He} has given a small quantity of milk`;
		if (slave.counter.cum > 0) {
			r += ` and about ${num(slave.counter.cum)} deciliters of cum`;
		}
		r += `. `;
	} else if (slave.counter.milk > 1) {
		r += `${He} has given about ${num(slave.counter.milk)} liters of milk`;
		if (slave.counter.cum > 0) {
			r += ` and about ${num(slave.counter.cum)} deciliters of cum`;
		}
		r += `. `;
	}

	if (slave.counter.birthsTotal > 0) {
		r += `${He} has given birth a total of ${numberWithPluralOne(slave.counter.birthsTotal, "time")}; `;
		if (slave.counter.birthsTotal === slave.counter.births) {
			if (slave.counter.births === 1) {
				r += `it happened `;
			} else if (slave.counter.births === 2) {
				r += `both of them happened `;
			} else {
				r += `all of them happened `;
			}
		} else if (slave.counter.births === 1) {
			r += `one of them happened `;
		} else if (slave.counter.births > 1) {
			r += `${num(slave.counter.births)} of them happened `;
		} else if (slave.counter.birthsTotal === 1) {
			r += `it did not happen `;
		} else {
			r += `none of them happened `;
		}
		r += `within the walls of ${V.arcologies[0].name}. `;
	}

	if (slave.counter.abortions > 0) {
		r += `${He} has had a total of ${numberWithPluralOne(slave.counter.abortions, "abortion")}. `;
	}

	if (slave.counter.miscarriages > 0) {
		r += `${He} has had a total of ${numberWithPluralOne(slave.counter.miscarriages, "miscarriage")}. `;
	}

	if (slave.counter.slavesKnockedUp > 0 || slave.counter.slavesFathered > 0 || slave.counter.PCKnockedUp > 0) {
		let PCChildrenFatheredCount = V.slaves.filter(s => s.father === slave.ID && s.mother === -1).length; // The slave is also the father of the children transferred from the PC's womb to other slave's one.
		r += `<span class="relationship">`;
		if (slave.counter.slavesKnockedUp > 0) {
			r += `${He}'s knocked up ${numberWithPluralOne(slave.counter.slavesKnockedUp, "other slave girl")} `;
			if (slave.counter.slavesFathered > 0) {
				r += `and fathered ${numberWithPluralOne(slave.counter.slavesKnockedUp, "new slave")} `;
			}
			r += `for you. `;
		} else if (slave.counter.slavesFathered > 0) {
			r += `${He}'s fathered ${numberWithPluralOne(slave.counter.slavesFathered, "new slave")} for you. `;
		}
		if (slave.counter.PCKnockedUp > 0) {
			r += `${He}'s managed to knock you up ${numberWithPluralOne(slave.counter.PCKnockedUp, "time")}`;
			if (slave.counter.PCChildrenFathered > 0) {
				r += ` and is the father of ${slave.counter.PCChildrenFathered} of your children`;
			}
			r += `. `;
		} else if (PCChildrenFatheredCount > 0) {
			r += `${He}'s the father of ${PCChildrenFatheredCount} of your children.`;
		}
		r += `</span>`;
	}

	return r;
};

App.Desc.faceAccessory = function(slave) {
	const {He, his} = getPronouns(slave);
	switch (slave.faceAccessory) {
		case "porcelain mask":
			return `${He} is wearing a beautiful porcelain mask to hide ${his} unsightly facial features.`;
		case "cat ears":
			return `${He} is wearing an adorable pair of cat ears.`;
	}
};

App.Desc.mouthAccessory = function(slave) {
	const {He, His, him, he, his, himself, girl} = getPronouns(slave);
	let r = ``;
	switch (slave.mouthAccessory) {
		case "ball gag":
			r += `${He} is wearing a mouth filling, `;
			if (slave.makeup === 3 || slave.makeup === 6 || slave.makeup === 8) {
				r += `${slave.hColor} `;
			} else {
				r += `red `;
			}
			r += `ball-shaped gag that prevents ${him} from uttering a word while keeping ${him} uncomfortably aware of ${his} status.`;
			break;
		case "bit gag":
			r += `${He} is wearing a jaw spreading, bar-shaped gag that prevents ${him} from speaking while keeping ${him} uncomfortably aware of ${his} status.`;
			break;
		case "dildo gag":
			r += `${He} is wearing a sturdy leather collar that continues up to restrict ${his} jaw as well. It holds a ring gag in ${his} mouth, into which slots a formidable inward-facing dildo that reaches down ${his} throat. It can be removed to facefuck ${him}.`;
			break;
		case "massive dildo gag":
			r += `${He} is wearing a sturdy leather collar that continues up to restrict ${his} jaw as well. It acts as an anchor for an enormous inward-facing dildo that reaches deep down ${his} throat. The sheer size of the phallus forces ${his} mouth as wide as it will go and considerably bulges ${his} throat. Fortunately for ${him}, it is designed to allow ${him} to be able to breathe through ${his} nose; though when removed, the poor ${girl} finds ${himself} incapable of closing ${his} mouth for some time.`;
			break;
		case "ring gag":
			r += `${His} ring gag uncomfortably keeps ${him} from closing ${his} mouth; drool visibly pools around ${his} tongue, and trickles down ${his} chin unless ${he} can keep ${his} head back.`;
			break;
	}
	return r;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {ContainerT} Description of slave's genetic quirks
 */
App.Desc.geneticQuirkAssessment = function(slave) {
	const r = new SpacedTextAccumulator();
	const {
		he, him, his, He, His
	} = getPronouns(slave);

	/**
	 * colors the text dodgerblue if the slave has the quirk
	 * colors the text deepskyblue if the slave carries the quirk
	 * adds a tooltip showing the quirk's title and description from App.Data.geneticQuirks
	 * @param {string} text the text to be changed
	 * @param {keyof FC.GeneticQuirks} quirk must be a valid key in App.Data.geneticQuirks
	 * @param {boolean} [carrier=false] if true then we color text to show that the slave carries that quirk, otherwise we color it to show that the slave has that quirk
	 * @returns {HTMLSpanElement}
	 */
	function showQuirk(text, quirk, carrier=false) {
		if (App.Data.geneticQuirks.get(quirk) === undefined) {
			throw new Error(`Unknown quirk "${quirk}"! The quirk must exist in App.Data.geneticQuirks to be valid`);
		}
		let span = App.UI.DOM.makeElement("span", text);

		// color the text
		if (carrier) {
			span.classList.add("deepskyblue");
		} else {
			span.classList.add("dodgerblue");
		}

		// add tooltip
		span.tabIndex = 0;
		span.classList.add("has-tooltip");
		tippy(span, {
			content: App.UI.DOM.makeElement(
				"span",
				App.Data.geneticQuirks.get(quirk).title + "; " + App.Data.geneticQuirks.get(quirk).description
			),
		});

		return span;
	}

	if (V.geneticMappingUpgrade >= 1) {
		if (slave.geneticQuirks.albinism === 2) {
			r.push(`${He} is an `, showQuirk("albino", "albinism"), `.`);
		} else if (slave.geneticQuirks.albinism === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of the `, showQuirk("albinism", "albinism", true), ` gene.`);
		}
		if (slave.geneticQuirks.dwarfism === 2 && slave.geneticQuirks.gigantism === 2) {
			r.push(`${He} has both`, showQuirk("dwarfism", "dwarfism"), `and`, showQuirk("gigantism", "gigantism"), `.`);
		} else if (slave.geneticQuirks.dwarfism === 2) {
			r.push(`${He} has`, showQuirk("dwarfism", "dwarfism"), `.`);
		} else if (slave.geneticQuirks.gigantism === 2) {
			r.push(`${He} has`, showQuirk("gigantism", "gigantism"), `.`);
		}
		if (slave.geneticQuirks.dwarfism === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of the`, showQuirk("dwarfism", "dwarfism", true), `gene.`);
		}
		if (slave.geneticQuirks.gigantism === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of the`, showQuirk("gigantism", "gigantism", true), `gene.`);
		}
		if (slave.geneticQuirks.progeria >= 2) {
			r.push(`${He} has`, showQuirk("progeria", "progeria"), `${slave.geneticQuirks.neoteny === 3 ? ", but it hasn't become a problem yet" : ""}.`);
			if (slave.geneticQuirks.neoteny >= 2) {
				r.push(`Oddly enough, ${he} also possesses`, showQuirk("neotenic", "neoteny"), `traits, but they won't get the chance to express.`);
			}
		} else if (slave.geneticQuirks.neoteny >= 2) {
			r.push(`${He} has a genetic makeup that ${slave.geneticQuirks.neoteny === 2 ? "renders" : "will render"} ${him} `, showQuirk("neotenic", "neoteny"), `.`);
		}
		if (slave.geneticQuirks.progeria === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of the`, showQuirk("progeria", "progeria", true), `gene.`);
		}
		if (slave.geneticQuirks.neoteny === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of traits that can result in`, showQuirk("neotenous", "neoteny", true), `development if expressed.`);
		}
		if (typeof slave.geneticQuirks.heterochromia === "string") {
			r.push(`${He} has a gene that makes ${his}`, showQuirk("eyes two different colors", "heterochromia"), `.`);
		} else if (slave.geneticQuirks.heterochromia === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of the`, showQuirk("heterochromia", "heterochromia", true), `gene.`);
		}
		if (slave.geneticQuirks.androgyny === 2) {
			r.push(`${He} has a hormonal condition resulting in`, showQuirk("androgyny", "androgyny"), `.`);
		} else if (slave.geneticQuirks.androgyny === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a gene that results in`, showQuirk("androgyny", "androgyny", true), `.`);
		}
		if (slave.geneticQuirks.pFace === 2) {
			r.push(`${He} has an exceedingly rare trait associated with`, showQuirk("perfect facial beauty", "pFace"), `.`);
			if (slave.geneticQuirks.uFace === 2) {
				r.push(`Oddly enough, ${he} also possesses a conflicting trait for`, showQuirk("raw facial ugliness", "uFace"), `; the two average each other out.`);
			}
		} else if (slave.geneticQuirks.uFace === 2) {
			r.push(`${He} has an exceedingly rare trait associated with some of the`, showQuirk("ugliest mugs", "uFace"), `in history.`);
		}
		if (slave.geneticQuirks.pFace === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a combination of traits that can result in`, showQuirk("perfect facial beauty", "pFace", true), `.`);
		}
		if (slave.geneticQuirks.uFace === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a combination of traits that can result in`, showQuirk("raw facial ugliness", "uFace", true), `.`);
		}
		if (slave.geneticQuirks.potent === 2) {
			r.push(`${He} is naturally`, showQuirk("potent", "potent"), `${isVirile(slave) ? " and excels at impregnation" : ""}.`);
		} else if (slave.geneticQuirks.potent === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a genetic condition resulting in increased`, showQuirk("potency", "potent", true), `.`);
		}
		if (slave.geneticQuirks.fertility === 2 && slave.geneticQuirks.hyperFertility === 2) {
			r.push(`${He} has a unique genetic condition resulting in`, showQuirk("inhumanly high", "hyperFertility"));
			if (slave.ovaries === 1 || slave.mpreg === 1) {
				r.push(showQuirk("fertility", "fertility"), `; risky intercourse will result in multiple pregnancies.`);
			} else {
				r.push(showQuirk("fertility", "fertility"), `.`);
			}
		} else if (slave.geneticQuirks.hyperFertility === 2) {
			r.push(`${He} is prone to`);
			if (slave.ovaries === 1 || slave.mpreg === 1) {
				r.push(showQuirk("extreme fertility", "hyperFertility"), `and will likely undergo multiple pregnancy.`);
			} else {
				r.push(showQuirk("extreme fertility", "hyperFertility"), `.`);
			}
		} else if (slave.geneticQuirks.fertility === 2) {
			r.push(`${He} is naturally`);
			if (slave.ovaries === 1 || slave.mpreg === 1) {
				r.push(showQuirk("fertile", "fertility"), `and prone to having twins.`);
			} else {
				r.push(showQuirk("fertile", "fertility"), `.`);
			}
		}
		if (slave.geneticQuirks.hyperFertility === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a genetic condition resulting in`, showQuirk("hyper-fertility", "hyperFertility", true), `.`);
		}
		if (slave.geneticQuirks.fertility === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a genetic condition resulting in increased`, showQuirk("fertility", "fertility", true), `.`);
		}
		if (slave.geneticQuirks.superfetation === 2) {
			if (slave.broodmother !== 0) {
				r.push(`${He} possesses a rare genetic flaw that causes`, showQuirk("pregnancy to not block ovulation", "superfetation"), `; not that it matters with ${his} broodmother implant superseding it.`);
			} else if (isFertile(slave)) {
				r.push(`${He} possesses a rare genetic flaw that causes`, showQuirk("pregnancy to not block ovulation", "superfetation"), `. ${He} is fully capable of getting pregnant while already pregnant.`);
			} else {
				r.push(`${He} possesses a rare genetic flaw that causes`, showQuirk("pregnancy to not block ovulation", "superfetation"), `; not that it matters when ${he} can't get pregnant.`);
			}
		} else if (slave.geneticQuirks.superfetation === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a genetic flaw that causes`, showQuirk("superfetation", "superfetation", true), `.`);
		}
		if (slave.geneticQuirks.polyhydramnios === 2 || (slave.geneticQuirks.polyhydramnios === 1 && V.geneticMappingUpgrade >= 3)) {
			r.push(showQuirk("Polyhydramnios", "polyhydramnios", true), `runs in ${his} family.`);
		}
		if (slave.geneticQuirks.uterineHypersensitivity === 2) {
			r.push(`${He} possesses a rare genetic trait that causes`, showQuirk("uterine hypersensitivity", "uterineHypersensitivity"), `;`);
			if (slave.ovaries === 1 || slave.mpreg === 1) {
				r.push(`pregnancy and birth will be extremely pleasurable for ${him}.`);
			} else {
				r.push(`it has little effect on those unable to bear children.`);
			}
		} else if (slave.geneticQuirks.uterineHypersensitivity === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a genetic trait that causes`, showQuirk("uterine hypersensitivity", "uterineHypersensitivity", true), `.`);
		}
		if (slave.geneticQuirks.macromastia === 2 && slave.geneticQuirks.gigantomastia === 2) {
			r.push(`${He} has an abnormal strain of`, showQuirk("gigantomastia", "gigantomastia"), `and will experience constant`, showQuirk("excessive breast growth", "macromastia"), `.`);
		} else if (slave.geneticQuirks.gigantomastia >= 2) {
			r.push(`${He} has`);
			if (slave.geneticQuirks.gigantomastia === 3) {
				r.push(`dormant`, showQuirk("gigantomastia", "gigantomastia"), `. Hormonal effects may cause it to become active.`);
			} else {
				r.push(showQuirk("gigantomastia", "gigantomastia"), `and will experience excessive breast growth.`);
			}
		} else if (slave.geneticQuirks.macromastia >= 2) {
			r.push(`${He} has`);
			if (slave.geneticQuirks.macromastia === 3) {
				r.push(`dormant`, showQuirk("macromastia", "macromastia"), `. Hormonal effects may cause it to become active.`);
			} else {
				r.push(showQuirk("macromastia", "macromastia"), `and will experience excess development of breast tissue.`);
			}
		}
		if (slave.geneticQuirks.gigantomastia === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a genetic flaw that causes`, showQuirk("gigantomastia", "gigantomastia", true), `.`);
		}
		if (slave.geneticQuirks.macromastia === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a genetic flaw that causes`, showQuirk("macromastia", "macromastia", true), `.`);
		}
		if (slave.geneticQuirks.galactorrhea >= 2) {
			r.push(`${He} is predisposed to`);
			if (slave.geneticQuirks.galactorrhea === 2 && slave.lactation > 0) {
				r.push(showQuirk("galactorrhea", "galactorrhea"), `, not that it matters when ${he} is already lactating.`);
			} else {
				r.push(showQuirk("galactorrhea", "galactorrhea"), `and will likely begin lactating inappropriately ${slave.geneticQuirks.galactorrhea === 2 ? "sooner or later" : "later in life"}.`);
			}
		} else if (slave.geneticQuirks.galactorrhea === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a gene that leads to`, showQuirk("galactorrhea", "galactorrhea", true), `.`);
		}
		if (slave.geneticQuirks.wellHung === 2) {
			if (slave.physicalAge <= 16 && slave.hormoneBalance < 100 && slave.dick > 0) {
				r.push(`${He} is likely to experience an`, showQuirk("inordinate amount of penile growth", "wellHung"), `during ${his} physical development.`);
			} else if (slave.dick > 0) {
				r.push(`${He} is`, showQuirk("predisposed to having an enormous dick", "wellHung"), `, though it is unlikely to naturally grow any larger than it currently is.`);
			} else {
				r.push(`${He} is`, showQuirk("predisposed to having an enormous dick", "wellHung"), `, or would be, if ${he} had one.`);
			}
		} else if (slave.geneticQuirks.wellHung === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a gene that causes`, showQuirk("enhanced penile development", "wellHung", true), `.`);
		}
		if (slave.geneticQuirks.rearLipedema === 2) {
			r.push(`${His} body uncontrollably`, showQuirk(`builds fat on ${his} rear`, "rearLipedema"), `resulting in constant growth.`);
		} else if (slave.geneticQuirks.rearLipedema === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a carrier of a genetic flaw that causes`, showQuirk(`lipedema`, "rearLipedema", true), `.`);
		}
		if (slave.geneticQuirks.wGain === 2 && slave.geneticQuirks.wLoss === 2) {
			r.push(`${He} has irregular`, showQuirk("leptin production", "wGain"), `and will undergo shifts in weight.`);
		} else if (slave.geneticQuirks.wGain === 2) {
			r.push(`${He} has`, showQuirk("hyperleptinemia", "wGain"), `and will easily gain weight.`);
		} else if (slave.geneticQuirks.wLoss === 2) {
			r.push(`${He} has`, showQuirk("hypoleptinemia", "wLoss"), `and will easily lose weight.`);
		}
		if (slave.geneticQuirks.wGain === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a`, showQuirk("hyperleptinemia", "wGain", true), `carrier.`);
		}
		if (slave.geneticQuirks.wLoss === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a`, showQuirk("hypoleptinemia", "wLoss", true), `carrier.`);
		}
		if (slave.geneticQuirks.mGain === 2 && slave.geneticQuirks.mLoss === 2) {
			r.push(`${He} has severe genetic flaw resulting in`, showQuirk("easily replaced", "mGain"), `,`, showQuirk("rapidly lost muscle mass", "mLoss"), `.`);
		} else if (slave.geneticQuirks.mGain === 2) {
			r.push(`${He} has`, showQuirk("myotonic hypertrophy", "mGain"), `and will easily gain muscle mass.`);
		} else if (slave.geneticQuirks.mLoss === 2) {
			r.push(`${He} has`, showQuirk("myotonic dystrophy", "mLoss"), `and will rapidly lose muscle mass.`);
		}
		if (slave.geneticQuirks.mGain === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a`, showQuirk("myotonic hypertrophy", "mGain", true), `carrier.`);
		}
		if (slave.geneticQuirks.mLoss === 1 && V.geneticMappingUpgrade >= 3) {
			r.push(`${He} is a`, showQuirk("myotonic dystrophy", "mLoss", true), `carrier.`);
		}
		if (slave.genes === "XY" && !V.seeDicksAffectsPregnancy) {
			r.push(`Analysis of ${his} sperm shows that ${he} has a ${slave.spermY}% chance of fathering a son.`);
		}
	}
	r.toParagraph();
	return r.container();
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Description of slave's flower
 */
App.Desc.flower = function(slave) {
	if (slave.dick > 0 && slave.balls === 0) {
		return `a white orchid, its black stamen stiffly erect.`;
	} else if (slave.dick > 0) {
		return `a morning glory, light around its edges with a puckered pink center.`;
	} else if (slave.addict > 5) {
		return `a large poppy, its pod glistening with black opiate juice.`;
	} else if (slave.vagina === 0) {
		return `a white lily, pure and unspoiled.`;
	} else if (slave.pregType > 3 && slave.pregKnown === 1) {
		return `a pink lotus, beautiful and fertile.`;
	} else if (slave.energy > 95) {
		return `a flamboyant tiger lily.`;
	} else if (slave.actualAge > 40) {
		return `an elegant, mature orchid.`;
	} else if (slave.actualAge < 20) {
		return `an innocent little peony.`;
	} else if (slave.boobs > 2000) {
		return `a huge round sunflower.`;
	} else {
		return `a nice red rose.`;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string} Image associated with slave
 */
App.Desc.image = function(slave) {
	if (slave.dick > 0 && slave.balls === 0) {
		return `sodomy.`;
	} else if (slave.dick > 0) {
		return `stiff pricks.`;
	} else if (slave.skill.oral >= 100) {
		return `oral sex.`;
	} else if (slave.boobs > 1000) {
		return `boobs.`;
	} else if (slave.vagina === -1) {
		return `sodomy.`;
	} else {
		return `pussies.`;
	}
};
