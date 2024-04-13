// cSpell:ignore RA-Exmt, Anaph, Relx, Chas

App.UI.SlaveSummaryRenderers = function() {
	const bits = App.UI.SlaveSummaryImpl.bits;
	const helpers = App.UI.SlaveSummaryImpl.helpers;
	const data = App.Data.SlaveSummary;

	const shortRenderers = {
		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 */
		devotion: function(slave, c) {
			const makeSpan = helpers.makeSpan;
			if (slave.fetish === Fetish.MINDBROKEN) {
				makeSpan(c, "MB", "mindbroken");
			} else {
				helpers.makeRatedStyledSpan(c, data.short.mental.devotion, slave.devotion, 100, true);
				helpers.makeStyledSpan(c, App.Ratings.multiNumeric(data.short.mental.trust, [slave.trust + 100, slave.devotion + 100]),
					slave.trust, true);
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 */
		beauty: function(slave, c) {
			const makeSpan = helpers.makeSpan;
			const style1 = ["pink", "strong"];
			const style2 = ["coral", "strong"];
			// Beauty
			makeSpan(c, "B[" + Beauty(slave) + "].", style1);
			// FResult
			makeSpan(c, "FR[" + FResult(slave) + "].", style2);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		rules: function(slave, c) {
			const makeSpan = helpers.makeSpan;
			const styles = "strong";
			switch (slave.rules.living) {
				case "luxurious":
					makeSpan(c, "LS:Lux", styles);
					break;
				case "normal":
					makeSpan(c, "LS:Nor", styles);
					break;
				default:
					makeSpan(c, "LS:Spa", styles);
					break;
			}
			if (canTalk(slave, false)) {
				switch (slave.rules.speech) {
					case "permissive":
						makeSpan(c, "SpR:P", styles);
						break;
					case "accent elimination":
						makeSpan(c, "SpR:NoAcc", styles);
						break;
					case "language lessons":
						makeSpan(c, "SpR:LL", styles);
						break;
					default:
						makeSpan(c, "SpR:R", styles);
						break;
				}
			}
			switch (slave.rules.relationship) {
				case "permissive":
					makeSpan(c, "ReR:P", styles);
					break;
				case "just friends":
					makeSpan(c, "ReR:Fr", styles);
					break;
				default:
					makeSpan(c, "ReR:R", styles);
					break;
			}
			switch (slave.rules.punishment) {
				case "confinement":
					makeSpan(c, "Pun:Conf", styles);
					break;
				case "whipping":
					makeSpan(c, "Pun:Whip", styles);
					break;
				case "chastity":
					makeSpan(c, "Pun:Chas", styles);
					break;
				default:
					makeSpan(c, "Pun:Situ", styles);
					break;
			}
			switch (slave.rules.reward) {
				case "relaxation":
					makeSpan(c, "Rew:Relx", styles);
					break;
				case "drugs":
					makeSpan(c, "Rew:Drug", styles);
					break;
				case "orgasm":
					makeSpan(c, "Rew:Orga", styles);
					break;
				default:
					makeSpan(c, "Rew:Situ", styles);
					break;
			}
			makeSpan(c, "MaR:" + App.Utils.releaseSummaryShort(slave), styles);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		health: function(slave, c) {
			const b = bits.short;
			b.health(slave, c);
			b.illness(slave, c);
			b.tired(slave, c);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		weight: function(slave, c) {
			helpers.makeStyledSpan(c, App.Ratings.multiNumeric(data.short.body.weight,
				[slave.weight + 100, helpers.FSData.policy.HedonisticDecadence.active, slave.hips + 2]), slave.weight, true);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		genitalia: function(slave, c) {
			const makeSpan = helpers.makeSpan;
			if (slave.dick > 0) {
				let dickDesc = slave.balls === 0 ? "Geld" : "";
				const dickBallsDesc = App.Ratings.multiNumeric(data.short.body.genitalia.dickBalls, [slave.dick, slave.balls]);
				if (dickBallsDesc) {
					dickDesc += ` ${dickBallsDesc}`;
				}
				if (dickDesc) {
					helpers.makeSpan(c, dickDesc, "pink");
				}
			}
			if (slave.vagina === 0) {
				makeSpan(c, "VV", "lime");
			} else if ((slave.pregKnown === 1) && canStand(slave) && (App.Data.clothes.get(slave.clothes).exposure >= 3) && (slave.shoes === "none")) {
				makeSpan(c, "NBP", "pink");
			}
			if (slave.anus === 0) {
				makeSpan(c, "AV", "lime");
			}
			const holesDesc = App.Ratings.multiNumeric(data.long.body.genitalia.holes, [slave.vagina, slave.anus]);
			if (holesDesc) {
				makeSpan(c, holesDesc, "pink");
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		diet: function(slave, c) {
			const style = ["teal", "strong"];
			helpers.makeMappedSpan(c, data.short.diet, slave.diet, style);
			helpers.makeMappedSpan(c, data.short.specialDiet, slave.dietCum + 3 * slave.dietMilk, style);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		drugs: function(slave, c) {
			let drugDesc = data.short.drugs[slave.drugs];
			const makeSpan = helpers.makeSpan;
			if (drugDesc) {
				makeSpan(c, "Dr:" + drugDesc, ["tan", "strong"]);
			}
			if (slave.curatives === 2) {
				makeSpan(c, "Cura", ["lightgreen", "strong"]);
			} else if (slave.curatives === 1) {
				makeSpan(c, "Prev", ["lightgreen", "strong"]);
			}
			if (slave.aphrodisiacs !== 0) {
				if (slave.aphrodisiacs === 1) {
					makeSpan(c, "Aph", ["lightblue", "strong"]);
				} else if (slave.aphrodisiacs === 2) {
					makeSpan(c, "Aph++", ["lightblue", "strong"]);
				} else {
					makeSpan(c, "Anaph", ["lightblue", "strong"]);
				}
			}
			if (slave.addict !== 0) {
				makeSpan(c, "Add", "cyan");
			}
			let styles = ["lightsalmon", "strong"];
			if (slave.hormones > 1) {
				makeSpan(c, "Ho:F+", styles);
			} else if (slave.hormones > 0) {
				makeSpan(c, "Ho:F", styles);
			} else if (slave.hormones < -1) {
				makeSpan(c, "Ho:M+", styles);
			} else if (slave.hormones < 0) {
				makeSpan(c, "Ho:M", styles);
			}

			styles = ["mediumseagreen", "strong"];
			if (slave.bellyImplant > -1) {
				makeSpan(c, "Belly Imp", styles);
			} else if (((slave.preg <= -2) || (slave.ovaries === 0)) && (slave.vagina !== -1)) {
				makeSpan(c, "Barr", styles);
			} else if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
				makeSpan(c, "Prepub", styles);
			} else if (slave.ovaryAge >= 47 && slave.preg <= 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
				makeSpan(c, "Meno", styles);
			} else if (slave.pregWeek < 0) {
				makeSpan(c, "Postpartum", styles);
			} else if (slave.preg === -1) {
				makeSpan(c, "CC", styles);
			} else if (slave.preg === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
				makeSpan(c, "Fert+", styles);
			} else if (((slave.preg < slave.pregData.normalBirth / 10) && (slave.preg > 0) && slave.pregKnown === 0) || slave.pregWeek === 1) {
				makeSpan(c, "Preg?", styles);
			} else if ((slave.preg >= 36) && (slave.broodmother > 0)) {
				makeSpan(c, "Perm preg", styles);
			} else if (slave.pregKnown === 1) {
				makeSpan(c, `${slave.pregWeek} wks preg`, styles);
			}
			if (isInduced(slave)) {
				makeSpan(c, "Early Labor", ["orange", "strong"]);
			}
			if (slave.pubertyXY === 0 && slave.balls > 0) {
				makeSpan(c, "Prepub balls", "strong");
			}
			if (slave.balls > 0 && slave.vasectomy === 1) {
				makeSpan(c, "Vasect", "strong");
			}
			styles = ["springgreen", "strong"];
			if (slave.inflation === 3) {
				makeSpan(c, `8 ltr ${slave.inflationType}`, styles);
			} else if (slave.inflation === 2) {
				makeSpan(c, `4 ltr ${slave.inflationType}`, styles);
			} else if (slave.inflation === 1) {
				makeSpan(c, `2 ltr ${slave.inflationType}`, styles);
			} else if (slave.bellyFluid > 0) {
				makeSpan(c, `${slave.bellyFluid}ccs ${slave.inflationType}`, styles);
			}
		},
		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		physicals: function(slave, c) {
			const b = bits.short;
			b.age(slave, c);
			b.face(slave, c);
			b.eyes(slave, c);
			b.ears(slave, c);
			if (slave.markings !== "none") {
				helpers.makeSpan(c, "Markings");
			}
			b.lips(slave, c);
			b.teeth(slave, c);
			b.muscles(slave, c);
			helpers.addText(c, App.Desc.shortLimbs(slave));
			b.voice(slave, c);
			b.tits_ass(slave, c);
			b.hips(slave, c);
			b.waist(slave, c);
			b.implants(slave, c);
			b.lactation(slave, c);
			b.mods(slave, c);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		hormoneBalance: function(slave, c) {
			if (slave.hormoneBalance <= -21) {
				helpers.makeSpan(c, "HB:M", ["deepskyblue", "strong"], false, slave.hormoneBalance);
			} else if (slave.hormoneBalance <= 20) {
				helpers.makeSpan(c, "HB:N", ["pink", "strong"], false, slave.hormoneBalance);
			} else if (slave.hormoneBalance <= 500) {
				helpers.makeSpan(c, "HB:F", ["pink", "strong"], false, slave.hormoneBalance);
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		mental: function(slave, c) {
			const b = bits.short;
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.fetishKnown === 1) {
					b.fetish(slave, c);
				}
				if (slave.attrKnown === 1) {
					b.attraction(slave, c);
				}
			}
			if (slave.piercing.genitals.smart || dildoVibeLevel(slave) > 1 || slave.dickAccessory === "smart bullet vibrator") {
				b.smart_piercing(slave, c);
			}
			b.behavior_flaw(slave, c);
			b.sex_flaw(slave, c);
			b.behavior_quirk(slave, c);
			b.sex_quirk(slave, c);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		skills: function(slave, c) {
			const b = bits.short;
			b.intelligence(slave, c);
			b.skills(slave, c);
			b.prestige(slave, c);
			b.porn_prestige(slave, c);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		race: function(slave, c) {
			const s = data.short.race[slave.race];
			helpers.makeSpan(c, s ? s : helpers.firstThreeUc(slave.race), "tan");
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		nationality: function(slave, c) {
			let tmp = data.short.nationality[slave.nationality];
			if (!tmp && slave.nationality === "Zimbabwean") {
				if (slave.race === "white") {
					tmp = 'Rhodesian.';
				} else {
					tmp = `${slave.nationality}.`;
				}
			}
			helpers.makeSpan(c, tmp ? tmp : slave.nationality.substr(0, 3), "tan");
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		skin: function(slave, c) {
			const s = data.short.skin[slave.skin];
			helpers.makeSpan(c, s ? s : helpers.firstThreeUc(slave.skin));
		},

		clothes: function() { },

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		rulesets: function(slave, c) {
			if (slave.useRulesAssistant === 0) {
				helpers.makeSpan(c, "RA-Exmt", "lightgreen");
			}
		},

		origins: function() { },

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		relations: function(slave, c) {
			const b = bits.short;
			b.family(slave, c);
			b.clone(slave, c);
			b.rival(slave, c);
		}

	};

	const longRenderers = {
		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		devotion: function(slave, c) {
			const makeSpan = helpers.makeSpan;
			if (slave.fetish === Fetish.MINDBROKEN) {
				makeSpan(c, "Mindbroken.", "mindbroken");
			} else {
				helpers.makeRatedStyledSpan(c, data.long.mental.devotion, slave.devotion, 100, true);
				helpers.makeStyledSpan(c, App.Ratings.multiNumeric(data.long.mental.trust, [slave.trust + 100, slave.devotion + 100]),
					slave.trust, true);
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 */
		beauty: function(slave, c) {
			const makeSpan = helpers.makeSpan;
			const style1 = ["pink", "strong"];
			const style2 = ["coral", "strong"];
			// Beauty
			makeSpan(c, "Beauty[" + Beauty(slave) + "].", style1);
			// FResult
			makeSpan(c, "Sex Score[" + FResult(slave) + "].", style2);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		health: function(slave, c) {
			const b = bits.long;
			b.health(slave, c);
			b.illness(slave, c);
			b.tired(slave, c);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		weight: function(slave, c) {
			helpers.makeStyledSpan(c, App.Ratings.multiNumeric(data.long.body.weight,
				[slave.weight + 100, helpers.FSData.policy.HedonisticDecadence.active, slave.hips + 2]), slave.weight, true);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		rules: function(slave, c) {
			const addText = helpers.addText;
			addText(c, `Living standard: ${slave.rules.living}. `);
			if (canTalk(slave, false)) {
				addText(c, `Speech rules: ${slave.rules.speech}. `);
			}
			addText(c, `Relationship rules: ${slave.rules.relationship}. `);
			addText(c, `Typical punishment: ${slave.rules.punishment}. `);
			addText(c, `Typical reward: ${slave.rules.reward}. `);
			addText(c, `Release rules: ${App.Utils.releaseSummaryLong(slave)}. `);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		genitalia: function(slave, c) {
			if (slave.dick > 0) {
				let dickDesc = slave.balls === 0 ? "Gelded." : "";
				const dickBallsDesc = App.Ratings.multiNumeric(data.long.body.genitalia.dickBalls, [slave.dick, slave.balls]);
				if (dickBallsDesc) {
					dickDesc += ` ${dickBallsDesc}`;
				}
				if (dickDesc) {
					helpers.makeSpan(c, dickDesc, "pink");
				}
			}
			if (slave.vagina === 0) {
				helpers.makeSpan(c, "Virgin.", "lime");
			} else if ((slave.pregKnown === 1) && canStand(slave) && (App.Data.clothes.get(slave.clothes).exposure >= 4) && (slave.shoes === "none")) {
				helpers.makeSpan(c, "Naked, barefoot, and pregnant.", "pink");
			}
			if (slave.anus === 0) {
				helpers.makeSpan(c, "Anal virgin.", "lime");
			}
			const holesDesc = App.Ratings.multiNumeric(data.long.body.genitalia.holes, [slave.vagina, slave.anus]);
			if (holesDesc) {
				helpers.makeSpan(c, holesDesc, "pink");
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		diet: function(slave, c) {
			helpers.makeMappedSpan(c, data.long.diet, slave.diet, "teal");
			const sd = data.long.specialDiet[slave.dietCum + 3 * slave.dietMilk];
			if (sd) {
				helpers.addText(c, "Diet base: ");
				helpers.makeSpan(c, sd, "cyan");
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		drugs: function(slave, c) {
			const makeSpan = helpers.makeSpan;
			let swd = WombGetLittersData(slave);
			if (slave.drugs !== "no drugs") {
				makeSpan(c, `On ${slave.drugs}.`, "tan");
			}
			if (slave.curatives === 2) {
				makeSpan(c, "On curatives.", "lightgreen");
			} else if (slave.curatives === 1) {
				makeSpan(c, "On preventatives.", "lightgreen");
			}
			if (slave.aphrodisiacs > 0) {
				makeSpan(c, `On ${slave.aphrodisiacs > 1 ? 'extreme' : ''} aphrodisiacs.`, "lightblue");
			} else if (slave.aphrodisiacs === -1) {
				makeSpan(c, "On anaphrodisiacs.", "lightblue");
			}
			if (slave.addict !== 0) {
				makeSpan(c, "Addict.", "cyan");
			}
			if (slave.hormones > 1) {
				makeSpan(c, "Heavy female hormones.", "lightsalmon");
			} else if (slave.hormones > 0) {
				makeSpan(c, "Female hormones.", "lightsalmon");
			} else if (slave.hormones < -1) {
				makeSpan(c, "Heavy male hormones.", "lightsalmon");
			} else if (slave.hormones < 0) {
				makeSpan(c, "Male hormones.", "lightsalmon");
			}
			let styles = "mediumseagreen";
			if (slave.bellyImplant > -1) {
				makeSpan(c, "Belly Implant.", styles);
			} else if ((slave.preg <= -2) && (slave.ovaries === 1 || slave.mpreg === 1)) {
				makeSpan(c, "Barren.", styles);
			} else if ((slave.ovaries === 0 && slave.mpreg === 0) && (slave.vagina !== -1) && (slave.genes === "XX")) {
				makeSpan(c, "Barren.", styles);
			} else if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
				makeSpan(c, "Not ovulating yet.", styles);
			} else if (slave.ovaryAge >= 47 && slave.preg <= 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
				makeSpan(c, "Menopausal.", styles);
			} else if (slave.pregWeek < 0) {
				makeSpan(c, "Postpartum.", styles);
				if (slave.preg === -1) {
					makeSpan(c, "On contraceptives.", styles);
				}
			} else if (slave.preg === -1) {
				makeSpan(c, "On contraceptives.", styles);
			} else if (slave.preg === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
				makeSpan(c, "Fertile.", styles);
			} else if ((slave.preg >= 36) && (slave.broodmother > 0)) {
				makeSpan(c, "Permanently pregnant.", styles);
			} else if (swd.litters.length > 1) {
				let pregTxt = `Concurrent pregnancies: (${swd.litters.length} sets).`;
				pregTxt += ` Max:${swd.litters[0]} / Min:${swd.litters[swd.litters.length - 1]} week(s).`;
				makeSpan(c, pregTxt, "lime");
			} else if (((slave.preg < slave.pregData.normalBirth / 10) && (slave.preg > 0) && slave.pregKnown === 0) || slave.pregWeek === 1) {
				makeSpan(c, "May be pregnant.");
			} else if (slave.pregKnown === 1) {
				if (slave.pregType < 2 || slave.broodmother > 0) {
					makeSpan(c, `${Math.trunc(slave.pregWeek)} weeks pregnant.`);
				} else {
					let desc = `${Math.trunc(slave.pregWeek)} weeks pregnant with `;
					if (slave.pregType >= 40) {
						desc += `a tremendous brood of offspring.`;
					} else if (slave.pregType >= 20) {
						desc += `a brood of offspring.`;
					} else if (slave.pregType >= 10) {
						desc += `${slave.pregType} babies.`;
					} else if (slave.pregType === 9) {
						desc += `nonuplets.`;
					} else if (slave.pregType === 8) {
						desc += `octuplets.`;
					} else if (slave.pregType === 7) {
						desc += `septuplets.`;
					} else if (slave.pregType === 6) {
						desc += `sextuplets.`;
					} else if (slave.pregType === 5) {
						desc += `quintuplets.`;
					} else if (slave.pregType === 4) {
						desc += `quadruplets.`;
					} else if (slave.pregType === 3) {
						desc += `triplets.`;
					} else {
						desc += `twins.`;
					}
					makeSpan(c, desc);
				}
				if (slave.preg > slave.pregData.normalBirth && slave.broodmother === 0) {
					makeSpan(c, "(Overdue.)");
				}
			}
			if (isInduced(slave)) {
				makeSpan(c, "Showing signs of early labor.", "orange");
			}
			if (slave.pubertyXY === 0 && slave.balls > 0) {
				makeSpan(c, "Has not had first ejaculation.", styles);
			}
			if (slave.balls > 0 && slave.vasectomy === 1) {
				makeSpan(c, "Vasectomy.");
			}
			if (slave.inflation === 3) {
				makeSpan(c, `Filled with 8 liters of ${slave.inflationType}.`, "springgreen");
			} else if (slave.inflation === 2) {
				makeSpan(c, `Filled with 4 liters of ${slave.inflationType}.`, "springgreen");
			} else if (slave.inflation === 1) {
				makeSpan(c, `Filled with 2 liters of ${slave.inflationType}.`, "springgreen");
			} else if (slave.bellyFluid > 0) {
				makeSpan(c, `Stuffed with ${slave.bellyFluid}ccs of ${slave.inflationType}.`, "springgreen");
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		physicals: function(slave, c) {
			const b = bits.long;
			b.age(slave, c);
			b.face(slave, c);
			b.eyes(slave, c);
			b.ears(slave, c);
			b.lips(slave, c);
			b.teeth(slave, c);
			b.muscles(slave, c);
			helpers.makeSpan(c, App.Desc.longLimbs(slave));
			b.voice(slave, c);
			b.tits_ass(slave, c);
			b.hips(slave, c);
			b.waist(slave, c);
			b.implants(slave, c);
			b.lactation(slave, c);
			b.milkflavor(slave, c);
			b.mods(slave, c);
			const brands = App.Medicine.Modification.brandRecord(slave);
			if (!jQuery.isEmptyObject(brands)) {
				helpers.makeSpan(c, 'Branded.');
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		hormoneBalance: function(slave, c) {
			const colorClass = slave.hormoneBalance <= -21 ? "deepskyblue" : "pink";
			const desc = App.Ratings.numeric(data.long.hormoneBalance, slave.hormoneBalance + 500);
			helpers.makeSpan(c, desc + " hormone balance", colorClass, true, slave.hormoneBalance);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		skills: function(slave, c) {
			const b = bits.long;
			b.intelligence(slave, c);
			b.skills(slave, c);
			b.prestige(slave, c);
			b.porn_prestige(slave, c);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		clothes: function(slave, c) {
			const b = bits.long;
			const dressingBlock = helpers.makeBlock(c);
			if (slave.choosesOwnClothes === 1) {
				helpers.makeSpan(dressingBlock, `Dressing ${getPronouns(slave).himself}.`);
			}
			b.clothes(slave, dressingBlock);
			b.collar(slave, dressingBlock);
			b.mask(slave, dressingBlock);
			b.mouth(slave, dressingBlock);
			b.belly(slave, dressingBlock);
			if (hasAnyArms(slave)) {
				b.arms(slave, dressingBlock);
			}
			if (hasAnyLegs(slave)) {
				b.legs(slave, dressingBlock);
				b.shoes(slave, dressingBlock);
			}
			b.chastity(slave, dressingBlock);
			b.vaginal_acc(slave, dressingBlock);
			b.dick_acc(slave, dressingBlock);
			b.buttplug(slave, dressingBlock);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		mental: function(slave, c) {
			const b = bits.long;
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.fetishKnown === 1) {
					b.fetish(slave, c);
				}
				if (slave.attrKnown === 1) {
					b.attraction(slave, c);
				}
			}
			if (slave.piercing.genitals.smart || dildoVibeLevel(slave) > 1 || slave.dickAccessory === "smart bullet vibrator") {
				b.smart_piercing(slave, c);
			}
			b.behavior_flaw(slave, c);
			b.sex_flaw(slave, c);
			b.behavior_quirk(slave, c);
			b.sex_quirk(slave, c);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		race: function(slave, c) {
			const raceStr = App.Data.misc.filterRaces.get(slave.race) || capFirstChar(slave.race);
			helpers.makeSpan(c, raceStr + '.', "tan");
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		nationality: function(slave, c) {
			function descStr(slave) {
				switch (slave.nationality) {
					case "a Cook Islander":
						return `Cook Islander.`;
					case "a Liechtensteiner":
						return `Liechtensteiner.`;
					case "a New Zealander":
						return `New Zealander.`;
					case "a Solomon Islander":
						return `Solomon Islander.`;
					case "Zimbabwean":
						if (slave.race === "white") {
							return `Rhodesian.`;
						} else {
							return `${slave.nationality}.`;
						}
					case "slave":
					case "none":
					case "":
					case "Stateless":
						return `Stateless.`;
					default:
						return `${slave.nationality}.`;
				}
			}

			helpers.makeSpan(c, descStr(slave), "tan");
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		skin: function(slave, c) {
			helpers.makeSpan(c, `${capFirstChar(slave.skin)} skin.`);
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {HTMLElement} c
		 * @returns {void}
		 */
		rulesets: function(slave, c) {
			if (slave.useRulesAssistant === 0) {
				helpers.makeSpan(c, "RA-Exempt", "lightgreen");
			} else if ((slave.currentRules !== undefined) && (slave.currentRules.length > 0)) {
				c.innerHTML = `Rules: ${V.defaultRules.filter(x => ruleApplied(slave, x)).map(x => x.name).join(", ")}`;
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		origins: function(slave, c) {
			if (slave.origin !== "") {
				const para = helpers.makeParagraph(c);
				para.classList.add("gray");
				para.textContent = pronounsForSlaveProp(slave, slave.origin);
			}
		},

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		relations: function(slave, c) {
			const b = bits.long;
			b.family(slave, c);
			b.clone(slave, c);
			b.rival(slave, c);
		}
	};

	return {
		short: shortRenderers,
		long: longRenderers,
		empty: function() {}
	};
}();

App.UI.SlaveSummary = function() {
	const emptyRenderer = (/** @type {App.Entity.SlaveState} */ slave, /** @type {Node} */ c) => { };
	const delegates = {
		clothes: emptyRenderer,
		devotion: emptyRenderer,
		beauty: emptyRenderer,
		rules: emptyRenderer,
		height: emptyRenderer,
		diet: emptyRenderer,
		health: emptyRenderer,
		drugs: emptyRenderer,
		race: emptyRenderer,
		nationality: emptyRenderer,
		genitalia: emptyRenderer,
		physicals: emptyRenderer,
		hormoneBalance: emptyRenderer,
		skills: emptyRenderer,
		mental: emptyRenderer,
		weight: emptyRenderer,
		skin: emptyRenderer,
		origins: emptyRenderer,
		rulesets: emptyRenderer,
		relations: emptyRenderer
	};

	/**
	 * @returns {FC.UI.SlaveSummary.State}
	 */
	function makeNewState() {
		return {
			abbreviation: {
				clothes: 2,
				devotion: 2,
				beauty: 2,
				diet: 2,
				drugs: 2,
				genitalia: 2,
				health: 2,
				hormoneBalance: 2,
				mental: 2,
				nationality: 2,
				origins: 2,
				physicals: 2,
				race: 2,
				rules: 2,
				rulesets: 2,
				skills: 2,
			}
		};
	}

	function delegateForSetting(name, setting) {
		switch (setting) {
			case 0:
				return App.UI.SlaveSummaryRenderers.empty;
			case 1:
				return App.UI.SlaveSummaryRenderers.short[name];
			case 2:
				return App.UI.SlaveSummaryRenderers.long[name];
		}
	}

	function initDelegates(settingsObj) {
		try {
			settingsObj = settingsObj || V.UI.slaveSummary;
			/** @type {FC.UI.SlaveSummary.AbbreviationState} */
			const abbrSettings = settingsObj.abbreviation;
			for (const setting in abbrSettings) {
				delegates[setting] = delegateForSetting(setting, abbrSettings[setting]);
			}
			delegates.weight = delegateForSetting("weight", abbrSettings.diet);
			delegates.skin = delegateForSetting("skin", abbrSettings.physicals);
			delegates.relations = delegateForSetting("relations", abbrSettings.mental);
			// special settings
			if (!V.seeRace) {
				delegates.race = emptyRenderer;
			}
		} catch (ex) {
			console.error(ex);
		}
	}

	function settingsChanged(newState = V) {
		if (!V.UI) {
			// When loading "Alpha Disclaimer" the state is not initialized yet.
			return;
		}
		try {
			const newStateIsOK = newState && newState.hasOwnProperty("UI") && newState.UI.hasOwnProperty("slaveSummary");
			const settingsObj = newStateIsOK ? newState.UI.slaveSummary : V.UI.slaveSummary;

			initDelegates(settingsObj);
			App.UI.SlaveSummaryImpl.helpers.syncFSData(newState.arcologies[0]);
			App.Art.setDynamicCSS(newState);
		} catch (ex) {
			console.log(`Slave summary settings change handler encountered an error: ${ex}`);
		}
	}

	function societyChanged(arcology) {
		App.UI.SlaveSummaryImpl.helpers.syncFSData(arcology);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {DocumentFragment}
	 */
	function render(slave) {
		/** @type {FC.UI.SlaveSummary.AbbreviationState} */
		const abbrSettings = V.UI.slaveSummary.abbreviation;
		const helpers = App.UI.SlaveSummaryImpl.helpers;

		const res = document.createDocumentFragment();
		let para = helpers.makeParagraph(res);

		delegates.devotion(slave, para);
		delegates.beauty(slave, para);
		if (!slave.fuckdoll) {
			delegates.rules(slave, para);
		}
		delegates.weight(slave, para);
		delegates.diet(slave, para);
		delegates.health(slave, para);
		delegates.drugs(slave, para);

		para = helpers.makeParagraph(res);
		helpers.makeSpan(para, `${capFirstChar(SlaveTitle(slave))}${abbrSettings.physicals === 2 ? '.' : ''}`, ["coral", "strong"]);
		delegates.race(slave, para);
		delegates.nationality(slave, para);
		delegates.skin(slave, para);
		delegates.genitalia(slave, para);
		delegates.physicals(slave, para);
		delegates.hormoneBalance(slave, para);

		para = helpers.makeParagraph(res);
		delegates.skills(slave, para);
		delegates.mental(slave, para);
		if (slave.custom.label) {
			helpers.makeSpan(res, `${capFirstChar(slave.custom.label)}.`, ["custom-label"]);
		}
		if ((slave.relationship !== 0) || (totalRelatives(slave) > 0) || (abbrSettings.clothes === 2) || (abbrSettings.rulesets === 2)) {
			para = helpers.makeParagraph(res);
		}
		delegates.relations(slave, para);
		if (!slave.fuckdoll) {
			delegates.clothes(slave, para);
		}
		const RABlock = helpers.makeBlock(para);
		delegates.rulesets(slave, RABlock);
		delegates.origins(slave, res);
		return res;
	}

	/**
	 * @param {InstanceType<App.UI.OptionsGroup>} optionsGroup
	 */
	function addOptions(optionsGroup) {
		// SAH is "Summarized, Abbreviated, Hidden"
		const SAHOptions = {
			"Summarized": 2,
			"Abbreviated": 1,
			"Hidden": 0
		};

		function appendOption(name, desc, options) {
			const option = optionsGroup.addOption(desc, name, V.UI.slaveSummary.abbreviation);
			for (const key in options) {
				option.addValue(key, options[key], initDelegates);
			}
		}

		function appendSAHOption(name, desc) {
			appendOption(name, desc, SAHOptions);
		}

		appendSAHOption("devotion", "Mental stats are");
		appendSAHOption("beauty", "Beauty and sex score stats are");
		appendSAHOption("mental", "Mental attributes are");
		appendSAHOption("rules", "Rules are");
		appendSAHOption("health", "Health is");
		appendSAHOption("diet", "Diet and weight are");
		appendSAHOption("drugs", "Drugs and addiction are");
		appendSAHOption("hormoneBalance", "Hormone balance is");
		appendSAHOption("genitalia", "Genitalia are");
		appendSAHOption("physicals", "Physical traits are");
		appendSAHOption("skills", "Skills are");
		appendSAHOption("nationality", "Nationality is");
		appendSAHOption("race", "Race is");
		appendOption("rulesets", "Rules Assistant rulesets are", {
			"Summarized": 2,
			"Abbreviated": 1
		});
		appendOption("clothes", "Clothes are", {
			"Summarized": 2,
			"Hidden": 0
		});
		appendOption("origins", "Origins are", {
			"Summarized": 2,
			"Hidden": 0
		});
	}

	return {
		makeNewState: makeNewState,
		settingsChanged: settingsChanged,
		societyChanged: societyChanged,
		render: render,
		addOptions: addOptions
	};
}();
