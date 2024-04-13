App.Medicine.Surgery.Reactions.FatGraft = class extends App.Medicine.Surgery.SimpleReaction {
	/**
	 * @param {number} boobFat
	 * @param {number} buttFat
	 */
	constructor(boobFat, buttFat) {
		super();
		this.boobFat = boobFat;
		this.buttFat = buttFat;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} notices that ${his} weight is slightly off, almost as if it were someplace else. As with all surgeries, <span class="health dec">${his} health has been affected.</span>`);
		} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
			if (canSee(slave)) {
				r.push(`${He} looks over ${his} new thin figure experimentally`);
			} else {
				r.push(`${He} shifts ${his} weight experimentally`);
			}
			r.push(`and turns to you with a smile to show it off. As an anorexic <span class="devotion inc">${he} thinks you have brought ${him} closer to the true ideal.</span>`);
			if (this.boobFat > 0) {
				if (slave.areolae < 2) {
					if (Math.random() > 0.7) {
						r.push(`The increase in breast size <span class="change positive">stretches and broadens ${his} areolae.</span>`);
						slave.areolae += 1;
					}
				}
				if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BOOBS)) {
					if (hasAnyArms(slave)) {
						r.push(`${He}'s barely out of the surgery before ${he}'s playing with ${his} new assets.`);
					} else {
						r.push(`${He}'s barely out of the surgery before ${he}'s rubbing ${his} new assets against anything ${he} can reach.`);
					}
					r.push(`${He}'s <span class="devotion inc">deliriously happy</span> with your changes to what ${he} thinks of as ${his} primary sexual organs, so much so that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body.`);
					reaction.trust += 4;
					reaction.devotion += 4;
				} else {
					if (hasAnyArms(slave)) {
						r.push(`${He} hefts ${his} new breasts experimentally and turns to you to show them off. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see them from all angles.`);
					} else {
						r.push(`${He} bounces a little to feel ${his} new breasts move and turns ${his} torso to you to show them off. ${He}'s still sore, so ${he} doesn't move too much, but ${he} wiggles ${himself} a little to make them bounce for you.`);
					}
					r.push(`${He} isn't too fond of ${his} fat being moved to ${his} breasts instead of removed completely, but it's a small price to pay to not be a blimp.`);
				}
			}
			if (this.buttFat > 0) {
				if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BUTTSLUT)) {
					r.push(`${He} gently flexes ${his} sore buttocks with a sigh of pleasure. ${He}'s <span class="devotion inc">deliriously happy</span> to have a bigger butt, since ${he} confidently expects that this will mean more cocks being shoved up ${his} asshole. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body.`);
					reaction.trust += 4;
					reaction.devotion += 4;
				} else if (slave.devotion > 50) {
					r.push(`${He} rubs ${his} new butt experimentally and turns to you to show it off. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see it from all angles. ${He} isn't too keen on the idea of ${his} fat being moved to ${his} butt instead of removed completely, but ${he} accepts that it isn't hanging from ${his} front any longer.`);
				}
			}
			r.push(`As with all surgeries, <span class="health dec">${his} health has been affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 50) {
			if (canSee(slave)) {
				r.push(`${He} looks over ${his} new thin figure experimentally`);
			} else {
				r.push(`${He} shifts ${his} weight experimentally`);
			}
			r.push(`and turns to you with a smile to show it off. ${He}'s still sore, so ${he} doesn't bend or flirt, but ${he} turns around to let you see it from all angles. <span class="devotion inc">${He}'s happy with your changes to ${his} body.</span>`);
			if (this.boobFat > 0) {
				if (slave.areolae < 2) {
					if (Math.random() > 0.7) {
						r.push(`The increase in breast size <span class="change positive">stretches and broadens ${his} areolae.</span>`);
						slave.areolae += 1;
					}
				}
				if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BOOBS)) {
					if (hasAnyArms(slave)) {
						r.push(`${He}'s barely out of the surgery before ${he}'s playing with ${his} new assets.`);
					} else {
						r.push(`${He}'s barely out of the surgery before ${he}'s rubbing ${his} new assets against anything ${he} can reach.`);
					}
					r.push(`${He}'s <span class="devotion inc">deliriously happy</span> with your changes to what ${he} thinks of as ${his} primary sexual organs, so much so that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body.`);
					reaction.trust += 4;
					reaction.devotion += 4;
				} else if (slave.devotion > 50) {
					if (hasAnyArms(slave)) {
						r.push(`${He} hefts ${his} new breasts experimentally and turns to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see them from all angles.`);
					} else {
						r.push(`${He} bounces a little to feel ${his} new breasts move and turns ${his} torso to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't move too much, but ${he} wiggles ${himself} a little to make them bounce for you.`);
					}
				}
			}
			if (this.buttFat > 0) {
				if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BUTTSLUT)) {
					r.push(`${He} gently flexes ${his} sore buttocks with a sigh of pleasure. ${He}'s <span class="devotion inc">deliriously happy</span> to have a bigger butt, since ${he} confidently expects that this will mean more cocks being shoved up ${his} asshole. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body.`);
					reaction.trust += 4;
					reaction.devotion += 4;
				} else if (slave.devotion > 50) {
					r.push(`${He} rubs ${his} new butt experimentally and turns to you with a smile to show it off. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see it from all angles.`);
				}
			}
			r.push(`As with all surgery <span class="health dec">${his} health has been affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (this.boobFat > 0) {
				if (slave.areolae < 2) {
					if (Math.random() > 0.7) {
						r.push(`The increase in breast size <span class="change positive">stretches and broadens ${his} areolae.</span>`);
						slave.areolae += 1;
					}
				}
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} new breasts`);
				} else {
					r.push(`${He} shifts them`);
				}
				r.push(`skeptically.`);
				if (hasAnyArms(slave)) {
					r.push(`${He}'s still sore, so ${he} doesn't touch them.`);
				} else {
					r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
				}
			}
			if (this.buttFat > 0) {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} new butt`);
				} else {
					r.push(`${He} shifts ${his} new butt`);
				}
				r.push(`skeptically. ${He}'s still sore, so ${he} doesn't touch it.`);
			}
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`eyes ${his} new thin figure`);
			} else {
				r.push(`shifts ${his} weight`);
			}
			r.push(`skeptically. ${He}'s still sore, so ${he} doesn't bend or touch ${himself}. ${He}'s come to terms with the fact that ${he}'s a slave, so ${he} expected something like this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (this.boobFat > 0) {
				if (slave.areolae < 2) {
					if (Math.random() > 0.7) {
						r.push(`The increase in breast size <span class="change positive">stretches and broadens ${his} areolae.</span>`);
						slave.areolae += 1;
					}
				}
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} new breasts`);
				} else {
					r.push(`The new weight on ${his} chest fills ${him}`);
				}
				r.push(`with resentment.`);
			}
			if (this.buttFat > 0) {
				if (canSee(slave)) {
					r.push(`${He} eyes ${his} new butt`);
				} else {
					r.push(`The new weight in ${his} backside fills ${him}`);
				}
				r.push(`with resentment.`);
			}
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new thin figure`);
			} else {
				r.push(`How light ${he} feels fills ${him}`);
			}
			r.push(`with resentment. ${He}'s still sore, so ${he} doesn't bend or touch ${himself}, but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}. ${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this model figure as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 15;
			reaction.devotion -= 5;
		}
		if (slave.weight > 190 && slave.bellySag < 10) {
			r.push(`Due to the tremendous amount of fat removed from ${his} midsection, it sags terribly after the surgery.`);
			slave.bellySag = 10;
		} else if (slave.weight > 130 && slave.bellySag < 5) {
			r.push(`Due to the large amount of fat removed from ${his} midsection, it droops noticeably after the surgery.`);
			slave.bellySag = 5;
		}
		slave.weight = 0;

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.FatGraft = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} boobFat
	 * @param {number} buttFat
	 */
	constructor(slave, boobFat, buttFat) {
		super(slave);
		this.boobFat = boobFat;
		this.buttFat = buttFat;
	}

	get name() {
		return "Finalize fat transfer";
	}

	get _workCost() {
		return super._workCost * 2;
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.boobs += this.boobFat * 100;
		this._slave.butt += this.buttFat;
		this._slave.boobs = Math.clamp(this._slave.boobs, 0, 50000);
		this._slave.butt = Math.clamp(this._slave.butt, 0, 20);

		return this._assemble(new App.Medicine.Surgery.Reactions.FatGraft(this.boobFat, this.buttFat));
	}
};
