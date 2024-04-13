App.Medicine.Surgery.Reactions.RemoveEyes = class extends App.Medicine.Surgery.SimpleReaction {
	get removeJob() { return true; }

	intro(slave, diff) {
		return [];
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his} = getPronouns(slave);
		const r = [];
		r.push(`Surgery doesn't take long, but since it was invasive there are <span class="health dec">moderate health consequences.</span> As anesthesia wears off ${he} tries to open ${his} eyes and finds`);
		if (!canSee(slave)) {
			r.push(`${he} is unable to.`);
		} else {
			r.push(`only one working.`);
		}
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`When ${he} realizes why, ${he} begins to weep, not understanding what ${he} did to deserve this. After a short cry that trails off into a few sniffles, ${he} carries on.`);
			} else if (slave.devotion > 20) {
				r.push(`When ${he} realizes why, ${he} begins to bawl, not understanding what ${he} did to earn this. After a short expurgation of <span class="trust dec">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions.`);
				reaction.trust -= 20;
			} else {
				r.push(`When ${he} realizes what's happened, ${his} face <span class="devotion dec">clouds with rage.</span> Reflexively, ${he} swings ${his} head around, looking for the source of ${his} woes. ${He} finally understands the true use of blindness when ${he} realizes ${he} won't be able to tell where you are, where anyone is, or even where ${he} is. ${His} well-being is now firmly in the hands of someone ${he} distrusts. ${He} begins to <span class="trust dec">shake with fear.</span>`);
				reaction.trust -= 8;
				reaction.devotion -= 8;
			}
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.RemoveBlindEyes = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {he, His, his} = getPronouns(slave);
		const r = [];
		r.push(`Surgery doesn't take long, but since it was invasive there are <span class="health dec">moderate health consequences.</span> As anesthesia wears off ${he} tries to open ${his} eyes and finds ${he} is unable to.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`When ${he} realizes why, ${he} seems surprised since ${he} doesn't see the point of such procedure. As ${he} was already blind, ${his} mental state remains unaffected.`);
			} else {
				r.push(`${His} face twists in distaste. Such pointless and invasive procedure drives home just how <span class="trust dec">expendable</span> ${he} is to you.`);
				reaction.devotion -= 5;
			}
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};


App.Medicine.Surgery.Procedures.RemoveEyes = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.BodySideAll} side
	 */
	constructor(slave, side) {
		super(slave);
		this.side = side;
	}

	get name() { return `Remove ${this.side} ${this.side === "both" ? "eyes" : "eye"}`; }

	get healthCost() { return 5; }

	apply(cheat) {
		const reaction = getBestVision(this._slave) > 0
			? new App.Medicine.Surgery.Reactions.RemoveEyes()
			: new App.Medicine.Surgery.Reactions.RemoveBlindEyes();
		eyeSurgery(this._slave, this.side, "remove");
		return this._assemble(reaction);
	}
};
