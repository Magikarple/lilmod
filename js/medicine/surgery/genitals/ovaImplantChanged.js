App.Medicine.Surgery.Reactions.OvaImplantChanged = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`It's not immediately apparent to ${him} what kind of surgery ${he} received, since all ${he}'s left with is a terrible nonspecific ache in ${his} lower abdomen.`);
		if (slave.devotion > 50) {
			r.push(`${He}'s <span class="devotion inc">grateful</span> that you think ${him} worthy of surgically modifying. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He} understands the realities of ${his} life as a slave, but didn't expect to undergo a mysterious procedure like this. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> at what you could have possibly done to ${him}. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RemoveOvaImplant = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove implants";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.ovaImplant = OvaryImplantType.NONE;
		return this._assemble(new App.Medicine.Surgery.Reactions.OvaImplantChanged());
	}
};

App.Medicine.Surgery.Procedures.InstallOvaImplant = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.OvaryImplantType} type
	 */
	constructor(slave, type) {
		super(slave);
		this.type = type;
	}

	get name() {
		switch (this.type) {
			case OvaryImplantType.FERTILITY:
				return "Install fertility implants";
			case OvaryImplantType.SYMPATHY:
				return "Install sympathetic ovulation implants";
			default:
				throw new Error("Invalid OvaryImplantType: " + this.type);
		}
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.ovaImplant = this.type;
		return this._assemble(new App.Medicine.Surgery.Reactions.OvaImplantChanged());
	}
};
