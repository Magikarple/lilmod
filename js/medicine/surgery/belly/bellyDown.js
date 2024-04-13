App.Medicine.Surgery.Reactions.BellyDown = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} lighter belly with appreciation.`);
			} else {
				r.push(`${He} attempts to shift ${himself}, only to find ${his} middle is not as heavy as before.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch it.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
			}
			r.push(`${He} can't why it is smaller now. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			if (hasAnyArms(slave)) {
				r.push(`${He} hefts ${his} lighter belly experimentally and turns to you with a smile to show off ${his} new, slimmer form. ${He}'s still sore, so ${he} doesn't bounce or stretch, but ${he} turns from side to side to let you see it from all angles.`);
			} else {
				r.push(`${He} bounces a little to feel the change in weight within ${his} middle and turns ${his} torso to you with a smile to show is off. ${He}'s still sore, so ${he} doesn't bounce too much.`);
			}
			r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} body</span> and <span class="trust inc">trusts</span> that your looking out for ${his} ability to serve you. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 3;
			reaction.trust += 3;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} lighter belly with appreciation.`);
			} else {
				r.push(`${He} attempts to shift ${himself}, only to find ${his} middle is not as heavy as before.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch it.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, but ${he} expected something other than this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust inc">thankful</span> that you removed some weight off ${his} body.`);
			reaction.trust += 2;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} lighter belly with relief.`);
			} else {
				r.push(`${He} attempts to shift ${himself}, only to find ${his} middle is not as heavy as before.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch it, but ${he} breathes easier without the extra weight in ${him}.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still, but ${he} breathes easier without the extra weight in ${him}.`);
			}
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion inc">${he} seems appreciative of this literal weight lifted from ${him}.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.devotion += 1;
			reaction.trust -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BellyDown = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Drain implant";
	}

	get healthCost() {
		return 5;
	}

	apply(cheat) {
		this._slave.bellyImplant = Math.max(this._slave.bellyImplant - 200, 0);
		SetBellySize(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.BellyDown());
	}
};

App.Medicine.Surgery.Procedures.BellyDownLarge = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Greatly drain implant";
	}

	get healthCost() {
		return 5;
	}

	apply(cheat) {
		this._slave.bellyImplant -= 500;
		SetBellySize(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.BellyDown());
	}
};
