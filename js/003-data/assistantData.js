App.Data.Assistant = {};
/**
 * Assistant appearances mapped to the FS that love seeing her look like she do.
 * @type {Map<FC.FutureSociety, Array<assistantAppearance>>}
 */
App.Data.Assistant.appearanceForFS = new Map([
	["FSSupremacist", ["amazon", "monstergirl", "succubus"]],
	["FSSubjugationist", ["amazon", "businesswoman", "imp"]],
	["FSGenderRadicalist", ["incubus", "monstergirl", "shemale", "succubus", "witch"]],
	["FSGenderFundamentalist", ["angel", "cherub", "fairy", "goddess", "hypergoddess", "loli", "preggololi", "pregnant fairy", "schoolgirl", "succubus", "witch"]],
	["FSDegradationist", ["businesswoman", "imp", "incubus", "monstergirl", "preggololi", "succubus"]],
	["FSPaternalist", ["angel", "cherub", "fairy", "goddess", "hypergoddess", "loli", "preggololi", "pregnant fairy", "schoolgirl"]],
	["FSBodyPurist", ["amazon", "angel", "fairy", "goddess", "incubus", "loli", "pregnant fairy", "succubus", "witch"]],
	["FSTransformationFetishist", ["businesswoman", "ERROR_1606_APPEARANCE_FILE_CORRUPT", "incubus", "shemale", "succubus", "witch"]],
	["FSYouthPreferentialist", ["angel", "cherub", "imp", "loli", "preggololi", "schoolgirl", "shemale", "succubus", "witch"]],
	["FSMaturityPreferentialist", ["angel", "businesswoman", "goddess", "incubus", "succubus", "witch"]],
	["FSSlimnessEnthusiast", ["cherub", "imp", "loli", "schoolgirl", "shemale", "succubus", "witch"]],
	["FSAssetExpansionist", ["businesswoman", "hypergoddess", "incubus", "shemale", "succubus", "witch"]],
	["FSPastoralist", ["cowgirl", "goddess", "hypergoddess", "incubus", "shemale", "succubus", "witch"]],
	["FSPhysicalIdealist", ["amazon", "incubus", "shemale", "succubus", "witch"]],
	["FSHedonisticDecadence", ["goddess", "hypergoddess", "imp", "incubus", "preggololi", "succubus", "witch"]],
	["FSChattelReligionist", ["angel", "cherub", "goddess", "imp", "incubus", "monstergirl", "succubus", "witch"]],
	["FSNull", []],
	["FSRomanRevivalist", ["amazon", "businesswoman", "incubus", "succubus"]],
	["FSNeoImperialist", ["amazon", "businesswoman", "incubus", "shemale", "angel"]],
	["FSEgyptianRevivalist", ["goddess", "incubus", "monstergirl", "succubus"]],
	["FSEdoRevivalist", ["amazon", "incubus", "kitsunegirl", "loli", "monstergirl", "succubus"]],
	["FSArabianRevivalist", ["businesswoman", "incubus", "schoolgirl", "succubus"]],
	["FSChineseRevivalist", ["incubus", "monstergirl", "schoolgirl", "succubus"]],
	["FSAztecRevivalist", ["amazon", "businesswoman", "incubus", "succubus"]],
	["FSAntebellumRevivalist", ["angel", "businesswoman", "goddess", "monstergirl", "succubus", "witch"]],
	["FSRepopulationFocus", ["goddess", "hypergoddess", "preggololi", "pregnant fairy", "succubus", "witch"]],
	["FSRestart", ["angel", "businesswoman", "goddess", "incubus", "loli", "schoolgirl", "succubus", "witch"]],
	["FSIntellectualDependency", ["shemale", "succubus", "witch"]],
	["FSSlaveProfessionalism", ["angel", "businesswoman", "incubus", "goddess", "schoolgirl", "succubus"]],
	["FSPetiteAdmiration", ["cherub", "fairy", "imp", "incubus", "loli", "preggololi", "pregnant fairy", "schoolgirl", "succubus", "witch"]],
	["FSStatuesqueGlorification", ["amazon", "goddess", "incubus", "succubus", "witch"]]
]);

/**
 * @type {Map<assistantAppearance, {readonly requirements: boolean}>}
 */
App.Data.Assistant.appearances = new Map([
	["normal", {get requirements() { return true; }}],
	["monstergirl", {get requirements() { return (V.seeDicks > 0); }}],
	["shemale", {get requirements() { return V.seeDicks > 0; }}],
	["amazon", {get requirements() { return true; }}],
	["businesswoman", {get requirements() { return true; }}],
	["goddess", {get requirements() { return (V.seePreg !== 0); }}],
	["hypergoddess", {get requirements() { return (V.seePreg !== 0 && V.seeHyperPreg !== 0); }}],
	["schoolgirl", {get requirements() { return true; }}],
	["loli", {get requirements() { return (V.minimumSlaveAge < 13); }}],
	["preggololi", {get requirements() { return (V.seePreg !== 0 && V.minimumSlaveAge < 13); }}],
	["fairy", {get requirements() { return true; }}],
	["pregnant fairy", {get requirements() { return (V.seePreg !== 0); }}],

	// Extra
	["slimegirl", {get requirements() { return (V.assistant.Extra1 === 1); }}],
	["cowgirl", {get requirements() { return (V.assistant.Extra1 === 1); }}],
	["harpygirl", {get requirements() { return (V.assistant.Extra1 === 1); }}],
	["kitsunegirl", {get requirements() { return (V.assistant.Extra1 === 1); }}],
	["lamiagirl", {get requirements() { return (V.assistant.Extra1 === 1); }}],
	["spidergirl", {get requirements() { return (V.assistant.Extra1 === 1); }}],

	// Extra 2
	["angel", {get requirements() { return (V.assistant.Extra2 === 1); }}],
	["cherub", {get requirements() { return (V.assistant.Extra2 === 1); }}],
	["incubus", {get requirements() { return (V.assistant.Extra2 === 1 && V.seeDicks > 0); }}],
	["succubus", {get requirements() { return (V.assistant.Extra2 === 1); }}],
	["imp", {get requirements() { return (V.assistant.Extra2 === 1); }}],
	["witch", {get requirements() { return (V.assistant.Extra2 === 1); }}],
	["ERROR_1606_APPEARANCE_FILE_CORRUPT", {get requirements() { return (V.assistant.Extra2 === 1); }}],
]);
