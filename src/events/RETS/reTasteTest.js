// cSpell:ignore Whaa

App.Events.RETSTasteTest = class RETSTasteTest extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave /domslave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canMove,
				canTalk,
				canHear,
				canTaste,
				s => s.devotion > 20,
				s => s.energy > 80,
				s => s.chastityVagina === 0 || s.chastityPenis === 0,
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				canWalk,
				canTalk,
				canHear,
				canTaste,
				s => s.devotion >= -20,
				assignmentVisible,
				s => s.chastityVagina === 0 || s.chastityPenis === 0,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, His
		} = getPronouns(eventSlave);
		const {say: say} = getEnunciation(eventSlave);
		const arms = hasBothArms(eventSlave) ? "arms" : "arm";
		const {
			he2, his2, him2, He2
		} = getPronouns(subSlave).appendSuffix("2");
		const {say: say2, title: master2} = getEnunciation(subSlave);
		const arms2 = hasBothArms(subSlave) ? "arms" : "arm";

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");

		let t = [];

		t.push(`You look into the part of the kitchens used for slave feeding one morning during a quiet time, finding the area deserted except for`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), `. ${He}`));
		if (canSee(eventSlave)) {
			t.push(`sees you enter`);
		} else {
			t.push(`hears you enter`);
		}
		t.push(`and`);
		if (V.cockFeeder === 1) {
			t.push(`stops sucking ${his} feeder phallus,`);
		} else {
			t.push(`puts ${his} cup of liquid slave food down,`);
		}
		t.push(`but you make a dismissive "go back to what you were doing"`);
		if (canSee(eventSlave)) {
			t.push(`gesture,`);
		} else {
			t.push(`sound,`);
		}
		t.push(`and ${he} obediently`);
		if (V.cockFeeder === 1) {
			t.push(`resumes sucking down`);
		} else {
			t.push(`goes back to drinking`);
		}
		t.push(`${his} breakfast. You pull out a tablet and start getting some work done, enjoying the low, human sounds of your chattel going about their business in the rooms all around you.`);
		t.push(App.UI.DOM.slaveDescriptionDialog(subSlave));
		t.push(`pads in, looking not quite awake yet. Not noticing you in ${his2} stupor, ${he2}`);
		if (V.cockFeeder === 1) {
			t.push(`chooses the phallus next to ${contextualIntro(subSlave, eventSlave)}'s and starts to suck too.`);
		} else {
			t.push(`draws ${his2} ration and heads over towards ${contextualIntro(subSlave, eventSlave)} to drink it next to ${him}.`);
		}
		t.push(`${He2}'s clearly looking for some companionship this morning, but ${his2} gears visibly turn for a while before ${his2} sleepy head can come up with something to say. Both the slaves are allowed some variety of flavor in their liquid slave food, so ${he2} finally settles on that.`);
		t.push(`${Spoken(subSlave, `"What flavor did you choose?"`)} ${he2} asks ${eventSlave.slaveName}.`);
		App.Events.addParagraph(node, t);
		t = [];


		if (V.cockFeeder === 1) {
			t.push(`${eventSlave.slaveName} pulls ${his} mouth off ${his} feeder with a luscious pop.`);
		} else {
			t.push(`${eventSlave.slaveName} lowers ${his} cup for a moment.`);
		}
		if (eventSlave.preg > eventSlave.pregData.normalBirth/2) {
			t.push(`${Spoken(subSlave, `"The sour pickle flavor,"`)} ${he} responds, patting ${his} rounded middle. ${Spoken(eventSlave, `"I just can't get enough of it."`)}`);
		} else {
			t.push(`${Spoken(subSlave, `"The tart fruity kind,"`)} ${he} responds. ${Spoken(eventSlave, `"It's refreshing first thing in the morning."`)}`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`"Oh," ${say2}s ${subSlave.slaveName}. ${Spoken(subSlave, `"Um, can I try some?"`)}`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} smiles and murmurs, "Mm hm." There is a distinct`);
		if (canSee(eventSlave)) {
			t.push(`glint in ${his} eye.`);
		} else {
			t.push(`look on ${his} face.`);
		}
		t.push(`${He}'s got a healthy libido, to put it mildly. Like all slaves, ${subSlave.slaveName} sleeps nude and hasn't gotten dressed yet, and ${eventSlave.slaveName} has`);
		if (canSee(eventSlave)) {
			t.push(`obviously noticed ${his2}`);
			if (subSlave.dick > 4) {
				t.push(`enormous cock`);
			} else if (subSlave.labia > 1) {
				t.push(`remarkable pussylips`);
			} else if (subSlave.boobs > 5000) {
				t.push(`enormous bare udders`);
			} else if (subSlave.lactation > 1) {
				t.push(`milky nipples`);
			} else if (subSlave.face > 40) {
				t.push(`pretty face, nudity,`);
			} else if (subSlave.belly >= 5000) {
				if (subSlave.bellyPreg >= 5000) {
					t.push(`pregnancy, nudity,`);
				} else if (subSlave.bellyImplant >= 5000) {
					t.push(`big belly, nudity`);
				} else {
					t.push(`${subSlave.inflationType}-filled belly, nudity`);
				}
			} else {
				t.push(`nudity`);
			}
			t.push(`and`);
		} else {
			t.push(`picked up on the sound`);
			if (subSlave.dick > 4) {
				t.push(`of ${his2} enormous cock slapping against ${his2} thighs`);
			} else if (subSlave.boobs > 5000) {
				t.push(`of ${his2} enormous bare udders flopping around as ${he2} moves`);
			} else if (subSlave.belly >= 5000) {
				if (subSlave.bellyPreg >= 5000) {
					t.push(`of ${his2} pregnancy pestering ${him2}`);
				} else if (subSlave.bellyImplant >= 5000) {
					t.push(`of ${his2} big belly bumping things`);
				} else {
					t.push(`of ${his2} ${subSlave.inflationType}-filled belly gurgling`);
				}
			} else if (subSlave.lactation > 1) {
				t.push(`of the ${subSlave.milkFlavor === "none" ? `` : `${subSlave.milkFlavor}-flavored `}milk dripping from ${his2} nipples`);
			} else {
				t.push(`of ${his2} bare skin against the cool air`);
			}
			t.push(`in addition to ${his2}`);
		}
		t.push(`sleepy willingness to be friendly. ${eventSlave.slaveName}`);
		if (V.cockFeeder === 1) {
			t.push(`turns to ${his} phallus and sucks it powerfully, drawing`);
		} else {
			t.push(`raises ${his} cup again and draws`);
		}
		t.push(`liquid food into ${his} mouth. ${He} turns to ${subSlave.slaveName}.`);
		t.push(`"Go ahead," ${he} ${say}s carefully, enunciating past ${his} mouthful of fluid, and then purses ${his} lips. ${subSlave.slaveName} is taken aback for a moment, but decides ${he2}'s game and steps in, planting ${his2} lips on ${eventSlave.slaveName}'s.`);
		if ((eventSlave.boobs > 3000) && (subSlave.boobs > 3000)) {
			t.push(`(Their tits are so huge that ${he2} has to fight to get close enough to kiss.)`);
		} else if (eventSlave.boobs > 5000) {
			t.push(`(${eventSlave.slaveName}'s tits are so huge that ${he2} has to press hard against them to get close enough to kiss.)`);
		} else if (subSlave.boobs > 5000) {
			t.push(`(${subSlave.slaveName}'s tits are so huge that ${he2} has to press them hard against ${eventSlave.slaveName} to get close enough to kiss.)`);
		} else if (eventSlave.belly >= 5000 && subSlave.belly >= 5000) {
			t.push(`(Their bellies are so swollen`);
			if ((eventSlave.preg > eventSlave.pregData.normalBirth / 8) && (subSlave.preg > subSlave.pregData.normalBirth / 8)) {
				t.push(`with life`);
			}
			t.push(`that ${he2} has to fight to get close enough to kiss.)`);
		} else if (eventSlave.belly >= 300000) {
			t.push(`(${eventSlave.slaveName}'s`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 8) {
				t.push(`pregnancy`);
			} else {
				t.push(`belly`);
			}
			t.push(`is so massive that ${he2} has to practically climb atop it to get close enough to kiss.)`);
		} else if (subSlave.belly >= 300000) {
			t.push(`(${subSlave.slaveName}'s`);
			if (subSlave.preg > subSlave.pregData.normalBirth / 8) {
				t.push(`pregnancy`);
			} else {
				t.push(`belly`);
			}
			t.push(`is so massive that ${he2} has to practically lift ${eventSlave.slaveName} with it to get close enough to kiss.)`);
		} else if (eventSlave.belly >= 10000) {
			t.push(`(${eventSlave.slaveName}'s`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 8) {
				t.push(`pregnancy`);
			} else {
				t.push(`belly`);
			}
			t.push(`is so big that ${he2} has to press hard against it to get close enough to kiss.)`);
		} else if (subSlave.belly >= 10000) {
			t.push(`(${subSlave.slaveName}'s`);
			if (subSlave.preg > subSlave.pregData.normalBirth / 8) {
				t.push(`pregnancy`);
			} else {
				t.push(`belly`);
			}
			t.push(`is so big that ${he2} has to press it firmly against ${eventSlave.slaveName} to get close enough to kiss.)`);
		}
		t.push(`${He2} stiffens with the lewd feeling of the warm fluid pressing into ${his2} mouth. After a moment ${he2} tries to back off and concentrate on the food, but ${eventSlave.slaveName} is having none of that, and uses ${his} ${arms} to hug ${subSlave.slaveName} close, making out with ${his} catch.`);
		if (subSlave.energy > 60) {
			t.push(`${subSlave.slaveName}'s own powerful sex drive is waking up, and ${he2} clearly doesn't mind.`);
		} else {
			t.push(`${subSlave.slaveName} isn't sexually needy enough or awake enough to be as horny as ${eventSlave.slaveName}, but ${he2} goes along willingly enough.`);
		}


		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result("This belongs on a live feed", feed),
			new App.Events.Result("Get involved in the taste testing", involved),
			((canDoAnal(subSlave) && subSlave.anus !== 0) || (canDoVaginal(subSlave) && subSlave.vagina !== 0)
				? new App.Events.Result("Look, a bare butt", butt)
				: new App.Events.Result()
			),
		]);


		function feed() {
			t = [];

			t.push(`You let them continue kissing, but use your tablet to slave one of the plaza's bigger screens to a feed of their nude makeout session. They have no way of knowing, and progress innocently from deep kissing to open mutual masturbation. This is a common sex act among your slaves: it's quick and clean and lets them achieve release before getting back to their duties. When they've both climaxed, you manipulate the situation again, setting a wallscreen in the kitchen to display a feed of the crowd in the plaza enjoying the feed of the situation in the kitchen.`);
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
				t.push(`They blush crimson and both turn back towards each other, desperate to look anywhere but at the sight of the crowd that just watched them jerk each other off.`);
			} else {
				t.push(`They blush crimson and both turn back towards each other, desperate to look anywhere but at the crowd, but unable to tell where the camera actually is.`);
			}
			t.push(`Such honesty is very tough to fake, and the crowd <span class="reputation inc">knows they just saw real pleasure.</span>`);
			repX(500, "event", eventSlave);
			seX(subSlave, "oral", eventSlave, "oral");
			return t;
		}

		function involved() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You move in. ${eventSlave.slaveName}`);
			if (canSee(eventSlave)) {
				t.push(`catches sight of`);
			} else {
				t.push(`notices`);
			}
			t.push(`your approach, and you see the corners of ${his} mouth quirk upward. ${He} breaks the lip lock and ${say}s breathily,`);
			t.push(Spoken(eventSlave, `"Hey ${subSlave.slaveName}, I think there's something else you should taste test."`));

			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`"Whaa-" the slave starts to ask warily before ${eventSlave.slaveName} pushes ${him2} to ${his2} knees, spinning ${him2} around as ${he} does so. This brings ${subSlave.slaveName} face to face with your`);
			if (V.PC.dick !== 0) {
				t.push(`stiff prick, a bead of precum already present at its tip.`);
			} else {
				t.push(`wet cunt, a bead of pussyjuice already trailing down your inner thigh.`);
			}
			t.push(`${Spoken(subSlave, `"Oh, um, hi ${master2},"`)} ${he2} stammers, and then starts to`);
			if (V.PC.dick !== 0 && V.PC.vagina !== -1) {
				t.push(`suck your dick and eat your pussy.`);
			} else if (V.PC.dick !== 0) {
				t.push(`suck your dick.`);
			} else {
				t.push(`eat your pussy.`);
			}
			t.push(`This leaves poor ${eventSlave.slaveName} without anyone to make out with, so you step in there, grabbing ${him} and pulling the giggling slave in to kiss ${him} deeply. ${His} mouth is indeed a bit`);
			let aftertaste = "";
			if (eventSlave.dietCum === 2) {
				aftertaste = ", once you get past the overwhelming taste of cum";
			} else if (eventSlave.dietCum === 1 && eventSlave.dietMilk === 0) {
				aftertaste = ", though not without a hint of cum";
			} else if (eventSlave.dietCum === 1 && eventSlave.dietMilk === 1) {
				aftertaste = ", though not without hints of cum and milk";
			} else if (eventSlave.dietMilk === 1 && eventSlave.dietCum === 0) {
				aftertaste = ", with a hint of breast milk too";
			} else if (eventSlave.dietMilk === 2) {
				aftertaste = ", but mostly tastes like mother's milk";
			}
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 2) {
				t.push(`sour${aftertaste}.`);
			} else {
				t.push(`tart${aftertaste}.`);
			}
			t.push(`${He} moans into your mouth as ${he} feels ${his} nipples press against`);
			if (V.PC.boobs >= 300) {
				t.push(`yours,`);
			} else {
				t.push(`your hard chest,`);
			}
			t.push(`and then again as your tongue invades ${him}. When you`);
			if (V.PC.dick !== 0) {
				t.push(`fill ${subSlave.slaveName}'s mouth with cum,`);
				seX(subSlave, "oral", V.PC, "penetrative");
			} else {
				t.push(`climax wetly against ${subSlave.slaveName}'s mouth,`);
				seX(subSlave, "oral", V.PC, "vaginal");
			}
			t.push(`you pull away slightly, letting the slave on ${his2} knees below you gasp ${Spoken(subSlave, `"You taste great, ${master2}!"`)} before you spin ${him2} around in turn so ${he2} can give ${eventSlave.slaveName} ${his} own allotment of oral sex. You leave them to it. They <span class="trust inc">trust you a bit more</span> after such a lighthearted little escapade.`);
			if (eventSlave.dick > 0 && eventSlave.chastityPenis === 0) {
				seX(subSlave, "oral", eventSlave, "penetrative");
			} else if (canDoVaginal(eventSlave)) {
				seX(subSlave, "oral", eventSlave, "vaginal");
			} else {
				actX(subSlave, "oral");
			}
			eventSlave.trust += 2;
			subSlave.trust += 2;

			App.Events.addParagraph(frag, t);
			return frag;
		}

		function butt() {
			const sexTarget = (canDoVaginal(subSlave) && subSlave.vagina !== 0) ? "vaginal" : "anal";
			t = [];

			t.push(`You move in, looking intently at ${subSlave.slaveName}'s bare, vulnerable butt. ${eventSlave.slaveName}`);
			if (canSee(eventSlave)) {
				t.push(`catches sight of your approach, and then follows the line of your gaze,`);
			} else {
				t.push(`notices your approach,`);
			}
			t.push(`the realization of what your intent likely quickly dawns on ${him}. You see the corners of ${his} mouth quirk upward with horny maliciousness. ${He} leans back against the edge of the kitchen counter, pulling ${subSlave.slaveName} with ${him}, and then reaches down and`);
			if (subSlave.butt > 6) {
				t.push(`grabs handfuls of ${subSlave.slaveName}'s massive ass,`);
			} else if (subSlave.butt > 3) {
				t.push(`seizes ${subSlave.slaveName}'s big buttocks,`);
			} else {
				t.push(`grabs ${subSlave.slaveName}'s cute butt,`);
			}
			t.push(`pulling ${him2} upward. ${subSlave.slaveName} thinks ${he2} gets the idea, and hops up, wrapping ${his2} legs around ${eventSlave.slaveName}'s`);
			if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 2000) {
					t.push(`gravid`);
				} else {
					t.push(`rounded`);
				}
				t.push(`middle`);
			} else {
				t.push(`waist`);
			}
			t.push(`and ${his2} ${arms2} around ${eventSlave.slaveName}'s`);
			if (subSlave.belly >= 5000) {
				t.push(`shoulder${hasBothArms(subSlave) ? "s" : ""}, pushing their`);
				if (eventSlave.bellyPreg >= 2000) {
					t.push(`pregnancies`);
				} else {
					t.push(`bellies`);
				}
				t.push(`together`);
			} else {
				t.push(`shoulder${hasBothArms(subSlave) ? "s" : ""}.`);
			}
			t.push(`${eventSlave.slaveName}`);
			if (subSlave.butt > 6) {
				t.push(`hauls ${subSlave.slaveName}'s huge buttocks apart to reveal the`);
			} else if (subSlave.butt > 3) {
				t.push(`pulls ${subSlave.slaveName}'s healthy asscheeks apart to reveal the`);
			} else {
				t.push(`spreads ${subSlave.slaveName}'s buttocks to show off the`);
			}
			if (subSlave.anus > 2) {
				t.push(`lewd slit`);
			} else if (subSlave.anus > 1) {
				t.push(`inviting anus`);
			} else {
				t.push(`pretty rosebud`);
			}
			t.push(`between them. ${subSlave.slaveName} has only a brief moment to wonder why ${his2} butt is being spread this way before ${he2} feels`);
			if (V.PC.dick !== 0) {
				t.push(`your cockhead`);
			} else if (subSlave.anus > 2) {
				t.push(`your hand, formed into a beak shape`);
			} else if (subSlave.anus > 1) {
				t.push(`three fingers`);
			} else {
				t.push(`two fingers`);
			}
			if (sexTarget === "vaginal") {
				t.push(`trace ${his2} pussy lips before slipping inside.`);
			} else {
				t.push(`press against and then inside ${his2} butthole.`);
			}
			t.push(`${He2} tries to turn away from ${eventSlave.slaveName} and greet you properly, but ${eventSlave.slaveName} won't let ${him2}, so ${he2} tries to mumble a greeting into ${eventSlave.slaveName}'s mouth and then settles for a spastic wave of ${hasBothArms(subSlave) ? "one hand" : "a foot"}. This is an alluringly awkward process made desperate by the distracting feeling of you`);
			if (sexTarget === "vaginal") {
				t.push(`fucking ${him2}.`);
			} else {
				t.push(`fucking ${his2} ass.`);
			}
			t.push(`You could have done something more inventive with the situation, but the feeling of`);
			if (V.PC.dick !== 0) {
				t.push(`an anal sphincter around the base of your dick`);
			} else {
				t.push(`finger fucking a compliant slave's submissive asspussy while you look after yourself with your other hand`);
			}
			t.push(`never gets old. Why complicate things? An hour later you leave your fucktoys stumbling tiredly towards the shower, <span class="devotion inc">sexually satiated</span> and ${(sexTarget === "anal") ? "anally" : "thoroughly"} dominated.`);
			eventSlave.devotion += 2;
			subSlave.devotion += 2;
			if (sexTarget === "vaginal") {
				if (canImpreg(subSlave, V.PC)) {
					knockMeUp(subSlave, 5, 0, -1);
				}
			} else {
				if (canImpreg(subSlave, V.PC)) {
					knockMeUp(subSlave, 5, 1, -1);
				}
			}
			seX(subSlave, sexTarget, V.PC, "penetrative", 2);
			seX(eventSlave, "oral", subSlave, "oral", 2);
			if (canDoVaginal(eventSlave) && eventSlave.vagina !== 0) {
				seX(eventSlave, "vaginal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 5, 0, -1);
				}
				seX(eventSlave, "oral", subSlave, "oral");
			}
			if (canDoAnal(subSlave) && subSlave.anus !== 0) {
				seX(eventSlave, "anal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 5, 0, -1);
				}
				seX(eventSlave, "oral", subSlave, "oral");
			}

			return t;
		}
	}
};
