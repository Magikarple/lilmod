App.Encyclopedia.addArticle("Table of Contents", function() {
	const outerDiv = document.createElement("div");
	outerDiv.classList.add("center");
	App.UI.DOM.appendNewElement("h3", outerDiv, "Introduction");
	lineLink(outerDiv, "Playing Free Cities");

	App.UI.DOM.appendNewElement("h3", outerDiv, "The Player Character");
	lineLink(outerDiv, "Design your master", "Design Your Master");
	lineLink(outerDiv, "Being in Charge");
	lineLink(outerDiv, "PC Skills");

	App.UI.DOM.appendNewElement("h3", outerDiv, "Your Slaves");
	lineLink(outerDiv, "Slaves");
	lineLink(outerDiv, "Obtaining Slaves");
	let div = document.createElement("div");
	div.append(App.Encyclopedia.link("Slave Leaders", "Leadership Positions"), " / ",
		App.Encyclopedia.link("Assignments", "Slave Assignments"));
	outerDiv.append(div);
	div = document.createElement("div");
	div.append(App.Encyclopedia.link("Slave Body", "Body"), " / ",
		App.Encyclopedia.link("Skills"));
	outerDiv.append(div);
	div = document.createElement("div");
	div.append(App.Encyclopedia.link("Slave Fetishes", "Fetishes"), " / ",
		App.Encyclopedia.link("Paraphilias Overview"));
	outerDiv.append(div);
	div = document.createElement("div");
	div.append(App.Encyclopedia.link("Quirks"), " / ",
		App.Encyclopedia.link("Flaws"));
	outerDiv.append(div);
	lineLink(outerDiv, "Slave Relationships", "Relationships");
	lineLink(outerDiv, "Slave Health", "Health");
	div = document.createElement("div");
	div.append(App.Encyclopedia.link("Slave Pregnancy", "Pregnancy"), " / ",
		App.Encyclopedia.link("Inflation"));
	outerDiv.append(div);
	lineLink(outerDiv, "Slave Modification");

	App.UI.DOM.appendNewElement("h3", outerDiv, "Your Arcology");
	lineLink(outerDiv, "The X-Series Arcology");
	lineLink(outerDiv, "Arcology Facilities", "Facilities Overview");
	lineLink(outerDiv, "Terrain Types");
	lineLink(outerDiv, "Future Societies");
	lineLink(outerDiv, "The Black Market");

	App.UI.DOM.appendNewElement("h3", outerDiv, "Extras");
	lineLink(outerDiv, "Mods/Pregmod");
	lineLink(outerDiv, "Lore");
	lineLink(outerDiv, "Credits");
	return outerDiv;

	function lineLink(container, text, article) {
		App.UI.DOM.appendNewElement("div", container, App.Encyclopedia.link(text, article));
	}
}, "toc");
