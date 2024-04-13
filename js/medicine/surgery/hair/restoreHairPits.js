App.Medicine.Surgery.Reactions.RestoreHairPits = class extends App.Medicine.Surgery.SimpleReaction {
	intro(slave) {
		return [`As the remote surgery's long recovery cycle completes, ${slave.slaveName} begins to stir.`];
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const pubertyAge = Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY);
		const r = [];

		r.push(`${He} awakens from surgery to an unfamiliar, rather irritating, itch`);
		if (hasAnyArms(slave)) {
			r.push(`under ${his} ${(hasBothArms(slave)) ? `arms` : `arm`}.`);
		} else {
			r.push(`below where ${his} arms used to be.`);
		}
		if (hasAnyArms(slave)) {
			r.push(`As ${he} reaches to scratch it,`);
		} else if (canSee(slave)) {
			r.push(`When ${he} investigates,`);
		} else {
			r.push(`As ${he} struggles to rub it against something,`);
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${he} fails to realize ${he} now has underarm hair.`);
		} else {
			if (slave.physicalAge < pubertyAge - 2) {
				r.push(`${he} finds nothing unusual; ${his} hair is still growing in.`);
			} else if (slave.physicalAge < pubertyAge - 1) {
				r.push(`${he} is surprised to find a few new hairs.`);
			} else if (slave.physicalAge < pubertyAge) {
				r.push(`${he} is surprised to find two patches of hair.`);
			} else {
				r.push(`${he} is shocked to find two dense patches of hair; a trip to the autosalon to manage it may be in order.`);
			}
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.OFRestoreHairPits = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Axillary";
	}

	get healthCost() {
		return 5;
	}

	apply(cheat) {
		this._slave.underArmHStyle = "bushy";
		this._slave.underArmHColor = getGeneticHairColor(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.RestoreHairPits());
	}
};
