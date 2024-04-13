/**
 * Returns a string describing the effects of the slave working to produce food.
 * To see full effects, see farmyardShows.js
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Facilities.Farmyard.produceFood = function(slave) {
	const {he, him, his, He, His} = getPronouns(slave);

	const text = [];

	text.push(
		devotion(),
		muscles(),
		weight(),
		health(),
		sight(),
		hearing(),
		shows(),
	);

	return text.join(' ');

	function devotion() {
		if (slave.devotion > 50) {
			return `${He}'s so devoted to you that ${he} works harder and produces more food.`;
		} else if (slave.devotion < -50) {
			return `${He}'s so resistant that ${he} doesn't work as hard, and thus produces less food.`;
		} else {
			return `${He} doesn't feel particularly compelled to work hard or slack off and produces an average amount of food.`;
		}
	}

	function health() {
		const text = [];

		text.push(
			healthCondition(),
			healthIllness(),
		);

		return text.join(' ');
	}

	function healthCondition() {
		if (slave.health.condition > 50) {
			return `${His} shining health helps ${him} work harder and longer.`;
		} else if (slave.health.condition < -50) {
			return `${His} poor health impedes ${his} ability to work efficiently.`;
		}
	}

	function healthIllness() {
		const text = [];
		let health = ``;
		let exhaustion = ``;

		if (slave.health.illness > 0 || slave.health.tired > 60) {
			if (slave.health.illness === 1) {
				health = `feeling under the weather`;
			} else if (slave.health.illness === 2) {
				health = `a minor illness`;
			} else if (slave.health.illness === 3) {
				health = `being sick`;
			} else if (slave.health.illness === 4) {
				health = `being very sick`;
			} else if (slave.health.illness === 5) {
				health = `a terrible illness`;
			}

			if (slave.health.tired > 90) {
				exhaustion = `exhaustion`;
			} else if (slave.health.tired > 60) {
				exhaustion = `being tired`;
			}

			text.push(`${He} performed worse this week due to <span class="health dec">${health}${slave.health.illness > 0 && slave.health.tired > 60 ? ` and ` : ``}${exhaustion}.</span>`);

			text.push(tired());
		}

		return text;
	}

	function tired() {
		if (slaveResting(slave)) {
			return `${He} spends reduced hours working the soil in order to <span class="health dec">offset ${his} lack of rest.</span>`;
		} else if (slave.health.tired + 20 >= 90 && !willWorkToDeath(slave)) {
			return `${He} attempts to refuse work due to ${his} exhaustion, but can do little to stop it or the resulting <span class="trust dec">severe punishment.</span> ${He} <span class="devotion dec">purposefully underperforms,</span> choosing ${his} overall well-being over the consequences, <span class="health dec">greatly reducing yields.</span>`;
		} else {
			return `Hours of manual labor quickly add up, leaving ${him} <span class="health dec">physically drained</span> by the end of the day.`;
		}
	}

	function muscles() {
		if (slave.muscles > 50) {
			return `${His} muscular form helps ${him} work better, increasing ${his} productivity.`;
		} else if (slave.muscles < -50) {
			return `${He} is so weak that ${he} is not able to work effectively.`;
		}
	}

	function weight() {
		if (slave.weight > 95) {
			return `${He} is so overweight that ${he} has to stop every few minutes to catch ${his} breath, and so ${his} productivity suffers. `;
		}
	}

	function sight() {
		if (!canSee(slave)) {
			return `${His} blindness makes it extremely difficult for ${him} to work, severely limiting ${his} production.`;
		} else if (!canSeePerfectly(slave)) {
			return `${His} nearsightedness makes it harder for ${him} to work as hard as ${he} otherwise would.`;
		}
	}

	function hearing() {
		if (slave.hears === -1) {
			return `${He} is hard-of-hearing, which gets in the way of ${his} work whenever ${he} misses directions${S.Farmer ? ` from ${S.Farmer.slaveName}` : ``}.`;
		} else if (slave.hears < -1) {
			return `${He} is deaf, which gets in the way of ${his} work whenever ${he} misses directions${S.Farmer ? ` from ${S.Farmer.slaveName}` : ``}.`;
		}
	}

	function shows() {
		if (V.farmyardShows === 1) {
			return `Since ${he} also has to put on shows for your citizens, ${he} can only work on food production for half of ${his} shift, cutting down on the amount of food ${he} would have otherwise produced.`;
		}
	}
};
