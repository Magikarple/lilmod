/* This is a terrible hack, but it actually seems to yield decent results, so...yay? */

globalThis.ProfileInclude = (function() {
	let stack = [];
	let tally = new Map();
	let builtinIncludeHandler = null;

	class TallyElement {
		constructor(passage) {
			this.passage = passage;
			this.cumulativeTime = 0.0;
			this.calls = 0;
			this.children = new Map();
		}
		get totalChildTime() {
			return Array.from(this.children.values(), (x) => x.cumulativeTime).reduce((sum, current) => { return sum + current; }, 0.0);
		}
		outputBreakdown() {
			if (this.children.size === 0) {
				// no breakdown needed if there are no children, so return an empty fragment
				return document.createDocumentFragment();
			}

			const selfTime = this.cumulativeTime - this.totalChildTime;
			const selfTimePercent = (selfTime / this.cumulativeTime) * 100;
			const selfTimePerCall = selfTime / this.calls;

			let childList = document.createElement("ul");
			let selfListItem = document.createElement("li");
			childList.appendChild(selfListItem);
			selfListItem.appendChild(document.createTextNode(`<self>: ${selfTime.toFixed(0)}ms (${selfTimePercent.toFixed(2)}%); ${selfTimePerCall.toFixed(0)}ms per call over ${this.calls.toFixed(0)} calls`));
			for (const [, child] of this.children) {
				const childTimePercent = (child.cumulativeTime / this.cumulativeTime) * 100;
				const childTimePerCall = child.cumulativeTime / child.calls;
				let childListItem = document.createElement("li");
				childListItem.appendChild(document.createTextNode(`${child.passage}: ${child.cumulativeTime.toFixed(0)}ms (${childTimePercent.toFixed(2)}%); ${childTimePerCall.toFixed(0)}ms per call over ${child.calls.toFixed(0)} calls`));
				childListItem.appendChild(child.outputBreakdown());
				childList.appendChild(childListItem);
			}
			return childList;
		}
	}

	class StackElement {
		constructor(passage) {
			this.passage = passage;
			this.startTime = Date.now();
		}
	}

	function Push(passage) {
		stack.push(new StackElement(passage));
	}

	function PopAndTally() {
		const el = stack.pop();
		const stopTime = Date.now();

		/* traverse the tally tree, ensuring that it has nodes for every frame still in the stack */
		let parentMap = tally;
		for (const child of stack) {
			if (!parentMap.has(child.passage)) {
				parentMap.set(child.passage, new TallyElement(child.passage));
			}
			parentMap = parentMap.get(child.passage).children;
		}

		/* add the popped stack frame's time to the correct child of the tally tree node corresponding with the top of the stack */
		if (!parentMap.has(el.passage)) {
			parentMap.set(el.passage, new TallyElement(el.passage));
		}
		let tallyEl = parentMap.get(el.passage);
		tallyEl.cumulativeTime += stopTime - el.startTime;
		tallyEl.calls++;
	}

	function IncludeBegins(passage) {
		Push(passage);
	}

	function IncludeEnds() {
		PopAndTally();
	}

	$(document).on(':passagestart', function() {
		if (V.profiler && !ProfileInclude.IsEnabled()) {
			ProfileInclude.Start();
		} else if (!V.profiler && ProfileInclude.IsEnabled()) {
			ProfileInclude.Stop();
		}

		tally.clear();

		if (ProfileInclude.IsEnabled()) {
			Push(passage()); // put the "host" passage at the bottom of the stack
		}
	});

	$(document).on(':passagedisplay', function() {
		if (ProfileInclude.IsEnabled()) {
			PopAndTally(); // tally the "host" passage too

			let header = document.createElement("h2");
			header.appendChild(document.createTextNode("Profile Data:"));
			let rootList = document.createElement("ul");
			let rootItem = document.createElement("li");
			let rootData = tally.values().next().value; // should be just the one item in the map at this level
			rootItem.appendChild(document.createTextNode(`${rootData.passage}: ${rootData.cumulativeTime.toFixed(0)}ms (100.00%)`));
			rootItem.appendChild(rootData.outputBreakdown());
			rootList.appendChild(rootItem);
			$("#passages").append(header).append(rootList);
		}
	});

	return {
		Start: function() {
			/* save off the builtin handler for the include macro, delete said macro, then re-register it with instrumentation */
			if (!this.IsEnabled() && Macro.has('include')) {
				builtinIncludeHandler = Macro.get('include').handler;
				Macro.delete('include');
				Macro.add('include', {handler() {
					IncludeBegins(this.args[0]);
					builtinIncludeHandler.call(this);
					IncludeEnds();
				}});
			}
		},

		IsEnabled: function() {
			return (builtinIncludeHandler !== null);
		},

		Stop: function() {
			/* restore the original include macro handler */
			if (this.IsEnabled())	{
				Macro.delete('include');
				Macro.add('include', {handler: builtinIncludeHandler});
				builtinIncludeHandler = null;
			}
		},

		IncludeBegins: IncludeBegins,
		IncludeEnds: IncludeEnds
	};
})();
