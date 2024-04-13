/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.SlaveAssignment.porn = function saPorn(slave) {
	const {
		he, him, his, himself, He, His
	} = getPronouns(slave);

	let r = ` `;

	const oldFame = slave.porn.viewerCount;

	let decayRate;
	let viewership;
	let viewerSoaking = 0;

	if (V.studio === 1 && slave.porn.feed === 1) {
		calcBaseViewership(slave);

		r += `The studio regularly releases clips of ${his} daily affairs. `;
		if (V.cheatMode === 1) {
			r += `(Decay: ${decayRate} Viewership: ${viewership} Last week's fame: ${oldFame}) `;
		}

		prestigeCommentary(slave);
		faceCommentary(slave);
		hack();
		checkFocus();

		allGenreViews(slave);
		updateViewerCount(slave);
		if (oldFame > slave.porn.viewerCount) {
			r += `Overall, ${his} online fame <span class="red">dropped</span> this week. `;
		} else if (oldFame < slave.porn.viewerCount) {
			r += `Overall, ${his} online fame <span class="green">rose</span> this week. `;
			if (oldFame < 100 && slave.porn.viewerCount >= 100 && V.studioFeed === 1) {
				r += `${He} <span class="yellow">has accrued enough views to determine prospective porn genres.</span> `;
			}
		} else if (slave.porn.viewerCount !== 0) {
			r += `Surprisingly, ${his} online fame <span class="yellow">remained consistent</span> this week despite how fickle watchers can be. `;
		} else {
			r += `${He} went <span class="red">completely overlooked</span> this week and failed to gain any hits at all. `;
		}

		if (slave.porn.viewerCount > 0) {
			let donations = Math.floor(slave.porn.viewerCount / jsRandom(10, 15 + viewerSoaking));
			if (donations > 0) {
				r += `Fans donated a total of <span class="cash inc">${cashFormat(donations)}</span> to ${his} account this week. `;
				cashX(donations, "porn", slave);
			}
		}
		if (slave.porn.spending > 0) {
			cashX(forceNeg(slave.porn.spending / V.PCSlutContacts), "porn", slave);
		}

		prestigeGen(slave);
	} else { /* popularity decay from lack of new content */
		if (slave.porn.prestige > 1) { // 500k
			decayRate = 5000;
		} else if (slave.porn.prestige > 0) { // 10k
			decayRate = 500;
		} else {
			decayRate = 30;
		}

		genreDecay(slave);
		updateViewerCount(slave);

		prestigeDecay(slave);
	}

	return r;


	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function genreDecay(slave) {
		for (const genre of App.Porn.getAllGenres()) {
			if (slave.porn.fame[genre.fameName] > 0) {
				const oldPorn = slave.porn.fame[genre.fameName];
				slave.porn.fame[genre.fameName] = Math.clamp(slave.porn.fame[genre.fameName] - (decayRate * 2), 0, 100000);
				r += cheatDelta(genre.uiName(), oldPorn, slave.porn.fame[genre.fameName]);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function updateViewerCount(slave) {
		slave.porn.viewerCount = Math.trunc(App.Porn.getAllGenres().reduce((acc, cur) => acc + slave.porn.fame[cur.fameVar], 0.0));
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function prestigeDecay(slave) {
		if (slave.porn.prestige > 0) {
			const genre = App.Porn.getGenreByFameName(slave.porn.fameType);
			if (slave.porn.fame[genre.fameName] < 40000 && slave.porn.prestige === 2) {
				slave.porn.prestige = 1;
				slave.porn.prestigeDesc = `$He has a following in slave pornography. ${genre.prestigeDesc1}.`;
				r += `With the lack of any new content, <span class="red">${his} popularity in ${slave.porn.fameType} pornography has dropped considerably,</span> though some viewers still cling to the hope that ${he}'ll come back. `;
			} else if (slave.porn.fame[genre.fameName] < 5000) {
				slave.porn.prestige = 0;
				slave.porn.prestigeDesc = 0;
				slave.porn.fameType = "none";
				r += `With no new ${slave.porn.fameType} content coming out, <span class="red">${his} popularity has faded away.</span> `;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function calcBaseViewership(slave) {
		let face;

		if (slave.porn.prestige > 1) {
			decayRate = 5000;
			if (slave.fuckdoll > 0) {
				face = 50;
			} else if (slave.faceAccessory === "porcelain mask") {
				face = 20;
			} else {
				face = slave.face * 4;
			}
			viewership = ((500 / V.HackingSkillMultiplier) + (slave.porn.spending) + (face) + (slave.prestige * 10) - (decayRate));
		} else if (slave.porn.prestige > 0) {
			decayRate = 500;
			if (slave.fuckdoll > 0) {
				face = 20;
			} else if (slave.faceAccessory === "porcelain mask") {
				face = 50;
			} else {
				face = slave.face * 2;
			}
			viewership = ((900 / V.HackingSkillMultiplier) + (slave.porn.spending / 15) + (face) + (slave.prestige * 250) - (decayRate));
		} else {
			decayRate = 30;
			if (slave.fuckdoll > 0) {
				face = 0;
			} else if (slave.faceAccessory === "porcelain mask") {
				face = 0;
			} else {
				face = slave.face / 20;
			}
			viewership = ((300 / V.HackingSkillMultiplier) + (slave.porn.spending > 0 ? 1.01 * slave.porn.spending : 200) + (face) + (slave.prestige * 20) - (decayRate));
		}
		viewership = Math.trunc(viewership);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function prestigeCommentary(slave) {
		if (slave.porn.prestige > 1) {
			r += `${He} is widely regarded in ${slave.porn.fameType} porn, but with so many watchers, turnover is high. `;
		} else if (slave.porn.prestige > 0) {
			if (slave.porn.fameType === "generic") {
				r += `${He} has claimed a niche in slave porn, so there is a constant cycle of new arrivals and bored ex-watchers. `;
			} else {
				r += `${He} has claimed a niche for ${himself} in ${slave.porn.fameType} porn, so there is a constant cycle of new arrivals and bored ex-watchers. `;
			}
		} else {
			r += `${He} is borderline unknown, so ${he} tends to hold onto the few watchers ${he} has. `;
		}

		if (slave.prestige > 1) {
			r += `Interest in porn of ${him} is very high, since ${he}'s already quite prestigious. `;
		} else if (slave.prestige > 0) {
			r += `Interest in porn of ${him} is high, since ${he}'s already prestigious. `;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function faceCommentary(slave) {
		if (slave.fuckdoll > 0) {
			return;
		} else if (slave.faceAccessory === "porcelain mask") {
			r += `${His} mask adds an air of mystery to ${him}, `;
			if (slave.porn.prestige > 1) {
				r += `but people wonder if ${he} is trying to hide something. `;
			} else if (slave.porn.prestige > 0) {
				r += `tantalizing viewers with what it hides. `;
			} else {
				r += `but viewers are more interested in ${his} body. `;
			}
		} else if (slave.face > 95) {
			r += `${His} unbelievably beautiful face seizes the attention of all who see it. `;
		} else if (slave.face > 40) {
			r += `${His} gorgeous face draws viewers in and keeps them watching. `;
		} else if (slave.face > 10) {
			r += `${His} pretty face draws viewers in. `;
		} else if (slave.face > 0) {
			r += `${His} face is attractive, but it attracts few viewers. `;
		} else if (slave.face === 0) {
			r += `${His} face is completely average and makes no difference to ${his} viewers. `;
		} else if (slave.face >= -10) {
			r += `${His} face, while attractive, is so average it turns off some viewers. `;
		} else if (slave.face >= -40) {
			r += `${His} unattractive face causes viewers to move on. `;
		} else if (slave.face >= -95) {
			r += `${His} ugly face drives viewers off. `;
		} else {
			r += `${His} face chases off all but the most desperate viewers. `;
		}
	}

	function checkFocus() {
		if (slave.porn.focus !== "none") {
			const focusGenre = App.Porn.getGenreByFocusName(slave.porn.focus);
			if (!focusGenre || !focusGenre.valid(slave)) {
				r += `${He} has been instructed to focus on ${slave.porn.focus} aspects of ${his} sex life to improve the porn ${he} produces, but ${he} <span class="red">can no longer do so.</span> `;
				slave.porn.focus = "none";
			}
		}
	}

	function hack() {
		if (V.PC.skill.hacking > 10) {
			r += `With your hacking skills, you manage to tweak search algorithms to display ${his} content more often. `;
		} else if (V.PC.skill.hacking < 0) {
			r += `With your lack of skill with computers you manage to misidentify ${his} content, complicating searches. `;
			IncreasePCSkills('hacking', 0.1);
		}
		IncreasePCSkills('hacking', 0.1);
	}

	function viewershipDelta(newPorn, oldPorn) {
		if (newPorn > oldPorn) {
			return `Viewership <span class="green">increased</span> this week. `;
		} else if (newPorn < oldPorn) {
			return `Viewership <span class="red">decreased</span> this week. `;
		} else {
			return `Viewership <span class="yellow">was stable</span> this week. `;
		}
	}

	/**
	 * @returns {string}
	 */
	function cheatDelta(name, oldPorn, newPorn) {
		if (V.cheatMode === 1) {
			return `(${name}: ${oldPorn} to ${newPorn}). `;
		}
		return ``;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function allGenreViews(slave) {
		let adjustedViewership = viewership;

		function genreViews(slave, genre) {
			const oldPorn = slave.porn.fame[genre.fameVar];
			if (genre.valid(slave)) {
				if (slave.porn.focus === genre.focusName || slave.porn.fameType === genre.fameName) {
					adjustedViewership = viewership * genre.type.focusedViewershipFactor;
				} else if (slave.porn.focus !== "none") {
					adjustedViewership = viewership * genre.type.unfocusedViewershipFactor;
				}
				slave.porn.fame[genre.fameVar] += adjustedViewership / (1 + viewerSoaking * genre.type.viewershipSoakingFactor) + genre.type.bonusViewership(slave) - ((decayRate / 10) * (V.pornStars[genre.fameVar].p1count - 1));
				slave.porn.fame[genre.fameVar] = Math.clamp(slave.porn.fame[genre.fameVar], 0, 150000);
				viewerSoaking++;

				if (slave.porn.focus === genre.focusName || slave.porn.fameType === genre.fameName) {
					r += `${genre.hitText(slave)} `;
					r += viewershipDelta(slave.porn.fame[genre.fameVar], oldPorn);
				}
				r += cheatDelta(genre.uiName(), oldPorn, slave.porn.fame[genre.fameVar]);
			} else if (slave.porn.fame[genre.fameVar] > 0) {
				slave.porn.fame[genre.fameVar] = Math.clamp(slave.porn.fame[genre.fameVar] - decayRate * 2, 0, 150000);
				r += cheatDelta(genre.uiName(), oldPorn, slave.porn.fame[genre.fameVar]);
			}
		}

		/* Paraphilias have the highest take of viewers */
		for (const genre of App.Porn.getGenresByType(App.Porn.GenreType.paraphilia)) {
			genreViews(slave, genre);
		}

		/* Fetishes */
		for (const genre of App.Porn.getGenresByType(App.Porn.GenreType.fetish)) {
			genreViews(slave, genre);
		}

		/* General */
		for (const genre of App.Porn.getGenresByType(App.Porn.GenreType.general)) {
			genreViews(slave, genre);
		}

		/* Generic porn */
		for (const genre of App.Porn.getGenresByType(App.Porn.GenreType.generic)) {
			genreViews(slave, genre);
		}

		/* Quirks are low and unlikely, requiring focus to push into the limelight */
		for (const genre of App.Porn.getGenresByType(App.Porn.GenreType.quirk)) {
			genreViews(slave, genre);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function getHighestPornGenre(slave) {
		return App.Porn.getAllGenres().reduce((acc, cur) => slave.porn.fame[cur.fameVar] > slave.porn.fame[acc.fameVar] ? cur : acc);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function prestigeGen(slave) {
		const highestPorn = getHighestPornGenre(slave);
		if (slave.porn.prestige === 0 && slave.porn.viewerCount >= 100000) {
			const pornFameGrabBag = App.Porn.getAllGenres().filter((g) => slave.porn.fame[g.fameVar] >= 10000);
			if (pornFameGrabBag.length > 0) {
				const weightedGrabBagIndices = {};
				pornFameGrabBag.forEach((g, i) => weightedGrabBagIndices[i] = slave.porn.fame[g.fameVar]); // Attach weights to the indices of pornFameGrabBag
				const genre = pornFameGrabBag[hashChoice(weightedGrabBagIndices)]; // hashChoice selects an index according to the weights
				slave.porn.fameType = genre.fameName;
				slave.porn.prestige = 1;

				r += `<span class="green">${He} has gained a following in ${slave.porn.fameType} pornography!</span> ${pronounsForSlaveProp(slave, genre.prestigeDesc1)}, but ${he} isn't famous enough to be called prestigious yet. `;
				slave.porn.prestigeDesc = `$He has a following in slave pornography. ${genre.prestigeDesc1}.`;
				if (genre.type === App.Porn.GenreType.fetish && slave.fetishKnown !== 1) {
					slave.fetishKnown = 1;
				}
			}
		} else if (slave.porn.prestige === 1) {
			const swapPoint = 1.2;
			const genre = App.Porn.getGenreByFameName(slave.porn.fameType);
			if (slave.porn.fame[genre.fameVar] >= 50000) {
				slave.porn.prestige = 2;
				slave.porn.prestigeDesc = `$He is well known from $his career in slave pornography. ${genre.prestigeDesc2}.`;
				r += `<span class="green">${He} has gained a hold in ${slave.porn.fameType} pornography!</span> ${pronounsForSlaveProp(slave, genre.prestigeDesc2)}, so it is now prestigious to own ${him}. `;
			} else if (slave.porn.fame[highestPorn.fameVar] >= slave.porn.fame[genre.fameVar] * swapPoint) {
				r += `${His} fame in ${slave.porn.fameType} pornography has been overwhelmed by ${his} surging popularity in other aspects. <span class="yellow">${He} is now better known for ${his} ${highestPorn.fameName} porn.</span> `;
				slave.porn.fameType = highestPorn.fameName;
				slave.porn.prestigeDesc = `$He has a following in slave pornography. ${highestPorn.prestigeDesc1}.`;
			} else if (slave.porn.fame[genre.fameVar] < 5000) {
				slave.porn.prestige = 0;
				slave.porn.prestigeDesc = 0;
				r += `<span class="red">${His} popularity in ${slave.porn.fameType} pornography has faded.</span> ${He} is once again relatively unknown. `;
				slave.porn.fameType = "none";
			}
		} else if (slave.porn.prestige === 2) {
			const genre = App.Porn.getGenreByFameName(slave.porn.fameType);
			if (slave.porn.fame[genre.fameVar] >= 150000 && V.pornStars[genre.fameVar].p3ID === 0) {
				slave.porn.prestige = 3;
				slave.porn.fame[genre.fameVar] = 250000;
				slave.porn.viewerCount = 250000;
				V.pornStars[genre.fameVar].p3ID = slave.ID;
				slave.porn.prestigeDesc = `$He is world famous for $his career in slave pornography. ${genre.prestigeDesc3}.`;
				r += `<span class="green">${He} has become world famous for ${his} career in ${slave.porn.fameType} pornography!</span> ${pronounsForSlaveProp(slave, genre.prestigeDesc3)}, so it is now extremely prestigious to own ${him}. `;
				addTrinket(`a framed shot from porn starring`,
					{
						name: slave.slaveName,
						id: slave.ID,
						extra: genre.trinketShotDesc(slave),
					});

				r += `Further paid publicity cannot increase ${his} fame, so subsidy of porn featuring ${him} has stopped. `;
				slave.porn.spending = 0;
			} else if (slave.porn.fame[genre.fameVar] < 40000) {
				slave.porn.prestige = 1;
				slave.porn.prestigeDesc = `$He has a following in slave pornography. ${genre.prestigeDesc1}.`;
				r += `<span class="red">${His} popularity in ${slave.porn.fameType} pornography has dropped considerably,</span> though ${he} still retains a core fanbase. `;
			}
		}
	}
};
