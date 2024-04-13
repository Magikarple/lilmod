// cSpell:ignore damk, Sakhmat, Abna

App.Events.RESosSniper = class RESosSniper extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeCats !== 0,
			() => V.projectN.status > 4
		];
	}

	execute(node) {
		let r = new SpacedTextAccumulator(node);
		let gameover = false;

		App.UI.StoryCaption.encyclopedia = "The Sons of Sekhmet";

		if (S.Bodyguard) {
			App.Events.drawEventArt(node, S.Bodyguard);
		}
		const {
			He,
			he, his,
		} = getPronouns(S.Bodyguard ? S.Bodyguard : {pronoun: App.Data.Pronouns.Kind.neutral});

		const slave = GenerateNewSlave(null, {minAge: 18, maxAge: 32, disableDisability: 1});
		generateSalonModifications(slave);
		slave.face = random(50, 100);
		slave.origin = "$He was an elite sniper of the Sons of Sekhmet, nearly successful in assassinating you with a long-range shot from across the arcology before being captured by your Imperial Knights in a tense shootout.";
		slave.intelligenceImplant = 30;
		slave.career = "a sniper";
		slave.skill.combat = 70;
		slave.devotion = -100;
		slave.trust = random(-20, 10);
		slave.weight = random(-20, 30);
		slave.muscles = random(20, 80);
		slave.waist = random(10, 80);
		eyeSurgery(slave, "both", "normal");
		slave.shouldersTat = either("flowers", "tribal patterns", "asian art");
		slave.custom.tattoo = "$He has the orange sun of the Sons of Sekhmet tattooed on $his neck, marking $him as a high-ranking operative.";

		r.push(`It's a particularly nice day out and you've decided to visit some of the more prominent citizens of your arcology, the kind of people you might call 'friends' if genuine friendship wasn't a quick way to get stabbed in the back in the Free Cities. As you're having a pleasant conversation with one of these notables on the raised porch of his luxurious apartment, ${V.assistant.name} pings you with an urgent message: DUCK.`);
		r.toParagraph();

		if (V.PC.skill.warfare >= 60) {
			r.push(`You don't even think about it. Combat reflexes kicking in, you dive onto the ground as something whizzes past your head close enough to shave off a lock of hair, slamming into the ground next to you with enough force to shatter the wood. Before you consciously realize what's going on, your body understands that you're being shot at,`);
			if (S.Bodyguard) {
				r.push(`${S.Bodyguard.slaveName} helping you up and shielding you with ${his} body as you're hustled into the citizen's apartment with the citizen himself.`);
			} else {
				r.push(`leaping up and springing towards the citizen's apartment with the frightened man himself.`);
			}
			r.push(`Two more shots slam into the wood around you as you all but leap into the citizen's apartment, one more bullet splintering the wood of the door as you close it shut behind you.`);
		} else if (!S.Bodyguard || S.Bodyguard.intelligence + S.Bodyguard.intelligenceImplant <= 60) {
			r.push(`You blink once at the strange message. That's the extent of time it takes for the .50 caliber bullet travelling through the air from halfway across the arcology to impact the front of your head and exit through the back, splattering your brains into a fine gray goop across the suit of the citizen you were speaking with seconds ago. On the bright side, your death is instantaneous, unexpected, and totally painless, given that your head is essentially ripped off your body with the force of the sniper round.`);
			gameover = true;
		} else {
			r.push(`You blink once at the message in confusion before ${S.Bodyguard.slaveName} tackles you, ${his} shoulder bursting out with an explosion of red as ${he} catches a bullet clearly meant for you. ${He} cries out in pain, but it doesn't look like the hit was lethal; even injured and bleeding, ${he} shields you as you hustle into the open apartment along with the spooked citizen, more shots impacting around you as you wildly scramble into cover. A final bullet splinters the wood of the door as you close it shut behind you.`);
			cashX(-1000, "event", S.Bodyguard);
			healthDamage(S.Bodyguard, 60);
		}
		r.toParagraph();

		if (gameover) {
			r.push(`The next day the Sons of Sekhmet release a propaganda video featuring graphic footage of your death as a "victory against the decadent anarcho-tyrannies of the New World". The other silver lining to all this is that you aren't there to see the violence and strife that immediately erupts between your arcology's forces and the Sekhmeti cells nearby in the wake of your death.`);
			r.toParagraph();
			App.Events.LocalGameOver(node);
		} else {
			r.push(`As you pant in the wake of the sudden attack, ${V.assistant.name} notifies you that they've traced the origin of the shots to somewhere in Sector Three. Having missed the killing shot, the sniper is undoubtedly packing up and moving to leave right now. You'll have to get a search party moving immediately if you want any hope of tracking them down.`);
			r.toParagraph();

			const choices = [];
			if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
				choices.push(new App.Events.Result(`Lock down the sector and notify your Imperial Knights to lead citizens out in searching for the shooter`, impResponse));
			}
			if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
				choices.push(new App.Events.Result(`Lock down the sector and notify your Praetorians to lead the citizens out in searching for the shooter`, romanResponse));
			}
			if (V.mercenaries === 5) {
				choices.push(new App.Events.Result(`Lock down the sector and notify your ${V.mercenariesTitle} to send in hunter-killer teams`, mercResponse));
			}
			choices.push(new App.Events.Result(`Just lock down the sector and send out search parties for the shooter`, lockdown));

			App.Events.addResponses(node, choices);
		}

		function impResponse() {
			let r = new SpacedTextAccumulator();
			let sniperEscape;
			if (either(1, 2, 3) === 1) {
				sniperEscape = 1;
				r.push(`After a few hours of searching, your brightly-painted Knights return empty-handed, cursing that it was like no one was ever there.`);
			} else if (random(1, 2) === 1) {
				sniperEscape = 2;
				r.push(`After maybe thirty minutes, you hear loud gunfire coming from the sector where your Knights are searching. About five minutes later, a Knight in bright red armor brings you a body slung over his shoulder and thumps it in the ground in front of you, riddled in bullet holes and marked with the logo of the Sons of Sekhmet. "We got the bastard, m'lord." The Knight drawls. With his other hand, he tosses a broken sniper rifle next to the corpse.`);
			} else {
				sniperEscape = 3;
				r.push(`After maybe thirty minutes, you hear loud gunfire coming from the sector where your Knights are searching. About five minutes later, a Knight in bright red armor brings you a captive bound heavily with iron shackles, covered in body armor bearing the logo of the Sons of Sekhmet. In his other hand, he tosses a broken sniper rifle on the ground in front of you.`);
			}
			r.toParagraph();
			if (sniperEscape === 1) {
				r.push(`The assassination attempt and subsequent escape has <span class="red">scared</span> many of your citizens, even after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. A few days later, a trader passing by the arcology hands you an envelope, saying that he was told to pass it onto you. Inside is a single slip of paper, totally blank except for a single line of text: "See you soon." The envelope is emblazoned with the logo of an orange sun.`);
				V.arcologies[0].prosperity -= 1;
				repX(-2000, "event");
			} else if (sniperEscape === 2) {
				r.push(`Surviving the assassination attempt and killing the assassin earns you <span class="green">admiration</span> of the citizenry, who see you as strong for punishing the assassin, particularly after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. The next day, the Sons of Sekhmet release a 'news' update featuring their balaclava-wearing figurehead in front of his professional desk.`);
				r.toParagraph();
				r.push(`"Today a servant of Sekhmet was martyred while making an attempt on the life of a hedonistic new-world plutocrat. This was not the first attempt we have made, and it will not be the last. Next time, we will inscribe his name on the bullet that finishes the job. Abna Sakhmat damk-" You turn off the report. That's about all you need to see.`);
				V.arcologies[0].prosperity += 1;
				repX(2000, "event");
			} else if (sniperEscape === 3) {
				r.push(`Surviving the assassination attempt and capturing the assassin earns you <span class="green">admiration</span> of the citizenry, who see you as strong for punishing the assassin, particularly after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. The next day, the Sons of Sekhmet release a 'news' update featuring their balaclava-wearing figurehead in front of his professional desk.`);
				r.toParagraph();
				r.push(`"Today a servant of Sekhmet was martyred while making an attempt on the life of a hedonistic new-world plutocrat. The enemy has captured one of ours - in time we will free them, or perhaps they will awake to find a dagger in their back. Soon, they will understand the grave mistake of taking a Son into their ranks, even as a slave. Abna Sakhmat damk-" You turn off the report. That's about all you need to see.`);
				V.arcologies[0].prosperity += 1;
				repX(2000, "event");
				newSlave(slave);
			}
			r.toParagraph();
			return r.container();
		}

		function romanResponse() {
			let r = new SpacedTextAccumulator();
			let sniperEscape;
			if (either(1, 2, 3) === 1) {
				sniperEscape = 1;
				r.push(`After a few hours of searching, your armed Praetorian citizens return empty-handed, cursing that it was like no one was ever there.`);
			} else if (random(1, 2) === 1) {
				sniperEscape = 2;
				r.push(`After maybe thirty minutes, you hear loud gunfire coming from the sector where your citizens are searching. About five minutes later, a group of rough-looking Hastati citizens bring you a body slung over his shoulder and thumps it in the ground in front of you, riddled in bullet holes and marked with the logo of the Sons of Sekhmet. "We got the filth." The Hastati carrying the body enunciates. With his other hand, he tosses a broken sniper rifle next to the corpse.`);
			} else {
				sniperEscape = 3;
				r.push(`After maybe thirty minutes, you hear loud gunfire coming from the sector where your citizens are searching. About five minutes later, a group of rough-looking Hastati citizens bring you a captive bound heavily with iron shackles, covered in body armor bearing the logo of the Sons of Sekhmet. In his other hand, he tosses a broken sniper rifle on the ground in front of you.`);
			}
			r.toParagraph();
			if (sniperEscape === 1) {
				r.push(`The assassination attempt and subsequent escape has <span class="red">scared</span> many of your citizens, even after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. A few days later, a trader passing by the arcology hands you an envelope, saying that he was told to pass it onto you. Inside is a single slip of paper, totally blank except for a single line of text: "See you soon." The envelope is emblazoned with the logo of an orange sun.`);
				V.arcologies[0].prosperity -= 1;
				repX(-2000, "event");
			} else if (sniperEscape === 2) {
				r.push(`Surviving the assassination attempt and killing the assassin earns you <span class="green">admiration</span> of the citizenry, who see you as strong for punishing the assassin, particularly after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. The next day, the Sons of Sekhmet release a 'news' update featuring their balaclava-wearing figurehead in front of his professional desk.`);
				r.toParagraph();
				r.push(`"Today a servant of Sekhmet was martyred while making an attempt on the life of a hedonistic new-world plutocrat. This was not the first attempt we have made, and it will not be the last. Next time, we will inscribe his name on the bullet that finishes the job. Abna Sakhmat damk-" You turn off the report. That's about all you need to see.`);
				V.arcologies[0].prosperity += 1;
				repX(2000, "event");
			} else if (sniperEscape === 3) {
				r.push(`Surviving the assassination attempt and capturing the assassin earns you <span class="green">admiration</span> of the citizenry, who see you as strong for punishing the assassin, particularly after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. The next day, the Sons of Sekhmet release a 'news' update featuring their balaclava-wearing figurehead in front of his professional desk.`);
				r.toParagraph();
				r.push(`"Today a servant of Sekhmet was martyred while making an attempt on the life of a hedonistic new-world plutocrat. The enemy has captured one of ours - in time we will free them, or perhaps they will awake to find a dagger in their back. Soon, they will understand the grave mistake of taking a Son into their ranks, even as a slave. Abna Sakhmat damk-" You turn off the report. That's about all you need to see.`);
				V.arcologies[0].prosperity += 1;
				repX(2000, "event");
				newSlave(slave);
			}
			r.toParagraph();
			return r.container();
		}

		function mercResponse() {
			let r = new SpacedTextAccumulator();
			let sniperEscape;
			if (either(1, 2, 3) === 1) {
				sniperEscape = 1;
				r.push(`After a few hours of searching, your ${V.mercenariesTitle} return empty-handed, cursing that it was like no one was ever there.`);
			} else if (random(1, 2) === 1) {
				sniperEscape = 2;
				r.push(`After maybe thirty minutes, you hear loud gunfire coming from the sector where your ${V.mercenariesTitle} are searching. About five minutes later, a small squad of heavily-armored mercenaries bring you a body, dragging it in the ground in front of you, riddled in bullet holes and marked with the logo of the Sons of Sekhmet. "We got the fucker." The sergeant of the mercenary squad grumbles. With his other hand, he tosses a broken sniper rifle next to the corpse.`);
			} else {
				sniperEscape = 3;
				r.push(`After maybe thirty minutes, you hear loud gunfire coming from the sector where your ${V.mercenariesTitle} are searching. About five minutes later, a small squad of heavily-armored mercenaries bring you a captive bound heavily with iron shackles, covered in body armor bearing the logo of the Sons of Sekhmet. One of the tosses a broken sniper rifle on the ground in front of you.`);
			}
			r.toParagraph();
			if (sniperEscape === 1) {
				r.push(`The assassination attempt and subsequent escape has <span class="red">scared</span> many of your citizens, even after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. A few days later, a trader passing by the arcology hands you an envelope, saying that he was told to pass it onto you. Inside is a single slip of paper, totally blank except for a single line of text: "See you soon." The envelope is emblazoned with the logo of an orange sun.`);
				V.arcologies[0].prosperity -= 1;
				repX(-2000, "event");
			} else if (sniperEscape === 2) {
				r.push(`Surviving the assassination attempt and killing the assassin earns you <span class="green">admiration</span> of the citizenry, who see you as strong for punishing the assassin, particularly after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. The next day, the Sons of Sekhmet release a 'news' update featuring their balaclava-wearing figurehead in front of his professional desk.`);
				r.toParagraph();
				r.push(`"Today a servant of Sekhmet was martyred while making an attempt on the life of a hedonistic new-world plutocrat. This was not the first attempt we have made, and it will not be the last. Next time, we will inscribe his name on the bullet that finishes the job. Abna Sakhmat damk-" You turn off the report. That's about all you need to see.`);
				V.arcologies[0].prosperity += 1;
				repX(2000, "event");
			} else if (sniperEscape === 3) {
				r.push(`Surviving the assassination attempt and capturing the assassin earns you <span class="green">admiration</span> of the citizenry, who see you as strong for punishing the assassin, particularly after you <span class="red">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. The next day, the Sons of Sekhmet release a 'news' update featuring their balaclava-wearing figurehead in front of his professional desk.`);
				r.toParagraph();
				r.push(`"Today a servant of Sekhmet was martyred while making an attempt on the life of a hedonistic new-world plutocrat. The enemy has captured one of ours - in time we will free them, or perhaps they will awake to find a dagger in their back. Soon, they will understand the grave mistake of taking a Son into their ranks, even as a slave. Abna Sakhmat damk-" You turn off the report. That's about all you need to see.`);
				V.arcologies[0].prosperity += 1;
				repX(2000, "event");
				newSlave(slave);
			}
			r.toParagraph();
			return r.container();
		}

		function lockdown() {
			let r = [];
			r.push(`After a few hours of searching, your guards return empty-handed, cursing that it was like no one was ever there. The assassination attempt and subsequent escape has <span class="reputation dec">scared</span> many of your citizens, even after you <span class="prosperity dec">pay</span> for the damage the sniper bullets caused to the wealthy elite's property. A few days later, a trader passing by the arcology hands you an envelope, saying that he was told to pass it onto you. Inside is a single slip of paper, totally blank except for a single line of text: "See you soon." The envelope is emblazoned with the logo of an orange sun.`);
			V.arcologies[0].prosperity -= 1;
			repX(-2000, "event");
			return r;
		}
	}
};
