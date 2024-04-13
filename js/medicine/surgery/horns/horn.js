App.Medicine.Surgery.Reactions.Horn = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little reaction to ${his} new head ornamentation. As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
		} else if (slave.devotion > 20) {
			if (canSee(slave)) {
				r.push(`${He} looks in the mirror and turns ${his} head side to side admiring ${his} new ${slave.hornColor} ${slave.horn},`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache that something has been done to ${his} head,`);
			}
			if (hasAnyArms(slave)) {
				r.push(`the base is still a bit sore, but ${he} reaches up to feel their shape,`);
			}
			r.push(`${he} turns to you with a smile, tilting ${his} head at various angles to show them off. ${He} seems to think ${his} new horns are <span class="devotion inc">cute.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new ${slave.hornColor} ${slave.horn} disapprovingly`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache that something has been done to ${his} head,`);
			}
			if (hasAnyArms(slave)) {
				r.push(`the base is still a bit sore, but ${he} reaches up to tug on them gently,`);
			}
			r.push(`${He}'s come to terms with the fact that ${he}'s a slave, so ${he} isn't much affected mentally despite the surprise of having horns attached to ${his} head. As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			if (canSee(slave)) {
				r.push(`${He} eyes ${his} new ${slave.hornColor} ${slave.horn} with disgust.`);
			} else {
				r.push(`${He} can't see but it's clear from the dull ache that something has been done to ${his} head, and probably not for the better.`);
			}
			if (hasAnyArms(slave)) {
				r.push(`The base is still a bit sore, but ${he} reaches up to tug on them, as if to confirm it's not some trick.`);
			}
			r.push(`For now, <span class="devotion dec">${he} seems to view ${his} head ornamentation as a cruel imposition.</span> As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is now <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Horn = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} name
	 * @param {FC.HornType} hornType
	 * @param {string} hornColor
	 */
	constructor(slave, name, hornType, hornColor) {
		super(slave);
		this._name = name;
		this.type = hornType;
		this.color = hornColor;
	}

	get name() {
		return this._name;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.horn = this.type;
		this._slave.hornColor = this.color;
		return this._assemble(new App.Medicine.Surgery.Reactions.Horn());
	}
};
