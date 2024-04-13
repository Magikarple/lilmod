App.Events.RESSMasterfulWhore = class RESSMasterfulWhore extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canHear,
				s => s.skill.whoring >= 100,
				s => s.trust > 50,
				s => s.devotion > 20,
				s => s.assignment === Job.WHORE,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const feet = hasBothLegs ? "feet" : "foot";

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave);
		node.appendChild(artDiv);

		let r = [];
		r.push(`As a queen of the whorehouse,`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`is never surprised, never squeamish, and always on the prowl for ${his} next customer. ${He} has mastered the transactionalization of sex. When ${he}'s selling ${himself} by the hole, a customer who purchases ${his} skilled oral services will often find himself upsold to a more expensive`);
		if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
			r.push(`vaginal experience.`);
		} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
			r.push(`anal experience.`);
		} else {
			r.push(`showcase of ${his} skills.`);
		}
		r.push(`When ${he}'s doing it by the orgasm, customers find themselves climaxing rather more quickly than they intended.`);
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`And perhaps most importantly, ${he} always has an ear to the ground, even when one of them is being shoved against the sheets. Customers say the most interesting things when they've got themselves buried in ${him}. Today, ${he}'s got an especially delightful morsel of information for you: one of your commercial tenants is shortchanging you on rent, concealing profits to reduce your share.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Require double repayment`, double),
			new App.Events.Result(`Require double repayment and spend it on ${him}`, spend),
			new App.Events.Result(`Leverage the situation and reward ${him}`, reward, `This option will cost ${cashFormat(2000)}`),
		]);

		function double() {
			cashX(random(150, 200)*10, "event", eventSlave);
			return `Your tenant knows that abject surrender is his only hope once you make it clear to him that his scheme is known to you. He complies all too eagerly with your demand that he <span class="cash inc">repay double what he owes.</span>`;
		}

		function spend() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "conservative clothing");

			r = [];
			r.push(`Your tenant knows that abject surrender is his only hope once you make it clear to him that his scheme is known to you. He complies all too eagerly with your demand that he repay double what he owes. Slaves are not permitted to keep possessions, especially money, so you spend it on ${eventSlave.slaveName} directly. ${He} spends the day`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 2) {
				r.push(`having ${his} pregnant belly moisturized,`);
				if (hasAnyLegs(eventSlave)) {
					r.push(`${his} tired ${feet} rubbed,`);
				}
				r.push(`${his} cravings fulfilled, being`);
			} else {
				r.push(`being`);
			}
			r.push(`massaged, beautified, and pampered. You then take ${him} out for a lovely meal, allowing ${him} to wear clothing that's almost conservative by Free Cities standards, and take a nice walk around ${V.arcologies[0].name}'s club, talking on light subjects. ${He}'s <span class="devotion inc">deeply touched</span> by an evening of affection without sex.`);
			eventSlave.devotion += 10;
			return r;
		}

		function reward() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "conservative clothing");

			r = [];
			r.push(`Archimedes might have his lever, but give you a place to set such information as this, and you can move a mountain of money. Before he knows what has beset him, your tenant is bustled out of ${V.arcologies[0].name} and replaced by a favored and hopefully more honest competitor, who <span class="prosperity inc">is well aware of the score here.</span> ${eventSlave.slaveName}, who made this possible, spends the day`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 2) {
				r.push(`having ${his} pregnant belly moisturized,`);
				if (hasAnyLegs(eventSlave)) {
					r.push(`${his} tired ${feet} rubbed,`);
				}
				r.push(`${his} cravings fulfilled, being`);
			} else {
				r.push(`being`);
			}
			r.push(`massaged, beautified, and pampered. You then take ${him} out for a lovely meal, allowing ${him} to wear clothing that's almost conservative by Free Cities standards, and take a nice walk around ${V.arcologies[0].name}'s club, talking on light subjects. ${He}'s <span class="devotion inc">deeply touched</span> by an evening of affection without sex, and ${he} <span class="trust inc">trusts you</span> with all sorts of amusing whorehouse rumors.`);
			eventSlave.devotion += 3;
			eventSlave.trust += 3;
			cashX(-2000, "event", eventSlave);
			V.arcologies[0].prosperity += 1;
			return r;
		}
	}
};

