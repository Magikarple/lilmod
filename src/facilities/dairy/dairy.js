// cSpell:ignore intubators

App.Facilities.Dairy.dairy = class Dairy extends App.Facilities.Facility {
	constructor() {
		const dairy = App.Entity.facilities.dairy;
		const decommissionHandler = () => {
			V.dairy = 0;
			V.dairyDecoration = "standard";
			V.dairyFeedersUpgrade = 0;
			V.dairyPregUpgrade = 0;
			V.dairyStimulatorsUpgrade = 0;
			V.dairyFeedersSetting = 0;
			V.dairyPregSetting = 0;
			V.dairyStimulatorsSetting = 0;
			V.dairyHyperPregRemodel = 0;
			V.dairyRestraintsUpgrade = 0;
			V.dairyUpgradeMenials = 0;
			V.cumPipeline = 0;
			V.milkPipeline = 0;
			V.dairyPiping = 0;

			App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Manufacturing, "Dairy", "Manufacturing");
		};

		super(
			dairy,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Dairy";

		if (V.dairyRestraintsSetting !== 2 || V.dairyRestraintsUpgrade !== 1) {
			if (V.dairyStimulatorsSetting > 1) {
				V.dairyStimulatorsSetting = 1;
			}
			if (V.dairyPregSetting > 1) {
				V.dairyPregSetting = 1;
			}
			if (V.dairyFeedersSetting > 1) {
				V.dairyFeedersSetting = 1;
			}
		}
	}

	/** @returns {HTMLDivElement} */
	get slaves() {
		const div = document.createElement("div");
		if (V.dairyRestraintsSetting < 2) {
			div.append(App.UI.SlaveList.displayManager(this.facility));
		} else {
			div.append(`Current milking machine settings make a Milkmaid superfluous by replacing their duties with automation.`);
		}
		div.append(App.UI.SlaveList.listSJFacilitySlaves(this.facility, passage(), true));
		return div;
	}


	/** @returns {string} */
	get intro() {
		const text = [];

		text.push(`${this.facility.nameCaps} ${V.dairyRestraintsSetting > 1 ? `is an industrial facility, but there's a viewing gallery for visitors.` : ``} ${this.decorations}`);
		if (this.facility.hostedSlaves() > 2) {
			text.push(`${this.facility.nameCaps} is working steadily.`);

			if (V.dairyRestraintsUpgrade === 1 && V.dairyRestraintsSetting > 1) {
				text.push(`Each cow is strapped into their own milking machine. The machines are set up in rows, alternating forward and backward so that the cows are interleaved as closely as possible without touching.`);

				if (V.dairyFeedersUpgrade === 1 && V.dairyFeedersSetting > 0) {
					if (V.dairyFeedersSetting === 2) {
						text.push(`A phallic feeding tube completely fills each cow's mouth and throat, making it eerily quiet in there. Occasionally one of the cows convulses when a particularly long rush of food and drugs flows down their gullet.`);
					} else {
						text.push(`When feeding is required, a phallus extends into cows' mouths.`);
					}
				}
				if (V.dairyStimulatorsUpgrade === 1 && V.dairyStimulatorsSetting > 0) {
					if (V.dairyStimulatorsSetting === 2) {
						text.push(`Every cow is being sodomized by a massive phallus. Most are pumping away gently, the strokes taking a long time to push the half-${V.showInches === 2 ? `yard` : `meter`} of shaft into each slave's rectum and pull it out again. When a slave's balls are ready to give cum, however, the pace quickens, and the agonized slave wriggles in involuntary desperation to escape until they finally stiffen, squirt, and slump in exhaustion.`);
					} else {
						text.push(`Each cow's anus is periodically fucked by a machine phallus that ejaculates hydration directly up their butt. When a slave's balls are ready to give cum, they are mercilessly sodomized until prostate stimulation forces an orgasm.`);
					}
				}
				if (V.dairyPregUpgrade === 1 && V.dairyPregSetting > 0) {
					const DrugPlus = V.dairyPregSetting === 3;
					if (V.dairyPregSetting >= 2) {
						text.push(`Fertile cows' vaginas are constantly penetrated by huge dildos that ejaculate ${DrugPlus ? 'extra strong' : ''} fertility drugs${DrugPlus ? ' into their progressively distending wombs' : ''}.`);
						text.push(`The drugs ${DrugPlus ? 'induce intense arousal and' : 'produce'} excessive female lubrication, so the constant dildo rape fills ${this.facility.name} with occasional gushing noises${DrugPlus ? ' and nonstop moaning' : ''}.`);
					} else {
						text.push(`The fertile cows are visibly pregnant.`);
					}
				}
			} else {
				text.push(`The row of milking machines is available for cows to use.`);

				if (V.dairyRestraintsSetting > 0) {
					text.push(`When they do, the machines gently restrain them until they are completely done.`);
				}
				if (V.dairyFeedersUpgrade === 1 && V.dairyFeedersSetting > 0) {
					text.push(`The machines mount convenient phallic feeders for slaves to suck for tasty food while they're milked.`);
				}
				if (V.dairyPregUpgrade === 1 && V.dairyPregSetting > 0) {
					text.push(`The fertile cows are visibly pregnant.`);
				}
				if (V.dairyStimulatorsUpgrade === 1 && V.dairyStimulatorsSetting > 0) {
					text.push(`The machines gently sodomize cows who need the extra nutrition and treatment the dildos can ejaculate into them${V.seeDicks > 0 ? `, and fuck them more vigorously when they need help ejaculating.` : ``}`);
				}
			}
		} else if (V.bioreactorsXY + V.bioreactorsXX + V.bioreactorsHerm + V.bioreactorsBarren > 0) {
			text.push(`${this.facility.nameCaps} is quiet and calm. The only sounds are faint sucking and gushing noises.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`${this.facility.nameCaps} is sparsely populated.`);
		} else if (S.Milkmaid) {
			text.push(`${S.Milkmaid.slaveName} is alone in ${this.facility.name}, and has nothing to do but clean and maintain the equipment.`);
		} else {
			text.push(`${this.facility.nameCaps} is empty and quiet.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		let FS = null;

		if (V.dairyRestraintsSetting > 1) {
			FS = {
				"Roman Revivalist": `The screens there review each slave's liquid contributions to the state in minute detail.`,
				"Neo-Imperialist": `The sleek screens display a variety of statistics on each slave's vitals and production.`,
				"Aztec Revivalist": `The strange sight of the milking machines, designed to look like fertility statues gives the space an imposing feeling.`,
				"Egyptian Revivalist": `The screens there list a tally of each slave's contributions to the harvest this season. They also identify related slaves who occupy multi-slave milking machines so that they may feed each other directly.`,
				"Edo Revivalist": `It looks out on a strangely contradictory sight: a beautiful and terrible combination of modern slavery and technology, placed amongst tatami mats and rice paper partitions.`,
				"Arabian Revivalist": `It looks out on a strangely contradictory sight: a beautiful and terrible combination of modern slavery and technology, placed inside brightly tiled walls.`,
				"Chinese Revivalist": `The milking machines are fascinating: they're encased in decorative carvings, making it look like the slaves are in the embrace of traditional Chinese depictions of lions, bears, and dragons.`,
				"Antebellum Revivalist": `The gallery is richly decorated like an opera box, providing a comfortable spot to view the factory floor below. On one wall, long lines of chalk form a grid, with each row corresponding to one of the cattle. A little photograph, the cow's name, and various stats, such as asset volume and productivity, fill out the columns.`,
				"Chattel Religionist": `It presents the inmates as lessons, here to expiate their sins in a purgatory created by technology.`,
				"Degradationist": `The screens there feature, among a sea of facts and figures about each slave, their most recent brain scan.`,
				"Repopulationist": `The gallery is placed for a good view of each slave's swelling breasts and growing pregnancy. A screen is prominently displayed before each slave, detailing the number of babies she produced and the current number occupying their womb.`,
				"Eugenics": `The screens there tell very little about the slaves within. That information is privy only to Society's Elite.`,
				"Asset Expansionist": `It's designed for VIP visits, since this place is arguably the present apogee of expansionism. Nowhere else can breasts become so large. This is a place for pride.`,
				"Transformation Fetishist": `It's designed for VIP visits, since this place is arguably the present apogee of transformationism. Nowhere else can slaves be so radically changed, from humans into something less — and something more.`,
				"Gender Radicalist": `The gallery is placed for a good view of each slave's front, from their head to what's between their spread legs.`,
				"Gender Fundamentalist": `The gallery is placed for a good view of each slave's breasts, belly, and cunt. Visitors can critically compare each feminine advantage.`,
				"Physical Idealist": `The gallery is placed for a good view of each slave's body. Though muscles are at a lower premium here, there is intense interest in such radical changes to human biology.`,
				"Supremacist": `The screens there give information about each cow, but the data they present is also predictive. They imply a vision for a world in which more subhumans serve in this way. Many more.`,
				"Subjugationist": `The screens there give information about each cow, but the data they present is also predictive. They imply a vision for a world in which more milking machines have ${V.arcologies[0].FSSubjugationistRace} components. Many more.`,
				"Paternalist": `The screens there include feeds that show what media is being pumped into the slaves through their machines. It's designed to provide as much mental stimulation as possible.`,
				"Pastoralist": `The screens there let the production figures speak for themselves. There may be more personable cows out there, but they don't produce milk like these do.`,
				"Maturity Preferentialist": `The screens there give each slave's productivity and forecast it into the future. The facility is unmatched at extracting value from mature bodies.`,
				"Youth Preferentialist": `The screens there give each slave's productivity and forecast it into the future. The best bodies here have many, many years of productivity ahead of them.`,
				"Body Purist": `The screens there offer reams of data on each slave's product purity. Drugs are necessary here, and each body's balance results in a different grade of product.`,
				"Slimness Enthusiast": `The screens there alternate live views of the fashionably slim cows in their stalls with brief infomercials on the specialized techniques and equipment ${this.facility.name} uses to extract milk from such modest udders.`,
				"Hedonistic": `The gallery is placed for a good view of each slave's fattened body and the undulations running through them from the force of the milkers${V.dairyPregSetting || V.dairyFeedersSetting || V.dairyStimulatorsSetting ? ` and other assorted tubes and dildos` : ``}.`,
				"Intellectual Dependency": `The screens there feature an active scan showcasing each slave's diminishing brain activity.`,
				"Slave Professionalism": `It serves as a dire warning to what happens to unskilled, moronic slaves.`,
				"Petite Admiration": `The gallery is placed for a good view of each slave's petite body. Those that don't fit in a standard milking unit are kept well out of sight.`,
				"Statuesque Glorification": `The gallery is placed for a good view of each slave's body. Fascinated visitors may peruse each slave's productivity statistics contrasted against their height on a corresponding touchscreen.`,
				"standard": `Fascinated visitors may peruse each slave's productivity statistics on a corresponding touchscreen.`,
			};
		} else {
			FS = {
				"Roman Revivalist": `is functional and clean, using traditional methods wherever possible. At one end of the long row of stalls there is an alcove with a shrine to the Roman goddess of bountiful harvests.`,
				"Neo-Imperialist": `is cold and industrial, filled with the latest in industrial harvesting technology. The slaves do their duty underneath the hanging banners of your house, reminding them who owns their very bodies and all they produce.`,
				"Aztec Revivalist": `is sterile and organized, using traditional methods wherever possible. At one end of the long row of stalls there is an alcove with a shrine to the Aztec god of the Earth.`,
				"Egyptian Revivalist": `is functional and clean, using traditional methods wherever possible. At one end of the long row of stalls there is an alcove with a shrine to the Egyptian god of bountiful harvests.`,
				"Edo Revivalist": `is clean and traditional. The stalls are constructed of bamboo and carefully shaped wood, and muscle power is used wherever possible. Cows exercise and help out by walking on a wooden wheel that raises fresh water to ${this.facility.name}.`,
				"Arabian Revivalist": `is clean and traditional. Its dusky stone walls keep it so warm that the cows go nude, basking in the hot sun between milkings.`,
				"Chinese Revivalist": `is clean and traditional. The stalls are constructed of bamboo and carefully shaped wood, and muscle power is used wherever possible. Cows exercise and help out by fetching and carrying as best they can.`,
				"Antebellum Revivalist": `is like a barn, and isn't kept especially clean. Each cow has a stall fitted with a harness, not unlike a saddle, and the floor is covered with a healthy layer of straw.`,
				"Chattel Religionist": `is functional and clean. There are nice quotations from the holy book on the walls, and there is a little shrine designed to allow a cow who has difficulty standing to make their devotions comfortably.`,
				"Degradationist": `is harsh and utilitarian. There are stands to restrain cows who aren't being milked for dosing, punishment, or sexual use. There are cattle prods here and there to use on resistant cows, unproductive cows, or cows one wishes to hear scream.`,
				"Repopulationist": `is comfortable and well-kept. The milking machines are specially designed to maximize a pregnant cow's comfort. After a milking, cows have a wide selection of soft furniture to choose from, so comfortable that most fall fast asleep.`,
				"Eugenics": `is comfortable, well-kept and well-monitored. Cows are kept track of at all times to make sure no-one tries to increase milk production via pregnancy.`,
				"Asset Expansionist": `looks misleadingly industrial at first glance. Though the cows here are free-range, the facility mounts a system of slings and cranes to allow slaves with massive udders to walk around with their tits suspended from the ceiling.`,
				"Transformation Fetishist": `looks like a medical facility at first glance. Transformation is just as much a priority as production: there are surgical and drug injection machines right here.`,
				"Gender Radicalist": `is comfortable and well-kept. The milking machines include perianal vibrators to massage slaves from butthole to cock while they give cum.`,
				"Gender Fundamentalist": `is comfortable and well-kept. The milking machines include vibrators so that cows can get off while they're milked.`,
				"Physical Idealist": `could be mistaken for a gym with milking machines. Cows here are expected to keep fit between milkings, since the best milk comes from cattle who are healthy, muscular, and strong.`,
				"Supremacist": `is spartan, since that's all subhuman cows need. There are cattle prods here and there to use on resistant cows, unproductive cows, or subhuman cows one wishes to hear scream.`,
				"Subjugationist": `is spartan, since that's all ${V.arcologies[0].FSSubjugationistRace} cows need. There are cattle prods here and there to use on resistant cows, unproductive cows, or ${V.arcologies[0].FSSubjugationistRace} cows one wishes to hear scream.`,
				"Paternalist": `is comfortable and well-kept. Rather than stalls, ${this.facility.name} has an open arrangement of machines cows can use freely, and a lovely common area they can relax in afterward.`,
				"Pastoralist": `is state of the art, but is also brilliantly designed to look like a barn. All the advanced machinery retracts when not in use, leaving the cows in a clean, airy pastoral paradise. It smells of summer.`,
				"Maturity Preferentialist": `is inviting and homelike. After a milking, cows have a wide selection of soft furniture to choose from, so comfortable that most fall fast asleep.`,
				"Youth Preferentialist": `is functional, but fun. There are all sorts of fun activities to keep the cows amused between milkings, cleverly adapted for girls with massive mammaries.`,
				"Body Purist": `is state of the art, and spotlessly clean. All attention here is on the cows, to keep them happy, productive, and pure.`,
				"Slimness Enthusiast": `is quite unusual. Since the cows it milks may not necessarily have gigantic boobs, the milking machines here can adapt to drain cream from any body.`,
				"Hedonistic": `is comfortable and fun. The stalls are filled with thick, soft pillows to lounge on while hooked to the milking machines and with plenty of toys to make use of while getting milked. Cows here are expected to binge eat between milkings, since the best milk comes from cattle who are immobile, stuffed with food and hugely fat.`,
				"Intellectual Dependency": `is simple and fun. Getting situated for milking is easy enough for even the dumbest cow to figure out and there are all sorts of activities to keep the cows amused between milkings.`,
				"Slave Professionalism": `is functional and clean. A wide selection of informative documentaries and books are available for cows to keep their minds sharp while the milker does its business.`,
				"Petite Admiration": `is comfortable and well-kept. While designed for miniature cows, accommodations for large udders allow even the lankiest of cattle to make use of the machinery.`,
				"Statuesque Glorification": `is comfortable and well-kept. While designed for towering cows, accommodations for large udders allow even the shortest of cattle to make use of the machinery; even if they need help to reach it.`,
				"standard": `is comfortable and well-kept. It features nice rest areas for cows to lounge in after a milking, and exercise equipment to keep them healthy.`,
			};
		}

		const res = FS[V.dairyDecoration];
		if (!res) {
			throw new Error(`Unknown V.dairyDecoration value of '${V.dairyDecoration}' found in decorations().`);
		}
		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			desc: `${this.facility.nameCaps} can support ${V.dairy} milkers. There ${this.facility.hostedSlaves() === 1 ? 'is' : 'are'} currently ${numberWithPluralOne(this.facility.hostedSlaves(), 'cow')} being drained in ${V.dairyName}.`,
			removeSlave: "get milked",
		};
	}

	/** @returns {FC.IUpgrade[]}*/
	get upgrades() {
		return [
			{
				property: "dairyFeedersUpgrade",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} is equipped to feed and clean slaves normally.`,
						link: `Upgrade the milking machines with intubators`,
						cost: 10000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 1,
						text: `The milking machines can hold feeders in slaves' mouths and inject drugs into their bodies, ensuring ideal nutrition and production.`,
					}
				],
			},

			{
				property: "dairyPregUpgrade",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} is not prepared to support cow pregnancies, and therefore cannot be used to contract out fertile slaves' wombs.`,
						link: `Upgrade the dairy to support pregnancies`,
						cost: 2500 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} can support cow pregnancies.`,
					}
				],
			},
			{
				property: "dairyStimulatorsUpgrade",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} does not automatically sodomize.`,
						link: `Upgrade the cockmilking machines with sodomizers`,
						cost: 10000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 1,
						text: `The milking machines mount reciprocating dildos that can sodomize the slaves, delivering extra nutrition and pharmaceuticals. ${V.seeDicks ? `The prostate stimulation also serves to increase semen production, where appropriate.` : ``}`,
					}
				],
			},
			{
				property: "dairyPrepUpgrade",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps}'s industrial machines can only accept slaves with loose holes.`,
						link: `Install a preparatory raper`,
						cost: 5000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						prereqs: [
							(V.dairyPregSetting === 2 || V.dairyStimulatorsSetting === 2)
						],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} features a preparatory raper designed to gape slaves for integration.`,
					}
				],
			},
			{
				property: "dairyRestraintsUpgrade",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} is not equipped to restrain recalcitrant cows.`,
						link: `Equip the dairy with milking racks`,
						cost: 5000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} is equipped to restrain cows.`,
					}
				],
			},
			{
				property: "dairyHyperPregRemodel",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps}'s milking racks can be remodeled to hold hyper-pregnant cattle.`,
						link: `Expand the milking racks`,
						cost: 10000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						prereqs: [
							!!V.seeHyperPreg,
							V.dairyRestraintsSetting === 2,
							V.dairyStimulatorsSetting === 2,
							V.dairyFeedersSetting === 2,
							V.dairyPregSetting > 0,
						],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps}'s milking racks have been remodeled to allow cows' abnormal pregnancies room to grow.`,
					}
				],
			},
			{
				property: "dairySlimMaintainUpgrade",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `Dairy cows' breasts will expand normally as a result of the milking process.`,
						link: `Optimize the milking process to preserve small breast sizes`,
						cost: 5000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += 0.1;
							V.dairySlimMaintain = 1;
						},
						prereqs: [
							V.arcologies[0].FSSlimnessEnthusiast > 80,
						],
					},
					{
						value: 0,
						upgraded: 1,
						text: `Dairy cows' breasts will expand normally as a result of the milking process.`,
						link: `Optimize the milking process to preserve small breast sizes`,
						cost: 5000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += 0.1;
							V.dairySlimMaintain = 1;
						},
						prereqs: [
							V.arcologies[0].FSSlimnessEnthusiast > 20,
							V.arcologies[0].FSSlimnessEnthusiast <= 80,
						],
					},
					{
						value: 1,
						text: V.arcologies[0].FSSlimnessEnthusiast > 20
							? `Thanks to advances precipitated by the arcology's commitment to the fashion of slimmer slaves, ${this.facility.name} has been updated with optimized milkers for small breasts, and a customized drug regimen to extract maximum output while maintaining fashionably small breast sizes.`
							: `${this.facility.name} has been updated with milkers optimized for small breasts and a customized drug regimen to extract maximum output without causing excessive growth.`,
					}
				],
			},
			{
				property: "dairyUpgradeMenials",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `There is no provision for milking menial Bioreactors.`,
						link: `Add hose hookups`,
						cost: 5000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						prereqs: [
							!FutureSocieties.isActive('FSPaternalist'),
						],
					},
					{
						value: 1,
						text: V.menialBioreactors > 0
							? `Menial Bioreactors are restrained here and there, in every unused space. Hoses run from their nipples${V.seeDicks > 0 ? ` and penises` : ``} into the machinery, and from the machinery into their mouths${V.seeDicks > 0 ? `, anuses, and the pussies beneath their pregnant bellies` : ` and anuses`}.`
							: `In addition to the standard milking machines, ${this.facility.name} includes numerous hose hookups for menial Bioreactors. When there's space, any menial milkers you own can be placed in any empty space and connected.`,
					}
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "dairyFeedersSetting",
				prereqs: [
					 V.dairyFeedersUpgrade > 0,
				],
				options: [
					{
						get text() { return `The feeders have been disabled.`; },
						link: `Deactivate`,
						value: 0,
						handler: App.UI.DialogHandler(() => this._getEffect("feeders")),
					},
					{
						get text() { return `The feeders are active.`; },
						link: `Moderate`,
						value: 1,
						handler: App.UI.DialogHandler(() => this._getEffect("feeders")),
					},
					{
						get text() { return `The feeders are industrial.`; },
						link: `Industrial`,
						value: 2,
						handler: App.UI.DialogHandler(() => this._getEffect("feeders")),
						prereqs: [
							V.dairyRestraintsSetting > 1,
						],
					},
				],
			},
			{
				property: "dairyPregSetting",
				prereqs: [
					V.dairyPregUpgrade > 0,
				],
				options: [
					{
						get text() { return `Fertile cows' wombs are not for hire.`; },
						link: `Not for hire`,
						value: 0,
						handler: App.UI.DialogHandler(() => this._getEffect("preg")),
					},
					{
						get text() { return `Fertile cows' wombs are for hire.`; },
						link: `Moderate`,
						value: 1,
						handler: App.UI.DialogHandler(() => this._getEffect("preg")),
					},
					{
						get text() { return `Fertile cows' wombs are industrially employed.`; },
						link: `Industrial`,
						value: 2,
						handler: App.UI.DialogHandler(() => this._getEffect("preg")),
						prereqs: [
							V.dairyRestraintsSetting > 1,
						],
					},
					{
						get text() { return `Fertile cows' wombs are worked to capacity.`; },
						link: `Mass production`,
						value: 3,
						handler: App.UI.DialogHandler(() => this._getEffect("preg")),
						prereqs: [
							V.seeExtreme > 0,
							V.seeHyperPreg > 0,
							V.dairyRestraintsSetting > 1,
							V.dairyHyperPregRemodel === 1,
						],
					},
				],
			},
			{
				property: "dairyStimulatorsSetting",
				prereqs: [
					 V.dairyStimulatorsUpgrade > 0,
				],
				options: [
					{
						get text() { return `The sodomizers are inactive.`; },
						link: `Deactivate`,
						value: 0,
						handler: App.UI.DialogHandler(() => this._getEffect("stimulators")),
					},
					{
						get text() { return `The sodomizers are active.`; },
						link: `Moderate`,
						value: 1,
						handler: App.UI.DialogHandler(() => this._getEffect("stimulators")),
					},
					{
						get text() { return `The sodomizers are industrial, employing dildos the size of horse phalli.`; },
						link: `Industrial`,
						value: 2,
						handler: App.UI.DialogHandler(() => this._getEffect("stimulators")),
						prereqs: [
							!!V.seeExtreme,
							V.dairyRestraintsSetting > 1,
						],
					},
				],
			},
			{
				property: "dairyRestraintsSetting",
				prereqs: [
					 V.dairyFeedersUpgrade > 0,
				],
				options: [
					{
						get text() { return `The cows are restrained only when necessary, allowing obedient cows freedom to range around.`; },
						link: `Free range`,
						value: 0,
						handler: App.UI.DialogHandler(() => this._getEffect("restraints")),
					},
					{
						get text() { return `The cows are restrained when being milked, giving the machines full play.`; },
						link: `Restrain cows`,
						value: 1,
						handler: App.UI.DialogHandler(() => this._getEffect("restraints")),
					},
					{
						get text() { return `The cows are restrained permanently, allowing use of industrial techniques even devoted cows would flinch at.`; },
						link: `Permanent machine milking`,
						value: 2,
						handler: App.UI.DialogHandler(() => this._getEffect("restraints")),
					},
				],
			},
			{
				property: "createBioreactors",
				prereqs: [
					V.bioreactorsAnnounced !== 0,
					V.dairyRestraintsSetting === 2,
					V.dairyStimulatorsSetting === 2,
					V.dairyFeedersSetting === 2,
				],
				options: [
					{
						get text() { return `Perfected cows will be left as slaves.`; },
						link: `Deactivate`,
						value: 0,
					},
					{
						get text() { return `Perfected cows will be converted into equipment, permanently removing them from slave status.`; },
						link: `Convert`,
						value: 1,
					},

				],
			},
			{
				property: "dairySlimMaintain",
				prereqs: [
					 !!V.dairySlimMaintainUpgrade,
				],
				options: [
					{
						get text() { return `Milking will operate as normal and will allow the breasts of slimmer slaves to expand.`; },
						link: `Normal operation`,
						value: 0,
						note: `This will not remove existing lactation implants.`
					},
					{
						get text() { return `Milking will limit the breast growth of slimmer slaves while maximizing their milk output.`; },
						link: `Preserve breast sizes`,
						value: 1,
						note: `This will allow the automatic administration of lactation-inducing drugs.`
					},
				],
			},
			{
				property: "dairyImplantsSetting",
				prereqs: [
					 V.dairySlimMaintain === 0,
				],
				options: [
					{
						get text() { return `Naturally lactating cows, cows with non-lactating breasts, and cows incapable of producing cum will undergo lactation implant surgery to increase their milk output. Cows with working prostates will have them enhanced.`; },
						link: `Maximize milk production`,
						value: 0,
					},
					{
						get text() { return `All cows will undergo lactation implant surgery to increase their milk output.`; },
						link: `Maximize all production`,
						value: 1,
					},
					{
						get text() { return `Cows will not undergo surgical procedures to maximize production.`; },
						link: `Restrict maximization surgery`,
						value: 2,
					},
					{
						get text() { return `Non-lactating cows incapable of producing cum will undergo manual stimulation to promote natural production.`; },
						link: `Encourage natural lactation`,
						value: 3,
					},
				],
			},
			{
				property: "dairyWeightSetting",
				prereqs: [],
				options: [
					{
						get text() { return `Cow diets are not being monitored.`; },
						link: `Deactivate`,
						value: -1,
					},
					{
						get text() { return `Cows are being kept at least chubby.`; },
						link: `Chubby`,
						value: 0,
						note: V.dairySlimMaintainUpgrade === 1 || V.arcologies[0].FSSlimnessEnthusiast > 20
							? `Slimness controls will override all weight settings.`
							: null,
					},
					{
						get text() { return `Cows are being kept overweight.`; },
						link: `Overweight`,
						value: 1,
						note: V.dairySlimMaintainUpgrade === 1 || V.arcologies[0].FSSlimnessEnthusiast > 20
							? `Slimness controls will override all weight settings.`
							: null,
					},
					{
						get text() { return `Cows are being kept fat.`; },
						link: `Fat`,
						value: 2,
						note: V.dairySlimMaintainUpgrade === 1 || V.arcologies[0].FSSlimnessEnthusiast > 20
							? `Slimness controls will override all weight settings.`
							: null,
					},
					{
						get text() { return `Cows are being kept very fat.`; },
						link: `Very fat`,
						value: 3,
						note: V.dairySlimMaintainUpgrade === 1 || V.arcologies[0].FSSlimnessEnthusiast > 20
							? `Slimness controls will override all weight settings.`
							: null,
					},
					{
						get text() { return `Cows are being kept so fat they can barely move.`; },
						link: `Immobile`,
						value: 4,
						note: V.dairySlimMaintainUpgrade === 1 || V.arcologies[0].FSSlimnessEnthusiast > 20
							? `Slimness controls will override all weight settings.`
							: null,
					},
				],
			},
			{
				property: "milkmaidImpregnates",
				prereqs: [
					 !!S.Milkmaid,
				],
				options: [
					{
						get text() { return `${S.Milkmaid.slaveName} will not keep the cows pregnant ${getPronouns(S.Milkmaid).himself}.`; },
						link: `Forbid`,
						value: 0,
					},
					{
						get text() { return `Keeping the cows pregnant is part of ${S.Milkmaid.slaveName}'s job.`; },
						link: `Allow`,
						value: 1,
					},
				],
			},
			{
				property: "dairyHormonesSetting",
				prereqs: [],
				options: [
					{
						get text() { return `Hormone application is left to your discretion.`; },
						link: `Deactivate`,
						value: -1,
					},
					{
						get text() { return `Cows will not be given hormones.`; },
						link: `No hormones`,
						value: 0,
						note: `Favors milk production when possible.`,
					},
					{
						get text() { return `Cows will be given hormones.`; },
						link: `Normal dosage`,
						value: 1,
						note: `Favors milk production when possible.`,
					},
					{
						get text() { return `Cows will undergo intense hormone treatment.`; },
						link: `Maximum dosage`,
						value: 2,
						note: `Favors milk production when possible.`,
					},
				],
			},
		];
	}

	/** @returns {HTMLDivElement} */
	get stats() {
		return App.UI.DOM.makeElement("div", App.Facilities.Dairy.Stats(true));
	}

	/** @returns {HTMLDivElement} */
	get warning() {
		const div = document.createElement("div");
		if (V.dairyPregSetting > 1 || V.dairyFeedersSetting > 1 || V.dairyStimulatorsSetting > 1) {
			App.Events.addNode(div, [
				`<span class="warning">Current milking machine settings will have dramatic and possibly irreversible effects on cow bodies and minds.</span>`
			]);
		}
		return div;
	}

	/**
	 * Returns the dialog text to display when setting a rule.
	 * @param {'feeders'|'stimulators'|'preg'|'restraints'} setting
	 */
	_getEffect(setting) {
		const text = [];
		const {He: HeU, he: heU, him: himU, his: hisU, himself: himselfU} = getNonlocalPronouns(V.seeDicks);

		if (this.facility.hostedSlaves() > 1) {
			if (setting === "feeders") {
				if (V.dairyFeedersSetting < 2) {
					text.push(`In unison, the milking machines withdraw their feeders from the slaves' throats. The slaves gag and cough, strings of feeding fluid and saliva running between their lips and the heads of the feeding phalli. These remain close to their faces so that the slaves can suck them off once they get hungry, which they will, soon. The slaves' mouths and tongues are very tired, and most of them rest with their mouths open and their tongues hanging out.`);
				} else {
					text.push(`In unison, the milking machines press their feeding phalli into the slaves' mouths and down their throats. Once situated, they begin to facefuck the slaves, who gag and struggle as they figure out how to breathe while this is going on. Once each slave is no longer panicking and is inhaling and exhaling regularly, there is a hydraulic sound and the transparent reservoir of feeding fluid near their head begins to drain. The slaves swallow desperately, their bellies beginning to swell with nutrition and drugs.`);
				}
			} else if (setting === "preg") {
				if (V.dairyPregSetting === 2) {
					for (const slave of this.facility.employees()) {
						const {He, him, his} = getPronouns(slave);
						if (slave.vagina.isBetween(-1, 3)) {
							text.push(`${slave.slaveName}'s milking machine ejects ${him}, since it cannot fit the mandated dildo into ${his} tight cunt. <span class="yellow">${He} has been kicked out of ${this.facility.name}.</span>`);
							removeJob(slave, Job.DAIRY);
						}
						WombCleanGenericReserve(slave, "incubator", 9999);
						WombCleanGenericReserve(slave, "nursery", 9999);
						if (slave.broodmother > 0 || slave.bellyImplant !== -1) {
							text.push(`${slave.slaveName}'s milking machine ejects ${him}, since it detected a foreign body in ${his} womb blocking its required functions. <span class="yellow">${He} has been kicked out of ${this.facility.name}.</span>`);
							removeJob(slave, Job.DAIRY);
						}
					}

					text.push(`In unison, the milking machines withdraw their dildos from the pregnant slaves' vaginas. The auxiliary drug injectors hiss as the slaves are filled with drugs that promote natural lubrication. The slaves begin to shift awkwardly as they feel their pussies begin to drool slick female fluids. Once a machine judges that its slave's cunt is sufficiently wet, it readies a gigantic dildo. The slaves cannot see their own groins, but as soon as the heads of the dildos touch their pussylips, they begin to`);
					text.push(`struggle instinctively against their restraints${V.dairyFeedersSetting < 2 ? ', and the more energetic ones begin to weep': ''}.`);
					text.push(`As the massive phalli begin to ejaculate fertility drugs and semen, they drive all resistance out of the poor girls.`);
				} else if (V.dairyPregSetting === 1) {
					text.push(`In unison, the milking machines withdraw their monstrous dildos from the pregnant slaves' stretched cunts. Their pussies' overcharged production of natural lubricant produces a gush of pent-up female fluids from each loose vagina as the phalli slide clear.`);

					if (V.dairyFeedersSetting < 2) {
						text.push(`The slaves moan with relief at the sudden reduction in fullness. Being penetrated like that while pregnant must be quite uncomfortable.`);
					} else {
						text.push(`The slaves are silent, since their mouths and throats are being fucked by the feeders, but most of them relax a little in their restraints.`);
					}
					text.push(`The machines do replace the withdrawn dildos with more reasonably sized phalli and resume thrusting, but the slaves are relieved anyway.`);
				}
			} else if (setting === "stimulators") {
				if (V.dairyStimulatorsSetting < 2) {
					for (const slave of this.facility.employees().filter(s => s.anus.isBetween(-1, 3))) {
						const {He, him, his} = getPronouns(slave);
						text.push(`${slave.slaveName}'s milking machine ejects ${him}, since it cannot fit its massive anal dildo up ${his} tight asshole. <span class="yellow">${He} has been kicked out of ${this.facility.name}.</span>`);
						removeJob(slave, Job.DAIRY);
					}

					text.push(`In unison, the milking machines shove their dildos deep into slaves' anuses, ejaculating large quantities of lubricant deep inside their rectums. The slaves start in surprise at the sudden rush of warm slick fluid, and then relax as the phalli withdraw themselves from their butts. Their relief is short-lived, however, as their assholes are only empty for a moment. The reasonably sized dildos are replaced with dildos the size of horse cocks. As soon as the slaves feel the heads of these monstrous phalli press inexorably against their sphincters,`);
					text.push(`they begin to ${V.dairyStimulatorsSetting < 2 ? 'scream and struggle instinctively' : 'struggle wildly'}. As the constant assrape that will define their existences for the foreseeable future begins in earnest, their ${V.dairyStimulatorsSetting < 2 ? 'whining' : 'wriggling'}`);
					text.push(`gradually diminishes as each slave is exhausted and slumps within their restraints. The machines take no notice, and continue the relentless sodomy.`);
				} else {
					text.push(`In unison, the milking machines withdraw their gargantuan dildos from the slaves' loosened anuses.`);

					if (V.dairyStimulatorsSetting < 2) {
						text.push(`Several of the more energetic slaves begin to cry quietly with relief`);
					} else {
						text.push(`The slaves are silent, since their mouths and throats are being fucked by the feeders, but most of them slump against their machines with relief`);
					}
					text.push(`as their sphincters gradually recover from wide open to merely gaping. The machines switch out the withdrawn dildos for phalli that are just large, but the slaves barely react at all as they are penetrated. After what their sphincters have been through, a merely big dick is nothing to them.`);
				}
			} else if (setting === "restraints") {
				if (V.dairyRestraintsSetting < 2) {
					if (V.dairyRestraintsSetting === 1) {
						for (const slave of this.facility.employees().filter(s => s.indentureRestrictions > 1)) {
							const {He, he, him} = getPronouns(slave);
							text.push(`${slave.slaveName}'s milking machine declines to restrain ${him}, since ${he} is encoded as an indentured servant protected from restraint for milking. <span class="yellow">${He} has been kicked out of ${this.facility.name}.</span>`);
							removeJob(slave, Job.DAIRY);
						}

						text.push(`The next cow to stumble over to a milking machine to be drained is gently but firmly embraced by its restraints, allowing it to suck ${himU} dry and violate ${himU} without any regard for ${hisU} feelings. Most of the cows accept this new wrinkle in their lives, since the restraints let them go afterward, and the milking machines bring temporary relief. Some, however, begin to regard the machines with concern.`);
					} else {
						text.push(`The next cow to stumble over to a milking machine to be drained finds to ${hisU} surprise that ${heU} is not restrained while it sucks ${himU} dry. ${HeU} wiggles around experimentally, verifying that ${heU} is indeed free to pull ${himselfU} away from its ministrations if ${heU} wishes. There's little actual impact on the cows' behavior, since they still need the relief the machines offer.`);
					}
				} else {
					if (V.dairyRestraintsSetting === 2) {
						for (const slave of this.facility.employees().filter(s => s.indentureRestrictions > 1)) {
							const {He, he, him} = getPronouns(slave);
							text.push(`${slave.slaveName}'s milking machine declines to restrain ${him}, since ${he} is encoded as an indentured servant protected from restraint for milking. <span class="yellow">${He} has been kicked out of ${this.facility.name}.</span>`);
							removeJob(slave, Job.DAIRY);
						}
						if (S.Milkmaid) {
							const {his} = getPronouns(S.Milkmaid);
							text.push(`${S.Milkmaid.slaveName} has been removed from ${his} position as Milkmaid, since an industrialized dairy automates ${his} duties.`);
							removeJob(S.Milkmaid, Job.MILKMAID);
						}

						text.push(`The next time a cow tries to get up after being milked, ${heU} finds to ${hisU} sudden terror that the machine will not let ${himU} go. It continues to add fluids to ${hisU} body, and remove them from ${hisU} nipples, ignoring ${hisU} mounting panic as ${heU} realizes that it's to be ${hisU} new partner and lover, on a level far more intimate than any possible human relationship. The other cows approach their machines with trepidation, but the mounting pressure in their udders forces them to embrace their immurement despite their terror.`);
					} else {
						text.push(`The next time a cow finishes an intensive milking period, ${hisU} restraints loosen. ${HeU} does not move for a long time, as though ${heU} is unable to believe that ${heU} is, at least in an immediate and local sense, free. Finally, ${heU} prises ${himselfU} out of ${hisU} milking machine's embrace, thick strings of fluid leading from it to ${hisU} orifices as ${heU} pulls each one off of its corresponding port.`);
					}
				}
			}
		}

		return text.join(' ');
	}

	/** @returns {HTMLDivElement[]} */
	get customNodes() {
		return [
			this.warning,
		];
	}
};
