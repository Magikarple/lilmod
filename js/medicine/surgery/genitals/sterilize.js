App.Medicine.Surgery.Reactions.Sterilize = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but lacks the mental faculties to know that ${he}'ll never have a child now. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY)) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he}'ll never have a child. ${He} is <span class="devotion dec">filled with grief</span> whenever ${he} thinks about the fact that feeling a life growing within ${him} is now, finally and forever, beyond ${him}. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 20;
		} else if (slave.energy > 95) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he}'ll never have to worry about a pussyfuck getting ${him} pregnant again. As far as ${he}'s concerned, easier, less worrisome vaginal intercourse is a <span class="devotion inc">good thing;</span> one less thing to keep in mind when a guy blows his load inside ${him}. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 50) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he}'ll never have to worry about a pregnancy, ever again. ${He} has many rules and duties to worry about as a slave, so ${he}'s <span class="devotion inc">grateful</span> that ${he} has one less thing to worry about as ${he} serves you. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he}'ll never get pregnant. ${He} understands the realities of ${his} life as a slave, and that a traditional life with a child was never going to happen for ${him} anyway, so it isn't much of a shock. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he}'ll never get pregnant. ${He} does not understand the realities of ${his} life as a slave at a core level, so despite the fact that ${he} was never going to have a family, fertile or not, ${he}'s <span class="devotion dec">resentful</span> of the surgical invasion. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Sterilize = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Sterilize";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.preg = -2;
		return this._assemble(new App.Medicine.Surgery.Reactions.Sterilize());
	}
};

App.Medicine.Surgery.Procedures.Oophorectomy = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Oophorectomy";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.ovaries = 0;
		this._slave.ovaImplant = OvaryImplantType.NONE;
		this._slave.wombImplant = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.Sterilize());
	}
};
