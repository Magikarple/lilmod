App.Events.SEVatCatBoy = class SEVatCatBoy extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.status === 8,
			() => V.growingNewCat === 0,
		];
	}

	execute(node) {
		const slave = growCatgirl("XY", {minAge: 16, maxAge: 16});
		slave.origin = "$He is a vat-grown catboy created by Dr. Nieskowitz and the science team in your genelab.";

		App.Events.addParagraph(node, [
			`With their latest genemodding project complete, Dr. Nieskowitz proudly presents to you a healthy, unconscious catboy, floating suspended in the tube of thick green liquid you use to grow them. "Looks like he came out just fine." The aging doctor says with an authoritative gesture. "Another successful project. ${slave.slaveName} is going to make a lovely addition to your little collection."`
		]);

		App.Events.addResponses(node, [new App.Events.Result(`Bring your new slave back home`, home)]);

		function home() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`There's no obnoxious media attention this time getting in the way of you and your brand new, confusedly meowing catboy. It's just you, the rising sun over your arcology, and a fresh new cat to lead up to the penthouse.`);
			V.projectN.status = 6;
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
