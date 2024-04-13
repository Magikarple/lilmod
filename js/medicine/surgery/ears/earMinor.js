App.Medicine.Surgery.Reactions.EarMinor = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little reaction to ${his} altered ears. The modification surgery is brief, with <span class="health dec">nothing more than minor health effects.</span>`);
		} else if (slave.devotion > 20) {
			if (canSee(slave)) {
				r.push(`${He} looks in the mirror and turns ${his} head side to side admiring ${his} new ears,`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache in ${his} ears that they have been modified,`);
			}
			if (hasAnyArms(slave)) {
				r.push(`they're still a bit sore, but ${he} reaches up to feel them gently,`);
			}
			r.push(`${he} turns to you with a smile, tilting ${his} head at various angles to show them off. ${He} seems to think ${his} new ears are <span class="devotion inc">cute.</span> The modification surgery is brief, with <span class="health dec">nothing more than minor health effects.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new ears skeptically.`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache in ${his} ears that they have been modified.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still a bit sore, but ${he} reaches up to feel them gently.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, so ${he} isn't much affected mentally despite the surprise of having ${his} ears reshaped. The modification surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new ears with disdain.`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache in ${his} ears that they have been modified.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still a bit sore, but ${he} reaches up to feel them gently, as if to confirm it's not some trick.`);
			}
			r.push(`For now, <span class="devotion dec">${he} seems to view ${his} altered ears as a cruel imposition.</span> The modification surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.EarMinorReshape = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} shapeName
	 * @param {FC.EarShape} newShape
	 */
	constructor(slave, shapeName, newShape) {
		super(slave);
		this.shapeName = shapeName;
		this.targetShape = newShape;
	}

	get name() {
		return `Reshape into ${this.shapeName} ears`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.earShape = this.targetShape;
		return this._assemble(new App.Medicine.Surgery.Reactions.EarMinor());
	}
};


App.Medicine.Surgery.Procedures.TopEarsImplantHair = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant hair mimicking fibers";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.earTColor = this._slave.hColor;
		return this._assemble(new App.Medicine.Surgery.Reactions.EarMinor());
	}
};

App.Medicine.Surgery.Procedures.TopEarsRemoveHair = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove fibers";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.earTColor = "hairless";
		return this._assemble(new App.Medicine.Surgery.Reactions.EarMinor());
	}
};

App.Medicine.Surgery.Procedures.OFImplantEars = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return this.originalSlave.earShape === "none" ? "Attach" : "Replace";
	}

	get description() {
		return this.originalSlave.earShape === "none" ? "" : "replace current ears with normal human ears";
	}

	get healthCost() {
		return this.originalSlave.earShape === "none" ? 15 : 20;
	}

	apply(cheat) {
		this._slave.earShape = "normal";
		if (this.originalSlave.earShape === "none") {
			if (this._slave.hears === -1) {
				this._slave.hears = 0;
			}
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.EarMinor());
	}
};

App.Medicine.Surgery.Procedures.OFImplantTopEars = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return this.originalSlave.earT === "none" ? "Attach" : "Replace";
	}

	get description() {
		return this.originalSlave.earT === "none" ? "" : "replace current top ears with normal ears";
	}

	get healthCost() {
		return this.originalSlave.earT === "none" ? 10 : 20;
	}

	apply(cheat) {
		this._slave.earT = "normal";
		this._slave.earTColor = "hairless";
		return this._assemble(new App.Medicine.Surgery.Reactions.EarMinor());
	}
};
