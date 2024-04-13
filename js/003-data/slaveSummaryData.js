// cSpell:ignore humil, Bron, Horm, Unflinch, Advoc, Sinf, Insec, Hatr, Apath, Repre, Arrog, Caref, Ambiv, Musc, Toddl
// cSpell:ignore SSBBW

// these ratings tables are consumed by App.Ratings.xxx()
// those function takes a value for rating and iterates a table (in the declaration order)
// until it finds a key greater or equal to the value; the found record is returned from the function
// Briefly, each dictionary entry key -> value is read as "the highest rating that still suits -> value" or
// "up to, including"
// The idea behind this is to decrease number of comparisons and retain compatibility with simple dictionaries
// without sparse keys
App.Data.SlaveSummary = {
	long: {
		body: {
			age: {
				4: "Toddler.",
				10: "Child.",
				12: "Preteen.",
				16: "Early teens.",
				19: "Late teens.",
				24: "Early twenties.",
				29: "Late twenties.",
				34: "Early thirties.",
				39: "Late thirties.",
				49: "Forties",
				59: "Fifties",
				69: "Sixties",
				999: "Elderly."
			},
			face: { // face value + 100
				4: {desc: "Very ugly", style: "red"},
				59: {desc: "Ugly", style: "red"},
				89: {desc: "Unattractive", style: "red"},
				110: {desc: "Average"},
				140: {desc: "Attractive", style: "pink"},
				195: {desc: "Beautiful", style: "pink"},
				200: {desc: "Very beautiful", style: "pink"},
			},
			lips: {
				10: {desc: "Thin lips", style: "red"},
				20: {desc: "Normal lips"},
				40: {desc: "Pretty lips"},
				70: {desc: "Big lips"},
				95: {desc: "Huge lips"},
				100: {desc: "Facepussy"}
			},
			teeth: {
				"crooked": {desc: "Crooked teeth.", style: "yellow"},
				"gapped": {desc: "Tooth gap.", style: "yellow"},
				"cosmetic braces": {desc: "Cosmetic braces."},
				"straightening braces": {desc: "Braces."},
				"removable": {desc: "Removable teeth."},
				"pointy": {desc: "Sharp fangs."},
				"baby": {desc: "Baby teeth."},
				"mixed": {desc: "Mixed teeth."}
			},
			waist: { // waist value + 100
				4: {desc: "Absurdly narrow waist", style: "pink"},
				59: {desc: "Hourglass waist", style: "pink"},
				89: {desc: "Feminine waist", style: "pink"},
				110: {desc: "Average waist"},
				140: {desc: "Unattractive waist", style: "red"},
				195: {desc: "Ugly waist", style: "red"},
				200: {desc: "Masculine waist", style: "red"}
			},
			genitalia: {
				dickBalls: { // indices [dick, balls]
					3: {
						3: null,
						4: "Big balls.",
						5: "Huge balls.",
						8: "Monstrous balls.",
						99: "Hyper balls."
					},
					4: {
						3: "Big dick.",
						99: "Big dick & balls."
					},
					5: {
						4: "Huge dick.",
						99: "Huge dick & balls."
					},
					8: {
						5: "Monster dong.",
						99: "Monster dick & balls."
					},
					99: {
						8: "Hyper dong.",
						99: "Hyper dick & balls."
					}
				},
				holes: { // indices [vagina, anus]
					2: {
						2: null,
						3: "Gaping anus.",
						4: "Permagaped anus."
					},
					3: {
						2: "Loose pussy.",
						3: "High mileage."
					},
					99: {
						3: "Cavernous pussy.",
						4: "Blown out holes."
					}
				}
			},
			titsAss: { // indices: [boobs, butt, FSAssetExpansionist(0,1), weight+100, muscles+100]
				499: {
					2: {
						2: { // FSAssetExpansionist doesn't matter
							109: {
								130: {desc: "Girlish figure.", style: "pink"},
							},
						},
					},
					4: null,
					6: {desc: "Big ass.", style: "pink"},
					8: {desc: "Huge ass.", style: "pink"},
					9: {desc: "Titanic ass.", style: "pink"},
					999: {desc: "Hyper ass.", style: "pink"},
				},
				799: {
					4: null,
					6: {desc: "Big ass.", style: "pink"},
					8: {desc: "Huge ass.", style: "pink"},
					9: {desc: "Titanic ass.", style: "pink"},
					999: {desc: "Hyper ass.", style: "pink"},
				},
				1999: {
					4: {desc: "Big tits.", style: "pink"},
					999: {desc: "Big T&A.", style: "pink"}
				},
				3999: {
					6: {desc: "Huge tits.", style: "pink"},
					999: {desc: "Huge T&A.", style: "pink"}
				},
				11999: {
					8: {desc: "Monstrous tits.", style: "pink"},
					999: {desc: "Enormous T&A.", style: "pink"},
				},
				100000: {
					9: {desc: "Immobilizing tits.", style: "pink"},
					999: {desc: "Hyper T&A.", style: "pink"}
				}
			},
			weight: { // indices: [weigh + 100, FSHedonisticDecadence (0,1), hips + 2]
				4: {desc: "Emaciated", style: "red"},
				69: {
					2: { // FSHedonisticDecadence doesn't matter
						0: {desc: "Model-thin"},
						5: {desc: "Very thin", style: "red"}
					}
				},
				89: {desc: "Thin"},
				110: {desc: "Trim"},
				130: {desc: "Plush"},
				195: {
					0: {
						3: {desc: "Overweight", style: "red"},
						99: {desc: "Nicely chubby"}
					},
					1: {desc: "Nicely chubby"}
				},
				230: {
					0: {
						4: {desc: "Fat", style: "red"},
						99: {desc: "Pleasantly soft and shapely"}
					},
					1: {desc: "Pleasantly soft and shapely"}
				},
				260: {
					0: {desc: "Obese", style: "red"},
					1: {desc: "Amazingly voluptuous"}
				},
				290: {
					0: {desc: "Super Obese", style: "red"},
					1: {desc: "SSBBW"}
				},
				999: {
					0: {desc: "Dangerously Obese", style: "red"},
					1: {desc: "Perfectly massive"}
				}
			},
			hipsAss: {
				0: {desc: "Disproportionately small butt.", style: "red"},
				1: {desc: "Disproportionately big butt.", style: "red"}
			},
			muscles: { // indices: [muscles + 100, FSPhysicalIdealist(0,1) ]
				4: {desc: "Frail", style: "red"},
				69: {
					0: {desc: "Very weak"},
					1: {desc: "Very weak", style: "red"}
				},
				94: {
					0: {desc: "Weak"},
					1: {desc: "Weak", style: "red"}
				},
				105: {desc: "Soft"},
				130: {desc: "Toned"},
				150: {desc: "Fit"},
				195: {desc: "Muscular"},
				200: {desc: "Hugely muscular"}
			}
		},
		mental: {
			devotion: { // devotion value + 100
				4: {desc: "Very hateful", style: ["devotion", "hateful"]},
				49: {desc: "Hateful", style: ["devotion", "hateful"]},
				79: {desc: "Resistant", style: ["devotion", "resistant"]},
				120: {desc: "Ambivalent", style: ["devotion", "ambivalent"]},
				150: {desc: "Accepting", style: ["devotion", "accept"]},
				195: {desc: "Devoted", style: ["devotion", "devoted"]},
				200: {desc: "Worshipful", style: ["devotion", "worship"]}
			},
			trust: { // first key: trust + 100, second key: devotion + 100
				4: {desc: "Extremely terrified", style: ["trust", "extremely-terrified"]},
				49: {desc: "Terrified", style: ["trust", "terrified"]},
				79: {desc: "Frightened", style: ["trust", "frightened"]},
				120: {desc: "Fearful", style: ["trust", "fearful"]},
				150: {
					79: {desc: "Careful", style: ["defiant", "careful"]},
					200: {desc: "Careful", style: ["trust", "careful"]},
				},
				195: {
					79: {desc: "Bold", style: ["defiant", "bold"]},
					200: {desc: "Trusting", style: ["trust", "trusting"]},
				},
				200: {
					79: {desc: "Defiant", style: ["defiant", "full"]},
					200: {desc: "Profoundly trusting", style: ["trust", "prof-trusting"]},
				}
			},
			education: { // index: intelligenceImplant + 15
				0: ", hindered",
				29: "",
				44: ", educated",
				99: ", well educated"
			},
			intelligence: { // index: intelligence + 100
				4: {desc: "Moronic", style: "unintelligent"},
				49: {desc: "Very slow", style: "unintelligent"},
				84: {desc: "Slow", style: "unintelligent"},
				115: {desc: "Average intelligence"},
				150: {desc: "Smart", style: "intelligent"},
				195: {desc: "Very smart", style: "intelligent"},
				230: {desc: "Brilliant", style: "intelligent"},
				999: {desc: "Genius", style: "intelligent"},
			},
			behavioralFlaw: {
				"arrogant": "Arrogant.",
				"bitchy": "Bitchy.",
				"odd": "Odd.",
				"hates men": "Hates men.",
				"hates women": "Hates women.",
				"gluttonous": "Stress eater.",
				"anorexic": "Anorexic.",
				"devout": "Devoutly religious.",
				"liberated": "Mentally liberated.",
			}
		},
		fetish: { // indices [fetish, fetishStrength]
			"submissive": {
				60: "Submissive tendencies",
				95: "Submissive",
				100: "Complete submissive"
			},
			"cumslut": {
				60: "Prefers oral",
				95: "Oral fixation",
				100: "Cumslut"
			},
			"humiliation": {
				60: "Interest in humiliation",
				95: "Exhibitionist",
				100: "Humiliation slut"
			},
			"buttslut": {
				60: "Prefers anal",
				95: "Anal fixation",
				100: "Buttslut"
			},
			"boobs": {
				60: "Loves boobs",
				95: "Breast fixation",
				100: "Boobslut"
			},
			"sadist": {
				60: "Sadistic tendencies",
				95: "Sadist",
				100: "Complete sadist"
			},
			"masochist": {
				60: "Masochistic tendencies",
				95: "Masochist",
				100: "Complete masochist"
			},
			"dom": {
				60: "Dominant tendencies",
				95: "Dominant",
				100: "Complete dom"
			},
			"pregnancy": {
				60: "Interest in impregnation",
				95: "Pregnancy kink",
				100: "Pregnancy fetish"
			},
			"bestiality": {
				60: "Interest in bestiality",
				95: "Bestiality kink",
				100: "Bestiality fetish"
			},
			"none": "Sexually vanilla"
		},
		clothes: {
			"Western clothing": "Chaps.",
			"a Santa dress": "Santa dress.",
			"a ball gown": "Ball gown.",
			"a bimbo outfit": "Bimbo outfit.",
			"a biyelgee costume": "Biyelgee costume.",
			"a bra": "Nice bra.",
			"a bunny outfit": "Bunny outfit.",
			"a burkini": "Burkini.",
			"a burqa": "Burqa.",
			"a button-up shirt and panties": "Button-up shirt, panties.",
			"a button-up shirt": "Nice button-up shirt.",
			"a chattel habit": "Chattel habit.",
			"a cheerleader outfit": "Cheerleader.",
			"a comfortable bodysuit": "Bodysuit.",
			"a courtesan dress": "Courtesan dress.",
			"a cybersuit": "Cybersuit.",
			"a dirndl": "Dirndl.",
			"a fallen nuns habit": "Slutty habit.",
			"a gothic lolita dress": "Gothic lolita dress.",
			"a halter top dress": "Halter top dress.",
			"a hanbok": "Hanbok.",
			"a hijab and abaya": "Hijab and abaya.",
			"a hijab and blouse": "Hijab and blouse.",
			"a huipil": "Huipil.",
			"a kimono": "Kimono.",
			"a klan robe": "Klan robe.",
			"a latex catsuit": "Nice latex.",
			"a leotard": "Leotard.",
			"a long qipao": "Long Qipao.",
			"Imperial Plate": "Imperial Plate.",
			"a tight Imperial bodysuit": "Imperial Bodysuit.",
			"a maternity dress": "Maternity dress.",
			"a military uniform": "Military uniform.",
			"a mini dress": "Mini dress.",
			"a monokini": "Monokini.",
			"a mounty outfit": "Mounty outfit.",
			"a nice maid outfit": "Nice maid.",
			"a nice nurse outfit": "Nice nurse.",
			"a nice pony outfit": "Nice pony outfit.",
			"a niqab and abaya": "Niqab and abaya.",
			"a one-piece swimsuit": "Swimsuit.",
			"a penitent nuns habit": "Cilice.",
			"a police uniform": "Police uniform.",
			"a red army uniform": "Red Army uniform.",
			"a scalemail bikini": "Scalemail bikini.",
			"a schoolgirl outfit": "Schoolgirl outfit.",
			"a schutzstaffel uniform": "Schutzstaffel uniform.",
			"a skimpy loincloth": "Skimpy loincloth.",
			"a slave gown": "Slave gown.",
			"a slutty klan robe": "Slutty klan robe.",
			"a slutty maid outfit": "Slutty maid.",
			"a slutty nurse outfit": "Slutty nurse.",
			"a slutty outfit": "Slutty outfit.",
			"a slutty pony outfit": "Slutty pony outfit.",
			"a slutty qipao": "Slutty qipao.",
			"a slutty schutzstaffel uniform": "Slutty Schutzstaffel uniform.",
			"a sports bra": "Sports bra.",
			"a string bikini": "String bikini.",
			"a striped bra": "Striped bra.",
			"a succubus outfit": "Succubus outfit.",
			"a sweater and cutoffs": "Jean shorts, sweater.",
			"a sweater and panties": "Sweater, panties.",
			"a sweater": "Nice sweater.",
			"a t-shirt and jeans": "Blue jeans, t-shirt.",
			"a t-shirt and panties": "Panties, t-shirt.",
			"a t-shirt and thong": "Thong, t-shirt.",
			"a t-shirt": "T-shirt.",
			"a tank-top and panties": "Tank-top, panties.",
			"a tank-top": "Nice tank-top.",
			"a thong": "Nice thong.",
			"a toga": "Toga.",
			"a tube top and thong": "Tube top, thong.",
			"a tube top": "Nice tube top.",
			"a confederate army uniform": "Confederate Army uniform.",
			"an apron": "Apron.",
			"an oversized t-shirt and boy shorts": "Over-sized t-shirt, boy shorts.",
			"an oversized t-shirt": "Nice over-sized t-shirt.",
			"an evening dress": "Evening dress.",
			"attractive lingerie for a pregnant woman": "Preggo lingerie.",
			"attractive lingerie": "Nice lingerie.",
			"battlearmor": "Battlearmor.",
			"battledress": "Battledress.",
			"body oil": "Body oil.",
			"boyshorts": "Boy shorts.",
			"chains": "Chains.",
			"clubslut netting": "Netting.",
			"conservative clothing": "Conservative clothing.",
			"cutoffs and a t-shirt": "Cutoffs, t-shirt.",
			"cutoffs": "Jean shorts.",
			"harem gauze": "Harem outfit.",
			"jeans": "Tight blue jeans.",
			"kitty lingerie": "Kitty lingerie.",
			"leather pants and a tube top": "Leather pants, tube top.",
			"leather pants and pasties": "Leather pants, pasties.",
			"leather pants": "Nice leather pants.",
			"lederhosen": "Lederhosen.",
			"nice business attire": "Nice suit.",
			"overalls": "Overalls.",
			"panties and pasties": "Pasties, panties.",
			"panties": "Nice panties.",
			"pasties": "Pasties.",
			"restrictive latex": "Bondage latex.",
			"shibari ropes": "Shibari.",
			"slutty business attire": "Slutty suit.",
			"slutty jewelry": "Bangles.",
			"spats and a tank top": "Spats, tank top.",
			"sport shorts and a sports bra": "Shorts, bra.",
			"sport shorts and a t-shirt": "Nice sport shorts, shirt.",
			"sport shorts": "Shorts.",
			"stretch pants and a crop-top": "Stretch pants, crop-top.",
			"striped panties": "Striped panties.",
			"striped underwear": "Striped underwear",
			"uncomfortable straps": "Leather straps.",

		},
		accessory: {
			collar: {
				"ancient Egyptian": "Wesekh.",
				"bell collar": "Bell collar.",
				"bowtie": "Bowtie collar.",
				"neck tie": "Neck tie.",
				"cruel retirement counter": "Cruel counter collar.",
				"heavy gold": "Gold collar.",
				"leather with cowbell": "Cowbell collar.",
				"neck corset": "Neck corset.",
				"nice retirement counter": "Nice counter collar.",
				"preg biometrics": "Pregnancy biometrics collar.",
				"pretty jewelry": "Pretty collar.",
				"satin choker": "Satin choker.",
				"shock punishment": "Shock collar.",
				"silk ribbon": "Silken ribbon.",
				"stylish leather": "Stylish leather collar.",
				"tight steel": "Steel collar.",
				"uncomfortable leather": "Leather collar.",
			},
			faceAccessory: {
				"porcelain mask": "Porcelain mask.",
				"cat ears": "Cat ears.",
			},
			mouthAccessory: {
				"bit gag": "Bit gag.",
				"dildo gag": "Dildo gag.",
				"ring gag": "Ring gag.",
				"massive dildo gag": "Throat-bulging dildo gag.",
				"ball gag": "Ball gag.",
			},
			belly: {
				"a corset": "Corset.",
				"a huge empathy belly": "Huge fake belly.",
				"a large empathy belly": "Large fake belly.",
				"a medium empathy belly": "Medium fake belly.",
				"a small empathy belly": "Small fake belly.",
				"a support band": "Support band.",
				"an extreme corset": "Extreme corsetage.",
				"shapewear": "Shapewear.",
			},
			vaginal: {
				"bullet vibrator": "Attached bullet vibrator.",
				"smart bullet vibrator": "Attached smart bullet vibrator.",
				"dildo": "Vaginal dildo.",
				"large dildo": "Large vaginal dildo.",
				"huge dildo": "Huge vaginal dildo.",
				"long dildo": "Long vaginal dildo.",
				"long, large dildo": "Long and large vaginal dildo.",
				"long, huge dildo": "Long and wide vaginal dildo.",
			},
			buttplug: {
				"plug": "Buttplug.",
				"large plug": "Large buttplug.",
				"huge plug": "Huge buttplug.",
				"long plug": "Long buttplug.",
				"long, large plug": "Large, long buttplug.",
				"long, huge plug": "Enormous buttplug.",
			},
			buttplugAttachment: {
				"tail": "Attached tail.",
				"cat tail": "Attached cat tail.",
				"fox tail": "Attached fox tail.",
				"cow tail": "Attached cow tail.",
			}
		},
		diet: {
			"restricted": "Dieting.",
			"fattening": "Gaining weight.",
			"corrective": "Corrective.",
			"XX": "Estrogen rich.",
			"XY": "Testosterone rich.",
			"XXY": "Futanari mix.",
			"muscle building": "Pumping iron.",
			"slimming": "Slimming down.",
			"cum production": "Cum production.",
			"cleansing": "Cleansing.",
			"fertility": "Fertility.",
		},
		specialDiet: { // index: dietCum + 3 * dietMilk
			0: null,
			1: "Cum Added.",
			2: "Cum Based.",
			3: "Milk Added.",
			4: "Milk & Cum Added.",
			5: "Cum Based with Milk.",
			6: "Milk Based.",
			7: "Milk Based with Cum.",
			8: "Cum and Milk Based."
		},
		hormoneBalance: { // rating is hormoneBalance value + 500
			0: "Absolutely masculine",
			100: "Overwhelmingly masculine",
			200: "Extremely masculine",
			300: "Heavily masculine",
			400: "Very masculine",
			479: "Masculine",
			520: "Neutral",
			599: "Feminine",
			699: "Very feminine",
			799: "Heavily feminine",
			899: "Extremely feminine",
			999: "Overwhelmingly feminine",
			1000: "Absolutely feminine"
		},
		health: {
			illness: {
				0: null,
				1: {desc: "Sick", style: "yellow"},
				2: {desc: "Ill", style: ["red", "strong"]},
				3: {desc: "Very ill", style: ["red", "strong"]},
				4: {desc: "Terribly ill", style: ["red", "strong"]},
				5: {desc: "Dangerously ill", style: ["red", "strong"]}
			},
			tiredness: {
				0: {desc: "Energetic", style: "green"},
				30: {desc: "Rested", style: "green"},
				60: {desc: "Tired", style: "yellow"},
				90: {desc: "Fatigued", style: "orange"},
				100: {desc: "Exhausted", style: ["red", "strong"]}
			},
			health: { // health + 100
				10: {desc: "On the edge of death", style: ["red", "strong"]},
				49: {desc: "Extremely unhealthy", style: ["red", "strong"]},
				79: {desc: "Unhealthy", style: ["red", "strong"]},
				120: {desc: "healthy", style: "yellow"},
				150: {desc: "Very healthy", style: "green"},
				190: {desc: "Extremely healthy", style: "green"},
				200: {desc: "Unnaturally healthy", style: "green"}, // intended limit of 100 health
				999: {desc: "Unnaturally healthy", style: "green"} // catch to display unintended cases of health > 100 instead of vanishing
			},
		},
		prestige: {
			0: null,
			1: {desc: "Prestigious.", style: "prestigious"},
			2: {desc: "Very prestigious.", style: "prestigious"},
			3: {desc: "Extremely prestigious.", style: "prestigious"},
		},
		pornPrestige: {
			0: null,
			1: {desc: "Porn amateur.", style: "prestigious"},
			2: {desc: "Porn slut.", style: "prestigious"},
			3: {desc: "Porn star.", style: "prestigious"},
		},
		accent: {
			0: null,
			1: {desc: "Cute accent.", style: "pink"},
			2: {desc: "Accent."},
			3: {desc: "Bad accent.", style: "red"},
			4: {desc: "No language skills.", style: "red"},
		},
		smartVibrator: {
			setting: {
				"off": " off.",
				"submissive": " submissive.",
				"lesbian": " lesbian.",
				"oral": " oral.",
				"humiliation": " humiliation.",
				"anal": " anal.",
				"boobs": " breasts.",
				"sadist": " sadism.",
				"masochist": " masochism.",
				"dom": " dominance.",
				"pregnancy": " pregnancy.",
				"vanilla": " vanilla.",
				"all": " all.",
				"none": " none.",
				"monitoring": " monitoring.",
				"men": " men.",
				"women": " women.",
				"anti-men": " anti men.",
				"anti-women": " anti women.",
			},
			system: {
				"piercing": "SP",
				"bullet": "SB",
				"vibe": "SV"
			}
		},
		skills: {
			entertainment: {
				10: null,
				29: {desc: "Basic entertainer", style: "skill"},
				59: {desc: "Skilled entertainer", style: "skill"},
				99: {desc: "Expert entertainer", style: "skill"},
				999: {desc: "Masterful entertainer", style: "skill"}
			},
			sex: { // indices: [sexSkills, hasVagina(0,1) + hasPenis(0,2)] 5.0.0 needs to better address male/female here
				30: {desc: "Sexually unskilled", style: "skill"},
				90: {desc: "Sexually skilled", style: "skill"},
				120: {desc: "Sexual expert", style: "skill"},
				180: {
					0: {desc: "Masterful null", style: "skill"},
					1: {desc: "Sexual expert", style: "skill"},
					2: {desc: "Masterful shemale", style: "skill"},
					3: {desc: "Masterful hermaphrodite", style: "skill"}
				},
				9999: {desc: "Sex master", style: "skill"}
			},
			whoring: {
				10: null,
				29: {desc: "Basic whore", style: "skill"},
				59: {desc: "Skilled whore", style: "skill"},
				99: {desc: "Expert whore", style: "skill"},
				999: {desc: "Masterful whore", style: "skill"}
			},
			mss: {desc: "Masterful sex slave.", style: "skill"},
			combat: {
				10: null,
				30: {desc: "Basic fighter", style: "skill"},
				60: {desc: "Skilled fighter", style: "skill"},
				99: {desc: "Expert fighter", style: "skill"},
				999: {desc: "Masterful fighter", style: "skill"}
			},
		},
		sexDrive: {
			XX: {
				5: {desc: "disgusted by women", style: "red"},
				15: {desc: "turned off by women", style: "red"},
				35: {desc: "not attracted to women", style: "red"},
				65: {desc: "indifferent to women"},
				85: {desc: "attracted to women", style: "green"},
				95: {desc: "aroused by women", style: "green"},
				999: {desc: "passionate about women", style: "green"}
			},
			XY: {
				5: {desc: "Disgusted by men", style: "red"},
				15: {desc: "Turned off by men", style: "red"},
				35: {desc: "Not attracted to men", style: "red"},
				65: {desc: "Indifferent to men"},
				85: {desc: "Attracted to men", style: "green"},
				95: {desc: "Aroused by men", style: "green"},
				999: {desc: "Passionate about men", style: "green"}
			},
			energy: {
				20: {desc: "No sex drive", style: "red"},
				40: {desc: "Poor sex drive", style: "red"},
				60: {desc: "Average sex drive", style: "yellow"},
				80: {desc: "Good sex drive", style: "green"},
				95: {desc: "Powerful sex drive", style: "green"},
				999: {desc: "Nymphomaniac!", style: "green"}
			},
			synergy: {
				omni: {desc: "Omnisexual!", style: "green"},
				nymphomni: {desc: "Omnisexual nymphomaniac!", style: "green"}
			}
		}
	},
	short: {
		body: {
			age: {
				4: "Toddl",
				10: "Child",
				12: "PTeen",
				16: "EaTeen",
				19: "LtTeen",
				24: "Ea20s",
				29: "Lt20s",
				34: "Ea30s",
				39: "Lt30s",
				49: "40s",
				59: "50s",
				69: "60s",
				999: "Elder"
			},
			face: { // face value + 100
				4: {desc: "Face---", style: "red"},
				59: {desc: "Face--", style: "red"},
				89: {desc: "Face-", style: "red"},
				110: {desc: "Face"},
				140: {desc: "Face+", style: "pink"},
				195: {desc: "Face++", style: "pink"},
				200: {desc: "Face+++", style: "pink"},
			},
			lips: {
				10: {desc: "Lips-", style: "red"},
				20: {desc: "Lips"},
				40: {desc: "Lips+"},
				70: {desc: "Lips++"},
				95: {desc: "Lips+++"},
				100: {desc: "Facepussy"}
			},
			teeth: {
				"crooked": {desc: "Cr Teeth", style: "yellow"},
				"gapped": {desc: "Gap", style: "yellow"},
				"cosmetic braces": {desc: "Cos Braces"},
				"straightening braces": {desc: "Braces"},
				"removable": {desc: "Rem Teeth"},
				"pointy": {desc: "Fangs"},
				"baby": {desc: "Baby"},
				"mixed": {desc: "Mixed"}
			},
			waist: { // waist value + 100
				4: {desc: "Wst+++", style: "pink"},
				60: {desc: "Wst++", style: "pink"},
				89: {desc: "Wst+", style: "pink"},
				110: {desc: "Wst"},
				140: {desc: "Wst-", style: "red"},
				195: {desc: "Wst--", style: "red"},
				200: {desc: "Wst---", style: "red"}
			},
			genitalia: {
				dickBalls: { // indices [dick, balls]
					3: {
						3: null,
						4: "Balls",
						5: "Balls+",
						8: "Balls++",
						99: "Balls+++"
					},
					4: {
						3: "Dick",
						99: "Junk"
					},
					5: {
						4: "Dick+",
						99: "Junk+"
					},
					8: {
						5: "Dick++",
						99: "Junk++"
					},
					99: {
						8: "Dick+++",
						99: "Junk+++"
					}
				},
				holes: { // indices [vagina, anus]
					2: {
						2: null,
						3: "A+",
						4: "A++"
					},
					3: {
						2: "V+",
						3: "V+A+"
					},
					4: {
						3: "V++",
						4: "V++A++"
					}
				}
			},
			titsAss: { // indices: [boobs, butt, FSAssetExpansionist(0,1), weight+100, muscles+100]
				499: {
					2: {
						2: { // FSAssetExpansionist doesn't matter
							109: {
								130: {desc: "Girlish", style: "pink"},
							},
						},
					},
					4: null,
					6: {desc: "Ass", style: "pink"},
					8: {desc: "Ass+", style: "pink"},
					9: {desc: "Ass++", style: "pink"},
					999: {desc: "Ass+++", style: "pink"},
				},
				799: {
					4: null,
					6: {desc: "Ass", style: "pink"},
					8: {desc: "Ass+", style: "pink"},
					9: {desc: "Ass++", style: "pink"},
					999: {desc: "Ass+++", style: "pink"},
				},
				1999: {
					4: {desc: "Boobs", style: "pink"},
					999: {desc: "T&A", style: "pink"}
				},
				3999: {
					6: {desc: "Boobs+", style: "pink"},
					999: {desc: "T&A+", style: "pink"}
				},
				11999: {
					8: {desc: "Boobs++", style: "pink"},
					999: {desc: "T&A++", style: "pink"},
				},
				100000: {
					9: {desc: "Boobs+++", style: "pink"},
					999: {desc: "T&A+++", style: "pink"}
				}
			},
			weight: { // indices: [weigh + 100, FSHedonisticDecadence (0,1), hips + 2]
				4: {desc: "W---", style: ["red", "strong"]},
				69: {
					99: { // FSHedonisticDecadence doesn't matter
						0: {desc: "W--", style: "strong"},
						5: {desc: "W--", style: ["red", "strong"]}
					}
				},
				89: {desc: "W-", style: "strong"},
				110: {desc: "W", style: "strong"},
				130: {desc: "W+", style: "strong"},
				195: {
					0: {
						3: {desc: "W++", style: ["red", "strong"]},
						99: {desc: "W++", style: "strong"}
					},
					1: {desc: "W++", style: "strong"}
				},
				230: {
					0: {
						4: {desc: "W+++", style: ["red", "strong"]},
						99: {desc: "W+++", style: "strong"}
					},
					1: {desc: "W+++", style: "strong"},
				},
				260: {
					0: {desc: "W++++", style: ["red", "strong"]},
					1: {desc: "W++++", style: "strong"}
				},
				290: {
					0: {desc: "W+++++", style: ["red", "strong"]},
					1: {desc: "W+++++", style: "strong"}
				},
				999: {
					0: {desc: "W++++++", style: ["red", "strong"]},
					1: {desc: "W++++++", style: "strong"}
				}
			},
			hipsAss: {
				0: {desc: "Disp-", style: "red"},
				1: {desc: "Disp+", style: "red"}
			},
			muscles: { // indices: [muscles + 100, FSPhysicalIdealist(0,1) ]
				4: {desc: "Weak++", style: "red"},
				69: {
					0: {desc: "Soft+"},
					1: {desc: "Weak+", style: "red"}
				},
				94: {
					0: {desc: "Soft"},
					1: {desc: "Weak", style: "red"}
				},
				105: {desc: "Soft"},
				130: {desc: "Toned"},
				150: {desc: "Fit"},
				195: {desc: "Musc+"},
				200: {desc: "Musc++"}
			}
		},
		mental: {
			devotion: { // devotion value + 100
				4: {desc: "VHate", style: ["devotion", "hateful"]},
				49: {desc: "Hate", style: ["devotion", "hateful"]},
				79: {desc: "Res", style: ["devotion", "resistant"]},
				120: {desc: "Ambiv", style: ["devotion", "ambivalent"]},
				150: {desc: "Accept", style: ["devotion", "accept"]},
				195: {desc: "Devo", style: ["devotion", "devoted"]},
				200: {desc: "Wor", style: ["devotion", "worship"]}
			},
			trust: { // first key: trust + 100, second key: devotion + 100
				4: {desc: "ETerr", style: ["trust", "extremely-terrified"]},
				49: {desc: "Terr", style: ["trust", "terrified"]},
				79: {desc: "Fright", style: ["trust", "frightened"]},
				120: {desc: "Fear", style: ["trust", "fearful"]},
				150: {
					79: {desc: "Caref", style: ["defiant", "careful"]},
					200: {desc: "Caref", style: ["trust", "careful"]},
				},
				195: {
					79: {desc: "Bold", style: ["defiant", "bold"]},
					200: {desc: "Trust", style: ["trust", "trusting"]},
				},
				200: {
					79: {desc: "Defiant", style: ["defiant", "full"]},
					200: {desc: "VTrust", style: ["trust", "prof-trusting"]},
				}
			},
			education: { // index: intelligenceImplant + 15
				0: "(e-)",
				29: "",
				44: "(e)",
				99: "(e+)"
			},
			intelligence: { // index: intelligence + 100
				4: {desc: "I---", style: "unintelligent"},
				49: {desc: "I--", style: "unintelligent"},
				84: {desc: "I-", style: "unintelligent"},
				115: {desc: "I"},
				150: {desc: "I+", style: "intelligent"},
				195: {desc: "I++", style: "intelligent"},
				230: {desc: "I+++", style: "intelligent"},
				999: {desc: "I++++", style: "intelligent"},
			},
			behavioralFlaw: {
				"arrogant": "Arrog",
				"bitchy": "Bitchy",
				"odd": "Odd",
				"hates men": "Men-",
				"hates women": "Women-",
				"gluttonous": "Glut",
				"anorexic": "Ano",
				"devout": "Dev",
				"liberated": "Lib",
			},
			sexualFlaw: {
				"hates oral": {desc: "Oral-", style: "red"},
				"hates anal": {desc: "Anal-", style: "red"},
				"hates penetration": {desc: "Fuck-", style: "red"},
				"shamefast": {desc: "Shame", style: "red"},
				"idealistic": {desc: "Ideal", style: "red"},
				"repressed": {desc: "Repre", style: "red"},
				"apathetic": {desc: "Apath", style: "red"},
				"crude": {desc: "Crude", style: "red"},
				"judgemental": {desc: "Judge", style: "red"},
				"cum addict": {desc: "CumAdd", style: "yellow"},
				"anal addict": {desc: "AnalAdd", style: "yellow"},
				"attention whore": {desc: "Attention", style: "yellow"},
				"breast growth": {desc: "BoobObsess", style: "yellow"},
				"abusive": {desc: "Abusive", style: "yellow"},
				"malicious": {desc: "Malice", style: "yellow"},
				"self hating": {desc: "SelfHatr", style: "yellow"},
				"neglectful": {desc: "SelfNeglect", style: "yellow"},
				"breeder": {desc: "BreedObsess", style: "yellow"},
			},
			behavioralQuirk: {
				"confident": "Confid",
				"cutting": "Cutting",
				"funny": "Funny",
				"fitness": "Fit",
				"adores women": "Women+",
				"adores men": "Men+",
				"insecure": "Insec",
				"sinful": "Sinf",
				"advocate": "Advoc",
			},
			sexualQuirk: {
				"gagfuck queen": "Gagfuck",
				"painal queen": "Painal",
				"strugglefuck queen": "Struggle",
				"tease": "Tease",
				"romantic": "Romantic",
				"perverted": "Perverted",
				"caring": "Caring",
				"unflinching": "Unflinch",
				"size queen": "SizeQ",
			}
		},
		health: {
			tiredness: {
				30: {desc: "Ene", style: "green"},
				60: {desc: "Tir", style: "yellow"},
				90: {desc: "Tir+", style: "orange"},
				100: {desc: "Exh", style: ["red", "strong"]}
			}
		},
		accent: {
			1: {desc: "Acc", style: "pink"},
			2: {desc: "Acc-"},
			3: {desc: "Acc--"},
			4: {desc: "Acc--", style: "red"},
		},
		fetish: { // indices [fetish, fetishStrength]
			"submissive": {
				60: "Sub",
				95: "Sub+",
				100: "Sub++"
			},
			"cumslut": {
				60: "Oral",
				95: "Oral+",
				100: "Oral++"
			},
			"humiliation": {
				60: "Humil",
				95: "Humil+",
				100: "Humil++"
			},
			"buttslut": {
				60: "Anal",
				95: "Anal+",
				100: "Anal++"
			},
			"boobs": {
				60: "Boobs",
				95: "Boobs+",
				100: "Boobs++"
			},
			"sadist": {
				60: "Sadist",
				95: "Sadist+",
				100: "Sadist++"
			},
			"masochist": {
				60: "Pain",
				95: "Pain+",
				100: "Pain++"
			},
			"dom": {
				60: "Dom",
				95: "Dom+",
				100: "Dom++"
			},
			"pregnancy": {
				60: "Preg",
				95: "Preg+",
				100: "Preg++"
			},
			"none": "Vanilla"
		},
		prestige: {
			0: null,
			1: {desc: "Prest", style: "prestigious"},
			2: {desc: "Prest+", style: "prestigious"},
			3: {desc: "Prest++", style: "prestigious"},
		},
		pornPrestige: {
			0: null,
			1: {desc: "PPrest", style: "prestigious"},
			2: {desc: "PPrest+", style: "prestigious"},
			3: {desc: "PPrest++", style: "prestigious"},
		},
		diet: {
			"restricted": "Di:W-",
			"fattening": "Di:W+",
			"corrective": "Di:W=",
			"XX": "Di:XX+",
			"XY": "Di:XY+",
			"XXY": "Di:XXY+",
			"muscle building": "Di:M+",
			"slimming": "Di:M-",
			"cum production": "Di:C+",
			"cleansing": "Di:H+",
			"fertility": "Di:F+",

		},
		specialDiet: { // index: dietCum + 3 * dietMilk
			0: null,
			1: "Cum+",
			2: "Cum++",
			3: "Milk+",
			4: "Cum+ Milk+",
			5: "Cum++ Milk+",
			6: "Milk++",
			7: "Cum+ Milk++",
			8: "Cum++ Milk++"
		},
		drugs: {
			"breast injections": "Boobs+",
			"intensive breast injections": "Boobs++",
			"hyper breast injections": "Boobs+++",
			"nipple enhancers": "Nipple+",
			"butt injections": "Butt+",
			"intensive butt injections": "Butt++",
			"hyper butt injections": "Butt+++",
			"lip injections": "Lip+",
			"fertility drugs": "Fert+",
			"super fertility drugs": "Fert++",
			"penis enhancement": "Dick+",
			"intensive penis enhancement": "Dick++",
			"hyper penis enhancement": "Dick+++",
			"testicle enhancement": "Balls+",
			"intensive testicle enhancement": "Balls++",
			"hyper testicle enhancement": "Balls+++",
			"psychosuppressants": "Psych-",
			"psychostimulants": "Psych+",
			"steroids": "Ster",
			"female hormone injections": "HormXX++",
			"male hormone injections": "HormXY++",
			"hormone enhancers": "Horm+",
			"hormone blockers": "Horm-",
			"anti-aging cream": "Age-",
			"appetite suppressors": "ApSup",
			"penis atrophiers": "Dick-",
			"testicle atrophiers": "Balls-",
			"clitoris atrophiers": "Clit-",
			"labia atrophiers": "Labia-",
			"nipple atrophiers": "Nipple-",
			"lip atrophiers": "Lip-",
			"breast redistributors": "Breast-",
			"butt redistributors": "Butt-",
			"sag-B-gone": "AntiSag",
			"growth stimulants": "GroStim",
			"priapism agents": "Erection"
		},
		nationality: { // NOTE this dictionary lacks "Zimbabwean" key, which is a spacial case
			"Afghan": "Afg",
			"Albanian": "Alb",
			"Algerian": "Alg",
			"American": "USA",
			"Andorran": "And",
			"Angolan": "Ang",
			"Antiguan": "AB",
			"Argentinian": "Arg",
			"Armenian": "Arm",
			"Aruban": "Aru",
			"Australian": "Aus",
			"Austrian": "Aut",
			"Azerbaijani": "Aze",
			"Bahamian": "Bah",
			"Bahraini": "Bah",
			"Bangladeshi": "Bgd",
			"Barbadian": "Bar",
			"Belarusian": "Ber",
			"Belgian": "Bel",
			"Belizean": "Blz",
			"Beninese": "Ben",
			"Bermudian": "Bmd",
			"Bhutanese": "Bhu",
			"Bissau-Guinean": "GB",
			"Bolivian": "Bol",
			"Bosnian": "Bos",
			"Brazilian": "Bra",
			"British": "UK",
			"Bruneian": "Bru",
			"Bulgarian": "Bul",
			"Burkinabé": "BF",
			"Burmese": "Bur",
			"Burundian": "Bnd",
			"Cambodian": "Kam",
			"Cameroonian": "Cam",
			"Canadian": "Can",
			"Cape Verdean": "CV",
			"Catalan": "Cat",
			"Central African": "CAR",
			"Chadian": "Cha",
			"Chilean": "Chl",
			"Chinese": "Chi",
			"Colombian": "Col",
			"Comorian": "Com",
			"Congolese": "RC",
			"a Cook Islander": "CI",
			"Costa Rican": "CR",
			"Croatian": "Cro",
			"Cuban": "Cub",
			"Curaçaoan": "Cur",
			"Cypriot": "Cyp",
			"Czech": "Cze",
			"Danish": "Den",
			"Djiboutian": "Dji",
			"Dominican": "DR",
			"Dominiquais": "Dom",
			"Dutch": "Nld",
			"East Timorese": "ET",
			"Ecuadorian": "Ecu",
			"Egyptian": "Egy",
			"Emirati": "UAE",
			"Equatoguinean": "EG",
			"Eritrean": "Eri",
			"Estonian": "Est",
			"Ethiopian": "Eth",
			"Fijian": "Fij",
			"Filipina": "Phl",
			"Finnish": "Fin",
			"French": "Fra",
			"French Guianan": "FG",
			"French Polynesian": "FP",
			"Gabonese": "Gab",
			"Gambian": "Gam",
			"Georgian": "Geo",
			"German": "Ger",
			"Ghanan": "Gha",
			"Greek": "Gre",
			"Greenlandic": "Grn",
			"Grenadian": "Gda",
			"Guamanian": "Gua",
			"Guatemalan": "Gtm",
			"Guinean": "Gui",
			"Guyanese": "Guy",
			"Haitian": "Hai",
			"Honduran": "Hon",
			"Hungarian": "Hun",
			"I-Kiribati": "Kir",
			"Icelandic": "Ice",
			"Indian": "Ind",
			"Indonesian": "Idn",
			"Iranian": "Irn",
			"Iraqi": "Irq",
			"Irish": "Irl",
			"Israeli": "Isr",
			"Italian": "Ita",
			"Ivorian": "IC",
			"Jamaican": "Jam",
			"Japanese": "Jpn",
			"Jordanian": "Jor",
			"Kazakh": "Kaz",
			"Kenyan": "Ken",
			"Kittitian": "SKN",
			"Korean": "Kor",
			"Kosovan": "Kos",
			"Kurdish": "Kur",
			"Kuwaiti": "Kuw",
			"Kyrgyz": "Kyr",
			"Laotian": "Lao",
			"Latvian": "Lat",
			"Lebanese": "Lbn",
			"Liberian": "Lib",
			"Libyan": "Lby",
			"a Liechtensteiner": "Lie",
			"Lithuanian": "Lit",
			"Luxembourgian": "Lux",
			"Macedonian": "Mac",
			"Malagasy": "Mad",
			"Malawian": "Mwi",
			"Malaysian": "Mys",
			"Maldivian": "Mdv",
			"Malian": "Mal",
			"Maltese": "Mlt",
			"Marshallese": "MI",
			"Mauritanian": "Mta",
			"Mauritian": "Mts",
			"Mexican": "Mex",
			"Micronesian": "FSM",
			"Moldovan": "Mol",
			"Monégasque": "Mnc",
			"Mongolian": "Mon",
			"Montenegrin": "Mng",
			"Moroccan": "Mor",
			"Mosotho": "Les",
			"Motswana": "Bot",
			"Mozambican": "Moz",
			"Namibian": "Nam",
			"Nauruan": "Nau",
			"Nepalese": "Npl",
			"New Caledonian": "NC",
			"a New Zealander": "NZ",
			"Ni-Vanuatu": "Van",
			"Nicaraguan": "Nic",
			"Nigerian": "Nga",
			"Nigerien": "Ngr",
			"Niuean": "Niu",
			"Norwegian": "Nor",
			"Omani": "Omn",
			"Pakistani": "Pak",
			"Palauan": "Plu",
			"Palestinian": "Pal",
			"Panamanian": "Pan",
			"Papua New Guinean": "PNG",
			"Paraguayan": "Par",
			"Peruvian": "Per",
			"Polish": "Pol",
			"Portuguese": "Por",
			"Puerto Rican": "PR",
			"Qatari": "Qat",
			"Romanian": "Rom",
			"Russian": "Rus",
			"Rwandan": "Rwa",
			"Sahrawi": "Sah",
			"Saint Lucian": "SL",
			"Salvadoran": "ES",
			"Sammarinese": "SM",
			"Samoan": "Sam",
			"São Toméan": "STP",
			"Saudi": "Sau",
			"Scottish": "Sco",
			"Senegalese": "Sen",
			"Serbian": "Srb",
			"Seychellois": "Sey",
			"Sierra Leonean": "Sie",
			"Singaporean": "Sng",
			"Slovak": "Svk",
			"Slovene": "Svn",
			"a Solomon Islander": "SI",
			"Somali": "Som",
			"South African": "RSA",
			"South Sudanese": "SS",
			"Spanish": "Spa",
			"Sri Lankan": "Sri",
			"Sudanese": "Sud",
			"Surinamese": "Sur",
			"Swazi": "Swa",
			"Swedish": "Swe",
			"Swiss": "Swi",
			"Syrian": "Syr",
			"Taiwanese": "Tai",
			"Tajik": "Taj",
			"Tanzanian": "Tza",
			"Thai": "Tha",
			"Tibetan": "Tib",
			"Togolese": "Tog",
			"Tongan": "Ton",
			"Trinidadian": "TT",
			"Tunisian": "Tun",
			"Turkish": "Tur",
			"Turkmen": "Tkm",
			"Tuvaluan": "Tuv",
			"Ugandan": "Uga",
			"Ukrainian": "Ukr",
			"Uruguayan": "Uru",
			"Uzbek": "Uzb",
			"Vatican": "VC",
			"Venezuelan": "Ven",
			"Vietnamese": "Vnm",
			"Vincentian": "SVG",
			"Yemeni": "Yem",
			"Zairian": "DRC",
			"Zambian": "Zam",
			"Ancient Chinese Revivalist": "Chi Rev",
			"Ancient Egyptian Revivalist": "Egy Rev",
			"Arabian Revivalist": "Ara Rev",
			"Aztec Revivalist": "Azt Rev",
			"Edo Revivalist": "Edo Rev",
			"Roman Revivalist": "Rom Rev",
			"": "None",
			"none": "None",
			"slave": "None",
			"Stateless": "None"
		},
		race: {
			"white": "C",
			"asian": "A",
			"indo-aryan": "I",
			"latina": "L",
			"middle eastern": "ME",
			"black": "B",
			"pacific islander": "PI",
			"catgirl": "CT",
			"malay": "M",
			"amerindian": "AI",
			"semitic": "S",
			"southern european": "SE",
			"mixed race": "MR",
		},
		skin: {
			"pure white": "P. Whi",
			"extremely fair": "E. Fai",
			"very fair": "V. Fai",
			"extremely pale": "E. Pal",
			"very pale": "V. Pal",
			"light brown": "L. Br",
			"dark brown": "D. Br",
			"light olive": "L. Oli",
			"dark olive": "D. Oli",
			"light beige": "L. Bei",
			"dark beige": "D. Bei",
			"tan": "Tan",
			"bronze": "Bron",
			"ebony": "Ebon",
			"black and white striped": "BnW",
			"red": "Rd",
			"yellow": "Ylw",
			"pure black": "P. Bla",
			"dark": "Dark",
			"fair": "Fair",
			"pale": "Pale"
		},
		smartVibrator: {
			setting: {
				"off": "-",
				"submissive": "sub",
				"lesbian": "les",
				"oral": "oral",
				"humiliation": "humil",
				"anal": "anal",
				"boobs": "boobs",
				"sadist": "sade",
				"masochist": "pain",
				"dom": "dom",
				"pregnancy": "pregnancy",
				"vanilla": "vanilla",
				"all": "all",
				"none": "none",
				"monitoring": "monitoring",
				"men": "men",
				"women": "women",
				"anti-men": "anti-men",
				"anti-women": "anti-women",
			},
			system: {
				"piercing": "SP",
				"bullet": "SB",
				"vibe": "SV"
			}
		},
		skills: {
			entertainment: {
				10: null,
				29: {desc: "E", style: "skill"},
				59: {desc: "E+", style: "skill"},
				99: {desc: "E++", style: "skill"},
				999: {desc: "E+++", style: "skill"}
			},
			sex: { // indices: [sexSkills, hasVagina(0,1), hasPenis(0,2)]
				30: {desc: "S-", style: "skill"},
				90: {desc: "S+", style: "skill"},
				120: {desc: "S++", style: "skill"},
				180: {
					0: {desc: "S0++", style: "skill"},
					1: {desc: "S++", style: "skill"},
					2: {desc: "Sh++", style: "skill"},
					3: {desc: "SF++", style: "skill"}
				},
				9999: {desc: "S++", style: "skill"}
			},
			whoring: {
				10: null,
				29: {desc: "W", style: "skill"},
				59: {desc: "W+", style: "skill"},
				99: {desc: "W++", style: "skill"},
				999: {desc: "W+++", style: "skill"}
			},
			mss: {desc: "MSS", style: "skill"},
			combat: {
				10: null,
				30: {desc: "C", style: "skill"},
				60: {desc: "C+", style: "skill"},
				99: {desc: "C++", style: "skill"},
				999: {desc: "C+++", style: "skill"}
			},
		},
		sexDrive: {
			XX: {
				5: {desc: "XX---", style: "red"},
				15: {desc: "XX--", style: "red"},
				35: {desc: "XX-", style: "red"},
				65: {desc: "XX"},
				85: {desc: "XX+", style: "green"},
				95: {desc: "XX++", style: "green"},
				999: {desc: "XX+++", style: "green"}
			},
			XY: {
				5: {desc: "XY---", style: "red"},
				15: {desc: "XY--", style: "red"},
				35: {desc: "XY-", style: "red"},
				65: {desc: "XY"},
				85: {desc: "XY+", style: "green"},
				95: {desc: "XY++", style: "green"},
				999: {desc: "XY+++", style: "green"}
			},
			energy: {
				20: {desc: "SD--", style: "red"},
				40: {desc: "SD-", style: "red"},
				60: {desc: "SD", style: "yellow"},
				80: {desc: "SD+", style: "green"},
				95: {desc: "SD++", style: "green"},
				999: {desc: "Nympho!", style: "green"}
			},
			synergy: {
				omni: {desc: "Omni!", style: "green"},
				nymphomni: {desc: "Omni+Nympho!!", style: "green"}
			}
		}
	}
};
