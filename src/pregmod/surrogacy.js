/**
 * This defines the passage contents for surrogacy, transplanting, and cloning surgeries
 * @returns {DocumentFragment}
 */
App.UI.surrogacy = function() {
	const node = new DocumentFragment();
	let r = [];

	switch (V.surgeryType) {
		case "surrogacy":
			if (V.receptrix === -1) {
				const donatrix = (V.donatrix === -1) ? V.PC : getSlave(V.donatrix);
				r.push(`Since the surgery required only a local anesthetic, you remain fully aware of the procedure as the autosurgery carries it out. You slowly rise to your feet, a hand to your lower belly, appreciating the new life growing within you.`);
				V.PC.pregKnown = 1;
				WombSurrogate(V.PC, 1, donatrix, V.impregnatrix, 1);
				WombNormalizePreg(V.PC);
			} else {
				const receptrix = getSlave(V.receptrix);
				const donatrix = (V.donatrix === -1) ? V.PC : getSlave(V.donatrix);
				receptrix.pregKnown = 1;
				WombSurrogate(receptrix, 1, donatrix, V.impregnatrix, 1);
				WombNormalizePreg(receptrix);
				const {
					He,
					he, his, him
				} = getPronouns(receptrix);
				if (receptrix.fetish === Fetish.MINDBROKEN) {
					r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
				} else if (receptrix.fetish === "pregnancy" && receptrix.fetishStrength > 60 && receptrix.fetishKnown === 1) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. ${He} was overjoyed at the sight of the syringe containing ${his} future child emptying into ${his} womb.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He} is <span class="devotion inc"> filled with joy</span> over the life settling into ${his} womb and can't wait to see the result. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body.`);
					receptrix.trust += 4;
					receptrix.devotion += 10;
				} else if (receptrix.devotion > 50) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. ${He} watched the syringe containing ${his} new pregnancy empty into ${his} womb with rapt attention.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He}'s <span class="devotion inc">grateful</span> that you think ${him} worthy of carrying this child, and a little nervous about how ${he}'ll perform as a surrogate.`);
					receptrix.devotion += 4;
				} else if (receptrix.devotion >= -20) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. From the syringe making contact with ${his} skin, to the egg's delivery into ${his} womb and ${his} subsequent impregnation, ${he} couldn't look away.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He} understands the realities of ${his} life as a slave, so it isn't much of a shock. ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
					receptrix.trust -= 10;
				} else {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. The moment ${he} realized what was happening, ${he} shut ${his} eyes tight, only opening them again as ${he} feels the slight tingle of the injector exiting ${his} lower abdomen.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> that you have forced ${him} to bear this child, even more so as ${he} realizes ${he} doesn't know who the father is. ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and the future of the life ${he} now harbors within ${him}.`);
					receptrix.trust -= 15;
					receptrix.devotion -= 15;
				}
			}
			V.receptrix = 0;
			V.impregnatrix = 0;
			V.donatrix = 0;
			break;
		case "transplant": {
			const bulk = V.transplantFetuses.length > 1;
			const child = bulk ? "children" : "child";
			const donatrix = (V.donatrix === -1) ? V.PC : getSlave(V.donatrix);
			if (V.receptrix === -1) {
				r.push(`Since the surgery required only a local anesthetic, you are very aware that you are now carrying ${donatrix.slaveName}'s ${child}. You slowly`);
				if (canWalk(V.PC)) {
					r.push(`rise to your feet, a hand to`);
				} else if (canMove(V.PC)) {
					r.push(`rise to a sitting position, a hand to`);
				} else if (isMovable(V.PC)) {
					r.push(`run a hand across`);
				}
				r.push(`your lower belly, appreciating the new ${bulk ? "lives" : "life"} growing within you.`);
			} else {
				const receptrix = getSlave(V.receptrix);
				const {
					He,
					he, his, him
				} = getPronouns(receptrix);
				if (receptrix.fetish === Fetish.MINDBROKEN) {
					r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
				} else if ((receptrix.fetish === "pregnancy") && (receptrix.fetishStrength > 60) && (receptrix.fetishKnown === 1)) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. ${He} was overjoyed at the sight of the syringe containing ${his} future ${child} emptying into ${his} womb.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He} is <span class="devotion inc"> filled with joy</span> over the life resettling into ${his} womb and can't wait to see the result. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body.`);
					receptrix.trust += 4;
					receptrix.devotion += 10;
				} else if (receptrix.devotion > 50) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. ${He} watched the syringe containing ${his} new pregnancy empty into ${his} womb with rapt attention.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He}'s <span class="devotion inc">grateful</span> that you think ${him} worthy of carrying ${bulk ? "these children" : "this child"} in`);
					if (donatrix.ID === -1) {
						r.push(`your stead,`);
					} else {
						r.push(`lieu of ${donatrix.slaveName},`);
					}
					r.push(`and a little nervous about how ${he}'ll perform as a surrogate.`);
					receptrix.devotion += 4;
				} else if (receptrix.devotion >= -20) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. From the syringe making contact with ${his} skin, to the egg's delivery into ${his} womb and ${his} subsequent impregnation, ${he} couldn't look away.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He} understands the realities of ${his} life as a slave, so it isn't much of a shock. ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and how you are forcing`);
					if (donatrix.ID === -1) {
						r.push(`your pregnancy upon ${him}.`);
					} else {
						r.push(`${him} to carry what should have been ${donatrix.slaveName}'s burden.`);
					}
					receptrix.trust -= 10;
				} else {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. The moment ${he} realized what was happening, ${he} shut ${his} eyes tight, only opening them again as ${he} feels the slight tingle of the injector exiting ${his} lower abdomen.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> that you have forced ${him} to`);
					if (donatrix.ID === -1) {
						r.push(`carry your ${child} instead of doing so yourself.`);
					} else {
						r.push(`bear ${bulk ? "these children" : "this child"} in lieu of ${donatrix.slaveName}.`);
					}
					r.push(`${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and who else's troubles may be levied upon ${him}.`);
					receptrix.trust -= 15;
					receptrix.devotion -= 15;
				}
			}
			const receptrix = (V.receptrix === -1) ? V.PC : getSlave(V.receptrix);
			V.transplantFetuses.reverse().forEach(fetus => {
				WombRemoveFetus(donatrix, donatrix.womb.indexOf(fetus));
				WombAddFetus(receptrix, fetus);
			});
			receptrix.pregKnown = 1;
			receptrix.preg = WombMaxPreg(receptrix);
			donatrix.preg = WombMaxPreg(donatrix);
			WombNormalizePreg(receptrix);
			WombNormalizePreg(donatrix);
			if (donatrix.preg === 0) {
				donatrix.pregWeek = -1;
			}
			V.receptrix = 0;
			V.donatrix = 0;
			V.transplantFetuses = [];
			break;
		}
		case "clone": {
			const donatrix = (V.donatrix === -1) ? V.PC : getSlave(V.donatrix);
			if (V.receptrix === -1) {
				r.push(`Since the surgery required only a local anesthetic, you remain fully aware of the procedure as the autosurgery carries it out. You slowly rise to your feet, a hand to your lower belly, appreciating the clone growing within you.`);
				V.PC.pregKnown = 1;
				WombImpregnateClone(V.PC, 1, donatrix, 1);
				WombNormalizePreg(V.PC);
			} else {
				const receptrix = getSlave(V.receptrix);
				receptrix.pregKnown = 1;
				WombImpregnateClone(receptrix, 1, donatrix, 1);
				WombNormalizePreg(receptrix);
				const {
					He,
					he, his, him
				} = getPronouns(receptrix);
				if (receptrix.fetish === Fetish.MINDBROKEN) {
					r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen,`);
					if (receptrix.ID === donatrix.ID) {
						r.push(`but has no idea ${he} carries ${his} own clone.`);
					} else {
						r.push(`${he} knows that ${he} has been impregnated.`);
					}
				} else if (receptrix.fetish === "pregnancy" && receptrix.fetishStrength > 60 && receptrix.fetishKnown === 1) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. ${He} was overjoyed at the sight of the syringe containing ${his}`);
						if (receptrix.ID === donatrix.ID) {
							r.push(`clone`);
						} else {
							r.push(`future child`);
						}
						r.push(`emptying into ${his} womb.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated${(receptrix.ID === donatrix.ID) ? `, but not that ${he} now bears ${his} own clone` : ''}.`);
					}
					r.push(`${He} is <span class="devotion inc"> filled with joy</span> over the life settling into ${his} womb and can't wait to see the result. ${He}'s so pleased that ${he} now <span class="trust inc">trusts</span> your plans for ${his} body.`);
					receptrix.trust += 4;
					receptrix.devotion += 10;
				} else if (receptrix.devotion > 50) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. ${He} watched the syringe containing ${his} new pregnancy empty into ${his} womb with rapt attention.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated${(receptrix.ID === donatrix.ID) ? `, but not that ${he} now bears ${his} own clone` : ''}.`);
					}
					r.push(`${He}'s <span class="devotion inc">grateful</span> that you think ${him} worthy of carrying this child, and a little nervous about how ${he}'ll perform as a surrogate.`);
					receptrix.devotion += 4;
				} else if (receptrix.devotion >= -20) {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. From the syringe making contact with ${his} skin, to the egg's delivery into ${his} womb and ${his} subsequent impregnation, ${he} couldn't look away.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated${(receptrix.ID === donatrix.ID) ? `, but not that ${he} now bears ${his} own clone` : ''}.`);
					}
					r.push(`${He} understands the realities of ${his} life as a slave, so it isn't much of a shock. ${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body.`);
					receptrix.trust -= 10;
				} else {
					if (canSee(receptrix)) {
						r.push(`Since the surgery required only a local anesthetic, ${receptrix.slaveName} remained fully aware throughout the procedure. The moment ${he} realized what was happening, ${he} shut ${his} eyes tight, only opening them again as ${he} feels the slight tingle of the injector exiting ${his} lower abdomen.`);
					} else {
						r.push(`${receptrix.slaveName} leaves the surgery with a certain warmth in ${his} lower abdomen, ${he} knows that ${he} has been impregnated.`);
					}
					r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s <span class="devotion dec">terrified and angry</span> that you have forced ${him} to bear`);
					if (receptrix.ID === donatrix.ID) {
						r.push(`${his} own clone and potential replacement.`);
					} else {
						r.push(`this child, even more so as ${he} realizes ${he} doesn't know who the father is.`);
					}
					r.push(`${He} is <span class="trust dec">sensibly fearful</span> of your total power over ${his} body and the future of the life ${he} now harbors within ${him}.`);
					receptrix.trust -= 15;
					receptrix.devotion -= 15;
				}
			}
			V.receptrix = 0;
			V.donatrix = 0;
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
