/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */

// TODO: redo this
App.SlaveAssignment.nanny = function(slave) {
	const {he, him, his, He, His} = getPronouns(slave);
	const child = `child${V.nurseryChildren > 0 ? `ren` : ``}`;

	let t = `works as a nanny. ${He} ${V.nurseryChildren
		? `looks after the ${child} in ${V.nurseryName}, ensuring their needs are met and that they are being raised as ${V.nurseryChildren === 1
			? `a good future slave`
			: `good future slaves`}`
		: `keeps ${V.nurseryName} neat and tidy for the children it will one day support`}. `;

	t += nannyEffort(slave);
	t += nannyRelationship(slave);
	t += nannyCareer(slave);
	t += nannyFetish(slave);
	t += nannyEnergy(slave);
	t += nannyVision(slave);
	t += nannyVignettes(slave);
	t += matronEffects(slave);

	return t;

	function nannyEffort(slave) {
		let t = '';

		t += ` ${He} is `;
		if (slave.trust < -20) {
			t += `frightened of punishment and works very hard, <span class="cash inc">reducing the upkeep</span> of ${V.nurseryName}${V.nurseryChildren ? ` and the children within` : ``}.`;
		} else if (slave.devotion <= 20) {
			t += `hesitant, requiring your other slaves to demand ${his} services, and only slightly <span class="cash inc">reduces upkeep</span> of your slaves.`;
		} else if (slave.devotion <= 50) {
			t += `obedient, offering your other slaves ${his} services, and moderately <span class="cash inc">reduces the upkeep</span> of your slaves.`;
		} else if (slave.devotion <= 95) {
			t += `devoted, happily giving your other slaves ${his} services, and <span class="cash inc">reduces the upkeep</span> of your slaves.`;
		} else {
			t += `so happy to serve your other slaves that ${he} often sees to their needs before they know they have them, and greatly <span class="cash inc">reduces the upkeep</span> of your slaves.`;
		}

		return t;
	}

	function nannyRelationship(slave) {
		let t = '';

		// TODO:
		if (slave.relationship === -2) {
			t += ` ${He} does ${his} best to look after the ${child} in ${his} care due to ${his} emotional bond to you.`;
		} else if (slave.relationship === -3 && slave.devotion > 50) {
			t += ` ${He} does ${his} very best to be the perfect caretaker, making ${him} an outstanding nanny.`;
		}

		return t;
	}

	function nannyCareer(slave) {
		let t = '';

		// TODO:
		if (App.Data.Careers.General.servant.includes(slave.career)) {
			t += ` ${He} has experience with nannying from ${his} life before ${he} was a slave, making ${him} more effective.`;
		} else if (slave.skill.servant >= Constant.MASTERED_XP) {
			t += ` ${He} has experience with nannying from working for you, making ${him} more effective.`;
		} else {
			slave.skill.servant += jsRandom(1, Math.ceil((slave.intelligence + slave.intelligenceImplant) / 15) + 8);
		}

		return t;
	}

	function nannyFetish(slave) {
		let t = '';

		// TODO:
		if (slave.fetishStrength > 60) {
			if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1) {
				t += ` ${His} natural affinity for submission increases ${his} effectiveness.`;
			} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.DOM) {
				t += ` ${His} sexual appetite for domination reduces ${his} effectiveness.`;
			}
		}

		return t;
	}

	function nannyEnergy(slave) {
		let t = '';

		// TODO:
		if (slave.energy < 20) {
			t += ` ${His} frigidity allows ${him} to ignore the intercourse all around ${him}, making ${him} very efficient.`;
		} else if (slave.energy < 40) {
			t += ` ${His} low sex drive keeps ${him} from becoming too distracted by the intercourse all around ${him}, making ${him} more efficient.`;
		}

		return t;
	}

	function nannyVision(slave) {
		let t = '';

		// TODO:
		if (!canSeePerfectly(slave)) {
			t += ` ${His} bad vision makes ${him} a worse nanny.`;
		}

		return t;
	}

	function nannyVignettes(slave) {
		let t = '';

		if (V.showVignettes === 1 && (slave.assignment === window.Job.NURSERY)) {
			const vignette = GetVignette(slave);
			t += ` <u>This week</u> ${vignette.text} `;

			vignetteCash(slave);
			vignetteDevotion(slave);
			vignetteTrust(slave);
			vignetteHealth(slave);
			vignetteRep(slave);
		}

		return t;
	}

	function vignetteCash(slave) {
		const vignette = GetVignette(slave);
		let t = '';

		if (vignette.type === "cash") {
			let modifier = FResult(slave);
			if (vignette.effect > 0) {
				t += `<span class="cash inc">making you an extra ${cashFormat(Math.trunc(modifier * vignette.effect))}.</span>`;
				cashX(Math.trunc(modifier * vignette.effect), "slaveAssignmentNurseryVign", slave);
			} else if (vignette.effect < 0) {
				t += `<span class="cash dec">losing you ${cashFormat(Math.abs(Math.trunc(modifier * vignette.effect)))}.</span>`;
				cashX(forceNeg(Math.trunc(modifier * vignette.effect)), "slaveAssignmentNurseryVign", slave);
			} else {
				t += `an incident without lasting effect.`;
			}
		}

		return t;
	}

	function vignetteDevotion(slave) {
		const vignette = GetVignette(slave);
		let t = '';

		if (vignette.type === "devotion") {
			if (vignette.effect > 0) {
				if (slave.devotion > 50) {
					t += `<span class="devotion inc">increasing ${his} devotion to you.</span>`;
				} else if (slave.devotion >= -20) {
					t += `<span class="devotion inc">increasing ${his} acceptance of you.</span>`;
				} else if (slave.devotion > -10) {
					t += `<span class="devotion inc">reducing ${his} dislike of you.</span>`;
				} else {
					t += `<span class="devotion inc">reducing ${his} hatred of you.</span>`;
				}
			} else if (vignette.effect < 0) {
				if (slave.devotion > 50) {
					t += `<span class="devotion dec">reducing ${his} devotion to you.</span>`;
				} else if (slave.devotion >= -20) {
					t += `<span class="devotion dec">reducing ${his} acceptance of you.</span>`;
				} else if (slave.devotion > -10) {
					t += `<span class="devotion dec">increasing ${his} dislike of you.</span>`;
				} else {
					t += `<span class="devotion dec">increasing ${his} hatred of you.</span>`;
				}
			} else {
				t += `an incident without lasting effect.`;
			}
			slave.devotion += (1 * vignette.effect);
		}

		return t;
	}

	function vignetteTrust(slave) {
		const vignette = GetVignette(slave);
		let t = '';

		if (vignette.type === "trust") {
			if (vignette.effect > 0) {
				if (slave.trust > 20) {
					t += `<span class="trust inc">increasing ${his} trust in you.</span>`;
				} else if (slave.trust > -10) {
					t += `<span class="trust inc">reducing ${his} fear of you.</span>`;
				} else {
					t += `<span class="trust inc">reducing ${his} terror of you.</span>`;
				}
			} else if (vignette.effect < 0) {
				if (slave.trust > 20) {
					t += `<span class="trust dec">reducing ${his} trust in you.</span>`;
				} else if (slave.trust >= -20) {
					t += `<span class="trust dec">increasing ${his} fear of you.</span>`;
				} else {
					t += `<span class="trust dec">increasing ${his} terror of you.</span>`;
				}
			} else {
				t += `an incident without lasting effect.`;
			}
			slave.trust += (1 * vignette.effect);
		}

		return t;
	}

	function vignetteHealth(slave) {
		const vignette = GetVignette(slave);
		let t = '';

		if (vignette.type === "health") {
			if (vignette.effect > 0) {
				t += `<span class="health inc">improving ${his} health.</span>`;
			} else if (vignette.effect < 0) {
				t += `<span class="health dec">affecting ${his} health.</span>`;
			} else {
				t += `an incident without lasting effect.`;
			}
			improveCondition(slave, 2 * vignette.effect);
		}

		return t;
	}

	function vignetteRep(slave) {
		const vignette = GetVignette(slave);
		let t = '';

		if (vignette.type === "rep") {
			let modifier = FResult(slave);
			if (vignette.effect > 0) {
				t += `<span class="reputation inc">gaining you a bit of reputation.</span>`;
			} else if (vignette.effect < 0) {
				t += `<span class="reputation dec">losing you a bit of reputation.</span>`;
			} else {
				t += `an incident without lasting effect.`;
			}
			repX((modifier * vignette.effect * 0.1), "vignette", slave);
		}

		return t;
	}

	function matronEffects(slave) {
		let t = '';

		if (V.MatronID) {
			t += `While there, ${he} benefits from ${S.Matron.slaveName}'s `;
			if (S.Matron.physicalAge < 21) {
				t += `youthful energy`;
			} else {
				t += `care`;
			}
			if (S.Matron.skill.oral) { // TODO: keep this? replace with something else?
				t += ` and talented tongue`;
			}
			t += `. `;
		}

		return t;
	}
};
