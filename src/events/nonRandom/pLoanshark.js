App.Events.pLoanshark = class pLoanshark extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.loans.some(loan => loan.name === 'shark' && loan.deadline === V.week)
		];
	}

	execute(node) {
		V.nextButton = " ";

		const loan = V.loans.find(loan => loan.name === 'shark');

		App.Events.addParagraph(node, [`You took out a loan from one of the local loansharks and the time has come to collect. You receive a notification from ${V.assistant.name} that an envoy and a detachment of mercenaries have arrived to see you, and after the group has been escorted in, the shark's representative clears his throat and begins.`]);
		App.Events.addParagraph(node, [`"It states here in my records that you recently borrowed ${cashFormat(Math.trunc(loan.principal))} from my boss. It's time to fulfill your end of the deal."`]);

		App.Events.addResponses(node, [
			V.cash > loan.full
				? new App.Events.Result(`Pay the man`, pay)
				: new App.Events.Result(null, null, `You do not have enough cash to pay the loan back`),
			V.slaves.some(slave => slaveCost(slave) > loan.full)
				? new App.Events.Result(`Offer one of your slaves instead`, slave)
				: new App.Events.Result(null, null, `You do not have any slaves valuable enough to cover the loan`),
			new App.Events.Result(`Refuse`, refuse)
		]);

		function pay() {
			cashX(forceNeg(loan.full), "loan");
			V.loans.delete(V.loans.find(loan => loan.name === 'shark'));

			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();

			return `No sense in dragging this out. You roll your eyes and order ${V.assistant.name} to transfer the ¤. The envoy, satisfied that all is as it should be, gives a slight bow and a quick nod to his party. Without another word, the men turn on their heels and leave.`;
		}

		function slave() {
			App.Events.addNode(node, [chooseSlave()]);
			V.loans.delete(V.loans.find(loan => loan.name === 'shark'));

			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();

			return `With a slight tilt of your head, you inquire as to whether your lender would be willing to accept a different type of currency instead. The envoy nods and replies, "Yes, that would be acceptable – my patron has authorized me to make trades on his behalf."`;

			function chooseSlave() {
				const frag = App.UI.DOM.makeElement("div", null, ['margin-top']);

				frag.append(`Choose a slave to send with the group:`);

				V.slaves
					.filter(slave => slaveCost(slave) > loan.full)
					.sort((a, b) => slaveCost(a) - slaveCost(b))
					.forEach(slave => {
						const div = document.createElement("div");
						const {him} = getPronouns(slave);

						App.Events.addNode(div, [
							App.UI.DOM.link(`Send `, () => {
								App.UI.DOM.replace(frag, `You call ${SlaveFullName(slave)} in. After the representative has taken a moment to inspect ${him}, he nods in satisfaction and taps something on his tablet. A moment later you receive a notification that your debt with the lender has been concluded. The man turns to you once more. "It's been a pleasure," he says dryly. With that, the group departs, ${slave.slaveName} in tow.`);

								removeSlave(slave);
							}),
							App.UI.DOM.slaveDescriptionDialog(slave, SlaveFullName(slave)),
							` (worth ${cashFormat(slaveCost(slave))})`,
						], "div", ['indent']);

						frag.append(div);
					});

				return frag;
			}
		}

		function refuse() {
			const text = [];

			if (V.cash > loan.full || V.slaves.some(slave => slaveCost(slave) > loan.full)) {
				text.push(`You simply give the man a cold smile and cross your arms, a clear signal of defiance and refusal. The envoy gives a subtle signal to one of his compatriots, and the large soldier takes a step forward, restraints in hand. "As you know," the representative begins, "Anyone with significant enough debt is subject to enslavement, and the contract you signed with my employer states that you are now a slave. You're coming with us."`);
			} else {
				text.push(`Unfortunately, you're in a little over your head – you have neither the cash needed, nor any slaves valuable enough to cover the cost. Upon hearing this, the envoy nods, his face expressionless. "As you know," he starts, "Anyone with significant enough debt is subject to enslavement, and the contract you signed with my employer states that you are now a slave. You're coming with us."`);
			}

			if (S.Bodyguard) {
				const {his, him} = getPronouns(S.Bodyguard);

				text.push(`Your bodyguard, ${S.Bodyguard.slaveName}, draws ${his} pistol faster than you would have thought possible and manages to put a round into the nearest mercenary before the other soldiers gun ${him} down. Unarmed and defenseless, you have no choice but to surrender.`);
			}

			V.loans.delete(V.loans.find(loan => loan.name === 'shark'));
			V.gameover = "loanshark";
			V.nextButton = "Continue";
			V.nextLink = "Gameover";
			App.Utils.scheduleSidebarRefresh();

			return text.join(' ');
		}
	}
};
