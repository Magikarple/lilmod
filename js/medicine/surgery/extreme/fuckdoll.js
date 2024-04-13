App.Medicine.Surgery.Reactions.Fuckdoll = class extends App.Medicine.Surgery.SimpleReaction {
	get removeJob() {
		return true;
	}

	intro(slave) {
		const r = [];
		r.push(`As the remote surgery's long recovery cycle completes, your new Fuckdoll`);
		if (hasAnyLegs(slave)) {
			r.push(`stumbles`);
		} else {
			r.push(`is carried`);
		}
		r.push(`out of the surgery room. The only`);
		if (slave.vagina > -1) {
			r.push(`areas of skin visible are those around its vulva and anus`);
		} else {
			r.push(`area of skin visible is that around its anus${(slave.lips > 95) ? `, though its lips are also visible as its facepussy makes the standard Fuckdoll mouth insert unnecessary` : ``}. You can see it starting to struggle against the constricting material of the Fuckdoll suit as the sedation wears off. Other than the tiny area of exposed skin and the slight movement, there's no indication that the sex doll in front of you is alive at all.`);
		}
		return r;
	}

	reaction(slave, diff) {
		const reaction = super.reaction(slave, diff);
		const {He, he, His, his, him, sister, wife} = getPronouns(slave);
		const relations = V.slaves.filter((s) => areRelated(s, slave) && (s.ID !== slave.relationshipTarget));
		let r = [];

		let relatedCount = 0;
		for (const relation of relations) {
			const {he2, his2} = getPronouns(relation).appendSuffix("2");
			if (isParentP(slave, relation) || isParentP(relation, slave)) {
				r.push(`${relation.slaveName} will be <span class="devotion dec">horrified</span> and <span class="trust dec">afraid</span> when ${he2} finds out that ${his2} ${relativeTerm(relation, slave)} is now a Fuckdoll.`);
				relation.devotion -= 40;
				relation.trust -= 40;
				relatedCount++;
			}
			switch (areSisters(slave, relation)) {
				case 1:
					r.push(`${relation.slaveName} will be <span class="devotion dec">horrified</span> and <span class="trust dec">afraid</span> when ${he2} finds out that ${his2} twin is now a Fuckdoll. Is ${he2} next?`);
					relation.devotion -= 50;
					relation.trust -= 50;
					relatedCount++;
					break;
				case 2:
					r.push(`${relation.slaveName} will be <span class="devotion dec">horrified</span> and <span class="trust dec">afraid</span> when ${he2} finds out that ${his2} ${sister} is now a Fuckdoll.`);
					relation.devotion -= 40;
					relation.trust -= 40;
					relatedCount++;
					break;
				case 3:
					r.push(`${relation.slaveName} will be <span class="devotion dec">horrified</span> and <span class="trust dec">afraid</span> when ${he2} finds out that ${his2} half-${sister} is now a Fuckdoll.`);
					relation.devotion -= 30;
					relation.trust -= 30;
					relatedCount++;
			}
		}
		if (relatedCount > 0) {
			reaction.shortReaction.push(`${His} ${relatedCount > 0 ? "relatives" : "relative"} will be <span class="devotion dec">horrified</span> and <span class="trust dec">afraid</span> when they find out about ${his} fate.`);
		}
		if (slave.relationship > 0) {
			const rel = getSlave(slave.relationshipTarget);
			if (rel) {
				const {he2, his2} = getPronouns(rel).appendSuffix("2");
				const relTerm = relativeTerm(rel, slave);
				r.push(`${rel.slaveName} will be <span class="devotion dec">horrified</span> and <span class="trust dec">afraid</span> when ${he2} finds out that ${his2}`);
				if (relTerm !== null) {
					r.push(`${relTerm} and`);
				}
				let name;
				if (slave.relationship > 4) {
					name = wife;
				} else if (slave.relationship > 3) {
					name = `lover`;
				} else if (slave.relationship > 2) {
					name = `intimate friend`;
				} else if (slave.relationship > 1) {
					name = `best friend`;
				} else {
					name = `friend`;
				}
				r.push(`${name} is now a Fuckdoll.`);
				reaction.shortReaction.push(`${His} ${name} will be <span class="devotion dec">horrified</span> and <span class="trust dec">afraid</span> when they find out about ${his} fate.`);
				rel.devotion -= slave.relationship * 10;
				rel.trust -= slave.relationship * 10;
				rel.relationship = 0;
				rel.relationshipTarget = 0;
			}
		} else if (slave.relationship < 0) {
			r.push(`${His} <span class="relationship dec">slave relationship to you is effectively over,</span> since everyone in the world outside ${his} suit is created equal to ${him}. ${He}'ll probably forget to distinguish your`);
			if (V.PC.dick !== 0) {
				r.push(`dick if it's pushed inside ${his}`);
			} else {
				r.push(`pussy if it's pressed against ${his} face hole`);
			}
			r.push(`soon enough.`);
		}
		if (slave.rivalry !== 0) {
			const rival = getSlave(slave.rivalryTarget);
			if (rival) {
				const {he2} = getPronouns(rival).appendSuffix("2");
				r.push(`Naturally, ${his} rivalry with ${rival.slaveName} is over. ${rival.slaveName} will be pleased ${he2} doesn't have to see ${slave.slaveName} any more, though being a Fuckdoll is terrifying enough that it's not likely ${he2}'ll derive much satisfaction from it.`);
				rival.rivalry = 0;
				rival.rivalryTarget = 0;
			}
		}
		slave.relationship = 0;
		slave.relationshipTarget = 0;
		slave.rivalry = 0;
		slave.rivalryTarget = 0;

		reaction.longReaction.push(r);
		r = [];
		r.push(`The Fuckdoll suit's systems connect to the arcology and run a full systems check. The reports waterfall down the nearest wallscreen, moving from the top of the Fuckdoll down. The simple brain activity sensor is showing elevated readings as ${slave.slaveName} desperately tries to find ${his} bearings.`);
		if (slave.hLength > 20) {
			r.push(`The twin tails of hair sticking out of the suit material that covers ${his} scalp are waving from side to side slightly as ${he} struggles.`);
		}
		if (getBestVision(slave) > 0) {
			r.push(`The suit does not have holes for vision, worsening the disorientation.`);
		}
		if (slave.voice === 0) {
			r.push(`${His} breath rushes in and`);
		} else {
			r.push(`Incoherent moans are coming`);
		}
		r.push(`out of ${his}`);
		if (slave.lips > 95) {
			r.push(`facepussy.`);
		} else {
			r.push(`mouth insert.`);
		}
		r.push(`The suit can stimulate every intimate area that it covers with vibration, electrostimulation, warmth, and cold, and ${slave.slaveName} must be in agony as it tests these systems.`);

		reaction.longReaction.push(r);
		r = [];

		r.push(`The suit includes a network of small tubes filled with hydraulic fluid, and tiny pumps to move it around. This is necessary to keep the Fuckdoll's internal temperature stable, but it can also be used to restrict ${his} movements. The suit is doing so now; the Fuckdoll is desperately attempting to move, but the suit won't let ${him}.`);
		if (hasAnyProstheticLimbs(slave)) {
			r.push(`Its P-Limbs have been removed, since they aren't compatible with Fuckdoll suits.`);
			removeLimbs(slave, "all");
		}
		if (isAmputee(slave)) {
			r.push(`The Fuckdoll's limbless torso rocks back and forth slightly.`);
		} else {
			if (hasBothLegs(slave)) {
				r.push(`${He}'s rocking back and forth slightly on ${his} heeled boots, which are designed for stability.`);
			} else if (hasAnyLegs(slave)) {
				r.push(`${He}'s rocking back and forth slightly on ${his} single heeled boot, which is designed for great stability.`);
			} else {
				r.push(`The Fuckdoll's legless torso rocks back and forth slightly.`);
			}
		}
		r.push(`The heart rate reading is so high that the Fuckdoll is receiving drugs to calm ${him} down and prevent damage; the suit can deliver these and any other necessary pharmaceuticals by intravenous shunt. Farther down, on the Fuckdoll's side over ${his} ribcage, there are a pair of metal ports. These allow ${him} to be fed.`);
		if (slave.belly > 1500) {
			r.push(`The suit does not cover ${his}`);
			if (slave.bellyPreg > 1500) {
				r.push(`pregnant`);
			} else {
				r.push(`rounded`);
			}
			r.push(`belly, which is allowed to protrude from a hole in the material.`);
		}

		reaction.longReaction.push(r);
		r = [];
		r.push(`The Fuckdoll's rear hole is extremely eye-catching from behind, since it's the only area of skin visible from that angle across ${his} body, which is a featureless expanse of dull latex-like material.`);
		if (slave.vagina > -1) {
			r.push(`From ${his} other side, ${his} front hole stands out likewise.`);
		}
		if (slave.dick > 0) {
			r.push(`${His} penis has its own pouch in the material.`);
		}
		r.push(`The Fuckdoll continues to struggle. Since ${he} is new, ${he} is not yet able to obey the tonal command system the suit uses to transfer orders to its inhabitant, who cannot otherwise hear. ${He} will have to learn by painful experience, and eventually, that is all ${he} will know.`);

		return reaction;
	}
};

App.Medicine.Surgery.Procedures.Fuckdoll = class extends App.Medicine.Surgery.Procedure {
	get name() {
		return "Encase in a Fuckdoll suit";
	}

	get _workCost() {
		return 0;
	}

	apply(cheat) {
		beginFuckdoll(this._slave);
		SetBellySize(this._slave);
		return this._assemble(new App.Medicine.Surgery.Reactions.Fuckdoll());
	}
};
