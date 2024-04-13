/**
 * The black market passage
 * A great place to get illegal and often problematic items
 * @returns {DocumentFragment}
 */
App.UI.blackMarket = function() {
	const node = new DocumentFragment();

	// App.UI.DOM.appendNewElement("h1", node, `The Black Market`);

	const {
		He,
		he, his
	} = getPronouns(S.Bodyguard ? S.Bodyguard : {pronoun: App.Data.Pronouns.Kind.neutral});

	const {
		his: hisP
	} = getPronouns(V.PC);

	let r = [];

	r.push(`You board your VTOL bird for the trip to the current location of the particularly exclusive, and quite lucrative, Black Market knowing full well that the trip may take far longer than anticipated; the market frequently relocates to shake the unwanted attention it inevitably gains. It's far easier than paying off authorities, especially with how outrageous their demands have become with the decline of the old world. You're greeted by a gruff bouncer, already fully aware of just who you are and your permission to be there. "Check your weapons — no firearms allowed inside.`);
	if (S.Bodyguard) {
		r.push(`${He} may keep ${his} blade," he gestures to ${S.Bodyguard.slaveName}, "But keep in mind: if you cause us trouble, you will not be going home in one `);
		if (getLimbCount(S.Bodyguard, 105) > 0) {
			r.push(`piece. Oh, and one more thing." He`);
			if (getArmCount(S.Bodyguard, 5) + getArmCount(S.Bodyguard, 6) > 0) {
				r.push(`taps ${his} clearly bionic arm.`);
			} else {
				r.push(`points at ${his} clearly bionic leg.`);
			}
			r.push(`"Disable ${his} weapons systems. I know what ${he} is capable of."`);
		} else {
			r.push(`piece."`);
		}
	}
	App.Events.addParagraph(node, r);
	r = [];

	App.Events.addParagraph(node, [`Once inside, you are able to fully absorb in the sights and sounds of the market proper. All sorts of items are available for purchase, from exotic beasts that may very well be the last of their kind, to the most lethal of weaponry both old and new, and even luxuries long gone. Despite the overbearing security, one's wallet can easily be emptied in this place.`]);

	const options = new App.UI.OptionsGroup();
	App.UI.Player.refreshmentChoice(options);
	App.Events.addParagraph(node, [
		`There is quite the selection of refreshments available, you could always shift your orders from ${V.PC.refreshment} to something new.`,
		options.render()
	]);

	if (V.consumerDrugs === 0 && V.dispensary === 1 && V.PC.skill.medicine < 100) {
		r = [];
		const drugsCash = 50000;
		App.UI.DOM.appendNewElement("div", node, `An eclectic variety of services as well; a hacker can get you signed up for consumer-grade drug designs usually reserved for medical professionals for a mere ${(cashFormat(drugsCash))}.`);
		if (V.cash >= drugsCash) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				"Add them to the pharmaceutical fabricator",
				() => {
					cashX(-drugsCash, "capEx");
					V.consumerDrugs = 1;
					App.UI.reload();
				}
			));
		} else {
			r.push(`<span class="cash dec">${(cashFormat(50000))}</span> is out of your price range for now.`);
		}
	}

	/*
	if (FutureSocieties.isActive('FSPaternalist')) {
		//<br><br>
		r.push(`A convoy of scientists from the banned wetware CPU project are present and selling their leftover wares.`);
		//[[Browse CPUs|Slave Markets][V.market.slaveMarket = "wetware", V.slavesSeen += 1]] |
		if (V.cash > minimumFive) {
			//[[(x5)|Bulk Slave Intro][V.market.slaveMarket = "wetware", V.market.introType = "bulk", V.market.numSlaves = 5]] |
		}
		if (V.cash > minimumTen) {
			//[[(x10)|Bulk Slave Intro][V.market.slaveMarket = "wetware", V.market.introType = "bulk", V.market.numSlaves = 10]] |
		}
	}
	*/

	// <br><br>

	App.Events.addParagraph(node, [`The main draw, however, is the prominent stage to the rear of the building where the most desirable and less than legal slaves are auctioned off. Enslaved celebrities, kidnapped royalty, the daughters of warlords and all manner of slaves outlawed for sale in most arcologies frequently make appearances before the hungry crowd. It's usually not worth the added risk or the price to buy these girls yourself, however.`]); // TODO: This could use a variety of scenes for who is currently at auction, possibly even with slave purchase

	App.Events.addParagraph(node, [`Of all the wonders present, the thing that catches your eye the most is a shady looking stall with a somehow even shadier looking merchant — a merchant who is beckoning you to come over. "A prominent arcology owner like yourself wandering around in here can only be looking for one thing: new and exciting ways to spice up ${hisP} slaves! I've got the hottest research and tech straight from the labs waiting for you to peruse and some of the 'hottest' tech straight out of the research labs, if you catch my drift." He shuffles around behind the counter, pulling out a stack of papers.`]);

	App.UI.DOM.appendNewElement("div", node, `"Now when it comes to the legal, relatively boring stuff, I've got the following available:"`);

	if (V.thisWeeksFSWares !== 0 && V.thisWeeksFSWares.length > 0) {
		for (const ware of V.thisWeeksFSWares) {
			switch (ware) {
				case "GenderRadicalistResearch":
					if (V.seePreg !== 0 && V.arcologies[0].FSGenderRadicalistResearch === 0) {
						if (V.organFarmUpgrade > 0) {
							const buttPennies = 75000;
							if (V.cash >= buttPennies) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase schematics for anal pregnancy",
									() => {
										cashX(-buttPennies, "capEx");
										V.arcologies[0].FSGenderRadicalistResearch = 1;
										V.merchantFSWares.delete("GenderRadicalistResearch");
										App.UI.reload();
									},
									[],
									"",
									`${cashFormat(buttPennies)}.`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(buttPennies))}</span> for anal pregnancy schematics. "No discounts. No haggling. No price naming. Take it or leave it."`);
							}
						} else {
							r.push(`You lack the facilities needed to grow organs, so anal pregnancy schematics are currently out of your reach.`);
						}
					} else if (V.seePreg === 0) {
						r.push(`You have no interest in this pregnancy based research.`);
					} else {
						r.push(`You already possess designs to facilitate anal pregnancy.`);
						V.merchantFSWares.delete("GenderRadicalistResearch");
					}
					break;
				case "SlaveProfessionalismResearch":
					if (V.arcologies[0].FSSlaveProfessionalismResearch === 0) {
						if (V.dispensary === 1) {
							const intCash = 90000;
							if (V.cash >= intCash) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase the recipe for a proven intelligence boosting compound",
									() => {
										cashX(-intCash, "capEx");
										V.arcologies[0].FSSlaveProfessionalismResearch = 1;
										V.merchantFSWares.delete("SlaveProfessionalismResearch");
										App.UI.reload();
									},
									[],
									"",
									`${(cashFormat(intCash))}.`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(intCash))}</span> for a proven intelligence boosting compound. "A cup of tea brewed from this compound makes one smarter. Too bad I don't hand out free samples so people like you can remember where they left their money."`);
							}
						} else {
							r.push(`You lack the facilities needed to produce drugs of this complexity, so the recipe for a proven intelligence boosting compound is currently unobtainable.`);
						}
					} else {
						r.push(`You already possess a recipe for a mind improving tea.`);
						V.merchantFSWares.delete("SlaveProfessionalismResearch");
					}
					break;
				case "TransformationFetishistResearch":
					if (V.arcologies[0].FSTransformationFetishistResearch === 0) {
						if (V.ImplantProductionUpgrade === 1) {
							const implantCash = 50000;
							if (V.cash >= implantCash) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase designs for immense implants",
									() => {
										cashX(-implantCash, "capEx");
										V.arcologies[0].FSTransformationFetishistResearch = 1;
										V.merchantFSWares.delete("TransformationFetishistResearch");
										App.UI.reload();
									},
									[],
									"",
									`${(cashFormat(implantCash))}.`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(implantCash))}</span> for absurdly huge implant designs. "No big fake boobs for you. How sad it must be to be flat and enslaved by such a poor ${(V.PC.title === 1) ? "Master" : "Mistress"}."`);
							}
						} else {
							r.push(`You lack the facilities needed to produce implants of this caliber, so absurdly huge implant designs are currently unobtainable.`);
						}
					} else {
						r.push(`You already possess designs for oversized implants.`);
						V.merchantFSWares.delete("TransformationFetishistResearch");
					}
					break;
				case "AssetExpansionistResearch":
					if (V.arcologies[0].FSAssetExpansionistResearch === 0) {
						if (V.dispensary === 1) {
							const growthCash = 50000;
							if (V.cash >= growthCash) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase formulas for extremely powerful growth drugs",
									() => {
										cashX(-growthCash, "capEx");
										V.arcologies[0].FSAssetExpansionistResearch = 1;
										V.merchantFSWares.delete("AssetExpansionistResearch");
										App.UI.reload();
									},
									[],
									"",
									`Costs ${cashFormat(growthCash)}`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(growthCash))}</span> for extremely powerful growth drug formulas. "Why'd you even come here if you didn't have the credits to buy anything?"`);
							}
						} else {
							r.push(`You lack the facilities needed to produce drugs of this complexity, so absurdly powerful implant growth drug formulas are currently unobtainable.`);
						}
					} else {
						r.push(`You already possess formulas for extremely powerful growth drugs.`);
						V.merchantFSWares.delete("AssetExpansionistResearch");
					}
					break;
				case "SlimnessEnthusiastResearch":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch === 0) {
						if (V.dispensary === 1) {
							const reverseGrowthCash = 75000;
							if (V.cash >= reverseGrowthCash) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase formulas for growth reversing drugs",
									() => {
										cashX(-reverseGrowthCash, "capEx");
										V.arcologies[0].FSSlimnessEnthusiastResearch = 1;
										V.merchantFSWares.delete("SlimnessEnthusiastResearch");
										App.UI.reload();
									},
									[],
									"",
									`Costs ${cashFormat(reverseGrowthCash)}`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${cashFormat(reverseGrowthCash)}</span> for growth reversing drug formulas. "`);
								if (V.PC.boobs >= 1000) {
									r.push(`Guess you'll be keeping those knockers for now,`);
									if (V.PC.title === 0) {
										r.push(`Little-Miss-Top-Heavy."`);
									} else {
										r.push(`Mr. Busty."`);
									}
								} else {
									r.push(`Guess you don't mind sore backs. Leads to less sore knees, from what I've heard."`);
								}
							}
						} else {
							r.push(`You lack the facilities needed to produce drugs of this complexity, so growth reversing drug formulas are currently unobtainable.`);
						}
					} else {
						r.push(`You already possess formulas for growth reversing drugs.`);
						V.merchantFSWares.delete("SlimnessEnthusiastResearch");
					}
					break;
				case "YouthPreferentialistResearch":
					if (V.arcologies[0].FSYouthPreferentialistResearch === 0) {
						if (V.dispensary === 1) {
							const beautyCreamCash = 45000;
							if (V.cash >= beautyCreamCash) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase formulas for extremely effective anti-aging beauty creams",
									() => {
										cashX(-beautyCreamCash, "capEx");
										V.arcologies[0].FSYouthPreferentialistResearch = 1;
										V.merchantFSWares.delete("YouthPreferentialistResearch");
										App.UI.reload();
									},
									[],
									"",
									`Costs ${cashFormat(beautyCreamCash)}`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${cashFormat(beautyCreamCash)}</span> for extremely effective anti-aging beauty creams. "${(V.PC.visualAge > 40) ? `Those wrinkles don't look that bad on you, so don't worry about not being able to afford this` : `Just tell them they look young, and, well, don't give them any mirrors. Probably should keep your money troubles from them, too`}."`);
							}
						} else {
							r.push(`You lack the facilities needed to produce drugs of this complexity, so extremely effective anti-aging beauty creams formulas are currently unobtainable.`);
						}
					} else {
						r.push(`You already possess formulas for extremely effective anti-aging beauty cream.`);
						V.merchantFSWares.delete("YouthPreferentialistResearch");
					}
					break;
				case "HedonisticDecadenceResearch":
					if (V.arcologies[0].FSHedonisticDecadenceResearch === 0) {
						if (V.dispensary === 1) {
							const foodCash = 65000;
							if (V.cash >= foodCash) {
								r.push(App.UI.DOM.link(
									"Purchase recipes for highly addictive solid slave food",
									() => {
										cashX(-foodCash, "capEx");
										V.arcologies[0].FSHedonisticDecadenceResearch = 1;
										V.merchantFSWares.delete("HedonisticDecadenceResearch");
										App.UI.reload();
									},
									[],
									"",
									`${cashFormat(foodCash)}.`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${cashFormat(foodCash)}</span> for highly addictive solid slave food recipes. "I promise you'll not be able to recreate this at home, so if you want to give your begging slave the treat she deserves, buy now! Or, you know, come back with money."`);
							}
						} else {
							r.push(`You lack the facilities needed to produce drugs of this complexity, so highly addictive solid slave food recipes are currently unobtainable.`);
						}
					} else {
						r.push(`You already possess recipes for highly addictive solid slave food.`);
						V.merchantFSWares.delete("HedonisticDecadenceResearch");
					}
			}
			App.Events.addNode(node, r, "div");
			r = [];
		}
	} else {
		App.UI.DOM.appendNewElement("div", node, `You appear to already possess all the societal based schematics he has to offer.`);
	}
	if (V.cheatMode === 1) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Refresh societal wares list",
			() => {
				V.thisWeeksFSWares = ["GenderRadicalistResearch", "SlaveProfessionalismResearch", "TransformationFetishistResearch", "AssetExpansionistResearch", "SlimnessEnthusiastResearch", "YouthPreferentialistResearch", "HedonisticDecadenceResearch"];
				App.UI.reload();
			}
		));
	}

	r.push(`He gestures to a door in the back of the stall. "The good shit's back there`);
	if (V.thisWeeksIllegalWares !== 0) {
		if (V.thisWeeksIllegalWares.length > 1) {
			r.push(`— here's a list:`);
		} else if (V.thisWeeksIllegalWares.length === 1) {
			r.push(`— only one this week:`);
		}
	} else {
		r.push(r.pop() + `.`);
	}
	r.push(r.pop() + `"`);
	App.Events.addNode(node, r, "div");
	r = [];
	if (V.thisWeeksIllegalWares !== 0 && V.thisWeeksIllegalWares.length > 0) {
		for (const ware of V.thisWeeksIllegalWares) { // TODO: why do we loop at all, instead of just checking if it's in array.
			switch (ware) {
				case "childhoodFertilityInducedNCS": {
					const NCSCash = 135000;
					if (V.minimumSlaveAge <= 15) {
						r.push(App.UI.DOM.makeElement("div", `Childhood Fertility Induced NCS (Induced Neotenic Complex Syndrome or Syndrome X modified for fertility).`, ["cyan"]));
						if (V.minimumSlaveAge > 8) {
							r.push(`Illegal information for the Childhood Fertility <span class="orange">Induced NCS</span> (genetic engineering and hormonal blend) research recipe.`);
							App.Events.addNode(node, r, "div");
							r = [];
							r.push(`"I'm sorry, I can't sell this product to you, even if I wanted to," he says. "I have this technology, which if applied, would make slaves appear younger than the legal age of majority. I picked it up from an exotics dealer, who picked it up from some old world government research center. And yes, I know, this is a black market, and I would be happy to sell it to you, except, you see, too many of the wrong people know I have it, and while the knowledge isn't illegal, selling or using it is. See if I sell this to you, you'd start getting younger looking slaves, and those people would try to take us both down, and since I'm not the master of an arcology, I would probably end up enslaved, and I'm not interested in that. If only the laws were more open about who could have sex with who, I could sell this to anyone interested."`);
							r.push(`Since the agreed upon minimum age in your Free City is greater than eight, it would draw way too much attention for you to make use of the research recipe for the Childhood Fertility <span class="orange">Induced NCS</span> (genetic engineering and hormonal blend).`);
							App.Events.addNode(node, r, "div");
							r = [];
						} else {
							if (V.geneticMappingUpgrade === 0) {
								r.push(`You lack the facilities required for such a treatment to be effective on specific individuals.`);
							} else if (V.dispensaryUpgrade === 0) {
								r.push(`You lack the facilities required to produce complex gene-altering treatments.`);
							} else {
								if (V.arcologies[0].childhoodFertilityInducedNCSResearch === 0) {
									const match = (V.arcologies[0].FSYouthPreferentialist > 0) ? "Knowing your arcology, I think you could be happy with the results!" : "I'm not sure this is a good match for your arcology's current society at this moment, but I'm sure you could have fun with it.";
									if (V.pedo_mode) {
										r.push(
											`"If you like sexy little toy dolls, I mean biological`,
											App.UI.DOM.makeElement("span", "lolis", ["coral", "bold"]),
											`or`,
											App.UI.DOM.makeElement("span", "shotas", ["coral", "bold"]),
											`for life, then this is the one for you. I picked it up from an exotics dealer, who picked it up from some old world government research center.`,
											match,
											`Remember, though, no money back on this. Technology like this doesn't exist anywhere else, your younger slaves will stay that way forever, and your older ones will slowly begin to regress towards that nice mid-childhood state. If you want to build yourself a cadre of`,
											App.UI.DOM.makeElement("span", "preteen", ["coral", "bold"]),
											`delights for yourself or your customers, then buy now!"`
										);
									} else {
										r.push(
											`"This might be a little too shady or perverted for you. But, if you want your slaves to last longer, you know, look younger for longer, well this treatment can help. However it comes at a price, this treatment will eventually turn your slave girls younger and younger looking, until the point you might not want to use them as sex slaves because they'll appear as teenagers or even younger. I'm serious, your slaves treated with this treatment will eventually look like children! They won't be, really, but this is no fountain of perpetual youth, and to be fair, maybe none of this will be up your alley. If that's the case, I guess you could just sell them once they get too young looking, and possibly for a higher price than if they looked older. It's, at best, for possibly more discerning or eclectic tastes then you might have. I picked it up from an exotics dealer, who picked it up from some old world government research center.`,
											match,
											`Remember, though, no money back on this. Technology like this doesn't exist anywhere else, your treated slaves will stay and become younger looking forever, and your older ones will slowly begin to regress towards a disturbingly young mid-childhood state. All those caveats aside, if this sounds like something you'd want, then buy now!"`
										);
									}
									if (V.cash >= NCSCash) {
										r.push(r.pop() + `"`);
										App.Events.addNode(node, r, "div");
										r = [];
										App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
											"Purchase childhood fertility induced NCS",
											() => {
												cashX(-NCSCash, "capEx");
												V.arcologies[0].childhoodFertilityInducedNCSResearch = 1;
												V.merchantFSWares.delete("childFertilityInducedSyndromeX");
												App.UI.reload();
											},
											[],
											"",
											`${(cashFormat(NCSCash))}.`
										));
									} else {
										r.push(`Or, you know, come back with money."`);
										App.Events.addNode(node, r, "div");
										r = [];
										r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(NCSCash))}</span> for the Childhood Fertility <span class="orange">Induced NCS</span> (genetic engineering and hormonal blend) research recipe.`);
									}
								} else {
									r.push(`You already possess the Childhood Fertility <span class="orange">Induced NCS</span> (genetic engineering and hormonal blend) research recipe.`);
									V.merchantIllegalWares.delete("childhoodFertilityInducedNCS");
								}
							}
						}
						if ((V.minimumSlaveAge <= 15 && V.minimumSlaveAge > 8) || (V.cash < NCSCash)) {
							r.push(
								`He notices your interest and lets you read the information`,
								App.UI.DOM.combineNodes(App.Encyclopedia.link("Childhood Fertility Induced NCS"), ".")
							);
							App.Events.addNode(node, r, "div");
							r = [];
							if (V.minimumSlaveAge <= 15 && V.minimumSlaveAge > 8) {
								V.merchantIllegalWares.delete("childhoodFertilityInducedNCS");
							}
						}
					} else {
						r.push(`You have no interest in such a distasteful research.`);
						V.merchantIllegalWares.delete("childhoodFertilityInducedNCS");
					}
					break;
				}
				case "UterineRestraintMesh":
					if (V.UterineRestraintMesh === 0) {
						if (V.seePreg === 1) {
							if (V.ImplantProductionUpgrade === 1) {
								if (V.surgeryUpgrade === 1) {
									const uterineMeshCash = 20000;
									if (V.cash >= uterineMeshCash) {
										App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
											"Purchase blueprints for a supportive uterine mesh",
											() => {
												cashX(-uterineMeshCash, "capEx");
												V.UterineRestraintMesh = 1;
												V.merchantIllegalWares.delete("UterineRestraintMesh");
												App.UI.reload();
											},
											[],
											"",
											`${(cashFormat(uterineMeshCash))}.`
										));
									} else {
										r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(uterineMeshCash))}</span> for a supportive uterine mesh.`);
									}
									App.Events.addNode(node, r, "div");
									r = [];
									r.push(`"This is an interesting one... It's designed to prevent any sort of rupturing of the uterus, but, while that idea is great and all, it does jack shit to prevent leaks from elsewhere in the organ. The guy funding the research company was pissed when his slave bloated up like a cum-filled balloon and dropped dead, destroyed most of the development lab. Fortunately, he failed to ruin the best part of it — these blueprints. Now, you're probably wondering what good is something like this, but I've done business with a number of industrial slave farms, and they swear upon its ability to force a girl to carry far more children than physically possible; well, up until their wombs crushed their organs, that is. I supposed it'd work with anything solid, really, if you enjoy sticking things up into slave girls."`);
								} else {
									r.push(App.UI.DOM.makeElement("span", "The autosurgery lacks the finesse needed to implant something of this complexity, so designs for a supportive uterine mesh are unusable until it is upgraded.", ["note"]));
								}
							} else {
								r.push(`You lack the facilities needed to produce implants of this complexity, so designs for a supportive uterine mesh are currently unobtainable.`);
							}
						} else {
							r.push(`You have no interest in research to support pregnancy.`);
							V.merchantIllegalWares.delete("UterineRestraintMesh");
						}
					} else {
						r.push(`You already possess blueprints for a supportive uterine mesh.`);
						V.merchantIllegalWares.delete("UterineRestraintMesh");
					}
					break;
				case "PGHack":
					if (V.PGHack === 0) {
						if (V.seePreg === 1) {
							if (V.ImplantProductionUpgrade === 1) {
								if (V.surgeryUpgrade === 1) {
									const broodHackCash = 20000;
									if (V.cash >= broodHackCash) {
										App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
											"Purchase documents regarding the broodmother implant firmware hack",
											() => {
												cashX(-broodHackCash, "capEx");
												V.PGHack = 1;
												V.merchantIllegalWares.delete("PGHack");
												App.UI.reload();
											},
											[],
											"",
											`${(cashFormat(broodHackCash))}.`
										));
									} else {
										r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(broodHackCash))}</span> for the broodmother implant firmware data.`);
									}
									App.Events.addNode(node, r, "div");
									r = [];
									r.push(`"I might have something for you, if you're interested. Some time ago a hacker manage to crack the firmware of the publicly available broodmother implant and found how to manipulate it through the radio channel normally used for monitoring. His goal was to take revenge on an arcology owner whose beloved concubine had this implant, but this plan failed as he couldn't hide his hacking attempt; to send something to the implant you need to be very close to it. In fact, you need a special actuator inserted up to the cervix, which just so happens to be included in this deal. It is very much advised to use it from within a surgical suite, in case of complications, such as the sudden activation of the birthing process. But anyway, the hack, if applied appropriately, can interfere with the original logic of the implant, forcing it to release more than one ovum every week. Originally, the hacker made it about a dozen, but after we tweaked his initial code, now it will be just two or three ova. You will get all the required data and schematics for the autosurgery upgrade, but you will need to make and install it on your own."`);
								} else {
									r.push(`The autosurgery lacks the needed actuators, so applying the broodmother implant hack complex is impossible.`);
								}
							} else {
								r.push(`You lack the facilities needed to produce something this complex, so production of broodmother implant hack complex is out of your reach.`);
							}
						} else {
							r.push(`You have no interest in research that involves pregnancy.`);
							V.merchantIllegalWares.delete("PGHack");
						}
					} else {
						r.push(`You already possess the broodmother implant hack.`);
						V.merchantIllegalWares.delete("PGHack");
					}
					break;
				case "BlackmarketPregAdaptation":
					if (V.BlackmarketPregAdaptation === 0 && V.minimumSlaveAge <= 6) {
						if (V.seePreg === 1) {
							const incCash = 120000;
							if (V.cash >= incCash && !(V.arcologies[0].FSRepopulationFocus >= 60)) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase documents regarding an incubator pregnancy adaptation module",
									() => {
										cashX(-incCash, "capEx");
										V.BlackmarketPregAdaptation = 1;
										V.merchantIllegalWares.delete("BlackmarketPregAdaptation");
										App.UI.reload();
									},
									[],
									"",
									`${(cashFormat(incCash))}.`
								));
							} else if (V.cash < incCash) {
								r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(120000))}</span> for documentation on an incubator pregnancy adaptation module.`);
							}
							App.Events.addNode(node, r, "div");
							r = [];
							r.push(`"I'm not sure about this one, but you might still be interested. Let me just begin with a story... some time ago, there was a man with a very pregnant girl in tow. Not so unusual in these days, but what made it really stand out was the girl's age — she couldn't have been any older then six! And looked ready to birth full sized triplets, no less. To top it all off, she did not look stressed by it at all, which was just amazing, given her size. The man said that he invented some sort of subsystem for those modern incubators to prep the occupant's body in a special way, and that this girl was a test subject. I do not understand much about this technical stuff, but the documentation seems legit enough. If you like, I can sell it to you; no guarantees though, on either the construction or the results."`);
							if (V.arcologies[0].FSRepopulationFocus >= 60) {
								App.Events.addParagraph(node, [`As a repopulationist society, you already have similar documentation in your possession. Buying this would be a waste of money.`]);
							} else if (V.incubator.capacity === 0 || V.dispensaryUpgrade < 1 || V.bellyImplants < 1) {
								App.Events.addParagraph(node, [`You lack the facilities needed to manufacture something this complex, so while you can buy its documentation, actual production and installation of the module is currently out of your reach.`]);
							}
						} else {
							r.push(`You have no interest in research that involves pregnancy.`);
							V.merchantIllegalWares.delete("BlackmarketPregAdaptation");
						}
					} else if (V.incubator.capacity > 0) {
						if (V.incubator.upgrade.pregAdaptation === 0 && V.minimumSlaveAge > 6) {
							r.push(`You have no interest in such a distasteful offer.`);
							V.merchantIllegalWares.delete("BlackmarketPregAdaptation");
						} else {
							r.push(`You already possess the incubator pregnancy adaptation module.`);
							V.merchantIllegalWares.delete("BlackmarketPregAdaptation");
						}
					}
					break;
				case "RapidCellGrowthFormula":
					if (V.geneticMappingUpgrade === 0) {
						r.push(`You lack the facilities required for such a treatment to be effective on specific individuals.`);
					} else if (V.dispensaryUpgrade === 0) {
						r.push(`You lack the facilities required to produce complex gene-altering treatments.`);
					} else {
						if (V.RapidCellGrowthFormula === 0) {
							const slushFund = 70000;
							if (V.cash >= slushFund) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase formulas for elasticity increasing injections",
									() => {
										cashX(-slushFund, "capEx");
										V.RapidCellGrowthFormula = 1;
										V.merchantIllegalWares.delete("RapidCellGrowthFormula");
										App.UI.reload();
									},
									[],
									"",
									`Costs ${(cashFormat(slushFund))}`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(slushFund))}</span> for elasticity increasing injections.`);
							}
							App.Events.addNode(node, r, "div");
							r = [];
							r.push(`"These injections will loosen up any skin, muscle, organ or whatever living flesh you inject them into. I'm not entirely sure how they work, something about increased cell growth or something. Probably not the safest thing to use, what with it pretty much being cancer in a vial. From what I've gathered, they were originally being developed to use with fillable breast implants. Some rich investor got his rocks off from BE and decided to make his dream a reality. Worked great too, save for the fact that the breasts didn't shrink down when the implant was emptied. Yep, she was left with a big ol' pair of floppy tits after being stretched so much. My take is, if you want to get big, fast, this is the drug for you, but only if you don't care about ever going back."`);
						} else {
							r.push(`You already possess formulas for elasticity increasing injections.`);
							V.merchantIllegalWares.delete("RapidCellGrowthFormula");
						}
					}
					break;
				case "optimizedSpermFormula":
					if (V.geneticMappingUpgrade === 0) {
						r.push(`You lack the facilities required for such a treatment to be effective on specific individuals.`);
					} else if (V.dispensaryUpgrade === 0) {
						r.push(`You lack the facilities required to produce complex gene-altering treatments.`);
					} else {
						if (V.optimizedSpermFormula === 0) {
							const spermCash = 40000;
							if (V.cash >= spermCash) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase formulas for injections to greatly improve sperm efficiency",
									() => {
										cashX(-spermCash, "capEx");
										V.optimizedSpermFormula = 1;
										V.merchantIllegalWares.delete("optimizedSpermFormula");
										App.UI.reload();
									},
									[],
									"",
									`Costs ${(cashFormat(spermCash))}`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(spermCash))}</span> for sperm optimizing injections.`);
							}
							App.Events.addNode(node, r, "div");
							r = [];
							r.push(`"Managed to get these from a pissed off employee just before their employer got sued out of existence. Makes sperm super resilient and vigorous, and from what I've heard, able to survive outside the body for an extended period of time. Apparently`);
							if (!V.seePreg) {
								r.push(`seeing puddles of spunk crawling around on the floor seemingly 'hunting' fertile women was enough to freak people out.`);
							} else {
								r.push(`being hunted down and unknowingly inseminated by a wandering puddle of spunk your ${V.seeIncest ? "kid" : "roommate"} left in your bed is enough to really piss people off. Ooh! And there was that herm that got pregnant after blowing a load on her own chest and not cleaning it off fast enough! And that's not even mentioning how well they can swim either — what a headline that debacle was!`);
							}
							r.push(`Funny when things work too well, right?"`);
						} else {
							r.push(`You already possess formulas that make sperm way too aggressive.`);
							V.merchantIllegalWares.delete("optimizedSpermFormula");
						}
					}
					break;
				case "optimizedBreedingFormula":
					if (!V.seePreg) {
						r.push(`You have no interest in research to support pregnancy.`);
						V.merchantIllegalWares.delete("optimizedBreedingFormula");
					} else if (V.geneticMappingUpgrade === 0) {
						r.push(`You lack the facilities required for such a treatment to be effective on specific individuals.`);
					} else if (V.dispensaryUpgrade === 0) {
						r.push(`You lack the facilities required to produce complex gene-altering treatments.`);
					} else {
						if (V.optimizedBreedingFormula === 0) {
							const breederCash = 100000;
							if (V.cash >= breederCash) {
								App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
									"Purchase formulas for injections designed to enhance the ability to bear children",
									() => {
										cashX(-breederCash, "capEx");
										V.optimizedBreedingFormula = 1;
										V.merchantIllegalWares.delete("optimizedBreedingFormula");
										App.UI.reload();
									},
									[],
									"",
									`Costs ${(cashFormat(breederCash))}`
								));
							} else {
								r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(breederCash))}</span> for optimized breeder injections.`);
							}
							App.Events.addNode(node, r, "div");
							r = [];
							r.push(`"These injections optimize a woman's body for child production. They work amazingly too! The only downside is they take their job a tad too seriously. See, under no circumstances can a girl miscarry with these tweaks, but that's not the problem no — it's how badly they reacted to any sort of fertility agent that might so happen to be in her. By design, she'll be able to handle larger and larger pregnancies as the therapy pushes her to be more productive, but, you see, anything that makes her more fertile causes this to happen far faster than her body can keep up, and with the whole 'refuses to miscarry' thing, well..." He makes a gesture like a popping balloon. "You end up with quite the mess."`);
						} else {
							r.push(`You already possess formulas for enhancing a body's capability of bearing children.`);
							V.merchantIllegalWares.delete("optimizedBreedingFormula");
						}
					}
					break;
				case "sympatheticOvaries":
					if (V.sympatheticOvaries === 0) {
						if (V.seePreg === 1) {
							if (V.ImplantProductionUpgrade === 1) {
								const OVACash = 50000;
								if (V.cash >= OVACash) {
									App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
										"Purchase schematics for implants that synchronize ova release",
										() => {
											cashX(-OVACash, "capEx");
											V.sympatheticOvaries = 1;
											V.merchantIllegalWares.delete("sympatheticOvaries");
											App.UI.reload();
										},
										[],
										"",
										`${(cashFormat(OVACash))}.`
									));
								} else {
									r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(OVACash))}</span> for implants that synchronize ova release.`);
								}
								App.Events.addNode(node, r, "div");
								r = [];
								r.push(`"This pair of implants attaches directly to a girl's ovaries and uses signals to communicate with each other. When one releases an egg, the other is spurred to do the same — in other words, guaranteed twins, always. Now, you're probably wondering why I have this for sale and not one of the big names; well what do you think happens when you mix fertility drugs, or hell just a girl prone to twins, and something that effectively doubles egg counts? That's right: she gets really, really pregnant, like, dangerously so. Kind of boring compared to some of the other stuff I get in, to be honest. Though I sometimes wonder what would happen if you got multiple slaves with these implanted and kept them close to each other... Would one ovulating trigger every other implant to do the same?"`);
							} else {
								r.push(`You lack the facilities needed to produce implants of this complexity, so schematics for implants that synchronize ova release are currently unobtainable.`);
							}
						} else {
							r.push(`You have no interest in research to support pregnancy.`);
							V.merchantIllegalWares.delete("sympatheticOvaries");
						}
					} else {
						r.push(`You already possess schematics for implants that synchronize ova release.`);
						V.merchantIllegalWares.delete("sympatheticOvaries");
					}
					break;
				case "asexualReproduction":
					if (V.asexualReproduction === 0) {
						if (V.seePreg === 1) {
							if (V.organFarmUpgrade > 0) {
								const asexualCash = 80000;
								if (V.cash >= asexualCash) {
									App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
										"Purchase designs for asexually reproducing ovaries",
										() => {
											cashX(-asexualCash, "capEx");
											V.asexualReproduction = 1;
											V.merchantIllegalWares.delete("asexualReproduction");
											App.UI.reload();
										},
										[],
										"",
										`${(cashFormat(asexualCash))}.`
									));
								} else {
									r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(asexualCash))}</span> for asexually reproducing ovaries.`);
								}
								App.Events.addNode(node, r, "div");
								r = [];
								r.push(`"Ever wanted kids but were too lazy to even try? Then this is the modification for you! Just replace your slave's existing ovaries with these bad girls and she'll never be without child again! Sure there might be a little bit of inbreeding going on, given that she'd be both the mother and father and all that, and sure she might uncontrollably orgasm herself into a coma from trying to fertilize her own eggs, but think of all the time you'd save from not fucking her! Now, why it was designed that way I couldn't tell you, but from what I hear it's quite the show to watch a girl squirming in constant orgasm as she impregnates herself."`);
							} else {
								r.push(`You lack the facilities needed to grow organs, so methods of asexual reproduction are currently unobtainable.`);
							}
						} else {
							r.push(`You have no interest in research to support pregnancy.`);
							V.merchantIllegalWares.delete("asexualReproduction");
						}
					} else {
						r.push(`You already possess methods of asexual reproduction.`);
						V.merchantIllegalWares.delete("asexualReproduction");
					}
					break;
				case "AnimalOrgans":
					if (V.seeBestiality) {
						if (V.experimental.animalOvaries) {
							if (V.animalOvaries === 0 || V.animalTesticles === 0 || V.animalMpreg === 0) {
								if (V.organFarmUpgrade > 0) {
									const animalGonadsCash = 25000;
									if (V.cash >= animalGonadsCash) {
										if (V.animalOvaries === 0) {
											App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
												"Purchase schematics for animal ovaries",
												() => {
													cashX(-animalGonadsCash, "capEx");
													V.animalOvaries = 1;
													App.UI.reload();
												},
												[],
												"",
												`Costs ${(cashFormat(animalGonadsCash))} and allows you to implant animal ovaries into slaves.`
											));
										} else {
											r.push(`You already possess schematics for implanting animal ovaries.`);
										}
									} else {
										r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(animalGonadsCash))}</span> for animal ovaries.`);
									}
									if (V.cash >= animalGonadsCash) {
										if (V.animalTesticles === 0) {
											App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
												"Purchase schematics for animal testicles",
												() => {
													cashX(-animalGonadsCash, "capEx");
													V.animalTesticles = 1;
													App.UI.reload();
												},
												[],
												"",
												`Costs ${(cashFormat(animalGonadsCash))} and allows you to implant animal testicles into slaves.`
											));
										} else {
											r.push(`You already possess schematics for implanting animal testicles.`);
										}
									} else {
										r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(animalGonadsCash))}</span> for animal testicles.`);
									}
									if (V.cash >= animalGonadsCash) {
										if (V.animalMpreg === 0) {
											App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
												"Purchase schematics for animal anal wombs and ovaries",
												() => {
													cashX(-animalGonadsCash, "capEx");
													V.animalMpreg = 1;
													App.UI.reload();
												},
												[],
												"",
												`Costs ${(cashFormat(animalGonadsCash))} and allows you to implant animal anal wombs and ovaries into slaves.`
											));
										} else {
											r.push(`You already possess schematics for implanting animal anal wombs and ovaries.`);
										}
									} else {
										r.push(`You cannot afford the asking price of <span class="cash dec">${(cashFormat(animalGonadsCash))}</span> for animal anal wombs and ovaries.`);
									}
									/* TODO: flesh this out some more */
									App.Events.addNode(node, r, "div");
									r = [];
									r.push(`"Got something real special this week. These are schematics for implanting non-human organs into humans. My supplier told me they came from some military experiments or something — maybe they were trying to make some kind of super soldier. Not my business, though."`);
								} else {
									r.push(`You lack the facilities required to grow organs.`);
								}
							} else { /* if all schematics have already been purchased */
								r.push(`You already possess all of the schematics for implanting animal organs.`);
								V.merchantIllegalWares.delete("AnimalOrgans");
							}
						}
					} else {
						V.merchantIllegalWares.delete("AnimalOrgans");
					}
			}
			App.Events.addNode(node, r, "div");
			r = [];
		}
	} else {
		App.UI.DOM.appendNewElement("div", node, `You appear to already possess all the black market schematics he has to offer.`);
	}
	if (V.cheatMode === 1) {
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Refresh illicit wares list",
			() => {
				V.thisWeeksIllegalWares = ["childhoodFertilityInducedNCS", "UterineRestraintMesh", "PGHack", "BlackmarketPregAdaptation", "RapidCellGrowthFormula", "optimizedSpermFormula", "optimizedBreedingFormula", "sympatheticOvaries", "asexualReproduction"];
				App.UI.reload();
			}
		));
	}
	return node;
};
