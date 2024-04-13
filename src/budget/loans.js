App.Budget.loans = function() {
	/** @typedef {('bank'|'shark')} Lender */

	const frag = new DocumentFragment();

	const loan = (/** @type {Lender} */ name) => V.loans.find(loan => loan.name === name);

	App.UI.DOM.appendNewElement("h2", frag, `Loans`);

	if (V.loans.length) {
		frag.append(pay());
	}

	frag.append(
		bank(),
		loanshark(),
	);

	return frag;

	function pay() {
		const div = document.createElement("div");
		const links = [];
		const text = [];

		text.push(`You`);
		if (loan('bank')) {
			text.push(`still owe the bank ${cashFormat(Math.trunc(loan('bank').full))}`);
			if (loan('shark')) {
				text.push(`and`);
			}
		}
		if (loan('shark')) {
			text.push(`have ${years(loan('shark').deadline - V.week)} to pay the shark back ${cashFormat(Math.trunc(loan('shark').full))}`);
		}
		text.push(text.pop() + `.`);
		text.push(`You can pay off your loans here.`);

		if (loan('bank')) {
			const bank = loan('bank');
			if (V.cash > bank.full) {
				links.push(App.UI.DOM.link(`Pay off your bank loan`, () => {
					cashX(forceNeg(bank.full), "loan");
					V.loans.delete(bank);

					App.UI.reload();
				}));
			} else {
				links.push(App.UI.DOM.disabledLink(`Pay off your bank loan`, [
					`You lack the necessary funds to pay off this loan`,
				]));
			}
		}
		if (loan('shark')) {
			const shark = loan('shark');
			if (V.cash > shark.full) {
				links.push(App.UI.DOM.link(`Pay off the loanshark`, () => {
					cashX(forceNeg(shark.full), "loan");
					V.loans.delete(shark);

					App.UI.reload();
				}));
			} else {
				links.push(App.UI.DOM.disabledLink(`Pay off the loanshark`, [
					`You lack the necessary funds to pay off this loan`,
				]));
			}
		}

		div.append(text.join(' '));
		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);

		return div;
	}

	function bank() {
		const div = document.createElement("div");
		const values = [10000, 100000, 1000000];
		const disabledReasons = [];
		const links = [];

		div.append(`You can take out a loan from one of the credit unions in the Free City, if you have the reputation for them to trust you.`);
		App.UI.DOM.appendNewElement("div", div,
			`If for any reason you lack the credits, sectors of ${V.arcologies[0].name} will be used in lieu of payment.`,
			["note", "indent"]);

		if (V.rep < 10000) {
			disabledReasons.push(`You need at least ${num(10000)} reputation to take a loan from this lender.`);
		}
		if (loan('bank')) {
			disabledReasons.push(`You have already taken out a loan from this lender.`);
		}

		if (disabledReasons.length === 0) {
			for (const amount of values) {
				const loan = createLoan("bank", amount);
				const f = new DocumentFragment();
				f.append(App.UI.DOM.link(cashFormat(amount), () => {
					V.loans.push(loan);
					cashX(amount, "loan");
					App.UI.reload();
				}));
				const info = new DocumentFragment();
				App.Events.addNode(info, [`${cashFormatColor(loan.full)} over ${num(loan.deadline - V.week)} weeks`]);
				f.append(" – ", App.UI.DOM.spanWithTooltip(info, terms("bank", loan)));
				links.push(f);
			}
		} else {
			values.map(val => links.push(App.UI.DOM.disabledLink(cashFormat(val), disabledReasons)));
		}

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);

		return div;
	}

	function loanshark() {
		const div = document.createElement("div");
		const values = [10000, 100000, 1000000];
		const disabledReasons = [];
		const links = [];

		div.append(`If you're not quite reputable enough, you can also borrow money from one of the local loan-sharks in the area.`);
		App.UI.DOM.appendNewElement("div", div,
			`If for any reason you miss a payment the lender will send his men to collect – forcibly, if necessary.`,
			["note", "indent"]);

		if (V.rep < 2000) {
			disabledReasons.push(`You need at least ${num(2000)} reputation to take a loan from this lender.`);
		}
		if (loan('shark')) {
			disabledReasons.push(`You have already taken out a loan from this lender.`);
		}

		if (disabledReasons.length === 0) {
			for (const amount of values) {
				const loan = createLoan("shark", amount);
				const f = new DocumentFragment();
				f.append(App.UI.DOM.link(cashFormat(amount), () => {
					V.loans.push(loan);
					cashX(amount, "loan");

					App.UI.reload();
				}));
				const info = new DocumentFragment();
				App.Events.addNode(info, [`${cashFormatColor(loan.full)} after ${num(loan.deadline - V.week)} weeks`]);
				f.append(" – ", App.UI.DOM.spanWithTooltip(info, terms("shark", loan)));
				links.push(f);
			}
		} else {
			values.map(val => links.push(App.UI.DOM.disabledLink(cashFormat(val), disabledReasons)));
		}

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);

		return div;
	}

	/**
	 * @param {"bank"|"shark"}lender
	 * @param {number} amount
	 * @returns {FC.Loan}
	 */
	function createLoan(lender, amount) {
		const term = Math.max(amount / 50000, 4);
		const apr = Math.max(Math.abs((V.rep - 20000) / 500), 5);
		let interest;
		let installments;
		if (lender === "shark") {
			interest = (amount * (term / 52) * (apr / 100)) * 3;
			installments = 1;
		} else {
			interest = amount * (term / 52) * (apr / 100);
			installments = term;
		}
		const full = amount + interest;

		return {
			name: 'shark',
			principal: amount,
			deadline: V.week + term,
			installments,
			apr,
			interest,
			full: Math.trunc(full),
		};
	}

	/**
	 * @param {Lender} lender
	 * @param {FC.Loan} loan
	 */
	function terms(lender, loan) {
		if (lender === 'bank') {
			return `You will pay about ${cashFormat(Math.trunc(loan.full / (loan.deadline - V.week)))} per week for ${num(loan.deadline - V.week)} weeks until you have paid off the entire balance. You will end up paying back about ${cashFormat(Math.trunc(loan.full))} after interest.`;
		} else {
			return `You will have ${num(loan.deadline - V.week)} weeks to pay off the full amount. You will end up paying back about ${cashFormat(Math.trunc(loan.full))} after interest.`;
		}
	}
};
