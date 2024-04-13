/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.armwear = function(slave) {
	const r = [];
	const {
		his, He
	} = getPronouns(slave);
	// TODO: check clothing descriptions for glove references
	if (hasAnyArms(slave) && !hasAnyQuadrupedArms(slave)) {
		switch (slave.armAccessory) {
			case "hand gloves":
				switch (slave.clothes) {
					default:
						if (hasBothArms(slave)) {
							r.push(`${He} is wearing a pair of simple gloves that cover ${his} hands up to ${his} wrists.`);
						} else {
							r.push(`${He} is wearing a simple glove that covers ${his} hand up to its wrist.`);
						}
				}
				break;
			case "elbow gloves":
				switch (slave.clothes) {
					case "no clothing":
					case "an apron":
					case "a thong":
					case "a skimpy loincloth":
					case "body oil":
					case "boyshorts":
					case "panties":
					case "panties and pasties":
						if (hasBothArms(slave)) {
							r.push(`${He} is wearing a pair of long${slave.collar === "leather with cowbell" ? " cow print" : ""} gloves that cover ${his} arms until just past ${his} elbows.`);
						} else {
							r.push(`${He} is wearing a long${slave.collar === "leather with cowbell" ? " cow print" : ""} glove that covers ${his} arm until just past its elbow.`);
						}
						break;
					default:
						if (hasBothArms(slave)) {
							r.push(`${He} is wearing a pair of long gloves that cover ${his} arms until just past ${his} elbows.`);
						} else {
							r.push(`${He} is wearing a long glove that covers ${his} arm until just past its elbow.`);
						}
				}
				break;
		}
	}

	return r.join(" ");
};
