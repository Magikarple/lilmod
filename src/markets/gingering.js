App.Entity.GingeringParameters = class {
	/** Get gingering parameters for a particular slave and market.
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.Zeroable<FC.SlaveMarketName | FC.SpecialMarketName>} market
	 * @param {number} [arcIndex] - arcology index if market is "neighbor"
	 */
	constructor(slave, market, arcIndex) {
		/** @type {FC.Gingering} */
		this.type = 0;
		/** @type {FC.GingeringDetection} */
		this.detection = 0;
		/** @type {boolean} */
		this.detected = false;

		// figure out what type of gingering applies, if any
		if (applyLawCheck(market) && V.policies.SMR.honestySMR === 1) {
			/* SMR prohibits gingering and is enforced for this seller - do nothing */
		} else if (App.Data.misc.schools.has(market)) {
			/* slave schools have a reputation to maintain, and will never ginger their slaves */
		} else if (["wetware", "heap", "gangs and smugglers", "low tier criminals", "military prison", "juvenile detention", "white collar", "corporate"].includes(market)) {
			/* these sellers see no reason to ginger their slaves */
		} else if (market === "neighbor" && App.Neighbor.opinion(V.arcologies[0], V.arcologies[arcIndex]) >= 50) {
			/* socially-aligned neighbors will not try to cheat you */
		} else if (slave.indenture > 0) {
			/* indentured servants cannot be gingered */
		} else if (isShelterSlave(slave)) {
			/* is a Shelter slave - do nothing */
		} else {
			if (slave.trust < -20 && jsRandom(1, 3) === 1) {
				this.type = "antidepressant";
			} else if (slave.devotion < -20 && jsRandom(1, 3) === 1) {
				this.type = "depressant";
			} else if (slave.health.condition < 60 && jsRandom(1, 3) === 1) {
				this.type = "stimulant";
			} else if (slave.balls > 0 && slave.dick > 2 && jsRandom(1, 3) === 1) {
				this.type = "vasoconstrictor";
			} else if (slave.balls > 0 && slave.dick.isBetween(0, 5) && jsRandom(1, 3) === 1) {
				this.type = "vasodilator";
			} else if (slave.attrKnown === 0 && jsRandom(1, 3) === 1) {
				this.type = "aphrodisiac";
			} else if (slave.anus > 0 && slave.fetishKnown === 0 && jsRandom(1, 3) === 1) {
				this.type = "ginger";
			}
		}

		// figure out if the PC has detected gingering
		if (this.type !== 0) {
			if (V.PC.skill.slaving >= 100) {
				this.detected = true;
				this.detection = "slaver";
			} else if (V.PC.skill.warfare >= 100 && jsRandom(1, 2) === 1) {
				this.detected = true;
				this.detection = "mercenary";
			} else if (V.PC.rumor === "force" && jsRandom(1, 2) === 1) {
				this.detected = true;
				this.detection = "force";
			} else if (jsRandom(1, 3) === 1) {
				this.detected = true;
			}
		}
		console.log(`Gingering: ${this.type}; detected: ${this.detected} by ${this.detection}.`);
	}
};


/** Make the proxy handler for the gingered slave.
 * Do not call directly (use getGingeredSlave instead); must be global for serialization.
 * @param {App.Entity.GingeringParameters} gParams
 * @param {Map<string, string|number>} gKeys
 * @returns {ProxyHandler<App.Entity.SlaveState>}
 */
globalThis._makeGingeredSlaveHandler = function(gParams, gKeys) {
	return {
		get(target, key) {
			switch (key) {
				/* extra slave properties from proxy */
				case "gingering":
					return gParams;
				case "beforeGingering":
					return target;
				/* serialization methods for Sugarcube */
				case "clone": // WARNING: masks slave.clone.
					return () => new Proxy(clone(target), _makeGingeredSlaveHandler(clone(gParams), clone(gKeys)));
				case "toJSON":
					return () => JSON.reviveWrapper('new Proxy($ReviveData$.slave, _makeGingeredSlaveHandler($ReviveData$.params, $ReviveData$.keys))', {slave: target, params: gParams, keys: gKeys});
			}
			/* specific overrides for gingered properties */
			if (typeof key === "string" && gKeys.has(key)) {
				return gKeys.get(key);
			}
			return target[key];
		}
	};
};

/** Get a gingered proxy for a slave.
 * @param {App.Entity.SlaveState} slave
 * @param {FC.Zeroable<FC.SlaveMarketName | FC.SpecialMarketName>} market
 * @param {number} arcIndex - arcology number if market is "neighbor"
 * @returns {FC.GingeredSlave}
 * */
globalThis.getGingeredSlave = function(slave, market, arcIndex) {
	const gingering = new App.Entity.GingeringParameters(slave, market, arcIndex);

	// if the slave didn't actually get gingered, just give the original back
	if (gingering.type === 0) {
		return slave;
	}

	/** @type {Map<string, string|number>} */
	const gingeredKeys = new Map();
	/** Add a key to override on the gingered slave object
	 * @param {string} key the key to ginger
	 * @param {any} val the initial value to use
	 * @param {number} [min] minimum value to add to initial
	 * @param {number} [max] maximum value to add to initial
	 */
	const addGingerKey = (key, val, min, max) => {
		if ((typeof val === "number") && !_.isNil(min) && !_.isNil(max)) {
			val += jsRandom(min, max);
		}
		gingeredKeys.set(key, val);
	};
	switch (gingering.type) {
		case "antidepressant":
			addGingerKey("trust", slave.trust, 10, 40);
			break;
		case "depressant":
			addGingerKey("devotion", slave.devotion, 10, 40);
			break;
		case "stimulant": {
			const health = slave.health;
			health.condition += jsRandom(20, 40);
			health.health = computeAggregateHealth(slave, health.condition);
			addGingerKey("health", health);
			break;
		}
		case "vasoconstrictor":
			addGingerKey("dick", slave.dick, -2, -1);
			break;
		case "vasodilator":
			addGingerKey("dick", slave.dick, 1, 2);
			break;
		case "aphrodisiac":
			addGingerKey("aphrodisiacs", 2);
			addGingerKey("attrKnown", 1);
			addGingerKey("attrXX", 0, 60, 90);
			addGingerKey("attrXY", 0, 60, 90);
			addGingerKey("energy", 0, 50, 90);
			break;
		case "ginger":
			addGingerKey("fetish", "buttslut");
			addGingerKey("fetishKnown", 1);
			addGingerKey("fetishStrength", 65);
			break;
	}

	return new Proxy(slave, _makeGingeredSlaveHandler(gingering, gingeredKeys));
};
