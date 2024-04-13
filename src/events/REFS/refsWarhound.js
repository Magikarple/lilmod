App.Events.refsWarhound = class refsWarhound extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSNeoImperialist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const slave = GenerateNewSlave(null, {minAge: 16, maxAge: 24, disableDisability: 1});

		slave.career = "a child soldier";
		slave.muscles = random(50, 75);
		if (slave.weight > 130) {
			slave.weight -= 100;
			slave.waist = random(-10, 50);
		}
		applyMindbroken(slave, -100);
		slave.tailShape = jsEither(["dog", "wolf", "jackal", "cat", "leopard", "tiger", "jaguar", "lion"]);
		switch (slave.tailShape) {
			case "dog":
				slave.earT = "dog";
				slave.origin = "You don't know what $he was before $he was abducted by Imperial merchants, transformed into a cybernetic, mindbroken beast of war, and sold to you. Now $he only receives positive stimuli directly to $his brain when being loyal and obedient to you, and a barrage of violent imagery when you order $him to attack. $he has a set of advanced prosthetic limbs resembling those of canines, that make $him quadrupedal instead of bipedal like regular humans. The canine limbs posses retractable claws, that are able to pierce steel plates, in addition to providing amazing speed and maneuverability.";
				configureLimbs(slave, "all", 10);
				break;
			case "wolf":
				slave.earT = "wolf";
				slave.origin = "You don't know what $he was before $he was abducted by Imperial merchants, transformed into a cybernetic, mindbroken beast of war, and sold to you. Now $he only receives positive stimuli directly to $his brain when being loyal and obedient to you, and a barrage of violent imagery when you order $him to attack. $he has a set of advanced prosthetic limbs resembling those of canines, that make $him quadrupedal instead of bipedal like regular humans. The canine limbs posses retractable claws, that are able to pierce steel plates, in addition to providing amazing speed and maneuverability.";
				configureLimbs(slave, "all", 10);
				break;
			case "jackal":
				slave.earT = "jackal";
				slave.origin = "You don't know what $he was before $he was abducted by Imperial merchants, transformed into a cybernetic, mindbroken beast of war, and sold to you. Now $he only receives positive stimuli directly to $his brain when being loyal and obedient to you, and a barrage of violent imagery when you order $him to attack. $he has a set of advanced prosthetic limbs resembling those of canines, that make $him quadrupedal instead of bipedal like regular humans. The canine limbs posses retractable claws, that are able to pierce steel plates, in addition to providing amazing speed and maneuverability.";
				configureLimbs(slave, "all", 10);
				break;
			case "cat":
				slave.earT = "cat";
				slave.origin = "You don't know what $he was before $he was abducted by Imperial merchants, transformed into a cybernetic, mindbroken beast of war, and sold to you. Now $he only receives positive stimuli directly to $his brain when being loyal and obedient to you, and a barrage of violent imagery when you order $him to attack. $he has a set of advanced prosthetic limbs resembling those of felines, that make $him quadrupedal instead of bipedal like regular humans. The feline limbs posses retractable claws, that are able to pierce steel plates, in addition to providing amazing speed and maneuverability.";
				configureLimbs(slave, "all", 9);
				break;
			case "leopard":
				slave.earT = "leopard";
				slave.origin = "You don't know what $he was before $he was abducted by Imperial merchants, transformed into a cybernetic, mindbroken beast of war, and sold to you. Now $he only receives positive stimuli directly to $his brain when being loyal and obedient to you, and a barrage of violent imagery when you order $him to attack. $he has a set of advanced prosthetic limbs resembling those of felines, that make $him quadrupedal instead of bipedal like regular humans. The feline limbs posses retractable claws, that are able to pierce steel plates, in addition to providing amazing speed and maneuverability.";
				configureLimbs(slave, "all", 9);
				break;
			case "tiger":
				slave.earT = "tiger";
				slave.origin = "You don't know what $he was before $he was abducted by Imperial merchants, transformed into a cybernetic, mindbroken beast of war, and sold to you. Now $he only receives positive stimuli directly to $his brain when being loyal and obedient to you, and a barrage of violent imagery when you order $him to attack. $he has a set of advanced prosthetic limbs resembling those of felines, that make $him quadrupedal instead of bipedal like regular humans. The feline limbs posses retractable claws, that are able to pierce steel plates, in addition to providing amazing speed and maneuverability.";
				configureLimbs(slave, "all", 9);
				break;
			case "jaguar":
				slave.earT = "jaguar";
				slave.origin = "You don't know what $he was before $he was abducted by Imperial merchants, transformed into a cybernetic, mindbroken beast of war, and sold to you. Now $he only receives positive stimuli directly to $his brain when being loyal and obedient to you, and a barrage of violent imagery when you order $him to attack. $he has a set of advanced prosthetic limbs resembling those of felines, that make $him quadrupedal instead of bipedal like regular humans. The feline limbs posses retractable claws, that are able to pierce steel plates, in addition to providing amazing speed and maneuverability.";
				configureLimbs(slave, "all", 9);
				break;
			case "lion":
				slave.earT = "lion";
				slave.origin = "You don't know what $he was before $he was abducted by Imperial merchants, transformed into a cybernetic, mindbroken beast of war, and sold to you. Now $he only receives positive stimuli directly to $his brain when being loyal and obedient to you, and a barrage of violent imagery when you order $him to attack. $he has a set of advanced prosthetic limbs resembling those of felines, that make $him quadrupedal instead of bipedal like regular humans. The feline limbs posses retractable claws, that are able to pierce steel plates, in addition to providing amazing speed and maneuverability.";
				configureLimbs(slave, "all", 9);
				break;
		}
		slave.teeth = "pointy";
		slave.earImplant = 1;
		slave.tailColor = slave.hColor;
		slave.earTColor = slave.hColor;
		slave.face = random(-25, 50);
		slave.preg = -1;
		slave.collar = "tight steel";
		slave.canRecruit = 0;
		slave.custom.tattoo = `$He has the Imperial symbol of your arcology tattooed above a barcode on $his neck.`;
		setHealth(slave, jsRandom(30, 60), 0, 0, 0, 0);

		const {
			He,
			he, his, him, girl
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`The Imperial marketplace is a loud and lively place, no matter the day or hour, permeated by the constant noise of face-to-face trade even in the dead of night. As you walk down the marketplace today a dozen different curiosities catch your eye, nose, and ear alike, distracted by the smell of roasting meat and the glimmer of a shiny new old-world fashion on display in some packed-in corner store. But one particularly unusual merchant and his wares catch your attention immediately, standing out from the trifles and trivialities always for sale - a fat, smiling man holding a colorful open-air stand, and holding in one hand a leash attached to a tight steel collar, keeping an obviously cybernetically-enhanced quadruped ${girl} at his side.`]);

		App.Events.addParagraph(node, [`As you approach, the fat merchant bows deeply, still holding the leash. "Ah, your Highness!" The trader says in a high-pitched, silky voice, his pudgy face coming up to look you in the eyes. "I had not expected such a royal calibre of visitor to my humble stall, but you shall nevertheless profit much from my wares." You gesture to the ${girl} on the leash, who, upon closer inspection, seems to be some kind of cybernetic beast-${girl}, and ask what ${he} is.`]);

		App.Events.addParagraph(node, [`"${He}'s a warbeast, your Imperial majesty. A common criminal, some gutter trash waste of oxygen from the old world, given fresh purpose in life by the wonders of our new technologies. Now, what was once a street rat receives pleasure in life only from obeying the will of ${his} masters - you and I - courtesy of an implant in ${his} brain that dulls all function but the pleasure of servitude, flooding ${him} with serotonin and other such chemicals when ${he} obeys." The pudgy merchant harshly tugs on the leash, and the 'warbeast' yelps, then rolls over on ${his} back to submissively display ${his} pristine, naked genitals. "Do not be deceived by ${his} submissive appearance towards you, my lord. Simply gesture at your foes and whisper an order, and ${he} will tear a thousand soldiers apart with teeth and claw to protect you. And ${he} can be yours for the criminally low price of merely twenty thousand credits, special for the undisputed master of ${V.arcologies[0].name}!"`]);

		const enormousCash = 20000;
		const choices = [];
		if (V.cash >= enormousCash) {
			choices.push(new App.Events.Result(`Buy the Warbeast`, buy, `Costs ${cashFormat(enormousCash)}`));
		}

		choices.push(new App.Events.Result(`Decline the merchant's offer`, refuse));

		App.Events.addResponses(node, choices);

		function buy() {
			cashX(forceNeg(enormousCash), "slaveTransfer", slave);
			return [
				`You nod once to the merchant and electronically transfer the money to him without a second thought. The pudgy man clasps his hands together gleefully and then hands you the leash, smiling like a snake. "Oh, and we have not yet assigned ${him} a name, my liege - please feel free to call ${him} whatever you wish. Enjoy your new beast!"`,
				App.UI.newSlaveIntro(slave)
			];
		}

		function refuse() {
			return `The merchant shrugs his fat shoulders nonchalantly, his smile not wavering for even a second. "Ah, your loss, my liege. These beast are very popular, and I doubt ${he} will still be here by the end of the day. But perhaps another time, no? There is always more gutter trash to capture..."`;
		}
	}
};
