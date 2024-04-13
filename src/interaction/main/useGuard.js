// cSpell:ignore contractrix

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Interact.guardPose = function(slave) {
	"use strict";
	const {
		he, him, his, boy, woman,
		He, His
	} = getPronouns(slave);

	let r = `${slave.slaveName} is standing behind your left shoulder, guarding your person. `;
	switch (slave.clothes) {
		case "attractive lingerie":
			r += `${His} lacy lingerie contrasts with ${his} deadly weaponry.`;
			break;
		case "a succubus outfit":
			r += `${His} succubus outfit and impressive weapons make ${him} look like a character from an overwrought graphic novel.`;
			break;
		case "uncomfortable straps":
			r += `${His} uncomfortable straps make ${him} look like a classical slave warrior.`;
			break;
		case "shibari ropes":
			r += `${His} shibari ropes make ${him} look like an insane slave fighter.`;
			break;
		case "restrictive latex":
		case "a latex catsuit":
			r += `${His} complete suit of latex gives ${him} a beautiful yet intimidating appearance.`;
			break;
		case "a nice nurse outfit":
			r += `${His} practical nurse's outfit make ${his} weapons look like surgical instruments of death.`;
			break;
		case "a military uniform":
		case "a schutzstaffel uniform":
		case "a red army uniform":
		case "a confederate army uniform":
			r += `${His} military uniform is most befitting of an honor guard.`;
			break;
		case "a slutty schutzstaffel uniform":
			r += `${His} military uniform is most befitting of an honor guard and your personal whore.`;
			break;
		case "a long qipao":
			r += `${His} elegant qipao makes ${him} seem less deadly than ${he} actually is.`;
			break;
		case "battlearmor":
			r += `${His} battlearmor means ${he}'s always ready for combat.`;
			break;
		case "Imperial Plate":
			r += `${His} heavy Imperial armor makes ${him} look like a walking tank, the dynamic plating shifting against itself as ${he} moves.`;
			break;
		case "a mounty outfit":
			r += `${His} mounty outfit only enhances ${his} authority as your personal guard.`;
			break;
		case "a police uniform":
			r += `${His} police uniform only enhances ${his} authority as your personal guard.`;
			break;
		case "a gothic lolita dress":
			r += `${His} elegant dress makes ${him} seem less deadly than ${he} actually is.`;
			break;
		case "a dirndl":
			r += `${His} dirndl allows ${him} to hide all sorts of useful weapons against ${his} bare thighs.`;
			break;
		case "lederhosen":
			r += `${His} weapon hangs from a shoulder sling over ${his} lederhosen.`;
			break;
		case "a biyelgee costume":
			r += `${His} biyelgee costume makes ${him} appear as an athletic specimen, ready to defend you in hand-to-hand combat.`;
			break;
		case "a mini dress":
			r += `${His} revealing mini dress and elegant weapons make ${him} look sexy, yet deadly.`;
			break;
		case "a monokini":
			r += `${His} monokini's unrepressed appearance clashes amusingly with ${his} deadly weapons.`;
			break;
		case "an apron":
			r += `${He}'s nude, aside from an apron and the holsters for ${his} numerous weapons.`;
			break;
		case "overalls":
			r += `${His} overalls and armaments make ${him} look like ${he}'s ready to shoot some varmints.`;
			break;
		case "a cybersuit":
			r += `${His} cybersuit makes ${him} look sleek, sexy, and deadly. A perfect femme fatale.`;
			break;
		case "clubslut netting":
			r += `${His} club netting's slutty appearance clashes amusingly with ${his} deadly weapons.`;
			break;
		case "a string bikini":
			r += `${His} string bikini's flirty appearance clashes amusingly with ${his} deadly weapons.`;
			break;
		case "a scalemail bikini":
			r += `${His} scalemail bikini's barbaric appearance meshes well with ${his} sword, but clashes with ${his} firearms.`;
			break;
		case "striped panties":
			r += `${He}'s nude, aside from some cute panties and the holsters for ${his} numerous weapons.`;
			break;
		case "a slutty outfit":
			if (slave.actualAge < 21) {
				r += `${He}'s wearing a schoolgirl uniform and sucking on hard candy, making ${him} look like a character from a kung-fu film.`;
			} else if (slave.actualAge < 30) {
				r += `${He}'s chosen to wear a catsuit, and looks like a fictional heroine.`;
			} else if (slave.actualAge < 40) {
				// TODO: should this one be the same as the one above?
				r += `${He}'s wearing a schoolgirl uniform and sucking on hard candy, making ${him} look like a character from a kung-fu film.`;
			} else {
				r += `${He}'s wearing a wifely dress, creating a discordant effect with ${his} weapons.`;
			}
			break;
		case "a cheerleader outfit":
			r += `${He}'s wearing a cheerleader uniform, creating an amusing effect with ${his} weapons.`;
			break;
		case "attractive lingerie for a pregnant woman":
			r += `${His} silky lingerie contrasts with ${his} deadly weaponry.`;
			break;
		case "kitty lingerie":
			r += `${His} cutesy lingerie contrasts with ${his} deadly weaponry.`;
			break;
		case "a maternity dress":
			r += `${His} loose dress gives ${him} plenty of places to conceal weaponry.`;
			break;
		case "stretch pants and a crop-top":
			r += `${His} relaxed outfit clashes amusingly with ${his} serious weapons.`;
			break;
		case "a slave gown":
			r += `${His} gorgeous gown and elegant weapons make ${him} look refined, yet deadly.`;
			break;
		case "a halter top dress":
			r += `${His} beautiful halter top dress and elegant weapons make ${him} look refined, yet deadly.`;
			break;
		case "a ball gown":
			r += `${His} fabulous silken ball gown and elegant weapons make ${him} look refined, yet deadly.`;
			break;
		case "an evening dress":
			r += `${His} sensual evening dress and elegant weapons make ${him} look refined, yet deadly.`;
			break;
		case "a nice maid outfit":
			r += `${His} pretty maid outfit and weapons make ${him} look like a character from an animated movie.`;
			break;
		case "a nice pony outfit":
		case "a slutty pony outfit":
			r += `${His} leather outfit make ${him} look like an insane slave fighter.`;
			break;
		case "a hanbok":
			r += `${His} pretty hanbok and weapons make ${him} look like a character from a history novel.`;
			break;
		case "spats and a tank top":
			r += `${His} exercise outfit makes ${him} look like ${he} has the fitness to back up ${his} weapons.`;
			break;
		case "a slutty maid outfit":
			r += `${His} slutty maid outfit and weapons make ${him} look like a character from an exploitation film.`;
			break;
		case "cutoffs and a t-shirt":
			r += `${His} relaxed clothing clashes with ${his} weaponry, making ${him} look like ${he}'s planning to kill someone and then have a relaxing day off.`;
			break;
		case "harem gauze":
			r += `${His} weapons pin ${his} sheer gauze down over ${his} body, putting everything on lewd display.`;
			break;
		case "a fallen nuns habit":
			r += `${His} sacrilegious getup and weapons make ${him} look like a sinner's fantasy.`;
			break;
		case "a chattel habit":
			r += `${His} chattel habit and weapons make ${his} role as a defender of the new faith instantly obvious.`;
			break;
		case "a penitent nuns habit":
			r += `${His} somber habit and weapons make ${him} look like a member of a militant order.`;
			break;
		case "slutty business attire":
			r += `${His} slutty business suit and weapons give ${him} the look a supervillain's sidekick.`;
			break;
		case "nice business attire":
			r += `${His} business suit and weapons give ${him} the look of a finely honed corporate instrument.`;
			break;
		case "conservative clothing":
			r += `${His} casual, conservative clothes and weapons make ${him} look like a normal old world security contractrix.`;
			break;
		case "a hijab and blouse":
			r += `${His} modest, conservative clothes and weapons make ${him} look like an old world security contractrix.`;
			break;
		case "a comfortable bodysuit":
			r += `${His} bodysuit and weapons make ${him} look like an action movie heroine.`;
			break;
		case "a tight Imperial bodysuit":
			r += `${His} form-fitting bodysuit and weapons make ${him} look like an action movie heroine, an elegant mesh of pulsating cybernetics and tight nanomesh that rides up tightly against ${his} every curve.`;
			break;
		case "a burkini":
			r += `${His} form-fitting swimsuit and weapons make ${him} look like an action movie heroine.`;
			break;
		case "a Santa dress":
			r += `${His} skimpy holiday dress seems to be for those on the nice list, but ${his} weaponry is for those on the naughty list.`;
			break;
		case "a leotard":
			r += `${His} leotard and weapons make ${him} look like the heroine of an old exploitation film.`;
			break;
		case "a bunny outfit":
			r += `${His} bunny outfit and weapons make ${him} look like the hench${woman} of a villain from a cheesy vintage spy film.`;
			break;
		case "a slutty nurse outfit":
			r += `Between ${his} nurse outfit and ${his} weapons ${he} looks prepared to do harm, and then to heal it.`;
			break;
		case "a schoolgirl outfit":
			r += `This school${boy} is well armed, bringing to mind more than one farcical action film.`;
			break;
		case "a kimono":
			r += `${His} kimono has discreet cuts that allow ${him} to fight reasonably well in it if necessary, and are almost invisible when ${he} stands straight.`;
			break;
		case "a slutty qipao":
			r += `${His} qipao and weapons make ${him} look like a character from a fighting game.`;
			break;
		case "a toga":
			r += `${His} toga and weapons make a stark contrast, making ${him} stand out a lot.`;
			break;
		case "a huipil":
			r += `${His} huipil hides most of the weapons ${he} carries, but carrying them on naked skin is a slight discomfort.`;
			break;
		case "a hijab and abaya":
		case "a niqab and abaya":
			r += `${His} weapons are strapped to the outside of ${his} abaya, a juxtaposition that would be more ludicrous had not many women in the Middle East recently been seen fighting dressed in just this way.`;
			break;
		case "a burqa":
			r += `${His} weapons are strapped to the outside of ${his} burqa, a juxtaposition that would be more ludicrous had not some women in the Middle East recently been seen fighting dressed in just this way.`;
			break;
		case "a klan robe":
		case "a slutty klan robe":
			r += `${His} weapons are strapped to the outside of ${his} robe, all the essentials are present, mainly rope.`;
			break;
		case "battledress":
			r += `Though ${his} battledress top is just a tank top, ${he} still skirts the edge of looking more like a Free Cities mercenary than a Free Cities sex slave.`;
			break;
		case "slutty jewelry":
			r += `The bangles ${he}'s wearing are complemented by the straps that mount ${his} weapons to ${his} otherwise naked body.`;
			break;
		case "a courtesan dress":
			r += `${He} may look unarmed, but ${his} layered skirt and hanging sleeves perfectly conceal ${his} arsenal.`;
			break;
		case "a bimbo outfit":
			r += `${His} lacy lingerie and barely there clothing contrasts with ${his} deadly weaponry.`;
			break;
		case "a tube top and thong":
		case "a button-up shirt and panties":
		case "a bra":
		case "a button-up shirt":
		case "a sweater":
		case "a tank-top":
		case "a thong":
		case "a tube top":
		case "a striped bra":
		case "a skimpy loincloth":
		case "a sports bra":
			r += `Due to the skimpiness of ${his} outfit, ${he} appears to be wearing more weapons than clothing.`;
			break;
		case "a sweater and panties":
		case "a sweater and cutoffs":
		case "a t-shirt and jeans":
		case "a t-shirt and panties":
		case "a t-shirt and thong":
		case "a t-shirt":
		case "a tank-top and panties":
		case "an oversized t-shirt and boyshorts":
		case "an oversized t-shirt":
		case "boyshorts":
		case "cutoffs":
		case "jeans":
		case "leather pants and a tube top":
		case "leather pants and pasties":
		case "leather pants":
		case "panties and pasties":
		case "panties":
		case "pasties":
		case "sport shorts and a sports bra":
		case "sport shorts and a t-shirt":
		case "sport shorts":
		case "striped underwear":
			r += `${His} weapons only accentuate the nakedness of ${his} body.`;
			break;
		default:
			if (slave.chastityVagina || slave.chastityAnus) {
				r += `${His} chastity belt covers and protects ${him}, just as ${his} weapons cover and protect you.`;
			} else if (slave.chastityPenis === 1) {
				r += `${His} chastity cage covers and protects ${him}, just as ${his} weapons cover and protect you.`;
			} else {
				r += `${He} is nude except for ${his} armament.`;
			}
			break;
	}
	return r;
};
