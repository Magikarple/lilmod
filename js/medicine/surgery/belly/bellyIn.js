App.Medicine.Surgery.Reactions.BellyIn = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen that ${he} cannot figure out the source of. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, and as such, knows you put something into ${his} womb. ${He} is <span class="devotion inc">curious</span> about the details of the implant, and eagerly awaits to see the end result. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache and slight weight in ${his} lower abdomen, and as such, knows you put something into ${his} womb. ${He} understands the realities of ${his} life as a slave, but ${he} is still surprised at what now resides in ${his} womb. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} knows enough about surgery and sex slaves to believe that ${he} has been impregnated. ${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> at the potential that ${he}'s been bred. Even after what has been implanted into ${his} womb is explained to ${him}, ${he} is no less defiant; though ${he} is relieved that ${he} isn't pregnant. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BellyIn = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant a fillable abdominal implant";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.bellyImplant = 0;
		this._slave.preg = -2;
		this._slave.bellyPain += 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.BellyIn());
	}
};
