App.Events.SEWedding = class SEWedding extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.marrying.length > 0
		];
	}

	execute(node) {
		let r = [];
		const brides = V.marrying.map((id) => getSlave(id));
		const slave1 = brides[0];
		const wives = (brides.every(b => b.pronoun === slave1.pronoun)) ? getPronouns(slave1).wives : `spouses`; // are they using the same pronouns? Otherwise, fall back to "spouses" for plural.
		const solo = (V.marrying.length === 1);
		const is = solo ? "is" : "are";
		const s = solo ? "" : "s";
		const notS = solo ? "s" : ""; // "hand dangles" vs "hands dangle". Sometimes we need to hide an s when a plural noun is used.
		const both = (V.marrying.length > 2) ? "all" : "both";

		const {
			HeC,
			heC, hisC, himC
		} = getPronouns(solo ? slave1 : {pronoun: App.Data.Pronouns.Kind.plural}).appendSuffix("C"); // "C" is for collective. Used for flexibility in scenes that may have just one slave, or more than one. "she/they bow before you."
		const wivesC = solo
			? getPronouns(slave1).wife
			: getPronouns({pronoun: App.Data.Pronouns.Kind.plural}).wives;

		const belly = bellyAdjective(slave1);
		const ML = V.marrying.length;

		let PCChest;
		if (V.PC.boobs >= 300) {
			PCChest = `breasts`;
		} else if (V.PC.title === 0) {
			PCChest = `flat chest`;
		} else {
			PCChest = `strong chest`;
		}

		/** @type {string} Describes names of those being wedded in a sentence, "tom, dick and harry" */
		const namesString = toSentence(brides.map(b => b.slaveName));
		const fullNamesString = toSentence(brides.map(b => SlaveFullName(b)));

		if (V.seeImages === 1) {
			App.Events.drawEventArt(node, brides);
		}

		if (V.marrying.every(id => getSlave(id).slaveName === getSlave(V.marrying[0]).slaveName)) { // All slaves share same name
			/* To do? */
		}

		if (ML === 2 && slave1.relationshipTarget === V.marrying[1]) {
			r.push(`In the days leading up to your wedding, ${namesString} spent their time`);
			if (slave1.relationship <= 2) {
				r.push(`excitedly planning together, as`);
				if (slave1.relationship === 2) {
					r.push(`best`);
				}
				r.push(`friends do.`);
			} else {
				r.push(`having less sex and spending more time preparing for the upcoming event.`);
			}
			slave1.relationship = 0;
			brides[1].relationship = 0;
		} else {
			for (let i = 0; i < ML; i++) {
				const slave = brides[i];
				const {his} = getPronouns(slave);
				if (i === 0) {
					r.push(`In the days leading up to your wedding, ${slave.slaveName} spent ${his} time`);
				} else {
					r.push(`${slave.slaveName}, meanwhile, spent ${his} time`);
				}
				r.push(weddingIntro(slave));
			}
		}

		if (V.weddingPlanned === 3 && brides.some(b => !isFertile(b))) {
			if (brides.every(b => !isFertile(b))) {
				r.push(`None of your slaves can`);
			} else {
				r.push(`At least one of your slaves can no longer`);
			}
			r.push(`be impregnated as planned for the ceremony, so it has been hurriedly recast as a normal slave wedding.`);
			V.weddingPlanned = 1;
			App.Events.addParagraph(node, r);
			r = [];
		}

		// Intro
		{
			r.push(`The ceremony to bind ${fullNamesString} to you as your slave ${wivesC}`);
			if (V.weddingPlanned === 3) { // Impregnation ceremony
				r.push(`and ${hisC} womb${s} to you as your private breeding ground is a polite affair which you host in the lower floor of your penthouse.`);
				if (FutureSocieties.isActive('FSRestart') && (slave1.breedingMark === 0 || V.propOutcome === 0)) {
					r.push(`Barely anyone is there, mostly lower-class citizens, several accompanied by their slaves. Many of your other slaves, that is your slaves who are not being married and fucked pregnant tonight, are present to serve your guests, but are dressed more conservatively than usual. There is a distinct air of unrest in the room, as if the absent Elites' distaste of your actions came in their place.`);
				} else {
					r.push(`All the arcology's most prominent citizens are there, most with a favored slave or two and some even with their slave wives. Many of your other slaves, that is your slaves who are not being married and fucked pregnant tonight, are present to serve your guests, but are dressed more conservatively than usual. When assignations between citizen and slave develop, guests are politely encouraged to perform them in side rooms rather than out in view of the main gathering.`);
				}
				App.Events.addParagraph(node, r);
				r = [];
			} else if (V.weddingPlanned === 2) { // Orgiastic ceremony
				r.push(`is an all day affair.`);
			} else if (V.weddingPlanned === 1) { // Straightforward ceremony
				r.push(`is a polite affair which you host in the lower floor of your penthouse. All the arcology's most prominent citizens are there, most with a favored slave or two and some even with their slave wives. Many of your other slaves, that is your slaves who are not being married tonight, are present to serve your guests, but are dressed more conservatively than usual. When assignations between citizen and slave develop, guests are politely encouraged to perform them in side rooms rather than out in view of the main gathering.`);
				App.Events.addParagraph(node, r);
				r = [];
			}
		}


		if ([1, 3].includes(V.weddingPlanned)) {
			// Procession, outfits
			r.push(`${namesString} appear${notS} after everyone has had a chance to socialize,`);
			if (brides.some(b => !hasAnyLegs(b))) { // anyone missing a leg?
				const leglessNames = [];
				for (const slave of brides) {
					if (!hasAnyLegs(slave)) {
						leglessNames.push(slave.slaveName);
					}
				}
				r.push(toSentence(leglessNames));
				r.push(`cannot walk on their own and are helped by`);
				const legNames = [];
				if (brides.some(b => hasAnyLegs(b))) {
					for (const slave of brides) {
						if (hasAnyLegs(slave)) {
							legNames.push(slave.slaveName);
						}
					}
					r.push(toSentence(legNames));
				} else {
					r.push(`other slaves`);
				}
				r.push(`since`);
				if (brides.every(b => !hasAnyLegs(b))) {
					r.push(`they're ${both}`);
					if (brides.every(b => isAmputee(b))) {
						r.push(`quadruple`);
					} else if (brides.every(b => !hasBothArms(b))) {
						r.push(`triple`);
					} else if (brides.every(b => hasBothArms(b))) {
						r.push(`double`);
					}
					r.push(`amputees and cannot walk,`);
				} else {
					for (const bride of brides.filter(b => !hasAnyLegs(b))) {
						const {he} = getPronouns(bride);
						r.push(`${bride.slaveName}'s a`);
						if (isAmputee(bride)) {
							r.push(`quadruple`);
						} else if (!hasBothArms(bride)) {
							r.push(`triple`);
						} else {
							r.push(`double`);
						}
						r.push(`amputee and ${he} cannot walk,`);
					}
				}
			}

			r.push(`wearing beautiful bridal lingerie in`);
			if (!solo && brides.every((b) => b.vagina === 0)) {
				r.push(`white, since ${both} the slaves are virgins.`);
			} else if (!solo && brides.every((b) => b.pregKnown === 1)) {
				r.push(`light pink, since ${both} the slaves are pregnant.`);
			} else if (!solo && brides.every((b) => b.vagina < 0 && b.anus === 0)) {
				r.push(`white, since ${both} the slaves are anal virgins.`);
			} else if (!solo && brides.every((b) => b.vagina < 0 && b.boobs > 500)) {
				r.push(`electric blue, since ${both} the slaves are shemales.`);
			} else if (!solo && brides.every((b) => b.vagina < 0)) {
				r.push(`pale blue, since ${both} the slaves are sissies.`);
			} else if (!solo && brides.every((b) => b.dick > 0)) {
				r.push(`hot pink, since ${both} the slaves are futas.`);
			} else if (!solo && brides.every((b) => b.vagina > 0 || b.anus > 0)) {
				r.push(`light pink, since ${both} the slaves are experienced sex slaves.`);
			} else {
				const colors = [];
				for (const slave of brides) {
					if (slave.vagina === 0) {
						colors.push(`white, since ${slave.slaveName} is a virgin`);
					} else if (slave.pregKnown === 1) {
						colors.push(`light pink, since ${slave.slaveName} is pregnant`);
					} else if (slave.vagina < 0 && slave.anus === 0) {
						colors.push(`white, since ${slave.slaveName} is an anal virgin`);
					} else if (slave.vagina < 0 && slave.boobs > 500) {
						colors.push(`electric blue, since ${slave.slaveName} is a shemale`);
					} else if (slave.vagina < 0) {
						colors.push(`pale blue, since ${slave.slaveName} is a sissy slave`);
					} else if (slave.dick > 0) {
						colors.push(`hot pink, since ${slave.slaveName} is a futa slave`);
					} else {
						colors.push(`light pink, since ${slave.slaveName} is an experienced sex slave`);
					}
				}
				r.push(`${toSentence(colors)}.`);
			}

			r.push(`A filmy veil covers ${hisC} heads and shoulders, and`);
			if (!solo && brides.every((b) => b.boobs > 4000)) {
				r.push(`their lacy bridal bras are a marvel of engineering, discreetly reinforced to support their gigantic udders.`);
			} else if (!solo && brides.every((b) => b.boobs > 1200)) {
				r.push(`their lacy bridal bras just barely restrain their huge boobs, leaving the tops of their areolae visible.`);
			} else if (!solo && brides.every((b) => b.boobs > 400)) {
				r.push(`their lacy bridal bras flatter their pretty breasts.`);
			} else if (!solo && brides.every((b) => b.boobs <= 400)) {
				r.push(`their lacy bridal bras flatter their pretty chests.`);
			} else {
				const bras = [];
				for (const slave of brides) {
					const {his} = getPronouns(slave);

					if (slave.boobs > 4000) {
						bras.push(`${slave.slaveName}'s lacy bridal bra is a marvel of engineering, discreetly reinforced to support ${his} gigantic udders`);
					} else if (slave.boobs > 1200) {
						bras.push(`${slave.slaveName}'s lacy bridal bra just barely restrains ${his} huge boobs, leaving the tops of ${his} areolae visible`);
					} else if (slave.boobs > 400) {
						bras.push(`${slave.slaveName}'s lacy bridal bra flatters ${his} pretty breasts`);
					} else {
						bras.push(`${slave.slaveName}'s lacy bridal bra flatters ${his} pretty chest`);
					}
				}
				r.push(`${toSentence(bras, ", while ")}.`);
			}

			if (!solo && brides.every((b) => b.bellyPreg >= 600000)) {
				r.push(`Their expansive, squirming pregnant bellies make their bridal wear particularly obscene.`);
			} else if (!solo && brides.every((b) => b.bellyPreg >= 1500)) {
				r.push(`Their ${belly} pregnant bellies protrude out the front of their bridal wear.`);
			} else if (!solo && brides.every((b) => b.bellyImplant >= 1500)) {
				r.push(`Their ${belly} ${slave1.bellyImplant}cc bellies implant protrude their middle out the front of their bridal wear.`);
			} else if (!solo && brides.every((b) => b.bellyFluid >= 10000)) {
				r.push(`Their hugely bloated, ${slave1.inflationType}-filled bellies protrude out the front of their bridal wear.`);
			} else if (!solo && brides.every((b) => b.bellyFluid >= 5000)) {
				r.push(`Their bloated, ${slave1.inflationType}-stuffed bellies protrude out the front of their bridal wear.`);
			} else if (!solo && brides.every((b) => b.bellyFluid >= 1500)) {
				r.push(`Their distended, ${slave1.inflationType}-bellies protrude out the front of their bridal wear.`);
			} else {
				const bellies = [];
				for (let i = 0; i < ML; i++) {
					const slave = brides[i];
					const {his} = getPronouns(slave);
					if (slave.bellyPreg >= 600000) {
						bellies.push(`${slave.slaveName}'s expansive, squirming pregnant belly makes ${his} bridal wear particularly obscene`);
					} else if (slave.bellyPreg >= 1500) {
						bellies.push(`${slave.slaveName}'s ${belly} pregnant belly protrudes out the front of ${his} bridal wear`);
					} else if (slave.bellyImplant >= 1500) {
						bellies.push(`${slave.slaveName}'s ${belly} ${slave.bellyImplant}cc belly implant protrudes ${his} middle out the front of ${his} bridal wear`);
					} else if (slave.bellyFluid >= 10000) {
						bellies.push(`${slave.slaveName}'s hugely bloated, ${slave.inflationType}-filled belly protrudes out the front of ${his} bridal wear`);
					} else if (slave.bellyFluid >= 5000) {
						bellies.push(`${slave.slaveName}'s bloated, ${slave.inflationType}-stuffed belly protrudes out the front of ${his} bridal wear`);
					} else if (slave.bellyFluid >= 1500) {
						bellies.push(`${slave.slaveName}'s distended, ${slave.inflationType}-belly protrudes out the front of ${his} bridal wear`);
					}
				}
				if (bellies.length > 0) {
					r.push(`${toSentence(bellies, ", while ")}.`);
				}
			}

			if (!solo && brides.every((b) => b.chastityPenis)) {
				r.push(`Their slave dicks are hidden by their chastity cages.`);
			} else if (!solo && brides.every(b => canAchieveErection(b))) {
				if (slave1.dick > 4 && slave1.belly >= 5000) {
					r.push(`They are hugely erect, with their lacy g-string only serving to hold their dick agonizingly pressed against the bottom of their ${belly}`);
					if (slave1.bellyPreg >= 3000) {
						r.push(`pregnant`);
					}
					r.push(`bellies.`);
				} else if (slave1.dick > 4) {
					r.push(`Their are hugely erect, with their lacy g-string only serving to hold their dicks upright along their bellies.`);
				} else {
					r.push(`Their erections tent the front of their lacy g-strings.`);
				}
			} else if (!solo && brides.every((b) => b.dick > 0)) {
				if (slave1.dick > 10) {
					r.push(`Their huge soft cocks are allowed to dangle freely as no g-string could hope to contain them.`);
				} else if (slave1.dick > 4) {
					r.push(`Their big soft cocks form a lewd mass, stuffed into their lacy g-strings.`);
				} else if (slave1.dick <= 3) {
					r.push(`Their lacy g-strings perfectly conceals their soft dicks.`);
				}
			} else if (!solo && brides.every((b) => b.clit > 1)) {
				r.push(`Their huge clits are quite hard, making them shift uncomfortably as their lacy g-strings stimulate them.`);
			} else if (!solo && brides.every((b) => b.clit <= 1)) {
				r.push(`Their lacy g-strings cover their womanhoods demurely.`);
			} else {
				const dicks = [];
				for (const slave of brides) {
					const {his, him} = getPronouns(slave);
					r.push(`${slave.slaveName}'s`);
					if (slave.chastityPenis) {
						dicks.push(`slave dick is hidden by its chastity cage`);
					} else if (canAchieveErection(slave)) {
						if (slave.dick > 4 && slave.belly >= 5000) {
							dicks.push(`hugely erect, with ${his} lacy g-string only serving to hold ${his} dick agonizingly pressed against the bottom of ${his} ${belly}`);
							if (slave.bellyPreg >= 3000) {
								dicks.push(`pregnant`);
							}
							dicks.push(`belly`);
						} else if (slave.dick > 4) {
							dicks.push(`hugely erect, with ${his} lacy g-string only serving to hold ${his} dick upright along ${his} belly`);
						} else {
							dicks.push(`erection tents the front of ${his} lacy g-string`);
						}
					} else if (slave.dick > 0) {
						if (slave.dick > 10) {
							dicks.push(`huge soft cock is allowed to dangle freely as no g-string could hope to contain it`);
						} else if (slave.dick > 4) {
							dicks.push(`big soft cock forms a lewd mass, stuffed into ${his} lacy g-string`);
						} else {
							dicks.push(`lacy g-string perfectly conceals ${his} soft dick`);
						}
					} else {
						if (slave.clit > 1) {
							dicks.push(`huge clit is quite hard, making ${him} shift uncomfortably as ${his} lacy g-string stimulates it`);
						} else {
							dicks.push(`lacy g-string covers ${his} womanhood demurely`);
						}
					}
				}
				r.push(`${toSentence(dicks, ", while ")}.`);
			}

			r.push(`There is no aisle for ${himC} to`);
			if (!brides.every(b => hasAnyLegs(b))) {
				r.push(`be carried`);
			} else {
				r.push(`walk`);
			}
			r.push(`down, just a small space at the head of the room where you're standing alone, and there's no one to`);
			if (!brides.every(b => hasAnyLegs(b))) {
				r.push(`walk alongside ${himC} carrying`);
			} else {
				r.push(`walk`);
			}
			r.push(`${himC} there; this symbolizes ${hisC} submission to you`);

			if (!solo && brides.every((b) => b.fetish === Fetish.MINDBROKEN)) {
				r.push(`despite the fact that ${both} the slaves had to be pushed into walking towards you.`);
			} else if (!solo && brides.every((b) => b.devotion + b.trust >= 175)) {
				r.push(`of ${both} the slaves' own choice, and they do so with smiles.`);
			} else if (!solo && brides.every((b) => b.devotion < -20 && b.trust > 20)) {
				r.push(`of ${both} the slaves' own choice, and they do so with hesitation.`);
			} else if (!solo && brides.every((b) => b.devotion < -20)) {
				r.push(`of ${both} the slaves' own (forced) choice, and they do so with wavering steps.`);
			} else if (!solo && brides.every((b) => b.devotion >= -20)) {
				r.push(`of ${both} the slaves' own choice, and they do so willingly.`);
			} else {
				for (let i = 0; i < ML; i++) {
					const slave = brides[i];
					const {he, his} = getPronouns(slave);
					const end = (i + 1 === ML) ? "." : ",";

					if (i === 0) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`despite the fact that ${slave.slaveName} had`);
						} else {
							r.push(`of ${slave1.slaveName}'s`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`while ${slave.slaveName} has`);
						} else {
							r.push(`while ${slave.slaveName} does this of ${his}`);
						}
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`to be pushed into walking towards you${end}`);
					} else if (slave.devotion + slave.trust >= 175) {
						r.push(`own choice, and ${he} does so with a smile${end}`);
					} else if (slave.devotion < -20 && slave.trust > 20) {
						r.push(`own choice, and ${he} does so with hesitation${end}`);
					} else if (slave.devotion < -20) {
						r.push(`own (forced) choice, and ${he} does so with wavering steps${end}`);
					} else {
						r.push(`own choice, and ${he} does so willingly${end}`);
					}
				}
			}
			App.Events.addParagraph(node, r);
			r = [];

			// Positioning
			if (V.weddingPlanned === 3) {
				r.push(`When ${heC} ${is} in front of you,`);
				if (brides.every(b => !hasAnyLegs(b))) {
					r.push(`the slaves carrying ${hisC} legless torso${s} set${notS} ${himC} down on the floor and prop ${himC} up so ${hisC} head${s} ${is} level with your crotch.`);
				} else if (!solo && brides.every((b) => b.fetish === Fetish.MINDBROKEN)) {
					r.push(`you push them onto their knees so their heads are level with your crotch.`);
				} else if (!solo && brides.every((b) => b.devotion + b.trust >= 175)) {
					r.push(`they happily get down on their knees so their heads are level with your crotch.`);
				} else if (!solo && brides.every((b) => b.devotion < -20 && b.trust > 20)) {
					r.push(`they slowly lower themselves onto their knees so their heads are level with your crotch.`);
				} else if (!solo && brides.every((b) => b.devotion < -20)) {
					r.push(`they quickly lower themselves onto their knees so their tear-streaked faces are level with your crotch.`);
				} else if (!solo && brides.every((b) => b.devotion >= -20)) {
					r.push(`they get down on their knees so their heads are level with your crotch.`);
				} else {
					const floor = [];
					for (const slave of brides) {
						const {
							he, his, him, himself
						} = getPronouns(slave);
						const knees = (hasBothLegs(slave)) ? "knees" : "knee";

						if (!hasAnyLegs(slave)) {
							floor.push(`the slave carrying ${slave.slaveName}'s legless torso sets ${him} down on the floor in front of you and props ${him} up so ${his} head is level with your crotch`);
						} else {
							if (slave.fetish === Fetish.MINDBROKEN) {
								floor.push(`you push ${slave.slaveName} onto ${his} ${knees} so ${his} head`);
							} else if (slave.devotion + slave.trust >= 175) {
								floor.push(`${slave.slaveName} happily gets down on ${his} ${knees} so ${his} head`);
							} else if (slave.devotion < -20 && slave.trust > 20) {
								floor.push(`${he} slowly lowers ${himself} onto ${his} ${knees} so ${his} head`);
							} else if (slave.devotion < -20) {
								floor.push(`${he} quickly lowers ${himself} onto ${his} ${knees} so ${his} tear-streaked face`);
							} else {
								floor.push(`${he} gets down on ${his} ${knees} so ${his} head`);
							}
							floor.push(floor.pop() + ` is level with your crotch`);
						}
					}
					r.push(`${toSentence(floor)}.`);
				}
			} else if (V.weddingPlanned === 1) {
				r.push(`When ${heC} ${is} in front of you,`);
				if (!brides.every(b => hasAnyLegs(b))) {
					r.push(`the slaves carrying ${hisC}`);
					if (brides.every(b => isAmputee(b))) {
						r.push(`limbless`);
					} else {
						r.push(`legless`);
					}
					r.push(`torso${s} sets ${himC} down on the floor in front of you and prop${s} ${himC} up so ${hisC} head${s} ${is} level with your crotch.`);
				} else {
					r.push(`${heC} get${notS} down on ${hisC} knees so ${hisC} head${s} ${is} level with your crotch.`);
				}
			}

			// Vows
			if ([1, 3].includes(V.weddingPlanned)) {
				r.push(`${capFirstChar(V.assistant.name)} reads the short recitation for ${himC}, and you place a simple steel ring`);
				r.push(...ringCeremony());
				App.Events.addNode(node, r, "div");
				r = [];
				if (V.PC.slaveSurname && brides.some(b => b.slaveSurname !== V.PC.slaveSurname)) {
					r.push(giveName());
				}
			}

			if (V.weddingPlanned === 3) { // Impregnation ceremony
				if (!solo && brides.every((b) => b.fetish === Fetish.MINDBROKEN)) {
					const {He, he, his, him} = getPronouns(slave1);
					const knees = (hasBothLegs(slave1)) ? "knees" : "knee";
					r.push(`The slaves are mindbroken, so you gather them up and hold them in front of you, pulling their panties off as you do. They follow your motions like ragdolls. You maneuver your dick inside ${slave1.slaveName} first while holding ${him} against your`);
					if (V.PC.boobs >= 300) {
						r.push(`breasts.`);
					} else if (V.PC.title === 0) {
						r.push(`flat chest.`);
					} else {
						r.push(`strong chest.`);
					}
					r.push(`Then you pull ${his} ${knees} up to give your guests a good view as you fuck ${his} fertile`);
					if (slave1.mpreg === 1) {
						r.push(`asshole.`);
					} else {
						r.push(`cunt.`);
					}
					r.push(`${He} is left to face them, staring off into space. Though ${he} faces the crowd, ${his} mind is empty; this might as well be any other fucking to ${him}. ${He} twitches ever so slightly when your seed flows into ${him}, orgasming robotically to <span class="green">applause from your guests.</span>`);
					for (let i = 1; i < ML; i++) {
						const slave = brides[i];
						const {
							He,
							his, him
						} = getPronouns(slave);
						r.push(`Next, you turn your attention to ${slave.slaveName}. You pull ${him} in, pushing your dick into ${his}`);
						if ((slave.mpreg === 1 && slave.anus === 0) || slave.vagina === 0) {
							r.push(`virgin`);
						} else if ((slave.mpreg === 1 && slave.anus === 1) || slave.vagina === 1) {
							r.push(`tight`);
						}
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`cunt.`);
						}
						r.push(`${He} doesn't respond, and ${his} reaction when you fill ${his}`);
						if (slave.mpreg) {
							r.push(`ass`);
						} else {
							r.push(`pussy`);
						}
						r.push(`with more jizz to <span class="green">more applause from your guests</span> is entirely mechanical.`);
					}
					r.push(`You'll fuck ${himC} repeatedly over the next few days, ensuring impregnation.`);
				} else if (!solo && brides.every((b) => b.devotion + b.trust >= 175)) {
					r.push(`Then, you`);
					const {
						He,
						he, his, him, himself
					} = getPronouns(slave1);
					const knees = (hasBothLegs(slave1)) ? "knees" : "knee";
					if (!hasAnyLegs(slave1)) {
						r.push(`gather ${slave1.slaveName} up and hold ${him} in front of you, pulling ${his} panties off as you do. Showing considerable dexterity, you maneuver your dick inside ${him} while holding ${him} against your`);
						if (V.PC.boobs >= 300) {
							r.push(`breasts.`);
						} else if (V.PC.title === 0) {
							r.push(`flat chest.`);
						} else {
							r.push(`strong chest.`);
						}
					} else {
						r.push(`take ${slave1.slaveName}'s hand and pull ${him} to their feet while ${he} shimmies out of ${his} panties. ${He} cocks their hips for you and you slide your cock inside ${him} before taking ${his} ${knees} and drawing`);
						if (hasBothLegs(slave1)) {
							r.push(`them`);
						} else {
							r.push(`it`);
						}
						r.push(`up to hold ${him} in midair, impaled on you.`);
					}
					r.push(`${He} is left to face your guests, watching raptly as you fuck ${his} fertile`);
					if (slave1.mpreg === 1) {
						r.push(`asshole.`);
					} else {
						r.push(`cunt.`);
					}
					r.push(`Though ${his} face is towards the crowd, ${his} mind is concentrated on your hard cock, pumping in and out of ${him} at an angle; to ${him}, it's <span class="mediumaquamarine">concrete proof that ${he}'s special to you.</span> ${He} gasps when your seed flows into ${him}, orgasming ${himself} to <span class="green">applause from your guests.</span>`);
					for (let i = 1; i < ML; i++) {
						const slave = brides[i];
						const {he, his, him} = getPronouns(slave);
						r.push(`Next, you turn your attention to ${slave.slaveName}. You`);
						if (!hasAnyLegs(slave1) && !hasAnyLegs(slave)) {
							r.push(`also`);
						}
						if (!hasAnyLegs(slave)) {
							r.push(`pick ${him} up and`);
						} else {
							r.push(`pull ${him} to ${his} feet and`);
						}
						r.push(`pull ${his} g-string off in one swift motion, then maneuver your already-hard cock into ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`pussy.`);
						}
						r.push(`You fuck ${him}, hard, then fill ${him} to the brim <span class="green">while your audience gives another round of applause.</span> This cemented the idea that <span class="mediumaquamarine">${he}'s also special to you</span> in ${his} mind.`);
					}
					r.push(`You'll fuck them repeatedly over the next few days, ensuring impregnation.`);
				} else if (!solo && brides.every((b) => b.devotion < -20 && b.trust > 20)) {
					const {
						He,
						he, his, him
					} = getPronouns(slave1);
					const knees = (hasBothLegs(slave1)) ? "knees" : "knee";
					r.push(`The slaves are unwilling, so you gather ${slave1.slaveName} up and hold ${him} in front of you, pulling ${his} panties off as you do. ${He} was crying before, but this causes ${him} to tremble and tear up in anticipation of what's next. Ignoring this, you maneuver your dick inside ${him} while holding ${him} against your`);
					if (V.PC.boobs >= 300) {
						r.push(`breasts.`);
					} else if (V.PC.title === 0) {
						r.push(`flat chest.`);
					} else {
						r.push(`strong chest.`);
					}
					if (hasAnyLegs(slave1)) {
						r.push(`Then you pull ${his} ${knees} up to give your guests a good view of the consummation.`);
					}
					r.push(`${He} is left to face them, watching sullenly as you fuck ${his} fertile`);
					if (slave1.mpreg === 1) {
						r.push(`asshole.`);
					} else {
						r.push(`cunt.`);
					}
					r.push(`Though ${his} face is towards the crowd, ${his} mind is concentrated on your hard cock, pumping in and out of ${him} at an angle; to ${him}, this is torture. ${He} gasps when your seed flows into ${him}, faking an orgasm to <span class="green">applause from your guests.</span> At this, ${he} shoots you a dirty look, blaming you for this indignity.`);
					for (let i = 1; i < ML; i++) {
						const slave = brides[i];
						const {
							He,
							his, him
						} = getPronouns(slave);
						r.push(`You've already moved on to ${slave.slaveName}, however. ${He} had watched timidly as you had fucked ${slave1.slaveName}, but when you grab ${him}, ${he} begins to cry softly. You ignore this, of course, and instead focus on pushing your already-hard cock into ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`pussy.`);
						}
						r.push(`You can tell ${he} is trying ${his} hardest not to sob outright, and sure enough, a small sob escapes ${his} lips when you fill ${him} to the brim to the <span class="green">applause of your guests.</span>`);
					}
					r.push(`You'll fuck them repeatedly over the next few days, ensuring impregnation, despite their efforts to defy you.`);
				} else if (!solo && brides.every((b) => b.devotion < -20)) {
					const {
						He,
						he, his, him, women
					} = getPronouns(slave1);
					const knees = (hasBothLegs(slave1)) ? "knees" : "knee";
					r.push(`The`);
					if (brides.every(b => b.pronoun === slave1.pronoun)) {
						r.push(`${women}`);
					} else {
						r.push(`slaves`);
					}
					r.push(`are unwilling, so you gather ${slave1.slaveName} up and hold ${him} in front of you, pulling ${his} panties off as you do. ${He} was crying before, but this causes ${him} to tremble and sob loudly in anticipation of what's next. Ignoring this, you maneuver your dick inside ${him} while holding ${him} against your`);
					if (V.PC.boobs >= 300) {
						r.push(`breasts.`);
					} else if (V.PC.title === 0) {
						r.push(`flat chest.`);
					} else {
						r.push(`strong chest.`);
					}
					if (hasAnyLegs(slave1)) {
						r.push(`Then you pull ${his} ${knees} up to give your guests a good view of the consummation.`);
					}
					r.push(`${He} is left to face them, watching sullenly as you fuck ${his} fertile`);
					if (slave1.mpreg === 1) {
						r.push(`asshole.`);
					} else {
						r.push(`cunt.`);
					}
					r.push(`Though ${his} face is towards the crowd, ${his} mind is concentrated on your hard cock, pumping in and out of ${him} at an angle; to ${him}, this is torture. ${He} gasps when your seed flows into ${him}, orgasming unwillingly to <span class="green">applause from your guests.</span> At this, ${he} completely breaks down, blubbering like a child at the unwelcome warmth in ${his} lower belly.`);
					for (let i = 1; i < ML; i++) {
						const slave = brides[i];
						const {he, his, him} = getPronouns(slave);
						r.push(`You then turn your attention to ${slave.slaveName}. ${He} had watched timidly as you had fucked ${slave1.slaveName}, but when you grab ${him}, ${he} begins to cry softly. You ignore this, of course, and instead focus on pushing your already-hard cock into ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`pussy.`);
						}
						r.push(`You can tell ${he} is trying ${his} hardest not to sob outright, and sure enough, a small sob escapes ${his} lips when you fill ${him} to the brim to the <span class="green">applause of your guests.</span>`);
					}
					r.push(`You'll fuck them repeatedly over the next few days, ensuring impregnation, despite their protesting.`);
				} else if (!solo && brides.every((b) => b.devotion >= -20)) {
					const {
						He,
						he, his, him, wife
					} = getPronouns(slave1);
					const knees = (hasBothLegs(slave1)) ? "knees" : "knee";
					r.push(`Your ${wives}-to-be aren't particularly excited about what's coming, but they're fully prepared for it and have accepted it as a fact of life. There are worse things one can be than the slave-${wife} of a wealthy arcology owner. You`);
					if (!hasAnyLegs(slave1)) {
						r.push(`gather ${slave1.slaveName} up and hold ${him} in front of you, pulling ${his} panties off as you do. Showing considerable dexterity, you maneuver your dick inside ${him} while holding ${him} against your`);
						if (V.PC.boobs >= 300) {
							r.push(`breasts.`);
						} else if (V.PC.title === 0) {
							r.push(`flat chest.`);
						} else {
							r.push(`strong chest.`);
						}
					} else {
						r.push(`take ${slave1.slaveName}'s hand and pull ${him} to ${his} feet while ${he} shimmies out of ${his} panties. ${He} cocks ${his} hips for you and you slide your cock inside ${him} before taking ${his} ${knees} and drawing`);
						if (hasBothLegs(slave1)) {
							r.push(`them`);
						} else {
							r.push(`it`);
						}
						r.push(`up to hold ${him} in midair, impaled on you.`);
					}
					r.push(`Though ${his} face is towards the crowd, their mind is concentrated on your hard cock, pumping in and out of ${him} at an angle; to ${him}, it's just another part of being your slave. ${He} gasps when your seed flows into ${him}, orgasming shortly after to <span class="green">applause from your guests.</span>`);
					for (let i = 1; i < ML; i++) {
						const slave = brides[i];
						const {his, him} = getPronouns(slave);
						r.push(`Next, you turn your attention to ${slave.slaveName}. You`);
						if (!hasAnyLegs(brides[i - 1]) && !hasAnyLegs(slave)) {
							r.push(`also`);
						}
						if (!hasAnyLegs(slave)) {
							r.push(`pick ${him} up, then`);
						} else {
							r.push(`pull ${him} to ${his} feet and`);
						}
						r.push(`pull ${his} g-string off in one swift motion, then maneuver your already-hard cock into ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`pussy.`);
						}
						r.push(`You fuck ${him}, hard, then fill ${him} to the brim <span class="green">while your audience gives another round of applause.</span>`);
					}
					r.push(`You'll fuck them repeatedly over the next few days, ensuring impregnation.`);
				} else {
					for (let i = 0; i < ML; i++) {
						const slave = brides[i];
						const {
							He,
							he, his, him, himself, wife
						} = getPronouns(slave);
						const knees = (hasBothLegs(slave)) ? "knees" : "knee";
						if (i !== 0) {
							r.push(`Then, you turn your attention to ${slave.slaveName}.`);
						}
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is mindbroken, so you gather ${him} up and hold ${him} in front of you, pulling ${his} panties off as you do. ${He} follows your motions like a ragdoll. You maneuver your dick inside ${him} while holding ${him} against your`);
							if (V.PC.boobs >= 300) {
								r.push(`breasts.`);
							} else if (V.PC.title === 0) {
								r.push(`flat chest.`);
							} else {
								r.push(`strong chest.`);
							}
							r.push(`Then you pull ${his} ${knees} up to give your guests a good view as you fuck ${his} fertile`);
							if (slave.mpreg === 1) {
								r.push(`asshole.`);
							} else {
								r.push(`cunt.`);
							}
							r.push(`${He} is left to face them, staring off into space. Though ${he} faces the crowd, ${his} mind is empty; this might as well be any other fucking to ${him}. ${He} twitches ever so slightly when your seed flows into ${him}, orgasming robotically to <span class="green">applause from your guests.</span>`);
						} else if (slave.devotion + slave.trust >= 175) {
							r.push(`Then, you`);
							if (!hasAnyLegs(slave)) {
								r.push(`gather ${him} up and hold ${him} in front of you, pulling ${his} panties off as you do. Showing considerable dexterity, you maneuver your dick inside ${him} while holding ${him} against your ${PCChest}.`);
							} else {
								r.push(`take ${his} hand and pull ${him} to ${his} feet while ${he} shimmies out of ${his} panties. ${He} cocks ${his} hips for you and you slide your cock inside ${him} before taking ${his} ${knees} and drawing`);
								if (hasBothLegs(slave)) {
									r.push(`them`);
								} else {
									r.push(`it`);
								}
								r.push(`up to hold ${him} in midair, impaled on you.`);
							}
							r.push(`${He} is left to face your guests, watching raptly as you fuck ${his} fertile`);
							if (slave.mpreg === 1) {
								r.push(`asshole.`);
							} else {
								r.push(`cunt.`);
							}
							r.push(`Though ${his} face is towards the crowd, ${his} mind is concentrated on your hard cock, pumping in and out of ${him} at an angle; to ${him}, it's <span class="mediumaquamarine">concrete proof that ${he}'s special to you.</span> ${He} gasps when your seed flows into ${him}, orgasming ${himself} to <span class="green">applause from your guests.</span>`);
						} else if (slave.devotion < -20 && slave.trust > 20) {
							r.push(`${slave.slaveName} is unwilling, so you gather ${him} up and hold ${him} in front of you, pulling ${his} panties off as you do. ${He} was crying before, but this causes ${him} to tremble and tear up in anticipation of what's next. Ignoring this, you maneuver your dick inside ${him} while holding ${him} against your ${PCChest}. Then you pull`);
							if (hasAnyLegs(slave)) {
								r.push(`${his} ${knees}`);
							} else {
								r.push(`${him}`);
							}
							r.push(`up to give your guests a good view of the consummation. ${He} is left to face them, watching sullenly as you fuck ${his} fertile`);
							if (slave.mpreg === 1) {
								r.push(`asshole.`);
							} else {
								r.push(`cunt.`);
							}
							r.push(`Though ${his} face is towards the crowd, ${his} mind is concentrated on your hard cock, pumping in and out of ${him} at an angle; to ${him}, this is torture. ${He} gasps when your seed flows into ${him}, faking an orgasm to <span class="green">applause from your guests.</span> At this, ${he} shoots you a dirty look, blaming you for this indignity.`);
						} else if (slave.devotion < -20) {
							r.push(`${slave.slaveName} is unwilling, so you gather ${him} up and hold ${him} in front of you, pulling ${his} panties off as you do. ${He} was crying before, but this causes ${him} to tremble and sob loudly in anticipation of what's next. Ignoring this, you maneuver your dick inside ${him} while holding ${him} against your ${PCChest}.`);
							if (hasAnyLegs(slave)) {
								r.push(`Then you pull ${his} ${knees} up to give your guests a good view of the consummation.`);
							}
							r.push(`${He} is left to face them, watching sullenly as you fuck ${his} fertile`);
							if (slave.mpreg === 1) {
								r.push(`asshole.`);
							} else {
								r.push(`cunt.`);
							}
							r.push(`Though ${his} face is towards the crowd, ${his} mind is concentrated on your hard cock, pumping in and out of ${him} at an angle; to ${him}, this is torture. ${He} gasps when your seed flows into ${him}, orgasming unwillingly <span class="green">applause from your guests.</span> At this, ${he} completely breaks down, blubbering like a child at the unwelcome warmth in ${his} lower belly.`);
						} else {
							r.push(`${slave.slaveName} isn't particularly excited about what's coming, but ${he}'s fully prepared for it and accepted it as a fact of life. There are worse things one can be than the slave-${wife} of a wealthy arcology owner. You`);
							if (!hasAnyLegs(slave)) {
								r.push(`gather ${him} up and hold ${him} in front of you, pulling ${his} panties off as you do. Showing considerable dexterity, you maneuver your dick inside ${him} while holding ${him} against your ${PCChest}.`);
							} else {
								r.push(`take ${his} hand and pull ${him} to ${his} feet while ${he} shimmies out of ${his} panties. ${He} cocks ${his} hips for you and you slide your cock inside ${him} before taking ${his} ${knees} and drawing`);
								if (hasBothLegs(slave)) {
									r.push(`them`);
								} else {
									r.push(`it`);
								}
								r.push(`up to hold ${him} in midair, impaled on you.`);
							}
							r.push(`Though ${his} face is towards the crowd, ${his} mind is concentrated on your hard cock, pumping in and out of ${him} at an angle; to ${him}, it is what it is. ${He} gasps when your seed flows into ${him}, orgasming shortly after to <span class="green">applause from your guests.</span>`);
						}
					}

					r.push(`You'll fuck them repeatedly over the next few days, ensuring`);
					if (brides.every(b => b.devotion < -20)) {
						r.push(`impregnation, despite their protests.`);
					} else if (brides.some(b => b.devotion < -20)) {
						const lowDevNames = brides
							.filter(slave => slave.devotion < -20)
							.map(slave => slave.slaveName);
						r.push(`impregnation, despite ${toSentence(lowDevNames)}'s`);
						if (slave1.trust > 20) {
							r.push(`efforts to defy you.`);
						} else {
							r.push(`protests.`);
						}
					} else {
						r.push(`impregnation.`);
					}
				}
				for (const slave of brides) {
					knockMeUp(slave, 100, 2, -1);
				}
				if (brides.every((b) => b.vagina === 0 || (b.mpreg === 1 && b.anus === 0))) {
					r.push(`Naturally, the ceremony <span class="lime">took ${hisC} virginities;</span>`);
					if (!solo && brides.every((b) => b.fetish === Fetish.MINDBROKEN)) {
						r.push(`they didn't notice.`);
					} else if (!solo && brides.every((b) => b.devotion + b.trust >= 175)) {
						r.push(`they were very happy <span class="hotpink">their first time was with you and so special.</span>`);
						brides.forEach(slave => slave.devotion += 5);
					} else if (!solo && brides.every((b) => b.devotion < -20 && b.trust > 20)) {
						r.push(`they were <span class="mediumorchid">saving that for someone special.</span>`);
						brides.forEach(slave => slave.devotion -= 5);
					} else if (!solo && brides.every((b) => b.devotion < -20)) {
						r.push(`they wept at the`);
						if (brides.every(b => canSee(b))) {
							r.push(`sight`);
						} else {
							r.push(`feeling`);
						}
						r.push(`of cum pooling from their <span class="mediumorchid">defiled`);
						if (slave1.mpreg === 1) {
							r.push(`assholes.</span>`);
						} else {
							r.push(`pussies.</span>`);
						}
						brides.forEach(slave => slave.devotion -= 10);
					} else if (!solo && brides.every((b) => b.devotion >= -20)) {
						r.push(`they were glad you made it <span class="hotpink">enjoyable</span> at least.`);
						brides.forEach(slave => slave.devotion += 2);
					} else {
						const cum = [];
						for (let i = 0; i < ML; i++) {
							const slave = brides[i];
							const {his} = getPronouns(slave);

							if (slave.fetish === Fetish.MINDBROKEN) {
								r.push(`${slave.slaveName} didn't notice,`);
							} else if (slave.devotion + slave.trust >= 175) {
								r.push(`${slave.slaveName} was very happy <span class="hotpink">${his} first time was with you and so special</span>`);
								slave.devotion += 5;
							} else if (slave.devotion < -20 && slave.trust > 20) {
								r.push(`${slave.slaveName} was <span class="mediumorchid">saving that for someone special</span>`);
								slave.devotion -= 5;
							} else if (slave.devotion < -20) {
								r.push(`${slave.slaveName} wept at the ${(canSee(slave)) ? `sight` : `feeling`} of cum pooling from ${his} <span class="mediumorchid">defiled ${(slave.mpreg === 1) ? `asshole</span>` : `pussy</span>`}`);
								slave.devotion -= 10;
							} else {
								r.push(`${slave.slaveName} was glad you made it <span class="hotpink">enjoyable</span> at least`);
								slave.devotion += 2;
							}
						}
						r.push(`${toSentence(cum, ", while ")}.`);
					}
					for (const slave of brides) {
						if (slave.mpreg === 1) {
							slave.anus = 1;
						} else {
							slave.vagina = 1;
						}
					}
				} else {
					for (const slave of brides) {
						const {he, his} = getPronouns(slave);
						if (slave.vagina === 0 || (slave.mpreg === 1 && slave.anus === 0)) {
							r.push(`Naturally, the ceremony <span class="lime">took ${slave.slaveName}'s virginity;</span>`);
							if (slave.fetish === Fetish.MINDBROKEN) {
								r.push(`${he} didn't notice.`);
							} else if (slave.devotion + slave.trust >= 175) {
								r.push(`${he} was so happy <span class="hotpink">${his} first time was with you and so special.</span>`);
								slave.devotion += 5;
							} else if (slave.devotion < -20 && slave.trust > 20) {
								r.push(`${he} was <span class="mediumorchid">saving that for someone special.</span>`);
								slave.devotion -= 5;
							} else if (slave.devotion < -20) {
								r.push(`${he} wept at the`);
								if (canSee(slave)) {
									r.push(`sight`);
								} else {
									r.push(`feeling`);
								}
								r.push(`of cum pooling from ${his} <span class="mediumorchid">defiled`);
								if (slave.mpreg === 1) {
									r.push(`asshole.</span>`);
								} else {
									r.push(`pussy.</span>`);
								}
								slave.devotion -= 10;
							} else {
								r.push(`you made it <span class="hotpink">enjoyable</span> at least.`);
								slave.devotion += 2;
							}
							if (slave.mpreg === 1) {
								slave.anus = 1;
							} else {
								slave.vagina = 1;
							}
						}
					}
				}

				if (!solo && brides.every((b) => b.fetish === "pregnancy" && b.fetishStrength > 60)) {
					if (brides.every((b) => b.devotion + b.trust >= 175)) {
						r.push(`As pregnancy fetishists, <span class="hotpink">they confidently believe this wedding will be the high point of their lives.</span>`);
						brides.forEach(slave => slave.devotion += 20);
					} else if (brides.every((b) => b.devotion < -20 && b.trust > 20)) {
						r.push(`As hateful pregnancy fetishists, <span class="hotpink">getting pregnant was the best part of the ceremony.</span>`);
						brides.forEach(slave => slave.devotion += 1);
					} else if (brides.every((b) => b.devotion < -20)) {
						r.push(`As pregnancy fetishists, getting raped pregnant by someone they hate leave them with very mixed feelings.`);
					} else if (brides.every((b) => b.devotion >= -20)) {
						r.push(`As pregnancy fetishists, <span class="hotpink">they thoroughly enjoyed getting knocked up in such an ostentatious fashion.</span>`);
						brides.forEach(slave => slave.devotion += 10);
					} else {
						const pregFet = [];
						r.push(`As pregnancy fetishists, `);
						for (const slave of brides) {
							const {he, his, him} = getPronouns(slave);
							if (slave.devotion + slave.trust >= 175) {
								r.push(`<span class="hotpink">${slave.slaveName} confidently believes this wedding will be the high point of ${his} life</span>`);
								slave.devotion += 20;
							} else if (slave.devotion < -20 && slave.trust > 20) {
								r.push(`<span class="hotpink">in spite of ${his} hate, getting pregnant was the best part of the ceremony for ${slave.slaveName}</span>`);
								slave.devotion += 1;
							} else if (slave.devotion < -20) {
								r.push(`for ${slave.slaveName}, getting raped pregnant by someone ${he} hates leaves ${him} with very mixed feelings`);
							} else {
								r.push(`<span class="hotpink">${slave.slaveName} thoroughly enjoyed getting knocked up in such an ostentatious fashion</span>`);
								slave.devotion += 10;
							}
						}
						r.push(`${toSentence(pregFet, ", whereas ")}.`);
					}
				} else {
					for (const slave of brides) {
						const {his, him} = getPronouns(slave);
						if (slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
							if (slave.devotion + slave.trust >= 175) {
								r.push(`As a pregnancy fetishist, <span class="hotpink">${slave.slaveName} confidently believes this wedding will be the high point of ${his} life.</span>`);
								slave.devotion += 20;
							} else if (slave.devotion < -20 && slave.trust > 20) {
								r.push(`As a hateful pregnancy fetishist, <span class="hotpink">getting pregnant was the best part of the ceremony</span> for ${slave.slaveName}.`);
								slave.devotion += 1;
							} else if (slave.devotion < -20) {
								r.push(`As a pregnancy fetishist, getting raped pregnant by someone ${slave.slaveName} hates leaves ${him} with very mixed feelings.`);
							} else {
								r.push(`As a pregnancy fetishist, <span class="hotpink">${slave.slaveName} thoroughly enjoyed getting knocked up in such an ostentatious fashion.</span>`);
								slave.devotion += 10;
							}
						}
					}
				}
			} else if (V.weddingPlanned === 1) {
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`Then, you flip ${hisC} veil${s} over ${hisC} head${s} so ${heC} can`);
				if (V.PC.dick !== 0) {
					r.push(`suck your dick`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eat you out`);
				}
				r.push(`in front of your guests, as the ceremony requires.`);
				if (!solo && brides.every((b) => b.fetish === Fetish.MINDBROKEN)) {
					r.push(`${HeC} approach ${hisC} task with robotic obedience. You climax promptly,`);
					if (V.PC.dick !== 0) {
						r.push(`shooting your cum down ${slave1.slaveName}'s throat.`);
					} else {
						r.push(`covering ${slave1.slaveName}'s face in girlcum.`);
					}
					r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wives} to carry them back into the master bedroom. They absentmindedly rest their heads against your ${PCChest} as you cradle them in your arms${(brides.every(b => canSee(b))) ? `, gazing up at you with empty eyes` : ``}.`); // TODO: will need a rewrite
				} else if (!solo && brides.every((b) => b.devotion + b.trust >= 175)) {
					r.push(`${HeC} approach ${hisC} task`);
					if (slave1.fetish === "cumslut") {
						r.push(`enthusiastically,`);
					} else {
						r.push(`with a will,`);
					}
					r.push(`and you climax promptly,`);
					if (V.PC.dick !== 0) {
						r.push(`shooting your cum down ${slave1.slaveName}'s throat.`);
					} else {
						r.push(`covering ${slave1.slaveName}'s face in girlcum.`);
					}
					r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, at the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wives} to carry them back into the master bedroom. They rest their head against your ${PCChest}`);
					r.push(`as you cradle them in your arms${(brides.every(b => canSee(b))) ? `, staring up at you` : ``}`); // TODO: will need a rewrite
				} else if (!solo && brides.every((b) => b.devotion < -20 && b.trust > 20)) {
					const {
						He,
						his, him
					} = getPronouns(slave1);
					r.push(`${HeC} approach ${hisC} task with apprehension, so much so that things are taking too long, so you grab ${slave1.slaveName}'s head and facefuck ${him} instead. ${He} gags and sputters, tears running down ${his} cheeks, as you violate ${his} mouth publicly. You climax promptly,`);
					if (V.PC.dick !== 0) {
						r.push(`shooting your cum down ${his} throat.`);
					} else {
						r.push(`covering ${his} face in girlcum.`);
					}
					r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wives} to carry them back into the master bedroom. They`);
					if (brides.every(b => canSee(b))) {
						r.push(`look up at you with fearful, hate-filled eyes,`);
					} else {
						r.push(`seems to be`);
					}
					r.push(`blaming you for everything that has happened so far.`);// TODO: will need a rewrite
				} else if (!solo && brides.every((b) => b.devotion < -20)) {
					const {
						He,
						his, him
					} = getPronouns(slave1);
					r.push(`${HeC} approach ${hisC} task with apprehension, so much so that things are taking too long, so you grab ${slave1.slaveName}'s head and facefuck ${him} instead. ${He} gags and sputters, tears running down ${his} cheeks, as you violate ${his} mouth publicly. You climax promptly,`);
					if (V.PC.dick !== 0) {
						r.push(`shooting your cum down ${his} throat.`);
					} else {
						r.push(`covering ${his} face in girlcum.`);
					}
					r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wives} to carry them back into the master bedroom. They`);
					if (brides.every(b => canSee(b))) {
						r.push(`look up at you with fearful, tear-filled eyes`);
					} else {
						r.push(`seem`);
					}
					r.push(`as if pleading for you not to do this.`); // TODO: will need a rewrite
				} else if (!solo && brides.every((b) => b.devotion >= -20)) {
					r.push(`${HeC} approach ${hisC} task`);
					if (slave1.fetish === "cumslut") {
						r.push(`enthusiastically,`);
					} else {
						r.push(`obediently,`);
					}
					r.push(`and you climax promptly,`);
					if (V.PC.dick !== 0) {
						r.push(`shooting your cum down their throat.`);
					} else {
						r.push(`covering their face in girlcum.`);
					}
					r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wives} to carry them back into the master bedroom. They look`);
					if (brides.every(b => canSee(b))) {
						r.push(`up at you, their eyes`);
					}
					r.push(`unsure.`); // TODO: will need a rewrite
				} else {
					for (let i = 0; i < ML; i++) {
						const slave = brides[i];
						const {
							He,
							his, him, wife
						} = getPronouns(slave);
						if (ML === 1) {
							r.push(`${slave.slaveName} approaches ${his} task`);
						} else {
							if (i === 0) {
								r.push(`${slave.slaveName} is first. ${He} approaches ${his} task`);
							} else {
								r.push(`Next, it's ${slave.slaveName}'s turn. ${He} takes on ${his} task`);
							}
						}
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`with robotic obedience. You climax promptly,`);
							if (V.PC.dick !== 0) {
								r.push(`shooting your cum down ${his} throat.`);
							} else {
								r.push(`covering ${his} face in girlcum.`);
							}
							r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He} absentmindedly rests ${his} head against your ${PCChest} as you cradle ${him} in your arms${(canSee(slave)) ? `, gazing up at you with empty eyes` : ``}.`);
						} else if (slave.devotion + slave.trust >= 175) {
							if (slave.fetish === "cumslut") {
								r.push(`enthusiastically,`);
							} else {
								r.push(`with a will,`);
							}
							r.push(`and you climax promptly,`);
							if (V.PC.dick !== 0) {
								r.push(`shooting your cum down ${his} throat.`);
							} else {
								r.push(`covering ${his} face in girlcum.`);
							}
							r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, at the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He} rests ${his} head against your ${PCChest} as you cradle ${him} in your arms${(canSee(slave)) ? `, staring up at you` : ``}.`);
						} else if (slave.devotion < -20 && slave.trust > 20) {
							r.push(`with apprehension, so much so that things are taking too long, so you grab ${his} head and facefuck ${him} instead. ${He} gags and sputters, tears running down ${his} cheeks, as you violate ${his} mouth publicly. You climax promptly,`);
							if (V.PC.dick !== 0) {
								r.push(`shooting your cum down ${his} throat.`);
							} else {
								r.push(`covering ${his} face in girlcum.`);
							}
							r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He}`);
							if (canSee(slave)) {
								r.push(`looks up at you with fearful, hate-filled eyes,`);
							} else {
								r.push(`seems to be`);
							}
							r.push(`blaming you for everything that has happened so far.`);
						} else if (slave.devotion < -20) {
							r.push(`with apprehension, so much so that things are taking too long, so you grab ${his} head and facefuck ${him} instead. ${He} gags and sputters, tears running down ${his} cheeks, as you violate ${his} mouth publicly. You climax promptly,`);
							if (V.PC.dick !== 0) {
								r.push(`shooting your cum down ${his} throat.`);
							} else {
								r.push(`covering ${his} face in girlcum.`);
							}
							r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He}`);
							if (canSee(slave)) {
								r.push(`looks up at you with fearful, tear-filled eyes`);
							} else {
								r.push(`seems`);
							}
							r.push(`as if pleading for you not to do this.`);
						} else {
							if (slave.fetish === "cumslut") {
								r.push(`enthusiastically,`);
							} else {
								r.push(`obediently,`);
							}
							r.push(`and you climax promptly,`);
							if (V.PC.dick !== 0) {
								r.push(`shooting your cum down ${his} throat.`);
							} else {
								r.push(`covering ${his} face in girlcum.`);
							}
							r.push(`Your guests and their attendant slaves <span class="green">applaud at the consummation,</span> or rather, the first stage of the consummation. The balance will take place privately, however, and you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He} looks`);
							if (canSee(slave)) {
								r.push(`up at you, ${his} eyes`);
							}
							r.push(`unsure.`);
						}
					}
				}
			}

			if (V.weddingPlanned === 3 || V.weddingPlanned === 1) {
				if (brides.some(b => b.relationship !== 0)) {
					if (slave1.relationshipTarget === V.marrying[1]) {
						if (!solo && brides.every((b) => b.fetish === Fetish.MINDBROKEN)) {
							// TODO: write these
						} else if (!solo && brides.every((b) => b.devotion + b.trust >= 175)) {
							r.push(`The fact that their relationship together now involves you <span class="hotpink">excites them to no end.</span>`);
							brides.forEach(slave => slave.devotion += 10);
						} else if (!solo && brides.every((b) => b.devotion < -20 && b.trust > 20)) {
							// TODO: write these
						} else if (!solo && brides.every((b) => b.devotion < -20)) {
							r.push(`The fact that you would allow them to remain together, albeit as your ${wives}, <span class="hotpink">causes them to begin to see you in a new light.</span>`);
							brides.forEach(slave => slave.devotion += 15);
						} else if (!solo && brides.every((b) => b.devotion >= -20)) {
							r.push(`The fact that you would allow them to remain together, albeit as your ${wives}, has them <span class="hotpink">cautiously optimistic for the future.</span>`);
							brides.forEach(slave => slave.devotion += 5);
						} else {
							const reactions = [];
							for (let i = 0; i < ML; i++) {
								const slave = brides[i];
								const {he} = getPronouns(slave);

								if (slave.devotion + slave.trust >= 175) {
									reactions.push(`${slave.slaveName} is excited by the fact that their relationship now involves you, and promises to try to get others to see you the same way ${he} does`);
									slave.devotion += 10;
								} else if (slave.devotion < -20) {
									reactions.push(`${slave.slaveName} is convinced this is some sort of trick`);
								} else if (slave.devotion >= -20) {
									reactions.push(`${slave.slaveName} is only <span class="hotpink">cautiously optimistic for their future together</span>`);
									slave.devotion += 5;
								}
							}
							r.push(`${toSentence(reactions, ", while")}.`);
						}
					} else {
						for (const slave of brides) {
							const {
								he, his
							} = getPronouns(slave);
							if (slave.relationship !== 0) {
								if (slave.devotion + slave.trust >= 175) {
									if (slave.relationship > 0) {
										const relSlave = getSlave(slave.relationshipTarget);
										if (relSlave) {
											const {his2} = getPronouns(relSlave).appendSuffix("2");
											r.push(`${slave.slaveName}'s`);
											if (slave.relationship > 2) {
												r.push(`ex`);
											} else {
												r.push(`friend`);
											}
											r.push(`is <span class="mediumorchid">disappointed</span> that their relationship had to end and <span class="gold">worries</span> for ${his2} ${(slave.relationship > 2) ? `ex` : `companion`}'s future.`);
											if (slave.relationship === 4) {
												relSlave.devotion -= 5;
												relSlave.trust -= 5;
											} else if (slave.relationship === 3) {
												relSlave.devotion -= 3;
												relSlave.trust -= 3;
											} else {
												relSlave.devotion -= 1;
												relSlave.trust -= 1;
											}
										}
									}
								} else if (slave.devotion < -20) {
									if (slave.relationship === -1) {
										r.push(`${slave.slaveName} <span class="mediumorchid">hates</span> that ${he} has to be yours only and <span class="gold">fears</span> what will happen if ${he} strays.`);
										slave.devotion -= 40;
										slave.trust -= 40;
									} else if (slave.relationship > 0) {
										const relSlave = getSlave(slave.relationshipTarget);
										if (relSlave) {
											const {his2} = getPronouns(relSlave).appendSuffix("2");
											if (slave.relationship === 4) {
												r.push(`Both ${slave.slaveName} and ${his} ex <span class="mediumorchid">resent</span> that their relationship had to end and <span class="gold">fear</span> for each other's future. ${relSlave.slaveName} is especially <span class="mediumorchid">furious</span> to watch ${his2} life's love get stolen away and fucked pregnant in such a manner.`);
												relSlave.devotion -= 60;
												relSlave.trust -= 40;
												slave.devotion -= 40;
												slave.trust -= 40;
											} else if (slave.relationship === 3) {
												r.push(`Both ${slave.slaveName} and ${his} ex <span class="mediumorchid">resent</span> that their relationship had to end and <span class="gold">fear</span> for each other's future. ${relSlave.slaveName} is especially <span class="mediumorchid">hurt</span> after watching ${his2} life's love get stolen away and fucked pregnant in such a manner.`);
												relSlave.devotion -= 30;
												relSlave.trust -= 30;
												slave.devotion -= 50;
												slave.trust -= 30;
											} else {
												r.push(`Both ${slave.slaveName} and ${his} friend <span class="mediumorchid">resent</span> that their relationship had to end and <span class="gold">fear</span> for each other's future.`);
												relSlave.devotion -= 20;
												relSlave.trust -= 20;
												slave.devotion -= 20;
												slave.trust -= 20;
											}
										}
									}
								} else {
									if (slave.relationship === -1) {
										r.push(`${slave.slaveName} <span class="mediumorchid">dislikes</span> that ${he} has to be yours only and <span class="gold">worries</span> what will happen if ${he} strays.`);
										slave.devotion -= 10;
										slave.trust -= 10;
									} else if (slave.relationship > 0) {
										const relSlave = getSlave(slave.relationshipTarget);
										if (relSlave) {
											const {him2, his2} = getPronouns(relSlave).appendSuffix("2");
											if (slave.relationship === 4) {
												r.push(`Both ${slave.slaveName} and ${his} ex are <span class="mediumorchid">resent</span> that their relationship had to end and <span class="gold">worry</span> for each other. ${relSlave.slaveName} is especially <span class="mediumorchid">hurt</span> after watching ${his2} life's love get stolen away and fucked pregnant in such a manner.`);
												relSlave.devotion -= 20;
												relSlave.trust -= 20;
												slave.devotion -= 30;
												slave.trust -= 20;
											} else if (slave.relationship === 3) {
												r.push(`Both ${slave.slaveName} and ${his} ex are <span class="mediumorchid">are saddened</span> that their relationship had to end and <span class="gold">worry</span> for each other. ${relSlave.slaveName} is a little <span class="mediumorchid">jealous</span> of you for snagging such catch out from under ${him2}.`);
												relSlave.devotion -= 10;
												relSlave.trust -= 10;
												slave.devotion -= 15;
												slave.trust -= 10;
											} else {
												r.push(`Both ${slave.slaveName} and ${his} friend are <span class="mediumorchid">are disappointed</span> that their relationship had to end and <span class="gold">worry</span> for each other.`);
												relSlave.devotion -= 5;
												relSlave.trust -= 5;
												slave.devotion -= 5;
												slave.trust -= 5;
											}
										}
									}
								}
							}
						}
					}
				}
			}

			if (V.weddingPlanned === 3) { // Impregnation ceremony
				for (const slave of brides) {
					slave.relationship = -3;
					seX(slave, slave.mpreg ? "anal" : "vaginal", V.PC);
					repX(1250, "event", slave);
					makeTrinkets(slave);
				}
				if (FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1 && brides.some(b => b.breedingMark === 0 || V.propOutcome === 0)) {
					r.push(`You have <span class="red">infuriated</span> the Societal Elite by this public showing of everything they stand against.`);
					V.failedElite += 500;
				} else if (FutureSocieties.isActive('FSRestart') && (brides.some(b => b.breedingMark === 1))) {
					r.push(`The Societal Elite are <span class="green">very pleased</span> with this public display of their values.`); // TODO: not happy with this sentence
					V.failedElite -= 250;
				}
			} else if (V.weddingPlanned === 1) { // Straightforward ceremony
				for (const slave of brides) {
					slave.relationship = -3;
					seX(slave, "oral", V.PC);
					repX(2000, "event", slave);
					makeTrinkets(slave);
				}
			}
		} else if (V.weddingPlanned === 2) { // Orgiastic ceremony
			if (
				brides.every((b) => b.fetish === Fetish.MINDBROKEN) ||
				brides.every((b) => b.devotion + b.trust >= 175) ||
				brides.every((b) => b.devotion < -20 && b.trust > 20) ||
				brides.every((b) => b.devotion < -20) ||
				brides.every((b) => b.devotion >= -20)
			) {
				if (slave1.fetish === Fetish.MINDBROKEN) {
					// TODO: rewrite for slaves that can't walk
					r.push(`They spent the day before resting and preparing themselves, if you can call sitting around mindlessly preparing. They spend most of the day-long party at the center of a nonstop gangbang, occasionally moaning as more of a physical reaction than anything. The theory is that they'll be bound to you as your slave ${wives} from this day onward, so they must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, your guests take part with enthusiasm, completely unhampered by your slave's utter emptiness. Many brought their own slaves to participate, too. ${namesString} spend hours with numerous cocks inside them, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, they are extracted and taken off to be bathed.`);
					App.Events.addParagraph(node, r);
					r = [];
					r.push(`They return shortly, looking exhausted but otherwise uncaring. They're naked still, their skin clean, and are`);
					if (!brides.every(b => hasAnyLegs(b))) {
						r.push(`carried`);
					} else {
						r.push(`led`);
					}
					r.push(`to you for the ceremony by other slaves. The only evident signs that they've had sex with more than a hundred people today is their asses, which look rather well traveled, and their tiredness. They can't conceal their tiredness, and lean against you subconsciously. ${capFirstChar(V.assistant.name)} reads the short recitation for them, and you place a simple steel ring`);
					r.push(...ringCeremony());
					App.Events.addParagraph(node, r);
					r = [];
					// TODO: marked for rewrite
					r.push(`Once the ceremony is complete, you scoop up your new slave ${wives} to carry them back into the master bedroom. They rest their heads against your ${PCChest} as you cradle them in your arms, and by the time they're home, they're fast asleep. You set them gently down on the bed and curl up behind them, feeling the animal warmth of their bodies as the exhausted slaves' chest rise and fall with their breathing.`);
				} else if (slave1.devotion + slave1.trust >= 175) {
					// TODO: rewrite for slaves that can't walk
					r.push(`They spent the day before resting and preparing themselves, and this was a necessary precaution. They spend most of the day-long party at the center of a nonstop gangbang. The theory is that they'll be bound to you as your slave ${wives} from this day onward, so they must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, <span class="green">your guests take part with enthusiasm,</span> many having brought their own slaves to participate, too. ${namesString} spend hours with numerous cocks inside them, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, they're extracted and taken off to be bathed.`);
					App.Events.addParagraph(node, r);
					r = [];
					r.push(`They return shortly, looking exhausted but rather proud of themselves for getting through all that. They're naked still, their skin clean, and`);
					if (brides.every(b => !hasAnyLegs(b))) {
						r.push(`are carried`);
					} else {
						r.push(`come confidently`);
					}
					r.push(`to stand by you for the ceremony. The only evident signs that they've had sex with more than a hundred people today is their asses, which look rather well-traveled, and their tiredness. They do their best to conceal how ready to sleep they are, but they lean against you a little. ${capFirstChar(V.assistant.name)} reads the short recitation for them, and you place a simple steel ring`);
					r.push(...ringCeremony());
					App.Events.addParagraph(node, r);
					r = [];
					// TODO: marked for rewrite
					r.push(`Once the ceremony is complete, you scoop up your new slave ${wives} to carry them back into the master bedroom. They rest their heads against your ${PCChest} as you cradle them in your arms, and by the time they're home, they're fast asleep. You set them gently down on the bed and curl up behind them, feeling the animal warmth of their bodies as the exhausted slave's chest rises and falls with their breathing.`);
				} else if (slave1.devotion < -20 && slave1.trust > 20) {
					// TODO: rewrite for slaves that can't walk
					r.push(`They spent the day before resting and trying to ready themselves, and this was a necessary precaution. They spend most of the day-long party at the center of a nonstop gangbang, screaming mixed cries of pleasure and horror. The theory is that they'll be bound to you as your slave ${wives} from this day onward, so they must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, your guests take part with enthusiasm, completely unhampered by your slave's utter unwillingness. Many brought their own slaves to participate, too. ${namesString} spend hours with numerous cocks inside them, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, they're extracted and taken off to be bathed.`);
					App.Events.addParagraph(node, r);
					r = [];
					r.push(`They return shortly, looking exhausted and annoyed. They're naked still, their skin clean, and come reluctantly to stand by you for the ceremony, glaring at you the whole time. The only evident signs that they've had sex with more than a hundred people today is their asses, which look rather well traveled, and their tiredness. They do their best to conceal their tiredness and look stronger than they are, choosing to struggle to stand instead of leaning against you. ${capFirstChar(V.assistant.name)} reads the short recitation for them, and you place a simple steel ring`);
					r.push(...ringCeremony());
					App.Events.addParagraph(node, r);
					r = [];
					// TODO: marked for rewrite
					r.push(`Once the ceremony is complete, you scoop up your new, protesting, slave ${wives} to carry them back into the master bedroom. They rest their heads against your ${PCChest}, simply too tired to care anymore. By the time they're home, they're fast asleep. You set them gently down on the bed and curl up behind them, feeling the animal warmth of their bodies as the exhausted slaves' chests rise and fall with their breathing. They squirm slightly in their sleep to the unwelcome feeling of your arm around them.`);
				} else if (slave1.devotion < -20) {
					// TODO: rewrite for slaves that can't walk
					r.push(`They spent the day before resting and crying to themselves, and this was a necessary precaution. They spend most of the day-long party at the center of a nonstop gangbang, screaming mixed cries of pleasure and horror. The theory is that they'll be bound to you as your slave ${wives} from this day onward, so they must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, your guests take part with enthusiasm, completely unhampered by your slave's utter unwillingness. Many brought their own slaves to participate, too. ${namesString} spend hours with numerous cocks inside them, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, they're extracted and taken off to be bathed.`);
					App.Events.addParagraph(node, r);
					r = [];
					r.push(`They return shortly, looking exhausted and depressed. They're naked still, their skin clean, and come reluctantly to stand by you for the ceremony, just wanting it to be over. The only evident signs that they've had sex with more than a hundred people today is their asses, which look rather well traveled, and their tiredness. They do their best to conceal their tiredness out of fear of punishment, and they lean against you for support despite their feelings on the wedding and you. ${capFirstChar(V.assistant.name)} reads the short recitation for them, and you place a simple steel ring`);
					r.push(...ringCeremony());
					App.Events.addParagraph(node, r);
					r = [];
					// TODO: marked for rewrite
					r.push(`Once the ceremony is complete, you scoop up your new slave ${wives} to carry them back into the master bedroom. They rest their head against your ${PCChest}, simply too tired to care anymore. By the time they're home, they're fast asleep. You set them gently down on the bed and curl up behind them, feeling the animal warmth of their bodies as the exhausted slaves' chest rise and fall with their breathing.`);
				} else {
					// TODO: rewrite for slaves that can't walk
					r.push(`They spent the day before resting and reluctantly preparing themselves, and this was a necessary precaution. They spend most of the day-long party at the center of a nonstop gangbang, moaning and wincing as they takes cock after cock. The theory is that they'll be bound to you as your slave ${wives} from this day onward, so they must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, your guests take part with enthusiasm, completely unhampered by your slave's lack of passion. Many brought their own slaves to participate, too. ${namesString} spend hours with numerous cocks inside them, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, they're extracted and taken off to be bathed.`);
					App.Events.addParagraph(node, r);
					r = [];
					r.push(`They return shortly, looking exhausted. They're naked still, their skin clean, and come to stand by you for the ceremony. The only evident signs that they've had sex with more than a hundred people today is their asses, which look rather well traveled, and their tiredness. They do their best to conceal it, leaning against you despite the lack of love between you.`);
					// TODO: double check the devotion requirements for this, rewrite as needed
					r.push(`${capFirstChar(V.assistant.name)} reads the short recitation for them, and you place a simple steel ring`);
					r.push(...ringCeremony());
					App.Events.addParagraph(node, r);
					r = [];
					// TODO: marked for rewrite
					r.push(`Once the ceremony is complete, you scoop up your new slave ${wives} to carry them back into the master bedroom. They rest their head against you, so tired that they're grateful for the break from standing. By the time they're home, they're fast asleep. You set them gently down on the bed and curl up behind them, feeling the animal warmth of their bodies as the exhausted slaves' chest rise and fall with their breathing.`);
				}
			} else {
				// TODO: this section will need a major rewrite
				for (let i = 0; i < ML; i++) {
					const slave = brides[i];
					const {
						He,
						he, his, him, himself, wife
					} = getPronouns(slave);

					if (i === 0) {
						r.push(slave1.slaveName);
					} else {
						r.push(`${slave.slaveName}, meanwhile,`);
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`spent the day before resting and preparing ${himself}, if you can call sitting around mindlessly preparing. ${He} spends most of the day-long party at the center of a nonstop gangbang, occasionally moaning as more of a physical reaction than anything. The theory is that ${he}'ll be bound to you as your slave ${wife} from this day onward, so ${he} must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, your guests take part with enthusiasm, completely unhampered by your slave's utter emptiness. Many brought their own slaves to participate, too. ${slave.slaveName} spends hours with numerous cocks inside ${him}, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, ${he}'s extracted and taken off to be bathed.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`${He} returns shortly, looking exhausted but otherwise uncaring. ${He}'s naked still, ${his} skin clean and ${slave.skin}, and is led to you for the ceremony by another slave. The only evident signs that ${he}'s had sex with more than a hundred people today is ${his} ass, which looks rather well traveled, and ${his} tiredness. ${He} can't conceal ${his} tiredness, and leans against you subconsciously. ${capFirstChar(V.assistant.name)} reads the short recitation for ${him}, and you place a simple steel ring`);
						if (!hasAnyArms(slave)) {
							r.push(`on a cord around ${his} neck, since ${he} lacks fingers to wear it on.`);
						} else {
							r.push(`on ${his} finger.`);
						}
						r.push(`There is no ring for you, since this marriage does not bind you.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`Once the ceremony is complete, you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He} rests ${his} head against your ${PCChest} as you cradle ${him} in your arms, and by the time ${he}'s home, ${he}'s fast asleep. You set ${him} gently down on the bed and curl up behind ${him}, feeling the animal warmth of ${his} body as the exhausted slave's chest rises and falls with ${his} breathing.`);
					} else if (slave.devotion + slave.trust >= 175) {
						r.push(`spent the day before resting and preparing ${himself}, and this was a necessary precaution. ${He} spends most of the day-long party at the center of a nonstop gangbang. The theory is that ${he}'ll be bound to you as your slave ${wife} from this day onward, so ${he} must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, <span class="green">your guests take part with enthusiasm,</span> many having brought their own slaves to participate, too. ${slave.slaveName} spends hours with numerous cocks inside ${him}, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, ${he}'s extracted and taken off to be bathed.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`${He} returns shortly, looking exhausted but rather proud of ${himself} for getting through all that. ${He}'s naked still, ${his} skin clean and ${slave.skin}, and comes confidently to stand by you for the ceremony. The only evident signs that ${he}'s had sex with more than a hundred people today is ${his} ass, which looks rather well-traveled, and ${his} tiredness. ${He} does ${his} best to conceal how ready to sleep ${he} is, but ${he} leans against you a little. ${capFirstChar(V.assistant.name)} reads the short recitation for ${him}, and you place a simple steel ring`);
						if (!hasAnyArms(slave)) {
							r.push(`on a cord around ${his} neck, since ${he} lacks fingers to wear it on.`);
						} else {
							r.push(`on ${his} finger.`);
						}
						r.push(`There is no ring for you, since this marriage does not bind you.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`Once the ceremony is complete, you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He} rests ${his} head against your ${PCChest} as you cradle ${him} in your arms, and by the time ${he}'s home, ${he}'s fast asleep. You set ${him} gently down on the bed and curl up behind ${him}, feeling the animal warmth of ${his} body as the exhausted slave's chest rises and falls with ${his} breathing.`);
					} else if (slave.devotion < -20 && slave.trust > 20) {
						r.push(`spent the day before resting and trying to ready ${himself}, and this was a necessary precaution. ${He} spends most of the day-long party at the center of a nonstop gangbang, screaming mixed cries of pleasure and horror. The theory is that ${he}'ll be bound to you as your slave ${wife} from this day onward, so ${he} must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, your guests take part with enthusiasm, completely unhampered by your slave's utter unwillingness. Many brought their own slaves to participate, too. ${slave.slaveName} spends hours with numerous cocks inside ${him}, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, ${he}'s extracted and taken off to be bathed.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`${He} returns shortly, looking exhausted and annoyed. ${He}'s naked still, ${his} skin clean and ${slave.skin}, and comes reluctantly to stand by you for the ceremony, glaring at you the whole time. The only evident signs that ${he}'s had sex with more than a hundred people today is ${his} ass, which looks rather well traveled, and ${his} tiredness. ${He} does ${his} best to conceal ${his} tiredness and look stronger than ${he} is, choosing to struggle to stand instead of leaning against you. ${capFirstChar(V.assistant.name)} reads the short recitation for ${him}, and you place a simple steel ring`);
						if (!hasAnyArms(slave)) {
							r.push(`on a cord around ${his} neck, since ${he} lacks fingers to wear it on.`);
						} else {
							r.push(`on ${his} finger.`);
						}
						r.push(`There is no ring for you, since this marriage does not bind you.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`Once the ceremony is complete, you scoop up your new, protesting, slave ${wife} to carry ${him} back into the master bedroom. ${He} rests ${his} head against your ${PCChest}, simply too tired to care anymore. By the time ${he}'s home, ${he}'s fast asleep. You set ${him} gently down on the bed and curl up behind ${him}, feeling the animal warmth of ${his} body as the exhausted slave's chest rises and falls with ${his} breathing. ${He} squirms slightly in ${his} sleep to the unwelcome feeling of your arm around ${him}.`);
					} else if (slave.devotion < -20) {
						r.push(`spent the day before resting and crying to ${himself}, and this was a necessary precaution. ${He} spends most of the day-long party at the center of a nonstop gangbang, screaming mixed cries of pleasure and horror. The theory is that ${he}'ll be bound to you as your slave ${wife} from this day onward, so ${he} must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, your guests take part with enthusiasm, completely unhampered by your slave's utter unwillingness. Many brought their own slaves to participate, too. ${slave.slaveName} spends hours with numerous cocks inside ${him}, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, ${he}'s extracted and taken off to be bathed.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`${He} returns shortly, looking exhausted and depressed. ${He}'s naked still, ${his} skin clean and ${slave.skin}, and comes reluctantly to stand by you for the ceremony, just wanting it to be over. The only evident signs that ${he}'s had sex with more than a hundred people today is ${his} ass, which looks rather well traveled, and ${his} tiredness. ${He} does ${his} best to conceal ${his} tiredness out of fear of punishment, and ${he} leans against you for support despite ${his} feelings on the wedding and you. ${capFirstChar(V.assistant.name)} reads the short recitation for ${him}, and you place a simple steel ring`);
						if (!hasAnyArms(slave)) {
							r.push(`on a cord around ${his} neck, since ${he} lacks fingers to wear it on.`);
						} else {
							r.push(`on ${his} finger.`);
						}
						r.push(`There is no ring for you, since this marriage does not bind you.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`Once the ceremony is complete, you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He} rests ${his} head against your ${PCChest}, simply too tired to care anymore. By the time ${he}'s home, ${he}'s fast asleep. You set ${him} gently down on the bed and curl up behind ${him}, feeling the animal warmth of ${his} body as the exhausted slave's chest rises and falls with ${his} breathing.`);
					} else {
						r.push(`spent the day before resting and reluctantly preparing ${himself}, and this was a necessary precaution. ${He} spends most of the day-long party at the center of a nonstop gangbang, moaning and wincing as ${he} takes cock after cock. The theory is that ${he}'ll be bound to you as your slave ${wife} from this day onward, so ${he} must get the promiscuity that is a sex slave's responsibility out of the way now. Whatever their opinions on the idea, your guests take part with enthusiasm, completely unhampered by your slave's lack of passion. Many brought their own slaves to participate, too. ${slave.slaveName} spends hours with numerous cocks inside ${him}, with attending slaves using their mouths on any erogenous zones they can reach. When the moment of the ceremony nears, ${he}'s extracted and taken off to be bathed.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`${He} returns shortly, looking exhausted. ${He}'s naked still, ${his} skin clean and ${slave.skin}, and comes to stand by you for the ceremony. The only evident signs that ${he}'s had sex with more than a hundred people today is ${his} ass, which looks rather well traveled, and ${his} tiredness. ${He} does ${his} best to conceal it, leaning against you despite the lack of love between you. ${capFirstChar(V.assistant.name)} reads the short recitation for ${him}, and you place a simple steel ring`);
						if (!hasAnyArms(slave)) {
							r.push(`on a cord around ${his} neck, since ${he} lacks fingers to wear it on.`);
						} else {
							r.push(`on ${his} finger.`);
						}
						r.push(`There is no ring for you, since this marriage does not bind you.`);
						App.Events.addParagraph(node, r);
						r = [];
						r.push(`Once the ceremony is complete, you scoop up your new slave ${wife} to carry ${him} back into the master bedroom. ${He} rests ${his} head against you, so tired that ${he}'s grateful for the break from standing. By the time ${he}'s home, ${he}'s fast asleep. You set ${him} gently down on the bed and curl up behind ${him}, feeling the animal warmth of ${his} body as the exhausted slave's chest rises and falls with ${his} breathing.`);
					}
				}
			}
			App.Events.addNode(node, r, "div");
			r = [];
			if (V.PC.slaveSurname && (brides.every(b => b.slaveSurname !== V.PC.slaveSurname))) {
				r.push(giveName());
			}
			App.Events.addParagraph(node, r);
			r = [];
			for (const slave of brides) {
				if (slave.vagina > 0) {
					seX(slave, "vaginal", "public", "penetrative", 50);
				}
				if (slave.anus > 0) {
					seX(slave, "anal", "public", "penetrative", 50);
				}
			}
			if (V.seeStretching === 1) {
				if (!solo && brides.every(b => b.anus < 3)) {
					r.push(`You can feel their asses, still somewhat gaped from their ordeals. They've been <span class="lime">loosened</span> by their wedding party.`);
					brides.forEach(b => b.anus += 1);
				} else {
					for (const slave of brides) {
						if (slave.anus < 3) {
							const {his} = getPronouns(slave);
							slave.anus += 1;
							r.push(`You can feel ${slave.slaveName}'s ass, still somewhat gaped from its ordeal. It's been <span class="lime">loosened</span> by ${his} wedding party.`);
						}
					}
				}
			}

			if (brides.some(b => b.relationship !== 0)) {
				/** @type {number[][]} */
				const relationInWedding = [];
				for (const slave of brides) {
					if (V.marrying.includes(slave.relationshipTarget) && !relationInWedding.some(pair => pair.includes(slave.ID))) {
						relationInWedding.push([slave.ID, slave.relationshipTarget]);
					}
				}
				if (relationInWedding.length > 0) {
					for (const pairID of relationInWedding) {
						const slave = getSlave(pairID[0]);
						const relSlave = getSlave(pairID[1]);
						// TODO: not sure about these
						if (
							[slave, relSlave].every((b) => b.devotion + b.trust >= 175, pairID) ||
							[slave, relSlave].every((b) => b.devotion < -20 && b.trust > 20, pairID) ||
							[slave, relSlave].every((b) => b.devotion < -20, pairID) ||
							[slave, relSlave].every((b) => b.devotion >= -20, pairID)
						) {
							if (slave.devotion + slave.trust >= 175) {
								r.push(`The fact that their relationship together now involves you <span class="hotpink">excites them to no end.</span>`);
								slave.devotion += 10;
								relSlave.devotion += 10;
							} else if (slave.devotion < -20) {
								r.push(`The fact that you would allow them to remain together, albeit as your ${wives}, <span class="hotpink">causes them to begin to see you in a new light.</span>`);
								slave.devotion += 15;
								relSlave.devotion += 15;
							} else if (slave.devotion >= -20) {
								r.push(`The fact that you would allow them to remain together, albeit as your ${wives}, has them <span class="hotpink">cautiously optimistic for the future.</span>`);
								slave.devotion += 5;
								relSlave.devotion += 5;
							}
						} else {
							const reactions = [];
							for (let i = 0; i < pairID.length; i++) { // Run this twice, once for each slave in the relationship.
								const slave = getSlave(pairID[i]);
								const {he} = getPronouns(slave);
								const relSlave = (i === 0) ? getSlave(pairID[1]): getSlave(pairID[0]);
								if (slave.devotion + slave.trust >= 175) {
									reactions.push(`${slave.slaveName} is excited by the fact that their relationship now involves you, and promises to try to get ${relSlave.slaveName} to see you the same way ${he} does`);
									slave.devotion += 10;
								} else if (slave.devotion < -20) {
									reactions.push(`${slave.slaveName} is convinced this is some sort of trick`);
								} else if (slave.devotion >= -20) {
									reactions.push(`${slave.slaveName} is only <span class="hotpink">cautiously optimistic for their future together</span>`);
									slave.devotion += 5;
								}
							}
							r.push(`${toSentence(reactions, ", while ")}.`);
						}
					}
				} else {
					for (const slave of brides) {
						const {
							he, his
						} = getPronouns(slave);
						const relSlave = getSlave(slave.relationshipTarget);
						if (slave.relationship !== 0) {
							if (slave.devotion + slave.trust >= 175) {
								if (slave.relationship > 0 && relSlave) {
									const {his2} = getPronouns(relSlave).appendSuffix("2");
									r.push(`${slave.slaveName}'s`);
									if (slave.relationship > 2) {
										r.push(`ex`);
									} else {
										r.push(`friend`);
									}
									r.push(`is <span class="mediumorchid">disappointed</span> that their relationship had to end and <span class="gold">worries</span> for ${his2} ${(slave.relationship > 2) ? `ex` : `companion`}'s future.`);
									if (slave.relationship === 4) {
										relSlave.devotion -= 5;
										relSlave.trust -= 5;
									} else if (slave.relationship === 3) {
										relSlave.devotion -= 3;
										relSlave.trust -= 3;
									} else {
										relSlave.devotion -= 1;
										relSlave.trust -= 1;
									}
								}
							} else if (slave.devotion < -20) {
								if (slave.relationship === -1) {
									r.push(`${slave.slaveName} <span class="mediumorchid">hates</span> that ${he} has to be yours only and <span class="gold">fears</span> what will happen if ${he} strays.`);
									slave.devotion -= 40;
									slave.trust -= 40;
								} else if (slave.relationship > 0 && relSlave) {
									const {his2} = getPronouns(relSlave).appendSuffix("2");
									if (slave.relationship === 4) {
										r.push(`Both ${slave.slaveName} and ${his} ex <span class="mediumorchid">resent</span> that their relationship had to end and <span class="gold">fear</span> for each other's future. ${relSlave.slaveName} is especially <span class="mediumorchid">furious</span> to watch ${his2} life's love get stolen away and fucked pregnant in such a manner.`);
										relSlave.devotion -= 60;
										relSlave.trust -= 40;
										slave.devotion -= 40;
										slave.trust -= 40;
									} else if (slave.relationship === 3) {
										r.push(`Both ${slave.slaveName} and ${his} ex <span class="mediumorchid">resent</span> that their relationship had to end and <span class="gold">fear</span> for each other's future. ${relSlave.slaveName} is especially <span class="mediumorchid">hurt</span> after watching ${his2} life's love get stolen away and fucked pregnant in such a manner.`);
										relSlave.devotion -= 30;
										relSlave.trust -= 30;
										slave.devotion -= 50;
										slave.trust -= 30;
									} else {
										r.push(`Both ${slave.slaveName} and ${his} friend <span class="mediumorchid">resent</span> that their relationship had to end and <span class="gold">fear</span> for each other's future.`);
										relSlave.devotion -= 20;
										relSlave.trust -= 20;
										slave.devotion -= 20;
										slave.trust -= 20;
									}
								}
							} else {
								if (slave.relationship === -1) {
									r.push(`${slave.slaveName} <span class="mediumorchid">dislikes</span> that ${he} has to be yours only and <span class="gold">worries</span> what will happen if ${he} strays.`);
									slave.devotion -= 10;
									slave.trust -= 10;
								} else if (slave.relationship > 0 && relSlave) {
									const {him2, his2} = getPronouns(relSlave).appendSuffix("2");
									if (slave.relationship === 4) {
										r.push(`Both ${slave.slaveName} and ${his} ex are <span class="mediumorchid">resent</span> that their relationship had to end and <span class="gold">worry</span> for each other. ${relSlave.slaveName} is especially <span class="mediumorchid">hurt</span> after watching ${his2} life's love get stolen away and fucked pregnant in such a manner.`);
										relSlave.devotion -= 20;
										relSlave.trust -= 20;
										slave.devotion -= 30;
										slave.trust -= 20;
									} else if (slave.relationship === 3) {
										r.push(`Both ${slave.slaveName} and ${his} ex are <span class="mediumorchid">are saddened</span> that their relationship had to end and <span class="gold">worry</span> for each other. ${relSlave.slaveName} is a little <span class="mediumorchid">jealous</span> of you for snagging such catch out from under ${him2}.`);
										relSlave.devotion -= 10;
										relSlave.trust -= 10;
										slave.devotion -= 15;
										slave.trust -= 10;
									} else {
										r.push(`Both ${slave.slaveName} and ${his} friend are <span class="mediumorchid">are disappointed</span> that their relationship had to end and <span class="gold">worry</span> for each other.`);
										relSlave.devotion -= 5;
										relSlave.trust -= 5;
										slave.devotion -= 5;
										slave.trust -= 5;
									}
								}
							}
						}
					}
				}
			}

			for (const slave of brides) {
				slave.relationship = -3;
				seX(slave, "oral", "public", "penetrative", 50);
				if (canDoAnal(slave)) {
					seX(slave, "anal", "public", "penetrative", 50);
				}
				if (canGetPregnant(slave) && slave.eggType === "human") {
					r.push(knockMeUp(slave, 20, 2, -2));
				}
				repX(2500, "event", slave);
				makeTrinkets(slave);
			}
		}
		App.Events.addParagraph(node, r);
		V.weddingPlanned = 0;
		V.marrying = [];
		return node;

		function giveName() {
			const div = document.createElement("div");
			div.append(App.UI.DOM.link(
				`Give ${solo ? getPronouns(slave1).him : `them`} your surname too`,
				() => {
					const el = new DocumentFragment();
					const r = [];
					let c = 0;
					let h = 0;
					r.push(`You also proclaim your new slave ${wivesC} ${namesString} ${V.PC.slaveSurname}.`);
					for (const slave of brides) {
						c += 1;
						if (canHear(slave)) {
							h += 1;
						}
					}
					r.push(`The new Mrs. ${V.PC.slaveSurname}${(c > 1) ? `s` : ``}`);
					if (h > 0) {
						r.push((c === 1) ? `hears` : `hear`);
					} else {
						r.push((c === 1) ? `understands` : `understand`);
					}
					r.push(`this, of course, and`);
					const nameCheck = !solo && brides.every(b => b.slaveSurname !== V.PC.slaveSurname);
					if (nameCheck && brides.every((b) => b.fetish === Fetish.MINDBROKEN)) {
						r.push(`show no reaction. Like many things, names mean nothing to them now. Your guests, on the other hand, appreciate the gift.`);
					} else if (nameCheck && brides.every((b) => b.devotion + b.trust >= 175)) {
						r.push(`break down again; it's like a dream come true.`);
					} else if (nameCheck && brides.every((b) => b.devotion < -20 && b.trust > 20)) {
						r.push(`scoff audibly; just another burden for them to carry.`);
					} else if (nameCheck && brides.every((b) => b.devotion < -20)) {
						r.push(`break down again; this is nothing more than another unwanted link to you.`);
					} else if (nameCheck && brides.every((b) => b.devotion >= -20)) {
						r.push(`nod acceptingly. Your will is their will, after all.`);
					} else {
						let meanwhile;
						for (const slave of brides) {
							const {he, his, him} = getPronouns(slave);
							if (slave.slaveSurname !== V.PC.slaveSurname) {
								if (!meanwhile) {
									r.push(slave.slaveName);
								} else {
									r.push(`${slave.slaveName}, meanwhile,`);
								}
								meanwhile = true;
								if (slave.fetish === Fetish.MINDBROKEN) {
									r.push(`${slave.slaveName} shows no reaction. Like many things, names mean nothing to ${him} now. Your guests, on the other hand, appreciate the gift.`);
								} else if (slave.devotion + slave.trust >= 175) {
									if (V.weddingPlanned === 3) {
										r.push(`breaks down again. Not only is ${he} to be blessed with your child, but ${he}'s to take your surname as well.`);
									} else {
										r.push(`breaks down again; it's like a dream come true.`);
									}
								} else if (slave.devotion < -20 && slave.trust > 20) {
									if (V.weddingPlanned === 3) {
										r.push(`scoffs audibly. Just another burden for ${him} to carry; like the child soon to be growing in ${his} womb.`);
									} else {
										r.push(`scoffs audibly; just another burden for ${him} to carry.`);
									}
								} else if (slave.devotion < -20) {
									if (V.weddingPlanned === 3) {
										r.push(`breaks down again. Not only are you binding ${him} to you with your child, but with your name as well.`);
									} else {
										r.push(`breaks down again; this is nothing more than another unwanted link to you.`);
									}
								} else {
									r.push(`nods acceptingly. Your will is ${his} will, after all.`);
								}
							}
						}
					}
					brides.forEach(slave => slave.slaveSurname = V.PC.slaveSurname);
					App.Events.addNode(el, r);
					jQuery(div).empty().append(el);
				}
			));
			return div;
		}

		function makeTrinkets(trinketSlave) {
			if (V.weddingPlanned === 3) {
				if (trinketSlave.fetish === Fetish.MINDBROKEN) {
					addTrinket(`a framed shot of you impregnating the blank-faced ${trinketSlave.slaveName} at your wedding`);
				} else if (trinketSlave.devotion + trinketSlave.trust >= 175) {
					addTrinket(`a framed shot of you impregnating the joyous ${trinketSlave.slaveName} at your wedding`);
				} else if (trinketSlave.devotion < -20 && trinketSlave.trust > 20) {
					addTrinket(`a framed shot of you forcefully impregnating the disinterested ${trinketSlave.slaveName} at your wedding`);
				} else if (trinketSlave.devotion < -20) {
					addTrinket(`a framed shot of you forcefully impregnating the tear soaked ${trinketSlave.slaveName} at your wedding`);
				} else {
					addTrinket(`a framed shot of you impregnating ${trinketSlave.slaveName} at your wedding`);
				}
			} else if (V.weddingPlanned === 2) {
				if (trinketSlave.fetish === Fetish.MINDBROKEN) {
					addTrinket(`a framed shot of the broken ${trinketSlave.slaveName} getting gangbanged at your wedding`);
				} else if (trinketSlave.devotion + trinketSlave.trust >= 175) {
					addTrinket(`a framed shot of the tear and cum soaked ${trinketSlave.slaveName} getting gangbanged at your wedding`);
				} else if (trinketSlave.devotion < -20 && trinketSlave.trust > 20) {
					addTrinket(`a framed shot of the glowering ${trinketSlave.slaveName} getting gangbanged at your wedding`);
				} else if (trinketSlave.devotion < -20) {
					addTrinket(`a framed shot of ${trinketSlave.slaveName} getting gangbanged and weeping at your wedding`);
				} else {
					addTrinket(`a framed shot of ${trinketSlave.slaveName} getting gangbanged at your wedding`);
				}
			} else if (V.weddingPlanned === 1) {
				if (trinketSlave.fetish === Fetish.MINDBROKEN) {
					addTrinket(`a framed shot of your uneventful wedding to the mindbroken ${trinketSlave.slaveName}`);
				} else if (trinketSlave.devotion + trinketSlave.trust >= 175) {
					addTrinket(`a framed shot of your romantic wedding to the joyous ${trinketSlave.slaveName}`);
				} else if (trinketSlave.devotion < -20 && trinketSlave.trust > 20) {
					addTrinket(`a framed shot of your forced wedding to the hateful ${trinketSlave.slaveName}`);
				} else if (trinketSlave.devotion < -20) {
					addTrinket(`a framed shot of your forced wedding to the weeping ${trinketSlave.slaveName}`);
				} else {
					addTrinket(`a framed shot of your wedding to ${trinketSlave.slaveName}`);
				}
			}
		}

		function ringCeremony() {
			const r = [];
			if (!solo && brides.every(b => hasAnyArms(b))) {
				r.push(`on each slave's`);
				if (brides.every((b) => b.devotion < -20 && b.trust <= 20)) {
					r.push(`trembling`);
				}
				r.push(`middle finger.`);
			} else {
				const ring = [];
				for (const slave of brides) {
					const {he} = getPronouns(slave);
					if (!hasAnyArms(slave)) {
						ring.push(`on a cord around ${slave.slaveName}'s neck, since ${he} lacks fingers to wear it on`);
					} else {
						ring.push(`on ${slave.slaveName}'s ${(slave.devotion < -20 && slave.trust <= 20) ? `trembling ` : ``}middle finger`);
					}
				}
				r.push(`${toSentence(ring, " and another ring ")}.`);
			}
			r.push(`There is no ring for you, since this marriage does not bind you.`);
			return r;
		}

		/** @param {App.Entity.SlaveState} marryingSlave*/
		function weddingIntro(marryingSlave) {
			const el = new DocumentFragment();
			let r = [];
			const {
				He, His,
				he, his, himself, girl
			} = getPronouns(marryingSlave);
			let he2;
			const relationshipSlave = getSlave(marryingSlave.relationshipTarget);
			if (relationshipSlave) {
				({he2} = getPronouns(relationshipSlave).appendSuffix("2"));
			}
			if (marryingSlave.relationship > 0) {
				marryingSlave.relationshipTarget = 0;
				if (relationshipSlave) {
					relationshipSlave.relationshipTarget = 0;
					relationshipSlave.relationship = 0;
				} else {
					return App.UI.DOM.makeElement("span", `Relationship target (ID: ${marryingSlave.relationshipTarget}) not found`, "error");
				}
			}
			if (marryingSlave.devotion + marryingSlave.trust >= 175) {
				if (marryingSlave.relationship !== 0) {
					if (marryingSlave.relationship === -1) {
						r.push(`vowing that ${he}'ll be less of a slut.`);
					} else if (marryingSlave.relationship === 4) {
						r.push(`breaking up with ${his} lover, ${relationshipSlave.slaveName}, as painlessly as possible.`);
					} else if (marryingSlave.relationship === 3) {
						r.push(`breaking up with ${his} FWB, ${relationshipSlave.slaveName}, as painlessly as possible.`);
					} else if (marryingSlave.relationship > 0 && relationshipSlave) {
						r.push(`promising ${relationshipSlave.slaveName} that they'll still be friends, even if they can't spend time together.`);
					} else {
						r.push(`as close to you as ${he} could.`);
					}
				} else {
					r.push(`as close to you as ${he} could.`);
				}
			} else if (marryingSlave.devotion < -20 && marryingSlave.trust > 20) {
				if (marryingSlave.relationship === -1) {
					r.push(`sleeping with as many different people as ${he} could.`);
					if (!isSlaveAvailable(marryingSlave)) {
						r.push(`Or ${he} would have, if ${he} were able.`);
					} else if (canDoVaginal(marryingSlave) && canDoAnal(marryingSlave)) {
						seX(marryingSlave, "vaginal", "public", "penetrative", random(30, 60));
						seX(marryingSlave, "anal", "public", "penetrative", random(30, 60));
						seX(marryingSlave, "oral", "public", "penetrative", random(30, 60));
						r.push(`By week's end, ${he}'s managed to ruin ${his} body out of spite. ${He} can barely move, trapped on ${his} back as cum steadily drips from ${his} prolapsed, gaping, destroyed holes.`);
						if (marryingSlave.vagina === 0 && marryingSlave.anus === 0) {
							r.push(`${His} actions robbed you of <span class="lime">both ${his} virginities.</span>`);
						}
						if (marryingSlave.vagina < 4) {
							marryingSlave.vagina = 4;
						}
						marryingSlave.anus = 4;
						if (canGetPregnant(marryingSlave) && (random(1, 100) > 70) && marryingSlave.eggType === "human") {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 2, 0);
						}
					} else if (canDoVaginal(marryingSlave)) {
						seX(marryingSlave, "vaginal", "public", "penetrative", random(30, 60));
						seX(marryingSlave, "oral", "public", "penetrative", random(30, 60));
						r.push(`By week's end, ${he}'s managed to ruin ${his} body out of spite. ${He} can barely move, trapped on ${his} back as cum steadily drips from ${his} prolapsed, gaping, destroyed cunt.`);
						if (marryingSlave.vagina === 0) {
							r.push(`${His} actions robbed you of <span class="lime">${his} virginity.</span>`);
						}
						if (marryingSlave.vagina < 4) {
							marryingSlave.vagina = 4;
						}
						if (canGetPregnant(marryingSlave) && (random(1, 100) > 70) && marryingSlave.eggType === "human") {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 0, 0);
						}
					} else if (canDoAnal(marryingSlave)) {
						seX(marryingSlave, "anal", "public", "penetrative", random(30, 60));
						seX(marryingSlave, "oral", "public", "penetrative", random(30, 60));
						r.push(`By week's end, ${he}'s managed to ruin ${his} body out of spite. ${He} can barely move, trapped on ${his} back as cum steadily drips from ${his} prolapsed, gaping, destroyed anus.`);
						if (marryingSlave.anus === 0) {
							r.push(`${His} actions robbed you of <span class="lime">${his} anal virginity.</span>`);
						}
						marryingSlave.anus = 4;
						if (canGetPregnant(marryingSlave) && (random(1, 100) > 70) && marryingSlave.eggType === "human") {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 1, 0);
						}
					} else {
						seX(marryingSlave, "oral", "public", "penetrative", random(30, 60));
						r.push(`By week's end, ${he}'s managed to make ${himself} sick from sucking down so much sexual fluid. Luckily inducing vomiting will save your wedding from making the tabloids.`);
					}
				} else if (marryingSlave.relationship === 4) {
					r.push(`fucking ${his} love, ${relationshipSlave.slaveName}, as often as possible while ignoring you.`);
					if (!isSlaveAvailable(marryingSlave)) {
						r.push(`Or ${he} would have, if ${he} were able.`);
					} else if (!isSlaveAvailable(relationshipSlave)) {
						r.push(`Or ${he} would have, if ${he2} were around.`);
					} else if (canDoVaginal(marryingSlave) && canDoAnal(marryingSlave)) {
						seX(marryingSlave, "vaginal", relationshipSlave, "penetrative", random(3, 7));
						seX(marryingSlave, "anal", relationshipSlave, "penetrative", random(1, 4));
						seX(marryingSlave, "oral", relationshipSlave, "penetrative", random(5, 10));
						if (marryingSlave.vagina === 0 && marryingSlave.anus === 0) {
							r.push(`${His} actions robbed you of <span class="lime">both ${his} virginities.</span>`);
							marryingSlave.vagina = 1;
							marryingSlave.anus = 1;
						}
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 70)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 2, relationshipSlave.ID);
						}
					} else if (canDoVaginal(marryingSlave)) {
						seX(marryingSlave, "vaginal", relationshipSlave, "penetrative", random(3, 7));
						seX(marryingSlave, "oral", relationshipSlave, "penetrative", random(5, 10));
						if (marryingSlave.vagina === 0) {
							r.push(`${His} actions robbed you of <span class="lime">${his} virginity.</span>`);
							marryingSlave.vagina = 1;
						}
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 70)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 0, relationshipSlave.ID);
						}
					} else if (canDoAnal(marryingSlave)) {
						seX(marryingSlave, "anal", relationshipSlave, "penetrative", random(1, 4));
						seX(marryingSlave, "oral", relationshipSlave, "penetrative", random(5, 10));
						if (marryingSlave.anus === 0) {
							r.push(`${His} actions robbed you of <span class="lime">${his} anal virginity.</span>`);
							marryingSlave.anus = 1;
						}
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 70)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 1, relationshipSlave.ID);
						}
					} else {
						seX(marryingSlave, "oral", relationshipSlave, "penetrative", random(15, 20));
						r.push(`By week's end, ${he}'s managed to make ${himself} sick from going down on ${relationshipSlave.slaveName} so often. Luckily inducing vomiting will save your wedding from making the tabloids.`);
					}
				} else if (marryingSlave.relationship === 3) {
					r.push(`fucking ${his} lover, ${relationshipSlave.slaveName}, as often as possible while ignoring you.`);
					if (!isSlaveAvailable(marryingSlave)) {
						r.push(`Or ${he} would have, if ${he} were able.`);
					} else if (!isSlaveAvailable(relationshipSlave)) {
						r.push(`Or ${he} would have, if ${he2} were around.`);
					} else if (canDoVaginal(marryingSlave) && canDoAnal(marryingSlave)) {
						seX(marryingSlave, "vaginal", relationshipSlave, "penetrative", random(3, 7));
						seX(marryingSlave, "anal", relationshipSlave, "penetrative", random(1, 4));
						seX(marryingSlave, "oral", relationshipSlave, "penetrative", random(5, 10));
						if (marryingSlave.vagina === 0 && marryingSlave.anus === 0) {
							r.push(`${His} actions robbed you of <span class="lime">both ${his} virginities.</span>`);
							marryingSlave.vagina = 1;
							marryingSlave.anus = 1;
						}
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 70)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 2, relationshipSlave.ID);
						}
					} else if (canDoVaginal(marryingSlave)) {
						seX(marryingSlave, "vaginal", relationshipSlave, "penetrative", random(3, 7));
						seX(marryingSlave, "oral", relationshipSlave, "penetrative", random(5, 10));
						if (marryingSlave.vagina === 0) {
							r.push(`${His} actions robbed you of <span class="lime">${his} virginity.</span>`);
							marryingSlave.vagina = 1;
						}
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 70)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 0, relationshipSlave.ID);
						}
					} else if (canDoAnal(marryingSlave)) {
						seX(marryingSlave, "anal", relationshipSlave, "penetrative", random(1, 4));
						seX(marryingSlave, "oral", relationshipSlave, "penetrative", random(5, 10));
						if (marryingSlave.anus === 0) {
							r.push(`${His} actions robbed you of <span class="lime">${his} anal virginity.</span>`);
							marryingSlave.anus = 1;
						}
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 70)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals the bitch managed to get knocked up. There is no time before the ceremony to deal with it.`);
							knockMeUp(marryingSlave, 100, 1, relationshipSlave.ID);
						}
					} else {
						seX(marryingSlave, "oral", relationshipSlave, "penetrative", random(15, 20));
						r.push(`By week's end, ${he}'s managed to make ${himself} sick from going down on ${relationshipSlave.slaveName} so often. Luckily inducing vomiting will save your wedding from making the tabloids.`);
					}
				} else if (marryingSlave.relationship > 0 && relationshipSlave) {
					r.push(`spending time away from you with ${relationshipSlave.slaveName}.`);
				} else {
					r.push(`inappropriately planning redecorations.`);
				}
			} else if (marryingSlave.devotion < -20) {
				if (marryingSlave.relationship === -1) {
					r.push(`desperately pleading with you to change your mind.`);
				} else if (marryingSlave.relationship === 4) {
					r.push(`with ${his} love, ${relationshipSlave.slaveName}, weeping.`);
				} else if (marryingSlave.relationship === 3) {
					r.push(`with ${his} lover, ${relationshipSlave.slaveName}, weeping.`);
				} else if (marryingSlave.relationship > 0 && relationshipSlave) {
					r.push(`with ${his} friend, ${relationshipSlave.slaveName}, weeping.`);
				} else {
					r.push(`desperately pleading with you to change your mind.`);
				}
			} else {
				if (marryingSlave.relationship === -1) {
					r.push(`trying ${his} hardest to not sleep with anyone else.`);
				} else if (marryingSlave.relationship === 4) {
					r.push(`alongside ${his} love, ${relationshipSlave.slaveName}.`);
					if (canDoVaginal(marryingSlave) && marryingSlave.vagina !== 0) {
						seX(marryingSlave, "vaginal", relationshipSlave, "penetrative");
						r.push(`${He} later lets you know ${he} let ${relationshipSlave.slaveName} enjoy ${his} pussy one last time.`);
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 90)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals ${marryingSlave.slaveName} managed to get knocked up. There is no time before the ceremony to deal with it and the distraught ${girl} is in a panic for making you go through this.`);
							knockMeUp(marryingSlave, 100, 0, relationshipSlave.ID);
						}
					} else if (canDoAnal(marryingSlave)) {
						seX(marryingSlave, "anal", relationshipSlave, "penetrative");
						r.push(`${He} later lets you know ${he} let ${relationshipSlave.slaveName} enjoy ${his} butt one last time.`);
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 90)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals ${marryingSlave.slaveName} managed to get knocked up. There is no time before the ceremony to deal with it and the distraught ${girl} is in a panic for making you go through this.`);
							knockMeUp(marryingSlave, 100, 1, relationshipSlave.ID);
						}
					} else {
						seX(marryingSlave, "oral", relationshipSlave, "penetrative");
						r.push(`${He} later tells you ${he} gave ${relationshipSlave.slaveName} `);
						if (relationshipSlave.dick > 0) {
							r.push(`one last blow job.`);
						} else if (canDoVaginal(relationshipSlave)) {
							r.push(`cunnilingus one last time.`);
						} else {
							r.push(`oral one last time.`);
						}
					}
				} else if (marryingSlave.relationship === 3) {
					r.push(`alongside ${his} lover, ${relationshipSlave.slaveName}.`);
					if (canDoVaginal(marryingSlave) && marryingSlave.vagina !== 0) {
						seX(marryingSlave, "vaginal", relationshipSlave, "penetrative");
						r.push(`${He} later lets you know ${he} let ${relationshipSlave.slaveName} enjoy ${his} pussy one last time.`);
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 90)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals ${marryingSlave.slaveName} managed to get knocked up. There is no time before the ceremony to deal with it and the distraught ${girl} is in a panic for making you go through this.`);
							knockMeUp(marryingSlave, 100, 0, relationshipSlave.ID);
						}
					} else if (canDoAnal(marryingSlave)) {
						seX(marryingSlave, "anal", relationshipSlave, "penetrative");
						r.push(`${He} later lets you know ${he} let ${relationshipSlave.slaveName} enjoy ${his} butt one last time.`);
						if (canImpreg(marryingSlave, relationshipSlave) && (random(1, 100) > 90)) {
							r.push(`A pre-wedding checkup following an unusual bout of morning nausea reveals ${marryingSlave.slaveName} managed to get knocked up. There is no time before the ceremony to deal with it and the distraught ${girl} is in a panic for making you go through this.`);
							knockMeUp(marryingSlave, 100, 1, relationshipSlave.ID);
						}
					} else {
						seX(marryingSlave, "oral", relationshipSlave, "penetrative");
						r.push(`${He} later tells you ${he} gave ${relationshipSlave.slaveName} `);
						if (relationshipSlave.dick > 0) {
							r.push(`one last blow job.`);
						} else if (canDoVaginal(relationshipSlave)) {
							r.push(`cunnilingus one last time`);
						} else {
							r.push(`oral one last time.`);
						}
					}
				} else if (marryingSlave.relationship > 0) {
					r.push(`with ${his} friend, ${relationshipSlave.slaveName}.`);
				} else {
					r.push(`wearing a very conflicted expression.`);
				}
			}

			App.Events.addNode(el, r, "span");
			return el;
		}
	}
};
