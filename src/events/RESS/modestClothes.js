App.Events.RESSModestClothes = class RESSModestClothes extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canTalk,
				canHear,
				s => s.devotion > 20,
				s => s.trust > 20,
				s => s.rules.speech !== "restrictive",
				s => s.choosesOwnClothes !== 1,
				s => s.assignment !== Job.QUARTER,
				s => getExposure(s) === 0,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave, "no clothing");
		node.appendChild(artDiv);
		const clothes = Spoken(eventSlave, eventSlave.clothes);
		const desc = SlaveTitle(eventSlave);

		let r = [];

		r.push(`Near the end of ${his} weekly inspection,`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`asks you a question. The inspection happens to have been at the start of ${his} day, and after you're done with ${him}, ${he}'ll be heading off to get dressed. ${He}'s naked for inspection, of course,`);
		if (eventSlave.fetishKnown && eventSlave.fetish === "humiliation") {
			r.push(`which has the humiliation fetishist ${desc} decently aroused.`);
		} else {
			r.push(`but ${he}'s a good ${desc}, and ${he} trusts you, so ${he} has no problem at all with being seen nude.`);
		}
		r.push(`In fact, that's what ${he} asks you about.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(Spoken(eventSlave, `"${Master},"`), `${he} ${say}s,`, Spoken(eventSlave, `"may I please wear something a little more revealing, just for today?"`));
		if (eventSlave.trust > 95) {
			r.push(`${He} trusts you completely, enough to have confidence that you'll understand ${he} isn't questioning you.`);
		} else {
			r.push(`${He} bites ${his} lip, realizing that ${he} might have come across as questioning you.`);
		}
		switch (eventSlave.clothes) {
			case "a nice maid outfit":
				r.push(Spoken(eventSlave, `"Wearing a proper maid's outfit is nice,"`));
				break;
			case "a nice nurse outfit":
				r.push(Spoken(eventSlave, `"Wearing a proper nurse's outfit is nice,"`));
				break;
			case "nice business attire":
				r.push(Spoken(eventSlave, `"Wearing a suit is nice,"`));
				break;
			case "battledress":
				r.push(Spoken(eventSlave, `"Wearing a ${clothes} is nice,"`));
				break;
			default:
				r.push(Spoken(eventSlave, `"Wearing ${clothes} is nice,"`));
		}
		if (eventSlave.trust > 95) {
			r.push(`${he} allows.`);
		} else {
			r.push(`${he} hurries to add.`);
		}
		if (eventSlave.fetishKnown && eventSlave.fetish === "humiliation") {
			r.push(Spoken(eventSlave, `"It's not really embarrassing, though. It would be so sexy to be, um, falling out of my clothes.`));
		} else if (eventSlave.fetishKnown && eventSlave.fetish === "buttslut") {
			r.push(Spoken(eventSlave, `"But they cover my asshole.`));
		} else if (eventSlave.fetishKnown && eventSlave.fetish === "boobs") {
			r.push(Spoken(eventSlave, `"But they cover my boobs.`));
		} else if (eventSlave.fetishKnown && eventSlave.fetish === "pregnancy" && eventSlave.bellyPreg >= 1500) {
			r.push(Spoken(eventSlave, `"But it covers up my pregnancy.`));
		} else if (eventSlave.assignment === Job.WHORE) {
			r.push(Spoken(eventSlave, `"But I also like being a prostitute, ${Master}. It'd be fun to try looking like a total whore.`));
		} else if (eventSlave.assignment === Job.PUBLIC) {
			r.push(Spoken(eventSlave, `"But I also like being a public slut, ${Master}. It'd be fun to really flaunt it.`));
		} else {
			r.push(Spoken(eventSlave, `"But it'd be fun and different to wear something really naughty.`));
		}
		r.push(Spoken(eventSlave, `May I please try out something skimpier today?"`));

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`No`, no),
			new App.Events.Result(`Show ${him} how much you like ${his} usual outfit`, usual),
			new App.Events.Result(`Put ${him} in a string bikini`, bikini),
			new App.Events.Result(`Force uncomfortable straps on ${him}`, straps),
		]);

		function no() {
			eventSlave.trust += 2;
			return `You tell ${him} no. ${He}'s a good enough slave that making a simple request and having you return a straightforward negative without punishment <span class="trust inc">makes ${him} just slightly more trusting.</span> It's nice to be allowed to ask things.`;
		}

		function usual() {
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, eventSlave.clothes);
			const frag = document.createDocumentFragment();
			let clothesDesc;
			switch (eventSlave.clothes) {
				case "a long qipao":
				case "a slutty qipao":
					clothesDesc = `qipao`;
					break;
				case "a penitent nuns habit":
					clothesDesc = `habit`;
					break;
				case "a slave gown":
				case "a ball gown":
					clothesDesc = `gown`;
					break;
				case "a comfortable bodysuit":
					clothesDesc = `bodysuit`;
					break;
				case "a nice nurse outfit":
					clothesDesc = `nurse outfit`;
					break;
				case "a schoolgirl outfit":
					clothesDesc = `school clothes`;
					break;
				case "a nice maid outfit":
					clothesDesc = `maid outfit`;
					break;
				case "a slutty maid outfit":
					clothesDesc = `skimpy maid outfit`;
					break;
				case "a biyelgee costume":
				case "a dirndl":
				case "a halter top dress":
				case "a mini dress":
				case "a maternity dress":
				case "an evening dress":
					clothesDesc = `dress`;
					break;
				case "a military uniform":
				case "a mounty outfit":
				case "a red army uniform":
				case "a schutzstaffel uniform":
				case "a slutty schutzstaffel uniform":
				case "a confederate army uniform":
					clothesDesc = `uniform`;
					break;
				case "spats and a tank top":
					clothesDesc = `spats`;
					break;
				case "a burkini":
				case "a monokini":
					clothesDesc = `swimsuit`;
					break;
				case "a chattel habit":
				case "a fallen nuns habit":
					clothesDesc = `slutty habit`;
					break;
				case "a succubus outfit":
					clothesDesc = `succubus getup`;
					break;
				case "a hijab and blouse":
				case "conservative clothing":
					clothesDesc = `conservative clothes`;
					break;
				default:
					clothesDesc = App.Data.clothes.get(eventSlave.clothes).name.toLowerCase();
			}

			r = [];
			r.push(`You tell ${him} to go get dressed as usual. ${His} face falls a little, but there was no condemnation in your tone, and ${he} hurries off,`);
			if (eventSlave.dick > 6) {
				r.push(`monstrous cock dangling.`);
			} else if (eventSlave.balls > 4) {
				r.push(`big balls dangling.`);
			} else if (eventSlave.bellyFluid >= 5000 || eventSlave.weight > 95) {
				r.push(`big belly jiggling.`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`as fast as ${his} swollen belly will allow.`);
			} else if ((eventSlave.boobsImplant / eventSlave.boobs) >= .60) {
				r.push(`fake tits bouncing.`);
			} else if (eventSlave.butt > 4) {
				r.push(`${his} big booty jiggling.`);
			} else if (eventSlave.boobs > 2000) {
				r.push(`udders jiggling.`);
			} else {
				r.push(`giving you a nice view of ${his} naked rear.`);
			}
			r.push(`${He} returns quickly, in ${his} proper ${clothesDesc}.`);
			r.push(`You tell ${him} that you like how ${he} looks, and that ${he}'s pretty. ${He} wasn't expecting such a blunt compliment, and`);
			if (canSee(eventSlave)) {
				r.push(`${his} ${App.Desc.eyesColor(eventSlave)} flick down to`);
			} else {
				r.push(`${he} faces`);
			}
			r.push(`the ground for a moment as ${he} blushes.`, Spoken(eventSlave, `"T-thank you, ${Master},"`), `${he} stutters.`);
			App.Events.addParagraph(frag, r);
			r = [];

			r.push(`You add that ${he} looks so good that ${he} had better take ${his} nice clean`);
			r.push(`${clothesDesc} off again, because`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina !== 0) {
				r.push(`you're going to`);
				if (V.PC.dick) {
					r.push(`fuck`);
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					r.push(`trib`);
					seX(eventSlave, "vaginal", V.PC, "vaginal");
					if (canFemImpreg(eventSlave, V.PC)) {
						knockMeUp(eventSlave, 10, 0, -1);
					}
				}
				r.push(`${him} senseless.`);
			} else if (canDoAnal(eventSlave) && eventSlave.anus !== 0) {
				if (eventSlave.prostate) {
					r.push(`you're going to fuck ${his} butt until ${he} cums.`);
				} else {
					r.push(`you're going to fuck ${his} butt.`);
				}
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`${he}'s going to`);
				if (V.PC.dick) {
					r.push(`suck your dick until you cover ${him} in cum.`);
					seX(eventSlave, "oral", V.PC, "penetrative");
				} else {
					r.push(`eat you out until ${he}'s got your pussyjuice running down ${his} chin.`);
					seX(eventSlave, "oral", V.PC, "vaginal");
				}
			}
			r.push(`${He} giggles at the sudden lewdness, and quickly strips naked again, complimented and <span class="devotion inc">eager to be used.</span>`);
			App.Events.addParagraph(frag, r);
			eventSlave.devotion += 5;
			return frag;
		}

		function bikini() {
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "a string bikini");
			const belly = bellyAdjective(eventSlave);

			r = [];
			r.push(`You tell ${him} that the wardrobe's sorting system will present ${him} with a new outfit, just for today. ${He}'s to go try it on and come right back, to see how it fits.`);
			r.push(Spoken(eventSlave, `"Thanks, ${Master}!"`), `${he} ${say}s brightly, and hurries off to see what's in store for ${him}. ${He} might be a slave and a ${desc} but ${girl}s everywhere love trying on new clothes. ${He} makes an entrance when ${he} comes back, spinning around to show off. ${He}'s wearing the briefest possible string bikini. The top, rather than having patches of material to cover ${his} nipples, forms a string triangle around them, framing them but not covering them. The bottom is a single string in front,`);
			if (eventSlave.dick) {
				r.push(`which looks rather sad and alone, pushed aside by ${his} dick as it is.`);
			} else if (eventSlave.balls > 2) {
				r.push(`which allow ${his} balls to spill to either side.`);
			} else if (eventSlave.labia) {
				r.push(`and it's embraced completely by ${his} generous pussylips.`);
			} else {
				r.push(`and it threatens to disappear inside ${his} pussylips.`);
			}
			r.push(Spoken(eventSlave, `"This feels so hot, ${Master},"`), `${he} ${say}s, and`);
			if (eventSlave.fetishKnown && eventSlave.fetish === "humiliation") {
				r.push(`blushes cutely. ${He} looks up at you,`);
				if (canSee(eventSlave)) {
					r.push(`sees`);
				} else {
					r.push(`feels`);
				}
				r.push(`the way you're staring at ${him}, and hangs ${his} head, blushing even harder.`);
			} else if (eventSlave.fetishKnown && eventSlave.fetish === "buttslut") {
				r.push(`turns around again, bending a little and cocking ${his} hips to show off the way the string between ${his} buttocks totally fails to conceal ${his}`);
				if (eventSlave.anus > 2) {
					r.push(`huge soft asspussy.`);
				} else if (eventSlave.anus > 1) {
					r.push(`nice butthole.`);
				} else {
					r.push(`tight little anus.`);
				}
			} else if (eventSlave.fetishKnown && eventSlave.fetish === "boobs") {
				r.push(`bounces ${his}`);
				if (eventSlave.boobsImplant) {
					r.push(`fake tits.`);
				} else if (eventSlave.boobs > 8000) {
					r.push(`earth-shattering tits.`);
				} else if (eventSlave.boobs > 2000) {
					r.push(`huge boobs.`);
				} else if (eventSlave.boobs > 400) {
					r.push(`boobs.`);
				} else {
					r.push(`petite chest.`);
				}
				r.push(`Giggling, ${he} bounces harder, and ${his} nipples escape from ${his} top, such as it is.`);
			} else if (eventSlave.fetishKnown && eventSlave.fetish === "pregnancy" && eventSlave.bellyPreg >= 1500) {
				r.push(`and attempts to pull the strings over the front of ${his} belly. Without delay, they slide right back to the sides of the ${belly} dome, eliciting a giggle from the preggo slut.`);
			} else if (eventSlave.assignment === Job.WHORE || eventSlave.assignment === Job.PUBLIC) {
				r.push(`sneaks a hand under the string around ${his} waist, tugging ${his} bottom up`);
				if (eventSlave.vagina !== -1) {
					r.push(`until the string between ${his} legs is pulled up into the entrance of ${his} womanhood.`);
				} else {
					r.push(`and turning sideways to suggest ${his} ass.`);
				}
				if (eventSlave.assignment === Job.WHORE) {
					r.push(Spoken(eventSlave, `"Guys'll pay money for this,"`));
				} else {
					r.push(Spoken(eventSlave, `"Guys'll line up to fuck this,"`));
				}
				r.push(`${he} giggles.`);
			} else {
				r.push(`bounces a little, smiling.`, Spoken(eventSlave, `"I'm basically naked,"`), `${he} giggles.`);
				r.push(Spoken(eventSlave, `"Today is going to be fun. The other ${girl}s'll be jealous you wanted me to look so slutty. Love you, ${Master}."`));
			}
			r.push(`${He}'s happy you indulged ${him}, and <span class="trust inc">satisfied that you think ${he}'s cute</span> enough to have around (practically) nude.`);
			eventSlave.trust += 5;
			return r;
		}

		function straps() {
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "uncomfortable straps");
			const belly = bellyAdjective(eventSlave);
			r = [];

			r.push(`You tell ${him} that the wardrobe's sorting system will present ${him} with a new outfit, just for today. ${He}'s to go try it on and come right back, to see how it fits.`);
			r.push(Spoken(eventSlave, `"Thanks, ${Master}!"`), `${he} ${say}s brightly, and hurries off to see what's in store for ${him}. ${He} might be a slave and a ${desc} but ${girl}s everywhere love trying on new clothes. ${He}'s wrong to be so enthusiastic. ${He} comes obediently back, wearing a set of cruelly uncomfortable leather straps in the general shape of a bikini, but much tighter and more restrictive. It isn't at all what ${he} was expecting, but ${he} did ${his} best to obey. ${He}'s <span class="trust dec">tightened ${his} own straps down</span> until they're just short of cutting off circulation, in an obvious effort to please you. You ask ${him} how ${he} likes ${his} outfit.`);
			r.push(Spoken(eventSlave, `"It's nice, ${Master},"`), `${he} ${say}s, but ${he} sounds a little sad.`);
			if (eventSlave.fetishKnown && eventSlave.fetish === "humiliation") {
				r.push(Spoken(eventSlave, `"I'm just a worthless humiliation slut. I love having steel rings around my holes like this,"`), `${he} adds.`);
			} else if (eventSlave.fetishKnown && eventSlave.fetish === "buttslut") {
				r.push(`${He} turns to show you ${his} asshole, framed by a steel ring that spreads ${his} buttocks to keep it nice and defenseless.`);
				r.push(Spoken(eventSlave, `"I know my backpussy's the best thing about me,"`), `${he} adds.`);
			} else if (eventSlave.fetishKnown && eventSlave.fetish === "boobs") {
				r.push(`${He} does ${his} best to thrust out ${his} chest, making the straps creak.`);
				r.push(Spoken(eventSlave, `"I know I'm, I'm just, just a pair of boobs,"`), `${he} adds.`);
			} else if (eventSlave.fetishKnown && eventSlave.fetish === "pregnancy" && eventSlave.bellyPreg >= 1500) {
				r.push(`${He} does ${his} best to thrust out ${his} ${belly} belly, making the straps creak ominously.`);
				r.push(Spoken(eventSlave, `"I know I'm, I'm just, just a baby maker,"`), `${he} adds.`);
			} else if (eventSlave.assignment === Job.WHORE || eventSlave.assignment === Job.PUBLIC) {
				r.push(`${He} hangs ${his} head.`);
				r.push(Spoken(eventSlave, `"I feel like a worthless ${eventSlave.assignment === Job.WHORE ? `whore` : `bitch`},"`), `${he} adds.`, Spoken(eventSlave, `"Guess I am."`));
			} else {
				r.push(`${He} indicates the steel rings that frame ${his} holes and keep them defenseless.`);
				r.push(Spoken(eventSlave, `"I know I'm just a collection of fuckholes,"`), `${he} adds.`);
			}
			r.push(`${He} sounds like ${he}'s trying to convince ${himself}, but ${his} <span class="devotion inc">abasement is not feigned.</span>`);
			eventSlave.devotion += 5;
			eventSlave.trust -= 5;
			return r;
		}
	}
};
