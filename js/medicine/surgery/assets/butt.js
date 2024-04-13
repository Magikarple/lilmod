App.Medicine.Surgery.Reactions.ButtGain = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} doesn't notice that ${his} butt has gotten larger. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BUTTSLUT)) {
			r.push(`${He} gently flexes ${his} sore buttocks with a sigh of pleasure. ${He}'s <span class="devotion inc">deliriously happy</span> to have a bigger butt, since ${he} confidently expects that this will mean more cocks being shoved up ${his} asshole. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 4;
		} else if (slave.devotion > 50) {
			r.push(`${He} rubs ${his} new butt experimentally and turns to you with a smile to show it off. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see it from all angles. <span class="devotion inc">${He}'s happy with your changes to ${his} ass.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new butt`);
			} else {
				r.push(`${He} shifts ${his} new butt`);
			}
			r.push(`skeptically. ${He}'s still sore, so ${he} doesn't touch it. ${He}'s come to terms with the fact that ${he}'s a slave, so ${he} expected something like this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new butt`);
			} else {
				r.push(`The new weight in ${his} backside fills ${him}`);
			}
			r.push(`with resentment. ${He}'s still sore, so ${he} doesn't touch them, but ${he} glares daggers. ${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this fake ass as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};
App.Medicine.Surgery.Reactions.ButtLoss = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} doesn't notice that ${his} butt has gotten smaller. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`twists to view`);
			} else {
				r.push(`${He} jiggles`);
			}
			r.push(`${his} new, sleeker derrière and turns to you with a smile and a flirty little roll of ${his} hips. ${He}'s still sore, so ${he} doesn't bounce ${his} tighter buttocks for you, but ${he} seems happy all the same. <span class="devotion inc">${He}'s happy with your changes to ${his} buttocks.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`twists to view`);
			} else {
				r.push(`jiggles`);
			}
			r.push(`${his} new, sleeker derrière skeptically.`);
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch it.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, but ${he} expected something other than this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			r.push(`${He} shifts ${his} diminished ass with resentment.`);
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch it,`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still,`);
			}
			r.push(`but ${(canSee(slave)) ? `${he} glares daggers` : `${his} face contorts with distaste`}.`);
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this surgical ass theft as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

/**
 * @type {FC.Medicine.AssetSizingProcedureSet}
 */
App.Medicine.Surgery.Procedures.buttImplantsProcedure = function() {
	/**
	 * @template {FC.Medicine.SizingImplantProcedureConstructor} T
	 * @param {T} Procedure
	 * @param {ConstructorParameters<T>} args
	 */
	 function makeButtProcedure(Procedure, args) {
		return new (class extends Procedure {
			_doTargetGain() {
				return new App.Medicine.Surgery.Reactions.ButtGain();
			}

			_doTargetLoss() {
				return new App.Medicine.Surgery.Reactions.ButtLoss();
			}

			/**
			 * @param {number} volume
			 * @returns {string}
			 */
			_volumeStr(volume) {
				return '';
			}

			/**
			 * @param {number} volume
			 * @returns {string}
			 */
			_fleshExcessStr(volume) {
				return App.Utils.expandHTML(`${Math.round(100.0 * volume / App.Medicine.fleshSize(this.originalSlave, "butt"))}&thinsp;%`);
			}
		})(...args);
	}

	class Reduce extends App.Medicine.Surgery.Procedure {
		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {string} procedureName
		 * @param {number} amount
		 */
		constructor(slave, procedureName, amount) {
			super(slave);
			this._procedureName = capFirstChar(procedureName);
			this._amount = amount;
		}

		get name() {
			return `${this._procedureName} butt`;
		}

		get description() {
			const {his} = getPronouns(this._slave);
			return `${this._procedureName} ${his} butt`;
		}

		get healthCost() { return 5; }

		get changeValue() { return -this._amount; }

		apply(cheat) {
			this._slave.butt -= this._amount;
			return this._assemble(new App.Medicine.Surgery.Reactions.ButtLoss());
		}
	}

	return {
		install: (slave, type, size, fleshExcess) =>
			makeButtProcedure(App.Medicine.Surgery.Procedures.InstallSizingImplantProcedure, [slave, "butt", type, size, fleshExcess]),
		replace: (slave, type, size, fleshExcess) =>
			makeButtProcedure(App.Medicine.Surgery.Procedures.ReplaceSizingImplantProcedure, [slave, "butt", type, size, fleshExcess]),
		remove: (slave) =>
			makeButtProcedure(App.Medicine.Surgery.Procedures.RemoveSizingImplantProcedure, [slave, "butt"]),

		fill: (slave, amount) =>
			makeButtProcedure(App.Medicine.Surgery.Procedures.FillSizingImplantProcedure, [slave, "butt", amount]),
		drain: (slave, amount) =>
			makeButtProcedure(App.Medicine.Surgery.Procedures.DrainSizingImplantProcedure, [slave, "butt", amount]),

		reduce: (slave, name, amount) => new Reduce(slave, name, amount)
	};
}();
