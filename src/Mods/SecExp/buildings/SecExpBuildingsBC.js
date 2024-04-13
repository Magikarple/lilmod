// cSpell:ignore recuriter, weap

App.Mods.SecExp.BC = (function() {
	return {
		propHub,
		riotCenter,
		barracks,
		weaponsManufacturing,
		transportHub,
		secHub
	};

	function propHub() {
		if (V.SecExp.buildings.pr === null) {
			delete V.SecExp.buildings.pr;
		}
		if (V.SecExp.buildings.pr) {
			V.SecExp.buildings.propHub = V.SecExp.buildings.pr;
			delete V.SecExp.buildings.pr;
		}

		if (V.SecExp.buildings.propHub) {
			delete V.SecExp.buildings.propHub.active;
		}
		if (V.SecExp.buildings.propHub && Object.entries(V.SecExp.buildings.propHub).length === 0) {
			delete V.SecExp.buildings.propHub;
		} else if (V.propHub || (V.SecExp.buildings.propHub && Object.entries(V.SecExp.buildings.propHub).length > 0)) {
			V.SecExp.buildings.propHub = V.SecExp.buildings.propHub || {};
			V.SecExp.buildings.propHub.upgrades = V.SecExp.buildings.propHub.upgrades || {};
			V.SecExp.buildings.propHub.recruiterOffice = V.SecExp.buildings.propHub.recruiterOffice || V.SecExp.buildings.propHub.recuriterOffice || V.recuriterOffice || V.RecuriterOffice || 0;
			delete V.SecExp.buildings.propHub.recuriterOffice;

			V.SecExp.buildings.propHub.upgrades.campaign = V.SecExp.buildings.propHub.upgrades.campaign || V.SecExp.buildings.propHub.campaign || V.propCampaign || 0;
			delete V.SecExp.buildings.propHub.campaign;
			V.SecExp.buildings.propHub.upgrades.miniTruth = V.SecExp.buildings.propHub.upgrades.miniTruth || V.SecExp.buildings.propHub.miniTruth || V.miniTruth || 0;
			delete V.SecExp.buildings.propHub.miniTruth;

			V.SecExp.buildings.propHub.upgrades.secretService = V.SecExp.buildings.propHub.upgrades.secretService || V.SecExp.buildings.propHub.secretService || V.SecExp.buildings.propHub.SS || V.secretService || 0;
			delete V.SecExp.buildings.propHub.secretService;
			delete V.SecExp.buildings.propHub.SS;

			V.SecExp.buildings.propHub.focus = V.SecExp.buildings.propHub.focus || "social engineering";
			if (V.propFocus && V.propFocus !== "none") {
				V.SecExp.buildings.propHub.focus = V.propFocus;
			}

			V.SecExp.buildings.propHub.upgrades.fakeNews = V.SecExp.buildings.propHub.upgrades.fakeNews || V.SecExp.buildings.propHub.fakeNews || V.fakeNews || 0;
			delete V.SecExp.buildings.propHub.fakeNews;

			V.SecExp.buildings.propHub.upgrades.controlLeaks = V.SecExp.buildings.propHub.upgrades.controlLeaks || V.SecExp.buildings.propHub.controlLeaks || V.controlLeaks || 0;
			delete V.SecExp.buildings.propHub.controlLeaks;

			V.SecExp.buildings.propHub.upgrades.marketInfiltration = V.SecExp.buildings.propHub.upgrades.marketInfiltration || V.SecExp.buildings.propHub.marketInfiltration || V.marketInfiltration || 0;
			delete V.SecExp.buildings.propHub.marketInfiltration;

			V.SecExp.buildings.propHub.upgrades.blackOps = V.SecExp.buildings.propHub.upgrades.blackOps || V.SecExp.buildings.propHub.blackOps || V.blackOps || 0;
			delete V.SecExp.buildings.propHub.blackOps;
		}
	}

	function riotCenter() {
		if (V.riotCenter || (V.SecExp.buildings.riotCenter && Object.entries(V.SecExp.buildings.riotCenter).length > 0)) {
			V.SecExp.buildings.riotCenter = V.SecExp.buildings.riotCenter || {};
			V.SecExp.buildings.riotCenter.upgrades = V.SecExp.buildings.riotCenter.upgrades || V.riotUpgrades || {};
			V.SecExp.buildings.riotCenter.fort = V.SecExp.buildings.riotCenter.fort || V.fort || {};

			V.SecExp.buildings.riotCenter.upgrades.freeMedia = V.SecExp.buildings.riotCenter.upgrades.freeMedia || 0;
			V.SecExp.buildings.riotCenter.upgrades.rapidUnit = V.SecExp.buildings.riotCenter.upgrades.rapidUnit || 0;
			V.SecExp.buildings.riotCenter.upgrades.rapidUnitSpeed = V.SecExp.buildings.riotCenter.upgrades.rapidUnitSpeed || 0;

			V.SecExp.buildings.riotCenter.fort.reactor = V.SecExp.buildings.riotCenter.fort.reactor || 0;
			V.SecExp.buildings.riotCenter.fort.waterway = V.SecExp.buildings.riotCenter.fort.waterway || 0;
			V.SecExp.buildings.riotCenter.fort.assistant = V.SecExp.buildings.riotCenter.fort.assistant || 0;

			V.SecExp.buildings.riotCenter.sentUnitCooldown = V.SecExp.buildings.riotCenter.sentUnitCooldown || V.sentUnitCooldown || 0;
			V.SecExp.buildings.riotCenter.advancedRiotEquip = V.SecExp.buildings.riotCenter.advancedRiotEquip || V.advancedRiotEquip || 0;
			V.SecExp.buildings.riotCenter.brainImplant = V.SecExp.buildings.riotCenter.brainImplant || -1;
			if (jsDef(V.brainImplant)) {
				V.SecExp.buildings.riotCenter.brainImplant = V.brainImplant;
			}
			V.SecExp.buildings.riotCenter.brainImplantProject = V.SecExp.buildings.riotCenter.brainImplantProject || V.brainImplantProject || 0;
		}
	}

	function barracks() {
		if (V.SecExp.buildings.barracks) {
			delete V.SecExp.buildings.barracks.active;
		}
		if (V.SecExp.buildings.barracks && Object.entries(V.SecExp.buildings.barracks).length === 0) {
			delete V.SecExp.buildings.barracks;
		} else if (V.secBarracks || (V.SecExp.buildings.barracks && Object.entries(V.SecExp.buildings.barracks).length > 0)) {
			V.SecExp.buildings.barracks = V.SecExp.buildings.barracks || V.secBarracksUpgrades || {};
			V.SecExp.buildings.barracks.size = V.SecExp.buildings.barracks.size || 0;
			V.SecExp.buildings.barracks.luxury = V.SecExp.buildings.barracks.luxury || 0;
			V.SecExp.buildings.barracks.training = V.SecExp.buildings.barracks.training || 0;
			V.SecExp.buildings.barracks.loyaltyMod = V.SecExp.buildings.barracks.loyaltyMod || 0;
			if (V.SecExp.buildings.barracks.upgrades) {
				V.SecExp.buildings.barracks.size = V.SecExp.buildings.barracks.upgrades.size;
				V.SecExp.buildings.barracks.luxury = V.SecExp.buildings.barracks.upgrades.luxury;
				V.SecExp.buildings.barracks.training = V.SecExp.buildings.barracks.upgrades.training;
				V.SecExp.buildings.barracks.loyaltyMod = V.SecExp.buildings.barracks.upgrades.loyaltyMod;
				delete V.SecExp.buildings.barracks.upgrades;
			}
		}
	}

	function weaponsManufacturing() {
		if (V.weapManu || (V.SecExp.buildings.weapManu && Object.entries(V.SecExp.buildings.weapManu).length > 0)) {
			V.SecExp.buildings.weapManu = V.SecExp.buildings.weapManu || {};
			V.SecExp.buildings.weapManu.space = V.SecExp.buildings.weapManu.space || 500;
			V.SecExp.buildings.weapManu.menials = V.SecExp.buildings.weapManu.menials || V.weapMenials || V.weapHelots || 0;
			V.SecExp.buildings.weapManu.productivity = V.SecExp.buildings.weapManu.productivity || V.weapProductivity || 1;
			V.SecExp.buildings.weapManu.lab = V.SecExp.buildings.weapManu.lab || V.weapLab || 1;
			V.SecExp.buildings.weapManu.sellTo = V.SecExp.buildings.weapManu.sellTo || V.sellTo || {};
			if (!jsDef(V.SecExp.buildings.weapManu.sellTo.citizen)) {
				V.SecExp.buildings.weapManu.sellTo.citizen = 1;
			}
			if (!jsDef(V.SecExp.buildings.weapManu.sellTo.raiders)) {
				V.SecExp.buildings.weapManu.sellTo.raiders = 1;
			}
			if (!jsDef(V.SecExp.buildings.weapManu.sellTo.oldWorld)) {
				V.SecExp.buildings.weapManu.sellTo.oldWorld = 1;
			}
			if (!jsDef(V.SecExp.buildings.weapManu.sellTo.FC)) {
				V.SecExp.buildings.weapManu.sellTo.FC = 1;
			}

			V.SecExp.buildings.weapManu.upgrades = V.SecExp.buildings.weapManu.upgrades || {};
			V.SecExp.buildings.weapManu.upgrades.completed = V.SecExp.buildings.weapManu.upgrades.completed || V.completedUpgrades || [];
			if (!App.Mods.SecExp.weapManu.completed()) {
				V.SecExp.buildings.weapManu.upgrades.queue = V.SecExp.buildings.weapManu.upgrades.queue || [];
				if (jsDef(V.currentUpgrade)) {
					if (!jsDef(V.currentUpgrade.ID)) {
						if (V.currentUpgrade.name === "magnetic based ballistic weaponry") {
							V.currentUpgrade.ID = 0;
						} else if (V.currentUpgrade.name === "ceramo-metallic alloys") {
							V.currentUpgrade.ID = 1;
						} else if (V.currentUpgrade.name === "rapid action stimulants") {
							V.currentUpgrade.ID = 2;
						} else if (V.currentUpgrade.name === "fast response neural stimulant") {
							V.currentUpgrade.ID = 3;
						} else if (V.currentUpgrade.name === "universal cyber enhancements") {
							V.currentUpgrade.ID = 4;
						} else if (V.currentUpgrade.name === "remote neural links") {
							V.currentUpgrade.ID = 5;
						} else if (V.currentUpgrade.name === "combined training regimens with the special force") {
							V.currentUpgrade.ID = 6;
						} else if (V.currentUpgrade.name === "a variant of the stimulant cocktail that the special force created") {
							V.currentUpgrade.ID = 7;
						} else if (V.currentUpgrade.name === "a mesh network based off the custom network of the special force") {
							V.currentUpgrade.ID = 8;
						} else if (V.currentUpgrade.name === "dynamic battle aware AI") {
							V.currentUpgrade.ID = -1;
						} else if (V.currentUpgrade.name === "adaptive armored frames") {
							V.currentUpgrade.ID = -2;
						} else if (V.currentUpgrade.name === "advanced synthetic alloys") {
							V.currentUpgrade.ID = -3;
						}
					}
					V.SecExp.buildings.weapManu.upgrades.queue.push({ID: V.currentUpgrade.ID, time: V.currentUpgrade.time});
				}

				if (jsDef(V.SecExp.buildings.weapManu.upgrades.current)) {
					if (V.SecExp.buildings.weapManu.upgrades.current.time > 0) {
						V.SecExp.buildings.weapManu.upgrades.queue.push(V.SecExp.buildings.weapManu.upgrades.current);
					}
					delete V.SecExp.buildings.weapManu.upgrades.current;
				}
			} else {
				delete V.SecExp.buildings.weapManu.upgrades.queue;
			}
		}
	}

	function transportHub() {
		if (V.transportHub || (V.SecExp.buildings.transportHub && Object.entries(V.SecExp.buildings.transportHub).length > 0)) {
			V.SecExp.buildings.transportHub = V.SecExp.buildings.transportHub || {};
			V.SecExp.buildings.transportHub.airport = V.SecExp.buildings.transportHub.airport || V.airport || 1;
			V.SecExp.buildings.transportHub.security = V.SecExp.buildings.transportHub.security || V.hubSecurity || 1;
			V.SecExp.buildings.transportHub.surfaceTransport = V.SecExp.buildings.transportHub.surfaceTransport || 1;
			if (V.releaseID < 1093) {
				if (V.terrain !== "oceanic" && V.terrain !== "marine") {
					V.SecExp.buildings.transportHub.surfaceTransport = V.railway || 1;
				} else {
					V.SecExp.buildings.transportHub.surfaceTransport = V.docks || 1;
				}
			}
		}
	}

	function secHub() {
		if (V.secHQ || (V.SecExp.buildings.secHub && Object.entries(V.SecExp.buildings.secHub).length > 0)) {
			V.SecExp.buildings.secHub = V.SecExp.buildings.secHub || {};
			V.SecExp.buildings.secHub.menials = V.SecExp.buildings.secHub.menials || V.secMenials || V.secHelots || 0;
			V.SecExp.buildings.secHub.coldstorage = V.SecExp.buildings.secHub.coldstorage || 0;

			V.SecExp.buildings.secHub.upgrades = V.SecExp.buildings.secHub.upgrades || {};
			V.SecExp.buildings.secHub.upgrades.security = V.SecExp.buildings.secHub.upgrades.security || {};
			if (V.secUpgrades) {
				V.SecExp.buildings.secHub.coldstorage = V.secUpgrades.coldstorage;
				V.SecExp.buildings.secHub.upgrades.security = {
					nanoCams: V.secUpgrades.nanoCams,
					cyberBots: V.secUpgrades.cyberBots,
					eyeScan: V.secUpgrades.eyeScan,
					cryptoAnalyzer: V.secUpgrades.cryptoAnalyzer,
				};
			}
			V.SecExp.buildings.secHub.upgrades.crime = V.SecExp.buildings.secHub.upgrades.crime || V.crimeUpgrades || {};
			V.SecExp.buildings.secHub.upgrades.intel = V.SecExp.buildings.secHub.upgrades.intel || V.intelUpgrades || {};
			V.SecExp.buildings.secHub.upgrades.readiness = V.SecExp.buildings.secHub.upgrades.readiness || V.readinessUpgrades || {};

			V.SecExp.buildings.secHub.upgrades.security.nanoCams = V.SecExp.buildings.secHub.upgrades.security.nanoCams || 0;
			V.SecExp.buildings.secHub.upgrades.security.cyberBots = V.SecExp.buildings.secHub.upgrades.security.cyberBots || 0;
			V.SecExp.buildings.secHub.upgrades.security.eyeScan = V.SecExp.buildings.secHub.upgrades.security.eyeScan || 0;
			V.SecExp.buildings.secHub.upgrades.security.cryptoAnalyzer = V.SecExp.buildings.secHub.upgrades.security.cryptoAnalyzer || 0;

			V.SecExp.buildings.secHub.upgrades.crime.autoTrial = V.SecExp.buildings.secHub.upgrades.crime.autoTrial || 0;
			V.SecExp.buildings.secHub.upgrades.crime.autoArchive = V.SecExp.buildings.secHub.upgrades.crime.autoArchive || 0;
			V.SecExp.buildings.secHub.upgrades.crime.worldProfiler = V.SecExp.buildings.secHub.upgrades.crime.worldProfiler || 0;
			V.SecExp.buildings.secHub.upgrades.crime.advForensic = V.SecExp.buildings.secHub.upgrades.crime.advForensic || 0;

			V.SecExp.buildings.secHub.upgrades.intel.sensors = V.SecExp.buildings.secHub.upgrades.intel.sensors || 0;
			V.SecExp.buildings.secHub.upgrades.intel.radar = V.SecExp.buildings.secHub.upgrades.intel.radar || 0;
			V.SecExp.buildings.secHub.upgrades.intel.signalIntercept = V.SecExp.buildings.secHub.upgrades.intel.signalIntercept || 0;

			V.SecExp.buildings.secHub.upgrades.readiness.earlyWarn = V.SecExp.buildings.secHub.upgrades.readiness.earlyWarn || 0;
			V.SecExp.buildings.secHub.upgrades.readiness.rapidPlatforms = V.SecExp.buildings.secHub.upgrades.readiness.rapidPlatforms || 0;
			V.SecExp.buildings.secHub.upgrades.readiness.pathways = V.SecExp.buildings.secHub.upgrades.readiness.pathways || 0;
			V.SecExp.buildings.secHub.upgrades.readiness.rapidVehicles = V.SecExp.buildings.secHub.upgrades.readiness.rapidVehicles || 0;
		}
	}
})();
