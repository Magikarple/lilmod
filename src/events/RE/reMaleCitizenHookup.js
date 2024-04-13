App.Events.REMaleCitizenHookup = class REMaleCitizenHookup extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.policies.regularParties === 1,
			() => V.PC.vagina > 0,
			() => V.PC.dick === 0,
			() => V.PC.title === 0,
		];
	}

	get weight() {
		return random(0, 99) < V.seeDicks ? 1 : 0;
	}

	execute(node) {
		const FSArray = FutureSocieties.activeFSes(V.arcologies[0]);
		const FS = (FSArray.length > 0) ? FSArray.random() : "none";

		let r = [];
		r.push(`At night, the best living areas in the arcology offer a constant mélange of selective entertainments. There's a perpetual social scrum of who is to be invited to what going on, and you occupy a preeminent place atop it, mostly aloof from the struggles of your citizens for recognition and influence. You're invited to almost everything, since everyone who lives here knows the value of being in favor with the owner of the arcology. Invitations to your parties, of course, are some of the most valuable social currency in the arcology and one of ${V.assistant.name}'s most important duties is to help you manage them without wasting your valuable time. It's not actually necessary for you to attend your own parties, since almost everyone will be glad to be seen in the entertainment area of the penthouse whether or not the`);
		r.push(`${V.PC.title === 1 ? 'proprietor' : 'proprietress'} is actually present.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`But tonight, you've put in an appearance. Your citizens are drinking your`);
		if (FutureSocieties.isActive('FSPastoralist')) {
			r.push(`milk`);
		} else if (FutureSocieties.isActive('FSRestart')) {
			r.push(`finest alcohol`);
		} else {
			r.push(`alcohol`);
		}
		r.push(`and eating your food, though of course they helped pay for it through their rent. They're performing a complex dance of social dominance, and it all radiates around you, with complex unspoken rules of collective approval governing which citizens cycle past you for a word, and for how long. During a low point in the ebb and flow,`);
		switch (FS) {
			case "FSSubjugationist":
			case "FSSupremacist":
				r.push(`a handsome, racially pure young man`);
				break;
			case "FSGenderRadicalist":
				r.push(`a cute, androgynous-faced girl with nice breasts`);
				break;
			case "FSGenderFundamentalist":
				r.push(`a dominant-looking man`);
				break;
			case "FSRepopulationFocus":
				r.push(`a dominant-looking young man with a nice bulge in his pants`);
				break;
			case "FSRestart":
				r.push(`a stunningly handsome man`);
				break;
			case "FSPaternalist":
				r.push(`a pretty, upbeat young man`);
				break;
			case "FSDegradationist":
				r.push(`a confident man`);
				break;
			case "FSBodyPurist":
				r.push(`a clean-looking young man`);
				break;
			case "FSTransformationFetishist":
				r.push(`a nicely augmented boy, judging by the bulge in his crotch and down his pant leg,`);
				break;
			case "FSYouthPreferentialist":
				if (V.minimumSlaveAge < 13) {
					r.push(`an adorable little shota`);
				} else if (V.minimumSlaveAge < 18) {
					r.push(`a cute teenage boy`);
				} else {
					r.push(`a cute young man`);
				}
				break;
			case "FSMaturityPreferentialist":
				r.push(`a handsome, mature man`);
				break;
			case "FSSlimnessEnthusiast":
				r.push(`a slim young thing`);
				break;
			case "FSAssetExpansionist":
				r.push(`a hung young man, with specially tailored pants to contain his junk,`);
				break;
			case "FSPastoralist":
				r.push(`a chubby young man`);
				break;
			case "FSPhysicalIdealist":
				r.push(`a hot, buff man`);
				break;
			case "FSHedonisticDecadence":
				r.push(`a cutely chubby young man`);
				break;
			case "FSChattelReligionist":
				r.push(`a cute, devout-looking young man`);
				break;
			case "FSRomanRevivalist":
				r.push(`a proper young Roman man`);
				break;
			case "FSNeoImperialist":
				r.push(`a dashing young Imperial Knight with piercing blue eyes`);
				break;
			case "FSAztecRevivalist":
				r.push(`a natural Aztec beauty`);
				break;
			case "FSEgyptianRevivalist":
				r.push(`a handsome, sun-kissed man`);
				break;
			case "FSEdoRevivalist":
				r.push(`a handsome Edo man`);
				break;
			case "FSArabianRevivalist":
				r.push(`a handsome Arabian prince`);
				break;
			case "FSChineseRevivalist":
				r.push(`a handsome Chinese man`);
				break;
			case "FSAntebellumRevivalist":
				r.push(`a handsome Southron man`);
				break;
			case "FSIntellectualDependency":
				r.push(`a cute party boy`);
				break;
			case "FSSlaveProfessionalism":
				r.push(`a handsome, experienced man`);
				break;
			case "FSPetiteAdmiration":
				r.push(`a delightfully short young man`);
				break;
			case "FSStatuesqueGlorification":
				r.push(`a towering figure`);
				break;
			default:
				r.push(`a cute young man`);
		}
		r.push(`sidles up to you.`);
		if (FS !== "FSGenderRadicalist") {
			r.push(`He begins to introduce himself, but one of the advantages of your connection to the arcology is that you always know who everyone is, and you greet him by name, which people have never learned not to be impressed by.`);
		} else {
			r.push(`She begins to introduce herself and, not to your surprise, she is in fact a he.`);
		}
		r.push(`He gushes about some of your recent`);
		if (FS !== "none") {
			r.push(FutureSocieties.displayAdj(FS));
		}
		r.push(`actions, displaying an unusual grasp of what you've been planning. Despite his sincere interest, he's obviously got something else on his mind.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`He's yours for the taking, if you want him, and if his praise and proximity weren't enough to make that clear, he manages to`);
		switch (FS) {
			case "FSSubjugationist":
			case "FSSupremacist":
				r.push(`flash you a view straight down his pants at his ethnically superior dick.`);
				break;
			case "FSGenderRadicalist":
				r.push(`flex, popping his shirt's buttons and freeing his well crafted breasts.`);
				break;
			case "FSGenderFundamentalist":
				r.push(`wrap his arm around you and whisper sweet nothings in your ear.`);
				break;
			case "FSRepopulationFocus":
				if (V.PC.belly >= 100) {
					r.push(`grope your pregnancy, paying close attention to your navel.`);
				} else {
					r.push(`press up against you and wrap his arms around your flat belly. "You'd make a lovely mother, you know?"`);
				}
				break;
			case "FSRestart":
				r.push(`give you an excellent view of a little black book filled with all sorts of connections.`);
				break;
			case "FSPaternalist":
				r.push(`wrap his arm over your shoulder, presuming on the egalitarian nature of your Paternalist society to flirt a little aggressively.`);
				break;
			case "FSDegradationist":
				r.push(`pull his tight pants down slightly to reveal to tip of his barbell pierced, erect cock.`);
				break;
			case "FSBodyPurist":
				r.push(`push up behind you, his natural cock pressing against your butt.`);
				break;
			case "FSTransformationFetishist":
				r.push(`lift his shirt, revealing his oversized erection extending from his pants.`);
				break;
			case "FSYouthPreferentialist":
				r.push(`perfectly balance his youthful, innocent advances with the proper decorum between you and a citizen.`);
				break;
			case "FSMaturityPreferentialist":
				r.push(`perfectly balance his experienced, well-tuned advances with the proper decorum between you and a citizen.`);
				break;
			case "FSSlimnessEnthusiast":
				r.push(`turn from side to side as he flirts with you in a way that shows off his lithe, flexible body.`);
				break;
			case "FSAssetExpansionist":
				r.push(`shift his stance enough that his enormous, beach ball-like testicles and forearm sized cock tear the seam of his pants, springing clear to offer themselves glorious and nude.`);
				break;
			case "FSPastoralist":
				r.push(`let you know that he's almost entirely milk-fed, while pressing his soft body against yours.`);
				break;
			case "FSPhysicalIdealist":
				r.push(`sweep you off your feet into a bridal carry, demonstrating his strength.`);
				break;
			case "FSHedonisticDecadence":
				r.push(`lean his plump body into yours, popping several of his straining buttons in the process.`);
				break;
			case "FSChattelReligionist":
				r.push(`assume just a hint of a Chattel Religionist devotional pose used to request to penetrate. It's heavy flirting, of a modern religious sort.`);
				break;
			case "FSAztecRevivalist":
				r.push(`hint that his devotion, which is the most important thing, cannot be besmirched by tasting your divine power.`);
				break;
			case "FSIntellectualDependency":
				r.push(`push his prominent erection against your leg.`);
				break;
			case "FSSlaveProfessionalism":
				r.push(`whisper a tantalizing series of positions you two could share into your ear.`);
				break;
			case "FSPetiteAdmiration":
				r.push(`rest his head against your hip.`);
				break;
			case "FSStatuesqueGlorification":
				r.push(`give you an affectionate pat on the head.`);
				break;
			default:
				r.push(`flirt with you quite hard without crossing any lines between a citizen and an arcology owner.`);
		}
		r.push(`He's clearly attracted to you; even the most consummate actor would have difficulty fooling you, and his breath is a little quick, his pupils are a bit dilated, and he's blushing cutely. But he's no fool, either. A casual liaison with ${PCTitle()} would be a tremendous social boost for him.`);

		const responses = [
			new App.Events.Result("Keep aloof without offending him", aloof),
			new App.Events.Result("To them that hath, it shall be given", given),
		];

		if (FS !== "none") {
			responses.push(new App.Events.Result("Emphasize his societal style with exhibitionism", exhibitionism));
		}

		App.Events.addResponses(node, responses);

		function aloof() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You thank him for his praise, weighting the words in just the right way to communicate that you consider his flirtations worthy compliments, and nothing more. He understands immediately, communicating acceptance and pleasure at his own daring with nothing more than a thankful look in your eyes. This is how you approach matters like this. You are the ruler of this place and it behooves you to maintain a balance atop all your citizens without showing any susceptibility to solicitation. A little incident like this has little effect on its own, but your habit of maintaining proper reserve creates a reputation for judiciousness that <span class="green">businesspeople consider attractive for arcology investment.</span>`);
			V.arcologies[0].prosperity += 3;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function given() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You're not exactly starved for casual sex, but you've never thought there was any such thing as too much of a good thing.`);
			if (FS === "FSPhysicalIdealist" || FS === "FSStatuesqueGlorification") {
				r.push(`You nudge him in the ribs and motion to the door.`);
			} else if (FS === "FSPetiteAdmiration") {
				r.push(`You place your hand on the nape of his neck and begin to lead him away.`);
			} else {
				r.push(`You pull his arm around your waist.`);
			}
			r.push(`You hear a slight gasp from him as he realizes that his gambit has succeeded with more immediate effect than he expected. He shivers with anticipation as you steer him back through a side door, grabbing a pair of glasses of`);
			if (V.PC.refreshmentType === 1) {
				r.push(`${V.PC.refreshment}`);
			} else {
				r.push(`liquor`);
			}
			r.push(`on the way, and making a discreet exit towards your private suite.`);
			if (S.Concubine) {
				const {he, his} = getPronouns(S.Concubine);
				if (S.Concubine.intelligence + S.Concubine.intelligenceImplant > 50) {
					r.push(`${S.Concubine.slaveName} is there, of course, and ${he} instantly`);
					if (canSee(S.Concubine)) {
						r.push(`sees`);
					} else {
						r.push(`realizes`);
					}
					r.push(`that ${his} continued presence for a ménage à trois is wanted by both you and your guest.`);
				} else if (S.Concubine.intelligence + S.Concubine.intelligenceImplant < -50) {
					r.push(`${S.Concubine.slaveName} is there, of course, absentmindedly doing whatever it is ${he} does when you are not around, and unsurprisingly fails to`);
					if (canSee(S.Concubine)) {
						r.push(`see`);
					} else {
						r.push(`realize`);
					}
					r.push(`that ${his} presence might not be wanted.`);
				} else if (S.Concubine.fetish === Fetish.MINDBROKEN) {
					r.push(`${S.Concubine.slaveName} is there, of course, completely indifferent to you or your guest's presence.`);
				}
			}
			r.push(`Your guest restrains his eager praise now that you're in private, but his wide-eyed appreciation of your domain is compliment enough. Once in your suite, you undress him, revealing`);
			switch (FS) {
				case "FSSubjugationist":
				case "FSSupremacist":
					r.push(`his fresh, pure body, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSGenderRadicalist":
					r.push(`perky fake breasts and a stiff dick as you gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSGenderFundamentalist":
					r.push(`a fine body with a proud erection. Before you can tip him onto your bed; he deftly slips you out of your evening dress, scoops you up and places you, back first, at the edge of your bed. He dominantly spears your pussy and begins thrusting powerfully. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly fucking you. You shift in discomfort at being dominated, and in response he`);
					if (V.PC.belly >= 5000) {
						r.push(`begins massaging your rounded middle,`);
					} else {
						r.push(`groping your`);
						if (V.PC.boobs >= 1000) {
							r.push(`huge breasts,`);
						} else if (V.PC.boobs >= 650) {
							r.push(`ample breasts,`);
						} else if (V.PC.boobs >= 300) {
							r.push(`cute breasts,`);
						} else {
							r.push(`butt,`);
						}
					}
					r.push(`distracting you from the situation and allowing you to be overwhelmed by pleasure. With a hard, firm thrust, he cums deep into your pussy. You follow shortly after, feeling the heat of his seed in your depths as you clamp down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you. Through the haze of your lust, you can't help but feel your drink tasted off.`);
					V.PC.forcedFertDrugs += 2;
					break;
				case "FSRepopulationFocus":
					V.PC.forcedFertDrugs += 10;
					r.push(`a hot young body with an eager erection. Before you can tip him onto your bed; he pulls your evening dress off, spins you around and lowers you, back first, onto the edge of your bed. He dominantly spears your pussy and begins thrusting powerfully. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly fucking you. You shift in discomfort at being dominated, and in response he`);
					if (V.PC.belly >= 5000) {
						r.push(`begins earnestly groping your pregnancy,`);
					} else {
						r.push(`grabs your hips and pushes even deeper into you,`);
					}
					r.push(`distracting you from the situation and allowing you to be overwhelmed by pleasure. With a hard, firm thrust, he cums deep into your pussy. You follow shortly after, feeling the heat of his seed in your depths as you clamp down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					if (V.PC.belly < 100) {
						r.push(`Unsatisfied with your body, he guides you into a position more favorable for conception`);
					} else {
						r.push(`Crazed with lust over your baby bump, he guides you into a position more comfortable for a pregnant woman`);
					}
					r.push(`and carries on fucking you. By the time he is done with you, you'll be leaking cum for the rest of the evening.`);
					if (V.PC.forcedFertDrugs > 10) {
						r.push(`He seemed certain you'd become enormously pregnant from his efforts; he could have been fantasizing, but your drink did taste a little funny and you have a pleasant tingling in your lower belly.`);
					}
					break;
				case "FSRestart":
					r.push(`his glorious, flawless body, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSPaternalist":
					r.push(`a nice young body, with all the little attractions and flaws of a free citizen's, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSDegradationist":
					r.push(`a taut body covered in dominant tattoos and spiky piercings, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, especially one involving piercings rubbing all the right places, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSBodyPurist":
					r.push(`a delectably clean young body unmarred by any trace of surgical intervention, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSTransformationFetishist":
					r.push(`a massive fake bubble butt to go with his extended erection, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, taking as much as you physically can, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSYouthPreferentialist":
					if (V.minimumSlaveAge < 13) {
						r.push(`that he is adorable, but may not be satisfying, and gently carry him to your bed. You tease him as you remove your evening dress, crawl next to him, pull him over yourself and guide his tiny penis into you. Instinct quickly takes hold as he begins thrusting and hugs tightly to your`);
						if (V.PC.belly >= 5000) {
							r.push(`pregnant belly.`);
						} else {
							r.push(`larger body.`);
						}
						r.push(`Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You hold him close and buck against him, trying to make up for his size, until he releases a small load into your depths. You follow not long after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Exhausted, he passes out`);
						if (V.PC.belly >= 5000) {
							r.push(`against your middle;`);
						} else if (V.PC.boobs >= 1000) {
							r.push(`in your huge bust;`);
						} else if (V.PC.boobs >= 650) {
							r.push(`in your ample bust;`);
						} else if (V.PC.boobs >= 300) {
							r.push(`in your cute breasts;`);
						} else {
							r.push(`atop you;`);
						}
						r.push(`where he lies until you finish playing with him and move him beside you. You return to your needy crotch to finish up as he snuggles closer to your side.`);
					} else if (V.minimumSlaveAge < 18) {
						r.push(`that his whole body looks fresh, untouched, and very young, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
						if (V.PC.belly >= 5000) {
							r.push(`(one that forces him to bear the weight of your heavy middle)`);
						}
						r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					} else {
						r.push(`that his whole body looks fresh, untouched, and quite young, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
						if (V.PC.belly >= 5000) {
							r.push(`(one that forces him to bear the weight of your heavy middle)`);
						}
						r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					}
					break;
				case "FSMaturityPreferentialist":
					r.push(`a mature body featuring an erection with years of experience. Before you can tip him onto your bed; he deftly slips you out of your evening dress, scoops you up and places you, back first, at the edge of your bed. He dominantly spears your pussy and begins thrusting, hitting all the right places. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly fucking you. You shift in discomfort at being dominated, and in response he`);
					if (V.PC.belly >= 5000) {
						r.push(`begins massaging your rounded middle,`);
					} else {
						r.push(`groping your`);
						if (V.PC.boobs >= 1000) {
							r.push(`huge breasts,`);
						} else if (V.PC.boobs >= 650) {
							r.push(`ample breasts,`);
						} else if (V.PC.boobs >= 300) {
							r.push(`cute breasts,`);
						} else {
							r.push(`butt,`);
						}
					}
					r.push(`calming you and allowing you to give in to the pleasure. With a hard, firm thrust, he cums deep into your pussy. You follow shortly after, feeling the heat of his seed in your depths as you clamp down around his dick. Thankfully, despite his age, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSSlimnessEnthusiast":
					r.push(`lean muscles, a smooth waist, trim hips and a cute little ass, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSAssetExpansionist":
					r.push(`an inhumanly enormous ass to counterbalance those enormous balls and a semi-hard cock, unable to become fully erect. You have to struggle to get him onto your bed. You tease him as you remove your evening dress, crawl over him and`);
					if (V.PC.newVag === 1) {
						r.push(`impale yourself on his monster shaft as far as you can, quivering in joy at its girth filling you.`);
					} else if (V.PC.vagina > 3) {
						r.push(`impale yourself on his monster shaft as far as you can, quivering in joy at its girth filling you like nothing does lately.`);
					} else if (V.PC.vagina > 2) {
						r.push(`impale yourself on his monster shaft as far as you can, quivering in joy at how full you are.`);
					} else if (V.PC.vagina > 1) {
						r.push(`barely manage to get his cockhead into your pussy.`);
					} else {
						r.push(`find he is too big to fit in you. You settle for the tip instead.`);
					}
					r.push(`Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly massaging his cock as it fills you pussy. As you feel his climax mounting, he taps you and warns you that you won't be able to handle his orgasm.`);
					if (V.PC.preg > 20) {
						r.push(`For your unborn child's sake, you slide off his shaft and down to his face, planting your soaked cunt over his mouth. Reaching around behind you as he eats you out, you tease his twitching rod. As you climax, you accidentally squeeze his vulnerable balls, provoking his own massive orgasm. Shouting in surprise, you hug as close to him as you can as cascade of cum pours onto the two of you. You roll off of him and laugh at the mess your servants are going to have to clean up.`);
					} else if (V.PC.preg > 10) {
						r.push(`For your growing child's sake, you slide off his shaft and down to his face, planting your soaked cunt over his mouth. Reaching around behind you as he eats you out, you tease his twitching rod. As you climax, you accidentally squeeze his vulnerable balls, provoking his own massive orgasm. Shouting in surprise, you hug as close to him as you can as cascade of cum pours onto the two of you. You roll off of him and laugh at the mess your servants are going to have to clean up.`);
					} else if (V.PC.preg > 0) {
						r.push(`Feeling like you should heed his advice, you slide off his shaft and down to his face, planting your soaked cunt over his mouth. Reaching around behind you as he eats you out, you tease his twitching rod. As you climax, you accidentally squeeze his vulnerable balls, provoking his own massive orgasm. Shouting in surprise, you hug as close to him as you can as cascade of cum pours onto the two of you. You roll off of him and laugh at the mess your servants are going to have to clean up.`);
					} else {
						r.push(`Quivering with your own pending orgasm, you ignore him and keep going, achieving climax as he blows a near endless load into your womb.`);
						if (V.PC.skill.cumTap === 0) {
							r.push(`The quantity of cum quickly overwhelms you and backflows out of you as you fall into your lover's waiting arms. He lays you to his side as he continues showering you both with cum.`);
							V.PC.skill.cumTap++;
						} else if (V.PC.skill.cumTap < 5) {
							r.push(`You last for several seconds before the sheer size of his load forces you off his dick and into his waiting arms. He lays you to his side, gently patting your cum-bloated middle, as he continues showering you both with cum.`);
							V.PC.skill.cumTap++;
						} else if (V.PC.skill.cumTap < 10) {
							r.push(`You manage to take a respectable portion of his load before it begins backflowing out of you. He massages your cum-filled belly as he finishes unloading across your back. "Most girls can't even come close to handling it at all, I'm impressed."`);
							V.PC.skill.cumTap++;
						} else if (V.PC.skill.cumTap < 15) {
							r.push(`You manage to take nearly half of his load before it begins backflowing out of you. He cradles your cum-stuffed belly as he finishes unloading across your back. "Few girls can even come close to handling that much of it, I'm impressed." He helps you down, making sure to provide extra support for your huge, full-term looking belly.`);
							V.PC.skill.cumTap++;
						} else if (V.PC.skill.cumTap < 20) {
							r.push(`You manage to take nearly two thirds of his load before it begins backflowing out of you. You swear he cums harder as he places his hands to your swelling middle, enjoying the growth until you look like a woman on the verge of childbirth. "Damn girl, you look like you're gonna pop, I'm impressed." He helps you down, making sure to provide extra support for your enormous, taut belly. He sensually massages it, coaxing as much cum from your hungry womb that he can. But in the end, he can only get you back to the size of a woman in her final trimester. You likely won't be returning to the party.`);
							V.PC.skill.cumTap++;
						} else if (V.PC.skill.cumTap < 25) {
							r.push(`You manage to take nearly three fourths of his load before it begins backflowing out of you. You swear he cums harder as he places his hands to your swelling middle, enjoying the growth until you grow taut and your belly button pops out. By the time you can't take any more, you look like you are ready to burst with triplets. "Damn girl, just how stretchy are you? I'm impressed." He helps you down, making sure to provide extra support for your massive, straining belly. He sensually massages it, coaxing as much cum from your hungry womb that he can. But in the end, he can only get you back to the size of a woman in her final trimester. You likely won't be returning to the party.`);
							V.PC.skill.cumTap++;
						} else {
							r.push(`You manage to take his entire load without spilling a drop. You swear he cums harder as he places his hands to your swelling middle, enjoying the growth until you grow taut and your belly button pops out. By the time he's done, you look ready to birth octuplets. "I can't believe you took it all; incredible. Are you going to be OK?" He helps you down, making sure to provide extra support for your immense, straining belly. He sensually massages it, coaxing as much cum from your hungry womb that he can. But in the end, he can only get you back to the size of a woman in her final trimester. You likely won't be returning to the party.`);
							V.PC.skill.cumTap++;
						}
					}
					break;
				case "FSPastoralist":
					r.push(`soft, milk-fed body, and gently push him back onto your bed, giggling as his chubby belly jiggles. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle, and surprisingly comfortable given his belly)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSPhysicalIdealist":
					r.push(`a chiseled Adonis. Before you can tip him onto your bed; he deftly pulls you out of your evening dress, scoops you up, dominantly spears your pussy and begins thrusting powerfully while holding you. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly fucking you. You`);
					if (V.PC.belly >= 5000) {
						r.push(`squirm in discomfort until he turns you around and gives your pregnancy room`);
					} else if (V.PC.boobs >= 1000) {
						r.push(`squirm in discomfort until he turns you around and uses his other arm to keep your huge breasts steady`);
					} else if (V.PC.boobs >= 650) {
						r.push(`push your`);
						if (V.PC.boobs >= 900) {
							r.push(`ample`);
						}
						r.push(`breasts against his firm pecs`);
					} else if (V.PC.boobs >= 300) {
						r.push(`push your cute breasts against his firm pecs,`);
					} else {
						r.push(`allow him pull your flat chest to his firm pecs,`);
					}
					r.push(`before he starts showing off his strength. With a hard, firm thrust, he cums deep into your pussy. You follow shortly after, feeling the heat of his seed in your depths as you clamp down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSHedonisticDecadence":
					r.push(`soft, well-fed body, and gently push him back onto your bed, giggling as his chubby belly jiggles. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle, and surprisingly comfortable given his belly)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. He's winded after just one go, but offers up a cache of snacks he was hiding as an apology. You snuggle up to each other and sensually feed one another until he is ready for round two.`);
					break;
				case "FSChattelReligionist":
					r.push(`a fresh and ready body, adorned here and there with sensual devotional jewelry, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSEgyptianRevivalist":
					r.push(`a strong, tight, bronze body, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSIntellectualDependency":
					r.push(`a young body eager for sex, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSSlaveProfessionalism":
					r.push(`a mature body featuring an erection with years of experience. Before you can tip him onto your bed; he deftly slips you out of your evening dress, scoops you up and places you, back first, at the edge of your bed. He dominantly spears your pussy and begins thrusting, hitting all the right places. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly fucking you. You shift in discomfort at being dominated, and in response he`);
					if (V.PC.belly >= 5000) {
						r.push(`shifts you to a position more befitting your gravidity,`);
					} else {
						r.push(`groping your`);
						if (V.PC.boobs >= 1000) {
							r.push(`huge breasts,`);
						} else if (V.PC.boobs >= 650) {
							r.push(`ample breasts,`);
						} else if (V.PC.boobs >= 300) {
							r.push(`cute breasts,`);
						} else {
							r.push(`butt,`);
						}
					}
					r.push(`calming you and allowing you to give in to the pleasure. With a hard, firm thrust, he cums deep into your pussy. You follow shortly after, feeling the heat of his seed in your depths as you clamp down around his dick. Thankfully, he isn't spent yet and maneuvers you to a fresh position and begins anew, quickly bringing to a second orgasm and drawing an adorable moan out of you. His bag of tricks is nigh endless; you spend the night having sex in new and exciting ways.`);
					break;
				case "FSPetiteAdmiration":
					r.push(`that he is adorable, and not lacking at all down there, and gently carry him to your bed. You tease him as you remove your evening dress, crawl next to him and pull him into you. He begins thrusting excitedly and hugs tightly to your`);
					if (V.PC.belly >= 5000) {
						r.push(`pregnant belly,`);
					} else {
						r.push(`larger body,`);
					}
					r.push(`clearly into how much bigger you are than him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that spares his tiny form most of the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				case "FSStatuesqueGlorification":
					r.push(`a glorified titan. Before you can tip him onto your bed; he deftly pulls you out of your evening dress, scoops you up, dominantly spears your pussy and begins thrusting powerfully while holding you. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly fucking you.`);
					if (V.PC.belly >= 5000) {
						r.push(`You squirm in discomfort until he turns you around and gives your pregnancy room,`);
					} else if (V.PC.boobs >= 1000) {
						r.push(`You squirm in discomfort until he turns you around and uses his other arm to keep your huge breasts steady,`);
					} else if (V.PC.boobs >= 300) {
						r.push(`You push your`);
						if (V.PC.boobs >= 900) {
							r.push(`ample`);
						} else if (V.PC.boobs < 650) {
							r.push(`cute`);
						}
						r.push(`breasts against his toned abs,`);
					} else {
						r.push(`You press your flat chest against his toned abs,`);
					}
					r.push(`before he really takes advantage of your size difference. With a hard, firm thrust, he cums deep into your pussy. You follow shortly after, feeling the heat of his seed in your depths as you clamp down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
					break;
				default:
					r.push(`a hot young body, and gently push him back onto your bed. You tease him as you remove your evening dress, crawl over him and impale yourself on his eager shaft, fully taking its length, before beginning to ride him. Even a female arcology owner like yourself appreciates a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known he had you, though, and he is eagerly thrusting into your pussy. You shift into a slightly more comfortable position`);
					if (V.PC.belly >= 5000) {
						r.push(`(one that forces him to bear the weight of your heavy middle)`);
					}
					r.push(`and ride him to orgasm. You follow shortly after, feeling the heat of his seed in the depths of your pussy as it clamps down around his dick. Thankfully, he isn't spent yet and begins anew, quickly carrying your climax to a second orgasm and drawing an adorable moan out of you.`);
			}
			if (FS === "FSAssetExpansionist") {
				if (S.Concubine && canMove(S.Concubine) && S.Concubine.fetish !== Fetish.MINDBROKEN) {
					r.push(`${S.Concubine.slaveName} eagerly joins the two of you to help clean the massive cumshot up.`);
				}
			} else if (FS !== "FSYouthPreferentialist") {
				if (S.Concubine && canMove(S.Concubine) && S.Concubine.fetish !== Fetish.MINDBROKEN) {
					const {he} = getPronouns(S.Concubine);
					r.push(`The`);
					if (canSee(S.Concubine)) {
						r.push(`view of your bouncing tits`);
					} else if (canHear(S.Concubine)) {
						r.push(`sound of lusty sex`);
					} else {
						r.push(`vibrations from your bed bouncing up and down`);
					}
					r.push(`is too much for ${S.Concubine.slaveName} to resist and so ${he} crawls over to kiss and caress you as your lover finishes.`);
				}
			}
			r.push(`Sometimes society overlooks that you are a woman and have certain needs, but your lover tonight knows exactly how to treat you. When your guest`);
			if (FS !== "FSYouthPreferentialist") {
				r.push(`is finally spent,`);
			} else {
				r.push(`wakes up from against your body,`);
			}
			r.push(`he showers, dresses, and leaves discreetly, offering you a proper thank you. This is the kind of thing that <span class="green">builds a lasting reputation</span> in the Free Cities.`);
			repX(5000, "event");
			if (canGetPregnant(V.PC)) {
				switch (FS) {
					case "FSAssetExpansionist":
					case "FSRepopulationFocus":
					case "FSSlaveProfessionalism":
						r.push(knockMeUp(V.PC, 100, 0, -2));
						break;
					case "FSRestart":
					case "FSGenderFundamentalist":
					case "FSMaturityPreferentialist":
					case "FSPaternalist":
					case "FSPhysicalIdealist":
					case "FSStatuesqueGlorification":
						r.push(knockMeUp(V.PC, 60, 0, -2));
						break;
					default:
						r.push(knockMeUp(V.PC, 40, 0, -2));
				}
			}
			if (FS !== "none") {
				const desc = "a tasteful morning-after message, complete with number, from a handsome " + FutureSocieties.displayAdj(FS) + " citizen";
				addTrinket(desc);
			} else {
				addTrinket("a tasteful morning-after message, complete with number, from a handsome citizen");
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}
		function exhibitionism() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You turn to face him straight on, and something about the look in your eye fills him with mixed apprehension and anticipation. You agree with his banter and praise him for being so forward-thinking, before transitioning to more direct praise of his style and then his body. You're speaking in a tone that cuts through the room, and by the time you kiss your willing conquest, there's not a person in the room who isn't paying attention. They all understand the message: this gathering is turning into something else, now. Those few who aren't willing to fuck in public withdraw, and everyone who didn't come with a sexual partner sends urgent messages to have appropriate slaves brought from their apartments. You make out with him for a while, letting everyone make arrangements, and then pull his clothes off, making sure his`);
			if (!["none", "FSNull"].includes(FS)) {
				V.arcologies[0][FS] += 5;
			}
			switch (FS) {
				case "FSSubjugationist":
				case "FSSupremacist":
					r.push(`superior body`);
					break;
				case "FSGenderRadicalist":
					r.push(`tits and stiff dick`);
					break;
				case "FSGenderFundamentalist":
					r.push(`dominant masculinity`);
					break;
				case "FSRepopulationFocus":
					r.push(`urge to father a daughter`);
					break;
				case "FSRestart":
					r.push(`perfect body`);
					break;
				case "FSPaternalist":
					r.push(`appealing body`);
					break;
				case "FSDegradationist":
					r.push(`dominant form`);
					break;
				case "FSBodyPurist":
					r.push(`natural body`);
					break;
				case "FSTransformationFetishist":
					r.push(`extended dick`);
					break;
				case "FSYouthPreferentialist":
					if (V.minimumSlaveAge < 13) {
						r.push(`boyish`);
					} else if (V.minimumSlaveAge < 18) {
						r.push(`teenage`);
					} else {
						r.push(`young`);
					}
					r.push(`body`);
					break;
				case "FSMaturityPreferentialist":
					r.push(`mature body`);
					break;
				case "FSSlimnessEnthusiast":
					r.push(`slender body`);
					break;
				case "FSAssetExpansionist":
					r.push(`huge genitals`);
					break;
				case "FSPastoralist":
					r.push(`milk-fed, chubby body`);
					break;
				case "FSPhysicalIdealist":
					r.push(`ripped body`);
					break;
				case "FSHedonisticDecadence":
					r.push(`plump body`);
					break;
				case "FSChattelReligionist":
					r.push(`divine sexuality`);
					break;
				case "FSRomanRevivalist":
					r.push(`muscular form`);
					break;
				case "FSNeoImperialist":
					r.push(`chiseled muscles`);
					break;
				case "FSAztecRevivalist":
					r.push(`well-built form`);
					break;
				case "FSEgyptianRevivalist":
					r.push(`beautiful tanned body`);
					break;
				case "FSArabianRevivalist":
				case "FSChineseRevivalist":
				case "FSAntebellumRevivalist":
					r.push(`exquisite mustache`);
					break;
				case "FSEdoRevivalist":
					r.push(`graceful form`);
					break;
				case "FSIntellectualDependency":
					r.push(`extreme horniness`);
					break;
				case "FSSlaveProfessionalism":
					r.push(`experienced body`);
					break;
				case "FSPetiteAdmiration":
					r.push(`tiny form`);
					break;
				case "FSStatuesqueGlorification":
					r.push(`towering form`);
					break;
				default:
					r.push(`hot young body`);
			}
			r.push(`is obvious to everyone. The message is clear, and your guest of honor is the center of attention as you take him there in view of the arcology's leading citizens. Naturally, the story percolates, making it clear that there's nothing you won't do to <span class="green">further acceptance of ${FS !== "none" ? FutureSocieties.displayAdj(FS) : "societal"} principles.</span>`);
			if (canGetPregnant(V.PC)) {
				r.push(knockMeUp(V.PC, 40, 0, -2));
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
