App.Events.RELegendaryWomb = class RELegendaryWomb extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [[
			(s) => s.fetish !== Fetish.MINDBROKEN,
			hasAnyArms,
			canMove,
			canTalk,
			(s) => s.prestige === 0,
			(s) => s.devotion > 50,
			(s) => s.trust > 50,
			(s) => s.broodmother === 0,
			(s) => s.eggType === "human",
			(s) => s.counter.births > 10,
			(s) => s.preg > s.pregData.normalBirth / 1.33,
			(s) => s.bellyPreg >= 14000,
			(s) => [Job.WHORE, Job.BROTHEL, Job.PUBLIC, Job.CLUB].includes(s.assignment),
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
			`is an incredible mother. ${He}'s given birth to numbers that would have been considered absurd in the days when drug treatments were limited by consent. A nascent organization will be holding a pageant for pregnant slaves tomorrow, and since they're aware you keep breeders, they've sent you an invitation to enter a heavily pregnant slave to be judged.`
		);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`This is a rare opportunity. The idea of a pregnancy pageant isn't new but it is undeniably going to attract attention, so the pageant is likely to draw some serious press. Were ${slave.slaveName} to win, ${he} would probably be remembered for a long time as a special mother.`);

		const cashSmall = 5000;
		const cashLarge = 10000;
		const choices = [];
		choices.push(new App.Events.Result(`Fairly enter ${him} in the pregnancy pageant`, enterFairly));
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
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then asked to demonstrate how to pleasure a man while so heavily pregnant. It's likely there was some bribery behind the scenes, but ${his} heavy belly and creative positions win the day. Against all odds ${he} is named best in show, and will be <span class="prestigious">remembered</span> as a breeder of the highest pedigree. As ${his} owner, your reputation has <span class="reputation inc">also increased.</span>`);
				repX(500, "event", slave);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is remembered for winning best in show as a breeder.";
				addTrinket(`best in show breeder`, {
					name: slave.slaveName,
					id: slave.ID
				});
			} else {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then asked to demonstrate how to pleasure a man while so heavily pregnant. It's likely there was some bribery behind the scenes, and it is fatal to ${his} chances of winning. Though ${his} pregnant body is the most impressive on display, another slaveowner who was more open-handed with the judges took best in show. The public is impressed with ${slave.slaveName}'s reproductive capability anyway; as you are ${his} owner, your reputation has <span class="reputation inc">increased</span> a little.`);
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
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then asked to demonstrate how to pleasure a man while so heavily pregnant. Several of the judges cannot resist giving you a wink as they look ${him} over. ${slave.slaveName} is unsurprisingly named best in show, and will be <span class="prestigious">remembered</span> as a breeder of the highest pedigree. As ${his} owner, your reputation has <span class="reputation inc">also increased.</span>`);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is remembered for winning best in show as a breeder.";
				addTrinket(`best in show breeder`, {
					name: slave.slaveName,
					id: slave.ID
				});
			} else {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then asked to demonstrate how to pleasure a man while so heavily pregnant. Several of the judges cannot resist giving you a wink as they look ${him} over, but others look disapprovingly at them; it seems some of your competitors also forwarded money to the committee. After furious wrangling, ${slave.slaveName} loses to another mother. The public is impressed with ${slave.slaveName}'s reproductive capability anyway; as you are ${his} owner, your reputation has <span class="reputation inc">increased</span> a little.`);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function bribeHigh() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(-cashLarge, "event", slave);
			if (random(1, 100) > 10) {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then asked to demonstrate how to pleasure a man while so heavily pregnant. After ${he}'s put through ${his} paces, the most unfortunate series of accidents somehow befalls ${his} fellow mothers. One is taken ill, another seems drugged, and another went into labor and gave birth, disqualifying her. ${slave.slaveName} is unsurprisingly named best in show, and will be <span class="prestigious">remembered</span> as a breeder of the highest pedigree. As ${his} owner, your reputation has <span class="reputation inc">also increased.</span>`);
				repX(500, "event", slave);
				slave.prestige = 1;
				slave.prestigeDesc = "$He is remembered for winning best in show as a breeder.";
				addTrinket(`best in show breeder`, {
					name: slave.slaveName,
					id: slave.ID
				});
			} else {
				r.push(`${slave.slaveName} is shown in public, closely inspected by the judging committee, and then asked to demonstrate how to pleasure a man while so heavily pregnant. You are surprised to see that the judging committee has been changed at the last minute. They choose another breeder as best in show. There are persistent <span class="reputation dec">rumors</span> after the show that there was an absolute massacre of firings at the dairy organization headquarters the night before the show after it was discovered that someone, widely thought to be you, had been corrupting the judges.`);
				repX(-100, "event", slave);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
