App.Desc.Player.longDescription = function(PC = V.PC) {
	const r = new SpacedTextAccumulator();
	const raceA = ["asian", "amerindian", "indo-aryan"].includes(PC.race) ? "an" : "a"; // addA() was inheriting colors.

	r.push(`You take yourself in in a full length mirror. You are`);
	if (!PC.nationality || V.seeNationality !== 1 || PC.nationality === "Stateless" || PC.nationality === "slave") {
		r.push(`${raceA} <span class="race">${PC.race}</span>`);
	} else if (PC.nationality === "Zimbabwean" && PC.race === "white") {
		r.push(`a <span class="nationality">Rhodesian</span>`);
	} else if (PC.nationality === "Vatican") {
		r.push(`${raceA} <span class="race">${PC.race}</span> <span class="nationality">Vatican</span>`);
	} else {
		r.push(`${raceA} <span class="race">${PC.race}</span> <span class="nationality">${PC.nationality}</span> `);
	}
	if (PC.dick && PC.vagina !== -1) {
		r.push(`futanari`);
	} else if (PC.dick > 0) {
		r.push(`${PC.actualAge > 12 ? "man" : "boy"}`);
	} else {
		r.push(`${PC.actualAge > 12 ? "woman" : "girl"}`);
	}
	r.push(`with`);
	if (PC.markings === "freckles") {
		r.push(`freckled`);
	} else if (PC.markings === "heavily freckled") {
		r.push(`heavily freckled`);
	}
	r.push(`${PC.skin} skin,`);

	r.push(App.Desc.Player.face(PC));
	r.toParagraph();

	if (canStand(PC)) {
		r.push(`You take a step back to focus more on your overall self.`);
	} else if (isMovable(PC)) {
		r.push(`You roll yourself back to focus more on your overall self.`);
	}
	r.push(App.Desc.Player.body(PC));
	r.toParagraph();
	r.push(
		`Looking down,`,
		App.Desc.Player.boobs()
	);
	r.push(
		`${PC.boobs >= 300 ? "Past them" : "And past that"},`,
		App.Desc.Player.belly(),
	);
	r.toParagraph();
	if (PC.belly >= 100000) {
		r.push(`You're a bit too wide now to see it from the front, but you have`);
	} else {
		r.push(`As for your sides, you have`);
	}
	r.push(App.Desc.Player.waist());
	r.push(`It flows into your`);
	r.push(App.Desc.Player.butt());
	r.toParagraph();
	if (!isMovable(PC)) {
		r.push(`You roll over to get a better view of your crotch.`);
	} else if (PC.belly >= 100000 || PC.weight > 160) {
		r.push(`You shift your weight and make use of some angled mirrors to see your crotch beneath your ${!canMove(PC) ? "lap-filling " : ""}belly.`);
	} else if (PC.dick === 0 && PC.vagina === -1) {
		r.push(`You turn your attention to your nether regions.`);
	} else if (PC.dick > 0) {
		r.push(`You turn your attention to your most valuable asset, your crotch.`);
	} else {
		r.push(`You turn your attention to your special place.`);
	}
	r.push(App.Desc.Player.crotch());
	r.toParagraph();

	r.push(App.Desc.Player.health());
	r.toParagraph();

	return r.container();
};
