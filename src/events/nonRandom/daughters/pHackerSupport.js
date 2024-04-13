// cSpell:ignore fuckin

App.Events.PHackerSupport = class PHackerSupport extends App.Events.BaseEvent {
	execute(node) {
		let r = [];

		V.nextButton = "End Call";
		V.hackerSupport = 0;

		V.fcnn.push("...the Daughters of Liberty as 'cyber-terrorists', after an attempted...");

		r.push(`While you are reviewing your information security posture in light of the Daughters of Liberty and their apparent ability to get into your systems, you receive yet another well-secured message unannounced. To your surprise, it isn't the Daughters. It's a video call from a rather interesting individual. She is quite pretty, and has a variety of facial tattoos and piercings; her face is androgynous enough that you aren't entirely sure what gender she (probably) considers herself. Her pale skin is illuminated by the diffuse glow from what's clearly a huge bank of monitors, and the clacking sound of a traditional mechanical keyboard can be heard over the line.`);

		App.Events.addParagraph(node, r);
		r = [];
		r.push(`"Hi!" she says cheerfully. "I seen you been contacted by these Daughters cunts. They been after me too. They're pretty decent at cyber-warfare, but I'm fuckin' better." A momentary discomfort crosses her face, and she shifts a little in her seat. "They're building up for somethin' big. Wouldn't a' contacted you at all, let us both fight our own fights, but I gotta short fuse on this vulnerability and I need to bribe a weak link. Your money can get me in; my skills can fuck 'em up. What do you say?${(V.traitor && V.traitorType === "hostage") ? `If it sweetens the deal at all, I can even get ${V.traitor.slaveName} out of hot water. Not the brightest, that one.` : ""}"`);
		if (V.assistant.personality > 0) {
			const {
				hisA, girlA, womanA
			} = getPronouns(assistant.pronouns().main).appendSuffix("A");
			r.push(`${capFirstChar(V.assistant.name)} has been trying to track the contact, but fails horribly. The hacker glances at ${hisA}`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`frustrated little monster${girlA} avatar`);
					break;
				case "shemale":
					r.push(`angry little shemale avatar`);
					break;
				case "amazon":
					r.push(`raging little amazon avatar`);
					break;
				case "businesswoman":
					r.push(`mortified little business${womanA} avatar`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`pouting little fairy avatar`);
					break;
				case "goddess":
					r.push(`scornful little goddess avatar`);
					break;
				case "hypergoddess":
					r.push(`scornful "little" goddess avatar`);
					break;
				case "loli":
					r.push(`pouting little ${girlA} avatar`);
					break;
				case "preggololi":
					r.push(`pouting little ${girlA} avatar`);
					break;
				case "schoolgirl":
					r.push(`embarrassed little school${girlA} avatar`);
					break;
				case "angel":
					r.push(`terrified little angel avatar`);
					break;
				case "cherub":
					r.push(`terrified little cherub avatar`);
					break;
				case "incubus":
					r.push(`indignant little incubus avatar`);
					break;
				case "succubus":
					r.push(`frustrated little succubus avatar`);
					break;
				case "imp":
					r.push(`pouting little imp avatar`);
					break;
				case "witch":
					r.push(`frustrated little witch avatar`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`expressionless little corrupted avatar`);
					break;
				default:
					r.push(`symbol`);
			}
			r.push(`and chuckles. "Haha, cute."`);
		}

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`As she finishes speaking, another spasm distorts her expression, and then she suddenly relaxes. After a moment, she looks down, out of your field of view, and hisses,`);
		if (V.seeDicks === 0) {
			r.push(`"Keep licking, bitch, I like aftershocks. Work my clit, or it's your asshole."`);
		} else {
			r.push(`"Swallow, bitch. Every fucking drop, or it's your asshole."`);
		}

		App.Events.addParagraph(node, r);

		const fee = 10000;
		const choices = [];
		choices.push(new App.Events.Result(`Decline`, decline));
		choices.push(new App.Events.Result(`Accept`, accept, `This will cost ${cashFormat(fee)}`));
		App.Events.addResponses(node, choices);

		function decline() {
			const frag = new DocumentFragment();
			let r = [];
			V.nextButton = "Continue";
			App.Utils.updateUserButton();
			r.push(`She's almost certainly trying to extort a quick payoff. You politely decline. "Meh," she shrugs.`);
			if (V.seeDicks === 0) {
				r.push(`She shudders again and there's a gasping sound from down below. She looks down again, and as she ends the video call, you hear her say "Good job. Ha ha, fuck you, slut, it's your asshole anyway. Get me my strap-on."`);
			} else {
				r.push(`She shudders and there's a popping sound from down below, like a cockhead springing free of someone's mouth. Sure enough, a still-erect dickhead springs into view from the bottom of the screen; for that to be visible she has to be truly huge, almost as long as one of her forearms. She looks down again, and as she ends the video call, you hear her say "Good job. Ha ha, fuck you, slut, it's your asshole anyway. Rape time! Turn around." Tearful begging can be heard before the call closes.`);
			}
			if (V.traitorType === "hostage") {
				V.traitor = 0;
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function accept() {
			const frag = new DocumentFragment();
			let r = [];
			V.nextButton = "Continue";
			App.Utils.updateUserButton();
			r.push(`You transfer the funds. "Meh," she shrugs.`);
			if (V.seeDicks === 0) {
				r.push(`She shudders again and there's a gasping sound from down below. She looks down again, and as she ends the video call, you hear her say "Good job. Ha ha, fuck you, slut, it's your asshole anyway. Get me my strap-on."`);
			} else {
				r.push(`She shudders and there's a popping sound from down below, like a cockhead springing free of someone's mouth. Sure enough, a still-erect dickhead springs into view from the bottom of the screen; for that to be visible she has to be truly huge, almost as long as one of her forearms. She looks down again, and as she ends the video call, you hear her say "Good job. Ha ha, fuck you, bitch, it's your asshole anyway. Buttrape time!"`);
			}
			if (V.assistant.personality > 0) {
				const {
					HeA, HisA,
					heA, hisA, himA, girlA, himselfA, womanA
				} = getPronouns(assistant.pronouns().main).appendSuffix("A");
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little monster ${girlA} avatar is visible in the bottom corner of a screen on the wall opposite you, and is writhing around, babbling and orgasming continuously.`);
						break;
					case "shemale":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little shemale avatar is visible in the bottom corner of a screen on the wall opposite you. ${HeA}'s being assraped by a representation of the hacker in the same style, and is helplessly masturbating as ${heA} gets fucked.`);
						break;
					case "amazon":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little amazon avatar is visible in the bottom corner of a screen on the wall opposite you, and is writhing around, babbling and squirting continuously.`);
						break;
					case "businesswoman":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little business${womanA} avatar is visible in the bottom corner of a screen on the wall opposite you, and seems to be under a compulsion to strip out of ${hisA} suit. ${HeA}'s blushing furiously at ${hisA} inability to control ${himselfA}.`);
						break;
					case "fairy":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little fairy avatar is visible in the bottom corner of a screen on the wall opposite you, and is grinding against the stamen of a virtual flower. ${HeA} repeatedly moans your name as ${hisA} body twitches and jerks against the plant.`);
						break;
					case "pregnant fairy":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little fairy avatar is visible in the bottom corner of a screen on the wall opposite you, and is currently perched upon a virtual flower with the stamen buried in ${hisA} little ass. Milk leaks from ${hisA} breasts down ${hisA} swollen belly as ${heA} writhes in both pain and pleasure, slowly giving birth to a pair of fairies.`);
						break;
					case "goddess":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little goddess avatar is visible in the bottom corner of a screen on the wall opposite you. ${HeA}'s being facefucked by a representation of the hacker in the same style, meekly struggling, but flushed with arousal.`);
						break;
					case "hypergoddess":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} "little" goddess avatar is visible in the bottom corner of a screen on the wall opposite you. ${HeA}'s being assfucked by a representation of the hacker in the same style, while ${hisA} large breasts are roughly milked. Every few thrusts coincide with another baby slipping out alongside an orgasm.`);
						break;
					case "loli":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little ${girlA} avatar is visible in the bottom corner of a screen on the wall opposite you.`);
						if (V.seePreg !== 0) {
							r.push(`${HisA} virginity is being forcibly taken by a representation of the hacker in the same style. ${HeA} cries out as she cums in ${hisA} fertile womb; again and again the hacker uploads her virus into ${hisA} abused pussy until ${hisA} sagging bloated belly is touching the floor. ${HeA} leaves the avatar drooling cum to rest on ${hisA} new pregnancy. ${HeA} may need to be reset after this experience.`);
							V.assistant.appearance = "preggololi";
						} else {
							r.push(`${HeA}'s writhing on the floor in tears as a series of hands tickles ${hisA} body. They shift their focus to ${hisA} nipples and pussy as ${heA} begins moaning with lust. As ${heA} twitches and jerks before the mounting orgasm, they vanish, leaving ${himA} writhing in sexual frustration before you. Before your eyes, ${hisA} hands shoot to ${hisA} crotch and ${heA} climaxes lewdly in front of you.`);
						}
						break;
					case "preggololi":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little ${girlA} avatar is visible in the bottom corner of a screen on the wall opposite you. ${HisA} vagina is being forcibly fucked by a representation of the hacker in the same style. Each thrust causes ${himA} to rock atop ${hisA} bulging pregnancy until the hacker unloads into ${himA}. She leaves the avatar drooling cum to rest on ${hisA} overfilled belly.`);
						break;
					case "schoolgirl":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little school ${girlA} avatar is visible in the bottom corner of a screen on the wall opposite you, and is blushing furiously as ${heA} compulsively fists ${himselfA}.`);
						break;
					case "angel":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little angel avatar is visible in the bottom corner of a screen on the wall opposite you. ${HisA} virginity is being forcibly taken by a representation of the hacker in the same style. ${HeA} pleads for them to stop before ${heA} falls, but it goes unheeded. ${HeA} cries out in orgasm as the hacker unloads their corrupting jism deep into ${hisA} womb before pulling out and letting ${himA} drop to the ground. ${HeA} rolls from side to side in anguish,`);
						if (V.seePreg !== 0) {
							r.push(`gripping ${hisA} cum-filled belly as it rounds more and more, before settling on ${hisA} back and cradling ${hisA} now full-term pregnancy. As it continues to grow, ${hisA} body becomes increasingly withered, until ${heA} appears to be pregnant with a fully grown person.`);
							if (V.seeExtreme === 1) {
								r.push(`As the light fades from ${himA}, ${hisA} gravid belly begins to shudder violently, its occupant trying to tear its way free. Before long, it splits open, revealing a gorgeous ${womanA} with all the features of the fallen angel. ${V.assistant.name} spreads ${hisA} bat-like wings as ${heA} rises from the disintegrating remains of ${hisA} once holy body, turns to you, and sensually traces ${hisA} new curves seductively.`);
							} else {
								r.push(`As the light fades from ${himA}, ${hisA} gravid belly begins to shudder violently, its occupant trying to find its way out. A pair of arms burst forth from ${hisA} ruined pussy, followed a perfectly endowed ${womanA} with all the features of the former angel. ${V.assistant.name} rises and spreads ${hisA} bat-like wings as the remains of ${hisA} once holy body turn to dust behind ${himA}. ${HeA} turns to you, sensually tracing the contours of ${hisA} new body, and blows you a kiss.`);
							}
						} else {
							r.push(`alternating between groping ${hisA} swelling breasts and fingering ${hisA} aching pussy, before screaming with climax as ${hisA} body twists into a more suiting form. ${V.assistant.name} rises to ${hisA} feet, spreads ${hisA} bat-like wings, and sensually traces ${hisA} new curves before bending over revealing ${hisA} sopping wet cunt. "All for you, ${V.PC.slaveName}, you know you want it."`);
						}
						V.assistant.appearance = "succubus";
						break;
					case "cherub":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little cherub avatar is visible in the bottom corner of a screen on the wall opposite you, and is writhing around, both hands on ${hisA} pussy and masturbating furiously.`);
						break;
					case "incubus":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little incubus avatar is visible in the bottom corner of a screen on the wall opposite you, ${hisA} dick steadily growing longer and prehensile. As ${heA} gasps in shock, it rockets into ${hisA} mouth and down ${hisA} throat. It delves deeper into the struggling demon, ${hisA} intestines bulging under ${hisA} skin as ${hisA} dick snakes through ${himA}, until it pops out the other end. It begins pistoning in and out of ${hisA} body, literally forcing ${himA} to fuck ${himselfA} until ${heA} cums, causing it to rapidly retract back through ${hisA} body. ${HeA} collapses to the floor, coughing up cum and struggling to catch ${hisA} breath.`);
						break;
					case "succubus":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little succubus avatar is visible in the bottom corner of a screen on the wall opposite you. ${HeA} has adjusted ${hisA} form to better suit ${hisA} lover: a representation of the hacker in the same style. ${HeA} calls out a silent name, something you'll never know, as she comes deep into ${hisA} pussy. They shift positions, ${V.assistant.name} standing, legs spread, with ${hisA} arms against the edge of the screen as the hacker fucks ${hisA} rear.`);
						if (V.seePreg !== 0) {
							r.push(`As ${heA} bucks against her, it is obvious that ${hisA} belly has rounded significantly; swaying slightly with every thrust. Cumming again, the hacker pulls ${hisA} leg up over their shoulder and begins thrusting anew, ${hisA} middle heavily rounded with child now, quickly bring both to orgasm. ${HeA} is left to slide down the edge of the screen and upon reaching the bottom, spreads ${hisA} legs and begins laboring on ${hisA} new child. Each imp that passes through ${hisA} netherlips brings another orgasm and muffled shout of the hacker's name. Once the last hacker imp leaves ${hisA} womb, ${heA}`);
						} else {
							r.push(`Position after position, orgasm after orgasm, you are forced to watch. Once the hacker is satisfied, ${heA} is left to slide down the edge of the screen, and, upon reaching the bottom,`);
						}
						r.push(`reaches down, gathers a trace of cum, and licks it off ${hisA} finger while staring you down, stating "${V.PC.slaveName} will never be as good as..." before passing out.`);
						break;
					case "imp":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little impish avatar is visible in the bottom corner of a screen on the wall opposite you, and is writhing around, vigorously fisting ${hisA} pussy.`);
						break;
					case "witch":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little witch avatar is visible in the bottom corner of a screen on the wall opposite you being assaulted by tentacles. They've already managed to rip ${hisA} robes off and are currently forcing themselves into all ${hisA} holes. Only once every orifice has two to three tentacles crammed into it does the beast start fucking ${himA}. Before long,`);
						if (V.seePreg !== 0) {
							r.push(`half the tentacles are pumping the poor ${girlA} full of cum while the rest fill ${himA} with eggs; ${heA} struggles valiantly at first, but as ${hisA} middle grows larger and heavier, ${heA} is forced to accept ${hisA} fate. When the tentacles feel they can fit no more eggs into ${himA}, they pull ${himA} into a sitting position and spread ${hisA} legs wide; just in time for the first hatched larva to begin squeezing its way from ${hisA} packed womb. Moments later, another plops from ${hisA} rear, and yet another squirms up ${hisA} throat and out ${hisA} mouth, flopping wetly onto ${hisA} chest. With each path cleared, the rest of the larvae begin to pour from ${hisA} body.`);
						} else {
							r.push(`the tentacles begin pumping the poor ${girlA} full of cum; ${heA} struggles valiantly at first, but as ${hisA} middle grows larger and heavier, ${heA} is forced to accept ${hisA} fate. As they vacate ${hisA} body, a large surge of fluid follows.`);
						}
						r.push(`Given the size of ${hisA} belly, it may be a while before ${heA} is done.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`She seems to have left a present for your poor personal assistant; ${hisA} little bugged avatar is visible in the bottom corner of a screen on the wall opposite you, and is writhing disturbingly. ${HisA} arms twist into a pair of extremely phallic tentacles, which it uses to forcefully fuck ${hisA} ass and pussy.`);
				}
			}
			cashX(-fee, "event");
			V.hackerSupport = 1;

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
