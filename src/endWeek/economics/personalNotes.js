/**
 * @returns {DocumentFragment}
 */
App.EndWeek.personalNotes = function() {
	const el = new DocumentFragment();
	let r = [];

	if (V.useTabs === 0) {
		App.UI.DOM.appendNewElement("h2", el, `Personal Notes`);
	}

	if (V.playerAging !== 0) {
		let birthday = `Your birthday is `;
		if (V.PC.birthWeek === 51) {
			birthday += `next week`;
			if (V.playerAging === 2) {
				birthday += `; you'll be turning ${V.PC.actualAge + 1}`;
			}
		} else {
			birthday += `in ${52 - V.PC.birthWeek} weeks`;
		}
		birthday += `.`;
		r.push(birthday);
	}

	App.Events.addParagraph(el, r);
	r = [];

	if (V.useTabs === 1) {
		App.UI.DOM.appendNewElement("h2", el, `Appearance`);
	}
	r.push(App.Desc.Player.pNotesBoobs());
	r.push(App.Desc.Player.pNotesBelly());
	r.push(App.Desc.Player.pNotesCrotch());
	r.push(App.Desc.Player.pNotesButt());

	App.Events.addParagraph(el, r);
	r = [];

	if (V.useTabs === 1) {
		App.UI.DOM.appendNewElement("h2", el, `Diet`);
	}
	r.push(App.EndWeek.Player.diet());

	App.Events.addParagraph(el, r);
	r = [];

	if (V.useTabs === 1) {
		App.UI.DOM.appendNewElement("h2", el, `Physical`);
	}

	r.push(App.EndWeek.Player.longTermEffects());
	r.push(App.EndWeek.Player.mobility());

	App.Events.addParagraph(el, r);
	r = [];

	if (V.useTabs === 1) {
		App.UI.DOM.appendNewElement("h2", el, `Drugs`);
	}
	r.push(App.EndWeek.Player.drugs());

	if (V.useTabs === 1) {
		App.UI.DOM.appendNewElement("h2", el, `Health`);
	}
	r.push(App.EndWeek.Player.health());

	App.Events.addParagraph(el, r);
	return el;
};
