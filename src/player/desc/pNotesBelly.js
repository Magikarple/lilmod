// cSpell:ignore twinner

App.Desc.Player.pNotesBelly = function(PC = V.PC) {
	const r = [];
	const fertilityRefreshment = PC.refreshment.includes("fertility") ? 1 : 0;
	const {girlP} = getPronouns(PC).appendSuffix("P");
	const children = PC.pregType > 1 ? "children" : "child";


	if (PC.career === "servant") {
		if (PC.preg > 0) {
			if (PC.belly >= 120000) {
				r.push(`You don't know how much more you can take. You feel so full and your children never calm down. You swear they take shifts tormenting your poor bladder. Even worse, your pregnancy juts out over a`);
				if (V.showInches === 2) {
					r.push(`half-yard`);
				} else {
					r.push(`half-meter`);
				}
				r.push(`from your front and has soundly defeated the seams of your`);
				if (PC.dick !== 0) {
					r.push(`dress. Occasionally one of the bottoms manages to land a series of hits to your prostate, not that you mind as much, save for when they keep at it and you can't restrain your orgasm.`);
				} else {
					r.push(`dress.`);
				}
			} else if (PC.belly >= 105000) {
				r.push(`You can barely function any more. You're so big and heavy that even the simplest of actions requires both intense effort and thought just to get it done. Your frumpy dress is also at its limit, and much to your annoyance, your children will not stay still enough to let you fix it.`);
			} else if (PC.belly >= 90000) {
				r.push(`You may have a`);
				if (fertilityRefreshment === 1) {
					r.push(`problem, but then again, you did take all those fertility drugs, so you can't really say you didn't want it.`);
				} else {
					r.push(`problem. You took fertility drugs, but you shouldn't be getting this big.`);
				}
				r.push(`Judging by how far along you are, you must be carrying ${pregNumberName(PC.pregType, 2)}. Your Master always said he wanted a big family; too bad he isn't here to see this. Your dress is also starting to get tight, but it's far less of a concern at this point.`);
			} else if (PC.belly >= 75000) {
				r.push(`Your belly is starting to become worrying. You're positively gigantic and quite tired. Though on the plus side, your dress is rather form fitting now.`);
			} else if (PC.belly >= 60000) {
				r.push(`Your new outfit is handling your enormous belly quite well, though it does nothing to hide your size. Everyone can tell you'll be having lots of babies.`);
			} else if (PC.belly >= 45000) {
				r.push(`You both look and feel enormous, your belly juts out so much now. You found a rather frumpy looking maid outfit in a shop; it's not the most attractive thing, but it'll hold nearly any belly.`);
			} else if (PC.belly >= 30000) {
				r.push(`You feel absolutely gigantic; you look like you're full-term with`);
				if (PC.pregType === 2) {
					r.push(`twins (which you are).`);
				} else {
					r.push(`twins.`);
				}
				r.push(`Your restitched dress is once more at its limit.`);
			} else if (PC.belly >= 15000) {
				r.push(`You've taken the time to let out your own dress so that you can look proper even with a belly as big as any full-term woman's.`);
			} else if (PC.belly >= 14000) {
				r.push(`Your dress is at its capacity; any bigger and you'd risk tearing it at the seams, though your late Master did make sure his ${girlP}s were well dressed even when they were fully rounded with his child.`);
			} else if (PC.belly >= 12000) {
				r.push(`You keep bumping into things with your huge belly; you're used to it though,`);
				if (PC.counter.birthMaster >= 2) {
					r.push(`your first pregnancy was a twinner!`);
				} else {
					r.push(`your late Master liked to keep a big fake belly around your middle.`);
				}
			} else if (PC.belly >= 10000) {
				r.push(`Your huge pregnant belly is tiring to carry around, but you're well versed in moving about with a rounded middle.`);
			} else if (PC.belly >= 7000) {
				r.push(`You've stopped bothering to tie your apron behind you, allowing your dress the freedom to stretch with your growing ${children}.`);
			} else if (PC.belly >= 5000) {
				r.push(`Your maid's outfit is rounded out by your baby-filled belly; not only is it obvious, but it is slowing you down in your day to day affairs.`);
			} else if (PC.belly >= 3000) {
				r.push(`You're starting to get pretty big; you feel like all eyes are centered on your baby-filled middle.`);
			} else if (PC.belly >= 1500) {
				r.push(`Your belly is now large enough that there is no hiding it. After you've let out your apron, your dress fits nicely again.`);
			} else if (PC.belly >= 500) {
				r.push(`Your dress tightly clings to your early pregnancy, though it, your apron, and your previous experience hide it well.`);
			} else if (PC.belly >= 250) {
				r.push(`Your apron holds your dress tightly to your bloated middle.`);
			} else if (PC.belly >= 100) {
				r.push(`Your dress and apron feel tight around your middle.`);
			}
			if (PC.preg >= 41) {
				r.push(`Your`);
				if (PC.pregType > 1) {
					r.push(`babies are`);
				} else {
					r.push(`baby is`);
				}
				r.push(`overdue and your Master isn't here anymore to comfort your exhausted body. You try your best,`);
				if (PC.pregSource === -3) {
					r.push(`drawing strength from the knowledge that you carry your late Master's legacy within you.`);
				} else {
					r.push(`but deep down you are saddened that your`);
					if (PC.pregType > 1) {
						r.push(`children aren't`);
					} else {
						r.push(`child isn't`);
					}
					r.push(`his.`);
				}
				if (PC.pregMood === 1) {
					r.push(`However, thanks to all your mothering, your slaves are more than happy to do everything they can for you.`);
				} else if (PC.pregMood === 2) {
					if (V.seeDicks !== 0) {
						r.push(`Your slaves, those with dicks especially,`);
					} else {
						r.push(`Your slaves`);
					}
					r.push(`are terrified of being seen by you, knowing full well that they will be bearing the full weight of your body as you try to fill the hole left by your late Master.`);
				}
			} else if (PC.preg >= 39) {
				r.push(`Every action you take is exhausting, and even though your slaves are more than capable of serving your every desire, you refuse to slow down with your duties.`);
				if (PC.pregMood === 1) {
					r.push(`Though you definitely appreciate their aid.`);
				} else if (PC.pregMood === 2) {
					r.push(`Your hormones practically rule you, leading you to demand your slaves to be prepared to pleasure you at a moment's notice. Your needy cunt hungers for dick and you don't care`);
					if (V.seeDicks !== 0) {
						r.push(`what it is attached to`);
					} else {
						r.push(`if it's made of plastic`);
					}
					r.push(`right now.`);
				}
			} else if (PC.preg >= 36) {
				r.push(`Your`);
				if (PC.pregType > 1) {
					r.push(`children happily kick`);
				} else {
					r.push(`child happily kicks`);
				}
				r.push(`away inside your womb, and each time a small bump appears on the outside of your dress.`);
				if (PC.pregMood === 1) {
					r.push(`While hormones may have you demanding and needy, you do everything you can to treat your slaves as if they were your own children.`);
				} else if (PC.pregMood === 2) {
					r.push(`You know it's unbecoming for an arcology owner, but your former Master loved to fuck you while you`);
					if (PC.counter.birthMaster > 0) {
						r.push(`were pregnant with his`);
						if (PC.counter.birthMaster > 1) {
							r.push(`children`);
						} else {
							r.push(`child`);
						}
					} else {
						r.push(`wore a big fake belly`);
					}
					r.push(`and your body misses his touch.`);
				}
			} else if (PC.preg >= 32) {
				if (PC.pregMood === 1) {
					r.push(`You can't help but enjoy having a slave suckle from you while you relax with them in your lap.`);
				} else if (PC.pregMood === 2) {
					r.push(`You know how to have sex while pregnant, and as such, so will your slaves.`);
				}
			} else if (PC.preg >= 28) {
				if (PC.pregMood === 1) {
					r.push(`You catch yourself babying your slaves from time to time.`);
				} else if (PC.pregMood === 2) {
					r.push(`Your sex drive has become unquenchable as of late.`);
				}
			} else if (PC.preg === 22) {
				r.push(`Something startling happened this week; while enjoying a slave, your belly button popped out!`);
			} else if (PC.preg === 8 && PC.pregSource > 0) {
				const babyDaddy = findFather(PC.pregSource);
				if (babyDaddy) {
					babyDaddy.counter.PCKnockedUp++;
				}
				if (V.slaveIndices[PC.pregSource]) {
					const {him} = getPronouns(babyDaddy);
					r.push(`Rumors spread among your slaves that your middle is swollen with ${babyDaddy.slaveName}'s child. They're not wrong, though`);
					if (babyDaddy.devotion > 20) {
						r.push(`${babyDaddy.slaveName} is broken enough to not try and use it against you. In fact, it might even draw ${him} closer to you.`);
					} else {
						r.push(`you'd have liked it to have kept that from ${babyDaddy.slaveName}, lest the rebellious bitch use it to remain defiant.`);
					}
				}
			}
		}
	} else if (PC.career === "escort") {
		if (PC.preg > 0) {
			if (PC.belly >= 120000) {
				r.push(`You don't know how much more you can take. You feel so full and your children never calm down. You swear they take shifts tormenting your poor bladder. Even worse, your pregnancy juts out over a`);
				if (V.showInches === 2) {
					r.push(`half-yard`);
				} else {
					r.push(`half-meter`);
				}
				r.push(`from your front and has seized control as your dominant aspect.`);
				if (PC.dick !== 0) {
					r.push(`Occasionally one of the bottoms manages to land a series of hits to your prostate, not that you mind as much. It's good for business when you orgasm lewdly and cum your bottoms.`);
				}
			} else if (PC.belly >= 105000) {
				r.push(`You can barely function any more. You're so big and heavy that even the simplest of actions requires both intense effort and thought just to get it done. None of your poses work with your gravid body either, and you're practically popping out of your skimpiest outfit.`);
			} else if (PC.belly >= 90000) {
				if (fertilityRefreshment === 1) {
					r.push(`You may have a problem, but then again, you did take all those fertility drugs, so you can't really say you didn't want it.`);
				} else {
					r.push(`You may have a problem. You know you took fertility drugs, but you weren't supposed to get this big!`);
				}
				r.push(`Feeling yourself up, you'd fancy a guess that there are about`);
				if (PC.skill.medicine >= 45) {
					if (PC.pregType === 8) {
						r.push(`eight babies`);
					} else if (PC.pregType === 7) {
						r.push(`seven babies`);
					} else {
						r.push(`six babies`);
					}
				} else {
					if (PC.pregType === 8) {
						r.push(`a dozen babies`);
					} else if (PC.pregType === 7) {
						r.push(`ten babies`);
					} else {
						r.push(`eight babies`);
					}
				}
				r.push(`in your belly.`);
			} else if (PC.belly >= 75000) {
				r.push(`Your belly is starting to become worrying to you. You're positively gigantic and quite tired of it.`);
				if (FutureSocieties.isActive('FSRepopulationFocus')) {
					r.push(`The last thing on peoples' minds these days is fucking you too.`);
				}
			} else if (PC.belly >= 60000) {
				r.push(`You feel sexy with such a huge belly, but it sure is tiring. Everyone can also tell you'll be having lots of babies — a boon to business, since everyone knows you ride bareback.`);
			} else if (PC.belly >= 45000) {
				r.push(`You both look and feel enormous, your belly juts out so much now. Your strategy worked! Eyes always end up locked onto you or your pregnancy, but they quickly return to your milky breasts.`);
			} else if (PC.belly >= 30000) {
				r.push(`You feel absolutely gigantic; you look like you're full-term with`);
				if (PC.pregType === 2) {
					r.push(`twins (which you are).`);
				} else {
					r.push(`twins.`);
				}
				r.push(`You find the skimpiest outfit you can to complement your size; if people won't notice your other assets, then they might as well not notice your outfit either.`);
			} else if (PC.belly >= 14000) {
				r.push(`You don't even bother to try to be slutty anymore; your full-term globe of a belly just steals all the attention away from your other assets.`);
			} else if (PC.belly >= 12000) {
				r.push(`Your huge pregnant belly hides your crotch.`);
			} else if (PC.belly >= 10000) {
				r.push(`Your huge pregnant belly is tiring to carry around and is beginning to draw attention away from your other features.`);
			} else if (PC.belly >= 7000) {
				r.push(`You've switched to even skimpier clothing to show off your big pregnant belly.`);
			} else if (PC.belly >= 5000) {
				r.push(`Your outfit is only enhanced by your baby-filled belly, mostly because it adds to your slutty appearance. Though it is definitely impacting your business.`);
			} else if (PC.belly >= 3000) {
				r.push(`Your slutty bottoms are beginning to get hidden by your rounded middle.`);
			} else if (PC.belly >= 1500) {
				r.push(`Your slutty bottoms sexily hug your swollen middle.`);
			} else if (PC.belly >= 500) {
				r.push(`Your exposed midriff bulges out enough to give away your growing pregnancy.`);
			} else if (PC.belly >= 250) {
				r.push(`Your exposed midriff is noticeably bloated.`);
			} else if (PC.belly >= 100) {
				r.push(`When you look down, you can't help but notice your belly sticking out a little.`);
			}
			if (PC.preg >= 41) {
				r.push(`You can barely pull yourself and your overdue ${children} out of bed; every action is a chore, you keep bumping things, and your ${children} just won't calm down.`);
				if (PC.pregMood === 1) {
					r.push(`However, thanks to all your tenderness, your slaves are more than happy to do everything they can for you.`);
				} else if (PC.pregMood === 2) {
					if (V.seeDicks !== 0) {
						r.push(`Your slaves, those with dicks especially,`);
					} else {
						r.push(`Your slaves`);
					}
					r.push(`are terrified of being seen by you, knowing full well that they will be bearing the full weight of your body as you satisfy your desires.`);
				}
			} else if (PC.preg >= 39) {
				r.push(`Every action you take is exhausting, though your slaves are more than capable of serving your every whim.`);
				if (PC.pregMood === 1) {
					r.push(`Even in the final stages of pregnancy, you make sure the slaves attending you are treated as if the were your favorite clients.`);
				} else if (PC.pregMood === 2) {
					r.push(`Your hormones practically rule you, leading you to demand your slaves to be prepared to pleasure you at a moment's notice. Your needy cunt hungers for dick and you don't care`);
					if (V.seeDicks !== 0) {
						r.push(`what it is attached to`);
					} else {
						r.push(`if it's made of plastic`);
					}
					r.push(`right now.`);
				}
			} else if (PC.preg >= 36) {
				r.push(`Every kick from your eager ${children} threatens to dislodge your breasts from your struggling top.`);
				if (PC.pregMood === 1) {
					r.push(`While you may be demanding and needy, you do everything you can to treat them as if they were a virgin client.`);
				} else if (PC.pregMood === 2) {
					r.push(`You know it's unbecoming for an arcology owner, but you need a dick in you even more than usual.`);
				}
			} else if (PC.preg >= 32) {
				if (PC.pregMood === 1) {
					r.push(`You can't help but enjoy having a slave, or client, suckle from you while you relax with them in your lap.`);
				} else if (PC.pregMood === 2) {
					r.push(`You don't let your pregnancy get in the way when it comes to sex; you make sure your slaves, and clients, learn just how much you know about sex.`);
				}
			} else if (PC.preg >= 28) {
				if (PC.pregMood === 1) {
					r.push(`You catch yourself playfully teasing your slaves from time to time.`);
				} else if (PC.pregMood === 2) {
					r.push(`Your sex drive has become unquenchable as of late.`);
				}
			} else if (PC.preg === 22) {
				r.push(`Something startling happened this week; while enjoying a slave, your belly button popped out!`);
			} else if (PC.preg === 8 && PC.pregSource > 0) {
				const babyDaddy = findFather(PC.pregSource);
				if (babyDaddy) {
					babyDaddy.counter.PCKnockedUp++;
				}
				if (V.slaveIndices[PC.pregSource]) {
					const {him} = getPronouns(babyDaddy);
					r.push(`Rumors spread among your slaves that your middle is swollen with ${babyDaddy.slaveName}'s child. They're not wrong, though`);
					if (babyDaddy.devotion > 20) {
						r.push(`${babyDaddy.slaveName} is broken enough to not try and use it against you. In fact, it might even draw ${him} closer to you.`);
					} else {
						r.push(`you'd have liked it to have kept that from ${babyDaddy.slaveName}, lest the rebellious bitch use it to remain defiant.`);
					}
				}
			}
		}
	} else {
		if (PC.preg > 0) {
			if (PC.belly >= 120000) {
				r.push(`You don't know how much more you can take. You feel so full and your children never calm down. You swear they take shifts tormenting your poor bladder. Even worse, your pregnancy juts out over a`);
				if (V.showInches === 2) {
					r.push(`half-yard`);
				} else {
					r.push(`half-meter`);
				}
				r.push(`from your front and has soundly defeated your maternity suit.`);
				if (PC.dick !== 0) {
					r.push(`Occasionally one of the bottoms manages to land a series of hits to your prostate, not that you mind as much, save for when they keep at it and you a can't restrain your orgasm. The last thing you want to do in a meeting is spontaneously climax and cum your in clothes.`);
				}
			} else if (PC.belly >= 105000) {
				r.push(`You can barely function any more. You're so big and heavy that even the simplest of actions requires both intense effort and thought just to get it done. Your suit buttons keep popping, and much to your annoyance, your ${children} will not stay still enough to let you redo them.`);
			} else if (PC.belly >= 90000) {
				if (fertilityRefreshment === 1) {
					r.push(`You may have a problem, but then again, you did take all those fertility drugs, so you can't really say you didn't want it.`);
				} else {
					r.push(`You may have a problem. You took fertility drugs, but you shouldn't be getting this big.`);
				}
				r.push(`Judging by how far along you are, you must be carrying ${pregNumberName(PC.pregType, 2)}. Your suit is also starting to get tight, but it's far less of a concern at this point.`);
			} else if (PC.belly >= 75000) {
				r.push(`Your belly is starting to become worrying. You're positively gigantic and quite tired. As an added stress, your maternity suit highlights your pregnancy.`);
			} else if (PC.belly >= 60000) {
				r.push(`Your new outfit is handling your enormous belly quite well, though it does nothing to hide your size. Everyone can tell you'll be having lots of babies and judges you accordingly.`);
			} else if (PC.belly >= 45000) {
				r.push(`You both look and feel enormous, your belly juts out so much now. Your tailor finally managed to get you a bigger maternity suit, one with extra give in the middle, but you feel it draws attention right to your gravidity.`);
			} else if (PC.belly >= 30000) {
				r.push(`You feel absolutely gigantic; you look like you're full-term with`);
				if (PC.pregType === 2) {
					r.push(`twins (which you are).`);
				} else {
					r.push(`twins.`);
				}
				r.push(`Having such a big belly in such poor attire weighs heavily under the public's eye.`);
			} else if (PC.belly >= 15000) {
				r.push(`You don't even bother to try to cover your full-term sized pregnancy, opting to just let it hang out of your old clothing. Every action you take is exhausting; though your slaves are more than capable of serving your every desire.`);
			} else if (PC.belly >= 12000) {
				r.push(`Your huge pregnant belly strains the buttons on your maternity suit.`);
			} else if (PC.belly >= 10000) {
				r.push(`Your huge pregnant belly is tiring to carry around and is beginning to stretch out your new clothes.`);
			} else if (PC.belly >= 7000) {
				r.push(`You've switched to using what can only be called formal maternity wear to cover your pregnant belly.`);
			} else if (PC.belly >= 5000) {
				r.push(`You can barely cover your baby-filled belly; not only is it obvious, but it is getting in the way of your business.`);
			} else if (PC.belly >= 3000) {
				r.push(`You're starting to get pretty big; you feel like everyone just focuses on your gravidity now.`);
			} else if (PC.belly >= 1500) {
				r.push(`Your belly is now large enough that there is no hiding it. Your top strains to cover it.`);
			} else if (PC.belly >= 500) {
				r.push(`Your top tightly clings to your early pregnancy, though you manage to conceal it well enough.`);
			} else if (PC.belly >= 250) {
				r.push(`Your top tightly clings to your bloated middle.`);
			} else if (PC.belly >= 100) {
				r.push(`Your top feels oddly tight around your middle.`);
			}
			if (PC.preg >= 41) {
				r.push(`You can barely pull yourself and your overdue ${children} out of bed; every action is a chore, you keep bumping into things, and your ${children} just won't calm down.`);
				if (PC.pregMood === 1) {
					r.push(`However, thanks to all your mothering, your slaves are more than happy to do everything they can for you.`);
				} else if (PC.pregMood === 2) {
					if (V.seeDicks !== 0) {
						r.push(`Your slaves, those with dicks especially,`);
					} else {
						r.push(`Your slaves`);
					}
					r.push(`are terrified of being seen by you, knowing full well that they will be bearing the full weight of your body as you satisfy your desires.`);
				}
			} else if (PC.preg >= 39) {
				if (PC.pregMood === 1) {
					r.push(`Even in the final stages of pregnancy, you make sure the slaves attending you are treated as if they were your own children.`);
				} else if (PC.pregMood === 2) {
					r.push(`Your hormones practically rule you, leading you to demand your slaves to be prepared to pleasure you at a moment's notice. Your needy cunt hungers for dick and you don't care`);
					if (V.seeDicks !== 0) {
						r.push(`what it is attached to`);
					} else {
						r.push(`if it's made of plastic`);
					}
					r.push(`right now.`);
				}
			} else if (PC.preg >= 36) {
				r.push(`Every kick from your eager ${children} threatens to send your buttons flying.`);
				if (PC.pregMood === 1) {
					r.push(`While you may be demanding and needy, you do everything you can to treat them as if they were your own children.`);
				} else if (PC.pregMood === 2) {
					r.push(`You know it's unbecoming for an arcology owner, but you need a dick in you and you don't care from where.`);
				}
			} else if (PC.preg >= 32) {
				if (PC.pregMood === 1) {
					r.push(`You can't help but enjoy having a slave suckle from you while you relax with them in your lap.`);
				} else if (PC.pregMood === 2) {
					r.push(`You don't let your pregnancy get in the way when it comes to sex; you make sure your slaves learn new positions to accommodate your bulk.`);
				}
			} else if (PC.preg >= 28) { // PC.preg > PC.pregData.normalBirth * .66
				if (PC.pregMood === 1) {
					r.push(`You catch yourself babying your slaves from time to time.`);
				} else if (PC.pregMood === 2) {
					r.push(`Your sex drive has become unquenchable as of late.`);
				}
			} else if (PC.preg === 22) {
				r.push(`Something startling happened this week; while enjoying a slave, your belly button popped out!`);
			} else if (PC.preg === 8 && PC.pregSource > 0) {
				const babyDaddy = findFather(PC.pregSource);
				if (babyDaddy) {
					babyDaddy.counter.PCKnockedUp++;
				}
				if (V.slaveIndices[PC.pregSource]) {
					const {him} = getPronouns(babyDaddy);
					r.push(`Rumors spread among your slaves that your middle is swollen with ${babyDaddy.slaveName}'s child. They're not wrong, though`);
					if (babyDaddy.devotion > 20) {
						r.push(`${babyDaddy.slaveName} is broken enough to not try and use it against you. In fact, it might even draw ${him} closer to you.`);
					} else {
						r.push(`you'd have liked it to have kept that from ${babyDaddy.slaveName}, lest the rebellious bitch use it to remain defiant.`);
					}
				}
			}
		}
	}

	return r.join(" ");
};
