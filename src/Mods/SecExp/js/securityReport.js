/**
 * @param {number} oldACitizens
 * @returns {DocumentFragment}
 */
App.Mods.SecExp.securityReport = function(oldACitizens) {
	let immigration = 0;
	let emigration = 0;
	let secGrowth = 0;
	let crimeGrowth = 0;
	if (V.ACitizens > oldACitizens) {
		immigration = V.ACitizens - oldACitizens;
	} else {
		emigration = oldACitizens - V.ACitizens; // takes into account citizens leaving and those getting enslaved
	}
	const activeUnits = App.Mods.SecExp.battle.activeUnits();
	/** @type {(string|HTMLElement|DocumentFragment)[]} */
	let r = V.useTabs === 0 ? ['<h2>Security</h2>'] : [];

	if (V.SecExp.buildings.secHub && V.SecExp.buildings.secHub.menials > 0) {
		r.push(`${num(V.SecExp.buildings.secHub.menials)} slaves work to improve the security of your arcology, while your`);
	} else {
		r.push(`Your`);
	}

	if (V.mercenaries >= 1 && V.arcologyUpgrade.drones === 1) {
		r.push(`mercenaries and security drones tirelessly patrol the streets to keep them safe.`);
	} else if (V.arcologyUpgrade.drones === 1) {
		r.push(`security drones tirelessly patrol the arcology to keep it safe.`);
	} else {
		r.push(`loyal subordinates try to keep the arcology safe to the best of their abilities.`);
	}

	// security modifiers
	if (V.PC.career === "mercenary") {
		r.push(`Your past life as a mercenary makes it easier to manage the security of the arcology.`);
		secGrowth += 1;
	}
	if (V.SecExp.smilingMan.progress === 10) {
		r.push(`The ex-criminal known to the world as The Smiling Man puts their impressive skills to work, dramatically increasing the efficiency of your security measures.`);
		secGrowth += 2;
	}
	if (V.ACitizens + V.ASlaves <= 5000) {
		r.push(`The small number of residents makes their job easier.`);
		secGrowth += 2;
	} else if (V.ACitizens + V.ASlaves <= 7500) {
		r.push(`The fairly low number of residents makes their job a little easier.`);
		secGrowth += 1;
	} else if (V.ACitizens + V.ASlaves <= 10000) {
		r.push(`The fairly high number of residents makes their job a little harder.`);
		secGrowth -= -0.5;
	} else if (V.ACitizens + V.ASlaves <= 15000) {
		r.push(`The high number of residents makes their job harder.`);
		secGrowth -= 1;
	} else {
		r.push(`The extremely high number of residents makes their job a lot harder.`);
		secGrowth -= 2;
	}
	if (V.SecExp.edicts.weaponsLaw == 3) {
		r.push(`The completely free flow of weapons in your arcology makes security quite a bit more challenging.`);
		secGrowth -= 1.5;
	} else if (V.SecExp.edicts.weaponsLaw == 2) {
		r.push(`The somewhat lax flow of weapons makes securing ${V.arcologies[0].name} moderately harder.`);
		secGrowth -= 1;
	} else if (V.SecExp.edicts.weaponsLaw == 1) {
		r.push(`The restrictive nature of your weapon laws leaves few instances of violent crime that security has to deal with.`);
		secGrowth = 0;
	} else {
		r.push(`Your complete ban on weapons makes securing your arcology significantly easier.`);
		secGrowth += 1.5;
	}
	if (immigration >= 0 && emigration === 0) {
		if (immigration < 50) {
			r.push(`The limited number of immigrants that reached the arcology this week does not have any serious impact on the efficiency of current security measures.`);
			secGrowth += 0.5;
		} else if (immigration < 150) {
			r.push(`The number of immigrants that reached the arcology this week is high enough to complicate security protocols.`);
			secGrowth -= 0.2;
		} else if (immigration < 300) {
			r.push(`The high number of immigrants that reached the arcology this week complicates security protocols.`);
			secGrowth -= 0.5;
		} else if (immigration < 500) {
			r.push(`The high number of immigrants that reached the arcology this week severely complicates security protocols.`);
			secGrowth -= 1;
		} else {
			r.push(`The extremely high number of immigrants that reached the arcology this week severely complicates security protocols.`);
			secGrowth -= 2;
		}
	}
	if (V.visitors < 300) {
		r.push(`The limited number of visitors coming and going did not have any serious impact on the efficiency of current security measures.`);
		secGrowth += 0.5;
	} else if (immigration < 750) {
		r.push(`The number of visitors coming and going somewhat complicates security protocols.`);
		secGrowth -= 0.2;
	} else if (immigration < 1500) {
		r.push(`The high number of visitors coming and going complicates security protocols.`);
		secGrowth -= 0.5;
	} else if (immigration < 2500) {
		r.push(`The high number of visitors coming and going greatly complicates security protocols.`);
		secGrowth -= 1;
	} else {
		r.push(`The extremely high number of visitors coming and going severely complicates security protocols.`);
		secGrowth -= 2;
	}
	if (emigration !== 0 && immigration === 0) {
		if (emigration < 100) {
			r.push(`The limited reduction in citizens this week does not have any serious impact on the efficiency of current security measures.`);
			secGrowth += 0.5;
		} else if (emigration < 300) {
			r.push(`The reduction in citizens this week is high enough to complicate security protocols.`);
			secGrowth -= 0.2;
		} else if (emigration < 600) {
			r.push(`The large reduction in citizens this week complicates security protocols.`);
			secGrowth -= 0.5;
		} else if (emigration < 1000) {
			r.push(`The huge reduction in citizens this week severely complicates security protocols.`);
			secGrowth -= 1;
		} else {
			r.push(`The extreme reduction in citizens this week severely complicates security protocols.`);
			secGrowth -= 2;
		}
	}
	if (V.SecExp.core.crimeLow < 20) {
		r.push(`Crime is a distant problem in the arcology, which makes improving security easier.`);
		secGrowth += 1;
	} else if (V.SecExp.core.crimeLow < 40) {
		r.push(`Crime is a minor problem in the arcology, not serious enough to disrupt security efforts.`);
	} else if (V.SecExp.core.crimeLow < 60) {
		r.push(`Crime is an issue in the arcology, which makes improving security harder.`);
		secGrowth -= 0.5;
	} else if (V.SecExp.core.crimeLow < 80) {
		r.push(`Crime is an overbearing problem in the arcology, which makes improving security a lot harder.`);
		secGrowth -= 1;
	} else {
		r.push(`Crime is sovereign in the arcology, which makes improving security extremely difficult.`);
		secGrowth -= 2;
	}
	if (V.SecExp.core.authority < 5000) {
		r.push(`The low authority you hold on the arcology hampers the efforts of your security department.`);
		secGrowth -= 1;
	} else if (V.SecExp.core.authority < 7500) {
		r.push(`The limited authority you hold on the arcology hampers the efforts of your security department.`);
		secGrowth -= 0.5;
	} else if (V.SecExp.core.authority < 10000) {
		r.push(`The authority you hold on the arcology does not significantly impact the efforts of your security department.`);
	} else if (V.SecExp.core.authority < 15000) {
		r.push(`The high authority you hold on the arcology facilitates the security department's work.`);
		secGrowth += 0.5;
	} else {
		r.push(`The absolute authority you hold on the arcology makes the security department's work a lot easier.`);
		secGrowth += 1;
	}
	if (activeUnits >= 6) {
		r.push(`Your military is the size of a small army. Security is easier to maintain with such forces at your disposal.`);
		secGrowth += 0.5;
	}
	if (V.SecExp.battles.victories + V.SecExp.battles.losses >= 1) {
		if (V.SecExp.battles.lastEncounterWeeks < 3) {
			r.push(`The recent attack has a negative effect on the security of the arcology.`);
			secGrowth -= 1;
		} else if (V.SecExp.battles.lastEncounterWeeks < 5) {
			r.push(`While some time has passed, the last attack still has a negative effect on the security of the arcology.`);
			secGrowth -= 0.5;
		} else {
			r.push(`The arcology has not been attacked in a while, which has a positive effect on security.`);
			secGrowth += 0.5;
		}
	}

	if (V.SecExp.buildings.transportHub) {
		secGrowth -= (V.SecExp.buildings.transportHub.airport + V.SecExp.buildings.transportHub.surfaceTransport - V.SecExp.buildings.transportHub.security * 3) / 2;
		r.push(`The transport hub, for all its usefulness, is a hotspot of malicious`);
		if (V.SecExp.buildings.transportHub.airport + V.SecExp.buildings.transportHub.surfaceTransport > V.SecExp.buildings.transportHub.security * 3) {
			r.push(`activity and hub security forces are not sufficient to keep up with all threats.`);
		} else {
			r.push(`activity, but the hub security forces are up to the task.`);
		}
	}

	if (V.SecExp.buildings.propHub && V.SecExp.buildings.propHub.upgrades.blackOps > 0) {
		r.push(`Your black ops team proves to be a formidable tool against anyone threatening the security of your arcology.`);
		secGrowth += 0.5 * random(1, 2);
	}

	const assistantDamaged = App.Mods.SecExp.updateFacilityDamage("assistant");
	r.push(assistantDamaged.text);
	secGrowth -= assistantDamaged.security;
	crimeGrowth += assistantDamaged.crime;

	if (V.SF.Toggle && V.SF.Active >= 1) {
		if (V.SecExp.edicts.SFSupportLevel >= 3) {
			r.push(`The two squads of ${V.SF.Lower} assigned to the Security HQ provide an essential help to the security department.`);
		}
		if (V.SecExp.edicts.SFSupportLevel >= 2) {
			r.push(`The training officers of ${V.SF.Lower} assigned to the Security HQ improve its effectiveness.`);
		}
		if (V.SecExp.edicts.SFSupportLevel >= 1) {
			r.push(`Providing your Security Department with equipment from ${V.SF.Lower} slightly boosts the security of your arcology.`);
		}
		secGrowth *= 1+(V.SecExp.edicts.SFSupportLevel/10);
	}

	let secRest = App.Mods.SecExp.Check.secRestPoint() * (Math.clamp(V.SecExp.buildings.secHub ? V.SecExp.buildings.secHub.menials : 0, 0, App.Mods.SecExp.Check.reqMenials()) / App.Mods.SecExp.Check.reqMenials());
	secRest = Math.max(20, secRest);
	if (secRest < App.Mods.SecExp.Check.reqMenials() && V.SecExp.buildings.secHub) {
		r.push(`The limited staff assigned to the HQ hampered the improvements to security achieved this week.`);
	} else if (secRest < App.Mods.SecExp.Check.reqMenials()) {
		r.push(`The limited infrastructure available slowly erodes away the security level of the arcology.`);
	}

	r.push(`The security level of the arcology is`);
	if (V.SecExp.core.security > (secRest + 5)) {
		r.push(`over its effective resting point, limiting the achievable growth this week.`);
		secGrowth *= 0.5;
	} else if (V.SecExp.core.security < (secRest - 5)) {
		r.push(`under its effective resting point, speeding up its growth.`);
		secGrowth *= 1.5;
	} else if (V.SecExp.core.security === secRest) {
		r.push(`at its effective resting point, this severely limits the influence of external factors on the change achievable this week.`);
		secGrowth *= 0.3;
	} else {
		r.push(`near its effective resting point, this severely limits the influence of external factors on the change achievable this week.`);
		if (secGrowth < 0) {
			secGrowth *= 0.3;
		}
	}

	const restGrowth = (secRest - V.SecExp.core.security) * 0.2;
	const newSec = Math.trunc(V.SecExp.core.security + secGrowth + restGrowth);
	if (newSec < V.SecExp.core.security) {
		r.push(`This week <span class="red">security decreased.</span>`);
	} else if (newSec === V.SecExp.core.security) {
		r.push(`This week <span class="yellow">security did not change.</span>`);
	} else {
		r.push(`This week <span class="green">security improved.</span>`);
	}
	V.SecExp.core.security = Math.clamp(newSec, 0, 100);

	r.push(`<br><br><strong>Crime</strong>:`);
	r.push(`Due to the deterioration of the old world countries, organized crime focuses more and more on the prosperous Free Cities, yours included. This has a`);
	if (V.week < 30) {
		r.push(`small`);
		crimeGrowth += 0.5;
	} else if (V.week < 60) {
		r.push(`noticeable`);
		crimeGrowth += 1;
	} else if (V.week < 90) {
		r.push(`moderate`);
		crimeGrowth += 1.5;
	} else if (V.week < 120) {
		r.push(`big`);
		crimeGrowth += 2;
	} else {
		r.push(`huge`);
		crimeGrowth += 2.5;
	}
	r.push(`impact on the growth of criminal activities in your arcology.`);

	if (V.arcologies[0].prosperity < 50) {
		r.push(`The low prosperity of the arcology facilitates criminal recruitment and organization.`);
		crimeGrowth += 1;
	} else if (V.arcologies[0].prosperity < 80) {
		r.push(`The fairly low prosperity of the arcology facilitates criminal recruitment and organization.`);
		crimeGrowth += 0.5;
	} else if (V.arcologies[0].prosperity < 120) {
		r.push(`The prosperity of the arcology is not high or low enough to have significant effects on criminal recruitment and organization.`);
	} else if (V.arcologies[0].prosperity < 160) {
		r.push(`The prosperity of the arcology is high enough to provide its citizens a decent life, hampering criminal recruitment and organization.`);
		crimeGrowth -= 0.5;
	} else if (V.arcologies[0].prosperity < 180) {
		r.push(`The prosperity of the arcology is high enough to provide its citizens a decent life, significantly hampering criminal recruitment and organization.`);
		crimeGrowth -= 1;
	} else {
		r.push(`The prosperity of the arcology is high enough to provide its citizens a very good life, significantly hampering criminal recruitment and organization.`);
		crimeGrowth -= 2;
	}
	if (V.ASlaves < 1000) {
		r.push(`The low number of slaves in the arcology does not hinder the activity of law enforcement, limiting crime growth.`);
		crimeGrowth -= 1;
	} else if (V.ASlaves < 2000) {
		r.push(`The fairly low number of slaves in the arcology does not hinder significantly the activity of law enforcement, limiting crime growth.`);
		crimeGrowth -= 0.5;
	} else if (V.ASlaves < 3000) {
		r.push(`The number of slaves in the arcology is becoming an impediment for law enforcement, facilitating crime growth.`);
		crimeGrowth += 1;
	} else {
		r.push(`The number of slaves in the arcology is becoming a big issue for law enforcement, facilitating crime growth.`);
		crimeGrowth += 1.5;
	}
	if (V.SecExp.core.security <= 20) {
		r.push(`The security measures in place are severely limited, allowing crime to grow uncontested.`);
	} else if (V.SecExp.core.security <= 50) {
		r.push(`The security measures in place are of limited effect and use, giving only mixed results in their fight against crime.`);
		crimeGrowth -= 1.5;
	} else if (V.SecExp.core.security <= 75) {
		r.push(`The security measures in place are well developed and effective, making a serious dent in the profitability of criminal activity in your arcology.`);
		crimeGrowth -= 3;
	} else {
		r.push(`The security measures in place are extremely well developed and very effective, posing a serious threat even to the most powerful criminal organizations in existence.`);
		crimeGrowth -= 5.5;
	}
	if (V.SecExp.core.authority < 5000) {
		r.push(`Your low authority allows crime to grow undisturbed.`);
		crimeGrowth += 1;
	} else if (V.SecExp.core.authority < 7500) {
		r.push(`Your relatively low authority facilitates criminal activities.`);
		crimeGrowth += 0.5;
	} else if (V.SecExp.core.authority < 10000) {
		r.push(`Your authority is not high enough to discourage criminal activity.`);
	} else if (V.SecExp.core.authority < 15000) {
		r.push(`Your high authority is an effective tool against crime.`);
		crimeGrowth -= 1;
	} else {
		r.push(`Your absolute authority is an extremely effective tool against crime.`);
		crimeGrowth -= 2;
	}
	if (V.cash >= 100000) {
		r.push(`Your great wealth acts as a beacon for the greediest criminals, calling them to your arcology as moths to a flame.`);
		crimeGrowth += 0.5;
	}
	if (V.SecExp.buildings.propHub && V.SecExp.buildings.propHub.upgrades.marketInfiltration > 0) {
		crimeGrowth += 0.5 * random(1, 2);
	}

	const crimeCap = Math.trunc(Math.clamp(App.Mods.SecExp.Check.crimeCap() + (App.Mods.SecExp.Check.crimeCap() - App.Mods.SecExp.Check.crimeCap() * ((V.SecExp.buildings.secHub ? V.SecExp.buildings.secHub.menials : 0) / App.Mods.SecExp.Check.reqMenials())), 0, 100));
	if (V.SecExp.buildings.secHub) {
		if (crimeCap > App.Mods.SecExp.Check.crimeCap()) {
			r.push(`The limited staff assigned to the HQ allows more space for criminals to act.`);
		}
		if (V.SecExp.buildings.secHub.coldstorage < 6) {
			if (V.SecExp.core.authority > 12000) {
				if (V.SecExp.buildings.secHub.coldstorage === 0) {
					r.push(`Adding a facility`);
				} else {
					r.push(`Improving the cold storage facility attached`);
				}
				r.push(`to the SecurityHQ should allow the staff to be more efficient in dealing with crime.`);
			}
		} else {
			r.push(`The cold storage facility attached to SecurityHQ allows the staff to be more efficient in dealing with crime.`);
		}
	}
	const newCrime = Math.trunc(Math.clamp(V.SecExp.core.crimeLow + crimeGrowth, 0, crimeCap));
	if (newCrime > V.SecExp.core.crimeLow) {
		r.push(`This week <span class="red">crime increased.</span>`);
	} else if (newCrime === V.SecExp.core.crimeLow) {
		r.push(`This week <span class="yellow">crime did not change.</span>`);
	} else {
		r.push(`This week <span class="green">crime decreased.</span>`);
	}
	V.SecExp.core.crimeLow = Math.clamp(newCrime, 0, 100);

	if (V.SecExp.edicts.defense.militia >= 1 || activeUnits >= 1) {
		r.push(`<br><br> <strong>Military</strong>:`);
		if (V.SecExp.edicts.defense.militia >= 1) {
			let recruitsMultiplier = 1;
			let recruitLimit = 0;
			let adjust;

			const SF = App.Mods.SecExp.assistanceSF('security', 'militia');
			r.push(SF.text); recruitsMultiplier += SF.bonus;

			const propagandaEffects = App.Mods.SecExp.propagandaEffects("recruitment");
			r.push(propagandaEffects.text);
			recruitsMultiplier *= (1 + propagandaEffects.effect);
			if (V.SecExp.edicts.defense.militia === 2) {
				r.push(`Your militia accepts only volunteering citizens, ready to defend their arcology.`);
				recruitLimit = App.Mods.SecExp.militiaCap(); adjust = 0.0025;
				if (V.rep >= 10000) {
					r.push(`Many citizens volunteer just to fight for someone of your renown.`);
					recruitLimit += adjust;
				}
				if (V.SecExp.core.authority >= 10000) {
					r.push(`Many citizens feel it is their duty to fight for you, boosting volunteer enrollment.`);
					recruitLimit += adjust;
				}
			} else if (V.SecExp.edicts.defense.militia === 3) {
				r.push(`Adult citizens are required to join the militia for a period of time.`);
				recruitLimit = App.Mods.SecExp.militiaCap(); adjust = 0.005;
			} else if (V.SecExp.edicts.defense.militia === 4) {
				r.push(`Adult citizens are required to register and serve in the militia whenever necessary.`);
				recruitLimit = App.Mods.SecExp.militiaCap(); adjust = 0.01;
			} else if (V.SecExp.edicts.defense.militia === 5) {
				r.push(`Every citizen is required to train and participate in the military activities of the arcology.`);
				recruitLimit = App.Mods.SecExp.militiaCap(); adjust = 0.02;
			}
			if (V.SecExp.edicts.defense.lowerRequirements === 1) {
				r.push(`Your lax physical requirements to enter the militia allows for a greater number of citizens to join.`);
				recruitLimit += adjust;
			}
			if (V.SecExp.edicts.defense.militia >= 3) {
				if (V.SecExp.edicts.defense.militaryExemption === 1) {
					r.push(`Some citizens prefer to contribute to the arcology's defense through financial support rather than military service, making you <span class="yellowgreen">a small sum.</span>`);
					recruitLimit -= adjust;
					cashX(250, "securityExpansion");
				}
				if (V.SecExp.edicts.defense.noSubhumansInArmy === 1) {
					r.push(`Guaranteeing the purity of your armed forces comes with a small loss of potential recruits.`);
					recruitLimit -= adjust;
				}
				if (V.SecExp.edicts.defense.pregExemption === 1) {
					r.push(`Many pregnant citizens prefer to avoid military service not to endanger themselves and their children.`);
					recruitLimit -= adjust;
				}
			}

			const recruits = Math.trunc((recruitLimit * V.ACitizens - App.Mods.SecExp.Manpower.totalMilitia) / 20 * recruitsMultiplier);
			if (recruits > 0) {
				V.SecExp.units.militia.free += recruits;
				r.push(`This week ${recruits} citizens joined the militia.<br>`);
			} else if (V.SecExp.edicts.defense.militia === 5) {
				r.push(`No citizens joined your militia this week because your society is as militarized as it can get.<br>`);
			} else if (V.SecExp.edicts.defense.militia === 2) {
				r.push(`There are no more citizens willing to join the arcology armed forces. You'll need to enact higher recruitment edicts if you need more manpower.<br>`);
			} else {
				r.push(`No more citizens could be drafted into your militia. You'll need to enact higher recruitment edicts if you need more manpower.<br>`);
			}
		}

		if (V.mercenaries >= 1) { // mercs
			let newMercs = random(0, 3);
			if (V.rep < 6000) {
				r.push(`Your low reputation turns some mercenaries away, hoping to find contracts that would bring them more renown.`);
				newMercs -= 1;
			} else if (V.rep < 12000) {
				r.push(`Your reputation is not high enough to attract many mercenaries to your free city.`);
			} else {
				r.push(`Your reputation attracts many guns for hire who would be proud to have such distinct character on their resume.`);
				newMercs += 1;
			}
			if (V.arcologies[0].prosperity < 50) {
				r.push(`The low prosperity of the arcology discourages new guns for hire from coming to your arcology.`);
				newMercs -= 1;
			} else if (V.arcologies[0].prosperity < 80) {
				r.push(`The fairly low prosperity of the arcology discourages new guns for hire from coming to your arcology.`);
				newMercs += 1;
			} else if (V.arcologies[0].prosperity < 120) {
				r.push(`The prosperity of the arcology attracts a few mercenaries, hopeful to find lucrative contracts within its walls.`);
				newMercs += random(1, 2);
			} else if (V.arcologies[0].prosperity < 160) {
				r.push(`The fairly high prosperity of the arcology attracts some mercenaries, hopeful to find lucrative contracts within its walls.`);
				newMercs += random(2, 3);
			} else if (V.arcologies[0].prosperity < 180) {
				r.push(`The high prosperity of the arcology is attracts some mercenaries, hopeful to find lucrative contracts within its walls.`);
				newMercs += random(2, 4);
			} else {
				r.push(`The very high prosperity of the arcology attracts a lot of mercenaries, hopeful to find lucrative contracts within its walls.`);
				newMercs += random(3, 5);
			}
			if (V.SecExp.core.crimeLow > 60) {
				r.push(`The powerful crime organizations that nested themselves in the arcology have an unending need for cheap guns for hire, many mercenaries flock to your free city in search of employment.`);
				newMercs += random(1, 2);
			}

			const SF = App.Mods.SecExp.assistanceSF('security', 'mercs');
			r.push(SF.text); newMercs += SF.bonus;

			if (V.SecExp.edicts.defense.discountMercenaries > 0) {
				r.push(`More mercenaries are attracted to your arcology as a result of the reduced rent.`);
				newMercs += random(2, 4);
			}
			newMercs = Math.trunc(newMercs / 2);
			if (newMercs > 0) {
				V.SecExp.units.mercs.free += newMercs;
				r.push(`This week ${newMercs} mercenaries reached the arcology.<br>`);
			} else {
				r.push(`This week no new mercenaries reached the arcology.<br>`);
			}
			V.SecExp.units.mercs.free = Math.clamp(V.SecExp.units.mercs.free, 0, 2000);
		}

		if (activeUnits > 0 && App.Mods.SecExp.unit.squads("human").length > 0) { // loyalty and training
			for (const squad of App.Mods.SecExp.unit.squads("human")) {
				r.push(App.Mods.SecExp.humanLoyaltyChanges(squad));
			}
		}
	}

	if (V.SecExp.buildings.riotCenter && V.SecExp.buildings.riotCenter.brainImplantProject > 0 && V.SecExp.buildings.riotCenter.brainImplant < 106) {
		r.push(`<br><br>`);
		V.SecExp.buildings.riotCenter.brainImplant += V.SecExp.buildings.riotCenter.brainImplantProject;
		if (100 - V.SecExp.buildings.riotCenter.brainImplant <= 0) {
			r.push(`The project has been completed!`);
			V.SecExp.buildings.riotCenter.brainImplant = 106;
		} else {
			r.push(`The great brain implant project is proceeding steadily. This week we made`);
			if (V.SecExp.buildings.riotCenter.brainImplantProject <= 2) {
				r.push(`some small progress.`);
			} else if (V.SecExp.buildings.riotCenter.brainImplantProject <= 4) {
				r.push(`some progress.`);
			} else {
				r.push(`good progress.`);
			}
		}
	}

	if (V.SecExp.buildings.weapManu) {
		if (App.Mods.SecExp.weapManu.completed()) {
			delete V.SecExp.buildings.weapManu.upgrades.queue;
		}
		if (V.SecExp.buildings.weapManu.upgrades.queue) {
			for (let item = 0; item < V.SecExp.buildings.weapManu.upgrades.queue.length; item++) {
				const currentItem = V.SecExp.buildings.weapManu.upgrades.queue[item];
				Object.assign(currentItem, App.Mods.SecExp.weapManu.current(currentItem.ID));
				if (item === 0) {
					currentItem.time--;
					r.push(`<br>In the research lab, ${currentItem.dec} ${[-3, -2, 1, 2, 4, 5, 6].includes(currentItem.ID) ? 'are' : 'is'} being developed with the aim of enhancing ${currentItem.unit}' ${currentItem.purpose}.`);
					if (currentItem.time <= 0) {
						r.push(`Reports indicate it is ready for deployment and will be issued in the following days.`);
						V.SecExp.buildings.weapManu.upgrades.completed.push(currentItem.ID);
						V.SecExp.buildings.weapManu.upgrades.queue.splice(0, 1);
					} else {
						r.push(`It will be finished in ${numberWithPluralOne(currentItem.time, "week")}.`);
					}
				} else {
					r.push(`<br>${ordinalSuffix(item + 1)} in queue: ${currentItem.dec} for ${currentItem.unit}. It will enhance their ${currentItem.purpose}.`);
				}
			}
		}
	}

	if (V.SecExp.settings.battle.enabled > 0 && App.Mods.SecExp.unit.squads().length > 0) {
		App.Mods.SecExp.generator.attack();
	}

	const frag = new DocumentFragment();
	$(frag).append(...App.Events.spaceSentences(r));
	return frag;
};
