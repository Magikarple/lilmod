// WARNING This file defines objects referenced in slaveSummaryWidgets.js.
// Either keep this file above the slaveSummaryWidgets.js in the name ordered list
// (tweego process them in this order), or rework the references.

/* eslint-disable camelcase */
// cSpell:ignore Natr

App.UI.SlaveSummaryImpl = function() {
	const data = App.Data.SlaveSummary;

	const helpers = function() {
		/**
		 * @param {HTMLElement} element
		 * @param {string|string[]} [classNames]
		 */
		function _addClassNames(element, classNames) {
			if (classNames != undefined) { /* eslint-disable-line eqeqeq */
				if (Array.isArray(classNames)) {
					element.classList.add(...classNames);
				} else {
					element.classList.add(classNames);
				}
			}
		}

		/**
		 * @param {Node} container
		 * @param {string} text
		 * @param {string|string[]} [classNames]
		 * @param {boolean} [stdDecor=false]
		 * @param {number} [value]
		 */
		function makeSpan(container, text, classNames, stdDecor = false, value) {
			let r = document.createElement("span");
			_addClassNames(r, classNames);
			if (value != undefined && V.summaryStats) { /* eslint-disable-line eqeqeq */
				text += `[${value}]`;
			}
			r.textContent = stdDecor ? `${capFirstChar(text)}. ` : text + ' ';
			if (container) {
				container.appendChild(r);
			}
			return r;
		}

		/**
		 * @param {Node} container
		 * @param {string} text
		 * @returns {Text}
		 */
		function addText(container, text) {
			const r = document.createTextNode(text);
			if (container) {
				container.appendChild(r);
			}
			return r;
		}

		/**
		 * @param {Node} [container]
		 * @param {string|string[]} [classNames]
		 */
		function makeBlock(container, classNames) {
			let r = document.createElement("span");
			r.classList.add("ssb");
			_addClassNames(r, classNames);
			if (container) {
				container.appendChild(r);
			}
			return r;
		}

		/**
		 * @param {Node} container
		 * @param {string|string[]} [classNames]
		 * @returns {HTMLParagraphElement}
		 */
		function makeParagraph(container, classNames) {
			let r = document.createElement("p");
			r.classList.add("si");
			_addClassNames(r, classNames);
			if (container) {
				container.appendChild(r);
			}
			return r;
		}

		/**
		 * @typedef {object} StyledDesc
		 * @property {string} desc
		 * @property {string|string[]} [style]
		 */

		/** @typedef {{[key: number]: StyledDesc}} StyledRatings */
		/**
		 * @param {Node} container
		 * @param {StyledRatings} ratings
		 * @param {number} [value]
		 * @param {number} [offset] value offset in the ratings dictionary (to eliminate negative values)
		 * @param {boolean} [stdDecor=false]
		 */
		function makeRatedStyledSpan(container, ratings, value, offset = 0, stdDecor = false) {
			const d = App.Ratings.numeric(ratings, value + offset);
			if (d) {
				makeSpan(container, d.desc, d.style, stdDecor, value);
			}
		}

		/**
		 * @param {Node} container
		 * @param {StyledDesc} styledDesc
		 * @param {number} [value]
		 * @param {boolean} [stdDecor]
		 */
		function makeStyledSpan(container, styledDesc, value, stdDecor = false) {
			if (styledDesc) {
				makeSpan(container, styledDesc.desc, styledDesc.style, stdDecor, value);
			}
		}

		/**
		 * @param {Node} container
		 * @param {StyledRatings} ratings
		 * @param {string|number} value
		 */
		function makeMappedStyledSpan(container, ratings, value) {
			const d = ratings[value];
			if (d) {
				makeSpan(container, d.desc, d.style);
			}
		}

		/**
		 * @param {Node} container
		 * @param {{[key: string]: string}} ratings
		 * @param {string|number} value
		 * @param {string|string[]} [classNames]
		 */
		function makeMappedSpan(container, ratings, value, classNames) {
			const d = ratings[value];
			if (d) {
				makeSpan(container, d, classNames);
			}
		}

		/**
		 * Returns first three string characters with the first one uppercased (string -> Str)
		 * @param {string} s
		 * @returns {string}
		 */
		function firstThreeUc(s) {
			return s.charAt(0).toUpperCase() + s.charAt(1) + s.charAt(2);
		}

		/**
		 * @param {FC.ArcologyState} arcology
		 */
		function syncFSData(arcology) {
			arcology = arcology || V.arcologies[0];
			for (const fsp of App.Data.FutureSociety.fsNames) {
				const policy = arcology[fsp];
				const p = fsp.slice(2);
				FSData.policy[p] = {
					active: _.isNil(policy) ? 0 : 1,
					strength: Math.trunc((policy ?? 0) / 10)
				};
			}

			const dislikeBigButts = (FSData.policy.TransformationFetishist.strength < 2) && (FSData.policy.HedonisticDecadence.strength < 2) && (FSData.policy.AssetExpansionist.strength < 2) && (arcology.FSIntellectualDependencyLawBeauty === 0);
			FSData.bigButts = dislikeBigButts ? -1 : 0;
		}

		/**
		 * @typedef {object} FSDatum
		 * @property {number} active FS policy is active (0,1)
		 * @property {number} strength FS decoration level divided by 10
		 */
		const FSData = {
			/** @type {{[key: string]: FSDatum}} */
			policy: {},
			bigButts: 0,
		};

		/**
		 *
		 * @param {ParentNode} container
		 * @param {App.Entity.SlaveState} slave
		 * @param {string} text
		 * @returns {HTMLSpanElement}
		 */
		function referenceSlaveWithPreview(container, slave, text) {
			const preview = App.UI.DOM.referenceSlaveWithPreview(slave, text);
			container.append(preview);
			return preview;
		}

		const longFamilyBits = {
			and: " and ",
			makeBit: s => s + '.',
			daughters10: "Has tons of daughters.",
			daughters5: "Has many daughters.",
			daughters1: "Has several daughters.",
			sisters10: "One of many sisters.",
			sisters5: "Has many sisters.",
			sisters1: "Has several sisters.",
			emotionBind: "Emotionally bonded to you.",
			emotionSlut: "Emotional slut."
		};

		const shortFamilyBits = {
			and: " & ",
			makeBit: s => s,
			daughters10: "tons of daughters",
			daughters5: "many daughters",
			daughters1: "has daughters",
			sisters10: "One of many sisters.",
			sisters5: "Has many sisters.",
			sisters1: "Has several sisters.",
			emotionBind: "E Bonded",
			emotionSlut: "E Slut"
		};

		/**
		 * @param {Node} container
		 * @param {App.Entity.SlaveState} slave
		 * @param {boolean} short
		 */
		function renderFamily(container, slave, short) {
			let handled = 0;
			const bits = short ? shortFamilyBits : longFamilyBits;
			const block = makeBlock();
			const cssClassName = "lightgreen";
			if (slave.mother > 0) {
				const ssj = V.slaves.find(s => s.ID === slave.mother);
				if (ssj) {
					helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
					addText(block, "'s ");
					let spanText = getPronouns(slave).daughter;
					if (slave.relationshipTarget === ssj.ID) {
						spanText += `${bits.and}${relationshipTerm(slave)}`;
						handled = 1;
					}
					makeSpan(block, bits.makeBit(spanText), cssClassName);
				}
			} else if (slave.mother === -1) {
				addText(block, `Your `);
				if (slave.relationship < -1) {
					makeSpan(block, bits.makeBit(`${getPronouns(slave).daughter}${bits.and}${PCrelationshipTerm(slave)}`), cssClassName);
					handled = 1;
				} else {
					makeSpan(block, bits.makeBit(getPronouns(slave).daughter), cssClassName);
				}
			} else if (slave.mother in V.missingTable && V.showMissingSlavesSD && V.showMissingSlaves) {
				addText(block, `${V.missingTable[slave.mother].fullName}'s `);
				makeSpan(block, bits.makeBit(getPronouns(slave).daughter), cssClassName);
			}
			if (slave.father > 0 && slave.father !== slave.mother) {
				const ssj = V.slaves.find(s => s.ID === slave.father);
				if (ssj) {
					helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
					addText(block, "'s ");
					let spanText = getPronouns(slave).daughter;
					if (slave.relationshipTarget === ssj.ID) {
						spanText += `${bits.and}${relationshipTerm(slave)}`;
						handled = 1;
					}
					makeSpan(block, bits.makeBit(spanText), cssClassName);
				}
			} else if (slave.father === -1 && slave.father !== slave.mother) {
				addText(block, `Your `);
				if (slave.relationship < -1) {
					makeSpan(block, bits.makeBit(`${getPronouns(slave).daughter}${bits.and}${PCrelationshipTerm(slave)}`), cssClassName);
					handled = 1;
				} else {
					makeSpan(block, bits.makeBit(getPronouns(slave).daughter), cssClassName);
				}
			} else if (slave.father in V.missingTable && slave.father !== slave.mother && V.showMissingSlavesSD && V.showMissingSlaves) {
				addText(block, `${V.missingTable[slave.father].fullName}'s `);
				makeSpan(block, bits.makeBit(getPronouns(slave).daughter), cssClassName);
			}
			if (areSisters(V.PC, slave) > 0) {
				addText(block, `Your `);
				if (slave.relationship < -1) {
					makeSpan(block, bits.makeBit(`${siblingTerm(V.PC, slave)}${bits.and}${PCrelationshipTerm(slave)}`), cssClassName);
					handled = 1;
				} else {
					makeSpan(block, bits.makeBit(siblingTerm(V.PC, slave)), cssClassName);
				}
			}
			if (slave.daughters === 1) {
				const ssj = V.slaves.find(s => s.mother === slave.ID || s.father === slave.ID);
				if (ssj) {
					helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
					addText(block, "'s ");
					let spanText = parentTerm(ssj, slave);
					if (slave.relationshipTarget === ssj.ID) {
						spanText += `${bits.and}${relationshipTerm(slave)}`;
						handled = 1;
					}
					makeSpan(block, bits.makeBit(spanText), cssClassName);
				}
			} else if (slave.daughters > 1) {
				if (slave.daughters > 10) {
					makeSpan(block, bits.daughters10, cssClassName);
				} else if (slave.daughters > 5) {
					makeSpan(block, bits.daughters5, cssClassName);
				} else {
					makeSpan(block, bits.daughters1, cssClassName);
				}
			}
			if (slave.sisters === 1) {
				const ssj = V.slaves.find(s => areSisters(s, slave) > 0);
				if (ssj) {
					helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
					addText(block, "'s ");
					let spanText = getPronouns(slave).sister;
					if (slave.relationshipTarget === ssj.ID) {
						spanText += `${bits.and}${relationshipTerm(slave)}`;
						handled = 1;
					}
					makeSpan(block, bits.makeBit(spanText), cssClassName);
				}
			} else if (slave.sisters > 1) {
				if (slave.sisters > 10) {
					makeSpan(block, bits.sisters10, cssClassName);
				} else if (slave.sisters > 5) {
					makeSpan(block, bits.sisters5, cssClassName);
				} else {
					makeSpan(block, bits.sisters1, cssClassName);
				}
			}
			if (slave.relationship > 0 && handled !== 1) {
				const ssj = V.slaves.find(s => s.ID === slave.relationshipTarget);
				if (ssj) {
					helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
					addText(block, "'s ");
					makeSpan(block, bits.makeBit(relationshipTerm(slave)), cssClassName);
				}
			} else if (slave.relationship === -3 && !areRelated(V.PC, slave)) {
				makeSpan(block, bits.makeBit(`Your ${getPronouns(slave).wife}`), cssClassName);
			} else if (slave.relationship === -2) {
				makeSpan(block, bits.emotionBind, cssClassName);
			} else if (slave.relationship === -1) {
				makeSpan(block, bits.emotionSlut, cssClassName);
			}

			if (block.textContent.length > 0) {
				container.appendChild(block);
			}
		}

		return {
			addText,
			makeSpan,
			makeBlock,
			makeParagraph,
			makeStyledSpan,
			makeRatedStyledSpan,
			makeMappedStyledSpan,
			makeMappedSpan,
			firstThreeUc,
			syncFSData,
			FSData,
			referenceSlaveWithPreview,
			renderFamily
		};
	}();

	const bits = function() {
		const addText = helpers.addText;
		const makeSpan = helpers.makeSpan;
		const makeBlock = helpers.makeBlock;
		const makeRatedStyledSpan = helpers.makeRatedStyledSpan;

		/**
		 * Returns index in the hips-ass rating table
		 * @param {App.Entity.SlaveState} slave
		 * @returns {number} 0 if butt is considered too small, 1 is too big, -1 otherwise.
		 */
		function hipsAssRating(slave) {
			const FSData = helpers.FSData;
			if (slave.hips < -1) {
				if (slave.butt > 2 && FSData.bigButts <= 0) {
					return 1;
				}
			} else if (slave.hips < 0) {
				if (slave.butt > 4 && FSData.bigButts <= 0) {
					return 1;
				}
			} else if (slave.hips > 2) {
				if (slave.butt <= 8) {
					return 0;
				}
			} else if (slave.hips > 1) {
				if (slave.butt <= 3 && (FSData.policy.SlimnessEnthusiast.active === 0 || (slave.boobs >= 500))) {
					return 0;
				}
			} else if (slave.hips > 0) {
				if (slave.butt > 8) {
					if (FSData.bigButts <= 0) {
						return 1;
					}
				} else if (slave.butt <= 2 && ((FSData.policy.SlimnessEnthusiast.active === 0) || (slave.boobs >= 500))) {
					return 0;
				}
			} else {
				if (slave.butt > 6) {
					if (FSData.bigButts <= 0) {
						return 1;
					}
				} else if (slave.butt <= 1 && (FSData.policy.SlimnessEnthusiast.active === 0 || (slave.boobs >= 500))) {
					return 0;
				}
			}
			return -1;
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {FC.Data.SlaveSummary.SmartVibrator} spData
		 * @returns {string}
		 */
		function smartFetishStr(slave, spData) {
			/** @type {string} */
			let value;
			if (slave.piercing.genitals.smart) {
				value = spData.system.piercing;
			} else if (slave.dickAccessory === "smart bullet vibrator") {
				value = spData.system.bullet;
			} else {
				value = spData.system.vibe;
			}
			value += ":";
			if (slave.fetishKnown === 1) {
				if (slave.clitSetting === "off") {
					return value + spData.setting.off;
				} else if ((slave.energy <= 95) && (slave.clitSetting === "all")) {
					return value + spData.setting.all;
				} else if ((slave.energy > 5) && (slave.clitSetting === "none")) {
					return value + spData.setting.none;
				} else if (slave.fetishStrength <= 95 || !smartPiercingReinforcesFetish(slave)) {
					const s = value + spData.setting[slave.clitSetting];
					if (s) {
						return s;
					}
				}
				if (!["anti-men", "anti-women", "men", "women"].includes(slave.clitSetting)) {
					return value + spData.setting.monitoring;
				}
			} else {
				return value + spData.setting[slave.clitSetting];
			}
			return null;
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {FC.Data.SlaveSummary.SmartVibrator} spData
		 * @returns {string}
		 */
		function smartAttractionStr(slave, spData) {
			const sps = spData.setting;
			const cs = slave.clitSetting;
			if (slave.attrKnown === 1) {
				switch (cs) {
					case "women":
						if (slave.attrXX < 95) {
							return sps.women;
						} else {
							return sps.monitoring;
						}
					case "men":
						if (slave.attrXY < 95) {
							return sps.men;
						} else {
							return sps.monitoring;
						}
					case "anti-women":
						if (slave.attrXX > 0) {
							return sps["anti-women"];
						} else {
							return sps.monitoring;
						}
					case "anti-men":
						if (slave.attrXY > 0) {
							return sps["anti-men"];
						} else {
							return sps.monitoring;
						}
				}
			} else {
				switch (cs) {
					// fall-through
					case "women":
					case "men":
					case "anti-women":
					case "anti-men":
						return sps[cs];
				}
			}
			return null;
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_health(slave, c) {
			if (slave.health.health < -20) {
				makeSpan(c, "H", ["red", "strong"], true, slave.health.health);
			} else if (slave.health.health <= 20) {
				makeSpan(c, "H", ["yellow", "strong"], true, slave.health.health);
			} else if (slave.health.health > 20) {
				makeSpan(c, "H", ["green", "strong"], true, slave.health.health);
			}
			if (passage() === "Clinic" && V.clinicUpgradeScanner) {
				if (slave.chem > 15) {
					makeSpan(c, `C${Math.ceil(slave.chem / 10)}`, ["cyan", "strong"]);
				} else if (slave.chem <= 15 && slave.assignment === Job.CLINIC) {
					makeSpan(c, `CSafe`, ["green", "strong"]);
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_illness(slave, c) {
			if (slave.health.illness > 2) {
				makeSpan(c, `Ill${slave.health.illness}`, ["red", "strong"], true, slave.health.illness);
			} else if (slave.health.illness > 0) {
				makeSpan(c, `Ill${slave.health.illness}`, ["yellow", "strong"], true, slave.health.illness);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_tired(slave, c) {
			helpers.makeRatedStyledSpan(c, data.short.health.tiredness, slave.health.tired, 0, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_health(slave, c) {
			helpers.makeRatedStyledSpan(c, data.long.health.health, slave.health.health, 100, true);
			if (passage() === "Clinic" && V.clinicUpgradeScanner) {
				if (slave.chem > 15) {
					makeSpan(c, `Carcinogen buildup: ${Math.ceil(slave.chem / 10)}.`, "cyan");
				} else if (slave.chem <= 15 && slave.assignment === Job.CLINIC) {
					makeSpan(c, `Safe chem levels.`, "green");
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_illness(slave, c) {
			makeRatedStyledSpan(c, data.long.health.illness, slave.health.illness, 0, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_tired(slave, c) {
			makeRatedStyledSpan(c, data.long.health.tiredness, slave.health.tired, 0, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_age(slave, c) {
			const style = "pink";
			makeSpan(c, V.showAgeDetail ? `Age ${slave.actualAge}` : App.Ratings.numeric(data.long.body.age, slave.actualAge), style, true);
			/*
			 ** No NCS, then do the standard, However because of the wrinkles of Incubators, as long as visual age is greater
			 ** than or equal to physical age, we do the old physical body/Looks for fresh out of the can NCS slaves.
			 */
			if (((slave.geneMods.NCS === 0) || (slave.visualAge >= slave.physicalAge))) {
				if (slave.actualAge !== slave.physicalAge) {
					makeSpan(c, `${slave.physicalAge} year old body`, style, true);
				}
				if (slave.visualAge !== slave.physicalAge) {
					makeSpan(c, `Looks ${slave.visualAge}`, style, true);
				}
			} else {
				/*
				 ** Now the rub. The use of physical Age for the year old body above, basically conflicts with the changes
				 ** that NCS introduces, so here to *distinguish* the changes, we use visual age with the 'year old body'
				 ** and appears, for example: Slave release from incubator at age 10, Her summary would show, 'Age 0. 10
				 ** year old body.' But if she's given NCS a few weeks after release, while she's still before her first
				 ** birthday, it'll appear the same. But once her birthday fires, if we ran with the above code it would
				 ** say: 'Age 1. 11 year old body.' -- this conflicts with the way NCS works though, because she hasn't
				 ** visually aged, so our change here makes it say 'Age 1. Appears to have a 10 year old body.'
				 */
				makeSpan(c, `Appears to have a ${slave.visualAge} year old body`, style, true);
			}
			if (slave.geneMods.NCS === 1) {
				makeSpan(c, "NCS", "orange", true);
			}
			if (slave.geneMods.immortality === 1) {
				makeSpan(c, "Immortal", "orange", true);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_face(slave, c) {
			const r = App.Ratings.numeric(data.long.body.face, slave.face + 100);
			makeSpan(c, `${r.desc} ${slave.faceShape} face`, r.style, true, slave.face);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_eyes(slave, c) {
			if (!canSee(slave)) {
				makeSpan(c, "Blind.", "red");
			} else if (!canSeePerfectly(slave)) {
				makeSpan(c, "Nearsighted.", "yellow");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_ears(slave, c) {
			if (slave.hears <= -2) {
				makeSpan(c, "Deaf.", "red");
			} else if ((slave.hears === -1) && (slave.earwear !== "hearing aids")) {
				makeSpan(c, "Hard of hearing.", "yellow");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_lips(slave, c) {
			makeRatedStyledSpan(c, data.long.body.lips, slave.lips, 0, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_teeth(slave, c) {
			helpers.makeMappedStyledSpan(c, data.long.body.teeth, slave.teeth);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_muscles(slave, c) {
			const h = helpers;
			h.makeStyledSpan(c, App.Ratings.multiNumeric(data.long.body.muscles, [slave.muscles + 100, h.FSData.policy.PhysicalIdealist.active]), slave.muscles, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_voice(slave, c) {
			if (slave.voice === 0) {
				makeSpan(c, "Mute.", "red");
			} else {
				helpers.makeMappedStyledSpan(c, data.long.accent, slave.accent);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_tits_ass(slave, c) {
			const h = helpers;
			h.makeStyledSpan(c,
				App.Ratings.multiNumeric(data.long.body.titsAss,
					[slave.boobs, slave.butt, h.FSData.policy.AssetExpansionist.active, slave.weight + 100, slave.muscles + 100]));
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_hips(slave, c) {
			const di = hipsAssRating(slave);
			if (di >= 0) {
				helpers.makeMappedStyledSpan(c, data.long.body.hipsAss, di);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_waist(slave, c) {
			makeRatedStyledSpan(c, data.long.body.waist, slave.waist, 100, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_implants(slave, c) {
			const styles = "pink";
			if ((slave.boobsImplant !== 0) || (slave.buttImplant !== 0) || (slave.lipsImplant !== 0) || (slave.bellyImplant !== -1)) {
				makeSpan(c, "Implants.", styles);
			} else if ((slave.faceImplant > 5) || (slave.waist < -95)) {
				makeSpan(c, "Surgery enhanced.", styles);
			} else {
				makeSpan(c, "All natural.", styles);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_lactation(slave, c) {
			if (slave.lactation === 1) {
				makeSpan(c, "Lactating naturally.", "pink");
			} else if (slave.lactation === 2) {
				makeSpan(c, "Heavy lactation.", "pink");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function milk_flavor(slave, c) {
			if (slave.milkFlavor !== "none" && slave.lactation >= 1) {
				makeSpan(c, `${capFirstChar(slave.milkFlavor)} flavored milk.`, "pink");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_mods(slave, c) {
			const modScore = SlaveStatsChecker.modScore(slave);
			if (slave.piercing.corset.weight === 0 && modScore.piercing < 3 && modScore.tat < 2) {
				return;
			}
			if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
				makeSpan(c, "Extensive body mods.");
			} else if (modScore.total > 7) {
				makeSpan(c, "Noticeable body mods.");
			} else {
				makeSpan(c, "Light body mods.");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_age(slave, c) {
			let r = makeSpan(c, "", "pink");
			if (V.showAgeDetail === 1) {
				r.textContent += slave.actualAge.toString();
			} else if (slave.actualAge >= 18) {
				r.textContent += App.Ratings.numeric(data.short.body.age, slave.actualAge);
			}

			if (slave.actualAge !== slave.physicalAge) {
				r.textContent += ` w ${slave.physicalAge}y-bdy`;
			}
			if (slave.visualAge !== slave.physicalAge) {
				r.textContent += ` Lks${slave.visualAge}`;
			}
			r.textContent += " ";
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_face(slave, c) {
			makeRatedStyledSpan(c, data.short.body.face, slave.face, 100, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_eyes(slave, c) {
			if (!canSee(slave)) {
				makeSpan(c, "Blind", "red");
			} else if (!canSeePerfectly(slave)) {
				makeSpan(c, "Sight-", "yellow");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_ears(slave, c) {
			if (slave.hears === -2) {
				makeSpan(c, "Deaf", "red");
			} else if ((slave.hears === -1) && (slave.earwear !== "hearing aids")) {
				makeSpan(c, "Hearing-", "yellow");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_lips(slave, c) {
			makeRatedStyledSpan(c, data.short.body.lips, slave.lips, 0, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_teeth(slave, c) {
			helpers.makeMappedStyledSpan(c, data.short.body.teeth, slave.teeth);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_muscles(slave, c) {
			const h = helpers;
			h.makeStyledSpan(c, App.Ratings.multiNumeric(data.short.body.muscles, [slave.muscles + 100, h.FSData.policy.PhysicalIdealist.active]), slave.muscles, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_voice(slave, c) {
			if (slave.voice === 0) {
				makeSpan(c, "Mute", "red");
			} else {
				helpers.makeMappedStyledSpan(c, data.short.accent, slave.accent);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_tits_ass(slave, c) {
			const h = helpers;
			h.makeStyledSpan(c,
				App.Ratings.multiNumeric(data.short.body.titsAss,
					[slave.boobs, slave.butt, h.FSData.policy.AssetExpansionist.active, slave.weight + 100, slave.muscles + 100]));
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_hips(slave, c) {
			const di = hipsAssRating(slave);
			if (di >= 0) {
				helpers.makeMappedStyledSpan(c, data.short.body.hipsAss, di);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_waist(slave, c) {
			makeRatedStyledSpan(c, data.short.body.waist, slave.waist, 100, false);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_implants(slave, c) {
			if ((slave.boobsImplant === 0) && (slave.buttImplant === 0) && (slave.waist >= -95) && (slave.lipsImplant === 0) && (slave.faceImplant <= 5) && (slave.bellyImplant === -1)) {
				makeSpan(c, "Natr", "pink");
			} else {
				makeSpan(c, "Impl", "pink");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_lactation(slave, c) {
			if (slave.lactation === 1) {
				makeSpan(c, "Lact", "pink");
			} else if (slave.lactation === 2) {
				makeSpan(c, "Lact", "pink");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_mods(slave, c) {
			const modScore = SlaveStatsChecker.modScore(slave);
			if (slave.piercing.corset.weight === 0 && modScore.piercing < 3 && modScore.tat < 2) {
				return;
			} else if (modScore.total > 15 || (modScore.piercing > 8 && modScore.tat > 5)) {
				makeSpan(c, "Mods++");
			} else if (modScore.total > 7) {
				makeSpan(c, "Mods+");
			} else {
				makeSpan(c, "Mods");
			}
			const brands = App.Medicine.Modification.brandRecord(slave);
			if (!jQuery.isEmptyObject(brands)) {
				makeSpan(c, "Br");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_intelligence(slave, c) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				return;
			}
			const intelligence = slave.intelligence + slave.intelligenceImplant;
			const educationStr = App.Ratings.numeric(data.short.mental.education, slave.intelligenceImplant + 15);
			const intelligenceRating = App.Ratings.numeric(data.short.mental.intelligence, intelligence + 100);
			makeSpan(c, `${intelligenceRating.desc}${educationStr}`, intelligenceRating.style, true, intelligence);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_skills(slave, c) {
			const sd = data.short.skills;
			let SSkills = (slave.skill.anal + slave.skill.oral);
			let PSU = penetrativeSocialUse();
			if (
				((SSkills + slave.skill.whoring + slave.skill.entertainment) >= 400) &&
				((slave.vagina < 0) || (slave.skill.vaginal >= 100)) &&
				((PSU < 60 && (PSU < 40 || (!canAchieveErection(slave) && slave.clit < 3))) || (slave.skill.penetrative >= 100))
			) {
				helpers.makeStyledSpan(c, sd.mss);
			} else {
				SSkills += slave.skill.vaginal + adjustedPenSkill(slave);
				helpers.makeStyledSpan(c, App.Ratings.multiNumeric(sd.sex, [SSkills, ((slave.vagina >= 0 ? 1 : 0) + (slave.dick > 0 ? 2 : 0))]), Math.trunc(SSkills), true);
				helpers.makeRatedStyledSpan(c, sd.whoring, slave.skill.whoring, 0, true);
				helpers.makeRatedStyledSpan(c, sd.entertainment, slave.skill.entertainment, 0, true);
			}
			helpers.makeRatedStyledSpan(c, sd.combat, slave.skill.combat, 0, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_prestige(slave, c) {
			helpers.makeMappedStyledSpan(c, data.short.prestige, slave.prestige);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_porn_prestige(slave, c) {
			helpers.makeMappedStyledSpan(c, data.short.pornPrestige, slave.porn.prestige);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_intelligence(slave, c) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				return;
			}
			const intelligence = slave.intelligence + slave.intelligenceImplant;
			const educationStr = App.Ratings.numeric(data.long.mental.education, slave.intelligenceImplant + 15);
			const intelligenceRating = App.Ratings.numeric(data.long.mental.intelligence, intelligence + 100);
			makeSpan(c, `${intelligenceRating.desc}${educationStr}`, intelligenceRating.style, true, intelligence);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_skills(slave, c) {
			const sd = data.long.skills;
			let SSkills = (slave.skill.anal + slave.skill.oral);
			let PSU = penetrativeSocialUse();
			if (
				((SSkills + slave.skill.whoring + slave.skill.entertainment) >= 400) &&
				((slave.vagina < 0) || (slave.skill.vaginal >= 100)) &&
				((PSU < 60 && (PSU < 40 || (!canAchieveErection(slave) && slave.clit < 3))) || (slave.skill.penetrative >= 100))
			) {
				helpers.makeStyledSpan(c, sd.mss);
			} else {
				SSkills += slave.skill.vaginal + adjustedPenSkill(slave);
				helpers.makeStyledSpan(c, App.Ratings.multiNumeric(sd.sex, [SSkills, ((slave.vagina >= 0 ? 1 : 0) + (slave.dick > 0 ? 2 : 0))]), Math.trunc(SSkills), true);
				helpers.makeRatedStyledSpan(c, sd.whoring, slave.skill.whoring, 0, true);
				helpers.makeRatedStyledSpan(c, sd.entertainment, slave.skill.entertainment, 0, true);
			}
			helpers.makeRatedStyledSpan(c, sd.combat, slave.skill.combat, 0, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_prestige(slave, c) {
			helpers.makeMappedStyledSpan(c, data.long.prestige, slave.prestige);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_porn_prestige(slave, c) {
			helpers.makeMappedStyledSpan(c, data.long.pornPrestige, slave.porn.prestige);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_clothes(slave, c) {
			makeSpan(c, App.Ratings.exact(data.long.clothes, slave.clothes, 'Naked.'));
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_collar(slave, c) {
			helpers.makeMappedSpan(c, data.long.accessory.collar, slave.collar);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_mask(slave, c) {
			helpers.makeMappedSpan(c, data.long.accessory.faceAccessory, slave.faceAccessory);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_mouth(slave, c) {
			helpers.makeMappedSpan(c, data.long.accessory.mouthAccessory, slave.mouthAccessory);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_belly(slave, c) {
			helpers.makeMappedSpan(c, data.long.accessory.belly, slave.bellyAccessory);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_arms(slave, c) {
			if (["hand gloves", "elbow gloves"].includes(slave.armAccessory)) {
				makeSpan(c, slave.armAccessory, undefined, true);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_legs(slave, c) {
			if (slave.legAccessory === "short stockings") {
				makeSpan(c, "Short stockings.");
			} else if (slave.legAccessory === "long stockings") {
				makeSpan(c, "Long stockings.");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_shoes(slave, c) {
			if (shoeHeelCategory(slave) > 0) {
				makeSpan(c, slave.shoes, undefined, true);
			} else if (slave.heels === 1) {
				makeSpan(c, "Crawling.", "yellow");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_chastity(slave, c) {
			if (slave.chastityAnus === 1 && slave.chastityPenis === 1 && slave.chastityVagina === 1) {
				makeSpan(c, "Full chastity.");
			} else if (slave.chastityPenis === 1 && slave.chastityVagina === 1) {
				makeSpan(c, "Genital chastity.");
			} else if ((slave.chastityAnus === 1 && slave.chastityVagina === 1) || (slave.chastityAnus === 1 && slave.chastityPenis === 1)) {
				makeSpan(c, "Combined chastity.");
			} else if (slave.chastityVagina === 1) {
				makeSpan(c, "Vaginal chastity.");
			} else if (slave.chastityPenis === 1) {
				makeSpan(c, "Chastity cage.");
			} else if (slave.chastityAnus === 1) {
				makeSpan(c, "Anal chastity.");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_vaginal_acc(slave, c) {
			if (slave.vaginalAttachment === "none") {
				helpers.makeMappedSpan(c, data.long.accessory.vaginal, slave.vaginalAccessory);
			} else {
				switch (slave.vaginalAttachment) {
					case "vibrator":
						makeSpan(c, "Vibrating dildo.");
						break;
					case "smart vibrator":
						makeSpan(c, "Smart vibrating dildo.");
						break;
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_dick_acc(slave, c) {
			switch (slave.dickAccessory) {
				case "sock":
					makeSpan(c, "Cock sock.");
					break;
				case "bullet vibrator":
					makeSpan(c, "Frenulum bullet vibrator.");
					break;
				case "smart bullet vibrator":
					makeSpan(c, "Smart frenulum bullet vibrator.");
					break;
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_buttplug(slave, c) {
			helpers.makeMappedSpan(c, data.long.accessory.buttplug, slave.buttplug);
			helpers.makeMappedSpan(c, data.long.accessory.buttplugAttachment, slave.buttplugAttachment);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_fetish(slave, c) {
			function fetishStr(slave) {
				const tbl = data.short.fetish[slave.fetish];
				if (!tbl || typeof tbl === 'string') {
					return tbl;
				}
				return App.Ratings.numeric(tbl, slave.fetishStrength);
			}

			const fStr = fetishStr(slave);
			if (fStr) {
				makeSpan(c, fStr, "lightcoral", true, slave.fetishStrength);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_attraction(slave, c) {
			const sd = data.short.sexDrive;
			// check for special cases first
			if (slave.energy > 95 && slave.attrXX > 95 && slave.attrXY > 95) {
				helpers.makeStyledSpan(c, sd.synergy.nymphomni);
			} else if (slave.attrXX > 95 && slave.attrXY > 95) {
				helpers.makeStyledSpan(c, sd.synergy.omni);
				helpers.makeRatedStyledSpan(c, sd.energy, slave.energy, 0, true);
			} else {
				helpers.makeRatedStyledSpan(c, sd.XY, slave.attrXY, 0, true);
				helpers.makeRatedStyledSpan(c, sd.XX, slave.attrXX, 0, true);
				helpers.makeRatedStyledSpan(c, sd.energy, slave.energy, 0, true);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_smart_piercing(slave, c) {
			const s = smartFetishStr(slave, data.short.smartVibrator) || smartAttractionStr(slave, data.short.smartVibrator);
			if (s) {
				makeSpan(c, s);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_behavior_flaw(slave, c) {
			helpers.makeMappedSpan(c, data.short.mental.behavioralFlaw, slave.behavioralFlaw, "red");
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_sex_flaw(slave, c) {
			helpers.makeMappedStyledSpan(c, data.short.mental.sexualFlaw, slave.sexualFlaw);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_behavior_quirk(slave, c) {
			helpers.makeMappedSpan(c, data.short.mental.behavioralQuirk, slave.behavioralQuirk, "green");
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_sex_quirk(slave, c) {
			helpers.makeMappedSpan(c, data.short.mental.sexualQuirk, slave.sexualQuirk, "green");
		}

		/**
		 * @param {FC.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_fetish(slave, c) {
			function fetishStr() {
				const tbl = data.long.fetish[slave.fetish];
				if (!tbl || typeof tbl === 'string') {
					return tbl;
				}
				return App.Ratings.numeric(tbl, slave.fetishStrength);
			}

			const fStr = fetishStr();
			if (fStr) {
				makeSpan(c, fStr, "lightcoral", true, slave.fetishStrength);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_attraction(slave, c) {
			const sd = data.long.sexDrive;

			// check for special cases first
			if (slave.energy > 95 && slave.attrXX > 95 && slave.attrXY > 95) {
				helpers.makeStyledSpan(c, sd.synergy.nymphomni);
			} else if (slave.attrXX > 95 && slave.attrXY > 95) {
				helpers.makeStyledSpan(c, sd.synergy.omni);
				helpers.makeRatedStyledSpan(c, sd.energy, slave.energy, 0, true);
			} else {
				helpers.makeRatedStyledSpan(c, sd.XY, slave.attrXY, 0, true);
				helpers.makeRatedStyledSpan(c, sd.XX, slave.attrXX, 0, true);
				helpers.makeRatedStyledSpan(c, sd.energy, slave.energy, 0, true);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_smart_piercing(slave, c) {
			const s = smartFetishStr(slave, data.long.smartVibrator) || smartAttractionStr(slave, data.long.smartVibrator);
			if (s) {
				makeSpan(c, s);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_behavior_flaw(slave, c) {
			helpers.makeMappedSpan(c, data.long.mental.behavioralFlaw, slave.behavioralFlaw, "red");
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_sex_flaw(slave, c) {
			switch (slave.sexualFlaw) {
				case "hates oral":
				case "hates anal":
				case "hates penetration":
				case "shamefast":
					makeSpan(c, slave.sexualFlaw, "red", true);
					break;
				case "idealistic":
				case "repressed":
				case "apathetic":
				case "crude":
				case "judgemental":
					makeSpan(c, `Sexually ${slave.sexualFlaw}.`, "red");
					break;
				case "cum addict":
				case "anal addict":
				case "attention whore":
					makeSpan(c, slave.sexualFlaw, "yellow", true);
					break;
				case "breast growth":
					makeSpan(c, `Breast obsession.`, "yellow");
					break;
				case "abusive":
				case "malicious":
					makeSpan(c, `Sexually ${slave.sexualFlaw}.`, "yellow");
					break;
				case "self hating":
					makeSpan(c, `Self hatred.`, "yellow");
					break;
				case "neglectful":
					makeSpan(c, `Self neglectful.`, "yellow");
					break;
				case "breeder":
					makeSpan(c, `Breeding obsession.`, "yellow");
					break;
				default:
					slave.sexualFlaw = "none";
					break;
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_behavior_quirk(slave, c) {
			switch (slave.behavioralQuirk) {
				case "confident":
				case "cutting":
				case "funny":
				case "fitness":
				case "adores women":
				case "adores men":
				case "insecure":
				case "sinful":
				case "advocate":
					makeSpan(c, slave.behavioralQuirk, "green", true);
					break;
				default:
					slave.behavioralQuirk = "none";
					break;
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_sex_quirk(slave, c) {
			switch (slave.sexualQuirk) {
				case "gagfuck queen":
				case "painal queen":
				case "strugglefuck queen":
				case "tease":
				case "romantic":
				case "perverted":
				case "caring":
				case "unflinching":
				case "size queen":
					makeSpan(c, slave.sexualQuirk, "green", true);
					break;
				default:
					slave.sexualQuirk = "none";
					break;
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_family(slave, c) {
			helpers.renderFamily(c, slave, true);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_clone(slave, c) {
			if (typeof slave.clone === "string") {
				makeSpan(c, "Clone");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function short_rival(slave, c) {
			if (slave.rivalry !== 0) {
				const block = makeBlock(c, "lightsalmon");
				const ssj = V.slaves.find(s => s.ID === slave.rivalryTarget);
				if (ssj) {
					if (slave.rivalry <= 1) {
						block.textContent = 'Disl ';
						helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
					} else if (slave.rivalry <= 2) {
						helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
						addText(block, "'s rival");
					} else {
						block.textContent = 'Hates ';
						helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
					}
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_family(slave, c) {
			helpers.renderFamily(c, slave, false);
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_clone(slave, c) {
			if (typeof slave.clone === "string") {
				makeSpan(c, slave.clone === PlayerName() ? `Your clone.` : `Clone of ${slave.clone}.`, "deepskyblue");
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {Node} c
		 * @returns {void}
		 */
		function long_rival(slave, c) {
			if (slave.rivalry !== 0) {
				const block = makeBlock(c);
				const ssj = V.slaves.find(s => s.ID === slave.rivalryTarget);
				if (ssj) {
					if (slave.rivalry <= 1) {
						makeSpan(block, "Dislikes", "lightsalmon");
						addText(block, ' ');
						helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
						addText(block, '.');
					} else if (slave.rivalry <= 2) {
						helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
						addText(block, "'s ");
						makeSpan(block, "rival.", "lightsalmon");
					} else {
						makeSpan(block, "Hates", "lightsalmon");
						addText(block, ' ');
						helpers.referenceSlaveWithPreview(block, ssj, SlaveFullName(ssj));
						addText(block, '.');
					}
				}
			}
		}

		return {
			long: {
				health: long_health,
				illness: long_illness,
				tired: long_tired,
				age: long_age,
				face: long_face,
				eyes: long_eyes,
				ears: long_ears,
				lips: long_lips,
				teeth: long_teeth,
				muscles: long_muscles,
				voice: long_voice,
				tits_ass: long_tits_ass,
				hips: long_hips,
				waist: long_waist,
				implants: long_implants,
				lactation: long_lactation,
				milkflavor: milk_flavor,
				mods: long_mods,
				intelligence: long_intelligence,
				skills: long_skills,
				prestige: long_prestige,
				porn_prestige: long_porn_prestige,
				clothes: long_clothes,
				collar: long_collar,
				mask: long_mask,
				mouth: long_mouth,
				belly: long_belly,
				arms: long_arms,
				legs: long_legs,
				shoes: long_shoes,
				chastity: long_chastity,
				vaginal_acc: long_vaginal_acc,
				dick_acc: long_dick_acc,
				buttplug: long_buttplug,
				fetish: long_fetish,
				attraction: long_attraction,
				smart_piercing: long_smart_piercing,
				behavior_flaw: long_behavior_flaw,
				sex_flaw: long_sex_flaw,
				behavior_quirk: long_behavior_quirk,
				sex_quirk: long_sex_quirk,
				family: long_family,
				clone: long_clone,
				rival: long_rival
			},
			short: {
				health: short_health,
				illness: short_illness,
				tired: short_tired,
				age: short_age,
				face: short_face,
				eyes: short_eyes,
				ears: short_ears,
				lips: short_lips,
				teeth: short_teeth,
				muscles: short_muscles,
				voice: short_voice,
				tits_ass: short_tits_ass,
				hips: short_hips,
				waist: short_waist,
				implants: short_implants,
				lactation: short_lactation,
				mods: short_mods,
				intelligence: short_intelligence,
				skills: short_skills,
				prestige: short_prestige,
				porn_prestige: short_porn_prestige,
				/*
				clothes: short_clothes,
				collar: short_collar,
				belly: short_belly,
				arms: short_arms,
				legs: short_legs,
				shoes: short_shoes,
				chastity: short_chastity,
				vaginal_acc: short_vaginal_acc,
				dick_acc: short_dick_acc,
				buttplug: short_buttplug,
				*/
				fetish: short_fetish,
				attraction: short_attraction,
				smart_piercing: short_smart_piercing,
				behavior_flaw: short_behavior_flaw,
				sex_flaw: short_sex_flaw,
				behavior_quirk: short_behavior_quirk,
				sex_quirk: short_sex_quirk,
				family: short_family,
				clone: short_clone,
				rival: short_rival
			}
		};
	}();

	return {
		helpers: helpers,
		bits: bits
	};
}();
