App.Data.Records = {};

App.Data.Records.LastWeeksCash = function() {
	// Slaves in general
	this.slaveMod = 0;
	this.slaveSurgery = 0;
	this.birth = 0;
	this.porn = 0;
	// Slave Income and Expenses per assignment
	this.slaveAssignmentRest = 0;
	this.slaveAssignmentRestVign = 0;
	this.slaveAssignmentFucktoy = 0;
	this.slaveAssignmentClasses = 0;
	this.slaveAssignmentHouse = 0;
	this.slaveAssignmentHouseVign = 0;
	this.slaveAssignmentWhore = 0;
	this.slaveAssignmentWhoreVign = 0;
	this.slaveAssignmentPublic = 0;
	this.slaveAssignmentPublicVign = 0;
	this.slaveAssignmentSubordinate = 0;
	this.slaveAssignmentMilked = 0;
	this.slaveAssignmentMilkedVign = 0;
	this.slaveAssignmentExtraMilk = 0;
	this.slaveAssignmentExtraMilkVign = 0;
	this.slaveAssignmentGloryhole = 0;
	this.slaveAssignmentConfinement = 0;
	this.slaveAssignmentBodyguard = 0;
	this.slaveAssignmentHeadgirl = 0;
	this.slaveAssignmentHeadgirlsuite = 0;
	this.slaveAssignmentRecruiter = 0;
	this.slaveAssignmentConcubine = 0;
	this.slaveAssignmentMastersuite = 0;
	this.slaveAssignmentAgent = 0;
	this.slaveAssignmentAgentPartner = 0;
	this.slaveAssignmentArcade = 0;
	this.slaveAssignmentMadam = 0;
	this.slaveAssignmentMadamVign = 0;
	this.slaveAssignmentBrothel = 0;
	this.slaveAssignmentBrothelVign = 0;
	this.slaveAssignmentWarden = 0;
	this.slaveAssignmentCellblock = 0;
	this.slaveAssignmentDj = 0;
	this.slaveAssignmentDjVign = 0;
	this.slaveAssignmentClub = 0;
	this.slaveAssignmentClubVign = 0;
	this.slaveAssignmentNurse = 0;
	this.slaveAssignmentClinic = 0;
	this.slaveAssignmentMilkmaid = 0;
	this.slaveAssignmentDairy = 0;
	this.slaveAssignmentDairyVign = 0;
	this.slaveAssignmentFarmer = 0;
	this.slaveAssignmentFarmyard = 0;
	this.slaveAssignmentFarmyardVign = 0;
	this.slaveAssignmentMatron = 0;
	this.slaveAssignmentNursery = 0;
	this.slaveAssignmentNurseryVign = 0;
	this.slaveAssignmentTeacher = 0;
	this.slaveAssignmentSchool = 0;
	this.slaveAssignmentSteward = 0;
	this.slaveAssignmentQuarter = 0;
	this.slaveAssignmentQuarterVign = 0;
	this.slaveAssignmentAttendant = 0;
	this.slaveAssignmentSpa = 0;
	this.slaveAssignmentBabyFactory = 0;
	this.slaveAssignmentChoice = 0;
	// Menial Slaves
	this.menialTrades = 0;
	this.fuckdolls = 0;
	this.menialBioreactors = 0;
	// Misc Slaves
	this.labScientists = 0;
	this.labMenials = 0;
	this.slaveTransfer = 0;
	this.indentureRenewal = 0;
	this.menialTransfer = 0;
	this.fuckdollsTransfer = 0;
	this.menialBioreactorsTransfer = 0;
	this.menialTransferA = 0;
	this.fuckdollsTransferA = 0;
	this.menialBioreactorsTransferA = 0;
	this.labScientistsTransfer = 0;
	this.babyTransfer = 0;
	this.menialRetirement = 0;

	// Buildings
	this.masterSuite = 0;
	this.arcade = 0;
	this.brothel = 0;
	this.brothelAds = 0;
	this.cellblock = 0;
	this.club = 0;
	this.clubAds = 0;
	this.clinic = 0;
	this.dairy = 0;
	this.farmyard = 0;
	this.incubator = 0;
	this.incubatorSlaves = 0;
	this.nursery = 0;
	this.pit = 0;
	this.lab = 0;
	this.labResearch = 0;
	this.school = 0;
	this.servantsQuarters = 0;
	this.spa = 0;

	// Arcology
	this.environment = 0;
	this.weather = 0;

	this.mercenaries = 0;
	this.peacekeepers = 0;
	this.specialForces = 0;
	this.specialForcesCap = 0;
	this.securityExpansion = 0;

	this.citizenOrphanage = 0;
	this.privateOrphanage = 0;

	this.capEx = 0;
	this.futureSocieties = 0;
	this.schoolBacking = 0;
	this.policies = 0;
	this.subsidiesAndBarriers = 0;
	this.edicts = 0;

	// Personal Finance
	this.personalBusiness = 0;
	this.personalLivingExpenses = 0;
	this.PCSkills = 0;
	this.PCtraining = 0;
	this.PCdiet = 0;
	this.PCdrugs = 0;
	this.PCmedical = 0;
	this.PCcosmetics = 0;
	this.PCskills = 0;
	this.stocksTraded = 0; // trading
	this.stocks = 0; // share growth
	this.fines = 0;
	this.event = 0; // poker night etc. Try to file things elsewhere if you can.
	this.war = 0;
	this.loan = 0;

	// Policies
	this.food = 0;

	this.rents = 0;

	this.cheating = 0;
	this.total = 0;
};

App.Data.Records.LastWeeksRep = function() {
	// Slave Jobs
	this.fucktoy = 0;
	this.publicServant = 0;
	this.gloryholeArcade = 0;
	this.gloryhole = 0;
	this.disobedience = 0;
	this.concubine = 0;
	this.headGirl = 0;
	this.bodyguard = 0;
	this.recruiter = 0;

	// Slaves in general
	this.fuckdolls = 0;
	this.slaveTransfer = 0;
	this.babyTransfer = 0;
	this.birth = 0;
	this.retirement = 0;
	this.slavesViewOfPC = 0;
	this.prestigiousSlave = 0;
	this.vignette = 0;
	this.porn = 0;

	// Buildings
	this.arcade = 0;
	this.brothel = 0;
	this.club = 0;
	this.publicServantClub = 0;
	this.clubAds = 0;
	this.pit = 0;
	this.servantsQuarters = 0;
	this.spa = 0;

	this.shows = 0;	// e.g. Farmyard shows, etc
	this.architecture = 0;

	// Policies
	this.capEx = 0;
	this.futureSocieties = 0;
	this.policies = 0;
	this.subsidiesAndBarriers = 0;
	this.edicts = 0;
	this.war = 0;
	this.food = 0;

	// Forces
	this.peacekeepers = 0;
	this.specialForces = 0;
	this.securityExpansion = 0;

	// Personal Finance
	this.personalBusiness = 0;
	this.PCappearance = 0;
	this.PCactions = 0; // actions involving your body = becoming pregnant; etc.
	this.PCRelationships = 0;
	this.SlaveRelationships = 0;
	this.event = 0; // poker night etc. Try to file things elsewhere if you can.
	this.war = 0;

	// special
	this.multiplier = 0; // decay (from reputation.js)
	this.overflow = 0; // loss above 20k cap
	this.curve = 0; // loss due to income curving
	this.cheating = 0;
	this.weather = 0;

	this.total = 0;
};
