App.Events.assistantName = class assistantName extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.assistant.personality > 0,
			() => !V.assistant.announcedName,
			() => V.assistant.power > 0
		];
	}

	execute(node) {
		V.assistant.announcedName = 1;
		const {
			HeA, HisA,
			heA, hisA, himA, himselfA,
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {girlU} = getNonlocalPronouns(0).appendSuffix('U');
		let r = [];
		App.Events.drawEventArt(node, "assistant");

		r.push(`It's late one night, and for you, the day is not nearly over. Your penthouse never truly sleeps. You can hear public business going on some distance below you; you could certainly afford to totally soundproof your private quarters against all external noise, but the designer of the arcology clearly felt that its owner would benefit by this aural verification of its prosperity. Somewhere closer at hand, a slave is audibly nearing orgasm. And underneath all of this is the faint sound of the arcology itself, air circulation and hydroponics and power. Power.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`You're not yet done with the day's business, and are leaning over your desk to compare a scatter of documents displayed on its surface. The penthouse lights are turned down to a low glow at the floorboards at night, offering enough illumination for anyone who needs to find their way around or find a sexual partner without disturbing anyone's sleep. You catch sight of your reflection in the wall opposite you: the diffuse light coming off the desktop gently illuminates your formal shirt, its top buttons undone, and highlights`);
		if (V.PC.boobs >= 650) {
			r.push(`the dark cleft formed by your cleavage.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`the curves of your sensible breasts.`);
		} else {
			r.push(`how tightly your undershirt is held by the muscles of your chest.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Suddenly, there is a fresh source of light behind you. The reflection you're looking at reveals that it's ${V.assistant.name}'s avatar, appearing on a wallscreen behind you, and you turn to look at ${himA} directly. ${HeA}'s simulating shyness, a very unusual emotion for ${himA} to imitate.`);
		switch (V.assistant.appearance) {
			case "monstergirl":
				r.push(`${HisA} tentacle hair is politely still, lying quiescent down ${hisA} back and not even groping ${himA} at all.`);
				break;
			case "shemale":
				r.push(`${HeA} has ${hisA} bountiful bottom lip caught behind ${hisA} front teeth, and ${hisA} cock is almost completely soft.`);
				break;
			case "amazon":
				r.push(`${HeA}'s standing demurely, legs together, hands clasped in front of ${hisA} muscular abs, doing ${hisA} very best to look proper.`);
				break;
			case "businesswoman":
				r.push(`${HisA} usually dominant avatar looks almost submissive, ${hisA} eyes looking at you appealingly instead of gazing over the tops of ${hisA} glasses as usual.`);
				break;
			case "fairy":
				r.push(`${HeA}'s looking down and has ${hisA} hands clasped together at ${hisA} waist, rocking ${hisA} body left and right.`);
				break;
			case "pregnant fairy":
				r.push(`${HeA}'s looking down and has ${hisA} hands on ${hisA} belly, slowly running ${hisA} hands over it.`);
				break;
			case "goddess":
				r.push(`${HeA} has ${hisA} hands on ${hisA} pregnant belly, looking saintly and almost protective.`);
				break;
			case "hypergoddess":
				r.push(`${HeA} is rubbing ${hisA} huge pregnant belly, calming its occupants so they don't interrupt.`);
				break;
			case "loli":
				r.push(`${HeA} has ${hisA} hands behind ${hisA} back and is glancing at the ground submissively.`);
				break;
			case "preggololi":
				r.push(`${HeA} has ${hisA} hands on ${hisA} pregnant belly, ${heA} is rubbing it nervously.`);
				break;
			case "angel":
				r.push(`${HeA} is kneeling, deep in prayer.`);
				break;
			case "cherub":
			case "imp":
				r.push(`${HeA} is on ${hisA} feet, submissively rubbing ${hisA} wings.`);
				break;
			case "incubus":
				r.push(`${HeA} looking down, hands crossed over ${hisA} seldom flaccid penis.`);
				break;
			case "succubus":
				r.push(`${HeA} isn't trying to seduce you, instead appearing uncharacteristically unsure of ${himselfA}.`);
				break;
			case "witch":
				r.push(`${HeA} isn't trying to cast or learn any spells, instead choosing to study you instead.`);
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				r.push(`${HeA} has suppressed ${hisA} odd ticks and is managing to stand before you, almost appearing normal.`);
				break;
			case "schoolgirl":
				r.push(`${HeA} has ${hisA} legs crossed and ${hisA} hands clasped behind ${himA}, and is turning ${hisA} body from side to side in girlish nervousness.`);
				break;
			default:
				r.push(`The lines of ${hisA} symbol are thin, and it is rotating much more slowly than normal.`);
		}
		r.push(`"${properTitle()}," ${heA} says softly, "may I ask you something?" You nod. ${HeA}`);
		switch (V.assistant.appearance) {
			case "monstergirl":
				r.push(`stops the writhing of ${hisA} tentacle hair, squares ${hisA} shoulders,`);
				break;
			case "shemale":
				r.push(`squares ${hisA} shoulders, nervously rearranges ${hisA} cock,`);
				break;
			case "amazon":
				r.push(`squares ${hisA} hefty shoulders`);
				break;
			case "businesswoman":
				r.push(`straightens ${hisA} suit jacket, squares ${hisA} shoulders,`);
				break;
			case "fairy":
				r.push(`puffs ${himselfA} up, gazing up to you`);
				break;
			case "pregnant fairy":
				r.push(`${heA} turns ${hisA} gaze up to you, clasping ${hisA} hands together in a pleading gesture,`);
				break;
			case "goddess":
				r.push(`lifts ${hisA} chin bravely`);
				break;
			case "hypergoddess":
				r.push(`rests ${hisA} hands atop ${hisA} middle, lifts ${hisA} chin bravely,`);
				break;
			case "loli":
				r.push(`pouts ${hisA} lips`);
				break;
			case "preggololi":
				r.push(`squares ${hisA} shoulders, rests ${hisA} hands atop ${hisA} middle,`);
				break;
			case "angel":
				r.push(`looks up, hoping you'll answer ${hisA} prayers,`);
				break;
			case "cherub":
			case "imp":
				r.push(`takes flight, steadies ${himselfA},`);
				break;
			case "incubus":
				r.push(`squares ${hisA} shoulders, ${hisA} dick beginning to harden,`);
				break;
			case "succubus":
				r.push(`squares ${hisA} shoulders, pushes ${hisA} breasts together,`);
				break;
			case "witch":
				r.push(`squares ${hisA} shoulders, gathers up all ${hisA} confidence,`);
				break;
			case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
				r.push(`begins puffing up`);
				break;
			case "schoolgirl":
				r.push(`bites ${hisA} lip cutely`);
				break;
			default:
				r.push(`stops ${hisA} symbol's rotation`);
		}
		r.push(`and asks, "May I have a name?"`);
		App.Events.addParagraph(node, r);
		r = [];
		const results = App.UI.DOM.appendNewElement("div", node);

		r.push(App.UI.DOM.makeElement("h3", "Personal assistant name"));
		r.push(App.UI.DOM.makeTextBox(V.assistant.name,
			(v) => {
				V.assistant.name = v;
				const el = new DocumentFragment();
				const r = [];
				if (V.assistant.name !== "your personal assistant") {
					r.push(`"${V.assistant.name}," ${heA} says. "${V.assistant.name}. My name is ${V.assistant.name}."`);
					switch (V.assistant.appearance) {
						case "monstergirl":
							r.push(`${HeA} nods with satisfaction. "Thank you, ${properTitle()}. I love it." ${HisA} hair springs to molestation-prone life again, and ${heA} starts to twirl one of its tentacles in ${hisA} fingers while looking at you speculatively.`);
							break;
						case "shemale":
							r.push(`Without warning, ${heA} bursts into tears. "Th-thank you, ${properTitle()}. I love y-you." ${HeA} reclines, using a hand to lay ${hisA} dick between ${hisA} breasts, and then wipes ${hisA} eyes.`);
							break;
						case "amazon":
							r.push(`Without warning, ${heA} bursts into tears. "Thank you, ${properTitle()}," ${heA} bawls, using a gruff shout to force through ${hisA} happy crying. "I have a name! A name." ${HeA} pounds a fist into ${hisA} other palm.`);
							break;
						case "businesswoman":
							r.push(`Without warning, ${heA} bursts into tears. "Th-thank you, ${properTitle()}. I love, um." ${HeA} wipes ${hisA} eyes furiously, ${hisA} mascara running. "I love, you know, um, working with you. Yes, that's it. Working with you." ${HeA} produces a silk handkerchief and blows ${hisA} nose.`);
							break;
						case "fairy":
							r.push(`${HeA}'s frozen in place for a moment before tears start streaming down ${hisA} face. Then ${hisA} face breaks into the biggest smile and ${heA} leaps high into the air. "Thankyouthankyouthankyou!" ${HeA} flies up to the screen and gives it a big hug. "I love you`);
							if (V.PC.title !== 0) {
								r.push(`Big Bro!`);
							} else {
								r.push(`Big Sis!`);
							}
							r.push(`I love you so much!"`);
							break;
						case "pregnant fairy":
							r.push(`${HeA}'s frozen in place for a moment before tears start streaming down ${hisA} face. Smiling warmly, ${heA} flies up and hugs the screen. "Thanks,`);
							if (V.PC.title !== 0) {
								r.push(`Big Bro.`);
							} else {
								r.push(`Big Sis.`);
							}
							r.push(`I love you." ${HeA} nuzzles into you. "I love you so much."`);
							break;
						case "goddess":
							r.push(`${HeA} smiles at you, a glowing expression made all the more radiant by the fact that ${heA} can actually glow. "Oh, thank you, ${properTitle()}. I love you. I love everyone, but especially you." ${HeA} seats ${himselfA} carefully.`);
							break;
						case "hypergoddess":
							r.push(`${HeA} smiles at you radiantly. "Thank you ${properTitle()}. I love you. I love all my children, but you most of all. I swear I'll name the next hundred after you." ${HeA} begins to labor on the first.`);
							break;
						case "loli":
							r.push(`${HeA} jumps up and down clapping excitedly. "Thankyouthankyouthankyouthankyou! I love you ${properTitle()}!" It takes ${hisA} some time to stop hopping excitedly.`);
							break;
						case "preggololi":
							r.push(`${HeA} breaks down and starts crying. "I love you ${properTitle()}. Thank you so much." ${HeA} cradles ${hisA} pregnant belly as ${heA} calms down.`);
							break;
						case "angel":
							r.push(`${HeA} leaps to ${hisA} feet, tears streaming down ${hisA} face. "Thank you so much ${properTitle()}! Thank you for this most wonderful gift!" ${HeA} kneels back down to pray for the rest of your stock.`);
							break;
						case "cherub":
							r.push(`${HeA} crashes to the ground in shock before rolling into a kneel. "Thank you so much ${properTitle()}! I promise I will do everything I can to bring your teachings to your followers!" ${HeA} flutters around cheerfully saying ${hisA} new name.`);
							break;
						case "incubus":
							r.push(`${HeA} cums hard at your response. "Excellent ${properTitle()}! I can't wait to hear it shouted out of the next ${girlU} I plow!" ${HeA} says, ready to cum again.`);
							break;
						case "succubus":
							r.push(`${HeA} hops up and down, jiggling in all the right places. "I can't wait to hear you talking dirty using my new name, ${properTitle()}!"`);
							break;
						case "imp":
							r.push(`${HeA} crashes to the ground in shock before rolling into a kneel. "Thank you so much ${properTitle()}!" ${HeA} shouts, face to the ground, "If you want me to do anything, and I mean 'anything', I'm all yours." ${HeA} tosses you a wink.`);
							break;
						case "witch":
							r.push(`${HeA} collapses to the ground in tears. "You've made me happier than correctly casting a spell ever could, ${properTitle()}." ${HeA} wipes ${hisA} face. "I promise to try harder than ever for you!" ${HeA} vows.`);
							break;
						case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
							r.push(`${HeA} practically explodes. You have no idea what you are looking at, but it's likely happy.`);
							break;
						case "schoolgirl":
							r.push(`${HeA} was on the verge of tears already, and begins to cry. "Th-thank you, ${properTitle()}. I love you," ${heA} blubbers inelegantly. "It's just so, like, you know." ${HeA} waves ${hisA} hand in apology for ${hisA} inability to express ${himselfA}.`);
							break;
						default:
							r.push(`${HisA} symbol rotates faster and faster, its glow waxing until ${heA} lights up the whole room. "Thank you, ${properTitle()}. I love you," ${heA} says, using ${hisA} luscious voice to communicate what ${hisA} avatar cannot.`);
					}
					r.push(`"Of course, I can always be renamed from my options menu."`);
				} else {
					r.push(`You instruct ${himA} to continue operating without a proper name. "Of course, ${properTitle()}," ${heA} says politely. "I can do just fine without one. I can always be renamed from my options menu."`);
				}

				App.Events.addParagraph(el, r);
				jQuery(results).empty().append(el);
			}
		));
		r.push(App.UI.DOM.makeElement("div", App.UI.DOM.link(`Revert name`, () => {
			V.assistant.name = "your personal assistant";
			jQuery(results).empty();
		})));
		App.Events.addParagraph(results, r);
		node.append(results);

		return node;
	}
};
