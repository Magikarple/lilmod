// cSpell:ignore klux, nadeshiko

/* OPEN TOYCHEST */
App.Interact.ToyChest = function(slave) {
	"use strict";
	const {
		he, him, his, himself, He, His
	} = getPronouns(slave);

	let r = `${slave.slaveName} `;
	if (slave.fuckdoll) {
		r += `is waiting for use nearby. `;
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		if (canSmell(slave) && slave.career === "a breeding bull" && isFertile(V.PC) && V.PC.preg === 0 && canPenetrate(slave)) {
			r += `is rock hard and sniffing the air. `;
		} else {
			r += `is waiting dumbly nearby. `;
		}
	} else if (slave.devotion > 50) {
		if (slave.toyHole === "mouth") {
			r += `has positioned ${himself} nearby with ${his} mouth conveniently `;
			if (V.PC.dick) {
				r += `at cock level. `;
			} else {
				r += `level with your pussy. `;
			}
		} else if (slave.toyHole === "boobs") {
			r += `is kneeling nearby with ${his} chest thrust out as far as it will go. `;
		} else if (slave.toyHole === "pussy" && hasBothLegs(slave)) {
			r += `is kneeling on the couch with legs apart to present ${his} pussy. `;
		} else if (slave.toyHole === "pussy") {
			r += `is lying on the couch with ${his} pussy ready for you. `;
		} else if (slave.toyHole === "ass" && hasBothLegs(slave)) {
			r += `is lying on the couch with ${his} legs up and back to present ${his} butthole. `;
		} else if (slave.toyHole === "ass") {
			r += `is lying on the couch with ${his} butt ready for you. `;
		} else if (slave.toyHole === "dick") {
			r += `is lying on the couch with ${his} dick at the ready for you. `;
		} else {
			r += `is nearby, eagerly presenting ${himself}. `;
		}
	} else if (slave.trust < -20) {
		r += `is waiting nearby in terror, hoping obedience will save ${him} from punishment. `;
	} else if (slave.devotion < -90) {
		r += `is hogtied nearby for sexual abuse. `;
	} else if (slave.devotion < -50) {
		r += `is restrained nearby for sexual use. `;
	} else if (slave.devotion < -20) {
		r += `is unhappily waiting nearby for sexual use. `;
	} else if (slave.devotion <= 20) {
		r += `is obediently waiting nearby for sexual use. `;
	} else if (slave.devotion <= 50) {
		r += `has positioned ${himself} nearby to offer you ${his} body. `;
	}
	let pose = jsRandom(1, 100);
	if (slave.fuckdoll) {
		r += `${His} holes are, as always, available. `;
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		r += `${He} ignores ${his} clothing, regarding it as an impediment to ${his} purpose. `;
	} else {
		switch (slave.clothes) {
			case "shibari ropes":
				r += `You've tied ${his} shibari bindings so that ${he}'s forced to thrust out ${his} chest. `;
				break;
			case "uncomfortable straps":
				if (pose > 75) {
					r += `${His} leather straps are forcing ${him} to thrust out ${his} tits. `;
				} else if (pose > 50) {
					r += `${His} leather straps are uncomfortably pressing ${his} breasts and asscrack. `;
				} else if (pose > 25) {
					r += `The rings in ${his} leather straps over each nipple and hole make ${him} look like a perfect fucktoy. `;
				} else {
					r += `${His} uncomfortable straps force ${him} to constantly present ${his} holes. `;
				}
				break;
			case "restrictive latex":
			case "a latex catsuit":
				r += `${His} complete suit of latex makes ${him} a nice, artistic display, a plastic work of art in the shape of a female form.`;
				break;
			case "a military uniform":
			case "a schutzstaffel uniform":
			case "a slutty schutzstaffel uniform":
			case "a red army uniform":
			case "a confederate army uniform":
				r += `${His} uniformed presence lends your office the air of a military command center.`;
				break;
			case "a long qipao":
				r += `${His} elegant qipao lends your office an air of traditional opulence and prestige.`;
				break;
			case "battlearmor":
				r += `${His} armored presence lends your office the air of a battlefield command center.`;
				break;
			case "Imperial Plate":
				r += `${His} heavily armored and crest-marked presence lends your office an air of violent nobility.`;
				break;
			case "a mounty outfit":
				r += `${His} uniformed presence lends your office the air of a police command center.`;
				break;
			case "a dirndl":
				r += `${His} dirndl lends a traditional atmosphere to your office.`;
				break;
			case "lederhosen":
				r += `${His} lederhosen lends a traditional atmosphere to your office.`;
				break;
			case "a biyelgee costume":
				r += `${His} biyelgee costume lends a festive atmosphere to your office.`;
				break;
			case "a mini skirt":
				r += `${His} flattering mini dress makes ${him} the perfect office ornament for the modern captain of industry.`;
				break;
			case "a nice nurse outfit":
				r += `${His} proper nurse's outfit gives the office a clinical air.`;
				break;
			case "a fallen nuns habit":
				r += `${His} latex parody of a nuns habit gives the office a sacrilegious air.`;
				break;
			case "a chattel habit":
				r += `${His} chattel habit makes the office look like what it is: the inner sanctum of a new and deeply sensual faith.`;
				break;
			case "a penitent nuns habit":
				r += `${His} sackcloth habit gives the office a somber air.`;
				break;
			case "attractive lingerie":
				r += `${He}'s wearing classy lingerie, making ${him} an unusually refined ornament to the office.`;
				break;
			case "kitty lingerie":
				r += `${His} cat-themed lingerie gives the office a bizarrely innocent air of perversion.`;
				break;
			case "a succubus outfit":
				r += `${He}'s dressed to look like a succubus. There is a demon`;
				if (V.PC.title === 0) {
					r += `ess`;
				}
				r += ` in this office, and ${he} serves `;
				if (V.PC.title === 0) {
					r += `her.`;
				} else {
					r += `him.`;
				}
				break;
			case "spats and a tank top":
				r += `${He}'s wearing spats and a tank top, giving the office the active air of a gym.`;
				break;
			case "a string bikini":
				r += `${He}'s wearing a string bikini, making ${him} a sexy, enticing office ornament.`;
				break;
			case "a scalemail bikini":
				r += `${His} scalemail bikini gives the office a medieval air.`;
				break;
			case "striped panties":
			case "a striped bra":
			case "striped underwear":
				r += `${He}'s wearing cute underwear, making ${him} a sexy, innocent-looking office ornament.`;
				break;
			case "attractive lingerie for a pregnant woman":
				r += `${His} breasts gently spill out of ${his} slightly too small top.`;
				if (slave.lactation) {
					r += ` ${His} leaking nipples have rendered ${his} top see-through.`;
				}
				break;
			case "a maternity dress":
				r += `${His} low cut dress reveals ample cleavage.`;
				break;
			case "stretch pants and a crop-top":
				r += `${His} comfortable clothes give your office a laid back air and are easy to slip off when the mood strikes.`;
				break;
			case "a cheerleader outfit":
				r += `${He}'s wearing a slutty cheerleader outfit, making it look like ${he}'s here to fuck before team practice.`;
				break;
			case "clubslut netting":
				r += `${He}'s wearing slutty netting and headphones so ${he} can dance to music without annoying visitors.`;
				break;
			case "cutoffs and a t-shirt":
				r += `${He}'s wearing cutoffs and a t-shirt, making ${him} a fun, clean office ornament.`;
				break;
			case "a slutty nurse outfit":
				r += `${He}'s wearing a slutty nurse outfit, and looks more than ready to minister to any patient's needs.`;
				break;
			case "a schoolgirl outfit":
				r += `${He}'s wearing a slutty schoolgirl outfit, and looks ready to do whatever it takes to improve ${his} grades.`;
				break;
			case "a kimono":
				r += `${He}'s wearing a kimono, lending your office an air of elegance, though ${he} lacks some of the air of the true yamato nadeshiko.`;
				break;
			case "a burkini":
				r += `${He}'s wearing a colorful burkini, lending your office a vague air of conservatism.`;
				break;
			case "a hijab and blouse":
				r += `${He}'s wearing a modest hijab and blouse, lending your office a certain air of conservatism.`;
				break;
			case "a hijab and abaya":
				r += `${He}'s wearing a modest hijab and abaya, lending your office a certain air of conservatism.`;
				break;
			case "a niqab and abaya":
				r += `${He}'s wearing a niqab and abaya, lending your office an air of conservatism.`;
				break;
			case "a klan robe":
			case "a slutty klan robe":
				r += `${He}'s wearing a ku klux klan robe, lending your office an air of conservatism.`;
				break;
			case "a burqa":
				r += `${He}'s wearing an all-concealing burqa, lending your office an intense air of conservatism.`;
				break;
			case "battledress":
				r += `${He}'s wearing skimpy battledress, making your office seem a little like the ideal bunker for a survivalist.`;
				break;
			case "a slutty outfit":
				if (slave.actualAge < 21) {
					r += `${He}'s wearing a schoolgirl uniform and sucking on hard candy, giving ${him} a delectably youthful appearance.`;
				} else if (slave.actualAge < 30) {
					r += `${He}'s chosen to wear a slutty nurse outfit, and looks more than ready to minister to any patient's needs.`;
				} else if (slave.actualAge < 40) {
					r += `${He}'s wearing a schoolgirl uniform and sucking on hard candy, a delightfully perverse outfit for a slave in ${his} thirties.`;
				} else {
					r += `${He}'s wearing a wifely apron that covers ${his} front, but leaves ${his} backside bare, an appropriate outfit for a slave in ${his} forties.`;
				}
				break;
			case "a halter top dress":
				r += `The gorgeous halter top dress ${he}'s wearing is almost a work of art.`;
				break;
			case "a ball gown":
				r += `The fabulous silken ball gown ${he}'s wearing lifts the entire atmosphere.`;
				break;
			case "an evening dress":
				r += `The sensual evening dress ${he}'s wearing lends your office a refined, yet sexual air.`;
				break;
			case "a slave gown":
				r += `The gorgeous gown ${he}'s wearing lends an air of class to the office.`;
				break;
			case "slutty business attire":
				r += `The suit ${he}'s wearing would make it look like ${he}'s here to do business, if not for the extreme shortness of the skirt and ${his} acre of cleavage.`;
				break;
			case "nice business attire":
				r += `The suit ${he}'s wearing makes it look like ${he}'s here to do business, not fuck.`;
				break;
			case "a comfortable bodysuit":
				r += `The bodysuit ${he}'s wearing displays ${his} every fuckable curve.`;
				break;
			case "a tight Imperial bodysuit":
				r += `The bodysuit ${he}'s wearing displays ${his} every fuckable curve, your crest proudly displayed on the swell of ${his} chest.`;
				break;
			case "a leotard":
				r += `The leotard ${he}'s wearing is tight enough to advertise every detail.`;
				break;
			case "a monokini":
				r += `${His} topless swimsuit gives the office a perverted yet cultured aura.`;
				break;
			case "an apron":
				r += `${His} apron makes the office an intimate air, especially since ${he}'s nude underneath it.`;
				break;
			case "a cybersuit":
				r += `${His} cybersuit lends to an impersonal but sexual atmosphere, as ${his} delicious curves are prominently displayed.`;
				break;
			case "a bunny outfit":
				r += `The bunny outfit ${he}'s wearing makes ${him} look ready to serve drinks and suck dick.`;
				break;
			case "a slutty maid outfit":
				r += `${His} maid outfit makes ${him} look useful and sexually easy.`;
				break;
			case "a nice maid outfit":
				r += `${His} maid outfit makes ${his} servitude obvious while not looking too lewd.`;
				break;
			case "harem gauze":
				r += `${His} harem girl outfit lends ${his} corner of your office an Eastern opulence.`;
				break;
			case "slutty jewelry":
				r += `The bangles ${he}'s wearing make little noises every time ${he} moves, serving as a constant reminder of ${his} sexual availability.`;
				break;
			case "conservative clothing":
				r += `${His} clothes make it look like ${he}'s here for some other purpose than sexual slavery.`;
				break;
			case "chains":
				r += `${His} chains make it obvious that ${he}'s here as an office sex toy.`;
				break;
			case "Western clothing":
				r += `${His} Western clothing is comically out of place in a modern office.`;
				break;
			case "overalls":
				r += `${His} worker's overalls make it clear that you're the boss and ${he} is your subordinate.`;
				break;
			case "body oil":
				r += `${His} body oil makes ${his} muscles a lovely ornament to the office, and makes all ${his} holes nice and inviting.`;
				break;
			case "a toga":
			case "a hanbok":
				r += `${His} toga lends an air of antiquity to the office.`;
				break;
			case "a huipil":
				r += `${His} revealing huipil is a delightfully exotic novelty in your office.`;
				break;
			case "a slutty qipao":
				r += `${His} lovely qipao is a delicious contradiction of conservative silk patterns and scandalously high cuts.`;
				break;
			case "a bimbo outfit":
				r += `The way ${his} underwear is revealed by ${his} clothing just exudes sluttiness.`;
				break;
			case "a courtesan dress":
				r += `The layered dress ${he}'s wearing, and the posture forced by its corset, gives your office an air of elegance.`;
				break;
			case "a bra":
			case "a button-up shirt":
			case "a button-up shirt and panties":
			case "a sweater":
			case "a sweater and cutoffs":
			case "a sweater and panties":
			case "a t-shirt":
			case "a t-shirt and jeans":
			case "a t-shirt and panties":
			case "a t-shirt and thong":
			case "a tank-top":
			case "a tank-top and panties":
			case "a thong":
			case "a tube top":
			case "a tube top and thong":
			case "an oversized t-shirt":
			case "an oversized t-shirt and boyshorts":
			case "boyshorts":
			case "cutoffs":
			case "jeans":
			case "leather pants":
			case "leather pants and a tube top":
			case "leather pants and pasties":
			case "panties":
			case "panties and pasties":
			case "pasties":
				r += `${His} purpose as your office sex toy is prominently displayed by ${his} revealing outfit.`;
				break;
			case "a gothic lolita dress":
				r += `${His} gothic lolita dress lends a cute but dark old world charm to your office.`;
				break;
			case "a police uniform":
				r += `${His} police uniform lends an air of security and authority to your office.`;
				break;
			case "a one-piece swimsuit":
				r += `${His} one-piece swimsuit lends your office a more casual atmosphere.`;
				break;
			case "a nice pony outfit":
			case "a slutty pony outfit":
				r += `${His} bondage pony outfit reinforces the atmosphere of submission to your will.`;
				break;
			case "a sports bra":
			case "sport shorts and a t-shirt":
			case "sport shorts and a sports bra":
			case "sport shorts":
				r += `${His} athletic clothing gives the office a more youthful vibe.`;
				break;
			case "a skimpy loincloth":
				r += `${His} skimpy loincloth gives the office a more barbaric and raw atmosphere.`;
				break;
			case "a Santa dress":
				r += `${His} skimpy dress somehow makes you seem more charitable and jovial than you really are.`;
				break;
			default:
				if (slave.chastityVagina && slave.chastityAnus) {
					r += `${His} chastity belt covers and protects both ${his} vagina and anus, but leaves ${his} breasts naked and ${his} mouth available.`;
				} else if (slave.chastityVagina) {
					r += `${His} chastity belt covers and protects ${his} pussy, but leaves ${his} breasts naked, ${his} mouth available, and ${his} asshole vulnerable.`;
				} else if (slave.chastityAnus) {
					r += `${His} chastity belt covers and protects ${his} anus, but leaves ${his} breasts naked, ${his} mouth available, and ${his} pussy vulnerable.`;
				} else {
					r += `${He}'s nude and ready to be fucked.`;
				}
				break;
		}
	}
	return r;
};
