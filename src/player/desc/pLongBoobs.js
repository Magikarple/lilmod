App.Desc.Player.boobs = function(PC = V.PC) {
	const r = [];

	const implantRatio = PC.boobsImplant / PC.boobs;
	const nipColor = nippleColor(PC);
	const {girlP} = getPronouns(PC).appendSuffix("P");

	function boobShape() {
		const r = [];
		switch (PC.boobShape) {
			case "perky":
				if (PC.boobs >= 12000) {
					r.push(`It's hard to tell at this size, but from the right angle, you can still see their perkiness in how they rest against you.`);
				} else if (PC.boobs >= 5000) {
					r.push(`Their natural perkiness has helped them resist their enormous size.`);
				} else if (PC.boobs >= 2500) {
					r.push(`They remain perky, even at their substantial size, defying gravity as they rest heavily against your chest and each other.`);
				} else if (PC.boobs >= 1000) {
					r.push(`They're perky, despite their large size, and your nipples point slightly upward.`);
				} else if (PC.boobs >= 500) {
					r.push(`They're full and perky, with your nipples pointing upward.`);
				} else {
					r.push(`They are nice and perky, with your nipples pointing upward.`);
				}
				break;
			case "downward-facing":
				if (PC.boobs > 12000) {
					r.push(`Naturally downward-facing, they are so big that your nipples always point directly down. They've become huge pendulums of soft flesh, since gravity pulls most of their mass past your crotch.`);
				} else if (PC.boobs > 5000) {
					r.push(`They're huge pillows of soft flesh, distorted by gravity and where they rest against your stomach and each other. Naturally downward-facing, they are so big that your nipples point directly down.`);
				} else if (PC.boobs > 2500) {
					r.push(`They're orbs of soft flesh, resting heavily against your stomach and each other. Since they are naturally downward-facing, most of their mass rests low.`);
				} else if (PC.boobs > 1000) {
					r.push(`They're not attractively shaped, with your nipples pointing downward more strongly than they should be.`);
				} else if (PC.boobs > 500) {
					r.push(`They're not attractively shaped, with your nipples pointing down.`);
				} else {
					r.push(`They're not attractively shaped, with your nipples pointing down despite your size.`);
				}
				break;
			case "torpedo-shaped":
				if (PC.boobs > 12000) {
					r.push(`They are naturally torpedo-shaped, which you can tell by the way they are sticking out more than a`);
					if (V.showInches === 2) {
						r.push(`yard`);
					} else {
						r.push(`meter`);
					}
					r.push(`in front of you.`);
				} else if (PC.boobs > 5000) {
					r.push(`They're huge promontories of soft flesh and their natural torpedo shape remains to a certain extent. Your breasts reach an incredibly long way out from your chest and sway lewdly with your slightest motion.`);
				} else if (PC.boobs > 2500) {
					r.push(`They're orbs of soft flesh, resting heavily against your chest and each other. Their natural torpedo shape is distorted by their weight, but they still project out quite a distance in front of you.`);
				} else if (PC.boobs > 1000) {
					r.push(`They're strongly torpedo-shaped despite their large size, projecting a long way from your chest. They sway lewdly with your movements.`);
				} else if (PC.boobs > 500) {
					r.push(`They're strongly torpedo-shaped, projecting a long way from your chest. They sway cutely with your movements.`);
				} else {
					r.push(`They're strongly torpedo-shaped despite their small size, projecting some way from your chest.`);
				}
				break;
			case "wide-set":
				if (PC.boobs > 12000) {
					r.push(`They are naturally wide-set, which can be seen in the way they stick out more than a`);
					if (V.showInches === 2) {
						r.push(`yard`);
					} else {
						r.push(`meter`);
					}
					r.push(`to either side of your body.`);
					if (PC.belly >= 5000) {
						r.push(`Your belly protrudes lewdly between them.`);
					}
				} else if (PC.boobs > 5000) {
					r.push(`They're huge pillows of soft flesh whose natural wide-set shape`);
					if (PC.belly >= 5000) {
						r.push(`forces them to extend massively from your sides when parted by your belly.`);
					} else {
						r.push(`somehow keeps them from touching despite their mass.`);
					}
				} else if (PC.boobs > 2500) {
					r.push(`They're orbs of soft flesh whose natural wide-set shape`);
					if (PC.belly >= 5000) {
						r.push(`causes them to rest to either side of your belly.`);
					} else {
						r.push(`obscures your upper arm${hasBothArms(PC) ? "s" : ""}. They rest without natural cleavage despite their size.`);
					}
				} else if (PC.boobs > 1000) {
					r.push(`They're wide-set, with their weight pointing each nipple away from your sternum.`);
				} else if (PC.boobs > 500) {
					r.push(`They're wide-set, with each nipple pointing away from your sternum.`);
				} else {
					r.push(`They're wide-set, with each nipple pointing somewhat sideways.`);
				}
				break;
			case "saggy":
				if (PC.boobs > 12000) {
					r.push(`They're vast armfuls of soft flesh that sag past your crotch. Your nipples are placed on their bottoms, pointed at the ground by the heavy mass of breastflesh above them.`);
				} else if (PC.boobs > 5000) {
					r.push(`They're huge pillows of soft flesh that sag past your navel. Your nipples are placed on their bottoms, pointed at the ground by the heavy mass of breastflesh above them.`);
				} else if (PC.boobs > 2500) {
					r.push(`They're orbs of soft flesh that sag almost to your navel. Your nipples are placed on their bottoms, pointed at the ground by the weight of breast above them.`);
				} else if (PC.boobs > 1000) {
					r.push(`They're heavy and saggy, pointing your nipples at the ground.`);
				} else if (PC.boobs > 500) {
					r.push(`They're not attractively shaped, with your nipples pointing down.`);
				} else {
					r.push(`They're rather deflated, with your nipples pointing down despite your size.`);
				}
				break;
			default:
				if (PC.boobs > 12000) {
					r.push(`They're vast armfuls of soft flesh, distorted by gravity and happy to swallow up anything that pushes against them.`);
				} else if (PC.boobs > 5000) {
					r.push(`They're huge pillows of soft flesh, distorted by gravity and where they rest against your stomach and each other.`);
				} else if (PC.boobs > 2500) {
					r.push(`They're orbs of soft flesh, resting heavily against your chest and each other.`);
				} else if (PC.boobs > 1000) {
					r.push(`They're soft and round, resting heavily against your chest and each other.`);
				} else if (PC.boobs > 500) {
					r.push(`They're nice and soft and rest naturally against your chest.`);
				} else {
					r.push(`They're nicely rounded and rest naturally.`);
				}
		}
		return r.join(" ");
	}

	function boobSpheres() {
		const r = [];
		if (PC.boobs >= 12000) {
			r.push(`They're sore orbs of flesh stretched taut over ridiculous implants that weigh heavily upon anything they rest on. They barely register as a part of your body, but rather as oversized accessories hung mercilessly on your chest.`);
		} else if (PC.boobs >= 6000) {
			r.push(`They're huge orbs of stretched flesh, resting heavily against your stomach and each other, and extremely obvious implants. Since you have so little actual breast tissue surrounding them, it looks like you have a pair of beachballs stuck to your chest.`);
		} else if (PC.boobs >= 4000) {
			r.push(`They're firm orbs of stretched flesh, resting heavily against your chest and each other, and extremely obvious implants. Since you have so little actual breast tissue surrounding them, it looks like you have a pair of overinflated balloons stuck to your chest.`);
		} else if (PC.boobs >= 2000) {
			r.push(`They're unnaturally, round, hard to the touch, and extremely obvious implants. Since you have so little actual breast tissue surrounding them, it looks like you have a pair of balloons stuck to your chest.`);
		} else if (PC.boobs >= 1000) {
			r.push(`They're unnaturally round, hang heavily from your chest, and quite clearly implants. Since you have so little actual breast tissue surrounding them, it looks like you have a pair of literal melons stuck to your chest.`);
		} else {
			r.push(`They're unnaturally round and contain so little actual breast tissue that they appear attached to your chest instead of part of it.`);
		}
		return r.join(" ");
	}

	function boobVolume() {
		const r = [];
		if (PC.boobs >= 300) {
			r.push(`They are about ${num(PC.boobs)} CCs each`);
			if (PC.boobShape === "spherical") {
				r.push(`and consist primarily of your ${num(PC.boobsImplant)} CC ${PC.boobsImplantType === "normal" ? "breast" : `${PC.boobsImplantType}`} implants.`);
			} else {
				if (PC.boobsImplant > 0) {
					r.push(r.pop() + `, including your ${num(PC.boobsImplant)} CC ${PC.boobsImplantType === "normal" ? "breast" : `${PC.boobsImplantType}`} implants`);
				}
				r.push(r.pop() + `.`);
			}
		}
		return r.join(" ");
	}

	function boobFreckles() {
		const r = [];
		if (PC.markings === "freckles") {
			if (PC.boobs >= 400) {
				r.push(`The tops of your breasts and your cleavage are lightly freckled.`);
			} else {
				r.push(`Your chest is covered in a light spray of freckles.`);
			}
		} else if (PC.markings === "heavily freckled") {
			if (PC.boobs >= 2000) {
				r.push(`Your breasts are covered in freckles, but they're so big that the freckles are spaced widely across the breadth of each boob.`);
			} else if (PC.boobs >= 400) {
				r.push(`Your breasts are covered in freckles, which are particularly dense in the cleft between them.`);
			} else {
				r.push(`Your chest is covered in dense freckles.`);
			}
		}
		return r.join(" ");
	}

	function nipples() {
		const r = [];

		if (isHorny(PC)) {
			switch (PC.nipples) {
				case "tiny":
					r.push(`You have stiff little nubs ${areolae()}.`);
					break;
				case "flat":
					r.push(`You have stiff little bumps ${areolae()}`);
					break;
				case "puffy":
					r.push(`You have puffy and erect nipples, ${areolae()}`);
					break;
				case "partially inverted":
				case "inverted":
					r.push(`Your nipples are stiffly erect and ${areolae()} They'd be inverted if you weren't so horny right now.`);
					break;
				case "huge":
					if (PC.boobs - PC.boobsImplant > 7500) {
						r.push(`Your nipples are in proportion with your breasts: they're stiffly erect and`);
						if (PC.height < 160 && hasAnyArms(PC)) {
							r.push(`almost as large as your fist${hasBothArms(PC) ? "s" : ""}.`);
						} else {
							r.push(`large enough to be jerked off.`);
						}
						r.push(`The sensitive protrusions are`);
					} else {
						r.push(`Your nipples are enormously erect and`);
					}
					r.push(areolae());
					break;
				case "fuckable":
					r.push(`Your nipples are swollen shut and ${areolae()}`);
					break;
				default:
					r.push(`Your nipples are stiffly erect and ${areolae()}`);
			}
		} else {
			switch (PC.nipples) {
				case "tiny":
					if (PC.title !== 1 || PC.boobs >= 300 || PC.areolae !== 0) { // Don't talk about male nipples.
						r.push(`You have tiny little nubs`);
						r.push(areolae());
					}
					break;
				case "flat":
					if (PC.piercing.nipple.weight !== 0) {
						r.push(`Your nipples have been pulled flat from the constant tug of your oversized implants. They are held back by piercings and`);
					} else {
						r.push(`Your nipples have been pulled flat from the constant tug of your oversized implants. What little is recognizable is`);
					}
					r.push(areolae());
					break;
				case "puffy":
					r.push(`You have puffy nipples with a swell of soft flesh around each,`);
					r.push(areolae());
					break;
				case "partially inverted":
					if (PC.piercing.nipple.weight !== 0) {
						r.push(`You have partially inverted nipples, currently held out by your piercings,`);
					} else {
						r.push(`Your nipples are partially inverted and blend in with the front of your breasts. What can be seen is`);
					}
					r.push(areolae());
					break;
				case "inverted":
					if (PC.piercing.nipple.weight !== 0) {
						r.push(`Your nipples are completely inverted, or would be if they weren't pierced. The extracted nubs are`);
					} else {
						r.push(`Your nipples are completely inverted: they have been swallowed up by the surrounding breastflesh. The area is`);
					}
					r.push(areolae());
					break;
				case "huge":
					if (PC.boobs - PC.boobsImplant > 7500) {
						r.push(`Your nipples are in proportion with your breasts: they've grown`);
						if (PC.height < 160 && hasAnyArms(PC)) {
							r.push(`almost as large as your fist${hasBothArms(PC) ? "s" : ""}.`);
						} else {
							r.push(`large enough to be jerked off.`);
						}
					} else if (hasAnyArms(PC)) {
						r.push(`Your nipples are the size of the last joint of your thumb${hasBothArms(PC) ? "s" : ""} when erect.`);
					} else {
						r.push(`Your nipples are of significant size.`);
					}
					r.push(`The jutting protrusions are`);
					r.push(areolae());
					break;
				case "fuckable":
					r.push(`You have a pair of deep holes where your nipples should be. What they are for is completely obvious. The penetrable slits are`);
					r.push(areolae());
					break;
				default:
					if (PC.title !== 1 || PC.boobs >= 300 || PC.areolae !== 0) {
						r.push(`You have normal nipples`);
						r.push(areolae());
					}
			}
		}
		return r.join(" ");
	}

	function areolae() {
		const r = [];
		switch (PC.areolae) {
			case 1:
				r.push(`surrounded by large, lovely circles of ${nipColor} skin.`);
				break;
			case 2:
				r.push(`surrounded by unusually wide, eye-catching circles of ${nipColor} skin.`);
				break;
			case 3:
				r.push(`surrounded by unnaturally broad ${nipColor} areolae that cover much of the ${PC.boobShape === "saggy" || PC.boobShape === "downward-facing" ? 'bottom' : 'front'} of your breasts.`);
				break;
			case 4:
				r.push(`surrounded by unnaturally huge ${nipColor} areolae that almost entirely cover the ${PC.boobShape === "saggy" || PC.boobShape === "downward-facing" ? 'bottom' : 'front'} of your breasts.`);
				break;
			default:
				r.push(`surrounded by a minimal ${nipColor} areolae.`);
		}
		if (PC.areolaeShape === "heart") {
			r.push(`Your areolae have been reshaped into hearts.`);
		} else if (PC.areolaeShape === "star") {
			r.push(`Your areolae have been reshaped into stars.`);
		} else if (PC.areolaeShape !== "circle") {
			r.push(`Your areolae are ${PC.areolaeShape}-shaped.`);
		}
		return r.join(" ");
	}

	function lactation() {
		const r = [];

		if (PC.lactation === 1) {
			if (PC.boobs >= 12000) {
				r.push(`Your breasts feel full and tender; this is likely a side effect of your lactation.`);
			} else if (PC.boobs >= 5000) {
				r.push(`Your breasts are tender and feel a little swollen; this is likely a side effect of your lactation.`);
			} else if (PC.boobs >= 2500) {
				r.push(`Your breasts feel even more enormous lately; this is likely a side effect of your lactation.`);
			} else if (PC.boobs >= 1000) {
				r.push(`Your breasts feel even more huge lately; this is likely a side effect of your lactation.`);
			} else if (PC.boobs >= 500) {
				r.push(`Your breasts feel bigger lately; likely a side effect of your lactation.`);
			} else if (PC.boobs >= 300) {
				r.push(`Your breasts feel a bit bigger lately; this is likely a side effect of your lactation.`);
			} else {
				if (PC.title === 1) {
					r.push(`Your chest feels swollen; the beads of milk forming on your nipples tells you why.`);
				} else {
					r.push(`Your nipples cap a pair of painfully swollen bumps; milk beads from them at the slightest provocation.`);
				}
			}
			if (PC.lactationAdaptation > 10) {
				r.push(`As if on demand, your milk starts to dribble down your tits.`);
				if (PC.lactationAdaptation > 150) {
					r.push(`Your body is so dedicated to producing milk that these breaks are a luxury.`);
				} else if (PC.lactationAdaptation > 50) {
					r.push(`Your body is so well-adapted to milk production that this is a regular affair now.`);
				} else {
					r.push(`Your body has become accustomed to milk production.`);
				}
			}
		} else if (PC.lactation > 1) {
			if (PC.boobs >= 12000) {
				r.push(`Your breasts feel bloated and tender; the trickle of milk running from your nipples tells you it's time to drain them again.`);
			} else if (PC.boobs >= 300) {
				r.push(`Your breasts are painfully engorged; the trickle of milk running from your nipples tells you it's time to drain them again.`);
			} else if (PC.title === 1) {
				r.push(`Your chest is painfully bloated; the trickle of milk running from your nipples tells you it's time to drain them again.`);
			} else {
				r.push(`Your nipples cap a pair of painfully swollen bumps; milk constantly trickles from them unless you regularly milk yourself.`);
			}
			if (PC.lactationAdaptation > 10) {
				if (PC.lactationAdaptation > 150) {
					r.push(`Your body is so dedicated to producing milk that this break only lasts minutes. You have to stay attached to a milking machine to truly relieve the stress.`);
				} else if (PC.lactationAdaptation > 50) {
					r.push(`Your body is so well-adapted to milk production that this only results in fleeting relief.`);
				} else {
					r.push(`Your body has become accustomed to milk production that this is become annoyingly frequent.`);
				}
			}
		}

		return r.join(" ");
	}

	function boobAccessibility() {
		const r = [];
		if (PC.boobs >= 25000) {
			if (V.boobAccessibility === 1) {
				r.push(`On the bright side, you've had the penthouse remodeled for ${girlP}s with such substantial bosoms already, so fitting through doors and using furniture isn't a concern.`);
			} else if (V.pregAccessibility === 1 || V.ballsAccessibility === 1 || V.buttAccessibility === 1) {
				r.push(`Still, the halls and doors of the penthouse have been remodeled to accommodate other enormous assets, so there's plenty of room for your substantial bosom. Too bad everything is still at the perfect height to jab you in the tits.`);
			} else {
				r.push(`Even worse, the penthouse was not designed to handle ${girlP}s with bosoms as substantial as yours; you crowd whichever halls or doors you use and find an uncomfortable number of objects poking and prodding your tits.`);
				if (PC.boobsImplant >= 600000) {
					r.push(`But with implants wider than a standard doorway, you aren't keen on trying to force them through, <span class="red">leaving you trapped inside your room.</span>`);
				} else if (PC.boobs >= 1000000) {
					r.push(`In fact, you're so busty that any efforts to cram your tits through your doorway result in them plugging said doorway, effectively <span class="red">sealing you inside your room.</span>`);
				} else if (PC.boobsImplant >= 599000) {
					r.push(`The only way to get in and out of your bedroom is to do so one tit at a time; unless you wanted to be trapped in your own home, it might not be the best idea to size up your implants much more.`);
				} else if (PC.boobs >= 995000) {
					r.push(`It's become really difficult to feed the entirety of your breastflesh through the doorway when you need to pass through; you are at risk of plugging it should you grow much more.`);
				}
			}
		}
		return r.join(" ");
	}

	function weight(sizeLimit, bodySize, dwarfSize) {
		const r = [];

		if ((PC.physicalAge <= 12 && PC.boobs > 100000 + (PC.muscles * 50)) ||
			(PC.physicalAge < 18 && PC.boobs > 250000 + (PC.muscles * 100)) ||
			(PC.physicalAge >= 18 && PC.boobs > 500000 + (PC.muscles * 200))) {
			r.push(`Your tits are so enormous you've lost the ability to lift them and`);
			if (isMovable(PC)) {
				r.push(`must use a wheelchair to cart yourself around.`);
				r.push(boobAccessibility());
			} else {
				r.push(`are now stuck in bed. You'll never be without pillows, however.`);
			}
		} else if (PC.boobs > sizeLimit) {
			r.push(`Your tits are so heavy that it makes moving around difficult.`);
			if (canWalk(PC)) {
				if (PC.muscles > 95) {
					r.push(`However, you're so powerfully built that you can comfortably stand up straight, though you definitely feel it in the morning.`);
				} else if (PC.muscles > 30) {
					r.push(`Your back is strong enough to support their weight, but you frequently catch yourself slouching under their weight, so you may be nearing your limit.`);
				} else {
					r.push(`It takes a lot of effort to keep upright with them, so you're most comfortable letting them rest on something when you have the chance.`);
				}
			} else if (PC.boobs >= dwarfSize) {
				r.push(`It's not surprising really, given they are each bigger than you are.`);
			} else if (PC.boobs >= bodySize) {
				r.push(`It's not surprising, given they are each as big as you are.`);
			} else {
				r.push(`It's not surprising, given you're about half boob.`);
			}
			r.push(boobAccessibility());
		} else if (PC.boobs > 5000) {
			r.push(`Your back gets a serious workout from having to lug your tits around, but the biggest nuisance is just how much they get in the way of your day to day activities.`);
			r.push(boobAccessibility());
		}
		return r.join(" ");
	}

	const oversizedImplants = PC.boobShape === "spherical" ? boobSpheres() : `They're mostly implant, and it shows; with so little natural breast tissue to support them, they look like a pair of balloons attached to your chest.`;
	const obviousImplants = `They are kind of rounded and much too perky for their size to pass as real.`;

	// improve this block!
	// block unfinished for now!
	if (PC.boobs >= 90000) {
		r.push(`you have a <span class="orange">pair of door-jamming breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 70000) {
		r.push(`you have a <span class="orange">pair of door-crowding breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 55000) {
		r.push(`you have a <span class="orange">pair of lap-filling breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 40000) {
		r.push(`you have a <span class="orange">pair of beachball-sized breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 25000) {
		r.push(`you have a <span class="orange">pair of figure-dominating breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 15000) {
		r.push(`you have a <span class="orange">pair of arm-filling breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 10000) {
		r.push(`you have a <span class="orange">pair of obscenely massive breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 9000) {
		r.push(`you have a <span class="orange">pair of unbelievable ZZZ-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 8500) {
		r.push(`you have a <span class="orange">pair of unbelievable ZZ-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 8000) {
		r.push(`you have a <span class="orange">pair of mind-blowing Z-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 7500) {
		r.push(`you have a <span class="orange">pair of mind-blowing Y-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 7000) {
		r.push(`you have a <span class="orange">pair of spectacular X-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 6500) {
		r.push(`you have a <span class="orange">pair of spectacular V-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 5500) {
		r.push(`you have a <span class="orange">pair of attention-grabbing U-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 5100) {
		r.push(`you have a <span class="orange">pair of unmissable T-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 4700) {
		r.push(`you have a <span class="orange">pair of astounding S-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 4300) {
		r.push(`you have a <span class="orange">pair of unreal R-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 3950) {
		r.push(`you have a <span class="orange">pair of shocking Q-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 3600) {
		r.push(`you have a <span class="orange">pair of disproportionate P-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 3250) {
		r.push(`you have a <span class="orange">pair of awe-inspiring O-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 2900) {
		r.push(`you have a <span class="orange">pair of tremendous N-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 2600) {
		r.push(`you have a <span class="orange">pair of magnificent M-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 2300) {
		r.push(`you have a <span class="orange">pair of stupendous L-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 2050) {
		r.push(`you have a <span class="orange">pair of titanic K-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 1800) {
		r.push(`you have a <span class="orange">pair of enormous J-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 1600) { // could use more breast descriptions on sizes here and up
		r.push(`you have a <span class="orange">pair of massive I-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 1400) {
		r.push(`you have a <span class="orange">pair of huge H-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They refuse to come to a rest once they get moving.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 1200) {
		r.push(`you have a <span class="orange">pair of huge G-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(obviousImplants);
		} else {
			r.push(boobShape());
			r.push(`They tend to bounce everywhere when you fuck your slaves.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 1000) {
		r.push(`you have a <span class="orange">pair of hefty F-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(oversizedImplants);
		} else if (implantRatio >= 0.50) {
			r.push(`They're not obviously implants, though the way they move when you fuck a slave pins them as such.`);
		} else {
			r.push(boobShape());
			r.push(`They bounce lewdly as you fuck your slaves.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 800) {
		r.push(`you have a <span class="orange">healthy pair of DD-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(`They're mostly implant, and it shows.`);
		} else if (implantRatio >= 0.50) {
			r.push(`Your implants are well done, so it's not too obvious they're fake.`);
		} else if (implantRatio >= 0.25) {
			r.push(boobShape());
			r.push(`They jiggle with a pleasant bounce when in motion, though they defy gravity a bit too much their size.`);
		} else {
			r.push(boobShape());
			r.push(`They jiggle pleasantly with your every move.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 650) {
		r.push(`you have a <span class="orange">healthy pair of D-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(`They're mostly implant, but done well, so it's only obvious when they don't move with you.`);
		} else if (implantRatio >= 0.50) {
			r.push(`They're a bit too firm to look real and don't bounce at all when you fuck your slaves.`);
		} else if (implantRatio >= 0.25) {
			r.push(boobShape());
			r.push(`They bounce pleasantly when in motion, though they rest a little too high for their size.`);
		} else {
			r.push(boobShape());
			r.push(`They bounce pleasantly as you fuck your slaves.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 500) {
		r.push(`you have a <span class="orange">pair of C-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(`They're mostly implant, but done well, so it's only obvious when they don't move with you.`);
		} else if (implantRatio >= 0.50) {
			r.push(`They're a bit too firm to look real and don't bounce at all when you fuck your slaves.`);
		} else if (implantRatio >= 0.25) {
			r.push(`They're kind of round due to your implants and don't bounce at all when you fuck your slaves.`);
		} else {
			r.push(boobShape());
			r.push(`They bounce a little when you fuck your slaves.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 400) {
		r.push(`you have a <span class="orange">pair of B-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(`They're mostly implant, and given their size, that's pretty obvious.`);
		} else if (implantRatio >= 0.50) {
			r.push(`They're perky, but a bit too firm to look real and don't bounce at all when you fuck your slaves.`);
		} else if (implantRatio >= 0.25) {
			r.push(`They're kind of round due to your implants and don't bounce at all when you fuck your slaves.`);
		} else {
			r.push(boobShape());
			r.push(`They have the slightest little bounce when you fuck your slaves.`);
		}
		r.push(boobVolume());
	} else if (PC.boobs >= 300) {
		r.push(`you have a <span class="orange">tiny pair of A-cup breasts.</span>`);
		if (implantRatio >= 0.75) {
			r.push(`It's pretty obvious that you're flat and choose to stuff what little boob you had full of implant.`);
		} else if (implantRatio >= 0.50) {
			r.push(`They're perky, but a bit too firm to look real.`);
		} else if (implantRatio >= 0.25) {
			r.push(`They're kind of round due to your implants, but that's not surprising given their size.`);
		} else {
			r.push(boobShape());
		}
		r.push(boobVolume());
	} else if (PC.title === 1) {
		r.push(`you have a <span class="orange">masculine chest.</span>`);
	} else {
		r.push(`you have nothing in the breast department. You're <span class="orange">completely flat.</span>`);
	}

	/*
	if (PC.boobs >= 1600) {
		r.push(boobShape());
		r.push(boobVolume());
	}
	*/
	r.push(
		boobFreckles(),
		nipples()
	);
	if (PC.physicalAge <= 12) {
		r.push(weight(8000, 20000, 100000));
	} else if (PC.physicalAge < 18) {
		r.push(weight(15000, 30000, 250000));
	} else { // PC.physicalAge >= 18
		r.push(weight(25000, 40000, 500000));
	}
	r.push(lactation());

	return r.join(" ");
};
