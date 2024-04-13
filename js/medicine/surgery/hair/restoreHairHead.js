App.Medicine.Surgery.Reactions.RestoreHairHead = class extends App.Medicine.Surgery.SimpleReaction {
	intro(slave) {
		return [`As the remote surgery's long recovery cycle completes, ${slave.slaveName} begins to stir.`];
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		r.push(`${He} awakens from surgery to an unfamiliar, rather irritating, itch coming from the top of ${his} head.`);
		if (hasAnyArms(slave)) {
			r.push(`As ${he} reaches to scratch it,`);
		} else if (canSee(slave)) {
			r.push(`When ${he} investigates,`);
		} else {
			r.push(`As ${he} struggles to rub it against something,`);
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${he} fails to realize ${he} now has a head of short hair.`);
		} else {
			r.push(`${he} is <span class="devotion inc">delighted</span> to find ${he} now has hair.`);
			reaction.devotion += 2;
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFRestoreHairHead = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Scalp";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.bald = 0;
		this._slave.hLength = 1;
		this._slave.hStyle = "neat";
		this._slave.hColor = getGeneticHairColor(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.RestoreHairHead());
	}
};
