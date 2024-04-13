App.Facilities.Pit.init = function() {
	/** @type {FC.Facilities.Pit} */
	V.pit = {
		name: "the Arena",
		// Arena section
		trainingIDs: [],

		// Pit section
		active:false,
		audience: "free",
		decoration: "standard",
		fighterIDs: [],
		fought: false,
		fightsBase: 0,
		seats: 0,
		lethal: 0,
		virginities: "all",
		minimumHealth: true,
		slaveFightingBodyguard: null,
		slavesFighting: null
	};
};
