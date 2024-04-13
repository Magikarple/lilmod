App.Events.SEBodyPuristRiot = class SEBodyPuristRiot extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.puristsFurious === 1,
			() => (V.puristRiotDone === 0),
			() => App.Events.effectiveWeek() >= V.projectN.phase4 + 1,
			() => V.projectN.status !== 9
		];
	}

	execute(node) {
		let r = [];
		V.puristRiotDone = 1;

		if (FutureSocieties.isActive('FSBodyPurist')) {
			repX(-2000, "event");
			cashX(-18000, "Body purist Riots");
			V.arcologies[0].prosperity -= 4;
		}
		if (!FutureSocieties.isActive('FSBodyPurist')) {
			repX(-500, "event");
			cashX(-5000, "Body purist Riots");
			V.arcologies[0].prosperity -= 1;
		}

		r.push(`You awake in the morning to the sound of yelling and screaming outside your penthouse. Quickly getting dressed, you grab your handgun${(S.Bodyguard) ? ", order your bodyguard to follow behind you," : ""} and rush outside to find the source of the commotion. As you open the doors to the penthouse, you're greeted with the sight of`);
		if (FutureSocieties.isActive('FSBodyPurist')) {
			r.push(`an enormous, heavily armed mob surrounding you. The sea of shouting, furious faces looks to have completely encircled the penthouse, and almost all of them are holding batons, rifles, and whatever else they seem to have been able to get their hands on. Some are even holding up signs bearing the orange sun logo of the Sons of Sekhmet.`);
		}
		if (!FutureSocieties.isActive('FSBodyPurist')) {
			r.push(`a small group of furious men and women carrying batons and rifles. Some are holding up signs reading "BEAST FUCKER", symbols of Vitruvian men, or painted-on orange Suns that you recognize as the logo of the Sons of Sekhmet.`);
		}
		r.push(`The furious crowd is being held back from your gates by`);
		if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
			r.push(`a group of Knights in heavy Imperial Plate and their attached militia guards, the guard officers supporting the massive Knights with their riot shields.`);
		} else if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
			r.push(`a small unit of militia Praetorians in tight formation, pushing back rioters that press against their shieldwall with disciplined motions.`);
		} else {
			r.push(`a small unit of the arcology's guard officers, nervously holding the rioters at bay with huge black riot shields and batons.`);
		}
		if (V.mercenaries === 5) {
			r.push(`They're supported by a small group of your ${V.mercenariesTitle}, rough, power-armored mercenaries standing side by side with your officers to hold the riot at bay.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The riot erupts with a new wave of noise as you step out from the penthouse, and a couple of them press forward into the defensive line to be beaten back with crackling electrobatons. You demand to know what's going on and who's in charge of this affair as the rioters and officers exchange glancing blows. Someone in the back hurls a rock in your direction which shatters loudly on the door of your penthouse as a handsome, young blonde man stands up above the crowd on a crate and holds up a megaphone to his lips. Even through the orange bandana over his face, you recognize him as a prominent bureaucrat, and a public advocate for body purism.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`"WE ARE FREE CITIZENS, AND WE ARE EXPRESSING OUR DISGUST - " The man's words are met by a chorus of cheers and shouts of the word 'disgust' that briefly drown him out. " - THAT YOU HAVE NOT ONLY UTTERLY AND IRREVERSIBLY CORRUPTED THE HUMAN FORM WITH YOUR HORRIFIC BIOLOGICAL EXPERIMENTS, BUT HAVE CONDUCTED THEM BENEATH OUR NOSES AND ENTIRELY UNETHICALLY. WE DEMAND - " Again, his words are chorused by the crowd, still pushing forward against the defensive line. " - AN IMMEDIATE CESSATION TO 'PROJECT N', A FULL PUBLIC APOLOGY, AND A GUARANTEE YOU WILL NEVER ENGAGE IN SUCH DESPICABLE BIOMUTATION AGAIN!" The crowd erupts into cheers and loud, domineering chanting.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`One of the riot officers glances back at you, awaiting an order. This whole situation is just waiting to explode.`);
		if (FutureSocieties.isActive('FSBodyPurist')) {
			r.push(`You're going to need to convince people that natural catgirls are acceptable, or else these riots are just going to get worse in your Body Purist arcology.`);
		}
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Order your troops to disperse the riot by force`, force));
		choices.push(new App.Events.Result(`Attempt to get them to listen to reason`, reason));
		if (V.PC.skill.warfare >= 80) {
			choices.push(new App.Events.Result(`Use your fearsome reputation to intimidate them into surrender`, reputation));
		}
		if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
			choices.push(new App.Events.Result(`Calm the crowd through appealing to the Gods`, egypt));
		}
		if (FutureSocieties.isActive('FSTransformationFetishist')) {
			choices.push(new App.Events.Result(`Allude to democracy and remind the crowd of your arcology's popular love of transformation`, transform));
		}
		choices.push(new App.Events.Result(`Apologize and promise to discontinue Project N`, stop));
		App.Events.addResponses(node, choices);

		function force() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`"Shut this nonsense down." You tell the guard officer glancing at you. That's all it takes for the scene to explode into catastrophic violence on both sides. As the guards slam forward into the crowd and the explosive cracks of gunfire going off light out the outside of your penthouse, you retreat back inside the doors before anyone can get a shot off at you. Inside, you walk up to a glass-windowed observatory and safely watch from above`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				r.push(`as pure chaos unfolds below, fires from thrown bombs already starting to spread as your guards and the rioters transform the upper decks of the arcology into a <span class="red">wartorn hellscape.</span>`);
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				r.push(`as the riot scene erupts into violent struggle, heavily-armed officers beating rioters into submission with electrobatons as the riot groups split into violent clusters, firing wildly into groups of advancing soldiers. <span class="red">This isn't going to look good.</span>`);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function reason() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You raise your hands and tell everyone to just calm down, and that you can surely work this all out. In response, one of the furious crowd members shouts that you're a traitor, which is immediately taken up by the rest of the crowd. Raising your voice over them, you try and tell them that there's nothing wrong with natural catgirls, that the claims of the Sons of Sekhmet were wildly exaggerated by delusional terrorists, and that you only withheld information to let the scientists work in peace, but if anyone's listening, they stop when someone hurls a molotov cocktail into the defensive line, exploding with a burst of flames that singes your face. Before you can get in another word, both sides <span class="red">explode into violence,</span> forcing you to retreat back into the penthouse as the rioters and guards start firing into one another, transforming the upper deck of your arcology into an instant warzone. This isn't going to look good, but at least you <span class="green">saved a little face</span> trying to calm them down on camera before the violence erupted.`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				repX(1000, "event");
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				repX(250, "event");
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function reputation() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You brush some concrete dust from the thrown brick off your shoulder. This isn't the first enemy you've stared down, and it sure as hell isn't the scariest. Even above the crackle of electrobatons and the shouting of the crowd, the entire riot group seems to hear when you ask them coldly if they've forgotten who you are. As the crowd watches, you rattle off battlefields and massacres, the names of armies you've shattered and towns you've burnt to ashes, casually point a finger at the blonde man with the megaphone, say his full name, and tell him that if he says another word you'll give his two daughters to your mercenaries as rape-toys, cut off his dick, and use him as a whipping board until he bleeds out after a few years of abuse. The crowd might have guns and knives, but they still quiet down at your words, balking somewhat at the threat of brutality. You take the opportunity to remind them that the security cameras outside your penthouse has recorded every face in the crowd, and anyone who actually uses the weapons in their hands has their home, occupation, and family on file. No one moves a muscle.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You tell the frozen crowd that you'll be continuing your work on Project N, and that if any one of them ever shows up at your house again with a gun, it'll be the worst, and last, decision they ever make. A few people at the back start to break off from the crowd. You turn back to your penthouse and walk inside as the crowd disintegrates. You have work to do, and you get the feeling these people <span class="green">aren't going to bother you again.</span>`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				repX(2000, "event");
				cashX(18000, "Body purist riots stopped");
				V.arcologies[0].prosperity += 4;
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				repX(500, "event");
				cashX(5000, "Body purist riots stopped");
				V.arcologies[0].prosperity += 1;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function egypt() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Even surrounded by violence held at bay only by a thin line of heavily-armed guards, you maintain the serene aura of a priest. Unperturbed, you turn and order one of the terrified slaves watching in the doorway to fetch your designs. "Have you forgotten the faces of the Gods, you sinners and fools? Beauty lies not simply in the perfection of the human form, but also in the life of our hands and the transcendence of our purity. Gaze upon my works and tell me you do not see within them the light of Bastet!" You chastise the furious crowd like they are children, and as the slave runs back out, you snatch the designs from her hands and hold up an early technical document from Nieskowitz, showing a serene-looking catgirl in full pharaonic attire, portrayed as an Egyptian deity. "How dare you insult the purity of my designs!" You yell at the watching crowd, who seem to have grown quieter. "I have neither marred nor corrupted the human form, but instead brought another form of purity into being. Our dynastic ancestors could recognize this beauty, and you insult them with these blemishes and affronts!" Perhaps owing to the legitimate belief in Egyptian Revivalism across your arcology, the crowd seems genuinely shamed. People start to break off from the back of the crowd, and after a few minutes the furious cluster of rioters has <span class="green">dispersed,</span> seemingly embarrassed that they'd attack feline icons considered holy by the ancient Egyptians.`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				repX(4000, "event");
				cashX(18000, "Body purist riots stopped");
				V.arcologies[0].prosperity += 4;
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				repX(1000, "event");
				cashX(5000, "Body purist riots stopped");
				V.arcologies[0].prosperity += 1;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function transform() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You shout over the crowd that they are a minority in your arcology, and that most people support transformationism. Even though this isn't a democracy, you tell that that they're democratically outnumbered and have no right to dictate your actions. This seems to rile up the small group further, but as they start skirmishing with the defensive line, another group of heavily-modified citizens show up, sporting bats and batons of their own. Some of the armed purist protestors turn back to face them, readying their guns. Predicting what's about to happen, you retreat back into your penthouse as the first gunshots echo through the air from the conflicting militia groups. Although there's sure to be <span class="red">blood in the streets</span> after this, at least with your citizens doing the dirty work it'll be <span class="green">cleaned up a lot faster,</span> and you've got a front - row seat to the violence through the observatory of your penthouse.`);
			repX(500, "event");
			V.arcologies[0].prosperity += 1;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function stop() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You loudly shout an apology over the crowd, which seems to get their attention and briefly calm their skirmishing. Having got the rioter's attention, you promise that you'll discontinue work on Project N and make any further biomodification efforts fully open to the public. Your outright agreement to their demands obviously surprises the rioting crowd, but it's enough to <span class="green">calm them down,</span> and the raised rifles drop after a few seconds of consideration. The blonde man leading the crowd tells you that they'll be back if you try this again, although you privately doubt they'd have the momentum for a second riot if you were to quietly re-start Project N later. Shortly after, the crowd starts to disperse, leaving your officers exhaling in relief. Unfortunately, that'll put all the money you invested into Project N <span class="red">down the drain.</span>`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				repX(2000, "event");
				cashX(18000, "Body purist riots stopped");
				V.arcologies[0].prosperity += 4;
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				repX(500, "event");
				cashX(5000, "Body purist riots stopped");
				V.arcologies[0].prosperity += 1;
			}
			V.projectN.status = 0;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
