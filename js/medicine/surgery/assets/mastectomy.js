App.Medicine.Surgery.Reactions.Mastectomy = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {his} = getPronouns(slave);
		const r = [];

		if (slave.boobShape === BreastShape.SAGGY) {
			r.push(`As excess skin and flesh was removed from ${his} breasts, care was taken to <span class="lime">reshape ${his} boobs to be nice and perky.</span>`);
		}
		if (slave.areolae > 2) {
			r.push(`The breast reduction surgery also <span class="orange">slightly reduces ${his} massive areolae.</span>`);
		}
		if (slave.nipples === NippleShape.HUGE) {
			r.push(`The breast reduction surgery also <span class="orange">slightly reduces ${his} massive nipples.</span>`);
		} else if (slave.nipples === NippleShape.FLAT) {
			r.push(`Without the ${his} massive implants forcing them flat, ${his} nipples have reverted <span class="lime">to being huge and protruding.</span>`);
		} else if (slave.nipples === NippleShape.FUCKABLE) {
			r.push(`Without the tissue needed to support their unusual shape, ${his} fuckable nipples have reverted <span class="orange">to being huge and protruding.</span>`);
		}

		if (slave.boobs >= 7000) {
			this._largeMastectomy(slave, r, reaction);
		} else {
			this._normalMastectomy(slave, r, reaction);
		}

		return reaction;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string[]} r
	 * @param {reactionResult} reaction
	 * @private
	 */
	_normalMastectomy(slave, r, reaction) {
		const {He, he, His, his, him, himself} = getPronouns(slave);

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little awareness that ${his} breasts are gone. As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
		} else if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
			if (canSee(slave)) {
				r.push(`${He} can hardly believe what ${he} is seeing. ${His} once glorious bust has been all but stripped from ${him}. ${His} face fills with disbelief as ${his} flatness dawns on ${him}.`);
			} else {
				r.push(`${He} immediately notices the lack of an immense weight hanging off ${his} chest. ${His} face fills with disbelief as ${his} flatness dawns on ${him}.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${His}`);
				if (!hasBothArms(slave)) {
					r.push(`hands immediately dart`);
				} else {
					r.push(`hand immediately darts`);
				}
				r.push(`to grope ${his} tits, but ${he} only ends up grabbing air. ${His} face twitches, ${his} mind unable to comprehend why this has happened to ${him}. ${His}`);
				if (!hasBothArms(slave)) {
					r.push(`hand falls to ${his} side`);
				} else {
					r.push(`hands fall to ${his} sides`);
				}
				r.push(`as ${his} will breaks.`);
			} else {
				r.push(`${He} tries to squirm, and finds ${he} is no longer pinned by ${his} tits. ${His} face twitches, ${his} mind unable to comprehend why this has happened to ${him}. ${He} sobs once as ${his} will to go on breaks apart.`);
			}
			r.push(`${He} loved ${his} huge breasts, and now that they are gone, ${he} has nothing to live for. <span class="red">Your theft of ${his} obsession has broken ${his} mind.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			applyMindbroken(slave);
			reaction.shortReaction.push(`${His} mind <span class="mindbreak">broke.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.BOOBS) && slave.devotion <= 20) {
			if (canSee(slave)) {
				r.push(`${He} can hardly believe what ${he} is seeing. ${His} once magnificent bust has been all but stripped from ${him}. ${His} face fills with resentment as ${his} flatness dawns on ${him}.`);
			} else {
				r.push(`${He} immediately notices the lack of an immense weight hanging off ${his} chest. ${His} face fills with resentment as ${his} flatness dawns on ${him}.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them,`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still,`);
			}
			r.push(`but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}.`);
			r.push(`${He} loved ${his} huge breasts, and they were swiped from off ${his} chest by the person ${he} was just beginning to entrust ${himself} to. <span class="devotion dec">${He} sees this as a betrayal by you.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> that you may chose to steal something else ${he} loves.`);
			reaction.trust -= 40;
			reaction.devotion -= 20;
		} else if (slave.devotion > 50) {
			if (hasAnyArms(slave)) {
				r.push(`${He} hefts ${his} new, tiny breasts experimentally and turns to you with a smile to show off ${his} new, slimmer form. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see them from all angles.`);
			} else {
				r.push(`${He} bounces a little to feel ${his} tiny breasts move and turns ${his} torso to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't bounce too much.`);
			}
			r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} boobs.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new, tiny breasts skeptically.`);
			} else {
				r.push(`${He} attempts to sway ${his} big tits experimentally, only to find ${his} chest barely moves at all.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, but ${he} expected something other than this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes the sudden lack of ${his} former breasts with resentment.`);
			} else {
				r.push(`The sudden lack of weight on ${his} chest fills ${him} with resentment.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them,`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still,`);
			}
			r.push(`but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}.`);
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this surgical theft as a cruel imposition.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}
		reaction.longReaction.push(r);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string[]} r
	 * @param {reactionResult} reaction
	 * @private
	 */
	_largeMastectomy(slave, r, reaction) {
		const {He, he, His, his, him, himself} = getPronouns(slave);

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little awareness that ${his} breasts are gone, despite such a massive change. As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
		} else if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
			if (canSee(slave)) {
				r.push(`${He} can hardly believe what ${he} is seeing. The immense bust ${he} managed to grow has been all but stripped from ${him}. ${His} face fills with disbelief as ${his} flatness dawns on ${him}.`);
			} else {
				r.push(`${He} immediately notices the lack of an immense weight hanging off ${his} chest. ${His} face fills with disbelief as ${his} flatness dawns on ${him}.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${His}`);
				if (!hasBothArms(slave)) {
					r.push(`hands immediately dart`);
				} else {
					r.push(`hand immediately darts`);
				}
				r.push(`to grope ${his} tits, but ${he} only ends up grabbing air. ${His} face twitches, ${his} mind unable to comprehend why this has happened to ${him}. ${His}`);
				if (!hasBothArms(slave)) {
					r.push(`hand falls to ${his} side`);
				} else {
					r.push(`hands fall to ${his} sides`);
				}
				r.push(`as ${his} will breaks.`);
			} else {
				r.push(`${He} tries to squirm, and finds ${he} is no longer pinned by ${his} tits. ${His} face twitches, ${his} mind unable to comprehend why this has happened to ${him}. ${He} sobs once as ${his} will to go on breaks apart.`);
			}
			r.push(`${He} loved ${his} enormous breasts, and now that they are gone, ${he} has nothing to live for. <span class="red">Your theft of ${his} obsession has broken ${his} mind.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			applyMindbroken(slave);
			reaction.shortReaction.push(`${His} mind <span class="mindbreak">broke.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.BOOBS) && slave.devotion <= 20) {
			if (canSee(slave)) {
				r.push(`${He} can hardly believe what ${he} is seeing. ${His} once magnificent, immense bust has been all but stripped from ${him}. ${His} face fills with resentment as ${his} flatness dawns on ${him}.`);
			} else {
				r.push(`${He} immediately notices the lack of an immense weight hanging off ${his} chest. ${His} face fills with resentment as ${his} flatness dawns on ${him}.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them,`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still,`);
			}
			r.push(`but ${canSee(slave) ? `${he} glares daggers` : `${his} face contorts with distaste`}.`);
			r.push(`${He} loved ${his} enormous breasts, and they were swiped from off ${his} chest by the person ${he} was just beginning to entrust ${himself} to. <span class="devotion dec">${He} sees this as a betrayal by you.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> that you may chose to steal something else ${he} loves.`);
			reaction.trust -= 40;
			reaction.devotion -= 20;
		} else if (slave.devotion > 50) {
			if (hasAnyArms(slave)) {
				r.push(`${He} hefts ${his} new, tiny breasts experimentally and turns to you with a smile to show off ${his} new, slimmer form. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see them from all angles.`);
			} else {
				r.push(`${He} bounces a little to feel ${his} tiny breasts move and turns ${his} torso to you with a smile to show them off. ${He}'s still sore, so ${he} doesn't bounce too much.`);
			}
			r.push(`<span class="devotion inc">${He}'s happy with your changes to ${his} boobs</span> and <span class="trust inc">thankful</span> that you'd consider ${his} health, well-being, and ability to fuck. As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			reaction.devotion += 4;
			reaction.trust += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new, tiny breasts with appreciation.`);
			} else {
				r.push(`${He} attempts to sway ${his} big tits experimentally, only to find ${his} chest barely moves at all.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still.`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, but ${he} expected something other than this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust inc">thankful</span> that you removed the literal weight off ${his} chest.`);
			reaction.trust += 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes the sudden lack of ${his} former breasts with relief.`);
			} else {
				r.push(`The sudden lack of weight on ${his} chest fills ${him} with relief.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`${He}'s still sore, so ${he} doesn't touch them, but ${he} breathes easier without the immense weight hanging from ${him}.`);
			} else {
				r.push(`${He}'s still sore, so ${he} keeps ${his} torso still, but ${he} breathes easier without the immense weight hanging from ${him}.`);
			}
			r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion inc">${he} seems appreciative of this literal weight lifted from ${his} chest</span> and <span class="trust inc">is thankful for your consideration of ${his} health.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			reaction.trust += 10;
			reaction.devotion += 5;
		}

		reaction.longReaction.push(r);
	}
};

App.Medicine.Surgery.Procedures.Mastectomy = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return `Mastectomy`;
	}

	get description() {
		return "Perform Mastectomy";
	}

	get healthCost() { return 30; }

	get changeValue() { return 300 - this._slave.boobs; }

	apply(cheat) {
		if (this._slave.boobShape === BreastShape.SAGGY) {
			this._slave.boobShape = BreastShape.PERKY;
		}
		if (this._slave.areolae > 2) {
			this._slave.areolae -= 1;
		}
		if (this._slave.nipples === NippleShape.HUGE) {
			this._slave.nipples = NippleShape.PUFFY;
		} else if (this._slave.nipples === NippleShape.FLAT) {
			this._slave.nipples = NippleShape.HUGE;
		} else if (this._slave.nipples === NippleShape.FUCKABLE) {
			this._slave.nipples = NippleShape.HUGE;
		}
		this._slave.boobs = 300;

		return this._assemble(new App.Medicine.Surgery.Reactions.Mastectomy());
	}
};
