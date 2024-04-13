App.Events.RESSArcadeSadist = class RESSArcadeSadist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Entity.facilities.arcade.established,
			() => App.Entity.facilities.arcade.hasEmployees,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish === "sadist",
				s => s.fetishStrength > 20,
				s => s.fetishKnown === 1,
				hasAnyArms,
				canMove,
				canTalk,
				canHear,
				s => s.devotion > 50,
				s => s.trust >= -20,
				s => s.belly < 300000,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const hasSight = canSee(eventSlave);

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave);
		node.appendChild(artDiv);

		let r = [];
		r.push(`You happen to come across`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`during one of ${his} rest periods. ${He}'s lying on a couch in the slave areas,`);
		if (canSee(eventSlave)) {
			r.push(`staring at the ceiling above ${him}`);
		} else {
			r.push(`leaning back`);
		}
		r.push(`with a dreamy expression on ${his} face. ${He}'s`);
		if (eventSlave.rules.release.masturbation === 1) {
			r.push(`touching ${himself} idly.`);
		} else {
			r.push(`not allowed to touch ${himself}, but ${he}'s extremely aroused.`);
		}
		r.push(`Whatever's on ${his} mind, it's so absorbing that ${he} doesn't realize you're there until you're standing over ${him}.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(Spoken(eventSlave, `"Sorry, ${Master},"`), `he ${say}s apologetically,`);
		if (eventSlave.belly >= 10000 || eventSlave.weight > 160) {
			r.push(`struggling`);
		} else {
			r.push(`scrambling`);
		}
		r.push(`to ${his} feet.`);
		r.push(Spoken(eventSlave, `"I didn't notice you there."`));
		if (canSee(eventSlave)) {
			r.push(`Seeing your questioning look,`);
		} else {
			r.push(`Hearing your lack of response,`);
		}
		r.push(`${he} explains ${himself} further.`);
		r.push(Spoken(eventSlave, `"I was just thinking about, um, my favorite place. I can almost get off just by thinking about it."`));
		r.push(`There's a wild, perverted gleam`);
		if (canSee(eventSlave)) {
			r.push(`in ${his} ${App.Desc.eyesColor(eventSlave)}.`);
		} else {
			r.push(`on ${his} face.`);
		}
		r.push(`${He}'s a confirmed sadist, so whatever ${his} favorite mental masturbation is probably quite strong.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Ask ${him} about ${his} fantasy`, fantasy),
			new App.Events.Result(`Just fuck ${him}`, fuck),
		]);

		function fantasy() {
			const frag = document.createDocumentFragment();
			r = [];

			const {hisU, heU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

			r.push(`You order ${him} to explain further.`);
			r.push(Spoken(eventSlave, `"${Master},"`), `${he} ${say}s carefully,`, Spoken(eventSlave, `"it's ${V.arcadeName}. There's a specific place there, and, well, I can't describe it. It's in the service area under ${V.arcadeName}. Can I show you what I mean?"`));
			r.push(`Intrigued, you order ${him} to show you the place ${he}'s talking about, and lead ${him} to ${V.arcadeName} through the access hallway. ${He} points to the service tunnel under one of the rows of inmates, which allows trusted slaves to clean up and perform maintenance.`);
			if (eventSlave.belly >= 100000 || eventSlave.weight > 160) {
				r.push(`Once you've managed to shove the massive slut`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`Once you've helped the`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				} else {
					r.push(`bloated`);
				}
				r.push(`${girl} fit`);
			} else {
				r.push(`Once you've led ${him}`);
			}
			r.push(`in there, ${he} stops and ${hasSight ? 'watches' : 'listens'}`);
			if (V.PC.belly >= 100000 || V.PC.weight > 130) {
				r.push(r.pop() + `as you struggle to join ${him} in the increasingly cramped space.`);
			} else if (V.PC.belly >= 5000) {
				r.push(r.pop() + `as you gently slip your motherly body in after ${him}.`);
			} else {
				r.push(r.pop() + ".");
			}
			r.push(`Inside the industrial access corridor, above you both, is a row of bodies. The slaves' faces and hips are pressed against the apertures that present their holes to customers, but the rest of them is visible from here.`);
			App.Events.addParagraph(frag, r);
			r = [];

			r.push(`There is little noise; the slaves are closely restrained. Indeed, you have to look closely to see that they're being fucked at all. Here and there, though, there are signs. When someone fucks a slave's face, ${hisU} throat bulges, and ${heU} often gags and struggles a little within the restraints. When their`);
			if (App.Entity.facilities.arcade.employees().some(s => s.vagina > 0)) {
				r.push(`pussies`);
			} else {
				r.push(`assholes`);
			}
			r.push(`get fucked, there's also some involuntary struggling, and if the phallus being thrust into them is particularly large, a rhythmic bulging of their abdomens can be discerned.`);
			if (V.arcadeUpgradeInjectors === 1) {
				r.push(`The bodies frequently jerk as electrostimulation is applied to force them to tighten their holes.`);
			} else if (V.arcadeUpgradeInjectors === 2) {
				r.push(`The quiet hissing of the drug injectors adds a menacing undertone, and the bodies frequently jerk as electrostimulation is applied to force them to tighten their holes.`);
			}
			if (V.arcadeUpgradeCollectors === 1) {
				r.push(`The pumping collectors attached to the slaves' breasts`);
				if (App.Entity.facilities.arcade.employees().some(s => s.dick > 0)) {
					r.push(`and cocks`);
				}
				r.push(`carry the white fluid away to be processed elsewhere.`);
			}
			r.push(`The overall effect is subtle, but powerful. There's a sense of total servitude, overlaid with a certain feeling, or perhaps even a scent, of mindless despair. There's no wonder ${eventSlave.slaveName} likes it; there's an infinite supply of uncomplicated human anguish here.`);

			App.Events.addParagraph(frag, r);
			App.Events.addResponses(frag, [ // TODO: Why the fuck are you crawling around random access shafts?
				(V.PC.belly < 5000 && eventSlave.belly < 5000)
					? new App.Events.Result(`Fuck ${him} here`, here)
					: new App.Events.Result(null, null, `Fucking ${him} here would be interesting; unfortunately, there just isn't enough room for two mothers-to-be.`),
				new App.Events.Result(`Teach ${him} about true sadism`, truShit),
			]);
			return frag;

			function here() {
				r = [];

				r.push(`You reach out for ${eventSlave.slaveName}, not taking your eyes off the mesmerizing sight above. ${He}'s enjoying the spectacle too, and is so aroused that your rough handling of ${his} breasts almost brings ${him} to an immediate orgasm.`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`Pinching`);
				} else {
					r.push(`Hooking`);
				}
				r.push(`${his} ${eventSlave.nipples} nipples to stop ${him} from getting off too soon, you`);
				if (V.PC.dick === 0) {
					r.push(`hug ${him} to your chest and start playing with ${his}`);
					if (canDoVaginal(eventSlave)) {
						r.push(`pussy,`);
						seX(eventSlave, "vaginal", V.PC, "penetrative");
					} else if (eventSlave.dick > 0 && eventSlave.chastityPenis === 0) {
						r.push(`dick,`);
					} else {
						r.push(`body,`);
					}
					r.push(`commanding ${him} to reach around and do the same for you.`);
					seX(V.PC, "vaginal", eventSlave, "penetrative");
				} else if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
					r.push(`pull ${him} up to the right height and slide your dick inside ${him}, keeping both of you on your feet so you can take ${him} standing.`);
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
					r.push(`shove your cock roughly up ${his} asshole, letting ${him} struggle a little as ${he} finds the right angle to take standing anal here.`);
					r.push(VCheck.Anal(eventSlave, 1));
				} else {
					r.push(`slide your stiff prick up between the virgin's thighs for some intercrural sex.`);
				}
				if (eventSlave.belly >= 5000 || V.PC.belly >= 5000 || V.PC.weight > 160 || V.PC.boobs > 40000 || V.PC.butt > 10 || eventSlave.weight > 160 || eventSlave.boobs > 40000 || eventSlave.butt > 10) {
					r.push(`As you fuck in the cramped corridor, ${his}`);
				} else {
					r.push(`As you fuck, ${his}`);
				}
				if (canSee(eventSlave)) {
					r.push(`gaze flicks up and down along the row`);
				} else {
					r.push(`ears perk up at the subtle sounds`);
				}
				r.push(`of suffering bodies. ${He} climaxes again and again, shuddering at each new subtle sign that another one of the slaves here is being degraded by yet another cock inserted into yet another of ${hisU} defenseless holes. By the time you're satisfied, ${he}'s so exhausted that ${his} legs are trembling uncontrollably as ${he} struggles to remain standing with you. You drop ${him}, leaving ${him} to find ${his} own way out of this place. You look back from the entrance, seeing that ${he}'s`);
				if (canWalk(eventSlave)) {
					r.push(`following you on shaky legs,`);
				} else {
					r.push(`steadily pushing ${himself} along,`);
				}
				r.push(`${hasSight ? 'staring at' : 'facing'} you with a profound look of mixed <span class="trust inc">trust for your understanding of ${his} horrible sadism,</span> and deep unease that this is what truly gets ${him} off.`);
				eventSlave.trust += 5;
				return r;
			}

			function truShit() {
				r = [];
				const randomArcadeSlave = App.Entity.facilities.arcade.employees().random();
				const {he2, His2, his2} = getPronouns(randomArcadeSlave).appendSuffix("2");
				// replace slave art
				$(artDiv).empty();
				App.Events.drawEventArt(artDiv, [eventSlave, randomArcadeSlave], [eventSlave.clothes, "no clothing"]);

				r.push(`${He} seems to be focusing on the purely physical aspects of the degradation here. The true meaning of this place is so much more, and you decide to share it with ${him}. You call ${his} name, tearing ${his} attention away from the spectacle mere`);
				r.push(`${V.showInches === 2 ? 'inches' : 'centimeters'} over your heads, and ${hasSight ? 'point' : `direct ${him}`}`);
				r.push(`to a particular slave. You tell ${eventSlave.slaveName} that this particular Arcade inmate's name is ${SlaveFullName(randomArcadeSlave)}.`);
				if (randomArcadeSlave.career !== "a slave") {
					r.push(`You tell ${him} that ${he2} is ${randomArcadeSlave.actualAge} years old, that ${he2} is ${randomArcadeSlave.nationality}, and that ${he2} was once ${convertCareer(randomArcadeSlave)}.`);
				} else {
					r.push(`You tell ${him} that ${he2} is ${randomArcadeSlave.actualAge} years old and ${randomArcadeSlave.nationality}.`);
				}
				r.push(`You list more details of ${his2} life before ${he2} was placed here to be fucked endlessly. ${eventSlave.slaveName}'s eyes widen as you recite the details of the prior life of this piece of human sexual equipment and the sheer weight of the intellectual sadism smashes into ${him}. Then the slave above you both jerks a little.`);
				if (eventSlave.dick === 0) {
					r.push(`There's no visible sign ${his2} pussy's being fucked, so it must be`);
				} else {
					r.push(`${His2} cock hardens involuntarily, indicating that it's`);
				}
				r.push(`going into ${his2} ass. You resume, mentioning that ${he2}'s been buttfucked ${randomArcadeSlave.counter.anal} times.`);
				r.push(`${eventSlave.slaveName} jerks suddenly,`);
				if (canAchieveErection(eventSlave)) {
					r.push(`shooting ${his} cum onto the floor.`);
				} else if (eventSlave.dick > 0) {
					r.push(`dribbling a little.`);
				} else if (eventSlave.vaginaLube > 0 || eventSlave.balls > 0) {
					r.push(`squirting onto the floor.`);
				} else {
					r.push(`orgasming.`);
				}
				r.push(`${He} came without being touched. ${He} ${hasSight ? 'stares at' : 'faces'}`);
				r.push(`the mess ${he} made just by being in the presence of the arcology's <span class="devotion inc">undisputed preeminent sadist;</span> ${he} shudders at the sheer gothic glory of it. ${He} has a new moment to think of when ${he} feels like <span class="fetish inc">indulging ${his} own sadism.</span>`);
				eventSlave.devotion += 5;
				eventSlave.fetishStrength = Math.clamp(eventSlave.fetishStrength + 10, 0, 100);
				return r;
			}
		}

		function fuck() {
			r = [];

			r.push(`You're not particularly interested in what ${he} dreams about when ${he} gets the chance, and you tell ${him} so. Whatever sadistic little fantasies ${he} keeps locked away to bring out when ${he}'s got a moment to satiate ${his} perversions is less interesting to you than the prospect of`);
			if (V.PC.dick === 0) {
				r.push(`${his} mouth on your cunt. So, you shove ${him} down to sit on the couch and straddle ${his} face, cutting off any further whimsies by pressing your wet pussy against ${his} lips. ${He} eats you out obediently, accepting`);
				seX(eventSlave, "oral", V.PC, "vaginal");
			} else if (canDoVaginal(eventSlave) && (eventSlave.vagina > 0)) {
				r.push(`giving it to ${him}. So, you shove ${him} down to sit on the couch, nudge ${his} legs apart, kneel between them, and pound ${his} pussy. You fuck ${him} so hard that ${he} doesn't have the attention for further whimsies, and ${he} accepts`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave) && (eventSlave.anus > 0)) {
				r.push(`fucking ${his} butt. So, you shove ${him} down to`);
				if (hasAnyLegs(eventSlave)) {
					r.push(`kneel`);
				} else {
					r.push(`get`);
				}
				r.push(`on the couch facing away from you, and ram your cock up ${his} asshole. You assfuck ${him} so hard that ${he} doesn't have the attention for further whimsies, and ${he} accepts`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`${him} sucking your dick. So, you shove ${him} down to sit on the couch and give ${him} your cock to keep ${his} mouth occupied, cutting off any further whimsies. ${He} blows you obediently, accepting`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			r.push(`the implicit message that <span class="devotion inc">${he}'s your slut</span> in the real world, whatever thoughts ${he} may find appealing in the privacy of ${his} own mind.`);
			eventSlave.devotion += 3;
			return r;
		}
	}
};
