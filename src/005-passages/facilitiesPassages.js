/* ### Standard Facilities ### */
new App.DomPassage("Arcade", () => { return new App.Facilities.Arcade.arcade().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Brothel", () => { return new App.Facilities.Brothel.brothel().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Cellblock", () => { return new App.Facilities.Cellblock.cellblock().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Clinic", () => { return new App.Facilities.Clinic.clinic().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Club", () => { return new App.Facilities.Club.club().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Dairy", () => { return new App.Facilities.Dairy.dairy().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Farmyard", () => { return new App.Facilities.Farmyard.farmyard().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Head Girl Suite", () => { return new App.Facilities.HGSuite.headGirlSuite().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Incubator", () => { return App.UI.incubator(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Master Suite", () => { return new App.Facilities.MasterSuite.masterSuite().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Nursery", () => { return new App.Facilities.Nursery.nursery().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Pit", () => { return App.Facilities.Pit.pit(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Schoolroom", () => { return new App.Facilities.Schoolroom.schoolroom().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Servants' Quarters", () => { return new App.Facilities.ServantsQuarters.servantsQuarters().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Spa", () => { return new App.Facilities.Spa.spa().render(); }, ["jump-to-safe", "jump-from-safe"]);

new App.DomPassage("Transport Hub", () => { return App.Mods.SecExp.transportHub.GUI(); });
new App.DomPassage("Weapons Manufacturing", () => { return App.Mods.SecExp.weapManu.GUI(); }, ["jump-to-safe", "jump-from-safe"]);
new App.DomPassage("securityHQ", () => { return App.Mods.SecExp.secHub.GUI(); }, ["jump-to-safe", "jump-from-safe"]);
new App.DomPassage("secBarracks", () => { return App.Mods.SecExp.barracks.GUI(); }, ["jump-to-safe", "jump-from-safe"]);
new App.DomPassage("riotControlCenter", () => { return App.Mods.SecExp.riotCenter.GUI(); }, ["jump-to-safe", "jump-from-safe"]);
new App.DomPassage("propagandaHub", () => { return App.Mods.SecExp.propHub.GUI(); }, ["jump-to-safe", "jump-from-safe"]);

/* ### Slave Interact Facilities ### */
new App.DomPassage("Wardrobe",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Penthouse";

		return App.UI.WardrobeShopping();
	}, ["jump-to-safe", "jump-from-safe"]
);


new App.DomPassage("Dressing Room",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Manage Penthouse";

		return App.UI.DressingRoom.render();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Salon",
	() => {
		V.nextButton = "Confirm changes";
		V.nextLink = "Slave Interact";
		App.UI.StoryCaption.encyclopedia = "The Auto Salon";

		return App.UI.salon(getSlave(V.AS));
	}, ["jump-from-safe"]
);

new App.DomPassage("Body Modification",
	() => {
		V.nextButton = "Confirm changes";
		V.nextLink = "Slave Interact";
		App.UI.StoryCaption.encyclopedia = "The Studio";

		return App.UI.bodyModification(getSlave(V.AS));
	}, ["jump-from-safe"]
);

/* ### Special Facilities ### */
new App.DomPassage("Agent Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Neighbor Interact";
		App.UI.StoryCaption.encyclopedia = "Agents";

		return App.Facilities.AgentSelect();
	}, ["jump-from-safe"]
);

new App.DomPassage("Attendant Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Spa";
		App.UI.StoryCaption.encyclopedia = "Attendant";

		return App.Facilities.AttendantSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("BG Select",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Bodyguard";

		return App.Facilities.BGSelect();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Concubine Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Master Suite";
		App.UI.StoryCaption.encyclopedia = "Concubine";

		return App.Facilities.ConcubineSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("DJ Select",
	() => {
		return App.Facilities.DJSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Head Girl Select",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Head Girl";

		return App.Facilities.HGSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Madam Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Brothel";
		App.UI.StoryCaption.encyclopedia = "Madam";

		return App.Facilities.MadamSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Milkmaid Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Dairy";
		App.UI.StoryCaption.encyclopedia = "Milkmaid";

		return App.Facilities.MilkmaidSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Nurse Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Clinic";
		App.UI.StoryCaption.encyclopedia = "Nurse";

		return App.Facilities.NurseSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Recruiter Select",
	() => {
		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Recruiter";

		return App.Facilities.RecruiterSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Schoolteacher Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Schoolroom";
		App.UI.StoryCaption.encyclopedia = "Schoolteacher";

		return App.Facilities.SchoolTeacherSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Stewardess Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Servants' Quarters";
		App.UI.StoryCaption.encyclopedia = "Stewardess";

		return App.Facilities.StewardessSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Wardeness Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Cellblock";
		App.UI.StoryCaption.encyclopedia = "Wardeness";

		return App.Facilities.WardenessSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Farmer Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Farmyard";
		App.UI.StoryCaption.encyclopedia = "Farmer";

		return App.Facilities.FarmerSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Matron Select",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Nursery";
		App.UI.StoryCaption.encyclopedia = "Matron";

		return App.Facilities.MatronSelect();
	}, ["jump-to-safe", "jump-hidden", "jump-from-safe"]
);

new App.DomPassage("Rules Assistant",
	() => {
		const div = document.createElement("div");
		App.RA.options(div);
		return div;
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Rules Assistant Summary",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Rules Assistant";
		V.returnTo = "Rules Assistant";
		return App.RA.summary();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Toy Shop",
	() => {
		V.nextButton = "Back";
		V.nextLink = "Main";

		return App.UI.toyShop();
	}, ["jump-to-safe", "jump-from-safe"]
);

new App.DomPassage("Dispensary",
	() => {
		V.nextButton = "Back"; V.nextLink = "Manage Penthouse"; App.UI.StoryCaption.encyclopedia = "The Pharmaceutical Fab";

		return App.UI.dispensary();
	}, ["jump-to-safe", "jump-from-safe"]
);
