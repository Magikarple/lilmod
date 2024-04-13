App.Events.RESlaveMarriage = class RESlaveMarriage extends App.Events.BaseEvent {
	actorPrerequisites() {
		return [[
			(s) => s.fetish !== Fetish.MINDBROKEN,
			hasAnyArms,
			canMove,
			(s) => s.relationship === 4,
			(s) => s.devotion > 20,
			(s) => s.trust > 20,
		]];
	}

	execute(node) {
		const r = [];

		const groomSlave = getSlave(this.actors[0]);
		const brideSlave = getSlave(groomSlave.relationshipTarget);

		const {
			He, His,
			he, his, him
		} = getPronouns(groomSlave);
		const {title: Master} = getEnunciation(groomSlave);

		const {
			He2, His2,
			he2, his2, him2
		} = getPronouns(brideSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [groomSlave, brideSlave]);

		r.push(
			App.UI.DOM.slaveDescriptionDialog(groomSlave),
			`and`,
			App.UI.DOM.slaveDescriptionDialog(brideSlave),
			`come into your office`
		);
		if (hasAnyArms(groomSlave) && hasAnyArms(brideSlave)) {
			r.push(`holding hands.`);
		} else {
			r.push(`doing their best to stay close to one another despite their physical limitations.`);
		}
		r.push(`${brideSlave.slaveName} looks at ${groomSlave.slaveName} expectantly, but ${he}'s terribly nervous and makes several false starts before beginning. Finally ${groomSlave.slaveName} musters ${his} courage and`);
		if (canTalk(groomSlave)) {
			r.push(
				`asks with ${his} voice cracking,`,
				Spoken(groomSlave, `"${Master}, would you please grant us a slave marriage?"`)
			);
		} else {
			r.push(`asks you with simple gestures to grant the two of them a slave marriage.`);
		}

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Of course`, yes));
		choices.push(new App.Events.Result(`No`, no));
		App.Events.addResponses(node, choices);


		function yes() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You inquire as to whether they understand the Free Cities slave marriage ceremony, and they nod, not trusting themselves to do anything more. You give them a few minutes to get dressed in special outfits you make available. When they come back, they're wearing lacy lingerie designed to resemble old world wedding dresses, but without concealing anything.`);

			App.Events.addParagraph(frag, r);
			r = [];
			if (groomSlave.vagina === 0) {
				r.push(`${groomSlave.slaveName} is a virgin, so ${he}'s wearing white`);
			} else if (groomSlave.pregKnown === 1) {
				r.push(`${groomSlave.slaveName} is pregnant, so ${he}'s wearing light pink`);
			} else if (groomSlave.vagina < 0) {
				r.push(`${groomSlave.slaveName} is a sissy slave, so ${he}'s wearing light blue`);
			} else {
				r.push(`${groomSlave.slaveName} is an experienced sex slave, so ${he}'s wearing light pink`);
			}
			r.push(`against ${his} ${groomSlave.skin} skin.`);
			if (groomSlave.chastityPenis) {
				r.push(`${He} has a little bow on ${his} chastity cage.`);
			} else if (canAchieveErection(groomSlave)) {
				r.push(`The`);
				if (canSee(groomSlave)) {
					r.push(`sight of ${brideSlave.slaveName}`);
				} else {
					r.push(`anticipation`);
				}
				r.push(`has ${him} stiffly erect, and ${he}'s wearing a little bow around ${his} cockhead.`);
			} else if (groomSlave.dick > 0) {
				r.push(`${He}'s impotent, but ${he}'s wearing a little bow around ${his} useless cockhead.`);
			} else if (groomSlave.clit > 0) {
				r.push(`${His} prominent clit is engorged, and ${he}'s wearing a tiny bow on it.`);
			} else {
				r.push(`${He}'s wearing a demure little bow just over ${his} pussy.`);
			}
			if (groomSlave.anus > 1) {
				r.push(`${His} lacy panties are designed to spread ${his} buttocks a little and display ${his} big butthole.`);
			} else if (groomSlave.anus === 0) {
				r.push(`${His} lacy panties cover ${his} virgin anus, for once.`);
			}
			if (groomSlave.boobs > 1000) {
				r.push(`The bra makes no attempt to cover or even support ${his} huge breasts, simply letting them through holes in the lace to jut proudly out.`);
			} else if (groomSlave.boobs > 500) {
				r.push(`The bra supports and presents ${his} big breasts, leaving ${his} stiffening nipples bare.`);
			} else {
				r.push(`The bra supports and presents ${his} breasts, giving ${him} more cleavage than ${he} usually displays.`);
			}
			if (groomSlave.belly >= 1500) {
				r.push(`${His}`);
				if (groomSlave.preg > 0) {
					r.push(`growing pregnancy`);
				} else {
					r.push(`rounded middle`);
				}
				r.push(`prominently bulges from the gap between ${his} lingerie.`);
			}

			App.Events.addParagraph(frag, r);
			r = [];
			if (brideSlave.vagina === 0) {
				r.push(`${brideSlave.slaveName} is a virgin, so ${he2}'s wearing white`);
			} else if (brideSlave.pregKnown === 1) {
				r.push(`${brideSlave.slaveName} is pregnant, so ${he2}'s wearing light pink`);
			} else if (brideSlave.vagina < 0) {
				r.push(`${brideSlave.slaveName} is a sissy slave, so ${he2}'s wearing light blue`);
			} else {
				r.push(`${brideSlave.slaveName} is an experienced sex slave, so ${he2}'s wearing light pink`);
			}
			r.push(`against ${his2} ${brideSlave.skin} skin.`);
			if (brideSlave.chastityPenis) {
				r.push(`${He2} has a little bow on ${his2} chastity cage.`);
			} else if (canAchieveErection(brideSlave)) {
				r.push(`The`);
				if (canSee(brideSlave)) {
					r.push(`sight of ${groomSlave.slaveName}`);
				} else {
					r.push(`anticipation`);
				}
				r.push(`has ${him2} stiffly erect, and ${he2}'s wearing a little bow around ${his2} cockhead.`);
			} else if (brideSlave.dick > 0) {
				r.push(`${He}'s impotent, but ${he2}'s wearing a little bow around ${his2} useless cockhead.`);
			} else if (brideSlave.clit > 0) {
				r.push(`${His2} prominent clit is engorged, and ${he2}'s wearing a tiny bow on it.`);
			} else {
				r.push(`${He2}'s wearing a demure little bow just over ${his2} pussy.`);
			}
			if (brideSlave.anus > 1) {
				r.push(`${His2} lacy panties are designed to spread ${his2} buttocks a little and display ${his2} big butthole.`);
			} else if (brideSlave.anus === 0) {
				r.push(`${His2} lacy panties cover ${his2} virgin anus, for once.`);
			}
			if (brideSlave.boobs > 1000) {
				r.push(`The bra makes no attempt to cover or even support ${his2} huge breasts, simply letting them through holes in the lace to jut proudly out.`);
			} else if (brideSlave.boobs > 500) {
				r.push(`The bra supports and presents ${his2} big breasts, leaving ${his2} stiffening nipples bare.`);
			} else {
				r.push(`The bra supports and presents ${his2} breasts, giving ${him2} more cleavage than ${he2} usually displays.`);
			}
			if (brideSlave.belly >= 1500) {
				r.push(`${His2}`);
				if (brideSlave.preg > 0) {
					r.push(`growing pregnancy`);
				} else {
					r.push(`rounded middle`);
				}
				r.push(`prominently bulges from the gap between ${his2} lingerie.`);
			}

			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`The procedure is simple. The two of them prostrate themselves on the ground and beg your indulgence. You state that you grant it, and hand each of them a simple gold band to be worn on the little finger in advertisement of the inferiority of their union. In turn, each of them gives the other their ring, and they kiss. You pronounce them slave spouses, and offer them the couch for their honeymoon; they <span class="trust inc">thank you profusely</span> through their building tears. It's always touching to see`);
			if (groomSlave.bellyPreg >= 5000 && brideSlave.bellyPreg >= 5000) {
				r.push(`two pregnant slaves`);
				if (hasAnyArms(brideSlave) && hasAnyArms(groomSlave)) {
					r.push(`fingering`);
				} else {
					r.push(`fucking`);
				}
				r.push(`each other`);
			} else {
				r.push(`a 69`);
			}
			r.push(`in which both participants are <span class="devotion inc">softly crying with happiness.</span>`);
			if (groomSlave.pregSource === brideSlave.ID && brideSlave.pregSource === groomSlave.ID) {
				r.push(`When ${groomSlave.slaveName} and ${brideSlave.slaveName} tire, they rest, shoulder to shoulder, with a hand upon each other's bulging belly. Gently, they caress their growing pregnancies, knowing that they carry the other's love child.`);
			} else if (brideSlave.pregSource === groomSlave.ID) {
				r.push(`When they tire, ${groomSlave.slaveName} rests ${his} head upon ${brideSlave.slaveName}'s lap and gently kisses ${his} lover's belly, knowing the child of their love is growing within.`);
			} else if (groomSlave.pregSource === brideSlave.ID) {
				r.push(`When they tire, ${brideSlave.slaveName} rests ${his2} head upon ${groomSlave.slaveName}'s lap and gently kisses ${his2} lover's belly, knowing the child of their love is growing within.`);
			}
			SimpleSexAct.Slaves(groomSlave, brideSlave);
			SimpleSexAct.Slaves(brideSlave, groomSlave);
			groomSlave.devotion += 4;
			brideSlave.devotion += 4;
			groomSlave.trust += 4;
			brideSlave.trust += 4;
			groomSlave.relationship = 5;
			brideSlave.relationship = 5;

			App.Events.refreshEventArt([groomSlave, brideSlave], "attractive lingerie");

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function no() {
			return `You decline gently, telling them that their relationship is acceptable to you as it is. They are disappointed, but not surprised, and accept your will without a murmur. They leave as they entered, holding hands.`;
		}
	}
};
