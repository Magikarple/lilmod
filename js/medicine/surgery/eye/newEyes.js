App.Medicine.Surgery.Reactions.NewEyes = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The implant surgery is <span class="health dec">invasive</span> and ${he} spends some time in the autosurgery recovering. As soon as ${he} is allowed to open ${his} eyes and look around, ${he} notices nothing has changed; though the next time ${he} looks in the mirror, ${he}'ll see a pair of familiar ${App.Desc.eyesColor(slave)} peering back at ${him}.`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFNewEyes = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {"left"|"right"} side
	 */
	constructor(slave, side) {
		super(slave);
		this._side = side;
	}

	get name() {
		return getLeftEyeType(this.originalSlave) === 2 ? "Replace" : "Implant";
	}

	get description() {
		return getLeftEyeType(this.originalSlave) === 2 ? "replace the existing ocular implant with an organic eye" : "";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		eyeSurgery(this._slave, this._side, "normal");
		return this._assemble(new App.Medicine.Surgery.Reactions.NewEyes());
	}
};
