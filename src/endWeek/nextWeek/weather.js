App.EndWeek.weather = function() {
	if (V.weatherRemaining === 0) {
		if (V.continent === "Africa") {
			V.weatherType = either(1, 1, 1, 1, 1, 2, 3, 4, 4, 5, 6, 6);
		} else if (V.continent === "Asia") {
			V.weatherType = either(1, 2, 2, 2, 2, 3, 4, 4, 5, 6);
		} else if (V.continent === "Australia") {
			V.weatherType = either(1, 1, 1, 2, 2, 2, 3, 4, 4, 5, 6);
		} else if (V.continent === "Western Europe") {
			V.weatherType = either(1, 2, 2, 3, 4, 5, 5, 6);
		} else if (V.continent === "Central Europe") {
			V.weatherType = either(1, 2, 3, 4, 5, 5, 5, 6);
		} else if (V.continent === "Scandinavia") {
			V.weatherType = either(1, 2, 3, 4, 5, 5, 5, 5, 5, 6);
		} else if (V.continent === "Eastern Europe") {
			V.weatherType = either(1, 2, 3, 4, 4, 5, 5, 5, 6);
		} else if (V.continent === "Southern Europe") {
			V.weatherType = either(1, 1, 1, 2, 2, 3, 4, 4, 5, 6);
		} else if (V.continent === "Brazil") {
			V.weatherType = either(1, 1, 2, 3, 3, 3, 4, 4, 5, 6);
		} else if (V.continent === "Japan") {
			V.weatherType = either(1, 2, 2, 2, 3, 4, 4, 5, 6, 6);
		} else if (V.continent === "the Middle East") {
			V.weatherType = either(1, 1, 1, 1, 1, 2, 3, 4, 4, 5, 6);
		} else if (V.continent === "North America") {
			V.weatherType = either(1, 2, 3, 3, 4, 5, 6, 6, 6);
		} else if (V.continent === "South America") {
			V.weatherType = either(1, 1, 2, 3, 3, 3, 4, 4, 5, 6);
		} else if (V.terrain === "oceanic") {
			V.weatherType = either(1, 2, 2, 2, 2, 2, 3, 4, 5, 6);
		}
		V.weatherRemaining = random(3, 6);
	}

	if (V.weatherLastWeek === 0) {
		V.weatherLastWeek = 1;
	}

	const seed = random(1, 10);
	if (V.weatherType === 1) {
		if (V.week < 25) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.hotNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 1) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.hotNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 2) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.hotNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.hotHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 3) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.hotHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 1) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.hotNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 2) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.hotNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 3) {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.hotHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 3) {
			if (seed > 5) {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.hotHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 1) {
			if (seed > 8) {
				V.weatherToday = App.Data.Weather.hotNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 2) {
			if (seed > 7) {
				V.weatherToday = App.Data.Weather.hotNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 5) {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.hotHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 3) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.hotLight.random();
				V.weatherLastWeek = 2;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.hotHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.hotExtreme.random();
				V.weatherLastWeek = 4;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 4) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.hotHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.hotExtreme.random();
				V.weatherLastWeek = 4;
			}
		}
	} else if (V.weatherType === 2) {
		if (V.week < 25) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.windyNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 1) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.windyNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 2) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.windyNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.windyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 3) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.windyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 1) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.windyNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 2) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.windyNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 3) {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.windyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 3) {
			if (seed > 5) {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.windyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 1) {
			if (seed > 8) {
				V.weatherToday = App.Data.Weather.windyNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 2) {
			if (seed > 7) {
				V.weatherToday = App.Data.Weather.windyNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 5) {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.windyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 3) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.windyLight.random();
				V.weatherLastWeek = 2;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.windyHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.windyExtreme.random();
				V.weatherLastWeek = 4;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 4) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.windyHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.windyExtreme.random();
				V.weatherLastWeek = 4;
			}
		}
	} else if (V.weatherType === 3) {
		if (V.week < 25) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.smokyNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 1) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.smokyNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 2) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.smokyNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.smokyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 3) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.smokyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 1) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.smokyNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 2) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.smokyNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 3) {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.smokyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 3) {
			if (seed > 5) {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.smokyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 1) {
			if (seed > 8) {
				V.weatherToday = App.Data.Weather.smokyNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 2) {
			if (seed > 7) {
				V.weatherToday = App.Data.Weather.smokyNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 5) {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.smokyHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 3) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.smokyLight.random();
				V.weatherLastWeek = 2;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.smokyHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.smokyExtreme.random();
				V.weatherLastWeek = 4;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 4) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.smokyHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.smokyExtreme.random();
				V.weatherLastWeek = 4;
			}
		}
	} else if (V.weatherType === 4) {
		if (V.week < 25) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.toxicNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 1) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.toxicNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 2) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.toxicNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.toxicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 3) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.toxicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 1) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.toxicNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 2) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.toxicNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 3) {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.toxicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 3) {
			if (seed > 5) {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.toxicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 1) {
			if (seed > 8) {
				V.weatherToday = App.Data.Weather.toxicNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 2) {
			if (seed > 7) {
				V.weatherToday = App.Data.Weather.toxicNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 5) {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.toxicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 3) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.toxicLight.random();
				V.weatherLastWeek = 2;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.toxicHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.toxicExtreme.random();
				V.weatherLastWeek = 4;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 4) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.toxicHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.toxicExtreme.random();
				V.weatherLastWeek = 4;
			}
		}
	} else if (V.weatherType === 5) {
		if (V.week < 25) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.coldNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 1) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.coldNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 2) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.coldNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.coldHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 3) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.coldHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 1) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.coldNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 2) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.coldNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 3) {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.coldHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 3) {
			if (seed > 5) {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.coldHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 1) {
			if (seed > 8) {
				V.weatherToday = App.Data.Weather.coldNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 2) {
			if (seed > 7) {
				V.weatherToday = App.Data.Weather.coldNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 5) {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.coldHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 3) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.coldLight.random();
				V.weatherLastWeek = 2;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.coldHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.coldExtreme.random();
				V.weatherLastWeek = 4;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 4) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.coldHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.coldExtreme.random();
				V.weatherLastWeek = 4;
			}
		}
	} else if (V.weatherType === 6) {
		if (V.week < 25) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.tectonicNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 1) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.tectonicNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 2) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.tectonicNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.tectonicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 50 && V.weatherLastWeek === 3) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.tectonicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 1) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.tectonicNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 2) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.tectonicNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 3) {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.tectonicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week < 75 && V.weatherLastWeek === 3) {
			if (seed > 5) {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.tectonicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 1) {
			if (seed > 8) {
				V.weatherToday = App.Data.Weather.tectonicNice.random();
				V.weatherLastWeek = 1;
			} else {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 2) {
			if (seed > 7) {
				V.weatherToday = App.Data.Weather.tectonicNice.random();
				V.weatherLastWeek = 1;
			} else if (seed > 5) {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			} else {
				V.weatherToday = App.Data.Weather.tectonicHeavy.random();
				V.weatherLastWeek = 3;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 3) {
			if (seed > 6) {
				V.weatherToday = App.Data.Weather.tectonicLight.random();
				V.weatherLastWeek = 2;
			} else if (seed > 2) {
				V.weatherToday = App.Data.Weather.tectonicHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.tectonicExtreme.random();
				V.weatherLastWeek = 4;
			}
		} else if (V.week > 75 && V.weatherLastWeek === 4) {
			if (seed > 4) {
				V.weatherToday = App.Data.Weather.tectonicHeavy.random();
				V.weatherLastWeek = 3;
			} else {
				V.weatherToday = App.Data.Weather.tectonicExtreme.random();
				V.weatherLastWeek = 4;
			}
		}
	}
};
