/**
 * Lets the player edit slave genetics
 * @returns {DocumentFragment}
 */
App.UI.editGenetics = function() {
	const node = new DocumentFragment();

	const cupCat = new Categorizer(
		[0, 'flat'],
		[300, 'A-cup'],
		[400, 'B-cup'],
		[500, 'C-cup'],
		[650, 'D-cup'],
		[800, 'DD-cup'],
		[1000, 'F-cup'],
		[1200, 'G-cup'],
		[1400, 'H-cup'],
		[1600, 'I-cup'],
		[1800, 'J-cup'],
		[2050, 'K-cup'],
		[2300, 'L-cup'],
		[2600, 'M-cup'],
		[2900, 'N-cup'],
		[3250, 'O-cup'],
		[3600, 'P-cup'],
		[3950, 'Q-cup'],
		[4300, 'R-cup'],
		[4700, 'S-cup'],
		[5100, 'massive']
	);
	const faceCat = new Categorizer(
		[-Infinity, 'very ugly'],
		[-95, 'ugly'],
		[-40, 'unattractive'],
		[-10, 'attractive'],
		[11, 'very pretty'],
		[41, 'gorgeous'],
		[96, 'mind blowing']
	);
	const lipsCat = new Categorizer(
		[0, 'thin'],
		[11, 'normal'],
		[21, 'pretty'],
		[41, 'plush'],
		[71, 'huge'],
		[96, 'facepussy']
	);
	const hormonalCat = new Categorizer(
		[-Infinity, 'heavy male'],
		[-49, 'male'],
		[-24, 'natural'],
		[25, 'female'],
		[50, 'heavy female']
	);
	const intelligenceCat = new Categorizer(
		[-Infinity, 'borderline retarded'],
		[-95, 'very slow'],
		[-50, 'slow'],
		[-15, 'average'],
		[16, 'smart'],
		[51, 'very smart'],
		[96, 'brilliant']
	);

	/**
	 * @param {App.Entity.SlaveState|App.Entity.PlayerState} s the slave to get the full name of
	 * @returns {DocumentFragment} a DocumentFragment with the slave's full name that they were given at birth
	 */
	function birthFullName(s) {
		let r = [];
		if (V.surnameOrder !== 1) {
			if (["Cambodian", "Chinese", "Ancient Chinese Revivalist", "Hungarian", "Japanese", "Edo Revivalist", "Korean", "Mongolian", "Taiwanese", "Vietnamese"].includes(s.nationality)) {
				if (s.birthSurname) {
					r.push(s.birthSurname);
				}
				r.push(App.UI.DOM.makeElement("span", (s.birthName), ["bold", "underline"]));
			} else {
				r.push(App.UI.DOM.makeElement("span", (s.birthName), ["bold", "underline"]));
				if (s.birthSurname) {
					r.push(s.birthSurname);
				}
			}
		} else {
			r.push(App.UI.DOM.makeElement("span", (s.birthName), ["bold", "underline"]));
			if (s.birthSurname) {
				r.push(s.birthSurname);
			}
		}
		return App.Events.makeNode(r);
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to get the full name of
	 * @returns {DocumentFragment} a DocumentFragment with the slave's full name that they currently have
	 */
	function currentFullName(s) {
		let r = [];
		if (V.surnameOrder !== 1) {
			if (["Cambodian", "Chinese", "Ancient Chinese Revivalist", "Hungarian", "Japanese", "Edo Revivalist", "Korean", "Mongolian", "Taiwanese", "Vietnamese"].includes(s.nationality)) {
				if (s.slaveSurname) {
					r.push(s.slaveSurname);
				}
				r.push(App.UI.DOM.makeElement("span", s.slaveName, ["bold", "underline"]));
			} else {
				r.push(App.UI.DOM.makeElement("span", s.slaveName, ["bold", "underline"]));
				if (s.slaveSurname) {
					r.push(s.slaveSurname);
				}
			}
		} else {
			r.push(App.UI.DOM.makeElement("span", s.slaveName, ["bold", "underline"]));
			if (s.slaveSurname) {
				r.push(s.slaveSurname);
			}
		}
		return App.Events.makeNode(r);
	}

	function nameButton(s) {
		const button = App.UI.DOM.makeElement("button", currentFullName(s), "slavepicker");
		button.setAttribute("data-slave", s.ID);
		button.style.width = "100%";
		return button;
	}

	/**
	 * @param {App.Entity.SlaveState} s
	 * @returns {HTMLTableElement}
	 */
	function geneDetailsFunction(s) {
		/**
		 * Makes a html table row
		 */
		function makeRow() {
			row = App.UI.DOM.appendNewElement("tr", tbody);
		}

		/**
		 * Makes a html table cell
		 * @param {string|DocumentFragment|HTMLSpanElement} text
		 * @param {number} [colSpan] the number of columns in the table that the cell should span
		 */
		function makeCell(text, colSpan = undefined) {
			let cell = App.UI.DOM.appendNewElement("td", row, text);
			if (colSpan) {
				cell.colSpan = colSpan;
			}
		}

		/**
		 * Makes a html header with the given text
		 * @param {string} text
		 */
		function makeHeader(text) {
			App.UI.DOM.appendNewElement("th", row, text);
		}

		function makeHr() {
			makeRow();
			row.append(document.createElement("td"));
			cell = App.UI.DOM.appendNewElement("td", row, App.UI.DOM.makeElement("hr"));
			cell.colSpan = 6;
			row.append(document.createElement("td"));
		}

		const table = document.createElement("table");
		table.classList.add("slave-genetic-details");
		const tbody = App.UI.DOM.appendNewElement("tbody", table);

		let row = document.createElement("tr");
		let cell;
		makeRow();

		makeHeader(`Given name(s)`);
		makeCell(s.slaveName, 2);

		makeHeader(`Family name`);
		makeCell(s.slaveSurname || '', 2);

		makeHeader(`Karyotype`);
		cell = App.UI.DOM.appendNewElement("td", row, `${s.genes} (${geneToGender(s.genes, {keepKaryotype: true, lowercase: false})})`, ["editor", "choice-editor"]);
		cell.setAttribute("data-param", "genes");
		cell.setAttribute("data-choices", "XX, XY");


		makeRow();

		makeHeader(`Nationality`);
		cell = App.UI.DOM.appendNewElement("td", row, s.nationality, ["editor", "string-editor"]);
		cell.colSpan = 2;
		cell.setAttribute("data-param", "nationality");

		makeHeader(`Ethnicity`);
		cell = App.UI.DOM.appendNewElement("td", row, s.origRace, ["editor", "choice-editor"]);
		cell.colSpan = 2;
		cell.setAttribute("data-param", "origRace");
		cell.setAttribute("data-choices", "amerindian, asian, black, indo-aryan, latina, malay, middle eastern, mixed race, pacific islander, semitic, southern european, catgirl, white");

		makeHeader(`Career`);
		cell = App.UI.DOM.appendNewElement("td", row, s.career ? s.career : '', ["note"]);


		makeRow();

		makeHeader(`Father`);
		makeCell(parentFullName(s.father), 2);

		makeHeader(`Mother`);
		makeCell(parentFullName(s.mother), 2);

		makeHeader(`Age`);
		makeCell(ageDesc(s));


		if (s.birthName !== s.slaveName || s.birthSurname !== s.slaveSurname) {
			makeRow();

			cell = App.UI.DOM.appendNewElement("td", row, App.Events.makeNode([`Born as`, birthFullName(s)]), ["note"]);
			cell.colSpan = 8;
		}

		makeHr();


		makeRow();

		makeHeader(`Skin`);
		cell = App.UI.DOM.appendNewElement("td", row, s.origSkin, ["editor", "string-editor"]);
		cell.setAttribute("data-param", "origSkin");

		makeHeader(`Skin markings`);
		cell = App.UI.DOM.appendNewElement("td", row, s.origSkin, ["editor", "choice-editor"]);
		cell.setAttribute("data-param", "markings");
		cell.setAttribute("data-choices", "none, beauty mark, birthmark, freckles, heavily freckled");

		makeHeader(`Eyes`);
		cell = App.UI.DOM.appendNewElement("td", row, s.eye.origColor, ["editor", "string-editor"]);
		cell.setAttribute("data-param", "eye.origColor");

		makeHeader(`Hair`);
		cell = App.UI.DOM.appendNewElement("td", row, s.origHColor, ["editor", "string-editor"]);
		cell.setAttribute("data-param", "origHColor");


		makeRow();

		makeHeader(`Height`);
		cell = App.UI.DOM.appendNewElement("td", row, `${s.height} cm (${toFeet(s.height)})`, ["editor", "number-editor"]);
		cell.setAttribute("data-param", "height");
		cell.setAttribute("data-min", "50");
		cell.setAttribute("data-max", "250");

		makeHeader(`Weight`);
		cell = App.UI.DOM.appendNewElement("td", row, percent(s.weight), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "weight");

		makeHeader(`Muscles`);
		cell = App.UI.DOM.appendNewElement("td", row, percent(s.muscles), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "muscles");

		cell = App.UI.DOM.appendNewElement("td", row);
		cell.colSpan = 2;


		makeRow();

		makeHeader(`Shoulders`);
		cell = App.UI.DOM.appendNewElement("td", row, shouldersDesc(s), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "shoulders");
		cell.setAttribute("data-min", "-2");
		cell.setAttribute("data-max", "2");

		makeHeader(`Waist`);
		cell = App.UI.DOM.appendNewElement("td", row, percent(s.waist), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "waist");

		makeHeader(`Hips`);
		cell = App.UI.DOM.appendNewElement("td", row, hipsDesc(s), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "hips");
		cell.setAttribute("data-min", "-2");
		cell.setAttribute("data-max", "3");

		makeHeader(`Rear`);
		cell = App.UI.DOM.appendNewElement("td", row, rearDesc(s), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "butt");
		cell.setAttribute("data-min", "0");
		cell.setAttribute("data-max", "20");


		makeRow();

		makeHeader(`Breasts`);
		cell = App.UI.DOM.appendNewElement("td", row, `${s.boobs} cc (${cupCat.cat(s.boobs)})`, ["editor", "number-editor"]);
		cell.setAttribute("data-param", "boobs");
		cell.setAttribute("data-min", "0");
		cell.setAttribute("data-max", "100000");

		makeHeader(`Breast shape`);
		cell = App.UI.DOM.appendNewElement("td", row, s.boobShape, ["editor", "choice-editor"]);
		cell.setAttribute("data-param", "boobShape");
		cell.setAttribute("data-choices", "normal, perky, saggy, torpedo-shaped, downward-facing, wide-set");

		makeHeader(`Nipples`);
		cell = App.UI.DOM.appendNewElement("td", row, s.nipples, ["editor", "choice-editor"]);
		cell.setAttribute("data-param", "nipples");
		cell.setAttribute("data-choices", "huge, puffy, inverted, tiny, cute, partially inverted");

		makeHeader(`Areolae`);
		cell = App.UI.DOM.appendNewElement("td", row, areolaeDesc(s), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "areolae");
		cell.setAttribute("data-min", "0");
		cell.setAttribute("data-max", "5");


		makeRow();

		makeHeader(`Face`);
		cell = App.UI.DOM.appendNewElement("td", row, `${faceCat.cat(s.face)} (${percent(s.face)})`, ["editor", "number-editor"]);
		cell.setAttribute("data-param", "face");

		makeHeader(`Lips`);
		cell = App.UI.DOM.appendNewElement("td", row, `${lipsCat.cat(s.lips)} (${s.lips})`, ["editor", "number-editor"]);
		cell.setAttribute("data-param", "lips");
		cell.setAttribute("data-min", "0");
		cell.setAttribute("data-max", "100");

		makeHeader(`Teeth`);
		cell = App.UI.DOM.appendNewElement("td", row, s.teeth, ["editor", "choice-editor"]);
		cell.setAttribute("data-param", "teeth");
		cell.setAttribute("data-choices", "normal, crooked, straightening braces, cosmetic braces, removable, pointy, baby, mixed");

		makeHeader(`Voice`);
		cell = App.UI.DOM.appendNewElement("td", row, voiceDesc(s), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "voice");
		cell.setAttribute("data-min", "0");
		cell.setAttribute("data-max", "3");


		makeHr();

		if (s.vagina >= 0) {
			makeRow();

			makeHeader(`Labia`);
			cell = App.UI.DOM.appendNewElement("td", row, labiaDesc(s), ["editor", "number-editor"]);
			cell.setAttribute("data-param", "labia");
			cell.setAttribute("data-min", "0");
			cell.setAttribute("data-max", "3");

			makeHeader(`Clitoris`);
			cell = App.UI.DOM.appendNewElement("td", row, clitorisDesc(s), ["editor", "number-editor"]);
			cell.setAttribute("data-param", "clit");
			cell.setAttribute("data-min", "0");
			cell.setAttribute("data-max", "5");

			makeHeader(`Ovaries`);
			cell = App.UI.DOM.appendNewElement("td", row,
				s.ovaries
					? App.Events.makeNode(['working', App.UI.DOM.makeElement("span", "\u2714", "green")])
					: App.Events.makeNode(['broken', App.UI.DOM.makeElement("span", "\u2718", "red")])
			);
			cell.setAttribute("data-param", "ovaries");
			cell.setAttribute("data-min", "0");
			cell.setAttribute("data-max", "5");

			makeHeader(`Ovum type`);
			makeCell(s.eggType);
		}
		if (s.dick > 0 || s.balls > 0) {
			makeRow();

			makeHeader(`Penis`);
			cell = App.UI.DOM.appendNewElement("td", row, penisDesc(s), ["editor", "number-editor"]);
			cell.setAttribute("data-param", "dick");
			cell.setAttribute("data-min", "0");
			cell.setAttribute("data-max", "11");

			makeHeader(`Testes`);
			cell = App.UI.DOM.appendNewElement("td", row, testesDesc(s), ["editor", "number-editor"]);
			cell.setAttribute("data-param", "balls");
			cell.setAttribute("data-min", "0");
			cell.setAttribute("data-max", "10");

			makeHeader(`Prostate`);
			cell = App.UI.DOM.appendNewElement("td", row,
				s.prostate
					? App.Events.makeNode(['working', App.UI.DOM.makeElement("span", "\u2714", "green")])
					: App.Events.makeNode(['broken', App.UI.DOM.makeElement("span", "\u2718", "red")]),
			);
			cell.setAttribute("data-param", "prostate");

			makeHeader(`Sperm type`);
			makeCell(s.ballType);
		}

		makeRow();

		makeHeader(`Hormonal`);
		cell = App.UI.DOM.appendNewElement("td", row, `${hormonalCat.cat(s.hormoneBalance)} (${s.hormoneBalance})`, ["editor", "number-editor"]);
		cell.setAttribute("data-param", "hormoneBalance");

		makeHeader(`Anal area`);
		cell = App.UI.DOM.appendNewElement("td", row, s.analArea, ["editor", "number-editor"]);
		cell.setAttribute("data-param", "analArea");
		cell.setAttribute("data-min", "0");
		cell.setAttribute("data-max", "3");

		cell = App.UI.DOM.appendNewElement("td", row);
		cell.colSpan = 4;

		makeHr();


		makeRow();

		makeHeader(`Intelligence`);
		cell = App.UI.DOM.appendNewElement("td", row, intelligenceCat.cat(s.intelligence), ["editor", "number-editor"]);
		cell.setAttribute("data-param", "intelligence");
		cell.setAttribute("data-min", "-100");
		cell.setAttribute("data-max", "100");

		makeHeader(`Behavioral`);
		cell = App.UI.DOM.appendNewElement("td", row, s.behavioralFlaw !== 'none' ? s.behavioralFlaw : s.behavioralQuirk);

		makeHeader(`Sexual`);
		cell = App.UI.DOM.appendNewElement("td", row, s.sexualFlaw !== 'none' ? s.sexualFlaw : s.sexualQuirk);

		cell = App.UI.DOM.appendNewElement("td", row);
		cell.colSpan = 2;

		if (s.chem > 0 || s.addict > 0) {
			makeRow();
			makeCell(chemicalsDesc(s), 8);
		}
		return table;
	}

	/**
	 * @param {number} n The number to made into a percent
	 * @returns {string} `${n}%`
	 */
	function percent(n) {
		if (n > 0) { return '+' + Number(n).toFixed(0) + '%'; }
		if (n === 0) { return '\u00B10%'; }
		return Number(n).toFixed(0) + '%';
	}
	/**
	 * @param {number} n how many centimeters
	 * @returns {string} a string representation of the number in feet and inches
	 */
	function toFeet(n) {
		let realFeet = Number(n) / 30.48;
		let feet = Math.floor(realFeet);
		let inches = Math.round((realFeet - feet) * 12);
		return feet + "\u2032" + inches + '\u2033';
	}

	/**
	 * @param {App.Entity.SlaveState} slave the slave to describe
	 * @returns {string} their age description
	 */
	function ageDesc(slave) {
		let age = slave.actualAge + slave.birthWeek/52.0;
		let years = Math.floor(age);
		let months = Math.floor((age - years) * 12);
		return (years > 0 ? years + 'y ' + months + 'm' : months + 'm');
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their shoulder description
	 */
	function shouldersDesc(s) {
		return ({
			'-2': 'very narrow',
			'-1': 'narrow',
			'0': 'feminine',
			'1': 'broad',
			'2': 'very broad'
		}[s.shoulders] || 'unknown') + ' (' + Number(s.shoulders) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their hip description
	 */
	function hipsDesc(s) {
		return ({
			'-2': 'very narrow',
			'-1': 'narrow',
			'0': 'normal',
			'1': 'wide',
			'2': 'very wide',
			'3': 'inhumanly wide'
		}[s.hips] || 'unknown') + ' (' + Number(s.hips) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their butt description
	 */
	function rearDesc(s) {
		return ({
			'0': 'flat',
			'1': 'small',
			'2': 'plump',
			'3': 'big',
			'4': 'huge',
			'5': 'enormous',
			'6': 'gigantic',
			'7': 'ridiculous',
			'8': 'immense',
			'9': 'immense',
			'10': 'immense',
			'11': 'inhuman',
			'12': 'inhuman',
			'13': 'inhuman',
			'14': 'inhuman',
			'15': 'inhuman',
			'16': 'inhuman',
			'17': 'inhuman',
			'18': 'inhuman',
			'19': 'inhuman',
			'20': 'inhuman'
		}[s.butt] || 'unknown') + ' (' + Number(s.butt) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their areolae description
	 */
	function areolaeDesc(s) {
		return ({
			'0': 'normal',
			'1': 'large',
			'2': 'unusually wide',
			'3': 'huge',
			'4': 'heart shaped',
			'5': 'star shaped'
		}[s.areolae] || 'unknown') + ' (' + Number(s.areolae) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their voice description
	 */
	function voiceDesc(s) {
		return ({
			'0': 'mute',
			'1': 'deep',
			'2': 'feminine',
			'3': 'high'
		}[s.voice] || 'unknown') + ' (' + Number(s.voice) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their labia description
	 */
	function labiaDesc(s) {
		return ({
			'0': 'minimal',
			'1': 'big',
			'2': 'huge',
			'3': 'huge dangling'
		}[s.labia] || 'unknown') + ' (' + Number(s.labia) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their clitoris description
	 */
	function clitorisDesc(s) {
		return ({
			'0': 'normal',
			'1': 'large',
			'2': 'huge',
			'3': 'enormous',
			'4': 'penis-like',
			'5': 'like a massive penis'
		}[s.clit] || 'unknown') + ' (' + Number(s.clit) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their penis description
	 */
	function penisDesc(s) {
		return ({
			'0': 'none',
			'1': 'tiny',
			'2': 'little',
			'3': 'normal',
			'4': 'big',
			'5': 'huge',
			'6': 'gigantic',
			'7': 'gigantic',
			'8': 'titanic',
			'9': 'absurd',
			'10': 'inhuman',
			'11': 'hypertrophied'
		}[s.dick] || 'unknown') + ' (' + Number(s.dick) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} s the slave to describe
	 * @returns {string} their testes description
	 */
	function testesDesc(s) {
		return ({
			'0': 'none',
			'1': 'vestigial',
			'2': 'small',
			'3': 'average',
			'4': 'big',
			'5': 'huge',
			'6': 'enormous',
			'7': 'hypertrophied', '8': 'hypertrophied', '9': 'hypertrophied', '10': 'hypertrophied'
		}[s.balls] || 'unknown') + ' (' + Number(s.balls) + ')';
	}

	/**
	 * @param {App.Entity.SlaveState} slave the slave to describe
	 * @returns {string} their immune system and addiction descriptions
	 */
	function chemicalsDesc(slave) {
		let res = [];
		if (slave.chem > 0) {
			res.push('Immune system damaged (' + slave.chem.toFixed(0) + ').');
		}
		if (slave.addict > 0) {
			res.push('Addicted to aphrodisiacs (' + slave.addict.toFixed(0) + ').');
		}
		return res.join(' ');
	}

	/**
	 * @param {number} id The id of the parent slave
	 * @returns {string|DocumentFragment|HTMLSpanElement} the full name of the slave, if available
	 */
	function parentFullName(id) {
		if (id === 0) {
			return App.UI.DOM.makeElement("span", "unknown", "note");
		}
		if (id === -1) {
			/* The PC */
			return birthFullName(V.PC) + ' (PC)';
		} else {
			let parent = V.genePool.find(function(s) {
				return s.ID === id;
			});
			return parent
				? birthFullName(parent)
				: App.Events.makeNode([
					App.UI.DOM.makeElement("span", "missing", "note"),
					`(${id})`
				]);
		}
	}

	let outerDiv = App.UI.DOM.appendNewElement("div", node);
	outerDiv.style.position = "relative";
	outerDiv.style.width = "100%";
	outerDiv.style.height = "100%";

	let innerDiv = App.UI.DOM.appendNewElement("div", outerDiv);
	innerDiv.id = "slaveList";
	innerDiv.style.width = "20em";
	innerDiv.style.float = "left";

	innerDiv = App.UI.DOM.appendNewElement("div", outerDiv);
	innerDiv.id = "geneDetails";
	innerDiv.style.position = "fixed";
	innerDiv.style.left = "0";
	innerDiv.style.right = "0";
	innerDiv.style.top = "0";
	innerDiv.style.bottom = "0";
	innerDiv.style.marginLeft = "40em";
	innerDiv.style.marginRight = "2.5em";
	innerDiv.style.marginTop = "2.5em";

	jQuery(function() {
		let slaveList = jQuery('#slaveList');
		_(V.genePool).sortBy(['birthName', 'birthSurname']).forEach(function(s) {
			slaveList.append(nameButton(s));
		});
		jQuery(document).off('.edit-genetics');
		jQuery(document).on('keyup.edit-genetics', function(e) {
			if (slaveList.is(':visible')) {
				let currentSelection = jQuery('button.selectedslave');
				switch (e.keyCode) {
					case 38: /* ArrowUp */
						if (currentSelection.length === 0) {
							slaveList.find('button').last().trigger('click');
						} else {
							currentSelection.prev().trigger('click');
						}
						break;
					case 40: /* ArrowDown */
						if (currentSelection.length === 0) {
							slaveList.find('button').first().trigger('click');
						} else {
							currentSelection.next().trigger('click');
						}
						break;
					default:
						/* do nothing */
						break;
				}
			}
		});
		let geneDetails = jQuery('#geneDetails');
		jQuery('.slavepicker').each(function() {
			let el = jQuery(this);
			let id = Number(el.attr('data-slave'));
			el.on('click', function() {
				jQuery('button.selectedslave').removeClass('selectedslave');
				el.addClass('selectedslave');
				let slave = V.genePool.find(function(s) { return s.ID === id; });
				geneDetails.html(geneDetailsFunction(slave));

				let numberEditorOpen = function() {
					let td = jQuery(this);
					td.off('click');
					let attr = String(td.attr('data-param'));
					let min = Number(td.attr('data-min')) || -100;
					let max = Number(td.attr('data-max')) || 100;
					let editableText = jQuery('<input type="number" min="' + min + '" max="' + max + '" />');
					editableText.val(Number(slave[attr]));
					editableText.keyup(function(e) {
						if (e.keyCode === 13) {
							slave[attr] = Number(jQuery(this).val());
							el.trigger('click');
						}
					});
					editableText.blur(function() {
						slave[attr] = Number(jQuery(this).val());
						el.trigger('click');
					});
					td.empty().append(editableText);
					editableText.focus();
				};
				geneDetails.find('td.number-editor').click(numberEditorOpen);
				let stringEditorOpen = function() {
					let td = jQuery(this);
					td.off('click');
					let attr = String(td.attr('data-param'));
					let editableText = jQuery('<input type="text" />');
					editableText.val(String(slave[attr]));
					editableText.keyup(function(e) {
						if (e.keyCode === 13) {
							slave[attr] = String(jQuery(this).val());
							el.trigger('click');
						}
					});
					editableText.blur(function() {
						slave[attr] = String(jQuery(this).val());
						el.trigger('click');
					});
					td.empty().append(editableText);
					editableText.focus();
				};
				geneDetails.find('td.string-editor').click(stringEditorOpen);
				let choiceEditorOpen = function() {
					let td = jQuery(this);
					td.off('click');
					let attr = String(td.attr('data-param'));
					let choices = String(td.attr('data-choices')).split(/,\s*/);
					let editableText = jQuery('<select>' + choices.map(ch => '<option>' + ch + '</option>').join('') + '</select>');
					editableText.val(String(slave[attr]));
					editableText.keyup(function(e) {
						if (e.keyCode === 13) {
							slave[attr] = String(jQuery(this).val());
						}
					});
					editableText.blur(function() {
						slave[attr] = String(jQuery(this).val());
					});
					td.empty().append(editableText);
					editableText.focus();
				};
				geneDetails.find('td.choice-editor').each(choiceEditorOpen);
			});
		});
	});

	return node;
};
