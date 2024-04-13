/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.hairClothing = function(slave) {
	const r = [];
	const {
		he, him, his
	} = getPronouns(slave);

	if (slave.fuckdoll === 0) {
		const clothing = App.Data.clothes.get(slave.clothes);
		if (clothing && clothing.desc && "hStyle" in clothing.desc) {
			r.push(clothing.desc.hStyle(slave));
		} else {
			switch (slave.hStyle) {
				case "neat":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "chains":
								r.push(`is caught painfully in ${his} chains here and there.`);
								break;
							case "body oil":
								r.push(`rampages down ${his} back in the glorious feathering of an 80's perm.`);
								break;
							case "a slutty qipao":
								r.push(`cascades down ${his} back, ornamented with little silver talismans here and there.`);
								break;
							case "a huipil":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "restrictive latex":
								r.push(`is allowed a gap at the back of ${his} head so it can escape to cascade down ${his} back.`);
								break;
							case "harem gauze":
								r.push(`cascades down ${his} back, covered by a flimsy hairnet.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`cascades gorgeously down ${his} bare back.`);
								break;
							case "a courtesan dress":
								r.push(`cascades elegantly down ${his} back.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`cascades elegantly down ${his} back, kept sensibly in place by a set of ivory hairpins.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
							case "pasties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is long and loose, but is decorated with little black bows here and there.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`is kept out of ${his} face by a couple of gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is kept out of ${his} face by a pastel-colored headband.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`cascades out from under a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`cascades out from under a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`flows back in a mane, with a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is topped by a gold headband, and flows back in a mane.`);
								break;
							case "kitty lingerie":
								r.push(`is topped by a cat ear headband, and cascades almost to the ground.`);
								break;
							default:
								r.push(`cascades almost to the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "body oil":
								r.push(`is in a big, classic 80's perm.`);
								break;
							case "a slutty qipao":
								r.push(`is brushed back over ${his} shoulders, ornamented with little silver talismans here and there.`);
								break;
							case "a huipil":
								r.push(`flows down ${his} shoulders, giving ${him} a very innocent look.`);
								break;
							case "restrictive latex":
								r.push(`is allowed a gap at the back of ${his} head so it can escape down ${his} back.`);
								break;
							case "harem gauze":
								r.push(`flows down ${his} back, covered by a flimsy hairnet.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`flows fashionably down ${his} bare back.`);
								break;
							case "a courtesan dress":
								r.push(`flows elegantly down ${his} back.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`flows elegantly down ${his} back, kept sensibly in place by a set of ivory hairpins.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is decorated with a little black bow in back.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`is kept out of ${his} face by a couple of gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is kept out of ${his} face by a pastel-colored headband.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`flows out from under a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`flows out from under a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is tucked back by a flower, tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is brushed back over ${his} shoulders, and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is brushed back over ${his} shoulders.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "body oil":
								r.push(`is in a classic 80's perm.`);
								break;
							case "a slutty qipao":
								r.push(`is brushed back and ornamented with a little jade talisman.`);
								break;
							case "a huipil":
								r.push(`is short and neat, giving ${him} an innocent look.`);
								break;
							case "a latex catsuit":
							case "restrictive latex":
								r.push(`is crammed under ${his} latex hood.`);
								break;
							case "harem gauze":
								r.push(`is covered by a flimsy hairnet.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`follows the latest fashion.`);
								break;
							case "a courtesan dress":
								r.push(`is meticulously brushed.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is kept sensibly in place by a set of ivory hairpins.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is decorated with a little black bow in back.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is kept out of ${his} face by simple barrette.`);
								break;
							case "slutty business attire":
								r.push(`is kept out of ${his} face by a gaudy golden barrette.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is kept out of ${his} face by a sturdy hairpin.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is kept out of ${his} face by a pastel-colored headband.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is topped by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is topped by a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`bears a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is brushed back and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is brushed back.`);
						}
					} else {
						switch (slave.clothes) {
							case "body oil":
								r.push(`is in a classic 80's perm.`);
								break;
							case "restrictive latex":
								r.push(`fits under ${his} latex hood.`);
								break;
							case "harem gauze":
								r.push(`is covered by a flimsy hairnet.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is gelled into a fashionable wave.`);
								break;
							case "a courtesan dress":
								r.push(`is meticulously brushed.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`rustles freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is parted on the side.`);
								break;
							case "slutty business attire":
								r.push(`is parted in the middle.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is in a utilitarian cut.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is hidden by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is hidden by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is hidden by a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
							case "a long qipao":
							case "a dirndl":
							case "lederhosen":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is short, and ${he} has a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is short, and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is neatly brushed and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is neatly brushed.`);
						}
					}
					break;
				case "up":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "chains":
								r.push(`is pulled painfully back into a long tail, which is secured to ${his} chains at ${his} torso and ${his} ass.`);
								break;
							case "body oil":
								r.push(`is in an 80's perm and back in a scrunchy, from which it explodes backwards with 80's violence.`);
								break;
							case "a slutty qipao":
								r.push(`is in a perfect bun, secured with a jade comb; ${his} bun is so large it forms an artful arrangement down to the nape of ${his} neck.`);
								break;
							case "a huipil":
								r.push(`is twisted into two horns that rest on top of ${his} head, the rest is bulked on the back of ${his} neck.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is in a perfect bun, secured with an ivory comb; ${his} bun is so large it forms an artful arrangement down to the nape of ${his} neck.`);
								break;
							case "a courtesan dress":
								r.push(`is in a perfect bun.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of the latex hood in a huge bun.`);
								break;
							case "harem gauze":
								r.push(`is piled up on ${his} head in a huge beehive, itself veiled.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is piled up on ${his} head in a perfect 60's beehive.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering, though it's obvious ${he} has a huge mass of hair restrained under there.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood, though it's evident ${he} has a huge mass of hair restrained under there.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is back in a huge bun, and topped with a little maid's cap.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is back in a huge bun, so severe it pulls at ${his} temples a little.`);
								break;
							case "slutty business attire":
								r.push(`is pinned back in a hasty bun.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is pulled hard back into a big bun held in place with paracord.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
								r.push(`is in a huge bun secured by a pastel scrunchy.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is back in a huge bun and topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is back in a bun so huge it pushes ${his} cowboy hat forward at a rakish angle.`);
								break;
							case "a Santa dress":
								r.push(`is back in a bun so huge it pushes ${his} festive hat forward at a rakish angle.`);
								break;
							case "kitty lingerie":
								r.push(`is back in an enormous bun, and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is back in an enormous bun.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "chains":
								r.push(`is pulled painfully back into a long tail, which is secured to ${his} chains at ${his} torso.`);
								break;
							case "body oil":
								r.push(`is in an 80's perm and back in a scrunchy, from which it bursts backwards with 80's violence.`);
								break;
							case "a slutty qipao":
								r.push(`is in a perfect bun, secured with a jade comb.`);
								break;
							case "spats and a tank top":
								r.push(`is in a neat bun, held back with a scrunchy.`);
								break;
							case "a huipil":
								r.push(`is twisted into two horns that rest on top of ${his} head, the rest sits tightly on the back of ${his} neck.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is in a perfect bun, secured with an ivory comb.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of the latex hood in a big bun.`);
								break;
							case "harem gauze":
								r.push(`is piled up on ${his} head in a beehive, pulling ${his} veil up a little.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is piled up on ${his} head in a perfect 60's beehive.`);
								break;
							case "a courtesan dress":
								r.push(`is in a perfect bun.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is back in a severe bun, and topped with a little maid's cap.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is back in a bun, so severe it pulls at ${his} temples a little.`);
								break;
							case "slutty business attire":
								r.push(`is pinned back in a hasty bun.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is pulled hard back into a bun held in place with paracord.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
								r.push(`is in a bun secured by a pastel scrunchy.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is back in a bun and topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is back in a high bun that pushes ${his} cowboy hat forward at a rakish angle.`);
								break;
							case "a Santa dress":
								r.push(`is back in a high bun that pushes ${his} festive hat forward at a rakish angle.`);
								break;
							case "kitty lingerie":
								r.push(`is back in a big bun, and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is back in a big bun.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "chains":
								r.push(`is pulled painfully back into a bun, which is secured to ${his} collar.`);
								break;
							case "body oil":
								r.push(`is in an 80's perm and back in a scrunchy, from which it shoots backwards with 80's violence.`);
								break;
							case "a slutty qipao":
								r.push(`is in a tight little bun, secured with a jade comb.`);
								break;
							case "spats and a tank top":
								r.push(`is in a neat little bun, held back with a scrunchy.`);
								break;
							case "a huipil":
								r.push(`is twisted into two horns that rest on top of ${his} head.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is in a tight little bun, secured with an ivory comb.`);
								break;
							case "restrictive latex":
								r.push(`fits back under ${his} latex hood.`);
								break;
							case "harem gauze":
								r.push(`is piled on ${his} head, pulling ${his} veil up a little.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is piled up on ${his} head in a perfect 60's 'do.`);
								break;
							case "a courtesan dress":
								r.push(`is in a perfect little bun.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is back in a little bun, and topped with a little maid's cap.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is back in a tight little bun, so severe it pulls at ${his} temples a little.`);
								break;
							case "slutty business attire":
								r.push(`is pinned back in a hasty bun.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is pulled hard back into a bun held in place with paracord.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
								r.push(`is in a tight little bun secured by a pastel scrunchy.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is back in a tight little bun and topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is back in a tight little bun that pushes ${his} cowboy hat forward at a rakish angle.`);
								break;
							case "a Santa dress":
								r.push(`is back in a tight little bun that pushes ${his} festive hat forward at a rakish angle.`);
								break;
							case "kitty lingerie":
								r.push(`is back in a tight little bun, and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is back in a tight little bun.`);
						}
					} else {
						switch (slave.clothes) {
							case "restrictive latex":
								r.push(`fits back under ${his} latex hood.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is combed back and topped with a little maid's cap.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is combed back and topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "kitty lingerie":
								r.push(`is combed back and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is combed back.`);
						}
					}
					break;
				case "tails":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with a pair of simple hair ties into tails.`);
								break;
							case "chains":
								r.push(`is back in tails secured by steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is bound by latex hair cuffs into long matching pigtails.`);
								break;
							case "Western clothing":
								r.push(`is back in huge tails that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in huge tails that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in big poofy tails secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in huge tails secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is pulled back with a pair of scrunchies into long tails that almost reach the ground.`);
								break;
							case "a huipil":
								r.push(`is twisted into two huge tails that rest on top of ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is in huge tails secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in huge tails secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in huge tails tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of two holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is back in huge tails secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in twin tails that almost reach the ground, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is back in floor-length tails secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is gathered into two tight tails wrapped in golden thread that almost reach the ground.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in tails that nearly reach the ground.`);
								break;
							case "a chattel habit":
								r.push(`is in a couple of tails that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in long tails, but they're hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is combed into beautiful long tails, one of which comes around to run down ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into floor-length tails by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is gathered into secure tails and doubled up so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into floor-length tails by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in long tails, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in long tails, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in long tails and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in long tails and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in long tails and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in long tails and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in long tails and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in long tails and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in long tails and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in long tails and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in long tails and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in twin tails that almost reach the ground, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in long tails and kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is in twin tails that almost reach the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with a pair of simple hair ties into tails.`);
								break;
							case "chains":
								r.push(`is back in tails secured by steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is bound by latex hair cuffs into matching pigtails.`);
								break;
							case "Western clothing":
								r.push(`is back in long tails that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in long tails that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in big poofy tails secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in big tails secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is pulled back with a pair of scrunchies into long tails.`);
								break;
							case "a huipil":
								r.push(`is twisted into two tails that rest on top of ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is in big tails secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in big tails secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in big tails tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of two holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is back in big tails secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in long twin braids, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is back in long braids secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is gathered into two long tails wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in long loose tails.`);
								break;
							case "a chattel habit":
								r.push(`is in a couple of long tails that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in long tails, but they're hidden by ${his} surplice.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is combed into beautiful tails, one of which comes around to fall between ${his} breasts.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into long tails by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is gathered into secure tails so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into long tails by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in tails, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in tails, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in long tails and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in long tails and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in long tails and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in long tails and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in long tails and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in long tails and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in long tails and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in long tails and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in long tails and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in long twin tails, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in long tails and kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is in long twin tails.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with a pair of simple hair ties into short tails.`);
								break;
							case "chains":
								r.push(`is back in short tails secured by steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is bound by latex hair cuffs into short matching pigtails.`);
								break;
							case "Western clothing":
								r.push(`is back in short braids that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in short braids that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in poofy tails secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in short tails secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is pulled back with a pair of scrunchies into little tails.`);
								break;
							case "a huipil":
								r.push(`is twisted into two short tails that give ${him} the look of a little girl.`);
								break;
							case "a kimono":
								r.push(`is in short tails secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in short tails secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in short tails secured with rope.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of two holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is back in short tails secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in short braids, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is in short braids secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is gathered into two short tails wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in short, slutty tails.`);
								break;
							case "a chattel habit":
								r.push(`is in a couple of short tails that are hidden by ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in short tails hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is combed into short tails set low at the nape of ${his} neck.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into short tails by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is gathered into short tails so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into short tails by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in tails, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in tails, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in short braids and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in short braids and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in short braids and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in short braids and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in short braids and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in short braids and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in short braids and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in short braids and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in short braids and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in short braids, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in short tails held in place with heart-shaped clips.`);
								break;
							default:
								r.push(`is in short braids.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is combed back and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is combed back and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is too short to be kept in proper tails, so it's simply combed back.`);
						}
					}
					break;
				case "dutch braid":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is braided into a simple dutch braid and tied off with a ordinary hair tie at its end.`);
								break;
							case "chains":
								r.push(`is braided into a long dutch braid that ends in a big metal ring.`);
								break;
							case "a latex catsuit":
								r.push(`is braided into a long dutch braid that springs forth from a hole in the suit.`);
								break;
							case "Western clothing":
								r.push(`is braided into a long dutch braid that emerges from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is braided into a long dutch braid that emerges from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is braided into a long dutch braid that's secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is braided into a long dutch braid ending in a big jade ring etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is braided into a long dutch braid that almost reaches the ground and ends in a scrunchy.`);
								break;
							case "a huipil":
								r.push(`is braided into a long dutch braid that ends in a big red flower.`);
								break;
							case "a kimono":
								r.push(`is braided into a long dutch braid that ends in a big ivory ring carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is braided into a long dutch braid with its end secured with a piece of leather.`);
								break;
							case "shibari ropes":
								r.push(`is braided into a long dutch braid with its end secured with rope.`);
								break;
							case "restrictive latex":
								r.push(`is braided into a long dutch braid that sticks out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is braided into a long dutch braid that's secured by a plastic-buttoned hair tie, that bears the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is braided into a long dutch braid that almost reaches the ground, and is topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is braided into a long dutch braid and secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is braided into a long dutch braid that almost reaches the ground, and is wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`is braided into a long dutch braid that sticks sacrilegiously out of ${his} surplice and nearly reaches the ground.`);
								break;
							case "a chattel habit":
								r.push(`is braided into a long dutch braid that flows out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is braided into a long dutch braid that's hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is braided into a gorgeous, lengthy dutch braid that comes around to run down ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is braided into a long dutch braid and held by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is tightly braided into a long dutch braid so that it doesn't hinder ${his} work.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is braided into a long dutch braid that's tied at its end by a white cloth emblazoned with a little red cross.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is braided into a long dutch braid, but hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is braided into a long dutch braid, but hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is braided into a long dutch braid and secured at its end by a ribbon.`);
								break;
							case "a hanbok":
								r.push(`is braided into a long dutch braid that flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is braided into a long dutch braid and secured at its end by a cute fish-shaped hair tie.`);
								break;
							case "a gothic lolita dress":
								r.push(`is braided into a long dutch braid and secured at it's end by a cute skull-adorned hair tie.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is braided into a long dutch braid that's secured by a cute hair tie.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is braided into a long dutch braid and firmly secured by a sports brand hair tie.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is braided into a casual dutch braid that's secured by a black hair tie.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is braided into a single long dutch braid ending in a metal hook that's inserted into her ass to keep her posture upright.`);
								break;
							case "a skimpy loincloth":
								r.push(`is braided into a long dutch braid that is secured at its end around a big bone.`);
								break;
							case "kitty lingerie":
								r.push(`is braided into a long dutch braid that almost reaches the ground, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is braided into a long dutch braid that ends in a pink heart-topped ribbon.`);
								break;
							default:
								r.push(`is braided into a long dutch braid that almost reaches the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is braided into a simple dutch braid and tied off with a ordinary hair tie at it's end.`);
								break;
							case "chains":
								r.push(`is braided into a single dutch braid that ends in a metal ring.`);
								break;
							case "a latex catsuit":
								r.push(`is braided into a single dutch braid that springs forth from a hole in the suit.`);
								break;
							case "Western clothing":
								r.push(`is braided into a single dutch braid that emerges from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is braided into a single dutch braid that emerges from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is braided into a single dutch braid that's secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is braided into a single dutch braid ending in a jade ring etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is braided into a single dutch braid that ends in a scrunchy.`);
								break;
							case "a huipil":
								r.push(`is braided into a single dutch braid that ends in a red flower.`);
								break;
							case "a kimono":
								r.push(`is braided into a single dutch braid that ends in a ivory ring carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is braided into a single dutch braid with its end secured with a piece of leather.`);
								break;
							case "shibari ropes":
								r.push(`is braided into a single dutch braid with its end secured with rope.`);
								break;
							case "restrictive latex":
								r.push(`is braided into a single dutch braid that sticks out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is braided into a single dutch braid that's secured by plastic buttoned hair tie that bears the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is braided into a single dutch braid that is topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is braided into a single dutch braid secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is braided into a single dutch braid that's wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`is braided into a single dutch braid that sticks sacrilegiously out of ${his} surplice.`);
								break;
							case "a chattel habit":
								r.push(`is braided into a single dutch braid that flows out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is braided into a single dutch braid that's hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is braided into a elegant dutch braid that comes around to run down ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is braided into a single dutch braid that's secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is tightly braided into a dutch braid so that it doesn't hinder ${his} work.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is braided into a single dutch braid that's tied at its end by a white cloth emblazoned with a little red cross.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is braided into a single dutch braid, but hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is braided into a single dutch braid, but hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is braided into a single dutch braid and secured at its end by a ribbon.`);
								break;
							case "a hanbok":
								r.push(`is braided into a single dutch braid that flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is braided into a single dutch braid and secured at its end by a cute fish-shaped hair tie.`);
								break;
							case "a gothic lolita dress":
								r.push(`is braided into a single dutch braid and secured at it's end by a cute skull-adorned hair tie.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is braided into a single dutch braid that's secured by a cute hair tie.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is braided into a single dutch braid and firmly secured by a sports brand hair tie.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is braided into a casual dutch braid that's secured by a black hair tie.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is braided into a single long dutch braid ending in a hair tie used for horses.`);
								break;
							case "a skimpy loincloth":
								r.push(`is braided into a dutch braid that is secured at its end around a bone.`);
								break;
							case "kitty lingerie":
								r.push(`is braided into a single dutch braid, and is topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is braided into a dutch braid that ends in a pink, heart-topped ribbon.`);
								break;
							default:
								r.push(`is braided into a single dutch braid.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is braided into a short dutch braid and tied off with a simple hair tie at it's end.`);
								break;
							case "chains":
								r.push(`is braided into a short dutch braid that ends in a small metal ring.`);
								break;
							case "a latex catsuit":
								r.push(`is braided into a short dutch braid that springs forth from a hole in the suit.`);
								break;
							case "Western clothing":
								r.push(`is braided into a short dutch braid that emerges from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is braided into a short dutch braid that emerges from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is braided into a short dutch braid that's secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is braided into a short dutch braid ending in a small jade ring etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is braided into a short dutch braid that ends in a scrunchy.`);
								break;
							case "a huipil":
								r.push(`is braided into a short dutch braid that ends in a small red flower.`);
								break;
							case "a kimono":
								r.push(`is braided into a short dutch braid that ends in a small ivory ring carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is braided into a short dutch braid with its end secured with a small piece of leather.`);
								break;
							case "shibari ropes":
								r.push(`is braided into a short dutch braid with its end secured with rope.`);
								break;
							case "restrictive latex":
								r.push(`is braided into a short dutch braid that sticks out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is braided into a short dutch braid that's secured by plastic buttoned hair tie that bears the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is braided into a short dutch braid that is topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is braided into a short dutch braid secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is braided into a short dutch braid that's wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`is braided into a short dutch braid that sticks sacrilegiously out of ${his} surplice.`);
								break;
							case "a chattel habit":
								r.push(`is braided into a short dutch braid that flows out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is braided into a short dutch braid that's hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is braided into a charming dutch braid that comes around to run down ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is braided into a short dutch braid that's secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is tightly braided into a short dutch braid so that it doesn't hinder ${his} work.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is braided into a short dutch braid that's tied at its end by a white cloth emblazoned with a little red cross.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is braided into a short dutch braid, but hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is braided into a short dutch braid, but hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is braided into a short dutch braid and secured at its end by a ribbon.`);
								break;
							case "a hanbok":
								r.push(`is braided into a short dutch braid that barely flows down ${his} back, waving in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is braided into a short dutch braid and secured at its end by a cute fish-shaped hair tie.`);
								break;
							case "a gothic lolita dress":
								r.push(`is braided into a short dutch braid and secured at it's end by a cute skull-adorned hair tie.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is braided into a short dutch braid that's secured by a cute hair tie.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is braided into a short dutch braid and firmly secured by a sports brand hair tie.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is braided into a casual short dutch braid that's secured by a black hair tie.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is braided into a short long dutch braid ending in a hair tie used for horses.`);
								break;
							case "a skimpy loincloth":
								r.push(`is braided into a dutch braid that is secured at its end around a small bone.`);
								break;
							case "kitty lingerie":
								r.push(`is braided into a short dutch braid, and is topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is braided into a short dutch braid that ends in a pink, heart-topped ribbon.`);
								break;
							default:
								r.push(`is braided into a short dutch braid.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is combed back and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is combed back and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is too short to be kept in proper tails, so it's simply combed back.`);
						}
					}
					break;
				case "double dutch braid":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is braided into two long simple dutch braids that are tied off with ordinary hair ties at their ends.`);
								break;
							case "chains":
								r.push(`is braided into two long dutch braids ending in big metal rings.`);
								break;
							case "a latex catsuit":
								r.push(`is braided into two long dutch braids that spring forth from two holes in the suit.`);
								break;
							case "Western clothing":
								r.push(`is braided into two long dutch braids that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is braided into two long dutch braids that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is braided into two long dutch braids, secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is braided into two long dutch braids ending in big jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is braided into two long dutch braids that almost reach the ground and end in scrunchies.`);
								break;
							case "a huipil":
								r.push(`is braided into two long dutch braids ending in big red flowers.`);
								break;
							case "a kimono":
								r.push(`is braided into two long dutch braids ending in big ivory rings carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is braided into two long dutch braids, their ends secured with pieces of leather.`);
								break;
							case "shibari ropes":
								r.push(`is braided into two long dutch braids, their ends secured with ropes.`);
								break;
							case "restrictive latex":
								r.push(`is braided into two long dutch braids that stick out of holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is braided into two long dutch braids, secured by plastic-buttoned hair ties, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is braided into two long dutch braids that almost reach the ground, and are topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is braided into two long dutch braids, secured by paracords.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is braided into two long dutch braids that almost reach the ground, and are wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`is braided into two long dutch braids that stick sacrilegiously out of ${his} surplice and nearly reach the ground.`);
								break;
							case "a chattel habit":
								r.push(`is braided into two long dutch braids, flowing out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is braided into two long dutch braids, hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is braided into two gorgeous, lengthy dutch braids that come around to run down ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is braided into two long dutch braids and held by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is tightly braided into two long dutch braids so that they don't hinder ${his} work.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is braided into two long dutch braids, tied at their end by white cloths emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is braided into two long dutch braids, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is braided into two long dutch braids, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is braided into two long dutch braids and secured by ribbons.`);
								break;
							case "a hanbok":
								r.push(`is braided into two long dutch braids that flow down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is braided into two long dutch braids and secured by cute fish-shaped hair tie.`);
								break;
							case "a gothic lolita dress":
								r.push(`is braided into two long dutch braids and secured by cute skull-adorned hair tie.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is braided into two long dutch braids, secured by cute hair tie.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is braided into two long dutch braids, firmly secured by sports-brand hair ties.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is braided into two casual dutch braids that's secured by a black hair tie.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is braided into two single long dutch braids ending in metal hook that's inserted into ${his} ass to keep.`);
								break;
							case "a skimpy loincloth":
								r.push(`is braided into two long dutch braids that are secured around big bones at their ends.`);
								break;
							case "kitty lingerie":
								r.push(`is braided into two long dutch braids that almost reach the ground, and are topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is braided into two long dutch braids ending in pink, heart-topped ribbons.`);
								break;
							default:
								r.push(`is braided into two long dutch braids that almost reach the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is braided into two simple dutch braids and tied off with ordinary hair ties at their ends.`);
								break;
							case "chains":
								r.push(`is braided into two dutch braids ending in metal rings.`);
								break;
							case "a latex catsuit":
								r.push(`is braided into two dutch braids that spring forth from holes in the hood.`);
								break;
							case "Western clothing":
								r.push(`is braided into two dutch braids that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is braided into two dutch braids that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is braided into two dutch braids, secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is braided into two dutch braids ending in jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is braided into two dutch braids ending in scrunchies.`);
								break;
							case "a huipil":
								r.push(`is braided into two dutch braids ending in red flowers.`);
								break;
							case "a kimono":
								r.push(`is braided into two dutch braids ending in ivory rings carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is braided into two dutch braids, their ends secured with pieces of leather.`);
								break;
							case "shibari ropes":
								r.push(`is braided into two dutch braids, their ends secured with ropes.`);
								break;
							case "restrictive latex":
								r.push(`is braided into two dutch braids that stick out of holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is braided into two dutch braids, secured by plastic-buttoned hair ties bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is braided into two dutch braids that are topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is braided into two dutch braids secured by paracords.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is braided into two dutch braids that are wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`is braided into two dutch braids that stick sacrilegiously out of ${his} surplice.`);
								break;
							case "a chattel habit":
								r.push(`is braided into two dutch braids, flowing out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is braided into two dutch braids, hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is braided into two elegant dutch braids that come around to run down ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is braided into two dutch braids, secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is tightly braided into two dutch braids so that they don't hinder ${his} work.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is braided into two dutch braids, tied at their ends by white cloths emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is braided into two dutch braids, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is braided into two dutch braids, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is braided into two dutch braids and secured at their ends by ribbons.`);
								break;
							case "a hanbok":
								r.push(`is braided into two dutch braids that flow down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is braided into two dutch braids and secured at their ends by cute fish-shaped hair ties.`);
								break;
							case "a gothic lolita dress":
								r.push(`is braided into two dutch braids and secured at their ends by cute skull-adorned hair ties.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is braided into two dutch braids that are secured by cute hair ties.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is braided into two dutch braids, firmly secured by sports-brand hair ties.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is braided into two casual dutch braids, secured by a black hair ties.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is braided into two single long dutch braids ending in hair ties used for horses.`);
								break;
							case "a skimpy loincloth":
								r.push(`is braided into two dutch braids that is secured at their end around a bone.`);
								break;
							case "kitty lingerie":
								r.push(`is braided into two dutch braids, and is topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is braided into two dutch braids ending in pink, heart-topped ribbon.`);
								break;
							default:
								r.push(`is braided into two dutch braids.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is braided into two short dutch braids and tied off with a simple hair ties at it's end.`);
								break;
							case "chains":
								r.push(`is braided into two short dutch braids ending in small metal rings.`);
								break;
							case "a latex catsuit":
								r.push(`is braided into two short dutch braids that spring forth from a hole in the suit.`);
								break;
							case "Western clothing":
								r.push(`is braided into two short dutch braids that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is braided into two short dutch braids that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is braided into two short dutch braids, secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is braided into two short dutch braids ending in small jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is braided into two short dutch braids ending in scrunchies.`);
								break;
							case "a huipil":
								r.push(`is braided into two short dutch braids ending in small red flowers.`);
								break;
							case "a kimono":
								r.push(`is braided into two short dutch braids ending in small ivory rings carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is braided into two short dutch braids, their ends secured with a small piece of leather.`);
								break;
							case "shibari ropes":
								r.push(`is braided into two short dutch braids with their ends secured with ropes.`);
								break;
							case "restrictive latex":
								r.push(`is braided into two short dutch braids that stick out of holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is braided into two short dutch braids, secured by plastic-buttoned hair ties bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is braided into two short dutch braids that is topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is braided into two short dutch braids secured by paracords.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is braided into two short dutch braids that are wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`is braided into two short dutch braids that sticks sacrilegiously out of ${his} surplice.`);
								break;
							case "a chattel habit":
								r.push(`is braided into two short dutch braids that flows out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is braided into two short dutch braids, hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is braided into two charming dutch braids that come around to run down ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is braided into two short dutch braids, secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is tightly braided into two short dutch braids so that it doesn't hinder ${his} work.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is braided into two short dutch braids, tied at their ends by white cloths emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is braided into two short dutch braids, hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is braided into two short dutch braids, hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is braided into two short dutch braids, secured at their ends by ribbons.`);
								break;
							case "a hanbok":
								r.push(`is braided into two short dutch braids that barely flow down ${his} back, gently waving in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is braided into two short dutch braids, secured at their ends by cute fish-shaped hair ties.`);
								break;
							case "a gothic lolita dress":
								r.push(`is braided into two short dutch braids and secured at their ends by cute skull-adorned hair ties.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is braided into two short dutch braids, secured by cute hair ties.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is braided into two short dutch braids, firmly secured by a sports-brand hair ties.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is braided into two short dutch braids, secured by a black hair ties.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is braided into two short dutch braids ending in hair ties used for horses.`);
								break;
							case "a skimpy loincloth":
								r.push(`is braided into two dutch braids that have their ends bound around small bones.`);
								break;
							case "kitty lingerie":
								r.push(`is braided into two short dutch braids, and is topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is braided into two short dutch braids ending in pink, heart-topped ribbon.`);
								break;
							default:
								r.push(`is braided into two short dutch braids.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is combed back and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is combed back and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is too short to be kept in proper tails, so it's simply combed back.`);
						}
					}
					break;
				case "crown braid":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "chains":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is caught painfully in ${his} chains here and there.`);
								break;
							case "body oil":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it rampages down ${his} back in the glorious feathering of an 80's perm.`);
								break;
							case "a slutty qipao":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with little silver talismans here and there.`);
								break;
							case "a huipil":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it rustles freely in the wind.`);
								break;
							case "restrictive latex":
								r.push(`is allowed a gap at the back of ${his} head so it can be braided into a crown braid that circles ${his} head.`);
								break;
							case "harem gauze":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with little golden bells.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it cascades gorgeously down ${his} bare back.`);
								break;
							case "a courtesan dress":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it cascades elegantly down ${his} back.`);
								break;
							case "a bimbo outfit":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of heart-shaped barrettes.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with a set of ivory hairpins.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it rustles freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with cute little skulls.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
							case "pasties":
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it flows down ${his} back.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is styled like a horse's mane.`);
								break;
							case "a skimpy loincloth":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is with little black bows here and there.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it is decorated with a pastel-colored ribbons.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is braided into a grand-looking crown braid, upon which ${his} cowboy hat rests.`);
								break;
							case "a Santa dress":
								r.push(`is braided into a grand-looking crown braid, upon which ${his} festive hat rests.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`braided into a grand-looking crown braid that circles ${his} head, with a pretty flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it flows back in a mane.`);
								break;
							case "kitty lingerie":
								r.push(`is topped by a cat ear headband, and braided into a grand-looking crown braid that circles ${his} head.`);
								break;
							default:
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it cascades almost to the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "body oil":
								r.push(`is in a big, classic 80's perm.`);
								break;
							case "a slutty qipao":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with little silver talismans here and there.`);
								break;
							case "a huipil":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it flows down ${his} shoulders. Giving ${him} a very innocent look.`);
								break;
							case "restrictive latex":
								r.push(`is allowed a gap at the back of ${his} head so it can be braided into a crown braid that circles ${his} head.`);
								break;
							case "harem gauze":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with little golden bells.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it flows fashionably down ${his} bare back.`);
								break;
							case "a courtesan dress":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it flows elegantly down ${his} back.`);
								break;
							case "a bimbo outfit":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of heart-shaped barrettes.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a set of ivory hairpins.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it rustles freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with cute little skulls.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a little black bow in the back.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a couple of sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is decorated with a pastel-colored hair ties.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head upon which rests a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it flows out from under a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it flows out from under a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, with a flower tucked behind one of ${his} ears:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is topped by a cat ear headband, and braided into a elegant-looking crown braid that circles ${his} head.`);
								break;
							default:
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it is brushed back over ${his} shoulders.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "body oil":
								r.push(`is braided into a charming crown braid that only just circles ${his} head.`);
								break;
							case "a slutty qipao":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is ornamented with a little jade talisman.`);
								break;
							case "a huipil":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, giving ${him} an innocent look.`);
								break;
							case "a latex catsuit":
							case "restrictive latex":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is barely distinguishable under ${his} latex hood.`);
								break;
							case "harem gauze":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with small golden bells.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is topped with a dainty little tiara.`);
								break;
							case "a courtesan dress":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with silk ribbons.`);
								break;
							case "a bimbo outfit":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of heart-shaped barrettes.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a set of ivory hairpins.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is barely visible from under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is barely visible from under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is topped with a traditional ornament.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of cute little skulls.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with a little black bow in the back.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is decorated with pastel-colored frilly ribbons.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is topped by a traditional white nurse's headband with a red cross.`);
								break;
							case "Western clothing":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is topped by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is topped by a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and bears a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is braided into a charming crown braid that only just circles ${his} head, and is topped by a cat ear headband.`);
								break;
							default:
								r.push(`is braided into a charming crown braid that only just circles ${his} head.`);
						}
					} else {
						switch (slave.clothes) {
							case "body oil":
								r.push(`is in a classic 80's perm.`);
								break;
							case "restrictive latex":
								r.push(`fits under ${his} latex hood.`);
								break;
							case "harem gauze":
								r.push(`is covered by a flimsy hairnet.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is gelled into a fashionable wave.`);
								break;
							case "a courtesan dress":
								r.push(`is meticulously brushed.`);
								break;
							case "a bimbo outfit":
								r.push(`is decorated with a couple of heart-shaped barrettes.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is decorated with a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`rustles freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is decorated with a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is decorated with a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is decorated with a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is decorated with a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is decorated with a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is decorated with a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is decorated with a couple of bone hairpins.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is parted on the side.`);
								break;
							case "slutty business attire":
								r.push(`is parted in the middle.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is in a utilitarian cut.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is hidden by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is hidden by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is hidden by a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
							case "a long qipao":
							case "a dirndl":
							case "lederhosen":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is short, and ${he} has a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is short, and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is neatly brushed and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is neatly brushed.`);
						}
					}
					break;
				case "ponytail":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is tied back with a simple hair tie into a long ponytail.`);
								break;
							case "chains":
								r.push(`is tied back into a ponytail secured by steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is threaded through a thick latex sleeve into a peaked ponytail resembling a long flogger.`);
								break;
							case "Western clothing":
								r.push(`is back in a huge ponytail emerging from the back of ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in a huge ponytail emerging from the back of ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is back in a big, long ponytail, tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is tied back in a huge ponytail secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is tied back with a scrunchy into a long ponytail that falls down`);
								if (hasAnyLegs(slave)) {
									r.push(his);
									if (hasBothLegs(slave)) {
										r.push(`legs.`);
									} else {
										r.push(`leg.`);
									}
								} else {
									r.push(`past ${his} torso.`);
								}
								break;
							case "a huipil":
								r.push(`is tied into a huge ponytail, that leaves ${his} long hair to wave in the wind.`);
								break;
							case "a kimono":
								r.push(`is in a huge ponytail secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in a huge ponytail secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in a huge ponytail tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of a hole in the back of in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is back in a huge ponytail secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is back in a huge ponytail secured by steel, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is back in a floor-length ponytail secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is gathered into a tight ponytail wrapped in golden thread that almost reaches the ground.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in a ponytail that nearly reaches the ground.`);
								break;
							case "a chattel habit":
								r.push(`is in a long ponytail that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in a long ponytail, but it's hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is combed into a beautiful long ponytail, which swooshes as ${he} moves.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into a floor-length ponytail by a gaudy gold clasp.`);
								break;
							case "nice business attire":
								r.push(`is gathered into a ponytail and doubled up so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into a floor-length ponytail by a white cloth tie emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in a long ponytail, but it's hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in a long ponytail, but it's hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in a long ponytail and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in a long ponytail and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in a long ponytail and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in a long ponytail held in place by a heart-shaped clip.`);
								break;
							default:
								r.push(`is in a ponytail that almost reaches the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with a simple hair tie into a ponytail.`);
								break;
							case "chains":
								r.push(`is tied back in a ponytail secured by steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is threaded through a thick latex sleeve into a peaked ponytail resembling a flogger.`);
								break;
							case "Western clothing":
								r.push(`is tied back in a long ponytail that emerges from the back of ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is tied back in a long ponytail that emerges from the back of ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in a big, long ponytail tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in a big ponytail secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is tied back with a scrunchy into a long ponytail.`);
								break;
							case "a huipil":
								r.push(`is tied into a modest ponytail, that leaves ${his} hair to wave in the wind.`);
								break;
							case "a kimono":
								r.push(`is in a big ponytail secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in a big ponytail secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in a big ponytail tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of a hole in the back of ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is back in a big ponytail secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is back in a big ponytail secured by steel, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is back in a long braid secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is gathered into a long ponytail wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in a long loose ponytail.`);
								break;
							case "a chattel habit":
								r.push(`is in a long ponytail that flows out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in a long ponytail, but it's hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is combed into a beautiful ponytail, which swooshes as ${he} moves.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into a long ponytail by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is gathered into a secure ponytail so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into a long ponytail by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in a long ponytail, but it's hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in a long ponytail, but it's hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in a long ponytail and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in a long ponytail and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in a long ponytail and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in a long ponytail and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in a long ponytail held in place by a heart-shaped clip.`);
								break;
							default:
								r.push(`is in a long ponytail.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with a simple hair tie into short ponytail.`);
								break;
							case "chains":
								r.push(`is back in a short ponytail secured by steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is bound by a latex hair cuff into a short and severe ponytail.`);
								break;
							case "Western clothing":
								r.push(`is back in a short braid that emerges from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in a short braid that emerges from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in a big, long ponytail tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in a short ponytail secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is tied back with a scrunchy into a short, cute ponytail.`);
								break;
							case "a huipil":
								r.push(`is tied into a small ponytail, that leaves ${his} short hair to wave in the wind.`);
								break;
							case "a kimono":
								r.push(`is in a short ponytail secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in a short ponytail secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in a short ponytail secured with rope.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of a hole in the back of ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is back in a short ponytail secured by a hair tie with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is back in a short ponytail secured by steel, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is in a short braid secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is gathered into a short ponytail wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in a short, slutty ponytail.`);
								break;
							case "a chattel habit":
								r.push(`is in a short ponytail that is hidden by ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in a short ponytail hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is combed into a short ponytail set low at the nape of ${his} neck.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into a short ponytail by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is gathered into a short ponytail so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into a short ponytail by a white cloth tie emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in a ponytail, but it's hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in a ponytail, but it's hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in a ponytail and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in a ponytail and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in a ponytail and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in a ponytail and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in a ponytail and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in a ponytail and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in a ponytail and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in a ponytail and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in a ponytail and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in a short ponytail, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in a short ponytail held in place by a heart-shaped clip.`);
								break;
							default:
								r.push(`is in a short ponytail.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is combed back and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is combed back and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is too short to be kept in a proper ponytail, so it's simply combed back.`);
						}
					}
					break;
				case "braided":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with a pair of simple hair ties into braids.`);
								break;
							case "chains":
								r.push(`is back in braids secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is back in huge braids that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in huge braids that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in big poofy braids secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in huge braids secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is twisted into huge braids, that rest on ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is in huge braids secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in huge braids secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in huge braids tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`sticks out of two holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is back in huge braids secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is back in huge braids secured by steel, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is back in floor-length braids secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is gathered into two tight braids wrapped in golden thread that almost reach the ground.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in braids that nearly reach the ground.`);
								break;
							case "a chattel habit":
								r.push(`is in a couple of braids that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in long braids, but they're hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is combed into beautiful long braids, one of which comes around to run down ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into floor-length braids by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is gathered into secure braids and doubled up so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into floor-length braids by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in long braids, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in long braids, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in long braids and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in long braids and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in long braids and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in long braids and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in long braids and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in long braids and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in long braids and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in long braids and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in long braids and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in braids that almost reach the ground, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is gathered into floor-length braids by pink cloth ties emblazoned with little hearts.`);
								break;
							default:
								r.push(`is in braids that almost reach the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with simple hair ties into braids.`);
								break;
							case "chains":
								r.push(`is back in braids secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is back in long braids that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in long braids that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in big, long braids secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in big braids secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is twisted into braids, that rest on ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is in long braids secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in long braids secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in long braids tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`is braided and sticks out of holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is back in long braids secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is back in long braids secured by steel, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is back in long braids secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is tied into long braids wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in long braids.`);
								break;
							case "a chattel habit":
								r.push(`is in long braids that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in long braids, but they're hidden by ${his} surplice.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is in beautiful braids, one of which comes around to fall between ${his} breasts.`);
								break;
							case "slutty business attire":
								r.push(`is tied into long braids and secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is tied into long braids and secured so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
								r.push(`is tied into long braids and secured by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in braids, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in braids, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in braids and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in braids and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in braids and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in braids and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in braids and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in braids and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in braids and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in braids and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in braids and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in long braids, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is tied into long braids and secured by pink cloth ties emblazoned with little hearts.`);
								break;
							default:
								r.push(`is in long braids.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with a pair of simple hair ties into short braids.`);
								break;
							case "chains":
								r.push(`is back in short braids secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is back in short braids that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in short braids that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in short braids secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in short braids secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is twisted into short braids, that rest on ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is in short braids secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in short braids secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in short braids secured with rope.`);
								break;
							case "restrictive latex":
								r.push(`is braided and sticks out of holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is back in short braids secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is back in short braids secured by steel, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is in short braids secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is gathered into short braids wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice short, slutty tails.`);
								break;
							case "a chattel habit":
								r.push(`is in short braids that are hidden by ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in short braids hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is combed into short braids set low at the nape of ${his} neck.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into short braids by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is gathered into short braids so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into short braids by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in short braids, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in short braids, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in short braids and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in short braids and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in short braids and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in short braids and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in short braids and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in short braids and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in short braids and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in short braids and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in short braids and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in short braids, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is gathered into long braids by pink cloth ties emblazoned with little hearts.`);
								break;
							default:
								r.push(`is in short braids.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is combed back and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is combed back and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is too short to be kept in proper braids, so it's simply combed back.`);
						}
					}
					break;
				case "dreadlocks":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is in dreadlocks, reaching down almost to the ground.`);
								break;
							case "chains":
								r.push(`is in long dreadlocks, connected to ${his} chains at the ends by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is long dreadlocks that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is long dreadlocks that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is in dreadlocks, some tied with bands of colored string.`);
								break;
							case "a slutty qipao":
								r.push(`is in long dreadlocks, some with jade ornaments etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is in long dreadlocks, with a couple of small ornaments important to ${him}.`);
								break;
							case "a kimono":
								r.push(`is in long dreadlocks, some in ivory rings carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is in long dreadlocks some in simple leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is in long dreadlocks, some simply tied with string.`);
								break;
							case "restrictive latex":
								r.push(`is in dreadlocks, poking out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is in dreadlocks, some in ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in dreadlocks bunched up by leather, and topped with a gold headband.`);
								break;
							case "battledress":
								r.push(`is in floor-length dreadlocks, some secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is in dreadlocks wrapped in golden thread that almost reach the ground.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in dreadlocks that nearly reach the ground.`);
								break;
							case "a chattel habit":
								r.push(`is in long dreadlocks that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in long dreadlocks, barely hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is in dreadlocks, spreading out in many directions and almost reaching the ground.`);
								break;
							case "slutty business attire":
								r.push(`is in floor-length dreadlocks, some in gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is in dreadlocks and tied up so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is in floor-length dreadlocks, some in white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in long dreadlocks, barely hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in long dreadlocks, well hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in long dreadlocks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in long dreadlocks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in long dreadlocks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in long dreadlocks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in long dreadlocks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in long dreadlocks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in long dreadlocks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in long dreadlocks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in long dreadlocks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in dreadlocks that reach almost to the ground, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in long dreadlocks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is in dreadlocks that almost reach the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is in dreadlocks, reaching past ${his} shoulders.`);
								break;
							case "chains":
								r.push(`is in dreadlocks, attached to ${his} chains at the ends by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is back in dreadlocks that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in dreadlocks that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is in dreadlocks, some tied with bands of colored string.`);
								break;
							case "a slutty qipao":
								r.push(`is in dreadlocks, some with jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is in dreadlocks, with a couple of small ornaments important to ${him}.`);
								break;
							case "a kimono":
								r.push(`is in dreadlocks, some in ivory rings carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is in dreadlocks, some tied with simple leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is in dreadlocks, some simply tied with string.`);
								break;
							case "restrictive latex":
								r.push(`is in dreadlocks, sticking out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is in dreadlocks, some in hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in dreadlocks bunched up by leather, and topped with a gold headband.`);
								break;
							case "battledress":
								r.push(`is in dreadlocks, some tied with paracord.`);
								break;
							case "harem gauze":
								r.push(`is in dreadlocks, some tied with golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in dreadlocks.`);
								break;
							case "a chattel habit":
								r.push(`is in dreadlocks that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in dreadlocks, but they're hidden by ${his} surplice.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is in dreadlocks, spreading out in many directions.`);
								break;
							case "slutty business attire":
								r.push(`is in dreadlocks, some in gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is in dreadlocks and tied so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is in dreadlocks, some with white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in dreadlocks, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in dreadlocks, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in dreadlocks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in dreadlocks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in dreadlocks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in dreadlocks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in dreadlocks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in dreadlocks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in dreadlocks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in dreadlocks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in dreadlocks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in dreadlocks and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in dreadlocks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is in dreadlocks.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is in short dreadlocks, some in simple hair ties.`);
								break;
							case "chains":
								r.push(`is in short dreadlocks, some with steel rings.`);
								break;
							case "Western clothing":
								r.push(`is in short dreadlocks that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is in short dreadlocks that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is in short dreadlocks, some tied with colored string.`);
								break;
							case "a slutty qipao":
								r.push(`is in short dreadlocks, some in jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is in short dreadlocks, with a couple of small ornaments important to ${him}.`);
								break;
							case "a kimono":
								r.push(`is in short dreadlocks, some with ivory rings carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is in short dreadlocks, some with simple leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is in dreadlocks, some simply tied with string.`);
								break;
							case "restrictive latex":
								r.push(`is in short dreadlocks, sticking out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is in short dreadlocks, some in hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in short dreadlocks bunched up by leather, and topped with a gold headband.`);
								break;
							case "battledress":
								r.push(`is in short dreadlocks, some tied with paracord.`);
								break;
							case "harem gauze":
								r.push(`is in short dreadlocks, some in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in short, dreadlocks.`);
								break;
							case "a chattel habit":
								r.push(`is in short dreadlocks that are hidden by ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in short dreadlocks hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is in short dreadlocks, spreading around ${his} head.`);
								break;
							case "slutty business attire":
								r.push(`is in short dreadlocks, some with gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is in short dreadlocks and tied so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is in short dreadlocks, some in white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in short dreadlocks, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in short dreadlocks, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in short dreadlocks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in short dreadlocks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in short dreadlocks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in short dreadlocks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in short dreadlocks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in short dreadlocks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in short dreadlocks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in short dreadlocks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in short dreadlocks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in short dreadlocks, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in short dreadlocks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is in short dreadlocks.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is combed back and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is combed back and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is too short to be kept in proper dreadlocks, so it's simply combed back.`);
						}
					}
					break;
				case "curled":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is curled into long flowing locks, reaching down almost to the ground.`);
								break;
							case "chains":
								r.push(`is curled into long flowing locks secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is curled into long flowing locks that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is curled into long flowing locks that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is curled into long flowing locks, tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is curled into long flowing locks secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is in long curls, and the locks flow down ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is curled into long flowing locks secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is curled into long flowing locks secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is in long dreadlocks, some simply tied with string.`);
								break;
							case "restrictive latex":
								r.push(`is curled into long flowing locks poking out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is curled into long flowing locks secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is curled into long flowing locks, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is curled into floor-length locks secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is curled into long flowing locks wrapped in golden thread that almost reach the ground.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in long curly locks that nearly reach the ground.`);
								break;
							case "a chattel habit":
								r.push(`is curled into long flowing locks that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is curled into long flowing locks barely hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is curled into long flowing locks, almost reaching the ground.`);
								break;
							case "slutty business attire":
								r.push(`is curled into long flowing locks, secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is curled into long flowing locks and tied up so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is curled into long flowing locks, secured by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is curled into long flowing locks, barely hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is curled into long flowing locks, well hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is curled into long flowing locks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is curled into long flowing locks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is curled into long flowing locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is curled into long flowing locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is curled into long flowing locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is curled into long flowing locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is curled into long flowing locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is curled into long flowing locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is curled into long flowing locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is curled into long flowing locks that almost reach the ground, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is curled into long flowing locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is curled into long flowing locks that almost reach the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is curled into long locks, reaching past ${his} shoulders.`);
								break;
							case "chains":
								r.push(`is curled into long locks, secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is curled into long locks that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is curled into long locks that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is curled into long locks, tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is curled into long locks, secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is in curls, and the locks flow down ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is curled into long locks, secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is curled into long locks, secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is curled into long locks, tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`is curled into long locks, sticking out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is curled into long locks secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is curled into long flowing locks, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is curled into long locks, secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is curled into long locks, secured by golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in long curled locks.`);
								break;
							case "a chattel habit":
								r.push(`is curled into long locks that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is curled into long locks, but they're hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is curled into long locks, reaching past ${his} shoulders.`);
								break;
							case "slutty business attire":
								r.push(`is curled into long locks secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is curled into long locks and tied so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is curled into long locks, secured by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is curled into long locks, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is curled into long locks, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is curled into long locks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is curled into long locks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is curled into long locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is curled into long locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is curled into long locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is curled into long locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is curled into long locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is curled into long locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is curled into long locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is curled into long locks, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is curled into long locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is curled into long locks.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is curled into short locks secured by simple hair ties.`);
								break;
							case "chains":
								r.push(`is curled into short locks secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is curled into short locks that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is curled into short locks that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is curled into short locks tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is curled into short locks secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is in short curls, and the locks flow down ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is curled into short locks secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is curled into short locks secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is curled into short locks tied with rope.`);
								break;
							case "restrictive latex":
								r.push(`is curled into short locks, but they are covered by ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is curled into short locks secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is curled into short flowing locks, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is curled into short locks secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is curled into short locks secured by golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in short, curled locks.`);
								break;
							case "a chattel habit":
								r.push(`is curled into short locks that are hidden by ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is curled into short locks hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is curled into short locks.`);
								break;
							case "slutty business attire":
								r.push(`is curled into short locks secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is curled into short locks and tied so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is curled into short locks secured by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is curled into short locks, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is curled into short locks, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is curled into short locks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is curled into short locks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is curled into short locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is curled into short locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is curled into short locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is curled into short locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is curled into short locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is curled into short locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is curled into short locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is curled into short locks, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is curled into short locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is curled into short locks.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is in short curls and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is in short curls and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is in short curls.`);
						}
					}
					break;
				case "permed":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is permed into long flowing curls, reaching down almost to the ground.`);
								break;
							case "chains":
								r.push(`is permed into long flowing curls secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is permed into long flowing curls that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is permed into long flowing curls that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed into long flowing curls, tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is permed into long flowing curls secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is permed into long curls, and the locks flow down ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is permed into long flowing curls secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is permed into long flowing curls secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is in long dreadlocks, some simply tied with string.`);
								break;
							case "restrictive latex":
								r.push(`is permed into long flowing curls poking out of a hole in ${his} latex hood.`);
								break;
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "striped panties":
								r.push(`is permed into long flowing curls secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is permed into long flowing curls and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is permed into floor-length curls secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is permed into long flowing curls wrapped in golden thread that almost reach the ground.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in long curly curls that nearly reach the ground.`);
								break;
							case "a chattel habit":
								r.push(`is permed into long flowing curls that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is permed into long flowing curls barely hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is permed into long flowing curls, almost reaching the ground.`);
								break;
							case "slutty business attire":
								r.push(`is permed into long flowing curls, secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is permed into long flowing curls and tied up so ${he} can do business without it getting in the way.`);
								break;
							case "a nice nurse outfit":
							case "a slutty nurse outfit":
								r.push(`is permed into long flowing curls, secured by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is permed into long flowing curls, barely hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is permed into long flowing curls, well hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is permed and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is permed and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is permed and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is permed and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is permed and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is permed and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is permed and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is permed and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is permed and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is permed and topped by a cat ear headband; ${his} curls almost reach the ground.`);
								break;
							case "a bimbo outfit":
								r.push(`is permed and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is permed; ${his} curls almost reach the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is permed, ${his} curls reaching past ${his} shoulders.`);
								break;
							case "chains":
								r.push(`is permed into long locks, secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is permed into long locks that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is permed into long locks that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed and tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is permed into long locks, secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is permed into curls, and the locks flow down ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is permed and secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is permed and secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is permed and tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`is permed, sticking out of a hole in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is permed and secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is permed and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is permed and secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is permed and secured by golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in long permed curls.`);
								break;
							case "a chattel habit":
								r.push(`is permed, ${his} curls flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is permed, but they're hidden by ${his} surplice.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is permed, reaching past ${his} shoulders.`);
								break;
							case "slutty business attire":
								r.push(`is permed and secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is permed and tied so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is permed, secured by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is permed, ${his} long curls hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is permed, ${his} long curls hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is permed and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is permed and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is permed and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is permed and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is permed and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is permed and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is permed and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is permed and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is permed and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is permed and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is permed and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is permed.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is permed into short waves secured by simple hair ties.`);
								break;
							case "chains":
								r.push(`is permed into short waves secured by steel rings.`);
								break;
							case "Western clothing":
								r.push(`is permed into short waves that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is permed into short waves that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed into short waves tied with a scrunchy in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is permed into short waves secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "a huipil":
								r.push(`is permed into short curls, and the locks flow down ${his} shoulders.`);
								break;
							case "a kimono":
								r.push(`is permed into short waves secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is permed into short waves secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is permed into short waves tied with rope.`);
								break;
							case "restrictive latex":
								r.push(`is permed into short waves, but they are covered by ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
							case "striped panties":
								r.push(`is permed into short waves secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is permed into short waves and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is permed into short waves secured by paracord.`);
								break;
							case "harem gauze":
								r.push(`is permed into short waves secured by golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in short, permed waves.`);
								break;
							case "a chattel habit":
								r.push(`is permed into short waves that are hidden by ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is permed into short waves hidden by ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is permed into short waves.`);
								break;
							case "slutty business attire":
								r.push(`is permed into short waves secured by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is permed into short waves and tied so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is permed into short waves secured by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is permed into short waves, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is permed into short waves, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is permed into short waves and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is permed into short waves and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is permed into short waves and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is permed into short waves and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is permed into short waves and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is permed into short waves and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is permed into short waves and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is permed into short waves and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is permed into short waves and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is permed into short waves and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is permed into short waves and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is permed into short waves.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is permed into short curls and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is permed into short curls and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is permed into short curls.`);
						}
					}
					break;
				case "luxurious":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "chains":
								r.push(`is in luxurious layered locks, caught painfully in ${his} chains here and there.`);
								break;
							case "body oil":
							case "a huipil":
								r.push(`is in luxurious layered locks flowing gorgeously down ${his} back.`);
								break;
							case "a slutty qipao":
								r.push(`is in luxurious layered locks flowing gorgeously down ${his} back, ornamented with little silver talismans here and there.`);
								break;
							case "restrictive latex":
								r.push(`is allowed a gap at the back of ${his} head so ${his} luxurious layered locks can escape to cascade down ${his} back.`);
								break;
							case "harem gauze":
								r.push(`is in luxurious layered locks flowing gorgeously down ${his} back, covered by a flimsy hairnet.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is in luxurious layered locks flowing gorgeously down ${his} bare back.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is in luxurious layered locks flowing elegantly down ${his} back, kept sensibly in place by a set of ivory hairpins.`);
								break;
							case "a courtesan dress":
								r.push(`is in luxurious layered locks flowing elegantly down ${his} back.`);
								break;
							case "a bimbo outfit":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is in luxurious layered locks but not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in luxurious layered locks but not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in luxurious layered locks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in luxurious layered locks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is in luxurious layered locks flowing gorgeously down ${his} back, decorated with little black bows here and there.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is in luxurious layered locks kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`is in luxurious layered locks kept out of ${his} face by a couple of gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is in luxurious layered locks kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is in luxurious layered locks kept out of ${his} face by a pastel-colored headband.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is in luxurious layered locks topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`cascades out from under a cowboy hat in luxurious layered locks.`);
								break;
							case "a Santa dress":
								r.push(`cascades out from under a festive hat in luxurious layered locks.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is in luxurious layered locks, with a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in luxurious locks topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is in luxurious layered locks, cascading almost to the ground, and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is in luxurious layered locks, cascading almost to the ground.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "body oil":
							case "a huipil":
								r.push(`is in luxurious layered locks.`);
								break;
							case "a slutty qipao":
								r.push(`is in luxurious layered locks flowing over ${his} shoulders, ornamented with little silver talismans here and there.`);
								break;
							case "restrictive latex":
								r.push(`is allowed a gap at the back of ${his} head so ${his} luxurious layered locks can escape down ${his} back.`);
								break;
							case "harem gauze":
								r.push(`is in luxurious layered locks flowing down ${his} back, covered by a flimsy hairnet.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is in luxurious layered locks flowing gorgeously down ${his} bare back.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is in luxurious layered locks flowing elegantly down ${his} back, kept sensibly in place by a set of ivory hairpins.`);
								break;
							case "a courtesan dress":
								r.push(`is in luxurious layered locks flowing elegantly down ${his} back.`);
								break;
							case "a bimbo outfit":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is in luxurious layered locks flowing gorgeously but not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in luxurious layered locks flowing gorgeously but not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in luxurious layered locks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in luxurious layered locks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in luxurious layered locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is in luxurious layered locks, decorated with a little black bow in back.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is in luxurious layered locks kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`is in luxurious layered locks kept out of ${his} face by a couple of gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`is in luxurious layered locks kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is in luxurious layered locks kept out of ${his} face by a pastel-colored headband.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is in luxurious layered locks topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is in luxurious layered locks flowing out from under a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is in luxurious layered locks flowing out from under a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is in luxurious layered locks held back by a flower, tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in luxurious locks topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is brushed back over ${his} shoulders and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is brushed back over ${his} shoulders.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "body oil":
							case "a huipil":
								r.push(`is in luxuriously styled short locks.`);
								break;
							case "a slutty qipao":
								r.push(`is in luxuriously styled short locks, brushed back and ornamented with a little jade talisman.`);
								break;
							case "restrictive latex":
								r.push(`is in luxuriously styled short locks, crammed under ${his} latex hood.`);
								break;
							case "harem gauze":
								r.push(`is in luxuriously styled short locks, covered by a flimsy hairnet.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is in luxuriously styled short locks.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is in luxuriously styled short locks kept sensibly in place by a set of ivory hairpins.`);
								break;
							case "a courtesan dress":
								r.push(`is in luxurious styled short locks.`);
								break;
							case "a bimbo outfit":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is in luxuriously styled short locks but not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in luxuriously styled short locks but not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in luxurious short layered locks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in luxurious short layered locks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is in luxuriously styled short locks decorated with a little black bow in back.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`is in luxuriously styled short locks kept out of ${his} face by simple barrette.`);
								break;
							case "slutty business attire":
								r.push(`is in luxuriously styled short locks kept out of ${his} face by a gaudy golden barrette.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "a mounty outfit":
							case "battlearmor":
							case "a confederate army uniform":
								r.push(`is in luxuriously styled short locks kept out of ${his} face by a sturdy hairpin.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is in luxuriously styled short locks kept out of ${his} face by a pastel-colored headband.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is in luxuriously styled short locks topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is in luxuriously styled short locks topped by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is in luxuriously styled short locks topped by a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is in luxuriously styled short locks, bearing a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in short, luxurious locks topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is brushed back and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is brushed back.`);
						}
					} else {
						switch (slave.clothes) {
							case "body oil":
							case "a huipil":
							case "a military uniform":
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
							case "conservative clothing":
							case "nice business attire":
							case "slutty business attire":
							case "battledress":
							case "battlearmor":
							case "a long qipao":
							case "lederhosen":
							case "a dirndl":
							case "a mounty outfit":
							case "a biyelgee costume":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "a courtesan dress":
							case "a confederate army uniform":
								r.push(`is in luxuriously styled short locks.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a bimbo outfit":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "restrictive latex":
								r.push(`fits under ${his} latex hood.`);
								break;
							case "harem gauze":
								r.push(`is in luxuriously styled short locks covered by a flimsy hairnet.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is in luxuriously styled short locks but not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in luxuriously styled short locks but not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in luxurious short layered locks and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in luxurious short layered locks and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in luxurious short layered locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is in luxuriously styled short locks secured by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is in luxuriously styled short locks under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is in luxuriously styled short locks under ${his} festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is in luxuriously styled short locks, and ${he} has a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is in short, luxurious locks topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is luxuriously styled and layered, and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is luxuriously styled and layered.`);
						}
					}
					break;
				case "strip":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "chains":
							case "uncomfortable straps":
							case "restrictive latex":
							case "shibari ropes":
							case "a latex catsuit":
								r.push(`is shaved into a strip that runs down ${his} back and ends attached to a steel ring.`);
								break;
							case "Western clothing":
								r.push(`is shaved into a strip under ${his} cowboy hat, and cascades magnificently down ${his} back.`);
								break;
							case "a Santa dress":
								r.push(`is shaved into a strip under ${his} festive hat, and cascades magnificently down ${his} back.`);
								break;
							case "body oil":
							case "a huipil":
								r.push(`is shaved into a permed strip which cascades magnificently down ${his} back.`);
								break;
							case "a kimono":
								r.push(`is shaved into a strip that cascades magnificently down ${his} back, with scores of little ivory talismans woven into it.`);
								break;
							case "a slutty qipao":
								r.push(`is shaved into a strip that cascades magnificently down ${his} back, with scores of traditional Chinese coins woven into it.`);
								break;
							case "battledress":
								r.push(`is shaved into a strip that cascades down ${his} back, and has been stiffened so it won't get in ${his} way.`);
								break;
							case "harem gauze":
								r.push(`is shaved into a strip that cascades magnificently down ${his} back, with scores of little golden bells woven into it.`);
								break;
							case "a fallen nuns habit":
								r.push(`is shaved into a strip that cascades magnificently down ${his} back, with scores of little silver crosses hanging from it.`);
								break;
							case "a chattel habit":
								r.push(`is shaved into a strip that cascades out from under ${his} cowl, and has scores of little golden ornaments in lewd shapes woven into it.`);
								break;
							case "a penitent nuns habit":
								r.push(`is shaved into a strip that falls down ${his} back, decently covered by an extra-long surplice.`);
								break;
							case "a schoolgirl outfit":
								r.push(`is shaved into a strip that cascades magnificently down ${his} back, with scores of tiny pastel bows woven into it.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is shaved into a strip that cascades magnificently down ${his} back, with scores of tiny black bows woven into it.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is shaved into a strip that's hidden by ${his} head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is shaved into a strip that's hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is shaved into a strip and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is shaved into a strip and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is shaved into a strip and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is shaved into a strip atop ${his} head that cascades magnificently down ${his} back, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is shaved into a strip atop ${his} head that cascades magnificently down ${his} back, and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is shaved into a strip atop ${his} head that cascades magnificently down ${his} back.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "chains":
							case "uncomfortable straps":
							case "restrictive latex":
							case "shibari ropes":
							case "a latex catsuit":
								r.push(`is shaved into a long braided strip that ends attached to a steel ring.`);
								break;
							case "Western clothing":
								r.push(`is shaved into a strip under ${his} cowboy hat, but is visible as a party in the back.`);
								break;
							case "a Santa dress":
								r.push(`is shaved into a strip under ${his} festive hat, but is visible as a party in the back.`);
								break;
							case "body oil":
							case "a huipil":
								r.push(`is shaved into a permed strip which falls down ${his} back.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is shaved into a long braided strip with little ivory talismans woven into it.`);
								break;
							case "a slutty qipao":
								r.push(`is shaved into a long braided strip with traditional Chinese coins woven into it.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "a mounty outfit":
							case "battlearmor":
							case "a confederate army uniform":
								r.push(`is shaved into a long braided strip.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "harem gauze":
								r.push(`is shaved into a long braided strip with little golden bells woven into it.`);
								break;
							case "a fallen nuns habit":
								r.push(`is shaved into a long braided strip with little silver crosses hanging from it.`);
								break;
							case "a chattel habit":
								r.push(`is shaved into a long strip that sticks out from under ${his} cowl, and has little golden ornaments in lewd shapes woven into it.`);
								break;
							case "a penitent nuns habit":
								r.push(`is shaved into a long braided strip, decently covered by a roomy surplice.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
								r.push(`is shaved into a long braided strip with tiny pastel bows woven into it.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is shaved into a long braided strip with tiny black bows woven into it.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is shaved into a long braided strip, hidden by ${his} head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is shaved into a long braided strip, hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is shaved into a long braided strip and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is shaved into a long braided strip and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is shaved into a long braided strip and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is shaved into a long braided strip and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is shaved into a long braided strip and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is shaved into a long braided strip and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is shaved into a long braided strip and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is shaved into a long braided strip and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is shaved into a long braided strip and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is shaved into a long braided strip and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is shaved into a long braided strip and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is shaved into a long braided strip.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "chains":
							case "uncomfortable straps":
							case "restrictive latex":
							case "shibari ropes":
							case "a latex catsuit":
								r.push(`is shaved into a strip down the middle of ${his} head that ends attached to a steel ring.`);
								break;
							case "Western clothing":
								r.push(`is shaved into a strip under ${his} cowboy hat, with nothing but a little rat tail visible in back.`);
								break;
							case "a Santa dress":
								r.push(`is shaved into a strip under ${his} festive hat, with nothing but a little rat tail visible in back.`);
								break;
							case "body oil":
							case "a huipil":
								r.push(`is shaved into a permed strip.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is shaved into a strip down the middle of ${his} head with little ivory talismans woven into it.`);
								break;
							case "a slutty qipao":
								r.push(`is shaved into a strip down the middle of ${his} head with traditional Chinese coins woven into it.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "a mounty outfit":
							case "battlearmor":
							case "a confederate army uniform":
								r.push(`is shaved into a strip down the middle of ${his} head.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "harem gauze":
								r.push(`is shaved into a strip down the middle of ${his} head with little golden bells woven into it.`);
								break;
							case "a fallen nuns habit":
								r.push(`is shaved into a strip down the middle of ${his} head with little silver crosses hanging from it.`);
								break;
							case "a chattel habit":
								r.push(`is shaved into a strip with little golden ornaments in lewd shapes woven into it.`);
								break;
							case "a penitent nuns habit":
								r.push(`is shaved into a strip down the middle of ${his} head, decently covered by ${his} surplice.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is shaved into a strip down the middle of ${his} head with tiny pastel bows woven into it.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is shaved into a strip down the middle of ${his} head with tiny black bows woven into it.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is shaved into a strip down the middle of ${his} head, hidden by ${his} head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is shaved into a strip down the middle of ${his} head, hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is shaved into a strip and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is shaved into a strip and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is shaved into a strip and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is shaved into a strip and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is shaved into a strip and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is shaved into a strip.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a scalemail bikini":
								r.push(`is shaved into a mohawk and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is shaved into a mohawk and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is shaved into a mohawk.`);
						}
					}
					break;
				case "undercut":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "restrictive latex":
							case "a latex catsuit":
								r.push(`is allowed a gap at the back of ${his} head so it can escape to cascade down ${his} back.`);
								break;
							case "Western clothing":
								r.push(`is shaved to one side under ${his} cowboy hat, flowing out well past ${his} face and all the way down to ${his} breasts.`);
								break;
							case "a Santa dress":
								r.push(`is shaved to one side under ${his} festive hat, flowing out well past ${his} face and all the way down to ${his} breasts.`);
								break;
							case "body oil":
							case "a huipil":
							case "a kimono":
								r.push(`is shaved to one side in an extremely long undercut, with scores of little ivory talismans woven into it.`);
								break;
							case "a slutty qipao":
								r.push(`is shaved to one side in an extremely long undercut, with scores of traditional Chinese coins woven into it.`);
								break;
							case "battledress":
								r.push(`is shaved to one side in an extremely long undercut, stiffened so it won't get in ${his} way.`);
								break;
							case "harem gauze":
								r.push(`is shaved to one side in an extremely long undercut with scores of little golden bells woven into it.`);
								break;
							case "a fallen nuns habit":
								r.push(`is shaved to one side in an extremely long undercut with scores of little silver crosses hanging from it.`);
								break;
							case "a chattel habit":
								r.push(`is shaved to one side that cascades out from under ${his} cowl, and has scores of little golden ornaments in lewd shapes woven into it.`);
								break;
							case "a penitent nuns habit":
								r.push(`is shaved to one side in an extremely long undercut decently covered by an extra-long surplice.`);
								break;
							case "a schoolgirl outfit":
								r.push(`is shaved to one side in an extremely long undercut with scores of tiny pastel bows woven into it.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is shaved to one side in an extremely long undercut with scores of tiny black bows woven into it.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is shaved to one side in an extremely long undercut that's hidden by ${his} niqab.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is shaved to one side in an extremely long undercut that's hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
							case "a one-piece swimsuit":
								r.push(`is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is shaved to one side in an extremely long undercut kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is shaved to one side in an extremely long undercut kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is shaved to one side atop ${his} head that cascades magnificently down one side, topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is shaved to one side, flowing out magnificently down one side and kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is shaved on one side into a long undercut that falls well past ${his} breasts.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "restrictive latex":
							case "a latex catsuit":
								r.push(`is allowed a gap at the back of ${his} head so it can escape down ${his} back.`);
								break;
							case "Western clothing":
								r.push(`is shaved to one side under ${his} cowboy hat, but pokes out down to ${his} neck on one side.`);
								break;
							case "a Santa dress":
								r.push(`is shaved to one side under ${his} festive hat, but pokes out down to ${his} neck on one side.`);
								break;
							case "body oil":
							case "a huipil":
								r.push(`is shaved into a permed strip which falls down ${his} back.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`is shaved into a long, flowing undercut with little ivory talismans woven into it.`);
								break;
							case "a slutty qipao":
								r.push(`is shaved into a long, flowing undercut with traditional Chinese coins woven into it.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "a mounty outfit":
							case "battlearmor":
							case "a confederate army uniform":
								r.push(`is shaved into a long, flowing undercut.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "harem gauze":
								r.push(`is shaved into a long, flowing undercut with little golden bells woven into it.`);
								break;
							case "a fallen nuns habit":
								r.push(`is shaved into a long, flowing undercut with little silver crosses hanging from it.`);
								break;
							case "a chattel habit":
								r.push(`is shaved into a long, flowing undercut that sticks out from under ${his} cowl, and has little golden ornaments in lewd shapes woven into it.`);
								break;
							case "a penitent nuns habit":
								r.push(`is shaved into a long, flowing undercut, decently covered by a roomy surplice.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
								r.push(`is shaved into a long, flowing undercut with tiny pastel bows woven into it.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is shaved into a long, flowing undercut with tiny black bows woven into it.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is shaved into a long, flowing undercut, hidden by ${his} head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is shaved into a long, flowing undercut, hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is shaved into a long, flowing undercut and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is shaved into a long, flowing undercut and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is shaved into a long, flowing undercut and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is shaved into a long, flowing undercut and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is shaved into a long, flowing undercut and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is shaved into a long, flowing undercut and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is shaved into a long, flowing undercut and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is shaved into a long, flowing undercut and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is shaved into a long, flowing undercut and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is shaved into a long, flowing undercut and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is shaved into a long, flowing undercut and kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is shaved to one side, the other half falling down to ${his} neck.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "restrictive latex":
							case "a latex catsuit":
								r.push(`is crammed under ${his} latex hood.`);
								break;
							case "Western clothing":
								r.push(`is shaved to one side under ${his} cowboy hat, with just the slightest trace of ${his} hair poking out on the unshaven side.`);
								break;
							case "a Santa dress":
								r.push(`is shaved to one side under ${his} festive hat, with just the slightest trace of ${his} hair poking out on the unshaven side.`);
								break;
							case "body oil":
							case "a huipil":
							case "a kimono":
							case "a long qipao":
								r.push(`is shaved to one side in a flowing undercut with little ivory talismans woven into it.`);
								break;
							case "a slutty qipao":
								r.push(`is shaved to one side in a flowing undercut with traditional Chinese coins woven into it.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "a mounty outfit":
							case "battlearmor":
							case "a confederate army uniform":
								r.push(`is shaved to one side in an undercut that bristles against ${his} armor.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "harem gauze":
								r.push(`is shaved to one side in a flowing undercut with little golden bells woven into it.`);
								break;
							case "a fallen nuns habit":
								r.push(`is shaved to one side in a flowing undercut with little silver crosses hanging from it.`);
								break;
							case "a chattel habit":
								r.push(`is shaved to one side with little golden ornaments in lewd shapes woven into it.`);
								break;
							case "a penitent nuns habit":
								r.push(`is shaved to one side in a flowing undercut decently covered by ${his} surplice.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is shaved to one side in a flowing undercut with tiny pastel bows woven into it.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is shaved to one side in a flowing undercut with tiny black bows woven into it.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is shaved to one side in a flowing undercut, kept hidden by ${his} head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is shaved to one side in a flowing undercut, kept hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is shaved to one side and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
							case "a one-piece swimsuit":
								r.push(`is shaved to one side and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is shaved to one side and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is shaved to one side and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is shaved to one side and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is shaved to one side and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is shaved to one side and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is shaved to one side and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is shaved to one side and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is shaved to one side and kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is shaved to one side, the other half falling just over one eye.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is totally hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is totally hidden by ${his} hood.`);
								break;
							case "a scalemail bikini":
								r.push(`is shaved to one side in a pixie-like undercut topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is shaved to one side into a pixie-like undercut completed by an adorable cat-ear headband.`);
								break;
							default:
								r.push(`is shaved to one side in a pixie-like undercut.`);
						}
					}
					break;
				case "bangs":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "restrictive latex":
							case "a latex catsuit":
								r.push(`is allowed a gap at the back of ${his} head so it can escape down ${his} back.`);
								break;
							case "a courtesan dress":
								r.push(`is cut perfectly straight across ${his} face, concealing ${his} eyes.`);
								break;
							case "a penitent nuns habit":
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is cut straight across ${his} face, ${his} blunt bangs hiding ${his} eyes from under ${his} head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is cut straight across ${his} face, ${his} blunt bangs hiding ${his} eyes from under ${his} hood.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet, though ${his} blunt bangs limit ${his} vision significantly.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is cut straight across ${his} face, hiding ${his} eyes, and topped with a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is cut straight across ${his} face, hiding ${his} eyes, and topped by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is cut straight across ${his} face, hiding ${his} eyes, and topped with a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is cut straight across ${his} face, hiding ${his} eyes, and accompanied by a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "kitty lingerie":
								r.push(`is cut straight across ${his} face, hiding ${his} eyes, and topped with an adorable cat-ear headband.`);
								break;
							default:
								r.push(`is cut straight across ${his} face, hiding ${his} eyes.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "restrictive latex":
							case "a latex catsuit":
								r.push(`is allowed a gap at the back of ${his} head so it can escape down ${his} back.`);
								break;
							case "a courtesan dress":
								r.push(`is cut perfectly straight across ${his} face, partially hiding ${his} eyes.`);
								break;
							case "a penitent nuns habit":
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes from under ${his} head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes from under ${his} hood.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet, though ${his} blunt bangs limits ${his} vision a bit.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes, and topped with a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes, and topped by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes, and topped with a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes, and accompanied by a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "kitty lingerie":
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes, and topped with an adorable cat-ear headband.`);
								break;
							default:
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "restrictive latex":
							case "a latex catsuit":
								r.push(`fits under ${his} hood.`);
								break;
							case "a courtesan dress":
								r.push(`is cut perfectly straight above ${his} eyebrows.`);
								break;
							case "a penitent nuns habit":
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is cut straight above ${his} eyebrows and barely hidden by ${his} head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is cut straight above ${his} eyebrows, which pokes out from under ${his} hood.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is cut straight above ${his} eyebrows and mostly hidden by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is cut straight above ${his} eyebrows and mostly covered by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is cut straight above ${his} eyebrows and topped with a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is cut straight above ${his} eyebrows and accompanied by a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "kitty lingerie":
								r.push(`is cut straight above ${his} eyebrows and topped with an adorable cat-ear headband.`);
								break;
							default:
								r.push(`is cut straight above ${his} eyebrows.`);
						}
					} else {
						switch (slave.clothes) {
							case "a courtesan dress":
								r.push(`is cut perfectly straight across ${his} forehead.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is totally hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is totally hidden by ${his} hood.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is cut straight across ${his} forehead and topped with a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is cut straight across ${his} forehead, peeking out from beneath ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is cut straight across ${his} forehead and topped with a festive hat.`);
								break;
							case "a scalemail bikini":
								r.push(`is cut straight across ${his} forehead and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is cut straight across ${his} forehead and topped with an adorable cat-ear headband.`);
								break;
							default:
								r.push(`is cut straight across ${his} forehead.`);
						}
					}
					break;
				case "hime":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "a slutty qipao":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks, ornamented with little silver talismans here and there.`);
								break;
							case "restrictive latex":
								r.push(`is allowed a gap at the back of ${his} head so it can escape to cascade down ${his} back.`);
								break;
							case "harem gauze":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks, covered by a flimsy hairnet.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`cascades down ${his} bare back in a hime cut with shoulder-length side-locks.`);
								break;
							case "a courtesan dress":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks.`);
								break;
							case "a bimbo outfit":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`cascades elegantly down ${his} back in a hime cut with shoulder-length side-locks, kept sensibly in place by a set of ivory hairpins.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
							case "pasties":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks decorated with a little black bows.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is kept out of ${his} face by a pastel-colored headband.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks, topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks, topped by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks, topped with a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks, completed with a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks and is topped by a cat ear headband.`);
								break;
							default:
								r.push(`cascades down ${his} back in a hime cut with shoulder-length side-locks.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "a slutty qipao":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks, ornamented with little silver talismans here and there.`);
								break;
							case "restrictive latex":
							case "a latex catsuit":
								r.push(`is allowed a gap at the back of ${his} head so it can escape down ${his} back.`);
								break;
							case "harem gauze":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks, covered by a flimsy hairnet.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`flows down ${his} bare back in a hime cut with cheek-length side-locks.`);
								break;
							case "a courtesan dress":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks.`);
								break;
							case "a bimbo outfit":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							case "a kimono":
							case "a long qipao":
								r.push(`flows elegantly down ${his} back in a hime cut with cheek-length side-locks, kept sensibly in place by a set of ivory hairpins.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks decorated with a little black bows.`);
								break;
							case "conservative clothing":
							case "nice business attire":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "slutty business attire":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of gaudy golden barrettes.`);
								break;
							case "battledress":
							case "a military uniform":
							case "a schutzstaffel uniform":
							case "a slutty schutzstaffel uniform":
							case "a red army uniform":
							case "battlearmor":
							case "a mounty outfit":
							case "a confederate army uniform":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a schoolgirl outfit":
							case "lederhosen":
							case "a dirndl":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is kept out of ${his} face by a pastel-colored headband.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks, topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks, topped by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks, topped with a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks, completed with a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks and is topped by a cat ear headband.`);
								break;
							default:
								r.push(`flows down ${his} back in a hime cut with cheek-length side-locks.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "a latex catsuit":
							case "restrictive latex":
								r.push(`is crammed under ${his} latex hood.`);
								break;
							case "harem gauze":
								r.push(`is styled into a hime cut with cheek-length side-locks and covered by a flimsy hairnet.`);
								break;
							case "a courtesan dress":
								r.push(`is styled into a meticulously brushed hime cut with cheek-length side-locks.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a slutty maid outfit":
							case "a nice maid outfit":
								r.push(`is styled into a hime cut with cheek-length side-locks and decorated with a little black bow in back.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is styled into a hime cut with cheek-length side-locks and topped by a traditional white nurse's headband, complete with red cross.`);
								break;
							case "Western clothing":
								r.push(`is styled into a hime cut with cheek-length side-locks and topped by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is styled into a hime cut with cheek-length side-locks and topped with a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
								r.push(`is styled into a hime cut with cheek-length side-locks, with a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is styled into a hime cut with cheek-length side-locks and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is styled into a hime cut with cheek-length side-locks and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is styled into a hime cut with cheek-length side-locks.`);
						}
					} else {
						switch (slave.clothes) {
							case "restrictive latex":
							case "a latex catsuit":
								r.push(`fits under ${his} latex hood.`);
								break;
							case "a courtesan dress":
								r.push(`is styled into a meticulously brushed hime cut with cheek-length side-locks.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
							case "a penitent nuns habit":
							case "a fallen nuns habit":
							case "a chattel habit":
								r.push(`is not visible under ${his} modest head covering.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is not visible under ${his} hood.`);
								break;
							case "Imperial Plate":
								r.push(`is usually hidden underneath ${his} heavy, powered helmet.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is hidden by a traditional white nurse's headband, complete with red cross and cheek-length side-locks.`);
								break;
							case "Western clothing":
								r.push(`is hidden by a cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is styled into a hime cut with cheek-length side-locks and topped with a festive hat.`);
								break;
							case "a string bikini":
							case "attractive lingerie":
							case "attractive lingerie for a pregnant woman":
							case "a long qipao":
							case "a dirndl":
							case "lederhosen":
							case "a biyelgee costume":
							case "striped panties":
								r.push(`is styled into a hime cut with cheek-length side-locks, and ${he} has a flower tucked behind one ear:`);
								r.push(App.Desc.flower(slave));
								break;
							case "a scalemail bikini":
								r.push(`is styled into a hime cut with cheek-length side-locks and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is styled into a hime cut with cheek-length side-locks and topped by a cat ear headband.`);
								break;
							default:
								r.push(`is styled into a hime cut with cheek-length side-locks.`);
						}
					}
					break;
				case "drills":
					if (slave.hLength > 100) {
						switch (slave.clothes) {
							case "chains":
								r.push(`is wound into enormous coils and kept under control by a series of steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is wound into enormous coils and kept under control by latex hair cuffs.`);
								break;
							case "Western clothing":
								r.push(`is wound into enormous coils that explode out from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is wound into enormous coils that explode out from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and wound into enormous coils and kept under control by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is wound into enormous coils and kept under control by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is wound into enormous coils and kept under control with scrunchies.`);
								break;
							case "a huipil":
								r.push(`is wound into enormous coils that nearly obscure ${him}.`);
								break;
							case "a kimono":
								r.push(`is wound into enormous coils and kept under control by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is wound into enormous coils restrained by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is wound into enormous coils restrained with rope.`);
								break;
							case "restrictive latex":
								r.push(`coils out of two holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is wound into enormous coils and kept under control by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is wound into enormous coils and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is wound into enormous coils secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is wound into enormous coils wrapped in golden thread that nearly obscure ${him}.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in two enormous coils that nearly obscure ${him}.`);
								break;
							case "a chattel habit":
								r.push(`is wound into enormous coils that explode out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is wound into enormous coils that explode out of ${his} surplice.`);
								break;
							case "a ball gown":
							case "a halter top dress":
							case "an evening dress":
								r.push(`is wound into enormous, exquisite coils that come to rest across ${his} chest.`);
								break;
							case "slutty business attire":
								r.push(`is wound into enormous coils decorated with gaudy gold baubles.`);
								break;
							case "nice business attire":
								r.push(`is wound into enormous coils and thoroughly secured behind ${his} back so ${he} can do business without them in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is wound into enormous coils adorned with dozens of little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is wound into enormous coils that explode from under ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is wound into enormous coils that explode out from under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is wound into enormous coils and kept under control by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is wound into enormous coils, bouncing freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is wound into enormous coils and kept under control by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is wound into enormous coils and kept under control by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is wound into enormous coils and kept under control by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is wound into enormous coils and kept under control by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is wound into enormous coils and kept under control by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is wound into enormous coils and kept under control by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is wound into enormous coils and kept under control by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is wound into enormous coils that nearly obscure ${him}, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is wound into enormous coils and kept under control by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is wound into a pair of enormous coils.`);
						}
					} else if (slave.hLength > 30) {
						switch (slave.clothes) {
							case "chains":
								r.push(`is wound into large coils secured by steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is wound into large coils and bound by latex hair cuffs.`);
								break;
							case "Western clothing":
								r.push(`is wound into large coils that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is wound into large coils that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and wound into large coils secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is wound into large coils secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is wound into large coils secured with scrunchies.`);
								break;
							case "a huipil":
								r.push(`is wound into large coils that rest on top of ${his} chest.`);
								break;
							case "a kimono":
								r.push(`is wound into large coils secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is wound into large coils secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is wound into large coils tied back with rope.`);
								break;
							case "restrictive latex":
								r.push(`coils out of two holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is wound into large coils secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is wound into large coils and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is wound into large coils secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is wound into large coils wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`is wound into large coils that stick sacrilegiously out of ${his} surplice.`);
								break;
							case "a chattel habit":
								r.push(`is wound into large coils that flow out from under ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is wound into large coils that spill out of ${his} surplice.`);
								break;
							case "a halter top dress":
							case "a ball gown":
							case "an evening dress":
								r.push(`is wound into large coils which rest atop ${his} breasts.`);
								break;
							case "slutty business attire":
								r.push(`is wound into large coils decorated with gaudy gold baubles.`);
								break;
							case "nice business attire":
								r.push(`is wound into large coils and secured behind ${his} back so ${he} can do business without them in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is wound into large coils adorned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is wound into large coils that protrude from under ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is wound into large coils that protrude from under ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is wound into large coils and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is wound into large coils and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is wound into large coils and kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is wound into large coils and kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is wound into large coils and kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is wound into large coils and kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is wound into large coils and kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in long tails and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is wound into large coils and kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is wound into large coils and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is wound into large coils and kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is wound into a pair of large coils.`);
						}
					} else if (slave.hLength > 10) {
						switch (slave.clothes) {
							case "conservative clothing":
								r.push(`is pulled back with a pair of simple hair ties into short coils.`);
								break;
							case "chains":
								r.push(`is back in short coils secured by steel rings.`);
								break;
							case "a latex catsuit":
								r.push(`is bound by latex hair cuffs into short matching coils.`);
								break;
							case "Western clothing":
								r.push(`is back in short coils that emerge from under ${his} cowboy hat.`);
								break;
							case "a Santa dress":
								r.push(`is back in short coils that emerge from under ${his} festive hat.`);
								break;
							case "body oil":
								r.push(`is permed, and back in coils secured by scrunchies in noxious 80's pastel colors.`);
								break;
							case "a slutty qipao":
								r.push(`is back in short coils secured by jade rings etched with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "spats and a tank top":
								r.push(`is back in short coils secured by scrunchies.`);
								break;
							case "a huipil":
								r.push(`is twisted into two short coils that give ${him} the look of a little girl.`);
								break;
							case "a kimono":
								r.push(`is in short coils secured by ivory combs carved with images of`);
								r.push(App.Desc.image(slave));
								break;
							case "uncomfortable straps":
								r.push(`is back in short coils secured by leather ties.`);
								break;
							case "shibari ropes":
								r.push(`is back in short coils secured with rope.`);
								break;
							case "restrictive latex":
								r.push(`coils out of two holes in ${his} latex hood.`);
								break;
							case "a string bikini":
							case "cutoffs and a t-shirt":
							case "a schoolgirl outfit":
							case "a slutty maid outfit":
								r.push(`is in short coils secured by hair ties with plastic buttons, bearing the garish inscription`);
								r.push(App.Desc.inscrip(slave));
								break;
							case "a scalemail bikini":
								r.push(`is in short coils, and topped by a gold headband.`);
								break;
							case "battledress":
								r.push(`is in short coils secured by paracord.`);
								break;
							case "harem gauze":
							case "striped panties":
								r.push(`is gathered into two short coils wrapped in golden thread.`);
								break;
							case "a fallen nuns habit":
								r.push(`sticks sacrilegiously out of ${his} surplice in short coils.`);
								break;
							case "a chattel habit":
								r.push(`is in a couple of short coils that spill out of ${his} cowl.`);
								break;
							case "a penitent nuns habit":
								r.push(`is in short coils that spill out of ${his} surplice.`);
								break;
							case "slutty business attire":
								r.push(`is gathered into short coils by gaudy gold clasps.`);
								break;
							case "nice business attire":
								r.push(`is gathered into short coils so ${he} can do business without it getting in the way.`);
								break;
							case "a slutty nurse outfit":
							case "a nice nurse outfit":
								r.push(`is gathered into short coils by white cloth ties emblazoned with little red crosses.`);
								break;
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is in a pair of short coils, but they're hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is in a pair of short coils, but they're hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is in short coils and kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`is in short coils and flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is in short coils and is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is in short coils and is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is in short coils and is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is in short coils and is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is in short coils and is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is in short coils and is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is in short coils and is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "kitty lingerie":
								r.push(`is in short coils, and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is in short coils held in place with heart-shaped clips.`);
								break;
							default:
								r.push(`is in a pair of short coils.`);
						}
					} else {
						switch (slave.clothes) {
							case "a burkini":
							case "a burqa":
							case "a hijab and abaya":
							case "a hijab and blouse":
							case "a niqab and abaya":
								r.push(`is hidden by ${his} modest garb.`);
								break;
							case "a klan robe":
							case "a slutty klan robe":
								r.push(`is hidden by ${his} hood.`);
								break;
							case "a police uniform":
							case "overalls":
								r.push(`is kept out of ${his} face by a couple of sturdy hairpins.`);
								break;
							case "a hanbok":
								r.push(`flows down ${his} back, rustling freely in the wind.`);
								break;
							case "a one-piece swimsuit":
								r.push(`is kept out of ${his} face by a couple of simple barrettes.`);
								break;
							case "a gothic lolita dress":
								r.push(`is kept out of ${his} face by a dark-colored headband.`);
								break;
							case "a bra":
							case "a button-up shirt":
							case "a sweater":
							case "a striped bra":
							case "striped underwear":
							case "a sweater and panties":
							case "a t-shirt":
							case "an oversized t-shirt and boyshorts":
							case "an oversized t-shirt":
							case "a t-shirt and jeans":
							case "boyshorts":
							case "cutoffs":
							case "panties":
							case "a t-shirt and panties":
							case "panties and pasties":
							case "pasties":
							case "a sweater and cutoffs":
							case "a button-up shirt and panties":
								r.push(`is kept out of ${his} face by a couple of cute hairpins.`);
								break;
							case "a sports bra":
							case "sport shorts and a t-shirt":
							case "sport shorts and a sports bra":
							case "sport shorts":
								r.push(`is kept out of ${his} face by a couple of sporty hairpins.`);
								break;
							case "a tube top and thong":
							case "a tank-top":
							case "a thong":
							case "a tube top":
							case "a tank-top and panties":
							case "a t-shirt and thong":
							case "leather pants and pasties":
							case "leather pants":
							case "jeans":
							case "leather pants and a tube top":
								r.push(`is kept out of ${his} face by a couple of black hairpins.`);
								break;
							case "a nice pony outfit":
							case "a slutty pony outfit":
								r.push(`is kept out of ${his} face by a couple of black barrettes.`);
								break;
							case "a skimpy loincloth":
								r.push(`is kept out of ${his} face by a couple of bone hairpins.`);
								break;
							case "a scalemail bikini":
							case "striped panties":
								r.push(`is combed back and topped by a gold headband.`);
								break;
							case "kitty lingerie":
								r.push(`is combed back and topped by a cat ear headband.`);
								break;
							case "a bimbo outfit":
								r.push(`is kept out of ${his} face by a couple of heart-shaped barrettes.`);
								break;
							default:
								r.push(`is too short to be kept in proper tails, so it's simply combed back.`);
						}
					}
					break;
				case "bald":
					r.push(`is completely bald.`);
			}
		}
	}
	return r.join(" ");
};
