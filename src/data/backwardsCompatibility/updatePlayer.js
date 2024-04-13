// @ts-nocheck
/**
 * @param {App.Entity.PlayerState} PC
 * @param {boolean} [genepool=false]
 * TODO: at some point this needs to be split for datatype and so on. "Needs improvement"
 */
App.Update.Player = function(PC, genepool) {
	App.Update.setNonexistentProperties(PC, {
		pregNoticeDefault: "none",
		pregNoticeBypass: false,
	});
	const quirks = {};
	App.Data.geneticQuirks.forEach((value, q) => quirks[q] = 0);
	if (typeof PC.geneticQuirks === "undefined") {
		// initialize quirks from scratch
		PC.geneticQuirks = clone(quirks);
		if (PC.birthMaster > 0) {
			PC.geneticQuirks.fertility = 2;
		} else if (PC.career === "servant") {
			PC.geneticQuirks.fertility = 1;
		}
	} else {
		// add any new quirks
		PC.geneticQuirks = Object.assign(clone(quirks), PC.geneticQuirks);
	}
	PC.geneMods = Object.assign({
		NCS: 0, rapidCellGrowth: 0, immortality: 0, flavoring: 0, aggressiveSperm: 0, livestock: 0, progenitor: 0
	}, PC.geneMods);

	function updatePlayerBoobPotential() {
		const playerGenes = genepool ? PC : V.genePool.find(s => s.ID === -1);
		if (playerGenes.boobs <= 200 && playerGenes.genes === "XY") {
			PC.natural.boobs = 900;
		} else if (playerGenes.boobsImplant > 0 && App.Medicine.fleshSize(playerGenes, 'boobs') < 300) {
			PC.natural.boobs = adjustBreastSize(PC);
		} else {
			PC.natural.boobs = Math.clamp(App.Medicine.fleshSize(playerGenes, 'boobs'), 200, 2000);
		}
	}

	if (!PC.natural) {
		PC.natural = new App.Entity.GeneticState();
		if (PC.physicalAge >= 20) {
			PC.natural.height = PC.height - PC.heightImplant * 10;
		} else {
			// find and set a reasonable natural height for this immature player
			if (PC.geneticQuirks.dwarfism === 2 && PC.geneticQuirks.gigantism !== 2) {
				PC.natural.height = Height.randomAdult(PC, {limitMult: [-4, -1], spread: 0.15});
			} else if (PC.geneticQuirks.gigantism === 2) {
				PC.natural.height = Height.randomAdult(PC, {limitMult: [3, 10], spread: 0.15});
			} else {
				PC.natural.height = Height.randomAdult(PC);
			}
		}
		updatePlayerBoobPotential();
	}
	if (!isFinite(PC.natural.boobs)) {
		updatePlayerBoobPotential();
	}
	if (!isFinite(PC.energy)) {
		PC.energy = 65;
	}
	WombInit(PC);
};
