// @ts-nocheck

App.Facilities.Pit.BC = function() {
	if (typeof V.pit === "number") {
		V.pit = V.pit ? {} : null;
	}

	if (V.pit) {
		if (V.releaseID < 1186) {
			V.pit.name = V.pit.name || V.pitName || "the Pit";
			V.pit.virginities = V.pit.virginities || V.pitVirginities || "neither";

			if (typeof V.pit.virginities !== "string") {
				const virginities = ["neither", "vaginal", "anal", "all"];

				V.pit.virginities = virginities[V.pit.virginities];
			}

			V.pit.bodyguardFights = V.pit.bodyguardFights || V.pitBG || false;
			V.pit.fighterIDs = V.pit.fighterIDs || V.fighterIDs || [];
			V.pit.fighters = V.pit.fighters || 0;

			if (V.pit.bodyguardFights && V.pit.fighterIDs.includes(V.BodyguardID)) {
				V.pit.fighterIDs.delete(V.BodyguardID);
			}

			if (V.farmyard) {
				V.pit.animal = V.pit.animal || V.pitAnimalType || null;
			}

			V.pit.trainingIDs = V.pit.trainingIDs || [];

			V.pit.audience = V.pit.audience || V.pitAudience || "none";
			V.pit.lethal = V.pit.lethal || V.pitLethal || false;
			V.pit.fought = V.pit.fought || V.pitFought || false;

			V.pit.slavesFighting = V.pit.slavesFighting || [];
			V.pit.decoration = V.pit.decoration || "standard";

			if (V.slaveFightingBG) {
				V.pit.slaveFightingBodyguard = V.slaveFightingBG;
			}
		}

		V.pit.activeFights = V.pit.activeFights || [];

		V.pit.lethal = V.pit.lethal === true ? 1 : V.pit.lethal === false ? 0 : V.pit.lethal;

		delete V.pit.animal;
		delete V.pit.bodyguardFights;
		delete V.pit.slaveFightingAnimal;

		if (V.pit.virginities === "neither") {
			V.pit.virginities = "none";
		}

		V.pit.active = V.pit.active || false;
		V.pit.fightsBase = V.pit.fightsBase || 0;
		V.pit.seats = V.pit.seats || 0;
		if (V.pit.minimumHealth !== true && V.pit.minimumHealth !== false) {
			V.pit.minimumHealth = true;
		}
		if (V.pit.slavesFighting !== null) {
			if (V.pit.slavesFighting.length !== 2) {
				V.pit.slavesFighting = null;
			} else if (!V.pit.slavesFighting.reduce((acc, id) => acc && !!getSlave(id), true)) {
				// a slave scheduled to fight isn't owned anymore
				V.pit.slavesFighting = null;
			}
		}
	}

	if (V.pit && V.pit.trainingIDs) {
		V.pit.trainingIDs = V.pit.trainingIDs.filter(id => !!getSlave(id));
	}
};
