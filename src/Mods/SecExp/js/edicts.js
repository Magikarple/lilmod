App.Mods.SecExp.edicts = function() {
	function genMenu(name, detail) {
		const t = new DocumentFragment();
		if (detail.implement.find(s => s.conditional) || detail.repeal && detail.repeal.find(s => s.conditional)) {
			App.UI.DOM.appendNewElement("span", t, `${name}: `, detail.tag || "bold");
			for (let i = 0; i < detail.implement.length; i++) {
				let current;
				if (detail.implement[i].conditional) {
					current = detail.implement[i];
				} else if (detail.repeal) {
					current = detail.repeal[i];
				}
				if (current) {
					if (current.text) {
						if (detail.implement.filter(s => s.conditional).length > 1) {
							App.UI.DOM.appendNewElement("div", t);
						}
						t.append(`${capFirstChar(current.text)} `);
					}
					if (V.SecExp.core.authority >= 1000 && current.set) {
						t.append(App.UI.DOM.makeElement("span",
							App.UI.DOM.link(`${detail.implement[i].conditional ? "Implement" : "Repeal"}`,
								() => {
									if (detail.implement[i].conditional) {
										cashX(-5000, "edicts");
										App.Mods.SecExp.authorityX(-1000);
									}
									current.set();
									App.UI.reload();
								},
							)
							, (detail.implement[i].conditional ? "green" : "yellow")
						));
						App.UI.DOM.appendNewElement("div", t);
						if (detail.implement[i].conditional && detail.implement[i].note) {
							App.UI.DOM.appendNewElement("div", t, `${detail.implement[i].note}`, ["note", "indent"]);
						}
					}
				}
			}
		}
		return t;
	}

	function Society() {
		const weaponsStatus = function() {
			switch (V.SecExp.edicts.weaponsLaw) {
				case 3: return "There are no restrictions on weapons";
				case 2: return "Non-heavy, non-explosive weapons are legal";
				case 1: return "Non-automatic, non-high caliber weapons are legal";
				case 0: return "Residents are unable to buy, sell and keep weapons";
			}
		};
		const data = new Map([
			["Alternative rent payment", {
				repeal: [
					{
						text: "you are allowing citizens to pay for their rents in menial slaves rather than cash.",
						conditional: V.SecExp.edicts.alternativeRents === 1,
						set: function() {
							V.SecExp.edicts.alternativeRents = 0;
						},
					}
				],
				implement: [
					{
						text: "allow citizens to pay for their rents in menial slaves rather than cash, if so they wish.",
						conditional: V.SecExp.edicts.alternativeRents === 0,
						set: function() {
							V.SecExp.edicts.alternativeRents = 1;
						},
						note: "Will decrease rents, but will supply a small amount of menial slaves each week."
					}
				]
			}],
			["Enslavement rights", {
				repeal: [
					{
						text: "you are the only authority able to declare a person enslaved or not.",
						conditional: V.SecExp.edicts.enslavementRights === 1,
						set: function() {
							V.SecExp.edicts.enslavementRights = 0;
						},
					}
				],
				implement: [
					{
						text: "the arcology owner will be the only authority able to declare a person enslaved or not.",
						conditional: V.SecExp.edicts.enslavementRights === 0,
						set: function() {
							V.SecExp.edicts.enslavementRights = 1;
						},
						note: "Will provide cash each week at the cost of a small authority hit. The higher the flux of citizens to slaves the higher the income."
					}
				]
			}],
			["Private Data marketization", {
				repeal: [
					{
						text: "you are selling private citizens' data to the best bidder.",
						conditional: V.SecExp.buildings.secHub && V.SecExp.edicts.sellData === 1,
						set: function() {
							V.SecExp.edicts.sellData = 0;
						},
					}
				],
				implement: [
					{
						text: "allow the selling of private citizens' data.",
						conditional: V.SecExp.buildings.secHub && V.SecExp.edicts.sellData === 0 && (Object.values(V.SecExp.buildings.secHub.upgrades.security).reduce((a, b) => a + b) > 0 || Object.values(V.SecExp.buildings.secHub.upgrades.crime).reduce((a, b) => a + b) > 0 || Object.values(V.SecExp.buildings.secHub.upgrades.intel).reduce((a, b) => a + b) > 0),
						set: function() {
							V.SecExp.edicts.sellData = 1;
						},
						note: "Will generate income dependent on the amount of upgrades installed in the security HQ, but cost a small amount of authority each week."
					}
				]
			}],
			["Propaganda Campaign Boost", {
				repeal: [
					{
						text: "you are forcing residents to read curated educational material about the arcology.",
						conditional: V.SecExp.buildings.propHub && V.SecExp.edicts.propCampaignBoost === 1,
						set: function() {
							V.SecExp.edicts.propCampaignBoost = 0;
						},
					}
				],
				implement: [
					{
						text: "force residents to read curated educational material about the arcology.",
						conditional: V.SecExp.buildings.propHub && V.SecExp.edicts.propCampaignBoost === 0,
						set: function() {
							V.SecExp.edicts.propCampaignBoost = 1;
						},
						note: "Will increase the effectiveness of propaganda campaigns, but will incur upkeep costs."
					}
				]
			}],
			["Legal aid for new businesses", {
				repeal: [
					{
						text: "new businesses can rely on your help for legal expenses and issues.",
						conditional: V.SecExp.buildings.transportHub && V.SecExp.edicts.tradeLegalAid === 1,
						set: function() {
							V.SecExp.edicts.tradeLegalAid = 0;
						},
					}
				],
				implement: [
					{
						text: "support new businesses in the arcology by helping them cover legal costs and issues.",
						conditional: V.SecExp.buildings.transportHub && V.SecExp.edicts.tradeLegalAid === 0,
						set: function() {
							V.SecExp.edicts.tradeLegalAid = 1;
						},
						note: "Will increase trade, but will incur upkeep costs."
					}
				]
			}],
			["Trade tariffs", {
				repeal: [
					{
						text: "all goods transitioning in your arcology have to pay a transition fee.",
						conditional: V.SecExp.buildings.transportHub && V.SecExp.edicts.taxTrade === 1,
						set: function() {
							V.SecExp.edicts.taxTrade = 0;
						},
					}
				],
				implement: [
					{
						text: "all goods transitioning in your arcology will have to pay a transition fee.",
						conditional: V.SecExp.buildings.transportHub && V.SecExp.edicts.taxTrade === 0,
						set: function() {
							V.SecExp.edicts.taxTrade = 1;
						},
						note: "Will provide income based on trade level, but will negatively affect trade."
					}
				]
			}],
			["Slave mistreatment watch", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "slaves are able access a special security service in case of mistreatment.",
						conditional: FutureSocieties.isActive('FSPaternalist') && V.SecExp.edicts.slaveWatch === 1,
						set: function() {
							V.SecExp.edicts.slaveWatch = 0;
						},
					}
				],
				implement: [
					{
						text: "slaves will be able access a special security service in case of mistreatment.",
						conditional: FutureSocieties.isActive('FSPaternalist') && V.SecExp.edicts.slaveWatch === 0,
						set: function() {
							V.SecExp.edicts.slaveWatch = 1;
						},
						note: "Will help advance paternalism, but will incur upkeep costs."
					}
				]
			}],
			["Religious activities subsidy", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "you are providing economic support to religious activities following the official dogma.",
						conditional: V.arcologies[0].FSChattelReligionist >= 40 && V.SecExp.edicts.subsidyChurch === 1,
						set: function() {
							V.SecExp.edicts.subsidyChurch = 0;
						},
					}
				],
				implement: [
					{
						text: "will provide economic support to religious activities following the official dogma.",
						conditional: V.arcologies[0].FSChattelReligionist >= 40 && V.SecExp.edicts.subsidyChurch === 0,
						set: function() {
							V.SecExp.edicts.subsidyChurch = 1;
						},
						note: "Will provide authority each week, but will incur upkeep costs."
					}
				]
			}],
			["Immigration limits", {
				repeal: [
					{
						text: "you put strict limits to the amount of people the arcology can accept each week.",
						conditional: V.SecExp.edicts.limitImmigration === 1,
						set: function() {
							V.SecExp.edicts.limitImmigration = 0;
						},
					}
				],
				implement: [
					{
						text: "institute limits to the amount of people the arcology will accept each week.",
						conditional: V.SecExp.edicts.limitImmigration === 0,
						set: function() {
							V.SecExp.edicts.openBorders = 0;
							V.SecExp.edicts.limitImmigration = 1;
						},
						note: "Will lower the amount of people immigrating into the arcology and enhance security."
					}
				]
			}],
			["Open borders", {
				repeal: [
					{
						text: "you have lowered considerably the requirements to become citizens.",
						conditional: V.SecExp.edicts.openBorders === 1,
						set: function() {
							V.SecExp.edicts.openBorders = 0;
						},
					}
				],
				implement: [
					{
						text: "considerably lower requirements to become citizens.",
						conditional: V.SecExp.edicts.openBorders === 0,
						set: function() {
							V.SecExp.edicts.openBorders = 1;
							V.SecExp.edicts.limitImmigration = 0;
						},
						note: "Will increase immigration to the arcology, but will increase crime."
					}
				]
			}],

			[`Weapons Law; ${weaponsStatus()}`, {
				implement: [
					{
						text: "set the range of weapons allowed within the arcology to non-heavy, non-explosive.",
						conditional: V.SecExp.edicts.weaponsLaw === 3,
						set: function() {
							V.SecExp.edicts.weaponsLaw = 2;
						},
						note: "Will slightly increase prosperity, but will cost a small amount of authority each week and will leave rebellions decently armed."
					},
					{
						text: "allow residents of the arcology to buy, sell and keep weaponry of any kind within the arcology.",
						conditional: V.SecExp.edicts.weaponsLaw === 2,
						set: function() {
							V.SecExp.edicts.weaponsLaw = 3;
						},
						note: "Will slightly increase prosperity and provide a small weekly amount of reputation, but rebellions will be very well armed."
					},
					{
						text: "set the range of weapons allowed within the arcology to non-automatic, non-high caliber.",
						conditional: V.SecExp.edicts.weaponsLaw === 2,
						set: function() {
							V.SecExp.edicts.weaponsLaw = 1;
						},
						note: "Will cost some authority each week, but rebellions will be poorly armed."
					},
					{
						text: "set the range of weapons allowed within the arcology to non-heavy, non-explosive.",
						conditional: V.SecExp.edicts.weaponsLaw === 1,
						set: function() {
							V.SecExp.edicts.weaponsLaw = 2;
						},
						note: "Will slightly increase prosperity, but will cost a small amount of authority each week and will leave rebellions decently armed."
					},
					{
						text: "forbid residents to buy, sell and keep weaponry while within the arcology.",
						conditional: V.SecExp.edicts.weaponsLaw === 1 && V.arcologies[0].FSAntebellumRevivalistLaw2 !== 1,
						set: function() {
							V.SecExp.edicts.weaponsLaw = 0;
						},
						note: "Will cost a moderate amount of authority each week, but rebellions will be very poorly armed."
					},
					{
						conditional: V.SecExp.edicts.weaponsLaw === 1 && V.arcologies[0].FSAntebellumRevivalistLaw2 === 1,
						note: "You have legally guaranteed your citizens the right to bear arms. You must first revoke that right to enact this edict."
					},
					{
						text: "set the range of weapons allowed within the arcology to non-automatic, non-high caliber.",
						conditional: V.SecExp.edicts.weaponsLaw === 0,
						set: function() {
							V.SecExp.edicts.weaponsLaw = 1;
						},
						note: "Will cost some authority each week, but rebellions will be poorly armed."
					}
				]
			}],
			["Legionaries traditions", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "you are funding specialized training for your recruits following the Roman tradition of professional armies.",
						conditional: V.FSAnnounced && V.SecExp.edicts.defense.legionTradition === 1,
						set: function() {
							V.SecExp.edicts.defense.legionTradition = 0;
						},
					}
				],
				implement: [
					{
						text: "fund specialized training for your recruits to turn them into the professional of Roman tradition.",
						conditional: V.FSAnnounced && V.SecExp.edicts.defense.militia >= 1 && V.arcologies[0].FSRomanRevivalist >= 40 && V.SecExp.edicts.defense.legionTradition === 0,
						set: function() {
							V.SecExp.edicts.defense.legionTradition = 1;
						},
						note: "Will increase defense, morale and hp of militia units, but will incur upkeep costs."
					}
				]
			}],
			["Neo-Imperial traditions", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: `you are funding specialized training for your recruits to inculcate them into a professional Imperial army, led by highly trained and hand-picked ${V.mercenariesTitle}.`,
						conditional: V.FSAnnounced && V.SecExp.edicts.defense.imperialTradition === 1,
						set: function() {
							V.SecExp.edicts.defense.imperialTradition = 0;
						},
					}
				],
				implement: [
					{
						text: "fund specialized training for your recruits to turn them into a professional Imperial army, led by your handpicked Imperial Knights.",
						conditional: V.FSAnnounced && V.SecExp.edicts.defense.militia >= 1 && V.arcologies[0].FSNeoImperialist >= 40 && !V.SecExp.edicts.defense.imperialTradition,
						set: function() {
							V.SecExp.edicts.defense.imperialTradition = 1;
						},
						note: "Will moderately increase defense, hp, and morale of your militia units and increase attack, defense and morale of your mercenaries, but will incur upkeep costs."
					}
				]
			}],
			["Southron traditions", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "you are funding specialized training for your citizen-run militias to turn them into a professional Southron army",
						conditional: V.FSAnnounced && V.SecExp.edicts.defense.southronTradition === 1,
						set: function() {
							V.SecExp.edicts.defense.southronTradition = 0;
						},
					}
				],
				implement: [
					{
						text: "fund specialized training for your citizen-run militias to turn them into a professional, though still citizen-run, Southron army",
						conditional: V.FSAnnounced && V.SecExp.edicts.defense.militia >= 1 && V.arcologies[0].FSAntebellumRevivalist >= 40 && V.SecExp.edicts.defense.southronTradition === 0,
						set: function() {
							V.SecExp.edicts.defense.southronTradition = 1;
						},
						note: "Will increase defense and morale, but will incur upkeep costs. Southron Militiamen excel at defense and aren't motivated on the attack."
					}
				]
			}],
			["Pharaonic traditions", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "you are funding specialized training for your recruits to turn them into an army worthy of a pharaon.",
						conditional: V.SecExp.edicts.defense.pharaonTradition === 1,
						set: function() {
							V.SecExp.edicts.defense.pharaonTradition = 0;
						},
					}
				],
				implement: [
					{
						text: "fund specialized training for your recruits to turn them into an army worthy of a pharaoh.",
						conditional: V.FSAnnounced && V.SecExp.edicts.defense.militia >= 1 && V.arcologies[0].FSEgyptianRevivalist >= 40 && V.SecExp.edicts.defense.pharaonTradition === 0,
						set: function() {
							V.SecExp.edicts.defense.pharaonTradition = 1;
						},
						note: "Will increase attack, defense and morale of militia units, but will incur upkeep costs."
					}
				]
			}],
			["Eagle warriors traditions", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "you are funding specialized training for your mercenaries following the Aztec tradition of elite warriors.",
						conditional: V.SecExp.edicts.defense.eagleWarriors === 1,
						set: function() {
							V.SecExp.edicts.defense.eagleWarriors = 0;
						},
					}
				],
				implement: [
					{
						text: "fund specialized training for your mercenaries to turn them into the elite units of Aztec tradition.",
						conditional: V.FSAnnounced && V.mercenaries > 0 && V.arcologies[0].FSAztecRevivalist >= 40 && V.SecExp.edicts.defense.eagleWarriors === 0,
						set: function() {
							V.SecExp.edicts.defense.eagleWarriors = 1;
						},
						note: "Will give a high increase in attack and morale, but will lower defense of mercenary units and will incur upkeep costs."
					}
				]
			}],
			["Ronin traditions", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "you are funding specialized training for your mercenaries following the Japanese tradition of elite errant samurai.",
						conditional: V.SecExp.edicts.defense.ronin === 1,
						set: function() {
							V.SecExp.edicts.defense.ronin = 0;
						},
					}
				],
				implement: [
					{
						text: "fund specialized training for your mercenaries to turn them into the errant samurai of Japanese tradition.",
						conditional: V.FSAnnounced && V.mercenaries > 0 && V.arcologies[0].FSEdoRevivalist >= 40 && V.SecExp.edicts.defense.ronin === 0,
						set: function() {
							V.SecExp.edicts.defense.ronin = 1;
						},
						note: "Will increase attack, defense and morale of mercenary units, but will incur upkeep costs."
					}
				]
			}],
			["Mamluks traditions", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "you are funding specialized training for your slaves following the Arabian tradition of mamluks slave soldiers.",
						conditional: V.SecExp.edicts.defense.mamluks === 1,
						set: function() {
							V.SecExp.edicts.defense.mamluks = 0;
						},
					}
				],
				implement: [
					{
						text: "fund specialized training for your slaves to turn them into the mamluks slave soldiers of Arabian tradition.",
						conditional: V.FSAnnounced && V.arcologies[0].FSArabianRevivalist >= 40 && V.SecExp.edicts.defense.mamluks === 0,
						set: function() {
							V.SecExp.edicts.defense.mamluks = 1;
						},
						note: "Will increase attack, morale and hp of slave units, but will incur upkeep costs."
					}
				]
			}],
			["Sun Tzu Teachings", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: `you are funding specialized training for your units and officers to follow the teachings of the "Art of War".`,
						conditional: V.SecExp.edicts.defense.sunTzu === 1,
						set: function() {
							V.SecExp.edicts.defense.sunTzu = 0;
						},
					}
				],
				implement: [
					{
						text: `fund specialized training for your units and officers to conform your army to the teachings of the "Art of War".`,
						conditional: V.FSAnnounced && V.arcologies[0].FSChineseRevivalist >= 40 && V.SecExp.edicts.defense.sunTzu === 0,
						set: function() {
							V.SecExp.edicts.defense.sunTzu = 1;
						},
						note: "Will slightly increase attack, defense and morale of all units, but will incur upkeep costs."
					}
				]
			}],
		]);

		const c = new DocumentFragment();
		const r = [];
		let showFS = 0;
		for (const [name, detail] of data) {
			if (["Immigration limits", "Open Borders"].includes(name) && !r.includes(name)) {
				App.UI.DOM.appendNewElement("h2", c, "Immigration");
				r.push(name);
			} else if (name === "Weapons Law" && !r.includes(name)) {
				App.UI.DOM.appendNewElement("h2", c, "Weapons");
				r.push(name);
			} else if (V.FSAnnounced && ["traditions", "Teachings"].includes(name) && !showFS) {
				App.UI.DOM.appendNewElement("h2", c, "Future Societies");
				showFS = 1;
			}
			App.UI.DOM.appendNewElement("p", c, genMenu(name, detail));
		}
		return c;
	}
	function Military() {
		const soliderWages = function() {
			switch (V.SecExp.edicts.defense.soldierWages) {
				case 0: return "below market rates";
				case 1: return "at market rates";
				case 2: return "above market rates";
			}
		};
		const militiaStatus = function() {
			switch (V.SecExp.edicts.defense.militia) {
				case 0: return "Not Founded";
				case 1: return "Disbanded";
				case 2: return "Volunteers only";
				case 3: return "Conscription";
				case 4: return "Obligatory military service";
				case 5: return "Militarized Society";
			}
		};
		const sfSupport = function() {
			const x = [];
			if (V.SecExp.edicts.SFSupportLevel === 0) {
				x.push("no support");
			} else {
				if (V.SecExp.edicts.SFSupportLevel >= 1) {
					x.push("provided the security HQ with advanced equipment");
				}
				if (V.SecExp.edicts.SFSupportLevel >= 2) {
					x.push("advanced training for security HQ personnel");
				}
				if (V.SecExp.edicts.SFSupportLevel >= 3) {
					x.push("assigned troops to the security department");
				}
				if (V.SecExp.edicts.SFSupportLevel >= 4) {
					x.push("its full support");
				}
				if (V.SecExp.edicts.SFSupportLevel === 5) {
					x.push("assisted with installing a local version of their custom network");
				}
			}
			return toSentence(x);
		};
		const capSF = capFirstChar(V.SF.Lower || "the Special Force");
		const data = new Map([
			[`Wages for soldiers are ${soliderWages()}`, {
				implement: [
					{
						text: "the wages paid to arcology soldiers will be at market rates.",
						conditional: V.SecExp.edicts.defense.soldierWages === 0,
						set: function() {
							V.SecExp.edicts.defense.soldierWages = 1;
						},
						note: "Will raise all units upkeep and push loyalty to average levels."
					},
					{
						text: "the wages paid to arcology soldiers will be below market rates.",
						conditional: V.SecExp.edicts.defense.soldierWages === 1,
						set: function() {
							V.SecExp.edicts.defense.soldierWages = 0;
						},
						note: "Will lower all units upkeep and push loyalty to low levels."
					},
					{
						text: "the wages paid to arcology soldiers will be above market rates.",
						conditional: V.SecExp.edicts.defense.soldierWages === 1,
						set: function() {
							V.SecExp.edicts.defense.soldierWages = 2;
						},
						note: "Will raise all units upkeep and push loyalty to high levels."
					},
					{
						text: "the wages paid to arcology soldiers will be at market rates.",
						conditional: V.SecExp.edicts.defense.soldierWages === 2,
						set: function() {
							V.SecExp.edicts.defense.soldierWages = 1;
						},
						note: "Will lower all units upkeep and push loyalty to average levels."
					}
				]
			}],
			["Slave Officers", {
				repeal: [
					{
						text: "your trusted slaves are allowed to lead the defense forces of the arcology.",
						conditional: V.SecExp.edicts.defense.slavesOfficers === 1,
						set: function() {
							V.SecExp.edicts.defense.slavesOfficers = 0;
						},
					}
				],
				implement: [
					{
						text: "allow your trusted slaves to lead the defense forces of the arcology.",
						conditional: V.SecExp.edicts.defense.slavesOfficers === 0,
						set: function() {
							V.SecExp.edicts.defense.slavesOfficers = 1;
						},
						note: "Will allow your bodyguard and Head Girl to lead troops into battle, but will cost a small amount of authority each week."
					}
				]
			}],
			["Mercenary subsidy", {
				repeal: [
					{
						text: "mercenaries willing to immigrate in your arcology will be offered a discount on rent.",
						conditional: V.SecExp.edicts.defense.discountMercenaries === 1,
						set: function() {
							V.SecExp.edicts.defense.discountMercenaries = 0;
						},
					}
				],
				implement: [
					{
						text: "mercenaries willing to immigrate in your arcology will be offered a discount on rent.",
						conditional: V.mercenaries > 0 && V.SecExp.edicts.defense.discountMercenaries === 0,
						set: function() {
							V.SecExp.edicts.defense.discountMercenaries = 1;
						},
						note: "Will slightly lower rent, but will increase the amount of available mercenaries."
					}
				]
			}],
			[`Militia Status (${militiaStatus()})`, {
				implement: [
					{
						text: `lay the groundwork for the formation of the arcology's citizens' army.`,
						conditional: V.SecExp.edicts.defense.militia === 0,
						set: function() {
							V.SecExp.edicts.defense.militia = 2;
						},
						note: "Will allow for the recruitment and training of citizens."
					},
					{
						text: `disband the militia.`,
						conditional: V.SecExp.edicts.defense.militia > 1,
						set: function() {
							V.SecExp.edicts.defense.militia = 1;
						}
					},
					{
						text: `Reinstate the militia as volunteers only.`,
						conditional: V.SecExp.edicts.defense.militia === 1,
						set: function() {
							V.SecExp.edicts.defense.militia = 2;
						},
					},
					{
						text: `only volunteers will be accepted in the militia.`,
						conditional: V.SecExp.edicts.defense.militia > 2,
						set: function() {
							V.SecExp.edicts.defense.militia = 2;
						},
						note: `Will replenish militia manpower slowly and will cap at ${num(App.Mods.SecExp.militiaCap(2)*100)}% of the total citizens population.`
					},
					{
						text: `ensure every citizen is required to train in the militia and serve the arcology if the need arises.`,
						conditional: V.SecExp.edicts.defense.militia === 2,
						set: function() {
							V.SecExp.edicts.defense.militia = 3;
						},
						note: `Will replenish militia manpower moderately fast and will cap at ${num(App.Mods.SecExp.militiaCap(3)*100)}% of the total citizens population, but has a high authority cost.`
					},
					{
						text: `ensure every citizen is required to register and serve under the militia.`,
						conditional: V.SecExp.edicts.defense.militia === 3,
						set: function() {
							V.SecExp.edicts.defense.militia = 4;
						},
						note: `Will quickly replenish militia manpower and will cap at ${num(App.Mods.SecExp.militiaCap(4)*100)}% of the total citizens population, but has a very high authority cost.`
					},
					{
						text: `ensure that every adult citizen is required to train and participate in the defense of the arcology.`,
						conditional: V.SecExp.edicts.defense.militia === 4,
						set: function() {
							V.SecExp.edicts.defense.militia = 5;
						},
						note: `Will very quickly replenish militia manpower and will cap at ${num(App.Mods.SecExp.militiaCap(5)*100)}% of the total citizens population, but has an extremely high authority cost`
					},
				]
			}],
			["Military exemption", {
				repeal: [
					{
						text: "you allow citizens to avoid military duty by paying a weekly fee.",
						conditional: V.SecExp.edicts.defense.militaryExemption === 1,
						set: function() {
							V.SecExp.edicts.defense.militaryExemption = 0;
						},
					}
				],
				implement: [
					{
						text: "allow citizens to avoid military duty by paying a weekly fee.",
						conditional: V.SecExp.edicts.defense.militia >= 3 && V.SecExp.edicts.defense.militaryExemption === 1,
						set: function() {
							V.SecExp.edicts.defense.militaryExemption = 1;
						},
						note: "Will slow down the replenishment of manpower, but will supply cash each week. More profitable with stricter recruitment laws."
					}
				]
			}],
			["Revised minimum requirements", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "you allow citizens outside the normally accepted range to join the militia.",
						conditional: V.SecExp.edicts.defense.lowerRequirements === 1,
						set: function() {
							V.SecExp.edicts.defense.lowerRequirements = 0;
						},
					}
				],
				implement: [
					{
						text: "will allow citizens outside the normally accepted range to join the militia.",
						conditional: V.SecExp.edicts.defense.militia >= 3 && V.arcologies[0].FSHedonisticDecadence >= 40 && V.SecExp.edicts.defense.lowerRequirements === 0,
						set: function() {
							V.SecExp.edicts.defense.lowerRequirements = 1;
						},
						note: "Will slightly lower defense and hp of militia units, but will increase the manpower replenishment rate."
					}
				]
			}],
			["No subhumans in the militia", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "it is forbidden for subhumans to join the militia.",
						conditional: V.SecExp.edicts.defense.noSubhumansInArmy === 1,
						set: function() {
							V.SecExp.edicts.defense.noSubhumansInArmy = 0;
						},
					}
				],
				implement: [
					{
						text: "prevent subhumans from joining the militia.",
						conditional: V.SecExp.edicts.defense.militia >= 3 && V.arcologies[0].FSSubjugationist >= 40 && V.SecExp.edicts.defense.noSubhumansInArmy === 0,
						set: function() {
							V.SecExp.edicts.defense.noSubhumansInArmy = 1;
						},
						note: "Will help advance racial Subjugation, but will slow down slightly manpower replenishment."
					}
				]
			}],
			["Military exemption for pregnancies", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "pregnant citizens are allowed, and encouraged, to avoid military service.",
						conditional: V.SecExp.edicts.defense.pregExemption === 1,
						set: function() {
							V.SecExp.edicts.defense.pregExemption = 0;
						},
					}
				],
				implement: [
					{
						text: "pregnant citizens will be allowed, and encouraged, to avoid military service.",
						conditional: V.SecExp.edicts.defense.militia >= 3 && V.arcologies[0].FSRepopulationFocus >= 40 && V.SecExp.edicts.defense.militia >= 3 && V.SecExp.edicts.defense.pregExemption === 0,
						set: function() {
							V.SecExp.edicts.defense.pregExemption = 1;
						},
						note: "Will help advance repopulation focus, but will slow down slightly manpower replenishment."
					}
				]
			}],
			["Special militia privileges", {
				repeal: [
					{
						text: "citizens joining the militia are exempt from rent payment.",
						conditional: V.SecExp.edicts.defense.privilege.militiaSoldier === 1,
						set: function() {
							V.SecExp.edicts.defense.privilege.militiaSoldier = 0;
						},
					}
				],
				implement: [
					{
						text: "will allow citizens joining the militia to avoid paying rent.",
						conditional: V.SecExp.edicts.defense.militia >= 1 && V.SecExp.edicts.defense.privilege.militiaSoldier === 0,
						set: function() {
							V.SecExp.edicts.defense.privilege.militiaSoldier = 1;
						},
						note: "Will increase the loyalty of militia units, but will decrease rents."
					}
				]
			}],
			["Special slaves privileges", {
				repeal: [
					{
						text: "slaves into the army are allowed to have material possessions.",
						conditional: V.SecExp.edicts.defense.privilege.slaveSoldier === 1,
						set: function() {
							V.SecExp.edicts.defense.privilege.slaveSoldier = 0;
						},
					}
				],
				implement: [
					{
						text: "will allow slaves drafted into the army to be able to have material possessions.",
						conditional: V.SecExp.edicts.defense.privilege.slaveSoldier === 0,
						set: function() {
							V.SecExp.edicts.defense.privilege.slaveSoldier = 1;
						},
						note: "Will increase the loyalty of slave units, but will cost authority each week."
					}
				]
			}],
			["Special mercenary privileges", {
				repeal: [
					{
						text: "mercenaries under contract can claim part of the loot gained from battles.",
						conditional: V.SecExp.edicts.defense.privilege.mercSoldier === 1,
						set: function() {
							V.SecExp.edicts.defense.privilege.mercSoldier = 0;
						},
					}
				],
				implement: [
					{
						text: "will allow mercenaries under contract to claim part of the loot gained from battles.",
						conditional: V.mercenaries > 0 && V.SecExp.edicts.defense.privilege.mercSoldier === 0,
						set: function() {
							V.SecExp.edicts.defense.privilege.mercSoldier = 1;
						},
						note: "Will increase the loyalty of mercenary units, but will reduce cash and menial slaves gained from battles."
					}
				]
			}],
			["Slave martial schools", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "specialized schools are training slaves in martial arts and bodyguarding.",
						conditional: V.SecExp.edicts.defense.martialSchool === 1,
						set: function() {
							V.SecExp.edicts.defense.martialSchool = 0;
						},
					}
				],
				implement: [
					{
						text: "specialized schools will be set up to train slaves in martial arts and bodyguarding.",
						conditional: V.arcologies[0].FSPhysicalIdealist >= 40 && V.SecExp.edicts.defense.martialSchool === 0,
						set: function() {
							V.SecExp.edicts.defense.martialSchool = 1;
						},
						note: "Will slightly increase morale of slave units, but will incur upkeep costs."
					}
				]
			}],
			["Elite officers", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "officers are exclusively recruited from the elite of society.",
						conditional: V.SecExp.edicts.defense.eliteOfficers === 1,
						set: function() {
							V.SecExp.edicts.defense.eliteOfficers = 0;
						},
					}
				],
				implement: [
					{
						text: "officers will be exclusively recruited from the elite of society.",
						conditional: V.arcologies[0].FSRestart >= 40 && V.SecExp.edicts.defense.eliteOfficers === 0,
						set: function() {
							V.SecExp.edicts.defense.eliteOfficers = 1;
						},
						note: "Will help advance eugenics and provide a small morale boost to militia units, but will give a small morale malus to slave units."
					}
				]
			}],
			["Live targets drills", {
				tag: ["bold", "lime"],
				repeal: [
					{
						text: "disobedient slaves are used as live targets at shooting ranges.",
						conditional: V.SecExp.edicts.defense.liveTargets === 1,
						set: function() {
							V.SecExp.edicts.defense.liveTargets = 0;
						},
					}
				],
				implement: [
					{
						text: "disobedient slaves will be used as live targets at shooting ranges.",
						conditional: V.arcologies[0].FSDegradationist >= 40 && V.SecExp.edicts.defense.liveTargets === 0,
						set: function() {
							V.SecExp.edicts.defense.liveTargets = 1;
						},
						note: "Will help advance degradationism and provide a small amount of exp to units, but will make the slave population slowly decline."
					}
				]
			}],
			[`SF Assistance; ${sfSupport()}`, {
				repeal: [
					{
						conditional: V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.edicts.SFSupportLevel > 0,
						set: function() {
							V.SecExp.edicts.SFSupportLevel--;
						},
					}
				],
				implement: [
					{
						text: `${capSF} will provide the security HQ with advanced equipment.`,
						conditional: V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.edicts.SFSupportLevel === 0 && App.Mods.SecExp.Check.reqMenials() > 5,
						set: function() {
							V.SecExp.edicts.SFSupportLevel = 1;
						},
						note: "Will lower the amount of personnel necessary to man the security HQ by 5, but will incur upkeep costs."
					},
					{
						text: `${capSF} will provide the security HQ personnel with advanced training.`,
						conditional: V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.edicts.SFSupportLevel === 1 && V.SF.Squad.Firebase >= 4 && App.Mods.SecExp.Check.reqMenials() > 5,
						set: function() {
							V.SecExp.edicts.SFSupportLevel = 2;
						},
						note: "Will lower the amount of personnel necessary to man the security HQ by a further 5, but will incur additional upkeep costs."
					},
					{
						text: `${capSF} will provide troops to the security department.`,
						conditional: V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.edicts.SFSupportLevel === 2 && V.SF.Squad.Firebase >= 6 && App.Mods.SecExp.Check.reqMenials() > 5,
						set: function() {
							V.SecExp.edicts.SFSupportLevel = 3;
						},
						note: "Will lower the amount of personnel necessary to man the security HQ by a further 5, but will incur additional upkeep costs."
					},
					{
						text: `${capSF} will give the security department its full support.`,
						conditional: V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.edicts.SFSupportLevel === 3 && V.SF.Squad.Firebase >= 6 && App.Mods.SecExp.Check.reqMenials() > 5,
						set: function() {
							V.SecExp.edicts.SFSupportLevel = 4;
						},
						note: "Will lower the amount of personnel necessary to man the security HQ by a further 5, but will incur additional upkeep costs."
					},
					{
						text: `${capSF} will assist the security department with installing a local version of their custom network.`,
						conditional: V.SF.Toggle && V.SF.Active >= 1 && V.SecExp.edicts.SFSupportLevel === 4 && V.SF.Squad.Firebase === 10 && App.Mods.SecExp.Check.reqMenials() > 5,
						set: function() {
							V.SecExp.edicts.SFSupportLevel = 5;
						},
						note: "Will lower the amount of personnel necessary to man the security HQ by a further 5, but will incur additional upkeep costs."
					},
				]
			}],
		]);

		const c = new DocumentFragment();
		const r = [];
		for (const [name, detail] of data) {
			if (V.SF.Toggle && V.SF.Active >= 1 && name === "SF Assistance" && !r.includes(name)) {
				App.UI.DOM.appendNewElement("h1", c, "Special Force:", ["underline"]);
				r.push(name);
			}
			App.UI.DOM.appendNewElement("p", c, genMenu(name, detail));
		}
		return c;
	}

	const count = (x) => V.SecExp[x].victories + V.SecExp[x].losses;
	const node = new DocumentFragment();
	App.UI.DOM.appendNewElement("h1", node, `Edicts`);
	App.UI.DOM.appendNewElement("div", node, `Passing any edict will cost ${cashFormat(5000)} and some authority. More will become available as the arcology develops.`, ["note"]);
	const tabBar = new App.UI.Tabs.TabBar("SecExpEdicts");
	tabBar.addTab("Society", "Society", Society());
	if (count("battles") > 0 || count("rebellions") > 0 || V.mercenaries > 0) {
		tabBar.addTab("Military", "Military", Military());
	}
	if (V.SecExp.core.authority < 1000) {
		App.UI.DOM.appendNewElement("div", node, "Not enough Authority.", ["red", "note"]);
	}
	node.append(tabBar.render());
	return node;
};
