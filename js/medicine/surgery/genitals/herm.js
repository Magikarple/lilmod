App.Medicine.Surgery.Reactions.Herm = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const {he: heP} = getPronouns(V.PC);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`Surprisingly, ${he} already realized while exiting that ${his} genitalia has been heavily augmented. The reasons why are lost to ${him}, though. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} already realized while exiting that ${his} genitalia has been heavily augmented. ${He}'s almost beside ${himself} with joy: ${he} now has three holes for ${his} beloved ${getWrittenTitle(slave)} to fuck, and ${heP} even allowed ${him} to retain ${his} dick! <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 10;
		} else if (slave.devotion > 20) {
			r.push(`${He} already realized while exiting that ${his} genitalia has been heavily augmented. ${His} efforts to cope with this radical development are palpable. ${He} retains ${his} penis, to ${his} considerable surprise; and ${he} also has a pussy. ${He} hardly knows what to think or who to be. <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else {
			r.push(`${He} already realized while exiting that ${his} genitalia has been heavily augmented. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> ${He} is not as angry as ${he} might otherwise have been, since you left ${him} ${his} dick, but ${he} has a hole where there was none before. ${He} views it with hatred and revulsion. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Herm = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Create surgical hermaphrodite";
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.vagina = 0;
		this._slave.skill.vaginal = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.Herm());
	}
};
