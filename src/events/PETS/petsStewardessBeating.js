App.Events.petsStewardessBeating = class petsStewardessBeating extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Stewardess,
			() => S.Stewardess.actualAge >= 35 || V.AgePenalty === 0
		];
	}

	actorPrerequisites() {
		return [[
			s => [Job.HOUSE, Job.QUARTER].includes(s.assignment)
		]];
	}

	execute(node) {
		const subSlave = getSlave(this.actors[0]);
		let r = [];
		const {
			He, His,
			he, his, him, himself
		} = getPronouns(S.Stewardess);
		const {
			He2,
			he2, his2, him2, himself2
		} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [S.Stewardess, subSlave], [null, "no clothing"]);

		App.Events.addParagraph(node, [
			`Poor`,
			App.UI.DOM.slaveDescriptionDialog(subSlave),
			`clearly isn't working as hard as ${he2} should.`,
			App.UI.DOM.slaveDescriptionDialog(S.Stewardess),
			`has ${him2} bent over with ${his2} buttocks bare, and is administering a punishing spanking. ${subSlave.slaveName}'s ${subSlave.skin} skin is starting to show the force of the beating, and ${he2}'s begging desperately for mercy.`
		]);

		r.push(`${S.Stewardess.slaveName}, meanwhile, is obviously enjoying torturing the poor servant for ${his2} failings. ${He}'s `);
		if (S.Stewardess.chastityPenis === 1) {
			r.push(`using a couple of fingers to buttfuck ${himself}`);
		} else if (canAchieveErection(S.Stewardess)) {
			r.push(`jacking off furiously`);
		} else if (S.Stewardess.dick > 0) {
			r.push(`rubbing ${his} pathetically soft dick`);
		} else if (S.Stewardess.vagina === -1) {
			r.push(`desperately rubbing ${his} soft perineum`);
		} else {
			r.push(`rubbing ${his} sopping pussy`);
		}
		r.push(`with ${his} other hand, getting close to orgasm as the servant begs and moans.`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Fuck the servant's mouth as the stewardess beats ${him2}`, fuck),
			new App.Events.Result(`Make sure your stewardess remembers ${his} place`, remembers, S.Stewardess.anus === 0 ? `This option will take ${S.Stewardess.slaveName}'s anal virginity` : ``)
		]);

		function fuck() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`In a conversational tone of voice, you tell ${S.Stewardess.slaveName} to continue the spanking. ${subSlave.slaveName} has one anguished second to realize what's happening before you shove yourself`);
			if (V.PC.dick === 0) {
				r.push(`against ${his2} mouth.`);
			} else {
				r.push(`down ${his2} throat.`);
			}
			r.push(`${He2} gags reflexively, jerking back, only to jerk forward again in automatic pain avoidance when ${S.Stewardess.slaveName} hits ${his2} already-sore buttocks yet again. ${He2}'s broken enough to understand that ${he2} needs to relax and let ${himself2} be abused, but ${his2} body's reflexive responses deny ${him2} the relief that might be given. The sadistic stewardess <span class="devotion inc">comes twice</span> before you do, a deliciously aggressive expression on ${his} face. Poor ${subSlave.slaveName} staggers off coughing, promising to <span class="trust dec">never offend</span> again.`);
			S.Stewardess.devotion += 4;
			subSlave.trust -= 5;
			seX(subSlave, "oral", V.PC, "penetrative");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function remembers() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`In a conversational tone of voice, you tell ${S.Stewardess.slaveName} to continue the spanking. You watch the milieu impassively, your presence slightly cramping ${his} style. The poor beaten servant staggers out of the room when fully punished; ${S.Stewardess.slaveName} didn't bring ${himself} to climax, obviously over concern about why you're taking such an interest. When you tell ${him} that ${he} needs to remember that ${he} is a slave, too, and only superior to ${his} charges by degree, ${his} face falls. ${He} has a few seconds to wonder what ${his} punishment will be before ${he} finds ${himself} shoved roughly up against the wall. When ${he} feels`);
			if (V.PC.dick === 0) {
				r.push(`a strap-on`);
			} else {
				r.push(`your cockhead`);
			}
			r.push(`pressing against ${his}`);
			if (S.Stewardess.anus > 2) {
				r.push(`massive`);
			} else if (S.Stewardess.anus > 1) {
				r.push(`loose`);
			} else {
				r.push(`tight`);
			}
			r.push(`anus, ${he} tries to hike a leg up to save ${himself} a bit of anal pain, but to little avail.`);
			if (S.Stewardess.anus > 2) {
				r.push(`Since ${his} ass is so loose, you push two fingers in alongside`);
				if (V.PC.dick === 0) {
					r.push(`the phallus,`);
				} else {
					r.push(`your dick,`);
				}
				r.push(`eliciting a shocked whine.`);
			} else if (S.Stewardess.anus > 1) {
				r.push(`${His} butt may be well-used, but you pound ${him} hard enough to let ${him} know ${he}'s still your butthole bitch.`);
			} else {
				r.push(`${His} ass is so tight that fucking it standing is punishment enough.`);
			}
			r.push(`${He} submissively takes ${his} buttfuck, and <span class="devotion inc">begs your forgiveness</span> when ${he} feels you`);
			if (V.PC.dick === 0) {
				r.push(`shoot your load up ${his} ass.`);
			} else {
				r.push(`shudder with orgasm.`);
			}
			r.push(VCheck.Anal(S.Stewardess, 1));
			S.Stewardess.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
