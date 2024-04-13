App.Events.pessDjPublicity = class pessDjPublicity extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.DJ,
			() => App.Entity.facilities.club.employeesIDs().size >= 5,
			() => S.DJ.face > 95,
			() => S.DJ.skill.entertainment >= 100,
		];
	}

	execute(node) {
		const {
			He,
			he, his, him, himself, girl
		} = getPronouns(S.DJ);
		App.Events.drawEventArt(node, S.DJ);

		App.Events.addParagraph(node, [
			`Your DJ`,
			App.UI.DOM.slaveDescriptionDialog(S.DJ),
			`is a terribly pretty ${girl}. Very few of your tenants, male or female, would turn down a night in ${V.clubName} with ${him}. Demand is such that ${he} must carefully confine ${himself} to the most important, leaving the lesser of your citizens with the sight of ${his} body and the sound of ${his} beats. A few of them are so smitten as to consider earning ${his} favors the primary benefit of advancement, looking forward to the day when ${S.DJ.slaveName} will deign to mark their success in life by giving them attention on the floor. In many ways, ${S.DJ.slaveName}'s face is the face of ${V.arcologies[0].name}.`
		]);
		const faceCash = 1000;
		const prestigeCash = 10000;
		const choices = [];
		choices.push(new App.Events.Result(`Make ${him} the face of an ad campaign`, face, `This option will cost ${cashFormat(faceCash)}`));
		choices.push(new App.Events.Result(`Keep ${him} to yourself for a week`, selfish));
		if (S.DJ.prestige === 0) {
			choices.push(new App.Events.Result(`Put public emphasis on ${him} with the objective of making ${him} famous`, prestige, `This option will cost ${cashFormat(prestigeCash)}`));
		}

		App.Events.addResponses(node, choices);

		function face() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You bring ${him} out to a pretty balcony and put ${him} through an extended photo shoot. ${He} has no idea what you're planning, but ${he}'s skilled enough not to need to. ${He} dons different outfits, changes makeup, and even shifts personas for the camera, producing hundreds of elegant, sensual and eye-catching images. You dismiss ${him} back to the club when you're done, and ${he} clearly thinks little of it. The next day, however, you walk ${him} out onto the club in the morning. When the two of you, ${getWrittenTitle(S.DJ)} and DJ, reach the main club,`);
			if (canSee(S.DJ)) {
				r.push(`${he} stops short when ${he} catches sight of`);
			} else {
				r.push(`you make sure to describe to ${him}, in explicit detail, what's displayed on`);
			}
			r.push(`the main billboard screen. There ${he} is, resplendent and opulent,`);
			if (V.showInches === 2) {
				r.push(`thirty feet`);
			} else {
				r.push(`ten meters`);
			}
			r.push(`tall, giving the viewer a sultry look. ${He} only breaks down for a single moment, but it's quite a moment: ${he} cries rather inelegantly,`);
			if (canTalk(S.DJ)) {
				const {say: say, title: Master} = getEnunciation(S.DJ);
				r.push(
					`${say}ing a sobbing`,
					Spoken(S.DJ, `"I love you, ${Master}" into your ear`)
				);
			}
			r.push(`before giving you a <span class="devotion inc">wet kiss.</span> Then ${he} runs over to stand under the screen, looking back at you to give you a <span class="reputation inc">picture-perfect</span> imitation of the billboard ${he}'s standing under before laughing at ${himself} a little.`);
			cashX(-faceCash, "event", S.DJ);
			repX(2500, "event", S.DJ);
			S.DJ.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function selfish() {
			S.DJ.devotion += 4;
			S.DJ.trust += 4;
			repX(500, "event", S.DJ);
			return `Exclusivity and slavery interact in ways more than merely complex. ${S.DJ.slaveName}'s most passionate devotees are devastated to find ${him} nowhere but by your side for the whole week. Their reaction is mixed: awe, envy, resentment; but mostly <span class="reputation inc">renewed respect</span> that ${he} is your creature, and yours alone. A lesser slave might show off the particularity you show ${him}, bringing shame on you by giving the impression that you care for ${him} as more than a slave. ${He} is no lesser slave, though, and thoroughly understands the fine line the two of you must walk as ${getWrittenTitle(S.DJ)} and slave. ${He} makes <span class="devotion inc">painstakingly</span> clear, through every public glance and gesture, that ${he} is yours as a matter of <span class="trust inc">trust</span> rather than as a matter of love.`;
		}

		function prestige() {
			cashX(-10000, "event", S.DJ);
			repX(2500, "event", S.DJ);
			S.DJ.prestige = 1;
			return `For the coming week, ${he} does the publicity rounds. It's a little different than a free celebrity might do, but the mere act of letting ${him} be interviewed is enough of a display of your confidence in ${his} loyalty that people <span class="reputation inc">take notice.</span> ${He} will be <span class="prestige inc">forever remembered</span> as one of the first slaves to go before the press and articulately explain why ${he} loves being your property. ${He} looks good doing it, too.`;
		}
	}
};
