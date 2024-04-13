App.Events.RETSSlaveOnSlaveDick = class RETSSlaveOnSlaveDick extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [ // two event slaves
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canPenetrate,
				s => App.Utils.hasFamilySex(s) || s.rules.release.slaves === 1
			],
			[
				s => s.vagina > 0,
				hasAnyArms,
				isSlaveAvailable,
				s => App.Utils.sexAllowedByID(s, this.actors[0]),
				s => s.ID !== getSlave(this.actors[0]).rivalryTarget
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him
		} = getPronouns(eventSlave);
		const {
			He2, he2, his2, him2, himself2
		} = getPronouns(subSlave).appendSuffix('2');
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(`Through the glass walls of your office, you see`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`fucking`);
		t.push(contextualIntro(eventSlave, subSlave, true));
		t.push(`with ${his}`);
		if (eventSlave.dick <= 2) {
			t.push(`small penis.`);
		} else if (eventSlave.dick <= 4) {
			t.push(`long cock.`);
		} else if (eventSlave.dick > 4) {
			t.push(`huge, horse-like phallus.`);
		}
		t.push(`Since you gave ${him} orders that permit ${him} to fuck your other slaves, ${he}'s been fucking them whenever ${he} can. ${subSlave.slaveName} is`);
		if (eventSlave.dick <= 2) {
			t.push(`enjoying ${himself2} even though the ${V.seeRace === 1 ? eventSlave.race : ""} dick in ${his2} pussy is a little disappointing.`);
		} else if (eventSlave.dick <= 4) {
			t.push(`enjoying the sex.`);
		} else {
			t.push(`enjoying the big ${V.seeRace === 1 ? eventSlave.race : ""} dick, even if ${he2} does wince from time to time.`);
		}
		if (eventSlave.scrotum > 0) {
			if (eventSlave.balls > 3) {
				t.push(`As ${eventSlave.slaveName} pounds, ${his} big balls slap against ${his} partner.`);
			} else if (eventSlave.balls > 1) {
				t.push(`As ${eventSlave.slaveName} pounds, ${his} balls tighten, preparing to empty themselves.`);
			}
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			canDoAnal(subSlave)
				? new App.Events.Result(`${subSlave.slaveName} has a free anus, so use that`, bottom, virginWarning(subSlave, "anal", his2))
				: new App.Events.Result(),
			canDoAnal(eventSlave)
				? new App.Events.Result(`${eventSlave.slaveName} has a free anus, so use that`, topAnal, virginWarning(eventSlave, "anal", his))
				: new App.Events.Result(),
			canDoVaginal(eventSlave)
				? new App.Events.Result(`${eventSlave.slaveName} has a free pussy, so use that`, topVaginal, virginWarning(eventSlave, "vaginal", his))
				: new App.Events.Result(),
			new App.Events.Result("This belongs on a live feed", feed),
		]);

		function bottom() {
			t = [];

			t.push(`Since ${subSlave.slaveName} is riding ${eventSlave.slaveName}'s ${V.seeRace === 1 ? eventSlave.race : ""} dick, it's a trivial matter to ${PC.dick === 0 ? "don a strap-on," : ""} come up behind the fucking slaves, stop ${his2} riding for a moment, and insert yourself into ${his2} anus. ${He2}`);
			if (eventSlave.dick <= 2) {
				t.push(`gasps as your ${PC.dick === 0 ? "strap-on complements the small dick" : "big dick complements the small one"} in ${his2} pussy.`);
			} else if (eventSlave.dick < 4) {
				t.push(`shrieks as ${he2} feels ${his2} holes stretched by ${PC.dick === 0 ? "a strap-on and a cock" : "two cocks"}.`);
			} else {
				t.push(`struggles and begs for mercy as ${his2} holes are brutally stretched.`);
			}
			if (subSlave.fetish === "buttslut" && subSlave.fetishKnown === 1) {
				if (eventSlave.dick > 2) {
					t.push(`Nevertheless, ${he2}`);
				} else {
					t.push(`${He2}`);
				}
				t.push(`<span class="devotion inc">shivers with delight</span> as ${he2} feels ${his2} anal ring stretch to accommodate your ${PC.dick === 0 ? "strap-on" : "dick"}.`);
				subSlave.devotion += 1;
			}
			t.push(VCheck.Anal(subSlave, 1));
			t.push(`The poor slave rides out the sexual storm as you and ${eventSlave.slaveName} fuck ${PC.vagina !== -1 ? `${him2}, your pussy sliding against the base of ${eventSlave.slaveName}'s thrusting shaft` : him2}. ${eventSlave.slaveName} flirts outrageously with you over ${subSlave.slaveName}'s shoulder whenever ${he} can. <span class="trust inc">${He} has become more trusting of you.</span>`);

			eventSlave.trust += 4;
			seX(eventSlave, "penetrative", subSlave, "vaginal");
			tryKnockMeUp(subSlave, 10, 0, eventSlave);
			seX(PC, "penetrative", subSlave, "anal");
			tryKnockMeUp(subSlave, 10, 1, PC);
			return t;
		}

		function topAnal() {
			t = [];

			t.push(`Since ${eventSlave.slaveName} is on top, it's a trivial matter to ${PC.dick === 0 ? "don a strap-on," : ""} come up behind the fucking slaves, stop ${his} thrusting for a moment, and penetrate ${his} butthole.`);
			if (eventSlave.fetish === "buttslut" && eventSlave.fetishKnown === 1) {
				t.push(`${He} <span class="devotion inc">shivers with delight</span> as ${he} feels ${his} anal ring stretch to accommodate your ${PC.dick === 0 ? "strap-on" : "dick"}.`);
				eventSlave.devotion += 1;
			}
			t.push(VCheck.Anal(eventSlave, 1));
			t.push(`Fucking a slave with ${eventSlave.prostate > 0 ? "prostate" : ""} stimulation from your ${PC.dick === 0 ? "phallus" : "dick"} in ${his} ${V.seeRace === 1 ? eventSlave.race : ""} ass makes ${him} cum with indecent speed. You let ${him} slide down so ${he} can finish ${subSlave.slaveName} with ${his} mouth while you continue using ${his} anus. ${subSlave.slaveName} definitely enjoys ${eventSlave.slaveName}'s moaning into ${his2} pussy as you use ${eventSlave.slaveName}'s ass. The hard buttfucking ${eventSlave.slaveName} is getting keeps ${his} dick stiff all the way through. <span class="devotion inc">${His} submission to you has increased.</span>`);

			eventSlave.devotion += 4;
			seX(eventSlave, "penetrative", subSlave, "vaginal");
			tryKnockMeUp(subSlave, 10, 0, eventSlave);
			seX(PC, "penetrative", eventSlave, "anal");
			tryKnockMeUp(eventSlave, 10, 1, PC);
			return t;
		}

		function topVaginal() {
			t = [];

			t.push(`${eventSlave.slaveName}'s hermaphroditic genitalia is a little crammed together; it's busy down there. ${He} obediently stops fucking so you can maneuver into ${him}.`);
			t.push(VCheck.Vaginal(eventSlave, 1));
			t.push(`Having a ${PC.dick === 0 ? "strap-on" : "dick"} in ${his} pussy reduces ${his} erection a little, so ${subSlave.slaveName} beneath ${him} helps ${his} penetration as much as ${he2} can. It's not the most convenient of fucks, but that's to be expected when a ${properMaster()} and two slaves successfully have two separate instances of vaginal intercourse running at once. ${PC.vagina !== -1 && PC.dick !== 0 ? "You add a third by grabbing a free hand and guiding it to your own pussy; its owner gets the idea and strokes it as best they can." : ""} ${eventSlave.slaveName}'s orgasm is general and intense. <span class="devotion inc">${His} devotion to you has increased.</span>`);

			eventSlave.devotion += 4;
			seX(eventSlave, "penetrative", subSlave, "vaginal");
			tryKnockMeUp(subSlave, 10, 0, eventSlave);
			seX(PC, "penetrative", eventSlave, "vaginal");
			tryKnockMeUp(eventSlave, 10, 0, PC);
			return t;
		}

		function feed() {
			t = [];

			t.push(`You let them continue fucking, but use your tablet to slave one of the plaza's bigger screens to a feed of their session. They have no way of knowing, and continue fucking and petting until they've both cum.`);
			t.push(`When they've both climaxed, you manipulate the situation again, setting a wallscreen near the slaves to display a feed of the crowd in the plaza enjoying the feed of the situation.`);
			if (eventSlave.fetish === "humiliation" && eventSlave.fetishKnown === 1 && subSlave.fetish === "humiliation" && subSlave.fetishKnown === 1) {
				t.push(`They both blush crimson at the realization, but the pair of humiliation fetishists <span class="devotion inc">live for this</span> and wave at the camera, enjoying the afterglow.`);
				eventSlave.devotion += 2;
				subSlave.devotion += 2;
			} else if (subSlave.fetish === "humiliation" && subSlave.fetishKnown === 1) {
				t.push(`${subSlave.slaveName}, a confirmed humiliation slut, <span class="devotion inc">lives for this</span> and waves at the camera, enjoying the afterglow.`);
				subSlave.devotion += 2;
			} else if (eventSlave.fetish === "humiliation" && eventSlave.fetishKnown === 1) {
				t.push(`${eventSlave.slaveName}, a confirmed humiliation slut, <span class="devotion inc">lives for this</span> and waves at the camera, enjoying the afterglow.`);
				eventSlave.devotion += 2;
			} else if (canSee(eventSlave) || canSee(subSlave)) {
				t.push(`They blush crimson and both turn back towards each other, desperate to look anywhere but at the sight of the crowd that just watched them in such an intimate act.`);
			} else {
				t.push(`They blush crimson and both turn back towards each other, desperate to look anywhere but at the crowd, but unable to tell where the camera actually is.`);
			}
			t.push(`Such honesty is very tough to fake, and the crowd <span class="reputation inc">knows they just saw real pleasure.</span>`);
			repX(500, "event", eventSlave);
			seX(eventSlave, "penetrative", subSlave, "vaginal");
			tryKnockMeUp(subSlave, 10, 0, eventSlave);
			return t;
		}

		/**
		 *
		 * @param {App.Entity.SlaveState} slave
		 * @param {string} type
		 * @param {string} his
		 */
		function virginWarning(slave, type, his) {
			if (type === "anal" && slave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			} else if (type === "vaginal" && slave.vagina === 0) {
				return `This option will take ${his} vaginal virginity`;
			}
		}
	}
};
