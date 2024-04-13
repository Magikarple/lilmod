App.Events.pessWorriedHeadgirl = class pessWorriedHeadgirl extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.week > 20,
			() => !!S.HeadGirl,
			() => S.HeadGirl.devotion > 95,
			() => S.HeadGirl.trust > 95,
			() => S.HeadGirl.intelligence + S.HeadGirl.intelligenceImplant > 50
		];
	}

	execute(node) {
		const {
			He, His,
			he, his, him, himself, girl, woman, hers
		} = getPronouns(S.HeadGirl);
		const {title:Master} = getEnunciation(S.HeadGirl);

		App.Events.drawEventArt(node, S.HeadGirl);

		App.Events.addParagraph(node, [
			`Your Head Girl`,
			App.UI.DOM.slaveDescriptionDialog(S.HeadGirl),
			`comes to find you for a routine meeting at the end of the day, and finds your office empty. You're out on its balcony, looking out into the night from the immense height of the arcology's uppermost levels. ${He} comes outside to meet you, notices your reverie, and follows your gaze. Out there, most of the way to the horizon, there's a lightshow underway. In more peaceful times it might have been mistaken for fireworks, but it's not.`
		]);
		App.Events.addParagraph(node, [
			`As the two of you stand there watching, strings of red lights begin to trace lines up into the sky. The guns are manually aimed, to go by their jerky arcs of fire, and they're hopelessly ineffective. Their target comes and goes, unseen and unheard at this distance, the only evidence of its passage a flash of light from the target area followed by a low thump that takes a long time to reach you. The commotion is outside the Free City your arcology is part of, and is of little concern: just a minor dispute of the kind becoming more and more common outside your island of safety and security.`
		]);
		let r = [];
		r.push(`You notice a warmth at your side. ${S.HeadGirl.slaveName} has edged a bit closer to you, and shivers as you glance at ${him}. ${He} crosses ${his} arms`);
		if (S.HeadGirl.boobs > 3000) {
			r.push(`under ${his} massive tits, lifting them a bit as ${he} snuggles ${his} arms into the warm cavern they create against ${his} stomach.`);
		} else if (S.HeadGirl.boobs > 1000) {
			r.push(`over ${his} big boobs, pressing them a bit flatter against ${his} chest as ${he} hugs ${himself}.`);
		} else if (S.HeadGirl.boobs > 400) {
			r.push(`over ${his} breasts, pressing them against ${his} chest as ${he} hugs ${himself}.`);
		} else {
			r.push(`over ${his} chest, hugging ${his} own shoulders and rocking back and forth a little.`);
		}
		r.push(
			Spoken(S.HeadGirl, `"It's very bad out there, isn't it, ${Master}."`),
			`It isn't really a question, but you nod.`,
			Spoken(S.HeadGirl, `"I'm glad I'm here with you,"`),
			`${he} continues,`,
			Spoken(S.HeadGirl, `"and I would be even if I didn't love you."`),
			`${He} nestles in closer to you,`
		);
		if (S.HeadGirl.height >= 185) {
			r.push(`the tall`);
			if (S.HeadGirl.physicalAge > 30) {
				r.push(`${woman}'s`);
			} else {
				r.push(`${girl}'s`);
			}
			r.push(`shoulder brushing against yours.`);
		} else if (S.HeadGirl.hips > 1) {
			r.push(`${his} broad, motherly hips brushing against your thigh.`);
		} else {
			r.push(`the shorter`);
			if (S.HeadGirl.physicalAge > 30) {
				r.push(`${woman}`);
			} else {
				r.push(`${girl}`);
			}
			r.push(`fitting neatly against your side.`);
		}
		r.push(Spoken(S.HeadGirl, `"${Master}, I don't know if the other slaves know how lucky they are, to be safe here."`));
		App.Events.addParagraph(node, r);


		App.Events.addResponses(node, [
			new App.Events.Result(`Trust ${him} to tell them`, trust),
			new App.Events.Result(`${He}'s more important`, important)
		]);

		function trust() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You tell ${him} that you're sure ${he}'ll let them know, since ${he} understands the situation and knows them all well. ${His}`);
			if (S.HeadGirl.visualAge > 35) {
				r.push(`mature`);
			} else if (S.HeadGirl.face > 40) {
				r.push(`lovely`);
			} else {
				r.push(`attentive`);
			}
			r.push(`face flicks`);
			if (S.HeadGirl.height >= 185) {
				r.push(`over`);
			} else {
				r.push(`up`);
			}
			r.push(`to look at you, <span class="devotion inc">${his} ${App.Desc.eyesColor(S.HeadGirl)} glittering at the compliment.</span> "Thank you, ${Master}," ${he} murmurs. There's another flash on the horizon, followed by a series of smaller flashes and a low, slowly growing glow as secondaries go off and start a fire. ${S.HeadGirl.slaveName} seems affected, a certain amount of moisture gathering in ${his} eyes, but ${he} turns away to return to ${his} duties when it becomes clear that you intend to keep watching for a while, and aren't going to have sex with ${him} right this minute. ${He} does ${his} best to communicate the new reality to those of your slaves who are obedient enough to understand the truth: though they are slaves, <span class="trust inc">there is safety to be found in slavery.</span>`);
			for (const slave of V.slaves) {
				if (slave.devotion > 20) {
					slave.trust += 1;
				}
			}
			S.HeadGirl.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function important() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You shift to stand behind ${him}, your`);
			if (V.PC.boobs >= 300) {
				r.push(`breasts`);
				if (V.PC.boobsImplant > 0) {
					r.push(`firm`);
				} else {
					r.push(`soft`);
				}
				r.push(`and sensual`);
			} else {
				r.push(`chest hard and masculine`);
			}
			r.push(`but not insistently sexual against ${his}`);
			if (S.HeadGirl.muscles > 30) {
				r.push(`muscular`);
			} else if (S.HeadGirl.weight > 10) {
				r.push(`soft`);
			} else {
				r.push(`warm`);
			}
			r.push(`back. You wrap your arms around ${him}, over ${his} own, each of your`);
			if (V.PC.title === 1) {
				r.push(`strong`);
			} else {
				r.push(`feminine`);
			}
			r.push(`hands finding and clasping one of ${hers}.`);
			if (S.HeadGirl.boobs > 3000) {
				r.push(`${His} incredible boobs rest heavily over the top of both of your arms.`);
			}
			r.push(`${He} knows you very well, and shifts ${his} torso ever so slightly from side to side, snuggling in a little closer to you to let you know ${he}'s comfortable and available without being demanding or needy. You speak quietly, your voice a reassuring`);
			if (V.PC.boobs === 0) {
				r.push(`rumble`);
			} else {
				r.push(`hum`);
			}
			r.push(`${he} feels against ${his} back${canHear(S.HeadGirl) ? " as well as hears" : ""}. You let ${him} know that ${he} has a place with you, and ${he} always will. You let ${him} know that you're worried too, and that you don't know what the future will bring. But you do know that ${he}'ll be by your side as you meet it. A silent shake in the pretty`);
			if (S.HeadGirl.physicalAge > 30) {
				r.push(`${woman}`);
			} else {
				r.push(`${girl}`);
			}
			r.push(
				`you've got in your arms is your only indication that <span class="mediumaquamarine">${he}'s crying a little</span> as ${he} whispers,`,
				Spoken(S.HeadGirl, `"Thank you, ${Master}. I'll do my best."`)
			);
			S.HeadGirl.trust += 5;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
