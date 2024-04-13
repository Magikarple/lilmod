/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fMarry = function(slave) {
	const {
		His, He,
		his, he, him, himself, wife, girl, women
	} = getPronouns(slave);
	const {title: Master, say: say} = getEnunciation(slave);
	const el = new DocumentFragment();
	let r = [];
	const belly = bellyAdjective(slave);
	const relSlave = getSlave(slave.relationshipTarget);
	const {
		he2, him2, his2
	} = getPronouns(relSlave ? relSlave : {pronoun: App.Data.Pronouns.Kind.plural}).appendSuffix("2");
	const {
		hisP
	} = getPronouns(V.PC).appendSuffix("P");
	const groom = V.PC.title === 1 ? `groom` : `bride`;
	const {
		HeA, HisA,
		heA, hisA, himA, girlA, himselfA, womanA, loliA
	} = getPronouns(assistant.pronouns().main).appendSuffix("A");
	let reactionType;
	r.push(`You tell ${slave.slaveName} that you're going to marry ${him}. (A proposal, of course, would be inappropriate, even in so enlightened a place as your arcology.)`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${He} doesn't react.`);
		reactionType = 0;
	} else if (slave.devotion+slave.trust >= 175) {
		r.push(`You're not exactly lacking in ways to make`);
		if (slave.physicalAge > 30) {
			r.push(`${women}`);
		} else {
			r.push(`${girl}s`);
		}
		r.push(`burst into tears, but this one is unusually effective. When ${he}'s gotten ${himself} under control again,`);
		if (!hasAnyArms(slave)) {
			r.push(`looking somewhat embarrassed that ${he} can't wipe ${his} own tears`);
		} else {
			r.push(`distractedly cuffing away ${his} tears`);
		}
		r.push(`and consciously breathing deeply,`);
		if (canTalk(slave)) {
			r.push(`${he} ${say}s,`);
			if (slave.relationship !== 0) {
				if (slave.relationship === -1) {
					r.push(Spoken(slave, `"I promise I'll try to stop sleeping around so much."`));
				} else if (slave.relationship === 4) {
					r.push(Spoken(slave, `"I'll have to break up with ${relSlave.slaveName}... I'll try to let ${him2} down gently, ${he2}'ll understand."`));
				} else if (slave.relationship === 3) {
					r.push(Spoken(slave, `"${relSlave.slaveName} will miss having sex with me, but ${he2}'ll understand."`));
				} else if (slave.relationship > 0) {
					r.push(Spoken(slave, `"I'll have to stop hanging out with ${relSlave.slaveName}; I'm sure ${he2}'ll understand."`));
				} else {
					r.push(Spoken(slave, `"I've been waiting for this day! I'm so happy!"`));
				}
				r.push(`${He} continues,`);
			}
			r.push(Spoken(slave, `"Thank you, ${Master}. I am going to do my best to be a`));
			if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
				if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(Spoken(slave, `perfect submissive ${wife} to you,`));
				} else if (slave.fetish === "cumslut") {
					r.push(Spoken(slave, `perfect oral ${wife},`));
				} else if (slave.fetish === "humiliation") {
					r.push(Spoken(slave, `hot ${wife} for you,`));
				} else if (slave.fetish === "buttslut") {
					r.push(Spoken(slave, `perfect little anal ${wife},`));
				} else if (slave.fetish === "boobs") {
					if (slave.boobs > 800) {
						r.push(Spoken(slave, `perfect big-boobed`));
					} else {
						r.push(Spoken(slave, `perfect-boobed`));
					}
					r.push(Spoken(slave, `${wife}`));
				} else if (slave.fetish === "pregnancy") {
					r.push(Spoken(slave, `perfect barefoot breeding ${wife},`));
				} else if (slave.fetish === "dom") {
					r.push(Spoken(slave, `perfect, you know, sharing ${wife} with other slaves,`));
				} else if (slave.fetish === "sadist") {
					r.push(Spoken(slave, `perfect ${wife} to use on other slaves,`));
				} else if (slave.fetish === "masochist") {
					r.push(Spoken(slave, `good, beaten ${wife},`));
				} else {
					r.push(Spoken(slave, `good ${wife},`));
				}
			} else {
				r.push(Spoken(slave, `good ${wife},`));
			}
			r.push(Spoken(slave, `${Master}. Oh, thank you, ${Master},"`), `${he} blubbers, and starts crying again.`);
		} else if (!hasAnyArms(slave)) {
			r.push(`${he} painstakingly mouths ${his} thanks, since ${he} cannot speak or use hands to sign.`);
			if (slave.relationship !== 0) {
				r.push(`${He} struggles to tell you`);
				if (slave.relationship === -1) {
					r.push(`that ${he}'ll try to be less of a slut.`);
				} else if (slave.relationship === 4) {
					r.push(`that ${he}'ll try to let ${his} lover ${relSlave.slaveName} down gently.`);
				} else if (slave.relationship === 3) {
					r.push(`that ${he}'ll try to let ${his} FWB ${relSlave.slaveName} down gently.`);
				} else if (slave.relationship > 0) {
					r.push(`that ${he}'ll have to stop hanging around ${relSlave.slaveName}.`);
				} else {
					r.push(`that ${he} has never been happier.`);
				}
			}
		} else {
			r.push(`${he} shakily signs ${his} thanks twice in a row before breaking down again.`);
			if (slave.relationship !== 0) {
				r.push(`${He} regains composure enough to continue signing out`);
				if (slave.relationship === -1) {
					r.push(`that ${he}'ll try to be less of a slut.`);
				} else if (slave.relationship === 4) {
					r.push(`that ${he}'ll try to let ${his} lover ${relSlave.slaveName} down gently.`);
				} else if (slave.relationship === 3) {
					r.push(`that ${he}'ll try to let ${his} FWB ${relSlave.slaveName} down gently.`);
				} else if (slave.relationship > 0) {
					r.push(`that ${he}'ll have to stop hanging around ${relSlave.slaveName}.`);
				} else {
					r.push(`that ${he} has never been happier.`);
				}
			}
		}
		r.push(`Despite ${his} devotion and trust, ${he} is still a slave, and probably knows that ${his} position could always change. This brings ${him} one step closer to true permanence, and ${he} knows it.`);
		reactionType = 1;
	} else if (slave.devotion < -20 && slave.trust > 20) {
		r.push(`You're not exactly lacking in ways to make`);
		if (slave.physicalAge > 30) {
			r.push(women);
		} else {
			r.push(`${girl}s`);
		}
		r.push(`burst into tears, but this one is surprisingly effective. It seems ${slave.slaveName} does not want to marry you, if ${his} prolonged, anguished sobbing is anything to go by. However, ${he} would have to be a fool to think there's any way out of it.`);
		if (canTalk(slave)) {
			r.push(`${He} ${say}s,`, Spoken(slave, `"Please ${Master}, I don't want to`));
			if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
				if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(Spoken(slave, `be your little submissive fucktoy,`));
				} else if (slave.fetish === "cumslut") {
					r.push(Spoken(slave, `be your cum sucker,`));
				} else if (slave.fetish === "humiliation") {
					r.push(Spoken(slave, `be stripped bare and shown off,`));
				} else if (slave.fetish === "buttslut") {
					r.push(Spoken(slave, `have things shoved up my butt,`));
				} else if (slave.fetish === "boobs") {
					r.push(Spoken(slave, `have my tits teased every night,`));
				} else if (slave.fetish === "pregnancy") {
					if (canGetPregnant(slave)) {
						r.push(Spoken(slave, `get knocked up by you,`));
					} else {
						r.push(Spoken(slave, `be your pregnant toy,`));
					}
				} else if (slave.fetish === "dom") {
					r.push(Spoken(slave, `have to rule your sissy dick,`));
				} else if (slave.fetish === "sadist") {
					r.push(Spoken(slave, `spank your ass,`));
				} else if (slave.fetish === "masochist") {
					r.push(Spoken(slave, `get beaten by you,`));
				} else {
					r.push(Spoken(slave, `stay in your nice room,`));
				}
			} else {
				r.push(Spoken(slave, `stay in your nice room,`));
			}

			r.push(Spoken(slave, `${Master}. You're a terrible person, ${Master},"`), `${he} blubbers, and starts crying again.`);
			if (slave.relationship !== 0) {
				if (slave.relationship === -1) {
					r.push(Spoken(slave, `"I'll never be satisfied by just you!"`));
				} else if (slave.relationship === 4) {
					r.push(Spoken(slave, `"I love ${relSlave.slaveName}, not you ${Master}! You'll never be as good as ${him2}!"`));
				} else if (slave.relationship === 3) {
					r.push(Spoken(slave, `"But I like having sex with ${relSlave.slaveName}, not you ${Master}! You'll never be as good as ${him2}!"`));
				} else if (slave.relationship > 0) {
					r.push(Spoken(slave, `"But I like spending time with ${relSlave.slaveName}, ${he2}'s so much nicer to be around than you, ${Master}."`));
				} else {
					r.push(Spoken(slave, `"I need you in my life, ${Master}, so why don't you bend down like the bitch you are and`));
					if (slave.dick > 0) {
						r.push(`suck my dick,`);
					} else if (slave.vagina > -1) {
						r.push(`eat me out,`);
					} else {
						r.push(`lick my ass,`);
					}
					r.push(`${Master}?"`);
				}
			}
		} else if (!hasAnyArms(slave)) {
			r.push(`${he} painstakingly mouths ${his} displeasure, since ${he} cannot speak or use hands to sign.`);
			if (slave.relationship !== 0) {
				if (slave.relationship === -1) {
					r.push(`${He} desperately tries to explain that you'll never satisfy ${him}.`);
				} else if (slave.relationship === 4) {
					r.push(`${He} desperately tries to explain that ${his} love, ${relSlave.slaveName}, is better than you'll ever be.`);
				} else if (slave.relationship === 3) {
					r.push(`${He} desperately tries to explain that ${his} lover, ${relSlave.slaveName}, satisfies ${his} far better than you can.`);
				} else if (slave.relationship > 0) {
					r.push(`${He} desperately tries to explain ${his} friend, ${relSlave.slaveName}, is so much more enjoyable to be around than you.`);
				} else {
					r.push(`${He} wiggles ${his} nethers at you, as if trying to tell you to do something.`);
				}
			}
		} else {
			r.push(`${he} shakily makes a rather rude hand gesture before crying more.`);
			if (slave.relationship !== 0) {
				if (slave.relationship === -1) {
					r.push(`${He} also makes it clear that you'll never satisfy ${him}.`);
				} else if (slave.relationship === 4) {
					r.push(`${He} also makes it clear that ${his} love, ${relSlave.slaveName}, is better than you'll ever be.`);
				} else if (slave.relationship === 3) {
					r.push(`${He} also makes it clear that ${his} lover, ${relSlave.slaveName}, satisfies ${him} far better than you can.`);
				} else if (slave.relationship > 0) {
					r.push(`${He} also makes it clear ${his} friend, ${relSlave.slaveName}, is so much more enjoyable to be around than you.`);
				} else {
					r.push(`On top of the prior gesturing, ${he} adds another, lewder one involving you and ${his} crotch.`);
				}
			}
		}
		r.push(`Despite ${his} "fortune", ${he} is still a slave, and undoubtedly knows that ${his} position could easily change should you tire of ${him}. ${His} tears may not all be genuine either, you have a feeling ${he} may be trying to take advantage of you.`);
		reactionType = 2;
	} else if (slave.devotion < -20) {
		r.push(`You're not exactly lacking in ways to make`);
		if (slave.physicalAge > 30) {
			r.push(`${women}`);
		} else {
			r.push(`${girl}s`);
		}
		r.push(`burst into tears, but this one is unusually effective. It seems ${slave.slaveName} does not want to marry you, if ${his} prolonged, anguished sobbing is anything to go by. However, ${he} would have to be a fool to think there's any way out of it. You lean in and whisper that`);
		if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`${he}'ll make the perfect submissive ${wife} for you dominate.`);
			} else if (slave.fetish === "cumslut") {
				r.push(`${he}'ll make the perfect oral ${wife} for your`);
				if (V.PC.dick > 0 && V.PC.vagina >= 0) {
					r.push(`dick and pussy`);
				} else if (V.PC.dick > 0) {
					r.push(`cock`);
				} else {
					r.push(`pussy`);
				}
				r.push(`to enjoy.`);
			} else if (slave.fetish === "humiliation") {
				r.push(`${he}'ll make a hot ${wife} for you to parade around naked.`);
			} else if (slave.fetish === "buttslut") {
				r.push(`${he}'ll make the perfect little anal ${wife}`);
				if (V.PC.dick > 0) {
					r.push(`to keep your dick warm.`);
				} else {
					r.push(`stick things in.`);
				}
			} else if (slave.fetish === "boobs") {
				r.push(`${he}'ll make the`);
				if (slave.boobs > 800) {
					r.push(`perfect big-boobed`);
				} else {
					r.push(`perfect-boobed`);
				}
				r.push(`${wife} for you to bury your head into.`);
			} else if (slave.fetish === "pregnancy") {
				r.push(`${he}'ll make the perfect barefoot breeding ${wife}.`);
				if (V.PC.dick > 0 && canGetPregnant(slave)) {
					r.push(`You poke ${him} with your erection, letting ${him} know what ${he}'s in for.`);
				}
			} else if (slave.fetish === "dom") {
				r.push(`${he}'ll make the perfect dominant ${wife} to force upon ${his} closest friends.`);
			} else if (slave.fetish === "sadist") {
				r.push(`${he}'ll make the perfect cruel ${wife} to force upon ${his} closest friends.`);
			} else if (slave.fetish === "masochist") {
				r.push(`${he}'ll make a good, beaten ${wife}.`);
			} else {
				r.push(`${he}'ll make a good ${wife}.`);
			}
		} else {
			r.push(`${he}'ll make a good ${wife}.`);
		}
		if (canTalk(slave)) {
			r.push(Spoken(slave, `"${Master}. Please, ${Master}, don't make me do this. I don't want this!"`), `${he} blubbers, and starts crying again.`);
			if (slave.relationship !== 0) {
				if (slave.relationship === -1) {
					r.push(Spoken(slave, `"I need a new dick in me every night! How can I be satisfied like this?!"`));
				} else if (slave.relationship === 4) {
					r.push(Spoken(slave, `"I love ${relSlave.slaveName}! Please don't split us up ${Master}! I'll be a good ${girl}, ${Master}, please!"`));
				} else if (slave.relationship === 3) {
					r.push(Spoken(slave, `"I love playing around with ${relSlave.slaveName}! Please don't split us up ${Master}! I'll be a good ${girl}, ${Master}, please!"`));
				} else if (slave.relationship > 0) {
					r.push(Spoken(slave, `"But I like spending time with ${relSlave.slaveName}! Please don't split us up ${Master}! I'll be a good ${girl}, ${Master}, please!"`));
				} else {
					r.push(Spoken(slave, `"I need you in my life, ${Master}, but not like this, please?"`));
				}
			}
		} else if (!hasAnyArms(slave)) {
			r.push(`${He} painstakingly pleads with you, since ${he} cannot speak or use hands to sign.`);
			if (slave.relationship !== 0) {
				if (slave.relationship === -1) {
					r.push(`${He} desperately tries to explain that ${he} needs multiple partners.`);
				} else if (slave.relationship === 4) {
					r.push(`${He} desperately begs you to not separate ${him} from ${his} love, ${relSlave.slaveName}.`);
				} else if (slave.relationship === 3) {
					r.push(`${He} desperately begs you to not separate ${him} from ${his} lover, ${relSlave.slaveName}.`);
				} else if (slave.relationship > 0) {
					r.push(`${He} desperately begs you to not separate ${him} from ${his} friend, ${relSlave.slaveName}.`);
				} else {
					r.push(`${He} desperately begs you to not marry ${him}, despite ${his} emotional connection with you.`);
				}
			}
		} else {
			r.push(`${He} desperately struggles to plead with you before breaking down again.`);
			if (slave.relationship !== 0) {
				if (slave.relationship === -1) {
					r.push(`${He} tries to explain that ${he} needs multiple partners.`);
				} else if (slave.relationship === 4) {
					r.push(`${He} begs you to not separate ${him} from ${his} love, ${relSlave.slaveName}.`);
				} else if (slave.relationship === 3) {
					r.push(`${He} begs you to not separate ${him} from ${his} lover, ${relSlave.slaveName}.`);
				} else if (slave.relationship > 0) {
					r.push(`${He} begs you to not separate ${him} from ${his} friend, ${relSlave.slaveName}.`);
				} else {
					r.push(`${He} begs you to not marry ${him}, despite ${his} emotional connection with you.`);
				}
			}
		}
		r.push(`You leave ${him} to weep and consider ${his} fate. Despite ${his} "fortune", ${he} is still a slave, and undoubtedly knows that ${his} position could easily change should you tire of ${him}.`);
		reactionType = 2;
	} else {
		r.push(`${He} doesn't really react to this. By no means does ${he} want to be your ${wife}, but ${he}'s obedient enough to know that you are in charge. You leave ${him} to ${his} business, and go back to yours.`);
		if (slave.relationship !== 0) {
			if (slave.relationship === -1) {
				r.push(`${He} sighs at the realization that ${he} won't be allowed to be so promiscuous and will have to learn to focus ${his} attention on you.`);
			} else if (slave.relationship === 4) {
				r.push(`${He} sighs at the realization that ${he}'ll have to stop seeing ${his} love, ${relSlave.slaveName}.`);
			} else if (slave.relationship === 3) {
				r.push(`${He} sighs at the realization that ${he}'ll have to stop spending so much time with ${his} lover, ${relSlave.slaveName}.`);
			} else if (slave.relationship > 0) {
				r.push(`${He} sighs at the realization that ${he}'ll have to stop spending so much time with ${his} friend, ${relSlave.slaveName}.`);
			} else {
				r.push(`Deep down, ${he} dreamed of this. But now that it's happening ${he} can't shake the feeling of regret.`);
			}
		}
		reactionType = 3;
	}
	App.Events.addParagraph(el, r);
	r = [];

	r.push(`${capFirstChar(V.assistant.name)} prompts you for wedding`);
	if (V.assistant.personality <= 0) {
		r.push(`instructions.`);
	} else {
		r.push(`instructions, ${hisA}`);
		if (V.assistant.appearance === "monstergirl") {
			r.push(`monster${girlA} avatar appearing in a surprisingly conventional surplice that covers ${himA} up decently. All except for ${hisA} horns, which protrude from under the headpiece.`);
		} else if (V.assistant.appearance === "shemale") {
			r.push(`shemale avatar appears in a collar patterned to look like a minister's, and absolutely nothing else, stroking ${himselfA} with anticipation.`);
		} else if (V.assistant.appearance === "amazon") {
			r.push(`amazon avatar wearing a tribal shaman's cape and carrying a medicine stick adorned with all sorts of little charms and baubles.`);
		} else if (V.assistant.appearance === "businesswoman") {
			r.push(`business${womanA} avatar looking rather severe in a minister's collar.`);
		} else if (V.assistant.appearance === "fairy") {
			r.push(`fairy avatar looking incredibly silly, dressed in an oversized, disheveled priest's robes and looking rather smug about it.`);
		} else if (V.assistant.appearance === "pregnant fairy") {
			r.push(`fairy avatar looking incredibly silly, dressed in an oversized, disheveled priest's robes stretched tight by ${hisA} pregnant belly and looking rather smug about it.`);
		} else if (V.assistant.appearance === "goddess") {
			r.push(`goddess avatar completely unchanged, since ${heA} considers ${hisA} usual form perfectly appropriate for a marriage.`);
		} else if (V.assistant.appearance === "hypergoddess") {
			r.push(`goddess avatar completely unchanged, since ${heA} considers ${hisA} usual form perfectly appropriate for a marriage.`);
		} else if (V.assistant.appearance === "loli") {
			r.push(`${loliA} avatar looking surprisingly mature in a minister's collar. Though, ${heA} would rather be the flower ${girlA} in this wedding.`);
		} else if (V.assistant.appearance === "preggololi") {
			r.push(`${loliA} avatar looking surprisingly mature in a minister's collar. Though, ${heA} would rather be the flower ${girlA} in this wedding.`);
		} else if (V.assistant.appearance === "schoolgirl") {
			r.push(`school${girlA} avatar looking willfully absurd in a minister's collar and ${hisA} usual short plaid skirt.`);
		} else if (V.assistant.appearance === "angel") {
			r.push(`angelic avatar looking, well, angelic in ${hisA} usual garb with an added minister's collar.`);
		} else if (V.assistant.appearance === "cherub") {
			r.push(`angelic avatar looking absurd in ${hisA} oversized robe, complete with wing-holes, and minister's collar.`);
		} else if (V.assistant.appearance === "incubus") {
			r.push(`demonic avatar completely unchanged, since ${heA} considers ${hisA} usual form perfectly appropriate for a marriage, though ${heA} has made sure to be fully erect for the wedding.`);
		} else if (V.assistant.appearance === "succubus") {
			r.push(`demonic avatar wearing nothing but a minister's collar. ${HeA} has brought several marital aids along with ${himA} to tease the bride and groom with.`);
		} else if (V.assistant.appearance === "imp") {
			r.push(`demonic avatar looking absurd in ${hisA} oversized robe, complete with wing-holes, and minister's collar.`);
		} else if (V.assistant.appearance === "witch") {
			r.push(`witchy avatar looking rather formal in a fine robe and minister's collar.`);
		} else if (V.assistant.appearance === "ERROR_1606_APPEARANCE_FILE_CORRUPT") {
			r.push(`twitching avatar completely unchanged, sans a bulbous ring of flesh around ${hisA} neck that sort of resembles a minister's collar.`);
		} else {
			r.push(`symbol appearing in white.`);
		}
	}
	App.Events.addParagraph(el, r);
	const planned = () => {
		if (V.weddingPlanned === 1) {
			return `a straightforward ceremony`;
		} else if (V.weddingPlanned === 2) {
			return `an orgiastic ceremony`;
		} else if (V.weddingPlanned === 3) {
			return `an impregnation ceremony`;
		}
	};

	const events = [
		new App.Events.Result(`Just redesignate ${him} as your slave wife`, designate),
		new App.Events.Result(`Have your assistant marry ${him} to you`, marryNow),
	];
	events.push(new App.Events.Result(null, null, `Invite prominent citizens to a wedding: `));
	if (V.cash > 10000) {
		if (V.weddingPlanned === 0 || V.weddingPlanned === 1) {
			events.push(new App.Events.Result(`Straightforward ceremony`, straightforward, `This will cost ${cashFormat(10000)}`));
		} else {
			events.push(new App.Events.Result(null, null, `You are already hosting ${planned()} and cannot host a straightforward ceremony`));
		}
		if (slave.vagina !== 0 && slave.anus !== 0) {
			if (V.weddingPlanned === 0 || V.weddingPlanned === 2) {
				events.push(new App.Events.Result(`Orgiastic ceremony`, orgiastic, `This will involve the slave having sex with a very large number of citizens, and will cost ${cashFormat(10000)}`));
			} else {
				events.push(new App.Events.Result(null, null, `You are already hosting ${planned()} and cannot host an orgiastic ceremony`));
			}
		}
		if (isFertile(slave) && V.PC.dick !== 0) {
			if (V.weddingPlanned === 0 || V.weddingPlanned === 3) {
				events.push(new App.Events.Result(`Impregnation ceremony`, impregnation, `This will involve you impregnating the slave, and will cost ${cashFormat(10000)}`));
			} else {
				events.push(new App.Events.Result(null, null, `You are already hosting ${planned()} and cannot host an impregnation ceremony`));
			}
		}
	} else {
		events.push(new App.Events.Result(null, null, `You cannot afford an elaborate ceremony`));
	}
	App.Events.addResponses(el, events);
	return el;

	function designate() {
		let r = [];
		const el = new DocumentFragment();
		r.push(`You order ${V.assistant.name} to simply redesignate ${slave.slaveName} as your slave ${wife}.`);
		if (V.assistant.personality <= 0) {
			r.push(`"Slave redesignated," it responds immediately. The thing is done.`);
		} else {
			if (V.assistant.appearance === "monstergirl") {
				r.push(`${HisA} avatar snaps ${hisA} fingers and shrugs off ${hisA} surplice, revealing ${hisA} tentacle hair, pale skin, and cocks once more.`);
			} else if (V.assistant.appearance === "shemale") {
				r.push(`${HisA} avatar snaps ${hisA} fingers and starts to masturbate more energetically.`);
			} else if (V.assistant.appearance === "amazon") {
				r.push(`${HisA} avatar gives ${hisA} medicine stick a shake.`);
			} else if (V.assistant.appearance === "businesswoman") {
				r.push(`${HisA} avatar snaps ${hisA} fingers.`);
			} else if (V.assistant.appearance.includes("fairy")) {
				r.push(`${HisA} avatar claps ${hisA} hands twice, looking a bit disappointed at the lack of celebration.`);
			} else if (V.assistant.appearance.includes("goddess")) {
				r.push(`${HisA} avatar makes a complex hand gesture, looking beatific.`);
			} else if (V.assistant.appearance.includes("loli")) {
				r.push(`${HisA} avatar claps ${hisA} hands together.`);
			} else if (V.assistant.appearance === "schoolgirl") {
				r.push(`${HisA} avatar snaps ${hisA} fingers and gives a little twirl.`);
			} else if (V.assistant.appearance === "angel") {
				r.push(`${HisA} avatar spreads ${hisA} wings and arms and emits a flash of light.`);
			} else if (V.assistant.appearance === "cherub") {
				r.push(`${HisA} avatar claps ${hisA} hands together, emitting a burst of light.`);
			} else if (V.assistant.appearance === "incubus") {
				r.push(`${HisA} avatar flicks the tip of ${hisA} penis and blows ${hisA} load towards the both of you.`);
			} else if (V.assistant.appearance === "succubus") {
				r.push(`${HisA} avatar starts to masturbate furiously and orgasms lewdly.`);
			} else if (V.assistant.appearance === "imp") {
				r.push(`${HisA} avatar claps ${hisA} hands together, emitting a burst of darkness.`);
			} else if (V.assistant.appearance === "witch") {
				r.push(`${HisA} avatar pulls out ${hisA} spell book and attempts a spell to bind you two; ${heA} manages to conjure a large ring around ${himselfA}, pinning ${hisA} arms to ${hisA} sides.`);
			} else if (V.assistant.appearance === "ERROR_1606_APPEARANCE_FILE_CORRUPT") {
				r.push(`${HisA} avatar splits open to reveal a number of tentacles and wraps them around each other.`);
			} else {
				r.push(`${HisA} symbol flashes.`);
			}
			r.push(`"Done," ${heA} says.`);
		}
		if (slave.relationship > 0) {
			slave.relationshipTarget = 0;
			relSlave.relationship = 0;
			relSlave.relationshipTarget = 0;
		}
		if (slave.devotion+slave.trust >= 175) {
			if (slave.relationship > 0) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">disappointed</span> that their relationship had to end and <span class="trust dec">worry</span> for each other's future.`);
				if (slave.relationship === 4) {
					relSlave.devotion -= 5;
					relSlave.trust -= 5;
				} else if (slave.relationship === 3) {
					relSlave.devotion -= 3;
					relSlave.trust -= 3;
				} else {
					relSlave.devotion -= 1;
					relSlave.trust -= 1;
				}
			}
		} else if (slave.devotion < -20) {
			if (slave.relationship === -1) {
				r.push(`${He} <span class="devotion dec">hates</span> that ${he} has to be yours only and <span class="trust dec">fears</span> what will happen if ${he} strays.`);
				slave.devotion -= 40;
				slave.trust -= 40;
			} else if (slave.relationship === 4) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">resent</span> that their relationship had to end and <span class="trust dec">fear</span> for each other's future.`);
				relSlave.devotion -= 40;
				relSlave.trust -= 40;
				slave.devotion -= 40;
				slave.trust -= 40;
			} else if (slave.relationship === 3) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">resent</span> that their relationship had to end and <span class="trust dec">fear</span> for each other's future.`);
				relSlave.devotion -= 30;
				relSlave.trust -= 30;
				slave.devotion -= 30;
				slave.trust -= 30;
			} else if (slave.relationship > 0) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">resent</span> that their relationship had to end and <span class="trust dec">fear</span> for each other's future.`);
				relSlave.devotion -= 20;
				relSlave.trust -= 20;
				slave.devotion -= 20;
				slave.trust -= 20;
			}
		} else {
			if (slave.relationship === -1) {
				r.push(`${He} <span class="devotion dec">dislikes</span> that ${he} has to be yours only and <span class="trust dec">worries</span> what will happen if ${he} strays.`);
				slave.devotion -= 10;
				slave.trust -= 10;
			} else if (slave.relationship === 4) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">resent</span> that their relationship had to end and <span class="trust dec">worry</span> for each other.`);
				relSlave.devotion -= 20;
				relSlave.trust -= 20;
				slave.devotion -= 20;
				slave.trust -= 20;
			} else if (slave.relationship === 3) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">are saddened</span> that their relationship had to end and <span class="trust dec">worry</span> for each other.`);
				relSlave.devotion -= 10;
				relSlave.trust -= 10;
				slave.devotion -= 10;
				slave.trust -= 10;
			} else if (slave.relationship > 0) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">are disappointed</span> that their relationship had to end and <span class="trust dec">worry</span> for each other.`);
				relSlave.devotion -= 5;
				relSlave.trust -= 5;
				slave.devotion -= 5;
				slave.trust -= 5;
			}
		}
		slave.relationship = -3;
		App.Events.addParagraph(el, r);
		if (V.PC.slaveSurname && slave.slaveSurname !== V.PC.slaveSurname) {
			App.Events.addResponses(el, [new App.Events.Result(`Give ${him} your surname`, () => {
				const el = new DocumentFragment();
				const r = [];
				slave.slaveSurname = V.PC.slaveSurname;
				const hears = canHear(slave) ? "hears" : "understands";
				r.push(`You also command ${V.assistant.name} to rename your new slave wife ${slave.slaveName} ${slave.slaveSurname}.`);
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`The new Mrs. ${slave.slaveSurname} ${hears} this, of course, and shows no reaction. Like many things, names mean nothing to ${him} now.`);
				} else if (slave.devotion+slave.trust >= 175) {
					r.push(`The new Mrs. ${slave.slaveSurname} ${hears} this, of course, and breaks down again. Being brusquely redesignated as your slave ${wife} was such a sterile experience that ${he} wasn't sure it was real, and hearing that ${he}'s to take your surname <span class="trust inc">reassures ${him}</span> that it is. Not to mention, ${he} might be a ${SlaveTitle(slave)}, but ${he}'s still a ${girl}, and hearing that ${he} wouldn't get a decent wedding did disappoint ${him}, but this makes up for it. You might not be all that expressive, but <span class="devotion inc">${he}'s your wife,</span> and that's what matters to ${him}.`);
					slave.devotion += 5;
					slave.trust += 5;
				} else if (slave.devotion < -20 && slave.trust > 20) {
					r.push(`The new Mrs. ${slave.slaveSurname} ${hears} this, of course, and scoffs audibly. <span class="devotion dec">${He}'ll remember ${his} name, even if you try to take it away.</span> ${He} can't hide <span class="devotion dec">${his} annoyance</span> that you couldn't even spring for a fancy wedding.`);
					slave.devotion -= 10;
				} else if (slave.devotion < -20) {
					r.push(`The new Mrs. ${slave.slaveSurname} ${hears} this, of course, and breaks down again. Not only have you taken ${his} hand, but now also ${his} name; <span class="devotion inc">${he}'s yours now,</span> nothing ${he} thinks can change that.`);
					slave.devotion += 5;
				} else {
					r.push(`The new Mrs. ${slave.slaveSurname} ${hears} this, of course, and nods acceptingly. Being trusted with your surname <span class="trust inc">reassures ${him}</span> that ${he} must mean something to you, though ${he} is a <span class="devotion dec">little disappointed</span> by the lack of a wedding, however.`);
					slave.devotion--;
					slave.trust += 5;
				}
				App.Events.addParagraph(el, r);
				return el;
			})]);
		}

		return el;
	}

	function marryNow() {
		let r = [];
		const el = new DocumentFragment();
		r.push(`You order ${slave.slaveName} to go change into bridal lingerie.`);
		if (reactionType === 0) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} hurries off, still crying. When ${he} returns, ${he}'s wearing`);
			} else {
				r.push(`${He} is helped out, still crying. When ${he} is returned, ${he}'s wearing`);
			}
		} else if (reactionType === 1) {
			r.push(`${He} is helped out, completely unaware of ${his} pending marriage. When ${he} is returned, ${he}'s wearing`);
		} else if (reactionType === 2) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} shuffles off, still sobbing. When ${he} returns, ${he}'s wearing`);
			} else {
				r.push(`${He} is helped out, still sobbing. When ${he} is returned, ${he}'s wearing`);
			}
		} else {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} hurries off to fulfill your orders. When ${he} returns, ${he}'s wearing`);
			} else {
				r.push(`${He} is helped out to get dressed. When ${he} is returned, ${he}'s wearing`);
			}
		}
		if (slave.vagina === 0) {
			r.push(`white, since ${he}'s a virgin.`);
		} else if (slave.pregKnown === 1) {
			r.push(`light pink, since ${he} is pregnant.`);
		} else if (slave.vagina < 0 && slave.anus === 0) {
			r.push(`white, since ${he}'s an anal virgin.`);
		} else if (slave.vagina < 0 && slave.boobs > 500) {
			r.push(`electric blue, since ${he}'s a shemale.`);
		} else if (slave.vagina < 0) {
			r.push(`pale blue, since ${he}'s a sissy slave.`);
		} else if (slave.dick > 0) {
			r.push(`hot pink, since ${he}'s a futa slave.`);
		} else {
			r.push(`light pink, since ${he}'s an experienced sex slave.`);
		}
		r.push(`A flimsy veil covers ${his} head and shoulders.`);
		if (slave.boobs > 4000) {
			r.push(`On such short notice, no bridal bra for boobs of ${his} size was available, so ${he}'s topless. Not a tragedy.`);
		} else if (slave.boobs > 1200) {
			r.push(`${His} lacy bridal bra just barely restrains ${his} huge boobs, leaving the tops of ${his} areolae visible.`);
		} else if (slave.boobs > 400) {
			r.push(`${His} lacy bridal bra flatters ${his} pretty breasts.`);
		} else {
			r.push(`${His} lacy bridal bra flatters ${his} pretty chest.`);
		}
		if (slave.bellyPreg >= 600000) {
			r.push(`${His} expansive, squirming pregnant belly makes ${his} bridal wear particularly obscene.`);
		} else if (slave.bellyPreg >= 1500) {
			r.push(`${His} ${belly} pregnant belly protrudes out the front of ${his} bridal wear.`);
		} else if (slave.bellyImplant >= 1500) {
			r.push(`${His} ${belly} ${slave.bellyImplant}cc belly implant protrudes ${his} middle out the front of ${his} bridal wear.`);
		} else if (slave.bellyFluid >= 10000) {
			r.push(`${His} hugely bloated, ${slave.inflationType}-filled belly protrudes out the front of ${his} bridal wear.`);
		} else if (slave.bellyFluid >= 5000) {
			r.push(`${His} bloated, ${slave.inflationType}-stuffed belly protrudes out the front of ${his} bridal wear.`);
		} else if (slave.bellyFluid >= 1500) {
			r.push(`${His} distended, ${slave.inflationType}-belly protrudes out the front of ${his} bridal wear.`);
		}
		if (slave.chastityPenis === 1) {
			r.push(`${His} slave dick is hidden by its chastity cage.`);
		} else if (canAchieveErection(slave)) {
			if (slave.dick > 4 && slave.belly >= 5000) {
				r.push(`${He}'s hugely erect, with ${his} lacy g-string only serving to hold ${his} dick agonizingly pressed against the bottom of ${his} ${belly}`);
				if (slave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly.`);
			} else if (slave.dick > 4) {
				r.push(`${He}'s hugely erect, with ${his} lacy g-string only serving to hold ${his} dick upright along ${his} belly.`);
			} else {
				r.push(`${His} erection tents the front of ${his} lacy g-string.`);
			}
		} else if (slave.dick > 0) {
			if (slave.dick > 10) {
				r.push(`${His} huge soft cock is allowed to dangle freely as no g-string could hope to contain it.`);
			} else if (slave.dick > 4) {
				r.push(`${His} big soft cock forms a lewd mass, stuffed into ${his} lacy g-string.`);
			} else {
				r.push(`${His} lacy g-string perfectly conceals ${his} soft dick.`);
			}
		} else {
			if (slave.clit > 1) {
				r.push(`${His} huge clit is quite hard, making ${him} shift uncomfortably as ${his} lacy g-string stimulates it.`);
			} else {
				r.push(`${His} lacy g-string is starting to look a bit moist in front.`);
			}
		}
		r.push(`${capFirstChar(V.assistant.name)} marries ${him} to you in a brief ceremony adapted for slaves and their owners. You place a`);
		if (hasAnyArms(slave)) {
			r.push(`simple steel ring on ${his} finger;`);
		} else {
			r.push(`chain with a simple steel ring around ${his} neck;`);
		}
		r.push(`${he} does not reciprocate, since this marriage does not bind you.`);
		if (V.assistant.personality <= 0) {
			r.push(`"The marriage protocol now requires you to`);
			if (V.PC.dick !== 0) {
				r.push(`fellate`);
				if (V.PC.vagina !== -1) {
					r.push(`and`);
				}
			}
			if (V.PC.vagina !== -1) {
				r.push(`perform cunnilingus on`);
			}
			r.push(`the ${groom}, ${V.assistant.name} orders ${him}, and ${he}`);
			if (reactionType === 0) {
				r.push(`only starts when you push ${his} head to your crotch.`);
			} else if (reactionType === 1) {
				r.push(`eagerly complies.`);
			} else if (reactionType === 2) {
				r.push(`reluctantly obeys.`);
			} else {
				r.push(`hurries to obey.`);
			}
		} else {
			const suckMy = () => {
				if (V.PC.dick !== 0) {
					r.push(`suck the ${groom}'s dick${(V.PC.vagina !== -1) ? ` and eat ${hisP} pussy` : ``}."`);
				} else {
					r.push(`eat the ${groom}'s pussy."`);
				}
			};
			const genericCompliance = () => {
				r.push(`The slave`);
				if (reactionType === 0) {
					r.push(`only starts when you push ${his} head to your crotch.`);
				} else if (reactionType === 1) {
					r.push(`eagerly complies.`);
				} else if (reactionType === 2) {
					r.push(`reluctantly obeys.`);
				} else {
					r.push(`hurries to obey.`);
				}
			};

			if (V.assistant.appearance === "monstergirl") {
				r.push(`"To consecrate the ceremony," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				suckMy();
				genericCompliance();
				r.push(`Pleased by the sight, ${V.assistant.name}'s avatar begins to play with ${hisA} dicks.`);
			} else if (V.assistant.appearance === "shemale") {
				r.push(`"To get this marriage started," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				suckMy();
				genericCompliance();
				r.push(`Pleased by the sight, ${V.assistant.name}'s avatar starts to jill off.`);
			} else if (V.assistant.appearance === "amazon") {
				r.push(`"To complete this ritual," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				suckMy();
				genericCompliance();
				r.push(`Pleased by the sight, ${V.assistant.name}'s avatar starts to jill off.`);
			} else if (V.assistant.appearance === "businesswoman") {
				r.push(`"To consecrate the marriage," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				if (V.PC.dick !== 0) {
					r.push(`fellate`);
				} else {
					r.push(`perform cunnilingus on`);
				}
				r.push(`the ${groom}." The slave`);
				if (reactionType === 0) {
					r.push(`only starts when you push ${his} head to your crotch.`);
				} else if (reactionType === 1) {
					r.push(`eagerly complies.`);
				} else if (reactionType === 2) {
					r.push(`reluctantly obeys.`);
				} else {
					r.push(`hurries to obey.`);
				}
				r.push(`Pleased by the sight, ${V.assistant.name}'s avatar sneaks a hand down ${hisA} suit skirt, blushing furiously.`);
			} else if (V.assistant.appearance === "fairy") {
				r.push(`"To seal the deal," ${V.assistant.name} concludes, "${slave.slaveName}, you gotta drink the ${groom}'s`);
				if (V.PC.dick !== 0) {
					r.push(`semen${(V.PC.vagina !== -1) ? ` and pussy juices` : ``}."`);
				} else {
					r.push(`pussy juices."`);
				}
				genericCompliance();
				r.push(`Pleased by the sight, ${V.assistant.name}'s avatar spreads ${hisA} legs while still hovering in the air and masturbates eagerly through ${hisA} half-worn robes.`);
			} else if (V.assistant.appearance === "pregnant fairy") {
				r.push(`"To seal the deal," ${V.assistant.name} concludes, "${slave.slaveName}, you gotta drink the ${groom}'s`);
				if (V.PC.dick !== 0) {
					if (V.PC.vagina !== -1) {
						r.push(`semen and pussy juices."`);
					} else {
						r.push(`semen."`);
					}
				} else {
					r.push(`pussy juices."`);
				}
				genericCompliance();
				r.push(`Pleased by the sight, ${V.assistant.name}'s pregnant avatar curls while still hovering in the air and masturbates eagerly around ${hisA} large belly.`);
			} else if (V.assistant.appearance === "goddess") {
				r.push(`"To consummate the marriage," ${V.assistant.name} concludes, "${slave.slaveName}, you must now`);
				if (V.PC.dick !== 0) {
					r.push(`drink the ${groom}'s seed."`);
				} else {
					r.push(`drink the ${groom}'s female juices."`);
				}
				genericCompliance();
				r.push(`${V.assistant.name}'s avatar looks on approvingly, cradling ${hisA} perpetual pregnancy.`);
			} else if (V.assistant.appearance === "hypergoddess") {
				r.push(`"To consummate the marriage," ${V.assistant.name} concludes, "${slave.slaveName}, you must now`);
				if (V.PC.dick !== 0) {
					r.push(`drink the ${groom}'s seed."`);
				} else {
					r.push(`drink the ${groom}'s female juices."`);
				}
				genericCompliance();
				r.push(`${V.assistant.name}'s avatar looks on approvingly, cradling ${hisA} massive perpetual pregnancy.`);
			} else if (V.assistant.appearance === "loli") {
				r.push(`"To consummate the marriage," ${V.assistant.name} concludes, "${slave.slaveName}, you should now`);
				if (V.PC.dick !== 0) {
					r.push(`suck the ${groom}'s cock${(V.PC.vagina !== -1) ? ` and lick ${hisP} cunny` : ``}."`);
				} else {
					r.push(`lick the ${groom}'s cunny."`);
				}
				genericCompliance();
				r.push(`${V.assistant.name}'s avatar sneaks a hand down ${hisA} dress, blushing furiously.`);
			} else if (V.assistant.appearance === "preggololi") {
				r.push(`"To consummate the marriage," ${V.assistant.name} concludes, "${slave.slaveName}, you should now`);
				if (V.PC.dick !== 0) {
					r.push(`suck the ${groom}'s lovely cock${(V.PC.vagina !== -1) ? ` and eat out ${hisP} cunt` : ``}."`);
				} else {
					r.push(`lick the ${groom}'s cunt."`);
				}
				genericCompliance();
				r.push(`${V.assistant.name}'s avatar attempts to sneak a hand down ${hisA} dress, but is thwarted by ${hisA} belly. ${HeA} instead openly rubs ${hisA} crotch through the front of ${hisA} dress, blushing furiously.`);
			} else if (V.assistant.appearance === "schoolgirl") {
				r.push(`"To get this marriage started," ${V.assistant.name} concludes, "${slave.slaveName}, the rules say you should now`);
				suckMy();
				genericCompliance();
				r.push(`Pleased by the sight, ${V.assistant.name}'s avatar starts to jill off.`);
			} else if (V.assistant.appearance === "angel") {
				r.push(`"To consummate the marriage," ${V.assistant.name} concludes, "${slave.slaveName}, you must now join ${PlayerName()} in their bedroom and consummate this marriage." The slave`);
				if (reactionType === 0) {
					r.push(`stares blankly.`);
				} else {
					r.push(`looks confused.`);
				}
				r.push(`"After the wedding ends, would be the time." ${V.assistant.name} says, covering ${hisA} face in embarrassment at the thought.`);
			} else if (V.assistant.appearance === "cherub") {
				r.push(`"To consummate the marriage," ${V.assistant.name} concludes, "${slave.slaveName}, you should`);
				if (V.PC.dick !== 0) {
					r.push(`suck the ${groom}'s cock${(V.PC.vagina !== -1) ? ` and lick ${hisP} pussy` : ``},`);
				} else {
					r.push(`lick the ${groom}'s pussy,`);
				}
				r.push(`in the privacy of ${PlayerName()}'s bedroom, of course." ${V.assistant.name} hides ${hisA} face in ${hisA} hands at the thought.`);
			} else if (V.assistant.appearance === "incubus") {
				r.push(`"To get this marriage started," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				suckMy();
				genericCompliance();
				r.push(`Enjoying the sight, ${V.assistant.name}'s avatar begins to furiously stroke its shaft.`);
			} else if (V.assistant.appearance === "succubus") {
				r.push(`"To get this marriage started," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				suckMy();
				genericCompliance();
				r.push(`Pleased by the sight, ${V.assistant.name}'s avatar pulls out a large dildo and begins ramming it into ${hisA} own pussy.`);
			} else if (V.assistant.appearance === "imp") {
				r.push(`"To get this marriage started," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				suckMy();
				genericCompliance();
				r.push(`Pleased by the sight, ${V.assistant.name}'s avatar hikes ${hisA} robe and vigorously rubs ${hisA} pussy.`);
			} else if (V.assistant.appearance === "witch") {
				r.push(`"To get this marriage started," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				suckMy();
				genericCompliance();
				r.push(`${V.assistant.name}'s avatar begins to fidget at the sight, having summoned a vibrator beforehand and accidentally linked it to your pleasure.`);
			} else if (V.assistant.appearance === "ERROR_1606_APPEARANCE_FILE_CORRUPT") {
				r.push(`"To get this marriage started," ${V.assistant.name} concludes, "${slave.slaveName}, you will now`);
				suckMy();
				genericCompliance();
				r.push(`${V.assistant.name}'s avatar begins to swell, drawing all its gained mass to its midsection. Its gravid middles splits vertically, allowing a new mass of flesh to fall to the floor, which quickly grows and reshapes itself into a spitting image of yourself. Meanwhile, the original twists into an image of ${slave.slaveName}. ${V.assistant.name}'s two avatars begin copying you and ${slave.slaveName}'s actions perfectly.`);
			} else {
				r.push(`"To get this marriage started," ${V.assistant.name} concludes, "${slave.slaveName}, the rules say you should now`);
				suckMy();
				genericCompliance();
				r.push(`With only a symbol to express ${hisA} approval, ${V.assistant.name} is forced to content ${himselfA} with spinning the symbol and making it glow in time with your new slave wife's efforts.`);
			}
			r.push(`"Done," ${heA} says when you climax. "Enjoy your`);
			if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
				if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(`submissive slave ${wife}!"`);
				} else if (slave.fetish === "cumslut") {
					r.push(`slave ${wife}'s mouth!"`);
				} else if (slave.fetish === "humiliation") {
					r.push(`exhibitionist slave ${wife}!"`);
				} else if (slave.fetish === "buttslut") {
					r.push(`slave ${wife}'s butthole!"`);
				} else if (slave.fetish === "boobs") {
					r.push(`slave ${wife}'s boobs!"`);
				} else if (slave.fetish === "pregnancy") {
					r.push(`breeder ${wife}!"`);
				} else if (slave.fetish === "dom") {
					r.push(`slave ${wife}'s aggression!"`);
				} else if (slave.fetish === "sadist") {
					r.push(`slave ${wife}'s sadistic tendencies!"`);
				} else if (slave.fetish === "masochist") {
					r.push(`slave ${wife}'s pain!"`);
				} else {
					r.push(`slave ${wife}!"`);
				}
			} else {
				r.push(`slave ${wife}!"`);
			}
		}
		if (slave.relationship > 0) {
			slave.relationshipTarget = 0;
			relSlave.relationship = 0;
			relSlave.relationshipTarget = 0;
		}
		if (slave.devotion+slave.trust >= 175) {
			if (slave.relationship > 0) {
				r.push(`${His} ex is <span class="devotion dec">disappointed</span> that their relationship had to end and <span class="trust dec">worries</span> for ${his2} love's future.`);
				if (slave.relationship === 4) {
					relSlave.devotion -= 5;
					relSlave.trust -= 5;
				} else if (slave.relationship === 3) {
					relSlave.devotion -= 3;
					relSlave.trust -= 3;
				} else {
					relSlave.devotion -= 1;
					relSlave.trust -= 1;
				}
			}
		} else if (slave.devotion < -20) {
			if (slave.relationship === -1) {
				r.push(`${He} <span class="devotion dec">hates</span> that ${he} has to be yours only and <span class="trust dec">fears</span> what will happen if ${he} strays.`);
				slave.devotion -= 40;
				slave.trust -= 40;
			} else if (slave.relationship === 4) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">resent</span> that their relationship had to end and <span class="trust dec">fear</span> for each other's future.`);
				relSlave.devotion -= 40;
				relSlave.trust -= 40;
				slave.devotion -= 40;
				slave.trust -= 40;
			} else if (slave.relationship === 3) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">resent</span> that their relationship had to end and <span class="trust dec">fear</span> for each other's future.`);
				relSlave.devotion -= 30;
				relSlave.trust -= 30;
				slave.devotion -= 30;
				slave.trust -= 30;
			} else if (slave.relationship > 0) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">resent</span> that their relationship had to end and <span class="trust dec">fear</span> for each other's future.`);
				relSlave.devotion -= 20;
				relSlave.trust -= 20;
				slave.devotion -= 20;
				slave.trust -= 20;
			}
		} else {
			if (slave.relationship === -1) {
				r.push(`${He} <span class="devotion dec">dislikes</span> that ${he} has to be yours only and <span class="trust dec">worries</span> what will happen if ${he} strays.`);
				slave.devotion -= 10;
				slave.trust -= 10;
			} else if (slave.relationship === 4) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">resent</span> that their relationship had to end and <span class="trust dec">worry</span> for each other.`);
				relSlave.devotion -= 20;
				relSlave.trust -= 20;
				slave.devotion -= 20;
				slave.trust -= 20;
			} else if (slave.relationship === 3) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">are saddened</span> that their relationship had to end and <span class="trust dec">worry</span> for each other.`);
				relSlave.devotion -= 10;
				relSlave.trust -= 10;
				slave.devotion -= 10;
				slave.trust -= 10;
			} else if (slave.relationship > 0) {
				r.push(`Both ${him} and ${his} ex are <span class="devotion dec">are disappointed</span> that their relationship had to end and <span class="trust dec">worry</span> for each other.`);
				relSlave.devotion -= 5;
				relSlave.trust -= 5;
				slave.devotion -= 5;
				slave.trust -= 5;
			}
		}
		slave.relationship = -3;
		App.Events.addParagraph(el, r);
		if (V.PC.slaveSurname && slave.slaveSurname !== V.PC.slaveSurname) {
			App.Events.addResponses(el, [new App.Events.Result(`Give ${him} your surname`, () => {
				const el = new DocumentFragment();
				const r = [];
				slave.slaveSurname = V.PC.slaveSurname;
				r.push(`You also command ${V.assistant.name} to rename your new slave wife ${slave.slaveName} ${slave.slaveSurname}.`);
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`Before you get too distracted, you tell your lovely new ${wife} that ${he}'s now to be known as ${slave.slaveName} ${slave.slaveSurname}. You are uncertain if it sunk in or not.`);
				} else if (slave.devotion+slave.trust >= 175) {
					r.push(`Before you get too distracted, you tell your lovely new ${wife} that ${he}'s now to be known as ${slave.slaveName} ${slave.slaveSurname}. It would be an understatement to say ${he}'s delighted. ${He}'s a good ${SlaveTitle(slave)}, but even ${he} has to retain a kernel of doubt about whether a marriage between an owner and a piece of property is really worth much. This <span class="trust inc">reassures ${him}</span> that it is. ${His} special day probably wasn't exactly like ${he} might once have imagined it, but ${he} obviously thinks it's been <span class="devotion inc">very nice,</span> all things considered.`);
					if (canTalk(slave)) {
						r.push(
							Spoken(slave, `"${slave.slaveName} ${V.PC.slaveSurname},"`),
							`${he} murmurs to ${himself} occasionally, smiling.`
						);
					}
					slave.devotion += 5;
					slave.trust += 5;
				} else if (slave.devotion < -20 && slave.trust > 20) {
					r.push(`Before you get too distracted, you tell your lovely new ${wife} that ${he}'s now to be known as ${slave.slaveName} ${slave.slaveSurname}. <span class="devotion dec">${He}'ll remember ${his} name, even if you try to take it away.</span>`);
					if (canTalk(slave)) {
						r.push(
							Spoken(slave, `"${slave.slaveName} ${V.PC.slaveSurname},"`),
							`${he} mutters to ${himself} occasionally; there is a distinct distaste to the way ${he} says it.`
						);
					}
					slave.devotion -= 10;
				} else if (slave.devotion < -20) {
					r.push(`Before you get too distracted, you tell your quivering new ${wife} that ${he}'s now to be known as ${slave.slaveName} ${slave.slaveSurname}. ${He} nods in terror. Not only have you taken ${his} hand, but now also ${his} name; <span class="hotpink">${he}'s yours now,</span> nothing ${he} thinks can change that.`);
					if (canTalk(slave)) {
						r.push(
							Spoken(slave, `"${slave.slaveName} ${V.PC.slaveSurname},"`),
							`${he} mutters to ${himself} occasionally, ${his} voice wavering as ${he} struggles to hold back the tears.`
						);
					}
					slave.devotion += 5;
				} else {
					r.push(`Before you get too distracted, you tell your lovely new ${wife} that ${he}'s now to be known as ${slave.slaveName} ${slave.slaveSurname}. ${He} nods acceptingly. ${He}'s a good ${SlaveTitle(slave)}, but ${he} has doubts about whether a marriage between an owner and a piece of property is really worth much. That doesn't matter, <span class="trust inc">it's worth something to ${him}.</span>`);
					if (canTalk(slave)) {
						r.push(
							Spoken(slave, `"${slave.slaveName} ${V.PC.slaveSurname},"`),
							`${he} murmurs to ${himself} occasionally${(canHear(slave)) ? ", listening to how it sounds" : ""}.`
						);
					}
					slave.trust += 5;
				}
				App.Events.addParagraph(el, r);
				return el;
			})]);
		}
		return el;
	}

	function straightforward() {
		V.weddingPlanned = 1;
		V.marrying.push(slave.ID);
		cashX(-10000, "event", slave);
		return `You order ${V.assistant.name} to invite deserving citizens to a straightforward ceremony for a slave being married to a slaveowner, and to make the arrangement. The wedding will take place during the upcoming week.`;
	}

	function orgiastic() {
		V.weddingPlanned = 2;
		V.marrying.push(slave.ID);
		cashX(-10000, "event", slave);
		return `You order ${V.assistant.name} to invite deserving citizens to an orgiastic ceremony for a slave being married to a slaveowner, and to make the arrangements. The wedding orgy will take place during the upcoming week.`;
	}

	function impregnation() {
		V.weddingPlanned = 3;
		V.marrying.push(slave.ID);
		cashX(-10000, "event", slave);
		return `You order ${V.assistant.name} to invite deserving citizens to a ceremony for a fertile slave being married to a slaveowner, and to make the arrangements. The wedding will take place during the upcoming week.`;
	}
};
