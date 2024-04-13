App.Medicine.Surgery.Reactions.PregRemove = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`${He} leaves the surgery with a certain soreness and minor pain in ${his} lower abdomen, ${he} knows that ${his} days as broodmother are finished.`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY)) {
			r.push(`${He} is <span class="trust dec">filled with despair</span> about missing being swollen with life and rubs ${his} flat belly with <span class="devotion dec">sorrow.</span> Only one fact slightly soothes ${him} and allows ${him} to remain sane — at least ${he} will not become infertile and still can get pregnant naturally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 10;
			reaction.devotion -= 30;
		} else if (slave.devotion > 50) {
			r.push(`${He}'s <span class="devotion inc">grateful</span> that you allowed ${his} body to be free of constant pregnancy stress, and a little nervous about if you will appreciate ${him} enough without such dedication. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He} understands the realities of ${his} life as a slave, so it isn't much of a shock. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
		} else {
			r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> that you can change ${his} body so radically just at your will. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and ${his} now empty womb.`);
			reaction.trust -= 15;
			reaction.devotion -= 15;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RemovePregGenerator = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove the pregnancy generator";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.preg = 0;
		this._slave.pregWeek = -1;
		this._slave.pregSource = 0;
		this._slave.pregKnown = 0;
		this._slave.pregType = 0;
		this._slave.broodmother = 0;
		this._slave.broodmotherFetuses = 0;
		this._slave.broodmotherOnHold = 0;
		this._slave.pregControl = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.PregRemove());
	}
};
