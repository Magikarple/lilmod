/**
 * @param {App.Entity.SlaveState} slave
 * @param {object} params
 * @param {string} [params.oldName] Their name before you renamed them by calling this function
 * @param {string} [params.oldSurname] Their surname before you renamed them by calling this function
 */
App.UI.SlaveInteract.rename = function(slave, {oldName = "", oldSurname = ""} = {}) {
	const r = [];
	const {
		He, he, His, his, him, girl, himself, wife
	} = getPronouns(slave);
	if (slave.slaveName === oldName && slave.slaveSurname === oldSurname) {
		return;
	} else {
		/* First time renaming reaction */
		if (slave.slaveName === "" || !(slave.hasOwnProperty("slaveName"))) {
			r.push(`${oldName} needs to be called something on the records, so ${oldName} ${he} stays.`);
			slave.slaveName = oldName;
		} else if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${slave.slaveName} doesn't even recognize that ${he}'s been renamed. It simply does not register.`);
		} else if ((oldName !== slave.birthName && slave.slaveName === slave.birthName) || (oldSurname !== slave.birthSurname && slave.slaveSurname === slave.birthSurname)) {
			r.push(`${slave.slaveName}`);
			if (slave.devotion > 50) {
				r.push(`cheerfully accepts ${his} old name back.`);
			} else if (slave.devotion >= -20) {
				r.push(`obediently accepts ${his} old name back.`);
			} else if (slave.devotion >= -50) {
				r.push(`happily accepts ${his} original name.`);
			} else if (slave.trust > 20) {
				r.push(`scoffs at the notion that ${he} was ever anything other than ${SlaveFullBirthName(slave)}, <span class="orangered">weakening your control over ${him}.</span>`);
				slave.trust += 5;
			} else {
				r.push(`cautiously accepts the return of ${his} name.`);
			}
		} else if ((oldName === slave.birthName && slave.slaveName !== slave.birthName) || (oldSurname === slave.birthSurname && slave.slaveSurname !== slave.birthSurname)) {
			r.push(`${slave.slaveName}`);
			if (slave.devotion > 50) {
				r.push(`accepts ${his} new name cheerfully. This attachment to you <span class="devotion inc">increases ${his} devotion.</span>`);
				slave.devotion += 4;
			} else if (slave.devotion >= -20) {
				r.push(`obediently accepts ${his} new name. This surrender to you <span class="devotion inc">increases ${his} obedience.</span>`);
				slave.devotion += 4;
			} else if (slave.devotion >= -50) {
				r.push(`reluctantly accepts ${his} new name.`);
			} else {
				r.push(`angrily tries to resist ${his} new name, insisting that ${his} name is ${SlaveFullBirthName(slave)}. This resistance <span class="devotion dec">increases ${his} rebelliousness.</span>`);
				slave.devotion -= 5;
			}
		} else {
			r.push(`Since ${slave.slaveName} has already had a new name`);
			if (slave.devotion > 20) {
				r.push(`given to`);
			} else {
				r.push(`forced on`);
			}
			r.push(`${him} before, the mere fact of having it changed again doesn't really affect ${him}.`);
		}

		let insultingName = false;
		let toSearch;
		if (oldName !== slave.slaveName && typeof slave.slaveName === "string") {
			toSearch = slave.slaveName.toLowerCase();
			insultingName = App.Data.misc.badWords.some((s) => toSearch.includes(s));
		}
		if (!insultingName) {
			if (oldSurname !== slave.slaveSurname && typeof slave.slaveSurname === "string") {
				toSearch = slave.slaveSurname.toLowerCase();
				insultingName = App.Data.misc.badWords.some((s) => toSearch.includes(s));
			}
		}
		if (insultingName) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`${His} new name would be insulting to a normal ${girl}, but ${he} dully accepts that it is an accurate description and goes about ${his} duties.`);
			} else if (slave.devotion < -50) {
				r.push(`Being given such a degrading name <span class="devotion dec">further increases ${his} hatred</span> of you.`);
				slave.devotion -= 5;
			} else if (slave.devotion <= 50) {
				r.push(`Being given such a degrading name <span class="trust dec">terrifies ${him},</span> since ${he} thinks it's fair warning for what ${he}'ll suffer in the future.`);
				slave.trust -= 5;
			}
		}

		/* Wife's surname reaction */
		if (oldSurname !== slave.slaveSurname) {
			if (slave.relationship >= 5) {
				const slaveWife = getSlave(slave.relationshipTarget);
				if (!slaveWife) {
					r.push(`<span class="red">Error, relationshipTarget not found.</span>`);
				} else {
					if (slaveWife.slaveSurname) {
						const {wife2} = getPronouns(slaveWife).appendSuffix('2');
						if (slave.slaveSurname === slaveWife.slaveSurname) {
							r.push(`${He}'s touched that ${he} now shares a surname with ${his} ${wife2} ${slaveWife.slaveName} ${slaveWife.slaveSurname}, and is <span class="trust inc">more confident than ever</span> that you intend to keep them together in marital bliss.`);
							slave.trust += 5;
						} else if (oldSurname === slaveWife.slaveSurname) {
							r.push(`${He}'s concerned that ${he} no longer shares a surname with ${his} ${wife2} ${slaveWife.slaveName} ${slaveWife.slaveSurname}, and is <span class="trust dec">very worried</span> that you might be considering splitting them up.`);
							slave.trust -= 5;
						}
					}
				}
			}
		}

		/* PC's surname reaction */
		if (oldSurname !== slave.slaveSurname) {
			if (slave.relationship === -3) {
				if (V.PC.slaveSurname) {
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`Names are meaningless to ${him} and it is unlikely ${he}'ll remember it.`);
					} else if (slave.devotion + slave.trust >= 175) {
						if (slave.slaveSurname === V.PC.slaveSurname) {
							r.push(`When you tell ${him} that ${he}'s to be known as ${slave.slaveName} ${slave.slaveSurname} now, ${he} starts to cry. ${He} tries to get ${himself} under control and thank you as best ${he} can,`);
							if (hasAnyArms(slave)) {
								r.push(`wiping at the tears running down ${his} ${slave.skin} cheeks,`);
							}
							r.push(`but ${he} can't seem to stop weeping as ${he} thanks you over and over. ${He}'s a sex slave, your property, and it's understandable that some doubts about the permanence of ${his} place as your slave ${wife}. This has <span class="trust inc">helped reassure ${him},</span> and explains the strength of ${his} emotional reaction. The next time you make love to ${him}, ${he} <span class="devotion inc">presses ${himself} as close to you as ${he} can,</span> eager to drink in as much of your presence as ${he} can get.`);
							slave.devotion += 5;
							slave.trust += 5;
						} else if (oldSurname === V.PC.slaveSurname) {
							r.push(`${He}'s devastated that you'd rename ${him} something other than your name. ${He}'s <span class="trust dec">terrified</span> that you intend to discard ${him} as your slave ${wife}, and <span class="devotion dec">saddened</span> that you would take away something that was precious to ${him}.`);
							slave.devotion -= 5;
							slave.trust -= 5;
						}
					} else if (slave.devotion < -20 && slave.trust > 20) {
						if (slave.slaveSurname === V.PC.slaveSurname) {
							r.push(`When you tell ${him} that ${he}'s to be known as ${slave.slaveName} ${slave.slaveSurname} now, ${he} shows no reaction. You already took everything from ${him}, what's a name at this point?`);
						} else if (oldSurname === V.PC.slaveSurname) {
							r.push(`${He} doesn't care about losing your surname at first, but it quickly sets in that ${he} may have <span class="trust dec">pushed ${his} position too far.</span>`);
							slave.trust -= 20;
						}
					} else if (slave.devotion < -20) {
						if (slave.slaveSurname === V.PC.slaveSurname) {
							r.push(`When you tell ${him} that ${he}'s to be known as ${slave.slaveName} ${slave.slaveSurname} now, ${he} pleads with you not to steal ${his} name. It matters little to you, and ${he} is forced to <span class="devotion inc">accept your will.</span>`);
							slave.devotion += 5;
						} else if (oldSurname === V.PC.slaveSurname) {
							r.push(`${He}'s <span class="devotion dec">happy</span> to no longer have to share a name with ${his} tormentor, but the bliss doesn't last long as <span class="trust dec">dread</span> quickly sets in about what this may mean.`);
							slave.devotion += 5;
							slave.trust -= 10;
						}
					} else {
						if (slave.slaveSurname === V.PC.slaveSurname) {
							r.push(`When you tell ${him} that ${he}'s to be known as ${slave.slaveName} ${slave.slaveSurname} now, ${he} nods with approval feeling <span class="trust inc">that ${he} may hold at least some value in your eyes.</span>`);
							slave.trust += 5;
						} else if (oldSurname === V.PC.slaveSurname) {
							r.push(`${He} accepts that you'd rename ${him} something other than your name. ${He}'s <span class="trust dec">a little scared</span> that you intend to discard ${him} as your slave ${wife}, or worse, but realizes this was not only a possibility, but likely.`);
							slave.trust -= 5;
						}
					}
				}
			}
		}
	}
	return jQuery("#rename").empty().append(r.join(" "));
};
