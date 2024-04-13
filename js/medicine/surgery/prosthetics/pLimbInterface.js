App.Medicine.Surgery.Reactions.PLimbInterface1 = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, hers} = getPronouns(slave);
		const r = [];

		r.push(`When ${he} is carried out of surgery ${he}`);
		if (canSee(slave)) {
			r.push(`cranes ${his} neck to better see the ports`);
		} else {
			r.push(`wiggles ${his} stumps trying to feel the ports`);
		}
		r.push(`installed in ${his} stumps. Recovery will be <span class="health dec">significant,</span> since the surgical implantation of anchor points for the limbs themselves and the installation of nerve impulse detectors constituted major surgery.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 20) {
				r.push(`Nevertheless, ${he}'s <span class="devotion inc">overwhelmed with gratitude,</span> and thanks you profusely the first chance ${he} gets. ${He} follows the acclimation program diligently, doing ${his} best to learn how to be a good slave despite, or sometimes even because of, ${his} disability. ${He} <span class="trust inc">places more trust in you,</span> too, since you obviously have ${his} best interests at heart.`);
				reaction.devotion += 5;
				reaction.trust += 5;
			} else if (slave.devotion >= -20) {
				r.push(`${He}'s <span class="devotion inc">overwhelmed with gratitude,</span> in part because ${he} didn't think you'd do something like this for ${him}. ${He} thanks you profusely the first chance ${he} gets, and follows the acclimation program diligently, trying to deserve the expense you went to. ${He} <span class="trust inc">places more trust in you,</span> too, since you seem to have a plan for ${him}.`);
				reaction.devotion += 5;
				reaction.trust += 5;
			} else {
				r.push(`Despite ${his} hatred of you, ${he} can't help but <span class="trust inc">trust you a bit more,</span> since you clearly have a plan that involves putting a good deal of value into ${him}. Your goals might not be ${hers}, but at least ${he} has an indication that you're not toying with ${him}.`);
				reaction.trust += 5;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.PLimbInterface2 = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, hers} = getPronouns(slave);
		const r = [];

		r.push(`When ${he} is carried out of surgery ${he}`);
		if (canSee(slave)) {
			r.push(`cranes ${his} neck to better see the ports`);
		} else {
			r.push(`wiggles ${his} stumps trying to feel the ports`);
		}
		r.push(`installed in ${his} stumps. ${His} stumps twitch slightly as the software begins configuring. Recovery will be <span class="health dec">significant,</span> since the surgical implantation of anchor points for the limbs themselves and the installation of nerve bridges constituted major surgery.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 20) {
				r.push(`Nevertheless, ${he}'s <span class="devotion inc">overwhelmed with gratitude,</span> and thanks you profusely the first chance ${he} gets. ${He} follows the acclimation program diligently, doing ${his} best to learn how to be a good slave despite, or sometimes even because of, ${his} disability. ${He} <span class="trust inc">places more trust in you,</span> too, since you obviously have ${his} best interests at heart.`);
				reaction.devotion += 5;
				reaction.trust += 5;
			} else if (slave.devotion >= -20) {
				r.push(`${He}'s <span class="devotion inc">overwhelmed with gratitude,</span> in part because ${he} didn't think you'd do something like this for ${him}. ${He} thanks you profusely the first chance ${he} gets, and follows the acclimation program diligently, trying to deserve the expense you went to. ${He} <span class="trust inc">places more trust in you,</span> too, since you seem to have a plan for ${him}.`);
				reaction.devotion += 5;
				reaction.trust += 5;
			} else {
				r.push(`Despite ${his} hatred of you, ${he} can't help but <span class="trust inc">trust you a bit more,</span> since you clearly have a plan that involves putting a good deal of value into ${him}. Your goals might not be ${hers}, but at least ${he} has an indication that you're not toying with ${him}.`);
				reaction.trust += 5;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.PLimbInterface3 = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, hers, himself} = getPronouns(slave);
		const r = [];

		r.push(`When ${he} is carried out of surgery ${he}`);
		if (canSee(slave)) {
			r.push(`cranes ${his} neck to better see the ports`);
		} else {
			r.push(`wiggles ${his} stumps trying to feel the ports`);
		}
		r.push(`installed in ${his} stumps. ${His} stumps twitch slightly as the software begins configuring. Since ${he} already had anchors installed in previous surgery this procedure was less invasive and thus <span class="health dec">${his} health has been only slightly affected.</span>`);
		if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
			if (slave.devotion > 20) {
				r.push(`${He} is <span class="devotion inc">overjoyed</span> when ${he} finds out this upgrade will allow ${him} to <i>feel</i> with ${his} limbs again and thanks you profusely the first chance ${he} gets. ${He} <span class="trust inc">places more trust in you,</span> too, since you obviously have ${his} best interests at heart.`);
			} else if (slave.devotion >= -20) {
				r.push(`${He}'s <span class="devotion inc">overwhelmed with joy and gratitude,</span> when ${he} finds out this upgrade will allow ${him} to <i>feel</i> with ${his} limbs again, in part because ${he} didn't think you'd do something like this for ${him}. ${He} thanks you profusely the first chance ${he} gets and is determined to prove ${himself} worthy of the expense you went to for ${him}. ${He} <span class="trust inc">places more trust in you,</span> too, since you seem to have a plan for ${him}.`);
			} else {
				r.push(`Despite ${his} hatred of you, ${he} can't help but feel some <span class="trust inc">trust</span> and <span class="devotion inc">gratitude,</span> towards you, since you clearly have a plan that involves putting a good deal of value into ${him}. Your goals might not be ${hers}, but at least ${he} has an indication that you're not toying with ${him}.`);
			}
			reaction.devotion += 5;
			reaction.trust += 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.PLimbInterface4 = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him} = getPronouns(slave);
		const r = [];

		r.push(`When ${he} is carried out of surgery ${he}`);
		if (canSee(slave)) {
			r.push(`cranes ${his} neck to better see the ports`);
		} else {
			r.push(`wiggles ${his} stumps trying to feel the ports`);
		}
		r.push(`installed in ${his} stumps. ${His} stumps twitch slightly as the software begins configuring. Since ${he} already had anchors installed in previous surgery this procedure was less invasive and thus <span class="health dec">${his} health has been only slightly affected.</span>`);
		if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
			if (slave.devotion > 20) {
				r.push(`${He} <span class="devotion inc">trusts</span> you enough to be not be put off by your explanation of what kind of prosthetic limbs will fit ${his} new interface. Thinking that maybe being a pet won't be so bad.`);
			} else if (slave.devotion >= -20) {
				r.push(`${He}'s <span class="devotion inc">apprehensive</span> when ${he} finds out this interface will make ${him} quadrupedal like a animal.`);
				reaction.devotion -= 5;
				reaction.trust -= 5;
			} else {
				r.push(`The flicker of gratefulness towards you is quickly replaced by hatred when ${he} finds out that this new interface will force her to walk like an animal. ${His} impression of you becomes worse now that ${he} knows that you plan to turn ${him} into a pet.`);
				reaction.devotion -= 25;
				reaction.trust -= 25;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.PLimbInterface5 = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`When ${he} is carried out of surgery ${he}`);
		if (canSee(slave)) {
			r.push(`cranes ${his} neck to better see the ports`);
		} else {
			r.push(`wiggles ${his} stumps trying to feel the ports`);
		}
		r.push(`installed in ${his} stumps. Recovery will be <span class="health dec">significant,</span> since the surgical implantation of anchor points for the limbs themselves and the installation of nerve impulse detectors constituted major surgery.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 20) {
				r.push(`Even after learning what kind of prosthetics will fit ${him}, ${he}'s still <span class="devotion inc">filled with gratitude,</span> and thanks you the first chance ${he} gets. ${He} follows the acclimation program diligently, doing ${his} best to learn how to be a good pet for you. ${He} <span class="trust inc">places more trust in you,</span> too, since you gave ${him} the ability to move on ${his} own again.`);
				reaction.devotion += 5;
				reaction.trust += 5;
			} else if (slave.devotion >= -20) {
				r.push(`After learning what kind of prosthetics are awaiting ${him}, ${he}'s still relatively grateful to you, because ${he} didn't think ${he}'d ever move on ${his} own again. ${He} thanks you sincerely, and follows the acclimation program diligently, looking forward to being able to move on ${his} own again. ${He} <span class="trust inc">places more trust in you,</span> since you don't seem to have bad things planned for ${him}.`);
				reaction.trust += 5;
			} else {
				r.push(`The slight joy of being able to have limbs again is greatly dampened when ${he} learns what kind of limbs are awaiting ${him}, ${he}'s only comforted by the thought of being able to walk on ${his} own again. The already bad impression of you worsens, now that ${he} has feels like you're toying with ${him}.`);
				reaction.devotion -= 5;
				reaction.trust -= 5;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.BasicPLimbInterface = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Install basic prosthetic interface";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.PLimb = 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.PLimbInterface1());
	}
};

App.Medicine.Surgery.Procedures.AdvancedPLimbInterface = class extends App.Medicine.Surgery.Procedure {
	get name() {
		if (this.originalSlave.PLimb === 0) {
			return "Install advanced prosthetic interface";
		} else if (this.originalSlave.PLimb === 1) {
			return "Upgrade to advanced prosthetic interface";
		} else {
			return "Downgrade to advanced prosthetic interface";
		}
	}

	get disabledReasons() {
		const r = super.disabledReasons;
		const {He} = getPronouns(this.originalSlave);
		if (this.originalSlave.PLimb === 3 && hasAnyProstheticLimbs(this.originalSlave)) {
			r.push(`${He} still has limbs attached. Remove all limbs before downgrading.`);
		}
		return r;
	}

	get healthCost() {
		return this.originalSlave.PLimb === 0 ? 20 : 10;
	}

	apply(cheat) {
		this._slave.PLimb = 2;

		if (this.originalSlave.PLimb === 0) {
			return this._assemble(new App.Medicine.Surgery.Reactions.PLimbInterface2());
		} else {
			return this._assemble(new App.Medicine.Surgery.Reactions.PLimbInterface3());
		}
	}
};

App.Medicine.Surgery.Procedures.QuadrupedalPLimbInterface = class extends App.Medicine.Surgery.Procedure {
	get name() {
		if (this.originalSlave.PLimb === 0) {
			return "Install quadrupedal prosthetic interface";
		} else {
			return "Upgrade to quadrupedal prosthetic interface";
		}
	}

	get disabledReasons() {
		const r = super.disabledReasons;
		const {He} = getPronouns(this.originalSlave);
		if ((this.originalSlave.PLimb === 1 || this.originalSlave.PLimb === 2) && hasAnyProstheticLimbs(this.originalSlave)) {
			r.push(`${He} still has limbs attached. Remove all limbs before upgrading.`);
		}
		return r;
	}

	get healthCost() {
		return this.originalSlave.PLimb === 0 ? 20 : 10;
	}

	apply(cheat) {
		this._slave.PLimb = 3;
		if (this.originalSlave.PLimb === 0) {
			return this._assemble(new App.Medicine.Surgery.Reactions.PLimbInterface5());
		} else {
			return this._assemble(new App.Medicine.Surgery.Reactions.PLimbInterface4());
		}
	}
};
