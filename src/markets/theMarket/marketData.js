/**
 * @typedef {Array<market>} marketCategory
 */

/**
 * @typedef {object} market
 * @property {string} title
 * @property {FC.SlaveMarketName | FC.SpecialMarketName} [marketType]
 * @property {string} [note]
 * @property {string} [encyclopedia]
 * @property {string} [sale]
 * @property {boolean} [bulkAvailable=true] Considered true unless noted otherwise.
 * @property {boolean|string} [requirements] if requirements failed, may return string explaining why
 */

/** @type {{[key: string]: marketCategory}} */
App.Data.Markets = {
	low: [
		{
			title: "Corporate Market",
			marketType: "corporate",
			get note() { return `Slaves from your corporation${V.corp.Market === 1 ? ` purchased at a discounted rate.` : ``}`; },
			encyclopedia: "The Corporation",
			get requirements() { return (V.corp.Incorporated === 1); }
		},
		{
			title: "The Flesh Heap",
			marketType: "heap",
			note: `Broken and discarded slaves. Near useless, but cheap. No longer does bulk orders after complaints.`,
			encyclopedia: "The Flesh Heap",
			bulkAvailable: false
		},
		{
			title: "Order a custom husk slave from the Flesh Heap",
			marketType: `Husk Slave`,
			note: `Will need to be used on arrival.`,
			encyclopedia: "The Flesh Heap",
			bulkAvailable: false,
			get requirements() { return (V.bodyswapAnnounced === 1); }
		},
		{
			title: "Kidnappers' Market",
			marketType: "kidnappers",
			note: `Slaves will tend to be low quality and resistant.`,
			encyclopedia: "Kidnapped Slaves",
			get requirements() { return (V.rep > 500) ? true : `You are not reputable enough to buy kidnapped slaves.`; }
		},
		{
			title: "Runaway Hunters' Market",
			marketType: "hunters",
			note: "Slaves will tend to be skilled but rebellious.",
			encyclopedia: "Kidnapped Slaves",
			get requirements() { return (V.rep > 1000) ? true : `You are not reputable enough to buy recaptured slaves.`; }
		},
		{
			title: "Indentures Market",
			marketType: "indentures",
			note: "Temporary enslavement and restrictions on treatment.",
			encyclopedia: "Indentured Servants",
			get requirements() { return (V.rep > 1500) ? true : `You are not reputable enough to buy indentured servants.`; }
		},
		{
			title: "Raiders' Market",
			marketType: "raiders",
			note: "Slaves will always be sold immediately upon reaching majority.",
			encyclopedia: "Kidnapped Slaves",
			get requirements() { return (V.rep > 2000) ? true : `You are not reputable enough to buy teenaged slaves.`; }
		},
		{
			title: "Raiders' Black Market",
			marketType: "underage raiders",
			note: "Very young slaves.",
			encyclopedia: "Kidnapped Slaves",
			get requirements() {
				if (V.pedo_mode === 0 && V.minimumSlaveAge > 13) {
					return false;
				} else if (V.rep <= 3000) {
					return `You are not reputable enough to buy underaged slaves.`;
				} else { // if (V.pedo_mode === 1 || V.minimumSlaveAge <= 13)
					return true;
				}
			}
		},
		{
			title: "Trainers' Market",
			marketType: "trainers",
			note: "Slaves will tend to be good quality and obedient.",
			encyclopedia: "Stables",
			get requirements() { return (V.rep > 4000) ? true : `You are not reputable enough to buy trained slaves.`; }
		},
		{
			title: "Wetware CPUs",
			marketType: "wetware",
			note: "Ruined bodies but keen minds. Requires some TLC, but offers outstanding training at a discount.",
			encyclopedia: "Wetware CPUs",
			get requirements() { return !FutureSocieties.isActive('FSPaternalist') ? true : `The paternalistic nature of your society blocks the abusive Wetware CPU manufactures from operating within your arcology.`; }
		},
		{
			title: "Prisoner Sale",
			get marketType() { return V.prisonCircuit[V.prisonCircuitIndex]; },
			get note() {
				switch (V.prisonCircuit[V.prisonCircuitIndex]) {
					case "low tier criminals":
						return `Slaves will tend to be low to mid quality with few redeeming factors.`;
					case "gangs and smugglers":
						return `Slaves will tend to be low quality and difficult but may prove useful once broken.`;
					case "white collar":
						return `Slaves will tend to be medium to high quality with a variety of useful backgrounds.`;
					case "military prison":
						return `Slaves will tend to be high quality but defiant.`;
					case "juvenile detention":
						return `Slaves will tend to be young and healthy but defiant.`;
					default:
						return ``;
				}
			},
			get sale() {
				let tw = "This week ";
				switch (V.prisonCircuit[V.prisonCircuitIndex]) {
					case "low tier criminals":
						return tw + `a minor prison is selling inmates.`;
					case "gangs and smugglers":
						return tw + `a major prison is selling hardened criminals.`;
					case "white collar":
						return tw + `a white collar prison is selling inmates.`;
					case "military prison":
						return tw + `a military prison is selling inmates.`;
					case "juvenile detention":
						return tw + `a juvenile detention facility is selling inmates.`;
					default:
						return ``;
				}
			},
			get requirements() { return (V.rep > 5000) ? true : `You are not reputable enough to buy prison slaves.`; }
		},
	],
	schools: [
		{
			title: "The Slavegirl School",
			marketType: "TSS",
			note: "Straightforward slaves with good training.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 100); }
		},
		{
			title: "The Utopian Orphanage",
			marketType: "TUO",
			note: "Intelligent, unspoiled slaves just past their majority.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 100); }
		},
		{
			title: "Growth Research Institute",
			marketType: "GRI",
			note: "Poorly trained slaves with huge assets.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 100); }
		},
		{
			title: "St. Claver Preparatory",
			marketType: "SCP",
			note: "Slaves with basic training and solid implants.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 100); }
		},
		{
			title: "The Cattle Ranch",
			marketType: "TCR",
			note: "Mentally conditioned free-range cowgirls.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 100); }
		},
		{
			title: "The Hippolyta Academy",
			marketType: "HA",
			note: "High quality slaves of powerful physique and refined skills.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 100); }
		},
		{
			title: "L'École des Enculées",
			marketType: "LDE",
			note: "Slaves optimized and trained for anal.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 0); }
		},
		{
			title: "The Gymnasium-Academy",
			marketType: "TGA",
			note: "Well trained slaves with dicks.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 0); }
		},
		{
			title: "The Futanari Sisters",
			marketType: "TFS",
			note: "Highly skilled, highly feminine hermaphrodites.",
			encyclopedia: "Slave Schools",
			get requirements() { return (V.seeDicks !== 0); }
		},
		{
			title: "Nueva Universidad de Libertad",
			marketType: "NUL",
			note: "Androgynous slaves lacking genitalia.",
			encyclopedia: "Slave Schools",
		},
	],
	high: [
		{
			title: "Take in a shelter slave",
			marketType: "Slave Shelter",
			note: "Presents charity cases for a nominal fee.",
			encyclopedia: "Discarded Slaves",
			bulkAvailable: false,
			get requirements() {
				if (FutureSocieties.isActive('FSDegradationist')) {
					return `The Slave Shelter does not place slaves into Degradationist arcologies.`;
				} else if (V.shelterAbuse > 10) {
					return `The Slave Shelter has banned you due to dark rumors about you.`;
				} else if (V.shelterAbuse > 5) {
					return `The Slave Shelter has banned you due to rumors that you resell its slaves.`;
				} else if (V.shelterSlaveBought === 1) {
					return `The Slave Shelter will not offer another slave for placement until next week.`;
				} else if (V.rep > 7000) {
					return true;
				} else {
					return `You are not reputable enough to take in Shelter slaves`;
				}
			}
		},
		{
			title: "Consult the household liquidator",
			marketType: "Household Liquidator",
			note: "Offers slaves close to one another at a very high price.",
			encyclopedia: "Household Liquidations",
			bulkAvailable: false,
			get requirements() { return (V.rep > 8000) ? true : `You are not reputable enough to consult the household liquidator.`; }
		},
		{
			title: "Place a special order",
			marketType: "Custom Slave",
			note: "Customizable but very expensive.",
			encyclopedia: "Kidnapped Slaves",
			bulkAvailable: false,
			get requirements() { return (V.rep > 10000) ? true : `You are not reputable enough to order custom slaves.`; }
		},
		{
			title: "Place a fulfillment order",
			marketType: "JobFulfillmentCenterOrder",
			note: "Fills leaderships roles for a price.",
			encyclopedia: "The Job Fulfillment Center",
			bulkAvailable: false,
			get requirements() { return (V.rep > 10000); }
		},
		{
			title: "Attend an auction of a prestigious slave",
			marketType: "Prestigious Slave",
			note: "Variable and expensive.",
			encyclopedia: "Slave Schools",
			bulkAvailable: false,
			get requirements() { return (V.rep > 12000) ? true : `You are not reputable enough to bid on prestigious slaves.`; }
		},
		{
			title: "Attend an auction of other Elite's stock",
			marketType: "Elite Slave",
			note: "Limited and very expensive.",
			encyclopedia: "Slave Schools",
			bulkAvailable: false,
			get requirements() { return (V.propOutcome === 1); }
		},
		{
			title: "Acquire other slaveowners' stock",
			marketType: "Special Slave",
			note: "Variable and expensive.",
			encyclopedia: "Pre-Owned Slaves",
			bulkAvailable: false,
			get requirements() { return (V.rep > 14000) ? true : `You are not reputable enough to acquire other slaveowners' stock.`; }
		},
	]
};
