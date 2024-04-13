// cSpell:ignore tard

App.Events.pRivalryHostage = function() {
	return execute();

	function execute() {
		const node = new DocumentFragment();
		V.rival.hostageState = 1;
		V.hostage = createHostage();
		App.Events.drawEventArt(node, V.hostage);

		switch (V.rival.FS.name) {
			case "Maturity Preferentialism":
			case "Petite Admiration":
			case "Statuesque Glorification":
			case "Youth Preferentialism":
				V.hostageWife = GenerateNewSlave("XX");
		}

		const {
			He, His,
			he, him, himself, his, girl, woman, sister
		} = getPronouns(V.hostage);
		const {
			HeR,
			heR, hisR
		} = getPronouns({pronoun: (V.rival.gender === 2) ? 1 : 0}).appendSuffix("R");
		const {girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		const {womanP, girlP} = getPronouns(V.PC).appendSuffix("P");
		const {woman2, girl2, he2, his2} = getPronouns(V.hostageWife || {pronoun : 0}).appendSuffix("2");
		let r = [];

		let closer = 0;
		r.push(`Only a few days into your inter-arcology war, you receive a video message from your rival. Once ${V.assistant.name} is satisfied that the file is clean, you clear your office and pull it up. To your surprise, there are two faces on your desk, not one. One of them is your rival, and after a moment, you remember who the other is. You recognize ${him} from your`);
		if (isPCCareerInCategory("wealth")) {
			if (V.PC.career === "wealth" || V.PC.career === "trust fund" || V.PC.actualAge > 16) {
				r.push(`time as a wealthy ${womanP} of leisure. ${He} was a pretty little party ${girl} who ran in those circles. You were never particularly close,`);
			} else if (V.PC.career === "rich kid") {
				r.push(`time as a child with way too much money on hand. ${He} was a pretty little party ${girl},`);
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`only a handful of years your senior, that showed you what it meant to really let loose.`);
				} else {
					r.push(`around your age, that you spent a lot of time with.`);
				}
				r.push(`You can't say that you've kept in touch,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("escort")) {
			r.push(`time as a ${womanP} of sexual promiscuity.`);
			if (V.PC.career === "escort" || V.PC.career === "prostitute" || V.PC.actualAge > 16) {
				r.push(`ran in the same sex circles. You were never particularly close,`);
			} else if (V.PC.career === "child prostitute") {
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} was a pretty little slut that kept a watchful eye on you to make sure you stayed safe, as if ${he} were your big ${sister}.`);
				} else {
					r.push(`${He} was a pretty little slut around your age that you spent most of your time with. You played together, bathed together, shared clients together, and even lost your virginities together.`);
				}
				r.push(`You lost track of ${him} while moving up in the world,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("servant")) {
			r.push(`time as a ${womanP} of servitude. ${He} was a`);
			if (V.PC.career === "servant" || V.PC.career === "handmaiden" || V.PC.actualAge > 16) {
				if (V.PC.title === 1) {
					r.push(`maid`);
				} else {
					r.push(`fellow maid`);
				}
				r.push(`under your late Master.`);
				if (V.PC.title === 0 && V.seePreg) {
					r.push(`You may have delivered several of ${his} children, but you`);
				} else {
					r.push(`You`);
				}
				r.push(`were never particularly close,`);
			} else if (V.PC.career === "child servant") {
				r.push(`fellow servant under your late Master`);
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`that dedicated a lot of ${his} time to raising`);
					if (V.hostage.counter.birthsTotal > 0 && V.seePreg) {
						r.push(`you, even when burdened with ${his} own growing pregnancy.`);
					} else {
						r.push(`you.`);
					}
					if (V.seePreg) {
						if (V.PC.counter.birthMaster >= 8) {
							r.push(`Your Master was not one to waste a ${girlP}'s eggs, and you were no exception. You were completely dependent on ${his} care when your octuplets inevitably left you bed-bound.`);
						} else if (V.PC.counter.birthMaster >= 1) {
							r.push(`Your Master was not one to waste a ${girlP}'s eggs, and you were no exception. You were very reliant on ${his} assistance as you struggled along with your`);
							if (V.PC.counter.birthMaster >= 2) {
								r.push(`twins.`);
							} else {
								r.push(`pregnancy.`);
							}
						}
					}
				} else {
					r.push(`about the same age as you. You spent a lot of time playing and doing chores`);
					if (V.seePreg && (V.hostage.counter.birthsTotal > 0 || V.PC.counter.birthMaster >= 1)) {
						r.push(`together, and later,`);
						if (V.hostage.counter.birthsTotal > 0) {
							if (V.PC.counter.birthMaster >= 8) {
								r.push(`just resting against each other since ${he} never became so swollen with children to the point that ${he} could no longer move.`);
							} else if (V.PC.counter.birthMaster >= 2) {
								r.push(`learning how to function with baby-filled bellies.`);
							} else {
								r.push(`exploring ${his} baby-laden young body.`);
							}
						} else if (V.PC.counter.birthMaster >= 8) {
							r.push(`enjoying the doting attention ${he} spoiled your cramped little womb with.`);
						} else if (V.PC.counter.birthMaster >= 1) {
							r.push(`enjoying the sensation of ${his} curious hands caressing the curve of your`);
							if (V.PC.counter.birthMaster >= 2) {
								r.push(`twins-swollen middle.`);
							} else if (V.PC.counter.birthMaster >= 1) {
								r.push(`pregnant belly.`);
							}
						}
					} else {
						r.push(`together.`);
					}
				}
				r.push(`You lost track of ${him} while moving up in the world,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("gang")) {
			if (V.PC.career === "gang") {
				r.push(`time as a gang leader. ${He} was one of your best, yet you never got close enough,`);
			} else if (V.PC.career === "hoodlum" || V.PC.actualAge > 16) {
				r.push(`time with the gang. ${He} often caught your eye, but you never got particularly close,`);
			} else if (V.PC.career === "street urchin") {
				r.push(`time on the streets.`);
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} was a charming homeless ${girl} that kept a watchful eye on you to make sure you stayed safe, as if ${he} were your big ${sister}. ${He} even helped you become a gang initiate.`);
				} else {
					r.push(`${He} was another destitute child that you spent most of your time with. You foraged for scraps together, kept each other warm at night, and even became initiates into the same gang.`);
				}
				if (V.hostage.weight > 0) {
					r.push(`${He}'s put on a surprising amount of weight, so at least ${he} has been eating well.`);
				}
				r.push(`You lost track of ${him} while moving up in the world,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("BlackHat")) {
			if (V.PC.career === "BlackHat") {
				r.push(`time as a hacker for hire. ${He} supported you on jobs, even sent some choice pictures of ${himself}, but you were never really close,`);
			} else if (V.PC.career === "hacker" || V.PC.actualAge > 16) {
				r.push(`time as a hacker for fun. You both snatched some lovely pictures of each other and might have decided to take it a step further. You may have only exchanged some salacious messages and images,`);
			} else if (V.PC.career === "script kiddy") {
				r.push(`time as a hacker for fun.`);
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} was a cute little shut-in that taught you how to hack.`);
				} else {
					r.push(`${He} was another kid you often practiced your scripts with, or on, considering your stash of nudes pics of ${him}.`);
				}
				r.push(`You never really found the time to check up on ${him} while moving up in the world,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("capitalist")) {
			if (V.PC.career === "capitalist") {
				r.push(`career in venture capital. ${He} was a rising manager, young, attractive, and bright. You never worked particularly closely with ${him},`);
			} else if (V.PC.career === "entrepreneur" || V.PC.actualAge > 16) {
				r.push(`career in business. ${He} was an intern, young, attractive, and bright. You never paid too much attention to ${him},`);
			} else if (V.PC.career === "business kid") {
				r.push(`career in business.`);
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} was a pretty older student that tutored you in business.`);
				} else {
					r.push(`${He} was a cute classmate that you spent a lot of time with learning the ins and outs of business.`);
				}
				r.push(`You can't say that you've kept in touch,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("mercenary")) {
			if (V.PC.career === "mercenary" || V.PC.career === "recruit" || V.PC.actualAge > 16) {
				r.push(`career as a mercenary. ${He} was in logistical support, and was clever and pretty, but without the essential hardness. You were never that close,`);
			} else if (V.PC.career === "child soldier") {
				r.push(`time as a conscript.`);
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} was a pretty soldier that saw combat from a young age, like yourself. ${He} looked out for you when things got dangerous.`);
				} else {
					r.push(`${He} was another child soldier that served along side you. You were always there to support each other when combat become too overwhelming.`);
				}
				r.push(`You weren't sure what became of them,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("engineer")) {
			if (V.PC.career === "engineer" || V.PC.career === "construction" || V.PC.actualAge > 16) {
				r.push(`career as an arcology engineer. ${He} was a glorified sales${woman}, with the gorgeous looks and extreme intelligence necessary to sell entire arcologies. You were never close,`);
			} else if (V.PC.career === "worksite helper") {
				r.push(`career working construction jobs.`);
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} was a pretty older ${girl} that frequently visited the worksite. Both stunning and brilliant, you had little doubt ${he}'d go far.`);
				} else {
					r.push(`${He} was a cute little ${girl} that loved to stop by the worksite and ask questions. ${He} had a knack for design, and loved to share ${his} ideas with you.`);
				}
				r.push(`You can't say that you've kept in touch,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("medicine")) {
			r.push(`career in medicine.`);
			if (V.PC.career === "medicine" || V.PC.career === "medical assistant" || V.PC.actualAge > 16) {
				r.push(`${He} was a surgical nurse, one of the best. ${He} was smart, pretty, and ${he} had sure hands. You were never that close,`);
			} else if (V.PC.career === "nurse") {
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} was a pretty older nurse that taught you a lot of little things about medicine and patient care.`);
				} else {
					r.push(`${He} was another little nurse that worked alongside you, entertaining patients and doing ${his} best to stay out of the way.`);
				}
				r.push(`You can't say that you've kept in touch,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("slaver")) {
			if (V.PC.career === "slaver" || V.PC.career === "slave overseer" || V.PC.actualAge > 16) {
				r.push(`career as a slaver. ${He} was a guard in one of the slave receiving pens, and a notorious one, at that. Nobody was quite as eager to break in new slaves as ${he} was. You were never that close,`);
			} else if (V.PC.career === "slave tender") {
				r.push(`time looking after slaves.`);
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} was a pretty, if slightly scary, older ${girl} that kept a watchful eye over the slaves and you, almost like a grumpy big ${sister}.`);
				} else {
					r.push(`${He} was a little ${girl} that helped clean and feed the slaves with you. You made a pretty good team; if a new capture thought it would be easy to overpower a child, they'd quickly learn to watch their back.`);
				}
				r.push(`You can't say that you've kept in touch,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("celebrity")) {
			r.push(`time as a minor celebrity.`);
			if (V.PC.career === "celebrity" || V.PC.career === "rising star" || V.PC.actualAge > 16) {
				r.push(`${He} was a pretty little groupie who flitted from entourage to entourage. You were never particularly close,`);
			} else if (V.PC.career === "child star") {
				if (V.hostage.actualAge >= V.PC.actualAge + 6) {
					r.push(`${He} older ${girl} that not only acted as your ${sister} on the set, but also taught in the ins and outs of show business.`);
				} else {
					r.push(`${He} was a child star that was often booked alongside you. So much so, you started to be treated more like siblings than competitors.`);
				}
				r.push(`You can't say that you've kept in touch,`);
				closer = 1;
			}
		} else if (isPCCareerInCategory("arcology owner")) {
			r.push(`time owning another arcology. ${He} was a prominent citizen who supported your government. You were never particularly close,`);
		}
		if (closer !== 1) {
			r.push(`but you do remember ${him}, and your rival knows it. This is obviously the best ${heR} could come up with to provoke an emotional reaction.`);
		} else {
			r.push(`but you were close to ${him}, and your rival knows it. ${HeR} clearly did ${hisR} research when coming up with a way to provoke an emotional reaction.`);
		}

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`"Hello, ${PlayerName()}," your rival sneers. "Sorry to pull you away from`);
		switch (V.rival.FS.name) {
			case "Racial Subjugationism":
				r.push(`whipping some poor ${V.arcologies[0].FSSubjugationistRace} ${girlU}'s back bloody,`);
				break;
			case "Racial Supremacism":
				r.push(`blowing your ${V.arcologies[0].FSSubjugationistRace} girls, or whatever it is you do with your spare time,`);
				break;
			case "Gender Radicalism":
				r.push(`buttfucking your catamites, or whatever it is you do with your spare time,`);
				break;
			case "Gender Fundamentalism":
				r.push(`teatime with your slave wives,`);
				break;
			case "Repopulation Focus":
				r.push(`rolling around in the afterbirth, or whatever it is you do with your spare time,`);
				break;
			case "Eugenics":
				r.push(`circle jerking with your "elites", or whatever it is you do with your spare time,`);
				break;
			case "Paternalism":
				r.push(`handholding time with your slaves,`);
				break;
			case "Degradationism":
				r.push(`stitching your name into some poor ${girlU}'s taint, or whatever it is you do with your spare time,`);
				break;
			case "Body Purism":
				r.push(`playing house with your perfect pure little angels, or whatever it is you do with your spare time,`);
				break;
			case "Transformation Fetishism":
				r.push(`stuffing silicone up some poor ${girlU}'s nostrils,`);
				break;
			case "Youth Preferentialism":
				r.push(`your horrible schoolgirl fantasy playtime,`);
				break;
			case "Maturity Preferentialism":
				r.push(`the world's leading collection of saggy tits,`);
				break;
			case "Slimness Enthusiasm":
				r.push(`your pathological collection of flat chested bitches,`);
				break;
			case "Asset Expansionism":
				r.push(`your disgusting breast monsters,`);
				break;
			case "Pastoralism":
				r.push(`your most flatulent cowgirls,`);
				break;
			case "Physical Idealism":
				r.push(`your sweaty, spandexed throwback collection,`);
				break;
			case "Hedonistic Decadence":
				r.push(`your greasy, flatulent mounds of fat,`);
				break;
			case "Chattel Religionism":
				r.push(`your afternoon prayer meeting,`);
				break;
			case "Multiculturalism":
				r.push(`whatever it is you do to liven up your boring arcology,`);
				break;
			case "Roman Revivalism":
				r.push(`feeding slaves to the lions, or whatever it is you do with your spare time,`);
				break;
			case "Aztec Revivalism":
				r.push(`sacrificing slaves to the gods, or whatever it is you do with your spare time,`);
				break;
			case "Egyptian Revivalism":
				r.push(`your latest experiment in exactly how disgusting incest can possibly be,`);
				break;
			case "Edo Revivalism":
				r.push(`your katana polishing, or whatever it is you do with your spare time,`);
				break;
			case "Arabian Revivalism":
				r.push(`your hookah sucking,`);
				break;
			case "Chinese Revivalism":
				r.push(`your footbinding,`);
				break;
			case "Intellectual Dependency":
				r.push(`tard wrangling, or whatever it is you do with your spare time,`);
				break;
			case "Slave Professionalism":
				r.push(`being talked down to by your own slaves, or whatever it is you do with your spare time,`);
				break;
			case "Petite Admiration":
				r.push(`tripping over all those midgets you're obsessed with,`);
				break;
			case "Statuesque Glorification":
				r.push(`those face high crotches you love,`);
				break;
			default:
				r.push(`whatever it is you do with your spare time,`);
		}
		r.push(`but look what I have here! I just acquired ${him} recently. Lovely, isn't ${he}? I know ${he} wasn't important to you, but ${he} <em>is</em> a reminder of who you were. I think ${he} must have been your type." Your rival turns to the slave and continues. "While we have our little war,`);
		switch (V.rival.FS.name) {
			case "Racial Subjugationism":
				r.push(`I'm going to treat ${him} well. Train ${him}. ${He}'s a fine Head Girl prospect, don't you think? ${He}'ll have lots of nice ${V.arcologies[0].FSSubjugationistRace} girls to make love to whenever ${he} wants. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Racial Supremacism":
				r.push(`I'm going to destroy ${him}. ${He}'s got a whipping post with ${his} name on it, right between a couple of ${V.arcologies[0].FSSupremacist} bitches. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave begins to scream, and the noise goes on and on as the slave is tied up and scourged.`);
				break;
			case "Gender Radicalism":
				r.push(`I'm going to treat ${him} well. Train ${him}. Teach ${him} ${his} proper role in society, and make ${him} happy here. Isn't that right, ${V.hostage.slaveName}?" The slave nods uncertainly.`);
				break;
			case "Gender Fundamentalism":
				r.push(`${he}'s going to be my special pet. ${He}'ll have everything ${he} could ever want, as long as ${he} has a dick up ${his} ass. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods hesitantly, but with evident arousal.`);
				break;
			case "Paternalism":
				r.push(`I'm going to destroy ${him}. Holes first, of course. I'll have to get more inventive after that, and I'll leave ${his} vocal cords for last. That way, ${he}'ll be able to beg. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave begins to scream, and the noise goes on and on. And on.`);
				break;
			case "Degradationism":
				r.push(`${he}'s going to be my lover. ${He}'ll have everything ${he} could ever want, and I'll be sure to let ${him} know all about what you do to your slaves. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Repopulation Focus":
				r.push(`I'm going to ruin ${his} womb, making sure ${he} can never have children again. I bet you spent lots of nights fantasizing about ${him} with a huge belly didn't you?`);
				break;
			case "Eugenics":
				if (V.seeHyperPreg === 1) {
					r.push(`I'm going to have ${him} knocked up; not with my seed, of course, but the seed of the lowest of the low. I'm also going to fill ${him} with the most powerful experimental fertility drugs out there. ${He}'ll have so many children shoved into ${his} poor womb ${he}'ll be bursting at the seams. But ${he}'ll enjoy that, won't you ${SlaveFullName(V.hostage)}?" The slave nods hesitantly, but with evident arousal.`);
				} else {
					r.push(`I'm going to have ${him} knocked up; not with my seed, of course, but the seed of the lowest of the low. I'm also going to fill ${him} with the most powerful fertility drugs I can get. ${His} poor little womb will be stretched to the limit with society's worst. But ${he}'ll enjoy that, won't you ${SlaveFullName(V.hostage)}?" The slave nods hesitantly, but with evident arousal.`);
				}
				break;
			case "Body Purism":
				r.push(`I'm going to give ${him} a nice pair of fake tits. No reason to be excessively clever when I can just make ${his} tits so huge ${he} won't be able to walk. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave begins to sob.`);
				break;
			case "Transformation Fetishism":
				r.push(`${he}'s going to be my lover. I'll be sure to let ${him} know all about what you do to your slaves, and rest assured, I'll never treat ${him} that way. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Youth Preferentialism":
				r.push(`I've set ${him} up with a nice motherly ${woman2} already. I believe they'll be a perfect match. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Maturity Preferentialism":
				r.push(`I've set ${him} up with a nice young ${girl2} already. I believe they'll be a perfect match. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Slimness Enthusiasm":
				r.push(`I think I'll make ${his} IV line permanent. After all, ${he}'s never going off breast growth hormones. I'd estimate ${he} shouldn't be able to walk within a month. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave begins to sob.`);
				break;
			case "Asset Expansionism":
				r.push(`${he}'s going to be my lover. I'll be sure to let ${him} know all about what you do to your slaves, and rest assured, I'll never give ${him} growth hormones, not one single dose. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Pastoralism":
				r.push(`${he}'s going to be my spotter. Girls should be strong, smoking hot ladies, not disgusting cows. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Cummunism":
				r.push(`${he}'s going to be my personal milk dispenser. I shouldn't have to chain ${him} to my desk after the first month, since ${his} udders will pin ${him} in place. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave begins to sob.`);
				break;
			case "Physical Idealism":
				r.push(`${he}'s going to learn to enjoy yourself. I'm going to force ${his} face full of food, ${his} cunt full of dicks and discover ${his} deepest, darkest desires. Wouldn't you like that, ${SlaveFullName(V.hostage)}?" The slave begins to sob. "To start, how about a weigh in? ${V.hostage.weight < 0 ? "Just skin and bones, how dreadful" : "So thin and shapeless, such a pity"}, but don't worry, I'll have ${him} nice and plump soon enough."`);
				break;
			case "Hedonistic Decadence":
				r.push(`${he}'s going to be my spotter. Girls should be strong, smoking hot ladies, not disgusting obese slobs. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Chattel Religionism":
				r.push(`${he}'s going to be the perfect courtesan. No preaching, no praying, just good, clean sex for money. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Multiculturalism":
				r.push(`${he}'s going to be the ideal holy whore. Thousands of citizens are going to find rapture inside ${him}. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Intellectual Dependency":
				r.push(`${he}'s going to be a skilled courtesan. ${He}'ll know how to best please ${his} partners, and most importantly, ${he}'ll perfectly understand ${his} place in society.`);
				if (V.hostage.intelligence < 0) {
					r.push(`Shame ${he}'s an idiot though. But ${he} can learn and improve still, I'll see to that.`);
				}
				r.push(`Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods begrudgingly.`);
				break;
			case "Slave Professionalism":
				r.push(`${he}'s going to become a moron${(V.hostage.intelligence < 0) ? `, though $hhe} isn't exactly smart to begin with`:``}. No time for higher thought when all ${his} brain power is caught up with how to satisfy ${his} raging libido. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave begins to sob.`);
				break;
			case "Petite Admiration":
				r.push(`I've set ${him} up with a particularly lovely giant. I believe they'll be a perfect match, even though ${he}'s half ${his2} size. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			case "Statuesque Glorification":
				r.push(`I've set ${him} up with a lovely little dwarf already. I believe they'll be a perfect match, even though ${he2}'s half ${his} size. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
				break;
			default:
				r.push(`${he}'s shaping up to be a good slave. I'm keeping ${him} informed of your`);
				if (V.rival.FS.name !== "") {
					r.push(`revisionist`);
				}
				r.push(`nonsense, and what your slaves suffer because of it. Isn't that right, ${SlaveFullName(V.hostage)}?" The slave nods uncertainly.`);
		}

		r.push(`Your rival smiles icily. "I'll keep you informed of ${his} progress. I wouldn't want you to miss a moment of it."`);
		App.Events.addParagraph(node, r);

		App.UI.DOM.appendNewElement("p", node, `You're forging a new frontier in warfare here. This, then, is the new frontier in psychological warfare.`);
		return node;

		function createHostage() {
			const params = new GenerateNewSlavePram();
			params.race = "nonslave";
			params.disableDisability = 1;

			/** The hostage is always a peer of a young PC, but younger than an adult PC. Find the appropriate age range for slave generation.
			 * @param {number} adultMin
			 * @param {number} adultMax
			 */
			function setHostageAge(adultMin, adultMax) {
				const tier = PCCareerTier();
				if (tier === "master" || V.PC.actualAge > 24) {
					params.minAge = adultMin;
					params.maxAge = adultMax;
				} else {
					params.minAge = V.PC.actualAge - 1;
					if (tier === "apprentice" || V.PC.actualAge > 16) {
						params.maxAge = V.PC.actualAge + 1;
					} else {
						params.maxAge = V.PC.actualAge;
					}
				}
			}

			/** @param {App.Entity.SlaveState} slave */
			function setCommonProperties(slave) {
				slave.origin = "You were acquainted with $him before you were an arcology owner; your rival tried to use $him to manipulate you, but you rescued $him.";
				slave.boobs = 400;
				slave.natural.boobs = slave.boobs;
				if (slave.butt > 3) {
					slave.butt = 3;
				}
				slave.muscles = 0;
				slave.behavioralFlaw = "none";
				slave.sexualFlaw = "none";
				slave.behavioralQuirk = "none";
				slave.sexualQuirk = "none";
				slave.waist = Math.clamp(slave.waist, -55, 15);
				slave.lactation = 0;
				slave.lactationDuration = 0;
				slave.hips = 0;
				slave.shoulders = -1;
				if (slave.vagina <= 0) {
					slave.vagina = 1;
				}
				if (slave.anus === 0) {
					slave.anus = 1;
				}
				slave.energy = 50;
				slave.canRecruit = 0;
				if (slave.voice < 2) {
					slave.voice = 2;
				}
				if (slave.faceShape === "masculine") {
					slave.faceShape = "cute";
				}
				slave.slaveName = slave.birthName;
				slave.slaveSurname = slave.birthSurname;
				slave.trust = 0;
				slave.devotion = 0;
				WombFlush(slave);
			}

			/** @type {Record<string, function(void): App.Entity.SlaveState>} */
			const HostageFactory = {
				wealth() {
					setHostageAge(18, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					slave.career = "a party girl";
					slave.face = 100;
					slave.intelligence = random(51, 95);
					slave.intelligenceImplant = 0;
					slave.skill.oral = 100;
					slave.skill.entertainment = 100;
					return slave;
				},
				escort() {
					setHostageAge(18, 20);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					if (V.PC.career === "escort" || V.PC.actualAge > 24) {
						slave.career = "an escort";
						App.Medicine.Modification.addScar(slave, "belly", "c-section");
						slave.counter.birthsTotal = 1;
					} else if (V.PC.career === "prostitute" || V.PC.actualAge > 16) {
						slave.career = "a prostitute";
					} else {
						slave.career = "child prostitute";
						slave.custom.tattoo = "$He has $his ID number tattooed on $his left breast.";
					}
					slave.face = 100;
					slave.intelligence = random(-15, 15);
					slave.intelligenceImplant = 0;
					slave.skill.oral = 100;
					slave.skill.entertainment = 100;
					slave.skill.anal = 100;
					slave.skill.vaginal = 100;
					slave.skill.penetrative = 35;
					slave.skill.whoring = 100;
					return slave;
				},
				servant() {
					setHostageAge(18, 20);
					if (V.pedo_mode === 1) {
						params.minAge = Math.min(params.minAge, 12);
						params.maxAge = Math.min(params.maxAge, 18);
					}
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					slave.career = "a maid";
					if (V.PC.career === "servant" || V.PC.actualAge > 24) {
						slave.counter.birthsTotal = 3;
					} else if (V.PC.career === "handmaiden" || V.PC.actualAge > 16) {
						slave.counter.birthsTotal = 1;
					} else {
						slave.career = "child servant";
						if (slave.actualAge >= V.fertilityAge + 2) {
							slave.counter.birthsTotal = 1;
						}
					}
					slave.face = 25;
					slave.intelligence = random(-50, -16);
					slave.intelligenceImplant = 0;
					slave.skill.oral = 15;
					slave.skill.entertainment = 0;
					slave.skill.anal = 15;
					slave.skill.vaginal = 15;
					slave.skill.whoring = 0;
					slave.custom.tattoo = "$He has your Master's brand on $his left breast.";
					return slave;
				},
				gang() {
					setHostageAge(20, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					if (V.PC.career === "gang" || V.PC.actualAge > 24) {
						slave.custom.tattoo = "$He has your former gang's sign tattooed on $his neck.";
						slave.career = "a gang member";
						slave.skill.combat = 40;
					} else if (V.PC.career === "hoodlum" || V.PC.actualAge > 16) {
						slave.custom.tattoo = "$He has the gang's sign that you rolled with tattooed on $his neck.";
						slave.career = "a gang member";
						slave.skill.combat = 40;
					} else {
						slave.custom.tattoo = "$He has the gang's sign that you associated with tattooed on $his neck.";
						slave.career = "street urchin";
						slave.weight = -80;
					}
					slave.muscles = 40;
					slave.skill.penetrative = 35;
					setHealth(slave, 100, 0, 0, 0, jsRandom(10, 30));
					return slave;
				},
				BlackHat() {
					setHostageAge(18, 21);
					if (V.pedo_mode === 1) {
						params.minAge = Math.min(params.minAge, 12);
						params.maxAge = Math.min(params.maxAge, 18);
					}
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					slave.career = "a shut-in";
					if (V.PC.career === "BlackHat" || V.PC.actualAge > 24) {
						slave.intelligenceImplant = 30;
					} else {
						slave.intelligenceImplant = 15;
					}
					slave.face = 75;
					slave.intelligence = 100;
					return slave;
				},
				capitalist() {
					setHostageAge(18, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					if (V.PC.career === "capitalist" || V.PC.actualAge > 24) {
						slave.career = "a manager";
						slave.intelligenceImplant = 30;
					} else if (V.PC.career === "entrepreneur" || V.PC.actualAge > 16) {
						slave.career = "an intern";
						slave.intelligenceImplant = 15;
					} else {
						slave.career = "a student from a private school";
						slave.intelligenceImplant = 15;
					}
					slave.face = 55;
					slave.intelligence = 100;
					return slave;
				},
				mercenary() {
					setHostageAge(20, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					if (V.PC.career === "mercenary" || V.PC.actualAge > 24) {
						slave.career = "a soldier";
						slave.intelligenceImplant = 15;
					} else if (V.PC.career === "recruit" || V.PC.actualAge > 16) {
						slave.career = "a soldier";
						slave.intelligenceImplant = 15;
					} else {
						slave.career = "a child soldier";
						slave.intelligenceImplant = 0;
					}
					slave.face = 55;
					slave.intelligence = 100;
					slave.skill.combat = 70;
					return slave;
				},
				engineer() {
					setHostageAge(18, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					if (V.PC.career === "engineer" || V.PC.actualAge > 24) {
						slave.career = "a saleswoman";
						slave.intelligenceImplant = 30;
					} else if (V.PC.career === "construction" || V.PC.actualAge > 16) {
						slave.career = "a saleswoman";
						slave.intelligenceImplant = 15;
					} else {
						slave.career = "a child prodigy";
						slave.intelligenceImplant = 0;
					}
					slave.face = 100;
					slave.intelligence = 100;
					return slave;
				},
				medicine() {
					setHostageAge(16, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					slave.career = "a nurse";
					if (V.PC.career === "medicine" || V.PC.actualAge > 24) {
						slave.intelligenceImplant = 30;
					} else if (V.PC.career === "medical assistant" || V.PC.actualAge > 16) {
						slave.intelligenceImplant = 30;
					} else {
						slave.intelligenceImplant = 15;
					}
					slave.face = 55;
					slave.intelligence = 100;
					return slave;
				},
				slaver() {
					setHostageAge(20, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					slave.career = "a prison guard";
					slave.face = 55;
					slave.intelligence = random(51, 95);
					slave.intelligenceImplant = 0;
					slave.muscles = 20;
					slave.fetish = "sadist";
					slave.fetishStrength = 100;
					slave.fetishKnown = 1;
					slave.skill.penetrative = 35;
					return slave;
				},
				celebrity() {
					setHostageAge(20, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					if (V.PC.career === "celebrity" || V.PC.actualAge > 24) {
						slave.career = "a party girl";
					} else if (V.PC.career === "rising star" || V.PC.actualAge > 16) {
						slave.career = "a party girl";
					} else {
						slave.career = "a child actress";
					}
					slave.face = 100;
					slave.intelligence = random(51, 95);
					slave.intelligenceImplant = 0;
					slave.skill.oral = 100;
					slave.skill.entertainment = 100;
					return slave;
				},
				"arcology owner"() {
					// fixed age range for this one
					params.minAge = V.pedo_mode ? 16 : 36;
					params.maxAge = V.pedo_mode ? 18 : 39;
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					slave.career = "a leading arcology citizen";
					slave.face = 100;
					slave.faceImplant = 15;
					slave.intelligence = 100;
					slave.intelligenceImplant = 30;
					slave.skill.whoring = 100;
					slave.skill.entertainment = 100;
					slave.skill.penetrative = 100;
					return slave;
				},
				default() {
					App.UI.DOM.appendNewElement("p", node, `PC career category "${careerCategory}" not recognized; using default hostage. Report this error.`, ["red"]);
					setHostageAge(18, 24);
					const slave = GenerateNewSlave("XX", params);
					setCommonProperties(slave);
					return slave;
				}
			};

			const careerCategory = PCCareerCategory();
			const slave = (HostageFactory[careerCategory] || HostageFactory.default)();

			switch (V.rival.FS.name) {
				case "Repopulation Focus":
					slave.preg = -3;
					break;
				case "Body Purism":
					slave.boobs = 300;
					break;
				case "Slimness Enthusiasm":
					if (slave.weight > -20) {
						slave.weight = -20;
					}
					slave.boobs = 800;
					break;
				case "Pastoralism":
					slave.weight = 100;
					slave.muscles = 0;
					slave.boobs = 1200;
					break;
				case "Cummunism":
					slave.boobs = 800;
					if (slave.weight > -20) {
						slave.weight = -20;
					}
					break;
				case "Physical Idealism":
					slave.boobs = 200;
					slave.butt = 1;
					if (slave.weight > -20) {
						slave.weight = -20;
					}
					break;
				case "Hedonistic Decadence":
					slave.weight = 100;
					slave.muscles = 0;
					slave.boobs = 1200;
					break;
			}
			return slave;
		}
	}
};
