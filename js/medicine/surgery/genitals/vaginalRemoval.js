App.Medicine.Surgery.Reactions.VaginaRemoval = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`Surprisingly, ${he} already realized while exiting that ${his} genitalia was completely reshaped. The reasons why are lost to ${him}, though.`);
		} else if (slave.dick === 0) {
			r.push(`Of course, ${he} already realized while exiting that something very dear to ${him} has been taken away.`);
			if (slave.devotion > 50 && slave.sexualFlaw === SexualFlaw.SELFHATING) {
				r.push(`Strong emotions play out on ${his} face as ${he} experiences a watershed in ${his} life of sexual slavery, perhaps the most radical one ${he}'ll ever experience. ${He} loves you with all ${his} being, and truly hates ${himself}. ${He} finds ${himself} in an emotional place where ${he}'s willing to accept having ${his} womanhood torn out. ${He} knows ${he}'s a worthless piece of trash, and realizes that if you feel like removing the parts of ${his} body that can feel sexual pleasure, that's your prerogative. In moments, ${he}'s confirmed in <span class="devotion inc">total, final, fanatical submission to your will.</span> It's almost frightening.`);
				reaction.devotion += 50;
			} else if (slave.devotion > 20 && slave.fetishKnown === 1 && slave.fetishStrength > 95 && slave.fetish === Fetish.BUTTSLUT) {
				r.push(`${He}'s such a complete buttslut, though, that ${he} finds ${he} doesn't really care. ${He} never really paid much attention to ${his} front hole; it got wet when ${he} got buttfucked, but that was mostly useful to provide a little lube for phalli that fucked it before switching to ${his} ass. If anything, ${he}'s <span class="trust inc">reassured</span> by the implication that ${his} asshole is all that matters about ${him}, and of course is forced even further into <span class="devotion inc">submission to your will.</span>`);
				reaction.devotion += 8;
				reaction.trust += 8;
			} else if (slave.devotion > 20 && slave.fetishKnown === 1 && slave.fetishStrength > 95 && slave.fetish === Fetish.CUMSLUT) {
				r.push(`${He}'s such an oral slut, though, that ${he} finds ${he} doesn't really care. ${He} viewed ${his} pussy as a nice place for stimulation while ${he} licked, blew, and sucked; if ${he} has to learn to get off from throat stimulation ${he} will. As far as ${he}'s concerned, you've simply confirmed that ${his} most important hole is the one in ${his} face. If anything, ${he}'s <span class="trust inc">reassured</span> by the implication that ${his} real pussy has always been the one in the middle of ${his} face, and of course, ${he}'s forced even further into <span class="devotion inc">submission to your will.</span>`);
				reaction.devotion += 8;
				reaction.trust += 8;
			} else if (slave.devotion > 20 && slave.fetishKnown === 1 && slave.fetishStrength > 95 && slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`${He}'s such a total submissive, though, that ${he} accepts even this. Having ${his} womanhood torn out, greatly curtailing ${his} physical ability to enjoy sex, is perhaps the final step in sexual slavery, and ${he}'s a little awed by it. If anything, ${he}'s <span class="trust inc">reassured</span> by the implicit promise that ${his} body exists for the degrading sexual gratification of others, and of course, ${he}'s forced even further into <span class="devotion inc">submission to your will.</span>`);
				reaction.devotion += 8;
				reaction.trust += 8;
			} else if (slave.devotion > 95) {
				r.push(`Doubt, fear, and even nausea play across ${his} face, but ${he}'s so worshipful of you that ${he} masters them all, accepting that this is your will. There's surprisingly little mental effect on ${him}. The horror of having ${his} womanhood torn out is so strong that it breaks through to ${him}, and the only way ${he} can find to deal with it is to think about it as little as possible. ${He} falls back on worshipful duty.`);
			} else if (slave.devotion > 50) {
				r.push(`${He}'s devoted to you, but doubt and fear play across ${his} face as ${he} comes to terms with what's happened. ${He} does not see how having ${his} womanhood torn out will improve ${his} sexual slavery. ${He} does not rage or scream, but ${he} does cry, <span class="devotion dec">sadly wondering</span> whether ${he}'s valuable to you at all, or if ${he}'s just a surgical plaything to be degraded. ${He}'s <span class="trust dec">very frightened</span> that you'll cut up more of ${him}.`);
				reaction.trust -= 10;
				reaction.devotion -= 10;
			} else if (slave.devotion > 20) {
				r.push(`${He}'s properly broken to slavery, but this is much too far. Having ${his} womanhood torn out cuts straight through ${his} conditioning, and tears roll down ${his} face as the horrible permanence of what's happened to ${him} really sinks in. <span class="devotion dec">Open anger</span> begins to become apparent through ${his} tears; ${he} thought that ${his} obedience merited better than this, and ${he}'s <span class="trust dec">extremely terrified</span> to find that despite being a decent slave, ${he} remains a surgical playground.`);
				reaction.trust -= 20;
				reaction.devotion -= 20;
			} else {
				r.push(`${He}'s horrified almost beyond the ability of ${his} mind to comprehend. ${His} face takes on a blank look as ${he} goes into shock. There's no screaming and no tears, not yet; it will take ${him} time to process what's happened to ${him}. Without a doubt, ${he}'ll be absolutely filled by <span class="devotion dec">rage</span> and <span class="trust dec">terror.</span>`);
				reaction.trust -= 40;
				reaction.devotion -= 40;
			}
		} else {
			r.push(`Of course, ${he} already realized while exiting that ${his} genitalia has been radically simplified. As a herm slave ${he} knew this day might come,`);
			if (slave.devotion > 50) {
				r.push(`and ${his} face is a strange mix of hope, happiness, satisfaction, and the tiniest tinge of soul-crushing sadness as ${he}`);
				if (canSee(slave)) {
					r.push(`views`);
				} else {
					r.push(`feels`);
				}
				r.push(`the cock that is all that remains of ${his} once-unique hermaphroditic genitalia. <span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} body.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span>`);
				reaction.devotion += 4;
			} else if (slave.devotion > 20) {
				r.push(`and ${his} face is a strange mix of fear, hope, and resignation as ${he}`);
				if (canSee(slave)) {
					r.push(`views`);
				} else {
					r.push(`feels`);
				}
				r.push(`the cock that is all that remains of ${his} once-unique hermaphroditic genitalia. Eventually ${his} shoulders slump and ${he} tries to carry on. <span class="devotion dec">${He} will struggle with feelings of confusion and loss.</span> Since the surgery was invasive, <span class="health dec">${his} health has been greatly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
				reaction.trust -= 10;
				reaction.devotion -= 5;
			} else {
				r.push(`but expectations and the reality are two different things. ${He}'s beside ${himself}, weeping gently.`);
				if (hasAnyArms(slave)) {
					r.push(`${He} absently moves a hand to where ${his} pussy would have been and snatches it away with a sob.`);
				}
				r.push(`<span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> ${He} is <span class="trust dec">cripplingly afraid</span> of your total power over ${his} body.`);
				reaction.trust -= 20;
				reaction.devotion -= 20;
			}
		}
		r.push(`Naturally, <span class="health dec">${his} health has been greatly affected</span> by such serious surgery.`);

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.VaginaRemoval = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove pussy";
	}

	get description() {
		const {his} = getPronouns(this.originalSlave);
		return (this.originalSlave.ovaries === 1) ? `This will remove ${his} ovaries as well` : "";
	}

	get invasive() {
		return true;
	}

	apply(cheat) {
		surgeryAmp(this._slave, "vagina");
		return this._assemble(new App.Medicine.Surgery.Reactions.VaginaRemoval());
	}
};
