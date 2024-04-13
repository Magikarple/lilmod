App.Events.PInvasion = class PInvasion extends App.Events.BaseEvent {
	execute(node) {
		let r = [];
		V.nextButton = "Continue";
		V.invasionVictory = 1;
		const {
			HeA, HisA,
			heA, hisA, womanA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const newSlaves = [];
		const ravineArc = V.terrain === "ravine";

		r.push(`The day that wasn't supposed to come is here. The troubled little country next door is falling apart. Last month, its stock market collapsed. Last week, its government fell. Yesterday, there was open looting in its cities. And today, a faction of disaffected citizens that blames the Free Cities for siphoning off business and causing the collapse seized weapons from unguarded army depots${(V.terrain === "marine" || V.terrain === "oceanic") ? ", armed merchant ships and private vessels, and are approaching the Free City over the water." : " and advanced towards your home."}`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`Sirens are blaring; there is a crump far above as ${V.arcologies[0].name}'s defensive systems knock down one of the first mortar rounds fired into the Free City. The lights in your office changed to a harsh emergency scheme as soon as the attack became a certainty.`);
		if (V.assistant.personality <= 0) {
			r.push(`Your personal assistant offers terse reports on the efficiency of the point defense fire.`);
		} else {
			r.push(`You get a report on the artillery battle from ${V.assistant.name}, whose avatar is showing off ${hisA} prowess at point defense.`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`${HisA} tentacle hair is spread out and forward, forming a concave shape around ${hisA} face, and ${heA}'s firing beams from ${hisA} eyes`);
					break;
				case "shemale":
					r.push(`${HeA}'s using both hands to aim ${hisA} massive erection, and is firing blasts of cum`);
					break;
				case "amazon":
					r.push(`${HeA}'s holding a hide shield and a club, which ${heA}'s using to swat`);
					break;
				case "businesswoman":
					r.push(`${HeA} looks as immaculate as ever. The stern little business${womanA} is cradling an expensive fowling piece, which ${heA}'s using to fire`);
					break;
				case "fairy":
					r.push(`${HeA} zips around in the air, getting in close to fire a barrage of little balls of light`);
					break;
				case "pregnant fairy":
					r.push(`Striking a match almost half as long as ${heA} is, ${heA} happily skips along a line of fireworks and lights them as ${heA} goes. One by one they blast off and fly into the sky`);
					break;
				case "goddess":
					r.push(`${HisA} expression is one of affronted maternal protectiveness, and ${heA}'s using outstretched hands to project beams of pure light`);
					break;
				case "hypergoddess":
					r.push(`${HisA} expression is one of affronted maternal protectiveness, and ${heA}'s using outstretched hands to project beams of pure light`);
					break;
				case "loli":
					r.push(`${HeA}'s wearing an annoyed expression and is pretending to shoot ${hisA} fingers`);
					break;
				case "preggololi":
					r.push(`${HeA}'s wearing a tired expression and is pretending to shoot ${hisA} fingers`);
					break;
				case "schoolgirl":
					r.push(`${HeA}'s wearing a fierce expression and holding a baseball bat, using it to swat`);
					break;
				case "angel":
					r.push(`${HeA} has ${hisA} wings spread to safeguard your arcology and firing beams of holy light`);
					break;
				case "cherub":
					r.push(`${HeA} is darting around, firing beams of holy light`);
					break;
				case "incubus":
					r.push(`${HeA} is carefully aiming ${hisA} cumshots`);
					break;
				case "succubus":
					r.push(`${HeA} is flying around, using ${hisA} rear to catch depictions of projectiles and moaning lewdly with each hit.`);
					break;
				case "imp":
					r.push(`${HeA} is darting around, throwing balls of darkness`);
					break;
				case "witch":
					r.push(`${HeA} is using a broom to swat`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`${HeA} has split into countless fleshy tendrils and is rapidly swinging`);
					break;
				default:
					r.push(`The symbol radiates readouts of ammunition, power, and targeting, clean lines flashing`);
			}
			if (V.assistant.appearance !== "succubus") {
				r.push(`at depictions of projectiles.`);
			}
		}
		r.push(`It's going well. Whoever's in command of the attackers sees that their fire is having no effect, and orders an advance. The mortars and other artillery systems maintain their fire, trying to occupy as many guns as possible.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`The loose militia lately organized by the arcology owners has been called out to defend the city. Its commander, seeing that the attackers have more passion than tactical skill, orders an immediate counterattack by anyone able${(V.terrain === "marine" || V.terrain === "oceanic") ? " to push the invaders landing in the dock areas back into the sea" : ""}. Technology has advanced to the point that rich militiamen who buy their own gear can form a powerful fighting force. With luck, the counterattack should shatter the enemy.`);
		App.Events.addParagraph(node, r);

		r = [];
		if (V.personalArms === 0) {
			r.push(`Since you are not well armed or armored, you stay back and oversee the defense of your own arcology.`);
		} else if (V.personalArms === 1) {
			r.push(`Since you are well armed and armored, you take part in the counterattack. Your exoskeleton mounts a smart mortar system that independently targets and eliminates enemy groups even as you lay down fire from the guns mounted on your forearms.`);
		} else {
			r.push(`Since you are well armed and armored and your drones are combat ready, you take part in the counterattack. You are preceded into combat by a wedge of your drones, which lack the intelligence to take good cover but are remorseless and highly accurate. Your exoskeleton mounts a smart mortar system that independently targets and eliminates enemy groups even as you lay down fire from the guns mounted on your forearms.`);
		}
		App.Events.addParagraph(node, r);

		r = [];
		if (V.mercenaries === 0) {
			r.push(`You are alone in contributing to the defense of your home.`);
		} else if (V.mercenaries >= 1) {
			r.push(`Your mercenaries see to the defense of ${V.arcologies[0].name}, ensuring that nothing that gets through will do truly serious damage.`);
			if (V.mercenaries > 1) {
				r.push(`There are enough of them that they can even spare a squad to accompany the counterattack. They're mostly old veterans of many bitter brush wars, and they go about the bloody business with the air of men and women who saw their first battlefield long before their hair was shot with grey.`);
			}
		}
		App.Events.addParagraph(node, r);

		r = [];
		if (V.mercenaries + V.personalArms < 2) {
			r.push(`<span class="red">The counterattack fails.</span> The enemy is eventually defeated, but only after they get mired in urban combat in the streets of the Free City. <span class="red">${V.arcologies[0].name} takes considerable damage from`);
			r.push(`${ravineArc ? 'cliffside' : 'stray'} fire, and many supplies have been lost or stolen.</span> The repairs will be extremely costly.`);
			App.Events.addParagraph(node, r);
			cashX(forceNeg(Math.trunc(V.cash * (ravineArc ? 0.8 : 0.9))), "war");
			cashX(ravineArc ? -50000 : -10000, "war");
		} else if (V.mercenaries + V.personalArms < 6) {
			r.push(`<span class="yellow">The counterattack succeeds.</span> <span class="red">${V.arcologies[0].name} takes minor damage from stray fire,</span> but the repairs are not too costly. Your participation in the counterattack that saved the Free City was noted, and <span class="green">you are acclaimed as a protector of its people.</span>`);
			App.Events.addParagraph(node, r);
			V.invasionVictory = 2;
			V.PC.skill.combat = Math.min(V.PC.skill.combat + 10, 100);
			cashX(forceNeg(Math.trunc(V.cash * 0.2)), "war");
			cashX(-5000, "war");
			repX(5000, "event");
			if (V.maximumRep < 20000) {
				r.push(`This helps <span class="green">ingrain yourself as the arcology's leader.</span>`);
				V.maximumRep += 2000;
			}
		} else {
			r.push(`<span class="green">The counterattack is a crushing success.</span> Your mercenary squad and your drones form an irresistible phalanx around you that smashes everything it touches. The enemy is put to flight, and you send your drones racing ahead to take captives. By law these are shared among the militia. There is talk that your contributions deserve more than a few wretched slaves in reward. A public subscription pays for the damage ${V.arcologies[0].name} took from stray fire, and <span class="green">you are acclaimed a hero.</span>`);
			App.Events.addParagraph(node, r);
			V.invasionVictory = 3;
			V.PC.skill.combat = Math.min(V.PC.skill.combat + 10, 100);
			repX(10000, "event");
			if (V.maximumRep < 20000) {
				r.push(`This goes a long way in <span class="green">establishing yourself as a leader.</span>`);
				V.maximumRep += 5000;
			}

			for (let i = 0; i < 3; i++) {
				const slave = GenerateNewSlave((random(0, 99) < V.seeDicks) ? "XY" : "XX", {disableDisability: 1});
				slave.origin = "$He is an enslaved prisoner of war.";
				newSlaves.push(slave);
			}
			V.menials += 5;
			addTrinket("a shot-torn flag of the failed nation whose militants attacked the Free City");

			App.Events.addResponses(node, [
				new App.Events.Result(`Sell your prisoners immediately`, sell),
				new App.Events.Result(`Give your prisoners to citizens who displayed bravery during the counterattack`, give),
				new App.Events.Result(`Enslave all of your prisoners`, enslave),
			]);
		}
		function sell() {
			newSlaves.forEach(s => cashX(slaveCost(s), "slaveTransfer"));
			return `Prisoners sold.`;
		}

		function give() {
			newSlaves.forEach(s => repX(Math.trunc(slaveCost(s) / 2), "event"));
			return `Prisoners <span class="green">given away.</span>`;
		}

		function enslave() {
			newSlaves.forEach(s => newSlave(s)); // skip New Slave Intro
			return `You simply enslave all of your prisoners yourself. These slaves will regret attacking your arcology.`;
		}
	}
};
