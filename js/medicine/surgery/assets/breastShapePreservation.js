App.Medicine.Surgery.Reactions.BreastShapePreservation = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		r.push(`${He} notices almost immediately the immense soreness in ${his} breasts. ${He} can't find anything off about them, but ${he} knows you did something to them. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.BreastShapePreservationFailure = class extends App.Medicine.Surgery.SimpleReaction {
	intro(slave) {
		return [];
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];
		const heGlaresDaggers = (canSee(slave)) ? `${he} glares daggers` : `${his} face contorts with distaste`;

		function areolaeAndNipples() {
			if (slave.areolae > 2) {
				r.push(`The emergency mastectomy also <span class="change negative">slightly reduces ${his} massive areolae.</span>`);
			}
			if (slave.nipples === NippleShape.HUGE) {
				r.push(`The emergency mastectomy also <span class="change negative">slightly reduces ${his} massive nipples.</span>`);
			} else if (slave.nipples === NippleShape.FUCKABLE) {
				r.push(`Without the tissue needed to support their unusual shape, ${his} fuckable nipples have reverted <span class="change negative">to being huge and protruding.</span>`);
			} else if (slave.nipples === NippleShape.FLAT) {
				r.push(`Without the ${his} massive implants forcing them flat, ${his} nipples have reverted <span class="change positive">to being huge and protruding.</span>`);
			}
		}

		function movement() {
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
		}

		reaction.shortReaction.push(`mesh implantation <span class="health dec">has gone wrong, resulting in a mastectomy!</span>`);

		r.push(`${slave.slaveName}'s mesh implantation <span class="health dec">has gone wrong, resulting in a mastectomy!</span>`);
		if (slave.boobs >= 7000) {
			areolaeAndNipples();
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			} else if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
				if (canSee(slave)) {
					r.push(`${He} can hardly believe what ${he} is seeing. The immense bust ${he} managed to grow has been all but stripped from ${him}. ${His} face fills with disbelief as ${his} flatness dawns on ${him}.`);
				} else {
					r.push(`${He} immediately notices the lack of an immense weight hanging off ${his} chest. ${His} face fills with disbelief as ${his} flatness dawns on ${him}.`);
				}
				movement();
				r.push(`${He} loved ${his} enormous breasts, and now that they are gone, ${he} has nothing to live for. <span class="mindbreak">Your apparent theft of ${his} obsession has broken ${his} mind.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
				applyMindbroken(slave);
				reaction.shortReaction.push(`It broke ${his} mind.`);
			} else if (this._strongKnownFetish(slave, Fetish.BOOBS) && slave.devotion <= 20) {
				if (canSee(slave)) {
					r.push(`${He} can hardly believe what ${he} is seeing. ${His} once magnificent, immense bust has been all but stripped from ${him}. ${His} face fills with resentment as ${his} flatness dawns on ${him}.`);
				} else {
					r.push(`${He} immediately notices the lack of an immense weight hanging off ${his} chest. ${His} face fills with resentment as ${his} flatness dawns on ${him}.`);
				}
				if (hasAnyArms(slave)) {
					r.push(`${He}'s still sore, so ${he} doesn't touch them, but ${heGlaresDaggers}.`);
				} else {
					r.push(`${He}'s still sore, so ${he} keeps ${his} torso still, but ${heGlaresDaggers}.`);
				}
				r.push(`${He} loved ${his} enormous breasts, and they were apparently swiped from off ${his} chest by the person ${he} was just beginning to entrust ${himself} to. <span class="devotion dec">${He} sees this as a betrayal by you.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> that you may chose to steal something else ${he} loves, even though it was your intent to preserve them.`);
				reaction.trust -= 40;
				reaction.devotion -= 20;
			} else if (slave.devotion > 50) {
				if (hasAnyArms(slave)) {
					r.push(`${He} hefts ${his} new, tiny breasts experimentally and turns to you with a smile to show off ${his} new, slimmer form, completely unaware this wasn't your intent. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see them from all angles.`);
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
				r.push(`${He}'s come to terms with the fact that ${he}'s a slave, but both your and ${him} expected something other than this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust inc">thankful</span> that you removed the literal weight off ${his} chest.`);
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
				r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every supposed whim. For now, <span class="devotion inc">${he} seems appreciative of this literal weight lifted from ${his} chest</span> and <span class="trust inc">is thankful for your consideration of ${his} health,</span> though it may be short lived. As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
				reaction.trust += 10;
				reaction.devotion += 5;
			}
		} else {
			areolaeAndNipples();
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			} else if (slave.sexualFlaw === SexualFlaw.BREASTEXP) {
				if (canSee(slave)) {
					r.push(`${He} can hardly believe what ${he} is seeing. ${His} once glorious bust has been all but stripped from ${him}. ${His} face fills with disbelief as ${his} flatness dawns on ${him}.`);
				} else {
					r.push(`${He} immediately notices the lack of an immense weight hanging off ${his} chest. ${His} face fills with disbelief as ${his} flatness dawns on ${him}.`);
				}
				movement();
				r.push(`${He} loved ${his} huge breasts, and now that they are gone, ${he} has nothing to live for. <span class="mindbreak">Your theft of ${his} obsession has broken ${his} mind.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
				applyMindbroken(slave);
				reaction.shortReaction.push(`It broke ${his} mind.`);
			} else if (this._strongKnownFetish(slave, Fetish.BOOBS) && slave.devotion <= 20) {
				if (canSee(slave)) {
					r.push(`${He} can hardly believe what ${he} is seeing. ${His} once magnificent bust has been all but stripped from ${him}. ${His} face fills with resentment as ${his} flatness dawns on ${him}.`);
				} else {
					r.push(`${He} immediately notices the lack of an immense weight hanging off ${his} chest. ${His} face fills with resentment as ${his} flatness dawns on ${him}.`);
				}
				if (hasAnyArms(slave)) {
					r.push(`${He}'s still sore, so ${he} doesn't touch them, but ${heGlaresDaggers}.`);
				} else {
					r.push(`${He}'s still sore, so ${he} keeps ${his} torso still, but ${heGlaresDaggers}.`);
				}
				r.push(`${He} loved ${his} huge breasts, and they were apparently swiped from off ${his} chest by the person ${he} was just beginning to entrust ${himself} to. <span class="devotion dec">${He} sees this as a betrayal by you.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> that you may chose to steal something else ${he} loves, even though it was your intent to preserve them.`);
				reaction.trust -= 40;
				reaction.devotion -= 20;
			} else if (slave.devotion > 50) {
				if (hasAnyArms(slave)) {
					r.push(`${He} hefts ${his} new, tiny breasts experimentally and turns to you with a smile to show off ${his} new, slimmer form, completely unaware this wasn't your intent. ${He}'s still sore, so ${he} doesn't bounce or squeeze, but ${he} turns from side to side to let you see them from all angles.`);
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
				r.push(`${He}'s come to terms with the fact that ${he}'s a slave, but both your and ${him} expected something other than this when ${he} was sent to the surgery. ${He} isn't much affected mentally. As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
				reaction.trust -= 5;
			} else {
				if (canSee(slave)) {
					r.push(`${He} eyes the sudden lack of ${his} former breasts with resentment.`);
				} else {
					r.push(`The sudden lack of weight on ${his} chest fills ${him} with resentment.`);
				}
				if (hasAnyArms(slave)) {
					r.push(`${He}'s still sore, so ${he} doesn't touch them, but ${heGlaresDaggers}.`);
				} else {
					r.push(`${He}'s still sore, so ${he} keeps ${his} torso still, but ${heGlaresDaggers}.`);
				}
				r.push(`${He} still thinks of ${himself} as a person, so ${he} isn't used to the idea of being surgically altered to suit your every whim. For now, <span class="devotion dec">${he} seems to view this apparent surgical theft as a cruel imposition.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
				reaction.trust -= 10;
				reaction.devotion -= 5;
			}
		}
		reaction.longReaction.push(r);

		return reaction;
	}

	outro(slave, previousReaction) {
		return this._createReactionResult();
	}
};


App.Medicine.Surgery.Procedures.BreastShapePreservation = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant a supportive mesh to preserve their shape";
	}

	get _workCost() {
		return this.originalSlave.boobs / 100;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		// if health - boobs/1000 < random(-100, -70)
		if (this._slave.health.condition - this._slave.boobs / 1000 < (Math.random() * 30 - 100)) {
			// failure
			this._slave.breastMesh = 0;
			// additional unexpected damage
			surgeryDamage(this._slave, 30);
			cashX(V.surgeryCost, "slaveSurgery", this._slave);
			// breasts are gone
			this._slave.boobs = 300;
			if (this._slave.areolae > 2) {
				this._slave.areolae -= 1;
			}
			if (this._slave.nipples === NippleShape.HUGE) {
				this._slave.nipples = NippleShape.PUFFY;
			} else if (this._slave.nipples === NippleShape.FUCKABLE) {
				this._slave.nipples = NippleShape.HUGE;
			} else if (this._slave.nipples === NippleShape.FLAT) {
				this._slave.nipples = NippleShape.HUGE;
			}
			return this._assemble(new App.Medicine.Surgery.Reactions.BreastShapePreservationFailure());
		} else {
			// success
			this._slave.breastMesh = 1;
			return this._assemble(new App.Medicine.Surgery.Reactions.BreastShapePreservation());
		}
	}
};
