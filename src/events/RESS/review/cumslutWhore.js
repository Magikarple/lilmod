App.Events.RESSCumslutWhore = class RESSCumslutWhore extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.dick !== 0,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion > 20,
				s => s.fetishKnown === 1,
				s => [Job.PUBLIC, Job.WHORE, Job.GLORYHOLE].includes(s.assignment),
				s => s.fetish === "cumslut" || s.energy > 95, // Add condition !== "hates oral" ?
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, girl, hers
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const hands = hasBothArms(eventSlave) ? "hands" : "hand";

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`Late at night,`,
			contextualIntro(V.PC, eventSlave, true),
			`returns to the living area of the penthouse. It's the end of ${his} day as a working girl, and despite being obviously tired, ${he}'s smiling with obvious sexual satiation. Every so often, ${he}'ll get a dreamy expression and lick ${his} lips. ${He} fetishizes cum to the extent that getting to eat a`
		);
		if (V.showInches === 2) {
			r.push(`mile`);
		} else {
			r.push(`kilometer`);
		}
		r.push(`of dick really satisfies ${him}.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`${He} must have at least a little room left`, room),
			new App.Events.Result(`Cum in ${his} mouth all night`, night),
			cumSlaves().length >= 5
				? new App.Events.Result(`Give ${him} access to the Dairy's cockmilk`, cockmilk)
				: new App.Events.Result()
		]);

		function room() {
			r = [];
			r.push(`You call ${eventSlave.slaveName} in and ask how full ${he} is. ${He} looks confused for a moment but soon figures out what you mean.`);
			if (!canTalk(eventSlave) && (!hasAnyArms(eventSlave))) {
				r.push(`As a mute amputee ${he} communicates poorly,`);
				if (eventSlave.inflationType === "cum") {
					if (eventSlave.bellyFluid >= 10000) {
						r.push(`but ${he} sticks out ${his} hugely bloated cum-belly and opens wide, ${his} intent clear.`);
					} else if (eventSlave.bellyFluid >= 5000) {
						r.push(`but ${he} wiggles around so ${his} cum-filled belly sloshes audibly before opening wide.`);
					} else {
						r.push(`but ${he} sticks out ${his} cum-swollen belly and opens wide, ${his} intent clear.`);
					}
				} else {
					r.push(`but ${he} does manage to look hungry.`);
				}
			} else if (!canTalk(eventSlave)) {
				if (eventSlave.inflationType === "cum") {
					if (eventSlave.bellyFluid >= 10000) {
						r.push(`${He} strokes ${his} hugely bloated cum-belly, makes a sign for "never," and then makes a sign for "enough."`);
					} else if (eventSlave.bellyFluid >= 5000) {
						r.push(`${He} jiggles ${his} cum-filled belly lewdly, makes a sign for "need," and then makes a sign for "more."`);
					} else {
						r.push(`${He} pats ${his} cum-swollen belly, makes a sign for "much," and then makes a sign for "room."`);
					}
				} else {
					r.push(`${He} gestures at ${his}`);
					if (eventSlave.belly >= 1500) {
						r.push(belly);
					}
					r.push(`stomach, makes a sign for "full," and then makes a sign for "never."`);
				}
			} else {
				if (eventSlave.inflationType === "cum") {
					if (eventSlave.bellyFluid >= 10000) {
						r.push(
							`${He} strokes ${his} hugely bloated cum-belly,`,
							Spoken(eventSlave, `"Oh ${Master}, I've had so much cum already today, but I can't help myself if you're offering me even more. I'll find some room in there,"`)
						);
					} else if (eventSlave.bellyFluid >= 5000) {
						r.push(
							`${He} jiggles ${his} cum-filled belly lewdly,`,
							Spoken(eventSlave, `"Oh ${Master}, there's so much already in me, but I feel so empty still."`)
						);
					} else {
						r.push(
							`${He} pats ${his} cum-swollen stomach,`,
							Spoken(eventSlave, `"Oh ${Master}, this little belly is nothing, I always have room for more,"`)
						);
					}
				} else {
					r.push(Spoken(eventSlave, `"Oh ${Master}, I'll never be full again,"`));
				}
				r.push(`${he} ${say}s`);
				if (eventSlave.lips > 70) {
					r.push(`past ${his} enormous lips`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					r.push(`past ${his} mouthful of piercings`);
				}
				r.push(r.pop() + `.`);
			}
			r.push(`${He} comes eagerly over and sucks you off with enthusiasm. As you cum, ${he} orgasms quickly at the`);
			if (canTaste(eventSlave)) {
				r.push(`taste`);
			} else {
				r.push(`feeling`);
			}
			r.push(`of the stuff hitting ${his}`);
			if (V.PC.balls >= 10) {
				r.push(`mouth, even as your load keeps flowing into ${his}`);
				if (V.PC.balls >= 30) {
					r.push(`gullet, steadily bloating the poor ${girl}.`);
				} else {
					r.push(`gullet.`);
				}
			} else {
				r.push(`mouth.`);
			}
			if (!canTalk(eventSlave)) {
				r.push(`${He}`);
				if (!canTaste(eventSlave)) {
					r.push(`(rather ironically)`);
				}
				r.push(`signs that you taste great.`);
			} else {
				r.push(
					Spoken(eventSlave, `"${Master}, you taste great,"`),
					`${he}`
				);
				if (!canTaste(eventSlave)) {
					r.push(`(rather ironically)`);
				}
				r.push(`purrs.`);
			}
			r.push(`<span class="trust inc">${He} has become more trusting</span> in your willingness to give ${him} what ${he} wants.`);
			eventSlave.trust += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			return r;
		}

		function night() {
			r = [];
			r.push(`You've had a busy day, so you've been unusually remiss in fucking your slaves. Naturally, this means you'll be spending the evening wandering around your home using your living sexual appliances. ${eventSlave.slaveName} is instructed to follow you and assist. ${He}'s tired, so`);
			if (!hasAnyArms(eventSlave)) {
				r.push(`you bring`);
				if (isAmputee(eventSlave)) {
					r.push(`${his} limbless torso`);
				} else {
					r.push(`${him}`);
				}
				r.push(`along as a cum receptacle. Whenever you're about to finish in another slave, you pull out and fill ${his} mouth instead.`);
			} else {
				r.push(`you let ${him} tag meekly along, masturbating gently as you use other slaves or just watching lazily. But whenever you're on the point of coming, you switch to ${his} mouth and let ${him} finish you with a few sucks and pumps of ${his} fatigued ${hands}.`);
			}
			r.push(`By the time you put the exhausted ${eventSlave.slaveName} to bed ${he}'s in a haze of cum-induced pleasure. <span class="devotion inc">${He} has become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", V.PC, "penetrative", 5);
			return r;
		}

		function cockmilk() {
			eventSlave.devotion += 10;
			cashX(random(500, 1000), "event", eventSlave);
			return `You let ${him} know you have a sexual accessory for ${him} to use. This isn't too unusual, so ${he} comes to your office without much anticipation. ${He} doesn't understand why you have an enormous sealed canister of fresh cum on your desk, but when you explain that it's ${hers} to play with on the job, ${he} starts to bounce with excitement. Not all of ${his} customers are interested in cum play, but quite a few are, and ${he} spends almost as much time cleaning up the gorgeous messes that get made as ${he} does making them. It's a valuable and <span class="cash inc">profitable</span> whore who <span class="devotion inc">looks forward</span> to ${his} next customer.`;
		}
	}
};
