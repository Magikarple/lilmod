App.Medicine.Surgery.Reactions.Face = class extends App.Medicine.Surgery.SimpleReaction {
	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, his, him, himself} = getPronouns(slave);
		const r = [];

		r.push(faceIncreaseDesc(slave, diff.face));
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} doesn't notice the improvements to ${his} face, but ${he}'s not the one looking at it. As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
		} else if (slave.devotion > 50) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines ${his} new self in the mirror with approval. ${He} doesn't recognize ${himself} quite yet, but ${he}`);
			} else {
				r.push(`listens closely to the description of ${his} new face. ${He}`);
			}
			r.push(`hopes you'll like ${his} new face better and use ${him} more frequently as a result. <span class="devotion inc">${He}'s happy with your changes to ${his} face.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span>`);
			reaction.devotion += 4;
		} else if (slave.devotion >= -20) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines ${his} new self in the mirror with hesitation. ${He} doesn't recognize ${himself} quite yet, but ${he}`);
			} else {
				r.push(`listens closely to the description of ${his} new face. ${He}`);
			}
			r.push(`hopes you'll like ${his} new face better and treat ${him} more kindly as a result. As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
			reaction.trust -= 5;
		} else {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`examines ${his} new self in the mirror with revulsion. ${He} doesn't recognize ${himself} quite yet,`);
			} else {
				r.push(`listens closely to the description of ${his} new face,`);
			}
			r.push(`which ${he} hates, though ${he} hopes you'll like ${his} new face better and punish ${him} less cruelly as a result. For now, <span class="devotion dec">${he} seems to view this fake face as a cruel imposition.</span> As with all surgery <span class="health dec">${his} health has been slightly affected.</span> ${He} is <span class="trust dec">terribly afraid</span> of your total power over ${his} body.`);
			reaction.trust -= 10;
			reaction.devotion -= 5;
		}

		reaction.longReaction.push(r);
		return reaction;
	}
};

App.Medicine.Surgery.Procedures.FaceShape = class extends App.Medicine.Surgery.Procedure {
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {string} targetShape
	 */
	constructor(slave, targetShape) {
		super(slave);
		this.targetShape = targetShape;
	}

	get name() {
		if (this.targetShape === FaceShape.ANDRO && this._slave.faceShape === FaceShape.MASC) {
			return `Soften to androgynous`;
		} else if (this.targetShape === FaceShape.NORMAL) {
			return `Make conventionally feminine`;
		} else {
			return capFirstChar(this.targetShape);
		}
	}

	get healthCost() { return 10; }

	apply(cheat) {
		this._slave.faceShape = this.targetShape;
		faceIncreaseAction(this._slave, 20);
		this._slave.faceImplant = Math.clamp(this._slave.faceImplant + faceSurgeryArtificiality(), 0, 100);
		return this._assemble(new App.Medicine.Surgery.Reactions.Face());
	}
};

App.Medicine.Surgery.Procedures.FaceAttractiveness = class extends App.Medicine.Surgery.Procedure {
	get name() { return "Just improve attractiveness"; }

	get healthCost() { return 10; }

	apply(cheat) {
		faceIncreaseAction(this._slave, 20);
		this._slave.faceImplant = Math.clamp(this._slave.faceImplant + faceSurgeryArtificiality(), 0, 100);
		return this._assemble(new App.Medicine.Surgery.Reactions.Face());
	}
};
