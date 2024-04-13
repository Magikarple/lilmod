App.Medicine.Surgery.Reactions.TailInterface = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {his} = getPronouns(slave);
		const r = [];

		r.push(`Implanting a tail socket and interfacing it with ${his} spinal column is delicate and invasive procedure <span class="health dec">${his} health has been greatly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.TailInterface = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant interface";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.PTail = 1;
		this._slave.tail = "none";
		this._slave.tailColor = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.TailInterface());
	}
};
