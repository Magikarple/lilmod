// cSpell:ignore xxmaskedxx, nopussy, flaccidfutanarimix, micropp

const clothesPrompts = {
	"no clothing": {
		"positive": "(completely nude:1.1), pussy, nipples",
		"negative": "clothes, jeans, underwear, pants, shorts, skirt, panties",
	},
	"a Fuckdoll suit": {  // NG good gen requires LoRA, but below will work without LoRA as well
		"positive": "black latex bodysuit, long sleeves, <lora:xxmaskedxx_lora_v01:0.8> xxmaskedxx",
		"negative": "bare shoulders, exposed skin, exposed legs, exposed arms, short sleeves, nude, pussy, nipples",
	},
	"conservative clothing": {
		"positive": "slacks, pants, silk blouse",
		"negative": "jeans, nude, pussy, nipples",
	},
	"chains": {
		"positive": "(metal chains:1.1), nude, pussy, nipples, navel",
		"negative": "clothes, jeans, underwear, pants, shorts, skirt, panties",
	},
	"Western clothing": {
		"positive": "flannel shirt, chaps, cowboy hat",
		"negative": "nude, pussy, nipples",
	},
	"body oil": {  // Doesn't work well
		"positive": "body oil, nude, pussy, nipples, navel",
		"negative": "clothes, jeans, underwear, pants, shorts, skirt, panties",
	},
	"a toga": {  // Doesn't work well
		"positive": "white toga",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a huipil": {  // Doesn't work well
		"positive": "huipil, mexican clothing",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a slutty qipao": {
		"positive": "qipao, chinese clothing, thighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a kimono": {
		"positive": "kimono",
		"negative": "jeans, nude, pussy, nipples",
	},
	"spats and a tank top": {  // Spats don't work well
		"positive": "bike shorts, tank top",
		"negative": "bike, jeans, nude, pussy, nipples",
	},
	"uncomfortable straps": {
		"positive": "(leather straps, bondage:1.1), nude, pussy, nipples, navel",
		"negative": "clothes, jeans, underwear, pants, shorts, skirt, panties",
	},
	"shibari ropes": {
		"positive": "shibari rope, bondage, nude, pussy, nipples, navel",
		"negative": "clothes, jeans, underwear, pants, shorts, skirt, panties",
	},
	"restrictive latex": {  // Doesn't work well
		"positive": "latex bodysuit, long sleeves",
		"negative": "bare shoulders, exposed skin, exposed legs, exposed arms, short sleeves, nude, pussy, nipples",
	},
	"a latex catsuit": {  // Doesn't work well
		"positive": "latex bodysuit, long sleeves",
		"negative": "bare shoulders, exposed skin, exposed legs, exposed arms, short sleeves, nude, pussy, nipples",
	},
	"attractive lingerie": {  // Cupless part doesn't work well
		"positive": "lingerie, cupless bra, nipples, thong",
		"negative": "clothes, jeans, pants",
	},
	"attractive lingerie for a pregnant woman": {  // Cupless part doesn't work well
		"positive": "lingerie, cupless bra, nipples, thong",
		"negative": "clothes, jeans, pants",
	},
	"kitty lingerie": {  // Broken for photorealistic models, probably works for anime models
		"positive": "kitty lingerie, cat lingerie, kawaii lingerie",
		"negative": "cat ears, jeans, nude, pussy, nipples",
	},
	"a maternity dress": {
		"positive": "maternity dress, loose dress",
		"negative": "jeans, nude, pussy, nipples",
	},
	"stretch pants and a crop-top": {
		"positive": "crop top, midriff, navel, leggings",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a succubus outfit": {
		"positive": "succubus costume, red leather corset, red leather miniskirt, black demon horns",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a fallen nuns habit": {
		"positive": "(latex nun habit:1.1), thighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a penitent nuns habit": {
		"positive": "(latex nun habit:1.1), thighs, rope, bondage",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a chattel habit": {
		"positive": "(white latex nun habit:1.1), gold belt, bare breasts, nipples",
		"negative": "",
	},
	"a string bikini": {  // Cupless part doesn't work well
		"positive": "string microbikini, cupless bikini, nipples",
		"negative": "jeans, nude, pussy",
	},
	"a scalemail bikini": {  // Doesn't work well
		"positive": "chainmail bikini, navel",
		"negative": "jeans, nude, pussy, nipples",
	},
	"striped panties": {
		"positive": "blue striped panties, underwear only, nipples",
		"negative": "jeans, nude, pussy",
	},
	"a cheerleader outfit": {
		"positive": "(cheerleader outfit:1.1), skirt, thighs, crop top, navel, midriff",
		"negative": "jeans, nude, pussy, nipples",
	},
	"clubslut netting": {
		"colors": ["light blue", "pink", "lime green"],
		"positive": "rave clothing, lewd, transparent clothing, $color fishnet bodysuit, $color fishnet, choker",
		"negative": "cloth, jeans, pants, corset",
	},
	"cutoffs and a t-shirt": {
		"positive": "white t-shirt, jean shorts",
		"negative": "nude, pussy, nipples",
	},
	"slutty business attire": {
		"positive": "suit jacket, cleavage, black skirt, thighs",
		"negative": "jeans, nude, pussy, nipples"
	},
	"nice business attire": {
		"positive": "suit jacket, collared shirt, black skirt",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a ball gown": {
		"positive": "ballgown, long dress, luxurious dress, thighhighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a slave gown": {
		"positive": "ballgown, long dress, luxurious dress, thighhighs, cleavage, see-through, translucent clothing, straps, bdsm",
		"negative": "jeans, nude",
	},
	"a halter top dress": {
		"positive": "(halterneck:1.1), long dress, luxurious dress, bare back,",
		"negative": "jeans, nude, pussy, nipples",
	},
	"an evening dress": {
		"positive": "evening gown, long dress, luxurious dress, thighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a mini dress": {
		"positive": "short dress, tight dress, strapless, cleavage, thighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a comfortable bodysuit": {
		"positive": "latex bodysuit, long sleeves",
		"negative": "bare shoulders, exposed skin, exposed legs, exposed arms, short sleeves, nude, pussy, nipples",
	},
	"a leotard": {
		"positive": "leotard, thighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a monokini": {  // Doesn't work well
		"positive": "monokini",
		"negative": "jeans, nude, pussy, nipples",
	},
	"an apron": {
		"positive": "apron, thighs, nude",
		"negative": "clothes, shirt, pants, shorts, pussy, nipples",
	},
	"overalls": {
		"positive": "overalls, naked overalls",
		"negative": "shirt, pants, shorts, pussy, nipples, topless",
	},
	"a cybersuit": {  // Doesn't work well
		"positive": "cybersuit, latex bodysuit, long sleeves, cybernetic, science fiction",
		"negative": "bare shoulders, exposed skin, exposed legs, exposed arms, short sleeves, nude, pussy, nipples",
	},
	"a tight Imperial bodysuit": {  // Doesn't work well
		"positive": "imperial bodysuit, latex bodysuit, long sleeves, cybernetic, science fiction",
		"negative": "bare shoulders, exposed skin, exposed legs, exposed arms, short sleeves, nude, pussy, nipples",
	},
	"battlearmor": {  // Doesn't work well
		"positive": "(armor, science fiction, soldier:1.1)",
		"negative": "jeans, nude, pussy, nipples",
	},
	"Imperial Plate": {  // Doesn't work well
		"positive": "(armor, science fiction, soldier:1.1)",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a bunny outfit": {
		"positive": "playboy bunny, backless leotard, pantyhose",
		"negative": "jeans, nude, pussy, nipples, rabbit ears",
	},
	"a slutty maid outfit": {
		"positive": "maid, minidress, apron, white shirt, cleavage, thighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a nice maid outfit": {
		"positive": "maid, dress, apron, white shirt",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a slutty nurse outfit": {
		"positive": "nurse, white jacket, cleavage, white skirt, thighs",
		"negative": "jeans, shirt, pussy, nipples",
	},
	"a nice nurse outfit": {
		"positive": "nurse, white medical scrubs, pants",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a dirndl": {
		"positive": "(dirndl:1.1)",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a long qipao": {
		"positive": "(qipao:1.1), long dress, chinese clothes",
		"negative": "jeans, nude, pussy, nipples",
	},
	"lederhosen": {
		"positive": "(lederhosen:1.1)",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a biyelgee costume": {  // Doesn't work well
		"positive": "mongolian traditional clothes",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a hanbok": {
		"positive": "(hanbok:1.1)",
		"negative": "jeans, nude, pussy, nipples",
	},
	"burkini": {
		"positive": "burqa, muslim clothes, burkini, pants",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a hijab and blouse": {
		"positive": "(hijab:1.1), blouse, short sleeves, long skirt",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a hijab and abaya": {
		"positive": "hijab, abaya",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a niqab and abaya": {  // Doesn't work well
		"positive": "niqab, covered face, abaya",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a burqa": {  // Doesn't work well
		"positive": "burqa, muslim clothes",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a police uniform": {
		"positive": "police uniform, policewoman, police hat, jacket, pants, belt",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a gothic lolita dress": {
		"positive": "gothic lolita, dress, thighhighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a one-piece swimsuit": {
		"positive": "one-piece swimsuit, thighs",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a nice pony outfit": {  // Tbh, not really sure what this is
		"positive": "latex bodysuit, long sleeves",
		"negative": "bare shoulders, exposed skin, exposed legs, exposed arms, short sleeves, nude, pussy, nipples",
	},
	"a slutty pony outfit": {  // Same
		"positive": "latex bodysuit, long sleeves, cleavage, thighs",
		"negative": "nude, pussy, nipples",
	},
	"a button-up shirt and panties": {  // Often not bottomless
		"positive": "collared shirt, oversized clothes, panties, (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nude, pussy, nipples",
	},
	"a button-up shirt": {  // Often not bottomless
		"positive": "collared shirt, oversized clothes, pussy, nude, (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"a sweater": {  // Often not bottomless
		"positive": "sweater, oversized clothes, pussy, nude, (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"a t-shirt": {  // Often not bottomless
		"positive": "t-shirt, (pussy, nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"a tank-top": {  // Often not bottomless
		"positive": "tank top, bare shoulders, (pussy, nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"a tube top": {  // Often not bottomless
		"positive": "tube top, bare shoulders, (pussy, nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nude, nipples",
	},
	"an oversized t-shirt": {  // Often not bottomless
		"positive": "t-shirt, oversized clothes, (pussy, nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"a bra": {  // Often not bottomless
		"positive": "bra, (pussy, nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"a sports bra": {  // Often not bottomless
		"positive": "sports bra, (pussy, nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"a striped bra": {  // Often not bottomless
		"positive": "striped bra, (pussy, nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"pasties": {  // Doesn't work well
		"positive": "pasties, pussy, nude, (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples",
	},
	"a tube top and thong": {
		"positive": "tube top, bare shoulders, (nude:1.1), (bottomless:1.1), g-string, thighs",
		"negative": "jeans, pants, skirt, shorts, nipples, pussy",
	},
	"a sweater and panties": {  // Often not bottomless
		"positive": "sweater, oversized clothes, panties, (nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples, pussy",
	},
	"a tank-top and panties": {  // Often not bottomless
		"positive": "tank top, bare shoulders, panties, (nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, shorts, nipples, pussy",
	},
	"a t-shirt and thong": {  // Often not bottomless
		"positive": "t-shirt, (nude:1.1), (bottomless:1.1), g-string, thighs",
		"negative": "jeans, pants, skirt, shorts, nipples, pussy",
	},
	"an oversized t-shirt and boyshorts": {  // Doesn't work well
		"positive": "t-shirt, oversized clothes, boyshort panties, (nude:1.1), (bottomless:1.1), thighs",
		"negative": "jeans, pants, skirt, nipples, pussy",
	},
	"sport shorts and a t-shirt": {
		"positive": "t-shirt, sport shorts",
		"negative": "jeans, pants, skirt, nipples, pussy",
	},
	"sport shorts and a sports bra": {
		"positive": "sports bra, sport shorts",
		"negative": "jeans, pants, skirt, nipples, pussy",
	},
	"a t-shirt and panties": {  // Often not bottomless
		"positive": "t-shirt, (nude:1.1), (bottomless:1.1), panties, thighs",
		"negative": "jeans, pants, skirt, shorts, nipples, pussy",
	},
	"striped underwear": {  // Often not bottomless
		"positive": "striped panties, striped bra",
		"negative": "jeans, pants, skirt, shorts, nipples, pussy",
	},
	"a thong": {
		"positive": "thong, topless, nipples",
		"negative": "jeans, pants, skirt, shorts, pussy",
	},
	"a skimpy loincloth": {  // Doesn't work well
		"positive": "loincloth, topless, nipples",
		"negative": "jeans, pants, skirt, shorts, pussy",
	},
	"boyshorts": {
		"positive": "boyshort panties, topless, nipples",
		"negative": "jeans, pants, skirt, pussy",
	},
	"panties": {
		"positive": "panties, topless, nipples",
		"negative": "jeans, pants, skirt, pussy",
	},
	"panties and pasties": {  // Doesn't work well
		"positive": "panties, pasties, topless",
		"negative": "jeans, pants, skirt, pussy, nipples",
	},
	"cutoffs": {
		"positive": "jean shorts, topless, nipples",
		"negative": "pussy",
	},
	"sport shorts": {
		"positive": "sport shorts, topless, nipples",
		"negative": "jeans, pants, skirt, pussy",
	},
	"a sweater and cutoffs": {
		"positive": "sweater, jean shorts",
		"negative": "pussy, nipples",
	},
	"leather pants and a tube top": {
		"positive": "leather pants, tube top, bare shoulders",
		"negative": "jeans, pants, skirt, shorts, pussy, nipples",
	},
	"a t-shirt and jeans": {
		"positive": "t-shirt, jeans",
		"negative": "pussy, nipples",
	},
	"leather pants and pasties": {  // Doesn't work well
		"positive": "leather pants, pasties, topless",
		"negative": "jeans, pants, skirt, shorts, pussy, nipples",
	},
	"leather pants": {
		"positive": "leather pants, topless, nipples",
		"negative": "jeans, pants, skirt, shorts, pussy",
	},
	"jeans": {
		"positive": "jeans, topless, nipples",
		"negative": "pussy",
	},
	"a military uniform": {
		"positive": "military uniform, shirt, necktie, skirt",
		"negative": "jeans, shorts, pussy, nipples",
	},
	"battledress": {
		"positive": "military fatigues, camouflage pants, tank top",
		"negative": "shorts, pussy, nipples",
	},
	"a mounty outfit": {  // Doesn't work well
		"positive": "mounty, red military jacket",
		"negative": "jeans, shorts, pussy, nipples",
	},
	"harem gauze": {
		"positive": "harem outfit, loose dress, see-through, transparent clothes, nipples, pussy",
		"negative": "jeans, shorts",
	},
	"slutty jewelry": {
		"positive": "nude, jewelry, gem, gold chains, armlet, nipples, pussy",
		"negative": "clothes, jeans, underwear, pants, shorts, skirt, panties"
	},
	"a Santa dress": {
		"positive": "santa costume, santa dress, thighs",
		"negative": "jeans, nude, pussy, nipples"
	},
	"a bimbo outfit": {
		"positive": "(pink:1.1) tube top, bra, cleavage, pink microskirt, thighs, panties, navel, midriff",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a slutty outfit": {
		"positive": "(pink:1.1) crop top, pink lowleg microskirt, (pussy:1.1), hip bones, groin, tight clothes, midriff, navel, (thighs:1.1)",
		"negative": "jeans, nude, nipples",
	},
	"a courtesan dress": {  // Corset was messing stuff up, so I removed it
		"positive": "(luxurious flowing dress:1.1), bare shoulders, long sleeves, detached sleeves",
		"negative": "jeans, nude, pussy, nipples",
	},
	"a schoolgirl outfit": {
		"positive": "school uniform, white shirt, plaid skirt",
		"negative": "jeans, nude, pussy, nipples",
	}
};

App.Art.GenAI.ClothesPromptPart = class ClothesPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @returns {string}
	 */
	getClothes() {
		let clothes = this.slave.clothes;
		if (!clothesPrompts.hasOwnProperty(clothes) && !V.customClothesPrompts.hasOwnProperty(clothes)) {
			clothes = "no clothing";
		}
		if (this.slave.race === "catgirl") {
			clothes = "no clothing";
		}
		return clothes;
	}
	get isFeminine() {  // re-used from genderPromptPart.js with same strike lines
		const hormoneTransitionThreshold = 100;
		if (this.slave.hormoneBalance >= hormoneTransitionThreshold) {
			return true; // transwoman (or hormone-boosted natural woman)
		}
		return this.slave.genes === "XX" && (this.slave.hormoneBalance > -hormoneTransitionThreshold); // natural woman, and NOT transman
	}

	/**
	 * Remove positive keywords for genitalia from slaves that don't have the genitalia described by the keyword.
	 * Currently handles pussies, added penis (M/F appearance) and null slaves
	 * @param {string} prompt
	 * @returns {string}
	 */
	bodyPartReplacer(prompt) { // NG add penis, and penis size, and LoRA ties using this.slave.dick (size=/=inches, 3 is "Normal") and confirm hormone balance, add Null
		 if (this.slave.dick === 0 && this.slave.vagina === -1) { // Null slave
			if (V.aiLoraPack) {
				return prompt.replace(/( *)pussy(,)*/g, " <lora:nopussy_v1:1>,"); // Removes pussy or penis for null slaves
			} else {
				return prompt.replace(/( *)pussy(,)*/g, ""); // probably renders as female anyway; use the LoRA if you want good results
			}
		} else if (this.isFeminine || this.slave.boobs > 800) { // female-looking based on hormones, aligned with genderPromptPart, or if very large breasts and a dick
		// } else if (perceivedGender(this.slave) > -1) { // new perceivedGender gender function: tried, needs further tuning
			if (V.aiLoraPack) {
				if (this.slave.dick > 4) {
					return prompt.replace(/( *)pussy(,)*/g, " <lora:flaccidfutanarimix-locon-dim64-alpha64-highLR-000003:0.8> penis,"); // Massive, unrealistic penis for futa - Converts to female appearance
				} else if (this.slave.dick >= 2) {
					return prompt.replace(/( *)pussy(,)*/g, " <lora:futanari-000009:0.5> penis,"); // Normal penis for futa - Converts to female appearance
				} else if (this.slave.dick < 2 && this.slave.dick > 0) {
					return prompt.replace(/( *)pussy(,)*/g, " <lora:micropp_32dim_nai_v2:0.8> penis,"); // Micro penis for futa - Converts to female appearance
				}
			} // else fall through to female default - don't even try to render futas without a LoRA
		} else if (this.slave.dick > 0) { // Looks male, has penis
			if (V.aiLoraPack) {
				if (this.slave.dick < 2) {
					return prompt.replace(/( *)pussy(,)*/g, " <lora:micropp_32dim_nai_v2:0.8> small penis,"); // Micropenis
				} else if (this.slave.dick < 4) {
					return prompt.replace(/( *)pussy(,)*/g, " <lora:OnlyCocksV1LORA:0.8> penis,"); // Average Male Penis. Note this LoRA is always erect...
				} else {
					return prompt.replace(/( *)pussy(,)*/g, " <lora:flaccidfutanarimix-locon-dim64-alpha64-highLR-000003:0.8> large penis,"); // Massive schlong. Always flaccid...
				}
			} else {
				return prompt.replace(/( *)pussy(,)*/g, " penis,"); // no LoRA applied; won't work well in most models, but try anyway?
			}
		}
		return prompt; // female default
	}

	/**
	 * Replace the literal "$color" in a prompt with the name of a color
	 * @param {string} prompt
	 * @param {string[]} colors
	 * @returns {string}
	 */
	colorReplacer(prompt, colors) {
		if (colors && prompt.includes('$color')) {
			const color = colors[this.slave.natural.artSeed % colors.length];
			return prompt.replaceAll('$color', color);
		}
		return prompt;
	}

	/**
	 * @override
	 */
	positive() {
		let basePrompt;
		if (V.customClothesPrompts.hasOwnProperty(this.getClothes()) && V.customClothesPrompts[this.getClothes()].positive !== '') {
			basePrompt = V.customClothesPrompts[this.getClothes()];
		} else {
			basePrompt = clothesPrompts[this.getClothes()];
		}

		const coloredPrompt = this.colorReplacer(basePrompt.positive, basePrompt.colors);
		return this.bodyPartReplacer(coloredPrompt);
	}

	/**
	 * @override
	 */
	negative() {
		if (V.customClothesPrompts.hasOwnProperty(this.getClothes()) && V.customClothesPrompts[this.getClothes()].negative !== '') {
			return V.customClothesPrompts[this.getClothes()].negative;
		} else {
			return clothesPrompts[this.getClothes()].negative;
		}
	}
};
