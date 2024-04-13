App.Events.RESSAssFitting = class RESSAssFitting extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment !== Job.QUARTER,
				s => s.devotion > 20,
				s => s.butt > 5,
				s => ["a ball gown", "a bimbo outfit", "a biyelgee costume", "a bunny outfit", "a burkini", "a cheerleader outfit", "a comfortable bodysuit", "a confederate army uniform", "a dirndl", "a fallen nuns habit", "a huipil", "a latex catsuit", "a leotard", "a long qipao", "a maternity dress", "a military uniform", "a monokini", "a mounty outfit", "a nice nurse outfit", "a red army uniform", "a scalemail bikini", "a schoolgirl outfit", "a schutzstaffel uniform", "a slutty nurse outfit", "a slutty outfit", "a slutty qipao", "a slutty schutzstaffel uniform", "a succubus outfit", "a tight Imperial bodysuit", "an evening dress", "attractive lingerie for a pregnant woman", "attractive lingerie", "battlearmor", "chains", "clubslut netting", "conservative clothing", "cutoffs and a t-shirt", "Imperial Plate", "kitty lingerie", "lederhosen", "nice business attire", "overalls", "restrictive latex", "slutty business attire", "slutty jewelry", "spats and a tank top", "stretch pants and a crop-top", "striped panties", "uncomfortable straps", "Western clothing"].includes(s.clothes),
				hasAnyArms,
				canStand,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, hers
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave, "no clothing");
		node.appendChild(artDiv);


		let t = [];
		t.push(`Your slaves get dressed in a large wardrobe area adjacent to the dormitory, rooms, and showers. There are always slaves working, so groups of slaves can be seen putting on their clothing here several times a day. Your naked sex slaves hurrying into the outfits you've selected for them is an undeniably erotic sight. Sometimes it's comical, especially when your transformations of your slaves' bodies produce amusing inconveniences. Today, it's`);
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`who is having trouble. ${His}`);
		if (eventSlave.buttImplant / eventSlave.butt >= 0.5) {
			t.push(`fake`);
		} else if (eventSlave.butt > 12) {
			t.push(`ridiculously massive`);
		} else if (eventSlave.butt > 8) {
			t.push(`gigantic`);
		} else {
			t.push(`plush`);
		}
		t.push(`ass is`);
		if (eventSlave.drugs === "butt injections" || eventSlave.drugs === "intensive butt injections") {
			t.push(`growing explosively due to the expansion injections.`);
		} else if (eventSlave.drugs === "hyper butt injections") {
			t.push(`growing explosively due to the hyper expansion injections.`);
		} else if (eventSlave.diet === "fattening") {
			t.push(`apparently bigger today than it was yesterday, which isn't surprising, considering how much ${he}'s being fed.`);
		} else if (eventSlave.preg > eventSlave.pregData.normalBirth / 5 && eventSlave.pregKnown === 1) {
			t.push(`apparently bigger today than it was yesterday. Pregnancy often causes minor redistributions of weight like this.`);
		} else if (V.geneticMappingUpgrade > 0 && eventSlave.geneticQuirks.rearLipedema === 2) {
			t.push(`apparently a little bigger today than it was yesterday. ${His} body is constantly laying fat on ${his} ass and thighs, so this isn't really unexpected.`);
		} else if (eventSlave.buttImplantType === "string") {
			t.push(`apparently a little bigger today than it was yesterday. String implants like ${hers} steadily grow if not regularly drained.`);
		} else if (eventSlave.diet === "corrective" && eventSlave.weight < -10) {
			t.push(`apparently a little bigger today than it was yesterday. ${He} is underweight and being slowly plumped up, so this is a sign of progress.`);
		} else if (eventSlave.hormoneBalance >= 200) {
			t.push(`apparently bigger today than it was yesterday. Intensive female hormone regimens like ${hers} sometimes cause minor ass expansion.`);
		} else if (eventSlave.buttImplant / eventSlave.butt >= 0.5) {
			t.push(`apparently a little bigger today than it was yesterday. Large implants like ${hers} normally cause some slight size fluctuations.`);
		} else {
			t.push(`apparently a little bigger today than it was yesterday. With a behind as big as ${hers}, a little natural fluctuation is inevitable.`);
		}
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`${He} can't manage to`);
		switch (eventSlave.clothes) {
			case "conservative clothing":
				t.push(`pull ${his} nicely tailored slacks up over ${his} buttocks, not without risking the seams. ${He}'s got them`);
				break;
			case "a nice nurse outfit":
				t.push(`pull ${his} hospital uniform pants up over ${his} buttocks, not without risking the seams. ${He}'s got them`);
				break;
			case "chains":
				t.push(`fit the loop of chain that goes around ${his} waist over ${his} buttocks. ${He}'s got it`);
				break;
			case "Western clothing":
				t.push(`get the upper part of ${his} chaps pulled up and over ${his} buttocks. ${He}'s got them`);
				break;
			case "a huipil":
				t.push(`the huipil is very low and tight cut to hide only the front of the breasts and ${his} buttocks. ${He}'s got it`);
				break;
			case "a slutty qipao":
				t.push(`the middle part of ${his} step in qipao, the part which doesn't open from the top or the bottom, pulled up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "uncomfortable straps":
				t.push(`fit some of ${his} straps around ${his} buttocks. ${He}'s got them`);
				break;
			case "restrictive latex":
				t.push(`shimmy ${his} latex outfit up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "attractive lingerie":
				t.push(`pull ${his} pretty lace g-string up over ${his} buttocks, not without tearing it. ${He}'s got it`);
				break;
			case "a succubus outfit":
				t.push(`get ${his} leather skirt pulled up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "a cheerleader outfit":
				t.push(`get ${his} cheerleader skirt pulled up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "clubslut netting":
				t.push(`shimmy ${his} clubslut netting up and over ${his} buttocks, not without totally stretching it out and ruining it. ${He}'s got it`);
				break;
			case "cutoffs and a t-shirt":
				t.push(`get ${his} jean cutoffs pulled up and over ${his} buttocks. ${He}'s got them`);
				break;
			case "a slutty outfit":
				t.push(`get ${his} slutty skirt pulled up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "a slutty nurse outfit":
				t.push(`get ${his} tight slutty nurse skirt pulled up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "a schoolgirl outfit":
				t.push(`get ${his} schoolgirl skirt pulled up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "a fallen nuns habit":
				t.push(`shimmy the skirt of ${his} slutty latex habit up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "nice business attire":
				t.push(`get ${his} nicely tailored suit skirt up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "slutty business attire":
				t.push(`get ${his} slutty little suit skirt up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "a comfortable bodysuit":
				t.push(`shimmy ${his} bodysuit up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "a tight Imperial bodysuit":
				t.push(`shimmy ${his} bodysuit up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "a latex catsuit":
				t.push(`shimmy ${his} latex catsuit up and over ${his} buttocks. ${He}'s got it`);
				break;
			case "a military uniform":
				t.push(`get ${his} perfectly pressed uniform skirt up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "a confederate army uniform":
			case "a schutzstaffel uniform":
				t.push(`get ${his} perfectly pressed uniform trousers up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "a slutty schutzstaffel uniform":
				t.push(`get ${his} perfectly pressed uniform miniskirt up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "a long qipao":
				t.push(`get ${his} long dress down over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "overalls":
				t.push(`fit ${his} rear into the unyielding denim of ${his} tight overalls. ${He}'s got them`);
				break;
			case "battlearmor":
				t.push(`get ${his} armor up over ${his} buttocks. ${He}'s got it`);
				break;
			case "Imperial Plate":
				t.push(`get ${his} armor up over ${his} buttocks. ${He}'s got it`);
				break;
			case "a mounty outfit":
				t.push(`get ${his} slacks over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "a dirndl":
				t.push(`get ${his} skirt up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "lederhosen":
				t.push(`get ${his} shorts up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "a biyelgee costume":
				t.push(`get ${his} skirt up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "a red army uniform":
				t.push(`get ${his} perfectly pressed uniform skirt up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "a leotard":
				t.push(`pull ${his} leotard up and over ${his} buttocks, not without stretching it out and ruining it. ${He}'s got it`);
				break;
			case "a bunny outfit":
				t.push(`get ${his} tailored teddy up over ${his} buttocks, not without risking the seams. ${He}'s got it`);
				break;
			case "slutty jewelry":
				t.push(`get a couple of the light golden chains of ${his} bangles up and over ${his} buttocks. ${He}'s got them`);
				break;
			case "attractive lingerie for a pregnant woman":
			case "kitty lingerie":
				t.push(`pull ${his} pretty silk panties up over ${his} buttocks, not without tearing it. ${He}'s got it`);
				break;
			case "a maternity dress":
				t.push(`pull ${his} maternity dress up over ${his} buttocks; it was made to stretch, but not in this direction. ${He}'s got it`);
				break;
			case "spats and a tank top":
				t.push(`get ${his} spats up over ${his} buttocks, not without tearing the fabric. ${He}'s got them`);
				break;
			case "striped panties":
				t.push(`get ${his} panties up over ${his} buttocks, not without tearing the fabric. ${He}'s got them`);
				break;
			case "stretch pants and a crop-top":
				t.push(`pull ${his} stretch pants up over ${his} buttocks; they may have been made to stretch, but are completely overwhelmed by ${his} ass. ${He}'s got it`);
				break;
			case "a scalemail bikini":
				t.push(`pull ${his} scalemail bikini bottom up over ${his} buttocks, not without risking a nasty cut from the material. ${He}'s got it`);
				break;
			case "a monokini":
				t.push(`pull ${his} monokini up over ${his} buttocks, let alone to where ${he} needs it to be to put on the shoulder straps. ${He}'s got it`);
				break;
			case "a burkini":
				t.push(`pull ${his} burkini up over ${his} buttocks, making the modest swimsuit seem anything but. ${He}'s got it`);
				break;
			case "a bimbo outfit":
				t.push(`pull ${his} outfit's miniskirt up over ${his} buttocks, at least not while having to stop and dig ${his} thong out of ${his} crack after every try. ${He}'s got it`);
				break;
			case "a ball gown":
			case "an evening dress":
				t.push(`pull ${his} dress up over ${his} buttocks, not without ruining the garment. ${He}'s got them`);
				break;
			default:
				t.push(`get ${his} outfit pulled up over ${his} buttocks. ${He}'s got it`);
				break;
		}
		t.push(`up to the tops of ${his} thighs, but that's all ${he} can manage. The wardrobe includes many sizes of all the outfits, and ${he}'ll have to switch out for a bigger one. Sighing, ${he} turns back towards the racks and starts trying to struggle free. As ${he} does, ${he} notices you, and realizes you can see ${his} contortions and the resulting ass jiggling.`);
		if (canTalk(eventSlave)) {
			t.push(`"Hi ${Master}," ${he} greets you`);
		} else {
			t.push(`${He} frees up a hand and uses gestures to greet you`);
		}
		if ((eventSlave.fetishKnown === 1) && (eventSlave.fetish === "buttslut")) {
			t.push(`flirtatiously. Deciding to be even more blatant, the shameless buttslut turns back around and keeps struggling, obviously making no attempt to actually solve ${his} situation and even managing to accidentally on purpose pull ${his} huge buttocks apart, giving you a clear view of ${his} ready asshole.`);
		} else if (eventSlave.energy > 80) {
			t.push(`flirtatiously. ${He}'s a needy slut and wants it constantly, so ${he} turns back around and keeps struggling, obviously making no attempt to actually solve ${his} situation.`);
		} else if (eventSlave.trust > 20) {
			t.push(`trustingly. ${He}'s thoroughly accustomed to the idea of your eyes on ${his} big bare butt, so ${he} goes back to ${his} efforts, which bounce ${his} behind deliciously.`);
		} else {
			t.push(`fearfully. ${He} doesn't want to make a fool of ${himself}, or damage anything by hurrying, and ${he} blushes dreadfully as ${he} keeps working at it.`);
		}
		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Help ${him}`, help),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Fuck ${him}`, fuck, fuckNote())
				: new App.Events.Result(),
		]);

		function help() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave);

			t = [];
			t.push(`Deciding to help ${him}, you head over and grab a handful of each of ${his} asscheeks, hefting ${him}`);
			t.push(eventSlave.buttImplant / eventSlave.butt >= 0.5 ? "unnaturally taut" : "soft");
			t.push(`masses of feminine assflesh upward and out of the constricting clothing.`);
			if (((eventSlave.fetishKnown === 1) && (eventSlave.fetish === "buttslut")) || (eventSlave.energy > 80)) {
				t.push(`${He}'s a little disappointed when ${he} realizes that you're just being helpful, instead of getting ready to stick`);
				t.push(V.PC.dick !== 0 ? "your dick" : "something");
				t.push(`inside ${him}, but ${he} thanks you properly once ${he}'s free. Clearly unwilling to leave it at just that, ${he} gives you quite a show as ${he} gets into the next size up, making sure to bounce ${his} ass for you and keeping ${his}`);
				if (!canDoVaginal(eventSlave)) {
					t.push(`ass`);
				}
				t.push(`pussy visible for longer than is strictly necessary. <span class="mediumaquamarine">${He} trusts you'll fuck ${him} some other time,</span> and is even a little happy that you're willing to lend ${him} a helping hand outside of sex.`);
			} else if (eventSlave.trust > 20) {
				t.push(`${He} feels the familiar grip of your`);
				t.push(V.PC.title === 1 ? "strong" : "feminine");
				t.push(`hands without surprise or resentment, and relaxes trustingly as you manipulate ${his} bottom. Realizing that you're helping ${him}, ${he} quickly slides the offending item down ${his}`);
				t.push(hasBothLegs(eventSlave) ? "thighs" : "thigh");
				t.push(`and off ${himself}, and then thanks you properly. ${He} smiles at you as ${he} puts on the next size up, clearly pleased that you'd <span class="mediumaquamarine">assist ${him} with a trivial thing</span> outside of ${his} direct duties as a sex slave.`);
			} else {
				t.push(`${He} stiffens at the feeling of your hands on ${his} bottom, not sure whether you're about to ram`);
				t.push(V.PC.dick !== 0 ? "your dick" : "something");
				t.push(`up ${his} defenseless asshole. You feel the muscles down there tense a little through the softness of the lower part of ${his} buttocks. That's not what you're planning, though, and eventually ${he} realizes that you mean to help. ${He} thanks you hesitantly before bending to slide the offending clothing down ${his}`);
				t.push(hasBothLegs(eventSlave) ? "thighs." : "thigh.");
				t.push(`Nervously, ${he} thanks you again after ${he}'s free, unsure of ${himself} but <span class="mediumaquamarine">impressed that you'd help ${him} with a little thing like that.</span>`);
			}
			eventSlave.trust += 5;
			return t;
		}
		function fuck() {
			t = [];
			t.push(`Finding the situation simply too good to pass up, you wait until ${he}'s not`);
			t.push(canSee(eventSlave) ? "looking at" : "paying attention to");
			t.push(`you, and then approach ${him} from behind.`);
			if ((eventSlave.fetishKnown === 1) && (eventSlave.fetish === "buttslut") && canDoAnal(eventSlave)) {
				t.push(`${He} gasps wantonly as ${he} feels the familiar sensation of`);
				t.push(V.PC.dick !== 0 ? "your dick" : "a strap-on");
				t.push(`infiltrating between ${his} cheeks and towards ${his}`);
				if (eventSlave.anus >= 3) {
					t.push(`loose`);
				} else if (eventSlave.anus >= 2) {
					t.push(`relaxed`);
				} else {
					t.push(`tight little`);
				}
				t.push(`anus. ${He} releases ${his} grip on the constricting clothing that's binding ${his} thighs together and grinds ${his} ass back against you, making sure every`);
				t.push(V.showInches === 2 ? "inch" : "centimeter");
				t.push(`of your`);
				t.push(V.PC.dick !== 0 ? "hard member" : "phallus");
				t.push(`that will fit gets inside ${his} asshole. Some time later, the hard pounding dislodges the clothing and it slides down ${his}`);
				t.push(hasBothLegs(eventSlave) ? "legs" : "leg");
				t.push(`to gather around ${his}`);
				t.push(hasBothLegs(eventSlave) ? "ankles." : "ankle.");
				t.push(`<span class="hotpink">${He} doesn't notice.</span>`);
				t.push(VCheck.Anal(eventSlave, 1));
			} else if (eventSlave.energy > 80) {
				t.push(`${He}'s so horny that ${he} doesn't need any foreplay. Nor does ${he} get any. You grab ${his} hips and smack your`);
				t.push(V.PC.dick !== 0 ? "dick" : "strap-on");
				t.push(`against ${his} jiggling buttocks a couple of times, making ${his} bounce with eagerness and frustration at the anticipation of imminent sexual release. Exercising mercy, you pull ${his} ass back against you and maneuver`);
				t.push(V.PC.dick !== 0 ? "yourself" : "your instrument");
				t.push(`inside ${him}, enjoying ${his} shiver at the <span class="hotpink">satisfaction of ${his} hopes.</span> The constricting clothes pin ${his} legs together, and you hold ${his} arms against ${his} sides, keeping ${his} back pressed against your`);
				if (V.PC.belly > 1500) {
					t.push(`pregnancy`);
				} else if (V.PC.boobs >= 300) {
					if (V.PC.boobsImplant !== 0) {
						t.push(`fake`);
					}
					t.push(`breasts`);
				} else if (V.PC.title === 0) {
					t.push(`flat chest`);
				} else {
					t.push(`muscular chest`);
				}
				t.push(`as you take ${him}.`);
				t.push(canDoVaginal(eventSlave) ? VCheck.Vaginal(eventSlave, 1) : VCheck.Anal(eventSlave, 1));
			} else if (eventSlave.trust > 20) {
				t.push(`${He} relaxes submissively when ${he} feels you take hold of ${his} huge ass and slide your`);
				t.push(V.PC.dick !== 0 ? "dick" : "strap-on");
				t.push(`between ${his} asscheeks and then inside ${his}`);
				t.push(canDoVaginal(eventSlave) ? "pussy." : "anus.");
				t.push(`${His} legs are already in effect bound by the constricting clothing that's still holding them together, and you enhance the effect by taking hold of ${his} wrists and hugging ${him} from behind as you fuck ${him}, holding ${his}`);
				t.push(hasBothLegs(eventSlave) ? "arms crossed" : "arm");
				t.push(`across ${his}`);
				if (eventSlave.boobs > 2000) {
					t.push(`massive breasts.`);
				} else if (eventSlave.boobs > 300) {
					t.push(`boobs.`);
				} else {
					t.push(`chest.`);
				}
				t.push(`Helpless in your embrace, ${he} <span class="hotpink">relaxes completely and lets it happen.</span>`);
				t.push(canDoVaginal(eventSlave) ? VCheck.Vaginal(eventSlave, 1) : VCheck.Anal(eventSlave, 1));
			} else {
				t.push(`${He} stiffens fearfully when ${he} feels you take hold of ${his} huge ass, but ${he} knows not to resist. ${He} stays still as you slide your`);
				t.push(V.PC.dick !== 0 ? "dick" : "strap-on");
				t.push(`between ${his} asscheeks and then inside ${his}`);
				t.push(canDoVaginal(eventSlave) ? "pussy," : "anus");
				t.push(`trying to angle ${his} hips to make the standing penetration less uncomfortable. The clothing binds ${his} legs together, reducing ${him} to simply sticking ${his} butt out as best ${he} can to ease the stroking of your`);
				t.push(V.PC.dick !== 0 ? "cock," : "phallus,");
				t.push(`invading ${his} helpless`);
				if (canDoVaginal(eventSlave)) {
					t.push("cunt.");
					t.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					t.push("asshole.");
					t.push(VCheck.Anal(eventSlave, 1));
				}
				t.push(`When you're done, you extract yourself and stalk off, leaving ${him} to struggle free`);
				if (V.PC.dick !== 0) {
					t.push(`and try to keep the cum dripping out of ${him} off ${his} clothing`);
				}
				t.push(t.pop() + ".");
				t.push(`${He} stumbles back to fetch the right size, <span class="hotpink">thoroughly fucked.</span>`);
			}
			eventSlave.devotion += 5;
			return t;
		}

		function fuckNote() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}
	}
};
