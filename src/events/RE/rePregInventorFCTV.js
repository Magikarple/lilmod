// cSpell:ignore Twinner, oooh

App.Events.rePregInventorFCTV = class rePregInventorFCTV extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.pregInventor === 2,
			() => V.pregInventions === 1,
			() => V.FCTV.receiver > 0
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.ID === V.pregInventorID,
				s => s.bellyPreg >= 1000000, // even bigger than before
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.fuckdoll === 0,
				s => s.devotion > 50,
				s => s.porn.prestige >= 1 || s.prestige >= 1
			],
		];
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(slave);
		const legs = hasBothLegs(slave) ? `legs` : `leg`;
		App.Events.drawEventArt(node, slave);
		V.pregInventor = 3;
		let r = [];

		r.push(
			`The time has finally come for your slave,`,
			App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(slave), `,`),
			`to appear on the slave-breeding based talk show, "Husbandry with Millie."`
		);
		if (slave.porn.prestige > 2 || slave.prestige > 2) {
			r.push(`While ${he} is already world-renowned, you might still improve ${his} chances to impress on the show with a little bit of extra investment in commercial spots or a tweaking of FCTV algorithms.`);
		} else if ((slave.porn.prestige > 1 || slave.prestige > 2) && V.PC.skill.hacking >= 100) {
			r.push(`While ${he} is already quite famous, you could still improve ${his} chances to impress on the show with a little bit of extra investment in commercial spots or a tweaking of FCTV algorithms.`);
		} else {
			r.push(`While ${he} has`);
			if (slave.porn.prestige > 1) {
				r.push(`managed to earn a reasonable following in slave pornography,`);
			} else {
				r.push(`a bit of a reputation already,`);
			}
			r.push(`you could significantly improve ${his} chances to impress on the show with a little bit of extra investment in commercial spots${(V.PC.skill.hacking >= 100) ? ` or a tweaking of FCTV algorithms` : ``}.`);
		}
		App.Events.addParagraph(node, r);

		const responses = [];
		if (V.PC.skill.hacking >= 100) {
			responses.push(new App.Events.Result(`Manipulate the FCTV algorithms`, manipulate));
		}
		responses.push(new App.Events.Result(`Spend ${cashFormat(10000)} to fund additional advertising`, advertising));
		responses.push(new App.Events.Result(`Trust in your slave`, trust));

		App.Events.addResponses(node, responses);

		function manipulate() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You`);
			if (V.PC.skill.hacking < 70) {
				r.push(`bribe an employee to`);
			}
			r.push(`tweak the randomized search algorithms for FCTV. While your hyperbroodmother is being interviewed concerning ${his} inventions, users browsing FCTV using the randomize channel function will be much more likely to be directed to the show. By the day of the interview, you're confident that many users will be watching as your slave sells your vision for the world's future.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`That done, you settle in to watch.`);
			App.Events.addParagraph(frag, r);
			r = [];

			frag.append(interview());

			r.push(`You turn your FCTV screen off satisfied that your slave has just completed a job well done. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had a <span class="reputation inc">significant positive impact</span> on public opinion.`);
			if (slave.prestige <= 2) {
				slave.prestige = 2;
				slave.prestigeDesc = "$He is a renowned inventor of hyperpregnant sex accessories and toys.";
			}
			repX(10000, "event");
			V.pregInventions = 2;
			for (const arc of V.arcologies) {
				if (!FutureSocieties.advance('FSRepopulationFocus', 10, arc)) { FutureSocieties.advance('FSRestart', -20, arc); }
			}
			addTrinket(`a cut out magazine cover of your renowned hyperbroodmother inventor, ${slave.slaveName}, and ${his} myriad toys`);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function advertising() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You fund an aggressive ad campaign featuring your slave in provocative positions and selling a "life changing interview" on "Husbandry with Millie." By the day of ${his} interview, user boards all through the global web are discussing your slave and what ${he} might be about to reveal. Even social demographics not typically inclined toward the idea of breeding slaves seem to be intrigued, and you're confident that many users will be watching as your slave sells your vision for the world's future.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`That done, you settle in to watch the interview.`);
			App.Events.addParagraph(frag, r);
			r = [];

			frag.append(interview());

			r.push(`You turn your FCTV screen off satisfied that your slave has just completed a job well done. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had a <span class="reputation inc">significant positive impact</span> on public opinion.`);
			if (slave.prestige < 2) {
				slave.prestige = 2;
				slave.prestigeDesc = "$He is a renowned inventor of hyperpregnant sex accessories and toys.";
			}
			repX(10000, "event");
			V.pregInventions = 2;
			for (const arc of V.arcologies) {
				if (!FutureSocieties.advance('FSRepopulationFocus', 10, arc)) { FutureSocieties.advance('FSRestart', -20, arc); }
			}
			addTrinket(`a cut out magazine cover of your renowned hyperbroodmother inventor, ${slave.slaveName}, and ${his} myriad toys`);

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function trust() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`It's a gamble, but you decide to trust in the charisma of your slave and the fame ${he} has already accrued to sell your vision for the world's future during the interview.`);
			if (slave.porn.prestige > 2) {
				r.push(`${He}'s enormously popular, so your gambit has a good chance of success.`);
			} else if (slave.porn.prestige > 1) {
				r.push(`${He}'s quite popular, so your gambit has a reasonable chance of success.`);
			} else {
				r.push(`${He}'s only really well known in local pornography, but you still decide to bet on ${his} ability to sway the masses.`);
			}
			r.push(`Regardless, there's only so much your direct involvement could do to help ${him} as ${he} sells your vision for the world's future, and the natural cleverness ${he}'s already demonstrated might well allow ${him} to achieve results on ${his} own that would be impossible otherwise.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`When the day arrives, you settle in to watch the interview.`);
			App.Events.addParagraph(frag, r);
			r = [];

			frag.append(interview());

			if (slave.porn.prestige >= 3 && random(1, 100) > 50) {
				r.push(`You turn your FCTV screen off satisfied that your slave has just finished a job very well done. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had <span class="reputation inc">world-changing</span> consequences.`);
				if (slave.prestige < 3) {
					slave.prestige = 3;
					slave.prestigeDesc = "$He is a world-renowned inventor of hyperpregnant sex accessories and toys.";
				}
				repX(25000, "event");
				V.pregInventions = 3;
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 30, arc)) { FutureSocieties.advance('FSRestart', -60, arc); }
				}
				addTrinket(`a cut out magazine cover of your world-renowned hyperbroodmother inventor, ${slave.slaveName}, and ${his} myriad toys`);
			} else if (slave.porn.prestige >= 3 && random(1, 100) > 30) {
				r.push(`You turn your FCTV screen off satisfied that your slave has just completed a job well done. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had a <span class="reputation inc">significant positive impact</span> on public opinion.`);
				if (slave.prestige < 2) {
					slave.prestige = 2;
					slave.prestigeDesc = "$He is a renowned inventor of hyperpregnant sex accessories and toys.";
				}
				repX(10000, "event");
				V.pregInventions = 2;
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 10, arc)) { FutureSocieties.advance('FSRestart', -20, arc); }
				}
				addTrinket(`a cut out magazine cover of your renowned hyperbroodmother inventor, ${slave.slaveName}, and ${his} myriad toys`);
			} else if (slave.porn.prestige >= 3 && random(1, 100) > 15) {
				r.push(`You turn your FCTV screen off satisfied that your slave has done a satisfactory job. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had a <span class="reputation inc">significant impact</span> on public opinion, though only at a local level.`);
				if (slave.prestige < 1) {
					slave.prestige = 1;
					slave.prestigeDesc = "$He is a locally respected inventor of hyperpregnant sex accessories and toys.";
				}
				repX(2500, "event");
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 5, arc)) { FutureSocieties.advance('FSRestart', -10, arc); }
				}
			} else if (slave.porn.prestige >= 3) {
				r.push(`You turn your FCTV screen off disappointed that your slave has done a mediocre job. Over the course of the next several weeks, it becomes clear that <span class="reputation inc">what little impact</span> ${he} has had is on a local scale only.`);
				repX(500, "event");
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 5, arc)) { FutureSocieties.advance('FSRestart', -10, arc); }
				}
			} else if (slave.porn.prestige >= 2 && random(1, 100) > 75) {
				r.push(`You turn your FCTV screen off satisfied that your slave has just finished a job very well done. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had <span class="reputation inc">world-changing</span> consequences.`);
				if (slave.prestige < 3) {
					slave.prestige = 3;
					slave.prestigeDesc = "$He is a world-renowned inventor of hyperpregnant sex accessories and toys.";
				}
				repX(25000, "event");
				V.pregInventions = 3;
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 30, arc)) { FutureSocieties.advance('FSRestart', -60, arc); }
				}
				addTrinket(`a cut out magazine cover of your world-renowned hyperbroodmother inventor, ${slave.slaveName}, and ${his} myriad toys`);
			} else if (slave.porn.prestige >= 2 && random(1, 100) > 50) {
				r.push(`You turn your FCTV screen off satisfied that your slave has just completed a job well done. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had a <span class="reputation inc">significant positive impact</span> on public opinion.`);
				if (slave.prestige < 2) {
					slave.prestige = 2;
					slave.prestigeDesc = "$He is a renowned inventor of hyperpregnant sex accessories and toys.";
				}
				repX(10000, "event");
				V.pregInventions = 2;
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 10, arc)) { FutureSocieties.advance('FSRestart', -20, arc); }
				}
				addTrinket(`a cut out magazine cover of your renowned hyperbroodmother inventor, ${slave.slaveName}, and ${his} myriad toys`);
			} else if (slave.porn.prestige >= 2 && random(1, 100) > 30) {
				r.push(`You turn your FCTV screen off satisfied that your slave has done a satisfactory job. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had a <span class="reputation inc">significant impact</span> on public opinion, though only at a local level.`);
				if (slave.prestige < 1) {
					slave.prestige = 1;
					slave.prestigeDesc = "$He is a locally respected inventor of hyperpregnant sex accessories and toys.";
				}
				repX(2500, "event");
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 5, arc)) { FutureSocieties.advance('FSRestart', -10, arc); }
				}
			} else if (slave.porn.prestige >= 2) {
				r.push(`You turn your FCTV screen off disappointed that your slave has done a mediocre job. Over the course of the next several weeks, it becomes clear that <span class="reputation inc">what little impact</span> ${he} has had is on a local scale only.`);
				repX(500, "event");
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 5, arc)) { FutureSocieties.advance('FSRestart', -10, arc); }
				}
			} else if (random(1, 100) > 90) {
				r.push(`You turn your FCTV screen off satisfied that your slave has just finished a job very well done. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had <span class="reputation inc">world-changing</span> consequences.`);
				if (slave.prestige < 3) {
					slave.prestige = 3;
					slave.prestigeDesc = "$He is a world-renowned inventor of hyperpregnant sex accessories and toys.";
				}
				repX(25000, "event");
				V.pregInventions = 3;
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 30, arc)) { FutureSocieties.advance('FSRestart', -60, arc); }
				}
				addTrinket(`a cut out magazine cover of your world-renowned hyperbroodmother inventor, ${slave.slaveName}, and ${his} myriad toys`);
			} else if (random(1, 100) > 70) {
				r.push(`You turn your FCTV screen off satisfied that your slave has just completed a job well done. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had a <span class="reputation inc">significant positive impact</span> on public opinion.`);
				if (slave.prestige < 2) {
					slave.prestige = 2;
					slave.prestigeDesc = "$He is a renowned inventor of hyperpregnant sex accessories and toys.";
				}
				repX(10000, "event");
				V.pregInventions = 2;
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 10, arc)) { FutureSocieties.advance('FSRestart', -20, arc); }
				}
				addTrinket(`a cut out magazine cover of your renowned hyperbroodmother inventor, ${slave.slaveName}, and ${his} myriad toys`);
			} else if (random(1, 100) > 50) {
				r.push(`You turn your FCTV screen off satisfied that your slave has done a satisfactory job. Over the course of the next several weeks, it becomes clear that ${slave.slaveName}'s appearance on "Husbandry With Milly" has had a <span class="reputation inc">significant impact</span> on public opinion, though only at a local level.`);
				if (slave.prestige < 1) {
					slave.prestige = 1;
					slave.prestigeDesc = "$He is a locally respected inventor of hyperpregnant sex accessories and toys.";
				}
				repX(2500, "event");
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 5, arc)) { FutureSocieties.advance('FSRestart', -10, arc); }
				}
			} else {
				r.push(`You turn your FCTV screen off disappointed that your slave has done a mediocre job. Over the course of the next several weeks, it becomes clear that <span class="reputation inc">what little impact</span> ${he} has had is on a local scale only.`);
				repX(500, "event");
				for (const arc of V.arcologies) {
					if (!FutureSocieties.advance('FSRepopulationFocus', 5, arc)) { FutureSocieties.advance('FSRestart', -10, arc); }
				}
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function interview() {
			const el = document.createElement("p");
			const {title: Master, say: say} = getEnunciation(slave);
			const {hisU, heU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
			r.push(`The interview starts about halfway into a special episode of "Husbandry with Millie." The show's host is introducing a who's who of important figures in the slave breeding community. As you turn on the show, Millie seems to have just completed another interview.`);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`"Everybody, give one last round of applause for renowned breakout porn star 'Twinner Jennie'!" she says. "Who'd have thought an eighteen year old slave could be pregnant with their own eighteen year old cloned sister? Quite a world — thank you again for that fascinating interview! Our next guest on 'Husbandry with Millie' is a clever 'broodmother' class breeding slave and mother of ${num(slave.counter.birthsTotal)} children from the ${V.continent} arcology of '${V.arcologies[0].name}.' Everybody, please give a hearty welcome to ${SlaveFullName(slave)}!"`);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`The first thing that the audience sees of your slave is a colossal ${slave.skin} orb pressing forward through an inadequate-looking faux doorway at the rear of the set. "Husbandry with Millie" is a show about breeders and for breeders, and the host, Millie, has seen pregnant slaves of innumerable sizes and descriptions. Despite this, she does a clear double take as your slave enters, and enters, and enters stage right, ${his} grossly distorted belly seeming to go on forever as it precedes ${him}. ${He} is always growing, and you are constantly increasing the size of ${his} menial entourage to ensure ${his} unhindered mobility. As a result, a veritable platoon of masked menials can be seen throwing themselves into your overladen babyfactory before ${his}`);
			if (slave.boobs >= 20000) {
				r.push(`debilitatingly enormous, mind-boggling breasts`);
			} else if (slave.boobs >= 3000) {
				r.push(`enormous breasts`);
			} else if ((slave.boobsImplant / slave.boobs) >= .60) {
				r.push(`implant-inflated tits`);
			} else {
				r.push(`upper body`);
			}
			r.push(`and`);
			if (slave.face > 80) {
				r.push(`gorgeous face`);
			} else if (slave.face > 40) {
				r.push(`cute face`);
			} else if (slave.face > 1) {
				r.push(`unassuming face`);
			} else {
				r.push(`homely face`);
			}
			r.push(`come into view.`);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`Your slave smiles,`);
			if (hasBothArms(slave)) {
				r.push(`rubbing the side of ${his} belly with one hand while waving at the audience with the other.`);
			} else if (hasAnyArms(slave)) {
				r.push(`alternating between rubbing the side of ${his} belly and waving at the audience.`);
			} else {
				r.push(`pushing one arm stump into the side of ${his} belly while waving the other at the studio audience.`);
			}
			r.push(`After ${he} has entered and taken ${his} place next to the interview couch — rolling forward to lie on ${his} belly so that ${he} can speak at eye level with ${his} interviewer while reclined in relative comfort — more menials enter the stage, carrying portable versions of the specialized maternity swing and moisturizing pool that ${he} has developed.`);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`"Wow!" Millie says, "You're just about ready to pop, aren't you?"`);
			App.Events.addParagraph(el, r);
			r = [];
			if (!canHear(slave) || !canSee(slave)) {
				r.push(`A specially-trained slave from ${slave.slaveName}'s menial entourage quickly relays Millie's words to ${him} in ${canSee(slave) ? `sign` : `contact`} language.`);
			}
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"Mmm,"`),
					`your slave ${say}s,`
				);
			} else {
				r.push(`Your slave nods,`);
			}
			if (hasAnyLegs(slave)) {
				r.push(`crossing ${his} ${legs} over the rearmost swell of ${his} belly,`);
			} else {
				r.push(`bobbling ${his} leg stumps against the rearmost swell of ${his} belly,`);
			}
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"and I'm more and more ready to pop every day."`));
			} else if (hasAnyArms(slave)) {
				r.push(`motioning toward ${his} belly to emphasize the truth of the host's statement.`);
			} else {
				r.push(`waving ${his} stumps at ${his} belly to emphasize the truth of the host's statement.`);
			}
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`"I have to admit, ${slave.slaveName}," Millie says, "you might just be the most heavily pregnant breeder I've ever seen." She motions at your slave's replete body and says: "— May I?"`);
			App.Events.addParagraph(el, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"Please do,"`),
					`your slave ${say}s.`
				);
			} else if (hasAnyArms(slave)) {
				r.push(`Your slave invites the host to touch by patting ${his} belly and then grinning.`);
			} else {
				r.push(`Your slave nods.`);
			}
			r.push(He);
			if (hasAnyArms(slave)) {
				if (slave.boobs >= 20000) {
					r.push(`rubs the bases of ${his} gargantuan breasts in hungry anticipation.`);
				} else if (slave.boobs >= 3000) {
					r.push(`rubs the sides of ${his} enormous breasts in hungry anticipation.`);
				} else if ((slave.boobsImplant / slave.boobs) >= .60) {
					r.push(`rubs the sides of ${his} fat, implanted tits in hungry anticipation.`);
				} else {
					if (slave.nipples !== "fuckable") {
						r.push(`tweaks`);
					} else {
						r.push(`fingers`);
					}
					r.push(`${his} nipples through the sheer fabric of ${his} pretty slave gown while regarding the host with a look of hungry anticipation.`);
				}
			} else {
				if (slave.boobs >= 20000) {
					r.push(`pushes ${his} arm stubs into what little of the sides of ${his} gargantuan breasts ${he} can reach, a look of hungry anticipation on ${his} face.`);
				} else if (slave.boobs >= 3000) {
					r.push(`pushes ${his} arm stubs into the sides of ${his} enormous breasts, a look of hungry anticipation on ${his} face.`);
				} else if ((slave.boobsImplant / slave.boobs) >= .60) {
					r.push(`pushes ${his} arm stubs into the sides of ${his} fat, implanted tits, a look of hungry anticipation on ${his} face.`);
				} else {
					r.push(`rubs ${his} arm stubs against ${his} nipples through ${his} pretty slave gown, a look of hungry anticipation on ${his} face.`);
				}
			}
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`Millie places an appreciative hand on your slave's silk-clad flank. The poor ${girl} is so packed full of children that ${his} brood can be seen pressed in outline along the full swell of ${his} belly, and Millie's hand rests on the embossed figure of one such child. The camera zooms in as its form can be clearly made out pushing through the skin of your slave and against the host's touch. It turns over, allowing her to cup its back in her palm. Your slave flexes ${his}`);
			if (hasAnyLegs(slave)) {
				r.push(legs);
			} else {
				r.push(`back`);
			}
			r.push(`and parts ${his}`);
			if (slave.lips > 95) {
				r.push(`swollen mouth pussy,`);
			} else if (slave.lips > 70) {
				r.push(`swollen lips,`);
			} else if (slave.lips > 20) {
				r.push(`lips,`);
			} else {
				r.push(`thin lips,`);
			}
			r.push(`making no noise. You know ${him} well enough to understand that the combined pleasure and pain from the talk show host's careless touch has caused ${him} to experience one of ${his} "secret little orgasms," and you savor the sight of ${him} squirming as ${he} tries not to let on.`);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`"So, ${slave.slaveName}," Millie says, not taking her eyes off of the slave's incredibly fecund figure, "why don't you tell us about your inventions?"`);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`Your slave bites ${his} lip and gives the talk show host a meaningful look.`);
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"How about I give you a 'hands-on' demonstration instead?"`));
				r.push(`${he} asks.`);
			} else if (hasAnyArms(slave)) {
				r.push(`${He} signs that ${he}'d like to give her a "hands-on demonstration" instead.`);
			} else {
				r.push(`One of ${his} menials pushes ${hisU} body into the breeder's enormous stomach in a possessive manner, then turns to regard Millie. "My`);
				if (getPronouns(slave).noun === "girl") {
					r.push(`mistress`);
				} else {
					r.push(`master`);
				}
				r.push(`would like to give you a 'hands-on' demonstration, instead," ${heU} says.`);
			}
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`The host quirks an eyebrow, then nods. "Alright," she says. "How about we start with that pool of yours?" She then strips her outer layer of clothing, showing off her own famously heavily pregnant figure in an inadequate bra and panties. She makes her way to the curative jelly-filled pool, after your slave has been situated within it. Millie dips a toe into the substance and giggles. "Oh my, it tingles!"`);
			App.Events.addParagraph(el, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"Just wait till you feel it on your belly,"`),
					`your slave ${say}s.`,
					Spoken(slave, `"It feels`),
					App.UI.DOM.makeElement("span", Spoken(slave, `soooo`), "note"),
					Spoken(slave, `good."`),
				);
			} else if (hasAnyArms(slave)) {
				r.push(`${He} signs that the host should get into the pool entirely to feel what it's like on the rest of her swollen body, as well.`);
			} else {
				r.push(`The slave's menial asks the host to get in and feel what it's like on the rest of her swollen body, as well.`);
			}
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`Millie slips into the pool and the camera zooms in as she slowly sidles along its outer edge while being crushed up against your slave's capacious belly. When she's finally seated next to the breeder's vestigial-looking core body, a microphone attached to a boom descends to allow the audience to listen as they continue the interview.`);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`"This feels great," Millie says. "I've been feeling a bit stretched thin, lately, but I can feel all the tension in my belly just slipping away."`);
			App.Events.addParagraph(el, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"This pool is designed to allow slaves to care for their bodies no matter how large they inflate,"`),
					`your slave ${say}s.`,
					Spoken(slave, `"— Are you alright?"`),
					`${he} asks, wearing a look of mock concern on ${his} face.`
				);
			} else if (hasAnyArms(slave)) {
				r.push(`Using the hand farthest from Millie, and with the other conspicuously hidden under the goo, your slave signs that the pool is designed to allow slaves to care for their bodies no matter how large they grow. ${He} then signs a request regarding the host's wellbeing, wearing a look of mocking concern on ${his} face.`);
			} else {
				r.push(`Your slave's speaking assistant explains that the pool is designed to allow slaves and women to care for their bodies no matter how large they inflate. Meanwhile, your slave has been slowly rotating in the pool until ${he} is pressed conspicuously close to the host. The assistant asks if the host is feeling well, a look of mock concern on ${hisU} face.`);
			}
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`"Ah! Um, yes — yep! I'm feeling just fine," Millie says. She's blushing furiously and squirming, and you can just make out the outline of your slave performing some form of teasing shenanigans under the distorting effect of the pool's goo. "So — oooh, yes... ${slave.slaveName}, how did you, um, come up with the idea for this pool?"`);
			App.Events.addParagraph(el, r);
			r = [];
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"I'm always trying to think of ways to keep myself pretty for — oh! — my ${Master},"`),
					`your slave ${say}s, suddenly squirming ${himself}. Millie has slouched down into the pool and is grinning wickedly as she apparently gets revenge.`,
					Spoken(slave, `"This was just the best — um — I mean — the best — oh`),
					App.UI.DOM.makeElement("span", Spoken(slave, `fuck, keep`), "note"),
					Spoken(slave, ` — I mean, the best method I could think of for doing that."`)
				);
			} else if (hasAnyArms(slave)) {
				r.push(`Your slave signs that this was the best method ${he} could think of to keep ${himself} pretty for you, given ${his} size, then starts moaning as a grinning Millie seems to have started enacting her revenge.`);
			} else {
				r.push(`Your slave's speaker explains that this was the best method the broodmother could think of to keep ${himself} pretty for you, given ${his} size. The baby-laden breeder starts moaning in the middle of ${his} assistant's description as a grinning Millie seems to have taken this opportunity to start enacting her revenge.`);
			}
			r.push(`Millie has turned her body sideways and snaked an arm between`);
			if (slave.boobs >= 20000) {
				r.push(`your slave's astoundingly enormous, slimed up cleavage, pumping it up and down to get their unfathomable mass jiggling while she nibbles at and whispers into the squirming baby machine's ear, just loud enough for the mic to pick it up.`);
			} else if (slave.boobs >= 3000) {
				r.push(`your slave's massive, slimed up tits, lewdly abusing one breast while she nibbles at and whispers into the squirming baby machine's ear, just loud enough for the mic to pick it up.`);
			} else if ((slave.boobsImplant / slave.boobs) >= .60) {
				r.push(`your slave's fat, implanted tits, pumping it up and down to get their tightly packed mass bobbing while she nibbles and whispers into the baby machine's ear, just loud enough for the mic to pick it up.`);
			} else {
				r.push(`your slave's breasts, rubbing it up and down one of ${his} pert nipples while she simultaneously toys with the ridge of one of the baby machine's ears and both nibbles on and whispers into the other, just loud enough for the mic to pick it up.`);
			}
			App.Events.addParagraph(el, r);
			r = [];
			r.push(
				`"That's quite something," Millie whispers. "I don't know about you, ${slave.slaveName}, but I think I speak for everyone watching today when I say that now seems like a`,
				App.UI.DOM.makeElement("span", `really good time`, "note"),
				`to try out that other invention of yours."`
			);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`They both exit the pool, dripping clear, slippery gel onto the wood floor of "Husbandry with Millie"'s set. Without a thorough rinsing, your slave's slathered-up belly will be dripping for an hour or more, and ${he} seems to know that as ${he} motions to stop ${his} assistants from wiping ${him} off before strapping ${him} into ${his} aerial gymnastics maternity swing. As a result, when the two visibly panting preggos are strapped into the machine and elevated several`);
			if (V.showInches === 2) {
				r.push(`feet`);
			} else {
				r.push(`meters`);
			}
			r.push(`above the now-visible studio audience, your slave drips a steady stream of goop onto their craning heads.`);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`"Oops!" Millie says. "Looks like we should have warned our audience about a wet zone for this episode. So, ${slave.slaveName}, why don't we show off all the things this advanced maternity swing of yours can do?"`);
			App.Events.addParagraph(el, r);
			r = [];
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"Yes, please,"`));
				r.push(`your slave ${say}s. ${He}'s visibly worked up and ready to go.`);
			} else if (hasAnyArms(slave)) {
				r.push(`${He} signs, indicating fervent interest.`);
			} else {
				r.push(`The mute, limbless slave can only moan inchoately in response, but it's clear ${he}'s more than ready.`);
			}
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`The two then approach each other in mid air, settling into heavy petting and making out before transition into mechanically assisted scissoring. Your hyperbroodmother's unfathomable belly is hanging sideways and down, jiggling madly mere`);
			if (V.showInches === 2) {
				r.push(`inches`);
			} else {
				r.push(`centimeters`);
			}
			r.push(`above the heads of the studio audience. One particularly adventurous audience member reaches up to place a hand on the slave's stomach to feel it bounce in their hands as ${he} gets fucked, and soon other members of the audience are also reaching up to feel the massive organ. The swing slowly rotates the coupling lovers back and forth over the length of the audience's seats, in a circle, and a wave of eager hands reach up as it does so, caressing your breeder's shaking belly as ${he} gets fucked by the show's moaning host. When Millie and your slave finally convulse in mutual orgasm, the camera zooms in on Millie's face for a close-up. She seems exhausted, but she smiles for it anyway.`);
			seX(slave, "vaginal", "public");
			App.Events.addParagraph(el, r);
			r = [];
			r.push(
				`"That was`,
				App.UI.DOM.makeElement("span", Spoken(slave, `fantastic.`), "note"),
				`I'm going to remember that experience for quite some time, and I'm sure our viewers here and at home will, too! Any last things you would like to say before we cut for break?"`
			);
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`The camera rotates to focus on your slave and ${he} shakes ${himself}, apparently regathering ${his} wits.`);
			App.Events.addParagraph(el, r);
			r = [];
			if (FutureSocieties.isActive('FSRepopulationFocus')) {
				if (canTalk(slave)) {
					r.push(`"My ${Master}, ${(SlaveStatsChecker.checkForLisp(slave)) ? lispReplace(PlayerName()) : PlayerName()}, has a vision for a beautiful future where baby-laden broodmothers like me aren't the exception in Free Cities society, but the norm. We both hope that everyone here will support us, and so we've hidden certificates for free pools and swings under everyone's seats — everybody look! If you like what you've seen today as much as we hope you have, my ${Master} and I both hope you'll be filling these inventions with your own slaves' swollen bodies, soon. And we hope that, some day, everyone watching at home will feel this way, as well!"`);
				} else {
					r.push(`Since your slave is unable to speak, ${he} signals the show's video crew to start playing a pre-recorded video in which you explain your vision for a future where specialized hyper-swollen breeding slaves can be found in Free Cities across the world. You then open your arms wide, in the video, and declare that vouchers for free pools and swings have been hidden under the audience's chairs.`);
				}
			} else {
				if (canTalk(slave)) {
					r.push(Spoken(slave, `"My ${Master}, ${(SlaveStatsChecker.checkForLisp(slave)) ? lispReplace(PlayerName()) : PlayerName()}, has a vision for a beautiful future where baby-laden broodmothers like me are all able to enjoy sex with their owners and clients. We both hope that everyone here will support us, and so we've hidden certificates for free pools and swings under everyone's seats — everybody look! If you like what you've seen today as much as we hope you have, my ${Master} and I both hope you'll be filling these inventions with your own slaves swollen bodies, soon. And we hope that, some day, everyone watching at home will enjoy hyperpregnant sex with our new toys, too!"`));
				} else {
					r.push(`Since your slave is unable to speak, ${he} signals the show's video crew to start playing a pre-recorded video in which you explain your vision for a future where specialized hyper-swollen breeding slaves aren't just a sexual novelty, but enjoyable to fuck in their own right. You then open your arms wide, in the video, and declare that vouchers for free pools and swings have been hidden under the audience's chairs.`);
				}
			}
			r.push(`The camera zooms out for a nice panning shot of the audience exclaiming and fawning over the vouchers they've found taped to the bottom of their chairs. Finally, it fades to black.`);

			App.Events.addParagraph(el, r);
			return el;
		}
	}
};
