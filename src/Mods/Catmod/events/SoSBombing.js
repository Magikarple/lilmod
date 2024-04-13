App.Events.RESosBombing = class RESosBombing extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeCats !== 0,
			() => V.projectN.status > 4
		];
	}

	execute(node) {
		let r = [];
		const impRaid = () => raidOutcome("Imperial Knights");
		const romanRaid = () => raidOutcome("Roman");
		const mercenaries = () => raidOutcome("Mercenaries");
		const standard = () => raidOutcome("Standard");
		const bombPlotHappened = either(1, 2, 3, 4) === 1;
		App.UI.StoryCaption.encyclopedia = "The Sons of Sekhmet";

		r.push(`While working at your desk, your security team sends you an urgently-marked bulletin. The security update enclosed is fairly simple; the security staff think they've got a "reasonable lead" on a potential terrorist operation by the Sons of Sekhmet to bomb a few essential locations in the arcology, sometime in the next few days.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Although they're not positive, they're requesting a few thousand credits in additional funding for the resources they'll need to properly investigate the potential cell and launch a raid. Although a public operation would no doubt look bad in the public eye if it failed to produce results, not to mention the money you'd spend, ignoring the potential of a bombing campaign could be absolutely disastrous - and cost you many times more that whatever you'd spend shutting down Sekhmeti cells. Ultimately, though, the decision on whether to give the raid the go-ahead or not is up to you.`);
		App.Events.addParagraph(node, r);
		r = [];

		const choices = [];
		if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
			choices.push(new App.Events.Result(`Authorize the raid, but give your Imperial Knights authority over it`, impRaid));
		}
		if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
			choices.push(new App.Events.Result(`Authorize the raid, but delegate it to your armed citizens instead of the security team`, romanRaid));
		}
		if (V.mercenaries === 5) {
			choices.push(new App.Events.Result(`Authorize the raid, but transfer authority to your ${V.mercenariesTitle}`, mercenaries));
		}
		choices.push(new App.Events.Result(`Authorize the raid with standard drones and guard officers`, standard));
		choices.push(new App.Events.Result(`Refuse authorization`, refuse));
		App.Events.addResponses(node, choices);

		function refuse() {
			const frag = new DocumentFragment();
			let r = [];
			if (bombPlotHappened) {
				r.push(`You tell the security team to stop chasing ghosts and focus on real issues in the arcology. Two days later, while you're working in your office, a distant booming sound rumbles out from outside the penthouse. Turning to look out the window, you see a column of smoke coming up from the marketplace, and the distant glow of a raging flame. A few seconds later, another muffled boom rings out, this time from the direction of the plaza, and then a third, and a fourth. Sounds of gunshots in the distance ring out shortly afterwards. From here, there's nothing you can do but watch as the series of explosions <span class="red">devastates</span> the arcology's hard-built prosperity - and its citizens. This time wasn't just a fluke, it seems. You don't even need to turn on the TV to imagine what the media is <span class="red">already saying</span> about your failure to stop this attack before it happened. It's not going to be good.`);
				V.arcologies[0].prosperity -= 5;
				cashX(-24000, "event");
				repX(-5000, "event");
			} else {
				r.push(`You tell the security team to stop chasing ghosts and focus on real issues in the arcology. A few days later, someone from the team bashfully sends you an "update" bulletin notifying you that it was a false alarm after all and they'd just gotten worked up over some intimidating posts on social media.`);
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		/**
		 * @param {string} operationalCommand
		 * @returns {DocumentFragment}
		 */
		function raidOutcome(operationalCommand) {
			const frag = new DocumentFragment();
			const r = ["You authorize the raid"];
			switch (operationalCommand) {
				case "Imperial Knights":
					r.push("but bring in your Knights to captain the effort.");
					break;
				case "Roman":
					r.push("but transfer authority for its execution over to a group of loyal, free citizens, who are all too eager to defend the Republic.");
					break;
				case "Mercenaries":
					r.push(`but head up the effort with your better-trained ${V.mercenariesTitle}.`);
					break;
				case "Standard":
					r.push("with no further comments.");
			}

			r.push("Early in the morning the next day,");
			switch (operationalCommand) {
				case "Imperial Knights":
					if (bombPlotHappened) {
						r.push(`the heavily-armed Knights burst into an old warehouse in the lower sectors, interrupting a group of Sekhmeti terrorists building a series of improvised bombs on a bunch of turned-over crates. As the bombmakers scramble for their weapons, your Knights absolutely slaughter the group, blasting the scene to pieces with heavy firepower and shrugging off the helpless potshots the terrorists make with their ultra-heavy Imperial Plate. Although the overzealous Knights don't leave you anything left to enslave, the media are on the scene within minutes, and the interviews with smiling, unscathed Knights in their elegant coats of armor in front of the scene of an utterly destroyed terrorist cell is a <span class="green">good look</span> for your arcology.`);
					} else {
						r.push(`the heavily-armed Knights burst into a small apartment in the lower sectors, nearly giving the old woman in the living room a heart attack. Multiple men in ultra-heavy Imperial Plate all but burst through the walls of the apartment to tackle a single scrawny teenager in his room before they realize that this place probably isn't a radical Sons of Sekhmet cell. Even though this raid ended up being <span class="red">wasted money,</span> your Knights eloquently apologize to the edgy teenager they nearly crushed, and your arcology loves the romanticized Knights enough that there's no lasting reputation damage from the unfortunate raid.`);
					}
					break;
				case "Roman":
					if (bombPlotHappened) {
						r.push(`a group of Praetorians in full gear burst into a small apartment in the lower sectors, interrupting a small group of Sekhmeti terrorists building a series of improvised bombs in the barren living room. Before the bombmakers can even grab their guns, the well-disciplined citizens gun them down in an explosive hail of fire, killing the whole cluster indiscriminately. Although the zealous citizenry don't leave anything left for you to enslave, a group of proud, well-trained free citizens voluntarily defending the arcology from a terrorist plot - and doing so without so much as a scratch - is a <span class="green">good look.</span>`);
					} else {
						r.push(`a group of Praetorians in full gear burst into a dilapidated warehouse in the lower sectors, shocking the small group of transport workers carrying crates around for some secondhand shipment. Although the citizens nearly fire on the rough-looking warehouse hands, they realize that this isn't a group of Sekhmeti radicals before they do and apologize for the insurrection. Although this raid ultimately turned out to be <span class="red">wasted money,</span> the free citizens conducting it and their disciplined Roman nature prevents any lasting reputation damage.`);
					}
					break;
				case "Mercenaries":
					if (bombPlotHappened) {
						r.push(`the deadly mercenaries kick down the door of a small office building in the lower sectors, interrupting a group of Sekhmeti terrorists in the middle of constructing a series of improvised bombs in the converted office space. The ${V.mercenariesTitle} blow the entire group to pieces with high-power weaponry, absolutely annihilating the careful plot with overwhelming force and indiscriminate destruction before they can fire off a single shot. Although the rough mercenaries don't leave anything left for you to enslave, the well-trained mercs emerging from the smoldering ruin of what used to be a terrorist field HQ is a <span class="green">good look</span> for the security of your arcology.`);
					} else {
						r.push(`the deadly mercenaries burst into the back of a small shop in the lower sectors, nearly giving the lower-class workers heart attacks with the sudden appearance of their scarred - over faces in full battle gear. Although they tackle two of the poor workers to the ground, it doesn't take the ${V.mercenariesTitle} long to realize that this isn't a radical Sons of Sekhmet terrorist cell, and they leave before the media can show up to report on it. Even though this raid turned out to be <span class="red">wasted money,</span> your mercenaries conduct themselves well enough that there's no lasting reputation damage.`);
					}
					break;
				case "Standard":
					if (bombPlotHappened) {
						r.push(`a group of security officers burst into the back of a small shop in the lower sectors, interrupting a group of Sekhmeti terrorists in the middle of constructing a series of improvised bombs, having removed all the machinery from the back of the shop to make space. The drones fire their tasers at the Sons, but they're better-armed and trained than to get so easily disabled, and your officers and the bombmakers get drawn into a prolonged firefight over the next ten minutes that draws arcology media to the scene like a candle. Although a few of the officers involved limp out with bullet wounds and slashes, they manage to completely eradicate the terrorist cell, and brave officers coming out from the destroyed Sekhmeti HQ is a <span class="green">good look,</span> even if they didn't manage to leave you any of the terrorists alive to enslave.`);
					} else {
						r.push(`a group of security officers kick down the door of a small office building in the lower sectors, practically giving the workers inside heart attacks. One of the drones misinterprets a panicked worker dropping a file as an aggressive action and tases him, much to the chagrin of the rest of the officer team. Arcology media is on the scene in minutes, and on top of being <span class="red">a waste of money,</span> you've also got a PR nightmare on your hands as the tased worker complains on live media about the "unfair paranoia" of the arcology and how much his taser burns hurt. What a shit-show.`);
					}
			}

			if (operationalCommand !== "Standard" && bombPlotHappened) {
				repX(2500, "event");
			} else {
				repX((bombPlotHappened ? 1500 : -500), "event");
			}

			cashX(-5000, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
