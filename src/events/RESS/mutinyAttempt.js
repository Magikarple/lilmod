App.Events.RESSMutinyAttempt = class RESSMutinyAttempt extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.vagina > -1
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canSee,
				canWalk,
				s => s.devotion <= 20,
				s => ((s.trust >= -20 && s.behavioralFlaw === "arrogant") || s.trust > 20),
				s => s.muscles > 30,
				s => s.health.condition > 20,
				s => s.energy > 50,
				canPenetrate
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const hands = hasBothArms(eventSlave) ? "hands" : "hand";
		const dick = V.PC.dick !== 0 ? "dick" : "strap-on";

		App.Events.drawEventArt(node, eventSlave);
		let mutinyAttempted = true;

		let r = [];
		r.push(`Finishing your work, you lean back for a well-deserved break. Your peace is quickly disturbed by several loud smashes from down the penthouse hall. As you get up from your desk, you hear somebody running down the hallway, and before you know it,`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`is inside. ${He} is looking quite treacherous and`);
		if (eventSlave.skill.combat > 30) {
			r.push(`relatively confident.`);
		} else {
			r.push(`somewhat unsure.`);
		}
		r.push(`${He} quickly reaches in to grab you,`);
		if (V.PC.career === "gang") {
			if (V.personalArms !== 0) {
				r.push(`but when you point your handgun towards ${him}, ${he} stutters back with ${his} ${hands} pointing upwards.`);
			} else {
				r.push(`but you just have to reach for your trusty handgun to make the slave step back in fear.`);
			}
			mutinyAttempted = false;
		} else if (V.PC.career === "street urchin") {
			r.push(`but you slash at ${him} with your trusted knife, catching ${him} off guard and leaving a nasty gash. Before ${he} recovers ${his} senses, you make sure to have your knife to ${his} throat.`);
			mutinyAttempted = false;
			App.Medicine.Modification.addScar(eventSlave, either("left shoulder", "right shoulder", "back", "lower back", "belly", "left buttock", "right buttock"), "generic");
		} else if (V.PC.career === "mercenary" || V.PC.career === "recruit") {
			if (V.personalArms !== 0) {
				r.push(`but you quickly draw the weapon you always keep close at hand, forcing the slave to put ${his} ${hands} on the back of ${his} head.`);
			} else {
				r.push(`but you quickly grab ${his} arm, pull it towards you and lock it in ${his} back, pushing ${him} over the desk.`);
			}
			mutinyAttempted = false;
		} else if (isPCCareerInCategory("escort")) {
			r.push(`but you simply give ${him} a kick to the groin; ${he} wouldn't be the first person to try this shit on you.`);
			mutinyAttempted = false;
		} else if ((V.PC.career === "slaver" || V.PC.career === "slave overseer") || V.PC.skill.slaving >= 20) {
			r.push(`but you simply give ${him} a kick to the groin, a little trick you remember from your early days on how to deal with rebellious slaves.`);
			mutinyAttempted = false;
		} else if (V.PC.skill.warfare >= 20) {
			r.push(`but you have no problem grabbing ${him} and pushing ${him} to the ground, grabbing`);
			if (hasBothArms(eventSlave)) {
				r.push(`both of`);
			}
			r.push(`${his}`);
			if (hasBothArms(eventSlave)) {
				r.push(`arms`);
			} else {
				r.push(`arm`);
			}
			r.push(`to make sure ${he} doesn't try to step up.`);
			mutinyAttempted = false;
		} else if (V.PC.muscles >= eventSlave.muscles + 20 && canLift(eventSlave, V.PC)) {
			r.push(`but you are stronger, easily lifting ${him} into the air and slamming ${him} back to the ground.`);
			mutinyAttempted = false;
		} else if (V.PC.muscles >= eventSlave.muscles + 30) {
			r.push(`but you are far stronger; ${he}'s too big to lift, so you just overpower ${him} with sheer might.`);
			mutinyAttempted = false;
		} else {
			r.push(`and despite your attempts at fighting ${him} off, ${he} manages to get a hold on your body.`);
		}
		App.Events.addParagraph(node, r);

		r = [];
		if (mutinyAttempted) {
			r.push(`${He} doesn't seem to understand what ${he} is getting ${himself} into`);
			if (V.PC.boobs >= 300) {
				r.push(`as ${he} gropes your chest`);
			} else {
				r.push(`as ${he} runs ${his} ${hands} over your body`);
			}
			r.push(`in a desperate attempt at taking control.`);
			if (V.HeadGirlID !== 0) {
				const {
					he2, his2
				} = getPronouns(S.HeadGirl).appendSuffix("2");
				r.push(`You jump in surprise as ${S.HeadGirl.slaveName} tackles ${him} off you and to the floor`);
				if (S.HeadGirl.skill.combat > 60) {
					r.push(`where ${he2} twists ${his} arm in an arm hold until the rebellious slave stops struggling.`);
				} else {
					r.push(`where ${he2} settles ${his2} weight on the struggling rebel, lacking any better idea of what to do.`);
				}
				r.push(Spoken(S.HeadGirl, `"I'm sorry, ${getWrittenTitle(S.HeadGirl)}, ${he} tried to knock me out on ${his} way here. But as soon as I got up, I came running. I promise I saw nothing, but what should we do about ${him}?"`));
				mutinyAttempted = false;
			} else {
				r.push(`You try to fight ${him} off, but ${his} grip is stronger than you expected, so you will just have to bear with it, at least until an opening arises. If this gets out of the penthouse, your reputation as both arcology owner and as a slaver will be devastated.`);
			}
		}

		App.Events.addParagraph(node, r);
		let choices = [];
		let choices2 = [];
		if (mutinyAttempted) {
			choices.push(new App.Events.Result(`Fight ${him} off as much as you can`, fight));
			choices.push(new App.Events.Result(`Try to talk it out`, talk));
			choices.push(new App.Events.Result(`Fake playing along`, fake));
			App.Events.addResponses(node, choices);
		} else {
			App.Events.addParagraph(node, [`With the bitch restrained, you have all the time you need to devise ${his} punishment.`]);
			choices2.push(new App.Events.Result(`Lock ${his} dick in chastity`, lock));
			choices2.push(new App.Events.Result(`Flog ${him}`, flog));
			if (eventSlave.voice !== 0) {
				choices2.push(new App.Events.Result(`Mute ${him}`, mute, `This option will cost ${cashFormat(V.surgeryCost)}`));
			}
			choices2.push(new App.Events.Result(`Castrate ${him}`, castrate, `This option will cost ${cashFormat(V.surgeryCost)}`));
			if (eventSlave.vagina === -1) {
				choices2.push(new App.Events.Result(`Surgically alter ${his} gender`, genderbender, `This option will cost ${cashFormat(V.surgeryCost * 2)}`));
			} else {
				choices2.push(new App.Events.Result(`Remove ${his} male genitalia`, remove, `This option will cost ${cashFormat(V.surgeryCost * 2)}`));
			}
			choices2.push(new App.Events.Result(`Deny ${him} from ever having satisfying sex again`, deny, `This option will cost ${cashFormat(V.surgeryCost * 4)}`));
			App.Events.addResponses(node, choices2);
		}

		function fight(){
			const frag = document.createDocumentFragment();
			r = [];
			if (overpowerCheck(eventSlave, V.PC) >= random(1, 100)) {
				r.push(`You know your own body well, at least enough to be able to make it as difficult as possible for ${him} to use you. If ${he} were to loosen ${his} grip by a little, you'd be quick to shake ${him} off, but the position ${he}'s got you in doesn't leave much room to fight back. When you start to tire, ${he} pushes you to the wall and starts rubbing ${his}`);
				if (eventSlave.dick === 1) {
					r.push(`pathetic`);
				} else if (eventSlave.dick === 2) {
					r.push(`little`);
				} else if (eventSlave.dick === 3) { // empty
				} else if (eventSlave.dick === 4) {
					r.push(`big`);
				} else if (eventSlave.dick === 5) {
					r.push(`impressive`);
				} else if (eventSlave.dick === 6) {
					r.push(`huge`);
				} else if (eventSlave.dick === 7) {
					r.push(`gigantic`);
				} else if (eventSlave.dick === 8) {
					r.push(`titanic`);
				} else if (eventSlave.dick === 9) {
					r.push(`absurd`);
				} else if (eventSlave.dick === 10) {
					r.push(`inhuman`);
				} else {
					r.push(`hypertrophied`);
				}
				r.push(`dick on your lower body, thrusting blindly around your belly, before lodging ${himself} between your thighs. You have a hard time fighting against ${him} in your position, but you're not about to let ${him} dominate you either. You continue trying to shake ${him} off, making sure at the same time that your movements are as aggressive as possible to try and distract ${him} with pain or pleasure. You feel ${his} grip loosen as ${his} body tenses before pending orgasm, so you strongly push into ${him}, knocking ${him} off balance and to the floor. ${He} spills ${his} seed all over ${himself} and you as you wrestle ${him} into a chokehold. Now that you have ${him} restrained, it's time ${he} learned ${his} place.`);
			} else {
				r.push(`You know your own body well, but ${eventSlave.slaveName} is much stronger than you had thought. ${His} grip shows little sign of loosening despite your struggle, and ${he}'s got you in a position that allows for little other options to fight back. When you soon start to tire, ${he} pushes you to the wall, tears off your clothing, and starts rubbing ${his}`);
				if (eventSlave.dick === 1) {
					r.push(`pathetic`);
				} else if (eventSlave.dick === 2) {
					r.push(`little`);
				} else if (eventSlave.dick === 3) { // empty
				} else if (eventSlave.dick === 4) {
					r.push(`big`);
				} else if (eventSlave.dick === 5) {
					r.push(`impressive`);
				} else if (eventSlave.dick === 6) {
					r.push(`huge`);
				} else if (eventSlave.dick === 7) {
					r.push(`gigantic`);
				} else if (eventSlave.dick === 8) {
					r.push(`titanic`);
				} else if (eventSlave.dick === 9) {
					r.push(`absurd`);
				} else if (eventSlave.dick === 10) {
					r.push(`inhuman`);
				} else {
					r.push(`hypertrophied`);
				}
				r.push(`dick on your lower body, thrusting blindly around your belly, before suddenly lodging ${himself} in your pussy.`);
				if (V.PC.vagina === 0) {
					r.push(`Pain briefly floods your mind as ${he} <span class="virginity loss">robs you of your virginity.</span> A short flash of surprise passes across ${eventSlave.slaveName}'s face before determination sets in again.`);
					V.PC.vagina = 1;
				}
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`You have an even harder time fighting against ${him} in this position, especially since your aggressive movements seem to send a pleasurable sensation to ${his} cock. You only manage to find an opportunity to free yourself when ${he} reaches orgasm, shooting ${his} seed deep inside you. As ${he} cums, you strongly push into ${him}, knocking ${him} off balance and to the floor. By sheer luck, ${his} head strikes a large paperweight that was thrown across the room in your struggle, knocking ${him} unconscious long enough for you to dislodge yourself and tie ${him} up. Now that you have ${him} restrained, it's time ${he} learned ${his} place.`);
				seX(eventSlave, "penetrative", V.PC, "vaginal");
				if (canImpreg(V.PC, eventSlave)) {
					r.push(knockMeUp(V.PC, 50, 0, eventSlave.ID));
				}
				V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
			}
			App.Events.addParagraph(frag, r);
			App.Events.addResponses(frag, choices2);
			return frag;
		}

		function talk() {
			const frag = document.createDocumentFragment();
			let r = [];
			r.push(`You start trying to talk ${him} down, hoping to persuade ${him} that you might reconsider your punishment if ${he} stopped this foolishness.`);
			if (V.PC.vagina === 0) {
				r.push(`You don't stoop to begging for your virginity, but you do remind ${him} that taking something so valuable from you will certainly not go unpunished.`);
			}
			r.push(`${He} doesn't seem too keen on`);
			if (canHear(eventSlave)) {
				r.push(`listening to`);
			} else {
				r.push(`acknowledging`);
			}
			r.push(`you, instead pushing you against a wall and tearing your clothes off. Ignoring your words, ${he} forces ${his}`);
			if (eventSlave.dick === 1) {
				r.push(`pathetic`);
			} else if (eventSlave.dick === 2) {
				r.push(`little`);
			} else if (eventSlave.dick === 3) { // empty
			} else if (eventSlave.dick === 4) {
				r.push(`big`);
			} else if (eventSlave.dick === 5) {
				r.push(`impressive`);
			} else if (eventSlave.dick === 6) {
				r.push(`huge`);
			} else if (eventSlave.dick === 7) {
				r.push(`gigantic`);
			} else if (eventSlave.dick === 8) {
				r.push(`titanic`);
			} else if (eventSlave.dick === 9) {
				r.push(`absurd`);
			} else if (eventSlave.dick === 10) {
				r.push(`inhuman`);
			} else {
				r.push(`hypertrophied`);
			}
			r.push(`dick in without a second thought.`);
			if (V.PC.vagina === 0) {
				r.push(`Pain briefly floods your mind as ${he} violently <span class="virginity loss">robs you of your virginity.</span> It seems that reminding ${him} of your cunt's untouched status just added to ${his} motivation.`);
				V.PC.vagina = 1;
			} else {
				r.push(`You make sure to clamp down as hard as possible so the experience is not all that pleasant for ${him}, but ${he} continues to thrust in a daze.`);
			}
			if (canImpreg(V.PC, eventSlave)) {
				r.push(`You make one last plea for ${him} not to cum inside; it's a danger day. If anything, it only encourages ${him} to thrust deeper before painting the insides of your pussy with ${his} load.`);
				r.push(knockMeUp(V.PC, 100, 0, eventSlave.ID));
			}
			r.push(`Once spent, ${he} shoves you to the ground and crashes into your office chair. The moment ${he} lets down ${his} guard, you slam the heaviest object you can find into ${his} head. Now that you have ${him} controlled, it's time ${he} learned ${his} place — when ${he} wakes up, of course. It's more fun that way.`);
			seX(eventSlave, "penetrative", V.PC, "vaginal");
			V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
			App.Events.addParagraph(frag, r);
			App.Events.addResponses(frag, choices2);
			return frag;
		}

		function fake() {
			const frag = document.createDocumentFragment();
			let r = [];
			r.push(`You start removing your top and putting on a show of seducing your slave, dropping to your knees while looking doe-eyed at ${him}. By sucking ${him} off, you'll probably get ${him} to lower ${his} guard enough to get the upper hand. You take ${his}`);
			if (eventSlave.dick === 1) {
				r.push(`pathetic`);
			} else if (eventSlave.dick === 2) {
				r.push(`little`);
			} else if (eventSlave.dick === 3) { // empty
			} else if (eventSlave.dick === 4) {
				r.push(`big`);
			} else if (eventSlave.dick === 5) {
				r.push(`impressive`);
			} else if (eventSlave.dick === 6) {
				r.push(`huge`);
			} else if (eventSlave.dick === 7) {
				r.push(`gigantic`);
			} else if (eventSlave.dick === 8) {
				r.push(`titanic`);
			} else if (eventSlave.dick === 9) {
				r.push(`absurd`);
			} else if (eventSlave.dick === 10) {
				r.push(`inhuman`);
			} else {
				r.push(`hypertrophied`);
			}
			r.push(`dick inside your`);
			if (["escort", "prostitute", "child prostitute", "servant"].includes(V.PC.career)) {
				r.push(`expert`);
			}
			r.push(`mouth. You diligently suck until you feel ${him} begin to tense up; this is your chance. You clamp down on ${his} cock while simultaneously punching ${him} in the balls. ${He} howls in pain, until you headbutt ${him} in the stomach and knock the wind out of ${him}. You quickly pull ${him} into an arm lock and force ${him} over your desk. Now that you have ${him} restrained, it's time ${he} learned ${his} place — after you've gotten the taste of the slut out of your mouth, that is.`);
			App.Events.addParagraph(frag, r);
			App.Events.addResponses(frag, choices2);
			return frag;
		}

		function lock() {
			eventSlave.trust += 10;
			eventSlave.chastityPenis = 1;
			V.slaves.forEach(function(s) { if (s.devotion < -50) { s.trust += 5; } });
			return `You simply clamp a chastity cage onto ${his} limp dick; ${he}'ll be taking a little break from fucking girls for the time being. When ${he} comes to and finds ${himself} locked in chastity, ${he} immediately begins fiddling with it in an attempt to remove it. ${He} feels this punishment is laughable and only <span class="defiant inc">grows more defiant.</span> Word spreads through your chattel that the only downside of trying to rape ${getWrittenTitle(eventSlave)} is getting locked in chastity, <span class="defiant inc">spreading defiance</span> through your rebellious slaves.`;
		}

		function flog() {
			eventSlave.trust -= 15;
			healthDamage(eventSlave, 15);
			V.slaves.forEach(function(s) { if (s.devotion < -50) { s.trust -= 5; } });
			return `You bind ${his} naked body to the wall in preparation for a good beating. Going against one's master is bad, but going against you is even worse. You thoroughly strike ${him}, showering extra attention to ${his} crotch, while making sure ${he} will be in pain for days to come. Such a beating leaves ${him} <span class="health dec">in agonizing pain</span> and makes a clear example to ${him} and all your other rebellious slaves that <span class="trust dec">you are not to be trifled with.</span>`;
		}

		function mute() {
			eventSlave.trust += 5;
			eventSlave.devotion -= 15;
			eventSlave.voice = 0;
			V.slaves.forEach(function(s) { if (s.devotion < -50) { s.trust += 10; } });
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", eventSlave);
			return `As you pull ${his} limp body to the remote surgery, you notice ${he} understands what ${he} has done and begs you to reconsider your decision; but your mind is set. ${He} tried to rape you, ${he} must be silenced. Restrained as ${he} is, the most ${he} can do is cry and beg. When ${he} awakens from surgery, ${he} realizes all you did was stop ${him} from talking; <span class="defiant inc">what stops ${him} from making another go at you?</span> Your other rebellious slaves see this as a minor loss for a potentially huge gain and, if anything, <span class="defiant inc">become more defiant.</span>`;
		}

		function castrate() {
			eventSlave.trust -= 20;
			eventSlave.devotion -= 10;
			eventSlave.balls = 0;
			eventSlave.scrotum = 0;
			V.slaves.forEach(function(s) { if (s.devotion < -50) { s.trust -= 10; } });
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", eventSlave);
			surgeryDamage(eventSlave, 10);
			return `As you pull ${his} limp body to the remote surgery, you notice ${he} understands what ${he} has done and begs you to reconsider your decision; but your mind is set. ${He} had the balls to try and rape you, and now ${he} won't. Restrained as ${he} is, the most ${he} can do is cry and beg. Once ${he} comes to after the surgery, ${he} faces ${his} new life; <span class="devotion dec">${he}'ll never get hard again</span> and ${he}'s <span class="trust dec">the only one to blame</span> for ${his} <span class="health dec">suffering.</span> Every other rebellious slave is <span class="trust dec">mortified by the example.</span>`;
		}

		function genderbender() {
			eventSlave.trust -= 30;
			eventSlave.devotion -= 25;
			eventSlave.dick = 0;
			eventSlave.balls = 0;
			eventSlave.scrotum = 0;
			eventSlave.prostate = 0;
			eventSlave.dickAccessory = "none";
			eventSlave.vagina = 1;
			eventSlave.chastityPenis = 0;
			V.slaves.forEach(function(s) { if (s.devotion < -50) { s.trust -= 15; } });
			cashX(forceNeg(V.surgeryCost*2), "slaveSurgery", eventSlave);
			surgeryDamage(eventSlave, 20);

			let r = [];
			r.push(`You ask ${him} if ${he} enjoyed the last time ${he} used ${his} dick and if it was worth crossing you, because it will not happen again. Restrained as ${he} is, the most ${he} can do is cry and beg. Once ${he} comes to after the surgery, ${he} faces ${his} new body; <span class="devotion dec">${he}'s now a shemale</span> and ${he}'s <span class="trust dec">the only one to blame</span> for ${his} <span class="health dec">suffering.</span> You waste no time in shoving ${him} against the wall and forcing your ${dick} into ${his} virgin pussy. You use ${him} until you are satisfied and toss ${him} to the floor to think about ${his} new life. Every other rebellious slave is <span class="trust dec">horrified by the example.</span>`);
			r.push(VCheck.Vaginal(eventSlave, 1));
			return r;
		}

		function remove() {
			eventSlave.trust -= 30;
			eventSlave.devotion -= 25;
			eventSlave.dick = 0;
			eventSlave.foreskin = 0;
			eventSlave.balls = 0;
			eventSlave.scrotum = 0;
			eventSlave.dickAccessory = "none";
			eventSlave.chastityPenis = 0;
			V.slaves.forEach(function(s) { if (s.devotion < -50) { s.trust -= 15; } });
			cashX(forceNeg(V.surgeryCost*2), "slaveSurgery", eventSlave);
			surgeryDamage(eventSlave, 20);
			return `You ask ${him} if ${he} enjoyed the last time ${he} used ${his} dick and if it was worth crossing you, because it will not happen again. Restrained as ${he} is, the most ${he} can do is cry and beg. Once ${he} comes to after the surgery, ${he} faces ${his} new body; <span class="devotion dec">${he}'s now a surgical null</span> and ${he}'s <span class="trust dec">the only one to blame</span> for ${his} <span class="health dec">suffering.</span> Every other rebellious slave is <span class="trust dec">horrified by the example.</span>`;
		}

		function deny() {
			eventSlave.trust -= 50;
			eventSlave.devotion -= 30;
			eventSlave.dick = 0;
			eventSlave.prostate = 0;
			eventSlave.dickAccessory = "none";
			eventSlave.chastityPenis = 0;
			eventSlave.vagina = 0;
			eventSlave.ovaries = 0;
			eventSlave.clit = 0;
			eventSlave.labia = 0;
			eventSlave.vaginalAccessory = "none";
			eventSlave.vaginalAttachment = "none";
			eventSlave.chastityVagina = 0;
			V.slaves.forEach(function(s) { if (s.devotion < -50) { s.trust -= 15; } });
			cashX(forceNeg(V.surgeryCost*4), "slaveSurgery", eventSlave);
			surgeryDamage(eventSlave, 20);

			let r = [];
			r.push(`You ask ${him} if ${he} enjoyed ${his} last orgasm, because ${he} won't be getting any more. Restrained as ${he} is, the most ${he} can do is cry and beg. Once ${he} comes to after the surgery, ${he} faces ${his} new body; <span class="devotion dec">${he}'s now a surgical null,</span> though ${he} retains ${his} balls, and ${he}'s <span class="trust dec">the only one to blame</span> for ${his} <span class="health dec">suffering.</span> You waste no time in shoving ${him} against the wall and forcing your ${dick} into ${his} anus. As ${his} arousal grows, ${he} realizes you not only took ${his} dick, but ${his} prostate as well. ${He} quickly finds ${himself} desperate for release but lacking any way to do so. You watch ${him} squirm in sexual frustration. This will be ${his} new life. Every other rebellious slave is <span class="trust dec">horrified by the example.</span>`);
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}
	}
};
