App.Medicine.Surgery.Reactions.Relocate = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`When ${he} begins surgical recovery, ${his} groin hurts quite a lot, and ${he} can't quite tell what's going on down there. Since the surgery was invasive, <span class="health dec">${his} health has been seriously affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`When ${he} begins surgical recovery, ${his} groin hurts quite a lot, and ${he} can't quite tell what's going on down there. However, ${he} was able to follow enough of the surgery to understand that ${he} still has ${his} balls, even if they're no longer visible. ${He}'s eager to`);
			if (canSee(slave)) {
				r.push(`see, and when ${he}'s recovered enough, ${he}'s pleased by the sight`);
			} else {
				r.push(`feel, and when ${he}'s recovered enough, ${he}'s pleased by the sensation`);
			}
			r.push(`of the smooth skin`);
			if (slave.dick > 0) {
				r.push(`beneath ${his} still-functional cock.`);
			} else {
				r.push(`where ${his} testicles used to be.`);
			}
			r.push(`<span class="devotion inc">${He} has become more submissive due to your reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been seriously affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`When ${he} begins surgical recovery, ${his} groin hurts quite a lot, and ${he} can't quite tell what's going on down there. However, ${he} was able to follow enough of the surgery to understand that ${he} still has ${his} balls, even if they're no longer visible. ${He}'s relieved ${he} hasn't been gelded, but ${he}'s still quite horrified. <span class="devotion dec">${He} blames you for changing ${him} so radically.</span> Since the surgery was invasive, <span class="health dec">${his} health has been seriously affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		} else {
			r.push(`When ${he} begins surgical recovery, ${his} groin hurts quite a lot, and ${he} can't quite tell what's going on down there. ${He} spends a long time in terror, wondering whether ${he}'s been gelded, but ${he} eventually realizes that ${his} balls have merely been relocated. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been seriously affected.</span> ${He} is <span class="trust dec">very afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 20;
			reaction.devotion -= 20;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.RelocateBalls = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Move them inside abdomen and remove scrotum";
	}

	get description() {
		return `This will have a negative impact on cum production`;
	}

	get healthCost() {
		return 20;
	}

	apply(cheat) {
		this._slave.scrotum = 0;
		return this._assemble(new App.Medicine.Surgery.Reactions.Relocate());
	}
};
