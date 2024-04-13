App.Events.RESSShowerSlip = class RESSShowerSlip extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.belly < 5000,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.trust > 20,
				s => s.devotion > 50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl, woman
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;
		const strong = PC.title === 1 ? "strong" : "fit";

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`finishes ${his} morning shower and sleepily turns to dry off. ${He} slips a little on the moist bathroom floor, trips over ${his} own feet, and starts to stumble. ${His} fall is immediately arrested as ${he}'s caught by a pair of strong`,
		);
		if (PC.title === 0) {
			r.push(`yet feminine`);
		}
		r.push(`arms. Coming to rest against`);
		if (PC.boobs >= 1400 && PC.belly >= 10000) {
			r.push(`a pair of enormous`);
			if (PC.boobsImplant > 0) {
				r.push(`air bags`);
			} else {
				r.push(`pillowlike breasts`);
			}
			r.push(`and a hugely pregnant belly,`);
		} else if (PC.belly >= 10000) {
			r.push(`a hugely pregnant middle,`);
		} else if (PC.boobs >= 300) {
			r.push(`a pair of`);
			if (PC.boobsImplant === 0) {
				r.push(`soft`);
			} else {
				r.push(`firm`);
			}
			r.push(`breasts,`);
		} else if (PC.title === 0) {
			r.push(`a flat chest,`);
		} else {
			r.push(`a well-muscled chest,`);
		}
		r.push(`${he}`);
		if (canSee(eventSlave)) {
			r.push(`looks up to find ${himself} gazing into your eyes.`);
		} else {
			r.push(`feels ${his} savior and recognizes these features as yours.`);
		}
		if (!canTalk(eventSlave)) {
			r.push(`${He} mouths a surprised but genuine thank you.`);
		} else {
			r.push(
				Spoken(eventSlave, `"Thanks, ${Master},"`),
				`${he} murmurs, getting over ${his} surprise and relief.`
			);
		}

		r.toParagraph();

		r.push(`Opportunities for gallantry didn't use to fall into your lap like this, but with a harem of busy sex slaves living and working in close proximity, they're common. For ${his} part, ${eventSlave.slaveName} doesn't seem to mind acting out bad romantic comedy. ${He} shows no sign of getting back to ${his} own feet, and nuzzles ${his} ${eventSlave.skin} cheek against your`);
		if (PC.belly >= 10000) {
			r.push(`taut middle,`);
		} else if (PC.boobs >= 300) {
			r.push(`boob,`);
		} else if (PC.title === 0) {
			r.push(`cute nipple,`);
		} else {
			r.push(`chest,`);
		}
		if (canSee(eventSlave)) {
			r.push(`staring`);
		} else {
			r.push(`looking`);
		}
		r.push(`up at you coquettishly. Apparently worrying that ${his} sexual availability isn't obvious enough, ${he} catches ${his}`);
		if (eventSlave.lips > 40) {
			r.push(`enormous`);
		} else if (eventSlave.lips > 20) {
			r.push(`plush`);
		} else {
			r.push(`soft`);
		}
		r.push(`lower lip behind ${his} teeth and bats ${his} eyes at you.`);
		if (eventSlave.teeth === "straightening braces" || eventSlave.teeth === "cosmetic braces") {
			r.push(`${His} braces make the flirty gesture look amusingly innocent`);
			if (eventSlave.visualAge > 35) {
				r.push(`for such a mature ${woman}`);
			}
			r.addToLast(`.`);
		} else if (eventSlave.teeth === "pointy") {
			r.push(`Somehow ${he} manages to make this look cute despite ${his} carnivorously pointed teeth.`);
		} else if (eventSlave.teeth === "fangs") {
			r.push(`Somehow ${he} manages to make this look cute despite ${his} fangs.`);
		} else if (eventSlave.teeth === "fang") {
			r.push(`${His} lone fang makes the look more mischievous then ${he} intends.`);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Carry ${him} to where ${he} needs to go`, carry),
			((canDoAnal(eventSlave) || canDoVaginal(eventSlave)) && eventSlave.belly < 15000)
				? new App.Events.Result(`Scoop ${him} up and fuck ${him}`, scoop, virginityWarning())
				: new App.Events.Result(),
		]);

		function virginityWarning() {
			if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function carry() {
			let wasCarried = true;
			const r = new SpacedTextAccumulator();
			r.push(`You scoop ${him} up into a bridal carry. ${He}`);
			if (eventSlave.voice === 0) {
				r.push(`gasps, since ${he} can't squeal,`);
			} else {
				r.push(`squeals cutely,`);
			}
			r.push(`holding on for dear life, and keeps ${his} face nestled against ${his} ${getWrittenTitle(eventSlave)}.`);
			if (eventSlave.belly >= 300000) {
				if (eventSlave.bellyPreg > 3000) {
					r.push(`${His} ${belly} pregnancy`);
				} else {
					r.push(`${His} ${belly} belly`);
				}
				r.push(`makes holding ${him} extremely difficult, not including just how much it weighs, so you're forced to quickly return ${him} to ${his} feet.`);
				wasCarried = false;
			} else if (eventSlave.boobs > 40000) {
				r.push(`${His} expansive tits not only weigh ${him} down, but also keep you from holding ${him} up for long.`);
				wasCarried = false;
			} else if (eventSlave.weight > 160) {
				r.push(`${He}'s certainly an armful and a little too fat for you to hold for long.`);
				wasCarried = false;
			} else if (eventSlave.balls > 200) {
				r.push(`${His} tremendous balls serve as an imposing anchor, quickly forcing you to lower ${him} back to the ground.`);
				wasCarried = false;
			} else if (eventSlave.dick > 30) {
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`${His} hanging dick adds tremendously to ${his} weight and touches the floor, but you're ${strong} enough to carry ${him} some distance.`);
				} else {
					r.push(`${His} hanging dick adds tremendously to ${his} weight and touches the floor, preventing you from really carrying ${him} very far.`);
					wasCarried = false;
				}
			} else if (eventSlave.belly >= 100000) {
				if (eventSlave.bellyPreg > 3000) {
					if (FutureSocieties.isActive('FSPhysicalIdealist')) {
						r.push(`${His} pregnancy is truly gigantic, but you're ${strong} enough to carry ${him} some distance.`);
					} else {
						r.push(`${His} pregnancy is truly gigantic and a little too big for you to safely carry without the risk of dropping, quickly forcing you to lower ${him}.`);
						wasCarried = false;
					}
				} else {
					if (FutureSocieties.isActive('FSPhysicalIdealist')) {
						r.push(`${His} ${belly} belly is truly gigantic, but you're ${strong} enough to carry ${him} some distance.`);
					} else {
						r.push(`${His} ${belly} belly is truly an armful and a little to heavy for you to carry, quickly forcing you to lower ${him}.`);
						wasCarried = false;
					}
				}
			} else if (eventSlave.boobs > 25000) {
				r.push(`${His} enormous boobs`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`add tremendously to ${his} weight and are awkward to manage, but you're ${strong} enough to carry ${him} some distance.`);
				} else {
					r.push(`add tremendously to ${his} weight and are awkward to manage, quickly forcing you to lower ${him}.`);
					wasCarried = false;
				}
			} else if (eventSlave.weight > 130) {
				r.push(`${He}'s a`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`fatty, but you're ${strong} enough to carry ${him} some distance.`);
				} else {
					r.push(`fatty and a little too big and heavy for you to hold for long.`);
					wasCarried = false;
				}
			} else if (eventSlave.balls > 100) {
				r.push(`${His} enormous balls`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`add tremendously to ${his} weight and dangle ponderously, but you're ${strong} enough to carry ${him} some distance, even though you have to step awkwardly to avoid kneeing ${his} sensitive sack.`);
				} else {
					r.push(`add tremendously to ${his} weight and dangle ponderously, quickly forcing you to lower ${him} or risk accidentally kneeing the sensitive sack.`);
					wasCarried = false;
				}
			} else if (eventSlave.dick > 20) {
				r.push(`${His} dangling cock adds tremendously to ${his} weight and is awkward to walk with, but you're ${strong} enough to carry ${him} some distance.`);
			} else if (eventSlave.butt > 18) {
				r.push(`${His} expansive ass`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`adds tremendously to ${his} weight and is awkward to handle, but you're ${strong} enough to carry ${him} some distance.`);
				} else {
					r.push(`adds tremendously to ${his} weight and is awkward to handle, quickly forcing you to lower ${him}.`);
					wasCarried = false;
				}
			} else if (eventSlave.boobs > 8000) {
				r.push(`${His} boobs add tremendously to ${his} weight, but you're ${strong} enough to carry ${him} some distance.`);
			} else if (eventSlave.weight > 95) {
				r.push(`${He}'s got some extra weight on ${him}, but you're ${strong} enough to carry ${him} some distance.`);
			} else if (eventSlave.height > 180) {
				r.push(`${He}'s a big ${girl}, but you're ${strong} enough to carry ${him} some distance.`);
			} else if (eventSlave.weight > 30) {
				r.push(`${He}'s a chubby ${girl}, but you're ${strong} enough to carry ${him} some distance.`);
			} else if (eventSlave.bellyPreg >= 10000) {
				r.push(`${He}'s heavily pregnant, but you're ${strong} enough to carry ${him} some distance.`);
			} else if (eventSlave.bellyImplant >= 10000) {
				r.push(`${His} belly is greatly laden with inert filler, but you're ${strong} enough to carry ${him} some distance.`);
			} else if (eventSlave.bellyFluid >= 10000) {
				r.push(`${His} belly is greatly laden with ${eventSlave.inflationType}, but you're ${strong} enough to carry ${him} some distance.`);
			} else if (eventSlave.height > 160) {
				r.push(`${He}'s no little ${girl}, but you're ${strong} enough to carry ${him}.`);
			} else if (eventSlave.weight > 10) {
				r.push(`${He}'s got a deliciously plush body, but you're ${strong} enough to carry ${him}.`);
			} else {
				r.push(`You could carry the little slave like this as long as you like.`);
			}
			if (wasCarried) {
				r.push(`Knowing that ${he}'ll need to get dressed before the next part of ${his} day, you carry ${him} to`);
				if (eventSlave.rules.living === "luxurious") {
					r.push(`${his} room.`);
				} else {
					r.push(`the part of the common area with where clothes are kept.`);
				}
				r.push(`${He} remains perfectly limp, letting ${himself} be carried without a word. When you set ${him} on ${his} feet,`);
			} else {
				r.push(`Knowing that ${he}'ll need to get dressed before the next part of ${his} day, you help ${him} to`);
				if (eventSlave.rules.living === "luxurious") {
					r.push(`${his} room.`);
				} else {
					r.push(`the part of the common area with where clothes are kept.`);
				}
				r.push(`${He} lets you do most of the work, letting ${himself} be guided without a word. When you set ${him} on ${his} bed,`);
			}
			r.push(`there's a little unaccountable moisture in ${his} ${App.Desc.eyesColor(eventSlave)} <span class="trust inc">for some reason.</span> ${He} gives you a kiss and thanks you prettily.`);
			eventSlave.trust += 4;
			r.toParagraph();
			return r.container();
		}

		function scoop() {
			const r = new SpacedTextAccumulator();
			r.push(`You squat down, and ${he} plants ${his} feet, expecting to be given a swat on the bottom and sent on ${his} way. Instead, you run your hands down ${his}`);
			if (eventSlave.weight > 130) {
				r.push(`well-padded`);
			} else if (eventSlave.weight > 95) {
				r.push(`padded`);
			} else if (eventSlave.muscles > 30) {
				r.push(`heavily muscled`);
			} else if (eventSlave.weight > 30) {
				r.push(`chubby`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`soft`);
			}
			r.push(`thighs, producing a shiver from the ${SlaveTitle(eventSlave)}, and lift ${him} up against your chest, pinning ${him} there with your hands supporting the backs of ${his} knees. Giggling`);
			if (eventSlave.voice === 0) {
				r.push(`mutely`);
			}
			r.addToLast(`, ${he} finds ${himself} held in a fetal position with ${his} back pressed against your`);
			if (PC.boobs >= 300) {
				r.push(`tits.`);
			} else {
				r.push(`chest.`);
			}
			if (eventSlave.boobs > 40000) {
				r.push(`${His} expansive tits not only weigh ${him} down, but also force you to push ${him} against the shower wall for added support.`);
			} else if (eventSlave.weight > 160) {
				r.push(`${He}'s certainly an armful and a little too fat, forcing you to push ${him} against the shower wall for added support.`);
			} else if (eventSlave.balls > 200) {
				r.push(`${His} tremendous balls serve as an imposing anchor, quickly forcing you to push ${him} against the shower wall for added support.`);
			} else if (eventSlave.dick > 30) {
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`${His} hanging dick adds tremendously to ${his} weight and touches the floor, but you're ${strong} enough to lift ${him}.`);
				} else {
					r.push(`${His} hanging dick adds tremendously to ${his} weight and touches the floor, quickly forcing you to push ${him} against the shower wall for added support.`);
				}
			} else if (eventSlave.boobs > 25000) {
				r.push(`${His} enormous boobs`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`add tremendously to ${his} weight and are awkward to manage, but you're ${strong} enough to lift ${him}.`);
				} else {
					r.push(`add tremendously to ${his} weight and are awkward to manage, quickly forcing you to push ${him} against the shower wall for added support.`);
				}
			} else if (eventSlave.weight > 130) {
				r.push(`${He}'s a`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`fatty, but you're ${strong} enough to lift ${him}.`);
				} else {
					r.push(`fatty and a little too big and heavy, quickly forcing you to push ${him} against the shower wall with a wet slap.`);
				}
			} else if (eventSlave.balls > 100) {
				r.push(`${His} enormous balls`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`add tremendously to ${his} weight and dangle ponderously, but you're ${strong} enough to lift ${him}.`);
				} else {
					r.push(`add tremendously to ${his} weight and dangle ponderously, quickly forcing you to push ${him} against the shower wall for added support.`);
				}
			} else if (eventSlave.dick > 20) {
				r.push(`${His} dangling cock adds tremendously to ${his} weight and dangles heavily, but you're ${strong} enough to lift ${him}.`);
			} else if (eventSlave.butt > 18) {
				r.push(`${His} expansive ass`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					r.push(`adds tremendously to ${his} weight and is awkward to handle, but you're ${strong} enough to lift ${him}.`);
				} else {
					r.push(`adds tremendously to ${his} weight and is awkward to handle, quickly forcing you to push ${him} against the shower wall for added support.`);
				}
			} else if (eventSlave.boobs > 8000) {
				r.push(`${His} boobs add tremendously to ${his} weight, but you're ${strong} enough to lift ${him}.`);
			} else if (eventSlave.weight > 95) {
				r.push(`${He}'s got some extra weight on ${him}, but you're ${strong} enough to lift ${him}.`);
			} else if (eventSlave.height > 180) {
				r.push(`${He}'s a big ${girl}, but you're ${strong} enough to lift ${him}.`);
			} else if (eventSlave.weight > 30) {
				r.push(`${He}'s a chubby ${girl}, but you're ${strong} enough to lift ${him}.`);
			} else if (eventSlave.bellyPreg >= 10000) {
				r.push(`${He}'s heavily pregnant, but you're ${strong} enough to lift ${him}.`);
			} else if (eventSlave.bellyImplant >= 10000) {
				r.push(`${His} belly is greatly laden with inert filler, but you're ${strong} enough to lift ${him}.`);
			} else if (eventSlave.bellyFluid >= 10000) {
				r.push(`${His} belly is greatly laden with ${eventSlave.inflationType}, but you're ${strong} enough to lift ${him}.`);
			} else if (eventSlave.height > 160) {
				r.push(`${He}'s no little ${girl}, but you're ${strong} enough to lift ${him} with ease.`);
			} else if (eventSlave.weight > 10) {
				r.push(`${He}'s got a deliciously plush body, but you're ${strong} enough to lift ${him} with ease.`);
			} else {
				r.push(`You can hold the little slave like this as long as you like.`);
			}
			r.push(`You shift your grip to hold ${him} with one hand so you can`);
			if (PC.dick !== 0) {
				r.push(`maneuver your cock inside ${him}, and then resume your original hold so you can slide ${him} up and down your shaft.`);
				if (PC.vagina !== -1) {
					r.push(`You make sure ${he}'s really hilted at the height of each stroke, putting some nice pressure on your pussy.`);
				}
			} else {
				r.push(`slide your fingers inside ${his}`);
				if (canDoVaginal(eventSlave)) {
					r.push(`pussy,`);
				} else {
					r.push(`ass,`);
				}
				r.push(`since you're not putting ${him} down to get a strap-on. Knowing ${he} can't reach your cunt to return the favor like this, ${he} relaxes and lets you play with ${him}.`);
			}
			r.push(`Helpless, ${he} has nothing to do but`);
			if (canSee(eventSlave)) {
				r.push(`watch ${himself} get fucked in a full length mirror. ${He} stares, fascinated, and the sight`);
			} else {
				r.push(`let ${his} hands wander across ${his} body. Teasing ${his} nipples`);
				if (eventSlave.bellyPreg >= 5000) {
					r.push(`and pregnant belly`);
				}
			}
			r.push(`gets ${him} off quickly,`);
			if (eventSlave.dick === 0) {
				r.push(`${his} muscles tensing prettily with female orgasm.`);
			} else if (eventSlave.chastityPenis === 1) {
				r.push(`a dribble of cum flowing from the tip of ${his} chastity cage.`);
			} else if (canAchieveErection(eventSlave)) {
				r.push(`${his} stiffly waving cock jetting cum onto the floor.`);
			} else if (eventSlave.dick > maxErectionSize(eventSlave)) {
				r.push(`${his} ${eventSlave.dick > 6 ? "absurd" : "oversized"} cock twitching lazily as ${his} ejaculate makes it down its length.`);
			} else if (eventSlave.balls === 0) {
				r.push(`${his} bitchclit dribbling weakly.`);
			} else if (eventSlave.dick > 0) {
				r.push(`${his} limp dick twitching as ${he} cums.`);
			} else {
				r.push(`making ${him} shudder.`);
			}
			r.push(`When you're done, you let ${him} down, and the first thing ${he} does is spin in your embrace to give you an <span class="devotion inc">earnest kiss.</span>`);
			r.push(VCheck.Simple(eventSlave, 1));
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}
	}
};
