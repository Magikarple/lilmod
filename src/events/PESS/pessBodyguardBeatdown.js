App.Events.pessBodyguardBeatdown = class pessBodyguardBeatdown extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Bodyguard,
			() => S.Bodyguard.devotion > 45
		];
	}

	execute(node) {
		const {
			He,
			he, his, him, woman
		} = getPronouns(S.Bodyguard);
		App.Events.drawEventArt(node, S.Bodyguard);

		App.Events.addParagraph(node, [
			App.UI.DOM.slaveDescriptionDialog(S.Bodyguard),
			`is a constant fixture by your side in your excursions outside the penthouse, as is befitting ${his} position as your personal bodyguard. Largely the position is ceremonial; there are few citizens with a survival instinct compromised enough to risk attacking an arcology owner in the middle of their arcology. This evening, however, you run into one of those scant few citizens — a drunkard so inebriated that he doesn't seem to understand the danger in invading your personal space. Before your personal security can be further jeopardized, your bodyguard steps in.`
		]);

		const choices = [];
		if (S.Bodyguard.muscles < 30) {
			choices.push(new App.Events.Result(null, null, "Your bodyguard lacks the musculature required to manhandle him."));
		} else {
			choices.push(new App.Events.Result(`${He} uses ${his} muscles to manhandle him`, manhandle));
		}

		if (S.Bodyguard.height < 170) {
			choices.push(new App.Events.Result(null, null, "Your bodyguard lacks the height required to tower over and intimidate him."));
		} else {
			choices.push(new App.Events.Result(`${He} intimidates him with ${his} towering height`, height));
		}

		if (S.Bodyguard.face < 95) {
			choices.push(new App.Events.Result(null, null, `Your bodyguard lacks the beauty required to distract him with ${his} wiles.`));
		} else {
			choices.push(new App.Events.Result(`${He} distracts him with ${his} beautiful face`, face));
		}

		if (S.Bodyguard.intelligence + S.Bodyguard.intelligenceImplant < -15) {
			choices.push(new App.Events.Result(null, null, `Your bodyguard lacks the intellect required to de-escalate the situation with tact.`));
		} else {
			choices.push(new App.Events.Result(`${He} de-escalates the situation with tact`, persuade));
		}

		if (S.Bodyguard.skill.combat > 30) {
			choices.push(new App.Events.Result(`${He} fights him hand to hand`, fight));
		} else {
			choices.push(new App.Events.Result(null, null, `Your bodyguard lacks the combat skill required to fight him hand to hand.`));
		}

		choices.push(new App.Events.Result(`${He} fires a few dozen warning shots`, warn));

		App.Events.addResponses(node, choices);

		function manhandle() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`${S.Bodyguard.slaveName} stomps over to the drunken delinquent, who finds himself sobering up with each step the muscular ${woman} makes in his direction. Soon he finds himself`);
			if (S.Bodyguard.height > 170) {
				r.push(`staring up at ${his} ${S.Bodyguard.faceShape} face`);
			} else if (S.Bodyguard.height > 150) {
				r.push(`eye to eye with ${his} ${S.Bodyguard.faceShape} face`);
			} else {
				r.push(`looking down at ${his} ${S.Bodyguard.faceShape} face`);
			}
			r.push(`as ${he} grips him by the shoulders and lifts him bodily off of the ground. The man squeals with terror as he begs forgiveness for his affront to you, but ${S.Bodyguard.slaveName} simply tosses him away from your presence as if discharging him from a bar. Word of your herculean protector is soon <span class="reputation inc">the talk of ${V.arcologies[0].name} and beyond,</span> with many in the old world mistakenly believing you are guarded by a warrior so strong ${he} can throw any man the breadth of a room in a single heave.`);
			repX(2500, "event", S.Bodyguard);
			if (S.Bodyguard.prestige < 1) {
				S.Bodyguard.prestige = 1;
				S.Bodyguard.prestigeDesc = "Word in the arcology is $he can throw a man the breadth of a room in a single heave.";
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function height() {
			repX(2500, "event", S.Bodyguard);
			if (S.Bodyguard.prestige < 1) {
				S.Bodyguard.prestige = 1;
				S.Bodyguard.prestigeDesc = "Word in the arcology is $he is twice the height of any man.";
			}
			return `${S.Bodyguard.slaveName} calmly strides over to the drunken delinquent and simply towers over him with a glower on ${his} ${S.Bodyguard.faceShape} face. The man quickly finds himself sobering up and moves to run from the scene with all the drunken haste he can muster. Unfortunately for him, ${S.Bodyguard.slaveName} matches his pace with a brisk power-walk, and the citizen soon finds himself face-down on the pavement after a swift strike to the back of the head. Word of your giant protector is soon <span class="reputation inc">the talk of ${V.arcologies[0].name} and beyond,</span> with many in the old world mistakenly believing you are guarded by a warrior twice the height of any man.`;
		}

		function face() {
			repX(2500, "event", S.Bodyguard);
			if (S.Bodyguard.prestige < 1) {
				S.Bodyguard.prestige = 1;
				S.Bodyguard.prestigeDesc = "Word in the arcology is $his beauty is unmatched by any $woman in the world.";
			}
			return `${S.Bodyguard.slaveName} seductively saunters over to the drunken delinquent and poses alluringly nearby. The man can't help but become entranced by ${his} gorgeous ${S.Bodyguard.faceShape} face, and follows ${him} like a lost puppy as ${he} beckons with one outstretched finger. ${S.Bodyguard.slaveName} lures ${his} prey into a nearby alley before slamming ${his} fist into the unsuspecting drunkard's face, leaving him knocked out cold on the floor before returning to guard you. Word of your beautiful protector is soon <span class="reputation inc">the talk of ${V.arcologies[0].name} and beyond,</span> with many in the old world mistakenly believing you are guarded by a warrior unmatched by any ${woman} in the world in ${his} good looks.`;
		}

		function persuade() {
			repX(2500, "event", S.Bodyguard);
			if (S.Bodyguard.prestige < 1) {
				S.Bodyguard.prestige = 1;
				S.Bodyguard.prestigeDesc = "$His silver tongue is the envy of many in the arcology.";
			}
			return `${S.Bodyguard.slaveName} walks over to the man, puts an arm about his shoulders and explains to him ${canTalk(S.Bodyguard) ? "in hushed whispers" : "with rapid sign language"} the severity of the situation. The man sobers up quickly as the reality of his actions set in and he soon beats a hasty exit from the scene as ${S.Bodyguard.slaveName} returns to guard your body. Word of your tactful protector is soon <span class="reputation inc">the talk of ${V.arcologies[0].name} and beyond,</span> with many in the old world mistakenly believing you are guarded by a warrior whose silver tongue is the envy of many politicians.`;
		}

		function fight() {
			repX(2500, "event", S.Bodyguard);
			if (S.Bodyguard.prestige < 1) {
				S.Bodyguard.prestige = 1;
				S.Bodyguard.prestigeDesc = "Word in the arcology is $his hands are deadlier than many weapons.";
			}
			return `${S.Bodyguard.slaveName} quickly maneuvers over to the man and strikes him low in the stomach, robbing him of breath in a single strike. The man sobers up somewhat and raises his arms to defend himself, but finds himself outmatched by ${S.Bodyguard.slaveName}'s skillful attacks. It doesn't take long for ${S.Bodyguard.slaveName} to reduce the man to a battered heap on the ground with ${his} hands alone, after which ${he} soon returns to you to guard your body. Word of your martial protector is soon <span class="reputation inc">the talk of ${V.arcologies[0].name} and beyond,</span> with many in the old world mistakenly believing you are guarded by a warrior whose hands are deadlier than many weapons.`;
		}

		function warn() {
			repX(500, "event", S.Bodyguard);
			return `${S.Bodyguard.slaveName} draws ${his} firearm and blasts the pavement between yourself and the delinquent with a hail of bullets. The man sobers up immediately at the excessive use of firepower and flees the scene in fear of ${S.Bodyguard.slaveName} turning ${his} weapon on him. ${S.Bodyguard.slaveName} holsters ${his} weapon and returns to your side to guard you. Word of your trigger happy protector is soon <span class="reputation inc">the talk of ${V.arcologies[0].name}</span> and you find most citizens are keen to avoid causing you offense with ${S.Bodyguard.slaveName} around.`;
		}
	}
};
