App.Events.pessTiredMilkmaid = class pessTiredMilkmaid extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Milkmaid,
			() => App.Entity.facilities.dairy.employeesIDs().size >= 5,
			() => S.Milkmaid.health.condition >= 70,
			() => S.Milkmaid.muscles > 5,
		];
	}

	execute(node) {
		const {
			He,
			he, his, him
		} = getPronouns(S.Milkmaid);
		App.Events.drawEventArt(node, S.Milkmaid, "no clothing");

		App.Events.addParagraph(node, [
			`Your milkmaid`,
			App.UI.DOM.slaveDescriptionDialog(S.Milkmaid),
			`worked hard today. The cows have it much easier than ${he} does, in many ways: all they have to do is give milk, while ${his} life is one of hard labor. Long after they're asleep, ${he}'s cleaning the dairy and getting ready for the next day. At long last ${he}'s done, and even though ${he}'s exhausted, ${he} takes a few minutes to thoroughly stretch ${his} aching body. ${He}'s a big girl, and the play of ${his} muscles across ${his} back as ${he} works out the kinks is quite eye-catching.`
		]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} a businesslike massage`, massage),
			new App.Events.Result(`Share a milk bath with ${him}`, bath)
		]);

		function massage() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`When ${he}`);
			if (canHear(S.Milkmaid)) {
				r.push(`hears you enter ${V.dairyName},`);
			} else {
				r.push(`realizes you've entered ${V.dairyName},`);
			}
			r.push(`${he} turns to you for instructions, but you wordlessly dismiss ${him} back to ${his} stretching. ${He} gets back to it, but is surprised to find ${his} shoulders seized by your powerful hands. ${He} shivers helplessly as you knead ${his} knotted muscles, whimpering with near-orgasmic delight as ${he} feels the day's aches ground away under your grip. When you're done with ${him}, ${he} touches ${his} toes and then smoothly rises to stretch with ${his} hands over ${his} head, groaning with sheer pleasure at the feeling.`);
			if (canTalk(S.Milkmaid)) {
				const {title: Master} =getEnunciation(S.Milkmaid);
				r.push(
					Spoken(S.Milkmaid, `"Thank you ${Master},"`),
					`${he} murmurs.`,
					Spoken(S.Milkmaid, `"Would — would you like to use my body, now?"`)
				);
			} else {
				r.push(`${He} thanks you profusely with gestures, and then hesitantly asks if you'd like to use ${his} body.`);
			}
			r.push(`You shake your head kindly and place a kiss on ${his} forehead before continuing with your evening. As ${he} watches you go, ${he} suppresses <span class="devotion inc">another shiver.</span>`);
			S.Milkmaid.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
		function bath() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`When ${he}`);
			if (canHear(S.Milkmaid)) {
				r.push(`hears you enter ${V.dairyName},`);
			} else {
				r.push(`realizes you've entered ${V.dairyName},`);
			}
			r.push(`${he} turns to you for instructions, but you wordlessly dismiss ${him} back to ${his} stretching. ${He} gets back to it, but is mystified as ${he} watches you out of the corner of ${his} eye. The milk is held in a large tank before being filtered, pasteurized, and sold. You remove the lid from the tank and climb in. ${He} watches with incomprehension, but understanding dawns when you splash a little, demonstratively, and crook a finger at ${him}. ${He} gives you a deliciously naughty look and hurries to join you in the warm milk, giggling when you pull ${him} in with a slosh of creamy whiteness. ${He} doesn't break the surface after climbing in, kneeling under the milk to suck you off. ${He} has to surface periodically for breath, but the grin ${he} gives you each time makes up for it. ${He} manages to drag ${his} breasts`);
			if (V.PC.boobs >= 300) {
				r.push(`against yours`);
			} else {
				r.push(`up your front`);
			}
			r.push(`each time ${he} rises for air. When you climax, ${he} carefully swallows every drop to keep the filters from getting clogged. When ${he} surfaces for good, ${he} looks you in the eyes briefly before blushing and <span class="mediumaquamarine">giving you a muscular hug.</span>`);
			S.Milkmaid.trust += 4;
			seX(S.Milkmaid, "oral", V.PC, "penetrative");
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
