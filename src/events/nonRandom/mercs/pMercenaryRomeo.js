App.Events.PMercenaryRomeo = class PMercenaryRomeo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() >= 44,
			() => V.mercenaries > 0,
			() => V.mercRomeo !== 1,
		];
	}

	// custom casting, in two stages
	castActors() {
		this.actors = [];
		const juliet =
			// first try - find an available sex worker
			V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.fuckdoll === 0 && ["serve in the club", "serve the public", "whore", "work in the brothel"].includes(s.assignment)).random() ||
			// second try - find a slave who had public exposure and is hopefully not important to the PC personally
			V.slaves.filter(s => (s.counter.publicUse > 0) && (s.newGamePlus === 0) && (s.relationship > -3) && !["be your Concubine", "serve in the master suite"].includes(s.assignment)).random();
		if (juliet) {
			this.actors.push(juliet.ID);
			return true;
		}
		return false;
	}

	execute(node) {
		V.mercRomeo = 1;
		let r = [];
		V.nextButton = "Continue";
		const juliet = getSlave(this.actors[0]);

		let cost = slaveCost(juliet);
		cost = (random(60, 70) * Math.trunc(cost / 100));
		cost = 100 * Math.trunc(cost / 100);

		const {
			He, His,
			he, his, him, girl
		} = getPronouns(juliet ? juliet : {pronoun: App.Data.Pronouns.Kind.neutral});
		const {girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

		r.push(`One of your mercenaries requests an interview. He's a worn, grey-haired tank of a man, made bulkier still by heavy ceramic plate armor and lots of ammunition and gear. The murderous submachine gun favored for city fighting looks like a toy in his hands. But as he sits at your invitation and accepts a ${generalRefreshment()} proffered by an attentive slave ${girlU}, he seems almost bashful.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`"${properTitle()}, I'll say this straight. I'd like to buy one of your slaves.`);

		if (["serve in the club", "serve the public", "whore", "work in the brothel"].includes(juliet.assignment)) {
			r.push(
				`I've been seeing`,
				App.UI.DOM.slaveDescriptionDialog(juliet),
				`a lot, and ${he} makes the years sit a little lighter on me.`
			);
		} else {
			r.push(
				`I've seen`,
				App.UI.DOM.slaveDescriptionDialog(juliet),
				`here and there and I can't stop thinking about ${him}. I feel ${he}'d make the years sit a little lighter on me.`
			);
		}
		r.push(`I've scraped together what I can, and I can pay ${cashFormat(cost)}." It's a decent price, probably a little less than you could get at auction. It's a huge sum for a mercenary; it's probably his entire savings. You ask what he would do with ${him}. "Well," he says, actually blushing, "I'd free ${him}. And marry ${him}, if ${he}'d have me."`);

		App.Events.addParagraph(node, r);
		const choices = [];
		choices.push(new App.Events.Result(`Decline, and tell ${him} not to see him`, declineAndForbid));
		choices.push(new App.Events.Result(`Politely decline`, declinePolitely));
		choices.push(new App.Events.Result(`Accept`, accept));
		choices.push(new App.Events.Result(`Give ${him} to him as a gift`, gift));

		App.Events.addResponses(node, choices);

		App.UI.DOM.appendNewElement("h3", node, `${His} records...`);
		App.UI.DOM.appendNewElement("div", node, `${His} current task is to ${juliet.assignment}${(V.assignmentRecords[juliet.ID]) ? `, and before that to ${V.assignmentRecords[juliet.ID]}` : ""}.`, "indent");
		node.append(slaveImpactLongTerm(juliet));

		function declineAndForbid() {
			repX(-1000, "event");
			return `${juliet.slaveName} obeys your orders not to see the old mercenary. Though neither he or ${juliet.slaveName} says a word about it, his squadmates are not so closemouthed. Soon the tragic story of The Mercenary and the slave${girl} is being told in bars and brothels across the Free City, with you naturally playing <span class="reputation dec">the role of the villain.</span>`;
		}

		function declinePolitely() {
			let r = [];
			r.push(`"Ah well," he says, "didn't think you would, but I had to ask. If you'd be so kind as to keep ${him} assigned so's I can see ${him}, I would be grateful. That was a fine victory, ${properTitle()}; come down to the bar and join the boys and I. We'll buy you a drink. Devil knows, thanks to you we can afford to."`);
			if (juliet.relationship === -3 && juliet.fetish !== Fetish.MINDBROKEN && juliet.devotion + juliet.trust > 190) {
				r.push(`${juliet.slaveName} politely thanks you for not letting him take ${him} away.`);
			}
			return r;
		}

		function accept() {
			let r = [];
			r.push(`The mercenary leaves to collect his purchase. On the video feeds, you see that ${juliet.slaveName} can hardly believe what's`);
			if (juliet.relationship === -3 && juliet.fetish !== Fetish.MINDBROKEN && juliet.devotion + juliet.trust > 190) {
				r.push(`happening. You can't hear what he says as he takes out a ring, but ${his} reaction speaks clearly. ${He} says "No."`);
				if (canWalk(juliet) && hasAnyArms(juliet)) {
					r.push(`${He} points back into your penthouse and returns to ${his} home.`);
				} else {
					r.push(`${He} gestures towards the nearest camera and he helps ${him} back into your penthouse.`);
				}
				r.push(`The only thing ${he} wants after being freed is to return to your side. "I thought I was giving ${him} a better life... But ${he} already had everything ${he} wanted. I'm sorry for putting you in such a position." You can hear the sadness in his voice. "Thank you for your time. I'm sorry to have bothered you." Since ${he} returned to slavery, it's only fair to return the credits he paid for ${him}. He thanks you hollowly before heading on his way.`);
			} else {
				r.push(`happened.`);
				if (hasAnyArms(juliet) && hasBothLegs(juliet)) {
					r.push(`${He} hugs him, sobbing into his shoulder. As they walk hand in hand down towards his quarters,`);
				} else {
					r.push(`As he`);
					if (!isAmputee(juliet)) {
						r.push(`gives`);
					} else {
						r.push(`picks up ${his} limbless form to give`);
					}
					r.push(`${him} a hug,`);
				}
				r.push(`${he} gives the nearest camera a little nod and silently mouths the words "Thank you, ${getWrittenTitle(juliet)}." Soon the romantic story of The Mercenary and the slave${girl} is being told in bars and brothels across the Free City, with you naturally playing <span class="reputation inc">a supporting role.</span>`);
				repX(1000, "slaveTransfer");
				cashX(cost, "slaveTransfer");
				removeSlave(juliet);
			}
			return r;
		}

		function gift() {
			let r = [];
			r.push(`The mercenary cannot believe his ears. After you repeat yourself twice, he leaves to collect your gift, thanking you clumsily. On the video feeds, you see that ${juliet.slaveName} can hardly believe what's`);
			if (juliet.relationship === -3 && juliet.fetish !== Fetish.MINDBROKEN && juliet.devotion + juliet.trust > 190) {
				r.push(`happening. You can't hear what he says as he takes out a ring, but ${his} reaction speaks clearly. ${He} says "No."`);
				if (canWalk(juliet) && hasAnyArms(juliet)) {
					r.push(`${He} points back into your penthouse and returns to ${his} home.`);
				} else {
					r.push(`${He} gestures towards the nearest camera and he helps ${him} back into your penthouse.`);
				}
				r.push(`The only thing ${he} wants after being freed is to return to your side. "I thought I was giving ${him} a better life... But ${he} already had everything ${he} wanted. I'm sorry for putting you in such a position." You can hear the sadness in his voice. "Thank you for your time. I'm sorry to have bothered you."`);
			} else {
				r.push(`happened.`);
				if (hasAnyArms(juliet) && hasAnyLegs(juliet)) {
					r.push(`${He} hugs him, sobbing into his shoulder. As they walk hand in hand down towards his quarters,`);
				} else {
					r.push(`As he`);
					if (!isAmputee(juliet)) {
						r.push(`gives`);
					} else {
						r.push(`picks up ${his} limbless form to give`);
					}
					r.push(`${him} a hug,`);
				}
				r.push(`${he} gives the nearest camera a little nod and silently mouths the words "Thank you, ${getWrittenTitle(juliet)}." You smile to yourself; when they get there they'll find flowers and a paid reservation at the arcology's best restaurant. Soon the story is being told in bars and brothels across the Free City, with you naturally playing <span class="reputation inc">a starring role.</span> Some days later, you hear a dramatization is being filmed, with an aging action star playing the mercenary, a rising starlet playing ${juliet.slaveName}, and a noted character actor playing you.`);
				if (isShelterSlave(juliet)) {
					r.push(`${juliet.slaveName}'s rescue by the Slave Shelter is positively portrayed in the movie, and you're greeted with smiles next time you stop in.`);
					V.shelterAbuse -= 1;
				}
				repX(15000, "event");
				addTrinket(`a poster for the movie that was made about the love between one of your mercenaries and`, {
					name: juliet.slaveName,
					id: juliet.ID
				});
				removeSlave(juliet);
			}
			return r;
		}
	}
};
