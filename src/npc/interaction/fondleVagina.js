/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fondleVagina = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	const {title: Master, say: say} = getEnunciation(slave);

	r.push(`You call ${him} over so you can fondle ${his}`);
	if (slave.vagina > 3) {
		r.push(`gaping vagina.`);
	} else if (slave.vagina === 3) {
		r.push(`loose vagina.`);
	} else if (slave.vagina === 2) {
		r.push(`well-used pussy.`);
	} else if (slave.vagina === 1) {
		r.push(`tight pussy.`);
	} else if (slave.vagina === 0) {
		r.push(`virgin pussy.`);
	}

	if (slave.vaginaTat === "tribal patterns") {
		r.push(`The tattoos on ${his} abdomen certainly draw attention there.`);
	} else if (slave.vaginaTat === "lewd crest") {
		r.push(`The crest on ${his} abdomen invokes lewd thoughts, after all.`);
	}

	if (slave.devotion <= 20) {
		if (slave.clit === 1) {
			r.push(`${His} big clit peeks out from under its hood`);
		} else if (slave.clit === 2) {
			r.push(`${His} huge clit is impossible to miss`);
		} else if (slave.clit > 1) {
			r.push(`${His} pseudophallus-sized clit is soft`);
		} else if (slave.chastityPenis) {
			r.push(`${His} useless penis is properly caged`);
		} else if (slave.dick > 0) {
			r.push(`${His} dick is soft`);
		} else {
			r.push(`${His} pretty little clit is barely visible`);
		}
		r.push(`and`);
		if (slave.labia === 1) {
			r.push(`${his} lovely petals are quite inviting.`);
		} else if (slave.labia === 2) {
			r.push(`${his} prominent petals are inviting.`);
		} else if (slave.labia > 1) {
			r.push(`${his} labia are so large they present a slight obstacle to entry.`);
		} else {
			r.push(`${his} cute labia are barely noticeable.`);
		}
	} else {
		if (slave.clit === 1) {
			r.push(`${His} big clit peeks out from under its hood`);
		} else if (slave.clit === 2) {
			r.push(`${His} huge clit is impossible to miss`);
		} else if (slave.clit > 1) {
			r.push(`${His} pseudophallus-sized clit is soft`);
		} else if (slave.chastityPenis) {
			r.push(`${His} chastity cage is uncomfortably full`);
		} else if (canAchieveErection(slave)) {
			r.push(`${His} dick vies for attention`);
		} else if (slave.dick > 0) {
			r.push(`${His} soft dick dribbles excitedly`);
		} else {
			r.push(`${His} pretty little clit is ready for you,`);
		}
		r.push(`and`);
		if (slave.labia === 1) {
			r.push(`${his} lovely petals are moist with arousal.`);
		} else if (slave.labia === 2) {
			r.push(`${his} prominent petals bear a sheen of arousal.`);
		} else if (slave.labia > 1) {
			r.push(`${his} huge labia are almost dripping with arousal.`);
		} else {
			r.push(`${he}'s becoming moist.`);
		}
	}

	if (slave.piercing.vagina.weight > 1 && slave.piercing.genitals.weight > 0) {
		r.push(`${His} pierced lips and clit have ${his} nice and wet.`);
	} else if (slave.piercing.genitals.weight > 0) {
		r.push(`${His} pierced clit has ${him} nice and moist.`);
	}

	if (slave.vagina === 0) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} accepts your orders dumbly and presents ${his} virgin pussy to you,`);
			if (canSee(slave)) {
				r.push(`watching your hands move towards ${him}`);
			} else {
				r.push(`waiting`);
			}
			r.push(`without any real interest. You`);
			if (slave.balls >= 60) {
				r.push(`struggle to shove ${his} oversized nuts out of the way and`);
			} else if (slave.balls >= 30) {
				r.push(`struggle to lift ${his} oversized nuts and`);
			} else if (slave.balls >= 14) {
				r.push(`palm one of ${his} giant testicles and`);
			} else if (slave.balls >= 9) {
				r.push(`cup ${his} huge balls and`);
			} else if (slave.balls >= 5) {
				r.push(`lift ${his} big balls out of the way and`);
			} else if (slave.scrotum > 0) {
				r.push(`reach under ${his} dangling scrotum and`);
			}
			r.push(`gently trace along ${his}`);
			if (slave.labia === 1) {
				r.push(`lovely petals`);
			} else if (slave.labia === 2) {
				r.push(`prominent petals`);
			} else if (slave.labia > 1) {
				r.push(`huge labia`);
			}
			r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. You occasionally flick ${his}`);
			if (slave.clit === 1) {
				r.push(`erect clit`);
			} else if (slave.clit === 2) {
				r.push(`large clit`);
			} else if (slave.clit > 1) {
				r.push(`massive clit`);
			} else if (slave.chastityPenis) {
				r.push(`${his} cage`);
			} else if (canAchieveErection(slave)) {
				r.push(`${his} erection`);
			} else if (slave.dick > 0) {
				r.push(`soft dick`);
			} else {
				r.push(`pretty little clit`);
			}
			r.push(`and rub it with your fingertips as your hand nears it but outside of the pussy juices`);
			if (hasAnyLegs(slave)) {
				r.push(`trickling down ${his} leg,`);
			} else {
				r.push(`pooling beneath ${him},`);
			}
			r.push(`${he} does not respond. Since ${he} is mindbroken, ${his} responses to you are purely physiological and your actions have no affect on ${him} mentally.`);
		} else if (slave.devotion > 50) {
			r.push(`${He} accepts your orders happily and presents ${his} virgin pussy to you,`);
			if (slave.scrotum > 0) {
				r.push(`shifting ${his} balls out of the way and`);
			}
			if (canSee(slave)) {
				r.push(`watching your hands with eagerness.`);
			} else {
				r.push(`eagerly awaiting your touch.`);
			}
			r.push(`${He} gasps and quivers with pleasure as you gently trace along ${his}`);
			if (slave.labia === 1) {
				r.push(`lovely petals`);
			} else if (slave.labia === 2) {
				r.push(`prominent petals`);
			} else if (slave.labia > 1) {
				r.push(`huge labia`);
			} else {
				r.push(`cute labia`);
			}
			r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements.`);
			if (hasAnyArms(slave)) {
				if (slave.fetish === "boobs") {
					r.push(`${He} fondles ${his} breasts and plays with ${his} nipples at the same time.`);
				} else if ((slave.fetish === "pregnancy") && slave.belly >= 1500) {
					r.push(`${He} strokes the curve of ${his} belly at the same time.`);
				}
			}
			r.push(`You occasionally`);
			if (slave.clit === 1) {
				r.push(`flick ${his} large clit and rub it with your fingertips`);
			} else if (slave.clit === 2) {
				r.push(`flick ${his} huge clit and rub it with your fingertips`);
			} else if (slave.clit > 1) {
				r.push(`flick ${his} massive clit and rub it with your fingertips`);
			} else if (slave.chastityPenis) {
				r.push(`caress ${his} chastity cage with your palm`);
			} else if (canAchieveErection(slave)) {
				r.push(`flick ${his} erection and give it a stroke`);
			} else if (slave.dick > 0) {
				r.push(`flick ${his} soft dick and rub it with your fingertips`);
			} else {
				r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
			}
			r.push(`as your hand nears it. As ${he} becomes more aroused, ${he}`);
			if (hasAnyArms(slave)) {
				r.push(`grabs hold of your wrist lightly, moving ${his} hands along with the motion of your own.`);
			} else {
				r.push(`begins to move ${his} body to the rhythm of your motions.`);
			}
			r.push(`${His} pussy juices`);
			if (hasAnyLegs(slave)) {
				r.push(`run down ${his} leg`);
			} else {
				r.push(`pool beneath ${him}`);
			}
			r.push(`as ${he} begins to moan audibly${hasAnyLegs(slave) ? `, gently clamping your hand between ${his} thighs` : ``} as you continue to move your hand along ${his} pussy. ${He} moans loudly as ${he} shudders in orgasmic joy.`);
			if (!hasAnyArms(slave) && !canTalk(slave)) {
				r.push(`${He} does ${his} best to communicate love with ${his} ${App.Desc.eyesColor(slave)}.`);
			} else if (!canTalk(slave)) {
				r.push(`${He} signs that ${he} loves you.`);
			} else {
				r.push(
					Spoken(slave, `"I love you, ${Master},"`),
					`${he} ${say}s rapturously.`
				);
			}
		} else if (slave.devotion > 20) {
			r.push(`${He} accepts your orders without comment and presents ${his} virgin pussy to you,`);
			if (slave.scrotum > 0) {
				r.push(`shifting ${his} balls out of the way and`);
			}
			if (canSee(slave)) {
				r.push(`watching your hands with some slight trepidation.`);
			} else {
				r.push(`nervously anticipating your touch.`);
			}
			r.push(`${He} gasps as you gently trace along ${his}`);
			if (slave.labia === 1) {
				r.push(`lovely petals`);
			} else if (slave.labia === 2) {
				r.push(`prominent petals`);
			} else if (slave.labia > 1) {
				r.push(`huge labia`);
			}
			r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. You occasionally`);
			if (slave.clit === 1) {
				r.push(`flick ${his} large clit and rub it with your fingertips`);
			} else if (slave.clit === 2) {
				r.push(`flick ${his} huge clit and rub it with your fingertips`);
			} else if (slave.clit > 1) {
				r.push(`flick ${his} massive clit and rub it with your fingertips`);
			} else if (slave.chastityPenis) {
				r.push(`caress ${his} chastity cage with your palm`);
			} else if (canAchieveErection(slave)) {
				r.push(`flick ${his} erection and give it a stroke`);
			} else if (slave.dick > 0) {
				r.push(`flick ${his} soft dick and rub it with your fingertips`);
			} else {
				r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
			}
			r.push(`as your hand nears it. ${His} pussy juices`);
			if (hasAnyLegs(slave)) {
				r.push(`run down ${his} leg`);
			} else {
				r.push(`pool beneath ${him}`);
			}
			r.push(`as ${he} begins to moan`);
			if (hasAnyArms(slave)) {
				r.push(`audibly, grasping your wrist with ${his} ${hasBothArms(slave) ? `hands` : `hand`} tightly`);
			} else {
				r.push(`audibly`);
			}
			if (hasAnyLegs(slave)) {
				r.push(`and clamping ${his} thighs together`);
			}
			r.push(`as you continue to move your hand along ${his} pussy. ${He} moans as ${he} shudders in an orgasm, almost embarrassed.`);
			if (canSee(slave)) {
				r.push(`${He} looks into your eyes expectantly.`);
			} else {
				r.push(`${He} pants expectantly, bracing for more.`);
			}
		} else if (slave.devotion >= -20) {
			r.push(`${He} clearly dislikes the thought of getting fondled by you. ${His} lower lip quivers with trepidation as ${he}`);
			if (canSee(slave)) {
				r.push(`watches your hands move towards ${him}.`);
			} else {
				r.push(`waits for your hand to touch ${him}.`);
			}
			r.push(`${He} has no choice but to`);
			if (slave.scrotum > 0) {
				r.push(`shift ${his} balls out of the way and`);
			}
			r.push(`obey if ${he} wants to avoid punishment. ${He} gasps and shakes as you gently trace along ${his}`);
			if (slave.labia === 1) {
				r.push(`lovely petals`);
			} else if (slave.labia === 2) {
				r.push(`prominent petals`);
			} else if (slave.labia > 1) {
				r.push(`huge labia`);
			} else {
				r.push(`cute labia`);
			}
			r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. You occasionally`);
			if (slave.clit === 1) {
				r.push(`flick ${his} large clit and rub it with your fingertips`);
			} else if (slave.clit === 2) {
				r.push(`flick ${his} huge clit and rub it with your fingertips`);
			} else if (slave.clit > 1) {
				r.push(`flick ${his} massive clit and rub it with your fingertips`);
			} else if (slave.chastityPenis) {
				r.push(`caress ${his} chastity cage with your palm`);
			} else if (canAchieveErection(slave)) {
				r.push(`flick ${his} growing erection and give it a stroke`);
			} else if (slave.dick > 0) {
				r.push(`flick ${his} soft dick and rub it with your fingertips`);
			} else {
				r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
			}
			r.push(`as your hand nears it. ${His} pussy juices`);
			if (hasAnyLegs(slave)) {
				r.push(`run down ${his} leg`);
			} else {
				r.push(`pool beneath ${him}`);
			}
			r.push(`as ${he} begins to moan`);
			if (hasAnyArms(slave)) {
				r.push(`audibly, grasping your wrist with ${his} ${hasBothArms(slave) ? `hands` : `hand`} tightly`);
			} else {
				r.push(`audibly`);
			}
			if (hasBothLegs(slave)) {
				r.push(`and clamping ${his} thighs together`);
			}
			r.push(`as you continue to move your hand along ${his} pussy. ${He} moans as ${he} shudders in an orgasm, clearly embarrassed to end up in this position as ${he} loses control.`);
		} else {
			r.push(`As you anticipated, ${he} refuses to let ${himself} be groped by you. ${He} is unable to resist you, also as you expected, when you mention some of the alternatives. ${He} gasps and shakes as you gently trace along ${his}`);
			if (slave.labia === 1) {
				r.push(`lovely petals`);
			} else if (slave.labia === 2) {
				r.push(`prominent petals`);
			} else if (slave.labia > 1) {
				r.push(`huge labia`);
			} else {
				r.push(`cute labia`);
			}
			r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements.`);
			if (hasAnyArms(slave)) {
				r.push(`${He} grabs your wrist with ${his} ${(hasBothArms(slave)) ? "hands" : "hand"}in an effort to stop you but ${he} is unable to stop your hand from moving for long.`);
			}
			r.push(`You occasionally`);
			if (slave.clit === 1) {
				r.push(`flick ${his} large clit and rub it with your fingertips`);
			} else if (slave.clit === 2) {
				r.push(`flick ${his} huge clit and rub it with your fingertips`);
			} else if (slave.clit > 1) {
				r.push(`flick ${his} massive clit and rub it with your fingertips`);
			} else if (slave.chastityPenis) {
				r.push(`caress ${his} chastity cage with your palm`);
			} else if (canAchieveErection(slave)) {
				r.push(`flick ${his} unwilling erection and give it a stroke`);
			} else if (slave.dick > 0) {
				r.push(`flick ${his} soft dick and rub it with your fingertips`);
			} else {
				r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
			}
			r.push(`as your hand nears it. ${He}`);
			if (hasAnyArms(slave)) {
				r.push(`tightly grasps your wrist`);
				if (hasBothLegs(slave)) {
					r.push(`and`);
				}
			}
			if (hasBothLegs(slave)) {
				r.push(`clamps ${his} thighs together`);
			}
			if (!hasAnyArms(slave) && !hasBothLegs(slave)) {
				r.push(`squirms uncomfortably a little`);
			}
			r.push(`as you continue to move your hand along ${his} pussy. ${He} moans as ${he} shudders in an orgasm, gripping tighter and shamefully`);
			if (canSee(slave)) {
				r.push(`looking at`);
			} else {
				r.push(`facing`);
			}
			r.push(`you as you stop moving your hand.`);
		}
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`Like a doll, ${he} dumbly remains still,`);
		if (canSee(slave)) {
			r.push(`watching your hands move towards ${him}`);
		} else {
			r.push(`waiting`);
		}
		r.push(`without any real interest. You`);
		if (slave.balls >= 60) {
			r.push(`struggle to shove ${his} oversized nuts out of the way and`);
		} else if (slave.balls >= 30) {
			r.push(`struggle to lift ${his} oversized nuts and`);
		} else if (slave.balls >= 14) {
			r.push(`palm one of ${his} giant testicles and`);
		} else if (slave.balls >= 9) {
			r.push(`cup ${his} huge balls and`);
		} else if (slave.balls >= 5) {
			r.push(`lift ${his} big balls out of the way and`);
		} else if (slave.scrotum > 0) {
			r.push(`reach under ${his} dangling scrotum and`);
		}
		r.push(`gently trace along ${his}`);
		if (slave.labia === 1) {
			r.push(`lovely petals`);
		} else if (slave.labia === 2) {
			r.push(`prominent petals`);
		} else if (slave.labia > 1) {
			r.push(`huge labia`);
		} else {
			r.push(`cute labia`);
		}
		r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. You occasionally flick ${his}`);
		if (slave.clit === 1) {
			r.push(`erect clit`);
		} else if (slave.clit === 2) {
			r.push(`large clit`);
		} else if (slave.clit > 1) {
			r.push(`massive clit`);
		} else if (slave.chastityPenis) {
			r.push(`${his} cage`);
		} else if (canAchieveErection(slave)) {
			r.push(`${his} erection`);
		} else if (slave.dick > 0) {
			r.push(`soft dick`);
		} else {
			r.push(`pretty little clit`);
		}
		r.push(`and rub it with your fingertips as your hand nears it. Except for the pussy juices`);
		if (hasAnyLegs(slave)) {
			r.push(`trickling down ${his} leg,`);
		} else {
			r.push(`pooling beneath ${him},`);
		}
		r.push(`${he} does not respond. Since ${he} is mindbroken, ${his} responses to you are purely physiological and your actions have no affect on ${him} mentally. You leave your toy for one of your other slaves to clean and maintain.`);
	} else if (isAmputee(slave)) {
		r.push(`Since ${he}'s a quadruple amputee, ${he}'s yours to use as a human finger toy. While ${he}'s lying there helpless, you move your hands towards`);
		if (slave.balls >= 60) {
			r.push(`${him} and struggle to shove ${his} oversized nuts out of the way.`);
		} else if (slave.balls >= 30) {
			r.push(`${him} and strain to lift ${his} oversized nuts out of the way.`);
		} else if (slave.balls >= 14) {
			r.push(`${him}, palming one of ${his} giant testicles to make way.`);
		} else if (slave.balls >= 9) {
			r.push(`${him}, cupping ${his} huge balls to keep them out of the way.`);
		} else if (slave.balls >= 5) {
			r.push(`${him}, lifting ${his} big balls out of the way in the process.`);
		} else if (slave.scrotum > 0) {
			r.push(`${him}, slipping under ${his} dangling scrotum in the process.`);
		} else {
			r.push(`${him}.`);
		}
		r.push(`You gently trace along ${his}`);
		if (slave.labia === 1) {
			r.push(`lovely petals`);
		} else if (slave.labia === 2) {
			r.push(`prominent petals`);
		} else if (slave.labia > 1) {
			r.push(`huge labia`);
		} else {
			r.push(`cute labia`);
		}
		r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. You occasionally`);
		if (slave.clit === 1) {
			r.push(`flick ${his} large clit and rub it with your fingertips`);
		} else if (slave.clit === 2) {
			r.push(`flick ${his} huge clit and rub it with your fingertips`);
		} else if (slave.clit > 1) {
			r.push(`flick ${his} massive clit and rub it with your fingertips`);
		} else if (slave.chastityPenis) {
			r.push(`caress ${his} chastity cage with your palm`);
		} else if (canAchieveErection(slave)) {
			r.push(`flick ${his} erection and give it a stroke`);
		} else if (slave.dick > 0) {
			r.push(`flick ${his} soft dick and rub it with your fingertips`);
		} else {
			r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
		}
		r.push(`as your hand nears it. Soon ${he} shudders in an orgasm,`);
		if (canSee(slave)) {
			r.push(`looking at`);
		} else {
			r.push(`facing`);
		}
		r.push(`you as you stop moving your hand. You leave your toy for one of your other slaves to clean and maintain.`);
	} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} comes submissively over, smiling a little submissive smile, and points ${his} pussy towards you${(slave.scrotum > 0) ? `, shifting ${his} balls out of the way and` : ``}. You gently trace along ${his}`);
		if (slave.labia === 1) {
			r.push(`lovely petals`);
		} else if (slave.labia === 2) {
			r.push(`prominent petals`);
		} else if (slave.labia > 1) {
			r.push(`huge labia`);
		} else {
			r.push(`cute labia`);
		}
		r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. You occasionally`);
		if (slave.clit === 1) {
			r.push(`flick ${his} large clit and rub it with your fingertips`);
		} else if (slave.clit === 2) {
			r.push(`flick ${his} huge clit and rub it with your fingertips`);
		} else if (slave.clit > 1) {
			r.push(`flick ${his} massive clit and rub it with your fingertips`);
		} else if (slave.chastityPenis) {
			r.push(`caress ${his} chastity cage with your palm`);
		} else if (canAchieveErection(slave)) {
			r.push(`flick ${his} erection and give it a stroke`);
		} else if (slave.dick > 0) {
			r.push(`flick ${his} soft dick and rub it with your fingertips`);
		} else {
			r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
		}
		r.push(`as your hand nears it. ${He} begs you not to stop as ${he}`);
		if (canSee(slave)) {
			r.push(`looks into your eyes`);
		} else {
			r.push(`faces`);
		}
		r.push(`expectantly as ${he} shudders in an orgasm.`);
	} else if (slave.devotion < -20) {
		r.push(`${He} tries to refuse, so you push the disobedient slave down`);
		if (canStand(slave)) {
			r.push(`over your desk`);
		}
		r.push(`as you move your hands towards ${him}. You gently`);
		if (slave.scrotum > 0) {
			r.push(`shift ${his} balls out of the way and`);
		}
		r.push(`trace along ${his}`);
		if (slave.labia === 1) {
			r.push(`lovely petals`);
		} else if (slave.labia === 2) {
			r.push(`prominent petals`);
		} else if (slave.labia > 1) {
			r.push(`huge labia`);
		} else {
			r.push(`cute labia`);
		}
		r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. ${He}`);
		if (hasAnyArms(slave)) {
			r.push(`grabs your wrist`);
		} else {
			r.push(`twists and turns`);
		}
		r.push(`to try to stop you but ${he} is unable to. You occasionally`);
		if (slave.clit === 1) {
			r.push(`flick ${his} large clit and rub it with your fingertips`);
		} else if (slave.clit === 2) {
			r.push(`flick ${his} huge clit and rub it with your fingertips`);
		} else if (slave.clit > 1) {
			r.push(`flick ${his} massive clit and rub it with your fingertips`);
		} else if (slave.chastityPenis) {
			r.push(`caress ${his} chastity cage with your palm`);
		} else if (canAchieveErection(slave)) {
			r.push(`flick ${his} unwilling erection and give it a stroke`);
		} else if (slave.dick > 0) {
			r.push(`flick ${his} soft dick and rub it with your fingertips`);
		} else {
			r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
		}
		r.push(`as your hand nears it, despite ${his} resistant pulling against you. ${He} bites ${his} lip but ${he} cannot help but moan and ${he} shudders in an orgasm. ${He}`);
		if (canSee(slave)) {
			r.push(`looks at you`);
		} else {
			r.push(`faces`);
		}
		r.push(`shamefully as you stop moving your hand.`);
	} else if (slave.devotion <= 20) {
		r.push(`${He} obeys silently,`);
		if (canStand(slave)) {
			r.push(`standing`);
		} else {
			r.push(`resting`);
		}
		r.push(`in front of you as you move your hands towards ${him}. You gently`);
		if (slave.scrotum > 0) {
			r.push(`shift ${his} balls out of the way and`);
		}
		r.push(`trace along ${his}`);
		if (slave.labia === 1) {
			r.push(`lovely petals`);
		} else if (slave.labia === 2) {
			r.push(`prominent petals`);
		} else if (slave.labia > 1) {
			r.push(`huge labia`);
		} else {
			r.push(`cute labia`);
		}
		r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. You occasionally`);
		if (slave.clit === 1) {
			r.push(`flick ${his} large clit and rub it with your fingertips`);
		} else if (slave.clit === 2) {
			r.push(`flick ${his} huge clit and rub it with your fingertips`);
		} else if (slave.clit > 1) {
			r.push(`flick ${his} massive clit and rub it with your fingertips`);
		} else if (slave.chastityPenis) {
			r.push(`caress ${his} chastity cage with your palm`);
		} else if (canAchieveErection(slave)) {
			r.push(`flick ${his} growing erection and give it a stroke`);
		} else if (slave.dick > 0) {
			r.push(`flick ${his} soft dick and rub it with your fingertips`);
		} else {
			r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
		}
		r.push(`as your hand nears it. ${He}`);
		if (canSee(slave)) {
			r.push(`looks into your eyes`);
		} else {
			r.push(`faces you`);
		}
		r.push(`furtively while ${he}`);
		if (hasAnyArms(slave)) {
			r.push(`grabs your wrist with ${his} hand`);
			if (hasBothLegs(slave)) {
				r.push(`and`);
			}
		}
		if (hasBothLegs(slave)) {
			r.push(`squeezes ${his} thighs together`);
		}
		if (!hasAnyArms(slave) && !hasBothLegs(slave)) {
			r.push(`squirms a little`);
		}
		r.push(`as ${he} moans and shudders in an orgasm. ${He} dutifully`);
		if (canSee(slave)) {
			r.push(`looks at you`);
		} else {
			r.push(`faces`);
		}
		r.push(`as you stop moving your hand.`);
	} else {
		r.push(`${He} devotedly`);
		if (canMove(slave)) {
			r.push(`comes over and gives you an impassioned kiss. ${He}`);
		}
		r.push(`smiles${(slave.scrotum > 0) ? `, shifts ${his} balls to the side,` : ``} and points ${his} pussy towards you. You gently trace along ${his}`);
		if (slave.labia === 1) {
			r.push(`lovely petals`);
		} else if (slave.labia === 2) {
			r.push(`prominent petals`);
		} else if (slave.labia > 1) {
			r.push(`huge labia`);
		} else {
			r.push(`cute labia`);
		}
		r.push(`with your outstretched fingers, strumming up and down the edges of ${his} pussylips, then softly rub your fingers along the inner walls with a tender touch, starting slow but gradually increasing the speed of your movements. You occasionally`);
		if (slave.clit === 1) {
			r.push(`flick ${his} large clit and rub it with your fingertips`);
		} else if (slave.clit === 2) {
			r.push(`flick ${his} huge clit and rub it with your fingertips`);
		} else if (slave.clit > 1) {
			r.push(`flick ${his} massive clit and rub it with your fingertips`);
		} else if (slave.chastityPenis) {
			r.push(`caress ${his} chastity cage with your palm`);
		} else if (canAchieveErection(slave)) {
			r.push(`flick ${his} erection and give it a stroke`);
		} else if (slave.dick > 0) {
			r.push(`flick ${his} soft dick and rub it with your fingertips`);
		} else {
			r.push(`flick ${his} pretty little clit and rub it with your fingertips`);
		}
		r.push(`as your hand nears it. ${He}`);
		if (hasAnyLegs(slave)) {
			r.push(`squeezes ${his} thighs${hasBothLegs(slave) ? `s` : ``}`);
		} else {
			r.push(`pushes`);
		}
		r.push(`lightly against your hand as ${he} moans and shudders in orgasmic bliss. ${He}`);
		if (canSee(slave)) {
			r.push(`looks at you`);
		} else {
			r.push(`faces`);
		}
		r.push(`passionately as you stop moving your hand.`);
	}
	App.Events.addParagraph(node, r);
	return node;
};
