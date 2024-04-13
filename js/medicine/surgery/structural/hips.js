App.Medicine.Surgery.Reactions.Hips = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} exits the surgery very slowly, since ${he}'s still in considerable pain and isn't yet used to the way ${his} pelvis now fits together with the rest of ${his} body. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} exits the surgery very cautiously, since ${he}'s still in considerable pain and isn't yet used to the way ${his} pelvis now fits together with the rest of ${his} body. ${He}'ll be clumsy and hesitant for some time, but ${he}'s happy with ${his} new hips. <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He} exits the surgery very cautiously, since ${he}'s still in considerable pain and isn't yet used to the way ${his} pelvis now fits together with the rest of ${his} body. ${He}'ll be clumsy and hesitant for some time, but ${he}'s accepted ${his} new hips. ${He} isn't much affected mentally. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else {
			r.push(`${He} exits the surgery very cautiously, since ${he}'s still in considerable pain and isn't yet used to the way ${his} pelvis now fits together with the rest of ${his} body. ${He}'ll be clumsy and hesitant for some time, and ${he} refuses to accept that you are both willing and able to reshape ${him} down to ${his} very bones. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BroadenPelvis = class extends App.Medicine.Surgery.Procedure {
	get name() { return this._slave.shouldersImplant === 0 ? "Broaden pelvis" : "Advanced pelvis broadening"; }

	get healthCost() { return 40; }

	apply(cheat) {
		this._slave.hipsImplant++;
		this._slave.hips++;
		return this._assemble(new App.Medicine.Surgery.Reactions.Hips());
	}
};


App.Medicine.Surgery.Procedures.NarrowPelvis = class extends App.Medicine.Surgery.Procedure {
	get name() { return this._slave.shouldersImplant === 0 ? "Narrow pelvis" : "Advanced pelvis narrowing"; }

	get healthCost() { return 40; }

	apply(cheat) {
		this._slave.hipsImplant--;
		this._slave.hips--;
		return this._assemble(new App.Medicine.Surgery.Reactions.Hips());
	}
};
