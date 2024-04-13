// cSpell:ignore unhealable

/** If the player loses the game during an event or similar story passage,
 * and you want to leave the already-rendered text from that passage up,
 * just call this function and don't provide any other interaction.
 * If they lose by clicking a link or during an interactive passage and you
 * want a convenient passage transition, use the "Gameover" passage instead.
 * @param {ParentNode} node
 */
App.Events.LocalGameOver = function(node) {
	V.ui = "start";
	App.Utils.scheduleSidebarRefresh();

	App.UI.DOM.appendNewElement("p", node, "GAME OVER", "bold");
};

App.Events.Gameover = function() {
	const node = new DocumentFragment();
	let r = [];

	// if we lost the game during endweek, hide the animation
	App.UI.EndWeekAnim.end();

	switch (V.gameover) {
		case "idiot ball": {
			const {
				His,
				he, his, him
			} = getPronouns(S.Bodyguard);
			r.push(`You quickly move to deal ${S.Bodyguard.slaveName} a slap across the face. You have an instant to realize the depth of your folly as ${his} combat training kicks into gear: before ${he} realizes what ${he}'s doing, ${he} has drawn ${his} sword, blocked your slap (and incidentally, removed your hand in doing so), and buried the sword in your chest on the riposte. ${His} devotion returns to ${him} as ${his} combat instincts subside. As you fade, you see ${his} eyes cloud with terrible, unhealable guilt; in one sure movement, ${he} draws ${his} weapon, sets it to semi-automatic, places it under ${his} chin, and fires a single round.`);
			break;
		}
		case "debt":
			r.push(`You have fallen so far into debt that it is mere child's play for another slaveowner to purchase your debt, call it in, and enslave you. The story of your remaining years may be worth telling, but it must be told elsewhere.`);
			V.slavePC = convertPlayerToSlave(V.PC);
			break;
		case "birth complications":
			r.push(`Again and again, you keep bearing down. As you grow more exhausted and are no closer to giving birth, you let out a feeble cry for help.`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`Some of your slaves rush to your aid, but they don't know what to do; they helplessly watch as you slowly fade away. If only you had someone you could rely on at your side, perhaps this could have been avoided. At last, the medics arrive at ${V.assistant.name}'s order, but it is too late to save you or your ${(V.PC.pregType > 1) ? "children" : "child"}.`);
			break;
		case "ownership":
			r.push(`Since you no longer possess a controlling interest in an arcology, your time of influence and power in the Free Cities is over. You remain wealthy, and your life after the part of it worth telling is not something worth regretting. A retirement full of decadence awaits you.`);
			break;
		case "sisters":
			r.push(`For the first time in a long time, you feel the need to verbalize a response, telling the matron that yes, you will join them. She seems to understand, and takes you by the hand in a surprisingly familial gesture, leading you towards the orgy. She tells you she loves you, and all her Sisters echo her. After a moments' surprise, you tell them you love them too, and feminine hands reach out to draw you into their communion. A young futa sucks your cock and then feeds you your own cum from her mouth. An older futa with an enormous penis displaces her and makes out with you while she fucks your pussy. After she finishes inside you she slides your erection inside her own womanhood and rides you while a younger futa fucks your cleavage. You have a free hand which someone fills by pressing an enormous soft breast against it and you oblige her by massaging it eagerly. The futa matron's pussy grows suddenly tighter as another futa starts to buttfuck her and then looser as the cock is removed and inserted into your asshole instead. When she cums inside you she pulls out and her cock is replaced by a greedy mouth and tongue whose owner you cannot see. The older futa presses her cockhead into a younger Sister's mouth and orgasms before sliding herself under you so you can be on top instead. A futa whispers that she wants to be closer to you and slides her cock inside the matron's pussy alongside yours as she nestles her face between your breasts.`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`Your appointed successor arrives in your old office to find ${V.assistant.name} ready to help them take control of the arcology. Most of your assets have been liquidated to create a huge endowment for ${V.arcologies[0].name}'s Sisters. They'll never have to sell one of their own again, and will be able to afford all the advanced drugs and surgeries they desire. From the most matronly futa down to their newest Sister, none of them need concern themselves with anything other than sex.`);
			break;
		case "major battle defeat":
			if (V.SecExp.war.attacker.type === "raiders") {
				r.push(`As the horde of raiders breaks the battle lines and enters the arcology, all hell breaks loose. You citizens are raped, your slaves captured and abused, your penthouse burned.`);
				r.push(`As for you, you are quickly captured and brought in front of the warlord himself. With a satisfied smile he aims his pistol to your forehead and squeezes the trigger.`);
			} else if (V.SecExp.war.attacker.type === "old world") {
				r.push(`As the interminable column of old world puppets breaks the battle lines and enters the arcology, all hell breaks loose. Properties are seized and wealth stolen and distributed between the victorious soldiers.`);
				r.push(`You are stripped of everything you possessed and left to rot in a corner of your once glorious arcology.`);
			} else if (V.SecExp.war.attacker.type === "freedom fighters") {
				r.push(`As the army of freedom fighters invades the arcology, all hell breaks loose. Their righteous fury torches everything you held dear, while the streets of the arcology run red with the blood of the masters.`);
				r.push(`You are reserved a special death: crucified in front of the arcology's entrance, your corpse a grim reminder of your legacy.`);
			} else if (V.SecExp.war.attacker.type === "free city") {
				r.push(`As the mercenaries break the battle lines and enter the arcology all hell breaks loose. The sectors are pillaged one by one, systematically and thoroughly. When they break in the penthouse they quickly capture and send you to their employers as proof of their success.`);
				r.push(`Your personal story may continue, but that part of it worthy of retelling has now ended.`);
			}
			break;
		case "Rebellion defeat":
			r.push(`As the furious horde of ${V.SecExp.war.type.toLowerCase().replace(" rebellion", "")}s invades your penthouse you are left a few precious seconds to decide your fate. You embrace for the last time your faithful revolver and just as the rebels break through your doors you squeeze the trigger.`);
			r.push(`The end of your story has come and your arcology is now in the hands of whoever will take control of the vermin that dared rise up this day.`);
			break;
		case "Idiot Ball 2 The Dumbassening":
		case "Idiot Ball 3 Totally Not Idiot Ball 2 Again":
			r.push(`As you leave your penthouse to conduct your daily rounds, you promptly get`);
			if (V.arcologyUpgrade.drones === 1) {
				r.push(`tased by the nearest drone.`);
			} else {
				r.push(`tackled hard against the wall.`);
			}
			r.push(`When you awake, it hits you like a truck; you idiotically enslaved your ${V.PC.race} ass by decreeing all${(V.gameover === "Idiot Ball 2 The Dumbassening") ? `non-${V.arcologies[0].FSSupremacistRace}` : V.arcologies[0].FSSubjugationistRace}${(V.PC.race !== "mixed race") ? "s" : " individuals"} slaves, and since you are now a slave, lack the authority to revert the policy. The story of your remaining years may be worth telling, as is your legendary blunder, but it must be told elsewhere.`);
			if (V.gameover === "Idiot Ball 2 The Dumbassening") {
				V.slavePC = convertPlayerToSlave(V.PC, "notSupreme");
			} else {
				V.slavePC = convertPlayerToSlave(V.PC, "subjugated");
			}
			break;
		case "starving citizens":
			r.push(`You made a promise to your citizens that you would be able to keep them fed, and you had been able to keep that promise – until now, that is. Your food storages have been depleted and you don't have enough money to buy enough to feed the rest of the hungry arcology. Desperate and facing starvation, your once-loyal subjects have taken to the streets, eventually finding their way to your penthouse.${V.arcologyUpgrade.drones ? ` Your drones are only able to keep them at bay for a little while before the sheer number of them overwhelms your defenses.` : ``} Your attempts to calm the crowd fail, and you find yourself wishing you had run when you had the chance as you are grabbed by the crowd and thrown through the nearest window.`);
			break;
		case "loanshark":
			r.push(`You signed a contract with a loanshark, and since you weren't able to pay the debt off, he now technically owns you. – What the man plans to do with a former arcology owner remains to be seen.`);
			V.slavePC = convertPlayerToSlave(V.PC);
			break;
		default:
			r.push(`Since you are without slaves, Free Cities society no longer considers you a citizen of the first rank. Your personal story may continue, but that part of it worthy of retelling has now ended.`);
	}
	App.Events.addParagraph(node, r);
	App.Events.LocalGameOver(node);
	return node;
};
