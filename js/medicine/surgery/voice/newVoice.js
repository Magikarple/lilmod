App.Medicine.Surgery.Reactions.NewVoice = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`The autosurgery instructed ${him} in no uncertain terms not to speak during recovery, but ${he} fails to recall that. ${He} doesn't notice anything different, though.`);
		} else {
			r.push(`Before surgery, ${he} was warned repeatedly not to try talking for a while, and ${he} obeys. When ${he} finally does, ${his} voice is raspy and weak, but as it gradually gains strength ${he} notices that it sounds more natural and human than ${his} old electrolarynx.`);
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFNewVoice = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Replace";
	}

	get description() {
		return "remove electrolarynx and implant organic vocal cords";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.electrolarynx = 0;
		if (this._slave.ovaries === 1 && this._slave.hormoneBalance >= 200) {
			this._slave.voice = 3;
		} else if (this._slave.balls > 0 || this._slave.hormoneBalance < -20) {
			this._slave.voice = 1;
		} else {
			this._slave.voice = 2;
		}

		return this._assemble(new App.Medicine.Surgery.Reactions.NewVoice());
	}
};
