/**
 * Displays a summary of the child
 * @param {App.Entity.SlaveState} child
 * @returns {string}
 */
App.Facilities.Nursery.ChildSummary = function(child) {
	/** @type {App.UI.SlaveSummary.AbbreviationState} */
	const abbreviate = V.UI.slaveSummary.abbreviation;

	let r = ``;

	/**
	 * @param {App.Entity.SlaveState} child
	 * @returns {string}
	 */
	function ChildSummaryUncached(child) {
		if (abbreviate.devotion === 1) {
			shortDevotion(child);
		} else if (abbreviate.devotion === 2) {
			longDevotion(child);
		}
		if (child.fuckdoll === 0) {
			if (abbreviate.rules === 1) {
				shortRules(child);
			} else if (abbreviate.rules === 2) {
				longRules(child);
			}
		}
		if (abbreviate.diet === 1) {
			shortWeight(child);
		} else if (abbreviate.diet === 2) {
			longWeight(child);
		}
		if (abbreviate.diet === 1) {
			shortDiet(child);
		} else if (abbreviate.diet === 2) {
			longDiet(child);
		}
		if (abbreviate.health === 1) {
			shortHealth(child);
		} else if (abbreviate.health === 2) {
			longHealth(child);
		}
		if (abbreviate.drugs === 1) {
			shortDrugs(child);
		} else if (abbreviate.drugs === 2) {
			longDrugs(child);
		}
		if (abbreviate.nationality + abbreviate.genitalia + abbreviate.physicals + abbreviate.skills + abbreviate.mental !== 0) {
			r += `<br> `;
			if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
				r += "&nbsp;&nbsp;&nbsp;&nbsp;";
			}
		}
		const desc = capFirstChar(SlaveTitle(child));
		r += `<strong><span class="coral">${desc}${abbreviate.physicals === 2? '.' : ''}</span></strong> `;
		if (V.seeRace) {
			r += `<span class="race">`;
			if (abbreviate.race === 1) {
				shortRace(child);
			} else if (abbreviate.race === 2) {
				longRace(child);
			}
			r += `</span> `;
		}
		if (abbreviate.nationality === 1) {
			shortNationality(child);
		} else if (abbreviate.nationality === 2) {
			longNationality(child);
		}
		if (abbreviate.physicals === 1) {
			shortSkin(child);
		} else {
			r += `<span class="pink">${child.skin.charAt(0).toUpperCase() + child.skin.slice(1)} skin.</span> `;
		}
		if (abbreviate.genitalia === 1) {
			shortGenitals(child);
		} else if (abbreviate.genitalia === 2) {
			longGenitals(child);
		}
		if (abbreviate.physicals === 1) {
			shortAge(child);
			shortFace(child);
			shortEyes(child);
			shortEars(child);
			if (child.markings !== "none") {
				r += "Markings";
			}
			shortLips(child);
			shortTeeth(child);
			shortMuscles(child);
			r += App.Desc.shortLimbs(child);
			shortVoice(child);
			shortTitsAss(child);
			shortHips(child);
			shortWaist(child);
			shortImplants(child);
			shortLactation(child);
			// shortMods(child);
		} else if (abbreviate.physicals === 2) {
			longAge(child);
			longFace(child);
			longEyes(child);
			longEars(child);
			longLips(child);
			longTeeth(child);
			longMuscles(child);
			r += App.Desc.longLimbs(child);
			longVoice(child);
			longTitsAss(child);
			longHips(child);
			longWaist(child);
			longImplants(child);
			longLactation(child);
			// longMods(child);
			if (!jQuery.isEmptyObject(child.brand)) {
				r += `Branded. `;
			}
		}
		if (abbreviate.hormoneBalance === 1) {
			if (child.hormoneBalance <= -21) {
				r += `<span class="deepskyblue">`;
				r += ` <strong>HB:M</strong> `;
			} else if (child.hormoneBalance <= 20) {
				r += `<span class="pink">`;
				r += ` <strong>HB:N</strong> `;
			} else if (child.hormoneBalance <= 500) {
				r += `<span class="pink">`;
				r += ` <strong>HB:F</strong> `;
			}
			r += `</span> `;
		} else if (abbreviate.hormoneBalance === 2) {
			if (child.hormoneBalance <= -21) {
				r += `<span class="deepskyblue"> `;
			} else {
				r += `<span class="pink"> `;
			}
			if (child.hormoneBalance <= -500) {
				r += `Absolutely masculine`;
			} else if (child.hormoneBalance <= -400) {
				r += `Overwhelmingly masculine`;
			} else if (child.hormoneBalance <= -300) {
				r += `Extremely masculine`;
			} else if (child.hormoneBalance <= -200) {
				r += `Heavily masculine`;
			} else if (child.hormoneBalance <= -100) {
				r += `Very masculine`;
			} else if (child.hormoneBalance <= -21) {
				r += `Masculine`;
			} else if (child.hormoneBalance <= 20) {
				r += `Neutral`;
			} else if (child.hormoneBalance <= 99) {
				r += `Feminine`;
			} else if (child.hormoneBalance <= 199) {
				r += `Very feminine`;
			} else if (child.hormoneBalance <= 299) {
				r += `Heavily feminine`;
			} else if (child.hormoneBalance <= 399) {
				r += `Extremely feminine`;
			} else if (child.hormoneBalance <= 499) {
				r += `Overwhelmingly feminine`;
			} else if (child.hormoneBalance <= 500) {
				r += `Absolutely feminine`;
			}
			r += ` hormone balance.</span> `;
		}
		r += `<br>`;
		if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
			r += "&nbsp;&nbsp;&nbsp;&nbsp;";
		}
		if (abbreviate.skills === 1) {
			shortIntelligence(child);
			shortSexSkills(child);
			if (child.skill.combat > 0) {
				r += "C";
			}
			r += "</span> ";
			shortPrestige(child);
			shortPornPrestige(child);
		} else if (abbreviate.skills === 2) {
			longIntelligence(child);
			longSexSkills(child);
			if (child.skill.combat > 0) {
				r += `Trained fighter. `;
			}
			r += "</span> ";
			longPrestige(child);
			longPornPrestige(child);
		}
		if (abbreviate.mental === 1) {
			if (child.fetish !== Fetish.MINDBROKEN) {
				if (child.fetishKnown === 1) {
					shortFetish(child);
				}
				if (child.attrKnown === 1) {
					shortAttraction(child);
				}
			}
			if (child.piercing.genitals.smart) {
				shortSmartFetish(child);
				shortSmartAttraction(child);
			}
			shortBehaviorFlaw(child);
			shortSexFlaw(child);
			shortBehaviorQuirk(child);
			shortSexQuirk(child);
		} else if (abbreviate.mental === 2) {
			if (child.fetish !== Fetish.MINDBROKEN) {
				if (child.fetishKnown === 1) {
					longFetish(child);
				}
				if (child.attrKnown === 1) {
					longAttraction(child);
				}
			}
			if (child.piercing.genitals.smart) {
				longSmartFetish(child);
				longSmartAttraction(child);
			}
			longBehaviorFlaw(child);
			longSexFlaw(child);
			longBehaviorQuirk(child);
			longSexQuirk(child);
		}
		if (child.custom.label) {
			r += `<span class="custom-label">${capFirstChar(child.custom.label)}</span> `;
		}
		if ((child.relationship !== 0) || (abbreviate.clothes === 2) || (abbreviate.rulesets === 2)) {
			r += `<br> `;
			if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
				r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			}
		}
		if (abbreviate.mental === 1) {
			r += `<span class="lightgreen">`;
			shortExtendedFamily(child);
			r += `</span> `;
			shortClone(child);
			shortRival(child);
		} else if (abbreviate.mental === 2) {
			longExtendedFamily(child);
		}
		if (child.fuckdoll === 0) {
			if (abbreviate.clothes === 2) {
				r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
				if (child.choosesOwnClothes === 1) {
					r += `Dressing ${getPronouns(child).himself}. `;
				}
				longClothes(child);
				longCollar(child);
				longBelly(child);
				if (hasAnyLegs(child)) {
					longLegs(child);
				}
				if (canWalk(child)) {
					longShoes(child);
				}
				longChastity(child);
				longVaginalAcc(child);
				longDickAcc(child);
				longButtplug(child);
			}
		}
		r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
		rulesAssistant(child);
		if (abbreviate.origins === 2 && child.origin !== "") {
			origins(child);
		}
		return r;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortDevotion(child) {
		r += `<br>`;
		if (child.fetish === Fetish.MINDBROKEN) {
			r += `<span class="mindbroken">MB</span> `;
		} else if (child.devotion < -95) {
			r += `<span class="devotion hateful">Hate${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion < -50) {
			r += `<span class="devotion hateful">Hate${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion < -20) {
			r += `<span class="devotion resistant">Res${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion <= 20) {
			r += `<span class="devotion ambivalent">Ambiv${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion <= 50) {
			r += `<span class="devotion accept">Accept${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else if (child.devotion <= 95) {
			r += `<span class="devotion devoted">Devo${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		} else {
			r += `<span class="devotion worship">Wor${V.summaryStats ? `[${child.devotion}]` : ''}</span> `;
		}
		if (child.fetish === Fetish.MINDBROKEN) {
			return;
		} else if (child.trust < -95) {
			r += `<span class="trust extremely-terrified">ETerr${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
		} else if (child.trust < -50) {
			r += `<span class="trust terrified">Terr${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
		} else if (child.trust < -20) {
			r += `<span class="trust frightened">Fright${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
		} else if (child.trust <= 20) {
			r += `<span class="trust fearful">Fear${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
		} else if (child.trust <= 50) {
			if (child.devotion < -20) {
				r += `<span class="defiant careful">Caref${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			} else {
				r += `<span class="trust careful">Caref${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			}
		} else if (child.trust < 95) {
			if (child.devotion < -20) {
				r += `<span class="defiant bold">Bold${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			} else {
				r += `<span class="trust trusting">Trust${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			}
		} else {
			if (child.devotion < -20) {
				r += `<span class="defiant full">Defiant${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			} else {
				r += `<span class="trust prof-trusting">VTrust ${V.summaryStats ? `[${child.trust}]` : ''}</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longDevotion(child) {
		r += `<br>`;
		if (child.fetish === Fetish.MINDBROKEN) {
			r += `<span class="mindbroken">Mindbroken.</span> `;
		} else if (child.devotion < -95) {
			r += `<span class="devotion hateful">Very hateful${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion < -50) {
			r += `<span class="devotion hateful">Hateful${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion < -20) {
			r += `<span class="devotion resistant">Resistant${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion <= 20) {
			r += `<span class="devotion ambivalent">Ambivalent${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion <= 50) {
			r += `<span class="devotion accept">Accepting${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else if (child.devotion <= 95) {
			r += `<span class="devotion devoted">Devoted${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		} else {
			r += `<span class="devotion worship">Worshipful${V.summaryStats ? `[${child.devotion}]` : ''}.</span> `;
		}
		if (child.fetish === Fetish.MINDBROKEN) {
			return;
		} else if (child.trust < -95) {
			r += `<span class="trust extremely-terrified">Extremely terrified${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
		} else if (child.trust < -50) {
			r += `<span class="trust terrifies">Terrified${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
		} else if (child.trust < -20) {
			r += `<span class="trust frightened">Frightened${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
		} else if (child.trust <= 20) {
			r += `<span class="trust fearful">Fearful${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
		} else if (child.trust <= 50) {
			if (child.devotion < -20) {
				r += `<span class="defiant careful">Careful${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			} else {
				r += `<span class="trust careful">Careful${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			}
		} else if (child.trust < 95) {
			if (child.devotion < -20) {
				r += `<span class="defiant bold">Bold${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			} else {
				r += `<span class="trust trusting">Trusting${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			}
		} else {
			if (child.devotion < -20) {
				r += `<span class="defiant full">Defiant${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			} else {
				r += `<span class="trust prof-trusting">Profoundly trusting${V.summaryStats ? `[${child.trust}]` : ''}.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortRules(child) {
		switch (child.rules.living) {
			case "luxurious":
				r += `<strong>LS:Lux</strong> `;
				break;
			case "normal":
				r += `<strong>LS:Nor</strong> `;
				break;
			default:
				r += `<strong>LS:Spa</strong> `;
				break;
		}
		if (canTalk(child)) {
			switch (child.rules.speech) {
				case "permissive":
					r += `<strong>SpR:P</strong> `;
					break;
				case "accent elimination":
					r += `<strong>SpR:NoAcc</strong> `;
					break;
				case "language lessons":
					r += `<strong>SpR:LL</strong> `;
					break;
				default:
					r += `<strong>SpR:R</strong> `;
					break;
			}
			r += " ";
		}
		switch (child.rules.relationship) {
			case "permissive":
				r += `<strong>ReR:P</strong> `;
				break;
			case "just friends":
				r += `<strong>ReR:Fr</strong> `;
				break;
			default:
				r += `<strong>ReR:R</strong> `;
				break;
		}
		switch (child.rules.punishment) {
			case "confinement":
				r += `<strong>Pun:Conf</strong> `;
				break;
			case "whipping":
				r += `<strong>Pun:Whip</strong> `;
				break;
			case "chastity":
				r += `<strong>Pun:Chas</strong> `;
				break;
			default:
				r += `<strong>Pun:Situ</strong> `;
				break;
		}
		switch (child.rules.reward) {
			case "relaxation":
				r += `<strong>Rew:Relx</strong> `;
				break;
			case "drugs":
				r += `<strong>Rew:Drug</strong> `;
				break;
			case "orgasm":
				r += `<strong>Rew:Orga</strong> `;
				break;
			default:
				r += `<strong>Rew:Situ</strong> `;
				break;
		}
		r += `<strong>MaR:${App.Utils.releaseSummaryShort(child)}</strong> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longRules(child) {
		r += `Living standard: ${child.rules.living}. `;
		if (canTalk(child)) {
			r += `Speech rules: ${child.rules.speech}. `;
		}
		r += `Relationship rules: ${child.rules.relationship}. `;
		r += `Typical punishment: ${child.rules.punishment}. `;
		r += `Typical reward: ${child.rules.reward}. `;
		r += `Release rules: ${App.Utils.releaseSummaryLong(child)}. `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortWeight(child) {
		if (child.weight < -95) {
			r += `<strong><span class="red">W---${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
		} else if (child.weight < -30) {
			if (child.hips < -1) {
				r += `<strong>W--${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W--${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else if (child.weight < -10) {
			r += `<strong>W-${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
		} else if (child.weight <= 10) {
			r += `<strong>W${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
		} else if (child.weight <= 30) {
			r += `<strong>W+${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
		} else if (child.weight <= 95) {
			if (child.hips > 1 || FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `<strong>W++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else if (child.weight <= 130) {
			if (child.hips > 2 || FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `<strong>W+++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W+++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else if (child.weight <= 160) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `<strong>W++++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W++++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else if (child.weight <= 190) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `<strong>W+++++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W+++++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		} else {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `<strong>W++++++${V.summaryStats ? `[${child.weight}]` : ''}</strong> `;
			} else {
				r += `<strong><span class="red">W++++++${V.summaryStats ? `[${child.weight}]` : ''}</span></strong> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longWeight(child) {
		if (child.weight < -95) {
			r += `<span class="red">Emaciated${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
		} else if (child.weight < -30) {
			if (child.hips < -1) {
				r += `Model-thin${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Very thin${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else if (child.weight < -10) {
			r += `Thin${V.summaryStats ? `[${child.weight}]`: ''}. `;
		} else if (child.weight <= 10) {
			r += `Trim${V.summaryStats ? `[${child.weight}]`: ''}. `;
		} else if (child.weight <= 30) {
			r += `Plush ${V.summaryStats ? `[${child.weight}]`: ''}. `;
		} else if (child.weight <= 95) {
			if (child.hips > 1 || FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `Nicely chubby${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Overweight${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else if (child.weight <= 130) {
			if (child.hips > 2 || FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `Pleasantly soft and shapely${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Fat${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else if (child.weight <= 160) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `Amazingly voluptuous${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Obese${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else if (child.weight <= 190) {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `SSBBW${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Super Obese${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		} else {
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r += `Perfectly massive${V.summaryStats ? `[${child.weight}]`: ''}. `;
			} else {
				r += `<span class="red">Dangerously Obese${V.summaryStats ? `[${child.weight}]`: ''}.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortDiet(child) {
		r += `<span class="teal">`;
		switch (child.diet) {
			case "restricted":
				r += `<strong>Di:W-</strong> `;
				break;
			case "fattening":
				r += `<strong>Di:W+</strong> `;
				break;
			case "XX":
				r += `<strong>Di:XX+</strong> `;
				break;
			case "XY":
				r += `<strong>Di:XY+</strong> `;
				break;
			case "XXY":
				r += `<strong>Di:XXY+</strong> `;
				break;
			case "muscle building":
				r += `<strong>Di:M+</strong> `;
				break;
			case "slimming":
				r += `<strong>Di:M-</strong> `;
				break;
			case "cum production":
				r += `<strong>Di:C+</strong> `;
				break;
			case "cleansing":
				r += `<strong>Di:H+</strong> `;
				break;
			case "fertility":
				r += `<strong>Di:F+</strong> `;
				break;
		}
		r += `</span> `;
		r += `<span class="cyan">`;
		if (child.dietCum === 2) {
			r += `<strong>Cum++</strong> `;
		} else if (((child.dietCum === 1) && (child.dietMilk === 0))) {
			r += `<strong>Cum+</strong> `;
		} else if (((child.dietCum === 1) && (child.dietMilk === 1))) {
			r += `<strong>Cum+ Milk+</strong> `;
		} else if (((child.dietCum === 0) && (child.dietMilk === 1))) {
			r += `<strong>Milk+</strong> `;
		} else if (child.dietMilk === 2) {
			r += `<strong>Milk++</strong> `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longDiet(child) {
		r += `<span class="teal">`;
		switch (child.diet) {
			case "restricted":
				r += `Dieting. `;
				break;
			case "fattening":
				r += `Gaining weight. `;
				break;
			case "XX":
				r += `Estrogen rich. `;
				break;
			case "XY":
				r += `Testosterone rich. `;
				break;
			case "XXY":
				r += `Futanari mix. `;
				break;
			case "muscle building":
				r += `Pumping iron. `;
				break;
			case "slimming":
				r += `Slimming down. `;
				break;
			case "cum production":
				r += `Cum production. `;
				break;
			case "cleansing":
				r += `Cleansing. `;
				break;
			case "fertility":
				r += `Fertility. `;
				break;
		}
		r += `</span> `;
		if (child.dietCum === 2) {
			r += `Diet base: <span class="cyan">Cum Based.</span> `;
		} else if (((child.dietCum === 1) && (child.dietMilk === 0))) {
			r += `Diet base: <span class="cyan">Cum Added.</span> `;
		} else if (((child.dietCum === 1) && (child.dietMilk === 1))) {
			r += `Diet base: <span class="cyan">Milk & Cum Added.</span> `;
		} else if (((child.dietCum === 0) && (child.dietMilk === 1))) {
			r += `Diet base: <span class="cyan">Milk Added.</span> `;
		} else if (child.dietMilk === 2) {
			r += `Diet base: <span class="cyan">Milk Based.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortHealth(child) {
		if (child.health.condition < -20) {
			r += `<strong><span class="red">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
		} else if (child.health.condition <= 20) {
			r += `<strong><span class="yellow">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
		} else if (child.health.condition > 20) {
			r += `<strong><span class="green">H ${V.summaryStats ? `[${child.health.condition}]` : ''}</span></strong> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longHealth(child) {
		if (child.health.condition < -90) {
			r += `<span class="red">On the edge of death ${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition < -50) {
			r += `<span class="red">Extremely unhealthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition < -20) {
			r += `<span class="red">Unhealthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition <= 20) {
			r += `<span class="yellow">Healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition <= 50) {
			r += `<span class="green">Very healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else if (child.health.condition <= 90) {
			r += `<span class="green">Extremely healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		} else {
			r += `<span class="green">Unnaturally healthy${V.summaryStats ? `[${child.health.condition}]` : ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortDrugs(child) {
		r += `<span class="tan">`;
		switch (child.drugs) {
			case "breast injections":
				r += `<strong>Dr:Boobs+</strong> `;
				break;
			case "intensive breast injections":
				r += `<strong>Dr:Boobs++</strong> `;
				break;
			case "nipple enhancers":
				r += `<strong>Dr:Nipple+</strong> `;
				break;
			case "hyper breast injections":
				r += `<strong>Dr:Boobs+++</strong> `;
				break;
			case "butt injections":
				r += `<strong>Dr:Butt+</strong> `;
				break;
			case "intensive butt injections":
				r += `<strong>Dr:Butt++</strong> `;
				break;
			case "hyper butt injections":
				r += `<strong>Dr:Butt+++</strong> `;
				break;
			case "lip injections":
				r += `<strong>Dr:Lip+</strong> `;
				break;
			case "fertility drugs":
				r += `<strong>Dr:Fert+</strong> `;
				break;
			case "super fertility drugs":
				r += `<strong>Dr:Fert++</strong> `;
				break;
			case "penis enhancement":
				r += `<strong>Dr:Dick+</strong> `;
				break;
			case "intensive penis enhancement":
				r += `<strong>Dr:Dick++</strong> `;
				break;
			case "hyper penis enhancement":
				r += `<strong>Dr:Dick+++</strong> `;
				break;
			case "testicle enhancement":
				r += `<strong>Dr:Balls+</strong> `;
				break;
			case "intensive testicle enhancement":
				r += `<strong>Dr:Balls++</strong> `;
				break;
			case "hyper testicle enhancement":
				r += `<strong>Dr:Balls+++</strong> `;
				break;
			case "psychosuppressants":
				r += `<strong>Dr:Psych</strong> `;
				break;
			case "steroids":
				r += `<strong>Dr:Ster</strong> `;
				break;
			case "female hormone injections":
				r += `<strong>Dr:HormXX++</strong> `;
				break;
			case "male hormone injections":
				r += `<strong>Dr:HormXY++</strong> `;
				break;
			case "hormone enhancers":
				r += `<strong>Dr:Horm+</strong> `;
				break;
			case "hormone blockers":
				r += `<strong>Dr:Horm-</strong> `;
				break;
			case "anti-aging cream":
				r += `<strong>Dr:Age-</strong> `;
				break;
			case "appetite suppressors":
				r += `<strong>Dr:ApSup</strong> `;
				break;
			case "penis atrophiers":
				r += `<strong>Dr:Dick-</strong> `;
				break;
			case "testicle atrophiers":
				r += `<strong>Dr:Balls-</strong> `;
				break;
			case "clitoris atrophiers":
				r += `<strong>Dr:Clit-</strong> `;
				break;
			case "labia atrophiers":
				r += `<strong>Dr:Labia-</strong> `;
				break;
			case "nipple atrophiers":
				r += `<strong>Dr:Nipple-</strong> `;
				break;
			case "lip atrophiers":
				r += `<strong>Dr:Lip-</strong> `;
				break;
			case "breast redistributors":
				r += `<strong>Dr:Breast-</strong> `;
				break;
			case "butt redistributors":
				r += `<strong>Dr:Butt-</strong> `;
				break;
			case "sag-B-gone":
				r += `<strong>Dr:AntiSag</strong> `;
				break;
			case "growth stimulants":
				r += `<strong>Dr:groStim</strong> `;
				break;
		}
		r += `</span> `;
		r += `<span class="lightgreen">`;
		if (child.curatives === 2) {
			r += `<strong>Cura</strong> `;
		} else if (child.curatives === 1) {
			r += `<strong>Prev</strong> `;
		}
		r += `</span> `;
		if (child.aphrodisiacs !== 0) {
			r += `<span class="lightblue">`;
			if (child.aphrodisiacs === 1) {
				r += `<strong>Aph</strong> `;
			} else if (child.aphrodisiacs === 2) {
				r += `<strong>Aph++</strong> `;
			} else {
				r += `<strong>Anaph</strong> `;
			}
			r += `</span> `;
		}
		if (child.addict !== 0) {
			r += `<span class="cyan">Add</span> `;
		}
		r += `<span class="lightsalmon">`;
		if (child.hormones > 1) {
			r += `<strong>Ho:F+</strong> `;
		} else if (child.hormones > 0) {
			r += `<strong>Ho:F</strong> `;
		} else if (child.hormones < -1) {
			r += `<strong>Ho:M+</strong> `;
		} else if (child.hormones < 0) {
			r += `<strong>Ho:M</strong> `;
		}
		r += `</span> `;
		r += `<span class="mediumseagreen">`;
		if (child.bellyImplant > -1) {
			r += `<strong>Belly Imp</strong> `;
		} else if (((child.preg <= -2) || (child.ovaries === 0)) && (child.vagina !== -1)) {
			r += `<strong>Barr</strong> `;
		} else if (child.pubertyXX === 0 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `<strong>Prepub</strong> `;
		} else if (child.ovaryAge >= 47 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `<strong>Meno</strong> `;
		} else if (child.pregWeek < 0) {
			r += `<strong>Postpartum</strong> `;
		} else if (child.preg === -1) {
			r += `<strong>CC</strong> `;
		} else if (child.preg === 0 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `<strong>Fert+</strong> `;
			// } else if (((child.preg < child.pregData.normalBirth / 10) && (child.preg > 0) && child.pregKnown === 0) || child.pregWeek === 1) {
			//	r += `<strong>Preg?</strong> `;
		} else if (child.preg >= 36) {
			r += `<strong>Perm preg</strong> `;
		} else if (child.pregKnown === 1) {
			r += `<strong>${child.pregWeek} wks preg</strong> `;
		}
		r += `</span> `;
		if (child.induce === 1) {
			r += `<span class="orange"><strong>Early Labor</strong></span> `;
		}
		if (child.pubertyXY === 0 && child.balls > 0) {
			r += `<strong>Prepub balls</strong> `;
		}
		if (child.balls > 0 && child.vasectomy === 1) {
			r += `<strong>Vasect</strong> `;
		}
		r += `<span class="springgreen">`;
		if (child.inflation === 3) {
			r += `<strong>8 ltr ${child.inflationType}</strong> `;
		} else if (child.inflation === 2) {
			r += `<strong>4 ltr ${child.inflationType}</strong> `;
		} else if (child.inflation === 1) {
			r += `<strong>2 ltr ${child.inflationType}</strong> `;
		} else if (child.bellyFluid > 0) {
			r += `<strong>${child.bellyFluid}ccs ${child.inflationType}</strong> `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longDrugs(child) {
		if ((child.drugs !== "no drugs") && (child.drugs !== "none")) {
			r += `<span class="tan">On ${child.drugs}.</span> `;
		}
		r += `<span class="lightgreen">`;
		if (child.curatives === 2) {
			r += `On curatives. `;
		} else if (child.curatives === 1) {
			r += `On preventatives. `;
		}
		r += `</span> `;
		r += `<span class="lightblue">`;
		if (child.aphrodisiacs > 0) {
			r += `On ${child.aphrodisiacs > 1 ? 'extreme': ''} aphrodisiacs. `;
		} else if (child.aphrodisiacs === -1) {
			r += `On anaphrodisiacs. `;
		}
		r += `</span> `;
		if (child.addict !== 0) {
			r += `<span class="cyan">Addict.</span> `;
		}
		r += `<span class="lightsalmon">`;
		if (child.hormones > 1) {
			r += `Heavy female hormones. `;
		} else if (child.hormones > 0) {
			r += `Female hormones. `;
		} else if (child.hormones < -1) {
			r += `Heavy male hormones. `;
		} else if (child.hormones < 0) {
			r += `Male hormones. `;
		}
		r += `</span> `;
		r += `<span class="mediumseagreen">`;
		if (child.bellyImplant > -1) {
			r += `Belly Implant. `;
		} else if (((child.preg <= -2) || (child.ovaries === 0)) && (child.vagina !== -1)) {
			r += `Barren. `;
		} else if (child.pubertyXX === 0 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `Not ovulating yet. `;
		} else if (child.ovaryAge >= 47 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `Menopausal. `;
		} else if (child.pregWeek < 0) {
			r += `Postpartum. `;
		} else if (child.preg === -1) {
			r += `On contraceptives. `;
		} else if (child.preg === 0 && (child.ovaries === 1 || child.mpreg === 1)) {
			r += `Fertile. `;
		} else if (((child.preg < child.pregData.normalBirth / 10) && (child.preg > 0) && child.pregKnown === 0) || child.pregWeek === 1) {
			r += `May be pregnant. `;
		} else if (child.preg >= 36) {
			r += `Permanently pregnant. `;
		} else if (child.pregKnown === 1) {
			if (child.pregType < 2) {
				r += `${Math.trunc(child.pregWeek)} weeks pregnant. `;
			} else {
				r += `${Math.trunc(child.pregWeek)} weeks pregnant with `;
				if (child.pregType >= 40) {
					r += `a tremendous brood of offspring. `;
				} else if (child.pregType >= 20) {
					r += `a brood of offspring. `;
				} else if (child.pregType >= 10) {
					r += `${child.pregType} babies. `;
				} else if (child.pregType === 9) {
					r += `nonuplets. `;
				} else if (child.pregType === 8) {
					r += `octuplets. `;
				} else if (child.pregType === 7) {
					r += `septuplets. `;
				} else if (child.pregType === 6) {
					r += `sextuplets. `;
				} else if (child.pregType === 5) {
					r += `quintuplets. `;
				} else if (child.pregType === 4) {
					r += `quadruplets. `;
				} else if (child.pregType === 3) {
					r += `triplets. `;
				} else {
					r += `twins. `;
				}
			}
			if (child.preg > child.pregData.normalBirth) { // TODO: double check this
				r += ` (Overdue.)`;
			}
		}
		r += `</span> `;
		if (child.induce === 1) {
			r += `<span class="orange">Showing signs of early labor.</span> `;
		}
		if (child.pubertyXY === 0 && child.balls > 0) {
			r += `Has not had first ejaculation. `;
		}
		if (child.balls > 0 && child.vasectomy === 1) {
			r += `Vasectomy. `;
		}
		r += `<span class="springgreen">`;
		if (child.inflation === 3) {
			r += `Filled with 8 liters of ${child.inflationType}. `;
		} else if (child.inflation === 2) {
			r += `Filled with 4 liters of ${child.inflationType}. `;
		} else if (child.inflation === 1) {
			r += `Filled with 2 liters of ${child.inflationType}. `;
		} else if (child.bellyFluid > 0) {
			r += `Stuffed with ${child.bellyFluid}ccs of ${child.inflationType}. `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortRace(child) {
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longRace(child) {
		switch (child.race) {
			case "white":
				r += `Caucasian. `;
				break;
			case "asian":
				r += `Asian. `;
				break;
			case "indo-aryan":
				r += `Indo-aryan. `;
				break;
			case "latina":
				r += `Latina. `;
				break;
			case "middle eastern":
				r += `Middle Eastern. `;
				break;
			case "black":
				r += `Black. `;
				break;
			case "pacific islander":
				r += `Pacific Islander. `;
				break;
			case "malay":
				r += `Malay. `;
				break;
			case "amerindian":
				r += `Amerindian. `;
				break;
			case "semitic":
				r += `Semitic. `;
				break;
			case "southern european":
				r += `Southern European. `;
				break;
			case "mixed race":
				r += `Mixed race. `;
				break;
			default:
				r += `${child.race.charAt(0).toUpperCase() + child.race.slice(1)}. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortNationality(child) {
		r += `<span class="nationality">`;
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longNationality(child) {
		r += `<span class="race">`;
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSkin(child) {
		r += `<span class="pink">`;
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortGenitals(child) {
		if (child.dick > 0) {
			r += `<span class="pink">`;
			if (child.balls === 0) {
				r += `Geld`;
			}
			if ((child.dick > 8) && (child.balls > 8)) {
				r += `Junk+++`;
			} else if ((child.dick > 5) && (child.balls > 5)) {
				r += `Junk++`;
			} else if ((child.dick > 4) && (child.balls > 4)) {
				r += `Junk+`;
			} else if ((child.dick > 3) && (child.balls > 3)) {
				r += `Junk`;
			} else if (child.dick > 8) {
				r += `Dick+++`;
			} else if (child.dick > 5) {
				r += `Dick++`;
			} else if (child.dick > 4) {
				r += `Dick+`;
			} else if (child.dick > 3) {
				r += `Dick`;
			} else if (child.balls > 10) {
				r += `Balls+++`;
			} else if (child.balls > 5) {
				r += `Balls++`;
			} else if (child.balls > 4) {
				r += `Balls+`;
			} else if (child.balls > 3) {
				r += `Balls`;
			}
			r += `</span> `;
		}
		if (child.vagina === 0) {
			r += `<span class="lime">VV</span> `;
		} else if (child.pregKnown === 1 && canWalk(child) && child.clothes === "no clothing" && child.shoes === "none") {
			r += `<span class="pink">NBP</span> `;
		}
		if (child.anus === 0) {
			r += ` <span class="lime">AV</span> `;
		}
		r += `<span class="pink">`;
		if ((child.vagina > 3) && (child.anus > 3)) {
			r += ` V++A++`;
		} else if ((child.vagina > 2) && (child.anus > 2)) {
			r += ` V+A+`;
		} else if (child.vagina > 3) {
			r += ` V++`;
		} else if (child.vagina > 2) {
			r += ` V+`;
		} else if (child.anus > 3) {
			r += ` A++`;
		} else if (child.anus > 2) {
			r += ` A+`;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longGenitals(child) {
		if (child.dick > 0) {
			r += `<span class="pink">`;
			if (child.balls === 0) {
				r += `Gelded. `;
			}
			if ((child.dick > 8) && (child.balls > 8)) {
				r += `Hyper dick & balls. `;
			} else if ((child.dick > 5) && (child.balls > 5)) {
				r += `Monster dick & balls. `;
			} else if ((child.dick > 4) && (child.balls > 4)) {
				r += `Huge dick & balls. `;
			} else if ((child.dick > 3) && (child.balls > 3)) {
				r += `Big dick & balls. `;
			} else if (child.dick > 8) {
				r += `Hyper dong. `;
			} else if (child.dick > 5) {
				r += `Monster dong. `;
			} else if (child.dick > 4) {
				r += `Huge dick. `;
			} else if (child.dick > 3) {
				r += `Big dick. `;
			} else if (child.balls > 8) {
				r += `Hyper balls. `;
			} else if (child.balls > 5) {
				r += `Monstrous balls. `;
			} else if (child.balls > 4) {
				r += `Huge balls. `;
			} else if (child.balls > 3) {
				r += `Big balls. `;
			}
			r += `</span> `;
		}
		if (child.vagina === 0) {
			r += `<span class="lime">Virgin.</span> `;
		} else if (child.pregKnown === 1 && canWalk(child) && child.clothes === "no clothing" && child.shoes === "none") {
			r += `<span class="pink">Naked, barefoot, and pregnant.</span> `;
		}
		if (child.anus === 0) {
			r += `<span class="lime">Anal virgin.</span> `;
		}
		r += `<span class="pink">`;
		if ((child.vagina > 3) && (child.anus > 3)) {
			r += `Blown out holes. `;
		} else if ((child.vagina > 2) && (child.anus > 2)) {
			r += `High mileage. `;
		} else if (child.vagina > 3) {
			r += `Cavernous pussy. `;
		} else if (child.vagina > 2) {
			r += `Loose pussy. `;
		} else if (child.anus > 3) {
			r += `Permagaped anus. `;
		} else if (child.anus > 2) {
			r += `Gaping anus. `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortAge(child) {
		r += `<span class="pink">`;
		if (V.showAgeDetail === 1) {
			r += child.actualAge;
		}
		if (child.actualAge !== child.physicalAge) {
			r += ` w ${child.physicalAge}y-bdy`;
		}
		if (child.visualAge !== child.physicalAge) {
			r += ` Lks${child.visualAge}`;
		}
		r += `</span>`;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortFace(child) {
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortEyes(child) {
		if (!canSee(child)) {
			r += `<span class="red">Blind</span> `;
		} else if (!canSeePerfectly(child)) {
			r += `<span class="yellow">Sight-</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortEars(child) {
		if (child.hears === -2) {
			r += `<span class="red">Deaf</span> `;
		} else if ((child.hears === -1) && (child.earwear !== "hearing aids")) {
			r += `<span class="yellow">Hearing-</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortLips(child) {
		if (child.lips > 95) {
			r += `Facepussy`;
		} else if (child.lips > 70) {
			r += `Lips+++${V.summaryStats ? `[${child.lips}]` : ''}`;
		} else if (child.lips > 40) {
			r += `Lips++${V.summaryStats ? `[${child.lips}]` : ''}`;
		} else if (child.lips > 20) {
			r += `Lips+${V.summaryStats ? `[${child.lips}]` : ''}`;
		} else if (child.lips > 10) {
			r += `Lips${V.summaryStats ? `[${child.lips}]` : ''}`;
		} else {
			r += `<span class="red">Lips-${V.summaryStats ? `[${child.lips}]` : ''}</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortTeeth(child) {
		if (child.teeth === "crooked") {
			r += `<span class="yellow">Cr Teeth</span> `;
		} else if (child.teeth === "gapped") {
			r += `<span class="yellow">Gap</span> `;
		} else if (child.teeth === "cosmetic braces") {
			r += `Cos Braces`;
		} else if (child.teeth === "straightening braces") {
			r += `Braces`;
		} else if (child.teeth === "removable") {
			r += `Rem Teeth`;
		} else if (child.teeth === "pointy") {
			r += `Fangs`;
		} else if (child.teeth === "baby") {
			r += `Baby`;
		} else if (child.teeth === "mixed") {
			r += `Mixed`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortMuscles(child) {
		if (child.muscles > 95) {
			r += `Musc++${V.summaryStats ? `[${child.muscles}]`: ''}`;
		} else if (child.muscles > 50) {
			r += `Musc+${V.summaryStats ? `[${child.muscles}]`: ''}`;
		} else if (child.muscles > 5) {
			r += `Fit${V.summaryStats ? `[${child.muscles}]`: ''}`;
		} else if (child.muscles > -6) {
			r += `Soft${V.summaryStats ? `[${child.muscles}]`: ''}`;
		} else if (child.muscles > -31) {
			if (!FutureSocieties.isActive('FSPhysicalIdealist')) {
				r += `<span class="red">Weak</span>${V.summaryStats ? `[${child.muscles}]`: ''}`;
			} else {
				r += `Soft${V.summaryStats ? `[${child.muscles}]`: ''}`;
			}
		} else if (child.muscles > -96) {
			if (!FutureSocieties.isActive('FSPhysicalIdealist')) {
				r += `<span class="red">Weak+</span>${V.summaryStats ? `[${child.muscles}]`: ''}`;
			} else {
				r += `Soft+${V.summaryStats ? `[${child.muscles}]`: ''}`;
			}
		} else {
			r += `<span class="red">Weak++</span>${V.summaryStats ? `[${child.muscles}]`: ''}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortVoice(child) {
		if (child.voice === 0) {
			r += `<span class="red">Mute</span> `;
		} else {
			if (child.accent === 3) {
				r += `<span class="red">Acc--</span> `;
			} else if (child.accent === 2) {
				r += `Acc-`;
			} else if (child.accent === 4) {
				r += `Acc--`;
			} else if (child.accent === 1) {
				r += `<span class="pink">Acc</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortTitsAss(child) {
		r += `<span class="pink">`;
		if ((child.boobs >= 12000) && (child.butt > 9)) {
			r += `T&A+++`;
		} else if ((child.boobs > 4000) && (child.butt > 8)) {
			r += `T&A++`;
		} else if ((child.boobs > 2000) && (child.butt > 6)) {
			r += `T&A+`;
		} else if ((child.boobs > 800) && (child.butt > 4)) {
			r += `T&A`;
		} else if ((child.boobs < 500) && (child.butt < 3) && (child.weight <= 10) && (child.muscles <= 30)) {
			r += `Girlish`;
		} else if (child.boobs >= 12000) {
			r += `Boobs+++`;
		} else if (child.boobs > 4000) {
			r += `Boobs++`;
		} else if (child.boobs > 2000) {
			r += `Boobs+`;
		} else if (child.boobs > 800) {
			r += `Boobs`;
		} else if (child.butt > 9) {
			r += `Ass+++`;
		} else if (child.butt > 8) {
			r += `Ass++`;
		} else if (child.butt > 6) {
			r += `Ass+`;
		} else if (child.butt > 4) {
			r += `Ass`;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortHips(child) {
		r += `<span class="red">`;
		if (child.hips < -1) {
			if (child.butt > 2 && (V.arcologies[0].FSTransformationFetishist < 20 || !FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSHedonisticDecadence < 20 || !FutureSocieties.isActive('FSHedonisticDecadence'))) {
				r += `Disp+`;
			}
		} else if (child.hips < 0) {
			if (child.butt > 4 && (V.arcologies[0].FSTransformationFetishist < 20 || !FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSHedonisticDecadence < 20 || !FutureSocieties.isActive('FSHedonisticDecadence'))) {
				r += `Disp+`;
			}
		} else if (child.hips > 2) {
			if (child.butt <= 8) {
				r += `Disp-`;
			}
		} else if (child.hips > 1) {
			if (child.butt <= 3 && (!FutureSocieties.isActive('FSSlimnessEnthusiast') || (child.boobs >= 500))) {
				r += `Disp-`;
			}
		} else if (child.hips > 0) {
			if (child.butt > 8) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || !FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSHedonisticDecadence < 20 || !FutureSocieties.isActive('FSHedonisticDecadence'))) {
					r += `Disp+`;
				}
			} else if (child.butt <= 2 && (!FutureSocieties.isActive('FSSlimnessEnthusiast') || (child.boobs >= 500))) {
				r += `Disp-`;
			}
		} else {
			if (child.butt > 6) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || !FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSHedonisticDecadence < 20 || !FutureSocieties.isActive('FSHedonisticDecadence'))) {
					r += `Disp+`;
				}
			} else if (child.butt <= 1 && (!FutureSocieties.isActive('FSSlimnessEnthusiast') || (child.boobs >= 500))) {
				r += `Disp-`;
			}
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortWaist(child) {
		if (child.waist > 95) {
			r += `<span class="red">Wst---${V.summaryStats ? `[${child.waist}]` : ''}</span> `;
		} else if (child.waist > 40) {
			r += `<span class="red">Wst--${V.summaryStats ? `[${child.waist}]`: ''}</span> `;
		} else if (child.waist > 10) {
			r += `<span class="red">Wst-${V.summaryStats ? `[${child.waist}]` : ''}</span> `;
		} else if (child.waist >= -10) {
			r += `Wst${V.summaryStats ? `[${child.waist}]`: ''}`;
		} else if (child.waist >= -40) {
			r += `<span class="pink">Wst+${V.summaryStats ? `[${child.waist}]` : ''}</span> `;
		} else if (child.waist >= -95) {
			r += `<span class="pink">Wst++${V.summaryStats ? `[${child.waist}]` : ''}</span> `;
		} else {
			r += `<span class="pink">Wst+++${V.summaryStats ? `[${child.waist}]`: ''}</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortImplants(child) {
		r += `<span class="pink">`;
		if ((child.boobsImplant === 0) && (child.buttImplant === 0) && (child.waist >= -95) && (child.lipsImplant === 0) && (child.faceImplant <= 5) && (child.bellyImplant === -1)) {
			r += `Natr`;
		} else {
			r += `Impl`;
		}
		r += `</span>`;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortLactation(child) {
		if (child.lactation === 1) {
			r += `Lact`;
		} else if (child.lactation === 2) {
			r += `Lact++`;
		}
	}

	// /**	TODO:
	//  * @param {App.Entity.SlaveState} child
	//  */
	// function shortMods(child) {
	// 	const modScore = SlaveStatsChecker.modScore(child);
	// 	if (child.piercing.corset.weight === 0 && modScore.piercing < 3 && modScore.tat < 2) {
	// 		return;
	// 	} else if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
	// 		r += `Mods++`;
	// 	} else if (modScore.total > 7) {
	// 		r += `Mods+`;
	// 	} else {
	// 		r += `Mods`;
	// 	}
	// 	if (!jQuery.isEmptyObject(child.brand)) {
	// 		r += `Br`;
	// 	}
	// }

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longAge(child) {
		r += `<span class="pink">`;
		if (V.showAgeDetail === 1) {
			r += `Age ` + `${num(child.actualAge)}` + `. `;
		} else if (child.actualAge >= 40) {
			r += `Forties. `;
		} else if (child.actualAge >= 35) {
			r += `Late thirties. `;
		} else if (child.actualAge >= 30) {
			r += `Early thirties. `;
		} else if (child.actualAge >= 25) {
			r += `Late twenties. `;
		} else if (child.actualAge >= 20) {
			r += `Early twenties. `;
		} else if (child.actualAge >= 19) {
			r += `Nineteen. `;
		} else if (child.actualAge >= 18) {
			r += `Eighteen. `;
		} else {
			r += `Underage. `;
		}
		r += `</span>`;

		// If no NCS, then do the standard - however, due to the wrinkles of the Incubator, as long as visual age is greater
		// than or equal to physical age, we do the old physical body/Looks for fresh out of the can NCS slaves.

		if (((child.geneMods.NCS === 0) || (child.visualAge >= child.physicalAge))) {
			if (child.actualAge !== child.physicalAge) {
				r += `${child.physicalAge}` + ` year old body. `;
			}
			if (child.visualAge !== child.physicalAge) {
				r += `Looks ` + `${child.visualAge}` + `. `;
			}
		} else {
			// Now the rub. The use of physical Age for the year old body above, basically conflicts with the changes
			// that NCS introduces, so here to *distinguish* the changes, we use visual age with the 'year old body'
			// and appears, for exampChild release from incubator at age 10, Her summary would show, 'Age 0. 10
			// year old body.' But if she's given NCS a few weeks after release, while she's still before her first
			// birthday, it'll appear the same. But once her birthday fires, if we ran with the above code it would
			// say: 'Age 1. 11 year old body.' -- this conflicts with the way NCS works though, because she hasn't
			// visually aged, so our change here makes it say 'Age 1. Appears to have a 10 year old body.'

			r += `Appears to have a ` + `${child.visualAge}` + ` year old body. `;
		}
		if (child.geneMods.NCS === 1) {
			r += `(<span class="orange">NCS</span>) `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longFace(child) {
		if (child.face < -95) {
			r += `<span class="red">Very ugly${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else if (child.face < -40) {
			r += `<span class="red">Ugly${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else if (child.face < -10) {
			r += `<span class="red">Unattractive${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else if (child.face <= 10) {
			r += `Average${V.summaryStats ? `[${child.face}]`: ''}`;
		} else if (child.face <= 40) {
			r += `<span class="pink">Attractive${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else if (child.face <= 95) {
			r += `<span class="pink">Beautiful${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		} else {
			r += `<span class="pink">Very beautiful${V.summaryStats ? `[${child.face}]`: ''}</span> `;
		}
		r += ` ${child.faceShape} face. `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longEyes(child) {
		if (!canSee(child)) {
			r += `<span class="red">Blind.</span> `;
		} else if (!canSeePerfectly(child)) {
			r += `<span class="yellow">Nearsighted.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longEars(child) {
		if (child.hears <= -2) {
			r += `<span class="red">Deaf.</span> `;
		} else if ((child.hears === -1) && (child.earwear !== "hearing aids")) {
			r += `<span class="yellow">Hard of hearing.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longLips(child) {
		if (child.lips > 95) {
			r += `Facepussy${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else if (child.lips > 70) {
			r += `Huge lips${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else if (child.lips > 40) {
			r += `Big lips${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else if (child.lips > 20) {
			r += `Pretty lips${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else if (child.lips > 10) {
			r += `Normal lips${V.summaryStats ? `[${child.lips}]`: ''}. `;
		} else {
			r += `<span class="red">Thin lips${V.summaryStats ? `[${child.lips}]`: ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longTeeth(child) {
		if (child.teeth === "crooked") {
			r += `<span class="yellow">Crooked teeth.</span> `;
		} else if (child.teeth === "gapped") {
			r += `<span class="yellow">Tooth gap.</span> `;
		} else if (child.teeth === "cosmetic braces") {
			r += `Cosmetic braces. `;
		} else if (child.teeth === "straightening braces") {
			r += `Braces. `;
		} else if (child.teeth === "removable") {
			r += `Removable teeth. `;
		} else if (child.teeth === "pointy") {
			r += `Sharp fangs. `;
		} else if (child.teeth === "baby") {
			r += `Baby teeth. `;
		} else if (child.teeth === "mixed") {
			r += `Mixed teeth. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longMuscles(child) {
		if (child.muscles > 95) {
			r += `Hugely muscular${V.summaryStats ? `[${child.muscles}]` : ''}. `;
		} else if (child.muscles > 50) {
			r += `Muscular${V.summaryStats ? `[${child.muscles}]`: ''}. `;
		} else if (child.muscles > 5) {
			r += `Fit${V.summaryStats ? `[${child.muscles}]`: ''}. `;
		} else if (child.muscles > -6) {
			r += `Soft${V.summaryStats ? `[${child.muscles}]`: ''}. `;
		} else if (child.muscles > -31) {
			if (!FutureSocieties.isActive('FSPhysicalIdealist')) {
				r += `<span class="red">Weak${V.summaryStats ? `[${child.muscles}]`: ''}.</span> `;
			} else {
				r += `Weak${V.summaryStats ? `[${child.muscles}]`: ''}. `;
			}
		} else if (child.muscles > -96) {
			if (!FutureSocieties.isActive('FSPhysicalIdealist')) {
				r += `<span class="red">Very weak${V.summaryStats ? `[${child.muscles}]`: ''}.</span> `;
			} else {
				r += `Very weak${V.summaryStats ? `[${child.muscles}]`: ''}. `;
			}
		} else {
			r += `<span class="red">Frail${V.summaryStats ? `[${child.muscles}]`: ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longVoice(child) {
		if (child.voice === 0) {
			r += `<span class="red">Mute.</span> `;
		} else {
			if (child.accent === 3) {
				r += `<span class="red">Bad accent.</span> `;
			} else if (child.accent === 4) {
				r += `<span class="red">No language skills.</span> `;
			} else if (child.accent === 2) {
				r += `Accent. `;
			} else if (child.accent === 1) {
				r += `<span class="pink">Cute accent.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longTitsAss(child) {
		r += `<span class="pink">`;
		if ((child.boobs >= 12000) && (child.butt > 9)) {
			r += `Hyper T&A. `;
		} else if ((child.boobs > 4000) && (child.butt > 8)) {
			r += `Enormous T&A. `;
		} else if ((child.boobs > 2000) && (child.butt > 6)) {
			r += `Huge T&A. `;
		} else if ((child.boobs > 800) && (child.butt > 4)) {
			r += `Big T&A. `;
		} else if ((child.boobs < 500) && (child.butt < 3) && (child.weight <= 10) && (child.muscles <= 30)) {
			r += `Girlish figure. `;
		} else if (child.boobs >= 12000) {
			r += `Immobilizing tits. `;
		} else if (child.boobs > 4000) {
			r += `Monstrous tits. `;
		} else if (child.boobs > 2000) {
			r += `Huge tits. `;
		} else if (child.boobs > 800) {
			r += `Big tits. `;
		} else if (child.butt > 9) {
			r += `Hyper ass. `;
		} else if (child.butt > 8) {
			r += `Titanic ass. `;
		} else if (child.butt > 6) {
			r += `Huge ass. `;
		} else if (child.butt > 4) {
			r += `Big ass. `;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longHips(child) {
		r += `<span class="red">`;
		if (child.hips < -1) {
			if (child.butt > 2 && (V.arcologies[0].FSTransformationFetishist < 20 || !FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSHedonisticDecadence < 20 || !FutureSocieties.isActive('FSHedonisticDecadence')) && (V.arcologies[0].FSAssetExpansionist < 20 || !FutureSocieties.isActive('FSAssetExpansionist'))) {
				r += `Disproportionately big butt. `;
			}
		} else if (child.hips < 0) {
			if (child.butt > 4 && (V.arcologies[0].FSTransformationFetishist < 20 || !FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSHedonisticDecadence < 20 || !FutureSocieties.isActive('FSHedonisticDecadence')) && (V.arcologies[0].FSAssetExpansionist < 20 || !FutureSocieties.isActive('FSAssetExpansionist'))) {
				r += `Disproportionately big butt. `;
			}
		} else if (child.hips > 2) {
			if (child.butt <= 8) {
				r += `Disproportionately small butt. `;
			}
		} else if (child.hips > 1) {
			if (child.butt <= 3 && ((!FutureSocieties.isActive('FSSlimnessEnthusiast')) || (child.boobs >= 500))) {
				r += `Disproportionately small butt. `;
			}
		} else if (child.hips > 0) {
			if (child.butt > 8) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || !FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSHedonisticDecadence < 20 || !FutureSocieties.isActive('FSHedonisticDecadence')) && (V.arcologies[0].FSAssetExpansionist < 20 || !FutureSocieties.isActive('FSAssetExpansionist'))) {
					r += `Disproportionately big butt. `;
				}
			} else if (child.butt <= 2 && ((!FutureSocieties.isActive('FSSlimnessEnthusiast')) || (child.boobs >= 500))) {
				r += `Disproportionately small butt. `;
			}
		} else {
			if (child.butt > 6) {
				if ((V.arcologies[0].FSTransformationFetishist < 20 || !FutureSocieties.isActive('FSTransformationFetishist')) && (V.arcologies[0].FSHedonisticDecadence < 20 || !FutureSocieties.isActive('FSHedonisticDecadence')) && (V.arcologies[0].FSAssetExpansionist < 20 || !FutureSocieties.isActive('FSAssetExpansionist'))) {
					r += `Disproportionately big butt. `;
				}
			} else if (child.butt <= 1 && ((!FutureSocieties.isActive('FSSlimnessEnthusiast')) || (child.boobs >= 500))) {
				r += `Disproportionately small butt. `;
			}
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longWaist(child) {
		if (child.waist > 95) {
			r += `<span class="red">Masculine waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else if (child.waist > 40) {
			r += `<span class="red">Ugly waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else if (child.waist > 10) {
			r += `<span class="red">Unattractive waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else if (child.waist >= -10) {
			r += `Average waist${V.summaryStats ? `[${child.waist}]`: ''}. `;
		} else if (child.waist >= -40) {
			r += `<span class="pink">Feminine waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else if (child.waist >= -95) {
			r += `<span class="pink">Hourglass waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		} else {
			r += `<span class="pink">Absurdly narrow waist${V.summaryStats ? `[${child.waist}]`: ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longImplants(child) {
		r += `<span class="pink">`;
		if ((child.boobsImplant !== 0) || (child.buttImplant !== 0) || (child.lipsImplant !== 0) || (child.bellyImplant !== -1)) {
			r += `Implants. `;
		} else if ((child.faceImplant >= 30) || (child.waist < -95)) {
			r += `Surgery enhanced. `;
		} else {
			r += `All natural. `;
		}
		r += `</span>`;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longLactation(child) {
		if (child.lactation === 1) {
			r += `Lactating naturally. `;
		} else if (child.lactation === 2) {
			r += `Heavy lactation. `;
		}
	}

	// /**	TODO:
	//  * @param {App.Entity.SlaveState} child
	//  */
	// function longMods(child) {
	// 	const modScore = SlaveStatsChecker.modScore(child);
	// 	if (child.piercing.corset.weight === 0 && modScore.piercing < 3 && modScore.tat < 2) {
	// 		return;
	// 	} else if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
	// 		r += `Extensive body mods. `;
	// 	} else if (modScore.total > 7) {
	// 		r += `Noticeable body mods. `;
	// 	} else {
	// 		r += `Light body mods. `;
	// 	}
	// }

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortIntelligence(child) {
		let intelligence = child.intelligence;
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSexSkills(child) { // Resync this with slaveSummary
		let SSkills = child.skill.anal + child.skill.oral;
		r += `<span class="skill">`;
		if (((SSkills + child.skill.whoring + child.skill.entertainment) >= 400) && ((child.vagina < 0) || (child.skill.vaginal >= 100))) {
			r += `MSS`;
		} else {
			SSkills += child.skill.vaginal;
			SSkills = Math.trunc(SSkills);
			if (SSkills > 180) {
				r += `S++`;
			} else if ((SSkills > 120) && (child.vagina < 0)) {
				r += `Sh++`;
			} else if (SSkills > 90) {
				r += `S+`;
			} else if (SSkills > 30) {
				r += `S`;
			} else {
				r += `S-`;
			}
			if (V.summaryStats) {
				r += `[${SSkills}] `;
			}
			r += " ";
			if (child.skill.whoring >= 100) {
				r += `W+++`;
			} else if (child.skill.whoring > 60) {
				r += `W++`;
			} else if (child.skill.whoring > 30) {
				r += `W+`;
			} else if (child.skill.whoring > 10) {
				r += `W`;
			}
			if (child.skill.whoring > 10) {
				if (V.summaryStats) {
					r += `[${child.skill.whoring}] `;
				}
			}
			r += " ";
			if (child.skill.entertainment >= 100) {
				r += `E+++`;
			} else if (child.skill.entertainment > 60) {
				r += `E++`;
			} else if (child.skill.entertainment > 30) {
				r += `E+`;
			} else if (child.skill.entertainment > 10) {
				r += `E`;
			}
			if (child.skill.entertainment > 10) {
				if (V.summaryStats) {
					r += `[${child.skill.entertainment}] `;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortPrestige(child) {
		if (child.prestige > 0) {
			r += `<span class="green">`;
			if (child.prestige > 2) {
				r += `Prest++`;
			} else if (child.prestige === 2) {
				r += `Prest+`;
			} else if (child.prestige === 1) {
				r += `Prest`;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortPornPrestige(child) {
		if (child.pornPrestige > 0) {
			r += `<span class="green">`;
			if (child.pornPrestige > 2) {
				r += `PPrest++`;
			} else if (child.pornPrestige === 2) {
				r += `PPrest+`;
			} else if (child.pornPrestige === 1) {
				r += `PPrest`;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longIntelligence(child) {
		let intelligence = child.intelligence;
		if (child.hasOwnProperty("intelligenceImplant")) {
			intelligence += child.intelligenceImplant;
		}
		if (child.fetish === Fetish.MINDBROKEN) {
			return;
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 30) {
			if (intelligence >= 130) {
				r += `<span class="deepskyblue">Genius${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 95) {
				r += `<span class="deepskyblue">Brilliant, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">Very smart, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">Smart, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -15) {
				r += `Average intelligence, well educated${V.summaryStats ? `[${intelligence}]` : ''}. `;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">Slow, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">Very slow, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else {
				r += `<span class="orangered">Moronic, well educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			}
		} else if (child.hasOwnProperty("intelligenceImplant") && child.intelligenceImplant >= 15) {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">Brilliant, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">Very smart, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">Smart, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -15) {
				r += `Average intelligence, educated${V.summaryStats ? `[${intelligence}]` : ''}. `;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">Slow, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">Very slow, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else {
				r += `<span class="orangered">Moronic, educated${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			}
		} else {
			if (intelligence > 95) {
				r += `<span class="deepskyblue">Brilliant${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 50) {
				r += `<span class="deepskyblue">Very smart${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence > 15) {
				r += `<span class="deepskyblue">Smart${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -15) {
				r += `Average intelligence${V.summaryStats ? `[${intelligence}]` : ''}. `;
			} else if (intelligence >= -50) {
				r += `<span class="orangered">Slow${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else if (intelligence >= -95) {
				r += `<span class="orangered">Very slow${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			} else {
				r += `<span class="orangered">Moronic${V.summaryStats ? `[${intelligence}]` : ''}.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSexSkills(child) { // Resync this with slaveSummary
		let SSkills = (child.skill.anal + child.skill.oral);
		r += `<span class="skill">`;
		if (((SSkills + child.skill.whoring + child.skill.entertainment) >= 400) && ((child.vagina < 0) || (child.skill.vaginal >= 100))) {
			r += `Masterful Whore. `;
		} else {
			SSkills += child.skill.vaginal;
			if (SSkills > 180) {
				r += `Sex master${V.summaryStats ? `[${Math.trunc(SSkills)}]`: ''}. `;
			} else if ((SSkills > 120) && (child.vagina < 0)) {
				r += `Masterful shemale${V.summaryStats ? `[${Math.trunc(SSkills)}]`: ''}. `;
			} else if (SSkills > 90) {
				r += `Sexual expert${V.summaryStats ? `[${Math.trunc(SSkills)}]`: ''}. `;
			} else if (SSkills > 30) {
				r += `Sexually skilled${V.summaryStats ? `[${Math.trunc(SSkills)}]` : ''}. `;
			} else {
				r += `Sexually unskilled${V.summaryStats ? `[${Math.trunc(SSkills)}]` : ''}. `;
			}
			r += " ";
			if (child.skill.whoring >= 100) {
				r += `Masterful whore${V.summaryStats ? `[${child.skill.whoring}]`: ''}. `;
			} else if (child.skill.whoring >= 60) {
				r += `Expert whore${V.summaryStats ? `[${child.skill.whoring}]`: ''}. `;
			} else if (child.skill.whoring >= 30) {
				r += `Skilled whore${V.summaryStats ? `[${child.skill.whoring}]`: ''}. `;
			} else if (child.skill.whoring >= 10) {
				r += `Basic whore${V.summaryStats ? `[${child.skill.whoring}]`: ''}. `;
			}
			r += " ";
			if (child.skill.entertainment >= 100) {
				r += `Masterful entertainer${V.summaryStats ? `[${child.skill.entertainment}]`: ''}. `;
			} else if (child.skill.entertainment >= 60) {
				r += `Expert entertainer${V.summaryStats ? `[${child.skill.entertainment}]`: ''}. `;
			} else if (child.skill.entertainment >= 30) {
				r += `Skilled entertainer${V.summaryStats ? `[${child.skill.entertainment}]`: ''}. `;
			} else if (child.skill.entertainment >= 10) {
				r += `Basic entertainer${V.summaryStats ? `[${child.skill.entertainment}]`: ''}. `;
			}
			r += " ";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longPrestige(child) {
		if (child.prestige > 0) {
			r += `<span class="green">`;
			if (child.prestige > 2) {
				r += `Extremely prestigious. `;
			} else if (child.prestige === 2) {
				r += `Very prestigious. `;
			} else if (child.prestige === 1) {
				r += `Prestigious. `;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longPornPrestige(child) {
		if (child.pornPrestige > 0) {
			r += `<span class="green">`;
			if (child.pornPrestige > 2) {
				r += `Porn star. `;
			} else if (child.pornPrestige === 2) {
				r += `Porn slut. `;
			} else if (child.pornPrestige === 1) {
				r += `Porn amateur. `;
			}
			r += `</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortFetish(child) {
		r += `<span class="lightcoral">`;
		switch (child.fetish) {
			case "submissive":
				if (child.fetishStrength > 95) {
					r += `Sub++`;
				} else if (child.fetishStrength > 60) {
					r += `Sub+`;
				} else {
					r += `Sub`;
				}
				break;
			case "cumslut":
				if (child.fetishStrength > 95) {
					r += `Oral++`;
				} else if (child.fetishStrength > 60) {
					r += `Oral+`;
				} else {
					r += `Oral`;
				}
				break;
			case "humiliation":
				if (child.fetishStrength > 95) {
					r += `Humil++`;
				} else if (child.fetishStrength > 60) {
					r += `Humil+`;
				} else {
					r += `Humil`;
				}
				break;
			case "buttslut":
				if (child.fetishStrength > 95) {
					r += `Anal++`;
				} else if (child.fetishStrength > 60) {
					r += `Anal+`;
				} else {
					r += `Anal`;
				}
				break;
			case "boobs":
				if (child.fetishStrength > 95) {
					r += `Boobs++`;
				} else if (child.fetishStrength > 60) {
					r += `Boobs+`;
				} else {
					r += `Boobs`;
				}
				break;
			case "sadist":
				if (child.fetishStrength > 95) {
					r += `Sadist++`;
				} else if (child.fetishStrength > 60) {
					r += `Sadist+`;
				} else {
					r += `Sadist`;
				}
				break;
			case "masochist":
				if (child.fetishStrength > 95) {
					r += `Pain++`;
				} else if (child.fetishStrength > 60) {
					r += `Pain+`;
				} else {
					r += `Pain`;
				}
				break;
			case "dom":
				if (child.fetishStrength > 95) {
					r += `Dom++`;
				} else if (child.fetishStrength > 60) {
					r += `Dom+`;
				} else {
					r += `Dom`;
				}
				break;
			case "pregnancy":
				if (child.fetishStrength > 95) {
					r += `Preg++`;
				} else if (child.fetishStrength > 60) {
					r += `Preg+`;
				} else {
					r += `Preg`;
				}
				break;
			default:
				r += `Vanilla`;
				break;
		}
		if (V.summaryStats) {
			r += `[${child.fetishStrength}]`;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortAttraction(child) {
		if (child.attrXY <= 5) {
			r += `<span class="red">XY---${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXY <= 15) {
			r += `<span class="red">XY--${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXY <= 35) {
			r += `<span class="red">XY-${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXY <= 65) {
			r += `XY${V.summaryStats ? `[${child.attrXY}]`: ''}`;
		} else if (child.attrXY <= 85) {
			r += `<span class="green">XY+${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXY <= 95) {
			r += `<span class="green">XY++${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		} else if (child.attrXX > 95) {
			if (child.energy <= 95) {
				r += `<span class="green">Omni!</span> `;
			} else {
				r += `<span class="green">Omni+Nympho!!</span> `;
			}
		} else {
			r += `<span class="green">XY+++${V.summaryStats ? `[${child.attrXY}]`: ''}</span> `;
		}
		if (child.attrXX <= 5) {
			r += `<span class="red">XX---${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXX <= 15) {
			r += `<span class="red">XX--${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXX <= 35) {
			r += `<span class="red">XX-${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXX <= 65) {
			r += `XX${V.summaryStats ? `[${child.attrXX}]`: ''}`;
		} else if (child.attrXX <= 85) {
			r += `<span class="green">XX+${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXX <= 95) {
			r += `<span class="green">XX++${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		} else if (child.attrXY <= 95) {
			r += `<span class="green">XX+++${V.summaryStats ? `[${child.attrXX}]`: ''}</span> `;
		}
		if (child.energy > 95) {
			if ((child.attrXY <= 95) || (child.attrXX <= 95)) {
				r += `<span class="green">Nympho!</span> `;
			}
		} else if (child.energy > 80) {
			r += `<span class="green">SD++${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		} else if (child.energy > 60) {
			r += `<span class="green">SD+${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		} else if (child.energy > 40) {
			r += `<span class="yellow">SD${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		} else if (child.energy > 20) {
			r += `<span class="red">SD-${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		} else {
			r += `<span class="red">SD--${V.summaryStats ? `[${child.energy}]`: ''}</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSmartFetish(child) {
		if (child.fetishKnown === 1) {
			if (child.clitSetting === "off") {
				r += `SP-`;
			} else if (((child.fetish !== "submissive") || (child.fetishStrength <= 95)) && (child.clitSetting === "submissive")) {
				r += `SP:sub`;
			} else if (((child.fetish !== "cumslut") || (child.fetishStrength <= 95)) && (child.clitSetting === "oral")) {
				r += `SP:oral`;
			} else if (((child.fetish !== "humiliation") || (child.fetishStrength <= 95)) && (child.clitSetting === "humiliation")) {
				r += `SP:humil`;
			} else if (((child.fetish !== "buttslut") || (child.fetishStrength <= 95)) && (child.clitSetting === "anal")) {
				r += `SP:anal`;
			} else if (((child.fetish !== "boobs") || (child.fetishStrength <= 95)) && (child.clitSetting === "boobs")) {
				r += `SP:boobs`;
			} else if (((child.fetish !== "sadist") || (child.fetishStrength <= 95)) && (child.clitSetting === "sadist")) {
				r += `SP:sade`;
			} else if (((child.fetish !== "masochist") || (child.fetishStrength <= 95)) && (child.clitSetting === "masochist")) {
				r += `SP:pain`;
			} else if (((child.fetish !== "dom") || (child.fetishStrength <= 95)) && (child.clitSetting === "dom")) {
				r += `SP:dom`;
			} else if (((child.fetish !== "pregnancy") || (child.fetishStrength <= 95)) && (child.clitSetting === "pregnancy")) {
				r += `SP:preg`;
			} else if (((child.fetish !== Fetish.NONE) && (child.clitSetting === "vanilla"))) {
				r += `SP:vanilla`;
			} else if ((child.energy <= 95) && (child.clitSetting === "all")) {
				r += `SP:all`;
			} else if ((child.energy > 5) && (child.clitSetting === "none")) {
				r += `SP:none`;
			} else if (!["anti-men", "anti-women", "men", "women"].includes(child.clitSetting)) {
				r += `SP:monitoring`;
			}
		} else {
			switch (child.clitSetting) {
				case "off":
					r += `SP-`;
					break;
				case "submissive":
					r += `SP:sub`;
					break;
				case "oral":
					r += `SP:oral`;
					break;
				case "humiliation":
					r += `SP:humil`;
					break;
				case "anal":
					r += `SP:anal`;
					break;
				case "boobs":
					r += `SP:boobs`;
					break;
				case "sadist":
					r += `SP:sade`;
					break;
				case "masochist":
					r += `SP:pain`;
					break;
				case "dom":
					r += `SP:dom`;
					break;
				case "pregnancy":
					r += `SP:pregnancy`;
					break;
				case "vanilla":
					r += `SP:vanilla`;
					break;
				case "all":
					r += `SP:all`;
					break;
				case "none":
					r += `SP:none`;
					break;
				default:
					r += `SP:monitor`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSmartAttraction(child) {
		if (child.attrKnown === 1) {
			if (child.clitSetting === "women") {
				if (child.attrXX < 95) {
					r += `SP:women`;
				} else {
					r += `SP:monitoring`;
				}
			} else if (child.clitSetting === "men") {
				if (child.attrXY < 95) {
					r += `SP:men`;
				} else {
					r += `SP:monitoring`;
				}
			} else if (child.clitSetting === "anti-women") {
				if (child.attrXX > 0) {
					r += `SP:anti-women`;
				} else {
					r += `SP:monitoring`;
				}
			} else if (child.clitSetting === "anti-men") {
				if (child.attrXY > 0) {
					r += `SP:anti-men`;
				} else {
					r += `SP:monitoring`;
				}
			}
		} else {
			if (child.clitSetting === "women") {
				r += `SP:women`;
			} else if (child.clitSetting === "men") {
				r += `SP:men`;
			} else if (child.clitSetting === "anti-women") {
				r += `SP:anti-women`;
			} else if (child.clitSetting === "anti-men") {
				r += `SP:anti-men`;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortBehaviorFlaw(child) {
		r += `<span class="red">`;
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSexFlaw(child) {
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortBehaviorQuirk(child) {
		r += `<span class="green">`;
		switch (child.behavioralQuirk) {
			case "confident":
				r += `Confid`;
				break;
			case "cutting":
				r += `Cutting`;
				break;
			case "funny":
				r += `Funny`;
				break;
			case "fitness":
				r += `Fit`;
				break;
			case "adores women":
				r += `Women+`;
				break;
			case "adores men":
				r += `Men+`;
				break;
			case "insecure":
				r += `Insec`;
				break;
			case "sinful":
				r += `Sinf`;
				break;
			case "advocate":
				r += `Advoc`;
				break;
			default:
				child.behavioralQuirk = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortSexQuirk(child) {
		switch (child.sexualQuirk) {
			case "gagfuck queen":
				r += `Gagfuck`;
				break;
			case "painal queen":
				r += `Painal`;
				break;
			case "strugglefuck queen":
				r += `Struggle`;
				break;
			case "tease":
				r += `Tease`;
				break;
			case "romantic":
				r += `Romantic`;
				break;
			case "perverted":
				r += `Perverted`;
				break;
			case "caring":
				r += `Caring`;
				break;
			case "unflinching":
				r += `Unflinch`;
				break;
			case "size queen":
				r += `SizeQ`;
				break;
			default:
				child.sexualQuirk = "none";
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longFetish(child) {
		r += `<span class="lightcoral">`;
		switch (child.fetish) {
			case "submissive":
				if (child.fetishStrength > 95) {
					r += `Complete submissive${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Submissive${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Submissive tendencies${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "cumslut":
				if (child.fetishStrength > 95) {
					r += `Cumslut${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Oral fixation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Prefers oral${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "humiliation":
				if (child.fetishStrength > 95) {
					r += `Humiliation slut${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Exhibitionist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Interest in humiliation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "buttslut":
				if (child.fetishStrength > 95) {
					r += `Buttslut${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Anal fixation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Prefers anal${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "boobs":
				if (child.fetishStrength > 95) {
					r += `Boobslut${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Breast fixation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Loves boobs${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "sadist":
				if (child.fetishStrength > 95) {
					r += `Complete sadist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Sadist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Sadistic tendencies${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "masochist":
				if (child.fetishStrength > 95) {
					r += `Complete masochist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Masochist${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Masochistic tendencies${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "dom":
				if (child.fetishStrength > 95) {
					r += `Complete dom${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Dominant${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Dominant tendencies${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			case "pregnancy":
				if (child.fetishStrength > 95) {
					r += `Pregnancy fetish ${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else if (child.fetishStrength > 60) {
					r += `Pregnancy kink${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				} else {
					r += `Interest in impregnation${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				}
				break;
			default:
				r += `Sexually vanilla${V.summaryStats ? `[${child.fetishStrength}]` : ''}. `;
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longAttraction(child) {
		if (child.attrXY <= 5) {
			r += `<span class="red">Disgusted by men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXY <= 15) {
			r += `<span class="red">Turned off by men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXY <= 35) {
			r += `<span class="red">Not attracted to men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXY <= 65) {
			r += `Indifferent to men${V.summaryStats ? `[${child.attrXY}]` : ''}, `;
		} else if (child.attrXY <= 85) {
			r += `<span class="green">Attracted to men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXY <= 95) {
			r += `<span class="green">Aroused by men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		} else if (child.attrXX > 95) {
			if (child.energy <= 95) {
				r += `<span class="green">Omnisexual!</span> `;
			} else {
				r += `<span class="green">Omnisexual nymphomaniac!</span> `;
			}
		} else {
			r += `<span class="green">Passionate about men${V.summaryStats ? `[${child.attrXY}]` : ''},</span> `;
		}
		if (child.attrXX <= 5) {
			r += `<span class="red">disgusted by women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXX <= 15) {
			r += `<span class="red">turned off by women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXX <= 35) {
			r += `<span class="red">not attracted to women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXX <= 65) {
			r += `indifferent to women${V.summaryStats ? `[${child.attrXX}]` : ''}. `;
		} else if (child.attrXX <= 85) {
			r += `<span class="green">attracted to women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXX <= 95) {
			r += `<span class="green">aroused by women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		} else if (child.attrXY <= 95) {
			r += `<span class="green">passionate about women${V.summaryStats ? `[${child.attrXX}]` : ''}.</span> `;
		}
		if (child.energy > 95) {
			if ((child.attrXY <= 95) || (child.attrXX <= 95)) {
				r += `<span class="green">Nymphomaniac!</span> `;
			}
		} else if (child.energy > 80) {
			r += `<span class="green">Powerful sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		} else if (child.energy > 60) {
			r += `<span class="green">Good sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		} else if (child.energy > 40) {
			r += `<span class="yellow">Average sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		} else if (child.energy > 20) {
			r += `<span class="red">Poor sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		} else {
			r += `<span class="red">No sex drive${V.summaryStats ? `[${child.energy}]` : ''}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSmartFetish(child) {
		if (child.fetishKnown === 1) {
			if (child.clitSetting === "off") {
				r += `SP off. `;
			} else if (((child.fetish !== "submissive") || (child.fetishStrength <= 95)) && (child.clitSetting === "submissive")) {
				r += `SP: submissive. `;
			} else if (((child.fetish !== "cumslut") || (child.fetishStrength <= 95)) && (child.clitSetting === "oral")) {
				r += `SP: oral. `;
			} else if (((child.fetish !== "humiliation") || (child.fetishStrength <= 95)) && (child.clitSetting === "humiliation")) {
				r += `SP: humiliation. `;
			} else if (((child.fetish !== "buttslut") || (child.fetishStrength <= 95)) && (child.clitSetting === "anal")) {
				r += `SP: anal. `;
			} else if (((child.fetish !== "boobs") || (child.fetishStrength <= 95)) && (child.clitSetting === "boobs")) {
				r += `SP: breasts. `;
			} else if (((child.fetish !== "sadist") || (child.fetishStrength <= 95)) && (child.clitSetting === "sadist")) {
				r += `SP: sadism. `;
			} else if (((child.fetish !== "masochist") || (child.fetishStrength <= 95)) && (child.clitSetting === "masochist")) {
				r += `SP: masochism. `;
			} else if (((child.fetish !== "dom") || (child.fetishStrength <= 95)) && (child.clitSetting === "dom")) {
				r += `SP: dominance. `;
			} else if (((child.fetish !== "pregnancy") || (child.fetishStrength <= 95)) && (child.clitSetting === "pregnancy")) {
				r += `SP: pregnancy. `;
			} else if ((child.fetish !== Fetish.NONE) && (child.clitSetting === "vanilla")) {
				r += `SP: vanilla. `;
			} else if ((child.energy <= 95) && (child.clitSetting === "all")) {
				r += `SP: all. `;
			} else if ((child.energy > 5) && (child.clitSetting === "none")) {
				r += `SP: none. `;
			} else if (!["anti-men", "anti-women", "men", "women"].includes(child.clitSetting)) {
				r += `SP: monitoring. `;
			}
		} else {
			switch (child.clitSetting) {
				case "off":
					r += `SP off. `;
					break;
				case "submissive":
					r += `SP: submissive. `;
					break;
				case "oral":
					r += `SP: oral. `;
					break;
				case "humiliation":
					r += `SP: humiliation. `;
					break;
				case "anal":
					r += `SP: anal. `;
					break;
				case "boobs":
					r += `SP: breasts. `;
					break;
				case "sadist":
					r += `SP: sadism. `;
					break;
				case "masochist":
					r += `SP: masochism. `;
					break;
				case "dom":
					r += `SP: dominance. `;
					break;
				case "pregnancy":
					r += `SP: pregnancy. `;
					break;
				case "vanilla":
					r += `SP: vanilla. `;
					break;
				case "all":
					r += `SP: all. `;
					break;
				case "none":
					r += `SP: none. `;
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSmartAttraction(child) {
		if (child.attrKnown === 1) {
			if ((child.attrXX < 100) && (child.clitSetting === "women")) {
				r += `SP: women. `;
			} else if ((child.attrXY < 100) && (child.clitSetting === "men")) {
				r += `SP: men. `;
			}
		} else {
			if (child.clitSetting === "women") {
				r += `SP: women. `;
			} else if (child.clitSetting === "men") {
				r += `SP: men. `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longBehaviorFlaw(child) {
		r += `<span class="red">`;
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSexFlaw(child) {
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longBehaviorQuirk(child) {
		r += `<span class="green">`;
		switch (child.behavioralQuirk) {
			case "confident":
				r += `Confident. `;
				break;
			case "cutting":
				r += `Cutting. `;
				break;
			case "funny":
				r += `Funny. `;
				break;
			case "fitness":
				r += `Fitness. `;
				break;
			case "adores women":
				r += `Adores women. `;
				break;
			case "adores men":
				r += `Adores men. `;
				break;
			case "insecure":
				r += `Insecure. `;
				break;
			case "sinful":
				r += `Sinful. `;
				break;
			case "advocate":
				r += `Advocate. `;
				break;
			default:
				child.behavioralQuirk = "none";
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longSexQuirk(child) {
		switch (child.sexualQuirk) {
			case "gagfuck queen":
				r += `Gagfuck queen. `;
				break;
			case "painal queen":
				r += `Painal queen. `;
				break;
			case "strugglefuck queen":
				r += `Strugglefuck queen. `;
				break;
			case "tease":
				r += `Tease. `;
				break;
			case "romantic":
				r += `Romantic. `;
				break;
			case "perverted":
				r += `Perverted. `;
				break;
			case "caring":
				r += `Caring. `;
				break;
			case "unflinching":
				r += `Unflinching. `;
				break;
			case "size queen":
				r += `Size queen. `;
				break;
			default:
				child.sexualQuirk = "none";
				break;
		}
		r += `</span> `;
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortExtendedFamily(child) {
		const {daughter, sister, wife} = getPronouns(child);
		let handled = 0;
		if (child.mother > 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.mother;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s ${daughter}`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
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
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.father;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s ${daughter}`;
				if (child.relationshipTarget === V.slaves[_ssj].ID && handled !== 1) {
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
			let _ssj = V.slaves.findIndex(function(s) {
				return s.mother === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s mother`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTermShort(child);
					r += ` & ${friendShipShort}`;
					handled = 1;
				}
			}
			r += " ";
			_ssj = V.slaves.findIndex(function(s) {
				return s.father === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s father`;
				if (child.relationshipTarget === V.slaves[_ssj].ID && handled !== 1) {
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
			const _ssj = V.slaves.findIndex(function(s) {
				return areSisters(s, child) > 0;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s ${sister}`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
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
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s`;
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
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortClone(child) {
		if (child.clone !== 0) {
			r += ` Clone`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function shortRival(child) {
		if (child.rivalry !== 0) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.rivalryTarget;
			});
			if (_ssj !== -1) {
				r += `<span class="lightsalmon">`;
				if (child.rivalry <= 1) {
					r += `Disl ${SlaveFullName(V.slaves[_ssj])}`;
				} else if (child.rivalry <= 2) {
					r += `${SlaveFullName(V.slaves[_ssj])}'s rival`;
				} else {
					r += `Hates ${SlaveFullName(V.slaves[_ssj])}`;
				}
				r += `</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longExtendedFamily(child) {
		let handled = 0;
		if (child.mother > 0) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.mother;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.mother === -1) {
			r += `Your `;
			if (child.relationship < -1) {
				r += `<span class="lightgreen">daughter and ${PCrelationshipTerm(child)}.</span> `;
				handled = 1;
			} else {
				r += `<span class="lightgreen">daughter.</span> `;
			}
		} else if (child.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.mother].fullName}'s <span class="lightgreen">daughter.</span> `;
		}
		if (child.father > 0 && child.father !== child.mother) {
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.father;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">daughter`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
		} else if (child.father === -1 && child.father !== child.mother) {
			r += `Your `;
			if (child.relationship < -1) {
				r += `<span class="lightgreen">daughter and ${PCrelationshipTerm(child)}.</span> `;
				handled = 1;
			} else {
				r += `<span class="lightgreen">daughter.</span> `;
			}
		} else if (child.father in V.missingTable && child.father !== child.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
			r += `${V.missingTable[child.father].fullName}'s <span class="lightgreen">daughter.</span> `;
		}
		if (child.daughters === 1) {
			let _ssj = V.slaves.findIndex(function(s) {
				return s.mother === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">mother`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
					const friendShipShort = relationshipTerm(child);
					r += ` and ${friendShipShort}`;
					handled = 1;
				}
				r += `.</span> `;
			}
			_ssj = V.slaves.findIndex(function(s) {
				return s.father === child.ID;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">father`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
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
			const _ssj = V.slaves.findIndex(function(s) {
				return areSisters(s, child) > 0;
			});
			if (_ssj !== -1) {
				r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightgreen">sister`;
				if (child.relationshipTarget === V.slaves[_ssj].ID) {
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
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.relationshipTarget;
			});
			if (_ssj !== -1) {
				const friendship = relationshipTerm(child);
				r += `${SlaveFullName(V.slaves[_ssj])}'s `;
				r += `<span class="lightgreen">${friendship}.</span> `;
			}
		} else if (child.relationship === -3 && child.mother !== -1 && child.father !== -1) {
			r += `<span class="lightgreen">Your wife.</span> `;
		} else if (child.relationship === -2) {
			r += `<span class="lightgreen">Emotionally bonded to you.</span> `;
		} else if (child.relationship === -1) {
			r += `<span class="lightgreen">Emotional slut.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longClone(child) {
		if (child.clone !== 0) {
			r += ` <span class="skyblue">Clone of ${child.clone}.</span> `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longRival(child) {
		if (child.rivalry !== 0) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
			const _ssj = V.slaves.findIndex(function(s) {
				return s.ID === child.rivalryTarget;
			});
			if (_ssj !== -1) {
				if (child.rivalry <= 1) {
					r += `<span class="lightsalmon">Dislikes</span> ${SlaveFullName(V.slaves[_ssj])}. `;
				} else if (child.rivalry <= 2) {
					r += `${SlaveFullName(V.slaves[_ssj])}'s <span class="lightsalmon">rival.</span> `;
				} else {
					r += `<span class="lightsalmon">Hates</span> ${SlaveFullName(V.slaves[_ssj])}. `;
				}
			}
			r += " ";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longClothes(child) {
		switch (child.clothes) {
			case "a slave gown":
				r += `Slave gown. `;
				break;
			case "a mini dress":
				r += `Mini dress. `;
				break;
			case "a ball gown":
				r += `Ball gown. `;
				break;
			case "a schoolgirl outfit":
				r += `Schoolgirl outfit. `;
				break;
			case "a tank-top":
				r += `Nice tank-top. `;
				break;
			case "a tube top":
				r += `Nice tube top. `;
				break;
			case "a t-shirt":
				r += `T-shirt. `;
				break;
			case "an oversized t-shirt":
				r += `Nice over-sized t-shirt. `;
				break;
			default:
				r += `Naked. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longCollar(child) {
		switch (child.collar) {
			case "uncomfortable leather":
				r += `Leather collar. `;
				break;
			case "tight steel":
				r += `Steel collar. `;
				break;
			case "preg biometrics":
				r += `Pregnancy biometrics collar. `;
				break;
			case "cruel retirement counter":
				r += `Cruel counter collar. `;
				break;
			case "shock punishment":
				r += `Shock collar. `;
				break;
			case "dildo gag":
				r += `Dildo gag. `;
				break;
			case "massive dildo gag":
				r += `Throat-bulging dildo gag. `;
				break;
			case "neck corset":
				r += `Neck corset. `;
				break;
			case "stylish leather":
				r += `Stylish leather collar. `;
				break;
			case "satin choker":
				r += `Satin choker. `;
				break;
			case "silk ribbon":
				r += `Silken ribbon. `;
				break;
			case "heavy gold":
				r += `Gold collar. `;
				break;
			case "bowtie":
				r += `Bowtie collar. `;
				break;
			case "pretty jewelry":
				r += `Pretty collar. `;
				break;
			case "nice retirement counter":
				r += `Nice counter collar. `;
				break;
			case "bell collar":
				r += `Bell collar. `;
				break;
			case "leather with cowbell":
				r += `Cowbell collar. `;
				break;
			case "ancient Egyptian":
				r += `Wesekh. `;
				break;
			case "ball gag":
				r += `Ball gag. `;
				break;
			case "bit gag":
				r += `Bit gag. `;
				break;
			case "porcelain mask":
				r += `Porcelain mask. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longBelly(child) {
		switch (child.bellyAccessory) {
			case "shapewear":
				r += `Shapewear. `;
				break;
			case "a small empathy belly":
				r += `Small fake belly. `;
				break;
			case "a medium empathy belly":
				r += `Medium fake belly. `;
				break;
			case "a large empathy belly":
				r += `Large fake belly. `;
				break;
			case "a huge empathy belly":
				r += `Huge fake belly. `;
				break;
			case "a corset":
				r += `Corset. `;
				break;
			case "an extreme corset":
				r += `Extreme corsetage. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longLegs(child) {
		if (child.legAccessory === "short stockings") {
			r += `Short stockings. `;
		} else if (child.legAccessory === "long stockings") {
			r += `Long stockings. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longShoes(child) {
		if (child.shoes === "heels") {
			r += `Heels. `;
		} else if (child.shoes === "pumps") {
			r += `Pumps. `;
		} else if (child.shoes === "extreme heels") {
			r += `Extreme heels. `;
		} else if (child.shoes === "boots") {
			r += `Boots. `;
		} else if (child.heels === 1) {
			r += `<span class="yellow">Crawling.</span> `;
		} else if (child.shoes === "flats") {
			r += `Flats. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longChastity(child) {
		if (child.chastityAnus === 1 && child.chastityPenis === 1 && child.chastityVagina === 1) {
			r += `Full chastity. `;
		} else if (child.chastityPenis === 1 && child.chastityVagina === 1) {
			r += `Genital chastity. `;
		} else if ((child.chastityAnus === 1 && child.chastityVagina === 1) || (child.chastityAnus === 1 && child.chastityPenis === 1)) {
			r += `Combined chastity. `;
		} else if (child.chastityVagina === 1) {
			r += `Vaginal chastity. `;
		} else if (child.chastityPenis === 1) {
			r += `Chastity cage. `;
		} else if (child.chastityAnus === 1) {
			r += `Anal chastity. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longVaginalAcc(child) {
		if (child.vaginalAttachment === "none") {
			switch (child.vaginalAccessory) {
				case "bullet vibrator":
					r += `Attached bullet vibrator. `;
					break;
				case "smart bullet vibrator":
					r += `Attached smart bullet vibrator. `;
					break;
				case "dildo":
					r += `Vaginal dildo. `;
					break;
				case "large dildo":
					r += `Large vaginal dildo. `;
					break;
				case "huge dildo":
					r += `Huge vaginal dildo. `;
					break;
				case "long dildo":
					r += `Long vaginal dildo. `;
					break;
				case "long, large dildo":
					r += `Long and large vaginal dildo. `;
					break;
				case "long, huge dildo":
					r += `Long and wide vaginal dildo. `;
					break;
			}
		} else {
			switch (child.vaginalAttachment) {
				case "vibrator":
					r += `Vibrating dildo. `;
					break;
				case "smart vibrator":
					r += `Smart vibrating dildo. `;
					break;
			}
			r += " ";
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longDickAcc(child) {
		switch (child.dickAccessory) {
			case "sock":
				r += `Cock sock. `;
				break;
			case "bullet vibrator":
				r += `Frenulum bullet vibrator. `;
				break;
			case "smart bullet vibrator":
				r += `Smart frenulum bullet vibrator. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function longButtplug(child) {
		switch (child.buttplug) {
			case "plug":
				r += `Buttplug. `;
				break;
			case "large plug":
				r += `Large buttplug. `;
				break;
			case "huge plug":
				r += `Huge buttplug. `;
				break;
			case "long plug":
				r += `Long buttplug. `;
				break;
			case "long, large plug":
				r += `Large, long buttplug. `;
				break;
			case "long, huge plug":
				r += `Enormous buttplug. `;
				break;
		}
		switch (child.buttplugAttachment) {
			case "tail":
				r += `Attached tail. `;
				break;
			case "cat tail":
				r += `Attached cat tail. `;
				break;
			case "fox tail":
				r += `Attached fox tail. `;
				break;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function rulesAssistant(child) {
		if (child.useRulesAssistant === 0) {
			r += `<span class="lightgreen">RA-Exempt</span> `;
		} else if (abbreviate.rulesets === 2 && (child.currentRules !== undefined) && (child.currentRules.length > 0)) {
			r += `Rules: ${V.defaultRules.filter(x => ruleApplied(child, x)).map(x => x.name).join(", ")}`;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} child
	 */
	function origins(child) {
		r += `<br> `;
		if (V.seeImages !== 1 || V.seeSummaryImages !== 1 || V.imageChoice === 1) {
			r += `&nbsp;&nbsp;&nbsp;&nbsp;`;
		}
		r += `<span class="gray">${child.origin}</span> `;
	}

	return ChildSummaryUncached(child);
};
