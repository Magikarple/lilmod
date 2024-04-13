// cSpell:ignore quoi

App.Mods.DinnerParty.Prep = function() {
	const t = new DocumentFragment();
	let r = [];

	r.push("Hosting of high society dinner parties will increase your prestige significantly and it is expected for someone of your station.");
	r.push("Since there is a lack of animal meat, human meat is served at these events to illustrate the wealth and power of the host.");
	r.push("The success of the evening is judged by how well the human offering is prepared.");
	r.push("Guests to these events are encouraged to rate the dishes and special dishes are expected.");
	r.push(`If the host receives 5 stars on all the dishes, they will receive the coveted title "${V.PC.title ? 'Master' : 'Mistress'} of The Culinary Arts".`);
	r.push(`You ask ${V.assistant.name} to show you a list of cooking instructions for those dishes.`);
	App.Events.addNode(t, r, "div");

	App.Events.addNode(t, ["Cooking Instructions and Recipes:"], "h1");

	r = [];
	r.push(App.UI.DOM.makeElement("span", "Roast Long Pig", ["bold"]));
	r.push("– Made with the meat of a human roasted on a spit. Young meat is better than old meat.");
	r.push("There should be some amount of fat to make the meat juicy, but not too much fat that makes the meat greasy.");
	r.push("Muscles affect the texture of the meat. Meat without muscles lacks texture while an excess will be tough and hard to chew. Remember that you can't eat silicone, and virgin meat is highly sought after.");
	if (V.seePreg !== 0) {
		r.push("If the human is pregnant, a veal dish can also be made from the fetus.");
	}
	App.Events.addNode(t, r, "div");

	r = [];
	r.push(App.UI.DOM.makeElement("span", "Dicky Roll", ["bold"]));
	r.push("– An erect penis made into a spring roll. For best results, harvest the penis at the moment of ejaculation.");
	r.push("The size of the penis and the amount of accumulated ejaculate all affect the quality of the dish. Too big of a dick and too thin of semen can both ruin a dish.");
	App.Events.addNode(t, r, "p");

	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Testy Meat Balls", ["bold"]), "– Testicles made into meat balls served with a sauce. Size matters."], "p");

	r = [];
	r.push(App.UI.DOM.makeElement("span", "Titty Tartare", ["bold"]));
	r.push("– Made from finely chopped breasts, mixed with onions, capers, and seasonings, and served raw.");
	r.push("Big breasts make the best quality meat for this dish. To add a hint of creamy taste, make sure the breasts are lactating. Remember that you can't eat silicone.");
	App.Events.addNode(t, r, "p");

	App.Events.addNode(t, [App.UI.DOM.makeElement("span", "Camel Toe à l'Orange", ["bold"]), "– Pussy grilled like a steak. A big clit and big labia will improve the quality of the dish."], "p");

	App.Events.addNode(t, ["Your assistant will take care of the invitations and all the arrangements; all you need to do is pick the meat."], "p");

	App.Events.addNode(t, ["Select Your Meat:"], "div", ["underline"]);

	t.append(App.UI.SlaveList.slaveSelectionList(
		s => assignmentVisible(s) && s.fuckdoll === 0,
		App.UI.SlaveList.SlaveInteract.stdInteract,
		null,
		(s) => {
			const p = getPronouns(s);
			return App.UI.DOM.passageLink(`Make ${p.him} the main course`, "Dinner Party Execution",
				() => { V.AS = s.ID; });
		}
	));
	return t;
};

App.Mods.DinnerParty.Execution = function() {
	// To MOD: insert the following code into the passage PC Name and Title
	// <<if $MOD_DinnerPartyTitleAchievement == 1>><<if $PC.title > 0>><<set $titles.push("Master of the Culinary Arts")>><<else>><<set $titles.push("Mistress of the Culinary Arts")>><</if>><</if>>
	const t = new DocumentFragment();
	const slave = getSlave(V.AS);
	const {His, He, his, he, him} = getPronouns(slave);
	App.Events.drawEventArt(t, slave);
	const appetizers = new Map([
		["Dicky Roll", slave.dick > 0],
		["Testy Meat Balls", slave.balls > 0],
		["Camel Toe steak", slave.vagina !== -1],
		["Baby Veal Ragout", slave.preg >= slave.pregData.normalBirth/4],
		["Titty Tartare", true],
		["Roast Long Pig", true],
	]);

	let r;
	let dinnerRating = 0;
	cashX(-1000, "event");

	r = [];
	r.push(`${slave.slaveName} is carried out by four slaves on a huge platter and placed on the dining table.`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${His} mind is broken. ${He} does not understand what's about happen, so there is little need to restrain ${him}.`);
	} else if (slave.devotion > 90) {
		r.push(`${He} worships you and considers it an honor to be chosen for sacrifice. There is no need to restrain ${him}.`);
	} else {
		r.push(`${He} understands ${he} is about to be slaughtered liked an animal. Tears stream down ${his} face as ${he} struggles against ${his} bindings.`);
	}

	// This needs to be rewritten. Take into account FS tastes and the fact that the player might not have a dick
	r.push(`${He} is lying on ${his} back with an apple in ${his} mouth. You lift ${his} ${hasBothLegs(slave) ? 'legs' : 'waist'} up in the air, exposing ${his} nethers.`);
	r.push(`You penetrate ${him} with your ${V.PC.dick !== 0 ? 'throbbing dick' : 'strap-on'} , fucking ${him} roughly and cumming quickly.`);
	r.push(`Your guests form a line behind you, and do the same to ${his} ass. Some of your guests take particular pleasure being rough with ${slave.slaveName}.`);
	r.push(`They enjoy making ${him} squeal like a pig, knowing they are about to enjoy ${his} flesh in a short while.`);
	r.push(`After all of your guests had a turn with the little piggy, ${his} ass is dripping with cum and a hint of blood.`);
	r.push(`It seems your guests greatly`, App.UI.DOM.makeElement("span", "enjoy", ["green"]), `themselves. You stand over ${him} with a ceremonial dagger,`);
	repX(5000, "event");

	r.push(`looking into ${his}`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`dull eyes.`);
	} else if (slave.devotion > 90) {
		r.push(`proud eyes.`);
	} else {
		r.push(`terrified eyes begging for mercy.`);
	}

	r.push(`You give the signal for your slaves to begin the ceremony. The four slaves hold ${slave.slaveName} down on the platter. A fifth slave starts to give ${him} oral sex.`);
	r.push(`${slave.slaveName} moans with the apple in ${his} mouth. When ${he} is on the edge of climax you plunge the ceremonial dagger into ${his} chest.`);
	r.push(`The pain causes ${him} to bite down on the apple deeply. Tears mixed with the juices of the apple flow down ${his} face. With a twist of your hand, you carve out ${his} beating heart.`);
	if (slave.fetish === Fetish.MINDBROKEN || slave.devotion > 90) {
		r.push(`Your guests`, App.UI.DOM.makeElement("span", "applaud", ["green"]), `your slave's willingness to die for ${his} ${getWrittenTitle(slave)}, a credit to your training.`);
	} else {
		r.push(`Your guests`, App.UI.DOM.makeElement("span", "snicker", ["red"]), `at your inability to provide a willing sacrifice.`);
	}
	repX((slave.fetish === Fetish.MINDBROKEN || slave.devotion > 90 ? 2500 : -100), "event");
	r.push(`Your slaves carry the carcass to the kitchen for cooking preparations. With all the ingredients for the special dishes harvested, the carcass is placed on a spit slowly rotating over an open fire.`);
	r.push(`You mingle with your guests while ${slave.slaveName} is slowly being cooked.`);
	App.Events.addNode(t, r, "p");

	App.Events.addNode(t, [`Your slaves begin to serve the appetizer...`], "p");
	for (const [name] of Array.from(appetizers).filter(s => s[1] === true)) {
		t.append(getDish(name));
	}

	// End of Dinner. Total of main dishes each can earn 5 stars total 25, getting 12 stars means a successful evening
	r = [];
	if (dinnerRating >= 12) { // successful evening
		r.push(`The party is in full swing. Your guests enjoy eating ${slave.slaveName} and make good use of the slaves you provided for their pleasure.`);
		r.push(`Sounds of an orgy of food drink and sex echoes through your dining hall. Your guests ate, drank and fucked their fill.`);
		r.push(`As the evening draw to a close, there isn't a single morsel of ${slave.slaveName} left to be found. Some of your slaves show signs of teeth marks on their skin. Perhaps some guests got confused about what's for eating and what's for fucking?`);
		r.push(`The evening was a`, App.UI.DOM.makeElement("span", "success.", ["green"]));
		App.Events.addNode(t, r, "div");
		repX((dinnerRating * 500), "event");

		if (dinnerRating >= 20) {
			App.Events.addNode(t, [`You have earned the 20 stars required for the title of`, App.UI.DOM.makeElement("span", `${V.PC.title > 0 ? 'Master' : 'Mistress'} of The Culinary Arts.`, ["yellow"])], "p");
			// V.MOD_DinnerPartyTitleAchievement = 1;
		}

		App.Events.addNode(t, [], "p");
		// Clean up and slaves reactions
		App.Events.addNode(t, ["When the last of your guests has stumbled drunkenly out your door, your slaves begin the daunting task of cleanup."], "div");
		for (const aliveSlave of V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.devotion < 50)) {
			let relation;
			let feeling;
			const {his3, sister3, daughter3, He3} = getPronouns(aliveSlave).appendSuffix("3");
			if (slave.mother === aliveSlave.ID || slave.father === aliveSlave.ID) {
				relation = `${daughter3}`;
				feeling = "distraught";
				aliveSlave.devotion -= (slave.mother === aliveSlave.ID ? 20 : 10);
				aliveSlave.trust -= (slave.mother === aliveSlave.ID ? 20 : 10);
			}
			if (slave.ID === aliveSlave.father || slave.ID === aliveSlave.mother) {
				relation = (slave.ID === aliveSlave.father ? "father" : "mother");
				feeling = "grieved";
				aliveSlave.devotion -= (slave.ID === aliveSlave.father ? 10 : 20);
				aliveSlave.trust -= (slave.ID === aliveSlave.father ? 10 : 20);
			}
			switch (areSisters(slave, aliveSlave)) {
				case 1:
					relation = "twin";
					feeling = "devastated";
					aliveSlave.devotion -= 30;
					aliveSlave.trust -= 30;
					break;
				case 2:
					relation = `${sister3}`;
					feeling = "grieved";
					aliveSlave.devotion -= 20;
					aliveSlave.trust -= 20;
					break;
				case 3:
					relation = `half-${sister3}`;
					feeling = "disheartened";
					aliveSlave.devotion -= 10;
					aliveSlave.trust -= 10;
					break;
			}
			if (relation) {
				App.Events.addNode(t, [`${aliveSlave.slaveName} is`, App.UI.DOM.makeElement("span", feeling, ["mediumorchid"]), `that you ate ${his3} ${relation} and also`, App.UI.DOM.makeElement("span", "fears", ["gold"]), `that ${his3} turn will be next.`], "div");
			}
		}

		for (const aliveSlave of V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.devotion >= 85)) {
			let relation;
			let feeling;
			const {his3, sister3, daughter3, He3} = getPronouns(aliveSlave).appendSuffix("3");
			if (slave.mother === aliveSlave.ID || slave.father === aliveSlave.ID) {
				relation = `${daughter3}`;
				feeling = "honored";
				aliveSlave.devotion += (slave.mother === aliveSlave.ID ? 20 : 10);
				aliveSlave.trust += (slave.mother === aliveSlave.ID ? 20 : 10);
			}
			if (slave.ID === aliveSlave.father || slave.ID === aliveSlave.mother) {
				relation = (slave.ID === aliveSlave.father ? "father" : "mother");
				feeling = "honored";
				aliveSlave.devotion += (slave.ID === aliveSlave.father ? 10 : 20);
				aliveSlave.trust += (slave.ID === aliveSlave.father ? 10 : 20);
			}
			switch (areSisters(slave, aliveSlave)) {
				case 1:
					relation = "twin";
					feeling = "honored";
					aliveSlave.devotion += 30;
					aliveSlave.trust += 30;
					break;
				case 2:
					relation = `${sister3}`;
					feeling = "honored";
					aliveSlave.devotion += 20;
					aliveSlave.trust += 20;
					break;
				case 3:
					relation = `half-${sister3}`;
					feeling = "honored";
					aliveSlave.devotion += 10;
					aliveSlave.trust += 10;
					break;
			}
			if (relation) {
				App.Events.addNode(t, [`${aliveSlave.slaveName} is your faithful slut she's`, App.UI.DOM.makeElement("span", feeling, ["hotpink"]), `that you ate ${his3} ${relation} and also`, App.UI.DOM.makeElement("span", "pray", ["mediumaquamarine"]), `that ${his3} turn be next to prove her devotion.`], "div");
			}
		}

		let aliveSlave = V.slaves.find(s => s.ID === slave.relationshipTarget && s.fetish !== Fetish.MINDBROKEN);
		if (slave.relationship !== 0 && aliveSlave) {
			const {his3} = getPronouns(aliveSlave).appendSuffix("3");
			App.Events.addNode(t, [`${aliveSlave.slaveName} is`, App.UI.DOM.makeElement("span", "distraught", ["mediumorchid"]), `that you ate ${his3} best source of comfort and companionship in a life of bondage.`], "div");
			aliveSlave.devotion -= aliveSlave.relationship * 5;
			aliveSlave.devotion -= 20;
		}

		aliveSlave = V.slaves.find(s => s.ID === slave.rivalryTarget && s.fetish !== Fetish.MINDBROKEN);
		if (slave.rivalry !== 0 && aliveSlave) {
			const {his3, He3} = getPronouns(aliveSlave).appendSuffix("3");
			App.Events.addNode(t, [`${aliveSlave.slaveName} is`, App.UI.DOM.makeElement("span", "pleased", ["hotpink"]), `that ${He3} won't have to see ${his3} rival any more.`], "div");
			aliveSlave.devotion += aliveSlave.rivalry * 5;
		}

		r = [];
		r.push(`The slaves who do not already worship you`, App.UI.DOM.makeElement("span", "resent", ["mediumorchid"]), "your monstrous appetite and", App.UI.DOM.makeElement("span", "fear", ["mediumaquamarine"]), "a similar fate awaits them.");
		r.push(`The fat slaves are`, App.UI.DOM.makeElement("span", "worried", ["gold"]), "they are being fattened for consumption.");
		r.push(`But your worshipful chattel are`, App.UI.DOM.makeElement("span", "pleased", ["hotpink"]), "that you could find a use for them even in death and", App.UI.DOM.makeElement("span", "hope", ["mediumaquamarine"]), "a similar fate awaits them.");
		App.Events.addNode(t, r, "p");
		for (const aliveSlave of V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.devotion < 50)) {
			aliveSlave.devotion -= 5;
			aliveSlave.trust -= (aliveSlave.diet === "fattening" || aliveSlave.weight > 10 ? 10 : 5);
		}

		for (const aliveSlave of V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.devotion >= 85)) {
			aliveSlave.devotion += 5;
			aliveSlave.trust += 5;
		}

		if (isShelterSlave(slave)) {
			V.shelterAbuse++;
		}
		removeSlave(slave);
		/*
		if (generateEnemies === 1) {
			V.MOD_enemyList = V.MOD_enemyList || [];
			for (let i = 0; i < 6; i++) {
					const pram = {minAge: 38, maxAge: 44, ageOverridesPedoMode: 1, disableDisability: 1};
					slave = GenerateNewSlave(V.seeDicks === 0 ? "XX" : "XY", pram);
					slave.devotion = -20;
					slave.trust = -2;
					slave.oldDevotion = -20;
					slave.origin = "$He was once an arcology owner like yourself, who made the mistake of insulting you.";
					slave.career = "a slave";
					slave.prestige = 3;
					slave.prestigeDesc = "You stormed $his arcology, killed $his guards, and enslaved $him in revenge for insulting you at a dinner party.";
					setHealth(_slave, 20, random(5, 15), 0, 0, 0);
					slave.dick = 5;
					slave.balls = 5;
					slave.intelligenceImplant = 1;
					V.MOD_enemy = {leader: 0, numSlave: 0, slaveTotalHP: 0, numDrone: 0, droneTotalHP: 0, numMerc: 0, mercTotalHP: 0, weekCreated: 0, enemyIndex: -1, hostility: 0};
					V.MOD_enemy.leader = _slave;
					V.MOD_enemy.weekCreated = V.week;
					V.MOD_enemy.numSlave = random(Math.trunc(V.slaves.length * 0.7), Math.trunc(V.slaves.length * 1.3));
					V.MOD_enemy.numDrone = random(25, 75);
					V.MOD_enemy.numMerc = random(10, 60);
					V.MOD_enemyList.push(V.MOD_enemy);
			}
		}
		*/
	} else { // failed evening
		r.push(`With most of your dishes earning a poor rating, your guests are`, App.UI.DOM.makeElement("span", "dissatisfied.", ["red"]));
		r.push(`They take out their frustrations on your slaves. Your slaves are being fucked roughly and abused. Cries of pain and pleads of mercy echoes through your dining hall. You decide to allow the abuse to continue as you do not want to antagonize your guests further. You watch with a forced smile as your favorite slaves are being slapped, whipped, choked and burned with cigarettes.`);
		r.push(`Some of your unlucky slaves had their health`, App.UI.DOM.makeElement("span", "reduced.", ["red"]));
		r.push(`All of your slaves`, App.UI.DOM.makeElement("span", "respect you less", ["mediumorchid"]), "and", App.UI.DOM.makeElement("span", "fear", ["gold"]), "you more as you place your reputation above their wellbeing.");
		App.Events.addNode(t, r, "p");

		repX(forceNeg(dinnerRating * 100), "event");
		for (const aliveSlave of V.slaves) {
			if (random(0, 1) > 0) {
				healthDamage(aliveSlave, 10);
			}
			aliveSlave.devotion -= 5;
			aliveSlave.trust -= 5;
		}

		if (V.HeadGirlID !== 0 && slave.assignment !== "be your Head Girl") {
			const {His2, He2, his2, he2, him2, girl2, himself2} = getPronouns(S.HeadGirl).appendSuffix("2");
			r = [];
			r.push(`You notice a group of guests corner your Head Girl. The group consists of some very powerful people. Most of them arcology owners themselves, some of them have more powerful arcologies than yours.`);
			r.push(`${S.HeadGirl.slaveName} tries to slip away, but ${he2} was grabbed at the neck by the leader of the pack. He pulls ${him2} down to the ground forcefully.`);
			r.push(`${S.HeadGirl.slaveName} knows better than to resist, ${he2} is still a slave despite ${his2} position as your Head Girl. A slave does not raise their hand against a Master, even one that's not ${his2} own.`);
			r.push(`The leader rips off ${his2} dress, exposing ${his2} bare chest. Your Head Girl is frozen in terror when ${he2} is lifted onto the hastily cleared dining hall table by several of the men. ${His2} eyes desperately search for you.`);
			r.push(`You are the only one who can stop this. All that's required is a single word from you.`);
			r.push(`${S.HeadGirl.slaveName}'s eyes meets yours; the look of relief on ${his2} face is soon replaced by the sad realization that you will not intervene.`);
			r.push(`${His2} mouth just barely forms the word "${getWrittenTitle(S.HeadGirl)}" as you shake your head, so ${He2} closes ${his2} mouth and resigns ${himself2} to ${his2} fate.`);
			App.Events.addNode(t, r, "div");

			r = [];
			r.push(`Your Head Girl is placed across the corner of the dining hall table face-down, ${his2} arm${hasBothArms(S.HeadGirl) ? 's' : ''} and leg${hasBothLegs(S.HeadGirl) ? 's' : ''} held down by four men. ${He2} finds a hand on ${his2} ass, groping roughly, then another hand on the other cheek, roughly parting ${his2} globes to get better access.`);
			if (S.HeadGirl.vagina >= 0 && canDoVaginal(S.HeadGirl)) {
				r.push(`A finger traces along ${his2} slit, finding the source of that moisture and pressing its way in. Another finger was added and the hand began to finger fuck ${him2} roughly. After a few seconds a third finger was added and then a fourth, stretching ${his2} pussy.`);
				r.push(`${S.HeadGirl.slaveName} screams loudly as the entire hand was shoved up ${his2} cunt without warning.`);
				r.push(`${his2} pussy has`, App.UI.DOM.makeElement("span", "loosened", ["lime"]));
				S.HeadGirl.vagina++;
			}
			r.push(`One man moves to the head of ${S.HeadGirl.slaveName} and shoved his cock into ${his2} mouth, fucking ${his2} throat roughly. He buries his cock deep down ${his2} throat all the way to his balls.`);
			r.push(`He places both hands around ${his2} neck and squeezes with every stroke. Your Head Girl's face turns red and ${He2} gags uncontrollably. ${his2} eyes roll back as another man shoves his hard cock in ${his2} asshole, sodomizing ${him2} with no mercy.`);
			r.push(`As your Head Girl makes squeaking noises in pain, several guests pick up forks and jab it at ${his2} butt and ${his2} back, chanting "More meat... More meat..." and "Squeal, piggy, squeal." You slump over your chair at the head of the table. Gulping down your drink, you suppress the urge to order your security drones to open fire on those men.`);
			r.push(`You know they would never dare to harm your Head Girl, not permanently, at least not anything your remote surgery couldn't fix. It's not as if you haven't done worse to your slaves, but the message is clear; the attack on your Head Girl was meant as disrespect and an insult towards you. Raping your Head Girl is like raping you.`);
			r.push(`You stare at the group of men gang raping your Head Girl at the end of your own dining table, burning their`, App.UI.DOM.makeElement("span", "names and their faces", ["yellow"]), `into your memory as they take turns fucking ${him2}. They make use of ${his2} every hole. When they are done, ${He2} is left on the floor, battered and bruised, covered in cum and blood from superficial wounds.`);
			r.push(`The leader of the pack pulls out his half erect cock and`);
			if (V.seePee === 1) {
				r.push(`pees on your Head Girl as a final insult towards you. The poor ${girl2} is so spent that ${He2} doesn't even flinch at the urine hitting ${his2} face. He finishes showering your Head Girl, then`);
			} else {
				r.push(`ejaculates all over your Head Girl's face, clearly and intentionally aiming for ${his2} eyes. The poor ${girl2} is so spent that ${He2} doesn't even flinch from this final insult towards you. When he's done, he`);
			}
			r.push(`turns towards you and says smilingly:`);
			App.Events.addNode(t, r, "div");

			r = [];
			r.push(App.UI.DOM.makeElement("span", `"I must congratulate you ${V.PC.title > 0 ? 'sir' : 'madam'},`, ["note"]));
			r.push(App.UI.DOM.makeElement("span", `you trained a fine obedient slave. ${He2} certainly understands ${his2} position well."`, ['note']));
			r.push(`You grit your teeth faking a smile, mentally repeating the old adage:`, App.UI.DOM.makeElement("span", "revenge is dish best served cold.", ["yellow"]), `You have made some enemies tonight; you begin to plan a military conquest of them all. You will enjoy storming their arcologies and making them pay for this insult.`);
			App.Events.addNode(t, r, "p");

			App.Events.addNode(t, [`The abuse your Head Girl suffers had`, App.UI.DOM.makeElement("span", `decreased ${his2} health`, ["health", "dec"]), `${his2} and ${He2} is`, App.UI.DOM.makeElement("span", "less devoted", ["mediumorchid"]), `to you, as you allowed ${him2} to be abused.`], "div");
			healthDamage(S.HeadGirl, 20);
			S.HeadGirl.devotion -= 20;
		}

		App.Events.addNode(t, [], "p");
		// Clean up and slaves reactions
		App.Events.addNode(t, ["When the last of your guests has stumbled drunkenly out your door, your slaves begin the daunting task of cleanup."], "div");
		for (const aliveSlave of V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.devotion < 50)) {
			let relation;
			let feeling;
			const {his3, sister3, daughter3, He3} = getPronouns(aliveSlave).appendSuffix("3");
			if (slave.mother === aliveSlave.ID || slave.father === aliveSlave.ID) {
				relation = `${daughter3}`;
				feeling = "distraught";
				aliveSlave.devotion -= (slave.mother === aliveSlave.ID ? 20 : 10);
				aliveSlave.trust -= (slave.mother === aliveSlave.ID ? 20 : 10);
			}
			if (slave.ID === aliveSlave.father || slave.ID === aliveSlave.mother) {
				relation = (slave.ID === aliveSlave.father ? "father" : "mother");
				feeling = "grieved";
				aliveSlave.devotion -= (slave.ID === aliveSlave.father ? 10 : 20);
				aliveSlave.trust -= (slave.ID === aliveSlave.father ? 10 : 20);
			}
			switch (areSisters(slave, aliveSlave)) {
				case 1:
					relation = "twin";
					feeling = "devastated";
					aliveSlave.devotion -= 30;
					aliveSlave.trust -= 30;
					break;
				case 2:
					relation = `${sister3}`;
					feeling = "grieved";
					aliveSlave.devotion -= 20;
					aliveSlave.trust -= 20;
					break;
				case 3:
					relation = `half-${sister3}`;
					feeling = "disheartened";
					aliveSlave.devotion -= 10;
					aliveSlave.trust -= 10;
					break;
			}
			if (relation) {
				App.Events.addNode(t, [`${aliveSlave.slaveName} is`, App.UI.DOM.makeElement("span", feeling, ["mediumorchid"]), `that you ate ${his3} ${relation} and also`, App.UI.DOM.makeElement("span", "fears", ["gold"]), `that ${his3} turn will be next.`], "div");
			}
		}

		for (const aliveSlave of V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.devotion >= 85)) {
			let relation;
			let feeling;
			const {his3, sister3, daughter3, He3} = getPronouns(aliveSlave).appendSuffix("3");
			if (slave.mother === aliveSlave.ID || slave.father === aliveSlave.ID) {
				relation = `${daughter3}`;
				feeling = "honored";
				aliveSlave.devotion += (slave.mother === aliveSlave.ID ? 20 : 10);
				aliveSlave.trust += (slave.mother === aliveSlave.ID ? 20 : 10);
			}
			if (slave.ID === aliveSlave.father || slave.ID === aliveSlave.mother) {
				relation = (slave.ID === aliveSlave.father ? "father" : "mother");
				feeling = "honored";
				aliveSlave.devotion += (slave.ID === aliveSlave.father ? 10 : 20);
				aliveSlave.trust += (slave.ID === aliveSlave.father ? 10 : 20);
			}
			switch (areSisters(slave, aliveSlave)) {
				case 1:
					relation = "twin";
					feeling = "honored";
					aliveSlave.devotion += 30;
					aliveSlave.trust += 30;
					break;
				case 2:
					relation = `${sister3}`;
					feeling = "honored";
					aliveSlave.devotion += 20;
					aliveSlave.trust += 20;
					break;
				case 3:
					relation = `half-${sister3}`;
					feeling = "honored";
					aliveSlave.devotion += 10;
					aliveSlave.trust += 10;
					break;
			}
			if (relation) {
				App.Events.addNode(t, [`${aliveSlave.slaveName} is your faithful slut she's`, App.UI.DOM.makeElement("span", feeling, ["hotpink"]), `that you ate ${his3} ${relation} and also`, App.UI.DOM.makeElement("span", "pray", ["mediumaquamarine"]), `that ${his3} turn be next to prove her devotion.`], "div");
			}
		}

		let aliveSlave = V.slaves.find(s => s.ID === slave.relationshipTarget && s.fetish !== Fetish.MINDBROKEN);
		if (slave.relationship !== 0 && aliveSlave) {
			const {his3} = getPronouns(aliveSlave).appendSuffix("3");
			App.Events.addNode(t, [`${aliveSlave.slaveName} is`, App.UI.DOM.makeElement("span", "distraught", ["mediumorchid"]), `that you ate ${his3} best source of comfort and companionship in a life of bondage.`], "div");
			aliveSlave.devotion -= aliveSlave.relationship * 5;
			aliveSlave.devotion -= 20;
		}

		aliveSlave = V.slaves.find(s => s.ID === slave.rivalryTarget && s.fetish !== Fetish.MINDBROKEN);
		if (slave.rivalry !== 0 && aliveSlave) {
			const {his3, He3} = getPronouns(aliveSlave).appendSuffix("3");
			App.Events.addNode(t, [`${aliveSlave.slaveName} is`, App.UI.DOM.makeElement("span", "pleased", ["hotpink"]), `that ${He3} won't have to see ${his3} rival any more.`], "div");
			aliveSlave.devotion += aliveSlave.rivalry * 5;
		}

		r = [];
		r.push(`The slaves who do not already worship you`, App.UI.DOM.makeElement("span", "resent", ["mediumorchid"]), "your monstrous appetite and", App.UI.DOM.makeElement("span", "fear", ["mediumaquamarine"]), "a similar fate awaits them.");
		r.push(`The fat slaves are`, App.UI.DOM.makeElement("span", "worried", ["gold"]), "they are being fattened for consumption.");
		r.push(`But your worshipful chattel are`, App.UI.DOM.makeElement("span", "pleased", ["hotpink"]), "that you could find a use for them even in death and", App.UI.DOM.makeElement("span", "hope", ["mediumaquamarine"]), "a similar fate awaits them.");
		App.Events.addNode(t, r, "p");
		for (const aliveSlave of V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.devotion < 50)) {
			aliveSlave.devotion -= 5;
			aliveSlave.trust -= (aliveSlave.diet === "fattening" || aliveSlave.weight > 10 ? 10 : 5);
		}

		for (const aliveSlave of V.slaves.filter(s => s.fetish !== Fetish.MINDBROKEN && s.devotion >= 85)) {
			aliveSlave.devotion += 5;
			aliveSlave.trust += 5;
		}

		if (isShelterSlave(slave)) {
			V.shelterAbuse++;
		}
		removeSlave(slave);
		/*
		if (generateEnemies === 1) {
			V.MOD_enemyList = V.MOD_enemyList || [];
			for (let i = 0; i < 6; i++) {
					const pram = {minAge: 38, maxAge: 44, ageOverridesPedoMode: 1, disableDisability: 1};
					slave = GenerateNewSlave(V.seeDicks === 0 ? "XX" : "XY", pram);
					slave.devotion = -20;
					slave.trust = -2;
					slave.oldDevotion = -20;
					slave.origin = "$He was once an arcology owner like yourself, who made the mistake of insulting you.";
					slave.career = "a slave";
					slave.prestige = 3;
					slave.prestigeDesc = "You stormed $his arcology, killed $his guards, and enslaved $him in revenge for insulting you at a dinner party.";
					setHealth(_slave, 20, random(5, 15), 0, 0, 0);
					slave.dick = 5;
					slave.balls = 5;
					slave.intelligenceImplant = 1;
					V.MOD_enemy = {leader: 0, numSlave: 0, slaveTotalHP: 0, numDrone: 0, droneTotalHP: 0, numMerc: 0, mercTotalHP: 0, weekCreated: 0, enemyIndex: -1, hostility: 0};
					V.MOD_enemy.leader = _slave;
					V.MOD_enemy.weekCreated = V.week;
					V.MOD_enemy.numSlave = random(Math.trunc(V.slaves.length * 0.7), Math.trunc(V.slaves.length * 1.3));
					V.MOD_enemy.numDrone = random(25, 75);
					V.MOD_enemy.numMerc = random(10, 60);
					V.MOD_enemyList.push(V.MOD_enemy);
			}
		}
		*/
	}

	return t;
	/**
	 * @param {string} name title of dish
	 */
	function getDish(name) {
		const t = new DocumentFragment();
		let r = [];
		let dishRating = 5;
		let override;

		if (name !== "Roast Long Pig") {
			r.push(`The next course is ${name === "Baby Veal Ragout" ? `a bonus dish` : ``}`);
		} else {
			r.push('Your slaves begin to serve the main course,');
		}
		r.push(App.UI.DOM.makeElement("span", `${name}:`, ["bold", "note"]));

		switch (name) {
			case "Dicky Roll":
				dishRating = slave.dick; // the dick is numbered from 0 to 5 - this isn't a problem at all
				r.push(`${slave.slaveName}'s penis is wrapped in a spring roll wrapper, deep fried and placed on a plate. Green lettuce decorates the plate along with a side of dipping sauce.`);
				if (slave.dick >= 5) {
					r.push(`The massive length and girth of the penis impressed your guests greatly and have them all salivating at the sight of the dish.`);
				} else if (slave.dick >= 4) {
					r.push(`The large size of the penis impressed your guests and have them salivating at the sight of the dish.`);
				} else if (slave.dick >= 3) {
					r.push(`The regular size of the penis did not impress your guests much. Nevertheless they are looking forward to tasting the delicacy.`);
				} else if (slave.dick >= 2) {
					r.push(`The small size of the penis had your guests disappointed at the size of the dish.`);
				} else {
					r.push(`The tiny size of the penis had your guests laughing at the disappointing dish.`);
				}
				if (slave.balls >= 5) {
					r.push(`As you bite into the dick your palate is treated with a rich salty taste at the center of your dicky roll. You smile as you know this is the taste of cum trapped in the shaft of the penis at the moment of death. Your guests also greatly enjoy this exotic taste.`);
				} else if (slave.balls >= 4) {
					r.push(`As you bite into the dick your palate is treated with a distinct salty taste at the center of your dicky roll. You smile as you know this is the taste of cum trapped in the shaft of the penis at the moment of death. Your guests also enjoy this exotic taste.`);
					dishRating -= 0.5;
				} else if (slave.balls >= 3) {
					r.push(`As you bite into the dick your palate is treated with a faint salty taste at the center of your dicky roll. You smile as you know this is the taste of cum trapped in the shaft of the penis at the moment of death. Your guests also enjoy this exotic taste.`);
					dishRating--;
				} else if (slave.balls >= 2) {
					r.push(`As you bite into the dick your palate is treated with a hint of salty taste at the center of your dicky roll. You smile as you know this is the taste of cum trapped in the shaft of the penis at the moment of death. Your guests also enjoy this exotic taste.`);
					dishRating -= 1.5;
				} else if (slave.balls >= 1) {
					r.push(`As you bite into the dick your palate is treated with barely a hint of salty taste at the center of your dicky roll. You smile as you know this is the taste of cum trapped in the shaft of the penis at the moment of death. Your guests also enjoy this exotic taste.`);
					dishRating -= 2;
				} else {
					r.push(`As you bite into the dick you feel as if this dish is missing something. A certain 'je ne sais quoi'.`);
					dishRating -= 2.5;
				}
				break;
			case "Testy Meat Balls":
				dishRating = slave.balls; // I give up. Each and every dish will need a rework and score redesign. Definitely some crazy potential with FSs to do some interesting things.
				App.Events.addNode(t, [`${slave.slaveName}'s balls are coated in olive oil and sautéed.`]);
				break;
			case "Camel Toe steak":
				r.push(`${slave.slaveName}'s pussy is grilled like a steak.`);
				if (slave.clit >= 2) { // These would all need to take into account clitoral hoods
					r.push(`${His} huge clit sticking out of the camel toe is the cherry on top for this dish.`);
				} else if (slave.clit >= 1) {
					r.push(`${His} large clit sticking out of the camel toe makes this dish aesthetically pleasing.`);
					dishRating -= 0.5;
				} else if (slave.dick >= 5) {
					r.push(`${His} large cock head cut in two and positioned on each side of the camel toe makes it the cherry on top for this dish.`);
				} else if (slave.dick < 5) {
					r.push(`${His} tiny cock head cut in two and positioned on each side of the camel toe makes this dish aesthetically pleasing.`);
					dishRating -= 0.5;
				} else {
					r.push(`${His} small clit is hiding inside of the camel toe. It does not add to the scheme of this dish.`);
					dishRating -= 2;
				}
				if (slave.labia >= 2) {
					r.push(`${His} huge labia taste delicious.`);
				} else if (slave.labia >= 1) {
					r.push(`${His} large labia is tasty.`);
					dishRating -= 0.5;
				} else {
					r.push(`${His} small labia leave you and your guests wanting more.`);
					dishRating -= 2;
				}
				break;
			case "Baby Veal Ragout":
				override = true;
				r.push(`${slave.slaveName} was pregnant so ${he} has a special bonus dish to offer your guests. ${His} fetus is boiled in a vinegar stock and stewed in butter.`);
				if (slave.preg >= slave.pregData.normalBirth/1.6) {
					r.push(`Your guests are pleased with the huge size of the dish.`);
				} else if (slave.preg >= slave.pregData.normalBirth/2) {
					r.push(`Your guests are pleased with the large size of the dish.`);
					dishRating--;
				} else if (slave.preg >= slave.pregData.normalBirth/2.66) {
					r.push(`Your guests are satisfied with the decent size of the dish.`);
					dishRating -= 2;
				} else {
					r.push(`Your guests are a little disappointed with the small size of the dish.`);
					dishRating -= 3;
				}
				break;
			case "Titty Tartare":
				r.push(`${slave.slaveName}'s tits are chopped into tiny cube size pieces mixed with onions, capers and seasoning. It is served raw with an egg yolk on top and a side of French fries.`);
				if (slave.boobsImplant > 0) {
					r.push(`As you and your guests take your first bite of the tartare you immediately spit out the meat. Who would have thought silicone is not edible.`);
					r.push(`You have neglected to remove ${his} breast implants before serving the titty tartare. The dish is now ruined. Your guests are`, App.UI.DOM.makeElement("span", "displeased", ["red"]), `by your lack of attention to detail.`);
					dishRating = 0;
					repX(-500, "event");
				} else {
					if (slave.boobs >= 4800) {
						r.push(`${His} monstrous boobs are very tender and juicy. There are also enough servings to keep all of your guests satisfied.`);
					} else if (slave.boobs >= 2400) {
						r.push(`${His} massive boobs are tender and juicy. Your guests are satisfied with the generous portions.`);
						dishRating--;
					} else if (slave.boobs >= 1600) {
						r.push(`${His} huge boobs are tender. Your guests are satisfied with the portions.`);
						dishRating -= 2;
					} else if (slave.boobs >= 800) {
						r.push(`${His} big boobs are tender and tasty. Your guests are satisfied with the portions, but wished for more.`);
						dishRating -= 3;
					} else if (slave.boobs >= 500) {
						r.push(`${His} small boobs are tender. Your guests are disappointed with their portions.`);
						dishRating -= 4;
					} else {
						r.push(`${His} non-existent boobs leaves your guests disappointed.`);
						dishRating -= 5;
					}
					if (slave.lactation >= 2) {
						r.push(`As you and your guests enjoy your tartare, suddenly you hear a loud crunch coming from the guest sitting right next to you.`);
						r.push(`You see blood spewing from his mouth as he spits out his chipped tooth along with a lactation implant.`);
						r.push(`You apologize profusely and pay the man ${num(10000)} as compensation.`);
						r.push(`The rest of your guests are`, App.UI.DOM.makeElement("span", "not happy", ["red"]), `that you serve them drugged meat.`);
						dishRating = 0;
						repX(-1000, "event");
						cashX(-10000, "event");
					} else if (slave.lactation > 0) {
						r.push(`You detect a hint of creamy taste to your tartare. The clearly lactating breast earns the dish an extra star.`);
						dishRating++;
					}
				}
				break;
			case "Roast Long Pig":
				r.push(`${slave.slaveName} is carried out with ${his} carcass roasted to a perfect golden brown color. ${He} is coated with BBQ sauce and dripping in ${his} own juices. The apple is still in ${his} mouth.`);
				if (slave.vagina === 0) {
					r.push(`${slave.slaveName} was a virgin. Eating of maiden meat is thought to be highly prestigious. It earns you an extra star for this dish.`);
					dishRating++;
				}
				if (slave.physicalAge >= 60) {
					r.push(`${slave.slaveName} was old. ${His} meat is tough and leathery.`);
					dishRating -= 2;
				} else if (slave.physicalAge >= 40) {
					r.push(`${slave.slaveName} was middle aged. ${His} meat is stringy.`);
					dishRating--;
				} else if (slave.physicalAge >= 20) {
					r.push(`${slave.slaveName} was young. ${His} meat is tender.`);
				} else {
					r.push(`${slave.slaveName} was very young. ${His} meat is very tender.`);
					dishRating++;
				}
				if (slave.weight > 95) {
					r.push(`${slave.slaveName} was too fat. It made the dish taste very greasy.`);
					dishRating -= 2;
				} else if (slave.weight > 30) {
					r.push(`${slave.slaveName} was fat. It made the dish taste greasy.`);
					dishRating--;
				} else if (slave.weight > 10) {
					r.push(`${slave.slaveName} was juicy and yet not greasy. ${He} is a prime piece of meat.`);
					dishRating += 0.5;
				} else if (slave.weight >= -10) {
					r.push(`${slave.slaveName} was lean. ${He} is a good piece of meat.`);
				} else if (slave.weight >= -30) {
					r.push(`${slave.slaveName} was thin. ${He} does not provide enough meat for you and your guests.`);
					dishRating -= 0.5;
				} else if (slave.weight >= -95) {
					r.push(`${slave.slaveName} was too skinny. ${He} has very little meat on the bones.`);
					dishRating--;
				} else {
					r.push(`${slave.slaveName} was emaciated. ${He} has only bones and skin.`);
					dishRating -= 2;
				}
				if (slave.muscles > 95) {
					r.push(`${slave.slaveName} has too much muscle and sinew. ${His} meat is too chewy.`);
					dishRating -= 0.5;
				} else if (slave.muscles > 50) {
					r.push(`${slave.slaveName} has strong muscles. It gives ${his} meat a very tasty texture.`);
					dishRating += 0.5;
				} else if (slave.muscles > 5) {
					r.push(`${slave.slaveName} has toned muscles. It gives ${his} meat a tasty texture.`);
				} else {
					r.push(`${slave.slaveName} has no muscles. It gives ${his} meat a plain texture.`);
					dishRating--;
				}
				if (slave.lipsImplant > 0) {
					r.push(`All of sudden one of your guests' face turns red, then purple. It is clear he is choking on something.`);
					r.push(`You leap out of your seat, rush over to him and start the Heimlich maneuver.`);
					r.push(`On your third thrust into his abdominal, a piece of lip implants flies out of his mouth and hits another guest square in the face.`);
					r.push(`You apologize profusely for your carelessness in selecting the meat. The rest of your guests had a great laugh at your`, App.UI.DOM.makeElement("span", "expense.", ["red"]));
					dishRating -= 5;
					repX(-500, "event");
				} else if (slave.buttImplant > 0) {
					r.push(`All of sudden one of your guests clutches his chest. His face turns pale as a ghost, foaming at the mouth falls over onto the table.`);
					r.push(`You rush over to him, it is clear he is not breathing. You don't know what's wrong with him.`);
					r.push(`It could not have been poison, since any toxins in the food would have been detected by your personal assistant. You order your slave to rush the man to the nearest emergency clinic.`);
					r.push(`You were informed later that he had died from ingesting a silicone butt implant. Your reputation`, App.UI.DOM.makeElement("span", "suffers", ["red"]), `greatly due to this incident.`);
					dishRating -= 10;
					repX(-5000, "event");
				}
				break;
		}
		App.Events.addNode(t, r, "div");

		dishRating = Math.clamp(dishRating, 0, 5);
		dinnerRating += dishRating;

		r = [];
		r.push(`This dish earned a score of ${dishRating} out of 5 stars. Your reputation has`);
		r.push(App.UI.DOM.makeElement("span", (dishRating >= 2 || override ? "increased." : "decreased."), [dishRating >= 2 || override ? "green" : "red"]));
		if (dishRating >= 2 || override) {
			repX(dishRating * 100, "event");
		} else {
			repX(forceNeg(dishRating >= 0 ? (dishRating * 20) : 100), "event");
		}
		App.Events.addNode(t, r, "div");

		return App.UI.DOM.makeElement("p", t);
	}
};
