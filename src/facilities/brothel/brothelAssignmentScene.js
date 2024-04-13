App.Facilities.Brothel.assignmentScene = function(slave) {
	const node = new DocumentFragment();

	V.nextButton = "Continue";
	V.nextLink = V.returnTo;
	const {
		He, His,
		he, him, himself, his, girl
	} = getPronouns(slave);
	const {
		say: say, title: Master
	} = getEnunciation(slave);
	const hands = hasBothArms(slave) ? "hands" : "hand";

	App.Events.drawEventArt(node, slave);
	let r = [];

	r.push(`You could direct ${V.assistant.name} to relay your orders to ${slave.slaveName}, but you've decided to avoid relying too much on machine assistance. So, ${he} is merely directed to report to your office. The`);
	if (slave.devotion > 95) {
		r.push(`worshipful ${girl}`);
		if (hasAnyLegs(slave)) {
			r.push(`hurries in as soon as ${he} possibly can,`);
		} else {
			r.push(`comes in as soon as ${he} can get another slave to carry ${him} in,`);
		}
		r.push(`happy ${his} beloved ${getWrittenTitle(slave)} is taking an interest in ${him}.`);
	} else if (slave.devotion > 50) {
		r.push(`devoted ${girl}`);
		if (hasAnyLegs(slave)) {
			r.push(`hurries in promptly,`);
		} else {
			r.push(`comes in as soon as ${he} can get another slave to carry ${him} in,`);
		}
		r.push(`eager to do whatever you demand of ${him}.`);
	} else if (slave.devotion > 20) {
		r.push(`${girl}, broken to your will,`);
		if (hasAnyLegs(slave)) {
			r.push(`comes in promptly,`);
		} else {
			r.push(`comes in as soon as ${he} can get another slave to carry ${him} in,`);
		}
		r.push(`clearly ready to follow orders.`);
	} else if (slave.trust < -20 && slave.devotion > -10) {
		r.push(`fearful slave`);
		if (hasAnyLegs(slave)) {
			r.push(`comes in promptly,`);
		} else {
			r.push(`comes in as soon as ${he} can get another slave to carry ${him} in,`);
		}
		r.push(`afraid of what will happen to ${him} if ${he} doesn't.`);
	} else if (slave.trust < -50) {
		r.push(`terrified slave`);
		if (hasAnyLegs(slave)) {
			r.push(`comes in hurriedly,`);
		} else {
			r.push(`comes in as soon as ${he} can get another slave to carry ${him} in,`);
		}
		r.push(`almost paralyzed by terror of what will happen to ${him} if ${he} doesn't.`);
	} else {
		r.push(`rebellious slave`);
		if (hasAnyLegs(slave)) {
			r.push(`comes in slowly, having decided that ${he} can always decide to resist once ${he} hears what you want.`);
		} else {
			r.push(`comes in as soon as you order another slave to carry ${him} in, since ${he} can't exactly resist this without`);
			if (isAmputee(slave)) {
				r.push(`limbs.`);
			} else {
				r.push(`legs.`);
			}
		}
	}
	r.push(`You tell ${him} ${he}'s to report to`);
	if (V.MadamID !== 0) {
		r.push(`${S.Madam.slaveName} immediately, to serve in ${V.brothelName}`);
	} else {
		r.push(`${V.brothelName} immediately, to serve there`);
	}
	r.push(`until further notice.`);

	App.Events.addParagraph(node, r);
	r = [];
	if (slave.devotion > 50) {
		if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish !== Fetish.NONE) {
			r.push(`${He} looks excited.`);
			if (canTalk(slave)) {
				r.push(Spoken(slave, `"${Master}, I hoped you would send me down there sometime!`));
				switch (slave.fetish) {
					case "submissive":
						r.push(
							Spoken(slave, `I mean, I'll have to do whatever the customers pay for, right?"`),
							`${His} eyes go a little unfocused.`,
							Spoken(slave, `"And, they'll hold me down..."`),
							`${He} trails off.`
						);
						break;
					case "masochist":
						r.push(
							Spoken(slave, `I mean, it's hard being a brothel whore, right? And when I get tired or sore, I'll still be sold. Even when it hurts me to fuck any more."`),
							`${His} eyes glow with an unhealthy light.`
						);
						break;
					case "cumslut":
						r.push(
							Spoken(slave, `I mean,"`),
							`${he} licks ${his} lips unconsciously,`
						);
						if (slave.attrXX > slave.attrXY) {
							r.push(Spoken(slave, `"I hear there are some nice ladies that go there for lunchtime cunnilingus."`));
						} else {
							r.push(Spoken(slave, `"the blowjobs. Just, the blowjobs. That's all."`));
						}
						break;
					case "humiliation":
						r.push(Spoken(slave, `There's a window that faces the hallway there, right? ${(V.MadamID !== 0) ? `Do you think ${S.Madam.slaveName} would let me` : `Could I`} get fucked there? Where everyone could see me being fucked for money?"`));
						break;
					case "buttslut":
						r.push(
							Spoken(slave, `I mean,"`),
							`and ${he} shifts ${his} weight, ${his} mind obviously on ${his} backdoor,`
						);
						if (slave.attrXX > slave.attrXY) {
							r.push(Spoken(slave, `"there have to be ladies who want to buttfuck a whore, right? At least, I really hope there are."`));
						} else {
							r.push(Spoken(slave, `"the other slaves tell me that whores there get fucked up the ass all day and all night. Sounds like fun to me."`));
						}
						break;
					case "boobs":
						r.push(
							Spoken(slave, `I mean,"`),
							`and ${he} sticks out ${his} chest a little,`
						);
						if (slave.attrXX > slave.attrXY) {
							r.push(
								Spoken(slave, `"I hear from the other slaves there's this nice lady who goes there every morning and pays to have a whore suck her nipples for, like, an hour. I,"`),
								`${he} licks ${his} lips,`,
								Spoken(slave, `"could do that."`)
							);
						} else {
							r.push(Spoken(slave, `"the other slaves tell me that whores there get tittyfucked all the time. Sounds like fun to me."`));
						}
						break;
					case "pregnancy":
						r.push(
							Spoken(slave, `I mean,"`),
							`${he} says meditatively,`
						);
						if (slave.attrXX > slave.attrXY) {
							r.push(Spoken(slave, `"I hear from the other slaves there's this pregnant lady who goes there every night and pays to have a whore cuddle her. Just cuddle, all night. That would be kind of hard, just cuddling, but I could do it."`));
						} else if (slave.vagina === -1) {
							r.push(Spoken(slave, `"since it's all bareback, I'm going to have a fuckton of cum in me. I wonder how much cum it takes to get a butthole pregnant? I'm gonna try, anyway."`));
						} else if (isFertile(slave)) {
							r.push(Spoken(slave, `"since it's all bareback, I'm going to have a fuckton of cum in me. I wonder how much cum it would take to get my poor womb pregnant?"`));
						} else if (slave.pregKnown === 1) {
							r.push(Spoken(slave, `"I'm going to be a pregnant whore. That's pretty fucking sexy."`));
						} else if (slave.preg > 0) {
							r.push(Spoken(slave, `"since it's all bareback, I'm going to have a fuckton of cum in me. I wonder how much cum it would take to get my poor womb pregnant?"`));
						} else if (slave.ovaries === 1 && slave.pubertyXX === 0) {
							r.push(Spoken(slave, `"I can't wait till I can get pregnant. That'd be pretty fucking sexy."`));
						} else {
							r.push(Spoken(slave, `"I hear from the other slaves there's this pregnant lady who goes there every night and pays to have a whore cuddle her. Just cuddle, all night. That would be kind of hard, just cuddling, but I could do it."`));
						}
						break;
					case "dom":
						r.push(Spoken(slave, `I heard from the other slaves that some citizens bring their girls there. Just to make them take it from a whore."`));
						break;
					case "sadist":
						r.push(Spoken(slave, `I heard from the other slaves that some citizens bring their girls there. Because nobody knows how to hurt a bitch like a whore does." ${He} shivers.`));
				}
			} else {
				switch (slave.fetish) {
					case "submissive":
						r.push(`${He} gestures that ${he}'ll be at the mercy of ${his} customers. ${His} eyes go a little unfocused as ${he} clearly begins to fantasize.`);
						break;
					case "masochist":
						r.push(`${He} gestures that ${he}'ll probably get roughed up by some of ${his} customers and that there will be no breaks for ${his} sore holes. ${His} eyes glow with an unhealthy light as ${he} clearly begins to fantasize.`);
						break;
					case "cumslut":
						r.push(`${He} licks ${his} lips unconsciously and motions`);
						if (slave.attrXX > slave.attrXY) {
							r.push(`tonguing a clit.`);
						} else {
							r.push(`sucking cock.`);
						}
						break;
					case "humiliation":
						r.push(`${He} gestures if ${he} could be fucked in public there.`);
						break;
					case "buttslut":
						r.push(`${He} shifts ${his} weight, ${his} mind obviously on ${his} backdoor, and gestures`);
						if (slave.attrXX > slave.attrXY) {
							r.push(`if any girls would want to buttfuck ${him}.`);
						} else {
							r.push(`that ${he} knows whores take it up the ass there and can't wait to join them.`);
						}
						break;
					case "boobs":
						r.push(`${He} sticks out ${his} chest a little and gestures`);
						if (slave.attrXX > slave.attrXY) {
							r.push(`that ${he}'s heard a woman comes by each day just to have her nipples sucked. ${He} licks ${his} lips, clearly savoring the thought.`);
						} else {
							r.push(`that ${he} knows tittyfucking is popular there and can't wait to give ${his} pair up for sale.`);
						}
						break;
					case "pregnancy":
						r.push(`${He} gestures`);
						if (slave.attrXX > slave.attrXY) {
							r.push(`that ${he}'s heard that a pregnant woman has been coming every night to pay for a whore to cuddle her. ${He} asks if ${he} could be that ${girl}.`);
						} else if (slave.vagina === -1) {
							r.push(`how much ${he} wishes ${he} could get pregnant from all the cum loads ${he}'s going to get shot up ${his} rear.`);
						} else if (isFertile(slave)) {
							r.push(`that ${he} knows all the sex is bareback. By the look in ${his} eyes, you can tell ${he} is wondering how long it will take for some guy's seed to take root in ${him}.`);
						} else if (slave.pregKnown === 1) {
							r.push(`how sexy ${he} thinks pregnant whores are.`);
						} else if (slave.preg > 0) {
							r.push(`that ${he} knows all the sex is bareback. By the look in ${his} eyes, you can tell ${he} is wondering how long it will take for some guy's seed to take root in ${him}.`);
						} else if (slave.ovaries === 1 && slave.pubertyXX === 0) {
							r.push(`how excited ${he} is for the day ${he} starts ${his} menstrual cycle. Will ${he} even see ${his} first period, or will every egg ${he} makes get fertilized?`);
						} else {
							r.push(`that ${he}'s heard a pregnant woman has been coming every night to pay for a whore to cuddle her. ${He} hopes that one day ${he}'ll be chosen.`);
						}
						break;
					case "dom":
						r.push(`${He} gestures that ${he} knows citizens sometimes bring their toys there just to let them get pushed around by a whore. ${He}'d like that to be true. A lot.`);
						break;
					case "sadist":
						r.push(`${He} gestures that ${he} knows citizens sometimes bring their toys there for punishment. ${He} shivers with anticipation.`);
				}
			}
		} else {
			r.push(`${He} looks`);
			if (canTalk(slave)) {
				r.push(
					`determined.`,
					Spoken(slave, `"${Master}, I will do my best to be a good whore, and get lots of citizens to pay good money for my body."`)
				);
			} else {
				r.push(`determined and gestures that ${he}'ll do ${his} best to get lots of citizens to pay to use ${him}.`);
			}
		}
	} else if (slave.devotion > 20 || (slave.devotion >= -20 && slave.trust < -20 && slave.trust >= -50)) {
		if (canTalk(slave)) {
			if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish !== Fetish.NONE) {
				r.push(`${He} looks cautiously excited.`);
				switch (slave.fetish) {
					case "submissive":
						r.push(
							Spoken(slave, `"${Master}, I'll have to do whatever the customers pay for, right?"`),
							`${His} eyes go a little unfocused.`,
							Spoken(slave, `"And, they'll hold me down..."`),
							`${He} trails off.`
						);
						break;
					case "masochist":
						r.push(
							Spoken(slave, `"${Master}, it's hard being a brothel whore, right? And when I get tired or sore, I'll still be sold. Even when it hurts me to fuck any more."`),
							`${His} eyes glow with an unhealthy light.`
						);
						break;
					case "cumslut":
						if (slave.attrXX > slave.attrXY) {
							r.push(Spoken(slave, `"${Master}, I hear there are some nice ladies that go there for lunchtime cunnilingus."`));
						} else {
							r.push(Spoken(slave, `"${Master}, the blowjobs. Just, the blowjobs. That's all."`));
						}
						break;
					case "humiliation":
						r.push(Spoken(slave, `"${Master}, there's a window that faces the hallway there, right? ${(V.MadamID !== 0) ? `Do you think ${S.Madam.slaveName} would let me` : `Could I`} get fucked there? Where everyone could see me being fucked for money?"`));
						break;
					case "buttslut":
						r.push(
							Spoken(slave, `"${Master}, uh,"`),
							`and ${he} shifts ${his} weight, ${his} mind obviously on ${his} backdoor,`
						);
						if (slave.attrXX > slave.attrXY) {
							r.push(Spoken(slave, `"there have to be ladies who want to buttfuck a whore, right? At least, I really hope there are."`));
						} else {
							r.push(Spoken(slave, `"the other slaves tell me that whores there get fucked up the ass all day and all night. Sounds like fun to me."`));
						}
						break;
					case "boobs":
						r.push(
							Spoken(slave, `"${Master},"`),
							`${He} sticks out ${his} chest a little and gestures`
						);
						if (slave.attrXX > slave.attrXY) {
							r.push(`that ${he}'s heard a woman comes by each day just to have her nipples sucked. ${He} licks ${his} lips, clearly savoring the thought.`);
						} else {
							r.push(`that ${he} knows tittyfucking is popular there and can't wait to give ${his} pair up for sale.`);
						}
						break;
					case "pregnancy":
						if (slave.attrXX > slave.attrXY) {
							r.push(Spoken(slave, `"${Master}, I hear from the other slaves there's this pregnant lady who goes there every night and pays to have a whore cuddle her. Just cuddle, all night. That would be kind of hard, just cuddling, but I could do it."`));
						} else if (slave.vagina === -1) {
							r.push(Spoken(slave, `"${Master}, since it's all bareback, I'm going to have a fuckton of cum in me. I wonder how much cum it takes to get a butthole pregnant? I'm gonna try, anyway."`));
						} else if (isFertile(slave)) {
							r.push(Spoken(slave, `"${Master}, since it's all bareback, I'm going to have a fuckton of cum in me. I wonder how much cum it would take to get my poor womb pregnant?"`));
						} else if (slave.pregKnown === 1) {
							r.push(Spoken(slave, `"${Master}, I'm going to be a pregnant whore. That's pretty fucking sexy."`));
						} else if (slave.preg > 0) {
							r.push(Spoken(slave, `"${Master}, since it's all bareback, I'm going to have a fuckton of cum in me. I wonder how much cum it would take to get my poor womb pregnant?"`));
						} else if (slave.ovaries === 1 && slave.pubertyXX === 0) {
							r.push(Spoken(slave, `"${Master}, I can't wait till I can get pregnant. That'd be pretty fucking sexy."`));
						} else {
							r.push(Spoken(slave, `"${Master}, I hear from the other slaves there's this pregnant lady who goes there every night and pays to have a whore cuddle her. Just cuddle, all night. That would be kind of hard, just cuddling, but I could do it."`));
						}
						break;
					case "dom":
						r.push(Spoken(slave, `"${Master}, I heard from the other slaves that some citizens bring their girls there. Just to make them take it from a whore."`));
						break;
					case "sadist":
						r.push(Spoken(slave, `"${Master}, I heard from the other slaves that some citizens bring their girls there. Because nobody knows how to hurt a bitch like a whore does." ${He} shivers.`));
				}
			} else if (slave.sexualFlaw !== "none") {
				r.push(
					Spoken(slave, `"Yes, ${Master},"`),
					`${he} says obediently. ${He} hesitates, looking concerned.`
				);
				switch (slave.sexualFlaw) { // FIXME: needs text for paraphilias, or they need a different branch; probably the same thing is needed in other branches too
					case "hates oral":
						r.push(
							Spoken(slave, `"I — I'm going to h-have to suck a lot of dick there, aren't I."`),
							`${He} swallows nervously. ${His} lower lip quivers, and ${he} does ${his} best not to cry in front of you.`
						);
						break;
					case "hates anal":
						r.push(
							Spoken(slave, `"C-customers are really going to ream me up the butt hole, aren't they."`),
							`${He}`
						);
						if (!hasAnyArms(slave)) {
							r.push(`shifts uncomfortably, unconsciously trying to shield ${his} rear as best ${he} can manage without`);
							if (isAmputee(slave)) {
								r.push(`limbs`);
							} else {
								r.push(`hands`);
							}
						} else {
							r.push(`unconsciously reaches around behind ${himself}, not quite shielding ${his} anus with ${his} ${hands}. ${His} lower lip quivers, and ${he} does ${his} best not to cry in front of you.`);
						}
						break;
					case "hates penetration":
						r.push(
							Spoken(slave, `"C-customers are really going to fuck me sore, aren't they."`),
							`${He}`
						);
						if (!hasAnyArms(slave)) {
							r.push(`shifts uncomfortably, unconsciously trying to shield ${his} rear as best ${he} can manage without`);
							if (isAmputee(slave)) {
								r.push(`limbs.`);
							} else {
								r.push(`hands.`);
							}
						} else if (slave.vagina > 0) {
							r.push(`unconsciously lets ${his} ${hands} fall to ${his} crotch, but catches ${himself} and doesn't quite shield ${his} pussy.`);
						} else {
							r.push(`unconsciously reaches around behind ${himself}, not quite shielding ${his} anus with ${his} ${hands}.`);
						}
						r.push(`${His} lower lip quivers, and ${he} does ${his} best not to cry in front of you.`);
						break;
					case "repressed":
						r.push(
							Spoken(slave, `"Being a whore is a sin,"`),
							`${he} ${say}s quietly, half to ${himself}.`,
							Spoken(slave, `"I'm going t-to b-be so dirty. I'm going to h-hell."`),
							`${He} starts to cry quietly.`,
							Spoken(slave, `"S-sorry, ${Master}. I'll do my best."`)
						);
						break;
					case "idealistic":
						r.push(
							Spoken(slave, `"I'm going to be sold for sex,"`),
							`${he} ${say}s quietly, half to ${himself}.`,
							Spoken(slave, `"Men are going to pay, and then they're g-going to stick their dicks in me, and then they're going to leave."`),
							`${He} starts to cry quietly.`,
							Spoken(slave, `"S-sorry, ${Master}. I'll do my best."`)
						);
						break;
					case "shamefast":
						r.push(
							Spoken(slave, `"I'm going to be meat in a brothel,"`),
							`${he} ${say}s quietly, half to ${himself}.`,
							Spoken(slave, `"I'm going to stand there naked with the other slaves, and men will pick me and then use my body. Over and over."`),
							`${He} starts to cry quietly.`,
							Spoken(slave, `"S-sorry, ${Master}. I'll do my best."`)
						);
						break;
					case "apathetic":
						r.push(
							Spoken(slave, `"I guess I'll lie there,"`),
							`${he} sighs quietly, half to ${himself}.`,
							Spoken(slave, `"A man will pay and then he'll come into my room where I'm lying on the bed, and he'll stick his cock in me and cum and leave. And then the next man will come in."`),
							Spoken(slave, `${He} starts to cry quietly.`),
							Spoken(slave, `"S-sorry, ${Master}. I'll do my best."`)
						);
						break;
					case "crude":
						r.push(
							Spoken(slave, `"Okay,"`),
							`${he} ${say}s, thinking.`,
							Spoken(slave, `"My poor cornhole is going to be such a seminal sewer."`),
							`${He} looks doubtful.`,
							Spoken(slave, `"Should I not have said that, ${Master}?"`)
						);
						break;
					case "judgemental":
						r.push(
							Spoken(slave, `"Gross,"`),
							`${he} ${say}s curtly.`,
							Spoken(slave, `"Well, no more handsome boys for me, then. Fat pathetic guys who patronize whores, all the way down. Fuck."`),
						);
						break;
				}
			} else {
				r.push(
					`${He} tries to be brave.`,
					Spoken(slave, `"${Master}, I will do my best to be a good whore."`),
					`Then, half to ${himself}, ${he} adds in a small voice,`,
					Spoken(slave, `"I can do this."`)
				);
			}
		} else {
			if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish !== Fetish.NONE) {
				r.push(`${He} looks cautiously excited.`);
				switch (slave.fetish) {
					case "submissive":
						r.push(`${His} eyes go a little unfocused before ${he} snaps back to attention and gestures that ${he}'ll have to do whatever they want. ${His} attention wavers once more.`);
						break;
					case "masochist":
						r.push(`${He} gestures if brothel whores get breaks when they get sore. Before you can tell ${him} no, ${his} eyes glow with an unhealthy light and ${he} expresses that ${he}'d like it more if it hurt.`);
						break;
					case "cumslut":
						if (slave.attrXX > slave.attrXY) {
							r.push(`${He} gestures that ${he} heard a rumor that some ladies swing by during lunchtime for a quick eating out.`);
						} else {
							r.push(`As drool starts to leak from ${his} mouth, it's pretty obvious ${he} can't wait to start sucking.`);
						}
						break;
					case "humiliation":
						r.push(`${He} asks if there is a window that ${he} could be stationed in for all to see.`);
						break;
					case "buttslut":
						r.push(`${He} shifts ${his} weight, ${his} mind obviously on ${his} backdoor, and gestures`);
						if (slave.attrXX > slave.attrXY) {
							r.push(`if any girls would want to buttfuck ${him}.`);
						} else {
							r.push(`that ${he} knows whores take it up the ass there and can't wait to join them.`);
						}
						break;
					case "boobs":
						r.push(`${He} sticks out ${his} chest a little and gestures`);
						if (slave.attrXX > slave.attrXY) {
							r.push(`that ${he}'s heard a woman comes by each day just to have her nipples sucked. ${He} licks ${his} lips, clearly savoring the thought.`);
						} else {
							r.push(`that ${he} knows tittyfucking is popular there and can't wait to give ${his} pair up for sale.`);
						}
						break;
					case "pregnancy":
						r.push(`${He} gestures`);
						if (slave.attrXX > slave.attrXY) {
							r.push(`that ${he}'s heard that a pregnant woman has been coming every night to pay for a whore to cuddle her. ${He} asks if ${he} could be that ${girl}.`);
						} else if (slave.vagina === -1) {
							r.push(`how much ${he} wishes ${he} could get pregnant from all the cum loads ${he}'s going to get shot up ${his} rear.`);
						} else if (isFertile(slave)) {
							r.push(`that ${he} knows all the sex is bareback. By the look in ${his} eyes, you can tell ${he} is wondering how long it will take for some guy's seed to take root in ${him}.`);
						} else if (slave.pregKnown === 1) {
							r.push(`how sexy ${he} thinks pregnant whores are.`);
						} else if (slave.preg > 0) {
							r.push(`that ${he} knows all the sex is bareback. By the look in ${his} eyes, you can tell ${he} is wondering how long it will take for some guy's seed to take root in ${him}.`);
						} else if (slave.ovaries === 1 && slave.pubertyXX === 0) {
							r.push(`how excited ${he} is for the day ${he} starts ${his} menstrual cycle. Will ${he} even see ${his} first period, or will every egg ${he} makes get fertilized?`);
						} else {
							r.push(`that ${he}'s heard a pregnant woman has been coming every night to pay for a whore to cuddle her. ${He} hopes that one day ${he}'ll be chosen.`);
						}
						break;
					case "dom":
						r.push(`${He} gestures that ${he} knows citizens sometimes bring their toys there just to let them get pushed around by a whore. ${He}'d like that to be true. A lot.`);
						break;
					case "sadist":
						r.push(`${He} gestures that ${he} knows citizens sometimes bring their toys there for punishment. ${He} shivers with anticipation.`);
				}
			} else if (slave.sexualFlaw !== "none") {
				r.push(`${He} nods obediently before hesitating with a concerned look on ${his} face.`);
				switch (slave.sexualFlaw) {
					case "hates oral":
						r.push(`${He} slowly gestures if blowjobs are popular there while swallowing nervously. ${His} lower lip starts to quiver, and ${he} does ${his} best not to cry in front of you.`);
						break;
					case "hates anal":
						r.push(`${He} slowly gestures if anal is popular there and`);
						if (!hasAnyArms(slave)) {
							r.push(`shifts uncomfortably, unconsciously trying to shield ${his} rear as best ${he} can manage without`);
							if (isAmputee(slave)) {
								r.push(`limbs.`);
							} else {
								r.push(`hands.`);
							}
						} else {
							r.push(`unconsciously reaches around behind ${himself}, not quite shielding ${his} anus with ${his} ${hands}.`);
						}
						r.push(`${His} lower lip quivers, and ${he} does ${his} best not to cry in front of you.`);
						break;
					case "hates penetration":
						r.push(`${He} slowly gestures that ${he} understands that customers will expect to fuck ${him} and`);
						if (!hasAnyArms(slave)) {
							r.push(`shifts uncomfortably, unconsciously trying to shield ${his} rear as best ${he} can manage without`);
							if (isAmputee(slave)) {
								r.push(`limbs.`);
							} else {
								r.push(`hands.`);
							}
						} else if (slave.vagina > 0) {
							r.push(`unconsciously lets ${his} ${hands} fall to ${his} crotch, but catches ${himself} and doesn't quite shield ${his} pussy.`);
						} else {
							r.push(`unconsciously reaches around behind ${himself}, not quite shielding ${his} anus with ${his} ${hands}.`);
						}
						r.push(`${His} lower lip quivers, and ${he} does ${his} best not to cry in front of you.`);
						break;
					case "repressed":
						r.push(`${He} shakily gestures that ${he}'ll be a sinner, but if that's what you want, ${he}'ll do it. ${He} starts to cry quietly.`);
						break;
					case "idealistic":
						r.push(`${He} shakily gestures that ${he}'ll do ${his} best to please any men that use ${him}. ${He} starts to cry quietly.`);
						break;
					case "shamefast":
						r.push(`${He} shakily gestures that ${he}'ll do ${his} best to use ${his} naked body to attract men and entice passersby. ${He} starts to cry quietly.`);
						break;
					case "apathetic":
						r.push(`${He} shakily gestures that ${he}'ll do ${his} best to take cock. ${He} starts to cry quietly.`);
						break;
					case "crude":
						r.push(`${He} gestures that ${his} body is going to become so foul after a day's worth of fucks. ${He} pauses for a moment, doubtful over whether ${he} should have said that or not.`);
						break;
					case "judgemental":
						r.push(`${He} gestures ${his} disappointment that only the most pathetic of losers will be fucking ${him} now. ${He} pauses for a moment, doubtful over whether ${he} should have said that or not.`);
				}
			} else {
				r.push(`${He} puts on a brave face and gestures that ${he}'ll do ${his} best. As you send ${him} off, you catch sight of ${him} trying to reassure ${himself}.`);
			}
		}
	} else if (slave.trust < -20) {
		if (canTalk(slave)) {
			if (slave.sexualFlaw !== "none") {
				r.push(
					Spoken(slave, `"Yes, ${Master},"`),
					`${he} says automatically. ${He}'s badly frightened, and says in a small voice, half to ${himself},`
				);
				switch (slave.sexualFlaw) {
					case "hates oral":
						r.push(
							Spoken(slave, `"I — I'm going to h-have to suck a lot of dick, aren't I."`),
							`${He} swallows and tries to control ${himself} out of fear, but finally gasps out,`,
							Spoken(slave, `"Oh God, I'm scared," and bursts into tears.`)
						);
						break;
					case "hates anal":
						r.push(
							Spoken(slave, `"C-customers are really going to ream me up the butt hole, aren't they."`),
							`${He}`
						);
						if (!hasAnyArms(slave)) {
							r.push(`shifts uncomfortably, unconsciously trying to shield ${his} rear as best ${he} can manage without`);
							if (isAmputee(slave)) {
								r.push(`limbs.`);
							} else {
								r.push(`hands.`);
							}
						} else {
							r.push(`unconsciously reaches around behind ${himself}, not quite shielding ${his} anus with ${his} ${hands}.`);
						}
						r.push(
							`${His} lower lip quivers and ${he} tries to control ${himself} out of fear, but finally gasps out,`,
							Spoken(slave, `"Oh God, I'm scared,"`),
							`and bursts into tears.`
						);
						break;
					case "hates penetration":
						r.push(
							Spoken(slave, `"C-customers are really going to fuck me sore, aren't they."`),
							`${He}`
						);
						if (!hasAnyArms(slave)) {
							r.push(`shifts uncomfortably, unconsciously trying to shield ${his} rear as best ${he} can manage without`);
							if (isAmputee(slave)) {
								r.push(`limbs.`);
							} else {
								r.push(`hands.`);
							}
						} else if (slave.vagina > 0) {
							r.push(`unconsciously lets ${his} ${hands} fall to ${his} crotch, but catches ${himself} and doesn't quite shield ${his} pussy.`);
						} else {
							r.push(`unconsciously reaches around behind ${himself}, not quite shielding ${his} anus with ${his} ${hands}.`);
						}
						r.push(
							`${His} lower lip quivers, and ${he} tries to control ${himself} out of fear, but finally gasps out,`,
							Spoken(slave, `"Oh God, I'm scared,"`),
							`and bursts into tears.`
						);
						break;
					case "repressed":
						r.push(
							Spoken(slave, `"Being a whore is a sin,"`),
							`${he} ${say}s quietly, half to ${himself}.`,
							Spoken(slave, `"I'm going t-to b-be so dirty. I'm going to h-hell."`),
							`${He} starts to cry quietly. ${He} tries to get ${himself} back under control, out of fear, but finally wails,`,
							Spoken(slave, `"Oh God, I'm sorry, p-please forgive me God,"`),
							`and dissolves into sobbing.`
						);
						break;
					case "idealistic":
						r.push(
							Spoken(slave, `"I'm going to be sold for sex,"`),
							`${he} ${say}s quietly, half to ${himself}.`,
							Spoken(slave, `"Men are going to pay, and then they're g-going to stick their dicks in me, and then they're going to leave."`),
							`${He} starts to cry openly.`,
							Spoken(slave, `"S-sorry, ${Master}. P-please don't beat me. I'll do it."`)
						);
						break;
					case "shamefast":
						r.push(
							Spoken(slave, `"I'm going to be meat in a brothel,"`),
							`${he} ${say}s quietly, half to ${himself}.`,
							Spoken(slave, `"I'm going to stand there naked with the other slaves, and men will pick me and then use my body. Over and over."`),
							`${He} starts to cry openly.`,
							Spoken(slave, `"S-sorry, ${Master}. P-please don't beat me. I'll do it."`)
						);
						break;
					case "apathetic":
						r.push(
							Spoken(slave, `"I guess I'll lie there,"`),
							`${he} sighs quietly, half to ${himself}.`,
							Spoken(slave, `"A man will pay and then he'll come into my room where I'm lying on the bed, and he'll stick his cock in me and cum and leave. And then the next man will come in."`),
							`${He} starts to cry quietly. "S-sorry, ${Master}. P-please don't beat me. I'll let it happen."`
						);
						break;
					case "crude":
						r.push(
							Spoken(slave, `"Okay,"`),
							`${he} ${say}s, thinking.`,
							Spoken(slave, `"My poor cornhole is going to be such a seminal sewer."`),
							`${He} looks doubtful.`,
							Spoken(slave, `"Should I not have said that, ${Master}?"`)
						);
						break;
					case "judgemental":
						r.push(
							Spoken(slave, `"Gross,"`),
							`${he} ${say}s curtly.`,
							Spoken(slave, `"Well, no more handsome boys for me, then. Fat pathetic guys who patronize whores, all the way down. Fuck."`)
						);
				}
			} else {
				r.push(
					`${He} does ${his} best to control ${himself} and avoid punishment.`,
					Spoken(slave, `"${Master}, I will."`),
					`${He} holds ${himself} together until you dismiss ${him}; as ${he} turns away to go, the tears come fast, and ${he} almost runs into the door frame on ${his} way out${(canSee(slave)) ? ", blind with weeping" : ""}.`
				);
			}
		} else {
			if (slave.sexualFlaw !== "none") {
				r.push(`${He} automatically gestures consent. ${He}'s badly frightened, and gingerly continues`);
				switch (slave.sexualFlaw) {
					case "hates oral":
						r.push(`by asking if ${he}'ll have to suck a lot of dick. ${He} swallows and tries to control ${himself} out of fear, but finally loses composure and bursts into tears.`);
						break;
					case "hates anal":
						r.push(`by asking if ${he}'ll be assfucked a lot. ${He}`);
						if (!hasAnyArms(slave)) {
							r.push(`shifts uncomfortably, unconsciously trying to shield ${his} rear as best ${he} can manage without`);
							if (isAmputee(slave)) {
								r.push(`limbs.`);
							} else {
								r.push(`hands.`);
							}
						} else {
							r.push(`unconsciously reaches around behind ${himself}, not quite shielding ${his} anus with ${his} ${hands}.`);
						}
						r.push(`${His} lower lip quivers and ${he} tries to control ${himself} out of fear, but finally loses composure and bursts into tears.`);
						break;
					case "hates penetration":
						r.push(`by asking if ${he}'s going to be constantly fucked. ${He}`);
						if (!hasAnyArms(slave)) {
							r.push(`shifts uncomfortably, unconsciously trying to shield ${his} rear as best ${he} can manage without`);
							if (isAmputee(slave)) {
								r.push(`limbs.`);
							} else {
								r.push(`hands.`);
							}
						} else if (slave.vagina > 0) {
							r.push(`unconsciously lets ${his} ${hands} fall to ${his} crotch, but catches ${himself} and doesn't quite shield ${his} pussy.`);
						} else {
							r.push(`unconsciously reaches around behind ${himself}, not quite shielding ${his} anus with ${his} ${hands}.`);
						}
						r.push(`${His} lower lip quivers, and ${he} tries to control ${himself} out of fear, but finally loses composure and bursts into tears.`);
						break;
					case "repressed":
						r.push(`that being a whore is a sin. ${He} starts to cry quietly. ${He} tries to get ${himself} back under control, out of fear, but finally wails and dissolves into prayers intermixed with sobbing.`);
						break;
					case "idealistic":
						r.push(`that sex should be with the one you love, not random men. ${He} starts to cry openly while begging you not to beat ${him}.`);
						break;
					case "shamefast":
						r.push(`that ${he} doesn't want to be naked in a line up for men to choose from. ${He} starts to cry openly while begging you not to beat ${him}.`);
						break;
					case "apathetic":
						r.push(`that all ${he} has to do is lie there and take it. ${He} starts to cry quietly.`);
						break;
					case "crude":
						r.push(`by asking if men enjoy fucking a thoroughly seeded hole. ${He} pauses for a moment, doubtful over whether ${he} should have said that or not.`);
						break;
					case "judgemental":
						r.push(`by expressing ${his} disappointment with the type of men that frequent brothels.`);
				}
			} else {
				r.push(
					`${He} does ${his} best to control ${himself} and avoid punishment, nodding ${his} head. ${He} holds ${himself} together until you dismiss ${him}; as ${he} turns away to go, the tears come fast, and ${he} almost runs into the door frame on ${his} way out${(canSee(slave)) ? ", blind with weeping" : ""}.`);
			}
		}
	} else {
		r.push(`${He} manages to`);
		if (canTalk(slave)) {
			r.push(
				`get`,
				Spoken(slave, `"Oh fuck n-"`),
				`out`
			);
		} else if (hasAnyArms(slave)) {
			r.push(`flip you an incredibly rude gesture`);
		} else {
			r.push(`get an incredibly rude gesture out`);
		}
		r.push(`before the compliance systems activate and ${he}'s poleaxed to the ground. Anticipating this, you had`);
		if (V.MadamID !== 0) {
			r.push(S.Madam.slaveName);
		} else {
			r.push(`another, more obedient slave`);
		}
		r.push(`standing by to haul ${him} away. It'll take a couple of hundred customers, but being sold in a brothel for rape should knock the resistance out of ${him}.`);
	}
	App.Events.addParagraph(node, r);
	return node;
};
