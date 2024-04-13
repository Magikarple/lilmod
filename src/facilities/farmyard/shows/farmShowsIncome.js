/**
 * @param {App.Entity.SlaveState} slave
 * @returns {number}
 */
App.Facilities.Farmyard.farmShowsIncome = function(slave) {
	const arcology = V.arcologies[0];
	const heavyMods = SlaveStatsChecker.modScore(slave).total > 20;

	const sexualQuirks = ["perverted", "unflinching"];
	const behavioralQuirks = ["sinful"];
	const fetishes = ["humiliation", "masochist"];

	let cash = 20;

	if (!slave) {
		return null;
	} else {
		const animals = [...V.animals.canine, ...V.animals.feline, ...V.animals.hooved].map(animal => getAnimal(animal));
		const exotic = animals.filter(animal => animal.rarity === "exotic").length;
		const exoticChance = exotic ? (exotic / App.Entity.facilities.farmyard.employees().length) * 100 : 0;

		if (S.Farmer) {
			cash *= 1.1;
			if (S.Farmer.skill.farmer >= Constant.MASTERED_XP) {
				cash *= 1.1;
			}
		}

		// Animal type

		if (exoticChance > random(100)) {
			cash *= 1.5;
		}

		// FS effects

		if (FutureSocieties.isActive('FSSupremacist', arcology)) {
			if (isSuperiorRace(slave)) {
				if (V.seeBestiality) {
					cash *= 0.8;
					repX(-10, "shows");
				} else {
					cash *= 1.2;
				}
			} else {
				cash *= 0.9;
			}
		}

		if (FutureSocieties.isActive('FSSubjugationist', arcology)) {
			if (isInferiorRace(slave)) {
				if (V.seeBestiality) {
					cash *= 1.2;
					repX(10, "shows");
				} else {
					cash *= 0.8;
				}
			} else {
				cash *= 0.9;
			}
		}

		if (FutureSocieties.isActive('FSRepopulationFocus', arcology)) {
			if (isPreg(slave)) {
				if (slave.eggType === "human") {
					cash *= 1.2;
					repX(15, "shows");
				} else {
					cash *= 0.8;
					repX(-15, "shows");
				}
			}
		}

		if (FutureSocieties.isActive('FSRestart', arcology)) {
			if (isPreg(slave)) {
				if (isEliteBreeder(slave)) {
					if (slave.eggType === "human") {
						cash *= 0.7;
						repX(-20, "shows");
					} else {
						cash *= 0.6;
						repX(-25, "shows");
					}
				} else {
					if (slave.eggType === "human") {
						cash *= 0.8;
						repX(-15, "shows");
					} else {
						cash += 0.9;
						repX(-10, "shows");
					}
				}
			} else {
				if (V.seeBestiality && isEliteBreeder(slave)) {
					cash *= 0.7;
					repX(-10, "shows");
				}
			}
		}

		if (FutureSocieties.isActive('FSGenderRadicalist', arcology)) {
			if (slave.genes === "XX") {
				if (slave.dick > 0) {
					cash *= 1.2;
					repX(10, "shows");
				} else {
					cash *= 0.9;
					repX(-5, "shows");
				}
			}
		}

		if (FutureSocieties.isActive('FSGenderFundamentalist', arcology)) {
			if (isPreg(slave) || App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
				cash *= 1.1;
				repX(10, "shows");
			} else {
				cash *= 0.9;
				repX(-5, "shows");
			}

			// FIXME: keep this? not sure it makes sense
			if (slave.genes === "XX") {
				if (slave.dick > 0) {
					cash *= 0.8;
				} else {
					cash *= 1.1;
				}
			}
		}

		if (FutureSocieties.isActive('FSPaternalist', arcology)) {
			if (V.seeBestiality) {
				if (V.policies.bestialityOpenness) {
					if (slave.devotion > 50) {
						cash *= 1.25;
					}
				} else {
					if (V.farmyardBreeding) {
						if (V.farmyardRestraints) {
							cash *= 0.25;
						} else {
							cash *= 0.5;
						}
					} else {
						if (V.farmyardRestraints) {
							cash *= 0.5;
						} else {
							cash *= 0.75;
						}
					}
				}
			}
		}

		if (FutureSocieties.isActive('FSDegradationist', arcology)) {
			if (V.seeBestiality) {
				if (V.farmyardBreeding) {
					if (V.farmyardRestraints) {
						cash *= 1.5;
					} else {
						cash *= 1.3;
					}
				} else {
					if (V.farmyardRestraints) {
						cash *= 1.2;
					} else {
						cash *= 1.1;
					}
				}
			}
		}

		if (FutureSocieties.isActive('FSBodyPurist', arcology)) {
			if (SlaveStatsChecker.isModded(slave)) {
				if (heavyMods) {
					cash *= 0.7;
					repX(-15, "shows");
				} else {
					cash *= 0.8;
					repX(-10, "shows");
				}
			}
		}

		if (FutureSocieties.isActive('FSTransformationFetishist', arcology)) {
			if (SlaveStatsChecker.isModded(slave)) {
				if (heavyMods) {
					cash *= 1.3;
					repX(15, "shows");
				} else {
					cash *= 1.2;
					repX(10, "shows");
				}
			}
		}

		if (FutureSocieties.isActive('FSYouthPreferentialist', arcology)) {
			if (isYoung(slave)) {
				cash *= 1.2;
				repX(10, "shows");
			} else {
				cash *= 0.8;
				repX(-5, "shows");
			}
		}

		if (FutureSocieties.isActive('FSMaturityPreferentialist', arcology)) {
			if (!isYoung(slave)) {
				cash *= 1.2;
				repX(10, "shows");
			} else {
				cash *= 0.8;
				repX(-5, "shows");
			}
		}

		if (FutureSocieties.isActive('FSSlimnessEnthusiast', arcology)) {
			if (slimLawPass(slave)) {
				cash *= 1.1;
				repX(10, "shows");
			} else {
				cash *= 0.9;
				repX(-5, "shows");
			}
		}

		// FIXME: marked for possible rewrite
		if (FutureSocieties.isActive('FSAssetExpansionist', arcology)) {
			if (isStacked(slave)) {
				cash *= 1.1;
				repX(10, "shows");
			}
		}

		if (FutureSocieties.isActive('FSPastoralist', arcology)) {
			if (slave.boobs >= 1000) {
				cash *= 1.2;
				repX(10, "shows");
			}

			if (slave.lactation > 0) {
				cash *= 1.1;
				repX(5, "shows");
			}
		}

		// FIXME: marked for review
		if (FutureSocieties.isActive('FSPhysicalIdealist', arcology)) {
			if (genderLawPass(slave)) {
				cash *= 1.1;
				repX(10, "shows");
			} else {
				cash *= 0.9;
				repX(-5, "shows");
			}

			if (slave.muscles > 30) {
				cash *= 1.1;
			} else {
				cash *= 0.9;
			}
		}

		if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
			if (slave.weight > 10) {
				cash *= 1.1;
			} else {
				cash *= 0.9;
			}
		}

		if (FutureSocieties.isActive('FSPetiteAdmiration', arcology)) {
			if (heightPass(slave)) {
				cash *= 1.1;
				repX(10, "shows");
			} else {
				cash *= 0.9;
				repX(-5, "shows");
			}
		}

		if (FutureSocieties.isActive('FSStatuesqueGlorification', arcology)) {
			if (heightPass(slave)) {
				cash *= 1.1;
				repX(10, "shows");
			} else {
				cash *= 0.9;
				repX(-5, "shows");
			}
		}

		// Virginity

		if (V.seeBestiality) {
			if (slave.devotion > 50 &&
				(slave.vagina === 0 && canDoVaginal(slave)) ||
				(slave.anus === 0 && canDoAnal(slave))) {
				cash *= 2.5;

				if (slave.vagina === 0) {
					slave.vagina = 1;
				} else {
					slave.anus = 1;
				}
			}
		}

		// Careers

		if (App.Data.Careers.General.entertainment.includes(slave.career)) {
			cash *= 1.1;
		}

		if (App.Data.Careers.Leader.farmer.includes(slave.career)) {
			cash *= 1.1;
		}

		if (slave.prestige === 1) {
			cash *= 1.2;
		} else if (slave.prestige === 2) {
			cash *= 1.6;
		} else if (slave.prestige === 3) {
			cash *= 2.1;
		}

		if (slave.porn.prestige === 1) {
			cash *= 1.1;
		} else if (slave.porn.prestige === 2) {
			cash *= 1.4;
		} else if (slave.porn.prestige === 3) {
			cash *= 1.8;
		}

		if (slave.health.condition > 50) {
			cash *= 1.2;
		} else if (slave.health.condition < -20) {
			cash *= 0.9;
		}

		// TODO: add checks for family and relationships

		if (slave.face > 40) {
			cash *= 1.4;
		} else if (slave.face > 10) {
			cash *= 1.1;
		} else if (slave.face < -10) {
			cash *= 0.9;
		} else if (slave.face < -40) {
			cash *= 0.7;
		}

		cash *= devotion(cash);

		if (slave.weight > 30) {
			if (FutureSocieties.isActive('FSHedonisticDecadence', arcology)) {
				cash *= 0.8;
			}
			// TODO: put this on a scale
		} else if (slave.weight < -30) {
			cash *= 0.8;
		}

		// FIXME: marked for rewrite
		if (slave.muscles > 30) {
			cash *= 0.9;
		} else if (slave.muscles < -30) {
			cash *= 0.6;
		}

		if (!canSeePerfectly(slave)) {
			if (canSee(slave)) {
				cash *= 0.8;
			} else {
				cash *= 0.6;
			}
		}

		if (!canHear(slave)) {
			cash *= 0.8;
		}

		if (isPreg(slave)) {
			cash *= 0.8;
		}
		// TODO: incorporate skills
		cash *= healthPenalty(slave);

		if (slave.intelligence > 50) {
			cash *= 1.4;
		} else if (slave.intelligence < -50) {
			cash *= 0.6;
		}

		if (slave.energy > 95) {
			cash *= 1.5;
		} else if (slave.energy > 80) {
			cash *= 1.3;
		} else if (slave.energy > 60) {
			cash *= 1.1;
		} else if (slave.energy > 40) {
			cash *= 0.9;
		} else if (slave.energy > 20) {
			cash *= 0.8;
		} else {
			cash *= 0.6;
		}

		switch (slave.fetish) {
			case "submissive":
			case "humiliation":
				if (V.seeBestiality) {
					if (slave.fetishKnown) {
						cash *= 1.1;
					} else {
						slave.fetishKnown = random(1, 100) > 80 ? 1 : 0;
					}
				} else {
					if (slave.fetishKnown) {
						cash *= 0.9;
					} else {
						slave.fetishKnown = random(1, 100) > 80 ? 1 : 0;
					}
				}
				break;

			default:
				break;
		}

		switch (slave.behavioralFlaw) {
			case "devout":
			case "arrogant":
				cash *= 0.9;
				break;

			default:
				break;
		}

		switch (slave.behavioralQuirk) {
			case "sinful":
				cash *= 1.1;
				break;

			default:
				break;
		}

		switch (slave.sexualFlaw) {
			case "shamefast":
				cash *= 1.1;
				break;

			default:
				break;
		}

		switch (slave.sexualQuirk) {
			case "perverted":
				cash *= 1.1;
				break;

			default:
				break;
		}


		if (V.policies.bestialityOpenness > 0) {
			cash *= 1.75;
		}

		if (V.farmyardShows < 2) {
			cash *= 0.5;
		}

		// Multipliers

		if (V.animals.canine.length > 0) {
			cash *= (1 + (V.animals.canine.length * 0.05));
		}
		if (V.animals.hooved.length > 0) {
			cash *= (1 + (V.animals.hooved.length * 0.05));
		}
		if (V.animals.feline.length > 0) {
			cash *= (1 + (V.animals.feline.length * 0.05));
		}

		setSlaveDevotion();
		setSlaveTrust();

		return Math.max(cash, 0);
	}

	function devotion(amount) {
		if (slave.devotion > 50) {
			amount *= 1.4;
		} else if (slave.devotion < -50) {
			amount *= 0.6;
		}

		return amount;
	}

	function setSlaveDevotion() {
		const slaveApproves =
			sexualQuirks.includes(slave.sexualQuirk) ||
			behavioralQuirks.includes(slave.behavioralQuirk) ||
			fetishes.includes(slave.fetish);

		if (slave.devotion > 50) {
			if (V.seeBestiality) {
				if (slaveApproves) {
					slave.devotion += 2;
				} else {
					slave.devotion--;
				}
			}

			if (V.farmyardBreeding) {
				if (slaveApproves) {
					slave.devotion += 2;
				} else {
					slave.devotion--;
				}
			}

			if (V.farmyardRestraints) {
				if (slaveApproves) {
					slave.devotion += 3;
				} else {
					slave.devotion -= 2;
				}
			}
		} else if (slave.devotion < -50) {
			if (V.seeBestiality) {
				if (slaveApproves) {
					slave.devotion++;
				} else {
					slave.devotion -= 2;
				}
			}

			if (V.farmyardBreeding) {
				if (slaveApproves) {
					slave.devotion++;
				} else {
					slave.devotion -= 2;
				}
			}

			if (V.farmyardRestraints) {
				if (slaveApproves) {
					slave.devotion += 2;
				} else {
					slave.devotion -= 3;
				}
			}
		}
	}

	function setSlaveTrust() {
		const slaveApproves =
			sexualQuirks.includes(slave.sexualQuirk) ||
			behavioralQuirks.includes(slave.behavioralQuirk) ||
			fetishes.includes(slave.fetish);

		if (slave.trust > 50) {
			if (V.seeBestiality) {
				if (slaveApproves) {
					slave.trust += 2;
				} else {
					slave.trust--;
				}
			}

			if (V.farmyardBreeding) {
				if (slaveApproves) {
					slave.trust += 2;
				} else {
					slave.trust--;
				}
			}

			if (V.farmyardRestraints) {
				if (slaveApproves) {
					slave.trust += 3;
				} else {
					slave.trust -= 2;
				}
			}
		} else if (slave.trust < -50) {
			if (V.seeBestiality) {
				if (slaveApproves) {
					slave.trust++;
				} else {
					slave.trust -= 2;
				}
			}

			if (V.farmyardBreeding) {
				if (slaveApproves) {
					slave.trust++;
				} else {
					slave.trust -= 2;
				}
			}

			if (V.farmyardRestraints) {
				if (slaveApproves) {
					slave.trust += 2;
				} else {
					slave.trust -= 3;
				}
			}
		}
	}
};
