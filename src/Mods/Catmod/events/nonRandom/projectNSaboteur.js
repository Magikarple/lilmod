App.Events.SEProjectNSaboteur = class SEProjectNSaboteur extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.projectN.status === 4,
			() => (V.projectN.poorlyFunded !== 1) && (App.Events.effectiveWeek() >= V.projectN.phase3 + 4) ||
				((V.projectN.public === 1) && (V.projectN.poorlyFunded === 1) && (App.Events.effectiveWeek() >= V.projectN.phase3 + 6))
		];
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "The Sons of Sekhmet";
		V.projectN.status = 9;
		V.projectN.phase4 = App.Events.effectiveWeek();

		App.Events.addParagraph(node, [`You're awoken in the middle of the night by your virtual assistant, informing you that there's a security breach in the genetics lab. It seems like a small team of well-trained saboteurs is currently in the process of planting an explosive on the project N equipment, detected via the AI's routine scanning of the entire arcology's camera system and noticing errors in the genetics lab consistent with outside interference.`]);
		App.Events.addParagraph(node, [`You're not going to be able to get down there in time yourself, but you'll need to respond quickly, or else whoever sent these armed radicals will blow the lab, destroying all your work on project N and potentially killing a number of the nearby scientists, too. Over the cameras, as your assistant brings them back online, you can see one of them hastily spraying the symbol of a rising sun on the outside of the genelab, along with a short phrase in red paint - "THE SONS OF SEKHMET HAVE YOUR BLOOD".`]);

		const choices = [];
		if (V.projectN.wellFunded === 1) {
			choices.push(new App.Events.Result(`Activate the lab's integrated security`, security));
		}
		if (V.mercenaries === 5) {
			choices.push(new App.Events.Result(`Send for your ${V.mercenariesTitle} to bring in a rapid-response bomb defusal team`, mercenaries));
		}
		choices.push(new App.Events.Result(`Desperately try to make it to the lab yourself in time`, yourself));
		App.Events.addResponses(node, choices);

		function security() {
			V.projectN.status = 5;
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You briefly thank your lucky stars that you invested enough in project N to provide for integrated security, then call for the lab's drones to activate. Over the cameras, you smugly watch from your comfortable bed as the security drones tear two of the mysterious saboteurs to shreds, then pin down and apprehend the third. Seems like all they managed to get you today was a <span class="green">brand new slave.</span>`);
			repX(1500, "event");
			const slave = GenerateNewSlave(null, {minAge: 16, maxAge: 32, disableDisability: 1});
			generateSalonModifications(slave);
			slave.origin = "$He is an enslaved Son of Sekhmet, one of many idealistic rebel groups violently opposed to you.";
			slave.devotion = random(-90, -70);
			slave.trust = random(-20, 30);
			slave.weight = random(-20, 30);
			slave.muscles = random(20, 80);
			slave.waist = random(10, 80);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function mercenaries() {
			V.projectN.status = 5;
			return `You immediately call for your ${V.mercenariesTitle} to send a bomb defusal team to the lab, and be ready to fight with the saboteurs on arrival. In the few minutes it takes for them to assemble a QRF and send it rocketing up to your laboratory, the saboteurs have already planted their bomb and vanished out the genelab's doors, disappearing into the dead of night. The mercenary team arrives shortly afterwards, bursts through the doors, and disables the ticking bomb with less than a minute left on the clock. Panting and sweating with nerves rather than fatigue, one of them flashes you a thumbs-up over the security cameras. Crisis narrowly averted.`;
		}

		function yourself() {
			V.projectN.status = 9;
			return `As you sprint towards the lab, an ear-shatteringly loud explosion freezes you in your tracks. Pieces of rubble and glass rain down to your sides for a few seconds, as you watch flames engulf the majority of your genetics laboratory, bright reds and oranges staining your retinas. Most of the project N scientists slept in rooms attached to the lab itself - you don't even need to read your AI report to know that Nieskowitz and the core team are dead already. It'd shock you more if they hadn't died with the project they worked so hard to build.`;
		}
	}
};
