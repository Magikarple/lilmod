App.Events.PDefenseFears = class PDefenseFears extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.mercenaries < 3
		];
	}

	execute(node) {
		V.nextButton = " "; /* hide button until user makes a selection */
		V.fcnn.push("...hiring mercenaries to act as a defensive force against the old world...");

		App.Events.addParagraph(node, [`A deputation of slaveowning citizens comes to see you. Though they haven't experienced anything so disturbing as your dealings with the Daughters of Liberty, rumors of unrest and revolution are running through the Free Cities. They are upset with the lack of troops to protect the arcology. This is quite a development in the young history of Free Cities society; only a few months ago, the idea of collective defense would have been a bitterly controversial one. It's still an employer's market for mercenaries; you could easily hire some. Alternatively, your citizens would probably agree to fund them by subscription — the word "taxes" would be impolitic.`]);

		App.Events.addParagraph(node, [
			App.UI.DOM.makeElement("span", "This is a unique and very important opportunity", "bold"),
			`and must not be taken lightly.`
		]);

		const choices = [];
		choices.push(new App.Events.Result(`Install a full platoon by subscription`, subscription));
		choices.push(
			new App.Events.Result(
				`Install a full platoon at your expense`, yourExpense, App.Events.makeNode([`This will cost ${cashFormat(10000)} and ${(V.PC.skill.warfare >= 100 || V.PC.career === "arcology owner") ? `some upkeep, <span class="skill player">reduced by your mercenary contacts</span>` : `incur significant upkeep costs`}`])
			)
		);
		choices.push(new App.Events.Result(`Refuse to quarter so many troops in your arcology`, plead3rd));
		App.Events.addResponses(node, choices);

		function subscription() {
			V.nextButton = "Continue";
			App.Utils.updateUserButton();/* unlock Continue button */
			repX(-500, "event");
			V.mercenaries = 3;
			return `You hire a full platoon of reputable mercenaries and a veteran officer to command them, kit them in excellent gear, and quarter them in the arcology. Their pay is on an escrow basis; the huge lump sum you paid will serve to secure them, and its interest will constitute their pay. The sight of many armed men on patrol has reassured the worried slaveowners, but they are <span class="red">resentful</span> of having to take this step themselves.`;
		}

		function yourExpense() {
			V.nextButton = "Continue";
			App.Utils.updateUserButton();/* unlock Continue button */
			repX(2500, "event");
			cashX(-10000, "mercenaries");
			V.mercenaries = 3;
			return `You hire a full platoon of reputable mercenaries and a veteran officer to command them, kit them in excellent gear, and quarter them in the arcology. Their pay is on an escrow basis; the huge lump sum you paid will serve to secure them, and its interest will constitute their pay. The sight of many armed men on patrol has reassured the worried slaveowners, and they are <span class="green">grateful</span> to you for seeing to their defense.`;
		}

		function plead3rd() {
			V.nextButton = "Continue";
			App.Utils.updateUserButton();/* unlock Continue button */
			V.arcologies[0].prosperity = Math.trunc(V.arcologies[0].prosperity * 0.8);
			repX(-1000, "event");
			return `The consensus that the arcology is vulnerable triggers an <span class="red">exodus</span> of your most wealthy and valuable citizens, and your reputation <span class="red">suffers</span> grievously.`;
		}
	}
};
