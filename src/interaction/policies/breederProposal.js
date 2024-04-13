App.UI.breederProposal = function() {
	const node = new DocumentFragment();
	V.propOutcome = -1;

	App.UI.DOM.appendNewElement("p", node, `You draft a proposal to the Societal Elite proposing the use of specially tested slaves as breeding stock. If they can pass the tests required to join the Societal Elite; even as slaves, their bodies can prove valuable to furthering eugenics. They will gain no additional rights, but their wombs will be used to birth Elite children; helping stave off potential threats of inbreeding and adding possible missed beneficial traits into the Elite's gene pool.`);

	App.UI.DOM.appendNewElement("div", node, `Within the hour, you are called before${(V.eugenicsFullControl === 1) ? ` what's left of` : ``} the Societal Elite.`);

	const {
		girlP
	} = getPronouns(V.PC).appendSuffix("P");
	if (V.eugenicsFullControl === 1) {
		App.UI.DOM.appendNewElement("div", node, `"That sounds like an acceptable proposal. We'll draft the standards for breeding stock and notify you shortly."`);
		V.propOutcome = 1;
		unlock();
	} else if (V.PC.pregSource === -1 || V.PC.pregSource === -6) {
		App.UI.DOM.appendNewElement("div", node, `"Since you are doing your part and carrying an Elite child, we will gladly reward you by granting your proposal. We shall decide upon the standards for breeding stock and notify you shortly."`);
		V.propOutcome = 1;
		unlock();
	} else if (V.PC.counter.birthElite > 0) {
		App.UI.DOM.appendNewElement("div", node, `"Since you have carried children for our cause, we will gladly reward you by granting your proposal. We shall decide upon the standards for breeding stock and notify you shortly."`);
		V.propOutcome = 1;
		unlock();
	} else if (V.PC.dick === 0) {
		if (V.failedElite > 50) {
			App.UI.DOM.appendNewElement("div", node, `"Do you really think you are in any position to make such a request? You, a fertile woman and member of the Elite, who has not taken even the slightest interest in carrying one of our children, dares to even suggest using slaves as breeding stock? Well?"`);

			const usedAsBreeder = function() {
				V.playerBred = 1;
				V.propOutcome = 1;
				unlock();
				return `"Good choice, ${girlP}. A selection of eligible donors will be provided to you; take your pick and bear our children. Or use a test tube, if that's more to your tastes."`;
			};

			const declineAsBreeder = function() {
				V.failedElite += 275;
				V.propOutcome = -1;
				unlock();
				return `"You'll regret this decision. We'll have our way one way or another."`;
			};

			App.Events.addResponses(node, [
				new App.Events.Result(`Agree to being used as a breeder and save face`, usedAsBreeder),
				new App.Events.Result(`Decline being used as a breeder and face the Societal Elites' wrath`, declineAsBreeder),
			]);
		} else {
			App.UI.DOM.appendNewElement("div", node, `"An interesting proposal, given your lack of equipment, though we would be much more open to listen to your request if you were heavy with one of our children.`);

			const usedAsBreeder = function() {
				V.failedElite -= 50;
				V.playerBred = 1;
				V.propOutcome = 1;
				unlock();
				return `"Good choice, ${girlP}; your proposal is more important than your dignity after all, isn't it? A selection of eligible donors will be provided to you; take your pick and bear our children. Or use a test tube, if that's more to your tastes."`;
			};

			const declineAndLeverage = function() {
				V.propOutcome = 1;
				unlock();
				return `"Yes, you have done much to further our cause. We respect the 'balls' on you, despite your lack of them. Very well, we shall set the standards for what shall qualify as breeding stock and our standards will be delivered to you shortly."`;
			};

			const declineAsBreeder = function() {
				V.propOutcome = -1;
				unlock();
				return `"Then why waste our time? You disappoint us, but don't worry; you'll be laden with child soon enough."`;
			};

			const choices = [];
			choices.push(new App.Events.Result(`Agree to being used as a breeder for the sake of your proposal`, usedAsBreeder));
			if (V.failedElite <= 0) {
				choices.push(new App.Events.Result(`Decline being used as a breeder and leverage your standing`, declineAndLeverage));
			} else {
				choices.push(new App.Events.Result(`Decline being used as a breeder and withdraw your proposal`, declineAsBreeder));
			}
			App.Events.addResponses(node, choices);
		}
	} else {
		if (V.PC.dick !== 0 && V.PC.vagina !== -1 && V.failedElite > 50) {
			App.UI.DOM.appendNewElement("div", node, `"We have read your proposal and propose the following: You are not well liked among us, and your medical records show you are quite capable of carrying a child. If you will carry our children, we will grant your proposal, otherwise, leave and never ask us this again."`);

			const agree = function() {
				V.failedElite -= 50;
				V.playerBred = 1;
				V.propOutcome = 1;
				unlock();
				return `"Your contributions will be appreciated. We shall convene to decide the qualifications for a slave to become a breeder. We will inform you of them when we send the list of eligible donors to breed you. Or send you a test tube, if that's more to your tastes."`;
			};

			const declineWithdraw = function() {
				V.propOutcome = -1;
				unlock();
				return `"Very well, if your masculinity is more valuable to you than your proposal, then so be it."`;
			};

			App.Events.addResponses(node, [
				new App.Events.Result(`Agree to being used as a breeder to complete the deal`, agree),
				new App.Events.Result(`Decline being used as a breeder and withdraw your proposal`, declineWithdraw),
			]);
		} else if (V.PC.dick !== 0 && V.PC.vagina !== -1) {
			App.UI.DOM.appendNewElement("div", node, `"We have read your proposal and agree. However, we shall set the standards for what shall qualify as breeding stock, not you. Our standards will be delivered to you shortly.`);

			App.UI.DOM.appendNewElement("p", node, `Your medical records say you have working female sex organs, and we respect your choice to not use them. But have you considered carrying another member's child? It will be extremely lucrative for you and go a long way to furthering our objectives."`);

			const agree = function() {
				V.playerBred = 1;
				V.propOutcome = 1;
				unlock();
				return `"Your contributions will be appreciated. We shall convene to decide the qualifications for a slave to become a breeder. We will inform you of them when we send the list of eligible donors to breed you. Or send you a test tube, if that's more to your tastes."`;
			};

			const declineAsBreeder = function() {
				V.propOutcome = 1;
				unlock();
				return `"Very well, if you wish to waste your gift, it is your prerogative. We shall convene to decide the qualifications for a slave to become a breeder and inform you upon completion."`;
			};

			App.Events.addResponses(node, [
				new App.Events.Result(`Agree to being used as a breeder`, agree),
				new App.Events.Result(`Decline being used as a breeder`, declineAsBreeder),
			]);
		} else {
			App.UI.DOM.appendNewElement("div", node, `"We have read your proposal and agree. However, we shall set the standards for what shall qualify as breeding stock, not you. Our standards will be delivered to you shortly."`);
			V.propOutcome = 1;
			unlock();
		}
	}
	return node;

	/** unlock Continue button */
	function unlock() {
		V.nextButton = "Continue";
		App.Utils.updateUserButton();
	}
};
