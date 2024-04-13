/* ### Central Slave Interact ### */
new App.DomPassage("Slave Interact",
	() => {
		V.nextButton = "Confirm changes";
		V.nextLink = "Main";

		return App.UI.SlaveInteract.mainPage(getSlave(V.AS));
	}, ["jump-from-safe"]
);

/* ### Single Interaction ### */
new App.DomPassage("SlaveOnSlaveFeeding",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Slave Interact";

		return App.UI.SlaveInteract.slaveOnSlaveFeedingSelection(getSlave(V.AS));
	}
);

new App.DomPassage("KillSlave", () => App.UI.SlaveInteract.killSlave(getSlave(V.AS)));

new App.DomPassage(
	"Slave Slave Swap Workaround",
	() => {
		V.nextButton = "Abort Operation";
		V.nextLink = "Main";
		return bodySwapSelection(getSlave(V.AS));
	}
);

new App.DomPassage(
	"Husk Slave Swap Workaround",
	() => {
		V.nextButton = "Abort Operation";
		if (V.activeSlave.tankBaby !== 3) {
			V.nextLink = "Scheduled Event";
			V.returnTo = "Scheduled Event";
		} else {
			V.nextLink = "Main";
			V.returnTo = "Incubator";
		}
		return huskSwapSelection(V.activeSlave);
	}
);

new App.DomPassage(
	"Incubator Retrieval Workaround",
	() => {
		V.returnTo = "Main";
		V.nextLink = "Incubator";
		V.nextButton = "Continue";
		return App.UI.facilityRetrievalWorkaround("Incubator");
	}
);

new App.DomPassage(
	"Nursery Retrieval Workaround",
	() => {
		V.returnTo = "Main";
		V.nextLink = "Nursery";
		V.nextButton = "Continue";
		return App.UI.facilityRetrievalWorkaround("Nursery");
	}
);

new App.DomPassage(
	"Agent Company",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Neighbor Interact";
		return App.UI.SlaveInteract.agentCompany(getSlave(V.AS));
	}, ["jump-from-safe"]
);

new App.DomPassage(
	"Surgery Degradation",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Remote Surgery";
		return App.UI.SlaveInteract.surgeryDegradation(getSlave(V.AS));
	}, ["jump-from-safe"]
);

new App.DomPassage(
	"Remote Surgery",
	() => {
		V.nextButton = "Confirm changes";
		V.nextLink = "Slave Interact";
		return App.UI.SlaveInteract.remoteSurgery(getSlave(V.AS));
	}, ["jump-from-safe"]
);

new App.DomPassage(
	"Import Slave",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Slave Interact";
		return App.UI.SlaveInteract.importSlave();
	}, ["jump-from-safe"]
);

new App.DomPassage(
	"Export Slave",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Slave Interact";
		return App.UI.SlaveInteract.exportSlave(getSlave(V.AS));
	}, ["jump-from-safe"]
);

new App.DomPassage(
	"Create Slave Bot",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Slave Interact";
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("p", el, `Exporting slave...`);
		App.UI.SlaveInteract.createSlaveBot(getSlave(V.AS));
		return el;
	}, ["jump-from-safe"]
);

new App.DomPassage(
	"Cheat Edit JS",
	() => {
		V.nextButton = " ";
		return App.UI.SlaveInteract.cheatEditSlave(getSlave(V.AS));
	}
);

new App.DomPassage(
	"Cheat Edit JS Apply",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Slave Interact";
		const el = new DocumentFragment();
		App.UI.DOM.appendNewElement("p", el, `You perform the dark rituals, pray to the dark gods, and sell your soul for the power to change and mold slaves to your will.`);
		App.UI.DOM.appendNewElement("p", el, `This slave has been changed forever and you have lost a bit of your soul, YOU CHEATER!`);
		return el;
	}, ["jump-from-safe"]
);

new App.DomPassage("MpregSelf",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";

		return MpregSelf();
	}
);

new App.DomPassage("BreedingTest",
	() => {
		V.nextButton = "Confirm changes";
		V.nextLink = "Slave Interact";
		return App.UI.DOM.makeElement("div", App.Interact.eliteBreedingExam(getSlave(V.AS)));
	}
);

new App.DomPassage("Aztec Slave Sacrifice Penance",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Aztec Revivalism";
		return App.UI.SlaveInteract.aztecSlaveSacrificePenance(getSlave(V.AS));
	}
);

new App.DomPassage("Aztec Slave Sacrifice Life",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Aztec Revivalism";
		return App.UI.SlaveInteract.aztecSlaveSacrificeLife(getSlave(V.AS));
	}
);

new App.DomPassage("Abort",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Slave Interact";
		return App.Interact.abort(getSlave(V.AS));
	}
);

new App.DomPassage("FAnimalImpreg",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Slave Interact";
		return App.Interact.fAnimalImpreg(getSlave(V.AS));
	}
);

new App.DomPassage("Matchmaking",
	() => {
		if (lastVisited("Child Interact") === 1) {
			V.nextLink = "Incubator";
		} else {
			V.nextLink = "Slave Interact";
		}
		V.nextButton = "Continue";
		return App.Interact.matchmaking(getSlave(V.AS));
	}
);

new App.DomPassage("FSelf",
	() => {
		V.nextLink = "Main";
		V.nextButton = "Back";
		return App.Interact.fSelf();
	}
);

new App.DomPassage("FMarry",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Slave Interact";
		return App.Interact.fMarry(getSlave(V.AS));
	}
);

new App.DomPassage("Discard Confirm",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Slave Interact";
		return App.Interact.discard(getSlave(V.AS));
	}
);

new App.DomPassage("Sell Slave",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Slave Interact";
		return App.Interact.sellSlave(getSlave(V.AS));
	}
);

new App.DomPassage("Brothel Assignment Scene",
	() => {
		App.UI.StoryCaption.encyclopedia = "Brothel";
		return App.Facilities.Brothel.assignmentScene(getSlave(V.AS));
	}
);

new App.DomPassage("Industrial Dairy Assignment Scene",
	() => {
		App.UI.StoryCaption.encyclopedia = "Dairy";
		return App.Facilities.Dairy.industrialAssignmentScene(getSlave(V.AS));
	}
);

new App.DomPassage("Free Range Dairy Assignment Scene",
	() => {
		App.UI.StoryCaption.encyclopedia = "Dairy";
		return App.Facilities.Dairy.freeRangeAssignmentScene(getSlave(V.AS));
	}
);


new App.DomPassage("Personal Attention Select",
	() => {
		return App.UI.Player.personalAttention();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Agent Assignment Scene",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Neighbor Interact";
		App.UI.StoryCaption.encyclopedia = "Agents";
		return App.UI.SlaveInteract.agentAssignmentScene();
	}
);

new App.DomPassage("Artificial Insemination",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Remote Surgery";
		return App.UI.SlaveInteract.artificialInsemination();
	}
);

new App.DomPassage("Neighbor Interact",
	() => {
		V.nextLink = "Main";
		V.nextButton = "Back";
		return App.Neighbor.Interact();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Slave Slave Swap",
	() => {
		V.nextButton = "Continue";
		return App.UI.SlaveInteract.slaveSlaveSwap();
	}
);

new App.DomPassage("Husk Slave Swap",
	() => {
		V.nextButton = "Continue";
		return App.UI.SlaveInteract.huskSlaveSwap();
	}
);

new App.DomPassage("Prosthetics Configuration",
	() => {
		const slave = getSlave(V.AS);
		return App.UI.prostheticsConfigPassage(slave);
	}
);

new App.DomPassage("Multiple Organ Implant",
	() => {
		return App.UI.multipleOrganImplant();
	}
);

new App.DomPassage("Surgery Death",
	() => {
		V.nextLink = "Main";

		const slave = getSlave(V.AS);
		removeSlave(slave);

		const f = new DocumentFragment();
		App.Events.addParagraph(f, [`${slave.slaveName} <span class="health dec">has died from complications of surgery.</span>`]);
		return f;
	}, ["jump-from-safe"]
);

new App.DomPassage("Walk Past List",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		return App.UI.walkPastAll();
	}
);
new App.DomPassage("Find Slave",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		return App.UI.findSlave();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Analyze Pregnancy",
	() => {
		V.nextButton = "Continue";
		return App.UI.analyzePregnancy();
	}, ["jump-from-safe"]
);

new App.DomPassage("Analyze PC Pregnancy",
	() => {
		V.nextButton = "Continue";
		return App.UI.analyzePCPregnancy();
	}, ["jump-from-safe"]
);

new App.DomPassage("Surrogacy Workaround",
	() => {
		V.nextButton = "Cancel";
		return App.UI.surrogacyWorkaround();
	}
);

new App.DomPassage("Pit Workaround",
	() => {
		V.nextButton = V.pit.slavesFighting === null || V.pit.slavesFighting.length !== 2 ? "Cancel" : "Finish";
		V.nextLink = "Pit";
		return App.Facilities.Pit.workaround();
	}
);

new App.DomPassage("Cloning Workaround",
	() => {
		V.nextButton = "Cancel";
		V.nextLink = "Gene Lab";
		return App.UI.cloningWorkaround();
	}
);

new App.DomPassage("Subordinate Targeting",
	() => {
		V.nextButton = "Back";
		V.nextLink = V.returnTo;
		return App.UI.subordinateTargeting();
	}
);

new App.DomPassage("Dinner Party Preparations",
	() => {
		V.nextButton = "Cancel The Event";
		V.nextLink = "Main";
		return App.Mods.DinnerParty.Prep();
	}
);

new App.DomPassage("Dinner Party Execution",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Personal Assistant";
		return App.Mods.DinnerParty.Execution();
	}
);

new App.DomPassage("Inspect Tank Settings",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Incubator";
		return App.UI.inspectTankSettings(false);
	}, ["jump-from-safe"]
);

new App.DomPassage("Inspect Fetus Tank Settings",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Analyze Pregnancy";
		return App.UI.inspectTankSettings(true);
	}, ["jump-from-safe"]
);

new App.DomPassage("Inspect PC Fetus Tank Settings",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "Analyze PC Pregnancy";
		return App.UI.inspectTankSettings(true, true);
	}, ["jump-from-safe"]
);
