/**
 * Displays a summary of the infant
 * @param {App.Facilities.Nursery.InfantState} child
 * @returns {string}
 */
App.Facilities.Nursery.InfantSummary = function(child) {
	const weeksOwned = V.week - child.weekAcquired;
	const abbreviate = V.UI.slaveSummary.abbreviation;

	let r = ``;

	function InfantSummaryUncached() {
		// r += health();
		r += description();
		r += race();
		r += nationality();
		r += skin();
		r += age();
		r += face();

		r += `</span><br>`;

		if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
			r += "&nbsp;&nbsp;&nbsp;&nbsp;";
		}

		r += intelligence();
		if (child.prestige > 0) {
			r += prestige();
		}
		if (child.pornPrestige > 0) {
			r += pornPrestige();
		}
		r += behavioralFlaw();
		r += sexualFlaw();

		if ((child.relationship !== 0) || (abbreviate.clothes === 2) || (abbreviate.rulesets === 2)) {
			r += `<br> `;
			if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
				r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			}
		}

		r += extendedFamily();
		r += rival();

		r += `&nbsp;&nbsp;&nbsp;&nbsp;`;

		if (abbreviate.origins === 2 && child.origin !== "") {
			r += origins();
		}

		return r;
	}


	// function health() {
	// if (abbreviate.health === 1) {
	// 	return shortHealth();
	// } else if (abbreviate.health === 2) {
	// 	return longHealth();
	// }
	// }

	function description() {
		let desc;

		if (abbreviate.nationality +
			abbreviate.genitalia +
			abbreviate.physicals +
			abbreviate.skills +
			abbreviate.mental !== 0) {
			r += `<br> `;
			if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
				r += "&nbsp;&nbsp;&nbsp;&nbsp;";
			}
		}

		if (child.actualAge > 0) {
			if (child.actualAge > 1) {
				desc = `toddler`;
			} else {
				desc = `baby`;
			}
		} else {
			if (weeksOwned <= 1) {
				desc = `newborn`;
			} else {
				desc = `baby`;
			}
		}

		const firstLetter = desc.substring(0, 1).toUpperCase();

		desc = firstLetter + desc.substring(1);
		r += `<strong><span class="coral">${desc}${abbreviate.physicals === 2 ? '.' : ''}</span></strong> `;

		return r;
	}

	function race() {
		let r = ``;

		if (V.seeRace) {
			r += `<span class="race">`;

			if (abbreviate.race === 1) {
				r += shortRace();
			} else if (abbreviate.race === 2) {
				r += App.Data.misc.filterRaces.get(child.race) || `${child.race.charAt(0).toUpperCase() + child.race.slice(1)}. `;
			}
			r += `</span> `;
		}

		return r;
	}

	function nationality() {
		if (abbreviate.nationality === 1) {
			return shortNationality();
		} else if (abbreviate.nationality === 2) {
			return longNationality();
		}
	}

	function skin() {
		if (abbreviate.physicals === 1) {
			return shortSkin();
		} else {
			return longSkin();
		}
	}

	function age() {
		if (abbreviate.physicals === 1) {
			return shortAge();
		} else if (abbreviate.physicals === 2) {
			return longAge();
		}
	}

	function face() {
		if (abbreviate.physicals === 1) {
			return shortFace();
		} else if (abbreviate.physicals === 2) {
			return longFace();
		}
	}

	function intelligence() {
		if (abbreviate.skills === 1) {
			return shortIntelligence();
		} else if (abbreviate.skills === 2) {
			return longIntelligence();
		}
	}

	function prestige() {
		if (abbreviate.skills === 1) {
			return shortPrestige();
		} else if (abbreviate.skills === 2) {
			return longPrestige();
		}
	}

	function pornPrestige() {
		if (abbreviate.skills === 1) {
			return shortPornPrestige();
		} else if (abbreviate.skills === 2) {
			return longPornPrestige();
		}
	}

	function behavioralFlaw() {
		if (abbreviate.mental === 1) {
			return shortBehaviorFlaw();
		} else if (abbreviate.mental === 2) {
			return longBehaviorFlaw();
		}
	}

	function sexualFlaw() {
		if (abbreviate.mental === 1) {
			return shortSexFlaw();
		} else if (abbreviate.mental === 2) {
			return longSexFlaw();
		}
	}

	function extendedFamily() {
		if (abbreviate.mental === 1) {
			let r = ``;

			r += `<span class="lightgreen">`;
			shortExtendedFamily();
			r += `</span> `;

			return r;
		} else if (abbreviate.mental === 2) {
			return longExtendedFamily();
		}
	}

	function rival() {
		if (abbreviate.mental === 1) {
			return shortRival();
		} else if (abbreviate.mental === 2) {
			return longRival();
		}
	}

	function origins() {
		let r = `<br> `;

		if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
		}
		r += `<span class="gray">${child.origin}</span> `;

		return r;
	}




	// /**	TODO: add health to infants
	// function shortHealth() {
	// 	if (child.health.condition < -20) {
	// 		r += `<strong><span class="red">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
	// 	} else if (child.health.condition <= 20) {
	// 		r += `<strong><span class="yellow">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
	// 	} else if (child.health.condition > 20) {
	// 		r += `<strong><span class="green">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
	// 	}
	// 	r += " ";
	// }

	// function longHealth() {
	// 	if (child.health.condition < -90) {
	// 		r += `<span class="red">On the edge of death ${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition < -50) {
	// 		r += `<span class="red">Extremely unhealthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition < -20) {
	// 		r += `<span class="red">Unhealthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition <= 20) {
	// 		r += `<span class="yellow">Healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition <= 50) {
	// 		r += `<span class="green">Very healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else if (child.health.condition <= 90) {
	// 		r += `<span class="green">Extremely healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	} else {
	// 		r += `<span class="green">Unnaturally healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
	// 	}
	// 	r += " ";
	// }

	function shortRace() {
		let r = ``;

		switch (child.race) {
			case "white":
				r += `C`;
				break;
			case "asian":
				r += `A`;
				break;
			case "indo-aryan":
				r += `I`;
				break;
			case "latina":
				r += `L`;
				break;
			case "middle eastern":
				r += `ME`;
				break;
			case "black":
				r += `B`;
				break;
			case "pacific islander":
				r += `PI`;
				break;
			case "catgirl":
				r += `CT`;
				break;
			case "malay":
				r += `M`;
				break;
			case "amerindian":
				r += `AI`;
				break;
			case "semitic":
				r += `S`;
				break;
			case "southern european":
				r += `SE`;
				break;
			case "mixed race":
				r += `MR`;
				break;
			default:
				r += `${child.race.charAt(0).toUpperCase() + child.race.charAt(1) + child.race.charAt(2)}`;
				break;
		}

		return r;
	}

	function shortNationality() {
		let r = `<span class="tan">`;

		switch (child.nationality) {
			case "Afghan":
				r += `Afg`;
				break;
			case "Albanian":
				r += `Alb`;
				break;
			case "Algerian":
				r += `Alg`;
				break;
			case "American":
				r += `USA`;
				break;
			case "Andorran":
				r += `And`;
				break;
			case "Angolan":
				r += `Ang`;
				break;
			case "Antiguan":
				r += `AB`;
				break;
			case "Argentinian":
				r += `Arg`;
				break;
			case "Armenian":
				r += `Arm`;
				break;
			case "Aruban":
				r += `Aru`;
				break;
			case "Australian":
				r += `Aus`;
				break;
			case "Austrian":
				r += `Aut`;
				break;
			case "Azerbaijani":
				r += `Aze`;
				break;
			case "Bahamian":
				r += `Bah`;
				break;
			case "Bahraini":
				r += `Bah`;
				break;
			case "Bangladeshi":
				r += `Bgd`;
				break;
			case "Barbadian":
				r += `Bar`;
				break;
			case "Belarusian":
				r += `Ber`;
				break;
			case "Belgian":
				r += `Bel`;
				break;
			case "Belizean":
				r += `Blz`;
				break;
			case "Beninese":
				r += `Ben`;
				break;
			case "Bermudian":
				r += `Bmd`;
				break;
			case "Bhutanese":
				r += `Bhu`;
				break;
			case "Bissau-Guinean":
				r += `GB`;
				break;
			case "Bolivian":
				r += `Bol`;
				break;
			case "Bosnian":
				r += `Bos`;
				break;
			case "Brazilian":
				r += `Bra`;
				break;
			case "British":
				r += `UK`;
				break;
			case "Bruneian":
				r += `Bru`;
				break;
			case "Bulgarian":
				r += `Bul`;
				break;
			case "Burkinabé":
				r += `BF`;
				break;
			case "Burmese":
				r += `Bur`;
				break;
			case "Burundian":
				r += `Bnd`;
				break;
			case "Cambodian":
				r += `Kam`;
				break;
			case "Cameroonian":
				r += `Cam`;
				break;
			case "Canadian":
				r += `Can`;
				break;
			case "Cape Verdean":
				r += `CV`;
				break;
			case "Catalan":
				r += `Cat`;
				break;
			case "Central African":
				r += `CAR`;
				break;
			case "Chadian":
				r += `Cha`;
				break;
			case "Chilean":
				r += `Chl`;
				break;
			case "Chinese":
				r += `Chi`;
				break;
			case "Colombian":
				r += `Col`;
				break;
			case "Comorian":
				r += `Com`;
				break;
			case "Congolese":
				r += `RC`;
				break;
			case "a Cook Islander":
				r += `CI`;
				break;
			case "Costa Rican":
				r += `CR`;
				break;
			case "Croatian":
				r += `Cro`;
				break;
			case "Cuban":
				r += `Cub`;
				break;
			case "Curaçaoan":
				r += `Cur`;
				break;
			case "Cypriot":
				r += `Cyp`;
				break;
			case "Czech":
				r += `Cze`;
				break;
			case "Danish":
				r += `Den`;
				break;
			case "Djiboutian":
				r += `Dji`;
				break;
			case "Dominican":
				r += `DR`;
				break;
			case "Dominiquais":
				r += `Dom`;
				break;
			case "Dutch":
				r += `Nld`;
				break;
			case "East Timorese":
				r += `ET`;
				break;
			case "Ecuadorian":
				r += `Ecu`;
				break;
			case "Egyptian":
				r += `Egy`;
				break;
			case "Emirati":
				r += `UAE`;
				break;
			case "Equatoguinean":
				r += `EG`;
				break;
			case "Eritrean":
				r += `Eri`;
				break;
			case "Estonian":
				r += `Est`;
				break;
			case "Ethiopian":
				r += `Eth`;
				break;
			case "Fijian":
				r += `Fij`;
				break;
			case "Filipina":
				r += `Phl`;
				break;
			case "Finnish":
				r += `Fin`;
				break;
			case "French":
				r += `Fra`;
				break;
			case "French Guianan":
				r += `FG`;
				break;
			case "French Polynesian":
				r += `FP`;
				break;
			case "Gabonese":
				r += `Gab`;
				break;
			case "Gambian":
				r += `Gam`;
				break;
			case "Georgian":
				r += `Geo`;
				break;
			case "German":
				r += `Ger`;
				break;
			case "Ghanan":
				r += `Gha`;
				break;
			case "Greek":
				r += `Gre`;
				break;
			case "Greenlandic":
				r += `Grn`;
				break;
			case "Grenadian":
				r += `Gda`;
				break;
			case "Guamanian":
				r += `Gua`;
				break;
			case "Guatemalan":
				r += `Gtm`;
				break;
			case "Guinean":
				r += `Gui`;
				break;
			case "Guyanese":
				r += `Guy`;
				break;
			case "Haitian":
				r += `Hai`;
				break;
			case "Honduran":
				r += `Hon`;
				break;
			case "Hungarian":
				r += `Hun`;
				break;
			case "I-Kiribati":
				r += `Kir`;
				break;
			case "Icelandic":
				r += `Ice`;
				break;
			case "Indian":
				r += `Ind`;
				break;
			case "Indonesian":
				r += `Idn`;
				break;
			case "Iranian":
				r += `Irn`;
				break;
			case "Iraqi":
				r += `Irq`;
				break;
			case "Irish":
				r += `Irl`;
				break;
			case "Israeli":
				r += `Isr`;
				break;
			case "Italian":
				r += `Ita`;
				break;
			case "Ivorian":
				r += `IC`;
				break;
			case "Jamaican":
				r += `Jam`;
				break;
			case "Japanese":
				r += `Jpn`;
				break;
			case "Jordanian":
				r += `Jor`;
				break;
			case "Kazakh":
				r += `Kaz`;
				break;
			case "Kenyan":
				r += `Ken`;
				break;
			case "Kittitian":
				r += `SKN`;
				break;
			case "Korean":
				r += `Kor`;
				break;
			case "Kosovan":
				r += `Kos`;
				break;
			case "Kurdish":
				r += `Kur`;
				break;
			case "Kuwaiti":
				r += `Kuw`;
				break;
			case "Kyrgyz":
				r += `Kyr`;
				break;
			case "Laotian":
				r += `Lao`;
				break;
			case "Latvian":
				r += `Lat`;
				break;
			case "Lebanese":
				r += `Lbn`;
				break;
			case "Liberian":
				r += `Lib`;
				break;
			case "Libyan":
				r += `Lby`;
				break;
			case "a Liechtensteiner":
				r += `Lie`;
				break;
			case "Lithuanian":
				r += `Lit`;
				break;
			case "Luxembourgian":
				r += `Lux`;
				break;
			case "Macedonian":
				r += `Mac`;
				break;
			case "Malagasy":
				r += `Mad`;
				break;
			case "Malawian":
				r += `Mwi`;
				break;
			case "Malaysian":
				r += `Mys`;
				break;
			case "Maldivian":
				r += `Mdv`;
				break;
			case "Malian":
				r += `Mal`;
				break;
			case "Maltese":
				r += `Mlt`;
				break;
			case "Marshallese":
				r += `MI`;
				break;
			case "Mauritanian":
				r += `Mta`;
				break;
			case "Mauritian":
				r += `Mts`;
				break;
			case "Mexican":
				r += `Mex`;
				break;
			case "Micronesian":
				r += `FSM`;
				break;
			case "Moldovan":
				r += `Mol`;
				break;
			case "Monégasque":
				r += `Mnc`;
				break;
			case "Mongolian":
				r += `Mon`;
				break;
			case "Montenegrin":
				r += `Mng`;
				break;
			case "Moroccan":
				r += `Mor`;
				break;
			case "Mosotho":
				r += `Les`;
				break;
			case "Motswana":
				r += `Bot`;
				break;
			case "Mozambican":
				r += `Moz`;
				break;
			case "Namibian":
				r += `Nam`;
				break;
			case "Nauruan":
				r += `Nau`;
				break;
			case "Nepalese":
				r += `Npl`;
				break;
			case "New Caledonian":
				r += `NC`;
				break;
			case "a New Zealander":
				r += `NZ`;
				break;
			case "Ni-Vanuatu":
				r += `Van`;
				break;
			case "Nicaraguan":
				r += `Nic`;
				break;
			case "Nigerian":
				r += `Nga`;
				break;
			case "Nigerien":
				r += `Ngr`;
				break;
			case "Niuean":
				r += `Niu`;
				break;
			case "Norwegian":
				r += `Nor`;
				break;
			case "Omani":
				r += `Omn`;
				break;
			case "Pakistani":
				r += `Pak`;
				break;
			case "Palauan":
				r += `Plu`;
				break;
			case "Palestinian":
				r += `Pal`;
				break;
			case "Panamanian":
				r += `Pan`;
				break;
			case "Papua New Guinean":
				r += `PNG`;
				break;
			case "Paraguayan":
				r += `Par`;
				break;
			case "Peruvian":
				r += `Per`;
				break;
			case "Polish":
				r += `Pol`;
				break;
			case "Portuguese":
				r += `Por`;
				break;
			case "Puerto Rican":
				r += `PR`;
				break;
			case "Qatari":
				r += `Qat`;
				break;
			case "Romanian":
				r += `Rom`;
				break;
			case "Russian":
				r += `Rus`;
				break;
			case "Rwandan":
				r += `Rwa`;
				break;
			case "Sahrawi":
				r += `Sah`;
				break;
			case "Saint Lucian":
				r += `SL`;
				break;
			case "Salvadoran":
				r += `ES`;
				break;
			case "Sammarinese":
				r += `SM`;
				break;
			case "Samoan":
				r += `Sam`;
				break;
			case "São Toméan":
				r += `STP`;
				break;
			case "Saudi":
				r += `Sau`;
				break;
			case "Scottish":
				r += `Sco`;
				break;
			case "Senegalese":
				r += `Sen`;
				break;
			case "Serbian":
				r += `Srb`;
				break;
			case "Seychellois":
				r += `Sey`;
				break;
			case "Sierra Leonean":
				r += `Sie`;
				break;
			case "Singaporean":
				r += `Sng`;
				break;
			case "Slovak":
				r += `Svk`;
				break;
			case "Slovene":
				r += `Svn`;
				break;
			case "a Solomon Islander":
				r += `SI`;
				break;
			case "Somali":
				r += `Som`;
				break;
			case "South African":
				r += `RSA`;
				break;
			case "South Sudanese":
				r += `SS`;
				break;
			case "Spanish":
				r += `Spa`;
				break;
			case "Sri Lankan":
				r += `Sri`;
				break;
			case "Sudanese":
				r += `Sud`;
				break;
			case "Surinamese":
				r += `Sur`;
				break;
			case "Swazi":
				r += `Swa`;
				break;
			case "Swedish":
				r += `Swe`;
				break;
			case "Swiss":
				r += `Swi`;
				break;
			case "Syrian":
				r += `Syr`;
				break;
			case "Taiwanese":
				r += `Tai`;
				break;
			case "Tajik":
				r += `Taj`;
				break;
			case "Tanzanian":
				r += `Tza`;
				break;
			case "Thai":
				r += `Tha`;
				break;
			case "Tibetan":
				r += `Tib`;
				break;
			case "Togolese":
				r += `Tog`;
				break;
			case "Tongan":
				r += `Ton`;
				break;
			case "Trinidadian":
				r += `TT`;
				break;
			case "Tunisian":
				r += `Tun`;
				break;
			case "Turkish":
				r += `Tur`;
				break;
			case "Turkmen":
				r += `Tkm`;
				break;
			case "Tuvaluan":
				r += `Tuv`;
				break;
			case "Ugandan":
				r += `Uga`;
				break;
			case "Ukrainian":
				r += `Ukr`;
				break;
			case "Uruguayan":
				r += `Uru`;
				break;
			case "Uzbek":
				r += `Uzb`;
				break;
			case "Vatican":
				r += `VC`;
				break;
			case "Venezuelan":
				r += `Ven`;
				break;
			case "Vietnamese":
				r += `Vnm`;
				break;
			case "Vincentian":
				r += `SVG`;
				break;
			case "Yemeni":
				r += `Yem`;
				break;
			case "Zairian":
				r += `DRC`;
				break;
			case "Zambian":
				r += `Zam`;
				break;
			case "Zimbabwean":
				if (child.race === "white") {
					r += `Rho`;
				} else {
					r += `Zwe`;
				}
				break;
			case "Ancient Chinese Revivalist":
				r += `Chi Rev`;
				break;
			case "Ancient Egyptian Revivalist":
				r += `Egy Rev`;
				break;
			case "Arabian Revivalist":
				r += `Ara Rev`;
				break;
			case "Aztec Revivalist":
				r += `Azt Rev`;
				break;
			case "Edo Revivalist":
				r += `Edo Rev`;
				break;
			case "Roman Revivalist":
				r += `Rom Rev`;
				break;
			case "":
			case "none":
			case "child":
			case "Stateless":
				r += `None`;
				break;
			default:
				r += `${child.nationality.charAt(0) + child.nationality.charAt(1) + child.nationality.charAt(2)}`;
				break;
		}

		r += `</span> `;

		return r;
	}

	function longNationality() {
		let r = `<span class="nationality">`;

		switch (child.nationality) {
			case "a Cook Islander":
				r += `Cook Islander. `;
				break;
			case "a Liechtensteiner":
				r += `Liechtensteiner. `;
				break;
			case "a New Zealander":
				r += `New Zealander. `;
				break;
			case "a Solomon Islander":
				r += `Solomon Islander. `;
				break;
			case "Zimbabwean":
				if (child.race === "white") {
					r += `Rhodesian. `;
				} else {
					r += `${child.nationality}. `;
				}
				break;
			case "child":
			case "none":
			case "":
			case "Stateless":
				r += `Stateless. `;
				break;
			default:
				r += `${child.nationality}. `;
				break;
		}

		r += `</span> `;

		return r;
	}

	function shortSkin() {
		let r = `<span class="pink">`;

		switch (child.skin) {
			case "pure white":
				r += `P. Whi`;
				break;
			case "extremely fair":
				r += `E. Fai`;
				break;
			case "very fair":
				r += `V. Fai`;
				break;
			case "extremely pale":
				r += `E. Pal`;
				break;
			case "very pale":
				r += `V. Pal`;
				break;
			case "light brown":
				r += `L. Br`;
				break;
			case "dark brown":
				r += `D. Br`;
				break;
			case "light olive":
				r += `L. Oli`;
				break;
			case "dark olive":
				r += `D. Oli`;
				break;
			case "light beige":
				r += `L. Bei`;
				break;
			case "dark beige":
				r += `D. Bei`;
				break;
			case "tan":
				r += `Tan`;
				break;
			case "bronze":
				r += `Bron`;
				break;
			case "ebony":
				r += `Ebon`;
				break;
			case "pure black":
				r += `P. Bla`;
				break;
			case "black and white striped":
				r += `BnW`;
				break;
			case "yellow":
				r += `Ylw`;
				break;
			case "red":
				r += `Red`;
				break;
			case "dark":
			case "fair":
			case "pale":
				r += `${child.skin.charAt(0).toUpperCase() + child.skin.slice(1)}`;
				break;
			default:
				r += `${child.skin.charAt(0).toUpperCase() + child.skin.charAt(1) + child.skin.charAt(2)}`;
				break;
		}
		r += `</span> `;

		return r;
	}

	function longSkin() {
		return `<span class="pink">${child.skin.charAt(0).toUpperCase() + child.skin.slice(1)} skin.</span> `;
	}

	function shortAge() {
		let r = `<span class="pink">`;

		if (V.showAgeDetail === 1) {
			if (child.actualAge > 0) {
				r += `${capFirstChar(num(child.actualAge))}yrs. `;
			} else {
				if (weeksOwned > 4) {
					r += `${capFirstChar(num(Math.trunc(weeksOwned / 4)))}mos. `;
				} else {
					if (weeksOwned <= 1) {
						r += `Nwbrn. `;
					} else {
						r += `${capFirstChar(num(weeksOwned))}wks. `;
					}
				}
			}
		}

		return r;
	}

	function longAge() {
		let r = `<span class="pink">`;

		if (V.showAgeDetail) {
			if (child.actualAge > 0) {
				r += `${capFirstChar(num(child.actualAge))}-year-old `;
				if (child.actualAge > 1) {
					r += `toddler. `;
				} else {
					r += `baby. `;
				}
			} else {
				if (weeksOwned > 4) {
					r += `${capFirstChar(num(Math.trunc(weeksOwned / 4)))} months old. `;
				} else {
					if (weeksOwned <= 1) {
						r += `Newborn. `;
					} else {
						r += `${capFirstChar(num(weeksOwned))} weeks old. `;
					}
				}
			}
		}

		return r;
	}

	function shortFace() {
		let r = ``;

		if (child.face < -95) {
			r += `<span class="red">Face---${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face < -40) {
			r += `<span class="red">Face--${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face < -10) {
			r += `<span class="red">Face-${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face <= 10) {
			r += `Face${V.summaryStats ? `[${child.face}]` : ''}`;
		} else if (child.face <= 40) {
			r += `<span class="pink">Face+${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else if (child.face <= 95) {
			r += `<span class="pink">Face++${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		} else {
			r += `<span class="pink">Face+++${V.summaryStats ? `[${child.face}]` : ''}</span> `;
		}

		return r;
	}

	function longFace() {
		let r = `Likely to have `;

		if (child.face < -95) {
			r += `a <span class="red">very ugly${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else if (child.face < -40) {
			r += `a <span class="red">ugly${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else if (child.face < -10) {
			r += `a <span class="red">unattractive${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else if (child.face <= 10) {
			r += `an average${V.summaryStats ? `[${child.face}]`: ''}`;
		} else if (child.face <= 40) {
			r += `an <span class="pink">attractive${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else if (child.face <= 95) {
			r += `a <span class="pink">beautiful${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		} else {
			r += `a <span class="pink">very beautiful${V.summaryStats ? `[${child.face}]`: ''}</span>`;
		}
		r += `, ${child.faceShape} face. `;

		return r;
	}

	function shortIntelligence() {
		let intelligence = child.intelligence;
		let r = ``;

		if (child.hasOwnProperty("intelligenceImplant")) {
			intelligence += child.intelligenceImplant;
		}

		if (child.fetish === Fetish.MINDBROKEN) {
			return;
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 30) {
			if (intelligence >= 130) {
				r += `<span class="deepskyblue">I++++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I(e+)${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---(e+)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 15) {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I(e)${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---(e)${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		} else {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">I+++${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">I++${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">I+${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -15) {
				r += `I${V.summaryStats ? `[${intelligence}]` : ''}`;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">I-${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">I--${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			} else {
				r += `<span class="orangered">I---${V.summaryStats ? `[${intelligence}]` : ''}</span> `;
			}
		}

		return r;
	}

	function longIntelligence() {
		let intelligence = child.intelligence;
		let r = ``;

		if (child.hasOwnProperty("intelligenceImplant")) {
			intelligence += child.intelligenceImplant;
		}

		if (child.intelligence > 95) {
			r += `<span class="deepskyblue">Likely to be brilliant${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else if (intelligence > 50) {
			r += `<span class="deepskyblue">Likely to be very smart${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else if (intelligence > 15) {
			r += `<span class="deepskyblue">Likely to be smart${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else if (intelligence >= -15) {
			r += `Average intelligence${V.summaryStats ? `[${intelligence}]` : ''}. `;
		} else if (intelligence >= -50) {
			r += `<span class="orangered">Likely to be slow${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else if (intelligence >= -95) {
			r += `<span class="orangered">Likely to be very slow${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		} else {
			r += `<span class="orangered">Likely to be moronic${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
		}

		return r;
	}

	function shortPrestige() {
		let r = `<span class="green">`;

		if (child.prestige > 2) {
			r += `Prest++`;
		} else if (child.prestige === 2) {
			r += `Prest+`;
		} else if (child.prestige === 1) {
			r += `Prest`;
		}
		r += `</span> `;

		return r;
	}

	function longPrestige() {
		let r = `<span class="green">`;

		if (child.prestige > 2) {
			r += `Extremely prestigious. `;
		} else if (child.prestige === 2) {
			r += `Very prestigious. `;
		} else if (child.prestige === 1) {
			r += `Prestigious. `;
		}
		r += `</span> `;

		return r;
	}

	function shortPornPrestige() {
		let r = `<span class="green">`;

		if (child.pornPrestige > 2) {
			r += `PPrest++`;
		} else if (child.pornPrestige === 2) {
			r += `PPrest+`;
		} else if (child.pornPrestige === 1) {
			r += `PPrest`;
		}
		r += `</span> `;

		return r;
	}

	function longPornPrestige() {
		let r = `<span class="green">`;

		if (child.pornPrestige > 2) {
			r += `Porn star. `;
		} else if (child.pornPrestige === 2) {
			r += `Porn slut. `;
		} else if (child.pornPrestige === 1) {
			r += `Porn amateur. `;
		}
		r += `</span> `;

		return r;
	}

	function shortBehaviorFlaw() {
		let r = `<span class="red">`;

		switch (child.behavioralFlaw) {
			case "arrogant":
				r += `Arrog`;
				break;
			case "bitchy":
				r += `Bitchy`;
				break;
			case "odd":
				r += `Odd`;
				break;
			case "hates men":
				r += `Men-`;
				break;
			case "hates women":
				r += `Women-`;
				break;
			case "gluttonous":
				r += `Glut`;
				break;
			case "anorexic":
				r += `Ano`;
				break;
			case "devout":
				r += `Dev`;
				break;
			case "liberated":
				r += `Lib`;
				break;
			default:
				child.behavioralFlaw = "none";
				break;
		}
		r += `</span> `;

		return r;
	}

	function longBehaviorFlaw() {
		let r = `<span class="red">`;

		switch (child.behavioralFlaw) {
			case "arrogant":
				r += `Arrogant. `;
				break;
			case "bitchy":
				r += `Bitchy. `;
				break;
			case "odd":
				r += `Odd. `;
				break;
			case "hates men":
				r += `Hates men. `;
				break;
			case "hates women":
				r += `Hates women. `;
				break;
			case "gluttonous":
				r += `Stress eater. `;
				break;
			case "anorexic":
				r += `Anorexic. `;
				break;
			case "devout":
				r += `Devoutly religious. `;
				break;
			case "liberated":
				r += `Mentally liberated. `;
				break;
			default:
				child.behavioralFlaw = "none";
				break;
		}
		r += `</span> `;

		return r;
	}

	function shortSexFlaw() {
		let r = ``;

		switch (child.sexualFlaw) {
			case "hates oral":
				r += `<span class="red">Oral-</span> `;
				break;
			case "hates anal":
				r += `<span class="red">Anal-</span> `;
				break;
			case "hates penetration":
				r += `<span class="red">Fuck-</span> `;
				break;
			case "shamefast":
				r += `<span class="red">Shame</span> `;
				break;
			case "idealistic":
				r += `<span class="red">Ideal</span> `;
				break;
			case "repressed":
				r += `<span class="red">Repre</span> `;
				break;
			case "apathetic":
				r += `<span class="red">Apath</span> `;
				break;
			case "crude":
				r += `<span class="red">Crude</span> `;
				break;
			case "judgemental":
				r += `<span class="red">Judge</span> `;
				break;
			case "cum addict":
				r += `<span class="yellow">CumAdd</span> `;
				break;
			case "anal addict":
				r += `<span class="yellow">AnalAdd</span> `;
				break;
			case "attention whore":
				r += `<span class="yellow">Attention</span> `;
				break;
			case "breast growth":
				r += `<span class="yellow">BoobObsess</span> `;
				break;
			case "abusive":
				r += `<span class="yellow">Abusive</span> `;
				break;
			case "malicious":
				r += `<span class="yellow">Malice</span> `;
				break;
			case "self hating":
				r += `<span class="yellow">SelfHatr</span> `;
				break;
			case "neglectful":
				r += `<span class="yellow">SelfNeglect</span> `;
				break;
			case "breeder":
				r += `<span class="yellow">BreedObsess</span> `;
				break;
			default:
				child.sexualFlaw = "none";
				break;
		}

		return r;
	}

	function longSexFlaw() {
		let r = ``;

		switch (child.sexualFlaw) {
			case "hates oral":
				r += `<span class="red">Hates oral.</span> `;
				break;
			case "hates anal":
				r += `<span class="red">Hates anal.</span> `;
				break;
			case "hates penetration":
				r += `<span class="red">Hates penetration.</span> `;
				break;
			case "shamefast":
				r += `<span class="red">Shamefast.</span> `;
				break;
			case "idealistic":
				r += `<span class="red">Sexually idealistic.</span> `;
				break;
			case "repressed":
				r += `<span class="red">Sexually repressed.</span> `;
				break;
			case "apathetic":
				r += `<span class="red">Sexually apathetic.</span> `;
				break;
			case "crude":
				r += `<span class="red">Sexually crude.</span> `;
				break;
			case "judgemental":
				r += `<span class="red">Sexually judgemental.</span> `;
				break;
			case "cum addict":
				r += `<span class="yellow">Cum addict.</span> `;
				break;
			case "anal addict":
				r += `<span class="yellow">Anal addict.</span> `;
				break;
			case "attention whore":
				r += `<span class="yellow">Attention whore.</span> `;
				break;
			case "breast growth":
				r += `<span class="yellow">Breast obsession.</span> `;
				break;
			case "abusive":
				r += `<span class="yellow">Sexually abusive.</span> `;
				break;
			case "malicious":
				r += `<span class="yellow">Sexually malicious.</span> `;
				break;
			case "self hating":
				r += `<span class="yellow">Self hatred.</span> `;
				break;
			case "neglectful":
				r += `<span class="yellow">Self neglectful.</span> `;
				break;
			case "breeder":
				r += `<span class="yellow">Breeding obsession.</span> `;
				break;
			default:
				child.sexualFlaw = "none";
				break;
		}

		return r;
	}

	function shortExtendedFamily() {
		const {daughter, sister, wife} = getPronouns(child);

		let handled = 0;
		let r = ``;

		if (child.mother > 0) {
			const ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.mother;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s ${daughter}`;
				if (child.relationshipTarget === V.slaves[ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.mother === -1) {
			r += `Your ${daughter}`;
			if (child.relationship < -1) {
				r += ` & ${PCrelationshipTerm(child)}`;
				handled = 1;
			}
			r += " ";
		} else if (child.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.mother].fullName}'s ${daughter} `;
		}

		if (child.father > 0 && child.father !== child.mother) {
			const ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.father;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s ${daughter}`;
				if (child.relationshipTarget === V.slaves[ssj].ID && handled !== 1) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.father === -1 && child.mother !== -1) {
			r += `Your ${daughter}`;
			if (child.relationship < -1) {
				r += ` & ${PCrelationshipTerm(child)}`;
				handled = 1;
			}
			r += " ";
		} else if (child.father in V.missingTable && child.father !== child.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.father].fullName}'s ${daughter}`;
		}

		if (child.daughters === 1) {
			let ssj = V.slaves.findIndex(function(s) {
				return s.mother === child.ID;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s mother`;
				if (child.relationshipTarget === V.slaves[ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
			ssj = V.slaves.findIndex(function(s) {
				return s.father === child.ID;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s father`;
				if (child.relationshipTarget === V.slaves[ssj].ID && handled !== 1) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.daughters > 1) {
			r += `multiple daughters `;
		}

		if (child.sisters === 1) {
			const ssj = V.slaves.findIndex(function(s) {
				return areSisters(s, child) > 0;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s ${sister}`;
				if (child.relationshipTarget === V.slaves[ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += `& ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
		} else if (child.sisters > 1) {
			r += `multiple sisters `;
		}

		if (child.relationship > 0 && handled !== 1) {
			const ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s`;
				const friendShipShort = relationshipTermShort(child);
				r += ` ${friendShipShort}`;
			}
		} else if (child.relationship === -3 && child.mother !== -1 && child.father !== -1) {
			r += `Your ${wife}`;
		} else if (child.relationship === -2) {
			r += `E Bonded`;
		} else if (child.relationship === -1) {
			r += `E Slut`;
		}

		return r;
	}

	function longExtendedFamily() {
		const {daughter, sister, wife} = getPronouns(child);

		let handled = 0;
		let r = ``;

		if (child.mother > 0) {
			const ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.mother;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s <span class="lightgreen">${daughter}`;
				if (child.relationshipTarget === V.slaves[ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.mother === -1) {
			r += `Your `;

			if (child.relationship < -1) {
				r += `<span class="lightgreen">${daughter} and ${PCrelationshipTerm(child)}.</span> `;
				handled = 1;
			} else {
				r += `<span class="lightgreen">${daughter}.</span> `;
			}
		} else if (child.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.mother].fullName}'s <span class="lightgreen">${daughter}.</span> `;
		}

		if (child.father > 0 && child.father !== child.mother) {
			const ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.father;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s <span class="lightgreen">${daughter}`;
				if (child.relationshipTarget === V.slaves[ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.father === -1 && child.father !== child.mother) {
			r += `Your `;
			if (child.relationship < -1) {
				r += `<span class="lightgreen">${daughter} and ${PCrelationshipTerm(child)}.</span> `;
				handled = 1;
			} else {
				r += `<span class="lightgreen">${daughter}.</span> `;
			}
		} else if (child.father in V.missingTable && child.father !== child.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.father].fullName}'s <span class="lightgreen">${daughter}.</span> `;
		}

		if (child.daughters === 1) {
			let ssj = V.slaves.findIndex(function(s) {
				return s.mother === child.ID;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s <span class="lightgreen">mother`;
				if (child.relationshipTarget === V.slaves[ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
			ssj = V.slaves.findIndex(function(s) {
				return s.father === child.ID;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s <span class="lightgreen">father`;
				if (child.relationshipTarget === V.slaves[ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.daughters > 1) {
			if (child.daughters > 10) {
				r += `<span class="lightgreen">Has tons of daughters.</span> `;
			} else if (child.daughters > 5) {
				r += `<span class="lightgreen">Has many daughters.</span> `;
			} else {
				r += `<span class="lightgreen">Has several daughters.</span> `;
			}
		}

		if (child.sisters === 1) {
			const ssj = V.slaves.findIndex(function(s) {
				return areSisters(s, child) > 0;
			});
			if (ssj !== -1) {
				r += `${SlaveFullName(V.slaves[ssj])}'s <span class="lightgreen">${sister}`;
				if (child.relationshipTarget === V.slaves[ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.sisters > 1) {
			if (child.sisters > 10) {
				r += `<span class="lightgreen">One of many sisters.</span> `;
			} else if (child.sisters > 5) {
				r += `<span class="lightgreen">Has many sisters.</span> `;
			} else {
				r += `<span class="lightgreen">Has several sisters.</span> `;
			}
		}

		if (child.relationship > 0 && handled !== 1) {
			const ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (ssj !== -1) {
				const friendship = relationshipTerm(child);
				r += `${SlaveFullName(V.slaves[ssj])}'s `;
				r += `<span class="lightgreen">${friendship}.</span> `;
			}
		} else if (child.relationship === -3 && child.mother !== -1 && child.father !== -1) {
			r += `<span class="lightgreen">Your ${wife}.</span> `;
		} else if (child.relationship === -2) {
			r += `<span class="lightgreen">Emotionally bonded to you.</span> `;
		} else if (child.relationship === -1) {
			r += `<span class="lightgreen">Emotional slut.</span> `;
		}

		return r;
	}

	function shortRival() {
		let r = ``;

		if (child.rivalry !== 0) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			const ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.rivalryTarget;
			});
			if (ssj !== -1) {
				r += `<span class="lightsalmon">`;
				if (child.rivalry <= 1) {
					r += `Disl ${SlaveFullName(V.slaves[ssj])}`;
				} else if (child.rivalry <= 2) {
					r += `${SlaveFullName(V.slaves[ssj])}'s rival`;
				} else {
					r += `Hates ${SlaveFullName(V.slaves[ssj])}`;
				}
				r += `</span> `;
			}
		}

		return r;
	}

	function longRival() {
		let r = ``;

		if (child.rivalry !== 0) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			const ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.rivalryTarget;
			});

			if (ssj !== -1) {
				if (child.rivalry <= 1) {
					r += `<span class="lightsalmon">Dislikes</span> ${SlaveFullName(V.slaves[ssj])}. `;
				} else if (child.rivalry <= 2) {
					r += `${SlaveFullName(V.slaves[ssj])}'s <span class="lightsalmon">rival.</span> `;
				} else {
					r += `<span class="lightsalmon">Hates</span> ${SlaveFullName(V.slaves[ssj])}. `;
				}
			}
			r += " ";
		}

		return r;
	}

	return InfantSummaryUncached();
};
