App.Medicine.Surgery.Reactions.BreastLift = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`The changes to ${his} breasts are lost on ${him}. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BOOBS)) {
			if (hasAnyArms(slave)) {
				r.push(`${He}'s barely out of the surgery before ${he}'s playing with ${his} new, perkier breasts despite the pain.`);
			} else {
				r.push(`${He}'s barely out of the surgery before ${he}'s rubbing ${his} new, perkier breasts against anything ${he} can reach, despite the pain.`);
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
				r.push(`over ${his} perkier breasts experimentally and turns to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't touch them much, but ${he} turns from side to side to let you see them from all angles.`);
			} else {
				r.push(`${He} bounces a little to feel ${his} perkier tits move before ${he} turns ${his} torso to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't move too violently, but ${he} wiggles ${himself} a little to show off.`);
			}
			r.push(`<span class="devotion inc">${He}'s thrilled that you firmed up ${his} breasts.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new, perkier breasts skeptically.`);
			} else {
				r.push(`The cool air flowing over the new location of ${his} nipples draws a skeptical expression to ${his} face.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} body still.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, but ${he} is <span class="devotion inc">quite happy</span> you'd take the time to make ${his} breasts prettier. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and that this may be only the beginning of extensive breast surgery.`);
			reaction.devotion += 3;
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new, perkier breasts`);
			} else {
				r.push(`The feel of the air running over the new location of ${his} nipples fills ${him}`);
			}
			r.push(`with resentment.`);
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them,`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still,`);
			}
			r.push(`but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}.`);
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. Oddly, <span class="devotion inc">${he} seems to like that ${his} breasts are no longer saggy</span> despite ${his} immediate reaction. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body and fears that this is only the beginning of ${his} breast surgeries.`);
			reaction.trust -= 10;
			reaction.devotion += 2;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BreastLift = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Breast lift";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.boobShape = BreastShape.NORMAL;
		return this._assemble(new App.Medicine.Surgery.Reactions.BreastLift());
	}
};
