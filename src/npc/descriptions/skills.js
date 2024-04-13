/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.skills = function(slave) {
	const r = [];
	const {
		He, girl
	} = getPronouns(slave);

	if (slave.fuckdoll > 0) {
		r.push(`${He} is`);
		if (slave.fuckdoll <= 10) {
			r.push(`poorly adapted to life as a living sex toy.`);
		} else if (slave.fuckdoll <= 30) {
			r.push(`<span class="skill">moderately adapted to life as a living sex toy.</span>`);
		} else if (slave.fuckdoll <= 60) {
			r.push(`<span class="skill">well adapted to life as a living sex toy.</span>`);
		} else if (slave.fuckdoll < 100) {
			r.push(`<span class="skill">almost perfectly adapted to life as a living sex toy.</span>`);
		} else {
			r.push(`<span class="skill">perfectly adapted to life as a living sex toy.</span>`);
		}
		r.push(`Entertainment and prostitution skills are irrelevant for a Fuckdoll.`);
	} else {
		if (slave.skill.whoring <= 10) {
			if (slave.skill.entertainment <= 10) {
				// no text
			} else if (slave.skill.entertainment <= 30) {
				r.push(`${He} is <span class="skill">reasonably entertaining.</span>`);
			} else if (slave.skill.entertainment <= 60) {
				r.push(`${He} is a <span class="skill">skilled entertainer.</span>`);
			} else if (slave.skill.entertainment < 100) {
				r.push(`${He} is an <span class="skill">expert entertainer.</span>`);
			} else {
				r.push(`${He} is a <span class="skill">master of entertainment.</span>`);
			}
		} else {
			if (slave.skill.entertainment <= 10) {
				// no text
			} else if (slave.skill.entertainment <= 30) {
				r.push(`${He} is <span class="skill">reasonably entertaining</span> and`);
			} else if (slave.skill.entertainment <= 60) {
				r.push(`${He} is a <span class="skill">skilled entertainer</span> and`);
			} else if (slave.skill.entertainment < 100) {
				r.push(`${He} is an <span class="skill">expert entertainer</span> and`);
			} else {
				r.push(`${He} is a <span class="skill">master of entertainment</span> and`);
			}
		}
		if (slave.skill.whoring <= 10) {
			// no text
		} else if (slave.skill.whoring <= 30) {
			if (slave.skill.entertainment <= 10) {
				r.push(`${He}`);
			}
			r.push(`has <span class="skill">basic experience as a prostitute.</span>`);
		} else if (slave.skill.whoring <= 60) {
			if (slave.skill.entertainment <= 10) {
				r.push(`${He} is`);
			}
			r.push(`a <span class="skill">skilled streetwalker.</span>`);
		} else if (slave.skill.whoring < 100) {
			if (slave.skill.entertainment <= 10) {
				r.push(`${He} is`);
			}
			r.push(`an <span class="skill">expert working ${girl}.</span>`);
		} else {
			if (slave.skill.entertainment <= 10) {
				r.push(`${He} is`);
			}
			r.push(`a <span class="skill">masterful whore.</span>`);
		}
	}
	return r.join(" ");
};
