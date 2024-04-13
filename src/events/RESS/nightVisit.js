App.Events.RESSNightVisit = class RESSNightVisit extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canMove,
				s => s.rules.speech !== "restrictive",
				s => s.rules.release.master === 1,
				s => s.devotion >= -20,
				s => s.trust >= -20,
				s => s.energy > 75,
				s => ((canDoVaginal(s) && s.vagina > 0) || (canDoAnal(s) && s.anus > 0))
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave);
		node.appendChild(artDiv);

		let r = [];
		r.push(`As you are retiring for the night,`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		if (!canWalk(eventSlave)) {
			if (eventSlave.rules.mobility === "permissive") {
				r.push(`hobbles`);
			} else {
				r.push(`crawls`);
			}
		} else if (shoeHeelCategory(eventSlave) > 1) {
			r.push(`totters`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`waddles`);
		} else {
			r.push(`walks`);
		}
		r.push(`into your bedroom and ${canStand(eventSlave) ? "stands" : "settles"} before you submissively. Since ${he}'s allowed to ask questions,`);
		if (!canTalk(eventSlave)) {
			r.push(`${he} begs you with gestures to have sex with ${him}.`);
		} else {
			if (eventSlave.lips > 70) {
				r.push(`${he} says meekly through ${his} massive dick-sucking lips,`);
			} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
				r.push(`${he} says meekly through ${his} inconvenient oral piercings,`);
			} else {
				r.push(`${he} says meekly,`);
			}
			r.push(Spoken(eventSlave, `"${capFirstChar(Master)}, would you please fuck me?"`));
		}

		App.Events.addParagraph(node, r);
		let choices = [];
		if (canDoVaginal(eventSlave) || canDoAnal(eventSlave)){
			choices.push(new App.Events.Result(`Fuck ${him} as ${he} asks`, fuck, (eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) ? `This option will take ${his} virginity` : null));
			if (canDoVaginal(eventSlave)) {
				choices.push(new App.Events.Result(`Rape ${him}`, rape, (eventSlave.vagina === 0) ? `This option will take ${his} virginity` : null));
			}
			if (canDoAnal(eventSlave)) {
				choices.push(new App.Events.Result(`Assrape ${him}`, assrape, (eventSlave.anus === 0) ? `This option will take ${his} anal virginity` : null));
			}
		}
		choices.push(new App.Events.Result(`Play with ${him}`, play, (eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) ? `This option will take ${his} virginity` : null));
		choices.push(new App.Events.Result(`Send ${him} away`, away));
		App.Events.addResponses(node, choices);

		function fuck(){
			r = [];
			r.push(`${He} almost sobs with joy as`);
			if (V.PC.dick === 0) {
				r.push(`your strap-on enters`);
			} else {
				r.push(`you enter`);
			}
			r.push(`${him}. The two of you have`);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`passionate oral, vanilla, and finally anal sex`);
			} else if (canDoVaginal(eventSlave)) {
				r.push(`gentle vanilla sex`);
			} else {
				r.push(`gentle anal sex`);
			}
			r.push(`for the rest of the`);
			if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
				r.push(`night; whenever you go soft for a moment, all ${he} has to do is eat you out, and you're rock hard again`);
			} else {
				r.push(`night.`);
			}
			r.push(`As you move from position to position,`);
			if (eventSlave.belly >= 5000) {
				r.push(`and exploring several unusual ones thanks to ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy,`);
				} else {
					r.push(`belly,`);
				}
			}
			r.push(`${he} twists to face you whenever ${he} can. When ${he} manages it, ${he} kisses you when ${he} can reach your lips, and ${he}`);
			if (canSee(eventSlave)) {
				r.push(`stares deeply into your eyes`);
			} else {
				r.push(`meets your face with ${his} own`);
			}
			r.push(`when ${he} cannot. ${His} trust in you <span class="trust inc">has increased.</span>`);
			eventSlave.trust += 4;
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(VCheck.Both(eventSlave, 6));
			} else if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 4));
			} else {
				r.push(VCheck.Anal(eventSlave, 4));
			}
			seX(eventSlave, "oral", V.PC, "penetrative", 3);
			return r;
		}

		function rape() {
			r = [];
			r.push(`You order ${him} to kneel. ${He} looks hopeful and complies, but ${his} anticipation of enjoyable sex vanishes with a pathetic little gasp when you`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`shove ${him} to the floor. With nothing more than the arousal ${he} came in with, you brutally rape ${him}, fucking ${his}`);
			if (V.seeRace === 1) {
				r.push(eventSlave.race);
			}
			r.push(`pussy to the limit of what you can get away with without damaging ${him}.`);
			if (((eventSlave.fetish === Fetish.SUBMISSIVE && (eventSlave.fetishStrength > 60 || eventSlave.energy > 95))) && (eventSlave.fetishKnown === 1)) {	// TODO: .energy should behave differently
				r.push(`${He}'s such a submissive that after a while pleasure overwhelms pain to the extent that ${he} manages a <span class="devotion inc">sobbing orgasm.</span>`);
			} else {
				r.push(`${He} gets the message: ${he}'s your property and ${his} desires are entirely subject to your will. ${His} <span class="devotion inc">submission</span> to you and <span class="trust dec">fear of you</span> have both increased.`);
				eventSlave.trust -= 3;
			}
			eventSlave.devotion += 3;
			r.push(VCheck.Vaginal(eventSlave, 1));
			return r;
		}

		function assrape() {
			r = [];
			r.push(`You order ${him} to kneel. ${He} looks hopeful and complies, but ${his} anticipation of enjoyable sex vanishes with a pathetic little gasp when you`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			if (V.PC.vagina !== -1) {
				r.push(`use a couple of fingers to collect some of your pussyjuice for improvised lube.`);
			} else {
				r.push(`spit on ${his} butthole.`);
			}
			r.push(`With only a little saliva as lubrication, you brutally sodomize ${him}, fucking ${his}`);
			if (V.seeRace === 1) {
				r.push(eventSlave.race);
			}
			r.push(`ass to the limit of what you can get away with without damaging ${him}.`);
			if (((eventSlave.fetish === "buttslut" && eventSlave.fetishStrength > 60) || (eventSlave.energy > 95)) && (eventSlave.fetishKnown === 1)) {
				r.push(`${He} loves anal so much that after a while pleasure overwhelms pain to the extent that ${he} manages a <span class="devotion inc">sobbing orgasm.</span>`);
			} else {
				r.push(`${He} gets the message: ${he}'s your property and ${his} desires are entirely subject to your will. ${His} <span class="devotion inc">submission</span> to you and <span class="trust dec">fear of you</span> have both increased.`);
				eventSlave.trust -= 3;
			}
			eventSlave.devotion += 3;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function play() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "no clothing");

			r = [];
			if (canSee(eventSlave)) {
				r.push(`You get into bed and crook a finger, silently`);
			} else if (canHear(eventSlave)) {
				r.push(`You get into bed and growl sexually,`);
			} else {
				r.push(`You pull ${him} towards your bed and collapse onto it,`);
			}
			r.push(`ordering ${him} to join you. ${He}`);
			if (App.Data.clothes.get(eventSlave.clothes).exposure <= 3) {
				r.push(`hurries out of ${his} clothes and`);
			}
			r.push(`bounces over,`);
			if (eventSlave.chastityPenis === 1) {
				r.push(`${his} posture communicating the arousal that ${his} caged cock cannot.`);
			} else if (eventSlave.dick > 0 && eventSlave.hormoneBalance >= 100) {
				r.push(`${his} impotent dick already streaming watery precum.`);
			} else if (eventSlave.dick > 0 && eventSlave.balls === 0) {
				r.push(`${his} dick pathetically soft despite ${his} obvious arousal.`);
			} else if (eventSlave.dick > maxErectionSize(eventSlave) && !canAchieveErection(eventSlave)) {
				r.push(`${his} dick swollen with arousal yet too large to become erect.`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`${his} dick tipped with precum yet enable to get hard.`);
			} else if (eventSlave.dick > 4) {
				r.push(`${his} massive cock rock hard.`);
			} else if (eventSlave.dick > 2) {
				r.push(`${his} erection standing out stiffly.`);
			} else if (eventSlave.dick > 0) {
				r.push(`${his} tiny little dick poking out stiffly.`);
			} else if (eventSlave.clit > 0) {
				r.push(`${his} big clit visibly stiff.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`already arching ${his} back to present ${his} bottom.`);
			} else {
				r.push(`${his} pussylips shining with arousal.`);
			}
			r.push(`As ${he}`);
			if (eventSlave.belly >= 10000 || eventSlave.weight > 130) {
				r.push(`hefts ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				}
				r.push(`bulk`);
			} else {
				r.push(`climbs`);
			}
			r.push(`into bed you take ${his} ${eventSlave.skin} ${hasAnyArms(eventSlave) ? "hand" : "hips"} and guide ${him}`);
			if (V.PC.belly >= 10000 || V.PC.dick.isBetween(0, 3)) {
				r.push(`rear up and face down so you may mount ${him}.`);
			} else {
				r.push(`into your lap, facing away from you.`);
			}
			r.push(`${He} sighs happily and snuggles ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				r.push(`soft`);
			} else if (eventSlave.muscles > 95) {
				r.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				r.push(`muscular`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`soft`);
			}
			r.push(`back`);
			if (V.PC.belly >= 10000) {
				r.push(`against the underside of your belly.`);
			} else {
				r.push(`into your chest.`);
			}
			r.push(`You`);
			if (eventSlave.belly >= 5000) {
				r.push(`embrace ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly before you`);
			} else if (eventSlave.weight > 95) {
				r.push(`embrace ${his} plush body before you`);
			}
			if (eventSlave.boobs > 2000) {
				r.push(`run your hands across ${his} massive chest`);
			} else if (eventSlave.boobs > 800) {
				r.push(`heft ${his} heavy breasts`);
			} else {
				r.push(`massage ${his} pretty chest`);
			}
			r.push(`and tease ${his}`);
			if (eventSlave.nipples === "huge") {
				r.push(`ridiculous`);
			} else if (eventSlave.nipples === "flat") {
				r.push(`fat`);
			} else if (eventSlave.nipples === "puffy") {
				r.push(`puffy`);
			} else if (eventSlave.nipples === "inverted") {
				r.push(`shy`);
			} else if (eventSlave.nipples === "partially inverted") {
				r.push(`exposed`);
			} else if (eventSlave.nipples === "fuckable") {
				r.push(`deep`);
			} else {
				r.push(`erect`);
			}
			r.push(`nipples, as ${he} shimmies ${himself} back`);
			if (V.PC.dick === 0) {
				r.push(`so ${his} warmth is against yours, your legs spreading ${his}`);
			} else {
				r.push(`onto you so your cock is lodged between ${his}`);
			}
			if (eventSlave.butt > 10) {
				r.push(`unfathomable`);
			} else if (eventSlave.butt > 5) {
				r.push(`incredible`);
			} else if (eventSlave.butt > 2) {
				r.push(`healthy`);
			} else {
				r.push(`pert`);
			}
			r.push(`buttocks. When ${he}'s close to orgasm from all the stimulation, ${he} reflexively squeezes`);
			if (V.PC.dick === 0) {
				r.push(`your body between ${his} legs,`);
			} else {
				r.push(`your dick between ${his} asscheeks,`);
			}
			r.push(`bringing you to climax. At the feeling of your`);
			if (V.PC.dick === 0) {
				r.push(`juices`);
			} else {
				r.push(`warm cum`);
			}
			r.push(`between ${his}`);
			if (eventSlave.weight > 190) {
				r.push(`immense`);
			} else if (eventSlave.weight > 160) {
				r.push(`massive`);
			} else if (eventSlave.weight > 130) {
				r.push(`huge`);
			} else if (eventSlave.weight > 95) {
				r.push(`thick`);
			} else if (eventSlave.weight > 10) {
				r.push(`ample`);
			} else if (eventSlave.weight >= -10) {
				r.push(`trim`);
			}
			r.push(`thighs, ${he} tips over the edge and`);
			if (eventSlave.chastityPenis === 1) {
				r.push(`shivers with orgasm, ejaculate dribbling out of ${his} chastity cage.`);
			} else if (eventSlave.dick > 0 && eventSlave.hormoneBalance >= 100) {
				r.push(`cums weakly, ${his} soft dick twitching.`);
			} else if (eventSlave.dick > 0 && (eventSlave.balls === 0 || eventSlave.ballType === "sterile")) {
				r.push(`shivers with orgasm, ${his} soft dick twitching weakly.`);
			} else if (eventSlave.balls > 4) {
				r.push(`making a massive mess all over ${himself}.`);
			} else if (eventSlave.balls > 2) {
				r.push(`adding ${his} own load to the mess.`);
			} else if (eventSlave.balls > 0) {
				r.push(`adding ${his} own pathetic load to the mess.`);
			} else if (eventSlave.clit > 0) {
				r.push(`pitches forward convulsively, gasping with overstimulation at the sensation on ${his} huge clit.`);
			} else {
				r.push(`quivers in your grasp, gasping, before relaxing back into you in a puddle of satisfaction.`);
			}
			r.push(`${His} devotion to you <span class="devotion inc">has increased.</span>`);
			eventSlave.devotion += 4;
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave));
			} else {
				r.push(VCheck.Anal(eventSlave));
			}
			return r;
		}

		function away() {
			eventSlave.devotion += 4;
			return `${He} tries to hide ${his} disappointment as ${he} turns to go, and as ${he} flees out the door you hear ${him} begin to cry. By the next morning, however, ${his} responses to your commands have become less flirtatious and much more attentive. ${His} obedience to you <span class="devotion inc">has increased.</span>`;
		}
	}
};
