App.Medicine.Surgery.Reactions.Undeafen = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];
		r.push(`The inner ear surgery is <span class="health dec">invasive</span> and ${he} spends some time in the autosurgery recovering. As soon as the bandages around ${his} ears are removed, ${his} head tilts towards any source of sound with manic speed as ${he} processes ${his} new hearing. Hearing the world as it is is a gift that those who do not need it cannot properly understand.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`${He} loved you before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too. ${He} never realized just how nice your voice was, and now ${he} can't get your words out of ${his} mind.`);
				if (slave.relationship === 0) {
					slave.relationship = -2;
				}
			} else if (slave.devotion > 20) {
				r.push(`${He} accepted you as ${his} owner before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too.`);
			} else {
				r.push(`${He} hardly knows what to make of this wonderful present from someone ${he} hates, and struggles with suspicion that the gift conceals some sort of snare. After a while, though, ${he} accepts that you <span class="devotion inc">truly did help ${him},</span> and <span class="trust inc">might be trustworthy.</span>`);
			}
			reaction.devotion += 25;
			reaction.trust += 25;
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFUndeafen = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.hears = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.Undeafen());
	}
};
