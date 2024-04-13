App.Medicine.Surgery.Reactions.EndLactation = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him} = getPronouns(slave);
		const r = [];

		r.push(`${He} notices almost immediately that the soreness that used to tell ${him} ${he} needed to be milked has gone. ${He} bounces ${his} breasts idly; it looks like ${he} doesn't know what to think about having ${his} lactation dry up. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		if (slave.assignment === Job.MILKED || slave.assignment === Job.DAIRY) {
			r.push(`<span class="job change">${His} assignment has defaulted to rest.</span>`);
			reaction.shortReaction.push(`<span class="job change">${His} assignment has defaulted to rest.</span>`);
			removeJob(slave, slave.assignment);
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.EndLactation = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove lactation implant";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.lactation = 0;
		this._slave.lactationDuration = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.EndLactation());
	}
};
