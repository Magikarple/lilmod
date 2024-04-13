App.Events.REDevotees = class REDevotees extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		const devoteeRequirements = [
			s => s.devotion > 50,
			canWalk,
			isSlaveAvailable
		];
		return [ // total of four actors, identical requirements for each
			devoteeRequirements,
			devoteeRequirements,
			devoteeRequirements,
			devoteeRequirements
		];
	}

	execute(node) {
		let devotees = this.actors.map(a => getSlave(a)); // for this event, they're fine as an array

		App.Events.drawEventArt(node, devotees);

		const slaveList = devotees.map(s => s.slaveName).reduce((res, ch, i, arr) => res + (i === arr.length - 1 ? ' and ' : ', ') + ch);

		let t = [];
		t.push(`You have a mature, well-trained household of slaves. ${slaveList} are all devoted to you. There are all manner of ways you could display this coterie of loyal sex slaves to show off your wealth and power.`);
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result("See an operetta with four attendants", opera),
			new App.Events.Result("Visit a casino in good company", casino),
		]);

		function opera() {
			let t = [];
			t.push(`You reserve a box at an upcoming operetta; classical Italian music is enjoying a renaissance these days. The doormen at the fashionable opera house promptly widen the velvet ropes so that you and your party may proceed unimpeded. Their quick thinking is necessary, since there are five of you walking sedately up the steps: you in the middle, impeccable in`);
			if (V.PC.title === 1) {
				t.push(`gentleman's evening wear, complete with gloves and cane;`);
			} else {
				t.push(`a fine and noble lady's tuxedo;`);
			}
			t.push(`and ${slaveList}, all dressed in the gorgeous fashion of the seventeenth century, all plunging necklines, piled hair, and ruffled petticoats. The splendid master of ceremonies clears his throat and announces in a sonorous voice, "${PCTitle()}." The ostentation <span class="reputation inc">turns every head and catches every eye.</span>`);
			for (const s of devotees) {
				repX(600, "event", s);
			}
			return t;
		}

		function casino() {
			let t = [];
			t.push(`The croupiers, bouncers and regulars down at the nearest casino hardly know what to think when you appear with a chit full of cash and twice as many partners as you have arms. You live the night big, starting at the poker table with so many tits and asses on display behind you that, <span class="cash inc">baby, you make a killing.</span> ${slaveList} quickly catch the rhythm of the place: slaves can get away with a little more in the smoky, whiskey soaked, money tinted atmosphere, and they <span class="devotion inc">enjoy themselves immensely.</span> They flirt, flash, giggle, kiss each other, and generally destroy the concentration of everyone within twenty ${V.showInches === 2 ? "yards" : "meters"} — except you. Ring-a-ding-ding.`);
			const inc = random(30, 100)*30;
			for (const s of devotees) {
				cashX(inc, "event", s);
				s.devotion += 4;
			}
			return t;
		}
	}
};
