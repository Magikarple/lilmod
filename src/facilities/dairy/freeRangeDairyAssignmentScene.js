App.Facilities.Dairy.freeRangeAssignmentScene = function(slave) {
	/* This scene wants V.dairyRestraintsSetting === 0 && slave.devotion > 0 && slave.fetish !== Fetish.MINDBROKEN */
	const node = new DocumentFragment();

	V.nextButton = "Continue";
	V.nextLink = V.returnTo;
	let r = [];
	const {
		He, His,
		he, him, his, himself
	} = getPronouns(slave);

	App.UI.DOM.drawOneSlaveRight(node, slave);

	r.push(`${slave.slaveName} reports to the dairy.`);
	if (slave.energy > 90 ) {
		r.push(`${He} rejoices since ${he} is actually eager to be milked.`);
	}
	App.Events.addParagraph(node, r);
	r = [];

	/* AROUSAL WHEN ENTERING */
	let aroused = false;
	if (App.Entity.facilities.dairy.employeesIDs().size > 1 && canSee(slave)) {
		r.push(`While`);
		if (canWalk(slave)) {
			r.push(`walking`);
		} else if (canMove(slave)) {
			r.push(`being helped`);
		} else {
			r.push(`being carried`);
		}
		r.push(`to ${his} designated stall, ${he} passes the other cows currently at their milking machines. Not being hurried, ${he} occasionally watches a cow in detail.`);
		App.Events.addParagraph(node, r);
		r = [];
		if (slave.fetish === "boobs" && V.slaves.filter(s => s.assignment === Job.DAIRY && s.lactation > 0).length > 0) {
			aroused = true;
			r.push(`${He} cannot help but to feel aroused at the view of all those udders being thoroughly milked.`);
			if (slave.sexualFlaw === "breast growth") {
				r.push(`${He} is already fantasizing of having ${his} breasts expanded to ridiculous proportions${(slave.lactation > 0) ? ` so ${he} can produce even more milk` : ""}.`);
			}
		} else if (slave.fetish === "pregnancy" && V.dairyPregSetting === 1) {
			aroused = true;
			r.push(`The automatic impregnators are currently active. They are not running on an industrial setting, but on a gentler one. Every fertile cow's pussy is filled with a dildo attached on a mechanical arm. There is a wide range of sizes. Some dildos are small and provide expert stimulation for the sensitive areas. Other cows seem to prefer forearm-length horse-cocks for more intense stimulation. The automatic thrusting speeds vary, too, but all of them fill the slave completely so not a drop of sperm can leak out. Some cows are currently asleep. Their respective stimulators are comfortably resting deeply buried in their vaginas, keeping the loads right where they belong. Whenever a cow reaches climax, the sodomizers can thrust at ridiculous speeds to encourage fertilization. The sight of all those lovely baby bumps arouses ${slave.slaveName}.`);
			if (slave.sexualFlaw === "breeder" && isFertile(slave)) {
				r.push(`${He} cannot wait to get impregnated too.`);
			}
		} else if (slave.fetish === "buttslut" && V.dairyStimulatorsSetting === 1) {
			aroused = true;
			r.push(`The automatic sodomizers are currently active. They are not running on an industrial setting, but on a gentler one. Every cow's anus is filled with a dildo attached on a mechanical arm. There is a wide range of sizes. Some dildos are small and provide expert stimulation for the sensitive areas. Other cows seem to prefer forearm-length horse-cocks for more intense stimulation. The automatic thrusting speeds vary, too. Some cows are currently asleep. Their respective stimulators are comfortably resting deeply buried in their behinds. Whenever a cow reaches climax, the sodomizers can thrust at ridiculous speeds. Good thing they provide not only nutrition, but lubrication, too. The sight of all those lovely rear-ends relentlessly reamed arouses ${slave.slaveName}.`);
			if (slave.sexualFlaw === "anal addict") {
				r.push(`${He} cannot wait to be sodomized, too.`);
			}
		}
		App.Events.addParagraph(node, r);
		r = [];

		const cow = V.slaves.find(s => s.assignment === Job.DAIRY && s.ID !== slave.ID && s.balls >= 10 && s.dick > 0);
		if (cow) {
			const {
				He2, His2,
				he2, his2, him2,
			} = getPronouns(cow).appendSuffix("2");
			aroused = true;
			App.UI.DOM.drawOneSlaveRight(node, cow);
			r.push(`The hyper-endowed cum-cow ${cow.slaveName} is the pride of ${V.dairyName}. ${He2} is limply hanging on ${his2} milking chair, panting heavily because of the constant suction on ${his2} dick. ${He2} is obviously nearing climax. Soon,`);
			if (hasAnyNaturalEyes(cow)) {
				r.push(his2);
				if (hasBothNaturalEyes(cow)) {
					r.push(`eyes bulge`);
				} else {
					r.push(`eye bulges`);
				}
				r.push(`and`);
			}
			r.push(`${his2} muscles tense.`);
			if (V.dairyStimulatorsSetting === 1) {
				if (cow.prostate !== 0) {
					r.push(`${His2} anus clenches around the dildo in ${his2} rear. The automatic sodomizer speeds up to give ${his2} prostate a helpful pounding.`);
				} else {
					r.push(`${He2} lacks a prostate, so the automatic sodomizer is forced to pound ${him2} mercilessly to make ${him2} cum.`);
				}
			} else if (V.MilkmaidID !== 0 && S.Milkmaid.dick > 4 && canPenetrate(S.Milkmaid)) {
				r.push(`${S.Milkmaid.slaveName} quickly steps in and penetrates ${his2} rear to push ${him2} powerfully over the edge.`);
			} else {
				r.push(`${His2} butthole opens and closes.`);
			}
			r.push(`${His2} cock twitches as it begins to unload. Inhumanly large amounts of semen spurt into the receptacle which encases ${his2} dick. ${His2} orgasm does not seem to end for minutes. The milking machine keeps ${him2} cumming longer than naturally possible. Only primal moans escape ${his2} throat. As ${his2} orgasm finally subsides, ${he2} slumps back, grinning in post-orgasmic bliss. All things considered, ${cow.slaveName} seems to be very happy with being a cow.`);
			if (cow.dickTat === "bovine patterns" ) {
				r.push(`Even ${his2} dick is tattooed to look like a bull's.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
			App.UI.DOM.appendNewElement("div", node, `"Moo," ${he2} moans lustily, imitating a cow.`);
		}
	/* TODO: watch a specific cow, e.g. lover or relative or huge-titted */
	}

	if (aroused) {
		r.push(`All this lewd display turns ${slave.slaveName} on and ${he} is almost overcome by lust. ${He} realizes ${he} probably should not have taken so much interest in the other cows.`);
		if (slave.dick > 0) {
			r.push(`${He} feels ${his} blood rush into ${his}`);
			if (slave.dick > 8) {
				r.push(`gargantuan`);
			} else if (slave.dick > 6) {
				r.push(`huge`);
			} else if (slave.dick > 2) {
				r.push(`fair-sized`);
			} else {
				r.push(`small`);
			}
			r.push(`dick.`);
		}
		if (slave.vagina > -1 ) {
			r.push(`${His} pussy moistens.`);
		}
		if (slave.lactation > 0) {
			if (slave.nipples === "fuckable") {
				r.push(`Milk begins to leak out of ${his} nipplecunts.`);
			} else {
				r.push(`${His} milk-dripping nipples stiffen.`);
			}
		}
	} /* AROUSAL WHEN ENTERING END*/
	App.Events.addParagraph(node, r);
	r = [];

	/* GETTING IN */
	r.push(`Eventually, ${slave.slaveName} arrives at ${his} designated milking stall.`);
	let assayedSlave = randomRelatedSlave(slave, s => s.assignment === Job.DAIRY);
	let assayType;
	if (assayedSlave) {
		assayType = relativeTerm(slave, assayedSlave);
	} else if (slave.relationship > 0) {
		assayedSlave = getSlave(slave.relationshipTarget);
		if (assayedSlave && assayedSlave.assignment === Job.DAIRY) {
			switch (slave.relationship) {
				case 1:
					assayType = "friend";
					break;
				case 2:
					assayType = "best friend";
					break;
				case 3:
					assayType = "fuckbuddy";
					break;
				case 4:
					assayType = "lover";
					break;
				case 5:
					assayType = "slave wife";
					break;
			}
		}
	}
	if (assayType) {
		const {
			He2
		} = getPronouns(assayedSlave).appendSuffix("2");
		App.UI.DOM.drawOneSlaveRight(node, assayedSlave);
		r.push(`${His} ${assayType} ${assayedSlave.slaveName} is at the dairy, too. ${He2} is in the adjacent stall. The two of them are going to be milked right next to each other.`);
	}
	App.Events.addParagraph(node, r);
	r = [];

	App.UI.DOM.drawOneSlaveRight(node, S.Milkmaid);
	r.push(`The only "furniture" in the stall looks like a dentist's chair. Despite the medical appearance, when ${he}`);
	if (slave.devotion > 90) {
		r.push(`eagerly`);
	} else if (slave.slaveName < 40) {
		r.push(`hesitantly`);
	}
	r.push(`gets into the chair it turns out to be quite comfortable.`);
	if (V.MilkmaidID === 0) {
		r.push(`Automated machinery springs to life, preparing ${him} for milking.`);
	} else {
		r.push(`Your appointed milkmaid ${S.Milkmaid.slaveName} helps ${slave.slaveName} with installing the milking devices.`);
	}
	if (slave.lactation > 0 ) {
		r.push(`Suction cups are attached`);
		if (slave.nipples === "fuckable" || slave.nipples === "flat") {
			r.push(`over`);
		} else {
			r.push(`to`);
		}
		r.push(`${his} nipples.`);
	}
	if (slave.balls > 0) {
		if (slave.dick > 8) {
			r.push(`A huge receptacle is attached to ${his} over-sized member.`);
		} else if (slave.dick > 6) {
			r.push(`A large cock-milker is attached to ${his} huge dick.`);
		} else if (slave.dick > 2) {
			r.push(`A special cock-milker is attached to ${his} dick.`);
		} else if (slave.dick > 0) {
			r.push(`A suction cup is attached to ${his} small dicklet. Due to the embarrassingly small size of ${his} penis, the very kind of cup is used that normally goes on nipples.`);
		} else {
			r.push(`A suction cup is attached over ${his} hidden cumhole.`);
		}
	}
	App.Events.addParagraph(node, r);
	r = [];
	if (V.dairyFeedersSetting === 1) {
		r.push(`Near the headrest of the chair, an artificial phallus is installed. The cow can easily reach it with ${his} mouth. The phallus provides hydration and nutrition when sucked. The supplement consists of excess or low-quality milk and cum from the dairy itself as well as aphrodisiacs and hormones enhancing lactation and semen production.`);
		if (slave.sexualFlaw === "cum addict" || slave.fetish === "cumslut") {
			r.push(`${slave.slaveName}`);
			r.push(`eagerly shoves the artificial phallus into ${his} mouth. ${He} gives it an experimental suckle. To ${his} joy, ${he} soon is rewarded with a fresh spurt of semen-like nutrition supplement. Then ${he} readjusts the holder to keep the phallus lodged in ${his} mouth, effectively forcing ${himself} to keep sucking the artificial dick.`);
		}
	}
	App.Events.addParagraph(node, r);
	r = [];
	r.push(`The milking chair comes with a small screen, providing mental stimulation for the cow. It is highly pornographic, of course. It also includes live-streams of close-ups from the cows being milked or their orifices being penetrated. ${slave.slaveName} selects ${his} favorite program`);
	if (canSee(slave)) {
		r.push(`to watch.`);
	} else if (canHear(slave)) {
		r.push(`to listen to.`);
	} else {
		r.push(`to feel the vibrations from.`);
	}
	r.push(`It features`);
	if (slave.attrXY > slave.attrXX || slave.behavioralQuirk === "adores men") {
		r.push(`men`);
	} else {
		r.push(`women`);
	}
	if (slave.fetish === Fetish.SUBMISSIVE) {
		r.push(`submitting to their sexual partners.`);
	} else if (slave.fetish === "cumslut") {
		if (slave.attrXY > slave.attrXX || slave.behavioralQuirk === "adores men") {
			r.push(`jacking off directly into the camera.`);
		} else {
			r.push(`sucking dick for all it's worth.`);
		}
		if (V.dairyFeedersSetting === 1 ) {
			r.push(`The dairy feeders ejaculations are synced with the events in the video. ${slave.slaveName} receives a load of cum-like nutrition every time a dick shoots. It really draws ${him} into the pornography.`);
		}
	} else if (slave.fetish === "humiliation") {
		r.push(`being humiliated.`);
	} else if (slave.fetish === "buttslut") {
		r.push(`being fucked in the ass.`);
		if (V.dairyStimulatorsSetting === 1) {
			r.push(`The dairy stimulators are synced to the videos. The automatic sodomizers thrust in exactly the same way as the dicks or dildos in the video. ${slave.slaveName} is amazed by this advanced pornography. It feels like it was ${him} being fucked in the videos all over.`);
		}
	} else if (slave.fetish === "dom") {
		r.push(`dominating their sexual partners.`);
	} else if (slave.fetish === "masochist") {
		r.push(`being flogged.`);
	} else if (slave.fetish === "sadist") {
		r.push(`abusing their sexual partners.`);
	} else if (slave.fetish === "pregnancy") {
		if (slave.attrXY > slave.attrXX || slave.behavioralQuirk === "adores men") {
			r.push(`fucking pregnant women.`);
		} else {
			r.push(`being fucked while pregnant.`);
			if (V.dairyPregSetting > 0) {
				r.push(`The dairy stimulators are synced to the videos. The impregnating dildo thrusts in exactly the same way as the dicks or dildos in the video. ${slave.slaveName} is amazed by this advanced pornography. It feels like it was ${him} being fucked and cummed inside in the videos all over.`);
			}
		}
	} else {
		r.push(`engaging in vanilla intercourse.`);
	}
	App.Events.addParagraph(node, r);
	r = [];

	r.push(`Sexual stimulation increases product output.`);
	if (V.MilkmaidID === 0 && V.dairyStimulatorsSetting === 0) {
		r.push(`Unfortunately, there is neither a milkmaid providing personal assistance nor automatic sodomizers installed in your dairy.`);
	} else {
		if (V.MilkmaidID !== 0) {
			const {
				He2,
				he2, his2
			} = getPronouns(S.Milkmaid).appendSuffix("2");
			r.push(`Your milkmaid ${S.Milkmaid.slaveName} is working in the dairy. Whenever a cow needs ${his2} assistance, ${he2} is happy to help.`);
			if (S.Milkmaid.dick > 1 && canPenetrate(S.Milkmaid)) {
				r.push(`Most often, ${he2} uses ${his2} cock to penetrate the cows.`);
			} else {
				r.push(`Lacking penile equipment of appropriate size, ${he2} relies on ${his2} tongue to stimulate the cow's sexual organs.`);
			}
			r.push(`${He2} is quite skilled in giving mammary massages and handjobs, too.`);
			if (V.milkmaidImpregnates === 1 && canPenetrate(S.Milkmaid) && S.Milkmaid.pubertyXY === 1 && S.Milkmaid.ballType === "human") {
				r.push(`If at all possible, it is ${his2} duty to thoroughly knock up ${his2} charges.`);
			}
			App.Events.addParagraph(node, r);
			r = [];
		}
		if (V.dairyStimulatorsSetting > 0) {
			r.push(`Automated sodomizers help the cows produce by penetrating their anuses. The milking chairs built-in sensors measure ${slave.slaveName}'s anal capacity.`);

			if (slave.anus === 0 ) {
				r.push(`The machine detects an unused rear-end. In order to protect ${his} anal virginity, the automatic sodomizer stays inactive.`);
			} else {
				r.push(`In order to provide adequate stimulation for ${his}`);
				if (slave.anus > 3) {
					r.push(`gaping anus, the automatic sodomizer is equipped with a gigantic horse-like phallus. It wobbles menacingly.`);
				} else if (slave.anus > 2) {
					r.push(`well-used rear-end, the automatic sodomizer is equipped with a large phallus. It is nicely ribbed for extra stimulation.`);
				} else {
					r.push(`anus, the automatic sodomizer is equipped with a fair-sized silicone phallus.`);
				}
				r.push(`Lubrication spurts from a hole at the tip, giving the artificial phallus a very lifelike pre-dripping look. Gently, the mechanical arm pushes the phallus into ${slave.slaveName}'s behind.`);

				if (slave.fetish === "buttslut" || slave.sexualFlaw === "anal addict") {
					r.push(`${He} shudders with joy.`);
				}
				r.push(`Soon, the automatic sodomizer pumps the dildo in and out of ${his} butthole.`);
				if (slave.balls > 0 && slave.scrotum > 0) {
					r.push(`${His}`);
					if (slave.balls > 5 ) {
						r.push(`massive`);
					}
					r.push(`balls swing back and forth.`);
				}
				if (slave.dick > 0 ) {
					if (slave.prostate !== 0) {
						r.push(`The dildo stimulates ${his} prostate perfectly. Pre-cum begins to leak from ${his} cock.`);
					}
					/* TODO: the next lines feel non-canon */
					r.push(`The milking machine remains at this setting for longer than normal. Pre-cum is considered a delicacy and is harvested as much as possible before having a negative impact on cum production.`);
				}
			}
			App.Events.addParagraph(node, r);
			r = [];
		}
		if (V.dairyPregSetting > 0) {
			r.push(`Ejaculate squirting dildos keep the slave's wombs stuffed with seed until they are confirmed pregnant and aid in preparing them for childbirth.`);
			if (isFertile(slave)) {
				r.push(`Since ${he} is quite fertile, it springs to life.`);
				if (slave.vagina === 0) {
					r.push(`The machine detects a virgin pussy. In order to protect ${his} virginity, the automatic dildo returns to its housing.`);
				} else {
					r.push(`In order to provide adequate stimulation for ${his}`);
					if (slave.vagina > 3) {
						r.push(`gaping vagina, the automatic dildo is equipped with a gigantic horse-like phallus. It wobbles menacingly.`);
					} else if (slave.vagina > 2) {
						r.push(`well-used rear-end, the automatic dildo is equipped with a large phallus. It is nicely ribbed for extra stimulation.`);
					} else {
						r.push(`vagina, the automatic dildo is equipped with a fair-sized silicone phallus.`);
					}
					r.push(`Lubrication spurts from a hole at the tip, giving the artificial phallus a very lifelike pre-dripping look. Gently, the mechanical arm pushes the phallus into ${slave.slaveName}'s pussy.`);

					if (slave.fetish === "pregnancy" || slave.sexualFlaw === "breeder") {
						r.push(`${He} shudders with joy.`);
					}
					r.push(`Soon, the automatic impregnator pumps the dildo in and out of ${his} body, frequently releasing large loads of potent cum directly into ${his} womb.`);
				}
			}
		}
	}
	/* GETTING IN END */
	App.Events.addParagraph(node, r);
	r = [];

	/* MILKING ROUTINE */
	if (slave.lactation > 0) {
		r.push(`The milking cups`);
		if (slave.nipples === "fuckable" || slave.nipples === "flat") {
			r.push(`over`);
		} else {
			r.push(`on`);
		}
		r.push(`${his} nipples begin to pulse rhythmically. Soon, a steady flow of breast-milk is sucked away into the storage tanks.`);
	}
	if (slave.dick > 0) {
		r.push(`The milking machine uses suction to draw ${his} dick into the receptacle.`);
		if (slave.dick > 10) {
			r.push(`${His} dick is too large to even consider getting hard again, so it just attaches firmly to the tip.`);
		} else if (slave.dick > maxErectionSize(slave) + 2) {
			r.push(`${He} is on the verge of passing out as most of ${his} blood volume rushes into ${his} dick. ${He} cannot possibly reach a full erection without the machine's help. ${He} fights to stay awake so ${he} can enjoy ${his} inhuman cock at throbbing hardness.`);
		} else if (slave.dick > maxErectionSize(slave)) {
			r.push(`${He} feels dizzy as most of ${his} blood volume rushes into ${his} dick. It is not easy for ${his} body to maintain an erection. But with the machine's help, ${he} can produce a full throbbing hard-on.`);
		} else {
			r.push(`It brings ${him} to a full, throbbing erection within seconds.`);
		}
		r.push(`The machine strokes ${his} dick mechanically, but very pleasurably.`);
	}
	r.push(`It does not take long for ${slave.slaveName} to reach ${his} first orgasm of many. ${His} muscles tense.`);
	if (slave.dick > 0) {
		r.push(`${His}`);
		if (slave.balls > 5 ) {
			r.push(`cum-engorged`);
		}
		r.push(`balls draw up.`);
		r.push(`${His}`);
		if (slave.dick > 8 ) {
			r.push(`gargantuan member`);
		} else if (slave.dick > 6 ) {
			r.push(`huge cock`);
		} else {
			r.push(`dick`);
		}
		r.push(`twitches and flexes within its receptacle.`);
		if (slave.balls >= 50) {
			r.push(`A special tank beneath ${him} holds ${his} monolithic balls' endless ejaculate while the machine struggles to suck it away.`);
		} else if (slave.balls >= 37) {
			r.push(`A special tank attached to the hose holds ${his} titanic balls' near endless ejaculate while the machine struggles to suck it away.`);
		} else if (slave.balls >= 25) {
			r.push(`A special reservoir attached to the hose holds ${his} massive balls' ridiculous ejaculate while the machine struggles to suck it away.`);
		} else if (slave.balls >= 10) {
			r.push(`The machine strains to suck down the giant load from ${his} huge balls.`);
		} else if (slave.balls > 5) {
			r.push(`The copious ejaculation from ${his} over-sized balls give the machine something to work on.`);
		} else if (slave.balls > 0) {
			r.push(`${His} ejaculate is quickly sucked away.`);
		} else {
			r.push(`${His} ballslessness impedes cum-production, but ejaculating feels nice, anyway.`);
		}
	}
	if (slave.dick < 1 && slave.balls > 0 && slave.prostate > 0) {
		r.push(`Cum splashes from ${his} urethra and is quickly sucked away.`);
	}
	if (slave.lactation > 0) {
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The milking cups`);
		if (slave.nipples === "fuckable" || slave.nipples === "flat") {
			r.push(`over`);
		} else {
			r.push(`on`);
		}
		r.push(`${his} nipples switch from rhythmic pulsing into intense suction. Aided by ${his} orgasm, milk spurts from ${his} nipples`);
		if (slave.boobs > 20000) {
			r.push(`in obscenely massive amounts. ${His} immense breasts seem to never empty.`);
		} else if (slave.boobs > 10000) {
			r.push(`in absurdly large amounts. ${His} gargantuan breasts do not seem to get less milk-laden for a long time.`);
		} else if (slave.boobs > 5000) {
			r.push(`in powerful jets. ${His} huge breasts can provide multiple liters of milk.`);
		} else if (slave.boobs > 1000) {
			r.push(`for quite some time. ${His} large breasts can store an impressive volume of milk.`);
		} else if (slave.boobs > 700) {
			r.push(`until there is enough for whitening a cup of coffee. ${His} average breasts cannot store much more milk.`);
		} else if (V.arcologies[0].FSSlimnessEnthusiast > 80) {
			r.push(`for a surprisingly long time. Your arcology succeeded in optimized the milking process for small breasts.`);
		} else {
			r.push(`for a short time. ${His} small tits cannot dispense much milk at once.`);
		}
	}
	App.Events.addParagraph(node, r);
	r = [];
	if (slave.prostate !== 0 && slave.dick === 0 && slave.balls === 0) {
		r.push(`${slave.slaveName}`);
		r.push(`has no cock, but a functional prostate gland. It's attached to ${his} urethra, so ${he} squirts`);
		if (slave.prostate > 2) {
			r.push(`massively`);
		} else {
			r.push(`copiously`);
		}
		r.push(`while ${he} orgasms. The exotic fluid is caught by a basin positioned under ${his}`);
		if (slave.vagina >= 0 ) {
			r.push(`dripping pussy.`);
		} else {
			r.push(`featureless crotch.`);
		}
	}
	App.Events.addParagraph(node, r);
	r = [];
	r.push(`With the first milking cycle being over, ${slave.slaveName} drifts into a relaxing slumber.`);
	if (V.dairyFeedersSetting === 1 && (slave.sexualFlaw === "cum addict" || slave.fetish === "cumslut")) {
		r.push(`${He} grins madly around the phallus ${he} stuffed in ${his} mouth.`);
	}
	if (V.dairyPregSetting > 0 && isFertile(slave) && slave.vagina > 0) {
		r.push(`${He} gets comfortable around ${his} cum-bloated belly as the impregnator continues its task.`);
	}
	if (slave.lactation > 0) {
		r.push(`The milking cups`);
		if (slave.nipples === "fuckable" || slave.nipples === "flat") {
			r.push(`over`);
		} else {
			r.push(`on`);
		}
		r.push(`${his} nipples pulse slower and with less vigor. The lactation never fully subsides. The steady but gentle suction helps increasing milk production without actually draining the breasts.`);
		slave.lactationDuration = 2;
		slave.boobs -= slave.boobsMilk;
		slave.boobsMilk = 0;
	}
	if (slave.dick > 0) {
		r.push(`The suction on ${his} dick stops, allowing ${his} abused member to go soft and have some rest.`);
	}
	if (slave.balls > 0 && slave.scrotum > 0) {
		r.push(`${His} balls rest, dangling down and relieved. They have already started to produce more cum. They seem to wait for their next chance to unload.`);
	}
	App.Events.addParagraph(node, r);
	App.Events.addParagraph(node, [`The next milking cycle will start soon.`]);
	/* MILKING ROUTINE END */
	return node;
};
