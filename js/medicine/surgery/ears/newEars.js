App.Medicine.Surgery.Reactions.NewEars = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {he, his} = getPronouns(slave);
		const r = [];

		r.push(`The implant surgery is <span class="health dec">invasive</span> and ${he} spends some time in the autosurgery recovering. As soon as the bandages around ${his} ears are removed, ${he}`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`returns to ${his} normal activities, none the wiser.`);
		} else {
			r.push(`initially believes nothing has changed, but soon discovers ${his} hearing is no longer technologically enhanced.`);
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFNewEars = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Replace";
	}

	get description() {
		return "remove cochlear implants before implanting organic cochleae";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.hears = 0;
		this._slave.earImplant = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.NewEars());
	}
};
