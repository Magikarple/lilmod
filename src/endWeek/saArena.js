/**
 * @param {FC.ReportSlave} slave
 * @returns {string}
 */
App.SlaveAssignment.arena = function saArena(slave) {
	const {
		he, him, his, He, His
	} = getPronouns(slave);

	let skillIncrease = 0;
	let learningBlocked = false;

	const r = [];
	intro();
	health();
	body();
	mind();
	if (!learningBlocked) {
		effects();
		accidents();
	}
	result();

	return r.join(" ");

	function intro() {
		r.push(`${He} trains at ${App.Entity.facilities.pit.name} to hone ${his} combat skill.`);
	}

	function health() {
		skillIncrease -= 0.5 * slave.health.illness;
		if (slave.health.illness > 1) {
			if (slave.health.illness < 4) {
				r.push(`${His} illness is preventing ${him} from doing strenuous exercise, making ${him} focus on theory this week.`);
			} else {
				r.push(`${He} is so ill that ${he} is just lying on the sidelines the whole time.`);
				learningBlocked = true;
			}
		}
		if (slave.health.tired > 60) {
			r.push(`Being tired, ${he} is unable to keep up ${his} exercises properly.`);
			skillIncrease -= 1;
			if (slave.health.tired > 90) {
				skillIncrease -= 1;
			}
		}
		if (slave.health.illness <= 1 && slave.health.tired <= 30 && slave.health.condition > -20) {
			r.push(`${He} is in`);
			skillIncrease += 1;
			if (slave.health.condition > 50) {
				r.push(`perfect`);
				skillIncrease += 1;
			} else {
				r.push("good");
			}
			r.push(`condition and can train harder.`);
		}
	}

	function body() {
		if (slave.muscles < -30) {
			r.push(`${His} frail body prevents ${him} from doing continuous training, hampering ${his} progress.`);
			skillIncrease -= 1;
		} else if (
			slave.muscles > 30) {
			r.push(`${He} is fit and can train for extended amounts of time.`);
			skillIncrease += 1;
		}
	}

	function mind() {
		if (slave.assignment === Job.BODYGUARD) {
			r.push(`As your Bodyguard ${he} trains extra hard.`);
			skillIncrease += 1;
		}
	}

	function effects() {
		r.push(`Training every day in addition to ${his} normal duties leaves ${him} <span class="health dec">more tired.</span>`);
		slave.health.tired += 5;
	}

	function accidents() {
		const accident = Math.random();
		if (accident > 0.9) {
			r.push(`${He} had a <span class="health dec">bad training accident</span> this week and had to cut ${his} training short.`);
			healthDamage(slave, 20);
			skillIncrease -= 2;
		} else if (accident > 0.5) {
			r.push(`${His} combat exercises leave ${him} <span class="health dec">worse for wear,</span> though it helps ${him} learn faster.`);
			healthDamage(slave, 5);
			skillIncrease += 1;
		}
	}

	function result() {
		if (slave.skill.combat < 100) {
			if (learningBlocked || skillIncrease <= -4) {
				r.push(`${He} was unable to make any progress this week.`);
			}

			skillIncrease = Math.clamp(skillIncrease, -4, 6);
			skillIncrease += 10 + Math.floor((slave.intelligence + slave.intelligenceImplant) / 32);

			r.push(slaveSkillIncrease("combat", slave, skillIncrease));
		} else {
			r.push(`${He} is already a combat master and maintains ${his} combat skill with practice in ${App.Entity.facilities.pit.name}.`);
		}
	}
};
