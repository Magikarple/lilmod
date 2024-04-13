/**
 * @param {FC.GingeredSlave} slave
 * @param {FC.Desc.LongSlaveOptions} params
 * @returns {DocumentFragment}
 */
App.Desc.longSlave = function(slave, {descType, market = 0, marketText, noArt, links} = {}) {
	const {
		He, His, him, he, his
	} = getPronouns(slave);
	let el = new DocumentFragment();
	let span;
	let r = new SpacedTextAccumulator();
	SlaveStatClamp(slave);

	descType = descType || (market ? DescType.MARKET : DescType.NORMAL);

	if (!noArt) {
		if (!V.seeCustomImagesOnly || V.seeCustomImagesOnly && slave.custom.image && slave.custom.image.filename !== "") {
			App.Events.drawEventArt(el, slave);
		}
	}


	// Name
	r.push(App.UI.DOM.makeElement("span", `${SlaveFullName(slave)}`, ["slave", "name", "simple"]));

	// Label
	if (slave.custom.label) {
		r.push(App.UI.DOM.combineNodes("(",
			App.UI.DOM.makeElement('span', slave.custom.label, "custom-label"),
			")"));
	}

	if (market && market !== "starting") {
		if (applyLawCheck(market)) {
			r.push(`has passed inspection to be sold in your arcology.`);
		} else {
			r.push(`is for sale and is available to inspect.`);
		}
		if (marketText) {
			r.push(marketText);
		}
		r.push(reportGingering(slave));
		r.toParagraph();

		r.push(App.UI.DOM.makeElement("span", `${slave.slaveName}`, "name"));
	}

	r.push(`is`);
	// Devotion
	span = document.createElement('span');

	if (slave.devotion < -95) {
		r.push("a");
		span.className = "devotion hateful";
		span.textContent = "hate-filled,";
	} else if (slave.devotion < -50) {
		r.push("a");
		span.className = "devotion hateful";
		span.textContent = "hateful,";
	} else if (slave.devotion < -20) {
		r.push("a");
		span.className = "devotion resistant";
		span.textContent = "reluctant,";
	} else if (slave.devotion <= 20) {
		r.push("a");
		span.className = "devotion ambivalent";
		span.textContent = "hesitant,";
	} else if (slave.devotion <= 50) {
		r.push("an");
		span.className = "devotion accept";
		span.textContent = "accepting,";
	} else if (slave.devotion <= 95) {
		r.push("a");
		span.className = "devotion devoted";
		span.textContent = "devoted,";
	} else {
		r.push("a");
		span.className = "devotion worship";
		span.textContent = "worshipful,";
	}
	r.push(span);

	// Trust
	span = document.createElement('span');
	if (slave.trust < -95) {
		span.className = "trust terrified";
		span.textContent = "abjectly terrified";
	} else if (slave.trust < -50) {
		span.className = "trust terrified";
		span.textContent = "terrified";
	} else if (slave.trust < -20) {
		span.className = "trust frightened";
		span.textContent = "frightened";
	} else if (slave.trust < 20) {
		span.className = "trust fearful";
		span.textContent = "fearful";
	} else if (slave.trust <= 50) {
		if (slave.devotion < -20) {
			span.className = "defiant careful";
			span.textContent = "careful";
		} else {
			span.className = "trust careful";
			span.textContent = "careful";
		}
	} else if (slave.trust < 95) {
		if (slave.devotion < -20) {
			span.className = "defiant bold";
			span.textContent = "bold";
		} else {
			span.className = "trust trusting";
			span.textContent = "trusting";
		}
	} else {
		if (slave.devotion < -20) {
			span.className = "defiant full";
			span.textContent = "defiant";
		} else {
			span.className = "trust prof-trusting";
			span.textContent = "profoundly trusting";
		}
	}
	r.push(span);

	// Slave's Title, ex:"pregnant big bottomed busty milky hourglass broodmother"
	r.push(App.UI.DOM.makeElement("span", `${SlaveTitle(slave)}.`, ["si-slave-title"]));

	// ID
	if (V.debugMode || V.cheatMode) {
		r.push(`${His} ID is ${slave.ID}.`);
	}
	// Slave array index
	if (V.debugMode) {
		if (descType !== DescType.MARKET) {
			r.push(`${His} index in the slave array is currently ${getSlaveIndex(slave.ID)}.`);
		}
	}

	// Indenture
	if (slave.indenture > -1) {
		r.push(`${His}`);
		if (slave.indentureRestrictions > 1) {
			r.push(`restrictive`);
		} else if (slave.indentureRestrictions > 0) {
			r.push(`protective`);
		} else {
			r.push(`unrestricted`);
		}
		r.push(`indenture`);
		if (slave.indenture > 1) {
			r.push(`has ${slave.indenture} weeks left to run.`);
		} else if (slave.indenture > 0) {
			r.push(`expires next week.`);
		} else {
			r.push(`expires this week.`);
		}
	}

	r.push(...App.Desc.sceneIntro(slave, descType, links));
	r.push(App.Desc.name(slave));
	r.push(App.Desc.ageAndHealth(slave));

	const clinicNameCaps = capFirstChar(V.clinicName);
	if (descType !== DescType.MARKET) {
		if (V.clinic !== 0 && V.clinicUpgradeScanner === 1) {
			if (slave.chem > 15) {
				r.push(`${clinicNameCaps}'s scanners score long term carcinogenic buildup in ${his} body at`,
					App.UI.DOM.makeElement("span", `${Math.ceil(slave.chem / 10)}.`, "cyan"));
			} else {
				r.push(`${clinicNameCaps}'s scanners confirm that ${he} has good prospects for long term health.`);
			}
		}

		r.push(App.Desc.geneticQuirkAssessment(slave));
	}

	r.push(App.Desc.mind(slave, descType));

	if (descType === DescType.NORMAL) {
		if (canSee(slave)) {
			if (slave.attrKnown === 1) {
				if ((slave.assignment !== Job.DAIRY) || (V.dairyRestraintsSetting > 1)) {
					if ((slave.attrXX > 85) && (V.PC.boobs >= 400)) {
						r.push(`${His} attraction to women is obvious: ${he} can't seem to stop staring at your breasts.`);
					} else if ((slave.attrXY > 85) && (V.PC.dick !== 0)) {
						r.push(`${His} attraction to men is obvious: ${he} can't seem to stop glancing down at your package.`);
					} else if ((slave.attrXY > 85) && V.PC.title === 1 && (V.PC.boobs < 300)) {
						r.push(`${His} attraction to men is obvious: ${he} can't seem to stop checking out your broad chest.`);
					}
				}
			}
		}
	}

	r.push(App.Desc.family(slave, links));

	r.push(...App.Desc.relationRival(slave, links));

	if (slave.bodySwap > 0) {
		if (slave.origBodyOwner !== "") {
			r.push(`${He} currently possesses ${slave.origBodyOwner}'s body.`);
		}
		if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0 && slave.origBodyOwnerID > 0) {
			const owner = getSlave(slave.origBodyOwnerID);
			if (owner !== undefined) {
				r.push(`${He} is fully aware that`,
					links ? App.UI.DOM.referenceSlaveWithPreview(owner, SlaveFullName(owner)) : SlaveFullName(owner), `
					is in ${his} old body.`);
			}
		}
	}

	r.toParagraph();

	if (descType !== DescType.MARKET || market === "starting" || market === "special") {
		let origin = slave.origin;
		if (origin === "$auto") {
			origin = App.StartingGirls.playerOrigin(slave).preview;
		}
		if (origin !== "") {
			r.push(pronounsForSlaveProp(slave, origin));
		}
	}

	r.push(App.Desc.career(slave));

	r.push(App.Desc.prestige(slave));

	r.push(App.Desc.skills(slave));

	if (slave.custom.desc !== "" && slave.custom.desc) {
		r.push(pronounsForSlaveProp(slave, slave.custom.desc));
	}

	if (V.arcologies[0].FSGenderFundamentalistLawBeauty + V.arcologies[0].FSGenderRadicalistLawBeauty > 0) {
		if (genderLawPass(slave) === 1) {
			r.push(`${His} body is a perfect example of the fashionable feminine ideal.`);
		}
	} else if (V.arcologies[0].FSSlimnessEnthusiastLaw === 1) {
		if (slimLawPass(slave) === 1) {
			r.push(`${His} body is a perfect example of the fashionable ideal flat body.`);
		}
	} else if (V.arcologies[0].FSHedonisticDecadenceLaw2 === 1) {
		if (slave.boobs >= 2000 && slave.butt >= 5 && slave.weight > 95) {
			r.push(`${His} body is a perfect example of the fashionable plump body.`);
		}
	}

	if (V.arcologies[0].FSRestartSMR > 0 && V.arcologies[0].FSRestart > 80 && (slave.dick === 0) && (slave.balls === 0) && (slave.ovaries === 0) && (slave.mpreg === 0) && (slave.vagina < 0)) {
		r.push(`${His} body is a perfect example of a subhuman who has accepted ${his} place in society.`);
	}

	if (V.arcologies[0].FSIntellectualDependencyLawBeauty === 1) {
		r.push(`${He} currently is graded`);
		switch (Math.clamp(bimboScore(slave), 0, 6)) {
			case 6:
				r.push(`an S-class`);
				break;
			case 5:
				r.push(`an A-class`);
				break;
			case 4:
				r.push(`a B-class`);
				break;
			case 3:
				r.push(`a C-class`);
				break;
			case 2:
				r.push(`a D-class`);
				break;
			case 1:
				r.push(`an E-class`);
				break;
			default:
				r.push(`an F-class`);
		}
		r.push(`bimbo by societal trends.`);
	}

	/* Needs contemplation. Slightly redundant with descriptionsWidgets.
	if(slave.visualAge === V.idealAge) {
		if(slave.actualAge === V.idealAge) {
			r.push(`${He} is ${slave.actualAge},`);
		} else {
			r.push(`${He} appears to be ${slave.visualAge},`);
		}
		if(V.idealAge === 18) {
			r.push(`and many still find this age especially attractive due to old world tradition.`);
		} else {
			r.push(`and many in the arcology find this age especially attractive.`);
		}
	} else if (slave.visualAge !== slave.actualAge && slave.visualAge === V.idealAge - 1) {
		r.push(`${He} appears to be ${slave.visualAge}, which is nearly the ideal, but as ${he} is actually ${slave.actualAge}, this can sometimes be cause for confusion regarding the appropriate level of enthusiasm society should have for ${him}.`);
	} else if(slave.visualAge === V.idealAge - 1) {
		if(slave.actualAge === V.idealAge - 1) {
			r.push(`${He} is ${slave.actualAge},`);
		} else {
			r.push(`${He} appears to be ${slave.visualAge},`);
		}
		if(V.idealAge === 18) {
			r.push(`and many are already looking forward to ${his} birthday with great anticipation due to old world tradition.`);
		} else {
			r.push(`and many in the arcology are already looking forward to ${his} birthday with great anticipation.`);
		}
	} else if(slave.actualAge === V.idealAge && slave.visualAge !== V.idealAge) {
		r.push(`${He} is ${slave.actualAge}, a fact that many in the arcology find appealing`);
		if(V.idealAge === 18) {
			r.push(`because of old world tradition,`);
		}
		r.push(`but due to ${his} appearing to be ${slave.visualAge}, there is less enthusiasm for ${him} than there might otherwise be.`);
	}
	*/

	if (V.showScores !== 0) {
		r.push(`Currently, ${he} has an`);

		// Beauty
		r.push(App.UI.DOM.makeElement("span", `attractiveness score`, ["pink", "bold"]));
		r.push(App.UI.DOM.makeElement("span", `of`, ["pink"]));
		r.push(BeautyTooltip(slave), `and a`);

		// FResult
		r.push(App.UI.DOM.makeElement("span", `sexual score`, ["lightcoral", "bold"]));
		r.push(App.UI.DOM.makeElement("span", `of`, ["lightcoral"]));
		r.push(App.UI.DOM.combineNodes(FResultTooltip(slave), App.UI.DOM.makeElement("span", `.`, ["lightcoral"])));

		if (slave.assignment === Job.BODYGUARD || V.cheatMode || V.debugMode) {
			r.push(`${His} deadliness is`, App.UI.DOM.combineNodes(DeadlinessTooltip(slave), "."));
		}
	}

	r.toParagraph();

	r.push(App.Desc.limbs(slave));

	if (V.showClothing === 1 && descType !== DescType.MARKET) {
		r.push(App.Desc.clothing(slave));
		r.push(App.Desc.armwear(slave));

		if (V.showBodyMods === 1) {
			r.push(App.Desc.clothingCorset(slave));
		}

		r.push(`${He}`);
	} else {
		r.push(`${slave.slaveName}`);
	}

	r.push(App.Desc.dimensions(slave));
	r.push(App.Desc.bodyguard(slave));

	if ((slave.counter.pitWins + slave.counter.pitLosses) > 0) {
		const wins = slave.counter.pitWins;
		const losses = slave.counter.pitLosses;

		r.push(`${He} has participated in ${numberWithPluralOne(wins + losses, "pit fight")},`);
		if (wins > 0) {
			if (losses > 0) {
				r.push(`with ${numberWithPluralOne(wins, "win")} and ${numberWithPluralOne(losses, "loss", "losses")}.`);
			} else {
				if (wins > 2) {
					r.push(`all of`);
				} else if (wins > 1) {
					r.push(`both of`);
				} // omit for wins === 1
				r.push(`which ${he} won.`);
			}
		} else {
			if (losses > 2) {
				r.push(`all of`);
			} else if (losses > 1) {
				r.push(`both of`);
			} // omit for losses === 1
			r.push(`which ${he} lost.`);
		}
	}

	if (slave.counter.pitKills > 0) {
		r.push(`${slave.counter.pitKills} slaves have died by ${his} hand in pit fights.`);
	}

	r.push(App.Desc.piercing(slave, "corset"));
	r.push(App.Desc.pregnancy(slave, descType));
	r.push(App.Desc.legs(slave));
	r.push(App.Desc.mods(slave, "thigh"));
	r.push(App.Desc.mods(slave, "calf"));
	r.push(App.Desc.mods(slave, "ankle"));
	r.push(App.Desc.mods(slave, "foot"));
	r.push(App.Desc.heels(slave, descType));
	r.push(App.Desc.skin(slave, descType));

	if (descType !== DescType.MARKET || market === "starting") {
		r.push(App.Desc.accent(slave));
	}

	let scarCounter = 0;
	const scars = App.Medicine.Modification.scarRecord(slave);
	for (let scarName in scars) {
		if (slave.ID === V.BodyguardID && scarCounter > 1) {
			r.push(`${His} scars make ${him} look even more menacing than ${he} actually is.`);
			break;
		} else if ((slave.ID === V.BodyguardID) && scars[scarName].menacing > 0) {
			r.push(`${His} menacing scar makes ${him} look terrifying.`);
			break;
		} else if ((slave.ID === V.WardenessID) && scarCounter > 1) {
			r.push(`${His} scars make ${him} look like ${he}'s in the right place.`);
			break;
		}
		scarCounter++;
	}

	if (slave.fuckdoll === 0) {
		if (slave.markings === "birthmark" && slave.prestige === 0 && slave.porn.prestige < 2) {
			const birthmarkSpan = App.UI.DOM.makeElement("span", `large, liver-colored birthmark,`);
			birthmarkSpan.classList.add("red");
			r.push(`${He} has a`, birthmarkSpan, `detracting from ${his} beauty.`);
		}
		if (slave.skin === "sun tanned") {
			if ((slave.rules.release.slaves === 1) || App.Utils.hasFamilySex(slave)) {
				if (slave.fetishStrength > 60 && slave.fetishKnown === 1) {
					r.push(`${His} tan is slightly uneven, since ${he} enjoys`);
					if (slave.fetish === "buttslut") {
						r.push(`letting other tanned slaves share a tanning bed with ${him} so they can sodomize ${him} while ${he} tans.`);
					} else if (slave.fetish === "cumslut") {
						r.push(`letting other tanned slaves share a tanning bed with ${him} so they get oral from ${him} while ${he} tans.`);
					} else if (slave.fetish === "sadist") {
						r.push(`forcing inferior slaves into the tanning beds with ${him} so ${he} can sodomize them while ${he} tans.`);
					} else if (slave.fetish === "dom") {
						r.push(`bringing other slaves into the tanning beds with ${him} so ${he} can fuck them while ${he} tans.`);
					} else if ((slave.fetish === "masochist") || (slave.fetish === Fetish.SUBMISSIVE)) {
						r.push(`letting other slaves into the tanning beds with ${him} so they can fuck ${him} while ${he} tans.`);
					} else if (slave.fetish === "boobs") {
						r.push(`bringing other slaves into the tanning beds with ${him} so ${he} can tittyfuck them while ${he} tans.`);
					} else if ((slave.fetish === "pregnancy") && (jsRandom(0, 99) < V.seeDicks)) {
						r.push(`letting slaves with dicks into the tanning beds with ${him} so they can cum inside ${him} while ${he} tans.`);
					} else {
						r.push(`bringing other slaves into the tanning beds with ${him} to have sex while ${he} tans.`);
					}
				}
			}
		}

		// Describe any brands that are not directly addressed elsewhere in longSlave
		r.push(App.Desc.mods(slave, "extra"));
	}

	if (V.showClothing === 1 && descType !== DescType.MARKET) {
		r.push(App.Desc.ears(slave));
		r.push(App.Desc.upperFace(slave));
		r.push(App.Desc.hair(slave));
	} else {
		r.push(`${His} hair is`);
		if (slave.hColor !== slave.eyebrowHColor) {
			r.push(`${slave.hColor}, with ${slave.eyebrowHColor} eyebrows.`);
		} else {
			r.push(`${slave.hColor}.`);
		}
	}

	if (slave.fuckdoll === 0) {
		if (App.Data.misc.redheadColors.includes(slave.hColor)) {
			if (slave.hLength >= 10) {
				if (slave.markings === "freckles" || slave.markings === "heavily freckled") {
					if (App.Medicine.Modification.naturalSkins.includes(slave.skin) && skinToneLevel(slave.skin).isBetween(5, 10)) {
						r.push(`It goes perfectly with ${his} ${slave.skin} skin and freckles.`);
					}
				}
			}
		}

		r.push(App.Desc.armpitHair(slave));
	}

	if (slave.voice === 0) {
		r.push(`${He} is`, App.UI.DOM.makeElement('span', "completely silent,", "pink"));
		r.push(`which is understandable, since ${he}'s`, App.UI.DOM.makeElement("span", "mute.", "red"));
	} else if (slave.lips > 95) {
		r.push(`${He} is`, App.UI.DOM.makeElement('span', "effectively mute,", "pink"));
		r.push(`since ${his} lips are so large that ${he} can no longer speak intelligibly. ${He} can still`);
		if (slave.devotion > 50) {
			r.push(`moan`);
		} else if (slave.devotion > 20) {
			r.push(`whimper`);
		} else {
			r.push(`scream`);
		}
		r.push(`through them, though.`);
	}

	if (V.showBodyMods === 1) {
		if (slave.fuckdoll > 0) {
			if (slave.piercing.ear.weight + slave.piercing.eyebrow.weight + slave.piercing.nose.weight > 0) {
				r.push(`The piercings on ${his} head run through ${his} suit, helping secure the material to ${his} head.`);
			}
		} else {
			r.push(App.Desc.mods(slave, "ear"));
			r.push(App.Desc.mods(slave, "nose"));
			r.push(App.Desc.mods(slave, "eyebrow"));
			r.push(App.Desc.mods(slave, "cheek"));
			r.push(App.Desc.mods(slave, "neck"));
			if (slave.custom.tattoo !== "" && slave.custom.tattoo) {
				r.push(pronounsForSlaveProp(slave, slave.custom.tattoo));
			}
		}
	}

	r.push(App.Desc.horns(slave));
	r.push(App.Desc.face(slave));
	r.push(App.Desc.mouth(slave));

	if (V.showClothing === 1 && descType !== DescType.MARKET) {
		if (slave.fuckdoll === 0) {
			r.push(App.Desc.collar(slave));
			r.push(App.Desc.faceAccessory(slave));
			r.push(App.Desc.mouthAccessory(slave));
			if (slave.relationship > 4) {
				if (hasAnyArms(slave)) {
					r.push(`${He} has a simple gold band on the little finger of ${his}`);
					if (!hasLeftArm(slave)) {
						r.push(`right`);
					} else {
						r.push(`left`);
					}
					r.push(`hand.`);
				} else {
					r.push(`${He} has a simple gold band on a length of chain around ${his} neck.`);
				}
			} else if (slave.relationship === -3) {
				if (hasAnyArms(slave)) {
					r.push(`${He} has a simple steel band on the little finger of ${his}`);
					if (!hasLeftArm(slave)) {
						r.push(`right`);
					} else {
						r.push(`left`);
					}
					r.push(`hand.`);
				} else {
					r.push(`${He} has a simple steel band on a length of cord around ${his} neck.`);
				}
			}
		}
	}

	if (slave.fuckdoll === 0) {
		r.push(App.Desc.nails(slave));
	}
	r.push(App.Desc.mods(slave, "back"));
	r.push(App.Desc.mods(slave, "shoulder"));
	r.push(App.Desc.mods(slave, "upper arm"));
	r.push(App.Desc.mods(slave, "lower arm"));
	r.push(App.Desc.mods(slave, "hand"));
	r.push(App.Desc.mods(slave, "wrist"));

	if (slave.fuckdoll === 0) {
		if (slave.minorInjury !== 0) {
			if (slave.minorInjury !== "sore ass") {
				r.push(`${He} is sporting a`);
				span = document.createElement('span');
				span.className = "red";
				span.textContent = `${slave.minorInjury},`;
				r.push(span);
				r.push(`covered by makeup.`);
			}
		}
	}
	if (slave.health.illness > 0) {
		if (slave.fuckdoll === 0) {
			r.push(`${He}`);
		} else {
			r.push(`${His} suit reports that ${he}`);
		}
		span = document.createElement('span');
		if (slave.health.illness === 1) {
			if (slave.fuckdoll === 0) {
				r.push(`is`);
				span.className = "red";
				span.textContent = `feeling under the weather.`;
				r.push(span);
			} else {
				r.push(`has`);
				span.className = "red";
				span.textContent = `fallen ill.`;
				r.push(span);
			}
		} else if (slave.health.illness === 2) {
			r.push(`is`);
			span.className = "red";
			span.textContent = `somewhat ill.`;
			r.push(span);
		} else if (slave.health.illness === 3) {
			r.push(`is`);
			span.className = "red";
			span.textContent = `sick.`;
			r.push(span);
		} else if (slave.health.illness === 4) {
			r.push(`is`);
			span.className = "red";
			span.textContent = `very sick.`;
			r.push(span);
		} else if (slave.health.illness === 5) {
			r.push(`is`);
			span.className = "red";
			span.textContent = `terribly ill.`;
			r.push(span);
		}
	}

	r.toParagraph();
	// Calling all boob widgets
	r.push(App.Desc.boobs(slave, descType));
	r.push(App.Desc.boobsShape(slave));
	r.push(App.Desc.boobsExtra(slave, descType));
	r.push(App.Desc.mods(slave, "chest"));
	r.push(App.Desc.mods(slave, "breast"));
	r.push(App.Desc.shoulders(slave));
	if (slave.appendages !== "none" || slave.wingsShape !== "none") {
		r.push(App.Desc.upperBack(slave));
	}
	r.push(App.Desc.nipples(slave, descType));
	r.push(App.Desc.mods(slave, "nipple"));
	r.push(App.Desc.areola(slave, descType));
	r.push(App.Desc.mods(slave, "areolae"));
	r.push(App.Desc.belly(slave, descType));
	r.push(App.Desc.mods(slave, "belly"));
	r.push(App.Desc.butt(slave, descType));

	r.toParagraph();

	r.push(App.Desc.crotch(slave, descType));
	r.push(App.Desc.dick(slave, descType));
	r.push(App.Desc.vagina(slave));
	r.push(App.Desc.anus(slave, descType));

	r.toParagraph();

	if (slave.fuckdoll === 0) {
		r.push(App.Desc.drugs(slave));
		r.toParagraph();
	}

	el.append(r.container());

	// clear sale and law flags, if set

	return el;

	/** Reports detected gingering status for a slave
	 * @param {FC.GingeredSlave} slave
	 */
	function reportGingering(slave) {
		let t = "";
		if (slave.gingering) {
			if (slave.gingering.detection === "slaver") {
				switch (slave.gingering.type) {
					case "antidepressant":
						t += `${He} is acting dazed and unfocused. ${He}'s obviously been given antidepressants to make ${him} appear less fearful, and will be considerably less trusting than ${he} seems.`;
						break;
					case "depressant":
						t += `${He} is acting languid and drugged. ${He}'s obviously been given a depressant to make ${him} appear less hateful, and will be considerably less accepting of slavery than ${he} seems.`;
						break;
					case "stimulant":
						t += `${He} is acting twitchy and hyperactive. ${He}'s obviously been given a stimulant to make ${him} seem healthier and more energetic, and is a lot less healthy than ${he} looks.`;
						break;
					case "vasoconstrictor":
						t += `${His} lips have the slightest blue tinge, making it obvious ${he}'s been given a vasoconstrictor. ${His} cock is a lot less of a girldick than it looks right now.`;
						break;
					case "vasodilator":
						t += `${He} has an impressive erection, but it seems quite unconnected to the rest of ${him}, as if ${he} doesn't know what to do with it. ${He}'s obviously been given a vasodilator to make ${his} dick seem a little less pathetic.`;
						break;
					case "aphrodisiac":
						t += `${His} pupils are slightly dilated, ${his} breath comes in fast pants, and ${his} skin is flushed. ${He}'s obviously been given as big of a dose of aphrodisiacs as ${he} can handle without a heart attack.`;
						break;
					default:
						t += `${He} is acting oddly, presenting ${his} ass in an awkward way and acting uncomfortable. ${He}'s obviously had an irritant shoved up ${his} butt to make ${him} act like an anal whore.`;
				}
				t += ` It's a trick you're very familiar with, given your <span class="skill player">training as a slaver.</span>`;
			} else if (slave.gingering.detected) {
				switch (slave.gingering.type) {
					case "antidepressant":
						t += `${He} is acting dazed and unfocused, like ${he}'s been given antidepressants to make ${him} appear less fearful. ${He} may be considerably less trusting than ${he} seems. `;
						break;
					case "depressant":
						t += `${He} is acting languid and drugged, like ${he}'s been given a depressant to make ${him} appear less hateful. ${He} may be considerably less accepting of slavery than ${he} seems. `;
						break;
					case "stimulant":
						t += `${He} is acting twitchy and hyperactive, like ${he}'s been given a stimulant to make ${him} seem healthier and more energetic. ${He} may be considerably less vital than ${he} seems. `;
						break;
					case "vasoconstrictor":
						t += `${His} lips have the slightest blue tinge, suggesting that ${he} may have been given a vasoconstrictor. If ${he} has, ${his} cock may be considerably less feminine and demure than it now seems. `;
						break;
					case "vasodilator":
						t += `${He} has an impressive erection, but it seems quite unconnected to the rest of ${him}, as if ${he} doesn't know what to do with it. ${He} may have been given a vasodilator. If ${he} has, ${his} cock may be considerably less impressive than it now seems. `;
						break;
					case "aphrodisiac":
						t += `${His} pupils are slightly dilated, ${his} breath comes in fast pants, and ${his} skin is flushed. These are the characteristic symptoms of a dose of aphrodisiacs limited only by a desire to avoid giving ${him} a heart attack. `;
						break;
					default:
						t += `${He} is acting oddly, presenting ${his} ass in an awkward way and acting uncomfortable. ${He} may be considerably less interested in anal sex than ${he} seems. `;
				}
				if (slave.gingering.detection === "mercenary") {
					t += `The nervous seller confirms this in response to a direct inquiry. Your intimidating reputation from your <span class="skill player">extensive combat training</span> has its uses.`;
				} else if (slave.gingering.detection === "force") {
					t += `The nervous seller confirms this in response to a direct inquiry. Your reputation as a <span class="skill player"> ${PCTitle() ? "man" : "woman"} of blood</span> has its uses.`;
				}
			}
		}
		return t;
	}
};
