App.Markets.TFS = function() {
	const el = new DocumentFragment();
	let r = [];

	if (V.TFS.schoolPresent === 1) {
		App.UI.DOM.appendNewElement("p", el, `You pay a visit to the Futanari Sisters. They occupy a suite remodeled for their very special needs; it's surprisingly small, to house so many girls, since they live communally and do not believe in privacy. You are the only outsider permitted to enter the outer door. As you move towards the center of the suite, you pass through the outer ring of sleeping areas, kitchens, medical rooms, and workout stations that surround the inner sanctum.`);

		r.push(`This is a large, circular room with a shallow depression in the floor, filled with pillows and naked, fucking futas. Every possible interaction between mouths, nipples, breasts, penises, vaginas, and anuses is taking place, with most participants managing several at once. They are all very, very pretty, and it's easier to distinguish the older ones by their bigger tits, asses and cocks than by their apparent age. The older futas tend to be on top, but this is by no means the rule, and they like to switch around often.`);
		if (V.TFS.schoolUpgrade !== 0) {
			if (V.TFS.schoolUpgrade === 1) {
				r.push(`As they move, their lack of apparent testes catches your eye; the end result of your gracious endowment.`);
			} else if (V.TFS.schoolUpgrade === 2) {
				r.push(`As they move about, their swollen balls catch your eye; the end result of your gracious endowment.`);
			} else if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
				r.push(`You beam over the variety of futas splayed out before you, proud that your endowment made this possible.`);
			}
		}
		App.UI.DOM.appendNewElement("p", el, r.join(" "));

		if (V.TFS.farmUpgrade === 2) {
			if (V.TFS.farmUpgradeAsked < V.week - 10) {
				App.UI.DOM.appendNewElement("p", el, `It's been long enough since you allowed them to use your organ farm to add ovaries to themselves and instructed them not to use contraceptives that most of them are visibly pregnant. This hasn't slowed their sexual congress at all, though. They've become much more focused on vaginal, and there's an obvious eagerness to cum inside Sisters who aren't obviously pregnant.`);
			} else {
				App.UI.DOM.appendNewElement("p", el, `It hasn't been long enough since you allowed them to use your organ farm to add ovaries to themselves for the effects to be obvious yet. Most of them are doubtless pregnant, however. There's been a subtle shift in their sexual behavior, too: they're much more likely to focus on vaginal sex than they were before, so much so that they often double penetrate each other's pussies. When there aren't any cunts available, they do their best to hold their orgasms until one opens up, so to speak.`);
			}
		} else if (V.TFS.farmUpgrade === 3) {
			if (V.TFS.farmUpgradeAsked < V.week - 20) {
				App.UI.DOM.appendNewElement("p", el, `It's been long enough since you allowed them to use your organ farm to add ovaries to themselves and instructed them not to use contraceptives that most of them are extremely pregnant. This hasn't slowed their sexual congress at all, though they've had to get creative with their positioning. They've become much more focused on vaginal, and there's an obvious eagerness to cum inside Sisters who aren't obviously pregnant.`);
			} else if (V.TFS.farmUpgradeAsked < V.week - 10) {
				App.UI.DOM.appendNewElement("p", el, `It's been long enough since you allowed them to use your organ farm to add ovaries to themselves and instructed them not to use contraceptives that most of them are visibly pregnant. This hasn't slowed their sexual congress at all, though. They've become much more focused on vaginal, and there's an obvious eagerness to cum inside Sisters who aren't obviously pregnant.`);
			} else {
				App.UI.DOM.appendNewElement("p", el, `It hasn't been long enough since you allowed them to use your organ farm to add ovaries to themselves for the effects to be obvious yet. Most of them are doubtless pregnant, however. There's been a subtle shift in their sexual behavior, too: they're much more likely to focus on vaginal sex than they were before, so much so that they often double penetrate each other's pussies. When there aren't any cunts available, they do their best to hold their orgasms until one opens up, so to speak.`);
			}
		}
		App.UI.DOM.appendNewElement("p", el, `Visitors are not common: in fact, visitors are only as frequent as you feel like visiting. It takes a while before they notice you. When a dreamy-eyed young futa finally does, she reaches a lazy hand over to alert the eldest one present by tugging on one of her nipples and pointing in your direction. The elder looks over at you and gives you a friendly wave followed by a wait-one-moment gesture. She's curled up on her back with her cockhead in her own mouth, using both hands to give her own shaft a boob job while a younger futa eats her ass and fingers her pussy. The futa matron orgasms promptly, sucking down her own cum. She gets up languidly, her plush body, softening forearm-sized dick, and enormous natural boobs making it a wonderful sight.`);

		r = [];
		if (V.PC.title === 1) {
			r.push(`"Protector,`);
		} else {
			r.push(`"Protectrix,`);
		}
		r.push(`thank you so much for coming to see us. Our own Selection of a Sister to serve in slavery is not to take place for some time, but our communications interface in that side room," she points, "will permit you to access a regional listing of Selected Sisters ${(V.TFS.farmUpgrade > 0) ? `, all of which are fully fertile and produce their own natural female hormones, thanks to you` : ``}." She looks uncharacteristically uncertain. "Will you permit me to`);
		if (V.PC.dick !== 0) {
			if (V.PC.vagina !== -1) {
				r.push(`worship your perfect genitalia`);
			} else {
				r.push(`serve your cock`);
			}
		} else {
			r.push(`adore your pussy`);
		}
		r.push(`while you use it? I think my Sisters will forgive me the infidelity."`);
		if (V.PC.dick !== 0 && V.PC.vagina !== -1 && V.PC.boobs >= 300) {
			r.push(`She looks at you speculatively. "Or you could join us for a while."`);
		}
		App.UI.DOM.appendNewElement("p", el, r.join(" "));

		const result = App.UI.DOM.appendNewElement("p", el);
		App.UI.DOM.appendNewElement(
			"div",
			result,
			App.UI.DOM.link(
				"Let her give you oral while you browse",
				() => {
					r = [];
					r.push(`You accept her offer, and she walks seductively over to the interface with the listing of available Sisters, getting down on her knees below it. When you step up to look through the listing, she presses her huge soft tits against your knees`);
					if (V.PC.dick !== 0) {
						if (V.PC.vagina !== -1) {
							r.push(`and nuzzles her plush lips and hot tongue against your womanhood, using one hand to massage your shaft languidly. Perusing the very thorough pictures and videos of the pretty futanari for sale here is arousing enough without a truly masterful oral queen pleasing both your cock and your pussy, and you cum quickly. She drinks your cum rapturously and returns her mouth to your wet cunt, eagerly working to bring more forth.`);
						} else {
							r.push(`and snuggles her face between your thighs, nuzzling her nose into your ballsack before licking it with appetite and then sucking each of your balls gently, one by one. Meanwhile one of her clever hands is languidly massaging your shaft, bringing forth a drop of precum which she laps up with appetite. Humming with pleasure, she deepthroats you without apparent effort, her mischievous tongue flicking forward to lap at your scrotum. You blow your load down her throat, and she starts to suck you hard again.`);
						}
					} else {
						r.push(`and trails nibbles and kisses along your inner thighs before nuzzling her plush lips and hot tongue against your womanhood. Perusing the very thorough pictures and videos of the pretty futanari for sale here is arousing enough without a truly masterful cunt pleaser working her magic between your legs, and you've orgasmed before you finish one listing. She prolongs the climax cleverly and then starts to build you towards another.`);
					}

					jQuery(result).empty().append(r.join(" "));
				}
			)
		);

		if (V.PC.dick !== 0 && V.PC.vagina >= 0 && V.PC.boobs >= 300) {
			App.UI.DOM.appendNewElement("div", result,
				App.UI.DOM.link(
					"Join the Sisters' orgy",
					() => {
						r = [];
						V.futaAddiction += 1;
						switch (V.futaAddiction) {
							case 1:
								r.push(`You agree to spend some time taking part in the Sisters' orgy. The futa matron looks doubtful. "You'd have to agree to act as one of us," she says. "No different. No special sexual treatment." Her voice rises cutely on the last syllable, as you take her enormous dick in one hand and begin to stroke it vigorously. "V-very well," she gasps, taking one of your breasts in each of her hands.`);
								if (V.PC.vagina === 0) {
									r.push(`You leave the Sisters' suite a few hours later, <span class="green">leaving your virginity behind.</span> You are tired and a bit sore, but satisfied.`);
									V.PC.vagina = 1;
								} else {
									r.push(`You leave the Sisters' suite after a few hours of fucking and being fucked, feeling tired but satisfied.`);
								}
								if (canGetPregnant(V.PC)) {
									knockMeUp(V.PC, 5, 0, -9);
								}
								break;
							case 2:
								r.push(`She doesn't have to explain the Sisters' sexual equality this time, or that you have to subject yourself to it. You remember, and you let her know you're willing by giving her a friendly hug that squashes your breasts against each other and rubs your stiff pricks together. She reaches around you to grab your ass, already pulling you towards the pile of futas. You leave the Sisters' suite after a few hours of fucking and being fucked,`);
								if (V.PC.vagina === 0) {
									r.push(`with <span class="green">your cherry popped${V.PC.counter.reVirgin ? " again" : ""},</span>`);
									V.PC.vagina = 1;
								}
								r.push(`in a state of total sexual satiation.`);
								if (canGetPregnant(V.PC)) {
									knockMeUp(V.PC, 10, 0, -9);
								}
								break;
							case 3:
								r.push(`She asked that with a distinctly flirty tone, obviously hoping you'd agree again, and she isn't disappointed. You take her by the hand and skip over to the pile of futas, most of which know you very intimately by now. They see their Sister and you approaching, and those of them that don't have their mouths full greet you eagerly. Three of them quickly rearrange themselves to present you with a couple of dicks to sit on and a pussy to fuck, all at once. You leave the Sisters' suite after many hours of fucking and being fucked,`);
								if (V.PC.vagina === 0) {
									r.push(`with <span class="green">your cherry popped${V.PC.counter.reVirgin ? " again" : ""},</span>`);
									V.PC.vagina = 1;
								}
								r.push(`tired but satisfied.`);
								if (canGetPregnant(V.PC)) {
									knockMeUp(V.PC, 20, 0, -9);
								}
								break;
							case 4:
								r.push(`She asked that in a knowing voice, confident you'd agree, and was already moving in to kiss you when you did. She seems to want you more than usual today, and pulls you down onto the edge of the pit, guiding your cock into her pussy. She isn't selfish, of course, and reaches around to spread your buttocks so you can get fucked while you fuck. You leave the Sisters' suite after many hours of this,`);
								if (V.PC.vagina === 0) {
									r.push(`with <span class="green">your cherry popped${V.PC.counter.reVirgin ? " again" : ""},</span>`);
									V.PC.vagina = 1;
								}
								r.push(`very tired. You wonder when you can make time to visit the Sisters again.`);
								if (canGetPregnant(V.PC)) {
									knockMeUp(V.PC, 40, 0, -9);
								}
								break;
							case 5:
								r.push(`She runs her tongue over her lips as she asks, and sits you down on the edge of the pit and deepthroats you as soon as you agree. She wants your cum, and uses a couple of fingers to tickle your prostate and make it appear faster. You jerk with orgasm, and she pushes your wet cock up against your stomach so she can`);
								if (V.PC.vagina === 0) {
									r.push(`<span class="green">take your ${V.PC.counter.reVirgin ? " restored" : ""}virginity</span> and`);
									V.PC.vagina = 1;
								}
								r.push(`fuck your pussy. She pauses for a moment, letting a younger Sister enter her ass first. You leave the Sisters' suite after a full day of this, utterly exhausted but eager to return.`);
								if (canGetPregnant(V.PC)) {
									knockMeUp(V.PC, 60, 0, -9);
								}
								break;
							case 6:
								r.push(`You nod, and she turns back towards the orgy, not seeing any reason to lead you, since you know the way. You both sink back into the pile of cocks, pussies, mouths, asses, boobs; the hours go by without you noticing. You leave the Sisters' suite`);
								if (V.PC.vagina === 0) {
									r.push(`with <span class="green">your cherry popped${V.PC.counter.reVirgin ? " again" : ""}</span> and`);
									V.PC.vagina = 1;
								}
								r.push(`unable to remember specifics, but you clearly fucked and got fucked by every futa there at least once. You're surprised when you learn how long you were there, but the worries of being an arcology owner no longer seem as pressing as they once did.`);
								if (canGetPregnant(V.PC)) {
									knockMeUp(V.PC, 80, 0, -9);
								}
								break;
							case 7:
								r.push(`You don't even bother to respond, and head straight for the orgy. You insert yourself into an eager mouth, bending over so the matron following you can take you from behind. The worries of your life as an arcology owner seem very far away as she`);
								if (V.PC.vagina === 0) {
									r.push(`<span class="green">takes your ${V.PC.counter.reVirgin ? " restored" : ""}virginity</span> and`);
									V.PC.vagina = 1;
								}
								r.push(`slides inside you. You only leave when ${V.assistant.name} repeatedly pages you over the arcology's public announcement system. On the way to your office, you notice how full of cum your stomach is, how relaxed your pussy and ass are, and how happy you feel.`);
								if (canGetPregnant(V.PC)) {
									knockMeUp(V.PC, 100, 0, -9);
								}
								break;
							case 8:
								V.gameover = "sisters";
								SugarCube.Engine.play("Gameover");
								break;
							default:
								V.futaAddiction = 0;
						}
						jQuery(result).empty().append(r.join(" "));
					}
				)
			);
		}
	} else {
		App.UI.DOM.appendNewElement("p", el, `The Futanari Sisters use the same legalistic structures as other slave schools, but are actually very different. They're quite enigmatic, and inquiry into their cult-like methods is politely discouraged. All the Sisters own the institution together, and seem to share the goal of pursuing transformation of themselves to fit the classic futanari fetish — that is, to transform themselves into beautiful, curvaceous women with large dicks. All Sisters remain within the closed society for at least seven years. The Sisters fund themselves by selling members into slavery: interestingly, the more impressive a member is, the older she seems to be when sold; there may be a sort of selection mechanism by which the losers are sold immediately and the winners remain, leading the Sisters. This does not mean that ex-Sisters are unhappy with enslavement. On the contrary, it seems to be an expected stage of their lives, and not shameful.`, "scene-intro");
		if (V.TFS.schoolUpgrade !== 0) {
			r.push(`Since you have supported the faction within the Sisters that favors`);
			if (V.TFS.schoolUpgrade === 3) {
				r.push(`a mix of futas with and without balls; its female members will appear without balls, while its male members will appear with extremely large testicles.`);
				if (V.TFS.compromiseWeek + 15 > V.week) {
					r.push(`Or they will, in around ${(V.TFS.compromiseWeek + 15) - V.week} weeks.`);
				}
			} else if (V.TFS.schoolUpgrade === 1) {
				r.push(`futas without balls, its members will now appear without visible testicles and increased submissiveness.`);
			} else {
				r.push(`futa balls, its members will now appear with extremely large testicles and increased sex drives.`);
			}
			r.push(`As a major`);
			if (V.PC.title === 0) {
				r.push(`benefactrix`);
			} else {
				r.push(`benefactor`);
			}
			r.push(`of the institution, you also receive a discount on them.`);
		}
		App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");
		App.UI.DOM.appendNewElement("p", el, `The Sisters offer a member selected for sale into slavery for inspection via video call. The feed is of an exhausted futa, fast asleep. Whatever ceremonies the Sisters perform before releasing a member into slavery, they seem to have tired her out. There are indistinct but obviously sexual sounds audible in the background; it sounds like an orgy with a very large number of participants is going on nearby.`);
	}
	const modifiers = [];
	modifiers.push({factor: -0.2, reason: "TFS base discount"});
	if (V.TFS.schoolSale !== 0) {
		modifiers.push({factor: -0.5, reason: "TFS sale"});
	} else if (V.TFS.schoolUpgrade !== 0) {
		modifiers.push({factor: -0.2, reason: "TFS endowment discount"});
	}
	el.append(
		App.Markets.purchaseFramework("TFS", {modifiers})
	);

	return el;
};
