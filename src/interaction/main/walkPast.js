// cSpell:ignore pantsed

globalThis.walkPast = (function() {
	// core string variables
	let t;

	// selection variables
	let target;
	let partnerSlave;

	/** generate a walkPast vignette
	 * @param {App.Entity.SlaveState} activeSlave
	 * @param {string} [fixedTarget] - if set, force target to this value
	 * @returns {DocumentFragment} - vignette
	 */
	function walkPast(activeSlave, fixedTarget) {
		let output = "";
		let partner = "";

		if (totalRelatives(activeSlave) > 0 && ((fixedTarget === "fRelation") || (!fixedTarget && jsRandom(1, 100) > 80))) {
			partner = "relation";
		} else if (activeSlave.relationship > 0 && ((fixedTarget === "fRelation") || (!fixedTarget && jsRandom(1, 100) > 70))) {
			partner = "relationship";
		} else if (activeSlave.rivalry !== 0 && hasAllLimbs(activeSlave) && ((fixedTarget === "fRival") || (!fixedTarget && jsRandom(1, 100) > 70))) {
			partner = "rivalry";
		} else {
			partner = "";
		}

		// return if we insist on a relation or rival but we didn't find one above
		if (["fRelation", "fRival"].includes(fixedTarget) && !partner) {
			return;
		}

		const seed = jsRandom(1, 100);

		// loverSlave outputs for both slaves, but other paths require primeSlave output first
		if (partner !== "relationship" || !App.Utils.hasPartnerSex(activeSlave)) {
			output += primeSlave(activeSlave, seed);
		}

		if (partner === "rivalry") {
			output += rivalSlave(activeSlave, seed);
		} else if (partner === "relationship" && App.Utils.hasPartnerSex(activeSlave)) {
			output += loverSlave(activeSlave);
		} else if (partner === "relationship" || partner === "relation") {
			output += relatedSlave(activeSlave, partner);
		} else {
			switch (fixedTarget) {
				case "fLips":
					output += lipWatch(activeSlave);
					break;
				case "fBoobs":
					output += boobWatch(activeSlave);
					break;
				case "fButt":
					output += buttWatch(activeSlave);
					break;
				case "fAnus":
					output += anusWatch(activeSlave);
					break;
				case "fVagina":
					if (activeSlave.belly < 150000) {
						if (activeSlave.vagina >= 0) {
							output += `<br><span class="note">Vagina scene available:</span> ${vaginaWatch(activeSlave)}`;
						}
					}
					if (activeSlave.belly >= 1500) {
						output += `<br><span class="note">Belly scene available:</span> ${bellyWatch(activeSlave)}`;
					}
					break;
				case "fDick":
					if (activeSlave.belly < 150000) {
						if (activeSlave.dick > 0 && (V.policies.sexualOpenness === 1 || activeSlave.toyHole === "dick")) {
							output += dickWatch(activeSlave);
						} else {
							return;
						}
					}
					break;
				case "fSuckDick":
					if (activeSlave.belly < 150000) {
						if (activeSlave.dick > 0 && !activeSlave.chastityPenis && (V.policies.sexualOpenness === 1 || activeSlave.toyHole === "dick") && V.experimental.interactions) {
							output += suckDickWatch(activeSlave);
						} else {
							return;
						}
					}
					break;
				default: { // invalid or unspecified fixed target
					let watchArray = [];
					if (activeSlave.fuckdoll === 0) {
						watchArray.push(boobWatch);
					}
					if (activeSlave.belly < 150000) {
						if (activeSlave.dick > 0 && (V.policies.sexualOpenness === 1 || activeSlave.toyHole === "dick")) {
							watchArray.push(dickWatch);
							if (!activeSlave.chastityPenis && V.experimental.interactions) {
								watchArray.push(suckDickWatch);
							}
						}
						if (activeSlave.vagina >= 0) {
							watchArray.push(vaginaWatch);
						}
					}
					if (activeSlave.belly >= 1500) {
						watchArray.push(bellyWatch);
					}
					if (activeSlave.chastityAnus === 0) {
						watchArray.push(anusWatch);
					}
					watchArray.push(buttWatch);
					watchArray.push(lipWatch);
					output += jsEither(watchArray)(activeSlave);
				}
			}
		}

		const {
			him, his, He,
		} = getPronouns(activeSlave);

		let links = [];
		const executeWalkpast = (passage, ...args) => {
			$(linkSpan).empty().append(App.Interact[passage](activeSlave, ...args));
		};
		if (activeSlave.fuckdoll === 0) {
			if (target === "fButt" && activeSlave.chastityAnus) {
				output += ` If you wish to have anal intercourse with ${him} you must order ${him} to remove ${his} chastity belt.`;
				links.push(App.UI.DOM.link(`Grope ${his} rear instead`, executeWalkpast, ["fondleButt"]));
			} else if (target === "fVagina" && activeSlave.chastityVagina) {
				output += ` If you wish to have vanilla intercourse with ${him} you must order ${him} to remove ${his} chastity belt.`;
			} else if (target === "fRelation" || target === "fRival") {
				links.push(App.UI.DOM.link(`Summon them both`, executeWalkpast, [target, partnerSlave]));
			} else if (activeSlave.assignment === Job.CONFINEMENT) {
				links.push(App.UI.DOM.link(`Have ${him} brought out of ${his} cell`, executeWalkpast, [target]));
			} else if (activeSlave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1) {
				output += ` ${He} is strapped into a milking machine and cannot leave ${V.dairyName}.`;
			} else {
				if ([Job.ARCADE, Job.CELLBLOCK, Job.ATTENDANT, Job.DJ, Job.MADAM, Job.MILKMAID, Job.TEACHER, Job.STEWARD, Job.WARDEN, Job.AGENT, Job.CONCUBINE, Job.AGENTPARTNER, Job.HEADGIRLSUITE, Job.CLUB, Job.MASTERSUITE, Job.CONFINEMENT, Job.GLORYHOLE, Job.QUARTER, Job.BROTHEL, Job.DAIRY].includes(activeSlave.assignment)) {
					links.push(App.UI.DOM.link(`Have ${him} take a break and come up`, executeWalkpast, [target]));
				} else {
					links.push(App.UI.DOM.link(`Call ${him} over`, executeWalkpast, [target]));
				}
			}
		} else {
			switch (target) {
				case "fVagina":
					links.push(App.UI.DOM.link(`Fuck ${him}`, executeWalkpast, ["fFuckdollVaginal"]));
					break;
				case "fButt":
				case "fAnus":
					links.push(App.UI.DOM.link(`Fuck ${him}`, executeWalkpast, ["fFuckdollAnal"]));
					break;
				default:
					links.push(App.UI.DOM.link(`Fuck ${him}`, executeWalkpast, ["fFuckdollOral"]));
			}
		}

		if (V.debugMode && passage() !== "Walk Past List") {
			links.push(App.UI.DOM.passageLink("Show all walk past scenes", "Walk Past List"));
		}

		const frag = document.createDocumentFragment();
		$(frag).append(output + ' ');
		const linkSpan = App.UI.DOM.appendNewElement("span", frag, App.UI.DOM.generateLinksStrip(links));
		return frag;
	}

	/** Generate walkpast for the main slave we're looking at
	 * @param {App.Entity.SlaveState} activeSlave
	 * @param {number} seed
	 * @returns {string}
	 */
	function primeSlave(activeSlave, seed) {
		let r = `${activeSlave.slaveName} `;
		r += walkPasts(activeSlave, seed);
		t = "";

		return r;
	}

	/** Generate walkpast for the rival of the slave we're looking at
	 * @param {App.Entity.SlaveState} activeSlave
	 * @param {number} seed
	 * @returns {string}
	 */
	function rivalSlave(activeSlave, seed) {
		partnerSlave = getSlave(activeSlave.rivalryTarget);
		let r = "";

		const {
			he, his,
		} = getPronouns(activeSlave);

		if (partnerSlave !== undefined) { /* potential problem point */
			r += " Meanwhile, ";
			if (activeSlave.rivalry >= 3) {
				r += `${partnerSlave.slaveName}, whom ${he} hates, `;
			} else if (activeSlave.rivalry >= 2) {
				r += `${his} rival ${partnerSlave.slaveName} `;
			} else {
				r += `${partnerSlave.slaveName}, whom ${he} dislikes, `;
			}
			r += walkPasts(partnerSlave, 100 - seed);

			target = "fRival";
		}

		return r + ` `;
	}

	/** Generate walkpast for the lover of the slave we're looking at
	 * @param {App.Entity.SlaveState} activeSlave
	 * @returns {string}
	 */
	function loverSlave(activeSlave) {
		t = "";
		partnerSlave = getSlave(activeSlave.relationshipTarget);
		const fuckSeed = jsRandom(1, 100);
		const seed = jsRandom(1, 100);
		const name = activeSlave.slaveName;
		const race = (V.seeRace ? activeSlave.race : "");

		const {
			he, him, his, himself, boy,
			He, His,
		} = getPronouns(activeSlave);

		if (partnerSlave !== undefined) {
			const {
				he2, him2, his2, himself2,
			} = getPronouns(partnerSlave).appendSuffix("2");
			const partnerName = partnerSlave.slaveName;
			const race2 = (V.seeRace ? partnerSlave.race : "");
			const activeSlaveRel = relationshipTerm(activeSlave);
			const partnerSlaveRel = relationshipTerm(partnerSlave);

			t += `${name} and ${partnerName} are `;
			if (!isSlaveAvailable(partnerSlave)) {
				if (partnerSlave.assignment === Job.DAIRY && V.dairyRestraintsSetting >= 2) {
					t += `trying their best to maintain their relationship with ${partnerName} being part of ${V.dairyName}.`;
				} else if (partnerSlave.assignment === Job.AGENT && activeSlave.assignment !== Job.AGENTPARTNER) {
					t += `catching up with each other over a video call. Running an arcology in your stead comes with its perks.`;
				} else if (partnerSlave.assignment === Job.AGENTPARTNER || activeSlave.assignment === Job.AGENTPARTNER) {
					const arc = V.arcologies.find((a) => (a.leaderID === partnerSlave.ID || a.leaderID === activeSlave.ID));
					t += `having some casual fun with each other in the penthouse of ${arc.name}. ${V.assistant.name} has helpfully put a live feed of their activities up on one of the large screens in your office.`;
				} else if (partnerSlave.assignment === Job.ARCADE) {
					t += `trying their best to maintain their relationship with ${partnerName} being nothing more than a hole in ${V.arcadeName}.`;
				} else {
					t += `trying their best to maintain any sort of relationship as you beat the life out of ${partnerName}.`;
				}
			} else if (seed >= 66) { /* SEXY TIMES */
				let fuckSpot = "";
				if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
					fuckSpot = `in ${partnerName}'s suite`;
				} else if (activeSlave.rules.living === "luxurious") {
					fuckSpot = `in the nice little room they share`;
				} else {
					fuckSpot = `out in the open in the slave dormitory`;
				}

				const thirdWheelAllowed = (activeSlave.rules.release.slaves === 1) && (partnerSlave.rules.release.slaves === 1);
				if (thirdWheelAllowed && (activeSlave.fetish === "dom" || activeSlave.fetish === "sadist") && canPenetrate(activeSlave) && (partnerSlave.fetish === "dom" || partnerSlave.fetish === "sadist") && canPenetrate(partnerSlave)) {
					t += `double penetrating another slave. They're face to face over their sub's shoulders, `;
					if (canSee(activeSlave) && canSee(partnerSlave)) {
						t += `looking into each other's eyes `;
					} else {
						t += `locking lips `;
					}
					t += `with every appearance of enjoyment and love, since for them rubbing dicks inside another slave's pussy is what constitutes healthy sexual activity. ${partnerName} is on the bottom, and holds their victim atop ${him2} with ${partnerName}'s cock already hilted in her cunt so ${name} can force ${himself} inside as well. They enjoy the overstimulated girl's struggles.`;
				} else if (activeSlave.energy > 95) {
					t += `having loud sex ${fuckSpot}. ${name} is such a sexual addict that ${he} wants it all the time, and ${partnerName} does ${his2} best to help ${his2} ${activeSlaveRel} get off. `;
					if (canPenetrate(activeSlave) && fuckSeed > 50) {
						if (canDoVaginal(partnerSlave)) {
							if (partnerSlave.vagina === 0 && hasBothLegs(partnerSlave)) {
								t += `${name} has ${his} cock between ${partnerName}'s legs and is enjoying an enthusiastic thigh job.`;
							} else if (partnerSlave.vagina === 0) {
								t += `${name} has ${his} cock between ${partnerName}'s labia and is enthusiastically teasing ${his} virgin lover.`;
							} else if (fuckSeed > 90 && hasBothLegs(partnerSlave)) {
								t += `${name} has ${partnerName} on ${his2} knees and is enthusiastically fucking ${his2} pussy doggy style.`;
							} else if (fuckSeed > 80 && !isAmputee(activeSlave)) {
								t += `${name} has ${partnerName} pushed against the wall and is fucking ${his2} pussy from behind.`;
							} else if (fuckSeed > 70) {
								t += `${partnerName} has ${name} on ${his} back and is enthusiastically bouncing on ${his} dick.`;
							} else if (fuckSeed > 60) {
								t += `${name} has ${partnerName} on ${his2} back and is enthusiastically fucking ${his2} pussy in the missionary position.`;
							} else {
								t += `${name} is enthusiastically fucking ${partnerName}'s pussy.`;
							}
						} else if (canDoAnal(partnerSlave)) {
							if (partnerSlave.anus === 0) {
								t += `${name} has ${his} cock sandwiched between ${partnerName}'s buttcheeks and is enthusiastically hotdogging ${his2} rear.`;
							} else if (fuckSeed > 90 && hasBothLegs(partnerSlave)) {
								t += `${name} has ${partnerName} on ${his2} knees and is enthusiastically fucking ${his2} ass doggy style.`;
							} else if (fuckSeed > 80 && !isAmputee(activeSlave)) {
								t += `${name} has ${partnerName} pushed against the wall and is fucking ${his2} ass from behind.`;
							} else if (fuckSeed > 70) {
								t += `${partnerName} has ${name} on ${his} back and is enthusiastically bouncing on ${his} dick.`;
							} else if (fuckSeed > 60) {
								t += `${name} has ${partnerName} on ${his2} stomach and is enthusiastically fucking ${his2} ass.`;
							} else {
								t += `${name} is enthusiastically fucking ${partnerName}'s ass.`;
							}
						} else if (partnerSlave.boobs > 800) {
							t += `${name} has ${partnerName} on ${his2} back and is enthusiastically fucking ${his2} tits.`;
						} else {
							t += `${name} has ${partnerName}'s face to ${his} crotch and is enthusiastically pounding ${his2} throat.`;
						}
					} else if (activeSlave.dick > 0 && fuckSeed > 50) {
						t += `${partnerName} has ${his2} lips wrapped around ${name}'s dick and is enthusiastically giving ${him} a blowjob.`;
					} else if (canDoVaginal(activeSlave) && fuckSeed > 30) {
						if (canPenetrate(partnerSlave) && activeSlave.vagina > 0) {
							t += `${partnerName} is enthusiastically fucking ${name}'s pussy.`;
						} else if (canDoVaginal(partnerSlave)) {
							t += `They're scissoring enthusiastically and playing with each other's breasts.`;
						} else {
							t += `${partnerName} is enthusiastically eating out ${name}'s pussy.`;
						}
					} else if (canDoAnal(activeSlave) && activeSlave.anus > 0 && fuckSeed > 10) {
						if (canPenetrate(partnerSlave)) {
							t += `${partnerName} is enthusiastically fucking ${name}'s ass.`;
						} else if (hasAnyArms(partnerSlave)) {
							t += `${partnerName} is enthusiastically fisting ${name}'s ass.`;
						} else {
							t += `${partnerName} is enthusiastically pounding ${name}'s ass with a dildo.`;
						}
					} else {
						t += `${partnerName} is enthusiastically using ${his2} tongue to bring ${name} to orgasm.`;
					}
				} else if (activeSlave.fetishStrength > 60 && activeSlave.fetishKnown === 1 && activeSlave.fetish !== Fetish.NONE) {
					switch (activeSlave.fetish) {
						case "boobs":
							if (fuckSeed > 60 && (activeSlave.lactation > 0 || partnerSlave.lactation > 0)) {
								t += `snuggling rather sexually ${fuckSpot}. `;
								if (fuckSeed > 80 && partnerSlave.lactation > 0) {
									t += `${name} loves how milky ${partnerName}'s tits are and has ${his} lips wrapped around a nipple. `;
									if (hasAnyArms(partnerSlave)) {
										t += `${partnerName} is left to moan lustfully and tweak ${his2} free nipple until ${his2} ${activeSlaveRel} has drunk ${his} fill.`;
									} else {
										t += `${partnerName} is left to moan lustfully and squirm with desire until ${his2} ${activeSlaveRel} has drunk ${his} fill and moves to ${his2} other nipple.`;
									}
								} else {
									t += `${name} loves having ${his} breasts suckled and has ${partnerName}'s lips wrapped around a nipple. `;
									if (hasAnyArms(activeSlave)) {
										t += `${partnerName} is held close until ${his2} ${activeSlaveRel} has been completely emptied.`;
									} else {
										t += `${partnerName} knows that ${his2} ${activeSlaveRel} can't milk ${himself} and appreciates the act.`;
									}
								}
							} else if (fuckSeed > 30 && ((canPenetrate(activeSlave) && partnerSlave.nipples === "fuckable") || (canPenetrate(partnerSlave) && activeSlave.nipples === "fuckable"))) {
								t += `having loud sex ${fuckSpot}. ${name} loves `;
								if (fuckSeed > 45 && (canPenetrate(activeSlave) && partnerSlave.nipples === "fuckable")) {
									t += `taking advantage of ${partnerName}'s fuckable tits. The motion running through ${partnerName}'s breasts as ${he} humps is hypnotic.`;
								} else {
									t += `how well ${partnerName}'s cock feels in ${his} fuckable tits. The motion running through ${name}'s breasts as ${his} ${partnerSlaveRel} fucks ${him} is hypnotic.`;
								}
							} else {
								t += `snuggling rather sexually ${fuckSpot}. ${name} loves having `;
								if (activeSlave.boobs >= partnerSlave.boobs) {
									t += `${his} breasts touched and massaged, so ${partnerName} looks after ${his2} ${activeSlaveRel}'s tits. `;
									if (!hasAnyArms(activeSlave) && !hasAnyArms(partnerSlave)) {
										t += `Since they are both limbless, they've helped each other into a position where each can easily suckle and nuzzle the other's boobs.`;
									} else if (!hasAnyArms(partnerSlave)) {
										t += `Since ${partnerName} is an amputee, ${name} has ${him2} propped on ${his} belly so ${he} can easily suckle and nuzzle.`;
									} else if (hasAnyArms(activeSlave)) {
										t += `${name} is holding on to ${partnerName} so that ${his2} head is in the middle of ${his} breasts.`;
									} else {
										t += `They're spooning in bed with ${partnerName} forming the large spoon so ${he2} can reach around and play with ${name}'s boobs.`;
									}
								} else {
									t += `a nice pair of breasts to enjoy, so ${he} focuses ${his} attention on ${partnerName}'s larger bosom. `;
									if (!hasAnyArms(activeSlave) && !hasAnyArms(partnerSlave)) {
										t += `Since they are both limbless, they've helped each other into a position where each can easily suckle and nuzzle the other's boobs.`;
									} else if (!hasAnyArms(activeSlave)) {
										t += `Since ${name} is an amputee, ${partnerName} has ${him} propped on ${his2} belly so ${he} can make ${himself} comfortable in ${his2} bust.`;
									} else if (hasAnyArms(partnerSlave)) {
										t += `${partnerName} is holding on to ${name} so that ${his} head is in the middle of ${his2} breasts.`;
									} else {
										t += `They're spooning in bed with ${activeSlave} forming the large spoon so ${he} can reach around and play with ${partnerName}'s boobs.`;
									}
								}
							}
							break;
						case "buttslut":
							t += `having loud buttsex ${fuckSpot}. ${name} is such an anal addict that ${he} wants it all the time, and ${partnerName} does ${his2} best to keep ${his2} ${activeSlaveRel} satisfied. `;
							if (activeSlave.anus > 0 && canDoAnal(activeSlave)) {
								t += `${name} is `;
								if (hasBothLegs(activeSlave)) {
									t += `down on ${his} knees in front of ${partnerName}, taking `;
								} else {
									t += `ass up in front of ${partnerName}, taking `;
								}
								if (canPenetrate(partnerSlave)) {
									t += `${his2} cock up the butt. `;
									if (activeSlave.anus > 1) {
										if (partnerSlave.dick > 4) {
											t += `${name} is clearly enjoying getting buttfucked by a cock big enough to make ${him} feel tight again.`;
										} else if (partnerSlave.dick > 2) {
											t += `${name}'s loose ass takes ${partnerName}'s cock easily.`;
										} else {
											t += `${name} can barely tell ${partnerName}'s little dick is even there, but it's the thought that counts.`;
										}
									} else {
										if (partnerSlave.dick > 4) {
											t += `${name} is panting and writhing with the pain of taking ${his} ${partnerSlaveRel}'s massive dick. ${partnerName} is doing ${his2} best to be gentle.`;
										} else if (partnerSlave.dick > 2) {
											t += `${name} is writhing with the mixed pain and pleasure of having ${his} tight ass stretched by ${his} ${partnerSlaveRel}'s nice cock.`;
										} else {
											t += `${name}'s tight anus and ${partnerName}'s little dick work well together; ${name} can take it easily, and ${partnerName} gets to fuck a hole that's tight, even for ${him2}.`;
										}
									}
								} else if (partnerSlave.dick > 1) {
									if (!hasAnyArms(partnerSlave)) {
										t += `a rimjob, since ${his} ${partnerSlaveRel} is armless and `;
									} else {
										t += `a finger fuck, since ${his} ${partnerSlaveRel} is `;
									}
									if (partnerSlave.dick > 6) {
										t += `too big to fit.`;
									} else {
										t += `impotent.`;
									}
									if (hasAnyArms(partnerSlave)) {
										if (activeSlave.anus > 2) {
											t += ` Or rather, a fist fuck, since that's what it takes to satisfy ${his2} ${activeSlaveRel}'s gaping hole.`;
										} else if (activeSlave.anus > 1) {
											t += ` ${partnerName} is using three fingers to stretch ${his2} ${activeSlaveRel}'s asshole.`;
										} else {
											t += ` ${partnerName} is using two fingers to gently fuck ${his2} ${activeSlaveRel}'s tight anus.`;
										}
									}
								} else if (partnerSlave.clit > 3) {
									t += `${his2} clit up the butt. `;
									if (activeSlave.anus > 1) {
										t += `${name} can barely tell ${partnerName}'s unorthodox phallus is in there, but it's the thought that counts.`;
									} else {
										t += `${name}'s tight anus and ${partnerName}'s clitdick work well together; ${name} can take it easily, and ${partnerName} gets to fuck a hole that hugs ${his2} sensitive rod tight.`;
									}
								} else {
									t += `a strap-on up the butt, doggy style. ${partnerName} is using a `;
									if (partnerSlave.anus > 2) {
										t += `massive fake phallus to satisfy ${his} ${activeSlaveRel}'s gaping hole.`;
									} else if (partnerSlave.anus > 1) {
										t += `decent-sized fake phallus to stretch ${his} ${activeSlaveRel}'s asshole.`;
									} else {
										t += `small fake phallus to gently fuck ${his} ${activeSlaveRel}'s tight anus.`;
									}
								}
							} else if (canDoAnal(activeSlave)) {
								t += `Since ${name} is an anal virgin, ${partnerName} is rimming ${his2} ${activeSlaveRel}, who is clearly enjoying ${himself}.`;
							} else {
								t += `Since ${name}'s butthole is off-limits, ${partnerName} is simply toying with the overstimulated ${boy}'s rear.`;
							}
							break;
						case "cumslut":
							t += `sharing oral pleasure ${fuckSpot}. ${name} is such an oral addict that ${he} wants it all the time, and ${partnerName} certainly doesn't mind all the loving oral attention. `;
							if (((activeSlave.chastityPenis !== 1 && activeSlave.dick > 0) || canDoVaginal(activeSlave)) && ((partnerSlave.chastityPenis !== 1 && partnerSlave.dick > 0) || canDoVaginal(partnerSlave))) {
								t += `They're lying down to 69 comfortably, `;
								if (partnerSlave.chastityPenis !== 1 && partnerSlave.dick > 0) {
									if (canPenetrate(partnerSlave)) {
										t += `with ${name} hungrily sucking ${his} ${partnerSlaveRel}'s turgid cock.`;
									} else if (partnerSlave.dick > 7 && hasAnyArms(activeSlave)) {
										t += `with ${name} hungrily sucking ${his} ${partnerSlaveRel}'s fat cock. ${He} is milking the oversized beast as best ${he} can in an effort to draw out a nice, big load of ${his2} cum.`;
									} else if (partnerSlave.anus > 0 && canDoAnal(partnerSlave) && partnerSlave.prostate > 0 && hasAnyArms(activeSlave)) {
										t += `with ${name} hungrily sucking ${his} ${partnerSlaveRel}'s limp cock. ${He} has a finger up poor impotent ${partnerName}'s butt to stimulate ${his2} prostate so ${he2} can cum for ${him}.`;
									} else if (partnerSlave.scrotum > 0 && hasAnyArms(activeSlave)) {
										t += `with ${name} hungrily sucking ${his} ${partnerSlaveRel}'s limp cock. ${He} is massaging ${his2} balls so ${he2} can cum for ${him}.`;
									} else if (hasAnyArms(activeSlave)) {
										t += `with ${name} hungrily sucking ${his} ${partnerSlaveRel}'s limp cock. ${He} has a finger massaging poor impotent ${partnerName}'s perineum in the hope of stimulating ${him2} so ${he2} can cum for ${him}.`;
									} else {
										t += `with ${name} hungrily sucking ${his} ${partnerSlaveRel}'s limp cock in the hopes ${he} can coax something out.`;
									}
								} else if (partnerSlave.balls > 0) {
									t += `with ${name} hungrily sucking the little hole on ${his} ${partnerSlaveRel}'s crotch that ${he2} squirts cum from.`;
								} else {
									t += `and ${name} is sating ${his} oral fixation for the moment by eagerly polishing ${his} ${partnerSlaveRel}'s pearl.`;
								}
							} else if ((partnerSlave.chastityPenis !== 1 && partnerSlave.dick > 0) || canDoVaginal(partnerSlave)) {
								t += `${name} has ${his} face to ${partnerName}'s crotch and is `;
								if (partnerSlave.chastityPenis !== 1 && partnerSlave.dick > 0) {
									if (canPenetrate(partnerSlave)) {
										t += `hungrily sucking ${his} ${partnerSlaveRel}'s turgid cock.`;
									} else if (partnerSlave.dick > 7 && hasAnyArms(activeSlave)) {
										t += `hungrily sucking ${his} ${partnerSlaveRel}'s fat cock. ${He} is milking the oversized beast as best ${he} can in an effort to draw out a nice, big load of ${his2} cum.`;
									} else if (partnerSlave.anus > 0 && canDoAnal(partnerSlave) && partnerSlave.prostate > 0 && hasAnyArms(activeSlave)) {
										t += `hungrily sucking ${his} ${partnerSlaveRel}'s limp cock. ${He} has a finger up poor impotent ${partnerName}'s butt to stimulate ${his2} prostate so ${he2} can cum for ${him}.`;
									} else if (partnerSlave.scrotum > 0 && hasAnyArms(activeSlave)) {
										t += `hungrily sucking ${his} ${partnerSlaveRel}'s limp cock. ${He} is massaging ${his2} balls so ${he2} can cum for ${him}.`;
									} else if (hasAnyArms(activeSlave)) {
										t += `hungrily sucking ${his} ${partnerSlaveRel}'s limp cock. ${He} has a finger massaging poor impotent ${partnerName}'s perineum in the hope of stimulating ${him2} so ${he2} can cum for ${him}.`;
									} else {
										t += `hungrily sucking ${his} ${partnerSlaveRel}'s limp cock in the hopes ${he} can coax something out.`;
									}
								} else if (partnerSlave.balls > 0) {
									t += `hungrily sucking the little hole on ${his} ${partnerSlaveRel}'s crotch that ${he2} squirts cum from.`;
								} else {
									t += `is sating ${his} oral fixation for the moment by eagerly polishing ${his} ${partnerSlaveRel}'s pearl.`;
								}
							} else if (partnerSlave.balls > 0) {
								t += `${name} is eagerly lapping up ${his} ${partnerSlaveRel}'s most recent load of cum.`;
							} else if (activeSlave.balls > 0) {
								t += `${name} is locking lips with ${his} ${partnerSlaveRel} after ${he2} just finished licking up all ${his} cum to share it with ${him}.`;
							} else {
								t += `They have locked lips and are enthusiastically making out.`;
							}
							break;
						case "submissive":
							t += `wrestling ${fuckSpot}. ${name} is such a submissive that ${he} wants to be forced to sexual gratify ${partnerName} all the time, so ${he2} does ${his2} best to give ${his2} ${activeSlaveRel} the constant domination ${he} loves. `;
							if (canPenetrate(partnerSlave) && fuckSeed > 50) {
								if (canDoVaginal(activeSlave)) {
									if (activeSlave.vagina === 0) {
										t += `${partnerName} is rubbing the length of ${his2} erection along ${name}'s virgin pussy and forcing ${him} to reveal just how bad ${he} wants it.`;
									} else if (fuckSeed > 90 && hasBothLegs(activeSlave)) {
										t += `${partnerName} has ${name} on ${his} knees and is forcibly fucking ${his} pussy doggy style while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									} else if (fuckSeed > 80 && !isAmputee(activeSlave) && hasAnyArms(partnerSlave)) {
										t += `${partnerName} has ${name} pushed against the wall and is fucking ${his} pussy from behind while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									} else if (fuckSeed > 70) {
										t += `${partnerName} is on ${his2} back and forcing ${name} to ride ${his2} dick while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									} else if (fuckSeed > 60 && activeSlave.belly < 500 && hasAnyLegs(partnerSlave)) {
										t += `${partnerName} has ${name} on ${his} back and trapped in a mating press, right where a bitch of a ${activeSlaveRel} belongs.`;
									} else {
										t += `${partnerName} is forcing ${himself2} into ${name}'s pussy while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									}
								} else if (canDoAnal(activeSlave)) {
									if (activeSlave.anus === 0) {
										t += `${partnerName} is circling the tip of ${his2} erection around ${name}'s virgin butthole and forcing ${him} to reveal just how bad ${he} wants it.`;
									} else if (fuckSeed > 90 && hasBothLegs(activeSlave)) {
										t += `${partnerName} has ${name} on ${his} knees and is forcibly fucking ${his} ass doggy style while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									} else if (fuckSeed > 80 && !isAmputee(activeSlave) && hasAnyArms(partnerSlave)) {
										t += `${partnerName} has ${name} pushed against the wall and is fucking ${his} ass from behind while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									} else if (fuckSeed > 70) {
										t += `${partnerName} is on ${his2} back and forcing ${name} to ride ${his2} dick anally while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									} else if (fuckSeed > 60) {
										t += `${partnerName} has ${name} pushed face first into the ground has ${him} trapped beneath ${his2} weight while ${he2} fucks ${his2} ass.`;
									} else {
										t += `${partnerName} is forcing ${himself2} into ${name}'s ass while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									}
								} else if (activeSlave.boobs > 800) {
									t += `${partnerName} has ${name} on ${his} back and is forcibly fucking ${his} tits.`;
								} else {
									t += `${partnerName} has ${name}'s face to ${his2} crotch and is forcibly pounding ${his} throat.`;
								}
							} else if (partnerSlave.dick > 0 && fuckSeed > 50) {
								t += `${name} has ${his} lips wrapped around ${partnerName}'s dick and is taking a deepthroating from ${him2}.`;
							} else if (canDoVaginal(partnerSlave) && fuckSeed > 30) {
								if (canPenetrate(activeSlave)) {
									if (partnerSlave.vagina === 0 && hasAnyLegs(partnerSlave)) {
										t += `${partnerName} has a foot on ${name}'s turgid cock and is slowly and methodically keeping ${him} just short of release while ${he} begs for ${him2} to continue.`;
									} else if (partnerSlave.vagina === 0) {
										t += `${partnerName} is rubbing ${his2} virgin pussy along the length of ${name}'s erection and is forcing ${him} to reveal just how badly ${he} wants to stick it in ${him2}. Of course, that's not going to happen and ${name} knows it.`;
									} else if (fuckSeed > 45 && hasBothArms(activeSlave)) {
										t += `${partnerName} is forcing ${name} to hold ${him2} aloft as ${he2} gets fucked by ${his2} bitch of a ${activeSlaveRel}.`;
									} else if (fuckSeed > 40 && !isAmputee(activeSlave) && hasAnyArms(partnerSlave)) {
										t += `${partnerName} has ${name} pinned against the wall and is taking ${his} dick in ${his2} pussy by force.`;
									} else if (fuckSeed > 35) {
										t += `${partnerName} has ${name} on ${his} back and is riding ${his} dick while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									} else {
										t += `${partnerName} has ${name} on ${his} back and is forcibly taking ${his} dick in reverse missionary while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									}
								} else if (canDoVaginal(activeSlave)) {
									t += `${partnerName} is scissoring ${name} while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
								} else {
									t += `${partnerName} is eating out ${name}'s pussy while ${he2} rains loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
								}
							} else if (canDoAnal(partnerSlave) && fuckSeed > 10) {
								if (canPenetrate(activeSlave)) {
									if (partnerSlave.anus === 0 && hasAnyLegs(partnerSlave)) {
										t += `${partnerName} has a foot on ${name}'s turgid cock and is slowly and methodically keeping ${him} just short of release while ${he} begs for ${him2} to continue.`;
									} else if (partnerSlave.vagina === 0) {
										t += `${partnerName} is rubbing ${his2} virgin butthole around the tip of ${name}'s erection and is forcing ${him} to reveal just how badly ${he} wants to stick it in ${him2}. Of course, that's not going to happen and ${name} knows it.`;
									} else if (fuckSeed > 20 && hasBothArms(activeSlave)) {
										t += `${partnerName} is forcing ${name} to hold ${him2} aloft as ${he2} gets anally fucked by ${his2} bitch of a ${activeSlaveRel}.`;
									} else if (fuckSeed > 10 && !isAmputee(activeSlave) && hasAnyArms(partnerSlave)) {
										t += `${partnerName} has ${name} pinned against the wall behind ${him2} and is anally taking ${his} dick by force.`;
									} else {
										t += `${partnerName} has ${name} on ${his} back and is anally riding ${his} dick while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
									}
								} else if (hasAnyArms(partnerSlave)) {
									t += `${partnerName} is fisting ${name}'s ass while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
								} else {
									t += `${partnerName} is pounding ${name}'s ass with a dildo while raining loving insults down on ${his2} bitch of a ${activeSlaveRel}.`;
								}
							} else {
								t += `${partnerName} is forcing ${name} to use ${his} tongue to bring ${him2} to orgasm.`;
							}
							break;
						case "dom":
							t += `wrestling ${fuckSpot}. ${name} is so dominant with other slaves that ${he} prefers to take what ${he} wants, and ${partnerName} does ${his2} best to give ${his2} ${activeSlaveRel} the fight ${he} loves. `;
							if (canPenetrate(activeSlave) && fuckSeed > 50) {
								if (canDoVaginal(partnerSlave)) {
									if (partnerSlave.vagina === 0) {
										t += `${name} has ${partnerName} pinned to the ground with ${his} dick lined up with {his2} virgin pussy. ${partnerName} is struggling and pleading with ${him} not to take it like this.`;
									} else if (fuckSeed > 90 && hasBothLegs(activeSlave)) {
										t += `${name} has ${partnerName} on ${his} knees and is forcibly fucking ${his2} pussy doggy style while {he2} struggles to get away.`;
									} else if (fuckSeed > 80 && hasAnyArms(activeSlave) && !isAmputee(partnerSlave)) {
										t += `${name} has ${partnerName} pushed against the wall and is fucking ${his} pussy from behind while {he2} struggles to get away.`;
									} else if (fuckSeed > 70 && hasAnyArms(activeSlave)) {
										t += `${name} is on ${his} back and forcing ${partnerName} to ride ${his} dick while keeping a firm hold on ${his2} hips.`;
									} else if (fuckSeed > 60 && partnerSlave.belly < 500 && hasAnyLegs(activeSlave)) {
										t += `${name} has ${partnerName} on ${his2} back and trapped in a mating press. ${partnerName} is struggling and begging ${him} not to get ${him2} pregnant.`;
									} else {
										t += `${name} is forcing ${himself} into ${partnerName}'s pussy while {he2} struggles to get away.`;
									}
								} else if (canDoAnal(partnerSlave)) {
									if (partnerSlave.anus === 0) {
										t += `${name} is circling the tip of ${his} erection around ${partnerName}'s virgin butthole. ${partnerName} is struggling and pleading with ${him} not to take it like this.`;
									} else if (fuckSeed > 90 && hasBothLegs(activeSlave)) {
										t += `${name} has ${partnerName} on ${his2} knees and is forcibly fucking ${his2} ass doggy style while {he2} struggles to get away.`;
									} else if (fuckSeed > 80 && hasAnyArms(activeSlave) && !isAmputee(partnerSlave)) {
										t += `${name} has ${partnerName} pushed against the wall and is fucking ${his2} ass from behind while {he2} struggles to get away.`;
									} else if (fuckSeed > 70 && hasBothArms(activeSlave)) {
										t += `${name} is on ${his} back and forcing ${partnerName} to ride ${his} dick anally while keeping a firm hold on ${his2} hips.`;
									} else if (fuckSeed > 60) {
										t += `${name} has ${partnerName} pushed face first into the ground has ${him2} trapped beneath ${his} weight while ${he} fucks ${his2} ass.`;
									} else {
										t += `${name} is forcing ${himself} into ${partnerName}'s ass while {he2} struggles to get away.`;
									}
								} else if (partnerSlave.boobs > 800) {
									t += `${name} has ${partnerName} on ${his2} back and is forcibly fucking ${his2} tits.`;
								} else {
									t += `${name} has ${partnerName}'s face to ${his} crotch and is forcibly pounding ${his2} throat.`;
								}
							} else if (activeSlave.dick > 0 && fuckSeed > 50) {
								t += `${name} is deepthroating ${partnerName} as ${he2} struggles to breath.`;
							} else if (canDoVaginal(activeSlave) && fuckSeed > 30) {
								if (canPenetrate(partnerSlave) && activeSlave.vagina !== 0) {
									if (fuckSeed > 45 && hasBothArms(partnerSlave)) {
										t += `${name} is forcing ${partnerName} to hold ${him} aloft as ${he} enjoys a good vaginal pounding from an unwilling partner.`;
									} else if (fuckSeed > 40 && hasAnyArms(activeSlave) && !isAmputee(partnerSlave)) {
										t += `${name} has ${partnerName} pinned against the wall and is taking ${his2} dick in ${his} pussy by force.`;
									} else if (fuckSeed > 35) {
										t += `${name} has ${partnerName} on ${his2} back and is riding ${his2} dick while ${he2} tries to buck ${him} off.`;
									} else {
										t += `${name} has ${partnerName} on ${his2} back and is forcibly taking ${his} dick in reverse missionary while ${he2} struggles to not cum in ${his2} rapist.`;
									}
								} else if (canDoVaginal(activeSlave) && activeSlave.vagina !== 0) {
									t += `${name} is scissoring the struggling ${partnerName}.`;
								} else {
									t += `${name} is straddling ${partnerName}'s face and forcing ${him2} to eat ${him} out.`;
								}
							} else if (canDoAnal(activeSlave) && canPenetrate(partnerSlave) && fuckSeed > 10 && activeSlave.anus !== 0) {
								if (fuckSeed > 20 && hasBothArms(activeSlave)) {
									t += `${name} is forcing ${partnerName} to hold ${him} aloft as ${he} enjoys a good anal pounding from an unwilling partner.`;
								} else if (fuckSeed > 10 && hasAnyArms(activeSlave) && !isAmputee(partnerSlave)) {
									t += `${name} has ${partnerName} pinned against the wall and is taking ${his2} dick in ${his} ass by force.`;
								} else {
									t += `${name} has ${partnerName} on ${his2} back and is anally riding ${his2} dick while ${he2} tries to buck ${him} off.`;
								}
							} else {
								t += `${name} is on top of ${partnerName} getting oral, though it's more of a rough facefuck as ${name} forces `;
								if (canPenetrate(activeSlave)) {
									t += `${his} cock `;
								} else if (activeSlave.clit > 3) {
									t += `${his} clit `;
								} else {
									t += `a strap-on `;
								}
								t += `down ${partnerName}'s throat.`;
							}
							break;
						case "sadist":
							t += `playing pain games ${fuckSpot}. ${name} loves hurting other slaves, even ${his} friends, and ${partnerName} submits to ${his} agonizing ministrations as often as ${name} can cajole or force ${him2} into it. `;
							if (hasAnyArms(activeSlave) && hasAnyLegs(activeSlave)) {
								t += `${name} has ${partnerName} over ${his} knee and is methodically tanning ${his2} ${race2} ass.`;
							} else if (hasAnyArms(activeSlave)) {
								t += `${name} has ${partnerName} on the ground and is methodically tanning ${his2} ${race2} ass.`;
							} else if (hasAnyLegs(activeSlave)) {
								t += `${name} has ${partnerName} over ${his} knee and is methodically striking ${his2} ${race2} ass with a switch held by mouth.`;
							} else {
								t += `${name} has ${partnerName} on the ground and is methodically striking ${his2} ${race2} ass with a switch held by mouth. Even without limbs, ${name} finds a way.`;
							}
							break;
						case "masochist":
							t += `playing pain games ${fuckSpot}. ${name} loves being hurt, so ${partnerName} frequently indulges ${him} with spanking, slapping, pinching, and more exotic forms of abuse. `;
							if (hasAnyArms(partnerSlave) && hasAnyLegs(partnerSlave)) {
								t += `${partnerName} has ${name} over ${his2} knee and is methodically tanning ${his} ${race} ass.`;
							} else if (hasAnyArms(partnerSlave)) {
								t += `${partnerName} has ${name} on the ground and is methodically tanning ${his} ${race} ass.`;
							} else if (hasAnyLegs(partnerSlave)) {
								t += `${partnerName} has ${name} over ${his} knee and is methodically striking ${his} ${race} ass with a switch held by mouth.`;
							} else {
								t += `${partnerName} has ${name} on the ground and is methodically striking ${his} ${race} ass with a switch held by mouth. Having a limbless ${activeSlaveRel} won't deter ${name} from getting worked over the way ${he} craves.`;
							}
							break;
						case "humiliation":
							t += `having open and visible sex `;
							if (activeSlave.rules.living === "luxurious") {
								t += `in the doorway of the nice little room they share.`;
							} else if (activeSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
								t += `in ${name}'s suite.`;
							} else {
								t += `out in the hallway near the slave dormitory.`;
							}
							t += ` ${name} pretends to hate fucking where other slaves can see ${him}, but ${partnerName} knows ${his2} ${activeSlaveRel} gets off on the mild humiliation. ${partnerName} `;
							if (((canDoVaginal(activeSlave) && activeSlave.vagina > 0) || (canDoAnal(activeSlave) && activeSlave.anus > 0)) && fuckSeed > 50) {
								t += `has ${his2} back propped up against a door frame and ${name} in ${his2} lap, so ${he} can blush at any passing slave as ${he} shyly rides ${partnerName}'s `;
								if (partnerSlave.dick > 0 && canPenetrate(partnerSlave)) {
									t += `cock `;
								} else {
									t += `strap-on `;
								}
								if (activeSlave.vagina > 0 && canDoVaginal(activeSlave) && (fuckSeed > 60 || !canDoAnal(activeSlave) || activeSlave.anus === 0)) {
									t += `in ${his} pussy.`;
								} else {
									t += `up ${his} ass.`;
								}
							} else if (activeSlave.dick === 1 && hasAnyArms(partnerSlave) && fuckSeed > 40) {
								t += `jacking off ${name}'s pathetically tiny cock out in the open so ${he} can blush and shiver as passing slaves see how embarrassingly small ${he} is.`;
							} else if (activeSlave.dick === 1 && fuckSeed > 20) {
								t += `having ${name} give ${him2} oral out in the open so ${he} can blush and shiver as passing slaves see what a slut ${he} is.`;
							} else {
								t += `is giving ${name} oral out in the open so ${he} can blush and shiver as passing slaves see ${him} climax.`;
							}
							break;
						case "pregnancy":
							t += `having intimate sex ${fuckSpot}. ${name}'s `;
							if (activeSlave.belly >= 5000) {
								t += `middle is heavily rounded, `;
							} else if (activeSlave.belly >= 1500) {
								t += `middle is quite swollen, `;
							} else {
								t += `urge to breed is raging, `;
							}
							t += ` and ${partnerName} does ${his2} best to keep ${his2} ${activeSlaveRel} satisfied. `;
							if (canPenetrate(activeSlave) && fuckSeed > 70) {
								if (canDoVaginal(partnerSlave) && partnerSlave.vagina > 0 && fuckSeed > 90) {
									if (partnerSlave.belly >= 5000) {
										t += `${partnerName} is `;
										if (partnerSlave.bellyPreg >= 1500) {
											t += `heavily pregnant `;
										} else {
											t += `hugely gravid `;
										}
										t += `${himself2} `;
										if (activeSlave.belly >= 5000) {
											if (hasAnyLegs(activeSlave) && hasAllLimbs(partnerSlave)) {
												t += `so ${name} has ${him2} on all fours as ${he} fucks ${him2} from behind while resting ${his} belly on ${his} love's back.`;
											} else {
												t += `so ${he2} is intertwined as best ${he2} can with ${name} as their combined bellies push into each other.`;
											}
										} else {
											t += `so ${he2} has ${name} on ${his} back so that ${he2} can ride ${him} while `;
											if (hasAnyArms(activeSlave)) {
												t += `letting ${him} fondle ${his2} bouncing belly.`;
											} else {
												t += `giving ${him} a face full of belly.`;
											}
										}
									} else if (partnerSlave.belly === 0) {
										t += `${partnerName} is pinned on ${his2} back by ${name}`;
										if (activeSlave.belly >= 5000) {
											t += `'s belly as ${he} tries ${his} hardest to plant a child in ${him2}.`;
										} else {
											t += ` in a mating press as ${he} tries ${his} hardest to plant a child in ${him2}.`;
										}
									} else {
										if (activeSlave.belly >= 5000) {
											t += `${partnerName} has ${name} on ${his} back so that ${he2} can ride ${him} while lavishing attention on ${his} beloved stomach.`;
										} else {
											t += `${name} has ${partnerName} on ${his2} back so that ${he} can fuck ${him2} while lavishing attention on ${his2} bulging stomach.`;
										}
									}
								} else if (canDoAnal(partnerSlave) && partnerSlave.anus > 0 && fuckSeed > 80) {
									if (partnerSlave.belly >= 5000) {
										t += `${partnerName} is `;
										if (partnerSlave.bellyPreg >= 1500) {
											t += `heavily pregnant `;
										} else {
											t += `hugely gravid `;
										}
										t += `${himself2} `;
										if (activeSlave.belly >= 5000) {
											if (hasAnyLegs(activeSlave) && hasAllLimbs(partnerSlave)) {
												t += `so ${name} has ${him2} on all fours as ${he} fucks ${his2} ass while resting ${his} belly on ${his2} back.`;
											} else {
												t += `so ${he2} is intertwined as best as ${he2} can for anal sex with ${name} as ${his} belly pushes into ${his2} back.`;
											}
										} else {
											t += `so ${he2} has ${name} on ${his} back so that ${he2} can anally ride ${him} while `;
											if (hasAnyArms(activeSlave)) {
												t += `letting ${him} fondle ${his2} bouncing belly.`;
											} else {
												t += `giving ${him} a face full of belly.`;
											}
										}
									} else if (partnerSlave.belly === 0) {
										if (activeSlave.belly >= 5000) {
											t += `${partnerName} has ${name} on ${his} back so that ${he2} can anally ride ${him} while teasing ${his} belly with ${his2} rear.`;
										} else {
											t += `${partnerName} is pinned on ${his2} stomach by ${name} as ${he} tries ${his} hardest to impregnate an anus.`;
										}
									} else {
										if (activeSlave.belly >= 5000) {
											t += `${partnerName} has ${name} on ${his} back so that ${he2} can ride ${him} anally while teasing ${his} prized stomach.`;
										} else {
											t += `${name} has ${partnerName} on ${his2} back so that ${he} can fuck ${him2} anally while teasing ${his2} bulging stomach.`;
										}
									}
								} else if (partnerSlave.boobs >= 2000 && partnerSlave.belly >= 10000 && fuckSeed > 75) {
									t += `${name} is savoring the sensation of ${his} cock between ${partnerName}'s breasts and belly.`;
								} else {
									if (activeSlave.belly >= 5000) {
										t += `${name} is squirming under the sensations of ${partnerName}'s lips around ${his} dick and {his2} head against ${his} underbelly.`;
									} else {
										t += `${partnerName} is vigorously trying to calm ${name}'s libido by sucking load after load out of ${him}.`;
									}
								}
							} else if (canDoVaginal(activeSlave) && fuckSeed > 30) {
								if (canPenetrate(partnerSlave) && activeSlave.vagina > 0 && activeSlave.preg === 0 && activeSlave.ovaries === 1) { // impreg
									if (partnerSlave.belly >= 5000) {
										t += `${partnerName} is `;
										if (partnerSlave.bellyPreg >= 1500) {
											t += `heavily pregnant `;
										} else {
											t += `hugely gravid `;
										}
										t += `${himself2}, but ${name} can't complain about the swollen dome pushing against ${him} as ${he2} fervently tries to sate ${his} lust by putting a baby in ${him}.`;
									} else {
										t += `${partnerName} has ${name} pinned on ${his} back in a mating press as ${he2} fervently tries to sate ${his} lust by putting a baby in ${him}.`;
									}
								} else {
									if (fuckSeed > 50) { // vanilla
										if (canPenetrate(partnerSlave) && activeSlave.vagina !== 0) {
											if (partnerSlave.belly >= 5000) {
												t += `${partnerName} is `;
												if (partnerSlave.bellyPreg >= 1500) {
													t += `heavily pregnant `;
												} else {
													t += `hugely gravid `;
												}
												t += `${himself2} `;
												if (activeSlave.belly >= 5000) {
													t += `so ${he2} has ${name} on ${his} side so that ${he2} can fuck ${his} pussy as best ${he2} can with their mutual bellies in the way.`;
												} else {
													t += `so ${he2} has ${name} on ${his} back so that ${he2} can fuck ${his} pussy as best ${he2} can with ${his2} belly in the way.`;
												}
											} else if (activeSlave.belly >= 5000) {
												t += `${name} is bouncing heavily on ${partnerName}'s erect dick as ${he2} struggles to support ${his} gravid figure.`;
											} else {
												t += `${partnerName} has ${name} pinned on ${his} back in a mating press as ${he2} dutifully blows another load deep in ${his} aching pussy.`;
											}
										} else if (partnerSlave.dick > 0 && activeSlave.belly < 500) {
											t += `${partnerName} is bringing ${his2} limp dick to orgasm and making sure each and every drop is ending up in ${name}'s pussy.`;
										} else {
											if (partnerSlave.belly >= 5000) {
												t += `${partnerName} is `;
												if (partnerSlave.bellyPreg >= 1500) {
													t += `heavily pregnant `;
												} else {
													t += `hugely gravid `;
												}
												t += `${himself2} `;
												if (activeSlave.belly >= 5000) {
													t += `so ${he2} is stomach to stomach with ${name} and making out.`;
												} else {
													t += `so ${he2} is face to face with ${name} and making out.`;
												}
											} else if (activeSlave.belly >= 5000) {
												t += `${partnerName} is teasing ${his2} lover's huge belly.`;
											} else {
												t += `${name} and ${partnerName} are both pretending to be hugely pregnant and cuddling each other.`;
											}
										}
									} else if (canDoVaginal(partnerSlave) && fuckSeed > 40) { // scissor
										if (partnerSlave.belly >= 5000) {
											t += `${partnerName} is `;
											if (partnerSlave.bellyPreg >= 1500) {
												t += `heavily pregnant `;
											} else {
												t += `hugely gravid `;
											}
											t += `${himself2} `;
											if (activeSlave.belly >= 5000) {
												t += `so ${he2} and ${name} are trying their hardest to trib with their ever expanding bodies in the way.`;
											} else {
												t += `so ${name} is savoring the feeling of ${his2} navel tracing ${his} slit.`;
											}
										} else {
											t += `${name} and ${partnerName} `;
											if (activeSlave.vagina > 0 && partnerSlave.vagina > 0) {
												t += `are locked together and sharing a double-ended dildo.`;
											} else {
												t += `are enthusiastically tribbing.`;
											}
										}
									} else { // oral
										if (partnerSlave.belly >= 5000) {
											t += `${partnerName} is `;
											if (partnerSlave.bellyPreg >= 1500) {
												t += `heavily pregnant `;
											} else {
												t += `hugely gravid `;
											}
											t += `${himself2} `;
											if (activeSlave.belly >= 5000) {
												if (activeSlave.dick > 0 && fuckSeed > 25) {
													t += `so ${he2} has to try ${his2} hardest to suck ${name}'s dick with ${his2} belly hindering ${his2} movements; something ${name} enjoys tremendously, second only to the feeling of ${his2} head brushing against ${his} underbelly.`;
												} else {
													t += `so ${he2} has to try ${his2} hardest to orally service ${name} with ${his2} belly in the way; something ${name} enjoys tremendously, second only to the feeling of ${his2} head brushing against ${his} underbelly.`;
												}
											} else {
												if (activeSlave.dick > 0 && fuckSeed > 25) {
													t += `so ${he2} has to try ${his2} hardest to suck ${name}'s dick with ${his2} belly hindering ${his2} movements; something ${name} enjoys tremendously.`;
												} else {
													t += `so ${he2} has to try ${his2} hardest to orally service ${name} with ${his2} belly in the way; something ${name} enjoys tremendously.`;
												}
											}
										} else if (activeSlave.belly >= 5000) {
											if (activeSlave.dick > 0 && fuckSeed > 25) {
												t += `${partnerName} has ${name} pinned under ${his} own gravidity so ${he2} may leisurely suck ${his} dick while teasing ${him} by brushing against ${his} sensitive underbelly.`;
											} else {
												t += `${partnerName} has ${name} pinned under ${his} own gravidity so ${he2} may leisurely eat ${him} out while teasing ${him} by brushing against ${his} sensitive underbelly.`;
											}
										} else {
											if (activeSlave.dick > 0 && fuckSeed > 25) {
												t += `${partnerName} is vigorously trying to calm ${name}'s libido by sucking load after load out of ${him}.`;
											} else {
												t += `${name} is squirming under the sensations of ${partnerName}'s tongue as ${he2} vigorously tries to calm ${his} libido.`;
											}
										}
									}
								}
							} else if (canDoAnal(activeSlave) && canPenetrate(partnerSlave) && fuckSeed > 10) {
								if (activeSlave.anus > 0 && activeSlave.preg === 0 && activeSlave.mpreg === 1) { // impreg
									if (partnerSlave.belly >= 5000) {
										t += `${partnerName} is `;
										if (partnerSlave.bellyPreg >= 1500) {
											t += `heavily pregnant `;
										} else {
											t += `hugely gravid `;
										}
										t += `${himself2}, but ${name} can't complain about the swollen dome pushing against ${his} back as ${he2} fervently tries to sate ${his} lust by putting a baby in ${him}.`;
									} else {
										t += `${partnerName} has ${name} pinned on ${his} stomach as ${he2} fervently tries to sate ${his} lust by putting a baby in ${him}.`;
									}
								} else if (activeSlave.anus === 0) {
									if (partnerSlave.belly >= 5000) {
										t += `${partnerName} is `;
										if (partnerSlave.bellyPreg >= 1500) {
											t += `heavily pregnant `;
										} else {
											t += `hugely gravid `;
										}
										t += `${himself2} `;
										if (activeSlave.belly >= 5000) {
											t += `so ${he2} is stomach to stomach with ${name} and making out.`;
										} else {
											t += `so ${he2} is face to face with ${name} and making out.`;
										}
									} else if (activeSlave.belly >= 5000) {
										t += `${partnerName} is teasing ${his2} lover's huge belly.`;
									} else {
										t += `${name} and ${partnerName} are both pretending to be hugely pregnant and cuddling each other.`;
									}
								} else {
									if (partnerSlave.belly >= 5000) {
										t += `${partnerName} is `;
										if (partnerSlave.bellyPreg >= 1500) {
											t += `heavily pregnant `;
										} else {
											t += `hugely gravid `;
										}
										t += `${himself2} `;
										if (activeSlave.belly >= 5000) {
											t += `so ${he2} has ${name} on ${his} side so that ${he2} can fuck ${his} ass as best ${he2} can with their mutual bellies in the way.`;
										} else {
											t += `so ${he2} has ${name} on ${his} front so that ${he2} can fuck ${his} ass as best ${he2} can with ${his2} belly in the way.`;
										}
									} else if (activeSlave.belly >= 5000) {
										t += `${name} is bouncing heavily on ${partnerName}'s erect dick as ${he2} struggles to anally satisfy ${his2} gravid partner.`;
									} else {
										t += `${partnerName} has ${name} pinned on ${his} front as ${he2} dutifully plows ${his} needy anus in an attempt to sate ${his} bottomless lust.`;
									}
								}
							} else { // oral
								if (partnerSlave.belly >= 5000) {
									t += `${partnerName} is `;
									if (partnerSlave.bellyPreg >= 1500) {
										t += `heavily pregnant `;
									} else {
										t += `hugely gravid `;
									}
									t += `${himself2} `;
									if (activeSlave.belly >= 5000) {
										if (activeSlave.dick > 0 && fuckSeed > 5) {
											t += `so ${he2} has to try ${his2} hardest to suck ${name}'s dick with ${his2} belly hindering ${his2} movements; something ${name} enjoys tremendously, second only to the feeling of ${his2} head brushing against ${his} underbelly.`;
										} else {
											t += `so ${he2} has to try ${his2} hardest to orally service ${name} with ${his2} belly in the way; something ${name} enjoys tremendously, second only to the feeling of ${his2} head brushing against ${his} underbelly.`;
										}
									} else {
										if (activeSlave.dick > 0 && fuckSeed > 5) {
											t += `so ${he2} has to try ${his2} hardest to suck ${name}'s dick with ${his2} belly hindering ${his2} movements; something ${name} enjoys tremendously.`;
										} else {
											t += `so ${he2} has to try ${his2} hardest to orally service ${name} with ${his2} belly in the way; something ${name} enjoys tremendously.`;
										}
									}
								} else if (activeSlave.belly >= 5000) {
									if (activeSlave.dick > 0 && fuckSeed > 5) {
										t += `${partnerName} has ${name} pinned under ${his} own gravidity so ${he2} may leisurely suck ${his} dick while teasing ${him} by brushing against ${his} sensitive underbelly.`;
									} else {
										t += `${partnerName} has ${name} pinned under ${his} own gravidity so ${he2} may leisurely eat ${him} out while teasing ${him} by brushing against ${his} sensitive underbelly.`;
									}
								} else {
									if (activeSlave.dick > 0 && fuckSeed > 5) {
										t += `${partnerName} is vigorously trying to calm ${name}'s libido by sucking load after load out of ${him}.`;
									} else {
										t += `${name} is squirming under the sensations of ${partnerName}'s tongue as ${he2} vigorously tries to calm ${his} libido.`;
									}
								}
							}
							break;
						default:
							t += `having intimate sex ${fuckSpot}.`;
							break;
					}
				} else if (!activeSlave.need || activeSlave.energy < 20) {
					t += `just spooning in bed. Since ${name} `;
					if (activeSlave.energy < 20) {
						t += `in sexually frigid, `;
					} else {
						t += `gets fucked at work, `;
					}
					t += `${partnerName} understands that what ${he} really wants from ${him2} is emotional intimacy. They're cuddling quietly, offering each other silent comfort and companionship.`;
				} else if (canPenetrate(activeSlave) && (partnerSlave.vagina > 0) && canDoVaginal(partnerSlave) && hasAllLimbs(partnerSlave) && (activeSlave.belly + partnerSlave.belly < 10000)) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, making love in the missionary position. ${partnerName} has ${his2} legs wrapped around ${name}'s waist and ${his2} arms hugging ${him} around the chest, and is `;
					if (canSee(partnerSlave)) {
						t += `looking deep into ${his} eyes `;
					} else {
						t += `gazing longingly into ${his} face `;
					}
					t += `as ${he2} enjoys the wonderful feeling of ${his2} ${activeSlaveRel}'s cock in ${his2} womanhood.`;
				} else if (activeSlave.clit > 2 && canDoVaginal(activeSlave) && partnerSlave.vagina > 0 && canDoVaginal(partnerSlave) && hasAllLimbs(partnerSlave) && (activeSlave.belly + partnerSlave.belly < 10000)) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, making love in the missionary position. ${partnerName} has ${his2} legs wrapped around ${name}'s waist and ${his2} arms hugging ${him} around the chest, and is `;
					if (canSee(partnerSlave)) {
						t += `looking deep into ${his} eyes `;
					} else {
						t += `gazing longingly into ${his} face `;
					}
					t += `as ${he2} enjoys the wonderful feeling of ${his2} ${activeSlaveRel}'s huge clit in ${his2} womanhood.`;
				} else if (activeSlave.dick > 1 && canPenetrate(activeSlave) && canDoAnal(partnerSlave) && partnerSlave.anus > 0 && hasBothArms(activeSlave) && activeSlave.belly < 10000) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, having gentle anal sex while spooning. ${name} is enjoying ${partnerName}'s ass, and is doing ${his} best to ensure ${his} ${partnerSlaveRel} enjoys being buttfucked. ${He}'s nibbling ${his} ${partnerSlaveRel}'s `;
					if (partnerSlave.earShape !== "none") {
						t += `ears and `;
					}
					t += `neck, cupping a breast with one hand, and lightly stimulating ${him2} with the other.`;
				} else if (activeSlave.clit > 2 && canDoAnal(partnerSlave) && partnerSlave.anus > 0 && hasAnyArms(partnerSlave) && hasAnyLegs(activeSlave)) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, managing to have clitoral-anal sex. ${partnerName} is face-down with ${his2} ass up, spreading ${his2} buttocks as wide as possible, giving ${his2} ${activeSlaveRel} the opportunity to squat over ${him2} and penetrate it with ${his} huge, erect clit. ${name} can't thrust much, but the shocking lewdness of the act is enough for both of them.`;
				} else if (canPenetrate(activeSlave) && hasBothLegs(partnerSlave) && hasBothArms(activeSlave) && activeSlave.belly < 10000) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, spooning while ${name} gently rubs ${his} cock between ${partnerName}'s thighs, pressed tightly together. Since ${partnerName} is a virgin, this is the closest they can come to penetrative intercourse, but ${name} is enjoying ${partnerName}'s body anyway, and is doing ${his} best to ensure ${his} ${partnerSlaveRel} enjoys ${himself2}. ${He}'s nibbling ${his} ${partnerSlaveRel}'s `;
					if (partnerSlave.earShape !== "none") {
						t += `ears and `;
					}
					t += `neck, cupping a breast with one hand, and lightly stimulating ${him2} with the other.`;
				} else if (activeSlave.clit > 2 && canDoVaginal(activeSlave) && hasBothLegs(partnerSlave)) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, with ${partnerName} down on ${his2} knees in front of ${name}. From behind ${partnerName} it looks like ${he2}'s giving ${his2} ${activeSlaveRel} a conventional, if enthusiastic, blowjob. Only on closer inspection does it become clear how unusual the oral is: ${name} has such a huge clit that ${his} ${partnerSlaveRel} can suck ${him} off just like it were a penis.`;
				} else if (partnerSlave.vagina > 0 && canDoVaginal(partnerSlave) && hasAllLimbs(partnerSlave) && (activeSlave.belly + partnerSlave.belly < 10000)) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, making love in the missionary position. ${partnerName} has ${his2} legs wrapped around ${name}'s waist and ${his2} arms hugging ${him} around the chest, and is `;
					if (canSee(partnerSlave)) {
						t += `looking deep into ${his} eyes `;
					} else {
						t += `gazing longingly into ${his} face `;
					}
					t += `as ${he2} enjoys the feeling of ${his2} ${activeSlaveRel} fucking ${him2} with a strap-on.`;
				} else if (partnerSlave.anus > 0 && canDoAnal(partnerSlave) && hasBothArms(activeSlave) && activeSlave.belly < 10000) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, having gentle anal sex while spooning. ${name} is enjoying penetrating ${partnerName}'s ass with a strap-on, and is doing ${his} best to ensure ${his} ${partnerSlaveRel} enjoys being buttfucked. ${He}'s nibbling ${his} ${partnerSlaveRel}'s `;
					if (partnerSlave.earShape !== "none") {
						t += `ears and `;
					}
					t += `neck, cupping a breast with one hand, and lightly stimulating ${him} with the other.`;
				} else if (hasAnyArms(partnerSlave) && hasAnyArms(activeSlave)) {
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}, enjoying some mutual masturbation.`;
				} else if (isAmputee(partnerSlave)) {
					t += `just cuddling `;
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}. ${name} is using ${partnerName}'s limbless torso as a pillow, which ${partnerName} seems to be enjoying, by ${his2} contented expression.`;
				} else {
					t += `just cuddling `;
					if (partnerSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
						t += `in bed `;
					} else if (activeSlave.rules.living === "luxurious") {
						t += `in bed `;
					} else {
						t += `on ${name}'s bedroll `;
					}
					t += `${fuckSpot}. They're lying quietly, offering each other silent comfort and companionship.`;
				}
			} else if (seed >= 33) { /* CUDDLE TIME */
				if (activeSlave.energy > 95 && fuckSeed > 70) {
					t += `lying in bed together. ${partnerName} has somehow managed to exhaust ${his2} ${activeSlaveRel}, and the sexually sated nympho is curled up with ${his} head on ${partnerName}'s chest, snoring lightly. ${partnerName} is smiling fondly at ${him}.`;
				} else if (activeSlave.fetish !== Fetish.NONE && fuckSeed > 50) {
					switch (activeSlave.fetish) {
						case "boobs":
							t += `sleeping in bed together. ${name} is using ${partnerName}'s `;
							if (partnerSlave.boobs > 10000) {
								t += `enormous breasts`;
							} else if (partnerSlave.boobs > 2000) {
								t += `huge boobs`;
							} else if (partnerSlave.boobs > 300) {
								t += `healthy tits`;
							} else {
								t += `flat chest`;
							}
							if (activeSlave.fetishKnown) {
								t += `, which ${he} loves,`;
							}
							t += ` as a pillow.`;
							break;
						case "buttslut":
							t += `sleeping in bed together. ${partnerName} is sleeping face-down so ${name} can use ${his2} `;
							if (partnerSlave.butt > 8) {
								t += `massive rear`;
							} else if (partnerSlave.butt > 5) {
								t += `huge posterior`;
							} else if (partnerSlave.butt > 2) {
								t += `big butt`;
							} else if (partnerSlave.butt > 1) {
								t += `trim behind`;
							} else {
								t += `skinny ass`;
							}
							if (activeSlave.fetishKnown) {
								t += `, which ${he} loves,`;
							}
							t += ` as a pillow.`;
							break;
						case "cumslut":
							t += `sleeping in bed together. ${name} is spooning ${his} ${partnerSlaveRel}, ${his} head nestled alongside ${partnerName}'s, ${his} `;
							if (activeSlave.lips > 95) {
								t += `massive `;
							} else if (activeSlave.lips > 70) {
								t += `pillowlike `;
							} else if (activeSlave.lips > 40) {
								t += `plush `;
							} else if (activeSlave.lips > 10) {
								t += `pretty `;
							} else {
								t += `thin `;
							}
							t += `lips wet from kissing ${him2} to sleep.`;
							break;
						case "submissive":
						case "masochist":
						case "humiliation":
							t += `sleeping in bed together. ${name} is being spooned by ${his} ${partnerSlaveRel}, smiling peacefully at being held.`;
							break;
						case "dom":
						case "sadist":
							t += `sleeping in bed together. ${name} is spooning ${his} ${partnerSlaveRel} possessively`;
							if (hasAnyArms(activeSlave)) {
								t += `, and even in ${his} sleep, has a proprietary hand on ${partnerName}'s `;
								if (partnerSlave.balls > 0) {
									t += `balls`;
								} else if (partnerSlave.dick > 0) {
									if (!canAchieveErection(partnerSlave)) {
										t += `soft `;
									}
									t += `cock`;
								} else if (partnerSlave.vagina > -1) {
									t += `pussy`;
								} else {
									t += `body`;
								}
							}
							t += `.`;
							break;
						case "pregnancy":
							t += `sleeping in bed together. `;
							if (activeSlave.belly >= 5000 && partnerSlave.belly >= 5000) {
								t += `They are pressed as close as they can be with their rounded middles in the way.`;
							} else if (activeSlave.belly >= 5000) {
								t += `${name} is spooning ${his} ${partnerSlaveRel} possessively, ${his} rounded belly pushing into ${his2} back.`;
							} else if (partnerSlave.belly >= 5000) {
								t += `${name} is spooning ${his} ${partnerSlaveRel} possessively`;
								if (hasAnyArms(activeSlave)) {
									t += `, and even in ${his} sleep, has a proprietary hand on ${partnerName}'s belly`;
								}
								t += `.`;
							} else {
								t += `${name} is being spooned by ${his} ${partnerSlaveRel}, smiling peacefully at being held.`;
							}
							break;
					}
				} else if (partnerSlave.dick > 6 && hasAnyArms(activeSlave) && fuckSeed > 30) {
					t += `sleeping in bed together. ${name} is cuddled up close to ${partnerName}, and is cradling ${his} ${partnerSlaveRel}'s enormous, soft cock with one hand.`;
				} else if (activeSlave.height > partnerSlave.height + 10) {
					t += `sleeping in bed together, with the taller ${name} curled around ${his} little ${partnerSlaveRel}.`;
				} else if (partnerSlave.height > activeSlave.height + 10) {
					t += `sleeping in bed together, with the shorter ${name} curled under ${his} ${partnerSlaveRel}.`;
				} else if (isAmputee(activeSlave)) {
					t += `sleeping in bed together; ${partnerName} is using ${his2} limbless ${activeSlaveRel} as a pillow.`;
				} else if (hasAnyArms(activeSlave) && hasAnyArms(partnerSlave)) {
					t += `resting in bed together, holding hands in their sleep.`;
				} else {
					t += `sleeping quietly in bed together.`;
				}
			} else { /* TOGETHER TIME */
				if (fuckSeed > 75 && activeSlave.behavioralQuirk !== "none") {
					switch (activeSlave.behavioralQuirk) {
						case "confident":
							t += `finishing up a meal together. ${name} `;
							if (canTalk(activeSlave) && canHear(partnerSlave)) {
								t += `is concluding a story for ${his} ${partnerSlaveRel}, ${his} clear confident voice ringing as ${he} relates a slight.`;
							} else {
								t += `is boasting to ${his} ${partnerSlaveRel}, with ${partnerName} nodding in agreement.`;
							}
							break;
						case "cutting":
							t += `seeing to their chores together. ${name} `;
							if (canTalk(activeSlave) && canHear(partnerSlave)) {
								t += `is making biting remarks about another one of your other slaves, with which ${his} ${partnerSlaveRel} agrees tolerantly.`;
							} else {
								t += `is making ${his} thoughts about another one of your other slaves clear to ${his} ${partnerSlaveRel}.`;
							}
							break;
						case "funny":
							if (canTalk(partnerSlave) && canSee(partnerSlave)) {
								t += `seeing to their chores together. ${name} has just produced some unintentional slapstick humor, and ${his} ${partnerSlaveRel} is giggling helplessly at ${his} antics.`;
							} else {
								t += `getting ready for bed. ${name} is making ${his} ${partnerSlaveRel} giggle `;
								if (canTalk(partnerSlave)) {
									t += `silently `;
								} else {
									t += `helplessly `;
								}
								t += `with ${his} antics.`;
							}
							break;
						case "fitness":
							t += `just waking up. `;
							if (hasBothLegs(activeSlave)) {
								t += `${name} is doing ${his} morning crunches, and ${his} ${partnerSlaveRel} is sleepily sitting on ${his} feet to help.`;
							} else {
								t += `${name} is doing ${his} morning exercises, and ${his} ${partnerSlaveRel} is sleepily sitting nearby, providing moral support.`;
							}
							break;
						case "insecure":
							t += `are just waking up. ${name} is getting dressed when ${his} ${partnerSlaveRel} `;
							if ((canTalk(partnerSlave) && canHear(activeSlave)) || (hasAnyArms(partnerSlave) && canSee(activeSlave))) {
								t += `pays ${him} a compliment; ${name} blushes and gives ${partnerName} a kiss.`;
							} else {
								t += `demonstrates how much ${he2} adores ${his} body; ${name} blushes and gives ${partnerName} a kiss.`;
							}
							break;
						case "sinful":
							t += `are just waking up. ${name} appears to be praying, but to go by ${his} ${partnerSlaveRel}'s `;
							if (canTalk(activeSlave) && canHear(partnerSlave)) {
								t += `quiet mirth, ${he} seems to be substituting in some lewd words.`;
							} else if (canSee(partnerSlave)) {
								t += `quiet mirth, ${he} seems to be adding in some lewd motions.`;
							} else {
								t += `blushing, ${he} seems to be substituting in the occasional lewd act.`;
							}
							break;
						case "advocate":
							if (canTalk(activeSlave)) {
								t += `starting a meal together. A third, less well trained slave has asked ${name} an innocent question, and is getting enthusiastic slave dogma in return. ${His} ${partnerSlaveRel} smiles tolerantly.`;
							} else {
								t += `have just woken up. ${name} is planning out how to better convince new slaves that they made the right choice. ${His} ${partnerSlaveRel} just tolerantly goes about tidying up while giving the occasional idea.`;
							}
							break;
						case "adores men":
							if (canSee(activeSlave) && (canSee(partnerSlave) || canHear(partnerSlave))) {
								t += `sharing a meal together. ${name} is making catcalls at passing boys, and ${his} ${partnerSlaveRel} is nudging ${him} in the ribs every time ${he2} catches it.`;
							} else {
								t += `getting ready for bed. ${name} is demonstrating just how much ${he} adores men to ${his} ${partnerSlaveRel} while ${he2} nods `;
								if (partnerSlave.genes === "XX") {
									t += `tolerantly.`;
								} else {
									t += `appreciatively.`;
								}
							}
							break;
						case "adores women":
							if (canSee(activeSlave) && (canSee(partnerSlave) || canHear(partnerSlave))) {
								t += `sharing a meal together. ${name} is making catcalls at passing girls, and ${his} ${partnerSlaveRel} is nudging ${him} in the ribs every time ${he2} catches it.`;
							} else {
								t += `getting ready for bed. ${name} is demonstrating just how much ${he} adores ladies to ${his} ${partnerSlaveRel} while ${he2} nods `;
								if (partnerSlave.genes === "XY") {
									t += `tolerantly.`;
								} else {
									t += `appreciatively.`;
								}
							}
							break;
					}
				} else if (fuckSeed > 50) {
					if ((activeSlave.actualAge >= partnerSlave.actualAge + 10) && canTalk(partnerSlave) && canHear(activeSlave)) {
						t += `tidying up their room together. ${partnerName} is chattering about ${his2} day, while ${name} listens quietly, smiling fondly at ${his} ${partnerSlaveRel}'s prattle.`;
					} else if ((partnerSlave.actualAge >= activeSlave.actualAge + 10) && canTalk(activeSlave) && canHear(partnerSlave)) {
						t += `tidying up their room together. ${name} is chattering about ${his} day, while ${partnerName} listens quietly, smiling fondly at ${his2} ${activeSlaveRel}'s prattle.`;
					} else if (hasAnyArms(activeSlave) && !canTalk(activeSlave) && canSee(partnerSlave)) {
						t += `getting ready for bed. ${name} is using gestures to tell ${his} ${partnerSlaveRel} about ${his} day; ${partnerName} is very patient and does ${his2} best to follow.`;
					} else if (canTalk(activeSlave) && canTalk(partnerSlave) && canHear(activeSlave) && canHear(partnerSlave)) {
						t += `tidying up their room together. ${name} and ${partnerName} are chattering away over inconsequential things.`;
					} else if (canSee(activeSlave) && canSee(partnerSlave) && hasAnyArms(activeSlave) && hasAnyArms(partnerSlave)) {
						t += `getting ready for bed. ${name} and ${partnerName} are rapidly gesturing to each other about their days.`;
					} else {
						t += `getting ready for bed. ${name} and ${his} ${partnerSlaveRel}, ${partnerName}, are leaning against one another, just enjoying each other's warmth.`;
					}
				} else if (fuckSeed > 25) {
					t += `using some of their free time to `;
					if (!canWalk(activeSlave) && canWalk(partnerSlave)) {
						if (canSee(activeSlave) && canSee(partnerSlave)) {
							t += `watch the weather; ${partnerName} helped ${his2} ${activeSlaveRel} to a window so ${he} could look out with ${him2}.`;
						} else {
							t += `get some fresh air; ${partnerName} helped ${his2} ${activeSlaveRel} to a balcony so ${he} could enjoy the breeze with ${him2}.`;
						}
					} else if (!canWalk(partnerSlave) && canWalk(activeSlave)) {
						if (canSee(activeSlave) && canSee(partnerSlave)) {
							t += `watch the weather; ${name} helped ${his} ${partnerSlaveRel} to a window so ${he2} could look out with ${him}.`;
						} else {
							t += `get some fresh air; ${name} helped ${his} ${partnerSlaveRel} to a balcony so ${he2} could enjoy the breeze with ${him}.`;
						}
					} else {
						t += `rest on one of the penthouse balconies and enjoy the weather.`;
					}
				} else {
					if (V.cockFeeder === 1) {
						t += `taking in a meal together; they've chosen dispensers next to each other and are slurping away.`;
					} else if (V.suppository === 1) {
						t += `taking their drugs together; they've chosen fuckmachines next to each other and are `;
						if (canTalk(activeSlave) && canTalk(partnerSlave) && canHear(activeSlave) && canHear(partnerSlave)) {
							t += `chatting quietly as they're sodomized.`;
						} else {
							t += `enjoying their mutual sodomy.`;
						}
					} else {
						t += `eating a quiet meal together.`;
					}
				}
			}
			/* CLOSE SEXY/CUDDLE/TOGETHER TIME */

			target = "fRelation";
		} else {
			t += ` Lover not found!`;
		}

		return t + ` `;
	}

	/** Generate walkpast for a relative or relationship partner of the slave we're looking at
	 * @param {App.Entity.SlaveState} activeSlave
	 * @param {"relation"|"relationship"} partner which kind of partner are we looking for?
	 * @returns {string}
	 */
	function relatedSlave(activeSlave, partner) {
		let r = "";
		const fuckSeed = jsRandom(1, 100);

		const {His} = getPronouns(activeSlave);

		if (partner === "relation") {
			partnerSlave = randomRelatedSlave(activeSlave);
		} else {
			partnerSlave = getSlave(activeSlave.relationshipTarget);
		}

		if (partnerSlave !== undefined) { /* potential problem point */
			r += ` ${His} `;
			if (partner === "relation") {
				r += `${relativeTerm(activeSlave, partnerSlave)} `;
			} else {
				r += `${relationshipTerm(activeSlave)} `;
			}
			r += `${partnerSlave.slaveName} `;
			r += walkPasts(partnerSlave, fuckSeed);

			target = "fRelation";
		} else {
			r += ` Expected ${partner} partner not found!`;
		}

		return r + ` `;
	}

	/** Generate walkpast for a given slave
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} seed
	 * @returns {string}
	 */
	function walkPasts(slave, seed) {
		const {
			he, him, his, himself,
			He,
		} = getPronouns(slave);
		t = "";
		const race = (V.seeRace ? slave.race : "");

		switch (slave.assignment) {
			case Job.AGENT:
				t += `is shaping society in ${his} assigned arcology.`;
				break;
			case Job.AGENTPARTNER:
				t += `is helping ${his} lover shape society in ${his} assigned arcology.`;
				break;
			case Job.DAIRY:
				if (V.dairyRestraintsSetting > 1) {
					t += `is strapped to a milking machine in ${V.dairyName}, `;
					if (slave.ovaries === 1 && V.dairyPregSetting > 0 && jsRandom(1, 2) === 2) {
						if (isFertile(slave)) {
							t += `and is wincing in pain as the machine forces another load of cum into ${his} womb. As you watch, ${his} ${race} stomach steadily swells with baby batter.`;
						} else {
							t += `giving you a good view of ${his} ${race} body and heavy belly on the feeds.`;
						}
					} else if (slave.lactation > 0) {
						if (slave.balls > 0 && jsRandom(1, 2) === 1) {
							if (slave.dick > 0) {
								if (seed > 50) {
									t += `and is having ${his} cock sucked dry. As you watch, `;
									if (slave.scrotum) {
										t += `${his} balls tighten `;
									} else {
										t += `${he} begins to thrust harder `;
									}
									if (V.dairyStimulatorsSetting > 0) {
										t += `as the phallus up ${his} butt `;
									} else {
										t += `as the suction to ${his} dick `;
									}
									t += `forces ${him} closer to yet another ejaculation.`;
								} else {
									t += `and is wincing in pain as the machine sucks ${his} sore cock, but you have a good view of ${his} ${race} body on the feeds.`;
								}
							} else {
								if (seed > 50) {
									t += `and is having ${his} balls sucked dry. As you watch, `;
									if (slave.scrotum) {
										t += `${his} scrotum tightens `;
									} else {
										t += `${he} begins to thrust harder `;
									}
									if (V.dairyStimulatorsSetting) {
										t += `as the phallus up ${his} butt `;
									} else {
										t += `as the suction against ${his} crotch `;
									}
									t += `forces ${him} closer to yet another leaking ejaculation.`;
								} else {
									t += `and is wincing in pain as the machine sucks ${his} empty balls, but you have a good view of ${his} ${race} body on the feeds.`;
								}
							}
						} else {
							if (seed > 50) {
								t += `and is having ${his} tits drained, but you have a good view of ${his} ${race} body on the feeds.`;
							} else {
								t += `and is recovering after having ${his} tits sucked dry, but you have a good view of ${his} ${race} body on the feeds.`;
							}
						}
					} else if (slave.balls > 0) {
						if (slave.dick > 0) {
							if (seed > 50) {
								t += `and is having ${his} cock sucked dry. As you watch, `;
								if (slave.scrotum) {
									t += `${his} balls tighten `;
								} else {
									t += `${he} begins to thrust harder `;
								}
								if (V.dairyStimulatorsSetting > 0) {
									t += `as the phallus up ${his} butt `;
								} else {
									t += `as the suction to ${his} dick `;
								}
								t += `forces ${him} closer to yet another ejaculation.`;
							} else {
								t += `and is wincing in pain as the machine sucks ${his} sore cock, but you have a good view of ${his} ${race} body on the feeds.`;
							}
						} else {
							if (seed > 50) {
								t += `and is having ${his} balls sucked dry. As you watch, `;
								if (slave.scrotum) {
									t += `${his} scrotum tightens `;
								} else {
									t += `${he} begins to thrust harder `;
								}
								if (V.dairyStimulatorsSetting) {
									t += `as the phallus up ${his} butt `;
								} else {
									t += `as the suction against ${his} crotch `;
								}
								t += `forces ${him} closer to yet another leaking ejaculation.`;
							} else {
								t += `and is wincing in pain as the machine sucks ${his} empty balls, but you have a good view of ${his} ${race} body on the feeds.`;
							}
						}
					} else {
						t += `and is massaging ${his} sore, milkless tits, but you have a good view of ${his} ${race} body on the feeds.`;
					}
				} else {
					t += `is working in ${V.dairyName}, `;
					if (slave.lactation > 0) {
						if (slave.balls > 0 && jsRandom(1, 2) === 1) {
							if (slave.dick > 0) {
								if (seed > 50) {
									t += `and is having ${his} cock milked. As you watch, `;
									if (slave.scrotum) {
										t += `${his} balls tighten `;
									} else {
										t += `${he} begins to thrust harder `;
									}
									if (V.dairyStimulatorsSetting > 0) {
										t += `as the phallus up ${his} butt `;
									} else {
										t += `as the suction to ${his} dick `;
									}
									t += `brings ${him} closer to a copious ejaculation.`;
								} else {
									t += `and is massaging ${his} sore swollen cock, but you have a good view of ${his} ${race} body on the feeds.`;
								}
							} else {
								if (seed > 50) {
									t += `and is having ${his} balls drained. As you watch, `;
									if (slave.scrotum) {
										t += `${his} scrotum tightens `;
									} else {
										t += `${he} begins to thrust harder `;
									}
									if (V.dairyStimulatorsSetting) {
										t += `as the phallus up ${his} butt `;
									} else {
										t += `as the suction against ${his} crotch `;
									}
									t += `brings ${him} closer to a copious squirting.`;
								} else {
									t += `and is massaging ${his} aching balls, but you have a good view of ${his} ${race} body on the feeds.`;
								}
							}
						} else {
							if (seed > 50) {
								t += `and is having ${his} tits milked, but you have a good view of ${his} ${race} body on the feeds.`;
							} else {
								t += `and is massaging ${his} sore tits, but you have a good view of ${his} ${race} body on the feeds.`;
							}
						}
					} else if (slave.balls > 0) {
						if (slave.dick > 0) {
							if (seed > 50) {
								t += `and is having ${his} cock milked. As you watch, `;
								if (slave.scrotum) {
									t += `${his} balls tighten `;
								} else {
									t += `${he} begins to thrust harder `;
								}
								if (V.dairyStimulatorsSetting) {
									t += `as the phallus up ${his} butt `;
								} else {
									t += `as the suction to ${his} dick `;
								}
								t += `brings ${him} closer to a copious ejaculation.`;
							} else {
								t += `and is massaging ${his} sore swollen cock, but you have a good view of ${his} ${race} body on the feeds.`;
							}
						} else {
							if (seed > 50) {
								t += `and is having ${his} balls drained. As you watch, `;
								if (slave.scrotum) {
									t += `${his} scrotum tightens `;
								} else {
									t += `${he} begins to thrust harder `;
								}
								if (V.dairyStimulatorsSetting) {
									t += `as the phallus up ${his} butt `;
								} else {
									t += `as the suction against ${his} crotch `;
								}
								t += `brings ${him} closer to a copious squirting.`;
							} else {
								t += `and is massaging ${his} aching balls, but you have a good view of ${his} ${race} body on the feeds.`;
							}
						}
					} else {
						t += `and is massaging ${his} sore, milkless tits, but you have a good view of ${his} ${race} body on the feeds.`;
					}
				}
				break;
			case Job.BROTHEL:
				t += `is working in ${V.brothelName}, and is `;
				if (Beauty(slave) > 100 && jsRandom(1, 2) === 1) {
					if (seed > 80) {
						if (canDoAnal(slave) || canDoVaginal(slave)) {
							t += `riding one customer's dick while ${he} gives another a blowjob.`;
						} else {
							t += `deep throating a pair of customer's dicks.`;
						}
					} else if (seed > 60 && hasAnyArms(slave)) {
						t += `sucking one customer's cock while giving another a handjob.`;
					} else if (seed > 40) {
						t += `eating out one customer's cunt while another `;
						if (canDoAnal(slave) || canDoVaginal(slave)) {
							t += `uses a strap-on on ${him}.`;
						} else {
							t += `teases ${his} butt.`;
						}
					} else if (seed > 20) {
						if (canDoAnal(slave) || canDoVaginal(slave)) {
							t += `getting pounded by `;
						} else {
							t += `amusing `;
						}
						t += `two women wearing strap-ons.`;
					} else {
						if (canDoAnal(slave) || canDoVaginal(slave)) {
							t += `being double penetrated by `;
						} else {
							t += `using ${his} body to please `;
						}
						t += `a pair of customers.`;
					}
				} else if (seed > 80) {
					if (canDoAnal(slave) || canDoVaginal(slave)) {
						t += `pleasing `;
					} else {
						t += `riding `;
					}
					t += `a customer's dick.`;
				} else if (seed > 60) {
					t += `sucking a customer's cock.`;
				} else if (seed > 40) {
					t += `pleasuring a customer's cunt.`;
				} else if (seed > 20) {
					t += `getting pounded by a woman wearing a strap-on.`;
				} else {
					t += `being held down and `;
					if (canDoAnal(slave)) {
						t += `buttfucked `;
					} else {
						t += `raped `;
					}
					t += `by a customer.`;
				}
				t += ` You have a voyeuristic view of ${his} ${race} body on the feeds.`;
				break;
			case Job.CLUB:
				t += `is working in ${V.clubName}, `;
				if (seed > 50) {
					t += `displaying ${his} ${race} body, keeping citizens company, and flirting with anyone who shows interest.`;
				} else {
					t += `or rather just off it, having taken a prominent citizen back to a discreet room so he can use ${his} ${race} body.`;
				}
				break;
			case Job.QUARTER:
				if (seed > 50) {
					t += `was scrubbing the penthouse floor, until another slave requested oral service.`;
				} else {
					t += `is scrubbing the penthouse floor.`;
				}
				break;
			case Job.MASTERSUITE:
				if (slave.fuckdoll > 0) {
					t += `waiting for use in ${V.masterSuiteName}, next to a display case full of other sex toys.`;
				} else if (V.masterSuiteUpgradeLuxury === 1) {
					if (seed > 50) {
						t += `is sitting on the big bed in ${V.masterSuiteName}, awaiting your return.`;
					} else {
						t += `is beautifying ${himself} in ${V.masterSuiteName} so ${he}'ll be pretty when you return.`;
					}
				} else if (V.masterSuiteUpgradeLuxury === 2) {
					t += `is in ${V.masterSuiteName}'s fuckpit, `;
					if (seed > 80) {
						t += `with a pair of ${his} fellow fucktoys industriously sucking on ${his} nipples.`;
					} else if (seed > 60) {
						if ((slave.anus > 0 && canDoAnal(slave)) || (slave.vagina > 0 && canDoVaginal(slave))) {
							t += `taking double penetration from `;
						} else {
							t += `being spitroasted by `;
						}
						t += `a pair of ${his} fellow fucktoys.`;
					} else if (seed > 40) {
						if (canPenetrate(slave)) {
							t += `with ${his} dick inside `;
						} else if (slave.dick > 0 && slave.chastityPenis !== 1) {
							t += `getting ${his} soft dick sucked by `;
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							t += `getting eaten out by `;
						} else {
							t += `making out with `;
						}
						t += `a fellow fucktoy.`;
					} else if (seed > 20) {
						if (slave.vagina > 0 && canDoVaginal(slave)) {
							t += `getting pounded `;
						} else if (slave.anus > 0 && canDoAnal(slave)) {
							t += `getting ${his} ass pounded `;
						} else if (canDoVaginal(slave) || canDoAnal(slave)) {
							t += `getting eaten out `;
						} else {
							t += `getting deepthroated `;
						}
						t += `by a fellow fucktoy.`;
					} else {
						t += `performing oral sex on a fellow fucktoy.`;
					}
				} else {
					if (slave.energy > 95) {
						t += `is having enthusiastic sex with your other pets while waiting for you to ravish ${him}.`;
					} else {
						t += `is having idle sex with several of your other toys while they await your pleasure.`;
						if (slave.fetishKnown === 1) {
							switch (slave.fetish) {
								case "buttslut":
									if (canDoAnal(slave) && slave.anus > 0) {
										t += `${He}'s happily taking a strap-on up ${his} asspussy.`;
									} else {
										t += `${He}'s happily got another slave between ${his} buttcheeks.`;
									}
									break;
								case "cumslut":
									t += `${He}'s happily performing oral on another slave.`;
									break;
								case "dom":
									t += `${He}'s pinning another slave down while ${he} fucks her.`;
									break;
								case "submissive":
									t += `${He}'s letting another slave have her way with ${him}.`;
									break;
								case "sadist":
									if (hasBothArms(slave)) {
										t += `${He}'s spanking another slave with one hand and fingering her with the other.`;
									} else if (hasAnyArms(slave)) {
										t += `${He}'s fingering another slave while teasing her nipple with ${his} teeth.`;
									} else {
										t += `${He}'s painfully teasing another slave's nipple with ${his} teeth.`;
									}
									break;
								case "masochist":
									t += `Another slave is spanking ${him} while molesting everything she can.`;
									break;
								case "boobs":
									t += `${He} has a slave sucking on each of ${his} nipples`;
									if (hasBothArms(slave)) {
										t += ` while ${he} gives each a handjob.`;
									} else if (hasAnyArms(slave)) {
										t += ` while ${he} gives one a handjob.`;
									} else {
										t += `.`;
									}
									break;
								case "pregnancy":
									if (slave.belly >= 5000) {
										t += `${He}'s sighing contentedly as ${his} rounded belly is sensually rubbed.`;
									} else if (canPenetrate(slave)) {
										t += `${He}'s happily roleplaying impregnating the slave ${he}'s fucking.`;
									} else if ((slave.anus > 0 && canDoAnal(slave)) || (slave.vagina > 0 && canDoVaginal(slave))) {
										t += `${He}'s happily roleplaying conceiving a child as ${he} gets fucked.`;
									} else {
										t += `${He}'s happily roleplaying being hugely pregnant.`;
									}
							}
						}
					}
				}
				break;
			/*
	case Job.BODYGUARD:
		t += `is standing discreetly behind your left shoulder, watching for threats.`;
		break
	*/
			case Job.CONFINEMENT:
				t += `is confined, but you have a fine view of ${his} ${race} body on the feed from ${his} cell.`;
				break;
			case Job.CELLBLOCK:
				t += `is confined in ${V.cellblockName}, but you have a fine view of ${his} ${race} body on the feed from ${his} cell.`;
				break;
			case Job.ARCADE:
			case Job.GLORYHOLE:
				t += `is confined in `;
				if (slave.assignment === Job.ARCADE) {
					t += `${V.arcadeName}; `;
				} else {
					t += `a glory hole; `;
				}
				if (seed > 80 && (canDoAnal(slave) || canDoVaginal(slave))) {
					t += `${his} ass is held out at cock height, and a customer is using ${his} fuckhole.`;
				} else if (seed > 60) {
					t += `${his} mouth is held open at cock height, and a customer is fucking ${his} throat.`;
				} else if (seed > 40) {
					t += `a woman is abusing ${him} with a couple of dildos.`;
				} else if (seed > 20 && canDoAnal(slave)) {
					t += `a customer is harshly using ${his} defenseless anus.`;
				} else {
					t += `a customer is cruelly spanking ${his} helpless butt.`;
				}
				break;
			case Job.MADAM:
				t += `is managing ${V.brothelName}: ${he} is making sure all the customers are satisfied and all the whores are working hard.`;
				break;
			case Job.CONCUBINE:
				if (jsRandom(1, 2) === 1) {
					t += `is looking after ${himself}; ${he} spends many hours every day on ${his} beauty regimen.`;
				} else {
					t += `is checking over the appearance of your harem, making sure everyone looks perfect.`;
				}
				break;
			case Job.WARDEN:
				t += `is looking after the cells: ${he} is `;
				if (seed > 50) {
					t += `forcing a resistant slave to orally service ${him}.`;
				} else {
					t += `beating a rebellious slave across the buttocks.`;
				}
				break;
			case Job.HEADGIRLSUITE:
				if (V.HeadGirlID !== 0) {
					t += `is getting the Head Girl's suite cleaned up while ${S.HeadGirl.slaveName} is out working.`;
				} else {
					t += `is making sure the Head Girl's suite is in order for your next Head Girl.`;
				}
				break;
			case Job.STEWARD:
				t += `is managing the house servants in ${V.servantsQuartersName}: ${he} overseeing the laboring house slaves and punishing any that step out of line.`;
				break;
			case Job.TEACHER:
				t += `is teaching classes in ${V.schoolroomName}: ${he} is leading the slave students in rote recitation.`;
				break;
			case Job.ATTENDANT:
				t += `is seeing to the guests in ${V.spaName}: ${he} is gently soaping an exhausted slave.`;
				break;
			case Job.DJ:
				if (seed > 50) {
					t += `is right where ${he} belongs, in the DJ booth in ${V.clubName} ${he} leads. ${He}'s bouncing in time with the beat to show off ${his} `;
					if (slave.boobs > 300) {
						t += `tits.`;
					} else {
						t += `goods.`;
					}
				} else {
					t += `is taking the lead on ${V.clubName}'s floor: ${he} greets new arrivals, flirts with them prettily, and subtly guides them towards choice sluts.`;
				}
				break;
			case Job.MILKMAID:
				t += `is working in ${V.dairyName}, looking after your stock.`;
				break;
			default: /* WALKPASTS START HERE */
				if (slave.heels === 1 && canWalk(slave)) {
					t += `walks past your desk with the tiny swaying steps ${he} must take in order to walk on ${his} surgically altered legs. ${He} is on ${his} way to `;
				} else if (["heels", "platform heels", "pumps"].includes(slave.shoes) && canWalk(slave)) {
					t += `walks past your desk with the swaying steps ${he} must take in ${his} high heels. ${He} is on ${his} way to `;
				} else if (slave.shoes === "boots" && canWalk(slave)) {
					t += `walks past your desk with the confident gait encouraged by ${his} high heeled boots. ${He} is on ${his} way to `;
				} else if (["extreme heels", "extreme platform heels"].includes(slave.shoes) && canWalk(slave)) {
					t += `walks past your desk with the tiny swaying steps ${he} must take in ${his} ridiculous heels. ${He} is on ${his} way to `;
				} else if (slave.heels === 1 && canMove(slave)) {
					t += `crawls past your desk on `;
					if (hasBothArms(slave) && hasBothLegs(slave)) {
						t += `all fours, `;
					} else {
						t += `the ground, `;
					}
					t += `since ${he} has not been allowed the heels ${he} needs to walk upright. ${He} is on ${his} way to `;
				} else if (!hasAnyLegs(slave)) {
					t += `is carried past your desk by one of your other slaves. ${He} is on ${his} way to `;
				} else if (!canWalk(slave)) {
					if (canMove(slave)) {
						if (slave.rules.mobility === "permissive") {
							t += `wheels past your desk on ${his} way to `;
						} else {
							t += `crawls past your desk on `;
							if (hasBothArms(slave) && hasBothLegs(slave)) {
								t += `all fours, `;
							} else {
								t += `the ground, `;
							}
							t += `since ${he} has expanded past the point of being able to walk. ${He} is on ${his} way to `;
						}
					} else {
						t += `is helped past your desk by one of your other slaves. ${He} is on ${his} way to `;
					}
				} else {
					t += `walks past your desk on ${his} way to `;
				}
				if (slave.inflation > 0 && jsRandom(1, 100) > 70) {
					if (slave.inflationMethod === 1) {
						t += `gorge ${himself} with ${slave.inflationType}; `;
					} else if (slave.inflationMethod === 2) {
						t += `fill ${his} rear with `;
						switch (slave.inflationType) {
							case "water":
							case "milk":
							case "cum":
							case "food":
							case "urine":
								t += `${slave.inflationType}; `;
								break;
							default:
								t += `${slave.inflationType}s; `;
								break;
						}
					} else if (slave.inflationMethod === 3) {
						if (slave.inflationType === "milk") {
							t += `suckle from ${his} assigned nipple until ${he} is sufficiently filled with milk; `;
						} else {
							t += `suck ${his} assigned dick until ${he} is sufficiently filled with cum; `;
						}
					}
				} else {
					switch (slave.assignment) {
						case Job.REST:
							if (seed > 50) {
								t += `bed; `;
							} else {
								t += `eat; `;
							}
							break;
						case Job.MILKED:
							if (seed > 50) {
								if (slave.lactation) {
									t += `milk ${his} overfull ${race} tits; `;
								} else {
									t += `empty ${his} aching balls; `;
								}
							} else {
								if (slave.lactation) {
									t += `drain ${his} milky ${race} udders; `;
								} else {
									t += `relieve ${his} heavy balls; `;
								}
							}
							break;
						case Job.WHORE:
							if (seed > 50) {
								t += `sell ${his} ${race} body; `;
							} else {
								t += `ply ${his} trade as a whore; `;
							}
							break;
						case Job.PUBLIC:
							if (seed > 50) {
								t += `serve the public; `;
							} else {
								t += `be a public slut; `;
							}
							break;
						case Job.SPA:
							t += `relax in ${V.spaName}; `;
							break;
						case Job.FUCKTOY:
							t += `wait next to you and wait for you to fuck ${him}; `;
							break;
						case Job.SUBORDINATE:
							t += `service your other slaves; `;
							break;
						case Job.HOUSE:
							t += `clean up after your other slaves; `;
							break;
						case Job.SCHOOL:
							t += `attend classes `;
							if (!S.Schoolteacher) {
								t += `in ${V.schoolroomName}; `;
							} else {
								t += `under ${S.Schoolteacher.slaveName}, perhaps literally; `;
							}
							break;
						case Job.CLASSES:
							t += `attend classes with ${V.assistant.name}; `;
							break;
						case Job.HEADGIRL:
							t += `oversee your other slaves; `;
							break;
						case Job.RECRUITER:
							t += `use ${his} connections to recruit slaves; `;
							break;
						default:
							t += `${slave.assignment}; `;
							break;
					}
				} /* end inflation blurb */
				if (slave.fetish === Fetish.MINDBROKEN) {
					t += `${he} does not even glance at you as ${he} goes mindlessly to ${his} next task.`;
				} else if (slave.devotion < -50) {
					t += `${he} directs a look of pure hatred at where you sit as ${he} passes.`;
				} else if (slave.devotion < -20) {
					t += `${he} cannot keep the loathing from ${his} face as ${he} passes.`;
				} else if (slave.devotion <= 20) {
					t += `${he} passes quickly, obviously hoping to avoid you.`;
				} else if (slave.devotion <= 50) {
					t += `${he} rushes by, hurrying to ${his} next task.`;
				} else {
					t += `as ${he} passes ${he} gives you a look of adoration.`;
				}
				break;
		}

		return t + ` `;
	}

	/** Generate boob text for a given slave
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function boobWatch(slave) {
		const pronouns = getPronouns(slave);
		const {
			he, him, his,
			His,
		} = pronouns;

		target = "fBoobs";

		const breasts = (slave.boobs < 300) ? `flat chest` : `breasts`;

		t += ` ${App.Desc.boobs(slave)} `;
		switch (slave.clothes) {
			case "uncomfortable straps":
				if (slave.boobs < 300) {
					t += `The rings constantly rub against ${his} chest and force ${his} nipples to stick out.`;
				} else {
					t += `The strap over ${his} tits presses the soft flesh, and the ring around each nipple `;
					if (slave.nipples === "fuckable") {
						t += `forces them open.`;
					} else {
						t += `forces them to stick out.`;
					}
				}
				break;
			case "shibari ropes":
				t += `The ropes binding ${his} chest `;
				if (slave.boobs < 300) {
					t += `shift slightly with every step, since ${he} lacks any breasts to hold them in place.`;
				} else {
					t += `dig into the soft flesh as ${he} moves.`;
				}
				break;
			case "attractive lingerie for a pregnant woman":
				if (slave.boobs < 300) {
					t += `The bulge of ${his} ${slave.nipples} nipples can be seen under the taut silk.`;
				} else {
					t += `${His} silken bra causes ${his} breasts to bulge around them.`;
				}
				break;
			case "a maternity dress":
				t += `${His} low cut dress `;
				if (slave.boobs < 300) {
					t += `was made with breasts in mind; every stop ${he} takes risks it sliding down and revealing ${his} ${slave.nipples} nipples.`;
				} else {
					t += `shows ample cleavage and is made to be easy to pull down.`;
				}
				break;
			case "stretch pants and a crop-top":
				if (slave.boobs < 300) {
					t += `${His} flat chest makes the perfect canvas to read ${his} crop-top.`;
				} else {
					t += `${His} crop-top tightly clings to ${his} breasts and moves along with them. ${His} jiggling cleavage distracts from the writing on ${his} tits.`;
				}
				break;
			case "restrictive latex":
				if (slave.boobs < 300) {
					t += `${His} lack of breasts draws your eyes straight to ${his} exposed nipples.`;
				} else {
					t += `${His} tits stick out through ${his} latex outfit.`;
				}
				break;
			case "attractive lingerie":
				t += `${His} pretty white lace bra has thoughtful cuts that tastefully let ${his} nipples stick through.`;
				break;
			case "kitty lingerie":
				t += `${His} lingerie's cleavage window proudly displays ${his} `;
				if (slave.boobs < 300) {
					t += `flat chest.`;
				} else {
					t += `ample valley.`;
				}
				break;
			case "a succubus outfit":
				t += `${His} succubus outfit presents this sex demon's ${breasts}, inviting a damning fondle.`;
				break;
			case "a slutty maid outfit":
				t += `${His} maid outfit covers ${his} ${breasts} with a thin white blouse designed to be easy to pull down.`;
				break;
			case "a nice maid outfit":
				t += `${His} maid outfit covers ${his} ${breasts} demurely, offering the diverting task of pulling it off ${him}.`;
				break;
			case "a monokini":
				t += `The straps of ${his} monokini cross in the center of ${his} chest, leaving the rest of ${his} ${breasts} naked.`;
				break;
			case "a cybersuit":
				t += `${His} cybersuit is tight enough to show off `;
				if (slave.boobs < 300) {
					t += `just how flat ${he} is.`;
				} else {
					t += `every contour of ${his} chest.`;
				}
				break;
			case "a tight Imperial bodysuit":
				t += `${His} tight Imperial cybersuit is taut enough to show off `;
				if (slave.boobs < 300) {
					t += `just how flat ${he} is.`;
				} else {
					t += `every contour of ${his} chest.`;
				}
				break;
			case "a string bikini":
				t += `${His} string bikini covers only ${his} nipples, leaving the remainder of ${his} ${breasts} naked.`;
				break;
			case "a scalemail bikini":
				t += `${His} scalemail bikini covers `;
				if (slave.boobs < 300) {
					t += `all of ${his} flat chest.`;
				} else if (slave.boobs < 700) {
					t += `${his} breasts entirely.`;
				} else if (slave.boobs < 1500) {
					t += `much of ${his} breasts, while still emphasizing them.`;
				} else {
					t += `the front of ${his} breasts.`;
				}
				break;
			case "striped panties":
				t += `${His} cute panties covers only ${his} crotch, leaving ${his} ${breasts} bare.`;
				break;
			case "clubslut netting":
				t += `As ${he} moves, the weave of the netting over ${his} chest slips back and forth across ${his} nipples.`;
				break;
			case "a cheerleader outfit":
				t += `As ${he} moves, `;
				if (slave.boobs < 300) {
					t += `the tight fabric rubs across ${his} obvious nipples.`;
				} else {
					t += `${his} chest threatens to fall out of ${his} cheerleader top.`;
				}
				break;
			case "an apron":
				t += `As ${he} moves, ${his} apron `;
				if (slave.boobs < 300) {
					t += `threatens to bounce off ${his} flat chest and expose ${his} nipples.`;
				} else {
					t += `provides excellent views of the sides of ${his} breasts.`;
				}
				break;
			case "overalls":
				t += `As ${he} moves, ${his} overalls `;
				if (slave.boobs < 300) {
					t += `threaten to slide off ${his} flat chest and expose ${his} nipples.`;
				} else {
					t += `provide excellent views of the sides of ${his} breasts.`;
				}
				break;
			case "cutoffs and a t-shirt":
				if (slave.boobs < 300) {
					t += `${His} non-existent breasts are bare under ${his} t-shirt; not that you can really tell since they lack motion completely.`;
				} else {
					t += `${His} tits are bare under ${his} t-shirt, so movement gives delicious hints of their motion.`;
				}
				break;
			case "spats and a tank top":
				if (slave.boobs < 300) {
					t += `${His} flat chest makes ${his} form-fitting tank top look as if it's clinging to a tube.`;
				} else {
					t += `${His} breasts bounce slightly under ${his} tank top as ${he} moves.`;
				}
				break;
			case "a slutty outfit":
				t += `For today's slutty outfit ${he}'s chosen a `;
				if (jsRandom(1, 100) > 50) {
					t += `handkerchief top that occasionally comes untied and `;
					if (slave.boobs < 300) {
						t += `reveals ${his} flat chest.`;
					} else {
						t += `spills ${his} breasts out naked.`;
					}
				} else {
					t += `halter top cut so low that `;
					if (slave.boobs < 300) {
						t += `it occasionally slips down ${his} flat chest to reveal a nipple.`;
					} else {
						t += `${his} breasts occasionally pop out.`;
					}
				}
				break;
			case "a slave gown":
				t += `${His} gorgeous dress has thoughtful cuts that tastefully bares ${his} ${(slave.boobs < 300) ? "non-existent " : ""}breasts.`;
				break;
			case "slutty business attire":
				t += `${His} suit jacket and blouse are low enough to show off a lot of `;
				if (slave.boobs < 300) {
					t += `boob, or they would, had ${he} had any.`;
				} else {
					t += `boob.`;
				}
				break;
			case "nice business attire":
				t += `${His} suit jacket and blouse are businesslike, but they could be removed easily enough.`;
				break;
			case "a halter top dress":
				t += `${His} beautiful halter top dress almost seems to be sculpted around ${his} body.`;
				break;
			case "an evening dress":
				t += `${His} sensual evening dress is tailored to accentuate the shape of ${his} ${breasts}.`;
				break;
			case "a ball gown":
				t += `${His} fabulous silken ball gown is tailored to accentuate the shape of ${his} ${breasts}.`;
				break;
			case "a slutty nurse outfit":
				t += `${His} jacket presents ${his} ${(slave.boobs < 300) ? "nipples" : "breasts"} to be ogled.`;
				break;
			case "a schoolgirl outfit":
				t += `${His} blouse lewdly displays ${his} `;
				if (slave.boobs < 300) {
					t += `${slave.nipples} nipples.`;
				} else {
					t += `breasts.`;
				}
				break;
			case "a kimono":
				t += `${His} kimono is clearly designed to accentuate ${his} ${breasts}.`;
				break;
			case "a hijab and abaya":
			case "a niqab and abaya":
				t += `${His} abaya covers ${his} ${breasts} totally.`;
				break;
			case "a thong":
			case "a skimpy loincloth":
			case "boyshorts":
			case "cutoffs":
			case "panties":
			case "leather pants":
			case "jeans":
			case "sport shorts":
				t += `Since ${he}'s wearing nothing but ${slave.clothes}, ${his} ${(slave.boobs < 300) ? "non-existent " : ""}breasts are delightfully naked.`;
				break;
			case "a hijab and blouse":
				t += `${His} blouse and overshirt keep ${his} ${breasts} concealed.`;
				break;
			case "a huipil":
				t += `${His} huipil `;
				if (slave.boobs < 300) {
					t += `daintily covers ${his} ${slave.nipples} nipples and flat chest.`;
				} else {
					t += `hugs the curves of ${his} breasts.`;
				}
				break;
			case "battledress":
				if (slave.boobs < 300) {
					t += `As ${he} moves, you can occasionally spot ${his} lack of undergarments.`;
				} else {
					t += `${His} tank top and sports bra support rather than flatter ${his} breasts.`;
				}
				break;
			case "a fallen nuns habit":
				t += `${His} slutty nun outfit leaves ${his} ${(slave.boobs < 300) ? "flat " : ""}tits sinfully bare.`;
				break;
			case "a chattel habit":
				t += `${His} chattel habit leaves ${his} ${(slave.boobs < 300) ? "flat " : ""}tits virtuously bare.`;
				break;
			case "a penitent nuns habit":
				t += `${His} habit chafes ${his} nipples so harshly that it would probably be a relief to ${him} to have it stripped off ${him}.`;
				break;
			case "a comfortable bodysuit":
				t += `${His} bodysuit is tight enough to show off `;
				if (slave.boobs < 300) {
					t += `just how flat ${he} is.`;
				} else {
					t += `every contour of ${his} chest.`;
				}
				break;
			case "a latex catsuit":
				t += `${His} latex catsuit is tight enough to show off `;
				if (slave.boobs < 300) {
					t += `just how flat ${he} is.`;
				} else {
					t += `every contour of ${his} chest.`;
				}
				break;
			case "a military uniform":
			case "a police uniform":
			case "a schutzstaffel uniform":
			case "a mounty outfit":
			case "a red army uniform":
				t += `${His} uniform tunic and shirt are formal, but they could be removed easily enough.`;
				break;
			case "a confederate army uniform":
				t += `${His} uniform is formal, but they could be removed easily enough.`;
				break;
			case "battlearmor":
				t += `${His} battlearmor will take some considerable effort to get out of.`;
				break;
			case "Imperial Plate":
				t += `${His} ultra-heavy Imperial Plate will take full minutes to get out of completely.`;
				break;
			case "a nice nurse outfit":
				t += `${His} nurse's outfit is functional, but they could be removed easily enough.`;
				break;
			case "a mini dress":
				t += `${His} mini dress is tight enough to show off `;
				if (slave.boobs < 300) {
					t += `just how flat ${he} is.`;
				} else {
					t += `every contour of ${his} chest.`;
				}
				break;
			case "a leotard":
				if (slave.boobs < 300) {
					t += `${His} leotard draws the eye straight to ${his} obvious nipples, since it lacks anything else to show off.`;
				} else {
					t += `${His} leotard is tight enough that it not only hugs ${his} breasts, but shows off ${his} nipples as well.`;
				}
				break;
			case "a bunny outfit":
				if (slave.boobs < 300) {
					t += `With no breasts to speak of, ${his} strapless corset teddy manages to look rather slutty.`;
				} else {
					t += `${His} strapless corset teddy presents ${his} boobs while still managing to look a bit classy.`;
				}
				break;
			case "harem gauze":
				t += `${His} ${(slave.boobs < 300) ? "non-existent " : ""}breasts are clearly visible through the thin gauze that covers them.`;
				break;
			case "slutty jewelry":
				if (slave.boobs < 300) {
					t += `The light chain across ${his} non-existent breasts is the only thing on ${his} chest capable of moving separately from ${him}.`;
				} else {
					t += `The light chain under ${his} breasts accentuates their natural movement.`;
				}
				break;
			case "a bimbo outfit":
				if (slave.boobs < 300) {
					t += `With no breasts to speak of, ${his} exposed lingerie gives ${his} slutty appearance unique flare.`;
				} else {
					t += `It would be easy enough to expose ${his} breasts, assuming they don't bounce out on their own first.`;
				}
				break;
			case "a courtesan dress":
				if (slave.boobs < 300) {
					t += `With no breasts to speak of, ${his} corset still manages to look rather slutty.`;
				} else {
					t += `The thin material that covers ${his} breasts allows them plenty of room to jiggle and bounce as ${he} moves.`;
				}
				break;

			// needs improvement
			case "a klan robe":
				t += `${His} robe covers ${his} ${breasts} totally.`;
				break;
			case "a burqa":
				t += `${His} burqa covers ${his} ${breasts} totally.`;
				break;
			case "a tube top and thong":
			case "a tube top":
			case "leather pants and a tube top":
				t += `${His} tube top covers ${his} ${breasts} totally.`;
				break;
			case "a button-up shirt and panties":
			case "a button-up shirt":
			case "a t-shirt":
			case "a t-shirt and thong":
			case "an oversized t-shirt and boyshorts":
			case "an oversized t-shirt":
			case "a t-shirt and jeans":
			case "sport shorts and a t-shirt":
			case "a t-shirt and panties":
				t += `${His} shirt covers ${his} ${breasts} totally.`;
				break;
			case "a bra":
			case "a striped bra":
			case "striped underwear":
			case "a sports bra":
			case "sport shorts and a sports bra":
				t += `${His} bra covers ${his} ${breasts} totally.`;
				break;
			case "a tank-top":
			case "a tank-top and panties":
				t += `${His} tank-top covers ${his} ${breasts} totally.`;
				break;
			case "a sweater":
			case "a sweater and panties":
			case "a sweater and cutoffs":
				t += `${His} sweater covers ${his} ${breasts} totally.`;
				break;
			case "a slutty klan robe":
				t += `${His} robe partially covers ${his} ${breasts}.`;
				break;
			case "a nice pony outfit":
			case "a slutty pony outfit":
				t += `${His} pony outfit partially covers ${his} ${breasts}.`;
				break;
			case "leather pants and pasties":
			case "panties and pasties":
			case "pasties":
				t += `${His} pasties cover nothing more than ${his} nipples.`;
				break;
			case "a one-piece swimsuit":
				t += `${His} swimsuit is tight enough to show off `;
				if (slave.boobs < 300) {
					t += `just how flat ${he} is.`;
				} else {
					t += `every contour of ${his} chest.`;
				}
				break;
			case "a hanbok":
				t += `${His} hanbok covers ${his} ${breasts} totally.`;
				break;
			case "a gothic lolita dress":
				t += `${His} dress covers ${his} ${breasts} totally.`;
				break;
			case "a burkini":
				t += `${His} burkini clings to the shape of ${his} ${breasts}.`;
				break;
			case "a slutty schutzstaffel uniform":
				t += `${His} uniform tunic and shirt are formal, but they could be removed easily enough.`;
				break;
			case "a long qipao":
				t += `${His} elegant qipao can be removed with minimal effort.`;
				break;
			case "a dirndl":
				t += `${His} dirndl can be removed with minimal effort.`;
				break;
			case "lederhosen":
				t += `${His} lederhosen might come off faster than it takes to put them on.`;
				break;
			case "a biyelgee costume":
				t += `${His} costume could be removed with barely any effort.`;
				break;
				// ends needs work block

			case "no clothing":
				if (slave.chastityAnus === 1 || slave.chastityVagina === 1 || slave.chastityPenis === 1) {
					t += `Since ${he}'s wearing nothing but a chastity belt, ${his} ${(slave.boobs < 300) ? "non-existent " : ""}breasts are delightfully naked.`;
				} else {
					t += `${His} naked `;
					if (slave.boobs < 300) {
						t += `flat chest and exposed nipples`;
					} else {
						t += `breasts`;
					}
					t += ` catch your eye.`;
				}
				break;
			default: // for outfits with exposed breasts that aren't worth having a unique description for
				t += `${His} naked `;
				if (slave.boobs < 300) {
					t += `flat chest and exposed nipples`;
				} else {
					t += `breasts`;
				}
				t += ` catch your eye.`;
		}

		return t;
	}

	/** Generate butt text for a given slave
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function buttWatch(slave) {
		const {
			he, him, his, boy,
			He, His,
		} = getPronouns(slave);

		target = "fButt";

		t += App.Desc.butt(slave);
		t += ` `;
		switch (slave.clothes) {
			case "a Fuckdoll suit":
				t += `${His} suit is expressly designed to encourage use of ${his} rear hole.`;
				break;
			case "uncomfortable straps":
				t += `A strap passes between ${his} `;
				if (hasBothLegs(slave)) {
					t += `legs, giving ${his} gait an awkward sway.`;
				} else if (hasAnyLegs(slave)) {
					t += `ass cheeks and along ${his} perineum, pressing against ${his} genitals.`;
				} else {
					t += `leg stumps, pressing against ${his} genitals.`;
				}
				break;
			case "shibari ropes":
				if (hasBothLegs(slave)) {
					t += `Ropes bind ${his} legs, giving ${his} gait an awkward sway.`;
				} else if (!hasAnyLegs(slave)) {
					t += `A rope passes between ${his} leg stumps, pressing against ${his} genitals.`;
				} else {
					t += `A rope runs along ${his} perineum, pressing against ${his} genitals.`;
				}
				break;
			case "attractive lingerie for a pregnant woman":
				t += `As ${he} moves, ${his} silken panties are very inviting.`;
				break;
			case "a maternity dress":
				t += `${His} dress covers ${his} rear, but it will lift easily enough.`;
				break;
			case "stretch pants and a crop-top":
				t += `${His} stretch pants tightly cling to ${his} rear as ${he} `;
				if (slave.butt > 10) {
					t += `moves. While the writing adorning it may catch your eye, the huge expanse of wobbling ass cleavage is far more distracting.`;
				} else {
					t += `moves; the writing on ${his} bottom gives you plenty of excuses to ogle it.`;
				}
				break;
			case "restrictive latex":
				if (slave.clothingBaseColor) {
					t += `As some of the only islands in the sea of latex, ${his} holes are eye-catching.`;
				} else {
					t += `As some of the only islands in the sea of black latex, ${his} holes are eye-catching.`;
				}
				break;
			case "a fallen nuns habit":
				t += `${His} slutty nun outfit invites sin.`;
				break;
			case "a chattel habit":
				t += `${His} chattel habit is designed for sex without being removed.`;
				break;
			case "a penitent nuns habit":
				t += `${His} habit chafes ${him} so cruelly that it would probably be a relief to ${him} to have it pulled off, even if ${he}'s roughly fucked afterward.`;
				break;
			case "kitty lingerie":
				t += `As ${he} moves, the strings of ${his} pretty kitty panties sway enticingly.`;
				break;
			case "attractive lingerie":
				t += `As ${he} moves, ${his} lingerie delightfully hugs ${his} rear.`;
				break;
			case "a succubus outfit":
				t += `${His} succubus outfit's tail holds ${his} skirt up high in back, inviting a damning fuck.`;
				break;
			case "a slutty maid outfit":
				t += `${His} maid's skirt is cut extremely short, so that the slightest movement reveals a glimpse of ${his} ass.`;
				break;
			case "a nice maid outfit":
				t += `${His} maid's skirt is cut conservatively, but will lift easily enough.`;
				break;
			case "a monokini":
				t += `${His} monokini contours to the size and shape of ${his} bottom.`;
				break;
			case "an apron":
				t += `${His} apron leaves ${his} buttocks totally exposed.`;
				break;
			case "overalls":
				t += `${His} overalls fit snugly on ${his} bottom.`;
				break;
			case "a cybersuit":
				t += `${His} bodysuit prominently displays the curves of ${his} butt.`;
				break;
			case "a tight Imperial bodysuit":
				t += `${His} cybernetic bodysuit prominently displays the curvature of ${his} ass.`;
				break;
			case "a string bikini":
				t += `As ${he} moves, ${his} string lingerie leaves the entire line of ${his} hips naked and enticing.`;
				break;
			case "a scalemail bikini":
				t += `As ${he} moves, ${his} scaly lingerie leaves almost the entire line of ${his} hips naked and enticing.`;
				break;
			case "striped panties":
			case "a button-up shirt and panties":
			case "a sweater and panties":
			case "a tank-top and panties":
			case "panties":
			case "a t-shirt and panties":
			case "panties and pasties":
			case "striped underwear":
				t += `${His} cute panties prominently display the curves of ${his} butt.`;
				break;
			case "boyshorts":
			case "an oversized t-shirt and boyshorts":
				t += `${His} boyshorts tightly cling to ${his} rear as ${he} `;
				if (slave.butt > 5) {
					t += `moves. It's filled out by so much ass you can't help but ogle.`;
				} else {
					t += `moves.`;
				}
				break;
			case "clubslut netting":
				t += `As ${he} moves, ${his} clubslut netting moves with ${him}, leaving nothing to the imagination.`;
				break;
			case "a cheerleader outfit":
				t += `As ${he} moves, ${his} pleated cheerleader skirt bounces up and down flirtatiously.`;
				break;
			case "cutoffs and a t-shirt":
				t += `As ${he} moves, ${his} cutoffs hug ${his} butt.`;
				break;
			case "spats and a tank top":
				t += `${His} spats show off every curve of ${his} ass.`;
				break;
			case "a slutty outfit":
				t += `For today's slutty outfit ${he}'s chosen `;
				if (jsRandom(1, 100) > 50 && hasAnyLegs(slave)) {
					t += `yoga pants so sheer that everything ${he}'s got is clearly visible.`;
				} else {
					t += `a miniskirt so brief that ${his} ass is hanging out the back, and a glimpse of ${his} goods is occasionally visible from the front.`;
				}
				break;
			case "a slave gown":
				if (hasAnyLegs(slave)) {
					t += `${His} gorgeous dress has a thoughtful cut that runs all the way from ${his} ankle to over ${his} hip, baring a leg all the way up.`;
				} else {
					t += `${His} gorgeous dress is specially designed for ${his} limbless form, but without legs to support it, it can hardly conceal the outline of everything ${he} has.`;
				}
				break;
			case "a halter top dress":
				t += `${His} beautiful halter top dress seems to be sculpted around ${his} bottom.`;
				break;
			case "an evening dress":
				t += `${His} sensual evening dress is tailored to fit ${him} and accentuates the shape of ${his} butt.`;
				break;
			case "a ball gown":
				t += `${His} fabulous silken ball gown is tailored to fit ${him} and accentuates the shape of ${his} butt.`;
				break;
			case "a slutty nurse outfit":
				t += `${His} tight skirt flatters ${his} ass.`;
				break;
			case "a schoolgirl outfit":
				if (slave.anus === 0) {
					t += `This school${boy} clearly needs to lose ${his} anal virginity.`;
				} else if (slave.vagina === 0) {
					t += `This school${boy} clearly takes it up the ass; that way, ${he} can remain a virgin, and be, like, totally pure and innocent.`;
				} else {
					t += `This school${boy} clearly takes it up the ass.`;
				}
				break;
			case "a kimono":
				t += `${His} kimono demurely covers ${his} `;
				if (slave.butt > 5) {
					t += `behind, though it cannot conceal its massive shape.`;
				} else {
					t += `behind.`;
				}
				break;
			case "a hijab and abaya":
			case "a niqab and abaya":
				t += `${His} abaya totally conceals ${his} `;
				if (slave.butt > 5) {
					t += `behind, though it cannot conceal its large size.`;
				} else {
					t += `behind.`;
				}
				break;
			case "a klan robe":
				t += `${His} robe totally conceals ${his} `;
				if (slave.butt > 5) {
					t += `behind, though it cannot conceal its large size.`;
				} else {
					t += `behind.`;
				}
				break;
			case "a burqa":
				t += `${His} burqa totally conceals ${his} `;
				if (slave.butt > 7) {
					t += `behind, though it cannot conceal its absurd size.`;
				} else {
					t += `behind.`;
				}
				break;
			case "a burkini":
				if (slave.butt > 6) {
					t += `${His} burkini finds itself accentuating the absurd size of ${his} behind.`;
				} else {
					t += `${His} burkini modestly covers ${his} behind.`;
				}
				break;
			case "a hijab and blouse":
				t += `${His} skirt modestly covers ${his} `;
				if (slave.butt > 5) {
					t += `behind, though it cannot conceal its large size.`;
				} else {
					t += `behind.`;
				}
				break;
			case "cutoffs":
			case "sport shorts and a t-shirt":
			case "sport shorts":
			case "a sweater and cutoffs":
			case "sport shorts and a sports bra":
				t += `${His} shorts hug the curves of ${his} hips and ass nicely.`;
				break;

			case "a police uniform":
			case "a t-shirt and jeans":
			case "leather pants":
			case "jeans":
			case "leather pants and a tube top":
			case "leather pants and pasties":
				if (slave.butt > 1) {
					t += `${His} pants are filled out with the curve of ${his} butt.`;
				} else {
					t += `${His} pants modestly cover ${his} butt.`;
				}
				break;
			case "a nice pony outfit":
			case "a slutty pony outfit":
				t += `${His} leather outfit tightly hugs the curves of ${his} hips and ass.`;
				break;
			case "a skimpy loincloth":
				t += `${His} loincloth only partially covers ${his} butt, giving frequent glimpses of the bare flesh beneath it.`;
				break;
			case "a gothic lolita dress":
				t += `${His} dress can be lifted easily enough to get at ${his} rear.`;
				break;
			case "a hanbok":
				t += `${His} hanbok can be lifted easily enough to get at ${his} `;
				if (slave.butt > 7) {
					t += `rear, and its motion beneath the fabric certainly invites it.`;
				} else {
					t += `rear.`;
				}
				break;
			case "a one-piece swimsuit":
				t += `${His} swimsuit displays the delicious curves of ${his} butt and just begs you to run a hand across it.`;
				break;
			case "battledress":
				t += `${His} fatigue trousers do not particularly flatter ${his} butt.`;
				break;
			case "nice business attire":
				t += `${His} attractive skirt is nevertheless tight enough to show off ${his} derrière.`;
				break;
			case "slutty business attire":
				t += `${His} skirt is so short it'll barely be necessary to lift it.`;
				break;
			case "a comfortable bodysuit":
				t += `${His} bodysuit displays the curves of ${his} butt.`;
				break;
			case "a latex catsuit":
				t += `${His} latex catsuit displays the curves of ${his} butt.`;
				break;
			case "a military uniform":
			case "a red army uniform":
				t += `${His} uniform skirt is nevertheless tight enough to show off ${his} derrière.`;
				break;
			case "a confederate army uniform":
			case "a schutzstaffel uniform":
				t += `${His} uniform trousers are nevertheless tight enough to show off ${his} derrière.`;
				break;
			case "a slutty schutzstaffel uniform":
				t += `${His} uniform miniskirt is nevertheless tight enough to show off the enticing curves of ${his} butt.`;
				break;
			case "a long qipao":
				t += `${His} elegant dress shows off all ${his} curves.`;
				break;
			case "battlearmor":
				t += `${His} snug battlearmor is nevertheless tight enough to show off ${his} derrière.`;
				break;
			case "Imperial Plate":
				t += `${His} ultra-heavy Imperial Plate shows only the slightest hint of ${his} ass underneath the massive plate.`;
				break;
			case "a mounty outfit":
				t += `${His} uniform slacks are tight enough to show off ${his} derrière.`;
				break;
			case "a dirndl":
				t += `${His} skirt shows off the soft curves ${his} derrière.`;
				break;
			case "lederhosen":
				t += `${His} shorts tightly hug the crack of ${his} derrière.`;
				break;
			case "a biyelgee costume":
				t += `${His} costume skirt's thin material shows off ${his} derrière.`;
				break;
			case "a nice nurse outfit":
				t += `${His} nurse's trousers demurely cover ${his} behind.`;
				break;
			case "a mini dress":
				t += `${His} mini dress displays the curves of ${his} butt.`;
				break;
			case "a leotard":
				t += `${His} leotard leaves ${his} buttocks gloriously bare.`;
				break;
			case "a bunny outfit":
				t += `${His} teddy covers ${his} rear, but in tight satin that flatters its curves.`;
				break;
			case "harem gauze":
				t += `${His} hips are clearly visible through the thin gauze that covers it.`;
				break;
			case "a toga":
				t += `${His} stellar behind is accented by the light material of ${his} toga.`;
				break;
			case "a huipil":
				t += `${His} huipil is so short that ${his} butt is on display.`;
				break;
			case "slutty jewelry":
				t += `${His} belt of light chain accentuates ${his} hips.`;
				break;
			case "a thong":
			case "a tube top and thong":
			case "a t-shirt and thong":
			case "a slutty klan robe":
			case "a bimbo outfit":
				t += `${He}'s made an effort to keep ${his} thong out of ${his} crack, but it quickly slips back in with ${his} movements.`;
				break;
			case "an oversized t-shirt":
				t += `${His} oversized t-shirt is covering ${his} rear, but it can be lifted easily enough.`;
				break;
			case "a courtesan dress":
				t += `The intersecting layers that make up ${his} skirt are designed to be easily parted.`;
				break;
			default:
				// "a bra" "a button-up shirt" "a sweater" "a tank-top" "a tube top" "a striped bra" "a sports bra" "a t-shirt" "pasties"
				if (slave.chastityAnus && slave.chastityVagina) {
					t += `${His} chastity protects ${his} holes from penetration.`;
				} else if (slave.chastityAnus) {
					t += `${His} chastity belt protects ${his} rear from penetration.`;
				} else {
					t += `You run your eye over ${his} naked hips.`;
				}
		}

		return t;
	}

	/** Generate belly text for a given slave
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function bellyWatch(slave) {
		const {
			he, him, his,
			He, His,
		} = getPronouns(slave);

		target = "fVagina";

		// Desc belly if large enough
		t += ` `;
		t += App.Desc.belly(slave);
		t += ` `;
		// Needs to be redone!
		if (slave.inflation === 0) {
			if (slave.bellyImplant < 2000) {
				if (slave.belly >= 600000) {
					switch (slave.clothes) {
						// case "an extreme corset": // FIXME: corsets are not clothes
						// 	t += `${His} corset struggles to contain ${his} enormous belly.`;
						// 	break;
						case "chains":
							t += `${His} enormous belly bulges in between ${his} tight chains.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} enormous belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} enormous belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} enormous belly makes ${him} look like a giant balloon under the tight latex; ${his} popped navel breaks the smoothness.`;
							break;
						case "a nice nurse outfit":
							t += `${He}'s decided to become the maternity ward, judging by the enormous squirming pregnant belly ${he} sports.`;
							break;
						case "a maternity dress":
							t += `${His} tight dress is strained by ${his} enormous belly.`;
							break;
						case "a nice maid outfit":
							t += `${His} enormous belly is covered only by an apron.`;
							break;
						case "a penitent nuns habit":
							t += `${His} enormous belly strains ${his} habit; it looks absolutely sinful.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} enormous squirming pregnant belly by ${his} striking silken ball gown.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and enormous pregnant belly makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} enormous belly lewdly fills ${his} bodysuit. You swear you can see ${his} babies kicking underneath the form fitting material.`;
							break;
						case "a schoolgirl outfit":
							t += `The school blimp is waddling by.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} enormous belly pushes out ${his} abaya.`;
							break;
						case "a klan robe":
							t += `${His} enormous belly pushes out ${his} robe.`;
							break;
						case "a burqa":
							t += `${His} enormous belly pushes out ${his} burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} enormous belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} enormous belly pushes out ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} enormous belly pushes out ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} enormous belly pushes out ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} enormous belly pushes out ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} enormous belly pushes out ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} enormous belly pushes out ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} enormous belly stretches ${his} leather outfit greatly.`;
							break;
						case "a burkini":
							t += `${His} burkini tightly clings to ${his} enormous belly.`;
							break;
						case "a hijab and blouse":
							t += `${His} enormous belly strains the fabric of ${his} modest clothing.`;
							break;
						case "a leotard":
							t += `${His} enormous belly lewdly stretches ${his} leotard. You swear you can see ${his} babies kicking under the material.`;
							break;
						case "a toga":
							t += `${His} loose fitted toga dangles pathetically to either side of ${his} enormous belly.`;
							break;
						case "a huipil":
							t += `${His} pregnant belly is so enormous that the huipil barely covers any of it.`;
							break;
						case "a courtesan dress":
							t += `The steady stream of movement beneath ${his} dress catches your eye.`;
							break;
						default:
							t += `${His} bare enormous squirming pregnant belly catches your eye.`;
					}
				} else if (slave.belly >= 300000) {
					switch (slave.clothes) {
						// case "an extreme corset": //FIXME: Corsets are not clothes
						// 	t += `${His} corset struggles to contain ${his} giant belly.`;
						// 	break;
						case "chains":
							t += `${His} giant belly bulges in between ${his} tight chains.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} giant belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} giant belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} giant belly makes ${him} look like a balloon under the tight latex; ${his} popped navel breaks the smoothness.`;
							break;
						case "a nice nurse outfit":
							t += `${His} giant belly makes ${him} resemble a maternity ward patient rather than a nurse.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} giant belly is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress is completely filled by ${his} giant belly.`;
							break;
						case "a nice maid outfit":
							t += `${His} maid outfit struggles to contain ${his} giant belly; ${his} popped navel is visible under ${his} apron.`;
							break;
						case "a penitent nuns habit":
							t += `${His} giant belly fills ${his} habit; it looks absolutely sinful.`;
							break;
						case "a halter top dress":
							t += `${His} giant belly fills ${his} halter top dress, which struggles to contain it.`;
							break;
						case "an evening dress":
							t += `${His} giant belly fills ${his} evening dress, which struggles to contain it.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} giant pregnant belly by ${his} struggling fabulous silken ball gown.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and giant pregnant belly makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} giant belly lewdly fills ${his} bodysuit. You swear you can see ${his} babies kicking underneath the form fitting material.`;
							break;
						case "a schoolgirl outfit":
							t += `The school bicycle is waddling by.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} giant belly fills ${his} abaya.`;
							break;
						case "a klan robe":
							t += `${His} giant belly fills ${his} robe.`;
							break;
						case "a burqa":
							t += `${His} giant belly pushes out ${his} burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} giant belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} giant belly pushes out ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} giant belly pushes out ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} giant belly pushes out ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} giant belly pushes out ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} giant belly pushes out ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} giant belly pushes out ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} giant belly stretches ${his} leather outfit greatly.`;
							break;
						case "a burkini":
							t += `${His} burkini tightly clings to ${his} giant belly.`;
							break;
						case "a hijab and blouse":
							t += `${His} giant belly strains the fabric of ${his} modest clothing.`;
							break;
						case "a leotard":
							t += `${His} giant belly lewdly stretches ${his} leotard. You swear you can see ${his} babies kicking under the material.`;
							break;
						case "a toga":
							t += `${His} loose fitted toga dangles to either side of ${his} giant belly.`;
							break;
						case "a huipil":
							t += `${His} pregnant belly is so giant that the huipil barely makes it half-way to ${his} protruding navel.`;
							break;
						case "a courtesan dress":
							t += `${His} giant belly lewdly fills ${his} dress. You swear you can see ${his} babies kicking underneath the thin material.`;
							break;
						default:
							t += `${His} bare giant pregnant belly catches your eye.`;
					}
				} else if (slave.weight > 190) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} massive gut is alluringly smooth under the tight suit.`;
							break;
						case "conservative clothing":
							t += `${His} conservative clothing stands no chance of stilling ${his} massive, jiggling gut.`;
							break;
						case "chains":
							t += `${His} massive gut jiggles lewdly around ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} massive gut.`;
							break;
						case "uncomfortable straps":
							t += `${His} massive gut jiggles lewdly around ${his} tight straps.`;
							break;
						case "shibari ropes":
							t += `${His} massive gut jiggles lewdly around ${his} tight cords.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} massive gut resembles a large beachball under ${his} tight latex.`;
							break;
						case "a nice nurse outfit":
							t += `${His} scrub top jiggles along with ${his} massive gut as ${he} moves.`;
							break;
						case "a mini dress":
							t += `${His} tearing minidress shows every jiggle in ${his} massive gut as ${he} moves.`;
							break;
						case "a nice maid outfit":
							t += `As ${he} moves, barely any jiggling can be seen within ${his} straining maid's dress.`;
							break;
						case "a penitent nuns habit":
							t += `${His} habit does nothing to stop ${his} massive gut from jiggling against the coarse cloth as ${he} moves.`;
							break;
						case "clubslut netting":
							t += `${His} clubslut netting jiggles lewdly along with ${his} massive gut as ${he} moves. Every so often, another section gives out allowing a roll of fat to spring free; it's quite entertaining to watch.`;
							break;
						case "a cheerleader outfit":
							t += `${His} massive gut jiggles its own cheer with ${his} every motion.`;
							break;
						case "a slave gown":
							t += `${His} massive jiggly gut is gently caressed by ${his} gown.`;
							break;
						case "an apron":
							t += `${His} apron rests upon ${his} massive gut, which jiggles as ${he} moves.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and massive, jiggly gut makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} massive gut as ${he} moves.`;
							break;
						case "a schoolgirl outfit":
							t += `The school blimp is jiggling by and ripe for abuse with ${his} ill-fitting clothes.`;
							break;
						case "a kimono":
							t += `${His} massive gut threatens to pop out of ${his} kimono with every motion.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} massive gut has no room left to move within ${his} overstuffed abaya.`;
							break;
						case "a klan robe":
							t += `${His} massive gut has no room left to move within ${his} overstuffed robe.`;
							break;
						case "a burqa":
							t += `${His} massive gut has no room left to move within ${his} overstuffed burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} massive belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} massive belly pushes out ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} massive belly pushes out ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} massive belly pushes out ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} massive belly pushes out ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} massive belly pushes out ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} massive belly pushes out ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} massive belly stretches ${his} leather outfit greatly.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to the folds and rolls of ${his} massive gut.`;
							break;
						case "a hijab and blouse":
							t += `${His} massive gut spills out over the top of ${his} skirt.`;
							break;
						case "a halter top dress":
							t += `${His} strained halter top dress shows every jiggle in ${his} massive gut as ${he} moves. Every little motion threatens to burst ${his} seams and free the soft mass to the world.`;
							break;
						case "an evening dress":
							t += `${His} strained evening dress shows every jiggle in ${his} massive gut as ${he} moves. Every little motion threatens to burst ${his} seams and free the soft mass to the world.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} massive gut by ${his} fabulous silken ball gown. Every little motion has a chance for it to pop out and jiggle free for all to see clearly.`;
							break;
						case "a leotard":
							t += `The taut material of ${his} leotard shows every jiggle in ${his} massive gut as ${he} moves. A pair of small ridges adorn ${his} sides where they have managed to push through the leotard's failing seams.`;
							break;
						case "a bunny outfit":
							t += `${He} is a sight in ${his} bunny outfit. The front of ${his} massive gut is held still by ${his} overworked teddy, but everything else of it jiggles obscenely with ${his} every motion.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} massive gut is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} once loose dress bulges with ${his} massive gut.`;
							break;
						case "a courtesan dress":
							t += `${His} massive gut jiggles beneath the thin cloth as ${he} moves.`;
							break;
						default:
							t += `${His} massive bare jiggling gut catches your eye.`;
					}
				} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a huge empathy belly") || (slave.bellyAccessory === "a large empathy belly")) {
					switch (slave.clothes) {
						case "conservative clothing":
							t += `${His} taut blouse shows off ${his} huge belly.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} huge belly is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress is completely filled by ${his} huge belly.`;
							break;
						case "chains":
							t += `${His} huge belly bulges between ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} huge belly.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} huge belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} huge belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} huge belly looks like a large beach ball under ${his} tight latex; ${his} popped navel breaks the smoothness.`;
							break;
						case "a long qipao":
							t += `${His} huge belly threatens to tear ${his} dress.`;
							break;
						case "battlearmor":
							t += `${His} huge belly is barely contained by ${his} armor.`;
							break;
						case "Imperial Plate":
							t += `Even through ${his} massive Imperial armor, ${his} huge belly is obvious.`;
							break;
						case "a dirndl":
							t += `${His} huge belly threatens to pop the laces off ${his} dress.`;
							break;
						case "lederhosen":
							t += `${His} huge belly threatens to pop the buttons off ${his} shorts.`;
							break;
						case "a biyelgee costume":
							t += `${His} huge belly threatens to tear ${his} dress.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a mounty outfit":
							t += `${His} huge belly threatens to pop the buttons off ${his} tunic.`;
							break;
						case "a confederate army uniform":
							t += `${His} huge belly threatens to pop the buttons off ${his} military jacket.`;
							break;
						case "a nice nurse outfit":
							t += `${His} huge belly strains against ${his} scrub top, making ${him} resemble more a maternity ward patient than a nurse.`;
							break;
						case "a mini dress":
							t += `${His} huge belly threatens to tear apart ${his} mini dress.`;
							break;
						case "a slutty maid outfit":
							t += `${His} huge belly is partially covered by a thin white blouse.`;
							break;
						case "a nice maid outfit":
							t += `${His} huge belly threatens to tear ${his} maid outfit open; ${his} popped navel is visible under ${his} apron.`;
							break;
						case "a penitent nuns habit":
							t += `${His} huge belly bulges ${his} habit; it looks absolutely sinful.`;
							break;
						case "clubslut netting":
							t += `${His} huge belly threatens to tear apart ${his} clubslut netting.`;
							break;
						case "a cheerleader outfit":
							t += `${His} huge belly is partly covered by ${his} cheerleader's top.`;
							break;
						case "a halter top dress":
							t += `${His} huge belly fills out ${his} halter top dress, the seams straining to contain it.`;
							break;
						case "an evening dress":
							t += `${His} huge belly fills out ${his} evening dress, the seams straining to contain it.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} huge pregnant belly by ${his} fabulous silken ball gown.`;
							break;
						case "a slave gown":
							t += `${His} huge belly is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `${His} huge belly threatens to pop the buttons off ${his} jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and huge pregnant belly makes ${him} look like a belly dancer.`;
							break;
						case "a toga":
							t += `${His} loose fitted toga leaves plenty of space for ${his} swollen belly.`;
							break;
						case "a huipil":
							t += `${His} pregnant belly is so huge that the huipil won't even come close to reaching ${his} protruding navel.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} huge belly lewdly fills ${his} bodysuit.`;
							if ((slave.bellyAccessory !== "a huge empathy belly") && (slave.bellyAccessory !== "a large empathy belly")) {
								t += ` You swear you can see ${his} babies kicking underneath the form fitting material.`;
							}
							break;
						case "a schoolgirl outfit":
							t += `${His} huge belly is only partly covered by ${his} blouse.`;
							break;
						case "a kimono":
							t += `${His} kimono demurely covers the sides of ${his} huge belly.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} huge belly tents ${his} abaya.`;
							break;
						case "a klan robe":
							t += `${His} huge belly tents ${his} robe.`;
							break;
						case "a burqa":
							t += `${His} huge belly tents ${his} burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} huge belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} huge belly pushes out ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} huge belly pushes out ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} huge belly pushes out ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} huge belly pushes out ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} huge belly pushes out ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} huge belly pushes out ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} huge belly stretches ${his} leather outfit greatly.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to ${his} huge belly.`;
							break;
						case "a hijab and blouse":
							t += `${His} modest clothing struggles to cover ${his} huge belly.`;
							break;
						case "a leotard":
							t += `${His} huge belly lewdly stretches ${his} leotard.`;
							if ((slave.bellyAccessory !== "a huge empathy belly") && (slave.bellyAccessory !== "a large empathy belly")) {
								t += ` You swear you can see ${his} babies kicking underneath the form fitting material.`;
							}
							break;
						case "a chattel habit":
							t += `${His} huge belly shoves the strip of cloth on ${his} front to ${his} side.`;
							break;
						case "a bunny outfit":
							t += `${His} huge belly is threatening to tear ${his} teddy, the seams along the side are already splitting.`;
							break;
						case "a courtesan dress":
							t += `${His} huge belly threatens to pop the ribs of ${his} corset as ${he} moves.`;
							break;
						default:
							t += `${His} bare huge pregnant belly catches your eye.`;
					}
				} else if (slave.weight > 160) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} giant gut is alluringly smooth under the tight suit.`;
							break;
						case "conservative clothing":
							t += `${His} conservative clothing stands no chance of stilling ${his} giant, jiggling gut.`;
							break;
						case "chains":
							t += `${His} giant gut jiggles lewdly around ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} giant gut.`;
							break;
						case "uncomfortable straps":
							t += `${His} giant gut jiggles lewdly around ${his} tight straps.`;
							break;
						case "shibari ropes":
							t += `${His} giant gut jiggles lewdly around ${his} tight cords.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} giant gut resembles a beachball under ${his} tight latex.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a confederate army uniform":
							t += `The buttons on ${his} straining jacket threaten to pop off with every motion of ${his} giant jiggling gut.`;
							break;
						case "a long qipao":
							t += `${His} giant jiggling gut threatens to tear ${his} dress.`;
							break;
						case "battlearmor":
							t += `${His} giant jiggling gut is barely contained by ${his} armor.`;
							break;
						case "Imperial Plate":
							t += `Even through ${his} massively thick Imperial armor, you can swear you see ${his} obscene gut jiggle somehow.`;
							break;
						case "a mounty outfit":
							t += `${His} giant jiggling gut threatens to pop the buttons off ${his} tunic.`;
							break;
						case "a dirndl":
							t += `${His} giant jiggling gut threatens to pop the laces off ${his} dress.`;
							break;
						case "lederhosen":
							t += `${His} giant jiggling gut threatens to pop the buttons off ${his} shorts.`;
							break;
						case "a biyelgee costume":
							t += `${His} giant jiggling gut threatens to tear ${his} dress.`;
							break;
						case "a nice nurse outfit":
							t += `${His} scrub top jiggles along with ${his} giant gut as ${he} moves.`;
							break;
						case "a mini dress":
							t += `${His} strained minidress shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a nice maid outfit":
							t += `As ${he} moves, noticeable jiggling can be seen within ${his} maid's dress.`;
							break;
						case "a penitent nuns habit":
							t += `${His} habit does nothing to stop ${his} giant gut from jiggling against the coarse cloth as ${he} moves.`;
							break;
						case "clubslut netting":
							t += `${His} clubslut netting jiggles lewdly along with ${his} giant gut as ${he} moves.`;
							break;
						case "a cheerleader outfit":
							t += `${His} giant gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
							break;
						case "a slave gown":
							t += `${His} giant jiggly gut is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `${His} giant gut has no room to move under ${his} strained jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and giant, jiggly gut makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a schoolgirl outfit":
							t += `The school fatty is jiggling by and ripe for abuse with ${his} ill-fitting clothes.`;
							break;
						case "a kimono":
							t += `Tons of jiggling can be seen through ${his} kimono whenever ${he} moves.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `Tons of jiggling can be seen through ${his} abaya whenever ${he} moves.`;
							break;
						case "a klan robe":
							t += `Tons of jiggling can be seen through ${his} robe whenever ${he} moves.`;
							break;
						case "a burqa":
							t += `Some jiggling can be seen through ${his} burqa whenever ${he} moves.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} jiggling belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `Jiggling flesh can be seen through ${his} shirt whenever ${he} moves.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `Jiggling flesh can be seen through ${his} tank-top whenever ${he} moves.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `Jiggling flesh can be seen through ${his} sweater whenever ${he} moves.`;
							break;
						case "a gothic lolita dress":
							t += `Jiggling flesh can be seen through ${his} dress whenever ${he} moves.`;
							break;
						case "a hanbok":
							t += `Jiggling flesh can be seen through ${his} hanbok whenever ${he} moves.`;
							break;
						case "a one-piece swimsuit":
							t += `Jiggling flesh can be seen through ${his} swimsuit whenever ${he} moves.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `Jiggling flesh can be seen through ${his} leather outfit whenever ${he} moves.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to the folds and rolls of ${his} giant, jiggling gut.`;
							break;
						case "a hijab and blouse":
							t += `${His} giant gut can be seen jiggling beneath ${his} skirt and blouse whenever ${he} moves.`;
							break;
						case "a halter top dress":
							t += `${His} stretched halter top dress shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "an evening dress":
							t += `${His} stretched evening dress shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} giant gut by ${his} fabulous silken ball gown.`;
							break;
						case "a leotard":
							t += `The taut material of ${his} leotard shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a chattel habit":
							t += `${His} giant gut jiggles around the strip of cloth down ${his} front as ${he} moves.`;
							break;
						case "a bunny outfit":
							t += `${He} is a sight in ${his} bunny outfit. ${His} teddy not only covers ${his} giant gut, but draws your gaze right to it, though it can't help but jiggle along with ${his} every motion.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} giant gut is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress bulges with ${his} giant gut.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s giant breasts push out ${his} overalls so far that ${his} hugely fat belly is left uncovered.`;
							} else {
								t += `${slave.slaveName}'s hugely fat belly bulges over the sides of ${his} overalls.`;
							}
							break;
						case "a courtesan dress":
							t += `${His} many thick folds jiggle beneath the thin cloth with ${his} movements.`;
							break;
						default:
							t += `${His} giant bare jiggling gut catches your eye.`;
					}
				} else if (slave.weight > 130) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} big gut is perfectly smoothed by the tight latex.`;
							break;
						case "conservative clothing":
							t += `${His} conservative clothing stands no chance of stilling ${his} big, jiggling gut.`;
							break;
						case "chains":
							t += `${His} big gut jiggles lewdly between ${his} tight chains.`;
							break;
						case "a huipil":
							t += `${His} huipil jiggles along with ${his} big gut.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} big gut.`;
							break;
						case "uncomfortable straps":
							t += `${His} big gut jiggles lewdly between ${his} tight straps.`;
							break;
						case "shibari ropes":
							t += `${His} big gut jiggles lewdly between ${his} tight cords.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} big gut has no room to move under ${his} tight latex.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a mounty outfit":
						case "a confederate army uniform":
							t += `The buttons on ${his} straining jacket struggle to hold back ${his} big jiggling gut.`;
							break;
						case "a long qipao":
							t += `${His} stretched qipao shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "battlearmor":
							t += `${His} big gut makes ${his} armor lewdly jiggle.`;
							break;
						case "Imperial Plate":
							t += `${His} fat gut makes ${his} ultra-heavy armor wobble slightly with motion.`;
							break;
						case "a dirndl":
							t += `${His} dress jiggles along with ${his} big gut as ${he} moves.`;
							break;
						case "lederhosen":
							t += `${His} suspenders jiggle along with ${his} big gut as ${he} moves.`;
							break;
						case "a biyelgee costume":
							t += `${His} stretched biyelgee costume shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a nice nurse outfit":
							t += `${His} scrub top jiggles along with ${his} big gut as ${he} moves.`;
							break;
						case "a mini dress":
							t += `${His} stretched minidress shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a slutty maid outfit":
							t += `${His} big gut is barely covered by a thin white blouse that happily jiggles along with every motion.`;
							break;
						case "a nice maid outfit":
							t += `As ${he} moves, a slight jiggle can be seen within ${his} maid's dress.`;
							break;
						case "a penitent nuns habit":
							t += `${His} habit does nothing to stop ${his} big gut from jiggling against the coarse cloth as ${he} moves.`;
							break;
						case "clubslut netting":
							t += `${His} clubslut netting jiggles lewdly along with ${his} big gut as ${he} moves.`;
							break;
						case "a cheerleader outfit":
							t += `${His} big gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
							break;
						case "a slave gown":
							t += `${His} big jiggly gut is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `Noticeable jiggling from ${his} big gut can be seen under ${his} jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and big, jiggly gut makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a schoolgirl outfit":
							t += `${His} big gut is partially covered by ${his} blouse, which happily jiggles along with every motion.`;
							break;
						case "a kimono":
							t += `Noticeable jiggling can be seen through ${his} kimono whenever ${he} moves.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `Noticeable jiggling can be seen through ${his} abaya whenever ${he} moves.`;
							break;
						case "a klan robe":
							t += `Noticeable jiggling can be seen through ${his} robe whenever ${he} moves.`;
							break;
						case "a burqa":
							t += `A small amount of jiggling can be seen through ${his} burqa whenever ${he} moves.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} jiggling belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `A small amount of jiggling can be seen through ${his} shirt whenever ${he} moves.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `A small amount of jiggling can be seen through ${his} tank-top whenever ${he} moves.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `A small amount of jiggling can be seen through ${his} sweater whenever ${he} moves.`;
							break;
						case "a gothic lolita dress":
							t += `A small amount of jiggling can be seen through ${his} dress whenever ${he} moves.`;
							break;
						case "a hanbok":
							t += `A small amount of jiggling can be seen through ${his} hanbok whenever ${he} moves.`;
							break;
						case "a one-piece swimsuit":
							t += `A small amount of jiggling can be seen through ${his} swimsuit whenever ${he} moves.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `A small amount of jiggling can be seen through ${his} leather outfit whenever ${he} moves.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to the shape of ${his} big, jiggling gut.`;
							break;
						case "a hijab and blouse":
							t += `${His} big gut can often be seen jiggling beneath ${his} skirt and blouse when ${he} moves.`;
							break;
						case "a halter top dress":
							t += `${His} stretched halter top dress shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "an evening dress":
							t += `${His} stretched evening dress shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} big gut by ${his} fabulous silken ball gown.`;
							break;
						case "a leotard":
							t += `The taut material of ${his} leotard shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "an apron":
							t += `As ${he} moves, ${his} apron jostles just as ${his} big gut jiggles.`;
							break;
						case "a bunny outfit":
							t += `${He} is a sight in ${his} bunny outfit. ${His} teddy not only controls ${his} big gut, but draws your gaze right to it.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} big gut is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress bulges with ${his} big gut.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s giant breasts push out ${his} overalls so far that ${his} big fat belly is left uncovered.`;
							} else {
								t += `${slave.slaveName}'s big fat belly spills out from behind ${his} overalls.`;
							}
							break;
						case "a courtesan dress":
							t += `${His} many folds jiggle beneath the thin cloth with ${his} movements.`;
							break;
						default:
							t += `${His} big bare jiggling gut catches your eye.`;
					}
				} else if (slave.bellyPreg >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
					switch (slave.clothes) {
						case "conservative clothing":
							t += `${His} taut blouse shows off ${his} big belly.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} big belly is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress is filled out by ${his} big belly.`;
							break;
						case "chains":
							t += `${His} big belly bulges between ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} big belly.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} big belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} big belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} big belly looks like a beach ball under ${his} tight latex; ${his} popped navel breaks the smoothness.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a mounty outfit":
						case "a confederate army uniform":
							t += `${His} big belly strains the buttons on ${his} jacket.`;
							break;
						case "a long qipao":
							t += `${His} stretched qipao shows every jiggle in ${his} big belly as ${he} moves.`;
							break;
						case "battlearmor":
							t += `${His} big belly makes ${his} armor lewdly jiggle.`;
							break;
						case "Imperial Plate":
							t += `${His} fat gut makes ${his} ultra-heavy armor wobble slightly with motion.`;
							break;
						case "a dirndl":
							t += `${His} dress jiggles along with ${his} big belly as ${he} moves.`;
							break;
						case "lederhosen":
							t += `${His} suspenders jiggle along with ${his} big belly as ${he} moves.`;
							break;
						case "a biyelgee costume":
							t += `${His} stretched biyelgee costume shows every jiggle in ${his} big belly as ${he} moves.`;
							break;
						case "a nice nurse outfit":
							t += `${His} large belly strains against ${his} scrub top, making ${him} resemble more a maternity ward patient than a nurse.`;
							break;
						case "a mini dress":
							t += `${His} large belly strains against ${his} mini dress.`;
							break;
						case "a slutty maid outfit":
							t += `${His} big belly is partially covered by a thin white blouse.`;
							break;
						case "a nice maid outfit":
							t += `${His} big belly strains ${his} maid outfit; ${his} popped navel is visible under ${his} apron.`;
							break;
						case "a penitent nuns habit":
							t += `${His} big belly bulges ${his} habit; it looks absolutely sinful.`;
							break;
						case "clubslut netting":
							t += `${His} big belly strains ${his} clubslut netting.`;
							break;
						case "a cheerleader outfit":
							t += `${His} big belly is partly covered by ${his} cheerleader's top.`;
							break;
						case "a halter top dress":
							t += `${His} big belly fills out ${his} halter top dress.`;
							break;
						case "an evening dress":
							t += `${His} big belly fills out ${his} evening dress.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} big pregnant belly by ${his} fabulous silken ball gown.`;
							break;
						case "a slave gown":
							t += `${His} big belly is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `${His} big belly strains the buttons on ${his} jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and big pregnant belly makes ${him} look like a belly dancer.`;
							break;
						case "a toga":
							t += `${His} loose fitted toga leaves plenty of space for ${his} swollen belly.`;
							break;
						case "a huipil":
							t += `${His} pregnant belly is so big that the huipil won't even reach ${his} protruding navel.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} big belly fills ${his} bodysuit.`;
							if (slave.bellyAccessory !== "a medium empathy belly") {
								t += ` You swear you can see ${his} babies kicking underneath the form fitting material.`;
							}
							break;
						case "a schoolgirl outfit":
							t += `${His} big belly is only partly covered by ${his} blouse.`;
							break;
						case "a kimono":
							t += `${His} kimono demurely covers ${his} big belly.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} big belly tents ${his} abaya.`;
							break;
						case "a klan robe":
							t += `${His} big belly tents ${his} robe.`;
							break;
						case "a burqa":
							t += `${His} big belly gently pushes against ${his} burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} big belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} big belly pushes out ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} big belly pushes out ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} big belly pushes out ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} big belly pushes out ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} big belly pushes out ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} big belly pushes out ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} big belly stretches ${his} leather outfit greatly.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to ${his} big belly.`;
							break;
						case "a hijab and blouse":
							t += `${He} has trouble pulling ${his} skirt up over ${his} big belly.`;
							break;
						case "a leotard":
							t += `${His} big belly stretches ${his} leotard.`;
							if (slave.bellyAccessory !== "a medium empathy belly") {
								t += ` You swear you can see ${his} babies kicking underneath the form fitting material.`;
							}
							break;
						case "a chattel habit":
							t += `${His} big belly shoves the strip of cloth on ${his} front to ${his} side.`;
							break;
						case "a bunny outfit":
							t += `${His} big belly strains ${his} teddy; the seams along the side are showing signs of wear.`;
							break;
						case "a courtesan dress":
							t += `${His} big belly sways gracefully with ${his} movements.`;
							break;
						default:
							t += `${His} bare pregnant belly catches your eye.`;
					}
				} else if (slave.weight >= 95) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
							break;
						case "conservative clothing":
							t += `${His} taut blouse shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} fat gut is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress bulges with ${his} fat gut.`;
							break;
						case "chains":
							t += `${His} fat gut jiggles lewdly between ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop, and jiggles with, ${his} fat gut as ${he} moves.`;
							break;
						case "uncomfortable straps":
							t += `${His} fat gut jiggles lewdly between ${his} tight straps.`;
							break;
						case "shibari ropes":
							t += `${His} fat gut jiggles lewdly between the binding ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} fat gut barely has any room to move under ${his} tight latex.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a mounty outfit":
						case "a confederate army uniform":
							t += `The buttons on ${his} straining jacket can barely hold back ${his} fat, jiggling gut.`;
							break;
						case "a long qipao":
							t += `${His} dress barely contains ${his} fat, jiggling gut.`;
							break;
						case "battlearmor":
							t += `${His} armor barely contains ${his} fat, jiggling gut.`;
							break;
						case "Imperial Plate":
							t += `${His} fat gut makes ${his} ultra-heavy armor wobble slightly with motion.`;
							break;
						case "a dirndl":
							t += `${His} dress barely contains ${his} fat, jiggling gut.`;
							break;
						case "lederhosen":
							t += `${His} shorts and suspenders barely contains ${his} fat, jiggling gut.`;
							break;
						case "a biyelgee costume":
							t += `${His} dress barely contains ${his} fat, jiggling gut.`;
							break;
						case "a nice nurse outfit":
							t += `${His} scrub top jiggles along with ${his} fat gut as ${he} moves.`;
							break;
						case "a mini dress":
							t += `${His} stretched minidress shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a slutty maid outfit":
							t += `${His} fat gut is partially covered by a thin white blouse, which happily jiggles along with every motion.`;
							break;
						case "a nice maid outfit":
							t += `As ${he} moves, a slight jiggle can be seen within ${his} maid's dress.`;
							break;
						case "a penitent nuns habit":
							t += `${His} habit does nothing to stop ${his} fat gut from jiggling against the coarse cloth as ${he} moves.`;
							break;
						case "clubslut netting":
							t += `${His} clubslut netting jiggles lewdly along with ${his} fat gut as ${he} moves.`;
							break;
						case "a cheerleader outfit":
							t += `${His} fat gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
							break;
						case "a halter top dress":
							t += `${His} stretched halter top dress shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "an evening dress":
							t += `${His} stretched evening dress shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} fat gut by ${his} fabulous silken ball gown.`;
							break;
						case "a slave gown":
							t += `${His} fat, jiggly gut is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `Slight jiggling from ${his} fat gut can be seen under ${his} jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and fat, jiggly gut makes ${him} look like a belly dancer.`;
							break;
						case "a toga":
							t += `${His} toga swerves loosely from side to side as ${his} chubby body moves inside it.`;
							break;
						case "a huipil":
							t += `${His} lithe huipil can't hide ${his} voluptuous shape unless ${he} stands completely still.`;
							break;
						case "a comfortable bodysuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a schoolgirl outfit":
							t += `${His} fat gut is partially covered by ${his} blouse, which happily jiggles along with every motion.`;
							break;
						case "a kimono":
							t += `Slight jiggling can be seen through ${his} kimono whenever ${he} moves.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `Slight jiggling can be seen through ${his} abaya whenever ${he} moves.`;
							break;
						case "a klan robe":
							t += `${His} robe hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a burqa":
							t += `${His} burqa hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} fat gut jiggles freely.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} shirt somewhat hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} tank-top barely hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} sweater somewhat hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a gothic lolita dress":
							t += `${His} dress somewhat hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a hanbok":
							t += `${His} hanbok somewhat hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} swimsuit barely hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} leather outfit somewhat hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to the shape of ${his} fat gut.`;
							break;
						case "a hijab and blouse":
							t += `${His} modest skirt and blouse bulge from the size of ${his} fat gut.`;
							break;
						case "an apron":
							t += `${His} apron provides some covering to the jiggling of ${his} fat gut.`;
							break;
						case "a leotard":
							t += `The taut material of ${his} leotard shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a chattel habit":
							t += `${His} fat gut jiggles around the strip of cloth down ${his} front as ${he} moves.`;
							break;
						case "a bunny outfit":
							t += `${He} is a sight in ${his} bunny outfit. The front of ${his} fat gut is held still by ${his} teddy, but everything else of it jiggles obscenely with ${his} every motion.`;
							break;
						case "a courtesan dress":
							t += `${His} gut jiggles beneath the thin cloth of ${his} dress.`;
							break;
						default:
							t += `${His} bare, jiggling, fat gut catches your eye.`;
					}
				} else if (slave.bellyPreg >= 1500 || (slave.bellyAccessory === "a small empathy belly")) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
							break;
						case "conservative clothing":
							t += `${His} blouse bulges with ${his} growing belly.`;
							break;
						case "chains":
							t += `${His} growing belly bulges between ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} growing belly.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} growing belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} growing belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} growing belly bulges beneath ${his} tight latex.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a mounty outfit":
						case "a confederate army uniform":
							t += `${His} growing belly bulges ${his} uniform tunic.`;
							break;
						case "a long qipao":
							t += `${His} growing belly bulges ${his} dress.`;
							break;
						case "battlearmor":
							t += `${His} growing belly bulges ${his} armor.`;
							break;
						case "Imperial Plate":
							t += `You can see a hint of ${his} growing belly swelling underneath ${his} ultra-heavy armor.`;
							break;
						case "a dirndl":
							t += `${His} growing belly bulges ${his} dress.`;
							break;
						case "lederhosen":
							t += `${His} growing belly bulges ${his} lederhosen.`;
							break;
						case "a biyelgee costume":
							t += `${His} growing belly bulges ${his} dress.`;
							break;
						case "a nice nurse outfit":
							t += `${His} growing belly is clearly visible through ${his} scrub top.`;
							break;
						case "a mini dress":
							t += `${His} growing belly bulges ${his} tight mini dress.`;
							break;
						case "a slutty maid outfit":
							t += `${His} growing belly bulges ${his} thin white blouse.`;
							break;
						case "a nice maid outfit":
							t += `${His} growing belly is concealed by ${his} maid outfit.`;
							break;
						case "a penitent nuns habit":
							t += `${His} growing belly bulges ${his} habit.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} growing belly is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress conceals ${his} growing belly.`;
							break;
						case "clubslut netting":
							t += `${His} growing belly fills out ${his} clubslut netting.`;
							break;
						case "a cheerleader outfit":
							t += `${His} growing belly peeks out from under ${his} cheerleader's top.`;
							break;
						case "a halter top dress":
							t += `${His} growing belly bulges ${his} halter top dress.`;
							break;
						case "an evening dress":
							t += `${His} growing belly bulges ${his} evening dress.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} growing pregnant belly by ${his} fabulous silken ball gown.`;
							break;
						case "a slave gown":
							t += `${His} growing belly is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `${His} growing belly bulges ${his} suit jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and growing pregnant belly makes ${him} look like a belly dancer.`;
							break;
						case "a toga":
							t += `${His} toga is so loose that you can barely notice ${his} growing belly.`;
							break;
						case "a huipil":
							t += `${His} growing belly can be seen from the sides of ${his} huipil.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} growing belly fills ${his} bodysuit.`;
							break;
						case "a schoolgirl outfit":
							t += `${His} growing belly peeks out from under ${his} blouse.`;
							break;
						case "a kimono":
							t += `${His} kimono demurely covers ${his} growing belly.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} growing belly gently tents ${his} abaya.`;
							break;
						case "a burqa":
							t += `${His} burqa hides ${his} growing belly.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} growing belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} shirt hides ${his} growing belly.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} tank-top hides ${his} growing belly.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} sweater hides ${his} growing belly.`;
							break;
						case "a gothic lolita dress":
							t += `${His} dress hides ${his} growing belly.`;
							break;
						case "a hanbok":
							t += `${His} hanbok hides ${his} growing belly.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} swimsuit hides ${his} growing belly.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} leather outfit hides ${his} growing belly.`;
							break;
						case "a klan robe":
							t += `${His} robe hides ${his} growing belly.`;
							break;
						case "a burkini":
							t += `${His} burkini modestly covers ${his} growing belly.`;
							break;
						case "a hijab and blouse":
							t += `${His} growing belly gently pushes against ${his} modest clothing.`;
							break;
						case "a leotard":
							t += `${His} growing belly fills ${his} leotard.`;
							break;
						case "a chattel habit":
							t += `${His} growing belly shows under the strip of cloth on ${his} front.`;
							break;
						case "a bunny outfit":
							t += `${His} growing belly fills ${his} teddy.`;
							break;
						case "a courtesan dress":
							t += `${His} barely visible pregnancy fills out ${his} dress.`;
							break;
						default:
							t += `${His} barely visible pregnancy catches your eye.`;
					}
				} else {
					if (slave.weight >= 30) {
						t += `Slight jiggling can be seen in ${his} chubby belly as ${he} moves.`;
					}
				}
			} else { /* implant descriptions */
				if (slave.bellyImplant >= 32000) {
					switch (slave.clothes) {
						// case "an extreme corset": //FIXME: Corsets are not clothes
						// 	t += `${His} corset struggles to contain ${his} enormous belly.`;
						// 	break;
						case "chains":
							t += `${His} enormous belly bulges in between ${his} tight chains.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} enormous belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} enormous belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} enormous belly makes ${him} look like a giant balloon under the tight latex; ${his} popped navel breaks the smoothness.`;
							break;
						case "a nice nurse outfit":
							t += `${He}'s decided to become the maternity ward, judging by the enormous belly ${he} sports.`;
							break;
						case "a maternity dress":
							t += `${His} tight dress is strained by ${his} enormous belly.`;
							break;
						case "a nice maid outfit":
							t += `${His} enormous belly is covered only by an apron.`;
							break;
						case "a penitent nuns habit":
							t += `${His} enormous belly strains ${his} habit; it looks absolutely sinful.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} enormous belly by ${his} striking silken ball gown.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and enormous belly makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} enormous belly lewdly fills ${his} bodysuit.`;
							break;
						case "a schoolgirl outfit":
							t += `The school blimp is waddling by.`;
							break;
						case "a monokini":
							t += `${His} monokini only covers the lower quarter of ${his} enormous belly.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s gigantic breasts push out ${his} overalls so far that ${his} huge implant-filled belly is left halfway uncovered.`;
							} else {
								t += `The front of ${slave.slaveName}'s overalls barely covers half of ${his} huge implant-filled pregnant belly.`;
							}
							break;
						case "an apron":
							t += `${His} apron covers only a fraction of ${his} enormous belly.`;
							break;
						case "a cybersuit":
							t += `${His} enormous belly lewdly stretches ${his} bodysuit.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} enormous belly.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} enormous belly pushes out ${his} abaya.`;
							break;
						case "a klan robe":
							t += `${His} enormous belly pushes out ${his} robe.`;
							break;
						case "a burqa":
							t += `${His} enormous belly pushes out ${his} burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} enormous belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} enormous belly pushes out ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} enormous belly pushes out ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} enormous belly pushes out ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} enormous belly pushes out ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} enormous belly pushes out ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} enormous belly pushes out ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} enormous belly stretches ${his} leather outfit greatly.`;
							break;
						case "a burkini":
							t += `${His} burkini tightly clings to ${his} enormous belly.`;
							break;
						case "a hijab and blouse":
							t += `${His} enormous belly strains the fabric of ${his} modest clothing.`;
							break;
						case "a leotard":
							t += `${His} enormous belly lewdly stretches ${his} leotard.`;
							break;
						case "a toga":
							t += `${His} loose fitted toga dangles pathetically to either side of ${his} enormous belly.`;
							break;
						case "a huipil":
							t += `${His} taut belly is so enormous that the huipil barely covers any of it.`;
							break;
						case "a courtesan dress":
							t += `${His} enormous belly lewdly stretches ${his} dress.`;
							break;
						default:
							t += `${His} bare enormous stomach catches your eye.`;
					}
				} else if (slave.bellyImplant >= 16000) {
					switch (slave.clothes) {
						// case "an extreme corset": // FIXME: Corsets are not clothes
						// 	t += `${His} corset struggles to contain ${his} giant belly.`;
						// 	break;
						case "chains":
							t += `${His} giant belly bulges in between ${his} tight chains.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} giant belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} giant belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} giant belly makes ${him} look like a balloon under the tight latex; ${his} popped navel breaks the smoothness.`;
							break;
						case "a nice nurse outfit":
							t += `${His} giant belly makes ${him} resemble a maternity ward patient rather than a nurse.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} giant belly is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress is completely filled by ${his} giant belly.`;
							break;
						case "a nice maid outfit":
							t += `${His} maid outfit struggles to contain ${his} giant belly; ${his} popped navel is visible under ${his} apron.`;
							break;
						case "a penitent nuns habit":
							t += `${His} giant belly fills ${his} habit; it looks absolutely sinful.`;
							break;
						case "a halter top dress":
							t += `${His} giant belly fills ${his} halter top dress, which struggles to contain it.`;
							break;
						case "an evening dress":
							t += `${His} giant belly fills ${his} evening dress, which struggles to contain it.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} giant belly by ${his} struggling fabulous silken ball gown.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and giant belly makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} giant belly lewdly fills ${his} bodysuit.`;
							break;
						case "a schoolgirl outfit":
							t += `The school bicycle is waddling by.`;
							break;
						case "a monokini":
							t += `${His} monokini only covers the lower half of ${his} giant belly.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s enormous breasts push out ${his} overalls so far that ${his} huge implant-filled belly is left mostly uncovered.`;
							} else {
								t += `${slave.slaveName}'s overalls are pulled taut by ${his} huge implant-filled belly.`;
							}
							break;
						case "an apron":
							t += `${His} apron struggles to cover most of ${his} giant belly.`;
							break;
						case "a cybersuit":
							t += `${His} giant belly lewdly stretches ${his} bodysuit.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} giant belly.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} giant belly fills ${his} abaya.`;
							break;
						case "a burqa":
							t += `${His} giant belly pushes out ${his} burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} giant belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} giant belly pushes out ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} giant belly pushes out ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} giant belly pushes out ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} giant belly pushes out ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} giant belly pushes out ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} giant belly pushes out ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} giant belly stretches ${his} leather outfit greatly.`;
							break;
						case "a burkini":
							t += `${His} burkini tightly clings to ${his} giant belly.`;
							break;
						case "a hijab and blouse":
							t += `${His} giant belly strains the fabric of ${his} modest clothing.`;
							break;
						case "a leotard":
							t += `${His} giant belly lewdly stretches ${his} leotard.`;
							break;
						case "a toga":
							t += `${His} loose fitted toga dangles to either side of ${his} giant belly.`;
							break;
						case "a huipil":
							t += `${His} belly is so giant that the huipil barely makes it half-way to ${his} protruding navel.`;
							break;
						case "a courtesan dress":
							t += `${His} giant belly lewdly fills ${his} dress.`;
							break;
						default:
							t += `${His} bare giant belly catches your eye.`;
					}
				} else if (slave.weight > 190) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} massive gut is alluringly smooth under the tight suit.`;
							break;
						case "conservative clothing":
							t += `${His} conservative clothing stands no chance of stilling ${his} massive, jiggling gut.`;
							break;
						case "chains":
							t += `${His} massive gut jiggles lewdly around ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} massive gut.`;
							break;
						case "uncomfortable straps":
							t += `${His} massive gut jiggles lewdly around ${his} tight straps.`;
							break;
						case "shibari ropes":
							t += `${His} massive gut jiggles lewdly around ${his} tight cords.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} massive gut resembles a large beachball under ${his} tight latex.`;
							break;
						case "a nice nurse outfit":
							t += `${His} scrub top jiggles along with ${his} massive gut as ${he} moves.`;
							break;
						case "a mini dress":
							t += `${His} tearing minidress shows every jiggle in ${his} massive gut as ${he} moves.`;
							break;
						case "a monokini":
							t += `${His} massive gut spills out over the front of ${his} monokini.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s enormous breasts push out ${his} overalls so far that ${his} massively fat belly is left mostly uncovered.`;
							} else {
								t += `${slave.slaveName}'s massively fat belly spills out over the sides of ${his} overalls.`;
							}
							break;
						case "an apron":
							t += `${His} apron rests upon ${his} massive gut, which jiggles as ${he} moves.`;
							break;
						case "a cybersuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} massive gut as ${he} moves.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} massive, jiggly gut, quaking as ${he} moves.`;
							break;
						case "a nice maid outfit":
							t += `As ${he} moves, barely any jiggling can be seen within ${his} straining maid's dress.`;
							break;
						case "a penitent nuns habit":
							t += `${His} habit does nothing to stop ${his} massive gut from jiggling against the coarse cloth as ${he} moves.`;
							break;
						case "clubslut netting":
							t += `${His} clubslut netting jiggles lewdly along with ${his} massive gut as ${he} moves. Every so often, another section gives out allowing a roll of fat to spring free; it's quite entertaining to watch.`;
							break;
						case "a cheerleader outfit":
							t += `${His} massive gut jiggles its own cheer with ${his} every motion.`;
							break;
						case "a slave gown":
							t += `${His} massive jiggly gut is gently caressed by ${his} gown.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and massive, jiggly gut makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} massive gut as ${he} moves.`;
							break;
						case "a schoolgirl outfit":
							t += `The school blimp is jiggling by and ripe for abuse with ${his} ill-fitting clothes.`;
							break;
						case "a kimono":
							t += `${His} massive gut threatens to pop out of ${his} kimono with every motion.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} massive gut has no room left to move within ${his} overstuffed abaya.`;
							break;
						case "a klan robe":
							t += `${His} massive gut has no room left to move within ${his} overstuffed robe.`;
							break;
						case "a burqa":
							t += `${His} massive gut has no room left to move within ${his} overstuffed burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} massive belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} massive belly jiggles under ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} massive belly jiggles under ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} massive belly jiggles under ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} massive belly jiggles under ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} massive belly jiggles under ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} massive belly jiggles under ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} massive belly jiggles under ${his} leather outfit.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to the folds and rolls of ${his} massive gut.`;
							break;
						case "a hijab and blouse":
							t += `${His} massive gut spills out over the top of ${his} skirt.`;
							break;
						case "a halter top dress":
							t += `${His} strained halter top dress shows every jiggle in ${his} massive gut as ${he} moves. Every little motion threatens to burst ${his} seams and free the soft mass to the world.`;
							break;
						case "an evening dress":
							t += `${His} strained evening dress shows every jiggle in ${his} massive gut as ${he} moves. Every little motion threatens to burst ${his} seams and free the soft mass to the world.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} massive gut by ${his} fabulous silken ball gown. Every little motion has a chance for it to pop out and jiggle free for all to see clearly.`;
							break;
						case "a leotard":
							t += `The taut material of ${his} leotard shows every jiggle in ${his} massive gut as ${he} moves. A pair of small ridges adorn ${his} sides where they have managed to push through the leotard's failing seams.`;
							break;
						case "a bunny outfit":
							t += `${He} is a sight in ${his} bunny outfit. The front of ${his} massive gut is held still by ${his} overworked teddy, but everything else of it jiggles obscenely with ${his} every motion.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} massive gut is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} once loose dress bulges with ${his} massive gut.`;
							break;
						case "a courtesan dress":
							t += `${His} massive gut jiggles beneath the thin cloth as ${he} moves.`;
							break;
						default:
							t += `${His} massive bare jiggling gut catches your eye.`;
					}
				} else if (slave.bellyImplant >= 8000) {
					switch (slave.clothes) {
						case "conservative clothing":
							t += `${His} taut blouse shows off ${his} huge belly.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} huge belly is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress is completely filled by ${his} huge belly.`;
							break;
						case "chains":
							t += `${His} huge belly bulges between ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} huge belly.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} huge belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} huge belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} huge belly looks like a large beach ball under ${his} tight latex; ${his} popped navel breaks the smoothness.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
							t += `${His} huge belly threatens to pop the buttons off ${his} tunic.`;
							break;
						case "a confederate army uniform":
							t += `${His} huge belly threatens to pop the buttons off ${his} military jacket.`;
							break;
						case "a long qipao":
							t += `The front of ${his} qipao rests atop ${his} huge belly.`;
							break;
						case "battlearmor":
							t += `${His} taut armor shows off ${his} huge belly.`;
							break;
						case "Imperial Plate":
							t += `${His} huge belly swells out the front of ${his} ultra-heavy armor.`;
							break;
						case "a mounty outfit":
							t += `${His} huge belly threatens to pop the buttons off ${his} uniform.`;
							break;
						case "a dirndl":
							t += `${His} loose dress is completely filled by ${his} huge belly.`;
							break;
						case "lederhosen":
							t += `${His} huge belly threatens to pop the buttons off ${his} shorts.`;
							break;
						case "a biyelgee costume":
							t += `${His} loose dress is completely filled by ${his} huge belly.`;
							break;
						case "a nice nurse outfit":
							t += `${His} huge belly strains against ${his} scrub top, making ${him} resemble more a maternity ward patient than a nurse.`;
							break;
						case "a mini dress":
							t += `${His} huge belly threatens to tear apart ${his} mini dress.`;
							break;
						case "a slutty maid outfit":
							t += `${His} huge belly is partially covered by a thin white blouse.`;
							break;
						case "a nice maid outfit":
							t += `${His} huge belly threatens to tear ${his} maid outfit open; ${his} popped navel is visible under ${his} apron.`;
							break;
						case "a penitent nuns habit":
							t += `${His} huge belly bulges ${his} habit; it looks absolutely sinful.`;
							break;
						case "clubslut netting":
							t += `${His} huge belly threatens to tear apart ${his} clubslut netting.`;
							break;
						case "a cheerleader outfit":
							t += `${His} huge belly is partly covered by ${his} cheerleader's top.`;
							break;
						case "a halter top dress":
							t += `${His} huge belly fills out ${his} halter top dress, the seams straining to contain it.`;
							break;
						case "an evening dress":
							t += `${His} huge belly fills out ${his} evening dress, the seams straining to contain it.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} huge belly by ${his} fabulous silken ball gown.`;
							break;
						case "a slave gown":
							t += `${His} huge belly is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `${His} huge belly threatens to pop the buttons off ${his} jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and huge belly makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} huge belly lewdly fills ${his} bodysuit.`;
							break;
						case "a schoolgirl outfit":
							t += `${His} huge belly is only partly covered by ${his} blouse.`;
							break;
						case "a monokini":
							t += `${His} monokini only covers the lower three quarters of ${his} huge belly.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s massive breasts push out ${his} overalls so far that ${his} hugely swollen belly is left almost entirely uncovered.`;
							} else {
								t += `${slave.slaveName}'s hugely swollen belly stretches out the fabric of ${his} overalls.`;
							}
							break;
						case "a cybersuit":
							t += `${His} huge belly lewdly stretches ${his} bodysuit.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} huge belly.`;
							break;
						case "a kimono":
							t += `${His} kimono demurely covers the sides of ${his} huge belly.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} huge belly tents ${his} abaya.`;
							break;
						case "a klan robe":
							t += `${His} huge belly tents ${his} robe.`;
							break;
						case "a burqa":
							t += `${His} huge belly tents ${his} burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} huge belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} huge belly lewdly stretches ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} huge belly lewdly stretches ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} huge belly lewdly stretches ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} huge belly lewdly stretches ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} huge belly lewdly stretches ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} huge belly lewdly stretches ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} huge belly lewdly stretches ${his} leather outfit.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to ${his} huge belly.`;
							break;
						case "a hijab and blouse":
							t += `${His} modest clothing struggles to cover ${his} huge belly.`;
							break;
						case "a leotard":
							t += `${His} huge belly lewdly stretches ${his} leotard.`;
							break;
						case "an apron":
							t += `${His} apron is filled out by ${his} huge belly.`;
							break;
						case "a chattel habit":
							t += `${His} huge belly shoves the strip of cloth on ${his} front to ${his} side.`;
							break;
						case "a bunny outfit":
							t += `${His} huge belly is threatening to tear ${his} teddy, the seams along the side are already splitting.`;
							break;
						case "a toga":
							t += `${His} loose fitted toga leaves plenty of space for ${his} swollen belly.`;
							break;
						case "a huipil":
							t += `${His} belly is so huge that the huipil won't even come close to reaching ${his} protruding navel.`;
							break;
						case "a courtesan dress":
							t += `${His} huge belly threatens to pop the ribs of ${his} corset as ${he} moves.`;
							break;
						default:
							t += `${His} bare huge belly catches your eye.`;
					}
				} else if (slave.weight > 160) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} giant gut is alluringly smooth under the tight suit.`;
							break;
						case "conservative clothing":
							t += `${His} conservative clothing stands no chance of stilling ${his} giant, jiggling gut.`;
							break;
						case "chains":
							t += `${His} giant gut jiggles lewdly around ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} giant gut.`;
							break;
						case "a long qipao":
							t += `The front of ${his} qipao rests atop ${his} giant gut.`;
							break;
						case "battlearmor":
							t += `${His} taut armor shows off ${his} giant gut.`;
							break;
						case "Imperial Plate":
							t += `${His} giant belly swells out the front of ${his} ultra-heavy armor.`;
							break;
						case "a mounty outfit":
							t += `${His} giant gut threatens to pop the buttons off ${his} tunic.`;
							break;
						case "a dirndl":
							t += `${His} loose dress is completely filled by ${his} giant gut.`;
							break;
						case "lederhosen":
							t += `${His} giant gut threatens to pop the buttons off ${his} shorts.`;
							break;
						case "a biyelgee costume":
							t += `${His} loose dress is completely filled by ${his} giant gut.`;
							break;
						case "uncomfortable straps":
							t += `${His} giant gut jiggles lewdly around ${his} tight straps.`;
							break;
						case "shibari ropes":
							t += `${His} giant gut jiggles lewdly around ${his} tight cords.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} giant gut resembles a beachball under ${his} tight latex.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a confederate army uniform":
							t += `The buttons on ${his} straining jacket threaten to pop off with every motion of ${his} giant jiggling gut.`;
							break;
						case "a nice nurse outfit":
							t += `${His} scrub top jiggles along with ${his} giant gut as ${he} moves.`;
							break;
						case "a mini dress":
							t += `${His} strained minidress shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a monokini":
							t += `${His} monokini struggles to rein in ${his} giant gut.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s giant breasts push out ${his} overalls so far that ${his} hugely fat belly is left uncovered.`;
							} else {
								t += `${slave.slaveName}'s hugely fat belly bulges over the sides of ${his} overalls.`;
							}
							break;
						case "an apron":
							t += `${His} apron offers no cover to the jiggles of ${his} giant gut as ${he} moves.`;
							break;
						case "a cybersuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} giant gut, jiggling as ${he} moves.`;
							break;
						case "a nice maid outfit":
							t += `As ${he} moves, noticeable jiggling can be seen within ${his} maid's dress.`;
							break;
						case "a penitent nuns habit":
							t += `${His} habit does nothing to stop ${his} giant gut from jiggling against the coarse cloth as ${he} moves.`;
							break;
						case "clubslut netting":
							t += `${His} clubslut netting jiggles lewdly along with ${his} giant gut as ${he} moves.`;
							break;
						case "a cheerleader outfit":
							t += `${His} giant gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
							break;
						case "a slave gown":
							t += `${His} giant jiggly gut is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `${His} giant gut has no room to move under ${his} strained jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and giant, jiggly gut makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a schoolgirl outfit":
							t += `The school fatty is jiggling by and ripe for abuse with ${his} ill-fitting clothes.`;
							break;
						case "a kimono":
							t += `Tons of jiggling can be seen through ${his} kimono whenever ${he} moves.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `Tons of jiggling can be seen through ${his} abaya whenever ${he} moves.`;
							break;
						case "a klan robe":
							t += `Some jiggling can be seen through ${his} robe whenever ${he} moves.`;
							break;
						case "a burqa":
							t += `Some jiggling can be seen through ${his} burqa whenever ${he} moves.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} jiggling belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `Some jiggling can be seen through ${his} shirt whenever ${he} moves.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `Some jiggling can be seen through ${his} tank-top whenever ${he} moves.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `Some jiggling can be seen through ${his} sweater whenever ${he} moves.`;
							break;
						case "a gothic lolita dress":
							t += `Some jiggling can be seen through ${his} dress whenever ${he} moves.`;
							break;
						case "a hanbok":
							t += `Some jiggling can be seen through ${his} hanbok whenever ${he} moves.`;
							break;
						case "a one-piece swimsuit":
							t += `Some jiggling can be seen through ${his} swimsuit whenever ${he} moves.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `Some jiggling can be seen through ${his} leather outfit whenever ${he} moves.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to the folds and rolls of ${his} giant, jiggling gut.`;
							break;
						case "a hijab and blouse":
							t += `${His} giant gut can be seen jiggling beneath ${his} skirt and blouse whenever ${he} moves.`;
							break;
						case "a halter top dress":
							t += `${His} stretched halter top dress shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "an evening dress":
							t += `${His} stretched evening dress shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} giant gut by ${his} fabulous silken ball gown.`;
							break;
						case "a leotard":
							t += `The taut material of ${his} leotard shows every jiggle in ${his} giant gut as ${he} moves.`;
							break;
						case "a chattel habit":
							t += `${His} giant gut jiggles around the strip of cloth down ${his} front as ${he} moves.`;
							break;
						case "a bunny outfit":
							t += `${He} is a sight in ${his} bunny outfit. ${His} teddy not only covers ${his} giant gut, but draws your gaze right to it, though it can't help but jiggle along with ${his} every motion.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} giant gut is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress bulges with ${his} giant gut.`;
							break;
						case "a courtesan dress":
							t += `${His} many thick folds jiggle beneath the thin cloth with ${his} movements.`;
							break;
						default:
							t += `${His} giant bare jiggling gut catches your eye.`;
					}
				} else if (slave.weight > 130) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} big gut is perfectly smoothed by the tight latex.`;
							break;
						case "conservative clothing":
							t += `${His} conservative clothing stands no chance of stilling ${his} big, jiggling gut.`;
							break;
						case "chains":
							t += `${His} big gut jiggles lewdly between ${his} tight chains.`;
							break;
						case "a huipil":
							t += `${His} huipil jiggles along with ${his} big gut.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} big gut.`;
							break;
						case "uncomfortable straps":
							t += `${His} big gut jiggles lewdly between ${his} tight straps.`;
							break;
						case "shibari ropes":
							t += `${His} big gut jiggles lewdly between ${his} tight cords.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} big gut has no room to move under ${his} tight latex.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a confederate army uniform":
							t += `The buttons on ${his} straining jacket struggle to hold back ${his} big jiggling gut.`;
							break;
						case "a long qipao":
							t += `${His} stretched qipao shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "battlearmor":
							t += `${His} taut armor shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "Imperial Plate":
							t += `${His} ultra-heavy armor isn't quite massive enough to hide the jiggle of ${his} big gut.`;
							break;
						case "a mounty outfit":
							t += `The buttons on ${his} straining jacket struggle to hold back ${his} big jiggling gut.`;
							break;
						case "a dirndl":
							t += `${His} stretched dirndl shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "lederhosen":
							t += `The buttons on ${his} straining shorts struggle to hold back ${his} big jiggling gut.`;
							break;
						case "a biyelgee costume":
							t += `${His} stretched costume shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a nice nurse outfit":
							t += `${His} scrub top jiggles along with ${his} big gut as ${he} moves.`;
							break;
						case "a mini dress":
							t += `${His} stretched minidress shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a monokini":
							t += `${His} big gut stretches out the fabric of ${his} monokini.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s giant breasts push out ${his} overalls so far that ${his} big fat belly is left uncovered.`;
							} else {
								t += `${slave.slaveName}'s big fat belly spills out from behind ${his} overalls.`;
							}
							break;
						case "an apron":
							t += `As ${he} moves, ${his} apron jostles just as ${his} big gut jiggles.`;
							break;
						case "a cybersuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} big gut, jiggling as ${he} moves.`;
							break;
						case "a slutty maid outfit":
							t += `${His} big gut is barely covered by a thin white blouse that happily jiggles along with every motion.`;
							break;
						case "a nice maid outfit":
							t += `As ${he} moves, a slight jiggle can be seen within ${his} maid's dress.`;
							break;
						case "a penitent nuns habit":
							t += `${His} habit does nothing to stop ${his} big gut from jiggling against the coarse cloth as ${he} moves.`;
							break;
						case "clubslut netting":
							t += `${His} clubslut netting jiggles lewdly along with ${his} big gut as ${he} moves.`;
							break;
						case "a cheerleader outfit":
							t += `${His} big gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
							break;
						case "a slave gown":
							t += `${His} big jiggly gut is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `Noticeable jiggling from ${his} big gut can be seen under ${his} jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and big, jiggly gut makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a schoolgirl outfit":
							t += `${His} big gut is partially covered by ${his} blouse, which happily jiggles along with every motion.`;
							break;
						case "a kimono":
							t += `Noticeable jiggling can be seen through ${his} kimono whenever ${he} moves.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `Noticeable jiggling can be seen through ${his} abaya whenever ${he} moves.`;
							break;
						case "a klan robe":
							t += `A small amount of jiggling can be seen through ${his} robe whenever ${he} moves.`;
							break;
						case "a burqa":
							t += `A small amount of jiggling can be seen through ${his} burqa whenever ${he} moves.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} jiggling belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `A small amount of jiggling can be seen through ${his} shirt whenever ${he} moves.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `A small amount of jiggling can be seen through ${his} tank-top whenever ${he} moves.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `A small amount of jiggling can be seen through ${his} sweater whenever ${he} moves.`;
							break;
						case "a gothic lolita dress":
							t += `A small amount of jiggling can be seen through ${his} dress whenever ${he} moves.`;
							break;
						case "a hanbok":
							t += `A small amount of jiggling can be seen through ${his} hanbok whenever ${he} moves.`;
							break;
						case "a one-piece swimsuit":
							t += `A small amount of jiggling can be seen through ${his} swimsuit whenever ${he} moves.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `A small amount of jiggling can be seen through ${his} leather outfit whenever ${he} moves.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to the shape of ${his} big, jiggling gut.`;
							break;
						case "a hijab and blouse":
							t += `${His} big gut can often be seen jiggling beneath ${his} skirt and blouse when ${he} moves.`;
							break;
						case "a halter top dress":
							t += `${His} stretched halter top dress shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "an evening dress":
							t += `${His} stretched evening dress shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} big gut by ${his} fabulous silken ball gown.`;
							break;
						case "a leotard":
							t += `The taut material of ${his} leotard shows every jiggle in ${his} big gut as ${he} moves.`;
							break;
						case "a bunny outfit":
							t += `${He} is a sight in ${his} bunny outfit. ${His} teddy not only controls ${his} big gut, but draws your gaze right to it.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} big gut is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress bulges with ${his} big gut.`;
							break;
						case "a courtesan dress":
							t += `${His} many folds jiggle beneath the thin cloth with ${his} movements.`;
							break;
						default:
							t += `${His} big bare jiggling gut catches your eye.`;
					}
				} else if (slave.bellyImplant >= 4000) {
					switch (slave.clothes) {
						case "conservative clothing":
							t += `${His} taut blouse shows off ${his} big belly.`;
							break;
						case "chains":
							t += `${His} big belly bulges between ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} big belly.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} big belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} big belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} big belly looks like a beach ball under ${his} tight latex; ${his} popped navel breaks the smoothness.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a confederate army uniform":
							t += `${His} big belly strains the buttons on ${his} jacket.`;
							break;
						case "a long qipao":
							t += `The front of ${his} qipao rests atop ${his} big belly.`;
							break;
						case "battlearmor":
							t += `${His} taut armor shows off ${his} big belly.`;
							break;
						case "Imperial Plate":
							t += `${His} big belly slightly swells the front of ${his} ultra-heavy armor.`;
							break;
						case "a mounty outfit":
							t += `${His} big belly threatens to pop the buttons off ${his} tunic.`;
							break;
						case "a dirndl":
							t += `${His} loose dress is completely filled by ${his} big belly.`;
							break;
						case "lederhosen":
							t += `${His} big belly threatens to pop the buttons off ${his} shorts.`;
							break;
						case "a biyelgee costume":
							t += `${His} loose dress is completely filled by ${his} big belly.`;
							break;
						case "a nice nurse outfit":
							t += `${His} large belly strains against ${his} scrub top, making ${him} resemble more a maternity ward patient than a nurse.`;
							break;
						case "a mini dress":
							t += `${His} large belly strains against ${his} mini dress.`;
							break;
						case "a monokini":
							t += `${His} monokini is rounded out by ${his} large belly.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s huge breasts push out ${his} overalls so far that ${his} implant-filled belly is left uncovered.`;
							} else {
								t += `${slave.slaveName}'s overalls are significantly curved by ${his} implant-filled belly.`;
							}
							break;
						case "an apron":
							t += `${His} apron is rounded out by ${his} large belly.`;
							break;
						case "a cybersuit":
							t += `${His} big belly stretches ${his} bodysuit.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} big belly.`;
							break;
						case "a slutty maid outfit":
							t += `${His} big belly is partially covered by a thin white blouse.`;
							break;
						case "a nice maid outfit":
							t += `${His} big belly strains ${his} maid outfit; ${his} popped navel is visible under ${his} apron.`;
							break;
						case "a penitent nuns habit":
							t += `${His} big belly bulges ${his} habit; it looks absolutely sinful.`;
							break;
						case "clubslut netting":
							t += `${His} big belly strains ${his} clubslut netting.`;
							break;
						case "a cheerleader outfit":
							t += `${His} big belly is partly covered by ${his} cheerleader's top.`;
							break;
						case "a halter top dress":
							t += `${His} big belly fills out ${his} halter top dress.`;
							break;
						case "an evening dress":
							t += `${His} big belly fills out ${his} evening dress.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} big belly by ${his} fabulous silken ball gown.`;
							break;
						case "a slave gown":
							t += `${His} big belly is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `${His} big belly strains the buttons on ${his} jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and big belly makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} big belly fills ${his} bodysuit.`;
							break;
						case "a schoolgirl outfit":
							t += `${His} big belly is only partly covered by ${his} blouse.`;
							break;
						case "a kimono":
							t += `${His} kimono demurely covers ${his} big belly.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} big belly tents ${his} abaya.`;
							break;
						case "a klan robe":
							t += `${His} big belly gently pushes against ${his} robe.`;
							break;
						case "a burqa":
							t += `${His} big belly gently pushes against ${his} burqa.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} big belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} big belly gently pushes out ${his} shirt.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} big belly gently pushes out ${his} tank-top.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} big belly gently pushes out ${his} sweater.`;
							break;
						case "a gothic lolita dress":
							t += `${His} big belly gently pushes out ${his} dress.`;
							break;
						case "a hanbok":
							t += `${His} big belly gently pushes out ${his} hanbok.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} big belly gently pushes out ${his} swimsuit.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} big belly gently pushes against ${his} leather outfit.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to ${his} big belly.`;
							break;
						case "a hijab and blouse":
							t += `${He} has trouble pulling ${his} skirt up over ${his} big belly.`;
							break;
						case "a leotard":
							t += `${His} big belly stretches ${his} leotard.`;
							break;
						case "a chattel habit":
							t += `${His} big belly shoves the strip of cloth on ${his} front to ${his} side.`;
							break;
						case "a bunny outfit":
							t += `${His} big belly is strains ${his} teddy, the seams along the side are showing signs of wear.`;
							break;
						case "a toga":
							t += `${His} loose fitted toga leaves plenty of space for ${his} swollen belly.`;
							break;
						case "a huipil":
							t += `${His} pregnant belly is so big that the huipil won't even reach ${his} protruding navel.`;
							break;
						case "a courtesan dress":
							t += `${His} big belly sways gracefully with ${his} movements.`;
							break;
						default:
							t += `${His} bare belly catches your eye.`;
					}
				} else if (slave.weight >= 95) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
							break;
						case "conservative clothing":
							t += `${His} taut blouse shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "chains":
							t += `${His} fat gut jiggles lewdly between ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop, and jiggles with, ${his} fat gut as ${he} moves.`;
							break;
						case "uncomfortable straps":
							t += `${His} fat gut jiggles lewdly between ${his} tight straps.`;
							break;
						case "shibari ropes":
							t += `${His} fat gut jiggles lewdly between the binding ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} fat gut barely has any room to move under ${his} tight latex.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
						case "a mounty outfit":
						case "a confederate army uniform":
							t += `The buttons on ${his} straining jacket can barely hold back ${his} fat, jiggling gut.`;
							break;
						case "a long qipao":
							t += `${His} stretched qipao shows every jiggle in ${his} fat, jiggling gut as ${he} moves.`;
							break;
						case "battlearmor":
							t += `${His} taut armor shows every jiggle in ${his} fat, jiggling gut as ${he} moves.`;
							break;
						case "Imperial Plate":
							t += `${His} ultra-heavy armor isn't quite massive enough to hide the jiggle of ${his} big gut.`;
							break;
						case "a dirndl":
							t += `${His} stretched dirndl shows every jiggle in ${his} fat, jiggling gut as ${he} moves.`;
							break;
						case "lederhosen":
							t += `The buttons on ${his} straining shorts struggle to hold back ${his} fat, jiggling gut.`;
							break;
						case "a biyelgee costume":
							t += `${His} stretched costume shows every jiggle in ${his} fat, jiggling gut as ${he} moves.`;
							break;
						case "a nice nurse outfit":
							t += `${His} scrub top jiggles along with ${his} fat gut as ${he} moves.`;
							break;
						case "a mini dress":
							t += `${His} stretched minidress shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a monokini":
							t += `${His} monokini clings to the size and shape of ${his} fat gut.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} fat belly is left uncovered.`;
							} else {
								t += `${slave.slaveName}'s fat belly bulges out from over the sides of ${his} overalls.`;
							}
							break;
						case "an apron":
							t += `${His} apron provides some covering to the jiggling of ${his} fat gut.`;
							break;
						case "a cybersuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} fat gut, jiggling as ${he} moves.`;
							break;
						case "a slutty maid outfit":
							t += `${His} fat gut is partially covered by a thin white blouse, that happily jiggles along with every motion.`;
							break;
						case "a nice maid outfit":
							t += `As ${he} moves, a slight jiggle can be seen within ${his} maid's dress.`;
							break;
						case "a penitent nuns habit":
							t += `${His} habit does nothing to stop ${his} fat gut from jiggling against the coarse cloth as ${he} moves.`;
							break;
						case "clubslut netting":
							t += `${His} clubslut netting jiggles lewdly along with ${his} fat gut as ${he} moves.`;
							break;
						case "a cheerleader outfit":
							t += `${His} fat gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
							break;
						case "a halter top dress":
							t += `${His} stretched halter top dress shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "an evening dress":
							t += `${His} stretched evening dress shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} fat gut by ${his} fabulous silken ball gown.`;
							break;
						case "a slave gown":
							t += `${His} fat, jiggly gut is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `Slight jiggling from ${his} fat gut can be seen under ${his} jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and fat, jiggly gut makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `The taut material of ${his} bodysuit shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a schoolgirl outfit":
							t += `${His} fat gut is partially covered by ${his} blouse, which happily jiggles along with every motion.`;
							break;
						case "a kimono":
							t += `Slight jiggling can be seen through ${his} kimono whenever ${he} moves.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `Slight jiggling can be seen through ${his} abaya whenever ${he} moves.`;
							break;
						case "a klan robe":
							t += `${His} robe hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a burqa":
							t += `${His} burqa hides the jiggling motion of ${his} fat gut.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} jiggling belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `Jiggling flesh can barely be seen through ${his} shirt whenever ${he} moves.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `Jiggling flesh can barely be seen through ${his} tank-top whenever ${he} moves.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `Jiggling flesh can barely be seen through ${his} sweater whenever ${he} moves.`;
							break;
						case "a gothic lolita dress":
							t += `Jiggling flesh can barely be seen through ${his} dress whenever ${he} moves.`;
							break;
						case "a hanbok":
							t += `Jiggling flesh can barely be seen through ${his} hanbok whenever ${he} moves.`;
							break;
						case "a one-piece swimsuit":
							t += `Jiggling flesh can barely be seen through ${his} swimsuit whenever ${he} moves.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `Jiggling flesh can barely be seen through ${his} leather outfit whenever ${he} moves.`;
							break;
						case "a burkini":
							t += `${His} burkini clings to the shape of ${his} fat gut.`;
							break;
						case "a hijab and blouse":
							t += `${His} modest skirt and blouse bulge from the size of ${his} fat gut.`;
							break;
						case "a leotard":
							t += `The taut material of ${his} leotard shows every jiggle in ${his} fat gut as ${he} moves.`;
							break;
						case "a chattel habit":
							t += `${His} fat gut jiggles around the strip of cloth down ${his} front as ${he} moves.`;
							break;
						case "a bunny outfit":
							t += `${He} is a sight in ${his} bunny outfit. The front of ${his} fat gut is held still by ${his} teddy, but everything else of it jiggles obscenely with ${his} every motion.`;
							break;
						case "a toga":
							t += `${His} toga swerves loosely from side to side as ${his} chubby body moves inside it.`;
							break;
						case "a huipil":
							t += `${His} lithe huipil can't hide ${his} voluptuous shape unless ${he} stands completely still.`;
							break;
						case "a courtesan dress":
							t += `${His} gut jiggles beneath the thin cloth of ${his} dress.`;
							break;
						default:
							t += `${His} bare, jiggling, fat gut catches your eye.`;
					}
				} else if (slave.bellyImplant >= 2000) {
					switch (slave.clothes) {
						case "a Fuckdoll suit":
							t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
							break;
						case "conservative clothing":
							t += `${His} blouse bulges with ${his} distended belly.`;
							break;
						case "chains":
							t += `${His} distended belly bulges between ${his} tight chains.`;
							break;
						case "a slutty qipao":
							t += `The front of ${his} qipao rests atop ${his} distended belly.`;
							break;
						case "a long qipao":
							t += `The front of ${his} qipao rests atop ${his} distended belly.`;
							break;
						case "battlearmor":
							t += `The front of ${his} armor rests atop ${his} distended belly.`;
							break;
						case "Imperial Plate":
							t += `The front of ${his} armor rests atop ${his} distended belly.`;
							break;
						case "a mounty outfit":
							t += `The front of ${his} tunic rests atop ${his} distended belly.`;
							break;
						case "a dirndl":
							t += `The front of ${his} dirndl rests atop ${his} distended belly.`;
							break;
						case "lederhosen":
							t += `The front of ${his} suspenders rests aside ${his} distended belly.`;
							break;
						case "a biyelgee costume":
							t += `The front of ${his} costume rests atop ${his} distended belly.`;
							break;
						case "uncomfortable straps":
							t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} distended belly bulges around them.`;
							break;
						case "shibari ropes":
							t += `${His} distended belly bulges out from between ${his} ropes.`;
							break;
						case "a latex catsuit":
						case "restrictive latex":
							t += `${His} distended belly bulges beneath ${his} tight latex.`;
							break;
						case "a military uniform":
						case "a schutzstaffel uniform":
						case "a slutty schutzstaffel uniform":
						case "a red army uniform":
							t += `${His} distended belly bulges ${his} uniform tunic.`;
							break;
						case "a confederate army uniform":
							t += `${His} distended belly bulges ${his} military jacket.`;
							break;
						case "a nice nurse outfit":
							t += `${His} distended belly is clearly visible through ${his} scrub top.`;
							break;
						case "a mini dress":
							t += `${His} distended belly bulges ${his} tight mini dress.`;
							break;
						case "a monokini":
							t += `${His} monokini bulges from ${his} distended belly.`;
							break;
						case "overalls":
							if (slave.boobs > (slave.belly + 250)) {
								t += `${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} implant-rounded belly is left uncovered.`;
							} else {
								t += `${slave.slaveName}'s implant-rounded belly rounds out the front of ${his} overalls.`;
							}
							break;
						case "an apron":
							t += `${His} apron is rounded out by ${his} distended belly.`;
							break;
						case "a cybersuit":
							t += `${His} distended belly fills ${his} bodysuit.`;
							break;
						case "a tight Imperial bodysuit":
							t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} distended belly.`;
							break;
						case "a slutty maid outfit":
							t += `${His} distended belly bulges ${his} thin white blouse.`;
							break;
						case "a nice maid outfit":
							t += `${His} distended belly is concealed by ${his} maid outfit.`;
							break;
						case "a penitent nuns habit":
							t += `${His} distended belly bulges ${his} habit.`;
							break;
						case "attractive lingerie for a pregnant woman":
							t += `${His} distended belly is gently framed by ${his} silken vest.`;
							break;
						case "a maternity dress":
							t += `${His} loose dress conceals ${his} distended belly.`;
							break;
						case "clubslut netting":
							t += `${His} distended belly fills out ${his} clubslut netting.`;
							break;
						case "a cheerleader outfit":
							t += `${His} distended belly peeks out from under ${his} cheerleader's top.`;
							break;
						case "a halter top dress":
							t += `${His} distended belly bulges ${his} halter top dress.`;
							break;
						case "an evening dress":
							t += `${His} distended belly bulges ${his} evening dress.`;
							break;
						case "a ball gown":
							t += `Your gaze is drawn to ${his} distended belly by ${his} fabulous silken ball gown.`;
							break;
						case "a slave gown":
							t += `${His} distended belly is gently caressed by ${his} gown.`;
							break;
						case "nice business attire":
							t += `${His} distended belly bulges ${his} suit jacket.`;
							break;
						case "harem gauze":
							t += `${His} silken garb and distended belly makes ${him} look like a belly dancer.`;
							break;
						case "a comfortable bodysuit":
							t += `${His} distended belly fills ${his} bodysuit.`;
							break;
						case "a schoolgirl outfit":
							t += `${His} distended belly peeks out from under ${his} blouse.`;
							break;
						case "a kimono":
							t += `${His} kimono demurely covers ${his} distended belly.`;
							break;
						case "a hijab and abaya":
						case "a niqab and abaya":
							t += `${His} distended belly gently tents ${his} abaya.`;
							break;
						case "a klan robe":
							t += `${His} robe totally conceals ${his} distended belly.`;
							break;
						case "a burqa":
							t += `${His} burqa totally conceals ${his} distended belly.`;
							break;
						case "a bra":
						case "a skimpy loincloth":
						case "a slutty klan robe":
						case "a sports bra":
						case "a striped bra":
						case "a thong":
						case "a tube top":
						case "a tube top and thong":
						case "boyshorts":
						case "cutoffs":
						case "jeans":
						case "leather pants":
						case "leather pants and a tube top":
						case "leather pants and pasties":
						case "panties":
						case "panties and pasties":
						case "pasties":
						case "sport shorts":
						case "sport shorts and a sports bra":
						case "striped underwear":
							t += `${His} distended belly is totally bare.`;
							break;
						case "a button-up shirt and panties":
						case "a button-up shirt":
						case "a police uniform":
						case "a t-shirt":
						case "a t-shirt and jeans":
						case "a t-shirt and panties":
						case "a t-shirt and thong":
						case "an oversized t-shirt":
						case "an oversized t-shirt and boyshorts":
						case "sport shorts and a t-shirt":
							t += `${His} shirt totally conceals ${his} distended belly.`;
							break;
						case "a tank-top":
						case "a tank-top and panties":
							t += `${His} tank-top totally conceals ${his} distended belly.`;
							break;
						case "a sweater":
						case "a sweater and panties":
						case "a sweater and cutoffs":
							t += `${His} sweater totally conceals ${his} distended belly.`;
							break;
						case "a gothic lolita dress":
							t += `${His} dress totally conceals ${his} distended belly.`;
							break;
						case "a hanbok":
							t += `${His} hanbok totally conceals ${his} distended belly.`;
							break;
						case "a one-piece swimsuit":
							t += `${His} swimsuit totally conceals ${his} distended belly.`;
							break;
						case "a nice pony outfit":
						case "a slutty pony outfit":
							t += `${His} leather outfit totally conceals ${his} distended belly.`;
							break;
						case "a burkini":
							t += `${His} distended belly gently rounds ${his} burkini.`;
							break;
						case "a hijab and blouse":
							t += `${His} distended belly gently rounds ${his} blouse and skirt.`;
							break;
						case "a leotard":
							t += `${His} distended belly fills ${his} leotard.`;
							break;
						case "a chattel habit":
							t += `${His} distended belly shows under the strip of cloth on ${his} front.`;
							break;
						case "a bunny outfit":
							t += `${His} distended belly fills ${his} teddy.`;
							break;
						case "a toga":
							t += `${His} toga is so loose that you can barely notice ${his} growing belly.`;
							break;
						case "a huipil":
							t += `${His} distended belly can be seen from the sides of ${his} huipil.`;
							break;
						case "a courtesan dress":
							t += `${His} distended belly fills out ${his} dress.`;
							break;
						default:
							t += `${His} slightly rounded belly catches your eye.`;
					}
				}
			}
		} else { /* inflation descriptions */
			if (slave.weight > 190) {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						t += `${His} massive gut is alluringly smooth under the tight suit.`;
						break;
					case "conservative clothing":
						t += `${His} conservative clothing stands no chance of stilling ${his} massive, jiggling gut.`;
						break;
					case "chains":
						t += `${His} massive gut jiggles lewdly around ${his} tight chains.`;
						break;
					case "a slutty qipao":
						t += `The front of ${his} qipao rests atop ${his} massive gut.`;
						break;
					case "uncomfortable straps":
						t += `${His} massive gut jiggles lewdly around ${his} tight straps.`;
						break;
					case "shibari ropes":
						t += `${His} massive gut jiggles lewdly around ${his} tight cords.`;
						break;
					case "a latex catsuit":
					case "restrictive latex":
						t += `${His} massive gut resembles a large beachball under ${his} tight latex.`;
						break;
					case "a nice nurse outfit":
						t += `${His} scrub top jiggles along with ${his} massive gut as ${he} moves.`;
						break;
					case "a mini dress":
						t += `${His} tearing minidress shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a monokini":
						t += `${His} massive gut spills out from the top of ${his} monokini as ${he} moves.`;
						break;
					case "overalls":
						if (slave.boobs > (slave.belly + 250)) {
							t += `${slave.slaveName}'s enormous breasts push out ${his} overalls so far that ${his} massively fat belly is left mostly uncovered.`;
						} else {
							t += `${slave.slaveName}'s massively fat belly spills out over the sides of ${his} overalls.`;
						}
						break;
					case "an apron":
						t += `${His} apron rests upon ${his} massive gut, which jiggles as ${he} moves.`;
						break;
					case "a cybersuit":
						t += `The taut material of ${his} bodysuit shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a tight Imperial bodysuit":
						t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} massive gut, jiggling as ${he} moves.`;
						break;
					case "a nice maid outfit":
						t += `As ${he} moves, barely any jiggling can be seen within ${his} straining maid's dress.`;
						break;
					case "a penitent nuns habit":
						t += `${His} habit does nothing to stop ${his} massive gut from jiggling against the coarse cloth as ${he} moves.`;
						break;
					case "clubslut netting":
						t += `${His} clubslut netting jiggles lewdly along with ${his} massive gut as ${he} moves. Every so often, another section gives out allowing a roll of fat to spring free; it's quite entertaining to watch.`;
						break;
					case "a cheerleader outfit":
						t += `${His} massive gut jiggles its own cheer with ${his} every motion.`;
						break;
					case "a slave gown":
						t += `${His} massive jiggly gut is gently caressed by ${his} gown.`;
						break;
					case "harem gauze":
						t += `${His} silken garb and massive, jiggly gut makes ${him} look like a belly dancer.`;
						break;
					case "a comfortable bodysuit":
						t += `The taut material of ${his} bodysuit shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a schoolgirl outfit":
						t += `The school blimp is jiggling by and ripe for abuse with ${his} ill-fitting clothes.`;
						break;
					case "a kimono":
						t += `${His} massive gut threatens to pop out of ${his} kimono with every motion.`;
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						t += `${His} massive gut has no room left to move within ${his} overstuffed abaya.`;
						break;
					case "a klan robe":
						t += `${His} massive gut has no room left to move within ${his} overstuffed robe.`;
						break;
					case "a burqa":
						t += `${His} massive gut has no room left to move within ${his} overstuffed burqa.`;
						break;
					case "a bra":
					case "a skimpy loincloth":
					case "a slutty klan robe":
					case "a sports bra":
					case "a striped bra":
					case "a thong":
					case "a tube top":
					case "a tube top and thong":
					case "boyshorts":
					case "cutoffs":
					case "jeans":
					case "leather pants":
					case "leather pants and a tube top":
					case "leather pants and pasties":
					case "panties":
					case "panties and pasties":
					case "pasties":
					case "sport shorts":
					case "sport shorts and a sports bra":
					case "striped underwear":
						t += `${His} massive jiggling gut is totally bare.`;
						break;
					case "a button-up shirt and panties":
					case "a button-up shirt":
					case "a police uniform":
					case "a t-shirt":
					case "a t-shirt and jeans":
					case "a t-shirt and panties":
					case "a t-shirt and thong":
					case "an oversized t-shirt":
					case "an oversized t-shirt and boyshorts":
					case "sport shorts and a t-shirt":
						t += `The taut material of ${his} shirt shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a tank-top":
					case "a tank-top and panties":
						t += `The taut material of ${his} tank-top shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a sweater":
					case "a sweater and panties":
					case "a sweater and cutoffs":
						t += `The taut material of ${his} sweater shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a gothic lolita dress":
						t += `The taut material of ${his} dress shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a hanbok":
						t += `The taut material of ${his} hanbok shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a one-piece swimsuit":
						t += `The taut material of ${his} swimsuit shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a nice pony outfit":
					case "a slutty pony outfit":
						t += `The taut material of ${his} leather outfit shows every jiggle in ${his} massive gut as ${he} moves.`;
						break;
					case "a burkini":
						t += `${His} burkini clings to the folds and rolls of ${his} massive gut.`;
						break;
					case "a hijab and blouse":
						t += `${His} massive gut spills out over the top of ${his} skirt.`;
						break;
					case "a halter top dress":
						t += `${His} strained halter top dress shows every jiggle in ${his} massive gut as ${he} moves. Every little motion threatens to burst ${his} seams and free the soft mass to the world.`;
						break;
					case "an evening dress":
						t += `Your gaze is drawn to ${his} massive gut by ${his} sensual evening dress. Every little motion has a chance for it to pop out and jiggle free for all to see clearly.`;
						break;
					case "a ball gown":
						t += `Your gaze is drawn to ${his} massive gut by ${his} fabulous silken ball gown. Every little motion has a chance for it to pop out and jiggle free for all to see clearly.`;
						break;
					case "a leotard":
						t += `The taut material of ${his} leotard shows every jiggle in ${his} massive gut as ${he} moves. A pair of small ridges adorn ${his} sides where they have managed to push through the leotard's failing seams.`;
						break;
					case "a bunny outfit":
						t += `${He} is a sight in ${his} bunny outfit. The front of ${his} massive gut is held still by ${his} overworked teddy, but everything else of it jiggles obscenely with ${his} every motion.`;
						break;
					case "attractive lingerie for a pregnant woman":
						t += `${His} massive gut is gently framed by ${his} silken vest.`;
						break;
					case "a maternity dress":
						t += `${His} once loose dress bulges with ${his} massive gut.`;
						break;
					case "a courtesan dress":
						t += `${His} massive gut jiggles beneath the thin cloth as ${he} moves.`;
						break;
					default:
						t += `${His} massive bare jiggling gut catches your eye.`;
				}
			} else if (slave.inflation === 3) {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
						break;
					case "conservative clothing":
						t += `${His} taut blouse shows off ${his} taut, sloshing belly.`;
						break;
					case "attractive lingerie for a pregnant woman":
						t += `${His} taut, sloshing belly is gently framed by ${his} silken vest.`;
						break;
					case "a maternity dress":
						t += `${His} loose dress is completely filled by ${his} taut, sloshing belly.`;
						break;
					case "chains":
						t += `${His} taut, sloshing belly bulges between ${his} tight chains.`;
						break;
					case "a slutty qipao":
						t += `The front of ${his} qipao rests atop ${his} taut, sloshing belly.`;
						break;
					case "uncomfortable straps":
						t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} taut, sloshing belly bulges around them.`;
						break;
					case "shibari ropes":
						t += `${His} taut, sloshing belly bulges out from between ${his} ropes.`;
						break;
					case "a latex catsuit":
					case "restrictive latex":
						t += `${His} taut, sloshing belly looks like a large beach ball under ${his} tight latex; ${his} popped navel breaks the smoothness.`;
						break;
					case "a military uniform":
					case "a schutzstaffel uniform":
					case "a slutty schutzstaffel uniform":
					case "a red army uniform":
					case "a mounty outfit":
						t += `${His} taut, sloshing belly threatens to pop the buttons off ${his} tunic. ${His} belly bulges out between them.`;
						break;
					case "a confederate army uniform":
						t += `${His} taut, sloshing belly threatens to pop the buttons off ${his} jacket. ${His} belly bulges out between them.`;
						break;
					case "a long qipao":
						t += `${His} dress is completely filled by ${his} taut, sloshing belly.`;
						break;
					case "battlearmor":
						t += `${His} taut, sloshing belly is tightly framed by ${his} armor.`;
						break;
					case "Imperial Plate":
						t += `${His} ultra-heavy armor is slightly swollen by ${his} taut, sloshing belly.`;
						break;
					case "a dirndl":
						t += `${His} loose dress is completely filled by ${his} taut, sloshing belly.`;
						break;
					case "lederhosen":
						t += `${His} taut, sloshing belly threatens to pop the buttons off ${his} shorts. ${His} belly bulges out above them.`;
						break;
					case "a biyelgee costume":
						t += `${His} loose dress is completely filled by ${his} taut, sloshing belly.`;
						break;
					case "a nice nurse outfit":
						t += `${His} taut, sloshing belly strains against ${his} scrub top, making ${him} resemble more a maternity ward patient than a nurse.`;
						break;
					case "a mini dress":
						t += `${His} taut, sloshing belly threatens to tear apart ${his} mini dress.`;
						break;
					case "a slutty maid outfit":
						t += `${His} taut, sloshing belly is partially covered by a thin white blouse.`;
						break;
					case "a nice maid outfit":
						t += `${His} taut, sloshing belly threatens to tear ${his} maid outfit open; ${his} popped navel is visible under ${his} apron.`;
						break;
					case "a penitent nuns habit":
						t += `${His} taut, sloshing belly bulges ${his} habit; it looks absolutely sinful.`;
						break;
					case "clubslut netting":
						t += `${His} taut, sloshing belly threatens to tear apart ${his} clubslut netting. ${His} belly bulges obscenely through the mesh.`;
						break;
					case "a cheerleader outfit":
						t += `${His} taut, sloshing belly is partly covered by ${his} cheerleader's top.`;
						break;
					case "a halter top dress":
						t += `${His} taut, sloshing belly fills out ${his} halter top dress, the seams straining to contain it. ${His} belly bulges between the gaps.`;
						break;
					case "an evening dress":
						t += `Your gaze is drawn to ${his} taut, sloshing belly by ${his} sensual evening dress.`;
						break;
					case "a ball gown":
						t += `Your gaze is drawn to ${his} taut, sloshing belly by ${his} fabulous silken ball gown.`;
						break;
					case "a slave gown":
						t += `${His} taut, sloshing belly is gently caressed by ${his} gown.`;
						break;
					case "nice business attire":
						t += `${His} taut, sloshing belly threatens to pop the buttons off ${his} jacket. ${His} belly bulges between the buttons.`;
						break;
					case "harem gauze":
						t += `${His} silken garb and taut, sloshing belly makes ${him} look like a belly dancer. That'd be a show.`;
						break;
					case "a comfortable bodysuit":
						t += `${His} taut, sloshing belly lewdly fills ${his} bodysuit. The form fitting material jiggling obscenely with ${his} body's contents.`;
						break;
					case "a schoolgirl outfit":
						t += `${His} taut, sloshing belly is only partly covered by ${his} blouse.`;
						break;
					case "a kimono":
						t += `${His} kimono demurely covers the sides of ${his} taut, sloshing belly.`;
						break;
					case "a monokini":
						t += `${His} monokini fails to fully cover ${his} taut, sloshing belly.`;
						break;
					case "overalls":
						if (slave.boobs > (slave.belly + 250)) {
							t += `${slave.slaveName}'s massive breasts push out ${his} overalls so far that ${his} hugely swollen belly is left almost entirely uncovered.`;
						} else {
							t += `${slave.slaveName}'s hugely swollen belly stretches out the fabric of ${his} overalls.`;
						}
						break;
					case "an apron":
						t += `${His} apron struggles to wrap around ${his} taut, sloshing belly.`;
						break;
					case "a cybersuit":
						t += `${His} taut, sloshing belly lewdly stretches ${his} bodysuit. The form fitting material jiggling obscenely with ${his} body's contents.`;
						break;
					case "a tight Imperial bodysuit":
						t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} taut, sloshing belly, jiggling obscenely with ${his} body's content as ${he} moves.`;
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						t += `${His} taut, sloshing belly tents ${his} abaya.`;
						break;
					case "a klan robe":
						t += `${His} taut, sloshing belly pushes against ${his} robe.`;
						break;
					case "a burqa":
						t += `${His} taut, sloshing belly pushes against ${his} burqa.`;
						break;
					case "a bra":
					case "a skimpy loincloth":
					case "a slutty klan robe":
					case "a sports bra":
					case "a striped bra":
					case "a thong":
					case "a tube top":
					case "a tube top and thong":
					case "boyshorts":
					case "cutoffs":
					case "jeans":
					case "leather pants":
					case "leather pants and a tube top":
					case "leather pants and pasties":
					case "panties":
					case "panties and pasties":
					case "pasties":
					case "sport shorts":
					case "sport shorts and a sports bra":
					case "striped underwear":
						t += `${His} taut sloshing belly is totally bare.`;
						break;
					case "a button-up shirt and panties":
					case "a button-up shirt":
					case "a police uniform":
					case "a t-shirt":
					case "a t-shirt and jeans":
					case "a t-shirt and panties":
					case "a t-shirt and thong":
					case "an oversized t-shirt":
					case "an oversized t-shirt and boyshorts":
					case "sport shorts and a t-shirt":
						t += `${His} taut, sloshing belly pushes against ${his} shirt.`;
						break;
					case "a tank-top":
					case "a tank-top and panties":
						t += `${His} taut, sloshing belly pushes against ${his} tank-top.`;
						break;
					case "a sweater":
					case "a sweater and panties":
					case "a sweater and cutoffs":
						t += `${His} taut, sloshing belly pushes against ${his} sweater.`;
						break;
					case "a gothic lolita dress":
						t += `${His} taut, sloshing belly pushes against ${his} dress.`;
						break;
					case "a hanbok":
						t += `${His} taut, sloshing belly pushes against ${his} hanbok.`;
						break;
					case "a one-piece swimsuit":
						t += `${His} taut, sloshing belly pushes against ${his} swimsuit.`;
						break;
					case "a nice pony outfit":
					case "a slutty pony outfit":
						t += `${His} taut, sloshing belly pushes against ${his} leather outfit.`;
						break;
					case "a burkini":
						t += `${His} burkini strains to cover ${his} taut, sloshing belly.`;
						break;
					case "a hijab and blouse":
						t += `${His} light shirts are significantly stretched out to cover ${his} taut, sloshing belly.`;
						break;
					case "a leotard":
						t += `${His} taut, sloshing belly lewdly stretches ${his} leotard. The form fitting material jiggling obscenely with ${his} body's contents.`;
						break;
					case "a chattel habit":
						t += `${His} taut, sloshing belly shoves the strip of cloth on ${his} front to ${his} side.`;
						break;
					case "a bunny outfit":
						t += `${His} taut, sloshing belly is threatening to tear ${his} teddy, the seams along the side are already splitting. ${His} belly is bulging out the gaps.`;
						break;
					case "a toga":
						t += `${His} loose fitted toga leaves plenty of space for ${his} taut, sloshing belly.`;
						break;
					case "a huipil":
						t += `${His} taut, sloshing belly is so huge that the huipil doesn't even come close to covering it.`;
						break;
					case "a courtesan dress":
						t += `${His} taut, sloshing belly fills out ${his} dress.`;
						break;
					default:
						t += `${His} bare, taut, sloshing belly catches your eye.`;
				}
			} else if (slave.weight > 160) {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						t += `${His} giant gut is alluringly smooth under the tight suit.`;
						break;
					case "conservative clothing":
						t += `${His} conservative clothing stands no chance of stilling ${his} giant, jiggling gut.`;
						break;
					case "chains":
						t += `${His} giant gut jiggles lewdly around ${his} tight chains.`;
						break;
					case "a slutty qipao":
						t += `The front of ${his} qipao rests atop ${his} giant gut.`;
						break;
					case "uncomfortable straps":
						t += `${His} giant gut jiggles lewdly around ${his} tight straps.`;
						break;
					case "shibari ropes":
						t += `${His} giant gut jiggles lewdly around ${his} tight cords.`;
						break;
					case "a latex catsuit":
					case "restrictive latex":
						t += `${His} giant gut resembles a beachball under ${his} tight latex.`;
						break;
					case "a military uniform":
					case "a schutzstaffel uniform":
					case "a slutty schutzstaffel uniform":
					case "a red army uniform":
					case "a confederate army uniform":
						t += `The buttons on ${his} straining jacket threaten to pop off with every motion of ${his} giant jiggling gut.`;
						break;
					case "a long qipao":
						t += `${His} dress is completely filled by ${his} giant jiggling gut.`;
						break;
					case "battlearmor":
						t += `${His} giant jiggling gut is tightly framed by ${his} armor.`;
						break;
					case "Imperial Plate":
						t += `${His} ultra-heavy armor is tightly framed by ${his} taut, sloshing belly.`;
						break;
					case "a mounty outfit":
						t += `${His} giant jiggling gut threatens to pop the buttons off ${his} tunic. ${His} belly bulges out between them.`;
						break;
					case "a dirndl":
						t += `${His} loose dress is completely filled by ${his} giant jiggling gut.`;
						break;
					case "lederhosen":
						t += `${His} giant jiggling gut threatens to pop the buttons off ${his} shorts. ${His} belly bulges out above them.`;
						break;
					case "a biyelgee costume":
						t += `${His} loose dress is completely filled by ${his} giant jiggling gut.`;
						break;
					case "a nice nurse outfit":
						t += `${His} scrub top jiggles along with ${his} giant gut as ${he} moves.`;
						break;
					case "a mini dress":
						t += `${His} strained minidress shows every jiggle in ${his} giant gut as ${he} moves.`;
						break;
					case "a monokini":
						t += `${His} giant gut causes ${his} monokini to jiggle alongside it as ${he} moves.`;
						break;
					case "overalls":
						if (slave.boobs > (slave.belly + 250)) {
							t += `${slave.slaveName}'s giant breasts push out ${his} overalls so far that ${his} hugely fat belly is left uncovered.`;
						} else {
							t += `${slave.slaveName}'s hugely fat belly bulges over the sides of ${his} overalls.`;
						}
						break;
					case "an apron":
						t += `${His} apron offers no cover to the jiggles of ${his} giant gut as ${he} moves.`;
						break;
					case "a cybersuit":
						t += `The taut material of ${his} bodysuit shows every jiggle in ${his} giant gut as ${he} moves.`;
						break;
					case "a tight Imperial bodysuit":
						t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} giant gut, jiggling as ${he} moves.`;
						break;
					case "a nice maid outfit":
						t += `As ${he} moves, noticeable jiggling can be seen within ${his} maid's dress.`;
						break;
					case "a penitent nuns habit":
						t += `${His} habit does nothing to stop ${his} giant gut from jiggling against the coarse cloth as ${he} moves.`;
						break;
					case "clubslut netting":
						t += `${His} clubslut netting jiggles lewdly along with ${his} giant gut as ${he} moves.`;
						break;
					case "a cheerleader outfit":
						t += `${His} giant gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
						break;
					case "a slave gown":
						t += `${His} giant jiggly gut is gently caressed by ${his} gown.`;
						break;
					case "nice business attire":
						t += `${His} giant gut has no room to move under ${his} strained jacket.`;
						break;
					case "harem gauze":
						t += `${His} silken garb and giant, jiggly gut makes ${him} look like a belly dancer.`;
						break;
					case "a comfortable bodysuit":
						t += `The taut material of ${his} bodysuit shows every jiggle in ${his} giant gut as ${he} moves.`;
						break;
					case "a schoolgirl outfit":
						t += `The school fatty is jiggling by and ripe for abuse with ${his} ill-fitting clothes.`;
						break;
					case "a kimono":
						t += `Tons of jiggling can be seen through ${his} kimono whenever ${he} moves.`;
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						t += `Tons of jiggling can be seen through ${his} abaya whenever ${he} moves.`;
						break;
					case "a klan robe":
						t += `Some jiggling can be seen through ${his} robe whenever ${he} moves.`;
						break;
					case "a burqa":
						t += `Some jiggling can be seen through ${his} burqa whenever ${he} moves.`;
						break;
					case "a bra":
					case "a skimpy loincloth":
					case "a slutty klan robe":
					case "a sports bra":
					case "a striped bra":
					case "a thong":
					case "a tube top":
					case "a tube top and thong":
					case "boyshorts":
					case "cutoffs":
					case "jeans":
					case "leather pants":
					case "leather pants and a tube top":
					case "leather pants and pasties":
					case "panties":
					case "panties and pasties":
					case "pasties":
					case "sport shorts":
					case "sport shorts and a sports bra":
					case "striped underwear":
						t += `${His} jiggling belly is totally bare.`;
						break;
					case "a button-up shirt and panties":
					case "a button-up shirt":
					case "a police uniform":
					case "a t-shirt":
					case "a t-shirt and jeans":
					case "a t-shirt and panties":
					case "a t-shirt and thong":
					case "an oversized t-shirt":
					case "an oversized t-shirt and boyshorts":
					case "sport shorts and a t-shirt":
						t += `Small amounts of jiggling flesh can be seen through ${his} shirt whenever ${he} moves.`;
						break;
					case "a tank-top":
					case "a tank-top and panties":
						t += `Small amounts of jiggling flesh can be seen through ${his} tank-top whenever ${he} moves.`;
						break;
					case "a sweater":
					case "a sweater and panties":
					case "a sweater and cutoffs":
						t += `Small amounts of jiggling flesh can be seen through ${his} sweater whenever ${he} moves.`;
						break;
					case "a gothic lolita dress":
						t += `Small amounts of jiggling flesh can be seen through ${his} dress whenever ${he} moves.`;
						break;
					case "a hanbok":
						t += `Small amounts of jiggling flesh can be seen through ${his} hanbok whenever ${he} moves.`;
						break;
					case "a one-piece swimsuit":
						t += `Small amounts of jiggling flesh can be seen through ${his} swimsuit whenever ${he} moves.`;
						break;
					case "a nice pony outfit":
					case "a slutty pony outfit":
						t += `Small amounts of jiggling flesh can be seen through ${his} leather outfit whenever ${he} moves.`;
						break;
					case "a burkini":
						t += `${His} burkini clings to the folds and rolls of ${his} giant, jiggling gut.`;
						break;
					case "a hijab and blouse":
						t += `${His} giant gut can be seen jiggling beneath ${his} skirt and blouse whenever ${he} moves.`;
						break;
					case "a halter top dress":
						t += `${His} stretched halter top dress shows every jiggle in ${his} giant gut as ${he} moves.`;
						break;
					case "an evening dress":
						t += `Your gaze is drawn to ${his} giant gut by ${his} sensual evening dress.`;
						break;
					case "a ball gown":
						t += `Your gaze is drawn to ${his} giant gut by ${his} fabulous silken ball gown.`;
						break;
					case "a leotard":
						t += `The taut material of ${his} leotard shows every jiggle in ${his} giant gut as ${he} moves.`;
						break;
					case "a chattel habit":
						t += `${His} giant gut jiggles around the strip of cloth down ${his} front as ${he} moves.`;
						break;
					case "a bunny outfit":
						t += `${He} is a sight in ${his} bunny outfit. ${His} teddy not only covers ${his} giant gut, but draws your gaze right to it, though it can't help but jiggle along with ${his} every motion.`;
						break;
					case "attractive lingerie for a pregnant woman":
						t += `${His} giant gut is gently framed by ${his} silken vest.`;
						break;
					case "a maternity dress":
						t += `${His} loose dress bulges with ${his} giant gut.`;
						break;
					case "a courtesan dress":
						t += `${His} many thick folds jiggle beneath the thin cloth with ${his} movements.`;
						break;
					default:
						t += `${His} giant bare jiggling gut catches your eye.`;
				}
			} else if (slave.weight > 130) {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						t += `${His} big gut is perfectly smoothed by the tight latex.`;
						break;
					case "conservative clothing":
						t += `${His} conservative clothing stands no chance of stilling ${his} big, jiggling gut.`;
						break;
					case "chains":
						t += `${His} big gut jiggles lewdly between ${his} tight chains.`;
						break;
					case "a huipil":
						t += `${His} huipil jiggles along with ${his} big gut.`;
						break;
					case "a slutty qipao":
						t += `The front of ${his} qipao rests atop ${his} big gut.`;
						break;
					case "uncomfortable straps":
						t += `${His} big gut jiggles lewdly between ${his} tight straps.`;
						break;
					case "shibari ropes":
						t += `${His} big gut jiggles lewdly between ${his} tight cords.`;
						break;
					case "a latex catsuit":
					case "restrictive latex":
						t += `${His} big gut has no room to move under ${his} tight latex.`;
						break;
					case "a military uniform":
					case "a schutzstaffel uniform":
					case "a red army uniform":
					case "a mounty outfit":
					case "a confederate army uniform":
						t += `The buttons on ${his} straining jacket struggle to hold back ${his} big jiggling gut.`;
						break;
					case "a long qipao":
						t += `The front of ${his} qipao rests atop ${his} big gut.`;
						break;
					case "battlearmor":
						t += `${His} big gut has no room to move under ${his} tight armor.`;
						break;
					case "Imperial Plate":
						t += `${His} big gut pushes out the front of ${his} ultra-heavy armor.`;
						break;
					case "a dirndl":
						t += `The front of ${his} dirndl rests atop ${his} big gut.`;
						break;
					case "lederhosen":
						t += `The buttons on ${his} straining shorts struggle to hold back ${his} big jiggling gut.`;
						break;
					case "a biyelgee costume":
						t += `The front of ${his} costume rests atop ${his} big gut.`;
						break;
					case "a nice nurse outfit":
						t += `${His} scrub top jiggles along with ${his} big gut as ${he} moves.`;
						break;
					case "a mini dress":
						t += `${His} stretched minidress shows every jiggle in ${his} big gut as ${he} moves.`;
						break;
					case "a monokini":
						t += `${His} monokini struggles to stop ${his} big gut from jiggling as ${he} moves.`;
						break;
					case "an apron":
						t += `As ${he} moves, ${his} apron jostles just as ${his} big gut jiggles.`;
						break;
					case "a cybersuit":
						t += `The taut material of ${his} bodysuit shows every jiggle in ${his} big gut as ${he} moves.`;
						break;
					case "a tight Imperial bodysuit":
						t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} big gut, jiggling as ${he} moves.`;
						break;
					case "a slutty maid outfit":
						t += `${His} big gut is barely covered by a thin white blouse that happily jiggles along with every motion.`;
						break;
					case "a nice maid outfit":
						t += `As ${he} moves, a slight jiggle can be seen within ${his} maid's dress.`;
						break;
					case "a penitent nuns habit":
						t += `${His} habit does nothing to stop ${his} big gut from jiggling against the coarse cloth as ${he} moves.`;
						break;
					case "clubslut netting":
						t += `${His} clubslut netting jiggles lewdly along with ${his} big gut as ${he} moves.`;
						break;
					case "a cheerleader outfit":
						t += `${His} big gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
						break;
					case "a slave gown":
						t += `${His} big jiggly gut is gently caressed by ${his} gown.`;
						break;
					case "nice business attire":
						t += `Noticeable jiggling from ${his} big gut can be seen under ${his} jacket.`;
						break;
					case "harem gauze":
						t += `${His} silken garb and big, jiggly gut makes ${him} look like a belly dancer.`;
						break;
					case "a comfortable bodysuit":
						t += `The taut material of ${his} bodysuit shows every jiggle in ${his} big gut as ${he} moves.`;
						break;
					case "a schoolgirl outfit":
						t += `${His} big gut is partially covered by ${his} blouse, which happily jiggles along with every motion.`;
						break;
					case "a kimono":
						t += `Noticeable jiggling can be seen through ${his} kimono whenever ${he} moves.`;
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						t += `Noticeable jiggling can be seen through ${his} abaya whenever ${he} moves.`;
						break;
					case "a klan robe":
						t += `A small amount of jiggling can be seen through ${his} robe whenever ${he} moves.`;
						break;
					case "a burqa":
						t += `A small amount of jiggling can be seen through ${his} burqa whenever ${he} moves.`;
						break;
					case "a bra":
					case "a skimpy loincloth":
					case "a slutty klan robe":
					case "a sports bra":
					case "a striped bra":
					case "a thong":
					case "a tube top":
					case "a tube top and thong":
					case "boyshorts":
					case "cutoffs":
					case "jeans":
					case "leather pants":
					case "leather pants and a tube top":
					case "leather pants and pasties":
					case "panties":
					case "panties and pasties":
					case "pasties":
					case "sport shorts":
					case "sport shorts and a sports bra":
					case "striped underwear":
						t += `${His} jiggling belly is totally bare.`;
						break;
					case "a button-up shirt and panties":
					case "a button-up shirt":
					case "a police uniform":
					case "a t-shirt":
					case "a t-shirt and jeans":
					case "a t-shirt and panties":
					case "a t-shirt and thong":
					case "an oversized t-shirt":
					case "an oversized t-shirt and boyshorts":
					case "sport shorts and a t-shirt":
						t += `Small amounts of jiggling flesh can be seen through ${his} shirt whenever ${he} moves.`;
						break;
					case "a tank-top":
					case "a tank-top and panties":
						t += `Small amounts of jiggling flesh can be seen through ${his} tank-top whenever ${he} moves.`;
						break;
					case "a sweater":
					case "a sweater and panties":
					case "a sweater and cutoffs":
						t += `Small amounts of jiggling flesh can be seen through ${his} sweater whenever ${he} moves.`;
						break;
					case "a gothic lolita dress":
						t += `Small amounts of jiggling flesh can be seen through ${his} dress whenever ${he} moves.`;
						break;
					case "a hanbok":
						t += `Small amounts of jiggling flesh can be seen through ${his} hanbok whenever ${he} moves.`;
						break;
					case "a one-piece swimsuit":
						t += `Small amounts of jiggling flesh can be seen through ${his} swimsuit whenever ${he} moves.`;
						break;
					case "a nice pony outfit":
					case "a slutty pony outfit":
						t += `Small amounts of jiggling flesh can be seen through ${his} leather outfit whenever ${he} moves.`;
						break;
					case "a burkini":
						t += `${His} burkini clings to the shape of ${his} big, jiggling gut.`;
						break;
					case "a hijab and blouse":
						t += `${His} big gut can often be seen jiggling beneath ${his} skirt and blouse when ${he} moves.`;
						break;
					case "a halter top dress":
						t += `${His} stretched halter top dress shows every jiggle in ${his} big gut as ${he} moves.`;
						break;
					case "an evening dress":
						t += `Your gaze is drawn to ${his} big gut by ${his} sensual evening dress.`;
						break;
					case "a ball gown":
						t += `Your gaze is drawn to ${his} big gut by ${his} fabulous silken ball gown.`;
						break;
					case "a leotard":
						t += `The taut material of ${his} leotard shows every jiggle in ${his} big gut as ${he} moves.`;
						break;
					case "a bunny outfit":
						t += `${He} is a sight in ${his} bunny outfit. ${His} teddy not only controls ${his} big gut, but draws your gaze right to it.`;
						break;
					case "attractive lingerie for a pregnant woman":
						t += `${His} big gut is gently framed by ${his} silken vest.`;
						break;
					case "a maternity dress":
						t += `${His} loose dress bulges with ${his} big gut.`;
						break;
					case "overalls":
						if (slave.boobs > (slave.belly + 250)) {
							t += `${slave.slaveName}'s giant breasts push out ${his} overalls so far that ${his} big fat belly is left uncovered.`;
						} else {
							t += `${slave.slaveName}'s big fat belly spills out from behind ${his} overalls.`;
						}
						break;
					case "a courtesan dress":
						t += `${His} many folds jiggle beneath the thin cloth with ${his} movements.`;
						break;
					default:
						t += `${His} big bare jiggling gut catches your eye.`;
				}
			} else if (slave.inflation === 2) {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
						break;
					case "conservative clothing":
						t += `${His} taut blouse shows off ${his} rounded, sloshing belly.`;
						break;
					case "chains":
						t += `${His} rounded, sloshing belly bulges between ${his} tight chains.`;
						break;
					case "a slutty qipao":
						t += `The front of ${his} qipao rests atop ${his} rounded, sloshing belly.`;
						break;
					case "uncomfortable straps":
						t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} rounded, sloshing belly bulges around them.`;
						break;
					case "attractive lingerie for a pregnant woman":
						t += `${His} rounded, sloshing belly is gently framed by ${his} silken vest.`;
						break;
					case "a maternity dress":
						t += `${His} loose dress is filled by ${his} rounded, sloshing belly.`;
						break;
					case "shibari ropes":
						t += `${His} rounded, sloshing belly bulges out from between ${his} ropes.`;
						break;
					case "a latex catsuit":
					case "restrictive latex":
						t += `${His} rounded, sloshing belly looks like a beach ball under ${his} tight latex; ${his} popped navel breaks the smoothness.`;
						break;
					case "a military uniform":
					case "a schutzstaffel uniform":
					case "a slutty schutzstaffel uniform":
					case "a red army uniform":
					case "a mounty outfit":
					case "a confederate army uniform":
						t += `${His} rounded, sloshing belly strains the buttons on ${his} jacket. It bulges slightly between them.`;
						break;
					case "a long qipao":
						t += `The front of ${his} qipao rests atop ${his} rounded, sloshing belly.`;
						break;
					case "battlearmor":
						t += `${His} rounded, sloshing belly bulges out from under ${his} armor.`;
						break;
					case "Imperial Plate":
						t += `${His} ultra-heavy armor is slightly swollen by ${his} rounded, sloshing belly.`;
						break;
					case "a dirndl":
						t += `The front of ${his} dirndl rests atop ${his} rounded, sloshing belly.`;
						break;
					case "lederhosen":
						t += `${His} rounded, sloshing belly strains the buttons on ${his} shorts. It bulges slightly above them.`;
						break;
					case "a biyelgee costume":
						t += `The front of ${his} costume rests atop ${his} rounded, sloshing belly.`;
						break;
					case "a nice nurse outfit":
						t += `${His} rounded, sloshing belly strains against ${his} scrub top, making ${him} resemble more a maternity ward patient than a nurse.`;
						break;
					case "a mini dress":
						t += `${His} rounded, sloshing belly strains against ${his} mini dress.`;
						break;
					case "a slutty maid outfit":
						t += `${His} rounded, sloshing belly is partially covered by a thin white blouse.`;
						break;
					case "a nice maid outfit":
						t += `${His} rounded, sloshing belly strains ${his} maid outfit; ${his} popped navel is visible under ${his} apron.`;
						break;
					case "a penitent nuns habit":
						t += `${His} rounded, sloshing belly bulges ${his} habit; it looks absolutely sinful.`;
						break;
					case "clubslut netting":
						t += `${His} rounded, sloshing belly strains ${his} clubslut netting.`;
						break;
					case "a cheerleader outfit":
						t += `${His} rounded, sloshing belly is partly covered by ${his} cheerleader's top.`;
						break;
					case "a halter top dress":
						t += `${His} rounded, sloshing belly fills out ${his} halter top dress.`;
						break;
					case "an evening dress":
						t += `${His} rounded, sloshing belly fills out ${his} evening dress.`;
						break;
					case "a ball gown":
						t += `Your gaze is drawn to ${his} rounded, sloshing belly by ${his} fabulous silken ball gown.`;
						break;
					case "a slave gown":
						t += `${His} rounded, sloshing belly is gently caressed by ${his} gown.`;
						break;
					case "nice business attire":
						t += `${His} rounded, sloshing belly strains the buttons on ${his} jacket. It bulges slightly between them.`;
						break;
					case "harem gauze":
						t += `${His} silken garb and rounded, sloshing belly makes ${him} look like a belly dancer. That'd be a show.`;
						break;
					case "a comfortable bodysuit":
						t += `${His} rounded, sloshing belly fills ${his} bodysuit. Every movement of the liquid within ${him} is very visible.`;
						break;
					case "a schoolgirl outfit":
						t += `${His} rounded, sloshing belly is only partly covered by ${his} blouse.`;
						break;
					case "a kimono":
						t += `${His} kimono demurely covers ${his} rounded, sloshing belly.`;
						break;
					case "a monokini":
						t += `${His} monokini struggles to cover ${his} rounded, sloshing belly.`;
						break;
					case "overalls":
						if (slave.boobs > (slave.belly + 250)) {
							t += `${slave.slaveName}'s huge breasts push out ${his} overalls so far that ${his} jiggling ${slave.inflationType}-filled belly is left uncovered.`;
						} else {
							t += `${slave.slaveName}'s overalls are significantly curved by ${his} jiggling ${slave.inflationType}-filled belly.`;
						}
						break;
					case "a cybersuit":
						t += `${His} rounded, sloshing belly fills ${his} bodysuit. Every movement of the liquid within ${him} is very visible.`;
						break;
					case "a tight Imperial bodysuit":
						t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} rounded, sloshing belly.`;
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						t += `${His} rounded, sloshing belly tents ${his} abaya.`;
						break;
					case "a klan robe":
						t += `${His} rounded, sloshing belly pushes against ${his} robe.`;
						break;
					case "a burqa":
						t += `${His} rounded, sloshing belly pushes against ${his} burqa.`;
						break;
					case "a bra":
					case "a skimpy loincloth":
					case "a slutty klan robe":
					case "a sports bra":
					case "a striped bra":
					case "a thong":
					case "a tube top":
					case "a tube top and thong":
					case "boyshorts":
					case "cutoffs":
					case "jeans":
					case "leather pants":
					case "leather pants and a tube top":
					case "leather pants and pasties":
					case "panties":
					case "panties and pasties":
					case "pasties":
					case "sport shorts":
					case "sport shorts and a sports bra":
					case "striped underwear":
						t += `${His} rounded sloshing belly is totally bare.`;
						break;
					case "a button-up shirt and panties":
					case "a button-up shirt":
					case "a police uniform":
					case "a t-shirt":
					case "a t-shirt and jeans":
					case "a t-shirt and panties":
					case "a t-shirt and thong":
					case "an oversized t-shirt":
					case "an oversized t-shirt and boyshorts":
					case "sport shorts and a t-shirt":
						t += `${His} rounded, sloshing belly pushes against ${his} shirt.`;
						break;
					case "a tank-top":
					case "a tank-top and panties":
						t += `${His} rounded, sloshing belly pushes against ${his} tank-top.`;
						break;
					case "a sweater":
					case "a sweater and panties":
					case "a sweater and cutoffs":
						t += `${His} rounded, sloshing belly pushes against ${his} sweater.`;
						break;
					case "a gothic lolita dress":
						t += `${His} rounded, sloshing belly pushes against ${his} dress.`;
						break;
					case "a hanbok":
						t += `${His} rounded, sloshing belly pushes against ${his} hanbok.`;
						break;
					case "a one-piece swimsuit":
						t += `${His} rounded, sloshing belly pushes against ${his} swimsuit.`;
						break;
					case "a nice pony outfit":
					case "a slutty pony outfit":
						t += `${His} rounded, sloshing belly pushes against ${his} leather outfit.`;
						break;
					case "a burkini":
						t += `${His} burkini covers ${his} rounded, sloshing belly.`;
						break;
					case "a hijab and blouse":
						t += `${His} light shirts are stretched out to cover ${his} rounded, sloshing belly.`;
						break;
					case "a leotard":
						t += `${His} rounded, sloshing belly stretches ${his} leotard. Every movement of the liquid within ${him} is very visible.`;
						break;
					case "a chattel habit":
						t += `${His} rounded, sloshing belly shoves the strip of cloth on ${his} front to ${his} side.`;
						break;
					case "a bunny outfit":
						t += `${His} rounded, sloshing belly is strains ${his} teddy, the seams along the side are showing signs of wear.`;
						break;
					case "a toga":
						t += `${His} loose fitted toga leaves plenty of space for ${his} rounded, sloshing belly.`;
						break;
					case "a huipil":
						t += `${His} rounded, sloshing belly is so big that the huipil can barely cover it.`;
						break;
					case "a courtesan dress":
						t += `${His} rounded, sloshing belly wobbles gracefully along with ${his} movements.`;
						break;
					default:
						t += `${His} bare, rounded, sloshing belly catches your eye.`;
				}
			} else if (slave.weight >= 95) {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
						break;
					case "conservative clothing":
						t += `${His} taut blouse shows every jiggle in ${his} fat gut as ${he} moves.`;
						break;
					case "chains":
						t += `${His} fat gut jiggles lewdly between ${his} tight chains.`;
						break;
					case "a slutty qipao":
						t += `The front of ${his} qipao rests atop, and jiggles with, ${his} fat gut as ${he} moves.`;
						break;
					case "uncomfortable straps":
						t += `${His} fat gut jiggles lewdly between ${his} tight straps.`;
						break;
					case "shibari ropes":
						t += `${His} fat gut jiggles lewdly between the binding ropes.`;
						break;
					case "a latex catsuit":
					case "restrictive latex":
						t += `${His} fat gut barely has any room to move under ${his} tight latex.`;
						break;
					case "a military uniform":
					case "a schutzstaffel uniform":
					case "a slutty schutzstaffel uniform":
					case "a red army uniform":
					case "a mounty outfit":
					case "a confederate army uniform":
						t += `The buttons on ${his} straining jacket can barely hold back ${his} fat, jiggling gut.`;
						break;
					case "a long qipao":
						t += `The front of ${his} qipao rests atop, and jiggles with, ${his} fat gut as ${he} moves.`;
						break;
					case "battlearmor":
						t += `${His} armor can barely hold back ${his} fat, jiggling gut.`;
						break;
					case "Imperial Plate":
						t += `Even ${his} ultra-heavy armor struggles to constrain the obvious swell of ${his} fat, jiggling gut.`;
						break;
					case "a dirndl":
						t += `The front of ${his} dirndl rests atop, and jiggles with, ${his} fat gut as ${he} moves.`;
						break;
					case "lederhosen":
						t += `The buttons on ${his} straining shorts can barely hold back ${his} fat, jiggling gut.`;
						break;
					case "a biyelgee costume":
						t += `The front of ${his} costume rests atop, and jiggles with, ${his} fat gut as ${he} moves.`;
						break;
					case "a nice nurse outfit":
						t += `${His} scrub top jiggles along with ${his} fat gut as ${he} moves.`;
						break;
					case "a mini dress":
						t += `${His} stretched minidress shows every jiggle in ${his} fat gut as ${he} moves.`;
						break;
					case "a monokini":
						t += `${His} fat gut bulges out ${his} monokini, which stops ${him} from jiggling as ${he} moves.`;
						break;
					case "overalls":
						if (slave.boobs > (slave.belly + 250)) {
							t += `${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} fat belly is left uncovered.`;
						} else {
							t += `${slave.slaveName}'s fat belly bulges out from over the sides of ${his} overalls.`;
						}
						break;
					case "an apron":
						t += `${His} apron provides some covering to the jiggling of ${his} fat gut.`;
						break;
					case "a cybersuit":
						t += `The taut material of ${his} bodysuit shows every jiggle in ${his} fat gut as ${he} moves.`;
						break;
					case "a tight Imperial bodysuit":
						t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} fat gut, jiggling as ${he} moves.`;
						break;
					case "a slutty maid outfit":
						t += `${His} fat gut is partially covered by a thin white blouse, that happily jiggles along with every motion.`;
						break;
					case "a nice maid outfit":
						t += `As ${he} moves, a slight jiggle can be seen within ${his} maid's dress.`;
						break;
					case "a penitent nuns habit":
						t += `${His} habit does nothing to stop ${his} fat gut from jiggling against the coarse cloth as ${he} moves.`;
						break;
					case "clubslut netting":
						t += `${His} clubslut netting jiggles lewdly along with ${his} fat gut as ${he} moves.`;
						break;
					case "a cheerleader outfit":
						t += `${His} fat gut is partially covered by ${his} cheerleader's top, which happily jiggles along with every motion.`;
						break;
					case "a halter top dress":
						t += `${His} stretched halter top dress shows every jiggle in ${his} fat gut as ${he} moves.`;
						break;
					case "an evening dress":
						t += `${His} stretched evening dress shows every jiggle in ${his} fat gut as ${he} moves.`;
						break;
					case "a ball gown":
						t += `Your gaze is drawn to ${his} fat gut by ${his} fabulous silken ball gown.`;
						break;
					case "a slave gown":
						t += `${His} fat, jiggly gut is gently caressed by ${his} gown.`;
						break;
					case "nice business attire":
						t += `Slight jiggling from ${his} fat gut can be seen under ${his} jacket.`;
						break;
					case "harem gauze":
						t += `${His} silken garb and fat, jiggly gut makes ${him} look like a belly dancer.`;
						break;
					case "a comfortable bodysuit":
						t += `The taut material of ${his} bodysuit shows every jiggle in ${his} fat gut as ${he} moves.`;
						break;
					case "a schoolgirl outfit":
						t += `${His} fat gut is partially covered by ${his} blouse, which happily jiggles along with every motion.`;
						break;
					case "a kimono":
						t += `Slight jiggling can be seen through ${his} kimono whenever ${he} moves.`;
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						t += `Slight jiggling can be seen through ${his} abaya whenever ${he} moves.`;
						break;
					case "a klan robe":
						t += `${His} robe hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a burqa":
						t += `${His} burqa hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a bra":
					case "a skimpy loincloth":
					case "a slutty klan robe":
					case "a sports bra":
					case "a striped bra":
					case "a thong":
					case "a tube top":
					case "a tube top and thong":
					case "boyshorts":
					case "cutoffs":
					case "jeans":
					case "leather pants":
					case "leather pants and a tube top":
					case "leather pants and pasties":
					case "panties":
					case "panties and pasties":
					case "pasties":
					case "sport shorts":
					case "sport shorts and a sports bra":
					case "striped underwear":
						t += `${His} fat gut jiggles freely.`;
						break;
					case "a button-up shirt and panties":
					case "a button-up shirt":
					case "a police uniform":
					case "a t-shirt":
					case "a t-shirt and jeans":
					case "a t-shirt and panties":
					case "a t-shirt and thong":
					case "an oversized t-shirt":
					case "an oversized t-shirt and boyshorts":
					case "sport shorts and a t-shirt":
						t += `${His} shirt somewhat hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a tank-top":
					case "a tank-top and panties":
						t += `${His} tank-top barely hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a sweater":
					case "a sweater and panties":
					case "a sweater and cutoffs":
						t += `${His} sweater somewhat hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a gothic lolita dress":
						t += `${His} dress somewhat hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a hanbok":
						t += `${His} hanbok somewhat hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a one-piece swimsuit":
						t += `${His} swimsuit barely hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a nice pony outfit":
					case "a slutty pony outfit":
						t += `${His} leather outfit somewhat hides the jiggling motion of ${his} fat gut.`;
						break;
					case "a burkini":
						t += `${His} burkini clings to the shape of ${his} fat gut.`;
						break;
					case "a hijab and blouse":
						t += `${His} modest skirt and blouse bulge from the size of ${his} fat gut.`;
						break;
					case "a leotard":
						t += `The taut material of ${his} leotard shows every jiggle in ${his} fat gut as ${he} moves.`;
						break;
					case "a chattel habit":
						t += `${His} fat gut jiggles around the strip of cloth down ${his} front as ${he} moves.`;
						break;
					case "a bunny outfit":
						t += `${He} is a sight in ${his} bunny outfit. The front of ${his} fat gut is held still by ${his} teddy, but everything else of it jiggles obscenely with ${his} every motion.`;
						break;
					case "a toga":
						t += `${His} toga swerves loosely from side to side as ${his} chubby body moves inside it.`;
						break;
					case "a huipil":
						t += `${His} lithe huipil can't hide ${his} voluptuous shape unless ${he} stands completely still.`;
						break;
					case "a courtesan dress":
						t += `${His} gut jiggles beneath the thin cloth of ${his} dress.`;
						break;
					default:
						t += `${His} bare, jiggling, fat gut catches your eye.`;
				}
			} else if (slave.inflation === 1) {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
						break;
					case "conservative clothing":
						t += `${His} blouse bulges with ${his} distended belly.`;
						break;
					case "chains":
						t += `${His} distended belly bulges between ${his} tight chains.`;
						break;
					case "a slutty qipao":
						t += `The front of ${his} qipao rests atop ${his} distended belly.`;
						break;
					case "uncomfortable straps":
						t += `A steel ring rests around ${his} navel, held in place by tight straps. ${His} distended belly bulges around them.`;
						break;
					case "shibari ropes":
						t += `${His} distended belly bulges out from between ${his} ropes.`;
						break;
					case "a latex catsuit":
					case "restrictive latex":
						t += `${His} distended belly bulges beneath ${his} tight latex.`;
						break;
					case "a military uniform":
					case "a schutzstaffel uniform":
					case "a slutty schutzstaffel uniform":
					case "a red army uniform":
					case "a mounty outfit":
						t += `${His} distended belly bulges ${his} uniform tunic.`;
						break;
					case "a confederate army uniform":
						t += `${His} distended belly bulges ${his} uniform.`;
						break;
					case "a long qipao":
						t += `The front of ${his} qipao rests atop ${his} distended belly.`;
						break;
					case "battlearmor":
						t += `${His} distended belly bulges ${his} armor.`;
						break;
					case "Imperial Plate":
						t += `${His} ultra-heavy armor is slightly swollen by ${his} distended belly.`;
						break;
					case "a dirndl":
						t += `The front of ${his} dirndl rests atop ${his} distended belly.`;
						break;
					case "lederhosen":
						t += `${His} distended belly bulges ${his} lederhosen.`;
						break;
					case "a biyelgee costume":
						t += `The front of ${his} costume rests atop ${his} distended belly.`;
						break;
					case "a nice nurse outfit":
						t += `${His} distended belly is clearly visible through ${his} scrub top.`;
						break;
					case "a mini dress":
						t += `${His} distended belly bulges ${his} tight mini dress.`;
						break;
					case "a slutty maid outfit":
						t += `${His} distended belly bulges ${his} thin white blouse.`;
						break;
					case "a nice maid outfit":
						t += `${His} distended belly is concealed by ${his} maid outfit.`;
						break;
					case "a penitent nuns habit":
						t += `${His} distended belly bulges ${his} habit.`;
						break;
					case "attractive lingerie for a pregnant woman":
						t += `${His} distended belly is gently framed by ${his} silken vest.`;
						break;
					case "a maternity dress":
						t += `${His} loose dress conceals ${his} distended belly.`;
						break;
					case "clubslut netting":
						t += `${His} distended belly fills out ${his} clubslut netting.`;
						break;
					case "a cheerleader outfit":
						t += `${His} distended belly peeks out from under ${his} cheerleader's top.`;
						break;
					case "a halter top dress":
						t += `${His} distended belly bulges ${his} halter top dress.`;
						break;
					case "an evening dress":
						t += `${His} distended belly bulges ${his} evening dress.`;
						break;
					case "a ball gown":
						t += `Your gaze is drawn to ${his} distended belly by ${his} fabulous silken ball gown.`;
						break;
					case "a slave gown":
						t += `${His} distended belly is gently caressed by ${his} gown.`;
						break;
					case "nice business attire":
						t += `${His} distended belly bulges ${his} suit jacket.`;
						break;
					case "harem gauze":
						t += `${His} silken garb and distended belly makes ${him} look like a belly dancer.`;
						break;
					case "a comfortable bodysuit":
						t += `${His} distended belly fills ${his} bodysuit.`;
						break;
					case "a schoolgirl outfit":
						t += `${His} distended belly peeks out from under ${his} blouse.`;
						break;
					case "a kimono":
						t += `${His} kimono demurely covers ${his} distended belly.`;
						break;
					case "a monokini":
						t += `${His} monokini manages to cover ${his} distended belly.`;
						break;
					case "overalls":
						if (slave.boobs > (slave.belly + 250)) {
							t += `${slave.slaveName}'s large breasts push out ${his} overalls so far that ${his} ${slave.inflationType}-swollen belly is left uncovered.`;
						} else {
							t += `${slave.slaveName}'s ${slave.inflationType}-swollen belly rounds out the front of ${his} overalls.`;
						}
						break;
					case "a cybersuit":
						t += `${His} distended belly fills ${his} bodysuit.`;
						break;
					case "a tight Imperial bodysuit":
						t += `${His} cybernetic bodysuit is lewdly stretched out by ${his} distended belly.`;
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						t += `${His} distended belly gently tents ${his} abaya.`;
						break;
					case "a klan robe":
						t += `${His} robe totally conceals ${his} distended belly.`;
						break;
					case "a burqa":
						t += `${His} burqa totally conceals ${his} distended belly.`;
						break;
					case "a bra":
					case "a skimpy loincloth":
					case "a slutty klan robe":
					case "a sports bra":
					case "a striped bra":
					case "a thong":
					case "a tube top":
					case "a tube top and thong":
					case "boyshorts":
					case "cutoffs":
					case "jeans":
					case "leather pants":
					case "leather pants and a tube top":
					case "leather pants and pasties":
					case "panties":
					case "panties and pasties":
					case "pasties":
					case "sport shorts":
					case "sport shorts and a sports bra":
					case "striped underwear":
						t += `${His} distended belly is totally bare.`;
						break;
					case "a button-up shirt and panties":
					case "a button-up shirt":
					case "a police uniform":
					case "a t-shirt":
					case "a t-shirt and jeans":
					case "a t-shirt and panties":
					case "a t-shirt and thong":
					case "an oversized t-shirt":
					case "an oversized t-shirt and boyshorts":
					case "sport shorts and a t-shirt":
						t += `${His} shirt totally conceals ${his} distended belly.`;
						break;
					case "a tank-top":
					case "a tank-top and panties":
						t += `${His} tank-top totally conceals ${his} distended belly.`;
						break;
					case "a sweater":
					case "a sweater and panties":
					case "a sweater and cutoffs":
						t += `${His} sweater totally conceals ${his} distended belly.`;
						break;
					case "a gothic lolita dress":
						t += `${His} dress totally conceals ${his} distended belly.`;
						break;
					case "a hanbok":
						t += `${His} hanbok totally conceals ${his} distended belly.`;
						break;
					case "a one-piece swimsuit":
						t += `${His} swimsuit totally conceals ${his} distended belly.`;
						break;
					case "a nice pony outfit":
					case "a slutty pony outfit":
						t += `${His} leather outfit totally conceals ${his} distended belly.`;
						break;
					case "a burkini":
						t += `${His} distended belly gently rounds ${his} burkini.`;
						break;
					case "a hijab and blouse":
						t += `${His} distended belly gently rounds ${his} blouse and skirt.`;
						break;
					case "a leotard":
						t += `${His} distended belly fills ${his} leotard.`;
						break;
					case "a chattel habit":
						t += `${His} distended belly shows under the strip of cloth on ${his} front.`;
						break;
					case "a bunny outfit":
						t += `${His} distended belly fills ${his} teddy.`;
						break;
					case "a toga":
						t += `${His} toga is so loose that you can barely notice ${his} distended belly.`;
						break;
					case "a huipil":
						t += `${His} distended belly can be seen from the sides of ${his} huipil.`;
						break;
					case "a courtesan dress":
						t += `${His} distended belly gently rounds ${his} dress.`;
						break;
					default:
						t += `${His} distended belly catches your eye.`;
				}
			}
		}

		return t;
	}

	/** Generate vagina text for a given slave
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function vaginaWatch(slave) {
		const {
			he, him, his,
			He, His,
		} = getPronouns(slave);

		target = "fVagina";
		// Desc dick and vag
		t += App.Desc.crotch(slave);
		t += ` `;
		t += App.Desc.vagina(slave);
		t += ` `;
		switch (slave.clothes) {
			case "a Fuckdoll suit":
				t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
				break;
			case "uncomfortable straps":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the big ring over ${his} hermaphroditic genitalia gleams from between them.`;
				} else if (slave.dick !== 0) {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the ring around the base of ${his} cock gleams from between them.`;
				} else {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the ring over ${his} pussy gleams from between them.`;
				}
				break;
			case "shibari ropes":
				t += `${His} ropes run tightly `;
				if (hasBothLegs(slave)) {
					t += `between ${his} legs, `;
				} else {
					t += `along ${his} perineum, `;
				}
				t += `pressing ${him} closely as ${he} moves.`;
				break;
			case "restrictive latex":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} cock and pussy stick out through a big hole in the latex.`;
				} else if (slave.dick !== 0) {
					t += `${His} cock sticks out through a hole in the latex.`;
				} else {
					t += `As one of the only islands in the sea of `;
					if (!(slave.clothingBaseColor)) {
						t += `black `;
					}
					t += `latex, ${his} pussy is eye-catching.`;
				}
				break;
			case "attractive lingerie for a pregnant woman":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} pretty panties totally fail to restrain ${his} huge cock and balls, which bounce around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} pretty panties totally fail to restrain ${his} huge penis, which flops around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty panties struggle to restrain ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} pretty panties daintily cover ${his} womanhood.`;
				}
				break;
			case "kitty lingerie":
				if (slave.dick > 5) {
					t += `As ${he} moves, ${his} huge penis bulges out from the top of ${his} panties.`;
				} else if (slave.dick > 3) {
					t += `As ${he} moves, ${his} large penis bulges within ${his} panties.`;
				} else if ((slave.dick > 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} dual genitalia.`;
				} else if (slave.dick > 0) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} penis.`;
				} else if (slave.dick !== -1) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} womanhood.`;
				} else {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} void groin.`;
				}
				break;
			case "a maternity dress":
				if (slave.dick > 2) {
					t += `As ${he} moves, something occasionally tents the front of ${his} dress.`;
				} else {
					t += `${His} loose dress gives no hints to what's inside it.`;
				}
				break;
			case "stretch pants and a crop-top":
				if (slave.dick > 2) {
					t += `As ${he} moves, something occasionally tents the front of ${his} pants.`;
				} else {
					t += `${His} tight pants don't leave much to the imagination.`;
				}
				break;
			case "attractive lingerie":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} pretty g-string totally fails to restrain ${his} huge cock and balls, which bounce around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} pretty g-string totally fails to restrain ${his} huge penis, which flops around lewdly in mockery of ${his} lovely appearance.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} pretty g-string struggles to restrain ${his} hermaphroditic genitalia.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty g-string struggles to restrain ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} pretty g-string daintily covers ${his} womanhood.`;
				}
				break;
			case "a slutty maid outfit":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `${His} apron is cut very short in front. ${His} cock and balls are so big that ${he} hangs out beyond the hem of ${his} apron.`;
				} else if (slave.dick > 4) {
					t += `${His} apron is cut very short in front. ${His} dick is so big that its lower half dangles out of ${his} clothing.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} apron is cut very short in front, revealing frequent glimpses of ${his} dangling cock, and occasional hints of something more.`;
				} else if (slave.dick !== 0) {
					t += `${His} apron is cut very short in front, revealing frequent glimpses of ${his} dangling cock.`;
				} else {
					t += `${His} apron is cut very short in front, revealing occasional glimpses of ${his} womanhood.`;
				}
				break;
			case "a nice maid outfit":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive bulges against the front of ${his} apron.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} apron.`;
				} else {
					t += `${His} apron gives no hint of what's behind it.`;
				}
				break;
			case "a hijab and abaya":
			case "a niqab and abaya":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia bulges the front of ${his} abaya as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia is totally concealed by ${his} abaya.`;
				} else if (slave.dick > 4) {
					t += `${His} penis bulges the front of ${his} abaya as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis is totally concealed by ${his} abaya.`;
				} else if (slave.vagina !== -1) {
					t += `${His} vagina is totally concealed by ${his} abaya.`;
				} else {
					t += `${His} featureless groin is totally concealed by ${his} abaya.`;
				}
				break;
			case "a klan robe":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia bulges the front of ${his} robe as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia is totally concealed by ${his} robe.`;
				} else if (slave.dick > 4) {
					t += `${His} penis bulges the front of ${his} robe as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis is totally concealed by ${his} robe.`;
				} else if (slave.vagina !== -1) {
					t += `${His} vagina is totally concealed by ${his} robe.`;
				} else {
					t += `${His} featureless groin is totally concealed by ${his} robe.`;
				}
				break;
			case "overalls":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} overalls as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} overalls as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} overalls as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} overalls as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} overalls fits snugly on ${his} pussylips.`;
				} else {
					t += `${His} overalls fits snugly on ${his} featureless groin.`;
				}
				break;
			case "a monokini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} monokini as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} monokini as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} monokini as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} monokini as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} monokini clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} monokini clings to ${his} featureless groin as ${he} moves.`;
				}
				break;
			case "an apron":
				if (slave.dick > 4) {
					t += `${His} dick sometimes creates a bulge in ${his} apron as ${he} moves.`;
				} else if ((slave.dick > 0) && (slave.vagina > -1)) {
					t += `${His} apron exposes ${his} hermaphroditic genitalia if ${he} moves too quickly.`;
				} else if (slave.dick > 0) {
					t += `${His} apron exposes ${his} cock if ${he} moves too quickly.`;
				} else if (slave.vagina > -1) {
					t += `${His} apron exposes ${his} featureless groin if ${he} moves too quickly.`;
				} else {
					t += `${His} apron exposes ${his} pussy if ${he} moves too quickly.`;
				}
				break;
			case "a cybersuit":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} bodysuit clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} bodysuit clings to ${his} featureless crotch as ${he} moves.`;
				}
				break;
			case "a tight Imperial bodysuit":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} bodysuit clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} bodysuit clings to ${his} featureless crotch as ${he} moves.`;
				}
				break;
			case "a string bikini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} hermaphroditic genitalia.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} g-string struggles to restrain ${his} hermaphroditic genitalia.`;
				} else if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} huge penis, and occasionally gives ${his} huge scrotum a painful pinch.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty white g-string struggles to restrain ${his} penis, which adds to ${his} sluttiness as it escapes.`;
				} else {
					t += `As ${he} moves, ${his} g-string rides up between ${his} pussylips.`;
				}
				break;
			case "a scalemail bikini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} scalemail bottom fails to conceal ${his} hermaphroditic genitalia.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} scalemail bottom fails to conceal ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} scalemail bottom covers ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} scalemail bottom conceals all.`;
				}
				break;
			case "striped panties":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} cute panties fail to conceal ${his} hermaphroditic genitalia.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} cute panties fail to conceal ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} cute panties cover ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} cute panties conceal all.`;
				}
				break;
			case "clubslut netting":
				if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} bare cock flops around, sticking through its hole in ${his} netting.`;
				} else if (slave.vagina !== -1) {
					t += `As ${he} moves, ${his} bare pussy beckons from its hole in ${his} netting.`;
				} else {
					t += `As ${he} moves, ${his} netting displays ${his} featureless groin.`;
				}
				break;
			case "a cheerleader outfit":
				if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} short pleated cheerleader skirt is bounced forward by something `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs.`;
					} else {
						t += `at ${his} crotch.`;
					}
				} else {
					t += `As ${he} moves, ${his} short pleated cheerleader skirt shows off ${his} butt.`;
				}
				break;
			case "cutoffs and a t-shirt":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `There's a huge bulge in the front of ${his} cutoffs.`;
				} else if (slave.dick > 1) {
					t += `There's a bulge in the front of ${his} cutoffs.`;
				} else {
					t += `${His} cutoffs conceal ${his} front enticingly.`;
				}
				break;
			case "spats and a tank top":
				if (slave.dick > 4) {
					t += `${His} spats have a large, attention-drawing bulge that looks uncomfortable as ${he} moves around.`;
				} else if (slave.dick > 1) {
					t += `Something bulges against the tight fit of ${his} spats as ${he} moves.`;
				} else {
					t += `${His} spats snugly fit to ${his} crotch as ${he} moves.`;
				}
				break;
			case "a slutty outfit":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts whose holes tantalizingly hint that ${he}'s very unusual `;
					if (hasBothLegs(slave)) {
						t += `between the legs.`;
					} else {
						t += `down there.`;
					}
				} else if (slave.dick > 2) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts so brief that ${his} huge dick occasionally escapes and flops free.`;
				} else if (slave.dick !== 0) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts whose holes tantalizingly hint that ${he}'s got something other than a pussy `;
					if (hasBothLegs(slave)) {
						t += `between the legs.`;
					} else {
						t += `down there.`;
					}
				} else {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts so tight that ${he} sports a raging cameltoe.`;
				}
				break;
			case "a slave gown":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a lovely 'dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} gorgeous dress leaves little to the imagination; there's little doubt ${his} pussy is bare beneath it, and ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} gorgeous dress leaves little to the imagination; ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} gorgeous dress leaves little to the imagination; there's little doubt ${his} pussy is bare beneath it.`;
				}
				break;
			case "a halter top dress":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'beautiful halter top dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}.`;
				}
				break;
			case "an evening dress":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'sensual evening dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} sensual evening dress is almost sculpted around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} sensual evening dress is almost sculpted around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} sensual evening dress is almost sculpted around ${him}.`;
				}
				break;
			case "a ball gown":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'fabulous silken ball gown' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} fabulous silken ball gown is draped around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} fabulous silken ball gown is draped around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} fabulous silken ball gown is draped around ${him}.`;
				}
				break;
			case "slutty business attire":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive tents the front of ${his} short skirt.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} short skirt.`;
				} else {
					t += `${His} short skirt gives no hint of what's behind it.`;
				}
				break;
			case "a fallen nuns habit":
				if (slave.dick > 0) {
					t += `${His} slutty nun outfit leaves ${his} cock to swing sacrilegiously.`;
				} else {
					t += `${His} slutty nun outfit leaves ${his} pussy totally and sacrilegiously bare.`;
				}
				break;
			case "a chattel habit":
				t += `${His} chattel habit makes ${his} sexual status immediately and encouragingly obvious.`;
				break;
			case "a penitent nuns habit":
				if (slave.dick > 0) {
					t += `${He} moves with painful caution, desperately trying to keep ${his} coarse habit from chafing ${his} dick raw.`;
				} else {
					t += `${He} moves with painful caution, desperately trying to keep ${his} coarse habit from chafing ${his} pussy raw.`;
				}
				break;
			case "nice business attire":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive tents the front of ${his} skirt.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} skirt.`;
				} else {
					t += `Unusually, ${his} businesslike skirt gives no hint of what's behind it.`;
				}
				break;
			case "a slutty nurse outfit":
				t += `${His} tight skirt constantly threatens to ride up in front.`;
				break;
			case "a schoolgirl outfit":
				t += `${His} schoolgirl skirt is so short that it constantly threatens to ride up in front.`;
				break;
			case "a kimono":
				t += `${His} obi demurely covers ${his} front.`;
				break;
			case "a burqa":
				t += `${His} burqa billows slightly as ${he} moves.`;
				break;
			case "a bra":
			case "a button-up shirt":
			case "a sweater":
			case "a tank-top":
			case "a tube top":
			case "a striped bra":
			case "a sports bra":
			case "a t-shirt":
			case "an oversized t-shirt":
				t += `${His} clothing leaves ${his} genitals bare and visible.`;
				break;
			case "a button-up shirt and panties":
			case "a slutty klan robe":
			case "a sweater and panties":
			case "a tank-top and panties":
			case "an oversized t-shirt and boyshorts":
			case "a t-shirt and jeans":
			case "boyshorts":
			case "cutoffs":
			case "leather pants and pasties":
			case "leather pants":
			case "panties":
			case "sport shorts and a t-shirt":
			case "a t-shirt and panties":
			case "panties and pasties":
			case "striped underwear":
			case "sport shorts and a sports bra":
			case "jeans":
			case "a sweater and cutoffs":
			case "leather pants and a tube top":
			case "sport shorts":
				t += `${His} clothing clings to the outline of ${his} genitals.`;
				break;
			case "a gothic lolita dress":
				t += `${His} dress ends halfway down ${his} thighs.`;
				break;
			case "a hanbok":
				t += `${His} hanbok billows slightly as ${he} moves.`;
				break;
			case "a one-piece swimsuit":
				t += `${His} swimsuit clings to the outline of ${his} genitals.`;
				break;
			case "a police uniform":
				t += `${His} trousers cling to the outline of ${his} genitals.`;
				break;
			case "a nice pony outfit":
			case "a slutty pony outfit":
				t += `${His} leather outfit clings tightly to the outline of ${his} genitals.`;
				break;
			case "a skimpy loincloth":
				t += `${His} skimpy loincloth gives frequent glimpses of ${his} bare genitals underneath.`;
				break;
			case "a burkini":
				t += `${His} modest swimwear includes a tunic that ends halfway down ${his} thighs.`;
				break;
			case "a hijab and blouse":
				t += `${His} long skirt billows as ${he} moves.`;
				break;
			case "battledress":
				t += `${His} fatigue trousers are utilitarian and unflattering.`;
				break;
			case "a comfortable bodysuit":
				if (slave.dick !== 0) {
					t += `${His} bodysuit displays every `;
					if (V.showInches === 2) {
						t += `inch `;
					} else {
						t += `centimeter `;
					}
					t += `of ${his} member as ${he} moves.`;
				} else {
					t += `${His} bodysuit shows off ${his} womanhood as ${he} moves.`;
				}
				break;
			case "a leotard":
				if ((slave.dick > 0) && canAchieveErection(slave)) {
					t += `${He}'s got ${his} erection tucked vertically upward under the tight material of ${his} leotard.`;
				} else if (slave.dick > 0) {
					t += `The tight material of ${his} leotard hugs and minimizes the size of ${his} soft member as ${he} moves.`;
				} else {
					t += `The thin crotch piece of ${his} leotard occasionally threatens to ride up between ${his} pussylips as ${he} moves.`;
				}
				break;
			case "a bunny outfit":
				if ((slave.dick > 0) && canAchieveErection(slave)) {
					t += `${He}'s moving uncomfortably, as though ${his} teddy isn't tailored quite perfectly for what ${he}'s got going on in front.`;
				} else if (slave.dick > 0) {
					t += `${His} teddy is tailored well enough to minimize the fact that ${he} isn't a natural woman.`;
				} else {
					t += `As ${he} moves, the satin material of ${his} bunny outfit flashes just a hint of inviting pussy.`;
				}
				break;
			case "harem gauze":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitals are clearly visible through the thin gauze that covers them.`;
				} else if (slave.dick !== 0) {
					t += `${His} dick is clearly visible through the thin gauze that covers it.`;
				} else {
					t += `${His} pussy is clearly visible through the thin gauze that covers it.`;
				}
				break;
			case "pasties":
				t += `${His} crotch pastie is eye-catching as it moves with ${him}.`;
				break;
			case "slutty jewelry":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards ${his} hermaphroditic genitalia with each step.`;
				} else if (slave.dick !== 0) {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards the base of ${his} penis with each step.`;
				} else {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards ${his} mons with each step.`;
				}
				break;
			case "a t-shirt and thong":
			case "a thong":
			case "a tube top and thong":
				t += `You get a good view of ${his} `;
				if (slave.dick > 5) {
					t += `thong and the huge penis hanging out of it.`;
				} else if (slave.dick > 3) {
					t += `thong and the penis that escaped its confines.`;
				} else if (slave.dick !== 0) {
					t += `bulging thong as ${he} moves.`;
				} else {
					t += `thong as ${he} moves.`;
				}
				break;
			case "a bimbo outfit":
				t += `${His} miniskirt is so short it draws the eye right to ${his} `;
				if (slave.dick > 5) {
					t += `thong and the huge penis hanging out of it.`;
				} else if (slave.dick > 3) {
					t += `thong and the penis that escaped its confines.`;
				} else if (slave.dick !== 0) {
					t += `bulging thong.`;
				} else {
					t += `exposed thong.`;
				}
				break;
			case "a courtesan dress":
				t += `${He} is just begging to be splayed out so that ${his} skirt may 'bloom'.`;
				break;
			default:
				if (slave.chastityVagina) {
					t += `${His} chastity belt protects ${him} from vanilla intercourse.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `You get a good view of ${his} cock and pussy: a marvel of modern surgery.`;
				} else if (slave.dick !== 0) {
					t += `You get a good view of ${his} cock.`;
				} else {
					t += `You get a good view of ${his} pussy.`;
				}
		}
		if (dildoLength(slave) > 1) {
			t += `With every motion ${he} makes, ${his} dildo shifts, bulging out ${his} stomach.`;
			if (plugLength(slave) > 1) {
				t += `Beside it, a second bulge caused by ${his} extra long buttplug.`;
			}
		} else if (plugLength(slave) > 1) {
			t += `With every motion ${he} makes, ${his} buttplug shifts, bulging out ${his} stomach.`;
		}

		return t;
	}

	/** Generate dick text for a given slave focused on penetrative sex
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function dickWatch(slave) {
		const {
			he, him, his,
			He, His,
		} = getPronouns(slave);

		target = "fDick";
		// Desc dick and vag
		t += App.Desc.crotch(slave);
		t += ` `;
		t += App.Desc.dick(slave);
		t += ` `;
		switch (slave.clothes) {
			case "a Fuckdoll suit":
				t += `${His} suit is expressly designed to encourage use of ${his} holes.`;
				break;
			case "uncomfortable straps":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the big ring over ${his} hermaphroditic genitalia gleams from between them.`;
				} else if (slave.dick !== 0) {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the ring around the base of ${his} cock gleams from between them.`;
				} else {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the ring over ${his} pussy gleams from between them.`;
				}
				break;
			case "shibari ropes":
				t += `${His} ropes run tightly `;
				if (hasBothLegs(slave)) {
					t += `between ${his} legs, `;
				} else {
					t += `along ${his} perineum, `;
				}
				t += `pressing ${him} closely as ${he} moves.`;
				break;
			case "restrictive latex":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} cock and pussy stick out through a big hole in the latex.`;
				} else if (slave.dick !== 0) {
					t += `${His} cock sticks out through a hole in the latex.`;
				} else {
					t += `As one of the only islands in the sea of `;
					if (!(slave.clothingBaseColor)) {
						t += `black `;
					}
					t += `latex, ${his} pussy is eye-catching.`;
				}
				break;
			case "attractive lingerie for a pregnant woman":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} pretty panties totally fail to restrain ${his} huge cock and balls, which bounce around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} pretty panties totally fail to restrain ${his} huge penis, which flops around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty panties struggle to restrain ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} pretty panties daintily cover ${his} womanhood.`;
				}
				break;
			case "kitty lingerie":
				if (slave.dick > 5) {
					t += `As ${he} moves, ${his} huge penis bulges out from the top of ${his} panties.`;
				} else if (slave.dick > 3) {
					t += `As ${he} moves, ${his} large penis bulges within ${his} panties.`;
				} else if ((slave.dick > 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} dual genitalia.`;
				} else if (slave.dick > 0) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} penis.`;
				} else if (slave.dick !== -1) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} womanhood.`;
				} else {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} void groin.`;
				}
				break;
			case "a maternity dress":
				if (slave.dick > 2) {
					t += `As ${he} moves, something occasionally tents the front of ${his} dress.`;
				} else {
					t += `${His} loose dress gives no hints to what's inside it.`;
				}
				break;
			case "stretch pants and a crop-top":
				if (slave.dick > 2) {
					t += `As ${he} moves, something occasionally tents the front of ${his} pants.`;
				} else {
					t += `${His} tight pants don't leave much to the imagination.`;
				}
				break;
			case "attractive lingerie":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} pretty g-string totally fails to restrain ${his} huge cock and balls, which bounce around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} pretty g-string totally fails to restrain ${his} huge penis, which flops around lewdly in mockery of ${his} lovely appearance.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} pretty g-string struggles to restrain ${his} hermaphroditic genitalia.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty g-string struggles to restrain ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} pretty g-string daintily covers ${his} womanhood.`;
				}
				break;
			case "a slutty maid outfit":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `${His} apron is cut very short in front. ${His} cock and balls are so big that ${he} hangs out beyond the hem of ${his} apron.`;
				} else if (slave.dick > 4) {
					t += `${His} apron is cut very short in front. ${His} dick is so big that its lower half dangles out of ${his} clothing.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} apron is cut very short in front, revealing frequent glimpses of ${his} dangling cock, and occasional hints of something more.`;
				} else if (slave.dick !== 0) {
					t += `${His} apron is cut very short in front, revealing frequent glimpses of ${his} dangling cock.`;
				} else {
					t += `${His} apron is cut very short in front, revealing occasional glimpses of ${his} womanhood.`;
				}
				break;
			case "a nice maid outfit":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive bulges against the front of ${his} apron.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} apron.`;
				} else {
					t += `${His} apron gives no hint of what's behind it.`;
				}
				break;
			case "a hijab and abaya":
			case "a niqab and abaya":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia bulges the front of ${his} abaya as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia is totally concealed by ${his} abaya.`;
				} else if (slave.dick > 4) {
					t += `${His} penis bulges the front of ${his} abaya as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis is totally concealed by ${his} abaya.`;
				} else if (slave.vagina !== -1) {
					t += `${His} vagina is totally concealed by ${his} abaya.`;
				} else {
					t += `${His} featureless groin is totally concealed by ${his} abaya.`;
				}
				break;
			case "a klan robe":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia bulges the front of ${his} robe as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia is totally concealed by ${his} robe.`;
				} else if (slave.dick > 4) {
					t += `${His} penis bulges the front of ${his} robe as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis is totally concealed by ${his} robe.`;
				} else if (slave.vagina !== -1) {
					t += `${His} vagina is totally concealed by ${his} robe.`;
				} else {
					t += `${His} featureless groin is totally concealed by ${his} robe.`;
				}
				break;
			case "overalls":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} overalls as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} overalls as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} overalls as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} overalls as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} overalls fits snugly on ${his} pussylips.`;
				} else {
					t += `${His} overalls fits snugly on ${his} featureless groin.`;
				}
				break;
			case "a monokini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} monokini as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} monokini as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} monokini as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} monokini as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} monokini clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} monokini clings to ${his} featureless groin as ${he} moves.`;
				}
				break;
			case "an apron":
				if (slave.dick > 4) {
					t += `${His} dick sometimes creates a bulge in ${his} apron as ${he} moves.`;
				} else if ((slave.dick > 0) && (slave.vagina > -1)) {
					t += `${His} apron exposes ${his} hermaphroditic genitalia if ${he} moves too quickly.`;
				} else if (slave.dick > 0) {
					t += `${His} apron exposes ${his} cock if ${he} moves too quickly.`;
				} else if (slave.vagina > -1) {
					t += `${His} apron exposes ${his} featureless groin if ${he} moves too quickly.`;
				} else {
					t += `${His} apron exposes ${his} pussy if ${he} moves too quickly.`;
				}
				break;
			case "a cybersuit":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} bodysuit clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} bodysuit clings to ${his} featureless crotch as ${he} moves.`;
				}
				break;
			case "a tight Imperial bodysuit":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} bodysuit clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} bodysuit clings to ${his} featureless crotch as ${he} moves.`;
				}
				break;
			case "a string bikini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} hermaphroditic genitalia.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} g-string struggles to restrain ${his} hermaphroditic genitalia.`;
				} else if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} huge penis, and occasionally gives ${his} huge scrotum a painful pinch.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty white g-string struggles to restrain ${his} penis, which adds to ${his} sluttiness as it escapes.`;
				} else {
					t += `As ${he} moves, ${his} g-string rides up between ${his} pussylips.`;
				}
				break;
			case "a scalemail bikini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} scalemail bottom fails to conceal ${his} hermaphroditic genitalia.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} scalemail bottom fails to conceal ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} scalemail bottom covers ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} scalemail bottom conceals all.`;
				}
				break;
			case "striped panties":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} cute panties fail to conceal ${his} hermaphroditic genitalia.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} cute panties fail to conceal ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} cute panties cover ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} cute panties conceal all.`;
				}
				break;
			case "clubslut netting":
				if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} bare cock flops around, sticking through its hole in ${his} netting.`;
				} else if (slave.vagina !== -1) {
					t += `As ${he} moves, ${his} bare pussy beckons from its hole in ${his} netting.`;
				} else {
					t += `As ${he} moves, ${his} netting displays ${his} featureless groin.`;
				}
				break;
			case "a cheerleader outfit":
				if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} short pleated cheerleader skirt is bounced forward by something `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs.`;
					} else {
						t += `at ${his} crotch.`;
					}
				} else {
					t += `As ${he} moves, ${his} short pleated cheerleader skirt shows off ${his} butt.`;
				}
				break;
			case "cutoffs and a t-shirt":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `There's a huge bulge in the front of ${his} cutoffs.`;
				} else if (slave.dick > 1) {
					t += `There's a bulge in the front of ${his} cutoffs.`;
				} else {
					t += `${His} cutoffs conceal ${his} front enticingly.`;
				}
				break;
			case "spats and a tank top":
				if (slave.dick > 4) {
					t += `${His} spats have a large, attention-drawing bulge that looks uncomfortable as ${he} moves around.`;
				} else if (slave.dick > 1) {
					t += `Something bulges against the tight fit of ${his} spats as ${he} moves.`;
				} else {
					t += `${His} spats snugly fit to ${his} crotch as ${he} moves.`;
				}
				break;
			case "a slutty outfit":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts whose holes tantalizingly hint that ${he}'s very unusual `;
					if (hasBothLegs(slave)) {
						t += `between the legs.`;
					} else {
						t += `down there.`;
					}
				} else if (slave.dick > 2) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts so brief that ${his} huge dick occasionally escapes and flops free.`;
				} else if (slave.dick !== 0) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts whose holes tantalizingly hint that ${he}'s got something other than a pussy `;
					if (hasBothLegs(slave)) {
						t += `between the legs.`;
					} else {
						t += `down there.`;
					}
				} else {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts so tight that ${he} sports a raging cameltoe.`;
				}
				break;
			case "a slave gown":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a lovely 'dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} gorgeous dress leaves little to the imagination; there's little doubt ${his} pussy is bare beneath it, and ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} gorgeous dress leaves little to the imagination; ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} gorgeous dress leaves little to the imagination; there's little doubt ${his} pussy is bare beneath it.`;
				}
				break;
			case "a halter top dress":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'beautiful halter top dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}.`;
				}
				break;
			case "an evening dress":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'sensual evening dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} sensual evening dress is almost sculpted around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} sensual evening dress is almost sculpted around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} sensual evening dress is almost sculpted around ${him}.`;
				}
				break;
			case "a ball gown":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'fabulous silken ball gown' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} fabulous silken ball gown is draped around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} fabulous silken ball gown is draped around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} fabulous silken ball gown is draped around ${him}.`;
				}
				break;
			case "slutty business attire":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive tents the front of ${his} short skirt.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} short skirt.`;
				} else {
					t += `${His} short skirt gives no hint of what's behind it.`;
				}
				break;
			case "a fallen nuns habit":
				if (slave.dick > 0) {
					t += `${His} slutty nun outfit leaves ${his} cock to swing sacrilegiously.`;
				} else {
					t += `${His} slutty nun outfit leaves ${his} pussy totally and sacrilegiously bare.`;
				}
				break;
			case "a chattel habit":
				t += `${His} chattel habit makes ${his} sexual status immediately and encouragingly obvious.`;
				break;
			case "a penitent nuns habit":
				if (slave.dick > 0) {
					t += `${He} moves with painful caution, desperately trying to keep ${his} coarse habit from chafing ${his} dick raw.`;
				} else {
					t += `${He} moves with painful caution, desperately trying to keep ${his} coarse habit from chafing ${his} pussy raw.`;
				}
				break;
			case "nice business attire":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive tents the front of ${his} skirt.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} skirt.`;
				} else {
					t += `Unusually, ${his} businesslike skirt gives no hint of what's behind it.`;
				}
				break;
			case "a slutty nurse outfit":
				t += `${His} tight skirt constantly threatens to ride up in front.`;
				break;
			case "a schoolgirl outfit":
				t += `${His} schoolgirl skirt is so short that it constantly threatens to ride up in front.`;
				break;
			case "a kimono":
				t += `${His} obi demurely covers ${his} front.`;
				break;
			case "a burqa":
				t += `${His} burqa billows slightly as ${he} moves.`;
				break;
			case "a bra":
			case "a button-up shirt":
			case "a sweater":
			case "a tank-top":
			case "a tube top":
			case "a striped bra":
			case "a sports bra":
			case "a t-shirt":
			case "an oversized t-shirt":
				t += `${His} clothing leaves ${his} genitals bare and visible.`;
				break;
			case "a button-up shirt and panties":
			case "a slutty klan robe":
			case "a sweater and panties":
			case "a tank-top and panties":
			case "an oversized t-shirt and boyshorts":
			case "a t-shirt and jeans":
			case "boyshorts":
			case "cutoffs":
			case "leather pants and pasties":
			case "leather pants":
			case "panties":
			case "sport shorts and a t-shirt":
			case "a t-shirt and panties":
			case "panties and pasties":
			case "striped underwear":
			case "sport shorts and a sports bra":
			case "jeans":
			case "a sweater and cutoffs":
			case "leather pants and a tube top":
			case "sport shorts":
				t += `${His} clothing clings to the outline of ${his} genitals.`;
				break;
			case "a gothic lolita dress":
				t += `${His} dress ends halfway down ${his} thighs.`;
				break;
			case "a hanbok":
				t += `${His} hanbok billows slightly as ${he} moves.`;
				break;
			case "a one-piece swimsuit":
				t += `${His} swimsuit clings to the outline of ${his} genitals.`;
				break;
			case "a police uniform":
				t += `${His} trousers cling to the outline of ${his} genitals.`;
				break;
			case "a nice pony outfit":
			case "a slutty pony outfit":
				t += `${His} leather outfit clings tightly to the outline of ${his} genitals.`;
				break;
			case "a skimpy loincloth":
				t += `${His} skimpy loincloth gives frequent glimpses of ${his} bare genitals underneath.`;
				break;
			case "a burkini":
				t += `${His} modest swimwear includes a tunic that ends halfway down ${his} thighs.`;
				break;
			case "a hijab and blouse":
				t += `${His} long skirt billows as ${he} moves.`;
				break;
			case "battledress":
				t += `${His} fatigue trousers are utilitarian and unflattering.`;
				break;
			case "a comfortable bodysuit":
				if (slave.dick !== 0) {
					t += `${His} bodysuit displays every `;
					if (V.showInches === 2) {
						t += `inch `;
					} else {
						t += `centimeter `;
					}
					t += `of ${his} member as ${he} moves.`;
				} else {
					t += `${His} bodysuit shows off ${his} womanhood as ${he} moves.`;
				}
				break;
			case "a leotard":
				if ((slave.dick > 0) && canAchieveErection(slave)) {
					t += `${He}'s got ${his} erection tucked vertically upward under the tight material of ${his} leotard.`;
				} else if (slave.dick > 0) {
					t += `The tight material of ${his} leotard hugs and minimizes the size of ${his} soft member as ${he} moves.`;
				} else {
					t += `The thin crotch piece of ${his} leotard occasionally threatens to ride up between ${his} pussylips as ${he} moves.`;
				}
				break;
			case "a bunny outfit":
				if ((slave.dick > 0) && canAchieveErection(slave)) {
					t += `${He}'s moving uncomfortably, as though ${his} teddy isn't tailored quite perfectly for what ${he}'s got going on in front.`;
				} else if (slave.dick > 0) {
					t += `${His} teddy is tailored well enough to minimize the fact that ${he} isn't a natural woman.`;
				} else {
					t += `As ${he} moves, the satin material of ${his} bunny outfit flashes just a hint of inviting pussy.`;
				}
				break;
			case "harem gauze":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitals are clearly visible through the thin gauze that covers them.`;
				} else if (slave.dick !== 0) {
					t += `${His} dick is clearly visible through the thin gauze that covers it.`;
				} else {
					t += `${His} pussy is clearly visible through the thin gauze that covers it.`;
				}
				break;
			case "pasties":
				t += `${His} crotch pastie is eye-catching as it moves with ${him}.`;
				break;
			case "slutty jewelry":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards ${his} hermaphroditic genitalia with each step.`;
				} else if (slave.dick !== 0) {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards the base of ${his} penis with each step.`;
				} else {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards ${his} mons with each step.`;
				}
				break;
			case "a t-shirt and thong":
			case "a thong":
			case "a tube top and thong":
				t += `You get a good view of ${his} `;
				if (slave.dick > 5) {
					t += `thong and the huge penis hanging out of it.`;
				} else if (slave.dick > 3) {
					t += `thong and the penis that escaped its confines.`;
				} else if (slave.dick !== 0) {
					t += `bulging thong as ${he} moves.`;
				} else {
					t += `thong as ${he} moves.`;
				}
				break;
			case "a bimbo outfit":
				t += `${His} miniskirt is so short it draws the eye right to ${his} `;
				if (slave.dick > 5) {
					t += `thong and the huge penis hanging out of it.`;
				} else if (slave.dick > 3) {
					t += `thong and the penis that escaped its confines.`;
				} else if (slave.dick !== 0) {
					t += `bulging thong.`;
				} else {
					t += `exposed thong.`;
				}
				break;
			case "a courtesan dress":
				t += `${He} is just begging to be splayed out so that ${his} skirt may 'bloom'.`;
				break;
			default:
				if (slave.chastityVagina) {
					t += `${His} chastity belt protects ${him} from vanilla intercourse.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `You get a good view of ${his} cock and pussy: a marvel of modern surgery.`;
				} else if (slave.dick !== 0) {
					t += `You get a good view of ${his} cock.`;
				} else {
					t += `You get a good view of ${his} pussy.`;
				}
		}
		if (dildoLength(slave) > 1) {
			t += `With every motion ${he} makes, ${his} dildo shifts, bulging out ${his} stomach.`;
			if (plugLength(slave) > 1) {
				t += `Beside it, a second bulge caused by ${his} extra long buttplug.`;
			}
		} else if (plugLength(slave) > 1) {
			t += `With every motion ${he} makes, ${his} buttplug shifts, bulging out ${his} stomach.`;
		}

		return t;
	}

	/** Generate dick text for a given slave focused on oral sex
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function suckDickWatch(slave) {
		const {
			he, him, his,
			He, His,
		} = getPronouns(slave);

		target = "fSuckDick";
		// Desc dick and vag
		t += App.Desc.crotch(slave);
		t += ` `;
		t += App.Desc.dick(slave);
		t += ` `;
		switch (slave.clothes) {
			case "a Fuckdoll suit":
				t += `${His} suit is expressly designed to encourage use of ${his} holes and dick.`;
				break;
			case "uncomfortable straps":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the big ring over ${his} hermaphroditic genitalia gleams from between them.`;
				} else if (slave.dick !== 0) {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the ring around the base of ${his} cock gleams from between them.`;
				} else {
					t += `A strap passes `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs, `;
					} else {
						t += `along ${his} perineum, `;
					}
					t += `and the ring over ${his} pussy gleams from between them.`;
				}
				break;
			case "shibari ropes":
				t += `${His} ropes run tightly `;
				if (hasBothLegs(slave)) {
					t += `between ${his} legs, `;
				} else {
					t += `along ${his} perineum, `;
				}
				t += `pressing ${him} closely as ${he} moves.`;
				break;
			case "restrictive latex":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} cock and pussy stick out through a big hole in the latex.`;
				} else if (slave.dick !== 0) {
					t += `${His} cock sticks out through a hole in the latex.`;
				} else {
					t += `As one of the only islands in the sea of `;
					if (!(slave.clothingBaseColor)) {
						t += `black `;
					}
					t += `latex, ${his} pussy is eye-catching.`;
				}
				break;
			case "attractive lingerie for a pregnant woman":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} pretty panties totally fail to restrain ${his} huge cock and balls, which bounce around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} pretty panties totally fail to restrain ${his} huge penis, which flops around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty panties struggle to restrain ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} pretty panties daintily cover ${his} womanhood.`;
				}
				break;
			case "kitty lingerie":
				if (slave.dick > 5) {
					t += `As ${he} moves, ${his} huge penis bulges out from the top of ${his} panties.`;
				} else if (slave.dick > 3) {
					t += `As ${he} moves, ${his} large penis bulges within ${his} panties.`;
				} else if ((slave.dick > 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} dual genitalia.`;
				} else if (slave.dick > 0) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} penis.`;
				} else if (slave.dick !== -1) {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} womanhood.`;
				} else {
					t += `As ${he} moves, ${his} silk panties daintily cover ${his} void groin.`;
				}
				break;
			case "a maternity dress":
				if (slave.dick > 2) {
					t += `As ${he} moves, something occasionally tents the front of ${his} dress.`;
				} else {
					t += `${His} loose dress gives no hints to what's inside it.`;
				}
				break;
			case "stretch pants and a crop-top":
				if (slave.dick > 2) {
					t += `As ${he} moves, something occasionally tents the front of ${his} pants.`;
				} else {
					t += `${His} tight pants don't leave much to the imagination.`;
				}
				break;
			case "attractive lingerie":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} pretty g-string totally fails to restrain ${his} huge cock and balls, which bounce around lewdly in mockery of ${his} lovely appearance.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} pretty g-string totally fails to restrain ${his} huge penis, which flops around lewdly in mockery of ${his} lovely appearance.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} pretty g-string struggles to restrain ${his} hermaphroditic genitalia.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty g-string struggles to restrain ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} pretty g-string daintily covers ${his} womanhood.`;
				}
				break;
			case "a slutty maid outfit":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `${His} apron is cut very short in front. ${His} cock and balls are so big that ${he} hangs out beyond the hem of ${his} apron.`;
				} else if (slave.dick > 4) {
					t += `${His} apron is cut very short in front. ${His} dick is so big that its lower half dangles out of ${his} clothing.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} apron is cut very short in front, revealing frequent glimpses of ${his} dangling cock, and occasional hints of something more.`;
				} else if (slave.dick !== 0) {
					t += `${His} apron is cut very short in front, revealing frequent glimpses of ${his} dangling cock.`;
				} else {
					t += `${His} apron is cut very short in front, revealing occasional glimpses of ${his} womanhood.`;
				}
				break;
			case "a nice maid outfit":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive bulges against the front of ${his} apron.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} apron.`;
				} else {
					t += `${His} apron gives no hint of what's behind it.`;
				}
				break;
			case "a hijab and abaya":
			case "a niqab and abaya":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia bulges the front of ${his} abaya as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia is totally concealed by ${his} abaya.`;
				} else if (slave.dick > 4) {
					t += `${His} penis bulges the front of ${his} abaya as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis is totally concealed by ${his} abaya.`;
				} else if (slave.vagina !== -1) {
					t += `${His} vagina is totally concealed by ${his} abaya.`;
				} else {
					t += `${His} featureless groin is totally concealed by ${his} abaya.`;
				}
				break;
			case "a klan robe":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia bulges the front of ${his} robe as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia is totally concealed by ${his} robe.`;
				} else if (slave.dick > 4) {
					t += `${His} penis bulges the front of ${his} robe as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis is totally concealed by ${his} robe.`;
				} else if (slave.vagina !== -1) {
					t += `${His} vagina is totally concealed by ${his} robe.`;
				} else {
					t += `${His} featureless groin is totally concealed by ${his} robe.`;
				}
				break;
			case "overalls":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} overalls as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} overalls as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} overalls as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} overalls as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} overalls fits snugly on ${his} pussylips.`;
				} else {
					t += `${His} overalls fits snugly on ${his} featureless groin.`;
				}
				break;
			case "a monokini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} monokini as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} monokini as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} monokini as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} monokini as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} monokini clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} monokini clings to ${his} featureless groin as ${he} moves.`;
				}
				break;
			case "an apron":
				if (slave.dick > 4) {
					t += `${His} dick sometimes creates a bulge in ${his} apron as ${he} moves.`;
				} else if ((slave.dick > 0) && (slave.vagina > -1)) {
					t += `${His} apron exposes ${his} hermaphroditic genitalia if ${he} moves too quickly.`;
				} else if (slave.dick > 0) {
					t += `${His} apron exposes ${his} cock if ${he} moves too quickly.`;
				} else if (slave.vagina > -1) {
					t += `${His} apron exposes ${his} featureless groin if ${he} moves too quickly.`;
				} else {
					t += `${His} apron exposes ${his} pussy if ${he} moves too quickly.`;
				}
				break;
			case "a cybersuit":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} bodysuit clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} bodysuit clings to ${his} featureless crotch as ${he} moves.`;
				}
				break;
			case "a tight Imperial bodysuit":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitalia sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick > 4) {
					t += `${His} penis tents out the front of ${his} bodysuit as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} penis sometimes bulges ${his} bodysuit as ${he} moves.`;
				} else if (slave.vagina !== -1) {
					t += `${His} bodysuit clings to ${his} pussylips as ${he} moves.`;
				} else {
					t += `${His} bodysuit clings to ${his} featureless crotch as ${he} moves.`;
				}
				break;
			case "a string bikini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} hermaphroditic genitalia.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} g-string struggles to restrain ${his} hermaphroditic genitalia.`;
				} else if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} huge penis, and occasionally gives ${his} huge scrotum a painful pinch.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} g-string totally fails to restrain ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} pretty white g-string struggles to restrain ${his} penis, which adds to ${his} sluttiness as it escapes.`;
				} else {
					t += `As ${he} moves, ${his} g-string rides up between ${his} pussylips.`;
				}
				break;
			case "a scalemail bikini":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} scalemail bottom fails to conceal ${his} hermaphroditic genitalia.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} scalemail bottom fails to conceal ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} scalemail bottom covers ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} scalemail bottom conceals all.`;
				}
				break;
			case "striped panties":
				if ((slave.dick > 4) && (slave.vagina !== -1)) {
					t += `As ${he} moves, ${his} cute panties fail to conceal ${his} hermaphroditic genitalia.`;
				} else if (slave.dick > 4) {
					t += `As ${he} moves, ${his} cute panties fail to conceal ${his} huge penis.`;
				} else if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} cute panties cover ${his} penis.`;
				} else {
					t += `As ${he} moves, ${his} cute panties conceal all.`;
				}
				break;
			case "clubslut netting":
				if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} bare cock flops around, sticking through its hole in ${his} netting.`;
				} else if (slave.vagina !== -1) {
					t += `As ${he} moves, ${his} bare pussy beckons from its hole in ${his} netting.`;
				} else {
					t += `As ${he} moves, ${his} netting displays ${his} featureless groin.`;
				}
				break;
			case "a cheerleader outfit":
				if (slave.dick !== 0) {
					t += `As ${he} moves, ${his} short pleated cheerleader skirt is bounced forward by something `;
					if (hasBothLegs(slave)) {
						t += `between ${his} legs.`;
					} else {
						t += `at ${his} crotch.`;
					}
				} else {
					t += `As ${he} moves, ${his} short pleated cheerleader skirt shows off ${his} butt.`;
				}
				break;
			case "cutoffs and a t-shirt":
				if ((slave.dick > 4) && (slave.balls > 3)) {
					t += `There's a huge bulge in the front of ${his} cutoffs.`;
				} else if (slave.dick > 1) {
					t += `There's a bulge in the front of ${his} cutoffs.`;
				} else {
					t += `${His} cutoffs conceal ${his} front enticingly.`;
				}
				break;
			case "spats and a tank top":
				if (slave.dick > 4) {
					t += `${His} spats have a large, attention-drawing bulge that looks uncomfortable as ${he} moves around.`;
				} else if (slave.dick > 1) {
					t += `Something bulges against the tight fit of ${his} spats as ${he} moves.`;
				} else {
					t += `${His} spats snugly fit to ${his} crotch as ${he} moves.`;
				}
				break;
			case "a slutty outfit":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts whose holes tantalizingly hint that ${he}'s very unusual `;
					if (hasBothLegs(slave)) {
						t += `between the legs.`;
					} else {
						t += `down there.`;
					}
				} else if (slave.dick > 2) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts so brief that ${his} huge dick occasionally escapes and flops free.`;
				} else if (slave.dick !== 0) {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts whose holes tantalizingly hint that ${he}'s got something other than a pussy `;
					if (hasBothLegs(slave)) {
						t += `between the legs.`;
					} else {
						t += `down there.`;
					}
				} else {
					t += `For today's slutty outfit ${he}'s chosen ripped jean shorts so tight that ${he} sports a raging cameltoe.`;
				}
				break;
			case "a slave gown":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a lovely 'dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} gorgeous dress leaves little to the imagination; there's little doubt ${his} pussy is bare beneath it, and ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} gorgeous dress leaves little to the imagination; ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} gorgeous dress leaves little to the imagination; there's little doubt ${his} pussy is bare beneath it.`;
				}
				break;
			case "a halter top dress":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'beautiful halter top dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} beautiful halter top dress is almost sculpted around ${him}.`;
				}
				break;
			case "an evening dress":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'sensual evening dress' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} sensual evening dress is almost sculpted around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} sensual evening dress is almost sculpted around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} sensual evening dress is almost sculpted around ${him}.`;
				}
				break;
			case "a ball gown":
				if (isAmputee(slave) && (slave.vagina !== -1)) {
					t += `${He}'s wearing a 'fabulous silken ball gown' designed specifically for an amputee.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} fabulous silken ball gown is draped around ${him}, but ${his} cock tents the fabric as ${he} moves.`;
				} else if (slave.dick !== 0) {
					t += `${His} fabulous silken ball gown is draped around ${him}; but ${his} cock tents the fabric as ${he} moves.`;
				} else {
					t += `${His} fabulous silken ball gown is draped around ${him}.`;
				}
				break;
			case "slutty business attire":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive tents the front of ${his} short skirt.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} short skirt.`;
				} else {
					t += `${His} short skirt gives no hint of what's behind it.`;
				}
				break;
			case "a fallen nuns habit":
				if (slave.dick > 0) {
					t += `${His} slutty nun outfit leaves ${his} cock to swing sacrilegiously.`;
				} else {
					t += `${His} slutty nun outfit leaves ${his} pussy totally and sacrilegiously bare.`;
				}
				break;
			case "a chattel habit":
				t += `${His} chattel habit makes ${his} sexual status immediately and encouragingly obvious.`;
				break;
			case "a penitent nuns habit":
				if (slave.dick > 0) {
					t += `${He} moves with painful caution, desperately trying to keep ${his} coarse habit from chafing ${his} dick raw.`;
				} else {
					t += `${He} moves with painful caution, desperately trying to keep ${his} coarse habit from chafing ${his} pussy raw.`;
				}
				break;
			case "nice business attire":
				if (slave.dick > 4) {
					t += `As ${he} moves, something massive tents the front of ${his} skirt.`;
				} else if (slave.dick > 1) {
					t += `As ${he} moves, something presses against the front of ${his} skirt.`;
				} else {
					t += `Unusually, ${his} businesslike skirt gives no hint of what's behind it.`;
				}
				break;
			case "a slutty nurse outfit":
				t += `${His} tight skirt constantly threatens to ride up in front.`;
				break;
			case "a schoolgirl outfit":
				t += `${His} schoolgirl skirt is so short that it constantly threatens to ride up in front.`;
				break;
			case "a kimono":
				t += `${His} obi demurely covers ${his} front.`;
				break;
			case "a burqa":
				t += `${His} burqa billows slightly as ${he} moves.`;
				break;
			case "a bra":
			case "a button-up shirt":
			case "a sweater":
			case "a tank-top":
			case "a tube top":
			case "a striped bra":
			case "a sports bra":
			case "a t-shirt":
			case "an oversized t-shirt":
				t += `${His} clothing leaves ${his} genitals bare and visible.`;
				break;
			case "a button-up shirt and panties":
			case "a slutty klan robe":
			case "a sweater and panties":
			case "a tank-top and panties":
			case "an oversized t-shirt and boyshorts":
			case "a t-shirt and jeans":
			case "boyshorts":
			case "cutoffs":
			case "leather pants and pasties":
			case "leather pants":
			case "panties":
			case "sport shorts and a t-shirt":
			case "a t-shirt and panties":
			case "panties and pasties":
			case "striped underwear":
			case "sport shorts and a sports bra":
			case "jeans":
			case "a sweater and cutoffs":
			case "leather pants and a tube top":
			case "sport shorts":
				t += `${His} clothing clings to the outline of ${his} genitals.`;
				break;
			case "a gothic lolita dress":
				t += `${His} dress ends halfway down ${his} thighs.`;
				break;
			case "a hanbok":
				t += `${His} hanbok billows slightly as ${he} moves.`;
				break;
			case "a one-piece swimsuit":
				t += `${His} swimsuit clings to the outline of ${his} genitals.`;
				break;
			case "a police uniform":
				t += `${His} trousers cling to the outline of ${his} genitals.`;
				break;
			case "a nice pony outfit":
			case "a slutty pony outfit":
				t += `${His} leather outfit clings tightly to the outline of ${his} genitals.`;
				break;
			case "a skimpy loincloth":
				t += `${His} skimpy loincloth gives frequent glimpses of ${his} bare genitals underneath.`;
				break;
			case "a burkini":
				t += `${His} modest swimwear includes a tunic that ends halfway down ${his} thighs.`;
				break;
			case "a hijab and blouse":
				t += `${His} long skirt billows as ${he} moves.`;
				break;
			case "battledress":
				t += `${His} fatigue trousers are utilitarian and unflattering.`;
				break;
			case "a comfortable bodysuit":
				if (slave.dick !== 0) {
					t += `${His} bodysuit displays every `;
					if (V.showInches === 2) {
						t += `inch `;
					} else {
						t += `centimeter `;
					}
					t += `of ${his} member as ${he} moves.`;
				} else {
					t += `${His} bodysuit shows off ${his} womanhood as ${he} moves.`;
				}
				break;
			case "a leotard":
				if ((slave.dick > 0) && canAchieveErection(slave)) {
					t += `${He}'s got ${his} erection tucked vertically upward under the tight material of ${his} leotard.`;
				} else if (slave.dick > 0) {
					t += `The tight material of ${his} leotard hugs and minimizes the size of ${his} soft member as ${he} moves.`;
				} else {
					t += `The thin crotch piece of ${his} leotard occasionally threatens to ride up between ${his} pussylips as ${he} moves.`;
				}
				break;
			case "a bunny outfit":
				if ((slave.dick > 0) && canAchieveErection(slave)) {
					t += `${He}'s moving uncomfortably, as though ${his} teddy isn't tailored quite perfectly for what ${he}'s got going on in front.`;
				} else if (slave.dick > 0) {
					t += `${His} teddy is tailored well enough to minimize the fact that ${he} isn't a natural woman.`;
				} else {
					t += `As ${he} moves, the satin material of ${his} bunny outfit flashes just a hint of inviting pussy.`;
				}
				break;
			case "harem gauze":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} hermaphroditic genitals are clearly visible through the thin gauze that covers them.`;
				} else if (slave.dick !== 0) {
					t += `${His} dick is clearly visible through the thin gauze that covers it.`;
				} else {
					t += `${His} pussy is clearly visible through the thin gauze that covers it.`;
				}
				break;
			case "pasties":
				t += `${His} crotch pastie is eye-catching as it moves with ${him}.`;
				break;
			case "slutty jewelry":
				if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards ${his} hermaphroditic genitalia with each step.`;
				} else if (slave.dick !== 0) {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards the base of ${his} penis with each step.`;
				} else {
					t += `${His} belt of light chain has a lewd bauble over ${his} stomach; its weight pulls it down towards ${his} mons with each step.`;
				}
				break;
			case "a t-shirt and thong":
			case "a thong":
			case "a tube top and thong":
				t += `You get a good view of ${his} `;
				if (slave.dick > 5) {
					t += `thong and the huge penis hanging out of it.`;
				} else if (slave.dick > 3) {
					t += `thong and the penis that escaped its confines.`;
				} else if (slave.dick !== 0) {
					t += `bulging thong as ${he} moves.`;
				} else {
					t += `thong as ${he} moves.`;
				}
				break;
			case "a bimbo outfit":
				t += `${His} miniskirt is so short it draws the eye right to ${his} `;
				if (slave.dick > 5) {
					t += `thong and the huge penis hanging out of it.`;
				} else if (slave.dick > 3) {
					t += `thong and the penis that escaped its confines.`;
				} else if (slave.dick !== 0) {
					t += `bulging thong.`;
				} else {
					t += `exposed thong.`;
				}
				break;
			case "a courtesan dress":
				t += `${He} is just begging to be splayed out so that ${his} skirt may 'bloom'.`;
				break;
			default:
				if (slave.chastityVagina) {
					t += `${His} chastity belt protects ${him} from vanilla intercourse.`;
				} else if ((slave.dick !== 0) && (slave.vagina !== -1)) {
					t += `You get a good view of ${his} cock and pussy: a marvel of modern surgery.`;
				} else if (slave.dick !== 0) {
					t += `You get a good view of ${his} cock.`;
				} else {
					t += `You get a good view of ${his} pussy.`;
				}
		}
		if (dildoLength(slave) > 1) {
			t += `With every motion ${he} makes, ${his} dildo shifts, bulging out ${his} stomach.`;
			if (plugLength(slave) > 1) {
				t += `Beside it, a second bulge caused by ${his} extra long buttplug.`;
			}
		} else if (plugLength(slave) > 1) {
			t += `With every motion ${he} makes, ${his} buttplug shifts, bulging out ${his} stomach.`;
		}
		t += `You lick your lips.`;

		return t;
	}

	/** Generate anus text for a given slave
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function anusWatch(slave) {
		const {
			he, him, his, boy,
			He, His,
		} = getPronouns(slave);

		target = "fAnus";

		t += App.Desc.anus(slave);
		if (slave.chastityAnus === 0) {
			t += ` `;
			switch (slave.clothes) {
				case "a Fuckdoll suit":
					t += `${His} suit is expressly designed to encourage use of ${his} rear hole.`;
					break;
				case "uncomfortable straps":
					t += `The ring over ${his} asshole beckons.`;
					break;
				case "shibari ropes":
					t += `The rope between ${his} buttocks presses lewdly against ${his} anus as ${he} moves.`;
					break;
				case "restrictive latex":
					if (slave.clothingBaseColor) {
						t += `As some of the only islands in the sea of latex, ${his} holes are eye-catching.`;
					} else {
						t += `As some of the only islands in the sea of black latex, ${his} holes are eye-catching.`;
					}
					break;
				case "a fallen nuns habit":
					t += `${His} slutty nun outfit leaves ${his} butthole bare and available for anal sin.`;
					break;
				case "a chattel habit":
					t += `${His} chattel habit covers ${his} anus with a strip of cloth, but it's designed to be lifted readily.`;
					break;
				case "a penitent nuns habit":
					t += `${His} habit chafes ${his} rear end so cruelly that it would probably be a relief to ${him} to have it pulled up for a rough buttfuck.`;
					break;
				case "attractive lingerie":
					if (slave.anus > 1 && !hasAnyLegs(slave)) {
						t += `${His} pretty g-string frequently fails to cover ${his} big butthole.`;
						break;
					} else if (slave.anus > 1) {
						t += `As ${he} moves, ${his} pretty g-string frequently fails to cover ${his} big butthole.`;
						break;
					} else {
						t += `As ${he} moves, ${his} pretty g-string draws your attention to ${his} ass.`;
					}
					break;
				case "a succubus outfit":
					t += `${His} succubus outfit's tail holds ${his} skirt up high in back, inviting a damning buttfuck.`;
					break;
				case "a nice maid outfit":
					t += `${His} long maid's skirt will have to be gotten out of the way to permit access to ${his} ass.`;
					break;
				case "a slutty maid outfit":
					t += `${His} short maid's skirt can be lifted to reveal ${his} bare buttocks.`;
					break;
				case "a slutty nurse outfit":
					t += `${His} tight skirt flatters ${his} ass as ${he} moves.`;
					break;
				case "a schoolgirl outfit":
					if (slave.anus === 0) {
						t += `This school${boy} clearly needs to lose ${his} anal virginity.`;
					} else if (slave.vagina === 0) {
						t += `This school${boy} clearly takes it up the ass; that way, ${he} can remain a virgin, and be, like, totally pure and innocent.`;
					} else {
						t += `This school${boy} clearly takes it up the ass.`;
					}
					break;
				case "a kimono":
					t += ` While ${his} kimono may demurely cover ${his} behind, you know ${his} asshole is bare under it.`;
					break;
				case "attractive lingerie for a pregnant woman":
					t += `${His} silken panties are just begging to be torn off.`;
					break;
				case "a maternity dress":
					t += `${His} dress could easily be slide up over ${his} butt to expose ${his} backdoor.`;
					break;
				case "stretch pants and a crop-top":
					t += `${He} can easily be pantsed to reveal ${his} bare buttocks.`;
					break;
				case "a hijab and abaya":
				case "a niqab and abaya":
					t += `While ${his} abaya totally covers ${his} behind, it can be easily lifted to reveal ${his} asshole.`;
					break;
				case "a klan robe":
					t += `While ${his} robe totally covers ${his} behind, it can be lifted to reveal ${his} asshole.`;
					break;
				case "a burqa":
					t += `While ${his} burqa totally covers ${his} behind, it can be lifted to reveal ${his} asshole.`;
					break;
				case "an oversized t-shirt":
					t += `${His} t-shirt may be oversized, but it does little to hide ${his} asshole.`;
					break;
				case "a tube top and thong":
				case "a thong":
				case "a t-shirt and thong":
					if (slave.anus > 1 && !hasAnyLegs(slave)) {
						t += `${His} thong frequently fails to cover ${his} big butthole.`;
						break;
					} else if (slave.anus > 1) {
						t += `As ${he} moves, ${his} thong frequently fails to cover ${his} big butthole.`;
						break;
					} else {
						t += `As ${he} moves, ${his} thong draws your attention to ${his} ass.`;
					}
					break;
				case "a bra":
				case "a button-up shirt":
				case "a sweater":
				case "a tank-top":
				case "a tube top":
				case "a striped bra":
				case "a slutty klan robe":
				case "a sports bra":
				case "a t-shirt":
				case "pasties":
					t += `${His} outfit exposes ${his} bare butt and vulnerable asshole.`;
					break;
				case "an oversized t-shirt and boyshorts":
				case "boyshorts":
					t += `${His} boyshorts are tight enough to give hints of ${his} asshole.`;
					break;
				case "a button-up shirt and panties":
				case "a sweater and panties":
				case "a tank-top and panties":
				case "panties":
				case "a t-shirt and panties":
				case "panties and pasties":
				case "striped underwear":
					t += `${His} tightly clinging panties can be pulled aside to reveal ${his} asshole.`;
					break;
				case "cutoffs":
				case "sport shorts and a t-shirt":
				case "sport shorts":
				case "a sweater and cutoffs":
				case "sport shorts and a sports bra":
					t += `${His} shorts are practically begging to be pulled down to reveal ${his} naked butthole.`;
					break;
				case "a police uniform":
				case "a t-shirt and jeans":
				case "leather pants":
				case "jeans":
				case "leather pants and a tube top":
				case "leather pants and pasties":
					t += `${His} pants are practically begging to be pulled down to reveal ${his} naked butthole.`;
					break;
				case "a nice pony outfit":
				case "a slutty pony outfit":
					t += `${His} leather outfit is practically sculpted to fit ${his} ass, though would need to be undone to reach ${his} butthole.`;
					break;
				case "a skimpy loincloth":
					t += `${His} loincloth gives hints of ${his} bare ass and asshole beneath it.`;
					break;
				case "a gothic lolita dress":
					t += `${His} dress can be lifted easily to reveal ${his} asshole.`;
					break;
				case "a hanbok":
					t += `${His} hanbok can be lifted easily to reveal ${his} asshole.`;
					break;
				case "a one-piece swimsuit":
					t += `${His} swimsuit tightly clings to ${his} rear, but `;
					if (slave.butt > 3) {
						t += `${his} butt is too large to easily pull it aside and reach ${his} asshole.`;
					} else {
						t += `can be easily pulled aside to reveal ${his} asshole.`;
					}
					break;
				case "a burkini":
					t += `${His} burkini modestly covers ${his} rear.`;
					break;
				case "a hijab and blouse":
					t += `${His} modest skirt can be easily lifted to reveal ${his} asshole.`;
					break;
				case "battledress":
					t += `${His} fatigue trousers are not particularly flattering to ${his} butt but could be pulled down easily enough.`;
					break;
				case "a monokini":
					t += `The bottom of ${his} monokini is practically sculpted to fit ${his} ass.`;
					break;
				case "a cybersuit":
					t += `As ${his} buttocks work naturally with ${his} movement, ${his} tight bodysuit gives hints of ${his} asshole.`;
					break;
				case "a tight Imperial bodysuit":
					t += `As ${his} buttocks work naturally with ${his} movement, ${his} tight cybernetic bodysuit gives hints of ${his} asshole.`;
					break;
				case "a string bikini":
					if (slave.anus > 1) {
						t += `As ${he} moves, ${his} big butthole is clearly visible behind ${his} tiny g-string.`;
					} else {
						t += `As ${he} moves, ${his} tiny g-string draws your attention to ${his} ass.`;
					}
					break;
				case "a scalemail bikini":
					t += `${His} scalemail bottom draws attention to ${his} ass cheeks, while concealing ${his} rear hole.`;
					break;
				case "striped panties":
					t += `${His} cute panties draw attention to ${his} ass cheeks, while concealing ${his} rear hole.`;
					break;
				case "clubslut netting":
					t += `As ${he} moves, the hole in ${his} netting right over ${his} butthole looks inviting.`;
					break;
				case "a cheerleader outfit":
					t += `As ${he} moves, ${his} short pleated cheerleader skirt shows off ${his} butt.`;
					break;
				case "cutoffs and a t-shirt":
					t += `As ${he} moves, ${his} tight cutoffs flatter ${his} butt.`;
					break;
				case "spats and a tank top":
					t += `${His} spats show off every curve of ${his} ass.`;
					break;
				case "a slutty outfit":
					t += `For today's slutty outfit ${he}'s chosen `;
					if (slave.butt > 5) {
						t += `a leather skirt with zippers that permit ready access to ${his} butt.`;
					} else {
						t += `fishnets with a hole cut over ${his} asshole so ${he} can be sodomized without removing or damaging ${his} clothing.`;
					}
					break;
				case "a slave gown":
					t += `${His} gorgeous dress leaves little to the imagination; there's little doubt ${his} butt is bare beneath it.`;
					break;
				case "a halter top dress":
					t += `${His} dress should slide up over ${his} butt to reveal ${his} backdoor.`;
					break;
				case "an evening dress":
					t += `${His} dress should slide up over ${his} butt to reveal ${his} backdoor.`;
					break;
				case "a ball gown":
					t += `${His} ball gown and its petticoats could easily be flipped up to bare ${his} butt.`;
					break;
				case "slutty business attire":
					t += `${His} short skirt will easily slide up to bare ${his} asshole.`;
					break;
				case "nice business attire":
					t += `${His} conservative skirt can be slid up over ${his} hips to bare ${his} butthole.`;
					break;
				case "a comfortable bodysuit":
					t += `${His} bodysuit demands attention for ${his} tightly clad backdoor.`;
					break;
				case "a latex catsuit":
					t += `${His} latex catsuit's crotch zipper offers ready access to ${his} backdoor.`;
					break;
				case "a military uniform":
					t += `${His} uniform skirt can be slid up over ${his} hips to bare ${his} butthole.`;
					break;
				case "a confederate army uniform":
				case "a schutzstaffel uniform":
					t += `${His} uniform's trousers can be easily slid down to expose ${his} butthole.`;
					break;
				case "a slutty schutzstaffel uniform":
					t += `${His} uniform miniskirt can be easily slid up over ${his} hips to bare ${his} butthole.`;
					break;
				case "a red army uniform":
					t += `${His} uniform skirt can be slid up over ${his} hips to bare ${his} butthole.`;
					break;
				case "a long qipao":
					t += `${His} dress can be slid up over ${his} hips to bare ${his} butthole.`;
					break;
				case "battlearmor":
					t += `${His} armor demands attention for ${his} tightly clad backdoor.`;
					break;
				case "Imperial Plate":
					t += `${His} ultra-heavy armor somehow manages to draw attention to the plated curvature of ${his} tight, heavily-armored backdoor. You suppose you could retract just the back-plating.`;
					break;
				case "a mounty outfit":
					t += `${His} uniform slacks can be slipped off ${his} hips to bare ${his} butthole.`;
					break;
				case "a dirndl":
					t += `${His} dress can be easily lifted to access ${his} bare ass.`;
					break;
				case "lederhosen":
					t += `${His} tight shorts can be slipped off ${his} hips to bare ${his} butthole.`;
					break;
				case "a biyelgee costume":
					t += `${His} costume can be easily lifted to access ${his} naked butt.`;
					break;
				case "a nice nurse outfit":
					t += `${His} nurse's trousers can be easily slid down to expose ${his} butthole.`;
					break;
				case "a mini dress":
					t += `${His} mini dress can be easily slid up to expose ${his} butthole.`;
					break;
				case "an apron":
					t += `${His} apron leaves ${his} asshole completely exposed.`;
					break;
				case "overalls":
					t += `${His} overalls totally cover ${his} asshole.`;
					break;
				case "a leotard":
					t += `As ${his} buttocks work naturally with ${his} movement, ${his} tight leotard gives hints of ${his} asshole.`;
					break;
				case "a bunny outfit":
					t += `${His} fluffy white cottontail draws attention to ${his} butt, inevitably bringing anal to mind.`;
					break;
				case "harem gauze":
					t += `${His} ass is clearly visible through the thin gauze that covers it.`;
					break;
				case "a toga":
					t += `${His} toga is so transparent it can't hide ${his} asscrack, which looks very seductive.`;
					break;
				case "a huipil":
					t += `${His} huipil can be easily lifted to access ${his} naked butt.`;
					break;
				case "slutty jewelry":
					t += `${His} belt of light chain threatens to dip into ${his} asscrack with each step.`;
					break;
				case "a bimbo outfit":
					t += `${His} scandalously short miniskirt leaves ${his} ass hanging out and begging for it.`;
					break;
				case "a courtesan dress":
					t += `As ${he} moves, you catch tantalizing glimpses of ${his} ass beneath the petals.`;
					break;
				default:
					if (slave.chastityVagina) {
						t += `${His} chastity belt leaves ${his} ass available.`;
					} else if (slave.race === "catgirl") {
						t += `${his} tail swishes around above the tip of ${his} asscrack, drawing the eye to ${his} swaying, feline butt.`;
					} else {
						t += `You run your eye over ${his} naked ass.`;
					}
			}
		}

		t += ` `;

		return t;
	}

	/** Generate lip/mouth text for a given slave
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	function lipWatch(slave) {
		const {
			he, him, his,
			His,
		} = getPronouns(slave);

		t += App.Desc.face(slave);
		t += ` `;
		t += App.Desc.mouth(slave);
		t += ` `;
		switch (slave.collar) {
			case "uncomfortable leather":
				t += `${His} uncomfortable leather collar makes ${him} swallow and lick ${his} lips periodically, making it look like ${he}'s offering oral even though ${he}'s just trying to relieve the discomfort.`;
				break;
			case "tight steel":
			case "cruel retirement counter":
				t += `${His} tight steel collar makes ${him} swallow and lick ${his} lips periodically, making it look like ${he}'s offering oral even though ${he}'s just trying to relieve the discomfort.`;
				break;
			case "preg biometrics":
				t += `${His} collar reveals everything about ${his} womb, bringing eyes straight to ${his} belly before drawing them back to ${his} neck.`;
				break;
			case "shock punishment":
				t += `${His} shock collar rests threateningly at ${his} throat, ready to compel ${him} to do anything you wish.`;
				break;
			case "neck corset":
				t += `${His} fitted neck corset keeps ${his} breaths shallow, and ${his} head posture rigidly upright.`;
				break;
			case "stylish leather":
				t += `${His} stylish leather collar is at once a fashion statement, and a subtle indication of ${his} enslavement.`;
				break;
			case "satin choker":
				t += `${His} elegant satin choker is at once a fashion statement, and a subtle indication of ${his} enslavement.`;
				break;
			case "silk ribbon":
				t += `${His} delicate, fitted silken ribbon is at once a fashion statement, and a subtle indication of ${his} enslavement.`;
				break;
			case "heavy gold":
				t += `${His} heavy gold collar draws attention to the sexual decadence of ${his} mouth.`;
				break;
			case "pretty jewelry":
			case "nice retirement counter":
				t += `${His} pretty necklace can hardly be called a collar, but it's just slavish enough to hint that the throat it rests on is available.`;
				break;
			case "bell collar":
				t += `${His} little bell tinkles merrily whenever ${he} moves, dispelling any grace or gravity.`;
				break;
			case "leather with cowbell":
				t += `${His} cowbell tinkles merrily whenever ${he} moves, instantly dispelling any grace or gravity.`;
				break;
			case "bowtie":
				t += `${His} black bowtie contrasts with ${his} white collar, drawing the eye towards ${his} neck and face.`;
				break;
			case "neck tie":
				t += `${His} neck tie is a reminder of old world business, although ${his} body is a reminder of the oldest business in the world.`;
				break;
			case "ancient Egyptian":
				t += `${His} wesekh glints richly as ${he} moves, sparkling with opulence and sensuality.`;
				break;
			default:
				if (slave.clothes === "a Fuckdoll suit") {
					t += `${His} suit is expressly designed to encourage use of ${his} face hole.`;
				} else {
					t += `${His} unadorned `;
					if (slave.race === "catgirl") {
						t += `lips and the threatening fangs underneath make an exciting, dangerous target.`;
					} else if (V.PC.dick !== 0) {
						t += `throat is just waiting to be wrapped around a thick shaft.`;
					} else {
						t += `lips are just begging for a cunt to lavish attention on.`;
					}
				}
		}
		switch (slave.mouthAccessory) {
			case "dildo gag":
				t += `${His} ring gag would make ${him} ready for oral service, as soon as the formidable dildo it secures down ${his} throat is removed.`;
				break;
			case "massive dildo gag":
				t += `Your eyes are drawn to the distinct bulge in ${his} throat caused by the enormous dildo in it, though ${his} mouth would only be suitable for the largest of cocks right now.`;
				break;
			case "ball gag":
				t += `${His} ball gag uncomfortably holds ${his} jaw apart as it fills ${his} mouth.`;
				break;
			case "bit gag":
				t += `${His} bit gag uncomfortably keeps ${him} from closing ${his} jaw; drool visibly pools along the corners of ${his} mouth, where the rod forces back ${his} cheeks.`;
				break;
			case "ring gag":
				t += `${His} ring gag uncomfortably keeps ${him} from closing ${his} mouth; drool visibly pools around ${his} tongue, and trickles down ${his} chin unless ${he} can keep ${his} head back.`;
				break;
		}

		switch (slave.faceAccessory) {
			case "porcelain mask":
				t += `${His} beautiful porcelain mask hides ${his} face and any unsightly facial features.`;
				break;
		}

		if (jsRandom(1, 3) === 1) {
			target = "fKiss";
		} else {
			target = "fLips";
		}

		return t;
	}

	return walkPast;
})();
