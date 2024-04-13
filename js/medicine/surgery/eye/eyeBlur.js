App.Medicine.Surgery.Reactions.EyeBlur = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		r.push(`The laser eye surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> As soon as ${he} is allowed to open ${his} eyes and look around, ${he} begins to glance back and forth frantically, not immediately understanding that this blurred world is ${his} new reality.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`When ${he} finally figures it out, ${he} begins to weep, not understanding why it's necessary that ${he} not be able to see clearly. After a short cry that trails off into a few sniffles, ${he} carries on.`);
			} else if (slave.devotion > 20) {
				r.push(`When ${he} finally figures it out, ${he} begins to bawl, not understanding what ${he} did to earn this. After a short expurgation of <span class="trust dec">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions.`);
				reaction.trust -= 5;
			} else {
				r.push(`When ${he} realizes what's happened, ${his} face <span class="devotion dec">clouds with rage.</span> Reflexively, ${he} begins to peer around, looking for the source of ${his} woes. ${He} finally understands the true import of blurred vision when ${he} has trouble telling if anyone's close, and begins to <span class="trust dec">shake with fear.</span>`);
				reaction.trust -= 10;
				reaction.devotion -= 10;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.EyeBlur = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.BodySideAll} side
	 */
	constructor(slave, side) {
		super(slave);
		this.side = side;
	}

	get name() { return `Blur ${this.side} ${this.side === "both" ? "eyes" : "eye"}`; }

	get healthCost() { return 5; }

	apply(cheat) {
		eyeSurgery(this._slave, this.side, "blur");
		return this._assemble(new App.Medicine.Surgery.Reactions.EyeBlur());
	}
};
