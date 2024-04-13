// cSpell:ignore Eugh, Encoolees, Eycole

App.Events.PSchoolSuggestion = class PSchoolSuggestion extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].prosperity > 80,
			() => V.schoolSuggestion === 0,
			() => App.Utils.schoolCounter() === 0,
		];
	}

	execute(node) {
		const startFee = 10000;

		V.schoolSuggestion = 1;
		App.Events.addParagraph(node, [`You entertain your most prominent citizens on a regular basis; it's expected, it's good business, and it's occasionally interesting. You're fashionably late again tonight, but these affairs are usually informal, and your knot of guests start without you with no offense given or taken. They know you're busy, they respect you for it, and they know you'll make an appearance if and when you can. The drinks will be just as good either way.`]);

		App.Events.addParagraph(node, [`When you do appear, you get an even greater acclamation than usual. It seems your best citizens have discovered that they're unanimous in the belief that the arcology would benefit if a reputable slave school opened a branch campus here. Now they're deep in debate over which of the prominent schools is the best, and it's turned into a friendly but spirited dispute over the schools' merits.`]);

		App.Events.addParagraph(node, [`It seems a young, thin woman in a modern business suit was concluding her own argument when you arrived. "In summation, I propose we offer our support for Nueva Universidad de Libertad," says the woman, who you now realize is a very feminine man. "Nullification may seem extreme, but serves to expand the potential market amongst more... traditional slaveowners," says the man, who you <i>now</i> realize is a woman who merely looks like a very feminine man.`]);

		if (V.seeDicks !== 100) {
			App.Events.addParagraph(node, [`"I believe what you need in a slave is a good base. As such, The Utopian Orphanage is the best. They offer girls who were raised with careful attention; they're beautiful, smart, well-educated and unspoiled." The young surgeon continues. "No traumas, a happy childhood, obedient and trusting. You can then mold them to your will as you please; I have enough faith in my skills to achieve the results I desire myself."`]);

			App.Events.addParagraph(node, [`"The Slave School for me," says a portly man with a thriving slave breaking business down in the markets. "Their girls are pretty, skilled, and innocent, without any of that weird crap the other schools go in for. Besides, all that special stuff drives up the prices. TSS girls are cheap for what you get. When you're tired of one, just buy another." He turns to his friend and business partner, a much thinner man. "Though I'm sure you disagree with me."`]);

			App.Events.addParagraph(node, [`"Of course I do, we've been having this debate every day for ten years." The thin man laughs. "Hasn't hurt our company, though. Anyway, I'm a GRI man. It's much harder to change a girl's body than it is to train her mind. The Growth Research Institute might sell their girls with no training and some nasty flaws, but you can fix those faster than you can grow a well-trained skinny girl's tits out to <i>here</i>," and he gestures far out in front of his own chest.`]);

			App.Events.addParagraph(node, [`An older woman standing across from him sniffs. "St. Claver's knows how to do both. They train them right, and if they aren't perfectly made, well, that's what plastic surgery is for." She favors the group with a sharp smile. "The best part is that between the silicone and their, ahem, strict training, they're all the same. Once you get used to their girls, you can always rely on them to give you more of what you like."`]);
		}

		if (V.seeDicks !== 0) {
			App.Events.addParagraph(node, [`"That's what I like about L'École," her neighbor puts in.${(V.language !== "French") ? ` "Bad French, I know: Le Eycole Dess Encoolees."` : ``} Less articulate than the others, he makes a vague motion down near his waist, as though he were fucking something, and then stops himself. "Anyway. If you like butts, they're the best. You can train slaves for years and not get them as eager to take it up the ass as that place makes 'em. Their girls come as soon as you stick it in 'em."`]);

			App.Events.addParagraph(node, [`"Eugh." His neighbor rolls his eyes. "If your taste is a bit more refined, the Gymnasium-Academy makes their, ha, <i>girls</i> more well-rounded than just that. Not that they aren't delightfully entertaining when it comes to that, either. But they're also fit, well-trained, and even skilled at martial arts. They're perfect if you like hot young things all ready to be your bodyguard."`]);

			App.Events.addParagraph(node, [`The unusually competent young heiress standing next to him snickers. "If you're going to bring up refinement, um, hello, the Futanari Sisters. I have four futas in my apartment having sex with each other right now. How do I know? Because they're always having sex with each other. They never stop." Her eyes take on a faraway look and she pauses. "Um, haha, I know what I'm doing later."`]);
		}

		App.Events.addParagraph(node, [`"If you like them soft and mellow, you got to go with The Cattle Ranch," a buff man blurts loudly while slamming down his empty mug. "I've got a pair of 'em for my bedroom; they are so loving after a good milking. Taste good too." His drinking buddy retorts, "Too much work is what they are. They might as well be animals with how they act.${(V.seePreg === 0) ? " In addition, hope you like pregnant pussies, 'cause you need to keep them gravid or their milk dries up." : ""}"`]);

		App.Events.addParagraph(node, [`"I see good taste is scarce within this walls," suddenly stated a young man previously quiet in his corner. "I say quality and strength is where the game should be played and there's nothing better than the girls from the Hippolyta Academy."`]);

		App.Events.addParagraph(node, [`The older gentleman who seems to have been acting as unofficial moderator before you came in turns to you. "In any case, ${(V.PC.title === 1) ? "sir" : "madam"}, we agreed before you came in. We'd like to get together and pay half the cost of encouraging a slave school to set up a branch campus here, if you'd be willing to pay the other half and choose which. I think ${cashFormat(startFee)} from you would cover it." He looks around the group. "Before we started this little debate, we all agreed to chip in regardless of which you chose."`]);

		App.UI.DOM.appendNewElement("div", node, `Selecting a school will cost ${cashFormat(startFee)} and add minor upkeep costs`, "note");

		const choices = [];
		if (V.seeDicks !== 100) {
			choices.push(new App.Events.Result(`The Slave School`, TSS));
			choices.push(new App.Events.Result(`The Utopian Orphanage`, TUO));
			choices.push(new App.Events.Result(`The Growth Research Institute`, GRI));
			choices.push(new App.Events.Result(`St. Claver Preparatory`, SCP));
			if (V.seePreg !== 0) {
				choices.push(new App.Events.Result(`The Cattle Ranch`, TCR));
			}
			choices.push(new App.Events.Result(`The Hippolyta Academy`, HA));
		}
		if (V.seeDicks !== 0) {
			choices.push(new App.Events.Result(`L'École des Enculées`, LDE));
			choices.push(new App.Events.Result(`The Gymnasium-Academy`, TGA));
			choices.push(new App.Events.Result(`The Futanari Sisters`, TFS));
			choices.push(new App.Events.Result(`Nueva Universidad de Libertad`, NUL));
		}
		App.Events.addResponses(node, choices);

		function TSS() {
			V.TSS.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting The Slave School about opening a branch campus here, immediately.`;
		}

		function TUO() {
			V.TUO.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting The Utopian Orphanage about opening a branch campus here, immediately.`;
		}

		function GRI() {
			V.GRI.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting the Growth Research Institute about opening a branch campus here, immediately.`;
		}

		function SCP() {
			V.SCP.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting St. Claver Preparatory about opening a branch campus here, immediately.`;
		}

		function TCR() {
			V.TCR.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting the Cattle Ranch about opening a local pasture, immediately.`;
		}

		function HA() {
			V.HA.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting the Hippolyta Academy about opening a local branch, immediately.`;
		}

		function LDE() {
			V.LDE.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting L'École des Enculées about opening a branch campus here, immediately.`;
		}

		function TGA() {
			V.TGA.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting the Gymnasium-Academy about opening a branch campus here, immediately.`;
		}

		function TFS() {
			V.TFS.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting the Futanari Sisters about moving a harem of futas here, immediately.`;
		}

		function NUL() {
			V.NUL.schoolPresent = 1;
			cashX(-startFee, "policies");
			return `You thank your leading citizens and announce your decision: you'll be contacting Nueva Universidad de Libertad about opening a branch campus here, immediately.`;
		}
	}
};
