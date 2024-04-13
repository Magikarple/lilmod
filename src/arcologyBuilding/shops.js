// cSpell:ignore garum, looky-loos

App.Arcology.Cell.Shop = class extends App.Arcology.Cell.BaseCell {
	/**
	 * @param {number} owner
	 * @param {FC.FutureSocietyDeco|"Brothel"|"Club"|"Shops"} type
	 */
	constructor(owner, type = "Shops") {
		super(owner);
		this.type = type;
	}

	static get cellName() {
		return "Shops";
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		switch (this.type) {
			case "Shops":
				return "shops";
			case "Brothel":
				return "brothel";
			case "Club":
				return "club";
			default:
				return "fsShops";
		}
	}

	/**
	 * @override
	 * @returns {string}
	 */
	get name() {
		switch (this.type) {
			case "Shops":
			case "Brothel":
			case "Club":
				return this.type;
			default:
				return `${this.type} Shops`;
		}
	}

	isBaseType() {
		return this.type === "Shops";
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		if (this.type === "Brothel") {
			return App.Arcology.facilityCellContent(App.Entity.facilities.brothel);
		} else if (this.type === "Club") {
			return App.Arcology.facilityCellContent(App.Entity.facilities.club);
		} else if (this.type === "Shops") {
			return App.Arcology.getCellLinkFromPath(path, this.type);
		} else {
			return App.Arcology.getCellLinkFromPath(path, `${this.type} Shops`);
		}
	}

	/**
	 * @returns {DocumentFragment}
	 * @protected @override
	 */
	_setting() {
		const A = V.arcologies[0];
		const fragment = document.createDocumentFragment();
		const {he, himself, He, girl, him, his, woman} = getNonlocalPronouns(V.seeDicks);
		const {his: hisP} = getPronouns(V.PC);

		if (this.owner === 1) {
			fragment.append("This is a sector of the arcology's living areas, ");
		} else {
			fragment.append("This is a privately-owned sector of the arcology's living areas, ");
		}

		switch (this.type) {
			case "Shops":
				fragment.append("filled with a variety of small, higher-end shops, salons, brothels, and clubs.");
				break;
			case "Subjugationist":
				fragment.append(`dedicated to ${A.FSSubjugationistRace} subjugationism. There are genteel dining establishments with ${A.FSSubjugationistRace} wait staff. Shops offer traditional slaving implements, including fine bespoke leather whips. To go by the shrieking, one of these is being tried on a shop's complimentary whipping targets. `,
					App.UI.DOM.linkReplace("Shop there",
						`Interested, you head in to see how the latest styles feel in hand. The fearful slave sales${girl}s offer you complimentary tries at the targets, of course. They barely manage to avoid bursting into tears, knowing that if they make the slightest mistake representing the shop to the arcology owner, they'll be chained up for whip trials, too. The rich handmade leather is supple and handy, and readily extracts throat rending screams from the slaves you're encouraged to try it on.`));
				break;
			case "Supremacist":
				fragment.append(`dedicated to ${A.FSSupremacistRace} supremacism. There are some select social establishments here which don't actually use any slaves at all, offering a surprisingly egalitarian atmosphere in which citizens of the master race can relax in each other's company without any subhuman filth present. `,
					App.UI.DOM.linkReplace("Put in an appearance",
						`You decide to stop in at one of these establishments, and of course your money's no good. You're welcomed with considerable bonhomie, and much less formality than you usually receive at social events in your arcology. Everyone's ${A.FSSupremacistRace} here, and in that you're all equal, and all good friends. Everyone wants to have at least a quick word, and you stay longer than you originally meant to.`));
				break;
			case "Gender Radicalist":
				fragment.append("dedicated to Gender Radicalism. The shops here offer a bewildering cornucopia of sex toys. Citizens can kit themselves and their slaves out for anything, regardless of bodily layout. A female citizen is looking over the latest strap-ons, while a male peer is considering versions designed to enable double penetration by one person. ",
					App.UI.DOM.linkReplace("Try one",
						`You decide to try one of the latest models. Naturally, the store is eager to have you seen considering their products. The harness is very comfortable, and it ${
							V.PC.dick !== 0
								? `equips you with a second phallus. The slave sales${girl} lacks a vagina, but encourages you to try the setup on ${him} anyway, promising that ${his} backpussy can accept double penetration. It can.`
								: `provides you with an extremely large phallus, which cums from an internal reservoir. The slave sales${girl} encourages you to try the setup on ${him}, promising that ${his} holes can accommodate it. They can.`}`
					));
				break;
			case "Gender Fundamentalist":
				fragment.append(`dedicated to Gender Fundamentalism. The establishments here are mostly focused on ${FutureSocieties.isActive('FSRestart', A) ? "keeping slaves attractively feminine. There are shops offering all kinds of treatments, drugs, clothes, and furniture to satisfy even the most discerning lady " : "citizen reproduction with slaves. There are shops offering all kinds of treatments, drugs, clothes, and furniture to facilitate the successful impregnation of one's chattel, along with a variety of beauty products to keep them soft and feminine"}. `,
					App.UI.DOM.linkReplace("Get a massage",
						`You decide to put in an appearance at a tenant business, and the massage parlors are of course very eager to offer you complimentary services. The masseuse is very well-trained, and not at all a sex toy with poor massage skills as a veneer for handjob services. ${He} releases the muscle soreness from your latest workout, and uses ${his} delicate touch to bring you to an enjoyable orgasm; ${he} ${
							V.PC.dick !== 0
								? `catches your cum in ${his} mouth and swallows it`
								: "swallows your femcum"
						} with every appearance of appetite.`));
				break;
			case "Paternalist":
				fragment.append(`dedicated to Paternalism. Many of the establishments here cater to slaves, some even to slaves exclusively. They offer luxurious and relaxing treatment for good ${girl}s whose owners send them here as rewards. Trusted slaves enter and exit these without any visible restraint or accompaniment, looking for all the world like pretty ${girl}s on a day out. `,
					App.UI.DOM.linkReplace("Tour the area",
						"You decide to put in an appearance at these establishments, and tour their front lobbies, listening politely to the educated slave receptionists' polished descriptions of the services offered. You stay out of the back areas, of course; those are for relaxing slaves, and owners typically leave them be while they're there. Most of the slaves moving through the area know who you are, and many of them are confident enough to give you respectful smiles."));
				break;
			case "Degradationist":
				fragment.append("dedicated to Degradationism. The stores for slaveowners sell all sorts of inventive restraints and punishments. There are also a few of a uniquely Degradationist establishment: torture parlors, where any citizen can send a slave for punishment by paying customers, within bounds defined by the owner. ",
					App.UI.DOM.linkReplace("Try a round",
						`You decide to put in an appearance at a tenant business and show off your skills, and the torture parlors are very eager to have you accept a complimentary round. You select a pretty ${girl} sent to a torture parlor for some unknown failing by ${his} owner, and use a switch to flog ${his} calves, inner thighs, and breasts until ${he} ${
							V.seePee === 1
								? `loses control of ${his} bladder`
								: "passes out"
						}. ${
							V.PC.skill.slaving >= 100
								? "You're skilled at this. The trick is to stop just short of blows that will break the skin, applying all possible pain without any inconvenient blood."
								: `There's a bit of blood, but ${his} owner will expect that.`}`));
				break;
			case "Body Purist":
				fragment.append("dedicated to Body Purism. There are high end clinics for citizens, with medical specialists skilled in the latest longevity treatments. Shops offer beauty treatments, anti-aging products, and personal massage services. The slave masseuses are naturally beautiful, and their bodies are obviously part of the services offered. ",
					App.UI.DOM.linkReplace("Get a massage",
						`You decide to put in an appearance at a tenant business, and the massage parlors are of course very eager to offer you complimentary services. The masseuse is very well-trained, and not at all a sex toy with poor massage skills as a veneer for handjob services. ${He} releases the muscle soreness from your latest workout, and uses ${his} delicate touch to bring you to an enjoyable orgasm; ${he} ${
							V.PC.dick !== 0
								? `catches your cum in ${his} mouth and swallows it`
								: "swallows your femcum"
						} with every appearance of appetite.`));
				break;
			case "Transformation Fetishist":
				fragment.append("dedicated to Transformation Fetishism. Autosurgeries are expensive, and require a lot of infrastructure, so almost all of your citizens have to send their slaves to clinics for surgical transformation. These establishments attempt to differentiate themselves by specializing in different surgeries, and advertising what they're best at. ",
					App.UI.DOM.linkReplace("Shop around",
						`You decide to shop around the best surgery clinics, to put in an appearance and check out the latest developments available to citizens less exalted than yourself. The slave sales${girl}s are all heavily modified silicone bimbos, with an emphasis on whatever their owner's surgical specialty is. The lip specialists' sales${girl}s have facepussies so huge they can't talk at all, so they wear touchscreens around their necks that do the talking for them.`));
				break;
			case "Youth Preferentialist":
				fragment.append(`dedicated to Youth Preferentialism. The shops here are quite varied. Some, like the tailors, only betray their focus on young slaves by their selections of school${girl} outfits, girlish leotards, and the like. There are several high-end slave trainers who specialize in maximizing slaves' ${
					V.seeDicks < 100 ? "vaginal and" : ""} anal skills while they're still virgins, with instruction only. `,
				App.UI.DOM.linkReplace("Look in on the classes",
					`You decide to put in an appearance and look into the training sessions. Of course, the trainers are very eager to share all the details with the arcology owner, and have you seen displaying an interest in their work. You're shown a classroom of obedient young slaves, right at sale age, paying rapt attention to a male trainer and a slave at the head of the classroom. He's reviewing how to relax during one's first time before 'deflowering' the teacher's assistant, whose ${
						V.seeDicks > 25
							? "asshole is allowed to rest and return to virgin tightness"
							: "hymen is surgically restored"
					} between sessions.`));
				break;
			case "Maturity Preferentialist":
				fragment.append("dedicated to Maturity Preferentialism. It's not immediately apparent, though the stores here offer fashions that are obviously designed to flatter mature women, and anti-aging products of all kinds are prominently displayed. What there are, though, are quite a number of pretty, scantily clad female citizens here, obviously retired from sexual slavery and looking to slake their now-ingrained libidos with any handsome fellow citizen interested. ",
					App.UI.DOM.linkReplace("Hook up with a MILF",
						`Many of them recognize you, and it's immediately apparent that you have your choice of pretty much every retired slave present. You select the prettiest and make out with ${him} for a while, among many admirers, until you feel like bringing ${him} over to a nearby bench and doing ${him}. ${
							V.PC.dick === 0
								? `${He}'s as eager as a teenager to have a lesbian experience in public, and can't stop giggling as you fuck.`
								: FutureSocieties.isActive('FSGenderFundamentalist', A)
									? `Like many recently retired slaves in your arcology, ${he}'s gotten pregnant as a free ${woman}, and it's supercharged ${his} sex drive. No matter what you do to ${him}, ${he} just wants more.`
									: FutureSocieties.isActive('FSGenderRadicalist', A)
										? `${He}'s got a big dick, and clearly has close friends among the other recently retired ${girl}s, but is very willing to be your bottom, especially in public.`
										: `${He} was horny to begin with, but the foreplay and the naughtiness of doing it out in public has ${him} as eager as a teenager, and ${he} goes wild.`
						}`));
				break;
			case "Slimness Enthusiast":
				fragment.append("dedicated to Slimness Enthusiasm. The shops here are quite varied. Some, like the tailors, only betray their focus on slim slaves by their selections of lingerie for petite breasts and trim hips. There are a large number of contract slave exercisers and slave dietitians, since many citizens who can afford a slave need assistance there. ",
					App.UI.DOM.linkReplace("Tour the trainers",
						"You decide to put in an appearance and look around the trainers. They're very eager to show you around, of course, and have you seen looking around; your expertise in keeping slaves slender is well known. The most inspiring sight you're shown is a long row of slaves on treadmills, running as fast as their individual fitness can support. They do this nude, since none of them have boobs big enough to require support, offering the sight of a long row of cute butts covered in a sheen of feminine sweat."));
				break;
			case "Asset Expansionist":
				fragment.append(`dedicated to Asset Expansionism. The sector's focus is unmissable, even in the clothes stores. Many of the bras on offer look like a cross between an engineering marvel and a bad joke, and there are dresses that look like parachutes when they aren't on a mannequin or worn by a slave sales${girl}. Then there's the crane store. `,
					App.UI.DOM.linkReplace("Shop there",
						`You decide to look in on the crane showroom, to see how citizens who don't own enough slaves to do the lifting and carrying are served. The huge-boobed slave sales${girl}s show you a variety of wheeled cranes that can help support a slave's breasts if they get too big for ${him} to walk, and ${he} needs to go somewhere. You have other slaves to help with that, and mechanical assistance built into your penthouse, but not everyone does. The sales${girl}s work in pairs, so one of them can unbutton ${his} tent-like blouse and demonstrate the merchandise with ${his} monstrous udders.`));
				break;
			case "Pastoralist":
				fragment.append(`dedicated to Pastoralism. Milking is mostly done elsewhere, so the establishments here are a curious mix of farm supply stores and eateries. You can sample all kinds of ice cream, shakes, smoothies, cheeses, butter, and other dairy products here, all made from creamy human milk drawn from a busty slave${girl}'s breasts. ${
					V.seeDicks > 0
						? `There are also all kinds of slave beauty products and foods made from 'the other slave${girl} milk,' cum.` : ""} `,
				App.UI.DOM.linkReplace("Tour the kitchens",
					"The eateries are very eager to have you seen inspecting their equipment and methods, and roll out the red carpet for you as they show you around. All kinds of old world culinary skill is on display here: artisan cheesemaking, butter hand-churned by muscular slaves, sweet custards and delicate flans that could compete in any dessert contest in the world. It's all so very refined and normal that it's quite easy to forget completely that the milk that is the basis of all this food comes from slaves."));
				break;
			case "Physical Idealist":
				fragment.append("dedicated to Physical Idealism. There are supplement shops and workout equipment stores here, but they're small and packed into the spaces between all the gyms. These are some of the best patronized gyms in the world, because not only do physical idealists work out, there's a strong inclination to work out in public. ",
					App.UI.DOM.linkReplace("Leg day",
						`It's all very positive, and the one unspoken rule is not to disparage others, but there's definitely competition. So when you step forward and get a complimentary day pass from one of the bubbly, permed slave${girl} receptionists, you have an audience. What kind of definition you've got in your quads is going to be a subject of conversation today, but you've got confidence. You lift, and receive respectful complements and bro-fists. Then you take your turn spotting others, an honor your citizens greatly appreciate.`));
				break;
			case "Chattel Religionist":
				fragment.append("dedicated to Chattel Religionism. The stores offer all the items useful to a slaveowner who holds the new faith: proper slave restraints and penitent slave garments, of course, but also fine oils and incense, candles, tapers, and other devotional necessities. There are also correctional convents for the assistance of citizens with wayward slaves. ",
					App.UI.DOM.linkReplace("Visit the convents",
						`As a leader of the new faith, your visitation rights on these convents are unquestioned, and their owners are indeed eager to have you look around and offer your revered advice. The average citizen with only a slave or two often needs help keeping ${girl}s within the faith. The convents are severe houses of correction, and the sounds of prayer and penitence are omnipresent. In one nave, a slave prostrates ${himself} before a religious icon, praying in a loud, desperate tone while ${
							V.seeDicks === 0 || V.arcologies[0].FSGenderFundamentalist > 0
								? "a woman in nun's attire holding a ribbed vibrating dildo"
								: V.seeDicks < 100
									? "futanari in nun's attire"
									: "a man in monk's attire"
						} fucks ${him} mercilessly from behind.`));
				break;
			case "Roman Revivalist":
				fragment.append("dedicated to Roman Revivalism. Since the forums are out on the arcology's plazas, there are fewer stores here. There are eateries, from which the sharp smell of ",
					App.UI.DOM.makeElement("span", "garum", ["note"]),
					" is distinctly identifiable, but most of the space is occupied by hypocaust baths, which are free to enter but include various concession stands run by slaves.",
					App.UI.DOM.linkReplace("Clean yourself",
						"A good Roman trip to the baths serves to cleanse, but it's a social experience, too. After being oiled down by a skilled slave, you work out in the proper nude, and then have the oil and any dirt scraped off your skin with by another slave. Then you make your way across the heated floor through a set of baths of varying temperatures, ending in a large and egalitarian space where many naked citizens of the new Rome are sharing the news of the day. You're welcomed with surprise, but also with comradeship, and made to feel welcome."));
				break;
			case "Aztec Revivalist":
				fragment.append("dedicated to Aztec Revivalism. There are a variety of stores selling tools of worship ranging from bloodletting daggers to sacrificial altars, some even open for public use. Any blood spilt here flows to a shallow reflecting pool in the middle of the plaza. ",
					App.UI.DOM.linkReplace("Pay tribute",
						"You decide to pay tribute to the gods and draw your preferred tool for bloodletting. You run it across your hand and watch as your blood begins to flow. You let several drops fall into the pool before stemming the flow as a good feeling washes over you."));
				break;
			case "Egyptian Revivalist":
				fragment.append(`dedicated to Egyptian Revivalism. There are a bewildering multiplicity of shops here; ancient Egypt is wonderfully fertile of linen fashion, fine jewelry, perfumes, incense, and other luxury goods. Beautiful warm-skinned slave${girl}s of all races have wares in hand to offer citizens who pass by, and they seem well-treated. `,
					App.UI.DOM.linkReplace("Shop around",
						`You decide to tour the shops; with so much fine merchandise on offer, it's possible that someone's selling something that even you haven't heard of, and it's always good to see and be seen. The slave sales${girl}s are welcoming, and most are so well-trained that despite knowing who you are, they treat you with the same friendly courtesy that they offer everyone. They all offer you the peculiar straight-down curtsey that allows them to keep their necks straight, since they're all wearing gradually melting perfume cakes atop their hair, making them glisten with beguiling scent.`));
				break;
			case "Neo-Imperialist":
				fragment.append(`typical of your Neo-Imperial society. There is a nearly endless variety of shops here with an equally endless variety of goods; high-tech nano-fabrics and the latest fashions from what remains of the old world stand side-by-side with jewelry, slave collars, fine metal blades, and noodle shops. Bright neon signs light up every inch of every street corner, and guards with heavy battle armor painted in the colors of your house stand watch over shouting merchants and crowded stalls. It's like a medieval town square transported to the twenty-second century. Everyone here has something to sell, and at your appearance they almost immediately begin to clamor for your attention. `,
					App.UI.DOM.linkReplace("Wander the streets",
						"You take some time to look for an interesting ware; someone at every stall insists that they have what you need, even before you know what you're looking for. The slave salesgirls immediately recognize you and all but grovel at your feet as you enter their shops, smelling of eloquent perfumes and skin that glistens beneath the neon glow of the streets. Despite how crowded this district is, people move to the side when you walk through, and many bow as you walk by with mumbles of hierarchical respect. In the end, you purchase a supposedly magical trinket from a street shaman and a particularly elegant nano-linen shirt from what used to be France and head home, the sights and sounds of your bustling new marketplace fading behind you."));
				break;
			case "Edo Revivalist":
				fragment.append("dedicated to Edo Revivalism. There are strict restrictions on the establishments' décor here, so ",
					App.UI.DOM.makeElement("span", "tatami", ["note"]),
					" mats and paper partitions are ubiquitous. There are handsome ",
					App.UI.DOM.makeElement("span", "sake", ["note"]),
					" shops and tea rooms offering the traditional ceremony, and ",
					App.UI.DOM.makeElement("span", "kabuki", ["note"]),
					" theaters offering the traditional performance, with modern plots and themes. ",
					App.UI.DOM.linkReplace("See a show",
						"As soon as you enter a theater, the play stops, and refined slave attendants usher you forward to the place of honor. None of the citizens present resent the interruption; having you here is a great addition to the performance. The actors bow deeply to you and resume. The classical dance drama is almost impenetrable to outsiders, and the modernity of the characters and events would not be at all decipherable. Once you catch the thread, though, the richness of the allegory towards Free Cities personages and events is quite enjoyable."));
				break;
			case "Arabian Revivalist":
				fragment.append(`dedicated to Arabian Revivalism. The thriving mercantilism isn't limited to the slave markets, so many floors below; there are a bewildering variety of shops and stalls here, in no discernible order. Particolored cloth awnings, stacked goods, and bustling menial slaves constantly obscure your view, as pretty slave${girl}s hawking luxurious goods do their best to catch your eye. `,
					App.UI.DOM.linkReplace("Visit a coffee house",
						"But you disappoint them, even though some of them artfully manage to fall out of their slinky silk garments as you pass. You look into a little coffeehouse, densely packed with citizens drinking the strong, hot beverage out of tiny china and discussing the news of the day. Coffeehouses are democratic sorts of places and you're welcomed with comradely warmth; prosperous citizens shuffle and pack a little closer to make you a space, and a steaming cup full of almost midnight black coffee appears before you, as if from nowhere."));
				break;
			case "Chinese Revivalist":
				fragment.append("dedicated to Chinese Revivalism. The longest continuous cultural history humanity has provides so much material that no two establishments here fill quite the same niche. There are calligraphy schools and Confucian academies to teach ignorant citizens how to fit in. There are shops selling traditional cures and the latest pharmacological wonders side by side. There are even martial arts schools. ",
					App.UI.DOM.linkReplace("Exercise yourself",
						`You look into one of these. The students are exercising, moving through a series of forms in unison. The teacher recognizes you, ${
							V.PC.skill.warfare >= 100
								? "and eagerly beckons you to join. Your martial skill is well known, and he's not disappointed. You're familiar with the forms, and join them seamlessly. Much later, when the exercise is done, the students are extremely pleased to discover exactly who their skillful temporary classmate was."
								: "and gives you a doubtful, questioning glance, politely asking whether you can join with credit to yourself, all without words. You nod and pick up the forms, having a basic familiarity with them. They're difficult, but you're able to get through the enjoyable exercise with credit."
						}`));
				break;
			case "Antebellum Revivalist":
				fragment.append("dedicated to Antebellum Revivalism. Red brick and white staff buildings neatly line either side of the cobblestone boulevard here. Cupolas, painted in vivid colors, crown the occasional gable and brilliantly reflect natural light filtering through the arcology's walls. Printed on each shop's window are proud block letters that proclaim the highest quality of every imaginable type of goods, from home goods to the most perverted delights the Free Cities have to offer. The men, sporting canes or other sufficiently sophisticated attire, walk with dignity and convey a sense of mutual respect, if only for appearances. The scent of apple pie is wafting through the air from some unseen window.",
					App.UI.DOM.linkReplace("Take a stroll",
						"You take a stroll down the boulevard, absorbing the sights. As you pass, gentlemen tip their hats and give polite bows. The ladies, if not overcome by hysteria, cover their faces with their fans, or give low curtsies. Before long, you've been invited to a dozen balls and several galas, but must politely decline. You've got important business to attend to, or at least that's what you tell them, and move on."),
					App.UI.DOM.linkReplace("Get a slice of pie",
						"You follow that wonderful smell and, after a little ways, find a bakery tucked into a corner somewhere. Standing behind the counter is a beautiful older slave woman in a flour-stained apron. She politely greets you with a smile. An instant later, she recognizes who you are, and blushes a deep crimson. She nervously offers you to try anything in the store. She's already started to lift her apron when, having found the source of the smell, you help yourself to a slice of pie, flash a smile, and make your way out. This has got to be some of the best pie you've ever had."));
				break;
			case "Repopulationist":
				fragment.append(`dedicated to Repopulationism. The shops here offer a lovely mix of sex toys, fertility agents, maternity wear and furniture to fit even the biggest pregnancy. An attractive slave salesgirl with a huge belly is demonstrating the proper use of a swing designed to accommodate ${his} added heft to a female citizen just beginning to show and her curious husband. `,
					App.UI.DOM.linkReplace("Give the swing a try",
						`You wait for the couple to leave before approaching the hapless ${girl} and placing a hand on ${his} vulnerable middle. ${He} squeaks in surprise before ${he} realizes just who is browsing ${his} toys and the goods between ${his} legs. ${
							V.PC.belly >= 5000
								? `Spreading ${his} legs, you find that ${he} is suspended at the perfect height for you to comfortably penetrate ${him}; or ${he} would be, if your own rounded middle wasn't pushing into ${his} own. ${He} asks for a little help getting down, and afterwards, shows you to a series of harnesses designed to hold a ${girl} with ${his} belly dangling beneath ${him}. The perfect toy for the very pregnant slaveowner hoping to plow ${hisP} equally gravid chattel.`
								: V.PC.dick !== 0
									? `Spreading ${his} legs, you find that ${he} is suspended at the perfect height for you to comfortably penetrate ${him}.`
									: `Picking out an attractive strap-on, donning it, and spreading ${his} legs, you find that ${he} is suspended at the perfect height for you to comfortably penetrate ${him}.`
						} Even better, the swing handles ${his} weight, so no sprained back!`));
				break;
			case "Eugenics":
				fragment.append("dedicated to Eugenics. You knew the individuals drawn into your society had connections, but you had no idea they were this extensive! If you can think of it, a shop here is selling it; though they are not cheap, only the finest available merchandise is for sale here. Numerous recognizable faces browse the storefronts, accompanied by their favorite chattel, and upon noticing you, vie for your valuable attention. ");
				if (V.PC.preg > 20 && (V.PC.pregSource === -1 || V.PC.pregSource === -6)) {
					fragment.append(App.UI.DOM.linkReplace("Shop around",
						`You decide to waddle between the shops; with so much fine merchandise on offer, it's possible that someone's selling something to fulfill your growing cravings, and it's always good to see and be seen, especially with a middle rounded with a superior child. The slave sales${girl}s are accommodating and welcoming; most are so well-trained that they treat you with the respect a member of the Societal Elite deserves. They all offer you a curtsey that allows them lift their skirts, revealing the appropriate chastity. You end up leaving the stores with bags and bags of exotic foods and treats as well as a cute dress that shows off your pregnancy.`));
				} else if (V.PC.title === 1) {
					fragment.append(App.UI.DOM.linkReplace("Shop around",
						`You decide to wander between the shops; with so much fine merchandise on offer, it's possible that someone's selling something to catch your discerning eye, and it's always good to see and be seen. The slave sales${girl}s are welcoming and most are so well-trained that they treat you with the respect a member of the Societal Elite deserves. They all offer you a curtsey that allows them lift their skirts, revealing the appropriate chastity. You end up leaving the stores with several fancy chastity belts and an amazing suit you can't wait to debut at your next social meeting.`));
				} else {
					fragment.append(App.UI.DOM.linkReplace("Shop around",
						`You decide to wander between the shops; with so much fine merchandise on offer, it's possible that someone's selling something to catch your discerning eye, and it's always good to see and be seen. The slave sales${girl}s are welcoming and most are so well-trained that they treat you with the respect a member of the Societal Elite deserves. They all offer you a curtsey that allows them lift their skirts, revealing the appropriate chastity. You end up leaving the stores with several fancy chastity belts, a bag of tasty treats and an alluring dress you can't wait to debut at your next social meeting.`));
				}
				break;
			case "Hedonistic":
				fragment.append(`dedicated to Hedonism. The establishments here are nearly all eateries, with a few sex shops and plus size clothing stores thrown in for good measure. Lovely smells fill the air, drawing your attention to the food vendors. Plump, cheerful slave${girl}s are present outside most of them offering free samples of the food sold within. You can't help but sample as you browse the menus. `,
					App.UI.DOM.linkReplace("Conduct a more thorough culinary inspection",
						"The eateries are very eager to have you seen enjoying their food, and go all out in their presentations. Plate after plate, vendor after vendor, you are treated to the best they can make and as much as you want, free of charge. You make sure to not go too crazy, but by the final restaurant, your clothing is definitely getting a little tight around your bloated belly. After a number of glowing reviews, you're left with making your way back home. Fortunately, your arcology features plenty of moving walkways and escalators, so you can relax as your infrastructure delivers you right back to your penthouse."));
				break;
			case "Intellectual Dependency":
				fragment.append(`dedicated to Intellectual Dependency. The shops all have one thing in common, they are incredibly eye-catching in the hopes that a wanting bimbo will whine ${his} master into buy something to shut ${him} up. From skimpy outfits to simple to use sex toys, everything an airheaded slave may want on a whim is on display; unsurprisingly, the shop selling complex gags is also doing quite well. Most of the shops have slave sales${girl}s out front attempting to demonstrate the merchandise. `,
					App.UI.DOM.linkReplace("Take in a sales pitch",
						`You decide to stop and watch one try ${his} best to sell vibrating dildos. The toys are designed to automatically start vibrating when gripped so even the densest of slave${girl} can figure out how to work it. You know you picked a winner when ${he} grabs one and immediately flings it into the crowd in surprise when it activates. Completely undeterred by the laughter, ${he} makes for another, this time focusing entirely on not being shocked by it this time. ${He} stands there, completely fixated on the wiggling phallus in ${his} hands, until another onlooker prods ${him} to continue with ${his} advertising. Needless to say, yet another sex toy goes flying; this time, however, ${he} goes after it, giving the crowd a clear view up ${his} skirt at ${his} clear arousal. Enjoying the now masturbating slave's show, you pick out a few to humor your own slaves with.`));
				break;
			case "Slave Professionalism":
				fragment.append("dedicated to Slave Professionalism. There are surprisingly wide selection of shops here, each designed to stimulate the minds of curious looky-loos. Well-trained slaves can often be spotted seeking out new ways to improve their Masters' reputations and lives. The pride of the strip is a slave run massage parlor featuring some of the most skilled hands the arcology has to offer. ",
					App.UI.DOM.linkReplace("Get a massage",
						`You decide to put in an appearance at the facility and the slaves in charge are of course very eager to offer you complimentary services. The masseuse is nothing short of a master of the art and knows how to balance relaxation and physical pleasure. ${He} releases the muscle soreness from your latest workout and throughout ${his} service uses ${his} delicate touch to keep you on the edge of orgasm until ${his} job is complete. The finale of ${his} work pushes you to an exquisite climax where ${he} ${
							V.PC.dick !== 0
								? `catches your cum in ${his} mouth and swallows it`
								: "swallows your femcum"
						} with a grace only found among your slave population.`));
				break;
			case "Petite Admiration":
				fragment.append("dedicated to Petite Admiration. The shops here are mostly focused on providing the tools and equipment a short slave will need to properly care for their Master and his abode. Several fashion lines have cropped up to provide matching clothing tailored to the shorter clientele and their often taller owners. There's even a sex shop that specializes in extreme differences in height. ");
				if (V.PC.height >= 170) {
					fragment.append(App.UI.DOM.linkReplace("Take a harness out for a spin",
						`The shop has a selection of harnesses available for testing and a number of minuscule slave${girl}s to try out. You fasten one on and carry on browsing the rest of the stores. ${
							V.PC.dick > 0
								? `The squirming ${girl} currently housing your cock makes it very difficult to focus on anything else, so you mostly just walk the hall, busting load after load into the overstimulated slave and effectively giving the store free advertisement.`
								: `The squirming ${girl} currently wrapped around a strap-on makes it very difficult to focus on anything else, so you mostly just walk the hall, further over stimulating the panting slave and effectively giving the store free advertisement.`
						} By the time you return, you aren't the only one interested in purchasing a harness for home use.`));
				} else {
					fragment.append(App.UI.DOM.linkReplace("Pay it a visit", "As you browse their goods, it becomes more and more apparent that you yourself are too short to really make use of any of them."));
				}
				break;
			case "Statuesque Glorification":
				fragment.append("dedicated to Statuesque Glorification. The shops here are overwhelmingly dedicated to the tall; not a single shop caters the slightest to anyone below the height threshold. Most of the shops sell clothing specially tailored to their towering patrons, though a handful also sell furniture and appliances made to comfortably accommodate a more lengthy population. The crown attraction, however, is a modest indoor amusement park designed both to make the most of a rider's height and invoke a sense of envy in those unable to ride. ");
				if (V.PC.height >= 170) {
					fragment.append(App.UI.DOM.linkReplace("Give the roller coaster a spin", "While it isn't the most thrilling ride, given the constraints it has to work with, but it does wind through the various footpaths of the promenade to maximize visibility and to remind those too short to ride of their place."));
				} else {
					fragment.append("You can only watch as your citizens have fun and savor the bitter feeling of them looking down on their hilariously short leader.");
				}
				break;
			default:
				App.UI.DOM.appendNewElement("span", fragment, `ERROR: bad shop type: ${this.type}`, ["error"]);
		}

		if (this.owner === 1 && this.type === "Shops") {
			fragment.append(`You control this part of the arcology and all these businesses pay you rent.`);
		}

		return fragment;
	}

	/**
	 * @returns {Node}
	 * @protected @override
	 */
	_body(containingBuilding) {
		const fragment = document.createDocumentFragment();
		const A = V.arcologies[0];
		const cost = Math.trunc(10000 * V.upgradeMultiplierArcology);

		if (V.brothel === 0) {
			fragment.append(this._makeExternalUpgrade(
				`Convert this sector of the promenade into a brothel`,
				() => {
					V.brothel = 5;
					this.type = "Brothel";
				}, cost, "Brothel", [`will incur upkeep costs`]
			));
		}

		if (V.club === 0) {
			fragment.append(this._makeExternalUpgrade(
				`Build a club to serve as a focal point for public sluts`,
				() => {
					V.club = 5;
					this.type = "Club";
				}, cost, "Club", [`will incur upkeep costs`]
			));
		}

		for (const FS of FutureSocieties.activeFSes(A)) {
			const decorationName = FutureSocieties.decorationName(FS);
			if (decorationName && !App.Arcology.hasShopOfType(decorationName)) {
				fragment.append(this._makeInternalUpgrade(
					`Upgrade this sector to appeal to ${FutureSocieties.displayAdj(FS)} establishments.`,
					() => {
						this.type = decorationName;
					}, cost, containingBuilding
				));
			}
		}

		if (this.type !== "Shops") {
			fragment.append(this._makeInternalUpgrade(
				"Return this sector to standard outlets",
				() => {
					this.type = "Shops";
				}, cost, containingBuilding
			));
		}

		return fragment;
	}

	/**
	 * @returns {boolean}
	 */
	canBeSold() {
		return this.type === "Shops";
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	/** @returns {App.Arcology.Cell.Shop} */
	clone() {
		return (new App.Arcology.Cell.Shop(this.owner))._init(this);
	}

	get className() { return "App.Arcology.Cell.Shop"; }
};
