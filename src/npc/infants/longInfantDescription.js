/**
 * Displays a detailed description of the infant
 * @param {App.Facilities.Nursery.InfantState} child
 * @returns {string}
 */
App.Facilities.Nursery.LongInfantDescription = function(child, {market = 0, eventDescription = 0} = {}) {
	const PC = V.PC;
	const arcology = V.arcologies[0];
	const weeksOwned = V.week - child.weekAcquired;

	let r = ``;
	let age;
	let title;
	let father = 0;
	let fatherPC = 0;
	let mother = 0;
	let motherPC = 0;

	const {he, his, He} = getPronouns(child);

	if (child.father === -1 && child.mother === -1) {
		father = PC;
		fatherPC = 1;
		mother = PC;
		motherPC = 1;
	} else {
		if (child.father === -1) {
			father = PC;
			fatherPC = 1;
			mother = getSlave(child.mother);
		} else if (child.mother === -1) {
			father = getSlave(child.father);
			mother = PC;
			motherPC = 1;
		} else {
			if (child.father > 0) { /* Fathered by a current slave */
				father = getSlave(child.father);
			} else if (child.father < 0) { /* Fathered by a missing slave */
				father = -1;
			}
			if (child.father > 0) { /* Mothered by a current slave */
				mother = getSlave(child.mother);
			} else if (child.mother < 0) { /* Mothered by a missing slave */
				mother = -1;
			}
		}
	}

	// TODO: add infant art here

	r += `&nbsp;&nbsp;&nbsp;&nbsp; `;

	r += `<span id="childName" class="slave name simple">${SlaveFullName(child)}</span> `;

	if (jsDef(child.custom)) {
		if (child.custom.label) {
			r += ` (<span class="custom-label">${child.custom.label}</span>) `;
		}
	}

	if (child.actualAge > 0) {
		age = `${num(child.actualAge)}-year-old`;
		if (child.actualAge > 1) {
			title = `toddler`;
		} else {
			title = `baby`;
		}
	} else {
		if (weeksOwned > 4) {
			age = `${num(Math.trunc(weeksOwned / 4))}-month-old`;
			title = `baby`;
		} else {
			if (weeksOwned <= 1) {
				age = ``;
				title = `newborn`;
			} else {
				age = `${num(weeksOwned)}-week-old`;
				title = `baby`;
			}
		}
	}

	r += ` is a ${age} <strong><span class="coral">${title}.</span></strong> ${He} was born in ${arcology.name} ${weeksOwned > 4 ? weeksOwned < 9 ? `about a month` : `${num(weeksOwned)} months` : weeksOwned <= 1 ? `last week` : `${num(weeksOwned)} weeks`}${weeksOwned > 1 ? ` ago` : ``}`;

	if (jsDef(child.counter)) {
		const oral = child.counter.oral;
		const vaginal = child.counter.vaginal;
		const anal = child.counter.oral;
		const mammary = child.counter.mammary;
		const penetrative = child.counter.penetrative;
		const total = oral + vaginal + anal + mammary + penetrative;

		if (total > 0) {
			r += ` and has been fucked about ${num(total)} times, including `;
			if ((vaginal + anal + mammary + penetrative) > 0) {
				if (vaginal > 0) {
					r += `${num(vaginal)} vanilla, `;
				}
				if (anal > 0) {
					r += `${num(anal)} anal, `;
				}
				if (mammary > 0) {
					r += `${num(mammary)} mammary `;
				}
				if (penetrative > 0) {
					r += `${num(penetrative)} penetrating, `;
				}
				r += ` and `;
			}
			r += `${num(oral)} oral sexual encounters. `;
		} else {
			if (weeksOwned >= 1) {
				r += ` and `;
			} else {
				r += `. ${He} `;
			}

			r += `has had little or no sexual experience `;
			if (child.weekAcquired !== 0) {
				r += `as your slave `;
			} else {
				r += `in your new arcology `;
			}
			r += `yet. `;

			let sortedCounts = [];
			sortedCounts.push(
				{type: "oral", value: oral},
				{type: "vaginal", value: vaginal},
				{type: "anal", value: anal},
				{type: "mammary", value: mammary},
				{type: "penetrative", value: penetrative}
			);
			sortedCounts = sortedCounts.sort(function(a, b) {	// sorts the counts from largest to smallest
				return b.value - a.value;
			});

			if (sortedCounts[0].type === "oral") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s sucked something off `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "vaginal") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${his} pussy has been fucked `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "anal") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s been buttfucked `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "mammary") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s put ${his} tits to work `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			} else if (sortedCounts[0].type === "penetrative") {
				if (((weeksOwned * 112) / oral) < 4) {
					r += `Remarkably, this means that ${he}'s pounded a hole `;
					if (((weeksOwned * 112) / oral) < 1) {
						r += `more than once every hour `;
					} else if (((weeksOwned * 112) / oral) < 1.5) {
						r += `about once every hour `;
					} else if (((weeksOwned * 112) / oral) < 2.5) {
						r += `about once every two hours `;
					} else if (((weeksOwned * 112) / oral) < 3.5) {
						r += `about once every three hours `;
					} else {
						r += `about once every four hours `;
					}
					r += ` ${he}'s spent awake. `;
				}
			}
		}
	} else {
		r += `. `;
	}

	// r += App.Desc.family(child) + ' '; TODO Assemble DOM instead of string to make this work again

	if (father && fatherPC) {
		if (child.eyeColor === PC.eye.origColor) {
			r += `${He} has your ${child.eyeColor} eyes, `;
		} else if (mother) {
			r += `${He} has ${his} mother ${mother.slaveName}'s ${child.eyeColor} eyes, `;
		}
	} else {
		if (father && child.eyeColor === father.eyeColor) {
			r += `${He} has ${his} father ${father.slaveName}'s ${child.eyeColor} eyes, `;
		} else if (mother) {
			r += `${He} has ${his} mother ${mother.slaveName}'s ${child.eyeColor} eyes, `;
		} else {
			r += `${He} has ${child.eyeColor} eyes, `;
		}
	}
	r += ` and ${he} will most likely have ${child.hColor} hair when ${he}'s older. `;

	r += `${He} ${V.seeRace ? `is ${child.race} and ${child.nationality}, and` : ``} has ${child.skin} skin. `;

	return r;
};
