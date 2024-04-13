App.Desc.Player.health = function(PC = V.PC) {
	const r = [];
	const PCH = PC.health;

	if (PCH.condition < -90) {
		r.push(`<span class="red">You look as if you already have one foot in the grave.</span>`);
	} else if (PCH.condition < -50) {
		r.push(`You feel <span class="red">really unwell.</span>`);
	} else if (PCH.condition < -20) {
		r.push(`You feel <span class="red">under the weather.</span>`);
	} else if (PCH.condition <= 20) {
		r.push(`You feel <span class="yellow">fine,</span> just fine.`);
	} else if (PCH.condition <= 50) {
		r.push(`You're feeling <span class="green">pretty good.</span>`);
	} else if (PCH.condition <= 90) {
		r.push(`You're feeling <span class="green">really great.</span>`);
	} else {
		r.push(`You've <span class="green">never felt better.</span>`);
	}

	if (PCH.shortDamage >= 20) {
		if (PCH.condition < -20) {
			if (PCH.shortDamage >= 200) {
				r.push(`Your body agrees, leaving you <span class="red">increasingly vulnerable to further injuries.</span>`);
			} else {
				r.push(`To make it worse, a <span class="red">feeling of malaise</span> looms over you.`);
			}
		} else {
			if (PCH.shortDamage >= 200) {
				r.push(`Your body, however, has a different opinion; it is <span class="red">susceptible to further injury</span> unless given time to heal.`);
			} else {
				r.push(`A <span class="red">feeling of malaise</span> hangs over you, however.`);
			}
		}
	}

	if (PCH.illness === 1) {
		r.push(`You <span class="yellow">might be coming down with something.</span>`);
	} else if (PCH.illness === 2) {
		r.push(`You've caught some sort of <span class="yellow">minor illness.</span>`);
	} else if (PCH.illness === 3) {
		r.push(`You've <span class="red">fallen ill;</span> you should see a doctor as soon as you can.`);
	} else if (PCH.illness === 4) {
		r.push(`You've <span class="red">become seriously ill;</span> you need to see a doctor as soon as you can.`);
	} else if (PCH.illness === 5) {
		r.push(`You've <span class="red">been stricken with a life-threatening illness;</span> you need to see a doctor immediately!`);
	}

	if (PC.physicalImpairment > 1 ) {
		r.push(`Your body has been <span class="red">completely ruined,</span> making even the simplest of tasks a challenge.`);
	} else if (PC.physicalImpairment > 0) {
		r.push(`Your body has suffered <span class="yellow">permanent damage,</span> making life a little more difficult.`);
	}

	if (V.debugMode) {
		r.push(`Your current health is ${PCH.condition}, with ${PCH.shortDamage} short term damage and ${PCH.longDamage} long term damage. You have a carcinogen build up of ${PC.chem} and an illness severity of ${PCH.illness}.`);
	}

	// This all is going to be revised.
	// shortDamage will be lingering damage, should increase the odds of further damaging events based off its value, and will naturally decay
	// longDamage will not decay, and is caused by high chem and passing a shortDamage threshold. Works similar to shortDamage in increasing susceptibility, but at a greatly reduced percent. Also decreases max life span.
	// criticalDamage is a permanent flaw gained by cheating death in certain events.
	/*
	if (PCH.shortDamage > 5 || PCH.longDamage > 5 || PCH.condition < 0) {
		const ldc = PCH.longDamage > 5 || PCH.condition < 0 ? `,` : `.`);
		const c = PCH.condition < 0 ? `,` : `.`);

		let and = '';

		r.push(` Upon closer inspection you note that ${he}`);

		array = [];
		if (PCH.shortDamage >= 100) {
			array.push(`looks <span class="red">absolutely brutalized</span> and will never be quite the way he was${ldc}`);
		} else if (PCH.shortDamage >= 70) {
			array.push(`is <span class="red">gravely injured</span> with assured lasting effects${ldc}`);
		} else if (PCH.shortDamage >= 40) {
			array.push(`is <span class="red">seriously injured</span> with some lasting effects${ldc}`);
		} else if (PCH.shortDamage >= 20) {
			array.push(`is <span class="orange">injured${ldc}</span>`);
		} else if (PCH.shortDamage > 5) {
			array.push(`seems to have suffered a <span class="yellow">minor injury</span> recently${ldc}`);
		}

		if (PCH.longDamage > 5) {
			if (PCH.shortDamage > 5 && PCH.condition >= 0) {
				and = `and `);
			}

			if (PCH.longDamage >= 70) {
				array.push(`${and}is suffering heavily under accumulated <span class="red">permanent health problems${c}</span>`);
			} else if (PCH.longDamage >= 40) {
				array.push(`${and}has some clear <span class="red">permanent health issues${c}</span>`);
			} else if (PCH.longDamage >= 20) {
				array.push(`${and}shows signs of <span class="orange">lasting health problems${c}</span>`);
			} else {
				array.push(`${and}carries some <span class="yellow">minor niggles${c}</span>`);
			}
		}

		if (PCH.condition < 0) {
			if (PCH.shortDamage > 5 || PCH.longDamage > 5) {
				and = `and `);
			}

			if (PCH.condition < -80 && PCH.shortDamage !== 0 && PCH.longDamage !== 0) {
				array.push(`${and}has been treated so badly he <span class="red">is close to the brink.</span>`);
			} else if (PCH.condition < -50) {
				array.push(`${and}appears to be in <span class="red">terrible condition.</span>`);
			} else if (PCH.condition < -20) {
				array.push(`${and}appears to be in <span class="orange">poor condition.</span>`);
			} else {
				array.push(`${and}could be in <span class="yellow">better condition.</span>`);
			}
		}

		r.push(` ${array.join(' ')}`);
	}
	*/

	if (PC.energy > 95) {
		r.push(`You are a <span class="red">complete nymphomaniac</span> and can't help but prioritize sex before all else.`);
	} else if (PC.energy > 80) {
		r.push(`You have a <span class="green">sex drive befitting of your station.</span>`);
	} else if (PC.energy > 60) {
		r.push(`You have a <span class="green">powerful sex drive.</span>`);
	} else if (PC.energy > 40) {
		r.push(`You have a <span class="yellow">healthy sex drive.</span>`);
	} else if (PC.energy > 20) {
		r.push(`You have a <span class="red">weak sex drive.</span>`);
	} else {
		r.push(`You have <span class="red">little interest in sex,</span> which complicates your position in the hierarchy of things.`);
	}
	if (PC.lusty > 0) {
		r.push(`You didn't get enough last week and are now paying for`);
		if (PC.balls > 0) {
			r.push(`it with a <span class="red">serious case of blue balls.</span>`);
		} else {
			r.push(`it; you are beleaguered by a <span class="red">constant ache in your loins</span> and an intense desire to grind against nearby objects.`);
		}
	}

	return r.join(" ");
};
