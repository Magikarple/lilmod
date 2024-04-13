// cSpell:ignore vidscreen, assfuckings

App.Events.REArcologyInspection = class REArcologyInspection extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => this.validArcologies().length > 0
		];
	}

	validArcologies() {
		// use any arcology with either trustee or agent government
		return V.arcologies.filter((a) => (a.government === "your trustees") || (a.government === "your agent"));
	}

	actorPrerequisites() {
		return []; // no actor casting for this event
	}

	get weight() {
		return Math.ceil(Math.sqrt(this.validArcologies().length)); // more likely if you control more arcologies
	}

	execute(node) {
		const home = V.arcologies[0];
		const arcology = this.validArcologies().random();
		const agent = (arcology.government === "your agent") ? getSlave(arcology.leaderID) : undefined;
		const {He, him, himself, his, he} = agent ? getPronouns(agent) : getPronouns({pronoun: App.Data.Pronouns.Kind.plural});
		const Master = agent ? getEnunciation(agent).title : (V.PC.title ? "Sir" : "Madam");
		const BG = S.Bodyguard;
		const agentLover = agent ? V.slaves.find(s => (s.ID === agent.relationshipTarget && s.assignment === Job.AGENTPARTNER)) : undefined;

		App.Events.drawEventArt(node, [BG, agent, agentLover].filter(x => !!x));

		let t = [];
		t.push(`Although your primary day-to-day responsibility is to ${home.name}, you are careful not to completely ignore your other interests in the Free City. This week you've decided to pay a surprise visit to ${arcology.name}, which is being governed in your stead by`);
		if (agent) {
			t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, agent, true), "."));
		} else {
			t.push("a group of trustees you've appointed.");
		}
		t.push(`You can easily monitor ${arcology.name} remotely, but there's nothing like an impromptu personal visit to make sure it's clear you'll hold ${him} accountable.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Before you go, you ask ${V.assistant.name} about the weather forecast.`);
		if (V.weatherToday.severity <= 1) {
			t.push(`"${V.weatherToday.name}" is pretty pleasant, as things go these days, so you decide to take a walk through the Free City along one of the surface paths to get to your neighbor.`);
		} else {
			t.push(`"${V.weatherToday.name}" is not something you want to be out and about in, so you head down to one of the ${V.terrain !== "oceanic" ? "underground" : "undersea"}, climate-controlled transport tunnels that connect the major buildings of the Free City. You could easily take a transit pod, but today you feel like walking.`);
		}
		if (BG) {
			const {hisBG} = getPronouns(BG).appendSuffix("BG");
			t.push(`As is ${hisBG} habit and duty,`, contextualIntro(V.PC, BG, true), `accompanies you wherever you go, armed to the teeth.`);
		} else {
			t.push(`You feel a bit exposed, so you ask ${V.assistant.name} to loan you a couple of security drones for protection, and make a note that you should probably assign a devoted slave to Bodyguard duty.`);
		}
		App.Events.addParagraph(node, t);

		t = [];
		if (V.weatherToday.severity <= 1) {
			t.push(`You enter ${arcology.name} through the main surface entrance, beneath the reinforced solar panel curtain. A security drone scans you at the door, as it does every unexpected visitor. You can't help but grin as you imagine the effect that your surprise arrival is having on ${agent ? agent.slaveName : "your trustees"}, and stroll into the main atrium.`);
		} else {
			t.push(`You enter ${arcology.name} through the transport tunnel, emerging directly into the main atrium. A security drone scans you as you exit, as it does every unexpected visitor. You can't help but grin as you imagine the effect that your surprise arrival is having on ${agent ? agent.slaveName : "your trustees"}.`);
		}
		App.Events.addParagraph(node, t);

		const dipFSes = FutureSocieties.diplomaticFSes(home, arcology);
		const arcFSes = FutureSocieties.activeFSes(arcology);
		const uniqueFSes = _.difference(arcFSes, dipFSes.shared);
		t = [];
		t.push(`You're sure someone will be down to meet you very shortly, but you take a few moments to watch a few of the large public video screens in the atrium.`);
		if (uniqueFSes.length) {
			t.push(`You pay special attention to the ones that are most different from what you've configured in ${home.name}, like`);
			const diffShows = this.getShows(uniqueFSes, arcology);
			t.push(toSentence(diffShows) + ".");
		}
		if (dipFSes.shared.length) {
			if (!uniqueFSes.length) {
				t.push(`All of the programs running on them are familiar to you, in type if not in specific substance, such as`);
			} else {
				t.push(`Most of the rest seem a lot like what you'd find in ${home.name}, such as`);
			}
			const diffShows = this.getShows(dipFSes.shared, arcology);
			t.push(toSentence(diffShows) + ".");
			if (!uniqueFSes.length) {
				t.push(`${arcology.name}, while different than ${home.name}, still manages to feel a bit like home.`);
			}
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`After a few minutes, ${agent ? agent.slaveName : "a member of your trustee board"} rushes over to you.`);
		if (agent) {
			t.push(Spoken(agent, `"${Master}, it's so good to see you in ${arcology.name}!"`));
			t.push(`${He} embraces you eagerly`);
		} else {
			t.push(`"${Master}, welcome to ${arcology.name}!" He reaches out to shake your hand`);
		}
		if (BG) {
			t.push(`under ${BG.slaveName}'s ever-watchful gaze.`);
		} else {
			t.push(`as one of your security drones hovers nearby.`);
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`You take a brief tour around the arcology, taking notes on things you could learn and giving ${agent ? agent.slaveName : "your trustee representative"} a bit of advice, before winding up in the penthouse suite. It's nowhere near as opulent as yours,`);
		if (!agent) {
			t.push(`and currently doesn't have a permanent occupant,`);
		}
		t.push(`but it's nicely appointed and comfortable. Your gracious host suggests some other things that you could do while you're here, but you know you'll only really have time for one before you head back to ${home.name}.`);
		App.Events.addParagraph(node, t);

		const chosenFS = dipFSes.shared.filter(fs => arcology[fs] < 80).random();

		App.Events.addResponses(node, [
			(chosenFS && V.rep > 2000) ? new App.Events.Result(`Help promote ${FutureSocieties.displayName(chosenFS)} progress`, () => promoteFS(chosenFS)) : new App.Events.Result(),
			agent ? new App.Events.Result(`Spend time with ${agent.slaveName}${agentLover ? ` and ${agentLover.slaveName}` : ''}`, fuckAgent, virginityWarning()) : new App.Events.Result(),
			new App.Events.Result(`Discipline some dissidents`, discipline),
			new App.Events.Result(`Visit the ${arcology.name} Club`, club),
			new App.Events.Result(`It's been a long day; just head home`, goHome)
		]);

		/** @param {FC.FutureSociety} fs */
		function promoteFS(fs) {
			t = [];
			t.push(`${arcology.name} and ${home.name} share an interest in promoting ${FutureSocieties.displayName(fs)}, and strengthening it here will help boost trade and diplomatic relations between your arcologies.`);

			const actionMap = new Map([
				["FSSupremacist", `examining fine specimens of ${arcology.FSSupremacistRace} slaves`],
				["FSSubjugationist", `publicly demonstrating the inferiority of ${arcology.FSSubjugationistRace} slaves`],
				["FSIntellectualDependency", `throwing an orgy for bimbos`],
				["FSSlaveProfessionalism", `teaching classes for slave prostitutes`],
				["FSRepopulationFocus", `examining slaves in various states of gravidity`],
				["FSRestart", `meeting with the Social Elite`],
				["FSGenderFundamentalist", `being served by barefoot, submissive slave girls`],
				["FSGenderRadicalist", `fucking some traps and futas`],
				["FSPaternalist", `touring the local clinics and slave schools`],
				["FSDegradationist", `publicly degrading slaves in new and creative ways`],
				["FSBodyPurist", `doing nude yoga`],
				["FSTransformationFetishist", `giving slaveowners advice about what tattoos and piercings might suit their slaves`],
				["FSYouthPreferentialist", `playing volleyball with some cute young girls`],
				["FSMaturityPreferentialist", `playing bridge with some matronly beauties`],
				["FSStatuesqueGlorification", `shooting pornography with very tall slaves`],
				["FSPetiteAdmiration", `shooting pornography with short slaves`],
				["FSSlimnessEnthusiast", `dancing with lithe, graceful partners`],
				["FSAssetExpansionist", `having fun with some busty slaves`],
				["FSPastoralist", `sampling high-quality milk and ice cream`],
				["FSPhysicalIdealist", `playing sports and working out`],
				["FSHedonisticDecadence", `lounging around spas and visiting restaurants`],
				["FSChattelReligionist", `officiating slave religious services`],
				["FSRomanRevivalist", `engaging in Roman discourse and debate`],
				["FSNeoImperialist", `conducting simulated battles with the Imperial Knights`],
				["FSAztecRevivalist", `attending a bloodletting ceremony`],
				["FSEgyptianRevivalist", `reenacting an ancient Egyptian ceremony`],
				["FSEdoRevivalist", `attending a kabuki theater performance`],
				["FSArabianRevivalist", `training citizens' harem slaves`],
				["FSChineseRevivalist", `reviewing the administrative bureaucracy`],
				["FSAntebellumRevivalist", `attending some classic theater`],
				["FSNull", `attending a multicultural festival`],
			]);
			t.push(`You and ${agent ? agent.slaveName : "your trustee representative"} spend the rest of the day ${actionMap.get(fs)}, making sure that the news cameras are rolling.`);
			if (V.rep > 12000) {
				t.push(`Your impressive reputation draws extra attention, and ${arcology.name} reaps the benefits.`);
			} else if (V.rep > 6000) {
				t.push(`Your modest reputation draws some attention, and ${arcology.name} benefits.`);
			} else {
				t.push(`Your poor reputation can only help ${arcology.name} so much, though.`);
			}
			arcology[fs] += Math.trunc(V.rep / 1000);
			return t;
		}

		function fuckAgent() {
			const frag = document.createDocumentFragment();

			t = [];
			t.push(`${agent.slaveName} takes your hand and leads you${agentLover ? ` and ${contextualIntro(agent, agentLover)}` : ``} into ${his} bedroom. ${He} might be the leader of an entire arcology now, but ${he}'s still got ${his} instincts as a sex slave, and ${he} knew exactly what you meant when you said you wanted to spend some time with ${him}.`);
			App.Events.addParagraph(frag, t);

			t = [];
			if (agentLover) {
				// Threesome
				const {his2, himself2} = getPronouns(agentLover).appendSuffix('2');
				t.push(`${agent.slaveName} and ${agentLover.slaveName} start by undressing themselves and you, teasing you all the while.`);
				if (agent.fetish === Fetish.SUBMISSIVE) {
					t.push(`Impatient, you show ${agent.slaveName} ${his} place by pushing ${him} back onto ${his} bed and mounting ${him}. You and ${agentLover.slaveName} take turns dominating the confirmed sub as ${he} screams in pleasure.`);
					if (agent.vagina >= 0) {
						t.push(VCheck.Vaginal(agent, 2));
						seX(agent, "vaginal", agentLover, "penetrative", 2);
					} else {
						t.push(VCheck.Anal(agent, 2));
						seX(agent, "anal", agentLover, "penetrative", 2);
					}
				} else if (agent.fetish === "cumslut") {
					if (V.PC.dick > 0) {
						t.push(`Impatient, you push ${agent.slaveName} and ${agentLover.slaveName} down to their knees and have them give you a double blowjob. Always the cumslut, ${agent.slaveName} eagerly sucks and licks your cock, and ${agentLover.slaveName} is more than happy to help.`);
						seX(agent, "oral", V.PC, "penetrative");
						seX(agentLover, "oral", V.PC, "penetrative");
					} else {
						t.push(`Impatient, you push ${agent.slaveName} and ${agentLover.slaveName} down to their knees and have them lick your pussy. Double cunnilingus is always a treat, and ${agent.slaveName} almost reaches orgasm ${himself} the first time you spill your girlcum over ${his} face.`);
						seX(agent, "oral", V.PC, "vaginal");
						seX(agentLover, "oral", V.PC, "vaginal");
					}
				} else if (agent.fetish === "humiliation") {
					t.push(`Impatient, you order ${agent.slaveName} to dance for you while you fuck ${agentLover.slaveName}, which ${he}'s very happy to do, especially once you toggle the penthouse windows to transparent.`);
					if (canDoVaginal(agentLover)) {
						t.push(VCheck.Vaginal(agentLover));
					} else {
						t.push(VCheck.Anal(agentLover));
					}
				} else if (agent.fetish === "buttslut") {
					t.push(`Impatient, you order ${agentLover.slaveName} to lie back on the bed while you bend ${agent.slaveName} over the end of it, pushing ${his} head into ${his2} crotch as you start out the evening by fucking ${his} ass.`);
					t.push(VCheck.Anal(agent));
					if (canPenetrate(agentLover)) {
						seX(agent, "oral", agentLover, "penetrative");
					} else if (canDoVaginal(agentLover)) {
						seX(agent, "oral", agentLover, "vaginal");
					} else if (agentLover.clit > 1 || agentLover.dick > 0) {
						seX(agent, "oral", agentLover, "penetrative");
					}
				} else if (agent.fetish === "boobs") {
					if (agent.nipples === "fuckable" && V.PC.dick > 0) {
						t.push(`Impatient, you push ${agent.slaveName} back on ${his} bed and kneel over ${him}, sliding your hard cock into ${his} soft breast as ${agentLover.slaveName} begins to eat out ${his} other nipple.`);
						seX(agent, "mammary", V.PC, "penetrative");
						seX(agent, "mammary", agentLover, "oral");
					} else if (agent.boobs >= 400 && V.PC.dick > 0) {
						t.push(`Impatient, you push ${agent.slaveName} back on ${his} bed and kneel over ${him}, sliding your hard cock between ${his} soft breasts as ${agentLover.slaveName} plants kisses all over your joined bodies.`);
						seX(agent, "mammary", V.PC, "penetrative");
					} else if (V.PC.boobs >= 300) {
						t.push(`Partway through undressing you, though, ${agent.slaveName} finds ${himself} terribly distracted by your breasts, and begins fondling and kissing them, leaving ${agentLover.slaveName} to finish undressing everyone ${himself2}. It's the start of a great evening.`);
						SimpleSexAct.Player(agent);
						SimpleSexAct.Player(agentLover);
						SimpleSexAct.Slaves(agentLover, agent);
					} else {
						t.push(`Partway through the shedding of clothing, though, ${agent.slaveName} finds ${himself} terribly distracted by all the exposed chests, and begins groping and kissing them, leaving ${agentLover.slaveName} to finish undressing everyone ${himself2}. It's the start of a great evening.`);
						SimpleSexAct.Player(agent);
						SimpleSexAct.Player(agentLover);
						SimpleSexAct.Slaves(agentLover, agent);
					}
				} else if (agent.fetish === "pregnancy") {
					if (V.PC.dick > 0 && (agent.vagina >= 0 || agent.mpreg === 1)) {
						t.push(`Impatient, you push ${agent.slaveName} back on the bed and slide into ${his} ${agent.mpreg === 1 ? "eager rear" : "wet pussy"}. ${He} begs you to put a baby in ${him}, and over the course of the evening you fill ${him} up several times, with ${agentLover.slaveName} "helping."`);
						if (canImpreg(agent, V.PC)) {
							t.push(knockMeUp(agent, 25, 2, V.PC.ID));
						} else {
							t.push(`Both of you know, of course, that you can't actually get ${him} pregnant, but the fantasy is fun anyway.`);
						}
						if (agent.mpreg === 1) {
							t.push(VCheck.Anal(agent, 4));
						} else {
							t.push(VCheck.Vaginal(agent, 4));
						}
					} else if (canPenetrate(agent) && V.PC.vagina > 0) {
						t.push(`Impatient, you push ${agent.slaveName} back on the bed and slide ${his} dick into your wet pussy. ${He} begs you to let ${him} put a baby in you${V.PC.bellyPreg >= 1500 ? `, even as ${he} eagerly paws at your current pregnancy` : ""}, and over the course of the evening ${he} fills you up several times, with ${agentLover.slaveName} "helping."`);
						if (canImpreg(V.PC, agent)) {
							t.push(knockMeUp(V.PC, 25, 2, agent.ID));
						} else {
							t.push(`All three of you know, of course, that ${he} can't actually get you pregnant, but the fantasy is fun anyway.`);
						}
						seX(V.PC, "vaginal", agent, "penetrative", 4);
					} else if (V.PC.pregKnown === 1) {
						t.push(`Partway through undressing you, though, ${agent.slaveName} finds ${himself} terribly distracted by the bun${V.PC.pregType > 1 ? "s" : ""} in your oven, and begins fondling and kissing your gravid swell, leaving ${agentLover.slaveName} to finish undressing everyone ${himself2}. It's the start of a great evening.`);
						SimpleSexAct.Player(agent);
						SimpleSexAct.Player(agentLover);
						SimpleSexAct.Slaves(agentLover, agent);
					} else {
						t.push(`${agent.slaveName} steps out for the briefest of moments, only to return with`);
						if (agent.belly < 2000 || agentLover.belly < 2000) {
							t.push(`several large fake pregnant bellies for everyone to wear.`);
						} else {
							t.push(`a rather enormous fake pregnant belly for you to wear to bed.`);
						}
						t.push(`It's the start of a great, if a little awkward, evening.`);
						SimpleSexAct.Player(agent);
						SimpleSexAct.Player(agentLover);
						SimpleSexAct.Slaves(agentLover, agent);
					}
				} else if (agent.fetish === "dom") {
					t.push(`${agent.slaveName} quickly runs out of patience, though, and pushes you back on ${his} bed and`);
					if (V.PC.dick > 0) {
						t.push(`slides onto your hard dick.`);
						if (agent.vagina >= 0) {
							t.push(VCheck.Vaginal(agent));
						} else {
							t.push(VCheck.Anal(agent));
						}
					} else if (canPenetrate(agent) && (V.PC.vagina > 0 || V.PC.anus > 0)) {
						t.push(`mounts you.`);
						if (V.PC.vagina > 0) {
							seX(V.PC, "vaginal", agent, "penetrative");
						} else {
							seX(V.PC, "anal", agent, "penetrative");
						}
					} else if (agent.vagina >= 0) {
						t.push(`sits on your face; of course, getting you to eat ${him} out won't be so easy.`);
						SimpleSexAct.Player(agent);
					} else if (agent.dick > 0) {
						t.push(`sticks ${his} dick in your face; of course, getting you to suck ${him} off won't be so easy.`);
						SimpleSexAct.Player(agent);
					} else {
						t.push(`slides ${his} tongue into your mouth.`);
					}
					t.push(`${He} and you struggle playfully for dominance throughout the evening, both using a willing ${agentLover.slaveName} for your pleasure.`);
					SimpleSexAct.Player(agentLover, 2);
					SimpleSexAct.Slaves(agentLover, agent, 2);
				} else if (agent.fetish === "sadist") {
					t.push(`${agent.slaveName} runs out of patience before long, though, forcefully pushing you back onto ${his} bed. ${agentLover.slaveName} quickly slides between you, taking a hard slap that ${agent.slaveName} unthinkingly directed at you. Rather than taking offense, you join in the fun and help ${him} abuse ${agentLover.slaveName}.`);
					SimpleSexAct.Player(agentLover, 2);
					SimpleSexAct.Slaves(agentLover, agent, 2);
				} else if (agent.fetish === "masochist") {
					t.push(`Impatient, and knowing how much ${agent.slaveName} likes to be manhandled, you throw ${him} back onto ${his} bed, and you and ${agentLover.slaveName} use ${him} brutally.`);
					SimpleSexAct.Player(agent, 2);
					SimpleSexAct.Slaves(agent, agentLover, 2);
				} else {
					t.push(`Impatient, you pull them onto ${agent.slaveName}'s oversized bed. You take ${agent.slaveName} first, but give ${agentLover.slaveName} ${his2} fair share of loving too.`);
					SimpleSexAct.Player(agent);
					SimpleSexAct.Player(agentLover);
					SimpleSexAct.Slaves(agentLover, agent);
				}
				t.push(`After a couple hours of playtime, the three of you collapse, exhausted, into a satisfied pile.`);
			} else {
				// Agent alone
				t.push(`${agent.slaveName} starts by undressing ${himself} and you, teasing you all the while.`);
				if (agent.fetish === Fetish.SUBMISSIVE) {
					t.push(`Impatient, you show ${him} ${his} place by pushing ${him} back onto ${his} bed and mounting ${him}. You know ${his} submissive tendencies and leverage them to your mutual pleasure.`);
					if (agent.vagina >= 0) {
						t.push(VCheck.Vaginal(agent, 3));
					} else {
						t.push(VCheck.Anal(agent, 3));
					}
				} else if (agent.fetish === "cumslut") {
					if (V.PC.dick > 0) {
						t.push(`Impatient, you push ${him} down to ${his} knees and have ${him} give you a blowjob. Always the cumslut, ${agent.slaveName} eagerly sucks and licks your cock.`);
						seX(agent, "oral", V.PC, "penetrative");
					} else {
						t.push(`Impatient, you push ${him} down to ${his} knees and have ${him} lick your pussy. Cunnilingus is always a treat, and ${agent.slaveName} almost reaches orgasm ${himself} the first time you spill your girlcum over ${his} face.`);
						seX(agent, "oral", V.PC, "vaginal");
					}
				} else if (agent.fetish === "humiliation") {
					t.push(`You toggle the penthouse windows to transparent and repeatedly fuck the exhibitionist ${agent.slaveName} in full view of all ${his} slaves and citizens.`);
					if (canDoVaginal(agent)) {
						t.push(VCheck.Vaginal(agent));
					} else {
						t.push(VCheck.Anal(agent));
					}
				} else if (agent.fetish === "buttslut") {
					t.push(`Impatient, you bend ${him} over the end of the bed and start by sliding ${V.PC.dick > 0 ? "your hard cock" : `a strapon you found in ${his} nightstand`} into ${his} ass.`);
					t.push(VCheck.Anal(agent, 2));
				} else if (agent.fetish === "boobs") {
					if (agent.nipples === "fuckable" && V.PC.dick > 0) {
						t.push(`Impatient, you push ${him} back on ${his} bed and kneel over ${him}, sliding your hard cock into ${his} soft breast, making good use of ${his} fuckable nipple.`);
						seX(agent, "mammary", V.PC, "penetrative", 2);
					} else if (agent.boobs >= 400 && V.PC.dick > 0) {
						t.push(`Impatient, you push ${him} back on ${his} bed and kneel over ${him}, sliding your hard cock between ${his} soft breasts.`);
						seX(agent, "mammary", V.PC, "penetrative", 2);
					} else if (V.PC.boobs >= 300) {
						t.push(`Partway through the process, though, ${he} finds ${himself} terribly distracted by your breasts, and begins fondling and kissing them. It's the start of a great evening.`);
						SimpleSexAct.Player(agent, 2);
					} else {
						t.push(`${He} steps out for the briefest of moments, only to return with two pairs of gigantic fake tits for you both to wear. It's the start of a great, rather bouncy, evening`);
						SimpleSexAct.Player(agent, 2);
					}
				} else if (agent.fetish === "pregnancy") {
					if (V.PC.dick > 0 && (agent.vagina >= 0 || agent.mpreg === 1)) {
						t.push(`Impatient, you push ${him} back on the bed and slide into ${his} wet pussy. ${He} begs you to put a baby in ${him}, and over the course of the evening you fill ${him} up several times.`);
						if (canImpreg(agent, V.PC)) {
							t.push(knockMeUp(agent, 25, 2, V.PC.ID));
						} else {
							t.push(`Both of you know, of course, that you can't actually get ${him} pregnant, but the fantasy is fun anyway.`);
						}
						if (agent.mpreg === 1) {
							t.push(VCheck.Anal(agent, 4));
						} else {
							t.push(VCheck.Vaginal(agent, 4));
						}
					} else if (canPenetrate(agent) && V.PC.vagina > 0) {
						t.push(`Impatient, you push ${him} back on the bed and slide ${his} dick into your wet pussy. ${He} begs you to let ${him} put a baby in you, and over the course of the evening ${he} fills you up several times.`);
						if (canImpreg(V.PC, agent)) {
							t.push(knockMeUp(V.PC, 25, 0, agent.ID));
						} else {
							t.push(`Both of you know, of course, that ${he} can't actually get you pregnant, but the fantasy is fun anyway.`);
						}
						seX(V.PC, "vaginal", agent, "penetrative", 4);
					} else if (V.PC.pregKnown === 1) {
						t.push(`Partway through the process, though, ${he} finds ${himself} terribly distracted by the bun${V.PC.pregType > 1 ? "s" : ""} in your oven, and begins fondling and kissing your gravid swell. It's the start of a great evening.`);
						SimpleSexAct.Player(agent, 2);
					} else {
						t.push(`${He} steps out for the briefest of moments, only to return with`);
						if (agent.belly < 2000) {
							t.push(`a pair of big fake pregnant bellies for the two of you to wear.`);
						} else {
							t.push(`a completely ridiculous oversized pregnant belly for you to wear.`);
						}
						t.push(`It's the start of a great, if a little awkward, evening.`);
						SimpleSexAct.Player(agent, 2);
					}
				} else if (agent.fetish === "dom") {
					t.push(`${He} quickly runs out of patience, though, and pushes you back on ${his} bed`);
					if (V.PC.dick > 0) {
						t.push(`slides onto your hard dick.`);
						if (agent.vagina >= 0) {
							t.push(VCheck.Vaginal(agent, 2));
						} else {
							t.push(VCheck.Anal(agent, 2));
						}
					} else if (canPenetrate(agent) && (V.PC.vagina > 0 || V.PC.anus > 0)) {
						t.push(`mounts you.`);
						if (V.PC.vagina > 0) {
							seX(V.PC, "vaginal", agent, "penetrative");
						} else {
							seX(V.PC, "anal", agent, "penetrative");
						}
					} else if (agent.vagina >= 0) {
						t.push(`sits on your face; of course, getting you to eat ${him} out won't be so easy.`);
						SimpleSexAct.Player(agent, 2);
					} else if (agent.dick > 0) {
						t.push(`sticks ${his} dick in your face; of course, getting you to suck ${him} off won't be so easy.`);
						SimpleSexAct.Player(agent, 2);
					} else {
						t.push(`slides ${his} tongue into your mouth.`);
						SimpleSexAct.Player(agent, 2);
					}
					t.push(`${He} and you struggle playfully for dominance throughout the evening, and you know you've made a great choice for administering ${arcology.name}.`);
				} else if (agent.fetish === "sadist") {
					t.push(`${He} runs out of patience before long, though, forcefully pushing you back onto ${his} bed. ${He} raises ${his} hand as if to strike you, before ${he} realizes what ${he}'s doing. ${He} makes it a point to temper ${his} sadistic tendencies for the evening.`);
					SimpleSexAct.Player(agent, 2);
				} else if (agent.fetish === "masochist") {
					t.push(`Impatient, and knowing how much ${he} likes to be manhandled, you throw ${him} back onto his bed and use him brutally.`);
					SimpleSexAct.Player(agent, 2);
				} else {
					t.push(`Impatient, you pull ${him} onto ${his} bed and show ${him} how much you've missed having ${him} easily accessible in ${home.name}.`);
					SimpleSexAct.Player(agent, 2);
				}
				t.push(`After a couple hours of playtime, both of you collapse, exhausted, with ${agent.slaveName} affectionately wrapped around your side.`);
			}
			t.push(`You rest for an hour or so before heading back to ${home.name} with ${BG ? BG.slaveName : "your drone escort"}.`);
			App.Events.addParagraph(frag, t);

			return frag;
		}

		function virginityWarning() {
			const virgins = [];
			if (agent && (agent.vagina === 0 || agent.anus === 0)) {
				virgins.push(agent.slaveName);
			}
			if (agentLover && (agentLover.vagina === 0 || agentLover.anus === 0)) {
				virgins.push(agentLover.slaveName);
			}
			if (virgins.length > 0) {
				return `This option may take ${toSentence(virgins)}'s virginity.`;
			}
			return null;
		}

		function discipline() {
			t = [];
			t.push(`Every arcology has its share of dissidents; it's one of the inevitable results of the semi-anarchic nature of the Free Cities. You have an opportunity to build your own <span class="reputation inc">reputation</span> and also help secure ${agent ? `${agent.slaveName}'s` : `your indirect`} ${V.secExpEnabled ? `<span class="darkviolet">authority</span>` : `authority`} over ${arcology.name}, and it would be a shame to let it pass unheeded. You spend the rest of the day helping pass judgement, and even administer a few whippings and assfuckings yourself, just for good measure.`);
			repX(100, "event");
			if (V.secExpEnabled) {
				App.Mods.SecExp.authorityX(250);
			}
			return t;
		}

		function club() {
			t = [];
			t.push(`Although you have no shortage of sex slaves willing to service you in ${home.name}, you've come all the way out to ${arcology.name} and visiting the club sounds like a great idea.`);
			if (agent) {
				t.push(agent.slaveName);
				if (agentLover) {
					t.push(`and ${agentLover.slaveName} accompany you, which you appreciate since you rarely see them in ${home.name}.`);
				} else {
					t.push(`accompanies you, which you appreciate since you rarely see ${him} in ${home.name}.`);
				}
			}
			const {slave: DJ} = generateMarketSlave("neighbor", V.arcologies.findIndex(a => a.direction === arcology.direction));
			const {heDJ, hisDJ} = getPronouns(DJ).appendSuffix("DJ");
			t.push(`The DJ, a talented ${V.seeRace ? DJ.race : ``} dancer with ${App.Desc.eyesColor(DJ)} who looks about ${num(DJ.visualAge)}, starts up a hopping groove, and you enjoy dancing for a little while before ${heDJ} comes over and asks you to use ${hisDJ} body. Your ensuing public display of vigor <span class="reputation inc">boosts your reputation</span> among the clubgoers.`);
			repX(150, "event");
			actX(V.PC, "penetrative");
			return t;
		}

		function goHome() {
			t = [];
			t.push(`After a long day at ${arcology.name}, you`);
			if (BG) {
				t.push(`and ${BG.slaveName}`);
			}
			t.push(`head home to ${home.name} and your waiting stable of sex slaves. You're looking forward to a nice ${generalRefreshment()} and some oral sex to round out the evening.`);
			return t;
		}
	}

	/**
	 * Get vidscreen shows based on a list of FSes
	 * @param {FC.FutureSociety[]} FSes
	 * @param {FC.ArcologyState} arc
	 * @returns {string[]} shows
	 */
	getShows(FSes, arc) {
		/** @type {Map<FC.FutureSociety, string>} */
		const showMap = new Map([
			["FSSupremacist", `talk shows supporting ${arc.FSSupremacistRace} supremacy`],
			["FSSubjugationist", `pseudoscientific programs explaining ${arc.FSSubjugationistRace} inferiority`],
			["FSIntellectualDependency", `simple, sexual programs made for slow slaves`],
			["FSSlaveProfessionalism", `self-improvement shows for professional slaves`],
			["FSRepopulationFocus", `medical programs about pregnancy`],
			["FSRestart", `propaganda urging free citizens to join the Societal Elite`],
			["FSGenderFundamentalist", `pornography starring perfectly feminine girls`],
			["FSGenderRadicalist", `pornography starring girls with dicks`],
			["FSPaternalist", `educational programs for the edification of slaves`],
			["FSDegradationist", `violent, nonconsensual pornography`],
			["FSBodyPurist", `sports programs featuring fit, healthy slaves`],
			["FSTransformationFetishist", `medical programs about surgical transformation`],
			["FSYouthPreferentialist", `pornography with young-looking slaves`],
			["FSMaturityPreferentialist", `MILF pornography`],
			["FSStatuesqueGlorification", `pornography starring very tall slaves`],
			["FSPetiteAdmiration", `infomercials for products targeted at short slaves`],
			["FSSlimnessEnthusiast", `programs featuring slim, lithe slaves`],
			["FSAssetExpansionist", `pornography starring slaves with huge assets`],
			["FSPastoralist", `advertisements for dairy products`],
			["FSPhysicalIdealist", `athletic competitions`],
			["FSHedonisticDecadence", `advertisements for spas and gourmet restaurants`],
			["FSChattelReligionist", `religious services for slaves`],
			["FSRomanRevivalist", `state media announcements and readings of Latin poetry`],
			["FSNeoImperialist", `propaganda featuring the Imperial Knights`],
			["FSAztecRevivalist", `shows glorifying the Five Suns and human sacrifice`],
			["FSEgyptianRevivalist", `scientific and cultural programs often featuring cats`],
			["FSEdoRevivalist", `historical dramas set in Edo Japan`],
			["FSArabianRevivalist", `dramatic retellings of traditional Bedouin fables`],
			["FSChineseRevivalist", `ancient Chinese operas`],
			["FSAntebellumRevivalist", `period dramas glorifying the chivalrous South`],
			["FSNull", `documentaries from cultures around the world`],
			// NPC FSes too
			["FSIncestFetishist", `pornography featuring closely-related actors`],
			["FSCummunism", `body-building programs featuring ripped slaves with giant packages`],
		]);
		return FSes.map(fs => showMap.get(fs)).filter(show => !!show);
	}
};
