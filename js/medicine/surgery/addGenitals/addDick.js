App.Medicine.Surgery.Reactions.AddDick = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`The surgery is invasive, and ${he} spends some time in the autosurgery, slowly recovering. As feeling slowly returns to the lower half of ${his} body and ${his} thoughts coalesce against the dissipating fog of surgical pharmacology, ${he} strains to focus on ${his} groin${(canSee(slave)) ? `, visible in a ceiling mirror above ${him}` : ``}. ${His} eyes open wide as ${he} takes in the new member between ${his} legs. Suddenly, it twitches for the first time. The mixed pain of the terribly sore area and pleasure of new sensations floods ${him}, and ${he} jerks against the surgical restraints, gasping for breath. <span class="health dec">${his} health has been severely affected</span> by the intrusive surgery.`);
		} else if (slave.devotion > 50) {
			r.push(`The surgery is invasive, and ${he} spends some time in the autosurgery, slowly recovering. As feeling slowly returns to the lower half of ${his} body and ${his} thoughts coalesce against the dissipating fog of surgical pharmacology, ${he} strains to focus on ${his} groin${(canSee(slave)) ? `, visible in a ceiling mirror above ${him}` : ``}. As a devoted slave, ${he} knew the essentials of the surgery before it was performed, so ${he}'s excited to`);
			if (canSee(slave)) {
				r.push(`see`);
			} else {
				r.push(`feel`);
			}
			r.push(`the result. ${His} eyes open wide as ${he} takes in the new member between ${his} legs. Suddenly, it twitches for the first time. The mixed pain of the terribly sore area and pleasure of new sensations floods ${him}, and ${he} jerks against the surgical restraints, gasping for breath. ${He} is <span class="trust inc">tremendously impressed</span> that you would devote such immense resources to altering ${his} body, and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future. <span class="health dec">${his} health has been severely affected</span> by the intrusive surgery.`);
			reaction.trust += 5;
			reaction.devotion += 5;
		} else if (slave.devotion >= -20) {
			r.push(`The surgery is invasive, and ${he} spends some time in the autosurgery, slowly recovering. As feeling slowly returns to the lower half of ${his} body and ${his} thoughts coalesce against the dissipating fog of surgical pharmacology, ${he} focuses on ${his} groin${(canSee(slave)) ? `, visible in a ceiling mirror above ${him}` : ``}. ${He} slowly becomes aware of the soft new member resting between ${his} legs. ${He} has a penis. The thought process is visible on ${his} face as the fact sinks in. ${He} has a penis! Unsure what to make of this unbelievable development, ${he}`);
			if (canSee(slave)) {
				r.push(`turns ${his} gaze away from the mirror and`);
			}
			r.push(`shuts ${his} eyes tightly. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, so much so that ${he} is now more willing to <span class="devotion inc">submit to your plans</span> for ${his} future. <span class="health dec">${his} health has been severely affected</span> by the intrusive surgery.`);
			reaction.trust -= 5;
			reaction.devotion += 5;
		} else {
			r.push(`The surgery is invasive, and ${he} spends some time in the autosurgery, slowly recovering. As feeling slowly returns to the lower half of ${his} body and ${his} thoughts coalesce against the dissipating fog of surgical pharmacology, ${he} focuses on ${his} groin${(canSee(slave)) ? `, visible in a ceiling mirror above ${him}` : ``}. ${He} slowly becomes aware of the soft new member resting between ${his} legs. ${He} has a penis. The thought process is visible on ${his} face as the fact sinks in. ${He} has a penis!`);
			if (slave.voice === 0) {
				r.push(`${He} tries to scream, but as a mute all ${he} can manage is pathetic, silent thrashing against the surgical restraints.`);
			} else {
				r.push(`A huge scream rises out of ${him}, going on and on, until ${he} pauses to gasp for breath so ${he} can go on screaming.`);
			}
			r.push(`${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, and <span class="devotion dec">furious</span> at ${his} lack of control over ${his} own person. <span class="health dec">${his} health has been severely affected</span> by the intrusive surgery.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFAddDick = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		if (this._slave.prostate === 0) {
			this._slave.prostate = 1;
		}
		this._slave.dick = 2;
		this._slave.clit = 0;
		this._slave.foreskin = this._slave.dick;
		return this._assemble(new App.Medicine.Surgery.Reactions.AddDick());
	}
};
