App.Medicine.Surgery.Reactions.BodyHairRemoval = class extends App.Medicine.Surgery.SimpleReaction {
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
		r.push(`out of the surgery ${he} feels the breeze on ${his} skin and realizes that`);
		if (slave.hStyle !== "bald" && slave.eyebrowHStyle !== "bald") {
			r.push(`all hair below ${his} neck is missing.`);
		} else {
			r.push(`${he} is now completely hairless.`);
		}
		if (this._hasEmotion(slave)) {
			reaction.longReaction.push(r);
			r = [];
			if (slave.devotion > 50) {
				r.push(`${He} is <span class="devotion inc">happy</span> with how smooth ${his} body has become and is already <span class="trust inc">wondering</span> what new kinky things you have planned for ${him}.`);
				reaction.trust += 5;
				reaction.devotion += 5;
			} else if (slave.devotion >= -20) {
				r.push(`${His} new lack of body hair doesn't bother ${him} much, since it just means ${he} needs to spend less time getting rid of any unseemly hairs.`);
				reaction.trust += 5;
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

App.Medicine.Surgery.Procedures.BodyHairRemoval = class extends App.Medicine.Surgery.Procedure {
	get name() {
		const {his} = getPronouns(this._slave);
		return `Surgically remove ${his} ability to grow body hair`;
	}

	get healthCost() { return 0; }

	apply(cheat) {
		if (this._slave.underArmHStyle !== "hairless") {
			this._slave.underArmHStyle = "bald";
		}
		if (this._slave.pubicHStyle !== "hairless") {
			this._slave.pubicHStyle = "bald";
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.BodyHairRemoval());
	}
};
