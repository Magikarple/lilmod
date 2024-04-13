App.Medicine.Surgery.Reactions.Anus = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with a terribly sore rear end and little desire to mess with it. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else {
			if (this._strongKnownFetish(slave, Fetish.BUTTSLUT)) {
				r.push(`${He} leaves the surgery with a terribly sore rear end. ${He} is <span class="devotion inc">filled with joy</span> at the prospect of having a tight butt all over again, so much so that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. If ${he} had much in the way of anal skills, <span class="stat drop">they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
				reaction.trust += 4;
				reaction.devotion += 10;
			} else if (slave.devotion > 50) {
				r.push(`${He} leaves the surgery with a terribly sore rear end. ${He}'s a bit anxious at the prospect of the pain having to get back to a loose asshole the hard way, but ${he}'s <span class="devotion inc">happy</span> that you think ${him} worth the effort of surgical improvement. If ${he} had much in the way of anal skills, <span class="stat drop">they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
				reaction.devotion += 4;
			} else if (slave.devotion >= -20) {
				r.push(`${He} leaves the surgery with a terribly sore rear end. ${He} knows ${he}'ll have to endure the pain of being fucked in a tight asshole again soon enough, but trepidation is nothing new for ${him}. If ${he} had much in the way of anal skills, <span class="stat drop">they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
				reaction.trust -= 5;
			} else {
				r.push(`${He} leaves the surgery with a terribly sore rear end. ${He}'s <span class="devotion dec">horrified</span> at surgical alteration of ${his} rear end, and knows that this means that ${he}'ll have to take the pain of sodomy in a tight ass all over again. If ${he} had much in the way of anal skills, <span class="stat drop">they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} most intimate parts.`);
				reaction.trust -= 10;
				reaction.devotion -= 5;
			}
			if (slave.skill.anal > 10) {
				slave.skill.anal -= 10;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RepairAnus = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Repair asshole";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will reduce ${his} anal skills`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.anus = 3;
		return this._assemble(new App.Medicine.Surgery.Reactions.Anus());
	}
};

App.Medicine.Surgery.Procedures.TightenAnus = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Tighten asshole";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will reduce ${his} anal skills`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.anus = 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.Anus());
	}
};

App.Medicine.Surgery.Procedures.RestoreAnalVirginity = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Restore anal virginity";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will reduce ${his} anal skills`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.anus = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.Anus());
	}
};
