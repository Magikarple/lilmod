App.Events.REFSNonconformist = class REFSNonconformist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!(this.getNonconformistFS())
		];
	}

	getNonconformistFS() {
		const permittedFSes = Object.keys(App.Data.FutureSociety.records);
		permittedFSes.delete("FSNull"); // Multiculturalism doesn't have nonconformity
		return permittedFSes.filter(fs => V.arcologies[0][fs] < 95 && V.arcologies[0][fs] > 50).random();
	}

	actorPrerequisites() {
		return [];
	}

	execute(node) {
		let r = [];
		V.nextButton = " ";

		/** @type {FC.FutureSocietyAdj} */
		const FSNonconformist = App.Data.FutureSociety.records[this.getNonconformistFS()].adj;
		if (FutureSocieties.isActive('FSRestart')) {
			r.push(`A group of the Societal Elite arrives at your penthouse and is quickly ushered into your office. They're among the best members of the society you're building, uniformly wealthy, influential, and deeply`);
		} else {
			r.push(`A deputation of your citizens arrives at your penthouse and asks to see you. They're among the best members of the society you're building, uniformly wealthy, influential, and deeply`);
		}
		if (FSNonconformist === "Pastoralist") {
			r.push(`committed to making the future of the arcology a creamy one. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time planning milk orgies,`);
		} else if (FSNonconformist === "Supremacist") {
			r.push(`committed to the ascendancy of the ${V.arcologies[0].FSSupremacistRace} race. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time eagerly debating revisionist histories,`);
		} else if (FSNonconformist === "Subjugationist") {
			r.push(`involved in the subjugation of the ${V.arcologies[0].FSSubjugationistRace} race. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time competing to come up with ever more extreme ways to degrade mongrels,`);
		} else if (FSNonconformist === "Repopulationist") {
			r.push(`committed to perpetuating humanity. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time impregnating fertile women,`);
		} else if (FSNonconformist === "Eugenics") {
			r.push(`committed to restarting humanity. They're looking quite furious, an unusual mood for those with power second only to yours,`);
		} else if (FSNonconformist === "Gender Radicalist") {
			r.push(`committed to the redefinition of gender around power. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time cheerfully sodomizing their slaves,`);
		} else if (FSNonconformist === "Gender Fundamentalist") {
			r.push(`committed to traditional gender roles. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time basking in the attentions of their women,`);
		} else if (FSNonconformist === "Paternalist") {
			r.push(`committed to slave advancement. They're looking quite grim, an unusual mood for a group of oligarchs whose various projects to improve the lives of their chattel makes them quite self-assured,`);
		} else if (FSNonconformist === "Degradationist") {
			r.push(`committed to the comprehensive degradation of slaves. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time cheerfully raping their slaves,`);
		} else if (FSNonconformist === "Intellectual Dependency") {
			r.push(`committed to slave advancement. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time being fawned over by horny sluts,`);
		} else if (FSNonconformist === "Slave Professional") {
			r.push(`committed to crafting perfect slaves. They're looking quite grim, an unusual mood for a group of oligarchs with nothing short of masterful sources of stress release,`);
		} else if (FSNonconformist === "Body Purist") {
			r.push(`committed to body purism. They're looking quite grim, an unusual mood for a group of oligarchs whose various projects to improve the health of their chattel make them quite self-righteous,`);
		} else if (FSNonconformist === "Transformation Fetishist") {
			r.push(`committed to extreme transformation. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time obsessing over improvements to their favorite slaves,`);
		} else if (FSNonconformist === "Slimness Enthusiast") {
			r.push(`addicted to slim female bodies. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time cavorting with their harems,`);
		} else if (FSNonconformist === "Asset Expansionist") {
			r.push(`addicted to tits and ass. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time having sex with their grandiosely endowed girls,`);
		} else if (FSNonconformist === "Youth Preferentialist") {
			r.push(`committed to the fashion for young girls. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time enjoying their slaves' fresh bodies,`);
		} else if (FSNonconformist === "Maturity Preferentialist") {
			r.push(`committed to the fashion for mature slaves. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time enjoying their slaves' experience,`);
		} else if (FSNonconformist === "Petite Admiration") {
			r.push(`committed to the fashion for short slaves. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time enjoying their fun-sized slaves,`);
		} else if (FSNonconformist === "Statuesque Glorification") {
			r.push(`obsessed with tallness. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time flaunting their stature,`);
		} else if (FSNonconformist === "Physical Idealist") {
			r.push(`involved in physical idealism. They're looking quite grim, an unusual mood for a group of oligarchs more inclined to spend their time lifting, tanning, and giving each other fist-bumps and bro-nods,`);
		} else if (FSNonconformist === "Decadent Hedonist") {
			r.push(`committed to hedonistic decadence. They're looking quite grim, an unusual mood for a group of oligarchs who spend most of their time indulging themselves by any, and every, means possible,`);
		} else if (FSNonconformist === "Chattel Religionist") {
			r.push(`committed to the new faith. They're looking quite grim, an unusual mood for a group of oligarchs who occupy favored places in a new religious hierarchy that affords them ample pleasure,`);
		} else if (FSNonconformist === "Roman Revivalist") {
			r.push(`involved in your Revivalist vision. They're looking quite grim, an unusual mood for a group of oligarchs who compete with each other to project the upper-class Roman virtues of stoicism and self-possession,`);
		} else if (FSNonconformist === "Neo-Imperialist") {
			r.push(`involved in your new Imperial vision. They're looking quite grim, an unusual mood for a group of noble oligarchs in a society that views them and their children as socially, physically, and even religiously superior to the serf-like masses,`);
		} else if (FSNonconformist === "Aztec Revivalist") {
			r.push(`involved in your Revivalist vision. They're looking quite grim, an unusual mood for a group of oligarchs who compete with each other to project the bloody virtues of their proud society,`);
		} else if (FSNonconformist === "Edo Revivalist") {
			r.push(`involved in your Revivalist vision. They're looking quite grim, an unusual mood for a group of oligarchs who compete with each other to project the traditional Japanese virtue of stoicism,`);
		} else if (FSNonconformist === "Arabian Revivalist") {
			r.push(`involved in your Revivalist vision. They're looking quite grim, an unusual mood for a group of oligarchs who do their best to embody the confidence of the early Caliphate,`);
		} else if (FSNonconformist === "Chinese Revivalist") {
			r.push(`involved in your Revivalist vision. They're looking quite grim, an unusual mood for a group of oligarchs who do their best to project complete confidence that the arcology possesses the Mandate of Heaven,`);
		} else if (FSNonconformist === "Egyptian Revivalist") {
			r.push(`involved in your Revivalist vision. They're looking quite grim, an unusual mood for a group of oligarchs who partake of your serene confidence that your arcology is coming into a place as stable and long-lived as that of Ancient Egypt,`);
		} else if (FSNonconformist === "Antebellum Revivalist") {
			r.push(`involved in your Revivalist vision. They're looking quite grim, an unusual mood for a group of oligarchs who do their best embody the virtues of Southern gentry,`);
		} else {
			throw Error(`FS "${FSNonconformist}" not found `);
		}
		if (FutureSocieties.isActive('FSRestart')) {
			r.push(`so you hear them out. Apparently, they're here about a peer, another member of the Elite, who has chosen to perform certain undesirable actions. ${capFirstChar(V.assistant.name)} helpfully supplies a biography, but you were previously aware of the situation.`);
		} else {
			r.push(`so you hear them out. Apparently, they're here about a peer, a fellow citizen with money and power who does not support your vision for the arcology's future. ${capFirstChar(V.assistant.name)} helpfully supplies a biography, but you were previously aware of the situation.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The nonconformist`);
		if (FSNonconformist === "Pastoralist") {
			r.push(`has long been a vocal skeptic of the tastefulness of grown citizens drinking milk from slaves' breasts. Unfortunately, it seems that they've now edged over into open revolt against pastoralism. They're planning to publish an exposé that purports to reveal abuses in the human milk industry.`);
		} else if (FSNonconformist === "Supremacist") {
			r.push(`is a hardline egalitarianist who believes that all men are created equal, even if some then become slaves. They themselves are not ${V.arcologies[0].FSSupremacistRace}, and they insist on flaunting their ${V.arcologies[0].FSSupremacistRace} slaves. Unfortunately, it seems that they've now edged over into open revolt against ${V.arcologies[0].FSSupremacistRace} supremacism. After a brutal but deserved public punishment of a non-${V.arcologies[0].FSSupremacistRace} slave by one of the group of concerned citizens, the nonconformist is planning on visiting the same horrors on one of their ${V.arcologies[0].FSSupremacistRace} slaves, on a very weak pretext.`);
		} else if (FSNonconformist === "Subjugationist") {
			r.push(`is a hardline egalitarianist who believes that all men are created equal, even if some then become slaves. They themselves are ${V.arcologies[0].FSSubjugationistRace}, and they insist on flaunting their non-${V.arcologies[0].FSSubjugationistRace} slaves. Unfortunately, it seems that they've now edged over into open revolt against ${V.arcologies[0].FSSubjugationistRace} inferiority. After a brutal but deserved public punishment of a ${V.arcologies[0].FSSubjugationistRace} slave by one of the group of concerned citizens, the nonconformist is planning on visiting the same horrors on one of their non-${V.arcologies[0].FSSubjugationistRace} slaves, on a very weak pretext.`);
		} else if (FSNonconformist === "Repopulationist") {
			r.push(`has long been skeptical of the point of your repopulation efforts when the world is not stable and the arcology only so big. They plan to publish information regarding overpopulation, the negatives of chain pregnancies, the dangers of inbreeding and the risks of having so high a concentration of slaves.`);
		} else if (FSNonconformist === "Eugenics") {
			r.push(`has recently knocked up his favorite pet, and instead of responsibly aborting the bastard, has freed and married her. Allowing such actions to come to the public's attention will create a huge scandal and massive trouble for the Societal Elite, as well as undoing much of the progress you've made towards a better future.`);
		} else if (FSNonconformist === "Gender Radicalist") {
			r.push(`has never been quiet about their belief that slaves with dicks are not girls. Unfortunately, it seems that they've now edged over into open revolt against gender radicalism. They've purchased a highly feminized slave one of the group of concerned citizens sold to a third party, and are rumored to be returning the slave to her natural state. The oligarchs are worried that they plan to publicize this project, or worse, possibly even free the slave.`);
		} else if (FSNonconformist === "Gender Fundamentalist") {
			r.push(`has never been quiet about their belief that anything with an asshole counts as a slave girl. Unfortunately, it seems that they've now edged over into open revolt against gender traditionalism. They've been accumulating a number of sexually skilled slaves with dicks, and the oligarchs are worried that some sort of public event involving free sex with these slaves is planned to sway lower class opinion.`);
		} else if (FSNonconformist === "Paternalist") {
			r.push(`has never been shy about their belief that true trust between slave and master is impossible. Unfortunately, it seems that they've now edged over into open revolt against paternalism. They're rumored to run a household in which slaves are required to beat miscreants without mercy or be savaged themselves. There are indications that they may intend to make these spectacles public.`);
		} else if (FSNonconformist === "Degradationist") {
			r.push(`has never been shy about their belief that slaves are people too, and should be treated with respect. Unfortunately, it seems that they've now edged over into open revolt against degradationism. They're rumored to allow their slaves to decline sex. This perversion is bad enough, but the oligarchs are concerned that they may intend to take this practice public, setting favored slaves up with their own apartments and livelihoods.`);
		} else if (FSNonconformist === "Intellectual Dependency") {
			r.push(`has never been quiet about their grievances with having such a concentration of morons in one place. Unfortunately, it seems that they've now edged over into open revolt against intellectual dependency. They're planning to publish an exposé that reveals that the recent rise in prices is directly related to the number of accidents caused by the sheer lack of brains in the slave population.`);
		} else if (FSNonconformist === "Slave Professional") {
			r.push(`has never been shy about their paranoia over the dangers of a smart slave population. Unfortunately, it seems that they've now edged out of sanity and into open revolt against slave professionalism. They're rumored to be training slaves to carry out their fears. There are indications that they may intend to set loose these slaves to wreak havoc and prove their point.`);
		} else if (FSNonconformist === "Body Purist") {
			r.push(`has always been known for their harem of implant-filled silicone dolls. Unfortunately, it seems that they've now edged over into open revolt against body purism. They've purchased a wonderfully healthy and pure slave one of the group of concerned citizens sold to a third party, and it's rumored that the slave has been outfitted with cutting-edge gradually expanding breast implants with no effective maximum size. The oligarchs are disgusted and mortified lest this project become public.`);
		} else if (FSNonconformist === "Transformation Fetishist") {
			r.push(`has always been known for their harem of natural girls. Unfortunately, it seems that they've now edged over into open revolt against transformation. They've purchased a heavily implanted slave one of the group of concerned citizens sold to a third party, and it's rumored that the slave is being painstakingly returned to her natural, implant-free appearance. The oligarchs are concerned that the nonconformist may be planning some sort of public reveal of her naturalist makeover.`);
		} else if (FSNonconformist === "Slimness Enthusiast") {
			r.push(`has always been known for their harem of disgusting hambeasts. Unfortunately, it seems that they've now edged over into open revolt against the fashion for slimness. They've purchased a notoriously graceful slave one of the group of concerned citizens sold to a third party, and it's rumored that the slave is being force-fed in private as preparation for some kind of insulting public reveal. The oligarchs are mortally offended without even seeing the final product.`);
		} else if (FSNonconformist === "Asset Expansionist") {
			r.push(`has always been known for their harem of disgusting beanpoles. Unfortunately, it seems that they've now edged over into open revolt against the fashion for big tits. They've purchased a slave with famously magnificent boobs one of the group of concerned citizens sold to a third party, and it's rumored that the slave has undergone a radical breast reduction as preparation for some kind of insulting public reveal. The oligarchs are mortally offended without even seeing the final product.`);
		} else if (FSNonconformist === "Youth Preferentialist") {
			r.push(`has never missed an opportunity to share their belief that a mature woman who knows her way around a dick is a better fuck than a virgin. Unfortunately, it seems that they've now edged over into open revolt against the fashion for youth and freshness. They're holed up in their luxurious apartments, preparing a large number of older, sexually experienced slaves for something big. The oligarchs suspect that some sort of event involving free sex may be planned to sway lower class opinion.`);
		} else if (FSNonconformist === "Maturity Preferentialist") {
			r.push(`has never missed an opportunity to share their belief that a fresh girl is infinitely preferable to an old whore. Unfortunately, it seems that they've now edged over into open revolt against the fashion for maturity and experience. They're holed up in their luxurious apartments, preparing a large number of virgin slaves for something big. The oligarchs suspect that some sort of event involving free sex may be planned to sway lower class opinion.`);
		} else if (FSNonconformist === "Petite Admiration") {
			r.push(`has never missed an opportunity to share their belief that being able to look into your lover's eyes while you fuck is the greatest thing in the world. Unfortunately, it seems that they've now edged over into open revolt against the fashion for mixing big and small. They're holed up in their luxurious apartments, preparing a large number of tall, undeniably gorgeous slaves for something big. The oligarchs suspect that some sort of event involving free sex may be planned to sway lower class opinion.`);
		} else if (FSNonconformist === "Statuesque Glorification") {
			r.push(`is an advocate for short slaves. They themselves stand barely over the acceptable threshold, and they insist on flaunting their midget slaves. Unfortunately, it seems that they've now edged over into open revolt against tall superiority. After a brutal but deserved public humiliation of a slave owner caught lying about their chattel's height by a group of concerned citizens, the nonconformist is planning on visiting the same horrors on some of their gorgeously tall slaves, on a very weak pretext.`);
		} else if (FSNonconformist === "Physical Idealist") {
			r.push(`rarely misses a chance to lecture on the perils of toxic masculinity and excessive public standards of beauty. Unfortunately, it seems that they've now edged over into open revolt against the Valhalla of physical perfection the arcology is rapidly becoming. They're rumored to be preparing a manifesto on beauty at any size, along with the necessary funds to bribe neutral third parties into going along.`);
		} else if (FSNonconformist === "Decadent Hedonist") {
			r.push(`has long been a vocal opponent of over-indulgence and its effects on society. Unfortunately, it seems that they've now edged over into open revolt against hedonism. They're planning to publish an exposé that reveals numerous statistics regarding average health and lifespans, the rising maintenance costs to accommodate the widening population, and a rather alarming report that the arcology has in fact <i>sunk</i> several`);
			if (V.showInches === 2) {
				r.push(`inches`);
			} else {
				r.push(`centimeters`);
			}
			r.push(`since hedonism became commonplace among the citizenry.`);
		} else if (FSNonconformist === "Chattel Religionist") {
			r.push(`originally moved to the Free Cities to get away from religion entirely, and has never missed a chance to register disdain for the new faith. Unfortunately, it seems that they've now edged over into open heresy. Typically, they're going about it in a hypocritical way. It's rumored that they've engaged the services of a charismatic itinerant preacher of one of the more popular old world faiths, and intend to bring him to the arcology to inveigh against the chattel religion.`);
		} else if (FSNonconformist === "Roman Revivalist") {
			r.push(`has been a longtime skeptic of historical revivalism, publicly deploring it as a childish game of dress-up. This never got much traction, since Rome has become quite fashionable here. Frustrated, they're rumored to be planning a change of approach. Despairing of getting the population to give up the Roman project, they're going to set up a competing Gaulish Revivalism. The quixotic effort is almost certainly doomed to fail, but the oligarchs fear it will be a distraction.`);
		} else if (FSNonconformist === "Neo-Imperialist") {
			r.push(`has been a staunch and lifelong egalitarian, despite holding slaves for most of their later life, committed to the tenets of a free democratic society. They have loudly and openly criticized Imperial society and its relegation of the lower classes to serfdom and subservience for the benefit of your Knights and Barons; now you hear they're planning to set up a competing societal design they call Neo-Republicanism, modifying the old world Republican style into a directly democratic arcology governance. The Barons fear that this might rile up a number of serfs against Imperial society.`);
		} else if (FSNonconformist === "Aztec Revivalist") {
			r.push(`has been a longtime skeptic of historical revivalism, publicly deploring it as a childish game of dress-up. This never got much traction, since Aztec has become quite fashionable here. Frustrated, they're rumored to be planning a change of approach. Despairing of getting the population to give up the Aztec project, they're going to set up a competing Spanish Revivalism. The quixotic effort is almost certainly doomed to fail, but the oligarchs fear it will be a distraction.`);
		} else if (FSNonconformist === "Edo Revivalist") {
			r.push(`has been a longtime skeptic of historical revivalism, publicly deploring it as a childish game of dress-up. This never got much traction, since Edo Japan has become quite fashionable here. Frustrated, they're rumored to be planning a change of approach. Despairing of getting the population to give up the Japanese project, they're going to set up a competing Korean Revivalism. The quixotic effort is almost certainly doomed to fail, but the oligarchs fear it will be a distraction.`);
		} else if (FSNonconformist === "Arabian Revivalist") {
			r.push(`has been a longtime skeptic of historical revivalism, publicly deploring it as a childish game of dress-up. This never got much traction, since the golden age of the Caliphate has become quite fashionable here. Frustrated, they're rumored to be planning a change of approach. Despairing of getting the population to give up the Arabian project, they're going to set up a competing Byzantine Revivalism. The quixotic effort is almost certainly doomed to fail, but the oligarchs fear it will be a distraction.`);
		} else if (FSNonconformist === "Chinese Revivalist") {
			r.push(`has been a longtime skeptic of historical revivalism, publicly deploring it as a childish game of dress-up. This never got much traction, since ancient China has become quite fashionable here. Frustrated, they're rumored to be planning a change of approach. Despairing of getting the population to give up the imperial project, they're going to set up a competing Mongol Revivalism. The quixotic effort is almost certainly doomed to fail, but the oligarchs fear it will be a distraction.`);
		} else if (FSNonconformist === "Egyptian Revivalist"){
			r.push(`has been a longtime skeptic of historical revivalism, publicly deploring it as a childish game of dress-up. This never got much traction, since the land of the Pharaohs has become quite fashionable here. Frustrated, they're rumored to be planning a change of approach. Despairing of getting the population to give up the Egyptian project, they're going to set up a competing Ancient Greek Revivalism. The quixotic effort is almost certainly doomed to fail, but the oligarchs fear it will be a distraction.`);
		} else if (FSNonconformist === "Antebellum Revivalist"){
			r.push(`has held a longtime grudge against the Antebellum era, publicly declaring it to be a caricature of the old South and, indeed, seems to loathe the Southron code of honor. Most citizens openly disagree, some going as far as demanding to duel for the honor of the arcology. Now, it's rumored that they're going to set up a competing Gilded Age Revivalism. The choice was is poignant one; the Gilded Age was birthed from the defeat of the South in the Civil War. While the North was flourishing, the South languished in post-war ruins.`);
		} else {
			throw Error(`FS "${FSNonconformist}" not found `);
		}
		if (FutureSocieties.isActive('FSRestart')) {
			r.push(`Faced with such a threat, the Elite naturally came to you. They ask you, as leader of the arcology, to both cover up the event and deal with the disgraced Elite.`);
		} else {
			r.push(`Faced with such a threat, the citizens naturally came to you. They ask you, as leader of the arcology, to both prevent the plan and get the nonconformist to move out.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The nonconformist is far too prominent and prosperous to make this an easy dilemma to resolve. Your societal goals are at stake, as is your reputation among some of your best citizens, but the nonconformist has significant sway in the arcology's economy. Merely forcing them out of the arcology would damage its prosperity, and more decisive action could have more serious consequences still.`);
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Ignore the situation`, ignore));
		choices.push(new App.Events.Result(`Throw the nonconformist out of the arcology`, throwOut));
		if (V.PC.rumor === "force") {
			choices.push(new App.Events.Result(`Leverage your reputation with some credible threats`, leverage));
		} else if (V.cash > 10000) {
			choices.push(new App.Events.Result(`Quickly manage a nuanced response`, nuance, `This will cost ${cashFormat(10000)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary ready cash to manage a nuanced solution`));
		}

		App.Events.addResponses(node, choices);

		function ignore() {
			const frag = new DocumentFragment();
			let r = [];
			repX(-250, "event");
			r.push(`You communicate polite concern, but offer no specific plans. The prominent citizens go away muttering, <span class="red">very disappointed</span> that you are not taking their concerns seriously. The nonconformist`);
			if (FSNonconformist === "Pastoralist") {
				r.push(`publishes the exposé, <span class="red">setting back adoption</span> of pastoralism.`);
				V.arcologies[0].FSPastoralist -= 10;
			} else if (FSNonconformist === "Supremacist") {
				r.push(`publicly flogs one of their ${V.arcologies[0].FSSupremacistRace} slaves halfway to exsanguination, <span class="red">setting back acceptance</span> of ${V.arcologies[0].FSSupremacistRace} supremacy.`);
				V.arcologies[0].FSSupremacist -= 10;
			} else if (FSNonconformist === "Subjugationist") {
				r.push(`publicly flogs one of their non-${V.arcologies[0].FSSubjugationistRace} slaves halfway to exsanguination, <span class="red">setting back acceptance</span> of ${V.arcologies[0].FSSubjugationistRace} inferiority.`);
				V.arcologies[0].FSSubjugationist -= 10;
			} else if (FSNonconformist === "Gender Radicalist") {
				r.push(`reveals the defeminized slave and then frees her, completing her return to maleness according to Gender Radicalism's own tenets, <span class="red">setting back acceptance</span> of the society model.`);
				V.arcologies[0].FSGenderRadicalist -= 10;
			} else if (FSNonconformist === "Repopulationist") {
				r.push(`publishes his information, <span class="red">greatly hindering</span> the adoption of mass reproduction.`);
				if (V.PC.belly >= 1000) {
					r.push(`Your own fecundity is brought into question as well, <span class="red">hurting your public opinion.</span>`);
					repX(forceNeg(V.PC.preg*10), "event");
				}
				V.arcologies[0].FSRepopulationFocus -= 10;
			} else if (FSNonconformist === "Eugenics") {
				r.push(`hosts a public wedding commemorating their love. This <span class="red">sets back acceptance</span> of your class system and hinders Eugenics.`);
				if (V.eugenicsFullControl !== 1) {
					r.push(`The Societal Elite are <span class="red">furious</span> at your inaction.`);
					V.failedElite += 100;
				}
				V.arcologies[0].FSRestart -= 20;
			} else if (FSNonconformist === "Gender Fundamentalist") {
				r.push(`hosts a huge public party in a lower-class area of the arcology, staffing it with a large number of slaves with dicks. They're so filled with aphrodisiacs that they orgasm constantly when citizens use their asses. This <span class="red">setts back acceptance</span> of gender traditionalism.`);
				V.arcologies[0].FSGenderFundamentalist -= 10;
			} else if (FSNonconformist === "Paternalist") {
				r.push(`begins requiring his slaves to beat each other in public for the entertainment of passersby, <span class="red">setting back acceptance</span> of paternalism.`);
				V.arcologies[0].FSPaternalist -= 10;
			} else if (FSNonconformist === "Degradationist") {
				r.push(`begins building independent little lives for a few of their best slaves, <span class="red">setting back acceptance</span> of degradationism.`);
				V.arcologies[0].FSDegradationist -= 10;
			} else if (FSNonconformist === "Intellectual Dependency") {
				r.push(`publishes the exposé, <span class="red">setting back acceptance</span> of a totally dependent slave population as citizens scramble to slave-proof their homes.`);
				V.arcologies[0].FSIntellectualDependency -= 10;
			} else if (FSNonconformist === "Slave Professional") {
				r.push(`hosts a public display of just how easy it would be to turn a slave into an effective assassin, striking fear into the citizenry and <span class="red">setting back acceptance</span> of slave professionalism.`);
				V.arcologies[0].FSSlaveProfessionalism -= 10;
			} else if (FSNonconformist === "Body Purist") {
				r.push(`is soon accompanied around the arcology by a slave with ten-liter breast implants, <span class="red">setting back acceptance</span> of body purism.`);
				V.arcologies[0].FSBodyPurist -= 10;
			} else if (FSNonconformist === "Transformation Fetishist") {
				r.push(`is soon accompanied around the arcology by the successfully made-over slave, whose transformation they never tire of extolling. This <span class="red">setting back acceptance</span> of transformation.`);
				V.arcologies[0].FSTransformationFetishist -= 10;
			} else if (FSNonconformist === "Slimness Enthusiast") {
				r.push(`soon reveals their little project. The once-beautiful slave is now so fat she can scarcely walk; the unanswered insult <span class="red">sets back the fashion</span> for slim slaves.`);
				V.arcologies[0].FSSlimnessEnthusiast -= 10;
			} else if (FSNonconformist === "Asset Expansionist") {
				r.push(`soon reveals their little project. A pair of the arcology's finest tits are gone forever; the unanswered insult <span class="red">sets back the fashion</span> for stacked slaves.`);
				V.arcologies[0].FSAssetExpansionist -= 10;
			} else if (FSNonconformist === "Youth Preferentialist") {
				r.push(`hosts a huge public party in a lower-class area of the arcology, staffing it with a large number of older slaves. They're so filled with aphrodisiacs that they eagerly fuck anyone who shows the slightest interest. This <span class="red">dims the fashion</span> for fresh slaves.`);
				V.arcologies[0].FSYouthPreferentialist -= 10;
			} else if (FSNonconformist === "Maturity Preferentialist") {
				r.push(`hosts a huge public party in a lower-class area of the arcology, staffing it with a large number of young slaves. They're virgins, though not for very long. This <span class="red">dims the fashion</span> for mature slaves.`);
				V.arcologies[0].FSMaturityPreferentialist -= 10;
			} else if (FSNonconformist === "Petite Admiration") {
				r.push(`hosts a fancy ball in a lower-class area of the arcology, staffing it with a large number of tall slaves. After a pleasant dance with a partner actually capable of it, many opt to share a second dance beneath the sheets. This <span class="red">dims the fashion</span> for short slaves.`);
				V.arcologies[0].FSPetiteAdmiration -= 10;
			} else if (FSNonconformist === "Statuesque Glorification") {
				r.push(`publicly berates each of their tall slaves to complete tears. As the group begins to gleefully join in, glorification of the tall <span class="red">becomes more a joke than a fashion.</span>`);
				V.arcologies[0].FSStatuesqueGlorification -= 10;
			} else if (FSNonconformist === "Physical Idealist") {
				r.push(`publishes their screed, and spreads money around to ensure its widespread dissemination. This <span class="red">sets back acceptance</span> of physical idealism.`);
				V.arcologies[0].FSPhysicalIdealist -= 10;
			} else if (FSNonconformist === "Decadent Hedonist") {
				r.push(`publishes their findings causing a tremendous panic, several heart attacks and a large number of clogged hallways, but ultimately a resurgence of healthy living practices. This <span class="red">sets back acceptance</span> of hedonistic decadence.`);
				V.arcologies[0].FSHedonisticDecadence -= 10;
			} else if (FSNonconformist === "Chattel Religionist") {
				r.push(`brings in their pet dissenting preacher, whose clever invectives <span class="red">set back acceptance</span> of the new religion.`);
				V.arcologies[0].FSChattelReligionist -= 10;
			} else if (FSNonconformist === "Roman Revivalist") {
				r.push(`offers their Gaulish Revivalism alternative with great fanfare. It fizzles out within a week, mostly because its main backer is privately against all revivalism, but during that time it serves as a focal point for many citizens who are privately impatient with Roman revivalism. This imbroglio <span class="red">sets back acceptance</span> of your revivalist project.`);
				V.arcologies[0].FSRomanRevivalist -= 10;
			} else if (FSNonconformist === "Neo-Imperialist") {
				r.push(`presents their Neo-Republicanism to society with great fanfare. While the slave population is much too indoctrinated to pay these ridiculous precepts much heed, Republican ideals stir debate and rabblerousing among a portion of the free serfs, before your guards brusquely push their preachers off the street and tear down the Republican posters littered around the arcology. This imbroglio <span class="red">sets back acceptance</span> of your Imperial Society.`);
				V.arcologies[0].FSNeoImperialist -= 10;
			} else if (FSNonconformist === "Aztec Revivalist") {
				r.push(`offers their Spanish Revivalism alternative with great fanfare. It fizzles out within a week, mostly because its main backer is privately against all revivalism, but during that time it serves as a focal point for many citizens who are privately impatient with Aztec revivalism. This imbroglio <span class="red">sets back acceptance</span> of your revivalist project.`);
				V.arcologies[0].FSAztecRevivalist -= 10;
			} else if (FSNonconformist === "Edo Revivalist") {
				r.push(`offers their Korean Revivalism alternative with great fanfare. It fizzles out within a week, mostly because its main backer is privately against all revivalism, but during that time it serves as a focal point for many citizens who are privately impatient with Edo revivalism. This imbroglio <span class="red">sets back acceptance</span> of your revivalist project.`);
				V.arcologies[0].FSEdoRevivalist -= 10;
			} else if (FSNonconformist === "Arabian Revivalist") {
				r.push(`offers their Byzantine Revivalism alternative with great fanfare. It fizzles out within a week, mostly because its main backer is privately against all revivalism, but during that time it serves as a focal point for many citizens who are privately impatient with Arabian revivalism. This imbroglio <span class="red">sets back acceptance</span> of your revivalist project.`);
				V.arcologies[0].FSArabianRevivalist -= 10;
			} else if (FSNonconformist === "Chinese Revivalist") {
				r.push(`offers their Mongol Revivalism alternative with great fanfare. It fizzles out within a week, mostly because its main backer is privately against all revivalism, but during that time it serves as a focal point for many citizens who are privately impatient with Chinese revivalism. This imbroglio <span class="red">sets back acceptance</span> of your revivalist project.`);
				V.arcologies[0].FSChineseRevivalist -= 10;
			} else if (FSNonconformist === "Antebellum Revivalist") {
				r.push(`offers their Gilded Age Revivalism alternative with great fanfare. It fizzles out within a week, mostly because its main backer is privately against all revivalism, but during that time it serves as a focal point for many citizens who are privately impatient with Antebellum revivalism. This imbroglio <span class="red">sets back acceptance</span> of your revivalist project.`);
				V.arcologies[0].FSAntebellumRevivalist -= 10;
			} else {
				r.push(`offers their Ancient Greek Revivalism alternative with great fanfare. It fizzles out within a week, mostly because its main backer is privately against all revivalism, but during that time it serves as a focal point for many citizens who are privately impatient with Egyptian revivalism. This imbroglio <span class="red">sets back acceptance</span> of your revivalist project.`);
				V.arcologies[0].FSEgyptianRevivalist -= 10;
			}
			V.nextButton = "Continue";
			App.Utils.updateUserButton();/* unlock Continue button */

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function throwOut() {
			const frag = new DocumentFragment();
			let r = [];
			V.arcologies[0].prosperity -= 10;
			r.push(`You agree with the prominent citizens, and promise to apply all of your considerable contractual and business power to get the nonconformist out of the arcology before they can put their plan into action. You manage it, but only just. Opinion on your actions is mixed: the oligarchs who came to you are pleased you satisfied their requests, but your maneuvers were offensive to the general preference for freedom. The impact on the arcology's economy on the other hand is entirely negative, since the sudden loss of a major player within the arcology's business field <span class="red">damages its prosperity.</span>`);
			V.nextButton = "Continue";
			App.Utils.updateUserButton();/* unlock Continue button */

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function leverage() {
			const frag = new DocumentFragment();
			let r = [];
			repX(500, "event");
			r.push(`Resolving the situation takes you one call. Exactly what happened to your predecessor as owner of the arcology has never become publicly known, but your method of replacing them is rumored to have been somewhat ballistic in nature. It doesn't take much inflection in your voice to communicate threat, and the nonconformist hastily promises to abandon their plans and be less annoying in the future. The oligarchs are somewhat frightened by the rapidity with which you sorted things out, but they can't argue with the results and their <span class="green">respect for you deepens.</span>`);
			V.nextButton = "Continue";
			App.Utils.updateUserButton();/* unlock Continue button */
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function nuance() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(-10000, "event");
			if (FutureSocieties.isActive('FSRestart')) {
				r.push(`You promise to deal with the situation. The Societal Elite trust you to not fail, and they are not disappointed. The fallen Elite`);
			} else {
				r.push(`You promise to deal with the situation. The prominent citizens trust you enough to leave the problem in your hands, and they are not disappointed. The nonconformist`);
			}
			if (FSNonconformist === "Pastoralist") {
				r.push(`publishes the exposé, but finds it effectively defused by a nuanced pro-dairy campaign leveraging your dominance of the arcology's media.`);
			} else if (FSNonconformist === "Supremacist") {
				r.push(`is intent on publicly flogging the unfortunate ${V.arcologies[0].FSSupremacistRace} slave, but quickly finds that you've manipulated their contracts with you to forbid such displays. Frustrated, they subside for now.`);
			} else if (FSNonconformist === "Subjugationist") {
				r.push(`is intent on publicly flogging the unfortunate non-${V.arcologies[0].FSSubjugationistRace} slave, but quickly finds that you've manipulated their contracts with you to forbid such displays. Frustrated, they subside for now.`);
			} else if (FSNonconformist === "Repopulationist") {
				r.push(`publishes their information about pregnancy, but it has little effect thanks to a preemptive campaign leveraging your dominance over the arcology's media. Your reputation is protected by the promises of a large stock of future slaves, securing both money and ensuring a stable population in case of disaster. You also pointed out all the other slaveowners also partaking in the pleasures of a pregnant woman. Plus, what could a flock of heavily pregnant slaves do to overthrow their masters?`);
			} else if (FSNonconformist === "Eugenics") {
				r.push(`is ejected from the elite class following a leak of evidence proving he wasn't fit to be a member of the Societal Elite. Evidence tailored by you. Unfortunately, he was ready for this move; he and his wife had already fled the arcology. You did your job adequately, and managed to suppress any possible outrage in the city.`);
			} else if (FSNonconformist === "Gender Radicalist") {
				r.push(`finds that you've manipulated their contracts with you to forbid them from showing off nonconforming slaves within the arcology. Frustrated, they subside for now.`);
			} else if (FSNonconformist === "Gender Fundamentalist") {
				r.push(`hosts a huge public party in a lower-class area of the arcology, staffing it with a large number of slaves with dicks. However, they're surprised by an unexpected lack of interest in the event, which is only explained when they find that you've organized a much superior event featuring real girls in the main plaza, at the same time.`);
			} else if (FSNonconformist === "Paternalist") {
				r.push(`finds that you've manipulated their contracts with you to forbid them from displaying public slave beatings within the arcology. Frustrated, they subside for now.`);
			} else if (FSNonconformist === "Degradationist") {
				r.push(`discovers that you've hastily set up subtle clauses within the rental contracts that make it all but inevitable that girls sent out on their own would be confiscated. Frustrated, they subside for now.`);
			} else if (FSNonconformist === "Intellectual Dependency") {
				r.push(`publishes the exposé, but finds it effectively ignored while the public's attention is focused on a record breaking slave orgy. Some fruity drinks and club music were all it took.`);
			} else if (FSNonconformist === "Slave Professional") {
				r.push(`hosts a public display of just how easy it would be to turn a slave into an effective assassin, but finds you've prepared a counter for each of his arguments. He's no fool and backs down before he makes things worse for himself.`);
			} else if (FSNonconformist === "Body Purist") {
				r.push(`finds that a mysterious actor has raised serious safety concerns about the new implant technology, causing a minor public outcry against them. The altered slave is not publicly displayed.`);
			} else if (FSNonconformist === "Transformation Fetishist") {
				r.push(`finds that you've manipulated their contracts with you to forbid them from showing off nonconforming slaves within the arcology. Frustrated, they subside for now.`);
			} else if (FSNonconformist === "Slimness Enthusiast") {
				r.push(`finds that you've manipulated their contracts with you to forbid them from showing off fat-bodied slaves within the arcology. Frustrated, they subside for now.`);
			} else if (FSNonconformist === "Asset Expansionist") {
				r.push(`finds that you've manipulated their contracts with you to forbid them from showing off ruined slaves within the arcology. Frustrated, they subside for now.`);
			} else if (FSNonconformist === "Youth Preferentialist") {
				r.push(`hosts a huge public party in a lower-class area of the arcology, staffing it with a large number of older slaves. However, they're surprised by an unexpected lack of interest in the event, which is only explained when they find that you've organized a much superior event featuring fresh virgins in the main plaza, at the same time.`);
			} else if (FSNonconformist === "Maturity Preferentialist") {
				r.push(`hosts a huge public party in a lower-class area of the arcology, staffing it with a large number of young slaves. However, they're surprised by an unexpected lack of interest in the event, which is only explained when they find that you've organized a much superior event featuring famous MILF whores in the main plaza, at the same time.`);
			} else if (FSNonconformist === "Petite Admiration") {
				r.push(`hosts a huge public ball in a lower-class area of the arcology, staffing it with a large number of tall slaves. However, they're surprised by an unexpected lack of interest in the event, which is only explained when they find that you've organized a much superior event featuring famous shortstacks in the main plaza, at the same time.`);
			} else if (FSNonconformist === "Statuesque Glorification") {
				r.push(`is intent on publicly berating the unfortunate giants into mental breakdowns, but quickly finds that you've manipulated their contracts with you to forbid such displays. Frustrated, but thankful you kept their true height out of it, they subside for now.`);
			} else if (FSNonconformist === "Physical Idealist") {
				r.push(`publishes their screed, and soon receives a challenge from you to a brief public debate. They offer a brief rant, to which you respond by removing your suit jacket and flexing, which almost pops the seams of your formal shirt. The public loses interest in the manifesto in the amusement.`);
			} else if (FSNonconformist === "Decadent Hedonist") {
				r.push(`publishes their report and immediately hosts a speech. This is easily countered; you throw a massive party for the arcology's citizens complete with all you can eat buffets, a variety of drugs and a massive orgy to top it off. While the citizens are distracted, the nonconformist's words go unheard and their report is quietly swept under the rug. Not that your population will care as long as there is adequate entertainment to keep their minds off any potential problems.`);
			} else if (FSNonconformist === "Chattel Religionist") {
				r.push(`brings in their pet dissenting preacher, who finds himself caught in a duel from the pulpit with a noted cleric of the slave religion, brought in from outside the arcology on short notice. The debate receives a great deal of attention, and is generally agreed to have been a close-fought draw.`);
			} else if (FSNonconformist === "Roman Revivalist") {
				r.push(`offers their Gaulish Revivalism alternative with fanfare, but fanfare is something that the Romans could certainly manage. The nasty little attempt is forgotten in a day of public gladiatorial combat, chariot racing, and giveaways for the poorer citizens.`);
			} else if (FSNonconformist === "Neo-Imperialist") {
				r.push(`offers their Neo-Republican alternative with fanfare, but their fanfare pales before the magnificence of your Imperial rule. The well-trained, heavily-armored, and socially pampered Imperial Knights of your arcology react to the mere proposal with an outrage so intense that the backers almost immediately retreat into hiding from your furious citizens.`);
			} else if (FSNonconformist === "Aztec Revivalist") {
				r.push(`offers their Spanish Revivalism alternative with fanfare, but fanfare is something that the Aztecs would never acknowledge. The nasty little attempt does nothing after a day of prayer, bloodletting and slave sacrifice.`);
			} else if (FSNonconformist === "Edo Revivalist") {
				r.push(`offers their Korean Revivalism alternative with fanfare, but fanfare is inelegant next to Edo revivalism. The nasty little attempt has its day, but looks gauche next to the stately grace of your project.`);
			} else if (FSNonconformist === "Arabian Revivalist") {
				r.push(`offers their Byzantine Revivalism alternative with fanfare, but jihad may be waged with diplomacy as much as with the sword. The nasty little attempt founders on the growing conservatism of the arcology, whose citizens rally to you as their proper leader.`);
			} else if (FSNonconformist === "Chinese Revivalist") {
				r.push(`offers their Mongol Revivalism alternative with fanfare, but judicious strengthening of your imperial authority sees it off without trouble. The influence of Confucian ideas is spreading through your arcology, making it resistant to radical departures.`);
			} else if (FSNonconformist === "Antebellum Revivalist") {
				r.push(`offers their Gilded Age Revivalism alternative with fanfare, but fanfare rings empty compared to the rock-solid resolve of the Southron peoples. The nasty little attempt is shrugged off in a few days.`);
			} else {
				r.push(`offers their Ancient Greek Revivalism alternative with fanfare, but fanfare is something that the Egyptians could certainly manage. The nasty little attempt is barely noticed over the perfume and noise of a long and beautiful festival.`);
			}
			r.push(`The oligarchy is pleased by how you managed to defuse the situation without causing a spectacle. They're disappointed that you permitted their nonconforming peer to remain in the arcology's upper echelons for the time being, but they accept your solution to the problem.`);
			V.nextButton = "Continue";
			App.Utils.updateUserButton();/* unlock Continue button */

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
