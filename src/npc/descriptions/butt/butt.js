/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} [descType=DescType.NORMAL]
 * @returns {string}
 */
App.Desc.butt = function(slave, descType = DescType.NORMAL) {
	const r = [];
	const {
		he, him, his, girl, He, His
	} = getPronouns(slave);
	const hands = (hasBothArms(slave)) ? "hands" : "hand";
	if (V.showClothing === 1 && descType !== DescType.MARKET && descType !== DescType.SURGERY) {
		const clothing = App.Data.clothes.get(slave.clothes);
		if (clothing && clothing.desc && "butt" in clothing.desc) {
			r.push(clothing.desc.butt(slave));
		} else {
			switch (slave.clothes) {
				case "a Fuckdoll suit":
					r.push(`The suit`);
					if (slave.butt > 10) {
						r.push(`hugs each of its massive buttocks individually, permitting`);
					} else if (slave.butt > 6) {
						r.push(`hugs each of its enormous buttocks individually, permitting`);
					} else if (slave.butt > 3) {
						r.push(`cups each of its big buttocks, permitting`);
					} else {
						r.push(`fits its little buttocks closely, offering`);
					}
					r.push(`easy access to the rear hole.`);
					break;
				case "conservative clothing":
					r.push(`${His} slacks are pressed and`);
					if (slave.butt > 10) {
						r.push(`well-tailored, but strain at the seams trying to hold back ${his} massive ass.`);
					} else if (slave.butt > 6) {
						r.push(`well-tailored, but can't hide the huge size of ${his} ass.`);
					} else if (slave.butt > 3) {
						r.push(`well-tailored, but can't hide the huge size of ${his} ass.`);
					} else {
						r.push(`well-tailored.`);
					}
					break;
				case "a nice nurse outfit":
					r.push(`${His} trousers are`);
					if (slave.butt > 10) {
						r.push(`well-tailored, but strain at the seams trying to hold back ${his} massive ass.`);
					} else if (slave.butt > 6) {
						r.push(`well-tailored, but can't hide the huge size of ${his} ass.`);
					} else if (slave.butt > 3) {
						r.push(`well-tailored, but can't hide the huge size of ${his} ass.`);
					} else {
						r.push(`well-tailored.`);
					}
					break;
				case "chains":
					r.push(`Each buttock has a length of chain`);
					if (slave.butt > 3) {
						r.push(`disappearing`);
					} else {
						r.push(`running tightly`);
					}
					r.push(`under it.`);
					break;
				case "Western clothing":
					r.push(`${His} chaps are assless, and ${his}`);
					if (slave.butt > 10) {
						r.push(`butt is so massive it seems to explode out of the hole left for it.`);
					} else if (slave.butt > 6) {
						r.push(`butt is so big it seems to explode out of the hole left for it.`);
					} else if (slave.butt > 3) {
						r.push(`big butt is bare.`);
					} else {
						r.push(`butt is bare.`);
					}
					break;
				case "body oil":
					r.push(`${His} buttocks are shiny with oil.`);
					break;
				case "a toga":
					r.push(`${His} toga`);
					if (slave.butt > 10) {
						r.push(`barely covers ${his} ass, it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 6) {
						r.push(`covers ${his} ass, though it cannot conceal its absurd size.`);
					} else {
						r.push(`covers ${his} ass.`);
					}
					break;
				case "a huipil":
					r.push(`${His} huipil`);
					if (slave.butt > 10) {
						r.push(`disappears between ${his} monstrous asscheeks.`);
					} else if (slave.butt > 6) {
						r.push(`covers ${his} butt, though it cannot stop it from spilling from the sides.`);
					} else {
						r.push(`covers ${his} butt.`);
					}
					break;
				case "kitty lingerie":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`panties' strings struggle to stay tied.`);
					} else if (slave.butt > 6) {
						r.push(`huge buttocks stretch the fabric of ${his} lingerie.`);
					} else if (slave.butt > 3) {
						r.push(`big butt is snug within ${his} panties.`);
					} else {
						r.push(`silken panties accentuate ${his} behind.`);
					}
					break;
				case "attractive lingerie for a pregnant woman":
					r.push(`${His} pretty silken panties`);
					if (slave.butt > 10) {
						r.push(`disappear between ${his} inhuman buttocks.`);
					} else if (slave.butt > 6) {
						r.push(`disappear between ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`peek out from between ${his} big buttocks.`);
					} else {
						r.push(`makes ${his} buttocks especially delectable.`);
					}
					break;
				case "a maternity dress":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`massive buttocks strain the seams of ${his} dress considerably.`);
					} else if (slave.butt > 6) {
						r.push(`huge buttocks stretch the fabric of ${his} dress considerably.`);
					} else if (slave.butt > 3) {
						r.push(`big ass fills out ${his} dress nicely.`);
					} else {
						r.push(`dress completely hides ${his} butt.`);
					}
					break;
				case "stretch pants and a crop-top":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`massive buttocks strain the seams of ${his} stretch pants considerably; ${he} can only manage to pull them halfway over them, creating plenty of jiggly ass cleavage to spill out over the elastic waist.`);
					} else if (slave.butt > 6) {
						r.push(`huge buttocks stretch the fabric of ${his} stretch pants considerably; ${he} can barely manage to pull them over them.`);
					} else if (slave.butt > 3) {
						r.push(`big ass fills out ${his} stretch pants nicely.`);
					} else {
						r.push(`stretch pants tightly hug ${his} trim`);
						if (hasAnyLegs(slave)) {
							if (hasBothLegs(slave)) {
								r.push(`legs`);
							} else {
								r.push(`leg`);
							}
							r.push(`and`);
						}
						r.push(`rear.`);
					}
					switch (slave.sexualFlaw) {
						case "neglectful":
							r.push(`"For Your Pleasure"`);
							break;
						case "cum addict":
							r.push(`"Cum Deep Inside"`);
							break;
						case "anal addict":
							r.push(`"Stick It In"`);
							break;
						case "attention whore":
							r.push(`"Have a Look"`);
							break;
						case "breast growth":
							r.push(`"Action Around Front"`);
							break;
						case "abusive":
							r.push(`"No Escape"`);
							break;
						case "malicious":
							r.push(`"Ball Breaker"`);
							break;
						case "self hating":
							r.push(`"Ride Me Dry"`);
							break;
						case "breeder":
							r.push(`"Wrong Hole"`);
							break;
						default:
							if (slave.fetishKnown === 1) {
								switch (slave.fetish) {
									case "submissive":
										r.push(`"Bend Me Over"`);
										break;
									case "cumslut":
										r.push(`"Cum Hither"`);
										break;
									case "humiliation":
										r.push(`"Pants Me"`);
										break;
									case "buttslut":
										r.push(`"Your Hands Here"`);
										break;
									case "boobs":
										r.push(`"Grope My Tits"`);
										break;
									case "sadist":
										r.push(`"Crush Warning"`);
										break;
									case "masochist":
										r.push(`"I've Been Bad"`);
										break;
									case "dom":
										r.push(`"Always On Top"`);
										break;
									case "pregnancy":
										r.push(`"Knock Me Up"`);
										break;
									case Fetish.MINDBROKEN:
										r.push(`"No Objections"`);
										break;
									default:
										r.push(`"Fuck My Ass"`);
										break;
								}
							} else {
								r.push(App.Desc.inscrip(slave));
							}
					}
					r.push(`is written across the seat of ${his} pants in large, vibrant letters.`);
					break;
				case "a kimono":
					r.push(`${His} kimono demurely covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 6) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a slutty qipao":
					r.push(`${His} qipao is slit up the side,`);
					if (slave.butt > 10) {
						r.push(`and ${his} ass is so massive that the rear part of the qipao rests meekly atop it.`);
					} else if (slave.butt > 6) {
						r.push(`and ${his} ass is so big that the rear part of the qipao only covers its top half.`);
					} else {
						r.push(`baring quite a bit of the side of each buttock.`);
					}
					break;
				case "uncomfortable straps":
					r.push(`${His} slave outfit's`);
					if (slave.butt > 10) {
						r.push(`straining straps frame ${his} colossal rear, with a strap disappearing under each inhuman buttock.`);
					} else if (slave.butt > 6) {
						r.push(`straining straps frame ${his} enormous rear, with a strap disappearing under each massive buttock.`);
					} else if (slave.butt > 3) {
						r.push(`straining straps frame ${his} enormous buttocks, with a strap passing uncomfortably under each one.`);
					} else {
						r.push(`straps frame ${his} buttocks, with a strap passing uncomfortably between them.`);
					}
					break;
				case "shibari ropes":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`inhuman ass strains the tight ropes that frame it. Ass flesh bulges from between the ropes.`);
					} else if (slave.butt > 6) {
						r.push(`massive ass almost explodes out of the tight ropes that frame it.`);
					} else if (slave.butt > 3) {
						r.push(`big buttocks are deliciously framed by tight ropes.`);
					} else {
						r.push(`cute buttocks are each lifted by a rope that passes under them.`);
					}
					break;
				case "restrictive latex":
					if (slave.butt > 10) {
						r.push(`The latex creaks ominously as it is strained by ${his} inhuman ass.`);
					} else if (slave.butt > 6) {
						r.push(`The latex creaks ominously as it is strained by ${his} massive ass.`);
					} else if (slave.butt > 3) {
						r.push(`${His} big buttocks strain the latex.`);
					} else {
						r.push(`The latex makes ${his} ass look even shapelier.`);
					}
					break;
				case "attractive lingerie":
					r.push(`${His} pretty lace g-string`);
					if (slave.butt > 10) {
						r.push(`disappears between ${his} inhuman buttocks.`);
					} else if (slave.butt > 6) {
						r.push(`disappears between ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`peeks out from between ${his} big buttocks.`);
					} else {
						r.push(`makes ${his} buttocks especially delectable.`);
					}
					break;
				case "a succubus outfit":
					r.push(`A tail sprouts from under ${his} little leather skirt, curving upward to end in a spade tip. It holds the skirt up in back, leaving ${his} ass totally bare.`);
					break;
				case "a slutty maid outfit":
					r.push(`${His} maid dress`);
					if (slave.butt > 10) {
						r.push(`fails to cover any of ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`only covers the top quarter of ${his} massive`);
					} else if (slave.butt > 3) {
						r.push(`ends halfway down ${his} big`);
					} else {
						r.push(`ends three-quarters of the way down ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "a nice maid outfit":
					r.push(`${His} maid dress`);
					if (slave.butt > 10) {
						r.push(`strains at the seams holding back ${his} massive`);
					} else if (slave.butt > 6) {
						r.push(`struggles to conceal ${his} huge`);
					} else if (slave.butt > 3) {
						r.push(`accentuates the curves of ${his} big`);
					} else {
						r.push(`demurely covers ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "a string bikini":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`slutty string bikini bottom disappears between ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`slutty string bikini bottom disappears between ${his} huge`);
					} else if (slave.butt > 3) {
						r.push(`slutty string bikini bottom peeks out from between ${his} big`);
					} else {
						r.push(`string bikini bottom runs enticingly down between ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "a scalemail bikini":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`barbaric scalemail bikini bottom barely covers ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`barbaric scalemail bikini bottom only somewhat covers ${his} huge`);
					} else if (slave.butt > 3) {
						r.push(`barbaric scalemail bikini bottom enticingly covers ${his} big`);
					} else {
						r.push(`scalemail bikini bottom completely covers ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "striped panties":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`cute panties barely cover ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`cute panties only somewhat cover ${his} huge`);
					} else if (slave.butt > 3) {
						r.push(`cute panties enticingly cover ${his} big`);
					} else {
						r.push(`cute panties completely cover ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "spats and a tank top":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`huge rear threatens to tear apart ${his} spats upon any movement.`);
					} else if (slave.butt > 6) {
						r.push(`large ass is constrained by ${his} tightly-worn spats.`);
					} else if (slave.butt > 3) {
						r.push(`spats snugly fit around ${his} big butt.`);
					} else {
						r.push(`spats snugly fit ${his} butt.`);
					}
					break;
				case "lederhosen":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`huge rear threatens to tear apart ${his} shorts upon any movement.`);
					} else if (slave.butt > 6) {
						r.push(`large ass is constrained by ${his} tightly-worn shorts.`);
					} else if (slave.butt > 3) {
						r.push(`shorts snugly fit around ${his} big butt.`);
					} else {
						r.push(`shorts snugly fit ${his} butt.`);
					}
					break;
				case "a cheerleader outfit":
					r.push(`${His} pleated cheerleader skirt rests`);
					if (slave.butt > 10) {
						r.push(`atop ${his} massive ass.`);
					} else if (slave.butt > 6) {
						r.push(`atop ${his} huge ass.`);
					} else if (slave.butt > 3) {
						r.push(`over ${his} plump butt.`);
					} else {
						r.push(`over ${his} cute butt.`);
					}
					break;
				case "clubslut netting":
					r.push(`${His} netting`);
					if (slave.butt > 6) {
						r.push(`strains to support ${his} massive behind.`);
					} else if (slave.butt > 3) {
						r.push(`strains to restrain ${his} big behind.`);
					} else {
						r.push(`technically covers ${his} cute butt, but it's all visible.`);
					}
					break;
				case "cutoffs and a t-shirt":
					r.push(`${His} cutoffs`);
					if (slave.butt > 10) {
						r.push(`fail to cover ${his} massive buttocks, with the jean material disappearing between them.`);
					} else if (slave.butt > 6) {
						r.push(`fail to cover ${his} huge buttocks, with the jean material almost disappearing between them.`);
					} else if (slave.butt > 3) {
						r.push(`bare the bottom of each of ${his} big buttocks.`);
					} else {
						r.push(`bare a little buttock in back.`);
					}
					break;
				case "a slutty outfit":
					if (slave.butt > 5) {
						r.push(`Many of ${his} choices of slutty outfit leave all or part of ${his} huge buttocks bare.`);
					} else {
						r.push(`Some of ${his} choices of slutty outfit reveal part of ${his} buttocks.`);
					}
					break;
				case "a slutty nurse outfit":
					r.push(`${His}`);
					if (slave.butt > 10) {
						r.push(`massive buttocks are easily visible below the hem of ${his} tight skirt.`);
					} else if (slave.butt > 6) {
						r.push(`huge buttocks are easily visible below the hem of ${his} tight skirt.`);
					} else if (slave.butt > 3) {
						r.push(`big butt is just visible past the hem of ${his} tight skirt.`);
					} else {
						r.push(`tight skirt comes down to just below the bottom of ${his} buttocks.`);
					}
					break;
				case "a schoolgirl outfit":
					r.push(`${His} skirt`);
					if (slave.butt > 10) {
						r.push(`can't begin to cover ${his} massive butt, and just rests on top of ${his} buttocks, leaving virtually ${his} entire behind`);
					} else if (slave.butt > 6) {
						r.push(`can't begin to cover ${his} huge butt, and just rests on top of ${his} buttocks, leaving virtually ${his} entire behind`);
					} else if (slave.butt > 3) {
						r.push(`only covers the top of ${his} big butt, leaving most of ${his} bottom`);
					} else {
						r.push(`only covers the top half of ${his} butt, leaving the bottom half of ${his} behind`);
					}
					r.push(`bare.`);
					break;
				case "a fallen nuns habit":
					r.push(`${His} latex habit parts to leave ${his}`);
					if (slave.butt > 10) {
						r.push(`inhuman`);
					} else if (slave.butt > 6) {
						r.push(`massive`);
					} else if (slave.butt > 3) {
						r.push(`big`);
					}
					r.push(`buttocks bare.`);
					break;
				case "a chattel habit":
					r.push(`The belt around ${his} ribs has two long strips of white fabric hanging from it, down ${his} front and back, leaving ${his} sides bare from ${his} flanks down to ${his} hips. ${His}`);
					if (slave.butt > 10) {
						r.push(`massive buttocks have a way of trapping the strip of fabric in back between them.`);
					} else if (slave.butt > 6) {
						r.push(`huge buttocks have a way of trapping the strip of fabric in back between them.`);
					} else if (slave.butt > 3) {
						r.push(`big buttocks force the strip of fabric in back to swoop out over them.`);
					} else {
						r.push(`cute buttocks are just curved enough to push the strip in back out a bit.`);
					}
					break;
				case "a halter top dress":
					r.push(`${His} beautiful halter top dress is`);
					if (slave.butt > 10) {
						r.push(`tailored, but still strains at the seams to hold ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`tailored as possible for ${his} massive`);
					} else if (slave.butt > 3) {
						r.push(`tailored to flatter ${his} big`);
					} else {
						r.push(`almost sculpted over ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "an evening dress":
					r.push(`${His} sensual evening dress is`);
					if (slave.butt > 10) {
						r.push(`tailored, and can only barely contain ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`tailored as much as possible for ${his} massive butt, but nevertheless causes the thigh cut rides up ${his} leg, unintentionally exposing more of ${him}.`);
					} else if (slave.butt > 3) {
						r.push(`tailored and accentuates ${his} big`);
					} else {
						r.push(`clings to ${his} butt.`);
					}
					r.push(`butt.`);
					break;
				case "a dirndl":
					r.push(`${His} beautiful dirndl is`);
					if (slave.butt > 10) {
						r.push(`tailored, but still strains at the seams to hold ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`tailored as possible for ${his} massive`);
					} else if (slave.butt > 3) {
						r.push(`tailored to flatter ${his} big`);
					} else {
						r.push(`almost sculpted over ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "a biyelgee costume":
					r.push(`${His} beautiful costume is`);
					if (slave.butt > 10) {
						r.push(`tailored, but still strains at the seams to hold ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`tailored as possible for ${his} massive`);
					} else if (slave.butt > 3) {
						r.push(`tailored to flatter ${his} big`);
					} else {
						r.push(`almost sculpted over ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "a ball gown":
					r.push(`${His} fabulous silken ball gown is draped`);
					if (slave.butt > 10) {
						r.push(`as tastefully as possible for ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`as tastefully as possible for ${his} massive`);
					} else if (slave.butt > 3) {
						r.push(`around ${his} big`);
					} else {
						r.push(`around ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "nice business attire":
					r.push(`${His} suit skirt`);
					if (slave.butt > 10) {
						r.push(`is tailored but still strains to restrain ${his} massive buttocks.`);
					} else if (slave.butt > 6) {
						r.push(`is tailored as tastefully as possible to restrain ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`is tailored to flatter ${his} big buttocks.`);
					} else {
						r.push(`tastefully hugs ${his} derrière.`);
					}
					break;
				case "slutty business attire":
					r.push(`${His} skirt is so short that`);
					if (slave.butt > 10) {
						r.push(`quite a lot of inhumanly large`);
					} else if (slave.butt > 6) {
						r.push(`quite a lot of massive`);
					} else if (slave.butt > 3) {
						r.push(`more than a hint of`);
					} else {
						r.push(`a hint of`);
					}
					r.push(`buttock is visible in back.`);
					break;
				case "a comfortable bodysuit":
					r.push(`${His} bodysuit comfortably hugs ${his}`);
					if (slave.butt > 10) {
						r.push(`massive`);
					}
					r.push(`butt.`);
					break;
				case "a latex catsuit":
					if (slave.butt > 10) {
						r.push(`The latex creaks ominously as it is strained by ${his} inhuman ass.`);
					} else if (slave.butt > 6) {
						r.push(`The latex creaks ominously as it is strained by ${his} massive ass.`);
					} else if (slave.butt > 3) {
						r.push(`${His} big latex-covered buttocks are shapely and smooth.`);
					} else {
						r.push(`${His} latex-covered buttocks are shapely and smooth.`);
					}
					break;
				case "a military uniform":
					r.push(`${His} uniform skirt`);
					if (slave.butt > 10) {
						r.push(`is tailored as tastefully as possible to restrain ${his} enormous buttocks, though its massive size strains the seams.`);
					} else if (slave.butt > 6) {
						r.push(`is tailored as tastefully as possible to restrain ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`is tailored to flatter ${his} big buttocks.`);
					} else {
						r.push(`tastefully hugs ${his} derrière.`);
					}
					break;
				case "a mounty outfit":
					r.push(`${His} uniform slacks`);
					if (slave.butt > 10) {
						r.push(`are tailored as tastefully as possible to restrain ${his} enormous buttocks, though its massive size strains the seams.`);
					} else if (slave.butt > 6) {
						r.push(`are tailored as tastefully as possible to restrain ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`are tailored to flatter ${his} big buttocks.`);
					} else {
						r.push(`tastefully hug ${his} derrière.`);
					}
					break;
				case "a schutzstaffel uniform":
				case "a confederate army uniform":
					r.push(`${His} uniform trousers`);
					if (slave.butt > 10) {
						r.push(`are tailored as tastefully as possible to restrain ${his} enormous buttocks, though its massive size strains the seams.`);
					} else if (slave.butt > 6) {
						r.push(`are tailored as tastefully as possible to restrain ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`are tailored to flatter ${his} big buttocks.`);
					} else {
						r.push(`tastefully hug ${his} derrière.`);
					}
					break;
				case "a slutty schutzstaffel uniform":
					r.push(`${His} uniform miniskirt`);
					if (slave.butt > 10) {
						r.push(`is tailored as tastefully as possible to restrain ${his} enormous buttocks, though its massive size strains the seams.`);
					} else if (slave.butt > 6) {
						r.push(`is tailored as tastefully as possible to restrain ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`is tailored to flatter ${his} big buttocks.`);
					} else {
						r.push(`tastefully hug ${his} derrière.`);
					}
					break;
				case "a red army uniform":
					r.push(`${His} uniform skirt`);
					if (slave.butt > 10) {
						r.push(`is tailored as tastefully as possible to restrain ${his} enormous buttocks, though its massive size strains the seams.`);
					} else if (slave.butt > 6) {
						r.push(`is tailored as tastefully as possible to restrain ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`is tailored to flatter ${his} big buttocks.`);
					} else {
						r.push(`tastefully hugs ${his} derrière.`);
					}
					break;
				case "a mini dress":
					r.push(`${His} scandalously short dress`);
					if (slave.butt > 10) {
						r.push(`is impossible to pull over ${his} enormous buttocks, leaving ${his} behind entirely exposed.`);
					} else if (slave.butt > 6) {
						r.push(`is at constant risk of sliding above ${his} huge butt and leaving ${his} behind entirely exposed.`);
					} else if (slave.butt > 3) {
						r.push(`barely covers half of ${his} ample buttocks.`);
					} else {
						r.push(`barely manages to cover ${his} buttocks.`);
					}
					break;
				case "an apron":
					r.push(`${His} girly, frilly apron offers no protection in the back, leaving ${his}`);
					if (slave.butt > 10) {
						r.push(`enormous buttocks`);
					} else if (slave.butt > 6) {
						r.push(`huge buttocks`);
					} else if (slave.butt > 3) {
						r.push(`ample buttocks`);
					} else {
						r.push(`buttocks`);
					}
					r.push(`completely exposed.`);
					break;
				case "a leotard":
					r.push(`${His} high-sided leotard leaves ${his} hips totally bare, and`);
					if (slave.butt > 10) {
						r.push(`disappears completely between ${his} enormous buttocks.`);
					} else if (slave.butt > 6) {
						r.push(`disappears completely between ${his} buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`almost disappears between ${his} buttocks.`);
					} else {
						r.push(`leaves ${his} buttocks bare.`);
					}
					break;
				case "a monokini":
					r.push(`${His} monokini covers ${his} buttocks fully, the fabric clinging to each`);
					if (slave.butt > 10) {
						r.push(`gargantuan cheek.`);
					} else if (slave.butt > 6) {
						r.push(`giant cheek.`);
					} else if (slave.butt > 3) {
						r.push(`substantial cheek.`);
					} else {
						r.push(`cheek.`);
					}
					break;
				case "a cybersuit":
					r.push(`${His} bodysuit covers ${his} buttocks fully, the material stretching tightly against ${his}`);
					if (slave.butt > 10) {
						r.push(`gargantuan assflesh.`);
					} else if (slave.butt > 6) {
						r.push(`giant assflesh.`);
					} else if (slave.butt > 3) {
						r.push(`substantial assflesh.`);
					} else {
						r.push(`assflesh.`);
					}
					break;
				case "a tight Imperial bodysuit":
					r.push(`${His} cybernetic bodysuit covers ${his} butt fully, the material unapologetically riding up ${his}`);
					if (slave.butt > 10) {
						r.push(`gargantuan ass, showing off every last dimple as it wobbles.`);
					} else if (slave.butt > 6) {
						r.push(`massive rear, showing off every last dimple as it jiggles.`);
					} else if (slave.butt > 3) {
						r.push(`heavy rear, showing off every last dimple as ${he} moves.`);
					} else {
						r.push(`slender asscheeks, showing off every last dimple as ${he} moves.`);
					}
					break;
				case "battlearmor":
					r.push(`${His} armor covers ${his} buttocks fully, stretching tightly against ${his}`);
					if (slave.butt > 10) {
						r.push(`gargantuan assflesh.`);
					} else if (slave.butt > 6) {
						r.push(`giant assflesh.`);
					} else if (slave.butt > 3) {
						r.push(`substantial assflesh.`);
					} else {
						r.push(`assflesh.`);
					}
					break;
				case "Imperial Plate":
					r.push(`${His} ultra-heavy armor completely covers ${his} rear,`);
					if (slave.butt > 10) {
						r.push(`but is clearly distinct anyway, ${his} undeniable assmeat creating two gargantuan plated globes in the back.`);
					} else if (slave.butt > 6) {
						r.push(`but ${his} huge ass makes itself known anyway, each cheek requiring an individually rounded plate that seems to somehow wobble even underneath the ludicrously heavy armor.`);
					} else if (slave.butt > 3) {
						r.push(`but ${his} heavy butt pushes out the massive plating slightly, making its large size obvious.`);
					} else {
						r.push(`creating an elegant, slim set of aerodynamic plate in the back.`);
					}
					break;
				case "a bunny outfit":
					r.push(`${His} teddy is actually quite modest in back, covering ${his} buttocks in tight satin with a fluffy white cottontail positioned over ${his} tailbone.`);
					break;
				case "harem gauze":
					r.push(`${His} harem gauze filmily covers`);
					if (slave.butt > 10) {
						r.push(`${his} acres of assflesh.`);
					} else if (slave.butt > 6) {
						r.push(`the expanse of ${his} assflesh.`);
					} else if (slave.butt > 3) {
						r.push(`${his} big buttocks.`);
					} else {
						r.push(`${his} buttocks.`);
					}
					break;
				case "slutty jewelry":
					r.push(`${His} bangles include a loose chain about ${his} waist that`);
					if (slave.butt > 10) {
						r.push(`${he} constantly has to fish out of the cleft between ${his} inhuman`);
					} else if (slave.butt > 6) {
						r.push(`${he} constantly has to fish out of the cleft between ${his} massive`);
					} else if (slave.butt > 3) {
						r.push(`dips seductively down toward the cleft between ${his} big`);
					} else {
						r.push(`dips seductively down toward the cleft between ${his}`);
					}
					r.push(`buttocks.`);
					break;
				case "overalls":
					r.push(`${His} overalls decently cover ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but they do nothing to conceal its absurd size.`);
					} else if (slave.butt > 6) {
						r.push(`butt, though they cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a hijab and abaya":
				case "a niqab and abaya":
					r.push(`${His} abaya modestly covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 6) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a klan robe":
					r.push(`${His} robe modestly covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 6) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a hijab and blouse":
					r.push(`${His} skirt modestly covers ${his}`);
					if (slave.butt > 8) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 5) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a burqa":
					r.push(`${His} burqa modestly covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a tube top and thong":
				case "a thong":
				case "a slutty klan robe":
				case "a t-shirt and thong":
					r.push(`${His} thong leaves ${his}`);
					if (slave.butt > 10) {
						r.push(`butt completely bare, as it has long since been lost in its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt completely bare, as its enormity has since devoured it.`);
					} else if (slave.butt > 3) {
						r.push(`big butt completely visible.`);
					} else {
						r.push(`butt completely visible.`);
					}
					break;
				case "a button-up shirt and panties":
				case "a sweater and panties":
				case "panties and pasties":
				case "a t-shirt and panties":
				case "a tank-top and panties":
				case "striped underwear":
				case "panties":
					r.push(`${His} panties partially cover ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it does not conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a bra":
				case "a button-up shirt":
				case "a sweater":
				case "a tank-top":
				case "a tube top":
				case "a striped bra":
				case "an oversized t-shirt":
				case "a t-shirt":
				case "a sports bra":
				case "pasties":
					r.push(`${His} clothing leaves ${his}`);
					if (slave.butt > 10) {
						r.push(`mammoth ass completely bare.`);
					} else if (slave.butt > 7) {
						r.push(`huge ass completely bare.`);
					} else if (slave.butt > 3) {
						r.push(`big ass completely bare.`);
					} else {
						r.push(`ass completely bare.`);
					}
					break;
				case "a gothic lolita dress":
					r.push(`${His} dress modestly covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a hanbok":
					r.push(`${His} hanbok modestly covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a police uniform":
					r.push(`${His} police trousers modestly cover ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a nice pony outfit":
				case "a slutty pony outfit":
					r.push(`${His} outfit immodestly covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, and does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, and does nothing to conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a one-piece swimsuit":
					r.push(`${His} swimsuit modestly covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a t-shirt and jeans":
				case "cutoffs":
				case "jeans":
				case "a sweater and cutoffs":
					r.push(`${His} jeans modestly cover ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a skimpy loincloth":
					r.push(`${His} loincloth barely covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "an oversized t-shirt and boyshorts":
				case "boyshorts":
					r.push(`${His} boy shorts modestly cover ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "sport shorts and a t-shirt":
				case "sport shorts and a sports bra":
				case "sport shorts":
					r.push(`${His} shorts cling tightly to ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but do nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`butt, though they cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "leather pants and pasties":
				case "leather pants":
				case "leather pants and a tube top":
					r.push(`${His} leather pants snugly cover ${his}`);
					if (slave.butt > 10) {
						r.push(`curvaceously mammoth ass, but do nothing to conceal its absurd size.`);
					} else if (slave.butt > 7) {
						r.push(`curvaceously huge ass, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`curvaceous big ass.`);
					} else {
						r.push(`curvaceous ass.`);
					}
					break;
				case "a burkini":
					r.push(`${His}`);
					if (slave.butt > 9) {
						r.push(`giant ass pushes up ${his} swimsuit's tunic.`);
					} else if (slave.butt > 6) {
						r.push(`large butt is accentuated by ${his} swimsuit.`);
					} else if (slave.butt > 3) {
						r.push(`big bottom is modestly covered by ${his} swimsuit.`);
					} else {
						r.push(`rear is modestly covered by ${his} swimsuit.`);
					}
					break;
				case "a long qipao":
					r.push(`${His} qipao modestly covers ${his}`);
					if (slave.butt > 10) {
						r.push(`ass, but it does nothing to conceal its absurd size.`);
					} else if (slave.butt > 6) {
						r.push(`butt, though it cannot conceal its absurd size.`);
					} else if (slave.butt > 3) {
						r.push(`big butt.`);
					} else {
						r.push(`butt.`);
					}
					break;
				case "a Santa dress":
					r.push(`The hemline of ${his} dress is intentionally too high,`);
					if (slave.butt > 10) {
						r.push(`leaving the entirety of ${his} massive ass exposed.`);
					} else if (slave.butt > 6) {
						r.push(`covering only the topmost portion of ${his} giant rear.`);
					} else if (slave.butt > 3) {
						r.push(`only managing to cover half of ${his} big butt.`);
					} else if (slave.butt > 2) {
						r.push(`exposing the very bottom of ${his} asscheeks.`);
					} else {
						r.push(`just barely managing to cover ${his} rear.`);
					}
					break;
				case "a courtesan dress":
					r.push(`${His} dress elegantly drapes across ${his}`);
					if (slave.butt > 10) {
						r.push(`inhuman buttocks, fanning wide as it travels down the lewd masses.`);
					} else if (slave.butt > 6) {
						r.push(`massive buttocks, giving a tantalizing view as it parts ever so slightly.`);
					} else if (slave.butt > 3) {
						r.push(`buttocks, making them look larger than they already are.`);
					} else {
						r.push(`buttocks.`);
					}
					break;
				case "a bimbo outfit":
					r.push(`${His} scandalously short miniskirt`);
					if (slave.butt > 10) {
						r.push(`is impossible to pull over ${his} enormous buttocks, leaving ${his} behind entirely exposed. The only hint of ${his} thong is a pair of straps disappearing into ${his} crack.`);
					} else if (slave.butt > 6) {
						r.push(`is impossible to pull over ${his} huge butt, leaving ${his} behind entirely exposed as its enormity has long since devoured ${his} thong.`);
					} else if (slave.butt > 3) {
						r.push(`is constantly sliding up ${his} ample buttocks, leaving ${his} thong completely visible.`);
					} else {
						r.push(`barely manages to cover even half ${his} buttocks, leaving ${his} thong completely visible.`);
					}
					break;
				case "battledress":
					r.push(`${His} fatigue pants`);
					if (slave.butt > 10) {
						r.push(`are tailored as tastefully as possible to restrain ${his} enormous buttocks, though their massive size strains the seams.`);
					} else if (slave.butt > 6) {
						r.push(`are tailored as tastefully as possible to restrain ${his} huge buttocks.`);
					} else if (slave.butt > 3) {
						r.push(`are tailored to flatter ${his} big buttocks.`);
					} else {
						r.push(`tastefully hug ${his} derrière.`);
					}
					break;
				default:
			}
		}
	}

	r.push(App.Desc.mods(slave, "lower back"));

	r.push(`${He}'s got a`);
	if (slave.butt <= 1) {
		r.push(`flat and`);
		if (V.arcologies[0].FSSlimnessEnthusiast > 20 && !FutureSocieties.isActive('FSHedonisticDecadence')) {
			r.push(either("attractive", "enticing", "fashionable"));
		} else {
			r.push(either("skinny", "slim", "taut"));
		}
		r.push(`ass,`);
	} else if (slave.butt <= 2) {
		if (V.arcologies[0].FSSlimnessEnthusiast > 20 && !FutureSocieties.isActive('FSHedonisticDecadence')) {
			r.push(either("fashionable", "sleek and attractive", "small and enticing"));
		} else {
			r.push(either("small, rounded", "small but rounded", "small, sleek"));
		}
		r.push(`rear end,`);
	} else if (slave.butt <= 3) {
		r.push(`${either("big and healthy", "curved and plump", "healthy and plump")} derrière,`);
	} else if (slave.butt <= 4) {
		r.push(`${either("big bubble", "curvy and enticing", "juicy and large")} butt,`);
	} else if (slave.butt <= 5) {
		r.push(`${either("huge", "juicy and huge", "massive and undeniable")} rear end,`);
	} else if (slave.butt <= 6) {
		r.push(`${either("rather enormous", "truly massive")} posterior,`);
	} else if (slave.butt <= 7) {
		r.push(`${either("gigantic", "titanic")} ass,`);
	} else if (slave.butt <= 10) {
		r.push(`${either("gigantic", "titanic")} ass,`);
		if (slave.assignment === Job.DAIRY && V.dairyStimulatorsSetting > 1) {
			r.push(`so big it jiggles as the machine rapes ${his} asshole,`);
		} else if (!canWalk(slave)) {
			r.push(`so big it would jiggle as ${he} walked — if ${he} could walk —`);
		} else {
			r.push(`so big it jiggles as ${he} walks,`);
		}
	} else if (slave.butt <= 14) {
		r.push(`${either("cushion-like", "hall-crowding")} ass,`);
		if (slave.assignment === Job.DAIRY && V.dairyStimulatorsSetting > 1) {
			r.push(`so big it massively jiggles as the machine rapes ${his} asshole,`);
		} else if (!canWalk(slave)) {
			r.push(`so big it would jiggle nonstop as ${he} walked — if ${he} could walk —`);
		} else {
			r.push(`so big it jiggles nonstop as ${he} walks,`);
		}
	} else {
		r.push(`${either("bean bag sized", "room-crowding")} ass,`);
		if (slave.assignment === Job.DAIRY && V.dairyStimulatorsSetting > 1) {
			r.push(`so massive it jiggles endlessly as the machine rapes ${his} asshole,`);
		} else if (!canWalk(slave)) {
			r.push(`so massive it would jiggle endlessly as ${he} walked — if ${he} could walk —`);
		} else {
			r.push(`so massive it jiggles endlessly as ${he} walks,`);
		}
	}

	r.push(App.Desc.hips(slave));

	if (V.showImplantEffects === 1) {
		if (slave.fuckdoll > 0) {
			r.push(`The tight suit forces ${his} ass into the most attractive shape possible and keeps it there regardless of position.`);
		} else {
			if (slave.buttImplant === 1) {
				r.push(`${His} butt implants make ${his} ass look especially pert no matter how ${he} moves.`);
			} else if (slave.buttImplant === 2) {
				r.push(`${His} big butt implants make ${his} ass jut out curvaceously whatever pose ${he}'s in.`);
			} else if (slave.buttImplant > 2) {
				r.push(`${He} has`);
				if (slave.buttImplantType === "string") {
					r.push(`engorged string`);
				} else if (slave.buttImplantType === "normal") {
					r.push(`butt`);
				} else {
					r.push(`fillable butt`);
				}
				r.push(`implants, and it shows. Whatever ${his} position, ${his} ass looks just as artificially enticing.`);
			} else if (slave.buttImplant > 7) {
				r.push(`${He} has oversized`);
				if (slave.buttImplantType === "string") {
					r.push(`engorged string`);
				} else if (slave.buttImplantType === "normal") {
					r.push(`silicone butt`);
				} else {
					r.push(`fillable butt`);
				}
				r.push(`implants, and it is completely obvious. Whatever ${his} position, ${his} ass looks like someone shoved a pair of overinflated beachballs in ${his} buttcheeks.`);
			} else if (slave.buttImplant > 12) {
				r.push(`${He} has oversized`);
				if (slave.buttImplantType === "string") {
					r.push(`engorged string`);
				} else {
					r.push(`fillable butt`);
				}
				r.push(`implants, and it is completely obvious. Whatever ${his} position, ${his} ass looks like someone shoved a pair of ready to burst weather balloons in ${his} buttcheeks.`);
			} else if (slave.buttImplant > 17) {
				r.push(`${He} has oversized`);
				if (slave.buttImplantType === "string") {
					r.push(`engorged string`);
				} else {
					r.push(`fillable butt`);
				}
				r.push(`implants, and it is completely obvious. Whatever ${his} position, ${his} immense ass dominates ${his} surroundings with its unyielding mass.`);
			}
		}
		if (FutureSocieties.isActive('FSTransformationFetishist')) {
			if (slave.buttImplant > 0) {
				r.push(`${His} rear is about ${Math.floor((slave.buttImplant / slave.butt) * 100)}% implant.`);
			}
		}
		if (V.arcologies[0].FSTransformationFetishist > 20) {
			const buttThreshold = FutureSocieties.isActive('FSSlimnessEnthusiast') ? 3 : 6;
			if (slave.butt >= buttThreshold) {
				if (slave.buttImplant / slave.butt < .25) {
					r.push(`${His} ass is <span class="red">disgustingly natural</span> for its size.`);
				} else {
					r.push(`${His} asscheeks are <span class="green">obviously implants,</span> as they should be.`);
				}
			}
		}
	}

	if (V.arcologies[0].FSGenderFundamentalistLawBeauty + V.arcologies[0].FSGenderRadicalistLawBeauty > 0) {
		if (slave.butt > 8 && FutureSocieties.isActive('FSAssetExpansionist')) {
			r.push(`It's too big for the fashionable feminine ideal.`);
		} else if (slave.butt > 4 && FutureSocieties.isActive('FSAssetExpansionist')) {
			r.push(`It's bigger than expected for the fashionable feminine ideal, but your arcology loves huge butts, so it's not a surprise.`);
		} else if (slave.butt > 4) {
			r.push(`It's too big for the fashionable feminine ideal.`);
		} else if (slave.butt < 3) {
			r.push(`It's too small for the fashionable feminine ideal.`);
		}
	} else if (V.arcologies[0].FSSlimnessEnthusiastLaw === 1 && (slave.butt > 1)) {
		r.push(`It's way too big for the fashionable feminine ideal.`);
	} else if (V.arcologies[0].FSHedonisticDecadenceLaw2 === 1 && (slave.butt < 5)) {
		r.push(`It's too small for the fashionable feminine ideal.`);
	}

	if ((slave.physicalAge <= 3 && slave.butt >= 8) ||
		(slave.physicalAge <= 12 && slave.butt >= 12) ||
		(slave.physicalAge > 12 && slave.butt > 17)
	) {
		if (slave.fuckdoll > 0) {
			r.push(`The difficulties of having a gigantic ass is greatly reduced for a Fuckdoll, since ${he}'s almost always restrained, stationary, or both.`);
		} else {
			if (canWalk(slave)) {
				r.push(`${His} butt is so massive that it is difficult for ${him} to move.`);
				if (slave.muscles > 95) {
					r.push(`However, ${he} is so powerfully built that ${he} can manage it with effort, using ${his}`);
					if (hasBothArms(slave)) {
						r.push(`arms`);
					} else {
						r.push(`arm`);
					}
					r.push(`to support them.`);
				} else if (slave.muscles > 30) {
					r.push(`${He} can barely manage to get to ${his} feet unaided, and usually walks with ${his} ${hands} sunk into ${his} buttcheeks to help take their weight.`);
				} else if (slave.muscles > 5) {
					r.push(`${He} requires assistance to get to ${his} feet, and tries to rest ${his} huge cheeks on whatever nearby surfaces ${he} can.`);
				} else {
					r.push(`${He} cannot get to ${his} feet unaided, and prefers to remain seated on ${his} enormous rear rather than stand.`);
				}
			} else {
				r.push(`Together it is nearly the same size as ${his} torso, making ${him} about half butt.`);
			}
			if (slave.butt > 15) {
				if (V.buttAccessibility === 1) {
					r.push(`Fortunately for ${him}, the penthouse is adapted for daily life with a rear`);
				} else {
					if (descType === DescType.MARKET) {
						r.push(`${He}'ll have`);
					} else {
						r.push(`${He} has`);
					}
					r.push(`trouble living in your penthouse, which is not designed for ${girl}s with buttcheeks`);
				}
				r.push(`wider than a standard doorway.`);
			}
		}
	}

	if (slave.fuckdoll === 0) {
		if (slave.markings === "heavily freckled") {
			r.push(`${His} freckles are particularly dense across ${his} lower back.`);
		} else if (slave.markings === "freckles") {
			r.push(`${His} lower back is covered in a light speckling of freckles.`);
		}
	}

	if (slave.tailShape === "cat") {
		r.push(`${He} has a long and slender, ${slave.tailEffect === "none" ? `${slave.tailColor} ${App.Utils.translate("cat")} tail` : `${slave.tailColor} colored ${App.Utils.translate("cat")} tail with ${slave.tailEffect},`} that tends to sway side to side when ${he} is focused on a task.`);
	} else if (slave.tailShape === "leopard") {
		r.push(`${He} has a long, white-tipped and ${slave.tailEffect === "none" ? `${slave.tailColor} leopard tail` : `${slave.tailColor} colored leopard tail with ${slave.tailEffect}`}. It's white underneath and covered in ${slave.patternColor} spots that form incomplete bands toward the tails end. The tail tends to sway side to side when ${he} is focused on a task.`);
	} else if (slave.tailShape === "tiger") {
		r.push(`${He} has a long ${slave.tailEffect === "none" ? `${slave.tailColor} tiger tail` : `${slave.tailColor} colored tiger tail with ${slave.tailEffect}`}, that's about half the length of ${his} body and covered in distinct ${slave.patternColor} vertical stripes. The tail tends to sway side to side when ${he} is focused on a task.`);
	} else if (slave.tailShape === "jaguar") {
		r.push(`${He} has a long, black-tipped and ${slave.tailEffect === "none" ? `${slave.tailColor} jaguar tail` : `${slave.tailColor} colored jaguar tail with ${slave.tailEffect}, that's`} covered in ${slave.patternColor} rosettes. ${He} tends to sway it from side to side when ${he} is focused on a task.`);
	} else if (slave.tailShape === "lion") {
		r.push(`${He} has a long ${slave.tailEffect === "none" ? `${slave.tailColor} lion tail that ends` : `${slave.tailColor} colored lion tail with ${slave.tailEffect}, ending`} in a ${slave.hColor} tuft of hair. It can be seen swaying from side to side when ${he} is focusing on a task.`);
	} else if (slave.tailShape === "dog") {
		r.push(`${He} has a bushy, ${slave.tailEffect === "none" ? `${slave.tailColor} ${App.Utils.translate("dog")} tail` : `${slave.tailColor} colored ${App.Utils.translate("dog")} tail with ${slave.tailEffect}`}. ${He} tends to wag it energetically when ${he} gets exited.`);
	} else if (slave.tailShape === "wolf") {
		r.push(`${He} has a long and fluffy wolf tail, that's covered in dense ${slave.tailEffect === "none" ? `${slave.tailColor} fur` : `${slave.tailColor} colored fur with ${slave.tailEffect}`}. It tends to wag energetically when ${he} gets exited.`);
	} else if (slave.tailShape === "jackal") {
		r.push(`${He} has a bushy, black-tipped and ${slave.tailEffect === "none" ? `${slave.tailColor} jackal tail` : `${slave.tailColor} colored jackal tail with ${slave.tailEffect}`}. It tends to wag energetically when ${he} gets exited.`);
	} else if (slave.tailShape === "fox") {
		r.push(`${He} has a soft and fluffy, ${slave.tailEffect === "none" ? `${slave.tailColor} ${App.Utils.translate("fox")} tail` : `${slave.tailColor} colored ${App.Utils.translate("fox")} tail with ${slave.tailEffect}`}.`);
	} else if (slave.tailShape === "kitsune") {
		r.push(`${He} has nine incredibly soft and fluffy, ${slave.tailEffect === "none" ? `${slave.tailColor} ${App.Utils.translate("fox")} tails` : `${slave.tailColor} colored ${App.Utils.translate("fox")} tails with ${slave.tailEffect}`}; they feel heavenly to the touch.`);
	} else if (slave.tailShape === "tanuki") {
		r.push(`${He} has a long and fluffy, ${slave.tailEffect === "none" ? `${slave.tailColor} tanuki tail with` : `${slave.tailColor} colored tanuki tail with ${slave.tailEffect} and`} a ${slave.patternColor} stripe running down the middle.`);
	} else if (slave.tailShape === "raccoon") {
		r.push(`${He} has a long and fluffy, ${slave.tailEffect === "none" ? `${slave.tailColor} raccoon tail with` : `${slave.tailColor} colored raccoon tail with ${slave.tailEffect} and`} ${slave.patternColor} rings running along its length.`);
	} else if (slave.tailShape === "rabbit") {
		r.push(`${He} has a short and fluffy, ${slave.tailEffect === "none" ? `${slave.tailColor} ${App.Utils.translate("rabbit")} tail` : `${slave.tailColor} colored ${App.Utils.translate("rabbit")} tail with ${slave.tailEffect}`}.`);
	} else if (slave.tailShape === "squirrel") {
		r.push(`${He} has a big and bushy, ${slave.tailEffect === "none" ? `${slave.tailColor} ${App.Utils.translate("squirrel")} tail` : `${slave.tailColor} colored ${App.Utils.translate("squirrel")} tail with ${slave.tailEffect}`}.`);
	} else if (slave.tailShape === "horse") {
		r.push(`${He} has a long ${App.Utils.translate("horse")} tail consisting of ${slave.hColor} hair.`);
	} else if (slave.tailShape === "bird") {
		r.push(`${He} has a bundle of soft, ${slave.tailEffect === "none" ? `${slave.tailColor} tail feathers` : `${slave.tailColor} colored tail feathers with ${slave.tailEffect}`}. The tail is graduated, meaning that the feathers are longest in the middle and decrease in length the further away they go from the middle.`);
	} else if (slave.tailShape === "phoenix") {
		r.push(`${He} has a bundle of magnificent, ${slave.tailEffect === "none" ? `${slave.tailColor} tail feathers that` : `${slave.tailColor} colored tail feathers with ${slave.tailEffect}. They`} give off a luminescent glow when in the dark. The tail is graduated, meaning that the feathers are longest in the middle and decrease in length the further away they go from the middle.`);
	} else if (slave.tailShape === "peacock") {
		r.push(`${He} has a bundle of iridescent, ${slave.tailEffect === "none" ? `${slave.tailColor} peacock tail feathers` : `${slave.tailColor} colored peacock tail feathers with ${slave.tailEffect}`}; ${his} tail can fan out to proudly display ${his} pretty feathers.`);
	} else if (slave.tailShape === "raven") {
		r.push(`${He} has a bundle of ${slave.tailEffect === "none" ? `${slave.tailColor} raven tail feathers` : `${slave.tailColor} colored raven tail feathers with ${slave.tailEffect}`}. The tail is graduated, meaning that the feathers are longest in the middle and decrease in length the further away they go from the middle.`);
	} else if (slave.tailShape === "swan") {
		r.push(`${He} has a small bundle of short ${slave.tailEffect === "none" ? `${slave.tailColor} swan tail feathers that` : `${slave.tailColor} colored swan tail feathers with ${slave.tailEffect}, they`} have a slight upwards curve to them. The tail is graduated, meaning that the feathers are longest in the middle and decrease in length the further away they go from the middle.`);
	} else if (slave.tailShape === "sheep") {
		r.push(`${He} has a short and soft ${slave.tailEffect === "none" ? `${slave.tailColor} sheep tail` : `${slave.tailColor} colored sheep tail with ${slave.tailEffect}`}.`);
	} else if (slave.tailShape === "cow") {
		r.push(`${He} has a long ${slave.tailEffect === "none" ? `${slave.tailColor} ${App.Utils.translate("cow")} tail with` : `${slave.tailColor} colored ${App.Utils.translate("cow")} tail with ${slave.tailEffect} and`} a small tuft of ${slave.hColor} hair at its end; ${he} tends to swat at things absentmindedly.`);
	} else if (slave.tailShape === "gazelle") {
		r.push(`${He} has a short and silky, ${slave.tailEffect === "none" ? `${slave.tailColor} gazelle tail with` : `${slave.tailColor} colored gazelle tail with ${slave.tailEffect} and`} a ${slave.patternColor} stripe running down its middle.`);
	} else if (slave.tailShape === "deer") {
		r.push(`${He} has a short and soft, ${slave.tailEffect === "none" ? `${slave.tailColor} deer tail` : `${slave.tailColor} colored deer tail with ${slave.tailEffect},`} that tends to wiggle when ${he} gets exited.`);
	} else if (slave.tailShape === "succubus") {
		r.push(`${He} has a long and slim, ${slave.skin} succubus tail; the tail ends in a soft ${slave.tailEffect === "none" ? `${slave.tailColor} heart shape` : `${slave.tailColor} colored heart shape with ${slave.tailEffect}`}.`);
	} else if (slave.tailShape === "dragon") {
		r.push(`${He} has a long and thick draconic tail; the tail is covered in ${slave.tailEffect === "none" ? `${slave.tailColor} scales` : `${slave.tailColor} colored scales with ${slave.tailEffect}`}.`);
	} else if (slave.tail === "stinger") {
		r.push(`${He} has a long and segmented, ${slave.tailEffect === "none" ? `${slave.tailColor} scorpion tail` : `${slave.tailColor} colored scorpion tail with ${slave.tailEffect}`} made of advanced synthetic alloys. The tail ends in a sharp stinger that can fire projectiles. Its projectiles can kill or incapacitate.`);
	} else if (slave.tail === "combat") {
		r.push(`${He} has a very long, ${slave.tailEffect === "none" ? `${slave.tailColor} metallic tail that` : `${slave.tailColor} colored metallic tail with ${slave.tailEffect}. It`} can lash out, constrict, and deploy razor sharp spikes on command.`);
	} else if (slave.tail === "sex") {
		r.push(`${He} has a long and slender, ${slave.tailEffect === "none" ? `${slave.tailColor} tail` : `${slave.tailColor} colored tail with ${slave.tailEffect}`}. While not strong, it is very dexterous and has a small fleshy spade-shaped tip that can vibrate and dispense lube on command.`);
	}

	r.push(App.Desc.mods(slave, "buttock"));
	return r.join(" ");
};
