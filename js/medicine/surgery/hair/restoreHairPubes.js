App.Medicine.Surgery.Reactions.RestoreHairPubes = class extends App.Medicine.Surgery.SimpleReaction {
	intro(slave) {
		return [`As the remote surgery's long recovery cycle completes, ${slave.slaveName} begins to stir.`];
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const pubertyAge = Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY);
		const r = [];

		r.push(`${He} awakens from surgery to an unfamiliar, rather irritating, itch above ${his} crotch.`);
		if (hasAnyArms(slave)) {
			r.push(`As ${he} reaches to scratch it,`);
		} else if (canSee(slave)) {
			r.push(`When ${he} looks in the mirror,`);
		} else {
			r.push(`As ${he} struggles to rub it against something,`);
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${he} fails to realize ${he} now has pubic hair.`);
		} else {
			if (slave.physicalAge < pubertyAge - 2) {
				r.push(`${he} finds nothing unusual; ${his} hair is still growing in.`);
			} else if (slave.physicalAge < pubertyAge - 1) {
				r.push(`${he} is surprised to find a few new hairs.`);
			} else if (slave.physicalAge < pubertyAge) {
				r.push(`${he} is surprised to find a patch of pubic hair.`);
			} else {
				r.push(`${he} is shocked to find a dense bush of hair trailing up to ${his} navel; a trip to the autosalon to style ${his} new pubes may be in order.`);
			}
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFRestoreHairPubes = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Pubic";
	}

	get healthCost() {
		return 5;
	}

	apply(cheat) {
		this._slave.pubicHStyle = "very bushy";
		this._slave.pubicHColor = getGeneticHairColor(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.RestoreHairPubes());
	}
};
