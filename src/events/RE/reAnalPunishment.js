// cSpell:ignore NOOO, OUUUT, AAIIEEHH

App.Events.REAnalPunishment = class REAnalPunishment extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.HeadGirlID !== 0,
			() => V.HGSeverity >= 0
		];
	}

	actorPrerequisites() {
		return [[
			(s) => s.devotion <= 50,
			(s) => s.anus !== 0,
			(s) => s.fetish !== Fetish.MINDBROKEN,
			canDoAnal,
			canMove,
			hasAnyArms,
			canTalk,
			canHear,
			canSee
		]];
	}

	execute(node) {
		let r = [];
		const slave = getSlave(this.actors[0]);

		const {
			He, His,
			he, his, him, himself, girl, woman
		} = getPronouns(slave);
		const belly = bellyAdjective(slave);

		const {title: Master} = getEnunciation(slave);

		const {
			He2,
			he2, his2, him2, himself2
		} = getPronouns(S.HeadGirl).appendSuffix("2");

		App.Events.drawEventArt(node, [slave, S.HeadGirl], "no clothing");

		r.push(
			`As you're making the rounds through your penthouse, you hear ${S.HeadGirl.slaveName} speaking in the tones ${he2} uses to castigate misbehaving slaves in the next room. When you appear in the doorway, you have little chance to survey the situation before`,
			App.UI.DOM.combineNodes(
				contextualIntro(S.HeadGirl, slave, true),
				`, apparently the miscreant, flings ${himself} at your feet. ${He} clings to one of your legs convulsively, choking on tears as ${he} stares up at you and tries to muster an explanation. After two false starts, ${he} manages to start begging.`
			),
			Spoken(slave, `"Please, ${Master},"`),
			`${he} wails miserably.`,
			Spoken(slave, `"Please don't let ${him2} rape my butt."`)
		);

		App.Events.addParagraph(node, r);
		r = [];
		r.push(`You shoot an amused glance at ${S.HeadGirl.slaveName}, who smiles back as ${he2} explains the slave's minor sin and ${his2} intention to sodomize the malefactor. ${He2} does not bother to keep an edge of anticipation out of ${his2} voice, and ${slave.slaveName} cries harder and clings to you with renewed force as your Head Girl pronounces ${his2} intention with cruel clarity.`);
		if (slave.boobs > 4000) {
			r.push(`The supplicant's breasts are so huge that ${his} embrace of your leg has completely surrounded it in deliciously heaving breastflesh.`);
		} else if (slave.boobs > 1000) {
			r.push(`The weight of the supplicant's breasts is quite noticeable as ${his} embrace of your leg presses them against it.`);
		}
		r.push(`You look down at ${slave.slaveName}. ${He} stares back with huge wet ${App.Desc.eyesColor(slave)}, doing ${his} best to implore you with ${his} gaze, and`);
		if (slave.belly < 10000) {
			r.push(`scooting ${his} rear in towards your foot`);
		} else {
			r.push(`struggling to hide ${his} rear`);
		}
		r.push(`in an unconscious effort to protect it from the promised assrape. ${He}'s quite authentically terrified; ${his} whole body is shaking.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${S.HeadGirl.slaveName} is very much acting within ${his2} duties, and ${slave.slaveName} has now misbehaved twice by trying to go over your Head Girl's head by appealing to you. ${S.HeadGirl.slaveName} is ready to carry out the sentence:`);
		if (canPenetrate(S.HeadGirl) && (S.HeadGirl.dick > 2)) {
			r.push(`${his2} cock is fully erect, and ${he2}'s keeping it hard with one hand. ${He2} slaps its head against ${his2} other palm,`);
		} else if (S.HeadGirl.dick > 0) {
			r.push(`since ${his2} dick isn't an appropriate instrument for inflicting anal pain, ${he2}'s got an elephantine dildo ready. ${He2} slaps it against ${his2} palm,`);
		} else {
			r.push(`${He2}'s got an elephantine dildo ready, and ${he2} slaps it against ${his2} palm,`);
		}
		r.push(`forcing a frightened moan from ${slave.slaveName}.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Carry on`, carryOn));
		choices.push(new App.Events.Result(`Take part`, takePart));
		choices.push(new App.Events.Result(`Take pity`, takePity));
		App.Events.addResponses(node, choices);

		function carryOn() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You ignore ${slave.slaveName} — no small feat, since the poor`);
			if (slave.physicalAge > 30) {
				r.push(`${woman}`);
			} else {
				r.push(`${girl}`);
			}
			r.push(`is clinging to your leg — and tell ${S.HeadGirl.slaveName} to carry on. Your Head Girl <span class="trust inc">puffs up a bit with pride,</span> and orders the weeping slave to present ${his} anus. The ${(slave.physicalAge > 30) ? woman : girl} does not resist, but nor does ${he} comply. ${S.HeadGirl.slaveName} jabs a thumb into ${slave.slaveName}'s side, right above ${his} kidney, driving the wind out of the slave with a pained grunt. ${He} arches ${his} back involuntarily and ${his} grip on you loosens, and ${S.HeadGirl.slaveName} drags ${him} off you. ${He2} jabs ${him} again, depriving ${his2} victim of breath completely, and then takes ${him2} by the ankle, dragging the slave across the floor with comic effect. The slave leaves a trail of tears across the flooring as ${he} vanishes into the room. As you continue making your rounds, you hear a drawn-out howl followed by rhythmic screaming.`);
			seX(slave, "anal", S.HeadGirl, "penetrative", 1);
			S.HeadGirl.trust += 4;

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function takePart() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You explain ${slave.slaveName}'s double crime to ${him}, and tell ${S.HeadGirl.slaveName} to get started. Your Head Girl orders the weeping slave to present ${his} anus. The ${(slave.physicalAge > 30) ? woman : girl} does not resist, but nor does ${he} comply. ${S.HeadGirl.slaveName} jabs a thumb into ${slave.slaveName}'s side, right above ${his} kidney, driving the wind out of the slave with a pained grunt. ${He} arches ${his} back involuntarily and ${his} grip on you loosens, so ${S.HeadGirl.slaveName} drags ${him} off you, telling ${slave.slaveName} that it'll hurt less if ${he} cooperates and assumes the proper position. ${He} doesn't, so ${S.HeadGirl.slaveName}`);
			if (slave.belly < 1500) {
				r.push(`assfucks ${him} lying flat on the floor,`);
			} else {
				r.push(`painfully assfucks ${him} against ${his} ${belly} middle.`);
			}
			r.push(`with the poor ${girl} sobbing loudly as ${S.HeadGirl.slaveName}`);
			if (canPenetrate(S.HeadGirl) && (S.HeadGirl.dick > 2)) {
				r.push(`pistons ${his2} cock in and out of ${his} rectum.`);
			} else {
				r.push(`rams the massive dildo up ${his} butt.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`After enjoying the spectacle for a while, you judge that the slave's sphincter is loose enough and tell ${S.HeadGirl.slaveName} to flip the bitch over. <span class="devotion inc">${He2} obeys, chuckling,</span> sitting ${himself2} down and hauling the reluctant slave onto ${his2} lap by seizing a nipple and pulling it into position so the agonized slave is forced to follow.`);
			if (canPenetrate(S.HeadGirl) && (S.HeadGirl.dick > 2)) {
				r.push(`${S.HeadGirl.slaveName} reinserts ${his2} dick,`);
			} else {
				r.push(`${S.HeadGirl.slaveName} maneuvers the dildo down over ${his2} own crotch, approximating the position of a natural cock and using its base to stimulate ${himself2}. ${He2} reinserts it,`);
			}
			r.push(`intentionally missing twice to keep the experience unpleasant despite ${his2} victim's well-fucked backdoor.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${slave.slaveName}, now facing upward rather than having ${his} face ground into the floor, notices for the first time that`);
			if (V.PC.dick !== 0) {
				r.push(`you've got your dick out and hard.`);
			} else {
				r.push(`you've donned one of your punishment-sized strap-ons.`);
			}
			r.push(`${His} ${App.Desc.eyesColor(slave)} <span class="trust dec">fly open with horror</span> as you kneel down and smack its head against ${his}`);
			if (slave.vagina > -1) {
				r.push(`poor pussy,`);
			} else {
				r.push(`stretched taint,`);
			}
			r.push(
				`but ${he} doesn't realize how comprehensively fucked ${he} is until you press it against the top of ${his} already-stretched anal sphincter.`,
				Spoken(slave, `"Please no, ${Master}! It won't fit! Please ${(slave.vagina > 0) ? "put it in my pussy" : "let me suck it"} instead,"`),
				`${he} begs desperately.`,
				Spoken(slave, `"I p-promise I'll be a g-good`),
			);
			if (girl === "girl") {
				r.push(Spoken(slave, `giiAAIIEEHH,"`));
			} else if (girl === "boy") {
				r.push(Spoken(slave, `boAAIIEEHH,"`));
			} else if (girl === "toy") {
				r.push(Spoken(slave, `toAAIIEEHH,"`));
			} else {
				r.push(Spoken(slave, `slaAAIIEEHH,"`));
			}
			r.push(
				`${he} howls. ${He} gasps for air, tears streaming down ${his} ${slave.skin} cheeks, and then continues:`,
				Spoken(slave, `"AAAH! FUCK! TAKE IT OUUUT! N-NOOO, PLEASE DON'T THRUST — AAAH! AAAH! AAAH!"`)
			);

			seX(slave, "anal", S.HeadGirl, "penetrative");
			seX(slave, "anal", V.PC, "penetrative");
			S.HeadGirl.devotion += 4;
			slave.trust -= 5;

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function takePity() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You tell ${S.HeadGirl.slaveName} you've decided to be merciful, just this once. ${slave.slaveName} holds your leg even harder, <span class="trust inc">sobbing ${his} thanks</span> over and over until you reach down, pat ${his} head, and tell ${him} it will be all right, calming the hysterical`);
			if (slave.physicalAge > 30) {
				r.push(`${woman}.`);
			} else {
				r.push(`${girl}.`);
			}
			r.push(`${S.HeadGirl.slaveName}, meanwhile, stammers an apology. ${He2} hurries about ${his2} business, <span class="trust dec">badly puzzled</span> and more than a little shaken. ${He2} thought ${he2} had the authority to anally rape misbehaving slaves, but ${he2}'s no longer so sure of ${his2} rights and responsibilities.`);
			slave.trust += 4;
			S.HeadGirl.trust -= 15;

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
