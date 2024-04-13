App.Medicine.Surgery.Reactions.Waist = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`While ${he} notices how sore ${his} waist is, ${he} fails to find the reason why. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
			if (canSee(slave)) {
				r.push(`${He} looks over ${his} new waist experimentally`);
			} else {
				r.push(`${He} shifts ${his} weight experimentally`);
			}
			r.push(`and turns to you with a smile to show it off. As an anorexic <span class="devotion inc">${he} thinks you have brought ${him} closer to the true ideal.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 50) {
			if (canSee(slave)) {
				r.push(`${He} looks over ${his} new waist experimentally`);
			} else {
				r.push(`${He} shifts ${his} weight experimentally`);
			}
			r.push(`and turns to you with a smile to show it off. ${He}'s still sore, so ${he} doesn't bend or flirt, but ${he} turns around to let you see it from all angles. <span class="devotion inc">${He}'s happy with your changes to ${his} waist.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`eyes ${his} new waist`);
			} else {
				r.push(`shifts ${his} weight`);
			}
			r.push(`skeptically. ${He}'s still sore, so ${he} doesn't bend or touch ${himself}. ${He}'s come to terms with the fact that ${he}'s a slave, so ${he} expected something like this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new waist`);
			} else {
				r.push(`How light ${he} feels fills ${him}`);
			}
			r.push(`with resentment. ${He}'s still sore, so ${he} doesn't bend or touch ${himself}, but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}. ${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this fake figure as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.WaistReduction = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Liposuction";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.waist -= 20;
		return this._assemble(new App.Medicine.Surgery.Reactions.Waist());
	}
};
