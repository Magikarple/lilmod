App.Events.REBusyArcade = class REBusyArcade extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Entity.facilities.arcade.employeesIDs().size > 3
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.assignment === Job.ARCADE,
				s => s.fetish !== Fetish.MINDBROKEN,
				s => canMove(s) || hasAnyLegs(s),
				s => s.devotion < 45
			]
		];
	}

	execute(node) {
		let [slave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, himself, him
		} = getPronouns(slave);
		const {title: Master} = getEnunciation(slave);

		App.Events.addParagraph(node, [`Slaves in your arcade are not immured in the facility permanently, since holding them in one position at all times would negatively impact their health. They are released to exercise, eat, bathe, and sleep, but for nothing else. You occasionally inspect them when they do so, to see that their harsh lives are not inappropriately difficult for them. One day when you are doing so, ${contextualIntro(V.PC, slave)} flings ${himself} on the ground in front of you the instant ${he} sees you.`]);

		let r = [];
		r.push(`Facing the ground, ${he}`);
		if (!canTalk(slave)) {
			r.push(`gestures`);
			if (hasAnyArms(slave)) {
				r.push(`with ${hasBothArms(slave) ? "shaking hands" : "a shaking hand"}`);
			} else {
				r.push(`in the limited capacity that ${he} is capable of`);
			}
			r.push(`that ${he} cannot take any more. ${He} begs you abjectly to let ${him} out of the arcade and promises to be a perfect sex slave if you do.`);
		} else {
			if (SlaveStatsChecker.checkForLisp(slave)) {
				r.push(`lisps through tears`);
			} else {
				r.push(`sobs,`);
			}
			r.push(`"${Master}, ${Spoken(slave, "please. I can't take any more of this. Please let me out. I'll do anything")}, ${Master}. I'll love you forever, ${Master} — ${Spoken(slave, "just don't make me go back inside")} that wall."`);
		}
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Accept ${his} pledge`, accept),
			new App.Events.Result("Refuse", refuse),
		]);

		function accept() {
			slave.devotion = 45;
			removeJob(slave, "be confined in the arcade");
			return `When you accept, ${slave.slaveName} looks up at you in incomprehension, expecting you to correct yourself or reveal that this is a cruel trick. When you do neither, ${he} scrabbles spastically to your feet, kisses them as ${he} cries, and then clings to your knees, sobbing. ${He} is so relieved by this reprieve that ${he} is now on the cusp of <span class="devotion inc">devotion to you,</span> and will obey out of near-paralytic fear of being sent back to the arcade.`;
		}

		function refuse() {
			return `${He} did not really expect mercy, but ${his} sobs take on a distinctly dark tone of hopelessness at your refusal. As you personally immure ${him} in the arcade for another day of endless dick, you wonder whether ${he}'ll damage ${his} throat with all the commotion ${he}'s making. Several of the other arcade slaves glance dully over at the noise. Then, they look away.`;
		}
	}
};
