// cSpell:ignore Detaste

App.Medicine.Surgery.Reactions.Detaste = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The oral surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> In the sterile environment of the autosurgery, ${he}'s unable to notice any impairment to ${his} sense of taste, and so must wait to discover the change when ${he}'s released much later on.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`When ${he} finally figures it out, ${he} begins to cry, not understanding why it's necessary that ${he} be unable to taste. After a few sniffles, ${he} carries on.`);
			} else if (slave.devotion > 20) {
				r.push(`When ${he} finally figures it out, ${he} begins to tear up, not understanding what ${he} did to earn this. After a short expurgation of <span class="trust dec">sadness and fear,</span> ${he} takes a deep breath and suppresses ${his} emotions.`);
				reaction.trust -= 10;
			} else {
				r.push(`When ${he} realizes what's happened, ${his} face <span class="devotion dec">fills with anger.</span> ${He} views this as another pointless way to assert your authority over ${him}. After briefly <span class="trust dec">shuddering with fear</span> at that thought, ${he} morosely returns to ${his} duties.`);
				reaction.trust -= 4;
				reaction.devotion -= 4;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Detaste = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove sense of taste";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.tastes = -1;
		return this._assemble(new App.Medicine.Surgery.Reactions.Detaste());
	}
};

App.Medicine.Surgery.Reactions.Retaste = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The oral surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> In the sterile environment of the autosurgery, ${he}'s unable to notice any improvement to ${his} sense of taste, and so must wait to discover the change when ${he}'s released much later on.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`${He} loved you before, but ${he}'s <span class="devotion inc">still grateful,</span> and maybe even a bit <span class="trust inc">more trusting,</span> too.`);
			} else if (slave.devotion > 20) {
				r.push(`${He} accepted you as ${his} owner before, but ${he}'s <span class="devotion inc">still grateful,</span> and maybe even a bit <span class="trust inc">more trusting,</span> too.`);
			} else {
				r.push(`${He} hardly knows what to make of this present from someone ${he} hates, and questions if the gift conceals some sort of snare. After a while, though, ${he} accepts that you <span class="devotion inc">did help ${him},</span> and, perhaps, <span class="trust inc">might be trustworthy.</span>`);
			}
			reaction.devotion += 15;
			reaction.trust += 15;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Retaste = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Repair sense of taste";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.tastes = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.Retaste());
	}
};
