App.Medicine.Surgery.Reactions.VoiceRaise = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself, hers} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`The autosurgery instructed ${him} in no uncertain terms not to speak during recovery, but ${he} fails to recall that. ${He} doesn't notice anything different. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`Before surgery, ${he} was warned repeatedly not to try talking for a while, and ${he} obeys. When ${he} finally does, ${his} voice is raspy and weak, but it gains strength gradually. It comes out`);
			if (diff.voice === 3) {
				r.push(`far`);
			}
			r.push(`higher and more girly than it was before, and ${he} laughs at ${himself} as ${he} gets used to it. <span class="devotion inc">${He} has become more submissive,</span> since this helps ${him} to think of ${himself} as a`);
			if (diff.voice === 3) {
				r.push(`bimbo slut.`);
			} else {
				r.push(`real woman.`);
			}
			r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`Before surgery, ${he} was warned repeatedly not to try talking for a while, and ${he} obeys. When ${he} finally does, ${his} voice is raspy and weak, but it gains strength gradually. It comes out`);
			if (diff.voice === 3) {
				r.push(`far`);
			}
			r.push(`higher and more girly than it was before, and ${he} laughs grimly at ${himself} as ${he} gets used to it. ${He} carries on regardless, accepting it as one more thing to learn to accept. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else {
			r.push(`Before surgery, ${he} was warned repeatedly not to try talking for a while, and ${he} obeys. When ${he} finally does, ${his} voice is raspy and weak, but it gains strength gradually. It comes out`);
			if (diff.voice === 3) {
				r.push(`far`);
			}
			r.push(`higher and more girly than it was before. For now, <span class="devotion dec">${he} feels this`);
			if (diff.voice === 3) {
				r.push(`bimbo`);
			} else {
				r.push(`feminine`);
			}
			r.push(`voice is not ${hers}, a cruel mockery.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.VoiceRaise = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Perform surgery to raise voice";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.voice += 1;
		this._slave.voiceImplant += 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.VoiceRaise());
	}
};
