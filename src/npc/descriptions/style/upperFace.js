/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.upperFace = function(slave) {
	const r = [];
	const {
		he, him, his, He, His
	} = getPronouns(slave);
	if (slave.fuckdoll === 0) {
		switch (slave.clothes) {
			case "restrictive latex":
				r.push(`The upper half of ${his} face is covered by the hood of ${his} latex suit: though`);
				if (canSee(slave)) {
					r.push(`${he} can see through eye-holes, these can easily be closed to blind ${him}.`);
				} else {
					r.push(`there are eye-holes, they are currently closed due to their lack of use.`);
				}
				break;
			case "harem gauze":
				r.push(`${His} harem outfit includes the traditional veil for ${his} face.`);
				break;
			case "a burkini":
				r.push(`Above ${his} shoulders, ${his} burkini leaves only ${his} face bare.`);
				break;
			case "a hijab and blouse":
				r.push(`Above the shoulders of ${his} blouse, ${his} hijab leaves only ${his} face bare.`);
				break;
			case "a hijab and abaya":
				r.push(`Above the shoulders of ${his} abaya, ${his} hijab leaves only ${his} face bare.`);
				break;
			case "a niqab and abaya":
				r.push(`Above the shoulders of ${his} abaya, ${his} niqab leaves only the area around ${his} eyes bare.`);
				break;
			case "a klan robe":
			case "a slutty klan robe":
				r.push(`Above the shoulders of ${his} robe, ${his} hood leaves only the area around ${his} eyes bare.`);
				break;
			case "a burqa":
				r.push(`${His} burqa near totally covers ${his} face, aside from what can be seen behind the fabric mesh that covers ${his} eyes.`);
				break;
			case "a chattel habit":
				r.push(`A golden circlet crowns ${his} white cowl, securing ${his} habit to ${his} head.`);
				break;
			case "a succubus outfit":
				r.push(`${He} has a pair of false horns sprouting from just behind ${his} hairline and sweeping backward, which are anchored to a wire headband hidden by ${his} hair.`);
				break;
			case "a bunny outfit":
				r.push(`A pair of bunny ears sprout from a headband atop ${his} head.`);
				break;
		}
		if (slave.eyewear === "corrective glasses" || slave.eyewear === "blurring glasses" || slave.eyewear === "glasses") {
			r.push(`${He}'s wearing a pair of`);
			const clothing = App.Data.clothes.get(slave.clothes);
			if (clothing && clothing.desc && "upperFace" in clothing.desc) {
				r.push(clothing.desc.upperFace(slave));
			} else {
				switch (slave.clothes) {
					case "chains":
					case "shibari ropes":
					case "uncomfortable straps":
					case "a chattel habit":
					case "overalls":
					case "Western clothing":
						r.push(`sturdy glasses,`);
						break;
					case "restrictive latex":
						r.push(`glasses over the hood,`);
						break;
					case "a ball gown":
					case "conservative clothing":
					case "cutoffs and a t-shirt":
					case "a halter top dress":
					case "a maternity dress":
					case "a courtesan dress":
						r.push(`nice frameless glasses,`);
						break;
					case "body oil":
						r.push(`big retro glasses,`);
						break;
					case "slutty business attire":
						r.push(`horn-rimmed glasses to accent ${his} business attire,`);
						break;
					case "a schoolgirl outfit":
						r.push(`horn-rimmed glasses to improve ${his} schoolgirl look,`);
						break;
					case "nice business attire":
						r.push(`wire-frame glasses to accent ${his} business attire,`);
						break;
					case "attractive lingerie":
					case "attractive lingerie for a pregnant woman":
					case "an apron":
					case "a hijab and blouse":
						r.push(`feminine glasses,`);
						break;
					case "kitty lingerie":
						r.push(`cat-eye glasses,`);
						break;
					case "a succubus outfit":
						r.push(`severe steel-frame glasses,`);
						break;
					case "harem gauze":
					case "slutty jewelry":
						r.push(`glasses with golden wire frames,`);
						break;
					case "a burqa":
					case "a niqab and abaya":
					case "a penitent nuns habit":
					case "a klan robe":
					case "a slutty klan robe":
						r.push(`cheap glasses,`);
						break;
					case "a gothic lolita dress":
						r.push(`Victorian-styled glasses,`);
						break;
					case "a hanbok":
						r.push(`folding spectacle glasses,`);
						break;
					case "a police uniform":
						r.push(`aviator sunglasses,`);
						break;
					case "a Santa dress":
						r.push(`antique reading glasses,`);
						break;
					case "a bunny outfit":
					case "a monokini":
						r.push(`girly retro glasses,`);
						break;
					case "a hijab and abaya":
					case "a huipil":
					case "a kimono":
					case "a long qipao":
					case "a nice maid outfit":
					case "a slutty qipao":
					case "a slutty maid outfit":
						r.push(`an old fashioned pair of horn rimmed glasses,`);
						break;
					case "a fallen nuns habit":
					case "a cheerleader outfit":
					case "a slutty nurse outfit":
						r.push(`a daring pair of horn rimmed glasses,`);
						break;
					case "clubslut netting":
					case "a string bikini":
					case "striped panties":
					case "a bimbo outfit":
						r.push(`a pair of girly pastel glasses,`);
						break;
					case "a scalemail bikini":
						r.push(`a pair of ancient-looking glasses,`);
						break;
					case "a burkini":
					case "a one-piece swimsuit":
						r.push(`swim goggles,`);
						break;
					default:
						r.push(`simple wire-frame glasses,`);
				}
			}
			if (getBestVision(slave) === 0) {
				r.push(`which, since ${he} is <span class="red">blind,</span> are just for show. ${He} moves carefully as to not bump into things.`);
			} else {
				if (slave.eyewear === "blurring glasses") {
					if (anyVisionEquals(slave, 2)) {
						r.push(`which are designed to blur ${his} vision, making ${him} clumsy.`);
					} else {
						r.push(`which do nothing to help ${his} <span class="yellow">nearsightedness</span> and consequent clumsiness.`);
					}
				} else if (slave.eyewear === "corrective glasses") {
					if (anyVisionEquals(slave, 1)) {
						r.push(`which correct ${his} vision.`);
					} else {
						r.push(`which are just for show.`);
					}
				} else {
					r.push(`which are just for show.`);
				}
			}
		} else {
			if (!canSee(slave)) {
				r.push(`${He} is <span class="red">blind,</span> and moves very carefully as a result.`);
			} else if (!canSeePerfectly(slave)) {
				if (slave.eyewear === "blurring contacts") {
					r.push(`${He}'s wearing contacts designed to blur ${his} vision, making ${him} clumsy.`);
				} else {
					r.push(`${He}'s <span class="yellow">nearsighted,</span> and a bit clumsy as a result.`);
				}
			} else {
				if (slave.eyewear === "corrective contacts") {
					r.push(`${He}'s wearing contact lenses to correct ${his} <span class="yellow">nearsightedness.</span>`);
				}
			}
		}

		if (slave.earwear === "hearing aids" || slave.earwear === "muffling ear plugs" || slave.earwear === "deafening ear plugs") {
			r.push(`In ${his} ears, ${he} wears`);
			if (slave.earwear === "hearing aids") {
				r.push(`a pair of hearing aids,`);
				if (slave.hears > -1) {
					r.push(`which do little to correct ${his} already adequate hearing.`);
				} else if (slave.hears === -1) {
					r.push(`which are used to correct ${his} <span class="yellow">hearing impairment.</span>`);
				} else if (slave.hears < -1) {
					r.push(`which, due to ${his} <span class="red">deafness,</span> are useless.`);
				}
			} else if (slave.earwear === "muffling ear plugs") {
				r.push(`a pair of small foam ear plugs,`);
				if (slave.hears > -1) {
					r.push(`which noticeably <span class="yellow">muffle ${his} hearing.</span>`);
				} else if (slave.hears === -1) {
					r.push(`which are pointless, as ${he} is already <span class="yellow">hard of hearing.</span>`);
				} else if (slave.hears < -1) {
					r.push(`which are pointless, as ${he} is totally <span class="red">deaf.</span>`);
				}
			} else if (slave.earwear === "deafening ear plugs") {
				r.push(`a pair of large silicone ear plugs,`);
				if (slave.hears > -1) {
					r.push(`which <span class="red">nullify ${his} sense of hearing.</span>`);
				} else if (slave.hears === -1) {
					r.push(`which impair ${his} hearing to the point of <span class="red">deafness.</span>`);
				} else if (slave.hears < -1) {
					r.push(`which are pointless, as ${he} is already <span class="red">deaf.</span>`);
				}
			}
		} else {
			if (slave.hears === -1) {
				r.push(`${He}'s <span class="yellow">hard of hearing,</span> and a bit nervous as a result.`);
			} else if (slave.hears < -1) {
				r.push(`${He} is <span class="red">deaf,</span> and overly paranoid as a result.`);
			}
		}
	} else {
		r.push(`${His} face is featurelessly obscured by the Fuckdoll suit from the top of ${his} head down to ${his} face hole.`);
	}

	return r.join(" ");
};
