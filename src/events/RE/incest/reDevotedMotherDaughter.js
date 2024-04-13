App.Events.REDevotedMotherDaughter = class REDevotedMotherDaughter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeIncest === 1
		];
	}

	actorPrerequisites() {
		return [
			[
				(s) => s.daughters > 0,
				(s) => s.devotion > 50,
				(s) => s.anus !== 0,
				canWalk,
			],
			[
				s => s.mother === this.actors[0],
				(s) => s.devotion > 50,
				(s) => s.anus !== 0,
				canWalk
			]
		];
	}

	execute(node) {
		let r = [];
		const mommy = getSlave(this.actors[0]);
		const daughter = getSlave(this.actors[1]);
		const {
			he, his, mother
		} = getPronouns(mommy);

		const {
			he: he2, his: his2, daughter: daughter2
		} = getPronouns(daughter);

		App.Events.drawEventArt(node, [mommy, daughter], "no clothing");

		r.push(
			App.UI.DOM.slaveDescriptionDialog(mommy, mommy.slaveName),
			`and ${his} ${daughter2}`,
			App.UI.DOM.slaveDescriptionDialog(daughter, daughter.slaveName),
			`are both good slaves, devoted and obedient. They'd probably do anything you order them to do. By happenstance they come before you for inspection one after the other. They certainly see each other stark naked frequently enough. As you finish ${mommy.slaveName}'s inspection, ${his} ${daughter2} waits patiently for ${his2} turn. It occurs to you that they probably would do <i>anything</i> you order them to do, and that they're so acclimated to sexual slavery that they might well enjoy it.`
		);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Spend the night sharing your bed with them, and each of them with the other`, share));
		choices.push(new App.Events.Result(`Get them started and then keep them at it in your office`, started));
		App.Events.addResponses(node, choices);

		function share() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Neither of them bat an eye when you announce you're turning in early and that they'll be joining you. Since they're already naked, they get into your big soft bed before you and lie facing each other, with enough room in between them for you to take a central position. They clearly assume you'll start with one of them on each side of you, so they're quite surprised when you slide in behind ${mommy.slaveName} instead. ${daughter.slaveName} snuggles up to ${his2} ${mother} happily enough, however. You extend the foreplay for hours, eventually bringing both of them to such a state of naked arousal that they begin grinding against each other as much as they do you. They get the idea, and things turn into a sort of unspoken mutual one-upmanship between them. What starts with ${daughter.slaveName} clearly feeling very daring as ${he2} sucks ${his2} ${mother}'s nipple ends with ${mommy.slaveName} lying on ${his} back getting fucked by you while ${he} orally pleasures ${daughter.slaveName}. You're face to face with ${daughter.slaveName} and ${he2} groans happily into your mouth as ${mommy.slaveName} moans into ${his2} ${daughter.dick > 0 ? `cock` : `fuckhole`}. <span class="trust inc">They have both become more trusting of you.</span>`);

			mommy.trust += 4;
			daughter.trust += 4;
			seX(mommy, "oral", daughter, "oral");

			if (canDoAnal(mommy)) {
				actX(mommy, "anal");
			} else if (canDoVaginal(mommy)) {
				actX(mommy, "vaginal");
			}

			if (canDoAnal(daughter)) {
				actX(daughter, "anal");
			} else if (canDoVaginal(daughter)) {
				actX(daughter, "vaginal");
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function started() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You give them orders of devastating simplicity: they are to repair to the couch in your office and are to take turns getting each other off until such time as you tell them otherwise. They're momentarily stunned, but ${mommy.slaveName} takes the lead and draws ${his} ${daughter2} over to the couch${(hasAnyArms(mommy) && hasAnyArms(daughter)) ? " by the hand" : ""}. They're both accomplished sex slaves and obey orders well, so they are quite successful in the little game, if a bit mechanical. For the rest of the day, interviewees come and go and are treated to the sight of the two of them having subdued sex on the couch. Showing off one's slaves for business interlocutors is a common Free Cities practice, but more than one perceptive person figures out what the resemblance between the two slaves and the age gap between them really means. Of course, all those who figure it out are impressed by your sheer decadence.`);
			r.push(`<span class="reputation inc">Your reputation has increased considerably.</span>`);
			repX(2500, "event", mommy);
			repX(2500, "event", daughter);
			seX(mommy, "oral", daughter, "oral", 5);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
