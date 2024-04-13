/** Reassign your agent's lover to the arcology run by your agent
 * @param {App.Entity.SlaveState} lover
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.agentCompany = function(lover) {
	const frag = document.createDocumentFragment();

	const agent = getSlave(lover.relationshipTarget);
	const neighborArcology = V.arcologies.find((a) => agent.ID === a.leaderID);
	const {he, him, his, himself} = getPronouns(lover);
	const {He2, His2, he2, him2, his2, wife2} = getPronouns(agent).appendSuffix('2');
	const {say} = getEnunciation(lover);
	const {say: say2} = getEnunciation(agent);

	// make the assignment
	assignJob(lover, Job.AGENTPARTNER);

	// clear rivalry if applicable
	const rival = getSlave(lover.rivalryTarget);
	if (rival) {
		rival.rivalry = 0;
		rival.rivalryTarget = 0;
	}
	lover.rivalry = 0;
	lover.rivalryTarget = 0;

	// output text
	let r = [];
	r.push(`Working in ${neighborArcology.name}'s penthouse office, ${agent.slaveName} gets a video call from you. Naturally, ${his2} personal assistant program has been instructed to give these the highest priority, and your face appears in front of ${him2} immediately. ${He2} greets you properly, and asks you what ${he2} can do to serve you. You tell ${him2} you're planning to send one of your slaves over to ${his2} arcology to assist ${him2}. Exchanges of this kind are neither unusual nor particularly interesting, so a slight look of perplexity clouds ${agent.slaveName}'s face as ${he2} wonders why this merits a personal call. Normally, ${S.HeadGirl ? S.HeadGirl.slaveName : V.assistant.name} would handle it with ${him2} directly.`);
	App.Events.addParagraph(frag, r);

	r = [];
	r.push(`${His2} question is answered when you bring ${contextualIntro(agent, lover)} in close, putting ${him} in ${agent.slaveName}'s view. ${agent.slaveName}'s ${App.Desc.eyesColor(agent)} fly open with pleased surprise, but before ${he2} can speak, ${lover.slaveName} goes first.`);

	if (!canTalk(lover)) {
		r.push(`Unable to speak ${himself}, ${he} simply makes a heart shape with ${his} ${hasBothArms(lover) ? "hands" : "hand"} in view of the video call, and blows ${his} ${lover.relationship === 4 ? "lover" : wife2} a kiss.`);
	} else {
		r.push(Spoken(lover, `"Hi ${lover.relationship === 4 ? 'lover' : 'sweetheart'},"`));
		r.push(`${he} ${say}s in a syrupy tone.`);
		r.push(Spoken(lover, `"Miss me?"`));
	}
	App.Events.addParagraph(frag, r);

	r = [];
	r.push(`${agent.slaveName} smiles back at ${him}, glowing with pleasure, and responds with exaggerated arousal.`);
	switch (agent.fetish) {
		case "submissive":
			r.push(Spoken(agent, `"Looking forward to sleeping ${hasBothArms(agent) ? "in your arms" : "with you"}, babe,"`), `the submissive`);
			break;
		case "cumslut":
			r.push(Spoken(agent, `"Can't wait to kiss you, babe,"`), `the orally fixated`);
			break;
		case "humiliation":
			r.push(Spoken(agent, `"Can't wait to take you right in the middle of the plaza here,"`), `the exhibitionist`);
			break;
		case "buttslut":
			r.push(Spoken(agent, `"I can't wait to fuck you in your hot little ass,"`), `the anally fixated`);
			break;
		case "boobs":
			r.push(Spoken(agent, `"Looking forward to feeling your breasts again,"`), `the boob-loving`);
			break;
		case "pregnancy":
			r.push(Spoken(agent, `"Can't wait to share all the pregnant girls here with you,"`), `the impregnation fetishist`);
			break;
		case "dom":
			r.push(Spoken(agent, `"Looking forward to shoving you facedown, bitch,"`), `the dominant`);
			break;
		case "sadist":
			r.push(Spoken(agent, `"Looking forward to making you bite the pillow again, bitch,"`), `the sadistic`);
			break;
		case "masochist":
			r.push(Spoken(agent, `"Can't wait to feel you hurt me again, babe,"`), `the masochistic`);
			break;
		default:
			r.push(Spoken(agent, `"Babe, I can't wait to ${hasAnyArms(agent) ? "give you a hug and" : ""} tell you about ${neighborArcology.name},"`), `the loving`);
	}
	r.push(`leader of an entire arcology ${say2}s.`);
	App.Events.addParagraph(frag, r);

	return frag;
};
