App.Medicine.Surgery.Reactions.Braces = class extends App.Medicine.Surgery.SimpleReaction {
	get invasive() {
		return false;
	}

	get permanentChanges() {
		return false;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} is quite quick to realize ${his} teeth now have something on them. What its purpose is is beyond ${him}, though.`);
		} else if (diff.teeth === "straightening braces") {
			r.push(`Quite aware that ${his} crooked, aching teeth are now in braces,`);
			if (slave.devotion > 50) {
				r.push(`${he} smiles tentatively at`);
				if (canSee(slave)) {
					r.push(`${himself} in the mirror.`);
				} else {
					r.push(`you.`);
				}
				r.push(`${He}'s experiencing considerable discomfort, but ${he} knows it will <span class="devotion inc">make ${him} prettier for you,</span> and resolves to do ${his} best to put up with it.`);
				reaction.devotion += 4;
			} else if (slave.devotion > 20) {
				r.push(`${he} pulls ${his} lips back to`);
				if (canSee(slave)) {
					r.push(`check them out.`);
				} else {
					r.push(`feel them.`);
				}
				r.push(`${He}'s experiencing considerable discomfort, but ${he} knows it will <span class="devotion inc">make ${him} prettier,</span> and ${he} accepts that the pain is for ${his} own good.`);
				reaction.devotion += 2;
			} else {
				r.push(`${he} pulls ${his} lips back to`);
				if (canSee(slave)) {
					r.push(`check them out.`);
				} else {
					r.push(`feel them.`);
				}
				r.push(`${He}'s experiencing considerable discomfort, and ${his} feelings are mixed. ${He} knows that straightening teeth is expensive, and in different circumstances ${he} would probably be glad to be given free braces. However, ${he}'s very aware that ${he}'s being beautified because ${he}'s a sex slave.`);
			}
		} else if (diff.teeth === "cosmetic braces") {
			r.push(`Quite aware that ${his} aching teeth are now in braces,`);
			if (slave.devotion > 50) {
				r.push(`${he} smiles tentatively at`);
				if (canSee(slave)) {
					r.push(`${himself} in the mirror.`);
				} else {
					r.push(`you.`);
				}
				r.push(`${His} teeth are already quite straight, so ${he} doesn't understand why you've done this. ${He}'s not unwilling to put up with inexplicable things you command, however, so ${he} resolves to put up with this, too.`);
			} else if (slave.devotion > 20) {
				r.push(`${he} pulls ${his} lips back to`);
				if (canSee(slave)) {
					r.push(`check them out.`);
				} else {
					r.push(`feel them.`);
				}
				r.push(`The discomfort is limited by the fact that ${his} teeth are already straight. ${He} doesn't understand why you've given ${his} braces anyway, so ${his} reaction is limited to vague confusion.`);
			} else {
				r.push(`${he} pulls ${his} lips back to`);
				if (canSee(slave)) {
					r.push(`check them out.`);
				} else {
					r.push(`feel them.`);
				}
				r.push(`${His} teeth are already straight, limiting the discomfort but confusing ${him} greatly. ${He}'s not a little relieved that the autosurgery's attention to ${his} mouth only left ${him} with pointless braces, and is only <span class="devotion dec">mildly angered</span> by the strange intrusion.`);
				reaction.devotion -= 2;
			}
		}
		r.push(`Though unpleasant, orthodontia isn't particularly harmful; ${his} health is unaffected.`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.RemoveBraces = class extends App.Medicine.Surgery.SimpleReaction {
	get invasive() {
		return false;
	}

	get permanentChanges() {
		return false;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} is quite quick to realize ${his} teeth are missing something.`);
		} else {
			r.push(`Quite aware that ${his} teeth are now free of ${his} braces,`);
			if (slave.devotion > 50) {
				r.push(`${he} smiles tentatively`);
				if (canSee(slave)) {
					r.push(`at ${himself} in the mirror`);
				} else {
					r.push(`and runs ${his} tongue across ${his} teeth`);
				}
				r.push(`only to find they are as crooked as ever. ${He} immediately shuts ${his} mouth, <span class="devotion dec">${his} opinion of you souring,</span> and carries on as if you had never put them on ${him} in the first place.`);
				reaction.devotion -= 4;
			} else if (slave.devotion > 20) {
				r.push(`${he} pulls ${his} lips back to`);
				if (canSee(slave)) {
					r.push(`check them out`);
				} else {
					r.push(`feel them`);
				}
				r.push(`only to find they are as crooked as ever. ${He} immediately shuts ${his} mouth, <span class="devotion dec">${his} opinion of you souring,</span> and carries on as if you had never put them on ${him} in the first place.`);
				reaction.devotion -= 2;
			} else {
				r.push(`${he} pulls ${his} lips back to`);
				if (canSee(slave)) {
					r.push(`check them out.`);
				} else {
					r.push(`feel them.`);
				}
				r.push(`${He} knows that straightening teeth is expensive and sighs, feeling that ${he}'s <span class="devotion dec">not worth the expense.</span> No matter what ${he} thought of you, ${he} felt ${he} would at least benefit from having nice teeth, and now it's clear to ${him}: <span class="trust dec">You don't care.</span>`);
				reaction.devotion -= 5;
				reaction.trust -= 5;
			}
		}
		r.push(`Though unpleasant, orthodontia isn't particularly harmful; ${his} health is unaffected.`);


		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Reactions.RemoveCosmeticBraces = class extends App.Medicine.Surgery.SimpleReaction {
	get invasive() {
		return false;
	}

	get permanentChanges() {
		return false;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} is quite quick to realize ${his} teeth are missing something.`);
		} else {
			r.push(`Quite aware that ${his} teeth are now free of ${his} braces,`);
			if (slave.devotion > 50) {
				r.push(`${he} smiles tentatively`);
			} else {
				r.push(`${he} pulls ${his} lips back to`);
			}
			if (canSee(slave)) {
				r.push(`check them out`);
			} else {
				r.push(`feel them`);
			}
			r.push(`and finds they are now back to normal.`);
		}
		r.push(`Though unpleasant, orthodontia isn't particularly harmful; ${his} health is unaffected.`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.ApplyBraces = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Apply braces";
	}

	apply(cheat) {
		this._slave.teeth = "straightening braces";
		return this._assemble(new App.Medicine.Surgery.Reactions.Braces());
	}
};

App.Medicine.Surgery.Procedures.RemoveBraces = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove braces";
	}

	apply(cheat) {
		this._slave.teeth = "crooked";
		return this._assemble(new App.Medicine.Surgery.Reactions.RemoveBraces());
	}
};

App.Medicine.Surgery.Procedures.AddCosmeticBraces = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Unnecessary braces";
	}

	apply(cheat) {
		this._slave.teeth = "cosmetic braces";
		return this._assemble(new App.Medicine.Surgery.Reactions.Braces());
	}
};

App.Medicine.Surgery.Procedures.RemoveCosmeticBraces = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove braces";
	}

	apply(cheat) {
		this._slave.teeth = "normal";
		return this._assemble(new App.Medicine.Surgery.Reactions.RemoveCosmeticBraces());
	}
};
