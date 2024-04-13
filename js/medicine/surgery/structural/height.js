App.Medicine.Surgery.Reactions.Height = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} exits the surgery very slowly, since ${he}'s terribly sore and isn't yet used to the novel lengths of the legs ${he} walks on. ${He}'ll be clumsy for some time. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} exits the surgery very cautiously, since ${he}'s terribly sore and isn't yet used to the novel lengths of the legs ${he} walks on. ${He}'ll be clumsy and hesitant for some time, but ${he}'s happy with ${his} new body. <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He} exits the surgery very cautiously, since ${he}'s terribly sore and isn't yet used to the novel lengths of the legs ${he} walks on. ${He}'ll be clumsy and hesitant for some time, but ${he}'s accepted ${his} new body. ${He} isn't much affected mentally. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else {
			r.push(`${He} exits the surgery very cautiously, since ${he}'s terribly sore and isn't yet used to the novel lengths of the legs ${he} walks on. ${He}'ll be clumsy and hesitant for some time, and ${he} refuses to accept that this new body is really what ${he}'s been condemned to. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};


App.Medicine.Surgery.Procedures.IncreaseHeight = class extends App.Medicine.Surgery.Procedure {
	get name() {
		if (this._slave.heightImplant === 0) {
			return "Lengthen major bones";
		} else if (this._slave.heightImplant >= 1) {
			return "Advanced height gain surgery";
		} else if (this._slave.heightImplant === -1) {
			return "Reverse existing height surgery";
		} else {
			return "Revert a stage of existing height surgery";
		}
	}

	get healthCost() { return 40; }

	apply(cheat) {
		this._slave.heightImplant += 1;
		this._slave.height += 10;
		return this._assemble(new App.Medicine.Surgery.Reactions.ShortenTendons());
	}
};


App.Medicine.Surgery.Procedures.DecreaseHeight = class extends App.Medicine.Surgery.Procedure {
	get name() {
		if (this._slave.heightImplant === 0) {
			return "Shorten major bones";
		} else if (this._slave.heightImplant <= -1) {
			return "Advanced height reduction surgery";
		} else if (this._slave.heightImplant === 1) {
			return "Reverse existing height surgery";
		} else {
			return "Revert a stage of existing height surgery";
		}
	}

	get healthCost() { return 40; }

	apply(cheat) {
		this._slave.heightImplant -= 1;
		this._slave.height -= 10;
		return this._assemble(new App.Medicine.Surgery.Reactions.ShortenTendons());
	}
};
