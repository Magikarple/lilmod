// cSpell:ignore REHGReplacement

App.Events.REHGReplacement = class REHGReplacement extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.HeadGirlID !== 0,
		];
	}

	actorPrerequisites() {
		return [[
			(s) => s.ID !== V.HeadGirlID,
			(s) => s.rules.speech !== "restrictive",
			(s) => s.trust > 75,
			(s) => s.devotion > 50,
			(s) => s.vagina > 0,
			(s) => s.intelligence + s.intelligenceImplant >= S.HeadGirl.intelligence + S.HeadGirl.intelligenceImplant,
			(s) => Math.min(s.skill.vaginal, 100) > Math.min(S.HeadGirl.skill.vaginal, 100), // skills can rarely exceed 100 temporarily during endWeek, so this is clamped to ensure accuracy
			(s) => s.assignment !== Job.QUARTER,
			(s) => s.fetish !== Fetish.MINDBROKEN,
			canSee,
			canHear,
			canWalk,
			hasAnyArms,
			canTalk,
			(s) => canDoVaginal(s) || (s.dick > 0 && s.chastityPenis === 0)
		]];
	}

	get weight() {
		return (V.rep-10000 > random(1, 10000)) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = getSlave(this.actors[0]);

		App.Events.drawEventArt(node, [slave, S.HeadGirl], ["no clothing", null]);

		const {
			He, His,
			he, his, him, girl
		} = getPronouns(slave);
		const {say, title:Master} = getEnunciation(slave);
		const {
			He2,
			he2, him2, his2, himself2, wife2,
		} = getPronouns(S.HeadGirl).appendSuffix("2");
		const {say:say2} = getEnunciation(S.HeadGirl);

		r.push(
			`There's a constant traffic of slaves in and out of your office as your chattel comes in and out for instructions, inspections, and sex. Your Head Girl`,
			App.UI.DOM.slaveDescriptionDialog(S.HeadGirl),
			`is one of the most frequent visitors, since although you trust ${him2}, ${he2}'s still a slave and has to check with you before acting on some matters.`,
		);
		if (S.HeadGirl.relationship === -3) {
			r.push(`(${He2}'s also your ${wife2}, making ${his2} visits a pleasant diversion.)`);
		} else if (V.arcologies[0].FSEgyptianRevivalistLaw === 1) {
			r.push(`(${He2}'s also your Consort, making ${his2} visits a pleasant diversion.)`);
		}
		r.push(
			`During one of ${his2} visits,`,
			contextualIntro(S.HeadGirl, slave, true),
			`happens to come in for ${his} scheduled inspection. ${He} perches politely on the couch, waiting ${his} turn like a good ${girl}. ${His} ${App.Desc.eyesColor(slave)} are watchful, however, and ${he} seems to be paying very close attention to your conversation with your Head Girl.`
		);

		r.push(
			`When ${S.HeadGirl.slaveName} leaves, ${he} clears ${his} throat nervously. ${He} gathers ${his} courage, and ${say}s,`,
			Spoken(slave, `"${Master}, I think I would make a better Head Girl than ${him}."`),
			`${He} takes a deep breath and plunges on.`,
			Spoken(slave, `"I'm just as smart as ${he2} is. And, ${Master}, I'm sure you've noticed ${he2} isn't very good at teaching other girls vaginal skills.`)
		);
		if (S.HeadGirl.vagina > 0) {
			r.push(Spoken(slave, `I could do it much better than ${he2} does,`));
		} else if (S.HeadGirl.vagina === 0) {
			r.push(Spoken(slave, `How could ${he2} be? ${He2}'s a virgin! I can manage it,`));
		} else {
			r.push(Spoken(slave, `How could ${he2} be? ${He2} doesn't have a pussy! I can manage it,`));
		}

		r.push(
			Spoken(slave, `${Master}. Please, give me a try."`),
			`${He} goes on like this for a while, slowly degenerating into repetition of ${his} points as your failure to give ${him} an immediate positive or negative response starts to worry ${him}.`
		);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`${He}'s right`, yes));
		choices.push(new App.Events.Result(`Pretend you didn't hear ${him}`, ignore));
		choices.push(new App.Events.Result(`Let your Head Girl sort this out however ${he2} sees fit`, tattle));
		App.Events.addResponses(node, choices);

		function yes() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`After giving the matter some consideration, you agree, instructing ${V.assistant.name} that ${slave.slaveName} is now the Head Girl. ${slave.slaveName} is <span class="devotion inc">overjoyed,</span> and bounces to ${his} feet, clearly very eager to begin. You caution ${him} that ${he} is not to undermine ${S.HeadGirl.slaveName} by letting anyone know why you decided to change Head Girls. ${He} nods obediently. As far as ${S.HeadGirl.slaveName} knows, it's just a standard change of Head Girls, and ${he2}'s too good a slave to let it affect ${him2} seriously.`);
			slave.devotion += 5;
			assignJob(slave, Job.HEADGIRL); // should we be removing the old HG here?
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function ignore() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(
				`You pretend you didn't hear ${him}, and go about your business. ${He} quickly catches on, and shuts ${his} mouth, sitting stiffly on the couch and waiting for you to say something. After letting ${him} wait for a good long while, you steeple your fingers and look over them at ${him}. <span class="trust dec">${He} quails at your gaze,</span> but does not look away from you. You tell ${him} that, for ${his} general information, you prefer to make decisions about what slaves do which job yourself, and are not interested in input from the slaves themselves on the matter. You continue to observe that if any slave were to offer input, ${he} might suggest to you that ${he} thought ${his} own judgment superior to yours. Then, you dismiss ${him}.`,
				Spoken(slave, `"Yes ${Master}, thank you, ${Master},"`),
				`${he} ${say}s, and flees.`
			);
			slave.trust -= 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function tattle() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You page ${S.HeadGirl.slaveName}, telling ${him2} to get back up to your office. ${slave.slaveName} hears you, of course, and stiffens with fear. ${He} knows ${he}'s in trouble, but ${he} doesn't yet know how much. You tell ${S.HeadGirl.slaveName} to have a seat next to ${slave.slaveName} on the couch, and instruct ${V.assistant.name} to replay the last five minutes of the feeds from your office on a wallscreen. ${slave.slaveName}'s`);
			if (slave.lips > 40) {
				r.push(`pillowlike`);
			}
			r.push(`lower lip begins to tremble at this, and ${he} can barely manage to keep ${his} gaze on the fatal replay of ${his} attempt to convince you to replace ${S.HeadGirl.slaveName} with ${him}. ${S.HeadGirl.slaveName}, who is no fool, is not surprised by this, but the replay still angers ${him2}. As it rolls on, ${his2} hand${hasBothArms(S.HeadGirl) ? "s" : ""} begin to roam across ${slave.slaveName}, who winces at ${his2} touch. About halfway through, ${S.HeadGirl.slaveName} looks straight at you and cruelly pinches one of ${slave.slaveName}'s nipples. You respond to the nonverbal question with a silent nod, and ${S.HeadGirl.slaveName} smiles briefly at you. Then, ${he2} sticks ${his2} tongue in ${slave.slaveName}'s ear. The poor slave starts at the warm, wet intrusion, but knows better than to try to resist. ${He} closes ${his} eyes tight.`);

			App.Events.addParagraph(frag, r);
			r = [];

			r.push(`${S.HeadGirl.slaveName} hops off the couch, gets down in front of ${his2} victim,`);
			if (slave.belly >= 5000 || slave.weight > 95) {
				r.push(`shoves ${his} legs apart, and buries ${himself2} beneath ${his} belly.`);
			} else {
				r.push(`and shoves ${his} legs apart.`);
			}
			r.push(`${slave.slaveName} scrunches up ${his} face, expecting something agonizing to happen to ${his}`);
			if (canDoVaginal(slave)) {
				r.push(`pussy, but ${S.HeadGirl.slaveName} shocks ${him} by starting to hungrily eat ${him} out.`);
			} else {
				r.push(`cock, but ${S.HeadGirl.slaveName} shocks ${him} by giving ${him} a lush blowjob.`);
			}
			r.push(`${slave.slaveName} clearly expects a trap, but ${S.HeadGirl.slaveName}'s attentions slowly distract ${him}. When ${he}'s on the very verge of orgasm, your Head Girl suddenly stops and`);
			if (canDoVaginal(slave)) {
				r.push(`pinches the ${girl}'s pussylips,`);
			} else {
				r.push(`tugs the ${girl}'s cock downward by its head,`);
			}
			r.push(
				`not painfully, but hard enough to communicate threat. ${slave.slaveName}, shocked out of ${his} pleasure, looks down at ${him2}. ${S.HeadGirl.slaveName} ${say2}s menacingly,`,
				Spoken(S.HeadGirl, `"Bitch, if you orgasm, I'm going to fucking destroy you."`),
				`Then ${he2} goes back to giving ${slave.slaveName} oral. ${slave.slaveName} begins to cry, realizing how comprehensively fucked ${he} is.`
			);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Eventually, ${he} climaxes. ${S.HeadGirl.slaveName} has a talented tongue. ${S.HeadGirl.slaveName} does not begrudge the slave ${his} pleasure,`);
			if (canDoVaginal(slave)) {
				r.push(`tonguing ${his} clit all the way through ${his} orgasm.`);
				seX(slave, "vaginal", S.HeadGirl, "oral");
			} else {
				r.push(`industriously sucking ${his} cock until ${he2}'s swallowed every last drop of cum.`);
				seX(slave, "penetrative", S.HeadGirl, "oral");
			}
			r.push(
				`${He2} stands up and seizes ${slave.slaveName} by the ear, ${say}ing,`,
				Spoken(S.HeadGirl, `"And now, slut, you are fucked."`),
				`${slave.slaveName}'s weeping stopped during ${his} climax, but now ${he} starts to <span class="trust dec">sob with terror,</span> and ${he} cries harder as your Head Girl hauls ${him} out of your office by ${his} ear. ${S.HeadGirl.slaveName} <span class="trust inc">waves cheerfully</span> to you as ${he2} leaves with ${his2} victim.`
			);
			SimpleSexAct.Slaves(slave, S.HeadGirl, 5);
			S.HeadGirl.trust += 4;
			slave.trust -= 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
