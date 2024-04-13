// T=SugarCube.State.temporary;
App.Mods.SF.Init = function() {
	if (passage() === "Alpha disclaimer" || passage() === "New Game Plus") {
		V.SF = {Active: -1, Toggle: 0};
	}
	V.SF.FS = V.SF.FS || {};
	V.SF.FS.Tension = V.SF.FS.Tension || -1;

	if (V.SF.Toggle && V.SF.Active >= 1) {
		Object.assign(V.SF, {
			UC: {Assign: 0, lock: 0},
			Depravity: 0,
			Size: 0,
			Upgrade: 0,
			CreditsInvested: 0,
			Gift: 0,
			ROE: "hold",
			Target: "recruit",
			Regs: "strict",
			Lower: "the Special Force",
			ArmySize: 40,
			SatLaunched: 0,
			Squad: {},
			Colonel: {
				Core: "",
				Talk: 0,
				Fun: 0,
				Status: 0
			},
			MercCon: {
				History: 0,
				CanAttend: 0,
				Income: 0,
				Revenue: 0,
				Mercs: 0,
				Menials: 0,
				TotalMenials: 0,
				TotalMercs: 0
			}
		});

		for (const upgrade of App.Mods.SF.upgrades.list('all')) {
			V.SF.Squad[upgrade] = 0;
		}

		for (const currentFS of App.Mods.SF.fsIntegration.list().all) {
			V.SF.FS[currentFS] = {lv: 0, gift: 0};
		}
	}
	// V.arcologies[0].SFRaid = 1; V.arcologies[0].SFRaidTarget = -1;
};

App.Mods.SF.env = function() {
	if (V.economy > 100) {
		return 4;
	} else if (V.economy > 67) {
		return 3;
	} else {
		return 2;
	}
};

App.Mods.SF.SFC = function() {
	return `The Colonel`;
};

App.Mods.SF.ColonelStatus = function() {
	if (V.SF.Colonel.Status <= 19) {
		return `boss`;
	} else if (V.SF.Colonel.Status <= 39) {
		return `friend`;
	} else {
		return `fuckbuddy`;
	}
};

App.Mods.SF.totalNetWorth = function() {
	let value = 0;
	if (V.SF.Toggle && V.SF.Active >= 1) {
		value += V.SF.CreditsInvested;
		value += V.SF.MercCon.Revenue;
		value -= App.Mods.SF.AAR()[1];
		value += App.Mods.SF.AAR()[2];
	}
	return value;
};
