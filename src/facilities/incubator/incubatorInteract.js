App.UI.incubator = function() {
	V.nextButton = "Back to Main";
	V.nextLink = "Main";
	V.returnTo = "Incubator";
	App.UI.StoryCaption.encyclopedia = "The Incubation Facility";
	V.readySlave = 0;
	const tankMultiplier = [1, 5, 10, 20, 100, 500];

	const el = new DocumentFragment();
	let childrenReserved;
	const incubatorNameCaps = capFirstChar(V.incubator.name);

	const introDiv = App.UI.DOM.appendNewElement("div", el, intro());

	const showPC = (V.PC.pregKnown === 1 &&
		(!FutureSocieties.isActive('FSRestart') ||
			V.eugenicsFullControl === 1 ||
			(V.PC.pregSource !== -1 && V.PC.pregSource !== -6)
		));
	const mothersContent = App.UI.DOM.makeElement('span', mothers());
	const pcContent = App.UI.DOM.makeElement('span', PC());
	const tanksContent = App.UI.DOM.makeElement('span', tankBabies());
	const settingsContent = App.UI.DOM.makeElement('span', tankSettings());

	const tabBar = new App.UI.Tabs.TabBar("Incubator");
	tabBar.addTab("Mothers", "mothers", mothersContent);
	if (showPC) {
		tabBar.addTab("You", "pc", pcContent);
	}
	tabBar.addTab("Tanks", "tanks", tanksContent);
	tabBar.addTab("Default Settings", "settings", settingsContent);
	el.append(tabBar.render());

	introDiv.after(release()); // run me late.

	return el;

	/**
	 * @returns {DocumentFragment}
	 */
	function intro() {
		const el = new DocumentFragment();
		let r = [];
		let tankBulkOptions = [];
		let price;
		const incubatorSlaves = V.incubator.tanks.length;
		const freeTanks = V.incubator.capacity - incubatorSlaves;
		const reservedChildren = FetusGlobalReserveCount("incubator");
		el.append(App.UI.DOM.makeElement("h1", incubatorNameCaps));

		r.push(`${incubatorNameCaps} is a clean, cold hall designed to be lined with tanks and their connected monitoring systems.`);

		if (incubatorSlaves > 2) {
			r.push(`It's well used. The hum of active tanks fills the air.`);
		} else if (incubatorSlaves > 0) {
			r.push(`It's barely used; most of the tanks lie dormant.`);
		} else {
			r.push(`It's empty and quiet.`);
			r.push(
				choice(
					"Decommission the incubator",
					() => {
						App.Facilities.Incubator.init('base');
					},
					"Main"
				)
			);
		}
		App.Events.addNode(el, r, "div", ["scene-intro"]);

		const tankP = document.createElement("p");
		r = [];
		r.push(`It can support ${num(V.incubator.capacity)} child${(V.incubator.capacity > 1) ? "ren" : ""} as they age.`);
		if (incubatorSlaves === 1) {
			r.push(`There is currently 1 tank`);
		} else {
			r.push(`There are currently ${num(incubatorSlaves)} tanks`);
		}
		r.push(`in use in ${V.incubator.name}.`);
		App.Events.addNode(tankP, r, "div");

		for (const multiplier of tankMultiplier) {
			const price = Math.trunc((60000 * multiplier) * V.upgradeMultiplierArcology);
			tankBulkOptions.push(
				App.UI.DOM.link(
					`x${multiplier}`,
					() => {
						cashX(-price, "capEx");
						V.incubator.capacity += multiplier;
					},
					[], passage()
				)
			);
		}
		price = Math.trunc(60000 * V.upgradeMultiplierArcology);
		App.UI.DOM.appendNewElement("div", tankP, `Adding a tank costs ${cashFormat(price)} and will increase upkeep. `).append(App.UI.DOM.generateLinksStrip(tankBulkOptions));

		const empty = freeTanks - reservedChildren;
		if (empty > 0) {
			tankBulkOptions = [];
			for (const multiplier of tankMultiplier) {
				const price = Math.trunc((10000 * multiplier) * V.upgradeMultiplierArcology);
				if (empty >= multiplier && V.incubator.capacity - multiplier > 0) {
					tankBulkOptions.push(
						App.UI.DOM.link(
							`x${multiplier}`,
							() => {
								cashX(-price, "capEx");
								V.incubator.capacity -= multiplier;
							},
							[], passage()
						)
					);
				}
			}
			price = Math.trunc(10000 * V.upgradeMultiplierArcology);
			App.UI.DOM.appendNewElement("div", tankP, `Currently ${empty} tanks are empty.${(V.incubator.capacity !== 1) ? ` Removing a tank costs ${cashFormat(price)} and will reduce upkeep.` : ``} `).append(App.UI.DOM.generateLinksStrip(tankBulkOptions));
		}

		if (freeTanks === 0) {
			tankP.append(`All of the tanks are currently occupied by growing children.`);
		}

		el.append(tankP);

		/* Bulk or individual release */
		let section = document.createElement("p");
		if (V.incubator.bulkRelease === 1) {
			section.append(`Released children will be handled in bulk and not receive personal attention. `);
			section.append(
				App.UI.DOM.link(
					`Individual release`,
					() => {
						V.incubator.bulkRelease = 0;
						refresh();
					}
				)
			);
		} else {
			section.append(`Released children will be seen to personally. `);
			section.append(
				App.UI.DOM.link(
					`Bulk release`,
					() => {
						V.incubator.bulkRelease = 1;
						refresh();
					}
				)
			);
		}
		el.append(section);

		return el;

		function refresh() {
			jQuery(introDiv).empty().append(intro());
		}
	}

	function mothers() {
		const el = new DocumentFragment();
		let r = [];
		let eligibility = 0;
		let linkArray;
		const reservedChildren = FetusGlobalReserveCount("incubator");
		const incubatorSlaves = V.incubator.tanks.length;
		const freeTanks = V.incubator.capacity - incubatorSlaves;
		r.push(`Reserve an eligible mother-to-be's child to be placed in a tank upon birth. Of ${num(V.incubator.capacity)} tanks, ${num(freeTanks)}`);
		if (freeTanks === 1) {
			r.push(`is`);
		} else {
			r.push(`are`);
		}
		r.push(`unoccupied. Of those, ${num(reservedChildren)}`);
		if (reservedChildren === 1) {
			r.push(`tank is`);
		} else {
			r.push(`tanks are`);
		}
		r.push(`reserved.`);
		App.Events.addNode(el, r, "div");

		const sortingOptions = new Map([
			["Name", "data-name"],
			["Reserved Incubator Spots", "data-reserved-spots"],
			["Pregnancy Week", "data-preg-week"],
			["Number of Children", "data-preg-count"],
		]);

		if (V.slaves.length > 0) {
			/**
			 * @param {Map<string, string>} sortingOptions
			 */
			const sortingBarFunc = function(sortingOptions) {
				const el = new DocumentFragment();
				App.UI.DOM.appendNewElement("span", el, "Sorting: ", ["note"]);
				const linkArray = [];
				for (const [title, attr] of sortingOptions) {
					if (V.sortIncubatorList === title) {
						linkArray.push(App.UI.DOM.makeElement("span", title, ["bold"]));
					} else {
						linkArray.push(
							App.UI.DOM.link(
								title,
								() => {
									V.sortIncubatorList = title;
									sortBy(attr);
									jQuery(sortingBar).empty().append(sortingBarFunc(sortingOptions));
								}
							)
						);
					}
				}
				el.append(App.UI.DOM.generateLinksStrip(linkArray));
				return el;
			};

			const sortingBar = document.createElement("div");
			sortingBar.classList.add("border-bottom");

			V.sortIncubatorList = V.sortIncubatorList || 'Unsorted';
			sortingBar.append(sortingBarFunc(sortingOptions));
			el.append(sortingBar);
		}

		const qlIncubator = document.createElement("div");
		for (const slave of V.slaves) {
			if (slave.preg > 0 && slave.pregKnown === 1 && slave.eggType === "human") {
				const r = [];
				const reserveDisallowed = (slave.assignment === Job.DAIRY && V.dairyPregSetting > 0) || slave.assignment === Job.AGENT || slave.assignment === Job.AGENTPARTNER;
				if (!reserveDisallowed) {
					const {
						His, his
					} = getPronouns(slave);
					const freeTanks = V.incubator.capacity - incubatorSlaves;
					const WL = slave.womb.length;
					const reservedIncubator = WombReserveCount(slave, "incubator");
					const reservedNursery = WombReserveCount(slave, "nursery");
					const momEl = document.createElement("p");
					momEl.id = "slave-" + slave.ID;
					momEl.classList.add("possible");

					momEl.setAttribute("data-preg-count", slave.womb.length.toString());
					momEl.setAttribute("data-reserved-spots", reservedIncubator.toString());
					momEl.setAttribute("data-preg-week", slave.pregWeek.toString());
					momEl.setAttribute("data-name", SlaveFullName(slave));

					linkArray = [];
					const choices = document.createElement("div");
					choices.classList.add("choices");
					r.push(App.UI.DOM.slaveDescriptionDialog(slave));
					r.push(`is ${slave.pregWeek} ${(slave.pregWeek === 1) ? `week` : `weeks`} pregnant with`);
					if (slave.pregSource === 0 || slave.preg <= 5) {
						r.push(`someone's${(slave.preg <= 5) ? `, though it is too early to tell whose,` : ``}`);
					} else if (slave.pregSource === -1) {
						r.push(`your`);
					} else if (slave.pregSource === -2) {
						r.push(`a citizen's`);
					} else if (slave.pregSource === -3) {
						r.push(`your Master's`);
					} else if (slave.pregSource === -4) {
						r.push(`another arcology owner's`);
					} else if (slave.pregSource === -5) {
						r.push(`your client's`);
					} else if (slave.pregSource === -6) {
						r.push(`the Societal Elite's`);
					} else if (slave.pregSource === -7) {
						r.push(`the lab's`);
					} else if (slave.pregSource === -9) {
						r.push(`the Futanari Sisters'`);
					} else {
						const father = getSlave(slave.pregSource);
						if (father) {
							r.push(`${father.slaveName}'s`);
						} else if (WL === 1) {
							r.push("a");
						}
					}
					if (WL > 1) {
						r.push(`${WL} babies.`);
					} else {
						r.push(`baby.`);
					}

					if (reservedIncubator > 0) {
						childrenReserved = 1;
						if (WL === 1) {
							r.push(`${His} child`);
						} else if (reservedIncubator < WL) {
							r.push(`${reservedIncubator} of ${his} children`);
						} else if (WL === 2) {
							r.push(`Both of ${his} children`);
						} else {
							r.push(`All ${reservedIncubator} of ${his} children`);
						}
						r.push(`will be placed in ${V.incubator.name}.`);
						if ((reservedIncubator + reservedNursery < WL) && (reservedChildren < freeTanks)) {
							if (V.pregnancyMonitoringUpgrade === 1) {
								linkArray.push(
									App.UI.DOM.link(
										`Inspect pregnancy`,
										() => {
											V.AS = slave.ID;
										},
										[],
										`Analyze Pregnancy`
									)
								);
							}
							linkArray.push(
								App.UI.DOM.link(
									`Keep another child`,
									() => {
										WombAddToGenericReserve(slave, 'incubator', 1);
										refresh();
									}
								)
							);
							if (reservedIncubator > 0) {
								linkArray.push(
									App.UI.DOM.link(
										`Keep one less child`,
										() => {
											WombCleanGenericReserve(slave, 'incubator', 1);
											refresh();
										}
									)
								);
							}
							if (reservedIncubator > 1) {
								linkArray.push(
									App.UI.DOM.link(
										`Keep none of ${his} children`,
										() => {
											WombCleanGenericReserve(slave, 'incubator', 9999);
											refresh();
										}
									)
								);
							}
							if ((reservedChildren + WL - reservedIncubator) <= freeTanks) {
								linkArray.push(
									App.UI.DOM.link(
										`Keep the rest of ${his} children`,
										() => {
											WombAddToGenericReserve(slave, 'incubator', 9999);
											refresh();
										}
									)
								);
							}
						} else if ((reservedIncubator === WL) || (reservedChildren === freeTanks) || (reservedIncubator + reservedNursery === WL)) {
							if (V.pregnancyMonitoringUpgrade === 1) {
								linkArray.push(
									App.UI.DOM.link(
										`Inspect pregnancy`,
										() => {
											V.AS = slave.ID;
										},
										[],
										`Analyze Pregnancy`
									)
								);
							}
							linkArray.push(
								App.UI.DOM.link(
									`Keep one less child`,
									() => {
										WombCleanGenericReserve(slave, 'incubator', 1);
										refresh();
									}
								)
							);
							if (reservedIncubator > 1) {
								linkArray.push(
									App.UI.DOM.link(
										`Keep none of ${his} children`,
										() => {
											WombCleanGenericReserve(slave, 'incubator', 9999);
											refresh();
										}
									)
								);
							}
						}
					} else if (reservedChildren < freeTanks) {
						if (WL - reservedNursery === 0) {
							r.push(App.UI.DOM.makeElement("span", `${His} children are already reserved for ${V.nurseryName}`, "note"));
							if (V.pregnancyMonitoringUpgrade === 1) {
								linkArray.push(
									App.UI.DOM.link(
										`Inspect pregnancy`,
										() => {
											V.AS = slave.ID;
										},
										[],
										`Analyze Pregnancy`
									)
								);
							}
							linkArray.push(
								App.UI.DOM.link(
									`Keep ${his} ${((WL > 1) ? "children" : "child")} here instead`,
									() => {
										WombChangeReserveType(slave, 'nursery', 'incubator');
										refresh();
									}
								)
							);
						} else {
							r.push(`You have`);
							if (freeTanks === 1) {
								r.push(`an <span class="lime"> available aging tank.</span>`);
							} else {
								r.push(`<span class="lime"> available aging tanks.</span>`);
							}
							if (V.pregnancyMonitoringUpgrade === 1) {
								if (V.pregnancyMonitoringUpgrade === 1) {
									linkArray.push(
										App.UI.DOM.link(
											`Inspect pregnancy`,
											() => {
												V.AS = slave.ID;
											},
											[],
											`Analyze Pregnancy`
										)
									);
								}
							}
							linkArray.push(
								App.UI.DOM.link(
									`Keep ${(WL > 1) ? "a" : "the"} child`,
									() => {
										WombAddToGenericReserve(slave, 'incubator', 1);
										refresh();
									}
								)
							);
							if ((WL > 1) && (reservedChildren + WL - reservedIncubator) <= freeTanks) {
								linkArray.push(
									App.UI.DOM.link(
										`Keep all of ${his} children`,
										() => {
											WombAddToGenericReserve(slave, 'incubator', 9999);
											refresh();
										}
									)
								);
							}
						}
					} else if (reservedChildren === freeTanks) {
						if (V.pregnancyMonitoringUpgrade === 1) {
							linkArray.push(
								App.UI.DOM.link(
									`Inspect pregnancy`,
									() => {
										V.AS = slave.ID;
									},
									[],
									`Analyze Pregnancy`
								)
							);
						}
						const noRoom = new DocumentFragment();
						noRoom.append(`You have `);
						App.UI.DOM.appendNewElement("span", noRoom, `no room for ${his} offspring.`, ["red"]);
						linkArray.push(noRoom);
					}
					eligibility = 1;

					App.Events.addNode(momEl, r, "div");
					choices.append(App.UI.DOM.generateLinksStrip(linkArray));
					momEl.append(choices);
					qlIncubator.append(momEl);
				}
			}
		}
		sortByPreviousSort();
		el.append(qlIncubator);
		if (eligibility === 0) {
			App.UI.DOM.appendNewElement("div", el, `You have no pregnant slaves bearing eligible children.`, ["note"]);
		}

		if (reservedChildren !== 0 || childrenReserved === 1) { // the oops I made it go negative somehow button
			App.UI.DOM.appendNewElement(
				"div",
				el,
				App.UI.DOM.link(
					"Clear all reserved children",
					() => {
						for (const slave of V.slaves) {
							if (WombReserveCount(slave, "incubator") !== 0) {
								WombCleanGenericReserve(slave, 'incubator', 9999);
							}
						}
						WombCleanGenericReserve(V.PC, 'incubator', 9999);
						refresh();
					}
				)
			);
		}
		return el;

		function refresh() {
			jQuery(mothersContent).empty().append(mothers());
			jQuery(introDiv).empty().append(intro());
			jQuery(tanksContent).empty().append(tankBabies());
		}

		function sortBy(attrName) {
			let sortedIncubatorPossibles = $(qlIncubator).children('p.possible').detach();
			sortedIncubatorPossibles = sortDomObjects(sortedIncubatorPossibles, attrName);
			$(sortedIncubatorPossibles).appendTo(qlIncubator);
		}

		function sortByPreviousSort() {
			const sortAttr = sortingOptions.get(V.sortIncubatorList);
			if (sortAttr) {
				sortBy(sortAttr);
			}
		}
	}

	function PC() {
		const el = new DocumentFragment();
		if (!showPC) {
			return el;
		}

		let r = [];
		let linkArray = [];
		const reservedChildren = FetusGlobalReserveCount("incubator");
		const incubatorSlaves = V.incubator.tanks.length;
		const freeTanks = V.incubator.capacity - incubatorSlaves;
		const WL = V.PC.womb.length;
		const reservedIncubator = WombReserveCount(V.PC, "incubator");
		const reservedNursery = WombReserveCount(V.PC, "nursery");
		r.push(App.UI.DOM.makeElement("span", `You're ${V.PC.pregWeek} ${(V.PC.pregWeek === 1) ? `week` : `weeks`} pregnant`, ["pink", "bold"]));
		if (WL === 1) {
			r.push(`with a baby.`);
		} else {
			r.push(`with ${pregNumberName(WL, 2)}.`);
		}

		if (reservedChildren < freeTanks) {
			if (freeTanks === 1) {
				r.push(`and have an <span class="lime">available aging tank.</span>`);
			} else {
				r.push(`and have <span class="lime">${freeTanks - reservedChildren} available aging tanks.</span>`);
			}
		} else if (reservedChildren >= freeTanks) {
			r.push(`and <span class='red'>ran out of room for your offspring.</span>`);
		}

		if (V.pregnancyMonitoringUpgrade === 1) {
			r.push(
				App.UI.DOM.link(
					`Inspect pregnancy`,
					() => { },
					[],
					`Analyze PC Pregnancy`
				)
			);
		}

		App.Events.addNode(el, r, "div");
		r = [];

		let choices = document.createElement("div");
		choices.classList.add("choices");
		if (reservedIncubator > 0) {
			childrenReserved = 1;
			if (WL === 1) {
				r.push(`Your child `);
			} else if (reservedIncubator < WL) {
				r.push(`${reservedIncubator} of your children `);
			} else if (WL === 2) {
				r.push(`Both of your children `);
			} else {
				r.push(`All ${reservedIncubator} of your children `);
			}
		}
		App.Events.addNode(el, r, "div");
		r = [];

		if (reservedChildren < freeTanks) {
			if (WL - reservedNursery === 0) {
				r.push(
					App.UI.DOM.makeElement(
						"span",
						`Your ${(WL === 1) ? `child is` : `children are`} already reserved for ${V.nurseryName}`,
						["note"]
					)
				);
				linkArray.push(
					App.UI.DOM.link(
						`Keep your ${(WL === 1) ? `child` : `children`} here instead`,
						() => {
							WombChangeReserveType(V.PC, 'nursery', 'incubator');
							refresh();
						}
					)
				);
			} else {
				linkArray.push(
					App.UI.DOM.link(
						`Keep ${(WL > 1) ? `a` : `your`} child`,
						() => {
							WombAddToGenericReserve(V.PC, 'incubator', 1);
							refresh();
						}
					)
				);

				const availableChildren = reservedChildren + WL - reservedIncubator;
				if (WL > 1 && (availableChildren <= freeTanks)) {
					linkArray.push(
						App.UI.DOM.link(
							`Keep the rest of your children`,
							() => {
								WombAddToGenericReserve(V.PC, 'incubator', 9999);
								refresh();
							}
						)
					);
				}
			}
			choices.append(App.UI.DOM.generateLinksStrip(linkArray));
			el.append(choices);
		}

		App.Events.addNode(el, r, "div");

		choices = document.createElement("div");
		choices.classList.add("choices");
		linkArray = [];
		if (reservedIncubator > 0) {
			linkArray.push(
				App.UI.DOM.link(
					`Keep one less child`,
					() => {
						WombCleanGenericReserve(V.PC, 'incubator', 1);
						refresh();
					}
				)
			);
		}
		if (reservedIncubator > 1) {
			linkArray.push(
				App.UI.DOM.link(
					`Keep none of your children`,
					() => {
						WombCleanGenericReserve(V.PC, 'incubator', 9999);
						refresh();
					}
				)
			);
		}

		choices.append(App.UI.DOM.generateLinksStrip(linkArray));
		el.append(choices);

		return el;

		function refresh() {
			jQuery(pcContent).empty().append(PC());
			jQuery(introDiv).empty().append(intro());
			jQuery(tanksContent).empty().append(tankBabies());
		}
	}

	function tankBabies() {
		const el = new DocumentFragment();
		let row;
		let linkArray;
		const reservedChildren = FetusGlobalReserveCount("incubator");
		const incubatorSlaves = V.incubator.tanks.length;
		if (incubatorSlaves > 0) {
			App.UI.DOM.appendNewElement("h2", el, `Children in ${V.incubator.name}`);

			for (let i = 0; i < incubatorSlaves; i++) {
				const p = document.createElement("p");
				p.classList.add("card");
				let r = [];
				const {
					He, His,
					he, him, his
				} = getPronouns(V.incubator.tanks[i]);
				r.push(App.UI.DOM.makeElement("span", SlaveFullName(V.incubator.tanks[i]), ["pink"]));
				r.push(`occupies this tank.`);
				if (V.geneticMappingUpgrade >= 1) {
					r.push(`${He} is a`);
					if (V.incubator.tanks[i].genes === "XX") {
						r.push(`female`);
					} else {
						r.push(`male`);
					}
					r.push(`of ${V.incubator.tanks[i].race} descent with ${App.Desc.eyesColor(V.incubator.tanks[i])}, ${V.incubator.tanks[i].hColor} hair and ${V.incubator.tanks[i].skin} skin. Given ${his} parentage, ${he} is considered ${V.incubator.tanks[i].nationality}.`);
				} else {
					r.push(`${He} appears to be`);
					if (V.incubator.tanks[i].genes === "XX") {
						r.push(`a natural girl,`);
					} else {
						r.push(`a natural boy,`);
					}
					r.push(`with ${V.incubator.tanks[i].hColor}`);
					if (getBestVision(V.incubator.tanks[i]) !== 0) {
						r.push(`hair and ${App.Desc.eyesColor(V.incubator.tanks[i])}.`);
					} else {
						r.push(`hair. ${He} most likely will be blind.`);
					}
				}
				if (V.incubator.tanks[i].preg > 0) {
					r.push(`<span class="red">Warning! Subject may be pregnant! Unanticipated growth may occur!</span>`);
				}
				r.push(`Statistical projections indicates that once released ${he} will be around ${heightToEitherUnit(V.incubator.tanks[i].height + random(-5, 5))} tall. Most likely ${he} will be`);
				if (V.incubator.tanks[i].weight <= 30 && V.incubator.tanks[i].weight >= -30) {
					r.push(`at a healthy weight and`);
				} else if (V.incubator.tanks[i].weight >= 31 && V.incubator.tanks[i].weight <= 95) {
					r.push(`quite overweight and`);
				} else if (V.incubator.tanks[i].weight >= 96) {
					r.push(`very overweight and`);
				} else if (V.incubator.tanks[i].weight <= -31 && V.incubator.tanks[i].weight >= -95) {
					r.push(`quite thin and`);
				} else if (V.incubator.tanks[i].weight <= -96) {
					r.push(`very thin and`);
				}
				if (V.incubator.tanks[i].muscles <= 5 && V.incubator.tanks[i].muscles >= -5) {
					r.push(`with a normal musculature.`);
				} else if (V.incubator.tanks[i].muscles >= 6 && V.incubator.tanks[i].muscles <= 30) {
					r.push(`quite toned.`);
				} else if (V.incubator.tanks[i].muscles >= 31 && V.incubator.tanks[i].muscles <= 95) {
					r.push(`quite muscular.`);
				} else if (V.incubator.tanks[i].muscles >= 96) {
					r.push(`with a powerful musculature.`);
				} else if (V.incubator.tanks[i].muscles <= -6 && V.incubator.tanks[i].muscles >= -30) {
					r.push(`quite weak.`);
				} else if (V.incubator.tanks[i].muscles <= -31 && V.incubator.tanks[i].muscles >= -95) {
					r.push(`very weak.`);
				} else if (V.incubator.tanks[i].muscles <= -96) {
					r.push(`extremely weak.`);
				}
				r.push(`${His} breasts are projected to be`);
				if (V.incubator.tanks[i].boobs <= 299) {
					r.push(`of small size,`);
				} else if (V.incubator.tanks[i].boobs <= 799) {
					r.push(`of normal size,`);
				} else if (V.incubator.tanks[i].boobs <= 1799) {
					r.push(`of generous size,`);
				} else if (V.incubator.tanks[i].boobs <= 3249) {
					r.push(`of incredible size,`);
				} else {
					r.push(`of humongous size,`);
				}
				r.push(`while ${his} rear will be`);
				if (V.incubator.tanks[i].butt <= 1) {
					r.push(`flat.`);
				} else if (V.incubator.tanks[i].butt <= 3) {
					r.push(`a healthy size.`);
				} else if (V.incubator.tanks[i].butt <= 6) {
					r.push(`quite impressive.`);
				} else if (V.incubator.tanks[i].butt <= 9) {
					r.push(`very impressive.`);
				} else {
					r.push(`immense.`);
				}
				if (V.incubator.tanks[i].dick > 0) {
					if (V.incubator.tanks[i].dick <= 3) {
						r.push(`The latest analysis reported ${his} dick will end up being around the average`);
					} else if (V.incubator.tanks[i].dick >= 4 && V.incubator.tanks[i].dick <= 6) {
						r.push(`The latest analysis reported ${his} dick will end up being above average`);
					} else if (V.incubator.tanks[i].dick >= 7 && V.incubator.tanks[i].dick <= 9) {
						r.push(`The latest analysis reported ${his} dick will end up being far above the average`);
					} else {
						r.push(`The latest analysis reported ${his} dick will end up being of monstrous size`);
					}
				}
				if (V.incubator.tanks[i].balls > 0) {
					if (V.incubator.tanks[i].balls <= 3) {
						r.push(`and ${his} testicles will reach a normal size.`);
					} else if (V.incubator.tanks[i].balls >= 4 && V.incubator.tanks[i].balls <= 6) {
						r.push(`and ${his} testicles will be of remarkable size.`);
					} else if (V.incubator.tanks[i].balls >= 7 && V.incubator.tanks[i].balls <= 9) {
						r.push(`and ${his} testicles will reach an impressive size.`);
					} else {
						r.push(`and ${his} testicles will reach a monstrous size.`);
					}
				}
				if (V.incubator.tanks[i].pubertyXX === 1 && V.incubator.tanks[i].ovaries === 1) {
					r.push(`Scanners report ${his} womb is fertile.`);
				} else {
					r.push(`Scanners report ${he} is not fertile,`);
					if (V.incubator.tanks[i].pubertyXX === 0) {
						r.push(`as ${he} has not yet entered puberty.`);
					} else {
						r.push(`as it appears ${his} womb is sterile.`);
					}
				}
				if (V.incubator.tanks[i].incubatorSettings.pregAdaptation === 1) {
					r.push(`There are probes and tubes inserted inside ${his} reproductive organs so ${V.incubator.name} may work on them.`);
					const safeCC = (V.incubator.tanks[i].pregAdaptation - 5) * 2000;
					if (safeCC > 300000) {
						/* Some bigger size descriptions may be unreachable by normal game mechanics, so they are here just in case.*/
						r.push(`${His} bloated form looks more like an overinflated beachball made of the overstretched skin of ${his} belly, with ${his} relative tiny body attached to its side. ${He} is completely dominated by it now. The process has gone too far, so ${his} body can't maintain its form with the belly as part of abdominal cavity. Now ${his} skin, tissues and muscles have stretched enough for ${his} belly to expand outside of any physical boundaries and appear more an attachment to ${his} body, rather than part of it.`);
					} else if (safeCC > 150000) {
						r.push(`${His} body looks almost spherical, having been grotesquely inflated with the stimulator sacs inserted into ${his} internals. The incubator constantly maintains high pressure inside ${him}, forcing the displacement of ${his} organs and stretching skin, tissues, and muscles. Even ${his} chest has been forced to become a part of the top of ${his} belly, having been pushed forward from the overwhelming volume inside.`);
					} else if (safeCC > 75000) {
						r.push(`${His} belly has become so huge that it can be easily be compared with that of a woman ready to birth quintuplets. It pulses from the pressure applied within by the incubator probes.`);
					} else if (safeCC > 45000) {
						r.push(`${His} belly, in its current state, would look normal on a woman who was ready to birth triplets. On ${his} still growing form, it's something completely out of the ordinary.`);
					} else if (safeCC > 30000) {
						r.push(`${His} belly looks like it contains full-sized twins, ready to be birthed.`);
					} else if (safeCC > 15000) {
						r.push(`${His} belly has reached the size of full-term pregnancy.`);
					} else if (safeCC > 10000) {
						r.push(`${His} belly has inflated to the size of late-term pregnancy; its skin shines from the tension.`);
					} else if (safeCC > 5000) {
						r.push(`${His} belly resembles a mid-term pregnancy; it pulses slightly from the expansion and contraction of expandable sacs tipping the incubator probes.`);
					} else if (safeCC > 1500) {
						r.push(`${His} belly slightly bulges and rhythmically expands and contracts to the cycles of ${his} stimulation as the incubator inflates and deflates expandable sacs on its probes within ${his} body cavity. With the correct serums applied, this should allow it to stretch the skin, tissues, and muscles of ${his} belly to better tolerate the displacement of internal organs caused by fetal growth.`);
					}
				}
				App.Events.addNode(p, r, "div");
				if (V.incubator.tanks[i].incubatorSettings.growTime <= 0) {
					V.incubator.readySlaves = 1;
					appendRow(p, `${He} is ready to be released from ${his} tank.`);
				} else {
					const weekDisplay = Math.ceil(V.incubator.tanks[i].incubatorSettings.growTime / V.incubator.upgrade.speed);
					appendRow(p, `${His} growth is currently being accelerated. ${He} will be ready for release in about ${weekDisplay} ${(weekDisplay > 1) ? `weeks` : `week`}.`);
				}

				if (V.incubator.tanks[i].tankBaby !== 3) {
					r = [];
					r.push(`The tank is imprinting ${him} with basic life and sexual skills, though ${he} will still be very naïve and inexperienced on release.`);
					if (V.incubator.tanks[i].tankBaby === 2) {
						r.push(`The majority of ${his} indoctrination involves painting the world as a terrible place where only horror awaits ${him} should ${he} not obey ${his} owner.`);
					} else {
						r.push(`The majority of ${his} indoctrination involves painting the world as a wonderful place only if ${he} is unconditionally devoted to, and absolutely trusting of, ${his} owner.`);
					}
					App.Events.addNode(p, r, "div");
				} else {
					appendRow(p, `The tank keeps ${him} a braindead husk on a complete life-support.`);
				}


				if (V.incubator.upgrade.weight === 1) {
					if (V.incubator.tanks[i].incubatorSettings.weight === 1) {
						appendRow(p, `${His} weight is not being properly managed, saving costs but likely causing excessive weight gain.`);
					} else if (V.incubator.tanks[i].incubatorSettings.weight === 2) {
						appendRow(p, `${His} weight is being carefully managed; ${he} will be released at a healthy weight.`);
					} else if (V.incubator.tanks[i].incubatorSettings.weight === 0) {
						appendRow(p, `Weight management systems are offline; ${he} will likely be malnourished.`);
					}
				}
				if (V.incubator.upgrade.muscles === 1) {
					if (V.incubator.tanks[i].incubatorSettings.muscles === 2) {
						appendRow(p, `${His} strength levels are purposefully set higher than recommended; ${he} is likely to have excessive musculature.`);
					} else if (V.incubator.tanks[i].incubatorSettings.muscles === 1) {
						appendRow(p, `${His} musculature is being carefully managed; ${he} will be released with near normal strength.`);
					} else if (V.incubator.tanks[i].incubatorSettings.muscles === 0) {
						appendRow(p, `Strength management systems are offline; ${he} will likely be released extremely weak.`);
					}
				}
				if (V.incubator.upgrade.growthStims === 1) {
					if (V.incubator.tanks[i].incubatorSettings.growthStims === 2) {
						appendRow(p, `${He} is being injected with higher than recommended doses of stimulants; ${he} is likely to be much taller than expected.`);
					} else if (V.incubator.tanks[i].incubatorSettings.growthStims === 1) {
						appendRow(p, `${He} is injected with the recommended dosage of stimulants; ${he} will grow to ${his} full expected height.`);
					} else if (V.incubator.tanks[i].incubatorSettings.growthStims === 0) {
						appendRow(p, `Growth stimulant injection systems are offline; ${he} will develop normally.`);
					}
				}
				if (V.incubator.upgrade.reproduction === 1) {
					if (V.incubator.tanks[i].incubatorSettings.reproduction === 2) {
						appendRow(p, `${His} hormone levels are purposefully set higher than recommended; ${his} reproductive systems are likely to be over-active.`);
					} else if (V.incubator.tanks[i].incubatorSettings.reproduction === 1) {
						appendRow(p, `${His} hormone levels are being carefully managed; ${he} will be released with fully functional reproductive organs.`);
					} else if (V.incubator.tanks[i].incubatorSettings.reproduction === 0) {
						appendRow(p, `Reproduction management systems are offline; ${he} will undergo normal puberty.`);
					}
					if (V.incubator.tanks[i].incubatorSettings.pregAdaptation === 1) {
						/* Should be visible only after incubator.setting.reproduction is installed and activated*/
						r = [];
						r.push(`${His} reproductive organs are getting`);
						if (V.incubator.tanks[i].incubatorSettings.pregAdaptationPower === 1) {
							r.push(`an advanced`);
						} else if (V.incubator.tanks[i].incubatorSettings.pregAdaptationPower === 2) {
							r.push(`an intensive`);
						} else if (V.incubator.tanks[i].incubatorSettings.pregAdaptationPower === 3) {
							r.push(`an extreme`);
						} else {
							r.push(`a standard`);
						}
						r.push(`course of mechanical and hormonal therapy to become adapted for future use.`);
						App.Events.addNode(p, r, "div");
					}
				}
				r = [];
				r.push(`Rename ${him}:`);
				r.push(
					App.UI.DOM.makeTextBox(
						V.incubator.tanks[i].slaveName,
						(v) => {
							V.incubator.tanks[i].slaveName = v;
							V.incubator.tanks[i].birthName = V.incubator.tanks[i].slaveName;
							refresh();
						}
					)
				);
				r.push(App.UI.DOM.makeElement("span", `Given name only`, [`note`]));
				App.Events.addNode(p, r, "div");

				if (V.cheatMode === 1) {
					row = document.createElement("div");
					App.UI.DOM.appendNewElement("span", row, `Cheatmode: `, ["bold"]);
					row.append(
						App.UI.DOM.link(
							"Retrieve immediately",
							() => {
								V.readySlave = V.incubator.tanks[i];
								V.incubator.tanks.splice(i, 1);
								release();
							},
							[],
							"Incubator Retrieval Workaround"
						)
					);
					p.append(row);
				}
				if ((V.incubator.upgrade.organs === 1) && (V.incubator.tanks[i].tankBaby !== 3)) {
					r = [];
					r.push(`You can extract a sample and prepare a new organ for ${him} to be implanted once ${he} exits ${his} tank.`);
					const tankOrgans = {
						ovaries: 0,
						penis: 0,
						testicles: 0,
						rightEye: 0,
						leftEye: 0,
						voiceBox: 0,
						cochleae: 0
					};
					for (const organ of V.incubator.organs) {
						if (V.incubator.tanks[i].ID === organ.ID) {
							tankOrgans[organ.type] = 1;
						}
					}

					if (V.incubator.tanks[i].genes === "XX") {
						r.push(`Being a natural girl, ${he} possesses a functional vagina and ovaries. You can:`);
					} else {
						r.push(`Being a natural boy, ${he} possesses a functional penis and balls. You can:`);
					}
					App.Events.addNode(p, r, "div");

					linkArray = [];
					if (V.incubator.tanks[i].ovaries === 0) {
						if (tankOrgans.ovaries !== 1) {
							linkArray.push(
								makeLink(
									"Prepare ovaries",
									() => {
										App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "ovaries");
									},
									refresh
								)
							);
						} else {
							linkArray.push(App.UI.DOM.makeElement("span", `Ovaries are already prepared.`, ["detail"]));
						}
					}
					if (V.incubator.tanks[i].dick === 0 && (V.seeDicks > 0 || V.makeDicks > 0)) {
						if (tankOrgans.penis !== 1) {
							linkArray.push(
								makeLink("Prepare penis", () => { App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "penis"); }, refresh)
							);
						} else {
							linkArray.push(App.UI.DOM.makeElement("span", `A penis is already prepared`, ["detail"]));
						}
					}
					if (V.incubator.tanks[i].balls === 0) {
						if (tankOrgans.testicles !== 1) {
							linkArray.push(makeLink("Prepare testicles", () => { App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "testicles"); }, refresh));
						} else {
							linkArray.push(App.UI.DOM.makeElement("span", `Testicles are already prepared.`, ["detail"]));
						}
					}
					const vision = {
						left: getLeftEyeVision(V.incubator.tanks[i]),
						right: getRightEyeVision(V.incubator.tanks[i])
					};
					if (vision.left === 0 || vision.right === 0) {
						if (vision.left === 0 && vision.right === 0) {
							linkArray.push(App.UI.DOM.makeElement("span", `${He} appears to be blind in both eyes:`));
						} else if (vision.left === 0) {
							linkArray.push(App.UI.DOM.makeElement("span", `${He} appears to be blind in ${his} left eye:`));
						} else {
							linkArray.push(App.UI.DOM.makeElement("span", `${He} appears to be blind in ${his} right eye:`));
						}
						if (vision.left === 0 && tankOrgans.leftEye !== 1) {
							linkArray.push(makeLink("Prepare left eye", () => { App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "leftEye"); }, refresh));
						}
						if (vision.right === 0 && tankOrgans.rightEye !== 1) {
							linkArray.push(makeLink("Prepare right eye", () => { App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "rightEye"); }, refresh));
						}
						if (vision.left === 0 && vision.right === 0 && tankOrgans.leftEye !== 1 && tankOrgans.rightEye !== 1) {
							linkArray.push(
								makeLink(
									"Prepare both eyes",
									() => {
										App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "rightEye");
										App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "leftEye");
									},
									refresh
								)
							);
						}
						if (vision.left === 0 && vision.right === 0 && tankOrgans.leftEye === 1 && tankOrgans.rightEye === 1) {
							linkArray.push(App.UI.DOM.makeElement("span", `Both eyes are already prepared.`, [`detail`]));
						} else if (tankOrgans.leftEye === 1) {
							linkArray.push(App.UI.DOM.makeElement("span", `A left eye is already prepared.`, [`detail`]));
						} else if (tankOrgans.rightEye === 1) {
							linkArray.push(App.UI.DOM.makeElement("span", `A right eye is already prepared.`, [`detail`]));
						}
					}
					App.UI.DOM.appendNewElement("div", p, App.UI.DOM.generateLinksStrip(linkArray));
					if (V.incubator.tanks[i].voice === 0) {
						r = [];
						r.push(`${He} appears to be mute:`);
						if (tankOrgans.voicebox !== 1) {
							r.push(makeLink("Prepare vocal cords", () => { App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "voicebox"); }, refresh));
						} else {
							r.push(App.UI.DOM.makeElement("span", `Vocal cords are already prepared.`, [`detail`]));
						}
						App.Events.addNode(p, r, "div");
					}
					if (V.incubator.tanks[i].hears === -2) {
						r = [];
						r.push(`${He} appears to be deaf:`);
						if (tankOrgans.cochleae !== 1) {
							r.push(makeLink("Prepare cochleae", () => { App.Medicine.OrganFarm.growIncubatorOrgan(V.incubator.tanks[i], "cochleae"); }, refresh));
						} else {
							r.push(App.UI.DOM.makeElement("span", `Cochleae are already prepared.`, [`detail`]));
						}
						App.Events.addNode(p, r, "div");
					}
				}

				App.UI.DOM.appendNewElement(
					"div",
					p,
					App.UI.DOM.link(
						`Inspect tank settings`,
						() => {
							V.AS = i;
						},
						[],
						`Inspect Tank Settings`
					)
				);

				if (V.incubator.tanks[i].incubatorSettings.growTime <= 0) {
					App.UI.DOM.appendNewElement(
						"div",
						p,
						App.UI.DOM.link(
							`Release ${him}`,
							() => {
								V.readySlave = V.incubator.tanks[i];
								V.incubator.tanks.splice(i, 1);
							},
							[],
							`Incubator Retrieval Workaround`
						)
					);
				}

				el.append(p);
			}
		}

		for (let i = 0; i < reservedChildren; i++) {
			const empty = document.createElement("div");
			empty.classList.add("card", "note");
			empty.append("This tank is currently reserved");
			el.append(empty);
		}

		return el;

		function refresh() {
			jQuery(tanksContent).empty().append(tankBabies());
			jQuery(introDiv).empty().append(intro());
		}
	}

	function tankSettings() {
		const el = new DocumentFragment();

		/* Growth acceleration */
		let section = document.createElement("p");
		if (V.incubator.upgrade.speed === 52) {
			section.append(`It has been upgraded with perfected growth accelerants; children grow at the rate of 1 week to 1 year.`);
		} else if (V.incubator.upgrade.speed === 18) {
			const cost = Math.trunc(500000 * V.upgradeMultiplierArcology);
			section.append(`It has been upgraded with advanced experimental growth accelerants; children grow at the rate of 3 weeks to 1 year.`);
			section.append(
				makePurchase(`Fund speculative research into maximizing growth rate`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.speed = 52;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		} else if (V.incubator.upgrade.speed === 9) {
			const cost = Math.trunc(75000 * V.upgradeMultiplierArcology);
			section.append(`It has been upgraded with advanced growth accelerants; children grow at the rate of 6 weeks to 1 year.`);
			section.append(
				makePurchase(`Fund research into increasing growth rate even further`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.speed = 18;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		} else if (V.incubator.upgrade.speed === 6) {
			const cost = Math.trunc(30000 * V.upgradeMultiplierArcology);
			section.append(`It has been upgraded with growth accelerants; children grow at the rate of 9 weeks to 1 year.`);
			section.append(
				makePurchase(`Further upgrade the incubators with specialized stem cells to speed growth`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.speed = 9;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		} else if (V.incubator.upgrade.speed === 5) {
			const cost = Math.trunc(30000 * V.upgradeMultiplierArcology);
			section.append(`The incubation tanks are basic; children grow at the rate of 12 weeks to 1 year.`);
			section.append(
				makePurchase(`Upgrade the incubators with growth accelerating drugs`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.speed = 6;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		}
		el.append(section);


		/* Weight monitoring */
		section = document.createElement("p");
		if (V.incubator.upgrade.weight === 1) {
			section.append(`Advanced caloric monitoring systems have been installed in the tanks to monitor and maintain a developing child's weight.`);
		} else {
			const cost = Math.trunc(20000 * V.upgradeMultiplierArcology);
			section.append(`There are no systems in place to control a growing child's weight; they will likely come out emaciated from the rapid growth.`);
			section.append(
				makePurchase(`Upgrade the growth tanks with weight monitoring systems`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.weight = 1;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		}
		el.append(section);


		/* Muscles */
		section = document.createElement("p");
		if (V.incubator.upgrade.muscles === 1) {
			section.append(`Advanced monitoring and steroid injection systems have been installed in the tanks to monitor and maintain a developing child's musculature.`);
		} else {
			const cost = Math.trunc(20000 * V.upgradeMultiplierArcology);
			section.append(`There are no systems in place to control a growing child's musculature; they will likely come out frail and weak from the rapid growth.`);
			section.append(
				makePurchase(`Upgrade the growth tanks with muscle monitoring systems`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.muscles = 1;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		}
		el.append(section);


		/* Height */
		section = document.createElement("p");
		if (V.incubator.upgrade.growthStims === 1) {
			section.append(`Advanced monitoring and stimulant injection systems have been installed in the tanks to monitor and maintain a developing child's height.`);
		} else if (V.growthStim === 1) {
			const cost = Math.trunc(20000 * V.upgradeMultiplierArcology);
			section.append(`There are no systems in place to control a growing child's height.`);
			section.append(
				makePurchase(`Upgrade the growth tanks with stimulants injection systems`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.growthStims = 1;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		} else {
			App.UI.DOM.appendNewElement("span", section, `There are no systems in place to control a growing child's height and you lack the capability to fabricate growth stimulants.`, ["note"]);
		}
		el.append(section);


		/* Reproductive system */
		section = document.createElement("p");
		if (V.incubator.upgrade.reproduction === 1) {
			section.append(`Advanced monitoring and hormone injection systems have been installed in the tanks to influence a developing child's reproductive organs.`);
		} else {
			const cost = Math.trunc(50000 * V.upgradeMultiplierArcology);
			section.append(`There are no systems in place to control a growing child's reproductive capability.`);
			section.append(
				makePurchase(`Upgrade the growth tanks with hormone monitoring systems`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.reproduction = 1;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		}
		el.append(section);


		/* Preg adaptation */
		if (V.minimumSlaveAge <= 6 && (V.arcologies[0].FSRepopulationFocus >= 60 || V.BlackmarketPregAdaptation === 1)) {
			/* Main prerequisite - stable repopulation FS OR documentation purchased from black market. And age gate. */
			let div = document.createElement("div");
			section = document.createElement("div");
			if (V.incubator.upgrade.pregAdaptation === 1) {
				section.append(`The incubators have been upgraded with special set of manipulators, probes, nozzles and syringes coupled together with specific programs to take advantage of the accelerated growth to heighten viable reproductive capacity. These include injections of specialized serums and mechanical manipulation of the reproductive system and associated tissues, organs, muscles and bones.`);
			} else {
				section.append(`The highly controlled environment inside incubation tube coupled with the greatly accelerated growth process is the perfect opportunity to push the boundaries of a body's ability to sustain pregnancy. This will include injections of specialized serums and mechanical manipulation of their reproductive system through a special set of manipulators, probes, nozzles and syringes supervised by a powerful monitoring program. Costly to maintain.`);
				div.append(section);

				section = document.createElement("div");
				if (V.incubator.upgrade.reproduction < 1) {
					/* Now with reports - what is lacking for construction */
					section.append(`${incubatorNameCaps} lacks advanced monitoring and hormone injection systems. Construction not possible.`);
				} else if (V.incubator.upgrade.organs < 1) {
					section.append(`${incubatorNameCaps} lacks the ability to extract tissue samples. Construction not possible.`);
				} else if (V.dispensaryUpgrade < 1) {
					section.append(`${incubatorNameCaps} lacks a connection to an advanced pharmaceutical fabricator. Cutting-edge targeted serums production needed as integral part. Construction not possible.`);
				} else if (V.bellyImplants < 1) {
					section.append(`${incubatorNameCaps} lacks a connection with an implant manufacturing to construct fillable abdominal implants to simulate expansion. Construction not possible.`);
				} else if (V.incubator.upgrade.growthStims < 1) {
					section.append(`${incubatorNameCaps} lacks advanced monitoring and stimulant injection systems. Construction not possible.`);
				} else {
					const cost = Math.trunc(2000000 * V.upgradeMultiplierArcology);
					section.append(
						makePurchase(`Manufacture and install this subsystem`, cost, "capEx", {
							handler: () => {
								V.incubator.upgrade.pregAdaptation = 1;
								refresh();
							},
							notes: [`will increase upkeep costs`]
						})
					);
				}
			}
			div.append(section);
			el.append(div);
		}


		/* Tissue sampling */
		section = document.createElement("p");
		if (V.incubator.upgrade.organs === 1) {
			section.append(`Surgical tools have been added to the tank to be able to extract tissue samples from the occupant.`);
		} else if (V.organFarmUpgrade >= 1) {
			const cost = Math.trunc(10000 * V.upgradeMultiplierArcology);
			section.append(`The tanks lack the ability to extract tissue samples to be used by the organ fabricator.`);
			section.append(
				makePurchase(`Upgrade the growth tanks with surgical extraction tools`, cost, "capEx", {
					handler: () => {
						V.incubator.upgrade.organs = 1;
						refresh();
					},
					notes: [`will increase upkeep costs`]
				})
			);
		} else {
			App.UI.DOM.appendNewElement("span", section, `The tanks lack the ability to extract tissue samples and the dispensary lacks the ability to make use of them to fabricate organs.`, ["note"]);
		}
		el.append(section);


		/* Rename */
		section = document.createElement("p");
		section.append(App.Facilities.rename(App.Entity.facilities.incubator, () => refresh()));
		el.append(section);

		const tabBar = new App.UI.Tabs.TabBar("SettingsGender");
		tabBar.addTab("Male Settings", "male", tankSettingsContent("XY"));
		tabBar.addTab("Female Settings", "female", tankSettingsContent("XX"));
		el.append(tabBar.render());

		return el;

		function refresh() {
			jQuery(settingsContent).empty().append(tankSettings());
			jQuery(introDiv).empty().append(intro());
			jQuery(tanksContent).empty().append(tankBabies());
		}
	}

	function tankSettingsContent(genes) {
		const el = new DocumentFragment();
		let r = [];
		let section;
		let linkArray;
		const setting = (genes === "XX" ? V.incubator.femaleSetting : V.incubator.maleSetting);

		/* Release age */
		r.push("Target age for release:");
		r.push(
			App.UI.DOM.makeTextBox(
				setting.targetAge,
				(v) => {
					setting.targetAge = v || V.minimumSlaveAge;
					setting.targetAge = Math.clamp(setting.targetAge, V.minimumSlaveAge, V.retirementAge);
					refresh();
				},
				true
			)
		);
		linkArray = [];
		linkArray.push(
			App.UI.DOM.link(
				`Minimum Legal Age`,
				() => {
					setting.targetAge = V.minimumSlaveAge;
					refresh();
				}
			)
		);
		linkArray.push(
			App.UI.DOM.link(
				`Average Age of Fertility`,
				() => {
					setting.targetAge = V.fertilityAge;
					refresh();
				}
			)
		);
		linkArray.push(
			App.UI.DOM.link(
				`Average Age of Potency`,
				() => {
					setting.targetAge = V.potencyAge;
					refresh();
				}
			)
		);
		linkArray.push(
			App.UI.DOM.link(
				`Legal Adulthood`,
				() => {
					setting.targetAge = 18;
					refresh();
				}
			)
		);
		r.push(App.UI.DOM.generateLinksStrip(linkArray));
		r.push(App.UI.DOM.makeElement("div", `Cannot be modified after a tank's first week.`, "note"));
		App.Events.addNode(el, r, "p");


		/* Weight */
		if (V.incubator.upgrade.weight === 1) {
			section = document.createElement("p");
			linkArray = [];

			if (setting.weight === 1) {
				section.append(`Weight is not being properly managed; excessive weight gain is likely.`);
			} else {
				linkArray.push(makeLink(`Estimate only`, () => { setting.weight = 1; }, refresh));
			}

			if (setting.weight === 2) {
				section.append(`Weight is being carefully managed; children will be released at a healthy weight.`);
			} else {
				linkArray.push(makeLink(`Activate`, () => { setting.weight = 2; }, refresh));
			}

			if (setting.weight === 0) {
				section.append(`Weight management systems are offline; children will likely be malnourished.`);
			} else {
				linkArray.push(makeLink(`Disable`, () => { setting.weight = 0; }, refresh));
			}

			section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
			el.append(section);
		}


		/* Muscles */
		if (V.incubator.upgrade.muscles === 1) {
			section = document.createElement("p");
			linkArray = [];

			if (setting.muscles === 2) {
				section.append(`Strength levels are purposefully set higher than recommended; excessive muscle gain is likely.`);
			} else {
				linkArray.push(makeLink(`Overload`, () => { setting.muscles = 2; }, refresh));
			}

			if (setting.muscles === 1) {
				section.append(`Musculature is being carefully managed; children will be released with near normal strength.`);
			} else {
				linkArray.push(makeLink(`Activate`, () => { setting.muscles = 1; }, refresh));
			}

			if (setting.muscles === 0) {
				section.append(`Strength management systems are offline; children will likely be released extremely weak.`);
			} else {
				linkArray.push(makeLink(`Disable`, () => { setting.muscles = 0; }, refresh));
			}

			section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
			el.append(section);
		}


		/* Height */
		if (V.incubator.upgrade.growthStims === 1) {
			section = document.createElement("p");
			linkArray = [];

			if (setting.growthStims === 2) {
				section.append(`Children are injected with higher than recommended doses of stimulants; exceeding expected final height is likely. `);
			} else {
				linkArray.push(makeLink(`Overload`, () => { setting.growthStims = 2; }, refresh));
			}

			if (setting.growthStims === 1) {
				section.append(`Children are injected with the recommended dosage of stimulants; they will grow to their full expected height. `);
			} else {
				linkArray.push(makeLink(`Limit`, () => { setting.growthStims = 1; }, refresh));
			}

			if (setting.growthStims === 0) {
				section.append(`Growth stimulant injection systems are offline; children will develop normally. `);
			} else {
				linkArray.push(makeLink(`Disable`, () => { setting.growthStims = 0; }, refresh));
			}

			section.append(App.UI.DOM.generateLinksStrip(linkArray));
			el.append(section);
		}


		/* Reproductive system */
		if (V.incubator.upgrade.reproduction === 1) {
			section = document.createElement("p");
			linkArray = [];

			if (setting.reproduction === 2) {
				section.append(`Hormone levels are purposefully set higher than recommended; over-active reproductive systems are likely.`);
			} else {
				linkArray.push(makeLink(`Overload`, () => { setting.reproduction = 2; }, refresh));
			}

			if (setting.reproduction === 1) {
				section.append(`Hormone levels are being carefully managed; children will be released with fully functional reproductive organs.`);
			} else {
				linkArray.push(makeLink(`Limit`, () => { setting.reproduction = 1; }, refresh));
			}

			if (setting.reproduction === 0) {
				section.append(`Reproduction management systems are offline; children will undergo normal puberty.`);
			} else {
				linkArray.push(makeLink(`Disable`, () => { setting.reproduction = 0; }, refresh));
			}

			section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
			el.append(section);
		}


		/* Preg adaptation */
		if (V.incubator.upgrade.reproduction === 1 && V.incubator.upgrade.pregAdaptation === 1) {
			section = document.createElement("div");
			linkArray = [];

			if (setting.pregAdaptation === 1) {
				section.append(`Pregnancy adaptation system online for ${genes === "XX" ? `females` : `males`}.`);
			} else {
				linkArray.push(makeLink(`Enable`, () => { setting.pregAdaptation = 1; }, refresh));
			}

			if (setting.pregAdaptation === 0) {
				section.append(`Pregnancy adaptation system offline for ${genes === "XX" ? `females` : `males`}.`);
			} else {
				linkArray.push(makeLink(`Disable`, () => { setting.pregAdaptation = 0; }, refresh));
			}

			section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
			el.append(section);

			if (setting.pregAdaptation > 0) {
				section = document.createElement("div");
				linkArray = [];

				if (setting.pregAdaptationPower === 0) {
					section.append(`Pregnancy adaptation programmed to standard procedures. Normal pregnancy should be safe for subjects.`);
				} else {
					linkArray.push(makeLink(`Standard`, () => { setting.pregAdaptationPower = 0; }, refresh));
				}

				if (setting.pregAdaptationPower === 1) {
					section.append(`Pregnancy adaptation programmed to advanced procedures. Up to triplet pregnancy should be safe for the subjects.`);
				} else {
					linkArray.push(makeLink(`Advanced`, () => { setting.pregAdaptationPower = 1; }, refresh));
				}

				if (setting.pregAdaptationPower === 2) {
					section.append(`Pregnancy adaptation programmed to intensive procedures. Up to octuplet pregnancy should be possible for the subjects. Warning! Side effects may occur to health and mental condition.`);
				} else {
					linkArray.push(makeLink(`Intensive`, () => { setting.pregAdaptationPower = 2; }, refresh));
				}

				if (setting.pregAdaptationPower === 3) {
					section.append(`Pregnancy adaptation programmed to extreme procedures. Normally unsustainable pregnancies may be possible for some subjects. Actual capacity will vary with genetic and other individual conditions. WARNING! Extreme side effects may occur to health and mental condition! `);
				} else {
					linkArray.push(makeLink(`Extreme`, () => { setting.pregAdaptationPower = 3; }, refresh));
				}

				section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
				el.append(section);
			}

			section = document.createElement("div");
			App.UI.DOM.appendNewElement("div", section, `Due to the high complexity and steep risks of this procedure, these settings cannot be changed after a tank's first week.`, "note");
			el.append(section);
		}


		/* Imprinting */
		section = document.createElement("p");
		if (setting.imprint === "terror") {
			section.append(`The imprinting system is currently focused on making them devoted but fearful of you. The imprinting cycle is locked after a tank's first week. `);
			if (V.bodyswapAnnounced === 1) {
				section.append(
					choice(
						`Switch the system to focus on preparation for body-swapping`,
						() => {
							setting.imprint = "husk";
							refresh();
						}
					)
				);
			}
			section.append(
				choice(
					`Switch the system to focus on attachment`,
					() => {
						setting.imprint = "trust";
						refresh();
					}
				)
			);
		} else if (setting.imprint === "trust") {
			section.append(`The imprinting system is currently focused on making them devoted and trusting of you. The imprinting cycle is locked after a tank's first week.`);
			if (V.bodyswapAnnounced === 1) {
				section.append(
					choice(
						`Switch the system to focus preparation for body-swapping`,
						() => {
							setting.imprint = "husk";
							refresh();
						}
					)
				);
			}
			section.append(
				choice(
					`Switch the system to focus on dependence`,
					() => {
						setting.imprint = "terror";
						refresh();
					}
				)
			);
		} else {
			section.append(`The imprinting system is currently focused on producing complete vegetables ready to be used as hosts for body swapping. The imprinting cycle is locked after a tank's first week.`);
			section.append(
				choice(
					`Switch the system to focus on dependence`,
					() => {
						setting.imprint = "terror";
						refresh();
					}
				)
			);
			section.append(
				choice(
					`Switch the system to focus on attachment`,
					() => {
						setting.imprint = "trust";
						refresh();
					}
				)
			);
		}
		el.append(section);
		return el;

		function refresh() {
			jQuery(settingsContent).empty().append(tankSettings());
			jQuery(introDiv).empty().append(intro());
			jQuery(tanksContent).empty().append(tankBabies());
		}
	}

	function release() {
		const multiple = (V.incubator.bulkRelease === 1) && V.incubator.tanks.filter(t => t.incubatorSettings.growTime <= 0).length > 1;
		const getTanks = () => {
			if (multiple) {
				V.newSlavePool = V.incubator.tanks.deleteWith(t => t.incubatorSettings.growTime <= 0);
			} else {
				const baby = V.incubator.tanks.find(t => t.incubatorSettings.growTime <= 0);
				V.incubator.tanks.delete(baby);
				V.readySlave = baby;
			}
		};
		if (V.incubator.readySlaves === 1) {
			return App.UI.DOM.passageLink(`Release ready ${multiple ? "tanks": "tank"}`, "Incubator Retrieval Workaround", getTanks);
		}
		return new DocumentFragment();
	}

	/**
	 *
	 * @param {string} title
	 * @param {function():void} func
	 * @param {function():void} refresh
	 */
	function makeLink(title, func, refresh) {
		return App.UI.DOM.link(
			title,
			() => {
				func();
				refresh();
			}
		);
	}

	/**
	 *
	 * @param {string} title
	 * @param {function():void} func
	 * @param {string} [passage=""]
	 * @param {string} [note=""]
	 * @returns {HTMLElement}
	 */
	function choice(title, func, passage = "", note = "") {
		const div = document.createElement("div");
		div.classList.add("choices");
		div.append(
			App.UI.DOM.link(
				title,
				func,
				[],
				passage,
				note
			)
		);
		return div;
	}

	function appendRow(node, text) {
		return App.UI.DOM.appendNewElement("div", node, text);
	}
};
