App.Medicine.Surgery.Reactions.AddMPreg = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		r.push(`${He} leaves the surgery with a certain fullness in ${his} lower abdomen, ${he} knows that, despite lacking female reproductive organs, ${he} can now become pregnant.`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY)) {
			r.push(`${He} is <span class="devotion inc"> filled with joy</span> about the possibility of becoming pregnant and gleefully rubs ${his} softer belly. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 10;
		} else if (slave.devotion > 50) {
			r.push(`${He}'s <span class="devotion inc">grateful</span> that you think ${his} offspring are valuable enough to give ${him} this gift, and a little nervous about how ${he}'ll perform as a mother. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He} understands the realities of ${his} life as a slave, so it isn't much of a shock. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and ${his} inevitable pregnancy.`);
			reaction.trust -= 10;
		} else {
			r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> that you have forced ${him} to become fertile in such an unnatural way. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and ${his} inevitable pregnancy.`);
			reaction.trust -= 15;
			reaction.devotion -= 15;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFAddMPreg = class extends App.Medicine.Surgery.Procedure {
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
		return 40;
	}

	apply(cheat) {
		this._slave.mpreg = 1;
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
		return this._assemble(new App.Medicine.Surgery.Reactions.AddMPreg());
	}
};
