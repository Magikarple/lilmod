App.Medicine.Surgery.Reactions.Vasectomy = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his} = getPronouns(slave);
		const r = [];

		r.push(`${His} groin is a little sore, and ${he} examines it closely, but ${he} can't find much difference. ${He} likely won't realize what happened${(slave.ballType === "sterile") ? ` given that ${he} couldn't get girls pregnant in the first place` : `, but may piece things together when ${he} realizes the girls ${he} fucks never get pregnant`}. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.VasectomyUndo = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his} = getPronouns(slave);
		const r = [];

		r.push(`${His} groin is a little sore, and ${he} examines it closely, but ${he} can't find much difference. ${He} likely won't ever realize what happened`);
		if (slave.ballType === "sterile") {
			r.push(`since ${his} balls don't work in the first place.`);
		} else {
			r.push(`until ${he} gets a girl pregnant.`);
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Vasectomy = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return `Clamp vas deferens ${this.originalSlave.ballType === "sterile" ? "" : "to cull potency"}`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.vasectomy = 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.Vasectomy());
	}
};

App.Medicine.Surgery.Procedures.VasectomyUndo = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Reverse vasectomy";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.vasectomy = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.VasectomyUndo());
	}
};
