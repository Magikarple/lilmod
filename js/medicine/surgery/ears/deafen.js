App.Medicine.Surgery.Reactions.Deafen = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his} = getPronouns(slave);
		const r = [];

		r.push(`The inner ear surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> As soon as the bandages around ${his} ears are removed, ${he} begins to twist and turn ${his} head frantically, not immediately understanding that this silence is ${his} new reality.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`When ${he} finally figures it out, ${he} begins to weep, not understanding why it's necessary that ${he} be unable to hear. After a short cry that trails off into a few sniffles, ${he} carries on.`);
			} else if (slave.devotion > 20) {
				r.push(`When ${he} finally figures it out, ${he} begins to bawl, not understanding what ${he} did to earn this. After a short expurgation of <span class="trust dec">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions.`);
				reaction.trust -= 20;
			} else {
				r.push(`When ${he} realizes what's happened, ${his} face <span class="devotion dec">clouds with rage.</span> ${He} begins to peer around, looking for the source of ${his} woes. ${He} finally understands the true use of deafness when ${he} realizes ${he} won't be able to easily tell where you are, or anyone else is for that matter. ${His} well-being is now firmly in the hands of someone ${he} distrusts. ${He} begins to <span class="trust dec">shake with fear.</span>`);
				reaction.trust -= 8;
				reaction.devotion -= 8;
			}
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Deafen = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Deafen";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.hears = -2;
		return this._assemble(new App.Medicine.Surgery.Reactions.Deafen());
	}
};
