App.Events.PMercenaries = class PMercenaries extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.mercenaries === 0
		];
	}

	execute(node) {
		V.nextButton = "Continue";
		V.mercenaries = 0;
		V.mercenariesTitle = "mercenaries";

		let price = 5000;
		if (V.PC.skill.warfare >= 100) {
			price = 2500;
		} else if (V.PC.skill.warfare >= 50) {
			price = 3725;
		}

		App.Events.addParagraph(node, [`Another wave of security hysteria is sweeping the Free Cities. And this time, it's not based on rumor and alarmism. On the other side of the globe, a Free City was sacked by an old world army today. The Free City's handful of high-technology defenders and multitude of drones caused heavy casualties among the attackers, but eventually sheer weight of numbers wore them down.`]);

		App.Events.addParagraph(node, [`Your Free City is on good terms with the nations that border it, unlike the unfortunate sacked city, which was next to a nation suffering total collapse and looking for a convenient target. However, there's no telling how long this will last. The situation in the small, troubled country close to the arcology you've been monitoring grows worse by the day${(V.nationHate > 0) ? ", and if rumor of your enslavement of some of their vulnerable citizens got out, its people may have cause to hate you" : ""}.`]);

		App.Events.addParagraph(node, [
			`The budgetary difficulty many old world countries are in has resulted in unemployed soldiers looking for mercenary work. You could easily hire some of them to protect the arcology and fight in the militia if necessary.`,
			App.UI.DOM.makeElement("span", "This is a unique opportunity.", "bold"),
			`Without this security scare, it's unlikely you could convince any of your free-spirited tenants to even stay near a permanent armed presence.`
		]);
		const discount = (V.PC.skill.warfare >= 50 || V.PC.career === "arcology owner");
		const choices = [];
		choices.push(new App.Events.Result(
			`Quarter a squad in the arcology`, quarter,
			App.Events.makeNode([
				`This will cost ${cashFormat(price)} ${discount
					? `and some upkeep, <span class="skill player">reduced by your mercenary contacts.</span>`
					: `and incur significant upkeep costs.`}`
			])
		));
		choices.push(new App.Events.Result(
			`Quarter a platoon in the arcology`, platoon,
			App.Events.makeNode([
				`This will cost ${cashFormat(price * 2)} ${discount
					? `and some upkeep, <span class="skill player">reduced by your mercenary contacts.</span>`
					: `and incur significant upkeep costs.`}`
			])
		));
		choices.push(new App.Events.Result(`Do not quarter troops in your arcology`, plead3rd));
		App.Events.addResponses(node, choices);

		function quarter() {
			repX(-100, "event");
			cashX(forceNeg(price), "mercenaries");
			V.mercenaries = 1;
			if (V.secExpEnabled > 0) {
				V.SecExp.units.mercs.free = 15;
			}
			return `You hire some reputable mercenaries, kit them in excellent gear, and quarter them in ${V.arcologies[0].name}. The sight of armed men on patrol has <span class="red">offended some of the more free-spirited citizens</span> of ${V.arcologies[0].name}.`;
		}

		function platoon() {
			repX(-500, "event");
			cashX(forceNeg(price * 2), "mercenaries");
			V.mercenaries = 3;
			if (V.secExpEnabled > 0) {
				V.SecExp.units.mercs.free = 30;
			}
			return `You hire a full platoon of reputable mercenaries with a veteran officer to command them, kit them in excellent gear, and quarter them in ${V.arcologies[0].name}. The sight of many armed men on patrol has <span class="red">deeply offended some of the more free-spirited citizens</span> of ${V.arcologies[0].name}.`;
		}

		function plead3rd() {
			V.mercenaries = 0;
			return `Having armed men on permanent watch is a step too far. ${V.arcologies[0].name}'s security systems are formidable and will have to serve.`;
		}
	}
};
