/**
 * UI for performing surgery. Refreshes without refreshing the passage.
 * @param {App.Entity.SlaveState} slave
 * @param {function():void} refresh
 * @param {boolean} [cheat=false]
 * @returns {HTMLElement}
 */

App.UI.surgeryPassageHairAndFace = function(slave, refresh, cheat = false) {
	const container = document.createElement("span");
	container.append(content());
	return container;

	function content() {
		const frag = new DocumentFragment();
		const pubertyAge = Math.min(slave.pubertyAgeXX, slave.pubertyAgeXY);
		const {
			His, He,
			his, him
		} = getPronouns(slave);
		const artificiality = faceSurgeryArtificiality();

		App.UI.DOM.appendNewElement("h3", frag, `Hair:`);
		frag.append(
			mainHair(), eyebrows(), armpitHair()
		);

		App.UI.DOM.appendNewElement("h3", frag, `Face:`);
		frag.append(
			faceShape(), eyes(), ears(), topEars(), hearing(), horns(), lips(), teeth(), voice(), chemosensory()
		);

		return frag;

		function mainHair() {
			const el = new DocumentFragment();
			if (slave.bald === 0 && slave.hStyle !== "bald") {
				App.UI.DOM.appendNewElement("div", el, `${He} naturally grows ${slave.origHColor} hair from ${his} head.`);
				if (slave.indentureRestrictions > 1) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
				} else {
					App.UI.DOM.appendNewElement("div", el,
						App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.HairRemoval(slave), refresh, cheat),
						"choices");
				}
			} else {
				App.UI.DOM.appendNewElement("div", el, `${He} is no longer capable of growing hair on ${his} head.`);
			}
			return el;
		}

		function eyebrows() {
			const el = new DocumentFragment();
			if (slave.eyebrowHStyle !== "bald") {
				App.UI.DOM.appendNewElement("div", el, `${He} has ${slave.origHColor} eyebrows.`);
				if (slave.indentureRestrictions > 1) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
				} else {
					App.UI.DOM.appendNewElement("div", el,
						App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.EyebrowRemoval(slave), refresh, cheat),
						"choices");
				}
			} else {
				App.UI.DOM.appendNewElement("div", el, `${He} is no longer capable of growing eyebrow hair.`);
			}
			return el;
		}

		function armpitHair() {
			const el = new DocumentFragment();
			const r = [];
			if ((slave.underArmHStyle !== "bald" && slave.underArmHStyle !== "hairless") || (slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless")) {
				r.push(`${He}`);
				if (slave.physicalAge >= pubertyAge) {
					r.push(`naturally grows`);
				} else if (slave.physicalAge >= pubertyAge - 1) {
					r.push(`is beginning to grow`);
				} else {
					r.push(`will someday grow`);
				}
				r.push(`${slave.origHColor} body hair.`);
				App.Events.addNode(el, r, "div");
				if (slave.indentureRestrictions > 1) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
				} else {
					App.UI.DOM.appendNewElement("div", el,
						App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.BodyHairRemoval(slave), refresh, cheat),
						"indent");
				}
			} else {
				r.push(`${His} ${slave.skin} skin is silky smooth and hair free from ${his} neck to ${his}`);
				if (!hasAnyLegs(slave)) {
					r.push(`hips.`);
				} else {
					r.push(`toes.`);
				}
				App.Events.addNode(el, r, "div");
			}
			return el;
		}

		function faceShape() {
			const el = new DocumentFragment();
			let r = [];
			r.push(`${His} ${slave.faceShape} face is`);
			const faceDiv = App.UI.DOM.appendNewElement("div", el);
			if (slave.face < -95) {
				r.push(`very ugly.`);
			} else if (slave.face < -40) {
				r.push(`ugly.`);
			} else if (slave.face < -10) {
				r.push(`unattractive.`);
			} else if (slave.face <= 10) {
				r.push(`quite average.`);
			} else if (slave.face <= 40) {
				r.push(`attractive.`);
			} else if (slave.face <= 95) {
				r.push(`beautiful.`);
			} else if (slave.face > 95) {
				r.push(`very beautiful.`);
			}

			if (slave.faceImplant === 0) {
				r.push(`It is entirely natural.`);
			} else if (slave.faceImplant > 5) {
				r.push(`It has seen some work.`);
			} else if (slave.faceImplant > 30) {
				r.push(`It has been totally reworked.`);
			}
			App.Events.addNode(faceDiv, r, "div");

			if (slave.indentureRestrictions > 1) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else if (slave.faceImplant > 95) {
				App.UI.DOM.appendNewElement("div", el, `${His} face cannot sustain further cosmetic surgery`, ["choices", "note"]);
			} else {
				const linkArray = [];
				const faceMap = (slave.faceShape === "masculine") ? new Map([["normal", {}], ["androgynous", {}]]) : App.Medicine.Modification.faceShape;

				for (const [key, shape] of faceMap) {
					if (
						(shape.hasOwnProperty("requirements") && !shape.requirements) ||
						slave.faceShape === key || // Can't change to what you are
						slave.faceShape !== "androgynous" && key === "masculine" // Can't go directly to or from masculine, have to go through androgynous
					) {
						continue;
					}
					linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.FaceShape(slave, key), refresh, cheat));
				}
				linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.FaceAttractiveness(slave), refresh, cheat));
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				r = [];
				r.push(`Facial surgery can either rework it and improve its attractiveness, or simply make it more attractive. No facial surgery is perfect and each surgery will make it look less natural.`);
				if (V.PC.skill.medicine >= 100 && V.surgeryUpgrade) {
					r.push(`Your surgical skills and the advanced surgical suite will minimize this effect as much as possible.`);
				} else if (V.PC.skill.medicine >= 100) {
					r.push(`Your surgical skills will reduce this effect.`);
				} else if (V.surgeryUpgrade) {
					r.push(`The advanced surgical suite will reduce this effect.`);
				}
				if (slave.faceImplant + artificiality > 95) {
					r.push(App.UI.DOM.makeElement("span", `${(slave.faceImplant !== 0) ? `Further facial` : `Facial`} surgery will create a severe uncanny valley effect.`, "yellow"));
				} else if (slave.faceImplant + artificiality > 60 && slave.faceImplant <= 60) {
					r.push(App.UI.DOM.makeElement("span", `${(slave.faceImplant !== 0) ? `Further facial` : `Facial`}surgery will be extremely obvious.`, "yellow"));
				} else if (slave.faceImplant + artificiality > 30 && slave.faceImplant <= 30) {
					r.push(App.UI.DOM.makeElement("span", `${(slave.faceImplant !== 0) ? `Further facial` : `Facial`} surgery will eliminate a natural appearance.`, "yellow"));
				} else if (slave.faceImplant + artificiality > 5 && slave.faceImplant <= 5) {
					r.push(App.UI.DOM.makeElement("span", `${(slave.faceImplant !== 0) ? `Further facial` : `Facial`} surgery will disturb a perfectly natural appearance.`, "yellow"));
				} else {
					r.push(`A single facial surgery is not projected to significantly impact artificiality.`);
				}
				App.Events.addNode(faceDiv, r, "span", "note");
			}

			if (slave.indentureRestrictions < 2 && slave.faceImplant <= 95) {
				if (slave.ageImplant > 1) {
					App.UI.DOM.appendNewElement("div", el, `${He}'s had a multiple facelifts and other cosmetic procedures in an effort to preserve ${his} youth.`);
				} else if (slave.ageImplant > 0) {
					App.UI.DOM.appendNewElement("div", el, `${He}'s had a face lift and other minor cosmetic procedures to make ${him} look younger.`);
				} else if (slave.physicalAge >= 25 && slave.visualAge >= 25) {
					App.UI.DOM.appendNewElement("div", el, `${He}'s old enough that a face lift and other minor cosmetic procedures could make ${him} look younger.`);
					App.UI.DOM.appendNewElement("div", el,
						App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.AgeLift(slave), refresh, cheat),
						"choices");
				}
			}
			return el;
		}

		function eyes() {
			const el = new DocumentFragment();
			let linkArray;
			App.UI.DOM.appendNewElement("div", el, `${He} has ${App.Desc.eyesType(slave)}${(hasAnyEyes(slave)) ? `, they are ${App.Desc.eyesVision(slave)}` : ``}.`);
			/* eye blur and fix */
			if (hasAnyEyes(slave)) {
				/* Blur eyes*/
				if (slave.indentureRestrictions > 1) {
					App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
				} else {
					linkArray = [];
					if (getLeftEyeVision(slave) === 2 && getLeftEyeType(slave) === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.EyeBlur(slave, "left"),
							refresh, cheat));
					}
					if (getRightEyeVision(slave) === 2 && getRightEyeType(slave) === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.EyeBlur(slave, "right"),
							refresh, cheat));
					}
					if (linkArray.length === 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.EyeBlur(slave, "both"),
							refresh, cheat));
					}
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				}

				/* Fix eyes */
				linkArray = [];
				if (getLeftEyeVision(slave) === 1 && getLeftEyeType(slave) === 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.EyeFix(slave, "left"),
						refresh, cheat));
				}
				if (getRightEyeVision(slave) === 1 && getRightEyeType(slave) === 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.EyeFix(slave, "right"),
						refresh, cheat));
				}
				if (linkArray.length === 2) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.EyeFix(slave, "both"),
						refresh, cheat));
				}
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			}

			if (V.seeExtreme === 1) {
				if (slave.indentureRestrictions < 1) {
					/* blind */
					linkArray = [];
					if (getLeftEyeVision(slave) > 0 && getLeftEyeType(slave) === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Blind(slave, "left"),
							refresh, cheat));
					}
					if (getRightEyeVision(slave) > 0 && getRightEyeType(slave) === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Blind(slave, "right"),
							refresh, cheat));
					}
					if (linkArray.length === 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Blind(slave, "both"),
							refresh, cheat));
					}
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");

					/* remove */
					linkArray = [];
					if (hasLeftEye(slave)) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveEyes(slave, "left"),
							refresh, cheat));
					}
					if (hasRightEye(slave)) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveEyes(slave, "right"),
							refresh, cheat));
					}
					if (linkArray.length === 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveEyes(slave, "both"),
							refresh, cheat));
					}
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
					/* implant */
					if (isProstheticAvailable(slave, "ocular")) {
						linkArray = [];
						if (!hasLeftEye(slave)) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.OcularImplant(slave, "left"),
								refresh, cheat));
						}
						if (!hasRightEye(slave)) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.OcularImplant(slave, "right"),
								refresh, cheat));
						}
						if (linkArray.length === 2) {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.OcularImplant(slave, "both"),
								refresh, cheat));
						}
						App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
					}
				}
			}
			return el;
		}

		function ears() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			r.push(`${He} has`);
			if (slave.earShape === "normal") {
				r.push(`normal ears.`);
			} else if (slave.earShape === "damaged") {
				r.push(`damaged ears.`);
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.EarRestore(slave),
					refresh, cheat));
			} else if (slave.earShape === "pointy") {
				r.push(`small pointy ears.`);
			} else if (slave.earShape === "elven") {
				r.push(`long elf ears.`);
			} else if (slave.earShape === "orcish") {
				r.push(`distinct orcish ears.`);
			} else if (slave.earShape === "cow") {
				r.push(`floppy ${App.Utils.translate("cow")} ears.`);
			} else if (slave.earShape === "sheep") {
				r.push(`cupped sheep ears.`);
			} else if (slave.earShape === "gazelle") {
				r.push(`cupped gazelle ears.`);
			} else if (slave.earShape === "deer") {
				r.push(`cupped deer ears.`);
			} else if (slave.earShape === "bird") {
				r.push(`ordinary ears with small tufts of ${slave.hColor} colored feathers behind them.`);
			} else if (slave.earShape === "dragon") {
				r.push(`elongated draconic ears.`);
			} else if (slave.earShape === "none") {
				r.push(`no ears.`);
			} else {
				r.push(`bugged ears. You done goofed. <span class="note">Report This</span>`);
			}
			App.Events.addNode(el, r, "div");

			if (slave.indentureRestrictions >= 2) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else {
				if (slave.earShape !== "normal" && slave.earShape !== "none") {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.EarRestore(slave),
						refresh, cheat));
				}

				if (slave.earShape !== "none" && V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RemoveEars(slave),
						refresh, cheat));
				}
				if (slave.earShape !== "none") {
					if (slave.earShape !== "pointy") {
						if (slave.earShape !== "elven") {
							linkArray.push(App.Medicine.Surgery.makeLink(
								new App.Medicine.Surgery.Procedures.EarMinorReshape(slave, "small elfin", "pointy"),
								refresh, cheat));
						}
					}
					if (V.surgeryUpgrade === 1) {
						for (const earShape in App.Data.Slave.FancyEars) {
							if (!["robot"].includes(earShape)) {
								if (slave.earShape !== earShape) {
									linkArray.push(App.Medicine.Surgery.makeLink(
										new App.Medicine.Surgery.Procedures.EarMajorReshape(slave, App.Data.Slave.FancyEars[earShape].title, earShape),
										refresh, cheat));
								}
							}
						}
					}
				}
			}
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function topEars() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			r.push(`${He} has`);
			if (slave.earT === "none") {
				if (slave.earShape !== "none") {
					r.push(`only one set of ears.`);
				} else {
					r.push(`no secondary ears.`);
				}
			} else if (slave.earT === "normal") {
				if (slave.earShape !== "none") {
					r.push(`a second pair of ears grafted to ${his} head.`);
				} else {
					r.push(`a pair of ears grafted to the top of ${his} head.`);
				}
			} else if (slave.earT === "cat") {
				r.push(`a pair of ${App.Utils.translate("cat")} ears adorning ${his} head.`);
			} else if (slave.earT === "leopard") {
				r.push(`a pair of leopard ears adorning ${his} head.`);
			} else if (slave.earT === "tiger") {
				r.push(`a pair of tiger ears adorning ${his} head.`);
			} else if (slave.earT === "jaguar") {
				r.push(`a pair of jaguar ears adorning ${his} head.`);
			} else if (slave.earT === "lion") {
				r.push(`a pair of lion ears adorning ${his} head.`);
			} else if (slave.earT === "dog") {
				r.push(`a pair of ${App.Utils.translate("dog")} ears adorning ${his} head.`);
			} else if (slave.earT === "wolf") {
				r.push(`a pair of wolf ears adorning ${his} head.`);
			} else if (slave.earT === "jackal") {
				r.push(`a pair of jackal ears adorning ${his} head.`);
			} else if (slave.earT === "fox") {
				r.push(`a pair of ${App.Utils.translate("fox")} ears adorning ${his} head.`);
			} else if (slave.earT === "raccoon") {
				r.push(`a pair of ${App.Utils.translate("raccoon")} ears adorning ${his} head.`);
			} else if (slave.earT === "rabbit") {
				r.push(`a pair of ${App.Utils.translate("rabbit")} ears adorning ${his} head.`);
			} else if (slave.earT === "squirrel") {
				r.push(`a pair of ${App.Utils.translate("squirrel")} ears adorning ${his} head.`);
			} else if (slave.earT === "horse") {
				r.push(`a pair of ${App.Utils.translate("horse")} ears adorning ${his} head.`);
			} else {
				r.push(`You done goofed.`);
				r.push(`<span class="note">Report This</span>`);
			}
			if (slave.indentureRestrictions >= 2) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else {
				if (slave.earT !== "none") {
					if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveTopEars(slave),
							refresh, cheat));
					}
					if (slave.earT !== "cat") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "cat"),
							refresh, cheat));
					}
					if (slave.earT !== "leopard") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "leopard"),
							refresh, cheat));
					}
					if (slave.earT !== "tiger") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "tiger"),
							refresh, cheat));
					}
					if (slave.earT !== "jaguar") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "jaguar"),
							refresh, cheat));
					}
					if (slave.earT !== "lion") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "lion"),
							refresh, cheat));
					}
					if (slave.earT !== "dog") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "dog"),
							refresh, cheat));
					}
					if (slave.earT !== "wolf") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "wolf"),
							refresh, cheat));
					}
					if (slave.earT !== "jackal") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "jackal"),
							refresh, cheat));
					}
					if (slave.earT !== "fox") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "fox"),
							refresh, cheat));
					}
					if (slave.earT !== "raccoon") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "raccoon"),
							refresh, cheat));
					}
					if (slave.earT !== "rabbit") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "rabbit"),
							refresh, cheat));
					}
					if (slave.earT !== "squirrel") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "squirrel"),
							refresh, cheat));
					}
					if (slave.earT !== "horse") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarReshape(slave, "horse"),
							refresh, cheat));
					}
					if (slave.earTColor === "hairless") {
						r.push(`They are completely bald.`);
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarsImplantHair(slave),
							refresh, cheat));
					} else {
						r.push(`They are covered by a multitude of implanted ${slave.earTColor} fibers mimicking hair.`);
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.TopEarsRemoveHair(slave),
							refresh, cheat));
					}
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function hearing() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];

			if (slave.earImplant === 1) {
				r.push(`${He} has cochlear implants.`);
			} else if (slave.hears <= -2) {
				r.push(`${He} is deaf.`);
			} else {
				r.push(`${He} has working`);
				if (slave.hears === -1) {
					r.push(`inner ears, but is hearing impaired${(slave.earShape === "none") ? `, likely due to missing the outer structure` : ``}.`);
				} else {
					r.push(`ears and good hearing.`);
				}
			}
			App.Events.addNode(el, r, "div");

			if (slave.earImplant !== 1) {
				if (slave.hears === -1) {
					if (slave.earShape !== "none") {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.EarFix(slave),
							refresh, cheat));
					}
				} else if (slave.hears === 0) {
					if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.EarMuffle(slave),
							refresh, cheat));
					}
				}
			}

			if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
				if (slave.earImplant === 0) {
					if (slave.hears > -2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Deafen(slave),
							refresh, cheat));
					}
					if (isProstheticAvailable(slave, "cochlear")) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.CochlearImplant(slave),
							refresh, cheat));
					}
				}
			}
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function horns() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			r.push(`${He} has`);
			if (slave.horn === "none") {
				r.push(`no horns.`);
			} else {
				r.push(`${slave.horn}.`);
			}
			App.Events.addNode(el, r, "div");

			if (slave.indentureRestrictions >= 2) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else if (slave.horn === "none") {
				/**
				 * @type {Array<[string, FC.HornType, string]>}
				 */
				const hornArray = [
					["Succubus horns", "curved succubus horns", "jet black"],
					["Backswept horns", "backswept horns", "jet black"],
					["Bovine horns", "cow horns", "ivory"],
					["One oni horn", "one long oni horn", slave.skin],
					["Two oni horns", "two long oni horns", slave.skin],
					["Small horns", "small horns", "ivory"],
				];
				for (const horn of hornArray) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Horn(slave, horn[0], horn[1], horn[2]),
						refresh, cheat));
				}
			} else {
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.HornGone(slave),
					refresh, cheat));
			}
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function lips() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			r.push(`${He} has`);
			if (slave.lips <= 10) {
				r.push(`thin, unattractive lips.`);
			} else if (slave.lips <= 20) {
				r.push(`normal lips.`);
			} else if (slave.lips <= 40) {
				r.push(`full, attractive lips.`);
			} else if (slave.lips <= 70) {
				r.push(`plump, beestung lips.`);
			} else if (slave.lips <= 95) {
				r.push(`huge, obviously augmented lips.`);
			} else {
				r.push(`a facepussy: ${his} lips are so huge that they're always a bit parted in the middle, forming a moist, inviting hole for cock.`);
			}
			if (slave.lipsImplant > 20) {
				r.push(`${He} has enormous lip implants.`);
			} else if (slave.lipsImplant > 10) {
				r.push(`${He} has large lip implants.`);
			} else if (slave.lipsImplant > 0) {
				r.push(`${He} has moderate lip implants.`);
			}
			r.push(App.UI.DOM.makeElement("span", `New implants will reduce ${his} oral skills`, "note"));

			App.Events.addNode(el, r, "div");

			const surgeries = App.Medicine.Surgery.sizingProcedures.lips(slave, App.Medicine.Surgery.allSizingOptions());
			const surgeryLinks = surgeries.map(s => App.Medicine.Surgery.makeLink(s, refresh, cheat));
			App.UI.DOM.appendNewElement("div", el, (App.UI.DOM.generateLinksStrip(surgeryLinks)), ["choices"]);

			return el;
		}

		function teeth() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			switch (slave.teeth) {
				case "crooked":
					r.push(`${He} has crooked teeth.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.ApplyBraces(slave),
						refresh, cheat));
					break;
				case "gapped":
					r.push(`${He} has a noticeable gap in ${his} front teeth.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.ApplyBraces(slave),
						refresh, cheat));
					break;
				case "straightening braces":
					r.push(`${His} crooked teeth are in braces.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RemoveBraces(slave),
						refresh, cheat));
					break;
				case "cosmetic braces":
					r.push(`${He} has braces on ${his} straight teeth.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RemoveCosmeticBraces(slave),
						refresh, cheat));
					break;
				case "removable":
					r.push(`${He} has prosthetic teeth that can be removed for extreme oral sex.`);
					break;
				case "pointy":
					r.push(`${His} teeth have been replaced with sturdy, realistic implants that mimic the dentition of a predator.`);
					if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.DentalImplant(slave),
							refresh, cheat));
					}
					break;
				case "fangs":
					r.push(`${His} upper canines have been replaced with sturdy, realistic implants that can only be described as vampiric.`);
					if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.FangImplant(slave),
							refresh, cheat));
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.DentalImplant(slave),
							refresh, cheat));
					}
					break;
				case "fang":
					r.push(`A single one of ${his} upper canines has been replaced with a sturdy, realistic implant shaped like a fang.`);
					if (slave.lips <= 50) {
						r.push(`It is occasionally visible over ${his} lower lip.`);
					}
					if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemovableTeeth(slave),
							refresh, cheat));
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.FangsImplant(slave),
							refresh, cheat));
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.DentalImplant(slave),
							refresh, cheat));
					}
					break;
				case "baby":
					r.push(`${He} has baby teeth.`);
					if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.DentalImplant(slave),
							refresh, cheat));
					}
					break;
				case "mixed":
					r.push(`${He} has a mix of baby and normal teeth.`);
					break;
				default:
					r.push(`${He} has normal, healthy teeth.`);
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.AddCosmeticBraces(slave),
						refresh, cheat));
					if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.FangImplant(slave),
							refresh, cheat));
					}
			}
			if (V.seeExtreme === 1 && slave.indentureRestrictions < 1) {
				if (slave.teeth !== "removable") {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.RemovableTeeth(slave),
						refresh, cheat));
				}

				if (slave.teeth !== "pointy") {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.SharpTeeth(slave),
						refresh, cheat));
				}

				if (slave.teeth !== "fangs" && slave.teeth !== "fang") {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.FangsImplant(slave),
						refresh, cheat));
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function voice() {
			const el = new DocumentFragment();
			const r = [];
			if (slave.electrolarynx === 1) {
				r.push(`${He} has an artificial larynx.`);
			} else {
				if (slave.voice === 0) {
					r.push(`${He} is mute.`);
				} else if (slave.voice === 1) {
					r.push(`${He} has a deep voice.`);
				} else if (slave.voice === 2) {
					r.push(`${He} has a feminine voice.`);
				} else if (slave.voice === 3) {
					r.push(`${He} has a high, girly voice.`);
				}
				if (slave.voiceImplant >= 1) {
					r.push(`${He} has had surgery on ${his} voice box to raise ${his} voice.`);
				} else if (slave.voiceImplant <= -1) {
					r.push(`${He} has had surgery on ${his} voice box to lower ${his} voice.`);
				}
			}
			App.Events.addNode(el, r, "div");
			if (slave.indentureRestrictions < 1 && slave.electrolarynx !== 1) {
				const linkArray = [];
				if (slave.voice !== 0) {
					if (slave.voice < 3) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.VoiceRaise(slave),
							refresh, cheat));
					}
					if (slave.voice > 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.VoiceLower(slave),
							refresh, cheat));
					}
					if (V.seeExtreme === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.Mute(slave),
							refresh, cheat));
					}
				} else if (isProstheticAvailable(slave, "electrolarynx")) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Electrolarynx(slave),
						refresh, cheat));
				}
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			}
			return el;
		}

		function chemosensory() {
			const el = new DocumentFragment();
			const r = [];
			if (slave.smells === 0 && slave.tastes === 0) {
				r.push(`${He} has a working chemosensory system.`);
			} else if (slave.smells === 0) {
				r.push(`${He} has a working olfactory system and an impaired gustatory system.`);
			} else if (slave.tastes === 0) {
				r.push(`${He} has a working gustatory system and an impaired olfactory system.`);
			} else {
				r.push(`${He} has an impaired chemosensory system.`);
			}
			App.Events.addNode(el, r, "div");
			if (slave.indentureRestrictions < 1) {
				const linkArray = [];
				if (slave.smells === 0 && V.seeExtreme === 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Desmell(slave),
						refresh, cheat));
				} else if (slave.smells === -1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Resmell(slave),
						refresh, cheat));
				}
				if (slave.tastes === 0 && V.seeExtreme === 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Detaste(slave),
						refresh, cheat));
				} else if (slave.tastes === -1) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Retaste(slave),
						refresh, cheat));
				}
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			}
			return el;
		}
	}
};
