{
	class MockSlave {
		ID;
		mother;
		father;

		constructor(id) {
			this.ID = id;
		}
	}

	class MockMating {
		constructor(fatherId, motherId, ...childrenIds) {
			for (let id of childrenIds) {
				if (id === fatherId || id === motherId) {
					throw new Error("cannot give birth to self");
				}
			}

			this.fatherId = fatherId;
			this.motherId = motherId;
			this.childrenIds = childrenIds;
		}
	}

	class MockWorld {
		slavesArray;

		constructor(matings) {
			this.slavesArray = [];

			let slavesById = {};
			let meetSlave = (id) => {
				if (!slavesById[id]) {
					let slave = new MockSlave(id);
					this.slavesArray.push(slave);
					slavesById[id] = slave;
				}

				return slavesById[id];
			};

			for (let mating of matings) {
				let father = meetSlave(mating.fatherId);
				let mother = meetSlave(mating.motherId);
				for (let id of mating.childrenIds) {
					let child = meetSlave(id);
					child.father = father.ID;
					child.mother = mother.ID;
				}
			}
		}

		findSlaveState(id) {
			return this.slavesArray.find(slave => slave.ID === id) || null;
		}
	}

	let testCoefficientForSlave = function(name, mockMatings, slaveId, expectedCoefficientOfInbreeding) {
		App.Testing.executeTest(name, () => {}, () => {
			let tolerance = .00000000001;

			let world = new MockWorld(mockMatings);
			let c = ibc._test.coeff_slave(world, world.findSlaveState(slaveId));
			App.Testing.isType(c, "number");
			App.Testing.notNaN(c);
			App.Testing.inRange(c, expectedCoefficientOfInbreeding, tolerance);
		}, () => {});
	};

	// references:
	// Introduction to Quantitative Genetics - Doulas S. Falconer, 1989
	// Genetic and Quantitative Aspects of Genealogy - F.M. Lancaster, 2015
	testCoefficientForSlave("basic outbred mating, 1",[new MockMating(1, 2, 3, 4)], 1, 0);
	testCoefficientForSlave("basic outbred mating, 2",[new MockMating(1, 2, 3, 4)], 4, 0);
	testCoefficientForSlave("basic self-mating, 1", [new MockMating(1, 1, 3, 4)], 4, 1 / 2);
	testCoefficientForSlave("basic self-mating, 2", [new MockMating(1, 1, 3, 4)], 1, 0);
	testCoefficientForSlave("basic child-parent mating",[new MockMating(1, 2, 3), new MockMating(2, 3, 4)], 4, 1 / 4);
	testCoefficientForSlave("basic sibling mating",[new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5)], 5, 1 / 4);
	testCoefficientForSlave("basic half-sibling mating",[new MockMating(1, 2, 3), new MockMating(2, 4, 5), new MockMating(3, 5, 6)], 6, 1 / 8);
	testCoefficientForSlave("basic first cousin mating",[new MockMating(1, 2, 3, 4), new MockMating(5, 3, 6), new MockMating(4, 7, 8), new MockMating(6, 8, 9)], 9, 1 / 16);
	testCoefficientForSlave("double first cousin mating",[new MockMating(1, 2, 3, 4), new MockMating(5, 6, 7, 8),
		new MockMating(3, 7, 9), new MockMating(4, 8, 10), new MockMating(9, 10, 11)], 11, 1 / 8);
	testCoefficientForSlave("aunt-niece mating",[new MockMating(1, 2, 3, 4), new MockMating(4, 5, 6), new MockMating(3, 6, 7)], 7, 1 / 8);
	let scenario53 = [new MockMating(1, 2, 3, 4), new MockMating(5, 6, 7, 8), new MockMating(3, 7, 9, 10), new MockMating(4, 8, 11),
		new MockMating(12, 9, 13), new MockMating(10, 11, 14), new MockMating(13, 14, 15)];
	testCoefficientForSlave("problem 5.3 from Falconer, 1",scenario53, 14, 1 / 8);  //
	testCoefficientForSlave("problem 5.3 from Falconer, 2",scenario53, 15, 3 / 32);
	testCoefficientForSlave("example in figure 64 from Lancaster",[new MockMating(1, 2, 4, 5), new MockMating(3, 4, 7), new MockMating(5, 6, 8), new MockMating(7, 8, 9), new MockMating(9, 10, 12, 13),
		new MockMating(11, 12, 15), new MockMating(13, 14, 16), new MockMating(15, 16, 17, 18)], 17, 33 / 512);
	testCoefficientForSlave("example in figure 65 from Lancaster",[new MockMating(1, 2, 4, 5), new MockMating(3, 4, 7), new MockMating(5, 6, 8), new MockMating(7, 8, 10, 11),
		new MockMating(9, 10, 13), new MockMating(11, 12, 14), new MockMating(13, 14, 15)], 15, 9 / 128);
	testCoefficientForSlave("example in figure 66 from Lancaster",[new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5, 6), new MockMating(5, 6, 7, 8), new MockMating(7, 8, 9)], 9, 1 / 2);
	testCoefficientForSlave("example in figure 66 from Lancaster, extended by one more generation's worth of mating between siblings",[new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5, 6), new MockMating(5, 6, 7, 8), new MockMating(7, 8, 9, 10),
		new MockMating(9, 10, 11)], 11, 19 / 32);
	// from here the preceding scenario of regular sibling-mating is extended by several more steps; by rules given in Falconer, the coefficient ck for step k, where step k follows
	// step j which follows step i, should be ck = 1/4 + cj/2 + ci/4, and so that is how the expected values used in the next few tests were calculated
	testCoefficientForSlave("extended, 1: 43/64 = 1/4 + (19/32) / 2 + (1/2) / 4",[new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5, 6), new MockMating(5, 6, 7, 8), new MockMating(7, 8, 9, 10),
		new MockMating(9, 10, 11, 12), new MockMating(11, 12, 13)], 13, 43 / 64);
	testCoefficientForSlave("extended, 2",[new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5, 6), new MockMating(5, 6, 7, 8), new MockMating(7, 8, 9, 10),
		new MockMating(9, 10, 11, 12), new MockMating(11, 12, 13, 14), new MockMating(13, 14, 15)], 15, 94 / 128);
	testCoefficientForSlave("extended, 3", [new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5, 6), new MockMating(5, 6, 7, 8), new MockMating(7, 8, 9, 10),
		new MockMating(9, 10, 11, 12), new MockMating(11, 12, 13, 14), new MockMating(13, 14, 15, 16), new MockMating(15, 16, 17)], 17, 201 / 256);
	testCoefficientForSlave("extended, 4", [new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5, 6), new MockMating(5, 6, 7, 8), new MockMating(7, 8, 9, 10),
		new MockMating(9, 10, 11, 12), new MockMating(11, 12, 13, 14), new MockMating(13, 14, 15, 16), new MockMating(15, 16, 17, 18), new MockMating(17, 18, 19)], 19, 423 / 512);
	testCoefficientForSlave("extended, 5", [new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5, 6), new MockMating(5, 6, 7, 8), new MockMating(7, 8, 9, 10),
		new MockMating(9, 10, 11, 12), new MockMating(11, 12, 13, 14), new MockMating(13, 14, 15, 16), new MockMating(15, 16, 17, 18), new MockMating(17, 18, 19, 20),
		new MockMating(19, 20, 21)], 21, 880 / 1024);
	// Does not apply to current algorithm: as of this writing, the ten-generations-of-sisterfucking test immediately above is enough to occupy the game's coefficient-of-inbreeding calculation algorithm for a few minutes
	// on a ~4Ghz CPU.  this is very silly.  when you read this, that algorithm should have been replaced by a much faster one, allowing the above test to be comfortably run again.
	let scenario70 = [new MockMating(1, 2, 6), new MockMating(2, 3, 7), new MockMating(3, 4, 8), new MockMating(5, 6, 9), new MockMating(7, 8, 10),
		new MockMating(9, 10, 12), new MockMating(10, 11, 13), new MockMating(12, 13, 14), new MockMating(12, 14, 15)];  // example in figure 70 from Lancaster
	testCoefficientForSlave("example in figure 70 from Lancaster, 1", scenario70, 2, 0);
	testCoefficientForSlave("example in figure 70 from Lancaster, 2", scenario70, 10, 1 / 8);
	testCoefficientForSlave("example in figure 70 from Lancaster, 3", scenario70, 12, 1 / 32);
	testCoefficientForSlave("example in figure 70 from Lancaster, 4", scenario70, 15, 85 / 256);
	let scenarioXXX = [new MockMating(1, 2, 5, 6), new MockMating(3, 4, 7, 8), new MockMating(5, 6, 9, 10), new MockMating(5, 7, 11), new MockMating(5, 8, 12),
		new MockMating(5, 9, 13), new MockMating(9, 10, 14), new MockMating(5, 11, 15), new MockMating(10, 12, 16), new MockMating(13, 16, 17),
		new MockMating(4, 16, 18), new MockMating(14, 15, 19), new MockMating(6, 17, 20), new MockMating(6, 18, 21), new MockMating(6, 19, 22),
		new MockMating(20, 21, 23), new MockMating(22, 23, 24)];  // an invented example meant to represent a typical situation in a respectable arcology
	testCoefficientForSlave("change, 1",scenarioXXX, 24, 633 / 2048);  // here the expected coefficient was retrieved from the algorithm being tested and was not separately verified by hand,
	// so this test could conceivably be wrong, but at least it can catch changes...
	testCoefficientForSlave("change, 2",[new MockMating(1, 2, 3, 4), new MockMating(3, 4, 5, 6), new MockMating(5, 6, 7, 8), new MockMating(7, 8, 9, 10), new MockMating(9, 10, 11, 12),
		new MockMating(11, 12, 13), new MockMating(13, 14, 15),
		new MockMating(5, 5, 16), new MockMating(15, 16, 17)], 17, 1 / 4);  // an example in which the old and new algorithms actually gave different results - the first one such to have been observed! It seems that the old algorithm was wrong
	testCoefficientForSlave("negative IDs, 1",[new MockMating(-120, -120, 87)], 87, 1 / 2);  // negative IDs need to be accepted (not bothering to test any weird special IDs like -1 here though)
	testCoefficientForSlave("negative IDs, 2",[new MockMating(-999, -998, -300), new MockMating(-300, -998, 300)], 300, 1 / 4);

	// Do this last
	App.Testing.unitDone();
}
