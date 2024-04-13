// cSpell:ignore gladius, estoc, Tecpatl, kopesh, katana, scimitar, jian, saber

/** @param {App.Entity.SlaveState} slave */
App.UI.SlaveInteract.killSlave = function(slave) {
	const frag = new DocumentFragment();
	const {He, His, he, him, his, daughter, himself} = getPronouns(slave);

	const FS = {
		FSRomanRevivalist: "gladius",
		FSNeoImperialist: "estoc",
		FSAztecRevivalist: "Tecpatl",
		FSEgyptianRevivalist: "kopesh",
		FSEdoRevivalist: "katana",
		FSArabianRevivalist: "scimitar",
		FSChineseRevivalist: "jian",
		FSAntebellumRevivalist: "saber"
	};

	const oneWeek = V.threatened[1];
	const twoWeeks = V.threatened[2];
	const threeWeeks = V.threatened[3];
	const fourWeeks = V.threatened[4];

	const isDevoted = slave.devotion > 50;
	const isAccepting = slave.devotion > 20 && slave.devotion <= 50;
	const isCareful = slave.devotion > -20 && slave.devotion <= 20;

	let weapon = ["handgun", "pistol", "sidearm"].random();
	let qualifiedFS = false;

	for (const [fs, w] of Object.entries(FS)) {
		if (FutureSocieties.isActive(fs)) {
			qualifiedFS = true;
			weapon = w;
			break;
		}
	}

	App.Events.drawEventArt(frag, slave);

	frag.appendChild(intro());

	if (V.pit && V.pit.slaveFightingBodyguard) {
		frag.appendChild(plannedFight());
	} else {
		frag.appendChild(links());
	}

	return frag;

	function intro() {
		const introDiv = document.createElement("div");

		introDiv.append(`You ${canWalk(slave)
			? `call ${slave.slaveName}`
			: `have ${slave.slaveName} brought`} into your office. `);

		if (slave.fuckdoll) {
			introDiv.append(introFuckdoll());
		} else {
			introDiv.append(introStandard());
		}

		return introDiv;

		function introFuckdoll() {
			const text = [];

			text.push(`It's hard to tell the expression on the Fuckdoll's face, but your guess is it's`);

			if (slave.fetish !== Fetish.MINDBROKEN) {
				text.push(`one of`);

				if (slave.devotion > 50) {
					text.push(`adoration.`);
				} else if (slave.devotion > 20) {
					text.push(`calm.`);
				} else if (slave.devotion > -20) {
					text.push(`apprehension.`);
				} else {
					text.push(`hatred.`);
				}
			} else {
				text.push(`blank.`);
			}

			text.push(`You tell ${him} that you've gotten tired of having ${him} around and that you decided it is time to get rid of ${him}. ${He} simply nods, not being able to see you ${canHear(slave) ? `quietly ` : ``}reach behind your desk and pull out your trusty ${weapon}.`);

			return text.join(' ');
		}

		function introStandard() {
			const text = [];

			text.push(`${He} looks at you`);

			if (slave.devotion > 50) {
				text.push(`with adoration`);
			} else if (slave.devotion > 20) {
				text.push(`calmly`);
			} else if (slave.devotion > -20) {
				text.push(`with apprehension`);
			} else {
				text.push(`with hatred`);
			}

			text.push(`and waits for you to continue. You tell ${him} that you've gotten tired of having ${him} around and that you decided it is time to get rid of ${him}.`);

			if (slave.fetish !== Fetish.MINDBROKEN) {
				text.push(`${His} expression changes to one of`);

				if (slave.devotion > 50) {
					text.push(`pure sorrow`);
				} else if (slave.devotion > 20) {
					text.push(`sadness`);
				} else {
					text.push(`relief`);
				}

				text.push(`until you`);
			} else {
				text.push(`${He} just nods dumbly and continues to watch you with a vacant expression, even as`);
			}

			text.push(`${canHear(slave) ? `quietly ` : ``}reach behind your desk and pull out your trusty ${weapon}${introReaction()}`);

			return text.join(' ');

			function introReaction() {
				if (oneWeek.includes(slave.ID)) {
					return introReactionOneWeek();
				}
				if (twoWeeks.includes(slave.ID)) {
					return introReactionTwoWeeks();
				}
				if (threeWeeks.includes(slave.ID)) {
					return introReactionThreeWeeks();
				}
				if (fourWeeks.includes(slave.ID)) {
					return introReactionFourWeeks();
				}

				return introReactionOther();
			}

			function introReactionOneWeek() {
				if (isDevoted) {
					return `. ${He} just looks at you warily; you threatened ${him} just last week, and ${he}'s suspecting you won't go through with it this time either.`;
				} else if (isAccepting) {
					return `, at which a brief moment of confusion flashes across ${his} face. You threatened ${him} only a week ago, and ${he}'s beginning to think you won't actually do it.`;
				} else if (isCareful) {
					return `. You can just barely detect a brief moment of scorn cross ${his} face – you threatened ${him} just last week, and ${he}'s starting to think you won't actually go through with it.`;
				} else {
					return `, at which ${he} laughs with derision. You threatened ${him} only last week, and ${he}'s calling your bluff.`;
				}
			}

			function introReactionTwoWeeks() {
				if (isDevoted) {
					return `. ${He} looks at you with a hint of trepidation in ${his} eyes, but it seems for the most part ${he} thinks you won't do it – you did give ${him} an empty threat a couple of weeks ago, after all.`;
				} else if (isAccepting) {
					return `, to which ${he} just raises one eyebrow. You threatened ${him} just a few weeks ago, so why wouldn't you be bluffing now?`;
				} else if (isCareful) {
					return `. ${He} says nothing, but you can tell ${he} seems to think you're bluffing – you did threaten ${him} only a couple of weeks ago, after all.`;
				} else {
					return `, at which ${he} scoffs. You threatened ${him} a couple of weeks ago, and you're probably bluffing again.`;
				}
			}

			function introReactionThreeWeeks() {
				if (isDevoted) {
					return `, at which concern covers ${his} features. You threatened ${him} three weeks ago; surely you're bluffing again – right?`;
				} else if (isAccepting) {
					return `. ${He} looks slightly worried, but also seems to think you might be bluffing. After all, you did threaten ${him} three weeks ago, so why would this threat be any less empty?`;
				} else if (isCareful) {
					return `. ${He} looks somewhat concerned, but mostly seems to think you're probably bluffing. You did threaten ${him} only three weeks ago, after all, so you're probably not going to do it today either... right?`;
				} else {
					return `. ${He} says nothing, but you can tell ${he}'s thinking you're bluffing again. You threatened ${him} three weeks ago, and ${he} seems to doubt you're going to kill ${him} now, either.`;
				}
			}

			function introReactionFourWeeks() {
				if (isDevoted) {
					return `. A look of panic covers ${his} face, but you didn't kill ${him} four weeks ago, so maybe you won't do it now, either. Right?`;
				} else if (isAccepting) {
					return `, at which ${he} becomes visibly nervous. You threatened ${him} four weeks ago and ${he} seems to think you might be bluffing again, but ${he} can't tell.`;
				} else if (isCareful) {
					return `, at which ${he} looks rather unsettled. ${He} seems to think you might be bluffing, like you did four weeks ago when you last threatened ${him}.`;
				} else {
					return `, to which panic flashes across ${his} face. ${He} quickly recovers and puts on a brave face, though – you threatened ${his} life four weeks ago, so you're probably bluffing again. Right?`;
				}
			}

			function introReactionOther() {
				return `, at which point abject terror fills ${his} face. ${He} immediately ${hasBothLegs(slave) ? `drops to ${his} knees and ` : ``}begins openly begging for you to show mercy.`;
			}
		}
	}

	function plannedFight() {
		const plannedFightsDiv = document.createElement("div");

		plannedFightsDiv.append(`${!slave.fuckdoll && slave.fetish !== Fetish.MINDBROKEN ? `You abruptly cut ${his} begging short once you` : `You change your mind as you suddenly`} remember ${getSlave(V.pit.slaveFightingBodyguard).slaveName} is already fighting your bodyguard ${S.Bodyguard.slaveName} for ${his} life this week.`);

		App.UI.DOM.appendNewElement("div", plannedFightsDiv, App.UI.DOM.passageLink(`Cancel the fight`, V.returnTo, () => {
			V.pit.slaveFightingBodyguard = null;
		}), ['margin-top']);

		return plannedFightsDiv;
	}

	function links() {
		const linksDiv = App.UI.DOM.makeElement("div", null, ["margin-top"]);

		const links = [];
		const disabledReasons = getDisabledReasons();

		const combatLinkText = `Let ${him} win ${his} life in combat`;

		links.push(
			App.UI.DOM.link(`Kill ${him}`, () => {
				App.UI.DOM.replace(linksDiv, kill);
			}),
			App.UI.DOM.link(`Have mercy on ${him}`, () => {
				App.UI.DOM.replace(linksDiv, mercy);
			}),
		);

		if (disabledReasons.length) {
			links.push(App.UI.DOM.disabledLink(combatLinkText, disabledReasons));
		} else {
			links.push(App.UI.DOM.link(combatLinkText, () => {
				App.UI.DOM.replace(linksDiv, combat);
			}));
		}

		linksDiv.appendChild(App.UI.DOM.generateLinksStrip(links));

		return linksDiv;

		function getDisabledReasons() {
			const arr = [];

			if (V.pit && V.pit.slaveFightingBodyguard) {
				arr.push(`You already have a slave fighting your bodyguard this week.`);
			}

			if (slave.fuckdoll) {
				arr.push(`Fuckdolls cannot properly fight.`);
			}

			if (slave.fetish === Fetish.MINDBROKEN) {
				arr.push(`Mindbroken slaves cannot properly fight.`);
			}

			if (!S.Bodyguard) {
				arr.push(`You must have a bodyguard for ${slave.slaveName} to fight.`);
			}

			if (!V.pit) {
				arr.push(`You must first build a pit for combat.`);
			}

			return arr;
		}

		function kill() {
			const killDiv = document.createElement("div");

			if (!slave.fuckdoll && slave.fetish !== Fetish.MINDBROKEN) {
				killDiv.append(`You simply smile at ${him} and tell ${him} not to worry `);
			} else {
				killDiv.append(`You say nothing `);
			}

			killDiv.append(`as you continue ${qualifiedFS
				? `sharpening your ${weapon}.`
				: `threading on a suppressor.`} ${slave.slaveName} ${!slave.fuckdoll && slave.fetish !== Fetish.MINDBROKEN
				? `gives an audible sigh of relief and begins to thank you profusely, though ${his} thanks are cut short as the sound of`
				: `continues to stand there ${slave.fetish === Fetish.MINDBROKEN ? `dumbly` : ``} until the sound of`} ${qualifiedFS
				? `a sharp edge slicing through flesh`
				: `a suppressed gunshot`} rings through the room. You have another servant clean up the mess as you continue with what you were previously doing.`);

			killDiv.append(relations(), resetCounters());

			if (isShelterSlave(slave)) {
				App.Events.addParagraph(killDiv, [`You hope word of this won't reach back to the Slave Shelter, but <span class="red">somehow you know it will.</span>`]);
				V.shelterAbuse += 2;
			}

			removeSlave(slave);

			return killDiv;

			function relations() {
				// TODO: potentially expand to allow for checking for more than one relation (i.e. sister/mother/lover, etc)
				const relationsDiv = App.UI.DOM.makeElement("div", null, ['margin-top']);

				const halfSisters = [];
				const sisters = [];
				const twins = [];
				const daughters = [];

				const isWife = slave.relationship === -3;

				let mother = null;
				let father = null;
				let relationshipTarget = null;
				let rival = null;

				for (const target of V.slaves) {
					if (target.devotion > 50 && isWife) {
						target.trust -= 25;
					}

					if (slave.mother === target.ID) {
						mother = target.ID;
						continue;
					}

					if (slave.father === target.ID) {
						father = target.ID;
						continue;
					}

					if (target.mother === slave.ID || target.father === slave.ID) {
						daughters.push(target.ID);
						continue;
					}

					if (areSisters(slave, target)) {
						switch (areSisters(slave, target)) {
							case 1:
								twins.push(target.ID);
								continue;
							case 2:
								sisters.push(target.ID);
								continue;
							case 3:
								halfSisters.push(target.ID);
								continue;
							default:
								throw new Error(`Unexpected value '${areSisters(slave, target)}' found in relations()`);
						}
					}

					if (slave.relationship > 0 && slave.relationshipTarget === target.ID) {
						relationshipTarget = target.ID;
						continue;
					}

					if (slave.rivalry && slave.rivalryTarget === target.ID) {
						rival = target.ID;
						continue;
					}

					if (target.devotion > 50) {
						target.devotion -= 15;
						continue;
					}
				}

				if (mother) {
					relationsDiv.appendChild(getMotherEffects(mother));
				}

				if (father) {
					relationsDiv.appendChild(getFatherEffects(father));
				}

				if (daughters.length) {
					relationsDiv.appendChild(getDaughtersEffects(daughters));
				}

				if (twins.length) {
					relationsDiv.appendChild(getTwinsEffects(twins));
				}

				if (sisters.length) {
					relationsDiv.appendChild(getSistersEffects(sisters));
				}

				if (halfSisters.length) {
					relationsDiv.appendChild(getHalfSistersEffects(halfSisters));
				}

				if (relationshipTarget) {
					relationsDiv.appendChild(getRelationshipEffects(relationshipTarget));
				}

				if (isWife) {
					relationsDiv.appendChild(getWifeEffects());
				}

				if (rival) {
					relationsDiv.appendChild(getRivalEffects(rival));
				}

				if (FutureSocieties.isActive('FSPaternalist')) {
					relationsDiv.appendChild(getFSEffects());
				}

				return relationsDiv;

				function getMotherEffects(ID) {
					const subDiv = document.createElement("div");

					const mother = getSlave(ID);

					App.Events.addParagraph(subDiv, [
						`${His} mother ${mother.slaveName} is <span class="devotion dec">grief-stricken</span> that you would take ${his} ${daughter} from ${getPronouns(mother).him}.`
					]);

					mother.devotion -= 30;

					return subDiv;
				}

				function getFatherEffects(ID) {
					const subDiv = document.createElement("div");

					const father = getSlave(ID);

					App.Events.addParagraph(subDiv, [
						`${His} father ${father.slaveName} is <span class="devotion dec">grief-stricken</span> that you would take ${his} ${daughter} from ${getPronouns(father).him}.`
					]);

					father.devotion -= 30;

					return subDiv;
				}

				function getDaughtersEffects(arr) {
					if (arr.length === 1) {
						const subDiv = document.createElement("div");

						const daughter = getSlave(arr[0]);
						const mother = getPronouns(slave).mother;
						const {him: him2, daughter: daughter2} = getPronouns(daughter);

						App.Events.addParagraph(subDiv, [
							`${His} ${daughter2} ${daughter.slaveName} is <span class="devotion dec">horrified</span> that you would take ${his} ${mother} from ${him2}.`
						]);

						daughter.devotion -= 25;

						return subDiv;
					} else {
						const subDiv = document.createElement("div");

						const mother = getPronouns(slave).mother;

						arr.forEach(i => getSlave(i).devotion -= 25);

						App.Events.addParagraph(subDiv, [
							`${His} children, ${toSentence(arr.map(i => getSlave(i).slaveName))}, are <span class="devotion dec">horrified</span> that you would take their ${mother} from them.`
						]);

						return subDiv;
					}
				}

				function getTwinsEffects(arr) {
					if (arr.length === 1) {
						const subDiv = document.createElement("div");

						const twin = getSlave(arr[0]);
						const sister = getPronouns(slave).sister;
						const {him: him2, his: his2} = getPronouns(twin);

						App.Events.addParagraph(subDiv, [
							`${His} twin ${twin.slaveName} is <span class="devotion dec">devastated</span> that you would take ${his2} ${sister} from ${him2}.`
						]);

						twin.devotion -= 30;

						return subDiv;
					} else {
						const subDiv = document.createElement("div");
						const sister = getPronouns(slave).sister;

						arr.forEach(i => getSlave(i).devotion -= 30);

						App.Events.addParagraph(subDiv, [
							`${His} twins, ${toSentence(arr.map(i => getSlave(i).slaveName))} are <span class="devotion dec">devastated</span> that you would take their ${sister} from them.`
						]);

						return subDiv;
					}
				}

				function getSistersEffects(arr) {
					if (arr.length === 1) {
						const subDiv = document.createElement("div");

						const firstSister = getSlave(arr[0]);
						const sister = getPronouns(slave).sister;
						const {him: him2, his: his2} = getPronouns(firstSister);

						App.Events.addParagraph(subDiv, [
							`${His} sister ${firstSister.slaveName} is <span class="devotion dec">grief-stricken</span> that you would take ${his2} ${sister} from ${him2}.`
						]);

						firstSister.devotion -= 25;

						return subDiv;
					} else {
						const subDiv = document.createElement("div");

						const sister = getPronouns(slave).sister;

						arr.forEach(i => getSlave(i).devotion -= 25);

						App.Events.addParagraph(subDiv, [
							`${His} sisters, ${toSentence(arr.map(i => getSlave(i).slaveName))} are <span class="devotion dec">grief-stricken</span> that you would take their ${sister} from them.`
						]);

						return subDiv;
					}
				}

				function getHalfSistersEffects(arr) {
					if (arr.length === 1) {
						const subDiv = document.createElement("div");

						const halfSister = getSlave(arr[0]);
						const sister = getPronouns(slave).sister;
						const {him: him2} = getPronouns(halfSister);

						App.Events.addParagraph(subDiv, [
							`${His} half-sister ${halfSister.slaveName} is <span class="devotion dec">saddened</span> that you would take ${his} ${sister} from ${him2}.`
						]);

						halfSister.devotion -= 20;

						return subDiv;
					} else {
						const subDiv = document.createElement("div");

						const sister = getPronouns(slave).sister;

						arr.forEach(i => getSlave(i).devotion -= 20);

						App.Events.addParagraph(subDiv, [
							`${His} half-sisters, ${toSentence(arr.map(i => getSlave(i).slaveName))}, are <span class="devotion dec">saddened</span> that you would take their ${sister} from them.`
						]);

						return subDiv;
					}
				}

				function getRelationshipEffects(ID) {
					const target = getSlave(ID);
					if (target.fetish !== Fetish.MINDBROKEN) {
						const subDiv = document.createElement("div");

						App.Events.addParagraph(subDiv, [
							`${target.slaveName} is <span class="devotion dec">grief-stricken</span> that you have killed ${getPronouns(target).his} best source of comfort and companionship in a life of bondage.`
						]);

						target.devotion -= target.relationship * 10;

						return subDiv;
					}
				}

				function getWifeEffects() {
					const subDiv = document.createElement("div");

					V.slaves
						.filter(slave => slave.devotion > 50)
						.forEach(slave => slave.devotion -= 15);

					App.Events.addParagraph(subDiv, [
						`Killing one of your slave wives is socially <span class="reputation dec">unacceptable.</span> In addition, your other devoted slaves are <span class="devotion dec">worried</span> that you might not respect their status.`
					]);

					repX(-200, "event", slave);

					return subDiv;
				}

				function getRivalEffects(ID) {
					const subDiv = document.createElement("div");

					const rival = getSlave(ID);

					App.Events.addParagraph(subDiv, [
						`${slave.slaveName}'s rival, ${rival.slaveName}, is <span class="devotion inc">pleased</span> that ${getPronouns(rival).he} won't have to see ${him} anymore.`
					]);

					rival.devotion += rival.rivalry * 5;

					return subDiv;
				}

				function getFSEffects() {
					const subDiv = document.createElement("div");

					App.Events.addParagraph(subDiv, [
						`Taking the life of one of your own slaves is <span class="reputation dec">a shocking notion</span> to your Paternalist society.`
					]);

					FutureSocieties.Change("Paternalist", -20);

					return subDiv;
				}
			}

			function resetCounters() {
				V.threatened = [[], [], [], [], []];

				if (V.threatened[1].length +
					V.threatened[2].length +
					V.threatened[3].length +
					V.threatened[4].length > 0) {
					return `All the slaves you had threatened before know now that you mean business.`;
				}

				return '';
			}
		}

		function mercy() {
			const mercyDiv = document.createElement("div");

			if (!slave.fuckdoll && slave.fetish !== Fetish.MINDBROKEN) {
				App.Events.addParagraph(mercyDiv, [mercyReaction()]);
			} else {
				mercyDiv.append(`You change your mind, and with a wave of your hand, send ${slave.slaveName} back to ${his} duties. Maybe some other time.`);
			}

			oneWeek.push(slave.ID);

			return mercyDiv;

			function mercyReaction() {
				if (oneWeek.includes(slave.ID)) {
					return mercyReactionOneWeek();
				}
				if (twoWeeks.includes(slave.ID)) {
					return mercyReactionTwoWeeks();
				}
				if (threeWeeks.includes(slave.ID)) {
					return mercyReactionThreeWeeks();
				}
				if (fourWeeks.includes(slave.ID)) {
					return mercyReactionFourWeeks();
				}

				return mercyReactionOther();

				// TODO: not sure about some of this text
				function mercyReactionOneWeek() {
					if (isDevoted) {
						slave.devotion -= 5;
						slave.trust -= 10;

						return `You tell ${him} that you've decided to spare ${him} today. ${He} just looks at you with confusion – you've threatened ${him} for weeks in a row now, and you haven't gone through with it. ${He}'s beginning to think you're just <span class="devotion dec">full of it</span> and <span class="trust dec">not to be trusted.</span>`;
					} else if (isAccepting) {
						slave.devotion -= 7;
						slave.trust -= 15;

						return `You tell ${him} that, at least for the time being, you've decided to keep ${him} around. ${He} just looks at you warily – if you didn't kill ${him} last week or this week, you must just be <span class="devotion dec">full of it,</span> and <span class="trust dec">not to be trusted.</span>`;
					} else if (isCareful) {
						slave.devotion -= 10;
						slave.trust -= 20;

						return `You tell ${him} that you've changed your mind and decided to keep ${him} around, to which ${he} doesn't reply. Clearly, if you're just bluffing for weeks in a row, you're just <span class="devotion dec">full of it</span> and <span class="trust dec">not to be trusted.</span>`;
					} else {
						const man = ["XY", "XXY", "XYY", "X0", "X"].includes(V.PC.genes) ? `man` : `woman`;

						slave.devotion -= 15;
						slave.trust -= 25;

						return `You tell ${him} that you've decided to spare ${him} today. ${He} simply scoffs and rolls ${his} eyes – of course you wouldn't; <span class="devotion dec">you're full of it.</span> You're obviously not a ${man} of your word, <span class="trust dec">and not someone to be trusted.</span>`;
					}
				}

				function mercyReactionTwoWeeks() {
					if (isDevoted) {
						slave.devotion -= 3;
						slave.trust -= 7;

						return `You've decided to spare ${his} life for the time being, you tell ${him}. ${He} nods and ${canTalk(slave) ? `mumbles` : `signs`} a quick "thank you". You didn't kill ${him} last time you threatened ${him}, and ${he}'s pretty sure <span class="devotion dec">you're just full of it</span> and <span class="trust dec">not someone to be trusted.</span>`;
					} else if (isAccepting) {
						slave.devotion -= 5;
						slave.trust -= 10;

						return `You tell ${him} that you've decided to spare ${him} for now. ${He} ${canTalk(slave) ? `mumbles` : `signs`} a quick "thank you", though you can tell ${he} didn't really mean it – you didn't kill ${his} last time you threatened ${him}, and ${he}'s pretty sure <span class="devotion dec">you're just full of it</span> and <span class="trust dec">not someone to be trusted.</span>`;
					} else if (isCareful) {
						slave.devotion -= 7;
						slave.trust -= 15;

						return `You tell ${him} you've changed your mind for the time being, to which ${he} doesn't reply. You threatened ${him} a couple of weeks ago, and if you didn't go through with it then, why would you now? As far as ${he}'s concerned, you're obviously <span class="devotion dec">just full of it</span> and <span class="trust dec">not someone to be trusted.</span>`;
					} else {
						slave.devotion -= 10;
						slave.trust -= 15;

						return `You tell ${him} that you've decided to spare ${him} today. ${He} simply scoffs and rolls ${his} eyes – of course you wouldn't; <span class="devotion dec">you're full of it.</span> You're obviously someone who makes empty threats, <span class="trust dec">and not someone to be trusted.</span>`;
					}
				}

				function mercyReactionThreeWeeks() {
					if (isDevoted) {
						slave.devotion -= 2;
						slave.trust -= 5;

						return `You tell ${him} that you've decided to spare ${his} life for now. ${He} replies with a "thank you", though you can tell ${he} is obviously <span class="devotion dec">quite troubled</span> by the fact that you would threaten one of your devoted slaves. <span class="trust dec">Obviously ${he} means very little to you.</span>`;
					} else if (isAccepting) {
						slave.devotion -= 3;
						slave.trust -= 7;

						return `You've decided to spare ${him} for now, you tell ${him}. ${He} hesitantly gives you a quick "thank you", but you can tell ${he} is obviously <span class="devotion dec">quite troubled</span> by the fact that you would threaten ${him} in the first place. <span class="trust dec">Obviously ${he} means very little to you.</span>`;
					} else if (isCareful) {
						slave.devotion -= 5;
						slave.trust -= 10;

						return `You tell ${him} that you've changed your mind for now. ${He} nods, seemingly <span class="trust dec">afraid</span> to${canTalk(slave) ? ` say or` : ``} do anything that would make you change your mind. The fact that you value your slaves' lives so little also <span class="devotion dec">worries ${him}.</span>`;
					} else {
						slave.devotion -= 7;
						slave.trust -= 10;

						return `You inform that you've changed your mind and are willing to give ${him} another chance. ${He} doesn't seems very grateful, but then, ${he} didn't look too worried to begin with, either – you didn't kill ${him} last time you threatened, so you must just be <span class="devotion dec">all bluster and no balls.</span> <span class="trust dec">${He} obviously can't trust someone who can't keep their word, either.</span>`;
					}
				}

				function mercyReactionFourWeeks() {
					if (isDevoted) {
						slave.devotion -= 2;
						slave.trust -= 3;

						return `You tell ${him} that you've decided to spare ${him} for the time being. You tell ${him} as much, to which ${he} replies with profuse thanks. That you would threaten one of your devoted slaves at all <span class="devotion dec">troubles ${him},</span> though, and ${he} begins to <span class="trust dec">fear how little you value ${his} life.</span>`;
					} else if (isAccepting) {
						slave.devotion--;
						slave.trust -= 5;

						return `You inform ${him} that you've changed your mind for the time being. You can see relief fill ${his} features, and ${he} begins to thank you profusely. Threatening ${him} has given ${him} <span class="devotion dec">second thoughts</span> about how much ${he}'s willing to accept you as ${his} owner, though, and ${he} begins to <span class="trust dec">fear how little you value ${his} life.</span>`;
					} else if (isCareful) {
						slave.devotion += 3;
						slave.trust -= 7;

						return `You decide to spare ${him} for now, and you tell ${him} as much. ${He} seems somewhat <span class="devotion inc">genuinely grateful</span> for another chance, but also <span class="trust dec">afraid</span> that ${he} means so little to you.`;
					} else {
						slave.devotion += 5;
						slave.trust -= 7;

						return `You've decided to give ${him} another chance, you tell ${him}. ${He} looks <span class="devotion inc">genuinely grateful</span> for another chance, but also <span class="trust dec">afraid</span> that ${he} might${canTalk(slave) ? ` say or` : ``} do something to make you change your mind.`;
					}
				}

				function mercyReactionOther() {
					if (isDevoted) {
						slave.devotion += 5;
						slave.trust -= 15;
					} else if (isAccepting) {
						slave.devotion += 10;
						slave.trust -= 25;
					} else if (isCareful) {
						slave.devotion += 15;
						slave.trust -= 30;
					} else {
						slave.devotion += 20;
						slave.trust -= 35;
					}

					return `You make a show of considering sparing ${his} life, then, with a heavy sigh, unbuckle your pants and sit down at your desk. You beckon to ${him}, and ${he} just about trips over ${himself} as ${he} hastily makes ${his} way over to you. ${His} blowjob isn't the best you've ever had, ${him} <span class="trust dec">sobbing</span> as much as ${he} is, but ${his} enthusiasm more than makes up for it. After you finish deep in ${his} throat, ${he} sits back and wipes away ${his} tears, sniffling and <span class="devotion inc">thanking you again</span> for giving ${him} another chance.`;
				}
			}
		}

		function combat() {
			const combatDiv = document.createElement("div");

			let reactionText = `The fear on ${his} face is palpable, though ${he} nods slowly and agrees, not seeing another choice.`;

			if (slave.skill.combat > 30) {
				reactionText = `${He} nods ${his} head and straightens up, as though mentally preparing ${himself} for the fight for ${his} life.`;
			}
			combatDiv.append(bodyguard());

			return combatDiv;

			function bodyguard() {
				const subDiv = document.createElement("div");

				subDiv.append(`You tell ${him} you'll let your bodyguard decide ${his} fate — if ${he} wants to live, ${he}'ll have to beat ${S.Bodyguard.slaveName} in hand-to-hand combat in ${V.pit.name}. `, reactionText);

				V.pit.slaveFightingBodyguard = slave.ID;
				if (V.pit.lethal === 0) {
					V.pit.lethal = 1;
				}

				return subDiv;
			}
		}
	}
};
