App.Events.SEProjectNInitialized = class SEProjectNInitialized extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.status === 1
		];
	}

	execute(node) {
		V.projectN.status = 2;
		V.projectN.phase1 = App.Events.effectiveWeek();

		App.Events.addParagraph(node, [`After giving the order to your personal assistant to begin preparations for your transhumanist genetic engineering project, you spend much of the next week getting in contact with the most renowned geneticists and biologists of the old world. Many of these gray-bearded intellectuals scoff as you initially explain your goal of making a 'catgirl', but change their tune almost immediately when you mention the paycheck attached. By the end of the week, you've acquired an impressive team of high-profile minds en route to the arcology, many of them already setting up workstations and tables full of imported chemicals within your laboratory.`]);
		App.Events.addParagraph(node, [`The first few days within the lab are spent organizing the new staff's structure; under your supervision, they create a formal research team headed by the ancient Doctor Nieskowitz, dubbed "Project N" both for the research head and as a dry joke by the ever-sardonic science team for their cat-focused intentions. As things begin to formalize into the process of initial research, you realize you've got a decision to make before you've even started the project itself - are you going to keep Project N a secret from the rest of your arcology, or immediately bring it out into the public eye?`]);

		const choices = [];
		choices.push(new App.Events.Result(`Announce Project N to the public`, announce));
		choices.push(new App.Events.Result(`Keep Project N quiet`, quiet));
		App.Events.addResponses(node, choices);

		function announce() {
			let r = [];
			r.push(`You hold a press release the next day with a number of prominent journalists in the arcology noting the research team that you've gathered for project N, and its intention to create the world's first fully natural catgirl. Even though you've got absolutely no results to show and the project is still in its fully theoretical stage, the attending journalists react to the news with obvious <span class="green">excitement</span> and you spend the next few hours answering conceptual questions that run on arcology media for the next couple of days, which <span class="green">helps</span> promote your public image. When you return to the lab, Dr. Nieskowitz is clearly irritated, telling you that the media attention is almost guaranteed to <span class="red">slow down</span> progress in these early stages.`);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				r.push(`This announcement absolutely <span class="red">horrifies</span> the body purists in your arcology.`);
			}
			repX(2000, "event");
			V.projectN.public = 1;
			V.bodyPuristRiot = 1;
			if (FutureSocieties.isActive('FSBodyPurist')) {
				repX(-4000, "event");
			}
			return r;
		}

		function quiet() {
			return `You opt to keep Project N on the down-low for now, probably the safer choice. Lack of media attention will surely make your scientists <span class="green"> work faster</span> undisturbed, too.`;
		}
	}
};
