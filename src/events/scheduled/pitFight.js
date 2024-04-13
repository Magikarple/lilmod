App.Events.SEPitFight = class SEPitFight extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!V.pit,
			() => V.pit.active,
			() => !V.pit.fought,
		];
	}

	/** @param {DocumentFragment} node */
	execute(node) {
		V.pit.fought = true;
		V.nextButton = " ";

		node.append(intro());

		const maxFights = 3 + (V.pit.fightsBase * 2);
		let completedFights = 0;
		let totalSuccess = 0;
		let lethalFights = 0;

		const fighterMap = new App.Facilities.Pit.Fights.FighterMap();

		const interactionSpan = document.createElement("span");
		interactionSpan.append(selectFight());
		node.append(interactionSpan);

		function selectFight() {
			const f = new DocumentFragment();

			App.Events.addParagraph(f, [`Select a fight. You have ${maxFights - completedFights} left.`]);

			const availableFights = App.Facilities.Pit.getFights()
				.filter(f => f.fightPrerequisites().every(p => p()) && f.castActors());

			const choices = [];
			for (const fight of availableFights) {
				App.UI.DOM.appendNewElement("div", f, fight.fightDescription());
				const div = document.createElement("div");
				div.classList.add("indent");
				div.append(App.UI.DOM.link("Fight!", () => runFight(fight)));
				div.append(" Impact: ", expectedImpact(fight.impact), " ");
				if (fight.lethal) {
					App.UI.DOM.appendNewElement("span", div, "Lethal", "warning");
				} else {
					App.UI.DOM.appendNewElement("span", div, "Safe", "green");
				}
				for (const si of fight.actors) {
					const count = fighterMap.fightCount(si);
					if (count > 0) {
						div.append(" ");
						const span = document.createElement("span");
						span.classList.add("orange");

						span.append(getSlave(si).slaveName, " already fought ");
						if (count > 1) {
							span.append(count + " times today.");
						} else {
							span.append("once today.");
						}

						div.append(span);
					}
				}
				f.append(div);
			}
			if (availableFights.length === 0) {
				App.UI.DOM.appendNewElement("div", f, "No fights available");
			}
			App.UI.DOM.appendNewElement("div", f, App.UI.DOM.link("Select different fighters", () => refreshInteractionSpan(selectFight())));
			App.UI.DOM.appendNewElement("div", f, App.UI.DOM.link("Head back to the penthouse and cancel all the remaining fights", () => refreshInteractionSpan(finishEvent())));
			App.Events.addResponses(f, choices);

			return f;
		}

		/**
		 * @param {DocumentFragment|HTMLElement} content
		 */
		function refreshInteractionSpan(content) {
			$(interactionSpan).empty().append(content);
		}

		/**
		 * @param {number} impact
		 * @returns {string}
		 */
		function expectedImpact(impact) {
			if (impact === 0) {
				return "None";
			} else if (impact < 0.8) {
				return "Small";
			} else if (impact < 1.5) {
				return "Average";
			} else if (impact < 8) {
				return "High";
			} else {
				return "Very High";
			}
		}

		/**
		 * @param {App.Facilities.Pit.Fights.BaseFight} fight
		 */
		function runFight(fight) {
			const f = new DocumentFragment();
			App.UI.DOM.appendNewElement("span", f, `The ${ordinalSuffixWords(completedFights + 1)} fight this day:`, "bold");
			const success = fight.execute(f, fighterMap);
			for (const si of fight.actors) {
				fighterMap.addFight(si);
			}
			const impact = success * fight.impact;
			const p = document.createElement("p");
			p.append(fightSuccess(success), " ", fightImpact(impact));
			f.append(p);
			totalSuccess += impact;
			completedFights++;
			if (fight.lethal) {
				lethalFights++;
			}

			if (completedFights < maxFights) {
				f.append(selectFight());
			} else {
				f.append(finishEvent());
			}

			// automatically scroll to the top of the fight.
			setTimeout(() => window.scrollTo(0, 0), 0);

			refreshInteractionSpan(f);
		}

		/**
		 * @param {number} success
		 * @returns {DocumentFragment}
		 */
		function fightSuccess(success) {
			const f = new DocumentFragment();

			if (success < 0) {
				f.append("The fight was an embarrassment.");
			} else if (success === 0) {
				f.append("The fight had no success.");
			} else if (success < 0.2) {
				f.append("The fight had little success.");
			} else if (success < 0.8) {
				f.append("The fight had normal success.");
			} else if (success <= 1) {
				f.append("The fight had good success.");
			} else {
				f.append("The fight had unexpectedly high success.");
			}

			return f;
		}

		/**
		 * @param {number} impact
		 * @returns {DocumentFragment}
		 */
		function fightImpact(impact) {
			const f = new DocumentFragment();

			impact = Math.abs(impact);

			if (impact === 0) {
				f.append("The fight had no impact on the total event.");
			} else if (impact < 0.2) {
				f.append("The fight had little impact on the total event.");
			} else if (impact < 0.8) {
				f.append("The fight had normal impact on the total event.");
			} else if (impact < 2) {
				f.append("The fight had high impact on the total event.");
			} else {
				f.append("The fight had extreme impact on the total event.");
			}

			return f;
		}

		/**
		 * @param {number} success
		 * @returns {string}
		 */
		function eventSuccess(success) {
			if (success < 0) {
				return "The event was an embarrassment.";
			} else if (success === 0) {
				return "The event had no success.";
			} else if (success < 0.2) {
				return "The event had little success.";
			} else if (success < 0.8) {
				return "The event had normal success.";
			} else if (success < 1.1) {
				return "The event had high success.";
			} else {
				return "The event had extremely high success.";
			}
		}

		function intro() {
			let r = [];
			if (V.pit.audience === "none") {
				r.push(`You are alone above the pit, left to watch them square off in private.`);
				return r[0];
			} else if (V.pit.audience === "free") {
				r.push(`Your guests line the rim of the pit, joking and betting.`);
			} else {
				r.push(`The attendees line the rim of the pit, betting and arguing.`);
			}

			if (V.pit.lethal === 1) {
				r.push("They expect to see a mix of lethal and nonlethal fights.");
			}

			if (FutureSocieties.isActive('FSRomanRevivalist')) {
				r.push(`They `, App.UI.DOM.makeElement("span", 'strongly approve', ["reputation",
					"inc"]), ` of your hosting combat between slaves; this advances ideas from antiquity about what public events should be.`);

				repX(10 * V.FSSingleSlaveRep * (V.arcologies[0].FSRomanRevivalist / V.FSLockinLevel), "pit");
				V.arcologies[0].FSRomanRevivalist += (0.2 * V.FSSingleSlaveRep);
			}

			if (V.pit.minimumHealth) {
				if (FutureSocieties.isActive('FSPaternalist')) {
					r.push(`They `, App.UI.DOM.makeElement("span", 'strongly approve', ["reputation",
						"inc"]), ` of restricting fights to healthy slaves; this advances ideas about slave well-being.`);

					repX(10 * V.FSSingleSlaveRep * (V.arcologies[0].FSPaternalist / V.FSLockinLevel), "pit");
					V.arcologies[0].FSPaternalist += (0.2 * V.FSSingleSlaveRep);
				} else if (FutureSocieties.isActive('FSDegradationist')) {
					r.push(`They `, App.UI.DOM.makeElement("span", 'strongly disapprove', ["reputation",
						"dec"]), ` of restricting fights to healthy slaves; this hampers ideas about slave degradation.`);

					repX(-10 * V.FSSingleSlaveRep * (V.arcologies[0].FSDegradationist / V.FSLockinLevel), "pit");
					V.arcologies[0].FSDegradationist -= (0.2 * V.FSSingleSlaveRep);
				}
			} else {
				if (FutureSocieties.isActive('FSPaternalist')) {
					r.push(`They `, App.UI.DOM.makeElement("span", 'strongly disapprove', ["reputation",
						"dec"]), ` of allowing ill slaves to fight; this hampers ideas about slave well-being.`);

					repX(-10 * V.FSSingleSlaveRep * (V.arcologies[0].FSPaternalist / V.FSLockinLevel), "pit");
					V.arcologies[0].FSPaternalist -= (0.2 * V.FSSingleSlaveRep);
				} else if (FutureSocieties.isActive('FSDegradationist')) {
					r.push(`They `, App.UI.DOM.makeElement("span", 'strongly approve', ["reputation",
						"inc"]), ` of allowing ill slaves to fight; this advances ideas about slave degradation.`);

					repX(10 * V.FSSingleSlaveRep * (V.arcologies[0].FSDegradationist / V.FSLockinLevel), "pit");
					V.arcologies[0].FSDegradationist += (0.2 * V.FSSingleSlaveRep);
				}
			}

			const f = new DocumentFragment();
			App.Events.addParagraph(f, r);
			return f;
		}

		function finishEvent() {
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();

			if (V.pit.audience === "none") {
				return new DocumentFragment();
			}

			const r = [];
			if (completedFights === 0) {
				r.push("Opening the arena without hosting fights <span class='reputation dec'>hurt your reputation.</span>");
				repX(-100 * maxFights, "pit");
				const f = new DocumentFragment();
				App.Events.addParagraph(f, r);
				return f;
			}

			if (completedFights < maxFights) {
				r.push("The audience is disappointed in the few fights this week.");
				totalSuccess -= (maxFights - completedFights) * 0.2;
			}

			if (V.pit.lethal === 1) {
				if (lethalFights === 0) {
					r.push("The audience expected to see blood and did not get any.");
					totalSuccess -= 0.1 * Math.abs(totalSuccess);
				} else if (lethalFights === completedFights) {
					r.push("The audience only saw blood today and is missing some other outcomes.");
					totalSuccess -= 0.1 * Math.abs(totalSuccess);
				}
			}

			const fighterRatio = fighterMap.fighterCount() / fighterMap.fightsCount();
			if (fighterRatio > 0.95) {
				r.push("The audience is <span class='green'>happy</span> seeing a lot of different fighters.");
				totalSuccess *= 1.1;
			} else if (fighterRatio > 0.8) {
				// no reaction
			} else {
				if (fighterRatio > 0.5) {
					r.push("The audience is <span class='red'>unhappy</span> seeing a lot the same fighters.");
				} else {
					r.push("Almost every fight had repeat fighters, <span class='red'>boring</span> the audience.");
				}
				totalSuccess *= 0.5 + 0.5 * (fighterRatio + 0.1);
			}

			totalSuccess *= 0.5 + 0.5 * V.pit.seats;
			if (V.pit.seats === 0) {
				r.push("The small visitors section <span class='red'>limited</span> the impact today's fights had.");
			} else if (V.pit.seats === 2) {
				r.push("The large visitors section <span class='green'>greatly enhanced</span> the impact today's fights had.");
			}

			const averageSuccess = totalSuccess / maxFights;
			r.push(eventSuccess(averageSuccess));

			r.push("At the end of the day you");

			const repGain = 100 * totalSuccess;
			const cashGain = 2000 * totalSuccess;
			const direction = totalSuccess > 0 ? "gained" : "lost";
			const cssDir = totalSuccess > 0 ? "inc" : "dec";
			if (V.pit.audience === "free") {
				r.push(`<span class='reputation ${cssDir}'>${direction} reputation.</span>`);
				repX(repGain, "pit");
			} else if (V.pit.audience === "paid") {
				r.push(`<span class='cash ${cssDir}'>${direction} credits.</span>`);
				cashX(cashGain, "pit");
			}

			console.log("PIT:");
			console.log("fighter count:", fighterMap.fighterCount(), "fight count:", fighterMap.fightsCount(), "ratio:", fighterRatio);
			console.log("total success:", totalSuccess, "avg:", averageSuccess);
			console.log("possible rep gain: ", repGain);
			console.log("possible cash gain:", cashGain);

			const f = new DocumentFragment();
			App.Events.addParagraph(f, r);
			return f;
		}
	}
};
