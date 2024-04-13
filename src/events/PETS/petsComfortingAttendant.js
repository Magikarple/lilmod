App.Events.petsComfortingAttendant = class petsComfortingAttendant extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Attendant,
			() => canTalk(S.Attendant)
		];
	}

	actorPrerequisites() {
		return [[
			s => s.assignment === Job.SPA
		]];
	}

	execute(node) {
		const subSlave = getSlave(this.actors[0]);
		const {
			He,
			he, his, him, himself
		} = getPronouns(S.Attendant);
		const {title: Master} = getEnunciation(S.Attendant);
		const {
			He2,
			he2, his2, him2
		} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [S.Attendant, subSlave]);
		let r = [];
		r.push(`You decide to knit up care's raveled sleave with a break in the spa. You have your own bath, of course, but the`);
		if (V.seeDicks !== 100) {
			r.push(`female`);
		}
		r.push(
			`company is always nice even if you aren't actively using the spa's resting inhabitants. The steam in the warm pool room is turned up very high, and you can hardly see. As you lower yourself into the warm water, you see`,
			contextualIntro(V.PC, S.Attendant, true),
			`across from you, sitting in the water against the pool wall. ${He}'s holding`,
			contextualIntro(S.Attendant, subSlave, true),
			`in ${his} arms, rubbing a comforting hand up and down ${his2} back and murmuring into ${his2} ear. ${subSlave.slaveName} has ${his2} head`);
		if (S.Attendant.boobs > 2000) {
			r.push(`almost hidden between ${S.Attendant.slaveName}'s massive tits,`);
		} else if (S.Attendant.boobs > 1000) {
			r.push(`between ${S.Attendant.slaveName}'s huge boobs,`);
		} else if (S.Attendant.boobs > 300) {
			r.push(`between ${S.Attendant.slaveName}'s breasts,`);
		} else {
			r.push(`against ${S.Attendant.slaveName}'s flat chest,`);
		}
		r.push(`but it's a nonsexual embrace. You can't hear what ${S.Attendant.slaveName} is saying, but it's clearly comforting; ${subSlave.slaveName} has a happy little smile on ${his2} face and has ${his2} eyes closed in relaxation.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Meet with the Attendant later to see if the slave ${he}'s helping can be assisted further`, assist));
		choices.push(new App.Events.Result(`Leave the matter between the Attendant and the slave ${he}'s helping`, leave));

		App.Events.addResponses(node, choices);

		function assist() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You meet ${S.Attendant.slaveName} after ${subSlave.slaveName} leaves. ${He} likes to take a cool shower after spending time in the steam, so you get under the refreshing water with ${him}, encircling ${his}`);
			if (S.Attendant.weight > 10) {
				r.push(`plush`);
			} else {
				r.push(`taut`);
			}
			r.push(`midriff with your arms and giving ${him} a hug before asking ${him} about ${subSlave.slaveName}. In ${S.Attendant.slaveName}'s opinion, there's nothing really wrong with ${him2}: ${he2}'s just having a little trouble accepting different expectations about human interactions.`,
				Spoken(S.Attendant, `"${He2} just needs a little help accepting that ${he2}'s a slave and it's ${his2} place to serve you, ${Master},"`),
				`${he} says.`,
				Spoken(S.Attendant, `"Like I have!"`),
				`${He} wriggles around in your arms and plants a wet kiss on your nose. ${He}'s clean now, so you release ${him} and ${he} steps over to ${his} towel. As ${he} does, you land a wet slap on ${his}`);
			if (S.Attendant.butt > 5) {
				r.push(`massive`);
			} else if (S.Attendant.butt > 3) {
				r.push(`big`);
			} else {
				r.push(`nice`);
			}
			r.push(`butt, eliciting a <span class="devotion inc">delighted</span> squeal. You use the information to <span class="devotion inc">subtly address</span> ${subSlave.slaveName}'s unhappiness.`);
			S.Attendant.devotion += 4;
			subSlave.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function leave() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(
				`You let ${S.Attendant.slaveName} deal with ${subSlave.slaveName}'s troubles; after a short time ${he} sends ${subSlave.slaveName} off to shower, and submerges, swimming over to you under the water. ${He} pokes out of the water, comically letting a huge mouthful of the warm, healthy mineral water run out of ${his} mouth in a stream before giggling at ${himself} and smiling at you.`,
				Spoken(S.Attendant, `"${Master}, would you like me to tell you about ${subSlave.slaveName}?"`),
				`${he} asks. You shake your head, and tell ${him} no, you trust ${him} to do ${his} best to heal anything that ails ${his} charges. ${He} looks at you with huge ${App.Desc.eyesColor(S.Attendant)} for a long moment before throwing ${his}`
			);
			if (S.Attendant.weight > 10) {
				r.push(`plush`);
			} else {
				r.push(`taut`);
			}
			r.push(
				`body into your arms. ${He} looks up at you and asks incredulously,`,
				Spoken(S.Attendant, `"${Master}, you trust me?"`),
				`You nod. ${He} looks shocked but kisses you and drops back down under the water. You feel the lovely sensation of ${his}`
			);
			if (S.Attendant.lips > 70) {
				r.push(`massive`);
			} else if (S.Attendant.lips > 40) {
				r.push(`pillowlike`);
			} else {
				r.push(`nice`);
			}
			r.push(`lips`);
			if (V.PC.vagina !== -1) {
				r.push(`nibbling their way up towards your clit,`);
			} else {
				r.push(`forming a seal around your dickhead,`);
			}
			r.push(`and although ${he} has to come up periodically for air, ${he} gives you quite a <span class="devotion inc">loving</span> blowjob.`);
			S.Attendant.devotion += 10;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
