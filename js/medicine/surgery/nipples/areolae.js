App.Medicine.Surgery.Reactions.Areolae = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little reaction to ${his} altered nipples. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BOOBS)) {
			if (hasAnyArms(slave)) {
				r.push(`${He}'s barely out of the surgery before ${he}'s playing with ${his} new nipples despite the pain.`);
			} else {
				r.push(`${He}'s barely out of the surgery before ${he}'s rubbing ${his} new nipples against anything ${he} can reach, despite the pain.`);
			}
			r.push(`${He}'s <span class="devotion inc">deliriously happy</span> with your changes to what ${he} thinks of as ${his} primary sexual organs, so much so that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 4;
		} else if (slave.devotion > 50) {
			if (hasAnyArms(slave)) {
				r.push(`${He} runs a finger over ${his} new nipples experimentally and turns to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't touch them much, but ${he} turns from side to side to let you see them from all angles.`);
			} else {
				r.push(`${He} bounces a little to feel the new nipples capping ${his} tits turns ${his} torso to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't move too violently, but ${he} wiggles ${himself} a little to show off.`);
			}
			r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} nipples.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new nipples skeptically.`);
			} else {
				r.push(`The cool air flowing over ${his} new nipples draws a skeptical expression to ${his} face.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} body still.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, so ${he} isn't much affected mentally despite the surprise of having ${his} nipples reshaped. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new nipples`);
			} else {
				r.push(`The feel of the air running over ${his} new nipples fills ${him}`);
			}
			r.push(`with resentment.`);
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them,`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} body still,`);
			}
			r.push(`but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}.`);
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view ${his} altered nipples as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RestoreNipples = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Restore their shape and function";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.nipples = NippleShape.HUGE;
		return this._assemble(new App.Medicine.Surgery.Reactions.Areolae());
	}
};


App.Medicine.Surgery.Procedures.ReshapeAreolae = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} areolaeShape
	 */
	constructor(slave, areolaeShape) {
		super(slave);
		this.areolaeShape = areolaeShape;
	}

	get name() {
		if (this.areolaeShape === "circle") {
			return "Normal";
		}
		return capFirstChar(`${this.areolaeShape}-shaped`);
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		if (this._slave.areolaeShape === "circle") {
			this._slave.areolae -= 1;
		}
		this._slave.areolaeShape = this.areolaeShape;
		return this._assemble(new App.Medicine.Surgery.Reactions.Areolae());
	}
};


App.Medicine.Surgery.Procedures.ResizeAreolae = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} aeroleaDelta resize by how much, may be negative
	 */
	constructor(slave, aeroleaDelta) {
		super(slave);
		this.aeroleaDelta = aeroleaDelta;
	}

	get name() {
		if (this.aeroleaDelta < 0) {
			return "Reduce areolae";
		} else {
			return "Enlarge areolae";
		}
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.areolae += this.aeroleaDelta;
		return this._assemble(new App.Medicine.Surgery.Reactions.Areolae());
	}
};
