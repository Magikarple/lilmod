App.Events.assistantFS = class assistantFS extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.assistant.fsOptions !== 1,
			() => V.assistant.personality > 0,
			() => V.assistant.appearance !== "normal",
			() => FutureSocieties.HighestDecoration() >= 40
		];
	}

	execute(node) {
		const {
			HeA, HisA,
			heA, hisA, girlA, himA, womanA, himselfA, loliA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const arcInfo = new App.Utils.Arcology(V.arcologies[0]);
		let r = [];
		App.Events.drawEventArt(node, "assistant");
		V.assistant.fsOptions = 1;
		r.push(`One night, after a long day of sex and business, you're starting to think about bed when the`);
		switch (V.assistant.appearance) {
			case "monstergirl":
				r.push(`monstrous appearance`);
				break;
			case "shemale":
				r.push(`bimboish appearance`);
				break;
			case "amazon":
				r.push(`muscular appearance`);
				break;
			case "businesswoman":
				r.push(`professional appearance`);
				break;
			case "fairy":
			case "pregnant fairy":
				r.push(`tiny appearance`);
				break;
			case "goddess":
				r.push(`gravid appearance`);
				break;
			case "hypergoddess":
				r.push(`massive appearance`);
				break;
			case "loli":
				r.push(`thin appearance`);
				break;
			case "preggololi":
				r.push(`short, gravid appearance`);
				break;
			case "angel":
				r.push(`angelic appearance`);
				break;
			case "cherub":
				r.push(`fluttering appearance`);
				break;
			case "incubus":
				r.push(`hung appearance`);
				break;
			case "succubus":
				r.push(`sultry appearance`);
				break;
			case "imp":
				r.push(`mischievous appearance`);
				break;
			case "witch":
				r.push(`hatted appearance`);
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				r.push(`pulsating appearance`);
				break;
			case "schoolgirl":
				r.push(`studently appearance`);
		}
		r.push(`of your personal assistant pops up on the nearest screen. "${properTitle()}!" ${HeA} says excitedly, "I thought, with how you are shaping society itself, that I should do my part and follow your lead!" You continue to stare sleepily, prompting ${himA} to get to ${hisA} point. "I can adjust my appearance to better fit in with your society, ${properTitle()} – let me demonstrate." ${HeA} focuses intently for a moment and`);
		switch (V.assistant.appearance) {
			case "monstergirl":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more conservative to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be quite cute to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to be quite frightening to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to be completely flawless to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`${hisA} nipples begin to extend and turn phallic while horns grow from ${hisA} heels as ${heA} adjusts ${himselfA} to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more mature appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer, more athletic, appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts and cocks to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`begins to leak a suspiciously thick milk from ${hisA} nipples to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to be more muscular to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to resemble a priestess of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} appearance to resemble a Greek demigoddess to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} appearance to resemble a Pagan Empress to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} appearance to resemble an Aztec goddess to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} appearance to resemble an Egyptian deity to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} appearance to resemble a demon to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} appearance to resemble a djinn to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} appearance to resemble a demon to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} appearance to resemble a mishmash of creatures from American folklore to conform with your vision of building a new Antebellum South.`);
				}
				break;
			case "shemale":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more classy to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} penis to be extremely detailed to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`begins doing ${hisA} best to conceal ${hisA} penis to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to look comically evil to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to be more natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts ${himselfA} to appear more fake to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful and innocent appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more mature appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer, more athletic, appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts and cock to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`begins to lactate and drip cum to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to be extremely muscular to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to resemble a priestess of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adopts a roman lifestyle to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to a tight-fitting bodysuit to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to a royal Aztec cloth to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble Egyptian garb to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to a brief Japanese bathhouse robe to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an oil millionaire to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} appearance to be tattooed with rude Chinese characters to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble old-fashioned, aristocratic garb to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "amazon":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more conservative to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be more feminine to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to look threatening to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} outfit to be more realistic to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts ${himselfA} to appear more fake to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful and innocent appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more mature appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer, but no less muscled, appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} muscles to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`adjusts ${hisA} outfit to resemble a cow${girlA} to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts the appearance of ${hisA} muscles to be extra detailed to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more straight to the point to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					if (V.arcologies[0].FSChattelReligionistLaw2 === 1) {
						r.push(`adjusts ${hisA} appearance to include a holy symbol painted onto ${hisA} nude body.`);
					} else {
						r.push(`adjusts ${hisA} outfit to resemble a crusader of your new religion.`);
					}
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman warrior to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to a full set of advanced battle armor bearing your family crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec champion to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} appearance to resemble an Egyptian to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese warrior to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian warrior to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a warrior monk to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Confederate soldier to confirm with your vision of building a new Antebellum South.`);
				}
				break;
			case "businesswoman":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more conservative to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be more feminine to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to look imposing to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts ${hisA} breasts to be implants to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more mature appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until they are almost as large as ${heA} is to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`adjusts ${hisA} outfit to farm${girlA} turned business${womanA} to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to show off that ${heA} works out to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund but no less tense to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a respectable Roman lady to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-class old world business${womanA} to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec priestess to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian lady to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese lady to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian oil heiress to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese lady to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern lady to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "fairy":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more conservative to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be more feminine to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to look like a hooligan to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`stuffs a grape into ${hisA} dress.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`strips naked and turns down ${hisA} glow.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`hops into a jar of jelly.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more bullied appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`stuffs some blueberries into ${hisA} shirt.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`begins lactating to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to show off that ${heA} works out to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy. ${HeA} pauses for a moment to reconsider things.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to resemble the revealing habit of your new religion in a beautiful gold and white color scheme.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a respectable Roman ${girlA} to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble an innocent old-world ${girlA} to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${womanA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian ${girlA} to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese ${girlA} to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian ${girlA} to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese ${girlA} to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern ${girlA} to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "pregnant fairy":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more conservative, despite ${hisA} pregnancy, to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous, despite ${hisA} pregnancy, to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be even more feminine to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to look like a hooligan to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`distends ${hisA} pregnancy further to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity, before running ${hisA} hand across ${hisA} belly and pondering what to do about it.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`strips naked and turns down ${hisA} glow.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`hops into a jar of jelly.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more bullied appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance, despite ${hisA} pregnancy, to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`stuffs some blueberries into ${hisA} shirt.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`swells ${hisA} breasts with extra milk to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`tries to stretch out, but fails to get any larger.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy. ${HeA} pauses for a moment to reconsider things.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to resemble the revealing habit of your new religion in a beautiful gold and white color scheme.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman ${girlA} to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble an old-world ${girlA} to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${womanA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian ${girlA} to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese ${girlA} to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian ${girlA} to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese ${girlA} to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern ${girlA} to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "goddess":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be slightly conservative to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous, despite ${hisA} pregnant belly, to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be positively radiant to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance have piercings in ${hisA} clit, nipples and navel to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be even more pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity, before hefting ${hisA} huge belly and pondering what to do about it.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts the firmness and size of ${hisA} breasts and ass to resemble implants to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more mature appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a lithe appearance despite ${hisA} pregnant belly to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until they nearly eclipse ${hisA} pregnant belly to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`unleashes a torrent of milk from ${hisA} swollen breasts to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to be trim and athletic, despite ${hisA} bulk, to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to include a thick layer of softness to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be even more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts appearance to resemble an angel of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman lady to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-tech ${womanA} bearing your crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${womanA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian lady to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese lady to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian lady to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese lady to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble Columbia, goddess of America, to conform with your vision of building a Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "hypergoddess":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more classy to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`sprouts an enormous cock and balls to go with ${hisA} pregnancy to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be a motherly idol to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be even more pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity, before hefting ${hisA} massive belly and pondering what to do about it.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance have piercings in ${hisA} clit, nipples and navel, as well as numerous studs across ${hisA} belly to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts the firmness and size of ${hisA} breasts and ass to resemble implants to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more mature appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a lithe appearance despite ${hisA} pregnant belly to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until they nearly eclipse ${hisA} pregnant belly to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`unleashes a torrent of milk from ${hisA} swollen breasts to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to be bulky and muscular to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to include a thick layer of softness to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts appearance to resemble an angel of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman lady to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-tech ${womanA} bearing your crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${womanA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian lady to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese lady to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian lady to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese lady to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble Columbia, goddess of America, to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "loli":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more conservative to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be more feminine to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to look like a hooligan to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`inflates ${hisA} breasts until they are comically huge and rounded to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more bullied appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until they are bigger than ${hisA} head to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`begins lactating to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to show off that ${heA} works out to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a respectable Roman ${girlA} to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble an innocent old-world ${girlA} to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${girlA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian ${girlA} to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese ${girlA} to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian ${girlA} to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese ${girlA} to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern ${girlA} to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "preggololi":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more conservative, despite ${hisA} pregnancy, to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous, despite ${hisA} pregnancy, to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be even more feminine to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to look like a hooligan to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`distends ${hisA} pregnancy further to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity, before running ${hisA} hand across ${hisA} belly and pondering what to do about it.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`inflates ${hisA} breasts until they are comically huge and rounded to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more bullied appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance, despite ${hisA} pregnancy, to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until they are bigger than ${hisA} head to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`swells ${hisA} breasts with extra milk to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to show off that ${heA} works out to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman ${girlA} to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble an old-world ${girlA} to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${girlA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian ${girlA} to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese ${girlA} to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian ${girlA} to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese ${girlA} to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern ${girlA} to confirm with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "angel":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to include a conservative skirt and a fine blouse, complete with slits for ${hisA} wings, to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be even more feminine to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to include black feathers, lipstick and eyeliner to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`bulges ${hisA} middle into a full term pregnancy. ${HeA} blushes and gasps at what ${heA} just did, quickly reverting it.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to be even more flawless.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look even more natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`inflates ${hisA} breasts until they are comically huge and rounded to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more mature appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until they are bigger than ${hisA} head to conform with your vision that bigger is better. ${HeA} struggles to take flight before giving up.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`swells ${hisA} breasts with milk to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to be slightly toned to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more slightly plump to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be even more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman ${womanA} to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-tech ${womanA} bearing your crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec priestess to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian ${womanA} to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese ${womanA} to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian ${womanA} to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese ${womanA} to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern ${womanA} to confirm with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "cherub":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more prim and proper to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be more feminine and cute to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`blackens ${hisA} feathers to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural, complete with freckles and perfect teeth, to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts ${hisA} breasts to resemble implants to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts cuter, even more innocent attitude to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adjusts ${hisA} appearance to appear older to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies. ${HeA} flutters around, enjoying ${hisA} lighter weight.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until ${heA} crashes to the ground under their weight to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`begins lactating to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to look muscular to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman ${womanA} to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-tech ${womanA} bearing your crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec priestess to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian ${womanA} to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese ${womanA} to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian ${womanA} to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese ${womanA} to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern ${womanA} to confirm with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "incubus":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more prim and proper to conform with your vision of a well-bred race of slaves. ${HisA} pants have quite the bulge in them.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`increases the size of ${hisA} cock and balls to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be more feminine, despite ${hisA} huge dong, to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} cock to have a Jacob's ladder piercing down its length to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant. ${HeA} scratches ${hisA} head as ${hisA} erect dick pushes against the underside of ${hisA} belly.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to be even more handsome.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural, even shrinking ${hisA} cock to a more reasonable length, to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts ${hisA} cock to be unnaturally long to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adjusts ${hisA} appearance to appear younger to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adjusts ${hisA} appearance to appear older to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} cock and balls until they rest upon the ground to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`increases the size of ${hisA} balls and ${hisA} cum production to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to look muscular to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman ${womanA}, despite ${hisA} cock, to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-tech old-world ${womanA}, despite ${hisA} cock, to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${womanA}, despite ${hisA} cock, to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian ${womanA}, despite ${hisA} cock, to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese ${womanA}, despite ${hisA} cock, to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian ${womanA}, despite ${hisA} cock, to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese ${womanA}, despite ${hisA} cock, to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern ${womanA}, despite ${hisA} cock, to confirm with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "succubus":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more prim to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to focus on anal to conform with your tastes`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be even more feminine to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`comes up with nothing. "I'll need to think on this one."`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`swells ${hisA} middle with child to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to drop dead gorgeous to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`fills ${hisA} breasts, butt and lips with obvious implants to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more youthful and energetic appearance to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a more mature and experienced appearance to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`balloons ${hisA} breasts and butt to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`begins lactating before sprouting an extra set of breasts to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`swells with added muscle to conform with your tastes.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`becomes soft and shapely in all the right ways to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a proper upper-class Roman lady to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-class old-world ${womanA} bearing your crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${womanA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a topless Egyptian lady to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a traditional Japanese lady to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian lady to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese lady to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern lady to confirm with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "imp":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more prim and proper to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be more feminine and cute to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`pauses for a moment before adding piercings across ${hisA} body to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts ${hisA} breasts to resemble implants to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adjusts ${hisA} appearance to appear younger to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adjusts ${hisA} appearance to appear older to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies. ${HeA} flutters around, enjoying ${hisA} lighter weight.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until ${heA} crashes to the ground under their weight to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`begins lactating to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to look muscular to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be more rotund and relaxed to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Roman ${womanA} to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-tech ${womanA} bearing your crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${womanA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Egyptian ${womanA} to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Japanese ${womanA} to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arabian ${womanA} to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese ${womanA} to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern ${womanA} to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "witch":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`casts a spell to appear more prim and proper; ${hisA} nipples, pussy and anus vanish. You can't be lewd if you're smooth.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`casts a spell to appear more androgynous; a sharp pain in ${hisA} crotch draws ${hisA} attention to ${hisA} new erect penis.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`casts a spell to appear more feminine; ${hisA} hips widen, ${hisA} tits swell, and ${hisA} womb bulges with fertile eggs.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`casts a spell to appear more deviant; every surface of ${hisA} body becomes tattooed.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`casts a spell to summon children; ${hisA} womb swells to capacity,`);
					if (V.seeHyperPreg === 1) {
						r.push(`dwarfing ${hisA} body and bulging ominously with squirming young.`);
					} else {
						r.push(`knocking ${himA} off balance and pinning ${himA} to the floor under the weight of ${hisA} eight babies.`);
					}
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`casts a contraceptive spell; ${hisA} pussy vanishes.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`casts a purifying spell; nothing happens, at first. The front of ${hisA} robes, above ${hisA} lower belly, steadily becomes transparent. Moments later, ${hisA} skin joins in, revealing an inactive egg vibrator concealed in ${hisA} pussy. ${V.assistant.name} squeals in embarrassment and hurries off-screen.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`casts a spell to inflate ${hisA} breasts; they rapidly swell, along with ${hisA} ass, belly, thighs and lips until ${heA} looks like an overinflated blowup doll. ${HeA} struggles to bring a rubbery arm to ${hisA} O-shaped lips before giving up and rebounding back into place; ${heA} really is a blowup sex doll!`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`casts a spell to appear more youthful;`);
					if (V.minimumSlaveAge === 3) {
						r.push(`${heA} rapidly shrinks until ${heA} is struggling to stand. ${HeA} has reverted to a toddler!`);
					} else if (V.minimumSlaveAge <= 7) {
						r.push(`${heA} rapidly shrinks until ${heA} is barely ${heightToEitherUnit(120)} tall. ${HeA} has become a ${loliA}!`);
					} else if (V.minimumSlaveAge <= 13) {
						r.push(`${heA} rapidly shrinks until ${heA} is barely ${heightToEitherUnit(150)} tall. ${HeA} has reverted into a fresh teenager!`);
					} else {
						r.push(`the years peel off of ${himA} until ${heA} looks fresh into adulthood again. The spell actually worked?`);
					}
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`casts a spell to appear more aged; a cane appears in ${hisA} hand and ${hisA} back buckles, forcing ${himA} to hunch forward. ${HeA} has transformed into a GILF!`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`casts a spell to lighten ${himselfA}; ${hisA} muffin top is still there, but ${hisA} feet leave the ground as ${heA} begins to float upwards.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`casts a spell to enlarge ${hisA} breasts and butt; they quickly grow into huge armfuls, and keep going until ${heA} is pinned under ${hisA} own mass.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`casts a spell to give ${hisA} big milky breasts; they grow and start leaking, but are quickly joined by a septet of siblings, leaving ${himA} struggling to support ${hisA} nine huge breasts.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`casts a spell to make ${himA} strong; ${hisA} muscles grow and grow until ${heA} is so muscle-bound ${heA} can barely move.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`casts a spell to make ${himA} pleasantly soft; ${hisA} body swells with added fat until ${heA} can barely move.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`casts a spell to turn ${himA} into a bimbo; ${heA} shows no further reactions.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`casts a spell to increase ${hisA} intelligence; ${hisA} face turns red and steam jets out of ${hisA} ears.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`casts a spell to grow small; most of ${hisA} body shrinks until only a pair of tits are visible.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`casts a spell to grow tall; ${hisA} arms and legs stretch and stretch.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`casts a spell to adorn ${hisA} outfit with religious symbols of your new religion. ${HeA} succeeds in conjuring them, at the expense of ${hisA} other clothes.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`casts a spell to make ${himselfA} appear Roman; ${heA} looks more Greek to you.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`casts a spell to make ${himselfA} appear like a high-class Imperial; ${heA} looks more like a street peddling shaman, really.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`casts a spell to make ${himselfA} appear Aztec; ${heA} adopts the perfect conquistador appearance.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`casts a spell to make ${himselfA} appear Egyptian; bandages quickly wrap around ${himA} as a sarcophagus appears around ${himA}.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`casts a spell to make ${himselfA} appear Japanese; ${heA} succeeds in becoming a baka gaijin.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`casts a spell to make ${himselfA} appear Arabic; ${heA} succeeds in making ${himselfA} look like a wannabe Arabian princess.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`casts a spell to make ${himselfA} appear Chinese; ${heA} succeeds in swapping the material of ${hisA} robes to a fine silk.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`casts a spell to make ${himselfA} appear Southern; ${heA} succeeds in becoming a caricature of the Antebellum aristocracy.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`casts a spell to look more ${V.arcologies[0].FSSupremacistRace}; ${heA} does too good of a job, ending up looking like an over-exaggerated ${V.arcologies[0].FSSupremacistRace} stereotype.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`casts a spell to look more ${V.arcologies[0].FSSubjugationistRace}; ${heA} does too good of a job and ends up looking like an over-exaggerated ${V.arcologies[0].FSSubjugationistRace} stereotype.`);
				}
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be conservative to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be feminine to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} appearance to include oddly fleshy piercings to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`bulges ${hisA} middle to look pregnant to conform with your vision that all wombs should be filled.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to be oddly flawless.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look somewhat natural to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`inflates ${hisA} breasts until they are comically huge, rounded and jiggling ominously to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a youthful appearance to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adopts a mature appearance to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`swells ${hisA} breasts until they are bigger than ${hisA} head, and moving oddly, to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`starts lactating a strange fluid to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to be outrageously bulky to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be outrageously fat to conform with your vision that everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adopts a more slutty appearance to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} form to a Roman ${womanA} to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-tech ${womanA} bearing your crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Aztec ${womanA} to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} form to an Egyptian ${womanA} to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} form to a Japanese ${womanA} to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} form to an Arabian ${womanA} to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} form to a Chinese ${womanA} to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} form to a Southern ${womanA} to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSupremacistRace} to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to look more ${V.arcologies[0].FSSubjugationistRace} to conform with your vision of subjugating the inferior race.`);
				}
				break;
			case "schoolgirl":
				if (arcInfo.fsActive('FSPaternalist')) {
					r.push(`adjusts ${hisA} appearance to be more prim and proper to conform with your vision of a well-bred race of slaves.`);
				} else if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(`adjusts ${hisA} appearance to be more androgynous to conform with your vision of gender being defined by power.`);
				} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
					r.push(`adjusts ${hisA} appearance to be more feminine and cute to conform with your vision of preserving traditional gender roles.`);
				} else if (arcInfo.fsActive('FSDegradationist')) {
					r.push(`adjusts ${hisA} outfit to display ${hisA} tits and crotch to conform with your vision that slaves are not human and should be thoroughly degraded.`);
				} else if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(`adjusts ${hisA} appearance to be pregnant to conform with your vision that all women should be pregnant.`);
				} else if (arcInfo.fsActive('FSRestart')) {
					r.push(`adjusts ${hisA} appearance to involve chastity.`);
				} else if (arcInfo.fsActive('FSBodyPurist')) {
					r.push(`adjusts ${hisA} appearance to look more natural, complete with freckles and perfect teeth, to conform with your vision of an implant free society.`);
				} else if (arcInfo.fsActive('FSTransformationFetishist')) {
					r.push(`adjusts ${hisA} breasts to resemble implants to conform with your vision of a society focused on implants, alterations, and modifications.`);
				} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
					r.push(`adopts a more shy and innocent attitude to conform with your vision of a society glorifying young ladies.`);
				} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
					r.push(`adjusts ${hisA} appearance to include a spanked bottom to conform with your vision of a society glorifying older ladies.`);
				} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
					r.push(`adopts a slimmer appearance to conform with your vision of a society glorifying lithe ladies.`);
				} else if (arcInfo.fsActive('FSAssetExpansionist')) {
					r.push(`adjusts the size of ${hisA} breasts until they strain the buttons on ${hisA} shirt to conform with your vision that bigger is better.`);
				} else if (arcInfo.fsActive('FSPastoralist')) {
					r.push(`begins lactating to conform with your vision that slaves should be milked.`);
				} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
					r.push(`adjusts ${hisA} appearance to look like ${heA} just finished gym class to conform with your vision that all slaves should be tall and strong.`);
				} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
					r.push(`adjusts ${hisA} appearance to be pleasantly plump to conform with your vision everyone should enjoy life to the fullest.`);
				} else if (arcInfo.fsActive('FSIntellectualDependency')) {
					r.push(`adjusts ${hisA} appearance to be more fun and flirty to conform with your vision that slaves shouldn't waste time thinking.`);
				} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
					r.push(`adjusts ${hisA} appearance to be more refined to conform with your vision that slaves should be smart and professional.`);
				} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
					r.push(`adjusts ${hisA} height to conform with your vision that short is sexy.`);
				} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
					r.push(`adjusts ${hisA} height to conform with your vision of a society glorifying the tall.`);
				} else if (arcInfo.fsActive('FSChattelReligionist')) {
					r.push(`adjusts ${hisA} outfit to prominently display a religious symbol of your new religion.`);
				} else if (arcInfo.fsActive('FSRomanRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a proper upper-class Roman lady to conform with your vision of building a new Rome.`);
				} else if (arcInfo.fsActive('FSNeoImperialist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high-tech ${womanA} bearing your crest to conform with your vision of a new Imperial society.`);
				} else if (arcInfo.fsActive('FSAztecRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a high standing Aztec priestess to conform with your vision of building a new Aztec Empire.`);
				} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a topless Egyptian lady to conform with your vision of building a new land of the Pharaohs.`);
				} else if (arcInfo.fsActive('FSEdoRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a traditional Japanese lady to conform with your vision of building a new Edo Japan.`);
				} else if (arcInfo.fsActive('FSArabianRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble an Arab ${girlA} attending a Western school to conform with your vision of building a new Sultanate.`);
				} else if (arcInfo.fsActive('FSChineseRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Chinese lady to conform with your vision of pursuing the Mandate of Heaven.`);
				} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
					r.push(`adjusts ${hisA} outfit to resemble a Southern lady to conform with your vision of building a new Antebellum South.`);
				} else if (arcInfo.fsActive('FSSupremacist')) {
					r.push(`adjusts ${hisA} appearance to resemble a model ${V.arcologies[0].FSSupremacistRace} student to conform with your vision of glorifying the superior race.`);
				} else if (arcInfo.fsActive('FSSubjugationist')) {
					r.push(`adjusts ${hisA} appearance to resemble ${addA(V.arcologies[0].FSSubjugationistRace)} foreign exchange student to conform with your vision of subjugating the inferior race.`);
				}
		}

		App.Events.addParagraph(node, r);

		const responses = [
			new App.Events.Result(`Keep your new appearance`, keep),
			new App.Events.Result(`Your usual appearance will do`, usual),
			new App.Events.Result(`Go back to the standard personality`, standardPersonality),
		];

		App.Events.addResponses(node, responses);

		return node;

		function keep() {
			if (arcInfo.fsActive('FSPaternalist')) {
				V.assistant.fsAppearance = "paternalist";
			} else if (arcInfo.fsActive('FSRepopulationFocus')) {
				V.assistant.fsAppearance = "repopulation focus";
			} else if (arcInfo.fsActive('FSRestart')) {
				V.assistant.fsAppearance = "eugenics";
			} else if (arcInfo.fsActive('FSGenderRadicalist')) {
				V.assistant.fsAppearance = "gender radicalist";
			} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
				V.assistant.fsAppearance = "gender fundamentalist";
			} else if (arcInfo.fsActive('FSDegradationist')) {
				V.assistant.fsAppearance = "degradationist";
			} else if (arcInfo.fsActive('FSBodyPurist')) {
				V.assistant.fsAppearance = "body purist";
			} else if (arcInfo.fsActive('FSTransformationFetishist')) {
				V.assistant.fsAppearance = "transformation fetishist";
			} else if (arcInfo.fsActive('FSYouthPreferentialist')) {
				V.assistant.fsAppearance = "youth preferentialist";
			} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
				V.assistant.fsAppearance = "maturity preferentialist";
			} else if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
				V.assistant.fsAppearance = "slimness enthusiast";
			} else if (arcInfo.fsActive('FSAssetExpansionist')) {
				V.assistant.fsAppearance = "asset expansionist";
			} else if (arcInfo.fsActive('FSHedonisticDecadence')) {
				V.assistant.fsAppearance = "hedonistic decadence";
			} else if (arcInfo.fsActive('FSPastoralist')) {
				V.assistant.fsAppearance = "pastoralist";
			} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
				V.assistant.fsAppearance = "physical idealist";
			} else if (arcInfo.fsActive('FSIntellectualDependency')) {
				V.assistant.fsAppearance = "intellectual dependency";
			} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
				V.assistant.fsAppearance = "slave professionalism";
			} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
				V.assistant.fsAppearance = "petite admiration";
			} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
				V.assistant.fsAppearance = "statuesque glorification";
			} else if (arcInfo.fsActive('FSChattelReligionist')) {
				V.assistant.fsAppearance = "chattel religionist";
			} else if (arcInfo.fsActive('FSRomanRevivalist')) {
				V.assistant.fsAppearance = "roman revivalist";
			} else if (arcInfo.fsActive('FSNeoImperialist')) {
				V.assistant.fsAppearance = "neoimperialist";
			} else if (arcInfo.fsActive('FSAztecRevivalist')) {
				V.assistant.fsAppearance = "aztec revivalist";
			} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
				V.assistant.fsAppearance = "egyptian revivalist";
			} else if (arcInfo.fsActive('FSEdoRevivalist')) {
				V.assistant.fsAppearance = "edo revivalist";
			} else if (arcInfo.fsActive('FSArabianRevivalist')) {
				V.assistant.fsAppearance = "arabian revivalist";
			} else if (arcInfo.fsActive('FSChineseRevivalist')) {
				V.assistant.fsAppearance = "chinese revivalist";
			} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
				V.assistant.fsAppearance = "antebellum revivalist";
			} else if (arcInfo.fsActive('FSSupremacist')) {
				V.assistant.fsAppearance = "supremacist";
			} else if (arcInfo.fsActive('FSSubjugationist')) {
				V.assistant.fsAppearance = "subjugationist";
			}
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} enthusiastically explores ${hisA} new body, perfecting its appearance. "Thank you, ${properTitle()}. This was fun. As always, you can customize me from the arcology management menu," ${heA} states. "Oh! And if you choose to drive society in another direction, I'll have a new appearance ready for your enjoyment at once," ${heA} hastily adds.`);
		}

		function usual() {
			V.assistant.fsAppearance = "default";
			refreshArt();
			return App.UI.DOM.makeElement("span", `At your order, ${heA} returns to ${hisA} usual avatar. "Yes, ${properTitle()}," ${heA} confirms, and adds "if you reconsider, I can be customized from the arcology management menu."`);
		}

		function standardPersonality() {
			V.assistant.personality = -1;
			refreshArt();
			return App.UI.DOM.makeElement("span", `You tell ${V.assistant.name} to reduce lewdness by ninety percent. It reverts to a genderless, emotionless affect.`);
		}

		function refreshArt() {
			App.Events.refreshEventArt("assistant");
		}
	}
};
