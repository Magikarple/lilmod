App.Medicine.Surgery.Reactions.Womb = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`It's not immediately apparent to ${him} what kind of surgery ${he} received, since all ${he}'s left with is a terrible nonspecific ache in ${his} lower belly. As with all invasive surgery <span class="health dec">${his} health has been greatly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.InstallMesh = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Install reinforcing organic mesh";
	}

	get healthCost() {
		return 25;
	}

	apply(cheat) {
		this._slave.wombImplant = "restraint";
		return this._assemble(new App.Medicine.Surgery.Reactions.Womb());
	}
};

App.Medicine.Surgery.Procedures.RemoveMesh = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove organic mesh";
	}

	get description() {
		return this.originalSlave.health.health < 0 ? `This may cause severe health issues` : "";
	}

	get healthCost() {
		return 50;
	}

	apply(cheat) {
		this._slave.wombImplant = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.Womb());
	}
};
