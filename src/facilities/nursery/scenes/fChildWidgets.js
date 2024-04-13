App.Facilities.Nursery.fChildOral = function fChildOral(child) {
	"use strict";

	let r = ``;

	actX(child, "oral");// TODO: will this counts towards the total count?

	// TODO: all of this

	return r;
};

App.Facilities.Nursery.fChildVaginal = function fChildVaginal(child) {
	"use strict";

	let r = ``;

	actX(child, "vaginal");// TODO: will this counts towards the total count?

	// TODO: all of this

	return r;
};

App.Facilities.Nursery.fChildAnal = function fChildAnal(child) {
	"use strict";

	let r = ``;

	actX(child, "anal");

	// TODO: all of this

	return r;
};

App.Facilities.Nursery.fChildImpreg = function fChildImpreg(child) {
	const bonus = jsRandom(6, 20);

	let r = ``;

	if (child.mpreg) {
		actX(child, "anal", (bonus + 1));
	} else {
		actX(child, "vaginal", (bonus + 1));
	}

	// TODO: all of this

	return r;
};
