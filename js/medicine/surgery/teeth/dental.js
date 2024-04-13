App.Medicine.Surgery.Reactions.DentalImplant = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, himself} = getPronouns(slave);
		const r = [];

		r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. ${He}`);
		if (canSee(slave)) {
			r.push(`checks ${himself} in the mirror`);
		} else {
			r.push(`runs ${his} tongue over ${his} teeth`);
		}
		r.push(`repeatedly before accepting that nothing too unusual has happened, and that ${he} now appears to have a fully functional set of normal teeth. Though ${he}'s surprised that nothing outlandish has been done, ${he} carries on as usual. Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.DentalImplant = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Normal dental implants";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.teeth = "normal";
		return this._assemble(new App.Medicine.Surgery.Reactions.DentalImplant());
	}
};
