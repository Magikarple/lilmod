// cSpell:ignore ACUP

/**
 * UI for performing surgery. Refreshes without refreshing the passage.
 * @param {App.Entity.SlaveState} slave
 * @param {()=>void} refresh
 * @param {boolean} [cheat=false]
 * @returns {HTMLElement}
 */
App.UI.surgeryPassageUpper = function(slave, refresh, cheat = false) {
	const container = document.createElement("span");
	container.append(content());
	return container;

	function content() {
		const frag = new DocumentFragment();
		const {
			His, He,
			his, he
		} = getPronouns(slave);
		/** @type {HTMLAnchorElement[]} */

		App.UI.DOM.appendNewElement("h3", frag, `Chest:`);
		frag.append(
			boobDesc(),
			boobImplants(),
			nipples(),
			areolae(),
			lactation()
		);

		App.UI.DOM.appendNewElement("h3", frag, `Midriff:`);

		frag.append(
			fat(),
			moreFat(),
			belly(),
			wombImplant(),
			bellySag()
		);

		return frag;

		function boobDesc() {
			const el = new DocumentFragment();
			const r = [];
			r.push(`${His}`);
			if (slave.boobs < 300) {
				r.push(`${either("androgynous", "flat")} chest is barely there.`);
			} else if (slave.boobs < 400) {
				r.push(`${either("pointy", "tiny")}, ${slave.boobs}cc chest only fill A-cups.`);
			} else if (slave.boobs < 8500) {
				if (V.showBoobCCs === 1) {
					r.push(App.Desc.boobBits.format("%ADJ %NOUN, %VOLUME CCs, would fill %ACUP.", slave.boobs));
				} else {
					r.push(App.Desc.boobBits.format("%ADJ %NOUN, would fill %ACUP.", slave.boobs));
				}
			} else {
				r.push(App.Desc.boobBits.format("%ADJ %NOUN, %VOLUME CCs, ", slave.boobs));
				r.push(`fill out an enormous custom bra; ${his} tits dominate ${his} entire frame.`);
			}
			App.Events.addNode(el, r, "div");
			return el;
		}

		function boobImplants() {
			const el = new DocumentFragment();
			let r = [];
			r.push(`${He} has`);
			if (["fillable", "advanced fillable", "hyper fillable"].includes(slave.boobsImplantType)) {
				if (slave.boobsImplantType === "hyper fillable") {
					if (slave.boobsImplant < 20000) {
						r.push(`underfilled,`);
					} else {
						r.push(`enormous,`);
					}
				} else if (slave.boobsImplantType === "advanced fillable") {
					if (slave.boobsImplant <= 1000) {
						r.push(`deflated,`);
					} else if (slave.boobsImplant < 2200) {
						r.push(`underfilled,`);
					} else if (slave.boobsImplant > 10000) {
						r.push(`massively overfilled,`);
					} else {
						r.push(`massive,`);
					}
				} else {
					if (slave.boobsImplant <= 500) {
						r.push(`deflated,`);
					} else if (slave.boobsImplant < 800) {
						r.push(`underfilled,`);
					} else if (slave.boobsImplant > 1800) {
						r.push(`massively overfilled,`);
					} else if (slave.boobsImplant > 1000) {
						r.push(`massive,`);
					} else if (slave.boobsImplant >= 800) {
						r.push(`giant,`);
					}
				}
				r.push(`${slave.boobsImplant}cc ${slave.boobsImplantType} breast implants.`);
			} else if (slave.boobsImplantType !== "none") {
				if (slave.boobsImplant > 1000) {
					r.push(`massive, ${slave.boobsImplant}cc`);
				} else if (slave.boobsImplant > 800) {
					r.push(`giant, ${slave.boobsImplant}cc`);
				} else if (slave.boobsImplant > 600) {
					r.push(`huge, ${slave.boobsImplant}cc`);
				} else if (slave.boobsImplant > 400) {
					r.push(`large, ${slave.boobsImplant}cc`);
				} else if (slave.boobsImplant > 200) {
					r.push(`moderate, ${slave.boobsImplant}cc`);
				} else if (slave.boobsImplant > 0) {
					r.push(`small, ${slave.boobsImplant}cc`);
				}
				if (slave.boobsImplantType !== "normal") {
					r.push(`${slave.boobsImplantType}`);
				}
				r.push(`breast implants.`);
				if (slave.boobsImplant > 8000 && slave.boobsImplantType === "string") {
					r.push(`<span class="yellow">Large string based implants are a risk to a slave's health.</span>`);
				}
			} else {
				r.push(`no implants.`);
			}
			App.Events.addNode(el, r, "div");
			const surgeries = App.Medicine.Surgery.sizingProcedures.boobs(slave, App.Medicine.Surgery.allSizingOptions());
			const surgeryLinks = surgeries.map(s => App.Medicine.Surgery.makeLink(s, refresh, cheat));
			App.UI.DOM.appendNewElement("div", el, (App.UI.DOM.generateLinksStrip(surgeryLinks)), "choices");

			r = [];
			const linkArray = [];
			if (slave.boobsImplant !== 0) {
				r.push(`The shape of ${his} breasts is determined by ${his} implants.`);
			} else {
				if (slave.boobs <= 250) {
					r.push(`${He}'s so flat-chested that ${his} breasts don't have much shape.`);
				} else {
					switch (slave.boobShape) {
						case "perky":
							r.push(`They're perky, with nipples that point slightly upwards.`);
							break;
						case "downward-facing":
							r.push(`They're not attractively shaped; ${his} nipples pointing downward.`);
							break;
						case "torpedo-shaped":
							r.push(`They're torpedo-shaped, projecting some way from ${his} chest.`);
							break;
						case "wide-set":
							r.push(`They're wide-set, with nipples pointing away from ${his} sternum.`);
							break;
						case "saggy":
							r.push(`They're not attractively shaped, with ${his} nipples pointing down.`);
							break;
						default:
							r.push(`They're nicely rounded and rest naturally.`);
					}
					if (slave.indentureRestrictions >= 2) {
						r.push(`<span class="note">${His} indenture does not allow breast restructuring</span>`);
					} else if (slave.breastMesh === 1) {
						r.push(`<span class="note">${His} supportive mesh implant prevents reconstruction</span>`);
					} else {
						if (slave.boobShape === "saggy" || slave.boobShape === "downward-facing") {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.BreastLift(slave),
								refresh, cheat));
							if (slave.preg > slave.pregData.normalBirth / 1.42 || (slave.boobs >= 5000 && slave.boobs < 8000)) {
								r.push(`<span class="note">${His} current state may result in ${his} breasts becoming saggy again</span>`);
							}
						} else {
							if (slave.boobShape === "normal") {
								linkArray.push(App.Medicine.Surgery.makeLink(
									new App.Medicine.Surgery.Procedures.BreastReconstruction(slave, "perky"),
									refresh, cheat));
								linkArray.push(App.Medicine.Surgery.makeLink(
									new App.Medicine.Surgery.Procedures.BreastReconstruction(slave, "torpedo-shaped"),
									refresh, cheat));
							} else {
								linkArray.push(App.Medicine.Surgery.makeLink(
									new App.Medicine.Surgery.Procedures.BreastReconstruction(slave, "normal"),
									refresh, cheat));
							}
							if (slave.boobs >= 2000 && slave.boobsImplant === 0 && V.meshImplants === 1 && V.surgeryUpgrade === 1) {
								linkArray.push(App.Medicine.Surgery.makeLink(
									new App.Medicine.Surgery.Procedures.BreastShapePreservation(slave),
									refresh, cheat));
							}
						}
					}
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function nipples() {
			const el = new DocumentFragment();
			if (V.surgeryUpgrade === 1) {
				App.UI.DOM.appendNewElement("div", el, `${He} has ${slave.nipples} nipples.`);
				if (slave.indentureRestrictions >= 2) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
				} else if (slave.indentureRestrictions === 1) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids extreme body modification`, ["choices", "note"]);
				} else { /* split for possible dicknips later on, should lcd wish to attempt it again. */
					const linkArray = [];
					if (slave.nipples === "fuckable") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RestoreNipples(slave),
							refresh, cheat));
					} else {
						if (slave.boobs - slave.boobsMilk < 500) {
							App.UI.DOM.appendNewElement("div", el, `${His} breasts are too small to support reshaping ${his} nipples to be penetratable`, ["choices", "note"]);
						} else if (App.Medicine.fleshSize(slave, 'boobs') < 500) {
							App.UI.DOM.appendNewElement("div", el, `${His} implants are too large to support reshaping ${his} nipples to be penetratable`, ["choices", "note"]);
						} else if (slave.nipples !== "huge") {
							App.UI.DOM.appendNewElement("div", el, `${His} nipples are too small to be made fuckable`, ["choices", "note"]);
						} else {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.NippleCunts(slave),
								refresh, cheat));
						}
					}
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				}
			}
			return el;
		}

		function areolae() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.areolae === 0) {
				r.push(`${His} areolae are small`);
				if (slave.areolaeShape !== "circle") {
					r.push(`and have been surgically altered to be ${slave.areolaeShape}-shaped.`);
				} else {
					r.push(`and fairly normal.`);
				}
			} else if (slave.areolae === 1) {
				r.push(`${His} areolae are large`);
				if (slave.areolaeShape !== "circle") {
					r.push(`and have been surgically altered to be ${slave.areolaeShape}-shaped.`);
				} else {
					r.push(`but still fairly normal.`);
				}
			} else if (slave.areolae > 1) {
				r.push(`${He} has`);
				if (slave.areolae === 2) {
					r.push(`wide`);
				} else if (slave.areolae === 3) {
					r.push(`huge`);
				} else if (slave.areolae === 4) {
					r.push(`massive`);
				}
				r.push(`areolae${(slave.areolaeShape !== "circle") ? `, which have been surgically altered to be ${slave.areolaeShape}-shaped` : ``}.`);
			}
			if (slave.indentureRestrictions < 2) {
				if (slave.areolaeShape !== "circle") {
					r.push(`${His} ${slave.areolaeShape}-shaped areolae can be normalized or reshaped:`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.ReshapeAreolae(slave, "circle"),
						refresh, cheat));
					if (slave.areolaeShape !== "heart") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.ReshapeAreolae(slave, "heart"),
							refresh, cheat));
					}
					if (slave.areolaeShape !== "star") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.ReshapeAreolae(slave, "star"),
							refresh, cheat));
					}
				} else {
					if (slave.areolae > 0 && slave.areolaeShape === "circle") {
						r.push(`They are big enough that they could be reshaped into a pattern. Graft skin to make ${his} areolae:`);
					}
					if (slave.areolae > 0 && slave.areolaeShape === "circle") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.ReshapeAreolae(slave, "heart"),
							refresh, cheat));
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.ReshapeAreolae(slave, "star"),
							refresh, cheat));
					}
				}

				if (slave.areolae > 0) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.ResizeAreolae(slave, -1),
						refresh, cheat));
				}
				if (slave.areolae < 4) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.ResizeAreolae(slave, +1),
						refresh, cheat));
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function lactation() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.lactation === 0) {
				r.push(`${He} is not lactating.`);
			} else if (slave.lactation === 2) {
				r.push(`${He} is implanted with slow-release pro-lactation drugs.`);
			} else {
				r.push(`${He} is lactating naturally.`);
			}
			if (slave.lactation < 2) {
				if (slave.indentureRestrictions < 2) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Lactation(slave),
						refresh, cheat));
				}
			}
			if (slave.lactation > 1) {
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.EndLactation(slave),
					refresh, cheat));
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function fat() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.indentureRestrictions >= 2 && slave.weight > 30) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else if (slave.weight > 30) {
				if (slave.weight > 190) {
					r.push(`${He} is extremely fat.`);
				} else if (slave.weight > 130) {
					r.push(`${He} is fat.`);
				} else if (slave.weight > 30) {
					r.push(`${He} is overweight.`);
				}
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.Liposuction(slave),
					refresh, cheat));
				if (V.surgeryUpgrade === 1) {
					linkArray.push(App.UI.DOM.link("Fat grafting",
						() => App.UI.SlaveInteract.fatGraft(slave, refresh)));
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function moreFat() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			r.push(`${He} has`);
			if (slave.waist > 95) {
				r.push(`a masculine`);
			} else if (slave.waist > 40) {
				r.push(`an ugly`);
			} else if (slave.waist > 10) {
				r.push(`an unattractive`);
			} else if (slave.waist >= -10) {
				r.push(`an average`);
			} else if (slave.waist >= -40) {
				r.push(`a feminine`);
			} else if (slave.waist >= -95) {
				r.push(`an hourglass`);
			} else {
				r.push(`an absurd`);
			}
			r.push(`waist.`);
			App.Events.addNode(el, r, "div");
			if (slave.waist >= -75) {
				if (slave.indentureRestrictions < 2) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.WaistReduction(slave),
						refresh, cheat));
				}
			}
			if (slave.waist >= -95 && slave.waist < -75 && V.seeExtreme === 1) {
				if (slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Ribs(slave),
						refresh, cheat));
				}
			}
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function belly() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			r.push(`${He}'s`);
			if (slave.pregKnown > 0) {
				r.push(`pregnant.`);
			} else if (slave.womb.length === 0 && slave.broodmother > 0) {
				r.push(`got a dormant broodmother implant in ${his} womb.`);
			} else if (slave.preg > 0) {
				r.push(`showing unusual discomfort as ${his} stomach is inspected. A quick test reveals that <span class="lime">${he} is pregnant.</span>`);
				slave.pregKnown = 1;
			} else if (slave.bellyImplant > 0) {
				r.push(`got a ${slave.bellyImplant}cc fluid-filled implant located in ${his} abdomen.`);
				if (slave.cervixImplant === 1) {
					r.push(`${He} also has a micropump filter installed in ${his} cervix feeding into the implant.`);
				} else if (slave.cervixImplant === 2) {
					r.push(`${He} also has a micropump filter installed in ${his} rectum feeding into the implant.`);
				} else if (slave.cervixImplant === 3) {
					r.push(`${He} also has a micropump filter installed in both ${his} holes feeding into the implant.`);
				}
				if (slave.bellyFluid >= 1500) {
					r.push(`${He} also has a bellyful of ${slave.inflationType}.`);
				}
			} else if (slave.bellyImplant === 0) {
				r.push(`got an empty fillable implant located in ${his} abdomen.`);
				if (slave.cervixImplant === 1) {
					r.push(`${He} also has a micropump filter installed in ${his} cervix feeding into the implant.`);
				} else if (slave.cervixImplant === 2) {
					r.push(`${He} also has a micropump filter installed in ${his} rectum feeding into the implant.`);
				} else if (slave.cervixImplant === 3) {
					r.push(`${He} also has a micropump filter installed in both ${his} holes feeding into the implant.`);
				}
				if (slave.bellyFluid >= 1500) {
					r.push(`${He} also has a bellyful of ${slave.inflationType}.`);
				}
			} else if (slave.bellyFluid >= 1500) {
				r.push(`got a bellyful of ${slave.inflationType}.`);
			} else {
				r.push(`got a normal stomach.`);
			}
			App.Events.addNode(el, r, "div");
			if (slave.indentureRestrictions >= 2) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
				App.UI.DOM.appendNewElement("div", el, `You are forbidden from affecting ${his} fertility`, ["choices", "note"]);
			} else if (slave.preg > 0 || slave.inflation > 0 || slave.broodmother > 0) {
				App.UI.DOM.appendNewElement("div", el, `${He} is unable to support an abdominal implant at this time`, ["choices", "note"]);
			} else if (slave.bellyImplant >= 750000) {
				App.UI.DOM.appendNewElement("div", el, `${His} abdominal implant is so far beyond its maximum limit it is at risk of rupturing`, ["choices", "note"]);
			} else if (slave.bellyImplant >= 600000) {
				App.UI.DOM.appendNewElement("div", el, `${His} abdominal implant is greatly beyond its maximum limit`, ["choices", "note"]);
			} else if (slave.bellyImplant >= 450000) {
				App.UI.DOM.appendNewElement("div", el, `${His} abdominal implant is over-filled`, ["choices", "note"]);
			} else if (slave.bellyImplant >= 400000) {
				App.UI.DOM.appendNewElement("div", el, `${His} abdominal implant is at its capacity`, ["choices", "note"]);
			} else if (slave.bellyImplant > 130000 && V.arcologies[0].FSTransformationFetishistResearch !== 1) {
				App.UI.DOM.appendNewElement("div", el, `${His} abdominal implant is at its capacity`, ["choices", "note"]);
			} else if (slave.bellyImplant === -1 && V.bellyImplants === 1) {
				if (slave.ovaries === 1 || slave.mpreg === 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.BellyIn(slave),
						refresh, cheat));
				} else {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.BellyInMale(slave),
						refresh, cheat));
				}
			} else if (slave.bellyPain === 2) {
				App.UI.DOM.appendNewElement("div", el, `${His} body cannot handle more filler this week`, ["choices", "note"]);
			} else if (slave.bellyImplant > -1) {
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.BellyUp(slave),
					refresh, cheat));
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.BellyUpLarge(slave),
					refresh, cheat));
			}
			if (slave.bellyImplant > -1) {
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.BellyDown(slave),
					refresh, cheat));
				if (slave.bellyImplant >= 500) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.BellyDownLarge(slave),
						refresh, cheat));
				}
				if (slave.indentureRestrictions < 2) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.BellyOut(slave),
						refresh, cheat));
					if (slave.cervixImplant !== 1 && slave.cervixImplant !== 3 && V.cervixImplants >= 1 && slave.vagina > -1) { /* slave should have vagina */
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.CervixPump(slave),
							refresh, cheat));
					}
					if (slave.cervixImplant !== 2 && slave.cervixImplant !== 3 && V.cervixImplants === 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.CervixPumpAnus(slave),
							refresh, cheat));
					}
				}
			}
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function wombImplant() {
			const el = new DocumentFragment();
			const linkArray = [];
			if (slave.wombImplant === "none" && (V.UterineRestraintMesh === 1) && (slave.ovaries === 1 || slave.mpreg === 1)) {
				App.UI.DOM.appendNewElement("div", el, `${He} has a normal uterus${(slave.mpreg === 1) ? `, though slightly repositioned` : ``}.`);
				if (slave.indentureRestrictions >= 1) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
				} else if (slave.bellyImplant > 0 || slave.preg > 0) {
					App.UI.DOM.appendNewElement("div", el, `${His} womb is currently in use and unsafe to operate on`, ["choices", "note"]);
				} else {
					if (V.surgeryUpgrade === 1) {
						if (V.UterineRestraintMesh === 1) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.InstallMesh(slave),
								refresh, cheat));
						}
					}
				}
			} else if (slave.wombImplant === "restraint") {
				App.UI.DOM.appendNewElement("div", el, `${He} has a mesh reinforced uterus.`);
				if (slave.indentureRestrictions >= 1) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
				} else if (slave.bellyImplant > 0 || slave.preg > 0) {
					App.UI.DOM.appendNewElement("div", el, `${His} womb is currently in use and unsafe to operate on`, ["choices", "note"]);
				} else {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RemoveMesh(slave),
						refresh, cheat));
				}
			}
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function bellySag() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.bellySagPreg > 0) {
				if (slave.belly >= 1500) {
					r.push(`${He} has a sagging midriff, ruined from excessive pregnancy. It is currently filled out by ${his} swollen belly and cannot safely be worked on.`);
				} else {
					r.push(`${He} has a sagging midriff, ruined from excessive pregnancy.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.TummyTuck(slave),
						refresh, cheat));
				}
			} else if (slave.bellySag > 0) {
				if (slave.belly >= 1500) {
					r.push(`${He} has a sagging midriff, ruined from excessive distention. It is currently filled out by ${his} swollen belly and cannot safely be worked on.`);
				} else {
					r.push(`${He} has a sagging midriff, ruined from excessive distention.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.TummyTuck(slave),
						refresh, cheat));
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}
	}
};
