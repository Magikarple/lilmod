App.Medicine.Surgery.Reactions.EarMuffle = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`The inner ear surgery is brief, with <span class="health dec">nothing more than minor health effects.</span> As soon as ${he} is allowed to open ${his} eyes and look around, ${he} begins to glance back and forth frantically, not immediately understanding that this muffled world is ${his} new reality.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`When ${he} finally figures it out, ${he} begins to weep, not understanding why it's necessary that ${he} not be able to hear clearly. After a short cry that trails off into a few sniffles, ${he} carries on.`);
			} else if (slave.devotion > 20) {
				r.push(`When ${he} finally figures it out, ${he} begins to bawl, not understanding what ${he} did to earn this. After a short expurgation of <span class="trust dec">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions.`);
				reaction.trust -= 5;
			} else {
				r.push(`When ${he} realizes what's happened, ${his} face <span class="devotion dec">clouds with rage.</span> Reflexively, ${he} begins to peer around, looking for the source of ${his} woes. ${He} finally understands the true import of muffled hearing when your hands grab ${him} from behind, and begins to <span class="trust dec">shake with fear.</span>`);
				reaction.trust -= 10;
				reaction.devotion -= 10;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.EarMuffle = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Muffle hearing";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.hears = -1;
		return this._assemble(new App.Medicine.Surgery.Reactions.EarMuffle());
	}
};
