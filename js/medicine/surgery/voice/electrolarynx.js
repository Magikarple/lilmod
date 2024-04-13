App.Medicine.Surgery.Reactions.Electrolarynx = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`Before surgery, ${he} was warned repeatedly not to try talking for a while, but ${he} fails to recall that. ${He} doesn't notice any difference.`);
		} else if (slave.voice === 0) {
			if (slave.devotion > 50) {
				r.push(`The autosurgery instructed ${him} in no uncertain terms not to speak during recovery, so ${he} knows that ${his} voice has been restored. When you come in to check on ${him} late in the process, though, ${he} does ${his} best to communicate adoration with ${his}`);
				if (canSee(slave)) {
					r.push(`eyes`);
				} else {
					r.push(`face`);
				}
				r.push(`alone. Finally, the accelerated healing process reaches the time when ${he}'s to test ${his} new vocal organs. ${He}`);
				if (canSee(slave)) {
					r.push(`looks at`);
				} else {
					r.push(`turns to`);
				}
				r.push(`you shyly, and`);
				if (hasAnyArms(slave)) {
					r.push(`meekly beckons to you from where ${he}'s still`);
				} else {
					r.push(`meekly mouths a request that you come over to where ${he}'s`);
				}
				r.push(`restrained by the autosurgery. When you're near, ${he} clears ${his} sore throat gingerly and then whispers, <span class="devotion inc">"I love you,</span> ${getWrittenTitle(slave)}." <span class="trust inc">${He} is far more trusting of your plans for ${him} in the future.</span>`);

				reaction.trust += 5;
				reaction.devotion += 5;
			} else if (slave.devotion >= -20) {
				r.push(`The autosurgery instructed ${him} in no uncertain terms not to speak during recovery, so ${he} knows that ${his} voice has been restored. When you come in to check on ${him} late in the process, though, ${he} does ${his} best to communicate gratitude with ${his}`);
				if (canSee(slave)) {
					r.push(`eyes`);
				} else {
					r.push(`face`);
				}
				r.push(`alone. Finally, the accelerated healing process reaches the time when ${he}'s to test ${his} new vocal organs. ${He}`);
				if (canSee(slave)) {
					r.push(`looks at`);
				} else {
					r.push(`turns to`);
				}
				r.push(`you shyly, and hesitantly`);
				if (hasAnyArms(slave)) {
					r.push(`beckons to you from where ${he}'s still`);
				} else {
					r.push(`mouths a request that you come over to where ${he}'s`);
				}
				r.push(`restrained by the autosurgery. When you're near, ${he} clears ${his} sore throat gingerly and then whispers, "Thank you, ${getWrittenTitle(slave)}." <span class="devotion inc">${He} has a much higher regard for you</span> due to this display of care for ${him}.`);
				reaction.devotion += 10;
			} else {
				r.push(`The autosurgery instructed ${him} in no uncertain terms not to speak during recovery, so ${he} knows that ${his} voice has been restored. When you come in to check on ${him} late in the process, though, ${he}`);
				if (canSee(slave)) {
					r.push(`stares at`);
				} else {
					r.push(`faces`);
				}
				r.push(`you for a long moment before turning away from you, towards the wall, and beginning to cry quietly. It seems ${he}'s surprised that you would do this for ${him}, and does not understand how to deal with the situation. In any case, <span class="devotion inc">${he} hates you far less</span> than ${he} once did.`);
				reaction.devotion += 10;
			}
		} else {
			if (slave.devotion > 50) {
				r.push(`Before surgery, ${he} was warned repeatedly not to try talking for a while, and ${he} obeys. When ${he} finally does, ${his} voice is raspy and weak, but it gains strength gradually. While ${he} first believes nothing has changed,`);
				if (canHear(slave)) {
					r.push(`${he} soon notices a slight synthetic tone to ${his} voice and realizes ${he} has been given a mechanical larynx.`);
				} else {
					r.push(`the autosurgery informs ${him} in no uncertain terms that ${he} has implanted with a mechanical larynx.`);
				}
				r.push(`${He} is <span class="devotion inc">appreciative</span> of ${his} new implant, and knowing how much you invested in ${him} makes ${him} <span class="trust inc">trust you more</span> as well.`);
				reaction.devotion += 10;
				reaction.trust += 10;
			} else if (slave.devotion > 20) {
				r.push(`Before surgery, ${he} was warned repeatedly not to try talking for a while, and ${he} obeys. When ${he} finally does, ${his} voice is raspy and weak, but it gains strength gradually. While ${he} first believes nothing has changed,`);
				if (canHear(slave)) {
					r.push(`${he} soon notices a slight synthetic tone to ${his} voice and realizes ${he} has been given a mechanical larynx.`);
				} else {
					r.push(`the autosurgery informs ${him} in no uncertain terms that ${he} has implanted with a mechanical larynx.`);
				}
				r.push(`${He} has mixed feelings about this development, but ${he}'s <span class="trust inc">aware</span> how valuable such implants are, and ${he} already <span class="devotion inc">accepted</span> that you have complete control over ${his} body.`);
				reaction.devotion += 5;
				reaction.trust += 10;
			} else {
				r.push(`Before surgery, ${he} was warned repeatedly not to try talking for a while, and ${he} obeys. When ${he} finally does, ${his} voice is raspy and weak, but it gains strength gradually. While ${he} first believes nothing has changed,`);
				if (canHear(slave)) {
					r.push(`${he} soon notices a slight synthetic tone to ${his} voice and realizes ${he} has been given a mechanical larynx.`);
				} else {
					r.push(`the autosurgery informs ${him} in no uncertain terms that ${he} has implanted with a mechanical larynx.`);
				}
				r.push(`${He} is <span class="trust dec">disturbed</span> that you replaced ${his} larynx with an artificial one and afraid of increased control over ${him} that such device grants.`);
				reaction.devotion -= 5;
			}
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Electrolarynx = class extends App.Medicine.Surgery.Procedure {
	get name() {
		const {him} = getPronouns(this.originalSlave);
		return `Give ${him} an electrolarynx`;
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.electrolarynx = 1;
		this._slave.voice = 2;
		return this._assemble(new App.Medicine.Surgery.Reactions.Electrolarynx());
	}
};
