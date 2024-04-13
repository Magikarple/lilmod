App.Medicine.Surgery.Reactions.Ejaculation = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		r.push(`${His} groin is a little sore, and ${he} examines it closely, finding it slightly swollen. Near the end of ${his} close inspection of ${his} own private parts, though, ${he} happens to stimulate ${himself}, unintentionally, and just a little. That's enough. ${He} begins to leak excessive precum, as usual, but a distinct pressure begins building in ${his} loins. ${He} groans as the swelling rises before bucking and orgasming uncontrollably, coating ${himself} and the bed in a layer of fluid.`);
		if (this._hasEmotion(slave)) {
			if (slave.devotion > 50) {
				r.push(`<span class="devotion inc">${He}'s delighted.</span> ${He}'s such a good sex slave that the lewdness of extra large ejaculations is exciting to ${him}. That, and the extra length of ${his} climax wasn't bad either.`);
				reaction.devotion += 4;
			} else if (slave.devotion >= -20) {
				r.push(`${He} obviously doesn't know what to think at first. Just brushing ${his} private parts resulted in a huge mess, a somewhat exciting prospect, but ${he}'s realizing that this is going to be rather inconvenient, if not moist. Still, having such a lewd change made to ${his} body affects ${his} feelings towards you; ${he} is <span class="trust dec">sensibly fearful</span> of your total power over ${him}.`);
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

App.Medicine.Surgery.Procedures.EjaculationBooster = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant prostate with an ejaculation boosting implant";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will thin ${his} ejaculate but greatly increase its quantity`;
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.prostate = 3;
		return this._assemble(new App.Medicine.Surgery.Reactions.Ejaculation());
	}
};
