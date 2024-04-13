App.Events.RERebels = class RERebels extends App.Events.BaseEvent {
	actorPrerequisites() {
		/**
		 * @type {Array<FC.Assignment>}
		 */
		const jobs = [Job.ARCADE];
		if (V.dairyRestraintsSetting >= 2) {
			jobs.push(Job.DAIRY);
		}
		const req = [
			(s) => !jobs.includes(s.assignment),
			(s) => s.devotion < -20,
			canWalk,
			hasAnyArms,
			canTalk,
			canSee,
			canHear
		];
		return [req, req];
	}

	execute(node) {
		const r = [];

		const thingOne = getSlave(this.actors[0]);
		const thingTwo = getSlave(this.actors[1]);

		const {
			He,
			he, his, him
		} = getPronouns(thingOne);

		const {
			He2,
			he2, his2, him2,
		} = getPronouns(thingTwo).appendSuffix("2");

		App.Events.drawEventArt(node, [thingOne, thingTwo], "no clothing");


		r.push(
			`You have a rebel problem.`,
			App.UI.DOM.slaveDescriptionDialog(thingOne),
			`and`,
			contextualIntro(thingOne, thingTwo, true),
			`are both unbroken, and they seem to draw strength from each other. They're discreet about it, but the arcology's always-vigilant systems occasionally catch them nodding to one another after one of them is punished, or giving each other quiet words of encouragement when they think no one is listening. This is extremely dangerous and should be addressed promptly.`
		);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Set them against each other, in public`, publicly));
		choices.push(new App.Events.Result(`Set them against each other, in private`, privately));
		if (V.seeExtreme === 1 && thingTwo.vagina > 0 && thingOne.vagina > 0) {
			choices.push(new App.Events.Result(`Let them compete against each other to decide who lives`, deathMatch));
		}
		if (V.arcade > 0) {
			choices.push(new App.Events.Result(`Sentence them to a month in the arcade`, arcade));
		}

		App.Events.addResponses(node, choices);

		function publicly() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You haul your little rebel bitches out in public, one by one, bound, with bags over their heads. They find themselves chained in a low position so their mouths are publicly available. Then, you whisper to each of them that whichever slut sucks off the most passersby gets to rest tomorrow — and whichever sucks least gets a beating. It doesn't take long before <span class="devotion inc">they forget their friendship</span> and try to outdo each other, and their desperate efforts <span class="reputation inc">are certainly appreciated by the citizens getting free blowjobs.</span> It's childishly easy to declare the contest over when they happen to be tied, and announce that no one will be punished or rewarded. They hate you less and each other more.`);
			for (const thing of [thingOne, thingTwo]) {
				thing.devotion += 4;
				seX(thing, "oral", "public", "penetrative", 6);
				repX(250, "event", thing);
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function privately() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Back in the old world, the saying went that turnabout was fair play. In the Free Cities, turnabout is often a cast-iron bitch. Whenever you have an idle moment, all week, you set them against one another in some degrading or painful contest. They are made to spank each other, with the slave who hits lightest getting a spanking from you. They are made to compete to see who can suck other slaves off quickest, with the loser forced to orally service the winner. So on, and so on; by the end of the week <span class="trust dec">they forget their friendship</span> and try to outdo each other to avoid punishment.`);
			for (const thing of [thingOne, thingTwo]) {
				thing.trust -= 5;
				seX(thing, "oral", "slaves", "penetrative", 6);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function deathMatch() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You haul your bound little rebel bitches into one of the deepest, most out of the way rooms of your penthouse with bags over their heads. When you pull them off, they are met with the sight of a gallows, complete with a pair of nooses. You haul them, one at a time, up onto a stool and loop the rope around their necks. They scream and beg the whole time for you to reconsider, before turning on each other to try and avoid their fate. It won't be that easy for them. You hold up a pair of spoons and explain the rules of the game. They'll hold them in their pussies, and whoever loses their grip and drops it first, dies.`);
			App.Events.addParagraph(frag, r);
			r = [];
			if (thingOne.vagina > 3) {
				r.push(`You start with ${thingOne.slaveName} and no sooner than you turn to ${thingTwo.slaveName} do you hear the telltale clatter of the spoon hitting the floor. With a simple kick, the unfortunately loose ${thingOne.slaveName} is left struggling in the air. ${thingTwo.slaveName} watches in horror as the life drains from ${his2} former accomplice. <span class="trust dec">${He2} promises to never cross you again.</span>`);
				thingTwo.trust -= 20;
				removeSlave(thingOne);
			} else if (thingTwo.vagina > 3) {
				r.push(`You start with ${thingOne.slaveName} before moving to ${thingTwo.slaveName} as ${he} holds ${his} life between ${his} netherlips. Setting the spoon inside ${thingTwo.slaveName}, you prepare to kick the stools out from under them; but the telltale clatter of the spoon hitting the floor saves you the trouble. With a simple kick, the unfortunately loose ${thingTwo.slaveName} is left struggling in the air. ${thingOne.slaveName} watches in horror as the life drains from ${his} former accomplice. <span class="trust dec">${He} promises to never cross you again.</span>`);
				thingOne.trust -= 20;
				removeSlave(thingTwo);
			} else if (random(1, 100) === 69) {
				r.push(`You start with ${thingOne.slaveName} before moving to ${thingTwo.slaveName} as ${he} holds ${his} life between ${his} netherlips. Once both spoons are inserted, you sit back and watch them squirm at the cold metal in their most sensitive recesses. They are both desperate to survive and clamp down as hard as they can, but it can't go on forever as the sounds of a spoon clattering to the floor fills the room. Both slaves freeze as they realize the other has lost their grip on the silverware, uncertain of what comes next. You answer the question by knocking the stools out from under them, allowing them both to hang. They came into this together and they are going out together.`);
				removeSlave(thingOne);
				removeSlave(thingTwo);
			} else if (thingOne.vagina === thingTwo.vagina && random(1, 100) > 50) {
				r.push(`You start with ${thingOne.slaveName} before moving to ${thingTwo.slaveName} as ${he} holds ${his} life between ${his} netherlips. Once both spoons are inserted, you sit back and watch them squirm at the cold metal in their most sensitive recesses. They are both`);
				if (thingOne.vagina === 1) {
					r.push(`quite tight, so it's no surprise when they put up a good show.`);
				} else {
					r.push(`not the tightest slaves, so it's a surprise they manage to hold on as long as they do.`);
				}
				r.push(`But it can't go on forever as the sound of the spoon clattering to the floor fills the room.`);
				if (random(1, 100) <= 50) {
					r.push(kickBucket(thingTwo, thingOne));
				} else {
					r.push(kickBucket(thingOne, thingTwo));
				}
			} else if (thingTwo.vagina > thingOne.vagina && random(1, 100) > 50) {
				r.push(`You start with ${thingOne.slaveName} before moving to ${thingTwo.slaveName} as ${he} holds ${his} life between ${his} netherlips. Once both spoons are inserted, you sit back and watch them squirm at the cold metal in their most sensitive recesses. ${thingOne.slaveName} is the clear favorite in this game, but the looser ${thingTwo.slaveName} refuses to give in, using ${his2} experience to clamp down as hard as ${he2} can. But it can't go on forever as the sound of the spoon clattering to the floor fills the room.`);
				if (random(1, 100) <= 90) {
					r.push(kickBucket(thingTwo, thingOne));
				} else {
					r.push(kickBucket(thingOne, thingTwo));
					if (thingTwo.vagina >= 3) {
						r.push(`You can't say you expected this outcome, but it was amusing all the same to discover the blown out whore has some talent.`);
					} else {
						r.push(`You're glad no bets were riding on this.`);
					}
				}
			} else {
				r.push(`You start with ${thingOne.slaveName} before moving to ${thingTwo.slaveName} as ${he} holds ${his} life between ${his} netherlips. Once both spoons are inserted, you sit back and watch them squirm at the cold metal in their most sensitive recesses. In a show of underhandedness, ${thingTwo.slaveName} kicks ${thingOne.slaveName}, knocking ${him} off balance and sending ${him} hanging. ${thingTwo.slaveName} watches as the life drains from ${his2} accomplice, <span class="trust dec">horrified at what ${he2} just did.</span> The ordeal <span class="red">leaves ${him2} behaving strangely.</span>`);
				thingTwo.trust = -100;
				thingTwo.behavioralFlaw = "odd";
				removeSlave(thingOne);
			}

			App.Events.addParagraph(frag, r);
			return frag;

			/**
			 * @param {App.Entity.SlaveState} dead
			 * @param {App.Entity.SlaveState} survivor
			 * @returns {DocumentFragment}
			 */
			function kickBucket(dead, survivor) {
				const {him} = getPronouns(dead);
				const {his2, him2} = getPronouns(survivor).appendSuffix("2");
				const frag = new DocumentFragment();
				let r = [];
				r.push(`You kick the stool out from under ${dead.slaveName} and let ${him} hang. ${survivor.slaveName} watches in horror as the life drains from ${his2} former accomplice, <span class="trust dec">terrified that you'd so callously toy with their lives.</span> The ordeal <span class="red">leaves ${him2} behaving strangely.</span>`);
				App.Events.addParagraph(frag, r);
				survivor.trust -= -20;
				survivor.behavioralFlaw = "odd";
				removeSlave(dead);
				return frag;
			}
		}

		function arcade() {
			for (const thing of [thingOne, thingTwo]) {
				assignJob(thing, "be confined in the arcade");
				thing.sentence = 4;
			}
			return `They scream and beg when they realize what their punishment is to be, but you are obdurate. Each tries to inform on the other to avoid such a fate, but to no avail. After they're properly confined, the only sign of their discomfiture is a slight movement of their butts as they wriggle desperately against their restraints.`;
		}
	}
};
