App.Medicine.Surgery.Reactions.AddBalls = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} lies back in the surgical chair${(canSee(slave)) ? `, gazing at ${himself} in the ceiling mirror` : ``} as the fog of anesthetics lifts and feeling returns to ${his} lower half. ${His} new testicles are small, and ${his} scrotum is scarcely visible under ${his} dick, but its impact becomes immediately clear. ${He} slowly achieves an excruciatingly painful erection, panting with the pain as ${his} very sore member becomes hard. The terrible overstimulation brings a spurt of cum jetting out of ${his} cockhead. As the agony melts away, ${he} struggles to understand what just happened. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} lies back in the surgical chair${(canSee(slave)) ? `, gazing at ${himself} in the ceiling mirror` : ``} as the fog of anesthetics lifts and feeling returns to ${his} lower half. As a devoted slave, ${he} knew the essentials of the surgery before it was performed, so ${he}'s excited to`);
			if (canSee(slave)) {
				r.push(`see`);
			} else {
				r.push(`feel`);
			}
			r.push(`the result. ${His} new testicles are small, and ${his} scrotum is scarcely visible under ${his} dick, but its impact becomes immediately clear. ${He} slowly achieves an excruciatingly painful erection, panting with the pain as ${his} very sore member becomes hard. The terrible overstimulation brings a spurt of cum jetting out of ${his} cockhead. As the agony melts away, ${he} begins to giggle. ${He} is <span class="trust inc">tremendously impressed</span> that you would devote such immense resources to altering ${his} body, and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 5;
			reaction.devotion += 5;
		} else if (slave.devotion >= -20) {
			r.push(`${He} lies back in the surgical chair${(canSee(slave)) ? `, gazing at ${himself} in the ceiling mirror` : ``} as the fog of anesthetics lifts and feeling returns to ${his} lower half. ${He} cannot quite feel what has happened to ${him} yet, but ${he} does not have long to wait. ${His} new testicles are small, and ${his} scrotum is scarcely visible under ${his} dick, but its impact becomes immediately clear. ${He} slowly achieves an excruciatingly painful erection, panting with the pain as ${his} very sore member becomes hard. The terrible overstimulation brings a spurt of cum jetting out of ${his} cockhead. As the agony melts away, the rush of new hormones clashes with ${his} already roiling emotions, and ${he} begins to sob. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, so much so that ${he} is now more willing to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion += 5;
		} else {
			r.push(`The autosurgery allows ${him} to recover for a while. Once it's safe, though, it's time to test the function of ${his} new organs by seeing if they permit ${him} to achieve erection. The surgery slowly inserts a dildo into ${his} anus; the slave is so fuzzy from the surgery and accompanying drugs that it takes a while for the machine assfuck to register. Gradually, though, ${his} new dick becomes hard. Horrified, ${he} cannot take ${his}`);
			if (canSee(slave)) {
				r.push(`eyes off ${his} own reflection in the ceiling mirror`);
			} else {
				r.push(`mind off ${his} soft cock`);
			}
			r.push(`as it bobs and waves with the sodomy. A delayed reaction sets in as the soreness of surgical recovery competes with the stimulation:`);
			if (canTalk(slave, false)) {
				r.push(`${he} howls with pain and terror`);
			} else {
				r.push(`${he} tries to scream, but only manages to gasp repeatedly`);
			}
			r.push(`as the dildo forces a weak prostate orgasm. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, and <span class="devotion dec">furious</span> at ${his} lack of control over ${his} own person. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}


		reaction.longReaction.push(r);
		return reaction;
	}
};
App.Medicine.Surgery.Reactions.AddAnimalBalls = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		// TODO: This will require a rewrite

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} lies back in the surgical chair${(canSee(slave)) ? `, gazing at ${himself} in the ceiling mirror` : ``} as the fog of anesthetics lifts and feeling returns to ${his} lower half. ${His} new testicles are small, and ${his} scrotum is scarcely visible under ${his} dick, but its impact becomes immediately clear. ${He} slowly achieves an excruciatingly painful erection, panting with the pain as ${his} very sore member becomes hard. The terrible overstimulation brings a spurt of cum jetting out of ${his} cockhead. As the agony melts away, ${he} struggles to understand what just happened. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} lies back in the surgical chair${(canSee(slave)) ? `, gazing at ${himself} in the ceiling mirror` : ``} as the fog of anesthetics lifts and feeling returns to ${his} lower half. As a devoted slave, ${he} knew the essentials of the surgery before it was performed, so ${he}'s excited to`);
			if (canSee(slave)) {
				r.push(`see`);
			} else {
				r.push(`feel`);
			}
			r.push(`the result. ${His} new testicles are small, and ${his} scrotum is scarcely visible under ${his} dick, but its impact becomes immediately clear. ${He} slowly achieves an excruciatingly painful erection, panting with the pain as ${his} very sore member becomes hard. The terrible overstimulation brings a spurt of cum jetting out of ${his} cockhead. As the agony melts away, ${he} begins to giggle. ${He} is <span class="trust inc">tremendously impressed</span> that you would devote such immense resources to altering ${his} body, and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 5;
			reaction.devotion += 5;
		} else if (slave.devotion >= -20) {
			r.push(`${He} lies back in the surgical chair${(canSee(slave)) ? `, gazing at ${himself} in the ceiling mirror` : ``} as the fog of anesthetics lifts and feeling returns to ${his} lower half. ${He} cannot quite feel what has happened to ${him} yet, but ${he} does not have long to wait. ${His} new testicles are small, and ${his} scrotum is scarcely visible under ${his} dick, but its impact becomes immediately clear. ${He} slowly achieves an excruciatingly painful erection, panting with the pain as ${his} very sore member becomes hard. The terrible overstimulation brings a spurt of cum jetting out of ${his} cockhead. As the agony melts away, the rush of new hormones clashes with ${his} already roiling emotions, and ${he} begins to sob. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, so much so that ${he} is now more willing to <span class="devotion inc">submit to your plans</span> for ${his} future. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion += 5;
		} else {
			r.push(`The autosurgery allows ${him} to recover for a while. Once it's safe, though, it's time to test the function of ${his} new organs by seeing if they permit ${him} to achieve erection. The surgery slowly inserts a dildo into ${his} anus; the slave is so fuzzy from the surgery and accompanying drugs that it takes a while for the machine assfuck to register. Gradually, though, ${his} new dick becomes hard. Horrified, ${he} cannot take ${his}`);
			if (canSee(slave)) {
				r.push(`eyes off ${his} own reflection in the ceiling mirror`);
			} else {
				r.push(`mind off ${his} soft cock`);
			}
			r.push(`as it bobs and waves with the sodomy. A delayed reaction sets in as the soreness of surgical recovery competes with the stimulation:`);
			if (slave.voice === 0) {
				r.push(`${he} tries to scream, but only manages to gasp repeatedly`);
			} else {
				r.push(`${he} howls with pain and terror`);
			}
			r.push(`as the dildo forces a weak prostate orgasm. ${He} is <span class="trust dec">terrified</span> of your apparently untrammeled power over ${his} body, and <span class="devotion dec">furious</span> at ${his} lack of control over ${his} own person. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFAddBalls = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.AnimalType} ballType
	 */
	constructor(slave, ballType) {
		super(slave);
		this.ballType = ballType;
	}

	get name() {
		return "Implant";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		if (this._slave.prostate === 0) {
			this._slave.prostate = 1;
		}
		this._slave.balls = 2;
		this._slave.ballType = this.ballType;
		this._slave.scrotum = 2;
		if (this._slave.pubertyAgeXY === 0) {
			if (V.precociousPuberty === 1) {
				if (this._slave.physicalAge >= V.potencyAge) {
					this._slave.pubertyAgeXY = this._slave.physicalAge + 1;
				}
			} else {
				if (this._slave.physicalAge >= V.potencyAge) {
					this._slave.pubertyXY = 1;
				}
			}
		}

		if (this.ballType === "human") {
			return this._assemble(new App.Medicine.Surgery.Reactions.AddBalls());
		} else {
			return this._assemble(new App.Medicine.Surgery.Reactions.AddAnimalBalls());
		}
	}
};
