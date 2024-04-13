// cSpell:ignore half-assed

App.Events.RERelativeRecruiter = class RERelativeRecruiter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // first actor - recruiter
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.fuckdoll === 0,
				s => s.devotion > 50,
				s => s.canRecruit === 1,
				s => totalRelatives(s) === 0 || V.limitFamilies !== 1,
				s => this._chooseTargetRelative(s)
			]
		];
	}

	/** pick a target relative and store it in the event parameters
	 * @param {App.Entity.SlaveState} slave who's doing the recruiting (should be first actor)
	 * @returns {boolean} success or failure
	 */
	_chooseTargetRelative(slave) {
		// make sure the slave has a genepool entry (everyone should)
		const gp = V.genePool.find(s => s.ID === slave.ID);
		if (!gp) {
			console.log(`Slave with ID ${slave.ID} is missing their genepool entry.`);
			slave.canRecruit = 0;
			return false;
		}
		const choices = this._getTargetRelativeChoices(slave, gp);
		if (choices.length === 0) {
			slave.canRecruit = 0; // slave has exhausted possible relatives, can't recruit any longer
			return false;
		}
		this.params.relative = choices.random();
		return true;
	}

	/** find all eligible target relatives for a slave; one will be selected randomly (or by cheating)
	 * @param {App.Entity.SlaveState} slave who's doing the recruiting (should be first actor)
	 * @param {App.Entity.SlaveState} [gp] genepool entry for this slave, if known
	 * @returns {string[]}
	 */
	_getTargetRelativeChoices(slave, gp) {
		let recruit = [];
		if (!gp) {
			gp = V.genePool.find(s => s.ID === slave.ID);
		}

		const pushWeight = (value, weight=1) => recruit.push(...Array(weight).fill(value));

		if (slave.mother === 0 && V.seeDicks !== 100) {
			const momAge = getParentAgeRange(slave, false);
			if (momAge.max >= momAge.min) {
				pushWeight("mother", 3);
			}
		}
		if (slave.father === 0 && V.seeDicks !== 0) {
			const dadAge = getParentAgeRange(slave, true);
			if (dadAge.max >= dadAge.min) {
				pushWeight("father");
			}
		}

		// TODO: age should probably be checking genepool, not current state, since the child would have been born before the event slave was in your possession
		if (slave.daughters < 3 && (slave.actualAge > V.minimumSlaveAge + V.fertilityAge) && isFertile(gp) && slave.trueVirgin !== 1) {
			if (V.seeDicks !== 100) {
				pushWeight("daughter", 2);
			}
			if (V.seeDicks !== 0) {
				pushWeight("son");
			}
		} else if (slave.daughters < 3 && (slave.actualAge > V.minimumSlaveAge + V.potencyAge) && gp.balls > 0) {
			if (V.seeDicks !== 100) {
				pushWeight("daughter", 2);
			}
			if (V.seeDicks !== 0) {
				pushWeight("son");
			}
		}

		if (slave.sisters < 3) {
			if (slave.actualAge < V.retirementAge - 2) {
				if (V.seeDicks !== 100) {
					pushWeight("older sister", 2);
				}
				if (V.seeDicks !== 0) {
					pushWeight("older brother", 2);
				}
			}
			if (slave.actualAge > V.minimumSlaveAge + 1) {
				if (V.seeDicks !== 100) {
					pushWeight("younger sister", 2);
				}
				if (V.seeDicks !== 0) {
					pushWeight("younger brother", 2);
				}
			}
			pushWeight("twin");
		}

		return recruit;
	}

	/** returns a description for a given background
	 * @param {App.Entity.SlaveState} slave (relative)
	 * @param {string} background
	 * @returns {string} description
	 */
	_getBackgroundDescription(slave, background) {
		const {His, he, his} = getPronouns(slave);
		const backgroundDescriptions = {
			"prostitute": `${he} was used as a prostitute by ${his} previous owner`,
			"shemale prostitute": `${he} was used as a shemale prostitute by ${his} previous owner`,
			"bed MILF": `${he} was used as a bed slave by ${his} MILF-loving owner`,
			"gelded servant": `${he} was gelded and used as a house servant`,
			"sex toy": `${he} was kept as a personal sex toy by ${his} previous owner`,
			"flat toy": `${he} was kept as a bedslave by an owner that loves flat chests`,
			"bimbo toy": `${he} was kept as a personal toy by ${his} bimbo-loving owner`,
		};
		if (backgroundDescriptions[background]) {
			return `${His} listing states that ${backgroundDescriptions[background]}.`;
		}
		return ``; // twin, for example, has no specific background
	}

	/** returns the possible backgrounds for a given relative type; one will be selected randomly (or by cheating)
	 * Currently super simple (returns exactly one element) to emulate the old twine event, but may easily be expanded if more backgrounds are written
	 * @param {string} relative
	 * @returns {string[]}
	 */
	_getRelativeBackgrounds(relative) {
		let bgs = [];
		const pushWeight = (value, weight=1) => bgs.push(...Array(weight).fill(value));

		if (relative === "daughter") {
			pushWeight("prostitute");
		} else if (relative === "son") {
			pushWeight("shemale prostitute");
		} else if (relative === "mother") {
			pushWeight("bed MILF");
		} else if (relative === "father") {
			pushWeight("gelded servant");
		} else if (relative === "older sister" || relative === "older brother") {
			pushWeight("sex toy");
		} else if (relative === "younger sister") {
			pushWeight("flat toy");
		} else if (relative === "younger brother") {
			pushWeight("bimbo toy");
		} else if (relative === "twin") {
			pushWeight("twin");
		}
		return bgs;
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his} = getPronouns(eventSlave);
		let newSlave;

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave);
		node.appendChild(artDiv);

		// re-choose the relative (a valid one was assigned during her casting, but the last slave to go through casting might not have been the one selected)
		this._chooseTargetRelative(eventSlave);
		// pick a random background for the selected relative
		this.params.background = this._getRelativeBackgrounds(this.params.relative).random();

		let that = this; // fuck JavaScript's half-assed classes
		let cost = 0; // will be filled out later

		let cheatDiv = App.UI.DOM.makeElement("div", (V.debugMode > 0 && V.debugModeEventSelection > 0) ? cheatModeSelectors() : '');
		node.appendChild(cheatDiv);

		let eventTextDiv = App.UI.DOM.makeElement("div", eventText());
		node.appendChild(eventTextDiv);

		/** produce the event text and response links. might be regenerated by changing slave selection in cheat mode
		 * @returns {DocumentFragment}
		 */
		function eventText() {
			let frag = document.createDocumentFragment();

			newSlave = makeSlave();
			cost = slaveCost(newSlave);
			const {He: He2, him: him2, his: his2, he: he2, daughter: daughter2, sister: sister2} = getPronouns(newSlave);

			const {title: Master} = getEnunciation(eventSlave);

			let t = [];
			t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
			t.push(`requests an interview with you. ${He}'s a devoted slave, and you grant it, and are happy you did when you see the troubled expression on ${his} face. ${He} explains`);
			if (!canTalk(eventSlave)) {
				t.push("with desperate gestures");
			}
			t.push(`that`);
			switch (that.params.relative) {
				case "daughter":
				case "son":
					t.push(`${he} had a ${daughter2}, who was sent to the slave orphanages. ${He}'s heard a rumor through other slaves that ${his} ${daughter2} will go up for sale soon.`);
					break;
				case "mother":
				case "father":
					t.push(`${his} ${that.params.relative} might be getting sold soon. ${He2} has been a slave for some time. ${He}'s heard a rumor through other slaves that ${his} ${that.params.relative} will go up for sale soon.`);
					break;
				case "older sister":
				case "older brother":
					t.push(`${his} older ${sister2} is being sold. ${He2} was likely to be enslaved the last ${eventSlave.slaveName} knew of ${him2}, and now ${he}'s heard a rumor through other slaves that ${his} big ${sister2} is going to be sold to a new owner.`);
					break;
				case "younger sister":
				case "younger brother":
					t.push(`${his} younger ${sister2} is being sold. ${He2} was likely to be enslaved the last ${eventSlave.slaveName} knew of ${him2}, and now ${he}'s heard a rumor through other slaves that ${his} little ${sister2} is going to be sold to a new owner.`);
					break;
				case "twin":
					t.push(`${he} has a twin ${sister2}, who was still free the last ${eventSlave.slaveName} knew of ${him2}. ${He}'s heard a rumor through other slaves that ${his} twin has finally been enslaved, and will soon go up for sale.`);
					break;
				default:
					throw Error(`Unknown relative type: ${that.params.relative}`);
			}

			if (!canTalk(eventSlave)) {
				t.push(`${He} urgently gestures for permission to write. It's unusual, but ${he} seems quite serious, so you grant it. ${He} writes,`);
			}
			t.push(Spoken(eventSlave, `"You've been so good to me, ${Master}. I'm sure ${he2} looks like I did when you bought me. Please, ${Master}, will you buy ${newSlave.slaveName} like you bought me? I'm afraid ${he2}'ll go to a cruel master."`));
			t.push(`${He} bites ${his} lip.`);
			t.push(Spoken(eventSlave, `"And, ${Master}, I'm sure ${he2}'d learn to love`));

			if (eventSlave.fetish === "cumslut") {
				t.push(Spoken(eventSlave, `the taste of your cum`));
			} else if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				t.push(Spoken(eventSlave, `submission`));
			} else if (eventSlave.fetish === "humiliation") {
				t.push(Spoken(eventSlave, `being treated like a dirty slut`));
			} else if (eventSlave.fetish === "buttslut") {
				t.push(Spoken(eventSlave, `the feeling of your cock in ${his2} butt`));
			} else if (eventSlave.fetish === "sadist") {
				t.push(Spoken(eventSlave, `hurting your other slaves`));
			} else if (eventSlave.fetish === "pregnancy" && newSlave.genes !== "XY") {
				t.push(Spoken(eventSlave, `being pregnant`));
			} else if (eventSlave.fetish === "masochist") {
				t.push(Spoken(eventSlave, `being beaten`));
			} else if (eventSlave.fetish === "dom") {
				t.push(Spoken(eventSlave, `fucking your other slaves`));
			} else if (eventSlave.energy > 95) {
				t.push(Spoken(eventSlave, `being a good nympho slut`));
			} else if (eventSlave.addict > 2) {
				t.push(Spoken(eventSlave, `being a druggie whore`));
			} else if (eventSlave.counter.birthsTotal > 3 && newSlave.genes !== "XY") {
				t.push(Spoken(eventSlave, `bearing children`));
			} else if (eventSlave.bellyPreg >= 50 && eventSlave.pregKnown === 1 && newSlave.genes !== "XY") {
				t.push(Spoken(eventSlave, `swelling with life`));
			} else if (eventSlave.anus > 2) {
				t.push(Spoken(eventSlave, `getting ${his2} butt stretched out`));
			} else if (eventSlave.boobsImplant > 500) {
				t.push(Spoken(eventSlave, `getting turned into a bimbo slut`));
			} else if (V.PC.dick > 0 ) {
				t.push(Spoken(eventSlave, `the feeling of your cock in ${him2}`));
			} else {
				t.push(Spoken(eventSlave, `the taste of your pussy`));
			}
			t.push(Spoken(eventSlave, `as much as I do.`));

			if (eventSlave.fetish === "cumslut") {
				t.push(Spoken(eventSlave, `We could blow you at the same time, ${Master}! And share cum!"`));
			} else if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				t.push(Spoken(eventSlave, `You could use us together, ${Master}!"`));
			} else if (eventSlave.fetish === "humiliation") {
				t.push(Spoken(eventSlave, `You could make us fuck each other in public, ${Master}!"`));
			} else if (eventSlave.fetish === "buttslut") {
				t.push(Spoken(eventSlave, `You could fuck our butts right next to each other, ${Master}!"`));
			} else if (eventSlave.fetish === "pregnancy" && newSlave.genes !== "XY") {
				t.push(Spoken(eventSlave, `You could knock us up next to each other, ${Master}!"`));
			} else if (eventSlave.fetish === "sadist") {
				t.push(Spoken(eventSlave, `I'm sure ${he2}'d love to help me, ${Master}!"`));
			} else if (eventSlave.fetish === "masochist") {
				t.push(Spoken(eventSlave, `You could whip us both, ${Master}!"`));
			} else if (eventSlave.fetish === "dom") {
				t.push(Spoken(eventSlave, `I'm sure ${he2}'d love to help me use other slaves, ${Master}!"`));
			} else if (eventSlave.energy > 95) {
				t.push(Spoken(eventSlave, `I'm sure ${he2}'d love to have threesomes, ${Master}!"`));
			} else if (eventSlave.counter.birthsTotal > 3 && newSlave.genes !== "XY") {
				if (V.PC.dick !== 0) {
					t.push(Spoken(eventSlave, `We could compete over who carried more of your children, ${Master}!"`));
				} else {
					t.push(Spoken(eventSlave, `We could compete over who carried more children for you, ${Master}!"`));
				}
			} else if (eventSlave.bellyPreg >= 50 && eventSlave.pregKnown === 1 && newSlave.genes !== "XY") {
				t.push(Spoken(eventSlave, `You could compare how big our bellies are next to each other, ${Master}!"`));
			} else {
				t.push(Spoken(eventSlave, `You could fuck us together, ${Master}!"`));
			}

			t.push(`${He} waits anxiously for your decision.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`You look up the ${that.params.relative}. ${He2} costs ${cashFormat(cost)}, a bargain, but you won't be able to inspect ${him2} beyond ${his2} likely resemblance to ${eventSlave.slaveName}.`);
			t.push(that._getBackgroundDescription(newSlave, that.params.background));
			App.Events.addParagraph(frag, t);

			App.Events.addResponses(frag, [
				new App.Events.Result(`Buy ${him2}`, buySlave),
			]);

			return frag;
		}

		/** fill in the relationship/background selectors for cheat mode
		 * @returns {DocumentFragment}
		 */
		function cheatModeSelectors() {
			const refreshCallback = (effect) => { effect(); $(cheatDiv).empty().append(cheatModeSelectors); $(eventTextDiv).empty().append(eventText); };

			let relativeTypeLinks = _.uniq(that._getTargetRelativeChoices(getSlave(that.actors[0]))).map((choice) =>
				App.UI.DOM.link(choice, refreshCallback, [() => { that.params.relative = choice; that.params.background = that._getRelativeBackgrounds(choice).random(); }])
			);
			let backgroundTypeLinks = _.uniq(that._getRelativeBackgrounds(that.params.relative)).map((choice) =>
				App.UI.DOM.link(choice, refreshCallback, [() => { that.params.background = choice; }])
			);

			let frag = document.createDocumentFragment();
			$(frag).append(
				`Relative Type: <strong>${that.params.relative}</strong> `, App.UI.DOM.generateLinksStrip(relativeTypeLinks),
				"<br>",
				`Background: <strong>${that.params.background}</strong> `, App.UI.DOM.generateLinksStrip(backgroundTypeLinks)
			);
			return frag;
		}

		/** make the target relative slave
		 * @returns {App.Entity.SlaveState}
		 */
		function makeSlave() {
			/** @param {App.Entity.SlaveState} slave */
			function clearMods(slave) {
				slave.ageImplant = 0;
				slave.boobsImplant = 0;
				slave.boobsImplantType = "none";
				slave.buttImplant = 0;
				slave.buttImplantType = "none";
				if (slave.race !== "catgirl") {
					slave.earImplant = 0;
				}
				slave.faceImplant = 0;
				slave.hipsImplant = 0;
				slave.lipsImplant = 0;
				slave.shouldersImplant = 0;
				slave.voiceImplant = 0;
				for (const piercing in slave.piercing) {
					slave.piercing[piercing].weight = 0;
				}
				slave.piercing.genitals.smart = false;
				slave.anusTat = 0;
				slave.armsTat = 0;
				slave.backTat = 0;
				slave.bellyTat = 0;
				slave.boobsTat = 0;
				slave.buttTat = 0;
				slave.dickTat = 0;
				slave.lipsTat = 0;
				slave.legsTat = 0;
				slave.shouldersTat = 0;
				slave.stampTat = 0;
				slave.vaginaTat = 0;
				if (slave.nipples === "fuckable") {
					slave.nipples = either("cute", "inverted", "partially inverted", "puffy");
				}
			}

			function relativeOrigin() {
				switch (that.params.relative) {
					case "mother":
					case "father":
						return "$He was recruited into your service by $his child.";
					case "son":
					case "daughter":
						return "$He was recruited into your service by $his parent.";
					case "younger brother":
					case "younger sister":
						return "$He was recruited into your service by $his older sibling.";
					case "older brother":
					case "older sister":
						return "$He was recruited into your service by $his younger sibling.";
					case "twin":
						return "$He was recruited into your service by $his twin.";
				}
				throw Error(`Unknown relative type: ${that.params.relative}`);
			}

			/** @param {App.Entity.SlaveState} slave */
			function applyBackground(slave) {
				function applyProstitute() { // assumes XX
					slave.boobsImplant = 600;
					slave.boobsImplantType = "normal";
					slave.boobs += slave.boobsImplant;
					slave.boobShape = "normal";
					slave.skill.oral += random(30, 50);
					slave.skill.vaginal += random(30, 50);
					slave.skill.anal += random(30, 50);
					slave.skill.entertainment += random(0, 20);
					slave.skill.whoring += random(30, 50);
					slave.piercing.nipple.weight = 1;
					slave.piercing.lips.weight = 1;
					slave.piercing.tongue.weight = 1;
					slave.piercing.vagina.weight = 1;
					slave.piercing.ear.weight = 1;
					slave.makeup = 1;
					slave.nails = 4;
					slave.hStyle = either("luxurious", "neat", "tails", "up");
					slave.stampTat = "advertisements";
				}

				function applyShemaleWhore() { // assumes XY
					slave.vagina = random(1, 2);
					slave.boobsImplant = 600;
					slave.boobsImplantType = "normal";
					slave.boobs += slave.boobsImplant;
					slave.boobShape = "normal";
					slave.skill.oral += random(30, 50);
					slave.skill.vaginal += random(30, 50);
					slave.skill.anal += random(30, 50);
					slave.skill.entertainment += random(0, 20);
					slave.skill.whoring += random(30, 50);
					slave.lips = random(60, 90);
					slave.lipsImplant = 40;
					slave.piercing.lips.weight = 1;
					slave.piercing.tongue.weight = 1;
					slave.piercing.vagina.weight = 1;
					slave.piercing.ear.weight = 1;
					slave.makeup = 1;
					slave.nails = 4;
					slave.hStyle = "tails";
					slave.stampTat = "advertisements";
				}

				function applyBedMILF() { // assumes XX
					slave.anus = 1;
					slave.vagina = 3;
					slave.weight = random(30, 135);
					slave.muscles = random(0, 15);
					slave.skill.oral = 15;
					slave.skill.vaginal = 30;
					slave.skill.anal = 15;
					slave.skill.entertainment = 10;
					slave.skill.whoring = 10;
					slave.boobs = (random(12, 20)*100);
					slave.butt = random(4, 6);
					slave.boobShape = "saggy";
					slave.lactation = 1;
					slave.lactationDuration = 2;
					slave.markings = "birthmark";
					slave.hLength = random(50, 100);
					slave.hStyle = either("bun", "luxurious", "neat", "up");
					slave.voice = 2;
					if (V.seePreg !== 0) {
						slave.preg = random(5, 39);
						slave.pregType = 1;
						slave.pregKnown = 1;
						slave.pregSource = 0;
						slave.pregWeek = slave.preg;
						SetBellySize(slave);
					}
					slave.counter.birthsTotal = 5;
					slave.bellySag = 4;
					slave.bellySagPreg = 4;
					slave.energy = 65;
					slave.bellyTat = "a heart";
				}

				function applyGeldedServant() { // assumes XY
					slave.anus = 2;
					slave.weight = random(70, 180);
					slave.skill.oral = 35;
					slave.skill.anal = 75;
					slave.hLength = random(10, 20);
					slave.hStyle = either("buzzcut", "neat", "trimmed");
					slave.voice = 1;
					slave.energy = 0;
					slave.balls = 0;
				}

				function applySexToy() { // either sex
					slave.piercing.tongue.weight = 1;
					slave.makeup = 1;
					if (slave.balls.isBetween(0, 4)) {
						slave.balls = 4;
						slave.scrotum = slave.balls;
					}
					if (slave.dick.isBetween(0, 5)) {
						slave.dick = 5;
						slave.foreskin = slave.dick;
						slave.skill.penetrative += jsRandom(0, 30);
					}
					if (slave.vagina > -1) {
						slave.vagina = 2;
					}
				}

				function applyFlatToy() { // either sex
					slave.boobs = Math.min(slave.boobs, (random(1, 4)*100));
					slave.butt = random(1, 2);
					slave.hips = random(-2, 0);
					slave.shoulders = random(-2, 0);
					slave.skill.entertainment += random(0, 20);
					if (slave.vagina > -1) {
						slave.anus = 0;
						slave.vagina = 1;
					} else {
						slave.anus = 1;
					}
				}

				function applyBimboToy() { // either sex
					slave.boobsImplant = (random(20, 40)*100);
					slave.boobsImplantType = "string";
					slave.boobs += slave.boobsImplant;
					if (slave.boobsImplant / slave.boobs >= 0.90) {
						slave.boobShape = "spherical";
						slave.nipples = "flat";
					} else {
						slave.boobShape = "normal";
					}
					slave.buttImplant = random(5, 7);
					slave.buttImplantType = "string";
					slave.butt += slave.buttImplant;
					slave.lipsImplant = random(60, 80);
					slave.lips = Math.clamp(slave.lips + slave.lipsImplant, 0, 100);
					slave.piercing.nipple.weight = 2;
					if (slave.vagina > -1) {
						slave.vagina = 3;
					}
					slave.anus = 3;
					slave.makeup = 3;
					slave.nails = 5;
					slave.skill.anal = 70;
					slave.skill.oral = 70;
					slave.skill.whoring = 100;
					slave.energy = 100;
					slave.skill.entertainment += random(0, 20);
				}

				function applyTwin() {
					// no changes for this case
				}

				const backgroundDispatch = {
					"prostitute": applyProstitute,
					"shemale prostitute": applyShemaleWhore,
					"bed MILF": applyBedMILF,
					"gelded servant": applyGeldedServant,
					"sex toy": applySexToy,
					"flat toy": applyFlatToy,
					"bimbo toy": applyBimboToy,
					"twin": applyTwin
				};
				backgroundDispatch[that.params.background]();
			}

			/** @param {App.Entity.SlaveState} slave */
			function applyCommon(slave) {
				slave.devotion = random(25, 45);
				slave.trust = random(-15, 15);
				slave.oldDevotion = slave.devotion;
				slave.oldTrust = slave.trust;
				configureLimbs(slave, "all", 1, true);
				slave.career = "a slave";
				setHealth(slave, jsRandom(20, 40));
				slave.skill.combat = 0;
				slave.addict = 0;
				slave.chem = 0;
				slave.weekAcquired = V.week;
				randomizeAttraction(slave); // already randomized by generateRelatedSlave, but energy might have changed, so do it again
			}

			/** @param {App.Entity.SlaveState} slave - record cloned from genepool */
			function updateGPRecordAgeFromEventSlave(slave) {
				// recruitable slave is carrying cloned age data from the original recruitment (since genepool records don't age)
				// we need to update the age based on the "live" copy of the event slave, otherwise we won't get age gaps right
				const elapsedSinceRecruitment = eventSlave.actualAge - slave.actualAge;
				for (let i = 0; i < elapsedSinceRecruitment; ++i) {
					ageSlave(slave);
				}

				// copy updated birthweek (really "weeks until birthday") too, so birthdays and twins work right
				slave.birthWeek = eventSlave.birthWeek;
			}

			const origSlave = BaseSlave();
			const genepoolRec = V.genePool.find(s => s.ID === that.actors[0]);
			App.Entity.Utils.GenePoolRecordCleanup(genepoolRec);
			deepAssign(origSlave, genepoolRec);
			updateGPRecordAgeFromEventSlave(origSlave);
			generatePronouns(origSlave);

			const newSlave = generateRelatedSlave(origSlave, that.params.relative);
			clearMods(newSlave);
			newSlave.origin = relativeOrigin();
			applyBackground(newSlave);
			if (that.params.relative === "mother") {
				newSlave.counter.birthsTotal += V.slaves.reduce((acc, cur) => acc + (sameDad(eventSlave, cur) ? 1 : 0), 0);
			}
			applyCommon(newSlave);
			return newSlave;
		}

		/** we need to record any new parent information for existing slaves into the genepool as well as directly into the slave in question
		 * @param {App.Entity.SlaveState} slave
		 * @param {object} parentIDs
		 * @param {number} [parentIDs.mother]
		 * @param {number} [parentIDs.father]
		 */
		function setUnknownParents(slave, parentIDs = {}) {
			const gp = V.genePool.find(s => s.ID === slave.ID);

			if (parentIDs.mother && slave.mother === 0) {
				slave.mother = parentIDs.mother;
				if (gp) {
					gp.mother = parentIDs.mother;
				}
			}
			if (parentIDs.father && slave.father === 0) {
				slave.father = parentIDs.father;
				if (gp) {
					gp.father = parentIDs.father;
				}
			}
		}

		function buySlave() {
			// kill the cheat div (no going back now!)
			$(cheatDiv).empty();

			// the new slave is already set up to be related to the existing slave, but we're responsible for making sure the existing slave (and any others in our stable) gets *their* relatives set correctly
			switch (that.params.relative) {
				case "mother": {
					setUnknownParents(eventSlave, {mother: newSlave.ID} );
					for (const slave of V.slaves) {
						if (sameDad(eventSlave, slave)) {
							setUnknownParents(slave, {mother: newSlave.ID} );
						}
					}
					break;
				}
				case "father": {
					setUnknownParents(eventSlave, {father: newSlave.ID} );
					for (const slave of V.slaves) {
						if (sameMom(eventSlave, slave)) {
							setUnknownParents(slave, {father: newSlave.ID} );
						}
					}
					break;
				}
				case "older sister":
				case "younger sister":
				case "older brother":
				case "younger brother":
				case "twin": { // siblings
					if (eventSlave.father === 0 && eventSlave.mother === 0) {
						setMissingParents(eventSlave);
						setUnknownParents(newSlave, {mother: eventSlave.mother, father: eventSlave.father});
					} else if (eventSlave.father === 0) {
						setMissingParents(eventSlave);
						setUnknownParents(newSlave, {father: eventSlave.father});
						for (const slave of V.slaves) {
							if (sameMom(eventSlave, slave)) {
								setUnknownParents(slave, {father: eventSlave.father});
							}
						}
					} else if (eventSlave.mother === 0) {
						setMissingParents(eventSlave);
						setUnknownParents(newSlave, {mother: eventSlave.mother});
						for (const slave of V.slaves) {
							if (sameDad(eventSlave, slave)) {
								setUnknownParents(slave, {mother: eventSlave.mother});
							}
						}
					}
					break;
				}
				case "son":
				case "daughter":
					if (newSlave.mother === eventSlave.ID) { // no equivalent for fathers
						eventSlave.counter.birthsTotal += 1;
					}
					break;
			}

			cashX(forceNeg(cost), "slaveTransfer", newSlave);

			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, [newSlave, eventSlave]);

			const {he: he2} = getPronouns(newSlave);

			let elements = [];
			elements.push(`You complete the legalities and biometric scanning quickly and without fuss. ${newSlave.slaveName} arrives shortly. The two slaves remember each other only dimly — they parted a long time ago — but they embrace. The devoted ${SlaveTitle(eventSlave)} explains the situation and encourages ${his} ${that.params.relative} to be a good slave to you. ${newSlave.slaveName} looks a little fearful but clearly realizes that ${he2}'s lucky to be here.`);

			elements.push(App.UI.newSlaveIntro(newSlave, eventSlave));

			return elements;
		}
	}
};
