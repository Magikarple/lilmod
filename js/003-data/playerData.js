App.Data.player = {
	refreshmentType: new Map([
		[0,
			{
				name: `Smoked`,
				suggestions: new Set(["cigar", "cigarette", "blunt"])
			}
		],
		[1,
			{
				name: `Drunk`,
				suggestions: new Set(["whiskey", "rum", "wine", "sake", "vodka", "beer", "bourbon", "scotch"])
			}
		],
		[2,
			{
				name: `Eaten`,
				suggestions: new Set(["steak", "edibles"])
			}
		],
		[3,
			{
				name: `Snorted`,
				suggestions: new Set(["stimulants", "cocaine"])
			}
		],
		[4,
			{
				name: `Injected`,
				suggestions: new Set(["stimulants", "heroin"])
			}
		],
		[5,
			{
				name: `Popped`,
				suggestions: new Set(["amphetamines", "ecstasy"])
			}
		],
		[6,
			{
				name: `Dissolved orally`,
				suggestions: new Set(["stimulants", "LSD"])
			}
		],
	]),
	career: new Map([
		["wealth", {
			"master": "wealth",
			"apprentice": "trust fund",
			"child": "rich kid"
		}],
		["capitalist", {
			"master": "capitalist",
			"apprentice": "entrepreneur",
			"child": "business kid"
		}],
		["mercenary", {
			"master": "mercenary",
			"apprentice": "recruit",
			"child": "child soldier"
		}],
		["slaver", {
			"master": "slaver",
			"apprentice": "slave overseer",
			"child": "slave tender"
		}],
		["engineer", {
			"master": "engineer",
			"apprentice": "construction",
			"child": "worksite helper"
		}],
		["medicine", {
			"master": "medicine",
			"apprentice": "medical assistant",
			"child": "nurse"
		}],
		["celebrity", {
			"master": "celebrity",
			"apprentice": "rising star",
			"child": "child star"
		}],
		["escort", {
			"master": "escort",
			"apprentice": "prostitute",
			"child": "child prostitute"
		}],
		["servant", {
			"master": "servant",
			"apprentice": "handmaiden",
			"child": "child servant"
		}],
		["gang", {
			"master": "gang",
			"apprentice": "hoodlum",
			"child": "street urchin"
		}],
		["BlackHat", {
			"master": "BlackHat",
			"apprentice": "hacker",
			"child": "script kiddy"
		}],
		["arcology owner", {
			"master": "arcology owner"
		}],
	])
};
