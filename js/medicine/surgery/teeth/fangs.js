App.Medicine.Surgery.Reactions.FangsImplant = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw, yet fails to understand that ${his} teeth have changed shape. Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has a pair of fangs. ${He} seems doubtful, but then works up ${his} courage and bares them`);
			if (canSee(slave)) {
				r.push(`at a mirror.`);
			} else {
				r.push(`so you may see.`);
			}
			r.push(`${He} menaces`);
			if (canSee(slave)) {
				r.push(`${himself}`);
			}
			r.push(`for a while before laughing quietly. Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span>`);
		} else if (slave.devotion > 20) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has teeth fit for a carnivore. ${He} gasps with shock, but eventually ${his} shoulders slump and ${he} tries to carry on. ${He} isn't much affected mentally. Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span>`);
		} else {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has a pair of fangs. ${He} gasps with shock, accidentally gets ${his} lip in the way in ${his} anguish, bites ${himself}, and starts gagging and spitting blood. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.FangsImplant = class extends App.Medicine.Surgery.Procedure {
	get name() {
		if (this.originalSlave.teeth === "fang") {
			return "Add another fang";
		} else {
			return "Replace them with fangs";
		}
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.teeth = "fangs";
		return this._assemble(new App.Medicine.Surgery.Reactions.FangsImplant());
	}
};
