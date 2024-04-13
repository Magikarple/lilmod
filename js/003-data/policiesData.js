/**
 * @typedef {object} PolicySelector
 * @property {string} title The title of the policy as displayed in the UI, "Health Inspection SMR"
 * @property {string} [titleClass] The class to apply to the title: "lime"
 * @property {string} [activatedTitle] The title of the policy if the policy is active. Param "title" is used as a fallback.
 * @property {string|DocumentFragment} text Text that describes the policy in detail. No initial cap, ends with punctuation.
 * @property {string} [activatedText] Text that describes an active policy in detail. Uses param "text" as a fallback.
 * @property {boolean} [requirements] Function to determine if a policy can be enabled.
 * @property {function(void):void} [onImplementation] Beyond applying the policy itself and billing the player, are there other values to change? This allows a shortstack FS policy to revoke some generic tall policies, for example.
 * @property {function(void):void} [onRepeal] same as onImplementation, but fires when a policy is repealed.
 * @property {number|string} [enable] Value to enable a policy. Defaults to 1 if not defined.
 * @property {object} [hide] Object controlling special hide settings that can hide parts of the policy if needed.
 * @property {number} [hide.button] Hides the appeal/repeal button if 1
 * @property {number} [hide.ifActivated] 1: Hides the entire policy if the policy is applied. 0: Hides if policy is disabled.
 * @property {string} [note] Note that appears at the end of the policy display in italics to present further information. Starts with cap, no punctuation at end.
 * @property {string} [activatedNote] Note that appears if policy is activated. Please note that unlike the other "activated" categories, "note" is only displayed on deactivated policies. There is no fallback.
 */
/**
 * @typedef {{[key: string]: PolicySelector[]}} PolicySelectorGroup
 * Key names represent a piece of the variable. "policies.SMR.basicSMR" will be checked against "V.policies.SMR.basicSMR". "arcologies[0].FSEgyptianRevivalistIncestPolicy" will be checked against "V.arcologies[0].FSEgyptianRevivalistIncestPolicy".
 */

/** @type {{[key: string]: PolicySelectorGroup}} */
App.Data.Policies.Selection = {
	SMR: {
		"policies.SMR.basicSMR": [
			{
				title: "Basic SMR",
				text: "the slave market is subject to very basic regulations designed to offer buyers some confidence.",
				note: "Will help your reputation and affect slaves in the markets"
			}
		],

		"policies.SMR.healthInspectionSMR": [
			{
				title: "Health Inspection SMR",
				text: "in order to be sold in the slave market, chattel must pass a straightforward health inspection.",
				note: "Will improve the health of slaves in the markets"
			}
		],

		"policies.SMR.educationSMR": [
			{
				title: "Basic Education SMR",
				text: "in order to be sold in the slave market, chattel must be put through a straightforward course of slave education.",
				note: "Will cause all slaves who pass through the markets to become educated"
			}
		],

		"policies.SMR.frigiditySMR": [
			{
				title: "Frigidity SMR",
				text: "in order to be sold in the slave market, slaves must have their sex drives reduced until they're virtually gone.",
				note: "Will reduce the sex drive of slaves in the markets and annoy those looking for sex slaves"
			}
		],

		"policies.SMR.eugenics.intelligenceSMR": [
			{
				title: "Intelligence Eugenics SMR",
				text: "in order to be sold in the slave market, chattel must either pass a challenging intelligence test or be sterilized.",
				get note() {
					let text = "Will ";
					if (V.seeDicks === 0) {
						text += "sterilize ";
					} else if (V.seeDicks === 100) {
						if (V.seeExtreme === 0) {
							text += "chemically castrate ";
						} else {
							text += "geld ";
						}
					} else {
						text += "sterilize or ";
						if (V.seeExtreme === 0) {
							text += "chemically castrate ";
						} else {
							text += "geld ";
						}
					}
					text += " all market slaves below the maximum intelligence level.";
					return text;
				}
			}
		],

		"policies.SMR.eugenics.heightSMR": [
			{
				title: "Height Eugenics SMR",
				text: "in order to be sold in the slave market, chattel must either be taller than a very tall minimum height or be sterilized.",
				get note() {
					let text = "Will ";
					if (V.seeDicks === 0) {
						text += "sterilize ";
					} else if (V.seeDicks === 100) {
						if (V.seeExtreme === 0) {
							text += "chemically castrate ";
						} else {
							text += "geld ";
						}
					} else {
						text += "sterilize or ";
						if (V.seeExtreme === 0) {
							text += "chemically castrate ";
						} else {
							text += "geld ";
						}
					}
					text += " all market slaves below the maximum height.";
					return text;
				}
			}
		],

		"policies.SMR.eugenics.faceSMR": [
			{
				title: "Facial Eugenics SMR",
				text: "in order to be sold in the slave market, chattel must either pass a rigorous facial exam or be sterilized.",
				get note() {
					let text = "Will ";
					if (V.seeDicks === 0) {
						text += "sterilize ";
					} else if (V.seeDicks === 100) {
						if (V.seeExtreme === 0) {
							text += "chemically castrate ";
						} else {
							text += "geld ";
						}
					} else {
						text += "sterilize or ";
						if (V.seeExtreme === 0) {
							text += "chemically castrate ";
						} else {
							text += "geld ";
						}
					}
					text += " all market slaves below the maximum facial beauty.";
					return text;
				}
			}
		],

		"policies.SMR.honestySMR": [
			{
				title: "Gingering Prohibition SMR",
				text: "slave sellers must contract to provide slaves honestly and without drugging to improve their behavior.",
				note: "Will prevent dishonest adulteration of slaves in the markets"
			}
		],

		"policies.SMR.beauty.basicSMR": [
			{
				title: "Basic Beauty Standards",
				text: "no unattractive slaves may be sold in the slave markets.",
				get requirements() { return (V.policies.SMR.beauty.qualitySMR === 0); },
				note: "This will raise the price of slaves"
			}
		],

		"policies.SMR.beauty.qualitySMR": [
			{
				title: "Quality Beauty Standards",
				text: "only attractive slaves may be sold in the slave markets.",
				get requirements() { return (V.policies.SMR.beauty.basicSMR === 0); },
				note: "This will raise the price of slaves"
			}
		],

		"policies.SMR.weightSMR": [
			{
				title: "Basic Weight Standards",
				text: "no obese slaves may be sold in the slave markets.",
				note: "This will raise the price of slaves"
			}
		],

		"policies.SMR.height.basicSMR": [
			{
				title: "Basic Height Standards (Tall)",
				text: "tall slaves will be favored in the slave markets and those not quite tall enough will undergo height increasing surgery. This will not preclude the sale of short slaves, just the care of them.",
				activatedText: "tall slaves are favored in the slave market, short slaves capable of meeting height standards via surgery must undergo it.",
				get requirements() { return (V.policies.SMR.height.advancedSMR === 0); },
				note: "This will raise the price of slaves"
			},
			{
				title: "Basic Height Standards (Short)",
				text: "short slaves are favored in the slave market, tall slaves capable of meeting height standards via surgery must undergo it.",
				activatedText: "short slaves will be favored in the slave markets and those just above the cut off will undergo height reducing surgery. This will not preclude the sale of tall slaves, just the care of them.",
				get requirements() { return (V.policies.SMR.height.advancedSMR === 0); },
				enable: -1,
				note: "This will raise the price of slaves"
			}
		],

		"policies.SMR.height.advancedSMR": [
			{
				title: "Quality Height Standards (Tall)",
				text: "only slaves of above average height for their age may be sold in the slave markets.",
				activatedText: "no slaves of below average height for their age may be sold in the slave markets.",
				get requirements() {
					return (
						V.policies.SMR.height.basicSMR === 0 &&
						V.arcologies[0].FSPetiteAdmirationSMR === 0 &&
						V.arcologies[0].FSStatuesqueGlorificationSMR === 0
					);
				},
				note: "This will raise the price of slaves"
			},
			{
				title: "Quality Height Standards (Short)",
				text: "no slaves of above average height for their age may be sold in the slave markets.",
				activatedText: "no slaves of average height for their age may be sold in the slave markets.",
				get requirements() {
					return (
						V.policies.SMR.height.basicSMR === 0 &&
						V.arcologies[0].FSPetiteAdmirationSMR === 0 &&
						V.arcologies[0].FSStatuesqueGlorificationSMR === 0
					);
				},
				enable: -1,
				note: "This will raise the price of slaves"
			}
		],

		"policies.SMR.intelligence.basicSMR": [
			{
				title: "Basic Intelligence Standards",
				text: "no stupid slaves may be sold in the slave markets.",
				get requirements() {
					return (
						V.arcologies[0].FSIntellectualDependencySMR === 0 &&
						V.policies.SMR.intelligence.qualitySMR === 0
					);
				},
				note: "This will raise the price of slaves and exclude quality standards"
			}
		],

		"policies.SMR.intelligence.qualitySMR": [
			{
				title: "Quality Intelligence Standards",
				text: "only intelligent slaves may be sold in the slave markets.",
				get requirements() {
					return (
						V.arcologies[0].FSIntellectualDependencySMR === 0 &&
						V.policies.SMR.intelligence.basicSMR === 0
					);
				},
				note: "This will raise the price of slaves significantly"
			}
		],
	},
	SexualTrendsetting: {
		"policies.oralAppeal": [
			{
				title: "Oral Sex Encouragement",
				text: "you will use your personal influence to make blowjobs the most fashionable sex act in the arcology.",
				activatedText: "you are using your personal influence to make blowjobs the most fashionable sex act in the arcology.",
				note: "Will increase the weight on slaves' oral skills"
			},
			{
				title: "Anti-Oral Campaign",
				text: "you will use your personal influence to denigrate oral sex.",
				activatedText: "you are using your personal influence to denigrate oral sex.",
				enable: -1,
				note: "Will decrease the weight on slaves' oral skills"
			}
		],
		"policies.vaginalAppeal": [
			{
				title: "Vaginal Sex Encouragement",
				text: "you will use your personal influence to keep pussies the most fashionable holes in the arcology.",
				activatedText: "you are using your personal influence to keep pussies the most fashionable holes in the arcology.",
				note: "Will increase the weight on slaves' vaginal skills"
			},
			{
				title: "Anti-Vaginal Campaign",
				text: "you will use your personal influence to communicate disapproval of vaginal sex.",
				activatedText: "you are using your personal influence to communicate disapproval of vaginal sex.",
				enable: -1,
				note: "Will decrease the weight on slaves' vaginal skills"
			}
		],
		"policies.analAppeal": [
			{
				title: "Anal Sex Encouragement",
				text: "you will use your personal influence to make anuses the most fashionable holes in the arcology.",
				activatedText: "you are using your personal influence to make anuses the most fashionable holes in the arcology.",
				note: "Will increase the weight on slaves' anal skills"
			},
			{
				title: "Anti-Anal Campaign",
				text: "you will use your personal influence to communicate disgust with putting things up the butt.",
				activatedText: "you are using your personal influence to communicate disgust with putting things up the butt.",
				enable: -1,
				note: "Will decrease the weight on slaves' anal skills"
			}
		],
		"policies.sexualOpenness": [
			{
				title: "Penetrative Sex Campaign",
				text: "you will use your personal influence and interest in being penetrated to make slave based penetration fashionable and acceptable.",
				activatedText: "you are using your personal influence and interest in being penetrated to make slave based penetration fashionable and acceptable.",
				note: "Will not be well received, but will head off potentially damaging rumors. This policy assumes you wish to be penetrated"
			}
		],
		"policies.childProtectionAct": [
			{
				title: "Child Protection Act",
				text: `underage slaves enjoy protections only against penetrative sex.`,
				activatedText: `underage slaves enjoy protections against molestation and rape.`,
				get requirements() { return (V.extremeUnderage === 1); },
				get hide() { return (V.extremeUnderage === 1) ? {button: 0} : {button: 1}; } // CPA is complicated. It inits to "on". Make sure button is hidden if extreme underage is OFF. If a player enables extreme underage, then we can let them control it.
			}
		],
		"policies.idealAge": [
			{
				title: "Age Of Sexual Appeal",
				get text() {
					const el = new DocumentFragment();
					if (V.idealAge === 18) {
						el.append(`many consider the most sexually appealing age to be the old world default of ${num(18)}. You will use your influence to change the sexual ideal to `);
					} else {
						el.append(`many consider the most sexually appealing age to be ${num(V.idealAge)}. You will use your influence to change the sexual ideal to `);
					}
					el.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.targetIdealAge,
								v => {
									let minAge = V.minimumSlaveAge;
									let maxAge = V.retirementAge - 1 > 60 ? 60 : V.retirementAge - 1;/* problems do occur if idealAge can be set to over 60 */
									if (FutureSocieties.isActive("FSMaturityPreferentialist")) {
										minAge = 30;
									}
									if (FutureSocieties.isActive("FSYouthPreferentialist")) {
										maxAge = 29;
									}
									V.targetIdealAge = Math.clamp(v, minAge, maxAge);
									App.UI.reload();
								},
								true
							),
							["indent"]
						)
					);
					return el;
				},
				get activatedText() {
					return `you are using your personal influence to make ${num(V.targetIdealAge)} the most sexually appealing age. The current perceived ideal age is ${V.idealAge}.`;
				},
				onRepeal: function() {
					if (FutureSocieties.isActive("FSMaturityPreferentialist")) {
						if (V.idealAge < 30) {
							V.idealAge = 30;
						}
						V.targetIdealAge = 30;
					} else {
						if (V.idealAge >= 30) {
							V.idealAge = 29;
						}
						V.targetIdealAge = 18;
					}
				},
				get note() { return `Will cost ${cashFormat(1500)} weekly until the target age is reached; high reputation will accelerate adoption.`; }
			}
		],
		"arcologies[0].FSEgyptianRevivalistIncestPolicy": [
			{
				title: "Incest Encouragement",
				text: "you will use your personal influence to spur interest in incest.",
				activatedText: "you are using your personal influence to spur interest in incest.",
				get requirements() { return (!FutureSocieties.isActive("FSEgyptianRevivalist")); },
			}
		],
		"arcologies[0].FSRepopulationFocusPregPolicy": [
			{
				title: "Pregnancy Encouragement",
				text: "you will use your personal influence to spur interest in pregnancy.",
				activatedText: "you are using your personal influence to spur interest in pregnancy.",
				get requirements() {
					return (
						!FutureSocieties.isActive("FSRepopulationFocus") &&
						!FutureSocieties.isActive("FSRestart") &&
						V.seePreg === 1
					);
				},
			}
		],
		"arcologies[0].FSRepopulationFocusMilfPolicy": [
			{
				title: "Motherly Preference",
				text: "you will use your personal influence to spur interest in MILFs.",
				activatedText: "you are using your personal influence to spur interest in MILFs.",
				get requirements() {
					return (
						!FutureSocieties.isActive("FSRepopulationFocus") &&
						!FutureSocieties.isActive("FSRestart")
					);
				},
			}
		],
		"policies.bestialityOpenness": [
			{
				title: "Bestiality Acceptance",
				text: "you will use your personal influence to spur acceptance of bestiality.",
				activatedText: "you are using your personal influence to spur the acceptance of bestiality.",
				get requirements() { return (V.seeBestiality === 1); },
			}
		],
		"policies.gumjobFetishism": [
			{
				title: "Gumjob Fetishism",
				text: "you will use your personal influence to make toothless slaves and gummy blowjobs more desirable than not.",
				activatedText: "you are using your personal influence to make toothless slaves and gummy blowjobs more desirable than not.",
				note: `Will increase beauty of slaves without teeth, and decrease beauty and usage of slaves with teeth`
			}
		],
		"policies.gumjobFetishismSMR": [
			{
				title: "Gumjob Fetishism SMR",
				text: "in order to be sold in your arcology, slaves will need to have their teeth removed.",
				activatedText: "in order to be sold in your arcology, slaves must have their teeth removed.",
				get requirements() { return !FutureSocieties.isActive("FSPaternalist"); },
			}
		],
	},
	PopulationPolicies: {
		"policies.proRefugees": [
			{
				title: "Encourage Refugee Servitude",
				text: "the image of slavery in your arcology will be softened, encouraging old world refugees to consider slavery.",
				activatedText: "the image of slavery in your arcology is being softened, encouraging old world refugees to consider becoming menial slaves.",
				get requirements() { return !FutureSocieties.isActive("FSDegradationist"); },
				note: "Will increase immigration of refugees to become menial slaves"
			}
		],
		"policies.proRecruitment": [
			{
				title: "Encourage Self-Enslavement",
				text: "your image as a slaveowner will be softened, encouraging the desperate to consider coming to you for enslavement.",
				activatedText: "soften your image as a slaveowner, encouraging the desperate to consider coming to you for enslavement.",
				note: "Will increase the chances of desperate people offering themselves to you for enslavement"
			}
		],
		"policies.immigrationCash": [
			{
				title: "Immigration Promotion",
				text: "you will offer citizen immigrants a generous promotion.",
				activatedText: "you are offering citizen immigrants a generous promotion.",
				get note() { return `Will cost ${cashFormat(policies.cost())} weekly to maintain, and increase the citizen population`; }
			},
			{
				title: "Immigrant Information Brokerage",
				text: "you will covertly sell information on troubled potential immigrants to your arcology to their old world enemies.",
				activatedText: "you are covertly selling information on troubled potential immigrants to your arcology.",
				enable: -1,
				get note() { return `Will produce roughly ${cashFormat(1000)} weekly, and slow growth of the citizen population`; }
			}
		],
		"policies.immigrationRep": [
			{
				title: "Welcome Program",
				text: "you will use your personal influence to encourage wealthy people to immigrate.",
				activatedText: "you are using your personal influence to encourage wealthy people to immigrate.",
				note: `Will annoy some longstanding citizens, and increase the citizen population`
			},
			{
				title: "Citizen Input on Immigration",
				text: "you will selectively turn away potential immigrants to the arcology based on the recommendations of citizens.",
				activatedText: "you are selectively turning away potential immigrants to the arcology based on the recommendations of citizens.",
				enable: -1,
				note: `Will produce a small amount of reputation weekly, and slow growth of the citizen population`
			}
		],
		"policies.enslavementCash": [
			{
				title: "Enslavement Kickbacks",
				text: "you will take kickbacks in return for turning a blind eye to enslavement of poor citizens.",
				activatedText: "you are taking kickbacks in return for turning a blind eye to enslavement of poor citizens.",
				get note() { return `Will produce roughly ${cashFormat(1000)} weekly, and reduce the population of citizens`; }
			},
			{
				title: "Poor Citizen Relief",
				text: "you will offer limited emergency assistance to poor citizens in danger of being enslaved.",
				activatedText: "you are offering limited emergency assistance to poor citizens in danger of being enslaved.",
				policy: "policies.enslavementCash",
				enable: -1,
				get note() { return `Will cost ${cashFormat(policies.cost())} weekly to maintain, and slow population movement from citizens to slaves`; }
			}
		],
		"policies.enslavementRep": [
			{
				title: "Covert Upstart Enslavement",
				text: "you will offer prominent citizens your tacit assistance in enslaving rivals.",
				activatedText: "you are offering prominent citizens your tacit assistance in enslaving rivals.",
				note: "Will produce a small amount of reputation weekly, and reduce the population of citizens"
			},
			{
				title: "Charity Promotion Efforts",
				text: "you will use your personal influence to discourage enslavement of citizens.",
				activatedText: "you are using your personal influence to discourage enslavement of citizens.",
				enable: -1,
				note: "Will annoy some prominent citizens, and slow population movement from citizens to slaves"
			}
		]
	},
	DomesticPolicies: {
		"policies.alwaysSubsidizeGrowth": [
			{
				title: "Economic Growth Subsidy",
				text: "offer promising new businesses generous subsidies, driving arcology prosperity.",
				get note() { return `Will cost ${cashFormat(policies.cost())} weekly to maintain, and improve arcology prosperity`; }
			}
		],
		"policies.alwaysSubsidizeRep": [
			{
				title: "Self-Promotion Program",
				text: "communicate your good side to the public via subtle paid advertising. This will also ease any potential rumors.",
				get note() { return `Will cost ${cashFormat(policies.cost())} weekly to maintain, and improve your reputation`; }
			}
		],
		"policies.cashForRep": [
			{
				title: "Business Generosity",
				text: "you will do your best to help your citizens, even when it disadvantages you personally.",
				activatedText: "you are doing your best to help your citizens, even when it disadvantages you personally.",
				get note() { return `Will cost ${cashFormat(policies.cost())} weekly, and improve your reputation`; }
			},
			{
				title: "Business Selfishness",
				text: "you will leverage your position as arcology owner for money, even when it disadvantages citizens.",
				activatedText: "you are leveraging your position as arcology owner for money, even when it disadvantages citizens.",
				enable: -1,
				get note() { return `Will produce ${cashFormat(policies.cost())} weekly, and cost some reputation`; }
			},
		],
		"policies.cash4Babies": [
			{
				title: "Free Trade of Slave Babies",
				text: "you will legalize slave children to be sold after birth rather than put into slave orphanages.",
				activatedText: "newborn slave children are now eligible to be sold rather than entrusted to a slave orphanage.",
				note: `Can supply easy money, but will harm your reputation`
			}
		],
		"policies.goodImageCampaign": [
			{
				title: "Good Image Campaign",
				text: "positive rumors will be spread throughout the arcology regarding you.",
				activatedText: "positive rumors are being spread about you.",
				get note() { return `Will cost ${cashFormat(policies.cost())} weekly to maintain, and lessen any potential rumors about you while giving a small boost to your reputation`; }
			}
		],
		"policies.regularParties": [
			{
				title: "Regular Social Events",
				text: "you will host regular parties for prominent citizens, an expected social duty of an arcology owner.",
				activatedText: "you are hosting regular parties for prominent citizens, an expected social duty of an arcology owner.",
				get note() {
					let text = `Will cost ${cashFormat(policies.cost())} weekly`;
					if (V.rep > 18000) {
						text += `; neglecting this has begun to damage your reputation`;
					}
					return text;
				},
				get activatedNote() {
					let text = `Costs ${cashFormat(policies.cost())} weekly`;
					if (V.rep > 18000) {
						text += `, and prevents damage to your reputation`;
					}
					return text;
				}
			}
		],
		"policies.publicPA": [
			{
				title: "Public Personal Assistant",
				get text() { return `${V.assistant.name} will become part of your public image.`; },
				get activatedText() { return `${V.assistant.name} is part of your public image.`; },
				get note() { return `May improve cultural development if ${V.assistant.name}'s appearance is fashionable`; }
			}
		],
		"policies.coursingAssociation": [
			{
				title: "Coursing Association",
				text: "you will sponsor a Coursing Association that will hold monthly races.",
				get activatedText() {
					const el = new DocumentFragment();
					el.append(`you are sponsoring a `);
					el.append(App.UI.DOM.passageLink("Coursing Association", "Coursing Association"));
					el.append(` that will hold monthly races.`);
					return el;
				},
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain`; },
				get activatedNote() {
					const el = new DocumentFragment();
					if (V.LurcherID !== 0) {
						el.append(
							`Your current lurcher is `,
							App.UI.DOM.slaveDescriptionDialog(S.Lurcher),
							`.`,
						);
					}
					return el;
				}
			}
		],
		"policies.raidingMercenaries": [
			{
				title: "Raiding Mercenaries",
				text: "you will allow your mercenaries to occasionally conduct a raid directly for your benefit.",
				activatedText: "you are allowing your mercenaries to occasionally raid for your direct benefit.",
				get requirements() { return (V.mercenaries > 0) && (V.mercenariesHelpCorp > 0); },
				get note() { return `Will cost ${cashFormat(policies.cost())} weekly to maintain`; }
			}
		],
		"policies.publicFuckdolls": [
			{
				title: "Free Fuckdolls",
				text: "you will no longer charge money for restrained slave holes in your arcology, ranging from Fuckdolls to the arcade.",
				activatedText: "you are providing Fuckdolls free of charge, such generosity increases your standing.",
				note: `Slaves assigned to these jobs will stop making money, while Fuckdolls will start costing money`
			}
		],
		"policies.mixedMarriage": [
			{
				title: "Marriage between Owners and Slaves",
				text: "you will provide a legal basis for citizens to marry their slaves without impacting their rights as slaveowners.",
				activatedText: "you are providing a legal basis for citizens to marry their slaves without impacting their rights as slaveowners.",
				get requirements() { return (!FutureSocieties.isActive("FSDegradationist")); },
				get note() {
					if (V.arcologies[0].FSPaternalist >= 60) {
						return `Will not damage your reputation due to your arcology's advanced Paternalism`;
					} else {
						return `Will damage your reputation`;
					}
				}
			}
		],
	},
	EducationPolicies: {
		"TSS.subsidize": [
			{
				title: "The Slave School subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.TSS.schoolProsperity < 10 && V.TSS.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine The Slave School",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.TSS.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"TUO.subsidize": [
			{
				title: "The Utopian Orphanage subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.TUO.schoolProsperity < 10 && V.TUO.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine The Utopian Orphanage",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.TUO.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"GRI.subsidize": [
			{
				title: "The Growth Research Institute subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.GRI.schoolProsperity < 10 && V.GRI.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine the Growth Research Institute",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.GRI.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"SCP.subsidize": [
			{
				title: "St. Claver Preparatory subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.SCP.schoolProsperity < 10 && V.SCP.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine St. Claver Preparatory",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.SCP.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"LDE.subsidize": [
			{
				title: "L'École des Enculées subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.LDE.schoolProsperity < 10 && V.LDE.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine L'École des Enculées",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.LDE.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"TGA.subsidize": [
			{
				title: "The Gymnasium-Academy subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.TGA.schoolProsperity < 10 && V.TGA.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine the Gymnasium-Academy",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.TGA.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"TCR.subsidize": [
			{
				title: "The Cattle Ranch subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.TCR.schoolProsperity < 10 && V.TCR.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine The Cattle Ranch",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.TCR.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"TFS.subsidize": [
			{
				title: "Futanari Sisters subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.TFS.schoolProsperity < 10 && V.TFS.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine the Futanari Sisters",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.TFS.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"HA.subsidize": [
			{
				title: "Hippolyta Academy subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.HA.schoolProsperity < 10 && V.HA.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine the Hippolyta Academy",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.HA.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
		"NUL.subsidize": [
			{
				title: "Nueva Universidad de Libertad subsidy",
				text: "you will subsidize this school's branch campus in your arcology.",
				activatedText: "you are subsidizing this school's branch campus in your arcology.",
				get requirements() { return (V.NUL.schoolProsperity < 10 && V.NUL.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			},
			{
				title: "Undermine Nueva Universidad de Libertad",
				text: "you will covertly hurt this school's branch campus in your arcology.",
				activatedText: "you are covertly hurting this school's branch campus in your arcology.",
				enable: -1,
				get requirements() { return (V.NUL.schoolPresent === 1); },
				get note() { return `Will cost ${cashFormat(1000)} weekly to maintain; does not cost reputation to start`; },
			}
		],
	},
	RetirementPolicies: {
		"policies.retirement.customAgePolicy": [
			{
				title: "Redefined Mandatory Retirement Age",
				get text() {
					const el = new DocumentFragment();
					el.append(`you will set your arcology's standard retirement age for sex slaves at age `);
					el.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.customRetirementAge,
								v => {
									V.customRetirementAge = Math.clamp(v, 20, 120);
									App.UI.reload();
								},
								true
							),
							"indent"
						)
					);
					return el;
				},
				get activatedText() { return `you have set your arcology's standard retirement age for sex slaves at ${V.retirementAge}.`; },
				onImplementation: () => {
					V.retirementAge = V.customRetirementAge;
					if (V.idealAge >= V.retirementAge) {
						V.idealAge = V.retirementAge - 1;
					}
				},
				onRepeal: function() { V.retirementAge = 45; },
				get requirements() { return (V.policies.retirement.physicalAgePolicy === 0); },
				note: "Set age before implementing"
			}
		],
		"policies.retirement.physicalAgePolicy": [
			{
				title: "Physical Retirement Age",
				get text() {
					const el = new DocumentFragment();
					el.append(`you will replace your arcology's standard age-based retirement policy for one retiring sex slaves once their bodies reach age `);
					el.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.customRetirementAge,
								v => {
									V.customRetirementAge = Math.clamp(v, 20, 120);
									App.UI.reload();
								},
								true
							),
							"indent"
						)
					);
					return el;
				},
				get activatedText() { return `you have set your arcology's standard retirement age for sex slaves at physically ${V.retirementAge}. This policy completely supplants former age retirement policies.`; },
				onImplementation: () => {
					V.policies.retirement.customAgePolicy = 0;
					V.retirementAge = V.customRetirementAge;
					if (V.idealAge >= V.retirementAge) {
						V.idealAge = V.retirementAge - 1;
					}
				},
				onRepeal: function() { V.retirementAge = 45; },
				note: "Set age before implementing"
			}
		],
		"policies.retirement.fate": [
			{
				title: "Public Fluid Production Retirement",
				get text() {
					let text = `upon reaching the mandatory retirement age, slaves will be converted for full-time milk`;
					if (V.seeDicks === 1) {
						text += `, semen,`;
					}
					text += ` and vaginal secretion production.`;
					return text;
				},
				get activatedText() {
					let text = `upon reaching the mandatory retirement age, slaves are converted for full-time milk`;
					if (V.seeDicks === 1) {
						text += `, semen,`;
					}
					text += ` and vaginal secretion production.`;
					return text;
				},
				get requirements() { return (!FutureSocieties.isActive("FSPaternalist")); },
				enable: "bioreactor"
			},
			{
				title: "Public Arcade Retirement",
				text: "upon reaching the mandatory retirement age, slaves will be placed in cheap public arcades to be used until useless.",
				activatedText: "upon reaching the mandatory retirement age, slaves are placed in cheap public arcades to be used until useless.",
				get requirements() { return (!FutureSocieties.isActive("FSPaternalist")); },
				enable: "arcade"
			},
			{
				title: "Sex Slave Citizen Retirement",
				activatedTitle: "Citizen Retirement",
				text: "all slaveowners will be required to pay into accounts to support their slaves as lower-class citizens in retirement.",
				activatedText: "all slaveowners are required to pay into accounts to support their slaves as lower-class citizens in retirement.",
				note: `Will add upkeep to all sex slaves`,
				enable: "citizen"
			},
		],
		"policies.retirement.sex": [
			{
				title: "Sexual Milestone Retirement",
				get text() { return `slaves will be rewarded with their freedom once they have been fucked ${V.policies.retirement.sex === 0 ? "a set number of" : num(V.policies.retirement.sex)} times.`; },
				get activatedText() {
					const el = new DocumentFragment();
					let div = document.createElement("div");
					el.append(`slaves are rewarded with their freedom once they have been fucked ${num(V.policies.retirement.sex)} times.`);
					div.append(`Set a new retirement requirement:`);
					div.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.policies.retirement.sex,
								v => {
									V.policies.retirement.sex = Math.clamp(v, 1, 1e7);
									App.UI.reload();
								},
								true
							),
							"indent"
						)
					);
					el.append(div);
					return el;
				},
				enable: 10000,
				get requirements() { return (V.policies.retirement.fate === "citizen"); },
			}
		],
		"policies.retirement.milk": [
			{
				title: "Productive Cow Retirement",
				get text() { return `slaves will be rewarded with their freedom once they have given ${V.policies.retirement.milk === 0 ? "a set number of" : num(V.policies.retirement.milk)} liters of milk.`; },
				get activatedText() {
					const el = new DocumentFragment();
					let div = document.createElement("div");
					el.append(`slaves are rewarded with their freedom once they have given ${num(V.policies.retirement.milk)} liters of milk.`);
					div.append(`Set a new retirement requirement:`);
					div.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.policies.retirement.milk,
								v => {
									V.policies.retirement.milk = Math.clamp(v, 1, 1e8);
									App.UI.reload();
								},
								true
							),
							"indent"
						)
					);
					el.append(div);
					return el;
				},
				enable: 50000,
				get requirements() { return (V.policies.retirement.fate === "citizen"); },
			}
		],
		"policies.retirement.cum": [
			{
				title: "Productive Bull Retirement",
				get text() { return `slaves will be rewarded with their freedom once they have given ${V.policies.retirement.cum === 0 ? "a set number of" : num(V.policies.retirement.cum)} deciliters of cum.`; },
				get activatedText() {
					const el = new DocumentFragment();
					let div = document.createElement("div");
					el.append(`slaves are rewarded with their freedom once they have given ${num(V.policies.retirement.cum)} deciliters of cum.`);
					div.append(`Set a new retirement requirement:`);
					div.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.policies.retirement.cum,
								v => {
									V.policies.retirement.cum = Math.clamp(v, 1, 1e9);
									App.UI.reload();
								},
								true
							),
							"indent"
						)
					);
					el.append(div);
					return el;
				},
				enable: 500000,
				get requirements() { return (V.policies.retirement.fate === "citizen" && (V.seeDicks > 0 || V.makeDicks)); },
			}
		],
		"policies.retirement.births": [
			{
				title: "Fertile Breeder Retirement",
				get text() { return `slaves will be rewarded with their freedom once they add ${V.policies.retirement.births === 0 ? "a set number of" : num(V.policies.retirement.births)} new slaves to the population of ${V.arcologies[0].name}.`; },
				get activatedText() {
					const el = new DocumentFragment();
					let div = document.createElement("div");
					el.append(`slaves are rewarded with their freedom once they add ${num(V.policies.retirement.births)} new slaves to the population of ${V.arcologies[0].name}. `);
					div.append(`Set a new retirement requirement:`);
					div.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.policies.retirement.births,
								v => {
									V.policies.retirement.births = Math.clamp(v, 1, 1e6);
									App.UI.reload();
								},
								true
							),
							"indent"
						)
					);
					el.append(div);
					return el;
				},
				enable: 5,
				get requirements() { return (V.policies.retirement.fate === "citizen"); },
			}
		],
		"policies.retirement.kills": [
			{
				title: "Champion Gladiatrix Retirement",
				get text() { return `slaves will be rewarded with their freedom once they have killed ${V.policies.retirement.kills === 0 ? "a set number of" : num(V.policies.retirement.kills)} of their fellow slaves in the pit.`; },
				get activatedText() {
					const el = new DocumentFragment();
					let div = document.createElement("div");
					el.append(`slaves are rewarded with their freedom once they have killed ${num(V.policies.retirement.kills)} of their fellow slaves in the pit.`);
					div.append(`Set a new retirement requirement:`);
					div.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.policies.retirement.kills,
								v => {
									V.policies.retirement.kills = Math.clamp(v, 1, 1e6);
									App.UI.reload();
								},
								true
							),
							"indent"
						)
					);
					el.append(div);
					return el;
				},
				enable: 3,
				get requirements() { return (V.policies.retirement.fate === "citizen"); },
			}
		],
	},
	MenialRetirementPolicies: {
		"policies.retirement.menial2Citizen": [
			{
				get title() {
					const el = new DocumentFragment();
					if (V.policies.retirement.menial2Citizen !== 1) {
						let div = document.createElement("div");
						let span = document.createElement("span");
						span.style.fontWeight = "bold";
						span.textContent = `No Menial Retirement Plan`;
						div.append(span);

						span = document.createElement("span");
						span.style.fontWeight = "normal";
						span.textContent = `: without defining a retirement age for menial slaves they will remain slaves until death or freed otherwise`;
						div.append(span);
						el.append(div);
					}
					el.append("Redefined Mandatory Menial Retirement Age");
					return el;
				},
				get text() {
					const el = new DocumentFragment();
					el.append(`you will set your arcology's retirement age for menial slaves at age`);
					el.append(
						App.UI.DOM.makeElement(
							"div",
							App.UI.DOM.makeTextBox(
								V.customMenialRetirementAge,
								v => {
									const age = Math.clamp(v, 20, 120);
									V.customMenialRetirementAge = age;
									V.customRetirementAge = Math.clamp(V.customRetirementAge, 20, V.customMenialRetirementAge);
									if (V.customMenialRetirementAge < 45) {
										V.retirementAge = V.customMenialRetirementAge;
									}
									App.UI.reload();
								},
								true
							),
							"indent"
						)
					);
					return el;
				},
			},
			{
				title: "Menial Slave Citizen Retirement",
				activatedTitle: "Mandatory Menial Retirement Age",
				text: `all slaveowners will be required to pay into accounts to support their slaves as lower-class citizens in retirement.`,
				get activatedText() { return `you have set your arcology's retirement age for menial slaves at ${V.customMenialRetirementAge}.`; },
				get requirements() { return (!FutureSocieties.isActive("FSDegradationist")); },
				note: `Will add upkeep to all menial slaves`,
				onImplementation: function() { if (V.citizenRetirementTrigger === 0) { V.citizenRetirementTrigger = 1; } },
				onRepeal: function() { V.customMenialRetirementAge = 45; }
			}
		],
	},
	FutureSocietiesTab: {
		"policies.culturalOpenness": [
			{
				title: "Cultural Openness",
				text: "you will promote the exchange of ideas between arcologies, increasing cultural crossover between your arcology and its neighbors.",
				activatedText: "you are promoting the exchange of ideas between arcologies, increasing cultural crossover between your arcology and its neighbors.",
				get requirements() { return (V.arcologies.length > 1); },
			},
			{
				title: "Cultural Defensiveness",
				text: "you will do your best to suppress the exchange of ideas between arcologies, reducing cultural crossover between your arcology and its neighbors.",
				activatedText: " you are doing your best to suppress the exchange of ideas between arcologies, reducing cultural crossover between your arcology and its neighbors.",
				get requirements() { return (V.arcologies.length > 1); },
				enable: -1,
			},
		],
	},
	FSGenderFundamentalist: {
		"arcologies[0].FSGenderFundamentalistLawBeauty": [
			{
				title: "Fashionable Feminine Ideal",
				titleClass: "lime",
				text: "you will do your best to start a fashion for elegant girls with just the right amount of T&A.",
				activatedText: "you are doing your best to maintain a fashion for elegant girls with just the right amount of T&A.",
				get requirements() {
					return (
						V.arcologies[0].FSSlimnessEnthusiastLaw === 0 &&
						V.arcologies[0].FSHedonisticDecadenceLaw2 === 0 &&
						V.arcologies[0].FSPhysicalIdealistLaw === 0 &&
						V.arcologies[0].FSGenderFundamentalist > 20
					);
				},
			}
		],
		"arcologies[0].FSGenderFundamentalistLawBimbo": [
			{
				title: "Traditional Education",
				titleClass: "lime",
				text: "you will do your best to remind society that a woman does not need an education to serve her man.",
				activatedText: "women do not need to be educated to serve their role in society.",
				get requirements() { return (V.arcologies[0].FSGenderFundamentalist >= 60); },
			}
		],
		"arcologies[0].FSGenderFundamentalistSMR": [
			{
				title: "Mandatory Feminization SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves with dicks must have their balls removed.",
				get requirements() { return (V.arcologies[0].FSGenderFundamentalist >= 40); },
				note: `Will help advance Gender Fundamentalism`
			}
		],
	},
	FSGenderRadicalist: {
		"arcologies[0].FSGenderRadicalistLawBeauty": [
			{
				title: "Fashionable Feminine Aspiration",
				titleClass: "lime",
				text: "you will do your best to start a fashion for turning slaves into elegant girls with just the right amount of T&A.",
				activatedText: "you are doing your best to maintain a fashion for turning slaves into elegant girls with just the right amount of T&A.",
				get requirements() {
					return (
						V.arcologies[0].FSSlimnessEnthusiastLaw === 0 &&
						V.arcologies[0].FSHedonisticDecadenceLaw2 === 0 &&
						V.arcologies[0].FSPhysicalIdealistLaw === 0 &&
						V.arcologies[0].FSGenderRadicalist > 20
					);
				},
			}
		],
		"arcologies[0].FSGenderRadicalistLawFuta": [
			{
				title: "Futanari Focused Radicalism",
				titleClass: "lime",
				text: "you will encourage veneration of slaves with both dicks and pussies.",
				activatedText: "you are encouraging Gender Radicalism towards veneration of slaves with both dicks and pussies.",
				enable: 1,
				get requirements() {
					return (
						V.seeDicks !== 0 &&
						V.seeDicks !== 100 &&
						V.arcologies[0].FSGenderRadicalist > 60 &&
						V.arcologies[0].FSGenderRadicalistLawFuta === 0
					);
				},
				note: `Will affect citizens' appreciation of futas`
			},
			{
				title: "Cock and Balls Focused Radicalism",
				titleClass: "lime",
				text: "you will encourage an appreciation for stiff dicks and swinging balls.",
				activatedText: "you are encouraging Gender Radicalism towards an appreciation for stiff dicks and swinging balls.",
				enable: 2,
				get requirements() {
					return (
						V.seeDicks !== 0 &&
						V.arcologies[0].FSGenderRadicalist > 60 &&
						V.arcologies[0].FSGenderRadicalistLawFuta === 0
					);
				},
				note: `Will affect slaves' attractiveness to citizens`
			},
			{
				title: "Bottom Heavy Radicalism",
				titleClass: "lime",
				text: "you will encourage an appreciation for broad hips, plush asses, big buttholes, and skilled sphincters.",
				activatedText: "you are encouraging an appreciation for broad hips, plush asses, big buttholes, and skilled sphincters.",
				enable: 3,
				get requirements() {
					return (
						V.seeDicks !== 0 &&
						V.arcologies[0].FSGenderRadicalist > 60 &&
						V.arcologies[0].FSSlimnessEnthusiastLaw === 0 &&
						V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 0 &&
						V.arcologies[0].FSGenderRadicalistLawFuta === 0
					);
				},
				note: `Will affect slaves' attractiveness to citizens`
			},
			{
				title: "Femboy Focused Radicalism",
				titleClass: "lime",
				text: "you will encourage an appreciation for cute, flat chested slaves with small male genitals and no vagina.",
				activatedText: "you are encouraging an appreciation for cute, flat chested slaves with small male genitals and no vagina.",
				enable: 4,
				get requirements() {
					return (
						V.seeDicks !== 0 &&
						V.arcologies[0].FSGenderRadicalist > 60 &&
						V.arcologies[0].FSHedonisticDecadenceLaw2 === 0 &&
						V.arcologies[0].FSGenderRadicalistLawFuta === 0
					);
				},
				note: `Will affect slaves' attractiveness to citizens`
			},
		],
	},
	FSPaternalist: {
		"arcologies[0].FSPaternalistSMR": [
			{
				title: "Human Dignity SMR",
				titleClass: "lime",
				text: "the slave markets will be required to treat incoming slaves reasonably well.",
				activatedText: "the slave markets are required to treat incoming slaves reasonably well.",
				get requirements() { return (V.arcologies[0].FSDegradationistSMR === 0 && V.arcologies[0].FSPaternalist >= 40); },
				note: `Will reduce the arcology's prosperity and help advance Paternalism`
			}
		],
		"arcologies[0].FSPaternalistLaw": [
			{
				title: "Good Treatment Subsidy",
				titleClass: "lime",
				text: "slaveowners who treat their slaves well will be offered reduced rent.",
				activatedText: "slaveowners who treat their slaves well are offered reduced rent.",
				get requirements() { return (V.arcologies[0].FSPaternalist >= 60); },
				note: `Will reduce your rental income`
			}
		],
	},
	FSDegradationist: {
		"arcologies[0].FSDegradationistSMR": [
			{
				title: "Agonizing Induction SMR",
				titleClass: "lime",
				text: "slave markets will be required to punish new slaves severely simply to introduce them to pain.",
				activatedText: "slave markets are required to punish new slaves severely simply to introduce them to pain.",
				get requirements() { return (V.arcologies[0].FSPaternalistSMR === 0 && V.arcologies[0].FSDegradationist >= 40); },
				note: `Will help advance Degradationism`
			}
		],
		"arcologies[0].FSDegradationistLaw": [
			{
				title: "Universal Arcade Access Mandate",
				titleClass: "lime",
				text: "slaveowners will be required to allow their menial slaves to use the sex arcades.",
				activatedText: "slaveowners are required to allow their menial slaves to use the sex arcades.",
				get requirements() { return (V.arcologies[0].FSDegradationist >= 90); },
				note: `Will reduce labor efficiency, damaging the arcology's prosperity and adds a cost to each menial slave`
			}
		],
	},
	FSIntellectualDependency: {
		"arcologies[0].FSIntellectualDependencySMR": [
			{
				title: "Dependency SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will need to fail a simple intelligence test.",
				activatedText: "in order to be sold in the arcology, slaves must fail a simple intelligence test.",
				get requirements() { return (V.arcologies[0].FSIntellectualDependency >= 40); },
				onImplementation: function() {
					V.policies.SMR.intelligence.basicSMR = 0;
					V.policies.SMR.intelligence.qualitySMR = 0;
				},
				get note() {
					let t = `Will help advance Intellectual Dependency`;
					if (V.policies.SMR.intelligence.basicSMR !== 0 || V.policies.SMR.intelligence.qualitySMR !== 0) {
						t += ` and will repeal interfering intelligence regulations`;
					}
					return t;
				}
			}
		],
		"arcologies[0].FSIntellectualDependencyLawBeauty": [
			{
				title: "Bimbo Body Complement",
				titleClass: "lime",
				text: "you will do your best to start an appreciation for stereotypical bimbo bodies.",
				activatedText: "you are encouraging an appreciation for the stereotypical bimbo body.",
				get requirements() { return (V.arcologies[0].FSIntellectualDependency >= 60); },
				note: `Will greatly affect society's views on slave beauty`
			}
		],
		"arcologies[0].FSIntellectualDependencyLaw": [
			{
				title: "Invalid Protection Act",
				titleClass: "lime",
				text: "by law, anyone unable to pass a standardized test of intelligence and not already a dependant will be enslaved for their own well-being.",
				get requirements() { return (V.arcologies[0].FSIntellectualDependency >= 80); },
				note: `Will convert some immigrants to menial slaves and give a small boost to reputation`
			}
		],
	},
	FSSlaveProfessionalism: {
		"arcologies[0].FSSlaveProfessionalismSMR": [
			{
				title: "Head Start SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves must pass a rigorous course designed to bring their skills and poise up to standard.",
				get requirements() { return (V.arcologies[0].FSIntellectualDependencySMR === 0 && V.arcologies[0].FSSlaveProfessionalism >= 40); },
				note: `Will help advance Slave Professionalism`
			}
		],
		"arcologies[0].FSSlaveProfessionalismLaw": [
			{
				title: "Mandatory Intelligence Screening",
				titleClass: "lime",
				text: "citizens will be required to pass regular intelligence tests or face expulsion from the arcology.",
				activatedText: "citizens must pass regular intelligence tests or face expulsion from the arcology.",
				get requirements() { return (V.arcologies[0].FSSlaveProfessionalism >= 90); },
				onImplementation: function() {
					if (V.FSSlaveProfLawTrigger === 0) {
						V.FSSlaveProfLawTrigger = 1;
					}
				},
				note: `Will thin citizen numbers and reduce immigration, but what remains will empower the arcology's prosperity`
			}
		],
	},
	FSBodyPurist: {
		"arcologies[0].FSBodyPuristSMR": [
			{
				title: "Body Purity SMR",
				titleClass: "lime",
				text: "in order to be sold in your arcology, slaves will be stripped of implants and body modifications.",
				activatedText: "in order to be sold in your arcology, slaves must be stripped of implants and body modifications.",
				note: `Will help advance Body Purism`,
				get requirements() { return (V.arcologies[0].FSBodyPurist >= 40); },
			}
		],
		"arcologies[0].FSBodyPuristLaw": [
			{
				title: "Drug Purity Mandate",
				titleClass: "lime",
				text: "all drugs in the arcology will be subjected to rigorous testing for purity.",
				activatedText: "all drugs in the arcology must pass rigorous testing for purity.",
				get requirements() { return (V.arcologies[0].FSBodyPurist >= 90); },
				note: `Will reduce slaving profits, damaging the arcology's prosperity`
			}
		],
		"arcologies[0].FSBodyPuristCatLaw": [
			{
				title: "Nonhuman Purity Standards",
				titleClass: "lime",
				text: "engage in targeted social engineering to make unmodified catgirls palatable to body purist tastes.",
				activatedText: "catgirls are seen as pretty in their own distinct fashion, so long as they are pure and natural.",
				get requirements() { return (V.puristRiotDone === 1); },
				onImplementation: function() {
					repX(-2000, "policies");
				},
				note: `Will damage your reputation but change beauty standards to make natural catgirls acceptable`
			}
		],
	},
	FSTransformationFetishist: {
		"arcologies[0].FSTransformationFetishistSMR": [
			{
				title: "Mandatory Bimbofication SMR",
				titleClass: "lime",
				text: "in order to be sold in your arcology, slaves must be given a set of fake tits and ass.",
				activatedText: "in order to be sold in your arcology, slaves must be given a set of fake tits and ass.",
				note: `Will help advance Transformation Fetishism`,
				get requirements() { return (V.arcologies[0].FSTransformationFetishist >= 40); },
			}
		],
	},
	FSYouthPreferentialist: {
		"arcologies[0].FSYouthPreferentialistSMR": [
			{
				title: "Respect for Youth SMR",
				titleClass: "lime",
				text: " slave markets in your arcology are required to treat younger slaves carefully.",
				activatedText: "slave markets in your arcology are required to treat younger slaves carefully.",
				note: `Will help advance Youth Preferentialism`,
				get requirements() { return (V.arcologies[0].FSYouthPreferentialist >= 40); },
			}
		],
		"arcologies[0].FSYouthPreferentialistLaw": [
			{
				title: "Youthful Citizen Subsidy",
				titleClass: "lime",
				text: "young citizens will be offered reduced rent.",
				activatedText: "young citizens are offered reduced rent.",
				get requirements() { return (V.arcologies[0].FSYouthPreferentialist >= 90); },
				note: `Will reduce your rental income`
			}
		],
	},
	FSMaturityPreferentialist: {
		"arcologies[0].FSMaturityPreferentialistSMR": [
			{
				title: "Respect for Maturity SMR",
				titleClass: "lime",
				text: "slave markets in your arcology will be required to treat mature slaves properly.",
				activatedText: "slave markets in your arcology are required to treat mature slaves properly.",
				note: `Will help advance Maturity Preferentialism`,
				get requirements() { return (V.arcologies[0].FSMaturityPreferentialist >= 40); },
			}
		],
		"arcologies[0].FSMaturityPreferentialistLaw": [
			{
				title: "Mature Citizen Subsidy",
				titleClass: "lime",
				text: "older citizens will be offered reduced rent.",
				activatedText: "older citizens are offered reduced rent.",
				get requirements() { return (V.arcologies[0].FSMaturityPreferentialist >= 90); },
				note: `Will reduce your rental income`
			}
		],
	},
	FSPetiteAdmiration: {
		"arcologies[0].FSPetiteAdmirationSMR": [
			{
				title: "Small Details SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will have to pass height requirements.",
				activatedText: "in order to be sold in the arcology, slaves must pass height requirements.",
				get requirements() { return (V.arcologies[0].FSPetiteAdmiration >= 40); },
				onImplementation: function() {
					if (V.policies.SMR.height.advancedSMR > 0) {
						V.policies.SMR.height.advancedSMR = 0;
					}
					if (V.policies.SMR.height.basicSMR > 0) {
						V.policies.SMR.height.basicSMR = 0;
					}
				},
				get note() {
					let t = `Will help advance Petite Admiration`;
					if (V.policies.SMR.height.basicSMR > 0 || V.policies.SMR.height.advancedSMR !== 0) {
						t += ` and will repeal interfering height regulations`;
					}
					return t;
				}
			}
		],
		"arcologies[0].FSPetiteAdmirationLaw2": [
			{
				title: "Relative Height Clause",
				titleClass: "lime",
				text: "you will do your best to push a taste for relative height rather than a strict cut-off.",
				activatedText: "beauty standards are based off of relative expected height as opposed to a strict cutoff.",
				get requirements() { return (V.arcologies[0].FSPetiteAdmiration >= 60); },
				note: `Will weaken beauty standards by making them more easily attainable but may flush out cheaters`
			}
		],
		"arcologies[0].FSPetiteAdmirationLaw": [
			{
				title: "Big & Small Subsidy",
				titleClass: "lime",
				text: "citizens will be offered reduced rent for keeping slaves and taking partners far shorter than themselves.",
				activatedText: "citizens are offered reduced rent for keeping slaves far shorter than themselves.",
				get requirements() { return (V.arcologies[0].FSPetiteAdmiration >= 90); },
				note: `Will reduce your rental income`
			}
		],
	},
	FSStatuesqueGlorification: {
		"arcologies[0].FSStatuesqueGlorificationSMR": [
			{
				title: "You Must Be This Tall SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves must pass height requirements.",
				activatedText: "in order to be sold in the arcology, slaves must be able to pass height requirements.",
				onImplementation: function() {
					if (V.policies.SMR.height.advancedSMR < 0) {
						V.policies.SMR.height.advancedSMR = 0;
					}
					if (V.policies.SMR.height.basicSMR < 0) {
						V.policies.SMR.height.basicSMR = 0;
					}
				},
				get note() {
					let t = `Will help advance Statuesque Glorification`;
					if (V.policies.SMR.height.basicSMR < 0 || V.policies.SMR.height.advancedSMR !== 0) {
						t += ` and will repeal interfering height regulations`;
					}
					return t;
				},
				get requirements() { return (V.arcologies[0].FSStatuesqueGlorification >= 40); },
			}
		],
		"arcologies[0].FSStatuesqueGlorificationLaw2": [
			{
				title: "Relative Height Clause",
				titleClass: "lime",
				text: "you will do your best to push focus on to relative height rather than a strict cutoff.",
				activatedText: "beauty standards are based off of relative expected height as opposed to a strict cutoff.",
				get requirements() { return (V.arcologies[0].FSStatuesqueGlorification >= 60); },
				note: `Will weaken beauty standards by making them more easily attainable`
			}
		],
		"arcologies[0].FSStatuesqueGlorificationLaw": [
			{
				title: "Height Makes Right",
				titleClass: "lime",
				text: "tall citizens will be offered reduced rent at short citizens' expense.",
				activatedText: "tall citizens are offered reduced rent at short citizens' expense.",
				get requirements() { return (V.arcologies[0].FSStatuesqueGlorification >= 90); },
			}
		],
	},
	FSSlimnessEnthusiast: {
		"arcologies[0].FSSlimnessEnthusiastSMR": [
			{
				title: "Physical Fitness SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, chubby slaves will have to be forced to work out first.",
				activatedText: "in order to be sold in the arcology, chubby slaves must be forced to work out first.",
				get requirements() { return (V.arcologies[0].FSSlimnessEnthusiast >= 40); },
			}
		],
		"arcologies[0].FSSlimnessEnthusiastLaw": [
			{
				title: "Flat Feminine Ideal",
				titleClass: "lime",
				text: "you will do your best to start a fashion for elegant girls with just the right amount of T&A, none!",
				activatedText: "you are doing your best to maintain a fashion for elegant girls with just the right amount of T&A, none!",
				get requirements() {
					return (
						V.arcologies[0].FSGenderRadicalistLawBeauty === 0 &&
						V.arcologies[0].FSGenderFundamentalistLawBeauty === 0 &&
						V.arcologies[0].FSGenderRadicalistLawFuta !== 3 &&
						V.arcologies[0].FSHedonisticDecadenceLaw2 === 0 &&
						V.arcologies[0].FSPhysicalIdealistLaw === 0 &&
						V.arcologies[0].FSSlimnessEnthusiast > 20
					);
				},
				note: `Flat slaves will enjoy increased attractiveness to citizens`
			}
		],
		"arcologies[0].FSSlimnessEnthusiastFoodLaw": [
			{
				title: "Asset Slimming Food",
				titleClass: "lime",
				text: "slave food production will be required to follow a recipe that keeps chattel nice and trim, reducing the growth of disgusting flesh on their T&A.",
				activatedText: "you have standardized a slave food recipe to keep your chattel nice and trim, reducing the amount of oversized T&A in the arcology.",
				get requirements() {
					return (
						V.arcologies[0].FSGenderRadicalistLawBeauty === 0 &&
						V.arcologies[0].FSGenderFundamentalistLawBeauty === 0 &&
						V.arcologies[0].FSGenderRadicalistLawFuta !== 3 &&
						V.arcologies[0].FSHedonisticDecadenceLaw2 === 0 &&
						V.arcologies[0].FSPhysicalIdealistLaw === 0 &&
						V.arcologies[0].FSSlimnessEnthusiast > 20
					);
				},
				note: `Slaves will struggle to grow beyond the ideal amount of T&A. `
			}
		],
	},
	FSAssetExpansionist: {
		"arcologies[0].FSAssetExpansionistSMR": [
			{
				title: "Asset Expansion SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will have to have their assets expanded with growth hormones.",
				activatedText: "in order to be sold in the arcology, slaves must have their assets expanded with growth hormones.",
				get requirements() { return (V.arcologies[0].FSAssetExpansionist >= 40); },
			}
		],
	},
	FSPastoralist: {
		"arcologies[0].FSPastoralistSMR": [
			{
				title: "Universal Slave Lactation SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will be required to be actively lactating.",
				activatedText: "in order to be sold in the arcology, slaves must be actively lactating.",
				note: `Will help advance Pastoralism`,
				get requirements() { return (V.arcologies[0].FSPastoralist >= 40); },
			}
		],
		"arcologies[0].FSPastoralistLaw": [
			{
				title: "Animal Products Ban",
				titleClass: "lime",
				text: "animal products that compete with slave fluids will be banned.",
				activatedText: "animal products that compete with slave fluids are banned.",
				get requirements() { return (V.arcologies[0].FSPastoralist >= 90); },
				note: `Will reduce market freedom, damaging the arcology's prosperity`
			}
		],
	},
	FSPhysicalIdealist: {
		"arcologies[0].FSPhysicalIdealistSMR": [
			{
				title: "Lifting SMR",
				titleClass: "lime",
				get text() {
					let t = `in order to be sold in the arcology, slaves will have to be `;
					if (V.arcologies[0].FSPhysicalIdealistLaw) {
						t += ` toned.`;
					} else {
						t += ` bulked.`;
					}
					return t;
				},
				get activatedText() {
					let t = `in order to be sold in the arcology, slaves must be `;
					if (V.arcologies[0].FSPhysicalIdealistLaw) {
						t += ` toned.`;
					} else {
						t += ` bulked.`;
					}
					return t;
				},
				note: `Will help advance Physical Idealism`,
				get requirements() { return (V.arcologies[0].FSPhysicalIdealist >= 40); },
			}
		],
		"arcologies[0].FSPhysicalIdealistLaw": [
			{
				title: "Fit Feminine Ideal",
				titleClass: "lime",
				text: "you will do your best to start a fashion for fit, healthy girls with just the right amount of muscle definition.",
				activatedText: "you are doing your best to maintain a fashion for fit, healthy girls with just the right amount of muscle definition.",
				get requirements() {
					return (
						V.arcologies[0].FSHedonisticDecadenceLaw2 === 0 &&
						V.arcologies[0].FSSlimnessEnthusiastLaw === 0 &&
						V.arcologies[0].FSGenderRadicalistLawBeauty === 0 &&
						V.arcologies[0].FSGenderFundamentalistLawBeauty === 0 &&
						V.arcologies[0].FSPhysicalIdealistStrongFat === 0 &&
						V.arcologies[0].FSPhysicalIdealist >= 60
					);
				},
				note: `Will greatly affect society's views on slave beauty`
			}
		],
		"arcologies[0].FSPhysicalIdealistStrongFat": [
			{
				title: "Strongfat Feminine Ideal",
				titleClass: "lime",
				text: "you will do your best to start a fashion for strong girls with a thick layer of fat over their muscles.",
				activatedText: "you are doing your best to maintain a fashion for strong girls with a thick layer of fat over their muscles.",
				get requirements() { return (V.arcologies[0].FSPhysicalIdealist >= 60); },
				note: `Will greatly affect society's views on slave beauty`
			}
		],
	},
	FSHedonisticDecadence: {
		"arcologies[0].FSHedonisticDecadenceSMR": [
			{
				title: "Corpulence SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will be required to be plump.",
				activatedText: "in order to be sold in the arcology, slaves must be plump.",
				note: `Will help advance Hedonistic Decadence`,
				get requirements() { return (V.arcologies[0].FSHedonisticDecadence >= 40); },
			}
		],
		"arcologies[0].FSHedonisticDecadenceLaw2": [
			{
				title: "Rotund Feminine Ideal",
				titleClass: "lime",
				text: "you will do your best to start a fashion for thick girls with soft bellies, big butts and luscious tits.",
				activatedText: "you are doing your best to maintain a fashion for thick girls with soft bellies, big butts and luscious tits.",
				get requirements() {
					return (
						V.arcologies[0].FSSlimnessEnthusiastLaw === 0 &&
						V.arcologies[0].FSSlimnessEnthusiastFoodLaw === 0 &&
						V.arcologies[0].FSGenderRadicalistLawBeauty === 0 &&
						V.arcologies[0].FSGenderFundamentalistLawBeauty === 0 &&
						V.arcologies[0].FSPhysicalIdealistLaw === 0 &&
						V.arcologies[0].FSGenderRadicalistLawFuta !== 3 &&
						V.arcologies[0].FSHedonisticDecadence >= 60
					);
				},
				note: `Will greatly affect society's views on slave beauty`
			}
		],
		"arcologies[0].FSHedonisticDecadenceStrongFat": [
			{
				title: "Fat n' Strong Feminine Ideal",
				titleClass: "lime",
				text: "you will do your best to start a fashion for thick girls with plenty of muscle under their fat.",
				activatedText: "you are doing your best to maintain a fashion for thick, strong girls.",
				get requirements() { return (V.arcologies[0].FSHedonisticDecadence >= 60); },
				note: `Will greatly affect society's views on slave beauty`
			}
		],
		"arcologies[0].FSHedonisticDecadenceLaw": [
			{
				title: "Life's Joys Subsidy",
				titleClass: "lime",
				text: "food vendors will be offered reduced rent and operating expenses.",
				activatedText: "food vendors are offered reduced rent and operating expenses.",
				get requirements() { return (V.arcologies[0].FSHedonisticDecadence >= 90); },
				note: `Will improve prosperity but decrease rental income — tailors may see increased business`
			}
		],
	},
	FSChattelReligionist: {
		"arcologies[0].FSChattelReligionistSMR": [
			{
				title: "Consecration by Public Use SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will be offered for public use for a single day.",
				activatedText: "in order to be sold in the arcology, slaves must be offered for public use for a single day.",
				note: `Will help advance Chattel Religionism`,
				get requirements() { return (V.arcologies[0].FSChattelReligionist >= 40); },
			}
		],
		"arcologies[0].FSChattelReligionistLaw": [
			{
				title: "Official Religion",
				titleClass: "lime",
				text: "you will be enshrined as the prophet of a vibrant slaveowning religion.",
				activatedText: "you are enshrined as the prophet of a vibrant slaveowning religion.",
				get requirements() { return (V.arcologies[0].FSChattelReligionist >= 90); },
				note: `Will increase your renown`
			}
		],
		"arcologies[0].FSChattelReligionistLaw2": [
			{
				title: "Holy Nudism",
				titleClass: "lime",
				text: "religious clothing standards will shift from modesty to exposure.",
				activatedText: "religious clothing standards emphasize exposure rather than modesty.",
				get requirements() { return (V.arcologies[0].FSChattelReligionist >= 60); },
				note: `Along with nudity, certain revealing clothing, including the chattel habit, will remain acceptable attire.`
			}
		],
		"arcologies[0].FSChattelReligionistCreed": [
			{
				title: "Chattel Religionist Creed",
				titleClass: "lime",
				get text() {
					let t = `Chattel Religionism in your arcology will subscribe to the creed established by the ${V.nicaea.name}, which honors`;
					if (V.nicaea.focus === "slaves") {
						t += ` slaves,`;
					} else {
						t += ` slaveowners,`;
					}
					t += ` enhances`;
					if (V.nicaea.assignment === Job.WHORE) {
						t += ` prostitution,`;
					} else if (V.nicaea.assignment === Job.PUBLIC) {
						t += ` public service,`;
					} else {
						t += ` fucktoy duty,`;
					}
					t += ` and respects`;
					if (V.nicaea.achievement === "slaves") {
						t += ` owning many sex slaves`;
					} else if (V.nicaea.achievement === "devotion") {
						t += ` worshipful slaves.`;
					} else {
						t += ` trusting slaves.`;
					}
					t += ` The creed is`;
					if (V.nicaea.power > 1) {
						t += ` strong.`;
					} else {
						t += ` somewhat weak.`;
					}
					return t;
				},
				get activatedText() {
					let t = `Chattel Religionism in your arcology subscribes to the creed established by the ${V.nicaea.name}, which honors`;
					if (V.nicaea.focus === "slaves") {
						t += ` slaves,`;
					} else {
						t += ` slaveowners,`;
					}
					t += ` enhances`;
					if (V.nicaea.assignment === Job.WHORE) {
						t += ` prostitution,`;
					} else if (V.nicaea.assignment === Job.PUBLIC) {
						t += ` public service,`;
					} else {
						t += ` fucktoy duty,`;
					}
					t += ` and respects`;
					if (V.nicaea.achievement === "slaves") {
						t += ` owning many sex slaves`;
					} else if (V.nicaea.achievement === "devotion") {
						t += ` worshipful slaves.`;
					} else {
						t += ` trusting slaves.`;
					}
					t += ` The creed is`;
					if (V.nicaea.power > 1) {
						t += ` strong.`;
					} else {
						t += ` somewhat weak.`;
					}
					return t;
				},
				onRepeal: function() {
					cashX(-10000, "policies");
					repX(-2000, "policies");
				},
				hide: {ifActivated: 0}, // Manual activation is not possible.
				activatedNote: `Repealing this policy costs twice as much as implementing it`
			}
		],
	},
	FSRomanRevivalist: {
		"arcologies[0].FSRomanRevivalistSMR": [
			{
				title: "Market Slave Expendability SMR",
				titleClass: "lime",
				text: "slave markets are encouraged to immediately dispose of low quality menial slaves in gladiatorial combats.",
				activatedText: "slave markets are encouraged to immediately dispose of low quality menial slaves in gladiatorial combats.",
				note: `Will help advance Roman Revivalism`,
				get requirements() { return (V.arcologies[0].FSRomanRevivalist >= 40); },
			}
		],
		"arcologies[0].FSRomanRevivalistLaw": [
			{
				title: "Republican Military Establishment",
				titleClass: "lime",
				text: "all citizens of stature will be required to participate personally in the defense of the state.",
				activatedText: "all citizens of stature are required to participate personally in the defense of the state.",
				get requirements() { return (V.arcologies[0].FSRomanRevivalist >= 90); },
				note: `Will improve your arcology's combat power during crises`
			}
		],
	},
	FSAztecRevivalist: {
		"arcologies[0].FSAztecRevivalistSMR": [
			{
				title: "Captured and Incorrigible Slaves Tribute",
				titleClass: "lime",
				text: "all captured and incorrigible slaves will be made tribute to the altars.",
				activatedText: "all captured and incorrigible slaves must be made tribute to the altars.",
				note: `Will help advance Aztec Revivalism`,
				get requirements() { return (V.arcologies[0].FSAztecRevivalist >= 40); },
			}
		],
		"arcologies[0].FSAztecRevivalistLaw": [
			{
				title: "Mandatory Artisan Training",
				titleClass: "lime",
				text: "to inherit or receive a trade a citizen will have to pass a mandatory course in one of the academies.",
				activatedText: "to inherit or receive a trade a citizen must pass a mandatory course in one of the academies.",
				get requirements() { return (V.arcologies[0].FSAztecRevivalist >= 90); },
				note: `Will improve your arcology's combat power during crises`
			}
		],
	},
	FSEgyptianRevivalist: {
		"arcologies[0].FSEgyptianRevivalistSMR": [
			{
				title: "Egyptian Cultural Induction SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will be instructed in the cultural tenets of ancient Egypt.",
				activatedText: "in order to be sold in the arcology, slaves must be instructed in the cultural tenets of ancient Egypt.",
				note: `Will help advance Egyptian Revivalism`,
				get requirements() { return (V.arcologies[0].FSEgyptianRevivalist >= 40); },
			}
		],
		"arcologies[0].FSEgyptianRevivalistLaw": [
			{
				title: "Pharaoh's Consort",
				titleClass: "lime",
				text: "your Head Girl will be given legal status as your Consort.",
				get activatedText() {
					if (S.HeadGirl) {
						const {his} = getPronouns(S.HeadGirl);
						return `your Head Girl holds legal status as your Consort, increasing ${his} prominence.`;
					} else {
						return `though you do not currently have a Head Girl, they would hold legal status as your Consort, increasing their prominence.`;
					}
				},
				get requirements() { return (V.arcologies[0].FSEgyptianRevivalist >= 90); },
				note: `Will increase your Head Girl's prominence`
			}
		],
	},
	FSEdoRevivalist: {
		"arcologies[0].FSEdoRevivalistSMR": [
			{
				title: "Edo Cultural Induction SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will have to be instructed in the cultural tenets of Edo Japan.",
				activatedText: "in order to be sold in the arcology, slaves must be instructed in the cultural tenets of Edo Japan.",
				note: `Will help advance Edo Revivalism`,
				get requirements() { return (V.arcologies[0].FSEdoRevivalist >= 40); },
			}
		],
		"arcologies[0].FSEdoRevivalistLaw": [
			{
				title: "Cultural Insularity",
				titleClass: "lime",
				text: "will protect the arcology from old world influences.",
				activatedText: "protects the arcology from old world influences, speeding the acceptance of all future societies.",
				get requirements() { return (V.arcologies[0].FSEdoRevivalist >= 90); },
				note: `Will speed the acceptance of all future societies`
			}
		],
	},
	FSArabianRevivalist: {
		"arcologies[0].FSArabianRevivalistSMR": [
			{
				title: "Arabian Cultural Induction SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will be instructed in the cultural tenets of the old Caliphate.",
				activatedText: "in order to be sold in the arcology, slaves must be instructed in the cultural tenets of the old Caliphate.",
				note: `Will help advance Arabian Revivalism`,
				get requirements() { return (V.arcologies[0].FSArabianRevivalist >= 40); },
			}
		],
		"arcologies[0].FSArabianRevivalistLaw": [
			{
				title: "Jizya Tax",
				titleClass: "lime",
				text: "will raise the rents of unassimilated citizens, speeding the acceptance of all future societies.",
				activatedText: "raises the rents of unassimilated citizens, speeding the acceptance of all future societies.",
				get requirements() { return (V.arcologies[0].FSArabianRevivalist >= 90); },
				note: `Will moderately increase rental income and improve acceptance of all future societies`
			}
		],
	},
	FSChineseRevivalist: {
		"arcologies[0].FSChineseRevivalistSMR": [
			{
				title: "Imperial Cultural Induction SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will have to be instructed in the cultural tenets of Imperial China.",
				activatedText: "in order to be sold in the arcology, slaves must be instructed in the cultural tenets of Imperial China.",
				note: `Will help advance Chinese Revivalism`,
				get requirements() { return (V.arcologies[0].FSChineseRevivalist >= 40); },
			}
		],
		"arcologies[0].FSChineseRevivalistLaw": [
			{
				title: "Slave Administrator Enabling Law",
				titleClass: "lime",
				get text() {
					if (S.HeadGirl) {
						const {him} = getPronouns(S.HeadGirl);
						return `will afford your Head Girl considerable legal power, allowing ${him} to accomplish even more slave training.`;
					} else {
						return `will afford a Head Girl considerable legal power, allowing them to accomplish even more slave training.`;
					}
				},
				get activatedText() {
					if (S.HeadGirl) {
						const {him} = getPronouns(S.HeadGirl);
						return `affords your Head Girl considerable legal power, allowing ${him} to accomplish even more slave training.`;
					} else {
						return `affords a Head Girl considerable legal power, allowing them to accomplish even more slave training.`;
					}
				},
				get requirements() { return (V.arcologies[0].FSChineseRevivalist >= 90); },
			}
		],
	},
	FSNeoImperialist: {
		"arcologies[0].FSNeoImperialistSMR": [
			{
				title: "Neo-Imperial Cultural Induction SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves must be instructed in the cultural tenets of your syncretic society and understand their place in the new hierarchy.",
				activatedText: "in order to be sold in the arcology, slaves are instructed in the cultural tenets of your syncretic society and must prove that they understand their place in the new hierarchy.",
				get requirements() { return (V.arcologies[0].FSNeoImperialist >= 40); },
				note: `Will help advance Neo-Imperialism`
			}
		],
		"arcologies[0].FSNeoImperialistLaw1": [
			{
				title: "Neo-Imperial Knighthood",
				titleClass: "lime",
				text: "prominent citizens of your arcology can be dubbed as Imperial Knights, granting them higher station and social prestige in exchange for defending your arcology tooth and nail from invasions and leading citizen's militias.",
				activatedText: "prominent arcology citizens have been Knighted by you, granting them a small stipend and the prestigious noble title of Imperial Knight - which comes with the right to carry their own personal coat of arms - as they captain your citizen's militias and defend your arcology valiantly.",
				get requirements() { return (V.arcologies[0].FSNeoImperialist >= 60); },
				note: `Will improve your arcology's combat power during crises`
			}
		],
		"arcologies[0].FSNeoImperialistLaw2": [
			{
				title: "Neo-Imperial Baronies",
				titleClass: "lime",
				text: "the most elite citizens of your arcology can be granted titles as Imperial Barons, overseeing a section of your arcology in your stead. Though they'll collect a portion of the rent from their sections, close and careful micro-management should increase your overall income. In Eugenicist societies, Barons will be drawn exclusively from the formal societal elite, making them effectively one and the same.",
				activatedText: "the societal elite of your arcology have been granted high title as Imperial Barons, and given the right to oversee sections of your arcology, collect rents, and enforce your edicts to those who live and work in their managed districts. Though they take a portion of the income for themselves, their careful micro-management of each section of the arcology ensures that the entire system runs more smoothly and that minor issues are solved long before anyone needs to come to you.",
				get requirements() { return (V.arcologies[0].FSNeoImperialist >= 90); },
				note: `Will moderately increase rents`
			}
		],
	},
	FSAntebellumRevivalist: {
		"arcologies[0].FSAntebellumRevivalistSMR": [
			{
				title: "Antebellum Cultural Induction SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves must be instructed in the cultural tenets of Antebellum society.",
				activatedText: "in order to be sold in the arcology, slaves must be instructed in the cultural tenets of Antebellum society.",
				get requirements() { return (V.arcologies[0].FSAntebellumRevivalist >= 40); },
				note: `Will help advance Antebellum Revivalism`
			}
		],
		"arcologies[0].FSAntebellumRevivalistLaw1": [
			{
				title: "Affirm the Rights of Slaveowners",
				titleClass: "lime",
				text: "while slaveowners are already de facto the most prominent members of society within your arcology, the token gesture of legally enshrining the rights of slaveowners will help secure their loyalty and attract new wealthy citizens.",
				activatedText: "slaveowners are grateful to you and the arcology steadily attracts new wealthy citizens.",
				get requirements() { return (V.arcologies[0].FSAntebellumRevivalist >= 60); },
				note: `Will increase the rate at which slaveowners immigrate to your arcology, attracting middle class citizens and above.`
			}
		],
		"arcologies[0].FSAntebellumRevivalistLaw2": [
			{
				title: "Guarantee the Right to Bear Arms",
				titleClass: "lime",
				get text() {
					let text = `it is an expected right under the ideals established by Antebellum Revivalism that eligible citizens ought to be able to possess weaponry and form militias to defend themselves and their property.`;
					if (V.secExpEnabled && V.SecExp.edicts.weaponsLaw === 0) {
						text += ` By your edict, citizens are currently forbidden from possessing firearms. Enacting this law will automatically set the range of weapons allowed within the arcology to non-automatic, non-high caliber, free of the usual cost of authority.`;
					}
					return text;
				},
				activatedText: "citizens proudly carry arms in defense of themselves and the arcology against foreign threats and the slave class.",
				get requirements() { return (V.arcologies[0].FSAntebellumRevivalist >= 90); },
				onImplementation: function() {
					if (V.secExpEnabled && V.SecExp.edicts.weaponsLaw === 0) {
						V.SecExp.edicts.weaponsLaw = 1;
					}
				},
				note: `Improve your arcology's defensive combat power while also exacerbating any future rebellions`
			}
		],
	},
	FSRepopulationFocus: {
		"arcologies[0].FSRepopulationFocusSMR": [
			{
				title: "Occupied Womb SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves will be made capable of pregnancy, if they are not, and subsequently impregnated.",
				activatedText: "in order to be sold in the arcology, slaves must be pregnant.",
				get requirements() { return (V.arcologies[0].FSRepopulationFocusDecoration >= 40); },
				note: `Will help advance repopulation efforts. Due to surgery costs, male slaves will become less common`
			}
		],
		"arcologies[0].FSRepopulationFocusLaw": [
			{
				title: "Universal Pregnancy Subsidy",
				titleClass: "lime",
				text: "pregnant citizens will be offered reduced rent.",
				activatedText: "all pregnant citizens are offered reduced rent.",
				get requirements() { return (V.arcologies[0].FSRepopulationFocusDecoration >= 90); },
				note: `Will reduce your rental income`
			}
		],
	},
	FSRestart: {
		"arcologies[0].FSRestartSMR": [
			{
				title: "Population Control SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slave ovaries and testicles will be removed.",
				activatedText: "in order to be sold in the arcology, slaves must be infertile.",
				get requirements() { return (V.arcologies[0].FSRestartDecoration >= 90); },
				note: `Will help advance starting society over`
			}
		],
		"arcologies[0].FSRestartLaw": [
			{
				title: "Taxation of Fertile Non-Elite",
				titleClass: "lime",
				text: "fertile civilians, who are not part of society's Elite, will face increased taxation.",
				activatedText: "all fertile lower class citizens pay increased taxes.",
				get requirements() { return (V.arcologies[0].FSRestartDecoration >= 90); },
				note: `Will increase your rental income, but the lower class will dislike you`
			}
		],
		"arcologies[0].FSRestartResearch": [
			{
				title: "Elite Breeder Eligibility",
				titleClass: "lime",
				get text() {
					let t = `slaves that pass very strict tests may be permitted for use by the`;
					if (V.arcologies[0].FSNeoImperialistLaw2) {
						t += ` Barons to bear their children.`;
					} else {
						t += ` Societal Elite to bear their children.`;
					}
					return t;
				},
				get requirements() { return (V.arcologies[0].FSRestartDecoration >= 100 && V.rep >= 5000); },
				onImplementation: function() {
					repX(-4000, "policies");
					SugarCube.Engine.play("Breeder Proposal");
				},
				hide: {ifActivated: 1}, // Repeal is not possible.
				note: `Will greatly damage your reputation for even proposing`
			}
		],
	},
	FSSupremacist: {
		"arcologies[0].FSSupremacistSMR": [
			{
				title: "Ethnic Preservation SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, slaves of inferior races with dicks must have their balls removed to prevent racial pollution.",
				activatedText: "in order to be sold in the arcology, slaves of inferior races with dicks will have to have their balls removed to prevent racial pollution.",
				get requirements() { return (V.seeDicks !== 0 && V.arcologies[0].FSSupremacist >= 40); },
				note: `Will help advance racial Supremacy`
			}
		],
		"arcologies[0].FSSupremacistLawME": [
			{
				title: "Universal Enslavement of the Impure",
				titleClass: "lime",
				get text() { return `will force anyone not of the ${V.arcologies[0].FSSupremacistRace} race to emigrate or accept enslavement, and make sex with non-${V.arcologies[0].FSSupremacistRace} people such an expectation that the appetite for all such slaves will increase slightly.`; },
				get activatedText() { return `by law, anyone not of the ${V.arcologies[0].FSSupremacistRace} race in your arcology is a slave`; },
				get requirements() { return (V.arcologies[0].FSSupremacist >= 40); },
				onImplementation: function() {
					V.FSSupLawTrigger = 1;
					checkPolicyGameover();
				},
				onRepeal: function() { checkPolicyGameover(); },
				note: `Will affect the slave market and arcology drastically`
			}
		],
	},
	FSSubjugationist: {
		"arcologies[0].FSSubjugationistSMR": [
			{
				title: "Racial Purity SMR",
				titleClass: "lime",
				text: "in order to be sold in the arcology, subhumans with dicks will have to have their balls removed to prevent racial pollution.",
				activatedText: "in order to be sold in the arcology, subhumans with dicks must have their balls removed to prevent racial pollution.",
				get requirements() { return (V.seeDicks !== 0 && V.arcologies[0].FSSubjugationist >= 40); },
				note: `Will help advance racial Subjugation`
			}
		],
		"arcologies[0].FSSubjugationistLawME": [
			{
				title: "Universal Enslavement of Subhumans",
				titleClass: "lime",
				get text() { return `will force slavery on all ${V.arcologies[0].FSSubjugationistRace} subhumans in your arcology, and make sex with ${V.arcologies[0].FSSubjugationistRace} people such an expectation that the appetite for all such slaves will increase slightly.`; },
				get activatedText() { return `by law, all ${V.arcologies[0].FSSubjugationistRace} subhumans in your arcology are slaves`; },
				get requirements() { return (V.arcologies[0].FSSubjugationist >= 90); },
				onImplementation: function() {
					if (V.FSSubLawTrigger === 0) {
						V.FSSubLawTrigger = 1;
					}
					checkPolicyGameover();
				},
				onRepeal: function() { checkPolicyGameover(); },
				note: `Will affect the slave market and arcology drastically`
			}
		],
	}

};
