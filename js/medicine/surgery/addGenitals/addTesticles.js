App.Medicine.Surgery.Reactions.AddTesticles = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`It's not immediately apparent to ${him} what kind of surgery ${he} received, since all ${he}'s left with is a nonspecific ache in ${his} abdomen. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} lies back in the surgical chair${(canSee(slave)) ? `, gazing at ${himself} in the ceiling mirror` : ``} as the fog of anesthetics lifts and feeling returns to ${his} lower half. As a devoted slave, ${he} knew the essentials of the surgery before it was performed, so ${he}'s excited to`);
			if (canSee(slave)) {
				r.push(`see`);
			} else {
				r.push(`feel`);
			}
			r.push(`the results. ${He} is <span class="trust inc">tremendously impressed</span> that you would devote such immense resources to altering ${his} body, and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future.`);
			reaction.trust += 5;
			reaction.devotion += 5;
		} else if (slave.devotion >= -20) {
			r.push(`It's not immediately apparent to ${him} what kind of surgery ${he} received, since all ${he}'s left with is a nonspecific ache in ${his} abdomen. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else {
			r.push(`It's not immediately apparent to ${him} what kind of surgery ${he} received, since all ${he}'s left with is a nonspecific ache in ${his} abdomen. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} doesn't have to know exactly what you did, though, to be <span class="trust dec">mortified</span> and <span class="devotion dec">infuriated</span> by your messing around inside ${his} body. ${He} hasn't yet learned to accept that you control ${him} completely, down to the arrangement and even presence of ${his} internal organs.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFAddTesticles = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.AnimalType} ballType
	 */
	constructor(slave, ballType) {
		super(slave);
		this.ballType = ballType;
	}

	get name() {
		return "Implant";
	}

	get description() {
		return "you can forgo standard procedure and implant testicles directly into their abdomen";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		if (this._slave.prostate === 0) {
			this._slave.prostate = 1;
		}
		this._slave.balls = 2;
		this._slave.ballType = this.ballType;
		if (this._slave.pubertyAgeXY === 0) {
			if (V.precociousPuberty === 1) {
				if (this._slave.physicalAge >= V.potencyAge) {
					this._slave.pubertyAgeXY = this._slave.physicalAge + 1;
				}
			} else {
				if (this._slave.physicalAge >= V.potencyAge) {
					this._slave.pubertyXY = 1;
				}
			}
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.AddTesticles());
	}
};


App.Medicine.Surgery.Procedures.OFReplaceTesticles = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.AnimalType} ballType
	 */
	constructor(slave, ballType) {
		super(slave);
		this.ballType = ballType;
	}

	get name() {
		return "Replace";
	}

	get description() {
		return "you can replace the existing testicles with a new pair";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.balls = 2;
		this._slave.ballType = this.ballType;
		if (this._slave.pubertyAgeXY === 0) {
			if (V.precociousPuberty === 1) {
				if (this._slave.physicalAge >= V.potencyAge) {
					this._slave.pubertyAgeXY = this._slave.physicalAge + 1;
				}
			} else {
				if (this._slave.physicalAge >= V.potencyAge) {
					this._slave.pubertyXY = 1;
				}
			}
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.AddTesticles());
	}
};
