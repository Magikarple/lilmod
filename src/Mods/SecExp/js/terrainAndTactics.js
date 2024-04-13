globalThis.terrainAndTactics = function() {
	const el = new DocumentFragment();
	const table = App.UI.DOM.appendNewElement("table", el);
	table.classList.add("facility-stats");
	const header = table.createTHead();
	let row = header.insertRow();
	row.insertCell(); // top left corner should be empty

	const tacticTotal = new Map();

	// Column headers
	for (const terrainType of Object.keys(App.Data.SecExp.TerrainAndTactics.get("urban"))) {
		const cell = row.insertCell();
		cell.innerHTML = terrainType;
	}

	// Column summarizing which terrains are the easiest.
	const cell = row.insertCell();
	cell.innerHTML = "Ease";

	for (const [terrainType, tactics] of App.Data.SecExp.TerrainAndTactics) {
		const row = table.insertRow();

		// First cell describes terrain
		const cell = row.insertCell();
		cell.innerHTML = capFirstChar(terrainType);

		let terrainDifficulty = 0;
		for (const tactic in tactics) {
			let mods = 0;
			for (const mod of ["atkMod", "defMod", "tacChance"]) {
				mods += tactics[tactic][mod] || 0;
			}
			terrainDifficulty += mods;
			tacticTotal.set(tactic, tacticTotal.get(tactic) + mods || mods);
			App.UI.DOM.appendNewElement("td", row, stringy(mods), [mods > 0 ? "green" : "red"]);
		}

		// Ease column entry
		App.UI.DOM.appendNewElement("td", row, stringy(terrainDifficulty));
	}

	// Row summarizing average of each tactic.
	row = table.insertRow();
	App.UI.DOM.appendNewElement("td", row, "Strength");
	for (const value of tacticTotal.values()) {
		App.UI.DOM.appendNewElement("td", row, stringy(value));
	}
	return el;

	function stringy(num) {
		return String(Math.trunc(100*num)/10);
	}
};

App.Data.SecExp.TerrainAndTactics = new Map([
	["urban", {
		"Bait and Bleed": {
			atkMod: 0.15,
			defMod: 0.10,
			tacChance: 0.25,
		},
		"Guerrilla": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Choke Points": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Interior Lines": {
			atkMod: 0.05,
			defMod: 0.10,
			tacChance: 0.15,
		},
		"Pincer Maneuver": {
			atkMod: -0.05,
			defMod: -0.10,
			tacChance: -0.15,
		},
		"Defense In Depth": {
			atkMod: -0.05,
			defMod: -0.05,
			tacChance: -0.10,
		},
		"Blitzkrieg": {
			atkMod: -0.15,
			defMod: -0.10,
			tacChance: -0.25,
		},
		"Human Wave": {
			atkMod: -0.15,
			defMod: -0.15,
			tacChance: -0.30,
		},
	}],
	["rural", {
		"Bait and Bleed": {
			atkMod: -0.05,
			defMod: -0.10,
			tacChance: -0.15,
		},
		"Guerrilla": {
			atkMod: -0.10,
			defMod: -0.10,
			tacChance: -0.20,
		},
		"Choke Points": {
			atkMod: -0.10,
			defMod: -0.15,
			tacChance: -0.25,
		},
		"Interior Lines": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Pincer Maneuver": {
			atkMod: 0.15,
			defMod: 0.10,
			tacChance: 0.25,
		},
		"Defense In Depth": {
			atkMod: 0.15,
			defMod: 0.15,
			tacChance: 0.30,
		},
		"Blitzkrieg": {
			atkMod: 0.15,
			defMod: 0.10,
			tacChance: 0.25,
		},
		"Human Wave": {
			atkMod: 0.20,
			defMod: 0.05,
			tacChance: 0.25,
		},
	}],
	["hills", {
		"Bait and Bleed": {
			atkMod: 0.05,
			defMod: 0.05,
			tacChance: 0.10,
		},
		"Guerrilla": {
			atkMod: 0.05,
			defMod: 0.10,
			tacChance: 0.15,
		},
		"Choke Points": {
			atkMod: 0.10,
			defMod: 0.10,
			tacChance: 0.20,
		},
		"Interior Lines": {
			atkMod: -0.05,
			defMod: -0.05,
			tacChance: -0.10,
		},
		"Pincer Maneuver": {
			atkMod: 0.10,
			defMod: 0.05,
			tacChance: 0.15,
		},
		"Defense In Depth": {
			atkMod: -0.10,
			defMod: -0.05,
			tacChance: -0.15,
		},
		"Blitzkrieg": {
			atkMod: -0.10,
			defMod: -0.15,
			tacChance: 0.25,
		},
		"Human Wave": {
			atkMod: -0.15,
			defMod: -0.15,
			tacChance: -0.30,
		},
	}],
	["coast", {
		"Bait and Bleed": {
			atkMod: -0.05,
			defMod: -0.05,
			tacChance: -0.10,
		},
		"Guerrilla": {
			atkMod: 0.05,
			defMod: 0.05,
			tacChance: 0.10,
		},
		"Choke Points": {
			atkMod: 0.05,
			defMod: 0.15,
			tacChance: 0.15,
		},
		"Interior Lines": {
			atkMod: 0.10,
			defMod: 0.10,
			tacChance: 0.20,
		},
		"Pincer Maneuver": {
			atkMod: -0.10,
			defMod: -0.10,
			tacChance: -0.20,
		},
		"Defense In Depth": {
			atkMod: 0.10,
			defMod: 0.10,
			tacChance: 0.20,
		},
		"Blitzkrieg": {
			atkMod: -0.05,
			defMod: -0.05,
			tacChance: -0.10,
		},
		"Human Wave": {
			atkMod: 0.05,
			defMod: -0.05,
		},
	}],
	["outskirts", {
		"Bait and Bleed": {
			atkMod: -0.10,
			defMod: -0.15,
			tacChance: -0.25,
		},
		"Guerrilla": {
			atkMod: -0.10,
			defMod: -0.05,
			tacChance: -0.15,
		},
		"Choke Points": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Interior Lines": {
			atkMod: 0.15,
			defMod: 0.10,
			tacChance: 0.25,
		},
		"Pincer Maneuver": {
			atkMod: 0.05,
			defMod: 0.10,
			tacChance: 0.15,
		},
		"Defense In Depth": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Blitzkrieg": {
			atkMod: 0.10,
			defMod: -0.05,
			tacChance: 0.05,
		},
		"Human Wave": {
			atkMod: 0.10,
			defMod: -0.10,
		},
	}],
	["mountains", {
		"Bait and Bleed": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Guerrilla": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Choke Points": {
			atkMod: 0.05,
			defMod: 0.20,
			tacChance: 0.25,
		},
		"Interior Lines": {
			atkMod: 0.10,
			defMod: 0.10,
			tacChance: 0.20,
		},
		"Pincer Maneuver": {
			atkMod: 0.10,
			defMod: -0.05,
			tacChance: 0.05,
		},
		"Defense In Depth": {
			atkMod: 0.10,
			defMod: 0.10,
			tacChance: 0.20,
		},
		"Blitzkrieg": {
			atkMod: -0.10,
			defMod: -0.10,
			tacChance: -0.20,
		},
		"Human Wave": {
			atkMod: -0.10,
			defMod: -0.10,
			tacChance: -0.20,
		},
	}],
	["wasteland", {
		"Bait and Bleed": {
			atkMod: 0.05,
			defMod: 0.05,
			tacChance: 0.10,
		},
		"Guerrilla": {
			atkMod: 0.10,
			defMod: 0.05,
			tacChance: 0.15,
		},
		"Choke Points": {
			atkMod: -0.10,
			defMod: 0.05,
			tacChance: -0.05,
		},
		"Interior Lines": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Pincer Maneuver": {
			atkMod: 0.15,
			defMod: 0.10,
			tacChance: 0.25,
		},
		"Defense In Depth": {
			atkMod: 0.05,
			defMod: 0.10,
			tacChance: 0.15,
		},
		"Blitzkrieg": {
			atkMod: 0.15,
			defMod: 0.15,
			tacChance: 0.30,
		},
		"Human Wave": {
			atkMod: 0.20,
			defMod: 0.05,
			tacChance: 0.25,
		},
	}],
	["international waters", {
		"Bait and Bleed": {
			atkMod: -0.05,
			defMod: -0.10,
			tacChance: -0.15,
		},
		"Guerrilla": {
			atkMod: -0.10,
			defMod: -0.10,
			tacChance: -0.20,
		},
		"Choke Points": {
			atkMod: -0.10,
			defMod: -0.15,
			tacChance: -0.25,
		},
		"Interior Lines": {
			atkMod: 0.10,
			defMod: 0.15,
			tacChance: 0.25,
		},
		"Pincer Maneuver": {
			atkMod: 0.15,
			defMod: 0.10,
			tacChance: 0.25,
		},
		"Defense In Depth": {
			atkMod: 0.15,
			defMod: 0.15,
			tacChance: 0.30,
		},
		"Blitzkrieg": {
			atkMod: 0.15,
			defMod: 0.10,
			tacChance: 0.25,
		},
		"Human Wave": {
			atkMod: 0.20,
			defMod: 0.05,
			tacChance: 0.25,
		},
	}],
	["an underwater cave", {
		"Bait and Bleed": {
			atkMod: -0.05,
			defMod: -0.05,
			tacChance: -0.10,
		},
		"Guerrilla": {
			atkMod: 0.30,
			defMod: 0.30,
			tacChance: 0.5,
		},
		"Choke Points": {
			atkMod: 0.30,
			defMod: 0.30,
			tacChance: 0.5,
		},
		"Interior Lines": {
			atkMod: -0.10,
			defMod: -0.15,
			tacChance: -0.05,
		},
		"Pincer Maneuver": {
			atkMod: -0.15,
			defMod: -0.10,
			tacChance: -0.25,
		},
		"Defense In Depth": {
			atkMod: 0.15,
			defMod: 0.15,
			tacChance: 0.35,
		},
		"Blitzkrieg": {
			atkMod: -0.15,
			defMod: -0.15,
			tacChance: -0.30,
		},
		"Human Wave": {
			atkMod: -0.20,
			defMod: -0.05,
			tacChance: -0.25,
		},
	}],
	["a sunken ship", {
		"Bait and Bleed": {
			atkMod: 0.30,
			defMod: 0.30,
			tacChance: 0.5,
		},
		"Guerrilla": {
			atkMod: 0.30,
			defMod: 0.30,
			tacChance: 0.5,
		},
		"Choke Points": {
			atkMod: 0.30,
			defMod: 0.30,
			tacChance: 0.5,
		},
		"Interior Lines": {
			atkMod: -0.10,
			defMod: -0.15,
			tacChance: -0.05,
		},
		"Pincer Maneuver": {
			atkMod: -0.15,
			defMod: -0.10,
			tacChance: -0.05,
		},
		"Defense In Depth": {
			atkMod: -0.05,
			defMod: -0.10,
			tacChance: -0.15,
		},
		"Blitzkrieg": {
			atkMod: -0.15,
			defMod: -0.15,
			tacChance: -0.30,
		},
		"Human Wave": {
			atkMod: -0.20,
			defMod: -0.05,
			tacChance: -0.25,
		},
	}],
]);
