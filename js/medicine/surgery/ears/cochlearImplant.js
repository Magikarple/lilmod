App.Medicine.Surgery.Reactions.CochlearImplant = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.hears <= -2) {
			r.push(`The implant surgery is <span class="health dec">invasive</span> and ${he} spends some time in the autosurgery recovering. As soon as the bandages around ${his} ears are removed, ${his} head tilts towards any source of sound with manic speed as ${he} processes a nearly overwhelming amount of auditory information. Hearing the world as it is is a gift that those who do not need it cannot properly understand.`);
			if (this._hasEmotion(slave)) {
				if (slave.devotion > 50) {
					r.push(`${He} loved you before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too. ${He} never realized just how nice your voice was, and now ${he} can't get your words out of ${his} mind.`);
					if (slave.relationship === 0) {
						slave.relationship = -2;
					}
				} else if (slave.devotion > 20) {
					r.push(`${He} accepted you as ${his} owner before, but ${he}'s <span class="devotion inc">very grateful,</span> and <span class="trust inc">more trusting,</span> too.`);
				} else {
					r.push(`${He} hardly knows what to make of this wonderful present from someone ${he} hates, and struggles with suspicion that the gift conceals some sort of snare. After a while, though, ${he} accepts that you <span class="devotion inc">truly did help ${him},</span> and <span class="trust inc">might be trustworthy.</span>`);
				}
				reaction.devotion += 25;
				reaction.trust += 25;
			}
		} else {
			r.push(`The implant surgery is <span class="health dec">invasive</span> and ${he} spends some time in the autosurgery recovering. When the bandages around ${his} ears are removed the amount of auditory information makes ${him} reel.`);
			if (this._hasEmotion(slave)) {
				if (slave.devotion > 50) {
					r.push(`${He} is <span class="devotion inc">grateful,</span> for ${his} improved hearing, and knowing how much you invested in ${him} makes ${him} <span class="trust inc">trust you more</span> as well.`);
					reaction.devotion += 10;
					reaction.trust += 10;
				} else if (slave.devotion > 20) {
					r.push(`${He} has mixed feelings about ${his} new implant, but ${he}'s <span class="trust inc">aware</span> how valuable such implants are, and ${he} already <span class="devotion inc">accepted</span> that you have complete control over ${his} body.`);
					reaction.devotion += 5;
					reaction.trust += 10;
				} else {
					r.push(`${He} is <span class="trust dec">disturbed</span> that you've placed something mechanical in ${his} head and afraid of increased control over ${him} that such device grants.`);
					reaction.devotion -= 5;
				}
			}
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.CochlearImplant = class extends App.Medicine.Surgery.Procedure {
	get name() {
		const {him} = getPronouns(this._slave);
		return `Give ${him} cochlear implants`;
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.earImplant = 1;
		this._slave.hears = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.CochlearImplant());
	}
};
