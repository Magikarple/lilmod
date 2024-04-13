App.UI.pDildoVagina = function() {
	const r = new SpacedTextAccumulator();

	r.push(`It's still early in the day, but you've had ${V.assistant.name} clear your morning schedule for this special event. You've decided that you deserve something that many of your slaves regularly have: it's time to have something fun in your tight, virginal pussy.`);
	r.toParagraph();

	const {
		He = '', his = '', he = '', him = ''
	} = S.Concubine ? getPronouns(S.Concubine) : {};

	if (S.Concubine) {
		r.push(`You order `, contextualIntro(V.PC, S.Concubine, true), ` to bring you a new dildo that you had made for this experience; it's fashioned after one you know from experience brings great pleasure to your tightest fucktoys. ${He} already knows something's up — after all, you don't clear your schedule for no reason — but now you can tell from ${his} ${canSee(S.Concubine) ? 'eyes' : 'face'} that ${he}'s particularly curious what you're going to do with this special dildo.`);
		r.push(`A few minutes later, ${he} returns with a soft phallic object in hand.`);
	} else {
		r.push(`You open a box that you've had sitting on your nightstand for some time. It contains a new dildo, fashioned after one you know from experience brings great pleasure to your tightest fucktoys.`);
	}
	r.push(`It's not the biggest dildo you own, by any stretch of the imagination, but it suddenly strikes you as being quite girthy when you imagine it entering your tight hole. It's expertly crafted from the finest materials, and as you ${S.Concubine ? `take it from ${him} and` : ``} examine it closely, you feel a thrill of anticipation run through you.`);
	r.toParagraph();

	r.push(`This is it: your first time.`);
	r.toParagraph();

	r.push(`${S.Concubine ? `${S.Concubine.slaveName} watches as you` : `You`} approach the full-length mirror mounted on one wall of the Master Suite.`);
	r.push(`Stripping off your bedclothes, you stand nude before your reflection for a moment, admiring the ${(V.PC.boobs > 300) || (V.PC.butt > 1) ? 'flawless curves' : (V.PC.title === 0 ? 'girlish slenderness' : 'masculine form')} of your body. Then you sit down and spread your legs, giving yourself a clear view of your virgin pussy. Your heart is racing, but your mind is clear and focused on the task at hand.`);
	r.toParagraph();

	r.push(`Slowly, you position the dildo at your entrance, feeling its smooth surface teasing your sensitive folds. With deliberate movements, you guide it inside yourself, feeling the heat and tightness as it pierces your hymen. The sensation is intense, but you push through it, determined to claim this milestone for yourself. As the head of the dildo disappears into your depths, you let out a soft gasp of satisfaction. You've done it: you've <span class="virginity loss">broken in your virgin pussy.</span>`);
	r.toParagraph();

	r.push(`Feeling more confident now, you begin to move the dildo in and out of yourself, exploring your newfound depths. At first, it's slow and cautious, but soon you find a rhythm that feels good, and you allow yourself to become lost in the sensations coursing through your body.`);
	r.toParagraph();

	r.push(`Looking up at your reflection once again, you see the unmistakable signs of arousal on your face: flushed cheeks, parted lips, and eyes brimming with excitement. You continue pumping the dildo in and out, faster and harder now, driven by the need for release.`);
	r.toParagraph();

	r.push(`And then, it hits you: an explosive wave of pleasure that radiates from your core and spreads throughout your entire being. Your entire body shudders with delight as you feel the familiar sensation of orgasm wash over you. It's everything you could have hoped for and more, and you can't help but feel a little proud of yourself.`);
	r.toParagraph();

	if (S.Concubine) {
		r.push(`As you catch your breath, ${S.Concubine.slaveName} approaches you reverently, ${his} ${canSee(S.Concubine) ? 'eyes' : 'face'} filled with admiration. ${He} expresses ${his} sincere happiness for you, and you can't help but notice that there seems to be a bit of desire there too.`);
		r.toParagraph();
		r.push(`With a smile of satisfaction, you dismiss ${him}, knowing that today marks a turning point in your life.`);
	} else {
		r.push(`As you catch your breath, you realize that your journey has just begun.`);
	}
	r.push(`From now on, you will experience all the pleasures life has to offer. As you lay back on your opulent bed, you look forward to many adventures ahead.`);
	r.toParagraph();

	V.PC.vagina = 1;

	return r.container();
};
