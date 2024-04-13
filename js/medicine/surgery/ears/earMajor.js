App.Medicine.Surgery.Reactions.EarMajor = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little reaction to ${his} altered ears. Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			if (canSee(slave)) {
				r.push(`${He} looks in the mirror and turns ${his} head side to side admiring ${his} new ears and they twitch in response, surprising ${him},`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache that ${his} ears have been extensively modified,`);
			}
			if (hasAnyArms(slave)) {
				r.push(`they're still a bit sore, but ${he} reaches up to feel them gently`);
			}
			r.push(`${he} turns to you with a smile, tilting ${his} head at various angles to show them off. ${His} new ears seem to respond to ${his} emotional state, with time and mild electro-stimulation ${he} will learn to control ${his} new ear muscles so ${he} can move them at will, for now ${he} seems to think ${his} new ears are <span class="devotion inc">cute.</span> Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new ears disapprovingly and they twitch slightly in response.`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache that ${his} ears have been extensively modified.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still a bit sore, but ${he} reaches up to feel them gently.`);
			}
			r.push(`${His} new ears seem to respond to ${his} emotional state, with time and mild electro-stimulation ${he} will learn to control ${his} new ear muscles so ${he} can move them at will. ${He}'s come to terms with the fact that ${he}'s a slave, but ${he} is still somewhat angry that you would go this far. Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new ears with disgust and they twitch slightly in response.`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache that ${his} ears have been extensively modified.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still a bit sore, but ${he} reaches up to feel them gently.`);
			}
			r.push(`${His} new ears seem to respond to ${his} emotional state, with time and mild electro-stimulation ${he} will learn to control ${his} new ear muscles so ${he} can move them at will. For now, <span class="devotion dec">${he} seems to view ${his} altered ears as a cruel imposition.</span> Since the surgery was fairly invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.EarMajorReshape = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} shapeName
	 * @param {FC.EarShape} newShape
	 */
	constructor(slave, shapeName, newShape) {
		super(slave);
		this.shapeName = shapeName;
		this.targetShape = newShape;
	}

	get name() {
		return `Reshape into ${this.shapeName} ears`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.earShape = this.targetShape;
		return this._assemble(new App.Medicine.Surgery.Reactions.EarMajor());
	}
};


App.Medicine.Surgery.Procedures.TopEarReshape = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.EarTopType} newShape
	 */
	constructor(slave, newShape) {
		super(slave);
		this.newShape = newShape;
	}

	get name() {
		return `Reshape into ${this.newShape} ears`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.earT = this.newShape;
		return this._assemble(new App.Medicine.Surgery.Reactions.EarMajor());
	}
};
