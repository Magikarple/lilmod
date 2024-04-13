/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.waist = function(slave) {
	/**
	 * @type {Array<string>}
	 */
	const r = [];
	const {
		he, him, his, girl, He, His, woman
	} = getPronouns(slave);

	let belly;
	if (slave.belly >= 1500) {
		belly = bellyAdjective(slave);
	}

	r.push(`${He} has`);
	if (slave.waist > 95) {
		r.push(`a badly <span class="red">masculine waist</span> that ruins ${his}`);
		if (slave.weight > 30) {
			r.push(`figure and greatly exaggerates how fat ${he} is.`);
		} else if (slave.weight < -30) {
			r.push(`figure despite how thin ${he} is.`);
		} else {
			r.push(`figure.`);
		}
		if (slave.belly >= 1500) {
			if (slave.belly < 300000) {
				r.push(`${His} ${belly} belly is hidden by ${his} thick waist.`);
			} else if (slave.belly < 450000) {
				r.push(`${His} ${belly} belly can be seen around ${his} thick waist.`);
			} else if (slave.belly < 600000) {
				r.push(`${His} ${belly} belly can clearly be seen around ${his} thick waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			} else if (slave.belly < 750000) {
				r.push(`${His} ${belly} belly lewdly bulges around ${his} thick waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			} else {
				r.push(`${His} ${belly} belly grotesquely bulges around ${his} thick waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			}
		}
	} else if (slave.waist > 40) {
		r.push(`a broad, <span class="red">ugly waist</span> that makes ${him} look`);
		if (slave.weight > 30) {
			r.push(`mannish and exaggerates how fat ${he} is.`);
		} else if (slave.weight < -30) {
			r.push(`mannish despite how thin ${he} is.`);
		} else {
			r.push(`mannish.`);
		}
		if (slave.belly >= 1500) {
			if (slave.belly < 150000) {
				r.push(`${His} ${belly} belly is hidden by ${his} chunky waist.`);
			} else if (slave.belly < 450000) {
				r.push(`${His} ${belly} belly can be seen around ${his} chunky waist.`);
			} else if (slave.belly < 600000) {
				r.push(`${His} ${belly} belly can clearly be seen around ${his} chunky waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			} else if (slave.belly < 750000) {
				r.push(`${His} ${belly} belly lewdly bulges around ${his} chunky waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			} else {
				r.push(`${His} ${belly} belly grotesquely bulges around ${his} chunky waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			}
		}
	} else if (slave.waist > 10) {
		r.push(`an <span class="red">unattractive waist</span> that conceals ${his}`);
		if (slave.physicalAge <= 25) {
			r.push(`girlish`);
		} else {
			r.push(`womanly`);
		}
		if (slave.weight > 30) {
			r.push(`figure and accentuates how fat ${he} is.`);
		} else if (slave.weight < -30) {
			r.push(`figure despite how thin ${he} is.`);
		} else {
			r.push(`figure.`);
		}
		r.push(...normalWaistBelly());
	} else if (slave.waist >= -10) {
		let frag = `an average waist for a `;
		if (slave.physicalAge <= 25) {
			frag += `${girl}`;
		} else {
			frag += `${woman}`;
		}
		if (slave.weight > 30) {
			frag += `, though it looks broader since ${he}'s fat`;
		} else if (slave.weight < -30) {
			frag += `, though it looks narrower since ${he}'s thin`;
		}
		frag += `.`;
		r.push(frag);
		r.push(...normalWaistBelly());
	} else if (slave.waist >= -40) {
		r.push(`a nice <span class="pink">feminine waist</span> that gives ${him} a`);
		if (slave.physicalAge <= 25) {
			r.push(`girlish`);
		} else {
			r.push(`womanly`);
		}
		if (slave.weight > 30) {
			r.push(`figure despite ${his} extra weight.`);
		} else if (slave.weight < -30) {
			r.push(`figure and accentuates how thin ${he} is.`);
		} else {
			r.push(`figure.`);
		}
		r.push(...normalWaistBelly());
	} else if (slave.waist >= -95) {
		r.push(`a hot <span class="pink">wasp waist</span> that gives ${him} a hourglass`);
		if (slave.weight > 30) {
			r.push(`figure despite ${his} extra weight.`);
		} else if (slave.weight < -30) {
			r.push(`figure further accentuated by how thin ${he} is.`);
		} else {
			r.push(`figure.`);
		}
		if (slave.belly >= 1500) {
			if (slave.belly < 5000) {
				r.push(`From behind, ${his} narrow figure hides ${his} ${belly} belly.`);
			} else if (slave.belly < 80000) {
				r.push(`From behind, ${his} narrow figure barely hides ${his} ${belly} belly.`);
			} else if (slave.belly < 100000) {
				r.push(`${His} ${belly} belly can be seen around ${his} narrow waist.`);
			} else if (slave.belly < 450000) {
				r.push(`${His} ${belly} belly lewdly extends past ${his} narrow waist.`);
			} else {
				r.push(...narrowWaistLargeBelly());
			}
		}
	} else {
		r.push(`an <span class="pink">absurdly narrow waist</span> that gives ${him} a cartoonishly hourglass`);
		if (slave.weight > 30) {
			r.push(`figure made even more ludicrous by ${his} extra weight.`);
		} else if (slave.weight < -30) {
			r.push(`figure made even more ludicrous by how thin ${he} is.`);
		} else {
			r.push(`figure.`);
		}
		if (slave.belly >= 1500) {
			if (slave.belly < 2000) {
				r.push(`From behind, ${his} narrow figure hides ${his} ${belly} belly.`);
			} else if (slave.belly < 5000) {
				r.push(`From behind, ${his} narrow figure barely hides ${his} ${belly} belly.`);
			} else if (slave.belly < 8000) {
				r.push(`${His} ${belly} belly can be seen around ${his} narrow waist.`);
			} else if (slave.belly < 15000) {
				r.push(`${His} ${belly} belly lewdly extends past ${his} narrow waist.`);
			} else if (slave.belly < 45000) {
				r.push(`${His} ${belly} belly lewdly distends far to either side of ${his} narrow waist.`);
			} else {
				r.push(...narrowWaistLargeBelly());
			}
		}
	}
	return r.join(" ");

	/**
	 * @returns {Array<string>}
	 */
	function normalWaistBelly() {
		/** @type {Array<string>} */
		const r = [];
		if (slave.belly >= 1500) {
			if (slave.belly < 10000) {
				r.push(`From behind, ${his} figure hides ${his} ${belly} belly.`);
			} else if (slave.belly < 200000) {
				r.push(`From behind, ${his} figure barely hides ${his} ${belly} belly.`);
			} else if (slave.belly < 300000) {
				r.push(`${His} ${belly} belly can be seen around ${his} waist.`);
			} else if (slave.belly < 450000) {
				r.push(`${His} ${belly} belly can clearly be seen around ${his} waist.`);
			} else if (slave.belly < 600000) {
				r.push(`${His} ${belly} belly can clearly be seen around ${his} waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			} else if (slave.belly < 750000) {
				r.push(`${His} ${belly} belly lewdly bulges around ${his} waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline only visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			} else {
				r.push(`${His} ${belly} belly grotesquely bulges around ${his} waist.`);
				if (slave.preg > 3) {
					if (slave.belly > (slave.pregAdaptation * 1000)) {
						r.push(`${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind.`);
					} else {
						r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
					}
				}
			}
		}
		return r;
	}

	/**
	 * @returns {Array<string>}
	 */
	function narrowWaistLargeBelly() {
		/** @type {Array<string>} */
		const r = [];
		if (slave.belly < 600000) {
			r.push(`${His} ${belly} belly lewdly distends far to either side of ${his} narrow waist.`);
			if (slave.preg > 3) {
				if (slave.belly > (slave.pregAdaptation * 1000)) {
					r.push(`${His} waist is swollen wider than usual by ${his} crowded womb in its search for more room, leaving ${his} original waistline only visible from behind.`);
				} else {
					r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
				}
			}
		} else if (slave.belly < 750000) {
			r.push(`${His} ${belly} belly lewdly bulges to either side of ${his} narrow waist and continues for nearly half a`);
			if (V.showInches === 2) {
				r.push(`yard`);
			} else {
				r.push(`meter`);
			}
			r.push(`in both directions.`);
			if (slave.preg > 3) {
				if (slave.belly > (slave.pregAdaptation * 1000)) {
					r.push(`${His} waist is greatly distended by ${his} overfilled womb in its desperate search for more room, leaving ${his} original waistline barely visible from behind.`);
				} else {
					r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
				}
			}
		} else {
			r.push(`${His} ${belly} belly grotesquely bulges around ${his} narrow waist and continues`);
			if (slave.belly >= 1000000) {
				r.push(`quite the distance`);
			} else {
				r.push(`over half a`);
				if (V.showInches === 2) {
					r.push(`yard`);
				} else {
					r.push(`meter`);
				}
			}
			r.push(`farther to either side.`);
			if (slave.preg > 3) {
				if (slave.belly > (slave.pregAdaptation * 1000)) {
					r.push(`${His} waist is horribly distended by ${his} bursting womb in a last ditch effort to find more room for ${his} children, leaving ${his} original waistline barely visible from behind.`);
				} else {
					r.push(`However, ${his} body is so adapted to pregnancy that ${his} womb rests forward enough to preserve the shape of ${his} waistline.`);
				}
			}
		}
		return r;
	}
};
