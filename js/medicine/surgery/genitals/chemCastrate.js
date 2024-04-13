App.Medicine.Surgery.Reactions.ChemCastrate = class extends App.Medicine.Surgery.SimpleReaction {
	get invasive() {
		return false;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		r.push(`${He} knows something has been done to ${his} testicles, but ${he} can't feel anything off about them. Since the surgery was nothing more than a simple injection, ${he} has been spared any pain.`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.ChemCastrate = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Chemically castrate";
	}

	apply(cheat) {
		this._slave.ballType = "sterile";
		return this._assemble(new App.Medicine.Surgery.Reactions.ChemCastrate());
	}
};
