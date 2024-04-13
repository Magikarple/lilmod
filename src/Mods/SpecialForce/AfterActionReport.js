/**
 * @returns {[text: DocumentFragment, upkeep: number, profit: number]}
 */
App.Mods.SF.AAR = function() {
	const endWeekCall = App.Utils.isEndWeek() ? 1 : 0;
	const S = V.SF.Squad;
	const size = App.Mods.SF.upgrades.total();

	let profit = 0;
	let upkeep = 0;
	let income = 0;
	let incomeAdd = 0;
	const node = new DocumentFragment();
	let Multiplier = {
		action: 1,
		troop: 1,
		unit: 1,
		depravity: 1
	};
	let FNG = 10 + (V.SF.ArmySize / 10);
	let unitCap = 2500;
	let Trade = 0.025;
	let cost = {a: 10, b: 10};
	let N0 = 1 + (0.01 * (size / 6));
	let N1 = 1 + (0.01 * (size / 3));

	let SFD = V.SF.Depravity;
	V.SF.ArmySize = Math.clamp(V.SF.ArmySize, 0, unitCap);
	if (endWeekCall > 0) {
		if (V.SF.ArmySize < 100) {
			V.SF.ArmySize += Math.ceil(jsRandom(2, 5));
		} else {
			if (V.SF.Target === "recruit") {
				V.SF.ArmySize -= Math.ceil(jsRandom(1 * V.SF.ArmySize / 1000, 0));
			} else if (V.SF.Target === "raiding") {
				V.SF.ArmySize -= Math.ceil(jsRandom(1.15 * V.SF.ArmySize / 1000, -1.20 * V.SF.ArmySize / 1000));
			} else {
				V.SF.ArmySize -= Math.ceil(jsRandom(1.10 * V.SF.ArmySize / 1000, -1.15 * V.SF.ArmySize / 1000));
			}
		}
	}

	if (V.SF.ArmySize > 200) {
		Trade += 0.05 * (V.SF.ArmySize / 200);
		Multiplier.troop += V.SF.ArmySize / 200;
		upkeep += V.SF.ArmySize * 33 * 1/N0;
		if (V.secExpEnabled > 0 && endWeekCall > 0) {
			App.Mods.SecExp.authorityX((25 * (Math.ceil(V.SF.ArmySize / 200))) + size * 10);
		}
	}

	if (S.Firebase > 0) {
		FNG += S.Firebase;
		Trade += 0.5 * S.Firebase;
		Multiplier.unit += 7.5 * S.Firebase + 2 * Math.pow(S.Firebase, 2) * cost.a;
		incomeAdd += (5000 * S.Firebase)/ Math.max(S.Firebase - 1, 1);
		upkeep += (95 * 10 + S.Firebase) * cost.b;
	}
	if (S.Armoury > 0) {
		FNG += 2 * S.Armoury;
		Trade += 0.25 * S.Armoury;
		Multiplier.unit += 7.5 * S.Armoury + 2 * Math.pow(S.Armoury, 2) * cost.a;
		incomeAdd += (3000 * S.Armoury)/Math.max(S.Armoury - 1, 1);
		upkeep += (55 * S.Armoury) * cost.b;
	}
	if (S.Drugs > 0) {
		FNG += S.Drugs;
		Trade += 0.25 * S.Drugs;
		Multiplier.unit += 7.5 * S.Drugs + 2 * Math.pow(S.Drugs, 2) * cost.a;
		incomeAdd += (3000 * S.Drugs)/Math.max(S.Drugs - 1, 1);
		upkeep += (35 * S.Drugs) * cost.b;
	}
	if (S.Firebase >= 1) {
		if (S.AV > 0) {
			FNG += S.AV;
			Trade += 0.25 * S.AV;
			Multiplier.unit += 7.5 * S.AV + 2 * Math.pow(S.AV, 2) * cost.a;
			upkeep += (89 * S.AV) * cost.b;
		}
		if (S.TV > 0) {
			FNG += S.TV;
			Trade += 0.25 * S.TV;
			Multiplier.unit += 7.5 * S.TV + 2 * Math.pow(S.TV, 2) * cost.a;
			upkeep += (89 * S.TV) * cost.b;
		}
		if (S.PGT > 0) {
			FNG += S.PGT;
			Trade += 0.25 * S.PGT;
			Multiplier.unit += 15 * S.PGT + 3 * Math.pow(S.PGT, 2) * cost.a;
			upkeep += (100 * S.PGT) * cost.b;
		}
	}

	if (S.Firebase >= 2 && S.Drones > 0) {
		FNG += S.Drones;
		Trade += 0.5 * S.Drones;
		Multiplier.unit += 7.5 * S.Drones + 2 * Math.pow(S.Drones, 2) * cost.a;
		upkeep += (50 * S.Drones) * cost.b;
	}

	if (S.Firebase >= 4) {
		if (S.AA > 0) {
			FNG += S.AA;
			Trade += 0.25 * S.AA;
			Multiplier.unit += 7.5 * S.AA + 2 * Math.pow(S.AA, 2) * cost.a;
			upkeep += (100 * S.AA) * cost.b;
		}
		if (S.TA > 0) {
			FNG += S.TA;
			Trade += 0.25 * S.TA;
			Multiplier.unit += 7.5 * S.TA + 2 * Math.pow(S.TA, 2) * cost.a;
			upkeep += (100 * S.TA) * cost.b;
		}
		if (S.SpacePlane > 0) {
			FNG += S.SpacePlane;
			Trade += 0.25 * S.SpacePlane;
			Multiplier.unit += 7.5 * S.SpacePlane + 2 * Math.pow(S.SpacePlane, 2) * cost.a;
			upkeep += (100 * S.SpacePlane) * cost.b;
		}
		if (S.GunS > 0) {
			FNG += S.GunS;
			Trade += 0.25 * S.GunS;
			Multiplier.unit += 12 * S.GunS + 3 * Math.pow(S.GunS, 2) * cost.a;
			upkeep += (70 * S.GunS) * cost.b;
		}
		if (S.Satellite > 0 && S.SatLaunched > 0) {
			FNG += S.Satellite;
			Trade += 0.25 * S.Satellite;
			Multiplier.unit += 15 * S.Satellite + 5 * Math.pow(S.Satellite, 2) * cost.a;
			upkeep += (85 * S.Satellite) * cost.b;
		}
		if (S.GiantRobot > 0) {
			FNG += S.GiantRobot;
			Trade += 0.25 * S.GiantRobot;
			Multiplier.unit += 15 * S.GiantRobot + 5 * Math.pow(S.GiantRobot, 2) * cost.a;
			upkeep += (95 * S.GiantRobot) * cost.b;
		}
		if (S.MissileSilo > 0) {
			FNG += S.MissileSilo;
			Trade += 0.25 * S.MissileSilo;
			Multiplier.unit += 15 * S.MissileSilo + 5 * Math.pow(S.MissileSilo, 2) * cost.a;
			upkeep += (100 * S.MissileSilo) * cost.b;
		}
	}

	if (S.AircraftCarrier > 0) {
		FNG += S.AircraftCarrier;
		Trade += 0.25 * S.AircraftCarrier;
		Multiplier.unit += 9 * S.AircraftCarrier + 3 * Math.pow(S.AircraftCarrier, 2) * cost.a;
		upkeep += (80 * S.AircraftCarrier) * cost.b;
	}
	if (S.Sub > 0) {
		FNG += S.Sub;
		Trade += 0.25 * S.Sub;
		Multiplier.unit += 7.5 * S.Sub + 2 * Math.pow(S.Sub, 2) * cost.a;
		upkeep += (90 * S.Sub) * cost.b;
	}
	if (S.HAT > 0) {
		FNG += S.HAT;
		Trade += 0.25 * S.HAT;
		Multiplier.unit += 7.5 * S.HAT + 2 * Math.pow(S.HAT, 2) * cost.a;
		upkeep += (70 * S.HAT) * cost.b;
	}

	switch (V.SF.Colonel.Core) {
		case "kind":
			FNG += 10;
			Trade += 0.15;
			SFD -= 0.15;
			break;
		case "cruel":
			Trade -= 0.15;
			SFD += 0.15;
			break;
		case "brazen":
			FNG += 15;
			Multiplier.unit += 0.5;
			break;
		case "jaded":
			Trade -= 0.05;
			SFD += 0.05;
			break;
		case "shell shocked":
			Trade += 0.05;
			SFD -= 0.05;
			Multiplier.unit -= 0.5;
			break;
	}

	if (V.SF.Target === "raiding") {
		SFD += 0.05;
		Multiplier.action += 0.5;
	} else if (V.SF.Target === "secure") {
		SFD -= 0.05;
		Multiplier.action += 0.2;
	} else {
		SFD -= 0.1;
		Multiplier.action -= 0.5;
	}
	if (V.SF.ROE === "free") {
		Multiplier.action *= 0.8;
		SFD += 0.05;
		Trade += Trade * 0.95;
	} else if (V.SF.ROE === "hold") {
		Multiplier.action *= 1.1;
		SFD -= 0.05;
		Trade += Trade * 1.05;
	}
	if (V.SF.Regs === "none") {
		Multiplier.action *= 0.8;
		SFD += 0.05;
		Trade += Trade * 0.95;
	} else if (V.SF.Regs === "strict") {
		Multiplier.action *= 1.1;
		SFD -= 0.05;
		Trade += Trade * 1.05;
		Multiplier.depravity = 1 + SFD;
	}
	if (SFD > -2) {
		Trade *= 1 + SFD / 2;
	}

	if (V.SF.Target === "recruit") {
		FNG += FNG * 0.95;
	} else {
		FNG += FNG * 0.25;
	}
	FNG = Math.ceil(FNG / 2);

	if (endWeekCall > 0) {
		if (V.SF.Target === "secure") {
			repX((Math.ceil(V.rep * ((Trade / 100) * 0.95))), "specialForces");
			V.arcologies[0].prosperity = Math.ceil((V.arcologies[0].prosperity + (Trade / 10) * 0.95));
		} else {
			repX((Math.ceil(V.rep * (Trade / 100) * 0.25)), "specialForces");
			V.arcologies[0].prosperity = Math.ceil(V.arcologies[0].prosperity + (Trade / 10) * 0.25);
		}
	}

	income += (1 + Multiplier.troop / N0) * (1 + Multiplier.unit / N0) * (1 + Multiplier.action / N0) * (1 + Multiplier.depravity / N0);
	upkeep += 30000 + (25000 * 1 / N1);
	if (V.SF.Target === "raiding") {
		income *= 1.25;
	} else if (V.SF.Target === "secure") {
		income *= 1.05;
	} else { // When recruiting, upkeep is lowered, effect dependent on amount of soldiers. At max capacity, multiplier back to 1.
		upkeep *= 0.75 + (V.SF.ArmySize/10000);
	}

	if (V.economy.isBetween(33, 100)) {
		let multiplier = (1.75 * Math.sqrt(Math.trunc(100000/V.economy-1000)/10)) + (0.2 * (Math.trunc(100000/V.economy-1000)/10));
		income *= (1 + multiplier/100);
	} else if (V.economy <= 33) { // There comes a point where a worse global economy no longer benefits your Special Forces.
		let multiplier = (1.75 * Math.sqrt(Math.trunc(100000/33-1000)/10)) + (0.2 * (Math.trunc(100000/33-1000)/10));
		income *= (1 + multiplier/100);
	}
	income = Math.ceil(income + incomeAdd);
	upkeep = Math.ceil(upkeep);
	profit = income - upkeep;

	if (endWeekCall > 0) {
		V.SF.ArmySize += FNG;
		if (V.debugMode > 0) {
			App.UI.DOM.appendNewElement("div", node, `income:${cashFormat(income)}, upkeep:${cashFormat(upkeep)}, profit:${cashFormat(profit)}, troop:${num((0.09+Multiplier.troop/N0).toFixed(2))}, unit:${num((0.09+Multiplier.unit/N0).toFixed(2))}, action:${num((0.09+Multiplier.action/N0).toFixed(2))}, depravity:${num((0.09+Multiplier.depravity/N0).toFixed(2))}, N0: ${N0} N1: ${N1}`);
		}

		cashX(income, "specialForces");
		// We run this in economyJS.js now.
		// cashX(forceNeg(upkeep), "specialForces");
		V.SF.ArmySize = Math.clamp(V.SF.ArmySize, 0, unitCap);
		V.arcologies[0].prosperity = Math.clamp(V.arcologies[0].prosperity, 0, V.AProsperityCap);

		if (V.SF.UC.Assign === 1 && V.SF.UC.Lock < 1) {
			V.SF.UC.Assign = 0;
		}
		V.SF.Upgrade = 0;

		const capSF = capFirstChar(V.SF.Lower || "the Special Force");
		App.UI.DOM.appendNewElement("h3", node, `${capSF} (AO: ${V.terrain}) operational report:`);
		App.UI.DOM.appendNewElement("span", node, ` ${capSF} focused their ${num(V.SF.ArmySize)} troops on`);

		if (V.SF.Target === "recruit") {
			App.UI.DOM.appendNewElement("span", node, ` recruiting and training more personnel. Smaller parties ventured out to protect the arcology's trade routes and strike targets of opportunity.`);
		} else if (V.SF.Target === "secure") {
			App.UI.DOM.appendNewElement("span", node, ` securing the trade routes between the arcology and the surrounding area. Smaller parties ventured out to strike targets of opportunity and process new recruits.`);
		} else {
			App.UI.DOM.appendNewElement("span", node, ` locating and striking targets of opportunity, capturing both material loot and new slaves. Smaller parties secured the most important of the arcology's trade routes and processed new recruits.`);
		}

		if (V.SF.UC.Assign > 0) {
			App.UI.DOM.appendNewElement("div", node, `A ${V.SF.UC.Assign < 2 ? 'small':'large'} portion of the force was assigned as ${V.SF.UC.Assign < 2 ? 'part':'full'} time undercover officers.`);
		}

		App.UI.DOM.appendNewElement("span", node, " These activities have, overall");
		App.UI.DOM.appendNewElement("span", node, " improved your arcology's prosperity.", ["green"]);
		App.UI.DOM.appendNewElement("span", node, ` The goods procured by ${V.SF.Lower} after accounting for the spoils retained by individual soldiers were`);

		if (profit > 0) {
			App.UI.DOM.appendNewElement("span", node, " more than sufficient to cover expenses.", ["green"]);
			App.UI.DOM.appendNewElement("span", node, " Excess material and human assets totaling");
			App.UI.DOM.appendNewElement("span", node, ` ${cashFormat(profit)}`, ["yellowgreen"]);
			App.UI.DOM.appendNewElement("span", node, " (after liquidation) and paying expenses were transferred to your accounts.");
			if (V.economy < 100) {
				App.UI.DOM.appendNewElement("span", node, " The rapidly degrading global economy has one upside,");
				App.UI.DOM.appendNewElement("span", node, ` more 'persuasive' techniques were able to be implemented thus leading to an increase in profit.`, ["green"]);
			}
		} else {
			App.UI.DOM.appendNewElement("span", node, " barely enough to cover expenses.", ["red"]);
			App.UI.DOM.appendNewElement("span", node, " More growth will be needed to ensure profitability;");
			App.UI.DOM.appendNewElement("span", node, " purchasing more upgrades may help.", ["yellow"]);
			App.UI.DOM.appendNewElement("span", node, " Per estimates provided, an additional");
			App.UI.DOM.appendNewElement("span", node, ` ${cashFormat(Math.abs(profit))}`, ["yellowgreen"]);
			App.UI.DOM.appendNewElement("span", node, " is required for sufficient cover.");
		}
		App.UI.DOM.appendNewElement("span", node, ` This represents a difference of ${num(Math.abs(((profit / V.SF.lastWeeksProfit) * 100).toFixed(2)))}% since last week's profit of ${cashFormat(V.SF.lastWeeksProfit)}.`);
		V.SF.lastWeeksProfit = profit;

		App.UI.DOM.appendNewElement("span", node, ` ${FNG} new soldiers were recruited this week, and your reputation has`);
		App.UI.DOM.appendNewElement("span", node, " increased through the improvement of trade security.", ["green"]);

		App.Events.addParagraph(node, ["As the leader of a military force, The Colonel has very limited free time during the week and is only able to issue orders or provide basic reports."]);
		App.UI.DOM.appendNewElement("p", node, weeklyActions());
		App.UI.DOM.appendNewElement("div", node, weeklyOptions());

		if (V.SF.MercCon.CanAttend === 1) {
			V.SF.MercCon.Income = 0;
			V.SF.MercCon.Menials = 0;
			const tradeShowAttendees = 200;
			const menialGiftsPerAttendee = 5;
			const menialGifts = Math.ceil(jsRandom(1, ((tradeShowAttendees * menialGiftsPerAttendee) / 10)));
			const TSProfit = Math.ceil(500000 * (1 + (size / 1000)) * (1 + (V.arcologies[0].prosperity / 1000)) * App.Mods.SF.env());
			const NewMercs = jsRandom(1, (tradeShowAttendees / 10));

			V.SF.MercCon.Menials += menialGifts;
			V.SF.MercCon.TotalMenials += menialGifts;
			V.menials += menialGifts;
			V.SF.MercCon.History++;
			V.SF.MercCon.Income += TSProfit;
			V.SF.MercCon.Revenue += TSProfit;
			cashX(TSProfit, "specialForces");

			if (V.secExpEnabled > 0 && V.mercenaries > 0) {
				V.SF.MercCon.Mercs = 0;
				V.SecExp.units.mercs.free += NewMercs;
				V.SF.MercCon.TotalMercs += NewMercs;
				V.SF.MercCon.Mercs += NewMercs;
			}
			App.UI.DOM.appendNewElement("span", node, "TradeShow: ", ["bold"]);
			App.UI.DOM.appendNewElement("span", node, `During a break, The Colonel managed to sell some generic schematics to the ${tradeShowAttendees} attendees, some of whom decided to also give a few menial slaves as a bonus.`);
		}

		V.SF.MercCon.CanAttend = -1;
	}
	return [node, upkeep, profit];

	function weeklyOptions() {
		const choices = document.createElement("span");
		App.UI.DOM.appendNewElement("div", choices, `The Colonel looks down a list on her tablet. "There's some things we can do to help you out, boss.`);
		App.UI.DOM.appendNewElement("div", choices, App.UI.DOM.link("Request cash",
			() => {
				weeklyGift(1);
				App.UI.DOM.replace(choices, "");
			}, [], "",
			"We've had some good prizes turn up, that's made us some extra money we could turn over."
		));

		if (V.rep < 20000) {
			App.UI.DOM.appendNewElement("div", choices, App.UI.DOM.link("military parade",
				() => {
					weeklyGift(2);
					App.UI.DOM.replace(choices, "");
				}, [], "",
				"If you want we could throw a quick military parade, get the people feeling extra patriotic."
			));
		}

		if (V.arcologies[0].prosperity < V.AProsperityCap) {
			App.UI.DOM.appendNewElement("div", choices, App.UI.DOM.link("Request sabotage",
				() => {
					weeklyGift(3);
					App.UI.DOM.replace(choices, "");
				}, [], "",
				`Or we could hit some businesses that rival the ones in ${V.arcologies[0].name} with some sabotage.`
			));
		}

		return choices;

		/**
			* @param {number} input
			*/
		function weeklyGift(input) {
			let value;
			let EnvProsperity;
			const env = App.Mods.SF.env();
			const size = App.Mods.SF.upgrades.total();

			switch (input) {
				case 1: // Request cash
					cashX(Math.max(Math.ceil(25000 * (size/10) * env), 5000), "specialForcesCap");
					break;
				case 2: // Request military parade
					value = 50 * (Math.ceil(size * 0.03 * env));
					repX((Number(value) ? value : 500), "specialForces");
					break;
				case 3: // Request sabotage
					switch (env) {
						case 4: EnvProsperity = 3; break;
						case 3: EnvProsperity = 5; break;
						case 2: EnvProsperity = 7; break;
					}
					value = EnvProsperity + (Math.ceil(size/100 * env));
					if (V.arcologies[0].prosperity + value * 0.8 > V.AProsperityCap) {
						V.arcologies[0].prosperity = V.AProsperityCap;
					} else {
						V.arcologies[0].prosperity += Math.ceil(value * 0.8);
					}
			}
		}
	}

	function weeklyActions() {
		const colonelTalkTensionRuction = V.SF.FS.Tension !== -1 ? 5 : 0;
		const choices = document.createElement("span");

		if (V.SF.Colonel.Status >= 25) {
			App.UI.DOM.appendNewElement("div", choices, App.UI.DOM.link("Walk with The Colonel on the surface",
				() => {
					V.SF.Colonel.Status += 2;
					V.SF.FS.Tension -= colonelTalkTensionRuction;
					const Env = {};
					const text = document.createElement("span");
					switch (App.Mods.SF.env()) {
						case 4:
							Env.cash2 = 450;
							Env.cash3 = 200;
							Env.cash4 = 100;
							break;
						case 3:
							Env.cash2 = 500;
							Env.cash3 = 250;
							Env.cash4 = 150;
							break;
						case 2:
							Env.cash2 = 550;
							Env.cash3 = 300;
							Env.cash4 = 200;
					}
					let r = [];
					r.push("You ask The Colonel if she would like to stretch her legs up on the surface. It doesn't take much effort for her to agree.");
					if (V.PC.skill.warfare >= 100 && V.PC.career === "mercenary") {
						r.push(`Your mastery of wet work and prior experience in a PMC satisfies The Colonel that between you${S.Bodyguard ? `, ${S.Bodyguard.slaveName},` : ``} and her, there should be little threat to walking around the arcology.`);
						r.push(`Being able to see and interact with the arcology owner directly maintains the false idea that you're just like one of them while also giving them an increased opportunity to try gaining your favor.`);
						repX(10, "specialForces");
						cashX(Env.cash2, "specialForces");
					} else if (V.PC.skill.warfare >= 100) {
						r.push(`Your mastery of wet work satisfies The Colonel that you only need two soldiers ${S.Bodyguard ? `plus ${S.Bodyguard.slaveName}` : ``} to walk safely around the arcology.`);
						r.push(`Being able to see and interact with the arcology owner directly maintains the false idea that you're just like one of them while also giving them an increased opportunity to try gaining your favor.`);
						repX(5, "specialForces");
						cashX(Env.cash3, "specialForces");
					} else if (V.PC.skill.warfare >= 60) {
						r.push(`With some expertise in warfare, The Colonel believes ${S.Bodyguard ? `with ${S.Bodyguard.slaveName}` : ``} you only need a squad of armed soldiers for a walk through the arcology.`);
					} else if (V.PC.skill.warfare >= 30) {
						r.push(`As you have some skill in warfare, The Colonel believes ${S.Bodyguard ? `in addition to ${S.Bodyguard.slaveName}` : ``} you only need two full squads of armed soldiers for a walk around the arcology.`);
					} else if (V.PC.skill.warfare >= 10) {
						r.push(`Your minor skill in warfare convinces The Colonel that ${S.Bodyguard ? `in addition to ${S.Bodyguard.slaveName},` : ``} you need two full squads of armed soldiers and an armored car escort for a simple walk around the arcology.`);
					} else {
						r.push(`Your complete lack of combat skill convinces The Colonel that ${S.Bodyguard ? `in addition to ${S.Bodyguard.slaveName},` : ``} you need two full squads of armed soldiers, an armored car escort, and a sniper overwatch for a simple walk around the arcology.`);
					}
					App.UI.DOM.appendNewElement("div", text, r.join(" "));

					r = [];
					r.push("As you make your way through the arcology you stop at a");
					if (FutureSocieties.isActive('FSPaternalist')) {
						r.push(`paternalist shop, ${V.SF.Colonel.Core === "cruel" ? "earning a sneer from The Colonel" : "helping The Colonel select some luxurious and relaxing slave treatments"}.`);
					} else if (FutureSocieties.isActive('FSPastoralist')) {
						r.push(`pastoralist shop, helping The Colonel select a more comfortable breast pump.`);
					} else {
						r.push(`shop that catches The Colonel's eye.`);
					}
					if (V.PC.skill.slaving >= 100 && V.PC.career === "slaver") {
						r.push(`Your mastery and extensive history of slaving allows you to assist The Colonel greatly. The shop owner is so impressed by your understanding of slavery that she asks you for some advice. Before you leave, you manage to pass on a few tips, helping the business with future customers.`);
						if (V.arcologies[0].prosperity < V.AProsperityCap) {
							V.arcologies[0].prosperity += 2;
						}
					} else if (V.PC.skill.slaving >= 100) {
						r.push(`Your mastery of slaving allows you to assist The Colonel greatly. The shop owner is so impressed by your understanding of slavery that she asks you for some advice. Before you leave, you manage to pass on a few tips, helping the business with future customers.`);
						if (V.arcologies[0].prosperity < V.AProsperityCap) {
							V.arcologies[0].prosperity++;
						}
					} else if (V.PC.skill.slaving >= 60) {
						r.push(`Your expertise in slavery allows you to help The Colonel decide what to buy for her main slave.`);
					} else if (V.PC.skill.slaving >= 30) {
						r.push(`Your moderate skill in slavery makes you somewhat helpful to The Colonel in deciding what to buy for her main slave.`);
					} else if (V.PC.skill.slaving >= 10) {
						r.push(`Your basic skill level of slavery doesn't allow you to help The Colonel at all.`);
					} else if (V.PC.skill.slaving < 10) {
						r.push(`Your total lack of slavery skill (which is very unusual and very concerning for an arcology owner) means that you are of little to no help or even a hindrance. The shopkeeper notices your complete ineptitude, and as soon as you've left the rumor mill begins.`);
						repX(-20, "PCactions");
					}
					App.UI.DOM.appendNewElement("div", text, r.join(" "));

					r = [];
					r.push(`Soon the entourage heads back to the HQ of ${V.SF.Lower}.`);
					if (random(1, 100) > 50) {
						r.push(`Along the route you see a homeless citizen with a serious injury begging for help.`);
						if (V.PC.skill.medicine >= 100 && V.PC.career === "medicine") {
							r.push(`Your expertise in surgery ensures that the citizen receives the best care they'll ever experience in their life. They are so grateful that they are more than happy to try and compensate your time. Word quickly spreads of the kindly medically trained arcology owner who took the time to heal a citizen, providing confidence to the rest of the citizens.`);
							repX(10, "specialForces");
							cashX(Env.cash4, "specialForces");
						} else if (V.PC.skill.medicine >= 100) {
							r.push(`Your expertise in surgery ensures that the citizen receives the best care they'll ever experience in their life. Word quickly spreads of the kindly arcology owner who took the time to heal a citizen.`);
							repX(5, "specialForces");
						} else if (V.PC.skill.medicine >= 60) {
							r.push(`Your proficiency in surgery allows you to properly close their wound with minimal trauma to the patient.`);
						} else if (V.PC.skill.medicine >= 30) {
							r.push(`Your moderate surgical skill ensures that you can close the citizen's wound, though not without likely scarring.`);
						} else if (V.PC.skill.medicine >= 10) {
							r.push(`Your basic surgical skill in medicine is sufficient only to stabilize the citizen's wounds before medical assistance arrives.`);
						} else {
							r.push(`Your total lack of surgical skill causes the death of the citizen through repeated medical blunders.`);
							V.arcologies[0].prosperity -= 0.25;
						}
					}
					App.UI.DOM.appendNewElement("div", text, r.join(" "));

					App.UI.DOM.replace(choices, text);
				}
			));
		}

		App.UI.DOM.appendNewElement("div", choices, App.UI.DOM.link(`Talk in ${V.SF.Lower}'s HQ`,
			() => {
				const option = document.createElement("span");
				App.UI.DOM.appendNewElement("div", option, "What do you want to do with The Colonel in the HQ?");

				App.UI.DOM.appendNewElement("div", option, App.UI.DOM.link("Talk",
					() => {
						V.SF.Colonel.Status += 3;
						V.SF.FS.Tension -= colonelTalkTensionRuction;
						switch (random(1, 6)) {
							case 1:
								IncreasePCSkills(['medicine', 'trading', 'slaving'], 1);
								break;
							case 2:
								IncreasePCSkills(['trading', 'slaving', 'engineering'], 1);
								break;
							case 3:
								IncreasePCSkills(['slaving', 'engineering', 'hacking'], 1);
								break;
							case 4:
								IncreasePCSkills(['engineering', 'hacking', 'warfare'], 1);
								break;
							case 5:
								IncreasePCSkills(['hacking', 'warfare', 'medicine'], 1);
								break;
							case 6:
								IncreasePCSkills(['warfare', 'medicine', 'trading'], 1);
						}
						App.UI.DOM.replace(option, `You and The Colonel talk over some ${V.PC.refreshment}, where she ends up talking about her past. You learn a little more about her.`);
					}
				));

				App.UI.DOM.appendNewElement("div", option, App.UI.DOM.link("Learn",
					() => {
						V.SF.Colonel.Status++;
						V.SF.FS.Tension -= colonelTalkTensionRuction;
						let r = [`"Sure boss, I can use a break from all of this," she laughs. The Colonel tells a story about one time when she`];
						switch (random(1, 6)) {
							case 1:
								r.push(`used field medicine to save another merc's life, teaching you some medical procedures in the process.`);
								IncreasePCSkills('medicine', 5);
								break;
							case 2:
								r.push(`haggled for necessary gear with a stingy quartermaster, teaching you how to get what you want from traders.`);
								IncreasePCSkills('trading', 5);
								break;
							case 3:
								r.push(`found a load of human chattel in a raid and had to manage them before they could later be unloaded, teaching you how to better care for your slaves.`);
								IncreasePCSkills('slaving', 5);
								break;
							case 4:
								r.push(`was responsible for rebuilding a fort she had seized, teaching you how to better manage construction in your arcology.`);
								IncreasePCSkills('engineering', 5);
								break;
							case 5:
								r.push(`was forced to hack her way out of a trap, teaching you how to better penetrate digital security.`);
								IncreasePCSkills('hacking', 5);
								break;
							case 6:
								r.push(`fought off an entire battalion with only a small squad, teaching you how to think tactically in battle.`);
								IncreasePCSkills('warfare', 5);
						}
						App.UI.DOM.replace(option, r.join(" "));
					}
				));

				if (V.SF.Colonel.Status >= 45) {
					App.UI.DOM.appendNewElement("div", option, App.UI.DOM.link("Have some fun",
						() => {
							V.SF.Colonel.Status += 3;
							V.SF.FS.Tension -= colonelTalkTensionRuction;

							const choice = document.createElement("span");
							App.UI.DOM.appendNewElement("div", choice, "Where should this fun take place?");

							App.UI.DOM.appendNewElement("div", choice, App.UI.DOM.link("In private",
								() => {
									App.UI.DOM.replace(choice, sexOptions());
								}
							));

							App.UI.DOM.appendNewElement("div", choice, App.UI.DOM.link("On The Colonel's throne",
								() => {
									App.UI.DOM.replace(choice, sexOptions());
								}
							));

							App.UI.DOM.replace(option, choice);
						}
					));
				}

				function sexOptions() {
					const options = document.createElement("span");
					App.UI.DOM.appendNewElement("div", options, "Which orifice do you wish to target?");
					App.UI.DOM.appendNewElement("div", options, App.UI.DOM.link("Pussy",
						() => {
							App.UI.DOM.replace(options, ColonelSexDec());
						}
					));

					App.UI.DOM.appendNewElement("div", options, App.UI.DOM.link("Ass",
						() => {
							App.UI.DOM.replace(options, ColonelSexDec());
						}
					));

					App.UI.DOM.appendNewElement("div", options, App.UI.DOM.link("Both pussy and ass",
						() => {
							App.UI.DOM.replace(options, ColonelSexDec());
						}
					));

					App.UI.DOM.appendNewElement("div", options, App.UI.DOM.link("Mouth",
						() => {
							App.UI.DOM.replace(options, ColonelSexDec());
						}
					));

					App.UI.DOM.appendNewElement("div", options, App.UI.DOM.link("All three holes",
						() => {
							App.UI.DOM.replace(options, ColonelSexDec());
						}
					));
					return options;
				}

				App.UI.DOM.replace(choices, option);
			}
		));

		return choices;
	}

	function ColonelSexDec() {
		const description = document.createElement("span");
		switch (V.SF.Colonel.Core) {
			case "shell shocked":
				App.UI.DOM.appendNewElement("div", description, "The entire time it is obvious that The Colonel is reliving a horrible event.");
				App.UI.DOM.appendNewElement("div", description, App.UI.DOM.link("Try to bring her back",
					() => {
						App.UI.DOM.replace(description, "You made an attempt to try to bring her back to the present.");
					}
				));
				App.UI.DOM.appendNewElement("div", description, App.UI.DOM.link("Leave her be",
					() => {
						App.UI.DOM.replace(description, "It is probably better that she tries to deal with her demons alone.");
					}
				));
				break;
			default:
				App.UI.DOM.appendNewElement("div", description, "Inset sex noises here.");
		}
		return description;
	}
};
