// cSpell:ignore squirtgasm

App.Events.CMRESSAnnoyingCat = class CMRESSAnnoyingCat extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canMove,
				s => s.race === "catgirl",
				s => s.trust > 35,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, girl
		} = getPronouns(eventSlave);
		const {title} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];
		t.push(`Although your catgirl slaves are beautiful, intelligent, and move across your penthouse with an almost supernatural grace, their feline charm and beauty comes at the expense of a number of less desirable feline traits coded deeply into their spliced DNA. One of these irritating genetic leftovers is their exceptional neediness, which, when combined with their playful nature, gives them an unfortunate tendency to attempt to get your attention through minor annoyances. Well, when they aren't terrified of you, at least.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Sometimes this comes in the form of erotic teasing, offering calculated, teasing glimpses of their butts or tits to try and win your eye when they want attention. Other times, like when ${eventSlave.slaveName} loudly meows when you walk by, it's just by being a nuisance. Normally, such a little thing would be totally beneath your notice, but ${he}'s been purring annoyingly at your heels all day, flicking ${his} tail up against the base of your hips, and mrowling whenever you come close. ${He} doesn't even seem to want anything in particular, and the minor catlike annoyances have finally gotten on your nerves.`);
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			canDoAnal(eventSlave)
				? new App.Events.Result(`Roughly fuck ${his} ass to shut ${him} up`, annoyedFuck, analVirginWarning())
				: new App.Events.Result(),
			new App.Events.Result(`Tell ${him} to stop being such a nuisance`, stopIt),
			new App.Events.Result(`Ignore ${him}`, ignore),
		]);

		function analVirginWarning() {
			if (eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function annoyedFuck() {
			t = [];
			t.push(`As ${eventSlave.slaveName} meows at you, you order the irritating cat${girl} to turn around, drop ${his} bottoms, lift ${his} tail and spread ${his} cheeks. As though to make the command's intent even more obvious, you ${PC.dick !== 0 ? "pull your cock free from your pants" : "take a strapon and slide it up your legs"} as the furball look at you in surprise for a moment. Without a word of protest, the cat${girl} simply turns, pulls ${his} bottoms just under ${his} asscheeks, and lifts up ${his} tail to show you ${his}`);
			if (eventSlave.butt > 12) {
				t.push("enormous, view-dominating furry ass.");
			} else if (eventSlave.butt > 5) {
				t.push("huge, rounded fluffy ass-globes.");
			} else if (eventSlave.butt > 2) {
				t.push("fat cat ass.");
			} else {
				t.push("slender kitten rear.");
			}
			App.Events.addParagraph(node, t);
			t = [];
			t.push(`${He} twists ${his} head to look at you as though to say something, but you don't give ${him} the chance as you grab ${him} by the hips, not so much as bothering to spit down for the slightest semblance of lube, and slam ${PC.dick !== 0 ? "your cock" : "the strapon"} into the cat${girl}'s round, furry ass, forcing yourself past the resistance of ${his} sphincter. You ruthlessly pound ${eventSlave.slaveName}'s ${eventSlave.skin} butt, holding ${him} in place around the hips as`);
			if (PC.dick === 1) {
				if (eventSlave.dick > 0) {
					t.push(`your fat nuts batter ${his} pair into submission, bruising the low-hanging targets along with ${his} asshole with each extremely gay thrust. The violent, squirting orgasm ${he} has within a minute is probably no thanks to how hard you're busting ${his} furry balls with your own as you core out ${his} rear.`);
				}
			} else {
				t.push(`${He} squeals and mrowls, writhing against you as you pound ${his} ass into submission until ${he} jerks out with an explosive, wriggling squirtgasm against the floor.`);
			}
			t.push(`Shortly after, you ${PC.dick !== 0 ? `hilt yourself in the betacat's furry butt and shoot a half-dozen thick, hot ropes of cum up ${his} colon` : "achieve a powerful, mind-fogging orgasm yourself"}, pulling yourself free and releasing the annoying cat's hips. ${eventSlave.slaveName} gasps like ${he}'s out of oxygen, fluid dripping out from ${his} brutalized asshole, and <span class="devotion inc">yips out a brief, happy-sounding apology for being annoying.</span>`);
			App.Events.addParagraph(node, t);
			t = [];

			eventSlave.devotion += 2;
			seX(eventSlave, "anal", V.PC, "penetrative");
			return t;
		}

		function stopIt() {
			let t = [];
			t.push(`You grab ${eventSlave.slaveName} by the hand and tell ${him} to stop being so goddamn annoying. ${He} cocks ${his} head at you, apparently genuinely confused, and then huffs out a loud exhale.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Uh, sorry, ${title}, I wasn't trying to be annoying or anything..." ${He} mewls,`));
			} else {
				t.push(`${He} makes a second weird, apologetic sounding noise,`);
			}
			t.push(`then scurries off when you let ${him} go with ${his} <span class="trust dec">ears flat against ${his} head.</span>`);
			eventSlave.trust -= 3;
			return t;
		}

		function ignore() {
			let t = [];
			t.push(`You completely ignore ${eventSlave.slaveName} as ${he} mrowls at you and go about your day. You're far too busy to deal with some needy cat nonsense. ${eventSlave.slaveName} gets a little louder, and then louder still throughout the day, subtly demanding your attention for no particular reason, until ${he} finally gets that you're outright ignoring ${him} and trots off somewhere to <span class="devotion dec">sulk</span> angrily at you not playing into ${his} childish - or at least animalistic - antics.`);
			eventSlave.devotion -= 3;
			return t;
		}
	}
};
