// cSpell:ignore genpuku, unthreatened, Jugendweihe, shiki, somnophiliac

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {{text: string, type: string, effect: number}}
 */
globalThis.GetVignette = function(slave) {
	/** @type {{text: string, type: string, effect: number}[]} */
	let vignettes = [];
	const arcInfo = new App.Utils.Arcology(V.arcologies[0]);

	const {he, him, his, hers, himself, boy, He} = getPronouns(slave);

	if (slave.assignment === window.Job.WHORE || slave.assignment === window.Job.BROTHEL || slave.assignment === window.Job.MADAM) {
		let seed = jsRandom(1, 10);
		switch (seed) {
			case 1:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} witnessed a domestic dispute over another whore,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 2:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} saw a free whore finally sink into slavery,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 3:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that construction forced ${him} to move from ${his} usual spot,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 4:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that a customer used a new and improved sex toy on ${him},`,
					type: "rep",
					effect: 0,
				});
				break;
			case 5:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was an appointment with an unusually perverted family,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 6:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} saw a man sell his wife into slavery,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 7:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} saw a woman sell her daughters into slavery,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 8:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} watched a citizen descend into aphrodisiac addiction,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 9:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} watched a citizen develop the beginnings of sex addiction,`,
					type: "rep",
					effect: 0,
				});
				break;
			default:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} witnessed a citizen administering a brutal public punishment to one of their slaves,`,
					type: "rep",
					effect: 0,
				});
				break;
		}
		seed = jsRandom(1, 5);
		switch (seed) {
			case 1:
				vignettes.push({
					text: `a citizen punished one of his slaves by tying ${his} up in public near where ${slave.slaveName} was working. This cut into ${his} business that day,`,
					type: "cash",
					effect: -1,
				});
				break;
			case 2:
				vignettes.push({
					text: `a citizen shared one of his slaves with the public near where ${slave.slaveName} was working. This cut into ${his} business that day,`,
					type: "cash",
					effect: -1,
				});
				break;
			case 3:
				vignettes.push({
					text: `a private brothel offered a promotion near where ${slave.slaveName} was working. This cut into ${his} business that day,`,
					type: "cash",
					effect: -1,
				});
				break;
			case 4:
				vignettes.push({
					text: `some free sluts threw an aphrodisiac street party near where ${slave.slaveName} was working. This cut into ${his} business that day,`,
					type: "cash",
					effect: -1,
				});
				break;
			default:
				vignettes.push({
					text: `a contract breaker was punished with the pillory near where ${slave.slaveName} was working. This cut into ${his} business that day,`,
					type: "cash",
					effect: -1,
				});
				break;
		}
		seed = jsRandom(1, 6);
		switch (seed) {
			case 1:
				vignettes.push({
					text: `one of ${his} regular customers got a divorce and came to ${him} for repeated consolation,`,
					type: "cash",
					effect: 1,
				});
				break;
			case 2:
				vignettes.push({
					text: `a brothel near where ${slave.slaveName} usually works had business trouble,`,
					type: "cash",
					effect: 1,
				});
				break;
			case 3:
				vignettes.push({
					text: `a competing whore that looks like ${him} fell ill, driving a customer to look for an alternative,`,
					type: "cash",
					effect: 1,
				});
				break;
			case 4:
				vignettes.push({
					text: `a youthful first-timer to the free cities visited ${him} and was so infatuated with ${his} looks that they visited several days in a row`,
					type: "cash",
					effect: 1,
				});
				break;
			case 5:
				vignettes.push({
					text: `a street whore that works near ${him} was badly beaten by an abusive customer and had to take time off. The reduced competition got ${him} more business,`,
					type: "cash",
					effect: 1,
				});
				break;
			default:
				vignettes.push({
					text: `an influx of tourists came into ${his} part of the arcology, earning ${him} more business for a day,`,
					type: "cash",
					effect: 1,
				});
				break;
		}

		if (slave.fetishKnown === 1) {
			switch (slave.fetish) {
				case "submissive":
					vignettes.push({
						text: `${he} deeply impressed a customer with ${his} sincere submission to them,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} lost a customer who secretly wanted ${him} to show a little initiative,`,
						type: "rep",
						effect: -1,
					});
					vignettes.push({
						text: `an overeager sadistic customer roughed ${him} up more than a normal submissive like ${him} is used to,`,
						type: "health",
						effect: -1,
					});
					break;
				case "cumslut":
					vignettes.push({
						text: `${he} deeply impressed a customer with ${his} hunger for their cum,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disgusted a customer who didn't know how much cum fetishes revolted them until ${he} displayed ${hers},`,
						type: "rep",
						effect: -1,
					});
					vignettes.push({
						text: `${he} was unable to contain ${himself} and wasted a lot of time sucking the cum from other slaves' sloppy holes,`,
						type: "cash",
						effect: -1,
					});
					break;
				case "humiliation":
					vignettes.push({
						text: `${he} earned repeat business from a customer who didn't know how much they liked public sex until ${he} got them to try it,`,
						type: "cash",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disgusted a customer who didn't know how much exhibitionism turned them off until they tried public sex with ${him},`,
						type: "rep",
						effect: -1,
					});
					break;
				case "buttslut":
					if (canDoAnal(slave)) {
						vignettes.push({
							text: `${he} earned repeat business from a customer who didn't know how much they liked fucking buttholes until ${he} got them to try fucking ${hers},`,
							type: "cash",
							effect: 1,
						});
						vignettes.push({
							text: `${he} disgusted a customer who didn't know how much buttsex turned them off until ${he} got them to try fucking ${his} ass,`,
							type: "rep",
							effect: -1,
						});
					}
					if (slave.butt >= 3) {
						vignettes.push({
							text: `${he} earned repeat business from a customer who didn't know how much they liked big butts until ${he} gave them a lap dance they'll never forget,`,
							type: "cash",
							effect: 1,
						});
					}
					if (slave.behavioralFlaw === "arrogant") {
						vignettes.push({
							text: `${he} wanted it in the ass so much ${he} annoyed more than a few customers by demanding anal,`,
							type: "rep",
							effect: -1,
						});
					}
					vignettes.push({
						text: `${he} earned extra gratitude from a citizen who appreciated a nice rear, even if it is off limits,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disgusted a customer who didn't know how much butts turned them off until he put his hands on ${hers},`,
						type: "rep",
						effect: -1,
					});
					break;
				case "boobs":
					vignettes.push({
						text: `${he} deeply impressed a customer by orgasming to nothing but the feeling of them sucking ${his} nipples,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disappointed a female customer who didn't know how uninterested she was in nipple play before trying it,`,
						type: "rep",
						effect: -1,
					});
					if (slave.nipples === "fuckable") {
						vignettes.push({
							text: `${he} left a lasting impression on a pair of customers after nearly passing out from a series of intense orgasms from getting ${his} nipples fucked,`,
							type: "cash",
							effect: 2,
						});
					}
					break;
				case "sadist":
					vignettes.push({
						text: `${he} deeply impressed a customer who brought their own slave to ${him} for abuse with ${his} sadism,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `a customer brought ${him} their own slave to abuse, but the sight proved to be a turn off,`,
						type: "rep",
						effect: -1,
					});
					break;
				case "masochist":
					vignettes.push({
						text: `${he} helped a customer discover a new fetish by orgasming when they accidentally hurt ${him},`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disturbed a customer who accidentally hurt ${him} by orgasming,`,
						type: "rep",
						effect: -1,
					});
					vignettes.push({
						text: `a group of overzealous customers gangbanging ${him} got a little too excited hearing ${him} get off on abuse, leaving ${him} sore and injured,`,
						type: "health",
						effect: -1,
					});
					break;
				case "dom":
					vignettes.push({
						text: `${he} made a female customer ${his} bitch. Fortunately, the customer wanted to be ${his} bitch and came back for more,`,
						type: "cash",
						effect: 1,
					});
					vignettes.push({
						text: `${he} accidentally overwhelmed a customer with ${his} sexual dominance,`,
						type: "rep",
						effect: -1,
					});
					break;
				case "pregnancy":
					vignettes.push({
						text: `${he} earned repeat business from a customer who didn't know how much they liked pregnancy play until ${he} begged them to knock ${him} up,`,
						type: "cash",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disgusted a customer who didn't know how much pregnancy play turned them off until ${he} begged them to knock ${him} up,`,
						type: "rep",
						effect: -1,
					});
					break;
			}
		}
		switch (slave.behavioralFlaw) {
			case "arrogant":
				vignettes.push({
					text: `${he} managed to give a citizen the impression ${he} thinks ${himself} better than them,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "bitchy":
				vignettes.push({
					text: `${he} made an emasculating remark to a customer right after they fuck ${him},`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `${he} was slapped by a customer who was angry at ${his} rude remarks,`,
					type: "health",
					effect: -1,
				});
				break;
			case "odd":
				vignettes.push({
					text: `${he} infuriates a potential customer with ${his} nervous tics,`,
					type: "cash",
					effect: -1,
				});
				break;
			case "hates men":
				vignettes.push({
					text: `${his} disgust towards men surfaces at a bad time, losing ${him} a male customer,`,
					type: "cash",
					effect: -1,
				});
				break;
			case "hates women":
				vignettes.push({
					text: `${his} disgust towards women surfaces at a bad time, losing ${him} a female customer,`,
					type: "cash",
					effect: -1,
				});
				break;
			case "gluttonous":
				vignettes.push({
					text: `${he} accidentally lingers at a meal, missing a customer appointment,`,
					type: "cash",
					effect: -1,
				});
				break;
			case "anorexic":
				vignettes.push({
					text: `${his} bulimia surfaces at an extremely inopportune moment, turning a customer off,`,
					type: "cash",
					effect: -1,
				});
				break;
			case "devout":
				vignettes.push({
					text: `a customer catches ${him} praying to ${himself} as they inserted themselves into ${him}, turning them off,`,
					type: "cash",
					effect: -1,
				});
				vignettes.push({
					text: `${he} tried to preach ${his} faith to one of ${his} customers, causing him to leave in a huff,`,
					type: "cash",
					effect: -1,
				});
				break;
			case "liberated":
				vignettes.push({
					text: `${he} treats a rude potential customer impolitely, because ${he} thinks that's fair,`,
					type: "cash",
					effect: -1,
				});
				break;
		}
		switch (slave.sexualFlaw) {
			case "hates oral":
				vignettes.push({
					text: `${he} vomits while trying to deepthroat a customer,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "hates anal":
				vignettes.push({
					text: `${he} cries while taking anal from a customer who isn't into painal,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "hates penetration":
				vignettes.push({
					text: `${he} cries while taking a pounding from a customer who likes their sex consensual,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "shamefast":
				vignettes.push({
					text: `${he} cries while a potential customer looks ${him} over,`,
					type: "cash",
					effect: -1,
				});
				vignettes.push({
					text: `${he} disrobed so slowly that a potential customer gave up on ${him},`,
					type: "cash",
					effect: -1,
				});
				vignettes.push({
					text: `a customer impatient with how slowly ${he} was disrobing ripped off ${his} clothes and roughed ${him} up,`,
					type: "health",
					effect: -1,
				});
				break;
			case "idealistic":
				vignettes.push({
					text: `${he} cries when explaining the price of ${his} body to a potential customer,`,
					type: "cash",
					effect: -1,
				});
				break;
			case "repressed":
				vignettes.push({
					text: `${he} misunderstands a potential customer's lewd requests, turning them off,`,
					type: "cash",
					effect: -1,
				});
				break;
			case "apathetic":
				vignettes.push({
					text: `${he} fails to notice when a customer achieves orgasm,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "neglectful":
				vignettes.push({
					text: `${he} brought a denial fetishist to orgasm three times without cumming ${himself}, earning their repeat business,`,
					type: "cash",
					effect: 3,
				});
				break;
			case "cum addict":
				vignettes.push({
					text: `${he} was so focused on sucking down a customer's cum that ${he} managed to drive them to repeated orgasm, earning their repeated business once they got the feeling back in their legs,`,
					type: "cash",
					effect: 3,
				});
				break;
			case "anal addict":
				vignettes.push({
					text: `${he} took a trio of dicks in ${his} ass without hesitation, earning repeat business from one of them thoroughly impressed by ${his} anal addiction,`,
					type: "cash",
					effect: 3,
				});
				break;
			case "attention whore":
				vignettes.push({
					text: `${he} got repeat business from a man who loves fucking ${him} in the middle of crowded rooms,`,
					type: "cash",
					effect: 3,
				});
				break;
			case "breast growth":
				vignettes.push({
					text: `${he} got repeat business from a woman with huge breasts who enjoys roleplaying her breast expansion fetishes with ${him},`,
					type: "cash",
					effect: 3,
				});
				break;
			case "abusive":
				vignettes.push({
					text: `${he} got repeat business from a man who loves physically abusive sex, though his testicles could only take so much in one week,`,
					type: "cash",
					effect: 2,
				});
				break;
			case "malicious":
				vignettes.push({
					text: `${he} got repeat business from a masochistic woman who enjoys being whipped and degraded,`,
					type: "cash",
					effect: 3,
				});
				break;
			case "self hating":
				vignettes.push({
					text: `${he} got repeat business from an abusive man who thoroughly enjoyed how diligently ${he} took it,`,
					type: "cash",
					effect: 3,
				});
				break;
			case "breeder":
				vignettes.push({
					text: `${he} got repeat business from a pregnancy fetishist nearly driven mad with lust over ${his} pregnancy obsession,`,
					type: "cash",
					effect: 3,
				});
				break;
		}
		switch (slave.behavioralQuirk) {
			case "confident":
				vignettes.push({
					text: `${he} confidently pressed forward with a wavering potential customer, and made the sale,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "cutting":
				vignettes.push({
					text: `${he} made such a gloriously cutting remark to a male customer that a female bystander came to ${him} for repeat business,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "funny":
				vignettes.push({
					text: `${he} made a group of citizens laugh so hard, one of them came to ${him} for repeat business,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "fitness":
				vignettes.push({
					text: `${he} continued a marathon gangbang well past the point where most would have passed out,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "adores women":
				vignettes.push({
					text: `${he} struck up a personal friendship with a regular female customer,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `${he} adoringly kissed the feet of a local socialite who leaves ${him} a generous tip,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "adores men":
				vignettes.push({
					text: `${he} struck up a personal friendship with a regular male customer,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `${he} practically worshipped a minor celebrity, eagerly slobbering over his cock and covering ${himself} with his cum,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "insecure":
				vignettes.push({
					text: `${he} successfully convinced a regular customer that ${he}'s reliant on them emotionally,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "sinful":
				vignettes.push({
					text: `${he} helped a customer get past their religious hang-ups through sex with the friendly neighborhood whore,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "advocate":
				vignettes.push({
					text: `${he} successfully convinced a wavering potential customer that there's nothing wrong with banging a whore,`,
					type: "cash",
					effect: 1,
				});
				vignettes.push({
					text: `${he} managed to convince a skeptical businessman about the merits of using slaves,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `${his} enthusiastic discussion of the merits of slavery convinced a young woman to sell herself into slavery, so the new owner gave you a finder's fee,`,
					type: "cash",
					effect: 1,
				});
				break;
		}
		switch (slave.sexualQuirk) {
			case "gagfuck queen":
				vignettes.push({
					text: `${he} earned repeat business from a citizen who's obsessed with gagfucks,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "painal queen":
				vignettes.push({
					text: `${he} earned repeat business from a citizen who's obsessed with painal,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "strugglefuck queen":
				vignettes.push({
					text: `${he} earned repeat business from a citizen who's obsessed with strugglefucking,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "tease":
				vignettes.push({
					text: `${he} convinced a citizen who'd never had sex with a prostitute to patronize ${him} with some truly inspired flirting,`,
					type: "cash",
					effect: 1,
				});
				vignettes.push({
					text: `a few partiers were so impressed with ${his} provocative teasing that they repeated ${his} wit to friends,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `a few party-goers were so impressed with ${his} provocative teasing that they left ${him} a sizable tip,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "romantic":
				vignettes.push({
					text: `a citizen became infatuated with ${him}, since they are convinced ${he}'s infatuated with them,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "perverted":
				vignettes.push({
					text: `${he} earned some momentary notoriety by engaging in a previously unheard-of sex act,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "caring":
				vignettes.push({
					text: `${he} served as an impromptu sounding board for a customer having marital trouble,`,
					type: "cash",
					effect: 1,
				});
				vignettes.push({
					text: `a customer was so enamored with ${his} kind and caring manner than they proposed to ${him} and offered to take ${him} away, and when ${he} refused, they left a sizable tip,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "unflinching":
				vignettes.push({
					text: `${he} had no trouble following extremely abusive orders from one of ${his} customers, making him talk positively about the experience,`,
					type: "rep",
					effect: 1,
				});
				break;
		}

		if (slave.counter.pitKills > 0) {
			vignettes.push({
				text: `${he} earned repeat business from a customer obsessed with the fact that ${he}'s a killer,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.counter.oral > 500) {
			vignettes.push({
				text: `a customer into degradation became obsessed with driving ${his} oral mileage as high as possible,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.counter.anal > 500 && slave.anus > 0) {
			vignettes.push({
				text: `a customer into degradation became obsessed with driving ${his} anal mileage as high as possible,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.counter.vaginal > 500 && slave.vagina > 0) {
			vignettes.push({
				text: `a customer into degradation became obsessed with driving ${his} pussy mileage as high as possible,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.devotion > 95) {
			vignettes.push({
				text: `${he} really pushed ${himself} to please a customer with tastes that disgusted ${him},`,
				type: "cash",
				effect: 1,
			});
		} else if (slave.devotion < -50) {
			vignettes.push({
				text: `${his} fury at being sold for sex turned a customer off before they could fuck ${him},`,
				type: "cash",
				effect: -1,
			});
		} else if (slave.devotion <= 20) {
			vignettes.push({
				text: `${he} treasured a love token given to ${him} by a customer ${he} fooled into thinking ${his} affection was real,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (slave.trust > 95) {
			vignettes.push({
				text: `${he} really pushed ${himself} to accept a customer with tastes that frightened ${him},`,
				type: "cash",
				effect: 1,
			});
		} else if (slave.trust < -50) {
			vignettes.push({
				text: `${his} tearful terror at being forced to sell ${himself} for sex turned a customer off before they could fuck ${him},`,
				type: "cash",
				effect: -1,
			});
		}
		if (slave.trust < -20) {
			vignettes.push({
				text: `a customer who fancies himself a slave trainer noticed ${his} fear and decided to use ${him} to practice his 'slave whispering' skills,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.rules.living === "luxurious") {
			vignettes.push({
				text: `${he} got a truly perfect night's sleep, which put ${him} in the right frame of mind for the whole day,`,
				type: "rep",
				effect: 1,
			});
		} else if (slave.rules.living === "spare") {
			if (canHear(slave)) {
				vignettes.push({
					text: `${he} got a poor night's sleep in the noisy dormitory, which took the shine off ${his} efforts for the whole day,`,
					type: "rep",
					effect: -1,
				});
			} else {
				vignettes.push({
					text: `the noise from the dormitory could not possibly disturb ${his} sleep, so ${he} got much better sleep than ${he} would have otherwise,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (slave.rules.release.masturbation === 1) {
			vignettes.push({
				text: `a customer asked if ${he} masturbates, and then spent an hour jerking off as ${he} described how,`,
				type: "cash",
				effect: 1,
			});
		} else {
			vignettes.push({
				text: `a customer asked if ${he} masturbates, and seemed disappointed when ${he} answered honestly,`,
				type: "cash",
				effect: 0,
			});
		}
		if (App.Utils.hasNonassignmentSex(slave)) {
			vignettes.push({
				text: `a closeted female customer asked about ${his} sex life with other slaves, and was enthralled by ${his} answer,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.health.condition > 80) {
			vignettes.push({
				text: `a potential customer in the medical field was fascinated by ${his} health, and spent almost as much time examining ${him} as they did having sex with ${him},`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.health.tired > 60) {
			vignettes.push({
				text: `${he} was so tired ${he} fell asleep during sex, outraging the customer,`,
				type: "rep",
				effect: -2,
			});
			vignettes.push({
				text: `${he} was so tired ${he} fell asleep during sex, exciting a somnophiliac customer and earning repeat business,`,
				type: "cash",
				effect: 2,
			});
		}
		if (arcInfo.fsActive('FSHedonisticDecadence')) {
			if (slave.weight < 10) {
				vignettes.push({
					text: `${he} earned extra gratitude from a customer who misses ${boy}s without a spare tire around their middle,`,
					type: "cash",
					effect: 1,
				});
			} else if (slave.weight < 95) {
				vignettes.push({
					text: `a potential customer told ${him} that they are looking forward to patronizing ${him} once ${he} gains a lot more weight,`,
					type: "cash",
					effect: 0,
				});
			} else {
				vignettes.push({
					text: `${he} earned extra gratitude from a customer who loves them big and soft`,
					type: "cash",
					effect: 0,
				});
			}
			if (slave.weight > 30) {
				vignettes.push({
					text: `${he} earned extra gratitude from a customer who enjoyed the way ${his} middle jiggled as they fucked ${him},`,
					type: "cash",
					effect: 0,
				});
			}
		} else {
			if (slave.weight > 95) {
				vignettes.push({
					text: `a potential customer told ${him} that they are looking forward to patronizing ${him} once ${he} loses a lot of weight,`,
					type: "cash",
					effect: 0,
				});
			} else if (slave.weight > 30) {
				vignettes.push({
					text: `a potential customer told ${him} that they are looking forward to patronizing ${him} once ${he} loses some weight,`,
					type: "cash",
					effect: 0,
				});
			} else if (slave.weight <= -30) {
				vignettes.push({
					text: `a potential customer told ${him} that they are looking forward to patronizing ${him} once ${he} gains some weight,`,
					type: "cash",
					effect: 0,
				});
			} else if (slave.weight < -95) {
				vignettes.push({
					text: `a potential customer told ${him} that they are looking forward to patronizing ${him} once ${he} gains a lot of weight,`,
					type: "cash",
					effect: 0,
				});
			}
		}
		if (slave.drugs === "testicle enhancement") {
			vignettes.push({
				text: `${he} took it in public, with ${his} copious ejaculation getting ${him} another customer right away,`,
				type: "cash",
				effect: 1,
			});
		} else if (slave.drugs === "hyper testicle enhancement") {
			vignettes.push({
				text: `${he} bloated a female customer's belly with ${his} copious ejaculate, leading her to say she is looking forward to come back and get filled again,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.aphrodisiacs > 1 || slave.inflationType === "aphrodisiac") {
			vignettes.push({
				text: `${his} piteous begging for sex due to ${his} extreme aphrodisiac dosage turned a potential customer off,`,
				type: "cash",
				effect: -1,
			});
		}
		if (slave.inflationType === "aphrodisiac") {
			vignettes.push({
				text: `${his} piteous begging for sex coupled with ${his} bloated belly pleased a customer who loves desperate ${boy}s,`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `${his} piteous begging for sex coupled with ${his} bloated belly horrified a customer who didn't realize how low a ${boy} could stoop,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.addict > 50) {
			vignettes.push({
				text: `${he} zoned out badly due to a low point between aphrodisiac doses, disappointing a customer,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.bellyPreg >= 10000 || slave.bellyImplant >= 10000) {
			vignettes.push({
				text: `${he} earned repeat business from a customer who likes to do nothing more than cuddle with ${his} swollen belly,`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `a night with guy who likes rough, hard sex with heavily pregnant ${boy}s took its toll on ${him},`,
				type: "health",
				effect: -1,
			});
		}
		if (slave.bellyFluid >= 5000) {
			vignettes.push({
				text: `${he} earned repeat business from a customer who loved the way ${his} belly moved as they fucked ${him},`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `${he} disgusted a customer when their forceful fucking caused ${him} to release ${his} contained ${slave.inflationType} all over them,`,
				type: "rep",
				effect: -2,
			});
		}
		if ((slave.hormoneBalance >= 100 || slave.ballType === "sterile") && !canAchieveErection(slave)) {
			if (slave.dick > 0) {
				vignettes.push({
					text: `${he} disappointed a customer who was sure they could get ${slave.slaveName}'s cock erect,`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `${he} earned repeat business from a customer who seems unthreatened by ${his} soft dick,`,
					type: "cash",
					effect: 1,
				});
			}
		} else if (slave.hormoneBalance <= -100 && slave.dick === 0) {
			vignettes.push({
				text: `${he} earned repeat business from a female customer who adores the masculinity produced by ${slave.slaveName}'s hormone regime,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.dick > 0) {
			if (canPenetrate(slave)) {
				vignettes.push({
					text: `${he} earned repeat business from a customer who likes to see his wife get fucked by a dick${boy} whore,`,
					type: "cash",
					effect: 1,
				});
				if (slave.dick > 3) {
					vignettes.push({
						text: `${he} earned repeat business from a female customer who likes big stiff cocks, and cannot lie,`,
						type: "cash",
						effect: 1,
					});
					vignettes.push({
						text: `${he} irritated a male customer who brought his girlfriend with him by accidentally showing him up,`,
						type: "rep",
						effect: -1,
					});
				}
			}
			if (slave.scrotum === 0) {
				if (slave.genes === "XY") {
					if (canTalk(slave)) {
						vignettes.push({
							text: `a doctor ordered ${him} to describe the gelding process in detail and was fascinated by the small scars where ${his} balls used to be,`,
							type: "cash",
							effect: 1,
						});
					}
					vignettes.push({
						text: `a slave trainer privately studied ${him} as an example of a slave with well done gelding surgery,`,
						type: "cash",
						effect: 1,
					});
				}
				if (slave.balls > 0) {
					vignettes.push({
						text: `a customer was pleasantly surprised by ${his} ability to ejaculate,`,
						type: "cash",
						effect: 1,
					});
				}
			}
		}
		if (slave.scrotum > 3) {
			vignettes.push({
				text: `${he} loses a customer who wants ${him} to look like a natural girl, since ${his} balls are too big to be hidden,`,
				type: "cash",
				effect: -1,
			});
		}
		if (slave.scrotum > 0) {
			vignettes.push({
				text: `a particularly sadistic customer attempted to geld ${him}, but ${he} managed to fight him off,`,
				type: "health",
				effect: -1,
			});
		}
		if (slave.vagina >= 0) {
			if (slave.genes === "XY") {
				vignettes.push({
					text: `a plastic surgeon privately complimented ${him} on ${his} expertly crafted pussy,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (canDoVaginal(slave)) {
			if (slave.vagina === 1) {
				vignettes.push({
					text: `${he} got extra business from a customer who really likes ${him}, and wants to fuck ${his} pussy as much as possible while it's still tight,`,
					type: "cash",
					effect: 1,
				});
			} else if (slave.vagina > 2) {
				vignettes.push({
					text: `${he} disappointed a customer whose cock is just too small for ${his} big cunt,`,
					type: "rep",
					effect: -1,
				});
				if (slave.behavioralQuirk === "cutting" && slave.intelligence + slave.intelligenceImplant > 50) {
					vignettes.push({
						text: `${he} helped a customer discover a new fetish by making cutting remarks when their cock was too small for ${his} big cunt,`,
						type: "rep",
						effect: 1,
					});
				} else if (slave.behavioralFlaw === "bitchy") {
					vignettes.push({
						text: `${he} irritated a male customer with ${his} complaints that they were too small to please ${him},`,
						type: "rep",
						effect: -2,
					});
				}
			}
		}
		if (canDoAnal(slave)) {
			if (slave.anus === 1) {
				vignettes.push({
					text: `${he} got extra business from a customer who really likes ${his} butthole, and wants to fuck it as much as possible while it's still tight,`,
					type: "cash",
					effect: 1,
				});
			} else if (slave.anus > 2) {
				vignettes.push({
					text: `${he} disappointed a customer whose cock is just too small for ${his} loose butthole,`,
					type: "rep",
					effect: -1,
				});
			}
		}
		if (slave.visualAge > 40) {
			if (slave.face > 10 && slave.race === "asian") {
				vignettes.push({
					text: `${he} got repeat business from a customer who loves well-preserved Asian ladies,`,
					type: "cash",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${he} earned repeat business from a customer with serious mommy issues,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.face > 40) {
			vignettes.push({
				text: `${he} lost a potential customer who was so intimidated by ${his} great beauty that they decided to find a homelier whore,`,
				type: "cash",
				effect: -1,
			});
		} else if (slave.face < -10) {
			vignettes.push({
				text: `${he} earned repeat business from a customer who lacks self-confidence, and is more comfortable with homely whores,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.prestigeDesc === "$He was once a B-list actress, but fell on hard times and drug addiction and was recently enslaved due to debt.") {
			vignettes.push({
				text: `${he} humors one of ${his} fans by acting like one of the characters ${he} used to portray,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.lips > 70) {
			vignettes.push({
				text: `${he} earned repeat business from a customer who likes to play with ${his} lips nonsexually (don't ask),`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.piercing.lips.weight > 0) {
			vignettes.push({
				text: `${he} was highly recommended by a customer who liked the feeling of ${his} lip piercings on his cock,`,
				type: "cash",
				effect: 1,
			});
			if (slave.piercing.lips.weight > 1) {
				vignettes.push({
					text: `a customer's pubic hairs got snagged in ${his} lip piercings,`,
					type: "cash",
					effect: -1,
				});
			}
		}
		if (!canTalk(slave)) {
			vignettes.push({
				text: `${he} impressed a customer who didn't know how relaxing a ${boy} who can't talk could be,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.muscles > 95) {
			vignettes.push({
				text: `${he} impressed a customer who was so eager to share workout plans with ${him} that they almost forgot to have sex with ${him},`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `${he} gained repeat business from a female customer who likes a ${boy} who can bench-press her before and after they fuck,`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `${he} disappointed a customer by accidentally revealing that ${he}'s considerably stronger than them,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.lactation > 0) {
			vignettes.push({
				text: `${he} was well compensated for providing fresh milk for the coffee served at a customer's business meeting,`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `${he} served as a conveniently lactating whore near a trendy arcology coffeehouse,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.boobs >= 1800) {
			if (slave.fetish === "boobs") {
				vignettes.push({
					text: `${his} huge boobs and frequent orgasms from titfucks made ${him} quite popular among locals,`,
					type: "cash",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${his} huge boobs attracted a lot of breast fetishists, to the point that ${he} lost count of how many titfucks ${he} had to perform,`,
				type: "cash",
				effect: 1,
			});
		}
		if (!canMove || (!canWalk(slave) && canMove(slave) && slave.rules.mobility === "restrictive")) {
			vignettes.push({
				text: `${his} lack of mobility severely hindered ${his} attempts to find customers,`,
				type: "cash",
				effect: -1,
			});
		} else {
			if (slave.boobs >= 1500 && slave.boobsImplant === 0) {
				vignettes.push({
					text: `a young customer hired ${him} to jump rope so they could watch ${his} massive natural breasts flop around,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (isAmputee(slave)) {
			vignettes.push({
				text: `${he} disappointed a customer who thought they would enjoy fucking a quadruple amputee, but found it revolting,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 2) > 0) {
			vignettes.push({
				text: `a strange customer was excited by the sight of ${his} prosthetic limbs,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a customer was disgusted at the thought of ${his} basic prosthetic limbs,`,
				type: "rep",
				effect: -1,
			});
			vignettes.push({
				text: `a customer was put off by ${his} prosthetic limbs,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 3) > 0) {
			vignettes.push({
				text: `a customer was excited by ${his} vibrating fingertips,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a customer was indifferent to the thought of having sex with a slave with artificial limbs,`,
				type: "cash",
				effect: 0,
			});
			vignettes.push({
				text: `a customer was put off by ${his} crude artificial limbs,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 4) > 0) {
			vignettes.push({
				text: `a strange customer was excited by the sight of ${his} artificial limbs,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a customer was indifferent to the thought of having sex with a slave with artificial limbs,`,
				type: "cash",
				effect: 0,
			});
			vignettes.push({
				text: `a customer was put off by the sight of ${his} prosthetic limbs,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 5) > 0) {
			vignettes.push({
				text: `a customer was excited by the thought of having sex with a slave with p-limbs, but was scared off by ${his} combat p-limbs,`,
				type: "cash",
				effect: -1,
			});
			vignettes.push({
				text: `a customer was indifferent to the thought of having sex with a slave with artificial limbs,`,
				type: "cash",
				effect: 0,
			});
			vignettes.push({
				text: `a customer was greatly intimidated by ${his} combat p-limbs,`,
				type: "cash",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 6) > 0) {
			vignettes.push({
				text: `a customer was fascinated by ${his} cybernetic limbs, and spent almost as much time examining them as they did having sex with ${him},`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `a customer was excited by the thought of having sex with a cybernetically enhanced slave,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a customer was greatly intimidated by the sight of ${his} cybernetic limbs and was frightened away,`,
				type: "cash",
				effect: -1,
			});
		}
		if (slave.heels === 1 && shoeHeelCategory(slave) === 0) {
			vignettes.push({
				text: `${he} enticed a new customer who had never really considered buttsex before they saw ${him} crawling along with ${his} asshole vulnerable,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.chastityVagina === 1) {
			vignettes.push({
				text: `a wavering customer who was disappointed that ${his} pussy was unavailable decided to try ${his} mouth instead,`,
				type: "cash",
				effect: 1,
			});
			if (slave.chastityAnus !== 1) {
				vignettes.push({
					text: `a wavering customer who was disappointed that ${his} pussy was unavailable decided to try ${his} ass instead,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (slave.collar === "shock punishment") {
			vignettes.push({
				text: `a customer discovered that the remote control for his video screen also worked on ${his} shock collar,`,
				type: "trust",
				effect: -1,
			});
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			vignettes.push({
				text: `a customer really enjoyed being able to treat ${him} however they liked without eliciting a reaction,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.race === "catgirl" && V.seeCats === 1) {
			vignettes.push({
				text: `a customer was excited by ${his} feline nature and spent most of the week fucking ${him},`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `a customer was intimidated by ${his} catlike nature and sharp fangs and canceled their appointment,`,
				type: "cash",
				effect: -1,
			});
		}
		if (slave.intelligence + slave.intelligenceImplant < -50) {
			vignettes.push({
				text: `a customer managed to trick ${him} into fucking him without payment,`,
				type: "cash",
				effect: -1,
			});
			vignettes.push({
				text: `a customer managed to trick ${him} into accepting a bag of 'magic beans' instead of regular payment,`,
				type: "cash",
				effect: -1,
			});
		}
		if (slave.accent > 2) {
			vignettes.push({
				text: `a wealthy foreign tourist was so glad to hear somebody speaking his native language that he hired ${him} for the whole week,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.face > 10 && canDoAnal(slave)) {
			if (slave.dick > 0) {
				if (slave.fetish === "buttslut" && jsRandom(0, 100) < 50) {
					vignettes.push({
						text: `a customer was surprised by ${his} penis, so ${he} hid it and enjoyed the buttsex without touching it,`,
						type: "rep",
						effect: 1,
					});
				} else if (slave.skill.anal >= 100) {
					vignettes.push({
						text: `a customer was surprised by ${his} penis, so ${he} hid it and skillfully pretended to be a real girl,`,
						type: "rep",
						effect: 1,
					});
				} else if (slave.fetish === "buttslut") {
					vignettes.push({
						text: `a customer was surprised by ${his} penis, so ${he} hid it, but could barely tolerate anal without touching it,`,
						type: "rep",
						effect: -1,
					});
				}
			}
			if (slave.skill.anal < 100 && slave.anus > 2) {
				vignettes.push({
					text: `a pair of customers enticed by ${his} beauty but disappointed by ${his} loose butthole doubled up on ${his} poor anus without mercy,`,
					type: "health",
					effect: -1,
				});
			}
		}
		if (slave.fetishKnown === 1 && slave.fetishStrength > 95) {
			if (slave.fetish === "buttslut" || slave.fetish === "dom") {
				vignettes.push({
					text: `${he} advertised ${himself} by forcing a slave in the stocks to eat ${his} ass, drumming up business,`,
					type: "cash",
					effect: 1,
				});
			} else if (slave.fetish === "masochist") {
				vignettes.push({
					text: `${he} cooperated with a citizen who wanted to whip ${his} tits black and blue,`,
					type: "health",
					effect: -1,
				});
			}
		}
		if (slave.health.condition < 20) {
			vignettes.push({
				text: `${he} attracted the attention of a slaveowner alarmed by ${his} poor health, and thought they seemed kind,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (slave.skill.vaginal >= 100) {
			vignettes.push({
				text: `${he} was hired to apply ${his} skills to a customer's virgin son,`,
				type: "devotion",
				effect: 0,
			});
		}
		if (slave.skill.penetrative >= 100) {
			vignettes.push({
				text: `${he} was hired by a group of girls to painlessly deflower one of them,`,
				type: "rep",
				effect: 0,
			});
		}
		if (canDoAnal(slave) && slave.skill.anal < 100 && slave.anus < 2) {
			vignettes.push({
				text: `a guy with a huge cock paid for the right to fuck ${him} in ${his} tight ass all night,`,
				type: "health",
				effect: -1,
			});
		}
		if (slave.relationship <= -2 && slave.intelligence + slave.intelligenceImplant <= 15) {
			vignettes.push({
				text: `${he} accidentally mentions how much ${he} loves you during intercourse with a customer who doesn't like to share,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.prestige > 0) {
			vignettes.push({
				text: `a college fraternity visiting the arcology for rush week hired ${him} for a gangbang,`,
				type: "cash",
				effect: 3,
			});
		}

		if (arcInfo.fsActive('FSSupremacist')) {
			if (slave.race === V.arcologies[0].FSSupremacistRace) {
				vignettes.push({
					text: `${he} lost a customer who couldn't bear to see a beautiful ${V.arcologies[0].FSSupremacistRace} be a whore,`,
					type: "cash",
					effect: -1,
				});
			}
			if (V.arcologies[0].FSSupremacistRace === "asian") {
				vignettes.push({
					text: `${he} was hired to be the special guest at a rather unconventional seijin-shiki celebration party,`,
					type: "cash",
					effect: 1,
				});
			} else if (V.arcologies[0].FSSupremacistRace === "semitic") {
				vignettes.push({
					text: `${he} was hired to be the special guest at a rather unconventional bar mitzvah celebration party,`,
					type: "cash",
					effect: 1,
				});
			} else if (V.arcologies[0].FSSupremacistRace === "white") {
				vignettes.push({
					text: `${he} was hired to be the special guest at a rather unconventional Jugendweihe celebration party,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSSubjugationist')) {
			if (slave.race === V.arcologies[0].FSSubjugationistRace) {
				vignettes.push({
					text: `${he} had a bad time in general, since most of ${his} customers didn't care about ${addA(V.arcologies[0].FSSubjugationistRace)} prostitute's health or well-being,`,
					type: "health",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSYouthPreferentialist')) {
			if (slave.visualAge > 35) {
				vignettes.push({
					text: `${he} got repeat business from a customer who wants to keep their MILF fetish in the closet,`,
					type: "cash",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
			if (slave.visualAge <= 20) {
				vignettes.push({
					text: `${he} got repeat business from a customer who wants to keep their fetish for young ${boy}s in the closet,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSGenderRadicalist')) {
			if (slave.dick.isBetween(0, 3)) {
				vignettes.push({
					text: `${he} got repeat business from a customer who is coming to terms with Gender Radicalism, and is unthreatened by ${his} little penis,`,
					type: "cash",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
			if (slave.visualAge > 25) {
				vignettes.push({
					text: `${he} got repeat business from a customer who thinks ${he} resembles their ex-wife, who would never let them fuck her butt,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSRepopulationFocus') || V.arcologies[0].FSRepopulationFocusSMR === 1) {
			if (slave.pregType > 1 && slave.pregKnown > 1 && slave.belly >= 10000) {
				vignettes.push({
					text: `${he} got repeat business from a customer who loves fucking ${boy}s with wombs filled by more than a single child,`,
					type: "cash",
					effect: 1,
				});
			}
			if (slave.preg > slave.pregData.normalBirth / 4 && slave.pregKnown > 1 && slave.bellyPreg >= 5000) {
				vignettes.push({
					text: `a customer loved ${his} pregnant belly so much that he came back for repeat business,`,
					type: "cash",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSRestart')) {
			if (canGetPregnant(slave)) {
				vignettes.push({
					text: `${he} got repeat business from a customer who misses the risk of getting a ${boy} pregnant,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSPaternalist')) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} got repeat business from a customer who likes to chat with intelligent prostitutes while fucking,`,
					type: "cash",
					effect: 1,
				});
			}
			if (slave.trust < -20) {
				vignettes.push({
					text: `a customer noticed ${his} fear and went out of his way to be gentle,`,
					type: "trust",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSDegradationist')) {
			if (V.seePee !== 0) {
				vignettes.push({
					text: `a drunken customer needing to use the toilet stumbled into ${him} and unfortunately decided to use ${his} mouth to empty ${his} bladder. ${slave.slaveName} found this interaction to be utterly revolting,`,
					type: "trust",
					effect: -1,
				});
			}
			if (canTalk(slave)) {
				if (slave.voice > 2) {
					vignettes.push({
						text: `${he} got repeat business from a customer who prefers ${boy}s with high-pitched screams,`,
						type: "cash",
						effect: 1,
					});
				} else if (slave.voice === 1) {
					vignettes.push({
						text: `a customer who was annoyed by ${his} deep voice used his belt on ${his} ass to see if ${his} voice got higher when ${he} screamed,`,
						type: "health",
						effect: -1,
					});
				}
				if (slave.boobs >= 1200) {
					vignettes.push({
						text: `"a group of laughing customers had ${him} moo like a cow while they gangbanged ${him},`,
						type: "cash",
						effect: 1,
					});
				}
				if (slave.weight >= 30) {
					vignettes.push({
						text: `a customer had ${him} grunt and squeal like a pig while he used ${him},`,
						type: "cash",
						effect: 1,
					});
				}
				vignettes.push({
					text: `a customer ordered ${him} to tell bystanders that ${he} was a 'stupid and ugly bitch',`,
					type: "trust",
					effect: 0,
				});
			}
			if (slave.dick > 0) {
				if (slave.scrotum === 0 && slave.genes === "XY") {
					vignettes.push({
						text: `a customer asked why ${his} useless dick wasn't removed along with ${his} balls,`,
						type: "cash",
						effect: 0,
					});
					vignettes.push({
						text: `a customer hit ${his} dick a few times to see if gelding reduces sensitivity,`,
						type: "health",
						effect: -1,
					});
					vignettes.push({
						text: `an approving customer commented that being gelded made it plain ${he} wasn't human,`,
						type: "rep",
						effect: 1,
					});
				}
				vignettes.push({
					text: `a customer tried to see how far ${his} dick could bend and twist,`,
					type: "health",
					effect: -1,
				});
			}
			if (slave.visualAge > 40) {
				vignettes.push({
					text: `a customer wrote a note on ${his} face that said: 'Retire it to an arcade',`,
					type: "trust",
					effect: -1,
				});
			}
			vignettes.push({
				text: `a rich customer had fun seeing how much money he could cram in ${his} holes without using any lube,`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `a displeased customer grabbed a permanent marker and wrote a critique of ${his} sex skills on ${his} chest,`,
				type: "rep",
				effect: -1,
			});
			vignettes.push({
				text: `two sadistic customers had fun roughing ${him} up,`,
				type: "health",
				effect: -1,
			});
			vignettes.push({
				text: `${he} was hired for use as a prop in a public service announcement showing citizens how to restrain an unwilling slave for rape,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a sex machine salesman hired ${him} to demonstrate his products and fucked ${his} holes brutally,`,
				type: "health",
				effect: -1,
			});
		}
		if (arcInfo.fsActive('FSBodyPurist')) {
			if (slave.boobsImplant > 0) {
				vignettes.push({
					text: `${he} got repeat business from a customer who wants to keep their fetish for breast implants in the closet,`,
					type: "cash",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSTransformationFetishist')) {
			if (slave.boobsImplant === 0) {
				vignettes.push({
					text: `${he} got repeat business from a customer who wants to keep their fetish for natural breasts in the closet,`,
					type: "cash",
					effect: 1,
				});
			}
			if (slave.boobsImplant >= 500) {
				vignettes.push({
					text: `a photographer won an award for an artistic close-up of one of ${his} implant-heavy tits,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
			if (canTalk(slave) && slave.voice > 2) {
				vignettes.push({
					text: `${he} got repeat business from a customer who loves ${his} high-pitched squeals of pleasure,`,
					type: "cash",
					effect: 1,
				});
			}
			if (slave.boobs > 800) {
				vignettes.push({
					text: `${he} was publicly mocked as an ugly fat cow with dangling udders,`,
					type: "rep",
					effect: -1,
				});
			}
		} else if (arcInfo.fsActive('FSAssetExpansionist')) {
			if (slave.boobs < 300) {
				vignettes.push({
					text: `${he} got repeat business from a customer who wants to keep their fetish for flat chested ${boy}s in the closet,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSPastoralist')) {
			if (slave.lactation === 0) {
				vignettes.push({
					text: `${he} lost a customer who could not understand why nothing was coming out of ${his} nipples when they sucked on them,`,
					type: "cash",
					effect: -1,
				});
			} else {
				vignettes.push({
					text: `a businessman asked to hire ${him} for an hour for a meeting so ${he} could provide 'freshly squeezed' milk for his client's coffee,`,
					type: "cash",
					effect: 2,
				});
				vignettes.push({
					text: `${he} was hired by a trendy café in the arcology so the customers could milk ${him} into their coffees,`,
					type: "cash",
					effect: 2,
				});
			}
			if (slave.nipples === "fuckable" || slave.nipples === "flat") {
				vignettes.push({
					text: `${he} lost a customer who refused to believe ${he} could possibly be a proper cow with nipples like ${hers},`,
					type: "cash",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSPhysicalIdealist')) {
			if (slave.muscles <= 95 && hasAnyArms(slave)) {
				vignettes.push({
					text: `${he} lost a customer who could barely believe that ${he} wasn't capable of holding ${himself} in a handstand,`,
					type: "cash",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSIntellectualDependency')) {
			if (slave.energy < 70) {
				vignettes.push({
					text: `${he} was called a dead fish by an irate customer unsatisfied by ${his} libido,`,
					type: "trust",
					effect: -1,
				});
			}
			if (slave.intelligence + slave.intelligenceImplant < -50) {
				vignettes.push({
					text: `a gameshow host asked to hire ${him} for a taping so ${he} could provide comedic relief when compared to the actual contestants,`,
					type: "cash",
					effect: 2,
				});
			}
		} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
			if (slave.intelligence + slave.intelligenceImplant > 95) {
				vignettes.push({
					text: `${he} got repeat business from a customer that wanted to continue their post-coital conversation,`,
					type: "cash",
					effect: 2,
				});
			} else if (slave.intelligence + slave.intelligenceImplant <= 10 && canTalk(slave)) {
				vignettes.push({
					text: `a customer complained about the idiotic statements that kept leaving ${his} mouth,`,
					type: "rep",
					effect: -1,
				});
			}
			if (canTalk(slave) && slave.accent > 1) {
				vignettes.push({
					text: `${he} was publicly ridiculed for not being able to properly speak,`,
					type: "rep",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSStatuesqueGlorification')) {
			if (!heightPass(slave)) {
				vignettes.push({
					text: `${he} lost a customer who refused to be seen with such a short bitch,`,
					type: "cash",
					effect: -1,
				});
				vignettes.push({
					text: `${he} got repeat business from a hungry customer with a taste for short ${boy}s,`,
					type: "cash",
					effect: 2,
				});
			} else if (slave.height >= 230) {
				vignettes.push({
					text: `${he} lost a customer who was so intimidated by ${his} height that they couldn't get aroused,`,
					type: "cash",
					effect: -1,
				});
				vignettes.push({
					text: `${he} got repeat business from a customer ecstatic to finally fuck someone taller than themself,`,
					type: "cash",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
			if (heightPass(slave)) {
				vignettes.push({
					text: `${he} got repeat business from a customer whose crotch was the perfect height for ${his} mouth,`,
					type: "cash",
					effect: 1,
				});
				vignettes.push({
					text: `${he} got used as a foot rest by a customer while they enjoyed taller fair,`,
					type: "health",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSChattelReligionist')) {
			if (slave.behavioralFlaw === "devout") {
				vignettes.push({
					text: `${he} got repeat business from a customer who desperately wants their cock to be the one that converts ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSRomanRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Roman mythology attracted a large crowd near ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSNeoImperialist')) {
				vignettes.push({
					text: `a street preacher arguing that your new Imperium is the natural evolution of Western society after the collapse of the old world attracted a large crowd near ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSAztecRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Aztec mythology attracted a large crowd near ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSEgyptianRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Egyptian mythology attracted a large crowd near ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSArabianRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Sunni Islam attracted a large crowd near ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSEdoRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Shintoism attracted a large crowd near ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSChineseRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Chinese folk religion attracted a large crowd near ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSAntebellumRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion is the natural theological evolution of Protestant Christianity attracted a large crowd near ${him},`,
					type: "cash",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSSupremacist')) {
				if (V.arcologies[0].FSSupremacistRace === "asian") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Buddhism attracted a large crowd near ${him},`,
						type: "cash",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "indo-aryan") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Hinduism attracted a large crowd near ${him},`,
						type: "cash",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "latina" || V.arcologies[0].FSSupremacistRace === "southern european") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Roman Catholicism attracted a large crowd near ${him},`,
						type: "cash",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "middle eastern") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Islam attracted a large crowd near ${him},`,
						type: "cash",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "semitic") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Judaism attracted a large crowd near ${him},`,
						type: "cash",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "white") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Norse mythology attracted a large crowd near ${him},`,
						type: "cash",
						effect: 1,
					});
				}
			}
		}
		if (arcInfo.fsActive('FSRomanRevivalist')) {
			if (slave.race === "white" && slave.height >= 185) {
				vignettes.push({
					text: `${he} attracted a customer who thought ${his} appearance worthy of a lusty northern barbarian,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSNeoImperialist')) {
			if (slave.face > 60) {
				vignettes.push({
					text: `${he} received extra attention from one of your Barons who claimed ${him} to be 'fair enough for a Noble's eyes' and paid extra,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSAztecRevivalist')) {
			if (slave.devotion > 75 && slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} indulged a citizen by following a fertility ritual completely,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSEgyptianRevivalist')) {
			vignettes.push({
				text: `${he} got extra business from a group of citizens competing to get off with whores of each of the arcology's ethnic groups in the least time,`,
				type: "cash",
				effect: 1,
			});
		}
		if (arcInfo.fsActive('FSEdoRevivalist')) {
			if (slave.face > 40 && slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} got repeat business from a customer who wished to do nothing more than converse with a beautiful and intelligent ${boy},`,
					type: "cash",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${he} was hired to be the special guest at a rather unconventional genpuku celebration party,`,
				type: "cash",
				effect: 1,
			});
		}
		if (arcInfo.fsActive('FSArabianRevivalist')) {
			if (slave.skill.entertainment >= 100 && canTalk(slave) && slave.accent < 2) {
				vignettes.push({
					text: `${he} got repeat business from a customer who prefers prostitutes who can tell lovely stories,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSChineseRevivalist')) {
			if (slave.dick > 0 && slave.balls === 0) {
				vignettes.push({
					text: `a citizen admired ${his} lack of balls and praised ${him} for being like the eunuchs in Chinese history,`,
					type: "cash",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${he} was hired to be the special guest at a rather unconventional Guan Li celebration party,`,
				type: "cash",
				effect: 1,
			});
		}
		if (arcInfo.fsActive('FSAntebellumRevivalist')) {
			if (slave.devotion > 75 && slave.sexualQuirk === "romantic") {
				vignettes.push({
					text: `${he} received a generous tip from a gentleman infatuated with ${him},`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (V.seeAge !== 0) {
			if (slave.birthWeek >= 51) {
				if (arcInfo.fsActive('FSDegradationist')) {
					if (slave.voice !== 0) {
						vignettes.push({
							text: `a group of frat boys found out it was ${his} birthday and took turns spanking ${him} until ${he} couldn't sit down and ${his} voice was hoarse,`,
							type: "health",
							effect: -1,
						});
					}
					vignettes.push({
						text: `${he} was given a paddle and ordered to request harsh birthday spankings from all of ${his} customers,`,
						type: "health",
						effect: -1,
					});
				}
				vignettes.push({
					text: `a favorite customer gave ${him} a lighthearted birthday spanking and a big tip,`,
					type: "cash",
					effect: 1,
				});
			}
			if (slave.geneticQuirks.neoteny === 2 && slave.visualAge < V.minimumSlaveAge && slave.assignment === window.Job.WHORE) {
				vignettes.push({
					text: `a passing tourist thought ${he} was a wayward child and gave ${him} some candy,`,
					type: "devotion",
					effect: 0,
				});
			}
		}
		vignettes.push({
			text: `a visiting tourist got a crush on ${him} and gave ${him} repeat business,`,
			type: "cash",
			effect: 1,
		});
		vignettes.push({
			text: `a prominent citizen rented ${him} for his birthday party,`,
			type: "cash",
			effect: 1,
		});
		vignettes.push({
			text: `one of the companies with an office in your arcology retained ${him} for a team-building bukkake party for its employees,`,
			type: "rep",
			effect: 1,
		});
		vignettes.push({
			text: `a man dragged his crying wife along so she could watch him fuck a whore,`,
			type: "rep",
			effect: 0,
		});
		if (V.seeDicks !== 100) {
			vignettes.push({
				text: `a woman dragged her angry husband along so he could watch her get eaten out by a whore,`,
				type: "rep",
				effect: 0,
			});
		} else {
			vignettes.push({
				text: `a man dragged his angry lover along so he could watch him get sucked off by a whore,`,
				type: "rep",
				effect: 0,
			});
		}
		vignettes.push({
			text: `${he} went to sleep after being sold for sex all day, and had a dream about you loving ${him},`,
			type: "devotion",
			effect: 1,
		});
		vignettes.push({
			text: `${he} went to sleep after being sold for sex all day, and had a dream about you letting a customer hurt ${him},`,
			type: "devotion",
			effect: -1,
		});
		vignettes.push({
			text: `${he} went to sleep after being sold for sex all day, and had a dream about you protecting ${him} from a mean customer,`,
			type: "trust",
			effect: 1,
		});
		vignettes.push({
			text: `${he} went to sleep after being sold for sex all day, and had a dream about you selling ${him} for good,`,
			type: "trust",
			effect: -1,
		});
	} else if (slave.assignment === Job.PUBLIC || slave.assignment === Job.CLUB || slave.assignment === Job.DJ) {
		let seed = jsRandom(1, 10);
		switch (seed) {
			case 1:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} witnessed a domestic dispute over another slut,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 2:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} saw an aphrodisiac addict ${he} knew sell herself into slavery,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 3:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} had to move to follow the <span class="green">most prominent citizens</span> to a newly fashionable hall,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 4:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that a citizen used a new and improved sex toy on ${him},`,
					type: "rep",
					effect: 0,
				});
				break;
			case 5:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was being used in public by an incestuous pair of citizens,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 6:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} saw a notorious slut come of age and start swapping anal for aphrodisiacs,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 7:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} saw a citizen experiment with lesbian sex for the first time, in public,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 8:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} watched a citizen descend into aphrodisiac addiction,`,
					type: "rep",
					effect: 0,
				});
				break;
			case 9:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} watched a citizen develop the beginnings of sex addiction,`,
					type: "rep",
					effect: 0,
				});
				break;
			default:
				vignettes.push({
					text: `the most interesting thing that happened to ${him} at work was that ${he} witnessed a citizen using a public slut so brutally that they had to pay compensation afterward,`,
					type: "rep",
					effect: 0,
				});
				break;
		}
		seed = jsRandom(1, 5);
		switch (seed) {
			case 1:
				vignettes.push({
					text: `a citizen punished one of his slaves by tying her up in public near where ${slave.slaveName} was serving as a public slut. This made ${him} less popular that day,`,
					type: "rep",
					effect: -1,
				});
				break;
			case 2:
				vignettes.push({
					text: `a citizen shared one of his slaves with the public near where ${slave.slaveName} was serving as a public slut. This made ${him} less popular that day,`,
					type: "rep",
					effect: -1,
				});
				break;
			case 3:
				vignettes.push({
					text: `a private brothel offered a promotion near where ${slave.slaveName} was serving as a public slut. This made ${him} less popular that day,`,
					type: "rep",
					effect: -1,
				});
				break;
			case 4:
				vignettes.push({
					text: `some free sluts threw an aphrodisiac street party near where ${slave.slaveName} was serving as a public slut. This made ${him} less popular that day,`,
					type: "rep",
					effect: -1,
				});
				break;
			default:
				vignettes.push({
					text: `a contract breaker was punished with the pillory near where ${slave.slaveName} was serving as a public slut. This made ${him} less popular that day,`,
					type: "rep",
					effect: -1,
				});
				break;
		}
		seed = jsRandom(1, 5);
		switch (seed) {
			case 1:
				vignettes.push({
					text: `one of ${his} regular patrons got a divorce and came to ${him} for repeated consolation,`,
					type: "rep",
					effect: 1,
				});
				break;
			case 2:
				vignettes.push({
					text: `a club near where ${slave.slaveName} usually works had business trouble,`,
					type: "rep",
					effect: 1,
				});
				break;
			case 3:
				vignettes.push({
					text: `a competing slut that looks like ${him} fell ill, driving a patron to look for an alternative,`,
					type: "rep",
					effect: 1,
				});
				break;
			case 4:
				vignettes.push({
					text: `a street slut that works near ${him} was badly beaten by an abusive citizen and had to take time off. The reduced competition got ${him} more attention,`,
					type: "rep",
					effect: 1,
				});
				break;
			default:
				vignettes.push({
					text: `an influx of tourists came into ${his} part of the arcology, earning ${him} more business for a day,`,
					type: "rep",
					effect: 1,
				});
				break;
		}

		if (slave.fetishKnown === 1) {
			switch (slave.fetish) {
				case "submissive":
					vignettes.push({
						text: `${he} deeply impressed a citizen with ${his} sincere submission to them,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} lost a patron who secretly wanted ${him} to show a little initiative,`,
						type: "rep",
						effect: -1,
					});
					vignettes.push({
						text: `an overeager sadistic customer roughed ${him} up more than a normal submissive like ${him} is used to,`,
						type: "health",
						effect: -1,
					});
					break;
				case "cumslut":
					vignettes.push({
						text: `${he} deeply impressed a citizen with ${his} hunger for their cum,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disgusted a citizen who didn't know how much cum fetishes revolted them until ${he} displayed ${hers},`,
						type: "rep",
						effect: -1,
					});
					vignettes.push({
						text: `${he} was unable to contain ${himself} and wasted a lot of time sucking the cum from other slaves' sloppy holes,`,
						type: "rep",
						effect: -1,
					});
					break;
				case "humiliation":
					vignettes.push({
						text: `${he} earned extra gratitude from a citizen who didn't know how much they liked public sex until ${he} got them to try it,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disgusted a citizen who didn't know how much exhibitionism turned them off until they tried public sex with ${him},`,
						type: "rep",
						effect: -1,
					});
					break;
				case "buttslut":
					if (canDoAnal(slave)) {
						vignettes.push({
							text: `${he} earned extra gratitude from a citizen who didn't know how much they liked fucking buttholes until ${he} got them to try fucking ${hers},`,
							type: "rep",
							effect: 1,
						});
						vignettes.push({
							text: `${he} disgusted a citizen who didn't know how much buttsex turned them off until ${he} got them to try fucking ${his} ass,`,
							type: "rep",
							effect: -1,
						});
					}
					if (slave.butt >= 3) {
						vignettes.push({
							text: `${he} earned extra gratitude from a citizen who didn't know how much they liked big butts until ${he} gave them a lap dance they'll never forget,`,
							type: "rep",
							effect: 1,
						});
					}
					if (slave.behavioralFlaw === "arrogant") {
						vignettes.push({
							text: `${he} wanted it in the ass so much ${he} annoyed more than a few citizens by demanding anal,`,
							type: "rep",
							effect: -1,
						});
					}
					vignettes.push({
						text: `${he} earned extra gratitude from a citizen who appreciated a nice rear, even if it is off limits,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disgusted a citizen who didn't know how much butts turned them off until he put his hands on ${hers},`,
						type: "rep",
						effect: -1,
					});
					break;
				case "boobs":
					vignettes.push({
						text: `${he} deeply impressed a citizen by orgasming to nothing but the feeling of them sucking ${his} nipples,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disappointed a female citizen who didn't know how uninterested she was in nipple play before trying it,`,
						type: "rep",
						effect: -1,
					});
					if (slave.nipples === "fuckable") {
						vignettes.push({
							text: `${he} left a lasting impression on a pair of citizens after nearly passing out from a series of intense orgasms from getting ${his} nipples fucked,`,
							type: "rep",
							effect: 2,
						});
					}
					break;
				case "sadist":
					vignettes.push({
						text: `${he} deeply impressed a citizen who brought their own slave to ${him} for abuse with ${his} sadism,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `a citizen brought ${him} their own slave to abuse, but the sight proved to be a turn off,`,
						type: "rep",
						effect: -1,
					});
					break;
				case "masochist":
					vignettes.push({
						text: `${he} helped a citizen discover a new fetish by orgasming when they accidentally hurt ${him},`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disturbed a citizen who accidentally hurt ${him} by orgasming,`,
						type: "rep",
						effect: -1,
					});
					vignettes.push({
						text: `a group of overzealous citizens gangbanging ${him} got a little too excited hearing ${him} get off on abuse, leaving ${him} sore and injured,`,
						type: "health",
						effect: -1,
					});
					break;
				case "dom":
					vignettes.push({
						text: `${he} made a female citizen ${his} bitch. Fortunately, the citizen wanted to be ${his} bitch and came back for more`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} accidentally overwhelmed a citizen with ${his} sexual dominance,`,
						type: "rep",
						effect: -1,
					});
					break;
				case "pregnancy":
					vignettes.push({
						text: `${he} earned extra gratitude from a citizen who didn't know how much they liked pregnancy play until ${he} begged them to knock ${him} up,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} disgusted a citizen who didn't know how much pregnancy play turned them off until ${he} begged them to knock ${him} up,`,
						type: "rep",
						effect: -1,
					});
					break;
			}
		}
		switch (slave.behavioralFlaw) {
			case "arrogant":
				vignettes.push({
					text: `${he} managed to give a citizen the impression ${he} thinks ${himself} better than them,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "bitchy":
				vignettes.push({
					text: `${he} made an emasculating remark to a citizen right after they fucked ${him},`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `${he} was slapped by a citizen who was angry at ${his} rude remarks,`,
					type: "health",
					effect: -1,
				});
				break;
			case "odd":
				vignettes.push({
					text: `${he} infuriates a potential citizen with ${his} nervous tics,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "hates men":
				vignettes.push({
					text: `${his} disgust towards men surfaces at a bad time, angering a male citizen,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "hates women":
				vignettes.push({
					text: `${his} disgust towards women surfaces at a bad time, angering a female citizen,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "gluttonous":
				vignettes.push({
					text: `${he} accidentally lingers at a meal, missing an appointment with a citizen,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "anorexic":
				vignettes.push({
					text: `${his} bulimia surfaces at an extremely inopportune moment, turning a citizen off,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "devout":
				vignettes.push({
					text: `a citizen catches ${him} praying to ${himself} as they inserted themselves into ${him}, turning them off,`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `${he} tried to preach ${his} faith to a citizen, causing him to leave in a huff,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "liberated":
				vignettes.push({
					text: `${he} treats a rude citizen impolitely, because ${he} thinks that's fair,`,
					type: "rep",
					effect: -1,
				});
				break;
		}
		switch (slave.sexualFlaw) {
			case "hates oral":
				vignettes.push({
					text: `${he} vomits while trying to deepthroat a citizen,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "hates anal":
				vignettes.push({
					text: `${he} cries while taking anal from a citizen who isn't into painal,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "hates penetration":
				vignettes.push({
					text: `${he} cries while taking a pounding from a citizen who likes their sex consensual,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "shamefast":
				vignettes.push({
					text: `${he} cries while a citizen looks ${him} over,`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `${he} disrobed so slowly that a horny citizen gave up on ${him},`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `a citizen impatient with how slowly ${he} was disrobing ripped off ${his} clothes and roughed ${him} up,`,
					type: "health",
					effect: -1,
				});
				break;
			case "idealistic":
				vignettes.push({
					text: `${he} cries when explaining to a citizen that sex with ${him} is free,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "repressed":
				vignettes.push({
					text: `${he} misunderstands a citizen's lewd requests, turning them off,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "apathetic":
				vignettes.push({
					text: `${he} fails to notice when a citizen achieves orgasm,`,
					type: "rep",
					effect: -1,
				});
				break;
			case "neglectful":
				vignettes.push({
					text: `${he} brings a denial fetishist to orgasm three times without cumming ${himself}, impressing them completely,`,
					type: "rep",
					effect: 3,
				});
				break;
			case "cum addict":
				vignettes.push({
					text: `${he}'s so focused on sucking down a client's cum that ${he} managed to drive them to repeated orgasm, earning their admiration once the feeling returns to their legs,`,
					type: "rep",
					effect: 3,
				});
				break;
			case "anal addict":
				vignettes.push({
					text: `${he} took an awe inspiring train of dicks in ${his} ass, well past the point where most would have passed out from pain,`,
					type: "rep",
					effect: 3,
				});
				break;
			case "attention whore":
				vignettes.push({
					text: `${he} earned extra gratitude by drawing attention to a savvy businessman from their superiors,`,
					type: "rep",
					effect: 3,
				});
				break;
			case "breast growth":
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who never realized breast growth turned them on so much,`,
					type: "rep",
					effect: 3,
				});
				break;
			case "abusive":
				vignettes.push({
					text: `${he} abuses a rival public servant so viciously that a catfight lover took ${him} right there,`,
					type: "rep",
					effect: 3,
				});
				break;
			case "malicious":
				vignettes.push({
					text: `${he} earned extra gratitude from a masochist who loved the way ${he} traced ${his} scars, and added some new ones,`,
					type: "rep",
					effect: 3,
				});
				break;
			case "self hating":
				vignettes.push({
					text: `the way ${he} took everything thrown at ${him} like nothing disturbed a group of citizens, though one of them enjoyed it more than they let on and came to ${him} for sex later,`,
					type: "rep",
					effect: 3,
				});
				break;
			case "breeder":
				vignettes.push({
					text: `${his} pregnancy obsession earned ${him} extra gratitude from a man with an intense pregnancy fetish,`,
					type: "rep",
					effect: 3,
				});
				break;
		}
		switch (slave.behavioralQuirk) {
			case "confident":
				vignettes.push({
					text: `${he} confidently pressed forward with a wavering citizen, and gets them to fuck ${him},`,
					type: "rep",
					effect: 1,
				});
				break;
			case "cutting":
				vignettes.push({
					text: `${he} made such a gloriously cutting remark to a male citizen that a female bystander took ${him} right there,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "funny":
				vignettes.push({
					text: `${he} made a group of citizens laugh so hard, one of them came to ${him} for sex later,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "fitness":
				vignettes.push({
					text: `${he} continued a marathon gangbang well past the point where most would have passed out,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "adores women":
				vignettes.push({
					text: `${he} struck up a personal friendship with a regular female patron,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `${he} adoringly kissed the feet of a local socialite who leaves ${him} a generous tip,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "adores men":
				vignettes.push({
					text: `${he} struck up a personal friendship with a regular male patron,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `${he} practically worshipped a minor celebrity, eagerly slobbering over his cock and covering ${himself} with his cum,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "insecure":
				vignettes.push({
					text: `${he} successfully convinced a regular patron that ${he}'s reliant on them emotionally,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "sinful":
				vignettes.push({
					text: `${he} helped a citizen get past their religious hang-ups through sex with the friendly neighborhood slut,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "advocate":
				vignettes.push({
					text: `${he} successfully convinced a wavering potential citizen that there's nothing wrong with banging a public slut,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `${he} managed to convince a skeptical businessman about the merits of using slaves,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `${his} enthusiastic discussion of the merits of slavery convinced a young woman to sell herself into slavery, so the new owner gave you a finder's fee,`,
					type: "cash",
					effect: 1,
				});
				break;
		}
		switch (slave.sexualQuirk) {
			case "gagfuck queen":
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who's obsessed with gagfucks,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "painal queen":
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who's obsessed with painal,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "strugglefuck queen":
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who's obsessed with strugglefucking,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "tease":
				vignettes.push({
					text: `${he} convinced a citizen who'd never had sex with a street slut to patronize ${him} with some truly inspired flirting,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `a few partiers were so impressed with ${his} provocative teasing that they repeated ${his} wit to friends,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `a few party-goers were so impressed with ${his} provocative teasing that they left ${him} a sizable tip,`,
					type: "cash",
					effect: 1,
				});
				break;
			case "romantic":
				vignettes.push({
					text: `a citizen became infatuated with ${him}, since they are convinced ${he}'s infatuated with them,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "perverted":
				vignettes.push({
					text: `${he} earned some momentary notoriety by engaging in a previously unheard-of sex act,`,
					type: "rep",
					effect: 1,
				});
				break;
			case "caring":
				vignettes.push({
					text: `${he} served as an impromptu sounding board for a citizen having marital trouble,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `a citizen was so enamored with ${his} kind and caring manner than they proposed to ${him} and offered to take ${him} away, and when ${he} refused, they urged a sizable tip on ${him},`,
					type: "cash",
					effect: 1,
				});
				break;
			case "unflinching":
				vignettes.push({
					text: `${he} had no trouble following extremely abusive orders from one of your citizens, making him talk positively about the experience,`,
					type: "rep",
					effect: 1,
				});
				break;
		}

		if (slave.counter.pitKills > 0) {
			vignettes.push({
				text: `${he} earned extra gratitude from a citizen obsessed with the fact that ${he}'s a killer,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.counter.oral > 500) {
			vignettes.push({
				text: `a citizen into degradation became obsessed with driving ${his} oral mileage as high as possible,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.counter.anal > 500 && slave.anus > 0) {
			vignettes.push({
				text: `a citizen into degradation became obsessed with driving ${his} anal mileage as high as possible,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.counter.vaginal > 500 && slave.vagina > 0) {
			vignettes.push({
				text: `a citizen into degradation became obsessed with driving ${his} pussy mileage as high as possible,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.race === "catgirl" && V.seeCats === 1) {
			vignettes.push({
				text: `a citizen was fascinated by ${his} feline traits and gave ${him} an intimate public examination,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a citizen mocked ${his} strange catlike features, making ${him} into a bullying target for a few hours,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.devotion > 95) {
			vignettes.push({
				text: `${he} really pushed ${himself} to please a citizen with tastes that disgusted ${him},`,
				type: "rep",
				effect: 1,
			});
		} else if (slave.devotion < -50) {
			vignettes.push({
				text: `${his} fury at being sold for sex turned a citizen off before they could fuck ${him},`,
				type: "rep",
				effect: -1,
			});
		} else if (slave.devotion <= 20) {
			vignettes.push({
				text: `${he} treasured a love token given to ${him} by a citizen ${he} fooled into thinking ${his} affection was real,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (slave.trust > 95) {
			vignettes.push({
				text: `${he} really pushed ${himself} to accept a citizen with tastes that frightened ${him},`,
				type: "rep",
				effect: 1,
			});
		} else if (slave.trust < -50) {
			vignettes.push({
				text: `${his} tearful terror at being forced to offer ${himself} for sex turned a citizen off before they could fuck ${him},`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.trust < -20) {
			vignettes.push({
				text: `a customer who fancies himself a slave trainer noticed ${his} fear and decided to use ${him} to practice his 'slave whispering' skills,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.rules.living === "luxurious") {
			vignettes.push({
				text: `${he} got a truly perfect night's sleep, which put ${him} in the right frame of mind for the whole day,`,
				type: "rep",
				effect: 1,
			});
		} else if (slave.rules.living === "spare") {
			if (canHear(slave)) {
				vignettes.push({
					text: `${he} got a poor night's sleep in the noisy dormitory, which took the shine off ${his} efforts for the whole day,`,
					type: "rep",
					effect: -1,
				});
			} else {
				vignettes.push({
					text: `the noise from the dormitory could not possibly disturb ${his} sleep, so ${he} got much better sleep than ${he} would have otherwise,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (slave.rules.release.masturbation === 1) {
			vignettes.push({
				text: `a citizen asked if ${he} masturbates, and then spent an hour jerking off as ${he} described how,`,
				type: "rep",
				effect: 1,
			});
		} else {
			vignettes.push({
				text: `a citizen asked if ${he} masturbates, and seemed disappointed when ${he} answered honestly,`,
				type: "rep",
				effect: 0,
			});
		}
		if (App.Utils.hasNonassignmentSex(slave)) {
			vignettes.push({
				text: `a closeted female citizen asked about ${his} sex life with other slaves, and was enthralled by ${his} answer,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.health.condition > 80) {
			vignettes.push({
				text: `a potential citizen in the medical field was fascinated by ${his} health, and spent almost as much time examining ${him} as they did having sex with ${him},`,
				type: "rep",
				effect: 1,
			});
		} else if (slave.health.condition < -35) {
			vignettes.push({
				text: `${he} attracted the attention of an alarmed slave-owner. He didn't know ${he} was owned, and offered to enslave ${him} so he could nurse ${him} back to health. ${He} considered it,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (arcInfo.fsActive('FSHedonisticDecadence')) {
			if (slave.weight < 10) {
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who misses ${boy}s without a spare tire around their middle,`,
					type: "rep",
					effect: 0,
				});
			} else if (slave.weight < 95) {
				vignettes.push({
					text: `a potential citizen told ${him} that they are looking forward to patronizing ${him} once ${he} gains a lot more weight,`,
					type: "rep",
					effect: 0,
				});
			} else {
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who loves them big and soft`,
					type: "rep",
					effect: 0,
				});
			}
			if (slave.weight > 30) {
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who enjoyed the way ${his} middle jiggled as they fucked ${him},`,
					type: "rep",
					effect: 0,
				});
			}
		} else {
			if (slave.weight > 95) {
				vignettes.push({
					text: `a potential citizen told ${him} that they are looking forward to patronizing ${him} once ${he} loses a lot of weight,`,
					type: "rep",
					effect: 0,
				});
			} else if (slave.weight > 30) {
				vignettes.push({
					text: `a potential citizen told ${him} that they are looking forward to patronizing ${him} once ${he} loses some weight,`,
					type: "rep",
					effect: 0,
				});
			} else if (slave.weight <= -30) {
				vignettes.push({
					text: `a potential citizen told ${him} that they are looking forward to patronizing ${him} once ${he} gains some weight,`,
					type: "rep",
					effect: 0,
				});
			} else if (slave.weight < -95) {
				vignettes.push({
					text: `a potential citizen told ${him} that they are looking forward to patronizing ${him} once ${he} gains a lot of weight,`,
					type: "rep",
					effect: 0,
				});
			}
		}
		if (slave.drugs === "testicle enhancement") {
			vignettes.push({
				text: `${he} took it in public, with ${his} copious ejaculation attracting more citizens,`,
				type: "rep",
				effect: 1,
			});
		} else if (slave.drugs === "hyper testicle enhancement") {
			vignettes.push({
				text: `${he} bloated a female citizen's belly with ${his} copious ejaculate, leading her to recommend your slaves for girls that want to look pregnant without actually getting pregnant,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.aphrodisiacs > 1 || slave.inflationType === "aphrodisiac") {
			vignettes.push({
				text: `${his} piteous begging for sex due to ${his} extreme aphrodisiac dosage turned a citizen off,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.inflationType === "aphrodisiac") {
			vignettes.push({
				text: `${his} piteous begging for sex coupled with ${his} bloated belly pleased a citizen who loves desperate sluts,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `${his} piteous begging for sex coupled with ${his} bloated belly horrified a citizen who didn't realize how low a ${boy} could stoop,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.addict > 50) {
			vignettes.push({
				text: `${he} zoned out badly due to a low point between aphrodisiac doses, disappointing a citizen,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.bellyPreg >= 10000 || slave.bellyImplant >= 10000) {
			vignettes.push({
				text: `${he} earned extra gratitude from a citizen who likes to do nothing more than cuddle with ${his} swollen belly,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a night with guy who likes rough, hard sex with heavily pregnant ${boy}s took its toll on ${him}`,
				type: "health",
				effect: -1,
			});
		}
		if (slave.bellyFluid >= 5000) {
			vignettes.push({
				text: `${he} earned extra gratitude from a citizen who loved the way ${his} belly sloshed and moved to their teasing,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `${he} disgusted a citizen when their forceful fucking caused ${him} to release ${his} contained ${slave.inflationType} all over them,`,
				type: "rep",
				effect: -2,
			});
		}
		if ((slave.hormoneBalance >= 100 || slave.ballType === "sterile") && !canAchieveErection(slave)) {
			if (slave.dick > 0) {
				vignettes.push({
					text: `${he} disappointed a citizen who was sure they could get ${slave.slaveName}'s cock erect,`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who seems unthreatened by ${his} soft dick,`,
					type: "rep",
					effect: 1,
				});
			}
		} else if (slave.hormoneBalance <= -100 && slave.dick === 0) {
			vignettes.push({
				text: `${he} earned extra gratitude from a female citizen who adores the masculinity produced by ${slave.slaveName}'s hormone regime,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.dick > 0) {
			if (canPenetrate(slave)) {
				vignettes.push({
					text: `${he} earned extra gratitude from a citizen who likes to see his wife get fucked by a dick${boy} whore,`,
					type: "rep",
					effect: 1,
				});
				if (slave.dick > 3) {
					vignettes.push({
						text: `${he} earned extra gratitude from a female citizen who likes big stiff cocks, and cannot lie,`,
						type: "rep",
						effect: 1,
					});
					vignettes.push({
						text: `${he} irritated a male citizen who brought his girlfriend with him by accidentally showing him up,`,
						type: "rep",
						effect: -1,
					});
				}
			}
			if (slave.scrotum === 0) {
				if (slave.genes === "XY") {
					if (canTalk(slave)) {
						vignettes.push({
							text: `a doctor ordered ${him} to describe the gelding process in detail and was fascinated by the small scars where ${his} balls used to be,`,
							type: "rep",
							effect: 1,
						});
					}
					vignettes.push({
						text: `a slave trainer pointed ${him} out as an example of a slave with well done gelding surgery,`,
						type: "rep",
						effect: 1,
					});
				}
				if (slave.balls > 0) {
					vignettes.push({
						text: `a citizen was pleasantly surprised by ${his} ability to ejaculate,`,
						type: "rep",
						effect: 1,
					});
				}
			}
		}
		if (slave.scrotum > 3) {
			vignettes.push({
				text: `${he} disappoints a citizen who wants ${him} to look like a natural girl, since ${his} balls are too big to be hidden,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.scrotum > 0) {
			vignettes.push({
				text: `a particularly sadistic citizen attempted to geld ${him}, but ${he} managed to fight him off,`,
				type: "health",
				effect: -1,
			});
		}
		if (slave.vagina >= 0) {
			if (slave.genes === "XY") {
				vignettes.push({
					text: `a plastic surgeon publicly complimented ${him} on ${his} expertly crafted pussy,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (canDoVaginal(slave)) {
			if (slave.vagina === 1) {
				vignettes.push({
					text: `${he} got extra attention from a citizen who really likes ${him}, and wants to fuck ${his} pussy as much as possible while it's still tight,`,
					type: "rep",
					effect: 1,
				});
			} else if (slave.vagina > 2) {
				vignettes.push({
					text: `${he} disappointed a citizen whose cock is just too small for ${his} big cunt,`,
					type: "rep",
					effect: -1,
				});
				if (slave.behavioralQuirk === "cutting" && slave.intelligence + slave.intelligenceImplant > 50) {
					vignettes.push({
						text: `${he} helped a citizen discover a new fetish by making cutting remarks when their cock was too small for ${his} big cunt,`,
						type: "rep",
						effect: 1,
					});
				} else if (slave.behavioralFlaw === "bitchy") {
					vignettes.push({
						text: `${he} irritated a male citizen with ${his} complaints that they were too small to please ${him},`,
						type: "rep",
						effect: -2,
					});
				}
			}
		}
		if (canDoAnal(slave)) {
			if (slave.anus === 1) {
				vignettes.push({
					text: `${he} got extra attention from a citizen who really likes ${his} butthole, and wants to fuck it as much as possible while it's still tight,`,
					type: "rep",
					effect: 1,
				});
			} else if (slave.anus > 2) {
				vignettes.push({
					text: `${he} disappointed a citizen whose cock is just too small for ${his} loose butthole,`,
					type: "rep",
					effect: -1,
				});
			}
		}
		if (slave.visualAge > 40) {
			if (slave.face > 10 && slave.race === "asian") {
				vignettes.push({
					text: `${he} got extra gratitude from a citizen who loves well-preserved asian ladies,`,
					type: "rep",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${he} earned extra gratitude from a citizen with serious mommy issues,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.face > 40) {
			vignettes.push({
				text: `${he} lost a potential citizen who was so intimidated by ${his} great beauty that they decided to find a homelier whore,`,
				type: "rep",
				effect: -1,
			});
		} else if (slave.face < -10) {
			vignettes.push({
				text: `${he} earned extra gratitude from a citizen who lacks self-confidence, and is more comfortable with homely whores,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.prestigeDesc === "$He was once a B-list actress, but fell on hard times and drug addiction and was recently enslaved due to debt.") {
			vignettes.push({
				text: `${he} humors one of ${his} fans by acting like one of the characters ${he} used to portray,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.lips > 70) {
			vignettes.push({
				text: `${he} earned extra gratitude from a citizen who likes to play with ${his} lips nonsexually (don't ask),`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.piercing.lips.weight > 0) {
			vignettes.push({
				text: `${he} was highly recommended by a citizen who liked the feeling of ${his} lip piercings on his cock,`,
				type: "rep",
				effect: 1,
			});
			if (slave.piercing.lips.weight > 1) {
				vignettes.push({
					text: `a citizen's pubic hairs got snagged in ${his} lip piercings,`,
					type: "rep",
					effect: -1,
				});
			}
		}
		if (!canTalk(slave)) {
			vignettes.push({
				text: `${he} impressed a citizen who didn't know how relaxing a ${boy} who can't talk could be,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.muscles > 95) {
			vignettes.push({
				text: `${he} impressed a citizen who was so eager to share workout plans with ${him} that they almost forgot to have sex with ${him},`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `${he} gained extra gratitude from a female citizen who likes a ${boy} who can bench-press her before and after they fuck,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `${he} disappointed a citizen by accidentally revealing that ${he}'s considerably stronger than him,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.lactation > 0) {
			vignettes.push({
				text: `${he} provided fresh milk for the coffee served at a citizen's business meeting,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `${he} provided fresh milk at a trendy arcology coffeehouse,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.boobs >= 1800) {
			if (slave.fetish === "boobs") {
				vignettes.push({
					text: `${his} huge boobs and frequent orgasms from titfucks made ${him} quite popular among locals,`,
					type: "cash",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${his} huge boobs attracted a lot of breast fetishists, to the point that ${he} lost count of how many titfucks ${he} had to perform,`,
				type: "rep",
				effect: 1,
			});
		}
		if (!canMove || (!canWalk(slave) && canMove(slave) && slave.rules.mobility === "restrictive")) {
			vignettes.push({
				text: `${his} lack of mobility severely hindered ${his} attempts to please citizens,`,
				type: "rep",
				effect: -1,
			});
		} else {
			if (slave.boobs >= 1500 && slave.boobsImplant === 0) {
				vignettes.push({
					text: `a young citizen convinced ${him} to jump rope so they could watch ${his} massive natural breasts flop around,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (isAmputee(slave)) {
			vignettes.push({
				text: `${he} disappointed a citizen who thought they would enjoy fucking a quadruple amputee, but found it revolting,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 2) > 0) {
			vignettes.push({
				text: `a strange citizen was excited by the sight of ${his} prosthetic limbs,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a citizen was disgusted at the thought of ${his} basic prosthetic limbs,`,
				type: "rep",
				effect: -1,
			});
			vignettes.push({
				text: `a citizen was put off by ${his} prosthetic limbs,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 3) > 0) {
			vignettes.push({
				text: `a citizen was excited by ${his} vibrating fingertips,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a citizen was indifferent to the thought of having sex with a slave with artificial limbs,`,
				type: "rep",
				effect: 0,
			});
			vignettes.push({
				text: `a citizen was put off by ${his} crude artificial limbs,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 4) > 0) {
			vignettes.push({
				text: `a strange citizen was excited by the sight of ${his} artificial limbs,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a citizen was indifferent to the thought of having sex with a slave with artificial limbs,`,
				type: "rep",
				effect: 0,
			});
			vignettes.push({
				text: `a citizen was put off by the sight of ${his} prosthetic limbs,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 5) > 0) {
			vignettes.push({
				text: `a citizen was excited by the thought of having sex with a slave with p-limbs, but was scared off by ${his} combat p-limbs,`,
				type: "rep",
				effect: -1,
			});
			vignettes.push({
				text: `a citizen was indifferent to the thought of having sex with a slave with artificial limbs,`,
				type: "rep",
				effect: 0,
			});
			vignettes.push({
				text: `a citizen was greatly intimidated by ${his} combat p-limbs,`,
				type: "rep",
				effect: -1,
			});
		}
		if (getLimbCount(slave, 6) > 0) {
			vignettes.push({
				text: `a citizen was fascinated by ${his} cybernetic limbs, and spent almost as much time examining them as they did having sex with ${him},`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a citizen was excited by the thought of having sex with a cybernetically enhanced slave,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a citizen was greatly intimidated by the sight of ${his} cybernetic limbs and was frightened away,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.heels === 1 && shoeHeelCategory(slave) === 0) {
			vignettes.push({
				text: `${he} enticed a new patron who had never really considered buttsex before they saw ${him} crawling along with ${his} asshole vulnerable,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.chastityVagina === 1) {
			vignettes.push({
				text: `a wavering citizen who was disappointed that ${his} pussy was unavailable decided to try ${his} mouth instead,`,
				type: "rep",
				effect: 1,
			});
			if (slave.chastityAnus !== 1) {
				vignettes.push({
					text: `a wavering citizen who was disappointed that ${his} pussy was unavailable decided to try ${his} ass instead,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (slave.collar === "shock punishment") {
			vignettes.push({
				text: `a citizen discovered that the remote control for his video screen also worked on ${his} shock collar,`,
				type: "trust",
				effect: -1,
			});
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			vignettes.push({
				text: `a citizen really enjoyed being able to treat ${him} however they liked without eliciting a reaction,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.intelligence + slave.intelligenceImplant < -50) {
			vignettes.push({
				text: `a low-class citizen who had no business fucking ${him} managed to trick ${him} into fucking him anyway,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.accent > 2) {
			vignettes.push({
				text: `a wealthy immigrant was so glad to hear somebody speaking his native language that he hired ${him} for the whole week,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.face > 10 && canDoAnal(slave)) {
			if (slave.dick > 0) {
				if (slave.fetish === "buttslut" && jsRandom(0, 100) < 50) {
					vignettes.push({
						text: `a citizen was surprised by ${his} penis, so ${he} hid it and enjoyed the buttsex without touching it,`,
						type: "rep",
						effect: 1,
					});
				} else if (slave.skill.anal >= 100) {
					vignettes.push({
						text: `a citizen was surprised by ${his} penis, so ${he} hid it and skillfully pretended to be a real girl,`,
						type: "rep",
						effect: 1,
					});
				} else if (slave.fetish === "buttslut") {
					vignettes.push({
						text: `a citizen was surprised by ${his} penis, so ${he} hid it, but could barely tolerate anal without touching it`,
						type: "rep",
						effect: -1,
					});
				}
			}
			if (slave.skill.anal < 100 && slave.anus > 2) {
				vignettes.push({
					text: `a pair of customers enticed by ${his} beauty but disappointed by ${his} loose butthole doubled up on ${his} poor anus without mercy,`,
					type: "health",
					effect: -1,
				});
			}
		}
		if (slave.fetishKnown === 1 && slave.fetishStrength > 95) {
			if (slave.fetish === "buttslut" || slave.fetish === "dom") {
				vignettes.push({
					text: `${he} showed off by forcing a slave in the stocks to eat ${his} ass`,
					type: "rep",
					effect: 1,
				});
			} else if (slave.fetish === "masochist") {
				vignettes.push({
					text: `${he} cooperated with a customer who wanted to whip ${his} tits black and blue`,
					type: "health",
					effect: -1,
				});
			}
		}
		if (slave.health.condition < 20) {
			vignettes.push({
				text: `${he} attracted the attention of a slaveowner alarmed by ${his} poor health, and thought he seemed kind,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (slave.skill.vaginal >= 100) {
			vignettes.push({
				text: `${he} was brought in to apply ${his} skills to a prominent citizen's virgin son,`,
				type: "devotion",
				effect: 0,
			});
		}
		if (slave.skill.penetrative >= 100) {
			vignettes.push({
				text: `${he} was brought by a group of girls to make their friend's first time special,`,
				type: "devotion",
				effect: 0,
			});
		}
		if (canDoAnal(slave) && slave.skill.anal < 100 && slave.anus < 2) {
			vignettes.push({
				text: `a guy with a huge cock insisted on fucking ${him} in ${his} tight ass all night,`,
				type: "health",
				effect: -1,
			});
		}
		if (slave.relationship <= -2 && slave.intelligence + slave.intelligenceImplant <= 15) {
			vignettes.push({
				text: `${he} accidentally mentions how much ${he} loves you during intercourse with a citizen who doesn't like to share,`,
				type: "rep",
				effect: -1,
			});
		}
		if (slave.prestige > 0) {
			vignettes.push({
				text: `a college fraternity visiting the arcology for rush week invited ${him} to a gangbang,`,
				type: "rep",
				effect: 3,
			});
		}

		if (arcInfo.fsActive('FSSupremacist')) {
			if (slave.race === V.arcologies[0].FSSupremacistRace) {
				vignettes.push({
					text: `${he} disappointed a citizen who couldn't bear to see a beautiful ${V.arcologies[0].FSSupremacistRace} be a public slut,`,
					type: "rep",
					effect: -1,
				});
			}
			if (V.arcologies[0].FSSupremacistRace === "asian") {
				vignettes.push({
					text: `${he} was invited to and livened up a rather unconventional seijin-shiki celebration party,`,
					type: "rep",
					effect: 1,
				});
			} else if (V.arcologies[0].FSSupremacistRace === "semitic") {
				vignettes.push({
					text: `${he} was invited to and livened up a rather unconventional bar mitzvah celebration party,`,
					type: "rep",
					effect: 1,
				});
			} else if (V.arcologies[0].FSSupremacistRace === "white") {
				vignettes.push({
					text: `${he} was invited to and livened up a rather unconventional Jugendweihe celebration party,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSSubjugationist')) {
			if (slave.race === V.arcologies[0].FSSubjugationistRace) {
				vignettes.push({
					text: `${he} had a bad time in general, since most of the citizens who used ${him} didn't care about ${addA(V.arcologies[0].FSSubjugationistRace)} prostitute's health or well-being,`,
					type: "health",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSYouthPreferentialist')) {
			if (slave.visualAge > 35) {
				vignettes.push({
					text: `${he} gratified a citizen who wants to keep his MILF fetish in the closet,`,
					type: "rep",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSMaturityPreferentialist')) {
			if (slave.visualAge <= 20) {
				vignettes.push({
					text: `${he} gratified a citizen who wants to keep his fetish for young ${boy}s in the closet,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSGenderRadicalist')) {
			if (slave.dick.isBetween(0, 3)) {
				vignettes.push({
					text: `${he} gratified a citizen who is coming to terms with Gender Radicalism, and is unthreatened by ${his} little penis,`,
					type: "rep",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSGenderFundamentalist')) {
			if (slave.visualAge > 25) {
				vignettes.push({
					text: `${he} gratified a citizen who thinks ${he} resembles his ex-wife, who would never let him fuck her butt,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSRepopulationFocus') || V.arcologies[0].FSRepopulationFocusSMR === 1) {
			if (slave.pregType > 1 && slave.pregKnown > 1 && slave.belly >= 10000) {
				vignettes.push({
					text: `${he} gratified a citizen who enjoys the feeling of a womb filled with more than a single child,`,
					type: "rep",
					effect: 1,
				});
			}
			if (slave.preg > slave.pregData.normalBirth / 4 && slave.pregKnown > 1 && slave.bellyPreg >= 5000) {
				vignettes.push({
					text: `a citizen loved ${his} pregnant belly so much that he came back for repeat service,`,
					type: "rep",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSRestart')) {
			if (canGetPregnant(slave)) {
				vignettes.push({
					text: `${he} gratified a citizen who misses the risk of getting a ${boy} pregnant,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSPaternalist')) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} gratified a citizen who likes to chat with intelligent prostitutes as they fuck ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (slave.trust < -20) {
				vignettes.push({
					text: `a citizen noticed ${his} fear and went out of his way to be gentle,`,
					type: "trust",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSDegradationist')) {
			if (V.seePee !== 0) {
				vignettes.push({
					text: `a drunken citizen needing to use the toilet stumbled into ${him} and unfortunately decided to use ${his} mouth to empty ${his} bladder. ${slave.slaveName} found this interaction to be utterly revolting,`,
					type: "trust",
					effect: -1,
				});
			}
			if (canTalk(slave)) {
				if (slave.voice > 2) {
					vignettes.push({
						text: `${he} gratified a citizen who prefers ${boy}s with high-pitched screams,`,
						type: "rep",
						effect: 1,
					});
				} else if (slave.voice === 1) {
					vignettes.push({
						text: `a citizen who was annoyed by ${his} deep voice used his belt on ${his} ass to see if ${his} voice got higher when ${he} screamed,`,
						type: "health",
						effect: -1,
					});
				}
				if (slave.boobs >= 1200) {
					vignettes.push({
						text: `"a group of laughing citizens had ${him} moo like a cow while they gangbanged ${him},`,
						type: "rep",
						effect: 1,
					});
				}
				if (slave.weight >= 30) {
					vignettes.push({
						text: `a citizen had ${him} grunt and squeal like a pig while he used ${him},`,
						type: "rep",
						effect: 1,
					});
				}
				vignettes.push({
					text: `a customer ordered ${him} to tell bystanders that ${he} was a 'stupid and ugly bitch',`,
					type: "trust",
					effect: 0,
				});
			}
			if (slave.dick > 0) {
				if (slave.scrotum === 0 && slave.genes === "XY") {
					vignettes.push({
						text: `a citizen asked why ${his} useless dick wasn't removed along with ${his} balls,`,
						type: "rep",
						effect: 0,
					});
					vignettes.push({
						text: `a citizen hit ${his} dick a few times to see if gelding reduces sensitivity,`,
						type: "health",
						effect: -1,
					});
					vignettes.push({
						text: `an approving citizen commented that being gelded made it plain ${he} wasn't human,`,
						type: "rep",
						effect: 1,
					});
				}
				vignettes.push({
					text: `a citizen tried to see how far ${his} dick could bend and twist,`,
					type: "health",
					effect: -1,
				});
			}
			if (slave.visualAge > 40) {
				vignettes.push({
					text: `a citizen wrote a note on ${his} face that said: 'Retire it to an arcade',`,
					type: "trust",
					effect: -1,
				});
			}
			vignettes.push({
				text: `a rich citizen had fun seeing how much money he could cram in ${his} holes without using any lube,`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `a displeased citizen grabbed a permanent marker and wrote a critique of ${his} sex skills on ${his} chest,`,
				type: "rep",
				effect: -1,
			});
			vignettes.push({
				text: `two sadistic citizens had fun roughing ${him} up,`,
				type: "health",
				effect: -1,
			});
			vignettes.push({
				text: `${he} was used as a prop in a public service announcement showing citizens how to restrain an unwilling slave for rape,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a sex machine salesman used ${him} to demonstrate his products and fucked ${his} holes brutally,`,
				type: "health",
				effect: -1,
			});
		}
		if (arcInfo.fsActive('FSBodyPurist')) {
			if (slave.boobsImplant > 0) {
				vignettes.push({
					text: `${he} gratified a citizen who wants to keep his fetish for breast implants in the closet,`,
					type: "rep",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSTransformationFetishist')) {
			if (slave.boobsImplant === 0) {
				vignettes.push({
					text: `${he} gratified a citizen who wants to keep his fetish for natural breasts in the closet,`,
					type: "rep",
					effect: 1,
				});
			}
			if (slave.boobsImplant >= 500) {
				vignettes.push({
					text: `a photographer won an award for an artistic close-up of one of ${his} implant-heavy tits,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSSlimnessEnthusiast')) {
			if (canTalk(slave) && slave.voice > 2) {
				vignettes.push({
					text: `${he} gratified a citizen who loves ${his} high-pitched squeals of pleasure,`,
					type: "rep",
					effect: 1,
				});
			}
			if (slave.boobs > 800) {
				vignettes.push({
					text: `${he} was publicly mocked as an ugly fat cow with dangling udders,`,
					type: "rep",
					effect: -1,
				});
			}
		} else if (arcInfo.fsActive('FSAssetExpansionist')) {
			if (slave.boobs < 300) {
				vignettes.push({
					text: `${he} gratified a citizen who wants to keep his fetish for flat chested ${boy}s in the closet,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSPastoralist')) {
			if (slave.lactation === 0) {
				vignettes.push({
					text: `${he} disappointed a citizen who could not understand why nothing was coming out of ${his} nipples when he sucked on them,`,
					type: "rep",
					effect: -1,
				});
			} else {
				vignettes.push({
					text: `a businessman asked to hire ${him} for an hour for a meeting so ${he} could provide 'freshly squeezed' milk for his client's coffee,`,
					type: "rep",
					effect: 2,
				});
				vignettes.push({
					text: `${he} was hired by a trendy café in the arcology so the customers could milk ${him} into their coffees,`,
					type: "rep",
					effect: 2,
				});
			}
			if (slave.nipples === "fuckable" || slave.nipples === "flat") {
				vignettes.push({
					text: `${he} left a citizen deeply confused over how ${he} could possibly be a proper cow without suitable teats,`,
					type: "rep",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSPhysicalIdealist')) {
			if (slave.muscles <= 95 && hasAnyArms(slave)) {
				vignettes.push({
					text: `${he} disappointed a citizen who could barely believe that ${he} wasn't capable of holding ${himself} in a handstand,`,
					type: "rep",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSIntellectualDependency')) {
			if (slave.energy < 70) {
				vignettes.push({
					text: `${he} was called a dead fish by an irate citizen unsatisfied by ${his} libido,`,
					type: "trust",
					effect: -1,
				});
			}
			if (slave.intelligence + slave.intelligenceImplant < -50) {
				vignettes.push({
					text: `${he} was asked to compete in a trivia contest with several other airheads, ${he} was a hit with ${his} audience,`,
					type: "rep",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSSlaveProfessionalism')) {
			if (slave.intelligence + slave.intelligenceImplant > 95) {
				vignettes.push({
					text: `${he} spent a lot of time with a citizen that wanted a follow-up on their post-coital conversation,`,
					type: "rep",
					effect: 2,
				});
			} else if (slave.intelligence + slave.intelligenceImplant <= 10 && canTalk(slave)) {
				vignettes.push({
					text: `a citizen loudly complained about the idiotic statements that kept leaving ${his} mouth,`,
					type: "rep",
					effect: -1,
				});
			}
			if (canTalk(slave) && slave.accent > 1) {
				vignettes.push({
					text: `${he} was publicly ridiculed for not being able to properly speak,`,
					type: "rep",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSStatuesqueGlorification')) {
			if (!heightPass(slave)) {
				vignettes.push({
					text: `${he} upset a citizen who refused to be seen with such a short bitch,`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `${he} gratified a citizen with a secret fetish for short ${boy}s,`,
					type: "rep",
					effect: 1,
				});
			} else if (slave.height >= 230) {
				vignettes.push({
					text: `${he} terrified a young citizen to the brink of tears with ${his} staggering height,`,
					type: "rep",
					effect: -1,
				});
				vignettes.push({
					text: `${he} gratified a citizen ecstatic to finally fuck someone taller than themselves,`,
					type: "rep",
					effect: 1,
				});
			}
		} else if (arcInfo.fsActive('FSPetiteAdmiration')) {
			if (heightPass(slave)) {
				vignettes.push({
					text: `${he} gratified a citizen whose crotch was the perfect height for ${his} mouth,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `a short customer used ${him} as a footstool to steal a kiss from a taller slut,`,
					type: "health",
					effect: -1,
				});
			}
		}
		if (arcInfo.fsActive('FSChattelReligionist')) {
			if (slave.behavioralFlaw === "devout") {
				vignettes.push({
					text: `${he} gratified a citizen who desperately wants his cock to be the one that converts ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSRomanRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Roman mythology attracted a large crowd near ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSNeoImperialist')) {
				vignettes.push({
					text: `a street preacher arguing that your new Imperium is the natural evolution of Western society after the collapse of the old world attracted a large crowd near ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSAztecRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Aztec mythology attracted a large crowd near ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSEgyptianRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Egyptian mythology attracted a large crowd near ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSArabianRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Sunni Islam attracted a large crowd near ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSEdoRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Shintoism attracted a large crowd near ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSChineseRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion was the natural theological evolution of Chinese folk religion attracted a large crowd near ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSAntebellumRevivalist')) {
				vignettes.push({
					text: `a street preacher arguing that your new religion is the natural theological evolution of Protestant Christianity attracted a large crowd near ${him},`,
					type: "rep",
					effect: 1,
				});
			}
			if (arcInfo.fsActive('FSSupremacist')) {
				if (V.arcologies[0].FSSupremacistRace === "asian") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Buddhism attracted a large crowd near ${him},`,
						type: "rep",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "indo-aryan") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Hinduism attracted a large crowd near ${him},`,
						type: "rep",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "latina" || V.arcologies[0].FSSupremacistRace === "southern european") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Roman Catholicism attracted a large crowd near ${him},`,
						type: "rep",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "middle eastern") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Islam attracted a large crowd near ${him},`,
						type: "rep",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "semitic") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Judaism attracted a large crowd near ${him},`,
						type: "rep",
						effect: 1,
					});
				} else if (V.arcologies[0].FSSupremacistRace === "white") {
					vignettes.push({
						text: `a street preacher arguing that your new religion was the natural theological evolution of Norse mythology attracted a large crowd near ${him},`,
						type: "rep",
						effect: 1,
					});
				}
			}
		}
		if (arcInfo.fsActive('FSRomanRevivalist')) {
			if (slave.race === "white" && slave.height >= 185) {
				vignettes.push({
					text: `${he} gratified a citizen who thought ${his} appearance worthy of a lusty northern barbarian,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSNeoImperialist')) {
			if (slave.face > 60) {
				vignettes.push({
					text: `${he} received extra attention from one of your Barons who claimed ${him} to be 'fair enough for a Noble's eyes' and praised you for raising such fine slaves,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSAztecRevivalist')) {
			if (slave.devotion > 75 && slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} indulged a citizen by following a fertility ritual completely,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSEgyptianRevivalist')) {
			vignettes.push({
				text: `${he} got extra attention from a group of citizens competing to get off with whores of each of the arcology's ethnic groups in the least time,`,
				type: "rep",
				effect: 1,
			});
		}
		if (arcInfo.fsActive('FSEdoRevivalist')) {
			if (slave.face > 40 && slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} gratified a citizen who wished to do nothing more than converse with a beautiful and intelligent ${boy},`,
					type: "rep",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${he} was invited to and livened up a rather unconventional genpuku celebration party,`,
				type: "rep",
				effect: 1,
			});
		}
		if (arcInfo.fsActive('FSArabianRevivalist')) {
			if (slave.skill.entertainment >= 100 && canTalk(slave) && slave.voice > 0 && slave.accent < 2) {
				vignettes.push({
					text: `${he} gratified a citizen who prefers prostitutes who can tell lovely stories,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSChineseRevivalist')) {
			if (slave.dick > 0 && slave.balls === 0) {
				vignettes.push({
					text: `a citizen admired ${his} lack of balls and praised ${him} for being like the eunuchs in Chinese history,`,
					type: "rep",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${he} was invited to and livened up a rather unconventional Guan Li celebration party,`,
				type: "rep",
				effect: 1,
			});
		}
		if (arcInfo.fsActive('FSAntebellumRevivalist')) {
			if (slave.devotion > 75 && slave.sexualQuirk === "romantic") {
				vignettes.push({
					text: `${he} received a letter from a gentleman infatuated with ${him},`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (V.seeAge !== 0) {
			if (slave.birthWeek >= 51) {
				if (arcInfo.fsActive('FSDegradationist')) {
					if (slave.voice !== 0) {
						vignettes.push({
							text: `a group of frat boys found out it was ${his} birthday and took turns spanking ${him} until ${he} couldn't sit down and ${his} voice was hoarse,`,
							type: "health",
							effect: -1,
						});
					}
					vignettes.push({
						text: `${he} was given a paddle and ordered to request harsh birthday spankings from all of ${his} citizens,`,
						type: "health",
						effect: -1,
					});
				}
				vignettes.push({
					text: `a favorite citizen gave ${him} a lighthearted birthday spanking and a big tip,`,
					type: "cash",
					effect: 1,
				});
			}
			if (slave.geneticQuirks.neoteny === 2 && slave.visualAge < V.minimumSlaveAge && slave.assignment === window.Job.PUBLIC) {
				vignettes.push({
					text: `a passing tourist thought ${he} was a wayward child and gave ${him} some candy,`,
					type: "devotion",
					effect: 0,
				});
			}
		}
		vignettes.push({
			text: `a visiting tourist got a crush on ${him} and gave ${him} repeat business,`,
			type: "rep",
			effect: 1,
		});
		vignettes.push({
			text: `a prominent citizen invited ${him} to his birthday party,`,
			type: "rep",
			effect: 1,
		});
		vignettes.push({
			text: `one of the companies with an office in your arcology brought ${him} in for a team-building bukkake party for its employees,`,
			type: "rep",
			effect: 1,
		});
		vignettes.push({
			text: `a man dragged his crying wife along so she could watch him fuck a public slut,`,
			type: "rep",
			effect: 0,
		});
		if (V.seeDicks !== 100) {
			vignettes.push({
				text: `a woman dragged her angry husband along so he could watch his wife get eaten out by a public slut,`,
				type: "rep",
				effect: 0,
			});
		} else {
			vignettes.push({
				text: `a man dragged his angry lover along so he could watch his boyfriend get sucked off by a public slut,`,
				type: "rep",
				effect: 0,
			});
		}
		vignettes.push({
			text: `${he} went to sleep after having sex with strangers all day, and had a dream about you loving ${him},`,
			type: "devotion",
			effect: 1,
		});
		vignettes.push({
			text: `${he} went to sleep after having sex with strangers all day, and had a dream about you letting a citizen hurt ${him},`,
			type: "devotion",
			effect: -1,
		});
		vignettes.push({
			text: `${he} went to sleep after having sex with strangers all day, and had a dream about you protecting ${him} from a mean citizen,`,
			type: "trust",
			effect: 1,
		});
		vignettes.push({
			text: `${he} went to sleep after having sex with strangers all day, and had a dream about you selling ${him} for good,`,
			type: "trust",
			effect: -1,
		});
	} else if (slave.assignment === window.Job.HOUSE || slave.assignment === window.Job.QUARTER) {
		if (slave.fetishKnown === 1) {
			switch (slave.fetish) {
				case "cumslut":
					vignettes.push({
						text: `when some of your cum accidentally landed on the floor, ${he} cleaned it up with ${his} tongue,`,
						type: "devotion",
						effect: 1,
					});
					vignettes.push({
						text: `${he} licked off some sperm from the ground while cleaning up after an orgy,`,
						type: "devotion",
						effect: 0,
					});
					vignettes.push({
						text: `${his} attempt to clean up cum using only ${his} mouth resulted in gastrointestinal distress,`,
						type: "health",
						effect: -1,
					});
					break;
				case "humiliation":
					vignettes.push({
						text: `${he} loved getting absolutely filthy while cleaning everything else,`,
						type: "devotion",
						effect: 1,
					});
					break;
			}
		}
		switch (slave.behavioralFlaw) {
			case "arrogant":
				vignettes.push({
					text: `${he} refused to clean up a particular nasty room in the penthouse, earning ${himself} harsh punishment,`,
					type: "trust",
					effect: -1,
				});
				break;
			case "gluttonous":
				vignettes.push({
					text: `${he} was thrilled to be getting rid of leftover food the only way ${he} knew how,`,
					type: "devotion",
					effect: 1,
				});
				break;
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			vignettes.push({
				text: `${he} forgot to sleep and no one bothered to tell ${him} to. ${He} collapsed from exhaustion halfway through the week, but even by then ${he}'d gotten all ${his} work done and then some,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.devotion > 95) {
			vignettes.push({
				text: `${he} pushed ${himself} to work even harder than usual in hopes of proving ${his} loyalty to you,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.trust > 20) {
			if (slave.devotion < -20) {
				vignettes.push({
					text: `${he} slacked off a lot just to spite you,`,
					type: "cash",
					effect: -1,
				});
			}
			vignettes.push({
				text: `${he} worked a bit harder than usual in hopes of impressing you,`,
				type: "cash",
				effect: 1,
			});
		}
		if (isAmputee(slave)) {
			vignettes.push({
				text: `${he} was soaped up, tied to a pole, and used as a very inefficient mop. While being used to clean outside, ${he} certainly drew some stares,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `${he} scrubbed the floor of the communal showers with a brush held in ${his} mouth, glad to be able to do something at least,`,
				type: "devotion",
				effect: 1,
			});
		}
		if (slave.intelligence + slave.intelligenceImplant > 50) {
			vignettes.push({
				text: `${he} devised a highly efficient way to get ${his} entire week's worth of work done in only three days. As a reward, ${he} was given — you guessed it — more work,`,
				type: "cash",
				effect: 1,
			});
		} else if (slave.intelligence + slave.intelligenceImplant < -50) {
			vignettes.push({
				text: `after being told all ${he} needed was some 'elbow grease', ${he} wasted an obscene amount of time searching for it,`,
				type: "cash",
				effect: -1,
			});
			vignettes.push({
				text: `${he} had to get ${his} stomach pumped after drinking a bottle of window cleaner ${he} mistook for grape juice,`,
				type: "health",
				effect: -1,
			});
		}
		if (slave.voice === 0) {
			vignettes.push({
				text: `a few citizens mistook ${him} for a whore while ${he} was going about ${his} regular cleaning duties. Without the power of speech, ${he} was unable to explain the situation and was subsequently used and paid,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.boobs >= 1400) {
			if (slave.fetish !== "boobs" && slave.fetish !== "masochist") {
				vignettes.push({
					text: `${he} got really frustrated by the constant bouncing of ${his} boobs when ${he} performed cleaning activities,`,
					type: "trust",
					effect: -1,
				});
			}
		}
		if (slave.visualAge >= 40) {
			vignettes.push({
				text: `some of the younger slaves purposefully created messes, making fun of ${him} as ${he} scurried behind them to clean up,`,
				type: "trust",
				effect: -1,
			});
		}
		if (slave.hLength >= 150) {
			vignettes.push({
				text: `${he} was routinely forced to use ${his} hair as a mop,`,
				type: "cash",
				effect: 0,
			});
		}
		if (slave.energy > 80) {
			if (slave.chastityVagina !== 0) {
				vignettes.push({
					text: `the back and forth motions of cleaning cause ${him} sexual frustration as ${his} chastity belt rubs against ${his} soaking wet pussy,`,
					type: "trust",
					effect: 0,
				});
			}
		}
		if (slave.energy < 60) {
			vignettes.push({
				text: `${he} once thought on how easy ${his} assignment is in comparison to the sexual assignments that the others have,`,
				type: "trust",
				effect: 1,
			});
		}
		if (slave.health.tired > 60) {
			vignettes.push({
				text: `${he} was so exhausted that ${he} barely got any work done,`,
				type: "cash",
				effect: -1,
			});
			vignettes.push({
				text: `${he} was so tired ${he} fell asleep while changing sheets in the dormitories, earning ${himself} a thorough molestation,`,
				type: "trust",
				effect: -1,
			});
			vignettes.push({
				text: `${he} was so tired ${he} fell asleep while changing sheets in the dormitories, waking up to find another slave spooning ${him},`,
				type: "trust",
				effect: 0,
			});
		}
		if (!canSee(slave)) {
			vignettes.push({
				text: `without the power of sight, ${he} routinely failed to spot dirt and grime that other slaves would have noticed,`,
				type: "cash",
				effect: -1,
			});
			vignettes.push({
				text: `${he} routinely kept cleaning well after other slaves would have stopped, simply because ${he} couldn't see how much work had been done already,`,
				type: "cash",
				effect: 1,
			});
		}
		if (!canSmell(slave)) {
			vignettes.push({
				text: `${he} cleaned up messes other slaves wouldn't touch because ${he} was able to withstand their odors,`,
				type: "cash",
				effect: 1,
			});
		}
		vignettes.push({
			text: `${he} was ordered to clean the many erotically shaped statues around the arcology. ${He} put on a good show, waxing the many tits, asses, and cocks with gusto,`,
			type: "rep",
			effect: 1,
		});
		vignettes.push({
			text: `${he} was ordered to clean all the exterior windows around your estate using only ${his} ${slave.boobs >= 300 ? "tits" : "bare flat chest"}. The people passing by seemed to appreciate the show,`,
			type: "rep",
			effect: 1,
		});
		vignettes.push({
			text: `${he} was ordered to scrub all the sidewalks outside your places of business free of gum and other detritus, using only a toothbrush. ${He} spent the whole day bent over for all the public to see,`,
			type: "rep",
			effect: 1,
		});
		vignettes.push({
			text: `${he} found refuge from the realities of slavery in constant menial tasks, accidentally accomplishing more than was asked of ${him},`,
			type: "cash",
			effect: 1,
		});
		vignettes.push({
			text: `while cleaning the slave living quarters, ${he} found someone's hidden stash of money, no doubt withheld from a brave whore's weekly earnings. No one will ever own up to stealing from you out of fear of the consequences, but you take the paltry sum because it is rightfully yours,`,
			type: "cash",
			effect: 1,
		});
		vignettes.push({
			text: `${he} was nearly constantly sneezing from all the dust ${he} cleaned up,`,
			type: "health",
			effect: -1,
		});
	} else if (slave.assignment === window.Job.NURSERY || slave.assignment === window.Job.MATRON) {
		// TODO: add more vignettes here
		if (slave.sexualQuirk === "motherly") {
			vignettes.push({
				text: `${he} greatly enjoyed being able to work with young children,`,
				type: "devotion",
				effect: 1,
			});
		}
		if (slave.geneticQuirks.neoteny === 2 && slave.visualAge < V.minimumSlaveAge) {
			vignettes.push({
				text: `${he} was continuously mistaken for one of the nursery's young wards, rather than one of its caretakers,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (slave.intelligence + slave.intelligenceImplant < -50) {
			if (canSee(slave)) {
				vignettes.push({
					text: `${he} became fascinated by the lights and colors of the children's toys,`,
					type: "trust",
					effect: 0,
				});
			}
			vignettes.push({
				text: `${he} was pleased to discover that the babies were not as smart as ${him},`,
				type: "devotion",
				effect: 1,
			});
		}
		if (canWalk(slave)) {
			vignettes.push({
				text: `${he} bumped ${his} shin on one of the cribs,`,
				type: "health",
				effect: -1,
			});
		}
		if (canHear(slave)) {
			vignettes.push({
				text: `${he} repeatedly became irritated by the sound of crying infants,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (canSmell(slave)) {
			vignettes.push({
				text: `${he} repeatedly became disgusted by the smell of dirty diapers,`,
				type: "devotion",
				effect: -1,
			});
		}
		vignettes.push({
			text: `${he} enjoyed the nursery's comparatively less intense atmosphere,`,
			type: "trust",
			effect: 1,
		});
		vignettes.push({
			text: `${he} stopped a child from swallowing a small metal object, which turned out to be an old coin,`,
			type: "cash",
			effect: 1,
		});
	} else if (slave.assignment === window.Job.MILKED || slave.assignment === window.Job.DAIRY) {
		if (slave.lactation > 0) {
			if (slave.race === "black") {
				vignettes.push({
					text: `an unknown prankster labeled ${his} milk 'Chocolate Milk', causing unknowing citizens to buy it in droves,`,
					type: "cash",
					effect: 1,
				});
			}
			vignettes.push({
				text: `a restaurant critic declared ${his} milk delicious,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `an elderly citizen reported feeling healthier after drinking ${his} milk,`,
				type: "rep",
				effect: 1,
			});
			vignettes.push({
				text: `a local grocery store ordered more of ${his} milk than usual by mistake,`,
				type: "cash",
				effect: 1,
			});
			vignettes.push({
				text: `a few containers of ${his} milk turned sour by accident,`,
				type: "cash",
				effect: -1,
			});
		}
		if (slave.balls > 0) {
			switch (slave.fetish) {
				case "pregnancy":
					vignettes.push({
						text: `the thought of ${his} cum knocking someone up inspired ${him} to produce more of it,`,
						type: "cash",
						effect: 1,
					});
					break;
			}
			vignettes.push({
				text: `an eccentric celebrity chef used ${his} cum in a new pudding recipe,`,
				type: "rep",
				effect: 1,
			});
		}
		if (canStand(slave) && V.dairyRestraintsSetting < 2) {
			vignettes.push({
				text: `${he} slipped and fell in an errant puddle of various bodily fluids,`,
				type: "health",
				effect: -1,
			});
		}
		if (canHear(slave)) {
			vignettes.push({
				text: `${he} was disturbed by the sounds from all the machinery around ${him},`,
				type: "devotion",
				effect: -1,
			});
		}
		vignettes.push({
			text: `${his} milking machine broke down and had to be repaired,`,
			type: "cash",
			effect: -1,
		});
		if (V.dairyRestraintsSetting < 2) {
			vignettes.push({
				text: `${he} stumbled across a (waterlogged and unsanitary) wad of money,`,
				type: "cash",
				effect: 1,
			});
		}
		if (slave.intelligence + slave.intelligenceImplant < -50) {
			vignettes.push({
				text: `${he} thought ${he} would turn into an actual, literal cow,`,
				type: "trust",
				effect: -1,
			});
		}
		vignettes.push({
			text: `very little of interest happened because the life of a dairy cow is often really boring,`,
			type: "rep",
			effect: 0,
		});
	} else if (slave.assignment === window.Job.FARMYARD || slave.assignment === window.Job.FARMER) {
		vignettes.push(farmyardVignettes(slave));
	} else if (slave.assignment === window.Job.REST || slave.assignment === window.Job.SPA) {
		switch (slave.behavioralFlaw) {
			case "anorexic":
				vignettes.push({
					text: `with nothing to do, ${he} laid in bed and ate almost nothing,`,
					type: "health",
					effect: -1,
				});
				break;
			case "devout":
				vignettes.push({
					text: `${he} spent nearly all of ${his} free time praying,`,
					type: "cash",
					effect: 0,
				});
				break;
		}
		switch (slave.behavioralQuirk) {
			case "fitness":
				vignettes.push({
					text: `${he} spent a great deal of time working out,`,
					type: "health",
					effect: 1,
				});
				vignettes.push({
					text: `${he} exercised to the point of physical exhaustion,`,
					type: "health",
					effect: -1,
				});
				break;
			case "insecure":
				vignettes.push({
					text: `${he} relaxed by doing whatever other slaves were doing,`,
					type: "cash",
					effect: 0,
				});
				break;
			case "funny":
				vignettes.push({
					text: `${he} gained renown as a talented improvisational comedian,`,
					type: "rep",
					effect: 1,
				});
				vignettes.push({
					text: `${he} gained renown as a talented improvisational comedian, but ${his} scathing satires of other slaveholders do you no favors,`,
					type: "rep",
					effect: -1,
				});
				break;
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			vignettes.push({
				text: `${he} spent ${his} time watching paint dry. No one bothered telling ${him} the wall wasn't newly painted,`,
				type: "cash",
				effect: 0,
			});
		}
		if (slave.devotion > 95) {
			vignettes.push({
				text: `${he} decided to spend some of ${his} free time to praise you on the streets,`,
				type: "rep",
				effect: 1,
			});
		}
		if (slave.devotion > 50) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} spent some of ${his} downtime figuring out a new way for you to make money,`,
					type: "cash",
					effect: 1,
				});
			}
		}
		if (slave.devotion > 20) {
			if (slave.rules.relationship === "just friends" || slave.rules.relationship === "permissive") {
				vignettes.push({
					text: `${he} taught another slave some massage skills,`,
					type: "rep",
					effect: 1,
				});
			}
		}
		if (slave.devotion < -50) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} spent some of ${his} downtime figuring out a way to sabotage your profits,`,
					type: "cash",
					effect: -1,
				});
			}
			vignettes.push({
				text: `${he} spent hours plotting ${his} escape from the arcology,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (slave.trust < -20) {
			vignettes.push({
				text: `constantly fearing what might be done to ${him}, rest did not come easy,`,
				type: "health",
				effect: -1,
			});
		}
		if (slave.race === "catgirl" && V.seeCats === 1) {
			vignettes.push({
				text: `${he} kicked and protested in the showers because of some catlike racial instinct,`,
				type: "health",
				effect: -1,
			});
			vignettes.push({
				text: `${he} deeply enjoyed ${his} lazy downtime, sleeping across nearly every hard surface in the penthouse,`,
				type: "health",
				effect: 1,
			});
		}
		if (slave.relationship === -2) {
			if (slave.rules.speech === "permissive") {
				if (slave.intelligence + slave.intelligenceImplant > 50) {
					if (slave.skill.entertainment >= 100) {
						vignettes.push({
							text: `${he} worked on an erotic play about ${his} deep love for you,`,
							type: "rep",
							effect: 1,
						});
					}
				}
				vignettes.push({
					text: `${he} spent most of ${his} time fan${boy}ing obsessively about you to everyone ${he} could,`,
					type: "rep",
					effect: 1,
				});
			}
			vignettes.push({
				text: `${he} grew sick with longing to be kept at your side as your fucktoy instead,`,
				type: "health",
				effect: -1,
			});
			vignettes.push({
				text: `${he} 'accidentally' came to see you throughout the day, even though ${he} was resting,`,
				type: "devotion",
				effect: 1,
			});
		} else if (slave.relationship === -1) {
			vignettes.push({
				text: `${he} daydreamed about being fucked by as many people as possible, upset that you kept ${him} inside,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (slave.energy > 95) {
			if (slave.behavioralFlaw === "odd") {
				if (hasAnyArms(slave) && canSee(slave)) {
					vignettes.push({
						text: `you discovered ${him} sketching an image of ${his} genitalia, which you managed to sell,`,
						type: "cash",
						effect: 1,
					});
				}
			}
			if (canWalk(slave)) {
				vignettes.push({
					text: `${he} was so horny that ${he} sleepwalked into your room and performed oral sex on you, and then woke up when ${he} bruised ${his} shin,`,
					type: "health",
					effect: -1,
				});
			} else if (canMove(slave)) {
				vignettes.push({
					text: `${he} was so horny that ${he} sleepcrawled into your room, only to fall and bump ${his} head while climbing into bed with you,`,
					type: "health",
					effect: -1,
				});
			} else {
				if (hasAnyArms(slave)) {
					if (slave.rules.release.masturbation === 1) {
						vignettes.push({
							text: `due to the obvious difficulties in ${his} mobility, ${he} spent a lot of time masturbating in bed,`,
							type: "health",
							effect: 0,
						});
					}
				} else {
					vignettes.push({
						text: `${he} was so desperate for sexual relief that ${he} almost threw out ${his} back from trying to hump ${his} own bed,`,
						type: "health",
						effect: -1,
					});
				}
			}
		}
		if (slave.energy > 80) {
			if (slave.rules.release.masturbation === 1) {
				if (slave.fetish === "boobs") {
					if (slave.boobs >= 800) {
						vignettes.push({
							text: `${he} couldn't control ${his} urges and spent hours fucking ${his} own boobs with various dildoes,`,
							type: "health",
							effect: 0,
						});
					}
					vignettes.push({
						text: `${he} was too enthusiastic in tugging and twisting ${his} nipples while masturbating,`,
						type: "health",
						effect: -1,
					});
				}
				if (slave.lactation > 0) {
					vignettes.push({
						text: `${he} spent an entire day happily masturbating and massaging ${his} swollen, milky tits,`,
						type: "trust",
						effect: 1,
					});
				}
			}
		}
		if (slave.health.condition < -20) {
			vignettes.push({
				text: `${he} had a bad cough and spent a lot of time napping,`,
				type: "health",
				effect: 0,
			});
		}
		if (slave.health.tired > 60) {
			vignettes.push({
				text: `${he} felt very tired and spent a lot of time napping,`,
				type: "health",
				effect: 0,
			});
		}
		if (slave.intelligence + slave.intelligenceImplant > 50) {
			vignettes.push({
				text: `${he} immersed ${himself} in classics of literature at an arcology library, giving ${him} uncomfortable ideas about society,`,
				type: "devotion",
				effect: -1,
			});
		}
		if (arcInfo.fsActive('FSPaternalist')) {
			vignettes.push({
				text: `due to being ordered to rest, ${he} enjoyed a great deal of calm and relaxation thanks to your arcology's caretaking nature,`,
				type: "health",
				effect: 1,
			});
		} else if (arcInfo.fsActive('FSDegradationist')) {
			vignettes.push({
				text: `despite being ordered to rest, ${he} was made subject to a lot of torture and pain because of your arcology's depraved nature,`,
				type: "health",
				effect: -1,
			});
		}
		if (arcInfo.fsActive('FSSupremacist')) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} went to a local library, and was disturbed by all the racial supremacist historical revisionism on display,`,
					type: "trust",
					effect: -1,
				});
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				vignettes.push({
					text: `${he} went to a local library, and was thrilled by all the racial supremacist historical revisionism ${he} couldn't recognize,`,
					type: "devotion",
					effect: 1,
				});
			}
		}
		if (arcInfo.fsActive('FSSubjugationist')) {
			if (slave.intelligence + slave.intelligenceImplant > 50) {
				vignettes.push({
					text: `${he} went to a local library, and was disturbed by all the racial subjugationist historical revisionism on display,`,
					type: "trust",
					effect: -1,
				});
			} else if (slave.intelligence + slave.intelligenceImplant < -50) {
				vignettes.push({
					text: `${he} went to a local library, and was thrilled by all the racial subjugationist historical revisionism ${he} couldn't recognize,`,
					type: "devotion",
					effect: 1,
				});
			}
		}
		if (canHear(slave)) {
			vignettes.push({
				text: `${he} spent much of ${his} free time listening to music,`,
				type: "health",
				effect: 0,
			});
		}
		if (canSee(slave)) {
			vignettes.push({
				text: `${he} spent much of ${his} free time watching television,`,
				type: "health",
				effect: 0,
			});
			vignettes.push({
				text: `${he} spent much of ${his} free time watching movies,`,
				type: "health",
				effect: 0,
			});
		}
		if (canTalk(slave)) {
			vignettes.push({
				text: `${he} spent much of ${his} free time talking with the other slaves,`,
				type: "health",
				effect: 0,
			});
		}
		if (canWalk(slave)) {
			vignettes.push({
				text: `${he} spent much of ${his} free time walking around the arcology,`,
				type: "health",
				effect: 1,
			});
		} else if (canMove(slave) && slave.rules.mobility === "permissive") {
			vignettes.push({
				text: `${he} spent much of ${his} free time making use of ${his} restored mobility by exploring the arcology,`,
				type: "health",
				effect: 1,
			});
		}
		vignettes.push({
			text: `${he} spent much of ${his} free time napping,`,
			type: "health",
			effect: 1,
		});
	}

	return jsEither(vignettes);

	// Farmyard

	function farmyardVignettes(slave) {
		let r = [];

		if (canWalk(slave)) {
			r.push({
				text: `${he} rather comically injured ${himself} by stepping on a rake,`,
				type: "health",
				effect: -1,
			});
		}

		if ((V.farmyardBreeding) && (V.seeBestiality)) {
			r.push({
				text: `a citizen didn't realize how disgusting he found bestiality until he attended one of ${V.farmyardName}'s shows,`,
				type: "rep",
				effect: -1,
			});

			r.push({
				text: `a citizen attended one of ${V.farmyardName}'s shows and discovered he had a bestiality fetish,`,
				type: "rep",
				effect: 1,
			});

			r.push({
				text: `${he} dreamt that you decided to have ${him} do nothing but fuck animals for the rest of ${his} life,`,
				type: "devotion",
				effect: -1
			});

			r.push({
				text: `${he} dreamt that you wouldn't come to ${his} aid when one of ${his} bestial partners became overeager,`,
				type: "trust",
				effect: -1
			});

			if ((V.animals.canine.length > 0) && hasAnyNaturalLegs(slave)) {
				r.push({
					text: `an over-excited ${getAnimal(V.animals.canine.random()).name} left scratch marks on ${his} leg,`,
					type: "health",
					effect: -1
				});
			}

			if (V.animals.hooved.length > 0) {
				r.push({
					text: `${he} was injured by a particularly well-endowed ${getAnimal(V.animals.hooved.random()).name},`,
					type: "health",
					effect: -1
				});
			}

			if (V.animals.feline.length > 0) {
				r.push({
					text: `${he} managed to take two ${getAnimal(V.animals.feline.random()).name}s at once, aweing the crowd,`,
					type: "cash",
					effect: 1
				});
			}
		} else {
			r.push({
				text: `${he} worked extra hard, and managed to sell extra produce,`,
				type: "cash",
				effect: 1,
			});
		}

		r.push({
			text: `${he} felt energized by the simulated outdoor environment`,
			type: "health",
			effect: 1,
		});

		r.push({
			text: `the pesticides ${he} accidentally inhaled made ${him} feel nauseous,`,
			type: "health",
			effect: -1,
		});

		return jsEither(r);
	}
};
