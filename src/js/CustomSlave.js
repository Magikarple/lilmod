/**
 * Contains the parameters for the player's custom slave order.
 * Some members are ignored by huskSlave (particularly mental properties).
 * NOTE: V.customSlave/V.huskSlave IS NOT A SLAVE. Do not treat them like you would treat an instance of SlaveState.
 */
App.Entity.CustomSlaveOrder = class CustomSlaveOrder {
	constructor() {
		/** desired age, approximately
		 * Only certain values are valid; check seCustomSlaveDelivery.tw.
		 * @type {number}
		 */
		this.age = 19;

		/** desired health
		 * 0 = healthy, 1 = extremely healthy
		 * @type {number}
		 */
		this.health = 1;

		/** desired musculature
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.muscles = 0;

		/** desired lips
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.lips = 15;

		/** desired voice
		 * -1 = unimportant; other values as in SlaveState.
		 * @type {number}
		 */
		this.voice = -1;

		/** desired height category
		 * "greatly below average", "below average", "normal", "above average", or "greatly above average"
		 * @type {string}
		 */
		this.heightMod = "normal";

		/** desired weight
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.weight = 0;

		/** desired facial attractiveness
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.face = 0;

		/** desired race
		 * "ethnicity is unimportant" or other values as in SlaveState
		 * @type {string}
		 */
		this.race = "white";

		/** desired skin color
		 * "left natural" or other values as in SlaveState
		 * @type {string}
		 */
		this.skin = "left natural";

		/** desired hair color
		 * "hair color is unimportant" or other values as in SlaveState
		 * @type {string}
		 */
		this.hairColor = "hair color is unimportant";

		/** desired eye color
		 * "eye color is unimportant" or other values as in SlaveState
		 * @type {string}
		 */
		this.eyesColor = "eye color is unimportant";

		/** desired boob size
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.boobs = 500;

		/** desired butt size
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.butt = 3;

		/** desired genetic sex and genitalia
		 * 1 = female (XX), 2 = male (XY), 3 = futanari (XX)
		 * @type {number}
		 */
		this.sex = 1;

		/** virginity required
		 * 0 = yes, 1 = no (and yes, you are reading that correctly)
		 * @type {number}
		 */
		this.virgin = 0;

		/** desired dick and foreskin size, male and futa only
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.dick = 2;

		/** desired balls and scrotum size, male and futa only
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.balls = 2;

		/** desired clit size, female and futa only
		 * Values as in SlaveState.
		 * @type {FC.ClitType}
		 */
		this.clit = 0;

		/** desired labia size, female and futa only
		 * Values as in SlaveState.
		 * @type {FC.LabiaType}
		 */
		this.labia = 0;

		/** desired vaginal lubrication, female and futa only
		 * Values as in SlaveState.
		 * @type {FC.VaginaLubeType}
		 */
		this.vaginaLube = 1;

		/** anal virginity required
		 * 0 = yes, 1 = no (and yes, you are reading that correctly)
		 * @type {number}
		 */
		this.analVirgin = 0;

		/** desired sex skill rating (anal, oral, and vaginal)
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.skills = 15;

		/** desired skills rating (.whore controls both whoring and entertainment, .combat controls combat)
		 * Values as in SlaveState.
		 * @type {{[key: string]: number}}
		 */
		this.skill = {whore: 15, combat: 0};

		/** desired intelligence level
		 * Range -3 to +3 (NOT the same range as SlaveState!)
		 * @type {number}
		 */
		this.intelligence = 0;

		/** desired education
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.intelligenceImplant = 0;

		/** desired nationality
		 * "Nationality is unimportant" or other values as in SlaveState.
		 * @type {string}
		 */
		this.nationality = "Stateless";

		/** desired left and right leg state
		 * @type {{left: App.Entity.LegState, right: App.Entity.LegState}}
		 */
		this.leg = {left: new App.Entity.LegState(), right: new App.Entity.LegState()};

		/** desired left and right arm state
		 * @type {{left: App.Entity.ArmState, right: App.Entity.ArmState}}
		 */
		this.arm = {left: new App.Entity.ArmState(), right: new App.Entity.ArmState()};

		/** desired eye state
		 * Only the "vision" property is used, all others are ignored
		 * @type {App.Entity.EyeState}
		 */
		this.eye = new App.Entity.EyeState();

		/** hearing
		 * Values as in SlaveState.
		 * @type {FC.Hearing}
		 */
		this.hears = 0;

		/** sense of smell
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.smells = 0;

		/** sense of taste
		 * Values as in SlaveState.
		 * @type {number}
		 */
		this.tastes = 0;
	}
};

/**
 * Checks to see if the custom slave has accidentally been turned into an actual slave object.
 * IF THIS FUNCTION RETURNS TRUE, YOU HAVE PROBABLY FUCKED UP A BACKCOMPAT. CHANGE YOUR BACKCOMPAT, NOT THIS FUNCTION!
 * @param {App.Entity.CustomSlaveOrder} slaveOrder
 * @returns {boolean}
 */
App.Utils.IsCustomSlaveMutated = function(slaveOrder) {
	/* ensure the absence of a few properties that slave orders definitely should not have, but every real slave has */
	if (slaveOrder.hasOwnProperty("rules") || slaveOrder.hasOwnProperty("pronoun")) {
		return true;
	/* ensure the presence of a few properties that slave orders definitely should have, but no real slave should */
	} else if (!slaveOrder.hasOwnProperty("age") || !slaveOrder.hasOwnProperty("sex")) {
		return true;
	}
	return false;
};
