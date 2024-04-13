App.Medicine.Surgery.Procedure = class {
	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	constructor(slave) {
		/**
		 * @type {FC.Util.DiffRecorder<App.Entity.SlaveState>}
		 * @protected
		 */
		this._slave = App.Utils.Diff.getProxy(slave);
	}

	get originalSlave() {
		return this._slave.diffOriginal;
	}

	// eslint-disable-next-line jsdoc/require-returns-check
	/**
	 * @abstract
	 * @returns {string}
	 */
	get name() { throw new Error("Method 'name()' must be implemented."); }

	/**
	 * Lowercase and without punctuation at the end.
	 *
	 * @returns {string}
	 */
	get description() { return ""; }

	/**
	 * Additional note to put at the bottom of the tooltip
	 * @returns {string | DocumentFragment | HTMLElement}
	 */
	get note() { return null; }

	/**
	 * May die, but high player skill also reduces health impact.
	 *
	 * In some cases the damage may be applied outside the procedure system, the slave would still be able to die
	 * however. In these cases, invasive needs to be overwritten.
	 *
	 * @returns {boolean}
	 */
	get invasive() { return this.healthCost > 0; }

	/**
	 * The monetary cost of the surgery.
	 * @returns {number}
	 */
	get cost() {
		return Math.round(this._materialCost + this._workCost);
	}

	/**
	 * Part of the surgery cost related to the required materials
	 * @protected
	 * @returns {number}
	 */
	get _materialCost() {
		return 0;
	}

	/**
	 * Part of the surgery cost related to the work efforts
	 * This is the default cost. Subclasses should base their cost on this value if modifying it.
	 * @example
	 * get _workCost() {
	 *     // Make the surgery 4 times more expensive
	 *     return super._workCost * 4;
	 * }
	 * @protected
	 * @returns {number}
	 */
	get _workCost() {
		// TODO phase out V.surgeryCost and replace with static calculation
		return V.surgeryCost;
	}

	/**
	 * The health impact of a surgery.
	 * @returns {number}
	 */
	get healthCost() { return 0; }

	/**
	 * The value this surgery applies to the relevant slave property. Used by the RA to evaluate the effectiveness of
	 * the surgery. If numeric, it is the delta change, otherwise the result.
	 * @returns {any}
	 */
	get changeValue() { return null; }

	/**
	 * If there are any entries, the procedure cannot be applied. The reasons are the array entries.
	 * When overwriting always include disabled reasons of superclasses!
	 *
	 * @returns {Array<string>} May contain HTML
	 */
	get disabledReasons() {
		const reasons = [];

		/* disallow surgery for slaves on certain assignments */
		if (this.originalSlave.assignment === Job.AGENT ||
			this.originalSlave.assignment === Job.AGENTPARTNER) {
			const {his, him} = getPronouns(this.originalSlave);
			reasons.push(`You must retrieve ${this.originalSlave.slaveName} from ${his} assignment before performing surgery on ${him}.`);
		}

		return reasons;
	}

	// eslint-disable-next-line jsdoc/require-returns-check
	/**
	 * @param {boolean} cheat
	 * @returns {[Partial<App.Entity.SlaveState>, App.Medicine.Surgery.SimpleReaction]}
	 */
	apply(cheat) { throw new Error("Method 'apply()' must be implemented."); }

	/**
	 * Convenience function to prepare the return value for apply()
	 *
	 * @param {App.Medicine.Surgery.SimpleReaction} reaction
	 * @returns {[Partial<App.Entity.SlaveState>, App.Medicine.Surgery.SimpleReaction]}
	 * @protected
	 */
	_assemble(reaction) {
		return [this._slave.diffChange, reaction];
	}
};
