// cSpell:ignore Austeyr, Bofors, BREN, CETME, CZUB, Cugir, Daewoo, DGIM, estoc, FACSA, FAMAE, FAMAS, Ferfrans, FMAP,
// cSpell:ignore Glauberyt, Glock, GPMG, IMBEL, Indumil, Izhmash, jambiya, Khaybar, khopesh, kightly, kilij, KRISS
// cSpell:ignore Lithgow, macuahuitl, MCIWS, Minebea, MKEK, Modelo, Molot, MSBS, MSMC, MTAR, Nexter, Norinco
// cSpell:ignore Pecheneg, Pernach, Pistolul, Produkt, Rachot, Rheinmetall, SAKO, Sarsilmaz, shamshir, shotel, Stechkin
// cSpell:ignore Steyr, Vektor, wakizashi, WITU, Xiuhcoatl, yatagan, Zastava

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.bodyguard = function(slave) {
	const r = [];
	const {
		his, He, he
	} = getPronouns(slave);
	if (slave.fuckdoll !== 0 || slave.ID !== V.BodyguardID) {
		return "";
	}
	r.push(`${He} is your bodyguard.`);
	r.push(bgWeapon());

	if (slave.skill.combat > 30) {
		r.push(`${He} is <span class="skill">skilled at combat:</span> ${he} is comfortable with the use of modern firearms and edged weapons, and ${his} hands`);
		if (!hasBothArms(slave)) {
			r.push(`would be deadly weapons if ${he} had`);
			if (!hasAnyArms(slave)) {
				r.push(`any.`);
			} else {
				r.push(`more than one.`);
			}
		} else {
			if ((getArmCount(slave, 5) + getArmCount(slave, 6) > 1)) {
				r.push(`would be deadly weapons even if they weren't full of deadly weapons already.`);
			} else {
				r.push(`are deadly weapons.`);
			}
		}
	}

	return r.join(" ");

	function bgWeapon() {
		const w = [];
		const arcInfo = new App.Utils.Arcology(V.arcologies[0]);
		if ((slave.muscles + slave.height - 100) / 25 > 5) {
			w.push(`${He} has a long ceramic`);
			switch (arcInfo.revivalSociety()) {
				case RevivalSociety.ROMAN: w.push('spatha'); break;
				case RevivalSociety.NEO_IMPERIAL: w.push(`claymore`); break;
				case RevivalSociety.EGYPTIAN: w.push(`shotel`); break;
				case RevivalSociety.EDO: w.push(`odachi`); break;
				case RevivalSociety.ARABIAN: w.push(`kilij`); break;
				case RevivalSociety.CHINESE: w.push(`changdao`); break;
				case RevivalSociety.AZTEC: w.push(`macuahuitl`); break;
				case RevivalSociety.ANTEBELLUM: w.push(`saber`); break;
				case null: w.push(``); break;
			}
			w.push(`sword strapped to ${his} back,`);
			switch (slave.nationality) {
				case "American":
					w.push(`and, in keeping with ${his} heritage, a US Ordnance Mk43 Mod.1 GPMG`);
					break;
				case "Armenian":
				case "Belarusian":
				case "Cuban":
				case "Hungarian":
				case "Kazakh":
				case "Uzbek":
					w.push(`and, in keeping with ${his} heritage, a PKM GPMG`);
					break;
				case "Australian":
					w.push(`and, in keeping with ${his} heritage, a Lithgow F89 Maximi GPMG`);
					break;
				case "Austrian":
					w.push(`and, in keeping with ${his} heritage, a Steyr MG 74 GPMG`);
					break;
				case "Belgian":
					w.push(`and, in keeping with ${his} heritage, a FN Minimi M3 LMG`);
					break;
				case "British":
				case "Scottish":
					w.push(`and, in keeping with ${his} heritage, an L7A2 GPMG`);
					break;
				case "Canadian":
					w.push(`and, in keeping with ${his} heritage, a Colt Canada 5.56-LSW LMG`);
					break;
				case "Chilean":
				case "German":
					w.push(`and, in keeping with ${his} heritage, a Rheinmetall MG3 GPMG`);
					break;
				case "Chinese":
					w.push(`and, in keeping with ${his} heritage, a Norinco QJY-88 LMG`);
					break;
				case "Czech":
				case "Slovak":
					w.push(`and, in keeping with ${his} heritage, a ZVI Uk vz.59 Rachot GPMG`);
					break;
				case "Filipina":
					w.push(`and, in keeping with ${his} heritage, a Government Arsenal M60E4 GPMG`);
					break;
				case "Finnish":
					w.push(`and, in keeping with ${his} heritage, a Valmet KvKK 62 LMG`);
					break;
				case "French":
					w.push(`and, in keeping with ${his} heritage, a MAS AAT-F1 GPMG`);
					break;
				case "Indian":
					w.push(`and, in keeping with ${his} heritage, an OFB MG 2A1 GPMG`);
					break;
				case "Indonesian":
					w.push(`and, in keeping with ${his} heritage, a Pindad SM2 LMG`);
					break;
				case "Iranian":
					w.push(`and, in keeping with ${his} heritage, a DIO MGA3 GPMG`);
					break;
				case "Israeli":
					w.push(`and, in keeping with ${his} heritage, an IWI Negev NG7 GPMG`);
					break;
				case "Japanese":
					w.push(`and, in keeping with ${his} heritage, a Sumitomo Type 62 GPMG`);
					break;
				case "Korean":
					w.push(`and, in keeping with ${his} heritage, a S&T K12 GPMG`);
					break;
				case "Mexican":
					w.push(`and, in keeping with ${his} heritage, a SEDENA MG-21 GPMG`);
					break;
				case "Polish":
					w.push(`and, in keeping with ${his} heritage, a ZMT UKM-2000 GPMG`);
					break;
				case "Romanian":
					w.push(`and, in keeping with ${his} heritage, a FACSA PM md.93 LMG`);
					break;
				case "Russian":
					w.push(`and, in keeping with ${his} heritage, a PKP Pecheneg GPMG`);
					break;
				case "Serbian":
					w.push(`and, in keeping with ${his} heritage, a Zastava M09 LMG`);
					break;
				case "South African":
					w.push(`and, in keeping with ${his} heritage, a Vektor SS-77 GPMG`);
					break;
				case "Spanish":
					w.push(`and, in keeping with ${his} heritage, a CETME MG 82 Ameli LMG`);
					break;
				case "Swiss":
					w.push(`and, in keeping with ${his} heritage, a W+F-Bern MG51 GPMG`);
					break;
				case "Turkish":
					w.push(`and, in keeping with ${his} heritage, a MKEK MG3 GPMG`);
					break;
				case "Ukrainian":
					w.push(`and, in keeping with ${his} heritage, a Fort-401 LMG`);
					break;
				case "Vietnamese":
					w.push(`and, in keeping with ${his} heritage, a Z111 RPK LMG`);
					break;
				case "Zimbabwean":
					if (slave.race === "white") {
						w.push(`and, in keeping with ${his} heritage, a FN MAG-58 GPMG`);
					} else {
						w.push(`and a FN MAG 60.20 GPMG`);
					}
					break;
				default:
					w.push(`and a FN MAG 60.20 GPMG`);
			}
			w.push(`slung crosswise on ${his} chest.`);
		} else if ((slave.muscles + slave.height - 100) / 25 > 4) {
			w.push(`${He} has a ceramic`);
			switch (arcInfo.revivalSociety()) {
				case RevivalSociety.ROMAN: w.push('gladius'); break;
				case RevivalSociety.NEO_IMPERIAL: w.push(`kightly`); break;
				case RevivalSociety.EGYPTIAN: w.push(`khopesh`); break;
				case RevivalSociety.EDO: w.push(`katana`); break;
				case RevivalSociety.ARABIAN: w.push(`shamshir`); break;
				case RevivalSociety.CHINESE: w.push(`jian`); break;
				case RevivalSociety.AZTEC: w.push(`macuahuitl`); break;
				case RevivalSociety.ANTEBELLUM: w.push(`saber`); break;
				case null: w.push(``); break;
			}
			w.push(`sword strapped to ${his} back`);
			switch (slave.nationality) {
				case "American":
					w.push(`and, in keeping with ${his} heritage, a Colt M16A4 assault rifle`);
					break;
				case "Argentinian":
					w.push(`and, in keeping with ${his} heritage, a FMAP FARA-83 assault rifle`);
					break;
				case "Armenian":
				case "Belarusian":
				case "Kazakh":
				case "Uzbek":
					w.push(`and, in keeping with ${his} heritage, a Kalashnikov AK-74M assault rifle`);
					break;
				case "Australian":
					w.push(`and, in keeping with ${his} heritage, a Lithgow EF88 Austeyr bullpup assault rifle`);
					break;
				case "Austrian":
					w.push(`and, in keeping with ${his} heritage, a Steyr AUG A3 bullpup assault rifle`);
					break;
				case "Belgian":
					w.push(`and, in keeping with ${his} heritage, a FN FNC M2 assault rifle`);
					break;
				case "Brazilian":
					w.push(`and, in keeping with ${his} heritage, an IMBEL IA2 assault rifle`);
					break;
				case "British":
				case "Scottish":
					w.push(`and, in keeping with ${his} heritage, an L85A3 bullpup assault rifle`);
					break;
				case "Canadian":
					w.push(`and, in keeping with ${his} heritage, a Colt Canada MRR assault rifle`);
					break;
				case "Chilean":
					w.push(`and, in keeping with ${his} heritage, a FAMAE ACE 22NC assault rifle`);
					break;
				case "Chinese":
					w.push(`and, in keeping with ${his} heritage, a Norinco QBZ-95-1 bullpup assault rifle`);
					break;
				case "Colombian":
					w.push(`and, in keeping with ${his} heritage, an Indumil ACE 22 assault rifle`);
					break;
				case "Croatian":
					w.push(`and, in keeping with ${his} heritage, an HS Produkt VHS-2 bullpup assault rifle`);
					break;
				case "Cuban":
					w.push(`and, in keeping with ${his} heritage, an AKM assault rifle`);
					break;
				case "Czech":
				case "Slovak":
					w.push(`and, in keeping with ${his} heritage, a CZUB CZ-806 BREN-2 assault rifle`);
					break;
				case "Filipina":
					w.push(`and, in keeping with ${his} heritage, an Elitool M653P carbine`);
					break;
				case "Finnish":
					w.push(`and, in keeping with ${his} heritage, a SAKO Rk 95 TP assault rifle`);
					break;
				case "French":
					w.push(`and, in keeping with ${his} heritage, a Nexter FAMAS G2 bullpup assault rifle`);
					break;
				case "German":
					w.push(`and, in keeping with ${his} heritage, a H&K G36A2 assault rifle`);
					break;
				case "Hungarian":
					w.push(`and, in keeping with ${his} heritage, a FEG AMD-65M assault rifle`);
					break;
				case "Indian":
					w.push(`and, in keeping with ${his} heritage, an OFB MCIWS assault rifle`);
					break;
				case "Indonesian":
					w.push(`and, in keeping with ${his} heritage, a Pindad SS2 assault rifle`);
					break;
				case "Iranian":
					w.push(`and, in keeping with ${his} heritage, a DIO KH-2002 Khaybar bullpup assault rifle`);
					break;
				case "Israeli":
					w.push(`and, in keeping with ${his} heritage, an IWI MTAR-21 bullpup assault rifle`);
					break;
				case "Italian":
					w.push(`and, in keeping with ${his} heritage, a Beretta ARX-160 assault rifle`);
					break;
				case "Japanese":
					w.push(`and, in keeping with ${his} heritage, a Howa Type 89 assault rifle`);
					break;
				case "Korean":
					w.push(`and, in keeping with ${his} heritage, a Daewoo K2C1 assault rifle`);
					break;
				case "Mexican":
					w.push(`and, in keeping with ${his} heritage, a DGIM FX-05 Xiuhcoatl assault rifle`);
					break;
				case "Peruvian":
					w.push(`and, in keeping with ${his} heritage, a SIMA FAD bullpup assault rifle`);
					break;
				case "Polish":
					w.push(`and, in keeping with ${his} heritage, a FB MSBS assault rifle`);
					break;
				case "Romanian":
					w.push(`and, in keeping with ${his} heritage, a ROMARM PA md.86 assault rifle`);
					break;
				case "Russian":
					w.push(`and, in keeping with ${his} heritage, an Izhmash AN-94 Abakan assault rifle`);
					break;
				case "Serbian":
					w.push(`and, in keeping with ${his} heritage, a Zastava M21A assault rifle`);
					break;
				case "South African":
					w.push(`and, in keeping with ${his} heritage, a Vektor R4 assault rifle`);
					break;
				case "Spanish":
					w.push(`and, in keeping with ${his} heritage, a CETME Model C battle rifle`);
					break;
				case "Swedish":
					w.push(`and, in keeping with ${his} heritage, a Bofors Ak-5C assault rifle`);
					break;
				case "Swiss":
					w.push(`and, in keeping with ${his} heritage, a SIG SG 550 assault rifle`);
					break;
				case "Thai":
					w.push(`and, in keeping with ${his} heritage, a MND Type 11 assault rifle`);
					break;
				case "Turkish":
					w.push(`and, in keeping with ${his} heritage, a MKEK MPT-76 assault rifle`);
					break;
				case "Ukrainian":
					w.push(`and, in keeping with ${his} heritage, a Fort-227 assault rifle`);
					break;
				case "Vietnamese":
					w.push(`and, in keeping with ${his} heritage, a Z111 AKM assault rifle`);
					break;
				case "Zimbabwean":
					if (slave.race === "white") {
						w.push(`and, in keeping with ${his} heritage, a FN FAL battle rifle`);
					} else {
						w.push(`and a FN F2000 bullpup assault rifle`);
					}
					break;
				default:
					w.push(`and a FN F2000 bullpup assault rifle`);
			}
			w.push(`slung across ${his} chest.`);
		} else if ((slave.muscles + slave.height - 100) / 25 > 3) {
			w.push(`${He} has a`);
			switch (arcInfo.revivalSociety()) {
				case RevivalSociety.ROMAN: w.push('curved ceramic falcata'); break;
				case RevivalSociety.NEO_IMPERIAL: w.push('straight ceramic estoc'); break;
				case RevivalSociety.EGYPTIAN: w.push('sickle-shaped'); break;
				case RevivalSociety.EDO: w.push('curved ceramic wakizashi'); break;
				case RevivalSociety.ARABIAN: w.push('curved ceramic yatagan'); break;
				case RevivalSociety.CHINESE: w.push('curved ceramic dao'); break;
				case RevivalSociety.AZTEC: w.push('straight ceramic macuahuitl'); break;
				case RevivalSociety.ANTEBELLUM: w.push('curved ceramic saber'); break;
				case null: w.push('straight ceramic'); break;
			}
			w.push(`sword strapped to ${his} back`);
			switch (slave.nationality) {
				case "American":
					w.push(`and, in keeping with ${his} heritage, a KRISS Vector SMG`);
					break;
				case "Argentinian":
					w.push(`and, in keeping with ${his} heritage, a Halcon ML-63 SMG`);
					break;
				case "Armenian":
				case "Belarusian":
				case "Kazakh":
				case "Uzbek":
					w.push(`and, in keeping with ${his} heritage, a Kalashnikov AKS-74U PDW`);
					break;
				case "Austrian":
					w.push(`and, in keeping with ${his} heritage, a Steyr AUG A3 Para XS bullpup SMG`);
					break;
				case "Belgian":
					w.push(`and, in keeping with ${his} heritage, a FN P90 bullpup PDW`);
					break;
				case "Brazilian":
					w.push(`and, in keeping with ${his} heritage, a Taurus MT40 G2 SMG`);
					break;
				case "British":
				case "Scottish":
					w.push(`and, in keeping with ${his} heritage, an L91A1 SMG`);
					break;
				case "Chilean":
					w.push(`and, in keeping with ${his} heritage, a FAMAE SAF-200 SMG`);
					break;
				case "Chinese":
					w.push(`and, in keeping with ${his} heritage, a Norinco QCQ-05 SMG`);
					break;
				case "Croatian":
					w.push(`and, in keeping with ${his} heritage, a PM Agram 2000 SMG`);
					break;
				case "Filipina":
					w.push(`and, in keeping with ${his} heritage, a Ferfrans SCW7 PDW`);
					break;
				case "German":
					w.push(`and, in keeping with ${his} heritage, an H&K MP7A1 PDW`);
					break;
				case "Indian":
					w.push(`and, in keeping with ${his} heritage, an OFB MSMC SMG`);
					break;
				case "Indonesian":
					w.push(`and, in keeping with ${his} heritage, a Pindad PM1A1 SMG`);
					break;
				case "Iranian":
					w.push(`and, in keeping with ${his} heritage, a DIO MPT-9 Tondar SMG`);
					break;
				case "Israeli":
					w.push(`and, in keeping with ${his} heritage, an IWI Uzi SMG`);
					break;
				case "Italian":
					w.push(`and, in keeping with ${his} heritage, a Beretta MX4 SMG`);
					break;
				case "Korean":
					w.push(`and, in keeping with ${his} heritage, a Daewoo K1A PDW`);
					break;
				case "Mexican":
					w.push(`and, in keeping with ${his} heritage, a Mendoza Cobra SMG`);
					break;
				case "Polish":
					w.push(`and, in keeping with ${his} heritage, a FB PM-06 Glauberyt SMG`);
					break;
				case "Romanian":
					w.push(`and, in keeping with ${his} heritage, a UM Cugir LP7 SMG`);
					break;
				case "Russian":
					w.push(`and, in keeping with ${his} heritage, a KBP PP-90M1 SMG`);
					break;
				case "Serbian":
					w.push(`and, in keeping with ${his} heritage, a Zastava Master FLG SMG`);
					break;
				case "South African":
					w.push(`and, in keeping with ${his} heritage, a Milkor BXP SMG`);
					break;
				case "Spanish":
					w.push(`and, in keeping with ${his} heritage, a Star Z84 SMG`);
					break;
				case "Swedish":
					w.push(`and, in keeping with ${his} heritage, a Carl Gustav m/45 SMG`);
					break;
				case "Swiss":
					w.push(`and, in keeping with ${his} heritage, a SIG MPX SMG`);
					break;
				case "Turkish":
					w.push(`and, in keeping with ${his} heritage, a Sarsilmaz SAR 109 SMG`);
					break;
				case "Ukrainian":
					w.push(`and, in keeping with ${his} heritage, a Fort-224 bullpup SMG`);
					break;
				case "Vietnamese":
					w.push(`and, in keeping with ${his} heritage, a Z111 K-50M LMG`);
					break;
				case "Zimbabwean":
					if (slave.race === "white") {
						w.push(`and, in keeping with ${his} heritage, a Sterling Mk.IV SMG`);
					} else {
						w.push(`and a H&K MP5 SMG`);
					}
					break;
				default:
					w.push(`and a H&K MP5 SMG`);
			}
			w.push(`slung across ${his} chest.`);
		} else {
			w.push(`${He} has a short ceramic`);
			switch (arcInfo.revivalSociety()) {
				case RevivalSociety.ROMAN: w.push('pugio'); break;
				case RevivalSociety.NEO_IMPERIAL: w.push('baselard'); break;
				case RevivalSociety.EGYPTIAN: w.push('acinaces'); break;
				case RevivalSociety.EDO: w.push('tanto'); break;
				case RevivalSociety.ARABIAN: w.push('jambiya'); break;
				case RevivalSociety.CHINESE: w.push('nandao'); break;
				case RevivalSociety.AZTEC: w.push('macuahuitl'); break;
				case RevivalSociety.ANTEBELLUM: w.push('Bowie knife'); break;
				case null: w.push(''); break;
			}
			w.push(`sword strapped to ${his} back`);
			switch (slave.nationality) {
				case "American":
					w.push(`and, in keeping with ${his} heritage, a MAC-10 machine pistol`);
					break;
				case "Armenian":
				case "Belarusian":
				case "Cuban":
				case "Kazakh":
				case "Ukrainian":
				case "Uzbek":
					w.push(`and, in keeping with ${his} heritage, a Molot Ordnance Stechkin APS machine pistol`);
					break;
				case "Austrian":
					w.push(`and, in keeping with ${his} heritage, a Steyr TMP machine pistol`);
					break;
				case "Belgian":
					w.push(`and, in keeping with ${his} heritage, a VBR-Belgium PDW machine pistol`);
					break;
				case "Chinese":
					w.push(`and, in keeping with ${his} heritage, a Chongqing Changfeng CF-05 machine pistol`);
					break;
				case "Czech":
				case "Slovak":
					w.push(`and, in keeping with ${his} heritage, a CZUB CZ 75 Automatic machine pistol`);
					break;
				case "German":
					w.push(`and, in keeping with ${his} heritage, a H&K VP70 machine pistol`);
					break;
				case "Hungarian":
					w.push(`and, in keeping with ${his} heritage, a FEG KGP-9 machine pistol`);
					break;
				case "Israeli":
					w.push(`and, in keeping with ${his} heritage, an IWI Uzi Pro machine pistol`);
					break;
				case "Italian":
					w.push(`and, in keeping with ${his} heritage, a Beretta 93R machine pistol`);
					break;
				case "Japanese":
					w.push(`and, in keeping with ${his} heritage, a Minebea PM-9 machine pistol`);
					break;
				case "Mexican":
					w.push(`and, in keeping with ${his} heritage, a Trejo Modelo 2 Especial machine pistol`);
					break;
				case "Peruvian":
					w.push(`and, in keeping with ${his} heritage, a SIMA MGP-87 machine pistol`);
					break;
				case "Polish":
					w.push(`and, in keeping with ${his} heritage, a WITU PMM machine pistol`);
					break;
				case "Romanian":
					w.push(`and, in keeping with ${his} heritage, a UMS Pistolul md.98 Dracula machine pistol`);
					break;
				case "Russian":
					w.push(`and, in keeping with ${his} heritage, a KBP OTs-33 Pernach machine pistol`);
					break;
				case "Swedish":
					w.push(`and, in keeping with ${his} heritage, a Saab Bofors Dynamics CBJ-MS machine pistol`);
					break;
				case "Swiss":
					w.push(`and, in keeping with ${his} heritage, a B+T MP9 machine pistol`);
					break;
				case "Turkish":
					w.push(`and, in keeping with ${his} heritage, a TiSAS Zigana F machine pistol`);
					break;
				default:
					w.push(`and a Glock 18 machine pistol`);
			}
			w.push(`at ${his} side.`);
		}

		return w.join(" ");
	}
};
