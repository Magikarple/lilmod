App.Medicine.Surgery.Reactions.Race = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			if (canSee(slave)) {
				r.push(`${He} pauses when ${he} sees the changes to ${his} body, unable to comprehend them.`);
			} else {
				r.push(`${He} can't discern the changes to ${his} race and likely never will.`);
			}
			r.push(`As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines ${his} new self in the mirror`);
			} else if (canHear(slave)) {
				r.push(`listens to the description of ${his} new self`);
			} else {
				r.push(`gets a feel for the changes to ${his} body`);
			}
			r.push(`with approval.`);
			if (diff.race === slave.origRace) {
				r.push(`${He} recognizes ${himself} as ${he} was, and`);
			} else {
				r.push(`${He} doesn't recognize ${himself} quite yet, but`);
			}
			r.push(`${he} hopes you'll like ${his} new appearance better and use ${him} more frequently as a result. <span class="devotion inc">${He}'s happy with your changes to ${his} racial appearance.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines ${his} new self in the mirror`);
			} else if (canHear(slave)) {
				r.push(`listens to the description of ${his} new self`);
			} else {
				r.push(`gets a feel for the changes to ${his} body`);
			}
			r.push(`with hesitation.`);
			if (diff.race === slave.origRace) {
				r.push(`${He} recognizes ${himself} as ${he} was, and`);
			} else {
				r.push(`${He} doesn't recognize ${himself} quite yet, but`);
			}
			r.push(`${he} hopes you'll like ${his} new appearance better and treat ${him} more kindly as a result. As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines ${his} new self in the mirror`);
			} else if (canHear(slave)) {
				r.push(`listens to the description of ${his} new self`);
			} else {
				r.push(`gets a feel for the changes to ${his} body`);
			}
			r.push(`with revulsion.`);
			if (diff.race === slave.origRace) {
				r.push(`${He} recognizes ${himself} as ${he} was, which ${he} loves, and`);
			} else {
				r.push(`${He} doesn't recognize ${himself} quite yet, which ${he} hates, though`);
			}
			r.push(`${he} hopes you'll like ${his} new appearance better and punish ${him} less cruelly as a result. For now, <span class="devotion dec">${he} seems to view this`);
			if (diff.race !== slave.origRace) {
				r.push(`fake`);
			}
			r.push(`racial appearance as a cruel imposition.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Race = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.Race} race
	 */
	constructor(slave, race) {
		super(slave);
		this.race = race;
	}

	get name() {
		return App.Data.misc.filterRaces.get(this.race);
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.race = this.race;
		this._slave.skin = randomRaceSkin(this.race);
		this._slave.hColor = randomRaceHair(this.race);
		setEyeColor(this._slave, randomRaceEye(this.race));
		return this._assemble(new App.Medicine.Surgery.Reactions.Race());
	}
};
