// cSpell:ignore half-assedly

App.Events.refsBaronDemand = class refsBaronDemand extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSNeoImperialist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
			() => V.arcologies[0].FSNeoImperialistLaw2 === 1,
		];
	}

	execute(node) {
		const costYes = 8500;
		const costGifts = 2000;

		App.Events.addParagraph(node, [`One of your Barons has approached you with an elegantly-worded but rather entitled letter demanding that you increase his already extraordinarily generous stipend and allow for more individual freedom in the management of his arcology district. The petition appears to be supported by a number of other powerful Barons, who have tacked their name on in asking for similar advantages.`]);

		App.Events.addParagraph(node, [`"We manage and control the day-to-day operations of this entire Arcology," the letter reads, "And without us it would collapse in a matter of weeks. As such, you will not find our enclosed demands unreasonable, of greater rights and privileges for the daunting task of management and rule in your Immortal name, mighty Emperor..."`]);

		const choices = [];
		if (V.cash >= costYes) {
			choices.push(new App.Events.Result(`Accept their conditions as a show of good faith`, accept, `Will cost ${cashFormat(costYes)}`));
		}
		choices.push(new App.Events.Result(`Flat out refuse them`, refuse));
		if (V.cash >= costGifts) {
			choices.push(new App.Events.Result(`Refuse their demands, but placate them with gifts and ceremonies`, gifts, `Will cost ${cashFormat(costGifts)}`));
		}
		App.Events.addResponses(node, choices);

		function accept() {
			repX(2000, "event");
			cashX(-costYes, "event");
			return `You gracefully accept the demands of your Barons, granting them a number of minor new rights and increasing their luxurious Imperial stipends further. Predictably, the Barons are <span class="reputation inc">overjoyed</span> at your flat acceptance, and shower you with praise and compliments for a few days before returning to the management of their now wealthier districts, enriched at the <span class="cash dec">expense of your treasury.</span>`;
		}

		function refuse() {
			V.arcologies[0].prosperity -= 3;
			repX(-2000, "event");
			return `You laugh at the Baron's petition and inform them that nothing will be changing, and they had best think twice before coming to you with any similar nonsense. The Barons proceed to sulk and grumble for the next month, <span class="prosperity dec">half-assedly managing</span> their districts and <span class="reputation dec">spreading nasty gossip</span> about your supposedly 'tyrannical' mistreatment of your ever-so-loyal vassals.`;
		}

		function gifts() {
			cashX(-costGifts, "event");
			return `You invite the Barons to a party at your penthouse, informing them of your refusal of the petition over expensive wines and foreign slavegirl entertainment brought in for the evening's amusement. Although the pompous Barons do sulk somewhat at your refusal, the free drink and girls is more than enough to distract even these wealthy intellectuals, and the whole notion of additional Baron privileges is forgotten over the course of one drunken, <span class="cash dec">expensive</span> celebration.`;
		}
	}
};
