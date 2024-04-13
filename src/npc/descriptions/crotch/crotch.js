/**
 * @param {App.Entity.SlaveState} slave
 * @param {DescType} [descType=DescType.NORMAL]
 * @returns {string}
 */
App.Desc.crotch = function(slave, descType = DescType.NORMAL) {
	const r = [];
	const {
		he, him, his, He, His, hers
	} = getPronouns(slave);
	if (V.showClothing === 1 && descType !== DescType.MARKET) {
		if (slave.assignment === Job.DAIRY && V.dairyRestraintsSetting > 1) {
			if (V.dairyPregSetting > 1 && slave.ovaries === 1) {
				r.push(`${slave.slaveName}'s pussy is occupied by a massive dildo, servicing ${his} womb with its ejaculate.`);
			} else if (slave.balls > 0) {
				if (slave.dick > 0) {
					r.push(`${slave.slaveName}'s dick is buried in ${his} milking machine's cum receptacle.`);
				} else {
					r.push(`The milking machine keeps a cup against ${slave.slaveName}'s tiny cumhole, since ${he} has balls, but lacks a penis. This limits the machine to anal stimulation to milk ${his} balls, and it's raping ${his} ass forcefully.`);
				}
			} else if (slave.vagina > -1) {
				r.push(`${slave.slaveName}'s pussy is being serviced by a drug-ejaculating dildo.`);
			}
		} else {
			const clothing = App.Data.clothes.get(slave.clothes);
			if (clothing && clothing.desc && "crotch" in clothing.desc) {
				r.push(clothing.desc.crotch(slave));
			} else {
				switch (slave.clothes) {
					case "a Fuckdoll suit":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0) {
							if (slave.dick > 6) {
								r.push(`absurd`);
							} else if (slave.dick > 4) {
								r.push(`big`);
							} else if (slave.dick > 2) {
								r.push(`modest`);
							} else {
								r.push(`pathetic`);
							}
							if (canAchieveErection(slave)) {
								r.push(`cock is kept painfully erect by the Fuckdoll suit's systems. It's tightly wrapped in a condom-shaped extension of the suit's protective material, preventing it from feeling any real pleasure.`);
								if (slave.scrotum > 0) {
									r.push(`${His} ballsack have its own uncomfortably tight pouch in the suit.`);
								}
							} else {
								r.push(`soft cock`);
								if (slave.scrotum > 0) {
									r.push(`and balls are`);
								} else {
									r.push(`is`);
								}
								r.push(`trapped up against its abdomen, under the Fuckdoll suit's protective material.`);
							}
						}
						if (slave.vagina > -1) {
							if (slave.dick > 0) {
								r.push(`${His} front hole, meanwhile, is left completely bare.`);
							} else {
								r.push(`front hole is left completely bare by the Fuckdoll suit's protective material.`);
							}
						} else if (slave.dick === 0) {
							r.push(`groin is covered by featureless Fuckdoll material; there's nothing of interest there.`);
						}
						break;
					case "conservative clothing":
						if (slave.dick > 6) {
							r.push(`There is an absurd bulge at the crotch of ${slave.slaveName}'s pants.`);
						} else if (slave.dick > 3) {
							r.push(`There is a distinct bulge at the crotch of ${slave.slaveName}'s pants.`);
						} else if (slave.dick > 1) {
							r.push(`There is a modest bulge at the crotch of ${slave.slaveName}'s pants.`);
						} else {
							r.push(`The crotch of ${slave.slaveName}'s pants is perfectly smooth.`);
						}
						break;
					case "spats and a tank top":
						if (slave.dick > 7) {
							r.push(`There is an absurdly large, tightly hugged bulge running down the leg of ${slave.slaveName}'s spats.`);
							if (slave.dick > 8) {
								r.push(`${His} spats are too short to keep ${his} dick`);
								if (slave.dick === 9) {
									r.push(`head`);
								}
								r.push(`from popping out of ${his} pantleg.`);
							}
						} else if (slave.dick > 6) {
							r.push(`There is an absurdly large, tightly hugged bulge at the crotch of ${slave.slaveName}'s spats.`);
						} else if (slave.dick > 3) {
							r.push(`There is a tightly hugged bulge at the crotch of ${slave.slaveName}'s spats.`);
						} else if (slave.dick > 1) {
							r.push(`There is a slight, tightly hugged, bulge at the crotch of ${slave.slaveName}'s spats.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s spats are tight enough to highlight ${his} embarrassingly small cock.`);
						} else if (slave.clit > 3) {
							r.push(`There is a tightly hugged bulge at the crotch of ${slave.slaveName}'s spats that seems to be really distracting when ${he} moves.`);
						} else if (slave.balls > 0 && slave.scrotum > 0) {
							r.push(`There is a pair of tightly hugged bulges in the crotch of ${slave.slaveName}'s spats.`);
						} else if (slave.vagina > -1) {
							r.push(`${His} tight spats hug ${his} crotch so closely that ${his}`);
							if (slave.vagina === 0) {
								r.push(`virgin`);
							}
							r.push(`pussy is clearly discernible.`);
						} else {
							r.push(`${His} tight spats hug ${his} perfectly smooth crotch.`);
						}
						break;
					case "stretch pants and a crop-top":
						if (slave.dick > 8) {
							r.push(`There is an absurd bulge at the crotch and down the leg of ${slave.slaveName}'s stretch pants.`);
						} else if (slave.dick > 4) {
							r.push(`There is a distinct bulge at the crotch of ${slave.slaveName}'s stretch pants.`);
						} else if (slave.dick > 2) {
							r.push(`There is a modest bulge at the crotch of ${slave.slaveName}'s stretch pants.`);
						} else if (slave.dick > 0) {
							r.push(`There is a pathetic bump in the crotch of ${slave.slaveName}'s stretch pants.`);
						} else if (slave.vagina > -1) {
							r.push(`${His} stretch pants are so tight you can see ${he} isn't wearing underwear right through the fabric.`);
						} else {
							r.push(`${His} stretch pants are so tight you can see ${he} isn't wearing underwear right through the fabric, not that ${he} has much to hide.`);
						}
						break;
					case "chains":
						if (slave.dick > 0) {
							r.push(`${slave.slaveName} has chain dangling from around ${his} waist to end next to ${his} cock, so that when ${he} moves, it occasionally strikes ${him} in the dick.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s chains leave ${his} featureless groin bare; there's nothing there to restrain.`);
						} else {
							r.push(`${slave.slaveName}'s pussy has a chain running tightly between ${his} pussylips.`);
						}
						break;
					case "Western clothing":
						r.push(`${slave.slaveName}'s chaps have no crotch, so ${his}`);
						if (slave.dick > 2) {
							r.push(`dick dangles`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin is`);
						} else if (slave.dick > 0) {
							r.push(`little dick is`);
						} else {
							r.push(`pussy is`);
						}
						r.push(`bare.`);
						break;
					case "body oil":
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`Every surface of ${slave.slaveName}'s hermaphroditic genitalia have been carefully`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s dick has been lovingly`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s featureless groin has been lovingly`);
						} else {
							r.push(`${slave.slaveName}'s pussy has been lovingly`);
						}
						r.push(`oiled.`);
						break;
					case "a toga":
						if (slave.dick > 3) {
							r.push(`Something is tenting the front of ${slave.slaveName}'s toga.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s dick is hidden behind ${his} toga.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s featureless groin is hidden by ${his} toga.`);
						} else {
							r.push(`${slave.slaveName}'s pussy is concealed by ${his} toga.`);
						}
						break;
					case "a huipil":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`dick is long enough that its head dangles down below the front of ${his} short huipil.`);
						} else if (slave.dick > 0) {
							r.push(`huipil occasionally tents in front when ${he} moves.`);
						} else if (slave.vagina === -1) {
							r.push(`huipil barely comes down far enough to cover ${his} featureless groin.`);
						} else {
							r.push(`huipil barely comes down far enough to cover ${his} pussy.`);
						}
						break;
					case "attractive lingerie for a pregnant woman":
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20 && slave.bellyPreg >= 5000) {
							r.push(`${slave.slaveName}'s massive erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20) && (slave.bellyPreg >= 5000)) {
							r.push(`${slave.slaveName}'s huge erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if ((slave.dick > 7) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`${slave.slaveName}'s erection is so massive that ${he}'s restrained it by trapping its head under ${his} bra.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage and the tip rests comically under ${his} chin.`);
							}
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`${slave.slaveName}'s erection is so big that ${he}'s restrained it by trapping its head under ${his} bra.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage.`);
							}
						} else if ((slave.dick > 3) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s silken panties cannot cover ${his} hermaphroditic genitalia due to the size of ${his} cock. ${He}'s simply pulled it to one side, leaving ${his} pussy bare as well.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s silken panties demurely cover ${his} hermaphroditic genitalia as long as ${he} doesn't move too much, but ${his} dick has a way of slipping out and uncovering ${his} pussy.`);
						} else if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s silken panties cannot cover ${his} cock. ${He}'s simply pulled it to one side.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s silken panties demurely cover ${his} dick as long as ${he} doesn't move too much, but it has a way of slipping out.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s silken panties demurely cover ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s silken panties demurely cover ${his} pussy.`);
						}
						break;
					case "a maternity dress":
						if (slave.dick > 5) {
							r.push(`Something massive can be seen bulging under ${his} dress.`);
						} else if (slave.dick > 2) {
							r.push(`When ${he} moves, something occasionally tents the front of ${his} dress.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s dress demurely conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s dress demurely conceals ${his} pussy.`);
						}
						break;
					case "a slutty qipao":
						r.push(`${slave.slaveName}'s`);
						if (slave.bellyPreg >= 5000 || slave.weight > 95 || (slave.bellyAccessory === "a huge empathy belly") || (slave.bellyAccessory === "a large empathy belly") || (slave.bellyAccessory === "a medium empathy belly")) {
							r.push(`qipao doesn't even come close to reaching ${his} crotch.`);
						} else if (slave.dick > 3) {
							r.push(`dick is long enough that its head dangles down below the front of ${his} short qipao.`);
						} else if (slave.dick > 0) {
							r.push(`qipao occasionally tents in front when ${he} moves.`);
						} else if (slave.vagina === -1) {
							r.push(`qipao barely comes down far enough to cover ${his} featureless groin.`);
						} else {
							r.push(`qipao barely comes down far enough to cover ${his} pussy.`);
						}
						break;
					case "uncomfortable straps":
						r.push(`${slave.slaveName}'s strap`);
						if (hasBothLegs(slave)) {
							r.push(`between ${his} legs`);
						} else {
							r.push(`along ${his} perineum`);
						}
						r.push(`has a steel ring`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`around the base of ${his} dick, letting it pass through, and a ring over ${his} pussy.`);
						} else if (slave.dick > 0) {
							r.push(`the base of ${his} dick, letting it pass through.`);
						} else if (slave.vagina === -1) {
							r.push(`over the little hole in ${his} featureless groin.`);
						} else {
							r.push(`over ${his} pussy.`);
						}
						break;
					case "shibari ropes":
						if (!(slave.chastityPenis) && (slave.dick > 4) && canAchieveErection(slave) && (slave.devotion > 20) && (slave.belly >= 5000)) {
							r.push(`${slave.slaveName}'s ropes bind ${his} huge cock to the bottom of ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnant`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded`);
							} else {
								r.push(`swollen`);
							}
							r.push(`belly.`);
						} else if (!(slave.chastityPenis) && (slave.dick > 4) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`${slave.slaveName}'s ropes bind ${his} huge cock straight up ${his} abdomen.`);
							if (slave.boobs > 400) {
								r.push(`It's so long that its head rests between ${his} breasts.`);
							}
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s ropes are woven in a complex pattern to bind all parts of ${his} complicated genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s ropes include a tight loop around the base of ${his} dick.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName} has a couple of ropes framing ${his} featureless groin, to draw attention to it.`);
						} else {
							r.push(`${slave.slaveName} has a rope passing tightly between ${his} pussylips.`);
						}
						break;
					case "restrictive latex":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`hermaphroditic genitalia are visible through a special hole in the latex.`);
						} else if (slave.dick > 0) {
							r.push(`latex has a hole to leave ${his} dick bare and vulnerable.`);
						} else if (slave.vagina === -1) {
							r.push(`latex has no hole over ${his} featureless groin.`);
						} else {
							r.push(`latex has a hole to leave ${his} pussy bare and vulnerable.`);
						}
						break;
					case "attractive lingerie":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`massive erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20) && (slave.belly >= 5000)) {
							r.push(`huge erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if ((slave.dick > 7) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`erection is so massive that ${he}'s restrained it by trapping its head under ${his} bra.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage and the tip rests comically under ${his} chin.`);
							}
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`erection is so big that ${he}'s restrained it by trapping its head under ${his} bra.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage.`);
							}
						} else if ((slave.dick > 3) && (slave.vagina > -1)) {
							r.push(`lace g-string cannot cover ${his} hermaphroditic genitalia due to the size of ${his} cock. ${He}'s simply pulled it to one side, leaving ${his} pussy bare as well.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`lace g-string demurely covers ${his} hermaphroditic genitalia as long as ${he} doesn't move too much, but ${his} dick has a way of slipping out and uncovering ${his} pussy.`);
						} else if (slave.dick > 3) {
							r.push(`lace g-string cannot cover ${his} cock. ${He}'s simply pulled it to one side.`);
						} else if (slave.dick > 0) {
							r.push(`lace g-string demurely covers ${his} dick as long as ${he} doesn't move too much, but it has a way of slipping out.`);
						} else if (slave.vagina === -1) {
							r.push(`lace g-string demurely covers ${his} featureless groin.`);
						} else {
							r.push(`lace g-string demurely covers ${his} pussy.`);
						}
						break;
					case "a succubus outfit":
						r.push(`${slave.slaveName}'s leather skirt is cut to conceal precisely nothing in front, coming down to just above`);
						if (slave.dick > 0) {
							r.push(`the base of ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${his} featureless groin.`);
						} else {
							r.push(`${his} clit.`);
						}
						break;
					case "kitty lingerie":
						r.push(`${slave.slaveName}'s panties`);
						if (slave.dick > 5) {
							r.push(`can't conceal ${his} giant penis, which is pushed between its fabric cat ears.`);
						} else if (slave.dick > 3) {
							r.push(`bulge from the size of ${his} large penis.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`cover ${his} dual genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`cover ${his} penis.`);
						} else if (slave.vagina === -1) {
							r.push(`cover ${his} genitalia-free groin.`);
						} else {
							r.push(`cover ${his} pussy.`);
						}
						break;
					case "a burkini":
						r.push(`${slave.slaveName}'s burkini is designed to modestly cover ${his}`);
						if (slave.dick > 5 && slave.vagina > -1) {
							r.push(`dual genitalia, but the size of the bulge between ${his}`);
							if (hasBothLegs(slave)) {
								r.push(`legs`);
							} else {
								r.push(`hips`);
							}
							r.push(`shows how well that worked.`);
						} else if (slave.dick > 5) {
							r.push(`penis, but the size of the bulge between ${his}`);
							if (hasBothLegs(slave)) {
								r.push(`legs`);
							} else {
								r.push(`hips`);
							}
							r.push(`shows how well that worked.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`dual genitalia, which it does.`);
						} else if (slave.dick > 0) {
							r.push(`penis, which it does.`);
						} else if (slave.vagina === -1) {
							r.push(`genitalia-free groin, which it does very easily.`);
						} else {
							r.push(`pussy, which it does.`);
						}
						break;
					case "a monokini":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`dick creates a large bulge in the front of ${his} monokini.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia creates a small bulge in the front of ${his} monokini.`);
						} else if (slave.dick > 0) {
							r.push(`dick creates a small bulge in the front of ${his} monokini.`);
						} else if (slave.vagina === -1) {
							r.push(`monokini bottom has no bulges or ridges at the front or bottom.`);
						} else {
							r.push(`pussy creates small ridges in the bottom of ${his} monokini.`);
						}
						break;
					case "a cybersuit":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`dick creates a large bulge in the front of ${his} bodysuit.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia creates a small bulge in the front of ${his} bodysuit.`);
						} else if (slave.dick > 0) {
							r.push(`dick creates a small bulge in the front of ${his} bodysuit.`);
						} else if (slave.vagina === -1) {
							r.push(`bodysuit conceals the featurelessness of ${his} crotch.`);
						} else {
							r.push(`pussy creates small soft ridges in the bottom of ${his} bodysuit.`);
						}
						break;
					case "a tight Imperial bodysuit":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`fat dick creates an obvious bulge at the front of ${his} bodysuit.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia creates a small bulge in the front of ${his} bodysuit.`);
						} else if (slave.dick > 0) {
							r.push(`dick creates a fairly pathetic bulge at the front of ${his} bodysuit.`);
						} else if (slave.vagina === -1) {
							r.push(`bodysuit conceals the featurelessness of ${his} crotch.`);
						} else {
							r.push(`pussy creates the clear indent of a puffy cameltoe at the crotch of ${his} bodysuit.`);
						}
						break;
					case "a string bikini":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`massive erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if (slave.dick > 5 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`huge erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20) {
							r.push(`erection is so massive that ${he}'s got it restrained behind ${his} string bikini top.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage and its tip rests comically under ${his} chin.`);
							}
						} else if (slave.dick > 5 && canAchieveErection(slave) && slave.devotion > 20) {
							r.push(`erection is so big that ${he}'s got it restrained behind ${his} string bikini top.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage.`);
							}
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`just given up and pushed ${his} bikini bottom to one side, since the bikini bottom that fits a hermaphrodite has not yet been designed.`);
						} else if (slave.dick > 0) {
							r.push(`string bikini bottom is more of a banana hammock, in front.`);
						} else if (slave.vagina === -1) {
							r.push(`string bikini conceals the featurelessness of ${his} groin.`);
						} else {
							r.push(`string bikini runs lewdly between ${his} pussylips.`);
						}
						break;
					case "a scalemail bikini":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`massive erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if (slave.dick > 5 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`huge erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20) {
							r.push(`erection is so massive that ${he}'s got it restrained behind ${his} scalemail bikini top.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage and its tip rests comically under ${his} chin.`);
							}
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`erection is so big that ${he}'s got it restrained behind ${his} scalemail bikini top.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage.`);
							}
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`just given up and pushed ${his} scalemail bottom to one side, since the bikini bottom that fits a hermaphrodite has not yet been designed.`);
						} else if (slave.dick > 0) {
							r.push(`scalemail bikini bottom is more of a banana hammock, in front.`);
						} else {
							r.push(`scalemail bikini conceals ${his} groin.`);
						}
						break;
					case "striped panties":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`massive erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20) && (slave.belly >= 5000)) {
							r.push(`huge erection is agonizingly pressed down by ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnancy.`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded belly.`);
							} else {
								r.push(`swollen belly.`);
							}
						} else if ((slave.dick > 7) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`massive erection is completely unrestrained.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage and its tip rests comically under ${his} chin.`);
							}
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`erection is completely unrestrained.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage.`);
							}
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`cock is quite visible under the tight material of ${his} panties.`);
						} else if (slave.dick > 0) {
							r.push(`panties are more of a banana hammock, in front.`);
						} else {
							r.push(`panties conceal ${his} groin.`);
						}
						break;
					case "clubslut netting":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`hermaphroditic genitalia require a huge hole in ${his} netting to keep everything aired out and accessible.`);
						} else if ((slave.dick > 0) && (slave.scrotum > 1)) {
							r.push(`cock has its own hole in ${his} netting, but ${his} balls are restrained inside it.`);
						} else if (slave.dick > 0) {
							r.push(`cock has its own hole in ${his} netting.`);
						} else if (slave.vagina === -1) {
							r.push(`clubslut netting covers ${his} featureless groin, making it less obvious that there's nothing there.`);
						} else {
							r.push(`pussy is left bare by a hole in ${his} netting.`);
						}
						break;
					case "a cheerleader outfit":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`massive erection pins ${his} skirt against ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnant`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded`);
							} else {
								r.push(`swollen`);
							}
							r.push(`belly, revealing ${his} bare pussy.`);
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20) && (slave.belly >= 5000)) {
							r.push(`huge erection pins ${his} skirt against ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`pregnant`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded`);
							} else {
								r.push(`swollen`);
							}
							r.push(`belly, revealing ${his} bare pussy.`);
						} else if ((slave.dick > 7) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`massive erection is so big that ${he}'s trapped it upwards against ${his} stomach and under ${his} top.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage and the tip rests comically under ${his} chin.`);
							}
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`erection is so big that ${he}'s trapped it upwards against ${his} stomach and under ${his} top.`);
							if (slave.boobs > 800) {
								r.push(`Its head peeks out from ${his} cleavage.`);
							}
						} else if (slave.dick > 5) {
							r.push(`cheerleader skirt is not designed for someone with a cock as big as ${hers}; its lower half sticks out beneath its edge.`);
						} else if (slave.dick > 3) {
							r.push(`cheerleader skirt is not designed for someone with a cock as big as ${hers}; its head is easily visible beneath its edge.`);
						} else if (slave.dick > 0) {
							r.push(`cheerleader skirt hides ${his} dick reasonably well as long as ${he} stands still.`);
						} else if (slave.vagina === -1) {
							r.push(`cheerleader skirt hides the featurelessness of ${his} groin.`);
						} else {
							r.push(`cheerleader skirt often flips up to reveal ${his} bare pussy.`);
						}
						break;
					case "cutoffs and a t-shirt":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20) {
							r.push(`erection is so massive that closing ${his} jean cutoffs are hopeless. ${He}'s got ${his} fly completely unbuttoned and ${his} gigantic dick sticking out proudly.`);
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`erection is so big that closing ${his} jean cutoffs are hopeless. ${He}'s got ${his} fly unbuttoned and ${his} huge dick sticking out proudly.`);
						} else if (slave.dick > 5) {
							r.push(`jean cutoffs are pretty brief, and ${his} huge cock sticks out, trapped against one leg.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`jean cutoffs are pretty brief, but decently cover ${his} cock and pussy.`);
						} else if (slave.dick > 0) {
							r.push(`jean cutoffs are pretty brief, but decently cover ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`jean cutoffs are pretty brief, but decently cover ${his} featureless groin.`);
						} else {
							r.push(`jean cutoffs are pretty brief, but still cover ${his} pussy decently in front.`);
						}
						break;
					case "a halter top dress":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`cock tents the front of ${his} beautiful halter top dress.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia are hidden by ${his} beautiful halter top dress.`);
						} else if (slave.dick > 0) {
							r.push(`cock is hidden by ${his} beautiful halter top dress.`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin is concealed by ${his} halter top dress.`);
						} else {
							r.push(`pussy is concealed by ${his} beautiful halter top dress.`);
						}
						break;
					case "a ball gown":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`cock tents the front of ${his} fabulous silken ball gown.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia are hidden by ${his} fabulous silken ball gown.`);
						} else if (slave.dick > 0) {
							r.push(`cock is hidden by ${his} fabulous silken ball gown.`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin is hidden by ${his} fabulous silken ball gown.`);
						} else {
							r.push(`pussy is concealed by ${his} fabulous silken ball gown.`);
						}
						break;
					case "an evening dress":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 4) {
							r.push(`cock is so large it's visible through the thigh slit of ${his} sensual evening dress.`);
						} else if (slave.dick > 3) {
							r.push(`cock tents the front of ${his} sensual evening dress, hiking the thigh slit almost up to ${his} crotch at the right angle.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia are hidden by ${his} sensual evening dress.`);
						} else if (slave.dick > 0) {
							r.push(`cock is hidden by ${his} sensual evening dress.`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin is concealed by ${his} sensual evening dress.`);
						} else {
							r.push(`pussy is concealed by ${his} sensual evening dress.`);
						}
						break;
					case "slutty business attire":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`dickhead dangles down beneath the hem of ${his} short skirt.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia are barely hidden by ${his} skirt.`);
						} else if (slave.dick > 0) {
							r.push(`cock is barely hidden by ${his} skirt.`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin is barely hidden by ${his} skirt.`);
						} else {
							r.push(`pussy is barely concealed by ${his} skirt.`);
						}
						break;
					case "nice business attire":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`conservative skirt bulges forward in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia are decently hidden by ${his} skirt.`);
						} else if (slave.dick > 0) {
							r.push(`conservative skirt gives no hint of the cock behind it.`);
						} else if (slave.vagina === -1) {
							r.push(`conservative skirt gives no hint of the perverse featurelessness behind it.`);
						} else {
							r.push(`conservative skirt gives no hint of the pussy behind it.`);
						}
						break;
					case "a comfortable bodysuit":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`hermaphroditic genitalia are a bit crowded by ${his} tight bodysuit.`);
						} else if (slave.dick > 0) {
							r.push(`cock is quite visible under the tight material of ${his} bodysuit.`);
						} else if (slave.vagina === -1) {
							r.push(`comfortable bodysuit fits ${his} groin well enough to make it clear there's nothing there.`);
						} else {
							r.push(`bodysuit forms a perfect cameltoe against ${his} pussy.`);
						}
						break;
					case "a military uniform":
					case "a red army uniform":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s uniform skirt bulges forward in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s hermaphroditic genitalia are decently hidden by ${his} skirt.`);
						} else if (slave.vagina > -1) {
							r.push(`${slave.slaveName}'s uniform skirt gives no hint of the pussy behind it.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s uniform skirt gives no hint of the featureless groin behind it.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s uniform skirt gives no hint of the cock behind it.`);
						}
						break;
					case "a confederate army uniform":
					case "a schutzstaffel uniform":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s uniform trousers bulges forward in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s hermaphroditic genitalia are decently hidden by ${his} trousers.`);
						} else if (slave.vagina > -1) {
							r.push(`${slave.slaveName}'s uniform trousers give no hint of the pussy behind it.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s uniform trousers give no hint of the featureless groin behind it.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s uniform trousers give no hint of the cock behind it.`);
						}
						break;
					case "a slutty schutzstaffel uniform":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s uniform miniskirt bulges forward in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s hermaphroditic genitalia are decently hidden by ${his} miniskirt.`);
						} else if (slave.vagina > -1) {
							r.push(`${slave.slaveName}'s uniform miniskirt gives no hint of the pussy behind it.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s uniform miniskirt gives no hint of the featureless groin behind it.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s uniform miniskirt gives no hint of the cock behind it.`);
						}
						break;
					case "an apron":
						if (slave.dick > 4) {
							r.push(`${slave.slaveName}'s apron has a noticeable bulge in the front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s hermaphroditic genitalia are hidden in the front by ${his} apron.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s cock is hidden in the front by ${his} apron.`);
						} else if (slave.vagina > -1) {
							r.push(`${slave.slaveName}'s pussy is hidden in the front by ${his} apron.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s featureless groin is hidden in the front by ${his} apron.`);
						}
						break;
					case "overalls":
						if (slave.dick > 6) {
							r.push(`There is a distinct bulge in the front of ${slave.slaveName}'s overalls.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s overalls cover ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s overalls cover ${his} cock.`);
						} else if (slave.vagina > -1) {
							r.push(`${slave.slaveName}'s overalls cover ${his} pussy.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s overalls cover ${his} featureless groin.`);
						}
						break;
					case "a bunny outfit":
						if (slave.dick > 4) {
							r.push(`The crotch of ${slave.slaveName}'s teddy has a significant bulge to it.`);
						} else if (slave.dick > 0) {
							r.push(`The crotch of ${slave.slaveName}'s teddy bulges slightly.`);
						} else if (slave.vagina === -1) {
							r.push(`The crotch of ${slave.slaveName}'s teddy is perfectly, and suspiciously, featureless.`);
						} else {
							r.push(`${slave.slaveName}'s teddy is tight enough to form a distinct cameltoe.`);
						}
						break;
					case "a kimono":
						if (slave.dick > 3) {
							r.push(`Despite the quality tailoring of ${slave.slaveName}'s kimono, it is clear that ${he} has something`);
							if (hasBothLegs(slave)) {
								r.push(`between ${his} legs.`);
							} else {
								r.push(`at ${his} crotch.`);
							}
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s kimono demurely conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s kimono demurely conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s kimono demurely conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s kimono demurely conceals ${his} pussy.`);
						}
						break;
					case "a biyelgee costume":
						if (slave.dick > 3) {
							r.push(`Despite the quality tailoring of ${slave.slaveName}'s costume, it is clear that ${he} has something`);
							if (hasBothLegs(slave)) {
								r.push(`between ${his} legs.`);
							} else {
								r.push(`at ${his} crotch.`);
							}
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s costume demurely conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s costume demurely conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s costume demurely conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s costume demurely conceals ${his} pussy.`);
						}
						break;
					case "a dirndl":
						if (slave.dick > 3) {
							r.push(`Despite the quality tailoring of ${slave.slaveName}'s dirndl, it is clear that ${he} has something`);
							if (hasBothLegs(slave)) {
								r.push(`between ${his} legs.`);
							} else {
								r.push(`at ${his} crotch.`);
							}
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s dirndl demurely conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s dirndl demurely conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s dirndl demurely conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s dirndl demurely conceals ${his} pussy.`);
						}
						break;
					case "a latex catsuit":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`latex encased cock and pussy are just waiting to be exposed through ${his} crotch zipper.`);
						} else if (slave.dick > 0) {
							r.push(`latex encased cock is just waiting to be exposed through ${his} crotch zipper.`);
						} else if (slave.vagina === -1) {
							r.push(`latex covered groin can be exposed with ${his} crotch zipper, though there's little point.`);
						} else {
							r.push(`latex encased pussy is just waiting to be exposed through ${his} crotch zipper.`);
						}
						break;
					case "a leotard":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0 && canAchieveErection(slave)) {
							r.push(`tight leotard affords no extra room for ${his} penis, so when ${he} gets hard, every vein is clearly visible through the material.`);
						} else if (slave.dick > 0) {
							r.push(`soft cock is clearly outlined by the tight material of ${his} leotard.`);
						} else if (slave.clit > 1) {
							r.push(`leotard hugs ${his} pussy, so closely that ${his} impressive clit is clearly visible.`);
						} else if (slave.vagina === -1) {
							r.push(`leotard hugs ${his} groin, making it obvious that there's nothing there.`);
						} else {
							r.push(`leotard hugs ${his} pussy, forming an inviting cameltoe.`);
						}
						break;
					case "a mini dress":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`massive erection is agonizingly pinned to the front of ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`gravid`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded`);
							} else {
								r.push(`swollen`);
							}
							r.push(`belly, entirely visible against the straining fabric of ${his} dress.`);
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20) && (slave.belly >= 5000)) {
							r.push(`huge erection is agonizingly pinned to the front of ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`gravid`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded`);
							} else {
								r.push(`swollen`);
							}
							r.push(`belly, entirely visible against the straining fabric of ${his} dress.`);
						} else if ((slave.dick > 7) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`massive erection ascends up ${his} chest, entirely visible against the straining fabric of ${his} dress.`);
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`huge erection ascends up ${his} chest, entirely visible against the straining fabric of ${his} dress.`);
						} else if ((slave.dick > 3) && canAchieveErection(slave) && (slave.devotion > 20) && (slave.belly >= 5000)) {
							r.push(`erection lies flush against the bottom of ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`gravid`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded`);
							} else {
								r.push(`swollen`);
							}
							r.push(`stomach, visible under the tight fabric of ${his} dress.`);
						} else if ((slave.dick > 3) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`erection lies flush against ${his} stomach, visible under the tight fabric of ${his} dress.`);
						} else if (slave.dick > 5) {
							r.push(`short dress can't possibly conceal ${his} huge cock; its lower half sticks out below the hemline.`);
						} else if (slave.dick > 3) {
							r.push(`short dress can't possibly conceal ${his} big cock; its head peeks out below the hemline.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`short dress scarcely covers the bulge of ${his} cock, while leaving a hint of ${his} bare pussy visible below the hemline.`);
						} else if (slave.dick > 0) {
							r.push(`short dress scarcely covers the bulge of ${his} cock.`);
						} else if (slave.chastityVagina) {
							r.push(`short dress leaves a hint of ${his} polished chastity belt below the hemline.`);
						} else if (slave.chastityAnus) {
							r.push(`short dress leaves a hint of ${his} polished anal chastity belt below the hemline.`);
						} else if (slave.vagina === -1) {
							r.push(`short dress leaves a hint of ${his} featureless groin below its hemline.`);
						} else {
							r.push(`short dress leaves a hint of ${his} bare pussy below the hemline.`);
						}
						break;
					case "a nice maid outfit":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`hermaphroditic genitalia are protected by ${his} functional apron.`);
						} else if (slave.dick > 0) {
							r.push(`dick is protected by ${his} functional apron.`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin is protected by ${his} functional apron.`);
						} else {
							r.push(`pussy is protected by ${his} functional apron.`);
						}
						break;
					case "a nice nurse outfit":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s trousers bulge forward in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s hermaphroditic genitalia are decently hidden by ${his} trousers.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s trousers give no hint of the cock behind it.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s trousers give no hint of the featureless groin behind it.`);
						} else {
							r.push(`${slave.slaveName}'s trousers give no hint of the pussy behind it.`);
						}
						break;
					case "a schoolgirl outfit":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s dickhead is visible, swinging below the hem of ${his} skirt.`);
						} else if (slave.dick > 0) {
							r.push(`Something is pushing against the front of ${slave.slaveName}'s plaid skirt.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s plaid skirt lifts to show off ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s plaid skirt lifts to show off ${his} pussy with the slightest provocation.`);
						}
						break;
					case "a slutty maid outfit":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 3) {
							r.push(`cockhead dangles down beneath the hem of ${his} short apron.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`hermaphroditic genitalia are poorly concealed by ${his} short apron.`);
						} else if (slave.dick > 0) {
							r.push(`cock is barely concealed by ${his} short apron.`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin is barely covered by ${his} short apron.`);
						} else {
							r.push(`pussy is barely covered by ${his} short apron.`);
						}
						break;
					case "a slutty nurse outfit":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s skirt is tight enough to reveal the massive outline of ${his} dick behind it.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s skirt is tight enough to reveal the outline of the hermaphroditic genitalia behind it.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s skirt is tight enough to reveal the outline of ${his} dick behind it.`);
						} else if (slave.vagina > -1) {
							r.push(`${slave.slaveName}'s skirt is barely long enough to cover ${his} pussy.`);
						}
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						if (slave.dick > 4) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} abaya.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s abaya properly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s abaya properly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s abaya properly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s abaya properly conceals ${his} pussy.`);
						}
						break;
					case "a klan robe":
						if (slave.dick > 4) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} robe.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s robe properly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s robe properly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s robe properly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s robe properly conceals ${his} pussy.`);
						}
						break;
					case "a burqa":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} burqa.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s burqa properly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s burqa properly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s burqa properly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s burqa properly conceals ${his} pussy.`);
						}
						break;
					case "a tube top and thong":
					case "a thong":
					case "a slutty klan robe":
					case "a t-shirt and thong":
						if (slave.dick > 3) {
							r.push(`When ${he} moves, ${his} thong bulges to the point of breaking.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s thong immodestly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s thong immodestly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s thong immodestly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s thong immodestly conceals ${his} pussy.`);
						}
						break;
					case "a button-up shirt and panties":
					case "a sweater and panties":
					case "panties and pasties":
					case "a t-shirt and panties":
					case "a tank-top and panties":
					case "striped underwear":
					case "panties":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, ${his} panties bulge to the point of breaking.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s panties immodestly conceal ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s panties immodestly conceal ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s panties immodestly conceal ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s panties immodestly conceal ${his} pussy.`);
						}
						break;
					case "a bra":
					case "a button-up shirt":
					case "a sweater":
					case "a tank-top":
					case "a tube top":
					case "a striped bra":
					case "an oversized t-shirt":
					case "a t-shirt":
					case "a sports bra":
						if (slave.dick > 6) {
							r.push(`${his} outfit does nothing to conceal ${his} swinging cock.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s outfit does nothing to conceal ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s outfit does nothing to conceal ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s outfit does nothing to conceal ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s outfit does nothing to conceal ${his} pussy.`);
						}
						break;
					case "pasties":
						if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s cock is completely exposed, save for the pastie covering its head.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s featureless groin is completely exposed, save for the pastie covering ${his} secret hole.`);
						} else {
							r.push(`${slave.slaveName}'s pussy is completely exposed, save for the pastie covering ${his} clit.`);
						}
						break;
					case "a gothic lolita dress":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} dress.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s dress properly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s dress properly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s dress properly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s dress properly conceals ${his} pussy.`);
						}
						break;
					case "a hanbok":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} hanbok.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s hanbok properly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s hanbok properly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s hanbok properly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s hanbok properly conceals ${his} pussy.`);
						}
						break;
					case "a police uniform":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} trousers.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s trousers properly conceal ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s trousers properly conceal ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s trousers properly conceal ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s trousers properly conceal ${his} pussy.`);
						}
						break;
					case "a nice pony outfit":
					case "a slutty pony outfit":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} pony outfit.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s pony outfit immodestly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s pony outfit immodestly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s pony outfit immodestly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s pony outfit immodestly conceals ${his} pussy.`);
						}
						break;
					case "a one-piece swimsuit":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} swimsuit.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s swimsuit properly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s swimsuit properly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s swimsuit properly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s swimsuit properly conceals ${his} pussy.`);
						}
						break;
					case "a t-shirt and jeans":
					case "cutoffs":
					case "jeans":
					case "a sweater and cutoffs":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, ${his} cock nearly flops out of ${his} jeans.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s jeans properly conceal ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s jeans properly conceal ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s jeans properly conceal ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s jeans properly conceal ${his} pussy.`);
						}
						break;
					case "a skimpy loincloth":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} loincloth.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s loincloth immodestly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s loincloth immodestly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s loincloth immodestly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s loincloth immodestly conceals ${his} pussy.`);
						}
						break;
					case "an oversized t-shirt and boyshorts":
					case "boyshorts":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, the bulge in front of ${his} boy shorts bounces.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s boy shorts barely conceal ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s boy shorts barely conceal ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s boy shorts barely conceal ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s boy shorts barely conceal ${his} pussy.`);
						}
						break;
					case "sport shorts and a t-shirt":
					case "sport shorts and a sports bra":
					case "sport shorts":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, the bulge in front of ${his} shorts bounces.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s shorts partially conceal ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s shorts partially conceal ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s shorts partially conceal ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s shorts partially conceal ${his} pussy.`);
						}
						break;
					case "leather pants and pasties":
					case "leather pants":
					case "leather pants and a tube top":
						if (slave.dick > 6) {
							r.push(`When ${he} moves, ${his} bulge stretches the front of ${his} leather pants.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s leather pants immodestly conceal ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s leather pants immodestly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s leather pants immodestly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s leather pants immodestly conceals ${his} pussy.`);
						}
						break;
					case "a hijab and blouse":
						if (slave.dick > 6) {
							r.push(`There is an absurd bulge at the crotch of ${slave.slaveName}'s skirt.`);
						} else if (slave.dick > 4) {
							r.push(`There is a distinct bulge at the crotch of ${slave.slaveName}'s skirt.`);
						} else if (slave.dick > 2) {
							r.push(`There is a modest bulge at the crotch of ${slave.slaveName}'s skirt.`);
						} else {
							r.push(`The crotch of ${slave.slaveName}'s skirt is perfectly smooth.`);
						}
						break;
					case "a long qipao":
						if (slave.dick > 3) {
							r.push(`When ${he} moves, something occasionally bulges the front of ${his} qipao.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s qipao properly conceals ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s qipao properly conceals ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s qipao properly conceals ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s qipao properly conceals ${his} pussy.`);
						}
						break;
					case "battledress":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s fatigue pants bulge in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s fatigue pants protect ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s fatigue pants protect ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s fatigue pants protect ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s fatigue pants protect ${his} pussy.`);
						}
						break;
					case "lederhosen":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s shorts bulge in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s shorts protect ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s shorts protect ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s shorts protect ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s shorts protect ${his} pussy.`);
						}
						break;
					case "a mounty outfit":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s slacks bulge in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s slacks protect ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s slacks protect ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s slacks protect ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s slacks protect ${his} pussy.`);
						}
						break;
					case "battlearmor":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s crotch bulges in front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s armor protects ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s armor protects ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s armor protects ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s armor protects ${his} pussy.`);
						}
						break;
					case "Imperial Plate":
						if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s plated crotch bulges out slightly at the front.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s armor protects ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s armor protects ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s armor protects ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s armor protects ${his} pussy.`);
						}
						break;
					case "a fallen nuns habit":
						r.push(`The ludicrously short skirt of ${slave.slaveName}'s habit parts below ${his} navel, leaving ${his}`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`hermaphroditic genitalia`);
						} else if (slave.dick > 0) {
							r.push(`cock`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin`);
						} else {
							r.push(`pussy`);
						}
						r.push(`bare.`);
						break;
					case "a chattel habit":
						r.push(`The strip of cloth running down ${his} front`);
						if (App.Data.misc.fakeBellies.includes(slave.bellyAccessory) || slave.weight > 95 || slave.belly >= 5000) {
							r.push(`comes with a clip to fasten it to the underside of ${his} belly and`);
						}
						if (slave.dick > 0 && canAchieveErection(slave)) {
							r.push(`splits well above the base of ${his} dick, allowing ${his} erection to stand out proudly.`);
						} else if (slave.chastityVagina && slave.chastityAnus) {
							r.push(`has the new religion's symbol for chastity embossed on it in gold, implying that this holy sex slave should only be used for oral.`);
						} else if (slave.vagina < 0 || slave.chastityVagina) {
							r.push(`has the new religion's symbol for anal sex embossed on it in gold, implying that this holy sex slave should be approached from the rear.`);
						} else if (slave.chastityAnus && canDoVaginal(slave)) {
							r.push(`has the new religion's symbol for anal chastity embossed on it in gold, implying that this holy sex slave should be used for vaginal sex or oral sex only.`);
						} else if (slave.vagina === -1) {
							r.push(`has the new religion's stylized for anal sex embossed on it in gold, since this slave's front is quite featureless.`);
						} else {
							r.push(`has the new religion's stylized symbol depicting the vagina embossed on it in gold, and can be tucked up to bare ${his} womanhood.`);
						}
						break;
					case "a penitent nuns habit":
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`${slave.slaveName}'s sackcloth undergarments chafe and torture ${his} poor hermaphrodite's genitalia, keeping ${his} aware that ${he} is an abomination.`);
						} else if (slave.dick > 0) {
							r.push(`${He}'s wearing a painful metal cilice around the base of ${his} cock, making ${him} shift constantly in search of comfort that will not come.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s sackcloth undergarments chafe and torture ${his} poor, featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s sackcloth undergarments chafe and torture ${his} poor womanhood.`);
						}
						break;
					case "harem gauze":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`hermaphroditic genitalia are partially obscured by a covering of sheer gauze. ${His} pussy is barely discernible.`);
						} else if (slave.dick > 0) {
							r.push(`cock is partially obscured by a covering of sheer gauze.`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin is partially obscured by a covering of sheer gauze.`);
						} else {
							r.push(`pussy is partially obscured by a covering of sheer gauze.`);
						}
						break;
					case "a Santa dress":
						if (slave.dick > 5) {
							r.push(`${slave.slaveName}'s cock is long enough to poke out from under ${his} dress.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s dress covers ${his} hermaphroditic genitalia.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s dress covers ${his} cock.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s dress covers ${his} featureless groin.`);
						} else {
							r.push(`${slave.slaveName}'s dress covers ${his} pussy.`);
						}
						break;
					case "a courtesan dress":
						r.push(`${slave.slaveName}'s`);
						if (slave.dick > 0 && slave.vagina > -1) {
							r.push(`hermaphroditic genitalia`);
						} else if (slave.dick > 0) {
							r.push(`cock`);
						} else if (slave.vagina === -1) {
							r.push(`featureless groin`);
						} else {
							r.push(`pussy`);
						}
						r.push(`is obscured by a series of petal-like folds in ${his} dress.`);
						break;
					case "a bimbo outfit":
						if (slave.dick > 7 && canAchieveErection(slave) && slave.devotion > 20 && slave.belly >= 5000) {
							r.push(`${slave.slaveName}'s massive erection extends from ${his} thong, trapping ${his} miniskirt against the underside of ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`gravid`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded`);
							} else {
								r.push(`swollen`);
							}
							r.push(`belly.`);
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20) && (slave.belly >= 5000)) {
							r.push(`${slave.slaveName}'s huge erection extends from ${his} thong, trapping ${his} miniskirt against the underside of ${his}`);
							if (slave.bellyPreg > 2000) {
								r.push(`gravid`);
							} else if (slave.bellyImplant > 2000) {
								r.push(`rounded`);
							} else {
								r.push(`swollen`);
							}
							r.push(`belly.`);
						} else if ((slave.dick > 7) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`${slave.slaveName}'s massive erection extends from ${his} thong and juts out from beneath ${his} miniskirt.`);
						} else if ((slave.dick > 5) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`${slave.slaveName}'s huge erection extends from ${his} thong and juts out from beneath ${his} miniskirt.`);
						} else if ((slave.dick > 3) && canAchieveErection(slave) && (slave.devotion > 20)) {
							r.push(`${slave.slaveName}'s erection extends from ${his} thong, tenting ${his} typically useless miniskirt.`);
						} else if (slave.dick > 5) {
							r.push(`${slave.slaveName}'s thong can't possibly contain ${his} huge cock; it hangs out for all to see beneath ${his} miniskirt.`);
						} else if (slave.dick > 3) {
							r.push(`${slave.slaveName}'s thong can barely contain ${his} cock; it threatens to pop out in full view thanks to ${his} miniskirt.`);
						} else if ((slave.dick > 0) && (slave.vagina > -1)) {
							r.push(`${slave.slaveName}'s thong immodestly conceals ${his} hermaphroditic genitalia in place of ${his} miniskirt.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s thong immodestly conceals ${his} cock in place of ${his} miniskirt.`);
						} else if (slave.chastityVagina) {
							r.push(`${slave.slaveName}'s miniskirt leaves ${his} chastity belt fully visible.`);
						} else if (slave.vagina === -1) {
							r.push(`${slave.slaveName}'s thong immodestly conceals ${his} featureless groin in place of ${his} miniskirt.`);
						} else {
							r.push(`${slave.slaveName}'s thong immodestly conceals ${his} pussy in place of ${his} miniskirt.`);
						}
						break;
					default:
						if (slave.vagina > -1) {
							r.push(`${slave.slaveName}'s`);
							if (slave.dick > 0 && slave.chastityPenis === 1 && slave.chastityVagina === 1) {
								r.push(`hermaphroditic genitalia are concealed only by the chastity devices imprisoning them.`);
							} else if (slave.dick > 0 && slave.chastityPenis === 1) {
								r.push(`pussy is bare and available beneath ${his} caged, hermaphroditic cock.`);
							} else if (slave.dick > 0 && slave.chastityVagina === 1) {
								r.push(`pussy is concealed only by the chastity belt imprisoning it, ${his} hermaphroditic cock resting atop.`);
							} else if (slave.chastityVagina === 1) {
								r.push(`pussy is concealed only by the chastity belt imprisoning it.`);
							} else {
								r.push(`pussy is bare and available.`);
							}
						} else if (slave.chastityPenis === 1) {
							r.push(`${slave.slaveName}'s cock is concealed only by the chastity cage imprisoning it.`);
						} else if (slave.dick > 0) {
							r.push(`${slave.slaveName}'s`);
							switch (slave.dick) {
								case 10:
									r.push(`inhuman cock hangs naked.`);
									break;
								case 9:
									r.push(`absurd cock hangs naked.`);
									break;
								case 8:
									r.push(`titanic`);
									if (!canAchieveErection(slave)) {
										r.push(`flaccid`);
									}
									r.push(`cock hangs naked.`);
									break;
								case 7:
									r.push(`gigantic`);
									if (!canAchieveErection(slave)) {
										r.push(`flaccid`);
									}
									r.push(`cock hangs naked.`);
									break;
								case 6:
									r.push(`huge`);
									if (!canAchieveErection(slave)) {
										r.push(`flaccid`);
									}
									r.push(`cock hangs naked.`);
									break;
								case 5:
									r.push(`imposing`);
									if (!canAchieveErection(slave)) {
										r.push(`flaccid`);
									}
									r.push(`cock swings naked.`);
									break;
								case 4:
									r.push(`big`);
									if (!canAchieveErection(slave)) {
										r.push(`flaccid`);
									}
									r.push(`cock dangles naked.`);
									break;
								case 3:
									if (!canAchieveErection(slave)) {
										r.push(`flaccid`);
									}
									r.push(`cock dangles bare.`);
									break;
								case 2:
									r.push(`little`);
									if (!canAchieveErection(slave)) {
										r.push(`flaccid`);
									}
									r.push(`dick is bare.`);
									break;
								case 1:
									r.push(`tiny`);
									if (!canAchieveErection(slave)) {
										r.push(`flaccid`);
									}
									r.push(`dick is bare.`);
									break;
								default:
									r.push(`hypertrophied cock hangs naked.`);
									break;
							}
						} else {
							r.push(`${slave.slaveName}'s`);
							if (slave.balls > 0) {
								r.push(`lonely balls are`);
							} else {
								r.push(`featureless groin is`);
							}
							r.push(`bare and vulnerable.`);
						}
				}
			}
		}
	}
	return r.join(" ");
};
