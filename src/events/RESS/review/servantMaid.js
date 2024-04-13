App.Events.RESSServantMaid = class RESSServantMaid extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion <= 20,
				s => [Job.QUARTER, Job.HOUSE].includes(s.assignment),
				s => ["a nice maid outfit", "a slutty maid outfit"].includes(s.clothes),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		App.Events.addParagraph(node, [
			`As one of ${his} many duties while a servant in your penthouse,`,
			contextualIntro(V.PC, eventSlave, true),
			`is scheduled to clean your office today. ${He} pauses in the doorway of your office for a moment, only entering once it becomes clear that you're not going to be using ${him} immediately.`
		]);
		r.push(`${He} begins ${his} cleaning dutifully, fluttering about your office in a flurry of scrubbing and dusting. ${His} almost frenzied sanitization of your office allows you ample opportunity to inspect ${him}, your eyes lingering on ${his} body as ${he} moves back and forth in front of you.`);
		if (eventSlave.clothes === "a slutty maid outfit") {
			r.push(`${His} maid uniform does little to conceal ${his} form from prying eyes, with a thin white blouse all that separates the surfaces of ${his} breasts from the air. The associated skirt is similarly superficial, made more for easy access to a slave's holes than for provision of any sort of modesty.`);
			if (getLimbCount(eventSlave, 102) > 2) {
				r.push(`Although ${his} movements rarely stray from a slight flick of ${his} wrist as ${he} dusts some surface or a gyration of ${his} body as ${he} scrubs the floor clean, ${his} P-Limbs nonetheless produce a steady stream of minute machine noises. They give ${him} the coordination ${he} needs to purge even the smallest of stains, but the multitude of gyros, servos, and other mechanical pieces constantly working to maintain it ensure that the process is far from silent.`);
			} else if (eventSlave.belly >= 150000) {
				r.push(`${His} middle has become so enormous it's a miracle ${he} can even reach objects to clean them. It greatly complicates ${his} cleaning duties, often causing ${him} to attack any blemishes sideways lest ${his} ${belly} belly prevent ${him} from reaching the offending smudge at all. ${He} moves very carefully, not wanting to accidentally knock something to the floor and be forced to figure out how to return it to its proper place.`);
			} else if (eventSlave.boobs > 4000) {
				r.push(`${His} breasts are so massive that a whole ream of cloth is needed to provide even the semblance of covering ${his} massive chest. They do little to aid in ${his} cleaning duties, often causing ${him} to attack any blemish on the wall sideways lest ${his} gigantic boobs prevent ${him} from reaching the offending smudge at all.`);
			} else if (eventSlave.preg > eventSlave.pregData.normalBirth/2) {
				r.push(`Despite ${his} pregnancy, ${he} manages to clean with surprising efficacy. ${He} often cradles ${his} gravid belly through ${his} sheer skirt as ${he} dusts or scrubs with one hand, conscious of the fragile life within ${him} even as ${he} works hard to cleanse your office of any unsightly blemishes.`);
			} else if (eventSlave.boobs > 800) {
				r.push(`${His} breasts are pleasingly large and appealingly visible despite the minor concealment provided by ${his} blouse. They often cause ${him} difficulty by mashing against the top surface of your desk as ${he} tries to duck beneath to clean the underside. The struggle is surprisingly erotic — if not without humor.`);
			} else if (eventSlave.muscles > 30) {
				r.push(`With ${his} incredible musculature, ${he}'s able to conduct a deep cleaning that few other slaves can match. Life as an arcology owner exposes you to a wealth of unique situations, but you doubt many of your peers have seen a slave in a slutty maid ensemble lift up a couch with one outstretched arm as they sweep the now exposed ground beneath it clean with the other.`);
			} else if (eventSlave.energy > 95) {
				r.push(`Despite the mundanity of ${his} current duties, it's clear ${he}'s holding back ${his} immense sex drive for the duration of ${his} cleaning.`);
				if (eventSlave.dick > 0) {
					if (eventSlave.chastityPenis === 1) {
						r.push(`${His} chastity cage is dribbling precum, visibly dripping onto the floor as ${he} goes.`);
					} else if (canAchieveErection(eventSlave)) {
						r.push(`${His} cock is painfully erect, visible under ${his} flimsy skirt.`);
					} else {
						r.push(`${His} soft dick is dribbling precum, visibly dripping down ${his} legs.`);
					}
				} else if (eventSlave.vagina === -1) {
					r.push(`${He}'s unconsciously presents ${his} bare bottom as ${he} scrubs the ground clean.`);
				} else {
					r.push(`${His} pussy is visibly soaked, ironically staining the flimsy skirt of ${his} uniform as ${he} cleans your office.`);
				}
			}
		} else if (eventSlave.clothes === "a nice maid outfit") {
			r.push(`${His} maid uniform is fairly demure for a sex slave and makes some effort to conceal ${his} form from prying eyes, even whilst presenting an image of servitude and obedience that a classic maids' ensemble embodies so well. ${His} dress is fairly conservative, enveloping ${his} breasts in intricate lace and cloth. Likewise, ${his} apron is more than ornamental, ${eventSlave.slaveName} having stuffed it with cleaning materials and tools.`);
			if (getLimbCount(eventSlave, 102) > 2) {
				r.push(`Although ${his} movements rarely stray from a slight flick of ${his} wrist as ${he} dusts some surface or a gyration of ${his} body as ${he} scrubs the floor clean, ${his} P-Limbs nonetheless produce a steady stream of minute machine noises. They give ${him} the coordination ${he} needs to purge even the smallest of stains, but the multitude of gyros, servos, and other mechanical pieces constantly working to maintain it ensure that the process is far from silent.`);
			} else if (eventSlave.belly >= 150000) {
				r.push(`${His} middle has become so enormous it's a miracle ${he} can even reach objects to clean them. It greatly complicates ${his} cleaning duties, often causing ${him} to attack any blemishes sideways lest ${his} ${belly} belly prevent ${him} from reaching the offending smudge at all. ${He} moves very carefully, not wanting to accidentally knock something to the floor and be forced to figure out how to return it to its proper place.`);
			} else if (eventSlave.boobs > 4000) {
				r.push(`${His} breasts are so massive that several reams of cloth are needed to provide ${his} massive chest with any semblance of modesty. They do little to aid in ${his} cleaning duties, often causing ${him} to attack any blemish on the wall sideways lest ${his} gigantic boobs prevent ${him} from reaching the offending smudge at all.`);
			} else if (eventSlave.preg > eventSlave.pregData.normalBirth/2) {
				r.push(`Despite ${his} pregnancy, ${he} manages to clean with surprising efficacy. ${He} often cradles ${his} gravid belly through ${his} thick apron as ${he} dusts or scrubs with one hand, conscious of the fragile life within ${him} even as ${he} works hard to cleanse your office of any unsightly blemishes.`);
			} else if (eventSlave.boobs > 800) {
				r.push(`${His} breasts are pleasingly large and appealingly visible, even beneath the folds and ruffles of ${his} dress. They often cause ${him} difficulty by mashing against the top surface of your desk as ${he} tries to duck beneath to clean the underside. The struggle is surprisingly erotic — if not without humor.`);
			} else if (eventSlave.muscles > 30) {
				r.push(`With ${his} incredible musculature, ${he}'s able to conduct a deep cleaning that few other slaves can match. Life as an arcology owner exposes you to a wealth of unique situations, but you doubt many of your peers have seen a slave in a modest maid ensemble lift up a couch with one outstretched arm as they sweep the now exposed ground beneath it clean with the other.`);
			} else if (eventSlave.energy > 95) {
				r.push(`Despite the mundanity of ${his} current duties, it's clear ${he}'s holding back ${his} immense sex drive for the duration of ${his} cleaning.`);
				if (eventSlave.dick > 0) {
					if (eventSlave.chastityPenis === 1) {
						r.push(`${His} chastity cage is dribbling precum, visibly dripping onto ${his} apron.`);
					} else if (canAchieveErection(eventSlave)) {
						r.push(`${His} cock is painfully erect, poking through ${his} apron.`);
					} else {
						r.push(`${His} soft dick is dribbling precum, visibly dripping down ${his} legs.`);
					}
				} else if (eventSlave.vagina === -1) {
					r.push(`${He}'s unconsciously presents ${his} bottom, though it remains covered by the length of ${his} apron, as ${he} scrubs the ground clean.`);
				} else {
					r.push(`${His} pussy is visibly soaked, ironically staining the once immaculate apron of ${his} uniform as ${he} cleans your office.`);
				}
			}
		}
		r.push(`Eventually, ${his} duties satisfactorily completed, ${he} comes before your desk to beg your permission to continue ${his} servitude elsewhere in the penthouse.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Stop ${him}`, stop),
			new App.Events.Result(`Let ${him} go`, go),
		]);

		function stop() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`You look ${eventSlave.slaveName} up and down slowly before informing ${him} that ${he} has one more duty left to perform.`);
			App.Events.addResponses(frag, [
				canDoAnal(eventSlave)
					? new App.Events.Result(`Clean out ${his} ass with an enema and fuck it`, enema, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null)
					: new App.Events.Result(),
				new App.Events.Result(`Have ${him} lick you clean`, lick),

			]);
			return frag;

			function enema() {
				r = [];
				r.push(`You tell ${eventSlave.slaveName} that ${he} forgot to clean one thing in ${his} office — ${himself}. As ${he} looks at you in confusion, you rise from your chair and lightly press ${his} chest down on your desk. ${He} lays there obediently, only letting out a gasp as the cold tip of an enema bulb penetrates ${his} ass. As a result of ${his} slave diet and daily anal preparation, the insertion of the enema is little more than a bit of roleplaying spectacle. When you retrieve the enema from ${his} rectum,`);
				if (V.PC.dick === 0) {
					r.push(`and donning a strap-on,`);
				}
				r.push(`you remark that you'll need to inspect ${his} asshole personally with a vigorous assfucking. Soon ${eventSlave.slaveName} finds ${himself} being pounded so forcefully that a small pool of drool begins to form beneath ${his} open mouth, staining the surface of your desk that ${he} so meticulously cleaned. ${He} <span class="trust inc">resolves to trust you more in the future,</span> since you took a personal interest in ${his} cleanliness.`);
				r.push(VCheck.Anal(eventSlave, 1));
				eventSlave.trust += 4;
				return r;
			}

			function lick() {
				r = [];
				r.push(`You recline in your chair and inform ${eventSlave.slaveName} that ${he} has one last thing to clean in your office. ${He} understands your meaning quickly, sinks to ${his} knees and`);
				if (eventSlave.belly >= 5000) {
					r.push(`struggles to crawl`);
				} else {
					r.push(`crawls`);
				}
				r.push(`beneath your desk to kneel between your legs. Soon enough you feel the sensation of ${his} lips wrapping obediently about one of your toes, fellating the appendage with some enthusiasm. ${He} works ${his} way through your various digits, taking some solace in the simplicity of ${his} task, before a sudden understanding dawns on ${him}. ${He} runs ${his} tongue up your leg, cleansing your skin with ${his} tongue as best ${he} can, before heading for your`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`cunt`);
				}
				r.push(`but you lay a hand on ${his} forehead and halt ${him} — ${he}'ll do that last.`);
				if (V.PC.boobs >= 300 || V.PC.title === 0) {
					r.push(`Soon enough ${he} manages to lick all the way up from your feet to your breasts, cleansing your`);
					if (V.PC.belly >= 60000) {
						r.push(`massively gravid`);
					} else if (V.PC.belly >= 5000) {
						r.push(`motherly`);
					}
					r.push(`body with ${his} wet tongue all the way. ${He} hesitates before teasingly laying a single lap on your nipples, so you take ${his} head and hold it against your breasts to enjoy ${his} skillful tongue on your nipples.`);
					if (V.PC.lactation > 0) {
						r.push(`${He} even gets a special treat to savor, fresh from ${his} ${getWrittenTitle(eventSlave)}'s milky breasts. ${He} makes sure your sore breasts are sufficiently relieved.`);
					}
				} else {
					r.push(`Soon enough ${he} manages to lick all the way up from your feet to your`);
					if (V.PC.belly >= 10000) {
						r.push(`taut dome of a stomach,`);
					} else if (V.PC.belly >= 5000) {
						r.push(`pregnancy strained abs,`);
					} else {
						r.push(`abs,`);
					}
					r.push(`pecs, and collarbone, cleansing your body with ${his} wet tongue all the way. ${He} lavishes particular attention on every nook and groove of your chiseled body, clearly eager to please ${his} muscular`);
					if (V.PC.belly >= 5000) {
						r.push(`(and very pregnant)`);
					}
					r.push(`${getWrittenTitle(eventSlave)}.`);
				}
				r.push(`When ${he}'s satisfied that every other`);
				if (V.showInches === 2) {
					r.push(`inch`);
				} else {
					r.push(`centimeter`);
				}
				r.push(`of your body has been bathed by ${his} tongue, ${he} moves for your`);
				if (V.PC.dick === 0) {
					r.push(`cunt, and laps at you enthusiastically`);
				} else {
					r.push(`cock, and runs ${his} tongue all over its surface`);
					if (V.PC.vagina !== -1) {
						r.push(`before turning ${his} attentions to lavish the same wet service to your pussy`);
					}
				}
				r.push(`This extravagant display of ${his} subservience leaves ${him} more sure of ${his} <span class="devotion inc">submission</span> to you than before.`);
				eventSlave.devotion += 4;
				seX(eventSlave, "oral", V.PC, "penetrative");
				return r;
			}
		}

		function go() {
			eventSlave.trust += 2;
			return `You grant ${him} your assent to leave, and ${he} hurries off to go on with ${his} day. ${His} <span class="trust inc">trust</span> for you grows as a result of allowing ${him} to go about ${his} duties unmolested.`;
		}
	}
};
