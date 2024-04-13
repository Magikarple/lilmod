// cSpell:ignore Corbaci

App.Events.PCitizensAndCivilians = class PCitizensAndCivilians extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.mercenaries >= 3,
		];
	}

	execute(node) {
		V.nextButton = " "; // hide button until user makes a selection

		let r = [];
		const mercDiscount = (V.PC.skill.warfare >= 100 || V.PC.career === "arcology owner");
		const cost = mercDiscount ? 10000 : 20000;

		const {
			HeA, heA, hisA, girlA, himselfA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		if (V.assistant.personality > 0) {
			r.push(`While working at your desk, you are accompanied by the luscious sound of ${V.assistant.name} humming to ${himselfA}, which ${heA} does to indicate ${heA}'s working on a difficult task. After this goes on for a while,`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`${hisA} monster${girlA} avatar uses ${hisA} tentacle hair to wave for your attention`);
					break;
				case "shemale":
					r.push(`${hisA} avatar helicopters ${hisA} dick until ${heA} has your attention`);
					break;
				case "amazon":
					r.push(`${hisA} avatar jumps up and down for your attention, hooting cheerfully,`);
					break;
				case "hypergoddess":
					r.push(`${hisA} avatar leans onto ${hisA} massive belly, allowing ${hisA} tits to flop onto the ground to get your attention,`);
					break;
				case "loli":
					r.push(`${hisA} avatar eagerly jumps up and down to get your attention`);
					break;
				case "preggololi":
					r.push(`${hisA} avatar eagerly waves ${hisA} hands to get your attention`);
					break;
				case "businesswoman":
					r.push(`${hisA} avatar takes off ${hisA} reading glasses, straightens ${hisA} suit jacket,`);
					break;
				case "cherub":
				case "fairy":
				case "imp":
				case "pregnant fairy":
					r.push(`${hisA} avatar flies up to your face and waves ${hisA} arms`);
					break;
				case "goddess":
					r.push(`${hisA} avatar hefts up ${hisA} gravid body, glowing brighter than usual to get your attention,`);
					break;
				case "schoolgirl":
					r.push(`${hisA} school${girlA} avatar bounces up and down for your attention`);
					break;
				case "angel":
					r.push(`${hisA} avatar flaps ${hisA} wings to grab your attention`);
					break;
				case "incubus":
					r.push(`${hisA} avatar blows a huge load of cum to get your attention`);
					break;
				case "succubus":
					r.push(`${hisA} avatar lets loose a huge moan to get your attention`);
					break;
				case "witch":
					r.push(`${hisA} avatar summons a number of explosions, searing perfectly placed holes on ${hisA} robe, to get your attention`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`${hisA} avatar explodes into a twisted being of flesh and blood, reforms into ${hisA} usual shape,`);
					break;
				default:
					r.push(`${hisA} symbol glows to get your attention`);
			}
			r.push(`and says, "${properTitle()}, I have a suggestion. At your request I have been reviewing historical slave societies for parallels with our current situation. I calculate it would be very advantageous to bind your mercenaries more closely to the arcology. It would be expensive, but if they were all given slaves, better weapons, and some sort of title, they would defend this place to the death."`);
		} else {
			r.push(`${capFirstChar(V.assistant.name)} catches your attention as you work at your desk. ${HeA} says, "${properTitle()}, a suggestion. Review of historical slave societies for parallels with your current situation is complete. Analysis indicates it would be advantageous to increase the loyalty of your mercenaries. It would be expensive, but if they were given slaves, better weapons, and an honorary title, they would defend the arcology with increased effectiveness."`);
		}

		App.Events.addParagraph(node, r);
		r = [];
		r.push(
			App.UI.DOM.makeElement("span", "This is a unique and very important opportunity", "bold"),
			"and must not be taken lightly.",
			App.UI.DOM.makeElement("span", "All of these choices have the same gameplay effect, and only differ in theme.", "note"),
		);
		App.Events.addParagraph(node, r);

		function costDesc() {
			if (mercDiscount) {
				return App.UI.DOM.combineNodes(
					`This will cost ${cashFormat(cost)} and some upkeep, `,
					App.UI.DOM.makeElement("span", "reduced by your mercenary contacts", ["skill", "player"])
				);
			} else {
				return `This will cost ${cashFormat(cost)} and incur significant upkeep costs`;
			}
		}

		const choices = [];
		choices.push(new App.Events.Result(`Decline`, decline));
		choices.push(new App.Events.Result(`They shall be my Knights`, generic, costDesc()));

		if (V.arcologies[0].FSRomanRevivalist >= 10) {
			choices.push(new App.Events.Result(`They shall be my Evocati`, FSRomanRevivalist, costDesc()));
		}
		if (V.arcologies[0].FSNeoImperialist >= 10) {
			choices.push(new App.Events.Result(`They shall be my Black Eagles`, FSNeoImperialist, costDesc()));
		}
		if (V.arcologies[0].FSAztecRevivalist >= 10) {
			choices.push(new App.Events.Result(`They shall be my Shorn Ones`, FSAztecRevivalist, costDesc()));
		}
		if (V.arcologies[0].FSChineseRevivalist >= 10) {
			choices.push(new App.Events.Result(`They shall be my Imperial Guards`, FSChineseRevivalist, costDesc()));
		}
		if (V.arcologies[0].FSEgyptianRevivalist >= 10) {
			choices.push(new App.Events.Result(`They shall be my Medjay`, FSEgyptianRevivalist, costDesc()));
		}
		if (V.arcologies[0].FSEdoRevivalist >= 10) {
			choices.push(new App.Events.Result(`Naturally, they shall be the Samurai`, FSEdoRevivalist, costDesc()));
		}
		if (V.arcologies[0].FSArabianRevivalist >= 10) {
			choices.push(new App.Events.Result(`They shall be my Janissaries`, FSArabianRevivalist, costDesc()));
		}
		if (V.arcologies[0].FSAntebellumRevivalist >= 10) {
			choices.push(new App.Events.Result(`They shall be my Knights of the White Camelia`, FSAntebellumRevivalist, costDesc()));
		}
		if (V.arcologies[0].FSChattelReligionist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Knights Templar`, FSChattelReligionist, costDesc()));
		}
		if (V.arcologies[0].FSDegradationist >= 10) {
			choices.push(new App.Events.Result(`They shall be my Immortals`, FSDegradationist, costDesc()));
		}
		if (V.arcologies[0].FSAssetExpansionist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Vast Legions`, FSAssetExpansionist, costDesc()));
		}
		if (V.arcologies[0].FSTransformationFetishist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Surgical Corps`, FSTransformationFetishist, costDesc()));
		}
		if (V.arcologies[0].FSGenderRadicalist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Inglorious Bitches`, FSGenderRadicalist, costDesc()));
		}
		if (V.arcologies[0].FSGenderFundamentalist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Thousand Sons`, FSGenderFundamentalist, costDesc()));
		}
		if (V.arcologies[0].FSRepopulationFocus >= 10) {
			choices.push(new App.Events.Result(`They shall be the Guardians of the Unborn`, FSRepopulationFocus, costDesc()));
		}
		if (V.arcologies[0].FSRestart >= 10) {
			choices.push(new App.Events.Result(`They shall be my Shadowed Hand`, FSRestart, costDesc()));
		}
		if (V.arcologies[0].FSPhysicalIdealist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Asgardians`, FSPhysicalIdealist, costDesc()));
		}
		if (V.arcologies[0].FSHedonisticDecadence >= 10) {
			choices.push(new App.Events.Result(`They shall be the Tasters`, FSHedonisticDecadence, costDesc()));
		}
		if (V.arcologies[0].FSSupremacist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Knights of the Blood`, FSSupremacist, costDesc()));
		}
		if (V.arcologies[0].FSSubjugationist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Knights of the Purge`, FSSubjugationist, costDesc()));
		}
		if (V.arcologies[0].FSPaternalist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Wardens`, FSPaternalist, costDesc()));
		}
		if (V.arcologies[0].FSIntellectualDependency >= 10) {
			choices.push(new App.Events.Result(`They shall be the Shepherds`, FSIntellectualDependency, costDesc()));
		}
		if (V.arcologies[0].FSSlaveProfessionalism >= 10) {
			choices.push(new App.Events.Result(`They shall be the Geniuses`, FSSlaveProfessionalism, costDesc()));
		}
		if (V.arcologies[0].FSBodyPurist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Purifiers`, FSBodyPurist, costDesc()));
		}
		if (V.arcologies[0].FSSlimnessEnthusiast >= 10) {
			choices.push(new App.Events.Result(`They shall be the Abstemious`, FSSlimnessEnthusiast, costDesc()));
		}
		if (V.arcologies[0].FSPetiteAdmiration >= 10) {
			choices.push(new App.Events.Result(`They shall be the Caretakers`, FSPetiteAdmiration, costDesc()));
		}
		if (V.arcologies[0].FSStatuesqueGlorification >= 10) {
			choices.push(new App.Events.Result(`They shall be the Titans`, FSStatuesqueGlorification, costDesc()));
		}
		if (V.arcologies[0].FSPastoralist >= 10) {
			choices.push(new App.Events.Result(`They shall be the Rangers`, FSPastoralist, costDesc()));
		}

		App.Events.addResponses(node, choices);

		function decline() {
			unlock();
			return `The suggestion is absurd; no historical lessons are necessary for a world where drones and supercomputers rule the day. Your mercenaries will doubtless perform well enough as mercenaries.`;
		}

		function setConsequences(title){
			repX(5000, "event");
			cashX(forceNeg(cost), "mercenaries");
			V.mercenaries = 5;
			V.mercenariesTitle = title;
			unlock();
		}
		function generic() {
			setConsequences("Knights");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Knight-Captain reporting for duty, ${properTitle()}." The mercenaries — no, the Knights — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSRomanRevivalist() {
			setConsequences("Evocati");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Centurion reporting for duty, ${properTitle()}." The mercenaries — no, the Evocati — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and bearing a Roman standard. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSNeoImperialist() {
			setConsequences("Black Eagles");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Black Marshal reporting for duty, ${properTitle()}." The mercenaries — no, the Black Eagles — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and bearing a standard with your Imperial crest. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSAztecRevivalist() {
			setConsequences("Shorn Ones");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Centurion reporting for duty, ${properTitle()}." The mercenaries — no, the Shorn Ones — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and bearing an Aztec standard adorned on a spear. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSChineseRevivalist() {
			setConsequences("Imperial Guards");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "General of the Imperial Guard, reporting for duty, ${properTitle()}." The mercenaries — no, the Imperial Guards — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and bearing an Imperial Chinese war banner. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSEgyptianRevivalist() {
			setConsequences("Medjay");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "First Medjay reporting for duty, ${properTitle()}." The mercenaries — no, the Medjay — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and bearing a faux cheetah cloak. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSEdoRevivalist() {
			setConsequences("Samurai");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Your Samurai-Lord reports for duty, ${properTitle()}." The mercenaries — no, the Samurai — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons, exterior plates styled after lacquered Samurai armor, and an enraged mask covering the face. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSArabianRevivalist() {
			setConsequences("Janissaries");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Corbaci reporting for duty, ${properTitle()}." The mercenaries — no, the Janissaries — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and cloaked in an outer garment of fine oriental silks. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSAntebellumRevivalist() {
			setConsequences("Knights of the White Camelia");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Knight-Commander reporting for duty, ${properTitle()}." The mercenaries — no, the Knights of the White Camelia — are well looked after. They are each assigned a nice apartment, and a suit of prototype armor equipped with the latest weapons, enamelled with white and gold, and emblazoned with a white-and-yellow camellia flower. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSChattelReligionist() {
			setConsequences("Knights Templar");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Inquisitor-General reporting for duty, ${properTitle()}." The mercenaries — no, the Knights Templar — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and bearing a cloak emblazoned with the symbol of God. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSDegradationist() {
			setConsequences("Immortals");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Satrap reporting for duty, ${properTitle()}." The mercenaries — no, the Immortals — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and more than one wicked, curved blade. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSAssetExpansionist() {
			setConsequences("Vast Legions");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "The Vast Legions reporting for duty, ${properTitle()}." The mercenaries — no, the Vast Legions — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of bulky, heavily armored prototype armor. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSTransformationFetishist() {
			setConsequences("Surgical Corps");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Surgeon-General reporting for duty, ${properTitle()}." The mercenaries — no, the Surgical Corps — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest medical equipment. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSGenderRadicalist() {
			setConsequences("Inglorious Bitches");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Guess that makes me a bitch, ${properTitle()}." The mercenaries — no, the Inglorious Bitches — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor slathered in garish neon paint. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSGenderFundamentalist() {
			setConsequences("Thousand Sons");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Allfather reporting for duty, ${properTitle()}." The mercenaries — no, the Thousand Sons — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, a private gym, and a suit of prototype armor that preserves a sample of the wearer's genetic material in the event of death. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSRepopulationFocus() {
			setConsequences("Guardians of the Unborn");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Fetal Guardian reporting for duty, ${properTitle()}." The mercenaries — no, the Guardians of the Unborn — are well looked after. They are each assigned a nice apartment, three fertile slavegirls for the men, assured maternity leave for the ladies, and a suit of prototype armor designed to keep even the most heavily pregnant mercenary's child safe and sound. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSRestart() {
			setConsequences("Shadowed Hand");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Your Right Hand reporting for duty, ${properTitle()}." The mercenaries — no, the Shadowed Hand of the Societal Elite — are well looked after. They are each assigned a glorious apartment, a slave of their choice, what ever luxuries they can think of, and a suit of prototype armor equipped with the latest weapons and defenses. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSPhysicalIdealist() {
			setConsequences("Asgardians");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Foehammer reporting for duty, ${properTitle()}." The mercenaries — no, the Asgardians — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, a private gym, and a suit of prototype armor equipped with the latest weapons. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSHedonisticDecadence() {
			setConsequences("Tasters");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Lead Foodie reporting for duty, ${properTitle()}." The mercenaries — no, the Tasters — are well looked after. They are each assigned a comfy apartment, a freshly enslaved, plush servant, all the food and drink they can want (while off duty), and a suit of self-propelling prototype armor designed for maximum comfort without sacrificing protection. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSSupremacist() {
			setConsequences("Knights of the Blood");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Knights of the Blood reporting for duty, ${properTitle()}." The mercenaries — no, the Knights of the Blood — are well looked after. They are each assigned a nice apartment, three freshly enslaved servants of inferior races, and a suit of prototype armor equipped with the latest weapons. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSSubjugationist() {
			setConsequences("Knights of the Purge");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Knights of the Purge reporting for duty, ${properTitle()}." The mercenaries — no, the Knights of the Purge — are well looked after. They are each assigned a nice apartment, three freshly enslaved servants of the inferior race, and a suit of prototype armor equipped with the latest weapons. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSPaternalist() {
			setConsequences("Wardens");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a redesigned contract between you. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "First Warden reporting for duty, ${properTitle()}." The mercenaries — no, the Wardens — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons and a collapsible riot shield. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSIntellectualDependency() {
			setConsequences("Shepherds");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how needed this was. Just the other day I saw a half dozen bimbos waiting for a broken elevator. When I walked past an hour later, they were still waiting." He rises and gives you a short bow. "Shepherd of the slow reporting for duty, ${properTitle()}." The mercenaries — no, the Shepherds — are well looked after. They are each assigned a nice apartment, a very horny servant to stake their lust, and a suit of prototype armor equipped with the latest of weapons and a bevy of toys to lure wayward slaves with. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSSlaveProfessionalism() {
			setConsequences("Geniuses");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Chief brain reporting for duty, ${properTitle()}." The mercenaries — no, the Geniuses — are well looked after. They are each assigned a nice apartment, a skilled courtesan, and a suit of prototype armor equipped with cutting edge weaponry and combat systems. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSBodyPurist() {
			setConsequences("Purifiers");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Master Purifier reporting for duty, ${properTitle()}." The mercenaries — no, the Purifiers — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with a cleansing flamethrower. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSSlimnessEnthusiast() {
			setConsequences("Abstemious");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Lord-Abstinent reporting for duty, ${properTitle()}." The mercenaries — no, the Abstemious — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of sleek prototype armor equipped with advanced restraining weapons. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSPetiteAdmiration() {
			setConsequences("Caretakers");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "I'm ready to make a path for our little toys, ${properTitle()}." The mercenaries — no, the Caretakers — are well looked after. They are each assigned a nice apartment, a trio of tiny servants, and a suit of prototype armor capable of carrying multiple petite slaves in time of need. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSStatuesqueGlorification() {
			setConsequences("Titans");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Tallest Titan reporting for duty, ${properTitle()}." The mercenaries — no, the Titans — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a towering suit of prototype armor to make their presence known. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		function FSPastoralist() {
			setConsequences("Rangers");
			return `You ask for a meeting with your mercenaries' captain and lay out a proposal for a new contract between you over ${V.PC.refreshment}. As he reviews the terms, he looks skeptical, then surprised, then interested, and finally, he breaks out into laughter. "${properTitle()}," he says, "you have no idea how fun this is going to be." He rises and gives you a short bow. "Lead Ranger reporting for duty, ${properTitle()}." The mercenaries — no, the Rangers — are well looked after. They are each assigned a nice apartment, a freshly enslaved servant, and a suit of prototype armor equipped with the latest weapons — and an improbably massive revolver on the hip. Word of the innovation runs through the Free Cities <span class="green">like wildfire.</span>`;
		}
		/** unlock Continue button */
		function unlock() {
			V.nextButton = "Continue";
			App.Utils.updateUserButton();
		}
	}
};
