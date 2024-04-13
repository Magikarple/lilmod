App.Medicine.Surgery.Reactions.Mute = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} larynx. It takes a good while for ${him} to figure out what has happened, but eventually ${he} tries to speak and makes no sound. ${He} simply keeps trying for some time before accepting this is how things are. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} larynx. It takes a good while for ${him} to figure out what has happened, but eventually ${he} tries to speak and makes no sound. ${He} panics, but manages to control ${himself} at length and begins to think.`);
			if (canSee(slave)) {
				r.push(`Seeing`);
			} else {
				r.push(`Finding`);
			}
			r.push(`you, ${he} tries to ask you for instruction and realizes ${he} cannot.`);
			if (hasBothLegs(slave)) {
				r.push(`After more thought, ${he} simply gets on ${his} knees facing away from you and spreads ${his} buttocks to offer ${himself} to you.`);
			} else {
				r.push(`After more thought, ${he} simply rolls over facing away from you and winks ${his} asshole to offer ${himself} to you.`);
			}
			r.push(`<span class="devotion inc">${He} has become more submissive due to your radical reshaping of ${his} being.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion > 20) {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} larynx. It takes a good while for ${him} to figure out what has happened, but eventually ${he} tries to speak and makes no sound. ${He} panics, trying to scream or protest but only managing to cry. Eventually ${he} pulls ${himself} together. <span class="devotion dec">${He} will struggle with ${his} medically created disability.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 10;
		} else {
			r.push(`${He} clearly feels quite normal except for a vague ache around ${his} larynx. It takes a good while for ${him} to figure out what has happened, but eventually ${he} tries to speak and makes no sound. ${He} panics, trying to scream or protest but only managing to cry. As long as ${he} remains unbent to your will, ${he} will have a constant, inescapable reminder of who and what you are. <span class="devotion dec">The surgical invasion has filled ${him} with horror and anger.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">cripplingly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 20;
			reaction.devotion -= 50;
		}

		reaction.longReaction.push(r);
		return reaction;
	}

	outro(slave, diff, previousReaction) {
		const reaction = super.outro(slave, diff, previousReaction);
		const {He} = getPronouns(slave);

		if (slave.behavioralFlaw === BehavioralFlaw.BITCHY) {
			const r = `<span class="green">${He} can hardly make sharp remarks without a voice.</span>`;
			if (reaction.longReaction.length > 0) {
				reaction.longReaction.last()
					.push(r);
			} else {
				reaction.longReaction.push([r]);
			}
			slave.behavioralFlaw = BehavioralFlaw.NONE;
		}

		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Mute = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Remove vocal cords";
	}

	get healthCost() {
		return 10;
	}

	apply(cheat) {
		surgeryAmp(this._slave, "voicebox");
		return this._assemble(new App.Medicine.Surgery.Reactions.Mute());
	}
};
