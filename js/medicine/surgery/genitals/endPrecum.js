App.Medicine.Surgery.Reactions.EndPrecum = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {he, His, his, him} = getPronouns(slave);
		const r = [];

		r.push(`${His} groin is a little sore, and ${he} examines it closely, but ${he} can't find much difference. ${His} generous production of precum won't tail off for some time, until the slow-release drugs are completely flushed from ${his} system. Even then, the only real change for ${him} will be a little less inconvenience. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.EndPrecum = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove drug implant";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.prostate = 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.EndPrecum());
	}
};
