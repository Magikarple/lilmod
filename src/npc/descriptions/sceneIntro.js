// cSpell:ignore cybering

/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} descType
 * @param {boolean} links
 * @returns {Array<string|HTMLElement>}
 */
App.Desc.sceneIntro = function(slave, descType, links) {
	/** @type {Array<string|HTMLElement>} */
	const r = [];
	const {
		he, him, his, He, His, himself, wife
	} = getPronouns(slave);
	const relTarget = slave.relationship > 0 ? getSlave(slave.relationshipTarget) : null;

	if (descType === DescType.EVENT) {
		r.push(`${He} is currently involved in an event, but is assigned to ${slave.assignment}.`);
		if (slave.assignment === Job.SUBORDINATE) {
			let lsd = getSlave(slave.subTarget);
			if (lsd) {
				r.push(`${He} has been ordered to serve`, App.UI.DOM.makeElement("span", slaveReference(lsd), ["slave", "name", "simple"]), `specifically.`);
			}
		}
	} else if (descType !== DescType.MARKET) {
		r.push(inspectionIntro());
		if (slave.sentence > 0) {
			r.push(sentence());
		}
		if (slave.fuckdoll === 0) {
			if (slave.voice !== 0) {
				r.push(voice());
			}
		}
		r.push(...relationship());
		if (slave.fuckdoll === 0) {
			r.push(sleepLoc());
		}
	}
	return r;

	function inspectionIntro() {
		const r = [];
		if (slave.fuckdoll > 0) {
			r.push(`You order another slave to bring ${him} before your desk so you can inspect ${him}.`);
		} else if ((slave.assignment === Job.DAIRY) && (V.dairyRestraintsSetting > 1)) {
			r.push(`You go down to ${V.dairyName} to inspect ${his} heaving body.`);
		} else if (slave.assignment === Job.AGENT) {
			const arc = V.arcologies.find(a => a.leaderID === slave.ID);
			r.push(`You place a call to ${arc ? arc.name : `${his} current location`}, and ${he} instantly appears on camera.`);
		} else {
			r.push(`${He} comes to you for an inspection`);
			switch (slave.assignment) {
				case Job.WHORE:
				case Job.BROTHEL:
					r.push(`between customers.`);
					break;
				case Job.PUBLIC:
					r.push(`from where ${he} was offering ${himself} publicly.`);
					break;
				case Job.CLUB:
					r.push(`from where ${he} was dancing in ${V.clubName}.`);
					break;
				case Job.GLORYHOLE:
					r.push(`straight from confinement in a glory hole.`);
					break;
				case Job.ARCADE:
					r.push(`straight from confinement in ${V.arcadeName}.`);
					break;
				case Job.MILKED:
				case Job.DAIRY:
					r.push(`between milkings.`);
					break;
				case Job.FARMYARD:
					r.push(`from where ${he} was taking care of crops and animals.`);
					break;
				case Job.REST:
					r.push(`from where ${he} was resting.`);
					break;
				case Job.NURSERY:
					r.push(`from where ${he} was`);
					if (V.nurseryChildren === 1) {
						r.push(`taking care of a child.`);
					} else if (V.nurseryChildren > 0) {
						r.push(`taking care of children.`);
					} else {
						r.push(`keeping ${V.nurseryName} clean.`);
					}
					break;
				case Job.FUCKTOY:
					r.push(`from where ${he} was offering ${himself} to you.`);
					break;
				case Job.MASTERSUITE:
					r.push(`from ${V.masterSuiteName}.`);
					break;
				case Job.SUBORDINATE:
					if (slave.subTarget === -1) {
						r.push(`from where ${he} was resting after ${his} latest baby-making session.`);
					} else {
						r.push(`straight from orally servicing another slave.`);
					}
					break;
				case Job.HOUSE:
				case Job.QUARTER:
					r.push(`straight from bathing another slave.`);
					break;
				case Job.TEACHER:
					r.push(`between slave training contracts.`);
					break;
				case Job.SCHOOL:
				case Job.CLASSES:
					r.push(`between classes.`);
					break;
				case Job.CONFINEMENT:
					r.push(`straight from ${his} confinement.`);
					break;
				case Job.CELLBLOCK:
					r.push(`straight from ${his} cell in ${V.cellblockName}.`);
					break;
				case Job.BODYGUARD:
					r.push(`armed and alert.`);
					break;
				case Job.RECRUITER:
					if (V.recruiterTarget !== "other arcologies") {
						r.push(`after ${he} finishes cybering with a prospective recruit.`);
					} else if (V.arcologies[0].influenceTarget === -1) {
						r.push(`right away, since you haven't decided on an arcology to target for cultural influence, leaving ${him} with nothing to do.`);
					} else {
						const arc = V.arcologies.find(a => a.direction === V.arcologies[0].influenceTarget);
						r.push(`from where ${he} was resting after ${his} latest sexually exhausting visit to ${arc ? arc.name : "a nearby arcology"}.`);
					}
					break;
				case Job.HEADGIRL:
					r.push(`with updates on your other slaves ready for your review.`);
					break;
				default:
					r.push(`as quickly as ${he} can. ${He} is assigned to ${slave.assignment}.`);
			}
		}
		return r.join(" ");
	}

	function sentence() {
		const r = [];

		if (slave.assignment === Job.GLORYHOLE) {
			r.push(`${His} sentence lasts another`);
			if (slave.sentence > 1) {
				r.push(`${slave.sentence} weeks.`);
			} else {
				r.push(`week.`);
			}
		} else {
			r.push(`${His} work assignment lasts another`);
			if (slave.sentence > 1) {
				r.push(`${slave.sentence} weeks.`);
			} else {
				r.push(`week.`);
			}
		}

		return r.join(" ");
	}

	function voice() {
		const r = [];

		if (slave.rules.speech === "restrictive") {
			r.push(`${He} is not allowed to speak unless spoken to, but when allowed, ${he} speaks in a`);
		} else {
			r.push(`${He} is allowed to ask questions, and when ${he} speaks, ${he} does so in a`);
		}
		if (slave.voice === 1) {
			if (slave.voiceImplant < 0) {
				r.push(`ridiculously deep, gravelly voice.`);
			} else {
				r.push(`deep, unfeminine voice.`);
			}
		} else if (slave.voice === 2) {
			if (slave.voiceImplant !== 0) {
				r.push(`slightly artificial feminine voice.`);
			} else {
				r.push(`pretty, feminine voice.`);
			}
		} else if (slave.voice === 3) {
			if (slave.voiceImplant > 0) {
				r.push(`ridiculously high, bubblegum voice.`);
			} else {
				r.push(`high, girly voice.`);
			}
		}

		if (canTalk(slave, false)) {
			r.push(App.Desc.accent(slave));
		}

		return r.join(" ");
	}

	function relationship() {
		/** @type {Array<string|HTMLElement>} */
		const r = [];

		if (slave.relationship === -3) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`${He} is <span class="relationship">married to you,</span> not that it matters to ${his} broken mind; to ${him}, ${he} is a slave, nothing more.`);
			} else if (slave.devotion + slave.trust >= 175) {
				r.push(`${He} is <span class="relationship">happily married to you,</span> though of course ${he} is still your slave; albeit a loving, devoted one.`);
			} else if (slave.devotion < -20 && slave.trust > 20) {
				r.push(`${He} is <span class="relationship">reluctantly married to you,</span> though of course ${he} is still your slave.`);
			} else if (slave.devotion < -20) {
				r.push(`${He} is <span class="relationship">forcibly married to you,</span> though of course ${he} is still your slave.`);
			} else {
				r.push(`${He} is <span class="relationship">married to you,</span> though of course ${he} is still your slave.`);
			}
		} else if (slave.relationship === -1) {
			r.push(`${He} is an <span class="relationship">emotional slut,</span> happy to remain officially single and free to treat everyone equally.`);
		} else if (slave.relationship === -2) {
			r.push(`${He} is <span class="relationship">emotionally bound to you;</span> ${his} feelings for you are comparable to those in a healthy, loving relationship.`);
		} else if (slave.relationship !== 0 && relTarget) {
			r.push(`${He} is`);
			// TODO: update this with the new relationship rules
			if (slave.relationship <= 1) {
				r.push(slaveRelationshipSpan(`friends with `, slaveReference(relTarget), `;`), `the rules`);
				if (slave.rules.relationship !== "restrictive") {
					r.push(`encourage`);
				} else {
					r.push(`discourage`);
				}
				r.push(`their relationship.`);
			} else if (slave.relationship <= 2) {
				r.push(slaveRelationshipSpan(`best friends with `, slaveReference(relTarget), `;`), `the rules`);
				if (slave.rules.relationship !== "restrictive") {
					r.push(`encourage`);
				} else {
					r.push(`discourage`);
				}
				r.push(`their close relationship.`);
			} else if (slave.relationship <= 3) {
				r.push(slaveRelationshipSpan(slaveReference(relTarget), `'s friend with benefits;`), `the rules`);
				if (slave.rules.relationship === "permissive") {
					r.push(`encourage`);
				} else {
					r.push(`discourage`);
				}
				r.push(`their sexual relationship.`);
			} else if (slave.relationship <= 4) {
				r.push(slaveRelationshipSpan(slaveReference(relTarget), `'s lover;`), `the rules`);
				if (slave.rules.relationship === "permissive") {
					r.push(`encourage`);
				} else {
					r.push(`discourage`);
				}
				r.push(`their passionate relationship.`);
			} else if (slave.relationship > 4) {
				r.push(slaveRelationshipSpan(slaveReference(relTarget), `'s slave ${wife};`), `the rules`);
				if (slave.rules.relationship === "permissive") {
					r.push(`encourage`);
				} else {
					r.push(`discourage`);
				}
				r.push(`marital bliss.`);
			}
		} else if (slave.fuckdoll === 0) {
			if (slave.rules.relationship === "restrictive") {
				r.push(`The rules forbid ${him} from associating freely with other slaves.`);
			} else if (slave.career === "a Futanari Sister") {
				r.push(`The rules encourage ${him} to form friendships with other slaves, but ${he} seems disinclined to do so. ${He}'s both friendly with them and eagerly sexual with them when allowed, but ${he} seems to be waiting for someone, deep down.`);
			} else if (slave.rules.relationship === "just friends") {
				r.push(`The rules encourage ${him} to form friendships with other slaves.`);
			} else {
				r.push(`The rules encourage ${him} to form relationships with other slaves.`);
			}
		}

		return r;
	}

	/**
	 * @param {Array<string|HTMLElement>} parts
	 * @returns {HTMLSpanElement}
	 */
	function slaveRelationshipSpan(...parts) {
		const span = document.createElement("span");
		span.classList.add("si-relationship");
		span.append(...parts);
		return span;
	}

	function sleepLoc() {
		const r = [];

		if (slave.ID === V.HeadGirlID && V.HGSuite === 1) {
			r.push(`${He} lives in ${his} own suite within your penthouse,`);
		} else if ((slave.ID === V.BodyguardID) && (V.dojo > 1)) {
			r.push(`${He} lives in ${his} own room within the armory,`);
		} else if ([Job.MASTERSUITE, Job.CONCUBINE].includes(slave.assignment) && V.masterSuiteUpgradeLuxury === 1) {
			r.push(`${He} sleeps with you in your bed,`);
		} else if ((slave.assignment === Job.DAIRY) && (V.dairyRestraintsSetting > 1)) {
			r.push(`${He} sleeps attached to a milking machine,`);
		} else if (slave.rules.living === "spare") {
			r.push(`${He} sleeps on a bedroll,`);
		} else if (slave.rules.living === "normal") {
			r.push(`${He} sleeps on a cot,`);
		} else if (slave.relationship >= 4 && relTarget) {
			const {wife2, girl2} = getPronouns(relTarget).appendSuffix('2');
			r.push(`${He} has ${his} own room, which ${he} shares with ${his}`);
			if (slave.relationship === 5) {
				r.push(wife2);
			} else {
				r.push(`${girl2}friend`);
			}
			r.push(`whenever they can manage it,`);
		} else {
			r.push(`${He} sleeps in ${his} own little room,`);
		}
		r.push(App.Desc.releaseDesc(slave));

		return r.join(" ");
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string|HTMLSpanElement}
	 */
	function slaveReference(slave) {
		if (links) {
			return App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave));
		} else {
			return SlaveFullName(slave);
		}
	}
};
