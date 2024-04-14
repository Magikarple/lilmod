// cSpell:ignore Shahryar

App.Events.RECitizenHookup = class RECitizenHookup extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.policies.regularParties === 1,
		];
	}

	execute(node) {
		let r = [];
		let repopHookupPregnant;

		const FSArray = FutureSocieties.activeFSes(V.arcologies[0]);
		const FS = (FSArray.length > 0) ? FSArray.random() : "none";

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
				r.push(`a pretty, racially pure young woman`);
				break;
			case "FSGenderRadicalist":
				r.push(`a beautiful young futa`);
				break;
			case "FSGenderFundamentalist":
				r.push(`a good-looking young lady`);
				break;
			case "FSRepopulationFocus":
				if (V.arcologies[0].FSRepopulationFocusLaw === 1 && (random(1, 10) > 3)) {
					repopHookupPregnant = 1;
					r.push(`a heavily pregnant young lady`);
				} else {
					repopHookupPregnant = 0;
					r.push(`a pretty, fertile young woman with wide, child-bearing hips`);
				}
				break;
			case "FSRestart":
				r.push(`a stunningly gorgeous woman`);
				break;
			case "FSPaternalist":
				r.push(`a pretty, cheerful young woman`);
				break;
			case "FSDegradationist":
				r.push(`a confident girl`);
				break;
			case "FSBodyPurist":
				r.push(`a clean-looking young woman`);
				break;
			case "FSTransformationFetishist":
				r.push(`a nicely augmented girl`);
				break;
			case "FSYouthPreferentialist":
				if (V.minimumSlaveAge < 13) {
					r.push(`an cute little preteen girl`);
				} else if (V.minimumSlaveAge < 18) {
					r.push(`a pretty teenage girl`);
				} else {
					r.push(`a nice young looking girl`);
				}
				break;
			case "FSMaturityPreferentialist":
				r.push(`an attractive, mature woman`);
				break;
			case "FSSlimnessEnthusiast":
				r.push(`a slim young thing`);
				break;
			case "FSAssetExpansionist":
				r.push(`a curvaceous young woman`);
				break;
			case "FSPastoralist":
				r.push(`a hot little lady`);
				break;
			case "FSPhysicalIdealist":
				r.push(`a hot little amazon`);
				break;
			case "FSHedonisticDecadence":
				r.push(`a plump little cutey`);
				break;
			case "FSChattelReligionist":
				r.push(`a pretty, devout-looking young woman`);
				break;
			case "FSRomanRevivalist":
				r.push(`a proper young Roman lady`);
				break;
			case "FSNeoImperialist":
				r.push(`a gorgeous young Imperial Knight with flowing blonde hair and a scarred face`);
				break;
			case "FSAztecRevivalist":
				r.push(`a natural Aztec beauty`);
				break;
			case "FSEgyptianRevivalist":
				r.push(`a pretty, sun-kissed lady`);
				break;
			case "FSEdoRevivalist":
				r.push(`a proper Edo lady`);
				break;
			case "FSArabianRevivalist":
				r.push(`a pretty Arabian princess`);
				break;
			case "FSChineseRevivalist":
				r.push(`a pretty Chinese lady`);
				break;
			case "FSIntellectualDependency":
				r.push(`a cute party girl`);
				break;
			case "FSSlaveProfessionalism":
				r.push(`an elegant woman`);
				break;
			case "FSPetiteAdmiration":
				r.push(`a delightfully short young lady`);
				break;
			case "FSStatuesqueGlorification":
				r.push(`a towering figure`);
				break;
			default:
				r.push(`a pretty young woman`);
		}
		r.push(`sidles up to you. She begins to introduce herself, but one of the advantages of your connection to the arcology is that you always know who everyone is, and you greet her by name, which people have never learned not to be impressed by. She gushes about some of your recent`);
		if (FS !== "none") {
			r.push(FutureSocieties.displayAdj(FS));
		}
		r.push(`actions, displaying an unusual grasp of what you've been planning. Despite her sincere interest, she's obviously got something else on her mind.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`She's yours for the taking, if you want her, and if her praise and proximity weren't enough to make that clear, she manages to`);
		switch (FS) {
			case "FSSubjugationist":
			case "FSSupremacist":
				r.push(`give you an excellent view straight down her ethnically superior cleavage, straining against the top of her fashionable dress.`);
				break;
			case "FSGenderRadicalist":
				r.push(`simultaneously give you an excellent view straight down her cleavage, and bring the material of her sheer dress tight across her legs in a way that outlines her dick.`);
				break;
			case "FSGenderFundamentalist":
				r.push(`press her flirting as far she can decorously take it, batting her eyes at you coquettishly.`);
				break;
			case "FSRepopulationFocus":
				if (repopHookupPregnant === 1) {
					r.push(`lean back just far enough that her full term, triplets rounded middle splits the front of her overly tight dress.`);
				} else {
					r.push(`press her hips up against your own, before leaning in and whispering`);
					if (V.arcologies[0].FSRepopulationFocusLaw === 1) {
						r.push(`"My womb is ready to do its duty."`);
					} else {
						r.push(`"I'm ripe for breeding right now."`);
					}
				}
				break;
			case "FSRestart":
				r.push(`give you an excellent view straight down her perfect cleavage, straining against the top of her name-brand dress.`);
				break;
			case "FSPaternalist":
				r.push(`brush her breasts against your arm, presuming on the egalitarian nature of your Paternalist society to flirt a little aggressively.`);
				break;
			case "FSDegradationist":
				r.push(`raise one shoulder far enough that her breast on that side pulls its nipple just clear of her tight leather dress, revealing a spiked piercing.`);
				break;
			case "FSBodyPurist":
				r.push(`arch her back with such warm propinquity that her natural breasts almost spill out of her tight little dress, and actually reveal the upper edges of their areolae.`);
				break;
			case "FSTransformationFetishist":
				r.push(`pop her huge fake boobs entirely out of her tight little evening dress without even using her hands.`);
				break;
			case "FSYouthPreferentialist":
				r.push(`perfectly balance her youthful, innocent appeal with the proper decorum between you and a citizen.`);
				break;
			case "FSMaturityPreferentialist":
				r.push(`perfectly balance her matronly, sensual appeal with the proper decorum between you and a citizen.`);
				break;
			case "FSSlimnessEnthusiast":
				r.push(`turn from side to side as she flirts with you in a way that shows off the coquettish forum under her tight dress to great effect.`);
				break;
			case "FSAssetExpansionist":
				r.push(`arch her back with such warm propinquity that her huge breasts spill out of her tight little dress, springing clear to offer themselves glorious and nude.`);
				break;
			case "FSPastoralist":
				r.push(`let you know that she's almost entirely milk-fed, while giving you quite an eyeful of her straining cleavage.`);
				break;
			case "FSPhysicalIdealist":
				r.push(`get a pretty good flex going without being obvious about it, outlining her abs against the sheer midsection of her tight dress.`);
				break;
			case "FSHedonisticDecadence":
				r.push(`lean her chubby body back far enough to pop the buttons off her top and allow her ample breasts and armful of a belly to hang free.`);
				break;
			case "FSChattelReligionist":
				r.push(`assume just a hint of a Chattel Religionist devotional pose used to request penetration. It's heavy flirting, of a modern religious sort.`);
				break;
			case "FSRomanRevivalist":
				r.push(`hint that her pudicitia, that is her purity, would be if anything enhanced by sexual commerce with someone as powerful as you.`);
				break;
			case "FSNeoImperialist":
				r.push(`hint that as a Knight under your banner, to serve you in *any* way would be among the greatest of honors.`);
				break;
			case "FSAztecRevivalist":
				r.push(`hint that her devotion, which is the most important thing, cannot be besmirched by tasting your divine power.`);
				break;
			case "FSEgyptianRevivalist":
				r.push(`hint that she would like nothing better than to bask in the pharaonic light in the arcology, very close to its source, while loosening her linen dress a little.`);
				break;
			case "FSEdoRevivalist":
				r.push(`allude to the refined pleasures, while assuming a slightly less dignified posture in her gorgeous kimono.`);
				break;
			case "FSArabianRevivalist":
				r.push(`reference young Scheherazade and mighty Shahryar in a way that suggests she's quite willing to play the former.`);
				break;
			case "FSChineseRevivalist":
				r.push(`allude to the divinity that resides with the powerful, implying that she'd very much like to come closer to it.`);
				break;
			case "FSIntellectualDependency":
				r.push(`hint that she forgot to put on panties and that she needs that dripping sound checked out.`);
				break;
			case "FSSlaveProfessionalism":
				r.push(`bring you fully erect with a single, masterful stroke of her fingers.`);
				break;
			case "FSPetiteAdmiration":
				r.push(`give the bulge in your pants a quick kiss.`);
				break;
			case "FSStatuesqueGlorification":
				r.push(`affectionately rest her breasts on your head.`);
				break;
			default:
				r.push(`flirt with you quite hard without crossing any lines between a citizen and an arcology owner.`);
		}
		r.push(`She's clearly attracted to you; even the most consummate actress would have difficulty fooling you, and her breath is a little quick, her pupils are a bit dilated, and she's blushing cutely. But she's no fool, either. A casual liaison with ${PCTitle()} would be a tremendous social boost for her.`);
		App.Events.addParagraph(node, r);

		const choices = [
			new App.Events.Result(`Keep aloof without offending her`, aloof),
			new App.Events.Result(`To them that hath, it shall be given`, give)
		];
		if (FS !== "none") {
			choices.push(new App.Events.Result(`Emphasize her societal style with exhibitionism`, exhibitionism));
		}
		App.Events.addResponses(node, choices);

		function aloof() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You thank her for her praise, weighting the words in just the right way to communicate that you consider her flirtations worthy compliments, and nothing more. She understands immediately, communicating acceptance and pleasure at her own daring with nothing more than a thankful look in your eyes. This is how you approach matters like this. You are the ruler of this place and it behooves you to maintain a balance atop all your citizens without showing any susceptibility to solicitation. A little incident like this has little effect on its own, but your habit of maintaining proper reserve creates a reputation for judiciousness that <span class="green">businesspeople consider attractive for arcology investment.</span>`);
			V.arcologies[0].prosperity += 3;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function give() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You're not exactly starved for casual sex, but you've never thought there was any such thing as too much of a good thing. You place a`);
			if (V.PC.title === 1) {
				r.push(`masculine`);
			} else {
				r.push(`feminine`);
			}
			r.push(`hand against the small of her back, feeling the warmth of her through the material of her evening wear. You hear a slight gasp from her as she realizes that her gambit has succeeded with more immediate effect than she expected. She shivers with anticipation as you steer her back through a side door, making a discreet exit towards your private suite.`);
			if (S.Concubine) {
				const {
					he, his
				} = getPronouns(S.Concubine);
				if (S.Concubine.intelligence+S.Concubine.intelligenceImplant > 50) {
					r.push(`${S.Concubine.slaveName} is there, of course, and ${he} instantly`);
					if (canSee(S.Concubine)) {
						r.push(`sees`);
					} else {
						r.push(`realizes`);
					}
					r.push(`that ${his} continued presence for a ménage à trois is wanted by both you and your guest.`);
				} else if (S.Concubine.intelligence+S.Concubine.intelligenceImplant < -50) {
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
			r.push(`Your guest restrains her eager praise now that you're in private, but her wide-eyed appreciation of your domain is compliment enough. Once in your suite, she strips, revealing`);
			switch (FS) {
				case "FSSubjugationist":
				case "FSSupremacist":
					r.push(`her fresh, pure body.`);
					break;
				case "FSGenderRadicalist":
					r.push(`perky young breasts, a pretty pussy, and a stiff dick above it.`);
					break;
				case "FSGenderFundamentalist":
					r.push(`perky young breasts and an elegantly coiffed strip of hair that perfectly highlights her demure pussy.`);
					break;
				case "FSRepopulationFocus":
					if (repopHookupPregnant === 1) {
						if (random(1, 10) > 7) {
							r.push(`an experienced body, comfortable with the burdens of pregnancy.`);
						} else {
							r.push(`an inexperienced body undergoing its very first pregnancy.`);
						}
						r.push(`She's taken good care of herself; not a single stretch mark can be seen across her proportionally giant belly.`);
					} else {
						if (V.arcologies[0].FSRepopulationFocusLaw === 1) {
							r.push(`an experienced body, ready and eager to grow fecund once more.`);
						} else {
							r.push(`an inexperienced body, but one with potential for becoming quite fecund.`);
						}
					}
					break;
				case "FSRestart":
					r.push(`a near flawless body; the only distinguishable mark on it: a small tattoo of a prestigious school.`);
					break;
				case "FSPaternalist":
					r.push(`a nice young body, with all the little attractions and flaws of a free girl's.`);
					break;
				case "FSDegradationist":
					r.push(`a taut body covered in dominant tattoos and spiky piercings.`);
					break;
				case "FSBodyPurist":
					r.push(`a delectably curvaceous young body unmarred by any trace of surgical intervention.`);
					break;
				case "FSTransformationFetishist":
					r.push(`a massive fake bubble butt to go with her fake boobs.`);
					break;
				case "FSYouthPreferentialist":
					r.push(`that her whole body looks fresh, untouched, and quite young.`);
					break;
				case "FSMaturityPreferentialist":
					r.push(`a big pair of motherly tits, generous hips, a broad ass, and total self confidence.`);
					break;
				case "FSSlimnessEnthusiast":
					r.push(`perky little breasts, a smooth waist, trim hips, and a cute little ass.`);
					break;
				case "FSAssetExpansionist":
					r.push(`an inhumanly enormous ass to match her similarly improbable boobs.`);
					break;
				case "FSPastoralist":
					r.push(`amply milk-fed assets.`);
					break;
				case "FSPhysicalIdealist":
					r.push(`the dimples that form on the sides of her cute buttocks when she flexes.`);
					break;
				case "FSHedonisticDecadence":
					r.push(`well-fed and delightfully jiggly assets.`);
					break;
				case "FSChattelReligionist":
					r.push(`a fresh and ready body, adorned here and there with sensual devotional jewelry.`);
					break;
				case "FSRomanRevivalist":
					r.push(`a graceful, milk-pale vision of classical beauty.`);
					break;
				case "FSNeoImperialist":
					r.push(`a statuesque body, corded with fit musculature made for practical service.`);
					break;
				case "FSAztecRevivalist":
					r.push(`a strong, tight, bronze body.`);
					break;
				case "FSEgyptianRevivalist":
					r.push(`a perfect expanse of smooth, warm, tanned skin.`);
					break;
				case "FSEdoRevivalist":
					r.push(`a graceful form so perfectly pale that her face requires almost no whitening at all.`);
					break;
				case "FSArabianRevivalist":
					r.push(`a nubile young body perfectly formed for a Sultan's bed.`);
					break;
				case "FSChineseRevivalist":
					r.push(`a pretty young body that would not look out of place in an Imperial bed.`);
					break;
				case "FSIntellectualDependency":
					r.push(`a young body practically begging you for dick.`);
					break;
				case "FSSlaveProfessionalism":
					r.push(`an elegant, mature body that knows its way around the bedroom.`);
					break;
				case "FSPetiteAdmiration":
					r.push(`an adorably petite figure.`);
					break;
				case "FSStatuesqueGlorification":
					r.push(`that you have to crane your neck back to take in her full stature.`);
					break;
				default:
					r.push(`a hot young body.`);
			}
			r.push(`Citizens like her often appreciate a good hard fuck, since regular submission to a pounding from sex slaves would be a scandal. There's little opprobrium waiting for you if it's known you had her, though, and she's deliciously eager as you press her down onto the bed${(V.PC.dick === 0) ? " and pull on your usual harness" : ""}. She ruts herself hard back against you as you thrust into her, moaning, and after a short while she begs for it even harder, so you flip her over and mount her like a bitch, making her scream.`);
			if (S.Concubine) {
				const {
					his, him
				} = getPronouns(S.Concubine);
				r.push(`The view of your conquest's rutting back is nice, of course, but after enjoying it for a few moments you pull ${S.Concubine.slaveName} in`);
				if (S.Concubine.intelligence+S.Concubine.intelligenceImplant > 50) {
					r.push(`and kiss your favorite deeply, playing with ${him} as you fuck.`);
				} else if (S.Concubine.intelligence+S.Concubine.intelligenceImplant < -50) {
					r.push(`and kiss your favorite idiot deeply, keeping ${him} from feeling left out as you fuck.`);
				} else if (S.Concubine.fetish === Fetish.MINDBROKEN) {
					r.push(`and play with ${his} body as you fuck.`);
				}
			}
			r.push(`When your guest is finally spent, she showers, dresses, and leaves discreetly, offering you a proper thank you. This is the kind of thing that <span class="green">builds a lasting reputation</span> in the Free Cities.`);
			repX(5000, "event");
			if (FS === "FSRepopulationFocus" && V.PC.dick !== 0 && repopHookupPregnant === 0 && (random(1, 100) > 40)) {
				addTrinket(`a tasteful morning-after message, with attached positive pregnancy test, from a pretty citizen you bred`);
			} else if (FS !== "none") {
				addTrinket(`a tasteful morning-after message from a pretty ${FutureSocieties.displayAdj(FS)} citizen`);
			} else {
				addTrinket("a tasteful morning-after message from a pretty citizen");
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function exhibitionism() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You turn to face her straight on, and something about the look in your eye fills her with mixed apprehension and anticipation. You agree with her banter and praise her for being so forward-thinking, before transitioning to more direct praise of her style and then her body. You're speaking in a tone that cuts through the room, and by the time you kiss your willing conquest, there's not a person in the room who isn't paying attention. They all understand the message: this gathering is turning into something else, now. Those few who aren't willing to fuck in public withdraw, and everyone who didn't come with a sexual partner sends urgent messages to have appropriate slaves brought from their apartments. You make out with her for a while, letting everyone make arrangements, and then pull her clothes off, making sure her`);
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
					r.push(`femininity`);
					break;
				case "FSRepopulationFocus":
					if (repopHookupPregnant === 1) {
						r.push(`fecund body`);
					} else {
						r.push(`ready-to-be-bred body`);
					}
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
					r.push(`fake butt`);
					break;
				case "FSYouthPreferentialist":
					r.push(`young body`);
					break;
				case "FSMaturityPreferentialist":
					r.push(`mature body`);
					break;
				case "FSSlimnessEnthusiast":
					r.push(`slender body`);
					break;
				case "FSAssetExpansionist":
					r.push(`curvaceous form`);
					break;
				case "FSPastoralist":
					r.push(`milk-fed plushness`);
					break;
				case "FSPhysicalIdealist":
					r.push(`muscular body`);
					break;
				case "FSHedonisticDecadence":
					r.push(`plump body`);
					break;
				case "FSChattelReligionist":
					r.push(`divine sexuality`);
					break;
				case "FSRomanRevivalist":
					r.push(`elegant form`);
					break;
				case "FSNeoImperialist":
					r.push(`chiseled body`);
					break;
				case "FSAztecRevivalist":
					r.push(`well-built form`);
					break;
				case "FSEgyptianRevivalist":
					r.push(`beautiful tanned body`);
					break;
				case "FSArabianRevivalist":
				case "FSChineseRevivalist":
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
			r.push(`is obvious to everyone. The message is clear, and your guest of honor is the center of attention as you take her there in view of the arcology's leading citizens. Naturally, the story percolates, making it clear that there's nothing you won't do to <span class="green">further acceptance of ${FS !== "none" ? FutureSocieties.displayAdj(FS) : "societal"} principles.</span>`);

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
