App.Medicine.Surgery.Reactions.Unblind = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];
		r.push(`The eye surgery is <span class="health dec">invasive</span> and ${he} spends some time in the autosurgery recovering. As soon as ${he} is allowed to open ${his} eyes and look around, ${his} gaze flicks from object to object with manic speed as ${he} processes ${his} new vision. Seeing the world as it is is a gift that those who do not need it cannot properly understand.`);
		if (this._hasEmotion(slave)) {
			reaction.devotion += 25;
			reaction.trust += 25;
			if (slave.devotion > 50) {
				r.push(`${He} loved you before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too. ${He} never realized just how good you looked, and now ${he} can't get your image out of ${his} mind.`);
				if (slave.relationship === 0) {
					reaction.shortReaction.push(`${He} now loves you with all ${he} has.`);
					slave.relationship = -2;
				}
			} else if (slave.devotion > 20) {
				r.push(`${He} accepted you as ${his} owner before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too.`);
			} else {
				r.push(`${He} hardly knows what to make of this wonderful present from someone ${he} hates, and struggles with suspicion that the gift conceals some sort of snare. After a while, though, ${he} accepts that you <span class="devotion inc">truly did help ${him},</span> and <span class="trust inc">might be trustworthy.</span>`);
			}
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFUnblind = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {"left"|"right"} side
	 */
	constructor(slave, side) {
		super(slave);
		this._side = side;
	}

	get name() {
		return "Implant";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		eyeSurgery(this._slave, this._side, "normal");
		return this._assemble(new App.Medicine.Surgery.Reactions.Unblind());
	}
};
