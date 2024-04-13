App.UI.fsPassage = function() {
	const arc = V.arcologies[0];
	const arcInfo = new App.Utils.Arcology(arc);
	V.FSReminder = 0;
	const FSCredits = FutureSocieties.availCredits();
	setup();

	V.nextButton = "Back";
	V.nextLink = "Main";
	App.UI.StoryCaption.encyclopedia = "Future Societies";

	const f = new DocumentFragment();

	if (V.cheatMode) {
		App.UI.DOM.appendNewElement("div", f, App.UI.DOM.passageLink(
			"Cheat Edit Future Society",
			"MOD_Edit Arcology Cheat",
			() => {
				V.cheater = 1;
			}
		), "cheat-menu");
	}

	App.UI.DOM.appendNewElement("h1", f, "Future Societies");

	f.append(overview());
	f.append(FSPerception());
	f.append(unlocks());
	f.append(spending());
	f.append(rename());
	f.append(selectFS());

	App.UI.DOM.appendNewElement("h2", f, "Facility Redecoration");

	f.append(App.UI.facilityRedecoration());
	return f;

	/**
	 * FIRST FS STORING FOR RIVALRY
	 */
	function setup() {
		if (V.rival.FS.name === "") {
			if (arcInfo.fsActive('FSSubjugationist')) {
				V.rival.FS.name = "Racial Subjugationism";
				V.rival.FS.race = arc.FSSubjugationistRace;
			}
			if (arcInfo.fsActive('FSSupremacist')) {
				V.rival.FS.name = "Racial Supremacism";
				V.rival.FS.race = arc.FSSupremacistRace;
			}
			if (arcInfo.fsActive('FSGenderRadicalist')) {
				V.rival.FS.name = "Gender Radicalism";
			} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
				V.rival.FS.name = "Gender Fundamentalism";
			}
			if (arcInfo.fsActive('FSRepopulationFocus')) {
				V.rival.FS.name = "Repopulation Focus";
			} else if (arcInfo.fsActive('FSRestart')) {
				V.rival.FS.name = "Eugenics";
			}
			if (arcInfo.fsActive('FSPaternalist')) {
				V.rival.FS.name = "Paternalism";
			} else if (arcInfo.fsActive('FSDegradationist')) {
				V.rival.FS.name = "Degradationism";
			}
			if (arcInfo.fsActive('FSBodyPurist')) {
				V.rival.FS.name = "Body Purism";
			} else if (arcInfo.fsActive('FSTransformationFetishist')) {
				V.rival.FS.name = "Transformation Fetishism";
			}
			if (arcInfo.fsActive('FSYouthPreferentialist')) {
				V.rival.FS.name = "Youth Preferentialism";
			} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
				V.rival.FS.name = "Maturity Preferentialism";
			}
			if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
				V.rival.FS.name = "Slimness Enthusiasm";
			} else if (arcInfo.fsActive('FSAssetExpansionist')) {
				V.rival.FS.name = "Asset Expansionism";
			}
			if (arcInfo.fsActive('FSPastoralist')) {
				V.rival.FS.name = "Pastoralism";
			} else if (arcInfo.fsActive('FSCummunism')) {
				V.rival.FS.name = "Cummunism";
			}
			if (arcInfo.fsActive('FSHedonisticDecadence')) {
				V.rival.FS.name = "Hedonistic Decadence";
			} else if (arcInfo.fsActive('FSPhysicalIdealist')) {
				V.rival.FS.name = "Physical Idealism";
			}
			if (arcInfo.fsActive('FSIntellectualDependency')) {
				V.rival.FS.name = "Intellectual Dependency";
			} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
				V.rival.FS.name = "Slave Professionalism";
			}
			if (arcInfo.fsActive('FSPetiteAdmiration')) {
				V.rival.FS.name = "Petite Admiration";
			} else if (arcInfo.fsActive('FSStatuesqueGlorification')) {
				V.rival.FS.name = "Statuesque Glorification";
			}
			if (arcInfo.fsActive('FSChattelReligionist')) {
				V.rival.FS.name = "Chattel Religionism";
			} else if (arcInfo.fsActive('FSNull')) {
				V.rival.FS.name = "Multiculturalism";
			}
			if (arcInfo.fsActive('FSRomanRevivalist')) {
				V.rival.FS.name = "Roman Revivalism";
			} else if (arcInfo.fsActive('FSNeoImperialist')) {
				V.rival.FS.name = "Neo-Imperialism";
			} else if (arcInfo.fsActive('FSAztecRevivalist')) {
				V.rival.FS.name = "Aztec Revivalism";
			} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
				V.rival.FS.name = "Egyptian Revivalism";
			} else if (arcInfo.fsActive('FSEdoRevivalist')) {
				V.rival.FS.name = "Edo Revivalism";
			} else if (arcInfo.fsActive('FSArabianRevivalist')) {
				V.rival.FS.name = "Arabian Revivalism";
			} else if (arcInfo.fsActive('FSChineseRevivalist')) {
				V.rival.FS.name = "Chinese Revivalism";
			}
		}
	}

	function overview() {
		const el = new DocumentFragment();
		const r = [];
		if (FSCredits > 0) {
			r.push(App.UI.DOM.makeElement("span", `${arc.name}'s society is ready to begin accepting a new societal direction.`, "yellow"));
		} else if (V.FSGotRepCredits >= 3) {
			r.push(`Your society is so radically changed that it is starting to take on a life of its own. The major decisions about its direction have been made.`);
		} else {
			r.push(`You must develop your reputation further for ${arc.name}'s society to be ready for a new societal direction.`);
		}
		App.Events.addNode(el, r, "div");
		return el;
	}

	function FSPerception() {
		const el = new DocumentFragment();
		for (const FS of App.Data.FutureSociety.playerFSNames) {
			if (arc[FS] !== null) {
				App.UI.DOM.appendNewElement("div", el, FutureSocieties.arcSupport(FS, arc));
			}
		}
		return el;
	}

	function unlocks() {
		const el = new DocumentFragment();
		const r = [];
		r.push(`You have unlocked`);
		r.push(App.UI.DOM.makeElement("span", `${num(V.FSGotRepCredits, true)} of ${num(V.FSCreditCount, true)}`, "note"));
		r.push(`possible societal customizations.`);
		App.Events.addNode(el, r, "div");
		return el;
	}

	function spending() {
		const el = new DocumentFragment();
		let r = [];
		V.FSSpending = Number(V.FSSpending) || 0;
		V.FSSpending = Math.clamp(Math.ceil(V.FSSpending / 1000) * 1000, 0, 10000);
		r.push(`You are spending ¤`);
		r.push(App.UI.DOM.makeTextBox(
			V.FSSpending,
			(v) => { V.FSSpending = v; },
			true
		));
		r.push(`each week to support your societal goals.`);
		App.Events.addNode(el, r, "div");
		if (V.FSSpending > 10000) {
			App.UI.DOM.appendNewElement("div", el, `Spending more than ${cashFormat(10000)} weekly is a waste`, "note");
		}
		if (App.FSConformance.anyVectorsDefined()) {
			App.Events.addNode(el, [App.UI.DOM.passageLink("Check own slaves conformance", "Slave FS Conformance")]);
		}
		return el;
	}

	function rename() {
		const el = document.createElement('span');
		el.id = "mass";
		const linkArray = [];

		if (arcInfo.fsActive('FSChattelReligionist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Give all your slaves devotional names",
					() => {
						for (const slave of V.slaves) {
							slave.slaveName = App.Data.misc.chattelReligionistSlaveNames.random();
						}
						refresh();
					}
				)
			);
		}

		if (arcInfo.fsActive('FSPastoralist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Give all your lactating slaves cow names",
					() => {
						for (const slave of V.slaves) {
							if (slave.lactation) {
								slave.slaveName = App.Data.misc.cowSlaveNames.random();
							}
						}
						refresh();
					}
				)
			);
		}

		if (arcInfo.fsActive('FSIntellectualDependency')) {
			linkArray.push(
				App.UI.DOM.link(
					"Give all your idiotic slaves stripper names",
					() => {
						for (const slave of V.slaves) {
							if (slave.intelligence < -15) {
								slave.slaveName = App.Data.misc.bimboSlaveNames.random();
							}
						}
						refresh();
					}
				)
			);
		}

		if (arcInfo.fsActive('FSRomanRevivalist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Rename all your slaves according to Roman custom",
					() => {
						for (const slave of V.slaves) {
							slave.slaveName = App.Data.misc.romanSlaveNames.random();
							slave.slaveSurname = App.Data.misc.romanSlaveSurnames.random();
						}
						refresh();
					}
				)
			);
		} else if (arcInfo.fsActive('FSAztecRevivalist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Rename all your slaves according to ancient Aztec custom",
					() => {
						for (const slave of V.slaves) {
							slave.slaveName = App.Data.misc.aztecSlaveNames.random();
							slave.slaveSurname = 0;
						}
						refresh();
					}
				)
			);
		} else if (arcInfo.fsActive('FSEgyptianRevivalist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Rename all your slaves according to ancient Egyptian custom",
					() => {
						for (const slave of V.slaves) {
							slave.slaveName = App.Data.misc.ancientEgyptianSlaveNames.random();
							slave.slaveSurname = 0;
						}
						refresh();
					}
				)
			);
		} else if (arcInfo.fsActive('FSEdoRevivalist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Rename all your slaves according to feudal Japanese custom",
					() => {
						for (const slave of V.slaves) {
							slave.slaveName = App.Data.misc.edoSlaveNames.random();
							slave.slaveSurname = App.Data.misc.edoSlaveSurnames.random();
						}
						refresh();
					}
				)
			);
		} else if (arcInfo.fsActive('FSAntebellumRevivalist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Rename all your slaves according to old Southern custom",
					() => {
						for (const slave of V.slaves) {
							slave.slaveName = App.Data.misc.antebellumSlaveNames.random();
							slave.slaveSurname = App.Data.misc.antebellumSlaveSurnames.random();
						}
						refresh();
					}
				)
			);
		}
		if (arcInfo.fsActive('FSDegradationist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Rename all your slaves according to Degradationist custom",
					() => {
						for (const slave of V.slaves) {
							DegradingName(slave);
						}
						refresh();
					}
				)
			);
		}

		if (arcInfo.fsActive('FSPaternalist')) {
			linkArray.push(
				App.UI.DOM.link(
					"Rename your obedient slaves according to Paternalist custom",
					() => {
						for (const slave of V.slaves) {
							if (slave.devotion > 20 || (slave.devotion >= -20 && slave.trust < -20)) {
								if (!["Miss", "Ms.", "Mrs."].some(title => slave.slaveName.includes(title))) {
									if (slave.relationship > 4) {
										slave.slaveName = ("Mrs. " + slave.slaveName);
									} else if (slave.actualAge > 24) {
										slave.slaveName = ("Ms. " + slave.slaveName);
									} else {
										slave.slaveName = ("Miss " + slave.slaveName);
									}
								}
							}
						}
						refresh("Obedient slaves renamed.");
					}
				)
			);
		}

		if (arcInfo.fsActive('FSIntellectualDependency')) {
			linkArray.push(
				App.UI.DOM.link(
					"Give all your slaves simple bimbo names",
					() => {
						for (const slave of V.slaves) {
							slave.slaveName = App.Data.misc.bimboSlaveNames.random();
							slave.slaveSurname = 0;
						}
						refresh();
					}
				)
			);
		}

		if (linkArray.length > 0) {
			App.UI.DOM.appendNewElement("h3", el, "Names");
			el.append(App.UI.DOM.generateLinksStrip(linkArray));
		}

		return el;

		function refresh(text = "Slaves renamed.") {
			jQuery("#mass").empty().append(text);
		}
	}

	/** Test what new social effects you'd get if a new FS were added
	 *  This is a good proxy for evaluating whether you'll be able to make it stick or not
	 * @param {FC.FutureSociety} proposedFS
	 */
	function evaluation(proposedFS) {
		const effectCounts = new Map();
		for (const slave of App.SlaveAssignment.reportSlaves(V.slaves)) {
			const slaveEffects = App.SlaveAssignment.saSocialEffects(slave).newForFS(proposedFS);
			for (const effect of slaveEffects) {
				const curVal = effectCounts.get(effect.shortDesc);
				if (curVal) {
					effectCounts.set(effect.shortDesc, curVal + effect.magnitude);
				} else {
					effectCounts.set(effect.shortDesc, effect.magnitude);
				}
			}
		}

		const grid = document.createElement("div");
		grid.classList.add("grid-2columns-auto");
		let avg = 0;
		for (const [key, count] of effectCounts) {
			const className = count < 0 ? "red" : "green";
			App.UI.DOM.appendNewElement("div", grid, count.toString(), [className]);
			App.UI.DOM.appendNewElement("div", grid, key);
			avg += count;
		}
		avg /= V.slaves.length;

		const tip = document.createElement('div');
		tip.classList.add("tip-details");
		if (avg > 1.5) {
			tip.appendChild(document.createTextNode(`Adopting ${FutureSocieties.displayName(proposedFS)} is likely to be straightforward, even against social pressure from your neighbors. Your arcology is already primed to move this direction thanks to your actions, and your slaves are well-aligned with it.`));
		} else if (avg > 0.5) {
			tip.appendChild(document.createTextNode(`Adopting ${FutureSocieties.displayName(proposedFS)} should be relatively painless. Your arcology is already receptive to moving this direction thanks to your actions, and your slaves are aligned with it.`));
		} else if (avg > -0.1) {
			tip.appendChild(document.createTextNode(`Adopting ${FutureSocieties.displayName(proposedFS)} will require investment and effort. Your arcology is not opposed to moving this direction, but it's also not expecting it based on your past actions. To improve your chances, consider first aligning your slaves with ${FutureSocieties.displayAdj(proposedFS)} goals.`));
		} else {
			tip.appendChild(document.createTextNode(`Attempting to adopt ${FutureSocieties.displayName(proposedFS)} with your arcology in its current state will likely result in failure. You should strongly consider aligning your slaves with ${FutureSocieties.displayAdj(proposedFS)} goals before endorsing it.`));
		}
		tip.append(grid);

		const span = document.createElement("span");
		span.classList.add("fs-recommend");
		if (avg > 1.5) {
			span.textContent = "Primed";
			span.classList.add("fs-recommend-great");
		} else if (avg > 0.5) {
			span.textContent = "Receptive";
			span.classList.add("fs-recommend-good");
		} else if (avg > -0.1) {
			span.textContent = "Neutral";
			span.classList.add("fs-recommend-neutral");
		} else {
			span.textContent = "Resistant";
			span.classList.add("fs-recommend-bad");
		}
		span.tabIndex = 0;
		span.classList.add("has-tooltip");
		tippy(span, {
			content: tip,
			placement: "right",
		});
		return span;
	}

	function selectFS() {
		const el = new DocumentFragment();
		let r;
		let p;

		/* Race */
		p = document.createElement("p");
		r = [];
		if (arcInfo.fsActive('FSSupremacist')) {
			r.push(pursuit());
			r.push(`${arc.FSSupremacistRace} superiority.`);
			r.push(activeFS("FSSupremacist"));
		} else {
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Racial Supremacism",
						() => {
							arc.FSSupremacist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a belief in`);
				if (arc.FSSupremacistRace === 0) {
					r.push(`the superiority of a chosen race.`);
				} else {
					r.push(`${arc.FSSupremacistRace} superiority.`);
				}
				r.push(`Select race:`);
				const options = [];
				for (const race of App.Utils.getRaceArrayWithoutParamRace(arc.FSSubjugationistRace)) { // Subjugation race cannot be superior, so remove
					options.push({key: race, name: capFirstChar(race)});
				}
				r.push(App.UI.DOM.makeSelect(options, arc.FSSupremacistRace, race => {
					arc.FSSupremacistRace = /** @type {FC.Race} */ (race);
					App.UI.reload();
				}));
				r.push(evaluation("FSSupremacist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Racial Supremacism:</span> a belief in the superiority of a chosen race.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (arcInfo.fsActive('FSSubjugationist')) {
			r.push(pursuit());
			r.push(`${arc.FSSubjugationistRace} inferiority.`);
			r.push(activeFS("FSSubjugationist"));
		} else {
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Racial Subjugationism",
						() => {
							arc.FSSubjugationist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a belief in`);
				if (arc.FSSubjugationistRace === 0) {
					r.push(`the inferiority of a chosen race.`);
				} else {
					r.push(`${arc.FSSubjugationistRace} inferiority.`);
				}
				r.push(`Select race:`);
				const options = [];
				for (const race of App.Utils.getRaceArrayWithoutParamRace(arc.FSSupremacistRace)) { // Superior race cannot be subj, so remove
					options.push({key: race, name: capFirstChar(race)});
				}
				r.push(App.UI.DOM.makeSelect(options, arc.FSSubjugationistRace, race => {
					arc.FSSubjugationistRace = /** @type {FC.Race} */ (race);
					App.UI.reload();
				}));
				r.push(evaluation("FSSubjugationist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Racial Subjugationism:</span> a belief in the inferiority of a subject race.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* Preg vs Eugenics */
		if (V.seePreg !== 0) {
			p = document.createElement("p");
			r = [];
			if (!arcInfo.fsActive('FSRestart')) {
				if (arcInfo.fsActive('FSRepopulationFocus')) {
					r.push(pursuit());
					r.push(`the belief that mass breeding will save humanity.`);
					r.push(activeFS("FSRepopulationFocus", ["boughtItem.clothing.maternityLingerie", "boughtItem.clothing.maternityDress", "boughtItem.clothing.belly"]));
				} else {
					if (FSCredits > 0) {
						r.push(
							App.UI.DOM.link(
								"Repopulation Efforts",
								() => {
									arc.FSRepopulationFocus = 4 + arc.FSRepopulationFocusInterest - arc.FSEugenicsInterest;
									arc.FSRepopulationFocusPregPolicy = 0;
									arc.FSRepopulationFocusMilfPolicy = 0;
									App.UI.reload();
								}
							)
						);
						r.push(`is a focus on mass breeding in order to repopulate the future world.`);
						r.push(evaluation("FSRepopulationFocus"));
					} else {
						/* <span class="note"><span style="font-weight:Bold">Repopulation Efforts:</span> societal fetishization of pregnancy.</span>*/
					}
				}
			}
			App.Events.addNode(p, r, "div");
			r = [];
			if (!arcInfo.fsActive('FSRepopulationFocus')) {
				if (arcInfo.fsActive('FSRestart')) {
					if (arc.FSRestartDecoration !== 100) {
						r.push(pursuit());
						r.push(`Eugenics.`);
						r.push(activeFS("FSRestart"));
					} else {
						r.push(App.UI.DOM.makeElement("span", "You have established", "bold"));
						r.push(`Eugenics.`);
						r.push(activeFS("FSRestart"));
						r.push(`The Societal Elite exist as the highest class, allowing you access to all manner of benefits.`);
					}
				} else {
					if (FSCredits > 0) {
						r.push(
							App.UI.DOM.link(
								"Eugenics",
								() => {
									arc.FSRestart = 4 + arc.FSEugenicsInterest - arc.FSRepopulationFocusInterest;
									arc.FSRepopulationFocusPregPolicy = 0;
									arc.FSRepopulationFocusMilfPolicy = 0;
									App.UI.reload();
								}
							)
						);
						r.push(`is rebuilding society using restrictive breeding programs reserved solely for society's finest.`);
						r.push(evaluation("FSRestart"));
					} else {
						/* <span class="note"><span style="font-weight:Bold">Complete Societal Reconstruction:</span> rebuilding society based off the elite.</span>*/
					}
				}
			}
			App.Events.addNode(p, r, "div");
			el.append(p);
		}

		/* Pro vs Dependant */
		p = document.createElement("p");
		r = [];
		if (!arcInfo.fsActive('FSSlaveProfessionalism')) {
			if (arcInfo.fsActive('FSIntellectualDependency')) {
				r.push(pursuit());
				r.push(`intellectual dependency, a belief that slaves should be airheaded, horny and fully dependent on their owners.`);
				r.push(activeFS("FSIntellectualDependency", ["boughtItem.clothing.bimbo"]));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Intellectual Dependency",
							() => {
								arc.FSIntellectualDependency = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is a belief that slaves should be airheaded, horny and fully dependent on their owners.`);
					r.push(evaluation("FSIntellectualDependency"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Intellectual Dependency:</span> a belief that slaves should be airheaded, horny and fully dependent on their owners.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSIntellectualDependency')) {
			if (arcInfo.fsActive('FSSlaveProfessionalism')) {
				r.push(pursuit());
				r.push(`slave professionalism, a focus on smart, refined, altogether perfect slaves.`);
				r.push(activeFS("FSSlaveProfessionalism", ["boughtItem.clothing.courtesan"]));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Slave Professionalism",
							() => {
								arc.FSSlaveProfessionalism = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is increased interest in smart, refined, altogether perfect slaves.`);
					r.push(evaluation("FSSlaveProfessionalism"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Slave Professionalism:</span> increased interest in smart, refined, altogether perfect slaves.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* Gender */
		p = document.createElement("p");
		r = [];
		if (V.seeDicks !== 0 || V.makeDicks === 1) {
			if (!arcInfo.fsActive('FSGenderFundamentalist')) {
				if (arcInfo.fsActive('FSGenderRadicalist')) {
					r.push(pursuit());
					r.push(`a radical redefinition of gender that identifies powerful people as male, and everyone else as female.`);
					r.push(activeFS("FSGenderRadicalist"));
				} else {
					if (FSCredits > 0) {
						r.push(
							App.UI.DOM.link(
								"Gender radicalism",
								() => {
									arc.FSGenderRadicalist = 4;
									App.UI.reload();
								}
							)
						);
						r.push(`is a radical redefinition of gender that identifies powerful people as male, and everyone else as female.`);
						r.push(evaluation("FSGenderRadicalist"));
					} else {
						/* <span class="note"><span style="font-weight:Bold">Gender radicalism:</span> a radical redefinition of gender that identifies powerful people as male, and everyone else as female.</span>*/
					}
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSGenderRadicalist')) {
			if (arcInfo.fsActive('FSGenderFundamentalist')) {
				r.push(pursuit());
				r.push(`gender traditionalism, including a societal preference for feminine slaves ${(V.seePreg !== 0) ? ` and support for slave pregnancy` : ``}.`);
				r.push(activeFS("FSGenderFundamentalist", ["boughtItem.clothing.bunny"]));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Gender traditionalism",
							() => {
								arc.FSGenderFundamentalist = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is a societal preference for feminine slaves ${(V.seePreg !== 0) ? ` and support for slave pregnancy` : ``}.`);
					r.push(evaluation("FSGenderFundamentalist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Gender traditionalism:</span> a societal preference for feminine slaves
						if (V.seePreg !== 0) {
							r.push(`and support for slave pregnancy`);
						}
						r.push(`.</span>`);*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* Deg vs Paternalist */
		p = document.createElement("p");
		r = [];
		if (!arcInfo.fsActive('FSDegradationist')) {
			if (arcInfo.fsActive('FSPaternalist')) {
				r.push(pursuit());
				r.push(`a vision of slave improvement, including slaves' health, mental well-being, and education.`);
				r.push(activeFS("FSPaternalist", ["boughtItem.clothing.conservative"]));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Paternalism",
							() => {
								arc.FSPaternalist = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is a vision of slave improvement, including slaves' health, mental well-being, and education.`);
					r.push(evaluation("FSPaternalist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Paternalism:</span> a vision of slave improvement, including slaves' health, mental well-being, and education.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSPaternalist')) {
			if (arcInfo.fsActive('FSDegradationist')) {
				r.push(pursuit());
				r.push(`slave degradation, a belief that slaves are not human and should not be treated decently.`);
				r.push(activeFS("FSDegradationist", ["boughtItem.clothing.chains"]));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Degradationism",
							() => {
								arc.FSDegradationist = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is a belief that slaves are not human and should not be treated decently.`);
					r.push(evaluation("FSDegradationist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Degradation:</span> a belief that slaves are not human and should not be treated decently.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* TF vs Purist */
		p = document.createElement("p");
		r = [];
		if (!arcInfo.fsActive('FSTransformationFetishist')) {
			if (arcInfo.fsActive('FSBodyPurist')) {
				r.push(pursuit());
				r.push(`societal disapproval of implant surgery.`);
				r.push(activeFS("FSBodyPurist"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Body Purism",
							() => {
								arc.FSBodyPurist = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is societal disapproval of implant surgery.`);
					r.push(evaluation("FSBodyPurist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Body Purism:</span> societal disapproval of implant surgery.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSBodyPurist')) {
			if (arcInfo.fsActive('FSTransformationFetishist')) {
				r.push(pursuit());
				r.push(`societal fetishization of implant surgery.`);
				r.push(activeFS("FSTransformationFetishist"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Transformation Fetishism",
							() => {
								arc.FSTransformationFetishist = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is societal fetishization of implant surgery.`);
					r.push(evaluation("FSTransformationFetishist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Transformation Fetishism:</span> societal fetishization of implant surgery.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* Maturity vs Youth */
		p = document.createElement("p");
		r = [];
		if (!arcInfo.fsActive('FSMaturityPreferentialist')) {
			if (arcInfo.fsActive('FSYouthPreferentialist')) {
				r.push(pursuit());
				r.push(`an accentuated societal preference for younger slaves.`);
				r.push(activeFS("FSYouthPreferentialist"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Youth Preferentialism",
							() => {
								arc.FSYouthPreferentialist = 4;
								if (V.idealAge >= 30) {
									V.idealAge = 29;
								}
								if (V.targetIdealAge >= 30) {
									V.targetIdealAge = 29;
								}
								if (V.targetIdealAge !== 18) {
									V.policies.idealAge = 1;
								}
								App.UI.reload();
							}
						)
					);
					r.push(`is increased interest in girls just past their majority.`);
					r.push(evaluation("FSYouthPreferentialist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Youth Preferentialism:</span> increased interest in girls just past their majority.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSYouthPreferentialist')) {
			if (arcInfo.fsActive('FSMaturityPreferentialist')) {
				r.push(pursuit());
				r.push(`a societal preference for older women.`);
				r.push(activeFS("FSMaturityPreferentialist"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Maturity Preferentialism",
							() => {
								arc.FSMaturityPreferentialist = 4;
								if (V.idealAge < 30) {
									V.idealAge = 30;
								}
								if (V.targetIdealAge < 30) {
									V.targetIdealAge = 30;
								}
								V.policies.idealAge = 1;
								App.UI.reload();
							}
						)
					);
					r.push(`is increased interest in mature slaves.`);
					r.push(evaluation("FSMaturityPreferentialist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Maturity Preferentialism:</span> increased interest in mature slaves.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* Statuesque vs Petite */
		p = document.createElement("p");
		r = [];
		if (!arcInfo.fsActive('FSStatuesqueGlorification')) {
			if (arcInfo.fsActive('FSPetiteAdmiration')) {
				r.push(pursuit());
				r.push(`an accentuated societal preference for short slaves.`);
				r.push(activeFS("FSPetiteAdmiration"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Petite Admiration",
							() => {
								arc.FSPetiteAdmiration = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is increased interest in short slaves.`);
					r.push(evaluation("FSPetiteAdmiration"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Petite Admiration:</span> increased interest in short slaves.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSPetiteAdmiration')) {
			if (arcInfo.fsActive('FSStatuesqueGlorification')) {
				r.push(pursuit());
				r.push(`a societal fixation on tallness.`);
				r.push(activeFS("FSStatuesqueGlorification"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Statuesque Glorification",
							() => {
								arc.FSStatuesqueGlorification = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is societal fixation on tallness.`);
					r.push(evaluation("FSStatuesqueGlorification"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Statuesque Glorification:</span> societal fixation on tallness.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* Expand vs Slim */
		p = document.createElement("p");
		r = [];
		if (!arcInfo.fsActive('FSAssetExpansionist')) {
			if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
				r.push(App.UI.DOM.makeElement("span", "You are supporting", "bold"));
				r.push(`enthusiasm for slaves with girlish figures.`);
				r.push(activeFS("FSSlimnessEnthusiast"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Slimness Enthusiasm",
							() => {
								arc.FSSlimnessEnthusiast = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is a fashion for slaves with girlish figures.`);
					r.push(evaluation("FSSlimnessEnthusiast"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Slimness Enthusiasm:</span> a fashion for slaves with girlish figures.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSSlimnessEnthusiast')) {
			if (arcInfo.fsActive('FSAssetExpansionist')) {
				r.push(pursuit());
				r.push(`societal hunger for huge assets.`);
				r.push(activeFS("FSAssetExpansionist"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Asset Expansionism",
							() => {
								arc.FSAssetExpansionist = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is societal hunger for huge assets of whatever origin.`);
					r.push(evaluation("FSAssetExpansionist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Asset Expansionism:</span> societal hunger for huge assets of whatever origin.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* Milking stands alone */
		r = [];
		if (arcInfo.fsActive('FSPastoralist')) {
			r.push(pursuit());
			r.push(`societal normalization of slave milking.`);
			r.push(activeFS("FSPastoralist", ["boughtItem.clothing.western"]));
		} else {
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Slave Pastoralism",
						() => {
							arc.FSPastoralist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is societal acceptance of slave products like milk.`);
				r.push(evaluation("FSPastoralist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Slave Pastoralism:</span> societal acceptance of slave products like milk.</span>*/
			}
		}
		App.Events.addNode(el, r, "p");

		/* Physical Idealist vs Hedonist */
		p = document.createElement("p");
		r = [];
		if (!arcInfo.fsActive('FSHedonisticDecadence')) {
			if (arcInfo.fsActive('FSPhysicalIdealist')) {
				r.push(pursuit());
				r.push(`societal reverence for the idealized human form, including height, health and muscle.`);
				r.push(activeFS("FSPhysicalIdealist", ["boughtItem.clothing.oil"]));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Physical Idealism",
							() => {
								arc.FSPhysicalIdealist = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is societal reverence for the idealized human form, including height, health and muscle.`);
					r.push(evaluation("FSPhysicalIdealist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Physical Idealism:</span> societal reverence for the idealized human form, including height, health and muscle.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSPhysicalIdealist')) {
			if (arcInfo.fsActive('FSHedonisticDecadence')) {
				r.push(pursuit());
				r.push(`societal normalization of overindulgence and immediate gratification. Be it food, drink, sex, drugs or whatever one's desire may be.`);
				r.push(activeFS("FSHedonisticDecadence"));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Hedonistic Decadence",
							() => {
								arc.FSHedonisticDecadence = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is societal acceptance of overindulgence and immediate gratification. Be it food, drink, sex, drugs or whatever one's desire may be.`);
					r.push(evaluation("FSHedonisticDecadence"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">HedonisticDecadence:</span> societal acceptance of over indulgence, particularly of food, drink, sex and drugs.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		/* Chattel religionist vs Multicultural */
		p = document.createElement("p");
		r = [];
		if (!arcInfo.fsActive('FSNull')) {
			if (arcInfo.fsActive('FSChattelReligionist')) {
				r.push(pursuit());
				r.push(`a new strain of religion that emphasizes the slaveholding portions of religious history.`);
				r.push(activeFS("FSChattelReligionist", ["boughtItem.clothing.habit"]));
			} else {
				if (FSCredits > 0) {
					r.push(
						App.UI.DOM.link(
							"Chattel Religionism",
							() => {
								arc.FSChattelReligionist = 4;
								App.UI.reload();
							}
						)
					);
					r.push(`is a new strain of religion that emphasizes the slaveholding portions of religious history.`);
					r.push(evaluation("FSChattelReligionist"));
				} else {
					/* <span class="note"><span style="font-weight:Bold">Chattel Religionism:</span> a new strain of religion that emphasizes the slaveholding portions of religious history.</span>*/
				}
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (!arcInfo.fsActive('FSChattelReligionist')) {
			if (arcInfo.fsActive('FSNull')) {
				const freedomArray = [`You are permitting`];
				if (arc.FSNull <= 25) {
					freedomArray.push(`basic`);
				} else if (arc.FSNull <= 50) {
					freedomArray.push(`considerable`);
				} else if (arc.FSNull <= 75) {
					freedomArray.push(`advanced`);
				} else {
					freedomArray.push(`absolute`);
				}
				r.push(App.UI.DOM.makeElement("span", freedomArray.join(" "), "bold"));
				r.push(`cultural freedom in your arcology.`);
			}
			if (V.FSCreditCount === 4) {
				if (arcInfo.fsActive('FSNull')) {
					r.push(activeFS("FSChattelReligionist"));
					if (arc.FSNull <= 25) {
						r.push(abandonRel());
					} else {
						r.push(withdrawRel(25));
					}
					if (FSCredits > 0) {
						if (arc.FSNull < V.FSLockinLevel) {
							r.push("/", advanceRel(25));
						}
					}
				} else {
					if (FSCredits > 0) {
						r.push(MulticulturalismRel(25));
					}
				}
			} else if (V.FSCreditCount === 6) {
				if (arcInfo.fsActive('FSNull')) {
					if (arc.FSNull <= 20) {
						r.push(abandonRel());
					} else {
						r.push(withdrawRel(17));
					}
					if (FSCredits > 0) {
						if (arc.FSNull < V.FSLockinLevel) {
							r.push("/", advanceRel(17));
						}
					}
				} else {
					if (FSCredits > 0) {
						r.push(MulticulturalismRel(17));
					}
				}
			} else if (V.FSCreditCount === 7) {
				if (arcInfo.fsActive('FSNull')) {
					if (arc.FSNull <= 20) {
						r.push(abandonRel());
					} else {
						r.push(withdrawRel(15));
					}
					if (FSCredits > 0) {
						if (arc.FSNull < V.FSLockinLevel) {
							r.push("/", advanceRel(15));
						}
					}
				} else {
					if (FSCredits > 0) {
						r.push(MulticulturalismRel(15));
					}
				}
			} else {
				if (arcInfo.fsActive('FSNull')) {
					if (arc.FSNull <= 20) {
						r.push(abandonRel());
					} else {
						r.push(withdrawRel(20));
					}
					if (FSCredits > 0) {
						if (arc.FSNull < V.FSLockinLevel) {
							r.push("/", advanceRel(20));
						}
					}
				} else {
					if (FSCredits > 0) {
						r.push(MulticulturalismRel(20));
					}
				}
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		function withdrawRel(num) {
			return App.UI.DOM.link(
				"Withdraw",
				() => {
					if (arcInfo.fsActive('FSNull')) {
						arc.FSNull -= num;
					}
					App.UI.reload();
				}
			);
		}

		function abandonRel() {
			return App.UI.DOM.link(
				"Abandon",
				() => {
					FutureSocieties.remove("FSNull");
					App.UI.reload();
				}
			);
		}

		function advanceRel(num) {
			const f = new DocumentFragment();
			f.append(App.UI.DOM.link("Advance", () => {
				if (arcInfo.fsActive('FSNull')) {
					arc.FSNull += num;
				}
				App.UI.reload();
			}));
			App.UI.DOM.appendNewElement("span", f, " Further your commitment to allow your arcology's citizens cultural freedom.", ["note"]);
			return f;
		}

		function MulticulturalismRel(num) {
			const f = new DocumentFragment();
			f.append(App.UI.DOM.link("Multiculturalism", () => {
				arc.FSNull = num;
				App.UI.reload();
			}));
			f.append(` is a commitment to allow your arcology's citizens cultural freedom. It is an alternative to societal advancement, and will not advance naturally.`);
			return f;
		}

		/* Revival section */
		p = document.createElement("p");
		r = [];

		// at most one revivalist FS can be active
		const activeRevivalFS = arcInfo.revivalSociety();

		if (activeRevivalFS === RevivalSociety.ROMAN) {
			r.push(pursuit());
			r.push(`a vision of a new Rome.`);
			r.push(activeFS("FSRomanRevivalist", ["boughtItem.clothing.toga"]));
		} else if (activeRevivalFS === null) {
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Roman Revivalism",
						() => {
							arc.FSRomanRevivalist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a vision of a new Rome.`);
				r.push(evaluation("FSRomanRevivalist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Roman Revivalism:</span> a vision of a new Rome.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];

		if (activeRevivalFS === RevivalSociety.NEO_IMPERIAL) {
			r.push(pursuit());
			r.push(`a vision of a new Imperial Society.`);
			r.push(activeFS("FSNeoImperialist", ["boughtItem.clothing.imperialarmor", "boughtItem.clothing.imperialsuit"]));
		} else if (activeRevivalFS === null){
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Neo-Imperialism",
						() => {
							arc.FSNeoImperialist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a vision of a new Imperial society, integrating high technology and old-world culture under the iron fist of your absolute rule.`);
				r.push(evaluation("FSNeoImperialist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Neo-Imperialism:</span> a vision of a new Imperial Society, integrating high technology and old-world culture under the iron fist of your absolute rule.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (activeRevivalFS === RevivalSociety.AZTEC) {
			r.push(pursuit());
			r.push(`a vision of a new Aztec Empire.`);
			r.push(activeFS("FSAztecRevivalist", ["boughtItem.clothing.huipil"]));
		} else if (activeRevivalFS === null){
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Aztec Revivalism",
						() => {
							arc.FSAztecRevivalist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a vision of a new Aztec Empire.`);
				r.push(evaluation("FSAztecRevivalist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Aztec Revivalism:</span> a vision of a new Aztec Empire.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (activeRevivalFS === RevivalSociety.EGYPTIAN) {
			r.push(pursuit());
			r.push(`a vision of Pharaoh's Egypt.`);
			r.push(activeFS("FSEgyptianRevivalist", ["boughtItem.clothing.egypt"]));
		} else if (activeRevivalFS === null){
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Egyptian Revivalism",
						() => {
							arc.FSEgyptianRevivalist = 4 + arc.FSEgyptianRevivalistInterest;
							arc.FSEgyptianRevivalistIncestPolicy = 0;
							App.UI.reload();
						}
					)
				);
				r.push(`is a vision of a Pharaoh's Egypt.`);
				r.push(evaluation("FSEgyptianRevivalist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Egyptian Revivalism:</span> a vision of Pharaoh's Egypt.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (activeRevivalFS === RevivalSociety.EDO) {
			r.push(pursuit());
			r.push(`a vision of Edo Japan.`);
			r.push(activeFS("FSEdoRevivalist", ["boughtItem.clothing.kimono"]));
		} else if (activeRevivalFS === null){
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Edo Revivalism",
						() => {
							arc.FSEdoRevivalist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a vision of Edo Japan.`);
				r.push(evaluation("FSEdoRevivalist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Edo Revivalism:</span> a vision of Edo Japan.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (activeRevivalFS === RevivalSociety.ARABIAN) {
			r.push(pursuit());
			r.push(`a vision of the Sultanate of old.`);
			r.push(activeFS("FSArabianRevivalist", ["boughtItem.clothing.harem"]));
		} else if (activeRevivalFS === null){
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Arabian Revivalism",
						() => {
							arc.FSArabianRevivalist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a vision of the Sultanate of old.`);
				r.push(evaluation("FSArabianRevivalist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Arabian Revivalism:</span> a vision of the Sultanate of old.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (activeRevivalFS === RevivalSociety.CHINESE) {
			r.push(pursuit());
			r.push(`a vision of ancient China.`);
			r.push(activeFS("FSChineseRevivalist", ["boughtItem.clothing.qipao"]));
		} else if (activeRevivalFS === null){
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Chinese Revivalism",
						() => {
							arc.FSChineseRevivalist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a vision of ancient China.`);
				r.push(evaluation("FSChineseRevivalist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Chinese Revivalism:</span> a vision of ancient China.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		r = [];
		if (activeRevivalFS === RevivalSociety.ANTEBELLUM) {
			r.push(pursuit());
			r.push(`a vision of the Antebellum South.`);
			r.push(activeFS("FSAntebellumRevivalist", ["boughtItem.clothing.antebellum"]));
		} else if (activeRevivalFS === null){
			if (FSCredits > 0) {
				r.push(
					App.UI.DOM.link(
						"Antebellum Revivalism",
						() => {
							arc.FSAntebellumRevivalist = 4;
							App.UI.reload();
						}
					)
				);
				r.push(`is a vision of the Antebellum South.`);
				r.push(evaluation("FSAntebellumRevivalist"));
			} else {
				/* <span class="note"><span style="font-weight:Bold">Antebellum South:</span> a vision of the Antebellum South.</span>*/
			}
		}
		App.Events.addNode(p, r, "div");
		el.append(p);

		return el;

		function pursuit() {
			return App.UI.DOM.makeElement("span", "You are pursuing", "bold");
		}

		/**
		 *
		 * @param {FC.FutureSociety} FS
		 * @param {Array} [itemArray]
		 */
		function activeFS(FS, itemArray) {
			const el = new DocumentFragment();
			const r = [];

			// Abandon
			if (FS === "FSRestart" && V.eugenicsFullControl !== 1) {
				r.push(`The Societal Elite will not permit you to abandon Eugenics.`);
			} else {
				r.push(
					App.UI.DOM.link(
						"Abandon",
						() => {
							FutureSocieties.remove(FS);
							App.UI.reload();
						}
					)
				);
			}

			// Decoration
			r.push(App.UI.FSChangeDecoration(FS, itemArray));

			// Assistant
			if (V.policies.publicPA === 1) {
				if (App.Data.Assistant.appearanceForFS.get(FS).includes(V.assistant.appearance)) {
					const {hisA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
					r.push(`With ${hisA} ${V.assistant.appearance} appearance,`);
					r.push(
						App.UI.DOM.passageLink(V.assistant.name, "Personal assistant options")
					);
					r.push(`is a good public mascot for this goal.`);
				}
			}

			App.Events.addNode(el, r);
			return el;
		}
	}
};
