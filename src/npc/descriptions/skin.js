/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} descType
 * @returns {string}
 */
App.Desc.skin = function(slave, descType) {
	/** @type {Array<string>} */
	let r = [];
	const {
		he, his, He, His
	} = getPronouns(slave);

	const skin = (slave.race === "catgirl") ? "fur" : "skin";

	if (slave.fuckdoll > 0) {
		r.push(`The small areas of visible ${skin} are`);
		r = r.concat(freckles());
		r = r.concat(tanned());
	} else if (V.seeNationality === 1) {
		if (!slave.nationality) {
			r.push(`Ethnically, ${he}'s`);
		} else if (slave.nationality === "slave") {
			r.push(`${He}'s been chattel long enough that slavery is effectively ${his} nationality; ethnically, ${he}'s`);
		} else if (slave.nationality === "Stateless") {
			if (slave.tankBaby > 0) {
				r.push(`${He} was born in the Free Cities, and is considered stateless by old world nations; ethnically, ${he}'s`);
			} else {
				r.push(`${He} has spent so much time in the Free Cities that their statelessness is effectively ${his} nationality; ethnically, ${he}'s`);
			}
		} else if (slave.nationality === "Zimbabwean" && slave.race === "white") {
			r.push(`${He}'s originally <span class="nationality">Rhodesian;</span> ethnically, ${he}'s`);
		} else if (slave.nationality === "Vatican") {
			r.push(`${He}'s originally <span class="nationality">from Vatican City;</span> ethnically, ${he}'s`);
		} else {
			r.push(`${He}'s originally <span class="nationality">${slave.nationality};</span> ethnically, ${he}'s`);
		}
		r.push(`<span class="race">${slave.race},</span> and ${his} ${skin} is`);
		r.push(...freckles(), ...tanned(), ...changedRace());
	} else if (V.seeRace === 1) {
		r.push(`Ethnically, ${he}'s <span class="race">${slave.race},</span> and ${his} ${skin} is`);
		r.push(...freckles(), ...tanned(), ...changedRace());
	} else {
		r.push(`${His} ${skin} is`);
		r = r.concat(freckles());
		r = r.concat(tanned());
	}

	return r.join(" ");

	/**
	 * @returns {Array<string>}
	 */
	function changedRace() {
		/** @type {Array<string>} */
		const r = [];
		if (slave.race !== slave.origRace) {
			if (descType !== DescType.MARKET) {
				r.push(`${He} has received plastic surgery to appear ${slave.race}; ${he} is originally ${slave.origRace}.`);
			} else {
				if (V.PC.skill.medicine >= 100) {
					r.push(`Thanks to your medical experience, you can easily tell that ${he} was originally ${slave.origRace}, but surgically modified.`);
				} else if (V.PC.skill.medicine >= 50) {
					r.push(`Oddly enough, ${he} appears to have a number of ${slave.origRace} features.`);
				} else if (V.PC.skill.slaving >= 50) {
					r.push(`Thanks to your experience in buying and selling slaves, you can easily tell that ${he} is not naturally ${slave.race}.`);
				} else if (jsRandom(0, 100) < V.PC.skill.medicine) {
					r.push(`${His} features seem slightly off.`);
				}
			}
		}
		return r;
	}

	/**
	 * @returns {Array<string>}
	 */
	function freckles() {
		/** @type {Array<string>} */
		const r = [];
		if (slave.markings === "freckles" && slave.race === "catgirl") {
			r.push(`${slave.skin} and lightly spotted.`);
		} else if (slave.markings === "freckles") {
			r.push(`${slave.skin} and lightly`);
			if (App.Medicine.Modification.naturalSkins.includes(slave.skin) && skinToneLevel(slave.skin).isBetween(5, 10) && (App.Data.misc.redheadColors.includes(slave.hColor))) {
				r.push(`freckled, an attractive combination.`);
			} else {
				r.push(`freckled.`);
			}
		} else if (slave.markings === "heavily freckled" && slave.race === "catgirl") {
			r.push(`${slave.skin} and heavily spotted.`);
		} else if (slave.markings === "heavily freckled") {
			r.push(`${slave.skin} and heavily`);
			if (App.Medicine.Modification.naturalSkins.includes(slave.skin) && skinToneLevel(slave.skin).isBetween(5, 10) && (App.Data.misc.redheadColors.includes(slave.hColor))) {
				r.push(`freckled, an attractive combination.`);
			} else {
				r.push(`freckled.`);
			}
		} else {
			r.push(`${slave.skin}.`);
		}
		return r;
	}

	/**
	 * @returns {Array<string>}
	 */
	function tanned() {
		/** @type {Array<string>} */
		const r = [];
		if (slave.skin === "sun tanned" || slave.skin === "spray tanned") {
			r.push(`${His} ${skin} has been`);
			if (slave.skin === "sun tanned") {
				r.push(`tanned to a natural, healthy-looking tone.`);
			} else if (slave.skin === "spray tanned") {
				r.push(`tanned with obvious, garish-looking makeup.`);
			} else {
				r.push(`tanned.`);
			}
		}
		return r;
	}
};

