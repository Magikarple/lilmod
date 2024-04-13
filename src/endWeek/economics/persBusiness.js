/**
 * @returns {HTMLElement}
 */
App.EndWeek.personalBusiness = function() {
	const el = document.createElement("p");
	let r = [];
	let he;
	let him;
	let income;
	let cal;
	let X;
	let windfall;
	let upgradeCount;
	let dataGain;
	let hindranceMod = isHinderedDegree(V.PC);
	const nymphoMod = isPlayerLusting() ? .75 : 1;
	const {girlP} = getPronouns(V.PC).appendSuffix("P");
	if (V.useTabs === 0) {
		App.UI.DOM.appendNewElement("h2", el, `Personal Business`);
	}

	if (V.cash < 0) {
		const interest = 1 + Math.trunc(Math.abs(V.cash) / 100);
		cashX(forceNeg(interest), "personalBusiness");
		r.push(`<span class="red">You are in debt.</span> This week, interest came to ${cashFormat(interest)}.`);
		if (FutureSocieties.isActive('FSRomanRevivalist')) {
			r.push(`Society <span class="red">very strongly disapproves</span> of your being in debt; this damages the idea that you model yourself on what a Roman leader should be.`);
			FutureSocieties.Change("Roman Revivalist", -10);
		}
		if (V.cash < 0 && V.cash > -25000 && V.arcologies[0].FSRestartDecoration === 100) {
			if (V.eugenicsFullControl !== 1) {
				r.push(`Money is quickly shifted to bring you out of debt, though <span class="red">the Societal Elite are left doubting</span> your worth.`);
				V.cash = 0;
				V.failedElite += 100;
			} else {
				r.push(`Money is quickly shifted to bring you out of debt, though the Societal Elite grumble all the while.`);
				V.cash = 0;
			}
		} else if (V.cash < -9000) {
			r.push(`<span class="red">WARNING: you are dangerously indebted.</span>`);
			if (V.debtWarned > 0) {
				V.gameover = "debt";
				V.nextLink = "Gameover";
				r.push(`Another slaveholder purchased your debt this week, and it doesn't look like you're getting out of this safely.`);
			} else {
				V.debtWarned++;
				r.push(`Immediately acquire more liquid assets or you will be in danger of being enslaved yourself.`);
			}
		}
	}
	if (V.mods.food.enabled && V.mods.food.market) {
		if (V.mods.food.amount < App.Facilities.Farmyard.foodConsumption() && V.cash < (App.Facilities.Farmyard.foodConsumption() * V.mods.food.cost)) {
			r.push(`<span class="red">WARNING: your arcology will starve in the coming week unless action is taken.</span>`);
			if (V.mods.food.warned) {
				V.gameover = "starving citizens";
				V.nextLink = "Gameover";
			} else {
				V.mods.food.warned = true;
				r.push(
					`Immediately purchase more food or acquire enough capital to purchase the required amount.`,
					`You can also renege on your deal to provide a marketplace for food, but your citizens may hate you for it.`,
				);
			}
		}
	}
	if (onBedRest(V.PC, true)) {
		if (V.PC.majorInjury > 0) {
			r.push(`You're stuck in bed`);
			if (V.PC.majorInjury === 1) {
				r.push(`recovering from your injuries, but you're starting to feel like your old self again. You should be <span class="green">fully healed</span> by the end of the week.`);
			} else {
				r.push(`with your injuries for another`);
				if (V.PC.majorInjury === 2) {
					r.push(`week,`);
				} else {
					r.push(`${V.PC.majorInjury - 1} weeks,`);
				}
				r.push(`according to`);
				if (V.doctor.state > 0) {
					r.push(`your doctor.`);
				} else {
					r.push(`the doctor that treated you.`);
				}
			}
		} else if (V.PC.health.condition < -90) {
			r.push(`You're so physically unwell that you are at risk of death.`);
			if (V.personalAttention.task === PersonalAttention.RELAX) {
				r.push(`You ache too much to really relax, but the additional rest will do you good.`);
				improveCondition(V.PC, 5);
			} else {
				r.push(`Until you recover, you won't be focusing on anything else.`);
			}
		} else if (V.PC.preg > V.PC.pregData.normalBirth / 1.05 && V.PC.pregControl !== GestationDrug.LABOR) { // consider if the player should be able to ignore contractions
			r.push(`You focus on getting ready to give birth this week; when it happens, you want to be prepared.`);
		} else if (isInduced(V.PC)) {
			r.push(`This week, you focus on your labor and the impending birth of your ${V.PC.pregType > 1 ? "children" : "child"}.`);
		} else if (V.PC.geneMods.rapidCellGrowth !== 1 && V.PC.bellyPreg >= 100000 && V.PC.belly > (V.PC.pregAdaptation * 3200) && (V.PC.bellyPreg >= 500000 || V.PC.wombImplant !== "restraint")) {
			r.push(`You're stuck in bed waiting to pop. Hopefully this means giving birth, and not the alternative.`);
		}
	} else if (V.personalAttention.task === PersonalAttention.WHORING) {
		whoring();
	} else if (V.personalAttention.task === PersonalAttention.MAID) {
		maid();
	} else if (V.personalAttention.task === PersonalAttention.RELAX) {
		relax();
	} else if (V.personalAttention.task === PersonalAttention.SEX) {
		// TODO: Add small comment about keeping libido in check. Make sure to tie this into that function. Add .energy increase where need is handled.
	} else if (V.personalAttention.task === PersonalAttention.SURVEY) {
		if (!onBedRest(V.PC)) {
			r.push(`This week you focus on surveying your defenses in person, <span class="green">making yourself more known throughout ${V.arcologies[0].name}.</span>`);
			repX(50 * hindranceMod * V.PC.skill.warfare, "personalBusiness");
			if (V.PC.skill.warfare < 100) {
				r.push(`${IncreasePCSkills('warfare', 0.5)}`);
			}
		} else {
			r.push(`This week you utilize a drone to tour ${V.arcologies[0].name}'s defenses. <span class="green">Your efforts to secure your domain do not go unnoticed,</span> but your inability to do so in person stops it from making a lasting impact.`);
			repX(10 * V.PC.skill.warfare, "personalBusiness");
			if (V.PC.skill.warfare < 100) {
				r.push(`${IncreasePCSkills('warfare', 0.1)}`);
			}
		}
	} else if (V.personalAttention.task === PersonalAttention.DEVELOPMENT) {
		if ((V.arcologies[0].prosperity + 1 * (1 + Math.ceil(V.PC.skill.engineering / 100))) < V.AProsperityCap) {
			r.push(`This week you focus on contributing to a local development project, <span class="green">boosting prosperity.</span>`);
			V.arcologies[0].prosperity += 1 * (1 + Math.ceil(V.PC.skill.engineering / 100));
			if (V.PC.skill.engineering < 100) {
				r.push(`${IncreasePCSkills('engineering', 0.5)}`);
			}
		} else {
			r.push(`Contributing to a local development project this week <span class="yellow">would be futile.</span>`);
			App.PersonalAttention.reset();
		}
	} else if (V.personalAttention.task === PersonalAttention.PROCLAMATION) {
		/* handled after this if chain */
	} else if (V.personalAttention.task === PersonalAttention.SMUGGLING) {
		smuggling();
	} else if (V.personalAttention.task === PersonalAttention.TECH) {
		windfall = Math.trunc((150 * V.PC.skill.hacking) + random(100, 2500));
		X = 0;
		let catchTChance = Math.max(5, Math.floor((((V.PC.skill.hacking + 100) / 200) ** 0.9) * 100));
		r.push(`This week your services to the highest bidder earned you <span class="yellowgreen">${cashFormat(windfall)}.</span>`);
		if (random(0, 100) >= catchTChance) {
			r.push(`However, since the source of the attack was traced back to your arcology, your`);
			if (V.secExpEnabled > 0) {
				X = 1;
				r.push(`<span class="red">authority,</span>`);
				App.Mods.SecExp.authorityX(random(-100, -500));
				r.push(`<span class="red">crime rate</span>`);
				V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow + random(10, 25), 0, 100);
				r.push(`and`);
			}
			r.push(`<span class="red">reputation</span>`);
			repX(forceNeg(random(50, 500)), "event");
			if (X !== 1) {
				r.push(`has`);
			} else {
				r.push(`have all`);
			}
			r.push(`been negatively affected.`);
		}
		if (V.PC.skill.hacking < 100) {
			r.push(`${IncreasePCSkills('hacking', 0.5)}`);
		}
		cashX(windfall, "personalBusiness");
	} else if ((V.cash > 1000) && (V.personalAttention.task === PersonalAttention.BUSINESS)) {
		business();
	} else if (V.cash > 1000) {
		income = Math.trunc(Math.min(3000 * Math.log(V.cash), V.cash * 0.07));
		r.push(`This week, your business endeavors made you <span class="yellowgreen">${cashFormat(income)}.</span>`);
		cashX(income, "personalBusiness");
	} else {
		r.push(`You have enough cash to manage your affairs, but not enough to do much business.`);
	}

	if (V.personalAttention.task === PersonalAttention.PROCLAMATION) {
		if ((V.SecExp.proclamation.currency === "authority" && V.SecExp.core.authority >= 2000) || (V.SecExp.proclamation.currency === "reputation" && V.rep >= 4000) || (V.SecExp.proclamation.currency === "cash" && V.cash >= 8000)) {
			r.push(`After several days of preparation you are ready to issue the proclamation. You announce to the arcology your plans and in short order you use`);
			if (V.SecExp.proclamation.currency === "authority") {
				r.push(`control over the arcology`);
			} else if (V.SecExp.proclamation.currency === "reputation") {
				r.push(`great influence`);
			} else if (V.SecExp.proclamation.currency === "cash") {
				r.push(`vast financial means`);
			}
			r.push(`to`);
			if (V.SecExp.proclamation.type === "security") {
				r.push(`gather crucial information for your security department. In just a few hours, many holes are plugged and most moles are eliminated. <span class="green">Your security greatly increased.</span>`);
				V.SecExp.core.security = Math.clamp(V.SecExp.core.security + 25, 0, 100);
			} else if (V.SecExp.proclamation.type === "crime") {
				r.push(`force the arrest of many suspected citizens. Their personal power allowed them to avoid justice for a long time, but this day is their end. <span class="green">Your crime greatly decreased.</span>`);
				V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow - 25, 0, 100);
			}
			if (V.SecExp.proclamation.currency === "authority") {
				App.Mods.SecExp.authorityX(-2000);
			} else if (V.SecExp.proclamation.currency === "reputation") {
				repX(Math.clamp(V.rep - 2000, 0, 20000), "personalBusiness");
			} else {
				cashX(-8000, "personalBusiness");
			}
			V.SecExp.proclamation.cooldown = 4;
			App.PersonalAttention.reset();
		} else {
			r.push(`As you currently lack the minimum amount of your chosen proclamation currency, ${V.SecExp.proclamation.currency}, it would be unwise to attempt execution of your ${V.SecExp.proclamation.type} this week.`);
		}
	}

	training();

	if (V.policies.cashForRep === 1) {
		if (V.cash > 1000) {
			r.push(`This week you gave up business opportunities worth ${cashFormat(policies.cost())} to help deserving citizens, <span class="green">burnishing your reputation.</span>`);
			repX(1000, "personalBusiness");
			cashX(forceNeg(policies.cost()), "policies");
			if (V.PC.degeneracy > 1) {
				r.push(`This also helps <span class="green">offset any rumors</span> about your private actions.`);
				V.PC.degeneracy -= 1;
			}
		} else {
			r.push(`Money was too tight this week to risk giving up any business opportunities.`);
		}
	}
	if (V.policies.goodImageCampaign === 1) {
		if (V.cash > 5000) {
			r.push(`This week you paid ${cashFormat(policies.cost())} to have positive rumors spread about you, <span class="green">making you look`);
			if (V.PC.degeneracy > 1) {
				r.push(`good and weakening existing undesirable rumors.</span>`);
				V.PC.degeneracy -= 2;
			} else {
				r.push(`good.</span>`);
			}
			repX(500, "personalBusiness");
			cashX(forceNeg(policies.cost()), "policies");
		} else {
			r.push(`You lacked enough extra ¤ to pay people to spread positive rumors about you this week.`);
		}
	}
	if (V.rep > 20) {
		if (V.policies.cashForRep === -1) {
			r.push(`This week you used your position to secure business opportunities worth ${cashFormat(policies.cost())} at the expense of citizens, <span class="red">damaging your reputation.</span>`);
			repX(-20, "personalBusiness");
			cashX(policies.cost(), "personalBusiness");
		}
	}
	if (V.rep <= 18000) {
		if (V.policies.regularParties === 0) {
			if (V.rep > 3000) {
				r.push(`Your <span class="red">reputation is damaged</span> by your not`);
				r.push(App.UI.DOM.spanWithTooltip("hosting regular social events", "Regular Social Events is a domestic policy costing ¤5000 a week that you can adopt."));
				r.push(`for your leading citizens.`);
				repX(-50, "personalBusiness");
			} else {
				r.push(`Though you are not`);
				r.push(App.UI.DOM.spanWithTooltip("hosting regular social events", "Regular Social Events is a domestic policy costing ¤5000 a week that you can adopt."));
				r.push(`for your leading citizens, your lack of renown prevents this from damaging your reputation; they don't expect someone so relatively unknown to be throwing parties.`);
			}
		}
	}
	if (V.mods.food.enabled && V.mods.food.market) {
		if (V.mods.food.amount < App.Facilities.Farmyard.foodConsumption()) {
			const foodCost = (App.Facilities.Farmyard.foodConsumption() - V.mods.food.amount) * V.mods.food.cost;
			r.push(`You also spent ${cashFormat(Math.trunc(foodCost))} this week buying enough food to keep your citizens fed, as you promised.`);
			cashX(forceNeg(foodCost), "food");
		}
		V.mods.food.amount -= App.Facilities.Farmyard.foodConsumption();
	}
	App.Events.addParagraph(el, r);
	r = [];

	if (V.secExpEnabled > 0) {
		if (V.SecExp.smilingMan.progress === 10 && random(1, 100) >= 85) {
			r.push(`This week one of the offside adventures of The Smiling Man produced a copious amount of money, of which <span class="yellowgreen">you receive your share.</span>`);
			cashX(random(10, 20) * 1000, "personalBusiness");
		}

		if (V.SecExp.buildings.secHub && V.SecExp.edicts.sellData === 1) {
			upgradeCount = 0;
			upgradeCount += Object.values(V.SecExp.buildings.secHub.upgrades.security).reduce((a, b) => a + b);
			upgradeCount += Object.values(V.SecExp.buildings.secHub.upgrades.crime).reduce((a, b) => a + b);
			upgradeCount += Object.values(V.SecExp.buildings.secHub.upgrades.intel).reduce((a, b) => a + b);

			dataGain = upgradeCount * 200;
			if (!Number.isInteger(dataGain)) {
				r.push(App.UI.DOM.makeElement("div", `Error, dataGain is NaN`, "red"));
			} else {
				r.push(`You are selling the data collected by your security department, which earns a discreet sum of <span class="yellowgreen">${cashFormat(dataGain)}.</span>`);
				cashX(dataGain, "personalBusiness");
				r.push(`Many of your citizens are not enthusiastic of this however, <span class="red">damaging your authority.</span>`);
				App.Mods.SecExp.authorityX(-50);
			}
		}

		if (V.SecExp.buildings.propHub && V.SecExp.buildings.propHub.upgrades.marketInfiltration > 0) {
			const blackMarket = random(7000, 8000);
			r.push(`Your secret service makes use of black markets and illegal streams of goods to make a profit, making you <span class="yellowgreen">${cashFormat(blackMarket)}.</span> This however allows <span class="red">crime to flourish</span> in the underbelly of the arcology.`);
			V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow + random(1, 3), 0, 100);
			cashX(blackMarket, "personalBusiness");
		}

		const arcDamaged = App.Mods.SecExp.updateFacilityDamage("arc");
		r.push(arcDamaged.text);

		App.Events.addParagraph(el, r);

		if (V.SecExp.buildings.weapManu) {
			r = [];
			r.push(`The weapons manufacturing complex produces armaments`);
			if (V.SecExp.buildings.weapManu.productivity <= 2) {
				r.push(`at a steady pace.`);
			} else {
				r.push(`with great efficiency.`);
			}
			income = 0;
			const price = Math.trunc(Math.clamp(random(1, 2) + (V.arcologies[0].prosperity / 15) - (V.week / 30), 2, 8));
			const factoryMod = Math.round(1 + (V.SecExp.buildings.weapManu.productivity + V.SecExp.buildings.weapManu.lab) / 2 + (V.SecExp.buildings.weapManu.menials / 100));
			if (V.SecExp.buildings.weapManu.sellTo.citizen === 1) {
				if (V.SecExp.edicts.weaponsLaw === 3) {
					r.push(`Your lax regulations regarding weapons allows your citizens to buy much of what you are capable of producing.`);
					income += Math.round((V.ACitizens * 0.1) * price * factoryMod);
				} else if (V.SecExp.edicts.weaponsLaw >= 1) {
					r.push(`Your policies allow your citizen to buy your weaponry and they buy much of what you are capable of producing.`);
					income += Math.round(((V.ACitizens * 0.1) * price * factoryMod) / (3 - V.SecExp.edicts.weaponsLaw));
				} else {
					r.push(`Your policies do not allow your citizen to buy weaponry, thus all your income will come from exports.`);
				}
			}
			if (V.SecExp.buildings.weapManu.sellTo.raiders === 1) {
				r.push(`Some weapons are sold to the various raider gangs infesting the wastelands.`);
				income += Math.round(V.week / 3 * (price / 2) * 10 * factoryMod);
			}
			if (V.SecExp.buildings.weapManu.sellTo.oldWorld === 1) {
				r.push(`Part of our production is sold to some old world nations.`);
				income += Math.round(V.week / 3 * price * 10 * factoryMod);
			}
			if (V.SecExp.buildings.weapManu.sellTo.FC === 1) {
				r.push(`A share of our weapons production is sold to other Free Cities.`);
				income += Math.round(V.week / 3 * price * 10 * factoryMod);
			}
			if (V.peacekeepers.state === 3 && V.peacekeepers.strength >= 50) {
				r.push(`The peacekeeping force is always in need of new armaments and is happy to be supplied by their ally.`);
				income += Math.round(V.peacekeepers.strength * price * 10 * factoryMod);
			}
			income = Math.trunc(income * 0.5);
			r.push(`This week we made <span class="yellowgreen">${cashFormat(income)}.</span>`);
			if (!Number.isInteger(income)) {
				r.push(App.UI.DOM.makeElement("div", `Error failed to calculate income`, "red"));
			} else {
				cashX(income, "personalBusiness");
			}
			App.Events.addParagraph(el, r);
		}

		if (V.SecExp.edicts.taxTrade === 1) {
			const tradeTax = Math.ceil(V.SecExp.core.trade * random(80, 120));
			App.Events.addNode(
				el,
				[
					`Fees on transitioning goods this week made`,
					App.UI.DOM.makeElement("span", `${cashFormat(tradeTax)}.`, "yellowgreen")
				],
				"div"
			);
			cashX(Math.ceil(tradeTax), "personalBusiness");
		}
	}
	r = [];
	r.push(`Routine upkeep of your demesne costs <span class="yellow">${cashFormat(V.costs)}.</span>`);
	if (V.loans.length) {
		const loan = (/** @type {'bank'|'shark'} */ name) => V.loans.find(loan => loan.name === name);

		if (V.loans.some(loan => loan.name === 'bank')) {
			const bank = loan('bank');
			const full = bank.full;
			const installment = full / bank.installments;
			const sellable = V.building.findCells(cell => cell.canBeSold());

			if (V.cash > installment) {
				r.push(`You paid the credit union your weekly payment of <span class="yellow">${cashFormat(Math.trunc(installment))}</span> this week.`);
			} else {
				if (sellable) {
					r.push(`You were unable to afford your weekly payment of ${cashFormat(Math.trunc(installment))} to the credit union this week. As a result, one sector of your arcology has been repossessed and sold as per your signed contract.`);

					sellable.pluck().owner = 0;
				} else {
					// not technically possible, but just in case
					// Probably needs to be written better. Draw attention to the fact that the player is a minority shareholder in the arcology and thus should not be in control anyway.
					r.push(`You were unable to afford your weekly payment of ${cashFormat(Math.trunc(installment))} this week, and since you somehow have not been ousted over not owning any sectors for the credit union to repossess, your debt was instead put on auction and summarily purchased by another slaveholder.`);

					V.gameover = "debt";
					V.nextLink = "Gameover";
				}
			}

			cashX(forceNeg(installment), "loan");
			loan('bank').full -= installment;
			loan('bank').installments--;

			if (loan('bank').full > 0) {
				r.push(`You now have ${years(loan('bank').installments)} to pay off your remaining balance of ${cashFormat(Math.trunc(loan('bank').full))}.`);
			} else {
				r.push(`Congratulations! You have paid off your full balance.`);
			}

			if (loan('bank').full <= 0) {
				V.loans.delete(loan('bank'));
			}
		}
		if (V.loans.some(loan => loan.name === 'shark')) {
			const bank = V.loans.some(loan => loan.name === 'bank');
			const term = loan('shark').deadline - V.week;
			const full = loan('shark').full;

			r.push(`You ${bank ? `also ` : ``}still owe the local loanshark <span class="yellow">${cashFormat(Math.trunc(full))}.</span> You have ${years(term)} to pay the full amount.`);

			if (term === 1) {
				r.push(`The shark will send his men next week to collect on your loan if you don't pay during the week. <span class="red">Make sure you have his money ready.</span>`);
			} else if (term === 0) {
				r.push(`The shark will be sending his men this week to collect his money. <span class="red">Make sure you have it ready.</span>`);
			}
		}
	}
	if (V.plot === 1) {
		if (V.week > 10) {
			if (V.weatherToday.severity - V.weatherCladding > 2) {
				V.weatherAwareness = 1;
				let weatherRepairCost;
				if (V.weatherCladding === 1) {
					weatherRepairCost = Math.trunc(((V.weatherToday.severity - 3) * (V.arcologies[0].prosperity * random(50, 100))) + random(1, 100));
					IncreasePCSkills('engineering', 0.1);
					r.push(`${V.arcologies[0].name}'s hardened exterior only partially resisted the extreme weather this week, and it requires repairs costing <span class="yellow">${cashFormat(weatherRepairCost)}.</span> Your citizens are <span class="green">grateful</span> to you for upgrading ${V.arcologies[0].name} to provide a safe haven from the terrible climate.`);
					repX(500, "architecture");
				} else if (V.weatherCladding === 2) {
					weatherRepairCost = Math.trunc(((V.weatherToday.severity - 4) * (V.arcologies[0].prosperity * random(50, 100))) + random(1, 100));
					IncreasePCSkills('engineering', 0.1);
					r.push(`${V.arcologies[0].name}'s hardened exterior only partially resisted the extreme weather this week, and it requires repairs costing <span class="yellow">${cashFormat(weatherRepairCost)}.</span> Your citizens are <span class="green">grateful</span> to you for upgrading ${V.arcologies[0].name} to provide a safe haven from the terrible climate.`);
					repX(500, "architecture");
				} else {
					weatherRepairCost = Math.trunc(((V.weatherToday.severity - 2) * (V.arcologies[0].prosperity * random(50, 100))) + random(1, 100));
					IncreasePCSkills('engineering', 0.1);
					r.push(`Severe weather damaged the arcology this week, requiring repairs costing <span class="yellow">${cashFormat(weatherRepairCost)}.</span> Your citizens are <span class="red">unhappy</span> that the arcology has proven vulnerable to the terrible climate.`);
					repX(-50, "architecture");
				}
				if (V.cash > 0) {
					cashX(forceNeg(Math.trunc(weatherRepairCost)), "weather");
				} else if (V.arcologies[0].FSRestartDecoration === 100) {
					r.push(`Since you lack the resources to effect prompt repairs yourself, the Societal Elite cover for you. The arcology's prosperity is <span class="red">is damaged,</span> but your public reputation is left intact.`);
					if (V.eugenicsFullControl !== 1) {
						r.push(`The Societal Elite <span class="red">are troubled by your failure.</span>`);
						V.failedElite += 100;
					}
					if (V.arcologies[0].prosperity > 50) {
						V.arcologies[0].prosperity -= random(5, 10);
						IncreasePCSkills('engineering', 0.1);
					}
					cashX(forceNeg(Math.trunc(weatherRepairCost / 4)), "weather");
				} else {
					r.push(`Since you lack the resources to effect prompt repairs yourself, prominent citizens step in to repair their own parts of the arcology. This is <span class="red">terrible for your reputation,</span> and it also <span class="red">severely reduces the arcology's prosperity.</span>`);
					if (V.arcologies[0].prosperity > 50) {
						V.arcologies[0].prosperity -= random(5, 10);
						IncreasePCSkills('engineering', 0.1);
					}
					repX((Math.trunc(V.rep * 0.9)) - V.rep, "weather");
					r.push(`${IncreasePCSkills('engineering', 0.1)}`);
					cashX(forceNeg(Math.trunc(weatherRepairCost / 4)), "weather");
				}
			} else if (V.weatherToday.severity - V.weatherCladding <= 2) {
				if (V.weatherToday.severity > 2) {
					V.weatherAwareness = 1;
					r.push(`The arcology's hardened exterior resisted severe weather this week. Your citizens are <span class="green">grateful</span> to you for maintaining the arcology as a safe haven from the terrible climate.`);
					repX(500, "architecture");
				}
			}
		}
	}
	V.costs = Math.trunc(Math.abs(calculateCosts.bill()) * 100) / 100;
	/* overwrite the prediction and actually pay the bill. GetCost should return a negative. Round to two decimal places.*/
	if (isNaN(V.costs)) {
		r.push(App.UI.DOM.makeElement("div", `Error, costs is NaN`, "red"));
	}
	App.Events.addParagraph(el, r);

	/* Adding random changes to slave demand and supply*/
	endWeekSlaveMarket();
	r = [];
	if (V.menialDemandFactor <= -35000) {
		r.push(`Demand for slaves is approaching a <span class="red bold">historic low,</span> forecasts predict`);
		if (V.deltaDemand > 0) {
			r.push(`the market will turn soon and <span class="green bold">demand will rise.</span>`);
		} else if (V.deltaDemand < 0) {
			r.push(`<span class="red bold">demand will continue to weaken,</span> but warn the bottom is in sight.`);
		} else {
			r.push(`the current demand will <span class="yellow bold">stabilize.</span>`);
		}
	} else if (V.menialDemandFactor <= -20000) {
		r.push(`Demand for slaves is <span class="red bold">very low,</span> forecasts predict`);
		if (V.deltaDemand > 0) {
			r.push(`the market will turn soon and <span class="green bold">demand will rise.</span>`);
		} else if (V.deltaDemand < 0) {
			r.push(`<span class="red bold">demand will continue to weaken.</span>`);
		} else {
			r.push(`the current demand will <span class="yellow bold">stabilize.</span>`);
		}
	} else if (V.menialDemandFactor >= 35000) {
		r.push(`Demand for slaves is approaching a <span class="green bold">historic high,</span> forecasts predict`);
		if (V.deltaDemand > 0) {
			r.push(`<span class="green bold">demand will continue to rise,</span> but warn the peak is in sight.`);
		} else if (V.deltaDemand < 0) {
			r.push(`the market will turn soon and <span class="red bold">demand will weaken.</span>`);
		} else {
			r.push(`the current demand will <span class="yellow bold">stabilize.</span>`);
		}
	} else if (V.menialDemandFactor >= 20000) {
		r.push(`Demand for slaves is <span class="green bold">very high,</span> forecasts predict`);
		if (V.deltaDemand > 0) {
			r.push(`<span class="green bold">demand will continue to rise.</span>`);
		} else if (V.deltaDemand < 0) {
			r.push(`the market will turn soon and <span class="red bold">demand will weaken.</span>`);
		} else {
			r.push(`the current demand will <span class="yellow bold">stabilize.</span>`);
		}
	} else {
		r.push(`Demand for slaves is <span class="yellow bold">average,</span> forecasts predict`);
		if (V.deltaDemand > 0) {
			r.push(`the market will see <span class="green bold">rising demand.</span>`);
		} else if (V.deltaDemand < 0) {
			r.push(`the market will see <span class="red bold">weakening demand.</span>`);
		} else {
			r.push(`it will <span class="yellow bold">remain stable</span> for the coming months.`);
		}
	}
	App.Events.addParagraph(el, r);
	r = [];
	if (V.menialSupplyFactor <= -35000) {
		r.push(`Supply of slaves is approaching a <span class="green bold">historic low,</span> forecasts predict`);
		if (V.deltaSupply > 0) {
			r.push(`the market will turn soon and <span class="red bold">supply will rise.</span>`);
		} else if (V.deltaSupply < 0) {
			r.push(`<span class="green bold">supply will continue to weaken,</span> but warn the bottom is in sight.`);
		} else {
			r.push(`the current supply will <span class="yellow bold">stabilize.</span>`);
		}
	} else if (V.menialSupplyFactor <= -20000) {
		r.push(`Supply for slaves is <span class="green bold">very low,</span> forecasts predict`);
		if (V.deltaSupply > 0) {
			r.push(`the market will turn soon and <span class="red bold">supply will rise.</span>`);
		} else if (V.deltaSupply < 0) {
			r.push(`<span class="green bold">supply will continue to weaken.</span>`);
		} else {
			r.push(`the current supply will <span class="yellow bold">stabilize.</span>`);
		}
	} else if (V.menialSupplyFactor >= 35000) {
		r.push(`Supply for slaves is approaching a <span class="red bold">historic high,</span> forecasts predict`);
		if (V.deltaSupply > 0) {
			r.push(`<span class="red bold">supply will continue to rise,</span> but warn the peak is in sight.`);
		} else if (V.deltaSupply < 0) {
			r.push(`the market will turn soon and <span class="green bold">supply will weaken.</span>`);
		} else {
			r.push(`the current supply will <span class="yellow bold">stabilize.</span>`);
		}
	} else if (V.menialSupplyFactor >= 20000) {
		r.push(`Supply for slaves is <span class="red bold">very high,</span> forecasts predict`);
		if (V.deltaSupply > 0) {
			r.push(`<span class="red bold">supply will continue to rise.</span>`);
		} else if (V.deltaSupply < 0) {
			r.push(`the market will turn soon and <span class="green bold">supply will weaken.</span>`);
		} else {
			r.push(`the current supply will <span class="yellow bold">stabilize.</span>`);
		}
	} else {
		r.push(`Supply for slaves is <span class="yellow bold">average,</span> forecasts predict`);
		if (V.deltaSupply > 0) {
			r.push(`the market will see <span class="red bold">rising supply.</span>`);
		} else if (V.deltaSupply < 0) {
			r.push(`the market will see <span class="green bold">weakening supply.</span>`);
		} else {
			r.push(`it will <span class="yellow bold">remain stable</span> for the coming months.`);
		}
	}
	App.Events.addParagraph(el, r);
	r = [];

	/* Menial and regular slave markets are part of the same market, e.a. if (menial)slave supply goes up, all slave prices fall.
	The RomanFS may need further tweaking (it probably got weaker). Could increase the slave supply cap if this FS is chosen to fix. */

	V.slaveCostFactor = menialSlaveCost() / 1000;
	if (V.arcologies[0].FSRomanRevivalist > random(1, 150)) {
		if (V.slaveCostFactor > 0.8) {
			r.push(`<span class="yellow">Your Roman Revivalism is having an effect on the slave market and has driven local prices down</span> by convincing slave traders that this is a staunchly pro-slavery area.`);
			V.menialSupplyFactor += 2000;
		} else {
			r.push(`<span class="yellow">Your Roman Revivalism is having an effect on the slave market and is holding local prices down</span> by convincing slave traders that this is a staunchly pro-slavery area.`);
		}
		App.Events.addParagraph(el, r);
		r = [];
	}

	if (V.difficultySwitch === 1) {
		if (V.econWeatherDamage > 0) {
			const repairSeed = random(1, 3);
			if (V.disasterResponse === 0) {
				if (repairSeed === 3) {
					V.econWeatherDamage -= 1;
					V.localEcon += 1;
				}
			} else if (V.disasterResponse === 1) {
				if (repairSeed > 1) {
					V.econWeatherDamage -= 1;
					V.localEcon += 1;
				}
			} else {
				if (repairSeed === 3) {
					if (V.econWeatherDamage > 1) {
						V.econWeatherDamage -= 2;
						V.localEcon += 2;
					} else {
						V.econWeatherDamage -= 1;
						V.localEcon += 1;
					}
				} else {
					V.econWeatherDamage -= 1;
					V.localEcon += 1;
				}
			}
		}
		if (V.terrain !== "oceanic") {
			if (V.weatherToday.severity === 3) {
				V.localEcon -= 1;
				V.econWeatherDamage += 1;
				r.push(`This week's terrible weather did a number on the region, <span class="red">hurting the local economy.</span>`);
				if (V.disasterResponse === 0) {
					r.push(App.UI.DOM.makeElement("span", `Investing in a disaster response unit will speed up recovery`, "note"));
				}
			} else if (V.weatherToday.severity > 3) {
				V.localEcon -= 3;
				V.econWeatherDamage += 3;
				r.push(`This week's extreme weather ravaged the region, <span class="red">the local economy is seriously disrupted.</span>`);
				if (V.disasterResponse === 0) {
					r.push(App.UI.DOM.makeElement("span", `Investing in a disaster response unit will speed up recovery`, "note"));
				}
			}
		}
	}
	App.Events.addParagraph(el, r);

	if (V.SF.Toggle) {
		if (V.SF.Active >= 1) {
			el.append(App.Mods.SF.AAR()[0]);
		} else if (V.SF.FS.Tension > 100) {
			el.append(App.Mods.SF.fsIntegration.crisis()[0]);
		}
	}
	return el;

	// Unwieldy personal attention stuff
	// If it is long enough to be a nuisance to scroll through, put it down here.
	function whoring() {
		const arcology = V.arcologies[0];
		const arcologyInfo = new App.Utils.Arcology(arcology);

		hindranceMod = isHinderedDegree(V.PC, true);
		let sceneContinues = true;
		let desperation = false;
		let soldVirginity = false;
		let clients = random(2, 4);
		if (isPlayerFrigid()) {
			clients = 1;
		} else if (isPlayerLusting()) {
			clients *= 3;
		} else {
			clients += (Math.round(V.PC.energy / 20) - 1);
		}
		clients = Math.ceil(clients * hindranceMod);
		// Individual act income modifiers.
		let faceMod = .75;
		let vagMod = 1;
		let assMod = .9;
		let boobMod = .6;
		let dickMod = 1;
		// Final values per act
		let faceValue;
		let vagValue;
		let assValue;
		let boobValue;
		let dickValue;
		let handValue;
		// Half of these are for debugging
		let oralUse = 0;
		let vaginalUse = 0;
		let analUse = 0;
		let boobUse = 0;
		let dickUse = 0;
		let handUse = 0;

		let totalIncome = 0;
		let cervixPump = 0;

		if (!isPCCareerInCategory("escort")) {
			desperation = true;
		}

		income = 780 + ((V.PC.face + 10) * 2);
		if (V.PC.health.health < 0) {
			income -= V.PC.health.health * 3;
		}
		income -= V.PC.health.illness * 150;

		// An attractive player can charge more, while an unattractive one will have to offer less.
		if ((arcology.FSTransformationFetishist > 20 && !arcologyInfo.fsActive('FSSlimnessEnthusiast')) || arcology.FSAssetExpansionist > 20) {
			if (V.PC.boobs > 500) {
				income += V.PC.boobs / 10;
			} else if (V.PC.title === 0) {  // These all need to be appearance checks in 5.0.0.
				income -= V.PC.boobs;
			}
		} else if (arcology.FSSlimnessEnthusiast > 20) {
			if (V.PC.boobs > 500) {
				income += 500 - (V.PC.boobs / 10);
			} else if (V.PC.title === 0) { // 5.0.0
				income += V.PC.boobs;
			}
		} else {
			if (V.PC.boobs > 50000) {
				income += 2500;
			} else if (V.PC.boobs > 25000) {
				income += 1500;
			} else if (V.PC.boobs > 10000) {
				income += 1000;
			} else if (V.PC.boobs > 650) {
				income += V.PC.boobs / 10;
			}
		}
		if (arcology.FSTransformationFetishist > 20) {
			if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
				if (V.PC.boobsImplant / V.PC.boobs >= 0.25) {
					if (V.PC.boobs > 500) {
						income += 25;
					} else {
						income += V.PC.boobsImplant;
					}
				}
			} else {
				if (V.PC.boobs >= 10000) {
					if (V.PC.boobsImplant / V.PC.boobs >= 0.75) {
						income += V.PC.boobsImplant / 10;
					}
				} else if (V.PC.boobs >= 1000) {
					if (V.PC.boobsImplant / V.PC.boobs >= 0.5) {
						income += V.PC.boobsImplant / 10;
					}
				} else if (V.PC.boobs >= 500) {
					if (V.PC.boobsImplant / V.PC.boobs >= 0.25) {
						income += V.PC.boobsImplant / 10;
					}
				} else if (V.PC.boobs >= 300) {
					if (V.PC.boobsImplant / V.PC.boobs >= 0.1) {
						income += V.PC.boobsImplant / 10;
					}
				}
			}
		}
		if ((V.PC.boobs >= 300 && V.PC.title === 0) || V.PC.boobs >= 550) { // 5.0.0
			if (V.PC.boobShape === BreastShape.DOWNWARD || V.PC.boobShape === BreastShape.SAGGY) {
				income -= 25;
			} else if (V.PC.boobShape === BreastShape.SPHERICAL) {
				if (arcologyInfo.fsActive('FSTransformationFetishist')) {
					income += arcology.FSTransformationFetishist * 5;
				} else if (arcologyInfo.fsActive('FSBodyPurist')) {
					income -= arcology.FSBodyPurist * 5;
				} else {
					income -= 100;
				}
			}
		}
		if ((arcology.FSTransformationFetishist > 20 && !arcologyInfo.fsActive('FSSlimnessEnthusiast')) || arcology.FSAssetExpansionist > 20) {
			if (V.PC.butt <= 2) {
				income -= 100;
			} else {
				income += V.PC.butt * 50;
			}
		} else if (arcology.FSSlimnessEnthusiast > 20) {
			if (V.PC.butt <= 3) {
				income += 10 * V.PC.butt;
			} else {
				income -= 10 * V.PC.butt;
			}
		} else {
			if (V.PC.butt <= 2) {
				income -= 25;
			} else if (V.PC.butt <= 8) {
				income += 5 * V.PC.butt;
			} else {
				income += 100;
			}
		}
		if (arcology.FSTransformationFetishist > 20) {
			if (arcologyInfo.fsActive('FSSlimnessEnthusiast')) {
				if (V.PC.buttImplant / V.PC.butt >= 0.25) {
					if (V.PC.butt >= 3) {
						income += 10;
					} else {
						income += V.PC.buttImplant * 20;
					}
				}
			} else {
				if (V.PC.buttImplant / V.PC.butt >= 0.5) {
					income += V.PC.buttImplant * 20;
				}
			}
		}
		if (arcology.FSAssetExpansionist > 20) {
			if (V.PC.dick > 6) {
				if ((arcologyInfo.fsActive('FSGenderFundamentalist') && V.PC.title === 1) || !arcologyInfo.fsActive('FSGenderFundamentalist')) { // 5.0.0
					income += 20 * V.PC.dick;
				}
			}
		} else if (arcologyInfo.fsActive('FSGenderRadicalist')) {
			if (V.PC.title === 0 || V.PC.boobs >= 300 || V.PC.vagina >= 0) {
				income += 50 * V.PC.dick;
			}
		}
		if (arcology.FSAssetExpansionist > 20 && !arcologyInfo.fsActive('FSGenderFundamentalist')) {
			if (V.PC.balls > 10) {
				if ((arcologyInfo.fsActive('FSGenderFundamentalist') && V.PC.title === 1) || !arcologyInfo.fsActive('FSGenderFundamentalist')) { // 5.0.0
					income += 10 * V.PC.balls;
				}
			}
		} else if (arcologyInfo.fsActive('FSGenderRadicalist')) {
			if (V.PC.balls > 2) {
				if (V.PC.title === 0 || V.PC.boobs >= 300 || V.PC.vagina >= 0) {
					income += 10 * V.PC.balls;
				}
			}
		}
		if (arcologyInfo.fsActive('FSPetiteAdmiration') || arcologyInfo.fsActive('FSStatuesqueGlorification')) {
			if (heightPass(V.PC)) {
				income += 200;
			} else if (arcologyInfo.fsActive('FSStatuesqueGlorification')) {
				income -= 200;
			}
		}
		if (arcologyInfo.fsActive('FSPhysicalIdealist')) {
			if (arcology.FSPhysicalIdealistLaw === 1 && Math.abs(V.PC.weight) <= 30 && V.PC.health.condition >= 20 && V.PC.muscles >= 20 && V.PC.muscles <= 50) {
				income += 100;
			} else if (V.PC.muscles > 30) {
				income += V.PC.muscles;
			} else if (V.PC.muscles <= -5) {
				income += V.PC.muscles * 5;
			}
			if (arcology.FSPhysicalIdealistStrongFat === 1) {
				if (V.PC.weight > 10 && V.PC.weight <= 130) {
					income += 50;
				}
			}
		} else if (arcologyInfo.fsActive('FSHedonisticDecadence')) {
			if (arcology.FSHedonisticDecadenceStrongFat === 1) {
				income += (V.PC.muscles * (arcology.FSHedonisticDecadence / 200));
			}
		} else if (V.PC.muscles > 70) {
			income += 10;
		}
		if (arcology.FSHedonisticDecadence > 20) {
			if (V.PC.weight < -10) {
				income -= V.PC.weight * 3;
			} else if (V.PC.weight > 10) {
				income += V.PC.weight;
			}
		} else {
			if (V.PC.weight > 130) {
				income -= V.PC.weight;
			} else if (V.PC.weight > 30) {
				income -= V.PC.weight / 2;
			} else if (V.PC.weight < -95) {
				income += V.PC.weight;
			}
		}
		if (arcology.FSRepopulationFocus > 40) {
			if (V.PC.bellyPreg >= 100) {
				income += V.PC.bellyPreg / 10;
			} else {
				income -= 200;
			}
		} else if (arcology.FSRepopulationFocusPregPolicy === 1) {
			if (V.PC.preg > V.PC.pregData.normalBirth / 1.33) {
				/* limited huge boost for full term */
				income += 100;
			} else if (V.PC.bellyPreg >= 1500) {
				income += 20;
			}
		} else if (arcology.FSRestart > 40) { // Even if you don't get the bad result for being pregnant, they still don't want to fuck a preggo.
			if (V.PC.bellyPreg >= 1500) {
				income -= 800;
			}
		}
		if (arcology.FSRepopulationFocusMilfPolicy === 1 || arcology.FSRepopulationFocus > 40) {
			if (V.PC.counter.birthsTotal >= 1000) {
				income += 30000;
			} else if (V.PC.counter.birthsTotal >= 100) {
				income += 5000;
			} else if (V.PC.counter.birthsTotal >= 10) {
				income += 1000;
			} else {
				income += V.PC.counter.birthsTotal * 10;
			}
		}
		if (arcology.FSGenderRadicalistLawFuta !== 0) {
			switch (arcology.FSGenderRadicalistLawFuta) {
				case 1:
					if (V.PC.dick > 0 && V.PC.vagina > -1) {
						income += 100;
					}
					break;
				case 2:
					if (canAchieveErection(V.PC) && V.PC.balls > 0 && V.PC.scrotum > 0) {
						income += (V.PC.dick * 10) - 10;
						income += (V.PC.balls * 10) - 10;
					}
					break;
				case 3:
					if (V.PC.hips >= 1) {
						income += V.PC.hips * 50;
					}
					if (V.PC.butt >= 5) {
						income += V.PC.butt * 10;
					}
					break;
				case 4:
					// lot of stuff here for 5.0.0
					if (V.PC.dick === 1) {
						income += 100;
					} else if (V.PC.dick === 2) {
						income += 50;
					}
					if (V.PC.balls <= 2) {
						income += 25;
					}
					break;
			}
		}
		if (arcology.FSGenderFundamentalistLawBeauty + arcology.FSGenderRadicalistLawBeauty > 0) {
			if (genderLawPass(V.PC) === 1 && V.PC.title === 0) { // 5.0.0
				income += 50;
			}
		} else if (arcology.FSSlimnessEnthusiastLaw === 1) {
			if (slimLawPass(V.PC) === 1 && V.PC.title === 0) { // 5.0.0
				income += 100;
			}
		} else if (arcology.FSHedonisticDecadenceLaw2 === 1) {
			if (V.PC.boobs >= 2000 && V.PC.butt >= 5 && V.PC.weight > 95 && V.PC.title === 0) { // 5.0.0
				income += 50;
			}
		}
		if (arcology.FSIntellectualDependencyLawBeauty === 1) {
			if (bimboScore(V.PC) >= 6) {
				income += 200;
			}
		}
		if (V.PC.lactation > 0 && arcologyInfo.fsActive('FSPastoralist')) {
			income += Math.max(V.PC.lactationAdaptation * V.PC.lactation, 10);
			V.PC.lactationDuration = 2;
			V.PC.boobs -= V.PC.boobsMilk;
			V.PC.boobsMilk = 0;
		}
		if (V.PC.bellySag > 0) {
			if (V.PC.belly < 100) {
				income -= 25;
			}
		}

		if (V.PC.geneticQuirks.albinism === 2) {
			income *= 2;
		}
		if (V.PC.bellyPreg >= 500) {
			if (arcologyInfo.fsActive('FSRestart')) {
				income *= .5;
			} else if (arcologyInfo.fsActive('FSRepopulationFocus')) {
				income *= 1.1;
			} else if (arcology.FSRepopulationFocusPregPolicy === 1) {
				income *= .9;
			} else if (arcologyInfo.fsActive('FSGenderRadicalist') && V.PC.mpreg === 1) {
				income *= .9;
			} else if (!arcologyInfo.fsActive('FSGenderFundamentalist') && V.PC.title === 0) {  // 5.0.0
				income *= .8;
			} else {
				income *= .7;
			}
		}
		if (V.PC.bellyImplant >= 1500) {
			if (arcology.FSTransformationFetishist > 20) {
				income += 50;
			} else if (arcology.FSRepopulationFocus > 60) {
				income += 25;
			} else {
				if (V.PC.bellyImplant >= 750000) {
					income *= .2;
				} else if (V.PC.bellyImplant >= 450000) {
					income *= .5;
				} else if (V.PC.bellyImplant >= 300000) {
					income *= .7;
				} else if (V.PC.bellyImplant >= 100000) {
					income *= .8;
				} else if (V.PC.bellyImplant >= 50000) {
					income *= .85;
				} else {
					income *= .9;
				}
			}
		}
		if (desperation === true) {
			income *= .25;
		} else {
			income *= (V.rep / 2250);
		}
		income = Math.max(income, 25);

		// bonus to specific acts
		if (V.PC.lips > 95) {
			faceMod += .2;
		} else if (V.PC.lips > 70) {
			faceMod += .1;
		} else if (V.PC.lips > 40) {
			faceMod += .05;
		} else if (V.PC.lips <= 10) {
			faceMod -= .05;
		}
		if (V.PC.face >= -10) {
			switch (V.PC.faceShape) {
				case FaceShape.EXOTIC:
				case FaceShape.SENSUAL:
				case FaceShape.CUTE:
					faceMod += .05;
					break;
			}
		}
		faceValue = Math.trunc(income * faceMod);
		if (V.PC.boobs > 10000) {
			boobMod += .2;
		}
		if (V.PC.nipples === NippleShape.FUCKABLE) {
			boobMod += .2;
		}
		boobValue = Math.trunc(income * boobMod);
		if (V.PC.vagina > 3 && arcology.FSRepopulationFocus < 80) {
			vagMod -= V.PC.vagina * .05;
		}
		if (V.PC.vaginaLube === 0) {
			vagMod -= .1;
		}
		vagValue = Math.trunc(income * vagMod);
		if (V.PC.anus > 3) {
			if (arcology.FSGenderRadicalistLawFuta === 3) {
				assMod += .1;
			} else {
				assMod -= V.PC.anus * .05;
			}
		}
		if (arcology.FSSlimnessEnthusiastLaw !== 1) {
			if (V.PC.butt > 1) {
				assMod += V.PC.butt * 0.02;
			} else if (V.PC.butt < 1) {
				assMod -= .1;
			}
		} else if (V.PC.butt === 0) {
			assMod += .1;
		}
		assValue = Math.trunc(income * assMod);
		if (canPenetrate(V.PC)) {
			if (V.PC.dick > 3) {
				dickMod += V.PC.dick * .02;
			} else if (arcologyInfo.fsActive('FSGenderRadicalist') && (V.PC.title === 0 || V.PC.boobs >= 300 || V.PC.vagina >= 0)) { // 5.0.0
				dickMod += .1;
			} else if (V.PC.dick === 2) {
				dickMod -= .2;
			} else if (V.PC.dick === 1) {
				dickMod -= .5;
			}
		}
		dickValue = Math.trunc(income * dickMod);
		// consider specialty prosthetics here?
		handValue = Math.trunc(income * .5);

		// convert to usage weights
		faceMod = Math.floor(V.oralUseWeight * faceMod);
		if (V.PC.vagina >= 0) {
			vagMod = Math.floor((V.vaginalUseWeight * vagMod));
		} else {
			vagMod = 0;
		}
		assMod = Math.floor((V.analUseWeight * assMod));
		boobMod = Math.ceil((V.mammaryUseWeight * boobMod));
		if (V.PC.boobs > 10000) {
			boobMod += 3;
		} else if (V.PC.boobs <= 500) {
			boobMod -= 1;
		}
		if (V.PC.nipples === NippleShape.FUCKABLE) {
			boobMod *= 2;
		}
		if (canPenetrate(V.PC)) {
			dickMod = Math.floor(((V.penetrativeUseWeight + 3) * dickMod));
		} else {
			dickMod = 0;
		}

		let intro;
		if (desperation === false) {
			if (onBedRest(V.PC)) {
				intro = `invite citizens to the penthouse to discuss "business" this week`;
			} else {
				intro = `focus on finding "dates" around ${V.arcologies[0].name} this week`;
			}
		} else {
			intro = `spend the week selling your body in an attempt to avoid enslavement`;
		}
		if (V.PC.visualAge < V.minimumSlaveAge) {
			if (onBedRest(V.PC)) {
				r.push(`You ${intro}, finding them a little more willing to consider an underage prostitute if no one knows they're doing so.`);
			} else {
				if (!isPCCareerInCategory("escort")) {
					r.push(`You ${intro}, but find nobody willing to put their reputation at stake by picking up an underage prostitute.`);
					if (V.debtWarned > 0) {
						r.push(`Your desperate bid to keep your freedom is a failure. You have to have another out, you just have to!`);
					}
				} else {
					r.push(`You travel to a shady brothel on the outskirts of the Free City to sell your body for money. The conditions are terrible, the pay is poor, and you suffer indignities unsuiting of your status, which luckily do not leave the building.`);
					if (clients < 10) {
						clients *= 2;
						r.push(`You aren't as productive as the other children, but that's nothing <span class="cyan">a strong dose of aphrodisiacs</span> can't fix.`);
						if (random(1, 100) < 60) {
							V.PC.addict = 4;
						}
					}
					totalIncome = clients * 400;
					let fuckCount;
					let fuckTarget;
					for (let pBi = 0; pBi < clients; pBi++) {
						fuckCount = random(1, 3);
						while (fuckCount > 0) {
							fuckTarget = random(1, 100);
							if ((V.PC.nipples === NippleShape.FUCKABLE || V.PC.boobs > 500) && fuckTarget > 90) {
								actX(V.PC, "mammary");
								boobUse++;
							} else if (V.PC.vagina >= 0 && fuckTarget > 40) {
								actX(V.PC, "vaginal");
								vaginalUse++;
							} else if (fuckTarget > 30) {
								actX(V.PC, "anal");
								analUse++;
							} else {
								actX(V.PC, "oral");
								oralUse++;
							}
							fuckCount--;
						}
					}
					let virginityTaken = false;
					if (V.PC.vagina === 0 || V.PC.anus === 0) {
						r.push(`<span class="virginity loss">The only thing that you lost faster than your pride was your virginity,</span> though you expected as much.`);
						if (V.PC.vagina === 0) {
							V.PC.vagina++;
							actX(V.PC, "vaginal");
							vaginalUse++;
						}
						if (V.PC.anus === 0) {
							V.PC.anus++;
							actX(V.PC, "anal");
							analUse++;
						}
						virginityTaken = true;
					}
					if (canGetPregnant(V.PC)) {
						if (random(1, 100) > 95) {
							r.push(`A patron decided that little ${girlP}s as pretty as you deserve to pass it on to their daughters. After a forced overdose of fertility drugs and a series of creampies, your body might be in agreement.`);
							V.PC.forcedFertDrugs += 4;
							r.push(knockMeUp(V.PC, 70, 2, -5));
							if (V.PC.mpreg === 1) {
								actX(V.PC, "anal", 5);
								analUse += 5;
							} else {
								actX(V.PC, "vaginal", 5);
								vaginalUse += 5;
							}
						} else if (vaginalUse > 0 || (analUse > 0 && V.PC.mpreg === 1)) {
							r.push(knockMeUp(V.PC, 5, 2, -5));
						}
					}
					if (random(1, 100) > 75) {
						r.push(`A customer <span class="health dec">got a little rough</span> with you during sex. You'll recover, but it was still an unpleasant experience.`);
						healthDamage(V.PC, 10);
					}
					if (V.PC.cervixImplant === 1 || V.PC.cervixImplant === 3) {
						cervixPump += 20 * vaginalUse;
					}
					if (V.PC.cervixImplant === 2 || V.PC.cervixImplant === 3) {
						cervixPump += 20 * analUse;
					}
					if (cervixPump > 0) {
						r.push(`You end the week with <span class="change positive">some noticeable swelling in your belly</span> from all the loads pumped into`);
						if (V.PC.cervixImplant === 1) {
							r.push(`your pussy.`);
						} else if (V.PC.cervixImplant === 2) {
							r.push(`your asshole.`);
						} else {
							r.push(`you.`);
						}
						V.PC.bellyImplant += cervixPump;
					}
					// To allow hole stretching, but not right after virginity was taken. I may have trapped myself with the 'or' condition on it.
					if (!virginityTaken && V.seeStretching === 1 && V.PC.newVag === 0) {
						if (V.PC.vagina < 3 && random(1, 100) > 109 + V.PC.vagina - vaginalUse) {
							r.push(`After all the large insertions your tight pussy endured, it has <span class="change negative">begun retaining the shape of the dicks that stretched it out.</span>`);
							V.PC.vagina++;
						}
						if (V.PC.anus < 3 && random(1, 100) > 109 + V.PC.anus - analUse) {
							r.push(`Your asshole took a real pounding this week and is <span class="change negative">no longer as tight as it used to be.</span>`);
							V.PC.anus++;
						}
					}
					if (random(1, 100) > 95 && canCatchIllness(V.PC)) {
						getIll(V.PC);
						r.push(`The unsanitary bed you fuck on was dirtier than you thought; <span class="health dec">you've taken ill</span> from touching it.`);
					}
					r.push(`Your cut was a measly <span class="yellowgreen">${cashFormat(totalIncome)}.</span>`);
					cashX(totalIncome, "personalBusiness");
				}
				sceneContinues = false;
			}
		} else {
			if (onBedRest(V.PC)) {
				r.push(`You ${intro}.`);
			} else {
				if (V.PC.bellyPreg >= 1500 && FutureSocieties.isActive('FSRestart') && V.PC.pregSource !== -1 && V.PC.pregSource !== -6) {
					r.push(`You ${intro} and earn <span class="yellowgreen">${cashFormat(25)},</span> barely enough to cover the abortion the john that gave it to you told you to get. Showing off your gravid body <span class="red">infuriates your citizens and cripples your reputation.</span>`);
					cashX(25, "personalBusiness");
					repX((V.rep * .5) - V.rep, "personalBusiness");
					if (V.eugenicsFullControl !== 1) {
						V.failedElite += 25;
					}
					V.enduringRep *= .5;
					sceneContinues = false;
				} else {
					r.push(`You ${intro}.`);
				}
			}
		}
		if (sceneContinues) {
			let possibleActs = [];
			let selectedActs = [];
			let clientTotal = clients;
			// Add the guaranteed virgins
			if (V.PC.vagina === 0) {
				selectedActs.push({name: "vaginal"});
				clientTotal--;
			}
			if (V.PC.anus === 0) {
				selectedActs.push({name: "anal"});
				clientTotal--;
			}
			// Add other acts by weight
			possibleActs.push({name: "oral", weight: faceMod});
			possibleActs.push({name: "vaginal", weight: vagMod});
			possibleActs.push({name: "anal", weight: assMod});
			possibleActs.push({name: "mammary", weight: boobMod});
			possibleActs.push({name: "penetrative", weight: dickMod});
			possibleActs.push({name: "other", weight: 1});
			for (let i = 0; i < clientTotal; i++) {
				selectedActs.push(weightedRandom(possibleActs));
			}
			for (let j = 0; j < selectedActs.length; j++) {
				switch (selectedActs[j].name) {
					case "oral":
						seX(V.PC, "oral", "public", "penetrative");
						oralUse++;
						totalIncome += faceValue;
						break;
					case "vaginal":
						seX(V.PC, "vaginal", "public", "penetrative");
						if (V.PC.vagina === 0) {
							soldVirginity = true;
							V.PC.vagina++;
							totalIncome += vagValue * 2;
						}
						if (V.PC.cervixImplant === 1 || V.PC.cervixImplant === 3) {
							cervixPump += 20;
						}
						vaginalUse++;
						totalIncome += vagValue;
						break;
					case "anal":
						seX(V.PC, "anal", "public", "penetrative");
						if (V.PC.anus === 0) {
							soldVirginity = true;
							V.PC.anus++;
							totalIncome += assValue * 2;
						}
						if (V.PC.cervixImplant === 2 || V.PC.cervixImplant === 3) {
							cervixPump += 20;
						}
						analUse++;
						totalIncome += assValue;
						break;
					case "mammary":
						seX(V.PC, "mammary", "public", "penetrative");
						boobUse++;
						totalIncome += boobValue;
						break;
					case "penetrative":
						seX(V.PC, "penetrative", "public", "penetrative");
						dickUse++;
						totalIncome += dickValue;
						break;
					case "other":
						handUse++;
						totalIncome += handValue;
						break;
				}
			}
			if (desperation === false) {
				if (V.rep <= 2250) {
					r.push(`You are virtually unknown, placing you in direct competition with other free whores and the sea of cheap slave holes.`);
				}
				if (V.PC.bellyPreg >= 500) {
					if (arcologyInfo.fsActive('FSRestart')) {
						r.push(`Your pregnancy turns off most potential clients, and those that were willing to have sex with a pregnant whore refused to pay very much to do so.`);
					} else if (arcologyInfo.fsActive('FSRepopulationFocus')) {
						r.push(`You were able to charge clients more than expected despite being with child; you guess your pregnancy-focused population wants your baby-rounded body more than ever.`);
					} else if (arcology.FSRepopulationFocusPregPolicy === 1) {
						r.push(`You were able to charge your clients a little more than anticipated for a ${girlP} with child; but that's not too surprising, after all, pregnancy is trendy right now.`);
					} else if (arcologyInfo.fsActive('FSGenderRadicalist') && V.PC.mpreg === 1) {
						r.push(`You were able to charge your clients a little more than anticipated for a ${girlP} with child; you guess your radical reproductive alterations are a turn on to society these days.`);
					} else if (!arcologyInfo.fsActive('FSGenderFundamentalist') && V.PC.title === 0) {  // 5.0.0
						r.push(`Clients were willing to pay a little more than normal to help support a pregnant woman, but you still had to cut prices to see any use.`);
					} else {
						r.push(`Your pregnancy was turning off potential clients, so you were forced to cut your prices to encourage purchases.`);
					}
				} else if (V.PC.bellyImplant >= 1500 && arcology.FSTransformationFetishist <= 20 && arcology.FSRepopulationFocus <= 60) {
					r.push(`Your faux pregnancy was turning off potential clients, so you were forced to cut your prices to encourage purchases.`);
				} else if (canGetPregnant(V.PC) && (vaginalUse > 0 || (analUse > 0 && V.PC.mpreg === 1))) {
					if (FutureSocieties.isActive('FSRepopulationFocus') && random(1, 100) > 80) {
						r.push(`A horny client offered you an extra <span class="yellowgreen">${cashFormat(1000)}</span> for downing some fertility drugs. You're already forgoing birth control, so what harm could an extra baby do?`);
						cashX(1000, "personalBusiness");
						V.PC.forcedFertDrugs += 2;
					} else if (random(1, 100) > 90) {
						if (V.PC.skill.medicine >= 25) {
							r.push(`A client tried to trick you into taking fertility supplements disguised as party drugs. You still took them, of course, but made sure he <span class="yellowgreen">paid extra</span> for the privilege.`);
							cashX(1000, "personalBusiness");
						} else {
							r.push(`A client offered you some free pills to make sex more fun. He was right; it made bareback sex feel amazing.`);
						}
						V.PC.forcedFertDrugs += 2;
					}
					r.push(knockMeUp(V.PC, 20, 2, -5));
				}
				if (V.PC.geneticQuirks.albinism === 2) {
					r.push(`People are willing to pay more to fuck an albino like yourself, so you humor them and empty their accounts of extra ¤.`);
				}
				if (soldVirginity) {
					r.push(`You knew you would be losing your virginity from this, so you made sure to triple the price for anyone that wanted to claim it. <span class="virginity loss">And claim it they did.</span>`);
				}
				if (isPlayerFrigid()) {
					r.push(`You had major performance issues and could only handle taking a single client before you had to quit.`);
				}
			}
			r.push(`You made a total of <span class="yellowgreen">${cashFormat(totalIncome)}</span> by whoring yourself out;`);
			if (desperation === true) {
				r.push(`you have this unshakable feeling that society wants to see you fall into slavery and that's why you received so little for your efforts.`);
				if (soldVirginity) {
					r.push(`You even <span class="virginity loss">gave away your virginity</span> to a thankless client and got nothing extra for it.`);
				}
				r.push(`Being forced into prostitution out of desperation <span class="red">completely decimates your reputation.</span> Even if you succeed, you'll have to start over to rid yourself of this shame.`);
				repX((V.rep * .1) - V.rep, "personalBusiness");
				V.enduringRep = 0;
			} else if (V.rep <= 2250) {
				r.push(`a total that will improve as you make a name for yourself, but for now you can have fun without much consequence.`);
			} else {
				if (totalIncome <= 500 * clients * (V.rep / 2250)) {
					r.push(`a rather paltry sum for who you are, which carries a lingering feeling that you might not be as attractive as you think.`);
				} else if (totalIncome >= 1000 * clients * (V.rep / 2250)) {
					r.push(`society must find you attractive as this is quite the haul for the effort.`);
				} else {
					r.push(`not a bad sum for the effort.`);
				}
				// TODO: Add sexual openness policy stuff here
				r.push(`Doing such lewd things for money <span class="red">tarnishes your reputation.</span>`);
				repX((V.rep * .6) - V.rep, "personalBusiness");
				V.enduringRep *= .6;
			}
			cashX(totalIncome, "personalBusiness");
			if (cervixPump > 0) {
				r.push(`You feel a little heavier around the middle after all the sex, a byproduct of your <span class="change positive">belly expanding</span> from the loads pumped into`);
				if (V.PC.cervixImplant === 1) {
					r.push(`your pussy.`);
				} else if (V.PC.cervixImplant === 2) {
					r.push(`your asshole.`);
				} else {
					r.push(`you.`);
				}
				V.PC.bellyImplant += cervixPump;
			}
			if (V.debugMode) {
				r.push(`Oral: ${oralUse} times at ${faceValue}.`);
				r.push(`Vaginal: ${vaginalUse} times at ${vagValue}.`);
				r.push(`Anal: ${analUse} times at ${assValue}.`);
				r.push(`Titjobs: ${boobUse} times at ${boobValue}.`);
				r.push(`Penetrations: ${dickUse} times at ${dickValue}.`);
				r.push(`Other: ${handUse} times at ${handValue}.`);
				r.push(`Total: ${clients} clients for ${totalIncome}.`);
			}
		}
	}

	function maid() {
		if (!isMovable(V.PC)) {
			r.push(`You try your hardest to better direct your slaves in their cleaning of the penthouse, but since you can't move, it doesn't accomplish much.`);
		} else if (isTrapped(V.PC)) {
			r.push(`You spend your free time making sure ${V.masterSuite === 0 ? "your quarters are" : `${App.Entity.facilities.masterSuite.nameCaps} is`} spotless, since you can't reach far enough out of it to clean anything else in the penthouse. You manage to reduce your upkeep by around 2%, which is still something.`);
		} else if (V.PC.energy > 95 || isHindered(V.PC)) {
			r.push(`You spend your free time hustling around your penthouse, cleaning and making sure everything is in order.`);
			if (V.PC.energy > 95 && isHindered(V.PC)) {
				r.push(`Between your physical hindrances and your out-of-control libido, it's amazing you how much you actually got done. You`);
			} else if (V.PC.energy > 95) {
				r.push(`You would have gotten more done, but you kept making more messes with your sexual trysts. You`);
			} else if (onBedRest(V.PC)) {
				r.push(`It's not good for you to be so active, but you`);
			} else if (!canWalk(V.PC)) {
				r.push(`Navigation sometimes proves difficult, as does reaching certain places, but you`);
			} else if (V.PC.physicalImpairment !== 0 || V.PC.muscles < -30) {
				r.push(`You quickly tire and have to stop. You only`);
			} else if (V.PC.belly >= 60000 || V.PC.belly >= 60000 / (1 + Math.pow(Math.E, -0.4 * (V.PC.physicalAge - 14))) || V.PC.belly >= Math.max(10000, ((12500 / 19) * V.PC.height) - (1172500 / 19))) {
				r.push(`Your`);
				if (V.PC.preg > 0) {
					r.push(`pregnancy`);
				} else {
					r.push(`belly`);
				}
				r.push(`is constantly in the way, so you only`);
			} else if (V.PC.boobs > 5000) {
				r.push(`Your boobs keep getting in the way, so you only`);
			} else if (V.PC.muscles > 95 && V.PC.height <= (Height.mean(V.PC) + 10)) {
				r.push(`Your fine motor skills are lacking, so you have to take things slow to avoid accidentally breaking anything. You still`);
			} else if (V.PC.weight >= 130 || (V.PC.weight >= 95 + ((V.PC.physicalAge - 9) * 5)) || V.PC.balls >= 14 || V.PC.hips > 2 || V.PC.butt > 6) {
				r.push(`Moving around with your physique can be awkward at times, and you only`);
			} else {
				r.push(`Quadrupedal limbs are not made for this sort of thing, so you only`);
			}
			r.push(`manage to reduce your upkeep by 15%.`);
		} else {
			r.push(`You spend your free time hustling around your penthouse, cleaning and making sure everything is in order. You manage to reduce your upkeep by 25%.`);
			if (V.PC.belly >= 5000) {
				r.push(`Your`);
				if (V.PC.preg > 0) {
					r.push(`pregnancy`);
				} else {
					r.push(`big belly`);
				}
				r.push(`would slow most ${girlP}s down,`);
				if (V.PC.counter.birthMaster > 0) {
					r.push(`but you've become accustomed to working with it.`);
				} else {
					r.push(`but your Master made sure you knew how to work around it.`);
				}
			} else if (V.PC.counter.birthMaster > 0) {
				r.push(`This is much easier to do without a big baby bump in the way.`);
			}
		}
	}

	function relax() {
		const MSL = App.Entity.facilities.masterSuite.employeesIDs().size;
		const fuckSlavesCount = haremLength();
		const fucktoy = fuckSlavesCount > 1 ? "one of your fucktoys" : "your fucktoy";
		r.push(`You spend the week with no plans, no obligations, and not a care in the world.`);
		if (S.Concubine) {
			const {his, him} = getPronouns(S.Concubine);
			r.push(`You just`);
			if (S.Concubine.belly >= 1500) {
				r.push(`lay your head against ${S.Concubine.slaveName}'s rounded belly`);
			} else if (S.Concubine.boobs > 2000) {
				if (V.PC.height <= S.Concubine.height * .66) {
					r.push(`settle onto ${S.Concubine.slaveName}'s lap, nestled into ${his} cleavage,`);
				} else {
					r.push(`lay back, nestled into ${S.Concubine.slaveName}'s cleavage,`);
				}
			} else if (S.Concubine.weight > 95) {
				r.push(`lay back, rest your head on ${S.Concubine.slaveName}'s soft stomach,`);
			} else if (hasAnyLegs(S.Concubine)) {
				r.push(`lay back, rest your head on ${S.Concubine.slaveName}'s ${S.Concubine.weight > 95 ? "soft thighs" : "lap"},`);
			} else {
				r.push(`lay back with an arm around ${S.Concubine.slaveName}`);
			}
			r.push(`and enjoy`);
			if (S.Concubine.fetish !== Fetish.MINDBROKEN && hasAnyArms(S.Concubine)) {
				if (V.PC.refreshmentType === 0) {
					r.push(`having ${him} light your ${V.PC.refreshment}`);
				} else if (V.PC.refreshmentType === 1) {
					r.push(`having ${him} refill your glass with ${V.PC.refreshment}`);
				} else if (V.PC.refreshmentType === 2) {
					if (canEatFood(V.PC)) {
						r.push(`having ${him} feed you ${V.PC.refreshment}`);
					} else {
						r.push(`sharing a cup of ${V.PC.refreshment}-flavored slave food together`);
					}
				} else if (V.PC.refreshmentType === 3) {
					r.push(`having ${him} cut lines of ${V.PC.refreshment} for you`);
				} else if (V.PC.refreshmentType === 4) {
					if (App.Data.Careers.Leader.nurse.includes(S.Concubine.career) || S.Concubine.skill.nurse >= Constant.MASTERED_XP) {
						r.push(`having ${him} inject you with ${V.PC.refreshment}`);
					} else {
						r.push(`having ${him} ready a vein for a shot of ${V.PC.refreshment}`);
					}
				} else if (V.PC.refreshmentType === 5) {
					r.push(`having ${him} feed you ${V.PC.refreshment}`);
				} else if (V.PC.refreshmentType === 6) {
					r.push(`having ${him} leaves of ${V.PC.refreshment} on your tongue`);
				}
			} else {
				if (V.PC.refreshmentType === 0) {
					r.push(`your favorite brand of ${V.PC.refreshment}`);
				} else if (V.PC.refreshmentType === 1) {
					r.push(`a fine bottle of ${V.PC.refreshment}`);
				} else if (V.PC.refreshmentType === 2) {
					if (canEatFood(V.PC)) {
						r.push(`a freshly prepared plate of ${V.PC.refreshment}`);
					} else {
						r.push(`a cup of ${V.PC.refreshment}-flavored slave food`);
					}
				} else if (V.PC.refreshmentType === 3) {
					r.push(`a plate of cleanly laid out ${V.PC.refreshment}`);
				} else if (V.PC.refreshmentType === 4) {
					r.push(`an injection of ${V.PC.refreshment}`);
				} else if (V.PC.refreshmentType === 5) {
					r.push(`a handful of ${V.PC.refreshment}`);
				} else if (V.PC.refreshmentType === 6) {
					r.push(`a leaf of ${V.PC.refreshment}`);
				}
			}
			if (V.PC.energy > 20 && (MSL > 0 || fuckSlavesCount > 0)) {
				r.push(`while ${MSL > 0 ? "your harem" : `${fucktoy}`} helps alleviate any built up tension in your loins.`);
			} else {
				r.push(r.pop() + `.`);
			}
		} else if (MSL > 0) {
			r.push(`Just a comfortable chair, a`);
			if (V.PC.refreshmentType === 0) {
				r.push(`selection of ${V.PC.refreshment} brands,`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`bottle of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 2) {
				if (canEatFood(V.PC)) {
					r.push(`plate of fresh ${V.PC.refreshment},`);
				} else {
					r.push(`cup of ${V.PC.refreshment}-flavored slave food,`);
				}
			} else if (V.PC.refreshmentType === 3) {
				r.push(`brick of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`syringe of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`bowl of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`sheet of ${V.PC.refreshment},`);
			}
			r.push(`and your harem to dote on your every need.`);
		} else {
			r.push(`Just a comfortable chair${(V.PC.energy > 20 && fuckSlavesCount > 0) ? ", a slave between your legs," : ""} and a`);
			if (V.PC.refreshmentType === 0) {
				r.push(`selection of ${V.PC.refreshment} brands`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`bottle of ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 2) {
				if (canEatFood(V.PC)) {
					r.push(`plate of fresh ${V.PC.refreshment}`);
				} else {
					r.push(`cup of ${V.PC.refreshment}-flavored slave food`);
				}
			} else if (V.PC.refreshmentType === 3) {
				r.push(`brick of ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`syringe of ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`bowl of ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`sheet of ${V.PC.refreshment}`);
			}
			r.push(`to help you relax.`);
		}
		improveCondition(V.PC, 10);
	}

	function smuggling() {
		const qualifiedFS = [];
		if (V.arcologies[0].FSDegradationistDecoration >= 80) {
			qualifiedFS.push("degradationist");
		}
		if (V.arcologies[0].FSPaternalistDecoration >= 80) {
			qualifiedFS.push("paternalist");
		}
		if (V.arcologies[0].FSHedonisticDecadenceDecoration >= 80) {
			qualifiedFS.push("hedonistic");
		}
		if (V.arcologies[0].FSSlaveProfessionalismLaw === 1) {
			qualifiedFS.push("professionalism");
		}
		if (V.arcologies[0].FSIntellectualDependencyLaw === 1) {
			qualifiedFS.push("dependency");
		}
		if (V.arcologies[0].FSPetiteAdmiration >= 80) {
			qualifiedFS.push("petite");
		}
		if (V.arcologies[0].FSStatuesqueGlorification >= 80) {
			qualifiedFS.push("statuesque");
		}
		if (V.arcologies[0].FSPastoralistDecoration >= 80 && V.arcologies[0].FSPastoralistLaw === 1) {
			qualifiedFS.push("pastoralist");
		}
		if (V.arcologies[0].FSSupremacistDecoration >= 80) {
			qualifiedFS.push("supremacist");
		}
		if (V.arcologies[0].FSBodyPuristDecoration >= 80) {
			qualifiedFS.push("body purist");
		}
		if (V.arcologies[0].FSRestartDecoration >= 80) {
			qualifiedFS.push("eugenics");
		}
		if (V.arcologies[0].FSRepopulationFocusDecoration >= 80) {
			qualifiedFS.push("repopulation");
		}
		if (V.arcologies[0].FSGenderFundamentalistDecoration >= 80) {
			qualifiedFS.push("fundamentalist");
		}
		if (V.arcologies[0].FSSubjugationistDecoration >= 80) {
			qualifiedFS.push("subjugationist");
		}
		if (V.arcologies[0].FSGenderRadicalistResearch === 1) {
			qualifiedFS.push("radicalist");
		}
		if (V.arcologies[0].FSTransformationFetishistResearch === 1) {
			qualifiedFS.push("transformation");
		}
		if (V.arcologies[0].FSYouthPreferentialistDecoration >= 80) {
			qualifiedFS.push("youth");
		}
		if (V.arcologies[0].FSMaturityPreferentialistDecoration >= 80) {
			qualifiedFS.push("maturity");
		}
		if (V.arcologies[0].FSSlimnessEnthusiastDecoration >= 80) {
			qualifiedFS.push("slimness");
		}
		if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
			qualifiedFS.push("expansionist");
		}
		if (V.arcologies[0].FSPhysicalIdealistDecoration >= 80) {
			qualifiedFS.push("idealist");
		}
		if (V.arcologies[0].FSChattelReligionistLaw === 1) {
			qualifiedFS.push("religion");
		}
		if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
			qualifiedFS.push("roman law");
		} else if (V.arcologies[0].FSRomanRevivalistDecoration >= 80) {
			qualifiedFS.push("roman");
		} else if (V.arcologies[0].FSEgyptianRevivalistDecoration >= 80) {
			qualifiedFS.push("egyptian");
		} else if (V.arcologies[0].FSAztecRevivalistLaw === 1) {
			qualifiedFS.push("aztec law");
		} else if (V.arcologies[0].FSAztecRevivalistDecoration >= 80) {
			qualifiedFS.push("aztec");
		} else if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
			qualifiedFS.push("imperial law");
		} else if (V.arcologies[0].FSNeoImperialistDecoration >= 80) {
			qualifiedFS.push("imperial");
		} else if (V.arcologies[0].FSArabianRevivalistLaw === 1) {
			qualifiedFS.push("arabian law");
		} else if (V.arcologies[0].FSArabianRevivalistDecoration >= 80) {
			qualifiedFS.push("arabian");
		} else if (V.arcologies[0].FSEdoRevivalistLaw === 1) {
			qualifiedFS.push("edo law");
		} else if (V.arcologies[0].FSEdoRevivalistDecoration >= 80) {
			qualifiedFS.push("edo");
		} else if (V.arcologies[0].FSChineseRevivalistLaw === 1) {
			qualifiedFS.push("chinese law");
		} else if (V.arcologies[0].FSChineseRevivalistDecoration >= 80) {
			qualifiedFS.push("chinese");
		} else if (V.arcologies[0].FSAntebellumRevivalistLaw1 === 1) {
			qualifiedFS.push("southron law");
		} else if (V.arcologies[0].FSAntebellumRevivalistDecoration >= 80) {
			qualifiedFS.push("southron");
		}
		let caught = 0;
		if (V.rep >= 18000) { /* prestigious */
			income = random(8500, 9000);
		} else if (V.rep >= 9000) { /* well known */
			income = random(4500, 5000);
		} else {
			income = random(1500, 2000);
		}
		income *= hindranceMod;
		income *= nymphoMod;
		switch (qualifiedFS.random()) {
			case "eugenics":
				income += random(2500, 4000);
				if (V.eugenicsFullControl !== 1) {
					r.push(`You are smuggling`);
					if (V.PC.dick !== 0) {
						r.push(`your`);
					} else {
						r.push(`one of the Societal Elite's`);
					}
					r.push(`semen to allow some desperate girls to get pregnant. Anonymity is really hard to attain, and it is easy to find out what you've been doing. Even if you did manage to make <span class="yellowgreen">${cashFormat(income)},</span> the Societal Elite are <span class="red">quite displeased</span> by your actions.`);
					V.failedElite += 50;
					caught = 1;
				} else {
					r.push(`You are smuggling`);
					if (V.PC.dick !== 0) {
						r.push(`your`);
					} else {
						r.push(`one of the Societal Elite's`);
					}
					r.push(`semen to allow some desperate girls to get pregnant. Anonymity is really hard to attain, and it is easy to find out what you've been doing. Even if you did manage to make <span class="yellowgreen">${cashFormat(income)},</span> the Societal Elite are <span class="red">quite displeased</span> by your actions, even though they know how little they can do about it now.`);
					caught = 1;
				}
				break;
			case "paternalist":
				income += random(1000, 1500);
				r.push(`You manage to find a few low-standards slavers without any problem, but when you actually try to do business, you are quickly recognized. You only manage to make <span class="yellowgreen">${cashFormat(income)}</span> before you are ${onBedRest(V.PC) ? "disconnected" : "sent away"}. The people of your arcology are <span class="red">outraged by your lack of respect</span> for slave rights.`);
				caught = 1;
				break;
			case "supremacist":
				income += random(2000, 3000);
				r.push(`When it comes to smuggling in your arcology, there is no better target than ${V.arcologies[0].FSSupremacistRace} slaves, and there is a high demand for them, making you a nice <span class="yellowgreen">${cashFormat(income)}.</span> Participating in this slave trade means you can control who is sent. Your people do not see things in the same light though, and <span class="red">your reputation takes a big hit.</span>`);
				caught = 1;
				break;
			case "degradationist":
				income += random(2000, 3000);
				r.push(`During your free time, you make business with a few low-standards slavers and manage to buy stolen slaves and sell them at a profit. Even if people recognized you, such treatment of slaves is normal, and only a few people would really complain about it. Your dealings have made you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "repopulation":
				income += random(1500, 2500);
				r.push(`You manage to discreetly rent out your remote surgery for abortions. You make sure the people do not recognize your penthouse, having them come blindfolded or unconscious, should the abortion request not be for themselves. With this, you make <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "fundamentalist":
				income += random(1500, 2500);
				r.push(`You manage to arrange a few sex-changes and geldings in your own remote surgery for some powerful people to accommodate your arcology's sense of power, but also for people who want to transform others into females so that they lose all the power they have. This makes you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "hedonistic":
				income += random(1500, 2500);
				r.push(`Since most of what the old world considered to be illegal is legal in your arcology, "smuggling" is quite common, and you easily find people ready to pay for your help with dealing with their competition. With this, you manage to make <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "pastoralist":
				income += random(1500, 2500);
				r.push(`You take advantage of your own laws, making sure that animal products still come into your arcology. But you also make sure to make them as disgusting as possible so that people would rather turn to slave-produced ones instead. This allows you to make <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "body purist":
				income += random(1500, 2500);
				r.push(`In your arcology, people are expected to be all natural, but this doesn't mean the same thing applies outside. By buying slaves, giving them implants and quickly selling them before anyone notices, you manage to make <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "subjugationist":
				income += random(1500, 2500);
				r.push(`You manage to work with some slavers that deal exclusively in ${V.arcologies[0].FSSubjugationistRace} slaves, and you export them from the arcology at a cost, bringing in <span class="yellowgreen">${cashFormat(income)}.</span> Considering most people do not care about the fate of the slaves, they are simply mildly annoyed at the short-term price increase due to the exportation.`);
				break;
			case "radicalist":
				income += random(2500, 4000);
				r.push(`Anal pregnancy may be accepted in your arcology, but seeing how it goes against the laws of nature makes it a gold mine for dirty businesses; you have rich slaveowners and well-known slavers come to you with their best sissies so that you can implant them with artificial uteri. This flourishing business made you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "transformation":
				income += random(2500, 4000);
				r.push(`Your arcology is well known for its implants, and usually, one would have to pay a fortune simply to reserve a place in a clinic for implantation. You take advantage of this trend to rent your remote surgery and your knowledge of gigantic implants to slavers for a cut of their profit. This gets you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "youth":
				income += random(1500, 2500);
				r.push(`Youth is more important than anything in your arcology, yet some people who are not really in their prime are rich and powerful, enough that renting your remote surgery to them for age lifts and total body reworks is quite worth it, both for them and for you. You get paid <span class="yellowgreen">${cashFormat(income)}</span> for these services.`);
				break;
			case "maturity":
				income += random(1500, 2500);
				r.push(`In your arcology, the older the slave, the better. This also means that your arcology deals a lot in curatives and preventatives, as well as less-than-legal drugs that are supposed to extend one's lifespan. You manage to ship in a few of these drugs and sell them at a high price, making you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "slimness":
				income += random(1500, 2500);
				r.push(`Your arcology treats chubby people quite poorly, so they are ready to spend a lot of money on surgeries and supposed "miracle" solutions. When they can't afford legal and efficient methods, they have to turn to other drugs. The sales bring you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "expansionist":
				income += random(2500, 4000);
				r.push(`Your arcology likes its slaves nice and stacked and you have exactly the drugs for it. But you always make sure to procure just a bit more, enough to not alarm anybody who might be watching, but also enough to sell to other prominent slaveowners outside your arcology, who pay you <span class="yellowgreen">${cashFormat(income)}</span> for them.`);
				break;
			case "idealist":
				income += random(1500, 2500);
				r.push(`Your society's obsession with fit and muscular slaves has developed a particular interest in steroids and all kinds of drugs to tone one's body. As an arcology owner, you always have access to the most potent of them, but this is not the case for lower class citizens; some of them just aren't willing to pay a lot for them, so they buy experimental drugs off the black market. Participating in these activities made you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "professionalism":
				income += random(2500, 5500);
				r.push(`Your arcology has strict laws when it comes to who may be stay within its walls and those that don't cut it are often desperate for a loop hole; one you can easily provide. <span class="yellowgreen">${cashFormat(income)}</span> for your pocket and another taxable citizen. Win, win.`);
				break;
			case "dependency":
				income += random(5500, 15000);
				r.push(`Your arcology has strict laws when it comes to who may be claimed as a dependent and thusly excused from taxation. Of course, there are always those looking to cheat the system for their own benefit and more than willing to slip you a sum of credits to make it happen. While in the long term it may cost you, but for now you rake in a quick <span class="yellowgreen">${cashFormat(income)}</span> for the forged documents.`);
				break;
			case "statuesque":
				income += random(1500, 3500);
				r.push(`Your arcology likes its slaves tall, but even then there is the occasional outlier. An outlier usually keen on paying a lovely sum to have a tiny embarrassment of a slave slipped discreetly into their possession. All that is seen is a pair of suitcases changing hands and you walk away with <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "petite":
				income += random(1500, 3000);
				r.push(`Your arcology prefer a couple with a sizable gap between their heights. When they can't quite achieve that goal, they turn to any means they can. A few discreet surgeries and growth inhibitor sales net you <span class="yellowgreen">${cashFormat(income)}</span> this week.`);
				break;
			case "religion":
				income += random(2000, 3000);
				r.push(`The best smugglers know how to use the law to its advantage, and not only are you a really good smuggler, you're also the law itself. You have word spread that some company has done something blasphemous, and have them pray and pay for forgiveness. Panicked at the word of their Prophet, the higher-ups of the company give you <span class="yellowgreen">${cashFormat(income)}</span> for salvation.`);
				break;
			case "roman law":
				income += random(2000, 3000);
				r.push(`Every citizen of your arcology is trained in the art of war and supposed to defend its arcology when the time comes. This, of course, also means that people are supposed to be able to defend themselves. By arranging with the best fighters around, you manage to make some citizens face outrageous losses; so bad, in fact, that they are forced to pay <span class="yellowgreen">${cashFormat(income)}</span> for you to forget the shame they've put on your arcology.`);
				break;
			case "roman":
				income += random(1500, 2500);
				r.push(`Slaveowners from all around your arcology are rushing to the pit, eager to show their most recent training. Some of them, having more cunning than experience, are ready to sway the fight in their direction, no matter what it takes. You make sure to catch such people, and only agree to let them do their dirty tricks if they pay you. By the times the bribes and betting are done, you have made <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "egyptian":
				income += random(1500, 2500);
				r.push(`Having a society that likes incest often means that people are ready to go to great lengths to get their hands on people related to their slaves. In the smuggling business, this means that kidnapped relatives are common, and as an arcology owner with access to data on most of the slaves, you are able to control this trade a bit in exchange for <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "aztec law":
				income += random(2000, 3000);
				r.push(`People that inherit trades are sometimes too lazy to take classes in an academy, but at the same time, they fear what might happen were they to go against you. To solve both problems, you arrange a trade of fake diplomas, making sure that there is always a small detail to recognize them, so that they will get exposed in due time. This has made you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "aztec":
				income += random(1500, 2500);
				r.push(`There are a lot of slaveowners in your arcology that tend to grow quickly attached to the slaves they planned on sacrificing to sate the blood thirst of other important citizens, and such owners often come to you, begging you to swap two of their slaves' appearance. You accept, but not for free. After the surgery, this has made you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "imperial law":
				income += random(2000, 3000);
				r.push(`With Imperial Knights constantly patrolling the streets and a strict noble hierarchy flowing up from your Barons directly to you, you have a great deal of room to play with legal codes and edifices - which, of course, are constantly being modified to be eternally in your favor. The Barons and Knights who maintain your arcology happily turn a blind eye as you skim trade income directly into your pockets - after all, they're going to benefit from your success too. Sly manipulation of trade codes has earned you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "imperial":
				income += random(1500, 2500);
				r.push(`Your new Imperial culture fosters a particularly large amount of trade, given its fascination with high technology and old world culture. The constant influx of new fashions, materials, and technologies allows for one of the rarest opportunities for an ultra-wealthy plutocrat such as yourself; the chance to earn an honest dollar. By spending time at the bustling marketplace and trading in fashion, you've made <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "arabian law":
				income += random(2000, 3000);
				r.push(`You have a lot of persons scared of the consequences of not being a part of your society; even if they pay the Jizya, other citizens are not forced to accept them. So if they were to get mugged in some dark alley, people would not get outraged, and there probably wouldn't be any investigations. After buying everyone's silence, you still had <span class="yellowgreen">${cashFormat(income)}</span> to put in your pockets.`);
				break;
			case "arabian":
				income += random(1500, 2500);
				r.push(`People in your arcology are supposed to keep a myriad of slaves as their personal harem, and failure to do so is considered to be highly dishonorable. This opens up some opportunities for smuggling, as people are ready to go to great length to get an edge against their competitors. Becoming a part for this business has made you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "edo law":
				income += random(2000, 3000);
				r.push(`Outside culture is banned in your arcology. Your citizens do not need anything other than what you have inside. But this doesn't help with their curiosity — they always want to discover what the outside world is like. So you let some news and a few books from other cultures slip in, but not before you made sure they would disgust your citizens and reinforce their love for the Edo culture. The sales brought you <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "edo":
				income += random(1500, 2500);
				r.push(`During important meetings with higher society, it is wise to have a lot of slaves to put at the disposition of others. But some slaveowners grow really attached to their slaves, and so they'd much rather rent out unknown slaves from an anonymous owner's stock than use their own. This is a good opportunity to make some money, as shown by the <span class="yellowgreen">${cashFormat(income)}</span> you managed to make.`);
				break;
			case "chinese law":
				income += random(2000, 3000);
				({he, him} = getPronouns(S.HeadGirl));
				r.push(`This time, you have a good idea that will also make use of your Head Girl. You coax ${him} into thinking ${he} should accept bribes for the time being, making up a good reason on the spot, and ${he} ends up bringing back <span class="yellowgreen">${cashFormat(income)}</span> from all the bribes people gave for ${him} to turn the other way.`);
				break;
			case "chinese":
				income += random(1500, 2500);
				r.push(`Being under what people call the Mandate of Heaven means you have a crucial importance in society, and some desperate people are willing to pay just for you to throw a word or small gesture in their direction, such as simply acknowledging a child or a slave, thinking that such things will make sure the Heavens smile upon them. For these services, you get <span class="yellowgreen">${cashFormat(income)}.</span>`);
				break;
			case "southron law":
				income += random(2000, 3000);
				r.push(`Since enshrining the role of slaveowners in your arcology's society, the most prominent slaveowners in your arcology grew into important figures who command significant wealth and a modicum of power. In an act of respect, they give you a tribute of <span class="yellowgreen">${cashFormat(income)}</span> `);
				break;
			case "southron":
				income += random(1500, 2500);
				r.push(`The popularity of citizen-hosted formal events such as balls and galas have skyrocketed since embracing the Antebellum era. These events are used as opportunities to advance social standing through displays of obscene opulence, parading around well-trained slaves, and the attendance of prestigious guests. As owner of the arcology, you are the most prestigious guest of all and frequently receive 'gifts' encouraging your attendance. You received <span class="yellowgreen">${cashFormat(income)} this week.</span>`);
				break;
			default:
				income += random(500, 2000);
				r.push(`You use former contacts to get you some opportunities in your arcology and deal with them. You make little money, only <span class="yellowgreen">${cashFormat(income)}.</span>`);
		}
		/* reputation effects */
		if (V.rep >= 18000) { /* prestigious */
			r.push(`Your strong reputation makes it both really easy to find opportunities to gain quite a bit of money, but at the same time, it makes it hard to do so anonymously.`);
			if (caught || random(1, 100) >= 25) {
				r.push(`Even with your attempts at discretion, people somehow manage to recognize you, and <span class="red">rumors that you're back in the gang business</span> are spreading through your arcology like wildfire.`);
				repX((V.rep * .8) - V.rep, "personalBusiness");
				V.enduringRep *= .5;
			} else if (random(1, 100) >= 50) {
				r.push(`You are as discreet as possible, but yet some people seem to have doubts about who you are, and for quite some time, you can hear whispers <span class="red">that you may be helping the shadier businesses in your arcology.</span>`);
				repX((V.rep * .9) - V.rep, "personalBusiness");
				V.enduringRep *= .75;
			} else {
				r.push(`You fool almost everyone with your`);
				if (V.PC.actualAge >= 30) {
					r.push(`experience and`);
				}
				r.push(`cunning, but the sole fact that smugglers are in your arcology <span class="red">damages your reputation.</span>`);
				repX((V.rep * .95) - V.rep, "personalBusiness");
				V.enduringRep *= .9;
			}
		} else if (V.rep >= 9000) { // well known
			r.push(`Your reputation helps you find opportunities that need people who have proved discreet. But even when taking precautions, nothing guarantees you can stay anonymous.`);
			if (caught || random(1, 100) >= 40) {
				r.push(`Try as you might, people notice who you are, and the next day, <span class="red">rumors about your business affairs</span> are already spreading everywhere in your arcology.`);
				repX((V.rep * .9) - V.rep, "personalBusiness");
				V.enduringRep *= .65;
			} else if (random(1, 100) >= 50) {
				r.push(`You manage to fool some people, but not everyone, and soon enough, people are <span class="red">discussing whether you're smuggling or not.</span>`);
				repX((V.rep * .95) - V.rep, "personalBusiness");
				V.enduringRep *= .9;
			} else {
				r.push(`You somehow manage to hide your identity for all but the most cunning of people, so the only thing that really <span class="red">damages your reputation</span> is the fact that people associate you with gangs all the time.`);
				repX((V.rep * .98) - V.rep, "personalBusiness");
			}
		} else { /* low reputation */
			if (!caught && random(1, 100) >= 90) {
				r.push(`You work efficiently, not spending any time talking to people more than you need. Your efficiency even managed to earn you <span class="green">quite a few good words</span> from some people who were leading double lives like you were, and they made sure to get a word in about you in their business conversations.`);
				repX((V.rep * 1.05) - V.rep, "personalBusiness");
			} else if (!caught && random(1, 100) >= 50) {
				if (onBedRest(V.PC)) {
					r.push(`You get a few worrying comments from some people here and there, but most people do not care about who you are, or maybe they don't know, and it's better this way. Though your abnormal habits`);
				} else {
					r.push(`You get a few curious glances from some people here and there, but most people do not care about who you are, or maybe they don't know, and it's better this way. Though your regular absences`);
				}
				r.push(`have <span class="red">not gone unnoticed</span> and some baseless rumors are spreading.`);
				repX((V.rep * .95) - V.rep, "personalBusiness");
				V.enduringRep *= .95;
			} else {
				if (onBedRest(V.PC)) {
					r.push(`You feel like some people may have recognized your mannerisms.`);
				} else {
					r.push(`Some people whisper when you pass by them.`);
				}
				r.push(`They seem to know who you are, and you know that <span class="red">after a bit of alcohol, their tongue will come loose,</span> and you can't afford to shut them up right here, right now.`);
				repX((V.rep * .9) - V.rep, "personalBusiness");
				V.enduringRep *= .8;
			}
		}
		if (nymphoMod < 1) {
			r.push(`Your libido distracted you from your work, cutting into your potential profits; it's hard to concentrate when fresh smut is only a touch away.`);
		}
		if (onBedRest(V.PC)) {
			r.push(`Not being able to act in person limits the number of opportunities available to you while also increasing the likelihood of potential problems slipping past you.`);
		} else if (hindranceMod <= .3) {
			r.push(`With how difficult it is for you to get around, you end up only taking a fraction of the jobs you would normally consider. That is also not taking into account just how easily identifiable someone with your physique is to the public.`);
		} else if (hindranceMod <= .5) {
			r.push(`With how much your body is slowing you down, you end up only taking a fraction of the jobs you would normally consider. Even worse, your hindrances are an increasingly unique characteristic that can be used against you.`);
		} else if (hindranceMod <= .7) {
			r.push(`You keep missing out on opportunities between the difficulties getting places with your reduced mobility and the increased risk of your physical hindrances making you identifiable.`);
		} else if (hindranceMod < 1) {
			r.push(`You missed out on several lucrative deals by getting slowed down by your body.`);
		}
		income += Math.trunc(Math.min(3000 * Math.log(V.cash + 1), V.cash * 0.07));
		r.push(`This week, your illicit and legitimate business dealings earned you a combined total of <span class="yellowgreen">${cashFormat(income)}.</span>`);
		cashX(income, "personalBusiness");
	}

	function business() {
		if (V.PC.belly >= 1500) { // Gender check in 5.0.0
			income = random(500, 1000);
		} else if (V.PC.visualAge <= 13) {
			income = random(500, 1250);
		} else {
			income = random(1000, 1500);
		}
		if (V.PC.skill.trading >= 100) {
			r.push(`You focus on business and leverage your <span class="skill player">venture capital experience</span> to make good money:`);
			income += random(5000, 10000) + Math.trunc(Math.min(4000 * Math.log(V.cash), V.cash * 0.07));
		} else if (V.PC.career === "arcology owner") {
			r.push(`You focus on business and leverage your <span class="skill player">Free Cities experience</span> to make good money:`);
			income += random(5000, 10000) + Math.trunc(Math.min(4000 * Math.log(V.cash), V.cash * 0.07));
		} else {
			r.push(`You focus on business this week and make some money:`);
			income += Math.trunc(Math.min(3500 * Math.log(V.cash), V.cash * 0.07));
		}
		income = Math.trunc(income * hindranceMod * nymphoMod);
		r.push(`<span class="yellowgreen">${cashFormat(income)}.</span>`);
		cashX(income, "personalBusiness");
		if (nymphoMod < 1) {
			r.push(`Your libido distracted you from your work, cutting into your profits; dirty thoughts and attractive secretaries did you no favors.`);
		}
		if (onBedRest(V.PC)) {
			r.push(`You're restricted to online trading and video calls only, limiting the number of lucrative agreements you may have been able to pursue.`);
		} else if (hindranceMod <= .3) {
			if (V.PC.skill.trading >= 100 || V.PC.career === "arcology owner") {
				r.push(`This is an embarrassment. You know you could be so much more successful if you weren't being held back by your own body.`);
			} else {
				r.push(`With how difficult it is for you to get around, you ended up missing out on every lucrative opportunity you had your eyes on.`);
			}
		} else if (hindranceMod <= .5) {
			r.push(`While you made some lucrative investments, your body slowed you down significantly. You should be capable of so much more.`);
		} else if (hindranceMod <= .7) {
			r.push(`You keep missing out on opportunities between the difficulties getting places with your reduced mobility and your competition beating you to the punch.`);
		} else if (hindranceMod < 1) {
			r.push(`You missed out on several lucrative deals by getting slowed down by your body.`);
		}
		if (FutureSocieties.isActive('FSRomanRevivalist')) {
			r.push(`Society <span class="green">approves</span> of your close attention to your own affairs; this advances your image as a`);
			if (V.PC.title === 1) {
				r.push(`well-rounded Roman man.`);
			} else {
				r.push(`responsible Roman lady.`);
			}
			FutureSocieties.Change("Roman Revivalist", 2);
		}
	}

	function training() {
		if (V.PC.actualAge >= V.IsInPrimePC && V.PC.actualAge < V.IsPastPrimePC) {
			cal = Math.ceil(random(V.AgeTrainingLowerBoundPC, V.AgeTrainingUpperBoundPC) * V.AgeEffectOnTrainerEffectivenessPC);
			X = 1;
		}
		/*
		if V.PC.actualAge >= V.IsPastPrimePC {
			cal = Math.ceil(random(V.AgeTrainingLowerBoundPC,V.AgeTrainingUpperBoundPC)*V.AgeEffectOnTrainerEffectivenessPC);
			X = 0;
		}
		*/
		if (!onBedRest(V.PC, true)) {
			let oldSkill;
			switch (V.personalAttention.task) {
				case PersonalAttention.TRADE:
					oldSkill = V.PC.skill.trading;
					if (X === 1) {
						V.PC.skill.trading += cal;
					} else {
						V.PC.skill.trading -= cal;
					}
					if (oldSkill <= 10) {
						if (V.PC.skill.trading > 10) {
							r.push(`You now have <span class="green">basic knowledge</span> about how to be a venture capitalist.`);
						} else {
							r.push(`You have made progress towards a basic knowledge of venture capitalism.`);
						}
					} else if (oldSkill <= 30) {
						if (V.PC.skill.trading > 30) {
							r.push(`You now have <span class="green">some skill</span> as a venture capitalist.`);
						} else {
							r.push(`You have made progress towards being skilled in venture capitalism.`);
						}
					} else if (oldSkill <= 60) {
						if (V.PC.skill.trading > 60) {
							r.push(`You are now an <span class="green">expert venture capitalist.</span>`);
						} else {
							r.push(`You have made progress towards being an expert in venture capitalism.`);
						}
					} else {
						if (V.PC.skill.trading >= 100) {
							App.PersonalAttention.reset();
							V.PC.skill.trading = 100;
							r.push(`You are now a <span class="green">master venture capitalist.</span>`);
						} else {
							r.push(`You have made progress towards mastering venture capitalism.`);
						}
					}

					break;
				case PersonalAttention.WAR:
					oldSkill = V.PC.skill.warfare;
					if (X === 1) {
						V.PC.skill.warfare += cal;
					} else {
						V.PC.skill.warfare -= cal;
					}
					if (oldSkill <= 10) {
						if (V.PC.skill.warfare > 10) {
							r.push(`You now have <span class="green">basic knowledge</span> about how to be a mercenary.`);
						} else {
							r.push(`You have made progress towards a basic knowledge of mercenary work.`);
						}
					} else if (oldSkill <= 30) {
						if (V.PC.skill.warfare > 30) {
							r.push(`You now have <span class="green">some skill</span> as a mercenary.`);
						} else {
							r.push(`You have made progress towards being skilled in mercenary work.`);
						}
					} else if (oldSkill <= 60) {
						if (V.PC.skill.warfare > 60) {
							r.push(`You are now an <span class="green">expert mercenary.</span>`);
						} else {
							r.push(`You have made progress towards being an expert in mercenary work.`);
						}
					} else {
						if (V.PC.skill.warfare >= 100) {
							App.PersonalAttention.reset();
							V.PC.skill.warfare = 100;
							r.push(`You are now a <span class="green">master mercenary.</span>`);
						} else {
							r.push(`You have made progress towards mastering mercenary work.`);
						}
					}

					break;
				case PersonalAttention.SLAVING:
					oldSkill = V.PC.skill.slaving;
					if (X === 1) {
						V.PC.skill.slaving += cal;
					} else {
						V.PC.skill.slaving -= cal;
					}
					if (oldSkill <= 10) {
						if (V.PC.skill.slaving > 10) {
							r.push(`You now have <span class="green">basic knowledge</span> about how to be a slaver.`);
						} else {
							r.push(`You have made progress towards a basic knowledge of slaving.`);
						}
					} else if (oldSkill <= 30) {
						if (V.PC.skill.slaving > 30) {
							r.push(`You now have <span class="green">some skill</span> as a slaver.`);
						} else {
							r.push(`You have made progress towards being skilled in slaving.`);
						}
					} else if (oldSkill <= 60) {
						if (V.PC.skill.slaving > 60) {
							r.push(`You are now an <span class="green">expert slaver.</span>`);
						} else {
							r.push(`You have made progress towards being an expert in slaving.`);
						}
					} else {
						if (V.PC.skill.slaving >= 100) {
							App.PersonalAttention.reset();
							V.PC.skill.slaving = 100;
							r.push(`You are now a <span class="green">master slaver.</span>`);
						} else {
							r.push(`You have made progress towards mastering slaving.`);
						}
					}

					break;
				case PersonalAttention.ENGINEERING:
					oldSkill = V.PC.skill.engineering;
					if (X === 1) {
						V.PC.skill.engineering += cal;
					} else {
						V.PC.skill.engineering -= cal;
					}
					if (oldSkill <= 10) {
						if (V.PC.skill.engineering > 10) {
							r.push(`You now have <span class="green">basic knowledge</span> about how to be an arcology engineer.`);
						} else {
							r.push(`You have made progress towards a basic knowledge of arcology engineering.`);
						}
					} else if (oldSkill <= 30) {
						if (V.PC.skill.engineering > 30) {
							r.push(`You now have <span class="green">some skill</span> as an arcology engineer.`);
						} else {
							r.push(`You have made progress towards being skilled in arcology engineering.`);
						}
					} else if (oldSkill <= 60) {
						if (V.PC.skill.engineering > 60) {
							r.push(`You are now an <span class="green">expert arcology engineer.</span>`);
						} else {
							r.push(`You have made progress towards being an expert in arcology engineering.`);
						}
					} else {
						if (V.PC.skill.engineering >= 100) {
							App.PersonalAttention.reset();
							V.PC.skill.engineering = 100;
							r.push(`You are now a <span class="green">master arcology engineer.</span>`);
						} else {
							r.push(`You have made progress towards mastering arcology engineering.`);
						}
					}

					break;
				case PersonalAttention.MEDICINE:
					oldSkill = V.PC.skill.medicine;
					if (X === 1) {
						V.PC.skill.medicine += cal;
					} else {
						V.PC.skill.medicine -= cal;
					}
					if (oldSkill <= 10) {
						if (V.PC.skill.medicine > 10) {
							r.push(`You now have <span class="green">basic knowledge</span> about how to be a slave surgeon.`);
						} else {
							r.push(`You have made progress towards a basic knowledge of slave surgery.`);
						}
					} else if (oldSkill <= 30) {
						if (V.PC.skill.medicine > 30) {
							r.push(`You now have <span class="green">some skill</span> as a slave surgeon.`);
						} else {
							r.push(`You have made progress towards being skilled in slave surgery.`);
						}
					} else if (oldSkill <= 60) {
						if (V.PC.skill.medicine > 60) {
							r.push(`You are now an <span class="green">expert slave surgeon.</span>`);
						} else {
							r.push(`You have made progress towards being an expert in slave surgery.`);
						}
					} else {
						if (V.PC.skill.medicine >= 100) {
							App.PersonalAttention.reset();
							V.PC.skill.medicine = 100;
							r.push(`You are now a <span class="green">master slave surgeon.</span>`);
						} else {
							r.push(`You have made progress towards mastering slave surgery.`);
						}
					}

					break;
				case PersonalAttention.HACKING:
					oldSkill = V.PC.skill.hacking;
					if (X === 1) {
						V.PC.skill.hacking += cal;
					} else {
						V.PC.skill.hacking -= cal;
					}
					if (oldSkill <= 10) {
						if (V.PC.skill.hacking > 10) {
							r.push(`You now have <span class="green">basic knowledge</span> about how to hack and manipulate data.`);
						} else {
							r.push(`You have made progress towards a basic knowledge of hacking and data manipulation.`);
						}
					} else if (oldSkill <= 30) {
						if (V.PC.skill.hacking > 30) {
							r.push(`You now have <span class="green">some skill</span> as a hacker.`);
						} else {
							r.push(`You have made progress towards being skilled in hacking and data manipulation.`);
						}
					} else if (oldSkill <= 60) {
						if (V.PC.skill.hacking > 60) {
							r.push(`You are now an <span class="green">expert hacker.</span>`);
						} else {
							r.push(`You have made progress towards being an expert in hacking and data manipulation.`);
						}
					} else {
						if (V.PC.skill.hacking >= 100) {
							App.PersonalAttention.reset();
							V.PC.skill.hacking = 100;
							r.push(`You are now a <span class="green">master hacker.</span>`);
						} else {
							r.push(`You have made progress towards mastering hacking and data manipulation.`);
						}
					}

					break;
			}
		}
	}
};
