App.Events.RESSBondedLove = class RESSBondedLove extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.relationship <= -2,
				s => s.trust > 50,
				s => s.devotion > 50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const children = eventSlave.pregType > 1 ? "children" : "child";

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`Working in your office early in the morning, you can hear the low, human hum of your slaves who work during the daytime busily getting ready for their days. Suddenly, there's motion at your doorway, and`,
			contextualIntro(V.PC, eventSlave, true),
			`hurries in. ${He}'s nude, ${his} ${eventSlave.skin} skin glowing with the fresh cleanliness of having just gotten out of the shower. ${He}`,
		);
		if (canSee(eventSlave)) {
			r.push(`glances at you`);
		} else if (canHear(eventSlave)) {
			r.push(`listens`);
		} else {
			r.push(`waits`);
		}
		r.push(`to see if ${he}'s unwelcome, and seeing no sign that ${he} is, the devoted ${SlaveTitle(eventSlave)} comes over to your desk.`);
		if (eventSlave.boobs < 400) {
			r.push(`${His} little${eventSlave.boobShape === "normal" ? `` : ` ${eventSlave.boobShape}`} tits barely move at all as ${he} walks, though ${his} ${eventSlave.nipples} nipples certainly catch your eye.`);
		} else if ((eventSlave.boobsImplant/eventSlave.boobs) >= .75) { // tiny little 200cc implants in 20000cc tits are laughable. Now we make sure those tits are fake.
			r.push(`${His} fake tits barely move at all as ${he} walks, their shape maintained by ${his} implants.`);
		} else if (eventSlave.boobs < 1000) {
			r.push(`${His} lovely${eventSlave.boobShape === "normal" ? `` : ` ${eventSlave.boobShape}`} boobs move delightfully as ${he} walks, and ${his} ${eventSlave.nipples} nipples bounce prettily.`);
		} else if (eventSlave.boobs < 2500) {
			r.push(`${His} heavy${eventSlave.boobShape === "normal" ? `` : `, ${eventSlave.boobShape}`} breasts bounce up and down as ${he} walks, making ${his} ${eventSlave.nipples} nipples dance around distractingly.`);
		} else {
			r.push(`${His} massive${eventSlave.boobShape === "normal" ? `` : `, ${eventSlave.boobShape}`} udders jiggle alluringly as ${he} walks, and ${his} ${eventSlave.nipples} nipples sway from side to side distractingly.`);
		}
		r.push(`Your eyes move down ${his} body, noting`);
		if (eventSlave.bellyPreg >= 450000) {
			r.push(`${his} ${belly} belly,`);
			if (eventSlave.pregSource === -1) {
				r.push(`practically bursting with your ${children},`);
			}
			r.push(`and how ${he} struggles to walk with it while keeping all the kicking from throwing ${him} off balance.`);
		} else if (eventSlave.belly >= 450000) {
			r.push(`${his} ${belly} belly and how the struggles to walk with it without bumping things.`);
		} else if (eventSlave.bellyPreg >= 150000) {
			r.push(`${his} ${belly} belly,`);
			if (eventSlave.pregSource === -1) {
				r.push(`completely filled with your ${children},`);
			}
			r.push(`and the slight movement within with each struggling step ${he} takes.`);
		} else if (eventSlave.belly >= 150000) {
			r.push(`${his} ${belly} belly and the vastly altered gait ${he} steps with to handle it.`);
		} else if (eventSlave.bellyPreg >= 10000) {
			r.push(`${his} full-term pregnant belly,`);
			if (eventSlave.pregSource === -1) {
				r.push(`rounded with your ${children},`);
			} else {
				r.push(`which`);
			}
			r.push(`adds a distinct awkwardness to ${his} gait.`);
		} else if (eventSlave.bellyFluid >= 10000) {
			r.push(`${his} straining ${eventSlave.inflationType}-filled belly and how ${he} struggles to walk normally with it.`);
		} else if (eventSlave.bellyImplant >= 10000) {
			r.push(`${his} full-term pregnancy-looking belly and how it adds a distinct awkwardness to ${his} gait.`);
		} else if (eventSlave.bellyPreg >= 5000) {
			r.push(`${his} hugely pregnant belly,`);
			if (eventSlave.pregSource === -1) {
				r.push(`rounded with your ${children},`);
			} else {
				r.push(`which`);
			}
			r.push(`adds a certain unavoidable awkwardness to ${his} gait.`);
		} else if (eventSlave.bellyFluid >= 5000) {
			r.push(`${his} ${eventSlave.inflationType}-filled belly and the delightful jiggle that runs through it with each step.`);
		} else if (eventSlave.bellyImplant >= 5000) {
			r.push(`${his} hugely rounded belly and the certain unavoidable awkwardness in ${his} gait it causes.`);
		} else if (eventSlave.weight >= 95) {
			r.push(`${his} big fat belly and how it sways and jiggles with each step.`);
		} else if (eventSlave.bellyPreg >= 1500) {
			r.push(`${his} pregnant belly,`);
			if (eventSlave.pregSource === -1) {
				r.push(`swollen with your ${children},`);
			} else {
				r.push(`which`);
			}
			r.push(`isn't truly huge yet, but clearly advertises ${his} status as a breeding ${SlaveTitle(eventSlave)}.`);
		} else if (eventSlave.bellyFluid >= 2000) {
			r.push(`the slight bloat to ${his} belly caused by the liters of ${eventSlave.inflationType} held inside ${him}.`);
		} else if (eventSlave.bellyImplant >= 1500) {
			r.push(`${his} slightly rounded belly, not truly noticeable, but enough to advertise ${him} as a breeding ${SlaveTitle(eventSlave)}, even though it's fake.`);
		} else if (eventSlave.hips === 3) {
			r.push(`${his} extremely wide hips and the cartoonish sway to them as ${he} walks.`);
		} else if (eventSlave.muscles > 30) {
			r.push(`${his} rippling abs, which work visibly as ${he} walks, flexing and straining powerfully underneath ${his} ${eventSlave.skin} skin.`);
		} else if (eventSlave.waist < -95) {
			r.push(`${his} cartoonish wasp waist and the way it emphasizes ${his} status as a sex toy.`);
		} else if (eventSlave.hips > 0) {
			r.push(`${his} wide hips and the sensual sway to them as ${he} walks.`);
		} else if (eventSlave.waist < -10) {
			r.push(`${his} nice narrow waist and the way it emphasizes the feminine swell of ${his} hips.`);
		} else if (eventSlave.weight > 30) {
			r.push(`${his} chubby belly and how it jiggles as ${he} walks, ${his} plush fat moving voluptuously with ${him}.`);
		} else if (eventSlave.weight > 10) {
			r.push(`${his} plush belly and how it jiggles a little as ${he} walks, giving ${him} a soft and sensual appeal.`);
		} else {
			r.push(`${his} trim belly before looking further down.`);
		}
		r.push(`Below that,`);
		if (eventSlave.dick > 0) {
			if (canAchieveErection(eventSlave)) {
				r.push(`${his} cock is soft for once, probably from the shower; it`);
			} else if (eventSlave.dick > maxErectionSize(eventSlave)) {
				if (V.maxErectionSizeOption === 0) {
					r.push(`${his} soft python of a cock`);
				} else {
					r.push(`${his} soft, oversized cock`);
				}
			} else {
				r.push(`${his} soft bitchclit`);
			}
			if (eventSlave.dick > 4) {
				r.push(`flops around lewdly`);
			} else if (eventSlave.dick > 2) {
				r.push(`bounces around`);
			} else {
				r.push(`wiggles pathetically`);
			}
			r.push(`as ${he} moves.`);
		} else if (eventSlave.labia > 0) {
			r.push(`${his} generous petals, flushed and a little full from the warmth of the shower, offer soft, healthy advertisement of ${his} womanhood.`);
		} else if (eventSlave.clit > 0) {
			r.push(`${his} prominent clit, flushed and a little full from the warmth of the shower, offers soft testament to ${his} female sexuality.`);
		} else if (eventSlave.piercing.genitals.weight > 0) {
			r.push(`${his} glinting`);
			if (eventSlave.dick === 0) {
				r.push(`clit`);
			} else {
				r.push(`dick`);
			}
			r.push(`piercing catches your eye, just as it's meant to do.`);
		} else if (eventSlave.vagina === -1) {
			r.push(`the smooth, featureless skin between ${his} legs is a little flushed; the tiny hole in it is barely noticeable.`);
		} else {
			r.push(`${his} healthy womanhood looks a little flushed from the warmth of the shower.`);
		}
		r.push(`Coming to a stop, ${he}`);
		if (eventSlave.height > 190) {
			r.push(`bends the long, long way down necessary to bring`);
		} else if (eventSlave.height < 155) {
			r.push(`bends the amusingly short way down ${he} needs to bring`);
		} else {
			r.push(`bends down`);
		}
		r.push(`to bring ${his}`);
		if (eventSlave.lips > 40) {
			r.push(`pillowy`);
		} else if (eventSlave.piercing.lips.weight > 0) {
			r.push(`pierced`);
		}
		r.push(`lips next to your ear.`);

		r.toParagraph();

		if (!canTalk(eventSlave)) {
			r.push(`${He} mouths 'I love you, ${getWrittenTitle(eventSlave)},' holding ${his} hands out in front of you both to say it in sign language at the same time.`);
		} else {
			r.push(`"I love you, ${Master}," ${he} whispers.`);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Tell ${him} ${he}'s a good slave`, good),
			new App.Events.Result(`Tell ${him} you love ${him} too`, love),
		]);

		function good() {
			const r = new SpacedTextAccumulator();
			r.push(`Without turning your head, you tell ${him} ${he}'s a very good slave. ${He} laughs happily,`);
			if (!canTalk(eventSlave)) {
				r.addToLast(`though of course this is silent,`);
			}
			r.push(`${his} warm breath gusting against your ear. It took confidence for ${him} to come in here and tell ${him} ${he} loved you, and ${he} <span class="trust inc">trusts you more</span> for responding this way. ${He} plants a light kiss on your cheek and walks quickly out of your office, hurrying to go about ${his} day's business, but careful to strut ${his} stuff for you on ${his} way out.`);
			if (eventSlave.butt < 3) {
				r.push(`${His} nice little butt moves cutely as ${he} goes. ${His} small buttocks leave`);
				if (!canDoAnal(eventSlave)) {
					r.push(`${his} anal chastity visible from the rear as ${he} walks.`);
				} else if (eventSlave.analArea > 3) {
					r.push(`the huge area of puckered skin around ${his} asspussy clearly visible from the rear, and ${his} asshole works lewdly with the motion.`);
				} else if (eventSlave.anus > 1) {
					r.push(`${his} asshole visible, the pucker of ${his} backdoor lewdly available.`);
				} else {
					r.push(`${his} tight anus visible from the rear as ${he} walks.`);
				}
			} else if (eventSlave.butt < 6) {
				r.push(`${His} healthy butt bounces as ${he} goes. ${His} big buttocks mostly conceal`);
				if (!canDoAnal(eventSlave)) {
					r.push(`${his} anal chastity, but there's the occasional tempting glimpse.`);
				} else if (eventSlave.analArea > 3) {
					r.push(`the huge area of puckered skin around ${his} asspussy, but ${his} butthole is so well used that it's obvious from the rear that ${he} takes it up the ass. A lot.`);
				} else if (eventSlave.anus > 1) {
					r.push(`${his} backdoor, but there's the occasional cute glimpse of ${his} experienced anus.`);
				} else {
					r.push(`what's between them, but there's the occasional cute glimpse of ${his} tight rosebud.`);
				}
			} else {
				r.push(`${His} gigantic ass jiggles as ${he} goes. ${His} enormous buttocks mostly stay together as ${he} moves,`);
				if (!canDoAnal(eventSlave)) {
					r.push(`completely swallowing ${his} anal chastity.`);
				} else if (eventSlave.analArea > 3) {
					r.push(`almost concealing the huge area of puckered skin around ${his} lewd asspussy.`);
				} else if (eventSlave.anus > 1) {
					r.push(`completely concealing ${his} welcoming backdoor.`);
				} else {
					r.push(`completely concealing ${his} tight asshole.`);
				}
			}
			r.push(`${He} pauses for an instant in the doorway, turns over ${his} shoulder to give you a sexy wink, and is gone.`);
			eventSlave.trust += 4;
			r.toParagraph();
			return r.container();
		}

		function love() {
			const r = new SpacedTextAccumulator();
			r.push(`You turn towards ${him} and direct the full weight of your gaze into ${his} eyes.`);
			if (canSee(eventSlave)) {
				r.push(`${His} eyelids flicker with the shock of the shared look,`);
			} else {
				r.push(`${His} eyes may not be capable of sight, but ${he} can feel your gaze,`);
			}
			r.push(`so close, but ${he} bears it, biting ${his} lower lip. Then you kiss ${him}. The released tension is too much for ${him}, and ${he} moans, slumping against you a little as you kiss ${him} like a lover. ${He}'s so lost in it that when you break the kiss, ${his} mouth stays slightly open and pursues yours slightly, hungry for more. You place a finger against ${his} moist lips, making ${him} wait a moment, and tell ${him} that you love ${him} too. ${He} makes`);
			if (eventSlave.voice === 0) {
				r.push(`a quiet moaning sound, deep in ${his} useless throat,`);
			} else {
				r.push(`an almost animal sound, somewhere between a sob and a moan,`);
			}
			r.push(`and as you withdraw your finger, ${he} kisses you back. ${He} knows ${he} has a job to do today, and it's waiting for ${him}, so when you give ${him} no indication that you'd like ${him} to stay, ${he} withdraws, keeping ${his}`);
			if (canSee(eventSlave)) {
				r.push(`eyes`);
			} else {
				r.push(`face`);
			}
			r.push(`on yours, doing ${his} best to <span class="devotion inc">make love to you</span> with ${his} gaze.`);
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}
	}
};
