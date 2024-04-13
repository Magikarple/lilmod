App.Markets.corporate = function() {
	const el = new DocumentFragment();
	const r = new SpacedTextAccumulator(el);
	let dickVision;
	if (V.corp.SpecGender === 2) {
		dickVision = 100;
	} else if (V.corp.SpecGender === 1) {
		dickVision = 0;
	} else {
		dickVision = V.seeDicks;
	}
	const {
		HeU, heU, HisU, hisU, himU, himselfU, womanU, girlU, womenU
	} = getNonlocalPronouns(dickVision).appendSuffix('U');

	r.push(`You're in your corporation's flagship slave market.`);

	r.push(`The corporation pays you only nominal rent for this space, but will offer you a discount on slaves here based on your shares in it. Additionally, having the corporation's premiere products sold here in ${V.arcologies[0].name} will associate them with you, allowing your reputation to improve the corporate brand. A pretty`);
	if (V.corp.SpecDick === 1 && V.corp.SpecPussy === 1) {
		r.push(`futanari`);
	} else if (V.corp.SpecGender === 2) {
		if (V.corp.SpecBalls === -1) {
			r.push(`clipped`);
		} else {
			r.push(`shemale`);
		}
	}
	r.push(`sales${V.corp.SpecAge === 3 ? womanU : girlU}`);
	r.push(`in a slutty suit greets you properly. ${HeU}'s a corporate slave chosen for loyalty and intelligence, and to physically represent the brand.`);
	if (V.corp.SpecHeight === 5) {
		r.push(`Even before ${heU} engaged with you ${hisU} towering height made ${himU} stand out and caught your eye; from up close ${heU}'s even more impressive.`);
	} else if (V.corp.SpecHeight === 1) {
		r.push(`${HeU}'s so short you have to physically look down on ${himU}.`);
	}
	if (V.corp.SpecInjection === 4) {
		r.push(`${HeU} has awe-inspiring breasts which ${hisU} suit jacket helps support; even so, their bottoms reach past ${hisU} navel.`);
	} else if (V.corp.SpecInjection === 5) {
		r.push(`${HeU} has gigantic, milk-swollen breasts almost spilling out of ${hisU} suit.`);
	} else if (V.corp.SpecImplants === 2) {
		r.push(`${HeU} has enormous fake tits that ride inhumanly high on ${hisU} chest.`);
	} else if (V.corp.SpecInjection === 3) {
		r.push(`${HeU} has huge tits and a nice broad butt which ${hisU} tight skirt hugs closely.`);
	} else if (V.corp.SpecImplants === 1) {
		r.push(`${HeU} has nice fake bimbo tits and a silicone bubble butt.`);
	} else if (V.corp.SpecInjection === 2) {
		r.push(`${HeU}'s nice and curvy, with nice breasts and a lovely ass.`);
	} else if (V.corp.SpecInjection === 1) {
		r.push(`${HeU} has cute little breasts and a petite rump.`);
	}
	if (V.corp.SpecCosmetics === 1) {
		r.push(`${HisU} face is flawless.`);
	}
	if (V.corp.SpecRaces.length === 1 || V.corp.SpecNationality) {
		let corpSpecRace;
		if (V.corp.SpecNationality) {
			corpSpecRace = V.corp.SpecNationality;
		} else if (V.corp.SpecRaces.length > 0) {
			corpSpecRace = jsEither(V.corp.SpecRaces);
		}
		r.push(`${HeU}'s ${corpSpecRace}, of course${(V.corp.SpecAccent === 1) ? `, and has a cute accent` : ``}.`);
	}
	if (V.corp.SpecHormones === 1) {
		r.push(`${HisU} voice is soft and feminine, and ${heU} bats ${hisU} eyes at you.`);
	} else if (V.corp.SpecHormones === 2) {
		r.push(`${HeU} has a deep voice, and speaks assertively.`);
	}
	if (V.corp.SpecMuscle === 4) {
		r.push(`${HisU} hot body is perfectly toned under ${hisU} suit.`);
	} else if (V.corp.SpecMuscle === 5) {
		r.push(`${HisU} suit is specially tailored to flatter ${hisU} visible musculature.`);
	}
	r.push(`Of course, you know all about the corporation, but sales${V.corp.SpecAge === 3 ? womenU : `${girlU}s`} here have standing orders to treat you like any other customer, so you can review the market properly. The slave turns to`);
	if (V.corp.SpecAmputee !== 1) {
		r.push(`a multimedia presentation on`);
	} else {
		r.push(`a rack of`);
	}
	r.push(`your corporation's slaves.`);
	r.toParagraph();

	r.push(`${HeU} explains that the corporation captures many people, so it only retains and trains those that fit its product lines.`);
	const modifiers = [];
	if (V.corp.Market === 1) {
		r.push(`Your own local franchise of your corporation allows you to enjoy a discount.`);
		modifiers.push({factor: -0.1, reason: "local corporate franchise"});
		r.push(App.UI.DOM.link(
			"End corporate slave sales here and return this sector to standard markets.",
			() => {
				V.corp.Market = 0;
				App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Market, "Corporate Market", "Markets");
			},
			[],
			"Main"
		));
	}
	r.toParagraph();

	el.append(App.Markets.purchaseFramework("corporate", {modifiers}));

	r.push(`${HisU} presentation done, the`);
	if (V.corp.SpecDick === 1 && V.corp.SpecPussy === 1) {
		r.push(`futanari`);
	} else if (V.corp.SpecGender === 2) {
		if (V.corp.SpecBalls === -1) {
			r.push(`clipped`);
		} else {
			r.push(`shemale`);
		}
	}
	r.push(`sales${V.corp.SpecAge === 3 ? womanU : girlU} directs you to the inventory interface that will allow you to peruse the corporation's slaves, and moves over to stand next to it, ready to answer any questions.`);
	if (V.PC.dick !== 0) {
		r.push(`${HeU} positions ${himselfU} facing away from you and hikes up ${hisU} skirt to bare ${hisU}`);
		if (V.corp.SpecInjection > 4) {
			r.push(`gigantic ass`);
		} else if (V.corp.SpecImplants > 0) {
			r.push(`fake ass`);
		} else if (V.corp.SpecInjection === 3) {
			r.push(`big butt`);
		} else if (V.corp.SpecInjection === 2) {
			r.push(`cute butt`);
		} else {
			r.push(`little behind`);
		}
		r.push(`and cocks ${hisU} hips${(V.corp.SpecBalls === -1 && (V.arcologies[0].FSGenderFundamentalist === 0 || V.seeDicks > 0)) ? `, keeping ${hisU} soft cock demurely out of sight` : ``}, if you feel like`);
		if (V.corp.SpecGender === 2 && V.corp.SpecPussy !== 1) {
			r.push(`sodomizing`);
		} else {
			r.push(`fucking`);
		}
		r.push(himU);
	} else {
		r.push(`${HeU} gets down on ${hisU} knees right there, making ${hisU} mouth available if you feel like riding ${hisU} face`);
	}
	r.push(`while you browse.`);
	r.toParagraph();

	const result = App.UI.DOM.appendNewElement("span", el);
	result.append(
		App.UI.DOM.link(
			`Use ${himU}`,
			() => {
				const r = [];
				if (V.PC.dick !== 0) {
					r.push(HisU);
					if (V.corp.SpecGender === 2 && V.corp.SpecPussy !== 1) {
						r.push(`asshole is thoughtfully pre-lubed, and your cock slides easily up it`);
					} else {
						r.push(`pussy is nice and wet, and your cock slides inside ${himU} easily`);
					}
					r.push(`as you consider the slaves on offer. ${HeU}'s well trained, and uses ${hisU}`);
					if (V.corp.SpecGender === 2 && V.corp.SpecPussy !== 1) {
						r.push(`sphincter`);
					} else {
						r.push(`womanly muscles`);
					}
					r.push(`to please your member expertly as ${heU} ruts ${himselfU} gently back against you, doing almost all the work. When you orgasm, ${heU} retains the load carefully, keeping your cum inside ${himU} and away from ${hisU} nice clothes.`);
				} else {
					r.push(`${HeU}'s very well trained, and does all the work. Once you move in and straddle ${himU}, ${heU} gets right down to it, or in this case, up to it. ${HisU} clever tongue runs gently along your labia to build anticipation before starting a delightful dance around and then atop your clitoris. You orgasm in no time at all, a climax which ${heU} carefully prolongs by kissing you full on the pussy in just the right way, only breaking the oral embrace when you've ridden it as far as you'll go.`);
				}
				jQuery(result).empty().append(r.join(" "));
			}
		)
	);

	return el;
};
