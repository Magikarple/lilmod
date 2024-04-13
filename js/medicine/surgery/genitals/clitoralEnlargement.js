App.Medicine.Surgery.Reactions.ClitoralEnlargement = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} leaves the surgery with a terribly sore pussy and little desire to mess with it. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.energy > 95) {
			r.push(`${He} leaves the surgery with a terribly sore pussy. ${He} is <span class="devotion inc">filled with joy</span> at the thought that ${his} pussy will now be more appealing to ${his} ${getWrittenTitle(slave)}; ${his} sensitivity has been increased, <span class="libido inc">raising ${his} sex drive slightly.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 10;
			slave.energy += 1;
		} else if (slave.devotion > 50) {
			r.push(`${He} leaves the surgery with a terribly sore pussy. ${He}'s <span class="devotion inc">happy</span> that you think ${his} pussy worth the effort of surgical improvement; ${his} sensitivity has been increased, <span class="libido inc">raising ${his} sex drive slightly.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
			slave.energy += 1;
		} else if (slave.devotion >= -20) {
			r.push(`${He} leaves the surgery with a terribly sore pussy. ${He}'s somewhat revolted by the surgery, but as far as ${he}'s concerned, the short recovery period will mean a time during which ${he} can be sure no one will use ${his} pussy. ${His} sensitivity has been increased, <span class="libido inc">raising ${his} sex drive slightly.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
			slave.energy += 1;
		} else {
			r.push(`${He} leaves the surgery with a terribly sore pussy. ${He}'s <span class="devotion dec">horrified</span> at surgical alteration of ${his} womanhood; this is probably more of an invasion than ${he} could readily imagine before today. ${His} sensitivity has been increased, <span class="libido inc">raising ${his} sex drive slightly.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} most intimate parts.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
			slave.energy += 1;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.ClitoralEnlargement = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Increase clit";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.clit += 1;
		return this._assemble(new App.Medicine.Surgery.Reactions.ClitoralEnlargement());
	}
};
