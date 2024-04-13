App.Events.pessBodyguardBedtime = class pessBodyguardBedtime extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Bodyguard,
			() => S.Bodyguard.skill.combat > 30
		];
	}

	execute(node) {
		const {
			He,
			he, his, him, himself, girl
		} = getPronouns(S.Bodyguard);
		App.Events.drawEventArt(node, S.Bodyguard, "no clothing");

		const r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(S.Bodyguard),
			`is accustomed to sleep on a bedroll placed across the bottom of the door to your bedroom. In this way, no one could enter the room without going past your bodyguard, even as ${he} lies resting. As you watch, the breath in ${his}`
		);
		if (S.Bodyguard.muscles > 30) {
			r.push(`muscular`);
		} else if (S.Bodyguard.muscles <= 5) {
			r.push(`thin`);
		} else if (S.Bodyguard.boobs < 500 && S.Bodyguard.butt < 3) {
			r.push(`androgynous`);
		} else if (S.Bodyguard.height >= 170) {
			r.push(`tall`);
		} else if (S.Bodyguard.height < 150) {
			r.push(`short`);
		} else {
			r.push(`feminine`);
		}
		if (V.seeRace === 1) {
			r.push(`${S.Bodyguard.race}`);
		}
		r.push(`form slowly raises and lowers the sheet over ${him}.`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} up in bed with you`, inBed),
			new App.Events.Result(`Commend and reward ${him} the next morning`, morning, (S.Bodyguard.anus === 0 || S.Bodyguard.vagina === 0) ? `This option will take ${his} virginity` : ``)
		]);

		function inBed() {
			S.Bodyguard.devotion -= 5;
			return `Of course, ${S.Bodyguard.slaveName} promptly obeys your order that ${he} come up and join you in bed. After you have gone to sleep, however, ${he} does not feel that ${he} can sleep ${himself}, since ${he} is no longer blocking the door. ${He} spends the rest of the night in sleepless watch, agonizing over this disruption of ${his} protection of your person. <span class="devotion dec">${He} is confused and unhappy.</span>`;
		}

		function morning() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`The next morning, you sit at your desk to do business as usual, and ${S.Bodyguard.slaveName} takes up station just behind your left shoulder. You thank ${him} for ${his} vigilance as ${he} does. ${He} looks almost confused to be thanked for doing ${his} proper duty, so you settle on a more direct method of communicating your closeness to ${him}.`);
			if (S.Bodyguard.vagina === 0 && !canDoVaginal(S.Bodyguard)) {
				r.push(`Since ${he}'s wearing chastity, you take ${him} out onto the balcony, arm an extra security system so ${he} can relax, remove ${his} protection, and have gentle, loving sex with ${him} until ${he}'s climaxed twice.`);
				S.Bodyguard.chastityVagina = 0;
				r.push(VCheck.Vaginal(S.Bodyguard, 1));
			} else if ((S.Bodyguard.anus === 0) && !canDoAnal(S.Bodyguard)) {
				r.push(`Since ${he}'s wearing chastity, you take ${him} out onto the balcony, arm an extra security system so ${he} can relax, remove ${his} protection, and have gentle, loving anal sex with ${him} until ${he}'s climaxed twice.`);
				S.Bodyguard.chastityAnus = 0;
				r.push(VCheck.Anal(S.Bodyguard, 1));
			} else if (!canDoVaginal(S.Bodyguard) && !canDoAnal(S.Bodyguard)) {
				r.push(`You take ${him} out onto the balcony, arm an extra security system so ${he} can relax, and firmly massage ${his} neck and shoulders to work out all the tension.`);
			} else if (S.Bodyguard.vagina === 0) {
				r.push(`You take ${him} out onto the balcony, arm an extra security system so ${he} can relax, and have gentle, loving sex with ${him} until ${he}'s climaxed twice, once to your gentle massaging of ${his} mons while you fuck ${him}, and once to hard rubbing of ${his} pussy while you have enthusiastic anal sex.`);
				r.push(VCheck.Both(S.Bodyguard, 2, 1));
			} else if (canDoAnal(S.Bodyguard)) {
				if (S.Bodyguard.hormoneBalance >= 100) {
					r.push(`Since ${he}'s doped up on hormones, you take ${him} out onto the balcony, arm an extra security system so ${he} can relax, and have gentle, loving anal sex with ${him} until ${he}'s climaxed twice.`);
				} else if (S.Bodyguard.chastityPenis === 1) {
					r.push(`Since ${he}'s a caged dick ${girl}, you take ${him} out onto the balcony, arm an extra security system so ${he} can relax, and use ${his} anus until ${he}'s exhausted.`);
				} else if (S.Bodyguard.dick > 0 && S.Bodyguard.ballType === "sterile") {
					r.push(`Since ${he}'s chemically castrated, you take ${him} out onto the balcony, arm an extra security system so ${he} can relax, and have gentle, loving anal sex with ${him} until ${he}'s climaxed twice.`);
				} else if (S.Bodyguard.dick > 0 && S.Bodyguard.balls === 0) {
					r.push(`Since ${he}'s a gelding, you take ${him} out onto the balcony, arm an extra security system so ${he} can relax, and have gentle, loving anal sex with ${him} until ${he}'s climaxed twice.`);
				} else if (canAchieveErection(S.Bodyguard)) {
					r.push(`Since ${he}'s a virile slave, you take ${him} and another slave out onto the balcony, arm an extra security system so ${he} can relax, and set the other slave to orally servicing ${his} erect member. Meanwhile, you have gentle, loving anal sex with ${him} until ${he}'s climaxed twice.`);
				} else {
					r.push(`You take ${him} out onto the balcony, arm an extra security system so ${he} can relax, and have gentle, loving anal sex with ${him} until ${he}'s climaxed twice.`);
				}
				r.push(VCheck.Anal(S.Bodyguard, 1));
			} else {
				r.push(`You take ${him} out onto the balcony, arm an extra security system so ${he} can relax, and have gentle, loving sex with ${him} until ${he}'s climaxed twice, once to your gentle massaging of ${his} mons while you fuck ${him}, and once to hard rubbing of ${his} pussy while you have enthusiastic anal sex.`);
				r.push(VCheck.Both(S.Bodyguard, 2, 1));
			}
			r.push(`<span class="devotion inc">${He} is grateful</span> that you allowed ${him} to relax in this way and <span class="trust inc">respects your judgment</span> in how you set things up.`);
			S.Bodyguard.devotion += 4;
			S.Bodyguard.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
