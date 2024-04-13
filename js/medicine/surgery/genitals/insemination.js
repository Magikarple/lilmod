App.Medicine.Surgery.Reactions.Insemination = class extends App.Medicine.Surgery.SimpleReaction {
	/**
	 * @param {FC.HumanState} seedSource
	 */
	constructor(seedSource) {
		super();
		this.seedSource = seedSource;
	}

	get invasive() {
		return false;
	}

	get permanentChanges() {
		return false;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY)) {
			if (canSee(slave)) {
				r.push(`Since the surgery required only a local anesthetic, ${he} remained fully aware throughout the procedure. From the selection of the sperm, to its introduction to ${his} waiting ${(slave.pregType > 1) ? `eggs` : `egg`}, ${he} was eagerly watching.`);
			} else {
				r.push(`${He} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
			}
			r.push(`${He} is <span class="devotion inc">filled with joy</span> over the life settling into ${his} womb and can't wait to see the result. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body.`);
			reaction.trust += 4;
			reaction.devotion += 10;
		} else if (slave.devotion > 50) {
			if (canSee(slave)) {
				r.push(`Since the surgery required only a local anesthetic, ${he} remained fully aware throughout the procedure. From the selection of the sperm, to its delivery into ${his} womb, ${he} was watching with rapt attention.`);
			} else {
				r.push(`${He} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
			}
			r.push(`${He}'s <span class="devotion inc">grateful</span> that you think ${him} worthy of carrying`);
			if (this.seedSource === V.PC) {
				r.push(`your`);
			} else {
				r.push(`${this.seedSource.slaveName}'s`);
			}
			r.push(`${(slave.pregType > 1) ? `children` : `child`}, and a little nervous about how ${he}'ll perform as a mother.`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`Since the surgery required only a local anesthetic, ${he} remained fully aware throughout the procedure. From the selection of the sperm, to its delivery into ${his} womb and ${his} subsequent impregnation, ${he} couldn't look away.`);
			} else {
				r.push(`${He} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
			}
			r.push(`${He} understands the realities of ${his} life as a slave, so it isn't much of a shock. ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
		} else {
			if (canSee(slave)) {
				r.push(`Since the surgery required only a local anesthetic, ${he} remained fully aware throughout the procedure. The moment ${he} realized what was happening, ${he} shut ${his} eyes tight, only opening them again as ${he} feels the slight tingle of the injector exiting ${his} lower abdomen.`);
			} else {
				r.push(`${He} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
			}
			r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> that you have forced ${him} to become a mother, even more so as ${he} realizes ${he} doesn't know who the father is. ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and the future of the life ${he} now harbors within ${him}.`);
			reaction.trust -= 15;
			reaction.devotion -= 15;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Insemination = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} name
	 * @param {FC.HumanState} seedSource
	 */
	constructor(slave, name, seedSource) {
		super(slave);
		this._name = name;
		this.seedSource = seedSource;
	}

	get name() {
		return this._name;
	}

	apply(cheat) {
		this._slave.preg = 1;
		this._slave.pregType = setPregType(this._slave);
		this._slave.pregWeek = 1;
		this._slave.pregKnown = 1;
		this._slave.pregSource = this.seedSource.ID;
		WombImpregnate(this._slave, this._slave.pregType, this._slave.pregSource, 1);
		return this._assemble(new App.Medicine.Surgery.Reactions.Insemination(this.seedSource));
	}
};

App.Medicine.Surgery.Procedures.InseminationFromStored = class extends App.Medicine.Surgery.Procedures.Insemination {
	apply(cheat) {
		V.PC.counter.storedCum--;
		return super.apply(cheat);
	}
};
