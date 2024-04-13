App.UI.pDildoAss = function() {
	const r = new SpacedTextAccumulator();

	r.push(`After a long day managing your slaves, you've decided that you deserve something that many of your slaves regularly have: it's time to have something fun in your tight, virginal asshole.`);
	r.toParagraph();

	r.push(`You lick your lips as you eye the thick glass dildo resting on the edge of the sink in your bathroom. It's sleek and cold, and reminds you of the many times you've pushed a similar one into the throats${V.seeDicks < 100 ? ', cunts' : ''} and asses of your slaves. Slowly, you reach out and take hold of the phallic object, feeling its weight in your hand.  You trace the smooth curve with your fingers, wondering what it would feel like inside your ass. A forbidden thrill runs through you at the thought of letting someone else violate you in such a way, but today it will be you, and only you, who penetrates your most private place.`);
	r.toParagraph();

	r.push(`As you stare into the mirror, you close your eyes and take a deep breath. The dildo feels heavy between your fingers, but not unwieldy. You grip it tightly and begin to push it towards your anus. At first, it barely enters, the tip brushing against the sensitive skin around your hole. You wince as you feel it, but the sensation is exhilarating.`);
	r.toParagraph();

	r.push(`Panting, you press forward, pushing the glass phallus deeper into your ass. It hurts, more than you expected, but also excites you. With each thrust, you open yourself wider, giving the dildo access to places no one has ever been before. Your sphincter muscles contract reflexively, trying to push the intruder out; but you are determined, and you press forward, inch by slow inch.`);
	r.toParagraph();

	r.push(`Tears well up in your eyes, and you want to scream, but you force yourself to remain calm. Breathing deeply, you count to ten, and then you try again. This time, the discomfort is less severe, and as you push further, you can feel your sphincter relaxing around the invader. You continue to push, slowly but surely, until the entire length of the dildo is inside you.`);
	if (V.PC.prostate > 0) {
		r.push(`It feels strange at first, unnatural...but then something remarkable happens. The pressure on your prostate sends waves of pleasure through your body, making your knees weak with delight.`);
	}
	r.toParagraph();

	r.push(`You have done it; <span class="virginity loss">your ass is now broken in.</span> Determined to get off, you continue to rock back and forth, thrusting the dildo in and out of your asshole. With each thrust, the sensations become more intense, more exquisite. The pain is replaced by a deep, throbbing fullness, and the pleasure that courses through your body is unlike anything you've ever experienced before. You find yourself both unable and unwilling to hold back the release building within you.`);
	r.toParagraph();

	r.push(`As the familiar waves of orgasm wash over you, you ${V.PC.title === 0 ? 'cry out' : 'grunt loudly'}, your voice echoing off the hard walls of the bathroom. When the intensity subsides, you release your grip on the sink and lean forward, resting your forehead on the cool surface. You stay like that for a short time time, catching your breath and savoring the afterglow. When you finally pull out the dildo and step away from the sink, a newfound sense of power and control courses through your veins. By taking your own anal virginity, you claimed a part of yourself that no one else will ever possess.`);
	r.toParagraph();

	V.PC.anus = 1;

	return r.container();
};
