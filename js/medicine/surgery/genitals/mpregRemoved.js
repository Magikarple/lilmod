App.Medicine.Surgery.Reactions.MPregRemoved = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, his} = getPronouns(slave);
		const r = [];

		r.push(`${He} notices quickly that ${his} stomach is slightly flatter than before. ${He} ponders this change for a moment, unsure of what to think of this occurrence. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RemoveMPreg = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove anal reproductive organs";
	}

	get healthCost() {
		return 30;
	}

	apply(cheat) {
		this._slave.mpreg = 0;
		this._slave.ovaImplant = OvaryImplantType.NONE;
		this._slave.wombImplant = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.MPregRemoved());
	}
};
