App.Medicine.Surgery.Reactions.FreshOvaries = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.ovaryAge >= 45 && this._hasEmotion(slave)) {
			if (this._strongKnownFetish(slave, Fetish.PREGNANCY) || slave.origin === "$He sold $himself to you in the hope of someday bearing children.") {
				r.push(`${He} leaves the surgery with nothing but a nonspecific ache, yet a familiar warmth, in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he} now has a chance to get pregnant once more. ${He} is <span class="devotion inc">filled with joy</span> whenever ${he} thinks about the fact that ${he}'ll have the chance to feel a life growing within ${him} again. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
				reaction.trust += 4;
				reaction.devotion += 5;
			} else if (slave.devotion > 50) {
				r.push(`${He} leaves the surgery with nothing but a nonspecific ache, yet a familiar warmth, in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he} now has the chance to get pregnant again. ${He}'s <span class="devotion inc">grateful</span> that you think ${him} worthy of extending ${his} fertility, and even a little nervous about how ${he}'ll perform as a mother that has tasted menopause. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
				reaction.devotion += 4;
			} else if (slave.devotion >= -20) {
				r.push(`${He} leaves the surgery with nothing but a nonspecific ache, yet a familiar warmth, in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he} may now be impregnated once more. ${He} understands the realities of ${his} life as a slave, but didn't expect to have ${his} waning fertility renewed. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
				reaction.trust -= 5;
			} else {
				r.push(`${He} leaves the surgery with nothing but a nonspecific ache, yet a familiar warmth, in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to believe you have forced fertility upon ${him} again. ${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> at the potential that ${he}'ll be forced to carry children. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
				reaction.trust -= 5;
				reaction.devotion -= 5;
			}
		} else {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen; it won't be clear to ${him} that menopause is not a concern for now. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFFreshOvaries = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.ovaryAge = Math.clamp(this._slave.ovaryAge - 2, 0, 45);
		if (this._slave.preg < -1) {
			this._slave.preg = 0;
		}
		if (this._slave.pubertyXX === 0 && this._slave.physicalAge >= V.fertilityAge) {
			if (V.precociousPuberty === 1) {
				this._slave.pubertyAgeXX = this._slave.physicalAge + 1;
			} else {
				this._slave.pubertyXX = 1;
			}
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.FreshOvaries());
	}
};
