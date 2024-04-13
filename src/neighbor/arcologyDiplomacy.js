/** get one arcology's opinion of another
 * @param {FC.ArcologyState} activeArcology index
 * @param {FC.ArcologyState} targetArcology index
 * @returns {number} opinion
 */
App.Neighbor.opinion = function(activeArcology, targetArcology) {
	const {shared, conflicting} = FutureSocieties.diplomaticFSes(activeArcology, targetArcology);

	let opinion = 0;

	if (activeArcology.direction === targetArcology.direction) {
		// ignore narcissism
		// this will be a problem in the future and as such, arcologies should realistically be given IDs
		return opinion;
	}

	for (const fs of shared) {
		opinion += activeArcology[fs];
		opinion += targetArcology[fs];
	}

	for (const [activeFS, targetFS] of conflicting) {
		opinion -= activeArcology[activeFS];
		opinion -= targetArcology[targetFS];
	}

	// unshared but uncontested multiculturalism gets a relationship bonus
	if (!shared.includes("FSNull") && !conflicting.some((pair) => pair.includes("FSNull"))) {
		if (FutureSocieties.isActive('FSNull', activeArcology)) {
			opinion += activeArcology.FSNull;
		} else if (FutureSocieties.isActive('FSNull', targetArcology)) {
			opinion += targetArcology.FSNull;
		}
	}

	return opinion;
};

/** set a new influence target for a given arcology
 * @param {number} arcID
 */
App.Neighbor.selectInfluenceTarget = function(arcID) {
	const notMulticulturalism = (f) => f !== "FSNull"; // multiculturalism can neither influence nor be influenced
	const influenceSources = FutureSocieties.influenceSources(arcID);
	const arcology = V.arcologies[arcID];
	if (influenceSources.length > 0) {
		let eligibleTargets = [];
		const obedient = (arcology.government === "your trustees" || arcology.government === "your agent");

		for (const target of V.arcologies) {
			if (arcology.direction !== target.direction) {
				if (!obedient || target.direction !== 0) {
					const {shared, conflicting} = FutureSocieties.diplomaticFSes(arcology, target);
					let count = 0;
					count += shared.filter(notMulticulturalism).length;
					count += conflicting.filter((pair) => pair.every(notMulticulturalism)).length;
					eligibleTargets.push(...Array(count).fill(target.direction));
				}
			}
		}

		if (eligibleTargets.length > 0) {
			arcology.influenceTarget = eligibleTargets.random();
		}
	}
};

App.Neighbor.PassiveFSInfluence = class {
	/** pick up social hints from an arcology's neighbors
	 * @param {number} arcID
	 */
	constructor(arcID) {
		this._arcID = arcID;
		/** @type {Map<number, {shared: FC.FutureSociety[], conflicting: FC.FutureSociety[][]}>} */
		this._relationships = new Map();

		const arcology = V.arcologies[this._arcID];
		for (let i = 0; i < V.arcologies.length; ++i) {
			if (i !== arcID) {
				this._relationships.set(i, FutureSocieties.diplomaticFSes(arcology, V.arcologies[i]));
			}
		}

		this._thresh = 5;
		if (arcology.direction === 0) {
			this._thresh -= V.policies.culturalOpenness * 5;
		}
		if (arcology.ownership >= 100) {
			this._thresh += 5;
		}
	}

	/** output the neighbors that have passively influenced a particular FS in this arcology
	 * @param {FC.FutureSociety} fs
	 */
	output(fs) {
		/** @type {number[]} */
		let shared = [];
		/** @type {Map<FC.FutureSociety, number[]>} */
		let conflicting = new Map();
		const arcology = V.arcologies[this._arcID];

		if (arcology.direction === 0 && fs === "FSNull") {
			return ``; // Multiculturalism in the player's arcology is not affected by passive influence
		}

		for (const [i, rel] of this._relationships) {
			if (rel.shared.some((s) => s === fs)) {
				if (V.arcologies[i][fs] > arcology[fs] + this._thresh) {
					shared.push(i);
				}
			} else {
				const conflict = rel.conflicting.find((p) => p[0] === fs);
				if (conflict) {
					const conflictFS = conflict[1];
					if (conflictFS === "FSNull") {
						continue; // no passive slowing from Multiculturalism
					}
					if (V.arcologies[i][conflictFS] > arcology[fs] + this._thresh) {
						const oldVal = conflicting.get(conflictFS);
						if (oldVal) {
							oldVal.push(i);
						} else {
							conflicting.set(conflictFS, [i]);
						}
					}
				}
			}
		}

		let t = [];
		// passive growth influence
		arcology[fs] += shared.length;
		if (V.showNeighborDetails && shared.length > 0) {
			t.push(FutureSocieties.displayName(fs));
			if (fs === "FSSubjugationist") {
				t.push(`of ${arcology.FSSubjugationistRace} people`);
			} else if (fs === "FSSupremacist") {
				t.push(`for ${arcology.FSSupremacistRace} people`);
			}
			t.push(`in ${arcology.name} is influenced by`);
			const sharedNames = shared.map((i) => V.arcologies[i].name + "'s");
			t.push(`${toSentence(sharedNames)} more advanced ${shared.length === 1 ? "society" : "societies"}.`);
		}

		// passive slowing influence
		arcology[fs] -= conflicting.size;
		if (V.showNeighborDetails && conflicting.size > 0) {
			/** @type {string} */
			let actualDisplayName = FutureSocieties.displayName(fs);
			if (fs === "FSSubjugationist") {
				actualDisplayName = `${arcology.FSSubjugationistRace} Subjugationism`;
			} else if (fs === "FSSupremacist") {
				actualDisplayName = `${arcology.FSSupremacistRace} Supremacy`;
			}
			t.push(`Development of ${actualDisplayName} in ${arcology.name} is slowed by contact with`);
			let conflictOutput = [];
			for (const [conflictFS, arcs] of conflicting) {
				const conflictNames = arcs.map((i) => V.arcologies[i].name + "'s");
				conflictOutput.push(`${toSentence(conflictNames)} more advanced ${FutureSocieties.displayAdj(conflictFS)} ${arcs.length === 1 ? "society" : "societies"}`);
			}
			t.push(toSentence(conflictOutput) + '.');
		}

		return t.join(" ");
	}
};

/** Get an arcology name from a given set, preferring unused ones.
 * @param {string[]} nameSet
 * @returns {string}
 */
App.Neighbor.getUnusedName = function(nameSet) {
	const filteredSet = nameSet.filter(n => !V.arcologies.some(a => a.name === n));
	return filteredSet.length > 0 ? filteredSet.random() : nameSet.random();
};
