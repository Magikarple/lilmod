/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fBoobs = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself, hers
	} = getPronouns(slave);

	seX(slave, "mammary", V.PC, "penetrative");

	r.push(`You call ${him} over so you can play with ${his}`);
	if (slave.boobs >= 20000) {
		r.push(`colossal`);
	} else if (slave.boobs >= 10000) {
		r.push(`massive`);
	} else if (slave.boobs >= 5000) {
		r.push(`monster`);
	} else if (slave.boobs >= 1000) {
		r.push(`huge`);
	} else if (slave.boobsImplant > 250) {
		r.push(`fake`);
	} else if (slave.boobs >= 650) {
		r.push(`big`);
	} else if (slave.boobs >= 300) {
		r.push(`small`);
	} else {
		r.push(`flat`);
	}
	r.push(`tits.`);

	if (slave.boobsTat === "tribal patterns") {
		r.push(`The tattoos on ${his} breasts certainly draw attention to ${his} nipples.`);
	} else if (slave.boobsTat === "scenes") {
		r.push(`The tattoos on ${his} abdomen nicely illustrate what you mean to do with ${him}: a titfuck.`);
	} else if (slave.boobsTat === "degradation") {
		r.push(`The tattoos on ${his} chest are asking you to use those breasts, after all.`);
	}

	if (slave.nipples === "huge") {
		r.push(`${His} nipples are so large they give ${his} breasts an unavoidably lewd appeal as they jut outward.`);
	} else if (slave.nipples === "puffy") {
		r.push(`${His} puffy nipples beg to be sucked.`);
	} else if (slave.nipples === "flat") {
		r.push(`${His} nipples are stretched nearly flat by ${his} implants, reducing them to two lewd little buttons.`);
	} else if (slave.nipples === "partially inverted" && slave.piercing.nipple.weight === 0) {
		r.push(`${His} partially inverted nipples should protrude at the slightest stimulation.`);
	} else if (slave.nipples === "inverted" && slave.piercing.nipple.weight === 0) {
		r.push(`${His} inverted nipples form lewd little creases across ${his} areolae.`);
	} else if (slave.nipples === "fuckable") {
		if (slave.lactation) {
			r.push(`${His} nipplecunts are leaking milk and begging to be penetrated.`);
		} else {
			r.push(`${His} nipplecunts form lewd little slits across ${his} areolae.`);
		}
	}

	if (slave.piercing.nipple.weight > 1 && !hasAnyLegs(slave)) {
		r.push(`You carry ${him} over, playing with the chain between ${his} nipples.`);
	} else if (slave.piercing.nipple.weight > 1) {
		r.push(`You pull ${him} over by the chain between ${his} nipples.`);
	} else if (slave.piercing.nipple.weight === 1) {
		r.push(`${His} nipple piercings glint enticingly.`);
	}

	if (V.PC.belly >= 5000) {
		if (V.PC.dick !== 0) {
			r.push(`You lay ${him} down on the couch on ${his} back, lather oil onto ${his} breasts and gingerly straddle ${his} face; your stiff prick between ${his} tits and under your belly, and your needy cunt over ${his} mouth.`);
			if (slave.boobs >= 20000) {
				r.push(`${His} breasts are so colossal you can barely maintain this position. They completely devour your dick and threaten to swallow up your pregnant belly as well. Between ${his} licking, and the fleshy prison surrounding your privates, it doesn't take long for you to soak ${his} face and plant your seed deep into ${his} cleavage.`);
			} else if (slave.boobs >= 10000) {
				r.push(`${His} breasts are so massive you can barely maintain this position. They completely devour your dick and swell around the sides of your pregnancy as well. Between ${his} licking, and the fleshy prison surrounding your privates, it doesn't take long for you to soak ${his} face and plant your seed deep into ${his} cleavage.`);
			} else if (slave.boobs >= 5000) {
				r.push(`${His} breasts are so monstrous they completely devour your dick and tickle your pregnant belly. Pushing ${his} breasts together under your gravidness, you thrust between them and the underside of your middle, all the while rubbing your pussy into ${his} face. With ${his} licking, and all the flesh against your cock, it doesn't take long for you to soak ${his} face and plant your seed deep into ${his} cleavage.`);
			} else if (slave.boobs >= 1000) {
				r.push(`${His} huge breasts fill the area under your pregnancy nicely. Pushing them together under your gravidness, you thrust between them and the underside of your middle, all the while rubbing your pussy into ${his} face. With ${his} licking, and all the flesh against your cock, it doesn't take long for you to soak ${his} face and plant your seed deep into ${his} cleavage.`);
			} else if (slave.boobsImplant > 250) {
				r.push(`${His} fake breasts fill the area under your pregnancy nicely. Pushing them together under your gravidness, you thrust between them and the underside of your middle, all the while rubbing your pussy into ${his} face. With ${his} licking, and all the flesh against your cock, it doesn't take long for you to soak ${his} face and plant your seed deep into ${his} cleavage.`);
			} else if (slave.boobs >= 650) {
				r.push(`${His} big breasts fill the area under your pregnancy nicely. You thrust between them and the underside of your middle, all the while rubbing your pussy into ${his} face. With ${his} licking, and all the flesh against your cock, it doesn't take long for you to soak ${his} face and plant your seed deep into ${his} cleavage.`);
			} else if (slave.boobs >= 300) {
				r.push(`You have to feel around under your pregnancy to hold your cock against ${his} tiny breasts. You thrust against them and your hand, while the other teases your middle, all the while rubbing your pussy against ${his} face. Between ${his} licking, and your own teasing, it doesn't take long for you to soak ${his} face and splatter your seed across ${his} front.`);
			} else {
				r.push(`You have to lean forward and pin your cock against ${his} flat chest with the underside of your own pregnancy to make any real channel to thrust into. You fondle your belly${(V.PC.boobs >= 300) ? ` and breasts` : ``}, all the while rubbing your pussy against ${his} face. Between ${his} licking, and your own teasing, it doesn't take long for you to soak ${his} face and splatter your seed across your underbelly and ${his} front. You turn around and have ${his} lick you clean before pulling your gravid bulk off of ${him}.`);
			}
		} else {
			r.push(`You lay ${him} down on the couch on ${his} back, lather oil onto ${his} breasts and gingerly straddle ${his} face; your needy cunt over ${his} mouth.`);
			if (slave.boobs >= 20000) {
				r.push(`${His} breasts are so colossal you can barely maintain this position, but they are massively fun to play with as ${he} eats you out. You massage your pregnancy with ${his} acres of breast flesh, teasing your own stretched skin with ${hers}. You can visibly see the vibrations running through ${his} tits as you quiver from the mouth working your pussy. Thoroughly soaking ${him}, you fall into ${his} endless cleavage for a short rest.`);
			} else if (slave.boobs >= 10000) {
				r.push(`${His} breasts are so massive you can barely maintain this position, but they are fun to play with as ${he} eats you out. You massage the edges of your pregnancy with ${his} breast flesh, teasing your own stretched skin with ${hers}. You can visibly see the vibrations running through ${his} tits as you quiver from the mouth working your pussy. Thoroughly soaking ${him}, you fall into ${his} immense cleavage for a short rest.`);
			} else if (slave.boobs >= 5000) {
				r.push(`${His} breasts are so monstrous they make a fabulous rest for your pregnancy as ${he} eats you out. You tease ${his} breasts using your baby bump, rubbing it against them and vice versa. You can visibly see the vibrations running through ${his} tits as you quiver from the mouth working your pussy. Thoroughly soaking ${him}, you dismount and lean against ${his} monster breasts for a quick rest.`);
			} else if (slave.boobs >= 1000) {
				r.push(`${His} breasts are huge enough to support your pregnancy as ${he} eats you out. You press your belly more and more into them as ${his} tongue delves deeper into your folds. You can visibly see the vibrations running through the breast flesh forced to the sides of your middle as you quiver from the mouth working your pussy. Thoroughly soaking ${him}, you dismount and lean against ${his} huge breasts for a quick rest.`);
			} else if (slave.boobs >= 650) {
				r.push(`${His} big breasts fill the area under your pregnancy nicely. You press your belly more and more into them as ${his} tongue delves deeper into your folds. You can visibly see the vibrations running through the breast flesh forced to the sides of your middle as you quiver from the mouth working your pussy. Thoroughly soaking ${him}, you dismount and lean against ${his} big breasts for a quick rest.`);
			} else if (slave.boobs >= 300) {
				r.push(`${His} tiny breasts are completely covered by your pregnancy. You reach under yourself, grabbing what you can of ${his} breasts and pushing them against your crotch. Between rubbing ${his} breasts against your self and ${his} tongue in your pussy, you quickly climax, thoroughly soaking ${him}.`);
			} else {
				r.push(`${His} flat chest is completely covered by your pregnancy. Reach under yourself, you feel around until you find ${his} nipples. You tease ${his} flat chest until you're at you limit, thoroughly soaking ${him}, before dismounting and returning to your desk.`);
			}
		}
	} else if (isAmputee(slave)) {
		if (V.PC.dick !== 0) {
			r.push(`${His} limbless`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`torso makes ${him} a unique appliance for mammary intercourse. You lay ${him} down on the ground on ${his} back, lube ${his} cleavage, and straddle ${his} torso. With your cock between ${his} breasts, you`);
			if (slave.boobs >= 650) {
				r.push(`squash ${his} tits together to form a nice lubricated channel,`);
			} else {
				r.push(`hold your cock in place,`);
			}
			r.push(`and ride back and forth on ${him}.`);
			if (V.PC.vagina !== -1) {
				r.push(`Your pussylips rub deliciously across ${his} sternum.`);
			}
			r.push(`${He} has some trouble breathing under the assault, but ${he} manages. And for the finale, ${he}'s totally unable to avoid a perfect cumshot.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`You set ${his} limbless torso upright on your lap, facing you, so that your breasts and ${hers} are resting heavily against one another. ${He} turns ${his} head to avoid getting splashed in the eyes as you add a generous coating of oil to the heaving breastflesh. You reach around to grab ${him} by the hips and slide ${him} up and down, giving you both a wonderful mammary oil massage.`);
		} else {
			r.push(`You set ${his} limbless torso on the floor, and tease ${him} for a while until ${his} nipples are rock hard. This done, you kneel down on ${him} with each of your legs aside ${his} torso, and hump your pussy back and forth on the stiff nub of one nipple. ${He} lies there, unable to do anything but comply, squirming with the stimulation.`);
		}
	} else if (tooBigBelly(slave)) {
		if (V.PC.dick !== 0) {
			r.push(`${His} excessively large belly makes ${him} a unique appliance for mammary intercourse. You lay ${him} down on the ground on ${his} back, lube ${his} cleavage, and gingerly fit yourself between ${his} belly and ${his} breasts. With your cock between ${his} breasts, you`);
			if (slave.boobs >= 650) {
				r.push(`squash ${his} tits together to form a nice lubricated channel,`);
			} else {
				r.push(`hold your cock in place,`);
			}
			r.push(`and ride back and forth on ${him}. You blast ${him} in the face with your cum in no time${(V.PC.vagina !== -1) ? `, leaving your pussyjuice on ${his} belly where you rubbed against ${him}` :``}.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`You lie down on top of ${him}, face to face, forced high into the air by ${his} excessively large belly, so that your breasts press into ${his}`);
			if (slave.boobs >= 20000) {
				r.push(`colossal tits.`);
			} else if (slave.boobs >= 10000) {
				r.push(`massive tits.`);
			} else if (slave.boobs >= 5000) {
				r.push(`monster tits.`);
			} else if (slave.boobs >= 1000) {
				r.push(`huge tits.`);
			} else if (slave.boobsImplant > 250) {
				r.push(`fake tits.`);
			} else if (slave.boobs >= 650) {
				r.push(`big tits.`);
			} else if (slave.boobs >= 300) {
				r.push(`small tits.`);
			} else {
				r.push(`flat chest.`);
			}
			r.push(`Scooting around to stimulate your nipples against ${his} warm breastflesh, you kiss the slave while pushing a hand down between you to schlick yourself against ${him}.`);
		} else {
			r.push(`You set ${his} massively distended body on the floor, and tease ${him} for a while until ${his} nipples are rock hard. This done, you kneel down on ${him} with each of your legs aside ${his} torso, rear against the top of ${his} belly, and hump your pussy back and forth on the stiff nub of one nipple. ${He} lies there, desperately trying to reach around ${his} bulk to ${his} own pussy, but unable to do so, resorts to squirming with the stimulation.`);
		}
	} else if (tooBigBreasts(slave)) {
		if (V.PC.dick !== 0) {
			r.push(`${His} excessive breasts make ${him} a unique appliance for mammary intercourse. You lay ${him} down on the ground on ${his} back, lube ${his} cleavage, and straddle ${his} torso. ${He} holds ${his} udders together, creating a warm, wet channel as fuckable as any hole. You blast ${him} in the face with your cum in no time${(V.PC.vagina !== -1) ? `, leaving your pussyjuice on ${his} chest where you rubbed against ${him}` : ``}.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`You lie down on top of ${him}, face to face, so that your much smaller breasts press into the massive pillows formed by ${his} chest. Scooting around to stimulate your nipples against ${his} warm breastflesh, you kiss the slave while pushing a hand down between you to schlick yourself against ${him}.`);
		} else {
			r.push(`You set ${his} nearly helpless body on the floor and then scoot your hips under the massive weight of ${his} tits. The heft feels nice against you, and you worm a naughty hand under there to play with yourself in the warm cave formed by your pelvis and ${his} udders.`);
		}
	} else if (tooBigButt(slave)) {
		if (V.PC.dick !== 0) {
			r.push(`${His} excessive butt makes ${him} a unique appliance for mammary intercourse. You lay ${him} down on the ground on ${his} back, ${his} butt hoisting ${his} crotch high above ${his} head, lube ${his} cleavage, and straddle ${his} torso. With your cock between ${his} breasts, you`);
			if (slave.boobs >= 650) {
				r.push(`squash ${his} tits together to form a nice lubricated channel,`);
			} else {
				r.push(`hold your cock in place,`);
			}
			r.push(`and ride back and forth on ${him}${(V.PC.vagina !== -1) ? `, leaving your pussyjuice on ${his} chest where you rubbed against ${him}` : ``}. ${He} has some trouble breathing under the assault, but ${he} manages. And for the finale, ${he}'s totally unable to avoid a perfect cumshot.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`You set ${him} upright on your lap, facing you, so that your breasts and ${hers} are resting heavily against one another and ${his} massive ass covers your lap. ${He} turns ${his} head to avoid getting splashed in the eyes as you add a generous coating of oil to the combined breastflesh. You reach around to grab ${his} luxurious ass and jiggle ${him} up and down, giving you both a wonderful mammary oil massage.`);
		} else {
			r.push(`You set ${his} nearly helpless body on the floor and then scoot your hips under the massive weight of ${his} tits. The heft feels nice against you, and you worm a naughty hand under there to play with yourself in the warm cave formed by your pelvis and ${his} udders.`);
		}
	} else if (slave.fetish === "boobs" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && V.PC.dick !== 0) {
		r.push(`${He} comes over hurriedly, already presenting ${his} breasts. ${He} gives you a titjob with ${his} lubricated cleavage while you sit at your desk, playing with ${his} own nipples and moaning with pleasure.`);
		if (V.PC.vagina !== -1) {
			r.push(`${He} does ${his} best to push ${his} sternum hard against you, giving your pussy some stimulation, too.`);
		}
		r.push(`As you get close to orgasm, you push ${his} ${hasBothArms(slave) ? `hands` : `hand`} away and take over,`);
		if (slave.nipples === "fuckable") {
			r.push(`running your fingers around the lip of ${his} ${slave.nipples} nipples. When you finish, you drive them in, hard,`);
		} else {
			r.push(`rolling ${his} ${slave.nipples} nipples between your fingers and thumbs. When you finish, you give them a hard pull,`);
		}
		r.push(`sending ${him} gasping over the edge as well.`);
	} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && slave.chastityPenis === 1) {
		r.push(`${He} comes over eagerly, with hunger in ${his} eyes. ${He} gives you a titjob with ${his} lubricated cleavage while you sit at your desk. As a cumslut ${he}'s almost desperate to get your cum into ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`mouth and rubs a nipple with one hand and ${his} anal opening with the other, since ${he} can't touch ${his} cock. The situation brings ${him} some pleasure, but the first twitches of ${his} cock against ${his} chastity cage are so uncomfortable that ${he} subsides into busy mechanical dick-sucking. ${He} writhes uncomfortably, frustrated beyond belief.`);
	} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && slave.dick !== 0 && V.PC.dick !== 0) {
		r.push(`${He} comes over eagerly, with hunger in ${his} eyes. ${He} gives you a titjob with ${his} lubricated cleavage while you sit at your desk. As a cumslut ${he}'s almost desperate to get your cum into ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`mouth and`);
		if (canAchieveErection(slave)) {
			r.push(`jacks ${himself} off`);
		} else {
			r.push(`rubs ${his} sadly limp member`);
		}
		r.push(`in anticipation. When you finish, ${he} sits back with an ecstatic look on ${his} face and lets your cum rest in ${his} mouth as ${he} climaxes into ${his} hand. ${He} pours ${his} own cum from ${his} hand into ${his} mouth so it can mingle with yours.`);
	} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60 && slave.fetishKnown === 1 && V.PC.dick !== 0) {
		r.push(`${He} comes over eagerly, with hunger in ${his} eyes. ${He} gives you a titjob with ${his} lubricated cleavage while you sit at your desk. As a cumslut ${he}'s almost desperate to get your cum into ${his}`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`mouth and rubs ${himself} in anticipation. When you finish, ${he}`);
		if (V.PC.vagina !== -1) {
			r.push(`quickly swallows and then runs ${his} hot tongue down to your wet pussy, eagerly licking your juices.`);
		} else {
			r.push(`sits back with an ecstatic look on ${his} face and lets your cum rest in ${his} mouth as ${he} climaxes.`);
		}
	} else if (slave.devotion < -20) {
		r.push(`${He} tries to refuse you, so you throw ${him} down on the couch next to your desk and`);
		if (V.PC.dick !== 0) {
			r.push(`squeeze lubricant between ${his} ${slave.skin} breasts. You straddle ${his} torso, hold ${his} boobs together, and fuck ${his} cleavage${(V.PC.vagina !== -1) ? `, grinding your hips down against ${him} to stimulate your pussy` : ``}. Your cum splashes ${his} crying face.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`squirt lubricant all over ${his} ${slave.skin} breasts. Then, you lie down atop ${him} with your breasts meshing with ${hers} and begin to slide up and down, stimulating your nipples wonderfully. ${He} tries to turn ${his} head away, but you reach up to force ${his} unwilling mouth to accept your insistent tongue.`);
		} else {
			r.push(`straddle ${his} face, grinding your pussy against ${his} unwilling mouth. You begin to grope ${his} breasts and pinch ${his} nipples to hardness, and when ${he}'s slow at eating you out, you twist them cruelly. The pain makes ${him} squeal into your pussy, a lovely sensation, so you manhandle ${him} without mercy until you climax against ${his} gasping face.`);
		}
	} else if (slave.devotion <= 20 && slave.lactation > 0) {
		r.push(`${He} lies on the couch next to your`);
		if (V.PC.dick !== 0) {
			r.push(`desk and rubs lube over ${his} ${slave.skin} chest so you can fuck ${his} tits. You straddle ${his} torso, hold ${his} boobs together, and fuck ${his} cleavage. As you do, the pressure of your grip causes a thin rivulet of milk to run from each of ${his} nipples. Your cum covers ${his} reluctant face; between your semen${(V.PC.vagina !== -1) ? `, the pussyjuice you left on ${his} chest,` : ``}and ${his} milk ${he}'s quite a mess.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`desk and rubs lube over ${his} ${slave.skin} breasts. Then, you lie down atop ${him} with your breasts meshing with ${hers} and begin to slide up and down, titillating your nipples wonderfully. ${He} cannot ignore the slippery stimulation ${his} nipples are receiving, and you find ${his} mouth quite willing to receive your insistent tongue. ${He} begins to leak milk, adding ${his} cream to the lube between your breasts, and by the time you're done there's quite a mess.`);
		} else {
			r.push(`desk, and you've straddled ${his} face before ${he} can do anything more. You begin to grope ${his} breasts and pinch ${his} nipples to hardness as ${he} eats you out, your ministrations producing prompt jets of creamy milk, straight up into the air. You milk ${him} without mercy, shooting some of the stronger streams into your mouth as you ride ${him}, leaving ${him} to massage ${his} breasts gingerly as you get off ${his} face.`);
		}
	} else if (slave.devotion <= 20) {
		r.push(`${He} lies on the couch next to your`);
		if (V.PC.dick !== 0) {
			r.push(`desk and rubs lube over ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`chest so you can fuck ${his} ${slave.skin} tits. You straddle ${his} torso, hold ${his} boobs together, and fuck ${his} cleavage. Your cum covers ${his} reluctant face${(V.PC.vagina !== -1) ? `, and you hike yourself up a little higher to grind your pussy against ${his} mouth` : ``}.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`desk and rubs lube over ${his} ${slave.skin} breasts. Then, you lie down atop ${him} with your breasts meshing with ${hers} and begin to slide up and down, titillating your nipples wonderfully. ${He} cannot ignore the slippery stimulation ${his} nipples are receiving, and you find ${his} mouth quite willing to receive your insistent tongue.`);
		} else {
			r.push(`desk, and you've straddled ${his} face before ${he} can do anything more. You begin to grope ${his} breasts and pinch ${his} nipples to hardness as ${he} eats you out, your ministrations producing moans that feel quite nice against your clit. You maul ${his} boobs without mercy as you reach your climax, leaving ${him} to massage ${his} breasts gingerly as you get off ${him}.`);
		}
	} else if (slave.lactation > 0) {
		r.push(`Since ${he}'s producing milk, ${he} gets an emotional high from breastfeeding, and ${he} sits on the edge of your desk for a while so you can use ${him} as a beverage dispenser while you work. Once ${he}'s empty, ${he} gets down to`);
		if (V.PC.dick === 0) {
			r.push(`eat you out.`);
			if (hasAnyArms(slave)) {
				r.push(`As ${he} buries ${his} face between your legs, ${he} gently rolls ${his} sore nipples around in ${his} fingers, quietly moaning and whining.`);
			}
		} else {
			r.push(`give you a titjob.`);
			if (hasAnyArms(slave)) {
				r.push(`As you titfuck ${him}, ${he} gently rolls ${his} sore nipples around in ${his} fingers, quietly moaning and whining.`);
			}
			r.push(`Your cum covers ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`face in no time, and ${he}'s left with a spectacular mess to clean. ${He} laps it all up.`);
		}
	} else {
		if (V.PC.dick !== 0) {
			r.push(`${He} massages and toys with ${his} chest for your benefit, languidly rubbing lubricant over not only ${his} cleavage but ${his} entire chest, making sure every`);
			if (V.showInches === 2) {
				r.push(`inch`);
			} else {
				r.push(`centimeter`);
			}
			r.push(`of ${his} ${slave.skin} breasts are nice and shiny. ${He} gives you a titjob with ${his} lubricated cleavage while you sit at your desk${(V.PC.vagina !== -1) ? `, doing ${his} best to run ${his} hard nipples between your pussylips whenever ${he} can` : ``}. Your cum covers ${his}`);
			if (V.seeRace === 1) {
				r.push(slave.race);
			}
			r.push(`face, and ${he} carefully licks it all off while continuing to play with ${his} erect nipples.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`${He} rubs lube over ${his} ${slave.skin} breasts, flirting with you and sticking out ${his} chest, before lying down on the couch. You lie down atop ${him} with your breasts meshing with ${hers} and begin to slide up and down, titillating your nipples wonderfully. You find ${his} mouth quite willing to receive your insistent`);
			if (hasAnyArms(slave)) {
				r.push(`tongue, and while you make out, ${he} slips`);
				if (hasBothArms(slave)) {
					r.push(`a`);
				} else {
					r.push(`${his}`);
				}
				r.push(`hand down between your legs to give you a handjob, too.`);
			} else {
				r.push(`tongue.`);
			}
		} else {
			r.push(`${He} flirts with you and sticks out ${his} chest before lying down on the couch. You've straddled ${his} face before ${he} can do anything more, and ${he} begins to eat you out with enthusiasm. You begin to grope ${his} breasts and pinch ${his} nipples to hardness as ${he} gives you oral, your ministrations producing moans that feel quite nice against your clit. You maul ${his} boobs without mercy as you reach your climax, but ${he} loves it all.`);
		}
	}

	if (random(1, 100) > (100+slave.devotion)) {
		if (slave.fetish !== "boobs" && slave.energy <= 95 && slave.behavioralFlaw === "none") {
			if (V.PC.vagina >= 0 && V.PC.dick === 0) {
				r.push(`Being manhandled and used by you has given ${him} a <span class="flaw gain">hatred of women.</span>`);
				slave.behavioralFlaw = "hates women";
			} else {
				r.push(`Being manhandled and used has given ${him} a <span class="flaw gain">hatred of men.</span>`);
				slave.behavioralFlaw = "hates men";
			}
		}
	} else if (random(1, 100) > (110-slave.devotion)) {
		if (slave.fetish === Fetish.NONE &&
		(slave.behavioralFlaw !== "hates men" || V.PC.dick === 0) &&
		(slave.behavioralFlaw !== "hates women" || V.PC.dick > 0)
		) {
			r.push(`Having attention and love lavished on ${his} boobs by ${his} ${getWrittenTitle(slave)} has ${him} thinking of ${his} <span class="fetish gain">breasts as sexual organs.</span>`);
			slave.fetish = "boobs";
			slave.fetishKnown = 1;
		}
	}

	if (slave.lactation > 0) {
		slave.lactationDuration = 2;
		slave.boobs -= slave.boobsMilk;
		slave.boobsMilk = 0;
	} else {
		r.push(induceLactation(slave));
	}

	if (hasAnyLegs(slave)) {
		switch (slave.assignment) {
			case "work in the dairy":
				r.push(`${He} goes off to carefully wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`to keep production in ${V.dairyName} nice and sanitary.`);
				break;
			case "work as a farmhand":
				r.push(`${He} goes off to carefully wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`to make sure ${he} doesn't taint the food in ${V.farmyardName}.`);
				break;
			case "whore":
				r.push(`${He} heads off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`before ${he} returns to prostituting ${himself}.`);
				break;
			case "work in the brothel":
				r.push(`${He} goes to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage,`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage,`);
				} else {
					r.push(`chest,`);
				}
				r.push(`even though it's likely to be splashed with customers' cum soon after ${he} returns to work.`);
				break;
			case "serve the public":
				r.push(`${He} heads off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`before ${he} goes back out to fuck passersby.`);
				break;
			case "serve in the club":
				r.push(`${He} goes to beautify ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`so it can again serve as an ornament to ${V.clubName}.`);
				break;
			case "work as a servant":
				r.push(`${He} rushes to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage,`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage,`);
				} else {
					r.push(`chest,`);
				}
				r.push(`afraid ${he}'s fallen behind on the chores while you used ${him}.`);
				break;
			case "work as a nanny":
				r.push(`${He} rushes to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage,`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage,`);
				} else {
					r.push(`chest,`);
				}
				r.push(`before hurrying to continue taking care of the children in ${V.nurseryName}.`);
				break;
			case "rest":
				r.push(`${He} stumbles off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`before crawling back into bed.`);
				break;
			case "be the Schoolteacher":
				r.push(`${He} heads off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`before ${he} returns to ${his} classes.`);
				break;
			case "get milked":
				r.push(`${He} hurries off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				if (slave.lactation > 0) {
					r.push(`before going to get ${his} uncomfortably milk-filled tits drained.`);
				} else {
					r.push(`and then rests until ${his} balls are ready to be drained again.`);
				}
				break;
			case "please you":
				r.push(`${He} hurries off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`before returning to await use, as though nothing had happened.`);
				break;
			case "be a subordinate slave":
				r.push(`${He} moves off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage,`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage,`);
				} else {
					r.push(`chest,`);
				}
				r.push(`though it's only a matter of time before another slave decides to play with ${his} tits.`);
				break;
			case "be a servant":
				r.push(`${He} hurries off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage,`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage,`);
				} else {
					r.push(`chest,`);
				}
				r.push(`since ${his} chores didn't perform themselves while you titfucked ${him}.`);
				break;
			case "be your Head Girl":
				r.push(`${He} hurries off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage,`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage,`);
				} else {
					r.push(`chest,`);
				}
				r.push(`worried that ${his} charges got up to trouble while ${he} had ${his} breasts around your cock.`);
				break;
			case "guard you":
				r.push(`${He} hurries off to wash ${his}`);
				if (slave.boobs > 1500) {
					r.push(`acre of cleavage`);
				} else if (slave.boobs > 500) {
					r.push(`generous cleavage`);
				} else {
					r.push(`chest`);
				}
				r.push(`so that you will be unguarded for as little time as possible.`);
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
