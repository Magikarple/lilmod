App.Events.conflictOptions = class conflictOptions extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.secExpEnabled > 0,
			() => V.SecExp.war.type
		];
	}

	execute(node) {
		V.nextButton = " ";
		App.UI.StoryCaption.encyclopedia = "Battles";
		const isBattle = V.SecExp.war.type.includes("Attack");
		let r = [];
		let options;
		let option;

		App.UI.DOM.appendNewElement("h1", node, `${V.SecExp.war.type}${isBattle ? ' Imminent' : '!'}`, ["monospace", "red"]);
		if (isBattle) {
			if (typeof V.SecExp.settings.unitDescriptions === "undefined") {
				V.SecExp.settings.unitDescriptions = 0;
			}
			if (!V.SecExp.war.type.includes("Major")) {
				if (V.SecExp.battles.victories + V.SecExp.battles.losses > 0) {
					r.push(`The ominous message dominates the screens of your office, and ${V.assistant.name} quickly gathers all information available to prepare for battle.`);
					if (V.SecExp.war.attacker.type === "raiders") {
						if (App.Mods.SecExp.battle.recon() >= 1) {
							r.push(`A disorganized horde of raiders is coming to your city. To such jackals your arcology surely looks like an appetizing morsel.`);
							r.push(`Fortunately you knew of their coming, thanks to your recon systems.`);
						} else {
							r.push(`Some of your citizens saw the disorganized horde of raiders coming towards the city and quickly reported it. To such jackals your arcology surely looks like an appetizing morsel.`);
						}
						const div = document.createElement("div");
						App.UI.DOM.makeElement("span", `Raiders`, ["strong"]);
						App.UI.DOM.makeElement("span", `are roaming gangs of bandits, preying on the vulnerable supply lines of Free Cities and old world nations. They are rarely equipped with decent armaments and even more rarely have any formal military training, but they make up for that with high mobility and numbers.`);
						r.push(div);
					} else if (V.SecExp.war.attacker.type === "free city") {
						if (App.Mods.SecExp.battle.recon() >= 1) {
							r.push(`A menacing column of slavers and hired mercenaries is coming to your city. Another free city is ready to use their best tools to hit a dangerous competitor where it hurts.`);
							r.push(`Fortunately you knew of their coming, thanks to your recon systems.`);
						} else {
							r.push(`Some of your citizens saw the menacing column of slavers and hired mercenaries and rushed to your office to bring the grim news. Another free city is ready to use their best tools to bring down a dangerous competitor.`);
						}
						const div = document.createElement("div");
						App.UI.DOM.makeElement("span", `Free City expeditions`, ["strong"]);
						App.UI.DOM.makeElement("span", `are usually composed of mercenaries hired to take down sensible supplies or infrastructure in order to damage the enemies of their contractor. They have on average good equipment and training, together with decent mobility, making them a formidable force. Their biggest weakness however is their relatively low numbers.`);
						r.push(div);
					} else if (V.SecExp.war.attacker.type === "freedom fighters") {
						if (App.Mods.SecExp.battle.recon() >= 1) {
							r.push(`A dangerous looking army of guerrillas is gathering just outside the arcology. Fanatics and idealists armed with dead men's words and hope, set on erasing your fledgling empire.`);
							r.push(`Fortunately you knew of their coming, thanks to your recon systems.`);
						} else {
							r.push(`Some of your citizens saw the dangerous looking army of guerrillas is gathering just outside the arcology. Fanatics and idealists armed with dead men's words and hope, set on erasing your fledgling empire.`);
						}
						const div = document.createElement("div");
						App.UI.DOM.makeElement("span", `Freedom Fighters`, ["strong"]);
						App.UI.DOM.makeElement("span", `are groups of individuals fighting to rid the planet of "evils" such as the Free Cities and their way of life. Lacking the strength to assault one directly they fight guerrilla style slowly starving to death their enemies. They are rarely well equipped, but with good training and mobility they are not a threat that can be taken lightly.`);
						r.push(div);
					} else if (V.SecExp.war.attacker.type === "old world") {
						if (App.Mods.SecExp.battle.recon() >= 1) {
							r.push(`A disciplined yet dusty, scruffy old world army is approaching the confines of your arcology. There's nothing better than a good war to unite the electorate and your arcology is just the perfect target.`);
							r.push(`Fortunately you knew of their coming, thanks to your recon systems.`);
						} else {
							r.push(`Some of your citizens saw the disciplined yet dusty, scruffy old world army is approaching the confines of your arcology. There's nothing better than a good war to unite the electorate and your arcology is just the perfect target.`);
						}
						const div = document.createElement("div");
						App.UI.DOM.makeElement("span", `Old world expeditions`, ["strong"]);
						App.UI.DOM.makeElement("span", `are usually sent to secure resources and trade routes for their nation or, more often, to provide their citizens with a bogeyman to be scared of. They are usually decently equipped and trained, which together with their generous numbers make them a tough nut to crack. However, they often lack in mobility.`);
						r.push(div);
					}
				} else {
					r.push(`Your assistant interrupted your rest to bring the grim news. You quickly rush to your console, where you can see one of the convoys supplying your arcology has been attacked and looted. It seems a group of desperate looking bandits decided it was a good idea to steal from you.`);
					r.push(`Due to their great wealth, Free Cities inevitably become tasty morsels for anyone able to field armed men. Considering the particular needs of arcologies their supply lines tend to be delicate lifelines, often preyed upon by those who stand to gain from the free city downfall.`);
				}
			} else {
				if (V.SecExp.battles.major > 0) {
					r.push(`The ominous message dominates the screens of your office, and ${V.assistant.name} quickly gathers all information available to prepare for the major battle ahead.`);
				} else {
					r.push(`Your assistant interrupted your rest to bring the grim news. You quickly rush to your console, where you can see the satellite images coming in of the force about to crash against your arcology. It's not the first time your armies fought for the survival of your empire, but this time it seems it will be a fight for life or death.`);
				}
				if (V.SecExp.war.attacker.type === "raiders") {
					if (App.Mods.SecExp.battle.recon() >= 1) {
						r.push(`A massive, disorganized horde of raiders is coming to your city. It seems a warlord of the wastelands amassed enough men to try and obtain a slice of territory of his own; if he's not defeated there won't be a tomorrow for the arcology.`);
						r.push(`Fortunately you knew of their coming, thanks to your recon systems.`);
					} else {
						r.push(`Some of your citizens saw the massive, disorganized horde of raiders coming towards the city and quickly reported it. It seems a warlord of the wastelands amassed enough men to try and obtain a slice of territory of his own; if he's not defeated there won't be a tomorrow for the arcology.`);
					}
					r.push(App.UI.DOM.makeElement("div", `Raiders are roaming gangs of bandits, preying on the vulnerable supply lines of Free Cities and old world nations. They are rarely equipped with decent armaments and even more rarely have any formal military training, but they make up for that with high mobility and numbers.`));
				} else if (V.SecExp.war.attacker.type === "free city") {
					if (App.Mods.SecExp.battle.recon() >= 1) {
						r.push(`A massive, menacing column of slavers and hired mercenaries is coming to your city. The quantity of money invested in this assault is staggering; it seems you made some very powerful enemies. If they're not defeated your story will end this day.`);
						r.push(`Fortunately you knew of their coming, thanks to your recon systems.`);
					} else {
						r.push(`Some of your citizens saw the massive, menacing column of slavers and hired mercenaries and rushed to your office to bring the grim news. The quantity of money invested in this assault is staggering; it seems you made some very powerful enemies. If they're not defeated your story will end this day.`);
					}
					r.push(App.UI.DOM.makeElement("div", `Free City expeditions are usually composed of mercenaries hired to take down sensible supplies or infrastructure in order to damage the enemies of their contractor. They have, on average, good equipment and training, together with decent mobility, making them a formidable force. Their biggest weakness, however, is their relatively low numbers.`));
				} else if (V.SecExp.war.attacker.type === "freedom fighters") {
					if (App.Mods.SecExp.battle.recon() >= 1) {
						r.push(`A massive, dangerous army of guerrillas is gathering just outside the arcology. A huge ocean of fanatics and idealists armed with dead men's words and hope, set on erasing your fledgling empire once and for all. And this time they won't stop until your body is burnt to a crisp.`);
						r.push(`Fortunately you knew of their coming, thanks to your recon systems.`);
					} else {
						r.push(`Some of your citizens saw the massive, dangerous army of guerrillas is gathering just outside the arcology. A huge ocean of fanatics and idealists armed with dead men's words and hope, set on erasing your fledgling empire once and for all. And this time they won't stop until your body is burnt to a crisp.`);
					}
					r.push(App.UI.DOM.makeElement("div", `Freedom Fighters are groups of individuals fighting to rid the planet of "evils" such as the Free Cities and their way of life. Lacking the strength to assault one directly, they fight guerrilla style, slowly starving to death their enemies. They are rarely well equipped, but with good training and mobility they are not a threat that can be taken lightly.`));
				} else if (V.SecExp.war.attacker.type === "old world") {
					if (App.Mods.SecExp.battle.recon() >= 1) {
						r.push(`A massive, disciplined old world army is approaching the confines of your arcology. It seems one of the nations of the old world is determined to put your arcology to rest once and for all or die trying.`);
						r.push(`Fortunately you knew of their coming, thanks to your recon systems.`);
					} else {
						r.push(`Some of your citizens saw the massive, disciplined old world army is approaching the confines of your arcology. It seems one of the nations of the old world is determined to put your arcology to rest once and for all or die trying.`);
					}
					r.push(App.UI.DOM.makeElement("div", `Old world expeditions are usually sent to secure resources and trade routes for their nation or, more often, to provide their citizens with a bogeyman to be scared of. They are usually decently equipped and trained, which together with their generous numbers make them a tough nut to crack. However, they often lack in mobility.`));
				}
			}
			App.Events.addParagraph(node, r);
			r = [];

			App.UI.DOM.appendNewElement("h3", node, `Recon: (AO: ${V.terrain})`);
			const estimatedMen = V.SecExp.war.estimatedMen;
			const expectedEquip = V.SecExp.war.expectedEquip;
			const isOceanic = V.terrain === "oceanic";
			r.push(`It seems your troops and your adversary will fight`);
			if (V.SecExp.war.terrain === "rural") {
				r.push(`in`, App.UI.DOM.makeElement("span", `the rural land`, ["strong"]), `surrounding the free city.`);
			} else if (V.SecExp.war.terrain === "urban") {
				r.push(`in the old`, App.UI.DOM.makeElement("span", `abandoned city`, ["strong"]), `surrounding the free city.`);
			} else if (V.SecExp.war.terrain === "hills") {
				r.push(`on`, App.UI.DOM.makeElement("span", `the hills`, ["strong"]), `around the free city.`);
			} else if (V.SecExp.war.terrain === "coast") {
				r.push(`along`, App.UI.DOM.makeElement("span", `the coast`, ["strong"]), `just outside the free city.`);
			} else if (V.SecExp.war.terrain === "outskirts") {
				r.push(`right against`, App.UI.DOM.makeElement("span", `the walls of the arcology.`, ["strong"]));
			} else if (V.SecExp.war.terrain === "mountains") {
				r.push(`in`, App.UI.DOM.makeElement("span", `the mountains`, ["strong"]), `overlooking the arcology.`);
			} else if (V.SecExp.war.terrain === "wasteland") {
				r.push(`in`, App.UI.DOM.makeElement("span", `the wastelands`, ["strong"]), `outside the free city territory.`);
			} else if (V.SecExp.war.terrain === "international waters") {
				r.push(`in`, App.UI.DOM.makeElement("span", `the water surrounding`, ["strong"]), `the free city.`);
			} else if (["a sunken ship", "an underwater cave"].includes(V.SecExp.war.terrain)) {
				r.push(`in`, App.UI.DOM.makeElement("span", `${V.SecExp.war.terrain}`, ["strong"]), `near the free city.`);
			} else if (V.SecExp.war.terrain === "error") {
				r.push(App.UI.DOM.makeElement("span", `Error: failed to assign terrain.`, ["red"]), `${V.SecExp.war.terrain} reads: ${V.SecExp.war.terrain}.`);
			} else {
				r.push(App.UI.DOM.makeElement("span", `Error: failed to read terrain.`, ["red"]), `${V.SecExp.war.terrain} reads: ${V.SecExp.war.terrain}.`);
			}
			if (App.Mods.SecExp.battle.recon() === 3) {
				r.push(`Your recon capabilities are top notch. The information collected will be most likely correct or very close to be so:`);
			} else if (App.Mods.SecExp.battle.recon() === 2) {
				r.push(`Your recon capabilities are decent. The information collected will be mostly close to the truth:`);
			} else if (App.Mods.SecExp.battle.recon() === 1) {
				r.push(`Your recon capabilities are fairly low. The information collected will be quite inaccurate:`);
			} else {
				r.push(`Your recon capabilities are almost non-existent. The information collected will be wild guesses at best:`);
			}
			r.push(`approximately`);
			r.push(App.UI.DOM.makeElement("span", `${estimatedMen} men`, ["strong"]));
			r.push(`are coming, they seem to be`);
			if (expectedEquip <= 0) {
				r.push(App.UI.DOM.makeElement("span", `poorly armed.`, ["strong"]));
				r.push(`Old rusty small arms are the norm with just a few barely working civilian ${isOceanic ? 'boats' : 'vehicles'}.`);
			} else if (expectedEquip === 1) {
				r.push(App.UI.DOM.makeElement("span", `lightly armed,`, ["strong"]));
				r.push(`mostly with small arms and some repurposed civilian ${isOceanic ? 'boats' : 'vehicles'} with scattered machine gun support. There's no sign of heavy ${isOceanic ? 'boats' : 'vehicles'}, ${isOceanic ? 'submarines' : 'artillery'} or aircraft.`);
			} else if (expectedEquip === 2) {
				r.push(App.UI.DOM.makeElement("span", `decently armed`, ["strong"]));
				r.push(`with good quality small arms, machine guns and a few mortars. There appear to be some heavy military ${isOceanic ? 'boats' : 'vehicles'} coming as well.`);
			} else if (expectedEquip === 3) {
				r.push(App.UI.DOM.makeElement("span", `well armed`, ["strong"]));
				r.push(`with high quality small arms, ${isOceanic ? 'spear men' : 'snipers'}, demolitions teams, heavy duty machine guns and mortars. Heavy military ${isOceanic ? 'boats' : 'vehicles'} are numerous and a few ${isOceanic ? 'submarines' : 'artillery pieces'} are accompanying the detachment.`);
			} else if (expectedEquip >= 4) {
				r.push(App.UI.DOM.makeElement("span", `extremely well armed`, ["strong"]));
				r.push(`with excellent small arms and specialized teams with heavy duty infantry support weapons. Heavy presence of armored military ${isOceanic ? 'boats' : 'vehicles'}, ${isOceanic ? 'submarines' : 'artillery pieces'} and even some attack helicopters.`);
			}
			App.Events.addParagraph(node, r);
			r = [];

			App.UI.DOM.appendNewElement("h2", node, `Battle plan`);
			if (V.SecExp.war.commander === "bodyguard" && V.BodyguardID === 0 || V.SecExp.war.commander === "headGirl" && V.HeadGirlID === 0) {
				App.UI.DOM.makeElement("span", `Chosen leader ${V.SecExp.war.commander} cannot be found, please select another.`, ["warning"]);
				V.SecExp.war.commander = "PC";
			}
			options = new App.UI.OptionsGroup(); // leader assignment
			option = options.addOption("Leader of the troops", "commander", V.SecExp.war)
				.addValueList([["You", "PC"], [V.assistant.name, "assistant"]]);

			if (V.BodyguardID !== 0 && V.SecExp.edicts.defense.slavesOfficers === 1) {
				option.addValue("Bodyguard", "Bodyguard");
			}
			if (V.HeadGirlID !== 0 && V.SecExp.edicts.defense.slavesOfficers === 1) {
				option.addValue("Head Girl", "HeadGirl");
			}
			if (V.SecExp.edicts.defense.militia >= 1) {
				option.addValue("Citizens' militia officers", "citizen");
			}
			if (V.mercenaries > 0) {
				option.addValue("Mercenary officers", "mercenary");
			}
			if (V.SF.Toggle && V.SF.Active >= 1 && V.SF.MercCon.CanAttend === -2) {
				option.addValue("Colonel", "colonel");
			}
			node.append(options.render());

			options = new App.UI.OptionsGroup();
			const tacticsDesc = new Map([
				["Bait and Bleed", `Combines bait and switch tactics with guerrilla style assaults, with the objective of slowly bleed the enemy.`],
				[`Guerrilla`, `Involves using terrain knowledge and small fast attacks to hinder and weaken the enemy.`],
				[`Choke Points`, `Involves using terrain knowledge and strong fortifications in order to stop the enemy on its track`],
				[`Interior Lines`, `Involves exploiting a defender's shorter logistics lines and redeployment times in order to keep the enemy pressured.`],
				[`Pincer Maneuver`, `Involves letting the enemy push back the center in order to envelop their formation.`],
				[`Defense In Depth`, `Involves letting the enemy gain terrain to gain tactical superiority by alternating between delaying actions and small counterattacks.`],
				[`Blitzkrieg`, `Involves breaking the front of the enemy with a fast armored force concentrated into a small area.`],
				[`Human Wave`, `Involves assaulting the enemy with large numbers of infantry to overwhelm their lines.`],
			]);

			App.UI.DOM.appendNewElement("h3", node, `Tactics`);
			const tactics = App.Data.SecExp.TerrainAndTactics.get(V.SecExp.war.terrain);
			for (const tactic in tactics) {
				option = options.addOption(tactic, "chosenTactic", V.SecExp.war).addValue("Select", tactic);
				const comment = document.createElement("span");
				if (tactics[tactic].atkMod > 0.1) {
					App.UI.DOM.appendNewElement("span", comment, "Atk+, ", ["green"]);
				} else if (tactics[tactic].atkMod < 0.1) {
					App.UI.DOM.appendNewElement("span", comment, "Atk-, ", ["red"]);
				}
				if (tactics[tactic].defMod > 0.1) {
					App.UI.DOM.appendNewElement("span", comment, "Def+, ", ["green"]);
				} else if (tactics[tactic].defMod < 0.1) {
					App.UI.DOM.appendNewElement("span", comment, "Def-, ", ["red"]);
				}
				comment.append(tacticsDesc.get(tactic));
				option.addComment(comment);
			}
			node.append(options.render());

			App.UI.DOM.appendNewElement("h3", node, `Troops`);
			if (V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.war.type.includes("Major")) {
				const capSF = capFirstChar(V.SF.Lower || "the Special Force");
				options = new App.UI.OptionsGroup();
				options.addOption(`The incoming attack's scale warrants deploying ${capSF}.`, "deploySF", V.SecExp.war)
					.addValue("Green light", 1).on().addValue("Red light", 0).off()
					.addComment(`Some upgrades will be able to support your troops even if ${capSF} is not deployed.`);
				node.append(options.render());
			}

			let linkArray = [];
			if (V.SecExp.battles.lastSelection.length > 0) {
				linkArray.push(
					App.UI.DOM.link(
						`Restore saved`,
						() => {
							V.SecExp.war.deployed = V.SecExp.battles.lastSelection;
							V.SecExp.war.saveValid = 1;
							V.SecExp.war.commander = V.SecExp.battles.saved.commander;
							V.SecExp.war.deploySF = V.SecExp.battles.saved.sfSupport;
							App.UI.reload();
						}
					)
				);
			} else {
				r.push(`Restore saved`);
			}
			if (V.SecExp.war.saveValid !== 1) {
				linkArray.push(
					App.UI.DOM.link(
						`Save current`,
						() => {
							V.SecExp.battles.lastSelection = V.SecExp.war.deployed;
							V.SecExp.war.saveValid = 1;
							V.SecExp.battles.saved.commander = V.SecExp.war.commander;
							V.SecExp.battles.saved.sfSupport = V.SecExp.war.deploySF;
							App.UI.reload();
						}
					)
				);
			} else {
				r.push(`Save current`);
			}
			if (App.Mods.SecExp.battle.deployedUnits() > 0) {
				linkArray.push(
					App.UI.DOM.link(
						`Clear current`,
						() => {
							V.SecExp.war.deployed = [];
							V.SecExp.war.saveValid = 0;
							App.UI.reload();
						}
					)
				);
			} else {
				r.push(`Clear current`);
			}
			if (V.SecExp.battles.lastSelection.length > 0) {
				linkArray.push(
					App.UI.DOM.link(
						`Clear saved`,
						() => {
							V.SecExp.battles.lastSelection = [];
							V.SecExp.war.saveValid = 0;
							App.UI.reload();
						}
					)
				);
			} else {
				r.push(`Clear saved`);
			}
			node.append("Roster: ", App.UI.DOM.generateLinksStrip(linkArray));

			// troop deployment
			if (App.Mods.SecExp.battle.deployableUnits() > 0) {
				r.push(`With your current readiness level you can send an additional`);
				r.push(App.UI.DOM.makeElement("span", String(App.Mods.SecExp.battle.deployableUnits()), ["strong"]));
				r.push(`units.`);
			}
		} else {
			const isSlaveRebellion = V.SecExp.war.type.includes("Slave");
			r.push(`In the end it happened, the ${isSlaveRebellion ? "slaves" : "citizens"}`);
			r.push(`of your arcology dared took up arms and rose up against their betters. Your penthouse is flooded with reports from all over the arcology of small skirmishes between the rioting slaves and the security forces. It appears <strong>${num(Math.trunc(V.SecExp.war.attacker.troops))}</strong> rebels are in the streets right now, building barricades and`);
			r.push(`${isSlaveRebellion ? 'freeing their peers' : 'destroying your property'}.`);
			if (V.SecExp.war.attacker.equip <= 0) {
				r.push(`They are <strong>poorly armed</strong>.`);
			} else if (V.SecExp.war.attacker.equip === 1) {
				r.push(`They are <strong>lightly armed</strong>.`);
			} else if (V.SecExp.war.attacker.equip === 2) {
				r.push(`They are <strong>decently armed</strong>.`);
			} else if (V.SecExp.war.attacker.equip === 3) {
				r.push(`They are <strong>well armed</strong>.`);
			} else if (V.SecExp.war.attacker.equip >= 4) {
				r.push(`They are <strong>extremely well armed</strong>.`);
			}
			if (V.SecExp.war.irregulars > 0) {
				r.push(`${num(Math.trunc(V.SecExp.war.irregulars))} of your citizens took up arms to defend their arcology owner.`);
			}

			const rebelling = [];
			const defending = [];
			if (V.arcologyUpgrade.drones === 1) {
				defending.push(`Your security drones`);
			}
			if (V.SF.Toggle && V.SF.Active >= 1) {
				let SFname = defending.length > 0 ? V.SF.Lower : capFirstChar(V.SF.Lower);
				defending.push(`${SFname}, ${num(V.SF.ArmySize)} strong`);
			}
			for (const squad of App.Mods.SecExp.unit.squads("human").filter(u => u.active)) {
				if (V.SecExp.war.rebellingID.includes(squad.ID)) {
					rebelling.push(squad.platoonName);
				} else {
					defending.push(squad.platoonName);
				}
			}

			if (V.SecExp.war.rebellingID.length > 0) {
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`${toSentence(rebelling)} betrayed you and joined the insurrection.`);
			}
			if (defending.length > 0) {
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`${toSentence(defending)} are called to defend the arcology from this menace.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`The confined spaces of the arcology and the number of vital yet delicate systems within its walls do not allow a lot of tactical flexibility. This will be a long and strenuous fight, street after street, barricade after barricade. In order to preserve the structural integrity of the building and the lives of our civilians, we will have to limit our firepower.`);
			App.Events.addParagraph(node, r);

			let text;
			if (V.SecExp.war.engageRule === 0) {
				text = `Your troops will use only nonlethal weapons or light firearms to limit to the maximum the collateral damage. This will however weaken our troops considerably.`;
			} else if (V.SecExp.war.engageRule === 1) {
				text = `Your troops will limit the use of explosives and heavy weapons to limit considerably the collateral damage. This will however weaken our troops.`;
			} else if (V.SecExp.war.engageRule === 2) {
				text = `Your troops will not limit their arsenal. This will put the structure and your citizens at risk, but our troops will be at full capacity.`;
			} else if (V.SecExp.war.engageRule === 3) {
				text = `Your troops will make use of the special weaponry, equipment and infrastructure developed by the riot control center to surgically eliminate rebels and dissidents with little to no collateral damage.`;
			}
			if (text) {
				App.UI.DOM.appendNewElement("div", node, text, ["note"]);
			}

			const engageRules = new Map([
				[0, `Only light firearms and nonlethal weapons`],
				[1, `No heavy ordnance`],
				[2, `Normal engagement rules`],
			]);
			if (V.SecExp.buildings.riotCenter && V.SecExp.buildings.riotCenter.advancedRiotEquip === 1) {
				engageRules.set(3, `Advanced riot protocol`);
			}

			for (const [value, text] of engageRules) {
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					text,
					() => {
						V.SecExp.war.engageRule = value;
						App.UI.reload();
					}
				));
			}

			App.Events.addParagraph(node, [`We can dedicate some of our forces to the protection of the vital parts of the arcology, doing so will prevent the failure of said systems, but will also take away strength from our assault.`]);
			const locations = new Map([
				["penthouseDefense", `penthouse`],
				["reactorDefense", `reactors`],
				["assistantDefense", `assistant's central CPU`],
				["waterwayDefense", `waterways`],
			]);
			const activeDefenses = Array.from(locations.keys()).filter(loc => V.SecExp.war[loc] === 1);
			if (activeDefenses.length > 0) {
				App.UI.DOM.appendNewElement("div", node, `Your troops will garrison the ${toSentence(activeDefenses.map(loc => locations.get(loc)))}.`, ["note"]);
			}
			for (const [loc, text] of locations) {
				const choices = [];
				choices.push(App.UI.DOM.link(
					`Garrison the ${text}`,
					() => {
						V.SecExp.war[loc] = 1;
						App.UI.reload();
					}
				));
				choices.push(App.UI.DOM.link(
					`Discard the order`,
					() => {
						delete V.SecExp.war[loc];
						App.UI.reload();
					}
				));
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.generateLinksStrip(choices));
			}
		}

		node.append(App.Mods.SecExp.unit.replenishAll());
		if (isBattle) {
			if (App.Mods.SecExp.battle.deployableUnits() === 0) {
				App.UI.DOM.appendNewElement("div", node, `Unit roster full.`, ["strong"]);
			}
			if (App.Mods.SecExp.unit.squads().length > 0) {
				options = new App.UI.OptionsGroup();
				options.addOption("Unit descriptions are", "unitDescriptions", V.SecExp.settings)
					.addValueList([["Abbreviated", 1], ["Summarized", 0]]);
				node.append(options.render());

				const tabBar = new App.UI.Tabs.TabBar("SecExpAttackOptions");
				for (const [u] of App.Mods.SecExp.unit.list()) {
					if (V.SecExp.units[u].squads.length > 0) {
						tabBar.addTab(capFirstChar(u), u, unitTab(u));
					}
				}
				node.append(tabBar.render());
			}
		}

		options = new App.UI.OptionsGroup();
		option = options.addCustomOption(isBattle ? "Send your orders" : "Actions");
		if (isBattle && App.Mods.SecExp.battle.deployedUnits() > 0 || !isBattle) {
			option.addButton(isBattle ? `Deploy troops` : `Proceed`, () => {
				V.SecExp.war.result = 4; // Sets to a value outside accepted range (-3, 3) to avoid evaluation problems
			}, `conflictHandler`);
		} else if (isBattle && App.Mods.SecExp.battle.deployedUnits() === 0) {
			App.UI.DOM.appendNewElement("div", node, `You need at least a unit in your roster to proceed to battle.`, ["red"]);
		}
		if (isBattle) {
			option.addButton(`Attempt to bribe (approximately ${cashFormat(Math.round(App.Mods.SecExp.battle.bribeCost() * (1 + either(-1, 1) * random(2) * 0.1)))})`, () => {
				V.SecExp.war.result = 1;
			}, `conflictHandler`);
		}
		option.addButton(`Surrender`, () => {
			V.SecExp.war.result = -1;
		}, "conflictReport");
		node.append(options.render());
		return node;

		// Battles
		/** Generates the deploy menu for the unit.
		 * @param {FC.SecExp.PlayerHumanUnitTypeMod} [type] the class of unit to be checked.
		 */
		function unitTab(type) {
			const frag = new DocumentFragment();
			for (const u of V.SecExp.units[type].squads.filter(s => s.active === 1 && s.troops > 0)) {
				App.UI.DOM.appendNewElement("div", frag, App.Mods.SecExp.unit.describe(u, true));
			}
			return frag;
		}
	}
};
