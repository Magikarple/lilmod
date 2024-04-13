App.Medicine.Surgery.Reactions.AddForeskin = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him} = getPronouns(slave);
		const r = [];

		if (slave.dick > 0) {
			r.push(`${He} leaves the surgery gingerly, knowing ${he}'s had surgery on ${his} dick. Taking the first opportunity to check out ${his} member${(canSee(slave)) ? ` in a mirror` : ``}, ${he}'s`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`confused to find nothing has really changed.`);
			} else if (slave.devotion > 50) {
				r.push(`titillated to find that ${he} has a foreskin. ${He} examines it`);
				if (canSee(slave)) {
					r.push(`carefully and then touches it,`);
				}
				r.push(`very gently. ${He}'s very sore, obviously, but the sudden sensation is almost too much for ${him}. ${His} resolution to investigate ${his} remodeled dick, but later, is almost visible. It's obvious that ${he} can hardly wait, <span class="trust inc">anticipating</span> all the new sensations that this new and very sensitive patch of skin can offer ${him}. ${He}'s <span class="devotion inc">grateful</span> to you for improving ${his} dick.`);
				reaction.trust += 5;
				reaction.devotion += 5;
			} else if (slave.devotion >= -20) {
				r.push(`quite surprised, and a little relieved, to find that ${he} has a foreskin. ${He} examines it`);
				if (canSee(slave)) {
					r.push(`carefully and then touches it,`);
				}
				r.push(`very gently. ${He}'s very sore, obviously, but the sudden sensation is almost too much for ${him}. ${He} seems to have been worried that something more dramatic than a reversal of circumcision had been done to ${him}, but ${his} chief reaction is <span class="devotion inc">mystified submission</span> to you afterward. Your total power over ${his} body has been made clear to ${him} in a way that provokes confusion, not fear.`);
				reaction.devotion += 5;
			} else {
				r.push(`shocked to find that ${he} has a foreskin. ${He}'s not exactly resentful of you for doing this, since whatever ${his} feelings about circumcision might be, it's very far from what ${he} feared might be done to ${his} dick. ${His} reaction is dominated by <span class="trust dec">fear of the unknown,</span> since ${he}'s now wondering whether ${he} has any ability to predict your actions at all. Whatever ${his} mental model of you was before this, it probably didn't include you restoring ${his} foreskin.`);
				reaction.trust -= 5;
			}
		} else {
			r.push(`${He} leaves the surgery gingerly, knowing ${he}'s had surgery on ${his} genitals. Taking the first opportunity to check out ${his} crotch${(canSee(slave)) ? ` in a mirror` : ``}, ${he}'s`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`confused to find that ${his} clitoris is missing.`);
			} else if (slave.devotion > 50) {
				r.push(`titillated to find that ${his} clitoris has a hood. ${He} examines it`);
				if (canSee(slave)) {
					r.push(`carefully and then touches it,`);
				}
				r.push(`very gently. ${He}'s very sore, obviously, but the sudden sensation is almost too much for ${him}. ${His} resolution to investigate ${his} remodeled clit, but later, is almost visible. It's obvious that ${he} can hardly wait, <span class="trust inc">anticipating</span> all the new sensations that this new patch of skin can offer ${him}. ${He}'s <span class="devotion inc">grateful</span> to you for improving ${his} pussy.`);
				reaction.trust += 5;
				reaction.devotion += 5;
			} else if (slave.devotion >= -20) {
				r.push(`quite surprised, and a little relieved, to find that ${his} clit has a hood. ${He} examines it`);
				if (canSee(slave)) {
					r.push(`carefully and then touches it,`);
				}
				r.push(`very gently. ${He}'s very sore, obviously, but the sudden sensation is almost too much for ${him}. ${He} seems to have been worried that something more dramatic than a reversal of circumcision had been done to ${him}, but ${his} chief reaction is <span class="devotion inc">mystified submission</span> to you afterward. Your total power over ${his} body has been made clear to ${him} in a way that provokes confusion, not fear.`);
				reaction.devotion += 5;
			} else {
				r.push(`shocked to find that ${his} clitoris has a hood. ${He}'s not exactly resentful of you for doing this, since whatever ${his} feelings about circumcision might be, it's very far from what ${he} feared might be done to ${his} clit. ${His} reaction is dominated by <span class="trust dec">fear of the unknown,</span> since ${he}'s now wondering whether ${he} has any ability to predict your actions at all. Whatever ${his} mental model of you was before this, it probably didn't include you restoring ${his} clitoral hood.`);
				reaction.trust -= 5;
			}
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFAddForeskin = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Graft on";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		if (this._slave.dick > 0) {
			this._slave.foreskin = this._slave.dick;
		} else if (this._slave.clit > 0) {
			this._slave.foreskin = this._slave.clit;
		} else {
			this._slave.foreskin = 1;
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.AddForeskin());
	}
};
