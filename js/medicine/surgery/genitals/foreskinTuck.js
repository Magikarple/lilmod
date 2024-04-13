App.Medicine.Surgery.Reactions.ForeskinTuck = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} exits the surgery gingerly, since ${he} can feel that something was done to ${his} dick. Since it is still there, ${he} doesn't understand what changed. <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} exits the surgery gingerly, since ${he} can feel that something was done to ${his} dick. ${He} examines it carefully`);
			if (canSee(slave)) {
				r.push(`in the mirror.`);
			} else {
				r.push(`by feeling alone.`);
			}
			r.push(`Realizing that ${his} foreskin fits comfortably, <span class="devotion inc">${he}'s very happy you'd take an interest in ${his} penis,</span> and looks forward to having a slightly easier time keeping ${himself} clean through ${his} life as a sex slave.`);
			if (canAchieveErection(slave)) {
				r.push(`${He} also can't wait`);
				if (canSee(slave)) {
					r.push(`for the show during`);
				} else {
					r.push(`to feel`);
				}
				r.push(`${his} next erection.`);
			}
			r.push(`<span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He} exits the surgery gingerly, since ${he} can feel that something was done to ${his} dick. ${He} examines it carefully`);
			if (canSee(slave)) {
				r.push(`in the mirror.`);
			} else {
				r.push(`by feeling alone.`);
			}
			r.push(`Realizing that ${his} foreskin fits comfortably, ${he}'s flooded with relief. ${He}'s so elated that ${he} hasn't been severely damaged that ${he} doesn't mind your taking surgical control of ${his} member. <span class="health dec">${his} health has been slightly affected.</span>`);
		} else {
			r.push(`${He} exits the surgery gingerly, since ${he} can feel that something was done to ${his} dick. ${He} examines it carefully`);
			if (canSee(slave)) {
				r.push(`in the mirror.`);
			} else {
				r.push(`by feeling alone.`);
			}
			r.push(`Realizing that ${his} foreskin fits comfortably, ${he}'s flooded with relief, since ${he} was afraid that you'd done something far more terrible. Once ${he} has time to think about it, though, ${he}'s somewhat <span class="devotion dec">resentful,</span> since ${he} naturally feels a certain proprietary interest in ${his} own penis. <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.ForeskinTuck = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove excess foreskin";
	}

	get healthCost() {
		return 5;
	}

	apply(cheat) {
		this._slave.foreskin = this._slave.dick;
		return this._assemble(new App.Medicine.Surgery.Reactions.ForeskinTuck());
	}
};
