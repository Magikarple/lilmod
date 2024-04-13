// cSpell:ignore Sengoku

App.UI.barracks = function() {
	const node = new DocumentFragment();
	let r = [];

	r.push(`The mercenaries you retain to protect ${V.arcologies[0].name} are housed in this sector of the arcology, which is fitted out as a modern military facility. It's much less expensive to house them here than to let them live at free quarters in the living areas of the arcology. They live somewhat apart from the society they protect, down here, but`);
	if (V.personalArms > 0 && V.invasionVictory > 0) {
		r.push(`you're always welcome here. You're their employer, but what's more important to them is that you also fought alongside them in victorious battle.`);
	} else {
		r.push(`they don't resent an unannounced visit from their employer.`);
	}
	r.push(`As you enter the main bay of the armory, lined with modern arms and armor and a few muscular, scarred men and women looking after their gear or suiting up to stand post, you're greeted respectfully, with`);
	if (V.personalArms > 0 && V.invasionVictory > 0) {
		r.push(`jaunty salutes and`);
	}
	r.push(`formal "${properTitle()}"s${(V.personalArms > 0 && V.invasionVictory > 0) ? `, but also with smiles and nods` : ``}.`);
	if (V.mercenaries >= 3) {
		r.push(`Though few of the mercenaries are visible,`);
		if (V.mercenaries >= 5) {
			r.push(`the bay is huge. There's enough equipment for a full company here.`);
		} else {
			r.push(`there's enough equipment for a full platoon here.`);
		}
	}

	if (V.mercenariesTitle !== "mercenaries") {
		r.push(`They've taken to their role as ${V.mercenariesTitle}.`);
		switch (V.mercenariesTitle) {
			case "Knights":
				r.push(`Every set of gear has some kind of chivalric device on it, and the heavier sets of powered armor are accented with a lot of burnished steel.`);
				break;
			case "Evocati":
				r.push(`The heavier sets of powered armor have Roman standards mounted on their backs, and officers' helmets are distinguished by horsehair crests.`);
				break;
			case "Black Eagles":
				r.push(`Their ultra-heavy Imperial Plate is painted universally black and yellow, and prominently marked with the crest of your noble house. The officer's helmets have golden eagles painted over the faceplate to mark their status.`);
				break;
			case "Shorn Ones":
				r.push(`The bigger sets of power armor are adorned with multiple ornaments and painted with symbols of the gods and victory.`);
				break;
			case "Imperial Guards":
				r.push(`Their prototype armor is equipped with the latest weapons and their Imperial Chinese war banner strikes fear into the foes.`);
				break;
			case "Medjay":
				r.push(`The gear is accented with bronze and animal skins. Some of the heavier armored helmets even have faceplates styled after Pharaonic death masks.`);
				break;
			case "Samurai":
				r.push(`The gear is functional, but it has a distinctive Sengoku style to it. A ceramic wakizashi is an almost universal tertiary weapon.`);
				break;
			case "Janissaries":
				r.push(`They consider themselves a caste apart, and keep to themselves, priding themselves on relentless training and perpetual readiness.`);
				break;
			case "Knights of the White Camelia":
				r.push(`In their gleaming armor, they, at times, resemble knights of Arthurian legend more so than men of the 21st century.`);
				break;
			case "Knights Templar":
				r.push(`All the armor includes a modernized version of a white surcoat emblazoned with the symbol of the new faith.`);
				break;
			case "Immortals":
				r.push(`The lighting in the bay has been lowered, and the gear is styled to be menacing. There's a sense of leashed danger here.`);
				break;
			case "Vast Legions":
				r.push(`Their bulky, heavily armored prototype armor strikes terror into foes and causes the earth to shake when they walk.`);
				break;
			case "Surgical Corps":
				r.push(`Their prototype armor is equipped with the latest medical equipment.`);
				break;
			case "Inglorious Bitches":
				r.push(`Their garish neon pink prototype armor shines brightly.`);
				break;
			case "Thousand Sons":
				r.push(`Their prototype armor is designed to preserve a sample of the wearer's genetic material in the event of death.`);
				break;
			case "Guardians of the Unborn":
				r.push(`Their gear is designed to be accommodating to pregnant women and even includes a special kit in case a baby needs delivering and they're the only ones around.`);
				break;
			case "Shadowed Hand":
				r.push(`Their armor prominently displays the symbol of the Societal Elite and is designed to make it perfectly clear that they mean business.`);
				break;
			case "Asgardians":
				r.push(`Their armor has been modified to allow the wearers' muscular arms to remain visible, and the heavier armor seems to be equipped with capes.`);
				break;
			case "Tasters":
				r.push(`Their armor has been modified to handle all sorts of waistlines. They contain numerous pockets and containers; it's not unusual to see a merc offering someone a needed pick-me-up.`);
				break;
			case "Knights of the Blood":
				r.push(`Their gear is adorned with the badges and ensigns of racialist societies, and posters from the same sources are visible on the walls.`);
				break;
			case "Knights of the Purge":
				r.push(`Their prototype armor is equipped with the latest weapons.`);
				break;
			case "Wardens":
				r.push(`Their gear is designed to take their foes alive and relatively unharmed, though lethal force can be applied if need be.`);
				break;
			case "Purifiers":
				r.push(`Their prototype armor is equipped with a cleansing flamethrower. In addition to striking fear into their foes it also cooks a mean steak.`);
				break;
			case "Abstemious":
				r.push(`Their sleek prototype armor is equipped with advanced restraining weapons.`);
				break;
			case "Rangers":
				r.push(`Their gear has a heavy Western influence; everyone carries heavy revolvers everywhere, and the armor sports rope lariats for lassoing 'cattle.'`);
				break;
			case "Shepherds":
				r.push(`Their gear has a rather gaudy appearance; it makes it easier to attract wayward bimbos that way when they wander off and get lost.`);
				break;
			case "Geniuses":
				r.push(`Their prototype armor is extremely complex to control, but those who can reap the benefits.`);
				break;
			case "Caretakers":
				r.push(`Their towering prototype armor lets them stand out in a crowd and guide the way for those lost underfoot.`);
				break;
			case "Titans":
				r.push(`Their prototype armor towers over the average civilian and compacts for easy storage despite its size.`);
		}
	}
	r.push(`There are doors to magazines, armories, and training areas to all sides, and muffled gunfire can be heard from the latter.`);

	App.Events.addParagraph(node, r);
	r = [];

	r.push(`You head up a deck, to the staff area, and up one more, to look into the living area. It's comfortable and very well-kept, since they have a large number of slaves here to look after them. Relaxing mercenaries are scattered around the common areas, and most are enjoying a slave or two.`);
	if (V.FSAnnounced) {
		const {
			HeU, HisU,
			heU, hisU, himU, himselfU, girlU
		} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		r.push(`They're obviously adopting the customs of ${V.arcologies[0].name}.`);
		let vignette = 0;
		if (FutureSocieties.isActive('FSSubjugationist') && V.arcologies[0].FSSubjugationistRace) {
			r.push(`A mercenary is fingering ${addA(V.arcologies[0].FSSubjugationistRace)} ${girlU}'s`);
			if (V.seeDicks !== 100) {
				r.push(`pussy.`);
			} else {
				r.push(`anus.`);
			}
			r.push(`${HeU}'s wincing a little; ${heU} must be new here.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSSupremacist')) {
			r.push(`${anotherMerc(vignette)} mercenary, a woman, is being seen to by a multicultural bunch of subhumans of different races. She has one eating her out while two more are rubbing her feet.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSGenderRadicalist')) {
			r.push(`${anotherMerc(vignette)} mercenary, who's rather obviously earned enough money to pay for the surgeries and drugs to turn herself into an imposing futanari, is pounding a dickgirl slave.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSGenderFundamentalist')) {
			r.push(`${anotherMerc(vignette)} mercenary is fucking a slave`);
			if (FutureSocieties.isActive('FSRestart')) {
				r.push(`lotus style. His hands are greedily following ${hisU} womanly curves as they bang.`);
			} else {
				r.push(`doggy style. He's massaging ${hisU} rounded belly as ${heU} enjoys ${hisU} first foray into motherhood.`);
			}
			vignette++;
		}

		if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`${anotherMerc(vignette)} mercenary is making out with a pretty slave. An old romantic movie is playing on a wallscreen in front of them, forgotten.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSDegradationist')) {
			r.push(`${anotherMerc(vignette)} mercenary is using a slave as a footrest as he relaxes. ${HeU} has a huge dildo up ${hisU} ass, and whenever ${heU} moves, he uses a foot to shove it farther inside ${himU}.`);
			vignette++;
		}
		if (FutureSocieties.isActive('FSIntellectualDependency')) {
			r.push(`${anotherMerc(vignette)} mercenary is player strip poker with a pouting bimbo. ${HeU}'s completely nude and unaware that the game is over, not that the merc minds.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSSlaveProfessionalism')) {
			r.push(`${anotherMerc(vignette)} mercenary is practicing assembling and disassembling his sidearm under the learned eyes of his assisting slave. ${HeU} is making sure ${hisU} master is well prepared for the future and stroking his dick each time he does it right.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSBodyPurist')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is idly playing with a slave's natural breasts as he watches a wallscreen. He's being gentle and ${heU} doesn't seem to mind.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSTransformationFetishist')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is fucking a bimbo slave doggy style. ${HisU} fake tits are so huge that the motion is making them slap together under ${himU}.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSYouthPreferentialist')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is getting a blowjob from a young slave. He's playing with ${hisU}`);
			if (hisU === "her") {
				r.push(`fresh pussy`);
			} else {
				r.push(`tight little anus`);
			}
			r.push(`as ${heU} sucks his dick.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSMaturityPreferentialist')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is getting a massage from a mature slave. ${HeU}'s wearing a towel, but he sneaks a hand back and steals it, freeing ${hisU} heavy breasts.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is getting a lap dance from a lithe slave. ${HeU}'s moving ${hisU} cute butt lower and lower, getting ready to impale ${himselfU} on his raging erection.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSAssetExpansionist')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is almost hidden by a slave he's got in his lap. He has his head buried between ${hisU} monstrous breasts, and it's not clear how he's breathing.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSPetiteAdmiration')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary has a petite slave sitting on a weight bar. Each rep buries ${hisU} butt in his face.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSStatuesqueGlorification')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is having sex with a rather tall slave against the lockers. He has to stand on a nearby bench in order to properly penetrate ${himU}.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSPastoralist')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is drinking a slave's milk, straight from the nipple, while idly massaging ${hisU} other breast, bringing out a thin stream of milk.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSPhysicalIdealist')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is doing push-ups with a well-endowed slave sitting on his back to add weight. ${HeU}'s counting his reps for him.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSHedonisticDecadence')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is doing squats with a rather portly slave sitting on his shoulders to add weight. ${HeU} pops a cookie into his mouth with each completed set.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSChattelReligionist')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is mounting a praying slave from behind. It doesn't distract ${himU}; ${hisU} quiet devotions become more fervent as he fucks ${himU}.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSRepopulationFocus')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is being ridden by an enormously pregnant slave. He's massaging ${hisU} taut belly as she uses ${hisU} hands to support ${hisU} sore boobs.`);
			vignette++;
		} else if (FutureSocieties.isActive('FSRestart')) {
			r.push(`${yetAnotherMerc(vignette)} mercenary is being serviced by a slave with a visibly smooth crotch. He has a dildo rammed in ${hisU} ass and moves it along with ${hisU} sucking.`);
			vignette++;
		}

		if (FutureSocieties.isActive('FSRomanRevivalist')) {
			// TODO:
		} else if (FutureSocieties.isActive('FSNeoImperialist')) {
			// TODO:
		} else if (FutureSocieties.isActive('FSAztecRevivalist')) {
			// TODO:
		} else if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
			// TODO:
		} else if (FutureSocieties.isActive('FSEdoRevivalist')) {
			// TODO:
		} else if (FutureSocieties.isActive('FSArabianRevivalist')) {
			// TODO:
		} else if (FutureSocieties.isActive('FSChineseRevivalist')) {
			// TODO:
		} else if (FutureSocieties.isActive('FSAntebellumRevivalist')) {
			// TODO:
		}
	}

	if (V.mercenariesHelpCorp > 0) {
		const {
			HeU,
			heU, hisU, himU, himselfU, girlU
		} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		App.UI.DOM.appendNewElement("p", node, `As you leave, a squad moves thunderously into the bay, fresh from a slave raid on behalf of your corporation. Most of their captures have been dropped off with the corporate receivers, but they've been given a pretty ${girlU} who isn't a good training prospect for the corporate brand, a common reward. The squad looks after their weapons and armor first, an inviolable rule, and as they do, they leave their naked slave standing in the middle of the bay, ignored. ${HeU} isn't even bound, but ${heU}'s standing nude and alone amongst modern mercenaries, so ${heU} knows that resistance is futile. So ${heU} does the only thing left available to ${himU}: try to cover ${himselfU} with ${hisU} hands and cry.`);
	}

	App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
		"Decommission the armory and return this sector to manufacturing",
		() => {
			App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Manufacturing, "Barracks", "Manufacturing");
			V.barracks = 0;
		}, [], "Main",
	));
	App.Events.addParagraph(node, r);
	return node;

	function anotherMerc(vignette) {
		if (vignette >= 3) {
			return `Yet another`;
		} else if (vignette >= 2) {
			return `A third`;
		} else if (vignette) {
			return `Another`;
		} else {
			return `A`;
		}
	}

	function yetAnotherMerc(vignette) {
		if (vignette >= V.FSCreditCount) {
			return `Finally, a`;
		} else {
			return anotherMerc(vignette);
		}
	}
};
