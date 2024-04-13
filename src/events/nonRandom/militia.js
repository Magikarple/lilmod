App.Events.PMilitia = class PMilitia extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	get eventName() {
		return "Militia";
	}

	execute(node) {
		let r = [];
		const dronesTooCost = 5000;
		const selfAloneCost = 2000;
		r.push(`The outside world continues to deteriorate. The Free Cities are a popular target for old world demagogues looking for a convenient scapegoat for the restive populate to hate. The Free Cities were originally founded without much thought towards how they might be defended, should it come to that. But recently, the leading citizens have begun to worry that there might one day be barbarians at the gates. It has been suggested that citizens of means should form a militia.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`This is a less ludicrous suggestion than it might sound. Your arcology's security drones alone could form a formidable means of defense if adapted for that purpose. However, it's not likely that the anarchic Free Cities are going to ever make this anything more than a polite suggestion.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(App.UI.DOM.makeElement("span", `This is a unique opportunity.`, "bold"));
		r.push(`Without this security scare, it's unlikely you could convince any of your free-spirited tenants to even stay near lethally armed drones.`);
		App.Events.addParagraph(node, r);

		const responses = [];
		if (V.arcologyUpgrade.drones === 1) {
			responses.push(new App.Events.Result(`Arm yourself and your drones`, armDrones, `This will cost ${cashFormat(dronesTooCost)}`));
		}
		responses.push(new App.Events.Result(`Arm yourself`, armOnlySelf, `This will cost ${cashFormat(selfAloneCost)}`));
		responses.push(new App.Events.Result(`Ignore this foolishness`, ignore));

		App.Events.addResponses(node, responses);

		function armDrones() {
			let r = [];
			r.push(`In a time of uncertainty, the public adores people who protect them. So, in addition to publicly procuring yourself the latest weapons and armor, you update the arcology's drone systems. The security drones' riot cannons can be replaced for easy maintenance, so it's rather easy to provide them with alternate, lethal weaponry that they can switch to if it becomes necessary. ${V.arcologies[0].name} becomes known as one of the best-protected in the Free Cities. <span class="green">Your reputation has greatly improved.</span>`);
			unlock();
			repX(4000, "event");
			cashX(-dronesTooCost, "event");
			V.personalArms = 3;
			V.PC.skill.combat = Math.max(V.PC.skill.combat, 30);
			return r;
		}

		function armOnlySelf() {
			let r = [];
			r.push(`In a time of uncertainty, the public looks up to people who project strength. So, you purchase yourself some of the latest armor and weapons, and make sure they are visible in a glass-walled cabinet in your office. Many of your wealthier tenants follow suit. A few of them even emulate your example and practice using these implements once a week. <span class="green">Your reputation has improved.</span>`);
			unlock();
			repX(1500, "event");
			cashX(-selfAloneCost, "event");
			V.personalArms = 1;
			V.PC.skill.combat = Math.max(V.PC.skill.combat, 30);
			return r;
		}

		function ignore() {
			let r = [];
			r.push(`No doubt this panicky fad will pass. You ignore the controversy. In a few days, the subject of a militia passes from the public mind.`);
			unlock();
			V.personalArms = 0;
			return r;
		}

		function unlock() {
			V.nextButton = "Continue";
			App.Utils.scheduleSidebarRefresh();
		}
	}
};
