App.Medicine.Surgery.Reactions.FangImplant = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw, yet fails to understand that ${his} teeth have changed shape. Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has a fang. ${He} seems doubtful,`);
			if (slave.lips <= 50) {
				r.push(`but then closes ${his} mouth and finds that it hangs cutely over ${his} lip. ${He} giggles at the absurdity of it.`);
			} else {
				r.push(`especially when he tries to close ${his} mouth only to find ${his} fat lip keeps meeting the tip of ${his} tooth.`);
			}
			r.push(`Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span>`);
		} else if (slave.devotion > 20) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has a fang. ${He} gasps with shock, but eventually ${his} shoulders slump and ${he} tries to carry on. ${He} isn't much affected mentally. Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span>`);
		} else {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} jaw. It takes a good while for ${him} to figure out what has happened, but eventually ${he} gets enough sensation in ${his} mouth to realize that ${he} now has a fang ${He} gasps with shock, accidentally gets ${his} lip in the way in ${his} anguish, bites ${himself}, and starts gagging and spitting blood. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was moderately invasive, <span class="health dec">${his} health has been somewhat affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.FangImplant = class extends App.Medicine.Surgery.Procedure {
	get name() {
		if (this.originalSlave.teeth === "fangs") {
			return "Remove a fang";
		} else {
			return "Add a fang";
		}
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.teeth = "fang";
		return this._assemble(new App.Medicine.Surgery.Reactions.FangImplant());
	}
};
