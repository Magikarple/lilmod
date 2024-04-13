/* eslint-disable no-var */
// @ts-ignore
"use strict";

var App = {}; // eslint-disable-line no-redeclare

// When adding namespace declarations, please consider needs of those using VSCode:
// when you declare App.A{ A1:{}, A2:{} }, VSCode considers A, A1, and A2 to be
// sealed namespaces and no new members are added to them with nested declaration later on.
// This breaks code completion completely. Please instead declare them as:
// App.A = {}; App.A.A1 = {}; App.A.A2 = {}. Thank you.

// Also, such declaration basically required only for namespaces that span more than a single file.

App.Arcology = {};
App.Arcology.Cell = {};
App.Art = {};
App.Art.GenAI = {};
App.Budget = {};
App.Corporate = {};
App.Corporate.Division = {};
App.Corporate.Shared = {};
App.Data = {};
App.Data.Arcology = {};
App.Data.Art = {};
App.Data.FCTV = {};
App.Data.HeroSlaves = {};
App.Data.Medicine = {};
App.Data.Policies = {};
App.Data.Policies.Selection = {};
App.Data.SecExp = {};
App.Data.Slave = {};
App.Data.Weather = {};
App.Debug = {};
App.Desc = {};
App.Desc.Player = {};
App.Encyclopedia = {};
App.EndWeek = {};
App.EndWeek.Player = {};
App.EndWeek.Shared = {};
App.Entity = {};
App.Entity.Utils = {};
App.Events = {};
App.Facilities = {};
App.Facilities.Arcade = {};
App.Facilities.Brothel = {};
App.Facilities.Cellblock = {};
App.Facilities.Clinic = {};
App.Facilities.Club = {};
App.Facilities.Dairy = {};
App.Facilities.Farmyard = {};
App.Facilities.HGSuite = {};
App.Facilities.Incubator = {};
App.Facilities.MasterSuite = {};
App.Facilities.Nursery = {};
App.Facilities.Pit = {};
App.Facilities.Pit.Fights = {};
App.Facilities.Schoolroom = {};
App.Facilities.ServantsQuarters = {};
App.Facilities.Spa = {};
App.Facilities.TransportHub = {};
App.Interact = {};
App.Interact.Sale = {};
App.Intro = {};
App.MainView = {};
App.Markets = {};
App.Medicine = {};
App.Medicine.Modification = {};
App.Medicine.Modification.Brands = {};
App.Medicine.Modification.Select = {};
App.Medicine.OrganFarm = {};
App.Medicine.Salon = {};
App.Medicine.Surgery = {};
App.Medicine.Surgery.Procedures = {};
App.Medicine.Surgery.Reactions = {};
App.Mods = {};
App.Mods.DinnerParty = {};
App.Mods.Drugs = {};
App.Mods.events = {
	nonRandom: [],
	random: {
		individual: [],
		nonindividual: [],
		recruitment: [],
	},
	recruit: [],
};
App.Mods.SecExp = {};
App.Mods.SF = {};
App.Neighbor = {};
App.PersonalAttention = {};
App.Porn = {};
App.RA = {};
App.RA.Activation = {};
App.Ratings = {};
App.SlaveAssignment = {};
App.StartingGirls = {};
App.Status = {};
App.Status.storyReady = false;
App.UI = {};
App.UI.Cheat = {};
App.UI.DOM = {};
App.UI.DOM.Widgets = {};
App.UI.DressingRoom = {};
App.UI.SlaveInteract = {};
App.UI.View = {};
App.Update = {};
App.Utils = {};
App.Utils.Math = {};
