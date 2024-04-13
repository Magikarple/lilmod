App.Events.SEBodyPuristProtest = class SEBodyPuristProtest extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.bodyPuristRiot === 1,
			() => V.puristRiotDone === 0,
			() => App.Events.effectiveWeek() >= V.projectN.phase1 + 1,
			() => V.projectN.status !== 9
		];
	}

	execute(node) {
		let r = [];
		V.puristRiotDone = 1;

		if (FutureSocieties.isActive('FSBodyPurist')) {
			repX(-1000, "event");
			V.arcologies[0].prosperity -= 3;
		}
		if (!FutureSocieties.isActive('FSBodyPurist')) {
			repX(-500, "event");
			V.arcologies[0].prosperity -= 1;
		}


		r.push(`You awake in the morning to the sound of yelling and screaming outside your penthouse. Quickly getting dressed, you grab your handgun${(S.Bodyguard) ? ", order your bodyguard to follow behind you," : ""} and rush outside to find the source of the commotion. As you open the doors to the penthouse, you're greeted with the sight of`);
		if (FutureSocieties.isActive('FSBodyPurist')) {
			r.push(`a massive, angry mob holding up signs reading "TRAITOR" and "VERMIN-LOVER", along with emblems of Vitruvian men. You can see what appears to be an effigy of a catgirl burning in the back, and the huge crowd appears to have completely surrounded the penthouse.`);
		}
		if (!FutureSocieties.isActive('FSBodyPurist')) {
			r.push(`a small group of angry, shouting men and women holding up signs reading "BEAST FUCKER" and emblems of Vitruvian men.`);
		}
		r.push(`The angry crowd is held back from your penthouse door by`);
		if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
			r.push(`a group of Knights in heavy Imperial Plate and their attached militia guards, the guard officers supporting the massive Knights with their riot shields.`);
		} else if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
			r.push(`a small unit of militia Praetorians in tight formation, pushing back rioters that press against their shieldwall with disciplined motions.`);
		} else {
			r.push(`a small unit of the arcology's guard officers, nervously holding the rioters at bay with huge black riot shields and batons.`);
		}
		if (V.mercenaries === 5) {
			r.push(`They're supported by a small group of your ${V.mercenariesTitle}, rough, power-armored mercenaries standing side by side with your officers to make sure the protest doesn't turn violent.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Despite how angry this crowd appears, they don't seem to be armed, and they're standing a good few feet back from the defensive line of your officers. When you step out, the chanting quiets for a moment, the protest group clearly expecting you to say something. To fill the sudden silence, you demand to know what's going on and who's in charge of this group. In response, a handsome blonde man stands up on a crate above the crowd and raises a megaphone to his lips.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`"WE ARE FREE CITIZENS, AND WE ARE EXPRESSING OUR ANGER - " The man's words are met by a chorus of cheers and shouts of the word 'anger' that briefly drown him out. " - THAT YOU HAVE NOT ONLY UTTERLY AND IRREVERSIBLY CORRUPTED THE HUMAN FORM WITH YOUR HORRIFIC BIOLOGICAL EXPERIMENTS, BUT HAVE DONE SO IN A THOROUGHLY UNETHICAL MANNER AND WITHOUT CONSULTING THE PEOPLE FIRST. WE DEMAND - " Again, his words are chorused by the crowd. " - AN IMMEDIATE CESSATION TO 'PROJECT N', A FULL PUBLIC APOLOGY, AND A GUARANTEE YOU WILL NEVER ENGAGE IN SUCH DESPICABLE BIOMUTATION AGAIN!" The crowd erupts into cheers and loud, domineering chanting.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`One of the riot officers glances back at you, awaiting an order. This situation seems fairly calm for the moment, but it could easily explode with the wrong words.`);
		if (FutureSocieties.isActive('FSBodyPurist')) {
			r.push(`You're going to need to convince people that natural catgirls are acceptable, or else these protests are just going to get worse in your Body Purist arcology.`);
		}
		App.Events.addParagraph(node, r);
		const choices = [];
		choices.push(new App.Events.Result(`Order your troops to disperse the protest by force`, force));
		choices.push(new App.Events.Result(`Attempt to get them to listen to reason`, reason));
		if (V.PC.skill.warfare >= 80) {
			choices.push(new App.Events.Result(`Use your fearsome reputation to intimidate them into surrender`, intimidate));
		}
		if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
			choices.push(new App.Events.Result(`Calm the crowd through appealing to the Gods`, gods));
		}

		if (FutureSocieties.isActive('FSTransformationFetishist')) {
			choices.push(new App.Events.Result(`Allude to democracy and remind the crowd of your arcology's popular love of transformation`, transform));
		}
		choices.push(new App.Events.Result(`Apologize and promise to discontinue Project N`, discontinue));
		App.Events.addResponses(node, choices);

		function force() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You don't have time for this shit. You tell the officer glancing at you to shut down these jumped-up hooligans without a second thought. With a nod, the officers press forward into the crowd in an organized fashion, to which they're met with instant pushback from the unarmed protestors. Someone throws a brick at the shieldwall which explodes into two parts with a loud smack, and then the entire situation erupts into chaotic, two-sided violence. As the officers start brawling with the protest crowd, trying to pin down fighting purists for arrest, you retreat back into your penthouse to watch the <span class="red">blood flow in the streets.</span> This solution never fails, but the injuries and damages it'll cause are sure to be <span class="red">expensive,</span> and riot scenes never look good in the media.`);
			cashX(-2500, "violent fighting");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function reason() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`"People, please!" You shout over at the assembled crowd. You start explaining to them that your catgirls are fully biological and not spliced from existent humans, making them totally natural and pure in their own right.`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				r.push(`Your explanation is cut off by someone in the back angrily shouting "BEAST FUCKER", a chant which is taken up by the rest of the massive group and totally drowns you out. After a few minutes of trying to get a word in, you throw up your hands and return to your penthouse. These protests will inevitably cause <span class="red">economic disruption,</span> but at least they probably won't cause any direct damage and will burn out after a week or two.`);
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				r.push(`The crowd is small enough that you're able to get in your explanations, and even engage in a brief back-and-forth conversation with the leader of the purist group. After showing him design documents and explaining what you know of the inner workings of the Project N process, the crowd's anger seems noticeably blunted, and they seem more willing to accept 'natural' catgirls. The crowd <span class="green">disperses,</span> and the blonde man even says that he'll be willing to give your ideas about 'natural' catgirls a chance - after all, there's a lot worse that happens in the Free Cities than genetic engineering.`);
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				repX(500, "event");
				V.arcologies[0].prosperity += 1;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function intimidate() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You brush some concrete dust from the thrown brick off your shoulder. This isn't the first enemy you've stared down, and it sure as hell isn't the scariest. Even above the crackle of electrobatons and the shouting of the crowd, the entire protest group seems to hear when you ask them coldly if they've forgotten who you are. As the crowd watches, you rattle off battlefields and massacres, the names of armies you've shattered and towns you've burnt to ashes, casually point a finger at the blonde man with the megaphone, say his full name, and tell him that if he says another word you'll give his two daughters to your mercenaries as rape-toys, cut off his dick, and use him as a whipping board until he bleeds out after a few years of abuse. The unarmed crowd freezes up, seemingly just now becoming aware that while they're unarmed, the muscular, scarred-over guardsmen holding crackling electrobatons in front of them are most certainly not. You take the opportunity to remind them that the security cameras outside your penthouse has recorded every face in the crowd, and anyone who so much as raises a weapon in defense has their home, occupation, and family on file. No one moves a muscle.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You tell the frozen crowd that you'll be continuing your work on Project N, and that if any one of them ever shows up at your house again, let alone with a gun, it'll be the worst, and last, decision they ever make. A few people at the back start to break off from the crowd. You turn back to your penthouse and walk inside as the crowd disintegrates. You have work to do, and you get the feeling these people <span class="green">aren't going to bother you again.</span>`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				repX(1000, "event");
				V.arcologies[0].prosperity += 3;
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				repX(500, "event");
				V.arcologies[0].prosperity += 1;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function gods() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Even surrounded by violence held at bay only by a thin line of heavily-armed guards, you maintain the serene aura of a priest. Unperturbed, you turn and order one of the terrified slaves watching in the doorway to fetch`);
			if (V.projectN.status >= 5) {
				r.push(`your designs`);
			}
			if (V.projectN.status <= 6) {
				r.push(`${V.subjectDeltaName}`);
			}
			r.push(
				r.pop() + ".",
				`"Have you forgotten the faces of the Gods, you sinners and fools? Beauty lies not simply in the perfection of the human form, but also in the life of our hands and the transcendence of our purity. Gaze upon my works and tell me you do not see within them the light of Bastet!" You chastise the furious crowd like they're children, and as the slave runs back out,`
			);
			if (V.projectN.status >= 5) {
				r.push(`you snatch the designs from her hands and hold up an early technical document from Nieskowitz, showing a serene-looking catgirl in full pharaonic attire, portrayed as an Egyptian deity`);
			}
			if (V.projectN.status <= 6) {
				r.push(`bringing ${V.subjectDeltaName} herself along. The poor catgirl, still barely capable of human speech, looks absolutely terrified as the large crowd looks her up and down, but doesn't move. With her snow-like fur, she bears a striking resemblance to iconographic Egyptian Goddesses, and you gesture towards her with a dramatic hand`);
			}
			r.push(
				r.pop() + ".",
				`"How dare you insult the purity of my designs!" You yell at the watching crowd, who seem to have grown quieter. "I have neither marred nor corrupted the human form, but instead brought another form of purity into being. Our dynastic ancestors could recognize this beauty, and you insult them with these blemishes and affronts!" Perhaps owing to the legitimate belief in Egyptian Revivalism across your arcology, the crowd seems genuinely shamed. People start to break off from the back of the crowd, and after a few minutes the furious cluster of rioters has <span class="green">dispersed,</span> seemingly embarrassed that they'd attack feline icons considered holy by the ancient Egyptians.`
			);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				repX(1000, "event");
				V.arcologies[0].prosperity += 3;
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				repX(500, "event");
				V.arcologies[0].prosperity += 1;
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function transform() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You shout over the crowd that they are a minority in your arcology, and that most people support transformationism. Even though this isn't a democracy, you tell that that they're democratically outnumbered and have no right to dictate your actions. This seems to rile up the small group further, but as they start skirmishing with the defensive line, another group of heavily-modified citizens show up, some with bats and batons of their own. Predicting what's about to happen, you retreat back into your penthouse as the first pained shouts echo through the air from the conflicting militia groups. Although there's sure to be <span class="red">blood in the streets</span> after this, at least with your citizens doing the dirty work it'll be <span class="green">cleaned up a lot faster,</span> and you've got a front-row seat to the violence through the observatory of your penthouse.`);
			repX(500, "event");
			cashX(-2500, "Militia warfare");
			V.arcologies[0].prosperity += 1;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function discontinue() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You loudly shout an apology over the crowd, which seems to get their attention and briefly calm their skirmishing. Having got the rioter's attention, you promise that you'll discontinue work on Project N and make any further biomodification efforts fully open to the public. Your outright agreement to their demands obviously surprises the rioting crowd, but it's enough to <span class="green">calm them down,</span> and the raised rifles drop after a few seconds of consideration. The blonde man leading the crowd tells you that they'll be back if you try this again, although you privately doubt they'd have the momentum for a second large protest if you were to quietly re-start Project N later. Shortly after, the crowd starts to disperse, leaving your officers exhaling in relief. Unfortunately, that'll put all the money you invested into Project N <span class="red">down the drain.</span>`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				repX(1000, "event");
				V.arcologies[0].prosperity += 3;
			}
			if (!FutureSocieties.isActive('FSBodyPurist')) {
				repX(500, "event");
				V.arcologies[0].prosperity += 1;
			}
			V.projectN.status = 0;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
