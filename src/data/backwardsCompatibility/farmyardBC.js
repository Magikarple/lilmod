// @ts-nocheck
App.Facilities.Farmyard.BC = function() {
	if (typeof V.farmyardUpgrades !== "object") {
		V.farmyardUpgrades = {
			pump: 0, fertilizer: 0, hydroponics: 0, machinery: 0, seeds: 0
		};
	}

	if (App.Data.Animals.size === 0) {
		App.Facilities.Farmyard.animals.init();
	}

	if (V.foodStored) {
		V.mods.food.amount += V.foodStored;

		delete V.foodStored;
	}

	if (V.canine) {
		V.animals.canine = Array.from(V.canine);

		delete V.canine;
	}
	if (V.hooved) {
		V.animals.hooved = Array.from(V.hooved);

		delete V.hooved;
	}
	if (V.feline) {
		V.animals.feline = Array.from(V.feline);

		delete V.feline;
	}

	if (!V.animals || typeof V.animals !== "object") {
		V.animals = {
			canine: [],
			hooved: [],
			feline: [],
		};
	} else {
		V.animals.canine = V.animals.canine.filter(canine => !!getAnimal(canine));
		V.animals.hooved = V.animals.hooved.filter(hooved => !!getAnimal(hooved));
		V.animals.feline = V.animals.feline.filter(feline => !!getAnimal(feline));
	}

	if (V.active.canine && typeof getAnimal(V.active.canine) === "undefined") { V.active.canine = null; }
	if (V.active.hooved && typeof getAnimal(V.active.hooved) === "undefined") { V.active.hooved = null; }
	if (V.active.feline && typeof getAnimal(V.active.feline) === "undefined") { V.active.feline = null; }

	if (V.farmyardShowgirls) {
		delete V.farmyardShowgirls;
	}

	if (V.farmyardFarmers) {
		delete V.farmyardFarmers;
	}
};
