App.Medicine.Surgery.Reactions.Age = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} doesn't notice the improvements to ${his} face, but ${he}'s not the one looking at it. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines ${his} younger self in the mirror with approval.`);
			} else {
				r.push(`listens closely to the description of ${his} new younger self with approval.`);
			}
			r.push(`${He} doesn't recognize ${his} youthful yet artificial appearance yet, but ${he} resolves to back ${his} new appearance up with youthful energy and cheer. <span class="devotion inc">${He}'s very happy you used surgery to reverse ${his} apparent aging.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 10;
		} else if (slave.devotion >= -20) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines youthful yet artificial appearance in the mirror`);
			} else {
				r.push(`listens to the description of ${his} youthful yet artificial appearance`);
			}
			r.push(`with hesitation. The cosmetic surgery is extremely well done, and ${he} eventually decides that being subjected to surgery without ${his} consent is <span class="devotion inc">acceptable,</span> if it's being used to make ${him} look so young and pretty. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines ${his} youthful yet artificial appearance in the mirror`);
			} else {
				r.push(`listens to the description of ${his} youthful yet artificial appearance`);
			}
			r.push(`with confusion. The cosmetic surgery is extremely well done, and ${he} eventually decides that being subjected to surgery without ${his} consent isn't worth fighting against, if it's being used to make ${him} look younger. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.AgeLift = class extends App.Medicine.Surgery.Procedure {
	get name() { return "Age lift"; }

	get healthCost() { return 10; }

	apply(cheat) {
		applyAgeImplant(this._slave);
		this._slave.faceImplant = Math.clamp(this._slave.faceImplant + faceSurgeryArtificiality(), 0, 100);
		return this._assemble(new App.Medicine.Surgery.Reactions.Age());
	}
};
