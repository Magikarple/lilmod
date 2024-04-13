/** @param {App.Entity.SlaveState} slave */
App.UI.SlaveInteract.cheatEditSlave = function(slave) {
	const el = new DocumentFragment();
	if (!V.tempSlave) {
		V.tempSlave = clone(slave);
	}

	App.UI.DOM.appendNewElement("h1", el, `Cheat edit ${slave.slaveName}`);

	el.append(App.Desc.longSlave(V.tempSlave));

	const tabBar = new App.UI.Tabs.TabBar("CheatEditJS");
	tabBar.addTab("Profile", "profile", App.StartingGirls.profile(V.tempSlave, true));
	tabBar.addTab("Physical", "physical", App.StartingGirls.physical(V.tempSlave, true));
	tabBar.addTab("Upper", "upper", App.StartingGirls.upper(V.tempSlave, true));
	tabBar.addTab("Lower", "lower", App.StartingGirls.lower(V.tempSlave, true));
	if (V.tempSlave.womb.length > 0) {
		tabBar.addTab(V.tempSlave.womb.length > 1 ? 'Fetuses' : 'Fetus', "fetuses", analyzePregnancies(V.tempSlave, true));
	}
	tabBar.addTab("Genes", "genes", genes());
	tabBar.addTab("Mental", "mental", App.StartingGirls.mental(V.tempSlave, true));
	tabBar.addTab("Skills", "skills", App.StartingGirls.skills(V.tempSlave, true));
	tabBar.addTab("Stats", "stats", App.StartingGirls.stats(V.tempSlave, true));
	tabBar.addTab("Porn", "porn", porn());
	tabBar.addTab("Relationships", "family", App.Intro.editFamily(V.tempSlave, true));
	tabBar.addTab("Body Mods", "body-mods", App.UI.bodyModification(V.tempSlave, true));
	tabBar.addTab("Salon", "salon", App.UI.salon(V.tempSlave, true));
	if (V.seeExtreme) {
		tabBar.addTab("Extreme", "extreme", extreme());
	}
	tabBar.addTab("Finalize", "finalize", finalize());
	el.append(tabBar.render());

	return el;

	function genes() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("h2", el, "Genetic mods");
		el.append(App.UI.SlaveInteract.geneticMods(V.tempSlave, true));
		App.UI.DOM.appendNewElement("h2", el, "Genetic quirks");
		el.append(App.UI.SlaveInteract.geneticQuirks(V.tempSlave, true));
		return el;
	}

	function finalize() {
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
			"Cancel",
			() => {
				delete V.tempSlave;
			},
			[],
			"Slave Interact"
		));
		App.Utils.showSlaveChanges(V.tempSlave, getSlave(V.AS), (val) => App.UI.DOM.appendNewElement("div", el, val), " ");
		App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
			"Apply cheat edits",
			() => {
				if (V.tempSlave.devotion !== slave.devotion) {
					V.tempSlave.oldDevotion = V.tempSlave.devotion;
				}
				if (V.tempSlave.trust !== slave.trust) {
					V.tempSlave.oldTrust = V.tempSlave.trust;
				}
				SlaveDatatypeCleanup(V.tempSlave);
				normalizeRelationship();
				V.slaves[V.slaveIndices[slave.ID]] = V.tempSlave;
				ibc.recalculate_coeff_id(slave.ID);
				delete V.tempSlave;
			},
			[],
			"Cheat Edit JS Apply"
		));
		return el;
	}

	function normalizeRelationship() {
		if (V.tempSlave.relationship !== slave.relationship || V.tempSlave.relationshipTarget !== slave.relationshipTarget) {
			if (slave.relationship > 0 && V.tempSlave.relationship <= 0) {
				// broke relationship
				const friend = getSlave(slave.relationshipTarget);
				if (friend) {
					friend.relationship = 0;
					friend.relationshipTarget = 0;
				}
				V.tempSlave.relationshipTarget = 0;
			} else if (V.tempSlave.relationship > 0 && V.tempSlave.relationshipTarget !== slave.relationshipTarget) {
				// new relationship target
				const oldFriend = slave.relationship > 0 ? getSlave(slave.relationshipTarget) : null;
				if (oldFriend) {
					// first break this slave's existing relationship, if she had one
					oldFriend.relationship = 0;
					oldFriend.relationshipTarget = 0;
				}
				const newFriend = getSlave(V.tempSlave.relationshipTarget);
				if (newFriend) {
					// then break the target's existing relationship, if she had one
					const newFriendFriend = newFriend.relationship > 0 ? getSlave(newFriend.relationshipTarget) : null;
					if (newFriendFriend) {
						newFriendFriend.relationship = 0;
						newFriendFriend.relationshipTarget = 0;
					}
					// then make the new relationship bilateral
					newFriend.relationship = V.tempSlave.relationship;
					newFriend.relationshipTarget = V.tempSlave.ID;
				}
			} else if (V.tempSlave.relationship > 0) {
				// same target, new relationship level
				const friend = getSlave(slave.relationshipTarget);
				if (friend) {
					friend.relationship = V.tempSlave.relationship;
				}
			}
		}
	}

	function extreme() {
		const el = new DocumentFragment();
		const options = new App.UI.OptionsGroup();
		options.addOption("Fuckdoll", "fuckdoll", V.tempSlave)
			.addValue("Not a Fuckdoll", 0).addCallback(() => {
				V.tempSlave.clothes = "no clothing";
				V.tempSlave.shoes = "none";
			})
			.addValue("Barely a Fuckdoll", 15).addCallback(() => beginFuckdoll(V.tempSlave))
			.addValue("Slight Fuckdoll", 25).addCallback(() => beginFuckdoll(V.tempSlave))
			.addValue("Basic Fuckdoll", 45).addCallback(() => beginFuckdoll(V.tempSlave))
			.addValue("Intermediate Fuckdoll", 65).addCallback(() => beginFuckdoll(V.tempSlave))
			.addValue("Advanced Fuckdoll", 85).addCallback(() => beginFuckdoll(V.tempSlave))
			.addValue("Total Fuckdoll", 100).addCallback(() => beginFuckdoll(V.tempSlave))
			.showTextBox();
		el.append(options.render());
		return el;
	}

	function porn() {
		const el = new DocumentFragment();
		const porn = V.tempSlave.porn;
		const options = new App.UI.OptionsGroup();
		let option;
		const {him, he} = getPronouns(V.tempSlave);
		options.addOption(`Studio outputting porn of ${him}`, "feed", porn)
			.addValue("off", 0).off()
			.addValue("on", 1).on();
		options.addOption(`Viewer count`, "viewerCount", porn).showTextBox();
		options.addOption(`Spending`, "spending", porn).showTextBox();

		option = options.addOption(`Porn ${he} is known for`, "fameType", porn).addValue("None", "none").pulldown();
		for (const genre of App.Porn.getAllGenres()) {
			option.addValue(genre.uiName(), genre.fameName);
		}

		if (porn.fameType !== "none") {
			options.addOption(`Prestige level`, "prestige", porn)
				.addValueList([
					["Not", 0],
					["Some", 1],
					["Recognized", 2],
					["World renowned", 3],
				]);
			let genre = App.Porn.getGenreByFameName(porn.fameType);
			let desc_auto = '';
			switch (porn.prestige) {
				case 1:
					desc_auto = `$He has a following in slave pornography. ${genre.prestigeDesc1}.`;
					break;
				case 2:
					desc_auto = `He is well known from $his career in slave pornography. ${genre.prestigeDesc2}.`;
					break;
				case 3:
					desc_auto = `$He is world famous for $his career in slave pornography. ${genre.prestigeDesc3}.`;
					break;
			}
			options.addOption(`Prestige Description`, "prestigeDesc", porn)
				.addValue("Disable", 0).off()
				.addValue("Automatic", desc_auto).off()
				.showTextBox();
		}

		option = options.addOption(`Porn the studio focuses on`, "focus", porn).addValue("None", "none").pulldown();
		for (const genre of App.Porn.getAllGenres()) {
			option.addValue(genre.uiName(), genre.focusName);
		}

		for (const genre of App.Porn.getAllGenres()) {
			options.addOption(`Fame level for ${genre.fameName}`, genre.fameVar, porn.fame).addValue("None", "none").showTextBox();
		}

		el.append(options.render());
		return el;
	}
};
