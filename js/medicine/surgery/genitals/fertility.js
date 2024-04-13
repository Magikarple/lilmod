App.Medicine.Surgery.Reactions.Fertility = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but lacks the mental faculties to realize that ${he} now has a chance to get pregnant. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY) || slave.origin === "$He sold $himself to you in the hope of someday bearing children.") {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he} now has a chance to get pregnant. ${He} is <span class="devotion inc">filled with joy</span> whenever ${he} thinks about the fact that feeling a life growing within ${him} is now, at last, a possibility. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 5;
		} else if (slave.devotion > 50) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he} now has a chance to get pregnant. ${He}'s <span class="devotion inc">grateful</span> that you think ${him} worthy of breeding, and even a little nervous about how ${he}'ll perform as a breeder. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he} may now be impregnated. ${He} understands the realities of ${his} life as a slave, and that being bred was a possibility, so it isn't much of a shock. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to know that it means ${he} may now be impregnated. ${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> at the potential that ${he}'ll be bred. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RestoreFertility = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Restore fertility";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.preg = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.Fertility());
	}
};
