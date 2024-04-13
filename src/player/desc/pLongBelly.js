App.Desc.Player.belly = function(PC = V.PC) {
	const r = [];
	const {girlP, womanP, loliP} = getPronouns(PC).appendSuffix("P");

	const isBellyFluidLargest = (PC.bellyFluid >= PC.bellyPreg && PC.bellyFluid >= PC.bellyImplant);

	function stackedInflation() {
		const r = [];

		if (PC.bellyFluid >= 1500) {
			if (PC.belly >= 10000 || (PC.belly >= 5000 && PC.bellyImplant > 0)) {
				if (PC.inflationMethod === 2) {
					r.push(`There is a distinct curve to your upper belly, thanks to your ${PC.inflationType}-filled stomach.`);
				} else {
					r.push(`Your stomach bulges a little larger thanks to all the ${PC.inflationType} forced up your rear.`);
				}
			} else if (PC.belly >= 5000) {
				if (PC.inflationMethod === 2) {
					r.push(`You have a bit of a double belly, since your stomach is filled with ${PC.inflationType} and resting heavily on your womb.`);
				} else {
					r.push(`Your stomach bulges a little larger thanks to all the ${PC.inflationType} forced up your rear.`);
				}
			}
		}

		return r.join(" ");
	}

	function flesh() {
		const r = [];
		let bellySagType = PC.bellySagPreg > 1 ? "your recent pregnancy" : "being overfilled";

		// add better bursting descriptions to the rapidCellGrowth blocks (2000, 3200, 4500) at sizes over 100000, maybe latter two for all? (stretchmarks, deep stretchmarks, oozing stretchmarks)
		if (PC.belly >= 1000000) {
			if (PC.bellyPreg > 0) {
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`<span class="red">a belly so large and full of life that words fail you.</span>`);
				} else {
					r.push(`your record breaking pregnancy.`);
				}
				if (PC.physicalAge <= 12) {
					r.push(`You have been reduced to nothing more than`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`a breaking womb with a ${loliP} attached. It's a constant struggle to not be lost under the quivering mass of infants that consume every available space inside you.`);
					} else {
						r.push(`an overstuffed womb with a ${loliP} attached. It's a constant struggle to not be lost under the quivering mass of infants that fill your body.`);
					}
				} else {
					r.push(`You have been reduced to nothing more than`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`a breaking womb with a ${girlP} attached.`);
					} else {
						r.push(`an overstuffed womb with a ${girlP} attached.`);
					}
					r.push(`You are physically unable to keep your`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`straining`);
					}
					r.push(`belly off the ground.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched past its limit, resembling a "normal" pregnancy more than the gut it is.`);
				}
				r.push(`You are so full, you can clearly make out the distinct features of each of the outermost infants forced against the thin layer of skin and womb by their countless siblings. Your womb is so cramped, its contents are practically shrinkwrapped under the sheer pressure.`);
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`Your stomach has taken up a rather bruised tone; you likely don't have much time left.`);
				}
				if (PC.preg >= PC.pregData.normalBirth * .90) {
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`Fortunately, you can feel the weight of many children beginning to crowd around the exit; you'll be in the throes of labor for days, but it's better than the alternative.`);
					}
				} else if (PC.belly > (PC.pregAdaptation * 1000)) {
					if (PC.preg < PC.pregData.normalBirth / 1.33) {
						r.push(`Even more damning, you aren't even close to full term. It will take a miracle to complete this pregnancy intact.`);
					}
				} else {
					r.push(`You cannot deny how freakish it is that your body has become so twisted around fecundity that this obscene pregnancy is perfectly reasonable to it. Apparently your role in life is to make babies, and lots of them.`);
					if (PC.preg < PC.pregData.normalBirth / 1.33) {
						r.push(`Worse still, you aren't even close to full term. It is a bit worrying to think about just how far your body is going to go for the sake of reproduction.`);
					}
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`While it is physically impossible to check every angle of your lumpy entirety, there's not a single stretch mark marring what skin you can see. It's unthinkable that a ${girlP} of your size could have such flawless skin, but then again, you do have special properties.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`It's disturbing that your body has become so adapted to pregnancy that it has stretched to such a degree as to accommodate this many babies without a single stretch mark.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to increase the plasticity of your expansive belly. Your skin is so tight that your stretch marks are beginning to become worryingly wide.`);
				}
			} else {
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`<span class="red">a belly stretched beyond any recommended limit.</span>`);
				} else {
					r.push(`a belly inflated into the depths of insanity.`);
				}
				if (PC.physicalAge <= 12) {
					r.push(`You have been reduced to nothing more than an obscene over-filled implant with a ${loliP} attached. It's a straining mass that`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`threatens to burst out of your body`);
					} else {
						r.push(`completely fills your body`);
					}
					r.push(`and makes life a struggle to not be crushed beneath its weight.`);
				} else {
					r.push(`You have been reduced to nothing more than an obscene over-filled implant with a ${girlP} attached. You are physically unable to keep your`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`straining`);
					}
					r.push(`belly off the ground, which certainly makes life complicated.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched to its limit, so much so your folds have been pulled flat and your softness, firm. The implant takes up so much room in your body that it can be clearly seen through your skin.`);
				} else {
					r.push(`The implant filling your body takes up so much room that it can be clearly seen through your skin.`);
				}
				r.push(`It is so full, not one motion can be seen in its contents nor can one push their hand into it.`);
				if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`Unbelievably, your body has become so twisted around fecundity that it isn't even bothered by this extreme gravidity; while your implant may be beyond its limits, you most certainly aren't.`);
				} else {
					r.push(`It's a wonder that both you and the implant have managed to hold together this long.`);
				}
			}
			r.push(stackedInflation());
			if (isMovable(PC) && !canMove(PC)) {
				r.push(`It takes a little repositioning, but your wheelchair allows you to see your various sides with ease; a feat, really.`);
			} else if (canMove(PC)) {
				r.push(`As laughable as it is, your only means of seeing your various sides is to pivot around your boundless middle as lifting it is out of the question. Even getting into a position to do this is an uphill battle.`);
			} else {
				r.push(`It's impossible to roll into a position where you can see anything other than your boundless middle. Half because it is you now, and half because you literally can't move it.`);
			}
		} else if (PC.belly >= 750000) {
			if (PC.bellyPreg > 0) {
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`<span class="red">a belly filled to bursting with life.</span>`);
				} else {
					r.push(`your obscenely immense baby bump.`);
				}
				if (PC.physicalAge <= 12) {
					r.push(`You have been reduced to nothing more than`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`a breaking womb with a ${loliP} attached. It's a constant struggle to not be lost under the squirming mass of infants that threaten to burst you.`);
					} else {
						r.push(`an overstuffed womb with a ${loliP} attached. It's a constant struggle to not be lost under the squirming mass of infants that fill your body.`);
					}
				} else if (PC.height < 150) {
					r.push(`You have been reduced to nothing more than`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`a breaking womb with a ${girlP} attached. It's a constant struggle to not be crushed under the squirming mass of infants that threaten to burst you.`);
					} else {
						r.push(`an overstuffed womb with a ${girlP} attached. It's a constant struggle to not be crushed under the squirming mass of infants that fill your body.`);
					}
				} else if (PC.muscles > 90) {
					r.push(`Your muscular body`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`barely manages to contain`);
					} else {
						r.push(`perfectly handles`);
					}
					r.push(`your monolithic pregnancy, though it doesn't mean you can really function with it.`);
				} else if (PC.height >= 185) {
					r.push(`You're tall enough that you can keep your ${(PC.belly > (PC.pregAdaptation * 1000)) ? "straining" : "life brimming"} belly from touching the ground,`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`but of course it's really bad idea to do so unless you wanted to explode like a baby-filled water balloon.`);
					} else {
						r.push(`but of course it's really bad idea to do so unless you want to encourage a hailstorm of kicks from your unborn babies.`);
					}
				} else {
					r.push(`You have been reduced to nothing more than`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`a breaking womb with a ${girlP} attached.`);
					} else {
						r.push(`an overstuffed womb with a ${girlP} attached.`);
					}
					r.push(`You are physically unable to keep your`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`straining`);
					}
					r.push(`belly off the ground.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched to its limit, so much so your folds have been pulled flat and your softness, firm. You are so full, the grotesque figures of the infants forced against your uterine walls by their siblings are clearly visible through your taut skin. Your womb is so cramped, they can barely squirm at all under the pressure and it is a medical wonder that you have managed to become this pregnant.`);
				} else {
					r.push(`You are so full, the grotesque figures of the infants forced against your uterine walls by their siblings are clearly visible through your taut skin. Your womb is so cramped, they can barely squirm at all under the pressure and it is a medical wonder that you have managed to become this pregnant.`);
				}
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`Your stomach has taken up a rather bruised tone; you likely don't have much time left.`);
				}
				if (PC.preg >= PC.pregData.normalBirth * .90) {
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`Fortunately, you can feel the weight of your children beginning to crowd around the exit; you'll soon be giving birth for hours, but it's better than the alternative.`);
					}
				} else if (PC.belly > (PC.pregAdaptation * 1000)) {
					if (PC.preg < PC.pregData.normalBirth / 1.33) {
						r.push(`Even more damning, you aren't even close to full term. It will take a miracle to complete this pregnancy intact.`);
					}
				} else {
					r.push(`You cannot deny how freakish it is that your body has become so twisted around fecundity that this absurd pregnancy is perfectly reasonable to it.`);
					if (PC.preg < PC.pregData.normalBirth / 1.33) {
						r.push(`Worse still, you aren't even close to full term. It is a bit worrying to think about just how large and full you will get by the end of this.`);
					}
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`While it is physically impossible to check every angle of your lumpy entirety, there's not a single stretch mark marring what skin you can see. It's unthinkable that a ${girlP} of your size could have such flawless skin, but then again, you do have special properties.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`It's disturbing that your body has become so adapted to pregnancy that it has stretched to such a degree as to accommodate this many babies without a single stretch mark.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to increase the plasticity of your expansive belly. Your skin is so tight that your stretch marks are beginning to become worryingly wide.`);
				}
			} else {
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`<span class="red">a belly stretched to its limit.</span>`);
				} else {
					r.push(`a belly inflated past any semblance of sanity.`);
				}
				if (PC.physicalAge <= 12) {
					r.push(`You have been reduced to nothing more than a ready-to-rupture implant with a ${loliP} attached. It's a straining mass that`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`threatens to burst out of your body`);
					} else {
						r.push(`completely fills your body`);
					}
					r.push(`and makes life a struggle to not be crushed beneath its weight.`);
				} else if (PC.height < 150) {
					r.push(`You have been reduced to nothing more than a ready-to-rupture implant with a ${girlP} attached. It's a straining mass that`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`threatens to burst out of your body`);
					} else {
						r.push(`completely fills your body`);
					}
					r.push(`and makes life a struggle to not be crushed beneath its weight.`);
				} else if (PC.muscles > 90) {
					r.push(`Your muscular body`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`barely manages to contain`);
					} else {
						r.push(`perfectly handles`);
					}
					r.push(`your monolithic implant, though it doesn't mean you can really function with it.`);
				} else if (PC.height >= 185) {
					r.push(`You're tall enough that you can keep your ${(PC.belly > (PC.pregAdaptation * 1000)) ? "straining" : "monolithic"} belly from touching the ground, but of course it's really bad idea to do so unless you wanted to pop your implant.`);
				} else {
					r.push(`You have been reduced to nothing more than a ready-to-rupture implant with a ${girlP} attached. You are physically unable to keep your`);
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`straining`);
					}
					r.push(`belly off the ground.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched to its limit, so much so your folds have been pulled flat and your softness, firm. The implant takes up so much room in your body that it can be clearly seen through your skin.`);
				} else {
					r.push(`The implant filling your body takes up so much room that it can be clearly seen through your skin.`);
				}
				r.push(`It is so full, not one motion can be seen in its contents nor can one push their hand into it.`);
				if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`Your body has become so twisted around fecundity that it isn't even bothered by your extreme gravidity; while your implant may be at its limit, you most certainly aren't.`);
				} else {
					r.push(`It's a wonder that both you and the implant have managed to hold together this long.`);
				}
			}
			r.push(stackedInflation());
			if (isMovable(PC) && !canMove(PC)) {
				r.push(`It takes a little repositioning, but your wheelchair allows you to see your various sides with ease; a feat, really.`);
			} else if (canMove(PC)) {
				r.push(`As laughable as it is, your only means of seeing your various sides is to pivot around your boundless middle rather than try to reposition it to get a better look at yourself.`);
				if (PC.bellyPreg > 0) {
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`Not that you really want to try, since every kick inside you feels like a dagger to the gut and it's never just one.`);
					} else {
						r.push(`Not that you really want to try, since nobody wants to be the bottom of baby mountain and you really don't have the patience nor energy for them to sort it out themselves.`);
					}
				}
			} else {
				r.push(`It's impossible to really roll into a position where you can see anything other than your boundless middle.`);
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`Not that you really want to try, since you feel like the slightest jostle might cause you to blow.`);
				} else if (PC.bellyPreg > 0) {
					r.push(`Not that you really want to try, since any disturbance to the balance of power in your womb is liable to start a war that you really don't have the patience for.`);
				}
			}
		} else if (PC.belly >= 600000) {
			if (PC.bellyPreg > 0) {
				r.push(`your <span class="orange">titanic, frankly obscene, baby bump.</span>`);
				if (PC.physicalAge <= 12) {
					r.push(`You have been reduced to nothing more than an overfilled womb with a ${loliP} attached. Every move you make needs to be calculated in order to not be crushed under your own quivering mass.`);
				} else if (PC.height < 150) {
					r.push(`You have been reduced to nothing more than an overfilled womb with a ${girlP} attached. Every move you make needs to be calculated in order to not be crushed under your own quivering mass.`);
				} else if (PC.muscles >= 75) {
					r.push(`You're strong enough that you can pretend to lead some semblance of a normal life with such a overfilled womb weighing you down. The charade can only go on for so long before reality grounds you again.`);
				} else if (PC.height >= 185) {
					r.push(`You're tall enough that you can keep your overfull womb from touching the ground, but of course it's only temporary and the sheer weight of it quickly reminds you of why this is a bad idea.`);
				} else {
					r.push(`You have been reduced to nothing more than an overfilled womb with a ${girlP} attached. While it is possible for you to heft your quivering belly off the floor, the sudden impact of its inevitable return is too much of a risk to your unborn.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched to its limit, so much so your folds have been pulled flat and your softness, firm. Despite being so taut,`);
				} else {
					r.push(`Despite being stretched taut,`);
				}
				r.push(`your belly is visibly bulging and squirming from all the babies writhing inside you. Your uterus is packed so full that it's run out of space and can't stretch any more, forcing your babies up against its walls;`);
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`<span class="red">there is a real risk of it failing should you grow much larger.</span>`);
				} else {
					r.push(`your body seems perfectly fine with this development, however.`);
				}
				if (PC.preg < PC.pregData.normalBirth / 1.33) {
					r.push(`Given how far along, and very much at capacity, you are, you've clearly gotten yourself knocked up to a potentially life-threatening degree.`);
				} else if (PC.preg >= PC.pregData.normalBirth * .90) {
					r.push(`It's impossible to tell without closer examination, but your belly has dropped; you can see and feel the concentration of bulges crowding around the exit. You'll have to keep your schedule clear for when the birthing starts, since you're going to be at it for quite a while.`);
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`While it is physically impossible to check every angle of your entirety, there's not a single stretch mark marring what skin you can see. It's unthinkable that a ${girlP} of your size could have such flawless skin, but then again, you do have special properties.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`It's a little unnerving that your body has become so adapted to pregnancy that it has stretched to such a degree as to accommodate this many babies without a single stretch mark.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to increase the plasticity of your expansive belly. Your skin is so tight that your stretch marks are beginning to become worryingly wide.`);
				}
			} else {
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`<span class="red">a belly ready to pop.</span>`);
				} else {
					r.push(`a balloon of a belly that looks ready to pop.`);
				}
				if (PC.physicalAge <= 12) {
					r.push(`You have been reduced to nothing more than a greatly overfilled implant with a ${loliP} attached. Every move you make needs to be calculated in order to not be crushed under your own taut mass.`);
				} else if (PC.height < 150) {
					r.push(`You have been reduced to nothing more than a greatly overfilled implant with a ${girlP} attached. Every move you make needs to be calculated in order to not be crushed under your own taut mass.`);
				} else if (PC.muscles >= 75) {
					r.push(`You're strong enough that you can pretend to lead some semblance of a normal life with such a titanic belly weighing you down. The charade can only go on for so long before reality grounds you again.`);
				} else if (PC.height >= 185) {
					r.push(`You're tall enough that you can keep your titanic belly from touching the ground, but of course it's only temporary and the sheer weight of it quickly reminds you of why this is a bad idea.`);
				} else {
					r.push(`You have been reduced to nothing more than a greatly overfilled implant with a ${girlP} attached. While it is possible for you to heft your titanic belly off the floor, the sudden impact of its inevitable return is too much to bear.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched to its limit, so much so your folds have been pulled flat and your softness, firm. The implant takes up so much room in your body that it can be clearly seen through your skin. It is so full, not one motion can be seen in its contents.`);
				} else {
					r.push(`The implant filling your body takes up so much room that it can be clearly seen through your skin. It is so full, not one motion can be seen in its contents.`);
				}
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`Both it and you are at your respective limits, having it filled any larger may see both of you rupturing.`);
				} else {
					r.push(`While it may be at risk of rupturing, you yourself sure aren't. It's obscene that your body can support such an absurd mass inside itself without issue, but here you are.`);
				}
			}
			r.push(stackedInflation());
			if (isMovable(PC) && !canMove(PC)) {
				r.push(`It takes a little repositioning, but your wheelchair allows you to see your various sides with ease; a feat, really.`);
			} else if (canMove(PC)) {
				r.push(`As laughable as it is, it is now easier to pivot around your boundless middle than try to reposition it to get a better look at yourself.`);
				if (PC.bellyPreg > 0) {
					if (PC.belly > (PC.pregAdaptation * 1000)) {
						r.push(`Not that you really want to try, since every kick inside you feels like a punch to the gut and it's never just one.`);
					} else {
						r.push(`Not that you really want to try, since nobody wants to be the bottom of baby mountain and you really don't have the patience nor energy for them to sort it out themselves.`);
					}
				}
			} else {
				r.push(`It's practically impossible to roll into a position where you can see anything other than your boundless middle.`);
				if (PC.belly > (PC.pregAdaptation * 1000)) {
					r.push(`Not that you really want to try, since you feel like you could explode just from taking too deep of a breath.`);
				} else if (PC.bellyPreg > 0) {
					r.push(`Not that you really want to try, since any disturbance to the balance of power in your womb is liable to start a war that you really don't have the patience for.`);
				}
			}
		} else if (PC.belly >= 450000) {
			if (PC.bellyPreg > 0) {
				r.push(`your <span class="orange">absolutely immense baby bump.</span>`);
				if (PC.physicalAge <= 12) {
					r.push(`Your youthful figure is grotesquely bloated by your pregnancy. It's impossible to keep your gigantic belly off the floor and there is a very serious risk of you being pinned beneath its crushing weight.`);
				} else if (PC.height >= 185) {
					r.push(`You're tall enough that you can keep your gigantic pregnancy from touching the ground; it's a considerable effort that your back, nor children, approve of, though.`);
				} else if (PC.height < 150) {
					r.push(`Your petite figure is utterly dwarfed by your pregnancy. It's impossible to keep your gigantic belly off the floor and there is a very serious risk of you being pinned beneath its crushing weight.`);
				} else if (PC.muscles > 30) {
					r.push(`You're strong enough that you can pretend to lead some semblance of a normal life with such a gigantic pregnancy weighing you down.`);
				} else {
					r.push(`Your body is dwarfed by your pregnancy. While it is possible for you to keep your gigantic belly off the floor, it isn't worth the risk of throwing out your back to do so. The ornery kicking doesn't do you any favors either.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched to its limit, so much so your folds have been pulled flat. Your expansive middle is covered in an ever thinning layer of fat, save for the bulging upper portion where the fat is thinnest. In that, rather large, area, you can just make out shapes of the many babies filling your body.`);
				} else {
					r.push(`You are so full that you are beginning to run out of room. You can certainly feel them bulging the surface of your pregnancy, but more concerning is the fact that you are capable of seeing their faint outlines as well.`);
				}
				if (PC.preg < PC.pregData.normalBirth / 1.33) {
					r.push(`Given how far along you are, you've pretty clearly managed to get yourself knocked up with an obscene, and very worrying, number of children.`);
				} else if (PC.preg >= PC.pregData.normalBirth * .90) {
					r.push(`It's hard to tell from the front, but your belly has dropped; you can see and feel the concentration of bulges beginning to crowd the exit. You'll have to keep your schedule clear for when the birthing starts, since you're going to be at it for quite a while.`);
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`While it is physically impossible to check every angle of your entirety, there's not a single stretch mark marring what skin you can see. It's unthinkable that a ${girlP} of your size could have such flawless skin, but then again, you do have special properties.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`It's a little unnerving that your body has become so adapted to pregnancy that it has stretched to accommodate so many babies with nary a stretch mark.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to stave off stretch marks across its expanse. Your skin is so tight that they can't be stopped at this point; better hope they are reversible afterwards.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be an immense massive baby bump.</span>`);
				if (PC.physicalAge <= 12) {
					r.push(`Your youthful figure is grotesquely bloated by your overfilled implant. It's impossible to keep the gigantic orb off the floor and there is a very serious risk of you being pinned beneath its crushing weight.`);
				} else if (PC.height >= 185) {
					r.push(`You're tall enough that you can keep your gigantic belly from touching the ground; it's a considerable effort that your back doesn't approve of, though.`);
				} else if (PC.height < 150) {
					r.push(`Your petite figure is utterly dwarfed by your overfilled implant. It's impossible to keep the gigantic orb off the floor and there is a very serious risk of you being pinned beneath its crushing weight.`);
				} else if (PC.muscles > 30) {
					r.push(`You're strong enough that you can pretend to lead some semblance of a normal life with such a gigantic belly weighing you down.`);
				} else {
					r.push(`Your body is dwarfed by your overfilled implant. While it is possible for you to keep your gigantic belly off the floor, it isn't worth the risk of throwing out your back to do so.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched to its limit, so much so your folds have been pulled flat. Your expansive middle is covered in an ever thinning layer of fat, save for the bulging upper portion where the fat is thinnest. In that, rather large, area, you can just make out the protruding form of the implant distending your stomach.`);
				} else {
					r.push(`The implant takes up so much of your body that you can almost clearly see it beneath your skin.`);
				}
			}
			r.push(stackedInflation());
			if (isMovable(PC) && !canMove(PC)) {
				r.push(`Not only is it impossible to see around your bulbous middle in the mirror, but it juts out so far that it is pressing against the cold surface despite a concentrated effort to not roll into it.`);
				if (PC.bellyPreg > 0) {
					r.push(`Of course, the impact set your brood off, so now your ${(PC.belly > (PC.pregAdaptation * 1000)) ? "sore" : ""} stomach is squirming about, making it difficult to get a good look at anything on its surface.`);
				}
			} else if (canMove(PC)) {
				r.push(`Not only is it impossible to see around your bulbous middle in the mirror, but it juts out so far that it is pressing against the cold surface despite your efforts to avoid being too close to it.`);
				if (PC.bellyPreg > 0) {
					r.push(`Of course, this set your brood off, so now your ${(PC.belly > (PC.pregAdaptation * 1000)) ? "sore" : ""} stomach is squirming about, making it difficult to get a good look at anything on its surface.`);
				}
			} else {
				r.push(`It's near impossible to roll into a position where you can see anything other than your boundless middle.`);
				if (PC.bellyPreg > 0) {
					r.push(`Not that you really want to try, since moving too fast tends to rile your brood up and it takes them far too long to settle back down.`);
				}
			}
		} else if (PC.belly >= 300000) {
			if (PC.bellyPreg > 0) {
				r.push(`your <span class="orange">abnormally massive baby bump.</span> It utterly dwarfs any normal pregnancy`);
				if (PC.physicalAge <= 12) {
					r.push(`and, in fact, your body as well. Since you are now more belly than ${girlP}, you are practically helpless and fully dependent on your slaves.`);
				} else if (PC.height >= 185) {
					r.push(r.pop() + `, but your tall frame makes living with it at least possible.`);
				} else if (PC.height < 150) {
					r.push(`and, in fact, your body as well. Since you are now more belly than ${girlP}, it is a real struggle to find any sort of position where your gravid mound isn't resting on the floor.`);
				} else if (PC.muscles > 30) {
					r.push(r.pop() + `, but your fit body allows you to at least physically support it.`);
				} else {
					r.push(`and, in fact, your body as well. Since you are now more belly than ${girlP}, it is a constant battle against letting your gravid mound reach the floor or risking being unable to lift it back up.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched considerably, pulling your folds nearly flat from the strain. Your pregnancy is covered in a thick layer of fat, save for the bulging upper portion where the fat is thinner.`);
				}
				if (PC.preg < PC.pregData.normalBirth / 1.33) {
					r.push(`Given how far along you are, you've pretty clearly managed to get yourself knocked up with an obscene, and slightly concerning, number of children.`);
				} else if (PC.preg >= PC.pregData.normalBirth * .90) {
					r.push(`It's hard to tell, but your belly has dropped; it won't be long now until it's time to start giving birth.`);
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`It might take effort to check your entirety, but there's not a single stretch mark marring your skin. It's really quite impressive for a ${girlP} of your size.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`Between the creams and your natural proclivity for pregnancy, there's not a single stretch mark marring your vast expanse of skin. If you had any peers, they might be jealous.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to stave off stretch marks across its expanse. You're so big and stretched that they are beginning to become prominent anyway, despite your efforts.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be an absurdly massive baby bump.</span> It dwarfs any normal pregnancy`);
				if (PC.physicalAge <= 12) {
					r.push(`and, in fact, your body as well. Since you are now more belly than ${girlP}, you are practically helpless and fully dependent on your slaves.`);
				} else if (PC.height >= 185) {
					r.push(r.pop() + `, but your tall frame makes living with it possible.`);
				} else if (PC.height < 150) {
					r.push(`and, in fact, your body as well. Since you are now more belly than ${girlP}, it is a real struggle to find any sort of position where your swollen midsection isn't resting on the floor.`);
				} else if (PC.muscles > 30) {
					r.push(r.pop() + `, but your fit body allows you to at least physically support it.`);
				} else {
					r.push(`and, in fact, your body as well. Since you are now more belly than ${girlP}, it is a constant battle against letting your swollen midsection reach the floor or risking being unable to lift it back up.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched considerably, pulling your folds nearly flat from the strain. Your expansive middle is covered in a thick layer of fat, save for the bulging upper portion where the fat is thinner.`);
				}
			}
			r.push(stackedInflation());
			if (isMovable(PC)) {
				r.push(`Not only is it impossible to see around your bulbous middle in the mirror, but it juts out so far that it is pressing against the cold surface despite your efforts to avoid being too close to it.`);
			} else {
				r.push(`It's near impossible to roll into a position where you can see anything other than your boundless middle.`);
			}
		} else if (PC.belly >= 150000) {
			if (PC.bellyPreg > 0) {
				r.push(`your <span class="orange">abnormally massive baby bump.</span> It protrudes further from you than any typical pregnancy ever should`);
				if (PC.physicalAge <= 12) {
					r.push(`and renders you barely capable of functioning under its sheer mass.`);
				} else if (PC.height >= 185) {
					r.push(r.pop() + `, but your tall frame makes living with it a bit more feasible.`);
				} else if (PC.height < 150) {
					r.push(`and practically cripples you between its size and weight.`);
				} else {
					r.push(`and is incredibly unwieldy to work with.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched considerably, pulling your folds nearly flat from the strain. Your pregnancy is covered in a thick layer of fat, save for the bulging upper portion where the fat is thinner.`);
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`It might take effort to check your entirety, but there's not a single stretch mark marring your skin. It's really quite impressive for a ${girlP} of your size.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`Between the creams and your natural proclivity for pregnancy, there's not a single stretch mark marring your vast expanse of skin. If you had any peers, they might be jealous.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to stave off stretch marks across its expanse. It's a losing prospect now that you're so big and your skin so stretched, however, but you've managed to keep them minimal.`);
				}
				if (PC.preg < PC.pregData.normalBirth / 1.33) {
					r.push(`Given how far along you are, you've pretty clearly managed to get yourself knocked up with an obscene number of children.`);
				} else if (PC.preg > PC.pregData.normalBirth * 1.05) {
					if (PC.pregType === 1) {
						r.push(`Your womb is laden with one single, utterly massive child. You can feel just how big and heavy it is from the amount of discomfort it puts on your body. At least you won't have to give birth to it, seeing as it is a physical impossibility.`);
					} else if (PC.pregType === 2) {
						r.push(`Your womb is laden with a pair of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to either of them, seeing as it is a physical impossibility.`);
					} else if (PC.pregType === 3) {
						r.push(`Your womb is laden with a trio of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to any of them, seeing as it is a physical impossibility.`);
					} else if (PC.pregType === 4) {
						r.push(`Your womb is laden with a quartet of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to any of them, seeing as it is a physical impossibility.`);
					} else if (PC.pregType === 5) {
						r.push(`Your womb is laden with a quintet of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to any of them, seeing as it is a physical impossibility.`);
					} else if (PC.pregType === 6) {
						r.push(`Your womb is laden with a sextet of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to any of them, seeing as it is a physical impossibility.`);
					} else if (PC.pregType === 7) {
						r.push(`Your womb is laden with a septet of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to any of them, seeing as it is a physical impossibility.`);
					} else if (PC.pregType === 8) {
						r.push(`Your womb is laden with a octet of oversized babies. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another seven after it.`);
					}
				} else if (PC.preg >= PC.pregData.normalBirth * .90) {
					r.push(`Your stomach is hanging lower than it used to; it won't be long now until it's time to start giving birth.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be an abnormally massive baby bump.</span> It protrudes further from you than any typical pregnancy would`);
				if (PC.physicalAge <= 12) {
					r.push(`and renders you barely capable of functioning under its sheer mass.`);
				} else if (PC.height >= 185) {
					r.push(r.pop() + `, but your tall frame makes living with it a bit more feasible.`);
				} else if (PC.height < 150) {
					r.push(`and practically cripples you between its size and weight.`);
				} else {
					r.push(`and is incredibly unwieldy to work with.`);
				}
				if (PC.weight > 190) {
					r.push(`Your massively fat belly is stretched considerably, pulling your folds nearly flat from the strain. Your expansive middle is covered in a thick layer of fat, save for the bulging upper portion where the fat is thinner.`);
				}
			}
			r.push(stackedInflation());
			r.push(`The region around your popped navel is now strictly off-limits to you, having moved completely out of your reach. Of course, that's where the itch you just can't scratch always is.`);
		} else if (PC.belly >= 120000) {
			if (PC.bellyPreg > 0) {
				r.push(`the <span class="orange">massive swell of your very pregnant belly`);
				if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's like having an entire second torso bulging out from your middle.`);
				} else if (PC.weight > 190) {
					r.push(r.pop() + `;</span> it's absolutely enormous with all the fat piled on it.`);
				} else if (PC.height >= 185) {
					r.push(r.pop() + `;</span> it juts out far ahead of you, but you're tall enough to steer it adequately.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a stark contrast compared to your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it juts out far ahead of you and is always in your way.`);
				}
				if (PC.preg < 40) {
					r.push(`Given how fast you're growing, you might have quite a few more mouths to feed than anticipated.`);
				} else if (PC.preg < 42) {
					r.push(`You feel like a blimp; your <span class="orange">full-term octuplets</span> make your life as arcology owner extremely difficult.`);
				} else if (PC.pregType === 1) {
					r.push(`Your womb is laden with one single, utterly massive child. You can feel just how big and heavy it is from the amount of discomfort it puts on your body. At least you won't have to give birth to it, seeing as it is a physical impossibility.`);
				} else if (PC.pregType === 2) {
					r.push(`Your womb is laden with a pair of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to either of them, seeing as it is a physical impossibility.`);
				} else if (PC.pregType === 3) {
					if (WombGetFetalSizeSum(PC) < 105000) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`It's a miracle your water hasn't broken yet, given that your womb contains more amniotic fluid than baby at this point. To be this size and only having triplets.`);
						} else {
							r.push(`You hope your triplets are enjoying their swim in the pool you feel like was forced up into you.`);
						}
					} else {
						r.push(`Your womb is laden with a trio of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to any of them, seeing as it is a physical impossibility.`);
					}
				} else if (PC.pregType === 4) {
					r.push(`Your womb is laden with a quartet of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to any of them, seeing as it is a physical impossibility.`);
				} else if (PC.pregType === 5) {
					r.push(`Your womb is laden with a quintet of massive children. They're heavy and rest uncomfortably inside you; there is no way you could give birth to one such monster, let alone five of them.`);
				} else if (PC.pregType === 6) {
					r.push(`Your womb is laden with a sextet of oversized babies. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another five after it.`);
				} else if (PC.pregType === 7) {
					r.push(`Your womb is laden with a septet of oversized babies. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another six after it.`);
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`It might take effort to check your entirety, but there's not a single stretch mark marring your skin. It's really quite impressive for a ${girlP} of your size.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`Between the creams and your natural proclivity for pregnancy, there's not a single stretch mark marring your vast expanse of skin. If you had any peers, they might be jealous.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to stave off stretch marks across its expanse. It's a losing prospect now that you're so big and your skin so stretched, however, but you've managed to keep them minimal.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be a massive baby bump laden with full-term octuplets`);
				if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's like having an entire second torso bulging out from your middle.`);
				} else if (PC.weight > 190) {
					r.push(r.pop() + `;</span> it's absolutely enormous with all the fat piled on it.`);
				} else if (PC.height >= 185) {
					r.push(r.pop() + `;</span> it juts out far ahead of you, but you're tall enough to steer it well enough.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a stark contrast compared to your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it juts out far ahead of you and is always in your way.`);
				}
			}
			r.push(stackedInflation());
			r.push(`It's so big you can't reach your popped navel without the risk of straining something.`);
		} else if (PC.belly >= 105000) {
			if (PC.bellyPreg > 0) {
				r.push(`the <span class="orange">enormous swell of your baby bump`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that you're pregnant.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
				if (PC.preg < 40) {
					r.push(`Given how fast you're growing, there's clearly more than seven crammed in there.`);
				} else if (PC.preg < 42) {
					if (PC.pregType === 3) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`It's a miracle your water hasn't broken yet, given that your womb contains more amniotic fluid than baby at this point. To be this size and only having triplets.`);
						} else {
							r.push(`You hope your triplets are enjoying their swim in the pool you feel like was forced up into you.`);
						}
					} else {
						r.push(`You feel absolutely massive; your <span class="orange">full-term septuplets</span> make your life as arcology owner very difficult.`);
					}
				} else if (PC.pregType === 1) {
					r.push(`Your womb is laden with one single, utterly massive child. You can feel just how big and heavy it is from the amount of discomfort it puts on your body. At least you won't have to give birth to it, seeing as it is a physical impossibility.`);
				} else if (PC.pregType === 2) {
					r.push(`Your womb is laden with a pair of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to either of them, seeing as it is a physical impossibility.`);
				} else if (PC.pregType === 3) {
					if (WombGetFetalSizeSum(PC) < 105000) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`It's a miracle your water hasn't broken yet; your triplets are surrounded by so much amniotic fluid that the slightest bump could unleash a flood.`);
						} else {
							r.push(`You feel like an overfilled water bed. You're certain that there are a pair of babies swimming around in you, but you've blown up like a ${girlP} having quads.`);
						}
					} else {
						r.push(`Your womb is laden with a trio of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to any of them, seeing as it is a physical impossibility.`);
					}
				} else if (PC.pregType === 4) {
					r.push(`Your womb is laden with a quartet of massive children. They're heavy and rest uncomfortably inside you; there is no way you could give birth to one such monster, let alone four of them.`);
				} else if (PC.pregType === 5) {
					r.push(`Your womb is laden with a quintet of oversized babies. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another four after it.`);
				} else if (PC.pregType === 6) {
					r.push(`Your womb is laden with a sextet of oversized babies. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another five after it.`);
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`It might take effort to check your entirety, but there's not a single stretch mark marring your skin.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`Between the creams and your natural proclivity for pregnancy, there's not a single stretch mark marring your vast expanse of skin.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to stave off stretch marks across its expanse.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be a baby bump laden with full-term septuplets`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut and the weight in its sway are the only obvious signs that something's bulging it outwards.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
			}
			r.push(stackedInflation());
			r.push(`You're pretty certain there are places on your body you can no longer reach; it's good to have slaves.`);
		} else if (PC.belly >= 90000) {
			if (PC.bellyPreg > 0) {
				r.push(`the <span class="orange">enormous swell of your baby bump`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that you're pregnant.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
				if (PC.preg < 40) {
					r.push(`Given how fast you're growing, there's clearly more than six crammed in there.`);
				} else if (PC.preg < 42) {
					r.push(`You feel absolutely massive; your <span class="orange">full-term sextuplets</span> make your life as arcology owner very difficult.`);
				} else if (PC.pregType === 1) {
					r.push(`Your womb is laden with one single, utterly massive child. You can feel just how big and heavy it is from the amount of discomfort it puts on your body. At least you won't have to give birth to it, seeing as it is a physical impossibility.`);
				} else if (PC.pregType === 2) {
					r.push(`Your womb is laden with a pair of utterly massive children. You can feel just how big and heavy they are from the amount of discomfort they put on your body. At least you won't have to give birth to either of them, seeing as it is a physical impossibility.`);
				} else if (PC.pregType === 3) {
					r.push(`Your womb is laden with a trio of massive children. They're heavy and rest uncomfortably inside you; there is no way you could give birth to one such monster, let alone three of them.`);
				} else if (PC.pregType === 4) {
					r.push(`Your womb is laden with a quartet of massive children. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another three after it.`);
				} else if (PC.pregType === 5) {
					r.push(`Your womb is laden with a quintet of oversized babies. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another four after it.`);
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`It might take effort to check your entirety, but there's not a single stretch mark marring your skin.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`Between the creams and your natural proclivity for pregnancy, there's not a single stretch mark marring your vast expanse of skin.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to stave off stretch marks across its expanse.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be a baby bump laden with full-term sextuplets`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut and the weight in its sway are the only obvious signs that something's bulging it outwards.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
			}
			r.push(stackedInflation());
			r.push(`You're pretty certain there are places on your body you can no longer reach; it's good to have slaves.`);
		} else if (PC.belly >= 75000) {
			if (PC.bellyPreg > 0) {
				r.push(`the <span class="orange">enormous swell of your baby bump`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that you're pregnant.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
				if (PC.preg < 40) {
					if (PC.pregType === 3) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`It's a miracle your water hasn't broken yet; your triplets are surrounded by so much amniotic fluid that the slightest bump could unleash a flood.`);
						} else {
							r.push(`You feel like an overfilled water bed. You're certain that there are a trio of babies swimming around in you, but you've blown up like a ${girlP} having quints.`);
						}
					} else {
						r.push(`Given how fast you're growing, there's clearly more than five crammed in there.`);
					}
				} else if (PC.preg < 42) {
					if (PC.pregType === 3) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`It's a miracle your water hasn't broken yet; your triplets are surrounded by so much amniotic fluid that the slightest bump could unleash a flood.`);
						} else {
							r.push(`You feel like a water balloon on the brink of bursting. You're certain that there are a trio of babies in you, but you've swollen up like a ${girlP} having quads.`);
						}
					} else {
						r.push(`You feel absolutely massive; your <span class="orange">full-term quintuplets</span> make your life as arcology owner very difficult.`);
					}
				} else if (PC.pregType === 1) {
					r.push(`Your womb is laden with one single, utterly massive child. You can feel just how big and heavy it is from the amount of discomfort it puts on your body. At least you won't have to give birth to it, seeing as it is a physical impossibility.`);
				} else if (PC.pregType === 2) {
					r.push(`Your womb is laden with a pair of utterly massive children. They're painfully heavy and rest uncomfortably inside you; there is no way such a monster would ever fit through you without tearing you asunder, but at least it would clear the way for its sibling.`);
				} else if (PC.pregType === 3) {
					r.push(`Your womb is laden with a trio of massive children. They're heavy and rest uncomfortably inside you; there is no way you could give birth to one such monster, let alone three of them.`);
				} else if (PC.pregType === 4) {
					r.push(`Your womb is laden with a quartet of oversized babies. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another three after it.`);
				}
				if (PC.geneMods.rapidCellGrowth === 1) {
					r.push(`It might take effort to check your entirety, but there's not a single stretch mark marring your skin.`);
				} else if (PC.belly <= (PC.pregAdaptation * 1000)) {
					r.push(`Between the creams and your natural proclivity for pregnancy, there's not a single stretch mark marring your vast expanse of skin.`);
				} else {
					r.push(`There's a slight sheen from all the cream you go through to stave off stretch marks across its expanse.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be a baby bump laden with full-term quintuplets`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut and the weight in its sway are the only obvious signs that something's bulging it outwards.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
			}
			r.push(stackedInflation());
			r.push(`It's beginning to be quite the challenge to reach all of it.`);
		} else if (PC.belly >= 60000) {
			if (PC.bellyPreg > 0) {
				r.push(`the <span class="orange">enormous swell of your baby bump`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that you're pregnant.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
				if (PC.preg < 40) {
					if (PC.pregType === 3) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`Your womb is grossly inflated with excess amniotic fluid, masking that you're only having triplets.`);
						} else {
							r.push(`Your belly feels weird and kind of squishy, like it's more fluid than baby or something. You're pretty sure you're having triplets, so something else is going on.`);
						}
					} else {
						r.push(`Given how fast you're growing, there's clearly more than four packed in there.`);
					}
				} else if (PC.preg < 42) {
					if (PC.pregType === 2) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`It's a miracle your water hasn't broken yet; your twins are surrounded by so much amniotic fluid that the slightest bump could unleash a flood.`);
						} else {
							r.push(`You feel like an overfilled water bed. You're certain that there are a pair of babies swimming around in you, but you've blown up like a ${girlP} having quads.`);
						}
					} else if (PC.pregType === 3) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`It's a miracle your water hasn't broken yet; your triplets are surrounded by so much amniotic fluid that the slightest bump could unleash a flood.`);
						} else {
							r.push(`You feel like a water balloon on the brink of bursting. You're certain that there are a trio of babies in you, but you've swollen up like a ${girlP} having quads.`);
						}
					} else {
						r.push(`You feel absolutely massive; your <span class="orange">full-term quadruplets</span> make your life as arcology owner very difficult.`);
					}
				} else if (PC.pregType === 1) {
					r.push(`Your womb is laden with one single, utterly massive child. It's painfully heavy and rests uncomfortably inside you; there is no way such a monster would ever fit through you without tearing you asunder.`);
				} else if (PC.pregType === 2) {
					r.push(`Your womb is laden with a pair of massive children. They're heavy and rest uncomfortably inside you; there is no way you could give birth to one such monster, let alone two of them.`);
				} else if (PC.pregType === 3) {
					r.push(`Your womb is laden with a trio of oversized babies. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone push out another two after it.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be a baby bump laden with full-term quadruplets`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut and the weight in its sway are the only obvious signs that something's bulging it outwards.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
			}
			r.push(stackedInflation());
			r.push(`It's a good thing the mirror is as wide as it is; you'd have trouble viewing all of yourself otherwise.`);
		} else if (PC.belly >= 45000) {
			if (PC.bellyPreg > 0) {
				r.push(`the <span class="orange">enormous swell of your baby bump`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that you're pregnant.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
				if (PC.preg < 40) {
					if (PC.pregType === 3) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`Your womb is grossly inflated with excess amniotic fluid, masking that you're only having triplets.`);
						} else {
							r.push(`Your belly feels weird and kind of squishy, like it's more fluid than baby or something. You're pretty sure you're having triplets, so something else is going on.`);
						}
					} else {
						r.push(`Given how fast you're growing, there's clearly more than three packed in there.`);
					}
				} else if (PC.preg < 42) {
					if (PC.pregType === 2) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`It's a miracle your water hasn't broken yet; your twins are surrounded by so much amniotic fluid that the slightest bump could unleash a flood.`);
						} else {
							r.push(`You feel like a water balloon on the brink of bursting. You're certain that there are a pair of babies in you, but you've swollen up like a ${girlP} having triplets.`);
						}
					} else {
						r.push(`You feel absolutely massive; your <span class="orange">full-term triplets</span> make your life as arcology owner very difficult.`);
					}
				} else if (PC.pregType === 1) {
					r.push(`Your womb is laden with one single, massive child. It's very heavy and rests uncomfortably inside you; there is no way you could give birth to such a monster.`);
				} else if (PC.pregType === 2) {
					r.push(`Your womb is laden with a pair of massive children. They're heavy and situated uncomfortably inside you; there is no way you could give birth to one such monster, let alone two of them.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be a baby bump laden with full-term triplets`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that something's bulging it outwards.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
			}
			r.push(stackedInflation());
			r.push(`It's a good thing the mirror is as wide as it is; you'd have trouble viewing all of yourself otherwise.`);
		} else if (PC.belly >= 30000) {
			if (PC.bellyPreg > 0) {
				r.push(`the <span class="orange">enormous swell of your baby bump`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that you're pregnant.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
				if (PC.preg < 40) {
					r.push(`Given how fast you're growing, there's clearly more than two in there.`);
				} else if (PC.preg < 42) {
					if (PC.pregType === 1) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`While you may look ready to pop out twins at a moment's notice, there's really only one in there; the rest of your womb is filled with an obscene amount of amniotic fluid.`);
						} else {
							r.push(`You feel like a water balloon on the brink of bursting. You look like you're about to bring twins into the world, but you're pretty sure there's only one inside you.`);
						}
					} else {
						r.push(`You feel absolutely massive; your <span class="orange">full-term twins</span> make your life as arcology owner very difficult.`);
					}
				} else if (PC.pregType === 1) {
					if (WombGetFetalSizeSum(PC) < 30000) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`You feel like you're about to pop, literally; there is so much amniotic fluid around your child that your water could break at any moment.`);
						} else {
							r.push(`You feel like a water balloon on the brink of bursting. You're certain that there is a baby in you, even though your dam is about to burst and flood everything around you.`);
						}
					} else {
						r.push(`Your womb is laden with one single, massive child. It's heavy and rests uncomfortably inside you; there is no way you could give birth to such a monster.`);
					}
				}
			} else {
				r.push(`what <span class="orange">appears to be a baby bump laden with full-term twins`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that something's amiss.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
			}
			r.push(stackedInflation());
			r.push(`You have to shift back and forth to get a good look at the entire thing.`);
		} else if (PC.belly >= 15000) {
			if (PC.bellyPreg > 0) {
				r.push(`the <span class="orange">enormous swell of your baby bump`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that you're pregnant.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
				if (PC.preg < 33) {
					if (WombGetFetalSizeSum(PC) < 15000 && PC.pregType === 1) {
						if (PC.skill.medicine >= 45 || V.pregnancyMonitoringUpgrade === 1) {
							r.push(`While you may look ready to drop at any moment, there's only one in there; the rest of your womb is filled with an abnormal amount of amniotic fluid.`);
						} else {
							r.push(`Your belly feels weird and kind of squishy, like it's more fluid than baby or something. You're pretty sure you're only having one, despite how fast you're growing.`);
						}
					} else {
						r.push(`Given how fast you're growing, there's clearly more than one in there.`);
					}
				} else {
					r.push(`You feel absolutely massive; your <span class="orange">full-term belly</span> makes your life as arcology owner very difficult.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be a full-term baby bump`);
				if (PC.weight > 190) {
					r.push(r.pop() + `.</span> Given how massively fat you are, the firmness at the top of your gut is the only obvious sign that something's amiss.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your poor little frame.`);
				} else {
					r.push(r.pop() + `;</span> it's a drum-taut bulge that dominates your frame.`);
				}
			}
			r.push(stackedInflation());
			r.push(`You have to shift back and forth a little to get a good look at the entire thing.`);
		} else if (PC.belly >= 10000) { // player inflation stops here (for now at least)
			if (isBellyFluidLargest) {
				r.push(`a <span class="orange">full tank of ${PC.inflationType}.</span>`);
				if (PC.weight > 160) {
					r.push(`Given how fat you are, it's hard to tell you're stuffed to the brim with it.`);
				} else if (PC.physicalAge <= 12) {
					r.push(`Such a massive, drum-taut belly just dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(`Such a massive, drum-taut belly just dominates your tiny frame.`);
				} else {
					r.push(`Such a massive, drum-taut belly is hard to look away from, especially with the noises coming out of it.`);
				}
			} else if (PC.bellyPreg > 0) {
				r.push(`a <span class="orange">hugely pregnant belly</span>`);
				if (PC.weight > 130) {
					r.push(`coated in a think layer of fat. Only when touched can you feel the telltale firmness of the baby-filled womb hidden beneath.`);
				} else if (PC.physicalAge <= 12) {
					r.push(`that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(`that dominates your tiny frame.`);
				} else {
					r.push(`that dominates your frame.`);
				}
				if (PC.preg < 20) {
					r.push(`Given how massive you've blown up in just a few months, it makes sense to be worried about just how large you're going to get.`);
				} else if (PC.preg < 30) {
					r.push(`Given how fast you're growing, there's clearly more than one in there.`);
				}
				r.push(stackedInflation());
				if (PC.belly >= 12000) {
					r.push(`You can barely wrap your arm${hasBothArms(PC) ? "s" : ""} around it, and when you do, your popped navel reminds you of the bun${PC.pregType ? "s" : ""} in your oven.`);
				} else {
					r.push(`Finding clothing that properly fits is becoming a weekly ordeal.`);
				}
			} else {
				r.push(`what <span class="orange">appears to be a huge baby bump</span>`);
				if (PC.weight > 130) {
					r.push(`coated in a think layer of fat. Only when touched can you feel the telltale firmness of the implant hidden beneath.`);
				} else if (PC.physicalAge <= 12) {
					r.push(`that lewdly dominates your poor little frame.`);
				} else if (PC.height < 150) {
					r.push(`that dominates your tiny frame.`);
				} else {
					r.push(`that dominates your frame.`);
				}
				r.push(stackedInflation());
				if (PC.belly >= 12000) {
					r.push(`You can barely wrap your arm${hasBothArms(PC) ? "s" : ""} around it, and when you do, your popped navel reminds you of just how much you've altered your body.`);
				} else {
					r.push(`Finding clothing that properly fits your implant is becoming a weekly ordeal.`);
				}
			}
		} else if (PC.belly >= 7000) {
			if (isBellyFluidLargest) {
				r.push(`a belly thoroughly stuffed with ${PC.inflationType}`);
				if (PC.weight > 130) {
					r.push(r.pop() + `.</span> Given how fat you are, it's hard to tell the difference.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's eye-catching on your little frame and tends to get in your way.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's eye-catching on your tiny frame and tends to get in your way.`);
				} else {
					r.push(r.pop() + `.</span>`);
				}
			} else if (PC.bellyPreg > 0) {
				r.push(`a <span class="orange">belly rounded with child`);
				if (PC.weight > 130) {
					r.push(r.pop() + `.</span> Given how fat you are, it can be hard to tell that at a glance.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's eye-catching on your little frame and starting to complicate day-to-day affairs.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's eye-catching on your tiny frame and starting to complicate day-to-day affairs.`);
				} else {
					r.push(`</span> that is starting to complicate day-to-day affairs.`);
				}
				r.push(stackedInflation());
			} else {
				r.push(`a <span class="orange">pregnant-looking belly`);
				if (PC.weight > 130) {
					r.push(r.pop() + `.</span> Given how fat you are, it just looks like a huge gut to most people.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's eye-catching on your little frame and starting to complicate day-to-day affairs.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's eye-catching on your tiny frame and starting to complicate day-to-day affairs.`);
				} else {
					r.push(`</span> that is starting to complicate day-to-day affairs.`);
				}
				r.push(stackedInflation());
			}
		} else if (PC.belly >= 5000) {
			if (isBellyFluidLargest) {
				r.push(`a belly stuffed with ${PC.inflationType}`);
				if (PC.weight > 130) {
					r.push(r.pop() + `.</span> Given how fat you are, it's hard to tell the difference.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's eye-catching on your little frame and tends to get in your way.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's eye-catching on your tiny frame and tends to get in your way.`);
				} else {
					r.push(r.pop() + `.</span>`);
				}
			} else if (PC.bellyPreg > 0) {
				r.push(`a <span class="orange">belly rounded with child`);
				if (PC.weight > 130) {
					r.push(r.pop() + `.</span> Given how fat you are, it can be hard to tell that at a glance.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's eye-catching on your little frame and starting to get in your way during sex and business.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's eye-catching on your tiny frame and starting to get in your way during sex and business.`);
				} else {
					r.push(`</span> that is starting to get in your way during sex and business.`);
				}
				r.push(stackedInflation());
			} else {
				r.push(`a <span class="orange">pregnant-looking belly`);
				if (PC.weight > 130) {
					r.push(r.pop() + `.</span> Given how fat you are, it just looks like a huge gut to most people.`);
				} else if (PC.physicalAge <= 12) {
					r.push(r.pop() + `;</span> it's eye-catching on your little frame and gets in your way during sex and business.`);
				} else if (PC.height < 150) {
					r.push(r.pop() + `;</span> it's eye-catching on your tiny frame and gets in your way during sex and business.`);
				} else {
					r.push(`</span> that gets in your way during sex and business.`);
				}
				r.push(stackedInflation());
			}
		} else if (PC.belly >= 1500) {
			if (isBellyFluidLargest) {
				r.push(`your <span class="orange">belly is visibly swollen with ${PC.inflationType}`);
				if (PC.bellySag > Math.trunc(PC.belly / 100)) {
					r.push(r.pop() + `,</span> but it is so catastrophically stretched out that it's hard to tell under all the loose skin.`);
				} else {
					if (PC.weight > 95) {
						r.push(r.pop() + `,</span> but it's covered in so much fat that it's not obvious.`);
					} else if (PC.physicalAge <= 12) {
						r.push(r.pop() + `;</span> it looks positively huge on your youthful frame.`);
					} else if (PC.height < 150) {
						r.push(r.pop() + `;</span> it looks positively huge on your tiny frame.`);
					} else if (PC.weight < -10) {
						r.push(r.pop() + `;</span> it juts out obviously from your thin form.`);
					} else {
						r.push(r.pop() + `,</span> taking on a distinct curvature.`);
					}
				}
			} else if (PC.bellyPreg > 0) {
				r.push(`<span class="orange">a visible baby bump`);
				if (PC.bellySag > Math.trunc(PC.belly / 100)) {
					r.push(r.pop() + `,</span> but it is so catastrophically stretched out that it's hard to tell under all the loose skin.`);
				} else {
					if (PC.weight > 95) {
						r.push(r.pop() + `,</span> but it's covered in so much fat that it's not obvious.`);
					} else if (PC.physicalAge <= 12) {
						r.push(`</span> that stands out on your youthful frame.`);
					} else if (PC.height < 150) {
						r.push(`</span> that stands out on your tiny frame.`);
					} else if (PC.weight < -10) {
						r.push(`</span> juts out obviously from your thin form.`);
					} else {
						r.push(r.pop() + `;</span> it's gotten large enough that there's no hiding it.`);
					}
				}
			} else {
				r.push(`your <span class="orange">fake baby bump`);
				if (PC.bellySag > Math.trunc(PC.belly / 100)) {
					r.push(r.pop() + `,</span> but it is so catastrophically stretched out that it's hard to tell under all the loose skin.`);
				} else {
					if (PC.weight > 95) {
						r.push(r.pop() + `;</span> it's not obvious covered in so much fat, though.`);
					} else if (PC.physicalAge <= 12) {
						r.push(`</span> juts out obviously from your youthful frame.`);
					} else if (PC.height < 150) {
						r.push(`</span> juts out obviously from your tiny frame.`);
					} else if (PC.weight < -10) {
						r.push(`</span> juts out obviously from your thin form.`);
					} else {
						r.push(r.pop() + `;</span> it's big enough that there's no hiding it.`);
					}
				}
			}
			if (PC.bellySag > 0) {
				r.push(`Your stomach is less saggy now that it ${(PC.bellyPreg > 0) ? "has" : "is"} filled out so much.`);
			}
		} else if (PC.belly >= 500) {
			if (isBellyFluidLargest) {
				r.push(`your <span class="orange">belly is very bloated with ${PC.inflationType}`);
			} else if (PC.bellyPreg > 0) {
				r.push(`your <span class="orange">belly is rounded by your early pregnancy`);
			} else {
				r.push(`your <span class="orange">belly is rounded out by your implant`);
			}
			if (PC.bellySag > Math.trunc(PC.belly / 100)) {
				r.push(r.pop() + `,</span> but it's difficult to tell with how stretched out it is.`);
			} else {
				if (PC.weight > 95) {
					r.push(r.pop() + `,</span> but it's covered in so much fat that it's near impossible to tell.`);
				} else if (PC.physicalAge <= 12) {
					r.push(`;</span> it's abundantly clear on your youthful frame.`);
				} else if (PC.weight < -10) {
					r.push(`;</span> it's very obvious on your thin frame.`);
				} else {
					r.push(r.pop() + `,</span> but it's not very obvious.`);
				}
				if (PC.bellySag > 0) {
					r.push(`Your stomach is less saggy now that it has filled out some.`);
				}
			}
		} else if (PC.belly >= 250) {
			if (isBellyFluidLargest) {
				r.push(`your <span class="orange">belly is bloated with ${PC.inflationType}`);
			} else if (PC.bellyPreg > 0) {
				r.push(`your <span class="orange">lower belly is beginning to stick out`);
			} else {
				r.push(`your <span class="orange">lower belly is sticking out`);
			}
			if (PC.bellySag > Math.trunc(PC.belly / 100)) {
				r.push(r.pop() + `,</span> but it's near impossible to tell with how stretched out it is.`);
				if (PC.bellyPreg > 0) {
					r.push(`You're still definitely pregnant, despite that.`);
				}
			} else {
				if (PC.weight > 95) {
					r.push(r.pop() + `,</span> but it's covered in so much fat that it's near impossible to tell.`);
				} else if (PC.physicalAge <= 12) {
					r.push(`;</span> it's abundantly clear on your youthful frame.`);
				} else if (PC.weight < -10) {
					r.push(`;</span> it's very obvious on your thin frame.`);
				} else {
					r.push(r.pop() + `,</span> but it's not very obvious.`);
				}
				if (PC.bellyPreg > 0) {
					r.push(`You're definitely pregnant.`);
				}
				if (PC.bellySag > 0) {
					r.push(`Your stomach is less saggy now that it has filled out some.`);
				}
			}
		} else if (PC.belly >= 100) {
			r.push(`your <span class="orange">belly is a little`);
			if (isBellyFluidLargest) {
				r.push(`bloated with ${PC.inflationType}`);
			} else if (PC.bellyPreg > 0) {
				r.push(`swollen`);
			} else {
				r.push(`bloated`);
			}
			if (PC.bellySag > Math.trunc(PC.belly / 100)) {
				r.push(r.pop() + `,</span> but it's near impossible to tell with how stretched out it is.`);
				if (PC.bellyPreg > 0) {
					r.push(`In addition to this development, you've also missed your period, so odds are you're pregnant.`);
				}
			} else {
				if (PC.weight > 95) {
					r.push(r.pop() + `,</span> but it's covered in so much fat that it's near impossible to tell.`);
				} else if (PC.physicalAge <= 12) {
					r.push(`</span> and abundantly clear on your youthful frame.`);
				} else if (PC.weight < -10) {
					r.push(`</span> and very obvious on your thin frame.`);
				} else {
					r.push(r.pop() + `,</span> but not very obvious.`);
				}
				if (PC.bellyPreg > 0) {
					r.push(`Since, in addition to this development, you've also missed your period, odds are you're pregnant.`);
				}
				if (PC.bellySag > 0) {
					r.push(`Your stomach is less saggy now that it has filled out some.`);
				}
			}
		} else if (PC.bellySagPreg > 20) {
			r.push(`your`);
			if (PC.geneMods.rapidCellGrowth !== 1) {
				r.push(`stretch mark streaked`);
			} else {
				r.push(`overstretched`);
			}
			r.push(`stomach sags down to your knees after being distended for so long by so many children.`);
		} else if (PC.bellySag > 20) {
			r.push(`your`);
			if (PC.geneMods.rapidCellGrowth !== 1) {
				r.push(`stretch mark streaked`);
			} else {
				r.push(`overstretched`);
			}
			r.push(`stomach sags down to your knees after being stretched too much for too long.`);
		} else if (PC.weight > 190) {
			if (PC.muscles > 95) {
				r.push(`your massive abs are lost in an overwhelming sea of flab; you're so massively fat that your navel has also gone missing deep in one of your folds. Multiple thick rolls run along your belly's sides around to your flabby back.`);
			} else if (PC.muscles > 30) {
				r.push(`your abs are lost in an overwhelming sea of flab; you're so massively fat that your navel has also gone missing deep in one of your folds. Multiple thick rolls run along your belly's sides around to your flabby back.`);
			} else {
				r.push(`a tremendous amount of your weight billows outwards; you're so massively fat that your navel is lost deep in one of your folds. Multiple thick rolls run along your belly's sides around to your flabby back.`);
			}
			if (PC.bellySag >= 1) {
				r.push(`Your immensely fat belly sags`);
				if (PC.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`after ${bellySagType}, but most won't be able to tell since it has always sagged under its crushing weight and massive size.`);
			}
		} else if (PC.weight > 160) {
			if (PC.muscles > 95) {
				r.push(`your massive abs are shrouded by an extra thick layer of fat; you're so hugely obese that your navel is buried deep in one of your folds. It is just one of several thick rolls that run along your belly's sides around to your flabby back.`);
			} else if (PC.muscles > 30) {
				r.push(`your abs are hidden behind you massive, soft stomach; you're so hugely fat that your navel is buried deep in one of your folds. It is just one of several thick rolls that run along your belly's sides around to your flabby back.`);
			} else {
				r.push(`a huge amount of your weight billows outwards; you're so hugely fat that your navel is buried deep in one of your folds. It is just one of several thick rolls that run along your belly's sides around to your flabby back.`);
			}
			if (PC.bellySag >= 1) {
				r.push(`Your hugely fat belly is sagging`);
				if (PC.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`after ${bellySagType}, but most won't be able to tell since it always hangs low due to its size and weight.`);
			}
		} else if (PC.weight > 130) {
			if (PC.muscles > 95) {
				r.push(`your massive abs are shrouded by a thick layer of fat. In fact, you're so fat that your navel is buried in a fold of your belly that runs from it around to your back.`);
			} else if (PC.muscles > 30) {
				r.push(`your abs are hidden behind a huge soft stomach; you're so fat that a thick fold runs from your back to your navel.`);
			} else {
				r.push(`most of your weight can be found; you're so fat that a thick fold runs from your back to your navel.`);
			}
			if (PC.bellySag >= 1) {
				r.push(`Your big fat belly is sagging`);
				if (PC.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`after ${bellySagType}.`);
			}
		} else if (PC.weight > 95) {
			if (PC.muscles > 95) {
				r.push(`your massive abs are shrouded by a thick layer of fat. In fact, you're so fat that your navel disappeared into your folds as well.`);
			} else if (PC.muscles > 30) {
				r.push(`your abs are hidden behind a big soft stomach; you're so fat that your navel has disappeared into your belly fold.`);
			} else {
				r.push(`most of your weight can be found; you're so fat that your navel has disappeared into your belly fold.`);
			}
			if (PC.bellySag >= 1) {
				r.push(`Your fat belly is sagging`);
				if (PC.bellySag >= 10) {
					r.push(`considerably`);
				}
				r.push(`after ${bellySagType}.`);
			}
		} else if (PC.weight > 30) {
			if (PC.muscles > 30) {
				r.push(`a well-padded belly, but you're ripped enough that your abs are still ${PC.muscles > 95 ? "clearly" : "subtly"} visible.`);
			} else if (PC.muscles > 5) {
				r.push(`a chubby and soft belly; you've got abs in there somewhere, though.`);
			} else {
				r.push(`a chubby and soft belly.`);
			}
			if (PC.bellySag >= 1) {
				if (PC.muscles > 30) {
					r.push(`They've`);
				} else {
					r.push(`It's`);
				}
				if (PC.bellySag >= 10) {
					r.push(`been completely ruined from ${bellySagType}.`);
				} else if (PC.bellySag >= 5) {
					r.push(`been completely stretched out from ${bellySagType}.`);
				} else {
					r.push(`been a little stretched out by ${bellySagType}, however.`);
				}
			}
		} else if (PC.weight > 10) {
			if (PC.muscles > 30) {
				r.push(`ripped abs that are still visible beneath your layer of belly fat.`);
			} else if (PC.muscles > 5) {
				r.push(`a fit but soft middle; your toned abs blend into your belly fat.`);
			} else {
				r.push(`a pleasantly soft belly.`);
			}
			if (PC.bellySag >= 1) {
				if (PC.muscles > 5) {
					r.push(`They've`);
				} else {
					r.push(`It's`);
				}
				if (PC.bellySag >= 10) {
					r.push(`been completely ruined from ${bellySagType}.`);
				} else if (PC.bellySag >= 5) {
					r.push(`been completely stretched out from ${bellySagType}.`);
				} else {
					r.push(`been a little stretched out by ${bellySagType}, however.`);
				}
			}
		} else if (PC.weight >= -10) {
			if (PC.muscles > 30) {
				r.push(`rippling abs, each well-defined under the skin of your midsection.`);
			} else if (PC.muscles > 5) {
				r.push(`a nicely toned midsection.`);
			} else {
				r.push(`a flat belly with just a hint of softness to it.`);
			}
			if (PC.bellySag >= 1) {
				if (PC.bellySag >= 10) {
					r.push(`Well, you did; your belly has been completely ruined by ${bellySagType}.`);
				} else if (PC.bellySag >= 5) {
					r.push(`Well, you did; it's been completely stretched out from ${bellySagType}.`);
				} else if (PC.bellySag >= 2) {
					r.push(`It's still loose from ${bellySagType}, however.`);
				} else {
					r.push(`It's a bit loose still from ${bellySagType}, however.`);
				}
			}
		} else if (PC.weight >= -30) {
			if (PC.muscles > 30) {
				if (PC.bellySag >= 1) {
					r.push(`your chiseled abs are distorted and stretched from ${bellySagType}.`);
				} else {
					r.push(`you have chiseled abs clearly visible under the skin of your thin midsection.`);
				}
			} else if (PC.muscles > 5) {
				if (PC.bellySag >= 10) {
					r.push(`your once toned belly sags considerably from ${bellySagType}.`);
				} else if (PC.bellySag >= 5) {
					r.push(`your once toned belly is saggy from ${bellySagType}.`);
				} else if (PC.bellySag >= 2) {
					r.push(`a trim, if slightly bloated from ${bellySagType}, belly.`);
				} else if (PC.bellySag >= 1) {
					r.push(`a toned, if slightly swollen from ${bellySagType}, belly.`);
				} else {
					r.push(`a toned midsection.`);
				}
			} else {
				if (PC.bellySag >= 10) {
					r.push(`your once trim belly sags considerably from ${bellySagType}.`);
				} else if (PC.bellySag >= 5) {
					r.push(`your trim belly is saggy from ${bellySagType}.`);
				} else if (PC.bellySag >= 2) {
					r.push(`a trim, if slightly bloated from ${bellySagType}, belly.`);
				} else if (PC.bellySag >= 1) {
					r.push(`a trim, if slightly swollen from ${bellySagType}, belly.`);
				} else {
					r.push(`a trim midsection, without any hint of belly or musculature.`);
				}
			}
		} else {
			if (PC.muscles > 5) {
				if (PC.bellySag >= 10) {
					r.push(`a once trim belly that sags considerably from ${PC.bellySagPreg > 1 ? "your recent pregnancy" : "overstretching"}. As for your abs, they've seen better days.`);
				} else if (PC.bellySag >= 5) {
					r.push(`your trim belly and its abs are stretched and saggy from ${bellySagType}.`);
				} else if (PC.bellySag >= 2) {
					r.push(`your trim belly and its abs are a little stretched out from ${bellySagType}.`);
				} else if (PC.bellySag >= 1) {
					r.push(`your trim belly and its abs are a little swollen from ${bellySagType}.`);
				} else {
					r.push(`clear cut abs stretched over a trim belly.`);
				}
			} else {
				if (PC.bellySag >= 10) {
					r.push(`a once trim belly that sags considerably from ${bellySagType}.`);
				} else if (PC.bellySag >= 5) {
					r.push(`a trim belly still saggy from ${bellySagType}.`);
				} else if (PC.bellySag >= 2) {
					r.push(`a trim, if slightly bloated from ${bellySagType}, belly.`);
				} else if (PC.bellySag >= 1) {
					r.push(`a trim, if slightly swollen from ${bellySagType}, belly.`);
				} else {
					r.push(`a trim, if slightly concave, belly.`);
				}
			}
		}
		return r.join(" ");
	}

	function bellyAccessibility() {
		const r = [];

		if (PC.belly >= 300000) {
			if (V.pregAccessibility === 1) {
				r.push(`Fortunately, you've had the penthouse remodeled to support ${girlP}s with such motherly figures, so fitting through the doors, using furniture and reaching things isn't a concern.`);
			} else if (V.buttAccessibility === 1 || V.ballsAccessibility === 1 || V.boobAccessibility === 1) {
				r.push(`The halls and doors of the penthouse have already been remodeled to accommodate other enormous assets, so a ${girlP} with a figure as motherly as yours can still get around. Now if only you could use the rest of it without your belly getting in the way.`);
			} else {
				r.push(`Even worse, the penthouse was not designed to handle ${girlP}s with a figure as motherly as yours; you crowd the halls, get stuck in doors and on furniture, and can never reach anything without your belly bumping into something.`);
				 if (PC.belly >= 800000) {
					r.push(`Well you did, right up until you outgrew the bedroom door and became <span class="red">stuck inside it.</span>`);
				} else if (PC.belly >= 775000) {
					r.push(`Your bedroom door is especially bad... A little bit bigger and you may be stuck in here.`);
				}
			}
		}

		return r.join(" ");
	}

	function weight() {
		const r = [];
		const isBellyHeavy =
				(PC.belly >= 400000 + (PC.muscles * 2000) && PC.physicalAge >= 18) ||
				(PC.belly >= 300000 + (PC.muscles * 1000) && PC.physicalAge >= 13) ||
				(PC.belly >= 200000 + (PC.muscles * 800) && PC.physicalAge <= 12);
		const isBellyInWay =
			(PC.belly >= 60000) ||
			(PC.belly >= 60000 / (1 + Math.pow(Math.E, -0.4 * (PC.physicalAge - 14)))) ||
			(PC.belly >= Math.max(10000, ((12500 / 19) * PC.height) - (1172500 / 19)));

		if ((PC.physicalAge <= 12 && PC.belly >= 300000) ||
			(PC.physicalAge < 18 && PC.belly >= 600000) ||
			(PC.physicalAge >= 18 && PC.belly >= 1000000)) {
			if (PC.bellyPreg > 0) {
				r.push(`You've grown so large and heavy that`);
			} else {
				r.push(`You're so bulbous and heavy that`);
			}
			r.push(`you can no longer realistically move yourself are now confined to`);
			if (isMovable(PC)) {
				r.push(`a wheelchair.`);
				r.push(bellyAccessibility());
			} else {
				r.push(`your bedroom.`);
				if (PC.bellyPreg > 0) {
					r.push(`You'll never be lonely though, not with all the lives pinning you down.`);
				} else {
					r.push(`It's so wide that even lying down is uncomfortable without a mountain of pillows to support your body with.`);
				}
			}
		} else if (isBellyHeavy) {
			r.push(`You're so bulbous and heavy that it makes getting around a challenge.`);
			if (canWalk(PC)) {
				r.push(`Once you manage to get to your feet you're still capable of walking in an exaggerated waddle with a heavily arched back; whatever it takes to keep balance and support your crippling weight.`);
			} else if (PC.belly >= 750000) {
				r.push(`It's not surprising really, given your sheer mass and straining wheelchair.`);
			} else {
				r.push(`It's not surprising really, given your condition.`);
			}
			r.push(bellyAccessibility());
		} else if (isBellyInWay) {
			r.push(`Your legs and back get a serious workout from having to waddle around all day, but the biggest nuisance is just how much your belly is in the way of everything you do.`);
			r.push(bellyAccessibility());
		}

		return r.join(" ");
	}

	function mpreg() {
		const r = [];
		if (PC.mpreg === 1 && PC.belly < 100 && PC.weight < 10 && PC.bellySag === 0 && PC.genes !== "XX") {
			r.push(`Your abdomen has a subtle curve to it, right where your special womb rests.`);
		}
		return r.join(" ");
	}

	function thoughts() {
		const r = [];
		if (PC.belly >= 750000) {
			r.push(`You run your hand${hasBothArms(PC) ? "s" : ""} across as much of your belly as you can,`);
			if (PC.bellyPreg > 0) {
				r.push(`paying special attention to each and every child you caress. You like to think they're enjoying the attention as the squirm beneath your ministrations.`);
			} else {
				r.push(`savoring the tingling sensations that only an implant of this size can supply you.`);
			}
		} else if (PC.belly >= 600000) {
			r.push(`You caress your belly as best you can,`);
			if (PC.bellyPreg > 0) {
				r.push(`enjoying the bodies of your children pushing back against you.`);
			} else {
				r.push(`shuddering with overwhelming lust over just how far you've taken this.`);
			}
		} else if (PC.belly >= 450000) {
			r.push(`You caress your belly as best you can,`);
			if (PC.bellyPreg > 0) {
				r.push(`enjoying the sensations of life pushing back against you.`);
			} else {
				r.push(`shuddering with lust over just how far you've taken this.`);
			}
		} else if (PC.belly >= 300000) {
			if (PC.bellyPreg > 0) {
				r.push(`You caress your belly for a moment, enjoying the sensations of life inside you.`);
			} else {
				r.push(`You shudder with lust over the situation this belly has put you in.`);
			}
		} else if (PC.belly >= 120000) {
			r.push(`You can barely get up without a helping hand,`);
			if (PC.bellyPreg > 0) {
				r.push(`but doing so just riles up your children. You give your belly a pat for good measure, only encouraging your ${pregNumberName(PC.pregType, 2)} to squirm in excitement.`);
			} else {
				r.push(`but you wouldn't still have this belly if you didn't find that arousing, would you?`);
			}
		} else if (PC.belly >= 105000 && !canMove(PC) && isMovable(PC)) {
			r.push(`Getting in and out of your wheelchair is an ordeal these days, and that isn't even considering how far off of it you protrude.`);
		} else if (PC.belly >= 105000 && canStand(PC)) {
			r.push(`You have trouble standing up and sitting down, with the former an exhausting endeavor.`);
		} else if (PC.belly >= 90000 && canWalk(PC)) {
			r.push(`Even the shortest waddle is exhausting, and your ankles ache just thinking about the stairs.`);
		} else if (PC.belly >= 75000) {
			r.push(`You feel full at all times,`);
			if (PC.bellyPreg > 0) {
				r.push(`something your children love to remind you of as they kick away without a care.`);
			} else {
				r.push(`likely from the pressure being applied to your internal organs from the implant.`);
			}
		} else if (PC.belly >= 30000) {
			r.push(`Finding clothing that fits properly while suiting a ${womanP} of your status is becoming tiring, though not as much as the tailoring bills.`);
		} else if (PC.belly >= 1500 && isBellyFluidLargest) {
			r.push(`You pat your middle, eliciting an unhappy groan as your body does its best to digest everything you've forced into it.`);
		} else if (PC.weight > 95) {
			r.push(`The way you jiggle as you look yourself over is quite hypnotic.`);
			if (PC.weight > 130) {
				r.push(`You pat your middle as it starts to growl; your appetite is proportionate to your waistline these days.`);
			}
		}
		if (PC.geneticQuirks.uterineHypersensitivity === 2) {
			if (PC.bellyImplant >= 10000) {
				r.push(`The sensation of the implant pushing against your uterine walls drives you wild; even something as simple as stroking it can lead to orgasm.`);
			} else if (PC.belly > (PC.pregAdaptation * 4500)) {
				r.push(`Your womb and body are breaking from the sheer amount stuffed inside them, leaving you trapped between overwhelming pain and pleasure.`);
			} else if (PC.belly > (PC.pregAdaptation * 3200)) {
				r.push(`Your womb and body are fit to burst, but the pressure feels absolutely amazing. Every breath risks setting off another orgasm.`);
			} else if (PC.bellyPreg >= 750000) {
				r.push(`While the massive pressure is arousing enough, the real pleasure are the endless vibrations caused by the minute motions of your brood. It's practically impossible to get anything done when chaining orgasm after orgasm until you risk passing out.`);
			} else if (PC.bellyPreg >= 600000) {
				r.push(`Between the constant movement and the pressure against your sensitive womb, it's impossible to not be constantly aroused. The quivering never ends, trapping you in a game of orgasm roulette.`);
			} else if (PC.bellyPreg >= 450000) {
				r.push(`Between the movement and the pressure against your sensitive womb, it's impossible to not be constantly aroused. Any kick can send you over the edge, and there are just so many of them…`);
			} else if (PC.wombImplant === "restraint" && PC.belly >= 400000) {
				r.push(`Your womb is so full that the restraining mesh designed to support it has begun to strangle it, but thanks to your overly sensitive uterus, this feels way better than it should.`);
			} else if (PC.bellyPreg >= 10000) {
				r.push(`Between the movement and the pressure in your sensitive womb, you find it difficult to not be in a state of constant arousal.`);
			}
		} else if ((PC.dick > 0 || PC.genes === "XY") && PC.prostate > 0 && PC.preg > 0 && PC.preg > PC.pregData.normalBirth * .75) { // Do this here for dicks and males, otherwise do it in the special vagina description
			r.push(`Not only is your bladder under constant pressure from your advanced pregnancy, but your prostate is too. Between that and your baby's movements, you find it difficult to not be in a state of constant arousal.`);
		}
		if (onBedRest(PC)) {
			if (isInduced(PC)) {
				r.push(`You've taken drugs to induce labor and are already feeling the effects. The birth is coming up fast!`);
			} else if (PC.geneMods.rapidCellGrowth !== 1 && PC.bellyPreg >= 100000 && PC.belly > (PC.pregAdaptation * 3200) && (PC.bellyPreg >= 500000 || PC.wombImplant !== "restraint")) {
				r.push(`You are undergoing a <span class="red">very high risk pregnancy,</span> so to decrease the probability of ${V.seeExtreme === 1 && V.dangerousPregnancy === 1 ? "abdominal rupture" : "your water breaking early"}, you have been placed on medical bed rest.`);
			} else if (((PC.bellyPreg >= PC.pregAdaptation * 2200) || (PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2 && ft.age >= 20))) && PC.geneMods.progenitor !== 1) {
				r.push(`You are undergoing a <span class="red">very high risk pregnancy,</span> so to avoid giving birth prematurely, you have been placed on medical bed rest.`);
			} else if (PC.preg > PC.pregData.normalBirth / 1.05) {
				r.push(`You're far enough along at this point that it's in your best interest to stay in the nest and wait things out instead of risking going to labor at an inopportune time.`);
			}
			if (PC.bellyPreg > PC.pregAdaptation * 1000 && PC.bellyPreg < PC.pregAdaptation * 2200 && PC.geneMods.progenitor !== 1) {
				r.push(`You are undergoing a <span class="red">high risk pregnancy,</span> so taking things easy is probably a good idea.`);
			}
		}
		return r.join(" ");
	}

	r.push(
		flesh(),
		mpreg(),
		weight(),
		thoughts()
	);


	/* translate between pregnancy and dick descriptions
	if (PC.preg > 0) {
		if (PC.belly < 100) {
			r.push(`Your <span class="red">period hasn't happened in some time;</span> you might be pregnant.`);
		}
	}
	*/

	return r.join(" ");
};
