App.Medicine.Surgery.Reactions.BoobsGain = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const heGlaresDaggers = canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`;
		const r = [];

		if (diff.areolae > slave.areolae) {
			r.push(`The increase in breast size <span class="lime">stretches and broadens ${his} areolae.</span>`);
		}
		if (diff.nipples === NippleShape.CUTE && slave.nipples === NippleShape.PUFFY) {
			r.push(`The breast surgery is invasive, and when ${his} nipples heal, <span class="orange">they're a bit more normal.</span>`);
		} else if (diff.nipples === NippleShape.PUFFY && slave.nipples === NippleShape.HUGE) {
			r.push(`The breast surgery is invasive, and when ${his} nipples heal, <span class="orange">they're a bit smaller.</span>`);
		} else if (diff.nipples === NippleShape.FLAT && (slave.nipples === NippleShape.CUTE || slave.nipples === NippleShape.TINY)) {
			r.push(`The sudden increase in breast size has <span class="orange">stretched ${his} already small nipples flat.</span>`);
		}
		if (slave.boobShape !== BreastShape.SPHERICAL) {
			if (diff.boobShape === BreastShape.SPHERICAL) {
				r.push(`With so little actual flesh left, the shape of ${his} breasts are now entirely dictated by the implants within, <span class="lime">rendering them comically spherical.</span>`);
			} else if (diff.boobShape === BreastShape.NORMAL && slave.boobShape !== BreastShape.NORMAL) {
				r.push(`The natural shape of ${his} breasts has been eliminated by the cosmetic surgery, <span class="lime">rendering ${his} boobs pretty and rounded.</span>`);
			}
		}

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little reaction to the new weight on ${his} chest. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.BOOBS)) {
			if (hasAnyArms(slave)) {
				r.push(`${He}'s barely out of the surgery before ${he}'s playing with ${his} new assets.`);
			} else {
				r.push(`${He}'s barely out of the surgery before ${he}'s rubbing ${his} new assets against anything ${he} can reach.`);
			}
			r.push(`${He}'s <span class="devotion inc">deliriously happy</span> with your changes to what ${he} thinks of as ${his} primary sexual organs, so much so that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 4;
		} else if (slave.devotion > 50) {
			if (hasAnyArms(slave)) {
				r.push(`${He} hefts ${his} new breasts experimentally and turns to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see them from all angles.`);
			} else {
				r.push(`${He} bounces a little to feel ${his} new breasts move and turns ${his} torso to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't move too much, but ${he} wiggles ${himself} a little to make them bounce for you.`);
			}
			r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} boobs.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
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
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, so ${he} expected something like this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new breasts`);
			} else {
				r.push(`The new weight on ${his} chest fills ${him}`);
			}
			r.push(`with resentment.`);
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them, but ${heGlaresDaggers}.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still, but ${heGlaresDaggers}.`);
			}
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view these fake breasts as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.BoobsLoss = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (diff.areolae < slave.areolae) {
			r.push(`The breast reduction surgery also <span class="orange">slightly reduces ${his} massive areolae.</span>`);
		}
		if (slave.nipples === NippleShape.HUGE) {
			r.push(`The breast reduction surgery also <span class="orange">slightly reduces ${his} massive nipples.</span>`);
		} else if (slave.nipples === NippleShape.FUCKABLE && diff.boobs < 500) {
			r.push(`Without the tissue needed to support their unusual shape, ${his} fuckable nipples have reverted <span class="orange">to being huge and protruding.</span>`);
		} else if (slave.nipples === NippleShape.FLAT) {
			r.push(`Without the ${his} massive implants forcing them flat, ${his} nipples have reverted <span class="lime">to being huge and protruding.</span>`);
		}
		if (slave.boobShape === BreastShape.SPHERICAL) {
			r.push(`With the removal of ${his} load bearing implants, <span class="orange">${his} breasts are left deflated and sagging.</span>`);
		}

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little awareness that ${his} breasts are smaller. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			if (hasAnyArms(slave)) {
				r.push(`${He} hefts ${his} new, sleeker breasts experimentally and turns to you with a smile to show off ${his} new, slimmer form. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see them from all angles.`);
			} else {
				r.push(`${He} bounces a little to feel ${his} smaller breasts move and turns ${his} torso to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't bounce too much.`);
			}
			r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} boobs.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new, smaller breasts skeptically.`);
			} else {
				r.push(`${He} attempts to sway ${his} big tits experimentally, only to find them substantially less bouncy.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, but ${he} expected something other than this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} sudden lack of ${his} former breasts with resentment.`);
			} else {
				r.push(`The sudden lack of weight on ${his} chest fills ${him} with resentment.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them,`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still,`);
			}
			r.push(`but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}.`);
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this surgical theft as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
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
App.Medicine.Surgery.Procedures.boobImplantsProcedure = function() {
	/**
	 * @param {FC.SlaveState} slave
	 */
	const applyBoobsGain = (slave) => {
		if (slave.areolae < 2 && Math.random() > 0.7) {
			slave.areolae += 1;
		}
		if (slave.nipples === NippleShape.PUFFY) {
			if (Math.random() > 0.7) {
				slave.nipples = NippleShape.CUTE;
			}
		} else if (slave.nipples === NippleShape.HUGE) {
			if (Math.random() > 0.9) {
				slave.nipples = NippleShape.PUFFY;
			}
		} else if ((slave.nipples === NippleShape.CUTE || slave.nipples === NippleShape.TINY) && (slave.boobsImplant / slave.boobs >= 0.75)) {
			slave.nipples = NippleShape.FLAT;
		}
		if (slave.boobShape !== BreastShape.SPHERICAL) {
			if (slave.boobsImplant / slave.boobs >= 0.90) {
				slave.boobShape = BreastShape.SPHERICAL;
			} else if (slave.boobShape !== BreastShape.NORMAL && Math.random() > 0.5) {
				slave.boobShape = BreastShape.NORMAL;
			}
		}
	};

	/**
	 * @param {FC.SlaveState} slave
	 */
	const applyBoobsLoss = (slave) => {
		if (slave.areolae > 2) {
			slave.areolae -= 1;
		}
		if (slave.nipples === NippleShape.HUGE) {
			slave.nipples = NippleShape.PUFFY;
		} else if (slave.nipples === NippleShape.FUCKABLE && slave.boobs < 500) {
			slave.nipples = NippleShape.HUGE;
		} else if (slave.nipples === NippleShape.FLAT) {
			slave.nipples = NippleShape.HUGE;
		}
		if (slave.boobShape === BreastShape.SPHERICAL) {
			slave.boobShape = BreastShape.SAGGY;
		}
	};

	/**
	 * @template {FC.Medicine.SizingImplantProcedureConstructor} T
	 * @param {T} Procedure
	 * @param {ConstructorParameters<T>} args
	 */
	function makeBoobProcedure(Procedure, args) {
		return new (class extends Procedure {
			_doTargetGain() {
				applyBoobsGain(this._slave);
				return new App.Medicine.Surgery.Reactions.BoobsGain();
			}

			_doTargetLoss() {
				applyBoobsLoss(this._slave);
				return new App.Medicine.Surgery.Reactions.BoobsLoss();
			}

			/**
			 * @param {number} volume
			 * @returns {string}
			 */
			_volumeStr(volume) {
				return V.showBoobCCs ? App.Utils.expandHTML(`${volume}&thinsp;cm³`) : '';
			}

			/**
			 * @param {number} volume
			 * @returns {string}
			 */
			_fleshExcessStr(volume) {
				const percentsStr = `${Math.round(100.0 * volume / App.Medicine.fleshSize(this.originalSlave, "boobs"))}&thinsp;%`;

				return V.showBoobCCs
					? App.Utils.expandHTML(`${volume}&thinsp;cm³ (${percentsStr})`)
					: App.Utils.expandHTML(percentsStr);
			}
		})(...args);
	}

	class Reduce extends App.Medicine.Surgery.Procedure {
		/**
		 * @param {FC.SlaveState} slave
		 * @param {string} procedureName
		 * @param {number} amount
		 */
		constructor(slave, procedureName, amount) {
			super(slave);
			this._procedureName = capFirstChar(procedureName);
			this._amount = amount;
		}

		get name() {
			return `${this._procedureName} boobs`;
		}

		get description() {
			const {his} = getPronouns(this._slave);
			return `${this._procedureName} ${his} boobs`;
		}

		get healthCost() { return 5; }

		get changeValue() { return -this._amount; }

		apply(cheat) {
			this._slave.boobs -= this._amount;

			applyBoobsLoss(this._slave);

			return this._assemble(new App.Medicine.Surgery.Reactions.BoobsLoss());
		}
	}

	return {
		install: (slave, type, size, fleshExcess) =>
			makeBoobProcedure(App.Medicine.Surgery.Procedures.InstallSizingImplantProcedure, [slave, "boobs", type, size, fleshExcess]),
		replace: (slave, type, size, fleshExcess) =>
			makeBoobProcedure(App.Medicine.Surgery.Procedures.ReplaceSizingImplantProcedure, [slave, "boobs", type, size, fleshExcess]),
		remove: (slave) =>
			makeBoobProcedure(App.Medicine.Surgery.Procedures.RemoveSizingImplantProcedure, [slave, "boobs"]),

		fill: (slave, amount) =>
			makeBoobProcedure(App.Medicine.Surgery.Procedures.FillSizingImplantProcedure, [slave, "boobs", amount]),
		drain: (slave, amount) =>
			makeBoobProcedure(App.Medicine.Surgery.Procedures.DrainSizingImplantProcedure, [slave, "boobs", amount]),

		reduce: (slave, name, amount) => new Reduce(slave, name, amount)
	};
}();
