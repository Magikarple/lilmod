App.Medicine.Surgery.Reactions.Amputate = class extends App.Medicine.Surgery.SimpleReaction {
	/**
	 * @param {FC.LimbsState} newLimbs
	 */
	constructor(newLimbs) {
		super();
		this.newLimbs = newLimbs;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {his, him, He, he, himself} = getPronouns(slave);
		let r = [];

		// TODO: add missing cases, improve descriptions

		if (isAmputee(this.newLimbs)) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`Of course, ${he} could not walk out of the surgery; you carried ${him}. ${He} squirms the entire time, trying to move the arms and legs ${he} now lacks. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			} else if (slave.devotion > 50) {
				r.push(`Of course, ${he} could not walk out of the surgery; you carried ${him}. ${He} knows what a slave's life is, but ${he} did not really expect that it would ever come to this for ${him}. After a long, silent`);
				if (canSee(slave)) {
					r.push(`stare at`);
				} else {
					r.push(`consideration of`);
				}
				r.push(`${his} limbless torso, ${he} squares ${his} shoulders and visibly resolves to carry on being a good slave as best ${he} can. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			} else if (slave.devotion > 20) {
				r.push(`Of course, ${he} could not walk out of the surgery; you carried ${him}. Despite ${his} obedience, ${he} cries softly the whole time, shoulder and hip stumps moving occasionally as ${he} reflexively tries to stand — to walk — to touch ${himself} — to gesture — all things that ${he} will never do again. <span class="devotion dec">${He} will struggle greatly with ${his} medically created disability.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">cripplingly afraid</span> of your total power over ${his} body.`);
				reaction.trust -= 20;
				reaction.devotion -= 20;
			} else {
				r.push(`Of course, ${he} could not walk out of the surgery; you carried ${him}. You had a good idea what ${his} reaction would be, so`);
				if (slave.teeth === "removable") {
					r.push(`you removed ${his} teeth`);
				} else {
					r.push(`${he}'s muzzled`);
				}
				r.push(`to prevent ${him} from trying to bite. ${He} sobs convulsively, and ${his}`);
				if (canSee(slave)) {
					r.push(`eyes dart desperately from side to side through ${his} tears, hopelessly imploring the mirror to show ${him} something other than this.`);
				} else {
					r.push(`stumps twitch pathetically with ${his} desperate efforts to move ${his} limbs, to prove there is something other than this.`);
				}
				r.push(`Anything other than this. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terrified to the point of insanity</span> of your total power over ${his} body.`);
				reaction.trust -= 50;
				reaction.devotion -= 50;
			}
		} else {
			if (hasBothLegs(this.newLimbs)) {
				if (hasBothArms(slave) && !hasAnyArms(this.newLimbs)) {
					// both arms removed
					if (!this._hasEmotion(slave)) {
						r.push(`You're there to open the door for ${him} as ${he} exits the surgery. ${He} smiles dumbly at your generosity, already seeming to forget the sensation of touching. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
					} else if (slave.devotion > 50) {
						r.push(`You're there to open the door for ${him} as ${he} exits the surgery. ${He} knows what a slave's life is, but ${he} did not really expect that it would ever come to this for ${him}. After a short, silent`);
						if (canSee(slave)) {
							r.push(`stare at`);
						} else {
							r.push(`consideration of`);
						}
						r.push(`the two stumps that were once ${his} arms, ${he} squares ${his} shoulders and resolves to carry on being a good slave as best ${he} can. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
					} else if (slave.devotion > 20) {
						r.push(`You're there to open the door for ${him} as ${he} exits the surgery. Despite ${his} obedience, ${he} cries softly the whole time, ${his} shoulder stumps occasionally moving as ${he} reflexively tries to grab at ${himself} and ${his} surroundings. <span class="devotion dec">${He} will struggle greatly with ${his} medically created disability.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">extremely afraid</span> of your total power over ${his} body.`);
						reaction.trust -= 15;
						reaction.devotion -= 15;
					} else {
						r.push(`You're there to open the door for ${him} as ${he} exits the surgery. You had a good idea what ${his} reaction would be, so you've made sure to bind ${his} ${(hasBothLegs(slave)) ? `legs` : `leg`} to prevent ${him} from trying to attack you, and`);
						if (slave.teeth === "removable") {
							r.push(`remove ${his} teeth`);
						} else {
							r.push(`muzzle ${him}`);
						}
						r.push(`to prevent ${him} from trying to bite. ${He} sobs convulsively, and ${his}`);
						if (canSee(slave)) {
							r.push(`eyes dart desperately from side to side through ${his} tears, hopelessly imploring the mirror to show ${him} something other than this.`);
						} else {
							r.push(`shoulder stumps twitch pathetically with ${his} desperate efforts to move ${his} arms, to prove there is something other than this.`);
						}
						r.push(`Anything other than this. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">utterly and entirely terrified</span> of your total power over ${his} body.`);
						reaction.trust -= 40;
						reaction.devotion -= 40;
					}
				} else {
					// 1 arm removed
					if (!this._hasEmotion(slave)) {
						r.push(`You're there to help ${him} with the door as ${he} exits the surgery. ${He} smiles dumbly at your generosity, already seeming to forget ${he} ever had another arm. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
					} else if (slave.devotion > 50) {
						r.push(`You're there to help ${him} with the door as ${he} exits the surgery. ${He} knows what a slave's life is, but ${he} did not really expect that it would ever come to this for ${him}. After a short, silent`);
						if (canSee(slave)) {
							r.push(`stare at`);
						} else {
							r.push(`consideration of`);
						}
						r.push(`the stump that was once ${his} arm, ${he} squares ${his} shoulders and resolves to carry on being a good slave as best ${he} can. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
					} else if (slave.devotion > 20) {
						r.push(`You're there to help ${him} with the door as ${he} exits the surgery. Despite ${his} obedience, ${he} cries softly the whole time, the stump at ${his} shoulder occasionally moving as ${he} reflexively tries to grab at ${himself} and ${his} surroundings. <span class="devotion dec">${He} will struggle greatly with ${his} medically created disability.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">immensely afraid</span> of your total power over ${his} body.`);
						reaction.trust -= 8;
						reaction.devotion -= 8;
					} else {
						r.push(`You're there to help ${him} with the door as ${he} exits the surgery. You had a good idea what ${his} reaction would be, so you've made sure to bind ${his} other arm`);
						if (hasAnyLegs(slave)) {
							r.push(`and ${his} ${(hasBothLegs(slave)) ? `legs` : `leg`}`);
						}
						r.push(`to prevent ${him} from trying to attack you, and`);
						if (slave.teeth === "removable") {
							r.push(`remove ${his} teeth`);
						} else {
							r.push(`muzzle ${him}`);
						}
						r.push(`to prevent ${him} from trying to bite. ${He} sobs convulsively, and ${his}`);
						if (canSee(slave)) {
							r.push(`eyes dart desperately from side to side through ${his} tears, hopelessly imploring the mirror to show ${him} something other than this.`);
						} else {
							r.push(`shoulder stump twitches pathetically with ${his} desperate efforts to move ${his} missing arm, to prove there is something other than this.`);
						}
						r.push(`Anything other than this. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">incredibly and intensely terrified</span> of your total power over ${his} body.`);
						reaction.trust -= 20;
						reaction.devotion -= 20;
					}
				}
			} else {
				if (hasAnyLegs(this.newLimbs)) {
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`Of course, ${he} could not walk out of the surgery by ${himself}; you had to walk alongside ${him}. ${He} leans into you the entire time, already seeming to forget ${he} ever had another leg. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
					} else if (slave.devotion > 50) {
						r.push(`Of course, ${he} could not walk out of the surgery by ${himself}; you had to walk alongside ${him}. ${He} knows what a slave's life is, but ${he} did not really expect that it would involve this. After a brief, silent`);
						if (canSee(slave)) {
							r.push(`stare at`);
						} else {
							r.push(`consideration of`);
						}
						r.push(`the stump that was once ${his} leg, ${he} squares ${his} shoulders and resolves to carry on being a good slave as best ${he} can. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
					} else if (slave.devotion > 20) {
						r.push(`Of course, ${he} could not walk out of the surgery by ${himself}; you had to walk alongside ${him}. Despite ${his} obedience, ${he} cries softly the whole time, the stump at ${his} hip occasionally moving as ${he} reflexively tries to use it somehow. <span class="devotion dec">${He} will struggle greatly with ${his} medically created disability.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">immensely afraid</span> of your total power over ${his} body.`);
						reaction.trust -= 5;
						reaction.devotion -= 5;
					} else {
						r.push(`Of course, ${he} could not walk out of the surgery by ${himself}; you had to carry ${him}. You had a good idea what ${his} reaction would be, so you've made sure to bind ${his} other leg`);
						if (hasAnyArms(slave)) {
							r.push(`and ${his} ${(hasBothArms(slave)) ? `arms` : `arm`}`);
						}
						r.push(`to prevent ${him} from trying to attack you, and`);
						if (slave.teeth === "removable") {
							r.push(`remove ${his} teeth`);
						} else {
							r.push(`muzzle ${him}`);
						}
						r.push(`to prevent ${him} from trying to bite. ${He} sobs convulsively, and ${his}`);
						if (canSee(slave)) {
							r.push(`eyes dart desperately from side to side through ${his} tears, hopelessly imploring the mirror to show ${him} something other than this.`);
						} else {
							r.push(`leg stump twitches pathetically with ${his} desperate efforts to move ${his} missing leg, to prove there is something other than this.`);
						}
						r.push(`Anything other than this. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">incredibly and intensely terrified</span> of your total power over ${his} body.`);
						reaction.trust -= 15;
						reaction.devotion -= 15;
					}
				} else {
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`Of course, ${he} could not walk out of the surgery; you carried ${him}. ${He} holds onto you the entire time, already seeming to forget the sensation of walking. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
					} else if (slave.devotion > 50) {
						r.push(`Of course, ${he} could not walk out of the surgery; you carried ${him}. ${He} knows what a slave's life is, but ${he} did not really expect that it would involve this. After a brief, silent`);
						if (canSee(slave)) {
							r.push(`stare at`);
						} else {
							r.push(`consideration of`);
						}
						r.push(`the two stumps that were once ${his} legs, ${he} squares ${his} shoulders and resolves to carry on being a good slave as best ${he} can. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
					} else if (slave.devotion > 20) {
						r.push(`Of course, ${he} could not walk out of the surgery; you carried ${him}. Despite ${his} obedience, ${he} cries softly the whole time, ${his} hip stumps occasionally moving as ${he} reflexively tries to stand up and walk around. <span class="devotion dec">${He} will struggle greatly with ${his} medically created disability.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">extremely afraid</span> of your total power over ${his} body.`);
						reaction.trust -= 10;
						reaction.devotion -= 10;
					} else {
						r.push(`Of course, ${he} could not walk out of the surgery; you carried ${him}. You had a good idea what ${his} reaction would be, so you've made sure to bind ${his} ${(hasBothArms(slave)) ? `arms` : `arm`} to prevent ${him} from trying to attack you, and`);
						if (slave.teeth === "removable") {
							r.push(`remove ${his} teeth`);
						} else {
							r.push(`muzzle ${him}`);
						}
						r.push(`to prevent ${him} from trying to bite. ${He} sobs convulsively, and ${his}`);
						if (canSee(slave)) {
							r.push(`eyes dart desperately from side to side through ${his} tears, hopelessly imploring the mirror to show ${him} something other than this.`);
						} else {
							r.push(`hip stumps twitch pathetically with ${his} desperate efforts to move ${his} legs, to prove there is something other than this.`);
						}
						r.push(`Anything other than this. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">utterly and entirely terrified</span> of your total power over ${his} body.`);
						reaction.trust -= 30;
						reaction.devotion -= 30;
					}
				}
			}
		}
		reaction.longReaction.push(r);

		if (slave.PLimb > 0) {
			// The player can install prosthetic interfaces even when the slave has some natural limbs left. After
			// amputating they appear magically on the other limbs. Give a lore explanation for it.
			r = [];
			const newlyAmputated = getLimbCount(this.newLimbs) - getLimbCount(slave);
			r.push(`While amputating ${his} limb${newlyAmputated > 1 ? "s" : ""}, you also install`);
			if (newlyAmputated === 1) {
				r.push(`a prosthetic interface`);
			} else {
				r.push(`prosthetic interfaces`);
			}
			r.push(`into ${his} new stump${newlyAmputated > 1 ? "s" : ""}.`);

			reaction.longReaction.push(r);
		}

		return reaction;
	}

	outro(slave, diff, previousReaction) {
		const reaction = super.outro(slave, diff, previousReaction);
		const {He, him} = getPronouns(slave);

		if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
			const r = `<span class="flaw break">${He} can hardly be arrogant relying on others to feed, bathe and carry ${him}.</span>`;
			if (reaction.longReaction.length > 0) {
				reaction.longReaction.last()
					.push(r);
			} else {
				reaction.longReaction.push([r]);
			}
			slave.behavioralFlaw = BehavioralFlaw.NONE;
		}

		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Amputate = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {boolean} leftArm
	 * @param {boolean} rightArm
	 * @param {boolean} leftLeg
	 * @param {boolean} rightLeg
	 */
	constructor(slave, leftArm, rightArm, leftLeg, rightLeg) {
		super(slave);
		this.leftArm = leftArm;
		this.rightArm = rightArm;
		this.leftLeg = leftLeg;
		this.rightLeg = rightLeg;
		this.count = (leftArm ? 1 : 0) + (rightArm ? 1 : 0) + (leftLeg ? 1 : 0) + (rightLeg ? 1 : 0);
	}

	get name() {
		if (this.count === 0) {
			return "Amputate limb(s)";
		} else if (this.count === 1) {
			return "Amputate limb";
		} else {
			return "Amputate limbs";
		}
	}

	get description() {
		const {him} = getPronouns(this.originalSlave);
		return `this will greatly restrict ${him}`;
	}

	get disabledReasons() {
		const reasons = super.disabledReasons;
		if (this.count === 0) {
			reasons.push("No limb selected");
		}
		return reasons;
	}

	get healthCost() {
		return this.count * 10;
	}

	get _workCost() {
		return super._workCost * this.count;
	}

	apply(cheat) {
		if (this.leftArm) {
			removeLimbs(this._slave, "left arm");
		}
		if (this.rightArm) {
			removeLimbs(this._slave, "right arm");
		}
		if (this.leftLeg) {
			removeLimbs(this._slave, "left leg");
		}
		if (this.rightLeg) {
			removeLimbs(this._slave, "right leg");
		}

		if (!hasAnyArms(this._slave)) {
			this._slave.rules.release.masturbation = 0;
		}

		const newLimbs = App.Medicine.Limbs.currentLimbs(this._slave);

		return this._assemble(new App.Medicine.Surgery.Reactions.Amputate(newLimbs));
	}
};
