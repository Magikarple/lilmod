App.Events.RESSTooThinForCumDiet = class RESSTooThinForCumDiet extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}


	actorPrerequisites() {
		return [
			/** @param {App.Entity.SlaveState} s */
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canTalk,
				s => s.dietCum > 0,
				s => s.diet === "fattening",
				s => s.trust >= -50,
				s => s.fetish !== "cumslut",
				s => s.weight < -30,
				s => s.health.condition > -80,
				s => s.behavioralFlaw !== "anorexic",
				s => s.sexualFlaw !== "self hating",
				s => (s.fetishStrength <= 60 || s.fetishKnown !== 1),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let t = [];
		t.push(`You are in your office, tending to the tedious business of requisition orders for your penthouse when you see`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`appear outside your door. ${He} hovers outside in the hall, peeking ${his} head around the entry-way, looking very unsure about disturbing you. You stop what you're doing and call ${him} in. ${He}'s reticent at first, but then ${he} obediently steps into your office. ${He} is`);
		if (App.Data.clothes.get(eventSlave.clothes).exposure >= 4) {
			t.push(`forced to remain naked at all times, and the most striking thing about ${his} body is how`);
		} else {
			t.push(`forced to wear ${eventSlave.clothes} all day, but even through ${his} outfit, it's easy to see how`);
		}
		if (eventSlave.belly >= 100000) {
			if (eventSlave.bellyPreg >= 3000) {
				t.push(`${his} ${belly} pregnancy utterly dwarfs ${his} skinny body.`);
			} else {
				t.push(`${his} ${belly} distended belly utterly dwarfs ${his} skinny body.`);
			}
		} else if (eventSlave.belly >= 15000) {
			if (eventSlave.bellyPreg >= 3000) {
				t.push(`${his} heavy pregnancy completely dominates ${his} skinny body.`);
			} else {
				t.push(`${his} hugely distended belly completely dominates ${his} skinny body.`);
			}
		} else if (eventSlave.belly >= 10000) {
			if (eventSlave.bellyPreg >= 3000) {
				t.push(`${his} advanced pregnancy dominates ${his} skinny body.`);
			} else {
				t.push(`${his} hugely distended belly dominates ${his} skinny body.`);
			}
		} else if (eventSlave.belly >= 5000) {
			if (eventSlave.bellyPreg >= 3000) {
				t.push(`massive ${his} pregnant belly is compared to ${his} skinny body.`);
			} else {
				t.push(`massive ${his} distended belly is compared to ${his} skinny body.`);
			}
		} else if (eventSlave.belly >= 1500) {
			if (eventSlave.bellyPreg > 0) {
				t.push(`noticeable ${his} growing pregnancy is against ${his} skinny body.`);
			} else {
				t.push(`noticeable the curve of ${his} belly is against ${his} skinny body.`);
			}
		} else if (eventSlave.belly >= 150) {
			if (eventSlave.bellyPreg > 0) {
				t.push(`noticeable ${his} early pregnancy is against ${his} skinny body.`);
			} else {
				t.push(`noticeable the curve of ${his} implant is against ${his} skinny body.`);
			}
		} else {
			t.push(`skinny ${he} is.`);
		}
		if (eventSlave.weight > -80) {
			t.push(`${He}'s not exclusively skin and bones, but ${he}'s close. ${His}`);
		} else {
			t.push(`${He}'s so thin that ${he} doesn't look entirely healthy. ${His}`);
		}

		if (eventSlave.boobs < 600) {
			t.push(eventSlave.boobs < 300 ? `tiny` : `small`);
			t.push("boobs are barely noticeable");
			t.push(eventSlave.belly >= 5000 ? `above ${his} bloated` : `against ${his} concave`);
			if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				t.push(`tummy, and that can be a very appealing look given the predilection your arcology has for slim ${girl}s.`);
			} else {
				t.push(`tummy, and to most clients, this makes ${him} a less appealing whore.`);
			}
		} else {
			t.push(eventSlave.boobs < 900 ? "large" : "massive");
			t.push(`tits are a sharp contrast to ${his}`);
			t.push(eventSlave.belly >= 150 ? "thin, bloated frame," : "concave belly");
			t.push(`and although impressive, they seem to especially stick out on a ${girl} who, in all other ways, seems`);
			t.push(eventSlave.weight > -80 ? "slightly" : "alarmingly");
			t.push(`malnourished. ${His} ${eventSlave.faceShape} face is clearly conflicted, and`);
		}
		t.push(canSee(eventSlave) ? `${his} ${App.Desc.eyesColor(eventSlave)} shift` : `${he} glances about`);
		t.push(`with nervous energy. ${He} is clearly unsure whether ${he} should say what ${he} came here to say.`);
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`When you finally ask ${him} what ${he} wants, ${he} hesitates for a moment and then suddenly seems to gain ${his}`);
		if (eventSlave.accent > 1) {
			t.push(`courage, speaking in an atrociously thick accent.`);
		} else if (eventSlave.accent > 0) {
			t.push(`courage, speaking in a cute little accent.`);
		} else {
			t.push("courage.");
		}
		t.push(Spoken(eventSlave, `"Please ${Master}, I'm so hungry! It seems like all I get to eat is cum. It's disgusting! Please! I have to eat so much of it. Can I be allowed to eat regular food again? Please ${Master}, I'm so hungry. I need real food!"`));
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`It's true, cum`);
		t.push(eventSlave.dietCum === 1 ? "supplemented" : "based");
		t.push(`food can be hard on ${girl}s`);
		t.push(`who are not fully habituated to being toys for sexual amusement — particularly when you've ordered them to gain weight on it. You look at the`);
		if (eventSlave.belly >= 1500) {
			t.push(`gravid,`);
		}
		t.push(`skinny whore and consider your options.`);

		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			(eventSlave.chastityAnus === 1)
				? new App.Events.Result(`Give the poor ${girl} a break and take ${him} off ${his} cum diet so ${he} can safely get to a healthier weight`, safely)
				: new App.Events.Result(),
			(canDoAnal(eventSlave))
				? new App.Events.Result(`Give the emaciated slut your answer in the form of a rough butt-fuck`, buttfuck, virginityWarning())
				: new App.Events.Result(),
			new App.Events.Result(`Use aphrodisiacs and positive reinforcement to make ${his} cum diet more palatable`, aphrodisiac),
		]);

		function virginityWarning() {
			if ((eventSlave.anus === 0) && (eventSlave.dietMilk === 1)) {
				return `This option will take ${his} anal virginity and remove milk from ${his} diet.`;
			} else if (eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			} else if (eventSlave.dietMilk === 1) {
				return `This option will remove milk from ${his} diet.`;
			}
			return null;
		}


		function safely() {
			t = [];
			t.push(`You silently appraise ${eventSlave.slaveName}'s desperate face and lean forward in your chair to check your terminal. You confirm that`);
			if (eventSlave.dietCum === 1) {
				t.push(`${his} food is supplemented with cum for flavor.`);
			} else {
				t.push(`${he} is being fed significant amounts of ejaculate.`);
			}
			t.push(`While ${his}`);
			if (eventSlave.dietCum === 2) {
				t.push(`extreme`);
			}
			t.push(`diet is still engineered to`);
			if (eventSlave.dietCum === 2) {
				t.push(`barely`);
			}
			t.push(`provide the nutrition ${he} needs, if ${he} can't hold the stuff down, ${he} can't gain`);
			if (eventSlave.pregKnown === 1 && eventSlave.preg > eventSlave.pregData.normalBirth / 4) {
				t.push(`weight, especially with ${his} growing`);
				if (eventSlave.pregType > 1) {
					t.push(`children taking whatever nutrients they can.`);
				} else {
					t.push(`child taking whatever nutrients it can.`);
				}
			} else {
				t.push("weight.");
			}
			t.push(`With a few taps on the keyboard you change ${his} orders so that ${he} will be fed a much more nutritionally rich diet that is free of ejaculate. However, you make sure to warn ${him} that ${V.assistant.name} will be monitoring ${him}, and you may change your mind once ${he} reaches a more attractive weight. ${He} thanks you profusely,`);
			if (eventSlave.vagina !== 0) {
				t.push(`even attempting to offer ${his} body for use in gratitude,`);
			}
			t.push(`but you simply send ${him} away. You find yourself concerned that you are becoming soft by allowing slaves to dictate what they will and won't eat, but your benevolent decision has already had a <span class="devotion inc">positive effect on ${his} attitude.</span> ${He} <span class="trust inc">trusts you a little more</span> too.`);
			eventSlave.trust += 2;
			eventSlave.devotion += 2;
			eventSlave.dietCum = 0;
			return t;
		}

		function buttfuck() {
			t = [];
			let frag = document.createDocumentFragment();
			t.push(`You stand up behind your desk. ${He} flinches, but holds ${his} ground, ${his} lip quivering slightly. You slowly walk toward ${him}, appraising ${his}`);
			t.push(eventSlave.belly >= 100 ? `bloated,` : `smooth,`);
			t.push(`skinny body, touching ${his} shoulder as you disappear behind ${him}. ${He} starts to cry as you`);
			if (V.PC.dick === 0) {
				t.push(`pull a massive rubber dong attachment off the wall and hook it to your strap-on.`);
			} else {
				t.push(`unbuckle your pants and ${him} feel your warm dick harden against ${his} tight, bony thigh.`);
			}
			t.push(`Without word or ceremony, you shove ${him} forward so that ${he} is bent over and crushed against your desk. The tears start to flow out of ${him} as ${he} feels your`);
			t.push(V.PC.dick === 0 ? `massive rubber dong` : `hard, thick cock`);
			t.push(`pressing against ${his} unprotected anus.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`When you offer ${him} the opportunity to revise ${his} request, ${he} does.`);
			t.push(Spoken(eventSlave, `"Please, ${Master} I'm sorry! Please don't fuck my ass! I'll eat all the cum you want! Please!"`));
			t.push(`${He} screams`);
			if (eventSlave.accent > 1) {
				t.push(`in ${his} thick accent`);
			}
			t.push(`as you force your`);
			if (V.PC.dick === 0) {
				t.push(`strap-on`);
			} else {
				t.push(`self`);
			}
			t.push(`inside ${his} butthole and subdue ${his} weak, struggling body against your unforgiving desk. <span class="trust dec">Horrified tears</span> stream down ${his} face with each brutal thrust as you speak into ${his} ear and remind ${him} that slaves are not allowed to dictate their needs to their owners. You know what's best for ${him}, and right now, ${his} proper role is as an eager little depository for the products of the free cities' ejaculate market. It's ${his} job to suck down cum at the whim of ${his} owner, plain and simple, until ${he}'s told otherwise. You buttfuck the cum-fed slag until ${he} simply lays there and accepts ${his} corrective assrape.`);
			if (eventSlave.anus === 0) {
				t.push(`<span class="virginity loss">${His} ${eventSlave.butt < 5 ? 'skinny' : 'plump'} little ass is now broken in.</span>`);
			}
			t.push(`${He} sobs quietly with each thrust of your hips, and when you finally`);
			if (V.PC.dick !== 0) {
				t.push(`make yet another cum deposit into ${his}`);
				t.push(eventSlave.weight < -80 ? `emaciated body and` : `bony body and`);
			}
			t.push(`pull out, you instruct`);
			if (eventSlave.dietCum === 1) {
				t.push(`${V.assistant.name} to dramatically increase the amount of cum in ${his} diet from now on. You won't have a slave telling you what ${he} eats. ${eventSlave.slaveName}`);
				if (canHear(eventSlave)) {
					t.push(`hears your instructions`);
				} else {
					t.push(`correctly guesses the meaning behind your body language`);
				}
				t.push(`and whimpers before rubbing ${his} sore bottom while heading`);
			} else {
				t.push(`another slave to drag the broken slut to the kitchen, where ${he}'s to receive an additional feeding of thick, creamy ejaculate-based nutrients before proceeding`);
			}
			t.push(`to ${his} next assignment.`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`${He}'s learned a valuable lesson about what it truly means to be a slave today, and it's one ${he} <span class="devotion dec">won't soon forget.</span>`);
			eventSlave.devotion -= 5;
			eventSlave.trust -= 5;
			if (eventSlave.anus === 0) {
				eventSlave.anus += 1;
			}
			VCheck.Anal(eventSlave, 1);
			if (eventSlave.dietCum === 1) {
				eventSlave.dietCum = 2;
				eventSlave.dietMilk = 0;
			}

			App.Events.addParagraph(frag, t);
			return [frag];
		}


		function aphrodisiac() {
			t = [];
			let frag = document.createDocumentFragment();
			t.push(`You do a quick check at your terminal. ${He} is indeed being fed`);
			if (eventSlave.dietCum === 1) {
				t.push(`food that is supplemented with cum for flavor.`);
			} else {
				t.push(`large amounts of human ejaculate.`);
			}
			t.push(`You tell ${him} that it can't be helped. When you assign a slave ${his} diet, it's for a reason, and in ${eventSlave.slaveName}'s case, you are using ${his} diet to make ${him} into a better whore. By the look on ${his} distressed face, you can tell ${he} doesn't understand or appreciate your perspective, but you tell ${him} you have just the thing to help change ${his} outlook.`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`You pull out a heavy dose of aphrodisiacs from the drawer in your desk. They are expensive, but powerful drugs that can be used in a brute force way to manipulate the sexual urges and tastes of even the most frigid sluts. The mild dose included in every slave's food is usually enough to affect a slow, inevitable change in attitude for resistant slaves, but sometimes a more acute dose can be an amusing way to turn disgust into dependence.`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`${eventSlave.slaveName} shivers as you reassure ${him} and inject ${his}`);
			t.push(eventSlave.weight < -80 ? `bony` : `tiny`);
			t.push(`body with the powerful drugs. You know they are working when ${he} begins to perspire a little, and`);
			if (eventSlave.vagina > -1) {
				t.push(`${he} starts to leak fresh girl-juice down ${his} shivering thighs.`);
			} else if (eventSlave.dick === 0) {
				t.push(`starts to turn instinctively to offer you ${his} only hole.`);
			} else {
				t.push(`${his} dick starts to come to attention.`);
			}
			t.push(`You then book ${him} to be the main attraction at a corporate office party that afternoon, where ${he} will be the target of a blow-bang and bukkake. You see that ${he}'s dosed heavily with the drugs every day this week, and then book the rest of ${his} afternoons for similar duties, making sure ${he} still tends to ${his} regular assignments as well. In the meantime, you also instruct the kitchen that ${he} is to eat as much cum-based food from the dispensers as ${he} can suck down in order to fuel up for these exhausting escapades.`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`By the end of the week, the aphrodisiacs and ${his} slide into an inescapable routine of cum immersion have done their job, and ${he} has begun to <span class="fetish gain">view cum as an inevitable component of ${his} daily life.</span> ${He} also manages to <span class="improvement">gain a little weight.</span> Thanks to your manipulation of ${his} Pavlovian responses through extreme drug therapy, ${his} <span class="health dec">health has suffered a bit,</span> but ${he} is also <span class="devotion inc">more dependent on you</span> thanks to ${his}`);
			if (eventSlave.addict === 0) {
				t.push(`<span class="cyan">new</span>`);
			} else {
				t.push(`<span class="cyan">developing</span>`);
			}
			t.push(`<span class="cyan">addiction to aphrodisiacs.</span>`);
			eventSlave.devotion += 5;
			eventSlave.weight += 10;
			eventSlave.fetish = "cumslut";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 10;
			eventSlave.addict += 1;
			seX((eventSlave), "oral", "public", "penetrative", 50);
			healthDamage((eventSlave), 10);

			App.Events.addParagraph(frag, t);
			return [frag];
		}
	}
};
