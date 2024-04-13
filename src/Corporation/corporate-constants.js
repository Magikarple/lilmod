// cSpell:ignore no-brainer, large-uddered

App.Corporate.InitConstants = function() {
	App.Corporate.payoutMinimumCash = 1000000;
	App.Corporate.payoutCorpValueMultiplier = 0.05;
	App.Corporate.dividendOptions = [0.75, 0.5, 0.25, 0.1, 0.05];
	App.Corporate.stockSplits = [
		{
			'newStocks': 3,
			'oldStocks': 2,
			'weeks': 1,
			'cost': 7.5
		},
		{
			'newStocks': 2,
			'weeks': 1,
			'cost': 10
		},
		{
			'newStocks': 3,
			'weeks': 2,
			'cost': 12.5
		},
		{
			'newStocks': 4,
			'weeks': 3,
			'cost': 15
		},
		{
			'oldStocks': 4,
			'weeks': 1,
			'cost': 15
		},
		{
			'oldStocks': 10,
			'weeks': 2,
			'cost': 25
		},
	];
	/*
	center/range object: The center value is the average or center value of the property, while range is the value range (centered on center). So if center is 1 and range is 0.5, the value can be anything from 0.75 to 1.25.

	== Base ==
	id: The variable ID for identifying the department.
	name: The display name of the department.
	focusDescription: The descriptive phrase of what the department does:
	The department focuses on {breaking slaves}.

	sizeCost: How much a single development of the department costs in thousands.
	maintenance: (object) Defines the amount paid each week.
		linear: How much a single development costs to maintain each week in thousands.
		quadratic: Development maintenance increases quadratically; this is the multiplier on the squared development component.
		category: Which division maintenance category this division belongs to. Multiple divisions in a category increase overhead costs exponentially.
	founding: (object) Defines information regarding the founding of the division.
	corporateCash: Defines how much it costs the player to *found the corporation* with this department with a 2-to-1 split, in thousands. This will be the corporation's starting cash, from which the development and slaves will be purchased.
	startingSize: How developed the department is upon founding, including how many active slaves the department starts with (Note that acquiring divisions don't start with slaves)
	merger: A list of companies that can be purchased during the merger event. The event will collect all of these company objects associated with owned divisions and pick some at random.
		name: The generic name of the company that is being purchased. This will have "the" put in front of it, so it must fit with the sentence "The {name} will be bought."
		cost: How much, in thousands, it will cost to purchase this company. Default: 50.
		text: An object with the flavor text of the event.
			trouble: A description of the company and its troubles. Will be in the sentence "The first company is {trouble}"
			acquire: The text that will be shown when the player chooses to acquire the company. Will be in the sentence "You acquire the {name}{acquire}".
		result: The functional result of acquiring this company.
			development: The number of developments that will be added to this division.
			slaves: the number of activeSlaves that will be added to this division. If the division doesn't have enough room to store them you will have to purchase more development by the end of the week or they will be sold off. *WARNING* Do not provide this property if the division cannot have activeSlave set (Acquiring divisions, for example)

	== Acquiring ==
	An acquiring division generates new slaves. It can always sell to the market but cannot buy from the market.
	slaveValue: How much value is added to a slave when it becomes a Held slave.
	acquiring: (center/range) The percentage of development that can acquire a slave each week.
	mercenaryHelp: (object) If present, defines how and when your mercenaries (not SF) assist this division in acquiring slaves.
	level: What level the mercenaries must be above in order to assist.
	cost: How much each level of mercenary above level costs the department for this assistance, in thousands.
	nextDivision: (list) The ids of the divisions that acquired slaves can be sent directly to. Note that if any of these divisions can send slaves to a listed division, that division will block this division from sending to it. For example, if A->[B,C] and B->C, then A->C can only happen if B *has not* been founded. Once B is founded, slaves from A must proceed A->B->C and cannot skip to C.

	==Processing==
	A processing division enhances the value of slaves. It can always buy from the market and sell to the market.
	addedValue: How much value is added to a slave when it becomes a Held slave.
	processing: (center/range) The percentage of active slaves that become held slaves each week.
	slaveProcessType: (text object) The verb used for the completion of the processing done on slaves. It will be used to explain when a slave moves from processed to held.
	present: The department can {break} 5 slaves.
	past:The department {broke} 5 slaves.
	slaveProcessDescription: The descriptive phrase for what sort of processing is being done to the division's slaves.
	present: the department is {breaking} 5 slaves.
	future: the department will {break} 5 slaves.
	past: Over the past week, the department {broke} 5 slaves.
	market: The department bought {fresh slaves} from the market.
	nextDivision: (list) The ids of the divisions that improved slaves can be sent directly to. Note that if any of these divisions can send slaves to a listed division, that division will block this division from sending to it. For example, if A->[B,C] and B->C, then A->C can only happen if B *has not* been founded. Once B is founded, slaves from A must proceed A->B->C and cannot skip to C.

	==Working==
	A working division produces revenue by working slaves. It can always buy from the market but cannot sell to the market.
	attrition: (center/range) The percentage of active slaves that become no longer workable
	revenue: (center/range) The amount of money generated by a slave.
	slaveProcessDescription: The descriptive phrase for what sort of work is being done by the division's slaves and how they are removed from the workforce.
	present: the department is {exploiting} 5 slaves.
	future: the department will {exploit} 5 slaves.
	past: Over the past week, the department {wore out} 5 slaves.
	market: The department bought {menials} from the market.


	*/
	App.Corporate.divisionList = [
		new App.Corporate.Division.Acquiring( {
			'id': 'Extra',
			'name': 'Extralegal Enslavement',
			'focusDescription': 'capturing and enslaving prisoners',
			'sizeCost': 20,
			'slaveValue': 10,
			'acquiring': {
				'center': 1,
				'range': 0.8,
			},
			'maintenance': {
				'linear': 7.5,
				'quadratic': 5,
				'category': 'acquisition',
			},
			'founding': {
				'corporateCash': 100,
			},
			'mercenaryHelp': {
				'level': 2,
				'cost': 0.05
			},
			'nextDivision': [
				"Break",
				"Arcade"
			],
			'merger': [
				{
					'name': 'mercenary company',
					'cost': 50,
					'text': {
						'trouble': 'a troubled mercenary company. After a spate of failed operations, the rank and file deposed their management and are now looking to merge with a better-run organization. The old leadership did not engage in enslavement activities, but the mercenaries have decided to turn their talents towards slaving for profit in conflict zones.',
						'acquire': ' and ease their transition to conflict zone slaving.'
					},
					'result': {
						'development': 5
					}
				}
			]
		}),
		new App.Corporate.Division.Acquiring( {
			'id': 'Legal',
			'name': 'Legal Enslavement',
			'focusDescription': 'legal enslavement',
			'sizeCost': 25,
			'slaveValue': 15,
			'acquiring': {
				'center': 1,
				'range': 0.5,
			},
			'maintenance': {
				'linear': 12,
				'quadratic': 6,
				'category': 'acquisition',
			},
			'founding': {
				'corporateCash': 125,
			},
			'nextDivision': [
				"Train",
				"Menial",
				"Surgery"
			],
			'merger': [
				{
					'name': 'telemarketing firm',
					'cost': 50,
					'text': {
						'trouble': 'an old world telemarketing firm. In an attempt to survive in the changing economy, it turned its focus towards convincing desperate, ignorant, or stupid people from the old world to accept voluntary enslavement, through a variety of entrapment procedures. It failed to make the transition successfully, but you could certainly continue its operations under your aegis.',
						'acquire': ' and clean out the deadwood, getting the business in Free Cities shape.'
					},
					'result': {
						'development': 5
					}
				}
			]
		}),
		new App.Corporate.Division.Processing( {
			'id': 'Break',
			'name': 'Slave Breaking',
			'focusDescription': 'breaking slaves',
			'sizeCost': 10,
			'addedValue': 5,
			'processing': {
				'center': 0.3,
				'range': 0.3,
			},
			'maintenance': {
				'linear': 0.45,
				'quadratic': 0.6,
				'category': 'processing',
			},
			'founding': {
				'corporateCash': 25,
			},
			'slaveProcessType': {
				'present': 'break',
				'past': 'broke'
			},
			'slaveProcessDescription': {
				'present': 'attempting to break',
				'future': 'break',
				'past': 'broken',
				'market': {
					single: 'slave that needs breaking',
					plural: 'slaves that need breaking'
				}
			},
			'nextDivision': [
				"Train",
				"Menial",
				"Surgery"
			],
			'merger': [
				{
					'name': 'slave breaking facility',
					'cost': 50,
					'text': {
						'trouble': 'a small slave breaking firm. Despite a great need for obedient slaves the owner of this little establishment was unable to turn a profit. The facility has everything a self-respecting slave-breaker could ever need; it seems the owner simply lacked the right character to apply effective breaking techniques. Your corporation knows perfectly well what it takes to achieve obedience and the assets can be put to great use.',
						'acquire': ' and staff it with qualified personnel to make use of the new assets.'
					},
					'result': {
						'development': 5,
						'slaves': 5
					}
				}
			]
		}),
		new App.Corporate.Division.Processing( {
			'id': 'Surgery',
			'name': 'Slave Modifications',
			'focusDescription': 'physical slave modifications',
			'sizeCost': 20,
			'addedValue': 8,
			'processing': {
				'center': 0.5,
				'range': 0.2,
			},
			'maintenance': {
				'linear': 2.4,
				'quadratic': 1,
				'category': 'processing',
			},
			'founding': {
				'corporateCash': 55,
			},
			'slaveProcessType': {
				'present': 'modify',
				'past': 'finished working on'
			},
			'slaveProcessDescription': {
				'present': 'working on',
				'future': 'work on',
				'past': 'improved',
				'market': {
					single: 'slave that could use some work done to their body',
					plural: 'slaves that could use some work done to their bodies'
				}
			},
			'nextDivision': [
				"Train",
				"Dairy"
			],
			'merger': [
				{
					'name': 'medical clinic',
					'cost': 50,
					'text': {
						'trouble': "a small medical clinic. Medical malpractice continues to be a major source of trouble for surgeons in the old world. A plastic surgeon has just suffered defeat in a major legal case over implant ruptures. He's looking to make the transition to a more enlightened area, along with his inventory and staff.",
						'acquire': " and the surgeon decides to retire on the proceeds of the sale, wishing your corporation well. It was a smart decision; he can retire to the Free Cities on that sum of money, and remote surgery is killing surgeons' wages."
					},
					'result': {
						'development': 3,
						'slaves': 3
					}
				}
			]
		}),
		new App.Corporate.Division.Processing( {
			'id': 'Train',
			'name': 'Slave Training',
			'focusDescription': 'training slaves',
			'sizeCost': 25,
			'addedValue': 11,
			'processing': {
				'center': 0.2,
				'range': 0.3,
			},
			'maintenance': {
				'linear': 0.7,
				'quadratic': 1,
				'category': 'processing',
			},
			'founding': {
				'corporateCash': 50,
			},
			'slaveProcessType': {
				'present': 'train',
				'past': 'trained'
			},
			'slaveProcessDescription': {
				'present': 'training',
				'future': 'train',
				'past': 'trained',
				'market': {
					single: 'slave that needs slave training',
					plural: 'slaves that need slave training'
				}
			},
			'nextDivision': [
				"Whore"
			],
			'merger': [
				{
					'name': 'slave training firm',
					'cost': 50,
					'text': {
						'trouble': "a small slave training firm. Slave training is a notoriously difficult business, since the maturation times on the merchandise can be extremely long, and the improvement in price can be marginal if the training does not prove highly successful. There's nothing inherently wrong with the business, they've simply hit a cash flow bottleneck and need to merge with a cash-rich organization like yours.",
						'acquire': ". The previous owners are happy they'll be able to continue operations under the aegis of a better-run, richer corporation."
					},
					'result': {
						'development': 3,
						'slaves': 3
					}
				}
			]
		}),
		new App.Corporate.Division.Working( {
			'id': 'Arcade',
			'name': 'Sex Arcades',
			'focusDescription': 'operating sex arcades',
			'sizeCost': 5,
			'attrition': {
				'center': 0.05,
				'range': 0.2,
			},
			'maintenance': {
				'linear': 0.2,
				'quadratic': 0.125,
				'category': 'working',
			},
			'revenue': {
				'center': 1000,
				'range': 0.1
			},
			'founding': {
				'corporateCash': 15,
				'startingSize': 20,
			},
			'slaveWorkDescription': {
				'present': 'exploiting',
				'future': 'exploit',
				'past': 'wore out',
				'market': 'fresh slave'
			},
			'merger': [
				{
					'name': 'café',
					'cost': 50,
					'text': {
						'trouble': "a quaint maid café. The prime location together with a popular concept should make for a bustling enterprise, and yet the owner is looking to get out of the business, hoping to salvage some of his savings. Sadly, there was a lack of capital to employ attractive servant slave maids. While someone might very well be more than willing to come in and invest in some better slaves, the place is so cheap you could easily replace the furniture and use the current assets to create a new arcade location for your corporation instead.",
						'acquire': ". The old owner wishes his slaves luck under the new management, not knowing your plans for the place. A new sex arcade under your corporate umbrella will open shortly."
					},
					'result': {
						'development': 5,
						'slaves': 5
					}
				}
			]
		}),
		new App.Corporate.Division.Working( {
			'id': 'Menial',
			'name': 'Menial Services',
			'focusDescription': 'offering menial services',
			'sizeCost': 6.5,
			'attrition': {
				'center': 0.05,
				'range': 0.2,
			},
			'maintenance': {
				'linear': 0.2,
				'quadratic': 0.1,
				'category': 'working',
			},
			'revenue': {
				'center': 1250,
				'range': 0.2
			},
			'founding': {
				'corporateCash': 20,
				'startingSize': 20,
			},
			'slaveWorkDescription': {
				'present': 'exploiting',
				'future': 'exploit',
				'past': 'wore out',
				'market': 'menial slave'
			},
			'merger': [
				{
					'name': 'slaveholding firm',
					'cost': 50,
					'text': {
						'trouble': "a minor slaveholding company. A major deal with a troubled government just fell through, and they had depended on it going through to an unwise degree. They need to merge with a larger slaving concern immediately, but there's nothing at all wrong with their significant inventory of slaves.",
						'acquire': ", cash out its hapless staff, and absorb its stock into your corporation."
					},
					'result': {
						'development': 5,
						'slaves': 5
					}
				}
			]
		}),
		new App.Corporate.Division.Working( {
			'id': 'Dairy',
			'name': 'Dairy',
			'focusDescription': 'milking slaves',
			'sizeCost': 15,
			'attrition': {
				'center': 0.05,
				'range': 0.2,
			},
			'maintenance': {
				'linear': 0.85,
				'quadratic': 0.4,
				'category': 'working',
			},
			'revenue': {
				'center': 3000,
				'range': 0.2
			},
			'founding': {
				'corporateCash': 25,
			},
			'slaveWorkDescription': {
				'present': 'milking',
				'future': 'milk',
				'past': 'ran dry',
				'market': 'cow'
			},
			'merger': [
				{
					'name': 'farm',
					'cost': 50,
					'text': {
						'trouble': "a dairy farm. Why a conventional dairy farm popped up as target confused you for a moment, but it quickly became clear the entire family was so deep in debt it would be a no-brainer to buy the farm and start milking the farmer's large-uddered daughters as a great addition to your corporate dairy.",
						'acquire': " and your new slaves for the corporation. The family is not happy with your plans, but their approval is not required, you care only for their fluids."
					},
					'result': {
						'development': 3,
						'slaves': 3
					}
				}
			]
		}),
		new App.Corporate.Division.Working( {
			'id': 'Whore',
			'name': 'Escort Service',
			'focusDescription': 'whoring out slaves',
			'sizeCost': 20,
			'attrition': {
				'center': 0.05,
				'range': 0.2,
			},
			'maintenance': {
				'linear': 0.7,
				'quadratic': 0.25,
				'category': 'working',
			},
			'revenue': {
				'center': 3000,
				'range': 0.1
			},
			'founding': {
				'corporateCash': 50,
			},
			'slaveWorkDescription': {
				'present': 'whoring out',
				'future': 'whore out',
				'past': 'lost their appeal',
				'market': 'trained whore'
			},
			'merger': [
				{
					'name': 'brothel',
					'cost': 50,
					'text': {
						'trouble': "a little brothel. With slave whores becoming the dominant force in sexual services, the current madam lost her passion for the business. She's getting up there in age and has run a tight ship for many years, so she deemed it the right time to bow out. All you need to do to add a new brothel location for your corporation is sign at the dotted line before anyone else has a chance to bite.",
						'acquire': " before anyone else can make an offer. The madam is surprised by your speed, but happily signs over the brothel."
					},
					'result': {
						'development': 3,
						'slaves': 3
					}
				}
			]
		})
	];
	// divisionCategoriesList: Division maintenance categories are used to calculate the overhead that occurs from having multiple divisions within the same category.
	// id: The identifier that will be used in division.maintenance.category
	// freeDivisions: How many divisions must appear in this category before the overhead cost comes into play. For example, if this is 1, then the second division will cost divisionCost, and the third will bring the overhead up to four times divisionCost.
	// divisionCost: How much to multiply the overhead by in cash. The first division past the free divisions will cost this much, but the value will increase exponentially.
	// freeDevelopment: How many developments, totaled across all divisions in the category, are ignored by this category before overhead comes into play. Note: freeDivisions does *not* affect this; if freeDevelopment is 100 and freeDivisions is 1, if you only have a single division with 110 developments, you will be charged for the 10 developments over.
	// developmentCost: How much to multiply the squared developments by, in cash. The first development past the ignored value will cost this much, but the cost increases exponentially.
	// corporate: The corporate-wide overhead for divisions, beyond the individual categories.
	// freeDivisions: How many total divisions, across all categories, are ignored before charging corporate level overhead.
	// divisionCost: How much to multiply the square of counted divisions in cash. The first counted division will cost this much, but the value increases exponentially.
	// Equations:
	// divisionBaseOverhead = (divisions - freeDivisions) ^ 2 * divisionCost
	// divisionOperationOverhead = (sum(development) - freeDevelopment) ^ 2 * developmentCost
	// corpOverhead = (divisions - 2) ^ 2 * 10000
	App.Corporate.maintenance = {
		divisionCategoriesList: [
			{
				id: 'acquisition',
				freeDivisions: 0,
				divisionCost: 25000,
				freeDevelopment: 100,
				developmentCost: 2
			},
			{
				id: 'processing',
				freeDivisions: 0,
				divisionCost: 25000,
				freeDevelopment: 200,
				developmentCost: 1
			},
			{
				id: 'working',
				freeDivisions: 1,
				divisionCost: 15000,
				freeDevelopment: 800,
				developmentCost: 0.1
			},
		],
		corporate: {
			freeDivisions: 2,
			divisionCost: 10000
		}
	};
};
