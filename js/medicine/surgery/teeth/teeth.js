App.Medicine.Surgery.Reactions.Teeth = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw, yet fails to understand ${his} teeth are now fake. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} is wearing prosthetic teeth that ${he} can remove. ${He} gasps with shock, but figures out the idea quickly enough by experimentally`);
			if (hasAnyArms(slave)) {
				r.push(`sucking on two fingers.`);
			} else {
				r.push(`simulating oral sex with ${his} own tongue.`);
			}
			r.push(`<span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} is wearing prosthetic teeth that ${he} can remove. ${He} gasps with shock, but eventually ${his} shoulders slump and ${he} tries to carry on. ${He} isn't much affected mentally. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} is wearing prosthetic teeth that ${he} can remove. ${He} gasps with shock, gags, spits out the prosthetics,`);
			if (canSee(slave)) {
				r.push(`looks at ${himself} in the mirror,`);
			} else {
				r.push(`runs ${his} tongue across ${his} empty gums,`);
			}
			r.push(`and sobs. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RemovableTeeth = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Replace them with removable prosthetics";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.teeth = "removable";
		return this._assemble(new App.Medicine.Surgery.Reactions.Teeth());
	}
};
