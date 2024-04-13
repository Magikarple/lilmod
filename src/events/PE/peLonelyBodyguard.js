App.Events.PELonelyBodyguard = class PELonelyBodyguard extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Bodyguard,
			() => S.Bodyguard.rules.relationship === "permissive",
			() => S.Bodyguard.relationship === 0,
			() => S.Bodyguard.fetish !== Fetish.MINDBROKEN,
		];
	}

	actorPrerequisites() {
		return [[
			s => s.ID !== V.BodyguardID,
			s => s.relationship === 0,
			s => s.devotion >= -20,
			s => V.seeIncest === 1 || !areRelated(s, S.Bodyguard)
		]];
	}

	execute(node) {
		let r = [];

		const BG = S.Bodyguard;
		const {
			He, His, Hers,
			he, his, him, himself, girl, wife, wives
		} = getPronouns(BG);
		const {say: say, title: Master} = getEnunciation(BG);

		const crush = getSlave(this.actors[0]);
		const {
			He2, His2,
			he2, him2, his2, wife2
		} = getPronouns(crush).appendSuffix("2");

		App.Events.drawEventArt(node, [BG, crush]);

		App.Events.addParagraph(node, [
			`You take an unusually close interest in`,
			App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(BG), `'s`),
			`health and mental well-being, since your health and mental well-being may rely on ${his} combat effectiveness. ${He} performs ${his} duties acceptably, difficult though they are. ${Hers} is a life of long hours and constant vigilance, and ${he} has very little time to ${himself}. The daily wear hasn't really affected ${him} yet, but it may.`
		]);

		r.push(`On a whim, you ask ${him} whether ${he} feels lonely. Caught off guard, ${he}`);
		if (!canTalk(BG)) {
			r.push(`says in hesitant gestures that ${he}'s all right, and that ${his} ${getWrittenTitle(BG)}'s companionship is enough for ${him}.`);
		} else {
			r.push(`${say}s hesitantly "I'm all right, ${Master}. I love being near you; that's enough for me."`);
		}
		r.push(`The slight hesitation is explained the next time`,
			App.UI.DOM.slaveDescriptionDialog(crush),
			`comes to your office. ${BG.slaveName} watches everyone who sees you, of course, but you catch ${his} eye running appreciatively up and down ${crush.slaveName}'s body as ${he2} leaves.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Make no mention of it`, no));
		choices.push(new App.Events.Result(`Set them up`, setUp));
		choices.push(new App.Events.Result(`Marry them`, marry));
		App.Events.addResponses(node, choices);

		function no() {
			return `${BG.slaveName} is a big ${girl} and can look after ${himself}, you reflect. You take no particular action to favor ${his} interest in ${crush.slaveName}.`;
		}

		function setUp() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You decide to amuse yourself by engaging in a game of subtle matchmaking. You carefully rearrange ${crush.slaveName}'s schedule and duties so ${he2} and ${BG.slaveName} spend as much time as possible with one another. At the same time, you gradually reduce ${crush.slaveName}'s access to sexual outlets. After letting the situation marinate for a few days, you decide that the time is ripe, and without any further explanation assign ${crush.slaveName} to spend the day in ${BG.slaveName}'s armory. It's barely midmorning before they're making out on ${BG.slaveName}'s workout mat, and by the afternoon ${crush.slaveName} is under ${BG.slaveName}'s workbench, orally servicing ${his2} new <span class="lightgreen">fuckbuddy</span> as ${he} maintains ${his} machine pistol.`);
			crush.relationship = 3;
			crush.relationshipTarget = BG.ID;
			BG.relationship = 3;
			BG.relationshipTarget = crush.ID;
			V.oralTotal += 1;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function marry() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You order ${crush.slaveName} in and brusquely inform ${him2} ${he2}'ll be marrying ${BG.slaveName}. ${crush.slaveName} is too surprised to react much, and even ${BG.slaveName} looks shocked, but there is a gleam of wild glee in ${his} eyes. You give them a few minutes to get dressed in special outfits you make available: they're lacy lingerie designed to resemble old world wedding dresses, but without concealing anything.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${BG.slaveName} is`);
			if (BG.vagina === 0) {
				r.push(`a virgin, so ${he}'s wearing white`);
			} else if (BG.vagina < 0 && BG.dick > 0) {
				r.push(`a sissy slave, so ${he}'s wearing light blue`);
			} else if (BG.vagina < 0 && BG.dick < 1) {
				r.push(`a null, so it's wearing black`);
			} else {
				r.push(`is an experienced sex slave, so ${he}'s wearing light pink`);
			}
			r.push(`against ${his} ${BG.skin} skin.`);
			if (canPenetrate(BG)) {
				r.push(`The sight of ${crush.slaveName} has ${him} stiffly erect, and ${he}'s wearing a little bow around ${his} cockhead.`);
			} else if (canAchieveErection(BG)) {
				r.push(`${He}'s wearing a little bow over ${his} caged girldick.`);
			} else if (BG.dick > 0) {
				r.push(`${He}'s impotent, but ${he}'s wearing a little bow around ${his} useless cockhead.`);
			} else if (BG.clit > 0) {
				r.push(`${His} prominent clit is engorged, and ${he}'s wearing a tiny bow on it.`);
			} else if (BG.vagina >= 0) {
				r.push(`${He}'s wearing a demure little bow just over ${his} pussy.`);
			}
			if (BG.anus > 1) {
				r.push(`${His} lacy panties are designed to spread ${his} buttocks a little and display ${his} big butthole.`);
			} else if (BG.anus === 0) {
				r.push(`${His} lacy panties cover ${his} virgin anus, for once.`);
			}
			if (BG.boobs > 1000) {
				r.push(`${His} bra makes no attempt to cover or even support ${his} huge breasts, simply letting them through holes in the lace to jut proudly out.`);
			} else if (BG.boobs > 500) {
				r.push(`${His} bra supports and presents ${his} big breasts, leaving ${his} stiffening nipples bare.`);
			} else {
				r.push(`${His} bra supports and presents ${his} breasts, giving ${him} more cleavage than ${he} usually displays.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${crush.slaveName} is`);
			if (crush.vagina === 0) {
				r.push(`a virgin, so ${he2}'s wearing white`);
			} else if (crush.vagina < 0 && crush.dick > 0) {
				r.push(`a sissy slave, so ${he2}'s wearing light blue`);
			} else if (crush.vagina < 0 && crush.dick < 1) {
				r.push(`a null, so it's wearing black`);
			} else {
				r.push(`is an experienced sex slave, so ${he2}'s wearing light pink`);
			}
			r.push(`against ${his2} ${crush.skin} skin.`);
			if (canPenetrate(crush)) {
				r.push(`The sight of ${BG.slaveName} has ${him2} stiffly erect, and ${he2}'s wearing a little bow around ${his2} cockhead.`);
			} else if (canAchieveErection(crush)) {
				r.push(`${He2}'s wearing a little bow over ${his2} caged girldick.`);
			} else if (crush.dick > 0) {
				r.push(`${He2}'s impotent, but ${he2}'s wearing a little bow around ${his2} useless cockhead.`);
			} else if (crush.clit > 0) {
				r.push(`${His2} prominent clit is engorged, and ${he2}'s wearing a tiny bow on it.`);
			} else if (crush.vagina >= 0) {
				r.push(`${He2}'s wearing a demure little bow just over ${his2} pussy.`);
			}
			if (crush.anus > 1) {
				r.push(`${His2} lacy panties are designed to spread ${his2} buttocks a little and display ${his2} big butthole.`);
			} else if (crush.anus === 0) {
				r.push(`${His2} lacy panties cover ${his2} virgin anus, for once.`);
			}
			if (crush.boobs > 1000) {
				r.push(`${His2} bra makes no attempt to cover or even support ${his2} huge breasts, simply letting them through holes in the lace to jut proudly out.`);
			} else if (crush.boobs > 500) {
				r.push(`${His2} bra supports and presents ${his2} big breasts, leaving ${his2} stiffening nipples bare.`);
			} else {
				r.push(`${His2} bra supports and presents ${his2} breasts, giving ${him2} more cleavage than ${he2} usually displays.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`The procedure is simple. The two of them prostrate themselves on the ground and beg your indulgence, though ${crush.slaveName} is running on pure autopilot by this point. You state that you grant it, and hand each of them a simple gold band to be worn on the little finger in advertisement of the inferiority of their union. In turn, each of them gives the other a ring, and ${BG.slaveName} kisses ${his} stunned bride. You pronounce them <span class="lightgreen">slave`);
			if (wife === wife2) {
				r.push(`${wives},</span>`);
			} else {
				r.push(`spouses,</span>`);
			}
			r.push(`and send them to the armory for their honeymoon. ${BG.slaveName} is so enthusiastic that in the coming days ${his} obvious devotion <span class="hotpink">wins ${crush.slaveName} over to the arrangement.</span>`);
			crush.devotion = Math.max(20, crush.devotion + 10); /* to accepting or better */
			crush.relationship = 5;
			crush.relationshipTarget = BG.ID;
			BG.relationship = 5;
			BG.relationshipTarget = crush.ID;
			V.oralTotal += 2;

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
