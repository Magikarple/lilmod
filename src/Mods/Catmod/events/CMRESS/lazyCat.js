App.Events.CMRESSLazyCat = class CMRESSLazyCat extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				canMove,
				s => s.race === "catgirl",
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
		t.push(`As you go about your busy workday, moving from room to room within the penthouse to oversee your slaves and attend to the countless small pieces of business that demand your eternal attention as the owner and master of a prominent arcology, a flash of striking ${eventSlave.skin} fur catches your eye. Although you have to do a double take to confirm what you're seeing, it couldn't be more clear once you do - ${eventSlave.slaveName} is curled up into a tight ball in a semi-hidden corner of the penthouse, having somehow shirked ${his} duties to take a nap in the middle of the workday.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`${eventSlave.slaveName} snores softly in ${his} little corner of the room, ${his} entire body folded up into a tight furry lump. As much as ${he}'s clearly breaching discipline and avoiding your authority, it's hard to deny how cute ${he} looks while ${he} sleeps.`);
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			canDoVaginal(eventSlave)
				? new App.Events.Result(`Wake ${him} up with a brain-rattling cunt-slamfuck`, pSlamFuck, pussyVirginWarning())
				: new App.Events.Result(),
			canDoAnal(eventSlave)
				? new App.Events.Result(`Wake ${him} up with a brain-rattling ass-slamfuck`, bSlamFuck, analVirginWarning())
				: new App.Events.Result(),
			new App.Events.Result(`Teach ${him} some discipline with a long, hard spanking`, spanking),
			new App.Events.Result(`Give ${him} a good scolding and send ${him} back to work`, scolding),
			new App.Events.Result(`Just let ${him} nap this one time`, letSleep),
		]);

		function pussyVirginWarning() {
			if (eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			}
		}

		function analVirginWarning() {
			if (eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function pSlamFuck() {
			t = [];
			t.push(`${PC.dick !== 0 ? "Your dick already hardening in your pants," : "Grabbing a strapon from your toy collection with malicious intent,"} you grab ${eventSlave.slaveName} by the top of ${his} fluffy head and slam yourself down on ${him}, weighing down ${his} body under yours as legs shoot out from the curled-up furball in pure shock. ${canTalk(eventSlave) ? `${He} loudly mrowls and thrashes under you at the rude awakening, meowing in frantic displeasure at the top of ${his} lungs as you work ${his} bottoms down with your free hand to expose ${his}` : `${He} kicks and squirms in surprise at the rude awakening, ${his} muteness making ${him} unable to voice any further displeasure as you forcefully pull ${his} bottoms down just over to expose ${his}`}`);
			if (eventSlave.butt > 12) {
				t.push("gargantuan, couch-like furred asscheeks.");
			} else if (eventSlave.butt > 5) {
				t.push("huge, rounded fluffy ass-globes.");
			} else if (eventSlave.butt > 2) {
				t.push("fat cat ass.");
			} else {
				t.push("slender kitten rear.");
			}
			App.Events.addParagraph(node, t);
			t = [];
			t.push(`Before the shocked cat can mount any further complaints, you wrest your arm around ${his} slender neck, feeling the fur bristle against your skin, lock ${him} in a firm chokehold, line yourself up, and promptly slam ${PC.dick !== 0 ? "your cock" : "the strapon"} into the cat${girl}'s soft cunt in one hard, pounding motion. Over the next few minutes, you jackhammer the helpless kitten's pussy as ${he} chokes and sputters around your powerful forearm, ${his} stilted eyes rolling up into ${his} head from the combination of oxygen deprivation and the thick rod hammering in and out of ${his} folds at lightning pace, each ruthless slam of your hips to ${his} butt making ${his} ${eventSlave.skin}-furred asscheeks ripple and slap loudly. Even though ${his} silky fur feels magnificent brushing against you and ${his} cunt feels better, the twitchy cat cums before you do, squirting all over your crotch as ${his} catlike eyes roll up and ${his} tongue lolls out stupidly from ${his} mouth. Finally, with your own lowers already drenched, you ${PC.dick !== 0 ? "cum deep and hard inside the catslut's pussy" : "achieve a powerful, mind-fogging orgasm yourself"}, pulling yourself free and standing up satisfied. You take a brief look down at ${eventSlave.slaveName}, sprawled out on the ground with ${his} tail straight up in the air, ${his} <span class="devotion inc">cunt drooling in a leaky puddle on the floor</span> and ${his} asscheeks slammed so hard you can see them glowing red throughout the fur, idly remind ${him} not to nap on the job, and go about the rest of your day.`);
			App.Events.addParagraph(node, t);
			t = [];

			eventSlave.devotion += 4;
			seX(eventSlave, "vaginal", V.PC, "penetrative");
			if (canImpreg(eventSlave, PC)) {
				knockMeUp(eventSlave, 40, 0, -1);
			}
			return t;
		}

		function bSlamFuck() {
			t = [];
			t.push(`${PC.dick !== 0 ? "Your dick already hardening in your pants," : "Grabbing a strapon from your toy collection with malicious intent,"} you grab ${eventSlave.slaveName} by the top of ${his} fluffy head and slam yourself down on ${him}, weighing down ${his} body under yours as legs shoot out from the curled-up furball in pure shock. ${canTalk(eventSlave) ? `${He} loudly mrowls and thrashes under you at the rude awakening, meowing in frantic displeasure at the top of ${his} lungs as you work ${his} bottoms down with your free hand to expose ${his}` : `${He} kicks and squirms in surprise at the rude awakening, ${his} muteness making ${him} unable to voice any further displeasure as you forcefully pull ${his} bottoms down just over to expose ${his}`}`);
			if (eventSlave.butt > 12) {
				t.push("gargantuan, couch-like furred asscheeks.");
			} else if (eventSlave.butt > 5) {
				t.push("huge, rounded fluffy ass-globes.");
			} else if (eventSlave.butt > 2) {
				t.push("fat cat ass.");
			} else {
				t.push("slender kitten rear.");
			}
			App.Events.addParagraph(node, t);
			t = [];
			t.push(`Before the shocked cat can mount any further complaints, you wrest your arm around ${his} slender neck, feeling the fur bristle against your skin, lock ${him} in a firm chokehold, line yourself up, and promptly slam ${PC.dick !== 0 ? "your cock" : "the strapon"} into the cat${girl}'s round, furry ass in a brutish motion that forces yourself past any resistance from the poor kitten's sphincter. Over the next few minutes, you jackhammer the helpless kitten's asshole as ${he} chokes and sputters around your powerful forearm, ${his} stilted eyes rolling up into ${his} head from the combination of oxygen deprivation and the thick rod hammering in and out of ${his} folds at lightning pace, each ruthless slam of your hips to ${his} butt making ${his} ${eventSlave.skin}-furred asscheeks ripple and slap loudly. Even though ${his} silky fur feels magnificent brushing against you and ${his} ass feels better, the twitchy cat cums before you do,`);
			if (eventSlave.dick > 0) {
				t.push(`${his} sensitive dick blowing a desperate, impotent load against the ground as you core in ${his} fluffy ass, ${his} pointed ears twitching wildly atop ${his} head.`);
			} else {
				t.push(`squirting all over your crotch as ${his} catlike eyes roll up and ${his} tongue lolls out stupidly from ${his} mouth.`);
			}
			t.push(`Finally, with your own lowers already drenched, you ${PC.dick !== 0 ? "finish explosively up the catslut's furry ass" : "achieve a powerful, mind-fogging orgasm yourself"}, pulling yourself free and standing up satisfied. You take a brief look down at ${eventSlave.slaveName}, sprawled out on the ground with ${his} tail straight up in the air, ${his} <span class="devotion inc">ass quivering shakily </span> and ${his} asscheeks slammed so hard you can see them glowing red throughout the fur, idly remind ${him} not to nap on the job, and go about the rest of your day.`);
			App.Events.addParagraph(node, t);
			t = [];

			eventSlave.devotion += 4;
			seX(eventSlave, "anal", V.PC, "penetrative");
			return t;
		}

		function spanking() {
			t = [];

			t.push(`You grab the snoozing furball by one pointy ear, the curled-up lump shooting into a surprised cat${girl} as you yank ${him} up by the grip on ${his} ear. The furry appendage twitches and squirms in your hand as though trying to escape as you practically drag the newly-awake cat over to your desk, one of ${his} eyes closed tight in a wince - the one under the ear you're pulling - as ${he} ${canTalk(eventSlave) ? `whines and mrowls, complaining about the sensitivity of ${his} ears` : `weakly scratches at your arm, ${his} one open eye giving you a pleading look,`} which you thoroughly ignore as you find your way to your desk, pull the squirming kitten over your knee, and take a moment to yank her bottoms up her rear, giving the helpless cat a painful, ass-splitting wedgie as you move your head down close to her ears to make your point.`);
			App.Events.addParagraph(node, t);
			t = [];
			t.push(`"Did you seriously think no one would notice you sleeping in the middle of the day?" You all but hiss, holding ${eventSlave.slaveName}'s bottoms harshly up ${his} ass for a few seconds more to make ${him} whimper and squirm before you yank them down, showing off ${his}`);
			if (eventSlave.butt > 12) {
				t.push("gargantuan, couch-like furred asscheeks");
			} else if (eventSlave.butt > 5) {
				t.push("huge, rounded fluffy ass-globes");
			} else if (eventSlave.butt > 2) {
				t.push("fat cat ass");
			} else {
				t.push("slender kitten rear");
			}
			t.push(`and immediately delivering a powerful, open-handed slap to ${his} right asscheek. The forceful slap sears through the fur and makes ${his} tail jerk upwards as ${his} bubbly ass jiggles, ears flicking up in pain. Before ${he} can even yelp out in protest or react to the sharp, stinging pain, you land a second slap, then a third, loud smacking noises echoing across the room as you give the pinned cat a hard spanking. Over the next ten minutes, you absolutely blister the lazy cat${girl}'s furry ass, working into a rhythm of disciplined abuse that leaves the fluffy bitch sobbing and ${his} butt beaten so well you can see it glowing a painful, alluring cherry-red even through ${his} ${eventSlave.skin} fur. The second that you let go of the pinned cat and tell ${him} that ${he}'s free to leave, ${he} leaps off your knee,`);
			if (eventSlave.fetish === "masochist") {
				t.push(`turns around with tears rolling freely down ${his} cheeks as though to show off how brightly red you've bruised ${his} cheeks, wiggles ${his} beaten bottom, and smiles.`);
				if (canTalk(eventSlave)) {
					t.push(
						App.UI.DOM.combineNodes(
							`"`,
							App.UI.DOM.makeElement("span", Spoken(eventSlave, `T-thanks for kicking my ass,`), ["devotion", "inc"])
						),
						Spoken(eventSlave, `${title}. I promise I'll, l-like, never nap at work again."`),
						`It sounds less than authentic as the maso-kitty tugs up ${his} bottoms over ${his} red, furry butt with a wince,`
					);
				} else {
					t.push(` makes a <span class="devotion inc">heart symbol</span> with ${his} hands and presses it against ${his} burning ass so it looks red,`);
				}
				eventSlave.devotion += 4;
			}
			t.push(`then scurries off to tend to ${his} <span class="trust dec">bruised and reddened asscheeks.</span>`);
			App.Events.addParagraph(node, t);
			t = [];

			eventSlave.trust -= 3;
			return t;
		}

		function scolding() {
			let t = [];
			t.push(`You wake ${eventSlave.slaveName} up with a firm shake, watch as ${he} yawns for a second before realizing that you're looming over ${him}, and then scatters into position with a shocked yowl. You absolutely chew ${him} out, yelling at the lazy cat about ${his} responsibilities and obligations as a slave and that you have every right to beat ${his} ass or far worse for such an offense. Although ${his} ears flatten to either side as you scold ${him}, ${he}'s clearly <span class="trust inc">deeply relieved</span> that ${he} only got a chewing-out instead of anything worse this time around, and scurries off back to work the second you let ${him} go.`);
			eventSlave.trust += 2;
			return t;
		}

		function letSleep() {
			return `Eh, you have bigger problems to deal with, and frankly the sleeping furball is kind of adorable. You take a few more seconds to watch as ${he} peacefully snoozes, curled up into a tight ball with ${his} legs and arms hidden under ${his} fluffy body, then go back about your day. Around twenty minutes later, you see ${eventSlave.slaveName} on the security cameras waking up from ${his} nap, yawning and stretching out ${his} limbs before padding on back to work as though nothing happened at all, totally unaware that you found ${his} 'secret' sleeping spot. God, ${he}'s lazy.`;
		}
	}
};
