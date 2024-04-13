/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {HTMLElement}
 */
App.Interact.matchmaking = function(slave) {
	const node = document.createElement("div");
	let r = [];

	const {
		He,
		he, his, him, himself, girl
	} = getPronouns(slave);

	const desc = SlaveTitle(slave);

	App.UI.DOM.drawOneSlaveRight(node, slave);

	r.push(`You order`, App.UI.DOM.slaveDescriptionDialog(slave, slave.slaveName, {noArt: true}), `to come to your office. The`);
	if (slave.relationship === -2) {
		r.push(`worshipful`);
	} else {
		r.push(`slutty`);
	}
	r.push(`${desc} arrives promptly, greets you correctly, and waits`);
	if (slave.relationship === -2) {
		r.push(`adoringly for a command.`);
	} else {
		r.push(`eagerly for you to fuck ${him}.`);
	}
	r.push(`You consider the situation carefully.`);
	if (slave.relationship === -2) {
		r.push(`${He}'s emotionally bonded to you, and loves you with all ${his} heart. ${He} would probably do anything you command and love you all the more for it. If you were to decide that you were tired of ${his} adoration, you could probably set ${him} up with another similarly broken slave. If you ordered them to love each other like they love you, they'd obey.`);
	} else {
		r.push(`${He}'s an emotional slut, and worships you and values ${himself} primarily in terms of sex. ${He}'s such a perfect sex slave that ${he}'d probably fuck anyone or anything you told ${him} to, and love you all the more for giving ${him} the chance. If you were to decide that even a sex slave like ${him} needs a little more structure than constant omnisexual lust, you could probably set ${him} up with another universal slut.`);
	}
	r.push(`Their relationship would probably be somewhat artificial at first, and they'd have to struggle at it, but after a period of adjustment, you'd have two worshipful slaves again, except that they'd be together. It'd definitely help if they had compatible behavioral quirks and sexual fetishes.`);
	App.Events.addParagraph(node, r);
	r = [];

	const selections = App.UI.DOM.appendNewElement("div", node);
	selections.style.float = "inline-end";

	App.UI.DOM.appendNewElement("h2", selections, `Put ${him} with another worshipful ${(slave.relationship === -2) ? "emotionally bonded slave" : "emotional slut"}`);
	selections.append(App.UI.SlaveList.slaveSelectionList(
		s => s.devotion >= 100 && s.relationship === slave.relationship && s.ID !== slave.ID,
		App.UI.SlaveList.SlaveInteract.stdInteract,
		null,
		(s) => App.UI.DOM.link("Match them", () => {
			// subSlave
			s.relationship = 4;
			s.relationshipTarget = slave.ID;
			s.devotion -= 20;
			// slave
			slave.relationship = 4;
			slave.relationshipTarget = s.ID;
			slave.devotion -= 20;
			jQuery(node).empty().append(matchedScene());
		})
	));

	App.Events.addParagraph(node, r);
	return node;

	function matchedScene() {
		const frag = new DocumentFragment();
		const subSlave = getSlave(slave.relationshipTarget);
		const {
			he2, his2, him2, girl2
		} = getPronouns(subSlave).appendSuffix("2");
		App.Events.drawEventArt(node, [slave, subSlave]);

		r.push(`You decide to set ${slave.slaveName} up with ${subSlave.slaveName}. Telling the former to wait, you have the latter hurry up to your office. When the`);
		if (slave.relationship === -2) {
			r.push(`slaves are waiting adoringly`);
		} else {
			r.push(`sluts are waiting with barely concealed lust`);
		}
		r.push(`in front of your desk together, you inform them of your decision.`);
		if (slave.relationship === -2) {
			r.push(`You commend their love for you, and let them know that it's all right for it to continue, but command them to love each other, too. They look doubtful, but at your orders they obediently take each other by the hand, and share a kiss. It will do for now. You assign them to live together as much as possible for a few days, and inform them that you'll be limiting your personal contact with them during this period. They give you identical looks of horror, and fail to notice how much of a perfect couple they already are.`);
		} else {
			r.push(`You praise their total commitment to sexual slavery, and let them know they'll continue to be sex slaves, but tell them that it's time for them to settle down. They give you identical looks of horror, and fail to notice how much of a perfect couple they already are. Patiently, you explain that their sex lives will remain more or less unchanged; just because two slaves are together doesn't mean they can't and won't have sex with other people. They look doubtful, but cheer up when you inform them that they'll be spending a lot of alone time together for a few days.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Being ordered into a relationship would be difficult for anyone, but they're so obedient that <span class="lightgreen">they do their best and make it work.</span> You ensure that they do, and your determined efforts to do so <span class="mediumorchid">reduce their devotion to you,</span> though it's mostly by redirection towards each other. And in any case, they remain devoted enough, and will likely return to their earlier worshipfulness in a few weeks at most.`);
		let matched = 1;
		if (slave.fetish === Fetish.SUBMISSIVE && subSlave.fetish === "dom") {
			r.push(`${subSlave.slaveName} is a dom and ${slave.slaveName} is a sub. It's a match out of bad fiction.`);
		} else if (subSlave.fetish === Fetish.SUBMISSIVE && slave.fetish === "dom") {
			r.push(`${slave.slaveName} is a dom and ${subSlave.slaveName} is a sub. It's a match out of bad fiction.`);
		} else if (slave.fetish === "masochist" && subSlave.fetish === "sadist") {
			r.push(`${subSlave.slaveName} is a sadist and ${slave.slaveName} is a masochist. They're a perfect ouroboros of agony.`);
		} else if (subSlave.fetish === "masochist" && slave.fetish === "sadist") {
			r.push(`${slave.slaveName} is a sadist and ${subSlave.slaveName} is a masochist. They're a perfect ouroboros of agony.`);
		} else if (slave.fetish === "cumslut" && subSlave.balls > 0) {
			r.push(`${subSlave.slaveName} has balls and ${slave.slaveName} has the appetite to drain them of every drop of cum.`);
		} else if (subSlave.fetish === "cumslut" && slave.balls > 0) {
			r.push(`${slave.slaveName} has balls and ${subSlave.slaveName} has the appetite to drain them of every drop of cum.`);
		} else if (slave.fetish === "humiliation" && subSlave.fetish === "sadist") {
			r.push(`${slave.slaveName} loves to be humiliated, and ${subSlave.slaveName} can definitely get off on another ${girl}'s shame.`);
		} else if (subSlave.fetish === "humiliation" && slave.fetish === "sadist") {
			r.push(`${subSlave.slaveName} loves to be humiliated, and ${slave.slaveName} can definitely get off on another ${girl2}'s shame.`);
		} else if (slave.fetish === "buttslut" && subSlave.fetish === "dom") {
			r.push(`${subSlave.slaveName} likes fucking other girls, so once ${slave.slaveName} asks ${him2} to just do it to ${his} ass all the time, they're both happy.`);
		} else if (subSlave.fetish === "buttslut" && slave.fetish === "dom") {
			r.push(`${slave.slaveName} likes fucking other girls, so once ${subSlave.slaveName} asks ${him} to just do it to ${his2} ass all the time, they're both happy.`);
		} else if (slave.fetish === "boobs" && subSlave.boobs > 4000) {
			r.push(`${slave.slaveName} fetishizes breasts so much that ${he} thinks ${subSlave.slaveName}'s udders are two of the sexiest things ${he}'s ever seen.`);
		} else if (subSlave.fetish === "boobs" && slave.boobs > 4000) {
			r.push(`${subSlave.slaveName} fetishizes breasts so much that ${he2} thinks ${slave.slaveName}'s udders are two of the sexiest things ${he2}'s ever seen.`);
		} else if ((slave.fetish === "pregnancy" && subSlave.fetish === "pregnancy") && subSlave.bellyPreg >= 300000 && slave.bellyPreg >= 300000) {
			r.push(`${slave.slaveName} and ${subSlave.slaveName} are both enormously laden with children, much to their delight. They can't wait to explore each other's baby-filled middles.`);
		} else if ((slave.fetish === "pregnancy" && subSlave.fetish === "pregnancy") && subSlave.preg > subSlave.pregData.normalBirth/2 && slave.preg > slave.pregData.normalBirth/2) {
			r.push(`${slave.slaveName} and ${subSlave.slaveName} are both heavily pregnant, much to each other's delight.`);
		} else if ((subSlave.fetish === "pregnancy") && slave.bellyPreg >= 300000) {
			r.push(`${subSlave.slaveName} fetishizes pregnant bellies so much that ${he2} is awestruck by ${slave.slaveName}'s enormous, baby-filled middle.`);
		} else if ((slave.fetish === "pregnancy") && subSlave.bellyPreg >= 300000) {
			r.push(`${slave.slaveName} fetishizes pregnant bellies so much that ${he} is awestruck by ${subSlave.slaveName}'s enormous, baby-filled middle.`);
		} else if ((subSlave.fetish === "pregnancy") && slave.preg > slave.pregData.normalBirth/2) {
			r.push(`${subSlave.slaveName} fetishizes pregnant bellies so much that ${he2} thinks ${slave.slaveName}'s gravid middle is one of the sexiest things ${he2}'s ever seen.`);
		} else if ((slave.fetish === "pregnancy") && subSlave.preg > subSlave.pregData.normalBirth/2) {
			r.push(`${slave.slaveName} fetishizes pregnant bellies so much that ${he} thinks ${subSlave.slaveName}'s gravid middle is one of the sexiest things ${he}'s ever seen.`);
		} else if ((slave.fetish === "pregnancy" && subSlave.fetish === "pregnancy") && subSlave.bellyPreg >= 100 && slave.bellyPreg >= 100) {
			r.push(`${slave.slaveName} and ${subSlave.slaveName} are both pregnant and just beginning to show. They'll both be able to enjoy the other's swelling body.`);
		} else if (slave.fetish === "pregnancy" && canAchieveErection(subSlave)) {
			r.push(`${slave.slaveName} can indulge the fantasy that ${he}'s getting pregnant each and every time ${subSlave.slaveName} cums inside ${him}.`);
		} else if (subSlave.fetish === "pregnancy" && canAchieveErection(slave)) {
			r.push(`${subSlave.slaveName} can indulge the fantasy that ${he2}'s getting pregnant each and every time ${slave.slaveName} cums inside ${him2}.`);
		} else {
			matched = 0;
		}
		if (matched === 1) {
			r.push(`Their sexual compatibility is excellent, and they <span class="mediumaquamarine">trust you more</span> for matching them so perfectly.`);
			slave.trust += 10;
			subSlave.trust += 10;
		} else if (slave.fetish === subSlave.fetish) {
			r.push(`They're a couple of`);
			switch (slave.fetish) {
				case "submissive":
					r.push(`cringing submissives,`);
					break;
				case "cumslut":
					r.push(`hungry oral fiends,`);
					break;
				case "humiliation":
					r.push(`public sex aficionados,`);
					break;
				case "buttslut":
					r.push(`shameless anal whores,`);
					break;
				case "boobs":
					r.push(`breast obsessives,`);
					break;
				case "pregnancy":
					r.push(`breeding bitches,`);
					break;
				case "dom":
					r.push(`dominating spirits,`);
					break;
				case "sadist":
					r.push(`inveterate sadists,`);
					break;
				case "masochist":
					r.push(`pain sluts,`);
					break;
				default:
					r.push(`vanilla girls,`);
			}
			r.push(`and they bond over their shared sexual tastes, easing their acclimation to having another slave play a major role in their sex lives. They're almost as happy sharing stories about their past sexual exploits as they are actually having sex.`);
		} else {
			r.push(`Their fetishes aren't very compatible, and though as a couple of inventive nymphos they do their absolute best to fuck each other senseless, they <span class="gold">trust you a less</span> out of doubt in the sexual match.`);
			slave.trust -= 10;
			subSlave.trust -= 10;
		}
		if (slave.behavioralQuirk === subSlave.behavioralQuirk && slave.behavioralQuirk !== "none") {
			r.push(`They're both`);
			switch (slave.behavioralQuirk) {
				case "confident":
					r.push(`confident, and soon come to an understanding that they'll be able to`);
					if (slave.relationship === -2) {
						r.push(`serve you better together.`);
					} else {
						r.push(`fuck third parties better as a pair.`);
					}
					break;
				case "cutting":
					r.push(`witty, and each quickly discovers that their new partner can hold up their end of a battle of quips. Their loving snippiness develops rapidly, and it's pretty cute.`);
					break;
				case "funny":
					r.push(`a little weird. It takes a while for them to adjust to how funny their new partner is, but they learn to support each other soon enough.`);
					break;
				case "adores women":
					r.push(`pretty crazy about ladies. They're both slave girls themselves, which helps, and they've also got a never-ending parade of female bodies to discuss together.`);
					break;
				case "adores men":
					r.push(`guy crazy. They discuss nothing else together, and their discussions frequently turn into makeouts and then mutual masturbation.`);
					break;
				case "fitness":
					r.push(`fitness fanatics, and being together feels natural for them, since they've already worked out together often enough.`);
					break;
				case "insecure":
					r.push(`very insecure. Perhaps unsurprisingly, they soon grow to depend on each other, each relying on their partner to support their low self-esteem.`);
					break;
				case "sinful":
					if (!FutureSocieties.isActive('FSChattelReligionist')) {
						r.push(`eagerly sinful, and they grow close by opening up and sharing their fraught histories of faith with each other.`);
					} else {
						r.push(`fanatical about being slave acolytes of the new faith, and their partnership is strengthened by their belief that it's divinely ordained.`);
					}
					break;
				case "advocate":
					r.push(`advocates for slavery. Not only do they share this, but they believe that your orders are good for them, including your order that they be together.`);
			}
		} else {
			r.push(`They approach life as slaves differently, and it's <span class="gold">tough for them to reconcile their differences over their values.</span>`);
			slave.trust -= 10;
			subSlave.trust -= 10;
		}
		if (FutureSocieties.policyActive('FSEgyptianRevivalist', 'IncestPolicy') && areRelated(slave, subSlave)) {
			r.push(`They've been influenced by your arcology's constant efforts to normalize slave incest, and <span class="trust inc">trust</span> that their relationship will be strengthened by their close familial ties.`);
			slave.trust += 10;
			subSlave.trust += 10;
		}
		App.Events.addParagraph(frag, r);

		return frag;
	}
};
