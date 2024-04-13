App.Facilities.Brothel.ads = function() {
	const div = document.createElement("div");

	App.UI.DOM.appendNewElement("h1", div, `${capFirstChar(V.brothelName)} Advertisements`, ['margin-bottom']);

	div.append(
		intro(),
		spending(),
		report(),
	);

	return div;

	function intro() {
		const div = App.UI.DOM.makeElement("div", null, ['scene-intro', 'margin-bottom']);
		const text = [];

		switch (V.brothelDecoration) {
			case "Roman Revivalist":
				text.push(`${capFirstChar(V.brothelName)} is decorated as a Roman whorehouse. Refreshments are served at a bar, and someone is playing pipes in the back.`);
				break;
			case "Neo-Imperialist":
				text.push(`${capFirstChar(V.brothelName)} is decorated as a seamless intersection of technology and tradition. Slaves dressed in tight bodysuits and skimpy nanoweave flit underneath the glow of sleek walls and flowing feudal banners.`);
				break;
			case "Aztec Revivalist":
				text.push(`${capFirstChar(V.brothelName)} is decorated as an Aztec ode to fertility and nature. Clients may sacrifice a bit of blood to honor the goddess of Filth or to partake in a fertility ritual before joining the girl of their choosing.`);
				break;
			case "Egyptian Revivalist":
				text.push(`${capFirstChar(V.brothelName)} is decorated as an ancient Egyptian fertility temple. Customers are bade relax on couches next to running water so that slaves may dance to entice them.`);
				break;
			case "Edo Revivalist":
				text.push(`${capFirstChar(V.brothelName)} is furnished as an Edo period pleasure house, seedy by the standards of the time. Still, girls usually keep their clothes on until they lead patrons back behind the sliding paper screens, though this does not stop silhouettes of the activities within from being visible on them.`);
				break;
			case "Arabian Revivalist":
				text.push(`${capFirstChar(V.brothelName)} is furnished as an Arabian slave market, with the merchandise standing on little platforms, prices visible. Customers are permitted to fondle before making a decision and dragging a girl back behind a curtain.`);
				break;
			case "Chinese Revivalist":
				text.push(`${capFirstChar(V.brothelName)} is furnished as an old Chinese pleasure house, with each girl set up in her own low room. They stand outside the doors, luring customers back one by one.`);
				break;
			case "Chattel Religionist":
				text.push(`${capFirstChar(V.brothelName)} is decorated as a place of worship. The air is scented by censers, and the slaves here maintain an air of holiness even when being sodomized in public.`);
				break;
			case "Degradationist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a dungeon. The décor involves a lot of black leather and burnished steel, and the slaves on offer are mostly chained to beds and walls.`);
				break;
			case "Repopulationist":
				text.push(`${capFirstChar(V.brothelName)} is clean and full of soft couches and chairs for its pregnant whores to lounge upon while showing off their assets. Several of the rooms are prepped to allow a whore to give birth in front of an audience. A supply of freshly squeezed breast milk is available on tap.`);
				break;
			case "Eugenics":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a club. Loud music is playing, and the whores that aren't with customers are stripping and pole dancing on a stage. Safe sex is greatly encouraged. The real action happens in several reserved rooms dedicated to society's best, since the loud music drowns out private conversations.`);
				break;
			case "Asset Expansionist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a club. Loud music is playing, and the whores that aren't with customers are stripping and pole dancing on a stage.`);
				break;
			case "Transformation Fetishist":
				text.push(`${capFirstChar(V.brothelName)} is sterile and clean. Interactive screens on the walls list the whores and their modifications in clinical detail.`);
				break;
			case "Gender Radicalist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like an old world bordello. The rich décor includes erotic photography and pornographic statuary, depicting every possible combination of human sexual congress.`);
				break;
			case "Gender Fundamentalist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like an old world whorehouse. Screens on the walls are showing pornography starring the whores, with prices flashing after each sex act.`);
				break;
			case "Physical Idealist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a club. Loud music is playing, and the whores that aren't with customers are stripping on a stage. There is a distinct smell of sweat, and there is as much emphasis on the strippers' muscles as their breasts.`);
				break;
			case "Subjugationist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to celebrate the degradation of ${V.arcologies[0].FSSubjugationistRace} whores. The whores greet customers in stereotypical ${V.arcologies[0].FSSubjugationistRace} accents.`);
				break;
			case "Supremacist":
				text.push(`${capFirstChar(V.brothelName)} is decorated like an old world gentleman's club. The pictures on the wall depict degradation of every race on earth, except ${V.arcologies[0].FSSupremacistRace} people.`);
				break;
			case "Paternalist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a normal bar. Whores are encouraged to meet customers for a drink and get to know them a little before heading back into a private room.`);
				break;
			case "Maturity Preferentialist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a refined bar. It has a row of sturdy backless barstools, perfect for a delectable selection of succulent MILFs to perch on.`);
				break;
			case "Youth Preferentialist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a the sort of bar old world students visit on spring break. Vapid music is playing, and when whores aren't with customers, they dance and make out with each other to attract some.`);
				break;
			case "Body Purist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like an old world bordello. The rich décor includes erotic photography and pornographic statuary, depicting idealized human forms in the act of love.`);
				break;
			case "Slimness Enthusiast":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like an old world bordello. The rich décor includes erotic photography and pornographic statuary, depicting slim, girlish figures playing, dancing, and loving.`);
				break;
			case "Pastoralist":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a dairy. Though it isn't one, there is an intense sexual focus on boobs and lactation, and all the whores have their sizes proudly posted.`);
				break;
			case "Hedonistic":
				text.push(`${capFirstChar(V.brothelName)} is comfortable and full of soft couches and chairs for its overweight whores to lounge upon between clients ${V.arcologies[0].FSHedonisticDecadenceResearch === 1 ?'and enjoy a plate of snacks':'and enjoy a big cup of slave food'}. The smells of fresh baked goods are pumped into the facility to mask the smell of sweat. It's not unusual for a client to fuck a whore right on her chosen couch, since the effort of moving is often too much.`);
				break;
			case "Intellectual Dependency":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a club. The sexually charged atmosphere has the whores horny and making out with each other. Customers are expected to come in, grab a bimbo to their tastes, and pull them off to have a good time.`);
				break;
			case "Slave Professionalism":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like a high-class bordello. Courtesans are expected to greet and entice customers to join them for a night they'll never forget.`);
				break;
			case "Petite Admiration":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like an old world whorehouse. The whores have personal platforms to stand on for inspection from their taller customers.`);
				break;
			case "Statuesque Glorification":
				text.push(`${capFirstChar(V.brothelName)} is decorated to look like an old world bordello. The rich décor specializes in pornographic statuary, depicting towering human forms in the act of love.`);
				break;
		}

		if (V.brothelAdsSpending > 0) {
			text.push(`Screens outside the entrance are showing porn to advertise the brothel.`);

			if (V.brothelAdsOld === 1) {
				text.push(`The featured slave actresses are all MILFs.`);
			} else if (V.brothelAdsOld === -1) {
				text.push(`The featured slave actresses are all nice and young.`);
			} else if (V.brothelAdsOld === -2) {
				text.push(`The featured slave actresses are all teenagers.`);
			} else if (V.brothelAdsOld === -3) {
				text.push(`The featured slave actresses are all lolis.`);
			} else {
				text.push(`The featured slave actresses vary in age.`);
			}

			if (V.brothelAdsStacked === 1) {
				text.push(`Lots of bouncing breasts and butts`);
			} else if (V.brothelAdsStacked === -1) {
				text.push(`Lots of trim breasts and shapely butts`);
			} else {
				text.push(`A variety of breast and butt sizes and shapes`);
			}

			text.push(`are on display, and`);

			if (V.brothelAdsImplanted === 1) {
				text.push(`most of these are augmented by implants.`);
			} else if (V.brothelAdsImplanted === -1) {
				text.push(`they're all natural.`);
			} else {
				text.push(`some are augmented by implants.`);
			}

			if (V.seePreg) {
				if (V.brothelAdsPreg === 1) {
					text.push(`Most of the slaves have firm, rounded bellies.`);
				} else if (V.brothelAdsPreg === -1) {
					text.push(`Most of the slaves have firm, flat bellies.`);
				} else {
					text.push(`Some of the slaves are pregnant.`);
				}
			}

			if (V.brothelAdsModded === 1) {
				text.push(`Everything is heavily pierced and tattooed.`);
			} else if (V.brothelAdsModded === -1) {
				text.push(`Everything is free of tattoos and piercings.`);
			} else {
				text.push(`Some of these assets are tattooed and pierced, and some aren't.`);
			}

			text.push(`The slaves in the ads are`);

			if (V.brothelAdsXX === 1) {
				text.push(`sucking dick and taking cock in their pussies and asses.`);
			} else if (V.brothelAdsXX === -1) {
				text.push(`sucking cock and being assfucked while their dicks flop around.`);
			} else {
				text.push(`sucking dick and taking anal, and the ones that have pussies are being fucked there, too.`);
			}
		}

		div.append(text.join(' '));

		return div;
	}

	function spending() {
		const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
		let text = [];
		const links = [];

		if (V.brothelAdsSpending >= 5000) {
			text.push(`Advertisements based on these scenes run constantly in media across ${V.arcologies[0].name}, and there's an active merchandising campaign underway to promote your whores.`);
		} else if (V.brothelAdsSpending >= 4000) {
			text.push(`Advertisements based on these scenes run constantly in media across ${V.arcologies[0].name}.`);
		} else if (V.brothelAdsSpending >= 3000) {
			text.push(`Advertisements based on these scenes are run in media across ${V.arcologies[0].name}.`);
		} else if (V.brothelAdsSpending >= 2000) {
			text.push(`Advertisements based on these scenes run regularly in arcology media.`);
		} else if (V.brothelAdsSpending >= 1000) {
			text.push(`Advertisements based on these scenes run occasionally in arcology media.`);
		} else {
			text.push(`${V.arcologies[0].name} has a robust internal media that could be used to bring customers into the brothel.`);
		}
		App.Events.addNode(div, text, "p", "scene-intro");

		text = [];
		text.push(`You are spending ${cashFormatColor(V.brothelAdsSpending, true)} each week to advertise ${V.brothelName}.`);

		if (V.lastWeeksCashIncome.brothelAds > 0) {
			text.push(`Last week's ads increased profits by ${cashFormatColor(V.lastWeeksCashIncome.brothelAds)}${App.Entity.facilities.brothel.hostedSlaves() > 1 ? ` and increased business for your whores` : ``}, and cost ${cashFormatColor(V.lastWeeksCashExpenses.brothelAds)}.`);
		}

		App.Events.addNode(div, text);

		if (V.brothelAdsSpending >= 1000) {
			links.push(App.UI.DOM.link(`Decrease`, () => {
				V.brothelAdsSpending -= 1000;
				App.UI.reload();
			}));
		} else {
			links.push(App.UI.DOM.disabledLink(`Decrease`, [`Minimum reached`]));
		}
		if (V.brothelAdsSpending < 5000) {
			links.push(App.UI.DOM.link(`Increase`, () => {
				V.brothelAdsSpending += 1000;
				App.UI.reload();
			}));
		} else {
			links.push(App.UI.DOM.disabledLink(`Increase`, [`Maximum reached`]));
		}

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);

		return div;
	}

	function report() {
		const div = document.createElement("div");

		App.UI.DOM.appendNewElement("h2", div, `Ad Campaign`);
		App.UI.DOM.appendNewElement("div", div, App.Ads.report("brothel", true));

		return div;
	}
};
