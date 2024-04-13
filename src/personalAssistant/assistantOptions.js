App.UI.personalAssistantOptions = function() {
	const node = new DocumentFragment();

	// App.UI.DOM.appendNewElement("h1", node, `Personal Assistant`);

	assistant.object();

	App.Events.drawEventArt(node, "assistant");

	const {
		He: HeA, His: HisA,
		he: heA, his: hisA, him: himA, himself: himselfA,
	} = getPronouns(assistant.pronouns().main);

	const r = [];

	r.push(`Seated at your desk, you glance at the visual representation of`);
	if (V.assistant.announcedName) {
		r.push(App.UI.DOM.makeTextBox(V.assistant.name, (v) => V.assistant.name = v));
	} else {
		r.push(`${V.assistant.name}`);
	}
	r.push(`in a corner of your desk's glass top.`);

	if (V.assistant.name !== "your personal assistant") {
		r.push(App.UI.DOM.makeElement("div", App.UI.DOM.link(
			`Stop using a custom name`,
			() => {
				V.assistant.name = "your personal assistant";
				App.UI.reload();
			}
		), ['indent']));
	}

	App.Events.addParagraph(node, r);

	App.UI.DOM.appendNewElement("p", node, PersonalAssistantAppearance());

	if (V.assistant.power > 0) {
		App.UI.DOM.appendNewElement("p", node, `Though ${heA} remains short of a true AI, the arcology's upgraded computer core allows ${himA} to use brute force to simulate sentient behavior quite well. ${HeA} is not truly self aware, but ${heA} is able to predict what a sentient being with a certain character might say or do in common situations. The increased power has other applications; for example, it has improved the accuracy of your estimates of economic activity in the Free City.`);
	} else {
		App.UI.DOM.appendNewElement("p", node, `${HeA} is well short of a true AI, but with extensive access to information on past human behavior and the processing power to query that information quickly, ${heA} can often seem self aware by modeling ${himselfA} after others' past behavior.`);
	}

	const tabBar = new App.UI.Tabs.TabBar("Personalassistantoptions");
	tabBar.addTab("Computer Core Upgrades", "upgrades", upgrades());
	if (V.week >= 11) {
		tabBar.addTab("Settings", "settings", settings());
	}
	if (V.assistant.personality !== 0 && V.assistant.options) {
		tabBar.addTab("Appearance", "appearance", appearance());
	}
	node.append(tabBar.render());

	return node;

	/**
	 * @returns {DocumentFragment} a DocumentFragment that lets the player upgrade the assistant's computer
	 */
	function upgrades() {
		const frag = new DocumentFragment();

		if (V.assistant.power === 0) {
			const memoryCost = Math.trunc(20000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier);
			App.Events.addParagraph(frag, [
				`The first upgrade needed is a switch to a holographic memory core to store the immense quantity of data ${V.assistant.name} gathers.`,
				makePurchase(`Install holographic memory core`, memoryCost, "capEx", {
					handler: () => {
						V.assistant.power++;
						V.PC.skill.engineering += 1;
						V.PC.skill.hacking += 1;
						App.UI.reload();
					}
				}),
			]);
		} else if (V.assistant.power === 1) {
			const coolingCost = Math.trunc(35000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier);
			App.Events.addParagraph(frag, [
				`The next upgrade needed is a liquid nitrogen cooling system to allow for extensive overclocking.`,
				makePurchase(`Install upgraded cooling system`, coolingCost, "capEx", {
					notes: [`will allow you to upgrade the smart piercings in ${V.arcologies[0].name}`],
					handler: () => {
						V.assistant.power++;
						V.PC.skill.engineering += 1;
						V.PC.skill.hacking += 1;
						App.UI.reload();
					}
				}),
			]);
		} else if (V.assistant.power === 2) {
			const opticalCost = Math.trunc(50000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier);
			App.Events.addParagraph(frag, [
				`The final upgrade needed is a transition to optical RAM.`,
				makePurchase(`Install optical RAM`, opticalCost, "capEx", {
					handler: () => {
						V.assistant.power++;
						V.PC.skill.engineering += 1;
						V.PC.skill.hacking += 1;
						App.UI.reload();
					}
				}),
			]);
		} else {
			App.Events.addParagraph(frag, [`The arcology's computer core is fully upgraded.`]);
		}
		return frag;
	}

	/**
	 * @returns {DocumentFragment} a DocumentFragment that lets the player change the assistant's settings
	 */
	function settings() {
		const frag = new DocumentFragment();

		App.UI.DOM.appendNewElement("h3", frag, "Behavior:");
		if (V.assistant.personality <= 0) {
			App.Events.addParagraph(frag, [
				`Your assistant is using ${hisA} default settings, and is not behaving as though ${heA} has a libido.`,
				App.UI.DOM.makeElement("div", App.UI.DOM.link(
					`Instruct ${himA} to simulate a sex drive`,
					() => {
						V.assistant.personality = 1;
						App.UI.reload();
					},
				), ["indent"]),
			]);
		} else {
			App.Events.addParagraph(frag, [
				`Your assistant is simulating preferences and a sex drive.`,
				App.UI.DOM.makeElement("div", App.UI.DOM.link(
					`Revert ${himA} to normal settings`,
					() => {
						V.assistant.personality = 0;
						V.assistant.appearance = "normal";
						App.UI.reload();
					},
				), ["indent"]),
			]);
		}

		if (V.assistant.market) {
			const options = new App.UI.OptionsGroup();
			App.UI.DOM.appendNewElement("h3", frag, "Business Assistant:");
			const textStart = `The arcology's upgraded computers support advanced business analysis.`;
			if (V.assistant.appearance !== "normal") {
				App.Events.addParagraph(frag, [
					textStart,
					`These capabilities are represented by an avatar styled after ${V.assistant.name}'s.`,
				]);
				options.addOption(`Simulate a relationship with ${V.assistant.name} that is`, "relationship", V.assistant.market)
					.addValueList([
						["Cute", "cute"],
						["Romantic", "romantic"],
						["Nonconsensual", "nonconsensual"],
						["Incestuous", "incestuous"],
					]);
			} else {
				App.UI.DOM.appendNewElement("p", frag, `${textStart} Although technically an expanded subroutine within the same app, ${V.assistant.name} uses a distinct icon to identify these alerts and improve your workflow.`);
			}
			V.assistant.market.limit = Math.clamp(V.assistant.market.limit, 0, 10000000);
			options.addOption("Use excess liquid assets to play the menial slave market.", "limit", V.assistant.market)
				.addValueList([
					["Disallow", 0],
					["Allow", 10000],
				]).showTextBox();
			if (V.assistant.market.limit) {
				options.addOption(`${HisA} investing strategy will be`, "aggressiveness", V.assistant.market)
					.addValueList([
						["Conservative", 0],
						["Aggressive", 100],
					]);
			}
			frag.append(options.render());
		}
		return frag;
	}

	/**
	 * @returns {DocumentFragment} a DocumentFragment that lets the player change the assistants appearace
	 */
	function appearance() {
		const frag = new DocumentFragment();

		const linkArray = [];
		frag.append(availableAssistantAppearances());

		if (V.policies.publicPA === 1) {
			App.UI.DOM.appendNewElement("span", frag, `${HeA} is currently part of your public image, so you may wish to select an appearance that complements your Future Societies:`, ["note"]);
			frag.append(assistantFS());
		}
		App.UI.DOM.appendNewElement("h3", frag, "Downloadable Content (DLC):");
		/*
		if (!V.assistant.Extra1) {
			const monsterCost = Math.trunc(10000 * V.upgradeMultiplier);
			App.UI.DOM.appendNewElement("div", frag, App.UI.DOM.link(
				"Purchase a set of monstergirl appearances",
				() => {
					V.event = "";
					cashX(forceNeg(monsterCost), "capEx");
					V.assistant.Extra1 = 1;
					App.UI.reload();
				},
				[],
				"",
				`Costs${cashFormat(monsterCost)}`
			));
		} else {
			App.UI.DOM.appendNewElement("div", frag, `You have downloaded a set of monstergirl appearances for your avatar.`);
		}
		*/
		if (!V.assistant.Extra2) {
			const price = (V.PC.skill.hacking < 75) ? Math.trunc(10000 * V.upgradeMultiplierArcology) : 0;
			const div = document.createElement("div");
			div.append(App.UI.DOM.link(
				`${price ? "Purchase" : "Acquire"} a set of heaven and hell themed appearances`,
				() => {
					V.assistant.Extra2 = 1;
					cashX(-price, "capEx");
				},
				[],
				"Assistant Appearance Pack Two",
			));
			App.Events.addNode(div, [price ? ` Costs ${cashFormatColor(price)}` : ` Unencrypted files, ripe for the taking`], "span", "note");
			frag.append(div);
		} else {
			App.UI.DOM.appendNewElement("div", frag, `You have downloaded a set of heavenly and hellish appearances for your avatar.`);
		}

		/* Choose his FS appearance */
		if (V.assistant.fsOptions && V.assistant.appearance !== "normal") {
			App.UI.DOM.appendNewElement("h3", frag, "Society-specific setting:");
			let r = [];
			r.push(`${HeA} can further refine ${hisA} avatar to match the arcology's social`);
			if (V.assistant.fsAppearance !== "default") {
				r.push(
					`profile; ${hisA} current variation shows`,
					App.UI.DOM.makeElement("span", V.assistant.fsAppearance, ["bold"]),
					`touches.`
				);
			} else {
				r.push(`profile, though no details stand out right now.`);
			}
			App.Events.addNode(frag, r, "div");

			/** @type {Map<fsAssistantAppearance, string>} */
			const appearanceWithFS = new Map([
				["gender radicalist", "FSGenderRadicalistDecoration"],
				["gender fundamentalist", "FSGenderFundamentalistDecoration"],
				["paternalist", "FSPaternalistDecoration"],
				["degradationist", "FSDegradationistDecoration"],
				["repopulation focus", "FSRepopulationFocusDecoration"],
				["eugenics", "FSRestartDecoration"],
				["intellectual dependency", "FSIntellectualDependencyDecoration"],
				["slave professionalism", "FSSlaveProfessionalismDecoration"],
				["body purist", "FSBodyPuristDecoration"],
				["transformation fetishist", "FSTransformationFetishistDecoration"],
				["youth preferentialist", "FSYouthPreferentialistDecoration"],
				["maturity preferentialist", "FSMaturityPreferentialistDecoration"],
				["slimness enthusiast", "FSSlimnessEnthusiastDecoration"],
				["petite admiration", "FSPetiteAdmirationDecoration"],
				["statuesque glorification", "FSStatuesqueGlorificationDecoration"],
				["asset expansionist", "FSAssetExpansionistDecoration"],
				["pastoralist", "FSPastoralistDecoration"],
				["physical idealist", "FSPhysicalIdealistDecoration"],
				["hedonistic decadence", "FSHedonisticDecadenceDecoration"],
				["supremacist", "FSSupremacistDecoration"],
				["subjugationist", "FSSubjugationistDecoration"],
				["chattel religionist", "FSChattelReligionistDecoration"],
				["roman revivalist", "FSRomanRevivalistDecoration"],
				["neoimperialist", "FSNeoImperialistDecoration"],
				["aztec revivalist", "FSAztecRevivalistDecoration"],
				["egyptian revivalist", "FSEgyptianRevivalistDecoration"],
				["edo revivalist", "FSEdoRevivalistDecoration"],
				["arabian revivalist", "FSArabianRevivalistDecoration"],
				["chinese revivalist", "FSChineseRevivalistDecoration"],
				["antebellum revivalist", "FSAntebellumRevivalistDecoration"],
			]);

			makeFSlink("default");
			for (const [selection, decoration] of appearanceWithFS) {
				if (V.assistant.fsAppearance !== selection && V.arcologies[0][decoration] > 20) {
					makeFSlink(selection);
				}
			}
			App.UI.DOM.appendNewElement("div", frag, App.UI.DOM.generateLinksStrip(linkArray));

			if (V.seeImages && V.seeAvatar) {
				App.UI.DOM.appendNewElement("h3", node, "Custom Image");
				node.append(customAssistantImage());
			}
		}

		return frag;

		function makeFSlink(selection) {
			const link = App.UI.DOM.link(
				selection,
				() => {
					V.assistant.fsAppearance = selection;
					App.UI.reload();
				}
			);
			link.style.textTransform = "capitalize";
			linkArray.push(link);
		}
	}
};
