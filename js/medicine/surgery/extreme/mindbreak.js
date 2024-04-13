App.Medicine.Surgery.Reactions.Mindbreak = class extends App.Medicine.Surgery.SimpleReaction {
	get removeJob() {
		return true;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, His, his, him} = getPronouns(slave);
		const r = [];

		r.push(`${His} gaze is placid and empty.`);
		if (canSee(slave)) {
			r.push(`${He} looks at`);
		} else if (canHear(slave)) {
			r.push(`You cough, causing ${him} to turn to face`);
		} else {
			r.push(`${He} does not respond to your touch, so you turn ${his} head to face`);
		}
		r.push(`you, and there is nothing there: no recognition, no fear, no love. Nothing. <span class="mindbreak">${He} will forget this in a few hours. ${He} will forget everything in a few hours.</span>`);

		reaction.shortReaction.push(`${His} mind is broken, any defining characteristics <span class="mindbreak">are gone.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Mindbreak = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Chemically lobotomize";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `Warning: this is permanent and irreversible. It will destroy ${his} will and ${his} ability to remember anything but the simplest skills.`;
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		applyMindbroken(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.Mindbreak());
	}
};
