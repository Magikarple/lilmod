App.Medicine.Surgery.Reactions.Geld = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`Surprisingly, ${he} already realized while exiting that ${his} scrotum was gone. The reasons why are lost to ${him}, though. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`Of course, ${he} already realized while exiting that ${his} scrotum was gone. ${He} was already accepting of ${his} role as an effectively female slave, a receptacle for cock, and ${he} now understands that you no longer think it will ever again be necessary for ${him} to cum. <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`Of course, ${he} already realized while exiting that ${his} scrotum was gone. ${He} was already struggling to accept ${his} role as a female slave, a receptacle for cock, and ${he} now understands it better. ${He} has not yet accepted that ${he} will never again fuck, though, that ${his} future is nothing but getting fucked. <span class="devotion dec">${He} will struggle with feelings of confusion and loss.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		} else {
			r.push(`Of course, ${he} already realized while exiting that ${his} scrotum was gone. ${He} cannot accept that it is no longer ${his} role to fuck holes, but rather to provide a hole for others to fuck.`);
			if (hasAnyArms(slave)) {
				r.push(`${He} absently moves a hand to where ${his} balls would have been and snatches it away with a sob.`);
			}
			r.push(`<span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">cripplingly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 20;
			reaction.devotion -= 20;
		}
		if ((slave.assignment === Job.MILKED || slave.assignment === Job.DAIRY) && slave.lactation === 0) {
			r.push(`<span class="job change">${His} assignment has defaulted to rest.</span>`);
			reaction.shortReaction.push(`<span class="job change">${His} assignment has defaulted to rest.</span>`);
			removeJob(slave, slave.assignment);
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Geld = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Geld";
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		this._slave.balls = 0;
		this._slave.ballType = "human";
		this._slave.scrotum = 0;
		this._slave.vasectomy = 0;
		if (this._slave.drugs === Drug.GROWTESTICLE ||
			this._slave.drugs === Drug.HYPERTESTICLE ||
			this._slave.drugs === Drug.ATROPHYTESTICLE) {
			this._slave.drugs = Drug.NONE;
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.Geld());
	}
};
