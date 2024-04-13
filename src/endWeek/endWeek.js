globalThis.endWeek = (function() {
	function doEndWeek() {
		// purge SugarCube's expired state cache
		State.expired.length = 0;

		// report setup
		setupLastWeeksCash();
		setupLastWeeksRep();

		// globals setup
		resetSlaveMarkets();
		for (const s of V.slaves) {
			slavePrep(s);
		}
		setUseWeights();
		saveWeekTotals();

		// pass time for objects that need it
		weather();
		organs();
		growNewCat();
		prosthetics();
		nursery();
		food();
		PC();
		threaten();

		// week end is done, move on to gameover or SA reports
		resetMiscGlobals();
		advance();
	}

	function resetSlaveMarkets() {
		V.market = null;
		for (const school of App.Data.misc.schools.keys()) {
			V[school].schoolSale = 0;
		}
	}

	function slavePrep(s) {
		s.lastWeeksCashIncome = 0;
		s.lastWeeksRepIncome = 0;
		s.lastWeeksRepExpenses = 0;
	}

	function setUseWeights() {
		V.oralUseWeight = 5;
		V.vaginalUseWeight = 5;
		V.analUseWeight = 5;
		V.mammaryUseWeight = 1;
		V.penetrativeUseWeight = 1 + Math.trunc(penetrativeSocialUse() / 25);

		if (V.policies.oralAppeal === 1) {
			V.oralUseWeight += 2;
			V.vaginalUseWeight -= 1;
			V.analUseWeight -= 1;
		} else if (V.policies.vaginalAppeal === 1) {
			V.oralUseWeight -= 1;
			V.vaginalUseWeight += 2;
			V.analUseWeight -= 1;
		} else if (V.policies.analAppeal === 1) {
			V.oralUseWeight -= 1;
			V.vaginalUseWeight -= 1;
			V.analUseWeight += 2;
		}

		if (V.policies.oralAppeal === -1) {
			V.oralUseWeight -= 2;
			V.vaginalUseWeight += 1;
			V.analUseWeight += 1;
		}
		if (V.policies.vaginalAppeal === -1) {
			V.oralUseWeight += 1;
			V.vaginalUseWeight -= 2;
			V.analUseWeight += 1;
		}
		if (V.policies.analAppeal === -1) {
			V.oralUseWeight += 1;
			V.vaginalUseWeight += 1;
			V.analUseWeight -= 2;
		}

		if (V.policies.gumjobFetishism === 1) {
			V.oralUseWeight += 2;
		}

		if (V.policies.sexualOpenness === 1) {
			V.penetrativeUseWeight += 1;
		}
	}

	function saveWeekTotals() {
		V.cashLastWeek = V.cash;
		V.repLastWeek = V.rep;
		V.mods.food.lastWeek = V.mods.food.amount;
	}

	function weather() {
		if (V.weatherRemaining > 0) {
			V.weatherRemaining -= 1;
		}
	}

	function growNewCat() {
		if (V.growingNewCat > 0) {
			V.growingNewCat -= 1;
		}
	}


	function organs() {
		function advanceOrgan(o) {
			if (o.weeksToCompletion > 0) {
				if (V.organFarmUpgrade === 3) {
					o.weeksToCompletion -= 4;
				} else if (V.organFarmUpgrade === 2) {
					o.weeksToCompletion -= 2;
				} else {
					o.weeksToCompletion--;
				}
			}
		}

		for (const organ of V.organs) {
			advanceOrgan(organ);
		}

		// move completed non-incubator organs to V.completedOrgans
		V.organs = V.organs.filter(function(o) {
			if (o.weeksToCompletion <= 0) {
				V.completedOrgans.push(o);
				return false;
			}
			return true;
		});

		if (V.incubator.capacity > 0) {
			for (const organ of V.incubator.organs) {
				advanceOrgan(organ);
			}
		}

		// TODO: nurseryOrgans too, if those ever exist...
	}

	function prosthetics() {
		for (const p of V.adjustProsthetics) {
			if (p.workLeft > 0) {
				if (V.prostheticsUpgrade >= 3) {
					p.workLeft -= 40;
				} else if (V.prostheticsUpgrade === 2) {
					p.workLeft -= 20;
				} else {
					p.workLeft -= 10;
				}
				if (p.workLeft <= 0) {
					V.adjustProstheticsCompleted++;
				}
			}
		}
	}

	function nursery() {
		for (const c of V.cribs) {
			c.growTime--;
			c.birthWeek++;
			if (c.birthWeek >= 52) {
				c.birthWeek = 0;
				c.actualAge++;
			}
			if (c.actualAge >= 3) {
				App.Facilities.Nursery.infantToChild(c);
			}
		}
	}

	function food() {
		if (V.mods.food.enabled && V.mods.food.market) {
			V.mods.food.amount += App.Facilities.Farmyard.foodProduction();
		}
	}

	function PC() {
		// The average PC starts with 65 energy
		if (V.PC.physicalAge < V.PC.pubertyAgeXY && V.PC.physicalAge < V.PC.pubertyAgeXX) {
			V.PC.need = V.PC.energy / 10;
		} else if (V.PC.physicalAge >= 80) {
			V.PC.need = V.PC.energy / 8;
		} else if (V.PC.physicalAge >= 75) {
			V.PC.need = V.PC.energy / 7;
		} else if (V.PC.physicalAge >= 70) {
			V.PC.need = V.PC.energy / 6;
		} else if (V.PC.physicalAge >= 65) {
			V.PC.need = V.PC.energy / 5;
		} else if (V.PC.physicalAge >= 60) {
			V.PC.need = V.PC.energy / 4;
		} else if (V.PC.physicalAge >= 55) {
			V.PC.need = V.PC.energy / 3;
		} else if (V.PC.physicalAge >= 50) {
			V.PC.need = V.PC.energy / 2;
		} else if (V.PC.physicalAge >= 35) {
			V.PC.need = V.PC.energy;
		} else if (V.PC.physicalAge >= 18) {
			V.PC.need = V.PC.energy * 1.10;
		} else {
			V.PC.need = V.PC.energy * 1.30;
		}
		if (isPlayerFrigid()) {
			V.PC.need *= .90;
		} else if (V.PC.preg > V.PC.pregData.normalBirth / 2) {
			// disable this for reconsideration. It needs to contemplate how "full" the player is.
			// if (V.PC.belly >= 300000) {
			//	V.PC.need *= 0.5;
			// } else if (V.PC.belly >= 120000) {
			//	V.PC.need *= 0.7;
			// } else if (V.PC.belly >= 60000) {
			//	V.PC.need *= 0.9;
			// } else if (V.PC.energy > 40) { // small bonus described in prPregnancy
			//	V.PC.need *= 1.1;
			// }
		}
		if (isHorny(V.PC)) {
			V.PC.need *= 2;
		}
		if (V.PC.balls > 0 && V.PC.pubertyXY === 1 && V.PC.physicalAge <= (V.PC.pubertyAgeXY + 1) && (V.PC.physicalAge > V.PC.pubertyAgeXY) && V.PC.physicalAge < 18) {
			V.PC.need *= 1.25;
		}
		if ((V.PC.ovaries === 1 || V.PC.mpreg === 1) && V.PC.pubertyXX === 1 && V.PC.physicalAge <= (V.PC.pubertyAgeXX + 1) && (V.PC.physicalAge > V.PC.pubertyAgeXX) && V.PC.physicalAge < 18) {
			V.PC.need *= 1.25;
		}
		if (canGetPregnant(V.PC)) {
			if (V.PC.diet === PCDiet.FERTILITY) {
				V.PC.need *= 1.10;
			}
			if (V.PC.drugs === "fertility supplements") {
				V.PC.need *= 1.10;
			}
			if (V.PC.forcedFertDrugs > 0) {
				V.PC.need *= 1.15;
			}
		}
		if (V.PC.diet === PCDiet.CUM && V.PC.balls > 0) {
			// Having hyper balls and using this diet is probably going to leave you blueballed.
			V.PC.need *= 1 + ((V.PC.balls - V.PC.ballsImplant) / 10);
		}
		poorHealthNeedReduction(V.PC);
		V.PC.need = Math.round(V.PC.need);
		if (V.PC.lusty) {
			V.PC.need += 10;
		}
		if (V.PC.drugs === "stamina enhancers") {
			V.PC.need += 20;
		}
		if (V.PC.diet === PCDiet.EXOTIC) {
			V.PC.need += 10;
		}
		V.PC.deferredNeed = 0;
		if (V.PC.preg > 0) {
			WombProgress(V.PC, 1, 1);
			WombNormalizePreg(V.PC);
			V.PC.pregWeek = V.PC.preg;
			let newBelly = WombGetVolume(V.PC);
			if (newBelly >= V.PC.belly) {
				V.PC.belly = newBelly;
			} else if (V.PC.belly > 500) {
				V.PC.belly *= 0.75;
			}
		} else if (V.PC.belly > 0) {
			if (V.PC.belly < 100) {
				V.PC.belly = 0;
			} else {
				V.PC.belly *= 0.75;
			}
		}
		if (V.PC.pregWeek < 0) {
			V.PC.pregWeek++;
		}
		if (V.PC.lactation === 1 && V.PC.bellyPreg < 1500) {
			V.PC.lactationDuration--;
		}
	}

	function threaten() {
		V.threatened.pop();
		V.threatened.unshift([]);
	}

	function resetMiscGlobals() {
		// if a global is going to be used by the end-of-week reports, it must be reset here instead of in Next Week
		App.UI.StoryCaption.encyclopedia = "How to Play";
		V.StudID = 0;
	}

	function advance() {
		if (V.slaves.length < 1) {
			V.gameover = "no slaves";
			Engine.play("Gameover");
		} else if (V.arcologies[0].ownership < V.arcologies[0].minority) {
			V.gameover = "ownership";
			Engine.play("Gameover");
		} else {
			Engine.play("Slave Assignments Report");
		}
	}

	function confirmEndWeek() {
		const expiredReminders = V.reminders.filter(r => r.week <= V.week);
		if (
			(!V.sideBarOptions.confirmWeekEnd || confirm("Are you sure you want to end the week?")) &&
			(expiredReminders.length === 0 || confirm(`These reminders are due: ${toSentence(Array.from(expiredReminders, r => r.message))}. End the week anyway?`))
		) {
			App.UI.EndWeekAnim.start();
			setTimeout(doEndWeek, 0); // execute immediately, but after the event loop runs, so the loading screen gets shown
		}
	}

	return confirmEndWeek;
})();
