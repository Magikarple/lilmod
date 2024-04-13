App.Events.SERetire = class SERetire extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	/** Custom casting: all slaves ready for retirement are cast automatically. if no slaves are cast, casting fails and the event does not run. */
	castActors() {
		this.actors = V.slaves.filter(s => retirementReady(s)).map(s => s.ID);
		return this.actors.length > 0;
	}

	execute(node) {
		const artRenderer = V.seeImages && V.seeReportImages ? new App.Art.SlaveArtBatch(this.actors, 2, 0) : null;
		if (artRenderer) {
			node.append(artRenderer.writePreamble());
		}

		for (const id of this.actors) {
			const slave = getSlave(id);
			if (slave) {
				App.UI.DOM.appendNewElement("div", node, App.Events.retire(slave));
				node.append(sectionBreak());
			}
		}

		function sectionBreak() {
			const hr = document.createElement("hr");
			hr.style.margin = "0";
			return hr;
		}
	}
};

/**
 * @param {App.Entity.SlaveState} originalSlave
 * @param {App.Art.SlaveArtBatch} [artRenderer]
 */
App.Events.retire = function(originalSlave, artRenderer) {
	const el = new DocumentFragment();
	const slave = clone(originalSlave);
	removeSlave(originalSlave);
	let r = [];
	const {
		He, His, Him,
		he, his, him, himself, wife, woman, girl
	} = getPronouns(slave);
	const {title: Master} = getEnunciation(slave);
	let his2;
	let He2;
	let he2;
	let him2;
	let girl2;
	const lover = slave.relationship > 3 ? getSlave(slave.relationshipTarget) : null;
	if (lover) {
		({
			his2, He2, he2, him2, girl2
		} = getPronouns(lover).appendSuffix("2"));
	}

	const {heU, hisU, himU, girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
	const art = (V.seeImages) ? App.UI.DOM.drawOneSlaveRight(el, slave, artRenderer) : document.createElement("div");

	const desc = App.UI.DOM.appendNewElement("div", el);
	const result = App.UI.DOM.appendNewElement("div", el);

	r.push(App.UI.DOM.slaveDescriptionDialog(slave));
	r.push(`is retiring from sexual slavery this week,`);

	if (V.policies.retirement.fate === "citizen") {
		r.push(`in a way that will fill the rest of your property with envy and <span class="mediumaquamarine">trust.</span>`);
		for (const s of V.slaves) {
			s.trust += 3;
		}
		if (lover) {
			r.push(`${lover.slaveName}, for ${his2} part, is <span class="hotpink">overjoyed,</span> though also a bit sad. Although ${he2} knows ${he2} will ${lover.assignment} for a while longer, ${he2} looks forward to joining ${slave.slaveName} one day.`);
			lover.devotion += 10;
		}
		App.Events.addParagraph(desc, r);
		r = [];

		r.push(`${He} is retiring into citizenship, with a substantial annuity that will provide ${him} with a secure if not luxurious life.`);
		if (slave.relationship === -3) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`Sadly, ${he} is not mentally equipped to look after ${himself}, but the arcology hosts several fine institutions capable of caring for ${him}. They'll have someone check in on ${him} daily. ${Him} being your ${wife} is ultimately irrelevant; ${he} never realized it in the first place.`);
			} else if (slave.devotion + slave.trust >= 175) {
				r.push(`${He} wishes ${he} could continue to be your slave ${wife}, but ${he} understands that marriages between slaves and slaveowners are predicated on the slave relationship. ${He} knows that ${his} retirement has come, meaning that ${his} slave relationship to you is ending. ${He}'s had a long time to get used to the idea, and gets through the process with dignity, doing ${his} best to avoid embarrassing you.`);
			} else if (slave.devotion < -20 && slave.trust > 20) {
				r.push(`${He} is glad ${he} no longer has to be your slave ${wife}, as ${he} never wanted to be in the first place, though ${he} will miss taking advantage of the position. ${He} understands that marriages between slaves and slaveowners are predicated on the slave relationship. ${He} knows that ${his} retirement has come, meaning that ${his} slave relationship to you is ending. ${He}'s had a long time to dream of the idea, and goes through the process with unremitting joy, doing ${his} best to embarrass you.`);
			} else if (slave.devotion < -20) {
				r.push(`${He} is glad ${he} no longer has to be your slave ${wife}, as ${he} never wanted to be in the first place. ${He} understands that marriages between slaves and slaveowners are predicated on the slave relationship. ${He} knows that ${his} retirement has come, meaning that ${his} slave relationship to you is ending. ${He}'s had a long time to dream of the idea, and goes through the process with unremitting joy, doing ${his} best to avoid embarrassing you while ${he}'s still subject to your whims and your punishments.`);
			} else {
				r.push(`${He} is glad ${he} no longer has to be your slave ${wife}, as ${he} never wanted to be in the first place. ${He} understands that marriages between slaves and slaveowners are predicated on the slave relationship. ${He} knows that ${his} retirement has come, meaning that ${his} slave relationship to you is ending. ${He}'s had a long time to get used to the idea, and gets through the process dutifully, doing ${his} best to avoid embarrassing you.`);
			}
		} else if (slave.fetish === Fetish.MINDBROKEN || slave.actualAge < 3) {
			r.push(`Sadly, ${he} is not mentally equipped to look after ${himself}, but the arcology hosts several fine institutions capable of caring for ${him}. They'll have someone check in on ${him} daily.`);
		} else if (slave.devotion > 95) {
			r.push(`${He} desperately wishes ${he} could continue to be your sex slave, but ${he} understands that ${his} retirement has come. More importantly, ${he}'s had a long time to get used to the idea, and gets through the process with resolution, doing ${his} best to avoid embarrassing ${himself} or you.`);
		} else if (slave.devotion > 20) {
			r.push(`${He} is very happy to be a free person again, though ${he} does ${his} best to do you the favor of not being too ostentatious about this.`);
		} else {
			r.push(`It is with an ill-disguised triumphalism that ${he} leaves sexual slavery behind ${him}, and enters into a life in which ${he} can decline to have things inserted into ${his} body.`);
		}
		r.push(`${He}'s certainly going to have some adjustments to make.`);
		if (slave.energy > 90) {
			r.push(`Notably, dealing with ${his} formidable sex drive is now ${his} business. You suspect the arcology's clubs are about to receive a fanatical new regular, and the arcology's whores may not know what hit them when ${he} realizes that ${he}'s now quite capable of buying whatever ${he} wants on a semi-regular basis.`);
			if (slave.skill.anal + slave.skill.oral >= 120) {
				r.push(`${He}'s so sexually skilled, though, that ${he} probably won't have much trouble. ${He}'ll probably have more than a few eager lovers within days.`);
			}
			if (slave.face > 40) {
				r.push(`${He}'s certainly attractive enough that ${he}'ll have no trouble finding as many casual hookups as ${he} likes.`);
			}
		}
		App.Events.addParagraph(desc, r);
		r = [];
		if (slave.prestigeDesc && slave.prestigeDesc.includes("Head Girl") || V.HeadGirlID === slave.ID) {
			r.push(`${He} has a reputation from ${his} long service as your Head Girl. To ${his} bemusement, and considerable satisfaction, ${he} has multiple job offers from slaving operations without even having to circulate ${his} resume.`);
			if (slave.fetish === Fetish.SADIST) {
				r.push(`The prospect of a virtually unlimited field for abuse and rape is something ${he}'d pay for, now that ${he} has ${his} own money. ${He}'s excited beyond description to find that there are people interested in paying ${him} to exercise ${his} exquisitely horrible skills.`);
			} else if (slave.fetish === Fetish.DOM) {
				r.push(`Dominance is second nature to ${him}. Though ${he} doesn't have to work, ${his} slaving skills are valuable enough that ${he}'d probably be tempted by the pay ${he} can expect, even if ${he} didn't derive real pleasure from exercising them.`);
			} else {
				r.push(`${His} annuity means that ${he} doesn't have to work, but ${he}'s inclined to do so. ${His} skills command reasonable wages in the slave training field, and between those prospects and ${his} annuity, ${he} stands to become wealthy.`);
			}
		} else if (slave.porn.prestigeDesc && slave.porn.prestigeDesc.includes("is world famous for")) {
			let pornFame = slave.porn.prestigeDesc;
			pornFame = pornFame.replace("$He is world famous for $his career in slave pornography. Millions are intimately familiar with", "enjoy");
			pornFame = pornFame.replace(".", ",");
			r.push(`In addition to ${his} annuity, you've laid the groundwork for ${him} to become wealthy by the way you publicized pornography of ${him}. Many thousands of people across the world are willing to pay to ${pornFame} and they enjoy it in part because ${he} doesn't mind it, either. ${He}'s in a position to make great money for doing on camera what ${he} would probably do anyway.`);
		} else if ((slave.intelligence + slave.intelligenceImplant >= -50) && (slave.muscles > 5) && (slave.skill.combat > 60) && hasAllLimbs(slave) && (slave.face > 10)) {
			r.push(`${He}'s pretty and deadly. If ${he} feels ${he} prefers wealth and danger to living on ${his} annuity, ${he}'ll have no trouble finding work. In fact, ${he}'ll likely have trouble sifting through all the mercenary organizations, businesses in need of attractive and competent guards for public spaces, and citizens looking for effective bodyguards willing to hire ${him}.`);
		} else if ((slave.intelligence + slave.intelligenceImplant > 50) && (slave.intelligenceImplant >= 15)) {
			r.push(`${He} has no skills extraordinary enough to bring prospective employers in search of ${him}, in this new, slaveowning economy, but ${he} is highly intelligent, educated, and has a small income. As you know from your own abundant personal experience, ${his} intelligence is a lever, ${his} annuity is a fulcrum, and with the two, ${he} may move the world someday. You have no doubt that, at the very least, ${he} will be far from the poorest of your citizens.`);
		}
		App.Events.addParagraph(desc, r);
		r = [];
		r.push(`As ${he} takes ${his} leave, heading the short distance down to ${his} modest little apartment, ${he} presents a strange appearance. ${He}'s wearing cheap but not unattractive clothing, and you are struck by a crystal-clear mental image of what ${he} looks like nude.`);
		if (slave.fetish !== Fetish.MINDBROKEN) {
			if (slave.devotion > 20) {
				if (slave.devotion > 95) {
					r.push(`${He}'s doing ${his} absolute best not to sob, but ${his} lips are quivering.`);
				} else {
					r.push(`${He} looks like ${he} might cry.`);
				}
				if (!canTalk(slave)) {
					r.push(`${He} gestures ${his} thanks, and ironically indicates that ${he}'ll see you around.`);
				} else {
					r.push(Spoken(slave, `"Well, thanks, ${Master}, um, I mean ${V.PC.slaveName}. I g-guess I'll see you around${(!canSee(slave)) ? `, uh, as they say` : ``}. I mean, the arcology. Anyway. Bye."`));
				}
				if (slave.devotion > 95) {
					r.push(`${He} turns resolutely away and flees, trying to choke back ${his} tears.`);
				} else {
					r.push(`${He} turns resolutely away.`);
				}
			}
		}
		App.Events.addParagraph(desc, r);
		r = [];
		if (slave.relationship === -3) {
			r.push(`When you return to your desk you realize something.`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`The ring ${he} wore when ${he} was your slave ${wife} is nowhere to be seen; ${he}'s likely forgotten ${he} was wearing it, but no matter: you can always get more.`);
			} else if (slave.devotion + slave.trust >= 175) {
				r.push(`The ring ${he} wore when ${he} was your slave ${wife} is nowhere to be seen; ${he}'s likely taken it with ${him} to remember you by.`);
			} else if (slave.devotion < -20 && slave.trust > 20) {
				r.push(`The ring ${he} wore when ${he} was your slave ${wife} is nowhere to be seen; ${he}'s likely taken it with ${him} to either try and pawn or to dispose of. It doesn't matter: you can always get more.`);
			} else if (slave.devotion < -20) {
				r.push(`The ring ${he} wore when ${he} was your slave ${wife} was left on your desk; ${he} likely ripped it off as soon as ${he} was free.`);
			} else {
				r.push(`The ring ${he} wore when ${he} was your slave ${wife} is nowhere to be seen; ${he}'s either taken it with ${him} as a souvenir, or left it back in ${his} sleeping area. If it's the former, no matter: you can always get more.`);
			}
			App.Events.addNode(el, r, "div");
			r = [];
		}

		r.push(`Your arcology has gained a well-off citizen.`);
		V.upperClass += 1;

		if (slave.energy > 50) {
			if (slave.devotion > 20) {
				App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
					`See ${him} around`,
					() => {
						const r = [];
						const el = new DocumentFragment();
						r.push(`Later that week,`);
						if (V.club > 0) {
							r.push(`as you take an evening to enjoy ${V.clubName} in person,`);
						} else {
							r.push(`out in one of ${V.arcologies[0].name}'s better clubs,`);
						}
						r.push(`you run into ${slave.slaveName}. ${He} looks good, and happy, and is not at all displeased to see you. ${He} sidles up to you and makes it clear without a`);
						if (!canTalk(slave)) {
							r.push(`gesture`);
						} else {
							r.push(`word`);
						}
						r.push(`that ${he}'s quite eager to fuck you as a free ${woman}.`);
						if (slave.relationship === -3) {
							if (slave.devotion + slave.trust >= 175) {
								r.push(`When ${he} knows ${he} has your attention, ${he} flashes`);
								if (hasAnyArms(slave)) {
									r.push(`${his} hand, revealing the steel ring that ${he} wore when ${he} was your slave ${wife}.`);
								} else {
									r.push(`the steel ring that ${he} wore when ${he} was your slave ${wife} attached to the same chain you placed around ${his} neck on your wedding.`);
								}
								r.push(`Even though the ring is meaningless to society, it holds a special meaning to you and ${him}.`);
							} else {
								r.push(`When ${he} knows ${he} has your attention, ${he} produces the steel ring that ${he} wore when ${he} was your slave ${wife}. ${He} doesn't put it on, but ${he} kisses it suggestively before putting it back in ${his} purse.`);
							}
						}
						if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1) {
							r.push(`Taking the lead as you know ${he} prefers, you lead ${him} to a private booth and make love to ${him}, holding ${him} down with the gentle but firm grip that never fails to bring ${him} through a long and gasping climax.`);
						} else if (slave.fetish === Fetish.CUMSLUT && slave.fetishKnown === 1) {
							r.push(`${He}`);
							if (V.PC.dick !== 0) {
								r.push(`sucks your dick`);
								if (V.PC.vagina !== -1) {
									r.push(`and`);
								}
							}
							if (V.PC.vagina !== -1) {
								r.push(`eats you out`);
							}
							r.push(`right there, eagerly`);
							if (slave.vagina > -1) {
								r.push(`jilling off`);
							} else {
								r.push(`jacking off`);
							}
							r.push(`as ${he} enjoys your infinitely familiar`);
							if (canTaste(slave) && canSmell(slave)) {
								r.push(`taste and scent.`);
							} else if (canTaste(slave)) {
								r.push(`taste.`);
							} else if (canSmell(slave)) {
								r.push(`scent.`);
							} else {
								r.push(`body.`);
							}
						} else if (slave.fetish === Fetish.HUMILIATION && slave.fetishKnown === 1) {
							r.push(`You take ${him} right there, the humiliation slut getting what ${he} came to the club to get: an opportunity to orgasm in public with many eyes enjoying the sight of ${his} pleasure.`);
						} else if (slave.fetish === Fetish.BUTTSLUT && slave.fetishKnown === 1) {
							r.push(`Your`);
							if (V.PC.dick !== 0) {
								r.push(`dick is`);
							} else {
								r.push(`fingers are`);
							}
							r.push(`up ${his} ass in no time, and ${he}'s so primed for anal that ${he} climaxes with indecent speed. ${He} begs you to keep fucking ${his} butt, and you do.`);
						} else if (slave.fetish === Fetish.BOOBS && slave.fetishKnown === 1) {
							r.push(`${He} grinds shamelessly against you, your hands holding ${his} breasts just the way you know ${he} loves them held. Your`);
							if (V.PC.boobs >= 300) {
								r.push(`own tits press softly`);
							} else if (V.PC.title === 0) {
								r.push(`flat chest presses`);
							} else {
								r.push(`manly chest presses`);
							}
							r.push(`against ${his} back as ${he} cranes back to kiss you.`);
						} else if (slave.fetish === Fetish.PREGNANCY && slave.fetishKnown === 1) {
							r.push(`${He} begs shamelessly for your seed, right here and right now, and`);
							if (V.PC.dick !== 0) {
								r.push(`you give it to ${him}, producing the usual perverted orgasm as ${he} feels it inside ${him}.`);
							} else {
								r.push(`as usual, ${he} doesn't care that the phallus you fuck ${him} with is actually a strap-on. ${He} manages to pretend it's a cock knocking ${him} up.`);
							}
						} else if (slave.fetish === Fetish.DOM && slave.fetishKnown === 1) {
							r.push(`After some mutually aggressive dancing that leaves you both panting and sweaty, you work together to attract another free dancer, a ${girlU} who ${slave.slaveName} had ${his} eye on already. Before long, the poor ${girlU} is screaming with orgasm in a private booth as you take ${himU} together.`);
						} else if (slave.fetish === Fetish.SADIST && slave.fetishKnown === 1) {
							r.push(`After some mutually aggressive dancing that leaves you both panting and sweaty, you mutually select one of the club's slaves, and drag ${himU} back to a private booth. Before long, ${hisU} screams for mercy are audible on the floor.`);
						} else if (slave.fetish === Fetish.MASOCHIST && slave.fetishKnown === 1) {
							r.push(`You don't have the setup for really elaborate pain, so you fuck ${him} hard and fast, to give ${him} that edge of discomfort that ${he} now requires to get off. ${He} gasps as ${he} gets what ${he} needs, not free of ${his} perversions despite ${his} status as a citizen.`);
						} else {
							r.push(`You remember ${his} uncomplicated tastes well, though the total confidence that ${his} willingness and pleasure are unfeigned is novel. You dance, you laugh, and you make love to ${him}, all through the night.`);
						}
						App.Events.addNode(el, r);
						jQuery(result).empty().append(el);
					}
				));
				if (lover) {
					App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
						`Send ${his} ${girl2} into retirement with ${him}`,
						() => {
							const el = new DocumentFragment();
							let r = [];
							if (V.seeImages) {
								let colDiv = document.createElement("div");
								colDiv.classList.add("imageColumn");
								App.UI.DOM.drawOneSlaveRight(colDiv, slave);
								App.UI.DOM.drawOneSlaveRight(colDiv, lover);
								jQuery(art).replaceWith(colDiv);
							}
							r.push(`${He} doesn't get far before ${he}`);
							if (canHear(slave)) {
								r.push(`hears a desperate pursuit behind ${him}.`);
							} else {
								r.push(`feels a gentle tap on ${his} shoulder.`);
							}
							r.push(`It's ${contextualIntro(slave, lover)},`);
							if (canHear(slave)) {
								r.push(`hurrying to catch`);
							} else {
								r.push(`finally catching`);
							}
							r.push(`up. Watching on the monitors, you see ${slave.slaveName}'s mixed pleasure and pain at seeing ${him2} again so soon, followed by a tearful explanation and an embrace so heartfelt that the pair of ex-slaves collapse to the floor together, sobbing.`);
							removeSlave(lover);
							App.Events.addParagraph(el, r);
							r = [];
							if (FutureSocieties.isActive('FSPaternalist')) {
								r.push(`Of course, your paternalistic arcology thinks this <span class="green">almost too romantic,</span> and there are jesting suggestions that outcomes this adorable ought to be illegal. The pair becomes celebrated citizens immediately.`);
								repX(10 * V.FSSingleSlaveRep * (V.arcologies[0].FSPaternalist / V.FSLockinLevel), "futureSocieties");
								V.arcologies[0].FSPaternalist += 0.1 * V.FSSingleSlaveRep;
							} else {
								r.push(`Though it is not ordinarily paternalistic, even your society thinks this is <span class="green">pretty romantic.</span>`);
								repX(5 * V.FSSingleSlaveRep, "futureSocieties");
							}
							App.Events.addParagraph(el, r);
							App.UI.DOM.appendNewElement("p", result, "You have gained an additional well-off citizen.");
							V.upperClass += 1;

							jQuery(result).empty().append(el);
						}
					));
				}
			}
		}
	} else if (V.policies.retirement.fate === "bioreactor") {
		r.push(`in a way that will inevitably fill the rest of your property with <span class="gold">fear.</span>`);
		for (const s of V.slaves) {
			s.trust -= 3;
		}

		if (lover) {
			r.push(`${lover.slaveName}, for ${his2} part, is <span class="mediumorchid">horrified.</span>`);
			lover.devotion -= 20;
		}
		App.Events.addParagraph(desc, r);
		r = [];

		r.push(`${He} is retiring into a featureless existence where the only realities are the phalli ejaculating food, fluid, and drugs into ${his}`);
		if (slave.vagina > -1) {
			r.push(`vagina,`);
		}
		r.push(`anus, and throat,`);
		if (slave.balls > 0) {
			r.push(`the relentless sodomy forcing semen out of ${his} distended balls,`);
		}
		r.push(`and the milk flowing into the milkers tugging at ${his} painfully engorged nipples.`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He}'s already broken in spirit, and ${he} complies with ${his} installation into a milking machine with the dumb obedience of the animal ${he} has become.`);
		} else if (slave.devotion > 20) {
			r.push(`${He} complies with ${his} installation into a milking machine with the dumb obedience of someone whose mind will not allow them to understand their true situation out of simple immediate self-preservation.`);
		} else if (slave.trust < 50) {
			r.push(`${He} is so terrified of punishment that ${he} complies with ${his} installation into a milking machine to avoid pain. ${He} knows that if ${he} does not obey, there will be pain, and if ${he} obeys, there may be pain but it will come later.`);
		} else {
			r.push(`${He} resists, of course, giving the compliance systems an excuse to unload quite a few volts of electricity into ${him}. This disobedience is one of ${his} more abortive attempts to resist your will, and it is ${his} last.`);
		}
		App.Events.addParagraph(desc, r);
		r = [];

		r.push(`It will take ${him} some time to reach full production, a state that ${he}'ll be kept in until it becomes impossible for the most reckless drug regime to keep ${him} there. Near the end of the week, you check in on ${him} idly. ${His} breasts are already swelling under the hormonal treatments that can only be applied when the sole priority is production. The rhythm of the milkers gives them a slight pulsing heave, first one, then the other. ${His} milk whitens the lines running away from ${his} udders.`);
		App.Events.addParagraph(desc, r);
		r = [];

		App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Have a taste`,
			() => {
				const el = new DocumentFragment();
				App.UI.DOM.appendNewElement("p", el, `You tug one of the milkers off a nipple, producing a lewd sucking noise as the wet flesh pops free of the machinery. It must have been quite painful, but the feeding apparatus that covers much of the slave's face affords no indication of ${his} reaction, if any. You heft the boob with both hands and take the nipple into your mouth, sucking gently. A rich jet of cream hits your tongue, the milkfat luscious with hints of vanilla. The warm breastflesh fills your hands, and you fancy that you can feel the prosperity under your fingers as ${his} body desperately hurries to make more.`);
				jQuery(result).empty().append(el);
			}
		));
		r.push(`You have <span class="yellowgreen">gained a standard bioreactor.</span>`);
		App.Events.addParagraph(result, r);
		V.menialBioreactors += 1;
	} else if (V.policies.retirement.fate === "arcade") {
		r.push(`in a way that will inevitably fill the rest of your property with <span class="gold">fear.</span>`);
		for (const s of V.slaves) {
			s.trust -= 3;
		}

		if (lover) {
			r.push(`${lover.slaveName}, for ${his2} part, is <span class="mediumorchid">horrified.</span>`);
			lover.devotion -= 20;
		}
		App.Events.addParagraph(desc, r);
		r = [];

		r.push(`${He} is retiring into a dark, featureless eternity in which the only realities are phalli intruding into ${his}`);
		if (slave.vagina > -1) {
			r.push(`vagina,`);
		}
		r.push(`anus, and throat, and the drug-induced haze that will leave ${him} no choice but to orgasm when ${he} is penetrated.`);
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He}'s already broken in spirit, and ${he} complies with the conversion process with the dumb obedience of the animal ${he} has become.`);
		} else if (slave.devotion > 20) {
			r.push(`${He} complies with the conversion process with the dumb obedience of someone whose mind will not allow them to understand their true situation out of simple immediate self-preservation.`);
		} else if (slave.trust < 50) {
			r.push(`${He} is so terrified of punishment that ${he} complies with the conversion process to avoid pain. ${He} knows that if ${he} does not obey, there will be pain, and if ${he} obeys, there may be pain but it will come later.`);
		} else {
			r.push(`${He} resists, of course, giving the compliance systems an excuse to unload quite a few volts of electricity into ${him}. This disobedience is one of ${his} more abortive attempts to resist your will, and it is ${his} last.`);
		}
		App.Events.addParagraph(desc, r);
		r = [];

		r.push(`${He} is brought down to`);
		if (V.arcade !== 0) {
			r.push(`${V.arcadeName},`);
		} else {
			r.push(`the autosurgery,`);
		}
		r.push(`and, a disturbingly short time later, there is a new Fuckdoll, a humanoid figure encased in a tough black bodysuit, in your office.`);
		if (!hasAnyLegs(slave)) {
			r.push(`Its`);
			if (isAmputee(slave)) {
				r.push(`limbless`);
			} else {
				r.push(`legless`);
			}
			r.push(`form is not obviously human. It's a sex toy, with several interesting holes and nothing else worth noticing.`);
		} else {
			r.push(`It stands immobile, the hydraulic system hidden within the suit stiffened to make voluntary movement impossible.`);
		}
		if (slave.boobs > 2000) {
			r.push(`The suit has a pair of gaps for its monstrous breasts, bare expanses of ${slave.skin} skin.`);
		}
		if (slave.belly >= 5000) {
			r.push(`The suit has a gap for its big belly; a round dome of ${slave.skin} skin.`);
		}
		if (slave.lips > 40) {
			r.push(`Its upper hole is surrounded by a ludicrous set of swollen lips.`);
		}
		if (slave.labia > 0) {
			r.push(`The conversion process left its labia permanently engorged.`);
		}
		if (slave.vaginaLube > 0) {
			r.push(`Its front hole is dripping streams of natural lubrication.`);
		}
		if (slave.anus > 2) {
			r.push(`The gap in the suit over its rear hole opens into the Fuckdoll's interior, since it's the same size as the Fuckdoll's loose sphincter.`);
		}
		App.Events.addParagraph(desc, r);
		r = [];

		const fuck = App.UI.DOM.appendNewElement("div", result, App.UI.DOM.link(
			`Fuck it`,
			() => {
				const r = [];
				if (V.PC.dick !== 0) {
					r.push(`You enter a command, and the Fuckdoll instantly`);
					if (hasAnyLegs(slave)) {
						r.push(`collapses to its knee${(hasBothLegs(slave)) ? `s` : ``}.`);
					} else {
						r.push(`presents its upper hole.`);
					}
					r.push(`You tug the plug clear of its upper hole, and insert your cock. The Fuckdoll's nose ports open when it needs to breathe, but periodically close without warning to force its throat to spasm. When you're bored of this, you pull your dick clear and haul the Fuckdoll over to the couch, entering the command that forces it to present its rear hole. Your saliva-slicked shaft slides readily inside the sex toy's warm interior. After a while, you enter the tightening command, and the Fuckdoll's sphincter obediently cinches down, encouraging you to shoot your load inside it. A low moaning sound issues from its upper hole.`);
				} else {
					r.push(`You shove the Fuckdoll backward onto the couch, and enter a command that forces it into a bridged position.`);
					if (slave.vagina > -1) {
						r.push(`Its clit is brought to full hardness, and its front hole becomes wet and flushed. You ride this until you orgasm, the Fuckdoll's copious juices adding lewd noises to each grinding motion.`);
					} else {
						r.push(`Its dick is forced to perfect hardness. Its tubes have been tied to prevent any unseemly contamination, allowing you to ride it until you are satisfied. When you're done, the Fuckdoll is allowed to go soft. It did not climax.`);
					}
				}
				r.push(`You leave it where it is, your personal assistant directing a slave to perform maintenance on it when ${heU} has the time.`);
				return jQuery(fuck).empty().append(r.join(" "));
			}
		));

		r.push(`You have <span class="yellowgreen">gained a Fuckdoll.</span>`);
		App.Events.addParagraph(desc, r);
		r = [];
		V.fuckdolls += 1;
	} else {
		r.push(`into a life of menial drudgery. This has little impact on your other human property.`);
		if (lover) {
			r.push(`${lover.slaveName}, for ${his2} part, is <span class="mediumorchid">saddened,</span> but not seriously affected. ${He2} knew this was coming.`);
			lover.devotion -= 5;
		}
		r.push(`There are a thousand things a slave like ${him} can usefully do around the arcology, and ${he}'ll do them. But ${he}'s reached the age where it's time for you and the arcology's citizens to fuck younger ${girl}s.`);

		App.Events.addParagraph(desc, r);
		r = [];
		r.push(`You have <span class="yellowgreen">gained a menial slave.</span>`);
		V.menials += 1;
	}

	App.Events.addNode(el, r);
	App.UI.DOM.appendNewElement("h3", el, `Final notes?`);
	const note = App.UI.DOM.appendNewElement("div", el, null, "note");
	App.UI.DOM.appendNewElement("div", note, `${His} most recent task was to ${(V.assignmentRecords[slave]) ? `${slave.assignment}, and before that to ${V.assignmentRecords[slave]}` : slave.assignment}.`, "indent");
	note.append(slaveImpactLongTerm(slave));

	return el;
};
