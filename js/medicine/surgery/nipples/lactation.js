App.Medicine.Surgery.Reactions.Lactation = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} notices almost immediately that ${his} breasts feel fuller, gasping as milk begins to leak from ${his} nipples. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			if (hasAnyArms(slave)) {
				r.push(`${He} hefts ${his} swollen breasts experimentally and turns to you with a smile to show them off.`);
				if (slave.lactation === 1) {
					r.push(`${His} milk begins to flow as ${he} does, but instead of a slight dribble, it keeps coming.`);
				} else {
					r.push(`As ${he} does, a drop of milk drips from a nipple and ${he} gasps in surprise.`);
				}
				r.push(`${He}'s shocked, but after`);
				if (canTaste(slave)) {
					r.push(`tasting`);
				} else {
					r.push(`licking up`);
				}
				r.push(`${his} own milk experimentally ${he}`);
				if (canSee(slave)) {
					r.push(`looks`);
				} else {
					r.push(`smiles`);
				}
				r.push(`at you shyly and gently teases some more milk out of ${himself}. The resulting stream of cream is bountiful and ${he} giggles happily.`);
			} else {
				r.push(`As you carry ${him} out of the surgery, droplets of milk begin to bud from ${his} nipples, and ${he} giggles giddily.`);
			}
			r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} boobs.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (hasAnyArms(slave)) {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} swollen breasts skeptically.`);
				} else {
					r.push(`${He} is skeptical of the how swollen ${his} breasts feel.`);
				}
				r.push(`${He}'s still sore, so ${he} doesn't touch them. Even so, a drop of milk drips from a nipple and ${he} gasps in surprise.`);
				if (slave.lactation === 1) {
					r.push(`While ${he} was already lactating, it never just flowed freely like this. After`);
				} else {
					r.push(`${He}'s shocked, but after`);
				}
				r.push(`a few experimental pokes and rubs at ${himself} ${he} seems to understand that ${he}'s a lactation slave now, and that's how it is.`);
			} else {
				r.push(`As you carry ${him} out of the surgery, droplets of milk begin to bud from ${his}`);
				if (slave.lactation === 1) {
					r.push(`nipples; ${he} was already lactating, but it never just flowed freely like this.`);
				} else {
					r.push(`nipples.`);
				}
				r.push(`${He}'s shocked, but ${he} seems to understand that ${he}'s a lactation slave now, and that's how it is.`);
			}
			r.push(`${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} swollen breasts`);
			} else {
				r.push(`As ${he} feels the fullness in ${his} breasts, ${his} face fills`);
			}
			r.push(`with resentment. ${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim.`);
			if (slave.lactation === 1) {
				r.push(`As milk begins to bead at ${his} nipples, ${he} breaks down in rage and unhappiness, dripping bitter tears as the flow steadily increases past what ${he} was used to.`);
			} else {
				r.push(`When ${he} finally figures out ${he}'s lactating, ${he} breaks down in rage and unhappiness, dripping milk and bitter tears.`);
			}
			r.push(`For now, <span class="devotion dec">${he} seems to view being a lactation slave as a cruel hardship.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		// Done here to allow for natural lactation into artificial lactation text
		slave.lactation = 2;

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Lactation = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant slow-release pro-lactation drugs";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This may increase ${his} natural breast size`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.lactationDuration = 2;
		this._slave.induceLactation = 0;
		this._slave.boobs -= this._slave.boobsMilk;
		this._slave.boobsMilk = 0;
		this._slave.rules.lactation = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.Lactation());
	}
};
