App.Medicine.Surgery.Reactions.BellyOut = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		r.push(`${He} notices almost immediately that the weight in ${his} middle is gone. ${He} shifts ${his} torso idly; it looks like ${he} doesn't know what to think about having ${his} belly implant removed. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BellyOut = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove implant";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.bellyImplant = -1;
		this._slave.cervixImplant = 0;
		SetBellySize(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.BellyOut());
	}
};
