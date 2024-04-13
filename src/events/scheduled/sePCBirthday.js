// cSpell:ignore snes

/** Minimal event wrapper for SE PC Birthday (which has a somewhat unusual native JS structure).
 * TODO: Merge with App.Events.pcBirthday IIFE below
 */
App.Events.SEpcBirthday = class SEpcBirthday extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!V.tempEventToggle,
			() => App.Events.pcBirthday.eventCanTrigger()
		];
	}

	execute(node) {
		node.append(App.Events.pcBirthday.runEvent());
	}
};

/**
 * Data for the planner chosen for the birthday event.
 * @typedef {object} App.Events.pcBirthday.PlannerData
 * @property {App.Entity.SlaveState} slave The actual selected planner slave.
 * @property {string} role The planner's role in the arcology, e.g. "head girl".
 * @property {object} can Abilities the planner has. See `abilities()`.
 * @property {App.Utils.Pronouns} pn Pronouns for the planner slave.
 */

/**
 * Data generated when the event starts, to be used throughout.
 * @typedef {object} App.Events.pcBirthday.EventData
 * @property {string} mood The tone of the party. See `getMood()`.
 * @property {?App.Events.pcBirthday.PlannerData} planner The possible party planner and their role; may be `null` if none is found. See `determinePlanner()`.
 * The scene doesn't *have* to use the planner, even if one is found.
 * @property {App.Utils.Pronouns} assistPN Pronouns for the player's assistant.
 * @property {App.Utils.Pronouns} marketPN Pronouns for the market assistant.
 * @property {string} attire Records the dress type chosen by the player in some branches.
 */

/**
 * The PC birthday event can trigger when `birthWeek` reaches 0.
 *
 * Depending on the game state (or depending on RNG), the event may have different "moods",
 * leading to their own variants. A "mood" is just a string describing the general emotion
 * of the day: happy, solemn, etc. (In practice this isn't used much yet.)
 *
 * If the PC has a slave in an important role that meets certain criteria, she may be selected
 * as a party planner, which can lead to its own variants of the event.
 */
App.Events.pcBirthday = (function(events) {
	let event = {
		/** for testing: set to the desired event mood */
		forceMood: null,
		/**
		 * for testing: set to true to force the event to trigger.
		 * if the event happens, this is reset to false.
		 */
		forceEvent: false,
		devotionThreshold: 85,
		/**
		 * Indicates whether the game state and settings allow the event to trigger.
		 */
		eventCanTrigger: function() {
			if (App.Events.pcBirthday.forceEvent) { return true; }

			// this thing is gonna devolve into sex, so let's not worry about
			// writing around a genitalless player, because that player is crazy anyway
			if (!V.PC.dick && V.PC.vagina < 0) { return false; }

			if (V.lastBDayEvent === V.week) {
				return false;
			}

			if (!V.playerAging) { return false; }
			return V.PC.birthWeek === 0;
		},
		runEvent: function() {
			const data = this.createEventData();

			return App.Events.pcBirthday.Desc.renderIntro(data);
		},
		/**
		 * @returns {string}
		 */
		getMood: function() {
			// TODO: (snes): can be expanded to
			// a) add more moods
			// b) check state to change weights for moods,
			//	e.g. if the player is doing poorly, the outcome
			//	is more likely to be solemn
			//
			// as a POC, just using rng for now
			return App.Events.pcBirthday.forceMood || (Math.random() > 0.2 ? "happy" : "solemn");
		},
		/**
		 * Creates the data that governs the event, and effectively starts it (in terms of
		 * flags and housekeeping stuff).
		 * @returns {App.Events.pcBirthday.EventData}
		 */
		createEventData: function() {
			const planner = App.Events.pcBirthday.determinePlanner();
			const mood = App.Events.pcBirthday.getMood();

			// resetting the flags so you don't have to remember to turn them off
			// (note calling getMood() before resetting the forceMood flag)
			App.Events.pcBirthday.forceEvent = false;
			App.Events.pcBirthday.forceMood = null;

			V.lastBDayEvent = V.week;

			return {
				mood,
				planner,
				assistPN: getPronouns(assistant.pronouns().main),
				marketPN: getPronouns(assistant.pronouns().market),
				attire: null,
			};
		},
		/**
		 * Attempts to find a suitable birthday party planner from among certain special slaves.
		 * If not `null`, the return object has several properties:
		 *
		 * * `slave`: The actual selected planner slave.
		 * * `role`: The planner's role in the arcology, e.g. "head girl".
		 * * `can`: Abilities the planner has. See `abilities()`.
		 * * `pn`: Pronouns for the planner.
		 * @returns {App.Events.pcBirthday.PlannerData|null} An object describing the selected planner slave.
		 * If no suitable planner is found, `null` is returned.
		 */
		determinePlanner() {
			const choices = [
				{slave: S.Concubine, role: "concubine", weight: 1}, // I dunno I just made the weights up ¯\_(ツ)_/¯
				{slave: S.HeadGirl, role: "head girl", weight: 0.6},
				{slave: S.Matron, role: "Matron", weight: 0.3},
				{slave: S.Madam, role: "Madam", weight: 0.3},
			].filter(choice => {
				// basically we just want a slave that will make sense in the sex scenes.
				// checks can be removed if the sex scenes are rewritten to handle those cases
				if (!choice.slave) { return false; }
				if (!hasAllLimbs(choice.slave)) { return false; }
				if (choice.slave.fetish === 'mindbroken') { return false; }
				if (choice.slave && choice.slave.devotion < App.Events.pcBirthday.devotionThreshold) { return false; }
				if (!canSee(choice.slave) || !canHold(choice.slave) || !canTalk(choice.slave)) { return false; }
				if (choice.slave.vagina < 1 && !choice.slave.dick) { return false; }
				return true;
			});

			if (!choices.length) { return null; }

			const totalWeight = choices.reduce((p, c) => p + c.weight, 0);
			const rnd = Math.random() * totalWeight;

			let chosen = null;
			let n = 0;
			for (let i = 0; i < choices.length; i++) {
				n += choices[i].weight;
				if (rnd <= n) {
					chosen = choices[i];
					break;
				}
			}

			return {
				...chosen,
				pn: getPronouns(chosen.slave),
				can: App.Events.pcBirthday.abilities(chosen.slave),
			};
		},
		/**
		 * Returns an object with functions that indicate what the given actor is able to do.
		 * @param {App.Entity.SlaveState} actor
		 */
		abilities: function(actor) {
			return {
				talk: () => canTalk(actor) && actor.rules.speech !== "restrictive",
				hear: () => canHear(actor),
				see: () => canSee(actor),
				pen: () => canAchieveErection(actor), // penetrate is SUCH A LONG WORD
				vag: () => canDoVaginal(actor),
				anal: () => canDoAnal(actor),
				/**
				 * Determines if the actor can fuck the given other actor (slave or PC).
				 * If the other actor is not provided, the PC is used by default.
				 * @param {FC.HumanState} other The slave or player to test.
				 */
				fuck: (other = null) => App.Utils.sexAllowed(actor, other || V.PC),
			};
		},
		/** Helper function for the event; returns a short description of the given arcology terrain. */
		scapeType: function(terrain) {
			switch (terrain) {
				case "marine":
					return "shoreline";
				case "ravine":
					return "cliffs";
				case "oceanic":
					return terrain + " seascape";
				default:
					return terrain + " landscape";
			}
		},
		/** Helper function that describes the PC's eye color(s). */
		eyeColors: function() {
			const color = App.Desc.eyeColor(V.PC);
			return color.replace("heterochromatic ", "").replace("empty ", "white "); // not sure about the "empty" case
		},
		/**
		 * Helper function that describes the PC's baby-making bits.
		 * @typedef {object} Options
		 * @property {boolean|0|1} [adj] - Whether to supply an adjective.
		 * @param {Options} options
		 */
		pcGenitals: function(options = null) {
			options = options || {};
			// lol naughty words
			if (V.PC.dick) {
				const words = ["dick", "dick", "dick", "cock", "cock", "cock", "shaft", "phallus", "rod"];

				if (options.adj) {
					const adjectives = ["hard", "engorged", "stiff", "erect", "throbbing"];

					return adjectives.random() + " " + words.random();
				}

				return words.random();
			} else {
				const words = ["pussy", "pussy", "pussy", "cunt", "cunt", "cunt", "twat", "slit"];

				if (options.adj) {
					const adjectives = ["warm", "tempting", "wet", "glistening", "hungry"];

					return adjectives.random() + " " + words.random();
				}

				return words.random();
			}
		},
		/** Gives the player a little birthday cash. */
		moneyAward: function() {
			let amt = V.cash * 0.01;
			// TODO: (snes): tune limits for difficulty balance
			if (amt < 1000) { amt = 1000; } else if (amt > 10000) { amt = 10000; }

			cashX(amt, "event");
		},
		partyAward: function(eventData) {
			switch (eventData.attire) {
				case "formal":
					repX(100, "event");
					if (V.secExpEnabled) {
						App.Mods.SecExp.authorityX(300);
					}
					break;
				case "casual":
					repX(300, "event");
					if (V.secExpEnabled) {
						App.Mods.SecExp.authorityX(100);
					}
					break;
			}
		},
		takeVirginity: function(slave) {
			slave.vagina = 1;
		},
	};

	if (events.pcBirthday) {
		// handles the case where pcBirthday.Desc has already loaded
		event = {
			...events.pcBirthday,
			...event,
		};
	}

	return event;
})(App.Events);
