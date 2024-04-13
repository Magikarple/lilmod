// cSpell:ignore pcaj

App.Events.PCoupAttempt = class PCoupAttempt extends App.Events.BaseEvent {
	execute(node) {
		let r = [];
		const {
			He,
			him
		} = getPronouns(V.traitor ? V.traitor : {pronoun: App.Data.Pronouns.Kind.neutral});
		let pcaj;
		let traitorDeath;

		V.nextButton = "Continue";
		V.daughtersVictory = 1;
		const secExpUnits = App.Mods.SecExp.battle.activeUnits();

		if (V.traitor !== 0) {
			const weeks = V.traitorWeeks - 1;
			const pregWeeks = V.traitorWeeks - 1;
			V.traitorWeeks = 0;

			WombProgress(V.traitor, pregWeeks, pregWeeks); /* In all cases should be done */
			WombUpdatePregVars(V.traitor);
			if (WombBirthReady(V.traitor, V.traitor.pregData.normalBirth) > 0) { /* normal birth case, partial birthers not supported*/
				V.traitor.preg = -1;
				V.traitor.counter.birthsTotal += WombBirthReady(V.traitor, V.traitor.pregData.normalBirth);
				WombFlush(V.traitor);
			} else { /* still pregnant slave */
				V.traitor.preg = WombMaxPreg(V.traitor); /* most ready fetus is a base*/
				V.traitor.pregWeek = WombMaxPreg(V.traitor); /* most ready fetus is a base*/
			}
			SetBellySize(V.traitor); /* In any case it's useful to do.*/

			if (V.traitor.bald !== 1) {
				if (V.traitor.hLength < 150) {
					V.traitor.hLength += weeks;
				}
			}
			ageSlaveWeeks(V.traitor, weeks);
		}
		const doubleAgent = ["agent", "trapper"].includes(V.traitorType) ? 1 : 0;

		r.push(`You are awakened in the middle of the night by a jolt that shakes the entire arcology, accompanied by a distant boom. It is followed by the wail of the arcology's alarm systems, and then finally by a faint crackle that grows to a constant chatter of gunfire. Main power goes out, and you claw your way in the darkness to the video feeds, running on emergency backup. The Daughters of Liberty have more sympathizers in the arcology than even you suspected, and they're well armed and have the element of surprise.`);
		if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
			r.push(`${V.arcologies[0].name}, however, is home to a society that cannot be surprised, for each and every one of its citizens is armed and trained for instant contribution to the defense of Rome. Even as you do your best to reestablish control, you hear a thunderous, ubiquitous roar from all around you. Your citizens are already getting into the fight.`);
		}

		if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
			r.push(`${V.arcologies[0].name}, however, is guarded by your fanatically loyal and expertly-trained Imperial Knights, many of whom practically chomp at the bit in their heavy battle armor for just such an opportunity. Before you have even shouted your first command, you can hear the sound of ferocious battle. The Knights are not one to be surprised.`);
		}

		if (V.arcologies[0].FSAntebellumRevivalistLaw2 === 1) {
			r.push(`${V.arcologies[0].name}, however, is home to a society with more than one hundred firearms to each citizen, and more than enough of them have been itching for a time just like this. Before you have time to issue your first order, the citizens' militias have already mobilized and flooded the streets, eager for blood.`);
		}

		App.Events.addParagraph(node, r);
		r = [];

		if (V.hackerSupport === 0) {
			r.push(`Many of the arcology systems are not responding properly. It seems the Daughters' penetration of your systems is thorough. Your security systems are still reasonably functional, but the rebels are aided by partial control of things like lights and door locks.`);
		} else {
			r.push(`It seems your cyber-warfare ally of convenience is having an effect. Arcology systems are working perfectly unless the rebels disable them physically. Their fighters are impeded by uncooperative lights, resistant locking systems, and even ${V.assistant.name}'s selective deployment of firefighting systems to obscure visibility.`);
		}

		App.Events.addParagraph(node, r);
		r = [];

		if (V.personalArms === 0) {
			r.push(`Since you are not well armed or armored, you stay in your penthouse and do what you can to coordinate the defense.`);
		} else if (V.personalArms === 1) {
			r.push(`The Daughters are appalled to encounter you striding thunderously out of your penthouse, fully armored. Your exoskeleton mounts an acoustic riot control system that even allows you to take prisoners.`);
		} else {
			r.push(`The Daughters are appalled to encounter you striding thunderously out of your penthouse, fully armored. Your exoskeleton mounts an acoustic riot control system that even allows you to take prisoners.`);
			if (V.arcologyUpgrade.drones > 0) {
				r.push(`Meanwhile, your security drones are busily rearming themselves, and soon the dominant sound in the arcology is the ripping noise made by their small-caliber guns. A few of them retain their nonlethal weapons and swoop in to subdue when possible.`);
			}
		}

		if (V.traitor !== 0 && (V.traitorType === "trapper" || V.traitorType === "agent")) {
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`Every now and then you catch sight of ${V.traitor.slaveName} seeding disorder through the ranks.`);
			if (random(1, 100) > V.traitor.intelligence + V.traitor.intelligenceImplant) {
				traitorDeath = 1;
			}
		}

		App.Events.addParagraph(node, r);
		r = [];

		if (secExpUnits === 0 && V.mercenaries === 0 && V.arcologies[0].FSRomanRevivalistLaw === 0 && V.arcologies[0].FSNeoImperialistLaw1 === 0 && V.arcologies[0].FSAntebellumRevivalistLaw2 === 0) {
			r.push(`You are alone in contributing to the defense of your home.`);
		} else if (V.mercenaries === 1) {
			r.push(`Your mercenaries desperately defend their barracks but manage little else.`);
		} else if (V.mercenaries === 3) {
			r.push(`Your mercenaries manage to get into action quickly enough, but are bogged down in the streets. They are obliged to fight a confused battle to establish a perimeter. Only once it's stable are they able to push out.`);
		} else {
			r.push(`Your ${V.mercenariesTitle} spread out into the arcology, as invincible as Medieval men-at-arms matched against peasants. They are so dominant over the Daughters that they are able to take many prisoners. Their armor often permits them to approach armed, resisting rebels and disarm them manually.`);
		}
		if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
			r.push(`As the crisis is reached and passed, lower-class citizens armed as Hastati, with lighter weapons and personal armor, begin to sweep the arcology to ensure no one escapes. Middle-class citizens, meanwhile, heavily armored as Principes, methodically grind out pockets of armed resistance. The toughest rebel groups are left to the exoskeleton-armored Triarii.`);
		}
		if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
			r.push(`As the rebels reel back from the shockingly organized initial resistance of your always-ready Imperial Knights and their lightly-armed but fanatically determined guardsmen, it becomes increasingly clear just how well prepared your arcology was for this exact event. Even as fires rage through the streets of your home, Knights clamber forward through the rebel lines practically undisturbed by the fire that clatters off their enormously thick plate, laying down explosive volleys with enormous heavy guns and launching themselves into outright melee with their holographic weapons.`);
		}
		if (V.arcologies[0].FSAntebellumRevivalistLaw2 === 1) {
			r.push(`As the rebels are pushed back from the disturbingly eager mob of well-armed citizenry, it becomes obvious that many of the militia groups have been practicing for an attack of this nature for some time. They move as well-ordered squads through familiar corridors with an odd mishmash of practical and completely ornamental gear, each soldier or squadron uniquely dressed. They use their home advantage to ambush and catch the invaders out of position, terminating them with extreme prejudice. The taking of war trophies has already begun - stripped combatants trail after citizens on lengths of chain.`);
		}

		if (secExpUnits >= 4) {
			r.push(`Your`);
			if (secExpUnits >= 9) {
				r.push(`massive`);
			} else if (secExpUnits >= 7) {
				r.push(`huge`);
			} else if (secExpUnits >= 4) {
				r.push(`small`);
			}
			r.push(`private army quickly and efficiently contributes to the defense of ${V.arcologies[0].name}.`);
		}

		App.Events.addParagraph(node, r);
		r = [];

		const newSlaves = [];
		if ((secExpUnits / 2) + V.arcologies[0].FSRomanRevivalistLaw + V.arcologies[0].FSNeoImperialistLaw1 + V.arcologies[0].FSAntebellumRevivalistLaw2 + V.mercenaries + V.personalArms + V.hackerSupport + doubleAgent > 8) {
			r.push(`<span class="yellow">The Daughters of Liberty are utterly crushed.</span> ${V.arcologies[0].name} has been slightly damaged, but even as the last pockets of resistance are crushed, your citizens begin repairs themselves. The effect on your reputation is <span class="green">immensely positive,</span> since your victory was insultingly easy and barely set the arcology's prosperity back at all. You also took a truly impressive bag of prisoners.`);
			V.daughtersVictory = 3;
			cashX(-2000, "war");
			cashX(forceNeg(Math.trunc(V.cash * 0.2)), "war");
			V.arcologies[0].prosperity = Math.trunc(V.arcologies[0].prosperity * 0.7);
			repX(2000, "war");
			for (let pca = 0; pca < 8; pca++) {
				let slave;
				if (random(0, 99) < V.seeDicks) {
					slave = GenerateNewSlave("XY", {minAge: 16, maxAge: 32, disableDisability: 1});
					generateSalonModifications(slave);
					slave.weight = random(-20, 30);
					slave.muscles = random(20, 80);
					slave.waist = random(10, 80);
				} else {
					slave = GenerateNewSlave("XX", {minAge: 16, maxAge: 32, disableDisability: 1});
					generateSalonModifications(slave);
					slave.weight = random(-50, 30);
					slave.muscles = random(0, 80);
					slave.waist = random(-20, 20);
				}
				slave.origin = "$He is an enslaved Daughter of Liberty.";
				newSlaves.push(slave);
			}
			addTrinket("a damaged plate carrier bearing Daughters of Liberty insignia");
			r.push(IncreasePCSkills('warfare', 5));
		} else if (V.arcologies[0].FSRomanRevivalistLaw === 1 || V.arcologies[0].FSNeoImperialistLaw1 === 1 || V.arcologies[0].FSAntebellumRevivalistLaw2 === 1) {
			r.push(`<span class="yellow">The Daughters of Liberty are annihilated.</span> <span class="red">${V.arcologies[0].name} has been damaged,</span> and the repairs will be quite costly. However, the effect on your reputation is <span class="green">very positive,</span> since though your victory was hard-fought and set the arcology's prosperity back <span class="red">considerably,</span> you did better than other arcology owners have done when faced with similar well-armed unrest. You also took a truly impressive bag of prisoners.`);
			V.daughtersVictory = 3;
			cashX(-5000, "war");
			cashX(forceNeg(Math.trunc(V.cash * 0.2)), "war");
			V.arcologies[0].prosperity = Math.trunc(V.arcologies[0].prosperity * 0.7);
			repX(1000, "war");
			if (V.seeDicks >= 50) {
				pcaj = 5;
			} else if (V.seeDicks > 0) {
				pcaj = 2;
			} else {
				pcaj = 0;
			}
			for (let pca = 0; pca <= pcaj; pca++) {
				const slave = GenerateNewSlave("XY", {minAge: 16, maxAge: 32, disableDisability: 1});
				generateSalonModifications(slave);
				slave.origin = "$He is an enslaved Daughter of Liberty.";
				slave.weight = random(-20, 30);
				slave.muscles = random(20, 80);
				slave.waist = random(10, 80);
				newSlaves.push(slave);
			}
			if (V.seeDicks < 50) {
				pcaj = 5;
			} else if (V.seeDicks < 100) {
				pcaj = 3;
			} else {
				pcaj = 0;
			}
			for (let pca = 0; pca <= pcaj; pca++) {
				const slave = GenerateNewSlave("XX", {minAge: 16, maxAge: 32, disableDisability: 1});
				generateSalonModifications(slave);
				slave.origin = "$He is an enslaved Daughter of Liberty.";
				slave.weight = random(-50, 30);
				slave.muscles = random(0, 80);
				slave.waist = random(-20, 20);
				newSlaves.push(slave);
			}
			addTrinket("a Daughters of Liberty flag that once hung in their forward command post within your arcology");
		} else {
			r.push(`<span class="yellow">The Daughters of Liberty are defeated.</span> <span class="red">${V.arcologies[0].name} is heavily damaged,</span> and the repairs will be very costly. The effect on your reputation is <span class="green">muted, but positive,</span> since though you won, your victory was hard-fought and set the arcology's prosperity back <span class="red">a long way.</span>`);
			if (V.traitor !== 0 && !["agent", "trapper"].includes(V.traitorType)) {
				r.push(`${V.traitor.slaveName} was killed in the fighting.`);
				V.traitor = 0;
				V.traitorStats = 0;
				V.traitorType = 0;
			}
			V.daughtersVictory = 2;
			cashX(-10000, "war");
			cashX(forceNeg(Math.trunc(V.cash * 0.3)), "war");
			V.arcologies[0].prosperity = Math.trunc(V.arcologies[0].prosperity * 0.5);
			repX(500, "war");
			if (V.seeDicks >= 50) {
				pcaj = 3;
			} else if (V.seeDicks > 0) {
				pcaj = 1;
			} else {
				pcaj = 0;
			}
			for (let pca = 0; pca <= pcaj; pca++) {
				const slave = GenerateNewSlave("XY", {minAge: 16, maxAge: 32, disableDisability: 1});
				generateSalonModifications(slave);
				slave.origin = "$He is an enslaved Daughter of Liberty.";
				slave.weight = random(-20, 30);
				slave.muscles = random(20, 80);
				slave.waist = random(10, 80);
				newSlaves.push(slave);
			}
			if (V.seeDicks < 50) {
				pcaj = 3;
			} else if (V.seeDicks < 100) {
				pcaj = 2;
			} else {
				pcaj = 0;
			}
			for (let pca = 0; pca <= pcaj; pca++) {
				const slave = GenerateNewSlave("XX", {minAge: 16, maxAge: 32, disableDisability: 1});
				generateSalonModifications(slave);
				slave.origin = "$He is an enslaved Daughter of Liberty.";
				slave.weight = random(-50, 30);
				slave.muscles = random(0, 80);
				slave.waist = random(-20, 20);
				newSlaves.push(slave);
			}
			addTrinket("a Daughters of Liberty brassard");
			r.push(IncreasePCSkills('warfare', 5));
		}
		if (V.personalArms > 0) {
			V.PC.skill.combat = Math.min(V.PC.skill.combat + 10, 100);
		}

		if (V.traitor !== 0 && traitorDeath !== 1) {
			if (["agent", "trapper"].includes(V.traitorType)) {
				r.push(`${V.traitor.slaveName} returns to your service having completed the task assigned to ${him}.`);
				V.traitor.assignment = Job.REST;
			} else if (V.traitorType === "hostage") {
				r.push(`${V.traitor.slaveName} wanders back to the penthouse, battered and bloody, but alive.`);
				V.traitor.assignment = Job.REST;
				setHealth(V.traitor, V.traitor.health.condition, V.traitor.health.condition - V.traitor.health.shortDamage + 80, V.traitor.health.longDamage, V.traitor.health.illness, V.traitor.health.tired);
			} else {
				r.push(`${V.traitor.slaveName} was captured and has been returned to you.`);
				V.traitor.assignment = "stay confined";
				setHealth(V.traitor, V.traitor.health.condition, V.traitor.health.condition - V.traitor.health.shortDamage + 80, V.traitor.health.longDamage, V.traitor.health.illness, V.traitor.health.tired);
				V.traitor.origin = "$He was your slave, but you freed $him, which $he repaid by participating in a coup attempt against you. It failed, and $he is again your chattel.";
			}
			restoreTraitor();
		} else if (V.traitor !== 0) {
			r.push(`${V.traitor.slaveName}'s body was found among the dead. ${He} died sabotaging the Daughters' efforts.`);
			V.traitor = 0;
			V.traitorStats = 0;
			V.traitorType = 0;
		}

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Sell your prisoners immediately`, sell, (V.traitor !== 0) ? `${V.traitor.slaveName} will not be sold.` : ""));
		choices.push(new App.Events.Result(`Give your prisoners to those who suffered property damage`, property, (V.traitor !== 0) ? `${V.traitor.slaveName} will not be sold.` : ""));
		choices.push(new App.Events.Result(`Enslave all of your prisoners`, enslaveAll));

		App.Events.addResponses(node, choices);

		function sell() {
			for (const slave of newSlaves) {
				const cost = slaveCost(slave);
				cashX(cost, "slaveTransfer");
			}
			return `Prisoners sold.`;
		}

		function property() {
			const frag = new DocumentFragment();
			let r = [];
			for (const slave of newSlaves) {
				const cost = slaveCost(slave);
				repX(Math.trunc(cost / 10), "war");
			}
			r.push(`Prisoners <span class="green">given away.</span>`);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function enslaveAll() {
			for (const slave of newSlaves) {
				newSlave(slave); /* skip New Slave Intro */
			}

			return `You simply enslave all of the prisoners yourself. You will make them pay for attacking your arcology.`;
		}
	}
};
