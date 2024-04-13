App.Events.PArcologyNaming = class PArcologyNaming extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.arcologies[0].name.indexOf("Arcology ") !== -1,
		];
	}

	get eventName() {
		return "Arcology Naming";
	}

	execute(node) {
		let r = [];
		r.push(`As a society free of the encumbrance of governmental oversight, the arcologies of the Free Cities are places where societal evolution and corporate expansion can occur rapidly. Even so, the incredible speed with which the arcology has improved under your tenure as compared to that of your predecessor, after you obtained ownership through`);
		if (V.PC.rumor === "wealth") {
			r.push(`a leveraged buyout,`);
		} else if (V.PC.rumor === "diligence") {
			r.push(`hard work and competence,`);
		} else if (V.PC.rumor === "force") {
			r.push(`some episodes of violence,`);
		} else if (V.PC.rumor === "social engineering") {
			r.push(`the creative use of psychology,`);
		} else if (V.PC.rumor === "luck") {
			r.push(`an incredible opportunity,`);
		}
		r.push(`is nothing short of astonishing. Other arcologies have taken many years to develop along anything but strictly conservative lines, and you are not the only arcology owner with a background`);
		if (isPCCareerInCategory("wealth")) {
			r.push(`of substantial wealth.`);
		} else if (isPCCareerInCategory("capitalist")) {
			r.push(`in business.`);
		} else if (V.PC.career === "mercenary") {
			r.push(`in the world of private contracting.`);
		} else if (V.PC.career === "recruit" || V.PC.career === "child soldier") {
			r.push(`in the military.`);
		} else if (V.PC.career === "slaver") {
			r.push(`as a slavebreaker.`);
		} else if (V.PC.career === "slave overseer") {
			r.push(`as a slave trainer.`);
		} else if (V.PC.career === "slave tender") {
			r.push(`as a slave tamer.`);
		} else if (V.PC.career === "engineer") {
			r.push(`in arcology engineering.`);
		} else if (V.PC.career === "construction" || V.PC.career === "worksite helper") {
			r.push(`in construction.`);
		} else if (V.PC.career === "medicine" || V.PC.career === "medical assistant") {
			r.push(`in medicine and surgery.`);
		} else if (V.PC.career === "nurse") {
			r.push(`in medicine.`);
		} else if (V.PC.career === "celebrity" || V.PC.career === "rising star" || V.PC.career === "child star") {
			r.push(`in the public sphere.`);
		} else if (V.PC.career === "escort" || V.PC.career === "prostitute" || V.PC.career === "child prostitute") {
			r.push(`involving many personal contacts.`);
		} else if (V.PC.career === "servant" || V.PC.career === "handmaiden" || V.PC.career === "child servant") {
			r.push(`involving the rich and powerful.`);
		} else if (V.PC.career === "gang" || V.PC.career === "hoodlum" || V.PC.career === "street urchin") {
			r.push(`involving gangs.`);
		} else if (V.PC.career === "BlackHat" || V.PC.career === "hacker" || V.PC.career === "script kiddy") {
			r.push(`involving mysterious data breaches.`);
		} else {
			r.push(`in the Free Cities.`);
		}
		r.push(`It occurs to you that the arcology's growing role as a place where those with the means to do so can live in the society you have created, enjoying themselves and their lives to the fullest while subjugating others, should be commemorated.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`As any slaveowner with half a mind in the Free Cities knows, there is power in words, and in what they represent. Master. Slave. These two words alone, more than any others, define the arcologies that have taken up the mantle of leading the world forward in these dark times. The time has come to add a new term to the lexicon of the Free Cities — a name. No longer will your arcology be known only as ${V.arcologies[0].name}, a bland and uninspiring name if ever there was one.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`From this day forward, the arcology shall be known as:`);
		App.Events.addParagraph(node, r);
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.makeTextBox(V.arcologies[0].name, (v) => V.arcologies[0].name = v));

		const responses = [];
		responses.push(new App.Events.Result(`Hurrah!`, hurrah, `Click to confirm your arcology's name, for now and ever! Or until you decide to change it again while managing your arcology.`));

		App.Events.addResponses(node, responses);

		function hurrah() {
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();
			return `Your citizens enthusiastically respond to your naming of the arcology as ${V.arcologies[0].name}. They are proud to finally have a real name for their home. Other Free Cities take note, and some take up their own names as well, another indication of the Cities' collective ascension over the old world.`;
		}
	}
};
