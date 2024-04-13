App.Medicine.Surgery.Reactions.Blind = class extends App.Medicine.Surgery.SimpleReaction {
	get removeJob() { return true; }

	intro(slave, diff) {
		return [];
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his} = getPronouns(slave);
		const r = [];
		r.push(`The laser eye surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> As soon as ${he} is allowed to open ${his} eyes and look around, ${he} begins to glance back and forth frantically,`);
		if (!canSee(slave)) {
			r.push(`not immediately understanding that this darkness is ${his} new reality.`);
		} else {
			r.push(`quickly noticing ${his} degraded vision.`);
		}
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`When ${he} finally figures it out, ${he} begins to weep, not understanding why it's necessary that ${he} be unable to see. After a short cry that trails off into a few sniffles, ${he} carries on.`);
			} else if (slave.devotion > 20) {
				r.push(`When ${he} finally figures it out, ${he} begins to bawl, not understanding what ${he} did to earn this. After a short expurgation of <span class="trust dec">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions.`);
				reaction.trust -= 20;
			} else {
				r.push(`When ${he} realizes what's happened, ${his} face <span class="devotion dec">clouds with rage.</span> Reflexively, ${he} begins to peer around, looking for the source of ${his} woes. ${He} finally understands the true use of blindness when ${he} realizes ${he} won't be able to tell where you are, where anyone is, or even where ${he} is. ${His} well-being is now firmly in the hands of someone ${he} distrusts. ${He} begins to <span class="trust dec">shake with fear.</span>`);
				reaction.trust -= 8;
				reaction.devotion -= 8;
			}
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Blind = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.BodySideAll} side
	 */
	constructor(slave, side) {
		super(slave);
		this.side = side;
	}

	get name() { return `Blind ${this.side} ${this.side === "both" ? "eyes" : "eye"}`; }

	get healthCost() { return 5; }

	apply(cheat) {
		eyeSurgery(this._slave, this.side, "blind");
		return this._assemble(new App.Medicine.Surgery.Reactions.Blind());
	}
};
