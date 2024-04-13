App.Events.CMRESSCatLove = class CMRESSCatLove extends App.Events.BaseEvent {
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
				s => s.devotion > 90,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, His, him, himself, girl
		} = getPronouns(eventSlave);
		const {title} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];
		t.push(`As you walk out from the office to your bedroom late in the evening, ${eventSlave.slaveName} approaches you in the halls, holding something behind ${his} back with both hands. ${His} tail swishes nervously from side to side behind ${him}. The instant you open your mouth to ask what ${he}'s holding, the quivering cat${girl} thrusts out ${his} arms in front of ${him} to show you`);
		if (eventSlave.intelligence + eventSlave.intelligenceImplant > 80) {
			t.push("a beautiful, hand-drawn picture portraying you as a godlike figure above a large collection of distinct catgirl faces.");
			App.Events.addParagraph(node, t);

			t = [];
			t.push(`${eventSlave.slaveName} ${himself} is prominently displayed at the center of the catfolk at the bottom of the image, all of whom are looking up to you with big, worshipful smiles across their faces, pointed ears perked up. The bright golden hues make it look like a religious icon, but instead of a halo you're surrounded by two complex-looking genetic tubes; the faces of Dr. Nieskowitz and some other wizened scientists hang around you like angels. It's incredibly well-made, and even inlaid with a few sparkly things that seem to be whatever ${eventSlave.slaveName} could find lying around.`);
			if (canTalk(eventSlave)) {
				t.push(
					Spoken(eventSlave, `"I, uhm, wanted to make you something nice, ${title}..."`),
					`${eventSlave.slaveName} meows out sheepishly as ${he} holds the icon out towards you.`,
					Spoken(eventSlave, `"You made all of us, and um, well, you're so good and pretty and everything..." `)
				);
			} else {
				t.push(`${He} just holds out the icon, staring at you with big ${App.Desc.eyesColor(eventSlave)} that hope you get the meaning.`);
			}
			App.Events.addParagraph(node, t);
		} else if (eventSlave.intelligence + eventSlave.intelligenceImplant > 50) {
			t.push("an elegant, small clay sculpture portraying you surrounded by a few happy catgirls.");
			App.Events.addParagraph(node, t);

			t = [];
			t.push(`${He} holds the little sculpture out to you with wobbly hands, finding it hard to balance the unwieldy thing as you examine ${his} craftscatship. The sculpture is surprisingly pretty; one of the slaves around you is obviously supposed to be ${eventSlave.slaveName}, and they're all brushing up against you lovingly with individual expressions of happiness tediously moulded onto their faces.`);
			if (canTalk(eventSlave)) {
				t.push(
					Spoken(eventSlave, `"I thought you might like a better gift, so I found some clay in the workshop and made this, ${title}."`),
					`${eventSlave.slaveName} says, struggling to hold the awkward sculpture.`,
					Spoken(eventSlave, `"You're so nice to me and I like you so much, I, um, wanted to give you something to show how much I love you..." `)
				);
			} else {
				t.push(`${He} holds the sculpture out obediently as you examine it, ears twitching atop ${his} head as ${he} eagerly awaits your judgement.`);
			}
			App.Events.addParagraph(node, t);
		} else if (eventSlave.intelligence + eventSlave.intelligenceImplant > 35) {
			t.push("a pretty drawing of the two of you cuddling one another happily.");
			App.Events.addParagraph(node, t);

			t = [];
			t.push(`${He} displays the drawing proudly. It's surprisingly well-drawn, especially considering ${his} awkward, furry hands, and ${he}'s rendered all your features flatteringly with ${eventSlave.slaveName} lovingly cradling up against your chest like an old-world girlfriend. It's obvious that ${he}'s put a lot of work into drawing this, likely in ${his} spare time after finishing the day's assignments.`);
			if (canTalk(eventSlave)) {
				t.push(
					Spoken(eventSlave, `"I hope you like it, ${title}!"`),
					`${eventSlave.slaveName} says, eagerly watching your face as you study the nice drawing.`,
					Spoken(eventSlave, `"I worked really hard on it, but it's okay, because I got to look at your face the whole time, and you're extremely pretty, ${title}..."`)
				);
			} else {
				t.push(`${He} holds the drawing out enthusiastically, obviously proud of ${his} work and silently waiting for you to decide whether you're proud of it too.`);
			}
			App.Events.addParagraph(node, t);
		} else {
			t.push("a heart cut out of red construction paper showing crude figures of you and a catgirl holding hands and smiling.");
			App.Events.addParagraph(node, t);

			t = [];
			t.push(`Upon closer inspection, the crude cat figure is clearly intended to be ${eventSlave.slaveName}, and the two of you are standing above big white text written in what looks like crayon reading "I LUV U ${V.PC.title !== 0 ? `MASTER` : `MISTRESS`}". ${eventSlave.slaveName} trembles a little as you look at the simple drawing.`);
			if (canTalk(eventSlave)) {
				t.push(
					Spoken(eventSlave, `"I'm s-sorry ${title}..."`),
					`${eventSlave.slaveName} meows weakly, still holding out ${his} heart.`,
					Spoken(eventSlave, `"I w-wanted to make you something pretty like everybody else because I love you so m-much, but I can't draw good like them, ${title}... I h-hope you like it..."`)
				);
			} else {
				t.push(`${He} holds his little paper heart out for you, staring at you with big wide ${App.Desc.eyesColor(eventSlave)} as ${his} ears flatten preemptively, apparently expecting you to hate the crude offering.`);
			}
			App.Events.addParagraph(node, t);
		}

		App.Events.addResponses(node, [
			new App.Events.Result(`Tell ${him} that ${he} can show ${his} devotion best with a heartfelt ${PC.dick !== 0 ? "blowjob" : "cunnilingus session"}`, blowjob),
			new App.Events.Result(`Take the present and let ${him} cuddle up to you`, cuddle),
			new App.Events.Result(`Hang it in your display case`, displaycase),
			new App.Events.Result(`Tear it in two, scold ${him} for wasting time making worthless trinkets, and tell ${him} to get back to work`, breakheart),
		]);

		function blowjob() {
			let t = [];
			t.push(`You take ${eventSlave.slaveName}'s present and tell ${him} that ${he} can better show you just how much ${he} cares by getting on ${his} knees and giving you ${PC.dick !== 0 ? "a blowjob" : "some pussy eating"} from the heart.`);
			if (eventSlave.sexualFlaw !== "hates oral") {
				t.push(`The cat${girl} flashes you a smile full of sharp feline fangs that makes you rethink your decision for a brief moment before ${he} squats down, pressing out ${his} ass far enough to give you a good view of those furry cheeks as ${he} works your pants down, and`);
				if (eventSlave.skill.oral >= 80) {
					t.push(`${PC.dick !== 0 ? `gives you a magnificent, loving throatjob, taking your cock as far as it can bury itself in ${his} throat while working every last drop of cum out from your balls with ${his} soft, furry hands,` : `eats you out skillfully and intensely, working ${his} rough cat tongue deep into your pussy until ${he} brings you to a shuddering orgasm,`}`);
					t.push(`<span class="devotion inc">pointy ears twitching happily atop ${his} head the entire time.</span>`);
				} else if (eventSlave.skill.oral > 40) {
					t.push(`${PC.dick !== 0 ? `gives you a skillful blowjob, carefully avoiding scratching your dick on ${his} fangs as ${he} soon brings you to a powerful orgasm down ${his} throat,` : `tonguefucks you hard, burying ${his} soft button nose against your clit as ${he} works out an orgasm from your pussy,`}`);
					t.push(`<span class="devotion inc">fluffy tail waggling behind ${him} the whole time almost doggishly.</span>`);
				} else {
					t.push(`${PC.dick !== 0 ? `does ${his} best to give you a good blowjob, mostly nervously trying to avoid cutting your dick on ${his} sharp fangs until ${his} warm, amateurish mouth finally coaxes an orgasm out of you,` : `eats you out amateurishly, ${his} rough cat tongue scratching your folds slightly as ${he} twists it around to eventually bring you to orgasm,`}`);
					t.push(`<span class="devotion inc">pointy ears wiggling around on ${his} head lovingly the entire time.</span>`);
				}
				eventSlave.devotion += 2;
			} else {
				t.push(`${He} gives you a disgusted look owing to ${his} <span class="devotion dec">hate of oral,</span> but nevertheless gets on ${his} knees and begrudgingly ${PC.dick !== 0 ? "gives you a powerful blowjob" : "eats you out passionately"}, wiping off ${his} mouth the second you cum.`);
				eventSlave.devotion -= 2;
			}
			seX(eventSlave, "oral", V.PC, "penetrative");
			return t;
		}

		function cuddle() {
			let t = [];
			t.push(`You gently take the handmade gift, pat ${eventSlave.slaveName} on ${his} fluffy head, and assure ${him} that it's beautiful. The cat${girl}'s entire face immediately lights up and ${he} launches ${himself} at you, wrapping ${his} furry arms around your waist in a hug so tight you have to place ${his} gift down on the ground to avoid dropping it. With the cat${girl} hugged so closely to your chest, you can hear ${him} <span class="trust inc">purring like a motor</span> against you, swishing ${his} tail around behind ${him} in the close embrace. ${He} doesn't say anything else, just <span class="devotion inc">lovingly purring against you</span> until you free yourself from the devoted cat${girl}'s embrace to get back to work.`);
			eventSlave.trust += 5;
			eventSlave.devotion += 5;
			return t;
		}

		function displaycase() {
			let t = [];
			t.push(`You take ${eventSlave.slaveName} by the hand, still holding ${his} little present, and lead ${him} over to your office. As ${he} looks at you confused, you gingerly take the`);
			if (eventSlave.intelligence + eventSlave.intelligenceImplant > 80) {
				t.push(`beautiful icon from ${his} hand, open your display case with a twist of your private key, and place it inside. ${eventSlave.slaveName} takes a moment to process what's happening, then smiles wider than you've ever seen ${him} smile before and presses ${his} head against your chest.`);
				if (canTalk(eventSlave)) {
					t.push(Spoken(eventSlave, `"I'm so happy you like it, ${title}!",`));
				} else {
					t.push(`${He} purrs from the back of ${his} throat so intensely you can hear it against your heart,`);
				}
				t.push(`filled with <span class="trust inc">safety</span> and <span class="devotion inc">love from the bottom of ${his} heart.</span>`);
				addTrinket(`catgirl icon`, {name: eventSlave.slaveName, id:eventSlave.ID});
			} else if (eventSlave.intelligence + eventSlave.intelligenceImplant > 50) {
				t.push(`elegant clay sculpture from ${his} hands, open your display case with a twist of your private key, and place it inside. ${eventSlave.slaveName} takes a moment to process what's happening, then smiles wider than you've ever seen ${him} smile before and presses ${his} head against your chest, tears welling up in ${his} eyes.`);
				if (canTalk(eventSlave)) {
					t.push(
						Spoken(eventSlave, `"You're the best -- the best ${title} in the whole wide world, ${title}!"`),
						`${He} mrowls out while hugging you,`
					);
				} else {
					t.push(`${He} purrs from the back of ${his} throat so intensely you can hear it against your heart,`);
				}
				t.push(`filled with <span class="trust inc">safety</span> and <span class="devotion inc">love from the bottom of ${his} heart.</span>`);
				addTrinket(`cat clay sculpture`, {name: eventSlave.slaveName, id:eventSlave.ID});
			} else if (eventSlave.intelligence + eventSlave.intelligenceImplant > 35) {
				t.push(`pretty drawn picture from ${his} hands, open your display case with a twist of your private key, and place it inside. ${eventSlave.slaveName} takes a moment to process what's happening, then chokes out a shocked meow, opens ${his} mouth, half-meows again, and stutters. ${canTalk(eventSlave) ? `"Y-you really like it that much, ${title}?" ${He} squeaks, and then, tears forming in the corner of ${his} eyes, launches into a tight, warm hug around your waist.` : `Incapable of saying anything further, ${he} simply launches himself at you and hugs you so tight it nearly squeezes on your ribs, tears forming at the corner of ${his} eyes.`} ${He}'s filled with the kind of <span class="trust inc">safety</span> and <span class="devotion inc">love from the bottom of ${his} heart</span> that only comes from genuine adoration.`);
				addTrinket(`cat drawing`, {name: eventSlave.slaveName, id:eventSlave.ID});
			} else {
				t.push(`construction paper heart from ${his} hands, open your display case with a twist of your private key, and place it inside. ${eventSlave.slaveName} looks at you, looks at the display case, looks back at you, and then suddenly breaks into tears.`);
				if (canTalk(eventSlave)) {
					t.push(
						Spoken(eventSlave, `"${title} -- I l-love you so much --"`),
						`${He} almost whimpers, before hugging ${himself} around your waist so tight it feels like ${he}'s squeezing down your ribs.`
					);
				} else {
					t.push(`${He} simply sobs for a few moments, then hugs you with so much furry warmth that you swear you can feel ${his} heart beating against yours.`);
				}
				t.push(`${He}'s filled with the kind of <span class="trust inc">safety</span> and <span class="devotion inc">love from the bottom of ${his} heart</span> that only comes from genuine adoration.`);
				addTrinket(`cat crayon`, {name: eventSlave.slaveName, id:eventSlave.ID});
			}
			eventSlave.trust += 20;
			eventSlave.devotion += 20;
			return t;
		}

		function breakheart() {
			let t = [];
			t.push(`You take the loving gift from the quivering cat${girl}'s hands, tear it in half in a single, explosive motion, and let the two ripped pieces fall to the ground. ${eventSlave.slaveName} stares at you bewildered for a second before tears start to well up at the corners of ${his} eyes. As you open your mouth to scold ${him}, ${he} starts <span class="devotion dec">sobbing uncontrollably,</span> crying in loud, ugly bawls that make it completely impossible to speak. When you order ${him} to stop, ${he} turns away from you, still sobbing, and <span class="trust dec">sprints out of the hallway</span> while some of your other slaves watch with a mixture of terror and shock on their faces. One of them trots off behind the bawling cat, probably either to comfort ${him} or rape ${him} while ${he}'s vulnerable. Irritated, you set a note for yourself to harshly punish the disobedient catslave later.`);
			eventSlave.trust -= 10;
			eventSlave.devotion -= 40;
			return t;
		}
	}
};
