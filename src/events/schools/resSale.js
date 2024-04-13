App.Events.RESSale = class RESSale extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.cash > 10000,
			() => V.rep > 6000,
			() => {
				for (const [school, data] of App.Data.misc.schools) {
					if (V[school].studentsBought === 0 && data.requirements) {
						return true;
					}
				}
			}
		];
	}

	actorPrerequisites() {
		return [];
	}

	execute(node) {
		let r = [];

		const validSchools = [];
		for (const [school, data] of App.Data.misc.schools) {
			if (V[school].studentsBought === 0 && data.requirements) {
				validSchools.push(school);
			}
		}

		/** @type {FC.SlaveSchoolName} */
		const school = validSchools.random();

		/* generate sales slave for images and pronouns */
		V[school].schoolSale = 1;
		const marketResult = generateMarketSlave(school);
		const salesSlave = marketResult.slave;
		r.push(marketResult.text);
		if (school === "TSS") {
			salesSlave.clothes = "a schoolgirl outfit";
		} else if (school === "TUO") {
			salesSlave.clothes = "nice business attire";
		} else if (school === "GRI") {
			salesSlave.clothes = "a slave gown";
		} else if (school === "SCP") {
			salesSlave.clothes = "a string bikini";
		} else if (school === "HA") {
			salesSlave.clothes = "a nice maid outfit";
		}
		const {
			He, His,
			he, his, him, himself, girl
		} = getPronouns(salesSlave);
		const sir = V.PC.title !== 0 ? "sir" : "ma'am";
		const Sir = V.PC.title !== 0 ? "Sir" : "Ma'am";

		App.Events.drawEventArt(node, salesSlave);

		r.push(`You receive a personal call from`);
		if (school === "TSS") {
			r.push(`The Slavegirl School, a rising slave training organization known for its reliably unremarkable products, offered at a competitive price.`);
		} else if (school === "TUO") {
			r.push(`The Utopian Orphanage, a school that educates intelligent slaves until they reach their majority.`);
		} else if (school === "GRI") {
			r.push(`The Growth Research Institute, a drug development group breaking new ground on human experimentation.`);
		} else if (school === "SCP") {
			r.push(`St. Claver Preparatory, an unusual combination of slave school and implant surgery training institution.`);
		} else if (school === "LDE") {
			r.push(`L'École des Enculées, an innovative slave school making new and interesting developments in sodomy.`);
		} else if (school === "TGA") {
			r.push(`The Gymnasium-Academy, an intense slave school with a reputation for producing fit bitches with combat skills and stiff dicks.`);
		} else if (school === "TCR") {
			r.push(`The Cattle Ranch, a pastoralist based slave school built around breeding the perfect cowgirl.`);
		} else if (school === "HA") {
			r.push(`The Hippolyta Academy, a famous slave school known to produce highly skilled battle maids.`);
		} else if (school === "NUL") {
			r.push(`Nueva Universidad de Libertad, a unique slave school promoting androgyny to the point of surgical modification.`);
		} else {
			r.push(`the Futanari Sisters, an enigmatic group of transformation enthusiasts that sells beautiful hermaphrodites.`);
		}
		if (school === "TCR") {
			r.push(`It's from a farmhand, not leadership, and they are offering a cow for sale. Before you can hang up on him and reprimand ${V.assistant.name} for allowing this Free Cities version of telemarketing to get through to you, the man hurriedly says, "${Sir}, ${he}'s half off!"`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`You pause for a moment, and he plunges on: "${Sir}, <span class="yellow">your first cow purchase from us this week is half price.</span> And, ${sir}, this milky beauty is up for grabs. Keep ${him} by your desk for fresh squeezed milk, knock on wood and ${he}'ll suck you right off, grab ${him} by the hips and ${he}'ll take anything in ${his} rear; ${he}'s plenty of fun! Come on down and get yourself a young, affectionate little cow${girl}!"`);
		} else {
			r.push(`It's from a piece of merchandise, not leadership, and ${he}'s offering ${himself} for sale. Before you can hang up on ${him} and reprimand ${V.assistant.name} for allowing this Free Cities version of telemarketing to get through to you, the slave hurriedly says, "${Sir}, I'm half off!"`);
			App.Events.addParagraph(node, r);
			r = [];

			r.push(`You pause for a moment, and ${he} plunges on: "${Sir}, <span class="yellow">your first slave purchase from us this week is half price.</span> And, ${sir}, I'm one of the slaves for sale.`);
			if (school === "TSS") {
				r.push(`I've got the very best skills I could learn as a virgin. I'm healthy, obedient, and educated. And I'm fresh, and willing, and really eager." ${He} rips ${his} white school${girl} blouse open to show off a fresh pair of tits, and shakes them for you. "I would love to be your sex slave, ${sir}", ${he} says, doing ${his} very best to sound appealing, like ${he}'s been trained.`);
			} else if (school === "TUO") {
				r.push(`I'm smart and cute. I'm well educated and obedient, I will serve you well." ${He} blushes and maintains eye contact as ${he} continues. "I'm unexperienced when it comes to sexual matters, I hope you will treat me well." ${He} bows to you and finished. "I would love to be your slave, ${sir}", ${he} says, doing ${his} very best to sound appealing, like ${he}'s been taught.`);
			} else if (school === "GRI") {
				r.push(`I've, uh, been trained to obey." ${His} eyes flick to one side, like ${he}'s reading ${his} cues. "And, um, I have really big boobs." ${He}'s wearing a bathrobe, and ${he} suddenly jerks it open to reveal a bigger pair of breasts than anyone that age could possibly have grown ${himself}. "I would love to be your sex slave, ${sir}", ${he} says, doing ${his} very best to sound appealing. No doubt ${he}'d prefer not to be part of any more testing.`);
			} else if (school === "SCP") {
				r.push(`I'm ready to be the perfect bimbo slave, and the young surgeon who did my implants was very skilled." ${He}'s wearing a bikini, and ${he} pulls it down to flash you, revealing that ${his} tits resist gravity almost perfectly. They're gorgeous, but quite fake. "I would love to be your sex slave, ${sir}", ${he} says, doing ${his} very best to sound appealing, like ${he}'s been trained.`);
			} else if (school === "LDE") {
				r.push(`I've been trained to need cock up my ass." ${He}'s nude, and spins around to point ${his} ass at the camera. ${He} begins to wink ${his} big butthole, ${his} tiny, soft cock dangling limply below it. ${He} cranes ${his} head around to continue. "I can come from nothing but buttsex," ${he} says proudly. "I would love to be your anal slut, ${sir}", ${he} says, sounding very eager to begin.`);
			} else if (school === "TGA") {
				r.push(`My tutelage has been long and hard, and I'm very eager to begin my life as a slave." ${He}'s nude, and stands up to reveal ${his} hard-on. ${He} spins for the camera, showing ${himself} off. "I can help protect you, too: I'm proficient in unarmed combat, and I have weapons training. I would love to be your bitch, or your bodyguard, ${sir}", ${he} says, doing ${his} very best to sound appealing, like ${he}'s been told.`);
			} else if (school === "HA") {
				r.push(`I am ready to serve you in any way you deem fit and do everything I can to protect your life." ${He}'s wearing a delicate maid uniform, beautifully contrasting ${his} powerful physique and towering stature. "The academy has given me the opportunity to learn many valuable skills and I look forward to putting them at your service."`);
			} else if (school === "NUL") {
				r.push(`My education is complete, and I am ready to unveil the perfection of my form to the world." Naturally, ${he}'s totally nude, yet you still are unable to even guess what sort of equipment ${he} was born with. "It is my duty and my honor to share myself in eternal servitude, in all manners and mechanisms," ${he} says in an unnervingly upbeat monotone.`);
			} else {
				r.push(`The time has come for me to serve my Sisters by leaving my community and becoming a slave. Our sex skills are unparalleled," ${he} says proudly. ${He}'s nude, and reclines luxuriantly for the camera, showing ${his} remarkable body off in all its gorgeous strangeness. ${His} boobs are huge, ${his} dick is hard, ${his} pussy is wet, and ${his} ass is relaxed. "I love to fuck, ${sir}", ${he} says, and you believe ${him}.`);
				if (V.PC.dick !== 0 && V.PC.vagina !== -1) {
					App.Events.addParagraph(node, r);
					r = [];
					if (V.PC.boobs >= 300) {
						r.push(`"I would also adore serving someone like you," ${he} adds sincerely, ${his} emphasis making it quite clear the Sisters have heard rumors about your hermaphroditism. "We can't offer any further discount, but I promise I'd worship you with all my heart." ${He} bats ${his} eyes at you. "And my other parts, too!"`);
					} else {
						r.push(`${His} eyes flick downward momentarily, and ${he} looks nervous, swallowing before continuing. "Please let me be your slave," ${he} almost begs. "Serving another futa would, oh," and ${he} pauses, shivering a little. Recollecting ${himself}, ${he} goes on, "Wonderful. Serving you would be a dream come true."`);
					}
				}
			}
		}

		App.Events.addParagraph(node, r);
		r = [];

		const {
			HeA,
			heA, hisA, girlA, womanA,
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		r.push(`${capFirstChar(V.assistant.name)}'s ${V.assistant.appearance} avatar appears on the screen next to the video call.`);
		if (V.assistant.personality <= 0) {
			r.push(`"I have stored the confirmation code, ${properMaster()}," it notes. "If you wish to take advantage of this promotion, use the slave buying menu to navigate to the appropriate school next week. I have appended a note to that school's entry to remind you."`);
		} else {
			if (school === "TSS" || school === "SCP") {
				r.push(`"And I would love to`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`break both ${his} virgin holes at once," the monster${girlA} exclaims, and shakes ${hisA} dicks for emphasis.`);
						break;
					case "shemale":
						r.push(`wreck ${his} virgin asshole," the shemale exclaims, and starts to jack off.`);
						break;
					case "amazon":
						r.push(`fist ${his} virgin cunt," the amazon exclaims, and helpfully raises the fist in question.`);
						break;
					case "businesswoman":
						r.push(`sell ${his} fresh pussy to the highest bidder," the business${womanA} exclaims.`);
						break;
					case "fairy":
						r.push(`play with ${his} clit and lap up those sweet virgin juices!" the fairy exclaims, licking ${hisA} lips.`);
						break;
					case "pregnant fairy":
						r.push(`play with ${his} clit and lap up those sweet motherly juices!" the fairy exclaims, licking ${hisA} lips.`);
						break;
					case "goddess":
						r.push(`teach ${him} all about being a real woman," the goddess exclaims, rubbing ${hisA} belly in anticipation.`);
						break;
					case "hypergoddess":
						r.push(`teach ${him} all about being a real woman," the goddess exclaims, rubbing ${hisA} massive belly in anticipation.`);
						break;
					case "loli":
						r.push(`play with ${him}!" the little ${girlA} exclaims happily while jumping up and down.`);
						break;
					case "preggololi":
						r.push(`play with ${him}!" the little ${girlA} exclaims happily while caressing ${hisA} belly.`);
						break;
					case "angel":
						r.push(`keep ${him} safe and craft the perfect future slavewife for someone," the angel says, crossing ${hisA} arms under ${hisA} chest.`);
						break;
					case "cherub":
						r.push(`pretty ${him} up for ${his} first love!" the cherub says, clasping ${hisA} hands together and fluttering back and forth.`);
						break;
					case "incubus":
						r.push(`brutally stretch both those holes until ${he} is a slave to my dick," the incubus says, stroking ${hisA} cock to erection.`);
						break;
					case "succubus":
						r.push(`shape ${him} into the perfect ${girl} for ${properMaster()}," the succubus says, licking ${hisA} lips with anticipation. "I'll make a real sex demon out of ${him}!"`);
						break;
					case "imp":
						r.push(`tease ${him} until ${he} is begging to have ${his} virginity taken," the imp says, rubbing ${hisA} hands together with anticipation.`);
						break;
					case "witch":
						r.push(`play with ${his} body," the witch says. "Test my spells on someone else for once."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`break both ${his} virgin holes at once," the avatar exclaims, ${hisA} chest splitting open to reveal countless tentacles, the flesh at their bases writhing with unborn young. "Fill ${him} with young until ${he} is a bloated hive."`);
						break;
					case "schoolgirl":
						r.push(`make out with ${him}. ${He}'s cute!" the school${girlA} exclaims.`);
						break;
					default:
						r.push(`fuck ${his} virgin holes," ${heA} says.`);
				}
			} else if (school === "GRI" || school === "TCR") {
				r.push(`"And I would love to`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`get my tentacles on those tits," the monster${girlA} exclaims.`);
						break;
					case "shemale":
						r.push(`fuck those titties," the shemale exclaims, and starts to jack off.`);
						break;
					case "amazon":
						r.push(`put ${him} out to pasture," the amazon exclaims, indicating the skin of milk on ${hisA} belt.`);
						break;
					case "businesswoman":
						r.push(`put that cow in the dairy," the business${womanA} exclaims.`);
						break;
					case "fairy":
						r.push(`bounce on those nipples until they fill me with milk!" the fairy exclaims, rubbing ${hisA} belly.`);
						break;
					case "pregnant fairy":
						r.push(`bounce on those nipples until my babies are fed!" the fairy exclaims, rubbing ${hisA} swollen belly.`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`taste those bountiful breasts," the goddess exclaims, licking ${hisA} lips.`);
						break;
					case "loli":
						r.push(`play with ${his} tits!" the little ${girlA} exclaims happily while jumping up and down.`);
						break;
					case "preggololi":
						r.push(`play with ${his} tits!" the little ${girlA} exclaims happily while caressing ${hisA} belly.`);
						break;
					case "angel":
						r.push(`feed all the hungry with those motherly breasts," the angel says, blushing at the thought.`);
						break;
					case "cherub":
						r.push(`have a pair just like them!" the cherub says, clasping ${hisA} hands to ${hisA} breasts.`);
						break;
					case "incubus":
						r.push(`wrap them around my shaft and blow a load right into ${his} face," the incubus says, stroking ${hisA} cock to erection.`);
						break;
					case "succubus":
						r.push(`teach ${him} the perfect way to tease ${properMaster()} with those boobs," ${heA} says, swelling ${hisA} own tits and pressing them against the screen.`);
						break;
					case "imp":
						r.push(`tease ${him} until ${he} cums to the slightest touch of ${his} nipples," the imp says, rubbing ${hisA} hands together with anticipation.`);
						break;
					case "witch":
						r.push(`play with their breasts," the witch says. "Test my lactation and breast growth spells on someone else for once."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`penetrate those nipples," the avatar exclaims, ${hisA} chest splitting open to reveal countless tentacles, the flesh at their bases writhing with unborn young. "Fill ${him} with young until they pin ${him} to the floor. Then ${his} defenseless holes will be filled too."`);
						break;
					case "schoolgirl":
						r.push(`suck on those titties!" the school${girlA} exclaims.`);
						break;
					default:
						r.push(`make those breasts bounce," ${heA} says.`);
				}
			} else if (school === "LDE" || school === "NUL") {
				r.push(`"And I would love to`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`shove both my cocks up there," the monster${girlA} exclaims.`);
						break;
					case "shemale":
						r.push(`fuck that butt even bigger," the shemale exclaims, and starts to jack off.`);
						break;
					case "amazon":
						r.push(`fist that butthole," the amazon exclaims, and helpfully raises the fist in question.`);
						break;
					case "businesswoman":
						r.push(`see how many customers that asshole can bear," the business${womanA} exclaims.`);
						break;
					case "fairy":
						r.push(`use that butt as a pillow!" the fairy exclaims.`);
						break;
					case "pregnant fairy":
						r.push(`see if I can impregnate ${his} butt!" the fairy exclaims.`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`see just how obedient ${he} really is," the goddess exclaims, flexing a hand for emphasis.`);
						break;
					case "loli":
						r.push(`play with ${his} big butt!" the little ${girlA} exclaims happily while jumping up and down.`);
						break;
					case "preggololi":
						r.push(`play with ${his} big butt!" the little ${girlA} exclaims happily while caressing ${hisA} belly.`);
						break;
					case "angel":
						r.push(`have an ass like that..." the angel trails off, a finger to ${hisA} lips as ${heA} fantasizes.`);
						break;
					case "cherub":
						r.push(`take a seat on that ass," the cherub sighs. "Flying all the time gets tiring."`);
						break;
					case "incubus":
						r.push(`wrap that ass around my shaft and blow a load across ${his} back," the incubus says, stroking ${hisA} cock to erection.`);
						break;
					case "succubus":
						r.push(`teach ${him} the perfect way to tease ${properMaster()} with that ass," ${heA} says, swelling ${hisA} own behind, pressing it against the screen and winking ${hisA} butthole tantalizingly at you.`);
						break;
					case "imp":
						r.push(`spank that ass till it's big and red then take a nap on it," the imp says, rubbing ${hisA} hands together with anticipation and yawning.`);
						break;
					case "witch":
						r.push(`play with ${his} ass," the witch says. "Test my butt growth spells on someone else for once. Last time I was hobbling around with a pair of tits as a rear for a week..."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`split ${his} asshole," the avatar exclaims, ${hisA} chest splitting open to reveal countless tentacles, the flesh at their bases writhing with unborn young. "Fill ${his} ass with larva until ${his} belly reaches the floor, swell ${his} bottom with aphrodisiacs, and watch ${him} birth until ${he} breaks."`);
						break;
					case "schoolgirl":
						r.push(`lick ${his} big soft behind," the school${girlA} exclaims, and sticks out ${hisA} tongue.`);
						break;
					default:
						r.push(`fuck that ass," ${heA} says.`);
				}
			} else if (school === "TGA") {
				r.push(`"And I would love to`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`shove both my cocks up ${his} virgin anus," the monster${girlA} exclaims.`);
						break;
					case "shemale":
						r.push(`fuck that virgin asshole," the shemale exclaims, and starts to jack off.`);
						break;
					case "amazon":
						r.push(`finger fuck ${his} virgin ass," the amazon exclaims, and helpfully raises the fingers in question.`);
						break;
					case "businesswoman":
						r.push(`sell ${his} anal virginity to the highest bidder," the business${womanA} exclaims.`);
						break;
					case "fairy":
						r.push(`give the dick a great big hug and suckle out all the precum!" the fairy exclaims, rubbing ${hisA} legs together.`);
						break;
					case "pregnant fairy":
						r.push(`play meet the baby! ...Well, maybe just with you,`);
						if (V.PC.title === 0) {
							r.push(`Big Sis,"`);
						} else {
							r.push(`Big Bro,"`);
						}
						r.push(`the fairy exclaims, rubbing ${hisA} legs together.`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`see ${him} put that dick to work," the goddess exclaims, one sultry finger at ${hisA} lips.`);
						break;
					case "loli":
						r.push(`play with ${his} dick!" the little ${girlA} exclaims happily while jumping up and down.`);
						break;
					case "preggololi":
						r.push(`get that dick in me!" the little ${girlA} exclaims happily while caressing ${hisA} belly and licking ${hisA} lips.`);
						break;
					case "angel":
						r.push(`wrap that penis up in a nice bow for ${his} wife to untie," the angel says, blushing and swaying side to side.`);
						break;
					case "cherub":
						r.push(`know how long ${he} could go for," the cherub says. "${He} could probably fuck all night long!"`);
						break;
					case "incubus":
						r.push(`plow ${his} ass and watch ${him} ejaculate against ${his} will," the incubus says, stroking ${hisA} cock to erection.`);
						break;
					case "succubus":
						r.push(`teach ${him} the perfect way to tease ${properMaster()} with that cock," ${heA} says, ${hisA} clit steadily enlarging until it's the size of ${hisA} leg. ${HeA} hefts it to ${hisA} mouth and enthusiastically tongues ${hisA} urethra.`);
						break;
					case "imp":
						r.push(`ride that cock until I'm too heavy to fly," the imp says, rubbing ${hisA} belly and spreading ${hisA} legs.`);
						break;
					case "witch":
						r.push(`play with that dick," the witch says. "Test my cock growth and cum amplification spells on someone else for once. Last time I sprouted a cock bigger than me and my belly steadily swelled with cum until I jacked off. I got so tired I couldn't do it anymore and nearly burst like a cum balloon..."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`fuck ${his} cock," the avatar exclaims, ${hisA} chest splitting open to reveal countless tentacles, the flesh at their bases writhing with unborn young. "Squirm down to ${his} balls and pump them full of larva and watch ${him} birth them until ${he} breaks."`);
						break;
					case "schoolgirl":
						r.push(`suck that dick," the school${girlA} exclaims, and sticks out ${hisA} tongue.`);
						break;
					default:
						r.push(`train that body," ${heA} says.`);
				}
			} else if (school === "HA") {
				r.push(`"And I would love to`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`break both ${his} holes at once," the monster${girlA} exclaims, and shakes ${hisA} dicks for emphasis.`);
						break;
					case "shemale":
						r.push(`wreck ${his} amazonian asshole," the shemale exclaims, and starts to jack off.`);
						break;
					case "amazon":
						r.push(`fist ${his} cunt," the amazon exclaims, and helpfully raises the fist in question.`);
						break;
					case "businesswoman":
						r.push(`sell ${his} fresh pussy to the highest bidder," the business${womanA} exclaims.`);
						break;
					case "fairy":
						r.push(`play with ${his} clit and lap up those sweet juices!" the fairy exclaims, licking ${hisA} lips.`);
						break;
					case "pregnant fairy":
						r.push(`play with ${his} clit and lap up those sweet juices!" the fairy exclaims, licking ${hisA} lips.`);
						break;
					case "goddess":
						r.push(`teach ${him} all about being a real woman," the goddess exclaims, rubbing ${hisA} belly in anticipation.`);
						break;
					case "hypergoddess":
						r.push(`teach ${him} all about being a real woman," the goddess exclaims, rubbing ${hisA} massive belly in anticipation.`);
						break;
					case "loli":
						r.push(`play with ${him}!" the little ${girlA} exclaims happily while jumping up and down.`);
						break;
					case "preggololi":
						r.push(`play with ${him}!" the little ${girlA} exclaims happily while caressing ${hisA} belly.`);
						break;
					case "angel":
						r.push(`keep ${him} safe and craft the perfect future slavewife for someone," the angel says, crossing ${hisA} arms under ${hisA} chest.`);
						break;
					case "cherub":
						r.push(`pretty ${him} up for ${his} first love!" the cherub says, clasping ${hisA} hands together and fluttering back and forth.`);
						break;
					case "incubus":
						r.push(`brutally stretch both those holes until ${he} is a slave to my dick," the incubus says, stroking ${hisA} cock to erection.`);
						break;
					case "succubus":
						r.push(`shape ${him} into the perfect ${girl} for ${properMaster()}," the succubus says, licking ${hisA} lips with anticipation. "I'll make a real sex demon out of ${him}!"`);
						break;
					case "imp":
						r.push(`tease ${him} until ${he} is begging to have ${his} virginity taken," the imp says, rubbing ${hisA} hands together with anticipation.`);
						break;
					case "witch":
						r.push(`play with ${his} body," the witch says. "Test my spells on someone else for once."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`break both ${his} virgin holes at once," the avatar exclaims, ${hisA} chest splitting open to reveal countless tentacles, the flesh at their bases writhing with unborn young. "Fill ${him} with young until ${he} is a bloated hive."`);
						break;
					case "schoolgirl":
						r.push(`make out with ${him}. ${He}'s cute!" the school${girlA} exclaims.`);
						break;
					default:
						r.push(`fuck ${his} amazonian holes," ${heA} says.`);
				}
			} else {
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`"And I love to fuck futas!" ${heA} shouts, dicks painfully erect.`);
						break;
					case "shemale":
						r.push(`"And I love to fuck futas!" ${heA} shouts, cock painfully erect.`);
						break;
					case "amazon":
						r.push(`"And I love to fuck futas!" ${heA} howls, and then adds more quietly, "A-and get fucked by futas."`);
						break;
					case "businesswoman":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, and then blushes furiously.`);
						break;
					case "fairy":
					case "pregnant fairy":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, flying circles around you.`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, awestruck with anticipation.`);
						break;
					case "cherub":
					case "loli":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, then blushes beet red when ${heA} realizes what ${heA} said.`);
						break;
					case "preggololi":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, rubbing ${hisA} bulging belly with anticipation.`);
						break;
					case "angel":
						r.push(`"Keep it away from me! It is an aberration!" ${heA} shouts, before flying off screen in a huff.`);
						break;
					case "incubus":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, ${hisA} erect dick throbbing with anticipation.`);
						break;
					case "succubus":
						r.push(`"And I love to get fucked by futas!" ${heA} exclaims,`);
						if (V.PC.dick !== 0 && V.PC.vagina !== -1) {
							r.push(`blowing you a kiss.`);
						} else {
							r.push(`${hisA} pussy already wet with anticipation.`);
						}
						break;
					case "imp":
						r.push(`"And I love to get fucked by futas till I'm too heavy to fly," ${heA} exclaims, rubbing ${hisA} belly and spreading ${hisA} legs.`);
						break;
					case "witch":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, readying a spell to make them last longer.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, ${hisA} chest splitting open to reveal countless tentacles, the flesh at their bases writhing with unborn young. "So many holes to force young into! I can't wait to turn ${him} into a bulging, squirming, bursting nursery!"`);
						break;
					case "schoolgirl":
						r.push(`"And I love to fuck futas!" ${heA} exclaims, bouncing with excitement.`);
						break;
					default:
						r.push(`"And I love to fuck futas!" ${heA} exclaims.`);
				}
			}
			r.push(`"Ahem. I have stored the confirmation code, ${properMaster()}," ${heA} notes. "If you wish to take advantage of this promotion, use the slave buying menu to navigate to the appropriate school next week. I have appended a note to that school's entry to remind you."`);
		}
		App.Events.addParagraph(node, r);
	}
};
