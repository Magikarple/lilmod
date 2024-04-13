App.Facilities.Club.ads = function() {
	const node = new DocumentFragment();
	let r = [];

	const clubNameCaps = capFirstChar(V.clubName);
	switch (V.clubDecoration) {
		case "Roman Revivalist":
			r.push(`${clubNameCaps} is decorated like a Roman villa's entertainment rooms. There is a lot of white stone, plaster, and terracotta.`);
			break;
		case "Neo-Imperialist":
			r.push(`${clubNameCaps} is a genuine temple of Imperial decadence. The blaze of bright neon lights flash and strobe on a mass of sweaty bodies, sleek speakers blaring synthetic music as banners with your family's crest flutter above the serenity of mindless dance. The stoic stone figures of Imperial Knights watching the entrance provide a stark contrast to the Bacchian passion of the dancers.`);
			break;
		case "Aztec Revivalist":
			r.push(`${clubNameCaps} is decorated with obsidian figures inserted in the lime walls and giant oak pillars that give a homey feeling to the otherwise cold building.`);
			break;
		case "Egyptian Revivalist":
			r.push(`${clubNameCaps} is decorated like a room in an ancient Egyptian palace. There are columns of warm stone and pools of clear water full of aquatic plants.`);
			break;
		case "Edo Revivalist":
			r.push(`${clubNameCaps} is furnished as an Edo period theater. Performances of the traditional Japanese arts can be seen here, though more modern dancing happens in the evenings. In either case, geisha girls are present and willing.`);
			break;
		case "Arabian Revivalist":
			r.push(`${clubNameCaps} is designed like an open plaza in an Arabian palace, with a raised stage in the center for erotic dancing. Diaphanous, flowing curtains billow across the space, dispersing the narcotic smoke billowing from a score of hookahs.`);
			break;
		case "Chinese Revivalist":
			r.push(`${clubNameCaps} is furnished as an old Chinese disorderly house. It's intentionally packed in so that closeness and good cheer is obligatory here; prominent citizens share tables while their hangers-on jostle for room.`);
			break;
		case "Antebellum Revivalist":
			r.push(`${clubNameCaps} is designed like a distinguished Old World theater with a large stage for cabaret. The air is filled with cigar smoke and raucous cries from the audience.`);
			break;
		case "Chattel Religionist":
			r.push(`${clubNameCaps} isn't a religious establishment, but it almost looks like one. It's clean and proper, with beams of natural light that come down to highlight holy sex slaves' bodies.`);
			break;
		case "Degradationist":
			r.push(`${clubNameCaps} has a perverted, debauched appearance. The décor is utilitarian so it can be cleaned easily, and the reason is obvious. Many patrons have brought their own slaves to publicly rape here.`);
			break;
		case "Repopulationist":
			r.push(`${clubNameCaps} has a gaudy appearance. There are lots of deep soft chairs for pregnant patrons and slaves to rest in and screens showing girls with large bellies lining the walls.`);
			break;
		case "Eugenics":
			r.push(`${clubNameCaps} has a gaudy appearance. There are screens lining the walls discouraging unprotected slave sex. The real action happens in the several exclusive rooms reserved for society's best.`);
			break;
		case "Asset Expansionist":
			r.push(`${clubNameCaps} has a gaudy appearance. There are a lot of neon lights and there are screens everywhere, showing off big tits and plush asses.`);
			break;
		case "Transformation Fetishist":
			r.push(`${clubNameCaps} has a gaudy appearance. There are a lot of neon lights and there are screens everywhere, showing off huge fake tits and plastic dick-sucking lips.`);
			break;
		case "Gender Radicalist":
			r.push(`${clubNameCaps} has a gaudy appearance. There are a lot of neon lights and there are screens everywhere, showing closeups of cocks fucking every imaginable orifice.`);
			break;
		case "Gender Fundamentalist":
			r.push(`${clubNameCaps} has an old world appearance, a decidedly throwback atmosphere harking back to the glory days of cultures past.`);
			break;
		case "Physical Idealist":
			r.push(`${clubNameCaps} isn't a gym, but it smells like one. The dancing is rough and competitive, and the drinks are rich with protein.`);
			break;
		case "Supremacist":
			r.push(`${clubNameCaps} is decorated like an upper-class gentleman's club in the old countries of ${V.arcologies[0].FSSupremacistRace} people.`);
			break;
		case "Subjugationist":
			r.push(`${clubNameCaps} is decorated like an upper-class gentleman's club in the old countries which favored ${V.arcologies[0].FSSubjugationistRace} slaves.`);
			break;
		case "Paternalist":
			r.push(`${clubNameCaps} is handsome and well-kept, even romantic. Though the slaves here are sex slaves, every provision is made to encourage them to enjoy themselves.`);
			break;
		case "Body Purist":
			r.push(`${clubNameCaps} is gorgeous, decorated and kept in the height of fashionable night establishment style. The music is cutting edge and everything and everyone is elegant.`);
			break;
		case "Slimness Enthusiast":
			r.push(`${clubNameCaps} is distinctly gaudy, with lots of sugary drinks on offer. The music and décor are of a decidedly bubblegum quality.`);
			break;
		case "Pastoralist":
			r.push(`${clubNameCaps} is decorated to resemble a frontier disorderly house. The drinks are pounded straight, and there's a set of swinging doors for bad men to part dramatically as they enter.`);
			break;
		case "Maturity Preferentialist":
			r.push(`${clubNameCaps} is surprisingly elegant. The music consists of refined remixes of traditional dance music, offering slaves and citizens the chance to dance beautifully together.`);
			break;
		case "Youth Preferentialist":
			r.push(`${clubNameCaps} is deafeningly loud. There's a bright light show running, offering staccato glimpses of the scene out on the dance floor.`);
			break;
		case "Hedonistic":
			r.push(`${clubNameCaps} has a gaudy appearance. The dance floor is extra large to accommodate its extra wide dancers, though bodies grinding against each other is an inevitability. Plenty of roomy, comfortable booths encircle the room for an exhausted citizen to relax with his plush dance partner, and a wide selection of greasy food accompanies the drinks.`);
			if (V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
				r.push(`Platters of food are complementary for feeding slaves`);
			} else {
				r.push(`Feeders are available in the booths to feed tired slaves`);
			}
			r.push(`while they get fondled.`);
			break;
		case "Intellectual Dependency":
			r.push(`${clubNameCaps} is distinctly gaudy and easy for slaves to move around in. The dancing is as energetic and sexual, and the drinks sugary and sweet.`);
			break;
		case "Slave Professionalism":
			r.push(`${clubNameCaps} is decorated like an upper-class gentleman's club. It is where a true courtesan works their craft.`);
			break;
		case "Petite Admiration":
			r.push(`${clubNameCaps} has a gaudy appearance. The dance floor is surrounded by raised platforms so even the shortest slave can be seen by the crowd.`);
			break;
		case "Statuesque Glorification":
			r.push(`${clubNameCaps} has a tiered appearance. The booths and bar are positioned overlooking the dance floor so patrons may loom over the dancing slaves even when seated.`);
	}

	if (V.clubAdsSpending > 0) {
		r.push(`Screens outside the entrance are showing softcore music videos to advertise ${V.clubName}.`);
		if (V.clubAdsOld === 1) {
			r.push(`The featured strippers are all MILFs.`);
		} else if (V.clubAdsOld === -1) {
			r.push(`The featured strippers are all nice and young.`);
		} else if (V.clubAdsOld === -2) {
			r.push(`The featured strippers are all teenagers.`);
		} else if (V.clubAdsOld === -3) {
			r.push(`The featured strippers are all lolis.`);
		} else {
			r.push(`The featured strippers vary in age.`);
		}
		if (V.clubAdsStacked === 1) {
			r.push(`Lots of bouncing breasts and butts`);
		} else if (V.clubAdsStacked === -1) {
			r.push(`Lots of trim breasts and shapely butts`);
		} else {
			r.push(`A variety of breast and butt sizes and shapes`);
		}
		r.push(`are on display, and`);
		if (V.clubAdsImplanted === 1) {
			r.push(`most of these are augmented by implants.`);
		} else if (V.clubAdsImplanted === -1) {
			r.push(`they're all natural.`);
		} else {
			r.push(`some are augmented by implants.`);
		}
		if (V.seePreg === 1) {
			if (V.clubAdsPreg === 1) {
				r.push(`Most of the strippers have firm, rounded bellies.`);
			} else if (V.clubAdsPreg === -1) {
				r.push(`Most of the strippers have firm, flat bellies.`);
			} else {
				r.push(`Some of the strippers are pregnant.`);
			}
		}
		if (V.clubAdsModded === 1) {
			r.push(`Everything is heavily pierced and tattooed.`);
		} else if (V.clubAdsModded === -1) {
			r.push(`Everything is free of tattoos and piercings.`);
		} else {
			r.push(`Some of these assets are tattooed and pierced, and some aren't.`);
		}
		r.push(`The strippers get naked quickly, and show off`);
		if (V.clubAdsXX === 1) {
			r.push(`their pussies and assholes.`);
		} else if (V.clubAdsXX === -1) {
			r.push(`their assholes.`);
		} else {
			r.push(`their holes.`);
		}
	}

	if (V.clubAdsSpending >= 5000) {
		r.push(`Advertisements based on these scenes run constantly in media across ${V.arcologies[0].name}, and there's an active merchandising campaign underway to promote your club and its girls.`);
	} else if (V.clubAdsSpending >= 4000) {
		r.push(`Advertisements based on these scenes run constantly in media across ${V.arcologies[0].name}.`);
	} else if (V.clubAdsSpending >= 3000) {
		r.push(`Advertisements based on these scenes are run in media across ${V.arcologies[0].name}.`);
	} else if (V.clubAdsSpending >= 2000) {
		r.push(`Advertisements based on these scenes run regularly in arcology media.`);
	} else if (V.clubAdsSpending >= 1000) {
		r.push(`Advertisements based on these scenes run occasionally in arcology media.`);
	} else {
		r.push(`${V.arcologies[0].name} has a robust internal media that could be used to bring patrons into the club.`);
	}
	App.Events.addNode(node, r, "p", "scene-intro");

	App.Events.addNode(node, [`You are spending ${cashFormatColor(V.clubAdsSpending, true)} each week to advertise ${V.clubName}.`]);

	const linkArray = [];
	if (V.clubAdsSpending >= 1000) {
		linkArray.push(App.UI.DOM.link(`Decrease`, () => {
			V.clubAdsSpending -= 1000;
			App.UI.reload();
		}));
	} else {
		linkArray.push(App.UI.DOM.disabledLink(`Decrease`, [`Minimum reached`]));
	}
	if (V.clubAdsSpending < 5000) {
		linkArray.push(App.UI.DOM.link(`Increase`, () => {
			V.clubAdsSpending += 1000;
			App.UI.reload();
		}));
	} else {
		linkArray.push(App.UI.DOM.disabledLink(`Increase`, [`Maximum reached`]));
	}


	App.UI.DOM.appendNewElement("div", node, App.UI.DOM.generateLinksStrip(linkArray), ['indent']);

	App.UI.DOM.appendNewElement("h2", node, `Design ${clubNameCaps} Ad Campaign`);

	App.UI.DOM.appendNewElement("div", node, `Will replace relevant variety bonuses`, "note");
	node.append(App.Ads.report("club", true));

	return node;
};
