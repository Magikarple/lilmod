// cSpell:ignore flix

App.Events.RESSLazyEvening = class RESSLazyEvening extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				hasAnyArms,
				s => (s.assignment === Job.FUCKTOY || s.assignment === Job.MASTERSUITE || s.assignment === Job.CONCUBINE),
				s => s.devotion > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, hers, him, himself, girl, woman
		} = getPronouns(eventSlave);
		const {title} = getEnunciation(eventSlave);

		/** @param {App.Entity.SlaveState} slave */
		function getSceneClothes(slave) {
			if (getLimbCount(slave, 102) > 2) {
				return "an oversized t-shirt";
			} else if (slave.boobs > 4000) {
				return "an oversized t-shirt"; /* loose pajama top */
			} else if (slave.intelligence+slave.intelligenceImplant > 50) {
				return "a halter top dress";
			} else if (slave.muscles > 30) {
				if (isItemAccessible.entry("sport shorts", "clothes")) {
					if (slave.boobs >= 650) {
						return "sport shorts and a sports bra";
					} else {
						return "sport shorts";
					}
				} else {
					return "spats and a tank top";
				}
			} else if (slave.energy > 95) {
				return null; // no change of clothes
			} else {
				return "conservative clothing";
			}
		}

		App.Events.drawEventArt(node, eventSlave, getSceneClothes(eventSlave));

		let t = [];
		t.push(`Although your life as an arcology owner comes with many associated privileges, extended idleness to bask in your luxury is not often among them. Thankfully, ${V.assistant.name} knows better than to let you run yourself ragged from the weight of your assorted responsibilities and often allots time in the evenings of your active schedule to simply relax.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Of course, no self respecting arcology owner could be expected to enjoy a lazy night of idle relaxation on their own. As you resolve the last of your most pressing responsibilities for the evening, ${V.assistant.name} directs one of your attentive slaves to gently guide you away from the unending burdens of running your arcology. Leaning against the doorway and wearing a facsimile of what an old world ${woman} might wear on a casual night in,`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		if (!canTalk(eventSlave)) {
			t.push(`asks with a gesture that carries just the right mixture of submission and exaggerated casualness if you'd like to 'hang out.'`);
		} else if (SlaveStatsChecker.checkForLisp(eventSlave)) {
			t.push(
				`lisps with exaggerated casualness,`,
				Spoken(eventSlave, `"Let's hang out, ${title}?"`)
			);
		} else {
			t.push(
				`asks with exaggerated casualness,`,
				Spoken(eventSlave, `"Want to hang out, ${title}?"`)
			);
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`${He} saunters over and`);
		if (eventSlave.belly >= 100000) {
			t.push(`struggles to lower ${his} ${bellyAdjective(eventSlave)} form to an obedient kneel`);
		} else if (eventSlave.belly >= 10000) {
			t.push(`gingerly lowers ${his} heavily ${eventSlave.bellyPreg > 3000 ? "gravid" : "swollen"} form to an obedient kneel`);
		} else if (eventSlave.belly >= 5000) {
			t.push(`gently lowers ${his} ${eventSlave.bellyPreg > 3000 ? "gravid" : "swollen"} form to an obedient kneel`);
		} else {
			t.push(`kneels obediently`);
		}
		t.push(`in front of you, awaiting further direction.`);

		/* If you are updating below, please consider updating the vector art swaps at the top to match. */
		if (getLimbCount(eventSlave, 102) > 2) {
			t.push(`Clad in an antique T-Shirt referencing some defunct old world website, ${his} P-Limbs stand in stark contrast — gyros and servomotors against simple thread and cloth. With such tangible examples of the technological prowess of the Free Cities serving as ${his} limbs, ${his} ${eventSlave.belly >= 5000 ? "taut " : ""} shirt is an amusing testimonial to how far behind the old world stands in contrast to the new.`);
		} else if (eventSlave.boobs > 4000) {
			t.push(`${His} breasts are so massive that the front of ${his} loose pajama top must be unbuttoned. Even so, the protrusion of ${his} immense breasts`);
			if (eventSlave.belly >= 5000) {
				t.push(`and ${bellyAdjective(eventSlave)} rounded belly from ${his} body`);
			} else {
				t.push(`from ${his} chest`);
			}
			t.push(`strains the soft pajama top to its breaking point.`);
		} else if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
			t.push(`As a clever ${girl}, ${his} simple${eventSlave.belly >= 5000 ? `, yet tight around the middle,` : ""} summer dress evokes memories of bygone warm weather days at elite old world colleges — and the sexual conquest of their youthful residents.`);
		} else if (eventSlave.muscles > 30) {
			t.push(`${His} simple sports bra and compression shorts ensemble does little to conceal ${his} incredible musculature,`);
			if (eventSlave.belly >= 1500) {
				t.push(`straining to hold up against ${his} swelling middle and`);
			}
			t.push(`glistening with sweat from a recent workout. Despite ${his} recent exertions, ${he}'s able to maintain utter stillness in the perfect posture of an obedient slave.`);
		} else if (eventSlave.energy > 95) {
			t.push(`${He}'s controlling ${his} absurd sex drive for the moment in deference to the notion of your relaxation time, but ${he} clearly wouldn't mind some sex as part of the evening.`);
			if (eventSlave.dick > 0) {
				if (canAchieveErection(eventSlave)) {
					t.push(`${His} cock is painfully erect`);
					if (eventSlave.belly >= 10000) {
						t.push(`and pressed against the underside of ${his} belly,`);
					}
				} else {
					t.push(`${His} soft dick is dribbling precum,`);
				}
			} else {
				t.push(`${His} pussy is visibly soaked,`);
			}
			t.push(`showing unmistakably how badly ${he} needs release.`);
		} else {
			t.push(`${He} keeps ${his}`);
			if (canSee(eventSlave)) {
				t.push(App.Desc.eyesColor(eventSlave));
			} else {
				t.push("face");
			}
			t.push(`slightly downcast, ${his} hands lightly smoothing the folds from ${his} tight skirt while ${his} breasts visibly rise and fall under ${his} even tighter blouse.`);
			if (eventSlave.belly >= 5000) {
				t.push(`Between the two, there is little ${he} can do to cover ${his} exposed ${eventSlave.bellyPreg >= 3000 ? "pregnancy" : "middle"}.`);
			}
			t.push(`${He}'s the perfect picture of an attentive little old world ${girl}friend${eventSlave.height > 185 ? ` (though, of course, ${he}'s anything but physically small)` : ""}.`);
		}
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result("Enjoy some oral with an evening of wallscreen television", flixAndChill),
			new App.Events.Result("Spend the night idly cuddling", cuddle),
			new App.Events.Result(`Unwind by tormenting ${him}`, torture)
		]);

		function flixAndChill() {
			let t = [];
			t.push(`There are some things that never change, even after ascension to the high position of an arcology owner. One of these fixtures of life is the ability to enjoy a relaxing evening of wallscreen television and`);
			if (V.PC.dick !== 0) {
				t.push("a blowjob");
				if (V.PC.vagina !== -1) {
					t.push("and");
				}
			}
			if (V.PC.vagina !== -1) {
				t.push("some cunnilingus");
			}
			t.push(t.pop() + ".");
			t.push(`With ${eventSlave.slaveName} sequestered between your legs, you tune into your favorite Free Cities serial drama and widen your legs slightly as you sink back into the chair with a sigh of contentment. ${He}`);
			if (eventSlave.belly >= 300000) {
				t.push(`gently leans onto ${his} ${bellyAdjective(eventSlave)} belly`);
				if (hasAnyArms(eventSlave)) {
					t.push(`with ${his} arm${hasBothArms(eventSlave) ? "s" : ""} steadying the mass`);
				}
			} else if (eventSlave.belly >= 5000) {
				if (hasAnyLegs(eventSlave)) {
					t.push(`kneels carefully`);
				} else {
					t.push(`lowers ${himself}`);
				}
				if (hasAnyArms(eventSlave)) {
					t.push(`with ${hasBothArms(eventSlave) ? `an` : `${his}`} arm`);
					if (eventSlave.bellyPreg >= 3000) {
						t.push(`wrapped protectively around ${his} bump`);
					} else {
						t.push(`cradling ${his} ${bellyAdjective(eventSlave)} belly`);
					}
				}
			} else {
				t.push(`sinks to`);
				if (hasAnyLegs(eventSlave)) {
					t.push(`${his} knee${hasBothLegs(eventSlave) ? "s" : ""} obediently`);
					if (hasAnyArms(eventSlave)) {
						t.push(`with ${his} hand${hasBothArms(eventSlave) ? "s" : ""} placed placidly on ${his} thigh${hasBothLegs(eventSlave) ? "s" : ""}`);
					}
				} else {
					t.push("the ground");
				}
			}
			t.push(`before putting ${his} mouth to work,`);
			if (eventSlave.skill.oral >= 100) {
				t.push(`${his} mastery at giving oral providing a wealth of pleasure.`);
			} else if (eventSlave.skill.oral > 60) {
				t.push(`${his} skills in oral providing ample pleasure.`);
			} else {
				t.push(`${his} mediocre oral skills providing some relief.`);
			}
			if (eventSlave.teeth === "pointy") {
				t.push(`Although most of your attention is focused on the intriguing drama unfolding on your wallscreen, you still feel the extreme care ${he} has to take to keep ${his} shark-like teeth clear of you.`);
			} else if (eventSlave.teeth === "fangs") {
				t.push(`Although most of your attention is focused on the intriguing drama unfolding on your wallscreen, you can feel the slight hesitations as ${he} takes care to not scratch you with ${his} fangs.`);
			} else if (eventSlave.lips > 40) {
				t.push(`${His} huge lips are soft and pillowy against you.`);
			} else if (eventSlave.teeth === "fang") {
				t.push(`Although most of your attention is focused on the intriguing drama unfolding on your wallscreen, you can feel the care ${he} is taking to keep ${his} fang from clipping you.`);
			} else if (eventSlave.teeth === "gapped") {
				t.push(`Although most of your attention is focused on the intriguing drama unfolding on your wallscreen, you can feel the slight hesitations as ${he} takes care to not pinch you between ${his} front teeth.`);
			} else if ((eventSlave.teeth === "straightening braces") || (eventSlave.teeth === "cosmetic braces")) {
				t.push(`Although most of your attention is focused on the intriguing drama unfolding on your wallscreen, you can feel the slight hesitations as ${he} takes care to keep ${his} braces off you.`);
			}
			t.push(`You have an enjoyable evening glued to your wallscreen, punctuated by the playful ruffling ${eventSlave.hLength > 1 ? `of ${eventSlave.slaveName}'s ${eventSlave.hColor} hair` : `across ${eventSlave.slaveName}'s scalp`} and the occasional orgasm into ${his} waiting mouth.`);
			if (eventSlave.sexualFlaw !== "hates oral") {
				t.push(`Though your experience was more stimulating than ${hers}, ${eventSlave.slaveName} <span class="devotion inc">enjoyed being used while you enjoyed yourself.</span>`);
				eventSlave.devotion += 4;
			} else {
				t.push(`Although you enjoyed ${his} ministrations, ${eventSlave.slaveName} had a bad time because of ${his} <span class="devotion dec">hate of oral.</span>`);
				eventSlave.devotion -= 2;
			}
			seX(eventSlave, "oral", V.PC, "penetrative");
			return t;
		}

		function cuddle() {
			let t = [];
			t.push(`Though your evening could hardly be called eventful, there is something eminently comforting about having a warm`);
			if (eventSlave.physicalAge > 30) {
				t.push(woman);
			} else if (eventSlave.physicalAge > 18) {
				t.push("young lady");
			} else if (eventSlave.physicalAge > 12) {
				t.push("teen");
			} else {
				t.push(`little ${girl}`);
			}
			t.push(`cuddled up beside you to idly while away the hours`);
			if (eventSlave.bellyPreg >= 1500 && eventSlave.pregSource === -1) {
				t.push(t.pop() + ",");
				t.push(`especially when ${he} is ${eventSlave.belly >= 300000 ? `so massively swollen with your children` : `heavy with your child${eventSlave.pregType > 1 ? "ren" : ""}`}`);
			}
			t.push(t.pop() + ".");
			t.push(`${He} <span class="trust inc">trusts you more</span> for these few intimate hours amidst ${his} life of sexual servitude.`);
			eventSlave.trust += 4;
			return t;
		}

		function torture() {
			let t = [];
			t.push(`Though there is no shortage of torments you inflict during the course of your day to day life as an arcology owner, there is something refreshing about torturing a slave out of idle boredom rather than corrective disciple or sexual domination. Your night is filled with ${eventSlave.voice === 0 ? "the horrible rasping that a mute throat substitutes for cries of agony" : "echoing shrieks of anguish"}, though every vocal outburst is idly punished with electro shock or strike of the whip. Come the morning, ${eventSlave.slaveName}`);
			if (eventSlave.fetish === "masochist") {
				t.push(`is mortified by the intensity of ${his} orgasms that night, <span class="devotion inc">and more convinced than ever that ${he}'s a pain slut,</span> and yet`);
				eventSlave.devotion += 4;
			}
			t.push(`<span class="trust dec">scuttles away to tend to the bruises and marks that litter ${his} battered body.</span>`);
			eventSlave.trust -= 5;
			return t;
		}
	}
};
