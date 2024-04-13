App.Medicine.Surgery.Reactions.AddProstate = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		r.push(`It's not immediately apparent to ${him} what kind of surgery ${he} received, since all ${he}'s left with is a terrible nonspecific ache in ${his} lower parts. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				if (slave.anus === 0) {
					r.push(`Since ${he}'s still an anal virgin, ${he}'s denied the most obvious way of discovering what's been added to ${him}. The revelation is deferred until the next time ${he} orgasms:`);
				} else if (canDoAnal(slave) || canDoVaginal(slave)) {
					r.push(`The next time ${he}'s penetrated, though, it's obvious:`);
				} else if (canPenetrate(slave)) {
					r.push(`The next time ${he} uses ${his} cock, though, it's obvious:`);
				} else {
					r.push(`The next time ${he} climaxes, though, it's obvious:`);
				}
				r.push(`${he}'s shocked by the astounding volume of ${his}`);
				if (slave.dick === 0) {
					r.push(`squirting female`);
				}
				r.push(`ejaculation, since ${his} new organ is of course hooked into ${his} urethra and does its duty whenever ${he} climaxes${(slave.balls === 0) ? ` despite ${his} lack of testicles to add actual semen to ${his} copious emissions` : ``}.`);
				if (slave.fetishKnown === 1 && slave.fetish === Fetish.BUTTSLUT) {
					r.push(`${He} was already an anal slut, but ${he} can now experience anal pleasure along an entirely new dimension. ${He}'s <span class="devotion inc">extremely grateful,</span> and <span class="fetish inc">a more eager buttslut than ever.</span>`);
					reaction.devotion += 5;
					slave.fetishStrength = Math.clamp(slave.fetishStrength + 20, 0, 100);
				} else {
					r.push(`As a sex slave, ${he}`);
					if (canHear(slave)) {
						r.push(`has of course heard of`);
					} else {
						r.push(`is of course familiar with`);
					}
					r.push(`the pleasure of prostate stimulation,`);
					if (slave.genes === GenderGenes.MALE) {
						r.push(`not to mention having once had one ${himself},`);
					}
					r.push(`and ${he}'s <span class="devotion inc">duly grateful</span> that you've altered ${him} in a way that will make sexual duties more enjoyable.`);
				}
				reaction.devotion += 5;
			} else if (slave.devotion > 20) {
				r.push(`The next time ${he} orgasms, ${he}'s shocked by the astounding volume of ${his}`);
				if (slave.dick === 0) {
					r.push(`squirting female`);
				}
				r.push(`ejaculation, since ${his} new organ is of course hooked into ${his} urethra and does its duty whenever ${he} climaxes${(slave.balls === 0) ? ` despite ${his} lack of testicles to add actual semen to ${his} copious emissions` : ``}. ${His} main reaction is confusion; this alteration is pretty far outside any of the more conventional surgeries slaves might expect to receive, and ${his} mixed feeling tend to cancel each other out.`);
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

App.Medicine.Surgery.Procedures.OFAddProstate = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Prostate";
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.prostate = 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.AddProstate());
	}
};
