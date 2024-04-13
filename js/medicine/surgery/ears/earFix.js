App.Medicine.Surgery.Reactions.EarFix = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The inner ear surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> As soon as ${he} is allowed to open ${his} eyes and look around, ${his} gaze flicks from object to object with manic speed as ${he} identifies each and every newly clear sound. Hearing the world as it is without hearing aids is a gift that those who do not need it cannot properly understand.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`${He} loved you before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too.`);
			} else if (slave.devotion >= -20) {
				r.push(`${He} accepted you as ${his} owner before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too.`);
			} else {
				r.push(`${He} hardly knows what to make of this wonderful present from someone ${he} hates, and struggles with suspicion that the gift conceals some sort of snare. After a while, though, ${he} accepts that you <span class="devotion inc">truly did help ${him},</span> and <span class="trust inc">might be trustworthy.</span>`);
			}
			reaction.devotion += 5;
			reaction.trust += 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.EarFix = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Correct hearing";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.hears = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.EarFix());
	}
};
