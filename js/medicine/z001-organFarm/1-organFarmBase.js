App.Medicine.OrganFarm.Organ = class {
	/**
	 * @param {object} params
	 * @param {string} params.name - display name
	 * @param {string|function(App.Entity.SlaveState):string} [params.tooltip] - full sentence, uncapitalized and unpunctuated
	 * @param {number} params.cost - how much it costs to grow the organ
	 * @param {number} params.time - how long it takes to grow the organ (without upgrades)
	 * @param {function(App.Entity.SlaveState):boolean} [params.canGrow]
	 * @param {string[]} [params.dependencies] - organs that are implanted first if possible, use type of other organs as values
	 * @param {App.Medicine.OrganFarm.OrganImplantAction[]} [params.actions]
	 * @param {boolean} [params.displayMultipleActions=false] allow multiple implant links to be displayed
	 */
	constructor({
		name, tooltip = "", cost, time, canGrow = () => true, dependencies = [],
		displayMultipleActions = false, actions = []
	}) {
		this.name = name;
		this.tooltip = tooltip;
		this.cost = cost;
		this.time = time;
		/** @type {function(App.Entity.SlaveState):boolean} */
		this.canGrow = canGrow;
		/** @type {string[]} */
		this.dependencies = dependencies;
		this.displayMultipleActions = displayMultipleActions;
		/** @type {App.Medicine.OrganFarm.OrganImplantAction[]} */
		this.implantActions = actions;
	}
};

App.Medicine.OrganFarm.OrganImplantAction = class {
	/**
	 * @param {object} params
	 * @param {string} params.name - display name, shown when showing error (otherwise shows procedure name)
	 * @param {typeof App.Medicine.Surgery.Procedure} params.surgeryProcedure - surgery reaction to show
	 * @param {Array} [params.surgeryProcedureParams] - parameters for surgeryProcedure, the slave argument will be added to the front automatically
	 * @param {boolean} [params.autoImplant]
	 * @param {function(App.Entity.SlaveState):boolean} params.canImplant
	 * @param {function(App.Entity.SlaveState):string} params.implantError - message to show if this action cannot be used
	 */
	constructor({
		name,
		surgeryProcedure,
		surgeryProcedureParams = [],
		autoImplant = true,
		canImplant,
		implantError
	}) {
		this.name = name;
		this.surgeryProcedure = surgeryProcedure;
		this.surgeryProcedureParams = surgeryProcedureParams;
		this.autoImplant = autoImplant;
		/**
		 * True if this action can implant the organ
		 * @type {function(App.Entity.SlaveState):boolean}
		 */
		this.canImplant = canImplant;
		/**
		 * Error message if the organ cannot be implanted.
		 * @type {function(App.Entity.SlaveState):string}
		 */
		this.implantError = implantError;
	}
};
