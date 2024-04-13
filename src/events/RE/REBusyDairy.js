App.Events.REBusyDairy = class REBusyDairy extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Entity.facilities.dairy.employeesIDs().size > 3,
			() => V.dairyRestraintsSetting < 2
		];
	}

	execute(node) {
		App.Events.addParagraph(node, [`${capFirstChar(V.dairyName)} is working away steadily. Its high-quality product <span class="reputation inc">reflects well on you,</span> you muse one day as you inspect the premises. The gentle pneumatic sounds of the milkers and the whimpers of the cows being milked are a pleasant background for the thought.`]);
		App.Events.addParagraph(node, [`Even with high doses of modern drugs, human cows simply do not produce a very high volume of milk. This isn't much of a business problem, since it just means that the product can be sold at a high price. However, some of the more grandiose ideas about how to use milk have had to wait until you have enough cows producing enough milk to make them possible.`]);

		repX(500, "event");

		const choices = [];
		choices.push(new App.Events.Result("Share a milk bath with the cows", share, `This will cost ${cashFormat(1000)}`));
		if (V.club !== 0) {
			choices.push(new App.Events.Result("Add fresh milk to the club for a day to advertise", advertise, `This will cost ${cashFormat(2000)}`));
		}
		if (cumSlaves().length >= 5) {
			choices.push(new App.Events.Result("Cum in, milk out", cumLoop, `This will cost ${cashFormat(1000)}`));
		}
		App.Events.addResponses(node, choices);

		function share() {
			const dairySlaves = V.slaves.filter(s => s.assignment === Job.DAIRY);
			cashX(-1000, "event");
			for (const slave of dairySlaves) {
				slave.devotion += 4;
				SimpleSexAct.Slaves(slave, dairySlaves.filter(s => s.ID !== slave.ID).random());
				if (slave.actualAge < 24) {
					SimpleSexAct.Player(slave);
				} else {
					if (canDoVaginal(slave)) {
						actX(slave, "vaginal", 1);
					}
					if (slave.dick > 0 && slave.chastityPenis === 0) {
						actX(slave, "penetrative", 1);
					}
				}
				if (slave.boobs > 300) {
					actX(slave, "mammary", 2);
				}
				slave.health.tired = 0;
			}
			return `Milk is a fashionable skin treatment in the Free Cities, and many of the cows fetishize their breasts and their milk. Many of them giggle with delight when you bring them all into a large spa room with a huge tub full of their fresh milk. A pittance will be lost from sales, but it's hard to think of such things when swimming and splashing in warm, nutty mother's milk with so many huge-breasted slaves, many of whom are milking themselves into the bath. Some of the older ones relax and luxuriate, gently milking themselves and masturbating or pleasuring each other, according to taste. The younger cows prefer to rub themselves against you, taking turns being fucked. Regardless, they all <span class="devotion inc">appreciate such a special experience.</span>`;
		}
		function advertise() {
			cashX(-2000, "event");
			repX(2500, "event");
			return `Sexual sights and sounds are all over the arcology. Nevertheless, passersby on the club are surprised to find one morning that a previously normal screen advertising your brand of milk has a luscious pair of breasts protruding through it at head height. The advertisement encourages anyone to try a free sample. The slaves constantly rotate, pressing fresh tits through the gap for public suckling. It is <span class="reputation inc">generally agreed that your product is of the finest quality</span> and you even have enquiries about how it might be exported outside the arcology, should you manage to increase production.`;
		}
		function cumLoop() {
			repX(5000, "event");
			cashX(-1000, "event");
			return `As a promotional gimmick, you announce with considerable fanfare a special, experimental brand of milk, available at the normal price for a short time only. The milk will be unique in that it will be from cows fed mostly on slaves' cum; the cockmilked slaves will in turn be given as much milk as possible to produce a 'pure slave product,' recursively. The sad realities of nutrition stop it from being much more than a marketing ploy, but it's certainly a <span class="reputation inc">successful</span> attempt to spark discussion.`;
		}
	}
};
