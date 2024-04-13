/**
 *
 * @param {"cash"|"rep"} budgetType
 * @returns {HTMLDivElement}
 */
App.Budget.table = function(budgetType) {
	// Set up object to track calculated displays
	const income = (budgetType === "cash") ? "lastWeeksCashIncome" : "lastWeeksRepIncome";
	const expenses = (budgetType === "cash") ? "lastWeeksCashExpenses" : "lastWeeksRepExpenses";

	// Make the total 0 first, otherwise it gets counted as part of the new total
	V[income].Total = 0;
	V[income].Total = hashSum(V[income]);
	V[expenses].Total = 0;
	V[expenses].Total = hashSum(V[expenses]);

	const tableDiv = document.createElement("div");
	tableDiv.classList.add("budget");

	// HEADER
	generateHeader();

	// HEADER: FACILITIES
	createSectionHeader("Facilities");

	const F = App.Entity.facilities; // shortcut

	if (budgetType === "cash") {
		// PENTHOUSE
		addToggle(generateRowGroup("Penthouse", "PENTHOUSE"), [
			...generateRowCategory("Resting Slaves", "slaveAssignmentRest"),
			...generateRowCategory("Resting Vign", "slaveAssignmentRestVign"),
			...generateRowCategory("Fucktoys", "slaveAssignmentFucktoy"),
			...generateRowCategory("Taking Classes", "slaveAssignmentClasses"),
			...generateRowCategory("House Servants", "slaveAssignmentHouse"),
			...generateRowCategory("House Servant Vign", "slaveAssignmentHouseVign"),
			...generateRowCategory("Whores", "slaveAssignmentWhore"),
			...generateRowCategory("Whore Vign", "slaveAssignmentWhoreVign"),
			...generateRowCategory("Public Sluts", "slaveAssignmentPublic"),
			...generateRowCategory("Public Slut Vign", "slaveAssignmentPublicVign"),
			...generateRowCategory("Subordinate Slaves", "slaveAssignmentSubordinate"),
			...generateRowCategory("Milked", "slaveAssignmentMilked"),
			...generateRowCategory("MilkedVign", "slaveAssignmentMilkedVign"),
			...generateRowCategory("ExtraMilk", "slaveAssignmentExtraMilk"),
			...generateRowCategory("ExtraMilkVign", "slaveAssignmentExtraMilkVign"),
			...generateRowCategory("Gloryhole", "slaveAssignmentGloryhole"),
			...generateRowCategory("Confined Slaves", "slaveAssignmentConfinement")
		]);
		// Other
		generateRowCategory("Choosing Own Assignment", "slaveAssignmentChoice");

		// LEADERSHIP ROLES

		// HEAD GIRL
		// find passage name for HGSuite
		addToggle(generateRowGroup(F.headGirlSuite.nameCaps, "HEADGIRLSUITE"), [
			...generateRowCategory("Head Girl", "slaveAssignmentHeadgirl"),
			...generateRowCategory("Head Girl Fucktoys", "slaveAssignmentHeadgirlsuite")
		]);

		// RECRUITER
		addToggle(generateRowGroup("Recruiter", "RECRUITER"), [
			...generateRowCategory("Recruiter", "slaveAssignmentRecruiter")
		]);

		// BODYGUARD
		// find passage name for Armory
		addToggle(generateRowGroup(F.armory.nameCaps, "DOJO"), [
			...generateRowCategory("Bodyguard", "slaveAssignmentBodyguard")
		]);

		// CONCUBINE
		addToggle(generateRowGroup(F.masterSuite.nameCaps, "MASTERSUITE"), [
			...generateRowCategory("Master Suite Operation", "masterSuite"),
			...generateRowCategory("Master Suite Concubine", "slaveAssignmentConcubine"),
			...generateRowCategory("Master Suite Fucktoys", "slaveAssignmentMastersuite")
		]);

		// AGENT
		addToggle(generateRowGroup("Agent", "AGENT"), [
			...generateRowCategory("Agent", "slaveAssignmentAgent"),
			...generateRowCategory("Agent's Partner", "slaveAssignmentAgentPartner")
		]);

		// ARCADE
		addToggle(generateRowGroup(F.arcade.nameCaps, "ARCADE"), [
			...generateRowCategory("Arcade Operation", "arcade"),
			...generateRowCategory("Arcade Fuckdolls", "slaveAssignmentArcade")
		]);

		// BROTHEL
		addToggle(generateRowGroup(F.brothel.nameCaps, "BROTHEL"), [
			...generateRowCategory("Brothel Operation", "brothel"),
			...generateRowCategory("Brothel Madam", "slaveAssignmentMadam"),
			...generateRowCategory("Brothel MadamVign", "slaveAssignmentMadamVign"),
			...generateRowCategory("Brothel Whore", "slaveAssignmentBrothel"),
			...generateRowCategory("Brothel WhoreVign", "slaveAssignmentBrothelVign"),
			...generateRowCategory("Brothel Ads", "brothelAds")
		]);

		// CELLBLOCK
		addToggle(generateRowGroup(F.cellblock.nameCaps, "CELLBLOCK"), [
			...generateRowCategory("Cellblock Operation", "cellblock"),
			...generateRowCategory("Cellblock Warden", "slaveAssignmentWarden"),
			...generateRowCategory("Cellblock Slaves", "slaveAssignmentCellblock")
		]);

		// CLUB
		addToggle(generateRowGroup(F.club.nameCaps, "CLUB"), [
			...generateRowCategory("Club Operation", "club"),
			...generateRowCategory("Club DJ", "slaveAssignmentDj"),
			...generateRowCategory("Club DJVign", "slaveAssignmentDjVign"),
			...generateRowCategory("Club Sluts", "slaveAssignmentClub"),
			...generateRowCategory("Club Slut Vign", "slaveAssignmentClubVign"),
			...generateRowCategory("Club Ads", "clubAds")
		]);

		// CLINIC
		addToggle(generateRowGroup(F.clinic.nameCaps, "CLINIC"), [
			...generateRowCategory("Clinic Operation", "clinic"),
			...generateRowCategory("Clinic Nurse", "slaveAssignmentNurse"),
			...generateRowCategory("Clinic Slaves", "slaveAssignmentClinic")
		]);

		// DAIRY
		addToggle(generateRowGroup(F.dairy.nameCaps, "DAIRY"), [
			...generateRowCategory("Dairy Operation", "dairy"),
			...generateRowCategory("Dairy Milkmaid", "slaveAssignmentMilkmaid"),
			...generateRowCategory("Dairy Cows", "slaveAssignmentDairy"),
			...generateRowCategory("Dairy CowsVign", "slaveAssignmentDairyVign")
		]);

		// FARMYARD
		addToggle(generateRowGroup(F.farmyard.nameCaps, "FARMYARD"), [
			...generateRowCategory("Farmyard Operation", "farmyard"),
			...generateRowCategory("Farmyard Farmer", "slaveAssignmentFarmer"),
			...generateRowCategory("Farmyard Farmhands", "slaveAssignmentFarmyard"),
			...generateRowCategory("Farmyard FarmhandsVign", "slaveAssignmentFarmyardVign")
		]);

		// INCUBATOR
		addToggle(generateRowGroup(F.incubator.nameCaps, "INCUBATOR"), [
			...generateRowCategory("Incubator Operation", "incubator"),
			...generateRowCategory("Incubator Babies", "incubatorSlaves")
		]);

		// NURSERY
		addToggle(generateRowGroup(F.nursery.nameCaps, "NURSERY"), [
			...generateRowCategory("Nursery Operation", "nursery"),
			...generateRowCategory("Nursery Matron", "slaveAssignmentMatron"),
			...generateRowCategory("Nursery Nannies", "slaveAssignmentNursery"),
			...generateRowCategory("Nursery NanniesVign", "slaveAssignmentNurseryVign")
		]);

		// PIT
		addToggle(generateRowGroup(F.pit.nameCaps, "PIT"), [
			...generateRowCategory("Pit Operation", "pit")
		]);

		// PROSTHETIC LAB
		addToggle(generateRowGroup("Prosthetic Lab", "PROSTHETICLAB"), [
			...generateRowCategory("Prosthetic Lab Operation", "lab"),
			...generateRowCategory("Prosthetic Lab Research", "labResearch"),
			...generateRowCategory("Prosthetic Lab Scientists", "labScientists"),
			...generateRowCategory("Prosthetic Lab Menials", "labMenials")
		]);

		// SCHOOLROOM
		addToggle(generateRowGroup(F.schoolroom.nameCaps, "SCHOOLROOM"), [
			...generateRowCategory("Schoolroom Operation", "school"),
			...generateRowCategory("Schoolroom Teacher", "slaveAssignmentTeacher"),
			...generateRowCategory("Schoolroom Students", "slaveAssignmentSchool")
		]);

		// SERVANTS' QUARTERS
		addToggle(generateRowGroup(F.servantsQuarters.nameCaps, "SERVANTSQUARTERS"), [
			...generateRowCategory("Servants' Quarters Operation", "servantsQuarters"),
			...generateRowCategory("Servants' Quarters Steward", "slaveAssignmentSteward"),
			...generateRowCategory("Servants' Quarters Servants", "slaveAssignmentQuarter"),
			...generateRowCategory("Servants' Quarters ServantsVign", "slaveAssignmentQuarterVign")
		]);

		// SPA
		addToggle(generateRowGroup(F.spa.nameCaps, "SPA"), [
			...generateRowCategory("Spa Operation", "spa"),
			...generateRowCategory("Spa Attendant", "slaveAssignmentAttendant"),
			...generateRowCategory("Spa Slaves", "slaveAssignmentSpa")
		]);

		// HEADER: ARCOLOGY
		createSectionHeader("Arcology");

		// SLAVES
		addToggle(generateRowGroup("Slave Miscellaneous", "SLAVES"), [
			...generateRowCategory("Slave Porn", "porn"),
			...generateRowCategory("Slave Modifications", "slaveMod"),
			...generateRowCategory("Slave Surgery", "slaveSurgery"),
			...generateRowCategory("Slave Birthing", "birth")
		]);

		// MENIAL LABOR
		addToggle(generateRowGroup("Menial Labor", "LABOR"), [
			...generateRowCategory("Menials: Slaves", "menialTrades"),
			...generateRowCategory("Menials: Fuckdolls", "fuckdolls"),
			...generateRowCategory("Menials: Bioreactors", "menialBioreactors")
		]);

		// FLIPPING
		addToggle(generateRowGroup("Flipping", "FLIPPING"), [
			...generateRowCategory("Slave Transfer", "slaveTransfer"),
			...generateRowCategory("Indenture Renewal", "indentureRenewal"),
			...generateRowCategory("Menials", "menialTransfer"),
			...generateRowCategory("Fuckdolls", "fuckdollsTransfer"),
			...generateRowCategory("Bioreactors", "menialBioreactorsTransfer"),
			...generateRowCategory("Assistant: Menials", "menialTransferA"),
			...generateRowCategory("Assistant: Fuckdolls", "fuckdollsTransferA"),
			...generateRowCategory("Assistant: Bioreactors", "menialBioreactorsTransferA"),
			...generateRowCategory("Menial Retirement", "menialRetirement"),
			...generateRowCategory("Scientist Transfer", "labScientistsTransfer"),
			...generateRowCategory("Slave Babies", "babyTransfer")
		]);

		// FINANCIALS
		addToggle(generateRowGroup("Financials", "FINANCIALS"), [
			...generateRowCategory("Weather", "weather"),
			...generateRowCategory("Rents", "rents"),
			...generateRowCategory("Fines", "fines"),
			...generateRowCategory("Events", "event"),
			...generateRowCategory("Capital Expenses", "capEx"),
			...generateRowCategory("Future Society Shaping", "futureSocieties"),
			...generateRowCategory("School Subsidy", "schoolBacking"),
			...generateRowCategory("Arcology conflict", "war"),
			...generateRowCategory("Cheating", "cheating")
		]);

		// POLICIES
		addToggle(generateRowGroup("Policies", "POLICIES"), [
			...generateRowCategory("Policies", "policies"),
			...generateRowCategory("Subsidies and Barriers", "subsidiesAndBarriers")
		]);

		// EDICTS
		addToggle(generateRowGroup("Edicts", "EDICTS"), [
			...generateRowCategory("Edicts", "edicts")
		]);

		// PERSONAL FINANCE
		addToggle(generateRowGroup("Personal Finance", "PERSONALFINANCE"), [
			...generateRowCategory("Personal Business", "personalBusiness"),
			...generateRowCategory("Personal Living Expenses", "personalLivingExpenses"),
			...generateRowCategory("Your skills", "PCSkills"),
			...generateRowCategory("Your training expenses", "PCtraining"),
			...generateRowCategory("Your food expenses", "PCdiet"),
			...generateRowCategory("Your drug expenses", "PCdrugs"),
			...generateRowCategory("Your medical expenses", "PCmedical"),
			...generateRowCategory("Your cosmetic expenses", "PCcosmetics"),
			...generateRowCategory("Citizen Orphanage", "citizenOrphanage"),
			...generateRowCategory("Private Orphanage", "privateOrphanage"),
			...generateRowCategory("Stock dividends", "stocks"),
			...generateRowCategory("Stock trading", "stocksTraded")
		]);

		// SECURITY
		addToggle(generateRowGroup("Security", "SECURITY"), [
			...generateRowCategory("Mercenaries", "mercenaries"),
			...generateRowCategory("Security Expansion", "securityExpansion"),
			...generateRowCategory("Special Forces", "specialForces"),
			...generateRowCategory("Special Forces Capital Expenses", "specialForcesCap"),
			...generateRowCategory("Peacekeepers", "peacekeepers")
		]);
	} else if (budgetType === "rep") {
		// PENTHOUSE
		addToggle(generateRowGroup("Penthouse", "PENTHOUSE"), [
			...generateRowCategory("Fucktoys", "fucktoy"),
			...generateRowCategory("Public servants", "publicServant"),
			...generateRowCategory("Free glory holes", "gloryhole"),
			...generateRowCategory("Concubine", "concubine"),
			...generateRowCategory("Head girl", "headGirl"),
			...generateRowCategory("Bodyguard", "bodyguard"),
			...generateRowCategory("Recruiter", "recruiter"),
		]);

		// ARCADE
		addToggle(generateRowGroup(F.arcade.nameCaps, "ARCADE"), [
			...generateRowCategory("Arcade Operation", "arcade"),
			...generateRowCategory("Free arcade", "gloryholeArcade")
		]);

		// BROTHEL
		addToggle(generateRowGroup(F.brothel.nameCaps, "BROTHEL"), [
			...generateRowCategory("Brothel Operation", "brothel"),
		]);

		// CLUB
		addToggle(generateRowGroup(F.club.nameCaps, "CLUB"), [
			...generateRowCategory("Club Operation", "club"),
			...generateRowCategory("Club servants", "publicServantClub"),
			...generateRowCategory("Club ads", "clubAds"),
		]);

		// PIT
		addToggle(generateRowGroup(F.pit.nameCaps, "PIT"), [
			...generateRowCategory("Pit Operation", "pit")
		]);

		// SERVANTS' QUARTERS
		addToggle(generateRowGroup(F.servantsQuarters.nameCaps, "SERVANTSQUARTERS"), [
			...generateRowCategory("Servants' Quarters Operation", "servantsQuarters"),
		]);

		// SPA
		addToggle(generateRowGroup(F.spa.nameCaps, "SPA"), [
			...generateRowCategory("Spa Operation", "spa"),
		]);

		// FARMYARD
		addToggle(generateRowGroup(F.farmyard.nameCaps, "FARMYARD"), [
			...generateRowCategory("Shows", "shows"),
		]);

		// HEADER: ARCOLOGY
		createSectionHeader("Arcology");

		// SLAVES
		addToggle(generateRowGroup("Slave Miscellaneous", "SLAVES"), [
			...generateRowCategory("Slave trust and devotion", "slavesViewOfPC"),
			...generateRowCategory("Prestigious slaves", "prestigiousSlave"),
			...generateRowCategory("Porn", "porn"),
			...generateRowCategory("Selling/buying major slaves", "slaveTransfer"),
			...generateRowCategory("Public breeders", "publicBreeding"),
			...generateRowCategory("Selling babies", "babyTransfer"),
			...generateRowCategory("Birth", "birth"),
			...generateRowCategory("Slave retirement", "retirement"),
			...generateRowCategory("Vignettes", "vignette"),
			...generateRowCategory("Free Fuckdolls", "fuckdolls"),
		]);

		// POLICIES
		addToggle(generateRowGroup("Policies", "POLICIES"), [
			...generateRowCategory("Capital expenses", "capEx"),
			...generateRowCategory("Subsidies and Barriers", "subsidiesAndBarriers"),
			...generateRowCategory("Society shaping", "futureSocieties"),
			...generateRowCategory("Food", "food"),
		]);

		// EDICTS
		addToggle(generateRowGroup("Edicts", "EDICTS"), [
			...generateRowCategory("Edicts", "edicts")
		]);

		// PERSONAL FINANCE
		addToggle(generateRowGroup("Personal Finance", "PERSONALFINANCE"), [
			...generateRowCategory("Personal Business", "personalBusiness"),
			...generateRowCategory("Your appearance", "PCappearance"),
			...generateRowCategory("Your actions", "PCactions"),
			...generateRowCategory("Your skills", "PCRelationships"),
			...generateRowCategory("Slave relationships", "SlaveRelationships"),
			...generateRowCategory("Events", "event"),
		]);

		// SECURITY
		addToggle(generateRowGroup("Security", "SECURITY"), [
			...generateRowCategory("Security Expansion", "securityExpansion"),
			...generateRowCategory("Special Forces", "specialForces"),
			...generateRowCategory("Conflict", "war"),
			...generateRowCategory("Peacekeepers", "peacekeepers")
		]);

		addToggle(generateRowGroup("Waste", "WASTE"), [
			...generateRowCategory("Reputation decay", "multiplier"),
			...generateRowCategory("Overflow (your reputation cannot be higher than 20k)", "overflow"),
			...generateRowCategory("Income curve", "curve")
		]);
	}

	// BUDGET REPORT
	generateSummary();

	return tableDiv;

	function generateHeader() {
		App.UI.DOM.appendNewElement("div", tableDiv, (budgetType === "cash") ? "Budget Overview" : "Reputation Overview", ["header"]);
		App.UI.DOM.appendNewElement("div", tableDiv, "Income", ["header"]);
		App.UI.DOM.appendNewElement("div", tableDiv, "Expense", ["header"]);
		App.UI.DOM.appendNewElement("div", tableDiv, "Totals", ["header"]);
	}

	function generateSummary() {
		createSectionHeader("Summary Report");

		App.UI.DOM.appendNewElement("div", tableDiv, "Tracked totals");

		App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(Math.trunc(V[income].Total)), ["number",
			"final-result"]);
		App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(Math.trunc(V[expenses].Total)),
			["number", "final-result"]);
		App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(Math.trunc(V[income].Total + V[expenses].Total)),
			["number", "final-result"]);

		if (budgetType === "cash") {
			App.UI.DOM.appendNewElement("div", tableDiv, `Expenses budget for week ${V.week + 1}`);
			tableDiv.append(document.createElement("div"));
			App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(-V.costs), ["number"]);
			tableDiv.append(document.createElement("div"));
		}

		App.UI.DOM.appendNewElement("div", tableDiv, `Last week actuals`);
		tableDiv.append(document.createElement("div"));
		tableDiv.append(document.createElement("div"));
		if (budgetType === "cash") {
			App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(V.cash - V.cashLastWeek), ["number"]);
		} else {
			App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(V.rep - V.repLastWeek), ["number"]);
		}

		if (
			(budgetType === "cash" && (V.cash - V.cashLastWeek) === (V.lastWeeksCashIncome.Total + V.lastWeeksCashExpenses.Total)) ||
			(budgetType === "rep" && (V.rep - V.repLastWeek) === (V.lastWeeksRepIncome.Total + V.lastWeeksRepExpenses.Total))
		) {
			App.UI.DOM.appendNewElement("div", tableDiv, `The books are balanced, ${properTitle()}!`, ["green",
				"last-row"]);
			tableDiv.append(document.createElement("div"));
			tableDiv.append(document.createElement("div"));
			tableDiv.append(document.createElement("div"));
		} else {
			App.UI.DOM.appendNewElement("div", tableDiv, "Transaction tracking off by", ["red", "last-row"]);
			tableDiv.append(document.createElement("div"));
			tableDiv.append(document.createElement("div"));
			if (budgetType === "cash") {
				App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(
					(V.cash - V.cashLastWeek) - (V.lastWeeksCashIncome.Total + V.lastWeeksCashExpenses.Total)
				), ["number"]);
			} else {
				App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(
					(V.rep - V.repLastWeek) - (V.lastWeeksRepIncome.Total + V.lastWeeksRepExpenses.Total)
				), ["number"]);
			}
		}
	}

	function createSectionHeader(text) {
		App.UI.DOM.appendNewElement("div", tableDiv, text, ["section"]);
		App.UI.DOM.appendNewElement("div", tableDiv, null, ["section"]);
		App.UI.DOM.appendNewElement("div", tableDiv, null, ["section"]);
		App.UI.DOM.appendNewElement("div", tableDiv, null, ["section"]);
	}

	function generateRowCategory(node, category) {
		const r = [];
		if (V[income][category] || V[expenses][category] || V.showAllEntries[budgetType === "cash" ? "costsBudget" : "repBudget"]) {
			r.push(App.UI.DOM.appendNewElement("div", tableDiv, node, ["entry"]));
			r.push(App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(V[income][category]),
				["number", "entry"]));
			r.push(App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(-Math.abs(V[expenses][category])),
				["number", "entry"]));
			r.push(App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(V[income][category] + V[expenses][category]),
				["number", "entry"]));
		}
		return r;
	}

	function generateRowGroup(title, name) {
		/** @type {string[]} */
		const members = (budgetType === "cash" ? CategoryAssociatedGroup[name] : CategoryAssociatedGroupRep[name]);
		const groupIn = members.map((k) => V[income][k]).reduce((acc, cur) => acc + cur);
		const groupEx = members.map((k) => V[expenses][k]).reduce((acc, cur) => acc + cur);

		const r = [];
		if (groupIn || groupEx || V.showAllEntries[budgetType === "cash" ? "costsBudget" : "repBudget"]) {
			r.push(App.UI.DOM.appendNewElement("div", tableDiv, title, ["group"]));
			r.push(App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(groupIn), ["group", "number"]));
			r.push(App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(groupEx), ["group", "number"]));
			r.push(App.UI.DOM.appendNewElement("div", tableDiv, formatNumber(groupIn + groupEx),
				["group", "number"]));
		}
		return r;
	}

	/**
	 * @param {Array<HTMLDivElement>} heads
	 * @param {Array<HTMLDivElement>} content
	 */
	function addToggle(heads, content) {
		heads = heads.filter(e => !!e);
		if (heads.length === 0) {
			return;
		}
		content = content.filter(e => !!e);
		if (content.length === 0) {
			return;
		}
		// Based on App.UI.DOM.elementToggle(), which only allows one toggle element
		for (let htmlElement of heads) {
			htmlElement.classList.add("accordion", "closed");
		}
		for (let htmlElement of content) {
			htmlElement.classList.add("accordion-content", "hidden");
		}
		const toggle = () => {
			for (let htmlElement of heads) {
				htmlElement.classList.toggle("closed");
			}
			for (let htmlElement of content) {
				htmlElement.classList.toggle("hidden");
			}
		};
		for (let htmlElement of heads) {
			htmlElement.onclick = toggle;
		}
	}

	function formatNumber(num, invert = false) {
		if (invert) {
			num = -1 * num;
		}
		let span = document.createElement('span');
		span.append(budgetType === "cash" ? cashFormat(num) : repFormat(num, V.assistant.power < 3));
		if (num === 0) {
			// num overwrites gray, so we don't use it here.
			span.classList.add("gray");
		} else {
			span.classList.add((budgetType === "cash") ? "cash" : "reputation");
			// Display red if the value is negative, unless invert is true
			if (num < 0) {
				span.classList.add("dec");
				// Yellow for positive
			} else if (num > 0) {
				span.classList.add("inc");
				// Gray for exactly zero
			}
		}
		return span;
	}
};
