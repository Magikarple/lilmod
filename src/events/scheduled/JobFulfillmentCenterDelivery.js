App.Events.JobFulfillmentCenterDelivery = class JobFulfillmentCenterDelivery extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.JFC.order === 1,
			() => V.JFC.reorder !== 1
		];
	}

	execute(node) {
		V.JFC.order = 0;
		App.UI.StoryCaption.encyclopedia = "Enslaving People";
		const slave = generateLeadershipSlave(V.JFC.role, 'Job Fulfillment Center');
		const {
			He,
			he, him
		} = getPronouns(slave);
		const cost = slaveCost(slave) * 6;

		App.Events.addParagraph(node, [
			`A slave dealer has submitted a slave to satisfy your`,
			App.UI.DOM.makeElement("span", V.JFC.role, "bold"),
			`order for ${cashFormat(cost)}.`
		]);

		App.UI.DOM.appendNewElement("span", node, `As usual, the asking price is quite high, to cover training costs. However, you can freely decline the slave should ${he} not meet your standards or the job has already been filled.`, "note");

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Accept the offered slave`, accept));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to accept the offered slave.`));
		}
		choices.push(new App.Events.Result(`Reject and repost this offer`, reject));
		App.Events.addResponses(node, choices);

		function accept() {
			V.JFC = {order: 0, reorder: 0};
			cashX(-cost, "slaveTransfer", slave);

			return [
				`${He} has been very well trained by the dealer that offered ${him} to you. ${He} has also picked up on the fact that ${he} was specially selected, and is a little hopeful that this means ${he} may be treated well. ${He} is now eagerly awaiting your instructions.`,
				App.UI.newSlaveIntro(slave)
			];
		}

		function reject() {
			V.JFC.order = 1;
			V.JFC.reorder = 1;
			return `The current slave is not to your satisfaction. No matter. There are always more slaves.`;
		}
	}
};
