App.Medicine.Surgery.Reactions.MaleToFemale = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`Surprisingly, ${he} already realized while exiting that ${his} genitalia was completely reshaped. The reasons why are lost to ${him}, though. Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`Of course, ${he} already realized while exiting that ${his} genitalia was completely reshaped. As a shemale slave ${he} knew this day might come, and ${his} face is a strange mix of hope, happiness, satisfaction, and the tiniest tinge of soul-crushing sadness as ${he}`);
			if (canSee(slave)) {
				r.push(`views`);
			} else {
				r.push(`feels`);
			}
			r.push(`the vagina that has replaced ${his} penis. <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`Of course, ${he} already realized while exiting that ${his} genitalia was completely reshaped. As a shemale slave ${he} knew this day might come, and ${his} face is a strange mix of fear, hope, and resignation as ${he}`);
			if (canSee(slave)) {
				r.push(`views`);
			} else {
				r.push(`feels`);
			}
			r.push(`the vagina that has replaced ${his} penis. Eventually ${his} shoulders slump and ${he} tries to carry on. <span class="devotion dec">${He} will struggle with feelings of confusion and loss.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		} else {
			r.push(`Of course, ${he} already realized while exiting that ${his} genitalia was completely reshaped. As a shemale slave ${he} knew this day might come, but expectations and the reality are two different things. ${He}'s beside ${himself}, weeping gently. ${He} absently moves a hand to where ${his} penis would have been and snatches it away with a sob. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">cripplingly afraid</span> of your total power over ${his} body.`);
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

App.Medicine.Surgery.Procedures.MaleToFemale = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Convert genitalia to female";
	}

	get healthCost() {
		return 40;
	}

	apply(cheat) {
		surgeryAmp(this._slave, "dick");
		this._slave.scrotum = 0;
		this._slave.balls = 0;
		this._slave.ballType = "human";
		this._slave.vasectomy = 0;
		this._slave.vagina = 0;
		this._slave.preg = -2;
		if (this._slave.drugs === Drug.GROWTESTICLE ||
			this._slave.drugs === Drug.HYPERTESTICLE ||
			this._slave.drugs === Drug.ATROPHYTESTICLE) {
			this._slave.drugs = Drug.NONE;
		}
		return this._assemble(new App.Medicine.Surgery.Reactions.MaleToFemale());
	}
};
