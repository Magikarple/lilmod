/**
 * Removes slave from the game
 * @param {App.Entity.SlaveState} slave
 */

globalThis.removeSlave = function(slave) {
	const AS_ID = slave.ID;
	let LENGTH = V.slaves.length;
	const INDEX = V.slaveIndices[AS_ID];
	let missing = false;

	WombChangeID(V.PC, AS_ID, V.missingParentID);
	if (V.PC.pregSource === V.missingParentID) {
		missing = true;
	}

	if (V.PC.mother === AS_ID) {
		V.PC.mother = V.missingParentID;
		missing = true;
	}
	if (V.PC.father === AS_ID) {
		V.PC.father = V.missingParentID;
		missing = true;
	}
	if (V.PC.sisters > 0) {
		if (areSisters(V.PC, slave) > 0) {
			V.PC.sisters--;
		}
	}
	if (V.PC.daughters > 0) {
		if (slave.father === -1 || slave.mother === -1) {
			V.PC.daughters--;
		}
	}

	V.favorites.delete(AS_ID);
	V.reminders.deleteWith(r => r.slaveID === AS_ID);

	V.researchLab.tasks = V.researchLab.tasks.filter((t) => t.slaveID !== AS_ID);

	if (INDEX >= 0 && INDEX < LENGTH) {
		if (V.incubator.capacity > 0) {
			V.incubator.tanks.forEach(child => {
				if (AS_ID === child.mother) {
					child.mother = V.missingParentID;
					missing = true;
				}
				if (AS_ID === child.father) {
					child.father = V.missingParentID;
					missing = true;
				}
			});
		}
		if (V.nursery > 0) {
			V.cribs.forEach(child => {
				if (AS_ID === child.mother) {
					child.mother = V.missingParentID;
					missing = true;
				}
				if (AS_ID === child.father) {
					child.father = V.missingParentID;
					missing = true;
				}
			});
		}
		V.slaves.forEach(s => {
			WombChangeID(s, AS_ID, V.missingParentID);
			if (s.pregSource === V.missingParentID) {
				missing = true;
			}
			if (slave.daughters > 0) {
				if (s.mother === AS_ID) {
					s.mother = V.missingParentID;
				}
				if (s.father === AS_ID) {
					s.father = V.missingParentID;
				}
				missing = true;
			}
			if (slave.mother > 0 || slave.father > 0) {
				if (slave.mother === s.ID || slave.father === s.ID) {
					s.daughters--;
				}
			}
			if (slave.sisters > 0) {
				if (areSisters(slave, s) > 0) {
					s.sisters--;
				}
			}
			if (s.cumSource === AS_ID || s.milkSource === AS_ID) {
				deflate(s);
			}
			if (s.ID === slave.relationshipTarget) {
				s.relationship = 0;
				s.relationshipTarget = 0;
			}
			if (s.ID === slave.rivalryTarget) {
				s.rivalry = 0;
				s.rivalryTarget = 0;
			}
			/* moved to saDevotion as a discovery event
				if (s.origBodyOwnerID === AS_ID) {
				s.origBodyOwnerID = 0;
				}
			*/
			if (s.ID === slave.subTarget || slave.subTarget === s.ID) {
				slave.subTarget = 0;
				s.subTarget = 0;
			}

			if (s.partners.has(AS_ID)) {
				missing = true;

				s.partners.delete(AS_ID);
				s.partners.add(V.missingParentID);
			}
		});

		/* remove from Pit trainee list, if needed */
		if (V.pit && V.pit.trainingIDs) {
			V.pit.trainingIDs.delete(AS_ID);
		}
		/* remove from Pit fighters list, if needed */
		if (V.pit && V.pit.fighterIDs) {
			V.pit.fighterIDs.delete(AS_ID);
		}
		// scheduled pit fight
		if (V.pit && V.pit.slavesFighting?.includes(AS_ID)) {
			V.pit.slavesFighting = null;
		}

		/* remove from Coursing Association, if needed */
		if (V.LurcherID === AS_ID) {
			V.LurcherID = 0;
		}

		if (V.personalAttention.task === PersonalAttention.TRAINING) {
			V.personalAttention.slaves.deleteWith(s => s.ID === AS_ID);
			if (V.personalAttention.slaves.length === 0) {
				App.PersonalAttention.reset();
			}
		}

		/* Remove from facility array or leadership role, if needed */
		removeJob(slave, slave.assignment);

		if (V.traitor !== 0) {
			missing = true; /* no exceptions, fetus system relies on this */
			if (AS_ID === V.traitor.pregSource) {
				V.traitor.pregSource = 0;
			}
			if (V.traitor.mother === AS_ID) {
				V.traitor.mother = V.missingParentID;
			}
			if (V.traitor.father === AS_ID) {
				V.traitor.father = V.missingParentID;
			}
			if (V.traitor.origBodyOwnerID === AS_ID) {
				V.traitor.origBodyOwnerID = 0;
			}
			if (V.traitor.partners.has(AS_ID)) {
				missing = true;

				V.traitor.partners.delete(AS_ID);
				V.traitor.partners.add(V.missingParentID);
			}
		}
		if (V.boomerangSlave !== 0) {
			missing = true;
			if (AS_ID === V.boomerangSlave.pregSource) {
				V.boomerangSlave.pregSource = 0;
			}
			if (V.boomerangSlave.mother === AS_ID) {
				V.boomerangSlave.mother = V.missingParentID;
			}
			if (V.boomerangSlave.father === AS_ID) {
				V.boomerangSlave.father = V.missingParentID;
			}
			if (V.boomerangSlave.origBodyOwnerID === AS_ID) {
				V.boomerangSlave.origBodyOwnerID = 0;
			}
			if (V.boomerangSlave.partners.has(AS_ID)) {
				missing = true;

				V.boomerangSlave.partners.delete(AS_ID);
				V.boomerangSlave.partners.add(V.missingParentID);
			}
		}

		V.organs.deleteWith(s => s.ID === AS_ID);
		V.completedOrgans.deleteWith(s => s.ID === AS_ID);

		for (let o = 0; o < V.adjustProsthetics.length; o++) {
			if (V.adjustProsthetics[o].slaveID === AS_ID) {
				V.adjustProsthetics.deleteAt(o);
				V.adjustProstheticsCompleted--;
				o--;
			}
		}

		const geneIndex = V.genePool.findIndex(s => s.ID === AS_ID);
		if (geneIndex !== -1) {
			let keep = false;
			if (V.traitor !== 0) {
				if (isImpregnatedBy(V.traitor, slave) || V.traitor.ID === AS_ID) {
					/* did we impregnate the traitor, or are we the traitor? */
					keep = true;
				}
			}
			if (V.boomerangSlave !== 0) {
				if (isImpregnatedBy(V.boomerangSlave, slave) || V.boomerangSlave.ID === AS_ID) {
					/* did we impregnate the boomerang, or are we the boomerang? */
					keep = true;
				}
			}
			if (isImpregnatedBy(V.PC, slave)) {
				/* did we impregnate the PC */
				keep = true;
			}
			if (!keep) {
				/* avoid going through this loop if possible */
				keep = V.slaves.some(slave => {
					/* have we impregnated a slave that is not ourselves? */
					return (slave.ID !== AS_ID && isImpregnatedBy(slave, slave));
				});
			}
			if (!keep) {
				V.genePool.deleteAt(geneIndex);
			}
		}
		Object.values(V.missingTable).forEach(s => {
			if (s.mother === slave.ID || s.father === slave.ID) {
				missing = true;
			}
		});
		if (missing) {
			V.missingTable[V.missingParentID] = {
				slaveName: slave.slaveName,
				slaveSurname: slave.slaveSurname,
				fullName: SlaveFullName(slave),
				dick: slave.dick,
				vagina: slave.vagina,
				ID: V.missingParentID,
				mother: slave.mother,
				father: slave.father,
				inbreedingCoeff: slave.inbreedingCoeff
			};
			if (V.traitor && V.traitor.ID === slave.ID) {
				/* To link developing fetuses to their parent */
				V.traitor.missingParentTag = V.missingParentID;
			} else if (V.boomerangSlave && V.boomerangSlave.ID === slave.ID) {
				V.boomerangSlave.missingParentTag = V.missingParentID;
			}
			Object.values(V.missingTable).forEach(s => {
				if (s.mother === slave.ID) {
					s.mother = V.missingParentID;
				}
				if (s.father === slave.ID) {
					s.father = V.missingParentID;
				}
			});
			V.missingParentID--;
		}

		if (V.assignmentRecords[AS_ID]) {
			delete V.assignmentRecords[AS_ID];
		}

		// remove slaves from V.rulesToApplyOnce if needed
		removeFromRulesToApplyOnce(slave);

		V.slaves.deleteAt(INDEX);
		V.slaveIndices = slaves2indices();
		LENGTH--;
		V.JobIDMap = makeJobIdMap(); /* need to call this once more to update count of resting slaves*/
	}
};
