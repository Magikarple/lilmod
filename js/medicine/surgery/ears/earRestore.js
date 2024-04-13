App.Medicine.Surgery.Reactions.EarRestore = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, his} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little reaction to ${his} altered ears. Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else { // TODO: Will expand in future
			r.push(`${He} is delighted to have ${his} ears back. Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};


App.Medicine.Surgery.Procedures.EarRestore = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return this._slave.earShape === "damaged" ? "Repair" : "Restore to normal";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.earShape = "normal";
		return this._assemble(new App.Medicine.Surgery.Reactions.EarRestore());
	}
};

