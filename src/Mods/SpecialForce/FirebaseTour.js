// cSpell:ignore Ahhh

App.UI.firebaseTour = function() {
	const node = new DocumentFragment();
	let r = [];

	App.UI.DOM.appendNewElement("p", node, `You continue towards the common area, the soldiers you pass, nod respectfully, salute, or bow slightly, as they please. You pass the briefing areas, the officers and sergeants of the force are conferring over planning tables and display screens regarding their upcoming deployments.`);

	r.push(`The commanders are`);
	if (V.SF.Target === "recruit") {
		r.push(`viewing lists of potential recruits for ${V.SF.Lower}. Mainly mercenaries and old world soldiers who might be receptive to an offer of employment and residence within the arcology, in addition to some citizens of the arcology who wish to have some excitement in their lives.`);
	} else if (V.SF.Target === "secure") {
		r.push(`reviewing maps of trade routes to the arcology as well as nearby merchant hubs, arranging their future deployments to best protect them and encourage business and trade.`);
	} else {
		r.push(`reviewing maps of settlements and locations reported to have choice concentrations of material loot and potential slave stock, in preparation for their coming raids.`);
	}
	App.Events.addParagraph(node, r);
	r = [];

	if (V.SF.ROE === "hold") {
		r.push(`There are posted (and very strict) guidelines for the use of force against non-citizen residents, forbidding the use of heavy weapons or indiscriminate fire.`);
	} else if (V.SF.ROE === "limited") {
		r.push(`There are some guidelines posted regarding the use of force against non-citizens, forbidding general indiscriminate fire.`);
	} else {
		r.push(`Guidelines regarding the use of force are completely absent from the deployment information screens. A note affixed to the screen, probably from a soldier, says: "Pop 'em if you see 'em — better than target practice!" Another one on top of that, from The Colonel, says: "Don't shoot the pretty ones, you fucking morons, or I'll kill you myself. They're worth good money or good for fun — do you idiots really want to have to fuck month-old stock?"`);
	}
	App.Events.addParagraph(node, r);
	r = [];

	if (V.SF.Regs === "strict") {
		r.push(`On several screens, there are prominent warnings regarding the severe disciplinary procedures that will be taken against soldiers who commit crimes while on deployment.`);
	} else if (V.SF.Regs === "some") {
		r.push(`On several screens, there are some minor warnings regarding the mild disciplinary procedures that may be taken against soldiers who commit especially severe crimes while on deployment.`);
	} else {
		r.push(`There are no warnings or information regarding disciplinary procedures on any of the screens. Near one of them, a waste basket has been dragged over and a soldier has posted a note above it that says: "For old world Complaints and Warrants."`);
	}
	App.Events.addParagraph(node, r);
	r = [];

	node.append(App.Mods.SF.fsIntegration.flavourText(90));

	r.push(
		`You arrive at the firebase's common area, a nest of bars, pleasure dens, public spaces, and other facilities catering to the soldiers' needs and giving them somewhere to spend their free time, since they do not mingle with your citizens on the higher levels or exit the arcology except on deployment. It is well-occupied by the soldiers not currently tasked with duties, and they respectfully move out of your way as you approach, clearing a path for you to move forward.`,
		App.Mods.SF.fsIntegration.flavourText(50),
		App.Mods.SF.fsIntegration.flavourText(5),
		App.Mods.SF.fsIntegration.flavourText(10),
	);

	r.push(`The amenities are staffed by menial slaves, captured by the soldiers on their excursions. They are`);
	if (V.SF.Depravity <= 0.3 && V.SF.Colonel.Core === "kind") {
		r.push(`wearing plain jumpsuits and slim identification collars to set them apart from the soldiers, and look resigned but not fearful. The soldiers themselves socialize at the bars, in small groups around tables, and in the gambling parlors. Many of them can be seen entering or leaving the dens occupied by the sexual slaves they have acquired. Laughter from the carousing soldiers can be heard at all times. Small groups of slaves move freely between the plaza and their basic accommodations attached to the firebase.`);
	} else if (V.SF.Depravity <= 0.6 && V.SF.Colonel.Core === "kind") {
		r.push(`topless, wearing only utilitarian pants and leather collars to set them apart from the soldiers, and occasionally shoot fearful looks at the soldiers. The soldiers themselves socialize at the bars, or in large groups around tables, leering at and groping slaves of interest as they pass by. Many of them can be seen entering or leaving the dens occupied by the sexual slaves they have acquired, and often emerge only partially dressed, sometimes pulling half-naked slaves out with them.`);
	} else if (V.SF.Depravity <= 0.9) {
		r.push(`topless, wearing only utilitarian shorts and steel collars to set them apart from the soldiers, and often shoot fearful looks at the soldiers. The soldiers themselves socialize at the bars, or in large groups around tables, leering at and heavily groping slaves of interest as they pass by. Many of them can be seen entering or leaving the dens occupied by the sexual slaves they have acquired, and often emerge stark naked, sometimes pulling naked slaves out with them for one last servicing in public. A few soldiers stagger around in drunken hazes or drugged-out stupors.`);
	} else if (V.SF.Depravity <= 1.2) {
		r.push(`topless, wearing only a single undergarment and heavy steel collars to set them apart from the soldiers, and often shoot fearful looks at the soldiers. The soldiers occupy themselves primarily with sex, pulling slaves onto benches and fucking them hard in public. Many soldiers stagger around or lie passed out from drug and alcohol abuse.`);
	} else if (V.SF.Depravity >= 1.5 && (V.SF.Colonel.Core === "brazen" || V.SF.Colonel.Core !== "shell shocked")) {
		r.push(`naked, and are wearing heavy shock collars to force obedience. Most are wild-eyed with fear or dull-eyed from mental collapse, and many others bear marks of abuse. Few of the slaves are here long-term, the depraved pleasures of the soldiers resulting in enormous turnover and loss of 'damaged' stock. The extreme libations of the soldiers are ever-present. Drunken soldiers stagger around everywhere, beating slaves too slow to get out of their way. Others lie sprawled out on the ground, rendered senseless from heavy drug abuse. Some walk around naked, and hold slaves down on the benches scattered around, raping or sodomizing them with their cocks or their personal strap-ons as they desire. In alcoves, some soldier-lover pairs fuck loudly, moaning in pleasure.`);
		const {
			heU, hisU, himU, girlU
		} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		if (random(1, 100) <= 50) {
			r.push(`Off to the side, a group of soldiers brutally gangbang a very young slave${girlU}, with one soldier buried balls-deep in ${hisU} ass,`);
			if (heU === "she") {
				r.push(`another brutally sawing a barbed strap-on in and out of ${hisU} pussy, and a third`);
			} else {
				r.push(`and another`);
			}
			r.push(`with his cock forced deep down ${hisU} throat. The slave ${girlU} struggles and gags, desperate for breath or relief.`);
		} else if (random(1, 100) > 50) {
			r.push(`Off to the side, a group of soldiers cackle amongst themselves as they take turns beating a very young slave ${girlU} with heavy batons. Sickening crunches can be heard from the screaming slave.`);
		} else if (random(1, 100) > 75) {
			r.push(`Off to the side, still more soldiers crowd around an above-ground pit built from empty crates, gambling on slave gladiator fights. There's a drunken cheer as one of the fighters, a very young slave ${girlU}, straddles another one and smashes ${hisU} face in with a blood-slick ammo crate. As ${heU} stands, shaking from fear and adrenaline, one of the soldiers laughs and throws a small incendiary grenade at ${himU}, changing the cheers to curses as the other soldiers jump away from the flaming, screeching slave.`);
		} else {
			r.push(`Screams and cries of pain can be heard echoing around the area as the soldiers have their fun with their property.`);
		}
	}
	App.Events.addParagraph(node, r);
	r = [];

	node.append(App.Mods.SF.fsIntegration.flavourText(15));
	node.append(App.Mods.SF.fsIntegration.flavourText(20));
	node.append(App.Mods.SF.fsIntegration.flavourText(25));

	App.Events.addParagraph(node, [
		`In the middle of the common area is a pile of supply crates with a pavilion on top — The Colonel's personal throne and open quarters, the result of her preferring to live an extreme lifestyle amongst her soldiers rather than in her empty quarters on the upper levels. It's draped with the 'flag' of ${V.SF.Lower}, one of her inventions. Sprawled all around it is an immense quantity of alcohol, hard drugs, clothes, electronic devices, huge amounts of cash, jewels and precious metals looted from the outside world.`
	]);

	const {
		heU, himU, hisU, girlU
	} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
	r.push(`As you approach, The Colonel`);
	if (random(0, 100) <= 50) {
		r.push(`raises a hand in greeting and nods. She is sprawled on a couch, wearing only her combat suit tank top and fingerless gloves. She's holding a near-empty bottle of strong liquor in her hand and you can see a naked slave ${girlU} kneeling on the floor between her legs. The Colonel has her legs wrapped tightly around the ${girlU}'s head, forcing the ${girlU} to service her if ${heU} wants to breathe. The Colonel is close to her climax then suddenly tenses her lower body, thus gripping the ${girlU} even tighter, and throws her head back in ecstasy as she orgasms. She lets out a long breath before finally releasing the ${girlU}, giving ${himU} a hard smack and shouting at ${himU} to fuck off.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The Colonel finishes off her bottle, tossing it over her shoulder then leaning back on the couch and spreading her legs wide. You look down briefly, falling into your habits of inspection. Her pussy is completely devoid of hair with heavy labia with a very large and hard clit peeking out. Beads of moisture, the result of her excitation, are visible, and you can tell from long experience that she would be tight as a vise. You return your gaze to her face to find her smirking at you. "Like what you see, ${App.Mods.SF.ColonelStatus()}?" She waves her hand at the plaza around her, "So do they. But you're not here for pussy. You're here to talk business. So, what's up?"`);
	} else if (random(0, 100) > 50) {
		r.push(`is in no condition initially to greet you. She's naked except for one sock that gives you a very good view of her muscled, taut body laid out across the couch with her feet on the table. She is face-down in a drugged-out stupor in the middle of a wide variety of powders and pills. Perhaps sensing your approach, her head suddenly shoots up and looks at you with unfocused, bloodshot eyes. "Sorry, ${App.Mods.SF.ColonelStatus()}," she slurs, wiping her face and weakly holding up a hand. "Hold on a second, I need something to help me out here. Long fucking night." She struggles to sit on the couch and bending over the table, loudly snorts up some of the white powder on it. "Ahhh, fuck," she says, breathing heavily.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`She shakes her head powerfully now looking at you, her eyes once again alert and piercing. "That's better," she says, leaning back on the couch and giving you another good view of her assets. "So, ${App.Mods.SF.ColonelStatus()}," she begins, "what brings you down here to our little clubhouse? I trust you're happy with how we've been handling things out there?" You nod. "Excellent", she laughs. "I have to say; it's nice to have a place like this while having some top-end gear and to be able to have fun out there without worrying about anyone coming back on us. Good fucking times." She laughs again. "So — I'm assuming you want something?"`);
	} else if (random(0, 100) > 70 && V.SF.Depravity >= 1.5 && V.SF.Colonel.Core === "cruel") {
		r.push(`is relaxing on her couch stark naked, greeting you with a raised hand. Between her tightly clenched legs is a slave ${girlU} being forced to eat her out. "Hey, ${App.Mods.SF.ColonelStatus()}, what's —" she breaks off as a flash of pain crosses her features. "Fucking bitch!" she exclaims, pulling her legs away and punching the slave ${girlU} in the face. She pushes the ${girlU} to the ground, straddling ${himU} then begins hitting. You hear one crunch after another as The Colonel's powerful blows shatter the ${girlU}'s face. She hisses from between clenched teeth, each word accompanied by a brutal punch. "How. Many. Fucking. Times. Have. I. Told. You. To. Watch. Your. Fucking. Teeth. On. My. Fucking. Clit!" She leans back, exhaling heavily. Before leaning back down to grip apply pressure onto the ${girlU}'s neck with her powerful hands. Wordlessly, she increases the pressure and soon the ${girlU} begins to turn blue as ${heU} struggles to draw breath. Eventually ${hisU} struggles weaken and then, finally, end.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The Colonel relaxes her grip then wipes her brow, clearing away the sweat from her exertion. Finally rising from the ${girlU}'s body, relaxing back on the couch and putting her feet back up on the table. "Sorry about that ${App.Mods.SF.ColonelStatus()}," she says, shrugging. "So many of these bitches we pick up from the outside don't understand that they have to behave." Shaking her head in frustration, "Now I need to find another one. But that's not your problem — you're here to talk business. So, what's up?"`);
	} else {
		r.push(`is topless while reviewing the particulars of her unit on a tablet as you approach. She raises a hand in greeting. "Hey ${App.Mods.SF.ColonelStatus()}," she says, noticing you looking at her chest. She laughs. "Nice, aren't they? But they're not for you or them." She throws a thumb at the plaza around her. "You're down here for a reason, though. What can I do for you?"`);
	}
	App.Events.addParagraph(node, r);
	r = [];

	App.Events.addParagraph(node, [
		App.Mods.SF.fsIntegration.flavourText(40),
		App.Mods.SF.fsIntegration.flavourText(200),
		App.Mods.SF.fsIntegration.flavourText(100),
	]);

	if (V.SF.Squad.Firebase === 10) {
		App.Events.addParagraph(node, [`The quiet hum of fans keeping the faster and much more efficient custom network operational can be heard throughout the firebase.`]);
	}

	App.UI.DOM.appendNewElement("h3", node, `Current facilities status`);
	App.Events.addParagraph(node, [
		App.Mods.SF.UnitText('firebase'),
		App.Mods.SF.UnitText('troop'),
		App.Mods.SF.fsIntegration.flavourText(30),
		App.Mods.SF.fsIntegration.flavourText(80),
		App.Mods.SF.fsIntegration.flavourText(85),
		App.Mods.SF.UnitText('Armoury'),
		App.Mods.SF.fsIntegration.flavourText(35),
		App.Mods.SF.UnitText('drugs'),
		App.Mods.SF.fsIntegration.flavourText(45),
		App.Mods.SF.UnitText('UAV'),
		App.Mods.SF.fsIntegration.flavourText(55),
	]);


	if (App.Mods.SF.unlocked.garage()) {
		App.UI.DOM.appendNewElement("h3", node, `Garage`);
		if (V.SF.Squad.AV+V.SF.Squad.TV > 0) {
			App.UI.DOM.appendNewElement("h3", node, `Vehicles`);
			r.push(
				App.Mods.SF.UnitText('AV'),
				App.Mods.SF.UnitText('TV')
			);
		}
		r.push(
			App.Mods.SF.UnitText('PGT'),
			App.Mods.SF.fsIntegration.flavourText(60),
			App.Mods.SF.fsIntegration.flavourText(65)
		);
	}
	App.Events.addParagraph(node, r);
	r = [];

	if (App.Mods.SF.unlocked.hangar()) {
		App.UI.DOM.appendNewElement("h3", node, `Hangar`);
		if (V.SF.Squad.AA+V.SF.Squad.TA > 0) {
			App.UI.DOM.appendNewElement("h3", node, `Airforce`);
			r.push(
				App.Mods.SF.UnitText('AA'),
				App.Mods.SF.UnitText('TA')
			);
		}
		r.push(
			App.Mods.SF.UnitText('SP'),
			App.Mods.SF.UnitText('GunS'),
			App.Mods.SF.fsIntegration.flavourText(70),
			App.Mods.SF.fsIntegration.flavourText(75),
		);
	}
	App.Events.addParagraph(node, r);
	r = [];

	if (App.Mods.SF.unlocked.launchBay()) {
		App.UI.DOM.appendNewElement("h3", node, `Launch Bay`);
		if (V.SF.Squad.Satellite > 0) {
			r.push(App.Mods.SF.UnitText('sat'));
			const t = new DocumentFragment();
			t.append("You ", App.UI.DOM.makeElement("span", `cannot`, "red"), " upgrade the satellite once it has been launched.");
			const inOrbit = V.SF.SatLaunched === 1;
			const link = App.UI.DOM.makeElement("div",
				App.UI.DOM.link(
					(inOrbit ? "Recall the satellite." : "Launch it into geostationary orbit."),
					() => {
						V.SF.SatLaunched = (inOrbit ? 0 : 1);
						App.UI.reload();
					},
					[],
					"",
					(inOrbit ? t : ``)
				)
			);
			r.push(link);
		}
		r.push(
			App.Mods.SF.UnitText('GR'),
			App.Mods.SF.UnitText('ms')
		);
		App.Events.addParagraph(node, r);
	}

	if (App.Mods.SF.unlocked.navalYard()) {
		App.UI.DOM.appendNewElement("h3", node, `Naval Yard`);
		App.Events.addParagraph(node, [
			App.Mods.SF.UnitText('AC'),
			App.Mods.SF.UnitText('Sub'),
			App.Mods.SF.UnitText('HAT'),
		]);
	}

	return node;
};
