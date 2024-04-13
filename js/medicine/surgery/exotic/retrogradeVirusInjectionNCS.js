App.Medicine.Surgery.Reactions.RetrogradeVirusInjectionNCS = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const pubertyAge = Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY);
		const genitalChanges = [];
		const physicalChanges = [];
		const statusChanges = [];

		let hairChanges = 0;
		let hair = '';
		let sense;
		let r = [];

		r.push(`The procedure spans the week, with ${him} spending every other day in the surgery room for a series of 4 sets of injections. A few hours after each session, ${he} feels terribly ill. ${He} doesn't quite understand what it's about, just that ${he} feels pretty bad. The process involves`);
		if (V.PC.skill.medicine >= 100) {
			r.push(`you`);
		} else {
			r.push(`the remote surgeon`);
		}
		r.push(`injecting the serum across ${his} body entire body, every few`);
		if (V.showInches === 2) {
			r.push(`inches,`);
		} else {
			r.push(`centimeters,`);
		}
		r.push(`leaving small needle marks that fade out within minutes. Despite not leaving a lasting evidence, the process is very invasive work, and leaves ${him} <span class="health dec">feeling weak and tired.</span>`);
		reaction.longReaction.push(r);
		r = [];

		// Generate the changes, into variables to set contexts.
		const hairLand = hasBothLegs(slave) ? `at ${his} feet` : `below ${him}`;
		if (slave.physicalAge > pubertyAge - 2) {
			if (slave.underArmHStyle !== "hairless" && slave.underArmHStyle !== "bald") {
				hairChanges++;
				slave.underArmHStyle = "bald";
				hair = `The first thing ${he} notices is that ${his} armpit hair has just fallen out, in a small pile ${hairLand}.`;
				if (slave.pubicHStyle !== "hairless" && slave.pubicHStyle !== "bald") {
					hairChanges++;
					slave.pubicHStyle = "bald";
					hair = `${hair} The same thing happens to ${his} pubic hair.`;
				}
			} else if (slave.pubicHStyle !== "hairless" && slave.pubicHStyle !== "bald") {
				hairChanges++;
				slave.pubicHStyle = "bald";
				hair = `The first thing ${he} notices is that ${his} pubic hair has just fallen out, in a small pile ${hairLand}.`;
			}
		}
		if (canSee(slave)) {
			sense = "see";
			r.push(`${He} inspects ${himself} in the mirror.`);
		} else if (!hasAnyArms(slave)) {
			sense = "feel";
			r.push(`${He} examines ${himself} with ${his} own ${hasBothArms(slave) ? "hands" : "hand"}.`);
		} else if (canHear(slave)) {
			sense = "hear";
			r.push(`${He} listens as a menial slave describes ${his} new looks.`);
		} else {
			sense = "sense";
			r.push(`${He} can vaguely feel the changes to ${his} body, even in ${his} current state.`);
		}
		if (slave.dick > 2) {
			genitalChanges.push('dick');
			slave.dick -= 1;
		}
		if (slave.balls > 2) {
			genitalChanges.push('balls');
			slave.balls -= 1;
		}
		if (slave.geneMods.rapidCellGrowth !== 1) {
			if (slave.scrotum > 1) {
				genitalChanges.push('scrotum');
				slave.scrotum -= 1;
			}
		}
		if (slave.clit > 1) {
			genitalChanges.push('clit');
			slave.clit -= 1;
		}
		if (slave.labia > 1) {
			genitalChanges.push('labia');
			slave.labia -= 1;
		}
		if (App.Medicine.fleshSize(slave, 'boobs') > 300) {
			genitalChanges.push('boobs');
			slave.boobs -= Math.round(App.Medicine.fleshSize(slave, 'boobs') * .1);
		}
		if ((slave.shoulders - Math.abs(slave.shouldersImplant) > -1) && (slave.hips - Math.abs(slave.hipsImplant) > -1)) {
			physicalChanges.push(`both ${his} hips and shoulders are <span class="change negative">less wide,</span>`);
			slave.hips -= 1;
			slave.shoulders -= 1;
		} else if (slave.shoulders - Math.abs(slave.shouldersImplant) > -1) {
			physicalChanges.push(`${his} shoulders are <span class="change negative">less wide,</span>`);
			slave.shoulders -= 1;
		} else if (slave.hips - Math.abs(slave.hipsImplant) > -1) {
			physicalChanges.push(`${his} hips are <span class="change negative">less wide,</span>`);
			slave.hips -= 1;
		}
		if (slave.visualAge < 18) {
			const nonsurgicalHeight = slave.height - 10 * slave.heightImplant;
			const heightDelta = nonsurgicalHeight - slave.natural.height;
			let shrinkage;
			if (nonsurgicalHeight > 126 || heightDelta > 0) {
				if (heightDelta > 15) {
					shrinkage = 5;
				} else if (heightDelta > 5) {
					shrinkage = 4;
				} else if (heightDelta > -5) {
					shrinkage = 3;
				} else if (heightDelta > -15) {
					shrinkage = 2;
				} else {
					shrinkage = 1;
				}
				physicalChanges.push(`${he} is a little <span class="change negative">shorter,</span>`);
				slave.height -= shrinkage;
			}
		}
		if (slave.visualAge > 18) {
			statusChanges.push(`${He} feels a little <span class="change negative">younger.</span>`);
			slave.visualAge -= 1;
		}
		if (slave.voice.isBetween(0, 3)) {
			let voiceReaction = [`${He} hears ${his} voice coming out as <span class="change negative">higher</span> and more ${slave.voice < 2 ? "feminine" : "girly"} than it was before.`];
			if (slave.devotion > 20) {
				voiceReaction.push(`${He} laughs at ${his} new voice happily as ${he} gets used to it.`);
			} else if (slave.devotion >= -20) {
				voiceReaction.push(`${He} laughs grimly at ${himself} as ${he} gets used to it.`);
			} else {
				voiceReaction.push(`It comes out far higher than it was before, ${he} feels this new voice does not belong to ${him}.`);
			}
			statusChanges.push(voiceReaction.join(" "));
			slave.voice += 1;
		}
		// Handle the display of the changes for the newly NCS'ed slave.
		const numberChanges = hairChanges + statusChanges.length + physicalChanges.length + genitalChanges.length;
		if (numberChanges <= 0) {
			r.push(`Despite the long and arduous treatment, ${he} has no idea what all of it was for. ${He} stands before you`);
			if (slave.devotion > 20) {
				r.push(`eager to learn what it's all about.`);
			} else if (slave.devotion >= -20) {
				r.push(`worried to discover what's happened to ${him}.`);
			} else {
				r.push(`anxious about what you did to ${him}, dreading the news.`);
			}
		} else {
			r.push(`Over the course of the treatment, ${he} begins to feel the initial effects and on inspection, when ${he}`);
			if (!hasAnyLegs(slave)) {
				r.push(`is carried`);
			} else if (canWalk(slave)) {
				r.push(`walks`);
			} else {
				r.push(`is escorted`);
			}
			r.push(`out of the surgery room, ${he} feels somehow smaller and changed in`);
			if (numberChanges === 1) {
				r.push(`at least one way.`);
			} else if (numberChanges === 2) {
				r.push(`two ways.`);
			} else {
				r.push(`several ways.`);
			}
			reaction.longReaction.push(r);
			r = [];
			if (hair !== '') {
				r.push(hair);
			}
			if (genitalChanges.length > 0) {
				r.push(`${He} can ${sense} that ${his} junk is different now, it seems ${his}`);
				if (genitalChanges.length > 2) {
					r.push(`${toSentence(genitalChanges)} have all become <span class="change negative">smaller.</span>`);
				} else if (genitalChanges.length > 1) {
					r.push(`${genitalChanges[0]}, and ${genitalChanges[1]} have both become <span class="change negative">smaller.</span>`);
				} else {
					r.push(`${genitalChanges[0]} has become <span class="change negative">smaller.</span>`);
				}
			}
			if (physicalChanges.length > 0) {
				r.push(`${He} can`);
				if (genitalChanges.length > 0 || hairChanges > 0) {
					r.push(`also`);
				}
				r.push(`${sense} that ${his} body has some physical changes, it seems to ${him} that ${toSentence(physicalChanges)}`);
				const reaction = ['comes as a bit of a surprise', 'comes as quite a shock', `confirms ${his} suspicions`, `doesn't seem to phase ${him}`, `${he} finds interesting`, `${he} can't get over`].random();
				r.push(`which ${reaction}.`);
			}
			if (statusChanges.length > 0) {
				r.push(`${He} can feel some`);
				if (genitalChanges.length > 0 || physicalChanges.length > 0 || hairChanges > 0) {
					r.push(`other`);
				}
				r.push(`changes that are a little harder to describe.`);
				r.push(...statusChanges);
			}
		}

		reaction.longReaction.push(r);
		r = [];
		r.push(`You explain that ${he}'s never going to grow older and ${he}'ll stay younger. You sit back and let ${him} absorb that data for a moment.`);
		reaction.longReaction.push(r);
		r = [];
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} doesn't seem to comprehend what this means for ${him}.`);
		} else if (slave.devotion > 20) {
			r.push(`${He} is <span class="devotion inc">happy</span> with how young ${his} body has become${(slave.visualAge > 26) ? ` and is excited about the process continuing` : ``}. ${He} is already <span class="trust inc">wondering</span> what new kinky things you have planned for ${him}.`);
			reaction.trust += 5;
			reaction.devotion += 5;
			if (slave.visualAge > 26) {
				reaction.devotion += 5;
			}
		} else if (slave.devotion >= -20) {
			r.push(`${He} isn't thrilled with ${his} new younger body, but it doesn't bother ${him} much, since ${he} knows it just better secures ${his} position in your arcology.`);
			if (slave.visualAge > 26) {
				r.push(`${He} does feel a little extra <span class="trust inc">trust</span> that you would spend so much on an older slave like ${him}.`);
				reaction.trust += 5;
			}
		} else {
			r.push(`${He} is <span class="devotion dec">sad</span> and <span class="trust dec">frightened</span> that you would force this curse of non-aging on ${him}.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RetrogradeVirusInjectionNCS = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Induced NCS treatment";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will induce NCS in ${his} genetic code`;
	}

	get healthCost() {
		return 80;
	}

	get _workCost() {
		return super._workCost * 4;
	}

	apply(cheat) {
		this._slave.geneMods.NCS = 1;
		this._slave.chem += 40;
		return this._assemble(new App.Medicine.Surgery.Reactions.RetrogradeVirusInjectionNCS());
	}
};
