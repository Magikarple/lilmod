App.Medicine.Surgery.Reactions.TummyTuck = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		r.push(`${He} leaves the surgery with a soreness on ${his} lower abdomen,`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`and finds ${his} belly isn't so saggy anymore. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else {
			r.push(`and is <span class="devotion inc">pleased</span> to find it's no longer saggy. ${He}'s happy that ${he}'ll be able to show off ${his}`);
			if (slave.weight > 95) {
				r.push(`big soft belly${(slave.weight > 130) ? `, for a while at least,` : ``}`);
			} else if (slave.weight > 30) {
				r.push(`soft belly`);
			} else if (slave.muscles > 30) {
				r.push(`muscular belly`);
			} else if (slave.muscles > 5) {
				r.push(`once again firm, ripped belly`);
			} else {
				r.push(`once again firm, flat belly`);
			}
			r.push(`without being self conscious about it. As with all surgery <span class="health dec">${his} health has been affected.</span>`);
			reaction.devotion += 2;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};
App.Medicine.Surgery.Procedures.TummyTuck = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Tummy tuck";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.bellySag = 0;
		this._slave.bellySagPreg = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.TummyTuck());
	}
};
