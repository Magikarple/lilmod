// cSpell:ignore Bhalwi, al-sham, asmik, qalbik, Abna, Sakhmat

App.Events.RESosAssassin = class RESosAssassin extends App.Events.BaseEvent {
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
		const slave = GenerateNewSlave("XX", {minAge: 18, maxAge: 24, disableDisability: 1});
		generateSalonModifications(slave);
		slave.face = random(50, 100);
		slave.origin = "$He was an elite assassin of the Sons of Sekhmet, narrowly captured in a well-planned assassination attempt where $he distracted you with $his pretty face.";
		slave.intelligenceImplant = 30;
		slave.career = "an assassin";
		slave.skill.combat = 70;
		slave.devotion = -100;
		slave.trust = random(-20, 10);
		slave.weight = random(-20, 30);
		slave.muscles = random(20, 80);
		slave.waist = random(10, 80);
		slave.shouldersTat = either("flowers", "tribal patterns", "asian art");
		slave.custom.tattoo = "$He has the orange sun of the Sons of Sekhmet tattooed on $his neck, marking $him as a high-ranking operative.";
		const {
			He,
			he, his, him
		} = getPronouns(S.Bodyguard ? S.Bodyguard : {pronoun: App.Data.Pronouns.Kind.neutral});
		const {
			He2, His2,
			he2, his2, him2, woman2
		} = getPronouns(slave).appendSuffix('2');

		r.push(`As you stroll through your market district in the afternoon, checking up on your merchants and seeing if there's anything interesting on display, you take notice of a particularly attractive young ${woman2} in a rather nice suit walking in the same direction. Although attractive citizens are hardly unusual in your arcology, ones that you don't recognize are. ${He2} gives you a coy smile as ${he2} notices you watching ${him2} and starts to walk towards you.`);
		r.toParagraph();

		if (V.PC.skill.warfare >= 80) {
			r.push(`Suddenly a chill runs up your spine. Countless conflicts have given you an almost supernatural sense for danger, and under the attractive glint in this ${woman2}'s eyes, you can see a hunger that you recognize all too well. You`);
			if (V.personalArms > 0) {
				r.push(`reach into your jacket for your handgun,`);
			}
			if (S.Bodyguard) {
				r.push(`give a minuscule hand signal to your bodyguard,`);
			}
			r.push(`scan the surrounding area with your eyes and prepare for anything.`);
			r.toParagraph();
			r.push(`The instant your eyes leave the pretty ${woman2}, ${V.assistant.name} pings an alarm in your ear and two men on opposite sides of the marketplace spin on their heels towards you, pulling compact battle rifles from inside their jackets and screaming something in a foreign language.`);
			if (V.personalArms > 0 && S.Bodyguard) {
				r.push(`You snap your handgun out of its holster and fire three rounds into one of their chests, while ${S.Bodyguard.slaveName} blasts the other before either man can fire.`);
			} else if (S.Bodyguard) {
				r.push(`Your bodyguard quickly fires into the first assassin's chest, then snaps around and blasts the second one before either man can fire.`);
			} else if (V.personalArms > 0) {
				r.push(`You shoot two rounds into the first assassin's chest, then snap around and blast the second before either man can fire.`);
			} else {
				r.push(`Unfortunately, as your dumb ass has neither a bodyguard nor any sort of personal defense whatsoever, there is absolutely nothing you can do as you are gunned down like a dog before the security drones have even been alerted to the situation. Your body is riddled with nearly fifty bullets before you hit the ground, dead.`);
				gameover = true;
			}
			r.toParagraph();
			if (!gameover) {
				r.push(`As the two would-be assassins collapse, the pretty ${woman2} draws a vicious-looking curved knife from ${his2} sleeve, swears in a foreign language, and lunges towards you.`);
				if (S.Bodyguard) {
					r.push(`${He2}'s intercepted by ${S.Bodyguard.slaveName}, who drops ${his} empty firearm on the ground to pull ${his} own sword free.`);
					if (S.Bodyguard.skill.combat > 60 && V.personalArms > 0) {
						r.push(`The two trained killers clash ferociously, ${S.Bodyguard.slaveName} using the longer reach of ${his} sword to keep the mysterious assassin's lightning-fast long knife at bay. As the two narrowly avoid each other's attacks, you pull up your handgun, one bullet left in the chamber, carefully lower your aim, and fire into the melee, blasting a hole through the assassin's left thigh. As ${he2} cries out in pain and stumbles, your trained bodyguard tackles ${him2} to the ground and slams a fist into ${his2} face before ${he2} can activate whatever suicide method ${he2} has. As the security drones arrive, the marketplace watching the <span class="red">minorly damaged</span> scene with a mixture of <span class="green">shock and admiration,</span> you call for a medic and some sedatives. You're about to claim yourself a <span class="green">brand new slave.</span>`);
						cashX(-1000, "event", S.Bodyguard);
						repX(2500, "event", S.Bodyguard);
						newSlave(slave);
					} else if (S.Bodyguard.skill.combat > 60 && V.personalArms < 1) {
						r.push(`The two trained killers clash ferociously, ${S.Bodyguard.slaveName} using the longer reach of ${his} sword to keep the mysterious assassin's lightning-fast long knife at bay. For what feels like a full minute they dodge each other's lethal blows, both unable to land a hit on the other, until you see the security drones you called for finally start to arrive. Sensing that ${his2} time window is closing, the assassin tries to step back, only for ${his2} retreat to be cut off as ${S.Bodyguard.slaveName} ferociously leaps forward and plunges ${his} sword directly through the assassin's neck. ${He} nearly decapitates the pretty head as ${he} pulls ${his} sword back, the marketplace watching the <span class="red">minorly damaged</span> scene with a mixture of <span class="green">shock and admiration.</span>`);
						cashX(-1000, "event", S.Bodyguard);
						repX(2500, "event", S.Bodyguard);
					} else {
						r.push(`The two killers clash, but it's immediately apparent who's better trained. The assassin blocks every strike coming from ${S.Bodyguard.slaveName} and hits back twice as hard, forcing ${him} on the defensive. When ${S.Bodyguard.slaveName} stumbles, the assassin furiously kicks the blade out from ${his} hand and leaps atop ${him},`);
						if (S.Bodyguard.skill.combat <= 60 && V.personalArms > 0) {
							r.push(`readying ${his2} own knife to slash the bodyguard's throat. You raise your handgun at the same time, one bullet left in the trigger, and fire a single round through the assassin's skull just before ${he2} can. ${His2} head explodes backwards in a burst of gore, and ${he2} slumps off ${S.Bodyguard.slaveName}, ${his2} knife clattering to the ground. The citizens in the marketplace watch the <span class="red">minorly damaged</span> scene with a mixture of <span class="green">shock and admiration,</span> both you and ${S.Bodyguard.slaveName} panting in the wake of the attack and surrounded by bodies.`);
							cashX(-1000, "event", S.Bodyguard);
							repX(2500, "event", S.Bodyguard);
						} else {
							r.push(`slashing ${S.Bodyguard.slaveName}'s throat in a single, clean motion as you clutch your arm on the ground and fumble with your handgun, grimacing from the pain. Covered in blood, the assassin stands over ${S.Bodyguard.slaveName}'s corpse and approaches you, smiling psychotically.`);
							r.toParagraph();
							r.push(`"Bhalwi al-sham asmik qalbik, dog." The assassin spits, lunging towards you.`);
							r.toParagraph();
							r.push(`In your last moments alive before the Sekhmeti assassin straddles you and plunges ${his2} knife into your heart in front of your watching marketplace, you idly wish that you'd bought a handgun`);
							gameover = true;
						}
					}
				} else if (V.PC.skill.warfare >= 100 && V.personalArms > 0) {
					r.push(`There's nothing standing between you two. You level your handgun onto ${him2}, but ${he2}'s just a microsecond faster, kicking the gun out of your hand with a painfully powerful strike that sends the pistol clattering onto the ground a few feet away. Before you can dive for it, ${he2}'s thrusting ${his2} knife up towards your throat. Your combat instincts kick in and you wrench your head to the side, the blade nicking you on the cheek, and grab ${him2} by the wrist, throwing a hard punch into ${his2} ribcage. The assassin forces ${his2} hand free and stumbles back, seemingly surprised that you're holding your own against ${him2}.`);
					r.toParagraph();
					r.push(`"Bhalwi al-sham asmik qalbik. I was told you could fight." ${He2} mumbles.`);
					r.toParagraph();
					r.push(`You glance at your handgun on the ground as ${he2} drops into a combat stance and lunges towards you a second time. You barely catch ${his2} wrist as ${he2} thrusts the knife at your stomach, forcing ${his2} hand off to the side, and ${he2} responds by slamming a kick into your ankle, rearing ${his2} hand back for another strike as you reel. You narrowly deflect strike after strike as ${he2} jabs the knife towards your vitals, the sharp steel cutting and scraping your skin as you hold off the better-armed assailant, until ${he2} pulls back and brutally kicks you in the ribs as you block a jab, sending you slamming against the hard ground of the marketplace. Coughing a trace of blood, you roll to the side towards your discarded handgun as the assassin lunges atop you, pinning you down. ${He2}'s got an insane look in ${his2} pretty eyes as ${he2} raises the knife, shouting "Abna Sakhmat damkun!" You reach your hand to the side as far as you can get it, narrowly grasp your fingers around your handgun, and whip it back to fire a single round, the last round in the magazine, through the assassin straddling your chest. ${He2} gasps once, and then slumps off, an instant before having plunged the knife into your heart.`);
					r.toParagraph();
					r.push(`Covered in blood, you push the corpse off, stand up, brush yourself off, and tell the <span class="green">shocked and amazed</span> citizens of the marketplace that this is just another day in your life. Someone awkwardly applauds as the security drones arrive.`);
					r.toParagraph();
					cashX(-1000, "event");
					repX(2500, "event");
				} else {
					r.push(`There's nothing standing between you two. You level your handgun onto ${him2}, but ${he2}'s like a blur, kicking it out of your hand with enough force it feels like your hand shattered. The assassin grins psychotically at you and flourishes ${his2} curved knife as you reel back.`);
					r.toParagraph();
					r.push(`"Bhalwi al-sham asmik qalbik, dog." The Sekhmeti assassin spits, before lunging forward one last time to slash ${his2} knife up into your throat. A moment later, everything goes black.`);
					gameover = true;
				}
			}
		} else if (S.Bodyguard && S.Bodyguard.intelligence + S.Bodyguard.intelligenceImplant > 80) {
			r.push(`Suddenly ${S.Bodyguard.slaveName} steps in front of you and forcefully shoves you back, pulling ${his} machine pistol free from its holster. You're about to chastise ${him}, but you don't get the chance.`);
			r.toParagraph();
			r.push(`The instant your eyes leave the pretty ${woman2}, ${V.assistant.name} pings an alarm in your ear and two men on opposite sides of the marketplace spin on their heels towards you, pulling compact battle rifles from inside their jackets and screaming something in a foreign language.`);
			if (V.personalArms > 0) {
				r.push(`You snap your handgun out of its holster and fire three rounds into one of their chests, while ${S.Bodyguard.slaveName} blasts the other before either man can fire.`);
			} else {
				r.push(`Your bodyguard quickly fires into the first assassin's chest, then snaps around and blasts the second one before either man can fire.`);
			}
			r.toParagraph();
			r.push(`As the two would-be assassins collapse, the pretty ${woman2} draws a vicious-looking curved knife from ${his2} sleeve, swears in a foreign language, and lunges towards you. ${He2}'s intercepted by ${S.Bodyguard.slaveName}, who drops ${his} empty firearm on the ground to pull ${his} own sword free.`);
			if (S.Bodyguard.skill.combat > 60 && V.personalArms > 0 && V.PC.skill.warfare >= 60) {
				r.push(`The two trained killers clash ferociously, ${S.Bodyguard.slaveName} using the longer reach of ${his} sword to keep the mysterious assassin's lightning-fast long knife at bay. As the two narrowly avoid each other's attacks, you pull up your handgun, one bullet left in the chamber, carefully lower your aim, and fire into the melee, blasting a hole through the assassin's left thigh. As ${he2} cries out in pain and stumbles, your trained bodyguard tackles ${him2} to the ground and slams a fist into ${his2} face before ${he2} can activate whatever suicide method ${he2} has. As the security drones arrive, the marketplace watching the <span class="red">minorly damaged</span> scene with a mixture of <span class="green">shock and admiration,</span> you call for a medic and some sedatives. You're about to claim yourself a <span class="green">brand new slave.</span>`);
				cashX(-1000, "event", S.Bodyguard);
				repX(2500, "event", S.Bodyguard);
				newSlave(slave);
			} else if (S.Bodyguard.skill.combat > 60) {
				r.push(`The two trained killers clash ferociously, ${S.Bodyguard.slaveName} using the longer reach of ${his} sword to keep the mysterious assassin's lightning-fast long knife at bay. For what feels like a full minute they dodge each other's lethal blows, both unable to land a hit on the other, until you see the security drones you called for finally start to arrive. Sensing that ${his2} time window is closing, the assassin tries to step back, only for ${his2} retreat to be cut off as ${S.Bodyguard.slaveName} ferociously leaps forward and plunges ${his} sword directly through the assassin's neck. ${He} nearly decapitates the pretty head as ${he} pulls ${his} sword back, the marketplace watching the <span class="red">minorly damaged</span> scene with a mixture of <span class="green">shock and admiration.</span>`);
				cashX(-1000, "event", S.Bodyguard);
				repX(2500, "event", S.Bodyguard);
			} else {
				r.push(`The two killers clash, but it's immediately apparent who's better trained. The assassin blocks every strike coming from ${S.Bodyguard.slaveName} and hits back twice as hard, forcing ${him} on the defensive. When ${S.Bodyguard.slaveName} stumbles, the assassin furiously kicks the blade out from ${his} hand and leaps atop ${him},`);
				if (V.personalArms > 0 && V.PC.skill.warfare >= 60) {
					r.push(`readying ${his2} own knife to slash the bodyguard's throat. You raise your handgun at the same time, one bullet left in the trigger, and fire a single round through the assassin's skull just before ${he2} can. ${His2} head explodes backwards in a burst of gore, and ${he2} slumps off ${S.Bodyguard.slaveName}, ${his2} knife clattering to the ground. The citizens in the marketplace watch the <span class="red">minorly damaged</span> scene with a mixture of <span class="green">shock and admiration,</span> both you and ${S.Bodyguard.slaveName} panting in the wake of the attack and surrounded by bodies.`);
					cashX(-1000, "event", S.Bodyguard);
					repX(2500, "event", S.Bodyguard);
				} else {
					r.push(`slashing ${S.Bodyguard.slaveName}'s throat in a single, clean motion as you clutch your arm on the ground and fumble with your handgun, grimacing from the pain. Covered in blood, the assassin stands over ${S.Bodyguard.slaveName}'s corpse and approaches you, smiling psychotically.`);
					r.toParagraph();
					r.push(`"Bhalwi al-sham asmik qalbik, dog." The assassin spits, lunging towards you.`);
					r.toParagraph();
					r.push(`In your last moments alive before the Sekhmeti assassin straddles you and plunges ${his2} knife into your heart in front of your watching marketplace, you idly wish that you'd ${V.personalArms === 0 ? "bought a handgun" : "learned how to fight"}`);
					gameover = true;
				}
			}
		} else {
			r.push(`You smile back at the attractive ${woman2}, getting lost in the depths of ${his2} twinkling eyes. As ${he2} approaches you, ${V.assistant.name} pings an alarm in your ear, which surprises you for a moment until you realize that, outside your field of view, two men on opposite sides of the marketplace have just pulled compact battle rifles from inside their jackets and are screaming something in a foreign language as they aim at you.`);
			if (V.personalArms > 0 && S.Bodyguard) {
				r.push(`You pull your handgun out of its holster as ${S.Bodyguard.slaveName} snaps to attention, exchanging fire with the two assailants. A bullet hits you in the shoulder and sends you sprawling back against the ground in agony, but between the two of you you hit both of the attackers and they drop to the ground dead.`);
			} else if (S.Bodyguard) {
				r.push(`${S.Bodyguard.slaveName} quickly snaps to attention, pulling ${his} machine pistol from its holster and firing back at the two attackers. A bullet hits you in the arm and sends you sprawling back against the ground in agony, but ${S.Bodyguard.slaveName} drops both of the attackers before they can finish the job.`);
			} else {
				r.push(`Unfortunately, as your dumb ass has neither a bodyguard nor any sort of personal defense whatsoever, there is absolutely nothing you can do as you are gunned down like a dog before the security drones have even been alerted to the situation. Your body is riddled with nearly fifty bullets before you hit the ground, dead.`);
				gameover = true;
			}
			if (!gameover) {
				r.push(`As the two would-be assassins collapse, the pretty ${woman2} draws a vicious-looking curved knife from ${his2} sleeve, swears in a foreign language, and lunges towards you.`);
				r.toParagraph();
				if (S.Bodyguard) {
					r.push(`${He2}'s intercepted by ${S.Bodyguard.slaveName}, who drops ${his} empty firearm on the ground to pull ${his} own sword free.`);
					if (S.Bodyguard.skill.combat > 60) {
						r.push(`The two trained killers clash ferociously, ${S.Bodyguard.slaveName} using the longer reach of ${his} sword to keep the mysterious assassin's lightning-fast long knife at bay. For what feels like a full minute they dodge each other's lethal blows, both unable to land a hit on the other, until you see the security drones you called for finally start to arrive. Sensing that ${his2} time window is closing, the assassin tries to step back, only for ${his2} retreat to be cut off as ${S.Bodyguard.slaveName} ferociously leaps forward and plunges ${his} sword directly through the assassin's neck. ${He} nearly decapitates the pretty head as ${he} pulls ${his} sword back, the marketplace watching the <span class="red">minorly damaged</span> scene with a mixture of <span class="green">shock and admiration.</span>`);
						cashX(-1000, "event", S.Bodyguard);
						repX(2500, "event", S.Bodyguard);
					} else {
						r.push(`The two killers clash, but it's immediately apparent who's better trained. The assassin blocks every strike coming from ${S.Bodyguard.slaveName} and hits back twice as hard, forcing ${him} on the defensive. When ${S.Bodyguard.slaveName} stumbles, the assassin furiously kicks the blade out from ${his} hand and leaps atop ${him}, slashing ${S.Bodyguard.slaveName}'s throat in a single, clean motion as you clutch your arm on the ground and fumble with your handgun, grimacing from the pain. Covered in blood, the assassin stands over ${S.Bodyguard.slaveName}'s corpse and approaches you, smiling psychotically.`);
						r.toParagraph();
						r.push(`"Bhalwi al-sham asmik qalbik, dog." The assassin spits, lunging towards you.`);
						r.toParagraph();
						if (V.personalArms > 0 && V.PC.skill.warfare >= 60) {
							r.push(`You can barely muster the strength to raise your handgun, one bullet left in the chamber, and blow a round through ${his2} chest before ${he2} lands. Killed in midair, the assassin's corpse falls against you as you pass out from blood loss, citizens in the marketplace rushing to your unconscious body and calling for medical help. You'll live, but your bodyguard <span class="red">wasn't so lucky.</span>`);
							cashX(-1000, "event", S.Bodyguard);
							healthDamage(S.Bodyguard, 1000);
							removeSlave(S.Bodyguard);
						} else {
							r.push(`In your last moments alive before the Sekhmeti assassin straddles you and plunges ${his2} knife into your heart in front of your watching marketplace, you idly wish that you'd ${V.personalArms === 0 ? "bought a handgun" : "learned how to fight"}`);
							gameover = true;
						}
					}
				} else {
					r.push(`There's nothing standing between you two. You level your handgun onto ${him2}, but ${he2}'s like a blur, kicking it out of your hand with enough force it feels like your hand shattered. The assassin grins psychotically at you and flourishes ${his2} curved knife as you reel back.`);
					r.toParagraph();
					r.push(`"Bhalwi al-sham asmik qalbik, dog." The Sekhmeti assassin spits, before lunging forward one last time to slash ${his2} knife up into your throat. A moment later, everything goes black.`);
					gameover = true;
				}
			}
		}
		r.toParagraph();

		if (gameover) {
			App.Events.LocalGameOver(node);
		} else {
			App.Events.addParagraph(node, [`Today, you've survived another attack by the Sons of Sekhmet. But as you look around at the twitching bodies, you get the feeling they'll be back.`]);
		}
	}
};
