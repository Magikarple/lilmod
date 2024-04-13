App.Medicine.Surgery.Reactions.AddOvaries = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but lacks the mental faculties to realize that ${he} now has a chance to get pregnant. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY) || slave.origin === "$He sold $himself to you in the hope of someday bearing children.") {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to know that it means ${he} now has a chance to get pregnant. ${He} is filled with joy whenever ${he} thinks about the fact that feeling a life growing within ${him} is now, at last, a possibility. ${He} now places <span class="trust inc">total faith</span> in your plans for ${his} body and <span class="devotion inc">adores you</span> for giving ${him} a gift ${he} once thought impossible. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 10;
			reaction.devotion += 10;
		} else if (slave.devotion > 50) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to know that it means ${he} is now internally indistinguishable from a natural, unaltered woman. ${He} is <span class="trust inc">tremendously impressed</span> that you would devote such immense resources to altering ${his} body, and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 5;
			reaction.devotion += 5;
		} else if (slave.devotion >= -20) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to know that it means ${he} is now internally indistinguishable from a natural, unaltered woman. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, so much so that ${he} is now more willing to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion += 5;
		} else {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to know that it means ${he} is now internally indistinguishable from a natural, unaltered woman. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, and <span class="devotion dec">furious</span> at ${his} lack of control over ${his} own person. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};
App.Medicine.Surgery.Reactions.AddAnimalOvaries = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but lacks the mental faculties to realize that ${he} now has a chance of carrying an animal baby to term. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY) || slave.origin === "$He sold $himself to you in the hope of someday bearing children.") {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to know that it means ${he} now has a chance to get pregnant. ${He} is filled with joy whenever ${he} thinks about the fact that feeling a life growing within ${him} is now, at last, a possibility. ${He} now places <span class="trust inc">total faith</span> in your plans for ${his} body and <span class="devotion inc">adores you</span> for giving ${him} a gift ${he} once thought impossible. ${He} doesn't realize exactly what the surgery entailed, however — the happiness ${he} felt at first will most likely be replaced with horror once ${he} realizes the babies in ${his} womb are not human. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 10;
			reaction.devotion += 10;
		} else if (slave.devotion > 50) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to know that it means ${he} is now internally indistinguishable from a natural, unaltered woman — at least, that's what ${he} believes. Little does ${he} know that ${he} is now capable of carrying animal babies in ${his} womb. ${He} is <span class="trust inc">tremendously impressed</span> that you would devote such immense resources to altering ${his} body, and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 5;
			reaction.devotion += 5;
		} else if (slave.devotion >= -20) {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to know that it means ${he} is now internally indistinguishable from a natural, unaltered woman — at least, that's what ${he} believes. Little does ${he} know that ${he} is now capable of carrying animal babies in ${his} womb. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, so much so that ${he} is now more willing to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion += 5;
		} else {
			r.push(`${He} leaves the surgery with nothing but a nonspecific ache in ${his} lower abdomen, but ${he} has managed to catch enough slave rumors about what the organ farm can do to know that it means ${he} is now internally indistinguishable from a natural, unaltered woman — at least, that's what ${he} believes. Little does ${he} know that ${he} is now capable of carrying animal babies in ${his} womb. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, and <span class="devotion dec">furious</span> at ${his} lack of control over ${his} own person. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFAddOvaries = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.AnimalType} eggType
	 * @param {string} pregDataKey
	 */
	constructor(slave, eggType, pregDataKey) {
		super(slave);
		this.eggType = eggType;
		this.pregDataKey = pregDataKey;
	}

	get name() {
		return "Implant";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.ovaries = 1;
		this._slave.eggType = this.eggType;
		this._slave.preg = 0;
		/**
		 * @type {FC.PregnancyData}
		 */
		// @ts-ignore
		const data = {};
		deepAssign(data, App.Data.misc.pregData[this.pregDataKey]);
		this._slave.pregData = data;
		if (this._slave.pubertyXX === 0 && this._slave.physicalAge >= V.fertilityAge) {
			if (V.precociousPuberty === 1) {
				this._slave.pubertyAgeXX = this._slave.physicalAge + 1;
			} else {
				this._slave.pubertyXX = 1;
			}
		}

		if (this.eggType === "human") {
			return this._assemble(new App.Medicine.Surgery.Reactions.AddOvaries());
		} else {
			return this._assemble(new App.Medicine.Surgery.Reactions.AddAnimalOvaries());
		}
	}
};

App.Medicine.Surgery.Procedures.OFReplaceOvaries = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.AnimalType} eggType
	 * @param {string} pregDataKey
	 */
	constructor(slave, eggType, pregDataKey) {
		super(slave);
		this.eggType = eggType;
		this.pregDataKey = pregDataKey;
	}

	get name() {
		return "Replace";
	}

	get description() {
		return "you can replace the existing ovaries with a new pair";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.eggType = this.eggType;
		this._slave.preg = 0;
		/**
		 * @type {FC.PregnancyData}
		 */
		// @ts-ignore
		const data = {};
		deepAssign(data, App.Data.misc.pregData[this.pregDataKey]);
		this._slave.pregData = data;
		if (this._slave.pubertyXX === 0 && this._slave.physicalAge >= V.fertilityAge) {
			if (V.precociousPuberty === 1) {
				this._slave.pubertyAgeXX = this._slave.physicalAge + 1;
			} else {
				this._slave.pubertyXX = 1;
			}
		}

		if (this.eggType === "human") {
			return this._assemble(new App.Medicine.Surgery.Reactions.AddOvaries());
		} else {
			return this._assemble(new App.Medicine.Surgery.Reactions.AddAnimalOvaries());
		}
	}
};
