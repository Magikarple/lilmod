// cSpell:ignore divs

/**
 * @param {DocumentFragment|HTMLElement} [lastElement] will go on the same line as the last line
 * @returns {DocumentFragment}
 */
App.Desc.playerArcology = function(lastElement) {
	const A = V.arcologies[0];
	const fragment = document.createDocumentFragment();

	/**
	 * @param {(string|HTMLElement|DocumentFragment)[]} contents
	 */
	function addParagraph(...contents) {
		if (contents.every(s => !s)) {
			return; // don't bother adding blank divs
		}
		const para = App.UI.DOM.appendNewElement("div", fragment, '', "indent");
		para.append(...App.Events.spaceSentences(contents));
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function location() {
		const fragment = document.createDocumentFragment();

		fragment.append(App.UI.DOM.makeElement("span", A.name, "name"),
			`, your arcology, is located in a Free City in ${V.terrain === "oceanic" ? "the middle of the ocean" : V.continent}. It is a huge structure whose${V.arcologyUpgrade.apron === 1 ? " solar-paneled" : ""} skin gleams in the sunshine${V.arcologyUpgrade.hydro === 1 ? ", while verdant exterior hydroponics bays lend it an air of growth" : ""}. `);

		let buffer = [];
		if (V.weatherCladding === 1) {
			buffer.push(`Much of its beautiful exterior is now hidden behind dull panels of weather cladding${V.arcologyUpgrade.spire === 1 ? ", though its highest point is capped by a tall, elegant spire" : ""}.`);
		} else if (V.weatherCladding === 2) {
			buffer.push(`The entirety of its once dull exterior has been retrofitted with breathtaking golden sheets in eye catching designs${V.arcologyUpgrade.spire === 1 ? ", its highest point capped by a tall, magnificent spire" : ""}.`);
		}
		buffer.push(`Its${V.weatherCladding === 2 ? " glorious" : V.weatherCladding > 0 ? " dull" : V.arcologyUpgrade.apron === 1 ? " shining" : ""} bulk`);
		if (V.terrain === "urban") {
			buffer.push(`towers above the city around it; it is part of a cluster of arcologies that form a Free City in the midst of an old world urban area.`);
		} else if (V.terrain === "rural") {
			buffer.push(`rises above the buildings around it; it is part of a cluster of arcologies and smaller structures that form a Free City in the middle of a barren wilderness.`);
		} else if (V.terrain === "ravine") {
			buffer.push(`just barely peaks above the cliffs of its home valley; it is part of a cluster of arcologies and smaller structures that form a Free City in the depths of a deep ravine.`);
		} else if (V.terrain === "marine") {
			buffer.push(`rises above the shallow water all around it; it is part of a cluster of arcologies that form a Free City near the seashore.`);
		} else {
			buffer.push(`rises above the blue water all around it; it is part of a cluster of arcologies that form a Free City anchored over a seamount.`);
		}
		fragment.append(buffer.join(" "));

		return fragment;
	}

	function weather() {
		let buffer = [];
		buffer.push(`You briefly glance out a large glass window of your penthouse to observe an open-air section of ${A.name}.`);
		switch (V.weatherToday.severity) {
			case 1:
				if (V.weatherToday.name === "Sunny") {
					buffer.push(`Today is a stunningly perfect day. The ${V.terrain === "oceanic" ? "seagulls are squawking" : "birds are singing"}, the sun is shining, and the marketplace is bustling with the sounds of trade and laughter.`);
				} else if (V.weatherToday.name === "Heavy Rain") {
					buffer.push(`It's a downpour today, but that hasn't stopped your citizens from donning hats and umbrellas and heading to the market regardless. Citizens and slaves alike cluster under awnings and each other's umbrellas.`);
				} else if (V.weatherToday.name === "Gentle Snow") {
					buffer.push(`It's a beautiful snowy day outside. The arcology has a gorgeous sheet of pure white snow and you can see a few jolly-looking snowmen built in the brisk chill. Citizens are wearing light furs and drinking hot coffee in the lovely weather.`);
				} else if (V.weatherType === 1) {
					buffer.push(`It's a lovely, warm day today and plenty of people are outside enjoying the nice weather while it lasts in skimpier clothing than usual.`);
				} else if (V.weatherType === 5) {
					buffer.push(`It's a cozy, brisk day today, and many citizens are carrying cups of steaming coffee, hot chocolate, and more esoteric drinks to warm themselves while they're out and about.`);
				} else {
					buffer.push(`It's a nice day out today despite everything going on in the world, and plenty of citizens are outside enjoying the pleasant weather while it's here.`);
				}
				break;
			case 2:
				if (V.weatherToday.name === "Light T-Storms") {
					buffer.push(`It's a thundering downpour today. The cracks of loud thunder occasionally make someone jump with surprise, but people still soldier on in raincoats and umbrellas.`);
				} else if (V.weatherToday.name === "Acid Rain") {
					buffer.push(`Acidic rain splashes down today with an intimidating sizzle. Beyond how disgusting the toxic rain is, it's not actually particularly dangerous though, and most people are still out in the streets.`);
				} else if (V.weatherType === 1) {
					buffer.push(`It's an especially hot day out today, but that hasn't stopped the flow of commerce. Your industrious citizens are donning headscarves and hats to protect themselves from the heat as they trade and work in the streets, slick with sweat.`);
				} else if (V.weatherType === 2) {
					buffer.push(`It's a particularly windy day today but the wind isn't bothering anyone too much. The breeze is almost refreshing, walking through the arcology's streets.`);
				} else if (V.weatherType === 3) {
					buffer.push(`There's a gentle haze of smog hanging in the air that fogs up the arcology, but the smoke isn't too bad.`);
				} else if (V.weatherType === 4) {
					buffer.push(`It's a nice day today, save for the slight haze of corruptive toxicity hanging in the air. The miasma is light enough that you can barely notice it, but it makes you turn up your nose in disgust when you do.`);
				} else if (V.weatherType === 5) {
					buffer.push(`It's an especially cold day today and many citizens are opting to do their business in the warm confines of their homes and shops. This is the perfect kind of weather for curling up with a couple of slaves on your bed.`);
				} else if (V.weatherType === 6) {
					buffer.push(`It's a nice day out today, and citizens are trading and speaking in the bustling marketplace as usual.`);
				}
				break;
			case 3:
				if (V.weatherToday.name === "Extreme T-Storms") {
					buffer.push(`It's a torrent of rain and thunder today. Lightning angrily flashes through the air and the streets are watery and clogged, the cracks of terrifying thunder threatening to smash against the walls of the arcology. Many citizens are staying inside due to the awful storm.`);
				} else if (V.weatherToday.name === "Heavy Acid Rain") {
					buffer.push(`Intense acidic rain splashes down from the skies, sizzling and popping against the arcology walls. The acid rain today is bad enough to be painful on bare skin, and it slowly rusts away metal like a toxic miasma. Many citizens are staying inside to avoid the horrific, polluted rain.`);
				} else if (V.weatherType === 1) {
					buffer.push(`It's a scorching day outside and many citizens have retreated indoors to escape from the oppressive heat; those who haven't are wearing dusters and headscarves to protect themselves. The rustle of sand whips at the exterior of the arcology, and a haze of heat shimmers in the air.`);
				} else if (V.weatherType === 2) {
					buffer.push(`It's an extremely windy day, riling up the waters and winds around the arcology into a chaotic frenzy. Fear of flooding and tornado damage is nearly omnipresent. The winds howl outside the arcology's walls.`);
				} else if (V.weatherType === 3) {
					buffer.push(`A fog of smoke hangs in the air, clouding up the outdoors with ecological pollution. Many citizens have donned masks out today to protect themselves from the ash and smoke drifting through.`);
				} else if (V.weatherType === 4) {
					buffer.push(`A cloud of corrupt, polluted miasma hangs over the arcology from the fires of industry roaring all around it. Many citizens have donned masks to walk outside today, hopefully free of the polluting smog.`);
				} else if (V.weatherType === 5) {
					buffer.push(`It's a freezing day outside today, and citizens are wearing thick fur jackets and dusters to protect themselves from the bitter cold. Snow bites at the exterior of the arcology, dusting everything in a fine white layer, and many citizens have retreated inside to escape the chill.`);
				} else if (V.weatherType === 6) {
					buffer.push(`The arcology rumbles with the dangerous instability of the earth underneath its feet. Every so often, the arcology shakes, but its powerful supporting beams keep it locked securely in place.`);
				}
				break;
			case 4:
				if (V.weatherToday.name === "Cataclysmic Rains") {
					buffer.push(`The arcology is drenched in water, with constant rainfall so dense and violent that it's hard to breathe without drowning. Roads and bridges are flooded out, and lesser buildings near the arcology are washed away.`);
				} else if (V.weatherToday.name === "Ion Storm") {
					buffer.push(`Eerie glowing particles and flashing lights surround the arcology, as charged ions and radioactive dust batter the walls, driven by high winds and unstable magnetic fields. Unshielded electronics constantly malfunction, and radio and radar are rendered useless, stranding survivors in lonely silence.`);
				} else if (V.weatherType === 1) {
					buffer.push(`The fury of the sun descends upon the arcology. Sand and stone roar outside the gates, and a brutal haze of raw heat shimmers through every inch of the city. Metal and rubber are melting in the open air, the lands around the arcology are scorched into a burnt wasteland.`);
				} else if (V.weatherType === 2) {
					buffer.push(`The rage of the wind descends upon the arcology. Horrific tornados whip furiously at the arcology's walls, the crack of thunder and lightning strikes down to every side, and less stable buildings outside the gilded walls are ripped and shattered by the angry winds.`);
				} else if (V.weatherType === 3) {
					buffer.push(`A suffocating cloud of ash and smoke descends upon the arcology. The smoky ash is so thick it blots out windows and glasses, and even bulky masks aren't immune to the choking grasp of the smoky haze.`);
				} else if (V.weatherType === 4) {
					buffer.push(`A horrific fog of corruption descends upon the arcology. The pollution in the air is practically visible, blurring the air with the thick, smelly fog of mankind's arrogant industry. Waters outside the arcology are turning unnatural greens and reds, and the drift of deadly radiation lingers poisonously nearby.`);
				} else if (V.weatherType === 5) {
					buffer.push(`The frenzy of winter descends upon the arcology. Terrible whips of snow smash against the arcology's walls and coat everything in a deep white, absorbing all into a howling vortex of ice and snow. Even the thickest furs seem to offer little protection against this arctic chill.`);
				} else if (V.weatherType === 6) {
					buffer.push(`The anger of the earth has come up towards the arcology. The whole city rumbles and quivers with the force of shifting tectonic plates underneath, sending mud crashing against the arcology's walls and violently shaking the whole arcology every so often with enough force to throw things off shelves and send them crashing to the ground.`);
				}
				buffer.push(`Only the shielding protection of powerful weather cladding could possibly enable any sort of outside conduct or trade today.`);
				break;
		}

		return buffer.join(" ");
	}

	function deco100() {
		if (FutureSocieties.HighestDecoration() < 100) {
			return "";
		}

		let buffer = [];

		if (A.FSChattelReligionistDecoration >= 100) {
			buffer.push(`The uppermost point on the arcology is capped by a massive religious icon.`);
		}
		if (A.FSRomanRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of white stone, with graceful columns bringing Rome immediately to mind.`);
		} else if (A.FSNeoImperialistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built with marble, most of it hidden under hanging banners marked with your family crest.`);
		} else if (A.FSAztecRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of obsidian, giving them a nice sheen as they absorb the sun's rays.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of sandstone, with richly carved columns bringing ancient Egypt immediately to mind.`);
		} else if (A.FSEdoRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of close fitted stone topped with the white walls of a feudal Japanese castle.`);
		} else if (A.FSArabianRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of warm stone and crowded with the busy commerce of an Arabian revival.`);
		} else if (A.FSChineseRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are guarded by bronze statues of traditional Chinese guardian spirits.`);
		} else if (A.FSAntebellumRevivalistDecoration >= 100) {
			buffer.push(`The entrances of the arcology are built of white stone, with hand-carved Corinthian columns, reminiscent of the grand plantations of old.`);
		}

		const {he: heP, his: hisP} = getPronouns(V.PC);
		let statue;
		if (V.PC.dick !== 0) {
			if (V.PC.vagina !== -1) {
				statue = "futanari";
			} else if (V.PC.boobs >= 300) {
				statue = "shemale";
			} else {
				statue = "male";
			}
		} else {
			statue = "female";
		}

		buffer.push(`Outside the main entrance, there is an enormous statue of an idealized figure with several statues of nude slaves at its feet.`);
		if (A.FSStatuesqueGlorification === 100) {
			buffer.push(`The central ${statue} figure towers over the area.`);
		}
		if (A.FSSupremacistDecoration === 100) {
			buffer.push(`The central ${statue} figure has distinctly ${A.FSSupremacistRace} features.`);
		}
		if (A.FSSubjugationistDecoration === 100) {
			buffer.push(`The slaves have exaggerated ${A.FSSubjugationistRace} features.`);
		}
		if (A.FSGenderRadicalistDecoration === 100) {
			buffer.push(`The slaves are all hermaphrodites.`);
		}
		if (A.FSGenderFundamentalistDecoration === 100) {
			buffer.push(`The slaves are all perfectly female.`);
		}
		if (A.FSPaternalistDecoration === 100) {
			buffer.push(`The slaves are gazing adoringly up at the central ${statue} figure.`);
		}
		if (A.FSDegradationistDecoration === 100) {
			buffer.push(`The slaves are cowering, and are wearing chains.`);
		}
		if (A.FSBodyPuristDecoration === 100) {
			buffer.push(`The slaves' bodies are idealized, too.`);
		}
		if (A.FSTransformationFetishistDecoration === 100) {
			buffer.push(`The slaves have unnaturally narrow waists and big breasts.`);
		}
		if (A.FSYouthPreferentialistDecoration === 100) {
			if (V.minimumSlaveAge < 13) {
				buffer.push(`The slaves are cute lolis with round, innocent faces.`);
			} else {
				buffer.push(`The slaves are young, with smooth, innocent faces.`);
			}
		}
		if (A.FSMaturityPreferentialistDecoration === 100) {
			buffer.push(`The slaves are mature, with motherly bodies.`);
		}
		if (A.FSSlimnessEnthusiastDecoration === 100) {
			buffer.push(`The slaves have pretty, girlish figures.`);
		}
		if (A.FSPetiteAdmirationDecoration === 100) {
			buffer.push(`The slaves are quite short.`);
		}
		if (A.FSAssetExpansionistDecoration === 100) {
			buffer.push(`The slaves' breasts are unrealistically huge, almost as large as the rest of their bodies.`);
		}
		if (A.FSRepopulationFocusDecoration === 100) { /* Can this be made one line? */
			if (V.PC.vagina !== -1) {
				buffer.push(`The slaves are heavily pregnant, as is the central ${V.PC.dick !== 0 ? "futanari" : "female"} figure.`);
				if (V.PC.counter.birthsTotal > 0) {
					if (V.PC.counter.birthsTotal > 2) {
						buffer.push(`Surrounding the piece are ${num(V.PC.counter.birthsTotal)} small marble statues of little infants,`);
					} else if (V.PC.counter.birthsTotal > 1) {
						buffer.push(`The main sculpture carries a pair of little marble infants in its arms,`);
					} else {
						buffer.push(`The main sculpture holds a little marble infant in its arms,`);
					}
					buffer.push(`declaring the arcology's dedication to repopulating the emerging world all the way up to the highest member.`);
				}
			} else {
				buffer.push(`The slaves are heavily pregnant.`);
			}
		}
		if (A.FSRestartDecoration === 100) {
			buffer.push(`The central`);
			if (V.PC.dick > 0) {
				if (V.PC.vagina >= 0) {
					buffer.push(`futanari figure's balls are oversized and ${hisP} stomach slightly rounded,`);
				} else if (V.PC.boobs >= 300) {
					buffer.push(`shemale figure's balls are swollen with seed,`);
				} else {
					buffer.push(`male figure's balls are swollen with seed,`);
				}
				buffer.push(`announcing its virility,`);
			} else {
				buffer.push(`female figure's stomach is slightly rounded, announcing its fertility`);
			}
			buffer.push(`while the slaves wear chastity devices.`);
		}
		if (A.FSPastoralistDecoration === 100) {
			buffer.push(`The statuary is located in the middle of a fountain; the slaves' nipples pour water into the pool beneath.`);
			if (V.PC.rules.lactation === "sell") {
				buffer.push(`The central ${statue} sculpture also sprays water from its nipples, drenching the lesser elements of the display and announcing the availability of breast milk of the highest tier.`);
			}
		}
		if (A.FSPhysicalIdealistDecoration === 100) {
			buffer.push(`Both the central ${statue} figure and the slaves are ${A.FSPhysicalIdealistLaw === 1 ? "quite fit" : "very muscular"}.`);
		}
		if (A.FSHedonisticDecadenceDecoration === 100) {
			buffer.push(`The central ${statue} figure has a distinct softness to its body, while the slaves are delightfully rotund.`);
		}
		if (A.FSIntellectualDependencyDecoration === 100) {
			buffer.push(`The slaves are visibly aroused.`);
		}
		if (A.FSSlaveProfessionalismDecoration === 100) {
			buffer.push(`The slaves have flawless posture.`);
		}
		if (A.FSChattelReligionistDecoration === 100) {
			buffer.push(`The central ${statue} figure has a halo behind ${hisP} head, and the slaves are in attitudes of worship.`);
		}
		if (A.FSRomanRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a toga; ${heP} has a laurel wreath about ${hisP} brow.`);
		}
		if (A.FSNeoImperialistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a suit of tight-fitting, advanced battle armor that clearly defines ${hisP} musculature, and a magnificent Emperor's crown atop ${hisP} head.`);
		}
		if (A.FSAztecRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a feathered cloak, ornamented with jewels; ${heP} has a giant headdress on ${hisP} head.`);
		}
		if (A.FSEgyptianRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a pharaoh's crown.`);
		}
		if (A.FSEdoRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure has a hand resting confidently on the hilts of the sheathed katana and wakizashi ${heP} has thrust through the sash about ${hisP} waist.`);
		}
		if (A.FSArabianRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing a turban and flowing robes.`);
		}
		if (A.FSChineseRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure is wearing the robes of an ancient Chinese ${V.PC.title === 1 ? "Emperor" : "Empress"}.`);
		}
		if (A.FSAntebellumRevivalistDecoration === 100) {
			buffer.push(`The central ${statue} figure rides a rearing horse, towering above bystanders. The figure is wearing an old-fashioned military uniform; ${heP} wields a saber in one hand, raised triumphantly towards the sky.`);
		}

		return buffer.join(" ");
	}

	addParagraph(location(), weather(), deco100());

	/**
	 * @returns {string}
	 */
	function deco40() {
		if (FutureSocieties.HighestDecoration() < 40) {
			return "";
		}

		let buffer = [];
		buffer.push(`The entryway features the first of ${A.name}'s many banks of public screens.`);
		if (A.FSSupremacistDecoration >= 40) {
			buffer.push(`Some are showing talk shows and documentaries supporting ${A.FSSupremacistRace} supremacy.`);
		}
		if (A.FSSubjugationistDecoration >= 40) {
			buffer.push(`Some are showing long pseudoscientific programs explaining ${A.FSSubjugationistRace} degeneracy.`);
		}
		if (A.FSIntellectualDependencyDecoration >= 40) {
			buffer.push(`Some are showing simple, colorful, and very sexual programs made to excite slow slaves.`);
		}
		if (A.FSSlaveProfessionalismDecoration >= 40) {
			buffer.push(`Some are showing self-improvement shows on how to be a better slave for one's owner.`);
		}
		if (A.FSRepopulationFocusDecoration >= 40) {
			buffer.push(`Some are showing medical programs about pregnancy, interspersed with pornography starring slaves with big pregnant bellies.`);
		}
		if (A.FSRestartDecoration >= 40) {
			buffer.push(`Some are showing propaganda discouraging slave pregnancy, while encouraging the Elite to interbreed. Others urge free citizens to join the Societal Elite today.`);
		}
		if (A.FSGenderFundamentalistDecoration >= 40) {
			buffer.push(`Some are showing pornography starring women with perfect tits, tight asses and nice pussies.`);
		}
		if (A.FSGenderRadicalistDecoration >= 40) {
			buffer.push(`Some are showing pornography starring slaves with a truly remarkable variety of genitalia.`);
		}
		if (A.FSPaternalistDecoration >= 40) {
			buffer.push(`Some are showing educational programs for the edification of slaves, and news programs featuring slave accomplishments.`);
		}
		if (A.FSDegradationistDecoration >= 40) {
			buffer.push(`Some are showing abusive pornography involving slaves being beaten, sodomized, and modified against their will.`);
		}
		if (A.FSBodyPuristDecoration >= 40) {
			buffer.push(`Some are showing sports programs, the latest games, and self-improvement videos.`);
		}
		if (A.FSTransformationFetishistDecoration >= 40) {
			buffer.push(`Some are showing medical programs about surgical transformation, interspersed with pornography starring slaves with fake tits.`);
		}
		if (A.FSYouthPreferentialist >= 40) {
			buffer.push(`Most of the girls featured are just over the age of majority.`);
		}
		if (A.FSMaturityPreferentialist >= 40) {
			buffer.push(`Most of the ladies featured are nice and mature.`);
		}
		if (A.FSStatuesqueGlorificationDecoration >= 40) {
			buffer.push(`Some are showing infomercials on how to appear taller, interspersed with pornography starring tall slaves.`);
		}
		if (A.FSPetiteAdmirationDecoration >= 40) {
			buffer.push(`Some are showing infomercials for accommodating short slaves, interspersed with pornography focusing on the size differences between owners and slaves.`);
		}
		if (A.FSSlimnessEnthusiastDecoration >= 40) {
			buffer.push(`Some are showing workout videos interspersed with pornography starring slim slaves.`);
		}
		if (A.FSAssetExpansionistDecoration >= 40) {
			buffer.push(`Some are playing pornography starring slaves with huge assets, interspersed with pharmaceutical advertisements.`);
		}
		if (A.FSPastoralistDecoration >= 40) {
			buffer.push(`Some are showing informational agricultural programs interspersed with pornography starring slaves who are lactating heavily${V.seePreg === 1 ? ", hugely pregnant, or often both" : ""}.`);
		}
		if (A.FSPhysicalIdealistDecoration >= 40) {
			buffer.push(`Some are showing`);
			if (A.FSPhysicalIdealistLaw === 1) {
				buffer.push(`athletic competitions, advertisements for supplements, and pornography starring physically fit slaves.`);
			} else {
				buffer.push(`bodybuilding competitions, advertisements for supplements, and pornography starring hugely muscular slaves.`);
			}
		}
		if (A.FSHedonisticDecadenceDecoration >= 40) {
			buffer.push(`Some are showing pampering spas, advertisements for various eateries, and pornography starring corpulent slaves and food.`);
		}
		if (A.FSChattelReligionistDecoration >= 40) {
			buffer.push(`Some are showing religious services interspersed with serious programs on the compatibility of sexual slavery with the faith.`);
		}
		if (A.FSRomanRevivalistDecoration >= 40) {
			buffer.push(`Some are showing announcements on ${A.name}'s progress prepared by the state media for the edification of citizens.`);
		} else if (A.FSNeoImperialistDecoration >= 40) {
			buffer.push(`Some are showing glorified videos of Imperial Knights dominating futuristic battlefields; others show formal debates on the importance of hierarchy.`);
		} else if (A.FSAztecRevivalistDecoration >= 40) {
			buffer.push(`Some are glorifying the Five Suns and the role of sacrifice and bloodletting.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 40) {
			buffer.push(`Some are showing educational and scientific programs interspersed with multicultural features.`);
		} else if (A.FSEdoRevivalistDecoration >= 40) {
			buffer.push(`Some are showing historical dramas set in Edo Japan.`);
		} else if (A.FSArabianRevivalistDecoration >= 40) {
			buffer.push(`Some are showing dramatic retellings of traditional Bedouin fables.`);
		} else if (A.FSChineseRevivalistDecoration >= 40) {
			buffer.push(`Some are showing ancient Chinese operas.`);
		} else if (A.FSAntebellumRevivalistDecoration >= 40) {
			buffer.push(`Some are showing films and media that demonstrate the inherent exceptionalism of America.`);
		}
		if (V.arcologyUpgrade.grid === 1) {
			buffer.push(`The programming is constantly updated to suit the individual viewer.`);
			if (V.brothelAdsSpending > 0) {
				buffer.push(`Pornographic advertisements for the brothel are interspersed with the programming.`);
				if (V.brothelAdsOld === 1) {
					buffer.push(`The featured slave actresses are all MILFs.`);
				} else if (V.brothelAdsOld === -1) {
					buffer.push(`The featured slave actresses are all nice and young.`);
				} else if (V.brothelAdsOld === -2) {
					buffer.push(`The featured slave actresses are all teenagers.`);
				} else if (V.brothelAdsOld === -3) {
					buffer.push(`The featured slave actresses are all lolis.`);
				} else {
					buffer.push(`The featured slave actresses vary in age.`);
				}
				if (V.brothelAdsStacked === 1) {
					buffer.push(`Lots of bouncing breasts and butts`);
				} else if (V.brothelAdsStacked === -1) {
					buffer.push(`Lots of trim breasts and shapely butts`);
				} else {
					buffer.push(`A variety of breast and butt sizes and shapes`);
				}
				buffer.push(`are on display, and`);
				if (V.brothelAdsImplanted === 1) {
					buffer.push(`most of these are augmented by implants.`);
				} else if (V.brothelAdsImplanted === -1) {
					buffer.push(`they're all natural.`);
				} else {
					buffer.push(`some are augmented by implants.`);
				}
				if (V.seePreg === 1) {
					if (V.brothelAdsPreg === 1) {
						buffer.push(`Most of the slaves have firm, rounded bellies.`);
					} else if (V.brothelAdsPreg === -1) {
						buffer.push(`Most of the slaves have firm, flat bellies.`);
					} else {
						buffer.push(`Some of the slaves are pregnant.`);
					}
				}
				if (V.brothelAdsModded === 1) {
					buffer.push(`Everything is heavily pierced and tattooed.`);
				} else if (V.brothelAdsModded === -1) {
					buffer.push(`Everything is free of tattoos and piercings.`);
				} else {
					buffer.push(`Some of these assets are tattooed and pierced, and some aren't.`);
				}
				buffer.push(`The slaves in the ads are`);
				if (V.brothelAdsXX === 1) {
					buffer.push(`sucking dick and taking cock in their pussies and asses.`);
				} else if (V.brothelAdsXX === -1) {
					buffer.push(`sucking cock and being assfucked while their dicks flop around.`);
				} else {
					buffer.push(`sucking dick and taking anal, and the ones that have pussies are being fucked there, too.`);
				}
				const t = `As a result, ${V.brothelName} is known as the place to go if you want to rent`;
				if (V.brothelAdsXX === 1) {
					if (V.brothelAdsImplanted === 1 && V.brothelAdsStacked === 1) {
						buffer.push(`${t} a${V.brothelAdsPreg === 1 ? " pregnant" : ""} bimbo's pussy.`);
					} else if (V.brothelAdsOld === 1) {
						buffer.push(`${t} a${V.brothelAdsPreg === 1 ? " pregnant" : ""} MILF's tits.`);
					} else if (V.brothelAdsOld === -3) {
						buffer.push(`${t} ${addA(`${V.brothelAdsPreg === 1 ? "pregnant " : ""}${V.brothelAdsStacked === 1 ? "oppai " : ""}loli.`)}`);
					} else if (V.brothelAdsPreg === 1) {
						buffer.push(`${t} a pregnant girl.`);
					}
				} else if (V.brothelAdsXX === -1) {
					if (V.brothelAdsStacked === 1) {
						buffer.push(`${t} a shemale's asspussy.`);
					} else if (V.brothelAdsStacked === -1) {
						buffer.push(`${t} a trap's tight ass.`);
					}
				}

				const whores = App.Entity.facilities.brothel.employees();

				if (whores.length > 5 && whores.every(slave => slave.face > 40)) {
					buffer.push(`${V.arcologies[0].name} is known for its beautiful whores.`);
				}
			}
			if (V.clubAdsSpending > 0) {
				buffer.push(`Music videos set in ${V.clubName} are also shown frequently.`);
				if (V.clubAdsOld === 1) {
					buffer.push(`The featured strippers are all MILFs.`);
				} else if (V.clubAdsOld === -1) {
					buffer.push(`The featured strippers are all nice and young.`);
				} else if (V.clubAdsOld === -2) {
					buffer.push(`The featured strippers are all teenagers.`);
				} else if (V.clubAdsOld === -3) {
					buffer.push(`The featured strippers are all lolis.`);
				} else {
					buffer.push(`The featured strippers vary in age.`);
				}
				if (V.clubAdsStacked === 1) {
					buffer.push(`Lots of bouncing breasts and butts`);
				} else if (V.clubAdsStacked === -1) {
					buffer.push(`Lots of trim breasts and shapely butts`);
				} else {
					buffer.push(`A variety of breast and butt sizes and shapes`);
				}
				buffer.push(`are on display, and`);
				if (V.clubAdsImplanted === 1) {
					buffer.push(`most of these are augmented by implants.`);
				} else if (V.clubAdsImplanted === -1) {
					buffer.push(`they're all natural.`);
				} else {
					buffer.push(`some are augmented by implants.`);
				}
				if (V.seePreg === 1) {
					if (V.clubAdsPreg === 1) {
						buffer.push(`Most of the strippers have firm, rounded bellies.`);
					} else if (V.clubAdsPreg === -1) {
						buffer.push(`Most of the strippers have firm, flat bellies.`);
					} else {
						buffer.push(`Some of the strippers are pregnant.`);
					}
				}
				if (V.clubAdsModded === 1) {
					buffer.push(`Everything is heavily pierced and tattooed.`);
				} else if (V.clubAdsModded === -1) {
					buffer.push(`Everything is free of tattoos and piercings.`);
				} else {
					buffer.push(`Some of these assets are tattooed and pierced, and some aren't.`);
				}
				buffer.push(`The strippers get naked quickly, and show off`);
				if (V.clubAdsXX === 1) {
					buffer.push(`their pussies and assholes.`);
				} else if (V.clubAdsXX === -1) {
					buffer.push(`their assholes.`);
				} else {
					buffer.push(`their holes.`);
				}
				buffer.push(`The music videos are very popular.`);
				const t = `As a result, ${V.clubName} is known as the place to spend a night partying with`;
				if (V.clubAdsXX === 1) {
					if (V.clubAdsImplanted === 1 && V.clubAdsStacked === 1) {
						buffer.push(`${t}${V.clubAdsPreg === 1 ? " pregnant" : ""} bimbos.`);
					} else if (V.clubAdsOld === 1) {
						buffer.push(`${t}${V.clubAdsPreg === 1 ? " pregnant" : ""} MILFs.`);
					} else if (V.clubAdsOld === -3) {
						buffer.push(`${t}${V.clubAdsPreg === 1 ? " pregnant" : ""}${V.brothelAdsStacked === 1 ? " oppai" : ""} lolis.`);
					} else if (V.clubAdsPreg === 1) {
						buffer.push(`${t} with pregnant sluts.`);
					}
				} else if (V.clubAdsXX === -1) {
					if (V.clubAdsStacked === 1) {
						buffer.push(`${t} with shemales.`);
					} else if (V.clubAdsStacked === -1) {
						buffer.push(`${t} traps.`);
					}
				}
			}
		}
		return buffer.join(" ");
	}

	addParagraph(deco40());

	/**
	 * @returns {string}
	 */
	function secExp() {
		if (V.secExpEnabled === 0) {
			return "";
		}

		let buffer = [];
		if (V.SecExp.buildings.propHub) {
			buffer.push(`A small street hides a surprisingly inconspicuous building, whose task is to manage your public image, protection and population control.`);
		}
		if (V.SecExp.buildings.secHub) {
			buffer.push(`In a secure corner of the penthouse, the Security HQ silently works to build a safe and prosperous arcology.`);
		}
		if (V.SecExp.buildings.barracks) {
			buffer.push(`At the center of the structure the barracks can be found filling the halls with the noise of ballistic weapons and training troops.`);
		}
		if (V.SecExp.buildings.weapManu) {
			buffer.push(`Down in the lower levels of the arcology the weapons manufacturing facility dominates the environment; there, armaments of all kind are produced and shipped away.`);
		}
		if (V.SecExp.buildings.riotCenter) {
			buffer.push(`Near the penthouse the riot control center can be found. Here dissidents and dangerous political forces of ${A.name} are carefully monitored and managed.`);
		}
		if (V.SecExp.buildings.transportHub) {
			buffer.push(`The transport hub, in the commercial section of the arcology, deals with new arrivals to ${A.name} via ${V.terrain === "oceanic" || V.terrain === "marine" ? "sea" : "land"} in addition to air.`);
		}
		return buffer.join(" ");
	}

	addParagraph(secExp());

	function catgirls() {
		if (V.seeCats === 0) {
			return "";
		}

		let buffer = [];
		if (V.projectN.techReleased === 1) {
			buffer.push(`After the release of Project N technologies to the public, rare catgirls can be found as exotic curiosities of the arcology's elites. An even smaller number of free catgirls populate the arcology's poorest segments.`);
		}
		if (A.FSEgyptianRevivalistDecoration >= 60 && V.projectN.decisionMade === 1) {
			buffer.push(`Catgirls have taken on a distinct religious and cultural presence within the arcology, and many citizens give small offerings and worship to the felines given their resemblance to ancient Egyptian Goddesses. Getting to actually fuck one is a mark of exceptionally high prestige, and many poorer citizens seem content to offer their prayers and kiss furry ass, often literally.`);
		}
		if (A.FSTransformationFetishistDecoration >= 60 && V.projectN.decisionMade === 1) {
			buffer.push(`Catgirls are a craze in the Arcology's transformationist society, and many pieces of strange equipment designed for catgirl slaves, as well as surgical modification tools to 'transform' people into being more feline, can be found for sale.`);
		}
		return buffer.join(" ");
	}

	addParagraph(catgirls());

	function deco60() {
		if (FutureSocieties.HighestDecoration() < 60) {
			return "";
		}

		let buffer = [];
		buffer.push(`The central plaza is a large open atrium lined with banners.`);
		if (A.FSSupremacistDecoration >= 60) {
			buffer.push(`Some depict great achievements in ${A.FSSupremacistRace} history.`);
		}
		if (A.FSSubjugationistDecoration >= 60) {
			buffer.push(`Some depict crushing defeats in ${A.FSSubjugationistRace} history.`);
		}
		if (A.FSGenderRadicalistDecoration >= 60) {
			buffer.push(`Some are split horizontally in three: one part depicts penetration of a woman's pussy, another depicts penetration of a shemale's anus, and the third depicts simultaneous penetration of a hermaphrodite's pussy and anus. The order in which they appear, top to bottom, varies from banner to banner.`);
		}
		if (A.FSGenderFundamentalistDecoration >= 60) {
			buffer.push(`Some lovingly depict close-ups of pussies, a different one on each banner, in all their beauty and variation.`);
		}
		if (A.FSPaternalistDecoration >= 60) {
			buffer.push(`Some feature respectful portraits of some of the arcology's most talented slaves doing what they're best at.`);
		}
		if (A.FSRepopulationFocusDecoration >= 60) {
			buffer.push(`Some feature respectful portraits of happy pregnant women.`);
		}
		if (A.FSRestartDecoration >= 60) {
			buffer.push(`Some feature respectful portraits of society's finest.`);
		}
		if (A.FSBodyPuristDecoration >= 60) {
			buffer.push(`Some feature portraits of pristine nude bodies without a blemish or marking.`);
		}
		if (A.FSTransformationFetishistDecoration >= 60) {
			buffer.push(`Some depict sex featuring some of the arcology's most heavily implanted slaves.`);
		}
		if (A.FSYouthPreferentialistDecoration >= 60) {
			buffer.push(`Some depict idealized outlines of youthful bodies, with trim hips and pure faces.`);
		}
		if (A.FSMaturityPreferentialistDecoration >= 60) {
			buffer.push(`Some depict idealized outlines of mature bodies, with motherly hips and knowing faces.`);
		}
		if (A.FSPetiteAdmirationDecoration >= 60) {
			buffer.push(`Some depict sex between bodies of vastly different sizes.`);
		}
		if (A.FSStatuesqueGlorificationDecoration >= 60) {
			buffer.push(`Some depict idealized outlines of statuesque bodies.`);
		}
		if (A.FSSlimnessEnthusiastDecoration >= 60) {
			buffer.push(`Some feature artistic depictions of slender girls, running, dancing, and in the midst of the act of love.`);
		}
		if (A.FSAssetExpansionistDecoration >= 60) {
			buffer.push(`Some feature lewd close-ups of enormous breasts and giant asses.`);
		}
		if (A.FSPastoralistDecoration >= 60) {
			buffer.push(`Some feature prizewinning cows.`);
		}
		if (A.FSPhysicalIdealistDecoration >= 60) {
			buffer.push(`Some feature`);
			if (A.FSPhysicalIdealistLaw === 1) {
				buffer.push(`athletic portraits of the arcology's fastest, strongest, and healthiest girls.`);
			} else {
				buffer.push(`some of the arcology's most swole ladies.`);
			}
		}
		if (A.FSHedonisticDecadenceDecoration >= 60) {
			buffer.push(`Many feature the most popular entertainment options your arcology has to offer.`);
		}
		if (A.FSChattelReligionistDecoration >= 60) {
			buffer.push(`Many include religious iconography.`);
		}
		if (A.FSSlaveProfessionalismDecoration >= 60) {
			buffer.push(`Most were handcrafted by the local chattel.`);
		}
		if (A.FSDegradationistDecoration >= 60) {
			buffer.push(`There are cages hanging from the ceiling of the central plaza; a naked slave occupies each one.`);
		}
		if (A.FSRomanRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a thriving Roman forum on market day.`);
			if (V.eventResults.artifactsBought?.includes("roman")) {
				buffer.push(`A small museum dedicated to the history of the Roman legions can be found just off the plaza; its main attraction is Julius Caesar's legendary sword, the Crocea Mors.`);
			}
		} else if (A.FSNeoImperialistDecoration >= 60) {
			buffer.push(`The central plaza is a brightly-colored mix between an Imperial marketplace and a crowded, futuristic forum, with street peddlers advertising fine nanolinens and advanced medicinal syringes between granite statues of stoic, proud Knights.`);
		} else if (A.FSAztecRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a tribute to the gods, with huge statues, all looking in awe at the central temple.`);
			if (V.eventResults.artifactsBought?.includes("aztec")) {
				buffer.push(`Rows of stone steps lead up toward the ancient stone platform used for sacrifices.`);
			}
			buffer.push(`Around the plaza, many merchants peddle the goods of the new millennium.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a thriving ancient Egyptian market on a festival day.`);
			if (V.eventResults.artifactsBought?.includes("egyptian")) {
				buffer.push(`Near the center of the plaza, a pillar supports a large bust of Cleopatra, whose sultry gaze overlooks the slave markets.`);
			}
		} else if (A.FSEdoRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a vision of urban Edo Japan, with strings of lanterns crisscrossing the space and the petals from cherry blossoms floating gently through the air.`);
			// The Edo artifact is kept in your office, not displayed on the promenade.
		} else if (A.FSArabianRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like a thriving Arabian slave market.`);
			if (V.eventResults.artifactsBought?.includes("arabian")) {
				buffer.push(`A black stone stele inscribed with the Code of Hammurabi stands in a prominent position to one side of the plaza.`);
			}
		} else if (A.FSChineseRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is constructed as a Chinese water market, with stalls set up to serve customers passing by on boats riding on shallow canals.`);
			if (V.eventResults.artifactsBought?.includes("chinese")) {
				buffer.push(`Through a window near one entrance to the plaza, a large wooden statue of the Guan Yin Bodhisattva can be clearly seen.`);
			}
		} else if (A.FSAntebellumRevivalistDecoration >= 60) {
			buffer.push(`The central plaza is decorated to look like an enormous plantation garden, with elegant colonnades and hedgerows to direct foot traffic throughout the arcology. A paved square lies at the center with a platform for slave auctions.`);
			if (V.eventResults.artifactsBought?.includes("antebellum")) {
				buffer.push(`A small museum dedicated to the history of the Antebellum South can be found just off the plaza; its main attraction is General Robert E. Lee's Colt Model 1855 revolver.`);
			}
		}
		return buffer.join(" ");
	}

	const d60 = deco60();
	let drones = "";
	if (V.arcologyUpgrade.drones === 1) {
		if (d60 !== "") {
			drones = `A security drone occasionally flies across the open space.`;
		} else {
			drones = `The central plaza is a large atrium; a security drone occasionally flies across the open space.`;
		}
	}

	addParagraph(d60, drones);

	function deco80part1() {
		if (FutureSocieties.HighestDecoration() < 80) {
			return "";
		}

		let buffer = [];

		buffer.push(` There are numerous slaves stationed down on the plaza to greet visitors.`);
		if (A.FSSlaveProfessionalismDecoration >= 80) {
			buffer.push(`They're intelligent and articulate.`);
		}
		if (A.FSPaternalistDecoration >= 80) {
			buffer.push(`All are healthy and happy.`);
		}
		if (A.FSBodyPuristDecoration >= 80) {
			buffer.push(`Most are pretty and unspoiled.`);
		}
		if (A.FSStatuesqueGlorificationDecoration >= 80) {
			buffer.push(`Plenty are tall for their age.`);
		}
		if (A.FSTransformationFetishistDecoration >= 80) {
			if (A.FSTransformationFetishistResearch === 1) {
				buffer.push(`Most have absolutely enormous fake tits, lips and asses. Some even have breasts and butts larger than their entire bodies.`);
			} else {
				buffer.push(`Most have enormous fake tits, lips and asses.`);
			}
		}
		if (A.FSYouthPreferentialistDecoration >= 80) {
			buffer.push(`Most are quite young, and a fair amount of energetic giggling can be heard.`);
		}
		if (A.FSMaturityPreferentialistDecoration >= 80) {
			buffer.push(`Most are quite mature, and very experienced; they see nothing unusual about offering visitors public sex as a way to welcome them to ${A.name}.`);
		}
		if (A.FSSlimnessEnthusiastDecoration >= 80) {
			buffer.push(`Many are girlish and energetic.`);
		}
		if (A.FSIntellectualDependencyDecoration >= 80) {
			buffer.push(`More than few are getting a little hands-on with the visitors.`);
		}
		if (A.FSAssetExpansionistDecoration >= 80) {
			if (A.FSAssetExpansionistResearch === 1) {
				buffer.push(`Many are using wheeled stands to permit them to stand despite their titanic breasts${V.seeDicks > 0 ? ", massive asses, trunk-like cocks and boulder-sized balls" : " and massive asses"}.`);
			} else {
				buffer.push(`Many are wearing custom bras to manage their enormous breasts.`);
			}
		}
		if (A.FSRepopulationFocusDecoration >= 80) {
			buffer.push(`Most have large pregnant bellies.`);
		}
		if (A.FSRestartDecoration >= 80) {
			buffer.push(`All are either wearing chastity or are infertile.`);
		}
		if (A.FSPetiteAdmirationDecoration >= 80) {
			buffer.push(`Most are making use of raised platforms to give guests a better view of their short figures.`);
		}
		if (A.FSPastoralistDecoration >= 80) {
			buffer.push(`Many of them can offer visitors a sample of ${A.name}'s pride and joy, straight from the nipple.`);
		}
		if (A.FSPhysicalIdealistDecoration >= 80) {
			if (A.FSPhysicalIdealistLaw === 1) {
				buffer.push(`Their bodies are uniformly fit and healthy${A.FSRomanRevivalist > 0 ? " in the Hellenistic tradition" : ""}.`);
			} else {
				buffer.push(`Their musculature is uniformly stunning. Swole acceptance is high here.`);
			}
		}
		if (A.FSHedonisticDecadenceDecoration >= 80) {
			buffer.push(`Most are quite plush and often carry trays for visitors to sample the local pleasures.`);
		}
		if (A.FSRomanRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing authentic ancient Roman stolas and maintaining composed and dignified attitudes.`);
		} else if (A.FSNeoImperialistDecoration >= 80) {
			buffer.push(`Many are wearing high-tech, tight-fitting bodysuits, all of which bear crests marking their noble owners.`);
		} else if (A.FSAztecRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing authentic Aztec huipils, woven specifically to draw the attention of the visitors.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing authentic ancient Egyptian dresses, and are dancing and making merry when they aren't assisting people.`);
		} else if (A.FSEdoRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing daring kimonos, and politely greet visitors by their proper titles.`);
		} else if (A.FSArabianRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing beguiling harem girl outfits, and dance to set the little bells attached to the fabric jingling.`);
		} else if (A.FSChineseRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing qipaos cut very short, and jostle and chatter in the throng that packs the plaza.`);
		} else if (A.FSAntebellumRevivalistDecoration >= 80) {
			buffer.push(`Many are wearing fine suits or lacy gowns, and carry themselves with an air of sophistication`);
		}
		if (A.FSGenderRadicalistDecoration >= 80) {
			if (A.FSGenderRadicalistResearch === 1) {
				buffer.push(`On several raised stands around the plaza, girls with dicks are stripping for the pleasure of passersby. Some of them are noticeably pregnant, despite lacking vaginas.`);
			} else {
				buffer.push(`On several raised stands around the plaza, girls with dicks are stripping for the pleasure of passersby.`);
			}
		}
		if (A.FSGenderFundamentalistDecoration >= 80) {
			buffer.push(`On several raised stands around the plaza, female slaves are stripping for the pleasure of passersby.`);
		}
		if (A.FSChattelReligionistDecoration >= 80) {
			if (A.FSChattelReligionistLaw2 === 1) {
				buffer.push(`A handful of nude slaves are praying.`);
			} else {
				buffer.push(`A handful of slaves are in religious attire, praying.`);
			}
			buffer.push(`They help if asked, and will even lead brief religious services if requested.`);
		}
		if (A.FSDegradationistDecoration >= 80) {
			buffer.push(`Numerous downtrodden slaves are working on the plaza at menial tasks. Some are even carrying citizens in sedan chairs.`);
		}
		if (A.FSSupremacistDecoration >= 80) {
			buffer.push(`Here and there around the plaza, slaves of every race besides ${A.FSSupremacistRace} people can be seen carrying things, cleaning, and even shining shoes.`);
		}
		if (A.FSSubjugationistDecoration >= 80) {
			buffer.push(`In the center of the plaza, an auction of a large group of frightened ${A.FSSubjugationistRace} slaves is taking place.`);
		}
		if (V.assistant.power > 0) {
			buffer.push(`The plaza is packed with citizens doing business.`);
		}

		return buffer.join(" ");
	}

	addParagraph(deco80part1());

	function deco80part2() {
		if (FutureSocieties.HighestDecoration() < 80) {
			return "";
		}

		let buffer = [];
		if (A.FSSupremacistDecoration >= 80) {
			buffer.push(`The chanted sounds of indoctrination can faintly be heard in the plaza.`);
		}
		if (A.FSSubjugationistDecoration >= 80) {
			buffer.push(`Judging by the sound of leather on flesh, a whipping is happening somewhere close by the plaza.`);
		}
		if (A.FSGenderRadicalistDecoration >= 80) {
			buffer.push(`A slave is being sodomized in a parlor off the plaza, to go by the pained moaning.`);
		}
		if (A.FSGenderFundamentalistDecoration >= 80) {
			buffer.push(`A slave is being fucked in a parlor off the plaza, to go by the gasps of pleasure.`);
		}
		if (A.FSPaternalistDecoration >= 80) {
			buffer.push(`The sounds of orgasm are drifting out of a hallway off the plaza.`);
		}
		if (A.FSDegradationistDecoration >= 80) {
			buffer.push(`Agonized screaming is drifting out of a hallway off the plaza.`);
		}
		if (A.FSPetiteAdmirationDecoration >= 80) {
			buffer.push(`The squeals of a slave being whisked off their feet echoes somewhere off the plaza.`);
		}
		if (A.FSBodyPuristDecoration >= 80) {
			buffer.push(`Splashing water in a swimming pool can be heard from below the plaza.`);
		}
		if (A.FSRepopulationFocusDecoration >= 80) {
			buffer.push(`The sound of a woman in labor can be heard from somewhere off the plaza.`);
		}
		if (A.FSTransformationFetishistDecoration >= 80) {
			buffer.push(`The heavy beat of club music can be heard on the plaza.`);
		}
		if (A.FSSlaveProfessionalismDecoration >= 80) {
			buffer.push(`A deep discussion over sexual technique can be heard from a nearby balcony.`);
		}
		if (A.FSIntellectualDependencyDecoration >= 80) {
			buffer.push(`Giggles and moans are drifting out of a hallway off the plaza.`);
		}
		if (A.FSRestartDecoration >= 80) {
			buffer.push(`The sound of a fertile slave being ${A.FSPaternalist > 20 ? `viciously beaten` : `"reeducated"`} can be heard from a side hall.`);
		}
		if (A.FSYouthPreferentialistDecoration >= 80) {
			buffer.push(`The squeals of a young slave taking cock in a tight hole are coming from somewhere off the plaza.`);
		}
		if (A.FSMaturityPreferentialistDecoration >= 80) {
			buffer.push(`The throaty laughter of an amused older woman is coming from somewhere off the plaza.`);
		}
		if (A.FSSlimnessEnthusiastDecoration >= 80) {
			buffer.push(`The quiet murmur of feet on a running track can be heard from the club above the plaza.`);
		}
		if (A.FSAssetExpansionistDecoration >= 80) {
			buffer.push(`Stereotypical bimbo giggling can be heard from the club above the plaza.`);
		}
		if (A.FSStatuesqueGlorification >= 80) {
			buffer.push(`The sound of a short slave being bullied can be heard from somewhere off the plaza.`);
		}
		if (A.FSPastoralistDecoration >= 80) {
			buffer.push(`An indistinct gushing noise is coming from somewhere below the plaza.`);
		}
		if (A.FSPhysicalIdealistDecoration >= 80) {
			buffer.push(`The clash of a deadlift bar being racked can be heard from a nearby gym.`);
		}
		if (A.FSHedonisticDecadenceDecoration >= 80) {
			buffer.push(`The sound of a rather heavy orgy can be heard from somewhere off the plaza.`);
		}
		if (A.FSChattelReligionistDecoration >= 80) {
			buffer.push(`A lovely hymn is drifting through the air.`);
		}
		if (A.FSRomanRevivalistDecoration >= 80 && A.FSRomanRevivalistSMR === 1) {
			buffer.push(`Faintly, the sound of cheering can be heard as`);
			if (FutureSocieties.isActive('FSPaternalist', A)) {
				buffer.push(`a slave achieves sexual victory over their partner`);
			} else if (V.pitKillsTotal > 0) {
				buffer.push(`a slave dies`);
			} else {
				buffer.push(`a slave successfully rapes`);
			}
			buffer.push(`in gladiatorial combat.`);
		} else if (A.FSAztecRevivalistDecoration >= 80) {
			buffer.push(`The sound of prayer and chanting echoes across the space, briefly accompanied by a sacrifice's ${FutureSocieties.isActive('FSPaternalist', A) ? "moaning" : "last scream"} as the rite completes.`);
		} else if (A.FSNeoImperialistDecoration >= 80) {
			buffer.push(`The constant noise of trade and revelry echoes across every inch of the crowded plaza, kept under control by stern-looking guards in armor painted your colors, holding holographic halberds and standing at attention.`);
		} else if (A.FSEgyptianRevivalistDecoration >= 80) {
			buffer.push(`To the side of the plaza is a huge stone entryway heading down: the entrance to the tomb you have prepared for yourself.`);
		} else if (A.FSEdoRevivalistDecoration >= 80) {
			buffer.push(`Everyone maintains a certain air of decorum, and whenever two citizens meet they perform a polite ceremony of respectful greeting.`);
		} else if (A.FSArabianRevivalistDecoration >= 80) {
			buffer.push(`The throng packing the busy plaza must periodically give way before a new train of fresh slaves chained together at the neck, being led into the market by one of the arcology's many prosperous slavers.`);
		} else if (A.FSChineseRevivalistDecoration >= 80) {
			buffer.push(`The noise in the thriving open space is almost oppressive, with the sounds of drunken merriment, traditional music, and distant intercourse forming an omnipresent hum.`);
		} else if (A.FSAntebellumRevivalistDecoration >= 80) {
			buffer.push(`The sound of hushed gossip is just barely discernible over a waltz being played in some distant ballroom.`);
		}

		return buffer.join(" ");
	}

	const citizenCount = `${num(V.ACitizens)} citizens and ${num(V.ASlaves + V.slaves.length)} slaves live in ${A.name}.`;

	function fsLaws() {
		let buffer = [];
		if (A.FSSupremacistLawME === 1) {
			buffer.push(`The citizenry is entirely ${A.FSSupremacistRace}.`);
		}
		if (A.FSRomanRevivalistLaw === 1) {
			buffer.push(`Every citizen has military responsibilities, which are a point of pride to many, with most opting to wear utilitarian clothing even when off duty.`);
		}
		if (A.FSNeoImperialistLaw1 === 1) {
			buffer.push(`Occasionally, an Imperial Knight in expensive battle armor wanders through the plaza, often accompanied by a small group of lesser soldiers with battle armor painted in the same fashion as the Knight's.`);
		}
		if (A.FSNeoImperialistLaw2 === 1) {
			buffer.push(`You can see a Baron off in the distance, wearing a bright gold headband that shimmers in the dim neon light of the plaza, dictating some edict of yours down to a street merchant who scribbles down their words furiously.`);
		}
		if (A.FSAztecRevivalistLaw === 1) {
			buffer.push(`Most citizens wear satin loincloths and cloaks, distinguished from those of slaves by the richness of their adornments.`);
		}
		if (A.FSAntebellumRevivalistLaw1 === 1) {
			buffer.push(`The law enshrining slave owners as the most vital members of your arcology has clearly gone to their heads; well-to-do citizens proudly walk by with a gaggle of slaves in tow. `);
		}
		if (A.FSAntebellumRevivalistLaw2 === 1) {
			buffer.push(`On occasion, the subtle hint of a concealed holster can be seen on your citizenry.`);
		}
		if (A.FSMaturityPreferentialistLaw === 1) {
			buffer.push(`Most citizens are at least middle-aged, and graying hair on a citizen is considered attractive here.`);
		} else if (A.FSYouthPreferentialistLaw === 1) {
			buffer.push(`Most citizens shine with youth and enthusiasm.`);
		}
		if (A.FSGenderRadicalistDecoration === 100) {
			buffer.push(`Every single one of the slaves is female by virtue of her fuckable asshole.`);
		} else if (A.FSGenderFundamentalistSMR === 1) {
			buffer.push(`Almost every prominent citizen is an upstanding man, while the slave population is almost completely female.`);
		}
		if (A.FSEgyptianRevivalistLaw === 1) {
			buffer.push(`Close relationships between citizens and slaves, especially slave siblings, are common.`);
		} else if (A.FSEgyptianRevivalistIncestPolicy === 1) {
			buffer.push(`Close relationships between citizens, slaves and siblings are common.`);
		}
		if (A.FSSubjugationistLawME === 1 && typeof A.FSSubjugationistRace === "string") {
			buffer.push(`${capFirstChar(A.FSSubjugationistRace)} subhumans form a majority of the slaves.`);
		}
		if (A.FSChattelReligionistLaw === 1) {
			buffer.push(`The slave population as a whole is unusually accepting of its station.`);
		}
		if (A.FSPaternalistLaw === 1) {
			buffer.push(`The slaves are well cared for, and it can sometimes be difficult to tell slaves from citizens.`);
		} else if (A.FSDegradationistLaw === 1) {
			buffer.push(`Most of the slaves are recent captures, since the vicious society that's taken root here uses people up quickly.`);
		}
		if (A.FSBodyPuristLaw === 1) {
			buffer.push(`The average slave is quite healthy.`);
		} else if (A.FSTransformationFetishistSMR === 1) {
			if (A.FSTransformationFetishistResearch === 1) {
				buffer.push(`Breast implants are almost universal; ${!FutureSocieties.isActive('FSSlimnessEnthusiast', A) ? "an M-cup bust is below average among the slave population" : "even the most lithe slave sports a pair of overly round chest balloons"}.`);
			} else {
				buffer.push(`Breast implants are almost universal; ${!FutureSocieties.isActive('FSSlimnessEnthusiast', A) ? "a D-cup bust is below average among the slave population" : "even the most lithe slave sports a pair of overly round chest balloons"}.`);
			}
		}
		if (A.FSIntellectualDependencySMR === 1) {
			buffer.push(`The average slave is entirely dependent on its master.`);
		} else if (A.FSSlaveProfessionalismSMR === 1) {
			buffer.push(`The average slave is entirely capable of acting on its master's behalf.`);
		}
		if (A.FSSlimnessEnthusiastSMR === 1) {
			buffer.push(`Most of the slave population is quite slim and physically fit.`);
		} else if (A.FSAssetExpansionistSMR === 1) {
			buffer.push(`${A.name}'s consumption of pharmaceuticals is impressive, since slave growth hormones are nearly ubiquitous.`);
		}
		if (A.FSPetiteAdmirationSMR === 1) {
			buffer.push(`Slaves are both easy to identify, but hard to find in a crowd given their short stature.`);
		} else if (A.FSStatuesqueGlorificationSMR === 1) {
			buffer.push(`${A.name}'s ${A.FSStatuesqueGlorificationLaw === 1 ? "entire" : "slave"} population stands taller than most visitors.`);
		}
		if (A.FSRepopulationFocusSMR === 1) {
			buffer.push(`Most of the slaves in the arcology are sporting pregnant bellies.`);
		} else if (A.FSRestartSMR === 1) {
			buffer.push(`Most of the slaves in the arcology are infertile.`);
		}
		if (A.FSRestartLaw === 1) {
			if (V.ACitizens < 600) {
				buffer.push(`Nearly every free woman is a member of the Elite and some degree pregnant.`);
			} else {
				buffer.push(`It isn't uncommon to see a free woman pregnant and proudly bearing the insignia of the Elite.`);
			}
		}
		if (A.FSRepopulationFocusLaw === 1) {
			buffer.push(`It isn't uncommon to see free women proudly sporting waist sizes over 100cm either.`);
		}
		if (A.FSPastoralistLaw === 1) {
			buffer.push(`Much of the menial slave labor force works to service ${A.name}'s hundreds of human cattle.`);
		}
		if (A.FSPhysicalIdealistSMR === 1) {
			buffer.push(`${A.name} must import a very large quantity of nutritive protein to nourish its slaves.`);
		}
		if (A.FSHedonisticDecadenceSMR === 1) {
			buffer.push(`${A.name} must import a very large quantity of fattening food to plump up its slaves.`);
		}
		if (V.animals.canine.length > 0 || V.animals.hooved.length > 0 || V.animals.feline.length > 0) {
			buffer.push(`Slaves can be seen walking your animals every so often.`);
		}
		if (V.policies.SMR.beauty.qualitySMR) {
			buffer.push(`${A.name} is known for its beautiful slaves.`);
		}

		return buffer.join(" ");
	}

	addParagraph(deco80part2(), citizenCount, fsLaws(), `Its lingua franca is ${V.language}.`);

	/**
	 * @returns {DocumentFragment}
	 */
	function peacekeepers() {
		const frag = document.createDocumentFragment();

		if (V.plot) {
			if (V.peacekeepers.state <= 1) {
				if (V.invasionVictory) {
					frag.append(`The area previously occupied by the little old world country whose collapse led to a failed invasion of the Free City is a lawless wilderness.`);
				} else if (V.week > 29) {
					frag.append(`A small old world country near the arcology is in the process of collapse${V.nationHate ? ", and your opportunistic behavior towards it has caused hatred there" : ""}.`);
				} else {
					frag.append(`There is nothing notable about the decaying old world countries ${V.terrain === "oceanic" ? "on the shoreline nearest" : "near"} the arcology.`);
				}
			} else {
				if (V.peacekeepers.strength >= 50) {
					frag.append(`General ${V.peacekeepers.generalName} now governs an area near the Free City as a warlord, using the men and women of his former peacekeeping forces to rule.`);
					if (V.peacekeepers.attitude >= 100) {
						frag.append(` The area is a de facto client state of your arcology.`);
					} else {
						frag.append(` He considers himself indebted to you, and delivers periodic tributes of menial slaves.`);
					}
				} else {
					frag.append(undermine());
				}
			}
		}
		return frag;
	}

	function undermine() {
		const span = document.createElement("span");
		span.append(undermineContent());
		return span;

		function undermineContent() {
			const fragment = document.createDocumentFragment();

			fragment.append(`There's a peacekeeping force led by General ${V.peacekeepers.generalName} in the troubled area near the Free City.`);

			if (V.peacekeepers.undermining > 0) {
				fragment.append(` You are spending ¤`,
					App.UI.DOM.makeTextBox(V.peacekeepers.undermining, v => {
						V.peacekeepers.undermining = Math.clamp(Math.ceil(v / 1000) * 1000, 0, 10000);
						App.UI.DOM.replace(span, undermineContent());
					}, true),
					` each week to promote misinformation in the old world that undermines the peacekeepers.`);
			} else {
				fragment.append(` You are not undermining the peacekeepers. `,
					App.UI.DOM.link("Start a misinformation campaign", () => {
						V.peacekeepers.undermining = 1000;
						App.UI.DOM.replace(span, undermineContent());
					}));
			}

			return fragment;
		}
	}

	addParagraph(peacekeepers(), lastElement);

	return fragment;
};
