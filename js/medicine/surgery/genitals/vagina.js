App.Medicine.Surgery.Reactions.Vagina = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with a terribly sore pussy and little desire to mess with it. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else {
			if (slave.energy > 95) {
				r.push(`${He} leaves the surgery with a terribly sore pussy. ${He} is <span class="devotion inc">filled with joy</span> at the prospect of having a tight cunt again, so much so that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. If ${he} had much in the way of vanilla sex skills, <span class="stat drop">they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
				reaction.trust += 4;
				reaction.devotion += 10;
			} else if (slave.devotion > 50) {
				r.push(`${He} leaves the surgery with a terribly sore pussy. ${He}'s <span class="devotion inc">happy</span> that you think ${him} worth the effort of surgical improvement, and a little excited to feel like ${he}'s a girl again. If ${he} had much in the way of vanilla sex skills, <span class="stat drop">they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
				reaction.devotion += 4;
			} else if (slave.devotion >= -20) {
				r.push(`${He} leaves the surgery with a terribly sore pussy. ${He}'s somewhat revolted by the surgery, but as far as ${he}'s concerned, the short recovery period will mean a time during which ${he} can be sure no one will use ${his} pussy. If ${he} had much in the way of vanilla sex skills, <span class="stat drop">they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
				reaction.trust -= 5;
			} else {
				r.push(`${He} leaves the surgery with a terribly sore pussy. ${He}'s <span class="devotion dec">horrified</span> at surgical alteration of ${his} womanhood; this is probably more of an invasion than ${he} could readily imagine before today. If ${he} had much in the way of vanilla sex skills, <span class="stat drop">they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} most intimate parts.`);
				reaction.trust -= 10;
				reaction.devotion -= 5;
			}
			if (slave.skill.vaginal > 10) {
				slave.skill.vaginal -= 10;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RepairVagina = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Repair pussy";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will reduce ${his} vaginal skills`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.vagina = 3;
		return this._assemble(new App.Medicine.Surgery.Reactions.Vagina());
	}
};

App.Medicine.Surgery.Procedures.TightenVagina = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Tighten pussy";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will reduce ${his} vaginal skills`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.vagina = 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.Vagina());
	}
};

App.Medicine.Surgery.Procedures.RestoreVirginity = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Restore virginity";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will reduce ${his} vaginal skills`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.vagina = 0;
		this._slave.counter.reHymen = this._slave.counter.reHymen ? this._slave.counter.reHymen + 1 : 1;
		this._slave.trueVirgin = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.Vagina());
	}
};
