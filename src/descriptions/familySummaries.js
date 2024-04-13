// cSpell:ignore mgmom, pgdad, pcout, npcout, mgdad, pgmom

App.Desc.family = (function() {
	/** From a list of slaves, return their names, comma-separated and appended with "and" if necessary
	 * @param {Array<App.Entity.SlaveState>} slaveList
	 * @param {boolean} links Should slave names be links
	 * @returns {DocumentFragment|HTMLElement|string}
	 */
	function slaveListToText(slaveList, links) {
		if (!links) {
			return toSentence(slaveList.map(s => s.slaveName));
		}
		return App.UI.DOM.toSentence(slaveList.map(s => App.UI.DOM.referenceSlaveWithPreview(s, s.slaveName)));
	}

	/**
	 * @param {Array<HTMLElement|DocumentFragment|string>} parts
	 * @returns {HTMLSpanElement}
	 */
	function familySpan(...parts) {
		const span = document.createElement("span");
		span.classList.add("si-family");
		span.append(...parts);
		return span;
	}

	/** From a slave ID, return text describing that slave (even if they aren't currently your slave) to use in place of their name
	 * @param {number} slaveID
	 * @param {boolean} allowLinks
	 * @returns {string|HTMLSpanElement}
	 */
	function knownSlave(slaveID, allowLinks) {
		const rel = findFather(slaveID);
		if (slaveID > 0 && rel) {
			return conditionalSlaveLink(rel, allowLinks);
		} else if (slaveID in V.missingTable) {
			return "your former slave " + V.missingTable[slaveID].slaveName;
		} else {
			return "another slave";
		}
	}

	/**
	 * @param {Relative} slave
	 * @param {boolean} allowLinks
	 * @returns {HTMLSpanElement|string}
	 */
	function conditionalSlaveLink(slave, allowLinks) {
		const ownedSlave = getSlave(slave.ID);
		if (allowLinks && ownedSlave) {
			return App.UI.DOM.referenceSlaveWithPreview(ownedSlave, slave.slaveName);
		} else if (slave.ID in V.missingTable) {
			return "your former slave " + slave.slaveName;
		} else {
			return slave.slaveName;
		}
	}

	/** Splits an array of slaves by sex (nieces/nephews, aunts/uncles, brothers/sisters, etc)
	 * @param {Array<App.Entity.SlaveState>} slaves
	 * @returns {{m: Array<App.Entity.SlaveState>, f: Array<App.Entity.SlaveState>}}
	 */
	function splitBySex(slaves) {
		let r = {m: [], f: []};
		for (const s of slaves) {
			if (s.genes === "XX") {
				r.f.push(s);
			} else {
				r.m.push(s);
			}
		}
		return r;
	}

	/** Describe the members of a character's family.
	 * @param {FC.HumanState} character (pass V.PC to get the PC's special family summary)
	 * @param {boolean} [allowLinks=false] Allow names of family members to be links to them. Should be disabled if the
	 *                                      passage is not safe to navigate from.
	 * @returns {DocumentFragment}
	 */
	function familySummary(character, allowLinks = false) {
		let text;
		if (character === V.PC) {
			text = PCFamilySummary(allowLinks);
		} else {
			text = slaveFamilySummary(asSlave(character), allowLinks);
		}
		const f = new DocumentFragment();
		$(f).append(...App.Events.spaceSentences(text));
		return f;
	}

	/** Describe the members of a slave's family.
	 * @param {App.Entity.SlaveState} slave
	 * @param {boolean} allowLinks
	 * @returns {Array<string|HTMLElement|DocumentFragment>}
	 */
	function slaveFamilySummary(slave, allowLinks) {
		const {He, His, he, him, himself, his, sister} = getPronouns(slave);
		const r = [];

		/* PC parentage */
		if (slave.ID === V.PC.mother && slave.ID === V.PC.father) {
			r.push(`${He} is <span class="lightgreen">both your mother and father;</span> ${he} impregnated ${himself} with you.`);
		} else if (slave.ID === V.PC.mother) {
			r.push(`${He} is <span class="lightgreen">your mother.</span>`);
		} else if (slave.ID === V.PC.father) {
			r.push(`${He} is <span class="lightgreen">your father.</span>`);
		}

		if (slave.father === -1 && slave.mother === -1) {
			r.push(`${He}'s <span class="lightgreen">your child;</span> you knocked yourself up and gave birth to ${him}.`);
		} else if (slave.father === slave.mother && (slave.father > 0 || (slave.father in V.missingTable && V.showMissingSlaves))) {
			r.push(`${He} was `, familySpan(`both fathered and mothered by `, knownSlave(slave.father, allowLinks), `.`));
		}

		if (slave.father === -1 && slave.mother !== -1) {
			r.push(`${He}'s <span class="lightgreen">your child;</span> you knocked ${his} mother up.`);
		} else if ((slave.father > 0 || (slave.father in V.missingTable && V.showMissingSlaves)) && slave.father !== slave.mother) {
			r.push(`${He} was `, familySpan(`fathered by `, knownSlave(slave.father, allowLinks), `'s`), ` virile dick.`);
		}

		if (slave.father !== -1 && slave.mother === -1) {
			r.push(`${He}'s <span class="lightgreen">your child;</span> you gave birth to ${him}.`);
		} else if ((slave.mother > 0 || (slave.mother in V.missingTable && V.showMissingSlaves)) && slave.father !== slave.mother) {
			r.push(`${He} was `, familySpan(`born from `, knownSlave(slave.mother, allowLinks), `'s`), ` fertile womb.`);
		}

		let children = V.slaves.filter((s) => slave.ID === s.father && slave.ID === s.mother);
		const isSoleParent = children.length > 0;
		if (children.length > 2) {
			r.push(He, familySpan(`is the sole parent of `, slaveListToText(children, allowLinks), `.`));
		} else if (children.length > 1) {
			r.push(He, familySpan(`is the sole parent of a pair of your slaves: `, slaveListToText(children, allowLinks), `.`));
		} else if (children.length > 0) {
			r.push(He, familySpan(`is the sole parent of a single slave of yours: `, slaveListToText(children, allowLinks), `.`));
		}

		children = V.slaves.filter((s) => slave.ID === s.father && slave.ID !== s.mother);
		if (children.length > 2) {
			r.push(He, familySpan(`fathered `, slaveListToText(children, allowLinks), `${isSoleParent ? " with other mothers" : ""}.`));
		} else if (children.length > 1) {
			r.push(He, familySpan(`fathered a pair of your slaves${isSoleParent ? " with other mothers" : ""}: `, slaveListToText(children, allowLinks), `.`));
		} else if (children.length > 0) {
			r.push(He, familySpan(`fathered a single slave of yours${isSoleParent ? " with another mother" : ""}: `, slaveListToText(children, allowLinks), `.`));
		}

		children = V.slaves.filter((s) => slave.ID === s.mother && slave.ID !== s.father);
		if (children.length > 2) {
			r.push(He, familySpan(`gave birth to `, slaveListToText(children, allowLinks), `${isSoleParent ? " with other fathers" : ""}.`));
		} else if (children.length > 1) {
			r.push(He, familySpan(`gave birth to a pair of your slaves${isSoleParent ? " with other fathers" : ""}: `, slaveListToText(children, allowLinks), `.`));
		} else if (children.length > 0) {
			r.push(He, familySpan(`gave birth to a single slave of yours${isSoleParent ? " with another father" : ""}: `, slaveListToText(children, allowLinks), `.`));
		}

		if (V.showDistantRelatives) {
			/* grandparents */
			const mom = getRelative(slave.mother);
			const dad = getRelative(slave.father);
			const mgmom = mom ? getRelative(mom.mother) : null;
			const mgdad = mom ? getRelative(mom.father) : null;
			const pgmom = dad ? getRelative(dad.mother) : null;
			const pgdad = dad ? getRelative(dad.father) : null;
			if (mom && dad && mom.ID === dad.ID) { // sole parent
				if (mgmom && mgdad && mgmom.ID === mgdad.ID) { // sole grandparent
					if (mgmom.ID === V.PC.ID) {
						r.push(`${He} is <span class="lightgreen">your grandchild. You impregnated yourself with ${his} sole biological parent.</span>`);
					} else {
						r.push(`${His} sole`, familySpan(`grandparent is `, conditionalSlaveLink(mgmom, allowLinks), `,`), `who gave birth to ${his} sole biological parent.`);
					}
				} else { // two grandparents
					if (mgmom && mgmom.ID === V.PC.ID) {
						r.push(`${He} is <span class="lightgreen">your grandchild. You gave birth to ${his} sole biological parent.</span>`);
					} else if (mgmom) {
						r.push(`${His} sole`, familySpan(`grandmother is `, conditionalSlaveLink(mgmom, allowLinks), `,`), `who gave birth to ${his} sole biological parent.`);
					}
					if (mgdad && mgdad.ID === V.PC.ID) {
						r.push(`${He} is <span class="lightgreen">your grandchild. You fathered ${his} sole biological parent.</span>`);
					} else if (mgdad) {
						r.push(`${His} sole`, familySpan(`grandfather is `, conditionalSlaveLink(mgdad, allowLinks), `,`), `who fathered ${his} sole biological parent.`);
					}
				}
			} else { // two parents means between one and four grandparents
				if (mgmom && mgdad && pgmom && pgdad && mgmom.ID === mgdad.ID && mgmom.ID === pgmom.ID && pgmom.ID === pgdad.ID) { // one grandparent
					if (mgmom.ID === V.PC.ID) {
						r.push(`${He} is <span class="lightgreen">your grandchild. You impregnated yourself with both of ${his} parents.</span>`);
					} else {
						r.push(`${His} sole `, familySpan(`grandparent is `, conditionalSlaveLink(mgmom, allowLinks), `.`));
					}
				} else {
					// two grandparents can mean:
					// two sole parents, one for each parent
					// shared grandfather AND shared grandmother
					// paternal grandmother is maternal grandfather and vice versa (no special handling)
					// any 3+1 combination (no special handling)

					// three grandparents can mean:
					// sole grandparent on one side or the other
					// same grandfather on both sides
					// same grandmother on both sides
					// paternal grandmother is maternal grandfather OR vice versa (no special handling)

					// four distinct grandparents is easy

					let didMGMom = false;
					let didMGDad = false;
					let didPGMom = false;
					let didPGDad = false;
					let pcout = [];
					let npcout = [];

					// so we handle: sole parents, on either or both sides
					if (mgmom && mgdad && mgmom.ID === mgdad.ID) {
						if (mgmom.ID === V.PC.ID) {
							pcout.push(`${He} is <span class="lightgreen">your grandchild. You impregnated yourself with ${his} mother.</span>`);
						} else {
							npcout.push(`${His} sole `, familySpan(`maternal grandparent is `, conditionalSlaveLink(mgmom, allowLinks), `.`));
						}
						didMGMom = didMGDad = true;
					}
					if (pgmom && pgdad && pgmom.ID === pgdad.ID) {
						if (pgmom.ID === V.PC.ID) {
							pcout.push(`${He} is <span class="lightgreen">your grandchild. You impregnated yourself with ${his} father.</span>`);
						} else {
							npcout.push(`${His} sole `, familySpan(`paternal grandparent is `, conditionalSlaveLink(pgmom, allowLinks), `.`));
						}
						didPGMom = didPGDad = true;
					}

					// shared grandfather
					if (mgdad && pgdad && mgdad.ID === pgdad.ID) {
						if (mgdad.ID === V.PC.ID) {
							pcout.push(`${He} is <span class="lightgreen">your grandchild. You fathered both of ${his} parents.</span>`);
						} else {
							npcout.push(`${His} sole `, familySpan(`grandfather is `, conditionalSlaveLink(mgdad, allowLinks), `.`));
						}
						didMGDad = didPGDad = true;
					}

					// shared grandmother
					if (mgmom && pgmom && mgmom.ID === pgmom.ID) {
						if (mgmom.ID === V.PC.ID) {
							pcout.push(`${He} is <span class="lightgreen">your grandchild. You gave birth to both of ${his} parents.</span>`);
						} else {
							npcout.push(`${His} sole `, familySpan(`grandmother is `, conditionalSlaveLink(mgmom, allowLinks), `.`));
						}
						didMGMom = didPGMom = true;
					}

					// pick up any remaining grandparents (and the unhandled crosses)
					if (mgdad && !didMGDad) {
						if (mgdad.ID === V.PC.ID) {
							pcout.push(`${He} is <span class="lightgreen">your grandchild. You fathered ${his} mother.</span>`);
						} else {
							npcout.push(`${His} maternal `, familySpan(`grandfather is `, conditionalSlaveLink(mgdad, allowLinks), `.`));
						}
					}
					if (mgmom && !didMGMom) {
						if (mgmom.ID === V.PC.ID) {
							pcout.push(`${He} is <span class="lightgreen">your grandchild. You gave birth to ${his} mother.</span>`);
						} else {
							npcout.push(`${His} maternal `, familySpan(`grandmother is `, conditionalSlaveLink(mgmom, allowLinks), `.`));
						}
					}
					if (pgdad && !didPGDad) {
						if (pgdad.ID === V.PC.ID) {
							pcout.push(`${He} is <span class="lightgreen">your grandchild. You fathered ${his} father.</span>`);
						} else {
							npcout.push(`${His} paternal `, familySpan(`grandfather is `, conditionalSlaveLink(pgdad, allowLinks), `.`));
						}
					}
					if (pgmom && !didPGMom) {
						if (pgmom.ID === V.PC.ID) {
							pcout.push(`${He} is <span class="lightgreen">your grandchild. You gave birth to ${his} father.</span>`);
						} else {
							npcout.push(`${His} paternal `, familySpan(`grandmother is `, conditionalSlaveLink(pgmom, allowLinks), `.`));
						}
					}

					// reorder: pc as grandparent first, followed by NPC grandparents.
					r.push(...pcout, ...npcout);
				}
			}

			/* PC grandparents - determines if the current slave is your grandparent */
			const pcMother = getRelative(V.PC.mother);
			const pcFather = getRelative(V.PC.father);
			if (jsDef(pcMother)) {
				if ((jsDef(pcFather)) && pcMother === pcFather) {
					if (slave.ID === pcMother.mother && slave.ID === pcFather.father) {
						r.push(`${He} is `, familySpan(`your sole grandparent. ${He} impregnated ${himself} with your sole parent `, conditionalSlaveLink(pcMother, allowLinks), ` who in turn impregnated themselves with you.`));
					} else if (slave.ID === pcMother.mother) {
						r.push(`${He} is `, familySpan(`your sole grandmother. ${He} gave birth to `, conditionalSlaveLink(pcMother, allowLinks), ` who in turn impregnated themselves with you.`));
					} else if (slave.ID === pcFather.father) {
						r.push(`${He} is `, familySpan(`your sole grandfather. ${He} fathered `, conditionalSlaveLink(pcFather, allowLinks), ` who in turn impregnated themselves with you.`));
					}
				} else if ((jsDef(pcFather)) && slave.ID === pcMother.mother && slave.ID === pcFather.mother) {
					r.push(`${He} is <span class="lightgreen">your sole grandmother.</span> ${He} gave birth to both of your parents, `, conditionalSlaveLink(pcMother, allowLinks), ` and `, conditionalSlaveLink(pcFather, allowLinks), `.`);
				} else if ((jsDef(pcFather)) && slave.ID === pcMother.father && slave.ID === pcFather.father) {
					r.push(`${He} is <span class="lightgreen">your sole grandfather.</span> ${He} fathered both of your parents, `, conditionalSlaveLink(pcFather, allowLinks), ` and `, conditionalSlaveLink(pcMother, allowLinks), `.`);
				} else if (slave.ID === pcMother.mother) {
					r.push(`${He} is <span class="lightgreen">your maternal grandmother.</span>`);
				} else if (slave.ID === pcMother.father) {
					r.push(`${He} is <span class="lightgreen">your maternal grandfather.</span>`);
				}
			} else if (jsDef(pcFather)) {
				if (slave.ID === pcFather.mother) {
					r.push(`${He} is <span class="lightgreen">your paternal grandmother.</span>`);
				} else if (slave.ID === pcFather.father) {
					r.push(`${He} is <span class="lightgreen">your paternal grandfather.</span>`);
				}
			}

			/* grandchild - determines how many grandchildren the current slave has */
			children = V.slaves.filter((s) => isGrandparentP(s, slave));
			if (children.length > 0) {
				r.push(`${He} has`);
				if (children.length > 2) {
					r.push(familySpan(`many grandchildren, `, slaveListToText(children, allowLinks), `, amongst your slaves.`));
				} else if (children.length > 1) {
					r.push(familySpan(`two grandchildren, `, slaveListToText(children, allowLinks), `, amongst your slaves.`));
				} else {
					r.push(`a`, familySpan(`grandchild, `, slaveListToText(children, allowLinks), `, as your slave.`));
				}
			}

			/* PC aunt and uncle - determines how many aunts and uncles you have */
			if (isAunt(V.PC, slave)) {
				const {m: uncles, f: aunts} = splitBySex(V.slaves.filter((s) => s.ID !== slave.ID && isAunt(V.PC, s)));

				r.push(`${He} is`);
				if (slave.genes === "XX") {
					if (aunts.length > 0) {
						r.push(familySpan(`your aunt along with `, slaveListToText(aunts, allowLinks), `.`));
					} else {
						r.push(`<span class="lightgreen">your aunt.</span>`);
					}
				} else {
					if (uncles.length > 0) {
						r.push(familySpan(`your uncle along with `, slaveListToText(uncles, allowLinks), `.`));
					} else {
						r.push(`<span class="lightgreen">your uncle.</span>`);
					}
				}
			}

			/* aunt and uncle - determines how many aunts and uncles a slave has*/
			const {m: uncles, f: aunts} = splitBySex(V.slaves.filter((s) => isAunt(slave, s)));

			if (aunts.length > 0) {
				r.push(`${He} has`);
				if (aunts.length > 2) {
					r.push(familySpan(`many aunts, `, slaveListToText(aunts, allowLinks), `.`));
				} else if (aunts.length > 1) {
					r.push(familySpan(`two aunts, `, slaveListToText(aunts, allowLinks), `.`));
				} else {
					r.push(familySpan(`an aunt, `, slaveListToText(aunts, allowLinks), `.`));
				}
			}
			if (uncles.length > 0) {
				r.push(`${He} has`);
				if (uncles.length > 2) {
					r.push(familySpan(`many uncles, `, slaveListToText(uncles, allowLinks), `.`));
				} else if (uncles.length > 1) {
					r.push(familySpan(`two uncles, `, slaveListToText(uncles, allowLinks), `.`));
				} else {
					r.push(familySpan(`an uncle, `, slaveListToText(uncles, allowLinks), `.`));
				}
			}

			/* PC niece and nephew - determines how many nieces and nephews you have*/
			if (isAunt(slave, V.PC)) {
				const {m: nephews, f: nieces} =
					splitBySex(V.slaves.filter((s) => s.ID !== slave.ID && isAunt(s, V.PC)));

				r.push(`${He} is`);
				if (slave.genes === "XX") {
					if (nieces.length > 0) {
						r.push(familySpan(`your niece along with `, slaveListToText(nieces, allowLinks), `.`));
					} else {
						r.push(`<span class="lightgreen">your niece.</span>`);
					}
				} else {
					if (nephews.length > 0) {
						r.push(familySpan(`your nephew along with `, slaveListToText(nephews, allowLinks), `.`));
					} else {
						r.push(`<span class="lightgreen">your nephew.</span>`);
					}
				}
			}

			/* niece and nephew - determines how many nieces and nephews a slave has*/
			const {m: nephews, f: nieces} = splitBySex(V.slaves.filter((s) => isAunt(s, slave)));

			if (nieces.length > 0) {
				r.push(`${He} has`);
				if (nieces.length > 2) {
					r.push(familySpan(`many nieces, `, slaveListToText(nieces, allowLinks), `, who are your slaves.`));
				} else if (nieces.length > 1) {
					r.push(familySpan(`two nieces, `, slaveListToText(nieces, allowLinks), `, who are your slaves.`));
				} else {
					r.push(familySpan(`a niece, `, slaveListToText(nieces, allowLinks), `, who is your slave.`));
				}
			}
			if (nephews.length > 0) {
				r.push(`${He} has`);
				if (nephews.length > 2) {
					r.push(familySpan(`many nephews, `, slaveListToText(nephews, allowLinks), `, who are your slaves.`));
				} else if (nephews.length > 1) {
					r.push(familySpan(`two nephews, `, slaveListToText(nephews, allowLinks), `, who are your slaves.`));
				} else {
					r.push(familySpan(`a nephew, `, slaveListToText(nephews, allowLinks), `, who is your slave.`));
				}
			}
		} /* end distant relatives toggle check */

		let twins = [];
		let sisters = [];
		let brothers = [];
		let halfSisters = [];
		let halfBrothers = [];
		let cousins = [];

		for (const s of V.slaves) {
			let sisterCheck = areSisters(s, slave);
			if (sisterCheck === 1) {
				twins.push(s);
			}
			if (sisterCheck === 2) {
				(s.genes === "XX" ? sisters : brothers).push(s);
			}
			if (sisterCheck === 3) {
				(s.genes === "XX" ? halfSisters : halfBrothers).push(s);
			}
			if (V.showDistantRelatives) {
				if (areCousins(s, slave)) {
					cousins.push(s);
				}
			}
		}

		/* PC twin - determines how many twins you have */
		if (areSisters(slave, V.PC) === 1) {
			r.push(He);
			if (twins.length > 1) {
				r.push(familySpan(`shared a cramped womb with you, `, slaveListToText(twins, allowLinks), `.`));
			} else if (twins.length > 0) {
				r.push(`is `, familySpan(`your twin along with `, slaveListToText(twins, allowLinks), `.`));
			} else {
				r.push(`is <span class="lightgreen">your twin.</span>`);
			}
			twins = []; // clear it so we don't output it a second time
		}

		/* PC sister - determines how many sisters you have*/
		if (areSisters(slave, V.PC) === 2 && slave.genes === "XX") {
			r.push(`${He} is`);
			if (sisters.length > 0) {
				r.push(familySpan(`your ${sister} along with `, slaveListToText(sisters, allowLinks), `.`));
			} else {
				r.push(`<span class="lightgreen">your ${sister}.</span>`);
			}
			sisters = []; // clear it so we don't output it a second time
		}

		/* PC brother - determines how many brothers you have*/
		if (areSisters(slave, V.PC) === 2 && slave.genes === "XY") {
			r.push(`${He} is`);
			if (brothers.length > 0) {
				r.push(familySpan(`your ${sister} along with `, slaveListToText(brothers, allowLinks), `.`));
			} else {
				r.push(`<span class="lightgreen">your ${sister}.</span>`);
			}
			brothers = []; // clear it so we don't output it a second time
		}

		/* PC half-sister - determines how many half-sisters you have*/
		if (areSisters(slave, V.PC) === 3 && slave.genes === "XX") {
			r.push(`${He} is`);
			if (halfSisters.length > 0) {
				r.push(familySpan(`your half-${sister} along with `, slaveListToText(halfSisters, allowLinks), `.`));
			} else {
				r.push(`<span class="lightgreen">your half-${sister}.</span>`);
			}
			halfSisters = []; // clear it so we don't output it a second time
		}

		/* PC half-brother - determines how many half-brothers you have*/
		if (areSisters(slave, V.PC) === 3 && slave.genes === "XY") {
			r.push(`${He} is`);
			if (halfBrothers.length > 0) {
				r.push(familySpan(`your half-${sister} along with `, slaveListToText(halfBrothers, allowLinks), `.`));
			} else {
				r.push(`<span class="lightgreen">your half-${sister}.</span>`);
			}
			halfBrothers = []; // clear it so we don't output it a second time
		}

		/* twins? - determines how many twins a slave has*/
		if (twins.length > 0) {
			r.push(`${He}`);
			if (twins.length > 2) {
				r.push(familySpan(`shared a cramped womb with `, slaveListToText(twins, allowLinks), `.`));
			} else if (twins.length > 1) {
				r.push(`is `, familySpan(`one of a set of triplets; `, slaveListToText(twins, allowLinks)), ` complete the trio.`);
			} else {
				r.push(`is `, familySpan(`twins with `, conditionalSlaveLink(twins[0], allowLinks), `.`));
			}
		}

		/* sister - determines how many sisters a slave has*/
		if (sisters.length > 0) {
			const sister2 = getPronouns(sisters[0]).sister;
			if (sisters.length > 1) {
				r.push(familySpan(slaveListToText(sisters, allowLinks), ` are ${his} ${sister2}s.`));
			} else {
				r.push(familySpan(conditionalSlaveLink(sisters[0], allowLinks), ` is ${his} ${sister2}.`));
			}
		}

		/* brother - determines how many brothers a slave has*/
		if (brothers.length > 0) {
			const sister2 = getPronouns(brothers[0]).sister;
			if (brothers.length > 1) {
				r.push(familySpan(slaveListToText(brothers, allowLinks), ` are ${his} ${sister2}s.`));
			} else {
				r.push(familySpan(conditionalSlaveLink(brothers[0], allowLinks), ` is ${his} ${sister2}.`));
			}
		}

		/* half-sister - determines how many half-sisters a slave has*/
		if (halfSisters.length > 0) {
			const sister2 = getPronouns(halfSisters[0]).sister;
			if (halfSisters.length > 1) {
				r.push(familySpan(slaveListToText(halfSisters, allowLinks), ` are half-${sister2}s to ${him}.`));
			} else {
				r.push(familySpan(conditionalSlaveLink(halfSisters[0], allowLinks), ` is a half-${sister2} to ${him}.`));
			}
		}

		/* half-brother - determines how many half-brothers a slave has*/
		if (halfBrothers.length > 0) {
			const sister2 = getPronouns(halfBrothers[0]).sister;
			if (halfBrothers.length > 1) {
				r.push(familySpan(slaveListToText(halfBrothers, allowLinks), ` are half-${sister2}s to ${him}.`));
			} else if (halfBrothers.length > 0) {
				r.push(familySpan(conditionalSlaveLink(halfBrothers[0], allowLinks), ` is a half-${sister2} to ${him}.`));
			}
		}

		if (V.showDistantRelatives) {
			/* PC cousin - determines how many cousins you have*/
			if (areCousins(slave, V.PC)) {
				const PCcousins = V.slaves.filter((s) => s.ID !== slave.ID && areCousins(V.PC, s));
				r.push(`${He} is`);
				if (PCcousins.length > 0) {
					r.push(familySpan(`your cousin along with `, slaveListToText(PCcousins, allowLinks), `.`));
				} else {
					r.push(`<span class="lightgreen">your cousin.</span>`);
				}
			}

			/* cousin - determines how many cousins a slave has*/
			if (cousins.length > 1) {
				r.push(familySpan(slaveListToText(cousins, allowLinks), ` are cousins to ${him}.`));
			} else if (cousins.length > 0) {
				r.push(familySpan(conditionalSlaveLink(cousins[0], allowLinks), ` is a cousin to ${him}.`));
			}
		}

		if (typeof slave.clone === "string") {
			r.push(`${He} is`);
			if (slave.cloneID === -1) {
				r.push(`your clone.`);
			} else {
				r.push(`a clone of ${slave.clone}.`);
			}
		}

		if (V.debugMode) {
			r.push(`${He} has ${numberWithPlural(slave.sisters, "sister")} and ${numberWithPlural(slave.daughters, "daughter")}.`);
		}

		if (V.inbreeding && slave.inbreedingCoeff > 0) {
			r.push(`${He} is`);
			if (slave.inbreedingCoeff >= 0.5) {
				r.push("extremely");
			} else if (slave.inbreedingCoeff >= 0.25) {
				r.push("very");
			} else if (slave.inbreedingCoeff >= 0.125) {
				// no adjective here
			} else if (slave.inbreedingCoeff >= 0.0625) {
				r.push("somewhat");
			} else {
				r.push("slightly");
			}
			r.push(`inbred, with a CoI of ${slave.inbreedingCoeff}.`);
		}

		return r;
	}

	/** Describe the members of the PC's family.
	 * @param {boolean} allowLinks
	 * @returns {Array<string|HTMLElement|DocumentFragment>}
	 */
	function PCFamilySummary(allowLinks) {
		const r = [];

		r.push(`<br>Your family records show that:`);

		/* Player parents, lists both your parents, or just one. */
		let parents = [];
		if (V.showMissingSlaves) {
			if (V.PC.mother in V.missingTable) {
				parents.push(V.missingTable[V.PC.mother]);
			}
			if (V.PC.father in V.missingTable && (V.PC.father !== V.PC.mother)) {
				parents.push(V.missingTable[V.PC.father]);
			}
		}
		parents = parents.concat(V.slaves.filter((s) => isParentP(V.PC, s)));

		if (parents.length > 1) {
			r.push(`<br>Your parents are `, familySpan(knownSlave(parents[0].ID, allowLinks), ` and `, knownSlave(parents[1].ID, allowLinks), `.`));
		} else if (parents.length > 0) {
			if (V.PC.father === V.PC.mother) {
				/* apparently we don't keep pronoun records in the missing parents table??? */
				const himself = jsDef(parents[0].pronoun) ? getPronouns(parents[0]).himself : "herself";
				r.push(`<br>Your parent is `, familySpan(knownSlave(parents[0].ID, allowLinks), `,`), ` who impregnated ${himself} with you.`);
			} else {
				r.push(`<br>You know one of your parents, `, familySpan(knownSlave(parents[0].ID, allowLinks), `.`));
			}
		}

		/* Player aunts and uncles */
		if (V.showDistantRelatives) {
			const {m: uncles, f: aunts} = splitBySex(V.slaves.filter((s) => isAunt(V.PC, s)));

			if (aunts.length > 0) {
				r.push(`<br>You have`);
				if (aunts.length > 2) {
					r.push(familySpan(`many aunts, `, slaveListToText(aunts, allowLinks), `.`));
				} else if (aunts.length > 1) {
					r.push(familySpan(`two aunts, `, slaveListToText(aunts, allowLinks), `.`));
				} else {
					r.push(familySpan(`an aunt, `, slaveListToText(aunts, allowLinks), `.`));
				}
			}
			if (uncles.length > 0) {
				r.push(`<br>You have`);
				if (uncles.length > 2) {
					r.push(familySpan(`many uncles, `, slaveListToText(uncles, allowLinks), `.`));
				} else if (uncles.length > 1) {
					r.push(familySpan(`two uncles, `, slaveListToText(uncles, allowLinks), `.`));
				} else {
					r.push(familySpan(`an uncle, `, slaveListToText(uncles, allowLinks), `.`));
				}
			}
		}

		let twins = [];
		let sisters = [];
		let brothers = [];
		let halfSisters = [];
		let halfBrothers = [];
		let cousins = [];

		for (const s of V.slaves) {
			let sisterCheck = areSisters(s, V.PC);
			if (sisterCheck === 1) {
				twins.push(s);
			}
			if (sisterCheck === 2) {
				(s.genes === "XX" ? sisters : brothers).push(s);
			}
			if (sisterCheck === 3) {
				(s.genes === "XX" ? halfSisters : halfBrothers).push(s);
			}
			if (V.showDistantRelatives) {
				if (areCousins(s, V.PC)) {
					cousins.push(s);
				}
			}
		}

		if (twins.length > 1) {
			r.push(`<br>You are `, familySpan(`twins with `, slaveListToText(twins, allowLinks), `.`));
		} else if (twins.length > 0) {
			r.push(`<br>Your twin is `, familySpan(conditionalSlaveLink(twins[0], allowLinks), `.`));
		}

		if (sisters.length > 1) {
			r.push(`<br>`, slaveListToText(sisters, allowLinks), ` are your sisters.`);
		} else if (sisters.length > 0) {
			const {sister} = getPronouns(sisters[0]);
			r.push(`<br>Your ${sister} is `, familySpan(conditionalSlaveLink(sisters[0], allowLinks), `.`));
		}

		if (brothers.length > 1) {
			r.push(`<br>`, slaveListToText(brothers, allowLinks), ` are your brothers.`);
		} else if (brothers.length > 0) {
			const {sister} = getPronouns(brothers[0]);
			r.push(`<br>Your ${sister} is `, familySpan(conditionalSlaveLink(brothers[0], allowLinks), `.`));
		}

		if (halfSisters.length > 1) {
			r.push(`<br>`, slaveListToText(halfSisters, allowLinks), ` are your half-sisters.`);
		} else if (halfSisters.length > 0) {
			const {sister} = getPronouns(halfSisters[0]);
			r.push(`<br>You have one half-${sister}, `, familySpan(conditionalSlaveLink(halfSisters[0], allowLinks), `.`));
		}

		if (halfBrothers.length > 1) {
			r.push(`<br>`, slaveListToText(halfBrothers, allowLinks), ` are your half-brothers.`);
		} else if (halfBrothers.length > 0) {
			const {sister} = getPronouns(halfBrothers[0]);
			r.push(`<br>You have one half-${sister}, `, familySpan(conditionalSlaveLink(halfBrothers[0], allowLinks), `.`));
		}

		if (V.showDistantRelatives) {
			if (cousins.length > 1) {
				r.push(`<br>`, slaveListToText(cousins, allowLinks), ` are your cousins.`);
			} else if (cousins.length > 0) {
				r.push(`<br>You have one cousin, `, familySpan(conditionalSlaveLink(cousins[0], allowLinks), `.`));
			}
		}

		/* Player nieces and nephews */
		if (V.showDistantRelatives) {
			const {m: nephews, f: nieces} = splitBySex(V.slaves.filter((s) => isAunt(s, V.PC)));

			if (nieces.length > 0) {
				r.push(`<br>You have`);
				if (nieces.length > 2) {
					r.push(familySpan(`many nieces, `, slaveListToText(nieces, allowLinks), `, who are your slaves.`));
				} else if (nieces.length > 1) {
					r.push(familySpan(`two nieces, `, slaveListToText(nieces, allowLinks), `, who are your slaves.`));
				} else {
					r.push(familySpan(`a niece, `, slaveListToText(nieces, allowLinks), `, who is your slave.`));
				}
			}
			if (nephews.length > 0) {
				r.push(`<br>You have`);
				if (nephews.length > 2) {
					r.push(familySpan(`many nephews, `, slaveListToText(nephews, allowLinks), `, who are your slaves.`));
				} else if (nephews.length > 1) {
					r.push(familySpan(`two nephews, `, slaveListToText(nephews, allowLinks), `, who are your slaves.`));
				} else {
					r.push(familySpan(`a nephew, `, slaveListToText(nephews, allowLinks), `, who is your slave.`));
				}
			}
		}

		/* Player is sole parent */
		let children = V.slaves.filter((s) => s.father === V.PC.ID && s.mother === V.PC.ID);
		if (children.length > 0) {
			r.push(`<br>You are the sole parent of ${num(children.length)} of your slaves, `, familySpan(slaveListToText(children, allowLinks), `.`));
		}
		const isSoleParent = children.length > 0;

		/* Player is Father, lists children you fathered */
		children = V.slaves.filter((s) => s.father === V.PC.ID && s.mother !== V.PC.ID);
		if (children.length > 0) {
			r.push(`<br>You fathered ${num(children.length)} of your slaves${isSoleParent ? " with other mothers" : ''}, `, familySpan(slaveListToText(children, allowLinks), `.`));
		}

		/* Player is Mother, lists birthed children */
		children = V.slaves.filter((s) => s.mother === V.PC.ID && s.father !== V.PC.ID);
		if (children.length > 0) {
			r.push(`<br>You gave birth to ${num(children.length)} of your slaves${isSoleParent ? " who had other fathers" : ''}, `, familySpan(slaveListToText(children, allowLinks), `.`));
		}

		/* Player is grandparent */
		if (V.showDistantRelatives) {
			children = V.slaves.filter((s) => isGrandparentP(s, V.PC));
			if (children.length > 0) {
				r.push(`<br>You have ${num(children.length)} grandchildren as your slaves, `, familySpan(slaveListToText(children, allowLinks), `.`));
			}
		}

		if (V.debugMode) {
			r.push(`<br>You have ${numberWithPlural(V.PC.sisters, "sister")} and ${numberWithPlural(V.PC.daughters, "daughter")}.`);
		}

		if (V.inbreeding && V.PC.inbreedingCoeff > 0) {
			r.push(`You are`);
			if (V.PC.inbreedingCoeff >= 0.5) {
				r.push("extremely");
			} else if (V.PC.inbreedingCoeff >= 0.25) {
				r.push("very");
			} else if (V.PC.inbreedingCoeff >= 0.125) {
				// no adjective here
			} else if (V.PC.inbreedingCoeff >= 0.0625) {
				r.push("somewhat");
			} else {
				r.push("slightly");
			}
			r.push(`inbred, with a CoI of ${V.PC.inbreedingCoeff}.`);
		}

		return r;
	}

	return familySummary;
})();
