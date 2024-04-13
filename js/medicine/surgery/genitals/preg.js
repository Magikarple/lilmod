App.Medicine.Surgery.Reactions.Preg = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him} = getPronouns(slave);
		let r = [];

		r.push(`${He} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (this._strongKnownFetish(slave, Fetish.PREGNANCY)) {
			r.push(`${He} is <span class="devotion inc"> filled with joy</span> about being swollen with life and gleefully rubs ${his} soon to be huge belly. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.trust += 4;
			reaction.devotion += 10;
		} else if (slave.devotion > 50) {
			r.push(`${He}'s <span class="devotion inc">grateful</span> that you think ${his} offspring are valuable, and a little nervous about how ${he}'ll perform as a breeder. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He} understands the realities of ${his} life as a slave, so it isn't much of a shock. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and how big ${he} will get.`);
			reaction.trust -= 10;
		} else {
			r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> that you have forced ${him} to be a broodmother. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and ${his} rapidly filling womb.`);
			reaction.trust -= 15;
			reaction.devotion -= 15;
		}
		if (V.PC.dick !== 0) {
			reaction.longReaction.push(r);
			r = [];
			const seed = App.UI.DOM.makeElement("span", `The implant is highly receptive to fresh sperm right now; it would be trivial to seed it with yours and force ${him} to bear hundreds of your children.`);
			r.push(seed);
			App.UI.DOM.appendNewElement("div", seed, App.UI.DOM.link(
				`Seed ${his} pregnancy implant with your genetic material`,
				() => {
					const r = [];
					r.push(`You simply take ${him} on the spot, using ${him} to your liking and shooting a load deep into ${his} receptive pussy. The implant rewards ${him} upon successful fertilization, so ${his} moans of pleasure as you pull out of ${him} inform you ${he}'ll soon`);
					if (slave.broodmother === 2) {
						r.push(`be greatly swollen`);
					} else {
						r.push(`grow heavy`);
					}
					r.push(`with <span class="pregnant">your brood.</span>`);
					slave.pregSource = -1;
					WombImpregnate(slave, 1, -1, 1);
					/* to ensure player paternity we need actual fetus here */
					r.push(VCheck.Vaginal(slave, 1));

					const div = document.createElement("div");
					App.Events.addNode(div, r);
					App.UI.DOM.replace(seed, div);
				}
			));
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.ImplantPregGenerator = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Implant a pregnancy generator";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return `This will have severe effects on ${his} health and mind`;
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		this._slave.preg = 1;
		this._slave.pregWeek = 1;
		this._slave.pregKnown = 1;
		this._slave.pregType = 1;
		this._slave.broodmother = 1;
		this._slave.broodmotherFetuses = 1;
		this._slave.pregControl = "none";
		return this._assemble(new App.Medicine.Surgery.Reactions.Preg());
	}
};
