/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fDance = function(slave) {
	const frag = new DocumentFragment();

	// TODO: expand fetish blocks
	const {
		He, His,
		he, his, him, hers, himself, woman, girl
	} = getPronouns(slave);
	const {his: hisP, women: womenP, woman: womanP} = getPronouns(V.PC);

	const text = new SpacedTextAccumulator(frag);

	text.push(
		intro(),
		consummation(),
	);

	// TODO: more varied reactions planned
	if (random(1, 100) > (100 + slave.devotion)) {
		text.push(slaveGainsFlaw());
	} else if (random(1, 100) > (110 - slave.devotion)) {
		text.push(slaveGainsQuirk());
	}

	text.toParagraph();

	return frag;

	function intro() {
		return `You tell ${V.assistant.name} to summon ${slave.slaveName} and turn on some erotic music. When your slave arrives, ${he} finds the lights in your office flashing club colors. You gesture towards the platform in the center of your office and tell ${him} to dance for you.`;
	}

	function consummation() {
		const text = [];

		text.push(
			skill(),
			weight(),
			devotion(),
			face(),
			strip(),
			conclusion(),
		);

		return text.join(' ');

		function skill() {
			const text = [];


			if (slave.skill.entertainment > 99) {
				text.push(`${He} slides ${his} ass gracefully unto the stage, then dramatically raises ${his} elongated ${(hasBothLegs(slave)) ? `legs one at a time` : `leg`} onto the platform. Circling to ${his} ${(hasBothLegs(slave)) ? `knees` : `knee`}, ${he} raises ${his} ass in the air`);

				if (hasAnyArms(slave)) {
					text.push(`and glides ${his} ${(hasBothArms(slave)) ? `hands` : `hand`} up ${his} ${(hasBothLegs(slave)) ? `legs` : `leg`}`);
				}

				text.push(`as ${he} stands upright.`);
			} else if (slave.skill.entertainment > 60) {
				text.push(`${He} takes ${his} rightful place on your stage.`);
			} else if (slave.skill.entertainment > 40) {
				text.push(`${He} goes to take ${his} place on your stage and dance for ${his} ${getWrittenTitle(slave)}.`);
			} else if (slave.skill.entertainment > 20) {
				text.push(`${He} ascends to the platform and begins to grind at the pole.`);
			} else if (slave.skill.entertainment > 9) {
				text.push(`${He} climbs up onto the platform and grabs onto the pole.`);
			} else if (slave.skill.entertainment > -10) {
				text.push(`${He} climbs up onto the platform and grabs onto the pole.`);
			}


			return text.join(' ');
		}

		function weight() {
			const text = [];

			if (slave.weight > 190) {
				text.push(`${He} is so ${either("enormous", "massive")} that ${he} can barely move ${his} weight around. ${His} rolls sway and jiggle with every move, creating a ripple canvas of swirling fat.`);
			} else if (slave.weight > 160) {
				text.push(`${He} is quite large, and ${his} weight threatens to pull ${him} down every time ${he} sways. ${His} rolls sway and jiggle with every move, creating a ripple canvas of swirling fat.`);
			} else if (slave.weight > 130) {
				text.push(`${His} chubby rolls dance to a beat of their own as your slave sways and moves to the music.`);
			} else if (slave.weight > 50) {
				text.push(`${His} chubby body jiggles nicely as ${he} moves.`);
			} else if (slave.weight > 20) {
				text.push(`${His} form sways and moves with the music in a most alluring way.`);
			} else if (slave.weight > 0) {
				text.push(`${His} trim body is highlighted by ${his} dance. Whenever ${he} rolls ${his} ass or sways ${his} hips it highlights the contours of ${his} waist.`);
			} else if (slave.weight < 0) {
				text.push(`Your slave's trim body glides to the music like a ${either("belly dancer", "stripper")}. ${He} is thin and tight, with no body fat to speak of,`);

				if (slave.boobs > 400) {
					text.push(`making ${his} tits`);
					if (slave.butt > 1) {
						text.push(`and ass`);
					}
					text.push(`the main focus of ${his} dance.`);
				} else {
					if (slave.butt > 1) {
						text.push(`making ${his} ass the main focus of ${his} dance.`);
					} else {
						text.push(`totally flat. ${His} body is flat and girlish, providing a tastefully alluring display.`);
					}
				}
			}

			return text.join(' ');
		}

		function devotion() {
			const text = [];

			if (slave.devotion < -20) {
				text.push(`It's clear that ${he} hates being on display for you. ${He} resents you for making ${him} dance for you,`);

				if (slave.trust < -50) {
					text.push(`but ${he} is to terrified of you to see what happens if ${he} resists`);
				} else {
					text.push(`and refuses to comply. In order to make ${him} obey, a leash is attached from`);

					if (slave.collar !== "none") {
						switch (slave.collar) {
							case "uncomfortable leather":
								text.push(`the steel ring on ${his} leather collar`);
								break;
							case "preg biometrics":
								text.push(`${his} collar`);
								break;
							case "silk ribbon":
								text.push(`${his} silk ribbon`);
								break;
							case "tight steel":
								text.push(`${his} steel collar`);
								break;
							case "shock punishment":
								text.push(`${his} shock collar`);
								break;
							case "neck corset":
								text.push(`an O-ring at the from of ${his} neck corset`);
								break;
							case "stylish leather":
								text.push(`${his} collar`);
								break;
							case "satin choker":
								text.push(`${his} choker collar`);
								break;
							case "heavy gold":
								text.push(`${He} is wearing a heavy gold collar, an outstanding bit of ostentation.`);
								break;
							case "pretty jewelry":
								text.push(`${his} ornate collar`);
								break;
							case "bell collar":
								text.push(`the ring attaching ${his} bell to ${his} collar, and`);
								break;
							case "leather with cowbell":
								text.push(`the ring attaching ${his} bell to ${his} collar, and`);
								break;
							case "bowtie":
								text.push(`${his} bowtie collar`);
								break;
							case "neck tie":
								text.push(`${his} neck tie`);
								break;
							case "ancient Egyptian":
								if (slave.piercing.nose.weight === 2) {
									text.push(`${his} nose ring.`);
								} else if (slave.piercing.nipple.weight === 2) {
									text.push(`${his} nipple chain.`);
								} else {
									text.push(`${his} wesekh.`);
								}
								break;
							case "cruel retirement counter":
							case "nice retirement counter":
								text.push(`${his} retirement counter`);
								break;
							default:
								if (slave.piercing.nose.weight === 2) {
									text.push(`${his} nose ring`);
								} else if (slave.piercing.nipple.weight === 2) {
									text.push(`${his} nipple chain`);
								} else {
									text.push(`a collar that is placed on ${his} neck for the occasion, and`);
								}
						}
					} else if (slave.mouthAccessory !== "none") {
						switch (slave.mouthAccessory) {
							case "dildo gag":
								text.push(`a ring on ${his} gag strap`);
								break;
							case "massive dildo gag":
								text.push(`a ring on ${his} gag strap`);
								break;
							case "ball gag":
								text.push(`a ring on the back of ${his} gag`);
								break;
							case "bit gag":
								text.push(`the ring on the side of ${his} bit`);
								break;
							case "ring gag":
								text.push(`a bar in ${his} mouth slightly wider than ${his} ring gag`);
						}
					} else if (slave.faceAccessory !== "none") {
						switch (slave.faceAccessory) {
							case "porcelain mask":
								if (slave.piercing.nose.weight === 2) {
									text.push(`${his} nose ring`);
								} else if (slave.piercing.nipple.weight === 2) {
									text.push(`${his} nipple chain`);
								} else {
									text.push(`a collar that is placed around ${his} neck`);
								}
						}
					}

					text.push(`to the pole in order to keep ${him} from getting down. Whenever ${he} stops dancing the chain is tightened a bit more,`);

					switch (slave.collar) {
						case "uncomfortable leather":
							text.push(`choking ${him} and rubbing ${his} skin raw from the leather;`);
							break;
						case "tight steel":
							text.push(`choking ${him} without mercy;`);
							break;
						case "shock punishment":
							text.push(`and a shock is sent through ${his} collar;`);
							break;
						case "neck corset":
							text.push(`making breathing even more difficult;`);
							break;
						case "ancient Egyptian":
							if (slave.piercing.nose.weight === 2) {
								text.push(`tugging at ${his} nose ring;`);
							} else if (slave.piercing.nipple.weight === 2) {
								text.push(`threatening to tear themselves from ${his} sensitive flesh;`);
							} else {
								text.push(`tugging at ${his} throat;`);
							}
							break;
						default:
							if (slave.piercing.nose.weight === 2) {
								text.push(`tugging at ${his} nose ring;`);
							} else if (slave.piercing.nipple.weight === 2) {
								text.push(`threatening to tear themselves from ${his} sensitive flesh;`);
							} else {
								text.push(`choking ${him};`);
							}
					}

					text.push(`forcing ${him} to keep moving or face more pain.`);
				}
			} else if (slave.devotion <= 20) {
				text.push(`${He} hates being forced to dance for you, but tries ${his} best in spite of this.`);
			} else if (slave.devotion <= 50) {
				text.push(`${He} wants to do ${his} best for you, and tries not to hold back.`);
			} else if (slave.devotion <= 80) {
				text.push(`${He} is so eager to please you, and works hard to push ${himself} beyond ${his} skill limit.`);
			} else if (slave.devotion <= 100) {
				text.push(`${He} is so honored that you want to use ${him} in this way, and tries eagerly to please you. ${His} eyes are filled with adoration and every move ${he} makes is done with the sole intention of titillating ${his} beloved ${getWrittenTitle(slave)}.`);
			}

			if (slave.devotion <= 20) {
				if (slave.sexualFlaw === "judgemental") {
					text.push(`${He} thinks to ${himself} that a real ${womanP} wouldn't need to compensate this way, and judges you harshly.`);
				} else if (slave.behavioralFlaw === "liberated") {
					text.push(`${He} can't believe ${he} now lives in a world where women are expected to perform for their ${getWrittenTitle(slave)} whether they consent or not.`);
				} else if (slave.behavioralFlaw === "bitchy") {
					text.push(`${He} dances, but makes sure that the disgust on ${his} face shows clearly that ${he} is not into it.`);
				}
			}

			text.push(`The atmosphere of your office is a testament to masculine opulence. Few ${womenP} in the old world would have the pleasure of completing their work while an attractive ${slave.visualAge < 16 ? girl : woman} flaunts ${himself} for ${hisP} pleasure. You allow the situation to continue for about an hour, before deciding it's time to escalate. You look up once more at your slave and take some time to review ${his} dancing performance.`);

			if (slave.devotion >= -20) {
				if (slave.skill.entertainment >= 100) {
					text.push(`Your slave has a level of skill previously unseen in the old world. Even ${his} blinks have the seductive pull of a goddess. As you watch ${him} perform, you think how no ${womanP} of the old world would ever get to see pure sexuality like this. And not only do you get to watch ${him}, you OWN ${him}. ${His} body moves like water, with hips that ebb and flow as if the tides themselves panged for a rock hard cock to come and take them. You try to get some work done, but can't take your eyes off ${him} for even a second. You promise to reward your slave for bringing so much sensuality and beauty into your office, transforming your place of work into a shrine of masculine dominance.`);
				} else if (slave.skill.entertainment >= 60) {
					text.push(`${His} skill would have only been matched by the best of the best old world erotic dancers, but in your Free City expectations are high. ${He} dances with seduction in every move, alternating ${his} style between everything from belly dancing to club twerking, and each with the skill level of a trained professional. You got some work done while ${he} danced, but often found yourself pulled back in by the tide of ${his} rolling hips. You praise your slave for ${his} enriching performance.`);
				} else if (slave.skill.entertainment >= 40) {
					text.push(`${He} has impressive skill and would have been a top-tier dancer in the old world. One of the many benefits of being a leader of a Free City is the ability to work in an atmosphere of pure servitude. You were free to continue your work in an office the old world men could only dream of. You tell your slave that you are pleased with ${his} show.`);
				} else if (slave.skill.entertainment >= 20) {
					text.push(`Despite being an average entertainer, it is clear that ${he} is doing ${his} best. You enjoyed the sexy ambiance while you worked. You tell your slave that ${his} performance was adequate.`);
				} else if (slave.skill.entertainment >= 10) {
					text.push(`${He} is still learning the nuances of seductive dance, but at least able to move with the rhythm. You spent much of the performance distracted, forgetting that ${he} was even there at times and leaving ${him} unable to stop until you remembered about ${him}. You tell ${him} that ${he} will have to work harder if ${he} wishes to please you.`);
				} else {
					text.push(`Or, at least, ${his} best attempt at dancing. ${His} arms flail about awkwardly as ${he} crouches and straightens off-beat to the music. You spent much of the dance ignoring ${him} and working on your business. You chide your slave for such a pathetic excuse for a performance, and tell ${him} that ${he} will have to find a place to please you, or you will be forced to make ${him} useful, turning ${his} thoughts to the arcades, dairies, and Fuckdolls common amongst the Free Cities.`);
				}
			} else {
				text.push(`${He} dances poorly on purpose to spite you. Whatever skills ${he} has, they are not on display here. You threaten to`);

				switch (slave.rules.punishment) {
					case "confinement":
						text.push(`lock ${him} up in the bad-${girl} box`);
						break;
					case "whipping":
						text.push(`whip ${him} until ${he} screams`);
						break;
					case "chastity":
						if (slave.energy > 60) {
							text.push(`keep ${him} on the edge of orgasm until ${he} loses ${his} mind`);
						} else {
							text.push(`fuck ${him} in the ass until ${he}'s unconscious`);
						}
						break;
					case "situational":
						switch (slave.collar) {
							case "shock punishment":
								text.push(`activate ${his} collar, and`);
						}
						text.push(`punish ${him}`);
						break;
				}
				text.push(`if ${he} doesn't shape up.`);
			}

			return text.join(' ');
		}

		function face() {
			const text = [];

			text.push(`${His} face is`);

			switch (slave.faceShape) {
				case "masculine":
					if (slave.face < -95) {
						text.push(`hideously manly, distracting you from anything positive that may be going on.`);
					} else if (slave.face < -40) {
						text.push(`ugly and masculine, and you find it difficult to enjoy looking at ${him}.`);
					} else if (slave.face < -10) {
						text.push(`unattractively masculine, distracting you from time to time.`);
					} else if (slave.face <= 10) {
						text.push(`masculine, but not distracting.`);
					} else if (slave.face <= 40) {
						text.push(`attractive masculine, adding an interesting contrast to the feminine dance.`);
					} else if (slave.face <= 95) {
						text.push(`manly and handsome, which adds a flair of intrigue to the dance.`);
					} else {
						text.push(`the height of masculine handsomeness, adding a value to the dance only present in the Free Cities.`);
					}
					break;
				case "androgynous":
					if (slave.face < -95) {
						text.push(`disturbingly androgynous and terribly ugly, distracting you from anything positive that may be going on.`);
					} else if (slave.face < -40) {
						text.push(`neither masculine nor feminine and quite ugly, and you find it difficult to enjoy looking at ${him}.`);
					} else if (slave.face < -10) {
						text.push(`strangely androgynous, distracting you from time to time.`);
					} else if (slave.face <= 10) {
						text.push(`strangely androgynous, but not distracting.`);
					} else if (slave.face <= 40) {
						text.push(`androgynous, and attractive enough that it adds an interesting flair to the dance.`);
					} else if (slave.face <= 95) {
						text.push(`gorgeously androgynous which is distracting and perplexing all at once.`);
					} else {
						text.push(`so gorgeously androgynous that you can't be brought to look away.`);
					}
					break;
				case "cute":
					if (slave.face < -95) {
						text.push(`pitifully cute. ${He}'s so ugly and cute you can't help but be turned off and drawn in simultaneously.`);
					} else if (slave.face < -40) {
						text.push(`not attractive, but ${his} cuteness makes ${him} pitifully appealing.`);
					} else if (slave.face < -10) {
						text.push(`not attractive, but is still cute enough to keep you entertained.`);
					} else if (slave.face <= 10) {
						text.push(`appealingly cute.`);
					} else if (slave.face <= 40) {
						text.push(`cute and attractive, adding genuine appeal to ${his} performance.`);
					} else if (slave.face <= 95) {
						text.push(`so cute as ${he} dances for you. You appreciate the fullness of ${his} beauty.`);
					} else {
						text.push(`so perfectly cute, you can't help but smile every time ${he} looks your way.`);
					}
					break;
				case "sensual":
					if (slave.face < -95) {
						text.push(`not attractive; not even a little. But the natural "fuck me" look of ${his} face helps give you something to look forward to once ${he}'s naked.`);
					} else if (slave.face < -40) {
						text.push(`not attractive, but the natural "fuck me" look of ${his} face helps give you something to look forward to once ${he}'s naked.`);
					} else if (slave.face < -10) {
						text.push(`not great looking, but the natural sexiness make's it easier to enjoy.`);
					} else if (slave.face <= 10) {
						text.push(`sensuality alone. Neither attractive, nor unattractive. Just sex.`);
					} else if (slave.face <= 40) {
						text.push(`begging for sex, being so enticing and sultry.`);
					} else if (slave.face <= 95) {
						text.push(`constantly turning you on, with the sensual structure of ${his} beautiful face never letting sex leave your mind.`);
					} else {
						text.push(`making you`);
						if (V.PC.dick !== 0) {
							text.push(`rock hard`);
							if (V.PC.vagina !== -1) {
								text.push(`and dripping wet`);
							}
						} else {
							text.push(`dripping wet`);
						}
						text.push(`as you lust after ${his} sexual beauty.`);
					}
					break;
				case "exotic":
					if (slave.face < -95) {
						text.push(`hideously unusual, distracting you from anything positive that may be going on.`);
					} else if (slave.face < -40) {
						text.push(`ugly and unusual, and you find it difficult to enjoy looking at ${him}.`);
					} else if (slave.face < -10) {
						text.push(`not great to look at, but perplexing and abnormal. You try to focus on ${his} body instead.`);
					} else if (slave.face <= 10) {
						text.push(`interesting and unusual. It isn't particularly attractive, but none of your slaves have a face quite like ${hers}.`);
					} else if (slave.face <= 40) {
						text.push(`exotic and alluring, just attractive enough to make ${him} good office décor, but not so much that it's distracting.`);
					} else if (slave.face <= 95) {
						text.push(`a testament to the benefits of a global slave market. It makes ${him} a perfect office trophy.`);
					} else {
						text.push(`an exotic masterpiece. Having ${him} dance in your office is like hanging foreign art on the walls, a perfect trophy of your slaving reach.`);
					}
					break;
				case "feline":
					if (slave.face < -95) {
						text.push(`revolting in its alien cat-like appearance, the mangy fur distracting you tremendously.`);
					} else if (slave.face < -40) {
						text.push(`ugly and feline, making it hard to do anything but stare at ${his} bizarre cat features.`);
					} else if (slave.face < -10) {
						text.push(`relatively unattractive in its strange feline appearance, though you try to look more at ${his} furred body.`);
					} else if (slave.face <= 10) {
						text.push(`fascinating in its strange cat-like looks. ${His} whiskers twitch about as ${he} moves.`);
					} else if (slave.face <= 40) {
						text.push(`attractive and feline, catching your eye and drawing your attention to ${his} soft fur and twitching button nose.`);
					} else if (slave.face <= 95) {
						text.push(`gorgeous in its feline construction, a beautiful melody of fur and whiskers that's hard to even look away from.`);
					} else {
						text.push(`a breathtakingly beautiful cat${girl}, a true monument to the wonders of genetic engineering with ${his} perfectly-constructed fur and luxurious feline curves. Just looking at ${him} draws you in intimately, whiskers twitching.`);
					}
					break;
				default:
					if (slave.face < -95) {
						text.push(`not great to look at. Not even a little. You try to focus on ${his} body instead, finding yourself immediately turned off when ${he} catches your gaze.`);
					} else if (slave.face < -40) {
						text.push(`a bit of a turn off. You try to watch ${his} body instead.`);
					} else if (slave.face < -10) {
						text.push(`not a highlight. ${He} isn't beautiful, and you would rather watch ${his} body.`);
					} else if (slave.face <= 10) {
						text.push(`quite feminine and pleasing. You aren't captivated by ${his} face, but you don't avoid it either.`);
					} else if (slave.face <= 40) {
						text.push(`feminine and attractive. You find yourself looking at it from time to time.`);
					} else if (slave.face <= 95) {
						text.push(`beautiful and feminine. You often find your eyes locked on ${his} face for long periods of time.`);
					} else {
						text.push(`absolutely stunning. Watching ${his} face is often more pleasing than watching ${him} dance.`);
					}
			}

			return text.join(' ');
		}

		function strip() {
			const text = [];

			text.push(`It's not over yet, though. You tell your slave that it's time to incorporate some stripping into ${his} dance.`);

			if (slave.sexualFlaw === "shamefast") {
				if (slave.devotion <= 40) {
					text.push(`${He} immediately begins to tear up at the thought of being naked. ${His} shame is obvious to you, and you remind ${him} that ${his} comfort is not your concern.`);
					if (slave.skill.entertainment >= 99) {
						text.push(`Even though ${he} is crippled by shame, your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. With tears still streaming down ${his} face, ${he} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose, even as ${he} sniffles at the shame of revealing ${himself} for you. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
					} else if (slave.skill.entertainment >= 60) {
						text.push(`Even though ${he} is crippled by shame, your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
					} else if (slave.skill.entertainment >= 40) {
						text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
					} else if (slave.skill.entertainment >= 20) {
						text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing. ${His} attempts are inhibited by ${his} shame, which makes ${him} shudder and cry whenever it's time for another article of clothing to come off.`);
					} else if (slave.skill.entertainment >= 10) {
						text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${He} is too concerned with protecting ${his} nakedness to be obedient and attractive simultaneously, and you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
					} else {
						text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to reluctantly, but obediently, remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
					}
				} else {
					text.push(`Even though ${he} is uncomfortable at the thought of being naked, ${he} is so devoted to you that ${he} obeys without question.`);
					if (slave.skill.entertainment >= 99) {
						text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. Overcoming ${his} fear of being naked, ${he} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose, even as ${he} sniffles at the shame of revealing ${himself} for you. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
					} else if (slave.skill.entertainment >= 60) {
						text.push(`Even though ${he} is still ashamed, your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
					} else if (slave.skill.entertainment >= 40) {
						text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
					} else if (slave.skill.entertainment >= 20) {
						text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing. ${His} attempts would be inhibited by ${his} shame, but ${his} devotion to you overrides this and ${he} is able to dance with added skill.`);
					} else if (slave.skill.entertainment >= 10) {
						text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. You find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
					} else {
						text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to shamefully remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
					}
				}
			} else if (slave.behavioralFlaw === "odd") {
				if (slave.skill.entertainment >= 99) {
					text.push(`Even though ${he} is extremely odd, your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. With ${his} ass cheeks straddling the pole ${he} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
				} else if (slave.skill.entertainment >= 60) {
					text.push(`Even though ${he} is extremely odd, your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
				} else if (slave.skill.entertainment >= 40) {
					text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} shouts wildly before upping the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
				} else if (slave.skill.entertainment >= 20) {
					text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing. ${His} attempts are inhibited by ${his} oddness, which results in ${him} crouching and squealing at inappropriate times. ${He} wonders aloud and you instruct ${him} to be silent the remainder of the dance.`);
				} else if (slave.skill.entertainment >= 10) {
					text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${He} is so odd that ${his} moves more resembles the chicken dance than any form of erotic dancing. You find yourself unable to look away, and for all the wrong reasons. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
				} else {
					text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. Deciding that the rhythm is to blame, ${he} decides instead to sing ${his} own song to strip to. ${He} proceeds to hum string of off beat notes peppered with random words and scats, all punctuated by the sloppy kicking of clothes from ${his} ankles. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to roughly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
				}
			} else if (slave.sexualFlaw === "attention whore") {
				text.push(`As an attention whore, this is what ${he} lives for.`);
				if (slave.skill.entertainment >= 99) {
					text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. Being an attention whore, ${he} is obsessed with attracting the sexual arousal of others. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose, even though ${he} is also fulfilled by the event ${he} knows that your desire is all that matters. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
				} else if (slave.skill.entertainment >= 60) {
					text.push(`Your slave is a skilled entertainer, well above average. Being an attention whore, ${he} is obsessed with attracting the sexual arousal of others. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} surely wishes ${he} were a better entertainer so you would call on ${him} to strip more often.`);
				} else if (slave.skill.entertainment >= 40) {
					text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. The true entertainment comes from ${his} teasing nature, which makes ${him} blush cutely anytime ${he} shows a bit of skin. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
				} else if (slave.skill.entertainment >= 20) {
					text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing. ${His} attempts are overshadowed by ${his} clear desire to be looked at, and you can tell ${he} is distracted by this.`);
				} else if (slave.skill.entertainment >= 10) {
					text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${He} is trying much too hard to get your attention, and is visibly angered whenever ${he} sees that you are not aroused by ${his} fumblings. You find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
				} else {
					text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to over-dramatically remove an article of clothing. After each article removed ${he} stops and looks at you to make sure you're watching. ${His} clear desire to be looked at makes ${him} more self-conscious which offsets the rhythm of the dance even more. ${He} decides to pick up the pace, aiming to be naked as quickly as possible so that you can admire ${his} body. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
				}
			} else if (slave.sexualQuirk === "tease") {
				if (slave.skill.entertainment >= 99) {
					text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. Being a tease, ${he} is able to maintain an attractive blend of shame and arousal at the thought of being naked before you, and this inspires ${him} to tease you endlessly. With cheeks still flushed and red, ${he} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose, even as ${he} blushes at the shame and arousal of revealing ${himself} for you. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
				} else if (slave.skill.entertainment >= 60) {
					text.push(`Your slave is a skilled entertainer, well above average. Being a tease, ${he} is able to maintain an attractive blend of shame and arousal at the thought of being naked before you, and this inspires ${him} to tease you endlessly. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
				} else if (slave.skill.entertainment >= 40) {
					text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. The true entertainment comes from ${his} teasing nature, which makes ${him} blush cutely anytime ${he} shows a bit of skin. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
				} else if (slave.skill.entertainment >= 20) {
					text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing. ${His} attempts are made more entertaining by ${his} shame, which makes ${him} redden and blush whenever it's time for another article of clothing to come off. Even though ${his} entertainment skill needs improving, you genuinely enjoy the teasing way ${he} tugs at ${his} wear and makes you anticipate the removal of each article.`);
				} else if (slave.skill.entertainment >= 10) {
					text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${He} is a tease, which adds a bit of value, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
				} else {
					text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
				}
			} else {
				if (slave.fetishKnown === 1) {
					switch (slave.fetish) {
						case "submissive":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
							break;
						case "dom":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
							break;
						case "sadist":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
							break;
						case "masochist":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
							break;
						case "cumslut":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
							break;
						case "humiliation":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
							break;
						case "buttslut":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
							break;
						case "pregnancy":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
							break;
						case "boobs":
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 10) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}

							// // TODO: use or remove
							// if (slave.boobs >= 10000) {
							// 	text.push(`weighty mammaries`);
							// } else if (slave.boobs >= 2000) {
							// 	text.push(`cumbersome udders`);
							// } else if (slave.boobs >= 1000) {
							// 	text.push(`massive slave tits`);
							// } else if (slave.boobs >= 800) {
							// 	text.push(`forward-thrust breasts`);
							// } else if (slave.boobs >= 500) {
							// 	text.push(`meager chest`);
							// } else if (slave.boobs <= 400) {
							// 	text.push(`pathetic slave boobs`);
							// } else {
							// 	text.push(`tits`);
							// }
							// text.push(`across your body as ${he} goes down.`);
							break;
						default:
							if (slave.skill.entertainment >= 99) {
								text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
							} else if (slave.skill.entertainment >= 80) {
								text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
							} else if (slave.skill.entertainment >= 60) {
								text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
							} else if (slave.skill.entertainment >= 40) {
								text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
							} else if (slave.skill.entertainment >= 20) {
								text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
							} else {
								text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
							}
					}
				} else {
					if (slave.skill.entertainment >= 99) {
						text.push(`Your slave is a masterful entertainer, able to keep anyone entertained for even the most lengthy of strip teases. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} knows how to fulfill ${his} purpose. You keep trying to get back to work, but your slave's movements are so enthralling that you cannot seem to break free.`);
					} else if (slave.skill.entertainment >= 60) {
						text.push(`Your slave is a skilled entertainer, well above average. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} knows how to use ${his} hips and ass to draw and keep your attention while slowly moving up to ${his} chest. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose.`);
					} else if (slave.skill.entertainment >= 40) {
						text.push(`Your slave is a practiced entertainer, not masterful but still able to give an arousing performance. ${He} begins by writhing ${his} hips and rolling ${his} ass. ${He} is able to use ${his} hips and ass to draw your attention before suddenly moving up to ${his} chest. ${He} isn't able to fully keep your attention, but whenever ${he} sees that you are becoming distracted ${he} ups the ante to draw you back in. ${His} body is nothing more than an object for your desire, and ${he} is learning to fulfill ${his} purpose. ${He} does ${his} best to direct your arousal onto ${his} body.`);
					} else if (slave.skill.entertainment >= 20) {
						text.push(`Your slave works hard to keep with the rhythm while removing articles of clothing.`);
					} else if (slave.skill.entertainment >= 10) {
						text.push(`Your slave is not a skilled performer, and ${his} movements are uninspired. ${His} movements are still attractive, but you find yourself becoming distracted, ${his} dance not enough to keep your attention or draw you back. You take out your tablet and make a note that this slave will need to practice ${his} seduction if ${he} is to be allowed to dance for you again. Even without skill you still can admire ${his} body. You imagine how much more attractive ${his} tits and ass could be if ${he} knew how to move them right.`);
					} else {
						text.push(`Your slave has no skills to speak of, and isn't able to keep even the simplest of rhythms. ${He} fumbles about awkwardly and clumsily, stopping abruptly every so often to gracelessly remove an article of clothing. You decide to find ${his} lack of skill amusing, and allow ${him} to continue practicing while you resume your work.`);
					}
				}
			}

			return text.join(' ');
		}

		// function stripClothing() {
		// The following is formatting for later inclusion
		// TODO: use or remove
		/*
	switch (slave.clothes) {
		case "a Fuckdoll suit":
			text.push(`${slave.slaveName}'s Fuckdoll suit`);
			if (slave.boobs > 24000) {
				text.push(`fits each of ${his} awe-inspiring masses of breastflesh perfectly.`);
			} else if (slave.boobs > 12000) {
				text.push(`fits each of ${his} enormous masses of breastflesh perfectly.`);
			} else if (slave.boobs > 2000) {
				text.push(`fits each of ${his} huge breasts individually.`);
			} else if (slave.boobs > 800) {
				text.push(`fits each of ${his} heavy breasts individually.`);
			} else if (slave.boobs > 300) {
				text.push(`fits each of ${his} breasts individually.`);
			} else {
				text.push(`is flat across ${his} chest.`);
			}
			break;
		case "conservative clothing":
			if (slave.boobs > 24000) {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing a tent-like sweater tailored to cover ${his} tits.`);
			} else if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing a massively oversized custom sweater since nothing else comes close to modestly covering ${his} tits. Even so, it's stretched taut struggling to contain their immense mass.`);
			} else if (slave.boobs > 8000) {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing an oversized sweater, since that's the only top that will come close to covering ${his} tits. Even so, it's stretched taut just struggling to cover ${his} nipples.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing an oversized sweater, since that's the only top that will cover ${his} tits. Even so, it's stretched taut over them.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s blouse is professional, but can't conceal the gigantic dimensions of ${his} tits.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s blouse is professional, but can't conceal how big ${his} tits are.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s blouse is professional and includes a pleated front over ${his} flat chest.`);
			} else {
				text.push(`${slave.slaveName}'s blouse is professional and includes a pleated front over ${his} breasts.`);
			}
			break;
		case "chains":
			text.push(`${slave.slaveName}`);
			text.push(`has a length of chain painfully`);
			if (slave.boobs > 800) {
				text.push(`tightened around the base of each breast, forcing them out.`);
			} else if (slave.boobs < 300) {
				switch (slave.nipples) {
					case "huge":
						text.push(`wrapped around each of ${his} huge nipples, since they are the only things protruding from ${his} chest.`);
						break;
					case "inverted":
						text.push(`wrapped tightly across ${his} flat chest, through the cleft of ${his} inverted nipples.`);
						break;
					default:
						text.push(`wrapped tightly across ${his} flat chest, directly over ${his} ${slave.nipples} nipples.`);
				}
			} else {
				text.push(`looped under ${his} chest, forcing ${his} breasts up.`);
			}
			break;
		case "Western clothing":
			text.push(`${slave.slaveName}'s flannel shirt`);
			if (slave.boobs > 2000) {
				text.push(`can't begin to contain ${his} tits, so ${he}'s just tied it under them for support.`);
			} else if (slave.boobs > 800) {
				text.push(`can't close over ${his} tits, so ${he}'s just buttoned it up to where they start and let them fill it out above that.`);
			} else if (slave.boobs < 300) {
				text.push(`tightly hugs ${his} flat chest.`);
			} else {
				text.push(`rests comfortably over ${his} breasts.`);
			}
			break;
		case "body oil":
			if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s flat chest is covered in a sexy sheen of body oil.`);
			} else {
				text.push(`${slave.slaveName}'s breasts are covered in a sexy sheen of body oil.`);
			}
			break;
		case "a toga":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s breasts are too big to cover with ${his} toga, so ${he} leaves them hanging free.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing ${his} toga so as to leave one ${slave.nipples} nipple bare.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing ${his} toga so as to leave one breast bare.`);
			}
			break;
		case "a huipil":
			if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s breasts are so big that they pull up ${his} huipil uncomfortably high, so ${he} needs to fold it between them.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s huipil rests on ${his} flat chest.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing ${his} huipil which accentuates ${his} breasts.`);
			}
			break;
		case "a slutty qipao":
			text.push(`${slave.slaveName}'s qipao`);
			if (slave.boobs > 12000) {
				text.push(`can't contain the immense size of ${his} breasts, so ${he} wears a modified variant that lets ${his} tits hang free.`);
			} else if (slave.boobs > 4000) {
				text.push(`barely covers ${his} breasts, it strains to contain their absurd size. Breast flesh spills from any gap it can find.`);
			} else if (slave.boobs > 2000) {
				text.push(`demurely covers ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`demurely hugs ${his} flat chest.`);
			} else {
				text.push(`demurely covers ${his} breasts.`);
			}
			break;
		case "uncomfortable straps":
			text.push(`${slave.slaveName}'s slave`);
			if (slave.boobs > 12000) {
				text.push(`outfit includes a network of straps to support ${his} breasts, radiating outwards from the steel rings around ${his} nipples.`);
			} else if (slave.boobs > 2000) {
				text.push(`outfit has special straps for ${his} massive boobs: one strap down the front of each with steel rings to let ${his} nipples through, and a strap around the base of each, painfully squeezing ${his} breasts out to make them seem even bigger.`);
			} else if (slave.boobs > 800) {
				text.push(`outfit's straining straps restrain the flesh of ${his} tits like a string bikini, with steel rings to let ${his} nipples through.`);
			} else if (slave.boobs < 300) {
				text.push(`outfit's straps pass over ${his} flat chest like a string bikini, with steel rings to let ${his} ${slave.nipples} nipples through.`);
			} else {
				text.push(`outfit's straps pass over ${his} breasts like a string bikini, with steel rings to let ${his} nipples through.`);
			}
			break;
		case "shibari ropes":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`breasts are restrained by`);
				if (V.showInches === 2) {
					text.push(`yards and yards`);
				} else {
					text.push(`meters and meters`);
				}
				text.push(`of rope.`);
			} else if (slave.boobs > 2000) {
				text.push(`boobs are tightly bound with rope, soft flesh pushing out from between them.`);
			} else if (slave.boobs < 300) {
				text.push(`flat chest is tightly bound with rope, drawing attention to ${his} flat chest.`);
			} else {
				text.push(`chest is tightly bound with rope.`);
			}
			break;
		case "restrictive latex":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 2000) {
				text.push(`breasts protrude through holes in ${his} latex suit, which are too small for them, painfully constricting ${him} and making them seem even bigger.`);
			} else if (slave.boobs > 800) {
				text.push(`breasts protrude through holes in ${his} latex suit.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.nipples}`);
				text.push(`nipples poke through holes in ${his} latex suit, since ${he} has nothing else protruding from ${his} chest.`);
			} else {
				text.push(`latex suit leaves ${his} chest bare.`);
			}
			break;
		case "attractive lingerie":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`lace bra cannot cover the whole breast; its cups are half-moon shaped, and designed to offer what support they can to the bottom of them. They have disappeared completely under the immense quantity of breast flesh.`);
			} else if (slave.boobs > 4000) {
				text.push(`lace bra cannot cover the whole breast; its cups are half-moon shaped, and designed to offer what support they can to the bottom of them.`);
			} else if (slave.boobs > 800) {
				text.push(`sturdy lace bra supports ${his} huge breasts.`);
			} else if (slave.boobs < 300) {
				text.push(`pretty lace bra hugs ${his} flat chest.`);
			} else {
				text.push(`pretty lace bra accentuates ${his} breasts.`);
			}
			break;
		case "kitty lingerie":
			text.push(`${slave.slaveName}'s lacy bra features a hole shaped liked a cat's head in the center of ${his} chest;`);
			if (slave.boobs > 12000) {
				text.push(`${his} breasts have stretched ${his} bra to the point that the hole is unrecognizable as anything feline.`);
			} else if (slave.boobs > 4000) {
				text.push(`the size of ${his} breasts severely stretches out the hole's shape.`);
			} else if (slave.boobs > 800) {
				text.push(`the size of ${his} breasts stretches out the hole's shape.`);
			} else if (slave.boobs < 300) {
				text.push(`it lies flat against ${his} body.`);
			} else {
				text.push(`the hole lies directly over ${his} cleavage.`);
			}
			break;
		case "a succubus outfit":
			text.push(`${slave.slaveName}'s corset ends just below ${his}`);
			if (slave.boobs < 300) {
				text.push(`non-existent`);
			}
			text.push(`breasts, leaving them bare.`);
			if (slave.boobs > 2000) {
				text.push(`It hugs ${his} tightly and comes up to right under where they start, forcing them to spill over and hide its upper half.`);
			} else if (slave.boobs > 400) {
				text.push(`It hugs ${his} tightly and comes up to right under where they start, presenting them like a push-up bra.`);
			}
			break;
		case "a slutty maid outfit":
			text.push(`${slave.slaveName}'s maid dress stops below ${his}`);
			if (slave.boobs < 300) {
				text.push(`non-existent`);
			}
			text.push(`breasts, but the outfit includes a thin white blouse`);
			if (slave.boobs > 4000) {
				text.push(`that fails to even come close to covering ${his} immense breasts.`);
			} else if (slave.boobs > 2000) {
				text.push(`that covers them to just over ${his} nipples when ${he} pulls it up over them. It's pulled down by ${his} huge chest whenever ${he} moves.`);
			} else if (slave.boobs > 800) {
				text.push(`that covers them to just over ${his} nipples, leaving a large area of deliciously unsupported and jiggling cleavage.`);
			} else if (slave.boobs < 300) {
				text.push(`that hugs ${his} flat chest and lets ${his} ${slave.nipples} nipples protrude through the fabric.`);
			} else {
				text.push(`to cover them.`);
			}
			break;
		case "a nice maid outfit":
			text.push(`${slave.slaveName}'s maid dress front is almost conservative, covering ${his}`);
			if (slave.boobs > 12000) {
				text.push(`immense breasts with a tent-like billow of white fabric.`);
			} else if (slave.boobs > 6000) {
				text.push(`immense breasts as best it can; it barely succeeds at its task, straining at the seams and allowing breast flesh to spill out of every available gap.`);
			} else if (slave.boobs > 2000) {
				text.push(`breasts, though it cannot conceal their enormous mass.`);
			} else if (slave.boobs < 300) {
				text.push(`flat chest, though it does nothing to hide how flat ${he} is.`);
			} else {
				text.push(`breasts.`);
			}
			break;
		case "a fallen nuns habit":
			text.push(`${slave.slaveName}'s latex habit includes a`);
			if (slave.boobs > 20000) {
				text.push(`half-corset, but it's completely invisible, being hidden under ${his} inhuman tits.`);
			} else if (slave.boobs > 4000) {
				text.push(`half-corset, but only the bottom edge is visible: the rest is swallowed up under ${his} gigantic tits.`);
			} else if (slave.boobs > 800) {
				text.push(`half-corset to force ${his} big boobs up and forward, forming a lot of cleavage even though they're bare.`);
			} else if (slave.boobs < 300) {
				text.push(`half-corset that tightly hugs ${his} flat chest.`);
			} else {
				text.push(`half-corset to force ${his} boobs up and forward.`);
			}
			break;
		case "a chattel habit":
			text.push(`${slave.slaveName}'s chattel habit's scapular covers ${his} shoulders`);
			if (hasAnyArms(slave)) {
				text.push(`and arm`);
				if (hasBothArms(slave)) {
					text.push(`s`);
				}
			}
			text.push(r.pop() + `, but is open in front, leaving ${his}`);
			if (slave.boobs > 4000) {
				text.push(`boobs completely bare. It tucks into a golden belt, though this is buried under ${his} breasts.`);
			} else if (slave.boobs > 300) {
				text.push(`boobs completely bare. It tucks into a golden belt, which is cinched up right under ${his} breasts.`);
			} else {
				text.push(`flat chest completely bare. It tucks into a golden belt cinched around ${his} middle torso.`);
			}
			break;
		case "a penitent nuns habit":
			text.push(`If ${he} fails to hold ${his} torso totally still, the coarse cloth of ${his} top agonizingly scrapes across ${his} nipples, bare under ${his} habit.`);
			break;
		case "a string bikini":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s breasts are so large that the little scraps of cloth intended for ${his} nipples can't really stay centered over them.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s huge breasts constantly pull ${his} nipples out from under the tiny scrap of cloth that ${his} string bikini affords them.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big breasts threaten to break out of ${his} straining string bikini top.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s string bikini top barely covers anything, affording only a tiny scrap of cloth for each nipple; not that there is much else to cover on ${his} flat chest.`);
			} else {
				text.push(`${slave.slaveName}'s string bikini top barely covers anything, affording only a tiny scrap of cloth for each nipple.`);
			}
			break;
		case "a scalemail bikini":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s breasts are so large that it's a testament to ${his} scalemail top that it hasn't broken yet.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s huge breasts constantly strain ${his} scalemail top.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s scalemail top contains ${his} big breasts well.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s scalemail bikini top easily covers everything, as there is not much to cover on ${his} flat chest.`);
			} else {
				text.push(`${slave.slaveName}'s scalemail bikini top covers everything, while still flaunting it.`);
			}
			break;
		case "striped panties":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s enormous breasts are completely bare.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s huge breasts are completely bare.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s breasts are completely bare.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s flat breasts are completely bare.`);
			} else {
				text.push(`${slave.slaveName}'s breasts are completely bare.`);
			}
			break;
		case "clubslut netting":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`immense boobs hang out the holes they tore in ${his} clubslut netting.`);
			} else if (slave.boobs > 4000) {
				text.push(`clubslut netting is stretched to the breaking point by ${his} massive boobs.`);
			} else if (slave.boobs > 800) {
				text.push(`clubslut netting is stretched by ${his} big breasts.`);
			} else if (slave.boobs < 300) {
				text.push(`clubslut netting hugs ${his} flat chest.`);
			} else {
				text.push(`clubslut netting hugs ${his} chest tightly.`);
			}
			break;
		case "a cheerleader outfit":
			text.push(`${slave.slaveName}'s cheerleader top`);
			if (slave.boobs > 12000) {
				text.push(`can't support ${his} giant bust and is lost beneath ${his} immense breasts.`);
			} else if (slave.boobs > 4000) {
				text.push(`is strongly engineered, but it can barely support ${his} enormous bust.`);
			} else if (slave.boobs > 800) {
				text.push(`gives ${him} an acre of cleavage.`);
			} else if (slave.boobs < 300) {
				text.push(`tightly clings to ${his} flat chest, prominently displaying ${his} ${slave.nipples} nipples.`);
			} else {
				text.push(`does its best to make ${his} boobs look bigger than they are.`);
			}
			break;
		case "cutoffs and a t-shirt":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`tits are so huge that ${his} t-shirt rests pathetically atop their mass.`);
			} else if (slave.boobs > 4000) {
				text.push(`tits are so big that ${his} t-shirt barely comes down over ${his} nipples, leaving a lot of underboob hanging out.`);
			} else if (slave.boobs > 1200) {
				text.push(`t-shirt is held out and away from ${his} midriff by ${his} big breasts.`);
			} else if (slave.boobs < 300) {
				text.push(`t-shirt is tied across ${his} flat chest to bare ${his} midriff.`);
			} else {
				text.push(`t-shirt is tied up to bare ${his} midriff.`);
			}
			break;
		case "spats and a tank top":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 20000) {
				text.push(`tank top lies atop ${his} massive rack.`);
			} else if (slave.boobs > 12000) {
				text.push(`tank top just barely covers ${his} nipples despite its fairly large size.`);
			} else if (slave.boobs > 4000) {
				text.push(`tank top can never completely cover ${his} tits, giving varying amounts of underboob as ${he} moves about.`);
			} else if (slave.boobs > 1200) {
				text.push(`midriff is open to see as ${his} chest makes ${his} tank top ride up.`);
			} else {
				text.push(`tank top is tight against ${his}`);
				if (slave.boobs < 300) {
					text.push(`flat`);
				}
				text.push(`chest.`);
			}
			break;
		case "a slutty outfit":
			text.push(`${slave.slaveName}`);
			if (slave.boobs > 12000) {
				text.push(`has given up trying to contain ${his} immense bust and is now choosing outfits that allow ${his} breasts to hang free.`);
			} else if (slave.boobs > 4000) {
				text.push(`has to be careful choosing slutty outfits that can restrain ${his} massive breasts.`);
			} else if (slave.boobs > 800) {
				text.push(`has to be careful choosing slutty outfits that can handle ${his} big breasts.`);
			} else if (slave.boobs < 300) {
				text.push(`chooses slutty outfits that go well on a ${girl} with no tits.`);
			} else {
				text.push(`chooses slutty outfits that accentuate ${his} breasts.`);
			}
			break;
		case "a slave gown":
			text.push(`${slave.slaveName}'s slave gown`);
			if (slave.boobs > 12000) {
				text.push(`is no longer able to cover ${his} immense breasts. Instead, it has been redesigned to draw the eye to them.`);
			} else if (slave.boobs > 4000) {
				text.push(`is carefully engineered and is somehow able to cover the enormous mass of ${his} breasts.`);
			} else if (slave.boobs > 800) {
				text.push(`is carefully tailored, tastefully covering yet enhancing ${his} big breasts.`);
			} else if (slave.boobs < 300) {
				text.push(`is carefully tailored to closely hug ${his} flat chest.`);
			} else {
				text.push(`subtly accentuates ${his} breasts.`);
			}
			break;
		case "a halter top dress":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s immense breasts are far too big for ${his} dress to contain; instead it has been redesigned to allow them to hang freely.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s enormous breasts are spill out from every available space in ${his} beautiful halter top dress.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s enormous breasts are bulging inside a beautiful halter top dress.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s ${adjNoun} are draped inside a beautiful halter top dress, making them the center of attention.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing a beautiful silky halter top dress, almost as if it was sculpted to hug ${his} flat chest.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing a beautiful silky halter top dress, almost as if it was sculpted to match ${his} frame.`);
			}
			break;
		case "a ball gown":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}`);
				text.push(`fabulous silken ball gown is designed to allow ${his} oversized breasts to hang free.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}`);
				text.push(`somehow managed to cram the immense mass of ${his} breasts inside a fabulous silken ball gown. They spill out of every available gap.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}`);
				text.push(`somehow managed to fit the enormous mass of ${his} breasts inside a fabulous silken ball gown.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s fabulous silken ball gown is carefully tailored, beautifully covering yet enhancing ${his} big breasts.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s fabulous silken ball gown is carefully tailored, beautifully caressing ${his} flat chest.`);
			} else {
				text.push(`${slave.slaveName}'s draped inside a fabulous silken ball gown.`);
			}
			break;
		case "slutty business attire":
			text.push(`${slave.slaveName}'s suit jacket`);
			if (slave.boobs > 12000) {
				text.push(`and blouse are both open in front, leaving ${his} boobs bare, since there's no way ${he} could button ${his} clothes over ${his} tits.`);
			} else if (slave.boobs > 2000) {
				text.push(`is open in front, and ${his} straining blouse barely restrains ${his} tits.`);
			} else if (slave.boobs < 300) {
				text.push(`is open in front, tightly hugging ${his} flat chest and prominently displaying ${his} ${slave.nipples} nipples.`);
			} else {
				text.push(`is open in front, and ${his} blouse barely covers ${his} breasts.`);
			}
			break;
		case "nice business attire":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`tits are so immense that ${his} specially tailored blouse and jacket are incapable of being buttoned up.`);
			} else if (slave.boobs > 4000) {
				text.push(`tits are so huge that they prevent ${his} jacket from closing. Every motion ${he} makes threatens to turn ${his} blouse buttons into ballistics.`);
			} else if (slave.boobs > 2000) {
				text.push(`tits are so big that they strain even ${his} specially tailored blouse and jacket.`);
			} else if (slave.boobs > 800) {
				text.push(`big tits strain against ${his} tailored blouse and jacket.`);
			} else if (slave.boobs < 300) {
				text.push(`suit jacket is fitted tightly to ${his} flat chest.`);
			} else {
				text.push(`suit jacket conceals a flattering bra that lifts and presents ${his} bosom.`);
			}
			break;
		case "a comfortable bodysuit":
			if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s bodysuit is so tightly form-fitting that it clings to ${his} flat chest and prominently displays ${his} ${slave.nipples} nipples.`);
			} else {
				text.push(`${slave.slaveName}'s bodysuit is so tightly form-fitting that ${his} breasts are individually hugged and supported by the material.`);
			}
			break;
		case "a latex catsuit":
			if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s latex catsuit fits ${him} like a second skin, showing off every detail of ${his} ${slave.nipples} nipples and distinct lack of breasts.`);
			} else {
				text.push(`${slave.slaveName}'s latex catsuit fits ${him} like a second skin, showing off every detail of ${his} nipples and breasts.`);
			}
			break;
		case "a military uniform":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} specially tailored shirt and tunic are incapable of being buttoned up.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that they prevent ${his} tunic from closing. Every motion threatens to turn ${his} shirt buttons into shrapnel.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain even ${his} specially tailored shirt and tunic.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} tailored shirt and tunic.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} tunic.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "a schutzstaffel uniform":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} specially tailored shirt and tunic are incapable of being buttoned up.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that they prevent ${his} tunic from closing. Every motion threatens to turn ${his} shirt buttons into shrapnel.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain even ${his} specially tailored shirt and tunic.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} tailored shirt and tunic.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} tunic.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "a slutty schutzstaffel uniform":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} specially tailored shirt and tunic are incapable of being buttoned up.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that they prevent ${his} tunic from closing. Every motion threatens to turn ${his} shirt buttons into shrapnel.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain even ${his} specially tailored shirt and tunic.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} tailored shirt and tunic.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} tunic.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "a long qipao":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} dress is on the verge of bursting open.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that ${his} dress is on the verge of bursting open.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain even ${his} dress greatly.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} dress.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} dress.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "battlearmor":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} armor is on the verge of bursting open.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that ${his} armor is on the verge of bursting open.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they armor even ${his} dress greatly.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} armor.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} armor.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "Imperial Plate":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s massive tits create almost comical balloons at the front of ${his} ultra-heavy armor, undeniably gargantuan even underneath the tank-like armor.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s huge breasts each require an individual plate on ${his} ultra-heavy Imperial armor.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s fat boobs clearly swell against the front of ${his} ultra-heavy armor.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s significant breasts create a noticeable swell at the front of ${his} ultra-heavy armor.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`'s chest appears perfectly flat beneath ${his} ultra-heavy Imperial armor.`);
			}
			break;
		case "a mounty outfit":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} specially tailored shirt and tunic are incapable of being buttoned up.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that they prevent ${his} tunic from closing. Every motion threatens to turn ${his} shirt buttons into shrapnel.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain even ${his} specially tailored shirt and tunic.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} tailored shirt and tunic.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} tunic.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "a dirndl":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} dress are incapable of being laced up.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that they prevent ${his} dress from being laced up.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain ${his} dress.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} dress.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} dress.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "lederhosen":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} specially tailored shirt and tunic are incapable of being buttoned up.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that they prevent ${his} tunic from closing. Every motion threatens to turn ${his} shirt buttons into shrapnel.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain even ${his} specially tailored shirt and tunic.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} tailored shirt and tunic.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} tunic.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "a biyelgee costume":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} dress are incapable of being buttoned up.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that they prevent ${his} dress from being buttoned up.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain ${his} dress.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} dress.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} dress.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "a red army uniform":
		case "a police uniform":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s tits are so immense that ${his} specially tailored shirt and tunic are incapable of being buttoned up.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}'s tits are so huge that they prevent ${his} tunic from closing. Every motion threatens to turn ${his} shirt buttons into shrapnel.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s tits are so big that they strain even ${his} specially tailored shirt and tunic.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s big tits strain against ${his} tailored shirt and tunic.`);
			} else {
				text.push(`${slave.slaveName}`);
				text.push(`cuts a dashing figure in ${his} tunic.`);
				if (slave.boobs < 300) {
					text.push(`${His} ${either("androgynous", "flat")} breasts are barely there.`);
				}
			}
			break;
		case "a nice nurse outfit":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`immense tits are too big for ${his} scrub top, it rests uselessly atop ${his} bust.`);
			} else if (slave.boobs > 4000) {
				text.push(`massive tits strain against ${his} scrub top, it only manages to cover ${his} nipples.`);
			} else if (slave.boobs > 2000) {
				text.push(`massive tits strain against ${his} scrub top, filling it out completely despite its utilitarian cut.`);
			} else if (slave.boobs > 800) {
				text.push(`sizable tits nicely fill out ${his} scrub top, despite its utilitarian cut.`);
			} else if (slave.boobs < 300) {
				text.push(`scrub top tightly hugs ${his} flat chest.`);
			} else {
				text.push(`tits are hidden beneath ${his} scrub top.`);
			}
			break;
		case "a mini dress":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`mini dress is pulled down to allow ${his} immense breasts to hang free.`);
			} else if (slave.boobs > 4000) {
				text.push(`massive breasts stretch ${his} custom tailored dress to its absolute limit.`);
			} else if (slave.boobs > 800) {
				text.push(`big breasts stretch ${his} dress taut, leaving nothing to the imagination.`);
			} else if (slave.boobs < 300) {
				text.push(`dress tightly hugs ${his} flat chest, prominently displaying ${his} ${slave.nipples} nipples though the fabric.`);
			} else {
				text.push(`chest stretches taut against ${his} dress, leaving little to the imagination.`);
			}
			break;
		case "an apron":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`breasts are so immense that ${his} apron can barely contain them, and ${he} has to be careful not to expose one or both of ${his} ${slave.nipples} nipples as ${he} moves.`);
			} else if (slave.boobs > 4000) {
				text.push(`massive breasts fill out ${his} strained apron, occasionally leaving the sides of ${his} ${slave.nipples} nipples bare.`);
			} else if (slave.boobs > 800) {
				text.push(`big breasts fill out ${his} stretched apron, only just managing to fully cover ${his} ${slave.nipples} nipples.`);
			} else if (slave.boobs < 300) {
				text.push(`apron lies flatly against ${his} small chest and ${slave.nipples} nipples.`);
			} else {
				text.push(`breasts fill out ${his} apron, which is strategically worn to cover ${his} ${slave.nipples} nipples.`);
			}
			break;
		case "overalls":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`breasts are so immense that ${his} overalls can barely contain them, and ${he} has to be careful not to expose one or both of ${his} ${slave.nipples} nipples as ${he} moves.`);
			} else if (slave.boobs > 4000) {
				text.push(`giant breasts peek out from the sides of ${his} strained overalls, often exposing the sides of ${his} ${slave.nipples} nipples.`);
			} else if (slave.boobs > 800) {
				text.push(`huge breasts fill out ${his} stretched overalls, only just managing to fully cover ${his} ${slave.nipples} nipples.`);
			} else if (slave.boobs < 300) {
				text.push(`overalls lie flatly against ${his} small chest and ${slave.nipples} nipples.`);
			} else {
				text.push(`overalls are filled out by ${his} breasts, offering tantalizing views of their sides.`);
			}
			break;
		case "a leotard":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`tits are so big that even ${his} specially tailored leotard cannot really support them.`);
			} else if (slave.boobs > 2000) {
				text.push(`big tits stretch the spandex of ${his} leotard taut across their width.`);
			} else if (slave.boobs < 300) {
				text.push(`leotard tightly hugs ${his} flat chest, prominently displaying ${his} ${slave.nipples} nipples though the spandex.`);
			} else {
				text.push(`chest is flattered by ${his} leotard.`);
			}
			break;
		case "a monokini":
			text.push(`The shoulder straps of ${slave.slaveName}'s monokini cross over in the center of ${his} chest, leaving the rest of ${his}`);
			if (slave.boobs > 12000) {
				text.push(`gigantic breasts totally bare.`);
			} else if (slave.boobs > 2000) {
				text.push(`large breasts totally bare.`);
			} else if (slave.boobs < 300) {
				text.push(`flat chest totally bare.`);
			} else {
				text.push(`breasts totally bare.`);
			}
			break;
		case "a cybersuit":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`gigantic breasts stretch out the bodysuit so tightly that ${his} nipples are clearly visible.`);
			} else if (slave.boobs > 2000) {
				text.push(`large breasts stretch out the bodysuit so tightly that ${his} nipples are nearly visible.`);
			} else if (slave.boobs < 300) {
				text.push(`flat chest is hugged tightly by the bodysuit, ${his} nipples pushing against the material.`);
			} else {
				text.push(`breasts are hugged tightly by the bodysuit, ${his} nipples pushing against the material.`);
			}
			break;
		case "a tight Imperial bodysuit":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`gigantic breasts stretch out the bodysuit so tightly that ${his} nipples are clearly visible.`);
			} else if (slave.boobs > 2000) {
				text.push(`large breasts stretch out the bodysuit so tightly that ${his} nipples are nearly visible.`);
			} else if (slave.boobs < 300) {
				text.push(`flat chest is hugged tightly by the bodysuit, ${his} nipples pushing against the material.`);
			} else {
				text.push(`breasts are hugged tightly by the bodysuit, ${his} nipples pushing against the material.`);
			}
			break;
		case "a bunny outfit":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`tits are so immense that ${his} teddy can't contain them; it's pulled down to allow them to hang free.`);
			} else if (slave.boobs > 6000) {
				text.push(`tits are so huge that ${his} teddy conceals special stays to keep them from popping out at the slightest movement. Breast flesh massively overflows ${his} top.`);
			} else if (slave.boobs > 2000) {
				text.push(`tits are so big that ${his} teddy conceals special stays to keep them from popping out at the slightest movement.`);
			} else if (slave.boobs > 800) {
				text.push(`big tits are perpetually on the verge of spilling out of ${his} top.`);
			} else if (slave.boobs < 300) {
				text.push(`teddy tightly clings to ${his} flat chest somehow making ${him} look even flatter.`);
			} else {
				text.push(`teddy conceals cunning stays designed to make ${his} bosom look considerably bigger than it actually is.`);
			}
			break;
		case "attractive lingerie for a pregnant woman":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`top has been retailored to fit ${his} enormous bust. The ample breast flesh almost completely consumes ${his} silken lingerie. ${His} silken vest is barely visible behind ${his} massive tits.`);
			} else if (slave.boobs > 4000) {
				text.push(`gigantic tits dwarf ${his} tiny top. It barely manages to cover ${his} nipples. ${His} silken vest is parted to either side of ${his} breasts.`);
			} else if (slave.boobs > 800) {
				text.push(`large breasts spill out from above and below ${his} tight top.`);
			} else if (slave.boobs < 300) {
				text.push(`top tightly clings to ${his} flat chest.`);
			} else {
				text.push(`top tightly clings to ${his} chest.`);
			}
			break;
		case "a maternity dress":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 12000) {
				text.push(`low cut dress can't contain ${his} enormous breasts, so ${he} keeps it pulled up just below ${his} bust.`);
			} else if (slave.boobs > 4000) {
				text.push(`low cut dress can barely conceal ${his} giant breasts. They bulge over the top and create a deep valley of cleavage.`);
			} else if (slave.boobs > 1000) {
				text.push(`dress is low cut and reveals a large amount of cleavage.`);
			} else if (slave.boobs < 300) {
				text.push(`dress is low cut, tightly hugs ${his} flat chest and ends just above ${his} nipples.`);
			} else {
				text.push(`dress is low cut and ends just above ${his} nipples.`);
			}
			break;
		case "stretch pants and a crop-top":
			if (slave.boobs > 20000) {
				text.push(`${slave.slaveName}`);
				text.push(`is wearing a massively oversized custom crop-top designed to handle ${his} monumental tits. Even so, it's stretched taut just struggling to cover ${his} nipples, causing acres of breast flesh to spill out from under and above it.`);
			} else if (slave.boobs > 10000) {
				text.push(`${slave.slaveName}'s oversized crop-top struggles to contain even half of ${his} immense breasts leaving plenty of underboob visible alongside with ${his} cleavage. Every motion risks a nipple popping free.`);
			} else if (slave.boobs > 8000) {
				text.push(`${slave.slaveName}'s oversized crop-top struggles to contain ${his} enormous breasts leaving plenty of underboob visible alongside with ${his} cleavage.`);
			} else if (slave.boobs > 4000) {
				text.push(`${slave.slaveName}`);
				text.push(`has swapped up to the largest crop-top available. Even so, it barely covers them and creates plenty of cleavage.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s crop-top struggles to contain ${his} huge breasts leaving plenty of underboob visible alongside with ${his} cleavage.`);
			} else if (slave.boobs > 800) {
				text.push(`${slave.slaveName}'s crop-top tightly hugs ${his} big breasts creating plenty of cleavage.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}'s crop-top tightly clings to ${his} flat chest.`);
			} else {
				text.push(`${slave.slaveName}'s crop-top tightly hugs ${his} breasts.`);
			}
			switch (slave.sexualFlaw) {
				case "neglectful":
					text.push(`"All For You"`);
					break;
				case "cum addict":
					text.push(`"Cum 'ere Sexy"`);
					break;
				case "anal addict":
					text.push(`"Reach Around Back"`);
					break;
				case "attention whore":
					text.push(`"Will Flash For Attention"`);
					break;
				case "breast growth":
					text.push(`"Could Be Bigger"`);
					break;
				case "abusive":
					text.push(`"Fondlers May Be Slapped"`);
					break;
				case "malicious":
					text.push(`"Careful, I Bite"`);
					break;
				case "self hating":
					text.push(`"Rough 'em Up"`);
					break;
				case "breeder":
					text.push(`"Drink Deep"`);
					break;
				default:
					if (slave.fetishKnown === 1) {
						switch (slave.fetish) {
							case "submissive":
								text.push(`"Take Me"`);
								break;
							case "cumslut":
								text.push(`"Splash Zone"`);
								break;
							case "humiliation":
								text.push(`"Flasher"`);
								break;
							case "buttslut":
								text.push(`"Reach Around"`);
								break;
							case "boobs":
								text.push(`"Your Hands Here"`);
								break;
							case "sadist":
								text.push(`"Taste the Pain"`);
								break;
							case "masochist":
								text.push(`"Be Rough"`);
								break;
							case "dom":
								text.push(`"Queen Bitch"`);
								break;
							case "pregnancy":
								text.push(`"Milk Me"`);
								break;
							case Fetish.MINDBROKEN:
								text.push(`"Free Slut"`);
								break;
							default:
								text.push(App.Desc.inscrip(slave));
						}
					} else {
						text.push(App.Desc.inscrip(slave));
					}
			}
			text.push(`is written across ${his} chest in large, vibrant letters.`);
			break;
		case "harem gauze":
			text.push(`${slave.slaveName}'s harem girl outfit`);
			if (slave.boobs > 12000) {
				text.push(`lets ${his} inhuman breasts rest beneath`);
			} else if (slave.boobs > 800) {
				text.push(`lets ${his} breasts swing free beneath`);
			} else if (slave.boobs < 300) {
				text.push(`gently covers ${his} flat chest with`);
			} else {
				text.push(`only covers ${his} breasts with`);
			}
			text.push(`a thin film of gauze.`);
			break;
		case "a slutty nurse outfit":
			text.push(`${slave.slaveName}'s jacket`);
			if (slave.boobs > 4000) {
				text.push(`closes beneath ${his} tits, leaving almost everything visible.`);
			} else if (slave.boobs > 800) {
				text.push(`pushes ${his} tits together to form some great cleavage.`);
			} else if (slave.boobs < 300) {
				text.push(`tightly hugs ${his} flat chest, since it has no breasts to form cleavage with.`);
			} else {
				text.push(`pushes ${his} tits together to form as much cleavage as possible.`);
			}
			break;
		case "a schoolgirl outfit":
			text.push(`${slave.slaveName}'s`);
			if (slave.boobs > 4000) {
				text.push(`breasts are too big for ${his} blouse, so ${he}'s tied it under them; they're so huge that it's buried under them.`);
			} else if (slave.boobs > 800) {
				text.push(`breasts are too big for ${his} blouse, so ${he}'s tied it under them and left them totally bare.`);
			} else if (slave.boobs < 300) {
				text.push(`blouse tightly hugs ${his} flat chest.`);
			} else {
				text.push(`blouse only barely covers ${his} breasts.`);
			}
			break;
		case "a kimono":
			text.push(`${slave.slaveName}'s kimono`);
			if (slave.boobs > 12000) {
				text.push(`can't cover ${his} breasts, so ${he} leaves it hanging loose; allowing them to hang freely.`);
			} else if (slave.boobs > 4000) {
				text.push(`barely covers ${his} breasts. It reveals most of ${his} chest, just covering the outer edges of ${his} breasts and their nipples.`);
			} else if (slave.boobs > 2000) {
				text.push(`demurely covers ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`demurely rests over ${his} flat chest.`);
			} else {
				text.push(`demurely covers ${his} breasts.`);
			}
			break;
		case "battledress":
			if (slave.boobs > 12000) {
				text.push(`${slave.slaveName}'s immense breasts are barely supported by a specially engineered, space-age sports bra.`);
			} else if (slave.boobs > 2000) {
				text.push(`${slave.slaveName}'s huge breasts are supported by a specially engineered, space-age sports bra under ${his} tank top.`);
			} else if (slave.boobs < 300) {
				text.push(`${slave.slaveName}`);
				text.push(`is flat as an ironing board; ${he} wears ${his} tank top without a bra underneath.`);
			} else {
				text.push(`${slave.slaveName}'s breasts are supported by a sports bra under ${his} tank top.`);
			}
			break;
		case "slutty jewelry":
			text.push(`${slave.slaveName}'s bangles include a`);
			if (slave.boobs > 2000) {
				text.push(`thin chain that runs under ${his} breasts, disappearing entirely.`);
			} else if (slave.boobs > 800) {
				text.push(`thin chain that runs under ${his} breasts, appearing and disappearing enticingly when ${he} moves.`);
			} else if (slave.boobs < 300) {
				text.push(`thin chain that runs across ${his} flat chest.`);
			} else {
				text.push(`light chain that loops under ${his} breasts.`);
			}
			break;
		case "a burqa":
			text.push(`${slave.slaveName}'s burqa`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "a tube top and thong":
		case "a tube top":
		case "leather pants and a tube top":
			text.push(`${slave.slaveName}'s tube top`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "a button-up shirt and panties":
		case "a button-up shirt":
		case "a t-shirt":
		case "a t-shirt and thong":
		case "a t-shirt and panties":
		case "sport shorts and a t-shirt":
		case "a t-shirt and jeans":
			text.push(`${slave.slaveName}'s shirt`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "an oversized t-shirt and boyshorts":
		case "an oversized t-shirt":
			text.push(`${slave.slaveName}'s over-sized shirt`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, the fabric easily stretches to cover ${his} expansive mounds of flesh.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts, the fabric easily covers ${his} absurdly-sized breasts.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "a thong":
		case "a skimpy loincloth":
		case "boyshorts":
		case "cutoffs":
		case "leather pants":
		case "panties":
		case "jeans":
		case "sport shorts":
			text.push(`${slave.slaveName}'s breasts`);
			if (slave.boobs > 12000) {
				text.push(`are completely bare.`);
			} else if (slave.boobs > 8000) {
				text.push(`are completely bare.`);
			} else if (slave.boobs > 4000) {
				text.push(`are completely bare.`);
			} else if (slave.boobs < 300) {
				text.push(`are completely bare.`);
			} else {
				text.push(`are completely bare.`);
			}
			break;
		case "a tank-top":
		case "a tank-top and panties":
			text.push(`${slave.slaveName}'s tank-top`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "a sweater":
		case "a sweater and cutoffs":
		case "a sweater and panties":
			text.push(`${slave.slaveName}'s sweater`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "leather pants and pasties":
		case "panties and pasties":
			text.push(`${slave.slaveName}'s breasts`);
			if (slave.boobs > 12000) {
				text.push(`are completely bare, except for the pasties covering ${his} nipples.`);
			} else if (slave.boobs > 8000) {
				text.push(`are completely bare, except for the pasties covering ${his} nipples.`);
			} else if (slave.boobs > 4000) {
				text.push(`are completely bare, except for the pasties covering ${his} nipples.`);
			} else if (slave.boobs < 300) {
				text.push(`are completely bare, except for the pasties covering ${his} nipples.`);
			} else {
				text.push(`are completely bare, except for the pasties covering ${his} nipples.`);
			}
			break;
		case "a bra":
		case "a striped bra":
		case "a sports bra":
		case "sport shorts and a sports bra":
		case "striped underwear":
			text.push(`${slave.slaveName}'s bra`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "a nice pony outfit":
		case "a slutty pony outfit":
			text.push(`${slave.slaveName}'s outfit`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "a one-piece swimsuit":
			text.push(`${slave.slaveName}'s swimsuit`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "a gothic lolita dress":
		case "a hanbok":
			text.push(`${slave.slaveName}'s blouse`);
			if (slave.boobs > 12000) {
				text.push(`entirely conceals ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 8000) {
				text.push(`entirely conceals ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 4000) {
				text.push(`entirely conceals ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`entirely conceals ${his} flat chest.`);
			} else {
				text.push(`entirely conceals ${his} breasts.`);
			}
			break;
		case "a hijab and abaya":
		case "a niqab and abaya":
			text.push(`${slave.slaveName}'s abaya`);
			if (slave.boobs > 12000) {
				text.push(`modestly covers ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 4000) {
				text.push(`modestly covers ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 2000) {
				text.push(`modestly covers ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`modestly rests over ${his} flat chest.`);
			} else {
				text.push(`modestly covers ${his} breasts.`);
			}
			break;
		case "a klan robe":
		case "a slutty klan robe":
			text.push(`${slave.slaveName}'s robe`);
			if (slave.boobs > 12000) {
				text.push(`modestly covers ${his} breasts, although the fabric struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 4000) {
				text.push(`modestly covers ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 2000) {
				text.push(`modestly covers ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`modestly rests over ${his} flat chest.`);
			} else {
				text.push(`modestly cover ${his} breasts.`);
			}
			break;
		case "a hijab and blouse":
			text.push(`${slave.slaveName}'s two shirts`);
			if (slave.boobs > 12000) {
				text.push(`modestly cover ${his} breasts, although the fabrics struggle to ensure they are entirely covered.`);
			} else if (slave.boobs > 4000) {
				text.push(`modestly cover ${his} breasts. They have both been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 2000) {
				text.push(`modestly cover ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`modestly cover ${his} flat chest.`);
			} else {
				text.push(`modestly cover ${his} breasts.`);
			}
			break;
		case "a burkini":
			text.push(`${slave.slaveName}'s burkini`);
			if (slave.boobs > 12000) {
				text.push(`modestly covers ${his} breasts, although it struggles to ensure they are entirely covered.`);
			} else if (slave.boobs > 4000) {
				text.push(`modestly covers ${his} breasts. It has been let out a great deal in order to cover the entirety of ${his} chest.`);
			} else if (slave.boobs > 2000) {
				text.push(`modestly covers ${his} breasts, though it cannot conceal their absurd size.`);
			} else if (slave.boobs < 300) {
				text.push(`modestly covers ${his} flat chest.`);
			} else {
				text.push(`modestly covers ${his} breasts.`);
			}
			break;
		case "a Santa dress":
			text.push(`${slave.slaveName}'s red holiday dress is designed with a dangerously low neckline, which`);
			if (slave.boobs > 12000) {
				text.push(`${his} colossal breasts spill out of completely unheeded.`);
			} else if (slave.boobs > 4000) {
				text.push(`serves only to prop up ${his} massive, otherwise naked breasts.`);
			} else if (slave.boobs > 2000) {
				text.push(`lies at nipple-level on ${his} big breasts, leaving a decent portion of ${his} areolae uncovered.`);
			} else if (slave.boobs < 300) {
				text.push(`hangs lowly on ${his} flat chest, occasionally revealing one of ${his} nipples.`);
			} else {
				text.push(`accentuates ${his} cleavage, especially since it always appears to be slipping down ${his} body.`);
			}
			break;
		default:
	}
	*/
		// End clothing-specific stripping */
		// }

		function conclusion() {
			const text = [];


			text.push(`Once the last piece of clothing has hit the floor you let your little slut dance naked a little while longer while you finish your last report. Once you have gotten enough of ${his} dancing you snap your fingers to call your slave over.`);

			if (slave.devotion > 80) {
				text.push(`Your slave hurries to your side and drops to ${his} ${(hasBothLegs(slave)) ? `knees` : `knee`}. ${He} gladly kneels at your feet, looking up at ${his} ${getWrittenTitle(slave)} in adoration.`);
			} else if (slave.devotion > 20) {
				text.push(`Your slave hurries to your side and drops to ${his} ${(hasBothLegs(slave)) ? `knees` : `knee`}. ${He} obediently kneels at your feet.`);
			} else if (slave.devotion < -50) {
				if (slave.trust < -50) {
					text.push(`${He} hurries frantically to your side, and drops quivering to the floor at your feet hoping ${he} was quick enough to avoid`);
					switch (slave.rules.punishment) {
						case "confinement":
							text.push(`confinement.`);
							break;
						case "whipping":
							text.push(`whipping`);
							break;
						case "chastity":
							if (slave.energy > 60) {
								text.push(`orgasm denial`);
							} else {
								text.push(`punishment.`);
							}
							break;
						case "situational":
							switch (slave.collar) {
								case "shock punishment":
									text.push(`shock`);
							}
							text.push(`punishment.`);
							break;
					}
				} else {
					text.push(`${He} looks at you angrily, refusing to obey. You are forced to get up from your chair and retrieve ${his} leash, dragging ${him} back by ${his}`);
					if (slave.piercing.nose.weight === 2) {
						text.push(`nose ring.`);
					} else if (slave.piercing.nipple.weight === 2) {
						text.push(`nipples.`);
					} else {
						text.push(`collar.`);
					}
					text.push(`Once seated, you chain ${him} to your desk and force ${him} to ${his} ${(hasBothLegs(slave)) ? `knees` : `knee`}. You may have to start punishing ${him} more severely.`);
				}
			} else {
				text.push(`Your slave walks slowly to your desk and kneels. ${He} looks up at you, hoping that ${his} life gets easier.`);
			}


			return text.join(' ');
		}
	}


	function slaveGainsFlaw() {
		if (slave.fetish !== "humiliation" && slave.energy <= 95 && slave.sexualFlaw !== "shamefast") {
			slave.sexualFlaw = "shamefast";

			return `Being forced to perform a striptease for you has given ${him} a <span class="red">desire to always be clothed.</span>`;
		}

		return ``;
	}

	function slaveGainsQuirk() {
		if (slave.fetish === Fetish.NONE && slave.sexualFlaw !== "shamefast") {
			slave.fetish = "humiliation";
			slave.fetishKnown = 1;

			return `Being on display for your pleasure has <span class="fetish gain">encouraged ${him} to focus exposing ${himself} more often.</span>`;
		}

		return ``;
	}
};
