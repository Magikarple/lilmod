App.Medicine.Surgery.Reactions.ShortenTendons = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} exits the surgery on all fours, unable to stand due to the changes to ${his} legs. A whorish pair of heels are slipped onto ${him} and ${he} is forced to ${his} feet to show that ${he} can indeed walk comfortably while wearing them. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} exits the surgery on all fours, unable to stand due to the changes to ${his} legs. ${He} finds a whorish pair of heels waiting for ${him} and eagerly puts them on, gingerly standing to find that ${he} can indeed walk comfortably while wearing them. ${He} struts back and forth experimentally and then offers`);
			if (canSee(slave)) {
				r.push(`the mirror`);
			} else {
				r.push(`you`);
			}
			r.push(`${his} asshole to check to see that ${his} ability to take a standing buttfuck hasn't been affected. <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He} exits the surgery on all fours, unable to stand due to the changes to ${his} legs. ${He} finds a whorish pair of heels waiting for ${him} and obediently puts them on, gingerly standing to find that ${he} can indeed walk comfortably while wearing them. After a while ${he} realizes that ${he}'ll never walk without looking like a stripper again, but ${he} accepts it. ${He} isn't much affected mentally. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else {
			r.push(`${He} exits the surgery on all fours, unable to stand due to the changes to ${his} legs. ${He} finds a whorish pair of heels waiting for ${him}, but obstinately ignores them. After some time, ${he} realizes that the situation isn't changing and puts them on, gingerly standing to find that ${he} can indeed walk comfortably while wearing them. ${His}`);
			if (canSee(slave)) {
				r.push(`eyes are`);
			} else {
				r.push(`face is`);
			}
			r.push(`filled with hatred when ${he}`);
			if (canSee(slave)) {
				r.push(`sees ${his} new and permanent appearance in the mirror.`);
			} else {
				r.push(`discovers this is the only way ${he}'ll be able to stand now.`);
			}
			r.push(`<span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.ReplaceTendons = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} exits the surgery on ${his} own two feet. ${He}'s still sore, but the modern surgery is fast and effective, and ${he} can use ${his} restored legs immediately. ${He} gingerly stands on one foot, then the other; and even takes a few little hops. ${He} obviously confused, but will get used to it soon enough. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion >= -20) {
			r.push(`${He} exits the surgery on ${his} own two feet. ${He}'s still sore, but the modern surgery is fast and effective, and ${he} can use ${his} restored legs immediately. ${He} gingerly stands on one foot, then the other; and even takes a few little hops. ${He}'s grinning like a fool the whole time. <span class="devotion inc">${He} has become more obedient due to gratitude.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else {
			r.push(`${He} exits the surgery on ${his} own two feet. ${He}'s still sore, but the modern surgery is fast and effective, and ${he} can use ${his} restored legs immediately. ${He} gingerly stands on one foot, then the other; and even takes a few little hops. ${He} obviously confused, finding it surprising that you would go to the expense and trouble of repairing ${him}. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};


App.Medicine.Surgery.Procedures.ShortenTendons = class extends App.Medicine.Surgery.Procedure {
	get name() { return "Shorten tendons"; }

	get description() {
		const {him} = getPronouns(this._slave);
		return `Prevents ${him} from walking in anything but very high heels`;
	}

	get healthCost() { return 20; }

	apply(cheat) {
		this._slave.heels = 1;
		this._slave.shoes = "heels";
		return this._assemble(new App.Medicine.Surgery.Reactions.ShortenTendons());
	}
};


App.Medicine.Surgery.Procedures.ReplaceTendons = class extends App.Medicine.Surgery.Procedure {
	get name() { return "Replace tendons"; }

	get healthCost() { return 10; }

	apply(cheat) {
		this._slave.heels = 0;
		this._slave.shoes = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.ReplaceTendons());
	}
};
