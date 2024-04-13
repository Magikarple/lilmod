App.Medicine.Surgery.Reactions.FuckdollExtraction = class extends App.Medicine.Surgery.SimpleReaction {
	intro(slave) {
		const r = [];
		r.push(`As the remote surgery's long recovery cycle completes, ${slave.slaveName}`);
		if (!hasAnyLegs(slave)) {
			r.push(`is carried`);
		} else if (canWalk(slave)) {
			r.push(`walks`);
		} else {
			r.push(`is escorted`);
		}
		r.push(`out of the surgery room.`);
		return r;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];
		r.push(`If you were expecting a great return to humanity after extracting ${him} from ${his} Fuckdoll suit, you're to be disappointed.`);
		if (getBestVision(slave) > 0) {
			r.push(`You're denied any reaction from ${him} to the sight of ${himself} in the mirror outside the recovery area, as ${he}'s wearing a pair of very dark glasses ${he}'ll have to keep on for a few hours yet. ${He}'s been denied almost all vision for a long time, and though ${his} recovery included light therapy, ${he}'s still very sensitive to it.`);
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${His} mind remains just as broken outside the suit as it was inside it. In many ways, ${he}'s as much of a living sex toy now as ${he} was when ${he} was a Fuckdoll; ${he}'s unresponsive to almost everything, though ${he} will probably still understand how to get fucked. ${His} personality is probably somewhere back there in the Fuckdoll maintenance areas, like the scraps of the suit that was just cut off ${him}. Just another piece of refuse.`);
		} else if (slave.fuckdoll > 20) {
			r.push(`Though ${he} retains possession of some of ${his} faculties, ${he}'s been severely affected by the weeks ${he}'s spent as a living sex toy. Any joy or relief at being liberated from the Fuckdoll suit is probably being suppressed by the similarity of the extraction procedure to the routine suit maintenance ${he} received weekly. If ${he} even understands that ${he}'s been freed, ${he}'s been trained so thoroughly that ${he} will struggle to adapt to life more complex than tonal commands and sexual use.`);
		} else {
			r.push(`Though ${he} hasn't been a Fuckdoll long enough to be permanently damaged, ${he}'s so emotionally exhausted by everything ${he}'s experienced over the past few weeks that ${he} betrays no relief or joy, or even any fear that ${he}'ll be turned into a Fuckdoll again. ${His} posture bespeaks something like apathy. ${He} should reawaken gradually, but for now ${he}'s still actively remembering how to live as a human, rather than as a living sex toy.`);
		}
		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.FuckdollExtraction = class extends App.Medicine.Surgery.Procedure {
	get name() {
		const {him} = getPronouns(this.originalSlave);
		return `Extract ${him}`;
	}

	get _workCost() {
		return 0;
	}

	apply(cheat) {
		this._slave.fuckdoll = 0;
		this._slave.clothes = "no clothing";
		this._slave.shoes = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.FuckdollExtraction());
	}
};
