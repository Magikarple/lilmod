App.Events.SecurityForceProposal = class SecurityForceProposal extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.SF.Toggle,
			() => V.SF.Active === -1,
			() => App.Events.effectiveWeek() >= 72
		];
	}

	execute(node) {
		V.SF.Active = 0; // Default value
		V.nextButton = " ";
		let price = 20000;
		App.Events.addParagraph(node, [`The Free Cities were founded on the principles of unrestrained anarcho-capitalism. To those with such beliefs, the very idea of possessing an armed force, a key tool of government control, or weapons at all, was anathema.`]);

		App.Events.addParagraph(node, [`In the period since, however, your citizens have seen the value in weaponry. They watched on their news-feed as some Free Cities were sacked by the armies and mobs of the old world, driven by their hatred of the citizens' luxurious lifestyles. They've seen other Cities toppled from within, by slave conspiracies or infighting among citizen groupings with differing beliefs. They've witnessed the distressingly rapid rise of fanatical anti-slavery organizations, who would like nothing more than to see them slowly bled by their own chattel. They are learned people, and they know what happens to slaveowners who lose their power.`]);

		App.Events.addParagraph(node, [`They've also seen the results of your policies. Your actions towards the arming of both yourself and the arcology proved critical, and ensured their safety when the old world came for them. And your victory over the Daughters of Liberty, who the citizens know would have executed every single one of them, has created an opportunity. If you insisted upon the creation of a standing 'special' force for the arcology, many would support you and, more importantly, nobody of note would object.`]);

		App.Events.addParagraph(node, [`Such a force would solve many problems. More soldiers would mean more control, which is very good for you. More soldiers would mean more security for the arcology and the approaches to it, which is very good for business. More soldiers would mean more obedience from rebellious slaves who can see how powerless they truly are, which is very good for everybody. The force would be tiny compared to the old world militaries that still exist, but money and technology can, of course, overcome massive numerical inferiority. This being the Free Cities, they would have other uses besides security. Perhaps, in time, you could exert some manner of influence on the old world itself.`]);

		App.Events.addParagraph(node, [
			App.UI.DOM.makeElement("span", "This is a unique and very important opportunity,", ["bold"]),
			`and is possible only because of your recent victory over the Daughters. If you do not seize it, the memories and fears of your citizens will fade, and you will not be able to raise the matter again.`
		]);

		if (V.PC.skill.warfare >= 100) {
			price *= 0.5;
		} else if (V.PC.skill.warfare >= 50 || V.PC.career === "arcology owner") {
			price *= 0.75;
		}

		const choices = [];
		choices.push(new App.Events.Result(`Prepare for an announcement`, announce,
			App.Events.makeNode([
				`Initial costs are`,
				App.UI.DOM.cashFormat(price),
				`and upon establishment the force will have significant support costs until it is self-sufficient.`
			])
		));
		choices.push(new App.Events.Result(`The current measures are enough`, no));
		App.Events.addResponses(node, choices);

		// TODO: write scenes and unlock sidebar, instead of going directly to passages.
		function announce() {
			V.SF.Active = 1;
			App.Mods.SF.Init();
			cashX(forceNeg(price), "specialForcesCap");
			App.UI.DOM.replace(node, stage0());
			return ``;
		}

		function no() {
			Engine.play(V.nextLink);
			return ``;
		}

		function stage0() {
			const text = document.createElement("span");
			const {
				heU, himU, hisU
			} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
			App.Events.addParagraph(text, [`You instruct ${V.assistant.name} to announce to the arcology's citizenry that you will be making an important announcement in the near future regarding the security situation. Given the damage still present from the Daughters' attack, everyone will be tuning in. You also instruct your assistant to begin quietly investigating potential leadership figures for the force itself. It's been a short while since you told your citizens that you were going to talk to them about their security, and by all accounts, they've turned out in force to watch your address over the arcology's internal communications system. You wake up early, relieve your frustrations on a few slaves woken out of deep sleep, and take position behind your desk. You also call over a slave and push ${himU} under your desk. The unspoken instruction is clear, and ${heU} begins enthusiastically ${(V.PC.dick > 0) ? `sucking your cock, taking it as deep as ${heU} can without gagging.` : `eating you out, pressing ${hisU} face into your pussy and forcing ${hisU} tongue deep inside you.`}`]);

			App.Events.addParagraph(text, [`A blinking light tells you that the channel is open. You take a deep breath, and begin. You greet your citizens and explain that while you believe deeply in the underlying principles of the Free Cities, recent events have forced you to modify some of your views. The old world attack from the outside and the more recent assault by the Daughters of Liberty from within has proven that some form of permanent, organized standing force is needed to ensure the personal safety of the citizen body.`]);

			App.Events.addParagraph(text, [`You tell them that the old world continues to deteriorate. You tell them that it is only a matter of time before the poor, diseased, starving, and unwashed masses try their hand at invading the arcology again. You tell them that such a force would be good for business, securing trade routes and conducting slaving raids far greater in scale than those performed by private slaving corporations. And finally, to quell their greatest fear, you tell them that you would personally support the force financially.`]);

			App.Events.addParagraph(text, [`As you speak, you carefully monitor the citizens' opinions as indicated on their communication devices. It is uniformly positive — they know whom they have to thank for their continued survival and dominance. You also monitor your arousal given the ministrations of your slave. A few small movements on your part communicate to your citizens what is happening without being too obvious. Free Cities business etiquette respects business conducted while being subtly serviced (and your doing so during such a public and important broadcast signals how seriously you are taking it), but a climax would be seen as a serious lack of discipline.`]);

			App.Events.addParagraph(text, [
				`You finally wrap up your speech, declaring yourself Marshal of the newly-formed`,
				App.UI.DOM.makeTextBox(V.SF.Lower, (v) => {
					V.SF.Lower = v;
				})
			]);

			App.Events.addParagraph(text, [`You close the link to the communication system and read a message from your assistant that appeared during the last moments of your address. In consultation with major figures in the mercenary community, a suitable candidate for day-to-day command of the new unit has been found. Your instructions were to keep you in the dark about them so as to avoid prejudgment. They are waiting outside your office.`]);

			App.UI.DOM.appendNewElement("div", text, App.UI.DOM.link(
				"Invite them inside",
				() => {
					const text1 = document.createElement("span");
					let r = [];
					r.push(`The figure that enters is not what you were expecting, given your previous experiences with the mercenary groups that work with the arcology owners of the Free Cities. Most mercenaries you've worked with have been grizzled stout men, veterans of the old world militaries that finally had too much and went private. Instead, a woman walks in.`);
					r.push(`She strikes you as someone who is likely to be:`);
					App.Events.addParagraph(text1, r);
					const temperamentMap = new Map([
						["kind", "Kind"],
						["cruel", "Cruel and psychopathic"],
						["brazen", "A brazen warmonger"],
						["jaded", "Jaded"],
						["shell shocked", "Shell-shocked"],
					]);
					for (const [set, title] of temperamentMap) {
						App.UI.DOM.appendNewElement("div", text1, App.UI.DOM.link(
							title,
							() => {
								V.SF.Colonel.Core = set;

								const text2 = document.createElement("span");
								const {
									HeU,
									heU, himU, hisU, girlU
								} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
								App.Events.addParagraph(text2, [
									`She is likely to be`,
									App.UI.DOM.makeElement("span", `${V.SF.Colonel.Core}.`, ["bold"])
								]);
								r.push(`She strides in, stopping in front of your desk,`);
								switch (V.SF.Colonel.Core) {
									case "kind":
										r.push(`pulling off a laid-back salute with an easy grin.`);
										break;
									case "cruel":
										r.push(`her eyes flashing a hard glare in an instant before quickly softening into those of someone who wants something you have.`);
										break;
									case "brazen":
										r.push(`snapping off a textbook salute that decades of hard service grills into a veteran.`);
										break;
									default:
										r.push(`not bothering to put on even the semi-military air (complete with salute) that most mercenaries tend to adopt when meeting new clients.`);
								}
								r.push(`She is very tall and wearing the pants, boots, gloves, and the tank top undershirt of a standard female combat uniform. Her bare arms and upper body are corded with muscle, and through the tank top's thin fabric you can see both the shape of her muscled abdomen and the curves of her small but perky breasts, complete with what your experience tells you are barbell nipple piercings. Her eyes are alive with intelligence, and you can see her scanning your office, clearly impressed by its opulence. Her hair is shaved close to the scalp, and her ears and nose are heavily pierced. You can make out three long, ugly scars running over top of the mottled tissue of a previous, severe burn along one side of her face, as well as numerous smaller scars and burns on her bare arms. She's been disarmed prior to meeting you; the pistol holster on her hip lies empty, as do at least three knife holsters about her person.`);
								App.Events.addParagraph(text2, r);
								r = [];

								App.Events.addParagraph(text2, [`Returning your gaze to her face, she crosses her arms underneath her chest, pressing her breasts up and forward. You have her measure. Given the generally patriarchal nature of both the mercenary community, and the same nature combined with the heavily sexualized lifestyle of the Free Cities, she's decided to embrace her position rather than fight it.`]);

								r.push(`"So," she begins, "you're the boss." You invite her to sit down. "No thanks, boss. Besides," she`);
								switch (V.SF.Colonel.Core) {
									case "kind":
										r.push(`playfully`);
										break;
									case "shell shocked":
										r.push(`uncomfortably`);
								}
								r.push(`indicates the slave under your desk, "you look a little occupied." She nods at the camera across from you. "Saw the speech. Very nice. I'd heard you crazy bastards do business while getting`);
								if (V.PC.dick > 0) {
									r.push(`sucked off,`);
								} else {
									r.push(`eaten out,`);
								}
								r.push(`but I've never seen anyone actually do it. Hell, most of you people don't want to have to have too much to do with a merc like me. I usually get my instructions remotely."`);
								switch (V.SF.Colonel.Core) {
									case "brazen":
									case "jaded":
										r.push(`A short, harsh laugh escapes her. "But I guess it keeps you focused. Can't have the entire arcology seeing you cum."`);
										break;
									case "kind":
										r.push(`She grins. "That kind of thing doesn't really bother me though."`);
										break;
									case "cruel":
										r.push(`She frowns. "The client always seems to be happier that way."`);
								}
								App.Events.addParagraph(text2, r);
								r = [];
								r.push(`She moves a step closer. "Your computer-helper-thing told me you wanted me to be a surprise, so I guess I'll tell you why you want me to run ${V.SF.Lower} for you. I'm a killer, pure and`);
								if (V.SF.Colonel.Core === "cruel") {
									r.push(`simple," she smiles, "and`);
								} else {
									r.push(`simple, and`);
								}
								r.push(`you need that. I looked into those attacks you've suffered. Nasty business. I'll make sure that an attack like that never happens again. I was a soldier out there, in charge of about a thousand men when the Free Cities first started going up, and I knew they were the future. Eventually I deserted, found the first refugee convoy I could, killed the moron protecting it, sold the girls off to slavers, and bought enough gear to start killing for people like you. Ran my own merc crew, did well till we tried to take on a bigger one and everyone died."`);
								switch (V.SF.Colonel.Core) {
									case "shell shocked":
										r.push(`She looks away, caught in her own memories. It takes a solid minute before she starts again.`);
										break;
									case "cruel":
										r.push(`Her smile grows.`);
										break;
									default:
										r.push(`She pauses for a moment.`);
								}
								r.push(`"Joined with another big outfit, became the number two, then shit went bad and I had to run. Been a solo fighter and slaver ever since. I know my work, and I know I can make this work."`);

								App.Events.addParagraph(text2, r);
								r = [];
								r.push(`You feel your climax approaching and hold up a finger. The merc pauses while you grab the slave's head`);
								if (V.PC.dick > 0) {
									r.push(`then force your cock roughly down ${hisU} throat while you cum. ${HeU} swallows as much as ${heU} can before pulling`);
								} else {
									r.push(`tightly with your thighs, pressing ${hisU} face tightly against your pussy as you cum. When you release ${himU}, ${heU} pulls`);
								}
								r.push(`away, coughing.`);

								App.Events.addParagraph(text2, r);
								r = [];
								if (V.SF.Colonel.Core === "shell shocked") {
									r.push(`The merc looks away again, letting the ${girlU} settle down before continuing.`);
								} else {
									r.push(`The merc laughs again. "I could get used to a place like this."`);
								}
								r.push(`She waves her hand around the office. "I bet you want to know why I'd be trustworthy for something like this." You don't correct her. "Thought so." Her demeanor softens, and you can detect a hit of nervousness. "I would say that I've never turned on a client and leave it at that, but this is different. It's getting worse out there. I'm sure you know that." You give her a slight nod. "Four times now I've woken up in the middle of the night and had to kill`);
								if (V.SF.Colonel.Core === "shell shocked") {
									r.push(`someone."`);
								} else {
									r.push(`someone. Two of them were the people I'd taken to bed. You can't even trust your drunken fucks anymore.`);
									switch (V.SF.Colonel.Core) {
										case "kind":
											r.push(`It's a shame, but that's the world we live in."`);
											break;
										case "cruel":
											r.push(`Then again, who doesn't like a good hard fuck and stab?"`);
											break;
										default:
											r.push(`But what else is new?"`);
									}
								}

								App.Events.addParagraph(text2, r);
								r = [];
								if (V.SF.Colonel.Core === "jaded" || V.SF.Colonel.Core === "shell shocked") {
									r.push(`"All I know how to do at this point is fight, and that's kept me alive this far.`);
								} else {
									r.push(`"I like fighting, but I want to live somewhere where I can relax from life out there.`);
								}
								r.push(`You give me the job and a place to live, let me hang up the uncertainty of being a merc, and I'll die for you if it comes to that. I promise the people I recruit will feel the same. Besides," she grins, "I could get used to`);

								switch (V.SF.Colonel.Core) {
									case "brazen":
										r.push(`crushing any enemy that looks our way."`);
										break;
									case "cruel": {
										r.push(`having my own stable to abuse as I see fit. A terrified little slave${getNonlocalPronouns(V.seeDicks).noun} locked between my legs, struggling to breathe?"`);
										break;
									}
									default:
										r.push(`spending my R&R time with a cold beer in one hand, a few lines of coke or a stack of pills in front of me."`);
								}
								r.push(`A glint runs through her eyes. "Sounds like a good fucking time."`);
								App.Events.addParagraph(text2, r);

								App.Events.addParagraph(text2, [`You quickly decide she'll do. You tap a few commands on your desk's console, assigning her personal quarters on the arcology's higher levels and transferring her first stipend to her new account. You also ask her what title she wants.`]);

								App.Events.addParagraph(text2, [`"Title?" Another short laugh. "I guess I do need one, given that I'm all official and shit now." She thinks for a moment. "I was a major before I went freelance, and I think I'd like a promotion. Colonel sounds good." You make a note of this in her file. "You people don't seal contracts with a fuck do you?" Reassuring her you don't, she laughs again. "Good. I make it a point never to fuck the boss. It's bad for business." She turns around. "Well, I guess I'd better get to it. Your helper-thing assigned me space on the lower levels for the firebase. I brought a few squads of guys I know from the old days to start, but we'll grow fast once I put the word out, I guarantee it."`]);
								App.UI.DOM.appendNewElement("div", text2, App.UI.DOM.link(
									"Let her leave",
									() => {
										const text3 = document.createElement("span");
										let r = [];
										V.nextButton = "Continue";
										App.Utils.scheduleSidebarRefresh();

										App.Events.addParagraph(text3, [`She turns and leaves, and you chase the slave out after her. A few minutes later, a soft chime announces the arrival of a message. It's from The Colonel.`]);

										r.push(`Hey boss, just wanted to mention something else. In your speech you said that you were going to be paying for ${V.SF.Lower}. In my mind that means it's yours, no matter what anyone else here might think. I do what you tell me to do. I make sure the troops behave as you want them to behave. I've worked for some 'nice guys' in the past, and I can do that job if you want. It's boring, but sustainable, and I'll have ${V.SF.Lower} turning a profit and supporting the arcology in good order. But if you let me`);
										if (V.SF.Colonel.Core === "cruel") {
											r.push(`off the leash`);
										} else {
											r.push(`do what I do`);
										}
										r.push(`and throw any old world complaints in the trash where they belong, I promise you'll have money pouring into your coffers, even accounting for the good amounts me and my boys will pocket along the way. You'll have an empire in short order.`);
										if (V.mercenaries > 1) {
											r.push(`Either way, I'll keep my hands off those mercs you've already installed. I figure that you've reasons for having two different death squads under contract.`);
										}
										App.Events.addNode(text3, r, "p", "note");

										App.Events.addNode(text3, [`Oh, one last thing. I know you've got some kind of grand social experiment going on up there like all the other arc owners, and that's your own deal, but I'd appreciate it if you could keep that stuff out of the new barracks. I'll have a hard time approaching potential recruits and telling them they should come live in a Roman apartment, an Egyptian temple, a goddamn Japanese teahouse, or some of the other crazy shit I've seen in the past. They're hard, nasty people, and trust me, I can tell you from experience that changing that is just not going to happen. Like I said, though, I can hold them back a bit if you like.`], "p", "note");

										App.Events.addNode(text3, [`Talk to you later, boss.`], "p", "note");

										App.UI.DOM.replace(text2, text3);
									}
								));

								App.UI.DOM.replace(text1, text2);
							}
						));
					}
					App.UI.DOM.replace(text, text1);
				}
			));
			return text;
		}
	}
};
