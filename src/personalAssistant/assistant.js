globalThis.assistant = (function() {
	return {
		BC: BC,
		object: manage,
		pronouns: pronouns,
	};

	/**
	 * runs the assistant's backwards compatibility
	 */
	function BC() {
		App.Update.assistantBC();
	}

	function pronouns() {
		let o = {};
		if (V.assistant.personality <= 0 || V.assistant.appearance === "normal") {
			o.main = o.market = {pronoun: App.Data.Pronouns.Kind.ai};
		} else {
			if (V.assistant.appearance === "incubus" && V.diversePronouns > 0) {
				o.main = {pronoun: App.Data.Pronouns.Kind.male};
				o.market = {pronoun: App.Data.Pronouns.Kind.female};
			} else if (V.assistant.appearance === "succubus" && V.diversePronouns > 0) {
				o.main = {pronoun: App.Data.Pronouns.Kind.female};
				o.market = {pronoun: App.Data.Pronouns.Kind.male};
			} else {
				o.main = o.market = {pronoun: App.Data.Pronouns.Kind.female};
			}
		}
		return o;
	}

	function manage() {
		V.assistant = V.assistant || {};
		Object.assign(V.assistant, {
			personality: V.assistant.personality || 0,
			name: V.assistant.name || "your personal assistant",
			power: V.assistant.power || 0,
			appearance: V.assistant.appearance || "normal",
		});

		if (V.assistant.market) {
			Object.assign(V.assistant.market, {
				relationship: V.assistant.market.relationship || "cute",
				limit: V.assistant.market.limit || 0,
				aggressiveness: V.assistant.market.aggressiveness || 0,
			});
		}
		if (V.week < 18) {
			delete V.assistant.options;
		}
	}
})();
