/**
 *
 * @returns {DocumentFragment}
 */
App.Interact.fSelf = function() {
	const node = new DocumentFragment();
	let r = [];

	const cumSources = [];
	for (const slave of App.Entity.facilities.dairy.employees()) {
		if (slave.balls > 0 && slave.ballType === "human" && slave.vasectomy !== 1) {
			cumSources.push(slave.ID);
		}
	}
	if (V.arcologies[0].FSPastoralistLaw === 1) {
		for (let i = 0; i < 6; i++) {
			cumSources.push(0);
		}
	}

	if (V.PC.skill.cumTap === 0) {
		r.push(`Taking the hose and attaching the delectable cockhead to it, you drag it over to your bed and make yourself comfortable. Teasing your pussylips with the perfect sized cock quickly gets you moist${(V.PC.dick !== 0) ? " and hard" : ""}, itching for the fake dick inside you. You know yourself well, and it fits perfectly; as you thrust it into your cunt you can't help but buck with pleasure. Just as you reach your climax, you accidentally kick the tap on. Needless to say, you are quite surprised when your "lover" orgasms and begins releasing inside you, forcing you to lose your grip on the nozzle, allowing it to free itself from you along with a torrent of cum. Panting and rubbing your tender belly, you quickly pull your clothes back on and head to clean yourself out. You can't help but notice your waist feels rather tight; it shot so much into you — that cum wasn't virile, right?`);
	} else if (V.PC.skill.cumTap < 5) {
		r.push(`Taking the hose and attaching your favorite cockhead to it, you drag it over to your bed and make yourself comfortable. Teasing your pussylips with the dildo, even going as far as spurting a touch of cum across your belly, you drive it into your aching cunt. With every thrust, you jet a little more cum into your empty womb, bulging you more and more as your pleasure rises, until you reach your climax and unleash your "lover"'s pent up load into yourself. Patting your bloated belly, you stagger to your feet and make for your private bath to relax while you drain. You giggle as you imagine you belly swelling even larger, be it with child or more cum.`);
	} else if (V.PC.skill.cumTap < 10) {
		r.push(`Taking the hose and attaching your favorite cockhead to it, you drag it over to your bed and make yourself comfortable. Teasing your pussylips with the dildo, even going as far as spurting a touch of cum across your belly, you drive it into your aching cunt. With every thrust, you jet more cum into your empty womb, bulging you more and more as your pleasure rises, until you reach your climax and unleash your "lover"'s pent up load into yourself. Patting your rounded belly, you stagger to your feet and make for your private bath to relax while you drain. You giggle as you cradle your bloated middle, you practically look pregnant already!`);
	} else if (V.PC.skill.cumTap < 15) {
		r.push(`Taking the hose and attaching your favorite cockhead to it, you eagerly drag it to your bed and make yourself comfortable. You waste no time driving it into your aching cunt. With every thrust, you jet huge bursts of cum into your empty womb, swelling yourself more and more as your pleasure rises, until you reach your climax and unleash your "lover"'s pent up load into yourself. Patting your huge belly, you struggle to your feet and waddle towards your private bath to relax while you drain. You giggle as you cradle your round middle, anyone who saw you like this would certainly say you were heavily pregnant!`);
	} else if (V.PC.skill.cumTap < 20) {
		r.push(`Taking the hose and attaching your favorite cockhead to it, you eagerly drag it to your bed and make yourself comfortable. You waste no time driving it into your aching cunt. With every thrust, you jet huge bursts of cum into your empty womb, swelling yourself more and more as your pleasure rises, until you reach your climax and unleash your "lover"'s pent up load into yourself. Patting your enormous belly, you struggle to even get off the bed, eventually making it to your feet so that you may slowly stagger to the bath. You moan lewdly as the pressure within your full belly sets another orgasm coursing through your body, making it jiggle delightfully. Anyone who saw you like this would swear you were about to give birth!`);
	} else if (V.PC.skill.cumTap < 25) {
		r.push(`Taking the hose and attaching your favorite cockhead to it, you eagerly drag it to your bed and make yourself comfortable. You waste no time driving it into your aching cunt. With every thrust, you jet massive bursts of cum into your empty womb, swelling yourself more and more as your pleasure rises, until you reach your climax and unleash your "lover"'s pent up load into yourself. Patting your taut, overfilled belly, you struggle to even get off the bed. After minutes of effort, several attempts ruined by aftershock orgasms, you manage to get on your feet. Cradling your massive cum-belly, you gingerly waddle to your waiting bath. You look like you are ready to burst with triplets; imagine what the public would say if they saw you in this state.`);
	} else {
		r.push(`Taking the hose and attaching your favorite cockhead to it, you eagerly drag it to your bed and make yourself comfortable. You waste no time driving it into your aching cunt. With every thrust, you jet massive bursts of cum into your empty womb, swelling yourself more and more as your pleasure rises, until you reach your climax and unleash your "lover"'s pent up load into yourself. Patting your taut, overfilled belly, you roll over onto your back so that you may tease your`);
		const bodyParts = [];
		if (V.PC.boobs >= 300) {
			bodyParts.push(`breasts`);
		}
		if (V.PC.dick > 0) {
			bodyParts.push(`dick`);
		}
		bodyParts.push(`belly`);
		bodyParts.push(`pussy`);
		r.push(`${toSentence(bodyParts)}. If anyone saw you, they would swear your were on the verge of delivering sextuplets. You made sure to schedule this block for absolute privacy, so no one should disturb you while you play with your bloated body. Once you are exhausted and drained of your contents, you head for the showers and to get a slave to clean up your bed — the same slave whose cum you just enjoyed with the hose, of course.`);
	}

	V.PC.skill.cumTap++;
	knockMeUp(V.PC, 50, 0, cumSources.random());
	App.Events.addParagraph(node, r);
	return node;
};
