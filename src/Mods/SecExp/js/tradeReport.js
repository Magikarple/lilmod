App.Mods.SecExp.tradeReport = function() {
	let r = [];
	let tradeChange = 0;
	let bonus = 0;
	if (V.week < 30) {
		r.push(`The world economy is in good enough shape to sustain economic growth. Trade flows liberally in all the globe.`);
		tradeChange += 1;
	} else if (V.week < 60) {
		r.push(`The world economy is deteriorating, but still in good enough shape to sustain economic growth.`);
		tradeChange += 0.5;
	} else if (V.week < 90) {
		r.push(`The world economy is deteriorating, but still in decent enough shape to sustain economic growth.`);
	} else if (V.week < 120) {
		r.push(`The world economy is deteriorating and the slowing down of global growth is starting to have some effect on trade flow.`);
		tradeChange -= 1;
	} else {
		r.push(`The world economy is heavily deteriorated. The slowing down of global growth has a great negative effect on trade flow.`);
		tradeChange -= 2;
	}

	const warEffects = function(type) {
		if (V.SecExp[type].victories + V.SecExp[type].losses >= 1) {
			if (V.SecExp[type].lastEncounterWeeks < 2) {
				r.push(`The recent ${type === 'battles' ? 'attack' : 'rebellion'} has a negative effect on the trade of the arcology.`);
				tradeChange -= 1;
			} else if (V.SecExp[type].lastEncounterWeeks < 4) {
				r.push(`While some time has passed, the last ${type === 'battles' ? 'attack' : 'rebellion'} still has a negative effect on the commercial activity of the arcology.`);
				tradeChange -= 0.5;
			}
		}
	};

	warEffects('battles');
	warEffects('rebellions');

	if (V.terrain === "urban") {
		r.push(`Since your arcology is located in the heart of an urban area, its commerce is naturally vibrant.`);
		tradeChange++;
	} else if (V.terrain === "ravine") {
		r.push(`Since your arcology is located in the heart of a ravine, its commerce is hindered by a lack of accessibility.`);
		tradeChange -= 0.5;
	}

	if (["BlackHat", "capitalist", "celebrity", "wealth"].includes(V.PC.career)) {
		tradeChange += 1;
	} else if (["escort", "gang", "servant"].includes(V.PC.career)) {
		tradeChange -= 0.5;
	}

	if (V.rep > 12000) {
		r.push(`Your ${V.rep > 18000 ? 'extremely' : ''} high reputation attracts trade from all over the world.`);
		tradeChange += (V.rep > 18000 ? 2 : 1);
	}

	if (V.assistant.power > 0) {
		const lowPower = V.assistant.power === 1;
		r.push(`Due to ${lowPower ? '' : 'incredible'} computing power, ${V.assistant.name} is able to guide the commercial development of the arcology to greater levels.`);
		tradeChange += (lowPower ? 1 : 2);
	}

	if (V.SecExp.edicts.tradeLegalAid === 1) {
		r.push(`Your support in legal matters for new businesses helps improve the economic dynamicity of your arcology, boosting commercial activities.`);
		tradeChange += 1;
	}

	if (V.SecExp.edicts.taxTrade === 1) {
		r.push(`The fees imposed on transitioning goods do little to earn you the favor of the companies making use of your arcology.`);
		tradeChange -= 1;
	}

	if (V.SecExp.buildings.weapManu) {
		r.push(`The weapons manufacturing facility of the arcology attracts a significant amount of trade.`);
		tradeChange += 0.5 * (V.SecExp.buildings.weapManu.productivity + V.SecExp.buildings.weapManu.lab);
	}
	if (V.SecExp.buildings.transportHub) {
		if (V.SecExp.buildings.transportHub.airport === 1) {
			r.push(`The airport, while small, helps facilitate the commercial development of the arcology.`);
			tradeChange += 1;
		} else if (V.SecExp.buildings.transportHub.airport === 2) {
			r.push(`The airport, while fairly small, helps facilitate the commercial development of the arcology.`);
			tradeChange += 1.5;
		} else if (V.SecExp.buildings.transportHub.airport === 3) {
			r.push(`The airport helps facilitate the commercial development of the arcology.`);
			tradeChange += 2;
		} else if (V.SecExp.buildings.transportHub.airport === 4) {
			r.push(`The airport is a great boon to the commercial development of the arcology.`);
			tradeChange += 2.5;
		} else {
			r.push(`The airport is an incredible boon to the commercial development of the arcology.`);
			tradeChange += 3;
		}

		if (V.terrain !== "oceanic" && V.terrain !== "marine") {
			if (V.SecExp.buildings.transportHub.surfaceTransport === 1) {
				r.push(`The railway network's age and limited extension limit commercial activity.`);
			} else if (V.SecExp.buildings.transportHub.surfaceTransport === 2) {
				r.push(`The railway network is a great help to the commercial development of the arcology, but its limited extension hampers its potential.`);
				tradeChange += 1;
			} else if (V.SecExp.buildings.transportHub.surfaceTransport === 3) {
				r.push(`The railway network is a great help to the commercial development of the arcology.`);
				tradeChange += 1.5;
			} else {
				r.push(`The railway network is a huge help to the commercial development of the arcology. Few in the world can boast such a modern and efficient transport system.`);
				tradeChange += 2;
			}
		} else {
			if (V.SecExp.buildings.transportHub.surfaceTransport === 1) {
				r.push(`The docks' age and limited size limit commercial activity.`);
			} else if (V.SecExp.buildings.transportHub.surfaceTransport === 2) {
				r.push(`The docks are a great help to the commercial development of the arcology, but their limited size hampers its potential.`);
				tradeChange += 1;
			} else if (V.SecExp.buildings.transportHub.surfaceTransport === 3) {
				r.push(`The docks are a great help to the commercial development of the arcology.`);
				tradeChange += 1.5;
			} else {
				r.push(`The docks are a huge help to the commercial development of the arcology. Few in the world can boast such a modern and efficient transport system.`);
				tradeChange += 2;
			}
		}
	}

	const SF = App.Mods.SecExp.assistanceSF('trade');
	r.push(SF.text); tradeChange += SF.bonus;

	if (tradeChange > 0) {
		r.push(`This week <span class="green">trade improved.</span>`);
	} else if (tradeChange === 0) {
		r.push(`This week <span class="yellow">trade did not change.</span>`);
	} else {
		r.push(`This week <span class="red">trade diminished.</span>`);
	}

	V.SecExp.core.trade = Math.clamp(V.SecExp.core.trade + tradeChange, 0, 100);
	if (V.SecExp.core.trade <= 20) {
		r.push(`The almost non-existent trade crossing the arcology <span class="yellow">does little to promote growth.</span>`);
	} else if (V.SecExp.core.trade <= 40) {
		r.push(`The low level of trade crossing the arcology promotes a <span class="green">slow yet steady growth</span> of its economy.`);
		bonus += 1.5;
	} else if (V.SecExp.core.trade <= 60) {
		r.push(`With trade at positive levels, the <span class="green">prosperity of the arcology grows more powerful.</span>`);
		bonus += 2.5;
	} else if (V.SecExp.core.trade <= 80) {
		r.push(`With trade at high levels, the <span class="green">prosperity of the arcology grows quickly and violently.</span>`);
		bonus += 3.5;
	} else {
		r.push(`With trade at extremely high levels, the <span class="green">prosperity of the arcology grows with unprecedented speed.</span>`);
		bonus += 4.5;
	}

	return {text: r.join(" "), bonus: bonus};
};
