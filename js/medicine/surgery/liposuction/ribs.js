App.Medicine.Surgery.Reactions.Ribs = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He}'s desperately stiff and sore. It takes a good while for ${him} to figure out what has happened, but eventually ${his} careful investigations discern that the cause is ${his} new extremely narrow waist. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
			r.push(`${He}'s desperately stiff and sore. It takes a good while for ${him} to figure out what has happened, but eventually ${his} careful investigations discern that the cause of ${his} extremely narrow waist is that ${his} ribcage has been shortened. ${He} gasps with shock, and when ${he}`);
			if (canSee(slave)) {
				r.push(`looks at you, you see awe in ${his} eyes.`);
			} else {
				r.push(`turns to face you, you see awe on ${his} face.`);
			}
			r.push(`As an anorexic <span class="devotion inc">${he} thinks you have brought ${him} closer to the true ideal.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 50) {
			r.push(`${He}'s desperately stiff and sore. It takes a good while for ${him} to figure out what has happened, but eventually ${his} careful investigations discern that the cause of ${his} extremely narrow waist is that ${his} ribcage has been shortened. ${He} gasps with shock, and when ${he}`);
			if (canSee(slave)) {
				r.push(`looks at you, you see awe and fear in ${his} eyes.`);
			} else {
				r.push(`turns to you, you see awe and fear on ${his} face.`);
			}
			r.push(`<span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He}'s desperately stiff and sore. It takes a good while for ${him} to figure out what has happened, but eventually ${his} careful investigations discern that the cause of ${his} extremely narrow waist is that ${his} ribcage has been shortened. ${He} gasps with shock, but eventually ${his} shoulders slump and ${he} tries to carry on. ${He} isn't much affected mentally. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else {
			r.push(`${He}'s desperately stiff and sore. It takes a good while for ${him} to figure out what has happened, but eventually ${his} careful investigations discern that the cause of ${his} extremely narrow waist is that ${his} ribcage has been shortened. ${He} gasps with shock, wobbles a little, gasps with pain at the soreness as ${he} does, and then manages to hold ${himself} upright and still as ${he} sobs. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Ribs = class extends App.Medicine.Surgery.Procedure {
	get name() {
		const {his} = getPronouns(this.originalSlave);
		return `Remove ribs to severely narrow ${his} waist`;
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.waist = -100;
		return this._assemble(new App.Medicine.Surgery.Reactions.Ribs());
	}
};
