App.UI.manageArcology = function() {
	const frag = new DocumentFragment();

	V.nextButton = "Back";
	V.nextLink = "Main";
	App.UI.StoryCaption.encyclopedia = "The X-Series Arcology";

	const arcologyName = V.arcologies[0].name;

	frag.append(
		description(),
		ownership(),
		construction(),
		weather(),
		sexualServices(),
		language(),
		upgrades(),
		records(),
	);

	if (V.eventResults.foodCrisis) {
		frag.append(
			foodMarket()
		);
	}

	if (V.secExpEnabled) {
		frag.append(
			security(),
			military(),
		);
	}

	if (V.experimental.dinnerParty === 1 && V.seeExtreme === 1) {
		frag.append(
			events(),
		);
	}

	return frag;

	function description() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		if (V.cheatMode === 1) {
			App.UI.DOM.appendNewElement("div", div,
				App.UI.DOM.passageLink(`Cheat Edit Arcology`, "MOD_Edit Arcology Cheat"),
				["cheat-menu"]);
		}

		App.UI.DOM.appendNewElement("h1", div,
			App.UI.DOM.link(`${V.arcologies[0].name}`, () => {
				if (Dialog.isOpen()) {
					Dialog.close();
				}
				Dialog.setup("Rename");

				const frag = new DocumentFragment();

				frag.append(App.UI.DOM.makeTextBox(V.arcologies[0].name, str => { V.arcologies[0].name = str; App.UI.reload(); }));
				$(Dialog.body()).empty().append(frag);
				Dialog.open();
			})
			, ["white", "center"]
		);

		App.UI.DOM.appendNewElement("div", div, V.building.render());

		if (V.seeArcology === 1) {
			div.append(App.Desc.playerArcology(
				App.UI.DOM.link(`Hide`, () => {
					V.seeArcology = 0;
					App.UI.reload();
				})
			));
		}

		return div;
	}

	function ownership() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		App.Arcology.updateOwnership();

		App.UI.DOM.appendNewElement("h2", div, "Arcology Ownership");
		div.append(ownershipReport(false));

		if (FutureSocieties.availCredits() > 0) {
			App.UI.DOM.appendNewElement("span", div, ` Society is ready to begin accepting a new societal direction.`, ['noteworthy']);
		}

		return div;
	}

	function construction() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		App.UI.DOM.appendNewElement("h2", div, "Construction");

		if (V.arcologyUpgrade.drones !== 1) {
			App.UI.DOM.appendNewElement("div", div, `The first major upgrade needed is the installation of a drone security system so higher-class citizens will feel safe and protected should they choose to immigrate.`);
			div.append(makePurchase(`Install drone security system`, 5000 * V.upgradeMultiplierArcology, "capEx", {
				notes: [`increases upkeep`],
				handler: () => {
					V.arcologyUpgrade.drones = 1;
					V.PC.skill.engineering++;
				},
			}));
		} else {
			App.UI.DOM.appendNewElement("div", div, `A drone-based security system has been installed throughout ${arcologyName}.`);

			if (V.arcologyUpgrade.hydro !== 1) {
				App.UI.DOM.appendNewElement("div", div, `The next major upgrade needed is the installation of a better water reclamation system so your residents will have access to cheaper water and hydroponically grown food.`);
				div.append(makePurchase(`Upgrade water reclamation system`, 10000 * V.upgradeMultiplierArcology, "capEx", {
					notes: [`increases upkeep`],
					handler: () => {
						V.arcologyUpgrade.hydro = 1;
						V.PC.skill.engineering++;
					},
				}));
			} else {
				App.UI.DOM.appendNewElement("div", div, `Large pipes from the advanced water reclamation system can occasionally be seen snaking their way through the plumbing system.`);

				if (V.arcologyUpgrade.apron !== 1) {
					App.UI.DOM.appendNewElement("div", div, `The next major upgrade needed is the installation of a broader apron at the bottom of the arcology to increase its surface area and gather more solar energy. Right now, tenants that use a lot of power have to import it from outside.`);
					div.append(makePurchase(`Install solar apron`, 20000 * V.upgradeMultiplierArcology, "capEx", {
						notes: [`increases upkeep`],
						handler: () => {
							V.arcologyUpgrade.apron = 1;
							V.PC.skill.engineering++;
						},
					}));
				} else {
					App.UI.DOM.appendNewElement("div", div, `Huge swathes of solar panels are installed on the outside of ${arcologyName}, covering nearly everything that isn't glass or an entrance.`);

					if (V.arcologyUpgrade.grid !== 1) {
						App.UI.DOM.appendNewElement("div", div, `The next major upgrade needed is an improvement of the arcology's electrical transmission lines to make efficient use of the additional power from the solar apron.`);
						div.append(makePurchase(`Upgrade transmission lines`, 50000 * V.upgradeMultiplierArcology, "capEx", {
							notes: [`increases upkeep`],
							handler: () => {
								V.arcologyUpgrade.grid = 1;
								V.PC.skill.engineering++;
							},
						}));
					} else {
						App.UI.DOM.appendNewElement("div", div, `Thick cables as large as your forearm can be seen in the exposed ceilings of some parts of your arcology.`);
						App.UI.DOM.appendNewElement("div", div, App.Arcology.upgrades(V.building));
					}
				}
			}
		}

		const text = [];

		if (V.weatherCladding === 0) {
			text.push(`Extreme weather is becoming common worldwide. The arcology's exterior can be hardened to reduce damage in case of heavy weather, but this will reduce its beauty somewhat. Your citizens are`);

			if (V.weatherAwareness === 0) {
				text.push(`likely to disapprove of this measure as alarmism.`);
			} else {
				text.push(App.UI.DOM.makeElement("span", `concerned that this measure has not been taken already.`, ['noteworthy']));
			}

			App.Events.addNode(div, text, "div");

			div.append(makePurchase(`Apply weather cladding`, 50000 * V.upgradeMultiplierArcology, "capEx", {
				handler: () => {
					V.weatherCladding++;
					V.PC.skill.engineering++;
				},
			}));
		} else {
			text.push(`The arcology's exterior is jacketed with ${V.weatherCladding === 1 ? "unsightly but sturdy" : "gorgeously sculpted and fully functional"} weather cladding.`);

			App.Events.addNode(div, text, "div");

			if (V.weatherCladding === 1 && V.building.sections.length > 0) {
				div.append(
					`Your arcology is so prosperous that remodeling the cladding into something beautiful is within the realm of possibility. This massive project without a doubt render your arcology one of the wonders of the world.`,
					makePurchase(`Remodel weather cladding`, 3_500_000 * V.upgradeMultiplierArcology, "capEx", {
						handler: () => {
							V.weatherCladding++;
							V.PC.skill.engineering++;
						},
					})
				);
			}
		}

		if (V.FCTV.receiver > -1 && !V.FCTV.weekEnabled) {
			App.UI.DOM.appendNewElement("div", div, "You have not installed an FCTV receiver.");

			div.append(
				`You can purchase a receiver and cover the cost yourself.`,
				makePurchase(`No subsidy`, 25000 * V.upgradeMultiplierArcology, "capEx", {
					handler: () => {
						V.FCTV.receiver = 1;
						V.FCTV.weekEnabled = V.week;
						FCTV.initChannels();

						repX(500, "capEx");
					},
				}),
				`You can also have your citizens cover some of the cost, instead.`,
				makePurchase(`Minor subsidy`, 20000 * V.upgradeMultiplierArcology, "capEx", {
					handler: () => {
						V.FCTV.receiver = 1;
						V.FCTV.weekEnabled = V.week;
						FCTV.initChannels();
					},
				}),
				`You could also choose to have your citizens cover most of the cost.`,
				makePurchase(`Major subsidy`, 15000 * V.upgradeMultiplierArcology, "capEx", {
					notes: [`will upset your citizens`],
					handler: () => {
						V.FCTV.receiver = 1;
						V.FCTV.weekEnabled = V.week;
						FCTV.initChannels();

						repX(-1500, "capEx");
					},
				}),
			);
		} else {
			const text = [];

			text.push(`You have installed the FCTV receiver and have access to the full range of FCTV's programs.`);

			if (V.FCTV.receiver === 3) {
				text.push(`High viewership rates amongst your citizens makes it easier to pursue your societal goals.`);
			} else if (V.FCTV.receiver === 2) {
				text.push(`Decent viewership rates amongst your citizens makes it somewhat easier to pursue your societal goals.`);
			} else if (V.FCTV.receiver === 1) {
				text.push(`Low viewership rates amongst your citizens limits the impact of FCTV on your societal goals.`);
			}

			App.UI.DOM.appendNewElement("div", div, text.join(' '));
		}

		if (V.PC.skill.engineering >= 100 || V.PC.career === "arcology owner") {
			const innerDiv = App.UI.DOM.appendNewElement("div", div, "Arcology upgrades are less expensive due to your ");

			App.UI.DOM.appendNewElement("span", innerDiv, V.PC.career === "arcology owner" ? `experience in the Free Cities.` : `arcology engineering training.`, ["player", "skill"]);
		}

		return div;
	}

	function weather() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		App.UI.DOM.appendNewElement("h2", div, "Weather");

		if (V.difficultySwitch === 1) {
			if (V.econWeatherDamage > 0) {
				div.append(
					`The recent terrible weather has damaged the local infrastructure. It is `,
					App.UI.DOM.makeElement("span", `reducing the local economy score by ${num(V.econWeatherDamage)}.`, ['warning'])
				);

				if (V.disasterResponse === 0) {
					div.append(
						` Locals will do their best to repair the damage on their own, but setting up a disaster response unit will improve the recovery of infrastructure critical for keeping goods, people and information flowing smoothly in and out of your arcology.`,
						makePurchase(`Create a disaster response unit`, 50000 * V.upgradeMultiplierArcology, "capEx", {
							notes: [`increases upkeep`],
							handler: () => {
								V.disasterResponse++;
								V.PC.skill.engineering++;
							}
						}),
					);
				} else if (V.disasterResponse === 1) {
					div.append(
						` You are sending your disaster response unit to repair critical infrastructure. They are doing what they can.`,
						makePurchase(`Purchase specialized all-weather equipment for the response unit`, 100_000 * V.upgradeMultiplierArcology, "capEx", {
							notes: [`increases upkeep`],
							handler: () => {
								V.disasterResponse++;
								V.PC.skill.engineering++;
							}
						}),
					);
				} else {
					App.UI.DOM.appendNewElement("div", div, "Your highly capable disaster response unit is rapidly repairing the weather damage.");
				}
			} else if (V.disasterResponse > 0) {
				App.UI.DOM.appendNewElement("div", div, "Your disaster response unit is idle. It will not cost you any upkeep this week.");
			}
		}

		if (V.weatherAwareness > 0) {
			if (V.antiWeatherFreeze === 0) {
				div.append(
					`The extreme weather hurts your arcology's ability to function. Reinforcing your passenger terminals increase the weather range at which they can operate.`,
					makePurchase(`Reinforce the passenger terminals`, 50000 * V.upgradeMultiplierArcology, "capEx", {
						notes: [`increases upkeep`],
						handler: () => {
							V.antiWeatherFreeze++;
							V.PC.skill.engineering++;
						}
					}),
				);
			} else if (V.antiWeatherFreeze === 1) {
				div.append("You have reinforced your passenger terminals to function even during bad weather. You can invest in an all-weather transportation system that will remain operational, no matter the weather.");
				div.append(
					makePurchase(`Invest in a heavily-armored transportation system`, 100_000 * V.upgradeMultiplierArcology, "capEx", {
						notes: [`increases upkeep`],
						handler: () => {
							V.antiWeatherFreeze++;
							V.PC.skill.engineering++;
						}
					}),
				);
			} else if (V.antiWeatherFreeze === 2) {
				App.UI.DOM.appendNewElement("div", div, "Your arcology's passenger terminals remain fully operational during even the most extreme weather.");
			}
		} else {
			div.append(`The weather outside the arcology is perfectly manageable, for the time being.`);
		}

		return div;
	}

	function sexualServices() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		const societyClasses = ["lower", "middle", "upper", "top"];

		App.UI.DOM.appendNewElement("h2", div, "Sexual Service Policies");
		App.UI.DOM.appendNewElement("div", div, "If so desired, your assistant can help you manipulate the business environment within your arcology.");
		App.UI.DOM.appendNewElement("div", div, "Breakdown of sexual services supplied by outside parties per societal class.");

		for (const s of societyClasses) {
			const classType = s === "top" ? `millionaires` : `${s} class`;
			App.UI.DOM.appendNewElement("div", div, `${capFirstChar(classType)}: ${V.NPCMarketShare[s + "Class"]/10}%`);
		}
		App.UI.DOM.appendNewElement("div", div);

		for (const s of societyClasses) {
			App.UI.DOM.appendNewElement("div", div, societalView(s, "policies"));
		}

		div.append(rent());

		return div;

		function rent() {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

			const asPercentage = (v) => Math.trunc((v / (V.ACitizens + V.ASlaves)) * 1000) / 10;

			App.UI.DOM.appendNewElement("h2", div, "Population and Rent");
			App.UI.DOM.appendNewElement("div", div, `${arcologyName} is home to the following:`);

			for (const s of societyClasses) {
				App.UI.DOM.appendNewElement("div", div, societalView(s, "rent"));
			}

			App.UI.DOM.appendNewElement("div", div, `Slaves | ${num(V.ASlaves)} | ${asPercentage(V.ASlaves)}%`);

			return div;
		}

		function societalView(s, type) {
			const frag = new DocumentFragment();

			const classType = s === "top" ? "Millionaires" : `${capFirstChar(s)} Class`;
			const calRent = (v) => Math.trunc(V.rent[v] * (1 + (5 - V.baseDifficulty) / 20) / 0.25) / 100;
			const classStr = s + "Class";
			function link(text, type, value, value2 = 0, value3 = 0) {
				return App.UI.DOM.link(`${text}`, () => {
					if (type !== "rent") {
						V[type][classStr] = value;
						if (type === "sexSupplyBarriers") {
							repX(-1000, "subsidiesAndBarriers");
						}
					} else {
						V.rent[classStr] = V.rentDefaults[classStr] * value;
						if (s === "lower") {
							V.rentEffectL = value2;
						} else if (s === "middle") {
							V.rentEffectM = value2;
						} else if (s === "upper") {
							V.rentEffectU = value2;
						} else if (s === "top") {
							V.rentEffectT = value2;
						}
						V.whoreBudget[classStr] *= value3;
					}

					App.UI.reload();
				});
			}

			let choices = [];

			if (type === "policies") {
				if (V.sexSubsidies[classStr] === 0) {
					frag.append(`You can provide a minor subsidy for those selling sexual services to the ${classType}. `);
					choices.push(link(`Minor Subsidy`, "sexSubsidies", 1));
				} else if (V.sexSubsidies[classStr] === 1) {
					frag.append(`You are providing a minor subsidy for those selling sexual services to the ${classType}. `);
					choices.push(link(`Cancel Subsidy`, "sexSubsidies", 0));
					choices.push(link(`Moderate Subsidy`, "sexSubsidies", 2));
				} else if (V.sexSubsidies[classStr] === 2) {
					frag.append(`You are providing a moderate subsidy for those selling sexual services to the ${classType}. `);
					choices.push(link(`Minor Subsidy`, "sexSubsidies", 1));
					choices.push(link(`Substantial Subsidy`, "sexSubsidies", 3));
				} else if (V.sexSubsidies[classStr] === 3) {
					frag.append(`You are providing a substantial subsidy for those selling sexual services to the ${classType}. `);
					choices.push(link(`Moderate Subsidy`, "sexSubsidies", 2));
					choices.push(link(`Gratuitous Subsidy`, "sexSubsidies", 4));
				} else {
					frag.append(`You are providing a gratuitous subsidy for those selling sexual services to the ${classType}. `);
					choices.push(link(`Substantial Subsidy`, "sexSubsidies", 3));
				}

				App.UI.DOM.appendNewElement("span", frag, "Upkeep is relative to the amount provided by other parties. ", ['note']);
				App.UI.DOM.appendNewElement("span", frag, App.UI.DOM.generateLinksStrip(choices));
				App.UI.DOM.appendNewElement("div", frag);

				choices = [];
				if (V.sexSupplyBarriers[classStr] === 0) {
					frag.append(
						`Alternatively administrative "accidents" can happen if you are willing to spend ${num(1000)} reputation and pay a flat upkeep of`,	// TODO: the actual effects of this aren't clear to the player
						App.UI.DOM.makeElement("span", ` ${cashFormat(1000)}. `, ['cash'])
					);
					choices.push(link(`Create Bureaucracy`, "sexSupplyBarriers", 1));
				} else if (V.sexSupplyBarriers[classStr] === 1) {
					frag.append(
						`You have forced some unneeded bureaucracy, making things a little more difficult.
						If you are willing to spend ${num(1000)} reputation you can change this policy.
						Increasing the bureaucracy further will cost a flat upkeep of`,
						App.UI.DOM.makeElement("span", ` ${cashFormat(5000)}. `, ['cash'])
					);
					choices.push(link(`Abolish Bureaucracy`, "sexSupplyBarriers", 0));
					choices.push(link(`Increase Bureaucracy`, "sexSupplyBarriers", 2));
				} else if (V.sexSupplyBarriers[classStr] === 2) {
					frag.append(
						`You have forced considerable bureaucracy, making things a little more difficult.
						If you are willing to spend ${num(1000)} reputation you can change this policy.
						Increasing the bureaucracy further will cost a flat upkeep of`,
						App.UI.DOM.makeElement("span", ` ${cashFormat(20000)}. `, ['cash'])
					);
					choices.push(link(`Reduce Bureaucracy`, "sexSupplyBarriers", 1));
					choices.push(link(`Increase Bureaucracy`, "sexSupplyBarriers", 3));
				} else if (V.sexSupplyBarriers[classStr] === 3) {
					frag.append(
						`You have forced stifling bureaucracy, making things a little more difficult.
						If you are willing to spend ${num(1000)} reputation you can change this policy.
						Increasing the bureaucracy further will cost a flat upkeep of`,
						App.UI.DOM.makeElement("span", ` ${cashFormat(60000)}. `, ['cash'])
					);
					choices.push(link(`Reduce Bureaucracy`, "sexSupplyBarriers", 2));
					choices.push(link(`Increase Bureaucracy`, "sexSupplyBarriers", 4));
				} else {
					frag.append(
						`You have forced suffocating bureaucracy, making things a little more difficult.
						If you are willing to spend ${num(1000)} reputation you can change this policy.`
					);
					choices.push(link(`Reduce Bureaucracy`, "sexSupplyBarriers", 3));
				}
			} else if (type === "rent") {
				const asPercentage = (v) => Math.trunc((v / (V.ACitizens + V.ASlaves)) * 1000) / 10;

				frag.append(
					`${classType} | ${num(V[classStr])} | ${asPercentage(V[classStr])}% | Rent: `,
					App.UI.DOM.makeElement("span", `${cashFormat(calRent(classStr))} `, ['cash'])
				);

				if (V.rent[classStr] > V.rentDefaults[classStr] * 1.5) {
					frag.append(`Very High. `);
					choices.push(link(`Decrease`, "rent", 1.5, 0.94, 9 / 8));
				} else if (V.rent[classStr] > V.rentDefaults[classStr]) {
					frag.append(`High. `);
					choices.push(link(`Increase`, "rent", 2, 0.85, 8 / 9));
					choices.push(link(`Decrease`, "rent", 1, 1, 10 / 9));
				} else if (V.rent[classStr] > V.rentDefaults[classStr] * 0.5) {
					frag.append(`Average. `);
					choices.push(link(`Increase`, "rent", 1.5, 0.94, 9 / 10));
					choices.push(link(`Decrease`, "rent", 0.5, 1.04, 11 / 10));
				} else if (V.rent[classStr] > 0) {
					frag.append(`Low. `);
					choices.push(link(`Increase`, "rent", 1, 1, 10 / 11));
					choices.push(link(`Free Rent`, "rent", 0, 1.1, 12 / 11));
				} else {
					frag.append(`Free. `);
					choices.push(link(`Increase`, "rent", 0.5, 1.04, 11 / 12));
				}
			}

			if (type === "policies" && V.rep > 1000 || type === "rent") {
				App.UI.DOM.appendNewElement("span", frag, App.UI.DOM.generateLinksStrip(choices));
			} else {
				App.UI.DOM.appendNewElement("div", frag, `You are not reputable enough.`);
			}

			return frag;
		}
	}

	function language() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		App.UI.DOM.appendNewElement("h2", div, "Language");
		div.append(
			`The lingua franca of the arcology is `,
			App.UI.DOM.makeElement("span", `${V.language}.`, ["strong"]),
			App.UI.DOM.makeElement("div", App.UI.DOM.link(`Language options`, () => {
				V.seed = V.language;
			}, [], "Change Language"), ['indent']),
		);

		return div;
	}

	function upgrades() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		App.UI.DOM.appendNewElement("h2", div, "Special Arcology Upgrades");

		if (V.personalArms === 0 && V.mercenaries === 0 && V.assistant.personality <= 0) {
			div.append(`${arcologyName} has no special upgrades.`);
		} else {
			if (V.personalArms > 0) {
				const text = [];

				text.push(`You own a prototype powered exoskeleton that mounts armor and a smart mortar system, and has rifles mounted into its forearms.`);
				if (V.personalArms > 1) {
					text.push(`Furthermore, your security drones can rearm with small-caliber guns if necessary.`);
				}

				App.UI.DOM.appendNewElement("div", div, text.join(' '));
			}

			if (V.mercenaries > 0) {
				const text = [];

				if (V.mercenaries.isBetween(1, 5)) {
					text.push(`A ${V.mercenaries === 1 ? `squad` : `full platoon`} of mercenaries is permanently quartered in ${arcologyName}.`);
				} else if (V.mercenaries >= 5) {
					text.push(`You have permanently settled a full company of mercenaries in ${arcologyName} as your ${V.mercenariesTitle}.`);
				}

				text.push(`They are grim men and women${V.mercenaries < 5 ? `, heavily armed and armored` : ` who appreciate their luxurious life here and train hard to keep their skills with their prototype armor sharp`}.`);

				App.UI.DOM.appendNewElement("div", div, text.join(' '));
			}
		}

		if (V.assistant.personality > 0) {
			const text = [];

			const {hisA, heA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

			text.push(`${capFirstChar(V.assistant.name)} is using an alternative personality setting, speaking in a sultry, sexual voice, and talking as though the penthouse's sex toys are ${hisA} body.`);

			if (V.assistant.personality > 1) {
				text.push(`${heA} also has charge of all smart piercings in the arcology, and is using ${hisA} adaptations to sexual duties to improve their effectiveness.`);
			}

			App.UI.DOM.appendNewElement("div", div, text.join(' '));
		}

		return div;
	}

	function records() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		App.UI.DOM.appendNewElement("h2", div, "Records");

		const total = V.oralTotal + V.vaginalTotal + V.analTotal;
		const text = [];

		if (total > 0) {
			text.push(`Your slaves have participated in approximately ${num(total)} sexual encounters: ${num(V.oralTotal)} primarily oral, ${num(V.vaginalTotal)} vanilla, ${num(V.mammaryTotal)} mammary, ${num(V.analTotal)} anal, and ${num(V.penetrativeTotal)} with the slave penetrating another.`);
		} else {
			text.push(`Your slaves haven't had any sexual encounters yet.`);
		}

		if (V.milkTotal > 0 || V.birthsTotal > 0 || (V.cumTotal > 0 && V.seeDicks !== 0)) {
			text.push(`They have produced about ${num(V.milkTotal)} liters of marketable milk, ${V.seeDicks !== 0 ? `about ${num(V.cumTotal)} deciliters of marketable cum,` : ``} and have given birth ${num(V.birthsTotal)} times.`);
		}

		if (V.abortionsTotal > 0 && V.miscarriagesTotal > 0) {
			text.push(`They have had a total of ${num(V.abortionsTotal)} abortions and ${num(V.miscarriagesTotal)} miscarriages.`);
		} else if (V.abortionsTotal > 0) {
			text.push(`They have had a total of ${num(V.abortionsTotal)} abortions.`);
		} else if (V.miscarriagesTotal > 0) {
			text.push(`They have had a total of ${num(V.miscarriagesTotal)} miscarriages.`);
		}
		if (V.fuckdollsSold > 0) { // FIXME: This never increases
			text.push(`${V.fuckdollsSold} mindbroken arcade slaves have been converted into Fuckdolls and sold.`);
		}

		App.UI.DOM.appendNewElement("div", div, text.join(' '));

		if (V.pitFightsTotal > 0 && V.pitKillsTotal > 0) {
			App.UI.DOM.appendNewElement("div", div, `${arcologyName} has hosted ${numberWithPluralOne(V.pitFightsTotal, "pit fight")}, and ${numberWithPluralOne(V.pitKillsTotal, "slave")} slaves ${V.pitKillsTotal === 1 ? `has` : `have`} died in your pit.`);
		} else if (V.pitFightsTotal > 0) {
			App.UI.DOM.appendNewElement("div", div, `${arcologyName} has hosted ${numberWithPluralOne(V.pitFightsTotal, "pit fight")}.`);
		}

		return div;
	}

	function foodMarket() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		if (V.mods.food.enabled && V.mods.food.market) {
			App.UI.DOM.appendNewElement("h2", div, "Food Management");
			div.append(App.UI.foodMarket());
		} else if (V.eventResults.foodCrisis && !V.mods.food.rations) {
			const price = V.PC.skill.trading >= 50 && ["capitalist", "entrepreneur", "business kid"].includes(V.PC.career) || V.PC.skill.trading >= 100 ? 112_500 : 150_000;

			div.append(
				`You can set up the food market for your citizens again, if you'd like.`,
				makePurchase(`Set it up`, price, "capEx", {
					handler: () => {
						V.mods.food.market = true;
						repX(6500, "food");
						App.UI.reload();
					}
				}),
			);
		}

		return div;
	}

	function security() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		App.UI.DOM.appendNewElement("h2", div, "Security");

		const cost = 5000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier;

		if (V.SecExp.buildings.propHub) {
			const innerDiv = document.createElement("div");

			innerDiv.append(`The `, App.UI.DOM.passageLink(`Propaganda Hub`, "propagandaHub"), ` is ready to manipulate reality on your command.`);

			div.append(innerDiv);
		} else {
			App.UI.DOM.appendNewElement("div", div, `Building specialized in the management of authority.`, ["detail"]);
			div.append(makePurchase(`Set up the propaganda hub`, cost, "capEx", {
				notes: [`increases upkeep`],
				handler: App.Mods.SecExp.propHub.init,
			}));
		}

		if (V.SecExp.buildings.secHub) {
			const innerDiv = document.createElement("div");

			innerDiv.append(`The `, App.UI.DOM.passageLink(`security HQ`, "securityHQ"), ` is constantly working to protect your arcology.`);

			div.append(innerDiv);
		} else {
			App.UI.DOM.appendNewElement("div", div, `Building specialized in the management of security and crime.`, ["detail"]);
			div.append(makePurchase(`Set up the security headquarters`, cost, "capEx", {
				notes: [`increases upkeep`],
				handler: App.Mods.SecExp.secHub.init,
			}));
		}

		if (V.SecExp.buildings.barracks) {
			const innerDiv = document.createElement("div");

			innerDiv.append(`The `, App.UI.DOM.passageLink(`barracks`, "secBarracks"), ` patiently await your orders.`);

			div.append(innerDiv);
		} else {
			App.UI.DOM.appendNewElement("div", div, `Building specialized in the management of armed forces.`, ["detail"]);
			div.append(makePurchase(`Set up the barracks`, cost, "capEx", {
				notes: [`increases upkeep`],
				handler: App.Mods.SecExp.barracks.init,
			}));
		}

		if (V.SecExp.buildings.riotCenter && V.SecExp.settings.rebellion.enabled === 1) {
			const innerDiv = document.createElement("div");

			innerDiv.append(`The `, App.UI.DOM.passageLink(`Riot Control Center`, "riotControlCenter"), ` stands ready for action.`);

			div.append(innerDiv);
		} else if (V.SecExp.settings.rebellion.enabled === 1) {
			App.UI.DOM.appendNewElement("div", div, `Building specialized in the management and suppression of rebellions.`, ["detail"]);
			div.append(makePurchase(`Set up the control center`, cost, "capEx", {
				notes: [`increases upkeep`],
				handler: App.Mods.SecExp.riotCenter.init,
			}));
		}

		return div;
	}

	function military() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		const victories = (x) => V.SecExp[x].victories;
		const losses = (x) => V.SecExp[x].losses;
		const count = (x) => victories(x) + losses(x);
		const SF = V.SF.Toggle && V.SF.Active >= 1 ? V.SF.ArmySize : 0;
		const unitsLost = Array.from(App.Mods.SecExp.unit.list().keys()).slice(1).reduce((acc, cur) => acc + V.SecExp.units[cur].dead, 0);

		App.UI.DOM.appendNewElement("h2", div, "Military");

		const text = [];

		text.push(`Your army counts ${num(App.Mods.SecExp.unit.squads("human").reduce((acc, s) => acc + s.troops, 0) + SF)} total soldiers${(V.SF.Toggle && V.SF.Active >= 1) ? `, of which ${num(V.SF.ArmySize)} are under the Special Force chain of command and the rest under your direct control` : ``}.`);

		if (V.SecExp.settings.battle.enabled === 1 && count('battles') > 0) {
			text.push(`Your troops were involved in ${num(count('battles'))} battles, of which ${num(V.SecExp.battles.major)} were major engagements. You won`);

			if (count('battles') === victories('battles')) {
				text.push(`all of them.`);
			} else if (count('battles') === losses('battles')) {
				text.push(`none of them.`);
			} else {
				text.push(`${num(victories('battles'))} of them, while the enemy managed to gain the upper hand in the other ${num(losses('battles'))}.`);
			}

			text.push(`You lost a total of ${num(unitsLost)} men, while scoring a total of ${num(V.SecExp.core.totalKills)} kills.`);
		}

		if (V.SecExp.settings.rebellion.enabled === 1 && count('rebellions') > 0) {
			text.push(`Your arcology was involved in ${numberWithPluralOne(count('rebellions'), "rebellion")}${count('rebellions') > 1
				? `. You won ${num(victories('rebellions'))} of them, while the rebels defeated your forces in ${num(losses('rebellions'))}`
				: `, which you ${victories('rebellions') === 1 ? `won` : `lost`}`
			}.`);
		}

		App.UI.DOM.appendNewElement("div", div, text.join(' '));

		return div;
	}

	function events() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.passageLink(`Host Dinner Party`, "Dinner Party Preparations"), ['indent']);

		return div;
	}
};
