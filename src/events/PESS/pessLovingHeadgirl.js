App.Events.pessLovingHeadgirl = class pessLovingHeadgirl extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.HeadGirl,
			() => S.HeadGirl.devotion > 95,
			() => V.slaves.length > 4
		];
	}

	execute(node) {
		const {
			He, His,
			he, his, him, himself, wife
		} = getPronouns(S.HeadGirl);
		const {title: Master} = getEnunciation(S.HeadGirl);
		const art = App.UI.DOM.appendNewElement("span", node);
		App.Events.drawEventArt(art, S.HeadGirl);
		const subSlave = V.slaves.find((s) => s.ID !== V.HeadGirlID && s.devotion <= 20);

		App.Events.addParagraph(node, [
			`You and`,
			App.UI.DOM.slaveDescriptionDialog(S.HeadGirl),
			`see one another less than one might expect, for a slaveowner and their Head Girl. You both lead very busy lives, for one. Furthermore, ${S.HeadGirl.slaveName} often functions as a second set of eyes, ears, and castigating hands for you, so it would be a waste for the two of you to be in the same place at the same time. Today, the two of you saw almost nothing of one another, so ${he} comes to your office for a quick review of the day before ${he} turns in for the night.`
		]);
		const r = [];
		r.push(`The business is brief and inconsequential, but it's good to speak with ${him}. When you're done, ${he} gets halfway to the door before coming quickly back to give you a light kiss on the cheek.`);
		if (S.HeadGirl.lips > 70) {
			r.push(`"Ah love you, ${Master}," ${he} lisps, huge lips grazing your ear,`);
		} else if (S.HeadGirl.piercing.lips.weight + S.HeadGirl.piercing.tongue.weight > 2) {
			r.push(`"Ah love you, ${Master}," ${he} lisps, oral piercings grazing your ear,`);
		} else {
			r.push(`"I love you, ${Master}," ${he} whispers into your ear,`);
		}
		r.push(`${his} breasts brushing against your shoulder as ${he} does.`);
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Spend a night as equals`, equals));
		choices.push(new App.Events.Result(`Pull ${him} in to keep you company as you work`, company, (S.HeadGirl.anus === 0) ? `This will take anal virginity` : null));
		if (subSlave && canDoAnal(subSlave)) {
			choices.push(new App.Events.Result(`Victimize something together`, victimize, subSlave.anus === 0 ? "This will take anal virginity" : null));
		}

		App.Events.addResponses(node, choices);

		function equals() {
			if (V.seeImages) {
				$(art).empty();
				App.Events.drawEventArt(art, S.HeadGirl, "no clothing");
			}

			S.HeadGirl.devotion += 4;
			seX(S.HeadGirl, "oral", V.PC, "penetrative");
			seX(S.HeadGirl, "anal", V.PC, "penetrative");
			if (V.policies.mixedMarriage === 1 && S.HeadGirl.relationship === -3 && V.arcologies[0].FSPaternalist >= 60) {
				repX(500, "event", S.HeadGirl);
				return `You instruct your slave-${wife} ${S.HeadGirl.slaveName} to put on ${his} best dress and meet you at the door. You spend a nice night out with ${him}, taking in the sights before heading to a nice restaurant, where you receive the occasional <span class="reputation inc">admiring glance</span> from your paternalistic citizens. Afterwards, you attend a show at a venue known for its respectful plays acted out by talented slaves, and you conclude the evening by returning to your penthouse to have loving sex in your master bed. When you wake the next morning, you're greeted with a long kiss and <span class="devotion inc">an adoring look,</span> before ${S.HeadGirl.slaveName} slides out of bed to begin ${his} morning duties.`;
			} else {
				repX(-100, "event", S.HeadGirl);
				return `You instruct ${S.HeadGirl.slaveName} to put on ${his} best dress and meet you at the door. You spend a nice night out with ${him}, walking along the club to a nice restaurant and then seeing a show before returning home for loving sex in your master bed. ${He} nestles under your arm, falling to sleep well before you, a <span class="devotion inc">contented</span> smile on ${his} face. There's a reason ${he} gets to sleep much quicker than you do. You lie awake for some time, remembering the <span class="reputation dec">doubting and disapproving</span> faces of other prosperous citizens whenever they realized that you were treating a slave as an equal this evening.`;
			}
		}

		function company() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`${He} giggles happily as you seize ${his} ${S.HeadGirl.skin} wrist and pull ${him} down to the floor. ${He} nestles under your desk, between your legs to serve you with ${his} mouth for a while, gently playing with ${his}`);
			if (canDoVaginal(S.HeadGirl) && canPenetrate(S.HeadGirl)) {
				r.push(`wonderfully strange bits`);
			} else if (canDoAnal(S.HeadGirl)) {
				r.push(`anus`);
			} else if ((S.HeadGirl.dick > 0) && !canAchieveErection(S.HeadGirl)) {
				r.push(`limp cock`);
			} else if (S.HeadGirl.dick > 0) {
				r.push(`hard cock`);
			} else if (S.HeadGirl.clit > 0) {
				r.push(`huge, hard clit`);
			} else if (S.HeadGirl.vagina > -1) {
				r.push(`soaking-wet cunt`);
			} else {
				r.push(`nipples`);
			}
			r.push(`and moaning into you. ${He}'s down there for a long time, so long that you climax twice. The third time ${he} softly sucks you`);
			if (V.PC.dick === 0) {
				r.push(`to full arousal,`);
			} else {
				r.push(`hard,`);
			}
			r.push(`it naturally takes a bit longer. When done, ${he} slithers up into your lap without obscuring your work, stroking you lightly with a hand the whole time — a miracle of dexterity. ${He} gently runs ${his} hips over your crotch a few times, giving`);
			if (V.PC.dick === 0) {
				r.push(`you`);
			} else {
				r.push(`your dickhead`);
			}
			r.push(`a nice tactile tour of everything ${he} has to offer,`);
			if (V.PC.dick === 0) {
				r.push(`before gently turning around to wrap ${his} legs around you and rub ${himself} against you until you climax a third time.`);
			} else {
				r.push(`before gently lowering ${his} butt onto your cock with a sigh. ${His} devoted ass brings you to orgasm a third time, and instead of getting up and off your softening dick, ${he} just relaxes into you and bends ${himself} backward so ${he} can nibble your neck and whisper ${his} adoration into your ear.`);
			}
			r.push(`It would be hard for ${him} to get much more trusting of you, <span class="trust inc">but ${he} does.</span>`);
			S.HeadGirl.trust += 4;
			seX(S.HeadGirl, "oral", V.PC, "penetrative");
			r.push(VCheck.Anal(S.HeadGirl, 1));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function victimize() {
			const frag = new DocumentFragment();
			let r = [];
			const {
				His2,
				his2, him2,
			} = getPronouns(subSlave).appendSuffix("2");

			// art
			if (V.seeImages) {
				$(art).empty();
				App.Events.drawEventArt(art, [S.HeadGirl, subSlave], [null, "no clothing"]);
			}

			r.push(`${He} giggles happily as you seize ${his} ${S.HeadGirl.skin} wrist and pull ${him} towards where your other slaves are mostly already asleep. ${He} jokingly points out`);
			r.push(App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(subSlave, subSlave.slaveName), `, fast asleep. You nod, and ${S.HeadGirl.slaveName} pounces. ${subSlave.slaveName} wakes in terror and confusion to find ${his2} head and neck pinned in a leg-lock that holds ${his2} mouth hard against ${S.HeadGirl.slaveName}'s`));
			if (canDoAnal(S.HeadGirl)) {
				r.push(`anus.`);
			} else if (canDoVaginal(S.HeadGirl) && canPenetrate(S.HeadGirl)) {
				r.push(`cock and cunt.`);
			} else if (S.HeadGirl.dick > 0 && !canAchieveErection(S.HeadGirl)) {
				r.push(`limp cock.`);
			} else if (S.HeadGirl.dick > 0 && S.HeadGirl.balls > 0 && S.HeadGirl.scrotum > 0) {
				r.push(`cock and balls.`);
			} else if (S.HeadGirl.clit > 0) {
				r.push(`huge, hard clit.`);
			} else if (!canDoVaginal(S.HeadGirl)) {
				r.push(`soft perineum.`);
			} else {
				r.push(`soaking-wet cunt.`);
			}
			r.push(`${subSlave.slaveName} only manages one kick of ${his2} legs before you pin them and ram yourself up ${his2} butt. ${His2} howl of protest, directed against ${S.HeadGirl.slaveName}'s privates, sends a shiver through your Head Girl.`);
			if (S.HeadGirl.lips > 70) {
				r.push(`"Oh pleathe make ${him2} moan, ${Master}," ${he} lisps through ${his} huge lips.`);
			} else if (S.HeadGirl.piercing.lips.weight+S.HeadGirl.piercing.tongue.weight > 2) {
				r.push(`"Oh pleathe make ${him2} moan, ${Master}," ${he} lisps through ${his} face full of piercings.`);
			} else {
				r.push(`"I love it when you make ${him2} moan, ${Master}," ${he} groans.`);
			}
			r.push(`Poor ${subSlave.slaveName}'s asshole takes quite a beating before ${S.HeadGirl.slaveName} finally convulses with <span class="hotpink">naughty pleasure.</span> Meanwhile, all around the nighttime rape, slaves have been woken by ${subSlave.slaveName}'s struggles. They realize how completely your Head Girl has <span class="devotion inc">involved ${himself} in your sexual pursuits</span> and <span class="trust dec">lie as still as they can.</span>`);
			App.Events.addParagraph(frag, r);

			seX(subSlave, "oral", S.HeadGirl, "penetrative");
			seX(subSlave, "anal", V.PC, "penetrative");
			if (subSlave.anus === 0) {
				subSlave.anus = 1;
			}
			for (const slave of V.slaves) {
				slave.devotion += 4;
				slave.trust -= 4;
			}
			return frag;
		}
	}
};
