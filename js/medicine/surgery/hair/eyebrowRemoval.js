App.Medicine.Surgery.Reactions.EyebrowRemoval = class extends App.Medicine.Surgery.SimpleReaction {
	get invasive() { return false; }

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him} = getPronouns(slave);
		let r = [];

		r.push(`When ${he}`);
		if (!hasAnyLegs(slave)) {
			r.push(`is carried`);
		} else if (canWalk(slave)) {
			r.push(`walks`);
		} else {
			r.push(`is escorted`);
		}
		r.push(`out of the surgery ${he} feels the breeze on ${his} face and realizes that ${his} eyebrows are gone, permanently.`);
		if (this._hasEmotion(slave)) {
			reaction.longReaction.push(r);
			r = [];
			if (slave.devotion > 50) {
				r.push(`${He} is <span class="trust inc">thrilled</span> at how easy it will be to do ${his} makeup for up now that ${he} doesn't have to worry about ${his} eyebrows any longer.`);
				reaction.trust += 2;
			} else if (slave.devotion >= -20) {
				r.push(`${His} missing facial feature <span class="devotion dec">unnerves ${him}</span> a little. ${He} <span class="trust dec">shudders nervously</span> about what plans you may have to replace them.`);
				reaction.trust -= 2;
				reaction.devotion -= 2;
			} else {
				r.push(`${He} is <span class="devotion dec">sad</span> and <span class="trust dec">frightened</span> that you would force this on ${him}.`);
				reaction.trust -= 5;
				reaction.devotion -= 5;
			}
		}
		reaction.longReaction.push(r);
		r = [];
		r.push(`As this was a non-invasive procedure, ${his} health was not affected.`);

		reaction.longReaction.push(r);
		return reaction;
	}
};


App.Medicine.Surgery.Procedures.EyebrowRemoval = class extends App.Medicine.Surgery.Procedure {
	get name() {
		const {his} = getPronouns(this._slave);
		return `Surgically remove ${his} ability to grow eyebrows`;
	}

	get healthCost() { return 0; }

	apply(cheat) {
		this._slave.eyebrowHStyle = "bald";
		return this._assemble(new App.Medicine.Surgery.Reactions.EyebrowRemoval());
	}
};

