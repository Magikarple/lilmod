App.Medicine.Surgery.Reactions.Lips = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} vaguely realizes ${his} mouth doesn't move as well as it used to. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 20 && this._strongKnownFetish(slave, Fetish.CUMSLUT)) {
			r.push(`${He} licks ${his} new lips experimentally but doesn't lose much time before turning to you with ${his} mouth open and ready. ${He}'s still sore, so ${he}'s careful, but ${he} runs ${his} wet tongue over ${his} lips, already panting at the thought of sucking dick. If ${he} had much in the way of oral skills, <span class="stat drop">they've likely suffered.</span> <span class="devotion inc">${He}'s happy with your changes to ${his} lips,</span> so much so that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 4;
			if (slave.skill.oral > 10) {
				slave.skill.oral -= 10;
			}
		} else if (slave.devotion > 50) {
			r.push(`${He} puckers ${his} new lips experimentally and turns to you with a smile to show them off. ${He}'s still sore, so ${he}'s careful as ${he} blows you an awkward kiss. If ${he} had much in the way of oral skills, <span class="stat drop">they've likely suffered.</span> <span class="devotion inc">${He}'s happy with your changes to ${his} lips.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
			if (slave.skill.oral > 10) {
				slave.skill.oral -= 10;
			}
		} else if (slave.devotion >= -20) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`eyes`);
			} else {
				r.push(`puckers`);
			}
			r.push(`${his} new lips skeptically. ${He}'s still sore, so ${he} doesn't touch them. ${He}'s come to terms with the fact that ${he}'s a slave, so ${he} expected something like this when ${he} was sent to the surgery. ${He} isn't much affected mentally, <span class="stat drop">but if ${he} had much in the way of oral skills, they've likely suffered.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			if (slave.skill.oral > 10) {
				slave.skill.oral -= 10;
			}
		} else {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`eyes`);
			} else {
				r.push(`puckers`);
			}
			r.push(`${his} new lips with resentment. ${He}'s still sore, so ${he} doesn't touch them, but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}. ${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. If ${he} had much in the way of oral skills, <span class="stat drop">they've likely suffered.</span> For now, <span class="devotion dec">${he} seems to view these fake lips as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
			if (slave.skill.oral > 10) {
				slave.skill.oral -= 10;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

/**
 * @type {FC.Medicine.AssetSizingProcedureSet}
 */
App.Medicine.Surgery.Procedures.lipImplantProcedure = function() {
	class Fill extends App.Medicine.Surgery.Procedures.FillSizingImplantProcedure {
		get name() {
			return "Replace with the next size up";
		}
	}

	/**
	 * @template {FC.Medicine.SizingImplantProcedureConstructor} T
	 * @param {T} Procedure
	 * @param {ConstructorParameters<T>} args
	 */
	function makeProcedure(Procedure, args) {
		return new (class extends Procedure {
			_doTargetGain() {
				return new App.Medicine.Surgery.Reactions.Lips();
			}

			_doTargetLoss() {
				return new App.Medicine.Surgery.Reactions.Lips();
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
				return App.Utils.expandHTML(`${Math.round(100.0 * volume / App.Medicine.fleshSize(this.originalSlave, "lips"))}&thinsp;%`);
			}

			// overridden because slaves do not have the lipsImplantType property (yet?)
			_setSlaveImplantType() {}
		})(...args);
	}

	class Reduce extends App.Medicine.Surgery.Procedure {
		/**
		 * @param {FC.SlaveState} slave
		 * @param {string} name
		 * @param {number} amount
		 */
		constructor(slave, name, amount) {
			super(slave);
			this._name = name;
			this._amount = amount;
		}

		get name() {
			return `${this._name.toUpperFirst()} lips`;
		}

		get healthCost() {
			return 10;
		}

		apply(cheat) {
			this._slave.lips -= this._amount;
			return this._assemble(new App.Medicine.Surgery.Reactions.Lips());
		}
	}

	return {
		install: (slave, type, size, fleshExcess) =>
			makeProcedure(App.Medicine.Surgery.Procedures.InstallSizingImplantProcedure, [slave, "lips", type, size, fleshExcess]),
		replace: (slave, type, size, fleshExcess) =>
			makeProcedure(App.Medicine.Surgery.Procedures.ReplaceSizingImplantProcedure, [slave, "lips", type, size, fleshExcess]),
		remove: (slave) =>
			makeProcedure(App.Medicine.Surgery.Procedures.RemoveSizingImplantProcedure, [slave, "lips"]),

		fill: (slave, amount) =>
			makeProcedure(Fill, [slave, "lips", amount]),
		drain: (slave, amount) =>
			makeProcedure(App.Medicine.Surgery.Procedures.DrainSizingImplantProcedure, [slave, "lips", amount]),

		reduce: (slave, name, amount) => new Reduce(slave, name, amount)
	};
}();
