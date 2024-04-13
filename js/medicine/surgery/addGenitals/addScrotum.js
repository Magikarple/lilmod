App.Medicine.Surgery.Reactions.AddScrotum = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		r.push(`${He} leaves the surgery gingerly, knowing ${he}'s had surgery on ${his} junk. Taking the first opportunity to`);
		if (canSee(slave)) {
			r.push(`look at ${his} crotch in a mirror,`);
		} else {
			r.push(`feel ${his} crotch,`);
		}
		r.push(`${he}'s`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`confused to find something new dangling there.`);
		} else if (slave.devotion > 50) {
			r.push(`overjoyed to find that ${he} has a ballsack. ${He} very obviously starts to think about how it will affect ${his} various functions as a sex slave. First, ${he} flexes ${his} Kegel muscles,`);
			if (canSee(slave)) {
				r.push(`watching raptly as`);
			} else {
				r.push(`giggling as ${he} feels`);
			}
			r.push(`${his} testicles move within the new pouch of soft skin beneath ${his} cock. Then ${he} starts to bounce and hump a little, this way and that, experimenting with how they move as ${he} performs fucking motions. ${He}'s <span class="trust inc">looking forward</span> to having fun with this latest alteration of ${his} body, and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future.`);
			reaction.trust += 5;
			reaction.devotion += 5;
		} else if (slave.devotion >= -20) {
			r.push(`shocked to find that ${he} has a ballsack. ${He} flexes ${his} Kegel muscles, mostly for lack of anything better to try,`);
			if (canSee(slave)) {
				r.push(`watching raptly as`);
			} else {
				r.push(`thinking deeply as`);
			}
			r.push(`${his} testicles move within the new pouch of soft skin beneath ${his} cock.`);
			if (canSee(slave)) {
				r.push(`Staring at the sight`);
			} else {
				r.push(`Transfixed on the motion`);
			}
			r.push(`with obviously mixed feelings, ${he} struggles for a while before bursting into girlish tears from the sheer ambivalence. ${He}'s <span class="trust dec">frightened of your ability to modify ${him},</span> and is more willing than ever to <span class="devotion inc">submit to your plans</span> for ${his} future.`);
			reaction.trust -= 5;
			reaction.devotion += 5;
		} else {
			r.push(`shocked and appalled to find that ${he} has a ballsack. ${He}`);
			if (canSee(slave)) {
				r.push(`stares at ${his} newly visible`);
			} else {
				r.push(`feels ${his} new`);
			}
			r.push(`balls in horror; it's obvious ${he} thought they were out of sight, and out of mind. ${He} checks ${himself} over carefully, and then bursts into tears, seemingly feeling that even if ${he} has a ballsack, ${his} cock is still a slave's bitchclit, and ${his} asshole is still a slut's asspussy. ${He}'s <span class="trust dec">frightened of your ability to modify ${him},</span> and <span class="devotion dec">resentful</span> of how you use it.`);
			reaction.trust -= 5;
			reaction.devotion -= 5;
		}
		r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);

		reaction.longReaction.push(r);
		return reaction;
	}
};


App.Medicine.Surgery.Procedures.OFAddScrotum = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Graft on";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.scrotum = this._slave.balls;
		return this._assemble(new App.Medicine.Surgery.Reactions.AddScrotum());
	}
};
