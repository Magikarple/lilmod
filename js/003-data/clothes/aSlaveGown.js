App.Data.clothes.set("a slave gown",
	{
		name: "Slave gown",
		exposure: 0,
		fs: {loves: new Set(["FSBodyPurist"])},
		desc: {
			summary: function(slave) {
				const r = [];
				const {He, he, his} = getPronouns(slave);
				const bothFeet = hasBothLegs(slave);
				const feet = bothFeet ? "feet" : "foot";

				r.push(`a gorgeous affair`);
				if (isAmputee(slave)) {
					r.push(`tailored to favor ${his} lack of arms and legs.`);
				} else if (!hasAnyLegs(slave)) {
					r.push(`with cuts that offer tantalizing glimpses of delicate flesh.`);
				} else {
					r.push(`with cuts that offer tantalizing glimpses of delicate flesh.`);
					r.push(`${He} completes the look with`);
					switch (slave.shoes) {
						case "flats":
							if (bothFeet) {
								r.push(`a pair of fashionable slingback sandals.`);
							} else {
								r.push(`a fashionable slingback sandal.`);
							}
							break;
						case "boots":
							if (bothFeet) {
								r.push(`elegant worked leather boots.`);
							} else {
								r.push(`an elegant worked leather boot.`);
							}
							break;
						case "heels":
							if (bothFeet) {
								r.push(`kitten heels.`);
							} else {
								r.push(`a kitten heel.`);
							}
							break;
						case "pumps":
							if (bothFeet) {
								r.push(`sleek pumps.`);
							} else {
								r.push(`a sleek heel.`);
							}
							break;
						case "extreme heels":
							if (bothFeet) {
								r.push(`daring spike heels so high ${his} butt is at dick height.`);
							} else {
								r.push(`a daring spike heel so high ${he} can't even stand.`);
							}
							break;
						case "platform shoes":
							if (bothFeet) {
								r.push(`stylish platform shoes.`);
							} else {
								r.push(`a stylish platform shoe.`);
							}
							break;
						case "platform heels":
							if (bothFeet) {
								r.push(`elegant platform heels.`);
							} else {
								r.push(`an elegant platform heel.`);
							}
							break;
						case "extreme platform heels":
							if (bothFeet) {
								r.push(`elegant platform heels so high ${his} butt is at dick height.`);
							} else {
								r.push(`an elegant platform heel so high ${he} can't stand even with assistance.`);
							}
							break;
						default:
							r.push(`nothing on ${his} bare ${feet}.`);
					}
				}
				return r.join(" ");
			},
			upperFace: function(slave) {
				return `nice frameless glasses,`;
			},
			hStyle: function(slave) {
				const r = [];
				const {
					he, his
				} = getPronouns(slave);

				if (slave.fuckdoll === 0) {
					switch (slave.hStyle) {
						case "neat":
							if (slave.hLength > 100) {
								r.push(`cascades gorgeously down ${his} bare back.`);
							} else if (slave.hLength > 30) {
								r.push(`flows fashionably down ${his} bare back.`);
							} else if (slave.hLength > 10) {
								r.push(`follows the latest fashion.`);
							} else {
								r.push(`is gelled into a fashionable wave.`);
							}
							break;
						case "up":
							if (slave.hLength > 100) {
								r.push(`is piled up on ${his} head in a perfect 60's beehive.`);
							} else if (slave.hLength > 30) {
								r.push(`is piled up on ${his} head in a perfect 60's beehive.`);
							} else if (slave.hLength > 10) {
								r.push(`is piled up on ${his} head in a perfect 60's 'do.`);
							} else {
								r.push(`is combed back.`);
							}
							break;
						case "tails":
							if (slave.hLength > 100) {
								r.push(`is combed into beautiful long tails, one of which comes around to run down ${his} chest.`);
							} else if (slave.hLength > 30) {
								r.push(`is combed into beautiful tails, one of which comes around to fall between ${his} breasts.`);
							} else if (slave.hLength > 10) {
								r.push(`is combed into short tails set low at the nape of ${his} neck.`);
							} else {
								r.push(`is too short to be kept in proper tails, so it's simply combed back.`);
							}
							break;
						case "ponytail":
							if (slave.hLength > 100) {
								r.push(`is combed into a beautiful long ponytail, which swooshes as ${he} moves.`);
							} else if (slave.hLength > 30) {
								r.push(`is combed into a beautiful ponytail, which swooshes as ${he} moves.`);
							} else if (slave.hLength > 10) {
								r.push(`is combed into a short ponytail set low at the nape of ${his} neck.`);
							} else {
								r.push(`is too short to be kept in a proper ponytail, so it's simply combed back.`);
							}
							break;
						case "braided":
							if (slave.hLength > 100) {
								r.push(`is combed into beautiful long braids, one of which comes around to run down ${his} chest.`);
							} else if (slave.hLength > 30) {
								r.push(`is in beautiful braids, one of which comes around to fall between ${his} breasts.`);
							} else if (slave.hLength > 10) {
								r.push(`is combed into short braids set low at the nape of ${his} neck.`);
							} else {
								r.push(`is too short to be kept in proper braids, so it's simply combed back.`);
							}
							break;
						case "dreadlocks":
							if (slave.hLength > 100) {
								r.push(`is in dreadlocks, spreading out in many directions and almost reaching the ground.`);
							} else if (slave.hLength > 30) {
								r.push(`is in dreadlocks, spreading out in many directions.`);
							} else if (slave.hLength > 10) {
								r.push(`is in short dreadlocks, spreading around ${his} head.`);
							} else {
								r.push(`is too short to be kept in proper dreadlocks, so it's simply combed back.`);
							}
							break;
						case "curled":
							if (slave.hLength > 100) {
								r.push(`is curled into long flowing locks, almost reaching the ground.`);
							} else if (slave.hLength > 30) {
								r.push(`is curled into long locks, reaching past ${his} shoulders.`);
							} else if (slave.hLength > 10) {
								r.push(`is curled into short locks.`);
							} else {
								r.push(`is in short curls.`);
							}
							break;
						case "permed":
							if (slave.hLength > 100) {
								r.push(`is permed into long flowing curls, almost reaching the ground.`);
							} else if (slave.hLength > 30) {
								r.push(`is permed, reaching past ${his} shoulders.`);
							} else if (slave.hLength > 10) {
								r.push(`is permed into short waves.`);
							} else {
								r.push(`is permed into short curls.`);
							}
							break;
						case "luxurious":
							if (slave.hLength > 100) {
								r.push(`is in luxurious layered locks flowing gorgeously down ${his} bare back.`);
							} else if (slave.hLength > 30) {
								r.push(`is in luxurious layered locks flowing gorgeously down ${his} bare back.`);
							} else if (slave.hLength > 10) {
								r.push(`is in luxuriously styled short locks.`);
							} else {
								r.push(`is in luxuriously styled short locks.`);
							}
							break;
						case "strip":
							if (slave.hLength > 100) {
								r.push(`is shaved into a strip atop ${his} head that cascades magnificently down ${his} back.`);
							} else if (slave.hLength > 30) {
								r.push(`is shaved into a long braided strip.`);
							} else if (slave.hLength > 10) {
								r.push(`is shaved into a strip.`);
							} else {
								r.push(`is shaved into a mohawk.`);
							}
							break;
						case "undercut":
							if (slave.hLength > 100) {
								r.push(`is shaved on one side into a long undercut that falls well past ${his} breasts.`);
							} else if (slave.hLength > 30) {
								r.push(`is shaved to one side, the other half falling down to ${his} neck.`);
							} else if (slave.hLength > 10) {
								r.push(`is shaved to one side, the other half falling just over one eye.`);
							} else {
								r.push(`is shaved to one side in a pixie-like undercut.`);
							}
							break;
						case "bangs":
							if (slave.hLength > 100) {
								r.push(`is cut straight across ${his} face, hiding ${his} eyes.`);
							} else if (slave.hLength > 30) {
								r.push(`is cut straight across ${his} face, partially hiding ${his} eyes.`);
							} else if (slave.hLength > 10) {
								r.push(`is cut straight above ${his} eyebrows.`);
							} else {
								r.push(`is cut straight across ${his} forehead.`);
							}
							break;
						case "hime":
							if (slave.hLength > 100) {
								r.push(`cascades down ${his} bare back in a hime cut with shoulder-length side-locks.`);
							} else if (slave.hLength > 30) {
								r.push(`flows down ${his} bare back in a hime cut with cheek-length side-locks.`);
							} else if (slave.hLength > 10) {
								r.push(`is styled into a hime cut with cheek-length side-locks.`);
							} else {
								r.push(`is styled into a hime cut with cheek-length side-locks.`);
							}
							break;
						case "drills":
							if (slave.hLength > 100) {
								r.push(`is wound into enormous, exquisite coils that come to rest across ${his} chest.`);
							} else if (slave.hLength > 30) {
								r.push(`is wound into large coils which rest atop ${his} breasts.`);
							} else if (slave.hLength > 10) {
								r.push(`is in a pair of short coils.`);
							} else {
								r.push(`is too short to be kept in proper tails, so it's simply combed back.`);
							}
							break;
						case "crown braid":
							if (slave.hLength >= 100) {
								r.push(`is partly braided into a grand-looking crown braid that circles ${his} head, while the rest of it flows down to ${his} calves.`);
							} else if (slave.hLength >= 30) {
								r.push(`is partly braided into a elegant-looking crown braid that circles ${his} head, while the rest of it flows down to ${his} shoulders.`);
							} else if (slave.hLength >= 10) {
								r.push(`is braided into a small crown braid that circles ${his} head.`);
							} else {
								r.push(`is too short to be kept in a crown braid so it's simply combed back.`);
							}
							break;
						case "dutch braid":
							if (slave.hLength >= 100) {
								r.push(`is braided into a single dutch braid that reaches down to ${his} calves.`);
							} else if (slave.hLength >= 30) {
								r.push(`is braided into a single dutch braid that reaches down to below ${his} shoulders.`);
							} else if (slave.hLength >= 10) {
								r.push(`is braided into a single dutch braid that reaches down to just below ${his} neck.`);
							} else {
								r.push(`is too short to be kept in a dutch braid so it's simply combed back.`);
							}
							break;
						case "double dutch braid":
							if (slave.hLength >= 100) {
								r.push(`is braided into two dutch braids that reach down to ${his} calves.`);
							} else if (slave.hLength >= 30) {
								r.push(`is braided into two dutch braids that reach down to below ${his} shoulders.`);
							} else if (slave.hLength >= 10) {
								r.push(`is braided into two dutch braids that reach down to just below ${his} neck.`);
							} else {
								r.push(`is too short to be kept in dutch braids so it's simply combed back.`);
							}
							break;
						case "bald":
							r.push(`is completely bald.`);
					}
				}
				return r.join(" ");
			},
			earPiercing: function(slave) {
				const {He} = getPronouns(slave);
				return `${He}'s wearing lovely diamond earrings; the stones are cut in an alluring, feminine style.`;
			},
			corsetPiercing: function(slave) {
				const {his} = getPronouns(slave);
				return `they're revealed by the swooping back of ${his} gown and laced up with matching silk ribbon.`;
			},
			clothingCorset: function(slave) {
				const r =[];
				const {His, his} = getPronouns(slave);
				if (slave.bellyAccessory === "a corset") {
					r.push(`${His} gown has an elegant integral corset.`);
				} else if (slave.bellyAccessory === "an extreme corset") {
					r.push(`${His} gown has extreme corsetage built into it.`);
				} else if (slave.bellyAccessory === "a support band") {
					r.push(`${His} support band is concealed by ${his} gown.`);
				}
				return r.join(" ");
			},
			boobs: function(slave) {
				const r = [];
				const {his} = getPronouns(slave);
				const noun = App.Desc.boobBits.noun(slave.boobs, false, false);
				const adjNoun = App.Desc.boobBits.noun(slave.boobs, false, true);
				r.push(`${slave.slaveName}'s slave gown`);
				if (slave.boobs > 12000) {
					r.push(`is no longer able to cover ${his} ${adjNoun}. Instead, it has been redesigned to draw the eye to them.`);
				} else if (slave.boobs > 4000) {
					r.push(`is carefully engineered and is somehow able to cover the enormous mass of ${his} breasts.`);
				} else if (slave.boobs > 800) {
					r.push(`is carefully tailored, tastefully covering yet enhancing ${his} ${adjNoun}.`);
				} else if (slave.boobs < 300) {
					r.push(`is carefully tailored to closely hug ${his} flat chest.`);
				} else {
					r.push(`subtly accentuates ${his} ${noun}.`);
				}
				return r.join(" ");
			},
			belly: function(slave) {
				const r = [];
				const {his, him} = getPronouns(slave);
				const isBellyFluidLargest = (slave.bellyFluid >= slave.bellyPreg && slave.bellyFluid >= slave.bellyImplant);

				if (slave.belly >= 1000000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored using a huge quantity of material. When not worn, it looks more like a circus tent than something meant to be worn by a human being. On the slave, it gives ${him} a sensual, motherly look as it caresses ${his} unfathomable, hyper-swollen, ${slave.inflationType}-filled belly.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored using a huge quantity of material, and gives ${him} a sensual, motherly look as it caresses ${his} unfathomable, hyper-swollen, implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored using a huge quantity of material, and gives ${him} a sensual, motherly look as it caresses and supports ${his} unfathomable, hyper-swollen pregnant belly. Despite its size, it still has enough give to allow ${his} unborn children to bulge and squirm as desired.`);
					}
				} else if (slave.belly >= 750000) {
					if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored using a huge quantity of material. When not worn, it looks more like a couch cover than something meant to be worn by a human being. On ${him}, it gives ${him} a sensual, motherly look as it carefully caresses ${his} monolithic, ${slave.inflationType}-filled belly.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored using a huge quantity of material, and gives ${him} a sensual, motherly look as it carefully caresses ${his} monolithic, implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored using a huge quantity of material, and gives ${him} a sensual, motherly look as it carefully caresses and supports ${his} monolithic pregnant belly. It has enough give to allow ${his} unborn children to bulge and squirm as desired.`);
					}
				} else if (slave.belly >= 600000) {
					if (isBellyFluidLargest) {
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} titanic, implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses and supports ${his} titanic bulging pregnant belly.`);
					}
				} else if (slave.belly >= 450000) {
					if (isBellyFluidLargest) {
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} gigantic, implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses and supports ${his} gigantic pregnant belly.`);
					}
				} else if (slave.belly >= 300000) {
					if (isBellyFluidLargest) {
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} massive, implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses and supports ${his} massive pregnant belly.`);
					}
				} else if (slave.belly >= 120000) {
					if (isBellyFluidLargest) {
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} giant, implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses and supports ${his} giant pregnant belly.`);
					}
				} else if (slave.weight > 190) {
					r.push(`${slave.slaveName}'s slave gown is carefully tailored, accentuating and hugging every curve and fold of ${his} massively fat belly. Every motion in ${his} impressive gut is elegantly embraced by ${his} gown.`);
				} else if (slave.belly >= 15000 || (slave.bellyAccessory === "a huge empathy belly")) {
					if (slave.bellyAccessory === "a huge empathy belly") {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} huge pregnant belly.`);
					} else if (isBellyFluidLargest) {
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} huge, implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} huge pregnant belly.`);
					}
				} else if (slave.belly >= 10000 || (slave.bellyAccessory === "a large empathy belly")) {
					if (slave.bellyAccessory === "a large empathy belly") {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} big pregnant belly.`);
					} else if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, almost motherly look, as it carefully caresses ${his} hugely swollen belly.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} big, implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} big pregnant belly.`);
					}
				} else if (slave.weight > 160) {
					r.push(`${slave.slaveName}'s slave gown is carefully tailored, accentuating and hugging every curve and fold of ${his} hugely fat belly.`);
				} else if (slave.weight > 130) {
					r.push(`${slave.slaveName}'s slave gown is carefully tailored, accentuating and hugging every curve and fold of ${his} big fat belly.`);
				} else if (slave.belly >= 5000 || (slave.bellyAccessory === "a medium empathy belly")) {
					if (slave.bellyAccessory === "a medium empathy belly") {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} pregnant belly.`);
					} else if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} jiggling ${slave.inflationType}-filled belly.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} implant-filled belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} pregnant belly.`);
					}
				} else if (slave.weight > 95) {
					r.push(`${slave.slaveName}'s slave gown is carefully tailored, accentuating and hugging every curve of ${his} fat belly.`);
				} else if (slave.belly >= 1500 || slave.bellyAccessory === "a small empathy belly") {
					if (slave.bellyAccessory === "a small empathy belly") {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual, motherly look as it carefully caresses ${his} small belly.`);
					} else if (isBellyFluidLargest) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual look as it carefully caresses ${his} ${slave.inflationType}-swollen belly.`);
					} else if (slave.bellyImplant > 0) {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual look as it carefully caresses ${his} implant-rounded belly.`);
					} else {
						r.push(`${slave.slaveName}'s slave gown is carefully tailored, giving ${him} a sensual look as it carefully caresses ${his} growing belly.`);
					}
				} else if (slave.weight > 30) {
					r.push(`${slave.slaveName}'s slave gown is carefully tailored, accentuating and hugging every curve of ${his} chubby belly.`);
				} else if (slave.bellyPreg >= 100 || slave.bellyImplant >= 100) {
					r.push(`${slave.slaveName}'s slave gown is carefully tailored, accentuating and hugging even the slight bulge to ${his} lower belly.`);
				} else if (slave.muscles > 30) {
					r.push(`${slave.slaveName}'s slave gown is carefully tailored, accentuating and hugging ${his} ripped abs.`);
				}
				return r.join(" ");
			},
			crotch: function(slave) {
				const r = [];
				const {his} = getPronouns(slave);
				r.push(`${slave.slaveName}'s`);
				if (slave.dick > 6) {
					r.push(`lovely gown cannot hide the fact that something massive is lurking`);
					if (hasBothLegs(slave)) {
						r.push(`between ${his} legs.`);
					} else {
						r.push(`underneath it.`);
					}
				} else if (slave.dick > 3) {
					r.push(`cock tents the front of ${his} lovely gown.`);
				} else if (slave.dick > 0 && slave.vagina > -1) {
					r.push(`hermaphroditic genitalia are hidden by ${his} lovely gown.`);
				} else if (slave.dick > 0) {
					r.push(`cock is hidden by ${his} lovely gown.`);
				} else if (slave.vagina === -1) {
					r.push(`featureless groin is concealed by ${his} lovely gown.`);
				} else {
					r.push(`pussy is concealed by ${his} lovely gown.`);
				}
				return r.join(" ");
			},
			butt: function(slave) {
				const r = [];
				const {His, his} = getPronouns(slave);
				r.push(`${His} slave gown`);
				if (slave.butt > 10) {
					r.push(`is tailored as tastefully as possible for ${his} inhuman`);
				} else if (slave.butt > 6) {
					r.push(`is tailored as tastefully as possible for ${his} massive`);
				} else if (slave.butt > 3) {
					r.push(`is tailored to flatter ${his} big`);
				} else {
					r.push(`tastefully clings to ${his}`);
				}
				r.push(`buttocks.`);
				return r.join(" ");
			},
			buttplug: function(slave) {
				const r = [];
				const {His, his} = getPronouns(slave);
				if (slave.chastityAnus) {
					r.push(`${His} pretty gown hides ${his} anal chastity accessory underneath.`);
				} else {
					r.push(`Though ${his} gown is very pretty, ${his} asshole is bare beneath it.`);
				}
				return r.join(" ");
			},
		}
	}
);
