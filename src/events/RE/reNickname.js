App.Events.RENickname = class RENickname extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.nicknamesAllowed === 1
		];
	}

	actorPrerequisites() {
		const prereqs = [[ // one actor
			(s) => (V.week - Math.max(0, s.weekAcquired)) >= 4, // owned for at least four weeks
			(s) => s.assignment !== Job.ARCADE, // not immured in the arcade
			(s) => s.fuckdoll === 0, // not in a Fuckdoll suit
			(s) => !s.slaveName.includes("'"), // doesn't have a nickname yet
			(s) => this.getQualifiedNicknames(s).size > 0 // qualifies for at least one nickname category
		]];
		if (this.params.type === "RNIE") { // if a slave could qualify for the individual variant of this event, prohibit her from qualifying for the nonindividual variant
			prereqs[0].push((s) => !assignmentVisible(s) && ![Job.MASTERSUITE, Job.CONCUBINE, Job.QUARTER].includes(s.assignment));
		}
		return prereqs;
	}

	/** Chainable method to set the prerequisites, weight, and other settings depending on whether it's called as an individual or nonindividual event.
	 * @param {"RIE"|"RNIE"} eventType - RIE if individual, RNIE if nonindividual
	 */
	setType(eventType) {
		this.params.type = eventType;
		return this;
	}

	/** Nickname event weight, ONLY when called as a nonindividual event, actually depends on the selected actor's devotion, which is SUPER WEIRD. But whatever, we can totally do that...
	 * @returns {number}
	 */
	get weight() {
		if (this.params.type === "RNIE") {
			const [slave] = this.actors.map(a => getSlave(a));
			return (slave.devotion >= -20) ? 2 : 1;
		} else {
			return 1;
		}
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {He, he, him} = getPronouns(slave);

		const qualifiedNicknames = this.getQualifiedNicknames(slave);
		let seed = Array.from(qualifiedNicknames.keys()).random();
		App.Events.drawEventArt(node, slave);
		const intro = App.UI.DOM.makeElement("div");
		node.append(intro);
		intro.append(introPassage());
		function introPassage() {
			const el = new DocumentFragment();
			const r = [];
			const {nicknameArray, situationDesc, applyDesc, notApplyDesc} = qualifiedNicknames.get(seed);
			let nickname = either(...nicknameArray);
			const catEl = App.UI.DOM.makeElement("div", selectCategory(V.debugMode > 0 && V.debugModeEventSelection > 0));
			r.push(catEl);
			r.push(App.UI.DOM.slaveDescriptionDialog(slave), situationDesc);
			const nickEl = App.UI.DOM.makeElement("span", selectNickname(V.debugMode > 0 && V.debugModeEventSelection > 0));
			r.push(`You begin to overhear your other slaves refer to ${him} as`, nickEl);
			App.Events.addParagraph(el, r);
			App.Events.addResponses(el, [
				new App.Events.Result("Encourage use of the nickname", encourage),
				new App.Events.Result("Disapprove, but encourage the other slaves to come up with a better nickname", () => {
					seed = Array.from(qualifiedNicknames.keys()).random();
					jQuery(intro).empty().append(introPassage());
					return ``;
				}),
				new App.Events.Result("Put a stop to it", () => {
					disableCheats();
					return `As soon as you make your will on the matter known, ${slave.slaveName} is referred to as ${slave.slaveName} again. ${slave.slaveName} ${notApplyDesc}`;
				}),
				new App.Events.Result("No nicknames, now or ever", () => {
					disableCheats();
					V.nicknamesAllowed = 0;
					return `You make it known that the power to name slaves is yours and yours alone.`;
				})
			]);
			return el;
			function disableCheats() {
				$(catEl).empty().append(selectCategory(false));
				$(nickEl).empty().append(selectNickname(false));
			}
			function selectCategory(cheat) {
				const el = new DocumentFragment();
				if (cheat) {
					App.UI.DOM.appendNewElement("span", el, `Select a category of nicknames `);
					const options = [];
					for (const category of qualifiedNicknames.keys()) {
						options.push({key: category, name: category});
					}
					el.append(App.UI.DOM.makeSelect(options, seed, value => {
						seed = value;
						jQuery(intro).empty().append(introPassage());
					}));
				}
				return el;
			}
			function selectNickname(cheat) {
				const el = new DocumentFragment();
				if (cheat) {
					const options = [];
					for (const category of nicknameArray) {
						options.push({key: category, name: `'${category}'`});
					}
					el.append(App.UI.DOM.makeSelect(options, nickname, name => {
						nickname = name;
					}));
				} else {
					App.UI.DOM.appendNewElement("span", el, `${nickname} `, "pink");
				}
				App.UI.DOM.appendNewElement("span", el, `${slave.slaveName}.`, "pink");
				return el;
			}
			function encourage() {
				disableCheats();
				const r = [];
				r.push(`Whatever ${slave.slaveName}'s feelings about being called ${nickname} were, ${he} knows they're moot`);
				if (!canHear(slave)) {
					r.push(`when ${he} learns that you also`);
				} else {
					r.push(`the first time ${he} hears you`);
				}
				r.push(`refer to ${him} that way. <span class="hotpink">${He} has become more submissive to you.</span> ${slave.slaveName} ${applyDesc}`);
				slave.devotion += 4;
				slave.slaveName = `'${nickname}' ${slave.slaveName}`;
				return r;
			}
		}
	}

	/** Fetch nickname data for a particular category and slave
	 * @param {App.Entity.SlaveState} slave
	 */
	getQualifiedNicknames(slave) {
		const implanted = (slave.boobsImplant / slave.boobs) >= 0.60 || (slave.buttImplant / slave.butt) > 0.60;
		/** @type {Map<string, {nicknameArray: Array<string>, situationDesc: string, applyDesc: string, notApplyDesc: string}>} */
		const nickMap = new Map([]);
		const {
			He, he, His, his, him,
			Hers, hers, himself, girl, woman
		} = getPronouns(slave);

		// One condition
		if (slave.nationality) {
			nickMap.set(
				"nationality", {
					get nicknameArray() {
						switch (slave.nationality) {
							case "Afghan":
								return ["Afghan", "Afghani", "Avagana", "Bactrian", "Bagram", "Chai Girl", "Herat", "Kabul", "Kandahar", "Pashtun", "Peshawar", "Poppy", "Rubab", "Taliban"];
							case "Albanian":
								return ["Albani", "Albanian", "Albanoi", "Durrës", "Eagle Child", "Hoxha", "Mother Albania", "Qemali", "Sejdia", "Shiptar", "Skanderbeg", "Tirana", "Understanding", "White Hills"];
							case "Algerian":
								return ["Algerian", "Algiers", "Casbah", "Corsair", "Daughter of Māzġānna", "Djamila", "Harki", "Hassiba", "Oran", "Pied-Noir", "Sanhaja", "Zhora"];
							case "American":
								return ["American", "Amerifat", "Apple Pie", "Atlanta", "Bald Eagle", "Baseball", "Boston", "Burger", "California", "Chicago", "Colonist", "Columbia", "Cowgirl", "Dallas", "Detroit", "Great Satan", "Gun Nut", "Hollywood", "Houston", "Lady Liberty", "Las Vegas", "Lone Star", "Los Angeles", "Miami", "Murica", "New York", "Philadelphia", "Plymouth", "San Francisco", "Seattle", "Septic", "Stars & Stripes", "Trump", "U.S.A.", "Ugly", "Uncle Sam", "United Statesian", "US American", "Usonian", "Washington", "Yank", "Yankee"];
							case "Andorran":
								return ["Andor", "Andorran", "Catalan", "Forester", "Hell Valley", "La Vella", "Les Escaldes", "Pyrenees", "Scrub", "Ski Trip", "Skossyreff", "Urgell"];
							case "Angolan":
								return ["Angolan", "Baixa de Cassanje", "Cabinda", "Conqueror", "Huambo", "Luanda", "Matamba", "Ndongo", "Ngola", "Nzinga"];
							case "Antiguan":
								return ["All Saints", "Ancient", "Antiguan", "Barbuda", "Barbudan", "Barbudian", "Bearded", "Fig Tree", "Leeward", "Redonda", "Seville", "St. John's", "Virgin of the Old Cathedral", "Whitewood"];
							case "Argentinian":
								return ["Argentine", "Argentinean", "Argentinian", "Blanca", "Buenos Aires", "Córdoba", "Evita", "Gaucha", "Macri", "Malvinas", "Patagonia", "Perón", "Silver River", "Silvery"];
							case "Armenian":
								return ["Apricot", "Aram", "Armenian", "Armo", "Assembler", "Duduk", "Gyumri", "Hachik", "Hayastan", "Khorovats", "Minni Mountain", "Mother Armenia", "Rabiz", "Urmani", "Yerevan"];
							case "Aruban":
								return ["Aloe Vera", "Aruban", "Caquetio", "Croes", "Djucu", "Giant", "Golden", "Oranjestad", "Papiamento", "Shell", "Sint Nicolaas", "Well-Placed"];
							case "Australian":
								return ["Abo", "Adelaide", "Aussie", "Australian", "Bogan", "Brisbane", "Bunyip", "Canberra", "Convict", "Crikey", "Didgeridoo", "Dingo", "Down Under", "Emu", "G'Day", "Gold Coast", "Incognita", "Kangaroo", "Mad", "Melbourne", "New Holland", "Oz", "Perth", "Sheila", "Skip", "Skippy", "Southern Land", "Sydney"];
							case "Austrian":
								return ["Anschluss", "Austrian", "Bavarian", "Bundesadler", "Eastern Realm", "Fritzl", "Fut", "Graz", "Innsbruck", "Linz", "Maria", "Österreich", "Sharp Mountain", "Vienna", "Wiener", "Willendorf"];
							case "Azerbaijani":
								return ["Arran", "Atropatene", "Azerbaijani", "Azerbaijanian", "Azeri", "Baku", "Balaban", "Black January", "Caucasian Albania", "Ganja", "Holy Fire", "Musavat", "Shirvan", "Transcaucasia"];
							case "Bahamian":
								return ["Bahama Mama", "Bahamian", "Big Upper Middle", "Bimini", "Castaway", "Columbus", "Creole", "Freeport", "Low Tide", "Lucayan", "Nassau", "New Providence", "Shallow Seas", "Southern Cross", "Symonette", "Windsor"];
							case "Bahraini":
								return ["Al-Hasa", "Arad", "Awal", "Bahraini", "Bahri", "Dilmun", "Manama", "Nestorian", "Pearl", "Qarmatian", "Riffa", "Two Seas", "Tylos", "Zubarah"];
							case "Bangladeshi":
								return ["Bangamata", "Bangla", "Bangladeshi", "Bengal", "Bengalese", "Bengali", "Bengi", "Bengullie", "Bennie", "Bhang", "Bhibhi", "Bhola", "Chittagong", "Deshi", "Dhaka", "Dotara", "East Pakistan", "Jackfruit", "Joy Bangla", "Mujibnagar", "Sweatshop", "Tiger", "Vanga"];
							case "Barbadian":
								return ["Bajan", "Barbadian", "Bim", "Bimshire", "Bridgetown", "Fig Tree", "Flying Fish", "Little England", "Speightstown", "Sugar Cane", "The Rock"];
							case "Belarusian":
								return ["Belarusian", "Bulbash", "Draniki", "Homel", "Homyel", "Lukashenko", "Mahilyow", "Minsk", "Ruthenia", "Shlyukha", "Šliucha", "Stalker", "White Russian"];
							case "Belgian":
								return ["Angry Bulge", "Antwerp", "Belgae", "Belgian", "Belgica", "Brussels", "Dazzling", "Liège", "Muette de Portici", "Sprout", "Straatmeid", "Truttemie", "Waffles"];
							case "Belizean":
								return ["Beacon", "Belizean", "Belmopan", "British Honduras", "Great Blue Hole", "Muddy-Watered", "Punta", "San Ignacio", "Shady", "Wallace"];
							case "Beninese":
								return ["Abomey-Calavi", "Abomey", "Ahosi", "Balleland", "Beninese", "Beninois", "Bight", "Borgu", "Cotonou", "Dahomey", "Mino", "Porto-Novo", "Tribal", "Ubinu", "Vexation"];
							case "Bermudian":
								return ["Bermuda Triangle", "Bermudan", "Bermúdez", "Bermudian", "Devil", "Hamilton", "Onion", "Portuguese Rock", "Sea Venture", "St. George's", "Wild Hog"];
							case "Bhutanese":
								return ["Bhutanese", "Boutan", "Butt", "Dragon Queen", "Druk", "End of Tibet", "Gangkhar Puensum", "Happiness Report", "Highlander", "Phuntsholing", "Punakha", "Takin", "Thimphu", "Thunder Dragon"];
							case "Bissau-Guinean":
								return ["Bafatá", "Bissau-Guinean", "Bissau", "Bissorã", "Boe", "Bolama", "Cabral", "Cacheu", "Gabu", "Gabú", "Kaabu", "Kansala", "Kriol", "Portuguese Guinea", "Slave Coast"];
							case "Bolivian":
								return ["Bolívar", "Bolivian", "Charango", "Charcas", "Chuquisaca", "El Alto", "La Paz", "Potosí", "Santa Cruz", "Sucre", "Titicaca", "Upper Peru"];
							case "Bosnian":
								return ["Ban Kulin", "Banja Luka", "Bosniak", "Bosnian", "Boundary", "Brčko", "Duke's Land", "Herzegovina", "Herzegovinian", "Izetbegović", "Princip", "Running Water", "Sarajevo", "Srebrenica", "Stećak", "Tvrtko"];
							case "Brazilian":
								return ["7-1", "Amazon", "Bauru", "Belo Horizonte", "Bracile", "Brasília", "Brazilian", "Brazilwood", "Bunda", "Carmen Miranda", "Carnival", "Dago", "Efígie da República", "Favelada", "Holy Cross", "Hue", "Ipanema", "Monkey", "Palm Tree", "Pindorama", "Ragamuffin", "Red-Wood", "Rio de Janeiro", "São Paulo", "True Cross", "Zika"];
							case "British":
								return ["Albion", "Angle", "Big Ben", "Birmingham", "Brexit", "Brigid", "Bristol", "Brit", "Britannia", "Britbong", "British", "Briton", "Bulldog", "Chav", "English", "Fish'n'Chips", "Gov'nor", "Jane Bull", "Leeds", "Limey", "Liverpool", "London", "Manchester", "Northern Irish", "Old Fox", "Pikey", "Pommie", "Rosbif", "Round Table", "Scottish", "Scrubber", "Slag", "Slapper", "Welsh", "White Cliffs"];
							case "Bruneian":
								return ["Abode of Peace", "Bandar Seri Begawan", "Barunah", "Bolkiah", "Brunei Beauty", "Bruneian", "Camphor", "Chinese Widow", "Cockfight", "Jerudong", "Kinabalu", "Kuala Belait", "Limbang", "Seafarer", "Sultan", "White Rajah"];
							case "Bulgarian":
								return ["Bulgar", "Bulgarian", "Disordered", "Five Arrows", "Gaida", "Karanovo", "Kubrat", "Mother Bulgaria", "Nikopol", "Pliska", "Plovdiv", "Sofia", "Split Off", "Varna", "Zhivkov"];
							case "Burkinabé":
								return ["Bobo-Dioulasso", "Burkina Fasan", "Burkinabé", "Compaoré", "Dyula", "Father's House", "Honest", "Lamizana", "Mossi", "Ouagadougou", "Sankara", "Upper Volta", "Upright"];
							case "Burmese":
								return ["Bamar", "Brahma", "Burma Shave", "Burman", "Burmese Python", "Burmese", "Fast-Strong", "Golden Triangle", "Irrawaddy", "Mandalay", "Myanma", "Myanmar", "Myanmese", "Naypyidaw", "Pagan", "Rangoon", "Yangon"];
							case "Burundian":
								return ["Bagaza", "Bujumbura", "Burundian", "Gitega", "Heha", "Impunity", "Martyazo", "Micombero", "Muyinga", "Ngozi", "Rundi", "Umurundi", "Urundi"];
							case "Cambodian":
								return ["Angkor Wat", "Beauty Enjoyer", "Cambodian", "Chenla", "Holiday in Cambodia", "Indochina", "Kamboja", "Kampuchea", "Khmer Rouge", "Khmer", "Killing Field", "Kouprey", "Lovek", "Naga", "Phnom Penh", "Pol Pot", "Siem Reap", "Tuol Sleng", "Unshaken", "Yasodharapura"];
							case "Cameroonian":
								return ["Africa in Miniature", "Bakassi", "Bamenda", "Biya", "Cameroonian", "Camfranglais", "Douala", "Fon", "Ghost Shrimp", "Kamerun", "Shrimp River", "Wouri", "Yaoundé"];
							case "Canadian":
								return ["Aboot", "Acadia", "Beaver", "Calgary", "Canadian", "Canadienne", "Canuck", "Edmonton", "Eh", "Francisca", "Leaf", "Loonie", "Maple Syrup", "Maple", "Montreal", "Mountie", "No Gold", "Ottawa", "Poutine", "Quebec", "Toronto", "Vancouver", "Villager", "Winnipeg", "Yukon"];
							case "Cape Verdean":
								return ["Cabo Verde", "Cabral", "Cap-Vert", "Cape Verdean", "Cidade Velha", "Green Cape", "Macronesia", "Mindelo", "Praia", "Ribeira Grande"];
							case "Catalan":
								return ["Aloja", "Banyoles", "Barcelona", "Battle Chief", "Castell", "Catalan", "Catalonian", "Catalufo", "Goth", "Killer", "Lacetani", "Nova Planta", "Sardana", "Segadora", "Senyera", "Spanish", "Xuixo"];
							case "Central African":
								return ["Abiras", "Banana", "Bangui", "Bimbo", "Bokassa", "Bouar", "C.A.R.", "Central African Empire", "Central African", "Chari", "Kolingba", "Sango", "Ubangi-Shari", "Ubangi"];
							case "Chadian":
								return ["Borkou", "Chad", "Chadian", "Déby", "Habré", "Kanem-Bornu", "Lake", "Moundou", "N'Djamena", "Njimi", "Tchadienne", "Tibesti", "Tombalbaye"];
							case "Chilean":
								return ["Araucaria", "Chela", "Chilean", "Chilli", "Chilote", "Deep Snow", "Doña Juanita", "Hausa", "Helicopter Ride", "Land's End", "Pinochet", "Poet", "Puente Alto", "Rapa Nui", "Rota", "Santiago", "Toya", "Valparaiso", "Valparaíso", "Yellow-Winged Blackbird"];
							case "Chinese":
								return ["Beijing", "Boxer", "Cathay", "Changsha", "Chankoro", "Chengdu", "Chinese", "Ching Chong", "Chink", "Chongqing", "Cina", "Dalian", "Dim Sum", "Dongguan", "Dragon", "Empress", "Foshan", "Great Wall", "Guangzhou", "Hangzhou", "Harbin", "Hefei", "Hong Kong", "Kowloon", "Kung Fu", "Lead Toys", "Lotus", "Macau", "Made in China", "Manchu", "Nanchang", "Nanjing", "Nanking", "Ningbo", "Qingdao", "Red Dragon", "Renmenbi", "Shanghai", "Shantou", "Shenyang", "Shenzhen", "Silken", "Suzhou", "Tianjin", "Triad", "Wenzhou", "Wuhan", "Xi'an", "Xiamen", "Zhengzhou", "Zhongshan"];
							case "Colombian":
								return ["Bogotá", "Bogotazo", "Cafetera", "Cali", "Coca", "Colombian", "Columbus", "Condor", "Crystal", "Cundinamarca", "El Dorado", "FARC", "Guatavita", "Medellín", "New Granada", "Pablita Escobar", "Violencia"];
							case "Comorian":
								return ["Anjouan", "Comoran", "Comorian", "Great Islander", "Karthala", "Mayotte", "Mohéli", "Moon", "Moroni", "Mutsamudu"];
							case "Congolese":
								return ["Brazza", "Brazzaville", "Congolese", "French Congo", "Kongo", "Middle Congo", "Mokele-Mbembe", "Ngouabi", "Nguesso", "Pointe-Noire"];
							case "a Cook Islander":
								return ["Aitutaki", "Amuri", "Arutanga", "Avarua", "Cook Islander", "Cook", "Cumberland", "Endeavour", "Hermosa", "Hervey", "Māori", "Pukapuka", "Rarotonga", "San Bernardo", "Two Harbors"];
							case "Costa Rican":
								return ["Alajuela", "Cartago", "Coffee Baron", "Costa Rican", "Diquís Sphere", "Ferrer", "Guanacaste", "Limón", "Mekatelyu", "Nicoya", "Oxcart", "Rich Coast", "San José", "Tica"];
							case "Croatian":
								return ["Ban", "Baška", "Branimir", "Croat", "Croatian", "Horn Armor", "Hrvatska", "Mountaineer", "Pavelić", "Split", "Starčević", "Tito", "Tuđman", "Ustaše", "Zagreb"];
							case "Cuban":
								return ["Batista", "Bay of Pigs", "Bayamo", "Blockade", "Camagüey", "Castro", "Cienfuegos", "Cigars", "Commie", "Cuban", "Gitmo", "Great Place", "Guantanamo", "Guevara", "Havana", "Martí", "Missile Crisis", "Santiago", "Scarface", "Trinidad"];
							case "Curaçaoan":
								return ["Antillean", "Arawak", "Caquetio", "Curaçaoan", "Divi-Divi", "Djucu", "Happy Field", "Healer", "Heart", "Mirage", "Papiamento", "Sint Michiel", "Stew Cat", "Willemstad"];
							case "Cypriot":
								return ["Atilla", "Ayia Napa", "Chalcopyrite", "Copper", "Cypress", "Cyprian", "Cypriot", "Dove", "Enosis", "Famagusta", "Greek", "Henna", "Larnaca", "Limassol", "Nicosia", "Olive Branch", "Taksim", "Turkish"];
							case "Czech":
								return ["Bohemian", "Bohunk", "Brno", "Čechie", "Czech", "Czechia", "Czechnya", "Czechoslovakia", "Double-Tailed Lion", "Hussite", "Kunda", "Masaryk", "Moravian", "Ostrava", "Prague", "Silesian", "Václav", "Velvet", "Wenceslaus"];
							case "Danish":
								return ["Aalborg", "Aarhus", "Border Forest", "Copenhagen", "Dane", "Danish", "Danske", "Jutland", "Ludertæve", "Odense", "Roskilde", "Schleswig", "Tøs", "Trelleborg", "Viking"];
							case "Djiboutian":
								return ["Adal", "Afar", "Ali Sabieh", "Aptidon", "Booty", "Djiboutian", "French Somaliland", "Handoga", "Ifat", "Issa", "Loyada", "Obock", "Pearl of the Gulf", "Punt", "Qat", "Tadjoura", "Tehuti"];
							case "Dominican":
								return ["Caribbean", "Cibao", "Domingo", "Dominican", "Hispaniola", "Merengue", "Ozama", "Palo", "Quisqueyana", "Samaná", "Santo Domingo", "Spanish Haiti", "Taíno", "Trinitaria", "Trujillo", "Yania Tierra"];
							case "Dominiquais":
								return ["Boiling Lake", "Domingo", "Dominican", "Dominiquais", "Kalinago", "Leeward", "Natural", "Portsmouth", "Red Dog", "Roseau", "Sisserou", "Sunday", "Tall Body"];
							case "Dutch":
								return ["Amsterdam", "Cheesehead", "Dutch Maiden", "Dutch", "Dutchie", "Fingered Dike", "Holland", "Klompendansen", "Netherlander", "Rotterdam", "Slaaf", "Slet", "The Hague", "Tulip", "Utrecht", "Windmill"];
							case "East Timorese":
								return ["27th Province", "Dare", "Dili", "East Timorese", "Eastern East", "Lifau", "Maubere", "Portuguese Timor", "Timor Leste", "Timorese"];
							case "Ecuadorian":
								return ["Cañari", "Cuenca", "Ecuadorian", "Equator", "Galápagos", "Glorious May", "Guayaquil", "Ingapirca", "Julian", "Latacunga", "Liberal", "Luz de América", "Machala", "Mama Negra", "New Granada", "Party Bus", "Portoviejo", "Quito", "Quitus", "Rondador", "Tomebamba"];
							case "Egyptian":
								return ["Aegean", "Al-Askar", "Alexandria", "Cairo", "Cleopatra", "Egyptian", "Fustat", "Giza", "Gypsy", "Kemet", "Luxor", "Memphis", "Misirlou", "Nasser", "Pharaoh", "Ptah", "Pyramid", "Sadat", "Sinai", "Sphinx", "Suez", "Thebes"];
							case "Emirati":
								return ["Abu Dhabi", "Ajman", "Bedouin", "Dubai", "Emir", "Emirati", "Emiri", "Emirian", "Fujairah", "Gulf Tiger", "Ras Al Khaimah", "Sharjah", "Trucial", "U.A.E.", "Umm Al Quwain"];
							case "Equatoguinean":
								return ["Annobón", "Bata", "Bioko", "Corisco", "Equatoguinean", "Equator", "Equatorial Guinean", "Fa d'Ambu", "Formosa", "Malabo", "Nguema", "Obiang", "Oyala", "Río Muni", "Spanish Guinea"];
							case "Eritrean":
								return ["Asmara", "Bahri Negash", "D'mt", "Dahlak", "Danakil", "Eritrean", "Ertra", "Hamasien", "Keren", "Massawa", "Medri Bahri", "Punt", "Quda", "Red Sea", "Tigrayan"];
							case "Estonian":
								return ["Aesti", "Baltic Tiger", "Baltic", "East", "Eesti", "Esthonian", "Estonian", "Oeselian", "Pulli", "Tallinn", "Tartu", "Terra Mariana", "Vistula", "Yestonian"];
							case "Ethiopian":
								return ["Abyssinian", "Addis Ababa", "Aksumite", "Axum", "Burnt Face", "Candace", "D'mot", "Dalllol", "Debre Berhan", "Derg", "Dire Dawa", "Ethiopian", "Gondar", "Ityopp'is", "Mengistu", "Oromo", "Rastafarian", "Selassie"];
							case "Fijian":
								return ["Feejee", "Fijian", "Itaukei", "Lautoka", "Levuka", "Look-Out", "Lutunasobasoba", "Nadi", "Nasinu", "Suva", "Vanua Levu", "Viti Levu"];
							case "Filipina":
								return ["Baguio", "Cebu", "Chavacano", "Dela Cruz", "Filipina", "Flip", "Manila", "Marcos", "Noble", "Nutshack", "Philip", "Philippine", "Pinay", "Pinoy", "Quezon", "River Dweller", "Rizal", "Ryan", "St. Lazarus", "Tagalog", "West Island"];
							case "Finnish":
								return ["China Swede", "Chukhna", "Espoo", "Finn", "Finnic", "Finnish Maiden", "Finnish", "Finnjävel", "Helsinki", "Hunter", "Kantele", "Mämmi", "Perkele", "Saunagirl", "Suomi", "Tampere", "Turku", "Vaasa", "Winter War"];
							case "French":
								return ["Baguette", "Belle", "Charlemagne", "Charlie Hebdo", "Clovis", "Crapaud", "De Gaulle", "Eiffel Tower", "Escargot", "Fille de Joie", "Français", "Frank", "French", "Frenchie", "Frog", "Gabacha", "Gaul", "Javelin", "L'Hexagone", "Lille", "Lyon", "Mademoiselle", "Marianne", "Marseille", "Napoleon", "Nice", "Paris", "Surrender Monkey", "Toulouse", "Vercingetorix", "Vichy"];
							case "French Guianan":
								return ["Cayenne", "French Guianan", "French Guianese", "Guiana Shield", "Île du Diable", "Kourou", "Saint-Laurent-du-Maroni", "Véronique"];
							case "French Polynesian":
								return ["Austral", "Faaa", "Fangataufa", "French Polynesian", "Gambier", "Mahina", "Marquesas", "Moruroa", "Papeete", "Polynesian", "Society", "Tahiti", "Tuamotu"];
							case "Gabonese":
								return ["Bongo", "Cloak", "Franceville", "Gabonais", "Gabonese", "Komo", "Libreville", "Orungu", "Port-Gentil"];
							case "Gambian":
								return ["Banjul", "Bathurst", "Brikama", "Fajara", "Gambian", "Gambo", "Jammeh", "Jawara", "Kaabu", "Senegambia", "Serekunda", "Trader"];
							case "Georgian":
								return ["Agricultural", "Batumi", "Colchis", "Georgian", "Golden Fleece", "Iberian", "Kartlis Deda", "Kartvelian", "Knight in Panther's Skin", "Kutaisi", "Mepe", "Mtskheta", "Tamar", "Tbilisi", "Wolf"];
							case "German":
								return ["Arminius", "Basic Law", "Battle Cry", "Bavarian", "Berlin", "Bonn", "Bratwurst", "Bremen", "Bundesadler", "Cabbage Eater", "Charlemagne", "Cologne", "Deutsche", "Dresden", "Düsseldorf", "Frankfurt", "Fraulein", "German", "Germania", "Hamburg", "Hannover", "Hanover", "Hitler", "Hun", "Jerry", "Kaiser", "Kraut", "Leipzig", "Mannheim", "Munich", "Nazi", "Nuremberg", "Oktoberfest", "Piefke", "Prussian", "Rhine-Ruhr", "Saupreiß", "Stuttgart", "Teuton", "Valkyrie", "Von Bismarck"];
							case "Ghanan":
								return ["Accra", "Akan", "Ashanti", "British Togoland", "Cape Coast", "Cold Chop", "Ghanan", "Gold Coast", "Kumasi", "Nkrumah", "Shaman Queen", "Warrior Queen"];
							case "Greek":
								return ["Athens", "Classical", "Debts", "Gift of Honor", "Greco", "Grecoman", "Greek", "Hellas", "Hellene", "Hellenic", "Ionian", "Kapodistrias", "Marble Column", "Mount Olympus", "Nafplio", "Old Woman", "Phoenix", "Sacrificer", "Spartan", "Thebes", "Thessaloniki", "Toga", "Venizelos"];
							case "Greenlandic":
								return ["Danish", "Erik the Red", "Eskimo", "Godthåb", "Greenlander", "Greenlandic", "Iceberg", "Inuit", "Kalaallit", "Nuuk", "Sisimiut"];
							case "Grenadian":
								return ["Carib", "Concepción", "Gouyave", "Grenada Dove", "Grenadian", "Mace", "Mayo", "Nutmeg", "Spices", "St. George's", "Urgent Fury", "Windward", "Woolie"];
							case "Guamanian":
								return ["51st State", "Arc Light", "Chamorro", "Dededo", "Guamanian", "Hagåtña", "Mangilao", "Military Base", "Tamuning"];
							case "Guatemalan":
								return ["Cabrera", "Carrera", "Chapín", "Forester", "Guatemalan", "Guatemalteca", "Many Trees", "Mayan", "Montt", "Quetzal", "Ubico"];
							case "Guinean":
								return ["Bauxite", "Burnt One", "Conakry", "Djenné", "French Guinea", "Futa Jallon", "Green Sea", "Guinean", "Market Woman", "Nzérékoré", "Southern River", "Timbo", "Toure"];
							case "Guyanese":
								return ["Berbice", "British Guiana", "Demerara", "Essequibo", "Flavor Aid", "Georgetown", "Guiana Shield", "Guyanese", "Hoatzin", "Jonestown", "Many Waters", "Soca"];
							case "Haitian":
								return ["Ayisyen", "Duvalier", "Earthquake", "Ezilí Dantor", "Gonaïves", "Haiti Lady", "Haitian", "Hispaniola", "Kadans", "Maîtresse", "Mama Doc", "Maman", "Mountainous", "Port-au-Prince", "Tortuga", "Voodoo"];
							case "Honduran":
								return ["Anchuria", "Catracha", "Comayagua", "Comayagüela", "Depths", "Higueras", "Honduran", "Punta", "San Pedro Sula", "Tegucigalpa", "Xatruch"];
							case "Hungarian":
								return ["Árpád", "Bozgor", "Budapest", "Czardas", "Debrecen", "Hun", "Hungarian", "Kádár", "Kossuth", "Lady of Hungaria", "Magyar", "Ogur", "Szent Korona", "Szuka", "Ten Arrows", "Tower of Babel", "Turul"];
							case "I-Kiribati":
								return ["Bairiki", "Betio", "Butaritari", "Gilbert", "I-Kiribati", "Kiribatian", "Tarawa", "Tungaru"];
							case "Icelandic":
								return ["Bessastaðir", "Fire and Ice", "Fjallkona", "Gyrfalcon", "Icelander", "Icelandic", "Kópavogur", "Lady of the Mountain", "Lagarfljótsormur", "Penis Museum", "Reykjavík", "Sagas", "Viking", "Þingvellir"];
							case "Indian":
								return ["Agra", "Ahmedabad", "Aligarh", "Allahabad", "Bangalore", "Bharat Mata", "Bharata", "Bhibhi", "Bhopal", "Bollywood", "Bombay", "Chennai", "Daulatabad", "Delhi", "Gandhi", "Hindi", "Hindu", "Howrah", "Hyderabad", "Indian", "Indus", "Jaipur", "Kanpur", "Kolkata", "Lucknow", "Mahatma", "Mumbai", "Nagpur", "Patna", "Pune", "Punjabi", "Raj", "Savita", "Sind", "Street Shitter", "Surat", "Taj Mahal", "Visakhapatnam"];
							case "Indonesian":
								return ["Bandung", "Dutch East Indies", "Emerald of the Equator", "Garuda", "Hindia-Belanda", "Ibu Pertiwi", "Indian", "Indies", "Indognesial", "Indon", "Indonesian", "Jakarta", "Java", "Komodo Dragon", "Malay", "Medan", "New Order", "Suharto", "Sukarno", "Sunda", "Surabaya", "Teak", "Yogyakarta"];
							case "Iranian":
								return ["Antioch", "Aryan", "Ayatollah", "Bukhara", "Ecbatana", "Farsi", "Free Noble", "Ghazni", "Iranian", "Iranic", "Isfahan", "Khamenei", "Majus", "Maragheh", "Mashhad", "Pasargadae", "Persepolis", "Persian", "Qazvin", "Sari", "Seleucia", "Shah", "Shiraz", "Susa", "Tabriz", "Tehran", "Zaranj", "Zirta"];
							case "Iraqi":
								return ["Assur", "Assyrian", "Babylon", "Babylonian", "Baghdad", "Basra", "Calah", "Euphrates", "Fallujah", "Fertile Crescent", "Hussein", "Iraqi", "Lowlander", "Mesopotamian", "Nineveh", "Oilfields", "Sumerian", "Tigris", "Uruk", "Whore of Babylon"];
							case "Irish":
								return ["Aisling", "British", "Carbomb", "Celtic Tiger", "Cork", "Culchie", "Dublin", "Eire", "Emerald", "Gaelic", "Hibernia", "I.R.A.", "Irish", "Irishwoman", "Jackeen", "Kilkenny", "Lassie", "Mick", "Paddy", "Potato Famine", "Riverdance", "Sinn Féin", "West", "Wintry"];
							case "Israeli":
								return ["Acre", "Eretz Yisrael", "Gibeah", "God's Chosen", "Haifa", "Hebrew", "Holy Land", "Hoopoe", "Israeli", "Israelite", "Jacob", "Jaffa", "Jerusalem", "Jew", "Levantine", "Little Satan", "Merchant", "Oven Dodger", "Palestinian", "Sharmuta", "Shekels", "Shiksa", "Srulik", "Struggle with God", "Tel Aviv", "Zio", "Zionist"];
							case "Italian":
								return ["Bologna", "Boot", "Eytie", "Florence", "Garibaldi", "Greaseball", "Italia Turrita", "Italian", "Latin", "Leaning Tower", "Mafia", "Milan", "Mussolini", "Naples", "Napoli", "Pasta", "Pizza", "Renaissance", "Roman", "Rome", "Salami", "Sicilian", "Spaghetti", "Terrone", "Turin", "Venice", "Wop", "Yearling"];
							case "Ivorian":
								return ["Abidjan", "Baoulé", "Bingerville", "Bouaké", "Five and Six Stripes", "Grand-Bassam", "Houphouët-Boigny", "Ivorian", "Ivory", "Licorne", "Quaqua", "Teeth Coast", "Tusk", "Windward", "Yamoussoukro"];
							case "Jamaican":
								return ["Ackee", "Arawak", "Cool Running", "Ganja", "Jamaican", "Jamdown", "Jamrock", "Kingston", "Kush", "Patois", "Port Royal", "Rasta", "Reggae", "Rock", "Spanish Town", "Springs", "West Indies", "Wood & Water", "Xaymaca", "Yardie"];
							case "Japanese":
								return ["Amaterasu", "Anime", "Banzai", "Bishoujo", "Carp", "Fukushima", "Geisha Girl", "Hello Kitty", "Hirohito", "Hiroshima", "Hokkaido", "Ichiban", "Jap", "Japanese", "Kamikaze", "Karate", "Kawaii", "Kawasaki", "Kyoto", "Kyushu", "Manga", "Nagano", "Nagasaki", "Nagoya", "Nip", "Nipponese", "Osaka", "Otaku", "Persimmon", "Rising Sun", "Sapporo", "Sushi", "Tempura", "Tokyo", "Wasabi", "Xiao Riben", "Yakuza", "Yamaha", "Yamato Nadeshiko", "Yellow Cab", "Yokohama"];
							case "Jordanian":
								return ["Ain Ghazal", "Al-Urdunn", "Amman", "Descent", "Edomite", "Hashemite", "Jordanian", "Mahanaim", "Mansaf", "Moab", "Oultrejordain", "Penuel", "Petra", "Transjordan", "Urdun", "Yarden", "Zarqa"];
							case "Kazakh":
								return ["Alma-Ata", "Almaty", "Astana", "Blue Hat", "Borat", "Dombra", "Kazakh", "Kazakhstani", "Khan", "Nazarbayev", "Nomad", "Qyzylorda", "Semey", "Tulpar"];
							case "Kenyan":
								return ["British East Africa", "Kenyan", "Kirinyaga", "Man-Eater", "Mau Mau", "Mombasa", "Nairobi", "Nyatiti", "Obama", "Ostrich", "Safari", "Swahili", "Tsavo", "Wanjiku"];
							case "Kittitian":
								return ["Basseterre", "Charlestown", "Christopher", "Culturama", "Kittitian", "Kitty", "Lady of the Snows", "Leeward", "Liamuiga", "Nevis", "Nevisian"];
							case "Korean":
								return ["Busan", "Chollima", "Daejeon", "Dokdo", "Gangnam", "Goyang", "Hamhung", "Hermit Queen", "Incheon", "Jeju", "K-Pop", "Kimchi", "Korean", "Lofty", "Morning Calm", "Nida", "Pyongyang", "Rocket Woman", "Samsung", "Seoul"];
							case "Kosovan":
								return ["Blackbird", "Dardania", "Kosovan", "Kosovar", "Kosovo Maiden", "Metohija", "Pristina", "Prizren", "Serbian", "Thrush", "Ulpiana"];
							case "Kurdish":
								return ["Ararat", "Hawler", "Iraqi", "Kurd", "Kurdish", "Kurdistani", "Mahabad", "Rojava", "Syrian", "Turkish", "Zaza"];
							case "Kuwaiti":
								return ["Al Jahra", "Bani Utub", "Burgan", "Failaka", "Fortress", "Gulf War", "Hollywood of the Gulf", "Kadhima", "Kuwaiti", "Sabah", "Souk Al-Manakh"];
							case "Kyrgyz":
								return ["Bishkek", "Forty", "Frunze", "Kirghizia", "Kyrgyz", "Kyrgyzstani", "Manas", "Osh", "Pishpek", "Tulip", "Urkun"];
							case "Laotian":
								return ["Frangipani", "Indochina", "Lan Xang", "Lao", "Laotian", "Lava", "Luang Prabang", "Million Elephants", "Muang Khoun", "Muang Lao", "Pakxe", "Pathet Lao", "Vientiane"];
							case "Latvian":
								return ["Baltic Tiger", "Blue Lake", "Daugavpils", "Jelgava", "Latgalian", "Latvian", "Lett", "Liepaja", "Livonia", "Riga", "Singing", "Ulmanis"];
							case "Lebanese":
								return ["Abu Abed", "Beirut", "Byblos", "Canaanite", "Cedar", "Druze", "Hezbollah", "Lebanese", "Lebo", "Maronite", "Phoenician", "Snow-Capped"];
							case "Liberian":
								return ["American Colonial", "Free", "Gbarnga", "Grain Coast", "Harper", "Kreyol", "Kru", "Liberian", "Liberty", "Maryland", "Mississippi-in-Africa", "Monrovia", "Pepper Coast", "Taylor"];
							case "Libyan":
								return ["Awjila", "Benghazi", "Cyrene", "Gaddafi", "Jamahiriya", "Libu", "Libyan", "Mukhtar", "Silphium", "Sirte", "Tobruk", "Tripoli", "Zenga Zenga"];
							case "a Liechtensteiner":
								return ["Alpine", "Austrian", "Gutenberg", "Liechtensteiner", "Light Stone", "Principal", "Rhine", "Schaan", "Schellenberg", "Vaduz"];
							case "Lithuanian":
								return ["Amber", "Baltic Tiger", "Kaunas", "Kernavė", "Klaipėda", "Labas", "Leitis", "Lietuva", "Lithuanian", "Lugan", "Memel", "Mindaugas", "Pagan", "Rainy", "Unity", "Vilnus", "White Stork"];
							case "Luxembourgian":
								return ["Ardennes", "Bureaucrat", "Esch-sur-Alzette", "Gëlle Fra", "Goldcrest", "Grand Duchess", "Little Castle", "Lucilinburhuc", "Luxembourger", "Luxembourgian", "Luxembourgish", "Passerelle"];
							case "Macedonian":
								return ["Bitola", "Greek", "Highlander", "Macedon", "Macedonian", "Macedonist", "Ohrid", "Oro", "Paeonia", "Sarissa", "Serboman", "Skopianoi", "Skopje", "Stobi", "Tall One", "Yugoslav"];
							case "Malagasy":
								return ["Antananarivo", "Baobab", "Fossa", "Great Red", "Hiragasy", "Imerina", "Lemur", "Madagascan", "Madagasikara", "Malagasy", "Mogadishu", "Ranavalona", "São Lourenço", "Toamasina", "Vazimba", "Zebu"];
							case "Malawian":
								return ["Banda", "Blantyre", "Bororo", "Fire Water", "Flames", "Lilongwe", "Malawian", "Maravi", "Mzuzu", "Nyasaland", "Warm Heart of Africa", "Zomba"];
							case "Malaysian":
								return ["Durian", "George Town", "Jakun", "Jementah", "Kuala Lumpur", "Malay Girl", "Malaya", "Malaysian", "Malingsia", "Malon", "Manglish", "Pirate", "Putrajaya", "Selangor", "Subang Jaya", "Zapin"];
							case "Maldivian":
								return ["Addu", "Dhivehi", "Dhoni", "Dibajat", "Garland", "Gayoom", "Hithadhoo", "Mahiladiva", "Maldive", "Maldivian", "Malé", "Necklace", "Suvadive"];
							case "Malian":
								return ["Azawad", "Bamako", "Djenné", "French Sudan", "Hippopotamus", "Malian", "Mandinka", "Mansa Musa", "Sahel", "Sikasso", "Timbuktu", "Trans-Sahara", "Tuareg"];
							case "Maltese":
								return ["Birkirkara", "George Cross", "Għargħar", "Maltese Falcon", "Maltese", "Melita", "Mosta", "Pharaoh Hound", "Valletta"];
							case "Marshallese":
								return ["Bikini Atoll", "Ebeye", "Enewetak", "Leroij", "Majuro", "Marshall", "Marshallese", "Rita", "Stick Chart"];
							case "Mauritanian":
								return ["Akjoujt", "Arguin", "Coppolani", "Daddah", "Honorable Gift", "Imraguen", "Mauri", "Mauritanian", "Moor", "Nouadhibou", "Nouakchott", "Tamkartkart"];
							case "Mauritian":
								return ["Chagos", "Cirne", "Dina Arobi", "Dodo", "Isle de France", "Mascarene", "Maurice", "Mauritian", "Moris", "Morisien", "Port Louis", "Star and Key"];
							case "Mexican":
								return ["Acapulco", "Ahuehuete", "Alegoría de la Patria Mexicana", "Azteca", "Beaner", "Burrito", "Cartel", "China Poblana", "Chiquita", "Fence Hopper", "Guadalajara", "Hat Dance", "Headless", "Juarez", "Malinche", "Mamacita", "Mexica", "Mexican", "Monterrey", "Pelada", "Senorita", "Sinaloa", "Sunny", "Taco", "Tijuana", "Veracruz", "Wetback"];
							case "Micronesian":
								return ["Caroline", "Chuuk", "F.S.M.", "Hailstone", "Kolonia", "Kosrae", "Micronesian", "Nan Madol", "Ngatikese", "Palikir", "Pohnpei", "Truk", "Weno", "Yap"];
							case "Moldovan":
								return ["Aurochs", "Bălți", "Bessarabia", "Chișinău", "Dragoș", "Molda", "Moldavia", "Moldovan", "Tiraspol", "Voivode", "Wallachia"];
							case "Monégasque":
								return ["Grace Kelly", "Grimaldi", "Hercules", "Liguria", "Monacan", "Monégasque", "Monte Carlo", "Single House"];
							case "Mongolian":
								return ["Biyelgee", "Blue Sky", "Death Worm", "Genghis Khan", "Hun", "Mong", "Mongol", "Mongolian", "Mongoloid", "Tulpar", "Ulaanbaatar", "Yumjaagiin"];
							case "Montenegrin":
								return ["Black Mountain", "Cetinje", "Crna Gora", "Fairy of Lovćen", "Montenegrin", "Mother Montenegro", "Nikšić", "Podgorica"];
							case "Moroccan":
								return ["Agadir", "Barbary Lion", "Berber", "Casablanca", "Ceuta", "Fez", "Maghreb", "Marrakesh", "Meknes", "Melilla", "Moor", "Moroccan", "Oujda", "Rabat", "Tangier", "Walili", "Western Queen"];
							case "Mosotho":
								return ["Basotho", "Basutoland", "Butha-Buthe", "Lesothan", "Lesotho Promise", "Maseru", "Moshoeshoe", "Mosotho", "Queen in the Sky", "San", "Sesotho", "Teyateyaneng"];
							case "Motswana":
								return ["Bechuanaland", "Botswanan", "Equal", "Francistown", "Gaborone", "Jameson", "Kalahari", "Khama", "Mafeking", "Motswana", "Sedudu", "Tswana"];
							case "Mozambican":
								return ["Beira", "Chibuene", "Gaza", "Lourenço Marques", "Machel", "Maputo", "Matola", "Mozambican", "Mussa Bin Bique", "Tufo"];
							case "Namibian":
								return ["Brave", "Caprivi", "Herero", "Namaqua", "Namib", "Namibian", "Nothingness", "Otjimbingwe", "Rundu", "Shark Island", "Vastness", "Von Trotha", "Walvis Bay", "Windhoek"];
							case "Nauruan":
								return ["Beachgoer", "Buada", "Denigomudu", "Meneng", "Nauruan", "Nawodo", "Onawero", "Phosphate", "Pleasant Island", "Yaren"];
							case "Nepalese":
								return ["Cattle Herder", "Danphe", "Everest", "K2", "Kathmandu", "Kumari", "Nep", "Nepalese", "Nepali", "Newa", "Pashupati", "Pokhara", "Rhododendron", "Sagarmatha", "Sherpa"];
							case "New Caledonian":
								return ["Belep", "Caillou", "Caldoche", "Chesterfield", "Cutter", "Grande Terre", "Granite", "Kanak", "Loyalty", "New Caledonian", "Nickel", "Nouméa", "Ouvéa", "Pine", "Sandalwood", "Tayo"];
							case "a New Zealander":
								return ["All-Black", "Auckland", "Haka", "Hobbit", "Kiwi", "Kiwifruit", "Long White Cloud", "New Zealander", "Sheep Shagger", "Wellington", "Zealandia"];
							case "Ni-Vanuatu":
								return ["Bislama", "Cargo Cult", "Espiritu Santo", "Great Cyclade", "Jane Frum", "Luganville", "Mobile Force", "New Hebride", "Ni-Vanuatu", "Port Vila", "Vanuatuan"];
							case "Nicaraguan":
								return ["By the Water", "Contra", "Granada", "Guardabarranco", "Lakes and Volcanoes", "León", "Managua", "Mosquito", "Nica", "Nicaraguan", "Nicarao", "Nicotine Water", "Pinolera", "Sandinista", "Somoza"];
							case "Nigerian":
								return ["Abuja", "Babangida", "Biafra", "Calabar", "Giant of Africa", "Igbo-Ukwu", "Kano", "Kukawa", "Kwara", "Lagos", "Naija", "Ngazargamu", "Niger Delta", "Nigerian", "Nok", "Obasanjo", "Ogoniland", "Onitsha", "Scammer", "Scrabble"];
							case "Nigerien":
								return ["Agadez", "Flowing Water", "Kaocen", "Kountché", "Niamey", "Nigerien", "Nigérienne", "Sarraounia", "Songhai", "Tenere", "Zinder"];
							case "Niuean":
								return ["Alofi", "Coconut", "Hakupu", "Niuean", "Patu-Iki", "Peniamina", "Rock of Polynesia", "Savage", "The Rock"];
							case "Norwegian":
								return ["Bergen", "Black Metal", "Fjord", "Hallingdans", "Kuksuger", "Lillehammer", "Ludder", "Midnight Sun", "Norse", "Norsk", "Northern Way", "Northwoman", "Norwegian", "Oil Hog", "Ola", "Oslo", "Troll", "Trondheim", "Viking"];
							case "Omani":
								return ["Al Ayn", "Al Batinah", "Al-Bar'ah", "Dhofar", "Empty Quarter", "Ibadi", "Ibadite", "Khanjar", "Muscat", "Omani", "Said", "Salalah", "Seeb", "Suhar"];
							case "Pakistani":
								return ["Deodar", "Faisalabad", "Indus", "Islamabad", "Karachi", "Lahore", "Markhor", "Now or Never", "Pak", "Paki", "Pakistani", "PAKSTAN", "Pure"];
							case "Palauan":
								return ["Airai", "Belau", "Enchanted", "Indirect Reply", "Koror", "Ngerulmud", "Palaos", "Palauan", "Peleliu", "Pelew", "Trinidad", "Ulong"];
							case "Palestinian":
								return ["Dabke", "Gaza", "Hamas", "Hebron", "Intifada", "Israeli", "Jerusalem", "Palestinian", "Pallywood", "Philistine", "Ramallah", "River to Sea", "Samaria", "Shechem", "Tirzah", "West Bank"];
							case "Panamanian":
								return ["Balboa", "Butterfly", "Caledonia", "Canalera", "Colón", "Harpy Eagle", "Istmeña", "Many Fish", "New Granada", "Noriega", "Pana", "Panama Canal", "Panamanian", "Tamborito", "Zonian"];
							case "Papua New Guinean":
								return ["Black", "Bougainville", "Dugong", "Lae", "P.N.G.", "Papua New Guinean", "Papua", "Port Moresby", "Sing-Sing", "Sweet Potato", "Tok Pisin", "Unserdeutsch"];
							case "Paraguayan":
								return ["Asunción", "Ciudad del Este", "Crown River", "Guaraní", "Heart of South America", "Lapacho", "Paraguayan", "River Water", "Stroessner", "Stronato"];
							case "Peruvian":
								return ["Arequipa", "Beru", "Cain de Latinoamérica", "Cusco", "Incan", "Lima", "Lorcha", "Madre Patria", "Marinera", "Perucha", "Peruvian", "Trujillo", "Zampoña"];
							case "Polish":
								return ["Hussar", "Katowice", "Kraków", "Kurwa", "Łódź", "Lublin", "Polack", "Polan", "Polandball", "Pole", "Polish", "Polonia", "Polski", "Pshek", "Virgin Soil", "Warsaw"];
							case "Portuguese":
								return ["Braga", "Bunda", "Carnation", "Estado Novo", "Lisbon", "Lusitania", "Óbidos", "Patuleia", "Portagee", "Porto", "Portuguese", "Tuga", "Vira"];
							case "Puerto Rican":
								return ["51st State", "Bayamón", "Boricua", "Borinquen", "Nuyorican", "P.R.", "Ponce", "Porto Rican", "Puerto Rican", "Puertorriqueña", "San Juan", "West Side Story"];
							case "Qatari":
								return ["Al Da'asa", "Al Jazeera", "Al Khor", "Al Rayyan", "Al Wajbah", "Ardah", "Cadara", "Catara", "Catharrei", "Cutter", "Doha", "Qatari", "Thani", "Zubarah"];
							case "Romanian":
								return ["Bucharest", "Ceaușescu", "Cluj-Napoca", "Constanța", "Dacian", "Dracula", "Gypsy", "Impaler", "Lynx", "Orphan", "Roma", "Roman", "România", "Romanian", "Transylvanian", "Vlad", "Wallachia"];
							case "Russian":
								return ["Bolshevik", "Cabbage Eater", "Commie", "Double-Headed Eagle", "Kacap", "Katsap", "Mafiya", "Mail Order", "Moscow", "Moskal", "Omsk", "Red Banner", "Rosuke", "Russian", "Russkie", "Saint Petersburg", "Shlyukha", "Siberian Kitten", "Sickle & Hammer", "Slav", "Soviet", "Stalin", "Suchka", "Suka", "Tovarish", "Tsar", "Tsaritsa", "Ulyanovsk", "Vodka", "Yekaterinburg"];
							case "Rwandan":
								return ["Expanded", "Habyarimana", "Hotel Rwanda", "Hutu", "Kigali", "Leopard", "Muhanga", "Ruanda", "Rwandan", "Rwandese", "Thousand Hills", "Tutsi"];
							case "Sahrawi":
								return ["Abdelaziz", "Berm", "Bir Lehlou", "Dakhla", "El-Aaiún", "Free Zone", "Laayoune", "Moroccan", "Polisario", "Sahraouian", "Sahrawi", "Sahrawian", "Spanish Sahara", "Tifariti", "Western Saharan"];
							case "Saint Lucian":
								return ["Brigand", "Castries", "Gros Islet", "Helen of the West Indies", "Kwadril", "Lucia", "Lucy of Syracuse", "Saint Lucian", "Windward"];
							case "Salvadoran":
								return ["Cuzcatlan", "Diamond", "Duarte", "Guanaca", "Indigo", "Izalco", "Maquilishuat", "Salvadoran", "Salvadoreña", "San Miguel", "San Salvador", "Savior", "Tomayate", "Xuc"];
							case "Sammarinese":
								return ["Apennine", "Dogana", "Garage", "Monte Titano", "Most Serene", "Saint Marinus", "Sammarinese", "San Marinese", "Serravalle", "Three Towers"];
							case "Samoan":
								return ["Apia", "Baumann", "Holy Center", "Mau", "Moa", "Nafanua", "Navigator", "Nu'uuli", "Pago Pago", "Samoan", "Savai'i", "Tafuna", "Taualuga", "Tupu", "Upolu", "Vaitele", "Wrestler"];
							case "São Toméan":
								return ["Cocoa", "Elmina", "Forro", "Prince's Islander", "Príncipe", "Roças", "Saint Anthony", "Saint Thomas", "Santomean", "São Tomé", "São Toméan"];
							case "Saudi":
								return ["Al Qaeda", "Burqa", "Constellation", "Diriyah", "Jeddah", "Mecca", "Medina", "Osama", "Riyadh", "Sandy", "Saud", "Saudi Arabian", "Saudi", "Zamzam"];
							case "Scottish":
								return ["Aberdeen", "Bagpipes", "Braveheart", "British", "Edinburgh", "Gaelic", "Glasgow", "Hadrian", "Haggis", "Jock", "Lass", "Ned", "Nessie", "Pict", "Scot", "Scotswoman", "Scottish", "Teuchter", "Unicorn"];
							case "Senegalese":
								return ["Balafon", "Baobab", "Casamance", "Dakar", "Gorée", "Kora", "Mbalax", "Our Boat", "Pirogue", "Roge Sene", "Senegalese", "Wolof", "Zenata"];
							case "Serbian":
								return ["Belgrade", "Kolo", "Picka", "Plum", "Rascia", "Remove Kebab", "Serb", "Serbian", "Shkije", "Starčevo", "Triballi", "Vinča", "Vlach", "White Eagle"];
							case "Seychellois":
								return ["Angela", "Blooming Flower", "Mahé", "René", "Seabird", "Séchelles", "Seselwa", "Seychellois", "Victoria"];
							case "Sierra Leonean":
								return ["Blood Diamond", "Cuffee", "Freetown", "Friendly", "Hut Tax", "Krio", "Mountain Lioness", "Serra Lyoa", "Sierra Leonean", "Sierra"];
							case "Singaporean":
								return ["Bedok", "City Lioness", "Durian", "Gardener", "Little Red Dot", "Merlion", "Pulau Ujong", "Raffles", "Sabana", "Singaporean", "Singlish", "Temasek", "Tumasik"];
							case "Slovak":
								return ["Bratislava", "Bzdocha", "Czechoslovakia", "Shahrisabz", "Shlapka", "Slav", "Slovak", "Slovakian", "Slovensko", "Tatra Tiger", "Tiso", "Tuka", "Velvet"];
							case "Slovene":
								return ["Carantanian", "Carinthian", "Hayrack", "Ljubljana", "Prince's Stone", "Slav", "Slovene", "Slovenian", "Stara Pravda"];
							case "a Solomon Islander":
								return ["Guadalcanal", "Helpem Fren", "Honiara", "Lavinia", "Ophir", "Pijin", "Sandfly", "Solomon Islander", "Solomon", "Young Dick"];
							case "Somali":
								return ["Barre", "Black Hawk Down", "Cattle Herder", "Dhaanto", "Laas Geel", "Mogadishu", "Pirate", "Samaale", "Skinnie", "Somali", "Somalian", "The Captain Now", "Zeila"];
							case "South African":
								return ["Afrikaner", "Apartheid", "Azania", "Bloemfontein", "Boer", "Cape Town", "Durban", "Ekurhuleni", "Johannesburg", "Mandela", "Mzansi", "Port Elizabeth", "Pretoria", "Rainbow", "Rand", "Saffer", "Shaka", "Sharpeville", "South African", "Soweto", "Springbok", "Vuvuzela"];
							case "South Sudanese":
								return ["Anyanya", "Fashoda", "Juba", "Mountain Sea", "Nilotic", "Nuba", "Referendum", "South Kordofan", "South Sudanese", "Sudd", "Yei"];
							case "Spanish":
								return ["Barcelona", "Castellana", "Castilian", "Español", "Flamenco", "Franco", "Gallega", "Hyrax", "Iberian", "Jamon", "Madrid", "Monja", "Peninsular", "Senora", "Siesta", "Spaniard", "Spanish", "Toreadora", "Xarnega"];
							case "Sri Lankan":
								return ["Anuradhapura", "Ceylon", "Colombo", "Golden", "Hela", "Holy", "Kandy", "Kotte", "Lanka", "Polonnaruwa", "Rawana", "Sri Lankan", "Tamil"];
							case "Sudanese":
								return ["Black", "Darfur", "Gordon's Revenge", "Khartoum", "Kushite", "Mahdist", "North Sudanese", "Nubian", "Omdurman", "Sennar", "Sudanese"];
							case "Surinamese":
								return ["Bouterse", "Dutch Guiana", "Guiana Shield", "Kaseko", "Lelydorp", "Mama Sranan", "Paramaribo", "Sranan Tongo", "Surinam", "Surinamer", "Surinamese", "Surinen"];
							case "Swazi":
								return ["Eswatini", "Incwala", "Lobamba", "Manzini", "Mbabane", "Mswati", "Ngwane", "Swati", "Swazi", "Swazilander", "Umhlanga"];
							case "Swedish":
								return ["Gothenburg", "Ikea", "Mother Svea", "Norse", "One's Own", "Stockholm", "Swede", "Sweden Yes", "Swedish"];
							case "Swiss":
								return ["Alpine", "Banker", "Basel", "Bern", "Geneva", "Helvetia", "Lausanne", "Neutral", "Numbered Account", "Schlampe", "Sonderbund", "Swabian", "Swiss Miss", "Swiss", "Zürich"];
							case "Syrian":
								return ["Aleppo", "Assad", "Dabke", "Damascus", "Eblan", "Hermon", "Homs", "Rojava", "Syriac", "Syrian", "Tahrir al-Sham", "Umayyad"];
							case "Taiwanese":
								return ["Chiang", "Chinese", "Formosa", "Kaohsiung", "Kuomintang", "Liuqiu", "Middag", "Penghu", "Taichung", "Tainan", "Taipei", "Taiwanese", "Terraced", "Zeelandia"];
							case "Tajik":
								return ["Aluminum", "Dehgān", "Dushanbe", "Fārsīwān", "Khujand", "Persian Tiger", "Rahmon", "Remittances", "Sarazm", "Sogdiana", "Tajik", "Tajikistani"];
							case "Tanzanian":
								return ["Black Coast", "Dar es Salaam", "Dodoma", "Flat Island", "Joined Waters", "Maji Maji", "Tanganyika", "Tanzanian", "Tanzanite", "Tippu Tip", "Wilderness", "Zanzibar"];
							case "Thai":
								return ["Ayutthaya", "Bangcock", "Bangkok", "Freedom", "Ladyboy", "Pattaya", "Phaya Naga", "Phra Siam Devadhiraj", "Rachapruek", "Royal Domain", "Siamese", "Smiley", "T-Girl", "Thai"];
							case "Tibetan":
								return ["Buddhist", "Chamdo", "Chinese", "Chomolungma", "Dalai Lama", "Everest", "Himalayan", "Lhasa", "Monk", "Nagqu", "Nyingchi", "Shannan", "Shigatse", "Tibetan", "Tibetian", "Xizang", "Yarlung"];
							case "Togolese":
								return ["Aného", "Behind the Sea", "By the Water", "Eyadéma", "Gnassingbé", "Lagoon", "Lomé", "Sokodé", "Togo Stick", "Togoland", "Togolese", "Togoville"];
							case "Tongan":
								return ["Eendracht", "Friendly", "Lakalaka", "Neiafu", "Nuku'alofa", "Nukuleka", "Southern", "Tongan", "Tongatapu", "Tu'i Tonga"];
							case "Trinidadian":
								return ["Chaguanas", "Flying Fish", "Holy Trinity", "Hummingbird", "Iere", "Limbo", "Port of Spain", "San Fernando", "Tobacco", "Tobago", "Tobagonian", "Trinbagonian", "Trini", "Trinidad", "Trinidadian"];
							case "Tunisian":
								return ["Arab Spring", "Barbary", "Bourguiba", "Capsa", "Carthaginian", "Ifriqiya", "Punic", "Resting", "Sfax", "Tanith", "Tunis", "Tunisian"];
							case "Turkish":
								return ["Ankara", "Bursa", "Constantinople", "Created", "Erdoğan", "Harem", "Harran", "Istanbul", "Izmir", "Kanake", "Kebab", "Ottoman", "Turk", "Turkette", "Turkish", "Turksmell", "Young Turk"];
							case "Turkmen":
								return ["Almost Turk", "Ashgabat", "Iman", "Karakum", "Kyushtdepdi", "Merv", "Niyazov", "Pure Turk", "Turkmen", "Türkmenabat", "Turkmenistani"];
							case "Tuvaluan":
								return ["Asau", "Curacoa", "Eight", "Ellice", "Funafuti", "Gran Cocal", "Mendaña", "Nui", "Tuvaluan"];
							case "Ugandan":
								return ["Amin", "Buganda", "Bundle", "Bushbaby", "Cannibal", "Gulu", "Kampala", "Kony", "Museveni", "Omukama", "Uganda Martyr", "Ugandan"];
							case "Ukrainian":
								return ["Bandera", "Borderland", "Chernobyl", "Chiki Briki", "Cossack", "Crimea", "Donbass", "Donetsk", "Euromaidan", "Hohlina", "Hohlushka", "Hopak", "Kharkiv", "Khokhol", "Kiev", "Kyiv", "Mamay", "Radioactive", "Salo", "Shlyukha", "Stalker", "Suchka", "Suka", "Svoboda", "Uke", "Ukrainian", "Ukrop", "Viburnum"];
							case "Uruguayan":
								return ["Bird-River", "Blanca", "Bordaberry", "Charrúa", "Ciudad de la Costa", "Colorada", "Garra Charrúa", "Maldonado", "Montevideo", "Oriental", "Shellfish", "Terra", "Tupamaro", "Uruguayan"];
							case "Uzbek":
								return ["Bukhara", "Free", "Namangan", "Samarkand", "Shahrisabz", "Silk Road", "Steppe Princess", "Steppe Queen", "Tashkent", "Timur", "Ubeki-beki", "Uzbek", "Uzbekistani"];
							case "Vatican":
								return ["Altar Girl", "Catholic", "Crusader", "Deus Vult", "Holy See", "Italian", "Lateran", "Nun", "Papal", "Pontifical", "Pope Joan", "Prophet", "Roman", "Sistine", "Swiss Guard", "Vatican"];
							case "Venezuelan":
								return ["Araguaney", "Bolívar", "Caracas", "Chavista", "Chola", "Grace", "Joropo", "Little Venice", "Maracaibo", "New Granada", "Revolutionary", "Socialist", "Valencia", "Venezuelan", "Vuvuzela"];
							case "Vietnamese":
								return ["Charlie", "Da Nang", "Hanoi", "Ho Chi", "Indochina", "Me Love You Long Time", "Me So Horny", "Mỹ Lai", "Saigon", "V.C.", "Victor Charlie", "Viet Cong", "Viet", "Vietnamese", "Yuon"];
							case "Vincentian":
								return ["Barrouallie", "Carib War", "Grenadine", "Hairouna", "Kingstown", "Soufrière", "Vincent", "Vincentian", "Vincy", "Windward", "Youloumain"];
							case "Yemeni":
								return ["Aden", "Al-Bar'ah", "Arabia Felix", "Felicity", "Himyarite", "Houthi", "Khat", "Minaean", "Queen of the Desert", "Red Sea Pirate", "Sana'a", "Sheba", "Yemeni", "Yemenite"];
							case "Zairian":
								return ["Authenticité", "Belgian Congo", "Boma", "Bongo", "Congolese", "Diamond", "Ebola", "Katanga", "Kinshasa", "Leopold", "Léopoldville", "Lubumbashi", "Okapi", "Rubber Farm", "South Kasai", "Zairean", "Zairian"];
							case "Zambian":
								return ["Broken Hill", "Copperbelt", "Grand River", "Kabwe", "Kafue", "Kalambo", "Kaunda", "Kitwe", "Livingstone", "Lusaka", "Northern Rhodesia", "Victoria Falls", "Zambezi", "Zambian"];
							case "Zimbabwean":
								if (slave.race === "white") {
									return ["Altena", "Bush War", "Colonizer", "Mabuno", "Minority Rule", "Rhodesian", "Rhodie", "Salisbury", "Southern Rhodesia", "Zimbabwean"];
								} else {
									return ["Bobojan", "Bulawayo", "Chimurenga", "Grimmy", "Harare", "Kaffir", "Mugabe", "Mujiba", "Nyombie", "Stone House", "Zimbabwean", "Zimbo"];
								}
							default:
								return ["Alien", "Hobo", "Homeless", "Immigrant", "International", "Nomad", "Refugee", "Stateless", "Wanderer"];
						}
					},
					situationDesc: `is ${slave.nationality}. The slave trade is truly international, and no nation is unrepresented among the masses of sex slaves passed from hand to hand like the chattel they are. Most of the old nations are struggling, and even those still in great shape often find their citizens emigrating to the Free Cities. Some of these émigrés do well, and others become human livestock.`,
					applyDesc: `is a little proud of ${his} national nickname, as a reminder of who ${he} was and a mark that ${he} still has an identity.`,
					notApplyDesc: `realizes that ${his} new identity is truly stateless. In the Free Cities, it does not matter where a slave is from, so long as that slave has value. All slaves belong to the singular nation of the owned, the subordinated, the fucked.`
				});
		}
		if (V.seeRace === 1) {
			switch (slave.race) {
				case "amerindian":
					nickMap.set("amerindian", {
						nicknameArray: ["Aborigine", "Amerindian", "Casino", "Chug", "Deerskin", "Dreamcatcher", "Eskimo Sister", "Eskimo", "Firewater", "First Nations", "Indian Giver", "Indian", "Indigenous", "Indio", "Injun", "Ke-mo Sah-bee", "Malinche", "Métis Mother", "Moccasins", "Native", "Nitchie", "Peace Pipe", "Pocahontas", "Pole Smoker", "Powwow", "Prairie Nigger", "Red", "Redskin", "Reservation", "Savage", "Scalper", "Smoke Signal", "Spirit Animal", "Squaw", "Tiger Lily", "Timber Nigger", "Tipi Warmer", "Tonto", "Totem Pole", "Tribal", "Warpath", "Wigwam"],
						situationDesc: `is amerindian, which is not uncommon given the poverty that still plagues those long-suffering peoples. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "asian":
					nickMap.set("asian", {
						nicknameArray: ["3DPD", "Almond", "Asian", "Bamboo", "Charlie", "Chinese", "Ching Chong", "Chink", "Chopsticks", "Coolie", "Dink", "Dragon Lady", "E-Sports", "Fortune Cookie", "Fu Manchu", "Gook", "Heathen Chinee", "Jade Empress", "Manila", "Me Love You Long Time", "Me So Horny", "Oriental", "Pancake Face", "Pinoy", "Sideways", "Slant", "Slanteye", "Slope", "Squint", "Thaigirl", "Ting Tong", "Tokyo", "Waifu", "Yellow Fever", "Yellow Peril", "Yellow", "Zip"],
						situationDesc: `is asian, which is not uncommon given the huge population of Asia and the poverty of many countries there. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`
					});
					break;
				case "black":
					nickMap.set("black", {
						nicknameArray: ["African", "Afro", "Aunt Jemima", "B-Girl", "Basketball", "Black", "Blackass", "Blacked", "Blackie", "Bottom Bitch", "Burrhead", "Cocoa", "Coon", "Cotton", "Dark", "Darky", "Ebony", "Gangsta", "Ghetto", "His Girl Friday", "House Slave", "Jungle Bunny", "Jungle Fever", "Mammy", "Miss", "Missie", "Mulatto", "Mulignan", "N-Word", "Negro", "Negroid", "Never Go Back", "Nigga", "Nigger", "Porch Monkey", "Projects", "Quadroon", "Queen", "Rapper", "Sambo", "Sheboon", "Spade", "Spear Chucker", "Spook", "Uncle Tom", "Welfare Queen"],
						situationDesc: `is black, which is not uncommon given the urban collapse afflicting the first world and the wars raging in Africa. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "indo-aryan":
					nickMap.set("indo-aryan", {
						nicknameArray: ["Apu", "Aryan", "Babu", "Bhabhi", "Bindi", "Bollywood", "Brown", "Chakra", "Chandala", "Curry Muncher", "Desi", "Dot", "Dothead", "Durga", "Gyp", "Gypsy", "Hajji", "Hare Krishna", "Hindu", "Indian", "Indo-Aryan", "Indo", "Kali Maa", "Kama Sutra", "Kaur", "Mughal", "Offshore", "Paki", "Rajah", "Sati", "Sepoy", "Shanti", "Shopkeep", "Sikh", "Sim Sim Salabim", "Snake Charmer", "Subcontinental", "Swami", "Tigress", "Untouchable", "Yoga", "Zoroastrian", "Zott"],
						situationDesc: `is indo-aryan, which is not uncommon given the poverty in many majority indo-aryan countries, and the near-submersion of some others due to rising sea levels. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "latina":
					nickMap.set("latina", {
						nicknameArray: ["Adorada", "Arriba", "Banana Republic", "Bandita", "Barrio", "Beaner", "Brown", "Brownie", "Café", "Cartel", "Chica", "Chiquita", "Chola", "Coca", "Cuzinho", "Facil", "Fiery", "Fiesta", "Greaseball", "Greaser", "Hat Dance", "Hispanic", "Latin", "Latina", "Malinche", "Mamacita", "Mestiza", "Mexicali", "One Peso", "Piñata", "Rio Grande", "Salsa", "Señora", "Señorita", "Shakira", "Siesta", "South of the Border", "Spanish", "Spic", "Spicy", "Tacohead", "Tequila", "Wetback", "Yeyo"],
						situationDesc: `is latina, which is not uncommon given the poor state of many Central and South American countries and the long diaspora of poor natives of those areas. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "malay":
					nickMap.set("malay", {
						nicknameArray: ["Asian Nigger", "Austronesian", "Bumi", "Bumiputera", "Cinnamon", "Durian", "East Indies", "Flip-Flop", "Flying Fish", "Huan-a", "Indon", "Island Hopper", "Islander", "Jakun", "Keling", "Krakatoa", "Kunlun", "Lazy Day", "Madrasa", "Malay", "Malaysian", "Malingsia", "Malon", "Melayu", "Mesoindian", "My Lay", "Nāga", "Nutmeg", "Orang", "Pinoy", "Pribumi", "Rani", "Samudra Kidul", "Sandalwood", "Sarong Party", "Spice Girl", "Spice Islands", "Spice Trade", "Spice", "Trade Winds", "Treehouse"],
						situationDesc: `is malay, which is not uncommon given the ongoing poverty in many majority malay countries, and the serious weather patterns savaging that part of the world. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "middle eastern":
					nickMap.set("middle eastern", {
						nicknameArray: ["Akbar", "Arab", "Arabian Nights", "Arabian", "Arabush", "Belly Dancer", "Bibi", "Bougnoule", "Brownie", "Caliph", "Camel Jockey", "Chai Girl", "Desert Sun", "Dune Coon", "Dune", "Durka Durka", "Emir", "Flying Carpet", "Genie", "Halal", "Harem Girl", "Hijabi", "Hookah Bar", "Imam", "Jasmine", "Jihadi", "Kebab", "Middle Eastern", "Mideastern", "Moromierda", "Oil Well", "Raghead", "Sand Nigger", "Sand", "Sandy", "Scheherazade", "Sheikh", "Soosmar-Khor", "Third Wife", "Towelhead"],
						situationDesc: `is middle eastern, which is not uncommon given the interminable wars and disruptions in that part of the world. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "mixed race":
					nickMap.set("mixed race", {
						nicknameArray: ["Bastard", "Chola", "Colonial", "Colored", "Creole", "Criss-Cross", "Crisscross", "Crossbreed", "Cur", "Diverse", "Diversity", "Hāfu", "Half and Half", "Half-breed", "Half-caste", "Hybrid", "Hyphenated", "Illegitimate", "Impure", "Integration", "Interracial", "Love Child", "Melting Pot", "Melungeon", "Mestiza", "Métis", "Miscegenation", "Mix", "Mixed Race", "Mixed Up", "Mixed", "Mongrel", "Mulatto", "Mule", "Multiracial", "Mutt", "Octaroon", "Pardo", "Quadroon", "Remix", "Swirl", "Zambo"],
						situationDesc: `is mixed race, an ethnic makeup that has always been a target for abuse. Slaves of all races can find something about ${him} to dislike. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "pacific islander":
					nickMap.set("pacific islander", {
						nicknameArray: ["Aloha", "Antipodean", "Atoll", "Austronesian", "Boong", "Boonga", "Breadfruit", "Coconut", "Conch Blower", "Grass Skirt", "Hori", "Hula Girl", "Hula Hoop", "Island Girl", "Island Hopper", "Islander", "Kanaka", "Lei", "Longpig", "Melanesian", "Micronesian", "Oceanian", "Oceanic", "Outrigger", "Pacific Islander", "Pacific", "Paradise", "Pasifika", "Pineapple", "Polynesian", "Sea", "Seashell", "South Pacific", "Tiki Torch", "Tourist Trap", "Ukulele"],
						situationDesc: `is a pacific islander, which is not uncommon given wholesale destruction of many countries in that area by the worsening climate. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "catgirl":
					nickMap.set("catgirl", {
						nicknameArray: ["Ace", "Bandit", "Bastet", "Bubbles", "Butterscotch", "Cheshire", "Clawdia", "Cupcake", "Cutie", "Dottie", "Dandelion", "Fluffy", "Furball", "Garfield", "Ginger", "Griddlebone", "Grizabella", "Hairball", "Jennyanydots", "Jellicle", "Jemima", "Kitten", "Lynx", "Macavity", "Meow", "Nala", "Neko", "Nyan", "Old Deuteronomy", "Oreo", "Panther", "Puma", "Tabby", "Tiger", "Tigger", "Twitchy", "Simba", "Spots", "Stormy", "Sunshine", "Whiskers", "Ziggy"],
						situationDesc: `is a cat${girl}, a highly unusual result of advanced genetic engineering in the postmodern age. Their pronounced cat-like features mark them apart from the rest of your slaves, from the twitching, sensitive ears to the light coating of silky fur across their body, and tend to be the first thing anyone notices when looking at them.`,
						applyDesc: `now has a constant and humiliating reminder that their cat-like features define ${him} above all else.`,
						notApplyDesc: `seems rather ambivalent about your decision to not define ${him} by ${his} catlike nature. ${He} just mrowls at you in a way that could be interpreted as either gratitude or annoyance.`,
					});
					break;
				case "semitic":
					nickMap.set("semitic", {
						nicknameArray: ["Abie", "Abrahamic", "Baal Worshipper", "Biblical", "Canaanite", "Dead Sea", "Golden Calf", "Good Samaritan", "Goy Toy", "Hebrew", "Heeb", "Holy land", "Hymie", "Inanna", "Ishtar", "Jew", "Kike", "Kosher", "Levantine", "Lilith", "Lost Ark", "Mocky", "Ms. Jew Booty", "Nephilim", "Oven Dodger", "Oy Vey", "Philistine", "Qedesha", "Rabbi", "Red Sea", "Salome", "Semite", "Semitic", "Sheeny", "Shylock", "Sodom and Gomorrah", "Triple Parentheses", "Whore of Babylon", "Yid"],
						situationDesc: `is semitic, which is not uncommon given the many conflicts in countries with semitic minorities. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "southern european":
					nickMap.set("southern european", {
						nicknameArray: ["Aphrodite", "Aquiline", "Bella", "Classical", "Dago", "Doña", "Fine Wine", "Fuhgeddaboudit", "Garlic Breath", "Garlic Goon", "Ginzo", "Goomah", "Goombah", "Greaseball", "Greaser", "Grecian", "Guidette", "Guido", "Guinea", "Hand Talker", "Imperial", "Infamis", "Latin", "Lupa", "Mafioso", "Marble Column", "Mediterranean", "Mediterranid", "Meretrix", "Odalisque", "Olive Oil", "Olive", "Pizzahead", "Pope", "Riviera", "Roman Nose", "Roman", "Southern European", "Southie", "Toga Party", "Venus", "Wog", "Wop"],
						situationDesc: `is southern european, which is not uncommon given the endemic corruption and political collapse in that part of the world. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
				case "white":
					nickMap.set("white", {
						nicknameArray: ["Albino", "Ang Mo", "Bleached", "Casper", "Caucasian", "Caucasoid", "Cracker", "Cumskin", "Dixie", "Down Home", "Duchess", "Euro Trash", "Europa", "European", "Farang", "Ghost", "Grits", "Gweilo", "Hick", "Hillbilly", "Hollywood", "Honky", "Ice Monkey", "Ice Queen", "Klanswoman", "Mayo", "Memphis", "Pale", "Paleface", "Paleskin", "Pasty", "Peckerwood", "Princess", "Redleg", "Snowflake", "Sunburnt", "Top Dollar", "Valley Girl", "Vanilla", "Vegas", "White Bread", "White Devil", "White Trash", "White", "Whitey", "Wigger", "Wypipo", "Xanthochroic", "Yankee"],
						situationDesc: `is white, which is not uncommon given the collapse of many erstwhile first world nations into depression and the proximity of many Free Cities to majority white areas. Slaves casually reference race as much or more than free citizens. They absorb the racial peccadilloes of their owners, and many of them bring prejudices from the old world into their slave lives.`,
						applyDesc: `now has a constant reminder that as a sex slave ${he} is judged on ${his} appearance first.`,
						notApplyDesc: `may feel some gratitude due to your preference that ${he} not be defined by ${his} ethnicity, but this is counterbalanced by the increased independence your kindness inspires.`,
					});
					break;
			}
		}
		if (slave.boobs <= 300) {
			nickMap.set("flat", {
				nicknameArray: ["A-Cup", "DFC", "Flat", "Flats", "Flatty", "Ironing Board", "Itty Bitty", "Kansas", "Mastectomy", "Mosquito Bites", "Pettanko", "Plank", "Tank Top", "Undersized"],
				situationDesc: `has barely any breasts to speak of, ${he} is completely flat. The slave society of the Free Cities tends to follow average male desires, which is to say that many slaves find themselves carrying comically oversized breasts. It's natural that slaves required to carry such burdens should resent ${him}.`,
				applyDesc: `further believes that chests should be deliciously flat, and is a little relieved at the added evidence that you don't plan to give ${his} breasts the size of ${his} head any time soon.`,
				notApplyDesc: `realizes that ${his} form isn't necessarily due to some master plan and that you may see fit to change it; ${he} begins to regard the remote surgery with apprehension.`,
			});
		} else if (slave.boobs >= 800) {
			nickMap.set("boobs", {
				nicknameArray: ["Airbags", "Bazookas", "Boob", "Boobs", "Bosom", "Bouncing", "Bouncy", "Bristols", "Busty", "Buxom", "Charlies", "Chounyuu", "Funbags", "Hooters", "Jugs", "Knockers", "Macromastic", "Megaboobs", "Melons", "Norks", "Oppai", "Pillows", "Stacked", "Tatas", "Titties", "Titty", "Top Heavy", "Udders"],
				situationDesc: `has large breasts. Pointing this out is about as observant as describing the sky as blue. When ${he} enters a room, they precede ${him}. When ${he} takes it doggy style, they prop ${him} up. Other slaves are envious of the attention ${he} gets, and happy they don't have to carry such burdens.`,
				applyDesc: `was of course proud of ${his} huge breasts before this new nickname. Now, though, ${he} accepts them as a sort of trademark.`,
				notApplyDesc: `accepts that having titanic tits does not make ${him} special, since what's important is ${his} holes, not ${his} boobs.`,
			});
		}
		if (slave.weight > 30) {
			nickMap.set("chubby", {
				nicknameArray: ["Ample", "BBW", "Bloated", "Chubby", "Chubster", "Chunky", "Curvy", "Double Wide", "Fat", "Feedee", "Hambeast", "Jabba", "Jiggles", "Jiggly", "Jumbo", "Landwhale", "Love Handles", "Plump", "Plush", "Rotund", "Rubenesque", "Thicc", "Thick", "Tubby", "Whale"],
				situationDesc: `is carrying a little extra weight. The cruelty of life as a slave increases your property's willingness to do cruelty where they can get away with it — what is passed to them, they pass to others — so ${he} finds ${himself} mocked for ${his} size.`,
				applyDesc: `knows that being fat makes ${him} less valuable on the market, but ${he} begins to accept that ${he}'s going to have to put up with being chubby for now.`,
				notApplyDesc: `believes that this means ${he}'s going to have to lose weight soon, causing ${him} some trepidation.`,
			});
			if (slave.weight > 100) {
				nickMap.set("fat", {
					nicknameArray: ["Bed Breaker", "Beluga", "Blimp", "Bloated", "Buffet Closer", "Chunky", "Cow", "Double Wide", "Extra Thicc", "Fat", "Fatass", "Fatso", "Fatty", "Feedee", "Hambeast", "Hippo", "Jabba", "Jiggles", "Jiggly", "Jumbo", "Lap Crusher", "Lardy", "Piggy", "Roller", "Scale Breaker", "Smothers", "SSBBW", "Thud", "Tubby", "Whale"],
					situationDesc: `is carrying a lot of extra weight. The cruelty of life as a slave increases your property's willingness to do cruelty where they can get away with it — what is passed to them, they pass to others — so ${he} finds ${himself} mocked for ${his} size.`,
					applyDesc: `knows that being obese makes ${him} less valuable on the market, but ${he} begins to accept that ${he}'s going to have to put up with being fat for now.`,
					notApplyDesc: `believes that this means ${he}'s going to have to lose a lot of weight soon, causing ${him} some trepidation, though deep down ${he} hopes you'll just have it sucked out instead of making ${him} run.`,
				});
			}
		}
		if (slave.muscles > 30) {
			nickMap.set("muscles", {
				nicknameArray: ["Amazon", "Bodybuilder", "Buff", "Gargantua", "Giant", "Gunshow", "Gymrat", "Huge", "Muscle Barbie", "Muscles", "Muscular", "Prepare Yourself", "Protein Shake", "Red Sonja", "Ripped", "She-Hulk", "Snu-Snu", "Strong", "Tank", "Toned", "Warrior Queen", "Weightlifter", "Wonder Woman"],
				situationDesc: `is a big ${girl}. ${His} huge muscles aren't to everyone's taste, but they're quite eye-catching, and give ${him} some interesting sexual possibilities that wouldn't work with, for example, a sex slave not capable of supporting ${his} own body weight on one hand for long periods. ${He} has become the object of mixed admiration and envy from your other stock.`,
				applyDesc: `is happy with ${his} nickname; any embarrassment ${he} may have felt about looking like statuary becomes a jet of pride. ${He}'s confident that this is the way you want ${him}.`,
				notApplyDesc: `is a sex slave first, last, and always, no matter what ${his} one-rep max is.`,
			});
		}
		if (slave.ID === V.HeadGirlID) {
			nickMap.set("Head Girl", {
				nicknameArray: ["Boss", "Bossy", "Bottom Bitch", "Captain", "Chief", "Commander", "Deputy", "Favorite", "Head Girl", "Head Honcho", "Head", "House Slave", "Lieutenant", "Major", "Mistress", "Mrs.", "Number Two", "On Your Knees", "Overseer", "Prefect", "Second in Command", "Sergeant", "Top", "Understudy", "Vice"],
				situationDesc: `occupies a place in the hierarchy of your penthouse that is certainly one which encourages nicknaming. Your other slaves view ${him} with mixed envy, adoration, emulation, and apprehension. ${He} is someone to curry favor with, to offer sexual favors, and at times someone to avoid. To the devoted slave ${his} closeness to you is enviable; to the rebellious slave ${his} alliance with you is traitorous.`,
				applyDesc: `was already proud of and happy with ${his} exalted position, but now ${he} is all the more so. ${He} had always nursed the secret fear that this was temporary, but ${his} place at your right hand is now part of ${his} name.`,
				notApplyDesc: `begins to fear a little that ${he} may one day be supplanted, since you did not think it right to make ${his} place a part of ${his} name.`,
			});
		} else if (slave.ID === V.BodyguardID) {
			nickMap.set("Bodyguard", {
				nicknameArray: ["Aegis", "Amazon", "Athena", "Battle", "Bloody", "Body Armor", "Bodyguard", "Diana", "Guard", "Gunsmoke", "Hired Gun", "Mercenary", "Officer", "Paladin", "Protection", "Secret Service", "Security", "Soldier", "Terminatrix", "Threat Neutralizer", "Warrior", "Widow"],
				situationDesc: `divides your other slaves. ${He} is a physically intimidating sight, wearing normal slave attire and obviously sexually available, but also carrying a sword across ${his} back and an automatic weapon at ${his} hip. Some revere ${his} unique position of responsibility, while others mock how far ${he} steps outside the bounds of sexual slavery.`,
				applyDesc: `knew a while ago that ${he} was likely to spend some time shadowing your every move. But now, ${he} understands that not only is your life in ${his} ${hasBothArms(slave) ? 'hands' : 'hand'}, it is going to remain so. ${He} is almost awed by the responsibility.`,
				notApplyDesc: `realizes to ${his} apprehension that ${he} may someday be a simple sex slave again, respected for ${his} holes rather than for ${his} swords${woman}ship.`,
			});
		} else if (slave.ID === V.ConcubineID) {
			nickMap.set("Concubine", {
				nicknameArray: ["Beauty", "Bed Wench", "Bed", "Cicisbeo", "Co-Wife", "Cohabitant", "Common-Law", "Concubine", "Contessa", "Empress", "Fuck Buddy", "Girlfriend", "Goomah", "Grass Widow", "Harem Queen", "Kept", "Lover", "Master", "Missus", "Mistress", "Mrs.", "Paramour", "Partner", "Pilegesh", "Polygamized", "Princess", "Queen", "Side Piece", "Sidechick", "Spouse", "Strumpet", "Wife", "Wifelet", "Wifey"],
				situationDesc: `occupies a place in the hierarchy of your penthouse that is certainly one which encourages nicknaming. Your other slaves view ${him} with mixed envy and admiration. ${He} has much of the luxury of the Head Girl and none of the responsibility, and all ${he} has to do for this exalted place is keep your sexual satisfaction as ${his} prime goal.`,
				applyDesc: `was already proud of and happy with ${his} exalted position, but now ${he} is all the more so. ${He} had always nursed the secret fear that this was temporary, but ${his} place in your bed is now part of ${his} name.`,
				notApplyDesc: `begins to fear a little that ${he} may one day be supplanted, since you did not think it right to make ${his} place a part of ${his} name.`,
			});
		} else if (slave.ID === V.AttendantID) {
			nickMap.set("Attendant", {
				nicknameArray: ["Attendant", "Bath Girl", "Bath", "Bathing Beauty", "Body Wrapper", "Healer", "Healing Hand", "Helping Hand", "Hot Springs", "Hot Tub", "Masseuse", "Mist Queen", "Misty", "Saunagirl", "Spa Day", "Spa Mother", "Spa", "Steam Queen", "Sweat Lodge", "Warm Water"],
				situationDesc: `is loved by almost every slave in your penthouse. Getting a chance to go and spend some time in ${his} spa is a wonderful treat, for which slaves are willing to work very hard. ${He}'s very willing to help them find sexual release, but mostly just provides minor care and an understanding ear for their troubles.`,
				applyDesc: `enjoys helping your girls, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes helping your girls and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.MatronID) {
			nickMap.set("Matron", {
				nicknameArray: ["Amah", "Au Pair", "Ayah", "Baby Farmer", "Babysitter", "Caretaker", "Childminder", "Daycare", "Governess", "Houseparent", "Mama", "Matron", "Mommy", "Mother", "Nanny", "Nursemaid", "Nursery", "Orphanotrophos", "Pacifier", "Stork", "Supernanny"],
				situationDesc: `has a very important role in ensuring the children in ${V.arcologies[0].name} grow up to be the perfect slaves for you.`,
				applyDesc: `is excited and proud when ${he} learns that ${his} position in your arcology is a part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes taking care of the children and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.MadamID) {
			nickMap.set("Madam", {
				nicknameArray: ["Abbess", "Bawd", "Boss Bitch", "Brothel Queen", "Brothel-Keeper", "Fishmonger", "Flesh-Peddler", "Hustler", "Mack Mommy", "Madam", "Manager", "Middle Woman", "Miss Kitty", "Mother", "Nookie Bookie", "Operator", "Panderer", "Pimp Hand", "Pimp Queen", "Pimp", "Pimparella", "Procurer", "Procuress", "Queen Bitch", "Saleswoman", "Solicitor", "Third Party", "Trafficker", "Whore Queen", "Whorehousekeeper", "Whoremonger"],
				situationDesc: `is in an unusually responsible and pragmatic position, for a slave. ${He} runs ${his} whores' lives with almost total control, overseeing the sale of their bodies day in, day out. Some resent ${him}, some love ${him}, but all depend on ${him}.`,
				applyDesc: `enjoys running a whorehouse, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes running a whorehouse and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.djID) {
			nickMap.set("DJ", {
				nicknameArray: ["Arcology Idol", "Bass Drop", "Bass Slut", "Bass", "Bassgirl", "Beatmatcher", "Booth", "Celebutante", "Club Idol", "Club Princess", "Club Queen", "Deejay", "Disc Jockey", "Discaire", "DJ Whore", "DJ", "EP", "LP", "Mixer", "Music Master", "Radio", "Record Player", "Subwoofers", "SuperBass", "Turntables"],
				situationDesc: `has a leadership role that requires decisiveness and discretion, but has to maintain a role of flirtatiousness and fun, at the same time. Other slaves marvel at how ${he} must give another slut orders one moment, and girlishly giggle at a prominent citizen the next.`,
				applyDesc: `enjoys being one of the most idolized ${girl}s in the arcology, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes being one of the most idolized ${girl}s in the arcology and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.RecruiterID) {
			nickMap.set("Recruiter", {
				nicknameArray: ["Abductor", "Agent", "Cam Queen", "Cam", "Camgirl", "Collector", "Employer", "Fraudster", "Headhunter", "Honeypot", "Honeytrap", "Interviewer", "Job Fair", "Kidnapper", "Recruiter", "Recruitment Tool", "Scout", "Slavecatcher", "Slaver", "Snake", "Spider", "Trapper", "Trickster"],
				situationDesc: `is fundamentally a liar, in ${his} role as recruiter. ${He} must constantly lie by omission if not by commission, telling everyone interested in slavery all about everything good about being your slave, while leaving out the fundamental reality of sexual servitude.`,
				applyDesc: `enjoys seeing girls go from faces on a screen to fellow fuckslaves, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes making girls go from faces on a screen to fellow fuckslaves and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.WardenessID) {
			nickMap.set("Wardeness", {
				nicknameArray: ["Boss", "Captor", "Chief", "Cop", "Copper", "Dogcatcher", "Governor", "Inquisitrix", "Interrogatrix", "Jail", "Jaileress", "Keeper", "Nightstick", "Officer", "Overseer", "Prison Queen", "Prison", "Rapist", "Screw", "Sheriff", "Snake", "Spider", "Stoolie", "Turnkey", "Warden", "Wardeness"],
				situationDesc: `has perhaps the most hated role among your slaves. ${His} charges hate ${him}, of course. But almost every slave who was once one of ${his} charges hates ${him} too, for they have not forgotten how ${his} whim was once the law to them.`,
				applyDesc: `enjoys having a row of cells full of slaves to abuse, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes having a row of cells full of slaves to abuse and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.MilkmaidID) {
			nickMap.set("Milkmaid", {
				nicknameArray: ["Cattle Driver", "Cowgirl", "Cowhand", "Cowpoke", "Cream Queen", "Dairy Queen", "Dairy", "Farm", "Milker", "Milking Machine", "Milkmaid", "Milktugger", "Milkwoman", "Rancher", "Squeezer", "Strong Hands", "Teat Puller", "Udder Lover"],
				situationDesc: `has a physically demanding and emotionally rewarding role. It's hard work, hauling milk and shifting cows all day, but ${his} stock love ${him}. It's hard not to love someone when you depend on them so totally.`,
				applyDesc: `enjoys being a milkmaid, despite the tough work, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes being a milkmaid, despite the tough work, and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
			if (slave.dick > 5 && canPenetrate(slave) && cumSlaves().length > 3) {
				nickMap.set("Collectrix", {
					nicknameArray: ["Anal Retentive", "Ass Fiend", "Booty Warrior", "Buggerer", "Buttfucker", "Collectrix", "Cum Queen", "Extractrix", "Fucker", "Fudge Packer", "Milker", "Orgasmotron", "Prostate Masseuse", "Prostate Poker", "Rear Poker", "Sod Off", "Sodomizer"],
					situationDesc: `is required to fuck more exhaustingly than any other slave in the arcology. It's one thing to take dick all day; it's quite another to be expected to constantly massage prostates to orgasm. Naturally, the other slaves notice.`,
					applyDesc: `really enjoys being expected to bone butts constantly, and is happy to learn that the role is part of ${his} name now.`,
					notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes being expected to bone butts constantly and now wonders whether ${he}'ll be allowed to keep doing so.`,
				});
			}
		} else if (slave.ID === V.FarmerID) {
			nickMap.set("Farmer", {
				nicknameArray: ["Agriculturalist", "Country", "Cropper", "Farmer", "Feeder", "Fertilizer", "Gardener", "Green Thumb", "Harvest Moon", "Harvester", "Hay Bale", "Hick", "Laborer", "Old McDonald", "Peasant", "Pesticide", "Planter", "Rancher", "Reaper", "Redneck", "Rural", "Sharecropper", "Sower", "Tender", "Tiller", "Tractor Pull"],
				situationDesc: `has a very physically demanding role. It's hard work, tending to crops and animals all day, but ${he} loves it.`,
				applyDesc: `enjoys being a farmer, despite the constant manual labor, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes being a farmer, despite the constant manual labor, and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.StewardessID) {
			nickMap.set("Stewardess", {
				nicknameArray: ["Chamberlain", "Clean Queen", "Concierge", "Head Maid", "Head Servant", "Housekeeper", "Housemistress", "Inspectrix", "Maid Boss", "Majordomo", "Martinet", "Perfectionist", "Sanitizer", "Scrubber", "Stewardess", "Top Mop"],
				situationDesc: `might consider ${his} role boring, if ${he} weren't allowed to use sexual abuse as a correction for poor work. As it is, ${his} sexual aggressiveness draws much open comment and some private infatuation from the servants.`,
				applyDesc: `likes being in charge of household tasks, especially because ${he}'s allowed to use the servants, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes being in charge of household tasks, especially because ${he}'s allowed to use the servants, and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.SchoolteacherID) {
			nickMap.set("Schoolteacher", {
				nicknameArray: ["Classroom", "Dean", "Educator", "Extra Credit", "Headmistress", "Pedagogue", "Principal", "Profesora", "Professor", "Ruler", "Schoolmarm", "Schoolmistress", "Schoolteacher", "Sensei", "Shiny Apple", "Teach", "Teacher", "Tutor"],
				situationDesc: `might consider ${his} role boring, if ${he} weren't allowed to use sexual abuse as a correction for poor attentiveness. As it is, ${his} sexual aggressiveness draws much open comment and some private infatuation from the students.`,
				applyDesc: `likes teaching, especially because ${he}'s allowed to use the students, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes teaching, especially because ${he}'s allowed to use the students, and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.NurseID) {
			nickMap.set("Nurse", {
				nicknameArray: ["Candy Striper", "Doc", "Doctor", "Dr.", "Healer", "Hospital Hottie", "Life Support", "M.D.", "Medic", "Medicine Woman", "Nurse", "Pill Peddler", "Pill Pusher", "Placebo", "Practitioner", "Quack", "Sawbones", "Snake Oil", "Surgeon"],
				situationDesc: `might consider ${his} role boring, if ${he} weren't allowed to use sexual abuse as a correction for poor health. As it is, ${his} sexual aggressiveness draws much open comment and some private infatuation from the patients.`,
				applyDesc: `likes being a nurse, especially because ${he}'s allowed to use the patients, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes being a nurse, especially because ${he}'s allowed to use the patients, and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.ID === V.LurcherID) {
			nickMap.set("Lurcher", {
				nicknameArray: ["Athlete", "Bloodhound", "Bloodsport", "Cardio", "Catcher", "Courser", "Fetch", "First Place", "Greyhound", "Hound", "Hunter", "Lurcher", "Poacher", "Race Queen", "Racehound", "Racer", "Runner", "Sighthound", "Speedy", "Sprinter", "Tackler"],
				situationDesc: `is a lurcher in the regular coursing races held by the Coursing Association. The slaves fortunate enough to have never experienced these events learn of them through hearsay, so ${his} position comes with a great deal of both infamy and envy`,
				applyDesc: `likes being a lurcher, especially because of what ${he}'s allowed to do to captured hares, and is happy to learn that the role is part of ${his} name now.`,
				notApplyDesc: `is a bit sad that ${his} role isn't part of ${his} name, since ${he} likes being a lurcher, especially because of what ${he}'s allowed to do to captured hares, and now wonders whether ${he}'ll be allowed to keep doing so.`,
			});
		} else if (slave.assignment === Job.SUBORDINATE) {
			nickMap.set("server", {
				nicknameArray: ["Bedwarmer", "Bottom Rung", "Bottom", "Doormat", "Girltoy", "Group Whore", "House Slave", "Kick Me", "Lovergirl", "Please No", "Rapebait", "Servant", "Server", "Servile", "Slave Slut", "Sub", "Submissive"],
				situationDesc: `holds a place in the hierarchy of your penthouse that almost demands a nickname. ${He} is the lowest of the low, below even your other slaves. ${He} is a pitiable creature, living with a large number of sexually charged people, slave and free, all of whom have the right to demand any sexual service they wish of ${him}.`,
				applyDesc: `has become almost proud of ${his} strange, exhausting situation. ${Hers} is not the struggle of slaves to know their place, for ${he} knows ${hers}. It is on the bottom.`,
				notApplyDesc: `begins to hope a little that maybe ${he} can rise beyond ${his} current station.`,
			});
		}
		if (slave.nipples === "huge" || slave.nipples === "puffy") {
			nickMap.set("nipples", {
				nicknameArray: ["Bullets", "Buttons", "Cold Weather", "Dicknipples", "Erect", "Eye Hazard", "Milk Taps", "Nipples", "Nippy", "Nips", "Pointers", "Pointy", "Pokers", "Puffy", "Spikes", "Teats", "THO", "Tips", "Titclits"],
				situationDesc: `has a pair of nipples that are hard to ignore. Whenever ${he}'s sexually aroused, they jut proudly from ${his} chest. As a result, it's totally impossible for ${him} to conceal arousal. When ${he}'s ready for it, ${his} big nipples let the whole world know ${he}'s easy.`,
				applyDesc: `is proud of the nickname, almost amusingly so. ${He} flaunts ${his} nipples in a way ${he} didn't before.`,
				notApplyDesc: `accepts that ${his} nipples are just another part of ${him}, and that if ${he} pokes those who fuck ${him} in the missionary position a little, that's all right.`,
			});
		} else if (slave.nipples === "fuckable") {
			nickMap.set("nippleCunts", {
				nicknameArray: ["Areola Hole", "Bonus Holes", "Cuntnipples", "Fuck Ducts", "Fuckable Nipples", "Milk Ducts", "Nip Holes", "Nip Slipped", "Nipple Cunts", "Nipple Fucked", "Nipplejob", "Nippussy", "Titjob"],
				situationDesc: `has a pair of unassuming nipples that hide an unusual secret: They can take a dick as well as any other hole can. This previously impossible talent is a source of both envy and disgust, and as such, ${he} often finds ${himself} in the center of any breast based discussion.`,
				applyDesc: `is proud of the nickname, almost amusingly so. ${He} flaunts ${his} fuckable nipples in a way ${he} didn't before.`,
				notApplyDesc: `accepts that ${his} nipples are just another pair of fuckable holes in ${his} body, nothing more.`,
			});
		}
		if (slave.areolae > 2) {
			nickMap.set("areolae", {
				nicknameArray: ["Areolae", "Areolar", "Areolas", "Broad Based", "Cans", "Dark Circles", "Dinner Plates", "Flapjacks", "Fried Eggs", "Headlamps", "Headlights", "Highbeams", "Pancakes", "Pepperoni", "Rounders"],
				situationDesc: `has areolae broader than many slaves' entire breasts. Some slaves find them unattractive, making them an easy target for mockery; others like them, and playfully torment ${him} by giving ${him} a nickname based on them.`,
				applyDesc: `is proud of the nickname, almost amusingly so. ${He} flaunts ${his} lovely broad areolae happily, the nipples in their centers hard.`,
				notApplyDesc: `accepts that ${his} broad areolae are just another part of ${him}, just like ${his} big tits.`,
			});
		}
		if (slave.lips > 40) {
			nickMap.set("lips", {
				nicknameArray: ["Beestung", "Cakehole", "Chops", "DSLs", "Ducklips", "Facepussy", "Fat Lips", "Kisser", "Kissing Booth", "Kissy", "Lip Gloss", "Lippy", "Lips", "Lipstick", "Mwah", "Pillows", "Rims", "Smackers", "Smooches", "Soup Coolers", "Sucker", "Suckles", "Sucky-Sucky"],
				situationDesc: `has lovely lips. They're so big ${he} can hardly talk straight, and they even hinder ${his} ability to communicate any facial expression other than a desire to be facefucked. This is appropriate, as ${he} spends a lot of time getting facefucked.`,
				applyDesc: `accepts that ${his} big lips define ${him}. Even more than before, ${he} presents ${his} mouth for oral sex whenever ${he} flirts, and ${he} views ${his} throat as ${his} primary sexual organ.`,
				notApplyDesc: `accepts that ${his} mouth is only one of ${his} holes, and that as a sex slave ${he}'ll be taking cock in all of them, even if ${his} lips are huge.`,
			});
		}
		if (slave.vagina === 0) {
			nickMap.set("virgin", {
				nicknameArray: ["Abstinent", "Callow", "Celibate", "Chaste", "Chastity", "Cherry", "Clean", "Cloistered", "Doomed", "Flower", "Innocent", "Maiden", "Pristine", "Pucelle", "Pure", "Unbroken", "Unfucked", "Unicorn Bait", "Unspoilt", "Untouched", "Vestal", "Virgin", "Virginal"],
				situationDesc: `has never had vanilla sex. This is not unusual in the Free Cities, since many slaveowners value and preserve virginity. Virgins form a separate class of sorts among slaves. Some of them even dislike their status, as having a virgin pussy can often result in a tired tongue or a sore butt.`,
				applyDesc: `understands that it's ${his} fate to remain unspoiled a while longer, and redoubles ${his} efforts to do better with ${his} other parts.`,
				notApplyDesc: `dreads and anticipates the day when ${he}'ll lose ${his} pearl of great price and gain another way to please a man.`,
			});
		}
		if (slave.preg >= 37) {
			if (slave.broodmother > 1) {
				nickMap.set("hyperbroodmother", {
					nicknameArray: ["Baby Factory", "Bakery", "Bloated", "Breeder", "Broodmother", "Bursting", "Factory", "Hyperbroodmother", "Mother", "Naedoko", "Nursery", "Seedbed", "Seeded", "Stuffed", "Tentacle Raped"],
					situationDesc: `is a Broodmother. ${His} belly is enormous, unavoidable evidence that ${his} life has been dedicated to carrying children. ${His} taut belly constantly bulges and squirms from ${his} brood writhing within ${him} and it is a very real possibility that ${he} may pop.`,
					applyDesc: `takes a bit of solace from ${his} new hope in ${his} nickname that ${he} will be kept in good shape and not have to worry about ${his} pregnancy draining ${him}, but also a bit of fear from ${his} suspicion that ${he}'ll remain this way until ${he} dies or ${his} body is used up.`,
					notApplyDesc: `understands that ${he} is expected to obey, work, and fuck just like any of your other slaves, regardless of how big ${his} pregnancy is.`,
				});
			} else if (slave.broodmother === 1) {
				nickMap.set("broodmother", {
					nicknameArray: ["Baby Factory", "Bakery", "Bloated", "Breeder", "Broodmother", "Factory", "Mother", "Naedoko", "Nursery", "Seeded", "Stuffed"],
					situationDesc: `is a Broodmother. ${His} belly is enormous, unavoidable evidence that ${his} life has been dedicated to carrying children. ${His} taut belly is stuffed with ${his} brood and barely gets smaller with every child born from ${him}.`,
					applyDesc: `takes a bit of solace from ${his} new hope in ${his} nickname that ${he} will be kept in good shape and not have to worry about ${his} pregnancy draining ${him}, but also a bit of fear from ${his} suspicion that ${he}'ll remain this way until ${he}'s out of eggs.`,
					notApplyDesc: `understands that ${he} is expected to obey, work, and fuck just like any of your other slaves, regardless of how big ${his} pregnancy is.`,
				});
			}
		}
		if (slave.bellyPreg >= 300000) {
			nickMap.set("hyperpreg", {
				nicknameArray: ["Balloon", "Breeder", "Breeding Bitch", "Breeding Cow", "Breeding Mare", "Breeding Sow", "Breeding Stock", "Broodmother", "Bulgey", "Bulging", "Bursting", "Clown Car", "Expecting", "Fertile", "Hyperbreeder", "Hyperfertile", "Hyperpreg", "Impregnated", "Knocked Up", "Mare", "Megapreg", "Mommy", "Mother", "Ninpuchan", "Preg", "Preggers", "Squirming", "Squirmy", "Stuffed", "Waterslide"],
				situationDesc: `is a breeding slave. ${His} belly is huge, unavoidable evidence that ${he}'s very pregnant. ${His} taut belly constantly bulges and squirms from ${his} brood writhing within ${him} and it is a very real possibility that ${he} may pop.`,
				applyDesc: `takes a bit of solace from ${his} new hope at ${his} nickname that ${he} will be kept in good shape and not have to worry about the size of ${his} pregnancy, and a bit of fear from ${his} suspicion that producing babies is ${his} whole future.`,
				notApplyDesc: `understands that ${he} is expected to obey, work, and fuck just like any of your other slaves, regardless of how big ${his} pregnancy is.`,
			});
		}
		if (slave.dick === 1) {
			nickMap.set("micropenis", {
				nicknameArray: ["Baby Dick", "Bitchdick", "Boyclit", "Chode", "Compensating", "Dicklet", "Gherkin", "Inchworm", "Little Dick", "Micro", "Micropenis", "Overcircumcised", "Rantallion", "Shorty", "Shrunken Head", "Teenie Weenie", "Tiny", "Toothpick"],
				situationDesc: `is a Free Cities sex slave, which makes ${him} female. It's not immediately obvious from many angles that ${he} wasn't born that way, since ${his} penis is almost comically small. For ${him}, penetrative sex would be very limited, even if ${he} weren't a Free Cities slave and therefore a perpetual receptacle for dick.`,
				applyDesc: `accepts the implicit mockery.`,
				notApplyDesc: `is a little relieved to be protected from the mockery, even though ${his} tiny endowment mocks ${him} as it flops around whenever ${he}'s used.`,
			});
		} else if (slave.dick > 4) {
			nickMap.set("hung", {
				nicknameArray: ["Anaconda", "Biggus Dickus", "Bitchbreaker", "Dangle", "Dolichophallic", "Horse", "Hung", "Long Dick Johnson", "Long Dong", "Long", "Macropenis", "Magnum Dong", "Maypole", "Python", "Shaft", "Superpenis", "Swingin' Dick", "Tentpole", "Third Arm", "Third Leg", "Tripod", "Truncheon", "Trunk"],
				situationDesc: `is a Free Cities sex slave, which makes ${him} a girl. The pretension is hard to maintain at times, however, as ${his} massive member swings around, gets in the way, sticks out of clothing, and blows huge loads. Half the fun of using ${his} butt is making ${his} absurd dick slap around. It's an obvious target for a nickname, especially since more than one slave has personal experience with how ${he} feels inside them.`,
				applyDesc: `enjoys being nicknamed for ${his} dick. ${He}'s special, ${his} dick is special, and now that ${he}'s been nicknamed for it, ${he}'s confident ${he} and ${his} dick will be allowed to go on being special.`,
				notApplyDesc: `realizes that ${he}'s just a slave girl behind, no matter what's dangling in front, and does ${his} best to take it like one.`,
			});
		}
		if (slave.balls > 5) {
			nickMap.set("bigballs", {
				nicknameArray: ["Berries", "Jewels", "Eggs", "Tackle", "Plums", "Deez"],
				situationDesc: `has large balls. Pointing this out is about as observant as describing the sky as blue. ${He} has to be enormously careful when ${he} sits and they stretch any clothing obscenely. They cushion anyone having sex with ${him}. Other slaves are envious of the attention ${he} gets, and happy they don't have to carry such burdens.`,
				applyDesc: `was of course proud of ${his} huge balls before this new nickname. Now, though, ${he} accepts them as a sort of trademark.`,
				notApplyDesc: `accepts that having titanic balls does not make ${him} special, since what's important is ${his} holes, not ${his} testes.`,
			});
			if (slave.dick > 5 && slave.counter.slavesKnockedUp > 4) {
				nickMap.set("babymaker", {
					nicknameArray: ["Baby Daddy", "Baby Maker", "Babymaker", "Baker", "Belly Popper", "Breeder", "Breeding Boar", "Breeding Bull", "Breeding Stallion", "Breeding Stud", "Cannon", "Cocksmith", "Cum Cannon", "Daddy", "Father", "Fire Hose", "Impregnator", "Inflator", "Motherfucker", "Popper", "Potent", "Sirer", "Sperm Donor", "Virile", "Womb Filler"],
					situationDesc: `is a terror to any fertile girl ${he} fucks. Horrifically potent, ${he} leaves a trail of pregnancies in ${his} wake. A great deal of the babies in your slaves might just be ${hers}.`,
					applyDesc: `takes a bit of pride from ${his} new nickname and hopes you'll keep letting ${him} knock bitches up.`,
					notApplyDesc: `understands that ${he} is a slave and it is not ${his} place to decide who gets pregnant and who doesn't.`,
				});
			}
		}
		if (slave.physicalAge < 18) {
			nickMap.set("young", {
				get nicknameArray() {
					if (random(1, 1500) <= 100) {
						if (slave.physicalAge < 13) {
							return ["Preteen"];
						} else if (slave.physicalAge === 16) { // WHY? (slave.physicalAge >= 16) && (slave.physicalAge < 17)
							return ["Sweet Sixteen"];
						} else if (slave.physicalAge === 18) { // WHY? (slave.physicalAge >= 18) && (slave.physicalAge < 19)
							/* Not currently possible but we might change later. */
							return ["Barely Legal"];
						}
					}
					return ["Baby", "Babycakes", "Candy Van", "Candydoll", "Imouto", "Jailbait", "Juliet", "Kiddie", "Kiddo", "Loli", "Lolita", "Nymphet", "Party Van", "Pedobait", "Pocket Pussy", "POMF", "Precocious", "PTHC", "Underage", "Young", "Youngling"];
				},
				situationDesc: `is still considered underage by old world standards, and some older slaves do not let ${him} forget that.`,
				applyDesc: `understands that far from being a mockery, your sanction has turned an intended insult into a reference to the appeal of ${his} years.`,
				notApplyDesc: `understands that despite ${his} young age ${he} must do ${his} best to fuck like the most veteran of whores.`,
			});
		} else if (slave.physicalAge > 59) {
			nickMap.set("reallyold", {
				nicknameArray: ["Aged", "Ancient", "Elder", "Elderly", "Generation X", "Geriatric", "GILF", "GMILF", "Grandma", "Grandmother", "Granny", "Nanna", "Obā-chan", "Old", "Oldie", "Really Old", "Senior Citizen", "Senior"],
				situationDesc: `is old. Really old. Old enough to be a grandmother. This, naturally, makes ${him} one of the most experienced sluts in the arcology, a desirable quality in and of itself. Many of the younger slaves mock ${him} relentlessly for ${his} age.`,
				applyDesc: `accepts ${his} new nickname with pride. This acknowledgment of ${his} age has ${him} ready to show these young sluts a thing or two.`,
				notApplyDesc: `understands that ${he} must do ${his} best to fuck like the teenager ${he} once was.`,
			});
		} else if (slave.physicalAge > 35) {
			nickMap.set("old", {
				nicknameArray: ["Aged", "Auntie", "Big Sis", "Cougar", "Cradle Robber", "Jukusei", "Mama", "Mature", "MILF", "Mom", "Momma", "Mommy", "Mother", "Oba-san", "Okā-san", "Old", "Onē-san", "Seasoned"],
				situationDesc: `is older than the average Free Cities slave. It has its downsides; ${he}'s worth less at sale and ${his} earning potential as a whore is lower. But, on the other hand, good experience is irreplaceable, and in your experience all slaves feel remarkably similar inside, regardless of age. Nevertheless, some younger slaves resent ${him}.`,
				applyDesc: `understands that far from being a mockery, your sanction has turned an intended insult into a reference to the advantages of ${his} years.`,
				notApplyDesc: `understands that ${he} must do ${his} best to fuck like the teenager ${he} isn't.`,
			});
		}
		if (isAmputee(slave)) {
			nickMap.set("amp", {
				nicknameArray: ["Amp", "Amputee", "Cocksock", "Cripple", "Dickholster", "Fifi", "Fleshlight", "Fucknugget", "Fucktoy", "Limbless", "Nubs", "Onahole", "Pillow Pet", "Pocket Pussy", "Quadruple", "Sex Toy", "Stubs", "Stumps", "Stumpy", "Torso"],
				situationDesc: `is a fun little fucktoy, a limbless torso with nice wet holes than can be used regardless of ${his} feelings. Giving a poor quadruple amputee a nickname might seem like stooping to wanton cruelty, but other slaves are willing to call ${him} anything to take their minds off their own status.`,
				applyDesc: `takes a tiny bit of solace from ${his} nickname, hoping that by accepting it, you were expressing an enjoyment of ${his} attenuated body.`,
				notApplyDesc: `understands that ${he} would be a sex toy even if ${he} still had arms and legs.`,
			});
		}
		if (getBestVision(slave) === 0) {
			nickMap.set("blind", {
				nicknameArray: ["Amaurotic", "Batty", "Blind", "Blindfold", "Braille", "Cataracts", "Crash", "Darkness", "Deadeye", "Eyeless", "Groping", "Masturbator", "No-Sight", "Oracle", "Sightless", "Stares", "Sunglasses", "Visionless", "White Cane"],
				situationDesc: `is blind. ${His} dull eyes reveal ${his} condition. ${He} has to feel ${his} way between jobs, and is at the mercy of everyone.`,
				applyDesc: `accepts that ${his} disability defines ${him}. ${He} keeps ${his} eyes wide open, no longer fearing what others say about them.`,
				notApplyDesc: `understands that ${he} is expected to obey, work, and fuck just like any of your other slaves, regardless of ${his} eyesight.`,
			});
		}
		if (slave.hears <= -2) {
			nickMap.set("deaf", {
				nicknameArray: ["Adder", "Cochlear", "Deaf Ears", "Deaf", "Deafened", "Decibel", "Ear Plugs", "Earless", "Earmuffs", "Hearing Aid", "Hearing Impaired", "Lip Reader", "Post", "Sign Language", "Stone Deaf", "Tinnitus", "Unhearing"],
				situationDesc: `is deaf. ${He} is on constant alert for the commands and orders ${he} cannot hear, and is at the mercy of everyone.`,
				applyDesc: `accepts that ${his} disability defines ${him}. ${He} takes pride in knowing that ${he}'s being insulted on the fact that ${he} can't hear any insults.`,
				notApplyDesc: `understands that ${he} is expected to obey, work, and fuck just like any of your other slaves, regardless of ${his} hearing.`,
			});
		}
		if (slave.voice === 0) {
			nickMap.set("mute", {
				nicknameArray: ["Aphasic", "Aphonic", "Dumb", "Gagged", "Muffled", "Mum", "Mute", "Mutie", "Quiet", "Sign Language", "Silenced", "Silent", "Soundless", "Speechless", "Tight-Lipped", "Tongue-Tied", "Tongueless", "Voiceless", "Wordless", "Zipped Lips"],
				situationDesc: `is mute. ${He} poorly attempts to communicate with often panicky gesturing, and is at the mercy of everyone.`,
				applyDesc: `accepts that ${his} disability defines ${him}. ${He} gestures with much less panic, now that ${his} communication problems are common knowledge.`,
				notApplyDesc: `understands that ${he} is expected to obey, work, and fuck just like any of your other slaves, regardless of ${his} voice.`,
			});
		}
		if (slave.height >= 185) {
			nickMap.set("tall", {
				nicknameArray: ["Alpine", "Amazon", "B-Baller", "Basketballer", "Beanpole", "Beanstalk", "Bigfoot", "Everest", "Giant", "Giantess", "Giraffe", "Jumbo", "Ladder", "Lofty", "Macro", "Mountain", "Redwood", "Skyscraper", "Slim", "Stilts", "Stretch", "Tall", "Top Shelf", "Top", "Tower", "Treetop"],
				situationDesc: `is impressively tall for a ${girl}. This makes ${him} sexually convenient, since ${his} holes are at convenient cock height. ${He} spends many of ${his} sexual encounters bent slightly at the waist to allow ${himself} to be taken from behind.`,
				applyDesc: `is quite proud of ${his} impressive height, even more so than before. ${He} resolves to tower over other slaves sexually as well as literally.`,
				notApplyDesc: `realizes that being tall doesn't make ${him} special, and understands that it's ${his} holes that make ${him}, not how high they are.`,
			});
		} else if (slave.height < 150) {
			nickMap.set("short", {
				nicknameArray: ["Cock Sock", "Compact", "Dwarf", "Fun Size", "Funsize", "Itsy Bitsy", "Micro", "Midget", "Mini", "Miniature", "Napoleon", "Petite", "Pint-Sized", "Pipsqueak", "Pocket Pussy", "Pocket-Sized", "Short", "Shortstack", "Shortstuff", "Shorty", "Shrimp", "Shrunk", "Small Fry", "Stumpy", "Stunted", "Tiny", "Undersized", "Waif", "Wee"],
				situationDesc: `is fairly low to the ground. This makes ${him} a bit different, sexually; ${he}'s better for several oral sex positions, but most standing positions turn into a game of how long ${his} partner can hold ${him} at the appropriate height.`,
				applyDesc: `is a little proud that ${his} diminutive stature, once nothing but a source of embarrassment, is apparently significant to you.`,
				notApplyDesc: `realizes that ${he}'ll just have to reach higher to make up for ${his} height, since you don't consider it special.`,
			});
		}
		if (slave.butt > 5) {
			nickMap.set("butt", {
				nicknameArray: ["Ass", "Backside", "Badonkadonk", "Big Ass", "Bootylicious", "Bottom", "Brazilian", "Bumtastic", "Bunda", "Buns", "Butt", "Buttocks", "Caboose", "Callipygian", "Derriere", "Glutes", "Heiny", "Jiggly", "Milkshake", "Moneymaker", "Rear End", "Rump", "Thunder Thighs", "Tuckus", "Tushy", "Wide Load"],
				situationDesc: `has a large ass. Pointing this out is about as observant as describing the sky as blue. (Though impressive for other reasons, for ${his} sexual partners, since they sometimes have difficulty drawing breath for such remarks.) When ${he} enters a room, it follows ${him}. When ${he} takes it doggy style, it pads penetration to an almost inconvenient degree. Other slaves are envious of the attention ${he} gets, and happy they don't have to carry such burdens.`,
				applyDesc: `was of course proud of ${his} huge ass before this new nickname. Now, though, ${he} accepts it as a sort of trademark.`,
				notApplyDesc: `accepts that having a massive ass does not make ${him} special, since what's important is ${his} holes, not ${his} buttocks.`,
			});
		}

		// Multiple conditions
		if (slave.vagina === 1 && slave.skill.vaginal <= 10) {
			nickMap.set("vaginalWhiner", {
				nicknameArray: ["Crybaby", "Cunt Vise", "Pussy Bitch", "Pussy Pain", "Rape Bait", "Shallow", "Squealer", "Struggles", "Tight Cunt", "Vaginal Whiner", "Whiner", "Whiny", "Wuss"],
				situationDesc: `has a tight pussy and not much skill using it. ${He} still gets fucked, which results in frequent painful situations for ${him}. ${His} moaning as ${he} takes a big dick earns ${him} the scorn of ${his} fellow slaves.`,
				applyDesc: `is embarrassed by ${his} new nickname, and resolves to try harder to address ${his} lack of skill. ${He} hopes ${he}'ll get better at sex soon, for ${his} own sake.`,
				notApplyDesc: `is a little grateful you've decided to protect ${him} from the other slaves' mockery of ${his} sore little pussy. ${He} still wants to get better at sex, for ${his} own sake.`,
			});
		}
		if (slave.anus === 1 && slave.skill.anal <= 10) {
			nickMap.set("analWhiner", {
				nicknameArray: ["Anal Bitch", "Anal Whiner", "Ass Pain", "Ass Vise", "Butt Rape", "Crybaby", "Painal", "Squealer", "Struggles", "Tight Ass", "Whiner", "Whiny", "Wuss"],
				situationDesc: `has a tight asshole and not much skill taking an anal fuck. ${He} still gets buttraped, which causes ${him} a great deal of anal pain. ${His} sobbing as ${he} takes a big dick up ${his} tight little asspussy earns ${him} the scorn of ${his} fellow slaves.`,
				applyDesc: `is embarrassed by ${his} new nickname, and resolves to try harder to address ${his} lack of skill. ${He} hopes ${he}'ll get better at buttsex soon, for ${his} own sake.`,
				notApplyDesc: `is a little grateful you've decided to protect ${him} from the other slaves' mockery of ${his} sore little asshole. ${He} still wants to get better at buttsex, for ${his} own sake.`,
			});
		}
		if (slave.boobs < 500 && slave.butt < 3) {
			if (slave.weight <= 10) {
				nickMap.set("girlish", {
					nicknameArray: ["Ano", "Fashionista", "Girlish", "Girly", "Missie", "Model", "Runway", "Slender", "Slim", "Slip", "Supermodel", "Teen Idol", "Thin", "Tomboy", "Toothpick", "Youthful", "Zero"],
					situationDesc: `has a trim form: ${his} assets are quite modest. The slave society of the Free Cities tends to follow average male desires, which is to say that many slaves find themselves augmented to very large proportions. It's natural that slaves required to carry such burdens should resent ${him}.`,
					applyDesc: `is prouder of ${his} lithe form that ${he} was before, and is a little relieved at the added evidence that you don't plan to give ${him} major implants any time soon.`,
					notApplyDesc: `realizes that ${his} form isn't necessarily due to some master plan and that you may see fit to change it; ${he} begins to regard the remote surgery with apprehension.`,
				});
			}
			if (slave.dick > 0) {
				nickMap.set("trap", {
					nicknameArray: ["Androgyne", "Androgynous", "Chai", "Ganymede", "Girldick", "He-She", "Ladyboy", "Otokonoko", "Shemale", "Sissy", "Spurt", "Switch", "Thai", "Trap", "Trappy", "Trick"],
					situationDesc: `is a Free Cities sex slave, which makes ${him} female. It makes ${him} female despite several obvious physical issues, such as the fact that ${he}'s got an androgynous figure, or the fact that ${he} has a penis. Neither of these makes any real difference when a cock gets shoved down ${his} throat or stuffed up ${his} butt, but they're hard not to notice.`,
					applyDesc: `accepts that ${he}'s a little piece of shemale property.`,
					notApplyDesc: `will do ${his} best to serve as a nice little sex slave without explicit reference to how ${he}'s put together, or ${he}'ll be punished.`,
				});
			}
		}
		if (slave.anus > 2 || slave.vagina > 2) {
			nickMap.set("loose", {
				nicknameArray: ["Accommodating", "Blown Out", "Gaping", "Hallway", "Loose", "Loosey Goosey", "Noisy", "Open", "Overused", "Promiscuous", "Relaxed", "Roomy", "Sinkhole", "Size Queen", "Slit", "Sloppy", "Spacious", "Used", "Welcoming", "Whorish", "Wide Receiver", "Wideopen"],
				situationDesc: `has taken a lot of dick. Enough dick that ${his} overused holes really show the mileage. ${He} can take the largest cock without a sigh.`,
				applyDesc: `is proud of ${his} mileage, now that you've countenanced adding it to your name. Every cock ${he}'s taken, ${he}'s taken at your command.`,
				notApplyDesc: `realizes that ${he} isn't special just because ${he}'s been fucked so much, and understands that ${he}'ll have to do ${his} best to fuck like a fresh teenager no matter how loose ${he} gets.`,
			});
		}
		if (implanted) {
			nickMap.set("implants", {
				nicknameArray: ["Balloons", "Blown Up", "Blowup Doll", "Bolted-On", "Enhanced", "Expanded", "Fake", "Implanted", "Implants", "Plastic", "Plastique", "Silicone"],
				situationDesc: `is full of breast implants. They're so large it's quite obvious they're fake, and the implications are clear: ${He}'s a plastic slut, and the other slaves never tire of letting ${him} know it.`,
				applyDesc: `accepts the implicit mockery, knowing that ${his} bimbo-esque body is what appeals to ${his} ${getWrittenTitle(slave)}.`,
				notApplyDesc: `is relieved to be protected from the other slaves' mockery over ${his} implants, though ${he}'s also a little sad ${he} can't take them as a kind of trademark.`,
			});
		}
		if (bimboScore(slave) >= 6) {
			nickMap.set("bimbo", {
				nicknameArray: ["Airhead", "Barbie", "Bimbette", "Bimbo", "Bimboesque", "Bimbofied", "Blown Up", "Blowup Doll", "Brain Dead", "Broad", "Doxy", "Fake", "Floozie", "Fuck Toy", "Fuckmeat", "Plastic", "Plastique", "Sex Doll", "Silicone", "Tootsie"],
				situationDesc: `is ${implanted ? `full of implants, and ` : ``}stupid beyond stupid. ${implanted ? `It's obvious ${he}'s fake, and ${his} idiocy only confirms it: ${He}'s a bimbo slut, and the` : `The`} other slaves never tire of mocking ${him} for it, not caring that ${he} doesn't notice.`,
				applyDesc: `doesn't notice the mockery, only that ${he} now has a cute little nickname.`,
				notApplyDesc: `would be thankful for this protection from the other slaves' mockery if ${he} saw it as such, or was smart enough to notice it.`,
			});
		}
		if (slave.intelligence + slave.intelligenceImplant < -50) {
			nickMap.set("stupid", {
				nicknameArray: ["Brain Dead", "Cretin", "Dropout", "Dumb", "Dumbass", "Dummy", "Idiot", "Intellectually Challenged", "Nimrod", "Retard", "Retarded", "Short Bus", "Straight F Grades", "Stupid"],
				situationDesc: `is, quite simply, an uneducated dullard. Numerous slaves are a bit dumb, which makes it easier to break them, but ${he} takes the cake and throws it in the trash. Some of the other, smarter slaves, see fit to tease ${him} for it.`,
				applyDesc: `accepts this mockery happily, as if ${he} doesn't recognize it for what it is.`,
				notApplyDesc: `would be thankful for this protection from the other slaves' mockery if ${he} saw it as such, or was smart enough to notice it.`,
			});
		} else if (slave.intelligence + slave.intelligenceImplant > 50) {
			nickMap.set("smart", {
				nicknameArray: ["Brainiac", "Bright", "Clever", "Einstein", "Geek", "Genius", "Graduate", "Honor Roll", "Nerd", "Poindexter", "Prodigy", "Professor", "Smart", "Smartass", "Smarty", "Straight A Grades", "Whiz"],
				situationDesc: `is particularly brainy. A significant number of quality slaves are smart, but ${he} is especially so, and it shows. ${He} learns skills quicker, performs ${his} duties better, and can carry intellectual conversation if allowed. Other slaves deem this enough to mock ${him}.`,
				applyDesc: `is proud of ${his} intellect, and pleased that you have made it a part of ${his} identity.`,
				notApplyDesc: `accepts that ${his} intellect is merely of slight interest.`,
			});
			if (slave.energy > 95) {
				nickMap.set("smartslut", {
					nicknameArray: ["Sex Encyclopedia", "Fanny Book", "Dr. Fannyhole", "Professor Pervert", "Clever Whore", "Nerdy Slut", "Geeky Fannyhole", "Sexual Genius", "Honor-Roll Cunt", "Coitus Academia", "Straight-A Slut", "Shagging Sage", "Intellectual Slut", "Whoring Scholar", "Slutty Disciple"],
					situationDesc: `is both intelligent and promiscuous. ${His} unusually high intelligence and lust makes ${him} particularly curious of the perverse nature of ${his} sexual servitude. When ${he} is not busy gratifying the sexual needs of others, ${he} spends ${his} free time learning and experimenting with ${his} body, and has discovered plenty of clever and imaginative ways in which to satisfy the perverse desires of others. Other slaves tease ${him} for ${his} unusually academic approach towards sexual servitude.`,
					applyDesc: `loves the new nickname, and is pleased that you think ${his} mind and body should be used to satisfy the lust of those she serves.`,
					notApplyDesc: `accepts that ${his} intellect and lust is merely of slight interest.`,
				});
			}
		}
		if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			switch (slave.fetish) {
				case "buttslut":
					if (slave.anus > 0) {
						nickMap.set("buttslut", {
							nicknameArray: ["Anal Addict", "Anal", "Ass Pussy", "Assgasm", "Back Door", "Balloon Knot", "Bum-Love", "Butthole", "Buttslut", "Cornhole", "Greek", "Rear Entrance", "Rosebud", "Rump Pump", "Second Pussy", "Sodomite", "Sodomy", "Sphincter", "Swedish"],
							situationDesc: `loves it up the butt, and ${his} tastes in sex are hard to miss. ${He}'s a sex slave and takes it however it's given, but honest enjoyment is hard to fake and it's pretty obvious how much fun ${he} has when ${he}'s bent over and buttfucked. ${His} typical come-on is to bend over, reach around to spread ${his} buttocks, and wink ${his} anus by alternately clenching and relaxing ${his} sphincter.`,
							applyDesc: `knows that whatever the rest of ${his} slave life holds, it will involve ${his} slave rectum holding a lot of dick.`,
							notApplyDesc: `understands that ${he}'ll have to take what buttsex ${he} can get.`,
						});
					} else {
						nickMap.set("butt toy", {
							nicknameArray: ["Assplay", "Back Door", "Backside", "Behind", "Beso Negro", "Booty", "Butt Toy", "Buttcrack", "Butthole", "Buttjob", "Cheeky", "Hotdog", "Reach Around", "Rear End", "Rim Job", "Rump Roast", "Spanky", "Sphincter", "Stinky Pinky", "Tossed Salad"],
							situationDesc: `loves it when attention is lavished on ${his} butt, even though ${he} has never done anal. ${He}'s a sex slave and takes it however it's given, but honest enjoyment is hard to fake and it's pretty obvious how much fun ${he} has when a client is roughly groping ${his} rear. ${His} typical come-on is to 'accidentally' find ${his} client's dick hotdogged betwixt ${his} cheeks.`,
							applyDesc: `knows that whatever the rest of ${his} slave life holds, it will involve an ever-growing amount of attention to ${his} rear.`,
							notApplyDesc: `understands that ${he}'ll have to take what butt play ${he} can get.`,
						});
					}
					break;
				case "cumslut":
					nickMap.set("cumslut", {
						nicknameArray: ["Bukkake", "Cocksucker", "Cum Dumpster", "Cum", "Cumfiend", "Cumslut", "Deep Throat", "Dicksuck", "Facepussy", "Fellatio", "Gobbler", "Gokkun", "Guzzler", "Hoover", "Lip Service", "Meat Smoker", "No Gag Reflex", "Pearl Necklace", "Pole Smoker", "Receptacle", "Semen Demon", "Succubus", "Sucker", "Swallows", "Third Pussy", "Throat Meat", "Throatclit", "Vacuum", "Vampire"],
						situationDesc: `loves ${him} some cum. Most slaves have to put effort into showing enthusiasm when on their knees and presented with the second or third cock in a row. ${He}, on the other hand, maintains such a fetish for the stuff that ${he}'ll often suck it out of other slaves' holes, if allowed.`,
						applyDesc: `knows that as long as ${he}'s your slave, ${he}'ll get what ${he} needs.`,
						notApplyDesc: `understands that cum is a luxury and ${he}'ll have to savor what comes ${his} way naturally.`,
					});
					break;
				case "humiliation":
					nickMap.set("humiliation", {
						nicknameArray: ["Attention Whore", "Display Model", "Exhibitionist", "Flasher", "Flaunter", "Humiliated", "Humiliation", "Nudist", "Pornstar", "Public Display", "Rape", "Rapebait", "Shameless", "Showboat", "Showgirl", "Showoff"],
						situationDesc: `loves to show off. Where other slaves would blush, get embarrassed, and wish they could cover themselves, ${he} blushes, gets aroused, and enjoys the stares. Most other slaves are jealous of ${his} predilections. Not many slaves naturally enjoy being fucked in public, and ${he} can get off on it.`,
						applyDesc: `accepts ${his} new nickname without even pretending not to enjoy it. ${He}'s proud to fuck in plain view, and ${he} wants everyone to know it. And fuck ${him} in plain view.`,
						notApplyDesc: `understands that ${he}'s a sex slave first, and must fuck in private like ${he} were fucking in public.`,
					});
					break;
				case "submissive":
					nickMap.set("submissive", {
						nicknameArray: ["Acquiescent", "Bootlicker", "Bottom", "Clinger", "Doormat", "Face Down", "Follower", "Fuckee", "Gimp", "Humble", "Low Rung", "Meek", "Rapebait", "Secondary", "Servant", "Spineless", "Sub", "Submissive"],
						situationDesc: `loves sexual submission. Whatever ${he}'s doing, ${he} likes to be on the bottom. ${He}'d rather be facefucked than suck, and would rather take a dick than ride one. Some slaves look down on ${his} willingness to put ${himself} even farther below others, while some envy ${his} ability to enjoy things that they have to work to tolerate.`,
						applyDesc: `pretends to accept ${his} new nickname obediently, but is secretly pleased by recognition of ${his} submissive nature.`,
						notApplyDesc: `understands that being a submissive sex slave doesn't make ${him} special. All sex slaves must submit.`,
					});
			}
		}
		if (slave.counter.oral + slave.counter.vaginal + slave.counter.anal > 500) {
			nickMap.set("veteran", {
				nicknameArray: ["Cum Dumpster", "Cumdump", "Dirty", "Easy", "Experienced", "High Mileage", "Libertine", "Loose", "Overused", "Public Favorite", "Skank", "Slut", "Tired-Out", "Used", "Vet", "Veteran", "Village Bicycle", "Whore Queen", "Whore", "Worn"],
				situationDesc: `has been with you for a while, and ${he}'s gotten fucked a lot. Hundreds and hundreds of times over many weeks. Though ${he} does ${his} best, at times it can be obvious that there's very little that surprises ${him} any more. ${He}'s forgotten more sexual experience than many of your other slaves remember.`,
				applyDesc: `knows that you've noticed all ${his} hard work. Getting fucked day in and day out is harder than digging ditches, and ${he}'s a veteran ditchdigger.`,
				notApplyDesc: `understands that even though ${he}'s been fucked so much, ${he}'s still just meat; ${he} isn't special.`,
			});
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				nickMap.set("smartveteran", {
					nicknameArray: ["Cumdump Library", "Cumbucket Dictionary", "Dr. Whore-Pussy", "Professor Loosepussy", "Geeky Cumguzzler", "Nerdy Cumdump", "Cumguzzling Dweeb", "Public Fanny-Book", "Scholarly Cumhole", "Straight-A Cumbucket", "Veteran Sex Disciple", "Cum Beaker", "Lascivious Sage"],
					situationDesc: `has been with you for a while, and ${he}'s gotten fucked hundreds of times over several weeks. ${He} treats every sexual encounter seems like an academic challenge. By researching and experimenting with the anatomy of ${his} body, ${he} has greater understanding of satisfying the sexual cravings of others. Other slaves tease ${him} for ${his} unusually academic approach to sexual servitude.`,
					applyDesc: `is delighted that you've noticed ${his} hard work in learning about the pleasures of the flesh. ${He} recognizes that the best way to expand ${his} knowledge is through experience, ${his} mind and body are the perfect apparatus to obtain plenty of sexual experience.`,
					notApplyDesc: `understands that despite ${his} intelligence and sexual experience, ${he} isn't special.`,
				});
			}
		}
		if ((App.Medicine.fleshSize(slave, 'boobs') * slave.lactation) > 1000) {
			nickMap.set("cow", {
				nicknameArray: ["Beefcake", "Bessie", "Bovine", "Cheesehead", "Cow", "Cowbell", "Creamy", "Dairy Queen", "Heifer", "Holstein", "Mega Milk", "Milk Cans", "Milk Factory", "Milk Fountain", "Milkmaid", "Milky Udders", "Milky", "Moo", "Udders"],
				situationDesc: `is a good stock animal. ${His} body efficiently turns the cheap slave nutrition produced by your arcology into a never-ending river of rich milk.`,
				applyDesc: `knows that ${his} future involves many hours having ${his} nipples gently tugged by a milking machine.`,
				notApplyDesc: `understands that ${he} must continue to be a good milking slave, but that such duties do not necessarily define ${him}.`,
			});
		}
		if (slave.skill.oral <= 30 && slave.skill.anal <= 30) {
			nickMap.set("novice", {
				nicknameArray: ["Beginner", "Calamity", "Clumsy", "First Day", "Fresh Meat", "Fresh", "Freshman", "Fumbles", "Guppy", "Inexperienced", "Innocent", "New Kid", "Newbie", "Novice", "Rookie", "Slippery", "Sorry", "Tyro"],
				situationDesc: `does ${his} best; ${he} really tries. But ${he} simply hasn't mastered the skills that more experienced sex slaves take for granted. Though this can be annoying and at times even painful, it is a source of occasional slapstick comedy.`,
				applyDesc: `has a constant reminder that no matter how skilled a courtesan ${he} becomes, some of ${his} greatest hits will be told as amusing anecdotes for the rest of ${his} service.`,
				notApplyDesc: `understands that what matters is not what ${he} did yesterday, or how much they liked it, but what ${he} does today, and how much they like it.`,
			});
		}
		if (slave.skill.penetrative > 95 && canPenetrate(slave)) {
			nickMap.set("gigolo", {
				nicknameArray: ["Casanova", "Gigolo", "Lothario", "Stallion", "Stud"],
				situationDesc: `knows how to put ${his} dick to good use. Men don't appreciate the competition, and most women would rather not be fucked by a slave, but it is a skill none-the-less.`,
				applyDesc: `takes pride in ${his} new nickname and is thankful to be allowed to keep using ${his} cock; ${he} knows just how easily you can leave ${him} impotent should ${he} cross you.`,
				notApplyDesc: `understands that, while ${his} skill may be valuable, they aren't special. With proper training, anyone could take ${his} place.`,
			});
		}
		if (slave.breedingMark === 1 && V.propOutcome === 1 && FutureSocieties.isActive('FSRestart')) {
			nickMap.set("mark", {
				nicknameArray: ["Ass Kisser", "Breeder", "Chosen", "Conceited", "Connections", "Elite Breeder", "Elite", "Elitist", "Eugenicist", "Favors", "High and Mighty", "Lucky", "Mark", "Marked", "Nepotist", "Pedigree", "Privileged", "Special"],
				situationDesc: `is an Elite Breeder. ${He} has permanently been marked as the mother of society's children. If ${he} isn't currently swelling with life, ${he} will be soon. However, ${he} is also granted special benefits befitting the mother of future generations of gifted children.`,
				applyDesc: `takes pride in ${his} new nickname and the bond it displays between ${him} and ${his} sire. ${He} has to make sure that it doesn't go to ${his} head, though.`,
				notApplyDesc: `understands that ${he} is expected to obey and fuck just like any of your other slaves, regardless of ${his} status as a breeder.`,
			});
		}
		if (slave.bellyPreg >= 100 && slave.pregKnown === 1) {
			nickMap.set("preg", {
				nicknameArray: ["Breeder", "Breeding Bitch", "Breeding Cow", "Breeding Mare", "Breeding Sow", "Breeding Stock", "Broodmother", "Expecting", "Fertile", "Impregnated", "Knocked Up", "Mare", "Mommy", "Mother", "Ninpuchan", "Preg", "Preggers"],
				situationDesc: `is a breeding slave. ${His} belly seems to grow daily, unavoidable evidence that ${he}'s pregnant. Most men prefer slaves without pregnant stomachs, but those that enjoy them adore ${him}. ${He} occupies a strange place in slave culture, desired and abhorred, hopeful and fearful.`,
				applyDesc: `takes a bit of solace from ${his} new hope at ${his} nickname that ${he} will be allowed to complete ${his} pregnancy, and a bit of fear from ${his} suspicion that producing babies is ${his} whole future.`,
				notApplyDesc: `understands that ${he} is expected to obey, work, and fuck just like any of your other slaves, regardless of ${his} pregnancy.`,
			});
			if ((slave.ovaries === 1 && slave.vagina === 0) || (slave.mpreg === 1 && slave.anus === 0)) {
				nickMap.set("virgin preg", {
					nicknameArray: ["Aeiparthenos", "Almah", "Annunciated", "Baroness Ampthill", "Chimalman", "Dughdova", "Ever-Virgin", "Immaculate", "Miracle", "Miraculous", "Parthenogenetic", "Rhea Silvia", "Sofonim", "Virgin Mary"],
					situationDesc: `is pregnant, but that's not what makes ${him} special. ${He} still has an intact hymen, something completely unexpected of a ${girl} in the motherly way. Rumors and superstition surround ${him}.`,
					applyDesc: `takes a bit of solace from ${his} new hope at ${his} nickname that ${he} will be allowed to complete ${his} unusual pregnancy, and a bit of trepidation of what awaits ${him} when it comes time to give birth.`,
					notApplyDesc: `dreads and anticipates the day when ${he}'ll lose ${his} virginity, becoming just another pregnant slave.`,
				});
			}
		}

		if (slave.bellyPreg >= 30000 && slave.boobs >= 5000 && slave.butt > 5 && slave.hips >= 2 && slave.weight < 100) {
			nickMap.set("fertilityGoddess", {
				get nicknameArray() {
					switch (slave.nationality) {
						case "Ancient Chinese Revivalist":
						case "Chinese":
							return ["Jiutian Xuannü"];
						case "Ancient Egyptian Revivalist":
						case "Egyptian":
							return ["Bastet", "Hathor", "Heqet", "Isis", "Meskhenet", "Min", "Qetesh", "Taweret", "Tefnut"];
						case "Arabian Revivalist":
							return ["Al-Lat", "Al-Uzza"];
						case "Armenian":
							return ["Anahit"];
						case "Aztec Revivalist":
							return ["Xochiquetzal"];
						case "Cambodian":
						case "Laotian":
						case "Vietnamese":
							return ["Sowathara"];
						case "Edo Revivalist":
						case "Japanese":
							return ["Inari Ōkami", "Kisshōten"];
						case "Estonian":
						case "Finnish":
							return ["Rauni"];
						case "Ghanan":
							return ["Asase Ya"];
						case "Indian":
							return ["Aditi", "Bhūmi", "Manasa", "Parvati", "Sinivali"];
						case "Indonesian":
							return ["Dewi Sri"];
						case "Irish":
							return ["Brigid"];
						case "Latvian":
						case "Lithuanian":
							return ["Laima", "Saulė"];
						case "Nigerian":
							return ["Ala"];
						case "Roman Revivalist":
							return ["Epona", "Fecunditas", "Terra", "Venus"];
						default:
							if (slave.race === "white") {
								return ["Aphrodite", "Ceres", "Demeter", "Freyja", "Gaia", "Venus"];
							} else if (slave.race === "pacific islander") {
								return ["Haumea", "Nuakea"];
							} else if (slave.race === "catgirl") {
								return ["Juno", "Cybele"];
							} else if (slave.race === "amerindian") {
								return ["Atahensic", "Hanhepi Wi"];
							} else if (slave.race === "black") {
								return ["Ala", "Asase Ya"];
							} else {
								return ["Gaia", "Venus"];
							}
					}
				},
				situationDesc: `is the spitting image of a fertility idol. With ${his} wide hips, heavy bosom and fecund belly, ${he} lives up to the title.`,
				applyDesc: `takes pride in ${his} radiant form and hopes that ${he}'ll be treated as a goddess for possessing it.`,
				notApplyDesc: `accepts that ${his} motherly curves are just the mark of a sex slave and not a goddess.`,
			});
		}
		if (slave.prostate > 2 && slave.dick === 0 && slave.vagina > -1) {
			nickMap.set("superSquirter", {
				nicknameArray: ["Baby", "Bedwetter", "Deluge", "Flood Warning", "Fountain", "Geyser", "Girlcum", "Gusher", "Needs Diapers", "Panty Wetter", "Squirter", "Super Soaker", "Super Squirter", "Swim-Ready", "Water Park", "Wet"],
				situationDesc: `completely soaks ${himself} and ${his} partners whenever ${he} cums. Every orgasm from ${him} unleashes a waterfall of girlcum from ${his} pussy.`,
				applyDesc: `takes pride in the amount of girlcum ${he} makes, even though it looks like ${he} peed ${himself} when ${he} cums with ${his} clothes on.`,
				notApplyDesc: `understands that ${he} must learn to control ${himself} and stop soaking ${his} partners, clothes and bed.`,
			});
		}
		if (slave.labia > 1 && slave.vagina > -1) {
			nickMap.set("labia", {
				nicknameArray: ["Beefy", "Blooming", "Curtains", "Fanny Flaps", "Flaps", "Flower", "Folds", "Labes", "Labia", "Lips", "Lower Lips", "Meatflaps", "Petals", "Pussylips", "Roast Beef", "Roastie", "Vulva", "Wizard Sleeve"],
				situationDesc: `has pretty pussylips, larger than most girls'. When ${he}'s aroused they announce ${his} state to the whole world, becoming engorged with lust. Other slaves can't help but notice, and mock ${his} uniqueness down there.`,
				applyDesc: `really starts to see the appearance of ${his} pussy as a trademark. ${He}'s prouder of it than ${he} was before, and ${he} enjoys sex a bit more too, really appreciating it when ${he} gets to feel another slave gently nibble ${his} lovely folds.`,
				notApplyDesc: `accepts that the most important part of ${his} vagina is the warm, wet interior, not the generously endowed exterior.`,
			});
		}
		if (slave.boobs > 500 && slave.butt > 3 && slave.dick > 0) {
			nickMap.set("trans", {
				nicknameArray: ["Crying Game", "Deception", "Drag", "Gender Bender", "Girly", "Kathoey", "Ladyboy", "Legs Crossed", "Missie", "Queen", "Shemale", "Surprise", "T-Girl", "Tranny", "Trans", "Transgender", "Trap", "Trick"],
				situationDesc: `might have looked like a sissy or a trap at some point, but ${he} no longer does. ${He} has the curves and the face to be mistaken for a natural woman if ${he} wears clothes that conceal ${his} cock, which is an ability with all sorts of interesting uses. Mockery always fixes on what's unusual, of course, and some of your other slaves even envy ${his} equipment.`,
				applyDesc: `believes that you approve of ${him} as ${he} is now, and that ${he} can treat ${his} dick as an asset.`,
				notApplyDesc: `understands that ${he} must do ${his} best to fuck like the natural girl ${he} isn't.`,
			});
		}
		if (slave.dick > 0 && slave.balls === 0) {
			nickMap.set("gelding", {
				nicknameArray: ["Altered", "Ball-Less", "Castrated", "Clipped", "Cut", "Desexed", "Emasculate", "Empty", "Eunuch", "Fixed", "Gelded", "Gelding", "Limp", "Neutered", "Nipped", "Nutless", "Sackless", "Soft", "Spayed", "Sterile", "Sterilized", "Unman"],
				situationDesc: `is a Free Cities sex slave, which makes ${him} a girl. This is an easier thing for ${him} to accept since ${his} testicles were removed. The lack of testosterone makes ${him} docile and more accepting of ${his} proper role as a receptacle for hard dick. Naturally, other slaves have taken notice.`,
				applyDesc: `naturally viewed ${his} own castration as a subject of revulsion and horror. Now, though, ${he} begins to see ${himself} as filling a right and proper role as a gelded slave.`,
				notApplyDesc: `realizes that the process of turning ${him} from what ${he} was into what ${he} is did not make ${him} special.`,
			});
		}
		if (slave.vagina === -1 && slave.dick === 0 && slave.balls === 0) {
			nickMap.set("null", {
				nicknameArray: ["Agender", "Androgynous", "Angelic", "Asexual", "Barbie Doll", "Censored", "Cherub", "Devoid", "Featureless", "Genderless", "Groinless", "Hole-Less", "Mannequin", "Mutilated", "Netherless", "Nondescript", "Null", "Sewn", "Sexless", "Smooth", "Soft Groin", "Two-Hole", "Uniform", "Unproductive"],
				situationDesc: `has neither a penis nor a vagina; ${he} is a null, with nothing but soft skin on ${his} groin. Since ${he} is a Free Cities sex slave, that makes ${him} female, despite the androgyny of ${his} genitals. This sometimes makes ${his} life more difficult, as it only draws more attention to the availability of ${his} mouth or ass.`,
				applyDesc: `finds some perverse pride in ${his} genital makeup, which defies traditional notions of gender.`,
				notApplyDesc: `will try ${his} best to keep up with what's demanded of a sex slave, despite the annoyance of lacking genitals.`,
			});
		}
		return nickMap;
	}
};
