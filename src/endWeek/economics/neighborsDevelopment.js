/**
 * @returns {HTMLElement}
 */
App.EndWeek.neighborsDevelopment = function() {
	const el = document.createElement("p");

	const averageProsperity = _.mean(V.arcologies.map(a => a.prosperity));
	const corpBonus = V.corp.Incorporated ? Math.trunc(1000 * Math.pow(App.Corporate.calculateValue(), 0.1)) : 0;
	let agentBonusValue = 0;

	if (V.useTabs === 0) {
		App.UI.DOM.appendNewElement("h2", el, `Arcologies in the Free City`);
	}

	for (let i = 0; i < V.arcologies.length; i++) {
		const arc = V.arcologies[i];
		const arcInfo = new App.Utils.Arcology(arc);
		const r = [];
		r.push(`<span class="bold">${arc.name},</span> your`);
		if (arc.direction === 0) {
			r.push(`arcology,`);
		} else {
			r.push(`neighbor to the ${arc.direction},`);
		}

		/* PROSPERITY */

		if (arc.direction !== 0) {
			switch (arc.government) {
				case "elected officials":
					arc.prosperity += random(-1, 1);
					break;
				case "a corporation":
				case "an oligarchy":
					arc.prosperity += random(-1, 2);
					break;
				case "a committee":
				case "your trustees":
					arc.prosperity += random(0, 2);
					break;
				case "an individual":
					arc.prosperity += random(0, 3);
					break;
				case "your agent":
					agentBonusValue = agentBonus(i);
					arc.prosperity += random(0, 3) + agentBonusValue;
					break;
				default:
					arc.prosperity += random(-1, 1);
			}
			arc.prosperity = Math.clamp(arc.prosperity, 1, 300);
		}

		if (arc.honeymoon > 0) {
			arc.honeymoon -= 1;
		}
		const agent = App.currentAgent(i);
		if (arc.government === "your agent") {
			const {He} = getPronouns(agent);
			const popup = App.UI.DOM.slaveDescriptionDialog(agent, SlaveFullName(agent) + ".");
			popup.classList.add("slave-name", "bold");
			r.push(`is being run by your agent`, popup);
			if (agent && agent.assignment !== Job.AGENT) {
				r.push(`<span class="red">BUG: ${agent} also was ${agent.assignment}!</span>`);
				assignJob(agent, Job.AGENT);
			}
			if (agentBonusValue > 0) {
				r.push(`<span class="prosperity inc">${He} does an excellent job this week.</span>`);
			}
			r.push(`The arcology`);
		} else if (arc.government === "your trustees") {
			r.push(`is being run by <span class="mediumseagreen">your trustees.</span> The arcology`);
		}

		let error = (arc.direction === 0 ? 5 : 10);
		error -= Math.min(2 * V.assistant.power, error);
		const prosperity = (Math.trunc((0.1 * arc.prosperity * random(100 - error, 100 + error)) / 100));
		let millions = ``;
		if (V.showNumbers !== 2) {
			if (V.showNumbers === 1 && prosperity > V.showNumbersMax) {
				millions = `m`;
			} else {
				millions = `million`;
			}
		} else {
			millions = `m`;
		}
		r.push(`has an estimated GSP of <span class="yellowgreen">${prosperity > 0 ? `${cashFormat(prosperity)}` : `less than ${num(1)} `}${millions},</span>`);
		if (arc.rival === 1 && arc.government !== "an individual") {
			r.push(`but it is undergoing some internal turmoil. <span class="red">Resentment that has been quietly building among the arcology's elite turns into open rebellion!</span>`);
			if (arc.PCminority > 0) {
				r.push(`<span class="red">Your ownership interest in ${arc.name} has been annulled!</span>`);
				arc.PCminority = 0;
			}
			r.push(`<span class="yellow">After a brief power struggle, it undergoes a change of government.</span>`);
			if (agent) {
				const {his} = getPronouns(agent);
				r.push(`<span class="deeppink">${agent.slaveName}</span> manages to escape with the help of a few loyal citizens and returns to you <span class="gold">fearing your displeasure at ${his} failure.</span>`);
				agent.trust -= 40;
				assignJob(agent, Job.REST); // this takes care of necessary cleanup for agent and agent companion (if any)
			}
			r.push(`A controlling interest has been taken by a single individual, leaving the arcology ruled like yours is.`);
			arc.government = "an individual";
			arc.ownership = random(51, 61);
			arc.minority = 100 - arc.ownership - random(1, 19);
			arc.honeymoon += 10;
		} else if ((arc.government !== "your trustees") && (arc.government !== "your agent") && (arc.ownership < arc.PCminority) && (arc.direction !== 0) && (arc.rival !== 1)) {
			r.push(`is undergoing a leadership struggle in which you are deeply concerned, since you now own more of it than its current leadership.`);
			if (random(0, 10) < arc.PCminority - arc.ownership) {
				r.push(`<span class="yellow">You successfully execute a hostile takeover and now control the arcology.</span> Trustees from among its leading citizens will exercise local control at your direction until you make other arrangements.`);
				arc.honeymoon += 10;
				arc.ownership = 0;
				arc.government = "your trustees";
			} else {
				r.push(`The current leadership has not yet exhausted its legalistic recourses, and retains control for the moment, causing considerable disruption.`);
				arc.prosperity -= 3;
			}
		} else if ((arc.ownership === 0) && (arc.PCminority > 0) && (arc.minority > arc.PCminority)) {
			r.push(`is undergoing a leadership struggle in which you are deeply concerned, since your ownership share has diminished to a dangerously low point.`);
			if (random(0, 10) < arc.minority - arc.PCminority) {
				r.push(`<span class="yellow">It undergoes a change of government.</span>`);
				arc.honeymoon += 10;
				arc.ownership = arc.minority;
				arc.minority = 0;
				switch (arc.government) {
					case "your trustees":
						if (random(0, 2) === 0) {
							r.push(`Its leading citizens form a corporation to run the arcology more efficiently.`);
							arc.government = "a corporation";
						} else {
							r.push(`A power struggle is won by a single individual, leaving the arcology ruled like yours is.`);
							arc.government = "an individual";
						}
						break;
					default:
						if (random(0, 2) === 0) {
							r.push(`The failed individual who led it is run out and replaced by direct democracy.`);
							arc.government = "direct democracy";
						} else {
							r.push(`The failed individual who led it is bought out by a corporation.`);
							arc.government = "a corporation";
						}
				}
			} else {
				r.push(`The arcology is paralyzed by dissension over how to respond.`);
				arc.prosperity -= 3;
			}
		} else if ((arc.ownership !== 0) && ((arc.ownership < arc.minority) || (arc.ownership < 10)) && (arc.direction !== 0) && (arc.rival !== 1)) {
			r.push(`is undergoing a leadership struggle, since its current government owns less of it than its largest rival for control.`);
			if (random(0, 10) < arc.minority - arc.ownership) {
				r.push(`<span class="yellow">It undergoes a change of government.</span>`);
				arc.honeymoon += 10;
				arc.ownership = arc.minority;
				arc.minority = 0;
				switch (arc.government) {
					case "elected officials":
						if (random(0, 2) === 0) {
							r.push(`Its elected officials surrender power to a small group of leading citizens.`);
							arc.government = "an oligarchy";
						} else {
							r.push(`Its elected officials are forced to give way to a committee of public safety.`);
							arc.government = "a committee";
						}
						break;
					case "a committee":
						if (random(0, 2) === 0) {
							r.push(`Its ruling committee forms it into a corporation in the hope this will spur growth.`);
							arc.government = "a corporation";
						} else {
							r.push(`A power struggle within its ruling committee leaves only a few leading citizens in power.`);
							arc.government = "an oligarchy";
						}
						break;
					case "an oligarchy":
						if (random(0, 2) === 0) {
							r.push(`Its leading citizens form a corporation to run the arcology more efficiently.`);
							arc.government = "a corporation";
						} else {
							r.push(`A power struggle is won by a single individual, leaving the arcology ruled like yours is.`);
							arc.government = "an individual";
						}
						break;
					case "an individual":
						if (random(0, 2) === 0) {
							r.push(`The failed individual who led it is run out and replaced by direct democracy.`);
							arc.government = "direct democracy";
						} else {
							r.push(`The failed individual who led it is bought out by a corporation.`);
							arc.government = "a corporation";
						}
						break;
					case "a corporation":
						if (random(0, 2) === 0) {
							r.push(`A power struggle within the corporation that runs it is won by a single person.`);
							arc.government = "an individual";
						} else {
							r.push(`The corporation that runs it collapses and is replaced by an oligarchy of rich shareholders.`);
							arc.government = "an oligarchy";
						}
						break;
					default:
						r.push(`Its direct democracy votes to empower some elected officials in the hope they can lead the arcology out of its problems.`);
						arc.government = "elected officials";
				}
				const decayedFSes = FutureSocieties.decay(i).map((fs) => FutureSocieties.displayName(fs));
				if (decayedFSes.length > 2) {
					r.push(`Its citizens take the opportunity to make radical social changes, <span class="cyan">purging the ${toSentence(decayedFSes)}</span> favored by the old government.`);
				} else if (decayedFSes.length === 2) {
					r.push(`Its citizens take the opportunity to make social changes, <span class="cyan">discarding the ${decayedFSes[0]} and ${decayedFSes[1]}</span> favored by the old government.`);
				} else if (decayedFSes.length === 1) {
					r.push(`Its citizens take the opportunity to make social change and <span class="cyan">abandon the ${decayedFSes[0]}</span> favored by the old government.`);
				}
			} else {
				r.push(`The arcology is paralyzed by internal dissension over how to respond.`);
				arc.prosperity -= 3;
			}
		} else if (arc.prosperity >= (arc.direction !== 0 ? 300 : V.AProsperityCap)) {
			r.push(`at the maximum possible prosperity.`);
		} else if (arc.prosperity > averageProsperity + 10) {
			r.push(`much more prosperous than the rest of the Free City, limiting its economic development.`);
			arc.prosperity--;
		} else if (arc.prosperity >= averageProsperity - 10) {
			r.push(`about as prosperous as the rest of the Free City.`);
		} else {
			if (arc.honeymoon > 0) {
				r.push(`far behind the rest of the Free City, making it a good investment and spurring its economic development. It remains in the <span class="lightgreen">honeymoon period</span> after its recent change of government, suppressing dissension and further encouraging growth.`);
				arc.prosperity += (arc.ownership !== 0 && arc.ownership < 40 ? 3 : 2);
			} else {
				r.push(`not as prosperous as the rest of the Free City, spurring its economic development.`);
				arc.prosperity++;
			}
		}

		/* NATURAL CHANGES TO MINORITY SHARE */
		if ((arc.government === "your agent") || (arc.government === "your trustees")) {
			arc.ownership = 0;
		}
		let owned = arc.minority + arc.ownership + arc.PCminority;
		if (arc.minority < arc.PCminority) {
			arc.minority = 0;
		} else if (owned >= 95) {
			arc.minority -= random(3, 5);
		} else if (arc.minority > (100 - owned) * 5) {
			arc.minority -= random(3, 5);
		} else if (arc.minority < (100 - owned) * 4) {
			if (arc.minority < 10) {
				if (arc.ownership + arc.PCminority <= 90) {
					arc.minority = 10;
				}
			} else {
				if (arc.ownership + arc.PCminority <= 98) {
					if (arc.prosperity < random(0, 300)) {
						arc.minority += random(0, 2);
					}
				}
			}
		}
		arc.minority = Math.max(arc.minority, 0); // minority share may have just dropped under 0

		if (arc.direction !== 0) {
			/* AI ARCOLOGY SHARE BUYING AND SELLING */
			const economicUncertainty = App.Utils.economicUncertainty(i);
			if (arc.government !== "your agent") {
				if (arc.government !== "your trustees") {
					if (arc.minority + arc.ownership + arc.PCminority < 100) {
						const prosperityDiff = arc.prosperity - averageProsperity;
						if (prosperityDiff > random(-10, 50)) {
							arc.ownership += 1;
							arc.prosperity -= 5;
							r.push(`Its leadership acquires an increased share of its ownership. This places its government in control of approximately <span class="orange">${Math.trunc(arc.ownership * economicUncertainty)}%</span> of the arcology${(arc.minority > 0) ? `, against its most prominent competition with a <span class="tan">${Math.trunc(arc.minority * economicUncertainty)}%</span> share`:``}.`);
						} else if (prosperityDiff < random(-50, 10)) {
							if (arc.ownership > 0) {
								if (arc.rival !== 1 || (arc.rival === 1 && arc.ownership > 51 && random(1, 2) === 1)) {
									arc.ownership -= 1;
									arc.prosperity += 5;
									r.push(`Its leadership sells off some of its ownership to stay afloat. This leaves its government in control of approximately <span class="orange">${Math.trunc(arc.ownership * economicUncertainty)}%</span> of the arcology${(arc.minority > 0) ? `, against its most prominent competition, with a <span class="tan">${Math.trunc(arc.minority * economicUncertainty)}%</span> share` : ``}.`);
								}
							}
						}
						if (arc.minority + arc.ownership > 100) {
							arc.minority = 100 - arc.ownership;
						}
					} else {
						if (((arc.ownership + arc.PCminority) >= 99) && arc.rival !== 1) {
							arc.ownership = 98 - arc.PCminority;
						} else {
							arc.minority = Math.clamp(98 - arc.ownership - arc.PCminority, 0, 98);
						}
					}
				}
			}

			/* AI ARCOLOGY RENTS TO PC */

			if (arc.PCminority > 0) {
				const rents = (arc.prosperity * arc.PCminority * 2) + random(1, 100);
				cashX(rents, "rents");
				r.push(`This week, you made <span class="yellowgreen">${cashFormat(rents)}</span> from your holdings in this arcology.`);
			}

			let cyberWarfareCatchChance = Math.max(5, Math.floor((((V.PC.skill.hacking + 100) / 200) ** 0.9) * 100));
			/* CYBER ECONOMIC WARFARE */
			if (arc.direction === V.arcologies[0].CyberEconomicTarget) {
				const weekModifier = Math.max(1, (100 - (V.week * 2)));
				arc.prosperity -= V.arcologies[0].CyberEconomic * 2;
				const warSpoils = Math.ceil(10 + Math.max(((100 / weekModifier) * arc.prosperity * V.arcologies[0].CyberEconomic), 0));
				arc.prosperity = Math.clamp(arc.prosperity, 1, 300);
				let redHanded = 0;
				if (random(0, 100) >= cyberWarfareCatchChance - (10 * V.arcologies[0].CyberEconomic)) {
					V.arcologies[0].prosperity -= V.arcologies[0].CyberEconomic * 3;
					redHanded = 1;
					repX(forceNeg(random(100, 200)), "war");
					if (V.secExpEnabled > 0) {
						App.Mods.SecExp.authorityX(random(-100, -500) * V.arcologies[0].CyberEconomic);
						V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow + random(10, 25), 0, 100);
					}
					V.arcologies[0].prosperity = Math.clamp(V.arcologies[0].prosperity, 1, V.AProsperityCap);
				}
				r.push(`You target ${arc.name} for <span class="yellow">digital economic warfare,</span> successfully raiding its coffers for <span class="yellowgreen">${cashFormat(warSpoils)}</span> this week.`);
				cashX(warSpoils, "war");
				if (redHanded === 1) {
					r.push(`A successful trace back to your arcology has exposed your actions, <span class="red">damaging your reputation</span> and <span class="red">scaring away potential investors.</span>`);
					if (V.secExpEnabled > 0) {
						r.push(`To add insult to injury, <span class="red">your authority has been weakened</span> and your actions have painted your arcology as a <span class="red">haven for crime.</span>`);
					}
				}
			} else if (arc.direction === V.arcologies[0].CyberReputationTarget) {
				/* REPUTATION WARFARE */
				arc.prosperity -= V.arcologies[0].CyberReputation;
				if (arc.rival !== 1) {
					arc.ownership -= V.arcologies[0].CyberReputation;
				}
				arc.prosperity = Math.clamp(arc.prosperity, 1, 300);
				arc.ownership = Math.clamp(arc.ownership, 0, 100);
				let redHanded = 0;
				if (random(0, 100) >= cyberWarfareCatchChance - (10 * V.arcologies[0].CyberReputation)) {
					V.arcologies[0].prosperity -= V.arcologies[0].CyberReputation * 3;
					redHanded = 1;
					repX(forceNeg(random(100, 200)), "war");
					if (V.secExpEnabled > 0) {
						App.Mods.SecExp.authorityX(random(-100, -500) * V.arcologies[0].CyberReputation);
						V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow + random(10, 25), 0, 100);
					}
					V.arcologies[0].prosperity = Math.clamp(V.arcologies[0].prosperity, 1, V.AProsperityCap);
				}
				r.push(`You target ${arc.name}'s leadership for <span class="yellow">character assassination</span> in an attempt to destabilize the arcology.`);
				if (redHanded === 1) {
					r.push(`A successful trace back to your arcology has exposed your actions, <span class="red">damaging your reputation</span> and <span class="red">scaring away potential investors.</span>`);
					if (V.secExpEnabled > 0) {
						r.push(`To add insult to injury, <span class="red">your authority has been weakened</span> and your actions have painted your arcology as a <span class="red">haven for crime.</span>`);
					}
				}
			}


			/* AI ARCOLOGY RENAMING */
			const conflict = V.arcologies.find(a => arc.direction !== a.direction && arc.name === a.name);
			if (conflict) {
				arc.name = "Arcology X-" + (i < 4 ? i : i + 1);
				/* X-4 is reserved for player's arcology, so X-1 is available */
				r.push(`It resumes its original name, <span class="bold">${arc.name},</span> since the arcology to the ${conflict.direction} of yours is also named ${conflict.name}.`);
			}
		}

		/* ECONOMIC WARFARE */

		const embargoer = V.arcologies.find(a => arc.direction === a.embargoTarget);
		if (embargoer) {
			arc.prosperity -= embargoer.embargo * 2;
			if (embargoer.direction !== 0) {
				embargoer.prosperity -= embargoer.embargo * 2;
			}
			arc.prosperity = Math.clamp(arc.prosperity, 1, 300);
			r.push(`${embargoer.name} targets ${arc.name} for <span class="red">economic warfare.</span>`);
		}

		/* FUTURE SOCIETY PROGRESS */

		const societiesAdopted = FutureSocieties.activeCount(arc);
		let efficiency = random(-3, 3);
		switch (arc.government) {
			case "elected officials":
				efficiency = random(-2, 2);
				break;
			case "a committee":
				efficiency = random(-1, 2);
				break;
			case "an oligarchy":
			case "your trustees":
				efficiency = random(-1, 3);
				break;
			case "an individual":
				efficiency = random(-1, 5);
				break;
			case "your agent":
				efficiency = agentBonusValue + random(-1, 1);
				break;
			case "a corporation":
				efficiency = random(1, 2);
				break;
		}

		if (arc.rival === 1) {
			efficiency += random(0, 2);
		}

		if (arc.direction !== 0) {
			FutureSocieties.applyBroadProgress(i, efficiency);
		}
		const passive = new App.Neighbor.PassiveFSInfluence(i);
		if (arcInfo.fsActive('FSSupremacist')) {
			r.push(passive.output("FSSupremacist"));
			if (arc.direction !== 0) {
				if (arc.FSSupremacist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Racial Supremacy for ${arc.FSSupremacistRace} people has reached stability and acceptance there. The arcology has been renamed`);
						switch (arc.FSSupremacistRace) {
							case "white":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistWhite);
								break;
							case "asian":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistAsian);
								break;
							case "latina":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistLatina);
								break;
							case "middle eastern":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistMiddleEastern);
								break;
							case "black":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistBlack);
								break;
							case "indo-aryan":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistIndoAryan);
								break;
							case "pacific islander":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistPacificIslander);
								break;
							case "malay":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistMalay);
								break;
							case "amerindian":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistAmerindian);
								break;
							case "southern european":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistSouthernEuropean);
								break;
							case "semitic":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistSemitic);
								break;
							default:
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SupremacistMixedRace);
						}
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSSupremacist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on ${arc.FSSupremacistRace} Supremacy.`);
					arc.FSSupremacist = null;
				}
			}
			if (arcInfo.fsActive('FSSupremacist')) {
				if (V.corp.Incorporated === 1) {
					if (!V.corp.SpecRaces.includes(arc.FSSupremacistRace)) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's racially inferior slaves, improving sales and helping social progress.`);
						arc.FSSupremacist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSSubjugationist')) {
			r.push(passive.output("FSSubjugationist"));
			if (arc.direction !== 0) {
				if (arc.FSSubjugationist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Racial Subjugationism of ${arc.FSSubjugationistRace} people has reached stability and acceptance there. The arcology has been renamed`);
						switch (arc.FSSubjugationistRace) {
							case "white":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistWhite);
								break;
							case "asian":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistAsian);
								break;
							case "latina":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistLatina);
								break;
							case "middle eastern":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistMiddleEastern);
								break;
							case "black":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistBlack);
								break;
							case "indo-aryan":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistIndoAryan);
								break;
							case "pacific islander":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistPacificIslander);
								break;
							case "malay":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistMalay);
								break;
							case "amerindian":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistAmerindian);
								break;
							case "southern european":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistSouthernEuropean);
								break;
							case "semitic":
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistSemitic);
								break;
							default:
								arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SubjugationistMixedRace);
						}
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSSubjugationist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on ${arc.FSSubjugationistRace} Subjugationism.`);
					arc.FSSubjugationist = null;
				}
			}
			if (arcInfo.fsActive('FSSubjugationist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecRaces.includes(arc.FSSubjugationistRace)) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's ${arc.FSSubjugationistRace} slaves, improving sales and helping social progress.`);
						arc.FSSubjugationist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSRepopulationFocus')) {
			r.push(passive.output("FSRepopulationFocus"));
			if (arc.direction !== 0) {
				if (arc.FSRepopulationFocus >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Repopulationism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.Repopulationist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSRepopulationFocus < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Repopulationism.`);
					arc.FSRepopulationFocus = null;
				}
			}
			if (arcInfo.fsActive('FSRepopulationFocus')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecMilk > 0) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's milky cows, improving sales and helping social progress.`);
						arc.FSRepopulationFocus += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecAge === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's youthful captures, improving sales and helping social progress.`);
						arc.FSRepopulationFocus += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecInjection === 5) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's milky cows, improving sales and helping social progress.`);
						arc.FSRepopulationFocus += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSRestart')) {
			r.push(passive.output("FSRestart"));
			if (arc.direction !== 0) {
				if (arc.FSRestart >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						arc.FSRestartResearch = 1;
						r.push(`Eugenics has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.Eugenics);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSRestart < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Eugenics.`);
					arc.FSRestart = null;
				}
			}
			if (arcInfo.fsActive('FSRestart')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecBalls === -1) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's neutered slavegirls, improving sales and helping social progress.`);
						arc.FSRestart += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecSexEd === 2) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's well trained toys, improving sales and helping social progress.`);
						arc.FSRestart += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecIntelligence === 3) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's smarter captures, improving sales and helping social progress.`);
						arc.FSRestart += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSGenderRadicalist')) {
			r.push(passive.output("FSGenderRadicalist"));
			if (arc.direction !== 0) {
				if (arc.FSGenderRadicalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						arc.FSGenderRadicalistResearch = 1;
						r.push(`Gender Radicalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.GenderRadicalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSGenderRadicalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Gender Radicalism.`);
					arc.FSGenderRadicalist = null;
				}
			}
			if (arcInfo.fsActive('FSGenderRadicalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecHormones > 0) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's hormonally treated slaves, improving sales and helping social progress.`);
						arc.FSGenderRadicalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
					if (V.corp.SpecPussy === 1 && V.corp.SpecDick === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's beautiful futanari, improving sales and helping social progress.`);
						arc.FSGenderRadicalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecBalls === -1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's clipped buttsluts, improving sales and helping social progress.`);
						arc.FSGenderRadicalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
					if ((V.corp.SpecGender === 2) || (V.seeDicks === 100)) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's feminized slaves, improving sales and helping social progress.`);
						arc.FSGenderRadicalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
			r.push(passive.output("FSGenderFundamentalist"));
			if (arc.direction !== 0) {
				if (arc.FSGenderFundamentalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Gender Fundamentalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.GenderFundamentalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSGenderFundamentalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Gender Fundamentalism.`);
					arc.FSGenderFundamentalist = null;
				}
			}
			if (arcInfo.fsActive('FSGenderFundamentalist')) {
				if (V.corp.Incorporated === 1) {
					if ((V.corp.SpecGender === 1) || (V.seeDicks === 0)) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's enslaved females, improving sales and helping social progress.`);
						arc.FSGenderFundamentalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSPaternalist')) {
			r.push(passive.output("FSPaternalist"));
			if (arc.direction !== 0) {
				if (arc.FSPaternalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Paternalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.Paternalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSPaternalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Paternalism.`);
					arc.FSPaternalist = null;
				}
			}
			if (arcInfo.fsActive('FSPaternalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecTrust > 3) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's well-treated companions, improving sales and helping social progress.`);
						arc.FSPaternalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
					if (V.corp.SpecCosmetics === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's meticulously beautified ladies, improving sales and helping social progress.`);
						arc.FSPaternalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecEducation > 0) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's educated ladies, improving sales and helping social progress.`);
						arc.FSPaternalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSDegradationist')) {
			r.push(passive.output("FSDegradationist"));
			if (arc.direction !== 0) {
				if (arc.FSDegradationist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Degradationism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.Degradationist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSDegradationist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Degradationism.`);
					arc.FSDegradationist = null;
				}
			}
			if (arcInfo.fsActive('FSDegradationist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecTrust < 3) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's thoroughly terrified slaves, improving sales and helping social progress.`);
						arc.FSDegradationist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
					if (V.corp.SpecIntelligence === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's idiotic sluts, improving sales and helping social progress.`);
						arc.FSDegradationist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecAmputee === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's human sex toys, improving sales and helping social progress.`);
						arc.FSDegradationist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSIntellectualDependency')) {
			r.push(passive.output("FSIntellectualDependency"));
			if (arc.direction !== 0) {
				if (arc.FSIntellectualDependency >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Intellectual Dependency has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.IntellectualDependency);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSIntellectualDependency < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Intellectual Dependency.`);
					arc.FSIntellectualDependency = null;
				}
			}
			if (arcInfo.fsActive('FSIntellectualDependency')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecIntelligence === 1) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's idiotic sluts, improving sales and helping social progress.`);
						arc.FSIntellectualDependency += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecEducation === 0) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's uneducated slaves, improving sales and helping social progress.`);
						arc.FSIntellectualDependency += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
			r.push(passive.output("FSSlaveProfessionalism"));
			if (arc.direction !== 0) {
				if (arc.FSSlaveProfessionalism >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						arc.FSSlaveProfessionalismResearch = 1;
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SlaveProfessionalism);
						r.push(`Slave Professionalism has reached stability and acceptance there. The arcology has been renamed <span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSSlaveProfessionalism < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Slave Professionalism.`);
					arc.FSSlaveProfessionalism = null;
				}
			}
			if (arcInfo.fsActive('FSSlaveProfessionalism')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecIntelligence === 3) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's smarter captures, improving sales and helping social progress.`);
						arc.FSSlaveProfessionalism += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					}
					if (V.corp.SpecEducation > 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's well educated ladies, improving sales and helping social progress.`);
						arc.FSSlaveProfessionalism += 2;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecEducation > 0) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's educated ladies, improving sales and helping social progress.`);
						arc.FSSlaveProfessionalism += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
					if (V.corp.SpecSexEd === 2) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's well trained toys, improving sales and helping social progress.`);
						arc.FSSlaveProfessionalism += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecAccent === 2) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's linguistically perfect slaves, improving sales and helping social progress.`);
						arc.FSSlaveProfessionalism += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSBodyPurist')) {
			r.push(passive.output("FSBodyPurist"));
			if (arc.direction !== 0) {
				if (arc.FSBodyPurist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.BodyPurist);
						r.push(`Body Purism has reached stability and acceptance there. The arcology has been renamed <span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSBodyPurist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Body Purism.`);
					arc.FSBodyPurist = null;
				}
			}
			if (arcInfo.fsActive('FSBodyPurist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecImplants === 0) {
						if (V.corp.SpecAmputee !== 1) {
							r.push(`It's a <span class="lightgreen">good market</span> for your corporation's implant-free slaves, improving sales and helping social progress.`);
							arc.FSBodyPurist += 1;
							App.Corporate.earnRevenue(corpBonus, 'foreign');
						}
					}
				}
			}
		} else if (arcInfo.fsActive('FSTransformationFetishist')) {
			r.push(passive.output("FSTransformationFetishist"));
			if (arc.direction !== 0) {
				if (arc.FSTransformationFetishist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						arc.FSTransformationFetishistResearch = 1;
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.TransformationFetishist);
						r.push(`Transformation Fetishism has reached stability and acceptance there. The arcology has been renamed <span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSTransformationFetishist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Transformation Fetishism.`);
					arc.FSTransformationFetishist = null;
				}
			}
			if (arcInfo.fsActive('FSTransformationFetishist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecImplants === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's implanted slaves, improving sales and helping social progress.`);
						arc.FSTransformationFetishist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecImplants === 2) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's absurdly implanted slaves, improving sales and helping social progress.`);
						arc.FSTransformationFetishist += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSYouthPreferentialist')) {
			r.push(passive.output("FSYouthPreferentialist"));
			if (arc.direction !== 0) {
				if (arc.FSYouthPreferentialist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Youth Preferentialism has reached stability and acceptance there. The arcology has been renamed`);
						if (V.pedo_mode === 1 || V.minimumSlaveAge < 6) {
							arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.YouthPreferentialistLow);
						} else if (V.minimumSlaveAge < 14) {
							arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.YouthPreferentialist.concat(App.Data.ArcologyNames.YouthPreferentialistLow));
						} else {
							arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.YouthPreferentialist);
						}
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
						arc.FSYouthPreferentialistResearch = 1;
					}
				} else if (arc.FSYouthPreferentialist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Youth Preferentialism.`);
					arc.FSYouthPreferentialist = null;
				}
			}
			if (arcInfo.fsActive('FSYouthPreferentialist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecAge === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's young slaves, improving sales and helping social progress.`);
						arc.FSYouthPreferentialist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
			r.push(passive.output("FSMaturityPreferentialist"));
			if (arc.direction !== 0) {
				if (arc.FSMaturityPreferentialist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Maturity Preferentialism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.MaturityPreferentialist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSMaturityPreferentialist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Maturity Preferentialism.`);
					arc.FSMaturityPreferentialist = null;
				}
			}
			if (arcInfo.fsActive('FSMaturityPreferentialist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecAge === 3) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's enslaved MILFs, improving sales and helping social progress.`);
						arc.FSMaturityPreferentialist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSPetiteAdmiration')) {
			r.push(passive.output("FSPetiteAdmiration"));
			if (arc.direction !== 0) {
				if (arc.FSPetiteAdmiration >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Petite Admiration has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.PetiteAdmiration);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSPetiteAdmiration < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Petite Admiration.`);
					arc.FSPetiteAdmiration = null;
				}
			}
			if (arcInfo.fsActive('FSPetiteAdmiration')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecHeight === 1) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's minuscule slaves, improving sales and helping social progress.`);
						arc.FSPetiteAdmiration += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecHeight === 2) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's shorter captures, improving sales and helping social progress.`);
						arc.FSPetiteAdmiration += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
			r.push(passive.output("FSStatuesqueGlorification"));
			if (arc.direction !== 0) {
				if (arc.FSStatuesqueGlorification >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Statuesque Glorification has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.StatuesqueGlorification);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSStatuesqueGlorification < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Statuesque Glorification.`);
					arc.FSStatuesqueGlorification = null;
				}
			}
			if (arcInfo.fsActive('FSStatuesqueGlorification')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecHeight === 5) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's gigantic slaves, improving sales and helping social progress.`);
						arc.FSStatuesqueGlorification += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecHeight === 4) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's taller captures, improving sales and helping social progress.`);
						arc.FSStatuesqueGlorification += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
			r.push(passive.output("FSSlimnessEnthusiast"));
			if (arc.direction !== 0) {
				if (arc.FSSlimnessEnthusiast >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Slimness Enthusiasm has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.SlimnessEnthusiast);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
						arc.FSSlimnessEnthusiastResearch = 1;
					}
				} else if (arc.FSSlimnessEnthusiast < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Slimness Enthusiasm.`);
					arc.FSSlimnessEnthusiast = null;
				}
			}
			if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecInjection < 2) {
						if (V.corp.SpecWeight < 3) {
							r.push(`It's a <span class="lightgreen">good market</span> for your corporation's trim slaves, improving sales and helping social progress.`);
							arc.FSSlimnessEnthusiast += 1;
							App.Corporate.earnRevenue(corpBonus, 'foreign');
						}
					}
				}
			}
		} else if (arcInfo.fsActive('FSAssetExpansionist')) {
			r.push(passive.output("FSAssetExpansionist"));
			if (arc.direction !== 0) {
				if (arc.FSAssetExpansionist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						arc.FSAssetExpansionistResearch = 1;
						r.push(`Asset Expansionism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.AssetExpansionist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSAssetExpansionist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Asset Expansionism.`);
					arc.FSAssetExpansionist = null;
				}
			}
			if (arcInfo.fsActive('FSAssetExpansionist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SPecInjection === 4) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's world-class tits and ass, improving sales and helping social progress.`);
						arc.FSAssetExpansionist += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecInjection === 5) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's hugely endowed cows, improving sales and helping social progress.`);
						arc.FSAssetExpansionist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SPecInjection === 3) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's stacked slaves, improving sales and helping social progress.`);
						arc.FSAssetExpansionist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSPastoralist')) {
			r.push(passive.output("FSPastoralist"));
			if (arc.direction !== 0) {
				if (arc.FSPastoralist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Pastoralism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.Pastoralist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSPastoralist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Pastoralism.`);
					arc.FSPastoralist = null;
				}
			}
			if (arcInfo.fsActive('FSPastoralist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecInjection === 5) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's world-class milk producers, improving sales and helping social progress.`);
						arc.FSPastoralist += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecMilk > 0) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's world-class milk producers, improving sales and helping social progress.`);
						arc.FSPastoralist += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSCummunism')) {
			r.push(passive.output("FSCummunism"));
			if (arc.direction !== 0) {
				if (arc.FSCummunism >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Cummunism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.Cummunism);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSCummunism < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Cummunism.`);
					arc.FSCummunism = null;
				}
			}
			if (arcInfo.fsActive('FSCummunism')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecInjection === 5) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's world-class cum producers, improving sales and helping social progress.`);
						arc.FSCummunism += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecHormones === 2) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's masculinized slaves, improving sales and helping social progress.`);
						arc.FSCummunism += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecDick === 1 && V.corp.SpecBalls === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's slaves standard dicks and balls, improving sales and helping social progress.`);
						arc.FSCummunism += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSPhysicalIdealist')) {
			r.push(passive.output("FSPhysicalIdealist"));
			if (arc.direction !== 0) {
				if (arc.FSPhysicalIdealist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Physical Idealism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.PhysicalIdealist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSPhysicalIdealist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Physical Idealism.`);
					arc.FSPhysicalIdealist = null;
				}
			}
			if (arcInfo.fsActive('FSPhysicalIdealist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecMuscle === 5) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's ripped chicks, improving sales and helping social progress.`);
						arc.FSPhysicalIdealist += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecMuscle === 4) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's toned ladies, improving sales and helping social progress.`);
						arc.FSPhysicalIdealist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					} else if (V.corp.SpecHeight > 3) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's tall ladies, improving sales and helping social progress.`);
						arc.FSPhysicalIdealist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
			r.push(passive.output("FSHedonisticDecadence"));
			if (arc.direction !== 0) {
				if (arc.FSHedonisticDecadence >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						arc.FSHedonisticDecadenceResearch = 1;
						r.push(`Decadent Hedonism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.HedonisticDecadence);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSHedonisticDecadence < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Decadent Hedonism.`);
					arc.FSHedonisticDecadence = null;
				}
			}
			if (arcInfo.fsActive('FSHedonisticDecadence')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecTrust > 3) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's well kept, happy slaves, improving sales and helping social progress.`);
						arc.FSHedonisticDecadence += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecSexEd === 2) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's skilled slaves, improving sales and helping social progress.`);
						arc.FSHedonisticDecadence += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSIncestFetishist')) {
			r.push(passive.output("FSIncestFetishist"));
			if (arc.direction !== 0) {
				if (arc.FSIncestFetishist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Incest Fetishism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.IncestFetishist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSIncestFetishist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Incest Fetishism.`);
					arc.FSIncestFetishist = null;
				}
			}
			if (arcInfo.fsActive('FSIncestFetishist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecAge === 3) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's motherly slaves, especially those that look like peoples mothers, improving sales and helping social progress.`);
						arc.FSIncestFetishist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSChattelReligionist')) {
			r.push(passive.output("FSChattelReligionist"));
			if (arc.direction !== 0) {
				if (arc.FSChattelReligionist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Chattel Religionism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.ChattelReligionist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSChattelReligionist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Chattel Religionism.`);
					arc.FSChattelReligionist = null;
				}
			}
			if (arcInfo.fsActive('FSChattelReligionist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecSexEd === 2) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's holy sex slaves, improving sales and helping social progress.`);
						arc.FSChattelReligionist += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecSexEd === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's aspiring sexual acolytes, improving sales and helping social progress.`);
						arc.FSChattelReligionist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}

		if (arcInfo.fsActive('FSRomanRevivalist')) {
			r.push(passive.output("FSRomanRevivalist"));
			if (arc.direction !== 0) {
				if (arc.FSRomanRevivalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Roman Revivalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.RomanRevivalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSRomanRevivalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Roman Revivalism.`);
					arc.FSRomanRevivalist = null;
				}
			}
			if (arcInfo.fsActive('FSRomanRevivalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecEducation > 0) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's properly educated slaves, improving sales and helping social progress.`);
						arc.FSRomanRevivalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSNeoImperialist')) {
			r.push(passive.output("FSNeoImperialist"));
			if (arc.direction !== 0) {
				if (arc.FSNeoImperialist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Neo-Imperialism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.NeoImperialist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSNeoImperialist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Neo-Imperialism.`);
					arc.FSNeoImperialist = null;
				}
			}
			if (arcInfo.fsActive('FSNeoImperialist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecEducation > 0) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's properly educated slaves, improving sales and helping advocate for a hierarchical Imperial society.`);
						arc.FSNeoImperialist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSAztecRevivalist')) {
			r.push(passive.output("FSAztecRevivalist"));
			if (arc.direction !== 0) {
				if (arc.FSAztecRevivalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Aztec Revivalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.AztecRevivalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSAztecRevivalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Aztec Revivalism.`);
					arc.FSAztecRevivalist = null;
				}
			}
			if (arcInfo.fsActive('FSAztecRevivalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecAccent === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's lovely mix of slave accents, improving sales and helping social progress.`);
						arc.FSAztecRevivalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
			r.push(passive.output("FSEgyptianRevivalist"));
			if (arc.direction !== 0) {
				if (arc.FSEgyptianRevivalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Egyptian Revivalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.EgyptianRevivalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSEgyptianRevivalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Egyptian Revivalism.`);
					arc.FSEgyptianRevivalist = null;
				}
			}
			if (arcInfo.fsActive('FSEgyptianRevivalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecAccent === 1) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's lovely mix of slave accents, improving sales and helping social progress.`);
						arc.FSEgyptianRevivalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSEdoRevivalist')) {
			r.push(passive.output("FSEdoRevivalist"));
			if (arc.direction !== 0) {
				if (arc.FSEdoRevivalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Edo Revivalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.EdoRevivalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSEdoRevivalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Edo Revivalism.`);
					arc.FSEdoRevivalist = null;
				}
			}
			if (arcInfo.fsActive('FSEdoRevivalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecAccent === 2) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's linguistically perfect slaves, improving sales and helping social progress.`);
						arc.FSEdoRevivalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSArabianRevivalist')) {
			r.push(passive.output("FSArabianRevivalist"));
			if (arc.direction !== 0) {
				if (arc.FSArabianRevivalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Arabian Revivalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.ArabianRevivalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSArabianRevivalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Arabian Revivalism.`);
					arc.FSArabianRevivalist = null;
				}
			}
			if (arcInfo.fsActive('FSArabianRevivalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecDevotion === 5) {
						r.push(`It's an <span class="lightgreen">excellent market</span> for your corporation's harem-ready devotees, improving sales and helping social progress.`);
						arc.FSArabianRevivalist += 2;
						App.Corporate.earnRevenue(corpBonus * 2, 'foreign');
					} else if (V.corp.SpecDevotion === 4) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's properly broken girls, improving sales and helping social progress.`);
						arc.FSArabianRevivalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSChineseRevivalist')) {
			r.push(passive.output("FSChineseRevivalist"));
			if (arc.direction !== 0) {
				if (arc.FSChineseRevivalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Chinese Revivalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.ChineseRevivalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSChineseRevivalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Chinese Revivalism.`);
					arc.FSChineseRevivalist = null;
				}
			}
			if (arcInfo.fsActive('FSChineseRevivalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecIntelligence === 3) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's intelligent Head Girl prospects, improving sales and helping social progress.`);
						arc.FSChineseRevivalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
			r.push(passive.output("FSAntebellumRevivalist"));
			if (arc.direction !== 0) {
				if (arc.FSAntebellumRevivalist >= V.FSLockinLevel) {
					if ((arc.name.indexOf("Arcology") !== -1) && (random(0, 2) === 0)) {
						r.push(`Antebellum Revivalism has reached stability and acceptance there. The arcology has been renamed`);
						arc.name = App.Neighbor.getUnusedName(App.Data.ArcologyNames.AntebellumRevivalist);
						r.push(`<span class="bold">${arc.name}</span> to mark the occasion.`);
					}
				} else if (arc.FSAntebellumRevivalist < 0) {
					r.push(`${arc.name} <span class="cyan">has given up</span> on Antebellum Revivalism.`);
					arc.FSAntebellumRevivalist = null;
				}
			}
			if (arcInfo.fsActive('FSAntebellumRevivalist')) {
				if (V.corp.Incorporated === 1) {
					if (V.corp.SpecEducation > 0) {
						r.push(`It's a <span class="lightgreen">good market</span> for your corporation's properly educated slaves.`);
						arc.FSAntebellumRevivalist += 1;
						App.Corporate.earnRevenue(corpBonus, 'foreign');
					}
				}
			}
		}
		FutureSocieties.overflowToInfluence(i);

		/* FUTURE SOCIETY ADOPTION */

		if (arc.direction !== 0) {
			if (societiesAdopted < V.FSCreditCount) {
				if ((arc.rival === 1) || (societiesAdopted < (arc.prosperity / 25) + (V.week / 25) - 3)) {
					r.push(neighborsFSadoption(i));
				}
			}
		}

		/* INFLUENCE RECEPTION */

		for (const arc2 of V.arcologies) {
			if (arc2.direction !== arc.direction) {
				if (arc2.influenceTarget === arc.direction) {
					arc2.influenceBonus = Math.clamp(arc2.influenceBonus, 0, V.FSLockinLevel);
					let appliedInfluenceBonus = Math.trunc(arc2.influenceBonus * 0.1);
					arc2.influenceBonus -= appliedInfluenceBonus * 2;
					if (V.policies.culturalOpenness === 1) {
						if ((arc.direction === 0) || (arc2.direction === 0)) {
							appliedInfluenceBonus *= 2;
						}
					} else if (V.policies.culturalOpenness === -1) {
						if ((arc.direction === 0) || (arc2.direction === 0)) {
							appliedInfluenceBonus /= 2;
						}
					}
					if (arc.ownership >= 100) {
						appliedInfluenceBonus /= 2;
					}

					let alignment = 0;
					let helping = [];
					let attacking = [];
					const dipFSes = FutureSocieties.diplomaticFSes(arc, arc2);
					for (const sharedFS of dipFSes.shared) {
						// Multiculturalism is not affected by influence.
						if (sharedFS !== "FSNull" && arc2[sharedFS] > 60) {
							arc[sharedFS] += Math.trunc((arc2[sharedFS] - 60) / 4) + appliedInfluenceBonus;
							if (arc[sharedFS] > V.FSLockinLevel) {
								alignment += 1;
							}
							if (sharedFS === "FSSubjugationist") {
								helping.push("racially aligned Subjugationism");
							} else if (sharedFS === "FSSupremacist") {
								helping.push("racially aligned Supremacism");
							} else {
								helping.push(FutureSocieties.displayName(sharedFS));
							}
						}
					}
					for (const [arcFS, arc2FS] of dipFSes.conflicting) {
						// Multiculturalism is not affected by influence.
						if (arcFS !== "FSNull" && arc2[arc2FS] > 60) {
							arc[arcFS] -= Math.trunc((arc2[arc2FS] - 60) / 4) + appliedInfluenceBonus;
							if (arcFS === "FSSubjugationist" && arc2FS === "FSSupremacist") {
								attacking.push("opposing Subjugationism");
							} else if (arcFS === "FSSupremacist" && arc2FS === "FSSubjugationist") {
								attacking.push("opposing Supremacism");
							} else if (arcFS === "FSSubjugationist" && arc2FS === "FSSubjugationist") {
								attacking.push("incompatible Subjugationism");
							} else if (arcFS === "FSSupremacist" && arc2FS === "FSSupremacist") {
								attacking.push("incompatible Supremacism");
							} else if (arcFS.includes("Revivalism")) {
								attacking.push("incompatible Revivalism");
							} else if (arcFS.includes("Imperialism")) {
								attacking.push("incompatible Imperialism");
							} else {
								attacking.push(FutureSocieties.displayName(arcFS));
							}
						}
					}

					if (helping.length === 0 && attacking.length === 0) {
						r.push(`<span class="bold">${arc2.name}</span> attempts to influence it, but has no significant impacts.`);
					} else if (helping.length === 0) {
						r.push(`<span class="bold">${arc2.name}</span>'s mature culture influences ${arc.name}, attacking its ${toSentence(attacking)}.`);
					} else if (attacking.length === 0) {
						r.push(`<span class="bold">${arc2.name}</span>'s mature culture influences ${arc.name}, helping to advance its ${toSentence(helping)}.`);
					} else {
						r.push(`<span class="bold">${arc2.name}</span>'s mature culture influences ${arc.name}, helping to advance its ${toSentence(helping)}, while attacking its ${toSentence(attacking)}.`);
					}

					if (appliedInfluenceBonus > 0) {
						if (appliedInfluenceBonus < 5) {
							r.push(`${arc2.name} is societally advanced, giving it extra influence.`);
						} else {
							r.push(`${arc2.name} is societally fanatical, lending it great influence.`);
						}
					}
					if (arc.ownership >= 100) {
						if (appliedInfluenceBonus > 0) {
							r.push(`However,`);
						}
						r.push(`${arc.name} is under completely unified control, making it resistant to change.`);
					}

					if (arc2.direction !== 0) {
						if (helping.length === 0 && attacking.length === 0) {
							r.push(`<span class="bold">${arc2.name}</span> is not satisfied with the impact its directed influence is having, and withdraws it with the intention of targeting it elsewhere.`);
							arc2.influenceTarget = -1;
						} else if (alignment >= 4) {
							r.push(`<span class="bold">${arc2.name}</span> is satisfied that its influence has brought ${arc.name} into alignment, and withdraws its direct influence with the intention of targeting it elsewhere.`);
							arc2.influenceTarget = -1;
						}
					}
				}
			}
		}

		if (arc.direction !== 0) {
			if (arc.influenceTarget === -1) {
				App.Neighbor.selectInfluenceTarget(i);
			}
			arc.prosperity = Math.clamp(arc.prosperity, 1, 300);
			arc.ownership = Math.clamp(arc.ownership, 0, 100);
			arc.PCminority = Math.clamp(arc.PCminority, 0, 100);
			arc.minority = Math.clamp(arc.minority, 0, 100);
			owned = arc.ownership + arc.PCminority + arc.minority;
			if (arc.government !== "your agent" && arc.government !== "your trustees" && arc.rival !== 1) {
				if (owned < 10) {
					arc.ownership += 10;
					/* Someone needs to own something */
				} else if (owned > 100) {
					arc.minority = Math.clamp(100 - arc.ownership - arc.PCminority, 0, 100);
					if (arc.ownership + arc.PCminority > 100) {
						arc.ownership = 100 - arc.PCminority;
					}
				}
			}
		}
		App.Events.addParagraph(el, r);
	}

	// PEACEKEEPERS
	if (V.plot && V.peacekeepers.state >= 2) {
		let prisoners;
		let r = [];
		if (V.peacekeepers.strength >= 50) {
			prisoners = Math.trunc(V.peacekeepers.attitude / 10) + random(0, 10);
			r.push(`General ${V.peacekeepers.generalName}'s little empire near the arcology`);
			if (V.peacekeepers.attitude >= 100) {
				r.push(`offers ${prisoners} menial slaves as tribute; having the area as an avowed client state <span class="green">improves your reputation.</span>`);
				V.peacekeepers.attitude = 100;
				repX(100, "peacekeepers");
			} else {
				r.push(`delivers ${prisoners} menial slaves to you in payment for your past support.`);
			}
			V.menials += prisoners;
		} else if (V.peacekeepers.strength < 0) {
			r.push(`<span class="yellow">The peacekeeping force led by General ${V.peacekeepers.generalName} in the troubled area near the Free City has been withdrawn.</span>`);
			if (V.peacekeepers.undermining) {
				r.push(`Your misinformation campaign against it in the old world media was successful. Before long, everyone in the Free City is confident that you're somehow responsible, <span class="green">greatly improving your reputation.</span>`);
				repX(2000, "peacekeepers");
			} else {
				r.push(`The cost was ultimately too high. The time when old world countries could afford to waste billions on military adventurism is gone. It will not return.`);
			}
			V.peacekeepers.state = 0;
		} else {
			r.push(`There's a peacekeeping force led by General ${V.peacekeepers.generalName} in the troubled area near the Free City.`);
			if (V.peacekeepers.undermining) {
				r.push(`You're paying for a media misinformation campaign in the old world country that sent him. It`);
				V.peacekeepers.strength -= V.peacekeepers.undermining / 10000;
				if (V.peacekeepers.strength < 10) {
					r.push(`has had a significant impact; one of the nation's two major political parties now favors withdrawing the peacekeepers.`);
				} else {
					r.push(`has not had a significant impact yet; only a few fringe figures are arguing against the mission.`);
				}
			}
			r.push(`Unfortunately, the presence of so much old world military power near the Free City causes <span class="red">public concern.</span>`);
			repX(-100, "peacekeepers");
		}
		App.Events.addParagraph(el, r);
	}
	return el;

	/**
	 *
	 * @param {number} i
	 */
	function neighborsFSadoption(i) {
		const arc = V.arcologies[i];
		const el = document.createElement("p");
		let r = [];
		const {heU, girlU} = getNonlocalPronouns(0).appendSuffix('U');

		r.push(`<span class="bold">${arc.name},</span> your`);
		if (arc.direction === 0) {
			r.push(`arcology,`);
		} else {
			r.push(`neighbor to the ${arc.direction},`);
		}
		r.push(`is prosperous enough that`);
		switch (arc.government) {
			case "elected officials":
				r.push(`its elected officials consider`);
				break;
			case "a committee":
				r.push(`the committee that controls it considers`);
				break;
			case "an oligarchy":
			case "your trustees":
				r.push(`its leading citizens consider`);
				break;
			case "an individual":
				r.push(`its owner and its citizens consider`);
				break;
			case "your agent":
				r.push(`<span class="deeppink">your agent</span> and its citizens consider`);
				break;
			case "a corporation":
				r.push(`its board of directors considers`);
				break;
			default:
				r.push(`its citizens consider`);
		}
		r.push(`societal development.`);

		const validFSes = FutureSocieties.validAdoptions(i);

		fsAdoption();

		App.Events.addNode(el, r);
		return el;

		function fsAdoption() {
			/** Adopt an FS without checking validity, forcibly abandoning any opposing FSes
			 * For use only on the first rival FS; subsequent FSes should check validity normally
			 * @param {FC.FutureSociety} adoptFS */
			function adoptRivalFS(adoptFS) {
				// clear any opposing FSes
				const group = App.Data.FutureSociety.mutexGroups.find(g => g.includes(adoptFS));
				if (group && group.length > 1) {
					for (const opposing of group) {
						arc[opposing] = null;
					}
				}
				// and initialize the target FS at 5
				arc[adoptFS] = 5;
			}

			if (arc.rival === 1) {
				if (arc.government === "an individual") {
					if (!V.rival.FS.adopted) {
						V.rival.FS.adopted = 1;
						const desc = "Its owner is";
						switch (V.rival.FS.name) {
							case "Racial Subjugationism":
								r.push(`${desc} preoccupied by belief in the superiority of the ${V.arcologies[0].FSSubjugationistRace} race, leading the arcology to <span class="yellow">adopt ${V.arcologies[0].FSSubjugationistRace} Supremacy.</span>`);
								adoptRivalFS("FSSupremacist");
								arc.FSSupremacistRace = V.arcologies[0].FSSubjugationistRace;
								return;
							case "Racial Supremacism":
								r.push(`${desc} preoccupied by a racial animus towards ${V.arcologies[0].FSSupremacistRace} people, leaving the arcology to <span class="yellow">adopt ${V.arcologies[0].FSSupremacistRace} Subjugation.</span>`);
								adoptRivalFS("FSSubjugationist");
								arc.FSSubjugationistRace = V.arcologies[0].FSSupremacistRace;
								return;
							case "Repopulation Focus":
								r.push(`${desc} obsessed with building a new society based on its Societal Elite, leading the arcology to <span class="yellow">adopt Eugenics.</span>`);
								adoptRivalFS("FSRestart");
								return;
							case "Eugenics":
								r.push(`${desc} obsessed with breeding a new society, leading the arcology to <span class="yellow">adopt Repopulationism.</span>`);
								adoptRivalFS("FSRepopulationFocus");
								return;
							case "Gender Radicalism":
								r.push(`${desc} enthusiastic about knocking slaves up, leading the arcology to <span class="yellow">adopt Gender Fundamentalism.</span>`);
								adoptRivalFS("FSGenderFundamentalist");
								return;
							case "Gender Fundamentalism":
								r.push(`${desc} enthusiastic about fucking slaves in the butt, leading the arcology to <span class="yellow">adopt Gender Radicalism.</span>`);
								adoptRivalFS("FSGenderRadicalist");
								return;
							case "Paternalism":
								r.push(`${desc} partial to screaming and struggling, leading the arcology to <span class="yellow">adopt Degradationism.</span>`);
								adoptRivalFS("FSDegradationist");
								return;
							case "Degradationism":
								r.push(`${desc} devoted to their slaves' advancement, leading the arcology to <span class="yellow">adopt Paternalism.</span>`);
								adoptRivalFS("FSPaternalist");
								return;
							case "Intellectual Dependency":
								r.push(`${desc} obsessed with crafting the perfect slave, leading the arcology to <span class="yellow">adopt Slave Professionalism.</span>`);
								adoptRivalFS("FSSlaveProfessionalism");
								return;
							case "Slave Professionalism":
								r.push(`${desc} worried that they may one day be outsmarted by their chattel, leading the arcology to <span class="yellow">adopt Intellectual Dependency.</span>`);
								adoptRivalFS("FSIntellectualDependency");
								return;
							case "Body Purism":
								r.push(`${desc} fascinated with extreme surgery, leading the arcology to <span class="yellow">adopt Transformation Fetishism.</span>`);
								adoptRivalFS("FSTransformationFetishist");
								return;
							case "Transformation Fetishism":
								r.push(`${desc} concerned by trends in their slaves' health, leading the arcology to <span class="yellow">adopt Body Purism.</span>`);
								adoptRivalFS("FSBodyPurist");
								return;
							case "Youth Preferentialism":
								r.push(`${desc} devoted to time in bed with their MILF slaves, leading the arcology to <span class="yellow">adopt Maturity Preferentialism.</span>`);
								adoptRivalFS("FSMaturityPreferentialist");
								return;
							case "Maturity Preferentialism":
								r.push(`${desc} devoted to fucking nubile young slaves, leading the arcology to <span class="yellow">adopt Youth Preferentialism.</span>`);
								adoptRivalFS("FSYouthPreferentialist");
								return;
							case "Petite Admiration":
								r.push(`${desc} convinced that tall equals beauty, leading the arcology to <span class="yellow">adopt Statuesque Glorification.</span>`);
								adoptRivalFS("FSStatuesqueGlorification");
								return;
							case "Statuesque Glorification":
								r.push(`${desc} enamored by those shorter than them, leading the arcology to <span class="yellow">adopt Petite Admiration.</span>`);
								adoptRivalFS("FSPetiteAdmiration");
								return;
							case "Slimness Enthusiasm":
								r.push(`${desc} obsessed with boobs, the bigger, the better, leading the arcology to <span class="yellow">adopt Asset Expansionism.</span>`);
								adoptRivalFS("FSAssetExpansionist");
								return;
							case "Asset Expansionism":
								r.push(`${desc} partial to a slim slave with tight holes, leading the arcology to <span class="yellow">adopt Slimness Enthusiasm.</span>`);
								adoptRivalFS("FSSlimnessEnthusiast");
								return;
							case "Pastoralism":
								r.push(`${desc} obsessed with cum, leading the arcology to <span class="yellow">adopt Cummunism.</span>`);
								adoptRivalFS("FSCummunism");
								return;
							case "Cummunism":
								r.push(`${desc} addicted to breast milk straight from the nipple, leading the arcology to <span class="yellow">adopt Pastoralism.</span>`);
								adoptRivalFS("FSPastoralist");
								return;
							case "Hedonistic Decadence":
								r.push(`${desc} devoted to spending time in the gym, leading the arcology to <span class="yellow">adopt Physical Idealism.</span>`);
								adoptRivalFS("FSPhysicalIdealist");
								return;
							case "Physical Idealism":
								r.push(`${desc} addicted to pleasure, leading the arcology to <span class="yellow">adopt Decadent Hedonism.</span>`);
								adoptRivalFS("FSHedonisticDecadence");
								return;
							case "Chattel Religionism":
								r.push(`${desc} open minded, leading the arcology to <span class="yellow">permit cultural freedom.</span>`);
								adoptRivalFS("FSNull");
								return;
							case "Multiculturalism":
								r.push(`${desc} devoutly religious, and interested in a reformation, leading the arcology to <span class="yellow">adopt Chattel Religionism.</span>`);
								adoptRivalFS("FSChattelReligionist");
								return;
							case "Roman Revivalism":
								r.push(`${desc} fascinated by ancient Aztec history, leading the arcology to <span class="yellow">adopt Aztec Revivalism.</span>`);
								adoptRivalFS("FSAztecRevivalist");
								return;
							case "Neo-Imperialism":
							case "Egyptian Revivalism":
								r.push(`${desc} fascinated by Arabian romanticism, leading the arcology to <span class="yellow">adopt Arabian Revivalism.</span>`);
								adoptRivalFS("FSArabianRevivalist");
								return;
							case "Edo Revivalism":
								r.push(`${desc} fascinated by the long tale of Chinese history, leading the arcology to <span class="yellow">adopt Chinese Revivalism.</span>`);
								adoptRivalFS("FSChineseRevivalist");
								return;
							case "Arabian Revivalism":
								r.push(`${desc} fascinated by ancient Egyptian history, leading the arcology to <span class="yellow">adopt Egyptian Revivalism.</span>`);
								adoptRivalFS("FSEgyptianRevivalist");
								return;
							case "Chinese Revivalism":
								r.push(`${desc} fascinated by Japanese history, leading the arcology to <span class="yellow">adopt Edo Revivalism.</span>`);
								adoptRivalFS("FSEdoRevivalist");
								return;
							case "Aztec Revivalism":
								r.push(`${desc} fascinated by classical Roman history, leading the arcology to <span class="yellow">adopt Roman Revivalism.</span>`);
								adoptRivalFS("FSRomanRevivalist");
								return;
							case "Antebellum Revivalism":
								r.push(`${desc} fascinated by ancient Aztec history, leading the arcology to <span class="yellow">adopt Aztec Revivalism.</span>`);
								adoptRivalFS("FSAztecRevivalist");
								return;
							default:
								delete V.rival.FS.adopted;
						}
					} else { // RIVAL ADOPTION
						let desc = "Its owner is";
						if (V.arcologies[0].FSSubjugationist > random(5, 60)) {
							if (validFSes.includes("FSSupremacist") && (!FutureSocieties.isActive('FSSubjugationist', arc)) || (arc.FSSubjugationistRace !== V.arcologies[0].FSSubjugationistRace)) {
								r.push(`${desc} preoccupied by belief in the superiority of the ${V.arcologies[0].FSSubjugationistRace} race, leading the arcology to <span class="yellow">adopt ${V.arcologies[0].FSSubjugationistRace} Supremacy.</span>`);
								arc.FSSupremacist = 5;
								arc.FSSupremacistRace = V.arcologies[0].FSSubjugationistRace;
								return;
							}
						}
						if (V.arcologies[0].FSSupremacist > random(5, 60)) {
							if ((validFSes.includes("FSSubjugationist") && (!FutureSocieties.isActive('FSSupremacist', arc)) || (arc.FSSupremacistRace !== V.arcologies[0].FSSupremacistRace))) {
								r.push(`${desc} preoccupied by a racial animus towards ${V.arcologies[0].FSSupremacistRace} people, leading the arcology to <span class="yellow">adopt ${V.arcologies[0].FSSupremacistRace} Subjugation.</span>`);
								arc.FSSubjugationist = 5;
								arc.FSSubjugationistRace = V.arcologies[0].FSSupremacistRace;
								return;
							}
						}
						if (V.arcologies[0].FSRestart > random(5, 60)) {
							if (validFSes.includes("FSRepopulationFocus")) {
								r.push(`${desc} obsessed with breeding a new society, leading the arcology to <span class="yellow">adopt Repopulationism.</span>`);
								arc.FSRepopulationFocus = 5;
								return;
							}
						} else if (V.arcologies[0].FSRepopulationFocus > random(5, 60)) {
							if (validFSes.includes("FSRestart")) {
								r.push(`${desc} obsessed with creating a new, better society, leading the arcology to <span class="yellow">adopt Eugenics.</span>`);
								arc.FSRestart = 5;
								return;
							}
						}
						if (V.arcologies[0].FSGenderRadicalist > random(5, 60)) {
							if (validFSes.includes("FSGenderFundamentalist")) {
								r.push(`${desc} enthusiastic about knocking slaves up, leading the arcology to <span class="yellow">adopt Gender Fundamentalism.</span>`);
								arc.FSGenderFundamentalist = 5;
								return;
							}
						} else if (V.arcologies[0].FSGenderFundamentalist > random(5, 60)) {
							if (validFSes.includes("FSGenderRadicalist")) {
								r.push(`${desc} enthusiastic about fucking slaves in the butt, leading the arcology to <span class="yellow">adopt Gender Radicalism.</span>`);
								arc.FSGenderRadicalist = 5;
								return;
							}
						}
						if (V.arcologies[0].FSPaternalist > random(5, 60)) {
							if (validFSes.includes("FSDegradationist")) {
								r.push(`${desc} partial to screaming and struggling, leading the arcology to <span class="yellow">adopt Degradationism.</span>`);
								arc.FSDegradationist = 5;
								return;
							}
						} else if (V.arcologies[0].FSDegradationist > random(5, 60)) {
							if (validFSes.includes("FSPaternalist")) {
								r.push(`${desc} devoted to their slaves' advancement, leading the arcology to <span class="yellow">adopt Paternalism.</span>`);
								arc.FSPaternalist = 5;
								return;
							}
						}
						if (V.arcologies[0].FSIntellectualDependency > random(5, 60)) {
							if (validFSes.includes("FSSlaveProfessionalism")) {
								r.push(`${desc} obsessed with crafting the perfect slave, leading the arcology to <span class="yellow">adopt Slave Professionalism.</span>`);
								arc.FSSlaveProfessionalism = 5;
								return;
							}
						} else if (V.arcologies[0].FSSlaveProfessionalism > random(5, 60)) {
							if (validFSes.includes("FSIntellectualDependency")) {
								r.push(`${desc} worried that they may one day be outsmarted by their chattel, leading the arcology to <span class="yellow">adopt Intellectual Dependency.</span>`);
								arc.FSIntellectualDependency = 5;
								return;
							}
						}
						if (V.arcologies[0].FSBodyPurist > random(5, 60)) {
							if (validFSes.includes("FSTransformationFetishist")) {
								r.push(`${desc} fascinated with extreme surgery, leading the arcology to <span class="yellow">adopt Transformation Fetishism.</span>`);
								arc.FSTransformationFetishist = 5;
								return;
							}
						} else if (V.arcologies[0].FSTransformationFetishist > random(5, 60)) {
							if (validFSes.includes("FSBodyPurist")) {
								r.push(`${desc} concerned by trends in their slaves' health, leading the arcology to <span class="yellow">adopt Body Purism.</span>`);
								arc.FSBodyPurist = 5;
								return;
							}
						}
						if (V.arcologies[0].FSYouthPreferentialist > random(5, 60)) {
							if (validFSes.includes("FSMaturityPreferentialist")) {
								r.push(`${desc} devoted to time in bed with their MILF slaves, leading the arcology to <span class="yellow">adopt Maturity Preferentialism.</span>`);
								arc.FSMaturityPreferentialist = 5;
								return;
							}
						} else if (V.arcologies[0].FSMaturityPreferentialist > random(5, 60)) {
							if (validFSes.includes("FSYouthPreferentialist")) {
								r.push(`${desc} devoted to fucking nubile young slaves, leading the arcology to <span class="yellow">adopt Youth Preferentialism.</span>`);
								arc.FSYouthPreferentialist = 5;
								return;
							}
						}
						if (V.arcologies[0].FSPetiteAdmiration > random(5, 60)) {
							if (validFSes.includes("FSStatuesqueGlorification")) {
								r.push(`${desc} convinced that tall equals beautiful, leading the arcology to <span class="yellow">adopt Statuesque Glorification.</span>`);
								arc.FSStatuesqueGlorification = 5;
								return;
							}
						} else if (V.arcologies[0].FSStatuesqueGlorification > random(5, 60)) {
							if (validFSes.includes("FSPetiteAdmiration")) {
								r.push(`${desc} enamored by those shorter than them, leading the arcology to <span class="yellow">adopt Petite Admiration.</span>`);
								arc.FSPetiteAdmiration = 5;
								return;
							}
						}
						if (V.arcologies[0].FSSlimnessEnthusiast > random(5, 60)) {
							if (validFSes.includes("FSAssetExpansionist")) {
								r.push(`${desc} obsessed with boobs, the bigger, the better, leading the arcology to <span class="yellow">adopt Asset Expansionism.</span>`);
								arc.FSAssetExpansionist = 5;
								return;
							}
						} else if (V.arcologies[0].FSAssetExpansionist > random(5, 60)) {
							if (validFSes.includes("FSSlimnessEnthusiast")) {
								r.push(`${desc} partial to a slim slave with tight holes, leading the arcology to <span class="yellow">adopt Slimness Enthusiasm.</span>`);
								arc.FSSlimnessEnthusiast = 5;
								return;
							}
						}
						if (V.arcologies[0].FSPastoralist > random(5, 60)) {
							if (validFSes.includes("FSPastoralist")) {
								r.push(`${desc} addicted to breast milk straight from the nipple, leading the arcology to <span class="yellow">adopt Pastoralism.</span>`);
								arc.FSPastoralist = 5;
								return;
							}
						} else if (V.arcologies[0].FSCummunism > random(5, 60)) {
							if (validFSes.includes("FSCummunism")) {
								r.push(`${desc} obsessed with cum, leading the arcology to <span class="yellow">adopt Cummunism.</span>`);
								arc.FSCummunism = 5;
								return;
							}
						}
						if (V.arcologies[0].FSPhysicalIdealist > random(5, 60)) {
							if (validFSes.includes("FSPhysicalIdealist")) {
								r.push(`${desc} pretty devoted to spending time in the gym, leading the arcology to <span class="yellow">adopt Physical Idealism.</span>`);
								arc.FSPhysicalIdealist = 5;
								return;
							}
						} else if (V.arcologies[0].FSHedonisticDecadence > random(5, 60)) {
							if (validFSes.includes("FSHedonisticDecadence")) {
								r.push(`${desc} pretty devoted to indulging their every whim, leading the arcology to <span class="yellow">adopt Decadent Hedonism.</span>`);
								arc.FSHedonisticDecadence = 5;
								return;
							}
						}
						if (V.arcologies[0].FSRomanRevivalist > random(5, 60) || V.arcologies[0].FSAntebellumRevivalist > random(5, 60)) {
							if (validFSes.includes("FSAztecRevivalist")) {
								r.push(`${desc} fascinated by ancient Aztec history, leading the arcology to <span class="yellow">adopt Aztec Revivalism.</span>`);
								arc.FSAztecRevivalist = 5;
								return;
							}
						} else if (V.arcologies[0].FSAztecRevivalist > random(5, 60)) {
							if (validFSes.includes("FSRomanRevivalist")) {
								r.push(`${desc} fascinated by classical Roman history, leading the arcology to <span class="yellow">adopt Roman Revivalism.</span>`);
								arc.FSRomanRevivalist = 5;
								return;
							}
						} else if (V.arcologies[0].FSEgyptianRevivalist > random(5, 60) || V.arcologies[0].FSNeoImperialist > random(5, 60)) {
							if (validFSes.includes("FSArabianRevivalist")) {
								r.push(`${desc} fascinated by Arabian romanticism, leading the arcology to <span class="yellow">adopt Arabian Revivalism.</span>`);
								arc.FSArabianRevivalist = 5;
								return;
							}
						} else if (V.arcologies[0].FSEdoRevivalist > random(5, 60)) {
							if (validFSes.includes("FSChineseRevivalist")) {
								r.push(`${desc} fascinated by the long tale of Chinese history, leading the arcology to <span class="yellow">adopt Chinese Revivalism.</span>`);
								arc.FSChineseRevivalist = 5;
								return;
							}
						} else if (V.arcologies[0].FSArabianRevivalist > random(5, 60)) {
							if (validFSes.includes("FSEgyptianRevivalist")) {
								r.push(`${desc} fascinated by ancient Egyptian history, leading the arcology to <span class="yellow">adopt Egyptian Revivalism.</span>`);
								arc.FSEgyptianRevivalist = 5;
								return;
							}
						} else if (V.arcologies[0].FSChineseRevivalist > random(5, 60)) {
							if (validFSes.includes("FSEdoRevivalist")) {
								r.push(`${desc} fascinated by Japanese history, leading the arcology to <span class="yellow">adopt Edo Revivalism.</span>`);
								arc.FSEdoRevivalist = 5;
								return;
							}
						}
					}
				}
			}

			/* AGENT ADOPTION*/
			if (arc.government === "your agent") {
				const leader = App.currentAgent(i);
				const {he, his, himself, woman, him, hers} = getPronouns(leader);
				/** @type {Array<{fs: FC.FutureSociety, msg: string}>} */
				const candidates = [];

				if (leader.fetish === Fetish.PREGNANCY && V.seePreg === 1) {
					candidates.push({fs: "FSRepopulationFocus", msg: `since as a pregnancy fetishist, ${he} can't wait to see the female population's bellies swell with life.`});
				}
				if ((leader.preg < -1 || (leader.ovaries === 0 && leader.mpreg !== 1)) && leader.genes === GenderGenes.FEMALE) {
					candidates.push({fs: "FSRestart", msg: `since if no-one can get pregnant, ${he} won't be alone.`});
				}
				if (leader.dick > 0) {
					candidates.push({fs: "FSGenderRadicalist", msg: `since ${he}'s a walking, swinging argument for dickgirls.`});
				}
				if (leader.pregKnown === 1 || leader.bellyPreg > 1500) {
					candidates.push({fs: "FSGenderFundamentalist", msg: `since its citizens find leadership by a pregnant ${woman} fascinating.`});
				}
				if (leader.behavioralQuirk === BehavioralQuirk.ADVOCATE) {
					candidates.push({fs: "FSPaternalist", msg: `since as an advocate for slavery, ${he} believes in its benefits.`});
				}
				if (leader.fetish === Fetish.SADIST) {
					candidates.push({fs: "FSDegradationist", msg: `since as a sexual sadist, ${he}'s excited by the idea of leading a society that applauds ${his} cruelest impulses.`});
				}
				if (leader.intelligence + leader.intelligenceImplant >= 120) {
					if (leader.skill.penetrative + leader.skill.vaginal + leader.skill.oral + leader.skill.anal + leader.skill.whoring + leader.skill.entertainment >= 400) {
						candidates.push({fs: "FSSlaveProfessionalism", msg: `since ${he} wishes to produce slaves you can be proud of.`});
					}
					if (leader.behavioralFlaw === BehavioralFlaw.ARROGANT) {
						candidates.push({fs: "FSIntellectualDependency", msg: `since, due to ${his} own insecurities, needs to be frequently reassured that ${he} is smarter than the masses.`});
					}
					if (leader.behavioralQuirk === BehavioralQuirk.INSECURE) {
						candidates.push({fs: "FSIntellectualDependency", msg: `since ${he} absolutely needs to feel intellectually superior to ${his} chattel.`});
					}
				}
				if (leader.chem > 50) {
					candidates.push({fs: "FSBodyPurist", msg: `since ${he} knows what long term drug damage feels like, and doesn't want any slave to ever experience it again.`});
				}
				if (leader.boobsImplant > 1000) {
					candidates.push({fs: "FSTransformationFetishist", msg: `out of a perverse desire to subject all slaves to massive implants like ${hers}.`});
				}
				if (leader.actualAge <= 25) {
					candidates.push({fs: "FSYouthPreferentialist", msg: `to buttress acceptance of ${his} own young age.`});
				}
				if (leader.actualAge > 35) {
					candidates.push({fs: "FSMaturityPreferentialist", msg: `since ${he} has a certain personal interest in promoting the idea that MILFs are sexy.`});
				}
				if (leader.behavioralQuirk === BehavioralQuirk.INSECURE || leader.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
					candidates.push({fs: "FSSlimnessEnthusiast", msg: `since ${his} history of anorexia has deeply impacted ${his} idea of beauty.`});
				}
				if (leader.fetish === Fetish.BOOBS) {
					candidates.push({fs: "FSAssetExpansionist", msg: `since ${he}'s a breast expansion fetishist in addition to being a mere breast fetishist.`});
				}
				if (leader.sexualQuirk === SexualQuirk.SIZEQUEEN && leader.vagina > 3) {
					candidates.push({fs: "FSAssetExpansionist", msg: `since ${he}'s a stickler for big dicks and seeks to find one large enough to push ${him} to ${his} very limit.`});
				}
				if (leader.fetish === Fetish.CUMSLUT) {
					candidates.push({fs: "FSCummunism", msg: `since ${he} already loves sucking down huge loads of cum.`});
				}
				if (leader.fetish === Fetish.BOOBS) {
					candidates.push({fs: "FSPastoralist", msg: `since ${he} loves boobs and adores suckling them.`});
				}
				if (leader.behavioralQuirk === BehavioralQuirk.FITNESS) {
					candidates.push({fs: "FSPhysicalIdealist", msg: `since ${he}'s a fitness fanatic ${himself}.`});
				}
				if (leader.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
					candidates.push({fs: "FSHedonisticDecadence", msg: `since ${he} already loves over-eating.`});
				}
				if (leader.fetish !== Fetish.NONE && leader.fetishStrength >= 100) {
					candidates.push({fs: "FSHedonisticDecadence", msg: `since ${he} seeks to satisfy ${his} powerful fetish.`});
				}
				if (leader.height >= 200) {
					candidates.push({fs: "FSStatuesqueGlorification", msg: `since ${he} is tired of being one of the tallest in arcology.`});
				}
				if (leader.height >= 170 && leader.fetish === Fetish.DOM) {
					candidates.push({fs: "FSPetiteAdmiration", msg: `since it is far easier to dominate someone much smaller than oneself.`});
				}
				if (leader.height < 160 && leader.fetish !== Fetish.SUBMISSIVE) {
					candidates.push({fs: "FSPetiteAdmiration", msg: `since ${he} doesn't like ${his} subordinates towering over ${him}.`});
				}
				const lover = getSlave(leader.relationshipTarget);
				if (lover && areRelated(leader, lover) && V.seeIncest === 1) {
					if ((leader.behavioralQuirk === BehavioralQuirk.SINFUL || leader.sexualQuirk === SexualQuirk.PERVERT)) {
						candidates.push({fs: "FSIncestFetishist", msg: `to share the love and joy ${he} holds with ${his} ${relativeTerm(leader, lover)}.`});
					}
					if (lover.assignment === Job.AGENTPARTNER && leader.relationship > 3) {
						candidates.push({fs: "FSEgyptianRevivalist", msg: `since ${he}'s already part of a gloriously incestuous relationship.`});
					}
				}
				if (leader.behavioralFlaw === BehavioralFlaw.DEVOUT) {
					candidates.push({fs: "FSChattelReligionist", msg: `to share and spread ${his} deeply held beliefs about the holiness of sexual service.`});
				}
				if (leader.behavioralQuirk === BehavioralQuirk.SINFUL) {
					candidates.push({fs: "FSChattelReligionist", msg: `since ${he}'s excited by the prospect of getting away with horrible sins against old religions in public.`});
				}
				if (leader.nationality === "Chinese") {
					candidates.push({fs: "FSChineseRevivalist", msg: `since ${he}'s Chinese ${himself} and can claim high honor in such a society.`});
				} else if (leader.nationality === "Japanese") {
					candidates.push({fs: "FSEdoRevivalist", msg: `since ${he}'s Japanese ${himself} and can claim high honor in such a society.`});
				} else if (leader.nationality === "Mexican") {
					candidates.push({fs: "FSAztecRevivalist", msg: `since ${he}'s Mexican ${himself} and can claim high honor in such a society.`});
				} else if (leader.nationality === "American") {
					candidates.push({fs: "FSAntebellumRevivalist", msg: `since ${he}'s American ${himself} and can claim high honor in such a society.`});
				} else if (leader.nationality === "Egyptian") {
					candidates.push({fs: "FSEgyptianRevivalist", msg: `since ${he}'s Egyptian ${himself} and wants to relive the glory of the Pharaohs.`});
				} else if (["English", "French", "German", "Spanish"].includes(leader.nationality)) {
					candidates.push({fs: "FSNeoImperialist", msg: `since ${he}'s ${leader.nationality} ${himself} and can easily cement ${his} rule with Imperial directives in your name.`});
				}
				if (leader.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
					candidates.push({fs: "FSRomanRevivalist", msg: `since it appeals to ${his} confident, patrician nature.`});
				}
				if (leader.fetish === Fetish.DOM) {
					candidates.push({fs: "FSArabianRevivalist", msg: `since ${he}'s sexually dominant and quite likes the idea of overseeing slave bazaars.`});
				}
				const chosen = candidates.filter(c => validFSes.includes(c.fs)).random();
				if (chosen) {
					r.push(`Your agent <span class="pink">${leader.slaveName}</span> successfully pushes it to <span class="yellow">adopt ${FutureSocieties.displayName(chosen.fs)},</span>`, chosen.msg);
					arc[chosen.fs] = 5;
					return;
				}
			}

			/* CROSS-FS ADOPTION */
			/** Map from source to an array of destination FSes. On the destination side, order matters; adoption is attempted in sequence through the array.
			 *  If several destination FSes should be equally likely at a particular stage, put them in a nested array.
			 * @typedef {{fs: FC.FutureSociety, prereqs?: () => boolean, msg: string}} crossFSDest
			 * @type {Map<FC.FutureSociety, (crossFSDest|crossFSDest[])[]>} */
			const crossFS = new Map([
				["FSSubjugationist", [
					{
						fs: "FSDegradationist",
						msg: `The arcology's racial Subjugationist culture <span class="yellow">pushes it towards Degradationism.</span>`,
					},
					[ // pick one at random
						{
							fs:	"FSAztecRevivalist",
							msg: `The arcology's racial Supremacist culture <span class="yellow">pushes it towards Aztec Revivalism,</span> since the enslavement and sacrifice of slaves was fundamental to the culture.`
						},
						{
							fs: "FSEgyptianRevivalist",
							msg: `The arcology's racial Subjugationist culture <span class="yellow">pushes it towards Egyptian Revivalism,</span> since the Ancient Egyptians are famous for keeping a race of slaves.`
						},
						{
							fs: "FSAntebellumRevivalist",
							msg: `The arcology's racial Subjugationist culture <span class="yellow">pushes it towards Antebellum Revivalism,</span> since the Antebellum South was famous for keeping a race of slaves.`
						},
					]
				]],
				["FSSupremacist", [
					{
						fs: "FSPaternalist",
						msg: `The arcology's racial Supremacist culture <span class="yellow">pushes it towards Paternalism.</span>`,
					},
					[ // pick one at random
						{
							fs: "FSEdoRevivalist",
							prereqs: () => arc.FSSupremacistRace === "asian",
							msg: `The arcology's racial Supremacist culture <span class="yellow">pushes it towards Edo Revivalism,</span> since the beauty and grace of the Japanese people are watchwords there.`
						},
						{
							fs: "FSChineseRevivalist",
							prereqs: () => arc.FSSupremacistRace === "asian",
							msg: `The arcology's racial Supremacist culture <span class="yellow">pushes it towards Chinese Revivalism,</span> since the wisdom of the Middle Kingdom is admired there.`
						},
						{
							fs: "FSAntebellumRevivalist",
							prereqs: () => arc.FSSupremacistRace === "white",
							msg: `The arcology's racial Supremacist culture <span class="yellow">pushes it towards Antebellum Revivalism,</span> since the genteel and chivalric ways of the Antebellum period are admired there.`
						},
					]
				]],
				["FSRepopulationFocus", [
					{
						fs: "FSGenderFundamentalist",
						msg: `The arcology's Repopulationist culture <span class="yellow">pushes it towards Gender Fundamentalism,</span> since traditional women make better mothers.`
					},
					{
						fs: "FSAssetExpansionist",
						msg: `The arcology's Repopulationist culture <span class="yellow">pushes it towards Asset Expansionism,</span> since big pregnant bellies go great with huge tits and asses.`
					},
					{
						fs: "FSPetiteAdmiration",
						msg: `The arcology's Repopulationist culture <span class="yellow">pushes it towards Petite Admiration,</span> since shorter women tend to have an easier time with childbirth.`
					},
				]],
				["FSRestart", [
					{
						fs: "FSNeoImperialist",
						msg: `The arcology's elitist, eugenicist culture <span class="yellow">pushes it towards Neo-Imperialism,</span> since the societal elite view themselves as the only appropriate rulers of their society.`
					},
					{
						fs: "FSDegradationist",
						msg: `The arcology's elite-focused culture <span class="yellow">pushes it towards Degradationism,</span> since its lowest class deserves nothing but misery.`
					},
					{
						fs: "FSSlaveProfessionalism",
						msg: `The arcology's elite-focused culture <span class="yellow">pushes it towards Slave Professionalism,</span> since the highest class deserve nothing less than the best slaves.`
					},
					{
						fs: "FSHedonisticDecadence",
						msg: `The arcology's wide range of imports <span class="yellow">pushes it towards Decadent Hedonism,</span> since it has access to so many undiscovered pleasures.`
					},
				]],
				["FSGenderRadicalist", [
					{
						fs: "FSTransformationFetishist",
						msg: `The arcology's Gender Radicalist culture <span class="yellow">pushes it towards Transformation Fetishism,</span> since surgery can turn a slave into anything.`
					},
					{
						fs: "FSSlimnessEnthusiast",
						msg: `The arcology's Gender Radicalist culture <span class="yellow">pushes it towards Slimness Enthusiasm,</span> since that's the kind of body many of its slaves have.`
					},
					{
						fs: "FSCummunism",
						msg: `The arcology's Gender Radicalist culture <span class="yellow">pushes it towards Cummunism,</span> since many of its slaves are capable of giving cum.`
					},
				]],
				["FSGenderFundamentalist", [
					{
						fs: "FSPastoralist",
						msg: `The arcology's Gender Fundamentalist culture <span class="yellow">pushes it towards Pastoralism,</span> since its pregnant slaves are already giving milk.`
					},
					{
						fs: "FSIntellectualDependency",
						msg: `The arcology's Gender Fundamentalist culture <span class="yellow">pushes it towards Intellectual Dependency,</span> since women don't need to think to serve men.`
					},
					{
						fs: "FSYouthPreferentialist",
						msg: `The arcology's Gender Fundamentalist culture <span class="yellow">pushes it towards Youth Preferentialism,</span> since younger slaves are beautiful and fertile.`
					},
				]],
				["FSPaternalist", [
					{
						fs: "FSChattelReligionist",
						msg: `The arcology's Paternalist culture <span class="yellow">pushes it towards Chattel Religionism,</span> since many of its slaves are already worshipful.`
					},
					{
						fs: "FSBodyPurist",
						msg: `The arcology's Paternalist culture <span class="yellow">pushes it towards Body Purism,</span> since giving slaves dangerous drugs is hardly good for them.`
					},
					{
						fs: "FSRomanRevivalist",
						msg: `The arcology's Paternalist culture <span class="yellow">pushes it towards Roman Revivalism,</span> since loyal service to the res publica bears similarity to their existing mores.`
					},
				]],
				["FSDegradationist", [
					{
						fs: "FSTransformationFetishist",
						msg: `The arcology's Degradationist culture <span class="yellow">pushes it towards Transformation Fetishism,</span> the ultimate expression of power over slave bodies.`
					},
					{
						fs: "FSGenderRadicalist",
						msg: `The arcology's Degradationist culture <span class="yellow">pushes it towards Gender Radicalism,</span> since the joy of forcing a gender role on a slave is already popular.`
					},
					{
						fs: "FSIntellectualDependency",
						msg: `The arcology's Degradationist culture <span class="yellow">pushes it towards Intellectual Dependency,</span> since there's no need for a sex toy to be thinking.`
					},
				]],
				["FSIntellectualDependency", [
					{
						fs: "FSTransformationFetishist",
						msg: `The arcology's Intellectual Dependency culture <span class="yellow">pushes it towards Transformation Fetishism,</span> to give its bimbos a body most fitting.`
					},
					{
						fs: "FSYouthPreferentialist",
						msg: `The arcology's Intellectual Dependency culture <span class="yellow">pushes it towards Youth Preferentialism,</span> since the young have more energy to party.`
					},
					{
						fs: "FSHedonisticDecadence",
						msg: `The arcology's Intellectual Dependency culture <span class="yellow">pushes it towards Decadent Hedonism,</span> since base instinct already rules slaves' lives.`
					},
					{
						fs: "FSRepopulationFocus",
						msg: `The arcology's Intellectual Dependency culture <span class="yellow">pushes it towards Repopulationism,</span> since there has been an epidemic of unplanned pregnancies among the slave population.`
					},
				]],
				["FSSlaveProfessionalism", [
					{
						fs: "FSMaturityPreferentialist",
						msg: `The arcology's Slave Professionalism culture <span class="yellow">pushes it towards Maturity Preferentialist,</span> since with age comes experience.`
					},
					{
						fs: "FSPaternalist",
						msg: `The arcology's Slave Professionalism culture <span class="yellow">pushes it towards Paternalism,</span> since happy slaves are much more willing to be molded into shape.`
					},
					{
						fs: "FSPhysicalIdealist",
						msg: `The arcology's Slave Professionalism culture <span class="yellow">pushes it towards Physical Idealism,</span> since a fitting body is required to house the perfect mind.`
					},
					{
						fs: "FSChattelReligionist",
						msg: `The arcology's Slave Professionalism culture <span class="yellow">pushes it towards Chattel Religionism,</span> since skilled service is already a part of a slave's daily life.`
					},
				]],
				["FSBodyPurist", [
					{
						fs: "FSPhysicalIdealist",
						msg: `The arcology's Body Purist culture <span class="yellow">pushes it towards Physical Idealism,</span> since it already takes an intense interest in bodily perfection.`
					},
					{
						fs: "FSPaternalist",
						msg: `The arcology's Body Purist culture <span class="yellow">pushes it towards Paternalism,</span> since it's become obvious that happiness is a necessary part of wellness.`
					},
				]],
				["FSTransformationFetishist", [
					{
						fs: "FSAssetExpansionist",
						msg: `The arcology's Transformation Fetishist culture <span class="yellow">pushes it towards Asset Expansionism,</span> since it's already overrun with massive tits and asses.`
					},
					{
						fs: "FSDegradationist",
						msg: `The arcology's Transformation Fetishist culture <span class="yellow">pushes it towards Degradationism,</span> since it's already used to slaves whining about their latest surgeries.`
					},
				]],
				["FSYouthPreferentialist", [
					{
						fs: "FSSlimnessEnthusiast",
						msg: `The arcology's Youth Preferentialist culture <span class="yellow">pushes it towards Slimness Enthusiasm,</span> since that's the kind of body many of its slaves have.`
					},
					{
						fs: "FSRepopulationFocus",
						msg: `The arcology's Youth Preferentialist culture <span class="yellow">pushes it towards Repopulationism,</span> since many of its slaves are deliciously ripe for breeding.`
					},
				]],
				["FSMaturityPreferentialist", [
					{
						fs: "FSAssetExpansionist",
						msg: `The arcology's Maturity Preferentialist culture <span class="yellow">pushes it towards Asset Expansionism,</span> since that's the kind of body many of its slaves have.`
					},
					{
						fs: "FSPaternalist",
						msg: `The arcology's Maturity Preferentialist culture <span class="yellow">pushes it towards Paternalism,</span> since its many older slaves have skills best applied by a happy woman.`
					},
				]],
				["FSPetiteAdmiration", [
					{
						fs: "FSAssetExpansionist",
						msg: `The arcology's Petite Admiration culture <span class="yellow">pushes it towards Asset Expansionism,</span> since a ${girlU} with tits wider than ${heU} is tall attracts quite some attention.`
					},
					{
						fs: "FSPaternalist",
						msg: `The arcology's Petite Admiration culture <span class="yellow">pushes it towards Paternalism,</span> since such tiny ${girlU}s need extra special attention.`
					},
					{
						fs: "FSIncestFetishist",
						msg: `The arcology's Petite Admiration culture <span class="yellow">pushes it towards Incest Fetishism,</span> since age play often goes hand-in-hand with size play.`
					},
				]],
				["FSStatuesqueGlorification", [
					{
						fs: "FSPhysicalIdealist",
						msg: `The arcology's Statuesque Glorification culture <span class="yellow">pushes it towards Physical Idealism,</span> since being ripped complements being tall.`
					},
					{
						fs: "FSDegradationist",
						msg: `The arcology's Statuesque Glorification culture <span class="yellow">pushes it towards Degradationism,</span> since those that don't measure up deserve only suffering.`
					},
				]],
				["FSSlimnessEnthusiast", [
					{
						fs: "FSYouthPreferentialist",
						msg: `The arcology's Slimness Enthusiast culture <span class="yellow">pushes it towards Youth Preferentialism,</span> since younger slaves are often attractively slim.`
					},
					{
						fs: "FSBodyPurist",
						msg: `The arcology's Slimness Enthusiast culture <span class="yellow">pushes it towards Body Purism,</span> since the last thing they want is prettily slender girls with health trouble.`
					},
				]],
				["FSAssetExpansionist", [
					{
						fs: "FSMaturityPreferentialist",
						msg: `The arcology's Asset Expansionist culture <span class="yellow">pushes it towards Maturity Preferentialism,</span> since MILF slaves tend to come with nice big tits.`
					},
					{
						fs: "FSBodyPurist",
						msg: `The arcology's Asset Expansionist culture <span class="yellow">pushes it towards Body Purism,</span> since slaves on curatives are slaves not on growth hormones.`
					},
					[ // pick one at random
						{
							fs: "FSPetiteAdmiration",
							msg: `The arcology's Asset Expansionist culture <span class="yellow">pushes it towards Petite Admiration,</span> since the smaller a slave's body is, the bigger their breasts will look.`
						},
						{
							fs: "FSStatuesqueGlorification",
							msg: `The arcology's Asset Expansionist culture <span class="yellow">pushes it towards Statuesque Glorification,</span> as the love of all things huge is rather indiscriminate.`
						},
					]
				]],
				["FSPastoralist", [
					{
						fs: "FSBodyPurist",
						msg: `The arcology's Pastoralist culture <span class="yellow">pushes it towards Body Purism,</span> since there have been concerns about milk purity.`
					},
					{
						fs: "FSAssetExpansionist",
						msg: `The arcology's Pastoralist culture <span class="yellow">pushes it towards Asset Expansionism,</span> since they're convinced that there's no such thing as udders that are too big.`
					},
					{
						fs: "FSRepopulationFocus",
						msg: `The arcology's Pastoralist culture <span class="yellow">pushes it towards Repopulationism,</span> since pregnancy stimulates milk flow.`
					},
				]],
				["FSCummunism", [
					{
						fs: "FSPhysicalIdealist",
						msg: `The arcology's Cummunist culture <span class="yellow">pushes it towards Physical Idealism,</span> since big balls and huge loads go hand in hand with masculine muscles.`
					},
					{
						fs: "FSAssetExpansionist",
						msg: `The arcology's Cummunist culture <span class="yellow">pushes it towards Asset Expansionism,</span> since they're convinced that there's no such thing as balls that are too big.`
					},
					{
						fs: "FSBodyPurist",
						msg: `The arcology's Cummunist culture <span class="yellow">pushes it towards Body Purism,</span> since there have been concerns about cum purity.`
					},
				]],
				["FSHedonisticDecadence", [
					{
						fs: "FSPastoralist",
						msg: `The arcology's Hedonistic culture <span class="yellow">pushes it towards Pastoralism,</span> since nothing beats a nice glass of fresh squeezed milk with your cake.`
					},
					{
						fs: "FSIntellectualDependency",
						msg: `The arcology's Hedonistic culture <span class="yellow">pushes it towards Intellectual Dependency,</span> since higher thought is unneeded when you have everything you want.`
					},
					{
						fs: "FSPaternalist",
						msg: `The arcology's Hedonistic culture <span class="yellow">pushes it towards Paternalism,</span> since happiness is infectious.`
					},
				]],
				["FSPhysicalIdealist", [
					{
						fs: "FSBodyPurist",
						msg: `The arcology's Physical Idealist culture <span class="yellow">pushes it towards Body Purism,</span> since it's already used to treating slaves' bodies as temples.`
					},
					{
						fs: "FSYouthPreferentialist",
						msg: `The arcology's Physical Idealist culture <span class="yellow">pushes it towards Youth Preferentialism,</span> since beauty and athletic prowess do tend to peak early.`
					},
					{
						fs: "FSStatuesqueGlorification",
						msg: `The arcology's Physical Idealist culture <span class="yellow">pushes it towards Statuesque Glorification,</span> to better emulate the titans of legend.`
					},
					{
						fs: "FSCummunism",
						msg: `The arcology's Physical Idealist culture <span class="yellow">pushes it towards Cummunism,</span> since muscular, testosterone-filled slaves make admirable cumshots.`
					},
				]],
				["FSIncestFetishist", [
					{
						fs: "FSRepopulationFocus",
						msg: `The arcology's Incest Fetishizing culture <span class="yellow">pushes it towards Repopulationism,</span> in order to create many new future loving couples.`
					},
					{
						fs: "FSBodyPurist",
						msg: `The arcology's Incest Fetishizing culture <span class="yellow">pushes it towards Body Purism,</span> in order to keep its bloodlines pure.`
					},
					{
						fs: "FSPaternalist",
						msg: `The arcology's Incest Fetishizing culture <span class="yellow">pushes it towards Paternalism,</span> as healthy slaves live longer allowing relationships to span generations.`
					},
					{
						fs: "FSEgyptianRevivalist",
						msg: `The arcology's Incest Fetishizing culture <span class="yellow">pushes it towards Egyptian Revivalism,</span> as they naturally seek even more incestuous fun.`
					},
				]],
				["FSChattelReligionist", [
					{
						fs: "FSPaternalist",
						msg: `The arcology's Chattel Religionist culture <span class="yellow">pushes it towards Paternalism,</span> since charitable care for slaves' welfare has become widespread.`
					},
					{
						fs: "FSArabianRevivalist",
						msg: `The arcology's Chattel Religionist culture <span class="yellow">pushes it towards Arabian Revivalism,</span> since such an intermingling of slavery and faith fascinates them.`
					},
				]],
				["FSRomanRevivalist", [
					{
						fs: "FSPaternalist",
						msg: `The arcology's Roman Revivalist culture <span class="yellow">pushes it towards Paternalism,</span> since some Roman slaves were traditionally permitted limited rights.`
					},
				]],
				["FSNeoImperialist", [
					{
						fs: "FSRestart",
						msg: `The arcology's Neo-Imperialist culture <span class="yellow">pushes it towards Eugenics,</span> since their hegemonic, noble culture naturally views itself as genetically superior to the unwashed masses.`
					},
				]],
				["FSAztecRevivalist", [
					{
						fs: "FSDegradationist",
						msg: `The arcology's Aztec Revivalist culture <span class="yellow">pushes it towards Degradation,</span> since most Aztec war slaves were tortured and sacrificed.`
					},
				]],
				["FSEgyptianRevivalist", [
					{
						fs: "FSChattelReligionist",
						msg: `The arcology's Egyptian Revivalist culture <span class="yellow">pushes it towards Chattel Religionism,</span> since worship is already becoming an established part of its life.`
					},
					{
						fs: "FSIncestFetishist",
						msg: `The arcology's Egyptian Revivalist culture <span class="yellow">pushes it towards Incest Fetishism,</span> since more incest is only a good thing in its eyes.`
					},
				]],
				["FSEdoRevivalist", [
					{
						fs: "FSSlimnessEnthusiast",
						msg: `The arcology's Edo Revivalist culture <span class="yellow">pushes it towards Slimness Enthusiasm,</span> since slim and elegant slaves are already fashionable there.`
					},
				]],
				["FSArabianRevivalist", [
					{
						fs: "FSChattelReligionist",
						msg: `The arcology's Arabian Revivalist culture <span class="yellow">pushes it towards Chattel Religionism,</span> since the word of God is already a matter of daily significance there.`
					},
				]],
				["FSChineseRevivalist", [
					{
						fs: "FSSlaveProfessionalism",
						msg: `The arcology's Chinese Revivalist culture <span class="yellow">pushes it towards Slave Professionalism,</span> since well-educated, dispassionate slave leaders are more effective.`
					},
					{
						fs: "FSPaternalist",
						msg: `The arcology's Chinese Revivalist culture <span class="yellow">pushes it towards Paternalism,</span> since traditional beliefs about duty and order have become accepted.`
					},
				]],
				["FSAntebellumRevivalist", [
					{
						fs: "FSSlaveProfessionalism",
						msg: `The arcology's Antebellum Revivalist culture <span class = "yellow">pushes it towards Slave Professionalism,</span> since educated, affable, and entertaining slaves are fashionable amongst the gentry there.`
					},
					{
						fs: "FSPaternalist",
						msg: `The arcology's Antebellum Revivalist culture <span class = "yellow">pushes it towards Paternalism,</span> out of a belief that rebellious and hateful slaves reflect poorly on their master.`
					},
				]]
			]);
			const validChoice = /** @param {crossFSDest} dest */ (dest) => validFSes.includes(dest.fs) && (!dest.prereqs || dest.prereqs());
			const candidates = [];
			for (const [source, destArray] of crossFS) {
				if (arc[source] > random(50, 200)) {
					for (const dest of destArray) {
						if (Array.isArray(dest)) {
							// pick one at random
							const choice = dest.filter(x => validChoice(x)).random();
							if (choice) {
								candidates.push(choice);
								break; // only select one dest per source
							}
						} else if (validChoice(dest)) {
							candidates.push(dest);
							break; // only select one dest per source
						}
					}
				}
			}
			if (candidates.length > 0) {
				const candidate = candidates.random();
				r.push(candidate.msg);
				arc[candidate.fs] = 5;
				return;
			}

			/* NEIGHBOR ADOPTION*/
			const influencedBy = [];
			const aligned = [];
			const opposed = [];
			const usableCandidates = [];
			for (const arc2 of V.arcologies) {
				if (arc.direction !== arc2.direction) {
					let influenceBonus = 0;
					if (arc.direction === arc2.influenceTarget) {
						influencedBy.push(arc2.name);
						influenceBonus = 20;
					}

					const opinion = App.Neighbor.opinion(arc, arc2);
					if (opinion >= 50) {
						aligned.push(arc2.name);
						influenceBonus += opinion - 50;
					} else if (opinion <= -50) {
						opposed.push(arc2.name);
						influenceBonus += opinion + 50;
					}

					if (arc2.direction === 0 && V.baseDifficulty < 3) {
						// 10 points of bonus influence for player per level below normal
						influenceBonus += (3 - V.baseDifficulty) * 10;
					} else if (arc2.rival === 1 && V.baseDifficulty > 3) {
						// 10 points of bonus influence for rival per level above normal
						influenceBonus += (V.baseDifficulty - 3) * 10;
					}

					for (const candidate of validFSes) {
						if (arc2[candidate] > Math.max(0, random(0, 200) - influenceBonus)) {
							// equal weight by default (at normal difficulty, or the arc is neither player nor rival)
							usableCandidates.push({arc2, candidate});
							if (arc2.direction === 0) {
								// easier than normal: player FS gets bonus chance
								if (V.baseDifficulty < 3) {
									usableCandidates.push({arc2, candidate});
								}
								// very easy: player FS gets another bonus chance
								if (V.baseDifficulty < 2) {
									usableCandidates.push({arc2, candidate});
								}
							} else if (arc2.rival > 0) {
								// harder than normal: rival FS gets bonus chance
								if (V.baseDifficulty > 3) {
									usableCandidates.push({arc2, candidate});
								}
								// nightmare: rival FS gets another bonus chance
								if (V.baseDifficulty > 4) {
									usableCandidates.push({arc2, candidate});
								}
							}
						}
					}
				}
			}
			if (influencedBy.length > 0) {
				r.push(`Directed cultural influence from ${toSentence(influencedBy)} gives ${influencedBy.length > 1 ? 'them' : 'it'} some input over ${arc.name}'s choice of direction.`);
			}
			if (aligned.length > 0) {
				r.push(`${arc.name} is aligned with ${toSentence(aligned)} socially, encouraging it to consider adopting more of ${aligned.length > 1 ? 'their' : 'its'} cultural values.`);
			}
			if (opposed.length > 0) {
				r.push(`${arc.name} is culturally opposed with ${toSentence(opposed)} socially, encouraging it to resist adopting ${opposed.length > 1 ? 'their' : 'its'} cultural values.`);
			}
			if (usableCandidates.length > 0) {
				const chosen = usableCandidates.random();
				if (chosen.candidate === "FSSubjugationist") {
					r.push(`It <span class="yellow">adopts ${chosen.arc2.FSSubjugationistRace} Subjugation</span> due to influence from its trading partner ${chosen.arc2.name}.`);
					arc.FSSubjugationist = 5;
					arc.FSSubjugationistRace = chosen.arc2.FSSubjugationistRace;
				} else if (chosen.candidate === "FSSupremacist") {
					r.push(`It <span class="yellow">adopts ${chosen.arc2.FSSupremacistRace} Supremacy</span> due to influence from its trading partner ${chosen.arc2.name}.`);
					arc.FSSupremacist = 5;
					arc.FSSupremacistRace = chosen.arc2.FSSupremacistRace;
				} else {
					r.push(`It <span class="yellow">adopts ${FutureSocieties.displayName(chosen.candidate)}</span> due to influence from its trading partner ${chosen.arc2.name}.`);
					arc[chosen.candidate] = 5;
				}
				return;
			}

			/* RANDOM ADOPTION*/
			if (random(0, 4) === 1) {
				let desc;
				switch (arc.government) {
					case "elected officials":
						desc = "Its elected leaders are";
						break;
					case "a committee":
						desc = "A majority of its ruling committee is";
						break;
					case "an oligarchy":
					case "your trustees":
						desc = "Its leading citizens are";
						break;
					case "an individual":
						desc = "Its owner is";
						break;
					case "your agent":
						desc = "Your agent and its citizens are";
						break;
					case "a corporation":
						desc = "Most of its board of directors are";
						break;
					default:
						desc = "Its citizens are";
				}
				switch (validFSes.random()) {
					case "FSSubjugationist": {
						const subjugationRace = Array.from(App.Data.misc.filterRaces.keys()).random();
						if (!FutureSocieties.isActive('FSSupremacist', arc) || (subjugationRace !== arc.FSSupremacistRace)) {
							r.push(`${desc} preoccupied by a racial animus towards ${subjugationRace} people, leading the arcology to <span class="yellow">adopt ${subjugationRace} Subjugation.</span>`);
							arc.FSSubjugationist = 5;
							arc.FSSubjugationistRace = subjugationRace;
							return;
						}
						break;
					}
					case "FSSupremacist": {
						const supremacistRace = Array.from(App.Data.misc.filterRaces.keys()).random();
						if (!FutureSocieties.isActive('FSSubjugationist', arc) || (supremacistRace !== arc.FSSubjugationistRace)) {
							r.push(`${desc} preoccupied by belief in the superiority of the ${supremacistRace} race, leading the arcology to <span class="yellow">adopt ${supremacistRace} Supremacy.</span>`);
							arc.FSSupremacist = 5;
							arc.FSSupremacistRace = supremacistRace;
							return;
						}
						break;
					}
					case "FSGenderRadicalist":
						r.push(`${desc} enthusiastic about fucking slaves in the butt, leading the arcology to <span class="yellow">adopt Gender Radicalism.</span>`);
						arc.FSGenderRadicalist = 5;
						return;
					case "FSGenderFundamentalist":
						r.push(`${desc} enthusiastic about knocking slaves up, leading the arcology to <span class="yellow">adopt Gender Fundamentalism.</span>`);
						arc.FSGenderFundamentalist = 5;
						return;
					case "FSPaternalist":
						r.push(`${desc} devoted to their slaves' advancement, leading the arcology to <span class="yellow">adopt Paternalism.</span>`);
						arc.FSPaternalist = 5;
						return;
					case "FSDegradationist":
						r.push(`${desc} partial to screaming and struggling, leading the arcology to <span class="yellow">adopt Degradationism.</span>`);
						arc.FSDegradationist = 5;
						return;
					case "FSBodyPurist":
						r.push(`${desc} concerned by trends in their slaves' health, leading the arcology to <span class="yellow">adopt Body Purism.</span>`);
						arc.FSBodyPurist = 5;
						return;
					case "FSTransformationFetishist":
						r.push(`${desc} fascinated with extreme surgery, leading the arcology to <span class="yellow">adopt Transformation Fetishism.</span>`);
						arc.FSTransformationFetishist = 5;
						return;
					case "FSYouthPreferentialist":
						r.push(`${desc} devoted to fucking nubile young slaves, leading the arcology to <span class="yellow">adopt Youth Preferentialism.</span>`);
						arc.FSYouthPreferentialist = 5;
						return;
					case "FSMaturityPreferentialist":
						r.push(`${desc} devoted to time in bed with their MILF slaves, leading the arcology to <span class="yellow">adopt Maturity Preferentialism.</span>`);
						arc.FSMaturityPreferentialist = 5;
						return;
					case "FSSlimnessEnthusiast":
						r.push(`${desc} partial to a slim slave with tight holes, leading the arcology to <span class="yellow">adopt Slimness Enthusiasm.</span>`);
						arc.FSSlimnessEnthusiast = 5;
						return;
					case "FSAssetExpansionist":
						r.push(`${desc} enthusiastic about boobs, the bigger, the better, leading the arcology to <span class="yellow">adopt Asset Expansionism.</span>`);
						arc.FSAssetExpansionist = 5;
						return;
					case "FSPastoralist":
						r.push(`${desc} addicted to breast milk straight from the nipple, leading the arcology to <span class="yellow">adopt Pastoralism.</span>`);
						arc.FSPastoralist = 5;
						return;
					case "FSPhysicalIdealist":
						r.push(`${desc} pretty devoted to spending time in the gym, leading the arcology to <span class="yellow">adopt Physical Idealism.</span>`);
						arc.FSPhysicalIdealist = 5;
						return;
					case "FSChattelReligionist":
						r.push(`${desc} devoutly religious, and interested in a reformation, leading the arcology to <span class="yellow">adopt Chattel Religionism.</span>`);
						arc.FSChattelReligionist = 5;
						return;
					case "FSRomanRevivalist":
						r.push(`${desc} fascinated by classical Roman history, leading the arcology to <span class="yellow">adopt Roman Revivalism.</span>`);
						arc.FSRomanRevivalist = 5;
						return;
					case "FSAztecRevivalist":
						r.push(`${desc} fascinated by ancient Aztec history, leading the arcology to <span class="yellow">adopt Aztec Revivalism.</span>`);
						arc.FSAztecRevivalist = 5;
						return;
					case "FSEgyptianRevivalist":
						r.push(`${desc} fascinated by ancient Egyptian history, leading the arcology to <span class="yellow">adopt Egyptian Revivalism.</span>`);
						arc.FSEgyptianRevivalist = 5;
						return;
					case "FSEdoRevivalist":
						r.push(`${desc} fascinated by Japanese history, leading the arcology to <span class="yellow">adopt Edo Revivalism.</span>`);
						arc.FSEdoRevivalist = 5;
						return;
					case "FSArabianRevivalist":
						r.push(`${desc} fascinated by Arabian romanticism, leading the arcology to <span class="yellow">adopt Arabian Revivalism.</span>`);
						arc.FSArabianRevivalist = 5;
						return;
					case "FSChineseRevivalist":
						r.push(`${desc} fascinated by the long tale of Chinese history, leading the arcology to <span class="yellow">adopt Chinese Revivalism.</span>`);
						arc.FSChineseRevivalist = 5;
						return;
					case "FSRepopulationFocus":
						r.push(`${desc} concerned for the future, and partial to watching bellies swell, leading the arcology to <span class="yellow">adopt Repopulation Efforts.</span>`);
						arc.FSRepopulationFocus = 5;
						return;
					case "FSRestart":
						r.push(`${desc} concerned for the future, and believing their elite could do a better job, leading the arcology to <span class="yellow">adopt Eugenics.</span>`);
						arc.FSRestart = 5;
						return;
					case "FSHedonisticDecadence":
						r.push(`${desc} obsessed with indulging their every desire, leading the arcology to <span class="yellow">adopt Decadent Hedonism.</span>`);
						arc.FSHedonisticDecadence = 5;
						return;
					case "FSCummunism":
						r.push(`${desc} obsessed with cum, leading the arcology to <span class="yellow">adopt Cummunism.</span>`);
						arc.FSCummunism = 5;
						return;
					case "FSIncestFetishist":
						r.push(`${desc} obsessed with their relatives, leading the arcology to <span class="yellow">adopt Incest Fetishism.</span>`);
						arc.FSIncestFetishist = 5;
						return;
					case "FSIntellectualDependency":
						r.push(`${desc} partial to airheaded horny bimbos, leading the arcology to <span class="yellow">adopt Intellectual Dependency.</span>`);
						arc.FSIntellectualDependency = 5;
						return;
					case "FSSlaveProfessionalism":
						r.push(`${desc} obsessed with crafting the perfect slave, leading the arcology to <span class="yellow">adopt Slave Professionalism.</span>`);
						arc.FSSlaveProfessionalism = 5;
						return;
					case "FSPetiteAdmiration":
						r.push(`${desc} enamored by those shorter than them, leading the arcology to <span class="yellow">adopt Petite Admiration.</span>`);
						arc.FSPetiteAdmiration = 5;
						return;
					case "FSStatuesqueGlorification":
						r.push(`${desc} convinced that tall equals beauty, leading the arcology to <span class="yellow">adopt Statuesque Glorification.</span>`);
						arc.FSStatuesqueGlorification = 5;
						return;
					case "FSNeoImperialist":
						r.push(`${desc} fascinated by the long rule of ancient European monarchs, leading the arcology to <span class="yellow">adopt Neo-Imperialism.</span>`);
						arc.FSNeoImperialist = 5;
						return;
					case "FSAntebellumRevivalist":
						r.push(`${desc} convinced of American exceptionalism and the romance of the Antebellum era, leading the arcology to <span class="yellow">adopt Antebellum Revivalism.</span>`);
						arc.FSAntebellumRevivalist = 5;
						return;
				}
			}

			r.push(`Its future is bitterly controversial, and no side is predominant this week. The dissension reduces the arcology's prosperity.`);
			arc.prosperity -= 1;
		}
	}
};
