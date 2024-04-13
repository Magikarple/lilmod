App.Medicine.Surgery.Reactions.Prostate = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		r.push(`It's not immediately apparent to ${him} what kind of surgery ${he} received, since all ${he}'s left with is a terrible nonspecific ache in ${his} lower parts. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				if (slave.anus === 0) {
					r.push(`Since ${he}'s still an anal virgin, ${he} doesn't have any immediate way to discover what's been taken from ${him}. Thus, ${he} carries on, accepting what you did to ${him} out of simple ignorance.`);
				} else if (this._strongKnownFetish(slave, Fetish.BUTTSLUT)) {
					r.push(`${He} realizes that ${his} prostate's gone the first time ${he} takes it up the butt, though. The incorrigible buttslut is crushed, but ${he}'s devoted to you, so ${he} resolves to carry on regardless. If anything, ${he} does ${his} best to push ${himself} to <span class="fetish loss">consider other kinks,</span> now that a hard anal pounding isn't as fun for ${him} as it once was.`);
					slave.fetishStrength -= 40;
				} else {
					r.push(`${He} realizes that ${his} prostate's gone the first time ${he} takes it up the butt, though. <span class="devotion inc">Awed by your permeating control over ${him},</span> even down to ${his} internal organs, ${he} accepts that you've decided to make buttsex less fun for ${him}.`);
					reaction.devotion += 4;
				}
			} else if (slave.devotion > 20) {
				if (slave.anus === 0) {
					r.push(`Since ${he}'s still an anal virgin, ${he} doesn't have any immediate way to discover what's been taken from ${him}. Not knowing what you did, <span class="trust dec">${he}'s afraid,</span> realizing that you can toy with ${his} internal makeup at a whim.`);
					reaction.trust -= 5;
				} else if (this._strongKnownFetish(slave, Fetish.BUTTSLUT)) {
					r.push(`${He} realizes that ${his} prostate's gone the first time ${he} takes it up the butt, though. The buttslut is crushed, and <span class="devotion dec">infuriated,</span> because in effect you've taken ${his} favorite pastime away from ${him}. For now, ${he} defiantly does ${his} best to keep orgasming to anal, but it remains to be seen whether ${he} can maintain ${his} enthusiasm.`);
					reaction.devotion -= 10;
				} else {
					r.push(`${He} realizes that ${his} prostate's gone the first time ${he} takes it up the butt, though. ${He} wasn't attached to it in a particular way, but it was part of ${his} body, and now it's gone. <span class="trust dec">It frightens ${him}</span> to be reduced in this way, and ${he} wonders what it means that you apparently want ${him} to enjoy being assfucked less.`);
					reaction.trust -= 5;
				}
			} else {
				r.push(`${He} doesn't have to know exactly what you did, though, to be <span class="trust dec">mortified</span> and <span class="devotion dec">infuriated</span> by your messing around inside ${his} body. ${He} hasn't yet learned to accept that you control ${him} completely, down to the arrangement and even presence of ${his} internal organs.`);
				reaction.trust -= 10;
				reaction.devotion -= 10;
			}
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RemoveProstate = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove prostate";
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.prostate = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.Prostate());
	}
};
