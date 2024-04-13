App.Events.SENicaeaAnnouncement = class SENicaeaAnnouncement extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.nicaea.held !== 1,
			() => FutureSocieties.isActive('FSChattelReligionist'),
			() => V.arcologies[0].FSChattelReligionist >= V.FSLockinLevel,
			() => V.nicaea.announced !== 1,
			() => V.nicaea.eventWeek !== V.week
		];
	}

	execute(node) {
		let r = [];

		V.nextButton = "Continue";
		V.nicaea.announced = 1;
		V.nicaea.preparation = 1;
		V.nicaea.involvement = 0;
		V.nicaea.power = 1;
		V.nicaea.eventWeek = V.week;
		V.nicaea.name = `Council of ${App.Data.ArcologyNames.ChattelReligionist.random()}`;
		let advocate;
		if (V.PC.title === 1) {
			advocate = "male";
		} else if (V.PC.dick !== 0) {
			advocate = "futa";
		} else {
			advocate = "female";
		}
		App.Events.addParagraph(node, [`Religion is full of politics.`]);

		App.Events.addParagraph(node, [`The Chattel Religionist faith was always going to be a ferociously controversial thing. The old world faiths it borrows from condemned it as sinful at best and heretical at worst, right from the start, and they've done their feeble best against it ever since. Secular old world institutions regard it with a predictable mixture of disdain and fear. Lately, however, the young faith has started to suffer from another common malady of new religions for the first time: internal dissension. Just who is a Chattel Religionist? The faith has no governing body, no standard holy text, and no creed held in common. So far, any slaveowner has been able to define themselves as a Chattel Religionist by adopting some old world religious tropes adapted to modern slavery, and by calling themselves a Chattel Religionist. That's it. This loose, welcoming basis has often been a strength. It appeals to many potential converts among Free Cities slaveowners, and it's been difficult to have internal disputes when there are no rules to fight over.`]);

		r.push(`Some prominent Chattel Religionists, however, are now arguing that Chattel Religionism can and should do more. You're conversing with one such advocate now, via video call. "Chattel Religionism could be truly great,"`);
		if (advocate === "male") {
			r.push(`he`);
		} else {
			r.push(`she`);
		}
		r.push(`argues vigorously. "It isn't now. We'll never accomplish anything without minimal unity and direction. There's too much play-acting and not enough evangelical fire."`);
		if (advocate === "male") {
			r.push(`He`);
		} else {
			r.push(`She`);
		}
		r.push(`rotates the camera, letting you see the view`);
		if (advocate === "male") {
			r.push(`from his desk. He's not an arcology owner, but he runs an extremely successful chain of slave brothels. He's had success in large part because of how he's inculcated his whores with the faith. Several naked women are kneeling in front of the desk he's calling you from. They're praying aloud for God to bless them with many customers today, so they can honor their owner with good profits. "This is well enough," he says with satisfaction. "But if we pull together, someday every woman in the world might understand that a pure, subservient role is her only way to heaven." He`);
		} else if (advocate === "futa") {
			r.push(`down her naked chest. She's reclining on a pile of cushions, and a slave is squatting over her, riding her cock. The slave's head and shoulders are covered in religious garb, and the slave is wearing an expression of the most transcendent delight as she pistons herself up and down on her Mistress's penis. The slave orgasms, tears of rapture streaming down her face as she gives herself a pearl necklace. "This is well enough," your interlocutor says with satisfaction. "But if we pull together, we can create heaven on earth by spreading the gospel of hedonism to all." She`);
		} else {
			r.push(`from where she's sitting. Across the darkened room from her, there's an altar, lit from above. A young girl is spread-eagled on it, naked. She looks very much as though she's just turned eighteen. A slave in religious garb is performing oral sex on her, with evident skill; she orgasms, shrieking with religious fervor as she does. Another slave helps her up and dresses her in similar clothing, and a crowd of slaves surrounds their new sister, kissing her, fondling her, and praying. "This is good," your interlocutor says with satisfaction. "But if we pull together, this beautiful sexual purity can spread beyond a few arcologies." She`);
		}
		r.push(`comes to the point. "We need someone to call a council to lay down a strong foundation for the faith. We need a creed that can act as a uniting requisite to be a faithful slaveowner. You're one of the world's most prominent Chattel Religionist arcology owners. There's certainly no one who's ahead of you. I've spoken with our coreligionists, and those who aren't addicted to anarchy deputed me to ask you to convene it and host a council to establish the creed. If you're not willing, we'll find someone else."`);
		App.Events.addParagraph(node, r);

		App.Events.addParagraph(node, [`Hosting a new religion's first synod will be expensive and time-consuming, but would give you considerable power to influence its outcome. However, if you decline, it will be held elsewhere without your input and will probably fracture the developing faith. Vocal opposition would likely rob it of force, leaving Chattel Religionism much as it is now, and prejudice the faithful against another attempt for many years.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Host the council`, host, `This will cost ${cashFormat(10000)}, and influencing the outcome will likely require further investment`),
			new App.Events.Result(`Oppose the council`, oppose),
			new App.Events.Result(`Ignore the council`, ignore),
		]);

		function host() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You agree to host the council.`);
			if (advocate === "male") {
				r.push(`"I'll look forward to it," says the evangelistic whoremonger. Then he orders the prostitutes praying before his desk to offer him their holes, and ends the call.`);
			} else if (advocate === "futa") {
				r.push(`"Delightful," says the devoutly dominant dickgirl, and fills her slave with cum before ending the call.`);
			} else {
				r.push(`"Wonderful," says the evangelistic lady slaveowner. She orders that the newly consecrated slave approach her, and ends the call.`);
			}
			r.push(`You have a tremendous amount of work to do, and not much time to do it. You immediately set aside a sizable sum as an initial budget for the event itself. The first major decision you'll need to make about the council is who to invite. As one of Chattel Religionism's most prominent figures, you have a good idea of who you'd have to include to ensure that the council's agreements have as much weight as possible; ${V.assistant.name} immediately begins collating background information on potential attendees, to assist you further.`);
			V.nicaea.involvement = 1;
			V.nicaea.power += 1;
			V.nicaea.influence = 1;
			V.nicaea.name = `Council of ${V.arcologies[0].name}`;
			cashX(-10000, "event");

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function oppose() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You decline, stating that you believe Chattel Religionism is best in its current diffuse form. "I respect your position," says the`);
			if (advocate === "male") {
				r.push(`evangelistic whoremonger, "though I think you're being shortsighted." The holy whores look fearful, hearing something in their Master's tone as he ends the call.`);
			} else if (advocate === "futa") {
				r.push(`dickgirl evangelist, "but I do regret it." She begins to pound her dick up into her slave, taking out her frustrations on her poor fucktoy, and ends the call.`);
			} else {
				r.push(`evangelistic lady slaveowner, "though I must stand against it." She orders the newly consecrated slave whipped in penance for this reverse, and ends the call.`);
			}
			r.push(`You announce your opposition to the planned council publicly, using your considerable influence within the developing religion to make your opinion known. Your arguments are couched in the language of the new faith, and emphasize its welcoming and open nature to anyone willing to experience the holy institution of sexual slavery, be it as a slave or a slaveowner. Your force and vigor in the debate <span class="green">enhances your reputation,</span> and helps sway other prominent Chattel Religionists away from attending the council. It's not yet clear whether a weakened council will manage to meet and get anything done, or if you've successfully prevented the idea from coalescing. You'll have to keep working at it and wait at least a week to see what the results of the controversy will be.`);
			V.nicaea.involvement = -1;
			repX(5000, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function ignore() {
			V.nicaea.preparation = 0;
			return `You give a politely noncommittal answer, instruct ${V.assistant.name} that further calls on the matter are to be deflected, and give the matter no further thought.`;
		}
	}
};
