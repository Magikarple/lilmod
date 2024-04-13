App.Medicine.Surgery.Reactions.EyeFix = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The laser eye surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> As soon as ${he} is allowed to open ${his} eyes and look around, ${his} gaze flicks from object to object with manic speed as ${he} processes ${his} newly clear vision. Seeing the world as it is without glasses or contact lenses is a gift that those who do not need it cannot properly understand.`);
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

App.Medicine.Surgery.Procedures.EyeFix = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.BodySideAll} side
	 */
	constructor(slave, side) {
		super(slave);
		this.side = side;
	}

	get name() { return `Fix ${this.side} ${this.side === "both" ? "eyes" : "eye"}`; }

	get healthCost() { return 5; }

	apply(cheat) {
		eyeSurgery(this._slave, this.side, "fix");
		return this._assemble(new App.Medicine.Surgery.Reactions.EyeFix());
	}
};
