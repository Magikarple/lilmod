/**
 * @param {FC.GingeredSlave} slave
 * @param {DescType} [descType=DescType.NORMAL]
 * @param {boolean} [skills=true] If true then we describe how skilled the slave is, otherwise we omit it.
 * @returns {string}
 */
App.Desc.anus = function(slave, descType = DescType.NORMAL, skills = true) {
	const r = [];
	const {
		he, his, He, His
	} = getPronouns(slave);
	let skinDesc;
	if (skinToneLevel(slave.skin) < 13) {
		skinDesc = "pink";
	} else if (slave.anusTat === "bleached") {
		skinDesc = slave.skin;
	} else if (skinToneLevel(slave.skin) > 19) {
		skinDesc = "dark";
	} else {
		skinDesc = "darker";
	}
	let analSkinDesc = either("crinkled", "puckered", "puffy");
	if (slave.anus === 0) {
		r.push(`${He} is an <span class="lime">anal virgin;</span> ${his} asshole is fresh and tight.`);
	} else if (slave.anus === 1) {
		r.push(`${His} ${either("anal opening", "anus", "asshole", "butthole")} is ${either("nice and", "very")} tight,`);
		if (slave.analArea - slave.anus > 3) {
			r.push(`but it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the`);
			if (slave.vagina > -1) {
				r.push(`bottom of ${his} pussy.`);
			} else {
				r.push(`base of ${his} cock.`);
			}
		} else if (slave.analArea - slave.anus > 2) {
			r.push(`but it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${either("asscrack", "buttcrack")}.`);
		} else if (slave.analArea - slave.anus > 1) {
			r.push(`but it's surrounded by a big ring of ${analSkinDesc} ${skinDesc} skin.`);
		} else if (slave.analArea - slave.anus > 0) {
			r.push(`and it's surrounded by a cute ${either("pucker", "ring", "rosebud")} of ${skinDesc} skin.`);
		} else {
			r.push(`and the ${skinDesc} skin around it is stretched smooth, since it's been deflowered only recently.`);
		}
	} else if (slave.anus === 2) {
		r.push(`${His} ${either("anal opening", "anus", "asshole", "asspussy", "butthole")} is`);
		if (slave.analArea - slave.anus > 1) {
			r.push(`only`);
		}
		r.push(either("relaxed", "loose", "accommodating"));
		if (slave.analArea - slave.anus > 2) {
			r.push(`but it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the`);
			if (slave.vagina > -1) {
				r.push(`bottom of ${his} pussy.`);
			} else {
				r.push(`base of ${his} cock.`);
			}
		} else if (slave.analArea - slave.anus > 1) {
			r.push(`but it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${either("asscrack", "buttcrack")}.`);
		} else if (slave.analArea - slave.anus > 0) {
			r.push(`and it's surrounded by a big ring of ${analSkinDesc} ${skinDesc} skin.`);
		} else {
			r.push(`and the ${skinDesc} skin around it is stretched smooth, suggesting it's getting used to being this way.`);
		}
	} else if (slave.anus === 3) {
		r.push(`${His} ${either("anal opening", "anus", "asshole", "asspussy", "butthole")} is a ${either("lewd", "loose", "relaxed", "welcoming")} slit`);
		if (slave.analArea - slave.anus > 1) {
			r.push(`and it's surrounded by a massive oval of ${analSkinDesc} ${skinDesc} skin that runs from ${his} tailbone all the way down to the`);
			if (slave.vagina > -1) {
				r.push(`bottom of ${his} pussy.`);
			} else {
				r.push(`base of ${his} cock.`);
			}
		} else if (slave.analArea - slave.anus > 0) {
			r.push(`and it's surrounded by an oval of ${analSkinDesc} ${skinDesc} skin that occupies ${his} entire ${either("asscrack", "buttcrack")}.`);
		} else {
			r.push(`and the ${skinDesc} skin around it is stretched smooth, suggesting ${he}'s getting used to having such a cock-hungry rear fuckhole.`);
		}
	} else {
		r.push(`${His} ${either("anal opening", "anal slit", "anus", "asshole", "asspussy", "butthole")} is a ${either("loose", "wide-open", "permanent", "relaxed")} gape,`);
		if (slave.analArea - slave.anus > 0) {
			r.push(`and it's surrounded by a massive oval of ${skinDesc} skin that runs from ${his} tailbone all the way down to the`);
			if (slave.vagina > -1) {
				r.push(`bottom of ${his} pussy.`);
			} else {
				r.push(`base of ${his} cock.`);
			}
		} else {
			r.push(`and the ${skinDesc} skin around it is stretched smooth, suggesting ${he}'s only recently had ${his} ass ruined.`);
		}
	}

	if (slave.pubicHStyle === "bushy" || slave.pubicHStyle === "very bushy") {
		if (slave.physicalAge >= 13) {
			r.push(`Since ${he} has been left natural, ${he} has some light ${slave.pubicHColor} pubic hair around ${his} ass.`);
		}
	}

	if (slave.minorInjury === "sore ass") {
		r.push(`${His} asshole has seen hard use lately and looks a little sore.`);
	}

	if (slave.gingering && slave.gingering.type === "ginger") {
		r.push(`${His} asshole looks unusually puffy and sore. ${He}'s either been cruelly assraped lately, or ${he}'s had an irritant placed in ${his} anus.`);
	}

	r.push(App.Desc.buttplug(slave, descType));

	r.push(App.Desc.mods(slave, "anus"));

	if (skills) {
		if (slave.fuckdoll > 0) {
			r.push(`As a Fuckdoll,`);
			if (slave.fuckdoll <= 45) {
				r.push(`${he} is only fit to be locked in place so ${his} rear hole can be raped.`);
			} else {
				r.push(`${he} can be instructed to rhythmically squeeze`);
				if (V.PC.dick !== 0) {
					r.push(`cocks`);
				} else {
					r.push(`anything`);
				}
				r.push(`inserted into ${his} rear hole.`);
				if (slave.fuckdoll <= 85) {
					r.push(`${He} can also be ordered to bounce atop objects in ${his} anus.`);
				}
			}
		} else {
			if (slave.skill.anal >= 100) {
				r.push(`${He} is a <span class="skill">masterful anal slut.</span>`);
			} else if (slave.skill.anal > 60) {
				r.push(`${He} is an <span class="skill">expert anal slut.</span>`);
			} else if (slave.skill.anal > 30) {
				r.push(`${He} is a <span class="skill">skilled anal slut.</span>`);
			} else if (slave.skill.anal > 10) {
				r.push(`${He} has <span class="skill">basic knowledge about anal.</span>`);
			} else {
				r.push(`${He} is unskilled at taking anal.`);
			}
		}
	}
	return r.join(" ");
};
