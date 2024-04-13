/**
 * @param {App.Entity.SlaveState} slave
 */
App.SlaveAssignment.agent = function(slave) {
	const gigantomastiaMod = slave.geneticQuirks.gigantomastia === 2 ? (slave.geneticQuirks.macromastia === 2 ? 3 : 2) : 1;

	if (slave.boobsImplantType === SizingImplantType.STRING) {
		slave.boobsImplant += 50;
		slave.boobs += 50;
		if (slave.boobs > 50000) {
			slave.boobs -= 100;
			slave.boobsImplant -= 100;
			if (slave.geneMods.NCS === 1) {
				slave.boobs -= 100;
				slave.boobsImplant -= 100;
			}
		}
	}

	if (slave.geneMods.NCS === 1) { /* NCS is blocking boob expansion. */
		if (slave.boobsImplant > 1000) {
			if ((slave.boobs - slave.boobsImplant < 1000) && (random(1, 100) > 60)) {
				slave.boobs += 50;
			}
		} else if (slave.boobsImplant > 600) {
			if ((slave.boobs - slave.boobsImplant < 500) && (random(1, 100) > 60)) {
				slave.boobs += 50;
			}
		} else if (slave.boobsImplant > 0) {
			if ((slave.boobs - slave.boobsImplant < 300) && (random(1, 100) > 60)) {
				slave.boobs += 50;
			}
		}
	}
	if (slave.geneticQuirks.macromastia === 2 && slave.geneticQuirks.gigantomastia === 2) {
		if (slave.boobs < 100000 && slave.weight >= -95) {
			slave.boobs += 30;
		}
	} else if (slave.geneticQuirks.gigantomastia === 2) {
		if (slave.boobs < 25000 && slave.weight >= -95) {
			slave.boobs += 20;
		}
	} else if (slave.geneticQuirks.macromastia === 2) {
		if (slave.boobs < 5000 && slave.weight >= -95) {
			slave.boobs += 10;
		}
	}
	if (slave.breastMesh !== 1) {
		if (slave.boobs - (slave.muscles * 30) > 5000 && slave.boobs <= 8000 && slave.boobsImplant / slave.boobs < .50) {
			if (slave.physicalAge < random(10, 200)) {
				if (slave.boobShape === BreastShape.PERKY) {
					slave.boobShape = BreastShape.TORPEDO;
				} else if (slave.boobShape !== BreastShape.SAGGY) {
					slave.boobShape = BreastShape.SAGGY;
				}
			}
		} else if (slave.boobsImplant / slave.boobs >= .90 && slave.boobs > 2000 && ![BreastShape.SAGGY, BreastShape.DOWNWARD, BreastShape.SPHERICAL].includes(slave.boobShape) && random(1, 100) > 70) {
			slave.boobShape = BreastShape.SPHERICAL;
		}
	}
	if (slave.buttImplantType === "string") {
		slave.buttImplant += 0.25;
		slave.butt += 0.25;
		if (slave.butt > 10) {
			slave.butt -= 1;
			slave.buttImplant -= 1;
			if (slave.geneMods.NCS === 1) {
				slave.butt -= 1;
				slave.buttImplant -= 1;
			}
		}
	}
	if (slave.geneticQuirks.rearLipedema === 2 && slave.butt < 20) {
		slave.butt += 0.1;
	}

	if (slave.genes === GenderGenes.FEMALE) {
		if (slave.ovaries === 1 || slave.mpreg === 1) {
			if (slave.balls > 0 && slave.ballType !== "sterile") {
				if (slave.hormoneBalance > 20) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormoneBalance < 20) {
					slave.hormoneBalance += 1;
				}
			} else {
				if (slave.hormoneBalance > 60) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormoneBalance < 60) {
					slave.hormoneBalance += 1;
				}
			}
		} else {
			if (slave.balls > 0 && slave.ballType !== "sterile") {
				if (slave.hormoneBalance > -20) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormoneBalance < -20) {
					slave.hormoneBalance += 1;
				}
			} else {
				if (slave.hormoneBalance > 20) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormoneBalance < 20) {
					slave.hormoneBalance += 1;
				}
			}
		}
	} else if (slave.genes === GenderGenes.MALE) {
		if (slave.ovaries === 1 || slave.mpreg === 1) {
			if (slave.balls > 0 && slave.ballType !== "sterile") {
				if (slave.hormoneBalance > 20) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormoneBalance < 20) {
					slave.hormoneBalance += 1;
				}
			} else {
				if (slave.hormoneBalance > 40) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormoneBalance < 40) {
					slave.hormoneBalance += 1;
				}
			}
		} else {
			if (slave.balls > 0 && slave.ballType !== "sterile") {
				if (slave.hormoneBalance > -40) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormoneBalance < -40) {
					slave.hormoneBalance += 1;
				}
			} else {
				if (slave.hormoneBalance > 20) {
					slave.hormoneBalance -= 1;
				} else if (slave.hormoneBalance < 20) {
					slave.hormoneBalance += 1;
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
						slave.lactationDuration = 2;
						slave.lactation = 1;
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
						slave.lactationDuration = 2;
						slave.lactation = 1;
					}
				}
			}
		}
	}

	if (slave.inflation > 0) {
		deflate(slave);
	}

	if (slave.preg > 0) { // EFFECTS OF PREGNANCY
		if (slave.preg === slave.pregData.normalBirth / 8) { /* !!! Very bad condition logic - with pregnancy control drugs can be not triggered. Or may be trigged by broodmother several times. Need to be reworked. !!! */
			if (slave.pregSource === -1) {
				V.PC.counter.slavesKnockedUp++;
			} else if (slave.pregSource > 0) {
				const babyDaddy = findFather(slave.pregSource);
				if (babyDaddy) {
					babyDaddy.counter.slavesKnockedUp++;
				}
			}
		}
		if (slave.preg >= slave.pregData.normalBirth / 4) {
			if (slave.geneticQuirks.gigantomastia === 3 && random(1, 200) < slave.hormoneBalance) {
				slave.geneticQuirks.gigantomastia = 2;
			}
			if (slave.geneticQuirks.macromastia === 3 && random(1, 200) < slave.hormoneBalance) {
				slave.geneticQuirks.macromastia = 2;
			}
			let boobTarget = 0;
			if (slave.geneMods.NCS === 1) {
				/* Sort-of No-op, NCS prevents boob growth */
			} else if (slave.physicalAge >= 18) {
				if (slave.pregType >= 50) {
					boobTarget = 10000;
				} else if (slave.pregType >= 30) {
					boobTarget = 5000;
				} else if (slave.pregType >= 10) {
					boobTarget = 2000;
				} else {
					boobTarget = 1000;
				}
			} else if (slave.physicalAge >= 13) {
				if (slave.pregType >= 50) {
					boobTarget = 5000;
				} else if (slave.pregType >= 30) {
					boobTarget = 3200;
				} else if (slave.pregType >= 10) {
					boobTarget = 1800;
				} else {
					boobTarget = 800;
				}
			} else if (slave.physicalAge >= 8) {
				if (slave.pregType >= 50) {
					boobTarget = 1800;
				} else if (slave.pregType >= 30) {
					boobTarget = 1400;
				} else if (slave.pregType >= 10) {
					boobTarget = 1000;
				} else {
					boobTarget = 600;
				}
			} else {
				if (slave.pregType >= 50) {
					boobTarget = 1000;
				} else if (slave.pregType >= 30) {
					boobTarget = 800;
				} else if (slave.pregType >= 10) {
					boobTarget = 600;
				} else {
					boobTarget = 400;
				}
			}
			boobTarget *= gigantomastiaMod;
			if (slave.pregType >= 30) {
				if (slave.weight <= 65) {
					slave.weight += 1;
				}
				if (slave.geneMods.NCS === 0 && random(1, 100) > 60) {
					if ((slave.boobs - slave.boobsImplant) < boobTarget) {
						slave.boobs += 200;
						if (slave.boobShape !== BreastShape.SAGGY && slave.preg > slave.pregData.normalBirth / 1.25 && (slave.boobsImplant / slave.boobs < 0.5) && (slave.breastMesh !== 1)) {
							slave.boobShape = BreastShape.SAGGY;
						}
					}
					if (slave.hips < 2) {
						slave.hips += 1;
					}
					if (slave.butt < 14) {
						slave.butt += 1;
					}
				}
			} else if (slave.geneMods.NCS === 0 && slave.pregType >= 10) {
				if (random(1, 100) > 80 && ((slave.boobs - slave.boobsImplant) < boobTarget)) {
					slave.boobs += 100;
					if (slave.boobShape !== BreastShape.SAGGY && (slave.boobsImplant / slave.boobs < 0.5) && (slave.breastMesh !== 1)) {
						if (slave.preg > random(slave.pregData.normalBirth / 1.25, slave.pregData.normalBirth * 2)) {
							slave.boobShape = BreastShape.SAGGY;
						}
					}
				}
			} else if (slave.geneMods.NCS === 0 && ((slave.boobs - slave.boobsImplant) < boobTarget)) {
				if (random(1, 100) > 80) {
					slave.boobs += 50;
					if (slave.boobShape !== BreastShape.SAGGY && slave.preg > random(slave.pregData.normalBirth / 1.25, slave.pregData.normalBirth * 2.5) && (slave.boobsImplant / slave.boobs < 0.5) && (slave.breastMesh !== 1)) {
						slave.boobShape = BreastShape.SAGGY;
					}
				}
			}
			if (slave.geneMods.NCS === 1) {
				/* No-op, we don't grow hips on NCS */
			} else if (slave.preg > slave.pregData.normalBirth / 1.25 && slave.physicalAge >= 18 && slave.hips === 1 && slave.hipsImplant === 0 && random(1, 100) > 90) {
				slave.hips += 1;
			} else if (slave.preg > slave.pregData.normalBirth / 1.42 && slave.physicalAge >= 18 && slave.hips === 0 && slave.hipsImplant === 0 && random(1, 100) > 70) {
				slave.hips += 1;
			}
			if (slave.bellyPreg >= 1500) {
				if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory)) {
					slave.bellyAccessory = "none";
				}
				if ((slave.preg > slave.pregData.normalBirth / 2) && (slave.lactation === 0) && slave.health.condition >= -20 && slave.weight > -30) {
					if (slave.preg > random(slave.pregData.normalBirth / 2.22, slave.pregData.normalBirth / 1.33)) {
						slave.lactation = 1;
					}
				}
				if (slave.lactation === 1) {
					slave.lactationDuration = 2;
				}
			}
		}
	}

	if (slave.belly >= 1000000) {
		if (slave.bellySag < 50) {
			slave.bellySag += 1;
			if (slave.preg > 0) {
				slave.bellySagPreg += 1;
			}
		} else if (slave.preg > 0 && slave.bellySagPreg < 20) {
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
				if (slave.bellySagPreg > 0) {
					slave.bellySag -= 0.5;
					slave.bellySagPreg -= 0.5;
					if (slave.bellySag < 0) {
						slave.bellySag = 0;
						slave.bellySagPreg = 0;
					}
				} else {
					slave.bellySag -= 0.5;
					if (slave.bellySag < 0) {
						slave.bellySag = 0;
					}
				}
			}
		} else if (slave.muscles >= 30) {
			if (random(1, 100) > 20) {
				if (slave.bellySagPreg > 0) {
					slave.bellySag -= 0.4;
					slave.bellySagPreg -= 0.4;
					if (slave.bellySag < 0) {
						slave.bellySag = 0;
						slave.bellySagPreg = 0;
					}
				} else {
					slave.bellySag -= 0.4;
					if (slave.bellySag < 0) {
						slave.bellySag = 0;
					}
				}
			}
		} else if (slave.muscles >= 5) {
			if (random(1, 100) > 40) {
				if (slave.bellySagPreg > 0) {
					slave.bellySag -= 0.3;
					slave.bellySagPreg -= 0.3;
					if (slave.bellySag < 0) {
						slave.bellySag = 0;
						slave.bellySagPreg = 0;
					}
				} else {
					slave.bellySag -= 0.3;
					if (slave.bellySag < 0) {
						slave.bellySag = 0;
					}
				}
			}
		} else {
			if (random(1, 100) > 60) {
				if (slave.bellySagPreg > 0) {
					slave.bellySag -= 0.2;
					slave.bellySagPreg -= 0.2;
					if (slave.bellySag < 0) {
						slave.bellySag = 0;
						slave.bellySagPreg = 0;
					}
				} else {
					slave.bellySag -= 0.2;
					if (slave.bellySag < 0) {
						slave.bellySag = 0;
					}
				}
			}
		}
	}

	if ((slave.preg > slave.pregData.minLiveBirth) && slave.broodmother === 0 && random(1, 100) < 90) {
		slave.counter.birthsTotal += WombBirthReady(slave, slave.pregData.minLiveBirth);
		WombBirth(slave, slave.pregData.minLiveBirth);
		WombFlush(slave);
		if (slave.geneticQuirks.fertility + slave.geneticQuirks.hyperFertility >= 4) {
			slave.pregWeek = -2;
		} else if (slave.geneticQuirks.hyperFertility > 1) {
			slave.pregWeek = -3;
		} else {
			slave.pregWeek = -4;
		}
		if (slave.birthsTat > -1) {
			slave.birthsTat++;
		}
	} else if ((slave.preg > slave.pregData.normalBirth) && (slave.broodmother === 0)) {
		slave.counter.birthsTotal += WombBirthReady(slave, slave.pregData.minLiveBirth);
		WombBirth(slave, slave.pregData.minLiveBirth);
		WombFlush(slave);
		if (slave.geneticQuirks.fertility + slave.geneticQuirks.hyperFertility >= 4) {
			slave.pregWeek = -2;
		} else if (slave.geneticQuirks.hyperFertility > 1) {
			slave.pregWeek = -3;
		} else {
			slave.pregWeek = -4;
		}
		if (slave.birthsTat > -1) {
			slave.birthsTat++;
		}
	} else if ((slave.preg >= 37) && (slave.broodmother > 0)) {
		if (slave.broodmother > 0) {
			slave.counter.birthsTotal += WombBirthReady(slave, 37);
			WombBirth(slave, 37);
			slave.preg = WombMaxPreg(slave);
		}
		if (slave.birthsTat > -1) {
			slave.birthsTat++;
		}
	}

	SetBellySize(slave); // Actually it's now better to set belly size without checking of any conditions. Just to be sure. Should correct forgotten variables too.

	if (slave.lactation === 1) {
		if (slave.fetish !== Fetish.BOOBS) {
			if (slave.lactationDuration === 0) {
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
				slave.lactation = 0;
			} else if (slave.lactationDuration === 1) {
				// handled in nextWeek?
				// slave.boobsMilk = Math.round(10 * slave.lactationAdaptation);
				// slave.boobs += slave.boobsMilk;
			}
		} else {
			slave.lactationDuration = 2;
		}
	} else if (slave.lactation === 2) {
		slave.lactationDuration = 2;
	} else if (slave.fetish === Fetish.BOOBS && slave.boobs - slave.boobsImplant >= 2000) {
		slave.induceLactation += 2;
		if (slave.lactationDuration >= 20) {
			slave.induceLactation = 0;
			slave.lactationDuration = 2;
			slave.lactation = 1;
		}
	}
	if (slave.lactation > 0 && slave.geneMods.livestock === 1 && slave.lactationAdaptation < 200) {
		slave.lactationAdaptation = Math.min(slave.lactationAdaptation + 4, 200);
	}
	if (slave.lactation === 0 && slave.geneticQuirks.galactorrhea === 2 && random(1, 100) <= slave.hormoneBalance) {
		slave.lactationDuration = 2;
		slave.lactation = 1;
	}

	if (slave.geneticQuirks.neoteny === 3 && slave.physicalAge >= 12) {
		slave.geneticQuirks.neoteny = 2;
	}
	if (slave.geneticQuirks.progeria === 3 && slave.physicalAge >= 3) {
		slave.geneticQuirks.progeria = 2;
	}
	if (slave.geneticQuirks.gigantomastia === 3 && random(70 - slave.physicalAge, 300) < slave.hormoneBalance) {
		slave.geneticQuirks.gigantomastia = 2;
	}
	if (slave.geneticQuirks.macromastia === 3 && random(70 - slave.physicalAge, 300) < slave.hormoneBalance) {
		slave.geneticQuirks.macromastia = 2;
	}

	if (slave.geneticQuirks.uterineHypersensitivity === 2) {
		if (slave.vaginaLube < 2 && slave.vagina !== -1 && random(70 - slave.physicalAge, 200) < slave.hormoneBalance) {
			slave.vaginaLube += 1;
		}
		if (slave.geneMods.NCS === 0) {
			if (slave.hips < 2 && random(70 - slave.physicalAge, 300) < slave.hormoneBalance && slave.physicalAge.isBetween(9, 20)) {
				slave.hips += 1;
			}
		}
	}

	if (slave.geneMods.immortality === 1) {
		if (slave.physicalAge > 26) {
			slave.physicalAge--;
		}
		if (slave.visualAge > 26) {
			slave.visualAge--;
		}
	}
	if (slave.geneticQuirks.progeria === 2 && slave.birthWeek > 2) {
		if (((slave.birthWeek - 2) % 5) === 0) {
			slave.physicalAge++;
			slave.visualAge++;
			if (slave.ovaryAge >= 0) { // immortal ovaries counteract progeria's effect on ovaryAge
				slave.ovaryAge += 5;
			}
		}
	}

	if ((slave.hStyle !== "shaved" && slave.bald !== 1 && slave.haircuts === 0) && (slave.hLength < 150)) {
		slave.hLength += 1;
	}

	slave.health.illness = 0;

	App.EndWeek.saVars.slaveCheckedIn.push(slave.ID);
};
