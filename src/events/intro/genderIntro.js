App.Intro.genderIntro = function() {
	const node = new DocumentFragment();

	App.Events.addParagraph(node, [
		`The Free Cities are sexually libertine places, and sexual slavery is ubiquitous. Some of the early Free Cities upheld or even strengthened traditional gender roles, expecting men to be men and women to be women. Others subscribed to an interesting refinement of those gender roles, considering any sex slave female, regardless of her biology. A small minority even went so far as to strongly favor societal feminization of slaves born male; in these, biologically female slaves were a rare sight.`,
		App.UI.DOM.makeElement("span", `Which kind of Free City came to predominate?`, ["intro", "question"])
	]);

	App.Events.addResponses(node, [
		new App.Events.Result(`Free Cities that were open-minded about who could be a slave girl.`, open, `Default setting. The majority of slaves will be biologically female, and all content will be available.`),
		new App.Events.Result(`Free Cities that understood that girls are girls.`, girlIsGirl, `Almost all slaves will be biologically female, restricting some content.`),
		new App.Events.Result(`Free Cities that understood that girls are girls with some exceptions.`, exceptions, `This option will make almost all generated slaves female, but will allow for the attachment of a certain organ through surgery.`),
		new App.Events.Result(`Free Cities that preferred girls with dicks.`, slaveIsBoy, `Almost all slaves will be biologically male, restricting some content.`),
	]);

	return node;

	function open() {
		V.seeDicks = 25;
		Engine.play("Slave Age Intro");
		return ``;
	}

	function girlIsGirl() {
		V.seeDicks = 0;
		Engine.play("Slave Age Intro");
		return ``;
	}

	function exceptions() {
		V.seeDicks = 0;
		V.makeDicks = 1;
		Engine.play("Slave Age Intro");
		return ``;
	}

	function slaveIsBoy() {
		V.seeDicks = 100;
		Engine.play("Slave Age Intro");
		return ``;
	}
};
