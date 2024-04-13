// I'm thinking of tearing this out of the pregnancy breast growth and instead taking a start point and an end point and then reporting a summation of any noteworthy changes after the physical block of the week.
// Weight would also be relevant for this.
// Maybe even height on growth drugs?
App.EndWeek.Player.bustUp = function(PC, oldCupSize) {
	let outcome = "";

	if (oldCupSize >= 10000) {
		// do nothing
	} else if (oldCupSize >= 9000) {
		if (PC.boobs >= 10000) {
			// wip
		}
	} else if (oldCupSize >= 8500) {
		if (PC.boobs >= 9000) {
			// wip
		}
	} else if (oldCupSize >= 8000) {
		if (PC.boobs >= 8500) {
			// wip
		}
	} else if (oldCupSize >= 7500) {
		if (PC.boobs >= 8000) {
			// wip
		}
	} else if (oldCupSize >= 7000) {
		if (PC.boobs >= 7500) {
			// wip
		}
	} else if (oldCupSize >= 6500) {
		if (PC.boobs >= 7000) {
			// wip
		}
	} else if (oldCupSize >= 5500) {
		if (PC.boobs >= 6500) {
			// wip
		}
	} else if (oldCupSize >= 5100) {
		if (PC.boobs >= 5500) {
			// wip
		}
	} else if (oldCupSize >= 4700) {
		if (PC.boobs >= 5100) {
			// wip
		}
	} else if (oldCupSize >= 4300) {
		if (PC.boobs >= 4700) {
			// wip
		}
	} else if (oldCupSize >= 3950) {
		if (PC.boobs >= 4300) {
			// wip
		}
	} else if (oldCupSize >= 3600) {
		if (PC.boobs >= 3950) {
			// wip
		}
	} else if (oldCupSize >= 3250) {
		if (PC.boobs >= 3600) {
			// wip
		}
	} else if (oldCupSize >= 2900) {
		if (PC.boobs >= 3250) {
			// wip
		}
	} else if (oldCupSize >= 2600) {
		if (PC.boobs >= 2900) {
			// wip
		}
	} else if (oldCupSize >= 2300) {
		if (PC.boobs >= 2600) {
			// wip
		}
	} else if (oldCupSize >= 2050) {
		if (PC.boobs >= 2300) {
			// wip
		}
	} else if (oldCupSize >= 1800) {
		if (PC.boobs >= 2050) {
			// wip
		}
	} else if (oldCupSize >= 1600) {
		if (PC.boobs >= 1800) {
			// wip
		}
	} else if (oldCupSize >= 1400) {
		if (PC.boobs >= 1600) {
			// wip
		}
	} else if (oldCupSize >= 1200) {
		if (PC.boobs >= 1400) {
			outcome = `Your desk is steadily starting to disappear; <span class="change positive">H-cups will do that.</span>`;
		}
	} else if (oldCupSize >= 1000) {
		if (PC.boobs >= 1200) {
			outcome = `Nothing fits comfortably now; your tailor says <span class="change positive">it's your G-cup knockers.</span> Your back agrees.`;
		}
	} else if (oldCupSize >= 800) {
		if (PC.boobs >= 1000) {
			outcome = `You popped your bra when you put it on; <span class="change positive">time to order some F-cups.</span>`;
		}
	} else if (oldCupSize >= 650) {
		if (PC.boobs >= 800) {
			outcome = `Their prominence, and a quick measuring, reveals <span class="change positive">you now sport DDs.</span>`;
		}
	} else if (oldCupSize >= 500) {
		if (PC.boobs >= 650) {
			outcome = `They're big, sensitive, <span class="change positive">and now a D-cup.</span>`;
		}
	} else if (oldCupSize >= 400) {
		if (PC.boobs >= 500) {
			outcome = `They spill dramatically out of your bra now, which means <span class="change positive">you've graduated to a C-cup.</span>`;
		}
	} else if (oldCupSize >= 300) {
		if (PC.boobs >= 400) {
			outcome = `A quick measuring after your top started to feel too constricting reveals <span class="change positive">you are now a B-cup!</span>`;
		}
	} else {
		if (PC.boobs >= 300) {
			outcome = `They've gotten so big that <span class="change positive">you can now fill an A-cup bra.</span>`;
		}
	}
	return outcome;
};
