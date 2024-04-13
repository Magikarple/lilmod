App.Medicine.Surgery.Reactions.BreastReconstruction = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`The changes to ${his} breasts are lost on ${him}. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BOOBS)) {
			if (hasAnyArms(slave)) {
				r.push(`${He}'s barely out of the surgery before ${he}'s playing with ${his} new, ${slave.boobShape} breasts despite the pain.`);
			} else {
				r.push(`${He}'s barely out of the surgery before ${he}'s rubbing ${his} new, ${slave.boobShape} breasts against anything ${he} can reach, despite the pain.`);
			}
			r.push(`${He}'s <span class="devotion inc">deliriously happy</span> with your changes to what ${he} thinks of as ${his} primary sexual organs, so much so that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 4;
		} else if (slave.devotion > 50) {
			if (hasAnyArms(slave)) {
				r.push(`${He} runs ${his}`);
				if (hasBothArms(slave)) {
					r.push(`hands`);
				} else {
					r.push(`hand`);
				}
				r.push(`over ${his} ${slave.boobShape} breasts experimentally and turns to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't touch them much, but ${he} turns from side to side to let you see them from all angles.`);
			} else {
				r.push(`${He} bounces a little to feel ${his} ${slave.boobShape} tits move before ${he} turns ${his} torso to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't move too violently, but ${he} wiggles ${himself} a little to show off.`);
			}
			r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} breasts.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new, ${slave.boobShape} breasts skeptically.`);
			} else {
				r.push(`The cool air flowing over the new location of ${his} nipples draws a skeptical expression to ${his} face.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} body still.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, so ${he} isn't much affected mentally despite the surprise of having ${his} breasts reshaped. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new, ${slave.boobShape} breasts`);
			} else {
				r.push(`The feel of the air running over the new location of ${his} nipples fills ${him}`);
			}
			r.push(`with resentment.`);
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them,`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} body still,`);
			}
			r.push(`but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}.`);
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view ${his} altered breasts as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BreastReconstruction = class extends App.Medicine.Surgery.Procedure {
	/**
	 *
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.BreastShape} boobShape
	 */
	constructor(slave, boobShape) {
		super(slave);
		this._boobShape = boobShape;
	}

	get name() {
		switch (this._boobShape) {
			case BreastShape.TORPEDO:
				return "Make them torpedo-shaped";
			case BreastShape.PERKY:
				return "Reshape them to be perkier";
			case BreastShape.NORMAL:
				return "Reshape them to be more normal";
		}
		return "Invalid boobShape: " + this._boobShape;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.boobShape = this._boobShape;
		return this._assemble(new App.Medicine.Surgery.Reactions.BreastReconstruction());
	}
};
