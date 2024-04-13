App.Medicine.Surgery.Reactions.EarGone = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little reaction to ${his} altered ears. Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} is horrified that you would disfigure ${him} but ultimately accepts it since ${he} is devoted to you. Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion >= -20) {
			r.push(`${He} is horrified that you would disfigure ${him}, ${he}'s come to terms with the fact that ${he}'s a slave, but ${he} is still <span class="devotion dec">angry that you would go this far.</span> Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		} else {
			r.push(`${He} is horrified that you would disfigure ${him} and begins to weep openly as soon as ${he} discovers the loss.<span class="devotion dec">${He} seems to consider the loss as a cruel theft.</span> Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 20;
			reaction.devotion -= 20;
		}
		reaction.longReaction.push(r);

		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RemoveEars = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove them";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		surgeryAmp(this._slave, "left ear");
		surgeryAmp(this._slave, "right ear");
		if (this._slave.hears !== -2 && this._slave.earImplant !== 1) {
			this._slave.hears = -1;
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.EarGone());
	}
};

App.Medicine.Surgery.Procedures.RemoveTopEars = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove them";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.earT = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.EarGone());
	}
};
