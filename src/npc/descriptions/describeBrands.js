/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} surface
 * @returns {string} Slave's brand. Slave is the slave in question, but call the body part without modifiers. Rather than using "left breast" and "right breast" just use "breast". The function will then describe any brands on the breasts, if present, in natural language.
 */
App.Desc.brand = function(slave, surface) {
	"use strict";
	let r = ``;
	const {
		his, He, His
	} = getPronouns(slave);
	if (V.showBodyMods === 1) {
		if (surface === "extra") { // Make a sentence that describes all body parts that aren't explicitly described elsewhere in longSlave. If you brand a slave on her thumb, for instance. But why.
			const array = [];
			for (const bodyPart of Object.keys(App.Desc.extraMarks(slave, "brand"))) {
				const description = desc(bodyPart);
				if (description) {
					array.push(description);
				}
			}
			if (array.length === 0) {
				return r;
			} else if (array.length === 1) {
				r += `${He} also has a single unusual brand: `;
			} else {
				r += `${He} also has several unusual brands: `;
			}
			r += `${toSentence(array)}. `;
		} else if (surface) { /* describes a single branded body part */
			const brands = App.Medicine.Modification.brandRecord(slave);
			if (surface === "belly" && App.Data.misc.fakeBellies.includes(slave.bellyAccessory) && brands.belly) {
				r += `${His} fake belly has the same brand, ${brands.belly}, as ${his} real one. `;
			} else {
				const description = desc(surface);
				if (description !== "") {
					r += `${He} has ${description}. `;
				}
			}
		}
	}
	return r;

	/**
	 * @param {string} part
	 * @returns {string}
	 */
	function desc(part) {
		const surface = App.Desc.oppositeSides(part);
		const brands = App.Medicine.Modification.brandRecord(slave);
		const centerBrand = brands[surface.center] ? pronounsForSlaveProp(slave, brands[surface.center]) : undefined;
		const leftBrand = brands[surface.left] ? pronounsForSlaveProp(slave, brands[surface.left]) : undefined;
		const rightBrand = brands[surface.right] ? pronounsForSlaveProp(slave, brands[surface.right]) : undefined;
		if (centerBrand) { // center defined, body part has no mirror.
			return `${centerBrand} branded into the flesh of ${his} ${surface.center}`;
		} else { // Center not defined, body part has a mirror.
			if (!leftBrand && !rightBrand) {
				return ""; // no marks
			} else if (part.startsWith("right ") && leftBrand) {
				return ""; // we already described it on the left
			} else if (leftBrand === rightBrand) {
				// matching places and marks
				// note that the slave.brand object won't have slave.brand["upper armS"] with an S defined, just the left and right, so we just use the left since we know they match.
				return `${leftBrand} branded into the flesh of both ${his} ${surface.both}`;
			} else if (leftBrand && rightBrand) {
				// matching places but different marks
				return `both ${leftBrand} branded into the flesh of ${his} ${surface.left}, and ${rightBrand} branded into ${his} ${surface.right}`;
			} else if (leftBrand) {
				// left
				return `${leftBrand} branded into the flesh of ${his} ${surface.left}`;
			} else if (rightBrand) {
				// right
				return `${rightBrand} branded into the flesh of ${his} ${surface.right}`;
			}
		}
		return ``;
	}
};
