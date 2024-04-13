App.Medicine.Surgery.Reactions.HornGone = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} shows little reaction to the removal of ${his} head ornamentation. As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
		} else if (slave.devotion > 20) {
			r.push(`${He} is a little sad ${his} head ornaments are gone but since ${he} is attentive to your will it doesn't have a great impact on ${his} mental state. As with all invasive surgery <span class="health dec">${his} health has been affected.</span>`);
		} else {
			r.push(`${He} is glad to be rid of the horns but any happiness is tempered by ${his} general dissatisfaction of being treated as your surgical plaything. As with all invasive surgery <span class="health dec">${his} health has been affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.HornGone = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return this._slave.horn === "one long oni horn" ? "Remove it" : "Remove them";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.horn = "none";
		this._slave.hornColor = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.HornGone());
	}
};
