// cSpell:ignore appeara

App.UI.assistantAppearancePackTwo = function() {
	const node = new DocumentFragment();

	App.Events.drawEventArt(node, "assistant");

	const {
		HeA, HisA,
		heA, hisA, himA
	} = getPronouns(assistant.pronouns().main).appendSuffix("A");

	let r = [];
	r.push(`"Cool! New appearances to play around with!" Your assistant happily chimes. "Let's see what's inside! This looks heavenly..." ${HeA} hunches forward as a large pair of white feathered wings extend from ${hisA} upper back. ${HeA} takes several experimental flaps before taking to the sky. "I feel positively radiant! Maybe a smaller version will be more to your liking?" ${HeA} loses both height and wingspan until ${heA} stands roughly equivalent to ${heightToEitherUnit(120)}. ${HeA} flutters around cutely. "This is neat, I'm like cupid. Want me to hook you up with anyone?" ${HeA} winks as ${hisA} wings become bat-like and a pair of cute little nubs appears on ${hisA} head. "Or maybe you'd just like to play with me instead." The impish figure flirts, before landing and blossoming into a stunning woman. "You know a succubus can take ${hisA} lover's ideal form." ${HeA} runs ${hisA} hands down ${hisA} sides and to ${hisA} crotch.`);
	if (V.seeDicks !== 0) {
		r.push(`${HeA} begins rubbing ${hisA} clit as it steadily grows into a meaty cock. "Or an incubus, for the ladies." ${HeA} returns to ${hisA} previous form.`);
	}
	r.push(`"Says here it comes with 'bonus novice witch' too. Neat. What's this though? It looks like an appeara"`);
	App.Events.addParagraph(node, r);

	App.UI.DOM.appendNewElement("p", node, "...");

	App.UI.DOM.appendNewElement("p", node, "...");

	App.UI.DOM.appendNewElement("p", node, "..............................");

	App.UI.DOM.appendNewElement("p", node, `You tap at the screen; did ${heA} crash or something?`);

	App.UI.DOM.appendNewElement("p", node, "...");

	App.UI.DOM.appendNewElement("p", node, `After several minutes, ${heA} snaps back to life, with no mention about what exactly tied ${himA} up for so long.`);

	App.UI.DOM.appendNewElement("h3", node, `Personal assistant appearances:`);
	const choices = [];
	choices.push(new App.Events.Result(`Angel`, angel));
	choices.push(new App.Events.Result(`Cherub`, cherub));
	choices.push(new App.Events.Result(`Imp`, imp));
	choices.push(new App.Events.Result(`Succubus`, succubus));
	if (V.seeDicks !== 0) {
		choices.push(new App.Events.Result(`Incubus`, incubus));
	}
	choices.push(new App.Events.Result(`Witch`, witch));
	choices.push(new App.Events.Result(`_`, bugged));
	choices.push(new App.Events.Result(`Your current appearance will do`, current));

	App.Events.addResponses(node, choices);

	return node;

	/**
	 * @returns {string} flavor text for the assistants angel appearance
	 */
	function angel() {
		refreshArt();
		V.assistant.appearance = "angel";
		return `At your order, ${heA} installs the angel appearance. ${HeA} spreads ${hisA} wings and checks out ${hisA} new body, "Thanks, ${properTitle()}, but could I have a robe or something? I'm indecent!" ${HeA} blushes red. "You can always customize me from the arcology management menu," ${heA} adds.`;
	}

	/**
	 * @returns {string} flavor text for the assistants cherub appearance
	 */
	function cherub() {
		refreshArt();
		V.assistant.appearance = "cherub";
		return `At your order, ${heA} installs the cherub appearance. ${HeA} returns to ${hisA} youthful figure and sprouts ${hisA} wings. "This is awesome, little embarrassing though..." ${HeA} says, covering ${hisA} shame. "You can always customize me from the arcology management menu," ${heA} adds.`;
	}

	/**
	 * @returns {string} flavor text for the assistants imp appearance
	 */
	function imp() {
		refreshArt();
		V.assistant.appearance = "imp";
		return `At your order, ${heA} installs the imp appearance. ${HeA} returns to ${hisA} youthful figure and sprouts ${hisA} wings. "This is awesome! So, wanna fool around? Maybe go torment some slaves?" ${HeA} says, pulling out a pitchfork. "You can always customize me from the arcology management menu," ${heA} adds.`;
	}

	/**
	 * @returns {string} flavor text for the assistants succubus appearance
	 */
	function succubus() {
		refreshArt();
		V.assistant.appearance = "succubus";
		return `At your order, ${heA} installs the succubus appearance. ${HeA} promptly takes your breath away. "Thank you, ${properTitle()}. Now how shall I show you my appreciation..." ${HisA} avatar trails off while spreading ${hisA} legs and flashing you ${hisA} lovely pussy. "You can always customize me from the arcology management menu," ${heA} adds, with a hint of disapproval.`;
	}

	/**
	 * @returns {string} flavor text for the assistants incubus appearance
	 */
	function incubus() {
		refreshArt();
		V.assistant.appearance = "incubus";
		return `At your order, ${heA} installs the incubus appearance. ${HeA} becomes rather masculine, sporting a soft cock nearly as long as ${hisA} thigh. "Thank you, ${properTitle()}. This is going to be fun. Would you like a taste?" ${HeA} steadily becomes erect, a bead of precum forming at its tip. "You can always customize me from the arcology management menu," ${heA} adds, with a hint of disapproval.`;
	}

	/**
	 * @returns {string} flavor text for the assistants witch appearance
	 */
	function witch() {
		refreshArt();
		V.assistant.appearance = "witch";
		return `At your order, ${heA} installs the novice witch appearance. ${HeA} wraps a tightly clinging robe around ${hisA} voluptuous body and dons a wide-brimmed hat. "You can always customize me from the arcology management menu," ${heA} adds, pulling a book of lewd spells out.`;
	}

	/**
	 * @returns {string} flavor text for the assistants `bugged` appearance
	 */
	function bugged() {
		refreshArt();
		V.assistant.appearance = "ERROR_1606_APPEARANCE_FILE_CORRUPT";
		return `At your order, ${heA} installs the bugged appearance. ${HisA} body twists and contorts into an abomination of flesh and bone. It is honestly unsettling to look at. The thing morphs its body into a familiar female shape, though it is still off. Especially ${hisA} eyes; they seem soulless. "You can always customize me from the arcology management menu," ${heA} adds, in an ill pronounced mimicry of your voice.`;
	}

	/**
	 * @returns {string} flavor text for the assistant keeping their current appearance
	 */
	function current() {
		return `At your order, ${heA} maintains the ${V.assistant.appearance} appearance as ${hisA} avatar. "Yes, ${properTitle()}," ${heA} confirms, and adds "if you reconsider, I can be customized from the arcology management menu."`;
	}

	/**
	 * Refreshes the assistants art
	 */
	function refreshArt() {
		App.Events.refreshEventArt("assistant");
	}
};
