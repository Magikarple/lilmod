/**
 * Slave is the slave in question, but call the body part without modifiers. Rather than using "left breast" and
 * "right breast" just use "breast". The function will then describe any scars on the breasts, if present, in natural
 * language.
 * @param {App.Entity.SlaveState} slave
 * @param {string|object} surface
 * @returns {string} Slave's scar.
 */
App.Desc.scar = function(slave, surface) {
	if (V.showBodyMods !== 1) {
		return "";
	}

	const r = [];
	const bellyAccessory = slave.bellyAccessory;
	const {
		him, his, He, His
	} = getPronouns(slave);
	const scars = App.Medicine.Modification.scarRecord(slave);

	if (surface === "extra") { // Make a sentence that describes all body parts that aren't explicitly described elsewhere in longSlave. If you scar a slave on her thumb, for instance. But why.
		let extraMarks = App.Desc.extraMarks(slave, "scar");
		extraMarks = Object.keys(extraMarks);
		let length = extraMarks.length;
		if (length === 0) {
			return "";
		} else if (length === 1) {
			r.push(`${He} also has a single unusual scar:`);
		} else {
			r.push(`${He} also has several unusual scars:`);
		}
		const scarPhrases = [];
		for (const bodyPart of extraMarks) {
			const t = [];
			surface = App.Desc.oppositeSides(bodyPart);
			if (scars[surface.center]) { // center defined, body part has no mirror.
				t.push(`${App.Desc.expandScarString(slave, surface.center)} on ${his} ${surface.center}`);
			} else { // Center not defined, body part has a mirror.
				let left = App.Desc.expandScarString(slave, surface.left);
				let right = App.Desc.expandScarString(slave, surface.right);
				if (!scars[surface.left] && !scars[surface.right]) {
					// no marks
				} else if (bodyPart.startsWith("right ") && scars[surface.left]) {
					// we already described it on the left
				} else if (left === right) {
					// matching places and marks
					// note that the 'scars' object won't have scars["upper armS"] with an S defined, just the left and right, so we just use the left since we know they match.
					t.push(`${left} on both ${his} ${surface.both}`);
				} else if (scars[surface.left] && scars[surface.right]) {
					// matching places but different marks
					t.push(`both ${left} on ${his} ${surface.left}, and ${right} scared into ${his} ${surface.right}`);
				} else if (scars[surface.left]) {
					// left
					t.push(`${left} on ${his} ${surface.left}`);
				} else if (scars[surface.right]) {
					// right
					t.push(`${right} on ${his} ${surface.right}`);
				}
			}
			scarPhrases.push(t.join(" "));
		}
		if (scarPhrases.length > 0) {
			r.push(`${toSentence(scarPhrases)}.`);
		}
	} else if (surface) { /* describes a single scarred body part */
		surface = App.Desc.oppositeSides(surface);
		if (surface.center === "belly" && App.Data.misc.fakeBellies.includes(bellyAccessory) && scars.hasOwnProperty("belly")) {
			r.push(`${His} fake belly has the same scar, ${App.Desc.expandScarString(slave, surface.center)}, as ${his} real one.`);
		} else {
			if (scars[surface.center]) { // center defined, body part has no mirror.
				r.push(`${He} has ${App.Desc.expandScarString(slave, surface.center)} on ${his} ${surface.center}.`);
			} else { // Center not defined, body part has a mirror.
				let left = App.Desc.expandScarString(slave, surface.left);
				let right = App.Desc.expandScarString(slave, surface.right);
				if (!scars[surface.left] && !scars[surface.right]) {
					// no marks
				} else if (left === right) {
					// matching places and marks
					// note that the 'scars' object won't have scars["upper armS"] with an S defined, just the left and right, so we just use the left since we know they match.
					r.push(`${He} has ${left} on both ${his} ${surface.both}.`);
				} else if (scars[surface.left] && scars[surface.right]) {
					// matching places but different marks
					r.push(`${He} has both ${left} on ${his} ${surface.left}, and ${right} scared into ${his} ${surface.right}.`);
				} else if (scars[surface.left]) {
					// left
					r.push(`${He} has ${left} on ${his} ${surface.left}.`);
				} else if (right) {
					// right
					r.push(`${He} has ${right} on ${his} ${surface.right}.`);
				}
			}
		}
	} else { /* describes all scarred body parts */
		for (let [key, value] of Object.entries(scars)) {
			if (r.length === 0) {
				r.push(`${He} has`);
			}
			if (key === "belly" && App.Data.misc.fakeBellies.includes(bellyAccessory) && scars.hasOwnProperty("belly")) {
				r.push(`${value} scared on both ${his} real belly and ${his} fake one,`);
			} else {
				r.push(`${value} on ${his} ${key},`);
			}
		}
		if (r.length !== 0) {
			r.push(`marking ${him} as yours.`);
		} else {
			r.push(`${His} body is unmarked by scars.`);
		}
	}
	return r.join(" ");
};

/**
 *  Slave's scar. Slave is the slave in question, but call the body part without modifiers. Rather than using
 *  "left breast" and "right breast" just use "breast". The function will then describe any scars on the breasts, if
 *  present, in natural language.
 * @param {App.Entity.SlaveState} slave
 * @param {string} surface
 * @returns {string}
 */
App.Desc.expandScarString = function(slave, surface) {
	// scars can sometimes be an int. This function generates a reasonable description. It can later be expanded to
	// apply to different body parts, or include features of the slave such as skin tone or weight

	const scars = App.Medicine.Modification.scarRecord(slave);
	if (!scars[surface]) {
		return "";
	}

	let r;
	const {he, his} = getPronouns(slave);

	const bodypart = Object.keys(scars[surface]);
	const scarPhrases = [];
	for (const kind of bodypart) {
		let scar = scars[surface][kind];
		r = [];
		if (scar === 0) {
			continue;
		}
		switch (kind) {
			case "generic":
				r.push("a generic scar");
				break;
			case "whip":
				if (["back"].includes(surface)) {
					r.push("a");
					if (scar > 2) {
						r.push("deeply scored");
					}
					if (scar > 1) {
						r.push("network of welts like a map of hell");
					} else {
						r.push("record of being beaten");
					}
				} else if (["left breast", "right breast", "left buttock", "right buttock"].includes(surface)) {
					if (scar > 2) {
						r.push("thick");
					} else {
						r.push("thin");
					}
					r.push("raised lines from a whip tracing the curves");
				} else if (["left upper arm", "right upper arm"].includes(surface)) {
					r.push(`rough edges where a whip abused ${his} skin`);
				} else {
					if (scar > 2) {
						r.push("frightening");
					} else if (scar > 1) {
						r.push("serious");
					}
					r.push("whip scars");
				}
				break;
			case "chain":
				if (["left wrist", "right wrist", "left ankle", "right ankle"].includes(surface)) {
					if (scar > 1) {
						r.push("scars from heavy manacles");
					} else {
						r.push("scars from manacles");
					}
				} else {
					if (scar > 1) {
						r.push("scars from heavy chains");
					} else {
						r.push("scars from chains");
					}
				}
				break;
			case "burn":
				if (scar > 2) {
					r.push("frightening");
				} else if (scar > 1) {
					r.push("serious");
				}
				r.push("burn scars");
				break;
			case "menacing":
				r.push("a menacing scar");
				break;
			case "exotic":
				r.push("an exotic scar");
				break;
			case "surgical":
				if (surface === "left breast" || surface === "right breast") {
					implantScars(slave.boobsImplant === 0, scar);
				} else if (surface === "left buttock" || surface === "right buttock") {
					implantScars(slave.buttImplant === 0, scar);
				} else if (surface === "belly") {
					r.push("scars from");
					if (scar > 1) {
						r.push("a crazy network of scars, as though a hack had tried internal surgery");
					} else {
						r.push("some faint scarring as though from internal surgery");
					}
				} else {
					r.push("a");
					if (scar > 1) {
						r.push("pronounced");
					} else {
						r.push("faint");
					}
					r.push("surgical scar");
				}
				break;
			case "c-section":
				r.push("an");
				if (scar > 1) {
					r.push("especially");
				}
				r.push("unsightly c-section scar");
				break;
			case "cutting":
				if (["left wrist", "right wrist", "neck"].includes(surface)) {
					r.push(`some scars as though ${he} attempted self harm`);
				} else {
					r.push("some cuts as though from a razor");
				}
				break;
			default:
				if (scar > 2) {
					r.push(`serious ${kind}`);
				} else if (scar) {
					r.push(kind);
				}
				break;
		}
		scarPhrases.push(r.join(" "));
	}
	return toSentence(scarPhrases);

	/**
	 * @param {boolean} removed if true, scars come from removal, otherwise from implantation
	 * @param {number} scar
	 */
	function implantScars(removed, scar) {
		if (removed) {
			r.push("scars from");
			if (scar > 3) {
				r.push("horribly botched");
			} else if (scar > 2) {
				r.push("sloppily done");
			} else if (scar > 1) {
				r.push("carelessly done");
			}
			r.push("surgery to remove implants");
		} else {
			r.push("scars from");
			if (scar > 3) {
				r.push("horribly botched");
			} else if (scar > 2) {
				r.push("sloppily inserted");
			} else if (scar > 1) {
				r.push("carelessly inserted");
			}
			r.push("implants");
		}
	}
};
