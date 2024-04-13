App.Desc.Player.waist = function(PC = V.PC) {
	const r = [];
	const {girlP, womanP} = getPronouns(PC).appendSuffix("P");
	const belly = bellyAdjective(PC);
	const lewdly = (PC.physicalAge > 12) ? "lewdly" : "vulgarly"; // avoids overuse of lewdly
	const womanly = PC.physicalAge <= 20 ? "girlish" : "womanly";
	const manly = PC.physicalAge <= 20 ? "boyish" : "manly";
	const overCapacity = (PC.belly > PC.pregAdaptation * 1000);

	// This needs to use perceivedGender() in the future
	if (PC.title === 1) { // male
		if (PC.waist > 95) {
			r.push(`a <span class="pink">wide, ${manly} waist,</span> befitting your masculinity,`);
			if (PC.weight > 30) {
				r.push(`that seems to be where most of your weight is settling.`);
			} else if (PC.weight < -30) {
				r.push(`even though you're very thin.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(wideWaistBelly(300000));
		} else if (PC.waist > 40) {
			r.push(`a <span class="pink">broad, ${manly} waist</span>`);
			if (PC.weight > 30) {
				r.push(`that looks wider than it is thanks to your weight.`);
			} else if (PC.weight < -30) {
				r.push(`despite your thin figure.`);
			} else {
				r.push(`that suits your masculinity.`);
			}
			r.push(wideWaistBelly(150000));
		} else if (PC.waist > 10) {
			r.push(`a <span class="pink">${manly} waist</span>`);
			if (PC.weight > 30) {
				r.push(`that gives you a truly masculine figure with your extra padding.`);
			} else if (PC.weight < -30) {
				r.push(`at risk of becoming ${womanly} due to your low weight.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -10) {
			r.push(`an androgynous waist`);
			if (PC.weight > 30) {
				r.push(`that looks at least a little ${manly} padded out by your weight.`);
			} else if (PC.weight < -30) {
				r.push(`that makes you look a little ${womanly} since you're so thin.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -40) {
			r.push(`an <span class="red">unbecoming, feminine waist</span>`);
			if (PC.weight > 30) {
				r.push(`that gives you a ${womanly} figure despite your extra padding.`);
			} else if (PC.weight < -30) {
				r.push(`that accentuates just how thin and ${womanly} you are.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -95) {
			r.push(`an <span class="red">ill-fitting, waspish waist</span> that gives you an uncomfortably ${womanly}`);
			if (PC.weight > 30) {
				r.push(`figure that's padded out by your extra weight.`);
			} else if (PC.weight < -30) {
				r.push(`figure that accentuates just how thin you are.`);
			} else {
				r.push(`figure.`);
			}
			if (PC.belly >= 5000) {
				r.push(`However, you're so gravid,`);
				if (PC.belly >= 450000) {
					r.push(narrowWaistLargeBelly());
				} else if (PC.belly >= 80000) {
					r.push(`your ${belly} belly is ${lewdly} visible from behind.`);
				} else if (PC.belly >= 5000) {
					r.push(`anyone behind you can see the edges of your ${belly} belly peeking around your sides.`);
				}
			}
		} else {
			r.push(`an <span class="red">absurdly narrow, and frankly disturbing, waist</span> that gives you a cartoonishly ${womanly}`);
			if (PC.weight > 30) {
				r.push(`figure made even more ludicrous by your extra weight.`);
			} else if (PC.weight < -30) {
				r.push(`figure made even more ludicrous by how thin you are is.`);
			} else {
				r.push(`figure.`);
			}
			if (PC.belly >= 2000) {
				r.push(`However, you're so gravid,`);
				if (PC.belly >= 450000) {
					r.push(narrowWaistLargeBelly());
				} else if (PC.belly >= 15000) {
					r.push(`your ${belly} belly is very visible from behind.`);
				} else if (PC.belly >= 5000) {
					r.push(`your ${belly} belly is ${lewdly} visible from behind.`);
				} else if (PC.belly >= 2000) {
					r.push(`anyone behind you can see the edges of your ${belly} belly peeking around your sides.`);
				}
			}
		}
	} else if (PC.title === 0) { // female
		if (PC.waist > 95) {
			r.push(`a badly <span class="red">masculine waist,</span> which truly ruins your`);
			if (PC.weight > 30) {
				r.push(`figure and makes you look fatter than you actually are.`);
			} else if (PC.weight < -30) {
				r.push(`figure despite your thinness.`);
			} else {
				r.push(`feminine figure.`);
			}
			r.push(wideWaistBelly(300000));
		} else if (PC.waist > 40) {
			r.push(`a <span class="red">broad waist</span> that makes you look`);
			if (PC.weight > 30) {
				r.push(`mannish and fatter than you really are.`);
			} else if (PC.weight < -30) {
				r.push(`mannish despite your lithe figure.`);
			} else {
				r.push(`rather mannish.`);
			}
			r.push(wideWaistBelly(150000));
		} else if (PC.waist > 10) {
			r.push(`an <span class="red">unattractive waist</span> that mars your womanly`);
			if (PC.weight > 30) {
				r.push(`figure and accentuates your weight.`);
			} else if (PC.weight < -30) {
				r.push(`figure despite your thinness.`);
			} else {
				r.push(`figure.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -10) {
			r.push(`an average waist for a`);
			if (PC.physicalAge <= 25) {
				r.push(`${girlP}`);
			} else {
				r.push(`${womanP}`);
			}
			r.push(`your age`);
			if (PC.weight > 30) {
				r.push(r.pop() + `, though you look a little thicker than you really are due to your weight.`);
			} else if (PC.weight < -30) {
				r.push(r.pop() + `, though it appears narrower than it really is since you're so thin.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -40) {
			r.push(`a lovely <span class="pink">feminine waist</span>`);
			if (PC.weight > 30) {
				r.push(`that gives you a ${womanly} figure despite your extra padding.`);
			} else if (PC.weight < -30) {
				r.push(`that accentuates just how thin you are.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -95) {
			r.push(`a <span class="pink">wasp waist</span> that gives you an alluring hourglass`);
			if (PC.weight > 30) {
				r.push(`figure that's padded out by your extra weight.`);
			} else if (PC.weight < -30) {
				r.push(`figure that accentuates just how thin you are.`);
			} else {
				r.push(`figure.`);
			}
			if (PC.belly >= 5000) {
				r.push(`However, you're so gravid,`);
				if (PC.belly >= 450000) {
					r.push(narrowWaistLargeBelly());
				} else if (PC.belly >= 80000) {
					r.push(`your ${belly} belly is ${lewdly} visible from behind.`);
				} else if (PC.belly >= 5000) {
					r.push(`anyone behind you can see the edges of your ${belly} belly peeking around your sides.`);
				}
			}
		} else {
			r.push(`an <span class="pink">absurdly narrow waist</span> that gives you a cartoonishly hourglass`);
			if (PC.weight > 30) {
				r.push(`figure made even more ludicrous by your extra weight.`);
			} else if (PC.weight < -30) {
				r.push(`figure made even more ludicrous by how thin you are is.`);
			} else {
				r.push(`figure.`);
			}
			if (PC.belly >= 2000) {
				r.push(`However, you're so gravid,`);
				if (PC.belly >= 450000) {
					r.push(narrowWaistLargeBelly());
				} else if (PC.belly >= 15000) {
					r.push(`your ${belly} belly is very visible from behind.`);
				} else if (PC.belly >= 5000) {
					r.push(`your ${belly} belly is ${lewdly} visible from behind.`);
				} else if (PC.belly >= 2000) {
					r.push(`anyone behind you can see the edges of your ${belly} belly peeking around your sides.`);
				}
			}
		}
	} else { // androgynous (not supported yet)
		if (PC.waist > 95) {
			r.push(`a badly <span class="red">masculine waist,</span> which truly ruins your`);
			if (PC.weight > 30) {
				r.push(`figure and makes you look fatter than you actually are.`);
			} else if (PC.weight < -30) {
				r.push(`figure despite your thinness.`);
			} else {
				r.push(`androgynous figure.`);
			}
			r.push(wideWaistBelly(300000));
		} else if (PC.waist > 40) {
			r.push(`a <span class="red">broad waist</span> that makes you look`);
			if (PC.weight > 30) {
				r.push(`mannish and fatter than you really are.`);
			} else if (PC.weight < -30) {
				r.push(`mannish despite your lithe figure.`);
			} else {
				r.push(`rather mannish.`);
			}
			r.push(wideWaistBelly(150000));
		} else if (PC.waist > 10) {
			r.push(`a <span class="orange">${manly} waist</span> that mars your androgynous`);
			if (PC.weight > 30) {
				r.push(`figure and accentuates your weight.`);
			} else if (PC.weight < -30) {
				r.push(`figure despite your thinness.`);
			} else {
				r.push(`figure.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -10) {
			r.push(`an <span class="pink">androgynous waist</span>`);
			if (PC.weight > 30) {
				r.push(`padded with a layer of soft flesh.`);
			} else if (PC.weight < -30) {
				r.push(`that accentuates just how thin you are.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -40) {
			r.push(`a lovely <span class="orange">feminine waist</span>`);
			if (PC.weight > 30) {
				r.push(`that gives you a ${womanly} figure with your extra padding.`);
			} else if (PC.weight < -30) {
				r.push(`that accentuates just how thin you are.`);
			} else {
				r.push(r.pop() + `.`);
			}
			r.push(normalWaistBelly());
		} else if (PC.waist >= -95) {
			r.push(`a <span class="red">wasp waist</span> that gives you an overly ${womanly}`);
			if (PC.weight > 30) {
				r.push(`figure that's padded out by your extra weight.`);
			} else if (PC.weight < -30) {
				r.push(`figure that accentuates just how thin you are.`);
			} else {
				r.push(`figure.`);
			}
			if (PC.belly >= 5000) {
				r.push(`However, you're so gravid,`);
				if (PC.belly >= 450000) {
					r.push(narrowWaistLargeBelly());
				} else if (PC.belly >= 80000) {
					r.push(`your ${belly} belly is ${lewdly} visible from behind.`);
				} else if (PC.belly >= 5000) {
					r.push(`anyone behind you can see the edges of your ${belly} belly peeking around your sides.`);
				}
			}
		} else {
			r.push(`an <span class="red">absurdly narrow waist</span> that gives you a cartoonishly ${womanly}`);
			if (PC.weight > 30) {
				r.push(`figure made even more ludicrous by your extra weight.`);
			} else if (PC.weight < -30) {
				r.push(`figure made even more ludicrous by how thin you are is.`);
			} else {
				r.push(`figure.`);
			}
			if (PC.belly >= 2000) {
				r.push(`However, you're so gravid,`);
				if (PC.belly >= 450000) {
					r.push(narrowWaistLargeBelly());
				} else if (PC.belly >= 15000) {
					r.push(`your ${belly} belly is very visible from behind.`);
				} else if (PC.belly >= 5000) {
					r.push(`your ${belly} belly is ${lewdly} visible from behind.`);
				} else if (PC.belly >= 2000) {
					r.push(`anyone behind you can see the edges of your ${belly} belly peeking around your sides.`);
				}
			}
		}
	}

	function wideWaistBelly(thresh) {
		const r = [];

		if (PC.belly >= thresh) {
			r.push(`However, you're so gravid,`);
			if (PC.belly >= 750000) {
				if (overCapacity) {
					r.push(`your original waistline is barely visible from behind; your ${belly} belly horribly distends it as it fills your body.`);
				} else {
					r.push(`your ${belly} belly is very visible from behind.`);
					r.push(pregAdaptedWaist());
				}
			} else if (PC.belly >= 600000) {
				if (overCapacity) {
					r.push(`your original waistline is only visible from behind; your ${belly} belly ${lewdly} distorts it as it bulges past your sides.`);
				} else {
					r.push(`your ${belly} belly is clearly visible from behind.`);
					r.push(pregAdaptedWaist());
				}
			} else if (PC.belly >= 450000) {
				if (overCapacity) {
					r.push(`your original waistline is only visible from behind; your ${belly} belly ${lewdly} distorts it as it extends past your sides.`);
				} else {
					r.push(`your ${belly} belly is visible from behind.`);
					r.push(pregAdaptedWaist());
				}
			} else {
				r.push(`your ${belly} belly is ${lewdly} still visible from behind.`);
			}
		}
		return r.join(" ");
	}

	function normalWaistBelly() {
		const r = [];

		if (PC.belly >= 10000) {
			r.push(`However, you're so gravid,`);
			if (PC.belly >= 750000) {
				if (overCapacity) {
					r.push(`your original waistline is barely visible from behind; your ${belly} belly horribly distends it as it fills your body.`);
				} else {
					r.push(`your ${belly} belly is very visible from behind.`);
					r.push(pregAdaptedWaist());
				}
			} else if (PC.belly >= 600000) {
				if (overCapacity) {
					r.push(`your original waistline is only visible from behind; your ${belly} belly ${lewdly} distorts it as it bulges past your sides.`);
				} else {
					r.push(`your ${belly} belly is clearly visible from behind.`);
					r.push(pregAdaptedWaist());
				}
			} else if (PC.belly >= 450000) {
				if (overCapacity) {
					r.push(`your original waistline is only visible from behind; your ${belly} belly ${lewdly} distorts it as it extends past your sides.`);
				} else {
					r.push(`your ${belly} belly is visible from behind.`);
					r.push(pregAdaptedWaist());
				}
			} else if (PC.belly >= 200000) {
				r.push(`your ${belly} belly is ${lewdly} still visible from behind.`);
			} else {
				r.push(`anyone behind you can see the edges of your ${belly} belly peeking around your sides.`);
			}
		}
		return r.join(" ");
	}

	function narrowWaistLargeBelly() {
		const r = [];

		if (PC.belly >= 750000) {
			if (overCapacity) {
				r.push(`your original waistline is only visible from behind; your ${belly} belly grotesquely distends it as it bulges around your narrow waist and continues on for`);
				if (PC.belly >= 1000000) {
					r.push(`quite the distance`);
				} else {
					r.push(`over half a`);
					if (V.showInches === 2) {
						r.push(`yard`);
					} else {
						r.push(`meter`);
					}
				}
				r.push(`farther from your sides.`);
			} else {
				if (PC.belly >= 1000000) {
					r.push(`a truly absurd amount`);
				} else {
					r.push(`over half a`);
					if (V.showInches === 2) {
						r.push(`yard`);
					} else {
						r.push(`meter`);
					}
				}
				r.push(`of belly is visible to either side of your narrow back.`);
				r.push(pregAdaptedWaist());
			}
		} else if (PC.belly >= 600000) {
			if (overCapacity) {
				r.push(`your original waistline is only visible from behind; your ${belly} belly ${lewdly} distorts it as it bulges past your narrow waist, continuing on for nearly half a`);
				if (V.showInches === 2) {
					r.push(`yard`);
				} else {
					r.push(`meter`);
				}
				r.push(`in both directions.`);
			} else {
				r.push(`nearly half a`);
				if (V.showInches === 2) {
					r.push(`yard`);
				} else {
					r.push(`meter`);
				}
				r.push(`of your ${belly} belly's sides are visible around your narrow waist.`);
				r.push(pregAdaptedWaist());
			}
		} else {
			if (overCapacity) {
				r.push(`your original waistline is only visible from behind; your ${belly} belly ${lewdly} distorts it as it extends past your sides.`);
			} else {
				r.push(`your ${belly} belly is very visible from behind.`);
				r.push(pregAdaptedWaist());
			}
		}
		return r.join(" ");
	}

	function pregAdaptedWaist() {
		return `Fortunately, your body is so ${lewdly} adapted to being pregnant that it rests forward enough to preserve the shape of your waistline.`;
	}

	return r.join(" ");
};
