App.Events.PEFoodplay = class PEFoodplay extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => ((V.rep > 10000) || (V.debugMode > 0 && V.debugModeEventSelection > 0)),
			() => ((V.HeadGirlID !== 0) || (V.ConcubineID !== 0) || (V.BodyguardID !==0))
		];
	}

	/**
	 * @param {Node} node
	 */
	execute(node) {
		const artDiv = App.UI.DOM.makeElement("div");
		node.appendChild(artDiv);
		App.Events.addParagraph(node, [`You are relaxing in the Penthouse after a day of hard work when your PA alerts you to an incoming shipment. One of the aristocrats in your arcology was able to get their hands on a shipment of fresh, wild-caught fish and has sent you a few prime cuts as a sign of goodwill. Such a delicacy is rare to come across, given the rapidly deteriorating global climate.`]);
		App.Events.addParagraph(node, [`As the leader of a well-established and renowned arcology, it isn't uncommon for you to receive these gestures of friendship and goodwill on a semi-regular basis. Perhaps it wouldn't be such a bad idea to enjoy this latest gift with one of your slaves.`]);

		App.Events.addResponses(node, [
			(V.HeadGirlID !== 0)
				? new App.Events.Result(`Accept the gift and invite your Head Girl to join you `, () => scene(S.HeadGirl, artDiv))
				: new App.Events.Result(),
			(V.ConcubineID !== 0)
				? new App.Events.Result(`Accept the gift and share it with your Concubine`, () => scene(S.Concubine, artDiv))
				: new App.Events.Result(),
			(V.BodyguardID !== 0)
				? new App.Events.Result(`Accept the gift, and have your Bodyguard join you`, () => scene(S.Bodyguard, artDiv))
				: new App.Events.Result(),
			new App.Events.Result(`Decline the gift`, decline)
		]);

		/**
		 * @returns {ContainerT}
		 */
		function decline() {
			const r = new SpacedTextAccumulator();
			r.push(`You politely decline the shipment of seafood. You receive plenty of gifts, and can't spend time entertaining each individual that wishes to gain your favor.`);
			return r.container();
		}

		/**
		 * @param {App.Entity.SlaveState} eventSlave
		 * @param {HTMLDivElement} artDiv
		 * @returns {ContainerT}
		 */
		function scene(eventSlave, artDiv){
			const r = new SpacedTextAccumulator();
			const {
				He, he, his, him
			} = getPronouns(eventSlave);
			const {title: Master} = getEnunciation(eventSlave);

			App.Events.drawEventArt(artDiv, eventSlave, "no clothing");

			r.push(`You summon`);
			r.push(contextualIntro(V.PC, eventSlave, true));
			r.push(`to your office and order ${him} to lie down on your desk.`);
			if (hasAnyLegs(eventSlave)){
				if (eventSlave.devotion > 50){
					r.push(`${He} complies with a smile, excited to see what you have in store for ${him}.`);
				} else if (eventSlave.devotion > 20){
					r.push(`${He} complies with a smile, curious to see what you have in store for ${him}.`);
				} else if (eventSlave.trust < 20 && eventSlave.devotion > -20){
					r.push(`${He} nervously complies, curious to see what you have in store for ${him}.`);
				} else if (eventSlave.trust < -50) {
					r.push(`Terrified of what you have in store for ${him}, ${he} nervously complies, dreading what you have in store for ${him}.`);
				} else {
					r.push(`${He} nervously complies, and lays down on the desk.`);
				}
			} else {
				r.push(`${He} is laid onto your desk with the help of other slaves.`);
			}

			r.push(`After ${he} is situated, you go over to ${him} and being to peel off ${his} clothing, ${(eventSlave.trust > 20) ? `to which ${he} gives you a soft smile.` : `the slave shivering against your touch.`}`);
			r.push(`You take a seat at your desk, resuming your work while enjoying the sight of ${eventSlave.slaveName}'s naked body.`);
			r.push(`Another slave brings a pair of chopsticks and several pieces of sushi, prepared from the seafood that was just delivered. She begins placing them along ${eventSlave.slaveName}'s`);
			if (eventSlave.weight > 190) {
				r.push(`immense`);
			} else if (eventSlave.weight > 160) {
				r.push(`massive`);
			} else if (eventSlave.weight > 130) {
				r.push(`huge`);
			} else if (eventSlave.weight > 95) {
				r.push(`thick`);
			} else if (eventSlave.weight > 10) {
				r.push(`ample`);
			} else if (eventSlave.weight >= -10) {
				r.push(`trim`);
			}
			r.push(`body. ${He} shivers as the cold food comes into contact with ${his} skin`);
			if (eventSlave.devotion < -20){
				r.push(`and wriggles on the desk, nearly causing the carefully placed food to fall off of ${him}.`);
			} else {
				r.push(`but diligently remains still so as to make sure none of the precious delicacy falls off ${his} body.`);
			}

			r.toParagraph();

			r.push(`Two pieces are laid onto ${his}`);
			if (eventSlave.boobs > 40000) {
				r.push(`gargantuan`);
			} else if (eventSlave.boobs > 25000) {
				r.push(`immense`);
			} else if (eventSlave.boobs > 10000) {
				r.push(`ridiculous`);
			} else if (eventSlave.boobs > 5000) {
				r.push(`enormous`);
			} else if (eventSlave.boobs > 3200) {
				r.push(`giant`);
			} else if (eventSlave.boobs > 1600) {
				r.push(`huge`);
			} else if (eventSlave.boobs > 800) {
				r.push(`big`);
			} else if (eventSlave.boobs > 300) {
				r.push(`modest`);
			} else {
				r.push(`flat`);
			}
			if (eventSlave.boobs > 300) {
				r.push(`tits`);
			} else {
				r.push(`chest`);
			}

			if (eventSlave.areolae > 2){
				r.push(`, barely covering ${his} huge areolas`);
			}

			r.push(`and ${eventSlave.nipples} nipples.`);

			if (eventSlave.boobs > 1600){
				r.push(`The size of ${his} breasts makes it appear as if the delicate piece of food is about to swallowed by an ocean of undulating flesh.`);
			}

			r.push(`Four pieces of the sliced seafood are laid out on ${his}`);

			if (eventSlave.belly >= 750000) {
				if (eventSlave.bellyPreg > 0) {
					r.push(`grotesquely pregnant`);
				} else {
					r.push(`grotesquely inflated`);
				}
			} else if (eventSlave.belly >= 600000) {
				if (eventSlave.bellyPreg > 0) {
					r.push(`dangerously pregnant`);
				} else {
					r.push(`dangerously distended`);
				}
			} else if (eventSlave.belly >= 450000) {
				if (eventSlave.bellyPreg > 0) {
					r.push(`immensely pregnant`);
				} else {
					r.push(`immensely distended`);
				}
			} else if (eventSlave.belly >= 150000) {
				if (eventSlave.bellyPreg > 0) {
					r.push(`massively pregnant`);
				} else {
					r.push(`massively distended`);
				}
			} else if (eventSlave.belly >= 120000) {
				if (eventSlave.bellyPreg > 0) {
					r.push(`enormously pregnant`);
				} else {
					r.push(`greatly gravid`);
				}
			} else if (eventSlave.belly >= 10000) {
				if (eventSlave.bellyPreg > 3000) {
					r.push(`heavily pregnant`);
				} else if (eventSlave.bellyImplant > 3000) {
					r.push(`very gravid`);
				} else {
					r.push(`taut`);
				}
			} else if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg > 3000) {
					r.push(`very pregnant`);
				} else if (eventSlave.bellyImplant > 3000) {
					r.push(`gravid`);
				} else {
					r.push(`distended`);
				}
			} else if (eventSlave.belly >= 1500) {
				if (eventSlave.bellyPreg > 0) {
					r.push(`slightly pregnant`);
				} else if (eventSlave.bellyImplant > 0) {
					r.push(`slightly distended`);
				} else {
					r.push(`bloated`);
				}
			}

			r.push(`belly, with one over ${his} navel, hiding it from sight.`);
			r.push(`Your eyes trace over the`);

			if (eventSlave.weight > 10){
				r.push(`curves of ${his} soft`);
			} else if (eventSlave.muscles > 6){
				r.push(`lines of ${his} toned`);
			} else {
				r.push(`line of ${his} flat`);
			}

			r.push(`midriff, and down towards ${his}`);

			if (eventSlave.vagina !== -1){
				r.push(`pussy`);
			} else if (eventSlave.dick !== 0){
				r.push('cock');
			} else {
				r.push(`groin`);
			}

			r.push(`as a final piece of fish is placed right above it.`);

			r.toParagraph();

			r.push(`As you resume your work, you begin plucking pieces of the prepared fish off of the slave's vulnerable body, savoring the freshness and mouth-watering flavor of this rare food. Starting at ${his}`);

			if (eventSlave.boobs > 40000) {
				r.push(`beanbag-sized`);
			} else if (eventSlave.boobs > 25000) {
				r.push(`torso-covering`);
			} else if (eventSlave.boobs > 10000) {
				r.push(`obscenely massive`);
			} else if (eventSlave.boobs > 5000) {
				r.push(`beachball-sized`);
			} else if (eventSlave.boobs > 3200) {
				r.push(`arm-filling`);
			} else if (eventSlave.boobs > 1600) {
				r.push(`head-sized`);
			} else if (eventSlave.boobs > 800) {
				r.push(`big`);
			} else if (eventSlave.boobs > 300) {
				r.push(`modest`);
			}
			if (eventSlave.boobs > 300) {
				r.push(`tits`);
			} else {
				r.push(`chest`);
			}

			r.push(`you pluck at ${his} ${eventSlave.nipples} nipples, eliciting a moan as ${eventSlave.slaveName} helplessly squirms under your teasing. You calmly remind ${him} that such a delicacy is hard to come by, and warn ${him} against dropping any of the pieces. Otherwise, there will be consequences.`);

			if (eventSlave.trust > 50){
				r.push(`${eventSlave.slaveName} pokes ${his} tongue out at you playfully and shakes ${his} body, confident that any punishment you can bring forth will only mean more time that ${he} can spend in your presence.`);
			} else {
				r.push(`Fear flashes across the slave's face as they will their body to be still. ${eventSlave.slaveName} imagines the punishment that could possibly result from ruining ${his} ${Master}'s meal and shudders at the thought, causing the remaining pieces of sushi to precariously teeter atop ${his} body.`);
			}

			r.push(`You work your way down ${his} belly, and arrive at the final piece above ${his}`);

			if (eventSlave.vagina !== -1){
				r.push(`wet pussy.`);
			} else if (eventSlave.dick !== 0){
				r.push('throbbing cock.');
			} else {
				r.push(`groin.`);
			}

			r.push(`Eyeing the food, as well as the last piece of sushi, you decide to play with it for a little.`);

			if (eventSlave.piercing.genitals.weight > 0){
				r.push(`You wrap your chopsticks around the glinting piercing at your slave's waist and give it a sharp tug, causing ${eventSlave.slaveName} to scream out in equal parts pain and pleasure.`);
			} else if (eventSlave.vagina !== -1){
				r.push(`You use the chopsticks to fondle with ${his} clit roughly, causing ${eventSlave.slaveName} to gasp out in surprise. Spreading ${him} open, you use your tongue to edge ${him} towards climax.`);
			} else if (eventSlave.dick > 0){
				r.push(`You use the chopsticks to grip with ${his} dick roughly, causing ${eventSlave.slaveName} to gasp out in surprise. Using the utensils to tease and stroke ${his}`);

				if (eventSlave.dick > 4) {
					r.push(`gigantic cock,`);
				} else if (eventSlave.dick > 2) {
					r.push(`impressive erection,`);
				} else if (eventSlave.dick > 0) {
					r.push(`little penis,`);
				}

				r.push(`you skillfully work ${him} towards climax, and he shoots ${his} seed in ropes across his body.`);
			} else {
				r.push(`You use the chopsticks to tease ${his} needy hole, causing ${eventSlave.slaveName} to gasp out in surprise. Spreading ${him} open, you use your tongue to edge ${him} towards climax.`);
			}

			r.toParagraph();

			r.push(`Under your eager attention, ${eventSlave.slaveName} collapses in a moaning, writhing puddle on your desk. You clean your mouth with a handkerchief and tell ${him} to get back to ${his} assignment before calling in another slave to clean up the mess.`);

			r.toParagraph();

			if (eventSlave.trust > 20 || eventSlave.devotion > 20) {
				r.push(`As ${he} goes about the rest of ${his} day, ${eventSlave.slaveName} recalls the events of the morning and smiles. ${He} <span class="trust inc">enjoyed</span> the attention that you lavished on ${him}, and wonders if such an opportunity will ever arise again.`);
				eventSlave.trust += 5;
			} else {
				r.push(`After being carried out and cleaned up, ${eventSlave.slaveName} avoids walking past your office for the remainder of the day, <span class="trust dec">worried</span> that ${he} might catch your eye and be called to entertain you again.`);
				eventSlave.trust -= 5;
			}

			r.toParagraph();

			return r.container();
		}
	}
};
