App.Events.RESSBreedingBull = class RESSBreedingBull extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.vagina > -1,
			() => V.PC.preg === 0,
			() => canGetPregnant(V.PC)
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish === Fetish.MINDBROKEN,
				s => s.career === "a breeding bull",
				s => canImpreg(V.PC, s),
				s => s.assignment === Job.MASTERSUITE,
				canPenetrate,
				s => s.dick >= 5,
				hasAllLimbs,
				s => (s.muscles > 30 || s.weight > 30)
			]
		];
	}

	get weight() {
		let weight = 1;
		if (V.PC.drugs === "fertility supplements" || V.PC.diet === "fertility") {
			weight += 2;
		}
		if (V.PC.forcedFertDrugs > 0) {
			weight += 2;
		}
		return weight;
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself, girl} = getPronouns(eventSlave);
		const {girlP, womanP} = getPronouns(V.PC).appendSuffix("P");
		const {title: Master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(`You are awakened from a sound sleep by a pair of strong hands pinning your shoulders. Struggling to get your bearings, you come face to face with the drooling`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."));
		r.push(`You had nothing planned this morning, so you've been allowed to sleep in undisturbed, and try as you might, you cannot slip your arms from under ${his} weight. ${He} hastily shifts ${his} weight around, almost giving you the chance to break free, but you freeze when something big, heavy and wet slaps against your stomach.`);
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`${He} is fully erect and dripping precum: ${he} is going to breed you!`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Push ${him} off of you`, push),
			new App.Events.Result(`Wait for a chance to escape`, wait),
			new App.Events.Result(`Call out for help`, help),
			new App.Events.Result(`Take it like a good ${girlP}`, good),
			new App.Events.Result(`Enjoy it as much as possible`, enjoy),
		]);

		function push(){
			const frag = document.createDocumentFragment();
			r = [];
			if (overpowerCheck(eventSlave, V.PC) >= random(1, 100)) {
				r.push(`You struggle underneath ${his} grip and manage to wriggle your arms free. You grab the amorous bull and effortlessly flip ${him} off of you. ${He} might be strong, but you are`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					if (V.PC.title === 0) {
						r.push(`a chiseled goddess.`);
					} else {
						r.push(`a chiseled god.`);
					}
				} else {
					r.push(`far stronger.`);
				}
				App.Events.addParagraph(frag, r);
				App.Events.addResponses(frag, [
					canDoAnal(eventSlave)
						? new App.Events.Result(`Show ${him} who's in charge`, charge, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null)
						: new App.Events.Result(),
					new App.Events.Result(`Just get ${him} out of here`, out),
				]);
			} else {
				r = [];
				r.push(`You struggle underneath ${his} grip and manage to wriggle your arms free. You push at the amorous bull and attempt to lift the heavy ${girl} off you. ${eventSlave.slaveName} takes this poorly and rams ${his} gigantic dick straight into your vagina`);
				if (V.PC.vagina === 0) {
					r.push(`<span class="virginity loss">destroying your hymen,</span>`);
					V.PC.vagina++;
				}
				r.push(`and through your cervix. You pass out from the pain.`);
				App.Events.addParagraph(frag, r);
				App.Events.addParagraph(frag, [`You awaken some time later, your crotch extremely sore and your belly slightly bloated. Most of ${his} deposit has flowed back out of you, but you still feel a fair amount sloshing inside you. You sigh to yourself, knowing you have nobody to blame but yourself for this. ${He}'s a breeding bull and you a fertile ${womanP}. ${He} only did what ${he} was conditioned for; the fault is on you for ignoring the warning signs and not taking the proper precautions. Still, there is no doubt in your mind that <span class="lime">you're pregnant</span> with ${his} child.`]);
				knockMeUp(V.PC, 100, 0, eventSlave.ID);
				seX(eventSlave, "penetrative", V.PC, "vaginal", 4);
				V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
			}
			return frag;

			function charge() {
				r = [];
				r.push(`You`);
				if (V.PC.dick === 0) {
					r.push(`grab your biggest strap-on`);
				} else {
					r.push(`stroke your growing erection`);
				}
				r.push(`as ${eventSlave.slaveName} struggles to right ${himself}, catching ${his} hips as ${he} tries to escape. You show no mercy as you force yourself into ${his}`);
				if (eventSlave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass and viciously fuck ${him} like ${he} intended to do to you. You savor the sight of your every thrust against ${his} prostate forcing spurts of precum out ${his} gigantic, throbbing erection. You pick up the pace as ${he} climaxes, soaking the sheets beneath ${him}; ${he}'s not getting out of this until you are satisfied. By the end of things, the master suite reeks of fresh cum and ${eventSlave.slaveName}'s twitching body is the center piece of ${his} semen puddle. The sheets will definitely need a changing, you note, as ${his} semi-erect cock twitches and a thick rope of jism sprays forth.`);
				r.push(VCheck.Anal(eventSlave, 5));
				return r;
			}

			function out() {
				healthDamage(eventSlave, 10);
				return `You grab ${eventSlave.slaveName} by the scruff of ${his} neck as ${he} struggles to right ${himself} and literally throw ${him} out of your room and into the hallway, where ${he} lands with a painful-sounding crash. You decide to deal with getting that mess cleaned up later; for now, you're going back to bed.`;
			}
		}

		function wait(){
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`${He} is far stronger than you expected and has you trapped in a compromising position. You've seen ${eventSlave.slaveName} fuck before; ${he}'s a quick shot, only in it to get ${his} mate pregnant. ${He} cums so hard ${he} nearly blacks out; that will be your best chance to escape ${him}. You question your choice as ${his} gigantic dick pokes at your crotch, eager to find the egg at the end of the tunnel. ${He} lacks even the basic understanding of foreplay, you realize, as ${he} drives ${his} cock deep into your`);
			if (V.PC.vagina === 0) {
				r.push(`pussy, <span class="virginity loss">destroying your hymen on the way.</span>`);
				V.PC.vagina++;
			} else {
				r.push(`pussy.`);
			}
			r.push(`You groan with pain at the sheer size of the rod stretching out your poor hole and struggle to hold back the tears once ${he} starts thrusting. There is no pleasure for you here as ${he} batters your cervix; should ${he} force through it, you may not be able to throw ${him} off. With a loud grunt, ${he} does just that. ${He} may be deep seated now, but you aren't going to give up. You feel ${him} tense up; now's your chance! As ${he} climaxes, you slip a leg around ${his} side and push ${him} with all your might. ${He} flops over, pulling out as ${he} spurts ${his} massive load and nailing you right in the face. You spit the jism out of your mouth and quickly restrain the dribbling bull.`);
			App.Events.addParagraph(frag, r);
			App.Events.addParagraph(frag, [`Panting, you look over the damage: Your pussy is gaping, there is semen everywhere, and given the steady flow from you, ${he} likely got some of that ejaculation in you. You sigh to yourself, knowing you have nobody to blame but yourself for this. ${He}'s a breeding bull and you, a fertile ${womanP}. ${He} only did what ${he} was conditioned for; the blame is on you for ignoring the warning signs and not taking the proper precautions. Still, ${he} knew you were fertile and went right for the prize; it would be wise to assume you've been impregnated.`]);
			knockMeUp(V.PC, 20, 0, eventSlave.ID);
			seX(eventSlave, "penetrative", V.PC, "vaginal");
			V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
			return frag;
		}

		function help(){
			r = [];
			r.push(`${He} is far stronger than you expected and has you trapped in a compromising position; you shout out for`);
			if (S.Bodyguard) {
				r.push(S.Bodyguard.slaveName);
			} else if (S.Concubine && canWalk(S.Concubine)) {
				r.push(S.Concubine.slaveName);
			} else {
				r.push(`somebody`);
			}
			r.push(`to help you. You've seen ${eventSlave.slaveName} fuck before; ${he}'s a quick shot, only in it to get ${his} mate pregnant. You question if anyone is coming as ${his} gigantic dick pokes at your crotch, eager to find the egg at the end of the tunnel. ${He} lacks even the basic understanding of foreplay, you realize, as ${he} drives ${his} cock deep into your`);
			if (V.PC.vagina === 0) {
				r.push(`pussy, <span class="virginity loss">destroying your hymen on the way.</span>`);
				V.PC.vagina++;
			} else {
				r.push(`pussy.`);
			}
			V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
			r.push(`You groan with pain at the sheer size of the rod stretching out your poor hole and struggle to hold back the tears once ${he} starts thrusting. There is no pleasure for you here as ${he} batters your cervix; you barely stop yourself from screaming out as ${he} slams through your final defense`);
			if (S.Bodyguard) {
				const {his2} = getPronouns(S.Bodyguard).appendSuffix("2");
				r.push(`and gets tackled off of you by ${S.Bodyguard.slaveName}. After a quick tussle, the amorous cow is restrained and leaking cum on your floor. You sigh to yourself, knowing you have nobody to blame but yourself for this. ${He}'s a breeding bull and you a fertile ${womanP}. ${He} only did what ${he} was conditioned for; the fault is on you for ignoring the warning signs and not taking the proper precautions. ${S.Bodyguard.slaveName} is visibly disturbed by an assault on you happening within ${his2} defensive perimeter and <span class="devotion inc">vows</span> to not allow it to happen again.`);
				S.Bodyguard.devotion += 2;
			} else if (S.Concubine && canWalk(S.Concubine)) {
				r.push(`and gets tackled off of you by ${S.Concubine.slaveName}. After a violent struggle, the amorous cow is restrained and leaking cum on your floor. You sigh to yourself, knowing you have nobody to blame but yourself for this. ${He}'s a breeding bull and you a fertile ${womanP}. ${He} only did what ${he} was conditioned for; the fault is on you for ignoring the warning signs and not taking the proper precautions. ${S.Concubine.slaveName} is <span class="trust dec">visibly shaken</span> by the assault and was <span class="health dec">badly beaten</span> by the muscular slave during the fight.`);
				S.Concubine.trust -= 5;
				healthDamage(S.Concubine, 40);
			} else {
				r.push(`and cums directly into your exposed womb. ${He} backs off, possibly startled by the shouting, giving you the chance to slip away to safety. You sigh to yourself, knowing you have nobody to blame but yourself for this. ${He}'s a breeding bull and you a fertile ${womanP}. ${He} only did what ${he} was conditioned for; the fault is on you for ignoring the warning signs and not taking the proper precautions. Still, ${he} knew you were fertile and went right for the prize; it would be wise to assume ${he}'s done ${his} job well.`);
				r.push(knockMeUp(V.PC, 50, 0, eventSlave.ID));
				seX(eventSlave, "penetrative", V.PC, "vaginal");
			}
			return r;
		}

		function good(){
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`${He} is far stronger than you expected and has you trapped in a compromising position. You've seen ${eventSlave.slaveName} fuck before; ${he}'s a quick shot, only in it to get ${his} mate pregnant. You question what you are thinking as ${his} gigantic dick pokes at your crotch, eager to find the egg at the end of the tunnel. ${He} lacks even the basic understanding of foreplay, you realize, as ${he} drives ${his} cock deep into your`);
			if (V.PC.vagina === 0) {
				r.push(`pussy, <span class="virginity loss">destroying your hymen on the way.</span>`);
				V.PC.vagina++;
			} else {
				r.push(`pussy.`);
			}
			r.push(`You groan with pain at the sheer size of the rod stretching out your poor hole and struggle to hold back the tears once ${he} starts thrusting. There is no pleasure for you here as ${he} batters your cervix; you barely stop yourself from screaming out as ${he} slams through your final defense and cums directly into your exposed womb`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You immediately realize you've made a mistake; you feel full already and ${he}'s still cumming. You watch in horror as your belly steadily swells with seed, unable to flow out thanks to your obstructed cunt. ${eventSlave.slaveName} grunts as ${he} pushes out the last of ${his} load before pulling out and releasing you. You try to get up, but the experience has left you drained, so you are left hoping that ${his} instincts tell ${him} ${he}'s done ${his} job. ${He} lowers ${his}`);
			if (canSmell(eventSlave)) {
				r.push(`nose to your violated pussy and sniffs`);
			} else {
				r.push(`face to your violated pussy to feel the heat emanating from it`);
			}
			r.push(`unsatisfied, ${he} moves back into position to properly seed you this time. You black out as ${his} second load joins the first, only to awaken sometime later`);
			if (S.Concubine && S.Concubine.fetish !== Fetish.MINDBROKEN) {
				const {his2, He2, him2} = getPronouns(S.Concubine).appendSuffix("2");
				r.push(`with ${S.Concubine.slaveName} trying ${his2} best to drain your swollen belly.`);
				if (canTalk(S.Concubine)) {
					r.push(Spoken(S.Concubine, `"I'm so sorry ${Master}... I stepped out for a minute and this happens."`));
					r.push(`You ask what happened to ${eventSlave.slaveName}.`);
					r.push(Spoken(S.Concubine, `"${He}'s bound and gagged now, ${he} won't hurt you anymore. But what are you going to do with that belly? I won't tell anyone what happened, but we've got to get rid of it."`));
				} else {
					r.push(`${He2} gestures ${his2} apologies and points to the bound and gagged ${eventSlave.slaveName}, before expressing ${his2} concerns about your visible state.`);
				}
				r.push(`You do your best to calm ${him2} down; this is your fault after all. ${eventSlave.slaveName}'s a breeding bull and you a fertile ${womanP}. ${He} only did what ${he} was conditioned for; the blame is on you for ignoring the warning signs and not taking the proper precautions. Still, there is no doubt in your mind that <span class="lime">you're pregnant</span> with ${his} child. As for the belly, it'll go down soon, you're sure.`);
			} else if (S.Bodyguard) {
				const {his2, He2, him2} = getPronouns(S.Bodyguard).appendSuffix("2");
				r.push(`with ${S.Bodyguard.slaveName} sobbing over your swollen belly.`);
				if (canTalk(S.Bodyguard)) {
					r.push(Spoken(S.Bodyguard, `"I'm so sorry ${Master}... I stepped out for a minute and this happens."`));
					r.push(`You ask what happened to ${eventSlave.slaveName}.`);
					r.push(Spoken(S.Bodyguard, `"${He}'s bound and gagged now, ${he} won't hurt you again."`));
					r.push(`${He2} sniffles,`);
					r.push(Spoken(S.Bodyguard, `"But please punish me too. This is all my fault."`));
				} else {
					r.push(`${He2} gestures ${his2} apologies and points to the bound and gagged ${eventSlave.slaveName}, before begging you to punish ${him2} too for ${his2} failures as your guardian.`);
				}
				r.push(`You do your best to calm ${him2} down; this is your fault after all. ${eventSlave.slaveName}'s a breeding bull and you, a fertile ${womanP}. ${He} only did what ${he} was conditioned for; the blame is on you for ignoring the warning signs and not taking the proper precautions. Still, there is no doubt in your mind that <span class="lime">you're pregnant</span> with ${his} child.`);
			} else {
				r.push(`to ${eventSlave.slaveName} snoring beside you, ${his} massive cock soft and slightly drooling cum. Most of ${his} deposit has flowed back out of you, but you're still heavy with sperm. You sigh to yourself, knowing you have nobody to blame but yourself for this. ${He}'s a breeding bull and you a fertile ${womanP}. ${He} only did what ${he} was conditioned for; the fault is on you for ignoring the warning signs and not taking the proper precautions. Still, there is no doubt in your mind that <span class="lime">you're pregnant</span> with ${his} child.`);
			}
			knockMeUp(V.PC, 100, 0, eventSlave.ID);
			seX(eventSlave, "penetrative", V.PC, "vaginal", 4);
			App.Events.addParagraph(frag, r);
			V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
			return frag;
		}

		function enjoy(){
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You know what is going to happen and your breath quickens as you already anticipate the good and proper breeding ${he} is going to grant you. You're going to get pregnant and you want it. Your hands on your side, you're pinned under a breeding bull and ${he} has the tool to fill you and the sperm to fertilize your every ready egg. You're a human with almost unlimited power, yet all you crave now is the cock entering you and the babies you're going to have. You scream out in pain at first as ${eventSlave.slaveName} slams ${his} shaft into you with full force`);
			if (V.PC.vagina === 0) {
				r.push(`<span class="virginity loss">destroying your hymen on the way,</span>`);
				V.PC.vagina++;
			}
			r.push(`and begins pounding right away. Eager to get as much enjoyment out of it as you can you start bucking back almost immediately, screaming out loud your pleasure and pain at the same time. Miraculously, your pussy moistens as on cue, lessening your discomfort to a minimum and granting you as much pleasure as is physically possible in a state you're in. The sounds of brutal flesh on flesh slapping fill the room as the breeding bull claims ${his} cow completely, until at last ${he} is ready to seed you, having long penetrated your cervix. ${He} starts filling your womb as you quiver and moan in pleasure, pain and anticipation.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Tears stream down your face from the pain your body is experiencing, from having your wish for a pregnancy filled so suddenly and so violently and of the pleasure you're feeling. ${eventSlave.slaveName} is still cumming in you and you smile as you feel your womb expanding from the amount of ejaculate being pumped into you. ${He} is grunting and huffing as ${he} pushes the last spurts of cum into you.`);
			r.push(`You don't want to let ${him} go yet and planting tender kisses on ${his} lips you manage to gather enough energy to start massaging ${his} dick with your pussy. ${eventSlave.slaveName} takes the queue and starts pounding you again, as you ravish ${his} mouth with your lips and moan lewdly and loudly to grunt your approval. This continues for a while until ${eventSlave.slaveName} hilts ${himself} in you, penetrates your cervix again to deposit another load into your womb. What started a half an hour ago like an assault has turned into a ferocious fucking session between you and your breeding bull, if anyone saw you now, they wouldn't even guess it wasn't you who initiated it. As ${he} starts cumming once more, you finally black out, exhausted and in bliss as ${he} deposits god knows how many more massive loads into you while you're unconscious.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`When you finally wake up, your arm and leg are draped over ${eventSlave.slaveName}. The breeding bull is snoring loudly, ${his} cock still stuck between your folds, you both laying on the bed, cuddling after this fierce lovemaking. Nobody has disturbed you though and after checking that you're not in queue for anything you decide to exact a sweet and juicy revenge on ${eventSlave.slaveName}, you move your hips towards ${him} to catch ${his} attention. Before you can even start to realize what you might have done, ${eventSlave.slaveName} pounces on you again and stuffs ${his} massive brick into you with one smooth and powerful thrust. This time you start fucking ${him} in earnest and after a while you're both cumming. You scream out loud and long in pleasure as another massive load fills your womb to its limit and cum gushes out between your pussy lips and ${eventSlave.slaveName}'s cock. You're completely filled and there's no room for more.`);
			r.push(`You know full well by now that ${eventSlave.slaveName} the breeding bull has done ${his} job properly, sensed that you're a fertile ${womanP} and claimed you. You sigh deeply and contentedly as you work to come to terms with the fact that <span class="lime">you're pregnant</span> with ${eventSlave.slaveName}'s child. In the end, sleep overtakes you and you rest for a couple of hours.`);
			r.push(`Later when you wake, you snuggle up closer to the mindless fuckbeast and through the haze of the rough pounding you received a few hours ago and the cum still sloshing within your womb, you try to wrap your brain around the fact that you practically got raped by a fucktoy and enjoyed it. At least if anyone is going to have anything to say about your and ${eventSlave.slaveName}'s offspring, you can confidently say that in the end you granted your full approval to this impregnation, regardless of who was on the top.`);
			knockMeUp(V.PC, 100, 0, eventSlave.ID);
			seX(eventSlave, "penetrative", V.PC, "vaginal", 10);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
