// cSpell:ignore Creem, Taggart, Malnockestivi, Desha

App.FCNN = (function() {
	const starting = [
		"...coming up at the top of the hour: Catgirl slaves, science fact or science fiction...",
		"...coming up at the top of the hour: Malnockestivi Smith, Free Cities' first MtFtMtFtH transgendered person...",
		"...new arcology construction up 23% worldwide this year, according to...",
		"...United States Congress spends 1,264th consecutive day gridlocked over post office...",
		"...coming up at the top of the hour: Arcology owners: oversexed oligarchs or attractive, oversexed oligarchs?...",
		"...coming up at the top of the hour: Anal sex: not just for sex any more...",
		"...coming up at the top of the hour: Oral sex: the new hello...",
		"...new book by prominent feminist suggests that women should not be used as sexual appliances...",
		"...just ahead, interview with Desha Moore, prominent advocate for compulsory female enslavement...",
		"...just ahead, Slave Market Trends: will the pierced anus be in again this year...",
		"...just ahead, Slave Market Trends: upstart slave trainers avoid implants...",
		"...implant technology firm BusTech notches successful initial public offering...",
		"...the upcoming shortage of authentic leather and what it means for the whip industry...",
		"...dairy conglomerate Creem Inc. denies allegations of adulterating breast milk with...",
		"...two-time award-winning actress Linda Loveless debuted new implants on the red carpet this...",
		"...dick size: are your slaves lying to you when they tell you you're too big...",
		"...just ahead, slave expert's opinion on best shemale slaves to use for double penetration...",
		"...Free Cities social conservatives criticize marriage, say your slaves should be enough...",
		"...councilman Taggart suggested in a public address that involuntary enslavement...",
		"...councilman Taggart denies allegations that he has remained faithful to his wife...",
		"...councilman Taggart presented evidence that regulation of the sex slave market would...",
		"...after a word from our sponsors. Creem Inc.: for all your dairy needs...",
		"...after a word from our sponsors. Horstmann Ltd, Free Cities' finest whipmakers...",
		"...after a word from our sponsors. Coming soon to theaters, Quintuple, the musical...",
		"...critical of low-end slave training corporation Wallerson & Sons for practices that they say...",
		"...training corporation Wallerson & Sons called a study on slave illness rates 'ludicrous,' but...",
		"...our tech correspondent: the possibilities of virally-administered gene therapy...",
		"...our tech correspondent: breakthrough in in-vitro drug treatments that promise to...",
		"...our tech correspondent: next year to see release of two competing aphrodisiacs...",
		"...our tech correspondent: the coming permanent aphrodisiac implants, and what they mean...",
		"...Sex Slaves in Space: what it takes to keep a mining crew happy for an 18-month contract...",
		"...the implant-drug balance: how much tissue growth is necessary to support larger...",
		"...the actress stated that the cut to full nudity in the script violated contractual...",
		"...doping scandal as Slave Games watchdog alleges champion used internal reservoir of lube...",
		"...next on Extreme Surgery: the mouthpussy experimenters and what they...",
		"...'A hole's a hole,' said CEO of upstart budget glory hole franchise...",
		"...underground slave pit fights step into the light this evening as...",
		"...underground slave pit fight champion, freed yesterday, sells herself back into...",
		"...with the lead designer of the MP17, the new machine pistol marketed specifically for bodyguards...",
		"...the new Aegis drone series: because your arcology's security is your most important possession...",
		"...the BAe Goshawk: because you deserve to travel at twice the speed of sound in the finest style...",
		"...this year's Goat.cx award for outstanding orifice innovation goes to...",
		"...public controversy over cannibalism. Decadence taken too far or an acceptable next step...",
		"...sixth day of street cleaners' strike. Spokesman for the strikers: 'It's getting too nasty...",
		"...debuts new book, 'So Long, And Thanks For All The Dicks', in which the recently retired sex slaves tell-all about...",
		"...cure for lactose intolerance, for which he was awarded the International Association of Pastoralist...",
		"...from the Free Cities have become increasingly common clientele for the black market...",
		"...a risky gamble on the three-hour-long hardcore sex scene, but the box office figures for just...",
		"...claiming that even tourists to the Free Cities were at risk of sexual enslavement...",
	];

	const week30 = [
		"...is where I'll be when the bombs hit. Survival is my first...",
		"...time to prepare for major shortages is now, since there's no likelihood...",
		"...construction of shelters accelerated last quarter, due to fears...",
		"...major drought across the entire hemisphere shows no signs of...",
		"...medical organization offered no explanation, stating that...",
		"...just ahead, an FCNN Special Report: Immortality and You — Breakthroughs in 'Bodyswapping' technology and what they mean for...",
		"...wildfires have now cost an estimated...",
		"...widespread demonstrations against the government's friendly relations with the Free Cities...",
		"...of the small island nation, declared that his homeland may be completely underwater by...",
		"...claimed the sanctions constituted an act of war...",
		"...nuclear weapons development program, drawing harsh criticism from international observers...",
		"...simply don't have the money to adequately respond to a natural disaster of this...",
		"...representatives announced their withdrawal from the international organization...",
		"...special report on the depopulation and abandonment of rural areas worldwide, as natural...",
	];

	const week50 = [
		"...tested a thermonuclear device of some five megatons last night...",
		"...heavy fighting for the third week in the capital city of...",
		"...economic recovery looking increasingly unlikely in the event of...",
		"...complete exhaustion of safe water reserves across...",
		"...climate refugees streamed across the border despite...",
		"...released a statement today, explaining their refusal to intervene against the pillaging of several Free Cities in northern...",
		"...denies allegations of ordering last week's combined arms assault on the arcology known as...",
		"...Coming up, an FCNN Special Report: Ghost Cities — The truth about recent surge of depopulated metropolitan areas in...",
		"...was assassinated in his home in the nation's capital, alongside his entire...",
		"...forces opened fire on crowds of protesters, killing and wounding...",
		"...declared the insurgency officially defeated, despite reports of widespread violence...",
		"...suspended national elections until further notice, in a move that is seen as yet another authoritarian...",
	];

	const week70 = [
		"...second low-order nuclear detonation in the city of...",
		"...total societal collapse induced by rising sea levels declared today in...",
		"...likelihood of containing Influenza-M was downgraded to a lower...",
		"...threatened immediate use of chemical weapons should those forces not withdraw...",
		"...relief organizations unable to deal with casualties from nuclear exchange between...",
		"...guerrilla fighting intensifies in escalating proxy war between 'Paternalist' and 'Degradationist' Free Cities in the region of...",
		"...Coming up, an FCNN Special Report about the unprecedented scale of slave insurrections across...",
		"...invasive plant growth epidemic contested by persistent droughts in eastern...",
		"...Daughters of Liberty claimed responsibility for the attack...",
		"...mass suicide of the cult members, who believed that current events were prophesied...",
		"...genocide is a strong term, but there's simply no other way to describe...",
	];

	const week90 = [
		"...have enslaved the entire legislature, their leader personally sexually assaulting...",
		"...confirmed that the arcologies were subject to a nuclear detonation, but...",
		"...conflict can now be said to encompass the entire continent...",
		"...government has effectively fallen, with much of the capital destroyed...",
		"...deadliest in the nation's history, was allegedly committed by the Daughters of Liberty...",
		"...famine so devastating that confirmed reports of cannibalism are now...",
		"...dozens upon dozens of mass graves in what were once city parks...",
		"...evidence of a planned slave uprising, executed all of their arcology's several thousand...",
	];

	const bodyswap = [
		"...transferring consciousness from one body to another is morally wrong, but financially..."
	];

	const TFSCompromise = [
		"...Ladies: Do you want dick so much that you want to HAVE a dick? If yes, join the Futanari Sisters today! Learn more at..."
	];

	const corpAnnounced = [
		"...and Free Cities have definitely shaken up the stock market in recent..."
	];

	const geneMods = [
		"...27 women confirmed pregnant after man masturbates in pool. Should gene therapy..."
	];

	const catgirlsPublic = [
		"...Catgirl slaves: Fad, fluke, or fashion? Tune in for an exclusive FCNN interview with Doctor Radomir Nieskowitz later tonight..."
	];

	const projectNComplete = [
		"...Sons of Sekhmet claim responsibility for bombing campaign in...",
		"...was killed this week in a surprise ambush by Sons of Sekhmet assassins...",
		"...terrorist organizations in the Free Cities: An exclusive report, coming up next...",
		"...large scale rioting continues for the ninety-sixth consecutive day over genetic engineering concerns...",
	];

	const textGroups = [
		// dynamic headlines based on conditions
		{valid: () => true, text: () => starting},
		{valid: () => V.week >= 30, text: () => week30},
		{valid: () => V.week >= 50, text: () => week50},
		{valid: () => V.week >= 70, text: () => week70},
		{valid: () => V.week >= 90, text: () => week90},
		{valid: () => V.bodyswapAnnounced === 1, text: () => bodyswap},
		{valid: () => V.TFS.schoolUpgrade === 3, text: () => TFSCompromise},
		{valid: () => V.FCNNstation === 1, text: () => [`...is FCNN, broadcasting live from its international headquarters within ${V.arcologies[0].name}...`]},
		{valid: () => V.corp.Announced === 1, text: () => corpAnnounced},
		{valid: () => V.geneticMappingUpgrade === 2, text: () => geneMods},
		{valid: () => V.seeCats === 1 && V.projectN.public === 1, text: () => catgirlsPublic},
		{valid: () => V.seeCats === 1 && V.projectN.status >= 5, text: () => projectNComplete},
		// custom headlines can be stored in game state by events
		{valid: (/** @type {boolean} */ includeCustom) => includeCustom, text: () => V.fcnn}
	];

	return {
		/** Get all currently-valid news ticker strings for FCNN
		 * @param {boolean} [seeCustom=true] indicates whether custom headlines (from game state) are included
		 * @returns {string[]}
		 */
		getAllValidText: function(seeCustom = true) {
			return textGroups.filter(g => g.valid(seeCustom)).flatMap(g => g.text());
		},

		/** Get a random news ticker string for FCNN
		 * @returns {string}
		 */
		getText: function() {
			if (V.FCNNstation !== 1 && V.week >= 90) {
				return "FCNN: FCNN service has been temporarily suspended. Please stand by. ";
			}
			return this.getAllValidText().random() + " ";
		}
	};
})();
