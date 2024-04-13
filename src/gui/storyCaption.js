App.UI.StoryCaption = {};

/**
 * Which encyclopedia entry should be opened from the sidebar?
 * @type {string}
 */
App.UI.StoryCaption.encyclopedia = "";

App.UI.StoryCaption.render = function() {
	const pass = passage();
	const passageSafe = Story.lookup("tags", "jump-from-safe")
		.reduce((acc, cur) => acc || cur.title === pass, false);
	const fragment = new DocumentFragment();

	if (V.ui !== "start") {
		App.UI.DOM.appendNewElement("p", fragment, App.Utils.userButton());

		if (V.cheatMode || V.debugMode) {
			App.UI.DOM.appendNewElement("div", fragment, pass);
			if (V.event instanceof App.Events.BaseEvent) {
				App.UI.DOM.appendNewElement("div", fragment, V.event.eventName);
			}
			if (V.debugMode) {
				App.UI.DOM.appendNewElement("div", fragment, playerConsistencyCheck());
			}
		}

		fragment.append(week());
		fragment.append(weather());

		if (V.sideBarOptions.Cash > 0) {
			fragment.append(cash());
		}

		if (V.mods.food.enabled && V.mods.food.market) {
			fragment.append(food());
		}

		if (V.sideBarOptions.Upkeep > 0) {
			fragment.append(upkeep());
		}

		if (V.sideBarOptions.roomPop > 0 && V.sideBarOptions.Style === 'expanded') {
			const div = document.createElement("div");
			div.classList.add("sidebar-grid");

			if (V.sideBarOptions.SexSlaveCount > 0) {
				slavesGrid(div);
			}
			addRooms(div);

			fragment.append(div);
		} else if (V.sideBarOptions.SexSlaveCount > 0) {
			fragment.append(slavesSimple());
		}

		if (pass !== "Manage Penthouse") {
			if (V.sideBarOptions.GSP > 0 && pass !== "Neighbor Interact") {
				fragment.append(economy());
			}

			if (V.sideBarOptions.Rep > 0) {
				fragment.append(reputation());
			}

			if (V.secExpEnabled > 0) {
				if (V.sideBarOptions.Authority > 0) {
					fragment.append(authority());
				}

				if (V.sideBarOptions.Security > 0) {
					fragment.append(security());
				}

				if (V.sideBarOptions.Crime > 0) {
					fragment.append(crime());
				}
			}
		}

		fragment.append(App.UI.quickMenu());

		if (V.nextButton !== "Continue" && V.nextButton !== " ") {
			if (V.debugMode > 0) {
				fragment.append(debug());
			}
		}

		const reminders = App.UI.DOM.appendNewElement("div", fragment, App.UI.DOM.link("Reminders", () => App.Reminders.dialog()));
		if (V.reminders.find(r => r.week <= V.week)) {
			reminders.append(" ", App.UI.DOM.makeElement("span", String.fromCharCode(0xe80c), ["icons", "noteworthy"]));
		}
	} else if (pass === "Starting Girls") {
		fragment.append(startingGirls());
	}

	const p = document.createElement("p");
	let article = App.UI.StoryCaption.encyclopedia;
	if (!article) {
		console.log(`No FCE article set for passage '${pass}'.`);
		article = "How to Play";
	}
	p.append(App.UI.DOM.makeElement("span", "FCE", ["bold"]), ": ", App.Encyclopedia.link(article));
	fragment.append(p);

	return fragment;

	function week() {
		const fragment = new DocumentFragment();
		const div = document.createElement("div");
		const tooltip = document.createElement("div");
		App.UI.DOM.appendNewElement("div", tooltip, capFirstChar(years(V.week)));
		if (V.arcologies[0].weeks !== V.week) {
			App.UI.DOM.appendNewElement("div", tooltip, `${capFirstChar(years(V.arcologies[0].weeks))} in ${V.arcologies[0].name}`);
		}
		App.UI.DOM.appendNewElement("span", fragment, App.UI.DOM.spanWithTooltip(`Week ${num(V.week)}`, tooltip, ['bold']));
		fragment.append(div);
		App.UI.DOM.appendNewElement("div", fragment, `Week of ${asDateString(V.week)}`);

		if (showCheats()) {
			fragment.append(App.UI.DOM.makeTextBox(V.week, week => {
				week = Math.trunc(week);
				V.week = week > 0 ? week : V.week;
				App.Utils.scheduleSidebarRefresh();
			}, true));
		}
		return fragment;
	}

	function weather() {
		const div = App.UI.DOM.appendNewElement("div", fragment, V.weatherToday.name, ["note"]);
		if (V.weatherToday.severity === 1) {
			div.classList.add("cyan");
		} else if (V.weatherToday.severity === 2) {
			div.classList.add("yellow");
		} else if (V.weatherToday.severity === 3) {
			div.classList.add("orange");
		} else {
			div.classList.add("red");
		}
		return div;
	}

	function cash() {
		const fragment = new DocumentFragment();
		V.cash = Math.trunc(V.cash);
		const css = ["cash"];
		if (V.cash <= 0) {
			css.push("dec");
		}
		const cashDiv = document.createElement("div");
		const cashDiff = V.cash - V.cashLastWeek;
		const classes = cashDiff > 0 ? 'cash' : 'cash dec';

		App.UI.DOM.appendNewElement("span", cashDiv, "Cash", css);
		cashDiv.append(" | ");
		App.UI.DOM.appendNewElement("span", cashDiv, cashFormat(V.cash), css);
		fragment.append(cashDiv);

		if (V.sideBarOptions.Style === 'compact') {
			tippy(cashDiv, {
				content: `<span class="${classes}">${cashFormat(cashDiff)}</span> since last week`,
				allowHTML: true,
			});
		} else {
			if (pass === "Main") {
				const div = document.createElement("div");
				div.append("(");
				let cashDiff = V.cash - V.cashLastWeek;
				if (cashDiff > 0) {
					App.UI.DOM.appendNewElement("span", div, cashFormat(cashDiff), ["green"]);
				} else {
					App.UI.DOM.appendNewElement("span", div, cashFormat(cashDiff), ["cash", "dec"]);
				}
				div.append(" since last week)");
				fragment.append(div);
			}
		}

		if (V.lastCashTransaction) {
			const transaction = document.createElement("div");
			css.push('note');
			App.UI.DOM.appendNewElement("span", transaction, `Last transaction`, css);
			transaction.append(" | ");
			if (V.lastCashTransaction > 0) {
				App.UI.DOM.appendNewElement("span", transaction, cashFormat(V.lastCashTransaction), css);
			} else {
				App.UI.DOM.appendNewElement("span", transaction, cashFormat(V.lastCashTransaction), ["cash", "dec"]);
			}
			fragment.append(transaction);
		}

		if (showCheats()) {
			fragment.append(App.UI.DOM.makeTextBox(V.cash, cash => {
				V.cash = Math.trunc(cash);
				V.cheater = 1;
				App.Utils.scheduleSidebarRefresh();
			}, true));
		}
		return fragment;
	}

	function food() {
		const fragment = new DocumentFragment();
		const foodDiv = document.createElement("div");

		const css = ["food"];
		if (V.mods.food.amount < App.Facilities.Farmyard.foodConsumption()) {
			css.push("dec");
		}
		const foodDiff = V.mods.food.amount - V.mods.food.lastWeek;
		const classes = foodDiff > 0 ? 'food' : 'food dec';

		/* check if there is enough food for the next week */
		App.UI.DOM.appendNewElement("span", foodDiv, "Food", css);
		if (V.mods.food.amount < 0) {
			V.mods.food.amount = 0;
		}
		foodDiv.append(" | ");
		App.UI.DOM.appendNewElement("span", foodDiv, massFormat(V.mods.food.amount), css);
		fragment.append(foodDiv);

		if (V.sideBarOptions.Style === 'compact') {
			tippy(foodDiv, {
				content: `<span class="${classes}">${massFormat(foodDiff)}</span> since last week`,
				allowHTML: true,
			});
		} else {
			if (pass === "Main") {
				const innerDiv = document.createElement("div");
				innerDiv.append("(");
				const foodDiff = (V.mods.food.amount - V.mods.food.lastWeek);
				App.UI.DOM.appendNewElement("span", innerDiv, massFormat(foodDiff), foodDiff < 0 ? ["red"] : ["chocolate"]);
				innerDiv.append(" since last week)");
				fragment.append(innerDiv);
			}
		}

		if (showCheats()) {
			fragment.append(App.UI.DOM.makeTextBox(V.mods.food.amount, food => {
				food = Math.trunc(food);
				V.mods.food.amount = food > 0 ? food : 0;
				App.Utils.scheduleSidebarRefresh();
			}, true));
		}
		return fragment;
	}

	function upkeep() {
		const div = document.createElement("div");
		if (passageSafe) {
			div.append(App.UI.DOM.passageLink("Upkeep", "Costs Budget"), " | ");
		} else {
			div.append(" Upkeep | ");
		}
		App.UI.DOM.appendNewElement("span", div, cashFormat(V.costs), ["cash", "dec"]);
		return div;
	}

	function slavesSimple() {
		const div = document.createElement("div");
		const dormsPop = V.dormitoryPopulation;
		const roomsPop = V.roomsPopulation;
		const dormsCap = V.dormitory;
		const roomsCap = V.rooms;
		const css = [];

		if (dormsPop > dormsCap || roomsPop > roomsCap) {
			css.push("warning");
		} else {
			css.push("pink");
		}

		App.UI.DOM.appendNewElement("span", div, "Total Sex Slaves", css);
		div.append(` | ${V.slaves.length}`);
		if (V.sideBarOptions.roomPop > 0 && V.sideBarOptions.Style === 'compact') {
			div.classList.add("has-tooltip");
			const popupDiv = document.createElement("div");
			popupDiv.classList.add("sidebar-grid");
			addRooms(popupDiv);
			tippy(div, {
				content: popupDiv,
				allowHTML: true,
			});
		}
		return div;
	}

	/**
	 * @param {HTMLDivElement} container
	 */
	function slavesGrid(container) {
		App.UI.DOM.appendNewElement("span", container, "Total Sex Slaves", ["pink"]);
		App.UI.DOM.appendNewElement("div", container, "|");
		App.UI.DOM.appendNewElement("div", container, `${V.slaves.length}`);
	}

	/**
	 * @param {HTMLDivElement} container
	 */
	function addRooms(container) {
		roomRow(container, "Penthouse Beds", V.dormitoryPopulation + V.roomsPopulation, V.dormitory + V.rooms);
		roomRow(container, "Dormitory Beds", V.dormitoryPopulation, V.dormitory);
		roomRow(container, "Luxury Rooms", V.roomsPopulation, V.rooms);
	}

	/**
	 * @param {HTMLDivElement} container
	 * @param {string} name
	 * @param {number} pops
	 * @param {number} cap
	 */
	function roomRow(container, name, pops, cap) {
		App.UI.DOM.appendNewElement("div", container, name, ["pink"]);
		App.UI.DOM.appendNewElement("div", container, "|");

		const text = `${pops}/${cap}`;
		if (pops > cap) {
			App.UI.DOM.appendNewElement("div", container, text, ["warning"]);
		} else {
			App.UI.DOM.appendNewElement("div", container, text);
		}
	}

	function economy() {
		const div = document.createElement("div");
		App.UI.DOM.appendNewElement("span", div, "GSP", ["yellowgreen"]);
		div.append(` | ${num(Math.trunc(0.1 * V.arcologies[0].prosperity))}`);
		if (V.showNumbers === 2 || (V.showNumbers === 1 && Math.trunc(0.1 * V.arcologies[0].prosperity) > V.showNumbersMax)) {
			div.append("m");
		} else {
			div.append(" million");
		}
		div.append(" ", ownershipReport(true));
		return div;
	}

	function reputation() {
		const div = document.createElement("div");
		if (passageSafe) {
			div.append(App.UI.DOM.passageLink("Rep", "Rep Budget"));
		} else {
			App.UI.DOM.appendNewElement("span", div, "Rep", ["reputation", "inc"]);
		}
		div.append(" | ");

		if (V.rep > 19000) {
			App.UI.DOM.appendNewElement("span", div, "worshipped").style.color = "rgb(0,145,0)";
		} else if (V.rep > 18000) {
			App.UI.DOM.appendNewElement("span", div, "great").style.color = "rgb(0,150,0)";
		} else if (V.rep > 17000) {
			App.UI.DOM.appendNewElement("span", div, "exalted").style.color = "rgb(0,155,0)";
		} else if (V.rep > 16000) {
			App.UI.DOM.appendNewElement("span", div, "illustrious").style.color = "rgb(0,160,0)";
		} else if (V.rep > 15000) {
			App.UI.DOM.appendNewElement("span", div, "prestigious").style.color = "rgb(0,165,0)";
		} else if (V.rep > 14000) {
			App.UI.DOM.appendNewElement("span", div, "renowned").style.color = "rgb(0,170,0)";
		} else if (V.rep > 13000) {
			App.UI.DOM.appendNewElement("span", div, "famed").style.color = "rgb(0,175,0)";
		} else if (V.rep > 12000) {
			App.UI.DOM.appendNewElement("span", div, "celebrated").style.color = "rgb(0,180,0)";
		} else if (V.rep > 11000) {
			App.UI.DOM.appendNewElement("span", div, "honored").style.color = "rgb(0,185,0)";
		} else if (V.rep > 10000) {
			App.UI.DOM.appendNewElement("span", div, "acclaimed").style.color = "rgb(0,190,0)";
		} else if (V.rep > 9000) {
			App.UI.DOM.appendNewElement("span", div, "eminent").style.color = "rgb(0,195,0)";
		} else if (V.rep > 8250) {
			App.UI.DOM.appendNewElement("span", div, "prominent").style.color = "rgb(0,200,0)";
		} else if (V.rep > 7500) {
			App.UI.DOM.appendNewElement("span", div, "distinguished").style.color = "rgb(0,205,0)";
		} else if (V.rep > 6750) {
			App.UI.DOM.appendNewElement("span", div, "admired").style.color = "rgb(0,210,0)";
		} else if (V.rep > 6000) {
			App.UI.DOM.appendNewElement("span", div, "esteemed").style.color = "rgb(0,215,0)";
		} else if (V.rep > 5250) {
			App.UI.DOM.appendNewElement("span", div, "respected").style.color = "rgb(0,220,0)";
		} else if (V.rep > 4500) {
			App.UI.DOM.appendNewElement("span", div, "known").style.color = "rgb(0,225,0)";
		} else if (V.rep > 3750) {
			App.UI.DOM.appendNewElement("span", div, "recognized").style.color = "rgb(0,230,0)";
		} else if (V.rep > 3000) {
			App.UI.DOM.appendNewElement("span", div, "rumored").style.color = "rgb(0,235,0)";
		} else if (V.rep > 2250) {
			App.UI.DOM.appendNewElement("span", div, "envied").style.color = "rgb(0,240,0)";
		} else if (V.rep > 1500) {
			App.UI.DOM.appendNewElement("span", div, "resented").style.color = "rgb(0,245,0)";
		} else if (V.rep > 750) {
			App.UI.DOM.appendNewElement("span", div, "disliked").style.color = "rgb(0,250,0)";
		} else {
			App.UI.DOM.appendNewElement("span", div, "unknown").style.color = "rgb(0,255,0)";
		}
		div.append(` (${num(V.rep)})`);

		if (showCheats()) {
			div.append(App.UI.DOM.makeTextBox(V.rep, rep => {
				V.rep = Math.clamp(Math.trunc(rep), 0, 20000);
				V.cheater = 1;
				App.Utils.scheduleSidebarRefresh();
			}, true));
		}
		return div;
	}

	function authority() {
		const div = document.createElement("div");
		App.UI.DOM.appendNewElement("span", div, "Auth", ["darkviolet"]);

		div.append(" | ");
		const span = document.createElement("span");
		span.className = "darkviolet";
		App.Mods.SecExp.authorityX();
		if (V.SecExp.core.authority > 19500) {
			span.append("divine will");
		} else if (V.SecExp.core.authority > 19000) {
			span.append("sovereign");
		} else if (V.SecExp.core.authority > 18000) {
			span.append("monarch");
		} else if (V.SecExp.core.authority > 17000) {
			span.append("tyrant");
		} else if (V.SecExp.core.authority > 15000) {
			span.append("dictator");
		} else if (V.SecExp.core.authority > 14000) {
			span.append("prince");
		} else if (V.SecExp.core.authority > 13000) {
			span.append("master");
		} else if (V.SecExp.core.authority > 12000) {
			span.append("leader");
		} else if (V.SecExp.core.authority > 11000) {
			span.append("director");
		} else if (V.SecExp.core.authority > 10000) {
			span.append("overseer");
		} else if (V.SecExp.core.authority > 9000) {
			span.append("chief");
		} else if (V.SecExp.core.authority > 8000) {
			span.append("manager");
		} else if (V.SecExp.core.authority > 7000) {
			span.append("principal");
		} else if (V.SecExp.core.authority > 6000) {
			span.append("auxiliary");
		} else if (V.SecExp.core.authority > 5000) {
			span.append("subordinate");
		} else if (V.SecExp.core.authority > 4000) {
			span.append("follower");
		} else if (V.SecExp.core.authority > 3000) {
			span.append("powerless");
		} else if (V.SecExp.core.authority > 2000) {
			span.append("toothless");
		} else if (V.SecExp.core.authority > 1000) {
			span.append("mostly harmless");
		} else {
			span.append("harmless");
		}

		div.append(span, ` (${num(Math.trunc(V.SecExp.core.authority))})`);
		if (showCheats()) {
			div.append(App.UI.DOM.makeTextBox(V.SecExp.core.authority, auth => {
				V.SecExp.core.authority = Math.clamp(Math.trunc(auth), 0, 20000);
				V.cheater = 1;
				App.Utils.scheduleSidebarRefresh();
			}));
		}
		return div;
	}

	function security() {
		const div = document.createElement("div");
		App.UI.DOM.appendNewElement("span", div, "Security", ["deepskyblue"]);
		div.append(" | ");

		App.UI.DOM.appendNewElement("span", div, `${Math.trunc(V.SecExp.core.security)}%`, ["deepskyblue"]);
		if (showCheats()) {
			div.append(App.UI.DOM.makeTextBox(V.SecExp.core.security, sec => {
				V.SecExp.core.security = Math.clamp(Math.trunc(sec), 0, 100);
				V.cheater = 1;
				App.Utils.scheduleSidebarRefresh();
			}, true));
		}
		return div;
	}

	function crime() {
		V.SecExp.core.crimeLow = Math.clamp(V.SecExp.core.crimeLow, 0, 100);
		const div = document.createElement("div");
		App.UI.DOM.appendNewElement("span", div, "Crime", ["orangered"]);
		div.append(" | ");
		App.UI.DOM.appendNewElement("span", div, `${Math.trunc(V.SecExp.core.crimeLow)}%`, ["orangered"]);

		if (showCheats()) {
			div.append(App.UI.DOM.makeTextBox(V.SecExp.core.crimeLow, crime => {
				V.SecExp.core.crimeLow = Math.clamp(Math.trunc(crime), 0, 100);
				V.cheater = 1;
				App.Utils.scheduleSidebarRefresh();
			}, true));
		}
		return div;
	}

	function showCheats() {
		return pass === "Main" && V.cheatMode && V.cheatModeM;
	}

	function debug() {
		const p = document.createElement("p");
		p.append("Debugging Tools");

		App.UI.DOM.appendNewElement("div", p, App.UI.DOM.link("Display Variables", App.checkVars));

		App.UI.DOM.appendNewElement("div", p, App.UI.DOM.link("Display Changed Variables", () => {
			/* makes sure we store the current state so we can return to it */
			Config.history.maxStates = 2;
			Engine.play("Variable Difference");
		}));

		if (V.debugModeCustomFunction > 0) {
			const textarea = document.createElement("textarea");
			textarea.id = "cheat-function";
			p.append(textarea);

			p.append(App.UI.DOM.link("Run Custom Function", () => {
				let value = textarea.value;
				if (value.charAt(0) !== "(") {
					value = `() => {${value}}`;
				}
				if (typeof eval(value) === "function") {
					(eval(value))();
					Engine.play(pass);
				} else {
					Dialog.append("Not a valid function").open();
				}
			}));
		}

		App.UI.DOM.appendNewElement("div", p, App.UI.DOM.link("Dump Game State", App.Debug.dumpGameState));

		return p;
	}

	function startingGirls() {
		const f = new DocumentFragment();

		// @ts-ignore // In starting girls we know that there is always an active slave
		let cost = startingSlaveCost(V.activeSlave);
		let p = document.createElement("p");
		if (cost > V.cash) {
			const div = document.createElement("div");
			div.classList.add("cash", "dec");
			div.append("This slave will cost ",
				App.UI.DOM.makeElement("span", cashFormat(cost), ["bold"]), ".");
			p.append(div);

			App.UI.DOM.appendNewElement("div", p, `You only have: ${cashFormat(V.cash)}.`);
		} else {
			const div = document.createElement("div");
			div.append("This slave will cost ",
				App.UI.DOM.makeElement("span", cashFormat(cost), ["cash"]), ".");
			p.append(div);

			App.UI.DOM.appendNewElement("div", p, `You have ${cashFormat(V.cash)}.`);
		}
		f.append(p);

		if (V.limitedCheatStart) {
			p = document.createElement("p");
			p.append("Edit cash: ", App.UI.DOM.makeTextBox(V.cash, cash => {
				cashX(cash - V.cash, "cheating");
				App.UI.reload();
			}, true));
			f.append(p);
		}

		return f;
	}
};
