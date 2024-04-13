App.Mods.SecExp.secHub = (function() {
	return {
		init,
		GUI
	};

	function init() {
		V.SecExp.buildings.secHub = {
			menials: 0,
			coldstorage: 0,
			upgrades: {
				security: {
					nanoCams: 0,
					cyberBots: 0,
					eyeScan: 0,
					cryptoAnalyzer: 0,
				},
				crime: {
					autoTrial: 0,
					autoArchive: 0,
					worldProfiler: 0,
					advForensic: 0,
				},
				intel : {
					sensors: 0,
					radar: 0,
					signalIntercept: 0,
				},
				readiness: {
					earlyWarn: 0,
					rapidPlatforms: 0,
					pathways: 0,
					rapidVehicles: 0,
				}
			}
		};
	}
	function GUI() {
		const node = new DocumentFragment();
		V.nextButton = "Back";
		V.nextLink = "Main";
		let r = [];

		r.push("The security headquarters stand in front of you. Innumerable screens flood with light the great central room.");
		if (V.SecExp.buildings.secHub.menials > 0) {
			r.push("Some slaves see you enter and interrupt their work to greet you.");
		}
		r.push("From here you can build a safe and prosperous arcology.");
		node.append(r.join(" "));
		if (V.SecExp.core.authority < 10000 || V.SecExp.core.authority < 12000) {
			App.UI.DOM.appendNewElement("div", node, "You lack the authority to access more advanced upgrades.", "red");
		}

		App.UI.DOM.appendNewElement("div", node, `You have ${num(V.SecExp.buildings.secHub.menials)} slaves working in the HQ. ${App.Mods.SecExp.Check.reqMenials()} are required and you have ${num(V.menials)} free menial slaves.`);
		if (V.SecExp.buildings.secHub.menials < App.Mods.SecExp.Check.reqMenials()) {
			App.UI.DOM.appendNewElement("div", node, "You do not have enough slaves here. You will not receive the full benefit of the installed upgrades.");
		} else {
			App.UI.DOM.appendNewElement("div", node, "You have enough slaves to man all security systems.");
		}
		App.UI.DOM.appendNewElement("div", node, App.UI.market({menialWorkersOnly: true}));

		const optionsList = [1, 5, 10, 100, 500, 1000];
		let linkArray;
		for (const flow of ["in", "out"]) {
			linkArray = [];
			for (const value of optionsList.filter(s => (flow === "in" ? V.menials : V.SecExp.buildings.secHub.menials) >= s)) {
				linkArray.push(
					App.UI.DOM.link(
						`${value}`,
						() => {
							if (flow === "in") {
								V.menials -= value;
								V.SecExp.buildings.secHub.menials += value;
							} else {
								V.menials += value;
								V.SecExp.buildings.secHub.menials -= value;
							}
							App.UI.reload();
						}
					)
				);
			}
			if (linkArray.length > 0) {
				const line = new DocumentFragment();
				line.append(`Transfer ${flow}: `, App.UI.DOM.generateLinksStrip(linkArray));
				App.UI.DOM.appendNewElement("div", node, line);
			}
		}

		if (V.SecExp.buildings.secHub.menials > 0) {
			App.UI.DOM.appendNewElement("div", node,
				App.UI.DOM.link(
					"Match the requirement",
					() => {
						if (V.menials >= App.Mods.SecExp.Check.reqMenials() - V.SecExp.buildings.secHub.menials) {
							V.menials -= App.Mods.SecExp.Check.reqMenials() - V.SecExp.buildings.secHub.menials;
							V.SecExp.buildings.secHub.menials = App.Mods.SecExp.Check.reqMenials();
						} else if (App.Mods.SecExp.Check.reqMenials() < V.SecExp.buildings.secHub.menials) {
							V.menials += App.Mods.SecExp.Check.reqMenials() - V.SecExp.buildings.secHub.menials;
							V.SecExp.buildings.secHub.menials = App.Mods.SecExp.Check.reqMenials();
						} else {
							V.SecExp.buildings.secHub.menials += V.menials;
							V.menials = 0;
						}
						App.UI.reload();
					}
				)
			);
		}

		App.Events.addParagraph(node, []);
		switch (App.Mods.SecExp.battle.recon()) {
			case 0:
				App.UI.DOM.appendNewElement("div", node, "Your reconnaissance capabilities are very limited. Very little information will be available if the arcology is attacked.");
				break;
			case 1:
				App.UI.DOM.appendNewElement("div", node, "You have limited reconnaissance capabilities. You'll have limited intel available in case of an attack.");
				break;
			case 2:
				App.UI.DOM.appendNewElement("div", node, "You have good reconnaissance capabilities. Good, reliable intel will be available if the arcology is attacked.");
				break;
			case 3:
				App.UI.DOM.appendNewElement("div", node, "You have great reconnaissance capabilities. You'll have very accurate information on the enemy if the arcology is attacked.");
		}

		switch (App.Mods.SecExp.battle.deploySpeed()) {
			case 1:
				App.UI.DOM.appendNewElement("div", node, "You have low readiness. You won't be able to mobilize many troops in time in case of an attack.");
				break;
			case 2:
				App.UI.DOM.appendNewElement("div", node, "You have decent readiness. You will be able to muster up sufficient forces to handle an average attack.");
				break;
			case 3:
				App.UI.DOM.appendNewElement("div", node, "You have good readiness. You will be able to mobilize a lot of troops in case of an attack.");
				break;
			case 4:
				App.UI.DOM.appendNewElement("div", node, "You have great readiness. You can mobilize a small army in very little time.");
		}

		App.UI.DOM.appendNewElement("div", node, situationAnalysis("security"));
		App.UI.DOM.appendNewElement("div", node, situationAnalysis("crime"));

		if (V.SecExp.core.authority > 12000) {
			App.Events.addParagraph(node, []);
			App.UI.DOM.appendNewElement("h2", node, `Cold Data Storage Facility:`);
			if (App.Mods.SecExp.Check.reqMenials() <= 10) {
				App.UI.DOM.appendNewElement("div", node, "Personnel cannot be further reduced.");
			} else {
				r = [];
				if (V.SecExp.buildings.secHub.coldstorage > 0) {
					r.push("You have installed a cold storage facility for the Security HQ's archives with a data retention capability of");
				}
				if (V.SecExp.buildings.secHub.coldstorage > 6) {
					r.push("three years.");
				} else {
					let cost;
					let authorityGate = 19500;
					let text = ["Expand the cold storage facility to increase data retention to"];
					const targetValue = V.SecExp.buildings.secHub.coldstorage;
					const note = `Will lower the amount of required slaves by ${targetValue > 0 ? "a further" : ""} 10, but will increase upkeep. The remaining slaves will be more efficient in dealing with crime.`;
					if (V.SecExp.buildings.secHub.coldstorage === 6) {
						cost = 2400000;
						r.push("two years.");
						text.push("three years.");
					} else if (V.SecExp.buildings.secHub.coldstorage === 5) {
						cost = 1200000;
						r.push("one year.");
						text.push("two years.");
					} else if (V.SecExp.buildings.secHub.coldstorage === 4) {
						cost = 900000;
						r.push("nine months.");
						text.push("one year.");
					} else if (V.SecExp.buildings.secHub.coldstorage === 3) {
						authorityGate = 18000;
						cost = 600000;
						r.push("six months.");
						text.push("nine months.");
					} else if (V.SecExp.buildings.secHub.coldstorage === 2) {
						authorityGate = 16000;
						cost = 300000;
						r.push("three months.");
						text.push("six months.");
					} else if (V.SecExp.buildings.secHub.coldstorage === 1) {
						authorityGate = 14000;
						cost = 100000;
						r.push("one month.");
						text.push("three months.");
					} else if (V.SecExp.buildings.secHub.coldstorage === 0) {
						authorityGate = 12000;
						cost = 50000;
						text = ["Install a cold storage facility"];
					}
					if (checkStatus(targetValue, authorityGate)) {
						App.UI.DOM.appendNewElement("div", node, makeLink(text.join(" "), cost, note, "coldstorage"));
					} else {
						App.UI.DOM.appendNewElement("div", node, `At least ${num(authorityGate)} authority is required to unlock the next tier.`, "red");
					}
				}
				if (r.length > 0) {
					App.UI.DOM.appendNewElement("div", node, r.join(" "));
				}
			}
		}

		App.Events.addParagraph(node, []);
		const tabBar = new App.UI.Tabs.TabBar("SecExpSecurityHQ");
		tabBar.addTab("Security and crime", "SecurityCrime", SecurityCrime());
		tabBar.addTab("Reconnaissance and readiness", "ReconReadiness", ReconReadiness());
		node.append(tabBar.render());

		return node;

		function SecurityCrime() {
			const z = new DocumentFragment();
			App.UI.DOM.appendNewElement("h2", z, `Security`);
			if (V.SecExp.buildings.secHub.upgrades.security.nanoCams === 0) {
				z.append(
					makeLink("Install a nano-camera system",
						5000,
						"Will raise rest point of security by 10 points, but will require 5 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
						"nanoCams")
				);
			} else {
				z.append("You have installed all across the arcology closed circuit nano-cameras to keep the arcology under your watchful eye.");
			}

			if (V.SecExp.buildings.secHub.upgrades.security.cyberBots === 0) {
				App.UI.DOM.appendNewElement("div", z,
					makeLink("Buy cybersecurity algorithms",
						7500,
						"Will raise rest point of security by 10 points, but will require 5 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
						"cyberBots")
				);
			} else {
				App.UI.DOM.appendNewElement("div", z, "You have bought advanced cybersecurity algorithms that will defend your arcology against hack attempts or cyber frauds.");
			}

			if (V.SecExp.core.authority > 10000) {
				if (V.SecExp.buildings.secHub.upgrades.security.eyeScan === 0) {
					App.UI.DOM.appendNewElement("div", z,
						makeLink("Install invisible eye scanners",
							10000,
							"Will raise rest point of security by 15 points, but will require 10 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
							"eyeScan")
					);
				} else {
					App.UI.DOM.appendNewElement("div", z, "You have installed numerous hidden eye scanners that accurately register the movements of everyone inside the arcology.");
				}

				if (V.SecExp.buildings.secHub.upgrades.security.cryptoAnalyzer === 0) {
					App.UI.DOM.appendNewElement("div", z,
						makeLink("Buy and install crypto analyzers",
							15000,
							"Will raise rest point of security by 15 points, but will require 10 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
							"cryptoAnalyzer")
					);
				} else {
					App.UI.DOM.appendNewElement("div", z, "You have bought and employed sophisticated crypto analyzing software to accurately track and archive every financial movement or transaction made inside the walls of your arcology.");
				}
			}

			App.UI.DOM.appendNewElement("h2", z, `Crime`);
			if (V.SecExp.buildings.secHub.upgrades.crime.advForensic === 0) {
				App.UI.DOM.appendNewElement("div", z,
					makeLink("Install advanced forensic equipment",
						5000,
						"Will bring down the crime level cap by 10 points, but will require 10 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
						"advForensic")
				);
			} else {
				App.UI.DOM.appendNewElement("div", z, "You have installed advanced forensic equipment, able to extract every bit of precious information from any clue.");
			}
			if (V.SecExp.buildings.secHub.upgrades.crime.autoArchive === 0) {
				App.UI.DOM.appendNewElement("div", z,
					makeLink("Install auto-curating archiver",
						7500,
						"Will bring down the crime level cap by 10 points, but will require 5 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
						"autoArchive")
				);
			} else {
				App.UI.DOM.appendNewElement("div", z, "You have installed auto-curating archiver software, which will update in real time your data archives with any new relevant information on criminals residing in your arcology.");
			}

			if (V.SecExp.core.authority > 10000) {
				if (V.SecExp.buildings.secHub.upgrades.crime.autoTrial === 0) {
					App.UI.DOM.appendNewElement("div", z,
						makeLink("Install automated trials software",
							10000,
							"Will bring down the crime level cap by 15 points, but will require 5 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
							"autoTrial")
					);
				} else {
					App.UI.DOM.appendNewElement("div", z, "You have installed advanced legal algorithms that allows the handling of legal matters much quicker and much more accurately.");
				}

				if (V.SecExp.buildings.secHub.upgrades.crime.worldProfiler === 0) {
					App.UI.DOM.appendNewElement("div", z,
						makeLink("Install worldwide profilers",
							15000,
							"Will bring down the crime level cap by 15 points, but will require 10 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
							"worldProfiler")
					);
				} else {
					App.UI.DOM.appendNewElement("div", z, "You have installed advanced profiler software, which will constantly scour every known data archive on the globe (legally or not) to gather as much information as possible on dangerous criminals.");
				}
			}
			return z;
		}
		function ReconReadiness() {
			const z = new DocumentFragment();
			App.UI.DOM.appendNewElement("h2", z, `Reconnaissance`);
			if (V.SecExp.buildings.secHub.upgrades.intel.sensors === 0) {
				App.UI.DOM.appendNewElement("div", z,
					makeLink("Install perimeter sensors",
						5000,
						"Will increase recon capabilities, but will require 5 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
						"sensors")
				);
			} else {
				App.UI.DOM.appendNewElement("div", z, "You have installed perimeter seismic sensors able to detect movement with high accuracy.");
			}
			if (V.SecExp.buildings.secHub.upgrades.intel.signalIntercept === 0) {
				App.UI.DOM.appendNewElement("div", z,
					makeLink("Create signal interception hub",
						10000,
						"Will increase recon capabilities, but will require 5 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
						"signalIntercept")
				);
			} else {
				App.UI.DOM.appendNewElement("div", z, "You have installed advanced signal interception equipment.");
			}

			if (V.SecExp.core.authority > 10000) {
				if (V.SecExp.buildings.secHub.upgrades.intel.radar === 0) {
					App.UI.DOM.appendNewElement("div", z,
						makeLink("Install advanced radar equipment",
							15000,
							"Will increase recon capabilities, but will require 10 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
							"radar")
					);
				} else {
					App.UI.DOM.appendNewElement("div", z, "You have installed sophisticated radar equipment.");
				}
			}

			App.UI.DOM.appendNewElement("h2", z, `Readiness`);
			App.UI.DOM.appendNewElement("div", z,  `You can deploy a maximum of ${App.Mods.SecExp.battle.deploySpeed()} units, and you have ${App.Mods.SecExp.battle.activeUnits()} active units right now.`);
			if (V.SecExp.buildings.secHub.upgrades.readiness.pathways === 0) {
				App.UI.DOM.appendNewElement("div", z,
					makeLink("Build specialized pathways in the arcology",
						5000,
						"Will increase readiness by 1, but will require 5 extra slaves in the headquarters and increase upkeep. The remaining slaves will be more efficient in dealing with crime.",
						"pathways")
				);
			} else {
				App.UI.DOM.appendNewElement("div", z, "You have built specialized pathways inside the arcology to quickly move troops around the structure.");
			}
			if (V.SecExp.buildings.secHub.upgrades.readiness.rapidVehicles === 0) {
				App.UI.DOM.appendNewElement("div", z,
					makeLink("Buy rapid armored transport vehicles",
						7500,
						"Will increase readiness by 2, but will require 5 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
						"rapidVehicles")
				);
			} else {
				App.UI.DOM.appendNewElement("div", z, "You have bought rapid armored transport vehicles able to bring your troops to battle much quicker than before.");
			}

			if (V.SecExp.core.authority > 10000) {
				if (V.SecExp.buildings.secHub.upgrades.readiness.rapidPlatforms === 0) {
					App.UI.DOM.appendNewElement("div", z,
						makeLink("Build rapid deployment platforms",
							10000,
							"Will increase readiness by 2, but will require 10 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
							"rapidPlatforms",
							false)
					);
				} else {
					App.UI.DOM.appendNewElement("div", z, "You have built rapid deployment platforms able to equip and deploy units within very limited time windows.");
				}
				if (V.SecExp.buildings.secHub.upgrades.readiness.earlyWarn === 0) {
					App.UI.DOM.appendNewElement("div", z,
						makeLink("Institute early warning systems",
							15000,
							"Will increase readiness by 2, but will require 10 extra slaves in the headquarters and increases upkeep. The remaining slaves will be more efficient in dealing with crime.",
							"earlyWarn",
							false)
					);
				} else {
					App.UI.DOM.appendNewElement("div", z, "You have created early warning systems that constantly analyze in real time data to determine the likeness of an attack.");
				}
			}

			return z;
		}
		function situationAnalysis(state) {
			const isSecurity = state === "security";
			const variable = isSecurity ? "security" : "crimeLow";
			const colour = isSecurity ? "deepskyblue" : "orangered";
			let text = [];

			const r = new DocumentFragment();
			r.append(`Your ${state} level (`, App.UI.DOM.makeElement("span", `${V.SecExp.core[variable]}`, colour), `)`);
			text.push(" ");
			if (V.SecExp.core[variable] <= 20) {
				text.push(`is ${isSecurity ? "dangerously" : "very"} low.`);
			} else if (V.SecExp.core[variable] <= 40) {
				text.push("is low.");
			} else if (V.SecExp.core[variable] <= 60) {
				text.push(`is ${isSecurity ? "decent" : "average"}.`);
			} else if (V.SecExp.core[variable] <= 80) {
				text.push(`is ${isSecurity ? "good" : "high"}.`);
			} else {
				text.push(`is ${isSecurity ? "great" : "extremely high"}.`);
			}
			text.push("Considering the current upgrades the");
			if (isSecurity) {
				text.push(`resting level for security is ${Math.trunc(App.Mods.SecExp.Check.secRestPoint() * (Math.clamp(V.SecExp.buildings.secHub.menials, 0, App.Mods.SecExp.Check.reqMenials()) / App.Mods.SecExp.Check.reqMenials()))}, `);
				text.push(`while the effective maximum level is ${Math.trunc(App.Mods.SecExp.Check.reqMenials() * (Math.clamp(V.SecExp.buildings.secHub.menials, 0, App.Mods.SecExp.Check.reqMenials()) / App.Mods.SecExp.Check.reqMenials()))}.`);
			} else {
				text.push(`maximum level of crime is ${App.Mods.SecExp.Check.crimeCap()}, `);
				text.push(`while the effective maximum level is ${Math.trunc(Math.clamp(App.Mods.SecExp.Check.crimeCap() + (App.Mods.SecExp.Check.crimeCap() - App.Mods.SecExp.Check.crimeCap() * (V.SecExp.buildings.secHub.menials / App.Mods.SecExp.Check.reqMenials())), 0, 100))}.`);
			}
			r.append(text.join(" "));

			return r;
		}
		function checkStatus(value, authority) {
			return V.SecExp.buildings.secHub.coldstorage === value && V.SecExp.core.authority >= authority && App.Mods.SecExp.Check.reqMenials() > 10;
		}
		function makeLink(text, price, note, type, applyHacking=true) {
			const r = new DocumentFragment();
			r.append(App.UI.DOM.link(text,
				() => {
					cashX(-getCost(), "capEx");
					if (applyHacking) {
						V.PC.skill.hacking++;
					}
					switch (type) {
						case "coldstorage":
							V.SecExp.buildings.secHub.coldstorage++;
							break;
						case "nanoCams":
						case "cyberBots":
						case "eyeScan":
						case "cryptoAnalyzer":
							V.SecExp.buildings.secHub.upgrades.security[type] = 1;
							break;
						case "advForensic":
						case "autoArchive":
						case "autoTrial":
						case "worldProfiler":
							V.SecExp.buildings.secHub.upgrades.crime[type] = 1;
							break;
						case "sensors":
						case "signalIntercept":
						case "radar":
							V.SecExp.buildings.secHub.upgrades.intel[type] = 1;
							break;
						case "pathways":
						case "rapidVehicles":
						case "rapidPlatforms":
						case "earlyWarn":
							V.SecExp.buildings.secHub.upgrades.readiness[type] = 1;
							break;
					}
					App.UI.reload();
				},
			));
			r.append(App.UI.DOM.makeElement("div", `Costs ${cashFormat(getCost())}. ${note}`, "note"));
			return r;

			function getCost() {
				const HistoryDiscount = ["mercenary", "gang", "slaver"].includes(V.PC.career) ? 0.5 : 1;
				return Math.trunc(price * V.upgradeMultiplierArcology * HistoryDiscount * (applyHacking ? V.HackingSkillMultiplier : 1));
			}
		}
	}
})();
