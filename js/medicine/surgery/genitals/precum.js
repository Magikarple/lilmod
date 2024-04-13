App.Medicine.Surgery.Reactions.Precum = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		r.push(`${His} groin is a little sore, and ${he} examines it closely, but ${he} can't find much difference. Near the end of ${his} close inspection of ${his} own private parts, though, ${he} happens to stimulate ${himself}, unintentionally, and just a little. That's enough. ${He} begins to leak precum, and it doesn't stop until ${his} confusion snuffs out the slight arousal that got it started.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`<span class="devotion inc">${He}'s delighted.</span> ${He}'s such a good sex slave that the lewdness of making extra fluid when ${he}'s ready to fuck is exciting to ${him}. That, and extra lubrication is always welcome.`);
				if (slave.dick > 2) {
					r.push(`One of the first things ${he} tries is guiding ${his} flaccid dick back to apply some to ${his} asspussy. It works, to ${his} naughty satisfaction.`);
				}
				reaction.devotion += 4;
			} else if (slave.devotion >= -20) {
				r.push(`${He} obviously doesn't know what to think at first. ${He} does ${his} best not to make a mess, and is mostly successful, but ${he}'s realizing that this is going to be somewhat inconvenient. Still, having such a lewd change made to ${his} body affects ${his} feelings towards you; ${he} is <span class="trust dec">sensibly fearful</span> of your total power over ${him}.`);
				reaction.trust -= 5;
			} else {
				r.push(`${He} feared the worst when ${he} realized that something had been done to ${him} down there, and ${he}'s initially relieved to find that ${he}'s intact and apparently functional. But ${he}'s been invaded in an extremely personal way, and <span class="devotion dec">resents having you tamper with ${his} private parts.</span> Furthermore, ${he} is <span class="trust dec">sensibly fearful</span> of your total power over ${him}.`);
				reaction.trust -= 5;
				reaction.devotion -= 5;
			}
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Precum = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant slow-release productivity drugs";
	}

	get description() {
		return "This may cause some leaking";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.prostate = 2;
		return this._assemble(new App.Medicine.Surgery.Reactions.Precum());
	}
};
