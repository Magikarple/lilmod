// @ts-nocheck
/* no-usedOnce */
// cSpell:ignore SFMOD, vaild, SFUC

App.Mods.SF.BC = function() {
	function InitClean() {
		delete V.SFMODToggle;
		delete V.securityForceActive;
		delete V.securityForceCreate;
		delete V.securityForceEventSeen;
	}

	function MainClean() {
		delete V.securityForceActive;
		delete V.securityForceRecruit;
		delete V.securityForceTrade;
		delete V.securityForceBooty;
		delete V.securityForceIncome;
		delete V.securityForceMissionEfficiency;
		delete V.securityForceProfitable;
		delete V.TierTwoUnlock;
		delete V.securityForceDepravity;
		delete V.SFAO;
		delete V.securityForceUpgradeTokenReset;
		delete V.securityForceUpgradeToken;
		delete V.securityForceGiftToken;
		delete V.securityForceRulesOfEngagement;
		delete V.securityForceFocus;
		delete V.securityForceAccountability;
		delete V.securityForceName;
		delete V.SubsidyActive;
		delete V.securityForceSubsidyActive;
	}

	function ColonelClean() {
		delete V.ColonelCore;
		delete V.securityForceColonelToken;
		delete V.securityForceColonelSexed;
		delete V.ColonelRelationship;
		delete V.securityForceSexedColonelToken;
	}

	function TradeShowClean() {
		delete V.OverallTradeShowAttendance;
		delete V.CurrentTradeShowAttendance;
		delete V.TradeShowIncome;
		delete V.TotalTradeShowIncome;
		delete V.TradeShowHelots;
		delete V.TotalTradeShowHelots;
	}

	function UnitsClean() {
		delete V.securityForceInfantryPower;
		delete V.securityForceArcologyUpgrades;
		delete V.securityForceVehiclePower;
		delete V.securityForceDronePower;
		delete V.securityForceStimulantPower;
		delete V.securityForceHeavyBattleTank;
		delete V.securityForceAircraftPower;
		delete V.securityForceSpacePlanePower;
		delete V.securityForceAC130;
		delete V.securityForceSatellitePower;
		delete V.securityForceGiantRobot;
		delete V.securityForceMissileSilo;
		delete V.securityForceAircraftCarrier;
		delete V.securityForceSubmarine;
		delete V.securityForceHeavyAmphibiousTransport;
		delete V.securityForcePersonnel;
		delete V.securityForceFortressZeppelin;
		delete V.securityForceHeavyTransport;
	}

	if (typeof V.SF !== "object") {
		if (V.securityForceEventSeen < 1) {
			V.securityForceActive = -1;
		} else {
			V.securityForceActive = 2;
		}
		V.SF = {Toggle: V.SFMODToggle, Active: V.securityForceActive};
		InitClean();
		if (V.securityForceName === undefined) {
			V.securityForceName = "the Special Force";
		}
		if (V.SF.Active >= 1) {
			Object.assign(V.SF, {
				Depravity: V.securityForceDepravity,
				Upgrade: V.securityForceUpgradeToken,
				Gift: V.securityForceGiftToken,
				UC: {Assign: V.SF.SpecOps, Lock: V.SF.SpecOpsLock},
				ROE: V.securityForceRulesOfEngagement,
				Target: V.securityForceFocus,
				Regs: V.securityForceAccountability,
				Lower: V.securityForceName,
			});
			MainClean();

			if (V.ColonelCore === undefined) {
				V.ColonelCore = "";
			}
			if (V.ColonelDiscussion === undefined) {
				V.ColonelDiscussion = 0;
			}
			if (V.ColonelSexed === undefined) {
				V.ColonelSexed = 0;
			}
			V.SF.Colonel = {
				Core: V.ColonelCore,
				Talk: V.securityForceColonelToken,
				Fun: V.securityForceColonelSexed,
				Status: V.ColonelRelationship
			};
			ColonelClean();

			if (V.TradeShowIncome === undefined) {
				V.TradeShowIncome = 0;
			}
			if (V.TotalTradeShowIncome === undefined) {
				V.TotalTradeShowIncome = 0;
			}
			if (V.TradeShowHelots === undefined) {
				V.TradeShowHelots = 0;
			}
			if (V.TotalTradeShowHelots === undefined) {
				V.TotalTradeShowHelots = 0;
			}
			V.SF.MercCon = {
				History: V.OverallTradeShowAttendance,
				CanAttend: V.CurrentTradeShowAttendance,
				Income: V.TradeShowIncome,
				Revenue: V.TotalTradeShowIncome,
				Menials: V.TradeShowHelots,
				TotalMenials: V.TotalTradeShowHelots,
				Mercs: 0,
				TotalMercs: 0
			};
			TradeShowClean();
			if (V.SF.MercCon.History > 0) {
				V.SF.MercCon.CanAttend = 1;
			}

			if (V.securityForceHeavyBattleTank === undefined) {
				V.securityForceHeavyBattleTank = 0;
			}
			if (V.securityForceSpacePlanePower === undefined) {
				V.securityForceSpacePlanePower = 0;
			}
			if (V.securityForceAC130 === undefined) {
				V.securityForceAC130 = 0;
			}
			if (V.securityForceSatellitePower === undefined) {
				V.securityForceSatellitePower = 0;
			}
			if (V.securityForceGiantRobot === undefined) {
				V.securityForceGiantRobot = 0;
			}
			if (V.securityForceMissileSilo === undefined) {
				V.securityForceMissileSilo = 0;
			}
			if (V.securityForceAircraftCarrier === undefined) {
				V.securityForceAircraftCarrier = 0;
			}
			if (V.securityForceSubmarine === undefined) {
				V.securityForceSubmarine = 0;
			}
			if (V.securityForceHeavyAmphibiousTransport === undefined) {
				V.securityForceHeavyAmphibiousTransport = 0;
			}

			V.SF.ArmySize = V.securityForcePersonnel;

			V.SF.SatLaunched = 0;

			V.SF.Squad = {
				Armoury: V.securityForceInfantryPower,
				Firebase: V.securityForceArcologyUpgrades,
				AV: V.securityForceVehiclePower,
				TV: V.securityForceVehiclePower,
				Drones: V.securityForceDronePower,
				Drugs: V.securityForceStimulantPower,
				PGT: V.securityForceHeavyBattleTank,
				AA: V.securityForceAircraftPower,
				TA: V.securityForceAircraftPower,
				SpacePlane: V.securityForceSpacePlanePower,
				GunS: V.securityForceAC130,
				Satellite: V.securityForceSatellitePower,
				GiantRobot: V.securityForceGiantRobot,
				MissileSilo: V.securityForceMissileSilo,
				AircraftCarrier: V.securityForceAircraftCarrier,
				Sub: V.securityForceSubmarine,
				HAT: V.securityForceHeavyAmphibiousTransport
			};
			UnitsClean();
		} else {
			App.Mods.SF.Init();
		}
	} else if (typeof V.SF === "object") {
		V.SF.FS = V.SF.FS || {};
		V.SF.FS.Tension = V.SF.FS.Tension || -1;

		if (V.SF.Toggle && V.SF.Active >= 1) {
			for (const currentFS of App.Mods.SF.fsIntegration.list().all) {
				if (typeof V.SF.FS[currentFS] === "number") {
					V.SF.FS[currentFS] = {lv: V.SF.FS[currentFS]};
				}
				V.SF.FS[currentFS] = V.SF.FS[currentFS] || {};
				V.SF.FS[currentFS].lv = V.SF.FS[currentFS].lv || 0;
				V.SF.FS[currentFS].gift = V.SF.FS[currentFS].gift || 0;
				delete V.SF.FS[currentFS].validOption;
				delete V.SF.FS[currentFS].vaildOption;
			}

			V.SF.UC = V.SF.UC || {};
			V.SF.Depravity = V.SF.Depravity || 0;
			V.SF.Upgrade = V.SF.Upgrade || 0;
			V.SF.CreditsInvested = V.SF.CreditsInvested || 0;
			V.SF.UC.Assign = V.SF.UC.Assign || 0;
			V.SF.UC.Lock = V.SF.UC.Lock || 0;
			V.SF.ROE = V.SF.ROE || "hold";
			V.SF.Target = V.SF.Target || "recruit";
			V.SF.Regs = V.SF.Regs || "strict";
			V.SF.Lower = V.SF.Lower || "the Special Force";

			V.SF.ArmySize = V.SF.ArmySize || 40;

			V.SF.Squad = V.SF.Squad || {};
			for (const upgrade of App.Mods.SF.upgrades.list('all')) {
				V.SF.Squad[upgrade] = V.SF.Squad[upgrade] || 0;
			}

			V.SF.SatLaunched = V.SF.SatLaunched || 0;

			V.SF.Colonel = V.SF.Colonel || {};
			V.SF.Colonel.Core = V.SF.Colonel.Core || "";
			V.SF.Colonel.Status = V.SF.Colonel.Status || 0;

			V.SF.MercCon = V.SF.MercCon || {};
			V.SF.MercCon.History = V.SF.MercCon.History || 0;
			V.SF.MercCon.CanAttend = V.SF.MercCon.CanAttend || 0;
			if (V.SF.MercCon.History >= 1) {
				V.SF.MercCon.CanAttend = -1;
			}
			V.SF.MercCon.Income = V.SF.MercCon.Income || 0;
			V.SF.MercCon.Revenue = V.SF.MercCon.Revenue || 0;
			V.SF.MercCon.Mercs = V.SF.MercCon.Mercs || 0;
			V.SF.MercCon.Menials = V.SF.MercCon.Menials || 0;
			V.SF.MercCon.TotalMenials = V.SF.MercCon.TotalMenials || 0;
			V.SF.MercCon.TotalMercs = V.SF.MercCon.TotalMercs || 0;

			if (typeof V.SF.Squad.Satellite === "object") {
				if (V.SF.Squad.Satellite.InOrbit > 0) {
					V.SF.SatLaunched = V.SF.Squad.Satellite.InOrbit; delete V.SF.Squad.Satellite.InOrbit;
				}
				V.SF.Squad.Satellite = V.SF.Squad.Satellite.lv;
			}

			delete V.SF.FS.upgrade; delete V.SF.UC.num;
			delete V.SF.Gift;

			if (V.Tour !== undefined) {
				V.SF.tour = V.Tour || 0;
			}

			if (V.SF.Squad.Troops) {
				V.SF.ArmySize = V.SF.Squad.Troops;
				delete V.SF.Squad.Troops;
			}

			if (V.SFUnit !== undefined) {
				if (V.SFUnit.AT !== undefined) {
					V.SFUnitTA = 0;
				}
			}

			if (V.SF.Squad !== undefined && V.SF.Squad.Satellite !== undefined && V.SatLaunched !== undefined) {
				V.SF.Squad.Sat = {lv: V.SF.Squad.Satellite, InOrbit: V.SatLaunched};
				V.SF.Squad.Satellite = V.SF.Squad.Sat;
				delete V.SF.Squad.Sat;
				delete V.SatLaunched;
			}

			if (V.SFTradeShow !== undefined) {
				V.SF.MercCon = V.SFTradeShow;
			}
			delete V.SFTradeShow;

			if (V.SF.MercCon !== undefined) {
				if (V.SF.MercCon.View !== undefined) {
					delete V.SF.MercCon.View;
				}
				if (V.SF.MercCon.Helots !== undefined) {
					V.SF.MercCon.Menials = V.SF.MercCon.Helots;
					delete V.SF.MercCon.Helots;
				}
				if (V.SF.MercCon.TotalHelots !== undefined) {
					V.SF.MercCon.TotalMenials = V.SF.MercCon.TotalHelots;
					delete V.SF.MercCon.TotalHelots;
				}
			}

			if (V.SFColonel !== undefined) {
				V.SF.Colonel = V.SFColonel;
			}
			delete V.SF.Colonel.Fun; delete V.SF.Colonel.Talk;

			if (V.SF.SpecOps !== undefined && V.SF.SpecOpsLock !== undefined) {
				V.SF.UC = {Assign: V.SF.SpecOps, Lock: V.SF.SpecOpsLock};
			}

			if (V.SFUC !== undefined) {
				V.SF.UC.num = V.SFUC || 0;
			}

			if (V.SpecOpsLock !== undefined) {
				V.SF.SpecOpsLock = V.SpecOpsLock;
			}

			if (V.SF.U !== undefined) {
				V.SF.Upgrade = V.SF.U || 0;
			}

			if (V.SF.Depravity < 0) {
				V.SF.Depravity = 0;
			}
		}
	}

	delete V.Tour; delete V.SFColonel; delete V.SFUnit;
	delete V.SF.tour; delete V.SF.Caps; delete V.SF.Size; delete V.choice;
	delete V.SF.Units; delete V.SpecOpsLock; delete V.SF.U; delete V.SF.WG;
	delete V.SF.Subsidy; delete V.SF.SpecOps; delete V.SF.SpecOpsLock; delete V.SFUC;

	if (V.SF.FS.BadOutcome && !V.SF.Colonel.Core) {
		switch (V.SF.FS.BadOutcome) {
			case 'MIGRATION':
				V.SF.Colonel.Core = "kind";
				break;
			case 'Revolt':
			case 'ANNIHILATION':
				V.SF.Colonel.Core = "cruel";
				break;
			case 'OCCUPATION':
				V.SF.Colonel.Core = "brazen";
				break;
			case 'ASSIMILATION':
				V.SF.Colonel.Core = "jaded";
				break;
			case 'ISOLATION':
				V.SF.Colonel.Core = "shell shocked";
				break;
		}
	}
	delete V.SF.FS.BadOutcome;
	if (V.SF.BadOutcome !== undefined) {
		delete V.SF.BadOutcome;
	}
	if (V.arcologies[0].SFRaid !== undefined) {
		delete V.arcologies[0].SFRaid;
	}
	if (V.arcologies[0].SFRaidTarget !== undefined) {
		delete V.arcologies[0].SFRaidTarget;
	}
	if (V.SF.Facility !== undefined) {
		delete V.SF.Facility;
	}

	if (V.SF.MWU !== undefined) {
		delete V.SF.MWU;
	}
	if (V.SF.Bonus !== undefined) {
		delete V.SF.Bonus;
	}

	InitClean();
	MainClean();
	ColonelClean();
	TradeShowClean();
	UnitsClean();

	if (V.week < 72 && V.SF.Active !== -1) { V.SF.Active = -1; }
};
