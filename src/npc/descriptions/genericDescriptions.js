// cSpell:ignore siliconed

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 * @example
 * const _beautiful = beautiful(slave);
 *
 * `The slave's ${_beautiful} face.`
 */
globalThis.beautiful = function(slave) {
	return slave.genes === "XX" ? `beautiful` : `handsome`;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 * @example
 * const _pretty = pretty(slave);
 *
 * `The slave's ${_pretty} face.`
 */
globalThis.pretty = function(slave) {
	return slave.genes === "XX" ? `pretty` : `good-looking`;
};

/** Returns the description of the slave's vagina.
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @returns {string}
 */
globalThis.vaginaDesc = function(slave, withNoun = true) {
	if (!slave) { return "ERROR"; }
	let adj = [];
	let noun = ["vagina", "pussy", "cunt", "pussy", "cunt"];
	if (slave.newVag && slave.vagina > 0) {
		return `${jsEither(["hyperelastic", "highly adaptable"])}${withNoun ? " " + jsEither(noun) : ""}`;
	}
	if (slave.vagina < 0) {
		return `non-existent${withNoun ? " front hole": ""}`;
	}
	switch (slave.vagina) {
		case 0:
			adj.push(`virgin${slave.counter.reHymen ? "-again" : ""}`, "virgin");
			noun.push("little slit", "flower");
			break;
		case 1:
			adj.push("tight", "narrow");
			break;
		case 2:
			adj.push("", "welcoming");
			break;
		case 3:
			adj.push("veteran");
			break;
		case 4:
			adj.push("baggy", "loose");
			break;
		case 5:
		case 6:
			adj.push("gaping");
			break;
		case 7:
		case 8:
		case 9:
			adj.push("cavernous");
			break;
		default:
			adj.push("ruined");
	}
	if (withNoun) {
		if (slave.vagina > 2) {
			noun.push("twat");
		}
		return `${jsEither(adj)} ${jsEither(noun)}`;
	}
	return `${jsEither(adj)}`;
};

/**
 * Returns the description of the slave's penis
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @returns {string}
 */
globalThis.dickDesc = function(slave, withNoun = true) {
	if (!slave) { return "ERROR"; }
	let adj =[];
	let noun = ["dick", "dick", "cock", "cock", "penis", "prick", "phallus"];
	if (slave.dick === 0) {
		return `non-existent${withNoun ? " penis" : ""}`;
	}
	switch (slave.dick) {
		case 1:
			if (withNoun) {
				return `${jsEither(["micropenis", "tiny prick", "tiny weenie"])}`;
			}
			return "tiny";
		case 2:
			adj.push("cute", "small");
			noun.push("weenie", "weenie");
			break;
		case 3:
			adj.push("", "average");
			break;
		case 4:
			adj.push("big");
			break;
		case 5:
			adj.push("huge");
			break;
		case 6:
			adj.push("gigantic");
			break;
		case 7:
			adj.push("massive");
			break;
		case 8:
			adj.push("titanic", "truly imposing");
			break;
		case 9:
			adj.push("monstrous", "absurd");
			break;
		case 10:
			adj.push("inhuman");
			break;
		default:
			adj.push("hypertrophied");
	}
	if (withNoun) {
		if (slave.dick > 5) {
			noun.push("dong");
		}
		return `${jsEither(adj)} ${jsEither(noun)}`;
	}
	return `${jsEither(adj)}`;
};

/**
 * Returns the description of the slave's anus
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @returns {string}
 */globalThis.anusDesc = function(slave, withNoun = true) {
	if (!slave) { return "ERROR"; }
	let adj = [];
	let noun = ["anus", "butthole", "asshole", "bumhole", "anus"];
	switch (slave.anus) {
		case 0:
			adj.push("virgin");
			noun =["sphincter", "anus", "anus"];
			break;
		case 1:
			adj.push("tight", "narrow", "welcoming", "puckered");
			break;
		case 2:
			adj.push("loose", "veteran");
			break;
		case 3:
			adj.push("very loose", "lax");
			break;
		default:
			adj.push("gaping", "gaped");
	}
	if (withNoun) {
		if (slave.anus > 1) {
			noun.push("backdoor");
			if (slave.anus > 2) {
				noun.push("asspussy");
			}
		}
		return `${jsEither(adj)} ${jsEither(noun)}`;
	}
	return `${jsEither(adj)}`;
};

/**
 * Returns the description of the slave's testicles
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @returns {string}
 */
globalThis.ballsDesc = function(slave, withNoun = true) {
	if (!slave) { return "ERROR"; }
	let adj =[];
	let noun = ["balls", "balls", "balls", "testicles"];
	if (slave.balls === 0) {
		return `non-existent${withNoun ? " testes" : ""}`;
	}
	switch (slave.balls) {
		case 1:
			return `vestigial${withNoun ? " " + jsEither(["testes", "testicles"]) : ""}`;
		case 2:
			adj.push("small");
			noun.push("testes");
			break;
		case 3:
			adj.push("", "average", "standard");
			break;
		case 4:
			adj.push("large");
			break;
		case 5:
			adj.push("massive");
			break;
		case 6:
			adj.push("huge");
			break;
		case 7:
			adj.push("giant");
			break;
		case 8:
			adj.push("enormous");
			break;
		case 9:
			adj.push("monstrous");
			break;
		default:
			adj.push("overly massive");
	}
	if (withNoun) {
		if (slave.balls < 6) {
			noun.push("nuts");
		}
		return `${jsEither(adj)} ${jsEither(noun)}`;
	}
	return `${jsEither(adj)}`;
};

/**
 * Returns the size descriptor of the slave's breasts
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @returns {string}
 */
globalThis.boobsDesc = function(slave, withNoun = true) {
	if (!slave) { return "ERROR"; }
	if (slave.boobs < 300 && slave.hormoneBalance < -20) {
		return `masculine${withNoun ? " chest" : ""}`;
	}
	if (withNoun) {
		return App.Desc.boobBits.noun(slave.boobs, false, true);
	}
	return App.Desc.boobBits.adjective(slave.boobs);
};

/**
 * Returns the full description of the slave's breasts
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @param {boolean} withShape
 * @param {boolean} withCup
 * @param {boolean} withSurgery
 * @param {boolean} withLactation
 * @returns {string}
 */
globalThis.boobsDescLong = function(slave, withNoun = true, withShape = true, withCup = true, withSurgery = true, withLactation = true) {
	if (!slave) { return "ERROR"; }
	if (slave.boobs < 300 && slave.hormoneBalance < -20) {
		return `masculine${withNoun ? " chest" : ""}`;
	}
	let surgery = (slave.boobsImplant && withSurgery) ? "surgery improved " : (withSurgery ? "natural " : "");
	let milk = (slave.lactation && withLactation) ? "milk laden " : "";
	let shape = (slave.boobShape && withShape) ? slave.boobShape + " " : "";
	if (withNoun) {
		return `${milk}${surgery}${shape}${App.Desc.boobBits.noun(slave.boobs, withCup, true)}`;
	}
	return `${milk}${surgery}${shape}${withCup ? App.Desc.boobBits.cup(slave.boobs) + " " : ""}${App.Desc.boobBits.adjective(slave.boobs)}`;
};

/**
 * Returns the description of the slave's butt
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @returns {string}
 */
globalThis.buttDesc = function(slave, withNoun = true) {
	if (!slave) { return "ERROR"; }
	let adj =[];
	let noun = ["butt", "butt", "butt", "ass", "rear"];
	switch (slave.butt) {
		case 0:
			return `flat${withNoun ? " " + jsEither(["bottom"]) : ""}`;
		case 1:
			adj.push("small");
			break;
		case 2:
			adj.push("plump", "curved");
			break;
		case 3:
			adj.push("round", "curvy", "big bubble", "big bubble");
			break;
		case 4:
			adj.push("huge", "massive");
			break;
		case 5:
			adj.push("enormous", "cushion-like");
			break;
		case 6:
			adj.push("gigantic", "titanic");
			break;
		case 7:
			adj.push("ridiculous");
			break;
		case 8:
		case 9:
		case 10:
			adj.push("immense");
			break;
		default:
			adj.push("inhuman");
	}
	if (withNoun) {
		if (slave.butt < 2) {
			noun.push("bottom");
		}
		return `${jsEither(adj)} ${jsEither(noun)}`;
	}
	return `${jsEither(adj)}`;
};

/**
 * Returns the description of the slave's lips
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @param {boolean} withSurgery
 * @returns {string}
 */
globalThis.lipsDesc = function(slave, withNoun = true, withSurgery = false) {
	if (!slave) { return "ERROR"; }
	let adj = [];
	let noun =["lips"];
	let surgery = (slave.lipsImplant && withSurgery) ? "siliconed " : (withSurgery ? "natural " : "");
	if (slave.lips < 11) {
		adj.push("thin", "unattractive");
	} else if (slave.lips < 21) {
		adj.push("regular", "");
	} else if (slave.lips < 41) {
		adj.push("pretty", "attractive");
	} else if (slave.lips < 71) {
		adj.push("plump", "plush");
	} else if (slave.lips < 96) {
		adj.push("huge", "beestung");
	} else {
		adj.push("pussy-like", "fuckhole");
	}
	if (withNoun) {
		return `${jsEither(adj)} ${surgery}${jsEither(noun)}`;
	}
	return `${surgery}${jsEither(adj)}`;
};

/**
 * Returns the description of the slave's belly
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @param {boolean} pregReference // mentions pregnancy if slave is pregnant
 * @returns {string}
 */
globalThis.bellyDesc = function(slave, withNoun = true, pregReference = true) {
	if (!slave) { return "ERROR"; }
	let adj = [];
	let noun =["belly"];
	if (pregReference && !!V.seePreg && slave.preg > 0) {
		if (slave.belly > 750000) {
			adj.push("inhumanly overexpanded pregnant");
		} else if (slave.belly > 600000) {
			adj.push("immensely overexpanded pregnant");
		} else if (slave.belly > 450000) {
			adj.push("enormously overexpanded pregnant");
		} else if (slave.belly > 300000) {
			adj.push("overexpanded pregnant");
		} else if (slave.belly > 150000) {
			adj.push("grotesquely oversized pregnant");
		} else if (slave.belly > 120000) {
			adj.push("absurd pregnant");
		} else if (slave.belly > 105000) {
			adj.push("monstrous pregnant");
		} else if (slave.belly > 90000) {
			adj.push("titanic pregnant");
		} else if (slave.belly > 75000) {
			adj.push("massive pregnant");
		} else if (slave.belly > 60000) {
			adj.push("gigantic pregnant");
		} else if (slave.belly > 45000) {
			adj.push("huge pregnant");
		} else if (slave.belly > 30000) {
			adj.push("big pregnant");
		} else if (slave.belly > 15000) {
			adj.push("full term looking");
		} else if (slave.belly > 10000) {
			adj.push("very pregnant");
		} else if (slave.belly > 5000) {
			adj.push("obviously pregnant");
		} else if (slave.belly > 1500) {
			adj.push("plump");
		} else if (slave.belly > 100) {
			adj.push("bloated");
		} else {
			adj.push("flat");
			noun = ["stomach", "tummy"];
		}
	} else {
		if (slave.belly > 750000) {
			adj.push("inhumanly overexpanded");
		} else if (slave.belly > 600000) {
			adj.push("immensely overexpanded");
		} else if (slave.belly > 450000) {
			adj.push("enormously overexpanded");
		} else if (slave.belly > 300000) {
			adj.push("overexpanded");
		} else if (slave.belly > 150000) {
			adj.push("grotesquely oversized");
		} else if (slave.belly > 120000) {
			adj.push("absurd");
		} else if (slave.belly > 105000) {
			adj.push("monstrous");
		} else if (slave.belly > 90000) {
			adj.push("titanic");
		} else if (slave.belly > 75000) {
			adj.push("massive");
		} else if (slave.belly > 60000) {
			adj.push("gigantic");
		} else if (slave.belly > 45000) {
			adj.push("huge");
		} else if (slave.belly > 30000) {
			adj.push("obese");
		} else if (slave.belly > 15000) {
			adj.push("beefy");
		} else if (slave.belly > 10000) {
			adj.push("porky");
		} else if (slave.belly > 5000) {
			adj.push("chubby");
		} else if (slave.belly > 1500) {
			adj.push("plump");
		} else if (slave.belly > 100) {
			adj.push("bloated");
			noun.push("tummy");
		} else {
			adj.push("flat");
			noun = ["tummy"];
		}
		noun.push("stomach");
		if (slave.belly > 5000) {
			noun.push("paunch", "belly");
		}
	}
	if (withNoun) {
		return `${jsEither(adj)} ${jsEither(noun)}`;
	}
	return `${jsEither(adj)}`;
};

/**
 * Returns the description of the slave's clit
 * @param {FC.HumanState} slave // admits V.PC as argument.
 * @param {boolean} withNoun
 * @returns {string}
 */
globalThis.clitDesc = function(slave, withNoun = true) {
	if (!slave) { return "ERROR"; }
	if (slave.dick > 0) { // slaves with dicks don't have clits
		return dickDesc(slave, withNoun);
	}
	if (slave.vagina < 0) { // no vagina, no vulva, no clit
		return `lack of${withNoun ? " clitoris" : ""}`;
	}
	let adj = [];
	let noun = ["clit"];
	switch (slave.clit) {
		case 0:
			adj.push("", "cute", "average");
			noun.push("clit", "clitoris", "button", "bud");
			break;
		case 1:
			adj.push("large", "big");
			break;
		case 2:
			adj.push("huge", "huge", "noticeable");
			break;
		case 3:
			adj.push("enormous", "prominent", "protruding");
			break;
		case 4:
			adj.push("penis-like", "dick-like", "phallus-like", "hypertrophied");
			break;
		default:
			adj.push("massive penis-like", "elephantine phallic", "gigantic dick-like", "immense penis-like");
			noun.push("megaclit", "clit", "vulva appendage");
	}
	if (withNoun) {
		return `${jsEither(adj)} ${jsEither(noun)}`;
	}
	return `${jsEither(adj)}`;
};

/**
 * @param {FC.HumanState} slave
 * @returns {string}
 */
globalThis.bellyAdjective = function(slave) {
	if (slave.belly >= 1500) {
		if (slave.belly >= 1000000) {
			if (slave.preg > slave.pregData.normalBirth / 4) {
				return 'unfathomably distended, brimming with life';
			} else {
				return `unfathomable`;
			}
		} else if (slave.belly >= 750000) {
			if (slave.preg > slave.pregData.normalBirth / 4) {
				return 'monolithic bulging';
			} else {
				return `monolithic`;
			}
		} else if (slave.belly >= 600000) {
			if (slave.preg > slave.pregData.normalBirth / 4) {
				return 'titanic bulging';
			} else {
				return `titanic`;
			}
		} else if (slave.belly >= 450000) {
			if (slave.preg > slave.pregData.normalBirth / 4) {
				return 'gigantic bulgy';
			} else {
				return `gigantic`;
			}
		} else if (slave.belly >= 300000) {
			return 'massive';
		} else if (slave.belly >= 100000) {
			return 'giant';
		} else if (slave.belly >= 15000) {
			return 'huge';
		} else if (slave.belly >= 10000) {
			return 'big';
		} else {
			return `swollen`;
		}
	}
	return "";
};

/** Returns dick (or the given text) if the actor has dick, clit (or the given text) if the actor has no dick but has vagina.
 * If the actor is null, can return an alternative text, an empty string or if the actor has a hand, return finger, otherwise, tongue.
 * Can be used to return a given text for dick or clit: dickOrClit(actor, "sentence if dick", "sentence if clit", "sentence if none of them")
 * @param {FC.HumanState} slave
 * @param {string} dickText
 * @param {string} clitText
 * @param {string | boolean} alternative // true for finger/tongue, false for "", or text
 * @returns {string}
 */
globalThis.dickOrClit = function(slave, dickText = "dick", clitText = "", alternative = true) {
	if (!slave || !slave.hasOwnProperty("dick")) {
		return "ERROR";
	}
	if (slave.dick > 0) {
		return dickText;
	}
	if (slave.vagina >= 0 && slave.clit >= 3) {
		if (dickText === "penis") {
			return clitText.length ? clitText : "clitoris";
		}
		return clitText.length ? clitText : "clit";
	}
	if (hasAnyArms(slave)) {
		return typeof alternative === "string" ? alternative : alternative ? "finger" : "";
	}
	return typeof alternative === "string" ? alternative : alternative ? "tongue" : "";
};
