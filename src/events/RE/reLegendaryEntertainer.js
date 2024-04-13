App.Events.RELegendaryEntertainer = class RELegendaryEntertainer extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [[
			(s) => s.fetish !== Fetish.MINDBROKEN,
			hasAnyArms,
			canWalk,
			canTalk,
			(s) => s.devotion > 50,
			(s) => s.trust > 50,
			(s) => s.prestige === 0,
			(s) => s.skill.entertainment >= 100,
			(s) => (canDoAnal(s) && s.anus > 0) || (canDoVaginal(s) && s.vagina > 0),
			(s) => [Job.CLUB, Job.DJ].includes(s.assignment)
		]];
	}

	execute(node) {
		const slave = getSlave(this.actors[0]);
		let r = [];

		const {
			His,
			he, his, him
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		slave.devotion += 4;

		r.push(
			`The Free Cities fashion scene extends to slave bodies, of course; stopping at mere clothes and behaviors is an old world conceit. This week,`,
			App.UI.DOM.slaveDescriptionDialog(slave),
			`is in vogue. Such a crowd of gawkers and hangers-on follows ${him} around the club that the fine citizens who have a chance at an hour of ${his} time must shoulder their way through the throng.`
		);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`This is a rare opportunity. Such popularity and fame is here today, and gone tomorrow. It might be possible, with a serious investment of funds in publicity, to really fix ${him} in the public mind as a courtesan of note. There's no guarantee of success, but if you are successful, ${his} value will increase a great deal.`);

		App.Events.addParagraph(node, r);

		const cashSmall = 5000;
		const cashBig = 10000;
		const choices = [];
		choices.push(new App.Events.Result(`Just capitalize on ${his} popularity as it is`, asIs));
		if (V.cash > cashSmall) {
			choices.push(new App.Events.Result(`Invest ${cashFormat(cashSmall)} in ${his} notoriety`, investSmall));
			if (V.cash > cashBig) {
				choices.push(new App.Events.Result(`Lavish ${cashFormat(cashBig)} on ${his} fame`, investBig));
			} else {
				choices.push(new App.Events.Result(null, null, `Not enough cash to lavishly invest`));
			}
		} else {
			choices.push(new App.Events.Result(null, null, `Not enough cash to invest`));
		}

		App.Events.addResponses(node, choices);

		function asIs() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You decide to limit your advantage on ${his} temporary popularity to a little publicity and some advertising. You've gained a little <span class="green">notoriety.</span>`);
			repX(1000, "event", slave);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function investSmall() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(-cashSmall, "event", slave);
			repX(1000, "event", slave);
			if (random(1, 100) > 50) {
				r.push(`You buy media coverage of ${him}, invest in an ad campaign, and even arrange for persons of influence and taste to sample and review ${his} gentle caresses. Your efforts are a success. ${His} current extreme popularity will fade in time, but you have managed to arrange for ${him} a permanent place as a <span class="prestigious">respected and famous courtesan.</span> As ${his} owner, your reputation has <span class="reputation inc">also increased.</span>`);
				if (slave.prestige <= 1) {
					slave.prestige = 1;
					slave.prestigeDesc = "$He is a famed Free Cities slut, and can please anyone.";
				}
				addTrinket(`famous courtesan`, {
					name: slave.slaveName,
					id: slave.ID
				});
			} else {
				r.push(`You buy media coverage of ${him}, invest in an ad campaign, and even arrange for persons of influence and taste to sample and review ${his} gentle caresses. Unfortunately, popularity remains an art, not a science; though you do your best, the public mind's fancy eludes your grasp. As ${his} owner, your reputation has <span class="green">increased,</span> but in a week ${he}'ll be forgotten.`);
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function investBig() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(-cashBig, "event", slave);
			if (random(1, 100) > 10) {
				r.push(`You buy prime media coverage of ${him}, invest in a lavish ad campaign, and even arrange for persons of great influence and fine taste to sample and review ${his} gentle caresses. Your efforts are a success. ${His} current extreme popularity will fade in time, but you have managed to arrange for ${him} a permanent place as a <span class="green">respected and famous courtesan.</span> As ${his} owner, your reputation has <span class="reputation inc">also increased.</span>`);
				repX(2000, "event", slave);
				if (slave.prestige <= 1) {
					slave.prestige = 1;
					slave.prestigeDesc = "$He is a famed Free Cities slut, and can please anyone.";
				}
				addTrinket(`famous courtesan`, {
					name: slave.slaveName,
					id: slave.ID
				});
			} else {
				r.push(`You buy prime media coverage of ${him}, invest in a lavish ad campaign, and even arrange for persons of great influence and fine taste to sample and review ${his} gentle caresses. Unfortunately, popularity remains an art, not a science; though you do your best, the public mind's fancy eludes your grasp. As ${his} owner, your reputation has <span class="reputation">increased,</span> but in a week ${he}'ll be forgotten.`);
				repX(2000, "event", slave);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
