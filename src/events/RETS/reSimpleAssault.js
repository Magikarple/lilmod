// cSpell:ignore mhhh

App.Events.RETSSimpleAssault = class RETSSimpleAssault extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.universalRulesConsent === 0
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.rules.release.slaves !== 0,
				hasAnyArms,
				canStand,
				canTalk,
				canPenetrate,
				s => s.devotion > 50
			],
			[ // and her sub
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				canTalk,
				isSlaveAvailable,
				s => s.relationship <= 2 || s.relationshipTarget !== this.actors[0],
				s => (canDoAnal(s) && s.anus !== 0) || (canDoVaginal(s) && s.vagina !== 0),
				s => s.devotion < 20,
				s => s.belly < 2000,
				s => s.skill.combat <= 30,
				s => s.muscles <= 30
			]
		];
	}

	execute(node) {
		const [domSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(domSlave);
		const {
			He2, he2, His2, his2, him2
		} = getPronouns(subSlave).appendSuffix("2");
		const {say, title: Master} = getEnunciation(domSlave);
		const {title: Master2} = getEnunciation(subSlave);
		const desc = SlaveTitle(domSlave);
		const PC = V.PC;

		const vaginal = subSlave.vagina !== 0 && canDoVaginal(subSlave);

		App.Events.drawEventArt(node, [domSlave, subSlave], ["no clothing", subSlave.clothes]);

		let t = [];

		t.push(`You round a corner and almost trip over`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, domSlave, true), "."));
		t.push(`${He}'s on top of another slave, humping away; ${his}`);
		if (domSlave.butt > 8) {
			t.push(`monstrous, naked ass jiggles lewdly`);
		} else if (domSlave.anus > 2) {
			t.push(`loose asspussy winks lewdly`);
		} else if (domSlave.muscles > 30) {
			t.push(`heavily muscled butt flexes powerfully`);
		} else if (domSlave.butt > 3) {
			t.push(`big butt pumps energetically`);
		} else {
			t.push(`nice little butt flexes cutely`);
		}
		t.push(`as ${he} thrusts. You can't see much of the slave ${vaginal ? `lying on ${his2} back` : "face-down"} underneath ${domSlave.slaveName}, but you recognize ${him2} as`);
		t.push(contextualIntro(domSlave, subSlave, true));
		t.push(`by ${his2} sobbing. ${He2}'s struggling a little, but ${domSlave.slaveName} has ${him2} pinned to the floor by ${his2} ${hasBothArms(subSlave) ? "wrists" : "wrist"}, and ${domSlave.slaveName} is quickly raping the resistance out of the ${SlaveTitle(subSlave)}.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${domSlave.slaveName} senses your presence above and behind ${him}, and twists ${his} ${domSlave.hColor} head around to ${canSee(domSlave) ? `see who it is. ${He} sees that it's you` : `discern who it is. ${He} realizes that it's you`}, and greets you cheerfully. "${Spoken(domSlave, `Hi, ${Master}`)}," ${he} trills.`);
		if (domSlave.fetishKnown && domSlave.fetish === "sadist") {
			t.push(`"${Spoken(domSlave, `This is so awesome`)}," the sadistic ${desc} gushes. "${Spoken(domSlave, `The crying, the struggling. Thank you for letting us do this`)}."`);
		} else if (domSlave.fetishKnown && domSlave.fetish === "dom") {
			t.push(`"${Spoken(domSlave, `The crying almost makes me feel bad, but fucking a bitch feels so, so good`)}," the dominant ${desc} admits conversationally.`);
		} else if (domSlave.fetishKnown && domSlave.fetish === "pregnancy" && vaginal && canImpreg(subSlave, domSlave)) {
			t.push(`"${Spoken(domSlave, `I couldn't help myself`)}," the ${desc} admits. "${Spoken(domSlave, `${He2}'d look so pretty with a pregnant belly and I just couldn't resist giving ${him2} one. ${He2} tried to say ${he2} didn't want to be a mother, so...`)}"`);
		} else if (domSlave.energy > 95) {
			t.push(`"${Spoken(domSlave, `I can't help myself`)}," the nymphomaniac ${desc} admits breathlessly. "${Spoken(domSlave, `Thank you for letting me take what I need from the other girls`)}."`);
		} else if (domSlave.energy > 60) {
			t.push(`"${Spoken(domSlave, `I couldn't help myself`)}," the ${desc} admits. "${Spoken(domSlave, `I was really, really horny and ${he2} was just, um, there. And ${he2} tried to say no`)}."`);
		} else {
			t.push(`"${Spoken(domSlave, `I know it's not like me`)}," the ${desc} admits. "${Spoken(domSlave, `But I asked ${him2}, like, mostly joking, and ${he2} tried to say no`)}."`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${subSlave.slaveName} ${vaginal ? `looks out from under ${domSlave.slaveName}` : `turns ${his2} head`} and ${canSee(subSlave) ? "looks at" : "faces"} you too. "${Spoken(subSlave, `${Master2}, please`)}," ${he2} begs. "${Spoken(subSlave, `P-please, make ${him} s-stop — mhhh —`)}" ${domSlave.slaveName} shuts ${him2} up by ${vaginal ? `kissing ${his2} unwilling mouth` : `shoving ${his2} face back against the floor`}. Once ${he} has ${subSlave.slaveName} back under control, ${domSlave.slaveName} slows ${his} thrusting, reaches around behind ${himself}, and ${domSlave.vagina !== 0 && canDoVaginal(domSlave) ? `spreads ${his} futa pussy for you` : `pulls one asscheek aside to offer you ${his} anus. To make the offer extra clear, ${he} starts winking it lewdly`}.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`"${Spoken(domSlave, `Please fuck me while I rape ${him2}, ${Master}`)}," ${domSlave.slaveName} ${say}s in a mockery of ${subSlave.slaveName}'s `);
		if (subSlave.voice > 2) {
			t.push(`high-pitched whining.`);
		} else if (subSlave.voice > 1) {
			t.push(`begging.`);
		} else {
			t.push(`deep-voiced begging.`);
		}
		t.push(`"${Spoken(domSlave, `Ooh, or, please, ${Master}, may I flip ${him2} over? I'd love to feel ${PC.dick ? `your cock inside ${him2} alongside mine` : `that strap-on you use inside ${him2} alongside my cock`}`)}!"`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`"${Spoken(subSlave, `Please, no`)}," sobs ${subSlave.slaveName}.`);
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			((canDoAnal(domSlave) && domSlave.anus !== 0) || (canDoVaginal(domSlave) && domSlave.vagina !== 0)
				? new App.Events.Result("Slide in behind", behind)
				: new App.Events.Result()
			),
			new App.Events.Result("Slide in alongside", alongside),
			new App.Events.Result("Put a stop to it", stop)
		]);

		function behind() {
			t = [];

			t.push(`You order ${domSlave.slaveName} to go back to what ${he} was doing. ${He}'s a little disappointed you're not joining in, but ${he} obeys, pounding the crying ${subSlave.slaveName} without mercy. Then ${domSlave.slaveName} feels the head of ${PC.dick ? "your dick" : "a strap-on"} brush ${his} butt. "Ooh!" ${he} squeals, <span class="hotpink">pleased ${he} was wrong after all.</span> "${Spoken(domSlave, `Yes, thank you, ${Master}! Fuck me! Fuck me while I rape ${him2}!`)}" Underneath ${him}, ${subSlave.slaveName} cries harder, even though ${domSlave.slaveName} has to stop ${his} thrusting for a moment to let you inside. In fact, you reflect as you hammer ${domSlave.slaveName}'s`);
			if (domSlave.vagina !== 0 && canDoVaginal(domSlave)) {
				if (domSlave.vagina > 2) {
					t.push(`roomy`);
				} else if (domSlave.vagina > 1) {
					t.push(`delectable`);
				} else {
					t.push(`tight little`);
				}
				t.push(`cunt,`);
			} else {
				if (domSlave.anus > 2) {
					t.push(`gaping`);
				} else if (domSlave.anus > 1) {
					t.push(`relaxed`);
				} else {
					t.push(`poor little`);
				}
				t.push(`asspussy,`);
			}
			t.push(`it's a little strange that ${subSlave.slaveName} <span class="gold">seems to think this is worse</span> than just being raped by ${domSlave.slaveName}. After all, having your ${PC.dick ? "turgid cock" : "formidable strap-on"} sliding energetically in and out of ${his} ${domSlave.vagina !== 0 && canDoVaginal(domSlave) ? "womanhood" : "rectum"} is cramping ${domSlave.slaveName}'s style a bit. Maybe it's that ${subSlave.slaveName} is a little squashed under there.`);

			domSlave.devotion += 4;
			subSlave.trust -= 4;
			if (domSlave.vagina !== 0 && canDoVaginal(domSlave)) {
				seX(domSlave, "vaginal", PC, "penetrative");
				if (canImpreg(domSlave, PC)) {
					knockMeUp(domSlave, 5, 0, -1);
				}
			} else {
				seX(domSlave, "anal", PC, "penetrative");
				if (canImpreg(domSlave, PC)) {
					knockMeUp(domSlave, 5, 1, -1);
				}
			}
			if (vaginal) {
				seX(subSlave, "vaginal", domSlave, "penetrative");
				if (canPenetrate(domSlave) && canImpreg(subSlave, domSlave)) {
					knockMeUp(subSlave, 5, 0, domSlave.ID);
				}
			} else {
				seX(subSlave, "anal", domSlave, "penetrative");
				if (canPenetrate(domSlave) && canImpreg(subSlave, domSlave)) {
					knockMeUp(subSlave, 5, 1, domSlave.ID);
				}
			}
			return t;
		}

		function alongside() {
			const fit = vaginal ? subSlave.vagina > 2 : subSlave.anus > 2;
			t = [];

			t.push(`You order ${domSlave.slaveName} to flip ${subSlave.slaveName} over and let you in too. Just as you expected, ${domSlave.slaveName} responds with a vicious giggle, and ${subSlave.slaveName} cries even harder. "${Spoken(subSlave, `Please!`)}" ${he2} screams. "${Spoken(subSlave, `${Master2}, it'll hurt! Please don't!`)}"`);
			if (fit) {
				t.push(`It's not clear what ${he2}'s so worked up about. ${His2} cavernous ${vaginal ? "cunt" : "asshole"} should be able to take two dicks without trouble.`);
			} else {
				if (domSlave.dick < 5) {
					t.push(`It's not clear what ${he2}'s so worked up about. ${PC.dick ? "You're quite large" : "You use a big strap-on"}, but ${domSlave.slaveName}'s penis is reasonably sized. It's not like ${subSlave.slaveName}'s ${vaginal ? "cunt" : "asshole"} is going to be permanently damaged or anything.`);
				} else {
					t.push(`${He2}'s right to be concerned. ${PC.dick ? "You're quite large" : "You use a big strap-on"}, and ${domSlave.slaveName}'s penis is huge too. ${subSlave.slaveName}'s ${vaginal ? "cunt" : "asshole"} is in serious peril.`);
				}
			}
			t.push(`${domSlave.slaveName} pulls out, sits ${his} bare butt down on the floor, and hauls a struggling ${subSlave.slaveName} onto ${his} lap, shoving ${his} stiff prick back where it belongs. Then ${domSlave.slaveName} hauls ${subSlave.slaveName}'s legs back, offering you ${his2} already-occupied hole. ${subSlave.vagina !== 0 && vaginal ? `${subSlave.slaveName} has another hole, and ${he2} tearfully begs you to use it, but in vain.` : ""}`);
			t.push(`You jam yourself inside, enjoying ${subSlave.slaveName}'s ${!fit ? `wriggling and the extreme tightness of ${his2} overfilled insides. ${He2} spasms with pain as you force your way inside ${him2}` : "wriggling"}. ${domSlave.slaveName} can't thrust much from where ${he} is, and serves mostly to tighten ${subSlave.slaveName} for you, but ${he} ${canSee(domSlave) ? "stares into your eyes lovingly" : "lovingly smiles at you"}. Playing such an equal sexual role with you definitely <span class="mediumaquamarine">builds ${his} trust</span> in ${his} role. For ${his2} part, ${subSlave.slaveName} is <span class="gold">thoroughly degraded,</span> ${fit ? "but physically unhurt." : `and <span class="orange">stretched out.</span>`}`);

			domSlave.trust += 4;
			subSlave.trust -= 4;
			if (vaginal) {
				seX(subSlave, "vaginal", domSlave, "penetrative");
				if (canImpreg(domSlave, PC)) {
					knockMeUp(domSlave, 5, 0, -1);
				}
				if (canPenetrate(domSlave) && canImpreg(subSlave, domSlave)) {
					knockMeUp(subSlave, 5, 0, domSlave.ID);
				}
			} else {
				seX(subSlave, "anal", domSlave, "penetrative");
				if (canImpreg(domSlave, PC)) {
					knockMeUp(domSlave, 5, 1, -1);
				}
				if (canPenetrate(domSlave) && canImpreg(subSlave, domSlave)) {
					knockMeUp(subSlave, 5, 1, domSlave.ID);
				}
			}
			if (!fit) {
				if (vaginal) {
					subSlave.vagina++;
				} else {
					subSlave.anus++;
				}
			}
			return t;
		}

		function stop() {
			t = [];

			t.push(`You order ${domSlave.slaveName} to stop raping ${subSlave.slaveName}.
			"${Spoken(domSlave, `Yes, ${Master}`)}," ${he} ${say}s automatically, and gets up, pulling ${his} dick out of ${subSlave.slaveName}'s poor ${vaginal ? "pussy" : "asshole"}. ${domSlave.slaveName} doesn't understand, and ${his} prick softens quickly with ${his} confusion. ${He} thought ${he} didn't need consent to fuck other slaves, and ${he} <span class="gold">doubts ${himself}.</span>`);
			App.Events.addParagraph(node, t);
			t = [];

			t.push(`${subSlave.slaveName} gets to ${his2} feet too, using a hand to massage ${his2} outraged hole. "${Spoken(subSlave, `Thank you, ${Master2}, thank you`)}," ${he2} repeats over and over, <span class="mediumaquamarine">weeping with relief.</span>`);
			App.Events.addParagraph(node, t);
			t = [];

			domSlave.trust -= 4;
			subSlave.trust += 4;
			if (vaginal) {
				seX(subSlave, "vaginal", domSlave, "penetrative");
			} else {
				seX(subSlave, "anal", domSlave, "penetrative");
			}
			return t;
		}
	}
};
