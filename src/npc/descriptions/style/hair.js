/**
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
App.Desc.hair = function(slave) {
	const r = [];
	const {
		his, His, him
	} = getPronouns(slave);

	let hairLength = '';
	const heightVhLength = slave.hLength / slave.height;
	if (heightVhLength > 0.9) {
		hairLength = `floor-length`;
	} else if (heightVhLength > 0.8) {
		hairLength = `calf-length`;
	} else if (heightVhLength > 0.7) {
		hairLength = `knee-length`;
	} else if (heightVhLength >= 0.6) {
		hairLength = `thigh-length`;
	} else if (heightVhLength >= 0.4) {
		hairLength = `ass-length`;
	} else if (heightVhLength >= 0.2) {
		hairLength = `long`;
	} else if (slave.hLength >= 15) {
		hairLength = `shoulder-length`;
	} else {
		hairLength = `short`;
	}

	r.push(`${His}`);
	if (slave.fuckdoll === 0) {
		switch (slave.hStyle) {
			case "bald":
				r.push(`hair no longer grows. If it did, it would be ${slave.origHColor}.`);
				break;
			case "shaved":
				r.push(`hair has been shaved. If ${his} hair were visible, it would be ${slave.hColor}.`);
				break;
			case "buzzcut":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is in a short buzzcut.`);
				break;
			case "trimmed":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is trimmed short.`);
				break;
			case "pixie cut":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is trimmed short on the back and sides while being slightly longer on the top and with short bangs in the front.`);
				break;
			case "bob cut":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is cut at jaw-level around the head, with a fringe at the front.`);
				break;
			case "afro":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is in a`);
				if (slave.hLength > 100) {
					r.push(`gigantic puffed-up afro and looks ridiculous.`);
				} else if (slave.hLength > 30) {
					r.push(`puffy afro.`);
				} else {
					r.push(`short afro.`);
				}
				break;
			case "cornrows":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is formed tightly into cornrows in a decorative pattern on ${his} head, dangling`);
				if (slave.hLength >= 150) {
					r.push(`down calf-length,`);
				} else if (slave.hLength >= 100) {
					r.push(`down ass-length,`);
				} else if (slave.hLength >= 30) {
					r.push(`down long,`);
				} else if (slave.hLength >= 10) {
					r.push(`down shoulder-length,`);
				} else {
					r.push(`down,`);
				}
				r.push(`with colorful beads interspersed in them.`);
				break;
			case "bun":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is`);
				if (slave.hLength >= 100) {
					r.push(`packed tightly into a huge puffy`);
				} else if (slave.hLength >= 30) {
					r.push(`packed into a large`);
				} else if (slave.hLength >= 10) {
					r.push(`tied into a small`);
				} else {
					r.push(`tied into a`);
				}
				r.push(`bun.`);
				break;
			case "messy bun":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is`);
				if (slave.hLength >= 100) {
					r.push(`packed tightly into a huge messy`);
				} else if (slave.hLength >= 30) {
					r.push(`packed into a large messy`);
				} else if (slave.hLength >= 10) {
					r.push(`tied into a small messy`);
				} else {
					r.push(`tied into a messy`);
				}
				r.push(`bun.`);
				break;
			case "double buns":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is`);
				if (slave.hLength >= 100) {
					r.push(`packed tightly into two huge`);
				} else if (slave.hLength >= 30) {
					r.push(`packed into two large`);
				} else if (slave.hLength >= 10) {
					r.push(`tied into two small`);
				} else {
					r.push(`tied into two`);
				}
				r.push(`buns on either side her head.`);
				break;
			case "chignon":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is`);
				if (slave.hLength >= 100) {
					r.push(`knotted tightly into a huge`);
				} else if (slave.hLength >= 30) {
					r.push(`knotted into a large`);
				} else if (slave.hLength >= 10) {
					r.push(`knotted into a small`);
				} else {
					r.push(`knotted into a`);
				}
				r.push(`chignon.`);
				break;
			case "french twist":
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is`);
				if (slave.hLength >= 100) {
					r.push(`styled into a grand`);
				} else if (slave.hLength >= 30) {
					r.push(`styled into a large, exquisite`);
				} else if (slave.hLength >= 10) {
					r.push(`styled into a small, charming`);
				} else {
					r.push(`styled into a`);
				}
				r.push(`french twist.`);
				break;
			case "crown braid":
			case "dutch braid":
			case "double dutch braid":
			case "bangs":
			case "braided":
			case "curled":
			case "dreadlocks":
			case "drills":
			case "hime":
			case "luxurious":
			case "neat":
			case "permed":
			case "ponytail":
			case "strip":
			case "undercut":
			case "tails":
			case "up":
				r.push(`${hairLength}, ${slave.hColor} hair${slave.hEffect === "none" ? `` : ` that has ${slave.hEffect} to it,`}`);
				r.push(App.Desc.hairClothing(slave));
				break;
			case "unique": // For custom hair and really indescribable hairstyles.
				r.push(`${hairLength}, ${slave.hColor} hair${slave.hEffect === "none" ? `` : ` that is stylized with ${slave.hEffect},`} is truly unique to ${him}.`);
				break;
			default:
				r.push(`${slave.hColor} hair${slave.hEffect === "none" ? `` : `, that is stylized with ${slave.hEffect},`} is ${slave.hStyle} and ${hairLength}.`);
		}
		r.push(`${His}`);
		if (slave.eyebrowHStyle === "bald") {
			r.push(`brows do not grow hair, but would be ${slave.eyebrowHColor} in color if they did.`);
		} else if (slave.eyebrowHStyle === "shaved") {
			r.push(`eyebrows have`);
			if (slave.hStyle === "shaved") {
				r.push(`also`);
			}
			r.push(`been shaved off. If they were visible, they would be ${slave.eyebrowHColor} in color.`);
		} else {
			r.push(`${slave.eyebrowHColor} eyebrows`);
			switch (slave.eyebrowHStyle) {
				case "slanted inwards":
					r.push(`slant inwards from the sides of ${his} forehead down to the center of ${his} head.`);
					break;
				case "slanted outwards":
					r.push(`slant outwards from the center of ${his} head down to the sides of ${his} forehead.`);
					break;
				case "rounded":
					r.push(`form perfect semicircles.`);
					break;
				case "natural":
					r.push(`naturally contour to the shape of ${his} brow.`);
					break;
				case "curved":
					r.push(`form small "S"-shaped curves above ${his} eyes.`);
					break;
				case "straight":
					r.push(`are near perfectly straight, instead of curving.`);
					break;
				case "high-arched":
					r.push(`form tall arches on ${his} forehead.`);
					break;
				case "elongated":
					r.push(`are elongated to cover far more of ${his} brow than what would be considered average.`);
					break;
				case "shortened":
					r.push(`are shortened to cover far less of ${his} brow than what would be considered average.`);
					break;
				default:
					r.push(`are styled to be ${slave.eyebrowHStyle}.`);
			}
			r.push(`They're`);
			switch (slave.eyebrowFullness) {
				case "pencil-thin":
					r.push(`incredibly and unnaturally light and thin.`);
					break;
				case "thin":
					r.push(`considerably thinner than what would be considered average.`);
					break;
				case "threaded":
					r.push(`styled to be thinner on the sides but otherwise normal.`);
					break;
				case "natural":
					r.push(`kept to a natural level of fullness.`);
					break;
				case "tapered":
					r.push(`styled to be thicker in the center but otherwise normal.`);
					break;
				case "thick":
					r.push(`considerably thicker than what would be considered average.`);
					break;
				case "bushy":
					r.push(`incredibly and unnaturally full and bushy.`);
					break;
				default:
					r.push(`${slave.eyebrowFullness}.`);
			}
		}
	} else {
		if (slave.hLength > 20) {
			r.push(`hair sticks out of the suit in two`);
			if (slave.hLength > 100) {
				r.push(`extremely long`);
			} else if (slave.hLength > 40) {
				r.push(`long`);
			} else {
				r.push(`short`);
			}
			r.push(`tails, which can be used as handles when using the Fuckdoll's`);
			if (slave.vagina > -1) {
				r.push(`lower holes.`);
			} else {
				r.push(`rear hole.`);
			}
		} else if (slave.hLength > 5) {
			r.push(`short hair is tightly covered by the suit.`);
		} else {
			r.push(`scalp is tightly covered by the suit.`);
		}
	}
	return r.join(" ");
};
