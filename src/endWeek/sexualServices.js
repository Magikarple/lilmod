/**
 * @param {ParentNode} renderContainer
 */
App.EndWeek.computeSexualServicesModel = function(renderContainer) {
	const arcology = V.arcologies[0];

	/* Sexual services demand per class */
	/* We can add milk etc. to this as well, though this is a good that can be traded beyond the arcology and also needs its own market much like the slave market. TODO: */
	/* In the default scenario these numbers indicate the amount of money each individual citizen of a particular class is looking to spend on sex (and milk) every week
	Depending on the conditions they may derive more or less 'utility' out of their credits spent
	i.e. a highly paternalist arcology with little choice for its lower class but Fuckdolls may still put money into them but not get the same satisfaction out of it*/
	/* Low rent increases demand/available money for sexual services, high rent decreases it */
	if (V.brothelBoost.selected > 0 && V.rep < V.brothelBoost.selected * 500 + 2000) {
		V.brothelBoost.eligible = Math.trunc((V.rep - 2000) / 500);
		if (V.brothelBoost.eligible < 0) {
			V.brothelBoost.eligible = 0;
		}
	} else {
		V.brothelBoost.eligible = V.brothelBoost.selected;
	}
	repX(forceNeg(50 * V.brothelBoost.eligible), "brothel");

	let lowerClassSexDemand = Math.trunc(V.lowerClass * V.whoreBudget.lowerClass) * 2;
	let lowerClassSexDemandRef = Math.max(lowerClassSexDemand, 1);
	let visitorsSexDemand = Math.trunc(V.visitors) * 40;
	let middleClassSexDemand = Math.trunc(V.middleClass * V.whoreBudget.middleClass + visitorsSexDemand * 0.5) * 2;
	let middleClassSexDemandRef = Math.max(middleClassSexDemand, 1);
	let upperClassSexDemand = Math.trunc(V.upperClass * V.whoreBudget.upperClass + visitorsSexDemand * 0.5) * 2;
	let upperClassSexDemandRef = Math.max(upperClassSexDemand, 1);
	let topClassSexDemand = Math.trunc(V.topClass * V.whoreBudget.topClass) * 2;
	let topClassSexDemandRef = Math.max(topClassSexDemand, 1);
	let arcadeSupply = {lowerClass: 0, middleClass: 0, upperClass: 0};
	let clubSupply = {lowerClass: 0, middleClass: 0};

	App.EndWeek.saVars.whorePriceAdjustment = {
		lowerClass: 0, middleClass: 0, upperClass: 0, topClass: 0
	};
	V.NPCMarketShare = {
		lowerClass: 0, middleClass: 0, upperClass: 0, topClass: 0
	};
	V.sexDemandResult = {
		lowerClass: 0, middleClass: 0, upperClass: 0, topClass: 0
	};
	App.EndWeek.saVars.slaveJobValues = slaveJobValues(lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef);
	const sjv = App.EndWeek.saVars.slaveJobValues;

	let lowerClassArcadeSexDemand = 0;
	let middleClassArcadeSexDemand = 0;
	let upperClassArcadeSexDemand = 0;
	let arcadeDemand = 0;
	let arcadeDemandDeg = 0;
	// Arcade Specific Demand for Degradationists to give it higher priority
	if (arcology.FSDegradationist > 0) {
		lowerClassArcadeSexDemand = Math.trunc(lowerClassSexDemand * arcology.FSDegradationist * 0.0015);
		middleClassArcadeSexDemand = Math.trunc(middleClassSexDemand * arcology.FSDegradationist * 0.0002);
		upperClassArcadeSexDemand = Math.trunc(upperClassSexDemand * arcology.FSDegradationist * 0.000025);
		arcadeDemandDeg = lowerClassArcadeSexDemand + middleClassArcadeSexDemand + upperClassArcadeSexDemand;
		if (arcology.FSDegradationistLaw === 1) {
			arcadeDemandDeg += V.ASlaves * 3;
		}
		if (sjv.arcade < arcadeDemandDeg) {
			if (arcadeDemandDeg > 20000 || arcology.FSDegradationist > 50) {
				const degradationistPenalty = ((arcadeDemandDeg - sjv.arcade) / arcadeDemandDeg);
				arcology.FSDegradationist -= Math.trunc(5 * degradationistPenalty);
				repX(forceNeg(100 * degradationistPenalty), "futureSocieties");
				V.arcadeDemandDegResult = degradationistPenalty > 0.5 ? 1 : 2;
			} else {
				V.arcadeDemandDegResult = 3;
			}
			arcadeSupply.lowerClass += Math.trunc(1.15 * sjv.arcade * (lowerClassArcadeSexDemand / arcadeDemandDeg));
			lowerClassSexDemand -= arcadeSupply.lowerClass;
			arcadeSupply.middleClass += Math.trunc(1.15 * sjv.arcade * (middleClassArcadeSexDemand / arcadeDemandDeg));
			middleClassSexDemand -= arcadeSupply.middleClass;
			arcadeSupply.upperClass += Math.trunc(1.15 * sjv.arcade * (upperClassArcadeSexDemand / arcadeDemandDeg));
			upperClassSexDemand -= arcadeSupply.upperClass; // There's a 15% satisfaction bonus from getting release in a societally approved way
		} else {
			if (sjv.arcade >= arcadeDemandDeg * 1.5) {
				arcology.FSDegradationist += 2;
				V.arcadeDemandDegResult = 4;
				repX(500, "futureSocieties");
			} else {
				V.arcadeDemandDegResult = 5;
			}
			arcadeSupply.lowerClass += Math.trunc(1.15 * lowerClassArcadeSexDemand);
			lowerClassSexDemand -= arcadeSupply.lowerClass;
			arcadeSupply.middleClass += Math.trunc(1.15 * middleClassArcadeSexDemand);
			middleClassSexDemand -= arcadeSupply.middleClass;
			arcadeSupply.upperClass += Math.trunc(1.15 * upperClassArcadeSexDemand);
			upperClassSexDemand -= arcadeSupply.upperClass;
		}
	}

	// Public slut sex supply. Top and upper class won't partake
	let clubDemand = lowerClassSexDemand + middleClassSexDemand;
	let lowerClassClubRatio = lowerClassSexDemand / clubDemand;
	let middleClassClubRatio = middleClassSexDemand / clubDemand;

	if (sjv.club * sjv.clubSP < clubDemand) {
		lowerClassSexDemand -= Math.trunc(sjv.club * sjv.clubSP * lowerClassClubRatio);
		middleClassSexDemand -= Math.trunc(sjv.club * sjv.clubSP * middleClassClubRatio);
	} else {
		lowerClassSexDemand = 0;
		middleClassSexDemand = 0;
	}

	clubSupply.lowerClass = Math.trunc(sjv.club * sjv.clubSP * lowerClassClubRatio);
	clubSupply.middleClass = Math.trunc(sjv.club * sjv.clubSP * middleClassClubRatio);

	// Brothel or street whore sex supply
	if (lowerClassSexDemand < sjv.brothel.lowerClass) {
		App.EndWeek.saVars.whorePriceAdjustment.lowerClass = Math.max(Math.pow(lowerClassSexDemand / (sjv.brothel.lowerClass + V.NPCSexSupply.lowerClass), 1.513), 0.3);
		lowerClassSexDemand = 0; // This accounts for people having too much choice and getting more picky how they spend their money
	} else {
		App.EndWeek.saVars.whorePriceAdjustment.lowerClass = Math.pow(lowerClassSexDemand / (sjv.brothel.lowerClass + V.NPCSexSupply.lowerClass), 0.5);
		lowerClassSexDemand -= sjv.brothel.lowerClass; // People are willing to pay more for a scarce good, but within reason
	}
	if (middleClassSexDemand < sjv.brothel.middleClass) {
		App.EndWeek.saVars.whorePriceAdjustment.middleClass = Math.max(Math.pow((middleClassSexDemand * 1.1) / (sjv.brothel.middleClass + V.NPCSexSupply.middleClass), 1.513), 0.33);
		middleClassSexDemand = 0;
	} else {
		App.EndWeek.saVars.whorePriceAdjustment.middleClass = Math.pow((middleClassSexDemand * 1.1) / (sjv.brothel.middleClass + V.NPCSexSupply.middleClass), 0.5);
		middleClassSexDemand -= sjv.brothel.middleClass;
	}
	if (upperClassSexDemand < sjv.brothel.upperClass) {
		App.EndWeek.saVars.whorePriceAdjustment.upperClass = Math.max(Math.pow((upperClassSexDemand * 1.21) / (sjv.brothel.upperClass + V.NPCSexSupply.upperClass), 1.513), 0.363);
		upperClassSexDemand = 0;
	} else {
		App.EndWeek.saVars.whorePriceAdjustment.upperClass = Math.pow((upperClassSexDemand * 1.21) / (sjv.brothel.upperClass + V.NPCSexSupply.upperClass), 0.5);
		upperClassSexDemand -= sjv.brothel.upperClass;
	}
	if (topClassSexDemand < sjv.brothel.topClass) {
		App.EndWeek.saVars.whorePriceAdjustment.topClass = Math.max(Math.pow((topClassSexDemand * 1.331) / (sjv.brothel.topClass + V.NPCSexSupply.topClass), 1.513), 0.3993);
		topClassSexDemand = 0;
	} else {
		App.EndWeek.saVars.whorePriceAdjustment.topClass = Math.pow((topClassSexDemand * 1.331) / (sjv.brothel.topClass + V.NPCSexSupply.topClass), 0.5);
		topClassSexDemand -= sjv.brothel.topClass;
	}

	// Price for sex in the arcade or at a glory hole
	if (arcology.FSPaternalist > 0) {
		arcadeDemand = Math.max((arcadeDemandDeg + lowerClassSexDemand) * (1 - arcology.FSPaternalist / 50), 0); // Paternalists sap demand for the arcade
	} else {
		arcadeDemand = arcadeDemandDeg + lowerClassSexDemand;
	}
	if (sjv.arcade + V.NPCSexSupply.lowerClass > 0) {
		V.arcadePrice = Math.clamp(Math.pow((arcadeDemand / (sjv.arcade + V.NPCSexSupply.lowerClass)), 0.5), 0.5, 3); // This calculates the price charged per fuck
	} else {
		V.arcadePrice = 0.5; // minimum price no matter what
	}

	// Arcade usage beyond degradationist demand
	if (sjv.arcade > arcadeDemandDeg) {
		sjv.arcade -= arcadeDemandDeg;
	} else {
		sjv.arcade = 0;
	}
	if (sjv.arcade > lowerClassSexDemand) {
		lowerClassSexDemand = 0;
	} else {
		lowerClassSexDemand -= sjv.arcade;
	}
	arcadeSupply.lowerClass += sjv.arcade;

	// NPC sex supply
	V.NPCSexSupply = NPCSexSupply(lowerClassSexDemand, lowerClassSexDemandRef, middleClassSexDemand, middleClassSexDemandRef, upperClassSexDemand, upperClassSexDemandRef, topClassSexDemand, topClassSexDemandRef);
	V.NPCMarketShare.lowerClass = Math.trunc((V.NPCSexSupply.lowerClass * 1000) / lowerClassSexDemandRef);
	V.NPCMarketShare.middleClass = Math.trunc((V.NPCSexSupply.middleClass * 1000) / middleClassSexDemandRef);
	V.NPCMarketShare.upperClass = Math.trunc((V.NPCSexSupply.upperClass * 1000) / upperClassSexDemandRef);
	V.NPCMarketShare.topClass = Math.trunc((V.NPCSexSupply.topClass * 1000) / topClassSexDemandRef);
	if (lowerClassSexDemand < V.NPCSexSupply.lowerClass) {
		lowerClassSexDemand = 0;
	} else {
		lowerClassSexDemand -= V.NPCSexSupply.lowerClass;
	}

	if (middleClassSexDemand < V.NPCSexSupply.middleClass) {
		middleClassSexDemand = 0;
	} else {
		middleClassSexDemand -= V.NPCSexSupply.middleClass;
	}

	if (upperClassSexDemand < V.NPCSexSupply.upperClass) {
		upperClassSexDemand = 0;
	} else {
		upperClassSexDemand -= V.NPCSexSupply.upperClass;
	}

	if (topClassSexDemand < V.NPCSexSupply.topClass) {
		topClassSexDemand = 0;
	} else {
		topClassSexDemand -= V.NPCSexSupply.topClass;
	}

	if (V.cheatMode === 1 || V.debugMode === 1) {
		_printDebugInfo(renderContainer);
	}

	// Sexual satisfaction effects
	V.sexDemandResult.lowerClass = Math.trunc(((V.NPCSexSupply.lowerClass + sjv.brothel.lowerClass + clubSupply.lowerClass + arcadeSupply.lowerClass) * 1000) / lowerClassSexDemandRef);
	V.sexDemandResult.middleClass = Math.trunc(((V.NPCSexSupply.middleClass + sjv.brothel.middleClass + clubSupply.middleClass + arcadeSupply.middleClass) * 1000) / middleClassSexDemandRef);
	V.sexDemandResult.upperClass = Math.trunc(((V.NPCSexSupply.upperClass + sjv.brothel.upperClass + arcadeSupply.upperClass) * 1000) / upperClassSexDemandRef);
	V.sexDemandResult.topClass = Math.trunc(((V.NPCSexSupply.topClass + sjv.brothel.topClass) * 1000) / topClassSexDemandRef);

	if (V.sexDemandResult.lowerClass < 400) { // You are providing < 40% of their desired amount of sex
		if (V.week <= 30) {
			V.classSatisfied.lowerClass = 0;
		} else {
			V.classSatisfied.lowerClass = -1;
		}
	} else if (V.sexDemandResult.lowerClass < 600) { // You are providing between 40 and 60% of their desired amount of sex
		if (V.week <= 40) {
			V.classSatisfied.lowerClass = 1;
		} else if (V.week <= 60) {
			V.classSatisfied.lowerClass = 0;
		} else {
			V.classSatisfied.lowerClass = -1;
		}
	} else if (V.sexDemandResult.lowerClass < 800) { // You are providing between 60 and 80% of their desired amount of sex
		if (V.week <= 50) {
			V.classSatisfied.lowerClass = 1;
		} else {
			V.classSatisfied.lowerClass = 0;
		}
	} else if (V.sexDemandResult.lowerClass === 1000) { // You are providing 100% or more of their desired amount of sex
		V.classSatisfied.lowerClass = 2;
	} else { // You are providing > 80% of their desired amount of sex
		V.classSatisfied.lowerClass = 1;
	}

	if (V.sexDemandResult.middleClass < 400) { // You are providing < 40% of their desired amount of sex
		if (V.week <= 30) {
			V.classSatisfied.middleClass = 0;
		} else {
			V.classSatisfied.middleClass = -1;
		}
	} else if (V.sexDemandResult.middleClass < 600) { // You are providing between 40 and 60% of their desired amount of sex
		if (V.week <= 40) {
			V.classSatisfied.middleClass = 1;
		} else if (V.week <= 60) {
			V.classSatisfied.middleClass = 0;
		} else {
			V.classSatisfied.middleClass = -1;
		}
	} else if (V.sexDemandResult.middleClass < 800) { // You are providing between 60 and 80% of their desired amount of sex
		if (V.week <= 50) {
			V.classSatisfied.middleClass = 1;
		} else {
			V.classSatisfied.middleClass = 0;
		}
	} else if (V.sexDemandResult.middleClass === 1000) { // You are providing 100% or more of their desired amount of sex
		V.classSatisfied.middleClass = 2;
	} else { // You are providing > 80% of their desired amount of sex
		V.classSatisfied.middleClass = 1;
	}

	if (V.sexDemandResult.upperClass < 400) { // You are providing < 40% of their desired amount of sex
		if (V.week <= 30) {
			V.classSatisfied.upperClass = 0;
		} else {
			V.classSatisfied.upperClass = -1;
		}
	} else if (V.sexDemandResult.upperClass < 600) { // You are providing between 40 and 60% of their desired amount of sex
		if (V.week <= 40) {
			V.classSatisfied.upperClass = 1;
		} else if (V.week <= 60) {
			V.classSatisfied.upperClass = 0;
		} else {
			V.classSatisfied.upperClass = -1;
		}
	} else if (V.sexDemandResult.upperClass < 800) { // You are providing between 60 and 80% of their desired amount of sex
		if (V.week <= 50) {
			V.classSatisfied.upperClass = 1;
		} else {
			V.classSatisfied.upperClass = 0;
		}
	} else if (V.sexDemandResult.upperClass === 1000) { // You are providing 100% or more of their desired amount of sex
		V.classSatisfied.upperClass = 2;
	} else { // You are providing > 80% of their desired amount of sex
		V.classSatisfied.upperClass = 1;
	}

	if (V.sexDemandResult.topClass < 400) { // You are providing < 40% of their desired amount of sex
		if (V.week <= 30) {
			V.classSatisfied.topClass = 0;
		} else {
			V.classSatisfied.topClass = -1;
		}
	} else if (V.sexDemandResult.topClass < 600) { // You are providing between 40 and 60% of their desired amount of sex
		if (V.week <= 40) {
			V.classSatisfied.topClass = 1;
		} else if (V.week <= 60) {
			V.classSatisfied.topClass = 0;
		} else {
			V.classSatisfied.topClass = -1;
		}
	} else if (V.sexDemandResult.topClass < 800) { // You are providing between 60 and 80% of their desired amount of sex
		if (V.week <= 50) {
			V.classSatisfied.topClass = 1;
		} else {
			V.classSatisfied.topClass = 0;
		}
	} else if (V.sexDemandResult.topClass === 1000) { // You are providing 100% or more of their desired amount of sex
		V.classSatisfied.topClass = 2;
	} else { // You are providing > 80% of their desired amount of sex
		V.classSatisfied.topClass = 1;
	}

	/**
	 * @param {ParentNode} c
	 */
	function _printDebugInfo(c) {
		App.UI.DOM.appendNewElement("div", c, "Slave services supply and demand this week:");

		const table = App.UI.DOM.appendNewElement("table", c, null, "finance");
		table.style.border = "1";
		const titleRow = App.UI.DOM.appendNewElement("tr", table);
		titleRow.style.textAlign = "center";
		const tcl = App.UI.DOM.appendNewElement("th", titleRow, "Client's class");
		tcl.style.textAlign = "right";
		App.UI.DOM.appendNewElement("th", titleRow, "Lower");
		App.UI.DOM.appendNewElement("th", titleRow, "Middle");
		App.UI.DOM.appendNewElement("th", titleRow, "Upper");
		App.UI.DOM.appendNewElement("th", titleRow, "Top");

		/**
		 *
		 * @param {string} caption
		 * @param {number} [lower]
		 * @param {number} [middle]
		 * @param {number} [upper]
		 * @param {number} [top]
		 */
		function numericRow(caption, lower, middle, upper, top) {
			const row = App.UI.DOM.appendNewElement("tr", table);
			row.align = "right";
			App.UI.DOM.appendNewElement("td", row, caption);
			App.UI.DOM.appendNewElement("td", row, lower == null ? "N/A" : commaNum(lower));
			App.UI.DOM.appendNewElement("td", row, middle == null ? "N/A" : commaNum(middle));
			App.UI.DOM.appendNewElement("td", row, upper == null ? "N/A" : commaNum(upper));
			App.UI.DOM.appendNewElement("td", row, top == null ? "N/A" : commaNum(top));
		}

		numericRow("Demand", lowerClassSexDemandRef, middleClassSexDemandRef, upperClassSexDemandRef, topClassSexDemandRef);
		numericRow("Brothel Supply", sjv.brothel.lowerClass, sjv.brothel.middleClass, sjv.brothel.upperClass, sjv.brothel.topClass);
		if (clubSupply.lowerClass || clubSupply.middleClass) {
			numericRow("Club Supply", clubSupply.lowerClass, clubSupply.middleClass);
		}
		if (arcadeSupply.lowerClass || arcadeSupply.middleClass || arcadeSupply.upperClass) {
			numericRow("Arcade Supply", arcadeSupply.lowerClass, arcadeSupply.middleClass, arcadeSupply.upperClass);
		}
		numericRow("NPC Supply", V.NPCSexSupply.lowerClass, V.NPCSexSupply.middleClass, V.NPCSexSupply.upperClass, V.NPCSexSupply.topClass);
		numericRow("Unsatisfied", lowerClassSexDemand, middleClassSexDemand, upperClassSexDemand, topClassSexDemand);
	}
};
