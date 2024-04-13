App.Medicine.Surgery.Reactions.HairRemoval = class extends App.Medicine.Surgery.SimpleReaction {
	get invasive() { return false; }

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		let r = [];

		r.push(`When ${he}`);
		if (!hasAnyLegs(slave)) {
			r.push(`is carried`);
		} else if (canWalk(slave)) {
			r.push(`walks`);
		} else {
			r.push(`is escorted`);
		}
		r.push(`out of the surgery ${he} immediately notices the chill on ${his} head and realizes that ${he} is bald.`);
		if (this._hasEmotion(slave)) {
			reaction.longReaction.push(r);
			r = [];
			if (slave.devotion > 50) {
				if (slave.fetish === Fetish.HUMILIATION && slave.fetishStrength > 50) {
					r.push(`${He} is <span class="devotion inc">turned on</span> by how humiliating this is for ${him} and <span class="trust inc">can't wait</span> for the next time you decide to show ${him} off.`);
					reaction.trust += 5;
					reaction.devotion += 5;
				} else {
					r.push(`${He} is very devoted to you so ${his} new condition doesn't affect ${him} as much as it would other slaves.`);
				}
			} else if (slave.devotion >= -20) {
				if (slave.fetish === Fetish.HUMILIATION && slave.fetishStrength > 50) {
					r.push(`${He} is both <span class="devotion inc">turned on</span> and <span class="trust dec">horrified</span> by this humiliation.`);
					reaction.trust -= 5;
					reaction.devotion += 5;
				} else {
					r.push(`${He} thought ${he} was used to slavery but this is <span class="trust dec">too much.</span>`);
					reaction.trust -= 5;
				}
			} else {
				r.push(`${He} is <span class="trust dec">horrified</span> and <span class="devotion dec">angry</span> at this new humiliation.`);
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


App.Medicine.Surgery.Procedures.HairRemoval = class extends App.Medicine.Surgery.Procedure {
	get name() {
		const {his} = getPronouns(this._slave);
		return `Surgically remove ${his} ability to grow hair`;
	}

	get healthCost() { return 0; }

	apply(cheat) {
		this._slave.bald = 1;
		this._slave.hStyle = "bald";
		this._slave.eyebrowHStyle = "bald";
		return this._assemble(new App.Medicine.Surgery.Reactions.HairRemoval());
	}
};
