/**
 * @typedef {object} itemFS
 * @property {FC.FutureSociety} [unlocks] Automatically unlocked with this FS.
 * @property {Set<FC.FutureSociety>} [loves] FS loves to see this outfit.
 * @property {Set<FC.FutureSociety>} [tolerates] FS tolerates this outfit.
 * @property {Set<FC.FutureSociety>} [hates] FS hates to see this outfit.
 */


/**
 * @typedef {object} clothingDescription
 * @property {function(App.Entity.SlaveState):string} [summary] General description of the outfit, tailored to the slave, but not hyper focused on a body part like boobs or butt.
 * @property {function(App.Entity.SlaveState):string} [upperFace]
 * @property {function(App.Entity.SlaveState):string} [hStyle]
 * @property {function(App.Entity.SlaveState):string} [earPiercing]
 * @property {function(App.Entity.SlaveState):string} [corsetPiercing]
 * @property {function(App.Entity.SlaveState):string} [bellyImplant]
 * @property {function(App.Entity.SlaveState):string} [belly]
 * @property {function(App.Entity.SlaveState):string} [inflation]
 * @property {function(App.Entity.SlaveState):string} [crotch]
 * @property {function(App.Entity.SlaveState):string} [butt]
 * @property {function(App.Entity.SlaveState):string} [buttplug]
 * @property {function(App.Entity.SlaveState):string} [clothingCorset]
 * @property {function(App.Entity.SlaveState):string} [boobs]
 */

/**
 * @typedef {object} clothes
 * @property {string} name
 * @property {0|1|2|3|4} exposure 0: Modest, 1: Acceptable, 2: Slutty, 3: Humiliating (exposes genitals), 4: Might as well be nude
 * @property {itemFS} [fs]
 * @property {boolean} [requirements]
 * @property {boolean} [harsh]
 * @property {boolean} [topless]
 * @property {boolean} [fuckdoll]
 * @property {string} [note]
 * @property {clothingDescription} [desc]
 */

/** @type {Map.<FC.Clothes, clothes>} The string here will be what is applied to the relevant slave property. Slave.clothes = "a bunny outfit", not "Bunny outfit".*/
App.Data.clothes = (new Map())
	.set("a Fuckdoll suit",
		{
			name: "Fuckdoll suit",
			exposure: 3,
			fuckdoll: true
		}
	)
	.set("attractive lingerie for a pregnant woman",
		{
			name: "Maternity lingerie",
			fs: {
				unlocks: "FSRepopulationFocus",
				loves: new Set(["FSIntellectualDependency", "FSRepopulationFocus"]),
			},
			get requirements() { return V.boughtItem.clothing.maternityLingerie === 1; },
			exposure: 2
		}
	)
	.set("a bunny outfit",
		{
			name: "Bunny outfit",
			fs: {
				unlocks: "FSGenderFundamentalist",
				loves: new Set(["FSGenderFundamentalist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.bunny === 1; },
			exposure: 1
		}
	)
	.set("body oil",
		{
			name: "Body oil",
			fs: {
				unlocks: "FSPhysicalIdealist",
				loves: new Set(["FSPhysicalIdealist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.oil === 1; },
			exposure: 4
		}
	)
	.set("a chattel habit",
		{
			name: "Chattel habit",
			fs: {
				unlocks: "FSChattelReligionist",
				loves: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.habit === 1; },
			exposure: 3
		}
	)
	.set("conservative clothing",
		{
			name: "Conservative clothing",
			fs: {
				unlocks: "FSPaternalist",
				loves: new Set(["FSPaternalist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.conservative === 1; },
			exposure: 0
		}
	)
	.set("harem gauze",
		{
			name: "Harem gauze",
			fs: {
				unlocks: "FSArabianRevivalist",
				loves: new Set(["FSArabianRevivalist"]),
			},
			get requirements() { return V.boughtItem.clothing.harem === 1; },
			exposure: 1
		}
	)
	.set("a huipil",
		{
			name: "Huipil",
			fs: {
				unlocks: "FSAztecRevivalist",
				loves: new Set(["FSAztecRevivalist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.huipil === 1; },
			exposure: 0
		}
	)
	.set("a kimono",
		{
			name: "Kimono",
			fs: {
				unlocks: "FSEdoRevivalist",
				loves: new Set(["FSEdoRevivalist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return (V.boughtItem.clothing.kimono === 1 || V.continent === "Japan"); },
			exposure: 0
		}
	)
	.set("a maternity dress",
		{
			name: "Maternity dress",
			fs: {
				unlocks: "FSRepopulationFocus",
				loves: new Set(["FSRepopulationFocus"]),
			},
			get requirements() { return V.boughtItem.clothing.maternityDress === 1; },
			exposure: 0,
		}
	)
	.set("a slutty qipao",
		{
			name: "Qipao (slutty)",
			fs: {
				unlocks: "FSChineseRevivalist",
				loves: new Set(["FSChineseRevivalist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.qipao === 1; },
			exposure: 2
		}
	)
	.set("a long qipao",
		{
			name: "Qipao (long)",
			fs: {
				unlocks: "FSChineseRevivalist",
				loves: new Set(["FSChineseRevivalist"]),
			},
			get requirements() { return V.boughtItem.clothing.cultural === 1; },
			exposure: 0
		}
	)
	.set("Imperial Plate",
		{
			name: "Imperial Plate",
			fs: {
				unlocks: "FSNeoImperialist",
				loves: new Set(["FSNeoImperialist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.imperialarmor === 1; },
			exposure: 0
		}
	)
	.set("a tight Imperial bodysuit",
		{
			name: "Imperial Bodysuit",
			fs: {
				unlocks: "FSNeoImperialist",
				loves: new Set(["FSNeoImperialist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.imperialsuit === 1; },
			exposure: 2
		}
	)
	.set("stretch pants and a crop-top",
		{
			name: "Stretch pants and a crop-top",
			fs: {unlocks: "FSHedonisticDecadence"},
			get requirements() { return V.boughtItem.clothing.lazyClothes === 1; },
			exposure: 0
		}
	)
	.set("a toga",
		{
			name: "Toga",
			fs: {
				unlocks: "FSRomanRevivalist",
				loves: new Set(["FSRomanRevivalist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.toga === 1; },
			exposure: 1
		}
	)
	.set("Western clothing",
		{
			name: "Western clothing",
			fs: {
				unlocks: "FSPastoralist",
				loves: new Set(["FSPastoralist"]),
			},
			get requirements() { return V.boughtItem.clothing.western === 1; },
			exposure: 3
		}
	)
	.set("a courtesan dress",
		{
			name: "Courtesan dress",
			fs: {
				unlocks: "FSSlaveProfessionalism",
				loves: new Set(["FSSlaveProfessionalism"]),
			},
			get requirements() { return V.boughtItem.clothing.courtesan === 1; },
			exposure: 1
		}
	)
	.set("a bimbo outfit",
		{
			name: "Bimbo outfit",
			fs: {
				unlocks: "FSIntellectualDependency",
				loves: new Set(["FSIntellectualDependency"]),
			},
			get requirements() { return V.boughtItem.clothing.bimbo === 1; },
			exposure: 2
		}
	)
	.set("petite admi outfit",
		{
			name: "Petite admi outfit",
			fs: {
				unlocks: "FSPetiteAdmiration",
				loves: new Set(["FSPetiteAdmiration"]),
			},
			get requirements() { return V.boughtItem.clothing.petite === 1; },
			exposure: 0
		}
	)
	.set("battlearmor",
		{
			name: "Battlearmor",
			get requirements() { return V.boughtItem.clothing.military === 1; },
			exposure: 0
		}
	)
	.set("a military uniform",
		{
			name: "Military uniform",
			fs: {
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.military === 1; },
			exposure: 0
		}
	)
	.set("a red army uniform",
		{
			name: "Red Army uniform",
			get requirements() { return V.boughtItem.clothing.military === 1; },
			exposure: 0
		}
	)
	.set("battledress",
		{
			name: "Battledress",
			get requirements() { return V.boughtItem.clothing.military === 1; },
			exposure: 0
		}
	)
	.set("a biyelgee costume",
		{
			name: "Biyelgee costume",
			get requirements() { return V.boughtItem.clothing.cultural === 1; },
			exposure: 0
		}
	)
	.set("a dirndl",
		{
			name: "Dirndl",
			get requirements() { return V.boughtItem.clothing.cultural === 1; },
			exposure: 0
		}
	)
	.set("lederhosen",
		{
			name: "Lederhosen",
			get requirements() { return V.boughtItem.clothing.cultural === 1; },
			exposure: 0
		}
	)
	.set("a mounty outfit",
		{
			name: "Mounty outfit",
			get requirements() { return V.boughtItem.clothing.cultural === 1; },
			exposure: 0
		}
	)
	.set("a hanbok",
		{
			name: "Hanbok",
			get requirements() { return V.boughtItem.clothing.cultural === 1; },
			exposure: 0
		}
	)
	.set("a burqa",
		{
			name: "Burqa",
			fs: {
				loves: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.middleEastern === 1 || V.continent === "the Middle East"; },
			exposure: 0
		}
	)
	.set("a niqab and abaya",
		{
			name: "Niqab and abaya",
			fs: {
				loves: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.middleEastern === 1 || V.continent === "the Middle East"; },
			exposure: 0
		}
	)
	.set("a hijab and blouse",
		{
			name: "Hijab and blouse",
			fs: {
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return (V.boughtItem.clothing.conservative === 1 || V.continent === "the Middle East"); },
			exposure: 0
		}
	)
	.set("a burkini",
		{
			name: "Burkini",
			get requirements() { return V.boughtItem.clothing.swimwear === 1 && (V.boughtItem.clothing.swimwear === 1 || V.continent === "the Middle East"); },
			exposure: 1
		}
	)
	.set("a Santa dress",
		{
			name: "Santa dress",
			get requirements() { return V.boughtItem.clothing.costume === 1; },
			exposure: 2
		}
	)
	.set("a klan robe",
		{
			name: "Klan robe",
			get requirements() { return V.boughtItem.clothing.pol === 1; },
			exposure: 0
		}
	)
	.set("a slutty klan robe",
		{
			name: "Slutty klan robe",
			get requirements() { return V.boughtItem.clothing.pol === 1; },
			exposure: 2
		}
	)
	.set("a schutzstaffel uniform",
		{
			name: "Schutzstaffel uniform",
			get requirements() { return V.boughtItem.clothing.pol === 1; },
			exposure: 0
		}
	)
	.set("a slutty schutzstaffel uniform",
		{
			name: "Slutty schutzstaffel uniform",
			get requirements() { return V.boughtItem.clothing.pol === 1; },
			exposure: 2
		}
	)
	.set("nice business attire",
		{
			name: "Nice business attire",
			get requirements() { return V.boughtItem.clothing.career === 1; },
			exposure: 0,
			fs: {
				loves: new Set(["FSMaturityPreferentialist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
		}
	)
	.set("a nice nurse outfit",
		{
			name: "Nurse (nice)",
			fs: {
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.career === 1; },
			exposure: 0
		}
	)
	.set("a police uniform",
		{
			name: "Police uniform",
			get requirements() { return V.boughtItem.clothing.career === 1; },
			exposure: 0
		}
	)
	.set("a nice maid outfit",
		{
			name: "Maid (nice)",
			get requirements() { return V.boughtItem.clothing.career === 1 || V.PC.career === "servant" || V.PC.career === "handmaiden" || V.PC.career === "child servant"; },
			exposure: 0,
			fs: {
				loves: new Set(["FSMaturityPreferentialist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
		}
	)
	.set("a ball gown",
		{
			name: "Ballgown",
			get requirements() { return V.boughtItem.clothing.dresses === 1; },
			exposure: 0,
			fs: {
				loves: new Set(["FSAntebellumRevivalist"])
			}
		}
	)
	.set("a gothic lolita dress",
		{
			name: "Gothic lolita dress",
			get requirements() { return V.boughtItem.clothing.dresses === 1; },
			exposure: 0,
			fs: {
				tolerates: new Set(["FSAntebellumRevivalist"])
			}
		}
	)
	.set("a cybersuit",
		{
			name: "Cybersuit",
			get requirements() { return V.boughtItem.clothing.bodysuits === 1; },
			exposure: 0
		}
	)
	.set("a latex catsuit",
		{
			name: "Latex catsuit",
			get requirements() { return V.boughtItem.clothing.bodysuits === 1; },
			exposure: 1
		}
	)
	.set("a button-up shirt and panties",
		{
			name: "Button-up shirt and panties",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 2
		}
	)
	.set("a button-up shirt",
		{
			name: "Button-up shirt",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 3
		}
	)
	.set("cutoffs",
		{
			name: "Cutoffs",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 2
		}
	)
	.set("jeans",
		{
			name: "Jeans",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 2,
			topless: true
		}
	)
	.set("leather pants and a tube top",
		{
			name: "Leather pants and a tube top",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 1
		}
	)
	.set("leather pants",
		{
			name: "Leather pants",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 2,
			topless: true
		}
	)
	.set("an oversized t-shirt",
		{
			name: "Oversized t-shirt",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 3
		}
	)
	.set("a sweater and cutoffs",
		{
			name: "Sweater and cutoffs",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 0
		}
	)
	.set("a sweater and panties",
		{
			name: "Sweater and panties",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 2
		}
	)
	.set("a sweater",
		{
			name: "Sweater",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 3
		}
	)
	.set("a t-shirt and jeans",
		{
			name: "T-shirt and jeans",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 0
		}
	)
	.set("a t-shirt and panties",
		{
			name: "T-shirt and panties",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 2
		}
	)
	.set("a t-shirt",
		{
			name: "T-shirt",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 3
		}
	)
	.set("a tank-top and panties",
		{
			name: "Tank-top and panties",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 2
		}
	)
	.set("a tank-top",
		{
			name: "Tank-top",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 3
		}
	)
	.set("a tube top",
		{
			name: "Tube top",
			get requirements() { return V.boughtItem.clothing.casual === 1; },
			exposure: 3
		}
	)
	.set("boyshorts",
		{
			name: "Boyshorts",
			get requirements() { return V.boughtItem.clothing.underwear === 1; },
			exposure: 2,
			topless: true
		}
	)
	.set("a bra",
		{
			name: "Bra",
			get requirements() { return V.boughtItem.clothing.underwear === 1; },
			exposure: 3
		}
	)
	.set("kitty lingerie",
		{
			name: "Kitty lingerie",
			get requirements() { return V.boughtItem.clothing.underwear === 1; },
			exposure: 2
		}
	)
	.set("panties and pasties",
		{
			name: "Panties and pasties",
			get requirements() { return V.boughtItem.clothing.underwear === 1; },
			exposure: 2
		}
	)
	.set("a skimpy loincloth",
		{
			name: "Skimpy loincloth",
			fs: {
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.underwear === 1; },
			exposure: 3
		}
	)
	.set("a thong",
		{
			name: "Thong",
			get requirements() { return V.boughtItem.clothing.underwear === 1; },
			exposure: 3,
			topless: true
		}
	)
	.set("pasties",
		{
			name: "Pasties",
			get requirements() { return V.boughtItem.clothing.underwear === 1; },
			exposure: 3
		}
	)
	.set("leather pants and pasties",
		{
			name: "Leather pants and pasties",
			get requirements() { return V.boughtItem.clothing.underwear === 1 && V.boughtItem.clothing.casual === 1; },
			exposure: 2,
		}
	)
	.set("a t-shirt and thong",
		{
			name: "T-shirt and thong",
			get requirements() { return V.boughtItem.clothing.underwear === 1 && V.boughtItem.clothing.casual === 1; },
			exposure: 3,
		}
	)
	.set("a tube top and thong",
		{
			name: "Tube top and thong",
			get requirements() { return V.boughtItem.clothing.underwear === 1 && V.boughtItem.clothing.casual === 1; },
			exposure: 3,
		}
	)
	.set("an oversized t-shirt and boyshorts",
		{
			name: "Oversized t-shirt and boyshorts",
			get requirements() { return V.boughtItem.clothing.underwear === 1 && V.boughtItem.clothing.casual === 1; },
			exposure: 0,
		}
	)
	.set("sport shorts and a sports bra",
		{
			name: "Sport shorts and a sports bra",
			get requirements() { return V.boughtItem.clothing.sports === 1; },
			exposure: 1,
		}
	)
	.set("sport shorts",
		{
			name: "Sport shorts",
			get requirements() { return V.boughtItem.clothing.sports === 1; },
			exposure: 2,
			topless: true
		}
	)
	.set("a sports bra",
		{
			name: "Sports bra",
			get requirements() { return V.boughtItem.clothing.sports === 1; },
			exposure: 3
		}
	)
	.set("sport shorts and a t-shirt",
		{
			name: "Sport shorts and a t-shirt",
			get requirements() { return V.boughtItem.clothing.sports === 1 && V.boughtItem.clothing.casual === 1; },
			exposure: 0
		}
	)
	.set("a nice pony outfit",
		{
			name: "Pony outfit (nice)",
			get requirements() { return V.boughtItem.clothing.pony === 1; },
			exposure: 1
		}
	)
	.set("a slutty pony outfit",
		{
			name: "Pony outfit (slutty)",
			get requirements() { return V.boughtItem.clothing.pony === 1; },
			exposure: 2
		}
	)
	.set("a monokini",
		{
			name: "Monokini",
			get requirements() { return V.boughtItem.clothing.swimwear === 1; },
			exposure: 3,
			note: "Boob fetishists enjoy."
		}
	)
	.set("a one-piece swimsuit",
		{
			name: "One-piece swimsuit",
			get requirements() { return V.boughtItem.clothing.swimwear === 1; },
			exposure: 1
		}
	)
	.set("a striped bra",
		{
			name: "Striped bra",
			get requirements() { return V.boughtItem.clothing.pantsu === 1 || V.continent === "Japan"; },
			exposure: 3
		}
	)
	.set("striped panties",
		{
			name: "Striped panties",
			get requirements() { return V.boughtItem.clothing.pantsu === 1 || V.continent === "Japan"; },
			exposure: 2,
			topless: true
		}
	)
	.set("striped underwear",
		{
			name: "Striped underwear",
			get requirements() { return V.boughtItem.clothing.pantsu === 1 || V.continent === "Japan"; },
			exposure: 2,
			topless: true
		}
	)
	.set("a confederate army uniform",
		{
			name: "Confederate Army uniform",
			get requirements() { return V.boughtItem.clothing.antebellum === 1; },
			exposure: 0,
			fs: {
				loves: new Set(["FSAntebellumRevivalist"])
			}
		}
	)
	.set("an evening dress",
		{
			name: "Evening dress",
			get requirements() { return V.boughtItem.clothing.antebellum === 1; },
			exposure: 1,
			fs: {
				loves: new Set(["FSAntebellumRevivalist"])
			}
		}
	)

	// "Normal" things:
	.set("an apron",
		{
			name: "Apron",
			exposure: 2,
			note: "Increases just devotion for submissives, humiliation fetishists and visibly pregnant pregnancy fetishists regardless of devotion level."
		}
	)
	.set("slutty jewelry",
		{
			name: "Bangles",
			exposure: 3,
			fs: {loves: new Set(["FSEgyptianRevivalist"])}
		}
	)
	.set("clubslut netting",
		{
			name: "Clubslut netting",
			exposure: 3,
			fs: {loves: new Set(["FSBodyPurist", "FSIntellectualDependency"])},
		}
	)
	.set("cutoffs and a t-shirt",
		{
			name: "Cutoffs and a t-shirt",
			exposure: 0
		}
	)
	.set("a comfortable bodysuit",
		{
			name: "Bodysuit",
			exposure: 1,
			fs: {loves: new Set(["FSBodyPurist"])},
		}
	)
	.set("a cheerleader outfit",
		{
			name: "Cheerleader",
			exposure: 2,
			fs: {loves: new Set(["FSGenderFundamentalist", "FSYouthPreferentialist"])},
		}
	)
	.set("a fallen nuns habit",
		{
			name: "Fallen nun",
			fs: {
				loves: new Set(["FSChattelReligionist"]),
			},
			exposure: 3
		}
	)
	.set("a hijab and abaya",
		{
			name: "Hijab and abaya",
			fs: {
				loves: new Set(["FSChattelReligionist"]),
			},
			exposure: 0
		}
	)
	.set("a leotard",
		{
			name: "Leotard",
			exposure: 1,
			fs: {loves: new Set(["FSBodyPurist"])},
		}
	)
	.set("a slutty maid outfit",
		{
			name: "Maid (slutty)",
			exposure: 2,
			fs: {loves: new Set(["FSSlaveProfessionalism", "FSIntellectualDependency"])},
		}
	)
	.set("a mini dress",
		{
			name: "Mini dress",
			exposure: 2
		}
	)
	.set("attractive lingerie",
		{
			name: "Nice lingerie",
			exposure: 2
		}
	)
	.set("a slutty nurse outfit",
		{
			name: "Nurse (slutty)",
			exposure: 2
		}
	)
	.set("overalls",
		{
			name: "Overalls",
			exposure: 1
		}
	)
	.set("panties",
		{
			name: "Panties",
			exposure: 2,
			topless: true
		}
	)
	.set("a scalemail bikini",
		{
			name: "Scalemail bikini",
			exposure: 2
		}
	)
	.set("a schoolgirl outfit",
		{
			name: "Schoolgirl",
			exposure: 1,
			fs: {loves: new Set(["FSGenderFundamentalist", "FSYouthPreferentialist"])},
		}
	)
	.set("a slutty outfit",
		{
			name: "Slutty outfit",
			exposure: 2,
			fs: {loves: new Set(["FSIntellectualDependency"])},
		}
	)
	.set("spats and a tank top",
		{
			name: "Spats and a tank top",
			exposure: 0
		}
	)
	.set("a string bikini",
		{
			name: "String bikini",
			exposure: 3,
			fs: {loves: new Set(["FSBodyPurist", "FSIntellectualDependency"])},
		}
	)
	.set("a succubus outfit",
		{
			name: "Succubus costume",
			fs: {
				loves: new Set(["FSChattelReligionist"]),
			},
			exposure: 3
		}
	)
	.set("slutty business attire",
		{
			name: "Suit (slutty)",
			exposure: 2,
			fs: {
				loves: new Set(["FSMaturityPreferentialist", "FSSlaveProfessionalism"])
			},
		}
	)
	.set("a halter top dress",
		{
			name: "Haltertop dress",
			exposure: 0,
			fs: {loves: new Set(["FSBodyPurist", "FSSlaveProfessionalism"])},
		}
	)
	.set("chains",
		{
			name: "Chains",
			fs: {
				unlocks: "FSDegradationist",
				loves: new Set(["FSDegradationist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			get requirements() { return V.boughtItem.clothing.chains === 1; },
			exposure: 4,
			harsh: true,
			note: "Increases devotion and fear for slaves who are disobedient and not terrified. Masochists who are at least ambivalent gain devotion, may also cause masochism."
		}
	)
	.set("no clothing",
		{
			name: "Naked",
			exposure: 4,
			harsh: true,
			fs: {
				loves: new Set(["FSPhysicalIdealist", "FSIntellectualDependency"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
		}
	)
	.set("a penitent nuns habit",
		{
			name: "Penitent nun",
			fs: {
				loves: new Set(["FSChattelReligionist"]),
			},
			exposure: 0,
			harsh: true,
			note: "Increases devotion and fear but damages health, may cause masochism."
		}
	)
	.set("restrictive latex",
		{
			name: "Restrictive latex",
			fs: {loves: new Set(["FSBodyPurist"])},
			exposure: 3,
			harsh: true,
			note: "Increases fear and devotion for resistant slaves and just devotion for obedient, non-terrified submissives."
		}
	)
	.set("shibari ropes",
		{
			name: "Shibari ropes",
			fs: {
				loves: new Set(["FSDegradationist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			exposure: 4,
			harsh: true,
			note: "Increases fear and devotion for resistant slaves and just devotion for obedient, non-terrified submissives."
		}
	)
	.set("uncomfortable straps",
		{
			name: "Uncomfortable straps",
			exposure: 3,
			harsh: true,
			fs: {
				loves: new Set(["FSDegradationist"]),
				tolerates: new Set(["FSChattelReligionist"]),
			},
			note: "Increases devotion and fear for slaves who are disobedient and not terrified. Masochists who are at least ambivalent gain devotion, may also cause masochism."
		}
	);

/**
 * @typedef {object} slaveWear
 * @property {string} name
 * @property {itemFS} [fs]
 * @property {boolean} [requirements]
 * @property {boolean} [harsh]
 * @property {string} [note]
 */

/**
 * @typedef {Map<string, slaveWear>} slaveWearCategory
 */

/** @type {{[key: string]: slaveWearCategory}} string should be the slave property being modified.*/
App.Data.slaveWear = {
	collar: new Map([
		["stylish leather", {name: "Stylish leather"}],
		["satin choker", {name: "Satin choker"}],
		["silk ribbon", {name: "Silken ribbon"}],
		["heavy gold", {name: "Heavy gold"}],
		["pretty jewelry", {name: "Pretty jewelry"}],
		["nice retirement counter",
			{
				name: "Nice retirement counter",
				get requirements() {
					return V.seeAge === 1;
				}
			}
		],
		["preg biometrics",
			{
				name: "Pregnancy biometrics",
				get requirements() {
					return V.seePreg === 1;
				},
				note: "Increases devotion for those who have pregnancy fetish while fertile or a humiliation fetish. For others obedient ones gain devotion, ambivalent ones gain fear and devotion and resistant ones lose devotion and gain fear."
			}
		],
		["bell collar",
			{
				name: "Bell",
				note: "On non-obedient slaves reduces fear a lot and devotion somewhat."
			},
		],
		["leather with cowbell",
			{
				name: "Cowbell",
				note: "On obedient slaves with boob fetish increases devotion, on disobedient slaves reduces fear a lot and devotion somewhat."
			}
		],
		["bowtie",
			{
				name: "Bowtie collar",
				fs: {
					unlocks: "FSGenderFundamentalist",
					loves: new Set(["FSGenderFundamentalist"]),
				},
				get requirements() {
					return V.boughtItem.clothing.bunny === 1;
				}
			}
		],
		["neck tie",
			{
				name: "Neck tie",
				fs: {
					unlocks: "FSPaternalist",
					loves: new Set(["FSPaternalist"]),
				},
				get requirements() {
					return V.boughtItem.clothing.conservative === 1;
				}
			}
		],
		["ancient Egyptian",
			{
				name: "Ancient Egyptian",
				fs: {
					unlocks: "FSEgyptianRevivalist",
					loves: new Set(["FSEgyptianRevivalist"]),
				},
				get requirements() {
					return V.boughtItem.clothing.egypt === 1;
				}
			}
		],
		["tight steel",
			{
				name: "Tight steel",
				fs: {
					loves: new Set(["FSChattelReligionist"])
				},
				harsh: true
			}
		],
		["cruel retirement counter",
			{
				name: "Cruel retirement counter",
				fs: {
					loves: new Set(["FSChattelReligionist"])
				},
				get requirements() {
					return V.seeAge === 1;
				},
				harsh: true
			}
		],
		["uncomfortable leather",
			{
				name: "Uncomfortable leather",
				fs: {
					loves: new Set(["FSChattelReligionist"])
				},
				harsh: true
			}
		],
		["shock punishment",
			{
				name: "Shock punishment",
				harsh: true,
				note: "For non-obedient slaves increases fear a great deal and reduces devotion, for resistant non-odd slaves it affects both much more a single time and gives the odd flaw."
			}
		],
		["neck corset",
			{
				name: "Neck corset",
				harsh: true
			}
		],
	]),

	faceAccessory: new Map([
		["porcelain mask",
			{
				name: "Porcelain mask",
				note: "Obscures the face, increases fear and devotion for disobedient slaves, submissives and nymphos also enjoy wearing one."
			}
		],
		["cat ears",
			{
				name: "Cat ears",
				note: "Increases fear and devotion for disobedient slaves, submissives and nymphos also enjoy wearing one."
			}
		],
	]),

	vaginalAttachment: new Map([
		["none", {name: "None"}],
		["vibrator",
			{
				name: "Vibrating attachment",
				get requirements() {
					return V.boughtItem.toys.vaginalAttachments === 1;
				},
				vibrates: 1
			}
		],
		["smart vibrator",
			{
				name: "Smart vibrating attachment",
				get requirements() {
					return V.boughtItem.toys.smartVaginalAttachments === 1;
				},
				vibrates: 2
			}
		]
	]),

	dickAccessory: new Map([
		["none", {name: "None"}],
		["bullet vibrator",
			{
				name: "Bullet vibrator",
				get requirements() {
					return V.boughtItem.toys.dildos === 1;
				},
				vibrates: 1,
			}
		],
		["smart bullet vibrator",
			{
				name: "Smart bullet vibrator",
				get requirements() {
					return V.boughtItem.toys.smartVibes === 1;
				},
				vibrates: 2,
			}
		]
	]),

	buttplugAttachment: new Map([
		["none", {name: "None"}],
		["tail",
			{
				name: "Tail",
				get requirements() {
					return V.boughtItem.toys.buttPlugTails === 1;
				}
			}
		],
		["fox tail",
			{
				name: "Fox tail",
				get requirements() {
					return V.boughtItem.toys.buttPlugTails === 1;
				}
			}
		],
		["cat tail",
			{
				name: "Cat tail",
				get requirements() {
					return V.boughtItem.toys.buttPlugTails === 1;
				}
			}
		],
		["cow tail",
			{
				name: "Cow tail",
				get requirements() {
					return V.boughtItem.toys.buttPlugTails === 1;
				}
			}
		]
	]),

	armAccessory: new Map([
		// ["none", {name: "None"}],
		["hand gloves", {name: "Hand gloves"}],
		["elbow gloves", {name: "Elbow gloves"}]

	]),

	legAccessory: new Map([
		// ["none", {name: "None"}],
		["short stockings", {name: "Short stockings"}],
		["long stockings", {name: "Long stockings"}]

	]),
};

/**
 * @typedef {object} mouthAccessory
 * @property {string} name
 * @property {boolean} [requirements]
 * @property {string} [note]
 */

/** @type {Map<FC.MouthAccessory, mouthAccessory>} */
App.Data.mouthAccessory = new Map([
	["ball gag",
		{
			name: "Ball gag",
			note: "Increases fear and devotion for disobedient slaves, submissives and nymphos also enjoy wearing one."
		}
	],
	["bit gag",
		{
			name: "Bit gag",
			note: "Increases fear and devotion for disobedient slaves, submissives and nymphos also enjoy wearing one."
		}
	],
	["ring gag",
		{
			name: "Ring gag",
			note: "Increases fear and devotion for disobedient slaves, submissives and nymphos also enjoy wearing one."
		}
	],
	["massive dildo gag",
		{
			name: "Massive dildo gag",
			get requirements() {
				return V.boughtItem.toys.gags === 1;
			},
			note: "Increases oral skill up to a point and causes fear for disobedient slaves."
		}
	],
	["dildo gag",
		{
			name: "Dildo gag",
			note: "Increases oral skill up to a point and causes fear for disobedient slaves."
		}
	],
]);

/**
 * @typedef {object} slaveShoes
 * @property {string} name
 * @property {itemFS} [fs]
 * @property {boolean} [requirements]
 * @property {boolean} [harsh]
 * @property {number} heelHeight height in cm. Over 4cm they may totter. 21cm and over (8 inch heels) will be painful/extreme
 * @property {number} platformHeight height in cm. Adds to heel height.
 */

/**
 * @type {Map<FC.WithNone<FC.Shoes>, slaveShoes>} slaveShoesCategory
 */
App.Data.shoes = new Map([ // TODO: add lift property
	["none",
		{
			name: "Barefoot",
			heelHeight: 0,
			platformHeight: 0
		}
	],
	["flats",
		{
			name: "Flats",
			heelHeight: 0,
			platformHeight: 0
		}
	],
	["pumps",
		{
			name: "Pumps",
			heelHeight: 5, // 2 inch heels
			platformHeight: 0
		}
	],
	["heels",
		{
			name: "Heels",
			heelHeight: 13, // 5 inch heels
			platformHeight: 0
		}
	],
	["boots",
		{
			name: "Thigh boots",
			heelHeight: 13, // 5 inch heels
			platformHeight: 0
		}
	],
	["extreme heels",
		{
			name: "Painfully extreme heels",
			heelHeight: 21, // 8 inch heels
			platformHeight: 0
		}
	],
	["platform shoes",
		{
			name: "Platforms",
			fs: {
				unlocks: "FSStatuesqueGlorification",
				loves: new Set(["FSStatuesqueGlorification"])
			},
			get requirements() {
				return (V.boughtItem.shoes.heels === 1);
			},
			heelHeight: 0,
			platformHeight: 8 // 3 inch platform, no heels
		}
	],
	["platform heels",
		{
			name: "Platform heels",
			fs: {
				unlocks: "FSStatuesqueGlorification",
				loves: new Set(["FSStatuesqueGlorification"])
			},
			get requirements() {
				return (V.boughtItem.shoes.heels === 1);
			},
			heelHeight: 13, // 8 inches, but not painful like extremes (3 inch platforms)
			platformHeight: 8
		}
	],
	["extreme platform heels",
		{
			name: "Painfully extreme platform heels",
			fs: {
				unlocks: "FSStatuesqueGlorification",
				loves: new Set(["FSStatuesqueGlorification"])
			},
			get requirements() {
				return (V.boughtItem.shoes.heels === 1);
			},
			heelHeight: 21, // 12 inches! 8 inch heel, 4 inch platform
			platformHeight: 10
		}
	],
]);

/**
 * @typedef {object} slaveButtplugs
 * @property {string} name
 * @property {itemFS} [fs]
 * @property {boolean} [requirements]
 * @property {0|1|2|3} width
 * @property {0|1|2} length
 */

/**
 * @type {Map<string, slaveButtplugs>}
 */
App.Data.buttplug = new Map([
	["none",
		{
			name: "None",
			width: 0,
			length: 0
		}
	],
	["plug",
		{
			name: "Standard plug",
			width: 1,
			length: 1
		}
	],
	["long plug",
		{
			name: "Long plug",
			get requirements() {
				return V.boughtItem.toys.buttPlugs === 1;
			},
			width: 1,
			length: 2
		}
	],
	["large plug",
		{
			name: "Large plug",
			width: 2,
			length: 1
		}
	],
	["long, large plug",
		{
			name: "Long, large plug",
			get requirements() {
				return V.boughtItem.toys.buttPlugs === 1;
			},
			width: 2,
			length: 2
		}
	],
	["huge plug",
		{
			name: "Huge plug",
			width: 3,
			length: 1
		}
	],
	["long, huge plug",
		{
			name: "Long, huge plug",
			get requirements() {
				return V.boughtItem.toys.buttPlugs === 1;
			},
			width: 3,
			length: 2
		}
	]
]);
/**
 * @typedef {object} vaginalAccessories
 * @property {string} name
 * @property {itemFS} [fs]
 * @property {boolean} [requirements]
 * @property {0|1|2|3} width
 * @property {0|1|2} length
 * @property {0|1|2} [vibrates=0] 0: none, 1: standard, 2: "smart" vibe
 */

/**
 * @type {Map<string, vaginalAccessories>}
 */
App.Data.vaginalAccessory = new Map([
	["none",
		{
			name: "None",
			width: 0,
			length: 0
		}
	],
	["bullet vibrator",
		{
			name: "Bullet vibrator",
			width: 0,
			length: 1,
			vibrates: 1
		}
	],
	["smart bullet vibrator",
		{
			name: "Smart bullet vibrator",
			get requirements() {
				return V.boughtItem.toys.smartVibes === 1;
			},
			width: 0,
			length: 1,
			vibrates: 2
		}
	],
	["dildo",
		{
			name: "Dildo",
			width: 1,
			length: 1
		}
	],
	["long dildo",
		{
			name: "Long dildo",
			get requirements() {
				return V.boughtItem.toys.dildos === 1;
			},
			width: 1,
			length: 2
		}
	],
	["large dildo",
		{
			name: "Large dildo",
			width: 2,
			length: 1
		}
	],
	["long, large dildo",
		{
			name: "Long, large dildo",
			get requirements() {
				return V.boughtItem.toys.dildos === 1;
			},
			width: 2,
			length: 2
		}
	],
	["huge dildo",
		{
			name: "Huge dildo",
			get requirements() {
				return V.boughtItem.toys.dildos === 1;
			},
			width: 3,
			length: 1
		}
	],
	["long, huge dildo",
		{
			name: "Long, huge dildo",
			get requirements() {
				return V.boughtItem.toys.dildos === 1;
			},
			width: 3,
			length: 2
		}
	]
]);

/**
 * @typedef {slaveWear} bellyAccessory
 * @property {1|2|3|4} [empathyBelly]
 */
/** @type {Map<FC.BellyAccessory, bellyAccessory>} */
App.Data.bellyAccessory = new Map([
	["none", {name: "None"}],
	["a corset",
		{
			name: "Tight corset",
			note: "Slowly narrows the waist through femininity into the start of a waspish hourglass."
		}
	],
	["an extreme corset",
		{
			name: "Extreme corset",
			note: "Narrows the waist through waspish into absurd levels, painfully if waist is feminine or wider (increasing obedience and fear in resistant slaves), but risks miscarriage if a pregnant belly becomes too big."
		}
	],
	["a support band",
		{
			name: "Supportive band",
			note: "Eases the pains of pregnancy and reduces chance of miscarriage."
		}
	],
	["a small empathy belly",
		{
			name: "1st Trimester belly",
			fs: {
				unlocks: "FSRepopulationFocus",
				loves: new Set(["FSRepopulationFocus"])
			},
			get requirements() {
				return V.boughtItem.clothing.belly === 1;
			},
			empathyBelly: 1
		}
	],
	["a medium empathy belly",
		{
			name: "2nd Trimester belly",
			fs: {
				unlocks: "FSRepopulationFocus",
				loves: new Set(["FSRepopulationFocus"])
			},
			get requirements() {
				return V.boughtItem.clothing.belly === 1;
			},
			empathyBelly: 2
		}
	],
	["a large empathy belly",
		{
			name: "3rd Trimester belly",
			fs: {
				unlocks: "FSRepopulationFocus",
				loves: new Set(["FSRepopulationFocus"])
			},
			get requirements() {
				return V.boughtItem.clothing.belly === 1;
			},
			empathyBelly: 3
		}
	],
	["a huge empathy belly",
		{
			name: "3rd Trimester twins belly",
			fs: {
				unlocks: "FSRepopulationFocus",
				loves: new Set(["FSRepopulationFocus"])
			},
			get requirements() {
				return V.boughtItem.clothing.belly === 1;
			},
			empathyBelly: 4
		}
	]
]);
/**
 * @typedef {object} slaveWearChastity
 * @property {string} name
 * @property {object} updateSlave
 * @property {string} [note]
 * @property {itemFS} [fs]
 */

/** @type {Map<string, slaveWearChastity>} */
App.Data.chastity = new Map([
	// '.value' must be a string, so using update slave so I can update multiple values.
	["none",
		{
			name: "None",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 0,
				chastityVagina: 0
			},
		}
	],
	["anal chastity",
		{
			name: "Anal chastity",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 1,
				chastityPenis: 0,
				chastityVagina: 0
			},
			note: "Prevents losing anal virginity."
		}
	],
	["chastity belt",
		{
			name: "Chastity belt",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 0,
				chastityVagina: 1
			},
			note: "Prevents losing virginity, has various effects, obedient virgins, buttsluts and ones with relatively high sex drive are most affected."
		}
	],
	["combined chastity belt",
		{
			name: "Combined chastity belt",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 1,
				chastityPenis: 0,
				chastityVagina: 1
			},
			note: "Prevents losing virginities, has various effects, obedient virgins, buttsluts and ones with relatively high sex drive are most affected."
		}
	],
	["chastity cage",
		{
			name: "Chastity cage",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 1,
				chastityVagina: 0
			},
			note: "Prevents using penis, has various effects, devotion, trust and sex drive of unresistant slaves with healthy sex drive all suffer from wearing one unless they're a masochist, nympho, neglectful, buttslut, sterile or lack balls."
		}
	],
	["combined chastity cage",
		{
			name: "Combined chastity cage",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 1,
				chastityPenis: 1,
				chastityVagina: 0
			},
			note: "Protects both penis and anus from sex, has various effects, devotion and trust and sex drive of unresistant slaves with healthy sex drive all suffer from wearing one unless they're a masochist, nympho, neglectful, buttslut, sterile or lack balls."
		}
	],
	["genital chastity",
		{
			name: "Genital chastity",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 0,
				chastityPenis: 1,
				chastityVagina: 1
			},
			note: "Protects both penis and vagina from sex, has various effects."
		}
	],
	["full chastity",
		{
			name: "Full chastity",
			updateSlave: {
				choosesOwnChastity: 0,
				chastityAnus: 1,
				chastityPenis: 1,
				chastityVagina: 1
			},
			note: "Protects penis, vagina and anus, has various effects."
		}
	],
	["choose own chastity",
		{
			name: "Choose own chastity",
			fs: {unlocks: "FSRestart"},
			updateSlave: {
				choosesOwnChastity: 1
			},
		}
	],
	["revoke choosing own chastity",
		{
			name: "Revoke choosing own chastity",
			fs: {unlocks: "FSRestart"},
			updateSlave: {
				choosesOwnChastity: 0
			},
		}
	]
]);

