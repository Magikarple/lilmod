App.Events.PInsemination = class PInsemination extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.playerBred > 0,
			() => (V.PC.preg === 0 || V.PC.preg === -1),
			() => V.PC.pregWeek === 0,
			() => V.PC.vagina >= 1
		];
	}

	execute(node) {
		let r = [];

		V.nextButton = "Continue";

		if (V.playerBred === 1) {
			if (V.EliteSires.length === 0) {
				V.EliteSires = ["crazy", "futa", "moves", "preggo", "quick", "virgin"].shuffle();
			}

			switch (V.EliteSires.splice(1, 1)[0]) {
				case "moves":
					if (V.PC.counter.moves === 0) {
						r.push(`You arrive at the apartment of a rather suave man who's made some very powerful connections. No sooner than you knock on the door are you whisked away back out into the arcology for dinner and a romantic stroll through the hydroponic gardens. Once you are escorted back to his apartment, he seats you on his couch and hands you a glass of fine wine. After an evening of pleasantries, he takes you to bed and reminds you what it feels like to be a woman. He even cooks you breakfast the next morning! As he sees you to the door, he encircles your middle, gives you a deep kiss, and tells you if you ever need anything during your pregnancy, he will be there for the mother of his coming child.`);
					} else {
						r.push(`You arrive at the apartment of the gentleman, only to find him waiting to take you on another date. After a pleasant evening, and a night of intense sex, you find it hard to part with him come morning, but an arcology owner's job comes first and you have slaves waiting for your attention. He walks you back to your penthouse, deeply kissing you and making your slaves deeply envious once it comes to goodbyes. A girl could get used to a life like this, or perhaps he could even be roped into your life. Though it would take more than getting knocked up to do that, you think to yourself as you rub your fertilized belly.`);
					}
					V.PC.counter.moves++;
					break;
				case "quick":
					if (V.PC.counter.quick === 0) {
						r.push(`You arrive at the apartment of the very wealthy fuel baron who is to sire your child. He is eagerly waiting for you and quickly hurries you inside. He wastes no time, practically ripping your clothes off and forcing you over the edge of his bed. He hastily mounts you and roughly fucks your cunt — until he quickly finishes, that is, leaving you unsatisfied as he shoves you out the door, clothes in`);
						if (V.PC.dick !== 0) {
							r.push(`one hand and raging boner in the other.`);
						} else {
							r.push(`hand.`);
						}
					} else {
						r.push(`You arrive at the apartment of the quick-shooting fuel baron and once more he quickly pulls you in. He barely manages to undress you before he is on top of you humping away. Just as he is about to cum, you wrap your legs around him; anchoring yourself to him. You remind him that his job is to knock you up, and a quick in and out isn't good enough. Buying it, he keeps thrusting, letting you reach your own orgasm. He still hurried you out the door in the end, but you got some pleasure out of him this time.`);
					}
					V.PC.counter.quick++;
					break;
				case "crazy":
					if (V.PC.counter.crazy === 0) {
						r.push(`You arrive at the apartment of the rather odd shut-in of a scientist. Once inside, you begin to undo your top, only to find him`);
						if (V.PC.career === "servant") {
							r.push(`lifting your dress,`);
						} else if (V.PC.career === "escort") {
							r.push(`removing your slutty bottom,`);
						} else {
							r.push(`lifting your skirt,`);
						}
						r.push(`drawing a pipette, and injecting something into your vagina. He returns to his work, waving you off with a disgruntled "Go gestate elsewhere." You leave, more confused than aroused.`);
					} else if (V.PC.counter.crazy === 1) {
						r.push(`You arrive at the crazy scientist's apartment once more. Upon letting yourself in, you find him hard at work. Before you can even open your mouth, he gestures towards a nearby operating table. Carefully positioning yourself on it, and inserting your legs into the waiting stirrups, you await what madness will happen next. You don't have to wait long before a long metallic rod forces its way into your vagina and painfully pushes its way past your cervix. Moaning in a mix of discomfort and arousal, you have no time to brace for the device's activation. You gasp as you feel the cum begin to flow unabated into your fertile womb. After nearly a minute, the phallic injector leaves your body allowing you to stagger to your feet. Your belly is noticeably rounded from his "load", though it evens into a slight bloat as the cum steadily flows from your pussy. You struggle back into your clothes and head back to the penthouse, hoping nobody sees you in such a state.`);
					} else {
						r.push(`Once again you arrive at the crazy scientist's door. Letting yourself in, you immediately notice the table is set and waiting for you to strap in. He doesn't even acknowledge your existence, but you know what he expects you to do. Once you have hopped on and gotten comfortable, you gasp as the injector pushes into you. You came prepared this time, wearing a skirt, no underwear, and a shirt that will allow your middle room to stretch. You tease your breasts and`);
						if (V.PC.dick !== 0) {
							r.push(`erection`);
						} else {
							r.push(`erect clit`);
						}
						r.push(`as the machine pumps cum into you. Only once you've climaxed, and you look like you're nearly full-term, does the device stop pumping into you and you are allowed to right yourself. Slowly you waddle back to your penthouse, indifferent to who may see you; you can't wait to soak in a bath, drain, and`);
						if (V.PC.dick !== 0) {
							r.push(`jack-off.`);
						} else {
							r.push(`rub out an orgasm or two.`);
						}
					}
					V.PC.counter.crazy++;
					break;
				case "virgin":
					if (V.PC.counter.virgin === 0) {
						r.push(`You arrive at the apartment of the quiet young man. Once he meekly welcomes you inside, you begin to slowly strip, drawing a deep blush to his face and a bulge to his pants. As you continue to tease him, making sure to brush his erection every now and then, he grabs your hand and pulls you into a tight hug. He's clueless. You take him by the hand and lead him to his bed; crawling into it, lying on your back and spreading your legs at him. Finally succeeding to remove his pants, he crawls onto you and hesitatingly penetrates you. It takes some time, but he eventually gets into the swing of things; even managing to coax an orgasm out of you${(V.PC.dick !== 0) ? ", filling your condom with cum," : ""} before blowing his load deep into your pussy. As he settles in next to you, you try to make your exit, but he asks you to stay and cuddle some. You allow him to rest himself on your`);
						if (V.PC.boobs >= 300) {
							r.push(`breasts`);
						} else {
							r.push(`chest`);
						}
						r.push(`as you gently pet him. Before long he has dozed off, giving you the opportunity to slip away. Just as you shut the door, you hear a slight call of "Will I get to see you again?"`);
					} else if (V.PC.counter.virgin === 1) {
						r.push(`You arrive at the apartment of the boy whose virginity you took. He happily hugs you before pulling you inside and into his bedroom. He certainly has become more assertive since the last time you saw him. He happily suckles from your milky nipple as he tenderly fucks you, making sure to bring you to your climax before releasing his own pent up load deep into your pussy. "I waited for you to come back you know..." He cuddles into your cleavage as you contently embrace him for a post-coital nap. When it's time to leave, he sees you to the door, promising to wait for you once more.`);
					} else {
						r.push(`You arrive at the apartment of the boy whose virginity you took. He happily hugs you before pulling you inside and into his bedroom. He wastes no time in diving deep into your needy cunt, even going as far as experimenting with new positions as he enjoys his lover's body. Once both of you are exhausted, you cuddle up for you post sex snooze. When it's time to leave, he sees you to the door. "You don't have to go..." he pleads, but you tell him running the arcology comes first.`);
					}
					V.PC.counter.virgin++;
					break;
				case "futa":
					if (V.PC.counter.futa === 0) {
						r.push(`You arrive at the apartment of the rather assertive girl with both sets of functional genitals. She quickly pulls you into her bedroom, skillfully unwrapping her gift along the way, and tips you into her bed.`);
						if (V.PC.dick !== 0) {
							r.push(`Straddling you with a lewd smile, she plucks the condom off your stiff prick. She helps you into a position where she can both fuck you, and be fucked by you, at once. Your body aches by the end of things, but your lover happily massages every sore spot you point out to her. She blows you a kiss as you head out the door.`);
						} else {
							r.push(`Straddling you with a lewd smile, she penetrates deep into your pussy. Sex with her was quite fun (she managed to touch every place on your body that turns you on) though a little messy, noting the cum dripping from you as you make your exit.`);
						}
					} else if (V.PC.counter.futa === 1) {
						r.push(`You arrive once more at the apartment of the assertive girl with both sets of functional genitals. You immediately notice something off about her stance as she greets you and pulls you inside. As she guides you to her bed, you take note of the unusual bulge under her shapely asscheeks. Once she has you undressed and on her bed, she pauses and begins a seductive strip tease. She bends completely over as she reaches her bottoms, giving you a clear look at that bulge as she slips them off. Testicles; her balls are triple the size that your remember! She spins around, nearly slapping you with her raging erection, "You like 'em? I haven't gotten a chance to use them yet, so let's have some fun!" she says seductively. She wastes no time in setting you up doggy style and plunging deep into your moist pussy. You gasp as her hefty balls slap against your thighs. She leans in close as she rails you, a hand sneaking around to your flat belly. You feel her cum, hard, into you, followed by an unusual sensation. She is literally filling you with cum! You gasp at the mounting pressure in your belly, now fully aware of what she was groping for. Turning to her, you find her a little disappointed; "I thought you'd get bigger..." She cups her balls and mumbles something to herself. "Well, at least my load seems to be staying in you this time, mostly," she says, motioning to the cum steadily dripping from your vagina. Taking such an impressive load was quite enjoyable, you think to yourself as you make your exit.`);
					} else {
						r.push(`You arrive once more at the apartment of the assertive girl with both sets of functional genitals. She calls for you to enter shortly after knocking, and beckons you into the bedroom. You strip as you walk, eager to get a taste of her huge load again. You are not disappointed; her balls are utterly massive, easily the size of her.`);
						if (V.PC.balls >= 30) {
							r.push(`"Your balls! Huge loads are great, aren't they? We are going to make such a wonderful mess!"`);
						} else {
							r.push(`"Like 'em? Slide on up here and let's see just how big a mess we can make!"`);
						}
						r.push(`You try your best to straddle her nuts, but shortly after getting seated, end up falling forward from her first thrust and locking lips with the lusty futa. She eagerly bucks into you as she deeply kisses you; and blows her load early. The sheer force of her orgasm floods your womb with fertile seed and forces her cock out, where it stays, spraying cum upwards like a fountain, until her room is soaked with cum. She stares at you, ashamed at herself. She finishes you off with some oral before inviting you to relax and enjoy some fine wine as an apology for cumming early. You give her balls a pat as you make your leave. A mistake, you soon realize, as she promptly orgasms and showers your back with ejaculate. Guess you'll be showering before you leave.`);
					}
					V.PC.counter.futa++;
					break;
				case "preggo":
					if (V.PC.counter.preggo === 0) {
						r.push(`You arrive at the apartment of the rather moody girl with both sets of functional genitals. What answers the door surprises you; she is extremely pregnant, easily ready to drop. Positioning you over the edge of her bed, she mounts you and begins to enjoy herself. Between the sensations within your pussy,`);
						if (V.PC.dick !== 0) {
							r.push(`your dick's motions against her satin sheets,`);
						}
						r.push(`and her belly rubbing up and down your ass and lower back; you quickly tense up in orgasm, prompting her to cum strongly into your pussy. You help her onto her couch and head on your way, but not before she informs you that she'll be waiting to fuck you when you are as pregnant as she is now.`);
					} else if (V.PC.counter.preggo === 1) {
						r.push(`You arrive at the apartment of the heavily pregnant futa. When she answers the door and you are greeted by an even larger belly than last time it becomes abundantly clear that the two of you are on similar reproductive schedules. Noticing your look, she grabs your hands and happily says "Twins!" You wrap your arms around your lover for the evening and help her back to her bed, enjoying the weight of her middle. She stops you once she takes a seat and asks "You know, I have some fertility drugs if you want to get as big as me this time, cutie?" You shake your head "no"; being that pregnant would certainly impede your ability to run the arcology. She sighs and lies back, her stiff prick pressed against the underside of her belly, and invites you to ride her cock. You waste no time in mounting her, the feel of`);
						if (V.PC.dick !== 0) {
							r.push(`your own erection rubbing between your bellies`);
						} else {
							r.push(`the underside of her pregnancy pushing into your own middle`);
						}
						r.push(`as she thrusts up into you, driving you wild with lust. It doesn't take long for you to start bucking with orgasm and wrapping your arms around her gravid middle. Her occupants send several kicks your way as she quickens her pace, grabs your hips, and thrusts hard, cumming deep in your pussy. Panting, you slide off her and snuggle up beside her as you catch your breath. "You're looking good after having a child, you know? But obviously you looked even better heavy with my child. I'm keeping those pictures of you close!" she says with a giggle as you rise. With a gentle pat on your bottom, she sends you on your way.`);
					} else {
						r.push(`You arrive once more at the apartment of the heavily pregnant futa, though this time she takes a while to reach the door by the sound of it. When it opens, you are greeted by her usual smile and an octuplets-stuffed belly. She grabs your hand and pulls it to her taut middle. "Feel them kick! There's so many of them, it feels amazing!" You wrap your arms around your heavy lover for the evening and help her back to her bed, savoring the weight of her pregnancy. She stops you once she takes a seat and asks "My offer still stands, cutie. I assure you it feels amazing to be so full of babies." You shake your head "no"; being that pregnant would definitely impede your ability to run the arcology and even enjoy your slaves properly. She lies back, before shifting her weight to her side out of discomfort. Her belly is really big, and hangs low enough that reaching her needy cock is quite the challenge; you take a moment to think of a good position to receive her. You take her dick, and gently sliding yourself between her legs, fit it into your pussy. The two of you buck against each other as best you can; a struggle, seeing as you are bearing the weight of her children right now. You have no choice but to wrap your arms around the eagerly kicking mass${(V.PC.dick !== 0) ? ", trapping your dick between it and yourself," : ""} as you near your climax. You feel your nethers clamp down as she cums, hard, deep into your pussy. Her children shift under your arms as her water breaks onto you. You quickly untangle yourself and help her to her feet; you can't help but enjoy the feeling of her close contractions under your hand. She points you to her bathroom; "Water birth," she pants, struggling to not give birth where she stands. The tub is already prepared for her, so you help her into it. She refuses to let go of your hand, pleading "Join me?" You take her up on the offer and slide in behind her. You massage her taxed stomach as she struggles to bring her children into the world. A loud moan escapes her lips as the first of her children slips from her pussy and into your waiting hands. Setting her aside, you prepare for the next. After several hours, and a mutual shower, you and her recover together with her eight children; as thanks, you have one milky nipple all to yourself. When it's time to leave, she blows you a kiss and thanks you sincerely for helping her through this.`);
					}
					V.PC.counter.preggo++;
			}
		} else {
			r.push(`The vial of sperm destined to fill your womb with life has arrived. You waste no time injecting a dose of it into the depths of your pussy and carry on with you day; a ritual you repeat for the duration of the week, ensuring an Elite life taking root within you.`);
		}
		App.Events.addParagraph(node, r);

		/* You're getting pregnant, period be damned */
		V.PC.preg = 1;
		V.PC.pregSource = -6;
		V.PC.pregKnown = 1;
		V.PC.pregType = setPregType(V.PC);
		WombImpregnate(V.PC, V.PC.pregType, -6, 1);
	}
};
