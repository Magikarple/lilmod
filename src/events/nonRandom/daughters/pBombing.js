App.Events.PBombing = class PBombing extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.traitor === 0
		];
	}

	execute(node) {
		let r = [];
		let gameover = false;
		const {
			His, He,
			his, he, him
		} = getPronouns(S.Bodyguard ? S.Bodyguard : {pronoun: App.Data.Pronouns.Kind.neutral});

		V.nextButton = "Continue";

		if (S.Bodyguard) {
			App.Events.drawEventArt(node, S.Bodyguard);
		}
		V.fcnn.push("...new report on advances in security screening designed to sniff out small explosives like...");

		r.push(`One fine day, you're strolling down the main promenade, making your usual combined inspection and public rounds. These walks are triply useful, since they allow you to keep a finger on the pulse of your demesne, identify any problems, and display yourself to the population.`);
		if (S.Bodyguard) {
			r.push(`${S.Bodyguard.slaveName} is walking with you, of course; ${his} presence protection, intimidation, and ostentation, all in one.`);
		}

		r.push(`${capFirstChar(V.assistant.name)} suddenly relays a silent alarm, highlighting a scruffy individual twenty`);
		if (V.showInches === 2) {
			r.push(`yards`);
		} else {
			r.push(`meters`);
		}
		r.push(`ahead. This person is hooded and acting oddly. You catch a glance from beneath the hood in your direction, and the figure obviously decides that it can get no closer to you. Your assistant's scanning detects the presence of an implanted bomb moments before the suicide bomber detonates themself.`);

		r.push(`The implant is small, and went off too far ahead to do anything more than stun.`);
		if (S.Bodyguard) {
			r.push(`Since ${he} was behind you, ${S.Bodyguard.slaveName} is in much better shape than you, ${his} ears clear and ${his} senses sharp.`);
		}
		r.push(`Three other assailants run at you from where they were waiting in the confusion, wielding improvised weapons that apparently did not set off the security scanners.`);

		App.Events.addParagraph(node, r);
		r = [];

		if (S.Bodyguard) {
			if (getLimbCount(S.Bodyguard, 105) === 4) {
				r.push(`${S.Bodyguard.slaveName} glances at you to check that ${his} principal is alive, ${his} P-Limbs already entering combat mode. ${He} becomes more inhuman by the moment,`);
				if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 5) {
					r.push(`${his} calves unfolding to reveal stabilizers that slide down and broaden ${his} ground contact. The targeting programs in ${his} arms allow ${him} to fire ${his} light machine gun from the hip, and ${he} places a precise burst in each target.`);
				} else if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 4) {
					r.push(`the arm that holds ${his} battle rifle extending to lock to its foregrip and stock. With it fully attached to ${him}, ${he} raises that arm at each attacker in turn.`);
				} else if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 3) {
					r.push(`stabilizers extending from the forearm that holds ${his} submachine gun. ${He} fires it one-handed, the weapons barely moving at all as ${he} flicks from target to target.`);
				} else {
					r.push(`${his} hand extending fully around ${his} machine pistol even as ${he} brings it up to meet the first target. When its first magazine is expended, ${his} forearm unfolds to reveal another.`);
				}
				r.push(`Your bodyguard's enhancements are not exactly secret, however, and the attackers are numerous, sent to overwhelm ${him}. ${He} drops ${his} weapon, ammunition expended, producing a scream of triumph from one of the few remaining assailants. Nothing daunted, ${he} swings ${his} dominant hand down to ${his} thigh on that side. It unfolds and places a pistol in ${his} grip, which ${he} brings up and uses to end the engagement.`);
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`After reloading ${his} pistol from the ammunition compartment in ${his} other thigh, ${he} strides mechanically from body to body, a few of which are still moving. Stopping by each one, ${he} places ${his} palm against the base of each head with obscene care before extending the blade in ${his} forearm through it. This done, ${he} scans for further threats. There are none, and due to ${his} terrifying display there is <span class="prosperity inc">an increase in confidence in the security of ${V.arcologies[0].name}</span> and <span class="reputation inc">public applause for your skill in training ${him}.</span> There is some <span class="red">minor damage</span> to repair, but no lasting harm.`);
				cashX(-1000, "event", S.Bodyguard);
				repX(2500, "event", S.Bodyguard);
				V.arcologies[0].prosperity += 1;
			} else if (S.Bodyguard.skill.combat > 30) {
				r.push(`${S.Bodyguard.slaveName} glances at you to check that ${his} principal is alive for the moment, already`);
				if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 5) {
					r.push(`getting ${his} light machine gun into action. Since they're so close, ${he} doesn't even bother to shoulder the weapon, simply using ${his} weapon's firepower to dump rounds into each attacker.`);
				} else if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 4) {
					r.push(`bringing ${his} battle rifle up. ${He} swivels from target to target, placing a single round in each, using the weapon's devastating stopping power to good effect.`);
				} else if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 3) {
					r.push(`bringing ${his} submachine gun up. ${He} cradles the compact weapon in`);
					if (hasBothArms(S.Bodyguard)) {
						r.push(`both hands`);
					} else {
						r.push(`${his} hand`);
					}
					r.push(`and swivels from target to target, placing a long burst of fire in each, using the weapon's large ammunition capacity to good effect.`);
				} else {
					r.push(`drawing ${his} machine pistol. ${He} cradles the diminutive weapon in`);
					if (hasBothArms(S.Bodyguard)) {
						r.push(`both hands`);
					} else {
						r.push(`${his} hand`);
					}
					r.push(`and swivels from target to target, placing a disciplined burst of fire in each at its center of mass.`);
				}
				r.push(`None of them gets within five`);
				if (V.showInches === 2) {
					r.push(`yards.`);
				} else {
					r.push(`meters.`);
				}
				r.push(`${S.Bodyguard.slaveName} dispassionately places a round in the head of each body, reloads, and takes up a position from which ${he} can watch for further threats. There are none, and due to ${his} sterling conduct there is <span class="prosperity inc">an increase in confidence in the security of ${V.arcologies[0].name}</span> and <span class="reputation inc">public applause for your skill in training ${him}.</span> There is some <span class="red">minor damage</span> to repair, but no lasting harm.`);
				cashX(-1000, "event", S.Bodyguard);
				repX(2500, "event", S.Bodyguard);
				V.arcologies[0].prosperity += 1;
			} else if (S.Bodyguard.muscles > 5) {
				r.push(`${S.Bodyguard.slaveName} hurriedly`);
				if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 5) {
					r.push(`gets ${his} light machine gun firing. The weapon's high rate of fire tears through the first enemy but rapidly pulls ${his} aim off target.`);
				} else if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 4) {
					r.push(`brings up ${his} battle rifle. ${He} hits the nearest assailant with ${his} first round and then fires again, but the weapon's powerful recoil sends it over ${his} target.`);
				} else if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 3) {
					r.push(`brings up ${his} submachine gun. ${He} points it at the nearest assailant and pulls the trigger; the weapon's high rate of fire tears through the enemy but rapidly pulls ${his} aim off target.`);
				} else {
					r.push(`draws ${his} machine pistol. ${He} points it one-handed at the nearest assailant and pulls the trigger; the weapon's high rate of fire tears through the enemy but rapidly pulls ${his} aim off target.`);
				}
				r.push(`By the time ${he} pulls the muzzle back down the others are on ${him}. Fortunately, ${he} is equal to the challenge, getting ${his} sword into gory action. ${He} is physically powerful but unskilled, so the result is simple, unlovely butcher's work. This spectacle produces <span class="prosperity inc">an increase in confidence in the security of ${V.arcologies[0].name}.</span> There is some <span class="red">minor property damage</span> to repair, but no lasting harm.`);
				cashX(-1000, "event", S.Bodyguard);
				V.arcologies[0].prosperity += 1;
			} else {
				r.push(`${S.Bodyguard.slaveName} hurriedly`);
				if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 5) {
					r.push(`gets ${his} light machine gun firing. The weapon's high rate of fire tears through the first enemy but rapidly pulls ${his} aim off target.`);
				} else if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 4) {
					r.push(`brings up ${his} battle rifle. ${He} hits the nearest assailant with ${his} first round and then fires again, but the weapon's powerful recoil sends it over ${his} target.`);
				} else if ((S.Bodyguard.muscles + S.Bodyguard.height - 100) / 25 > 3) {
					r.push(`brings up ${his} submachine gun. ${He} points it at the nearest assailant and pulls the trigger; the weapon's high rate of fire tears through the enemy but rapidly pulls ${his} aim off target.`);
				} else {
					r.push(`draws ${his} machine pistol. ${He} points it one-handed at the nearest assailant and pulls the trigger; the weapon's high rate of fire tears through the enemy but rapidly pulls ${his} aim off target.`);
				}
				r.push(`By the time ${he} pulls the muzzle back down the others are on ${him}. ${His} sword is very sharp, but so are ${his} assailants' weapons, and everyone is unskilled. As often happens with bladed fights between unarmored novices, everyone dies, and so fast that you cannot intervene. ${S.Bodyguard.slaveName} expires gasping in agony over multiple deep wounds to ${his} abdomen, but still manages to lock eyes with you as ${he} does. There is some <span class="red">minor property damage</span> to repair, but no lasting harm.`);
				cashX(-1000, "event", S.Bodyguard);
				healthDamage(S.Bodyguard, 1000);
				removeSlave(S.Bodyguard);
			}
		} else if (V.personalArms > 0) {
			r.push(`You are prepared for this exigency. Your handsome clothing conceals a small but very powerful pistol. This fact comes slowly back to you as your ears and mind shake off the blast effects. There is something important about this fact, but you are having trouble thinking of it. Eventually, you remember, and groggily draw and level the weapon. Its rocket-assisted slugs detonate on contact, assisting your impaired marksmanship by causing fatal damage regardless of shot placement. You are alive, and not permanently damaged, which is more than can be said for your assailants, who have, with the assistance of your weapon, redecorated this area of the club in red tones. There is some <span class="red">minor property damage</span> to repair, but no lasting harm.`);
			cashX(-1000, "event");
		} else if (V.mercenaries > 0) {
			r.push(`As you collect your senses, you are dimly aware of a massive form rushing to stand over you. In its hands is a chunky object that emits three long tongues of flame and makes three barking sounds that break through the ringing in your ears. You manage to get yourself together enough to understand the mercenary as he slings his shotgun and kneels to check you over. His experienced hands disclose no injury, and he says, "You'll be OK, ${properTitle()}. Come on, up and at 'em. Let's get you checked out." There is some <span class="red">minor property damage</span> to repair, but no lasting harm.`);
			cashX(-1000, "event");
		} else if (V.arcologyUpgrade.drones === 1) {
			r.push(`Two security drones reach the scene at the very last second. They drop the assailants with taser rounds, the demonic little munitions' sharp heads burying themselves in muscle before applying voltage. There is some <span class="red">minor property damage</span> to repair, but no lasting harm.`);
			cashX(-1000, "event");
		} else {
			r.push(`Without a bodyguard, decent security systems, or any other means of personal defense, you meet your ignominious death at the end of a bludgeon fashioned from a maintenance tool.`);
			gameover = true;
		}
		App.Events.addParagraph(node, r);
		if (gameover) {
			App.Events.LocalGameOver(node);
		} else {
			App.Events.addParagraph(node, [`Hours later, you receive another message from the Daughters of Liberty. This one is even briefer than the first. "Next time, '${properMaster()},'" it reads.`]);
		}
	}
};
