App.Medicine.Surgery.SimpleReaction = class {
	/**
	 * If a surgery was invasive a slave can die, but high player skill also has a positive effect on the slaves health
	 * @returns {boolean}
	 */
	get invasive() { return true; }

	get removeJob() { return false; }

	get permanentChanges() { return true; }

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	_hasEmotion(slave) { return slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0; }

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.Fetish} fetish
	 * @returns {boolean}
	 * @protected
	 */
	_strongKnownFetish(slave, fetish) {
		return (slave.fetish === fetish && slave.fetishStrength > 60 && slave.fetishKnown === 1);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Partial<App.Entity.SlaveState>} diff
	 */
	intro(slave, diff) {
		const {he, his, himself} = getPronouns(slave);
		const r = [];

		r.push(`As the remote surgery's long recovery cycle completes, ${slave.slaveName}`);
		if (!hasAnyLegs(slave)) {
			r.push(`is carried`);
		} else if (canWalk(slave)) {
			r.push(`walks`);
		} else {
			r.push(`is escorted`);
		}
		r.push(`out of the surgery room`);
		if (canSee(slave)) {
			r.push(`and catches sight of ${himself} in the floor-length mirror outside the door.`);
		} else {
			r.push(`and is detailed the modifications done to ${his} body, assuming ${he} hasn't already realized them.`);
		}

		return r;
	}

	/**
	 * @typedef {object} reactionResult
	 * @property {Array<Array<string|HTMLElement>>} longReaction can contain HTML, every array is a new paragraph. Shown when manually applied.
	 * @property {Array<string|HTMLElement>} shortReaction can contain HTML. May be empty. Intended for use with RA.
	 * @property {number} devotion 0 means no change
	 * @property {number} trust 0 means no change
	 */

	/**
	 * @returns {reactionResult}
	 * @protected
	 */
	_createReactionResult() {
		return {
			longReaction: [],
			shortReaction: [],
			devotion: 0,
			trust: 0,
		};
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Partial<App.Entity.SlaveState>} diff
	 * @returns {reactionResult}
	 */
	reaction(slave, diff) {
		return this._createReactionResult();
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {Partial<App.Entity.SlaveState>} diff
	 * @param {reactionResult} previousReaction
	 * @returns {reactionResult}
	 */
	outro(slave, diff, previousReaction) {
		const reaction = this._createReactionResult();
		if (V.PC.skill.medicine < 100) {
			return reaction;
		}

		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];
		if (this.invasive) {
			r.push(`Since you <span class="springgreen">performed the surgery yourself,</span> and you do an artist's work, ${his} health is <span class="health inc">less affected</span> by the surgery than it would have been if you'd paid some hack to do it remotely.`);
			improveCondition(slave, 5);
		}
		if (this._hasEmotion(slave)) {
			r.push(`${He} spent the surgery very aware that you were performing it personally.`);
			if (reaction.devotion < 0) {
				if (slave.devotion > 50) {
					r.push(`Though ${he} is unhappy with the results, ${he} consoles ${himself} with the knowledge that you cared enough to do it personally.`);
				} else if (slave.devotion >= -20) {
					r.push(`${He} is <span class="gold">even more afraid</span> of you afterward than ${he} would otherwise be. You must seem a cruel and near-omnipotent power to ${him}.`);
					reaction.trust -= 5;
				} else {
					r.push(`${He} is <span class="mediumorchid">even more hateful</span> of you afterward than ${he} would otherwise be. It must seem to ${him} that ${he}'s nothing more than a test subject to you.`);
					reaction.devotion -= 5;
				}
			} else if (this.permanentChanges) {
				if (slave.devotion > 50) {
					r.push(`Since ${he}'s happy with the results, ${he}'s almost beside ${himself} with <span class="hotpink">gratitude,</span> and filled with <span class="mediumaquamarine">admiration</span> of your skill.`);
					reaction.devotion += 4;
					reaction.trust += 4;
				} else if (slave.devotion >= -20) {
					r.push(`${He} is quite struck by how you performed the surgery personally. ${He} admires your refusal to be one of the idle rich, and <span class="hotpink">likes you more.</span>`);
					reaction.devotion += 5;
				} else {
					r.push(`${He} knows that ${he} should be grateful to you for performing the surgery personally, but the emotional turmoil of the occasion is too much for ${him}, and the realization makes little lasting impact.`);
				}
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

/**
 * @type {Map<string, App.Medicine.Surgery.Reaction>}
 */
App.Medicine.Surgery.ReactionsMap = new Map();

App.Medicine.Surgery.Reaction = class extends App.Medicine.Surgery.SimpleReaction {
	constructor() {
		super();
		// Don't allow overwriting.
		if (App.Medicine.Surgery.ReactionsMap.has(this.key)) {
			throw new Error(`Key "${this.key}" already exists.`);
		}
		App.Medicine.Surgery.ReactionsMap.set(this.key, this);
	}

	// eslint-disable-next-line jsdoc/require-returns-check
	/**
	 * @returns {string}
	 */
	get key() { throw new Error("Method 'key()' must be implemented."); }
};
