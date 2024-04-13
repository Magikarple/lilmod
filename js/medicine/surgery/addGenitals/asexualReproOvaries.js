App.Medicine.Surgery.Reactions.AsexualReproOvaries = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, girl} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but lacks the mental faculties to realize that ${he} is now self-impregnating. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to suspect that something has critically changed about ${his} reproductive system. ${He} is <span class="trust inc">pleased</span> that you would go out of your way to alter ${his} body, and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 5;
			reaction.devotion += 5;
		} else if (slave.devotion >= -20) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to shudder at the thought of just what could have possibly been put into ${him}. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, so much so that ${he} is now more willing to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion += 5;
		} else {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to dread the discovery of what now resides inside ${him}. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, and <span class="devotion dec">furious</span> at ${his} lack of control over ${his} own person. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}
		if (isFertile(slave) && slave.preg === 0) {
			knockMeUp(slave, 100, 2, slave.ID);
			r.push(`${He} doesn't even have the chance to reach the slave quarters before ${his} new reproductive system detects ${his} unprotected fertility and begins to internally cum.`);
			if (canWalk(slave)) {
				r.push(`${He} struggles to stand as wave after wave of pleasure radiates from inside ${his} self-fertilizing womb.`);
			} else {
				r.push(`The slave carrying ${him} struggles to keep their grip on the orgasm wracked ${girl}.`);
			}
			r.push(`By the time ${he} is finished, ${he} is a sweat-soaked, panting mess with a womb <span class="pregnant">`);
			if (slave.pregType > 50) {
				r.push(`stuffed full of fertilized eggs.`);
			} else if (slave.pregType > 20) {
				r.push(`filled with new life.`);
			} else if (slave.pregType > 1) {
				r.push(`housing several new lives.`);
			} else {
				r.push(`filled with seed and a new life.`);
			}
			r.push(`</span>`);
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFAsexualReproOvaries = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		if (this._slave.preg < -1) {
			this._slave.preg = 0;
		}
		this._slave.eggType = "human";
		this._slave.pregData = _.cloneDeep(App.Data.misc.pregData.human);
		if (this._slave.pubertyXX === 0 && this._slave.physicalAge >= V.fertilityAge) {
			if (V.precociousPuberty === 1) {
				this._slave.pubertyAgeXX = this._slave.physicalAge + 1;
			} else {
				this._slave.pubertyXX = 1;
			}
		}
		this._slave.ovaImplant = OvaryImplantType.ASEXUAL;
		return this._assemble(new App.Medicine.Surgery.Reactions.AsexualReproOvaries());
	}
};
