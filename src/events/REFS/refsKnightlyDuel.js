App.Events.refsKnightlyDuel = class refsKnightlyDuel extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSNeoImperialist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
			() => V.arcologies[0].FSNeoImperialistLaw1 === 1,
		];
	}

	execute(node) {
		const slave = GenerateNewSlave("XY", {minAge: 22, maxAge: 34, race: "nonslave"});
		slave.origin = "$He is a knight. If you have acquired this slave, something has gone wrong.";
		slave.career = "spec ops";
		slave.devotion = random(-80, -60);
		slave.muscles = random(50, 75);
		slave.skill.combat = 70;
		slave.sexualFlaw = "malicious";
		slave.behavioralQuirk = "none";
		slave.trust = random(-30, -20);
		slave.boobs = 150;
		slave.butt = random(0, 1);
		slave.vagina = -1;
		slave.clit = 0;
		slave.labia = 0;
		slave.ovaries = 0;
		slave.preg = 0;
		slave.dick = random(3, 5);
		slave.balls = random(2, 4);
		slave.scrotum = slave.balls;
		slave.prostate = 1;
		slave.clothes = "Imperial Plate";

		App.Events.drawEventArt(node, [slave, slave]); // Draw the same slave twice since there are two knights (and neither is enslavable)

		App.Events.addParagraph(node, [`After the rise of ${V.arcologies[0].name}'s new Imperial society, Knights have become a cornerstone of the new social order. Proud, noble, and chivalrous, they're seen as heroic, even legendary figures to the general public, and play an essential role in securing your arcology against violent threats with their larger-than-life personalities. However, the proud and individualistic nature of your Knights occasionally causes problems.`]);

		App.Events.addParagraph(node, [`Most recently, two of your Knights have begun to feud with one another. After some slight neither can remember, they've been publicly exchanging insults for the last few weeks, and more recently their associated guardsmen have gotten into a few street fights against one another. Tired of the gang-like behavior, both Knights have come to you and asked for your permission for a formal duel to the death to settle their differences, once and for all.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Allow the duel`, allow),
			new App.Events.Result(`Televise the duel and have it sold as pay-per-view live entertainment`, televise),
			new App.Events.Result(`Punish both and force them to make up`, nowKiss),
		]);

		function allow() {
			repX(-1000, "event");
			return `You simply wave your hand to allow the duel and continue on with your day. The Knights exchange a hateful look between one another and leave, their hands already tightly grasping the holographic longswords at their hips. A few hours later, you receive a notification that one of them has killed the other – a decisive end to their feud. The rumours of romanticized Knights tearing at one another like savages <span class="reputation dec">horrifies</span> some of your citizens, though.`;
		}

		function televise() {
			cashX(3000, "event");
			repX(-2500, "event");
			return `The Knights straighten up as you inform them that you'll allow the duel, and they're hardly listening when you explain that it'll be televised under your supervision. If anything, they seem more excited to have an audience for their fight. A few days later, you host the event between your two champions, giving each a longsword and a tabard bearing their coat of arms as their only protection against the other. With the cameras rolling, you announce for the duel to commence, and the two massive men lunge at once another with the immediate clatter of steel on steel. As the crowd cheers fanatically, the two Knights wrestle and fight, slashing violently at the slightest sign of exposure from their enemy. After a few intense minutes of close, bloody fighting, one of the Knights slips for a moment on a pocket of loose sand, and the other rams his longsword through their neck immediately, nearly decapitating him in single motion. The crowd cheers wildly as the victorious Knight drives the rest of his longsword to the side, totally severing his enemy's head from their shoulders. As you congratulate the victor on his success, ${V.assistant.name} sends you a series of statistics indicating that the short, televised brutality has earned you <span class="cash inc">several thousand credits,</span> but that many of the public are absolutely <span class="reputation dec">horrified</span> to have seen idolized Knights murder one another in such a senseless display of brutality.`;
		}

		function nowKiss() {
			repX(1500, "event");
			return `You launch into a tirade at both of the feuding Knights about their public image and the utter childishness of their petty feud; after only a few minutes of yelling into their faces, both enormous men shirk like disciplined schoolboys under your gaze, their scarred faces pushing back into their heavy Imperial plate as if for protection. Even as you announce you'll be having both of them flogged for daring to request a duel to the death for such a trivial matter, they simply mutter apologies, red-faced at the humiliation. Some days later, after having beaten both of their hides raw in the marketplace, you see the two Knights, out of armor, sharing beers at a local bar and laughing with one another. It seems they've forgotten their blood feud as soon as they started it, and both they and the arcology are <span class="reputation inc">pleased</span> to have such an ugly matter off their hands.`;
		}
	}
};
