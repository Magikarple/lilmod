App.Intro.init = function() {
	/*
	FREE CITIES
	a text-based slave management game
	Copyright (C) 2017 freecitiesdev

	This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.
	*/

	/* Set up the game as politely as possible. If values are already set, they are preserved. */
	App.Update.setNonexistentProperties(V, App.Data.defaultGameStateVariables);

	/* These variables must be created AND set to default values, NG+ or not */
	App.Update.setExistentProperties(V, App.Data.resetOnNGPlus);

	V.ver = App.Version.base;
	V.pmodVer = App.Version.pmod;
	V.releaseID = App.Version.release;

	/* 0 out the record books as we start a new game */
	setupLastWeeksCash();
	setupLastWeeksRep();

	if (V.saveImported === 0) { // new game (not NG+)
		V.PC = basePlayer();
		WombInit(V.PC);
		cashX(10000, "personalBusiness");
		initRules();
	} else { // imported save (NG+)
		App.Data.NewGamePlus();
	}

	/* Porn star counts (prestige 1) and ID's (prestige 3) */
	V.pornStars = {};
	for (const genre of App.Porn.getAllGenres()) {
		V.pornStars[genre.fameVar] = {p1count: 0, p3ID: 0};
	}

	assistant.object();
	repX(1000, "event");
	App.Data.prostheticIDs.forEach(function(id) {
		V.prosthetics[id] = {amount: 0, research: 0};
	});
	V.JobIDMap = makeJobIdMap();

	App.Mods.SF.Init();

	V.weatherToday = App.Data.Weather.hotNice.random();
	V.weatherLastWeek = 1;
	V.weatherType = 1;
	V.weatherRemaining = 6;
	V.prisonCircuitIndex = random(0, V.prisonCircuit.length-1);
	if (V.prisonCircuit[V.prisonCircuitIndex] === "juvenile detention" && (V.minimumSlaveAge >= 16 || V.pedo_mode === 1)) {
		V.prisonCircuitIndex = 0; // skip juvenile detention if juvenile slaves are not allowed, or we're in pedo mode (where all prisoners are juvenile)
	}

	/* I am not a slave object! Do not treat me like one! */
	V.customSlave = new App.Entity.CustomSlaveOrder();
	V.huskSlave = new App.Entity.CustomSlaveOrder();
};
