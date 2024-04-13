App.Medicine.Surgery.Reactions.SharpTeeth = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw, yet fails to understand that ${his} teeth have changed shape. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has teeth fit for a carnivore. ${He} seems doubtful, but then works up ${his} courage and bares them`);
			if (canSee(slave)) {
				r.push(`at a mirror.`);
			} else {
				r.push(`so you may see.`);
			}
			r.push(`${He} menaces`);
			if (canSee(slave)) {
				r.push(`${himself}`);
			}
			r.push(`for a while before laughing quietly. <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has teeth fit for a carnivore. ${He} gasps with shock, but eventually ${his} shoulders slump and ${he} tries to carry on. ${He} isn't much affected mentally. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has teeth fit for a carnivore. ${He} gasps with shock, accidentally gets ${his} tongue in the way in ${his} anguish, bites ${himself}, and starts gagging and spitting blood. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.SharpTeeth = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Replace them with sharp teeth";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.teeth = "pointy";
		return this._assemble(new App.Medicine.Surgery.Reactions.SharpTeeth());
	}
};
