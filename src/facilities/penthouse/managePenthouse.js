/**
 * UI for managing Penthouse Refreshes without refreshing the passage.
 */
App.UI.managePenthouse = function() {
	const container = document.createElement("span");
	container.append(createPage());
	return container;

	function createPage() {
		const el = new DocumentFragment();
		el.append(intro());
		el.append(capacity());
		el.append(major());
		el.append(minor());
		el.append(upgrades());
		el.append(blackMarket());
		return el;
	}

	function intro() {
		const el = new DocumentFragment();
		if (V.cheatMode === 1) {
			App.UI.DOM.appendNewElement("div", el,
				App.UI.DOM.passageLink("Cheat Edit Arcology", "MOD_Edit Arcology Cheat"),
				["cheat-menu"]);
		}
		App.UI.DOM.appendNewElement("h1", el, "Penthouse");
		App.UI.DOM.appendNewElement("div", el, App.Desc.officeDescription(V.PC.career === "mercenary" ? "You look back at the rifle. It could never hold a zero, and would fail to feed if it wasn't given just the right amount of lubricant. But sometimes, you'd give anything for one more mission with that shitty old rifle." : ""), "scene-intro");
		if (V.SF.Toggle && V.SF.Active >= 1) {
			App.UI.DOM.appendNewElement("div", el,
				App.UI.DOM.passageLink(
					`Take your express elevator down to ${V.SF.Lower}`,
					"Firebase"
				)
			);
		} else if (V.SF.FS.Tension > 100) {
			App.UI.DOM.appendNewElement("div", el, App.Mods.SF.fsIntegration.crisis()[0]);
		}
		return el;
	}

	function capacity() {
		const el = new DocumentFragment();
		let r = [];
		App.UI.DOM.appendNewElement("h2", el, "Penthouse Capacity");

		// Dorms
		const dormCost = Math.trunc(V.dormitory * 1000 * V.upgradeMultiplierArcology);
		r.push(`The main penthouse dormitory, which houses slaves who aren't living in a facility and aren't granted a luxurious standard of living, has a capacity of`);
		r.push(App.UI.DOM.makeElement("span", JSON.stringify(V.dormitory), ["bold"]));
		r.push(`slaves.`);
		r.push(
			makePurchase(`Expand the dormitory`, dormCost, "capEx", {
				handler: () => {
					V.dormitory += 10;
					V.PC.skill.engineering += .1;
				}
			})
		);
		r.push(App.UI.DOM.makeElement("div", `Exceeding this limit is bad for slaves' health, devotion and trust.`, ["detail", "indent"]));
		App.Events.addNode(el, r, "div");

		// Luxury rooms
		r = [];
		const luxuryCost = Math.trunc(V.rooms * 1000 * V.upgradeMultiplierArcology);
		r.push(`The penthouse also features little individual rooms, which house slaves who do enjoy a luxurious standard of living. They have a capacity of`);
		r.push(App.UI.DOM.makeElement("span", JSON.stringify(V.rooms), ["bold"]));
		r.push(`slaves.`);
		r.push(
			makePurchase(`Expand the rooms`, luxuryCost, "capEx", {
				handler: () => {
					V.rooms += 5;
					V.PC.skill.engineering += .1;
				}
			})
		);
		r.push(App.UI.DOM.makeElement("div", `The number of rooms determines the number of slaves that can be granted luxury.`, ["detail", "indent"]));
		App.Events.addNode(el, r, "div");
		return el;
	}

	function major() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", el, "Major Penthouse Facilities");

		if (V.masterSuite === 0) {
			App.UI.DOM.appendNewElement("div", el, makeLink("Improve your master bedroom to house a harem of personal toys", () => { V.masterSuite = 1; }));
		} else {
			App.UI.DOM.appendNewElement("div", el, `Your penthouse is capped by a master suite with room for an entire harem of personal toys.`);
		}

		if (V.servantsQuarters === 0) {
			App.UI.DOM.appendNewElement("div", el, makeLink("Build a dormitory to house large numbers of house servants", () => { V.servantsQuarters = 5; }));
		} else {
			App.UI.DOM.appendNewElement("div", el, `Your penthouse includes a dormitory to house large numbers of house servants.`);
		}

		if (V.schoolroom === 0) {
			App.UI.DOM.appendNewElement("div", el, makeLink("Build a schoolroom where slaves can be educated", () => { V.schoolroom = 5; }));
		} else {
			App.UI.DOM.appendNewElement("div", el, `Your penthouse includes a schoolroom where slaves can be educated.`);
		}

		if (V.spa === 0) {
			App.UI.DOM.appendNewElement("div", el, makeLink("Install open baths to provide relaxation space for resting slaves", () => { V.spa = 5; }));
		} else {
			App.UI.DOM.appendNewElement("div", el, `The penthouse includes a fully appointed spa where slaves can rest and recuperate.`);
		}

		if (V.seePreg !== 0) {
			if (V.experimental.nursery === 1) {
				if (V.nursery === 0) {
					App.UI.DOM.appendNewElement("div", el, makeLink("Build a nursery to raise children from birth", () => {
						V.nursery = 1;
						V.nurseryCribs = 5;
					}));
				} else {
					App.UI.DOM.appendNewElement("div", el, `The penthouse has a nursery built where infants can be brought up.`);
				}
			}
		}

		if (V.clinic === 0) {
			App.UI.DOM.appendNewElement("div", el, makeLink("Expand the surgical recovery area to accommodate patients and a nurse", () => { V.clinic = 5; }));
		} else {
			App.UI.DOM.appendNewElement("div", el, `The surgical recovery area has been expanded to take in more unhealthy slaves and be staffed by a nurse.`);
		}

		if (V.cellblock === 0) {
			App.UI.DOM.appendNewElement("div", el, makeLink("Construct cells to properly confine disobedient slaves", () => { V.cellblock = 5; }));
		} else {
			App.UI.DOM.appendNewElement("div", el, `The lower level of the penthouse includes a hallway of cells to confine slaves in.`);
		}

		if (V.seePreg !== 0) {
			if (V.arcologyUpgrade.grid === 1) {
				if (V.incubator.capacity === 0) {
					App.UI.DOM.appendNewElement("div", el, makeLink("Install an incubation chamber to rapidly age children", () => {
						App.Facilities.Incubator.init('full');
					}));
				} else {
					App.UI.DOM.appendNewElement("div", el, `The penthouse has a specialized facility dedicated to rapidly aging children.`);
				}
			} else {
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.makeElement("span", "Installation of a child aging facility will require the arcology's electrical infrastructure to be overhauled.", ["note"]));
			}
		}

		return el;
	}

	function minor() {
		const el = new DocumentFragment();
		let r = [];
		App.UI.DOM.appendNewElement("h2", el, "Minor Penthouse Facilities");

		if (V.HGSuite !== 1) {
			r.push(makeLink("Build a small suite for a Head Girl to live in", () => { V.HGSuite = 1; }));
		} else {
			r.push(`There is a small but handsome suite next to yours reserved for the Head Girl.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.dojo === 0) {
			r.push(makeLink("Set up a personal armory to support a bodyguard", () => { V.dojo = 1; }));
		} else if (V.dojo === 1) {
			r.push(`There is a small armory next to your office that can support a bodyguard.`);
			r.push(makeLink("Upgrade the armory with a private room for the bodyguard", () => { V.dojo = 2; }));
		} else {
			r.push(`There is a small armory next to your office that can support a bodyguard, with a little room for them to rest in when off duty.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (!V.toyShop) {
			r.push(makeLink("Install a workshop for making custom toys", () => { V.toyShop = true; }));
		} else {
			r.push(`There is a`);
			r.push(App.UI.DOM.passageLink("workshop", "Toy Shop"));
			r.push(`for making custom toys.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.surgeryUpgrade === 0) {
			if (V.rep > 10000) {
				r.push(makeLink("Upgrade the remote surgery", () => { V.surgeryUpgrade = 1; }, 50000));
			} else {
				r.push(App.UI.DOM.makeElement("span", "You lack the reputation to secure rare surgery upgrades.", ["note"]));
			}
		} else {
			r.push(`Your remote surgery has been heavily upgraded and customized.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.dispensary === 0) {
			if (V.rep > 2000) {
				r.push(makeLink("Install a pharmaceutical fabricator", () => {
					V.dispensary = 1;
					V.drugsCost = V.drugsCost * .75;
				}, 20000));
			} else {
				r.push(App.UI.DOM.makeElement("span", "You lack the reputation to obtain cutting-edge pharmaceutical technology.", ["note"]));
			}
		} else {
			r.push(`There is a`);
			r.push(App.UI.DOM.passageLink("pharmaceutical fabricator", "Dispensary"));
			r.push(`attached to the surgery.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.ImplantProductionUpgrade === 0) {
			if (V.rep > 2000) {
				r.push(makeLink("Install an implant manufactory", () => { V.ImplantProductionUpgrade = 1; }, 20000));
			} else {
				r.push(App.UI.DOM.makeElement("span", "You lack the reputation to obtain cutting-edge implant fabrication technology.", ["note"]));
			}
		} else {
			r.push(`There is a`);
			r.push(App.UI.DOM.passageLink("implant manufactory", "Implant Manufactory"));
			r.push(`attached to the surgery.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.organFarmUpgrade === 0) {
			if (V.rep > 10000) {
				r.push(makeLink("Install an experimental organ farm", () => { V.organFarmUpgrade = 1; }, 70000));
			} else {
				r.push(App.UI.DOM.makeElement("span", "You lack the reputation to obtain an experimental organ fabricator.", ["note"]));
			}
		} else {
			r.push(`There is a`);
			r.push(App.UI.DOM.passageLink("organ farm", "Organ Farm"));
			r.push(`attached to the surgery.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.geneticMappingUpgrade >= 2) {
			r.push(`There is a`);
			r.push(App.UI.DOM.passageLink("genetic sequencer", "Gene Lab"));
			r.push(`attached to the surgery.`);
		} else if (V.geneticMappingUpgrade >= 0) {
			if (V.rep > 14000) {
				r.push(makeLink("Install a cutting-edge genetic sequencer", () => { V.geneticMappingUpgrade = 2; }, 120000));
			} else {
				r.push(App.UI.DOM.makeElement("span", "You lack the reputation to purchase a cutting-edge genetic sequencer.", ["note"]));
			}
		}
		if (V.geneticMappingUpgrade === 1) {
			r.push(`There is an aged genetic sequencer, no doubt liberated from some old-world lab, residing in the surgery.`);
		} else if (V.geneticMappingUpgrade === 0) {
			if (V.rep > 5000) {
				r.push(makeLink("Acquire a basic genetic sequencer", () => { V.geneticMappingUpgrade = 1; }, 30000));
			} else {
				r.push(App.UI.DOM.makeElement("span", "You lack the reputation to purchase a cheap genetic sequencer.", ["note"]));
			}
		}
		App.Events.addNode(el, r, "div");

		r = [];
		switch (V.prostheticsUpgrade) {
			case 0:
				if (V.rep > 8000) {
					r.push(makeLink("Install basic equipment for attaching and maintenance of prosthetics", () => { V.prostheticsUpgrade = 1; }, 120000));
				} else {
					r.push(App.UI.DOM.makeElement("span", "You lack the reputation to buy basic equipment for attaching and maintenance of prosthetics.", ["note"]));
				}
				break;
			case 1:
				r.push(`You have basic equipment for attaching and maintenance of prosthetics.`);
				if (V.rep > 12000) {
					r.push(makeLink("Buy a contract for advanced prosthetics", () => { V.prostheticsUpgrade = 2; }, 100000));
				} else {
					r.push(App.UI.DOM.makeElement("span", "You lack the reputation to get a contract for advanced prosthetics.", ["note"]));
				}
				break;
			case 2:
				r.push(`You have basic equipment for attaching and maintenance of prosthetics and a contract to guarantee the availability of advanced prosthetics.`);
				if (V.rep > 16000) {
					r.push(makeLink("Buy a contract for high-tech prosthetics", () => { V.prostheticsUpgrade = 3; }, 100000));
				} else {
					r.push(App.UI.DOM.makeElement("span", "You lack the reputation to get a contract for high-tech prosthetics.", ["note"]));
				}
				break;
			case 3:
				r.push(`You have advanced equipment for attaching and maintenance of prosthetics and a contract to guarantee the availability of high-tech prosthetics.`);
				if (V.rep > 18000) {
					r.push(makeLink("Buy a contract for quadruped prosthetics", () => { V.prostheticsUpgrade = 4; }, 100000));
				} else {
					r.push(App.UI.DOM.makeElement("span", "You lack the reputation to get a contract for quadruped prosthetics.", ["note"]));
				}
				break;
			case 4:
				r.push(`You have advanced equipment for attaching and maintenance of prosthetics and a contract to guarantee the availability of quadruped prosthetics.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.prostheticsUpgrade > 0) {
			if (V.researchLab.level > 0) {
				r.push(`Your penthouse is equipped with an advanced prosthetic lab.`);
			} else {
				r.push(makeLink("Clear out one of the floors and install equipment to construct prosthetics yourself", () => {
					V.researchLab.level = 1;
					V.researchLab.maxSpace = 5;
				}, 150000));
				r.push(App.UI.DOM.makeElement("div", `Buying the equipment to construct prosthetics yourself is expensive but if you plan to construct many prosthetics it will pay out in the long run.`, "indent"));
			}
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.seePreg === 1) {
			if (V.pregnancyMonitoringUpgrade === 0) {
				if (V.rep > 10000) {
					r.push(makeLink("Upgrade the pregnancy monitoring systems", () => { V.pregnancyMonitoringUpgrade = 1; }, 30000));
				} else {
					r.push(App.UI.DOM.makeElement("span", "You lack the reputation to purchase improved pregnancy monitoring systems.", ["note"]));
				}
			} else {
				r.push(`Your pregnancy monitoring systems have been heavily upgraded.`);
			}
		}
		App.Events.addNode(el, r, "div");

		return el;
	}

	function upgrades() {
		const el = new DocumentFragment();
		let r = [];
		App.UI.DOM.appendNewElement("h2", el, "Penthouse Upgrades");

		if (V.servantMilkers !== 1) {
			r.push("Your penthouse is equipped with basic milkers for lactating slaves.");
			r.push(makeLink("Install more and tie them into the liquid systems", () => { V.servantMilkers = 1; }, 25000));
		} else {
			r.push(`Every room in the penthouse is equipped with milkers tied into the liquid systems, letting slaves with full udders drain them anywhere.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.boobAccessibility !== 1) {
			if (V.pregAccessibility === 1 || V.ballsAccessibility || V.buttAccessibility) {
				r.push(`Your penthouse has already been widened for overly wide slaves but there are no special accommodations for slaves with enormous breasts.`);
				r.push(makeLink("Remodel for accessibility", () => { V.boobAccessibility = 1; }, 20000));
			} else {
				r.push(`Your penthouse has no special accessibility provisions for slaves with enormous breasts.`);
				r.push(makeLink("Remodel for accessibility", () => { V.boobAccessibility = 1; }, 50000));
			}
		} else {
			r.push(`The entire penthouse has been remodeled to make life with enormous breasts easier. The doorways have been widened, and tables, sinks, and other items now have two levels: one at shoulder height for slaves to use, and another at waist height for them to rest their tits on while they do.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.seeHyperPreg === 1) {
			if (V.pregAccessibility !== 1) {
				if (V.boobAccessibility === 1 || V.ballsAccessibility || V.buttAccessibility) {
					r.push(`Your penthouse has already been widened to make life for overly wide slaves easier but there are no special accommodations for slaves with enormous pregnancies.`);
					r.push(makeLink("Remodel for accessibility", () => { V.pregAccessibility = 1; }, 20000));
				} else {
					r.push(`Your penthouse has no special accessibility provisions for slaves with enormous pregnancies.`);
					r.push(makeLink("Remodel for accessibility", () => { V.pregAccessibility = 1; }, 50000));
				}
			} else {
				r.push(`The entire penthouse has been remodeled to make life with enormous pregnancies easier. The doorways have been widened, and tables, sinks, and other items are now designed to work around a massively distended belly.`);
			}
		}
		App.Events.addNode(el, r, "div");

		if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
			r = [];
			if (V.dickAccessibility !== 1) {
				r.push(`Your penthouse has no special accessibility provisions for slaves with enormous dicks.`);
				r.push(makeLink("Remodel for accessibility", () => { V.dickAccessibility = 1; }, 20000));
			} else {
				r.push(`The entire penthouse has been remodeled to make life with enormous dicks easier. Carts, slings and harnesses are available to keep things from dragging and there is now plenty of room for huge genitals to occupy when a slave must use appliances, tables and seats.`);
			}
			App.Events.addNode(el, r, "div");

			r = [];
			if (V.ballsAccessibility !== 1) {
				if (V.boobAccessibility === 1 || V.buttAccessibility || V.pregAccessibility) {
					r.push(`Your penthouse has already been widened to make life for overly wide slaves easier but there are no special accommodations for slaves with enormous testicles.`);
					r.push(makeLink("Remodel for accessibility", () => { V.ballsAccessibility = 1; }, 20000));
				} else {
					r.push(`Your penthouse has no special accessibility provisions for slaves with enormous testicles.`);
					r.push(makeLink("Remodel for accessibility", () => { V.ballsAccessibility = 1; }, 50000));
				}
			} else {
				r.push(`The entire penthouse has been remodeled to make life with enormous testicles easier. The doorways have been widened, tables, sinks, and other items are now designed to fit over giant balls, drains have been widened to allow excessive cum to flow easier, and seats have been specially altered to allow plenty of ball room for seated slaves.`);
			}
			App.Events.addNode(el, r, "div");

			r = [];
			if (V.buttAccessibility !== 1) {
				if (V.boobAccessibility === 1 || V.dickAccessibility || V.ballsAccessibility) {
					r.push(`Your penthouse has already been widened to make life for overly wide slaves easier but there are no special accommodations for slaves with gigantic posteriors.`);
					r.push(makeLink("Remodel for accessibility", () => { V.buttAccessibility = 1; }, 20000));
				} else {
					r.push(`Your penthouse has no special accessibility provisions for slaves with enormous posteriors.`);
					r.push(makeLink("Remodel for accessibility", () => { V.buttAccessibility = 1; }, 50000));
				}
			} else {
				r.push(`The entire penthouse has been remodeled to make life with enormous rears easier. The doorways have been widened, and anything that can be sat on is now extra, extra wide and reinforced to allow even the heaviest, biggest asses to comfortably rest upon it.`);
			}
			App.Events.addNode(el, r, "div");
		}

		r = [];
		if (V.boobAccessibility > 0 || V.pregAccessibility > 0 || V.dickAccessibility > 0 || V.ballsAccessibility > 0 || V.buttAccessibility > 0) {
			const removeCost = Math.trunc((5000 * (V.boobAccessibility + V.pregAccessibility + V.dickAccessibility + V.ballsAccessibility + V.buttAccessibility)) * V.upgradeMultiplierArcology);
			el.append(makePurchase(`Remove the accessibility renovations`, removeCost, "capEx", {
				handler: () => {
					V.boobAccessibility = 0;
					V.pregAccessibility = 0;
					V.dickAccessibility = 0;
					V.ballsAccessibility = 0;
					V.buttAccessibility = 0;
				}
			}));
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.feeder === 0) {
			r.push(makeLink("Upgrade the kitchen's nutritional sensing systems", () => { V.feeder = 1; }));
		} else {
			r.push(`The kitchen mounts sensors to refine diets in real time.`);
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.cockFeeder === 0) {
			r.push(makeLink("Enhance the feeding system with faux phalli", () => { V.cockFeeder = 1; }));
		} else {
			r.push(`The kitchen dispenses food from phalli slaves must suck off in order to eat.`);
			r.push(makeLink("Remove them", () => { V.cockFeeder = 0; }, 0));
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.suppository === 0) {
			r.push(makeLink("Replace the drug dispensers with reciprocating dildo suppositories", () => { V.suppository = 1; }));
		} else {
			r.push(`The kitchen applies drugs that can be absorbed rectally by assfucking slaves with dildos that cum the pharmaceuticals.`);
			r.push(makeLink("Remove them", () => { V.suppository = 0; }, 0));
		}
		App.Events.addNode(el, r, "div");

		r = [];
		if (V.dairy !== 0) {
			if (V.dairyPiping === 0) {
				r.push(makeLink("Install pipes connecting the Dairy to the rest of your penthouse for use in enema play", () => { V.dairyPiping = 1; }));
			} else {
				r.push(`Various taps around the penthouse supply product from ${V.dairyName} for use in enema play and force-feeding.`);
			}
		} else if (V.dairyPiping === 1) {
			r.push(`Various taps around the penthouse supply product from ${V.dairyName} for use in enema play and force-feeding. With no dairy to draw from, they are currently unused.`);
		}
		App.Events.addNode(el, r, "div");

		if (V.seePee === 1) {
			r = [];
			if (V.wcPiping === 0) {
				r.push(makeLink("Install pipes connecting the slave bathrooms to the rest of your penthouse for use in watersports", () => { V.wcPiping = 1; }, 10000));
			} else {
				r.push(`The plumbing underneath the slave bathrooms connects to various taps throughout the penthouse that can dispense its contents when needed.`);
			}
			App.Events.addNode(el, r, "div");
		}

		r = [];
		if (V.studio === 0) {
			r.push(makeLink("Install a media hub to convert slave video feeds into pornography", () => { V.studio = 1; }, 10000));
		} else {
			r.push(`The arcology's video systems are connected to a`, App.UI.DOM.passageLink("media hub", "Media Studio"), `that can convert slave video feeds into pornography.`);
		}
		App.Events.addNode(el, r, "div");

		return el;
	}

	function blackMarket() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", el, "Black Market");
		const rep = 10000;

		App.UI.DOM.appendNewElement(
			"div",
			el,
			(V.rep >= rep)
				? App.UI.DOM.passageLink("Visit the market", "The Black Market")
				: `You lack the ${num(rep)} reputation to be invited to the underground Black Market.`
		);
		return el;
	}

	/**
	 * Creates a new link to purchase a facility.
	 *
	 * @param {string} title
	 * @param {function(void):void} handler
	 * @param {number} [cost]
	 * @returns {DocumentFragment}
	 */
	function makeLink(title, handler, cost = 5000) {
		const el = new DocumentFragment();
		cost = Math.trunc(cost * V.upgradeMultiplierArcology);
		el.append(makePurchase(title, cost, "capEx", {
			handler: () => {
				handler();

				V.PC.skill.engineering += .1;
				jQuery(container).empty().append(createPage());
			}
		}));

		return el;
	}
};
