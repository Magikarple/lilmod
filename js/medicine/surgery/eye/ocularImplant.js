App.Medicine.Surgery.Reactions.OcularImplant = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The implant surgery is <span class="health dec">invasive</span> and ${he} spends some time in the autosurgery recovering. When ${he} is allowed to open ${his} eyes the amount of visual information makes ${him} reel.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`${He} is <span class="devotion inc">grateful</span> for ${his} improved vision, and knowing how much you invested in ${him} makes ${him} <span class="trust inc">trust you more</span> as well.`);
				reaction.devotion += 10;
				reaction.trust += 10;
			} else if (slave.devotion > 20) {
				r.push(`${He} has mixed feelings about ${his} new eyes, but ${he}'s <span class="trust inc">aware</span> how valuable such implants are, and ${he} already <span class="devotion inc">accepted</span> that you have complete control over ${his} body.`);
				reaction.devotion += 5;
				reaction.trust += 10;
			} else {
				r.push(`${He} is <span class="trust dec">disturbed</span> that you replaced ${his} eyes with artificial ones and afraid of increased control over ${him} that such device grants.`);
				reaction.trust -= 5;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.OcularImplantForBlind = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];
		r.push(`The implant surgery is <span class="health dec">invasive</span> and ${he} spends some time in the autosurgery recovering. As soon as ${he} is allowed to open ${his} eyes and look around, ${his} gaze flicks from object to object with manic speed as ${his} new eyes deliver nearly overwhelming amount of visual information. Seeing the world as it is is a gift that those who do not need it cannot properly understand.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`${He} loved you before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too. ${He} never realized just how good you looked, and now ${he} can't get your image out of ${his} mind.`);
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

App.Medicine.Surgery.Procedures.OcularImplant = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.BodySideAll}side
	 */
	constructor(slave, side) {
		super(slave);
		this.side = side;
	}

	get name() {
		if (this.side === "both") {
			return "Give both eyes ocular implants";
		}
		return `Give ${this.side} eye ocular implant`;
	}

	get healthCost() {
		return 5;
	}

	apply(cheat) {
		eyeSurgery(this._slave, this.side, "cybernetic");
		if (getBestVision(this.originalSlave) > 0) {
			return this._assemble(new App.Medicine.Surgery.Reactions.OcularImplant());
		} else {
			return this._assemble(new App.Medicine.Surgery.Reactions.OcularImplantForBlind());
		}
	}
};
