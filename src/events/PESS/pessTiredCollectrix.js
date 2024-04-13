App.Events.pessTiredCollectrix = class pessTiredCollectrix extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Milkmaid,
			() => App.Entity.facilities.dairy.employeesIDs().size >= 5,
			() => S.Milkmaid.health.condition >= 70,
			() => canAchieveErection(S.Milkmaid),
			() => cumSlaves().length >= 5,
		];
	}

	execute(node) {
		const {
			He,
			he, his, him, himself
		} = getPronouns(S.Milkmaid);
		const {
			heP
		} = getPronouns(V.PC).appendSuffix("P");
		App.Events.drawEventArt(node, S.Milkmaid, "no clothing");

		App.Events.addParagraph(node, [
			`Your milkmaid`,
			App.UI.DOM.slaveDescriptionDialog(S.Milkmaid),
			`worked hard today. ${He}'s clearly exhausted, but ${he} seems to think it below ${him} to show the fatigue. ${He} holds ${his} chin level and ${his} shoulders square as ${he} heads to the bathroom to bathe before bed. After ${his} shower, ${he} inspects ${his} crotch closely before appearing to start masturbating. On closer inspection, however, ${he}'s very gently massaging analgesic lotion into ${his} cock, wincing a little as ${he} does so. ${He} starts a little when you enter the room, but relaxes when you tell ${him} to continue ${his} ministrations and let you know how ${he}'s feeling as ${he} does.`
		]);

		const r = [];
		if (canTalk(S.Milkmaid)) {
			const {say: say, title: Master} = getEnunciation(S.Milkmaid);
			r.push(
				Spoken(S.Milkmaid, `"${Master}, I've fucked a lot of assholes today. There's ${cumSlaves().length} cumslaves in the dairy, and I fucked them all up the butt at least once. Most of them more than once. My poor cock is a little sore, ${Master},"`),
				`${he} ${say}s.`
			);
		} else {
			r.push(`${He} indicates in amusingly graphic gestures that ${his} dick is sore. ${He} painstakingly counts on ${his} fingers, letting you know that ${he}'s fucked ${cumSlaves().length} assholes today, most of them more than once.`);
		}
		r.push(`With so many slaves getting cockmilked, ${he} certainly has to work hard to make sure none of them go unpenetrated.`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Use ${his} ass as ${he} looks after ${himself}`, useHim),
			new App.Events.Result(`Help ${him} with ${his} duties`, helpHim)
		]);

		function useHim() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Wordlessly, you`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`come up behind ${him}; the first thing to touch ${him} is`);
			if (V.PC.dick === 0) {
				r.push(`the phallus,`);
			} else {
				r.push(`your rapidly hardening dick,`);
			}
			r.push(`which pokes against`);
			if (S.Milkmaid.height >= 170) {
				r.push(`right up against ${his} asshole, since ${he}'s nice and tall enough for standing anal. ${He} gasps a little and angles ${his} hips to accept your cock.`);
			} else {
				r.push(`${his} lower back, since ${he}'s shorter than you. ${He} gasps a little and hikes ${himself} up on tiptoe to accept your cock.`);
			}
			r.push(`As ${he} feels you slide into ${his} body ${he} whimpers with devotion, turning ${his} upper body so ${he} can kiss ${his} ${getWrittenTitle(S.Milkmaid)} while ${heP} sodomizes ${him}.`);
			if (canTalk(S.Milkmaid)) {
				r.push(
					Spoken(S.Milkmaid, `"So this is how it feels when I do them,"`),
					`${he} whispers.`
				);
			} else {
				r.push(`${He} uses gestures to thank you for making ${him} feel like the milkers do.`);
			}
			r.push(`${He} uses the lotion to masturbate while ${he} takes it, wincing whenever ${he} loses control and squeezes ${his} sore cock too hard. When you're done ${he} sinks to the bathroom floor in a boneless pool of <span class="devotion inc">satisfied sexual exhaustion,</span> dripping ejaculate from ${his} front${V.PC.dick === 0 ? "" : " and back"}.`);
			S.Milkmaid.devotion += 4;
			seX(S.Milkmaid, "anal", V.PC, "penetrative");
			App.Events.addParagraph(frag, r);
			return frag;
		}
		function helpHim() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`${S.Milkmaid.slaveName} is surprised to find you in the collection facility when ${he} gets there the next morning. Since you're already`);
			if (V.PC.dick === 0) {
				r.push(`using a strap-on to fuck`);
			} else {
				r.push(`balls deep in`);
			}
			r.push(`a whining milker's ass, ${he} understands immediately that you're there to help. ${He}'s <span class="devotion inc">gratified,</span> and does ${his} best to make sure you have a good time. With so many slaves physically restrained to make their backdoors available, it's hard not to. ${S.Milkmaid.slaveName} does ${his} best to use a slave next to you so ${he} can be available for extra amusement at all times as the two of you sodomize away.`);
			S.Milkmaid.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
