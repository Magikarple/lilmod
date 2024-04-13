/**
 * @returns {HTMLElement}
 */
App.EndWeek.marketsReport = function() {
	const el = document.createElement("p");
	App.UI.DOM.appendNewElement("span", el, "FC Markets Report: ", "note");

	const assetAffected = either("capture", "drugs", "entrapment", "general", "slaves", "surgical", "training");
	const assetsUp = (random(1, 100) > 50);
	let desc = "";

	switch (assetAffected) {
		case "general": {
			if (assetsUp) {
				if (random(1, 100) > 50) {
					desc = `...rising energy costs drove <span class="yellowgreen">rising prices</span> of several market baskets...`;
				} else {
					desc = `...conflict-driven increases in transportation costs increase <span class="yellowgreen">price indices...</span>`;
				}
			} else {
				if (random(1, 100) > 50) {
					desc = `...increasing Free Cities slave labor effects <span class="gold">general prices...</span>`;
				} else {
					desc = `...Antarctic oil shale pushing down energy prices, driving down major <span class="gold">price indices...</span>`;
				}
			}
			break;
		}
		case "slaves": {
			if (assetsUp) {
				if (random(1, 100) > 50) {
					desc = `...heavy demand for fashionable varieties drove <span class="yellowgreen">rising slave prices</span> last...`;
				} else {
					desc = `...study suggested the sexual revolution would continue to drive up <span class="yellowgreen">slave prices...</span>`;
				}
			} else {
				if (random(1, 100) > 50) {
					desc = `...increased supply due to bush wars drove down <span class="gold">slave prices...</span>`;
				} else {
					desc = `...<span class="gold">slave prices</span> continue to fall due to major improvements in training...`;
				}
			}
			break;
		}
		case "entrapment": {
			if (assetsUp) {
				if (random(1, 100) > 50) {
					desc = `...prospect of deregulation drove a <span class="yellowgreen">scramble</span> for means of enslavement...`;
				} else {
					desc = `...law would legalize enslavement, driving <span class="yellowgreen">high prices</span> for associated...`;
				}
			} else {
				if (random(1, 100) > 50) {
					desc = `...reactionism produced lower demand and <span class="gold">lower prices</span> for legal enslavement...`;
				} else {
					desc = `...report on low success rates <span class="gold">drove down</span> value of legal enslavement methods...`;
				}
			}
			break;
		}
		case "capture": {
			if (assetsUp) {
				if (random(1, 100) > 50) {
					desc = `...declaration of war <span class="yellowgreen">pushed up</span> average mercenary wage...`;
				} else {
					desc = `...advancing technology to blame for <span class="yellowgreen">rising costs</span> of assets for wet work...`;
				}
			} else {
				if (random(1, 100) > 50) {
					desc = `...rumored peace treaty <span class="gold">pushed down</span> mercenary contract clearing rate...`;
				} else {
					desc = `...demobilization of the cash-strapped army expected to produce mercenary <span class="gold">glut...</span>`;
				}
			}
			break;
		}
		case "training": {
			if (assetsUp) {
				if (random(1, 100) > 50) {
					desc = `...rising demand in turn <span class="yellowgreen">pushing up</span> prices for most means of slave training...`;
				} else {
					desc = `...public demand for ever-better slave training inevitably <span class="yellowgreen">increase</span> training costs...`;
				}
			} else {
				if (random(1, 100) > 50) {
					desc = `...competition from low-cost slave breaking firms <span class="gold">reducing</span> asking price for...`;
				} else {
					desc = `...increased automation of slave training <span class="gold">negatively impacting</span> training contracts...`;
				}
			}
			break;
		}
		case "surgical": {
			if (assetsUp) {
				if (random(1, 100) > 50) {
					desc = `...fashionable extravagant implant procedures <span class="yellowgreen">driving prices</span> of remote surgical...`;
				} else {
					desc = `...near-universal breast implants producing corresponding <span class="yellowgreen">price inflation</span> of surgery...`;
				}
			} else {
				if (random(1, 100) > 50) {
					desc = `...vastly reduced overhead with remote surgery <span class="gold">hitting prices</span> of surgery hard...`;
				} else {
					desc = `...oversupply after major manufacturers converted lines to <span class="gold">low-cost</span> implant production...`;
				}
			}
			break;
		}
		case "drugs": {
			if (assetsUp) {
				if (random(1, 100) > 50) {
					desc = `...intense demand for curatives in conflict zones <span class="yellowgreen">increasing prices...</span>`;
				} else {
					desc = `...setbacks in growth hormone human testing expected to <span class="yellowgreen">increase prices</span> of traditional formula...`;
				}
			} else {
				if (random(1, 100) > 50) {
					desc = `...new formula <span class="gold">cut costs</span> of common curatives by an unprecedented...`;
				} else {
					desc = `...glut caused by big pharma reorienting towards <span class="gold">cheap,</span> mass-produced aphros...`;
				}
			}
			break;
		}
	}
	$(el).append(desc);
	return el;
};
