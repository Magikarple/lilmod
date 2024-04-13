App.Medicine.Surgery.Reactions.BellyUp = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const heGlaresDaggers = canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`;
		const r = [];

		if (slave.bellyImplant >= 10000 && slave.bellyImplant < 12000) {
			r.push(`${His} bellybutton has become an outie from the size of the implant within ${him}.`);
		}
		if (slave.bellyPain === 1) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} expanded belly`);
				} else {
					r.push(`${He} shifts ${his} expanded belly`);
				}
				r.push(`skeptically.`);
				if (hasAnyArms(slave)) {
					r.push(`${He}'s still sore, so ${he} doesn't touch it.`);
				} else {
					r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
				}
				r.push(`${He} doesn't understand why it has gotten larger either. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			} else if (slave.devotion > 50) {
				if (hasAnyArms(slave)) {
					r.push(`${He} runs ${his} fingers over ${his} expanded belly experimentally and turns to you with a smile to show it off. ${He}'s still sore, so ${he} doesn't bounce or stretch, but ${he} turns from side to side to let you see it from all angles.`);
				} else {
					r.push(`${He} bounces a little to feel the weight in ${his} expanded middle and turns ${his} torso to you with a smile to show it off. ${He}'s still sore, so ${he} doesn't move too much, but ${he} wiggles ${himself} a little to make it move for you.`);
				}
				r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} body.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
				reaction.devotion += 4;
			} else if (slave.devotion >= -20) {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} expanded belly`);
				} else {
					r.push(`${He} shifts ${his} expanded belly`);
				}
				r.push(`skeptically.`);
				if (hasAnyArms(slave)) {
					r.push(`${He}'s still sore, so ${he} doesn't touch it.`);
				} else {
					r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
				}
				r.push(`${He}'s come to terms with the fact that ${he}'s a slave, so ${he} expected something like this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
				reaction.trust -= 5;
			} else {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} expanded belly`);
				} else {
					r.push(`The new weight on ${his} midriff fills ${him}`);
				}
				r.push(`with resentment.`);
				if (hasAnyArms(slave)) {
					r.push(`${He}'s still sore, so ${he} doesn't touch it, but ${heGlaresDaggers}.`);
				} else {
					r.push(`${He}'s still sore, so ${he} keeps ${his} torso still, but ${heGlaresDaggers}.`);
				}
				r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this rounded belly as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
				reaction.trust -= 10;
				reaction.devotion -= 5;
			}
		} else if (slave.bellyPain === 2) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} painfully expanded belly`);
				} else {
					r.push(`${He} shifts ${his} painfully expanded belly`);
				}
				r.push(`skeptically.`);
				if (hasAnyArms(slave)) {
					r.push(`${He}'s extremely sore, so ${he} doesn't touch it.`);
				} else {
					r.push(`${He}'s still extremely sore, so ${he} keeps ${his} torso still.`);
				}
				r.push(`${He} can't understand how it has grown so much so fast. Since ${his} body has been pushed beyond its limits, <span class="health dec">${his} health has been notably affected.</span>`);
			} else if (slave.devotion > 50) {
				if (hasAnyArms(slave)) {
					r.push(`${He} gingerly runs ${his} fingers over ${his} painfully expanded belly and turns to you to show it off. ${He}'s extremely sore, so ${he} doesn't bounce or stretch, but ${he} tries to turn from side to side to let you see it from all angles.`);
				} else {
					r.push(`${He} is so sore, ${he} doesn't dare move the weight in ${his} expanded middle, but ${he} turns ${his} torso to you to show it off. ${He} stomachs the pain and wiggles ${himself} a little to make it move for you.`);
				}
				r.push(`<span class="devotion inc">${He}'s certain ${he}'ll be happy with your changes to ${his} body</span> once the pain subsides. Since ${his} body has been pushed beyond its limits, <span class="health dec">${his} health has been notably affected.</span>`);
				reaction.devotion += 2;
			} else if (slave.devotion >= -20) {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} painfully expanded belly`);
				} else {
					r.push(`${He} shifts ${his} painfully expanded belly`);
				}
				r.push(`skeptically.`);
				if (hasAnyArms(slave)) {
					r.push(`${He}'s extremely sore, so ${he} doesn't touch it.`);
				} else {
					r.push(`${He}'s still extremely sore, so ${he} keeps ${his} torso still.`);
				}
				r.push(`${He}'s come to terms with the fact that ${he}'s a slave, so ${he} expected something like this when ${he} was sent to the surgery. ${He} isn't much affected mentally. Since ${his} body has been pushed beyond its limits, <span class="health dec">${his} health has been notably affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
				reaction.trust -= 7;
			} else {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} painfully expanded belly`);
				} else {
					r.push(`The new, painful weight on ${his} midriff fills ${him}`);
				}
				r.push(`with resentment.`);
				if (hasAnyArms(slave)) {
					r.push(`${He}'s still extremely sore, so ${he} doesn't touch it, but ${heGlaresDaggers}.`);
				} else {
					r.push(`${He}'s still extremely sore, so ${he} keeps ${his} torso still, but ${heGlaresDaggers}.`);
				}
				r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this rounded belly as a terribly cruel imposition.</span> Since ${his} body has been pushed beyond its limits, <span class="health dec">${his} health has been notably affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
				reaction.trust -= 12;
				reaction.devotion -= 7;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BellyUp = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Add inert filler";
	}

	get description() {
		return this.originalSlave.bellyPain && this.originalSlave.health.health < 0 ? "This may cause severe health issues" : "";
	}

	get healthCost() {
		return this.originalSlave.bellyPain ? 30 : 10;
	}

	apply(cheat) {
		this._slave.bellyImplant += 200;
		this._slave.bellyPain += 1;
		SetBellySize(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.BellyUp());
	}
};

App.Medicine.Surgery.Procedures.BellyUpLarge = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Add a considerable amount of inert filler";
	}

	get description() {
		return this.originalSlave.bellyPain && this.originalSlave.health.health < 0 ? "This may cause severe health issues" : "";
	}

	get healthCost() {
		return this.originalSlave.bellyPain ? 40 : 20;
	}

	apply(cheat) {
		this._slave.bellyImplant += 500;
		this._slave.bellyPain += 1;
		SetBellySize(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.BellyUp());
	}
};
