/**
 * @typedef {object} confinedResults
 * @property {string} text
 * @property {boolean} broken
 */

/**
 * @param {FC.ReportSlave} slave
 * @returns {confinedResults}
 */
App.SlaveAssignment.stayConfined = function(slave) {
	const {
		he, him, his, He, His
	} = getPronouns(slave);

	let t = "";
	let brokenSlaves = false;

	if (slave.fetish !== Fetish.MINDBROKEN) {
		if (slave.devotion < -50) {
			t += `is kept in solitary confinement whenever ${he} is not being forced to do something else. ${He} still hates ${his} place in the world, but being forced to rely on slave life as ${his} only human contact <span class="devotion inc">grinds down ${his} resistance.</span>`;
			slave.devotion += 2;
		} else if (slave.devotion <= 20) {
			t += `is kept in solitary confinement whenever ${he} is not being forced to do something else. With nothing to do but look forward to the next time ${he}'s let out to serve, <span class="devotion inc">${he} begins to rely on servitude.</span>`;
			slave.devotion += 1;
		} else if (slave.devotion <= 50) {
			t += `accepts solitary confinement whenever ${he} is not being forced to do something else. Since ${he} is obedient, the mental torture neither breaks ${him} further nor causes ${him} to hate you.`;
		} else {
			t += `accepts solitary confinement whenever ${he} is not being forced to do something else. ${He} spends ${his} time wondering hopelessly how ${he} has failed you, <span class="devotion dec">damaging ${his} devotion to you.</span>`;
			slave.devotion -= 2;
		}

		if (slave.trust < -50) {
			t += ` ${He} is so terrified of you that this confinement does not make ${him} fear you any more.`;
		} else if (slave.trust < -20) {
			t += ` ${He} is already afraid of you, but this confinement makes ${him} <span class="trust dec">fear you even more.</span>`;
			slave.trust -= 2;
		} else if (slave.trust <= 20) {
			t += ` This confinement makes ${him} <span class="trust dec">fear your power</span> over ${him}.`;
			slave.trust -= 4;
		} else {
			t += ` This confinement makes ${him} <span class="trust dec">trust you less,</span> and fear you more.`;
			slave.trust -= 5;
		}

		if (slave.assignment === Job.CELLBLOCK) {
			if ((slave.hears === -1 && slave.earwear !== "hearing aids") || (slave.hears === 0 && slave.earwear === "muffling ear plugs") || (slave.hears === -2)) {
				t += ` ${His} hearing impairment spares ${him} the sounds of ${his} peers getting punished, lightening the impact of ${his} imprisonment.`;
			}
		}

		if (slave.health.illness > 0) {
			t += ` ${He} is<span class="health dec">`;
			if (slave.health.illness === 1) {
				t += ` feeling under the weather`;
			} else if (slave.health.illness === 2) {
				t += ` somewhat ill`;
			} else if (slave.health.illness === 3) {
				t += ` sick`;
			} else if (slave.health.illness === 4) {
				t += ` very sick`;
			} else if (slave.health.illness === 5) {
				t += ` terribly ill`;
			}
			t += `,</span> so ${his} misery only grows.`;
		}
		if (slave.assignment === Job.CELLBLOCK && V.WardenessID !== 0) {
			t += ` The stress of confinement <span class="health dec">damages ${his} health.</span> ${S.Wardeness.slaveName}`;
			if (S.Wardeness.fetish === Fetish.MINDBROKEN) {
				if (slave.health.tired > 80) {
					t += `'s empty mind often overlooks ${him} when ${he} falls inert from exhaustion, giving ${him} <span class="health inc">a much needed chance to rest.</span>`;
				} else {
					t += `'s empty mind is void of mercy; This broken Wardeness sees <span class="health dec">no need for breaks nor rest.</span>`;
				}
			} else if (S.Wardeness.sexualQuirk === SexualQuirk.CARING) {
				t += ` is too caring and has to focus on not coddling ${him}.`;
			} else if (S.Wardeness.sexualFlaw === SexualFlaw.MALICIOUS || S.Wardeness.sexualFlaw === SexualFlaw.ABUSIVE) {
				if (slave.health.condition > 20) {
					t += ` enjoys <span class="health dec">depriving ${him} of sleep and watching ${him} succumb to fatigue.</span>`;
				} else if (slave.health.tired > 80) {
					t += ` knows better than to let ${him} become dangerously exhausted in ${his} condition.`;
				} else {
					t += ` enjoys <span class="health dec">depriving ${him} of sleep,</span> leaving ${him} vulnerable.`;
				}
			} else if (slave.health.tired > 50) {
				t += ` allots ${him} <span class="health inc">time to sleep</span> in an effort to prevent exhaustion from interrupting ${his} efforts.`;
			} else if (slave.health.tired <= 30) {
				t += ` welcomes ${him} to ${V.cellblockName} by <span class="yellow">denying ${him} sleep</span> until ${he} is nice and pliable.`;
			} else {
				t += ` makes sure to <span class="yellow">deny ${him} sleep</span> to keep ${him} pliable.`;
			}
		} else {
			t += ` The stress of confinement <span class="health dec">damages ${his} health`;
			if (slave.health.tired > 30) {
				t += `,</span> but the isolation gives ${his} tired body a chance to rest.`;
			} else {
				t += `.</span>`;
			}
		}
		healthDamage(slave, 10);
	} else {
		t += `is oblivious to ${his} confinement.`;
	}
	tired(slave);

	if (slave.assignment === Job.CELLBLOCK && V.WardenessID !== 0) {
		if ((S.Wardeness.sexualFlaw === SexualFlaw.MALICIOUS || S.Wardeness.sexualFlaw === SexualFlaw.ABUSIVE || S.Wardeness.sexualFlaw === SexualFlaw.BREASTEXP) && slave.lactation === 1 && slave.lactationDuration === 0) {
			t += ` ${S.Wardeness.slaveName} `;
			if (S.Wardeness.sexualFlaw === SexualFlaw.MALICIOUS) {
				t += `savors the torment brought about by ${his} milk-bloated chest and makes sure to milk ${him} thoroughly every other week to maximize ${his} suffering.`;
			} else if (S.Wardeness.sexualFlaw === SexualFlaw.ABUSIVE) {
				t += `enjoys neglecting ${his} milk-bloated chest until it gets big and painfully swollen; only then does the abusive jail-keeper roughly drain ${his} sensitive mounds.`;
			} else if (S.Wardeness.sexualFlaw === SexualFlaw.BREASTEXP) {
				t += `loves watching ${his} breasts steadily swell with pent-up milk and only milks ${him} in order to reset the process.`;
			}
		}
	}

	if (slave.sentence !== 0) {
		t += ` ${He} has ${numberWithPluralOne(slave.sentence, "week")} remaining.`;
	} else if (slave.devotion > 20 || (slave.devotion >= -20 && slave.trust < -20) || (slave.devotion >= -50 && slave.trust < -50) || slave.fetish === Fetish.MINDBROKEN) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			t += ` ${His} broken mind hinges entirely on other's guidance,`;
		} else {
			t += ` ${He} is now willing to <span class="devotion accept">do as ${he}'s told,</span>`;
		}

		t += ` <span class="noteworthy">`;
		if (slave.assignment === Job.CELLBLOCK) {
			brokenSlaves = true;
		}
		if (V.assignmentRecords[slave.ID]) {
			let oldJob = V.assignmentRecords[slave.ID];
			assignJobSafely(slave, oldJob);
			if (slave.choosesOwnAssignment === 1) {
				t += ` and ${he} is resting before choosing another task.`;
			} else if (slave.assignment === Job.REST) {
				if (oldJob !== Job.REST) {
					t += ` and since ${he} was unable to return to ${his} old task to ${oldJob}, ${his} assignment has defaulted to rest.`;
				} else {
					t += ` so ${he} has returned to rest.`;
				}
			} else {
				t += ` so ${he} goes back to ${oldJob}.`;
			}
		} else {
			t += ` so ${his} assignment has defaulted to rest.`;
			removeJob(slave, slave.assignment);
		}

		t += `</span>`;
	}
	return {text: t, broken: brokenSlaves};
};
