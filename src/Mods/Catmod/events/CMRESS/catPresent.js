// cSpell:ignore mrows

App.Events.CMRESSCatPresent = class CMRESSCatPresent extends App.Events.BaseEvent {
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
				s => s.devotion > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, His, girl
		} = getPronouns(eventSlave);
		const {title} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let catPresent = V.noDeadShit ? jsEither([0, 1, 5, 6, 8, 9]) : jsEither([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		/** @type {"nice"|"dead"|"junk"} */
		let presentType = "junk";

		let t = [];
		t.push(`Catgirl slaves are almost perpetually a handful. One of the many things you've discovered in owning genetically modified cats spliced with human DNA is that regardless of their actual intelligence, they almost universally retain the unusual feline quality of delivering bizarre, often recently killed "presents" as a way to show affection.`);
		App.Events.addParagraph(node, t);

		t = [];
		if (catPresent === 0) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} trots in, holding a bundle of credits in one of ${his} furry hands. ${He} proudly drops the small wad of cash on your desk, beaming up at you with a mouthful of feline fangs.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Look what I found, ${title}! Someone dropped all this, so now it's yours!"`));
			} else {
				t.push(`${He} swishes ${his} tail from side to side, apparently waiting for you to take the mysterious money.`);
			}
			t.push(`There's maybe two hundred credits worth of small bills here. It looks more like ${he} lifted some poor guy's wallet than 'found' this on the ground.`);
			presentType = "nice";
		} else if (catPresent === 1) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} trots in, holding a small, fluffy, brightly-colored toy in ${his} mouth. The cat${girl} confidently walks up to your desk as though about to discuss some important matter of business, then opens ${his} mouth to drop it right in front of you, slick with ${his} drool.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"This is my favorite toy, ${title}! So I wanted it to be your favorite toy too!"`));
			} else {
				t.push(`${He} stares at you playfully and wiggles ${his} butt from side to side behind ${him}.`);
			}
			t.push(`You stare blankly for a moment at the fully-grown, ostensibly intelligent cat${girl} asking you to play with a drooled-on cat toy.`);
			presentType = "junk";
		} else if (catPresent === 2) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} practically bursts in, the ${eventSlave.skin} fur around ${his} mouth streaked red with blood and carrying what looks like a dead rat in ${his} mouth. ${He} walks right up to your desk and opens ${his} mouth to show off equally bloodstained fangs, dropping the dead rodent onto your desk with a wet plop of blood and saliva, where it proceeds to bleed out in the middle of the desk.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Look, ${title}! I saw this gross rat running around the garden so I killed it. Are you proud of me?"`));
			} else {
				t.push(`${He} looks enormously proud of ${himself} for killing a rodent that's smaller than ${his} fist and dropping the mutilated body in front of you.`);
			}
			presentType = "dead";
		} else if (catPresent === 3) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} trots in, carrying something indistinguishable in ${his} mouth. As ${he} walks over to your desk, ${he} opens ${his} mouth and drops it out with a wet plop in front of you, at which point you realize that ${he} has just dropped a dead rat on your desk which is now creating a red puddle around itself. ${eventSlave.slaveName} just smiles ear-to-ear at you with what seems like genuine pride and a mouth full of sharp fangs, which you now realize are streaked with blood.`);
			presentType = "dead";
		} else if (catPresent === 4) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} trots in, carrying something indistinguishable in ${his} mouth. As ${he} walks over to your desk, ${he} opens ${his} mouth and drops it out with a wet plop in front of you, at which point you realize that ${he} has just dropped a dead rat on your desk - or at least, you assume that the furry thing bleeding out is dead, until it twitches its leg, scampers up, and leaps off your desk, attempting to scurry out of the room. ${eventSlave.slaveName}'s stilted eyes go wide and ${his} tail perks up, and before you can even issue an order ${he}'s leaped atop the fleeing, injured rat, pinning the tiny thing down and sinking ${his} sharp fangs into it without a moment of hesitation. ${He} shakes his head violently from side to side, apparently trying to snap the vermin's spine, then stands up, walks back to you, opens ${his} mouth and drops the disgusting, bleeding, mutilated rat corpse on your desk. Again.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Did you see me kill it, ${title}!? I did good, right?"`));
			} else {
				t.push(`${He} smiles ear to ear at you, waiting for you to take the 'present'.`);
			}
			presentType = "dead";
		} else if (catPresent === 5) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} trots in, carrying something indistinguishable in ${his} mouth. As ${he} walks over to your desk, ${he} opens ${his} mouth and drops it out with a wet plop in front of you, at which point you realize that ${he} has just dropped a bundle of small bills which ${he} was, for some inexplicable reason, carrying around in ${his} mouth. They are drenched with ${his} saliva and completely ruined. You look at the pile of ruined currency and ask ${him} why ${he} didn't just carry it to you in ${his} hands.`);
			if (canTalk(eventSlave)) {
				t.push(
					`${eventSlave.slaveName} blinks twice.`,
					Spoken(eventSlave, `"Oh - um, yeah, I guess I probably should have done that, ${title}. Um- sorry."`));
			} else {
				t.push(`${He} looks down at the pile of ruined money, looks back up at you, and then blinks sheepishly.`);
			}
			presentType = "junk";
		} else if (catPresent === 6) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} trots in, holding something bright in one hand. ${He} walks right up to the desk and drops a small ball of brightly colored string in front of you, beaming wide enough to show of ${his} pearly white fangs.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Look at this, ${title}! You can bat it around and stuff! I brought it to you because I thought you'd have fun playing with it!"`));
			} else {
				t.push(`${He} stares at you playfully and wiggles ${his} butt from side to side behind ${him}.`);
			}
			presentType = "junk";
		} else if (catPresent === 7) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} practically bursts in, the ${eventSlave.skin} fur around ${his} mouth streaked red with blood and carrying an entire dead rabbit in ${his} mouth, the dead thing almost as big as ${his} entire head and hanging limply from between ${his} fangs. ${He} nearly sprints over to your desk, looking excited beyond belief as ${he} spits the large rabbit out in front of you, where the corpse splats against your desk in a splash of saliva and blood that flicks some liquid against your face. ${He}'s nearly quivering with excitement and pride.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Look! Look! I killed a rabbit, ${title}!! A whole rabbit! I saw it outside and chased it down so you could hang it up on your wall! Did I do good, ${title}?"`));
			} else {
				t.push(`${He} looks absolutely overjoyed with ${himself} for having killed something bigger than a rat for once.`);
			}
			presentType = "dead";
		} else if (catPresent === 8) {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} trots in, holding something bright in one hand. ${He} walks right up to the desk and drops a shiny, gorgeous ring in front of you, beaming wide enough to show of ${his} pearly white fangs. This looks like a valuable piece of jewelry, easily worth a few thousand credits at least. You ask ${him} where ${he} got this as you examine the expensive thing.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"I found it, ${title}! That means it's yours now."`));
			} else {
				t.push(`However, given that ${he} is totally mute, ${he} just stares back at you while smiling. You don't think you're going to get any answers there.`);
			}
			presentType = "nice";
		} else {
			t.push(`As you sit working at your desk, ${eventSlave.slaveName} trots in, holding something bright in one hand. ${He} walks right up to the desk and drops a lump of shiny metal in front of you, beaming wide enough to show of ${his} pearly white fangs, which glint almost as brightly as the metal.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Look what I found, ${title}! You can put it on your wall or something. Isn't it pretty?"`));
			} else {
				t.push(`${He} stares at you playfully and wiggles ${his} butt from side to side behind ${him}.`);
			}
			presentType = "junk";
		}
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Tell ${him} that some under the desk oral would be a better present`, blowjob),
			new App.Events.Result(`Accept the present`, yes),
			new App.Events.Result(`Reject ${his} 'gift'`, no),
			(catPresent === 7)
				? new App.Events.Result(`Have the rabbit cooked and eat it with ${him}`, rabbit,)
				: new App.Events.Result(),
			(presentType === "dead") && (V.noDeadShit === 0)
				? new App.Events.Result(`Tell ${him} to stop dropping dead things on your desk`, noMoreDeadShit,)
				: new App.Events.Result(),
			(V.noDeadShit === 1)
				? new App.Events.Result(`Take the present and tell ${him} ${he} can hunt for you again`, moreDeadShit,)
				: new App.Events.Result(),
		]);

		function blowjob() {
			const frag = new DocumentFragment();
			let t = [];
			if (presentType === "dead") {
				t.push(`You brush the disgusting dead animal off your desk and suggest that ${eventSlave.slaveName} could better show ${his} affection by climbing under your desk ${himself} and ${PC.dick !== 0 ? "sucking you off" : "eating you out"} while you work. Although ${eventSlave.slaveName} looks briefly disappointed as you push ${his} fresh new kill away, ${he} eagerly dives beneath the desk without so much as bothering to wipe the blood from around ${his} mouth. You briefly question the decisions that lead to this point as you feel soft fur stained with hot, fresh animal blood bristle against your crotch.`);
			} else {
				t.push(`You brush the strange present off your desk and suggest that ${eventSlave.slaveName} could better show ${his} affection by climbing under your desk ${himself} and ${PC.dick !== 0 ? "sucking you off" : "eating you out"} while you work. Although ${eventSlave.slaveName} looks briefly disappointed as you push ${his} present away, ${he} gets down beneath the desk at your suggestion, settling down on ${his} knees while you get to work with the sensation of a soft, fuzzy face rubbing up against your crotch.`);
			}
			App.Events.addParagraph(frag, t);

			t = [];
			if (eventSlave.sexualFlaw !== "hates oral") {
				t.push(`The cat${girl} teases and bristles against you for a good minute as you get back to work before finally pulling your bottoms out of the way, doing ${his} best to disrupt your focus from the business deals in front of you as ${he}`);
				if (eventSlave.skill.oral >= 60) {
					t.push(`${PC.dick !== 0 ? `blows you nonstop while skillfully avoiding pricking you with ${his} fangs, working what must be a half-dozen loads from your dick throughout the workday. Your cock is basically holstered in ${his} throat as you work, and ${his} skillful attention to your nuts coaxes you back to action within minutes of blowing one load down ${his} throat,` : `tonguefucks you again and again, slaving away at your pussy to bring you to distractingly squirt and sputter against ${his} fuzzy face countless times while you try to work,`} the soft fur feeling divine between your thighs the whole time.`);
					t.push(`<span class="devotion inc">When ${he} finally comes up from under the desk, ${he} smiles broadly, having serviced you for most of the working day.</span>`);
				} else {
					t.push(`${PC.dick !== 0 ? `serves at the altar of your cock as best ${he} can, occasionally distracting you from the nonstop blowjob as ${his} sharp fangs prick your dick. Despite ${his} amateur efforts, ${he} gets multiple orgasms out of you over the course of the next few hours, blowing you with enthusiasm and energy if not skill.` : `eats you out amateurishly over the next few hours, ${his} rough cat tongue scratching your folds slightly as ${he} twists it around to eventually bring you to orgasm - and then another, and another. ${He} does ${his} best to serve your cunt, even with ${his} mediocre skills.`}`);
					t.push(`<span class="devotion inc">When ${he} finally comes up from under the desk, ${he} smiles broadly, having serviced you for most of the working day.</span>`);
				}
				eventSlave.devotion += 2;
			} else {
				t.push(`Although ${he} gives you a dutiful ${PC.dick !== 0 ? "blowjob" : "cunnilingus session"}, ${he} clearly doesn't enjoy the act of giving oral and scampers off the instant you finish, present forgotten.`);
				eventSlave.devotion -= 2;
			}
			App.Events.addParagraph(frag, t);

			seX(eventSlave, "oral", V.PC, "penetrative");
			return frag;
		}

		function yes() {
			let t = [];
			if (catPresent === 0) {
				t.push(`You take the <span class="green">wad of cash</span> as ${eventSlave.slaveName} smiles at you, thanking ${him} for bringing it. It's a relatively insignificant amount of money for someone as wealthy as you, although probably a significant sum to whatever poor sod lost it, but ${eventSlave.slaveName} swishes ${his} tail from side to side enthusiastically as you put the cash in your pocket.`);
				if (canTalk(eventSlave)) {
					t.push(
						Spoken(eventSlave, `"Of course, ${title}!"`),
						`${He} meows out,`
					);
				} else {
					t.push(`${He} makes a satisfied purring noise,`);
				}
				t.push(`then leaves <span class="devotion inc">with ${his} ears twitching happily.</span>`);
				cashX(200, "event", eventSlave);
				eventSlave.devotion += 2;
			} else if (catPresent === 8) {
				t.push(`You pick up the <span class="green">expensive ring,</span> deciding not to question how someone "lost" such an elaborate piece of jewelry. Neither the ethics nor the value of the shiny ring seem to register with ${eventSlave.slaveName}, despite her intelligence; it seems like ${he} doesn't actually care about how costly it is, only that you've accepted ${his} 'little' present. ${canTalk(eventSlave) ? `"It'll look pretty on you, ${title}!" ${He} mrowls,` : `${He} makes a satisfied purring noise,`} then leaves <span class="devotion inc">with ${his} ears twitching happily.</span>`);
				cashX(2500, "event", eventSlave);
				eventSlave.devotion += 2;
			} else if (presentType === "junk") {
				t.push(`You pick up the piece of junk, examine it for a few moments, then smile back at ${eventSlave.slaveName} and thank ${him} for bringing you something that ${he} clearly personally treasures. ${eventSlave.slaveName}'s furry face lights up as you say that you like ${his} little present, even though it's totally useless to you, and ${his} tail starts to <span class="devotion inc">swish from side to side happily behind ${him}.</span>`);
				if (canTalk(eventSlave)) {
					t.push(
						Spoken(eventSlave, `"I'm so glad you like it, ${title}. I knew you would! I'm happy that you're my ${title}."`),
						`${He} says,`
					);
				} else {
					t.push(`${He} makes a satisfied purring noise,`);
				}
				t.push(`then leaves you to file the small trinket away in one of your drawers.`);
				eventSlave.devotion += 4;
			} else {
				t.push(`You wince slightly as you pick up the dead, bleeding animal, pulling it off your desk before it can leak onto anything important. Even though you own ${eventSlave.slaveName} and have absolute power over ${him}, the look of anticipation and excitement on ${his} face is too much to resist, and you say that you're very proud of ${him} for doing such good hunting work. ${eventSlave.slaveName} beams a full mouth of bloody fangs at you, obviously <span class="devotion inc">overjoyed</span> at your praise.`);
				if (canTalk(eventSlave)) {
					t.push(
						Spoken(eventSlave, `"I killed it for you, ${title}! I promise I won't let any gross vermin dirty up the penthouse."`),
						`${He} mrows,`
					);
				} else {
					t.push(`${He} makes a satisfied purring noise,`);
				}
				t.push(`then leaves you to quietly throw the dead animal into the nearby trashcan and call for another slave to clean up the blood.`);
				eventSlave.devotion += 6;
			}
			return t;
		}

		function no() {
			let t = [];
			if (presentType === "nice") {
				t.push(`You push the 'found' offering away, shaking your head. You tell ${him} that it's a very nice offering to bring this to you, but then briefly explain that taking other people's money without giving them a choice is wrong, and that someone out there probably needs this more than you do anyway. ${eventSlave.slaveName}`);
				if (canTalk(eventSlave)) {
					t.push(
						`cocks ${his} head slightly.`,
						Spoken(eventSlave, `"How come taking people's money without a choice is wrong but you enslave lots of people then, ${title}?"`),
						`Not wanting to get into an ethical debate with an overgrown housecat, you tell ${him} that it just is and to leave so you can get back to work. ${eventSlave.slaveName} gives you a puzzled look and then heads out.`
					);
				} else {
					t.push(`${He} just makes a confused noise from the back of ${his} throat, then nods at you and heads out.`);
				}
			} else if (presentType === "junk") {
				t.push(`You push the piece of junk into the trashcan to the side of your desk with one hand, ignoring the <span class="devotion dec">dismayed</span> look that spreads across ${his} furry face as you do. You sternly tell ${him} to stop bothering you with useless junk and that have more important things to do than look at ${his} stupid cat toys and shiny rocks.`);
				if (canTalk(eventSlave)) {
					t.push(
						Spoken(eventSlave, `"I'm - I-I'm sorry, ${title}, I just thought you'd like it..."`),
						`${He} weakly meows. You tell ${him} that you don't.`
					);
				} else {
					t.push(`${He} makes a single, sad whimpering sound, all ${he}'s capable of given ${his} muteness.`);
				}
				t.push(`${His} eyes look a little watery as ${he} leaves.`);
				eventSlave.devotion -= 4;
			} else {
				t.push(`You pick the disgusting dead animal up with one hand and drop the corpse into the trashcan next to your desk. Once it's off your workspace, you proceed to sternly tell ${eventSlave.slaveName} that what ${he} just did is disgusting, unsanitary, and incredibly infantile, and that ${he} could have ruined something important by dropping a filthy corpse in the area where you conduct multinational business deals.`);
				if (canTalk(eventSlave)) {
					t.push(
						Spoken(eventSlave, `"S-sorry, ${title}... I was just... really proud of it, I guess... I killed it for you..."`),
						`${He} weakly meows.`
					);
				} else {
					t.push(`${He} makes a single, sad whimpering sound, all ${he}'s capable of given ${his} muteness.`);
				}
				t.push(`You tell ${him} to clean up the mess ${he} made on your desk, glaring at the overexcitable cat${girl}. ${His} eyes look a <span class="devotion dec">little watery</span> as ${he} leans over the surface and gets to cleaning off the blood.`);
				eventSlave.devotion -= 6;
			}
			return t;
		}

		function rabbit() {
			let t = [];
			t.push(`You take a good look at the dead rabbit on your desk. For once, this thing actually looks kind of good. It's got two small puncture wounds just beneath its neck, but the corpse is almost totally intact, and it's pretty fat, too. With rabbit becoming an increasingly rare delicacy these days as desperate poachers violate the nature restrictions of old world governments too impotent to enforce them, you make up your mind to cook and eat this rare hunted treat. Placing your hands on the desk, you look back up at ${eventSlave.slaveName}, tell ${him} ${he}'s done an excellent job, and that you're going to have ${his} kill roasted and eaten. ${eventSlave.slaveName} practically quivers up and down with excitement at the praise, visibly excited that you're going to actually do something useful with ${his} present - and at the prospect of a real meal. After listening to ${him} gush your praises for a few minutes, you send ${him} out to get back to work. Later in the evening, the two of you enjoy delicious roast rabbit together, cooked with golden-brown crispy skin and a tender inside that leaves traces of juice running down both of your cheeks.`);
			if (canTalk(eventSlave)) {
				t.push(
					Spoken(eventSlave, `"You're the`),
					App.UI.DOM.makeElement("span", Spoken(eventSlave, "best,"), ["devotion", "inc"]),
					Spoken(eventSlave, `${title}."`),
					`${He} mrows,`
				);
			} else {
				t.push(`${He} stares <span class="devotion inc">happily</span> for a long time into your eyes as you eat,`);
			}
			t.push(`bloody juice running down into the fur around ${his} mouth for the second time today.`);
			eventSlave.devotion += 8;
			return t;
		}

		function noMoreDeadShit() {
			let t = [];
			t.push(`You slam your fist on the table loud enough that it makes ${eventSlave.slaveName} jump and ${his} tail to flick straight up in the air, the dead animal still bleeding out over your desk, and yell at the harebrained cat${girl} to stop dropping filthy fucking dead animals on your desk, and for that matter for all the rest of your idiotic catsluts to stop doing it too. ${eventSlave.slaveName} cowers in front of your desk as you yell at ${him}, all of ${his} pride and excitement at securing a kill on something immediately forgotten.`);
			if (canTalk(eventSlave)) {
				t.push(
					Spoken(eventSlave, `"I - I d-didn't know you hated my hunting so much, ${title},"`),
					`${He} weakly meows.`,
					Spoken(eventSlave, `"I just want to make you proud - u-uhm, I promise I'll stop..."`),
					`You tell ${him} that ${he} better, or you'll beat ${his} ass so red ${he} won't be walking for a month.`
				);
			} else {
				t.push(`${He} makes a single, sad whimpering sound, all ${he}'s capable of given ${his} muteness. You tell ${him} that that better mean that ${he}'s going to stop, and ${he} weakly nods ${his} head up and down in confirmation.`);
			}
			t.push(`${He} does ${his} best to hide ${his} <span class="devotion dec">watering eyes</span> as ${he} gets to cleaning off your desk, but they're pretty obvious.`);
			V.noDeadShit = 1;
			eventSlave.devotion -= 10;
			return t;
		}

		function moreDeadShit() {
			let t = [];
			t.push(`You sigh as ${eventSlave.slaveName} drops a stupid present on your desk once more and wearily tell ${him} that ${he}'s allowed to hunt again. ${His} pointy ears immediately perk up, instantaneously forgetting whatever it was that ${he}'d offered up to you in tribute just a few seconds ago.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Really!? I - thanks, ${title}! I'm gonna find lots of stuff to kill for you, I promise! I'll be the best hunter ever!"`));
			} else {
				t.push(`${He} wiggles ${his} butt from side to side enthusiastically and makes the loudest purring sound ${his} damaged vocal chords are capable of.`);
			}
			t.push(`You sigh in exasperation as the excitable cat${girl} bounds out of the room <span class="devotion inc">enthusiastically,</span> mentally preparing yourself for whatever disgusting corpse ${he}'s liable to drop on your desk next to show off ${his} catlike adoration.`);
			V.noDeadShit = 0;
			eventSlave.devotion += 8;
			return t;
		}
	}
};
