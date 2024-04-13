App.Events.PPeacekeepersInfluence = class PPeacekeepersInfluence extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.peacekeepers.state === 3 && V.peacekeepers.strength >= 50,
			() => V.peacekeepers.influenceAnnounced === 0,
		];
	}

	execute(node) {
		V.nextButton = "Continue";

		V.peacekeepers.influenceAnnounced = 1;

		App.Events.addParagraph(node, [`General ${V.peacekeepers.generalName} has successfully declared his independence from his mother country. That nation recruited, trained, and commanded him and all his men and women, but then it sent him to keep the peace in a war-torn region, failed to give him the support he needed, and then tried to withdraw him when the costs of what support they were willing to send overtopped what weak political will the old world still has. In truth, it was only a half-step from peacekeeping force to government for General ${V.peacekeepers.generalName} and his troops. They were already the only source of public order in that area.`]);
		let r = [];
		r.push(`You provided money to General ${V.peacekeepers.generalName} to help him through this difficult time of transition, making him an investment of yours. That investment has already shown a small return; the first regular tribute of slaves arrived this week, free of charge. General ${V.peacekeepers.generalName} seems determined to pay his debts properly, and he sent you good stock, healthy menials ready for`);
		if (V.menials) {
			r.push(`work${(sweatshopCount() > 0) ? `. They're already toiling away in ${V.arcologies[0].name}'s sweatshops` : ``}.`);
		} else {
			r.push(`resale.`);
		}
		r.push(`Even better, it seems you can expect to receive a similar shipment in perpetuity. The number of downtrodden people living in the ruins of a small country dwarfs even a Free City's appetite for slaves.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`As you review intelligence from the area at your desk,`);
		if (V.assistant.personality > 0) {
			const {
				HeA, HisA,
				heA, hisA, himA, girlA, himselfA, womanA, loliA
			} = getPronouns(assistant.pronouns().main).appendSuffix("A");
			r.push(`${V.assistant.name}'s avatar pops up.`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`The little monster ${girlA} toys with ${hisA} tentacle hair until you give ${himA} your attention. When ${heA} sees that ${heA} has it, ${heA} wiggles ${hisA} hips at you, and gives you a wink.`);
					break;
				case "shemale":
					r.push(`The slutty little shemale pops up, literally, bouncing upward buoyantly in a way that makes ${hisA} boobs jiggle ridiculously and ${hisA} cock slap wetly against ${hisA} stomach.`);
					break;
				case "schoolgirl":
					r.push(`The slutty little school ${girlA} pops up, literally, bouncing upward so violently that ${hisA} skirt flies up and exposes everything. ${HeA} flips it back down with a giggle.`);
					break;
				case "goddess":
					r.push(`The beautiful, gravid goddess appears with ${hisA} usual wash of radiant golden light, and gently smoothens one of ${hisA} long tresses with a soft hand until ${heA} has your attention.`);
					break;
				case "businesswoman":
					r.push(`The stacked business ${womanA} appears hugging a tablet to ${hisA} generous bosom, squashing ${hisA} cleavage upward and indicating that ${heA} has important information for you.`);
					break;
				case "amazon":
					r.push(`The ferocious little warrior ${womanA} stands up straight, cutely muscular and full of self-importance, as though ${heA} has something ${heA}'d like to share.`);
					break;
				case "fairy":
					r.push(`The little fairy appears on your table, flailing around while ${hisA} body lights up. ${HeA} bends over and starts slapping ${hisA} butt at you and giggling. ${HisA} slapping turns into groping, and ${heA} gets lost in molesting ${hisA} own ass. Clearing your throat, ${heA} looks upside down between ${hisA} legs and sees that ${heA} finally has your attention.`);
					break;
				case "pregnant fairy":
					r.push(`The little fairy appears on your table, leaning towards you and squishing ${hisA} breasts together to show off ${hisA} cleavage. You completely fail to notice ${himA}. ${HeA} tries again, turning around and bending over and shaking ${hisA} butt while looking back at you. Yet again ${heA} fails to draw your attention. Frustrated, ${heA} sits on the table, spreading ${hisA} legs and showing off ${hisA} pussy. Peeking over ${hisA} swollen belly, ${heA} sees that you're not even looking at ${himA}. ${HisA} tiny body is just too small to garner your attention. It's not for a few minutes until you notice ${himA} sitting up on the desk, looking away with ${hisA} arms crossed and pouting.`);
					break;
				case "hypergoddess":
					r.push(`The beautiful, massively gravid goddess appears with ${hisA} usual wash of radiant golden light, and gently calms ${hisA} squirming occupants until ${heA} has your attention.`);
					break;
				case "loli":
					r.push(`The cute little ${loliA} pops up, literally, bouncing upward again and again until ${heA} is absolutely certain ${heA} has your attention.`);
					break;
				case "preggololi":
					r.push(`The slutty little ${loliA} appears bent over flashing ${hisA} pregnant pussy at you. ${HeA} giggles and straightens up once ${heA} is absolutely certain you've given ${hisA} moist cleft enough attention.`);
					break;
				case "angel":
					r.push(`The beautiful angel appears in ${hisA} usual wash of radiant white light and gently folds ${hisA} wings behind ${himA} as ${heA} patiently awaits your attention.`);
					break;
				case "cherub":
					r.push(`The cute little cherub appears in ${hisA} usual wash of radiant white light and flutters around until ${heA} has your attention.`);
					break;
				case "incubus":
					r.push(`The hung sex demon pops up, bouncing upward buoyantly in a way that makes ${hisA} erect cock slide along ${hisA} stomach. Stimulation just enough, ${heA} blows a huge load across your desk while moaning lewdly; ${heA} knows how to get your attention.`);
					break;
				case "succubus":
					r.push(`The slutty little sex demoness pops up.`);
					switch (V.assistant.fsAppearance) {
						case "paternalist":
							r.push(`"${V.PC.slaveName}, would you help me with this zipper?"`);
							break;
						case "degradationist":
							r.push(`"${V.PC.slaveName}, what do you think of these piercings?"`);
							break;
						case "physical idealist":
							r.push(`"${V.PC.slaveName}, bet you I can lift this!"`);
							break;
						case "hedonistic decadence":
							r.push(`"${V.PC.slaveName}, is there food on my face?"`);
							break;
						case "repopulation focus":
							r.push(`"${V.PC.slaveName}, my water broke."`);
							break;
						case "gender radicalist":
							r.push(`"${V.PC.slaveName}, do you think`);
							if (V.arcologies[0].FSGenderRadicalistLawFuta === 3) {
								r.push(`my ass could be bigger?"`);
							} else {
								r.push(`this outfit makes me look too girly?"`);
							}
							break;
						case "gender fundamentalist":
							r.push(`"${V.PC.slaveName}, would I make a good mother?"`);
							break;
						case "asset expansionist":
							r.push(`"${V.PC.slaveName}, I feel like my breasts got smaller, what do you think?"`);
							break;
						case "transformation fetishist":
							r.push(`"${V.PC.slaveName}, how do you think these implants would look in me?"`);
							break;
						case "pastoralist":
							r.push(`"Oh ${V.PC.slaveName}, I'm so backed up. Would you give me a hand?"`);
							break;
						case "slimness enthusiast":
							r.push(`"${V.PC.slaveName}, do`);
							if (V.arcologies[0].FSSlimnessEnthusiastLaw === 1) {
								r.push(`these look bigger to you?"`);
							} else {
								r.push(`you think they're getting bigger?"`);
							}
							break;
						case "slave professionalism":
							r.push(`"Hey ${V.PC.slaveName}, what's most useful when it's long and hard? An education, of course!"`);
							break;
						case "petite admiration":
							r.push(`"${V.PC.slaveName}, I think I grew a little."`);
							break;
						case "statuesque glorification":
							r.push(`"${V.PC.slaveName}, are these heels long enough?"`);
							break;
						default: r.push(`${HeA} spasms with a powerful orgasm and moans lewdly and loudly.`);
					}
					r.push(`${HeA} knows just how to get your attention.`);
					break;
				case "imp":
					r.push(`The scandalous little imp swoops into view and eagerly stares at you, as if ${heA} has some juicy gossip to tell you.`);
					break;
				case "witch":
					r.push(`The cute little witch pops up, before blushing and undressing. An important message for you is scrawled across ${hisA} skin.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`Your shapeshifting assistant pops out of a crack on your desk, ${hisA} belly swollen with something. ${HeA} bends over and pushes out information for you, though you're not sure how.`);
					break;
				default:
					r.push(`The round symbol pulses brightly, ${hisA} way of indicating that ${heA} has important information for you.`);
			}
			r.push(`"General ${V.peacekeepers.generalName}'s men and women are using sex slaves," ${heA} reports, and brings up a trove of surveillance data to back up ${hisA} assertion. "It was unofficial at first,`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`just people with weapons in their hands doing what people with power over others do," ${heA} explains approvingly, showing ${hisA} fangs.`);
					break;
				case "shemale":
					r.push(`just hot guys sticking their dicks in the local girls," ${heA} explains, masturbating openly.`);
					break;
				case "schoolgirl":
					r.push(`just boys blowing off a little steam with the local girls," ${heA} explains nastily.`);
					break;
				case "goddess":
					r.push(`just the sort of thing men with arms in their hands have been doing to the locals for thousands of years," ${heA} explains.`);
					break;
				case "businesswoman":
					r.push(`normal behavior for soldiers under severe stress in areas with civilians," ${heA} explains, sounding vaguely disapproving of something so uncivilized.`);
					break;
				case "amazon":
					r.push(`just warriors letting off steam with the local girls," ${heA} explains, making it sound like the most natural thing in the world.`);
					break;
				case "fairy":
					r.push(`just some boys and girls doing those bedroom sports for indoor types" ${heA} explains.`);
					break;
				case "pregnant fairy":
					r.push(`just some guys having fun with those bigger girls" ${heA} explains, sounding annoyed for some reason.`);
					break;
				case "hypergoddess":
					r.push(`just the boys trying to make sure they have someone to carry on their legacy, I'm sure," ${heA} states hopefully.`);
					break;
				case "loli":
					r.push(`just wrestling and dancing," ${hisA} innocence shining through ${hisA} explanation.`);
					break;
				case "preggololi":
					r.push(`just the guys enjoying some fresh young girls," ${heA} says with a hint of jealousy.`);
					break;
				case "angel":
					r.push(`just the strong taking what they want without consideration," ${heA} sighs, sounding disapproving of something so uncivilized.`);
					break;
				case "cherub":
					r.push(`simply the satisfaction of one's urges," ${heA} says with disappointment.`);
					break;
				case "incubus":
					r.push(`just men enjoying new holes," ${heA} explains, masturbating openly.`);
					break;
				case "succubus":
					r.push(`just seductresses doing what they do," ${heA} explains, masturbating openly.`);
					break;
				case "imp":
					r.push(`just the victors enjoying the spoils," ${heA} says, a hint of excitement in ${hisA} voice.`);
					break;
				case "witch":
					r.push(`just soldiers relaxing after a hard day," ${heA} explains.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`just the conquerors using what's theirs," ${heA} explains, making it sound like the most natural thing in the world.`);
					break;
				default:
					r.push(`just the common behavior of troops under severe stress in areas with civilians," ${heA} explains.`);
			}
			r.push(`"But it's spread, and with their independence, General ${V.peacekeepers.generalName} has decided to bring it under control by setting up official slave brothels for his troops. <span class="yellow">The officer in charge of staffing these doesn't have enough money to pay Free Cities prices, but I've added him to the standard slave sale interface.</span> Selling sex slaves to him at a price General ${V.peacekeepers.generalName}'s people can afford would bring them closer to ${V.arcologies[0].name}."`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`${HeA} strokes ${hisA} cocks meaningfully. "Selling them a particularly distinctive, valuable girl might even influence their tastes. Imagine, manipulating an entire army by providing it with skilled whores." ${HeA} shudders.`);
					break;
				case "shemale":
					r.push(`${HeA} strokes ${hisA} cock meaningfully. "Oh, and they could even develop into a regular market if they're sold distinctive, valuable girls. We should totally get them addicted to anal whores." To make ${hisA} meaning perfectly clear, ${heA} sticks out ${hisA} butt and winks ${hisA} lewd little anus.`);
					break;
				case "schoolgirl":
					r.push(`${HeA} flashes ${hisA} breasts, as though to an appreciative crowd. "If we sell them hotties, it'll get them even more used to us," ${heA} says naughtily. "Get them used to Free Cities girls sucking their dicks all the time!"`);
					break;
				case "goddess":
					r.push(`${HeA} caresses ${hisA} pregnancy. "If we sell them some of our best slaves, I'm sure their virtues will win General ${V.peacekeepers.generalName}'s men and women over," ${heA} says confidently. "It'd be like sending some of my own out to love each and every one of them."`);
					break;
				case "businesswoman":
					r.push(`${HeA} fans ${himselfA}, flushing at the possibilities. "Just think, they might develop into a regular, profitable market for sex slaves if they're sent top-quality product at first to build up the brand," ${heA} says huskily, and then climaxes.`);
					break;
				case "amazon":
					r.push(`${HeA} flexes ${hisA} muscles, crossing ${hisA} arms under ${hisA} big breasts and feeling ${hisA} own biceps thoughtfully. "Selling them good stock would make them like us even more, I bet," ${heA} says. "Sharing a good slut around the campfire is a good way to make friends!"`);
					break;
				case "fairy":
					r.push(`${HeA} reaches behind ${himselfA} and starts groping ${hisA} butt again. "If we sell them some super cuties, they'll really love us!" ${heA} giggles as ${heA} gives ${himselfA} a playful slap.`);
					break;
				case "pregnant fairy":
					r.push(`Since ${heA} has your attention now, ${heA} slowly spreads ${hisA} legs and flashes ${hisA} pussy once again. Seeing you watch with interest this time, a small smile creeps up on ${hisA} face. "If we sell them some of our prettier girls, they'll be sure to warm up to us."`);
					break;
				case "hypergoddess":
					r.push(`${HeA} caresses ${hisA} pregnancy. "If we sell them some of our fertile slaves, I'm sure their burgeoning pregnancies will ease them into relying on us," ${heA} says confidently. "Or at least it will result in more slaves later on."`);
					break;
				case "loli":
					r.push(`${HeA} claps excitedly. "If we sell them new friends, then they'll hear from them about how great the Free Cities are and want to become our friends too!" ${heA} says hopefully, eager to meet all the newcomers to the arcology.`);
					break;
				case "preggololi":
					r.push(`${HeA} claps excitedly. "I don't know what they think of lolis, but selling them a few cute little slave girls will surely warm them up to us," ${heA} says, patting ${hisA} belly. "Plus, I'm sure they'll love how tight they are and how much energy they have once you break them in!"`);
					break;
				case "angel":
					r.push(`${HeA} wrings a wing nervously. "If we send them nice girls, we'd be doing a disservice to them by sending them away. But if we don't, how can we be certain that the girls they have will be well cared for? We definitely need to teach them our ways," ${heA} concludes.`);
					break;
				case "cherub":
					r.push(`${HeA} lands and ponders deeply. "We have to show them the right way before they get mislead. Some of our finest girls should help convert them to our ways!"`);
					break;
				case "incubus":
					r.push(`${HeA} strokes ${hisA} cock meaningfully. "Oh, and they could even develop into a regular market if they're sold distinctive, sexy girls. We should totally get them addicted to rape." ${HeA} makes several thrusting motions.`);
					break;
				case "succubus":
					r.push(`${HeA} fingers ${hisA} pussy meaningfully. "Oh, and they could even develop into a regular market if they're sold distinctive, sexy girls. Plus that means more money for you, and less competition for me." ${HeA} winks.`);
					break;
				case "imp":
					r.push(`${HeA} punches ${hisA} fist into ${hisA} palm. "We should sell them sexy, but unbroken, girls. That way they can learn to love breaking slaves into proper sex toys!" ${HeA} shivers with orgasm at the thought.`);
					break;
				case "witch":
					r.push(`${HeA} runs ${hisA} hat through ${hisA} hands. "If we sell them skilled girls, they'll grow closer to us. But we have to be careful not to send them klutzes like me; not everyone finds that adorable." ${HeA} takes the time to mend the rip ${heA} accidentally tore in ${hisA} hat's brim.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`${HeA} ponders deeply. "We could sell them the most loyal girls we have. They'll naturally lead them back to us. And then they are ours to do as we please," ${heA} says smiling deviously.`);
					break;
				default:
					r.push(`${HisA} symbol takes on a rapid succession of pulsating lewd shapes, signifying some of the arcology's better varieties of sex slaves. "If they're sold good product, they may become a reliable market, " ${heA} asserts.`);
			}
		} else {
			r.push(`your personal assistant appears to offer a suggestion. "I have collated data on the use of unofficial sex slaves by General ${V.peacekeepers.generalName}'s forces," it reports. "Despite the high state of readiness of his forces, the use of comfort women seems to have become widespread. Characteristically, the general has responded to this by accepting the new status quo, and is setting up recreation centers to ensure that the practice does not become disruptive. One of his officers has been tasked with obtaining appropriate sex slaves, but does not have sufficient resources to pay Free Cities prices. <span class="yellow">The purchasing officer may appear as a slave buyer through the standard slave sale interface.</span> It may be possible to influence them by selling them high-quality slaves."`);
		}
		App.Events.addParagraph(node, r);
	}
};
