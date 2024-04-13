App.Medicine.Surgery.Reactions.Preg1Hack = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The hacking process is brief, being little more than inserting the actuator into ${his} vagina, and leaves ${him} with <span class="health dec">nothing more than minor health effects</span> from the altered implant functions. ${He} leaves the surgery without any specific feeling, but ${he} knows that something has been done to ${his} implant.`);

		// My testing shows that 2 or 3 is relatively safe for generic adult slave with effective curatives or clinic, 4 - high risk of bursting. So there is a catch with it.
		slave.broodmotherFetuses = [2, 2, 2, 2, 3, 3, 4].random();

		if (slave.fetish === Fetish.MINDBROKEN) {
			/* nothing*/
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY)) {
			r.push(`${He} is <span class="devotion inc">filled with joy</span> about being even more swollen with life and gleefully rubs ${his} soon-to-be-larger belly. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 10;
		} else if (slave.devotion > 50) {
			r.push(`${He}'s <span class="devotion inc">grateful</span> that you think ${his} offspring are valuable, but is a little afraid about how ${his} body will catch up with ${his} hacked implant.`);
			reaction.devotion += 2;
			reaction.trust -= 2;
		} else if (slave.devotion >= -20) {
			r.push(`${He} understands the realities of ${his} life as a slave, so even this isn't much of a shock. ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and how big ${he} will get.`);
			reaction.trust -= 10;
		} else {
			r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> that you not only have forced ${him} to be a broodmother but also messed with the implant, with no thought for ${his} safety. ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and ${his} even more rapidly filling womb.`);
			reaction.trust -= 15;
			reaction.devotion -= 15;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.HackPregGenerator = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Hack the pregnancy generator";
	}

	get description() {
		return `This will trick the generator ova release logic, forcing it to release more than one ova each week. This is an untested override and can cause severe health problems.`;
	}

	get healthCost() {
		return 1; // Yes, 1
	}

	apply(cheat) {
		this._slave.pregControl = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.Preg1Hack());
	}
};
