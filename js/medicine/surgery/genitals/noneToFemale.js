App.Medicine.Surgery.Reactions.NoneToFemale = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself, hers} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`Surprisingly, ${he} already realized while exiting that ${his} genitalia was completely reshaped. The reasons why are lost to ${him}, though. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`Of course, ${he} already realized while exiting that ${his} genitalia was completely reshaped. ${He} can only be happy that ${he}`);
			if (slave.genes === GenderGenes.FEMALE) {
				r.push(`once again has a vagina and now has a means of release again.`);
			} else {
				r.push(`now has a hole other than ${his} anus to pleasure ${himself} with.`);
			}
			r.push(`<span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`Of course, ${he} already realized while exiting that ${his} genitalia was completely reshaped. ${He} didn't expect`);
			if (slave.genes === GenderGenes.FEMALE) {
				r.push(`to ever have a pussy again,`);
			} else {
				r.push(`to be given a hole other than ${his} anus,`);
			}
			r.push(`and ${his} face is a strange mix of fear, hope, and resignation as ${he}`);
			if (canSee(slave)) {
				r.push(`views`);
			} else {
				r.push(`feels`);
			}
			r.push(`the vagina that now adorns ${his} formerly featureless crotch. Eventually ${his} shoulders slump and ${he} tries to carry on knowing that this is just another hole for your amusement, not ${hers}. <span class="devotion dec">${He} will struggle with feelings of confusion over just what your plans for ${him} are.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		} else {
			r.push(`Of course, ${he} already realized while exiting that ${his} genitalia was completely reshaped. ${He} didn't expect`);
			if (slave.genes === GenderGenes.FEMALE) {
				r.push(`to ever have a pussy again,`);
			} else {
				r.push(`to be given a hole other than ${his} anus,`);
			}
			r.push(`but expectations and the reality are two different things. ${He}'s beside ${himself}, weeping gently. ${He} absently moves a hand to where there used to be nothing and snatches it away with a sob, knowing this was done for yourself, not ${him}. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">cripplingly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 20;
			reaction.devotion -= 20;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.NoneToFemale = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Create a vagina";
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.vagina = 0;
		this._slave.skill.vaginal = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.NoneToFemale());
	}
};
