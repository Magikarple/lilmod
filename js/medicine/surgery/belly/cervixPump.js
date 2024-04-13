App.Medicine.Surgery.Reactions.CervixPump = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		const cervixPumpAcheLocation = "vagina";
		const cervixPumpLocation = "cervix";

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen and ${cervixPumpAcheLocation} that ${he} cannot figure out the source of. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen and ${cervixPumpAcheLocation}, and as such, knows you put something into ${his} ${cervixPumpLocation}. ${He} is <span class="devotion inc">curious</span> about the details of the implant, and eagerly awaits to see the end result. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen and ${cervixPumpAcheLocation}, and as such, knows you put something into ${his} ${cervixPumpLocation}. ${He} understands the realities of ${his} life as a slave, but ${he} is still surprised at what now resides in ${his} ${cervixPumpLocation}. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen and ${cervixPumpAcheLocation}, but ${he} knows enough about surgery and sex slaves to believe that ${he} has modified in ${his} most private place. ${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> at the potential that ${he}'s been subject of such modifications. Even after what has been implanted into ${his} womb is explained to ${him}, ${he} is no less defiant; though ${he} is relieved that it isn't some permanent mutilation, ${he} only feels dirty and humiliated when ${he} thinks of vaginal sex slowly rounding ${his} middle. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.CervixPump = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Install cervix micropump filter";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `Will allow ${his} belly implant to slowly swell as people cum in ${his} vagina`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.cervixImplant = this._slave.cervixImplant === 0 ? 1 : 3;
		return this._assemble(new App.Medicine.Surgery.Reactions.CervixPump());
	}
};
