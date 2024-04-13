// Define Test framework and register all tests

// To run all tests, type 'App.Loader.executeTests()' in the browser console. Make sure the HTML file has not been
// moved from the 'bin/' directory

// First, create the test framework
App.Testing = (function() {
	// First, abstract away anything test unrelated
	const group = App.Loader.getGroup("../tests");

	function addTestUnit(path) {
		group.queueSubscript(path);
	}

	let unitTotal = 0;
	let unitSuccesses = 0;

	function start() {
		App.Loader.nextScript();
	}

	function unitDone() {
		console.log("Group '" + App.Loader.lastScript + "' done. Successful tests:", unitSuccesses, "of", unitTotal);
		unitTotal = 0;
		unitSuccesses = 0;
		App.Loader.nextScript();
	}

	// Actual Testing functionality
	class TestError extends Error {
	}

	/**
	 * @param {string} name Unique test name
	 * @param {null|(()=>void)} prepare Prepare the global state
	 * @param {!(()=>void)} test Do the actual testing
	 * @param {null|(()=>void)} cleanup Clean the global state up
	 */
	function executeTest(name, prepare, test, cleanup) {
		unitTotal++;
		try {
			if (prepare != null) {
				prepare();
			}
		} catch (e) {
			console.log("PREPARE_FAILED", name, e);
			tryCleanup(name, cleanup);
			return;
		}
		try {
			test();
		} catch (e) {
			console.log("TEST_FAILED", name, e);
			tryCleanup(name, cleanup);
			return;
		}
		if (tryCleanup(name, cleanup)) {
			unitSuccesses++;
		}
	}

	/**
	 * @param {string} name Unique test name
	 * @param {null|(()=>void)} cleanup Clean the global state up
	 */
	function tryCleanup(name, cleanup) {
		try {
			if (cleanup != null) {
				cleanup();
			}
		} catch (e) {
			console.log("CLEANUP_FAILED", name, e);
			return false;
		}
		return true;
	}

	function equals(actual, expected) {
		if (!_.isEqual(actual, expected)) {
			throw new TestError("Actual value does not match expected value");
		}
	}

	/**
	 * @param {object} obj
	 * @param {string} property
	 */
	function hasProperty(obj, property) {
		if (obj[property] === undefined) {
			throw new TestError("Expected property does not exist");
		}
	}

	/**
	 * @param {object} obj
	 * @param {string} property
	 */
	function hasNoProperty(obj, property) {
		if (obj[property] !== undefined) {
			throw new TestError("Unexpected property exists");
		}
	}

	function isType(value, expected) {
		if (!(typeof value === expected)) {
			throw new TestError("Actual type does not match expected type");
		}
	}

	function notNaN(value) {
		if (Number.isNaN(value)) {
			throw new TestError("Expected valid number, got NaN.");
		}
	}

	function inRange(value, target, tolerance) {
		if (Math.abs(value - target) > tolerance) {
			throw new TestError(`Value ${value} outside range. Expected ${target} with tolerance ${tolerance}.`);
		}
	}

	return {
		addTestUnit, start, unitDone, executeTest,
		equals, hasProperty, hasNoProperty: hasNoProperty, isType, notNaN, inRange,
	};
})();

// Now load all tests
App.Testing.addTestUnit("diffProxy");
App.Testing.addTestUnit("ibc");

// Finally, execute the tests
App.Testing.start();
