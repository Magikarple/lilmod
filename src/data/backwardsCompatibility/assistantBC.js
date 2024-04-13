// @ts-nocheck
App.Update.assistantBC = function() {
	function convert(oldVar, variable, value = null) {
		if (jsDef(V[oldVar])) {
			if (typeof V[oldVar] !== "number" || (typeof V[oldVar] === "number" && V[oldVar] > 0)) {
				V.assistant[variable] = value === null ? V[oldVar] : value;
			}
		}
		delete V[oldVar];
	}

	V.assistant = Object.assign({}, {
		personality: V.assistant,
		name: V.assistantName,
		power: V.assistantPower,
		appearance: V.assistantAppearance,
	});
	delete V.assistantName; delete V.assistantPower;
	delete V.assistantAppearance; delete V.assistantPronouns;

	convert('marketAssistantAnnounced', 'market', {});
	convert('assistantExtra1', 'Extra1');
	convert('assistantExtra2', 'Extra2');
	convert('assistantNameAnnounced', 'announcedName');
	convert('assistantBodyDesire', 'bodyDesire');
	convert('assistantOptions', 'options');
	convert('assistantFSOptions', 'fsOptions');
	convert('assistantFSAppearance', 'fsAppearance');

	if (V.assistant.market) {
		Object.assign(V.assistant.market, {
			relationship: V.marketAssistantRelationship,
			limit: V.marketAssistantLimit,
			aggressiveness: V.marketAssistantAggressiveness,
		});
	}
	delete V.marketAssistantRelationship; delete V.marketAssistantLimit;
	delete V.marketAssistantAggressiveness; delete V.marketAssistantPronouns;
};
