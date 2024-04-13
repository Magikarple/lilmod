App.Medicine.Surgery.Reactions.ScrotalTuck = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`When ${he} begins surgical recovery, ${his} groin hurts quite a lot, and ${he} can't quite tell what's going on down there. Since the surgery was invasive, <span class="health dec">${his} health has been seriously affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} exits the surgery gingerly, since ${he} can feel that something was done to ${his} testicles. ${He} examines them carefully`);
			if (canSee(slave)) {
				r.push(`in the mirror.`);
			} else {
				r.push(`by feeling alone.`);
			}
			r.push(`Realizing that ${his} balls fit ${his} scrotum perfectly, <span class="devotion inc">${he}'s very happy you'd take an interest in ${his} balls,</span> and looks forward to discovering how it moves during sex. <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He} exits the surgery gingerly, since ${he} can feel that something was done to ${his} testicles. ${He} examines them carefully`);
			if (canSee(slave)) {
				r.push(`in the mirror.`);
			} else {
				r.push(`by feeling alone.`);
			}
			r.push(`Realizing that ${his} balls fit ${his} scrotum perfectly, ${he}'s flooded with relief. ${He}'s so elated that ${he} hasn't been severely damaged that ${he} doesn't mind your taking surgical control of ${his} genitals. <span class="health dec">${his} health has been slightly affected.</span>`);
		} else {
			r.push(`${He} exits the surgery gingerly, since ${he} can feel that something was done to ${his} testicles. ${He} examines them carefully`);
			if (canSee(slave)) {
				r.push(`in the mirror.`);
			} else {
				r.push(`by feeling alone.`);
			}
			r.push(`Realizing that ${his} balls fit ${his} scrotum perfectly, ${he}'s flooded with relief, since ${he} was afraid that you'd done something far more terrible. Once ${he} has time to think about it, though, ${he}'s somewhat <span class="devotion dec">resentful,</span> since ${he} naturally feels a certain proprietary interest in ${his} own genitals. <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.ScrotalTuck = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove excess scrotal skin";
	}

	get healthCost() {
		return 5;
	}

	apply(cheat) {
		this._slave.scrotum = this._slave.balls;
		return this._assemble(new App.Medicine.Surgery.Reactions.ScrotalTuck());
	}
};
