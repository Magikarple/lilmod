App.Events.PECombatTraining = class PECombatTraining extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => S.Bodyguard && S.Bodyguard.skill.combat === 0
		];
	}

	get weight() {
		return 3;
	}

	execute(node) {
		let r = [];

		App.Events.drawEventArt(node, S.Bodyguard);
		const {
			He,
			he, his, him, hers
		} = getPronouns(S.Bodyguard);

		r.push(
			App.UI.DOM.slaveDescriptionDialog(S.Bodyguard),
			`has many duties as a bodyguard, and ${his} schedule is carefully built to allow ${him} to complete them. When you're at your desk in your penthouse and there are no guests to intimidate, ${his} services are least needed, so ${he} typically uses these lulls to catch up on sleep or train.`
		);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The feed from the small armory next door shows ${him} doing the latter. ${He} has finished working with a heavy practice sword, and has moved to the tiny, one-shooter range. ${He} seems frustrated, hurrying ${his} shots and missing unnecessarily.`);

		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Instruct ${him}`, instruct),
			new App.Events.Result(`Promise ${him} a sexual reward if ${he} improves`, reward, willTake()),
		]);

		function instruct() {
			S.Bodyguard.trust += 4;
			S.Bodyguard.skill.combat = 15 + Math.floor((S.Bodyguard.intelligence + S.Bodyguard.intelligenceImplant) / 32);
			return `${S.Bodyguard.slaveName} starts as you enter the range and don ear protection. ${He} is distracted by your body against ${hers} as you come in close to correct ${his} stance, but ${he} concentrates hard for you. You take whatever time you can spare over the week for serious lessons. ${He} <span class="skill inc">is diligent and learns well,</span> and <span class="trust inc">places greater trust</span> in your judgment.`;
		}

		function reward() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Over the feed, you tell ${S.Bodyguard.slaveName} that ${he} can have ${his} choice of sexual release if ${he} scores well on the next set of targets. ${He} concentrates desperately, trying to ignore ${his} mounting arousal as ${he} imagines enjoying`);
			if (S.Bodyguard.fetish === Fetish.NONE) {
				r.push(`passionate sexual`);
			} else if (S.Bodyguard.fetish === "boobs") {
				r.push(`breast`);
			} else {
				r.push(S.Bodyguard.fetish);
			}
			r.push(`play. ${He} barely makes the stated score, and hurries smiling in for ${his} reward. ${He} feels <span class="devotion inc">closer to you,</span> but is distracted from any real learning and does not become a better fighter.`);
			S.Bodyguard.devotion += 4;
			if (canDoVaginal(S.Bodyguard)) {
				r.push(VCheck.Vaginal(S.Bodyguard, 1));
			} else if (canDoAnal(S.Bodyguard)) {
				r.push(VCheck.Anal(S.Bodyguard, 1));
			} else {
				seX(S.Bodyguard, "oral", V.PC);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function willTake() {
			if (canDoVaginal(S.Bodyguard) && (S.Bodyguard.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(S.Bodyguard) && (S.Bodyguard.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}
	}
};
