App.UI.Cheat.neighbors = function() {
	const el = new DocumentFragment();
	const r = [];

	if (V.arcologies.length > 1) {
		const neighbors = V.arcologies.length - 1;
		r.push(`Your arcology has ${neighbors} ${(neighbors === 1) ? `neighbor.` : `neighbors.`}`);
	} else {
		r.push(`Your arcology has no neighbors.`);
	}

	if (V.arcologies.length <= 8) {
		r.push(App.UI.DOM.link(
			"Add neighbor",
			() => {
				/** @type {FC.ArcologyDirection[]} */
				const compass = ["east", "north", "northeast", "northwest", "south", "southeast", "southwest", "west"];
				for (const arc of V.arcologies) {
					compass.delete(arc.direction);// remove directions already in use
				}
				const govTypes = [
					"a committee", "a corporation", "an individual", "an oligarchy", "direct democracy", "elected officials"
				];
				/** @type {FC.ArcologyState} */
				const activeArcology = {
					name: "Arcology X-", direction: compass.random(), government: govTypes.random(), honeymoon: 0, prosperity: 50, ownership: 50, minority: 20, PCminority: 0, demandFactor: 0, FSSupremacist:null, FSSupremacistRace: 0, FSSubjugationist:null, FSSubjugationistRace: 0, FSGenderRadicalist:null, FSGenderFundamentalist:null, FSPaternalist:null, FSDegradationist:null, FSIntellectualDependency:null, FSSlaveProfessionalism:null, FSBodyPurist:null, FSTransformationFetishist:null, FSYouthPreferentialist:null, FSMaturityPreferentialist:null, FSStatuesqueGlorification:null, FSPetiteAdmiration:null, FSSlimnessEnthusiast:null, FSAssetExpansionist:null, FSPastoralist:null, FSPhysicalIdealist:null, FSChattelReligionist:null, FSRomanRevivalist:null, FSAztecRevivalist:null, FSEgyptianRevivalist:null, FSEdoRevivalist:null, FSArabianRevivalist:null, FSChineseRevivalist:null, FSAntebellumRevivalist:null, FSNull:null, FSRepopulationFocus:null, FSHedonisticDecadence:null, FSCummunism:null, FSIncestFetishist:null, FSRestart:null, embargo: 1, embargoTarget: -1, influenceTarget: -1, influenceBonus: 0, rival: 0
				};

				if (V.arcologies.length < 4) {
					activeArcology.name += (V.arcologies.length); /* X-4 is reserved for player's arcology, so X-1 is available */
				} else {
					activeArcology.name += (V.arcologies.length + 1);
				}

				activeArcology.prosperity += random(-20, 20);
				activeArcology.ownership += random(-10, 0);
				activeArcology.minority += random(-5, 5);
				V.arcologies.push(activeArcology);
				passage();
			},
		));
	}
	App.Events.addParagraph(el, r);

	for (let i = 1; i < V.arcologies.length; i++) {
		const p = App.UI.DOM.appendNewElement("p", el);
		const linkArray = [];
		if (V.arcologies[i].direction !== 0) {
			p.append(App.UI.neighborDescription(i));
		}

		const cheatEdit = document.createElement("span");
		linkArray.push(cheatEdit);
		cheatEdit.append(App.UI.DOM.link(
			`Cheat Edit Arcology ${i} (${V.arcologies[i].name})`,
			() => {
				jQuery(cheatEdit).empty().append(App.UI.Cheat.arcology(i));
			}
		));

		if (i !== 0) {
			linkArray.push(App.UI.DOM.link(
				`Remove neighbor`,
				() => {
					V.arcologies.deleteAt(i);
					passage();
				},
			));
		}
		App.UI.DOM.appendNewElement("div", p, App.UI.DOM.generateLinksStrip(linkArray));
	}
	return el;
};
