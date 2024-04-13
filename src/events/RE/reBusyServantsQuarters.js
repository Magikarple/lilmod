App.Events.REBusyServantsQuarters = class REBusyServantsQuarters extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Entity.facilities.servantsQuarters.employeesIDs().size > 3
		];
	}

	execute(node) {
		App.Events.addParagraph(node, [`Your penthouse is very well staffed with servants. The trend in modern buildings is to design around automatic cleaning systems. Dusting, mopping, and polishing are no longer really necessary when machines that do them more cheaply and thoroughly than any human are readily available. Keeping slaves to clean is an ostentation, and visitors to your quarters are often <span class="reputation inc">surprised and gratified</span> to see a sex slave working away in the old way.`]);
		App.Events.addParagraph(node, [`The busy servants' quarters are a reservoir of slaves that can be used for almost any whim that occurs to you.`]);

		repX(500, "event");

		App.Events.addResponses(node, [
			new App.Events.Result("Share the servants' quarters with your more favored slaves", share),
		]);

		function share() {
			for (const slave of V.slaves) {
				if (slave.assignment !== Job.QUARTER) {
					slave.devotion += 4;
					if (canPenetrate(slave)) {
						actX(slave, "penetrative", 2);
						if (canDoVaginal(slave)) {
							actX(slave, "vaginal", 1);
						} else {
							actX(slave, "penetrative", 1);
						}
					} else if (canDoVaginal(slave)) {
						actX(slave, "vaginal", 2);
						actX(slave, "penetrative", 1);
					} else {
						actX(slave, "penetrative", 3);
					}
				} else {
					slave.devotion -= 5;
					if (canDoVaginal(slave) && slave.vagina > 0) {
						actX(slave, "vaginal");
					} else if (canDoAnal(slave) && slave.anus > 0) {
						actX(slave, "anal");
					}
					actX(slave, "oral", 5);
				}
			}
			return `The poor slaves in the servants' quarters are lower than almost any others, and they know it. Unfortunately for them, they're about to spend a long weekend knowing it unusually well. Sleeping time is usually nearly inviolate; you are the only person in the penthouse who is permitted to wake a sleeping slave for any but emergency reasons. Not now. You haunt the servants' quarters, using and abusing at will, and encourage your better slaves to follow your example. They quickly take the opportunity to be better than someone for once, and compete with each other in sexual harassment of the servants. They <span class="devotion inc">appreciate</span> having <span class="devotion dec">targets</span> for their frustrations.`;
		}
	}
};
