App.Medicine.Surgery.Reactions.EndEjaculation = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his} = getPronouns(slave);
		const r = [];

		r.push(`${His} groin is a little sore, and ${he} examines it closely, but ${he} can't find much difference other than the swelling in ${his} crotch has gone down. ${He}'ll realize later when ${his} next ejaculation is rather underwhelming from what ${he} has become accustomed to. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RemoveEjaculationBooster = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove ejaculation implant";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.prostate = 2;
		return this._assemble(new App.Medicine.Surgery.Reactions.EndEjaculation());
	}
};
