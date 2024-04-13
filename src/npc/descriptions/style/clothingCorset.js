/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.clothingCorset = function(slave) {
	const r = [];
	const {
		his, He, His
	} = getPronouns(slave);
	const clothing = App.Data.clothes.get(slave.clothes);
	if (clothing && clothing.desc && "clothingCorset" in clothing.desc) {
		r.push(clothing.desc.clothingCorset(slave));
	} else {
		switch (slave.clothes) {
			case "a Fuckdoll suit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is built into ${his} suit.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is built into ${his} suit.`);
				}
				break;
			case "a hijab and blouse":
			case "conservative clothing":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is hidden by ${his} blouse.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is hidden by ${his} blouse.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} blouse.`);
				}
				break;
			case "spats and a tank top":
				if (slave.boobs > 1200) {
					if (slave.bellyAccessory === "a corset") {
						r.push(`${His} sturdy corset is open to view due to ${his} large chest hiking up ${his} top.`);
					} else if (slave.bellyAccessory === "an extreme corset") {
						r.push(`${His} extreme corsetage is open to view due to ${his} large chest hiking up ${his} top.`);
					} else if (slave.bellyAccessory === "a support band") {
						r.push(`${His} support band is open to view due to ${his} large chest hiking up ${his} top.`);
					}
				} else {
					if (slave.bellyAccessory === "a corset") {
						r.push(`${His} sturdy corset is hidden by ${his} top.`);
					} else if (slave.bellyAccessory === "an extreme corset") {
						r.push(`${His} extreme corsetage is hidden by ${his} top.`);
					} else if (slave.bellyAccessory === "a support band") {
						r.push(`${His} support band is hidden by ${his} top.`);
					}
				}
				break;
			case "chains":
				if (slave.bellyAccessory === "a corset") {
					r.push(`Leather cased lengths of chain form a corset around ${his} waist.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${He}'s encased in a very tight corset made of leather cased iron straps, with eyelets to attach to the chains.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is buried under ${his} chains.`);
				}
				break;
			case "Western clothing":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is hidden by ${his} flannel.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is hidden by ${his} flannel.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} flannel.`);
				}
				break;
			case "body oil":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is ${his} only real item of clothing.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is ${his} only real item of clothing.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is ${his} only real item of clothing.`);
				}
				break;
			case "a toga":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is hidden by the toga.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is hidden by the toga.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by the toga.`);
				}
				break;
			case "a huipil":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is visible through the sides.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is visible through the sides.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is visible through the sides.`);
				}
				break;
			case "a slutty qipao":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is hidden by the silk.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is hidden by the silk.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by the silk.`);
				}
				break;
			case "uncomfortable straps":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${He}'s wearing a leather corset, hooked into the straps.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${He}'s wearing an extreme leather corset, hooked into the straps.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is buried under ${his} straps.`);
				}
				break;
			case "shibari ropes":
				if (slave.bellyAccessory === "a corset") {
					r.push(`A dense web of thick ropes around ${his} waist form an effective corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} ropes bind into an extreme corset woven from hemp.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is buried under ${his} ropes.`);
				}
				break;
			case "restrictive latex":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The latex features an integral corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The latex features a punishingly extreme integral corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by the latex.`);
				}
				break;
			case "a latex catsuit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`An underbust corset cinches ${his} waist and ensures proper posture.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`An underbust corset in punishing tightlace cinches ${his} waist and ensures proper posture.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by the latex.`);
				}
				break;
			case "attractive lingerie":
			case "attractive lingerie for a pregnant woman":
			case "kitty lingerie":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${He}'s wearing a pretty lace corset to match.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${He}'s wearing a strict whalebone corset to match.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is in plain sight.`);
				}
				break;
			case "a succubus outfit":
			case "a courtesan dress":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset includes steel stays to give it real effect.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} corset includes punishingly tight steel stays to give it real effect.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is layered under ${his} corset.`);
				}
				break;
			case "a fallen nuns habit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The latex features an integral corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The latex features a punishingly extreme integral corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is layered under ${his} corset.`);
				}
				break;
			case "a chattel habit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The habit includes a prominent white corset with gold stays.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The habit includes an extremely tight white corset with gold stays.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is visible through ${his} habit.`);
				}
				break;
			case "a penitent nuns habit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is hidden, but very uncomfortable.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} corset is hidden, but crushingly uncomfortable.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} habit.`);
				}
				break;
			case "a string bikini":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is a fun color, but still clashes with ${his} bikini pretty badly.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} absurd corset is a fun color, but still clashes with ${his} bikini pretty badly.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is a fun color, but still clashes with ${his} bikini pretty badly.`);
				}
				break;
			case "a scalemail bikini":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is a dull color, and clashes with ${his} bikini pretty badly.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} absurd corset is a dull color, and clashes with ${his} bikini pretty badly.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band clashes with ${his} bikini pretty badly.`);
				}
				break;
			case "striped panties":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is a fun color and compliments ${his} cute panties.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} absurd corset is a fun color and compliments ${his} cute panties.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is a fun color and compliments ${his} cute panties.`);
				}
				break;
			case "a cheerleader outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} top incorporates a subtle corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} top incorporates severe corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} top does little to conceal ${his} support band.`);
				}
				break;
			case "clubslut netting":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is a fun color, but still clashes with ${his} netting pretty badly.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} absurd corset is a fun color, but still clashes with ${his} netting pretty badly.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is a fun color, but still clashes with ${his} netting pretty badly.`);
				}
				break;
			case "cutoffs and a t-shirt":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The t-shirt conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The t-shirt conceals ${his} severe corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} t-shirt.`);
				}
				break;
			case "slutty business attire":
			case "nice business attire":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} jacket totally conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} jacket totally conceals ${his} absurd corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} jacket.`);
				}
				break;
			case "a ball gown":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The dress has an elegant integral corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The dress has extreme corsetage built into it.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} gown.`);
				}
				break;
			case "a halter top dress":
			case "an evening dress":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The dress has an elegant integral corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The dress has extreme corsetage built into it.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} dress.`);
				}
				break;
			case "a mini dress":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The dress also cleverly doubles as an overbust corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The dress also cleverly doubles as an extreme overbust corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} dress.`);
				}
				break;
			case "a comfortable bodysuit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`Its middle is reinforced to act as a corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`Its middle is strongly reinforced to act as a merciless corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} bodysuit.`);
				}
				break;
			case "a leotard":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The leotard's middle is reinforced to act as a corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The leotard's middle is strongly reinforced to act as a merciless corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} leotard.`);
				}
				break;
			case "a burkini":
			case "a one-piece swimsuit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The swimsuit's middle is reinforced to act as a corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The swimsuit's middle is strongly reinforced to act as a merciless corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden under ${his} swimsuit.`);
				}
				break;
			case "a monokini":
				if (slave.bellyAccessory === "a corset") {
					r.push(`A corset peeks out from the top of the swimsuit.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`An extreme corset peeks out from the top of the swimsuit.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band peeks out from the top of the swimsuit.`);
				}
				break;
			case "overalls":
				if (slave.bellyAccessory === "a corset") {
					r.push(`A corset peeks out from the top of the overalls.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`An extreme corset peeks out from the top of the overalls.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band peeks out from the top of the overalls.`);
				}
				break;
			case "an apron":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The apron hides the front of ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The apron hides the front of ${his} extreme corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`The apron hides the front of ${his} support band.`);
				}
				break;
			case "a cybersuit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`A corset wraps the bodysuit snugly.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`An extreme corset wraps the bodysuit tightly.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden under ${his} bodysuit.`);
				}
				break;
			case "a tight Imperial bodysuit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`A corset wraps the bodysuit snugly.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`An extreme corset wraps the bodysuit tightly.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden under ${his} bodysuit.`);
				}
				break;
			case "a bunny outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} bunny outfit has an integral corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} bunny outfit has extreme corsetage built into it.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} teddy.`);
				}
				break;
			case "a slutty maid outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} maid uniform has an integral corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} maid uniform has extreme corsetage built into it.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} maid uniform.`);
				}
				break;
			case "a nice maid outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} maid uniform has an integral corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} uniform has extreme corsetage built into it.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} maid uniform.`);
				}
				break;
			case "a slutty nurse outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} jacket totally conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} jacket totally conceals ${his} absurd corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} jacket.`);
				}
				break;
			case "a nice nurse outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} scrubs totally conceal ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} scrubs totally conceal ${his} absurd corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} scrubs.`);
				}
				break;
			case "a schoolgirl outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The outline of ${his} corset can be seen through ${his} blouse.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The outline of ${his} absurd corsetage can be seen through ${his} blouse.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band can be seen under ${his} blouse.`);
				}
				break;
			case "a hanbok":
			case "a kimono":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The handsome silk completely conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The handsome silk completely conceals ${his} absurd corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`The handsome silk completely conceals ${his} support band.`);
				}
				break;
			case "a klan robe":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is hidden by ${his} long robes.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} absurd corsetage is hidden by ${his} long robes.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} long robes.`);
				}
				break;
			case "a burqa":
			case "a hijab and abaya":
			case "a niqab and abaya":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is properly hidden along with everything else.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} absurd corsetage is properly hidden along with everything else.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is properly hidden along with everything else.`);
				}
				break;
			case "a gothic lolita dress":
			case "a Santa dress":
				if (slave.bellyAccessory === "a corset") {
					r.push(`The thick fabric of ${his} dress conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`The thick fabric of ${his} dress conceals ${his} extreme corset.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`The thick fabric of ${his} dress conceals ${his} support band.`);
				}
				break;
			case "a military uniform":
			case "a mounty outfit":
			case "a red army uniform":
			case "a schutzstaffel uniform":
			case "a slutty schutzstaffel uniform":
			case "a police uniform":
			case "a confederate army uniform":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} tunic conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} tunic conceals ${his} extreme corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} tunic.`);
				}
				break;
			case "a biyelgee costume":
			case "a dirndl":
			case "a long qipao":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} dress conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} dress conceals ${his} extreme corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} dress.`);
				}
				break;
			case "battlearmor":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} armor conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} armor conceals ${his} extreme corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden under ${his} armor.`);
				}
				break;
			case "Imperial Plate":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} armor conceals ${his} corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} armor conceals ${his} extreme corsetage.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden under ${his} armor.`);
				}
				break;
			case "lederhosen":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is built into the suspenders of ${his} outfit.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is built into the suspenders of ${his} outfit.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} outfit.`);
				}
				break;
			case "battledress":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is strapped on top of ${his} shirt.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} ridiculous corset is strapped on top of ${his} shirt.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} shirt.`);
				}
				break;
			case "harem gauze":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset, though functional, is covered with little bells and charms that glint through the gauze.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} absurd corset, though cruelly functional, is covered with little bells and charms that glint through the gauze.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is covered with little bells and charms that glint through the gauze.`);
				}
				break;
			case "slutty jewelry":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is ${his} only real piece of clothing.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corset is ${his} only real piece of clothing.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is ${his} only real piece of clothing.`);
				}
				break;
			case "a maternity dress":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is hidden by ${his} blouse.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is hidden by ${his} blouse.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} blouse.`);
				}
				break;
			case "stretch pants and a crop-top":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is completely exposed between ${his} top and bottom.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is completely exposed between ${his} top and bottom.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is left completely exposed between ${his} top and bottom.`);
				}
				break;
			case "a nice pony outfit":
			case "a slutty pony outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset compliments ${his} outfit nicely.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage compliments ${his} outfit nicely.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden within ${his} outfit.`);
				}
				break;
			case "a tube top and thong":
			case "striped underwear":
			case "leather pants and a tube top":
			case "sport shorts and a sports bra":
			case "a slutty klan robe":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is completely exposed between ${his} top and bottom.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is completely exposed between ${his} top and bottom.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is completely exposed between ${his} top and bottom.`);
				}
				break;
			case "a bra":
			case "a striped bra":
			case "a sports bra":
			case "a thong":
			case "panties":
			case "a tube top":
			case "a skimpy loincloth":
			case "boyshorts":
			case "cutoffs":
			case "jeans":
			case "sport shorts":
			case "leather pants":
			case "leather pants and pasties":
			case "panties and pasties":
			case "pasties":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is completely exposed.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is completely exposed.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is completely exposed.`);
				}
				break;
			case "a button-up shirt and panties":
			case "a button-up shirt":
			case "a sweater":
			case "a tank-top":
			case "a sweater and panties":
			case "a t-shirt":
			case "a tank-top and panties":
			case "a t-shirt and thong":
			case "an oversized t-shirt and boyshorts":
			case "an oversized t-shirt":
			case "a t-shirt and jeans":
			case "sport shorts and a t-shirt":
			case "a t-shirt and panties":
			case "a sweater and cutoffs":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} sturdy corset is hidden by ${his} clothing.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corsetage is hidden by ${his} clothing.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is hidden by ${his} clothing.`);
				}
				break;
			case "a bimbo outfit":
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is a fun color and compliments ${his} slutty appearance.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} absurd corset is a fun color and compliments ${his} slutty appearance.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is a fun color and compliments ${his} slutty appearance.`);
				}
				break;
			default:
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} corset is ${his} only real piece of clothing.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} extreme corset is ${his} only real piece of clothing.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is ${his} only real piece of clothing.`);
				}
		}
	}

	return r.join(" ");
};
