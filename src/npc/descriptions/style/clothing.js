// cSpell:ignore furisode

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.clothing = function(slave) {
	const r = [];
	const {
		he, him, his, He, His
	} = getPronouns(slave);

	if (!hasAnyQuadrupedLimbs(slave)) {
		const feet = hasBothLegs(slave) ? "feet" : "foot";

		r.push(`${slave.slaveName} is wearing ${slave.clothes},`);
		const clothing = App.Data.clothes.get(slave.clothes);
		if (clothing && clothing.desc && "summary" in clothing.desc) {
			r.push(clothing.desc.summary(slave));
		} else {
			switch (slave.clothes) {
				case "a Fuckdoll suit":
					r.push(`an advanced slave garment designed for permanent wear. The suit's inhabitant is protected, cooled, dosed, and subject to total control. It also eliminates all sensory stimulation other than orders passed by the suit's systems and objects inserted into the Fuckdoll's`);
					if (slave.vagina > -1) {
						r.push(`face, front, and rear holes.`);
					} else {
						r.push(`face and lower holes.`);
					}
					break;
				case "conservative clothing":
					r.push(`including`);
					if (hasAnyLegs(slave)) {
						r.push(`nice slacks, a pretty silk blouse, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`a pretty silk blouse.`);
					}
					break;
				case "chains":
					r.push(`looped tightly around ${his} body wherever they can make ${his} most uncomfortable.`);
					if (hasAnyLegs(slave)) {
						r.push(`On ${his} ${feet}, ${he}'s wearing`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "Western clothing":
					r.push(`including a flannel`);
					if (hasAnyLegs(slave)) {
						r.push(`shirt, chaps, a cowboy hat, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`shirt and a cowboy hat.`);
					}
					break;
				case "body oil":
					r.push(`rubbed into every`);
					if (V.showInches === 2) {
						r.push(`inch`);
					} else {
						r.push(`centimeter`);
					}
					r.push(`of exposed skin to show off ${his} body.`);
					if (hasAnyLegs(slave)) {
						r.push(`${He}'s wearing`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "a toga":
					r.push(`made of sturdy white linen, appropriate for a female sex`);
					if (hasAnyLegs(slave)) {
						r.push(`worker, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`worker.`);
					}
					break;
				case "a huipil":
				case "a slutty qipao":
					r.push(`made of beautiful`);
					if (hasAnyLegs(slave)) {
						r.push(`silk, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`silk.`);
					}
					break;
				case "spats and a tank top":
					r.push(`including`);
					if (hasAnyLegs(slave)) {
						r.push(`a comfortable top along with form fitting shorts and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`a comfortable top.`);
					}
					break;
				case "uncomfortable straps":
					r.push(`which are in the shape of sturdy lingerie, except that wherever the straps cross a nipple or a hole, there is a steel ring to permit access.`);
					if (hasAnyLegs(slave)) {
						r.push(`${He} is bound by`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "shibari ropes":
					r.push(`bound tightly around ${his} body.`);
					if (hasAnyLegs(slave)) {
						r.push(`${He} is bound by`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "restrictive latex":
					r.push(`which covers everything except ${his} mouth, breasts, and genitals.`);
					if (hasAnyLegs(slave)) {
						r.push(`Even lower down, ${he} is squeezed by`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "a latex catsuit":
					r.push(`shiny and supple latex hugging every`);
					if (V.showInches === 2) {
						r.push(`inch`);
					} else {
						r.push(`centimeter`);
					}
					r.push(`of ${his} body below the neck.`);
					if (hasAnyLegs(slave)) {
						r.push(`${His} latex enclosed ${hasBothLegs(slave) ? "feet fit" : "foot fits"} snugly into`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "attractive lingerie":
					r.push(`including a lovely bra with holes for ${his} nipples to poke through, a pretty g-string,`);
					if (hasAnyLegs(slave)) {
						r.push(`sheer stockings, and a garter belt.`);
						if (slave.vagina === 0) {
							r.push(`${His} lingerie is virgin white,`);
						} else if ((slave.vagina === -1) && (slave.anus === 0)) {
							r.push(`${His} lingerie is white, since ${he} has a virgin asspussy,`);
						} else if ((slave.fetish === "dom") || (slave.fetish === "sadist")) {
							r.push(`${He}'s gone with black lingerie to look a bit more intimidating,`);
						} else if (slave.hormoneBalance < 0) {
							r.push(`${He}'s gone with blue lingerie for some reason,`);
						} else if ((slave.dick > 0) && (slave.balls === 0)) {
							r.push(`The lingerie is girly pink,`);
						} else {
							r.push(`The lingerie is ${slave.hColor} to match ${his} hair,`);
						}
						r.push(`and ${he}'s wearing`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`and a garter belt.`);
						if (slave.vagina === 0) {
							r.push(`${His} lingerie is virgin white.`);
						} else if ((slave.vagina === -1) && (slave.anus === 0)) {
							r.push(`${His} lingerie is white, since ${he} has a virgin asspussy.`);
						} else if ((slave.fetish === "dom") || (slave.fetish === "sadist")) {
							r.push(`${He}'s gone with black lingerie to look a bit more intimidating.`);
						} else if (slave.hormoneBalance < 0) {
							r.push(`${He}'s gone with blue lingerie for some reason.`);
						} else if ((slave.dick > 0) && (slave.balls === 0)) {
							r.push(`The lingerie is girly pink.`);
						} else {
							r.push(`The lingerie is ${slave.hColor} to match ${his} hair.`);
						}
					}
					break;
				case "attractive lingerie for a pregnant woman":
					r.push(`including a lovely bra that becomes transparent when wet, a pretty pair of panties designed to easily break if their wearer decides to give birth in them, and a light silken vest that exposes ${his} stomach.`);
					if (slave.vagina === 0) {
						r.push(`${His} lingerie is the purest white, since ${he} is a pregnant virgin`);
					} else if ((slave.vagina === -1) && (slave.anus === 0)) {
						r.push(`${His} lingerie is white, since ${he} has a virgin asspussy`);
					} else if ((slave.fetish === "dom") || (slave.fetish === "sadist")) {
						r.push(`${He}'s gone with black lingerie to look a bit more intimidating`);
					} else if (slave.hormoneBalance < 0) {
						r.push(`${He}'s gone with blue lingerie for some reason`);
					} else if ((slave.dick > 0) && (slave.balls === 0)) {
						r.push(`The lingerie is girly pink`);
					} else {
						r.push(`The lingerie is ${slave.hColor} to match ${his} hair`);
					}
					if (hasAnyLegs(slave)) {
						r.push(r.pop() + `, and ${he}'s wearing`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(r.pop() + ".");
					}
					break;
				case "kitty lingerie":
					r.push(`consisting of a ruffled lace bra with a window shaped like a cat's head on the front and center,`);
					if (hasAnyLegs(slave)) {
						r.push(`a pair of silken panties tied with lace, with stylized cat ears in the front and a paw print on the back, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`and a pair of silken panties tied with lace, with stylized cat ears in the front and a paw print on the back.`);
					}
					break;
				case "a maternity dress":
					r.push(`including a long loose dress made to stretch with a low cut neck designed for easy breast`);
					if (hasAnyLegs(slave)) {
						r.push(`exposure, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`exposure.`);
					}
					break;
				case "stretch pants and a crop-top":
					r.push(`including`);
					if (hasAnyLegs(slave)) {
						r.push(`a tight, low-cut, midriff exposing crop-top, a pair of stretch pants, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`a tight, low-cut, midriff exposing crop-top and a legless pair of stretch pants to slip over ${his} limbless bottom.`);
					}
					break;
				case "a succubus outfit":
					if (hasAnyLegs(slave)) {
						r.push(`consisting of a short red leather corset, an even shorter skirt of the same material, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`consisting of a short red leather corset and an even shorter skirt of the same material.`);
					}
					break;
				case "a fallen nuns habit":
					r.push(`a kinky latex affair that manages to look enough like traditional religious garb to be thoroughly sacrilegious.`);
					if (hasAnyLegs(slave)) {
						r.push(`${He} is wearing`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "a chattel habit":
					r.push(`the revealing white and gold vestments of an ordained sex slave.`);
					if (hasAnyLegs(slave)) {
						r.push(`They include`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "a penitent nuns habit":
					r.push(`made of roughspun sackcloth designed to chafe the`);
					if (hasAnyLegs(slave)) {
						r.push(`wearer, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`wearer.`);
					}
					break;
				case "a string bikini":
					r.push(`which passes around ${his} nipples and`);
					if (slave.dick === 1) {
						r.push(`dick`);
					} else if (slave.vagina === -1) {
						r.push(`smooth groin`);
					} else {
						r.push(`pussy`);
					}
					r.push(`rather than covering`);
					if (hasAnyLegs(slave)) {
						r.push(`them, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`them.`);
					}
					break;
				case "a scalemail bikini":
					r.push(`with leather insides for`);
					if (hasAnyLegs(slave)) {
						r.push(`comfort, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`comfort.`);
					}
					break;
				case "striped panties":
					r.push(`a simple garment that hugs ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`body closely and comfortably, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						if (isAmputee(slave)) {
							r.push(`limbless`);
						}
						r.push(`body closely and comfortably.`);
					}
					break;
				case "a cheerleader outfit":
					if (isAmputee(slave)) {
						r.push(`which lacks holes for ${his} arms.`);
					} else if (!hasAnyArms(slave)) {
						r.push(`which lacks holes for ${his} arms, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`and`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "clubslut netting":
					if (
						(slave.nails === 2 || slave.nails === 7 || slave.nails === 9) &&
					(slave.makeup === 3 || slave.makeup === 6 || slave.makeup === 8)
					) {
						r.push(`${slave.hColor} to match ${his} monochrome style,`);
					} else if ((skinToneLevel(slave.skin) > 22)) {
						r.push(`in white to create a striking contrast with ${his} ${slave.skin} skin,`);
					} else if (slave.addict > 5) {
						r.push(`in the electric blue color of aphrodisiacs to signal ${he}'s down to fuck high,`);
					} else if ((slave.dick > 0) && canAchieveErection(slave)) {
						r.push(`in blue to signal that ${he} can get hard,`);
					} else {
						r.push(`in classic bubblegum pink,`);
					}
					if (isAmputee(slave)) {
						r.push(`and lacks arm or leg holes, so ${his} limbless torso is in a net.`);
					} else if (!hasAnyLegs(slave)) {
						r.push(`and lacks leg holes, so ${his} body is in a net.`);
					} else {
						r.push(`and`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "cutoffs and a t-shirt":
					r.push(`which has`);
					if (slave.fetish === "buttslut" && slave.fetishStrength > 95 && slave.fetishKnown === 1) {
						r.push(`"BUTTSLUT" across the front in capital letters.`);
					} else if (slave.fetish === "cumslut" && slave.fetishStrength > 95 && slave.fetishKnown === 1) {
						r.push(`"CUMSLUT" across the front in capital letters.`);
					} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 95 && slave.fetishKnown === 1) {
						r.push(`"SUB" on the front in capital letters.`);
					} else if (slave.fetish === "sadist" && slave.fetishStrength > 95 && slave.fetishKnown === 1) {
						r.push(`"AWFUL BITCH" on the front in capital letters.`);
					} else if (slave.fetish === "masochist" && slave.fetishStrength > 95 && slave.fetishKnown === 1) {
						r.push(`"PAINSLUT" on the front in capital letters.`);
					} else if ((slave.fetish === "dom") && (slave.fetishStrength > 95) && (slave.fetishKnown === 1)) {
						r.push(`"TOP" on the front in capital letters.`);
					} else if ((slave.fetish === "humiliation") && (slave.fetishStrength > 95) && (slave.fetishKnown === 1)) {
						r.push(`"SEX SLAVE" on the front in capital letters.`);
					} else if ((slave.fetish === "pregnancy") && (slave.fetishStrength > 95) && (slave.fetishKnown === 1)) {
						r.push(`"BREEDER" on the front in capital letters.`);
					} else if ((slave.fetish === "boobs") && (slave.fetishStrength > 95) && (slave.fetishKnown === 1)) {
						r.push(`"I <3 BOOBS" on the front in capital letters.`);
					} else if (slave.energy > 95) {
						r.push(`"Fuck me!" across the front in huge letters.`);
					} else if ((slave.dick === 0) && (slave.vagina === -1)) {
						r.push(`"NULL ASSWHORE" on the front in capital letters.`);
					} else if ((slave.dick > 0) && (slave.vagina > -1)) {
						r.push(`"HERMAPHRODITE" on the front in capital letters.`);
					} else if ((slave.dick > 0) && (slave.balls > 0)) {
						r.push(`"Sissy Slave" across the front in large letters.`);
					} else if (slave.dick > 0) {
						r.push(`"Orchi Bitch" across the front in large letters.`);
					} else if (slave.vagina === 0) {
						r.push(`"Virgin!" across the front in large letters.`);
					} else if (slave.anus === 0) {
						r.push(`"Anal Virgin!" across the front in large letters.`);
					} else if (slave.pregKnown === 1) {
						r.push(`"I'm Pregnant!" across the front in large letters.`);
					} else {
						r.push(`"Property of ${PlayerName()}" across the front.`);
					}
					if (hasAnyLegs(slave)) {
						r.push(`The look is completed by wearing`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "slutty business attire":
					r.push(`a suit jacket cut to show a great deal of`);
					if (hasAnyLegs(slave)) {
						r.push(`cleavage and a short skirt with`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`cleavage and a short skirt.`);
					}
					break;
				case "nice business attire":
					r.push(`a suit jacket and a nice`);
					if (hasAnyLegs(slave)) {
						r.push(`skirt with`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`skirt.`);
					}
					break;
				case "a ball gown":
					r.push(`a majestically grand silken dress for formal`);
					if (hasAnyLegs(slave)) {
						r.push(`occasions, stockings, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`occasions.`);
					}
					break;
				case "a halter top dress":
					r.push(`an extravagant garment showing off ${his} bare`);
					if (hasAnyLegs(slave)) {
						r.push(`back,`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`back.`);
					}
					break;
				case "an evening dress":
					r.push(`a fashionable, floor-length garment showing off ${his}`);
					if (slave.muscles > 30) {
						r.push('muscular');
					} else if (slave.muscles > 6) {
						r.push('toned');
					} else {
						r.push('bare');
					}
					r.push(`back and shoulders.`);
					if (hasAnyLegs(slave)) {
						r.push(`A long slit creeps up the length the dress exposing ${his} upper thigh. Peeking out from beneath the hem is`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "a mini dress":
					r.push(`a body hugging strapless number that shows as much skin as it`);
					if (hasAnyLegs(slave)) {
						r.push(`covers, paired with`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`covers.`);
					}
					break;
				case "a comfortable bodysuit":
					r.push(`which covers ${him} to the neck while displaying the shape of`);
					if (hasAnyLegs(slave)) {
						r.push(`everything, and seamlessly transitions down into`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`everything.`);
					}
					break;
				case "a leotard":
					r.push(`a sporty garment that hugs ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`body closely and comfortably, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						if (isAmputee(slave)) {
							r.push(`limbless`);
						}
						r.push(`body closely and comfortably.`);
					}
					break;
				case "a monokini":
					r.push(`a one-piece swimsuit that stops halfway up ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`torso, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						if (isAmputee(slave)) {
							r.push(`limbless`);
						}
						r.push(`torso.`);
					}
					break;
				case "an apron":
					r.push(`but is otherwise almost entirely`);
					if (hasAnyLegs(slave)) {
						r.push(`naked,`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`naked.`);
					}
					break;
				case "overalls":
					r.push(`but little`);
					if (hasAnyLegs(slave)) {
						r.push(`else,`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`else.`);
					}
					break;
				case "a cybersuit":
					r.push(`a form-fitting military bodysuit covering ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`face and torso, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`face and`);
						if (isAmputee(slave)) {
							r.push(`limbless`);
						}
						r.push(`torso.`);
					}
					break;
				case "a tight Imperial bodysuit":
					r.push(`a form-fitting cybernetic bodysuit, pulsating with various pieces of integrated technology and emblazoned with your Imperial crest over the chest, covering ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`face and torso, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`face and`);
						if (isAmputee(slave)) {
							r.push(`limbless`);
						}
						r.push(`torso.`);
					}
					break;
				case "battlearmor":
					r.push(`a form-fitting military armor covering ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`face and torso, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`face and`);
						if (isAmputee(slave)) {
							r.push(`limbless`);
						}
						r.push(`torso.`);
					}
					break;
				case "Imperial Plate":
					r.push(`an set of high-tech plated armor so heavy it makes ${him} look like a walking tank, emblazoned with your Imperial crest and covering ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`face, torso, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`face and`);
						if (isAmputee(slave)) {
							r.push(`limbless`);
						}
						r.push(`torso.`);
					}
					break;
				case "a bunny outfit":
					r.push(`a strapless satin teddy with a beribboned rosette over ${his} left hip, printed with ${his} name.`);
					if (hasAnyLegs(slave)) {
						r.push(`The ensemble includes sheer black hose ${he} wears with`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				case "a slutty maid outfit":
					r.push(`which includes a very short, dark dress, a white blouse,`);
					if (hasAnyLegs(slave)) {
						r.push(`an apron, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`and an apron.`);
					}
					break;
				case "a nice maid outfit":
					r.push(`which includes a dark dress, a white blouse,`);
					if (hasAnyLegs(slave)) {
						r.push(`an apron, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`and an apron.`);
					}
					break;
				case "a slutty nurse outfit":
					r.push(`which includes an immodest low cut white`);
					if (hasAnyLegs(slave)) {
						r.push(`jacket, a tight white miniskirt, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`jacket and a tight white miniskirt.`);
					}
					break;
				case "a nice nurse outfit":
					r.push(`which includes a plain white scrub`);
					if (hasAnyLegs(slave)) {
						r.push(`top, trousers, a stethoscope, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`top and trousers.`);
					}
					break;
				case "a schoolgirl outfit":
					r.push(`which includes a tight white`);
					if (hasAnyLegs(slave)) {
						r.push(`blouse, a short plaid skirt, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`blouse and a short plaid skirt.`);
					}
					break;
				case "a kimono":
					r.push(`of the furisode`);
					if (hasAnyLegs(slave)) {
						r.push(`pattern, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`pattern.`);
					}
					break;
				case "a dirndl":
				case "a long qipao":
				case "lederhosen":
				case "a biyelgee costume":
				case "a hanbok":
					r.push(`of a traditional`);
					if (hasAnyLegs(slave)) {
						r.push(`pattern, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`pattern.`);
					}
					break;
				case "a burkini":
					r.push(`consisting of a polyester tunic and`);
					if (hasAnyLegs(slave)) {
						r.push(`pants, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`pants, which have been tailored for ${his} leglessness.`);
					}
					break;
				case "a hijab and blouse":
					r.push(`alongside a short-sleeved overshirt and a skirt that`);
					if (hasAnyLegs(slave)) {
						r.push(`body, down to ${his} ${feet}, which`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`dangles uselessly off ${his}`);
						if (isAmputee(slave)) {
							r.push(`limbless`);
						} else {
							r.push(`legless`);
						}
						r.push(`torso.`);
					}
					break;
				case "a hijab and abaya":
				case "a niqab and abaya":
					r.push(`which modestly covers ${his} entire`);
					if (hasAnyLegs(slave)) {
						r.push(`body, down to ${his} ${feet}, which`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`body.`);
					}
					break;
				case "a klan robe":
					r.push(`which fully covers ${his} entire`);
					if (hasAnyLegs(slave)) {
						r.push(`body, down to ${his} ${feet}, which`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`body.`);
					}
					break;
				case "a burqa":
					r.push(`which restrictingly covers ${his} entire`);
					if (hasAnyLegs(slave)) {
						r.push(`body, down to ${his} ${feet}, which`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`body.`);
					}
					break;
				case "a police uniform":
					r.push(`of a traditional`);
					if (hasAnyLegs(slave)) {
						r.push(`styling, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`styling.`);
					}
					break;
				case "a gothic lolita dress":
					r.push(`of a Victorian`);
					if (hasAnyLegs(slave)) {
						r.push(`pattern, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`pattern.`);
					}
					break;
				case "a one-piece swimsuit":
					r.push(`which modestly covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`body, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`body.`);
					}
					break;
				case "a nice pony outfit":
				case "a slutty pony outfit":
					r.push(`which restrictingly covers ${his} entire`);
					if (hasAnyLegs(slave)) {
						r.push(`body, down to ${his} ${feet}, with`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`body.`);
					}
					break;
				case "a button-up shirt and panties":
				case "a button-up shirt":
				case "a sweater":
				case "a t-shirt":
				case "a tank-top":
				case "a tube top":
				case "an oversized t-shirt":
					r.push(`which only covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`torso, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`torso.`);
					}
					break;
				case "a bra":
				case "a sports bra":
				case "a striped bra":
				case "pasties":
					r.push(`which only covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`breasts, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`breasts.`);
					}
					break;
				case "a tube top and thong":
				case "a sweater and panties":
				case "a slutty klan robe":
				case "a tank-top and panties":
				case "a t-shirt and thong":
				case "an oversized t-shirt and boyshorts":
				case "sport shorts and a t-shirt":
				case "sport shorts and a sports bra":
				case "a t-shirt and panties":
					r.push(`which only covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`torso, crotch, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`torso and crotch.`);
					}
					break;
				case "striped underwear":
					r.push(`which only covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`breasts, crotch, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`breasts and crotch.`);
					}
					break;
				case "a thong":
				case "a skimpy loincloth":
				case "boyshorts":
					r.push(`which only covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`crotch, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`crotch.`);
					}
					break;
				case "panties":
				case "panties and pasties":
					r.push(`which only cover ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`crotch, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`crotch.`);
					}
					break;
				case "cutoffs":
				case "sport shorts":
					r.push(`which only cover ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`crotch, ass, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`crotch and ass.`);
					}
					break;
				case "a sweater and cutoffs":
					r.push(`which only covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`torso, crotch, ass, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`torso, crotch, and ass.`);
					}
					break;
				case "leather pants and a tube top":
				case "a t-shirt and jeans":
					r.push(`which only covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`torso, ass, legs, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`torso and ass.`);
					}
					break;
				case "leather pants and pasties":
				case "leather pants":
				case "jeans":
					r.push(`which only covers ${his}`);
					if (hasAnyLegs(slave)) {
						r.push(`legs, ass, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`ass.`);
					}
					break;
				case "a military uniform":
					r.push(`consisting of a shirt and tie, military`);
					if (hasAnyLegs(slave)) {
						r.push(`tunic, matching skirt, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`tunic, and matching skirt.`);
					}
					r.push(`${His} uniform is pinned with the`);
					if (slave.ID === V.BodyguardID || slave.ID === V.HeadGirlID || slave.ID === V.RecruiterID || slave.ID === V.ConcubineID) {
						r.push(`golden whip and manacles insignia of a senior slave officer,`);
					} else if ((slave.ID === V.MadamID) || (slave.ID === V.NurseID) || (slave.ID === V.AttendantID) || (slave.ID === V.MatronID) || (slave.ID === V.djID) || (slave.ID === V.MilkmaidID) || (slave.ID === V.FarmerID) || (slave.ID === V.StewardessID) || (slave.ID === V.SchoolteacherID) || (slave.ID === V.WardenessID)) {
						r.push(`golden manacles insignia of a junior slave officer,`);
					} else if ((slave.skill.combat > 60) && getLimbCount(slave, 105) > 0) {
						r.push(`silver spear and manacles insignia of an augmented slave soldier,`);
					} else if ((slave.skill.combat > 60) && !isAmputee(slave)) {
						r.push(`silver manacles insignia of a slave soldier,`);
					} else {
						r.push(`black iron manacles insignia of a slave,`);
					}
					r.push(`along with various ribbons denoting sexual aptitude and prized traits.`);
					break;
				case "a schutzstaffel uniform":
					r.push(`consisting of a shirt and tie, military`);
					if (hasAnyLegs(slave)) {
						r.push(`tunic, matching trousers, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`tunic, and matching trousers.`);
					}
					r.push(`${His} uniform is pinned with the`);
					if (slave.ID === V.BodyguardID || slave.ID === V.HeadGirlID || slave.ID === V.RecruiterID || slave.ID === V.ConcubineID) {
						r.push(`golden whip and manacles insignia of a senior slave officer,`);
					} else if ((slave.ID === V.MadamID) || (slave.ID === V.NurseID) || (slave.ID === V.AttendantID) || (slave.ID === V.MatronID) || (slave.ID === V.djID) || (slave.ID === V.MilkmaidID) || (slave.ID === V.FarmerID) || (slave.ID === V.StewardessID) || (slave.ID === V.SchoolteacherID) || (slave.ID === V.WardenessID)) {
						r.push(`golden manacles insignia of a junior slave officer,`);
					} else if ((slave.skill.combat > 60) && getLimbCount(slave, 105) > 0) {
						r.push(`silver spear and manacles insignia of an augmented slave soldier,`);
					} else if ((slave.skill.combat > 60) && !isAmputee(slave)) {
						r.push(`silver manacles insignia of a slave soldier,`);
					} else {
						r.push(`black iron manacles insignia of a slave,`);
					}
					r.push(`along with various ribbons denoting sexual aptitude and prized traits.`);
					break;
				case "a slutty schutzstaffel uniform":
					r.push(`consisting of a shirt and tie, military`);
					if (hasAnyLegs(slave)) {
						r.push(`tunic, matching miniskirt, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`tunic, and matching miniskirt.`);
					}
					r.push(`${His} uniform is pinned with the`);
					if ((slave.ID === V.BodyguardID) || (slave.ID === V.HeadGirlID) || (slave.ID === V.RecruiterID) || (slave.ID === V.ConcubineID)) {
						r.push(`golden whip and manacles insignia of a senior slave officer,`);
					} else if ((slave.ID === V.MadamID) || (slave.ID === V.NurseID) || (slave.ID === V.AttendantID) || (slave.ID === V.MatronID) || (slave.ID === V.djID) || (slave.ID === V.MilkmaidID) || (slave.ID === V.FarmerID) || (slave.ID === V.StewardessID) || (slave.ID === V.SchoolteacherID) || (slave.ID === V.WardenessID)) {
						r.push(`golden manacles insignia of a junior slave officer,`);
					} else if ((slave.skill.combat > 60) && getLimbCount(slave, 105) > 0) {
						r.push(`silver spear and manacles insignia of an augmented slave soldier,`);
					} else if ((slave.skill.combat > 60) && !isAmputee(slave)) {
						r.push(`silver manacles insignia of a slave soldier,`);
					} else {
						r.push(`black iron manacles insignia of a slave,`);
					}
					r.push(`along with various ribbons denoting sexual aptitude and prized traits.`);
					break;
				case "a red army uniform":
					r.push(`consisting of a shirt and tie, military`);
					if (hasAnyLegs(slave)) {
						r.push(`tunic, matching skirt, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`tunic, and matching skirt.`);
					}
					r.push(`${His} uniform is pinned with the`);
					if ((slave.ID === V.BodyguardID) || (slave.ID === V.HeadGirlID) || (slave.ID === V.RecruiterID) || (slave.ID === V.ConcubineID)) {
						r.push(`golden whip and manacles insignia of a senior slave officer,`);
					} else if ((slave.ID === V.MadamID) || (slave.ID === V.NurseID) || (slave.ID === V.AttendantID) || (slave.ID === V.MatronID) || (slave.ID === V.djID) || (slave.ID === V.MilkmaidID) || (slave.ID === V.FarmerID) || (slave.ID === V.StewardessID) || (slave.ID === V.SchoolteacherID) || (slave.ID === V.WardenessID)) {
						r.push(`golden manacles insignia of a junior slave officer,`);
					} else if ((slave.skill.combat > 60) && getLimbCount(slave, 105) > 0) {
						r.push(`silver spear and manacles insignia of an augmented slave soldier,`);
					} else if ((slave.skill.combat > 60) && !isAmputee(slave)) {
						r.push(`silver manacles insignia of a slave soldier,`);
					} else {
						r.push(`black iron manacles insignia of a slave,`);
					}
					r.push(`along with various ribbons denoting sexual aptitude and prized traits.`);
					break;
				case "a confederate army uniform":
					r.push(`consisting of a shirt, single breasted military shell jacket, frock coat, `);
					if (hasAnyLegs(slave)) {
						r.push(`matching trousers all in a blue-gray tone, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`and matching trousers all in a blue-gray tone.`);
					}
					r.push(`The collar of ${his} jacket is`);
					if ((slave.ID === V.BodyguardID) || (slave.ID === V.HeadGirlID) || (slave.ID === V.RecruiterID) || (slave.ID === V.ConcubineID)) {
						r.push(`pinned with a golden wreath partially encompassing a golden whip and manacles, the insignia of a senior slave officer.`);
					} else if ((slave.ID === V.MadamID) || (slave.ID === V.NurseID) || (slave.ID === V.AttendantID) || (slave.ID === V.MatronID) || (slave.ID === V.djID) || (slave.ID === V.MilkmaidID) || (slave.ID === V.FarmerID) || (slave.ID === V.StewardessID) || (slave.ID === V.SchoolteacherID) || (slave.ID === V.WardenessID)) {
						r.push(`pinned with golden whip and manacles, the insignia of a slave officer.`);
					} else if (slave.trust > 50 || slave.devotion > 50) {
						r.push(`pinned with golden manacles, the insignia of a junior slave officer.`);
					} else {
						r.push(`unadorned, indicating a slave's lack of experience or trustworthiness.`);
					}
					r.push(`${His} jacket sleeve is`);
					if ((slave.skill.combat > 60) && getLimbCount(slave, 105) > 0) {
						r.push(`pinned with two black chevrons, the insignia of an augmented slave soldier as well as`);
					} else if ((slave.skill.combat > 60) && !isAmputee(slave)) {
						r.push(`pinned with a single black chevron, the insignia of a slave soldier as well as`);
					} else {
						r.push(`undecorated, aside from`);
					}
					r.push(`various ribbons denoting sexual aptitude and prized traits.`);
					break;
				case "battledress":
					r.push(`including comfortable fatigue`);
					if (hasAnyLegs(slave)) {
						r.push(`pants, a sturdy tank top and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`pants (pinned over ${his} stumps) and a sturdy tank top.`);
					}
					break;
				case "a mounty outfit":
					r.push(`including comfortable`);
					if (hasAnyLegs(slave)) {
						r.push(`slacks, a sturdy tunic and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`slacks (pinned over ${his} stumps) and a sturdy tunic.`);
					}
					break;
				case "harem gauze":
					if (hasAnyLegs(slave)) {
						r.push(`flowing down to almost conceal`);
						r.push(App.Desc.footwear(slave));
					}
					r.push(`${He}'s covered and even veiled, but you can see everything straight through the filmy cloth.`);
					break;
				case "slutty jewelry":
					r.push(`including a belt of thin chain with a lewd ornament (a little`);
					if (slave.dick > 0 && slave.balls === 0) {
						r.push(`curved golden cock without balls)`);
					} else if (slave.dick > 0) {
						r.push(`golden cock and balls)`);
					} else if ((slave.fetish === "cumslut") && (slave.fetishStrength > 95)) {
						r.push(`pair of golden lips)`);
					} else if (slave.boobs > 1000) {
						r.push(`pair of golden breasts)`);
					} else if (slave.vagina === -1) {
						r.push(`crinkled anus)`);
					} else {
						r.push(`golden pussy)`);
					}
					r.push(`over ${his} stomach.`);
					if (hasAnyLegs(slave)) {
						r.push(`${He} is wearing bangles which`);
						r.push(App.Desc.footwear(slave));
					}
					r.push(App.Desc.piercing(slave, "chastity"));
					break;
				case "a Santa dress":
					r.push(`made of red felt with white fur`);
					if (hasAnyLegs(slave)) {
						r.push(`trim, a leather belt, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`trim and a leather belt.`);
					}
					break;
				case "a bimbo outfit":
					r.push(`consisting of a top and miniskirt that completely expose ${his} bra and`);
					if (hasAnyLegs(slave)) {
						r.push(`thong, and`);
						r.push(App.Desc.footwear(slave));
					} else {
						r.push(`thong.`);
					}

					break;
				case "a courtesan dress":
					r.push(`with exposed shoulders,`);
					if (hasAnyArms(slave)) {
						r.push(`flowing sleeves,`);
					}
					r.push(`built-in corset and an elegant, layered skirt that evokes the feeling of a flower ready to blossom.`);
					if (hasAnyLegs(slave)) {
						r.push(`${He} is`);
						r.push(App.Desc.footwear(slave));
					}
					break;
				default:
					r.push(`so ${his} nude body is on display.`);
					if (isAmputee(slave)) {
						r.push(`In fact, ${he}'s devoid even of limbs.`);
					} else if (hasAnyLegs(slave)) {
						r.push(`${He} is wearing`);
						r.push(App.Desc.footwear(slave));
					}
			}
		}
	}
	return r.join(" ");
};
