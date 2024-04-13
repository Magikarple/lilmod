App.UI.neighborDescription = function(i) {
	const el = new DocumentFragment();
	const averageProsperity = _.mean(V.arcologies.map((a) => a.prosperity));
	let r = [];
	r.push(App.UI.DOM.makeElement("span", V.arcologies[i].name, "bold"));
	if (V.arcologies[i].direction !== 0) {
		r.push(`is located to the ${V.arcologies[i].direction} of your arcology. It is governed by`);
		switch (V.arcologies[i].government) {
			case "elected officials":
				r.push(`elected officials, periodically paralyzing its development.`);
				break;
			case "a committee":
				r.push(`a committee, hindering its development.`);
				break;
			case "an oligarchy":
				r.push(`a small group of leading citizens, making its development very unpredictable.`);
				break;
			case "your trustees":
				r.push(`a small group of leading citizens who are serving as <span class="mediumseagreen">your trustees.</span>`);
				break;
			case "an individual":
				r.push(`<span class="cyan">an individual,</span> making its development vibrant but unpredictable.`);
				break;
			case "your agent":
				r.push(`<span class="deeppink">your agent,</span> who is directing the arcology in your stead.`);
				break;
			case "a corporation":
				r.push(`a corporation, making its development steady and unspectacular.`);
				break;
			default:
				r.push(`direct democracy, making its development dangerously unstable.`);
		}
	} else {
		r.push(`is your arcology.`);
	}
	let economicUncertainty = App.Utils.economicUncertainty(i);
	if (V.arcologies[i].direction === 0) {
		r.push(`You control <span class="lime">${V.arcologies[i].ownership}%</span> of the arcology${V.arcologies[0].ownership !== 100 ? `, and the largest minority holder controls <span class="orange">${V.arcologies[i].minority}%.</span>` : `.`}`);
	} else if ((V.arcologies[i].government !== "your trustees") && (V.arcologies[i].government !== "your agent")) {
		r.push(`Its leadership has control of approximately <span class="orange">${Math.trunc(V.arcologies[i].ownership*economicUncertainty)}%</span> of the arcology${(V.arcologies[i].minority > V.arcologies[i].ownership-10) ? `, a dangerously narrow margin over competition with a <span class="tan">${Math.trunc(V.arcologies[i].minority*economicUncertainty)}%</span> share` : ``}.`);
	}
	if (V.arcologies[i].PCminority > 0) {
		r.push(`You own <span class="lime">${V.arcologies[i].PCminority}%</span> of this arcology${(((V.arcologies[i].government === "your trustees") || (V.arcologies[i].government === "your agent")) && V.arcologies[i].minority > V.arcologies[i].PCminority-10) ? `, a dangerously narrow margin over competition with a <span class="red">${Math.trunc(V.arcologies[i].minority*economicUncertainty)}%</span> share` : ``}.`);
	}
	r.push(`The arcology has an estimated GSP of <span class="yellowgreen">${cashFormat(Math.trunc(0.1*V.arcologies[i].prosperity*economicUncertainty))}m,</span>`);
	if (Math.abs(V.arcologies[i].prosperity - averageProsperity) < 5) {
		r.push(`average among`);
	} else if (V.arcologies[i].prosperity > averageProsperity) {
		r.push(`ahead of`);
	} else {
		r.push(`behind`);
	}
	r.push(`its neighbors.`);

	let desc = "";
	const neighborDescription = [];
	/** @type {Record<FC.FutureSociety, Record<95 | 40 | 0, string>>} */
	const FSThresholds = {
		FSSubjugationist: {
			95: `the home of an advanced project to create a subservient race of ${V.arcologies[i].FSSubjugationistRace} slaves`,
			40: `working to refine ${V.arcologies[i].FSSubjugationistRace} slavery`,
			0: `an excellent dumping ground for low quality ${V.arcologies[i].FSSubjugationistRace} slaves.`
		},
		FSSupremacist: {
			95: `a global magnet for ${V.arcologies[i].FSSupremacistRace} nationalists`,
			40: `becoming increasingly free of ${V.arcologies[i].FSSupremacistRace} slaves`,
			0: `the site of a furious debate over existing ${V.arcologies[i].FSSupremacistRace} slaves`
		},
		FSRepopulationFocus: {
			95: `notorious for the size and number of pregnancies among its population`,
			40: `known to be a good place to find slavegirls heavy with children`,
			0: `actively importing fertile slave girls`
		},
		FSRestart: {
			95: `notorious for the number of powerful civilians inhabiting it`,
			40: `known to be a good place to make connections`,
			0: `actively importing sterilization supplies`
		},
		FSGenderRadicalist: {
			95: `notorious for the openness with which its citizens fuck its slavegirls in the ass until they cum`,
			40: `known to be a good place to find slavegirls who cum when buttfucked`,
			0: `actively importing a wider variety of slave girls`
		},
		FSGenderFundamentalist: {
			95: `famous for its slave schools, crowded with a future generation of world class slaves`,
			40: `remarkable for its crowds of hugely pregnant slave women`,
			0: `importing increasing numbers of fertile slaves`
		},
		FSPaternalist: {
			95: `the home of an educated, enlightened caste of slaves more productive than some arcologies' citizens`,
			40: `becoming known for its unusually cheerful atmosphere`,
			0: `starting to demand abused slaves whose lives can be turned around`
		},
		FSDegradationist: {
			95: `renowned and feared by slaves worldwide, as a place of blood and steel from which few ever leave`,
			40: `becoming dreaded by slaves, since the few it exports are full of unbelievably awful stories`,
			0: `importing a rapidly increasing number of slaves, for some reason`
		},
		FSIntellectualDependency: {
			95: `both terrifying and alluring to slaves worldwide, as a place where none leave with any semblance of intelligence but always flaunt the enjoyment they've had`,
			40: `becoming known for its unusually simple-minded chattel`,
			0: `importing large quantities of aphrodisiacs and psychosuppressants`
		},
		FSSlaveProfessionalism: {
			95: `renowned as a source of some of the world's finest courtesans`,
			40: `becoming revered as an intellectual paradise`,
			0: `seeking out high-class slave trainers`
		},
		FSBodyPurist: {
			95: `a world leader in the drug industry due to its pharmaceutical research breakthroughs`,
			40: `pouring an ever-increasing amount of money into drug research`,
			0: `setting up research programs to develop better slave drugs`,
		},
		FSTransformationFetishist: {
			95: `renowned as the source of some of the world's most unbelievable surgical transformations`,
			40: `rapidly moving from mere breast expansion to more esoteric surgical fetishism`,
			0: `receiving daily shipments of silicone and surgical necessities`,
		},
		FSYouthPreferentialist: {
			95: `famous for the intense celebratory attention slaves receive there once reaching their majorities`,
			40: `moving virginity and the taking of virginity ever higher in the public estimation`,
			0: `starting to get a reputation as an excellent place to get a good price for a virgin`,
		},
		FSMaturityPreferentialist: {
			95: `world famous among mature slaves, who see it as a paradise in which MILFs are the most valuable girls around`,
			40: `striking for the variety of well-preserved beauties that can be seen there`,
			0: `displaying an increasing demand for enslaved housewives and professional women`,
		},
		FSPetiteAdmiration: {
			95: `known as a place where even the shortest person can feel tall`,
			40: `investing large sums of money into petite clothing lines`,
			0: `starting to accumulate an unusually large number of short slaves`
		},
		FSStatuesqueGlorification: {
			95: `world famous among tall slaves, who see it as a paradise in which they are valued above all`,
			40: `going out of its way to import only the tallest of slaves`,
			0: `starting to drive out its shorter citizenry`,
		},
		FSSlimnessEnthusiast: {
			95: `very well known for the wonderful variety of nubile bodies that can be seen there`,
			40: `becoming known as an arcology that slims slaves down rather than turning them into piles of tits and ass`,
			0: `starting to display unusual fashions regarding breasts and butts`,
		},
		FSAssetExpansionist: {
			95: `widely considered an interior design masterpiece for its adaptations to slaves with fifty kilos of tits`,
			40: `a popular tourist destination just for the view, which features some truly spectacular bare boobs`,
			0: `demanding fatter slaves, since its citizens are learning they absorb growth hormones better`,
		},
		FSPastoralist: {
			95: `a world-renowned producer of cowgirl dairy products of all kinds`,
			40: `devoting more and more of its slaves to work as cowgirls, or to the service and upkeep of cowgirls`,
			0: `displaying an increasing public appetite for dairy, and yet imports almost no true cow's milk`,
		},
		FSCummunism: {
			95: `a world-renowned producer of cum-based products of all kinds`,
			40: `devoting more and more of its slaves to work as cumtanks, or to the service, upkeep and milking of ballgirls`,
			0: `displaying an increasing public appetite for cum, and has begun importing more and more specialized milkers`,
		},
		FSPhysicalIdealist: {
			95: `a constant standout at international athletic competitions, where both its citizens and slaves do very well`,
			40: `quite a sight, since its citizens and slaves all lift constantly`,
			0: `the site of a musclegirl fetish community`,
		},
		FSHedonisticDecadence: {
			95: `very well known as a place where every imaginable desire and fantasy can be fulfilled`,
			40: `importing huge amounts of food and alcohol`,
			0: `the site of a large number of lazy individuals`,
		},
		FSIncestFetishist: {
			95: `highly recommended as a place to stop by if you like threesomes with twins or familial gangbangs`,
			40: `attracting a substantial number of families`,
			0: `devoting more and more of its resources into genealogy`,
		},
		FSChattelReligionist: {
			95: `a significant force in the global development of Chattel Religionist dogma`,
			40: `a popular destination for devout old world citizens engaging in sex tourism`,
			0: `in the throes of public dissension over its religious laws`,
		},
		FSNull: {
			95: `the source of several new and interesting cultural fusion trends in art, fashion and cuisine`,
			40: `a popular place to visit to broaden one's horizons`,
			0: `struggling with the conflict inherent in becoming a cultural melting pot`
		},
		FSRomanRevivalist: {
			95: `hugely famous for its broadcasts of gladiatorial combat, popular even in the old world`,
			40: `almost obnoxiously aspirational, with citizens competing to serve the state best`,
			0: `working its way through sword and sandals fashion towards proper historicity`,
		},
		FSNeoImperialist: {
			95: `utterly hierarchical, with techno-nobles holding near complete control over the very lives of the masses and powerful Knights in heavy powered plate keeping them firmly in line`,
			40: `increasingly syncretic, integrating the highest technology with total, unrepentant serfdom under tight-fisted techno-nobles and a rising class of elite Knights serving as the sword of the nobility`,
			0: `creating an extremely strict hierarchical system, with an elite caste of techno-nobility cementing itself through a series of complicated, emergent feudal dynamics`,
		},
		FSAztecRevivalist: {
			95: `world famous for its incredible architecture and highly qualified leading caste and military`,
			40: `constructing great pyramids and statues with equally weighty costs`,
			0: `struggling to embrace the amount of blood sacrifice and prayer involved`,
		},
		FSEgyptianRevivalist: {
			95: `a world famous tourist destination for the traditional festival in its plaza, which never stops`,
			40: `very much under renovation, as vast blocks of stone are imported around the clock`,
			0: `struggling with the fashion implications of so much white linen everywhere`,
		},
		FSEdoRevivalist: {
			95: `visibly trailing cherry blossoms, blown off its balconies by the wind`,
			40: `becoming a notable cultural center, even in the old world`,
			0: `the object of considerable debate among socially awkward teenagers worldwide`,
		},
		FSArabianRevivalist: {
			95: `a famous center of Arabian romanticism, since it has the wisdom not to be historically perfect`,
			40: `working through which parts of Arabian romanticism to adopt and which to discard`,
			0: `eagerly reveling in the most romantic parts of superficial Arabian romanticism`,
		},
		FSChineseRevivalist: {
			95: `now confidently mature about its possession of the Mandate of Heaven`,
			40: `often aggressive about its status as the middle kingdom to the point that it betrays uncertainty`,
			0: `moving towards a stage of refinement that will allow it to present itself properly`,
		},
		FSAntebellumRevivalist	: {
			95: `famed for it's Greek-revival style architecture, well-mannered citizenry, and chivalrous aristocrats.`,
			40: `a superficial and sappy reflection of the old American South, too busy indulging in the extravagant architecture of Antebellum plantation houses`,
			0: `struggling to center its society around slave-owning aristocrats and facing resistance from certain ethnic groups who fear they may become a class of chattel slaves.`
		},
	};

	for (const fs of App.Data.FutureSociety.fsNames) {
		const fsScore = V.arcologies[i][fs];
		if (fsScore > 0) {
			if (fsScore > 80) {
				desc = "committed to ";
			} else if (fsScore > 20) {
				desc = "pursuing ";
			} else {
				desc = "just establishing ";
			}
			desc += `<span class="gold">${FutureSocieties.displayName(fs)},</span> and is `;
			for (const threshold of [95, 40, 0]) {
				if (fsScore >= threshold) {
					desc += FSThresholds[fs][threshold] + `.`;
					break;
				}
			}
			neighborDescription.push(desc);
		}
	}

	if (neighborDescription.length > 0) {
		if (neighborDescription.length > 2) {
			r.push(`Its culture is complex. First, it is ${neighborDescription[0]}`);
			for (let j = 1; j < neighborDescription.length; j++) {
				if (j < neighborDescription.length-1) {
					r.push(`It is`);
				} else {
					r.push(`Finally, the arcology is`);
				}
				r.push(neighborDescription[j]);
			}
		} else if (neighborDescription.length === 2) {
			r.push(`Its culture is developing along two lines. First, it is ${neighborDescription[0]} Second, it is ${neighborDescription[1]}`);
		} else {
			r.push(`Its culture is diverging from the old world: it is ${neighborDescription[0]}`);
		}
	}
	App.Events.addNode(el, r, "div");
	return el;
};
