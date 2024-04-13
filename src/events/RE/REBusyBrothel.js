App.Events.REBusyBrothel = class REBusyBrothel extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Entity.facilities.brothel.employeesIDs().size > 3
		];
	}

	execute(node) {
		App.Events.addParagraph(node, [`${capFirstChar(V.brothelName)} is well staffed, and does a busy trade in flesh 24 hours a day. With so many sex slaves in the Free Cities, brothels occupy a functional, nearly mechanical part of the sexual landscape. Free citizens and sometimes even favored slaves visit the brothel, select from the available merchandise, relieve their sexual needs, and leave. Affection, companionship, and emotional needs are available elsewhere.`]);
		App.Events.addParagraph(node, [`Of course, ${V.brothelName} is the best establishment of its kind in the arcology. Citizens who patronize it can expect themselves to be very well looked after by skilled slaves. The quality of the merchandise, the efficiency with which it is delivered, and the cleanliness and reputation of the premises <span class="reputation inc">reflect well on you,</span> so much so that you could leverage this bustling sexual commerce in many ways.`]);

		repX(500, "event");

		App.Events.addResponses(node, [
			new App.Events.Result("Surprise the hardworking whores with a day of rest", rest, `This will cost ${cashFormat(1000)}`),
			new App.Events.Result("Hire an expert hooker to give lessons", lessons, `This will cost ${cashFormat(2000)}`),
			new App.Events.Result("Eliminate prices for one morning to promote the brothel", promote, `This will cost ${cashFormat(2000)}`),
		]);

		function rest() {
			cashX(-1000, "event");
			for (const slave of V.slaves.filter(s => s.assignment === Job.BROTHEL)) {
				slave.devotion += 4;
				slave.health.tired = 0;
			}
			return `The problem with assembly-line sex is that it has a tendency to destroy any sense of intimacy or fun. So, you make some simple preparations and close the brothel for a day, hiring some freelancers to cover. All your slave whores are allowed to sleep late, and then spend the day with you playing games and enjoying light amusements. The slaves are surprised by your generosity, but they have fun. Many of the games are sexually themed. One day of giggling and squealing can't completely reverse the transactionalization of sex for them, but they <span class="devotion inc">appreciate the effort.</span>`;
		}
		function lessons() {
			cashX(-2000, "event");
			for (const slave of V.slaves.filter(s => s.assignment === Job.BROTHEL)) {
				slave.lastWeeksCashIncome += 250;
				slave.lifetimeCashIncome += 250;
				if (slave.skill.whoring < 100) {
					slave.skill.whoring += 10;
				} else {
					slave.devotion += 4;
				}
			}
			return `The citizen streetwalker has had her day. A few of the cleverest have avoided being driven into poverty, either by becoming madams or by finding a way to build a new career serving the slave brothel industry. One of these is touring the city, offering her long sexual experience in seminars for slave prostitutes. Her services are not cheap, but it rapidly becomes clear that they are worth it. She is a grey-haired but still elegant woman with deep crow's feet and a smoker's voice. She is not only a sexual master, but a hard-bitten and comprehensively experienced businesswoman. All of your brothel slaves with any room for improvement in their whoring skills <span class="reputation inc">learn from her lessons,</span> while those who have nothing to learn <span class="devotion inc">gain confidence</span> from her praise.`;
		}
		function promote() {
			repX(1000, "event");
			cashX(-2000, "event");
			for (const slave of V.slaves.filter(s => s.assignment === Job.BROTHEL)) {
				healthDamage(slave, 10);
				if (canDoVaginal(slave)) {
					seX(slave, "vaginal", "public", "penetrative", 5);
					if (canDoAnal(slave)) {
						seX(slave, "anal", "public", "penetrative", 5);
					} else {
						seX(slave, "vaginal", "public", "penetrative", 5);
					}
				} else if (canDoAnal(slave)) {
					seX(slave, "anal", "public", "penetrative", 10);
				}
				seX(slave, "oral", "public", "penetrative", 10);
			}
			return `The news that sex will be free at the brothel travels like wildfire. Security measures are necessary to control the throng that spends the entire day entering and leaving the brothel, though as the day goes on the crowds thin. By midmorning, all the holes on offer are so fucked out that only those who fetishize that sort of thing stick around. The brothel is a real seminal sewer by noon, and it smells like it. Nevertheless, free sex is a short route to <span class="reputation inc">public approval,</span> though you do miss a morning's fees. The poor slave whores are <span class="health dec">fairly battered</span> by so much wear and tear in so little time.`;
		}
	}
};
