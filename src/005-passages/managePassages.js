new App.DomPassage("Main",
	() => {
		V.nextButton = "END WEEK";
		V.nextLink = "End Week";
		App.UI.StoryCaption.encyclopedia = "How to Play";

		return App.MainView.full();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Future Society", () => App.UI.fsPassage(), ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Slave FS Conformance", () => App.FSConformance.slaveConformancePassage(), ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Manage Penthouse",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "What the Upgrades Do";
		return App.UI.managePenthouse();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Manage Personal Affairs",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Being in Charge";
		return App.UI.managePersonalAffairs();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("pDildoVagina",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Personal Affairs";
		return App.UI.pDildoVagina();
	}, ["jump-from-safe"]
);

new App.DomPassage("pDildoAss",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Personal Affairs";
		return App.UI.pDildoAss();
	}, ["jump-from-safe"]
);

new App.DomPassage("retire",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		return App.Events.retire(getSlave(V.AS));
	}
);

new App.DomPassage("Change Language",
	() => {
		V.nextButton = "Confirm changes";
		V.nextLink = "Main";
		return App.Arcology.changeLanguage();
	}, ["jump-from-safe"]
);

new App.DomPassage("Neighbor Arcology Cheat",
	() => {
		V.nextButton = "Continue";
		V.nextLink = "MOD_Edit Neighbor Arcology Cheat Datatype Cleanup";
		return App.UI.Cheat.neighbors();
	}
);

new App.DomPassage("Manage Corporation",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "The Corporation";
		return App.Corporate.manage();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Manage Arcology",
	() => {
		return App.UI.manageArcology();
	}, ["jump-to-safe", "jump-from-safe"]
);


new App.DomPassage("Policies",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Future Societies";
		return App.UI.policies();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Universal Rules",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Penthouse";
		return App.UI.universalRules();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Farmyard Animals",
	() => {
		return App.Facilities.Farmyard.animals();
	}
);

new App.DomPassage("Doctor Consultation",
	() => {
		return App.UI.doctorConsultation();
	}
);

new App.DomPassage("Elective Surgery",
	() => {
		return App.UI.electiveSurgery();
	}
);

new App.DomPassage("Personal Appearance",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Personal Affairs";
		return App.UI.playerSalon(V.PC);
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Brothel Advertisement",
	() => {
		return App.Facilities.Brothel.ads();
	}, ["jump-from-safe"]
);

new App.DomPassage("Club Advertisement",
	() => {
		return App.Facilities.Club.ads();
	}, ["jump-from-safe"]
);

new App.DomPassage("Coursing Association",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		return App.UI.coursingAssociation();
	}, ["jump-from-safe"]
);

new App.DomPassage("Personal assistant options",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		return App.UI.personalAssistantOptions();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Assistant Appearance Pack Two",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Personal assistant options";
		return App.UI.assistantAppearancePackTwo();
	}
);

new App.DomPassage("The Black Market",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		V.returnTo = "Main";
		App.UI.StoryCaption.encyclopedia = "The Black Market";
		return App.UI.blackMarket();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("FirebaseTour",
	() => {
		V.nextButton = "Return to Operations";
		V.nextLink = "Firebase";
		return App.UI.firebaseTour();
	}
);

new App.DomPassage("Prosthetic Lab",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Penthouse";
		return App.UI.prostheticLab();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Gene Lab",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Penthouse";
		App.UI.StoryCaption.encyclopedia = "The Pharmaceutical Fab";
		return App.UI.geneLab();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Breeder Proposal",
	() => {
		V.nextButton = " ";
		V.nextLink = "Main";
		return App.UI.breederProposal();
	}
);

new App.DomPassage("Implant Manufactory",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Penthouse";
		App.UI.StoryCaption.encyclopedia = "The Pharmaceutical Fab";
		return App.UI.implantManufactory();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Organ Farm",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Penthouse";
		App.UI.StoryCaption.encyclopedia = "The Pharmaceutical Fab";
		return App.UI.organFarm();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Barracks",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		return App.UI.barracks();
	}
);

new App.DomPassage("editSF",
	() => {
		V.nextButton = `Back to ${V.SF.Lower}'s Firebase`;
		V.nextLink = "Firebase";
		return App.UI.editSF();
	}
);

new App.DomPassage("Firebase",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Special Force";
		return App.UI.FireBase();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("edicts",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";
		return App.Mods.SecExp.edicts();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Media Studio",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Penthouse";
		App.UI.StoryCaption.encyclopedia = "Media Hub";
		return App.UI.mediaStudio();
	}, ["jump-to-safe", "jump-from-safe"]
);
