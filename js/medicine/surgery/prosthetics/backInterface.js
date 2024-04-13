App.Medicine.Surgery.Reactions.BackInterface = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {his} = getPronouns(slave);
		const r = [];

		r.push(`Implanting back sockets and interfacing them with ${his} spinal column is a delicate and invasive procedure <span class="health dec">${his} health has been greatly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BackInterface = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant back interface";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.PBack = 1;
		this._slave.appendages = "none";
		this._slave.appendagesColor = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.BackInterface());
	}
};
