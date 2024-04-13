App.EndWeek.FSDevelopments = function() {
	const el = document.createElement("div");
	let r = [];
	const arc = V.arcologies[0];
	if (V.useTabs === 0) {
		App.UI.DOM.appendNewElement("h2", el, "Society");
	}

	const FSRepCreditsRep = [
		[7000, 11000, 15000],
		[6000, 9000, 12000, 15000],
		[6000, 9000, 12000, 14000, 16000],
		[6000, 9000, 11000, 13000, 15000, 17000]
	];
	const FSRepDescriptors = ["solid", "high", "remarkable", "great", "excellent", "unparalleled"];
	const ordinalNames = ["second", "third", "fourth", "fifth", "sixth", "seventh", "eighth"];
	if (FutureSocieties.availCredits() > 0) {
		r.push(`<span class="yellow">${arc.name}'s society is ready to begin accepting a new societal direction.</span>`);
	}

	if (V.FSAnnounced === 1 && V.FSGotRepCredits < V.FSCreditCount && V.rep >= FSRepCreditsRep[V.FSCreditCount - 4][V.FSGotRepCredits - 1]) {
		const descriptor = (V.FSGotRepCredits === 1) ? FSRepDescriptors[0] : FSRepDescriptors[Math.trunc(V.FSGotRepCredits / (V.FSCreditCount - 1) * FSRepDescriptors.length - 1)];
		let ordinalName = ordinalNames[V.FSGotRepCredits - 1];
		if (V.FSGotRepCredits === V.FSCreditCount - 1) {
			ordinalName += " and final";
		}
		r.push(`<span class="yellow">Your reputation is so ${descriptor} that ${arc.name}'s society is ready to begin accepting a ${ordinalName} societal direction.</span>`);
		V.FSGotRepCredits += 1;
	}

	/* Count adopted FS */
	const societies = FutureSocieties.activeCount(arc);

	/* Spending, terrain, rep effects */
	let broadProgress = 0;
	if (V.SF.Toggle && V.SF.Active >= 1 && V.SF.UC.Assign > 0) {
		r.push(`Assigning a ${(V.SF.UC.Assign === 1) ? `small` : `large`} portion of ${V.SF.Lower} to undercover work helps to advance your cultural goals.`);
		const value = (V.SF.UC.Assign === 1) ? V.SF.ArmySize * 0.05 : V.SF.ArmySize * 0.25;
		broadProgress += value / 100;
		App.Events.addNode(el, r, "div");
		r = [];
	}
	if (V.FSSpending > 1) {
		r.push(`Your <span class="yellowgreen">societal spending</span> helps forward your goals for the arcology's future.`);
		broadProgress += Math.trunc(V.FSSpending / (1000 - (500 * arc.FSEdoRevivalistLaw) - (250 * arc.FSArabianRevivalistLaw)));
	}
	const weeksOfFCTV = V.week - V.FCTV.weekEnabled;
	if (V.FCTV.receiver === 3) {
		r.push(`Your customized <span class="yellowgreen">FCTV programming</span> strongly influences your citizens, greatly helping define your arcology's culture.`);
		if (weeksOfFCTV > 29) {
			broadProgress += 3;
		} else if (weeksOfFCTV > 19) {
			broadProgress += 2;
		} else if (weeksOfFCTV > 4) {
			broadProgress += 1;
		}
	} else if (V.FCTV.receiver === 2) {
		r.push(`Your customized <span class="yellowgreen">FCTV programming</span> influences your citizens, helping define your arcology's culture.`);
		if (weeksOfFCTV > 34) {
			broadProgress += 3;
		} else if (weeksOfFCTV > 23) {
			broadProgress += 2;
		} else if (weeksOfFCTV > 8) {
			broadProgress += 1;
		}
	} else if (V.FCTV.receiver === 1) {
		r.push(`Your customized <span class="yellowgreen">FCTV programming</span> influences a small number of your citizens, slightly helping define your arcology's culture.`);
		if (weeksOfFCTV > 39) {
			broadProgress += 2;
		} else if (weeksOfFCTV > 24) {
			broadProgress += 1;
		}
	}

	const propagandaEffects = App.Mods.SecExp.propagandaEffects("social engineering");
	r.push(propagandaEffects.text);
	broadProgress += propagandaEffects.effect;

	if (V.terrain === "urban") {
		r.push(`The <span class="yellow">urban location</span> of the arcology naturally promotes cultural interchange, holding back ${arc.name}'s cultural independence.`);
		broadProgress -= 3;
	} else if (V.terrain === "rural") {
		r.push(`The <span class="yellow">rural location</span> of the arcology naturally limits cultural interchange, allowing ${arc.name} to slowly develop its own culture.`);
		broadProgress -= 2;
	} else if (V.terrain === "marine") {
		r.push(`The <span class="yellow">marine location</span> of the arcology strongly limits cultural interchange, allowing ${arc.name} to quickly develop its own culture.`);
		broadProgress -= 1;
	} else if (V.terrain === "ravine") {
		r.push(`The <span class="yellow">near subterranean location</span> of the arcology almost eliminates cultural interchange, allowing ${arc.name} to independently develop its culture.`);
	} else {
		r.push(`The <span class="yellow">oceanic location</span> of the arcology almost eliminates cultural interchange, allowing ${arc.name} to independently develop its culture.`);
	}
	if (V.rep < 3000 - V.enduringRep) {
		r.push(`<span class="red">Your weak reputation</span> reflects badly on your social projects.`);
		broadProgress -= 2;
	} else if (V.rep < 6000 - V.enduringRep) {
		r.push(`<span class="red">Your mediocre reputation</span> engenders skepticism towards your social development.`);
		broadProgress -= 1;
	} else if (V.rep < 9000 - V.enduringRep) {
		r.push(`<span class="yellow">Your reputation</span> is neither weak enough or strong enough to affect social development.`);
	} else if (V.rep < 12000 - V.enduringRep) {
		r.push(`<span class="positive">Your strong reputation</span> helps support social development.`);
		broadProgress += 1;
	} else if (V.rep < 16000 - V.enduringRep) {
		r.push(`<span class="positive">Your very strong reputation</span> increases acceptance of your social development.`);
		broadProgress += 2;
	} else {
		r.push(`<span class="positive">Your incredible reputation</span> encourages automatic acceptance of your social development.`);
		broadProgress += 4;
	}
	if (V.FSCreditCount === 4) {
		broadProgress += 1 - societies;
		switch (societies) {
			case 1:
				r.push(`Maintaining a single societal goal allows <span class="positive">very focused social engineering.</span>`);
				break;
			case 2:
				r.push(`Maintaining two societal goals allows <span class="positive">focused social engineering.</span>`);
				break;
			case 3:
				r.push(`Maintaining three societal goals requires <span class="yellow">broad social engineering.</span>`);
				break;
			case 4:
				r.push(`Maintaining four societal goals requires <span class="red">unfocused social engineering.</span>`);
				break;
		}
	} else if (V.FSCreditCount === 6) {
		broadProgress += 3 - societies;
		switch (societies) {
			case 1:
				r.push(`Maintaining a single societal goal allows <span class="positive">very focused social engineering.</span>`);
				break;
			case 2:
				r.push(`Maintaining two societal goals allows <span class="positive">focused social engineering.</span>`);
				break;
			case 3:
				r.push(`Maintaining three societal goals allows <span class="yellow">barely focusable social engineering.</span>`);
				break;
			case 4:
				r.push(`Maintaining four societal goals requires <span class="yellow">broad social engineering.</span>`);
				break;
			case 5:
				r.push(`Maintaining five societal goals requires <span class="red">unfocused social engineering.</span>`);
				break;
			case 6:
				r.push(`Maintaining six societal goals requires <span class="red">very unfocused social engineering.</span>`);
				break;
		}
	} else if (V.FSCreditCount === 7) {
		broadProgress += 3 - societies;
		switch (societies) {
			case 1:
				r.push(`Maintaining a single societal goal allows <span class="positive">very focused social engineering.</span>`);
				break;
			case 2:
				r.push(`Maintaining two societal goals allows <span class="positive">focused social engineering.</span>`);
				break;
			case 3:
				r.push(`Maintaining three societal goals allows <span class="yellow">barely focusable social engineering.</span>`);
				break;
			case 4:
				r.push(`Maintaining four societal goals requires <span class="yellow">broad social engineering.</span>`);
				break;
			case 5:
				r.push(`Maintaining five societal goals requires <span class="red">unfocused social engineering.</span>`);
				break;
			case 6:
				r.push(`Maintaining six societal goals requires <span class="red">very unfocused social engineering.</span>`);
				break;
			case 7:
				r.push(`Maintaining seven societal goals requires <span class="red">extremely unfocused social engineering.</span>`);
				break;
		}
	} else {
		broadProgress += 2 - societies;
		switch (societies) {
			case 1:
				r.push(`Maintaining a single societal goal allows <span class="positive">very focused social engineering.</span>`);
				break;
			case 2:
				r.push(`Maintaining two societal goals allows <span class="positive">focused social engineering.</span>`);
				break;
			case 3:
				r.push(`Maintaining three societal goals requires <span class="yellow">broad social engineering.</span>`);
				break;
			case 4:
				r.push(`Maintaining four societal goals requires <span class="red">unfocused social engineering.</span>`);
				break;
			case 5:
				r.push(`Maintaining five societal goals requires <span class="red">very unfocused social engineering.</span>`);
				break;
		}
	}
	/* closes FS count changes */
	if (broadProgress !== 0) {
		FutureSocieties.applyBroadProgress(0, broadProgress);
	}

	if (V.secExpEnabled > 0) {
		if (V.SecExp.edicts.slaveWatch === 1) {
			r.push(`The Slave Mistreatment Watch helps many slaves, easing your citizens into the paternalist ideals it represents.`);
			FutureSocieties.Change("Paternalist", 2);
		}

		if (V.SecExp.edicts.defense.noSubhumansInArmy === 1) {
			r.push(`Your army is free of subhumans, further cementing their lower status in the eyes of your citizens.`);
			FutureSocieties.Change("Subjugationist", 2);
		}

		if (V.SecExp.edicts.defense.pregExemption === 1) {
			r.push(`Pregnant citizens are allowed and encouraged to avoid military service, making their value evident to all citizens.`);
			FutureSocieties.Change("Repopulationist", 2);
		}

		if (V.SecExp.edicts.defense.eliteOfficers === 1) {
			r.push(`Purity in leadership is fundamental in your army, helping eugenics ideals spread in the populace.`);
			FutureSocieties.Change("Eugenics", 2);
		}

		if (V.SecExp.edicts.defense.liveTargets === 1) {
			r.push(`Disobedient slaves are used in shooting ranges and military drills as live targets, furthering degradationist ideals.`);
			FutureSocieties.Change("Degradationist", 2);
		}
	}

	/* Promenade effects */
	const cells = V.building.findCells(cell => cell instanceof App.Arcology.Cell.Shop && !["Brothel", "Club", "Shops"].includes(cell.type));
	for (const cell of cells) {
		r.push(`The ${cell.type} establishments on the Promenade help develop society.`);
		FutureSocieties.Change(cell.type, 4);
	}

	/* PA FS bonuses */
	if (V.policies.publicPA === 1 && V.assistant.appearance !== "normal") {
		let seed = 0;
		for (const FS of App.Data.FutureSociety.playerFSNames.filter(FS => FS !== "FSNull")) {
			if (arc[FS] !== null) {
				if (App.Data.Assistant.appearanceForFS.get(FS).includes(V.assistant.appearance)) {
					arc[FS] += 0.1 * V.FSSingleSlaveRep;
					seed = seed || 1;
				} else if (
					(V.assistant.fsAppearance === App.Data.FutureSociety.records[FS].adj.toLowerCase()) ||
					(V.assistant.fsAppearance === App.Data.FutureSociety.records[FS].noun.toLowerCase()) ||
					(FS === "FSHedonisticDecadence" && V.assistant.fsAppearance === "hedonistic decadence") ||
					(FS === "FSNeoImperialist" && V.assistant.fsAppearance === "neoimperialist")
				) {
					arc[FS] += 0.1 * V.FSSingleSlaveRep;
					seed = 2;
				}
			}
		}

		App.Events.addParagraph(el, r);
		r = [];
		const {hisA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
		r.push(`With ${hisA} ${V.assistant.appearance} appearance, ${V.assistant.name}'s public visibility meshes`);
		if (seed === 2) {
			r.push(`very well`);
		} else if (seed === 1) {
			r.push(`well`);
		}
		r.push(`with society.`);
	}

	/* Progress overflow into influence */
	FutureSocieties.overflowToInfluence(0);

	/* warm up policy influence */
	if (arc.FSEgyptianRevivalistIncestPolicy === 1 && arc.FSEgyptianRevivalistInterest < 26) {
		arc.FSEgyptianRevivalistInterest += arc.FSEgyptianRevivalistIncestPolicy;
	} else if (arc.FSEgyptianRevivalistIncestPolicy === 0 && arc.FSEgyptianRevivalistInterest > 0) {
		arc.FSEgyptianRevivalistInterest--;
	}

	if ((arc.FSRepopulationFocusPregPolicy === 1 || arc.FSRepopulationFocusMilfPolicy === 1) && arc.FSRepopulationFocusInterest < 26) {
		arc.FSRepopulationFocusInterest += arc.FSRepopulationFocusPregPolicy + arc.FSRepopulationFocusMilfPolicy;
		if (arc.FSEugenicsInterest > 0) {
			arc.FSEugenicsInterest--;
		}
	} else if (arc.FSRepopulationFocusPregPolicy === 0 && arc.FSRepopulationFocusMilfPolicy === 0 && arc.FSRepopulationFocusInterest > 0) {
		arc.FSRepopulationFocusInterest--;
	}

	if ([arc.FSSupremacistSMR, arc.FSSubjugationistSMR, arc.FSGenderFundamentalistSMR, arc.FSPaternalistSMR, arc.FSDegradationistSMR, arc.FSBodyPuristSMR, arc.FSTransformationFetishistSMR, arc.FSYouthPreferentialistSMR, arc.FSMaturityPreferentialistSMR, arc.FSSlimnessEnthusiastSMR, arc.FSAssetExpansionistSMR, arc.FSPastoralistSMR, arc.FSPhysicalIdealistSMR, arc.FSChattelReligionistSMR, arc.FSRomanRevivalistSMR, arc.FSAztecRevivalistSMR, arc.FSEgyptianRevivalistSMR, arc.FSEdoRevivalistSMR, arc.FSRepopulationFocusSMR, arc.FSRestartSMR, arc.FSHedonisticDecadenceSMR, arc.FSIntellectualDependencySMR, arc.FSSlaveProfessionalismSMR, arc.FSPetiteAdmirationSMR, arc.FSStatuesqueGlorificationSMR, arc.FSArabianRevivalistSMR, arc.FSChineseRevivalistSMR, arc.FSNeoImperialistSMR, arc.FSAntebellumRevivalistSMR, arc.FSGenderRadicalistSMR].some((SMR) => SMR > 0)) { // RadicalistSMR was unused since vanilla, but maybe some day....
		r.push(`The slave market regulations help ensure the arcology's slaves fit within its society.`);
	}

	for (const FS of App.Data.FutureSociety.playerFSNames.filter(FS => FS !== "FSNull")) {
		if (arc[FS] !== null) {
			const FSDecoration = `${FS}Decoration`;
			r.push(FutureSocieties.arcSupport(FS));
			if (arc[FS] < 0 && (FS !== "FSRestart" || arc.FSRestartDecoration !== 100)) {
				r.push(removeFS(FS));
			} else if (arc[FS] > arc[FSDecoration]) {
				arc[FS] = arc[FSDecoration];
			}
			if (arc[FSDecoration] < V.FSLockinLevel) {
				if (arc[FS] === arc[FSDecoration]) {
					r.push(`<span class="yellow">Your societal development in this direction is being limited by ${arc.name}'s lack of customization to support it.</span>`);
					V.FSReminder = 1;
				} else if (arc[`${FS}SMR`] === 1) {
					arc[FS] += 0.1 * V.FSSingleSlaveRep;
				}
			}
		}
	}

	App.UI.SlaveSummary.societyChanged();
	App.Events.addNode(el, r, "div");
	return el;

	function removeFS(FS) {
		FutureSocieties.remove(FS);
		return `<span class="red">Your future society project has failed:</span> your citizens were repelled from your idea more than they were attracted to it. <span class="yellow">You may select another option, or elect to try again.</span>`;
	}
};
