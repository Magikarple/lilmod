App.Events.pessHeadgirlDickgirl = class pessHeadgirlDickgirl extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.HeadGirl,
			() => canPenetrate(S.HeadGirl),
			() => S.HeadGirl.balls > 0
		];
	}

	actorPrerequisites() {
		return [[
			s => s.ID !== V.HeadGirlID,
			s => s.devotion <= 20
		]];
	}

	execute(node) {
		const {
			He,
			he, his, him, himself, girl
		} = getPronouns(S.HeadGirl);
		const subSlave = getSlave(this.actors[0]);
		const {
			he2, his2, him2, himself2,
		} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [S.HeadGirl, subSlave], "no clothing");

		App.Events.addParagraph(node, [
			App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(S.HeadGirl), ","),
			`despite being a loyal and sexually receptive slave ${girl}, still has a virile cock. ${He} certainly isn't shy about using it in pursuit of ${his} Head Girl duties. ${subSlave.slaveName} has apparently committed some minor sin, and is now being made to pay. ${S.HeadGirl.slaveName} has ${him2} lying on ${his2} back on a table with ${his2} helpless`
		]);
		const r = [];
		if (V.seeRace === 1) {
			r.push(`${subSlave.race}`);
		}
		r.push(`throat serving as a hole for ${S.HeadGirl.slaveName} to fuck`);
		if (V.seeRace === 1) {
			r.push(`with ${his2} ${S.HeadGirl.race} cock`);
		}
		r.push(`while ${S.HeadGirl.slaveName} rains light slaps on poor ${subSlave.slaveName}'s nipples, breasts, and`);
		if (subSlave.dick > 0 && !canAchieveErection(subSlave)) {
			r.push(`limp dick.`);
		} else if (subSlave.dick > 0) {
			r.push(`defenseless dick.`);
		} else if (subSlave.clit > 0) {
			r.push(`big clit.`);
		} else {
			r.push(`mons.`);
		}
		r.push(`All the while, your Head Girl expounds on ${subSlave.slaveName}'s shortcomings and the ways in which ${he2} must apply ${himself2} to better serve you.`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Compliment your Head Girl's efforts, and encourage ${him}`, encourage),
			new App.Events.Result(`Instruct your Head Girl to give that slave special attention`, special)
		]);

		function encourage() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`As you walk into the room to offer ${S.HeadGirl.slaveName} some positive reinforcement, ${he} groans, arches ${his} back, and shoots ${his} load down ${subSlave.slaveName}'s retching`);
			if (V.seeRace === 1) {
				r.push(`${subSlave.race}`);
			}
			r.push(`throat. ${S.HeadGirl.slaveName} immediately greets you with perfect decorum, despite ${his} recent orgasm, and delivers ${subSlave.slaveName}`);
			if (subSlave.earShape === "none") {
				r.push(`a quick slap to the back of the head`);
			} else {
				r.push(`an agonizing flick to the ear`);
			}
			r.push(`when ${he2} does not, in ${S.HeadGirl.slaveName}'s opinion, follow suit with sufficient speed. You inform ${S.HeadGirl.slaveName} that ${he} is a fine Head Girl, and that if ${he} continues to apply ${himself} ${he} will bring credit to you as a slaveowner. ${He} looks a little surprised, but thanks you correctly. It is only due to the arcology's monitoring system that you know that, as you turn your back and go, a single tear escapes from ${his} eye and rolls down ${his} pretty`);
			if (V.seeRace === 1) {
				r.push(`${S.HeadGirl.race}`);
			}
			r.push(`cheek. In the coming week, no shirker is safe from ${his} wrath. <span class="devotion inc">Every single slave in your penthouse has become better broken to your will.</span>`);
			seX(S.HeadGirl, "oral", V.PC, "penetrative");
			for (const slave of V.slaves) {
				if (assignmentVisible(slave)) {
					slave.devotion += 2;
				}
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function special() {
			subSlave.devotion += 15;
			seX(S.HeadGirl, "oral", subSlave, "penetrative", 5);
			return `The next time you see ${S.HeadGirl.slaveName}, you ask what ${subSlave.slaveName} did. It seems ${he2} did not complete ${his2} assigned duty with sufficient speed, and compounded ${his2} sin by talking back to ${S.HeadGirl.slaveName} when ${he} pointed this out. You observe that if ${he2} continues to fail to clean, ${he2} can do it with ${his2} tongue; and that if ${he2} continues to fail to be polite, ${he2} can clean ${S.HeadGirl.slaveName}'s${(V.seeRace === 1) ? ` ${S.HeadGirl.race}` : ``} body with ${his2} tongue. Your Head Girl nods ${his} understanding with a grin. This is one week <span class="hotpink">the disobedient bitch won't soon forget.</span>`;
		}
	}
};
