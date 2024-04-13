App.Events.RELegendaryCow = class RELegendaryCow extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [[
			(s) => s.fetish !== Fetish.MINDBROKEN,
			hasAnyArms,
			hasAnyLegs,
			canTalk,
			(s) => s.devotion > 50,
			(s) => s.prestige === 0,
			(s) => s.lactation > 0,
			(s) => App.Medicine.fleshSize(s, 'boobs') > 6000, // should probably have a milkAmount() check?
			(s) => [Job.DAIRY, Job.MILKED].includes(s.assignment)
		]];
	}

	execute(node) {
		const slave = getSlave(this.actors[0]);
		let r = [];

		const {
			He,
			he, his, him
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		slave.devotion += 4;

		r.push(
			App.UI.DOM.slaveDescriptionDialog(slave),
			`is an incredible producer of ${slave.milkFlavor === "none" ? `` : `${slave.milkFlavor}-flavored `}milk. ${He}'s lactating in volumes that would have been unthinkable in the days when drug treatments were limited by consent. A nascent slave dairy trade organization will be holding a public stock show tomorrow, and since they're aware you keep cows, they've sent you an invitation to enter stock to be judged.`
		);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`This is a rare opportunity. The idea of human dairy is new and understandably fascinating to many, so the stock show is likely to draw some serious press. Were ${slave.slaveName} to win, ${he} would probably be remembered for a long time as a special cow.`);

		App.Events.addParagraph(node, r);

		const cashSmall = 5000;
		const cashLarge = 10000;
		const choices = [];
		choices.push(new App.Events.Result(`Fairly enter ${him} in the stock show`, enterFairly));
		if (V.cash > cashSmall) {
			choices.push(new App.Events.Result(`Spend ${cashFormat(cashSmall)} bribing the judges`, bribeLow));
		} else {
			choices.push(new App.Events.Result(null, null, `You do not have enough cash to bribe the judges`));
		}
		if (V.cash > cashLarge) {
			choices.push(new App.Events.Result(`Spend ${cashFormat(cashLarge)} bribing the judges and sabotaging the competition`, bribeHigh));
		} else {
			choices.push(new App.Events.Result(null, null, `You do not have enough cash to bribe the judges and sabotage the competition`));
		}
		App.Events.addResponses(node, choices);

		function enterFairly() {
			const frag = new DocumentFragment();
			let r = [];
			if (random(1, 100) > 90) {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then publicly milked. It's likely there was some bribery behind the scenes, but ${his} massive tits win the day. Against all odds ${he} is named best in show, and will be <span class="green">remembered</span> as dairy stock of the highest pedigree. As ${his} owner, your reputation has <span class="green">also increased.</span>`);
				repX(500, "event", slave);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is remembered for winning best in show as a dairy cow.";
				addTrinket(`best in show milk cow`, {
					name: slave.slaveName,
					id: slave.ID
				});
			} else {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then publicly milked. It's likely there was some bribery behind the scenes, and it is fatal to ${his} chances of winning. Though ${his} tits are easily the most impressive on display, another stock owner who was more open-handed with the judges took best in show. The public is impressed with ${slave.slaveName}'s tits anyway; as you are ${his} owner, your reputation has <span class="green">increased</span> a little.`);
				repX(500, "event", slave);
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function bribeLow() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(-cashSmall, "event", slave);
			repX(500, "event", slave);
			if (random(1, 100) > 50) {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then publicly milked. Several of the judges cannot resist giving you a wink as they look ${him} over. ${slave.slaveName} is unsurprisingly named best in show, and will be <span class="green">remembered</span> as dairy stock of the highest pedigree. As ${his} owner, your reputation has <span class="green">also increased.</span>`);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is remembered for winning best in show as a dairy cow.";
				addTrinket(`best in show milk cow`, {
					name: slave.slaveName,
					id: slave.ID
				});
			} else {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then publicly milked. Several of the judges cannot resist giving you a wink as they look ${him} over, but others look disapprovingly at them; it seems some of your competitors also forwarded money to the committee. After furious wrangling, ${slave.slaveName} loses to another cow. The public is impressed with ${slave.slaveName}'s tits anyway; as you are ${his} owner, your reputation has <span class="reputation inc">increased</span> a little.`);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function bribeHigh() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(-cashLarge, "event", slave);
			if (random(1, 100) > 10) {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then publicly milked. After ${he}'s put through ${his} paces, the most unfortunate series of accidents somehow befalls ${his} fellow cows. One is taken ill, another seems drugged, and someone seems to have slipped a finger of raw ginger up another's ass, making them whine and squeal constantly. ${slave.slaveName} is unsurprisingly named best in show, and will be <span class="prestigious">remembered</span> as dairy stock of the highest pedigree. As ${his} owner, your reputation has <span class="reputation inc">also increased.</span>`);
				repX(500, "event", slave);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is remembered for winning best in show as a dairy cow.";
				addTrinket(`best in show milk cow`, {
					name: slave.slaveName,
					id: slave.ID
				});
			} else {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then publicly milked. You are surprised to see that the judging committee has been changed at the last minute. They choose another cow as best in show. There are persistent <span class="reputation dec">rumors</span> after the show that there was an absolute massacre of firings at the dairy organization headquarters the night before the show after it was discovered that someone, widely thought to be you, had been corrupting the judges.`);
				repX(-100, "event", slave);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
