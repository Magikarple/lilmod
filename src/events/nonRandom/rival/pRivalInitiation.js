App.Events.PRivalInitiation = class PRivalInitiation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.rival.state === 3,
			() => !!getSlave(V.rival.ID)
		];
	}

	execute(node) {
		V.rival.state = 5;
		const slave = getSlave(V.rival.ID);
		const {
			He, His,
			he, him, his, himself
		} = getPronouns(slave);
		App.Events.addParagraph(node, [
			`This is a special week, the week of your victory.`,
			App.UI.DOM.slaveDescriptionDialog(slave),
			`awaits your pleasure. You could certainly do to ${him} anything and everything you usually do to your chattel. You could also do something special to mark the occasion.`
		]);
		const choices = [];
		choices.push(new App.Events.Result(`Force ${him} to do a public relations tour with you`, tour));
		choices.push(new App.Events.Result(`Make ${him} orally service your other slaves in public`, serveSlaves));
		if (slave.anus === 0) {
			choices.push(new App.Events.Result(`Break in ${his} asshole and then let the public use it`, breakAss));
		}
		if (slave.balls > 0 && slave.boobs > 300 && V.seeExtreme === 1) {
			choices.push(new App.Events.Result(`Publicly geld ${him}`, geld));
		}
		if (isFertile(slave) && V.seePreg === 1) {
			choices.push(new App.Events.Result(`Let the public impregnate ${him}`, publicImpreg));
		}
		App.Events.addResponses(node, choices);

		delete V.rival.ID;
		function tour() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Though ${he} hates you with all ${his} heart, ${he} knows better than most what happens to slaves who disobey. So, when you describe your public relations plans to ${him}, ${he} promises to obey before you even get to the threats. ${He} finds ${himself} accompanying you to the arcology's finest establishment in a lovely evening dress. The two of you share an understandably quiet meal, with a growing crowd coming to leer at the defeated slaveowner-cum-slave. At a prearranged signal from you, ${he} stands, quickly strips naked, gets down on`);
			if (hasBothLegs(slave)) {
				r.push(`${his} knees,`);
			} else {
				r.push(`the ground,`);
			}
			r.push(`and`);
			if (V.PC.dick !== 0) {
				r.push(`sucks you off`);
				if (V.PC.vagina !== -1) {
					r.push(`and`);
				}
			}
			if (V.PC.vagina !== -1) {
				r.push(`eats you out`);
			}
			r.push(
				r.pop() + ".",
				`Such public humiliation starts ${him} down the path of <span class="hotpink">obedience,</span> and is the <span class="green">talk of the Free Cities.</span>`
			);
			slave.devotion += 4;
			seX(slave, "oral", V.PC);
			repX(2500, "event", slave);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function serveSlaves() {
			const frag = new DocumentFragment();
			let r = [];
			const {
				his2, him2,
			} = getPronouns(V.slaves[1]).appendSuffix("2");
			r.push(`${V.slaves[0].slaveName} leads ${him} out into the arcology's largest atrium, forces ${him} to`);
			if (hasBothLegs(slave)) {
				r.push(`${his} knees,`);
			} else {
				r.push(`the ground,`);
			}
			r.push(`and, in full view of the whole arcology, orally rapes someone who was until this week a slaveowner ${himself}. Behind them, ${V.slaves[1].slaveName} is standing ready for ${his2} turn, and all your other slaves stand behind ${him2}. Public opinion is divided; the precedent is universally agreed to be bad, but the punishment is generally thought to be terrible and deserved. Your slaves, however, are almost insufferably <span class="hotpink">pleased with you</span> for forcing ${slave.slaveName}, whom they still view as a slaveowner, to pleasure them.`);
			V.slaves.forEach(s => {
				seX(slave, "oral", s);
				s.devotion += 10;
			});
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function breakAss() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`${slave.slaveName}, who has been fairly dignified up to this point, breaks down when ${he}'s placed in stocks with ${his} ass in the air. ${His} sobs become screams when, for the first time in ${his} life, ${he} feels the burning sensation of a well-lubricated`);
			if (V.PC.dick !== 0) {
				r.push(`cockhead`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`forcing its way past ${his} virgin sphincter. Raping a virgin anus is not a new pleasure for you, but the usual shrieking, struggling and spasming is all the sweeter this time. <span class="green">Half the arcology</span> has used ${his} <span class="health dec">poor injured butthole</span> by the end of the day; ${he} <span class="gold">is learning to fear you,</span> and hates you <span class="mediumorchid">even more</span> if possible.`);
			slave.devotion -= 4;
			slave.trust -= 5;
			slave.anus = 3;
			seX(slave, "anal", "public", "penetrative", 47);
			repX(2500, "event", slave);
			healthDamage(slave, 10);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function geld() {
			slave.devotion -= 50;
			slave.trust -= 50;
			slave.balls = 0;
			repX(2500, "event", slave);
			healthDamage(slave, 10);
			return `You announce that since ${slave.slaveName} has spent so much money and effort turning ${himself} into a girl with expensive hormones, you'll take a lower-tech step to bring ${him} further in that regard. An autosurgery is set up in public and the populace is treated to the edifying spectacle of a very large pair of testicles being efficiently removed by the modern surgical art. Unusually, ${he} was not given general anesthesia, but instead given local painkillers and made to watch on a monitor, to ${his} <span class="gold">rage</span> and <span class="mediumorchid">horror.</span> There is <span class="green">applause</span> as the cauterizer seals the surgical site where ${his} massive scrotum used to hang. ${His} cock looks softer already.`;
		}

		function publicImpreg() {
			seX(slave, "vaginal", "public", "penetrative", 47);
			slave.preg = 1;
			slave.pregSource = -2;
			slave.pregKnown = 1;
			slave.pregWeek = 1;
			slave.devotion -= 15;
			slave.pregType = setPregType(slave);
			WombImpregnate(slave, slave.pregType, -2, 1);
			slave.vagina = 3;
			repX(2500, "event", slave);
			return `You announce that since ${slave.slaveName} damaged the arcology, ${he} will be taking a leading role in the reconstruction. ${He} will be doing this by replacing one of the residents killed in the violence — by bearing a new slave, to be conceived collectively. The shame and <span class="mediumorchid">horror</span> of ${his} future as breeding stock comes home to ${him} as ${he}'s restrained in a chair with ${his} legs spread. Soon, the stream of fluids is running down ${his} <span class="lime">thoroughly-fucked pussy</span> and over ${his} anus to pool on the floor beneath ${him}. Modern medical imaging reveals ${his} fertile ovum's last, losing battle against a legion of sperm in real time, and the images are projected on large screens.`;
		}
	}
};
