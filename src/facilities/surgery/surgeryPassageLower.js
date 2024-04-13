/**
 * UI for performing surgery. Refreshes without refreshing the passage.
 * @param {App.Entity.SlaveState} slave
 * @param {()=>void} refresh
 * @param {boolean} [cheat=false]
 * @returns {HTMLElement}
 */
App.UI.surgeryPassageLower = function(slave, refresh, cheat = false) {
	const container = document.createElement("span");
	container.append(content());
	return container;

	function content() {
		const frag = new DocumentFragment();
		// const pubertyAge = Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY);
		const {
			His, He,
			his, he, him
		} = getPronouns(slave);
		// const artificiality = 25 - (5 * Math.trunc(V.PC.skill.medicine / 50)) - (5 * V.surgeryUpgrade);

		App.UI.DOM.appendNewElement("h3", frag, `Butt:`);
		frag.append(butt(), asshole());

		App.UI.DOM.appendNewElement("h3", frag, `Sex:`);
		frag.append(labia(), fertility(), sexDescription(), extraSex());
		if (slave.balls > 0) {
			frag.append(balls());
		}
		frag.append(prostate());

		return frag;

		function butt() {
			const el = new DocumentFragment();
			const r = [];
			r.push(`${He}'s got a`);
			if (slave.butt <= 1) {
				r.push(`flat and ${either("skinny", "slim", "taut")} ass.`);
			} else if (slave.butt <= 2) {
				r.push(`${either("rounded, small", "small but rounded", "small, sleek")} rear end.`);
			} else if (slave.butt <= 3) {
				r.push(`${either("big and healthy", "curved and plump", "healthy and plump")} derrière.`);
			} else if (slave.butt <= 4) {
				r.push(`${either("big bubble", "curvy and enticing", "juicy and large")} butt.`);
			} else if (slave.butt <= 5) {
				r.push(`${either("huge", "juicy and huge", "massive and undeniable")} rear end.`);
			} else if (!hasBothLegs(slave)) {
				r.push(`ridiculous ass. It's so big it would jiggle as ${he} walked — if ${he} could walk.`);
			} else {
				r.push(`ridiculous ass. It's so big it jiggles as ${he} walks.`);
			}

			if (slave.buttImplant > 0) {
				r.push(`${He} has`);
				if (slave.buttImplantType === "string") {
					if (slave.buttImplant > 2) {
						r.push(`massively engorged`);
					}
				} else if (slave.buttImplantType === "normal") {
					if (slave.buttImplant === 1) {
						r.push(`moderate`);
					} else if (slave.buttImplant === 2) {
						r.push(`enormous`);
					} else {
						r.push(`absurd`);
					}
				} else if (slave.buttImplantType === "hyper fillable") {
					if (slave.buttImplant > 19) {
						r.push(`overfilled`);
					} else if (slave.buttImplant < 9) {
						r.push(`underfilled`);
					} else if (slave.buttImplant <= 5) {
						r.push(`deflated`);
					} else {
						r.push(`absurd`);
					}
				} else if (slave.buttImplantType === "advanced fillable") {
					if (slave.buttImplant > 8) {
						r.push(`overfilled`);
					} else if (slave.buttImplant < 5) {
						r.push(`underfilled`);
					} else if (slave.buttImplant <= 3) {
						r.push(`deflated`);
					} else {
						r.push(`massive`);
					}
				} else if (slave.buttImplantType === "fillable") {
					if (slave.buttImplant > 4) {
						r.push(`overfilled`);
					} else if (slave.buttImplant < 3) {
						r.push(`underfilled`);
					} else if (slave.buttImplant === 1) {
						r.push(`deflated`);
					} else {
						r.push(`massive`);
					}
				}
				if (slave.buttImplantType !== "normal") {
					r.push(`${slave.buttImplantType}`);
				}
				r.push(`butt implants.`);
				if (slave.buttImplant > 3 && slave.buttImplantType === "string") {
					r.push(App.UI.DOM.makeElement("span", "Large string based implants are a risk to a slave's health.", "yellow"));
				}
			}
			App.Events.addNode(el, r, "div");

			const surgeries = App.Medicine.Surgery.sizingProcedures.butt(slave, App.Medicine.Surgery.allSizingOptions());
			const surgeryLinks = surgeries.map(s => App.Medicine.Surgery.makeLink(s, refresh, cheat));
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(surgeryLinks), "choices");
			return el;
		}

		function asshole() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			r.push(`${He} has`);
			if (slave.anus === 0) {
				r.push(`a virgin asshole.`);
			} else if (slave.anus === 1) {
				r.push(`a tight asshole.`);
			} else if (slave.anus === 2) {
				r.push(`a loose asshole.`);
			} else if (slave.anus === 3) {
				r.push(`a very loose asshole.`);
			} else {
				r.push(`a permanently gaping asshole.`);
			}
			if (slave.anus > 3) {
				r.push(`${His} anal sphincter could benefit from surgical repair.`);
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.RepairAnus(slave),
					refresh, cheat));
			} else if (V.surgeryUpgrade === 1 && slave.indentureRestrictions < 2) {
				if (slave.anus > 1) {
					r.push(`${His} anal sphincter could benefit from microsurgical rejuvenation.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.TightenAnus(slave),
						refresh, cheat));
				} else if (slave.anus > 0) {
					r.push(`${His} butthole is fairly narrow, but could be tightened to virgin status.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RestoreAnalVirginity(slave),
						refresh, cheat));
				}
			}

			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function labia() {
			const el = new DocumentFragment();
			let r = [];
			let linkArray = [];
			if (slave.vagina > -1) {
				if (slave.labia === 0) {
					r.push(`${He} has minimal pussylips.`);
				} else if (slave.labia === 1) {
					r.push(`${He} has pretty, noticeable pussylips.`);
				} else if (slave.labia === 2) {
					r.push(`${He} has large pussylips.`);
				} else if (slave.labia > 2) {
					r.push(`${He} has extremely large pussylips.`);
				}
				if (slave.labia > 0) {
					if (slave.indentureRestrictions < 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Labiaplasty(slave),
							refresh, cheat));
					}
				}
				if (slave.labia < 3 && V.surgeryUpgrade === 1) {
					if (slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.IncreaseLabia(slave),
							refresh, cheat));
					}
				}
				App.Events.addNode(el, r, "div");
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				if (slave.dick === 0) {
					r = [];
					linkArray = [];
					r.push(`${He} has`);
					if (slave.clit === 0) {
						r.push(`a small clit`);
					} else if (slave.clit === 1) {
						r.push(`a big clit`);
					} else if (slave.clit === 2) {
						r.push(`a huge clit`);
					} else if (slave.clit > 2) {
						r.push(`an enormous clit`);
					}
					if (V.seeCircumcision === 1 && slave.foreskin > 0) {
						r.push(`with a hood.`);
					} else {
						r.push(r.pop() + `.`);
					}

					if (slave.clit > 0) {
						if (slave.indentureRestrictions < 2) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.ClitoralReduction(slave),
								refresh, cheat));
						}
					}
					if (slave.clit < 3 && V.surgeryUpgrade === 1) {
						if (slave.indentureRestrictions < 1) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.ClitoralEnlargement(slave),
								refresh, cheat));
						}
					}
					if (slave.foreskin > 0 && slave.clit > 0) {
						if (V.seeCircumcision === 1) {
							if (slave.indentureRestrictions < 2) {
								linkArray.push(App.Medicine.Surgery.makeLink(
									new App.Medicine.Surgery.Procedures.RemoveClitHood(slave),
									refresh, cheat));
							}
						}
					}
					App.Events.addNode(el, r, "div");
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				}
			}
			return el;
		}

		function fertility() {
			const el = new DocumentFragment();
			let r = [];
			let linkArray = [];

			if (slave.preg > -2 && slave.preg < 1 && (slave.ovaries !== 0 || slave.mpreg !== 0) && slave.pubertyXX === 0) {
				r.push(`${He} has not had ${his} first period.`);
			} else if (slave.preg > -2 && slave.preg < 1 && (slave.ovaries !== 0 || slave.mpreg !== 0)) {
				r.push(`${He} has a working womb.`);
			} else if (slave.preg <= -2 && (slave.ovaries !== 0 || slave.mpreg !== 0)) {
				r.push(`${He} has a sterile womb.`);
			}

			if (isFertile(slave) && slave.preg === 0) {
				linkArray.push(
					App.UI.DOM.passageLink(
						"Artificially inseminate",
						"Artificial Insemination"
					)
				);
			}

			if (slave.ovaries !== 0 || slave.mpreg !== 0) {
				if (slave.preg > -2 && slave.preg < 1) {
					if (slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Sterilize(slave),
							refresh, cheat));
					}
				} else if (slave.preg === -2) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RestoreFertility(slave),
						refresh, cheat));
				}
			}

			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			if (slave.ovaries === 1 || slave.mpreg === 1) {
				r = [];
				linkArray = [];
				if (slave.pubertyXX === 0) {
					r.push(`${He} has`);
					if (slave.eggType !== "human") {
						r.push(slave.eggType);
					}
					r.push(`ovaries but has not had ${his} first period.`);
				} else {
					r.push(`${He} has working`);
					if (slave.eggType !== "human") {
						r.push(slave.eggType);
					}
					r.push(`ovaries${(slave.mpreg) ? ` and a womb attached to ${his} rectum` : ``}.`);
				}

				if (slave.indentureRestrictions > 0) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
				} else {
					if (slave.ovaImplant !== 0) {
						switch (slave.ovaImplant) {
							case "fertility":
								r.push(`They have fertility implants attached to them.`);
								linkArray.push(App.Medicine.Surgery.makeLink(
									new App.Medicine.Surgery.Procedures.RemoveOvaImplant(slave),
									refresh, cheat));
								break;
							case "sympathy":
								r.push(`They are linked via implants and ovulate in concert.`);
								linkArray.push(App.Medicine.Surgery.makeLink(
									new App.Medicine.Surgery.Procedures.RemoveOvaImplant(slave),
									refresh, cheat));
								break;
							case "asexual":
								r.push(`One has been replaced with a sperm producing analog for self-fertilization.`);
						}
					} else {
						if (V.fertilityImplant === 1) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.InstallOvaImplant(slave, "fertility"),
								refresh, cheat));
						}
						if (V.sympatheticOvaries === 1) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.InstallOvaImplant(slave, "sympathy"),
								refresh, cheat));
						}
					}
					App.Events.addNode(el, r, "div");
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				}

				if (slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
					r = [];
					linkArray = [];
					if (slave.ovaries === 1) {
						if (slave.preg > 0) {
							linkArray.push(
								App.UI.DOM.disabledLink(
									"Oophorectomy",
									[`${His} ovaries and womb cannot be removed while ${he} is pregnant.`]
								)
							);
						} else {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.Oophorectomy(slave),
								refresh, cheat));
						}
					}
					if (slave.mpreg === 1) {
						if (slave.preg > 0) {
							linkArray.push(
								App.UI.DOM.disabledLink(
									"Remove anal reproductive organs",
									[`${His} anal womb cannot be removed while ${he} is pregnant.`]
								)
							);
						} else {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.RemoveMPreg(slave),
								refresh, cheat));
						}
					}
					App.Events.addNode(el, r, "div");
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				}

				if (V.seeExtreme === 1 && V.seeHyperPreg === 1 && V.seePreg !== 0 && V.permaPregImplant === 1) {
					r = [];
					linkArray = [];
					if (slave.assignment === Job.DAIRY && V.dairyPregSetting > 0) {
						r.push(`${His} womb is already rented out for the production of calves.`);
					} else if (slave.broodmother > 0) {
						r.push(`${He} has been made into a`);
						if (slave.broodmother > 1) {
							r.push(`hyper-`);
						}
						r.push(`broodmother.`);
						if (slave.womb.length === 0) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.RemovePregGenerator(slave),
								refresh, cheat));
						} else {
							r.push(`${He} is pregnant right now, so ${his} broodmother implant can't be safely extracted.`);
							if (slave.broodmother === 1 && slave.broodmotherFetuses === 1 && V.PGHack === 1) {
								// hack can be applied only one time, for type 1 broodmothers, and only if implant already present
								linkArray.push(App.Medicine.Surgery.makeLink(
									new App.Medicine.Surgery.Procedures.HackPregGenerator(slave),
									refresh, cheat));
							} else if (slave.broodmother === 1 && slave.broodmotherFetuses > 1) {
								r.push(`The implant firmware has already been adjusted.`);
							}
						}
					} else if (slave.indentureRestrictions > 0) {
						App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
					} else if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
						App.UI.DOM.appendNewElement("div", el, `${He} is protected from extreme surgery`, ["choices", "note"]);
					} else if (isFertile(slave) && slave.ovaryAge <= 46) {
						r.push(`${He} could be made into a broodmother.`);
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.ImplantPregGenerator(slave),
							refresh, cheat));
					} else {
						r.push(`${His} body cannot support being a broodmother.`);
					}
					App.Events.addNode(el, r, "div");
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				}
			}

			return el;
		}

		function sexDescription() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.dick === 0 && slave.vagina === -1) {
				r.push(`${He} is a null, possessing neither penis nor vagina.`);
			} else if (slave.dick !== 0) {
				r.push(`${He} has`);
				if (V.seeCircumcision === 1) {
					if (slave.foreskin === 0) {
						r.push(`a circumcised`);
					} else if (slave.foreskin >= 1) {
						r.push(`an uncircumcised`);
					}
				} else {
					r.push(`a`);
				}
				if (slave.vagina === -1) {
					r.push(`penis.`);
				} else if (slave.ovaries !== 0) {
					r.push(`penis and a`);
				} else if (slave.vagina !== -1) {
					r.push(`penis and`);
					if (slave.genes === "XY") {
						r.push(`an artificial`);
					} else {
						r.push(`a`);
					}
				}
			} else if (slave.dick === 0) {
				r.push(`${He} has a`);
			}

			if (slave.vagina > -1) {
				if (slave.vagina === 0) {
					r.push(`virgin pussy.`);
				} else if (slave.vagina === 1) {
					r.push(`tight pussy.`);
				} else if (slave.vagina === 2) {
					r.push(`used pussy.`);
				} else if (slave.vagina === 3) {
					r.push(`loose pussy.`);
				} else if (slave.vagina === 10) {
					r.push(`ruined cunt.`);
				} else {
					r.push(`gaping cunt.`);
				}
			}

			if (slave.dick !== 0 && (slave.ovaries !== 0 || slave.vagina !== -1)) {
				r.push(`It's possible to remove either and leave ${him} sexually functional.`);
			}
			if (slave.vagina > -1) {
				if (slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.VaginaRemoval(slave),
						refresh, cheat));
				}
			}

			if (slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
				if (slave.vagina === -1 && slave.dick !== 0) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.MaleToFemale(slave),
						refresh, cheat));
				}
				if (slave.vagina === -1 && slave.dick === 0 && V.surgeryUpgrade === 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.NoneToFemale(slave),
						refresh, cheat));
				}
				if (slave.dick > 0 && V.seeExtreme === 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.ChopPenis(slave),
						refresh, cheat));
				}
				if (slave.foreskin > 0 && slave.dick > 0) {
					if (slave.indentureRestrictions < 2) {
						if (V.seeCircumcision === 1) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.RemoveForeskin(slave),
								refresh, cheat));
						}
						if (slave.foreskin - slave.dick > 0) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.ForeskinTuck(slave),
								refresh, cheat));
						}
					}
				}
			}

			if (slave.dick !== 0 && slave.vagina === -1 && V.surgeryUpgrade === 1) {
				if (slave.indentureRestrictions < 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Herm(slave),
						refresh, cheat));
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function extraSex() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.vagina > 3) {
				r.push(`${His} vagina could benefit from surgical repair.`);
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.RepairVagina(slave),
					refresh, cheat));
			} else if (V.surgeryUpgrade === 1 && slave.indentureRestrictions < 2) {
				if (slave.vagina > 1) {
					r.push(`${His} vaginal muscles could benefit from microsurgical rejuvenation.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.TightenVagina(slave),
						refresh, cheat));
				} else if (slave.vagina > 0) {
					r.push(`${His} pussy is as tight as a virgin's, and ${his} hymen could be restored.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RestoreVirginity(slave),
						refresh, cheat));
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function balls() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.balls === 1) {
				r.push(`${His} testicles are vestigial, but ${he} has balls. Technically. They are`);
			} else if (slave.balls > 1) {
				r.push(`${He} has testicles`);
			}
			if (slave.scrotum > 0) {
				r.push(`located in ${his} scrotum.`);
			} else {
				if (slave.genes === "XY") {
					r.push(`relocated inside ${his} abdomen, and ${his} scrotum has been removed.`);
				} else {
					r.push(`implanted inside ${his} abdomen.`);
				}
			}
			if (slave.scrotum > 0) {
				if (slave.indentureRestrictions < 2) {
					if (slave.scrotum - slave.balls > 0) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.ScrotalTuck(slave),
							refresh, cheat));
					}
				}
				if (slave.indentureRestrictions < 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RelocateBalls(slave),
						refresh, cheat));
				}
			}
			if (V.seeExtreme === 1) {
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.Geld(slave),
					refresh, cheat));
			}
			if (slave.ballType !== "sterile") {
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.ChemCastrate(slave),
					refresh, cheat));
			}

			if (slave.vasectomy === 1) {
				r.push(`${He} has had a vasectomy and shoots blanks when ${he} cums${(slave.pubertyXY === 0 || slave.ballType === "sterile") ? `, or would, if ${he} were potent` : ``}.`);
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.VasectomyUndo(slave),
					refresh, cheat));
			} else {
				if (slave.ballType === "sterile") {
					r.push(`${He} has non-functional testicles.`);
					if (slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Vasectomy(slave),
							refresh, cheat));
					}
				} else {
					r.push(`${He} has working testicles${(slave.pubertyXY === 0) ? `, though ${he} isn't potent` : ``}.`);
					if (slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Vasectomy(slave),
							refresh, cheat));
					}
				}
			}

			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function prostate() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.prostate) {
				r.push(`${He} has a`);
				if (slave.prostate > 2) {
					r.push(`hyperactive, ejaculation enhancing`);
				} else if (slave.prostate > 1) {
					r.push(`hyperactive`);
				} else {
					r.push(`normal`);
				}
				r.push(`prostate.`);
				if (slave.prostate >= 2 && V.prostateImplants === 1) {
					if (slave.prostate < 3) {
						if (slave.indentureRestrictions < 2) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.EjaculationBooster(slave),
								refresh, cheat));
						}
					}
					if (slave.prostate === 3) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveEjaculationBooster(slave),
							refresh, cheat));
					} else if (slave.prostate === 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.EndPrecum(slave),
							refresh, cheat));
					}
				} else {
					if (slave.prostate > 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.EndPrecum(slave),
							refresh, cheat));
					}
					if (slave.prostate < 2) {
						if (slave.indentureRestrictions < 2) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.Precum(slave),
								refresh, cheat));
						}
					}
				}
				if (V.seeExtreme === 1) {
					if (slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveProstate(slave),
							refresh, cheat));
					}
				}
			}

			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}
	}
};
