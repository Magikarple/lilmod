App.UI.mediaStudio = function() {
	const t = new DocumentFragment();
	const r = new SpacedTextAccumulator(t);

	r.push(`The media hub is a small room wired in to almost every camera in ${V.arcologies[0].name}. From here, you and your personal assistant can edit, produce, and distribute pornography featuring your slaves going about their daily lives.`);
	r.toNode("p", ["note"]);

	if (V.studioFeed === 0) {
		r.push(makePurchase("Upgrade the media hub to allow better control of pornographic content", 15000, "capEx", {
			handler: () => { V.studioFeed = 1; },
			refresh: () => App.UI.reload()
		}));
	} else {
		r.push(`It has been upgraded to allow superior control of a slave's pornographic content.`);
	}
	r.toParagraph();

	if (V.PC.career === "escort" || V.PC.career === "prostitute" || V.PC.career === "child prostitute") {
		if (V.PC.career === "escort") {
			r.push(`You retain some contacts from your past life in the industry that may be willing to cut you some discounts on promotion costs, should you return to it.`);
		} else {
			r.push(`You were approached in the past to star in some adult films and they may be willing to cut you some discounts on promotion costs, should you accept their offer.`);
		}
		if (V.PCSlutContacts !== 2) {
			r.push(`You are not baring your body for all to see.`);
			r.push(
				App.UI.DOM.link(
					`Star in porn for a discount`,
					() => {
						V.PCSlutContacts = 2;
						App.UI.reload();
					}
				)
			);
		} else {
			if (V.PC.career === "escort") {
				r.push(`You are starring in hardcore porn once more.`);
			} else if (V.PC.actualAge < V.minimumSlaveAge) {
				r.push(`You are taking part in porn that may disturb people.`);
			} else {
				r.push(`You are starring in some hardcore porn.`);
			}
			r.push(
				App.UI.DOM.link(
					`Stop doing porn for a discount`,
					() => {
						V.PCSlutContacts = 1;
						App.UI.reload();
					}
				)
			);
		}
		r.toParagraph();
	}

	const summary = {
		actors: 0,
		promoted: 0,
		totalCost: 0,
	};
	const genres = App.Porn.getAllGenres();
	/** @type {Map<string, {qualified: number, focusing: number, investment: number, highFame: number, p1: number, p3: boolean, type: string}>} */
	const byGenre = new Map([]);
	for (const genre of genres) {
		byGenre.set(genre.uiName(), {
			qualified: 0,
			focusing: 0,
			investment: 0,
			highFame: 0,
			p1: V.pornStars[genre.fameVar].p1count,
			p3: V.pornStars[genre.fameVar].p3ID !== 0,
			type: genre.type.name
		});
	}
	for (const slave of V.slaves) {
		if (slave.porn.feed) {
			summary.actors++;
			if (slave.porn.spending > 0) {
				summary.promoted++;
				summary.totalCost += slave.porn.spending;
			}
		}
		for (const genre of genres) {
			const genreStats = byGenre.get(genre.uiName());
			if (genre.valid(slave)) {
				genreStats.qualified++;
			}
			if (slave.porn.feed && slave.porn.focus === genre.focusName) {
				genreStats.focusing++;
				if (slave.porn.spending > 0) {
					genreStats.investment += slave.porn.spending;
				}
			}
			if (slave.porn.fameType === genre.fameName) {
				genreStats.highFame++;
			}
		}
	}
	r.push(`${num(summary.actors)} of your ${num(V.slaves.length)} slaves are currently featured in porn. You are spending a total of ${cashFormatColor(summary.totalCost)} promoting ${num(summary.promoted)} of them.`);
	r.toParagraph();

	App.UI.DOM.appendNewElement("h2", t, `Genre Coverage`);

	function grayZero(number) {
		if (number === 0) {
			return `<span class="gray">-</span>`;
		} else {
			return `${number}`;
		}
	}

	function TableComparer(index) {
		return function(a, b) {
			const TableCellValue = (row, index) => $(row).children("td").eq(index).text();
			const valA = TableCellValue(a, index);
			const valB = TableCellValue(b, index);
			const numA = parseFloat(valA);
			const numB = parseFloat(valB);
			return (isFinite(numA) && isFinite(numB)) ? numA - numB : valA.toString().localeCompare(valB);
		};
	}

	const table = App.UI.DOM.appendNewElement("table", t, ``, ["genre-stats"]);
	const thead = App.UI.DOM.appendNewElement("thead", table);
	App.UI.DOM.makeRow(thead, "Genre", "Slaves qualified", "Slaves focusing", "Investment", "Saturation", "Active pornstars", "World-famous pornstar");
	const tbody = App.UI.DOM.appendNewElement("tbody", table);
	for (const [genre, stats] of byGenre) {
		App.UI.DOM.makeRow(tbody, `<span class="genre ${stats.type}">${genre}</span>`, grayZero(stats.qualified), grayZero(stats.focusing), cashFormatColor(stats.investment), grayZero(stats.p1), grayZero(stats.highFame), stats.p3 ? `✓` : ``);
	}
	$(thead).on("click", "tr td:not(.no-sort)", function() {
		let rows = $(tbody).find("tr").toArray().sort(TableComparer($(this).index()));
		const dir = $(this).hasClass("sort-asc") ? "desc" : "asc";

		if (dir === "desc") {
			rows = rows.reverse();
		}

		for (const row of rows) {
			tbody.append(row);
		}

		$(thead).find("tr td").removeClass("sort-asc").removeClass("sort-desc");
		$(this).addClass("sort-" + dir);
	});

	App.UI.DOM.appendNewElement("h2", t, `Slaves`);

	/** @param {App.Entity.SlaveState} slave */
	function slavePornSummary(slave) {
		const res = new DocumentFragment();

		if (V.slavePanelStyle === 0) {
			res.appendChild(document.createElement("br"));
		} else if (V.slavePanelStyle === 1) {
			const hr = document.createElement("hr");
			hr.style.margin = "0";
			res.appendChild(hr);
		}

		if (batchRenderer && (!V.seeCustomImagesOnly || (V.seeCustomImagesOnly && slave.custom.image))) {
			let imgDiv = document.createElement("div");
			imgDiv.classList.add("imageRef", "smlImg", "margin-right");
			imgDiv.appendChild(batchRenderer.render(slave));
			res.appendChild(imgDiv);
		}

		const r = new SpacedTextAccumulator(res);
		r.push(App.UI.DOM.link(SlaveFullName(slave), () => { V.AS = slave.ID; }, [], "Slave Interact"));
		if (slave.porn.feed) {
			r.push("is making porn.");
		} else {
			r.push("is");
			r.push(App.UI.DOM.makeElement("span", "not making porn.", ["red"]));
		}
		const f2 = new DocumentFragment();
		App.UI.SlaveSummaryImpl.bits.long.porn_prestige(slave, f2); // why do these bits not just return the element?
		App.UI.SlaveSummaryImpl.bits.long.face(slave, f2);
		r.push(f2);
		if (V.studioFeed && slave.porn.feed) {
			if (slave.porn.focus === "none") {
				r.push("Guided by viewers.");
			} else {
				const genre = App.Porn.getGenreByFocusName(slave.porn.focus);
				r.push("Focused on");
				r.push(App.UI.DOM.makeElement("span", `${genre.focusName}`, ["genre", genre.type.name]));
				r.push("porn.");
			}
		}
		if (slave.porn.spending > 0) {
			r.push("Spending", App.UI.DOM.cashFormat(slave.porn.spending), "on promotion.");
		}
		r.toNode("div");

		if (slave.porn.feed) {
			r.push(App.UI.DOM.link("Stop releasing porn", () => {
				slave.porn.feed = 0;
				slave.porn.spending = 0;
				slave.porn.focus = "none";
				App.UI.reload();
			}));
			if (V.studioFeed) {
				r.push("Change Focus:");
				r.push(App.Porn.genreChoiceLinks(slave, () => App.UI.reload()));
			}
			r.push("Promotion:");
			if (slave.porn.spending === 0) {
				r.push(App.UI.DOM.link("Start promoting", () => {
					slave.porn.spending = 1000;
					App.UI.reload();
				}));
			} else {
				r.push(App.UI.DOM.generateLinksStrip([
					slave.porn.spending > 4000
						? App.UI.DOM.disabledLink("Increase", [`Spending more than ${cashFormat(5000)} weekly has no effect`])
						: App.UI.DOM.link("Increase", () => {
							slave.porn.spending += 1000;
							App.UI.reload();
						}),
					App.UI.DOM.link("Decrease", () => {
						slave.porn.spending -= 1000;
						App.UI.reload();
					})
				]));
			}
		} else {
			r.push(App.UI.DOM.link("Start releasing porn", () => {
				slave.porn.feed = 1;
				App.UI.reload();
			}));
		}
		r.toNode("div");

		res.append(App.Porn.makeFameProgressChart(slave));
		res.append(App.Porn.makeViewershipChart(slave));

		return res;
	}

	// just dump them all into one giant list for now. TODO: sorting and filtering might come later?
	const slaves = V.slaves;
	let batchRenderer = null;
	if ((V.seeImages === 1) && (V.seeSummaryImages === 1)) {
		batchRenderer = new App.Art.SlaveArtBatch(slaves.map(s => s.ID), 1);
		t.appendChild(batchRenderer.writePreamble());
	} else {
		batchRenderer = null;
	}

	for (const slave of slaves) {
		let slaveDiv = document.createElement("div");
		slaveDiv.id = `slave-${slave.ID}`;
		slaveDiv.classList.add("slaveSummary");
		if (V.slavePanelStyle === 2) {
			slaveDiv.classList.add("card");
		}
		slaveDiv.appendChild(slavePornSummary(slave));
		t.append(slaveDiv);
	}

	return t;
};
