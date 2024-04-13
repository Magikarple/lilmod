App.Events.RESSFearfulBalls = class RESSFearfulBalls extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeExtreme === 1
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment !== Job.QUARTER,
				s => s.balls > 1,
				s => s.scrotum > 0,
				s => s.devotion <= 20,
				s => s.trust <= 20,
				s => s.rules.speech !== "restrictive",
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const hands = (hasBothArms(eventSlave)) ? `hands` : `hand`;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`is still having obedience problems, particularly with ${his} proper role as a`,
		);
		if (girl === "girl") {
			r.push(`female`);
		}
		r.push(`receptacle for cock. Though they're an almost too-obvious explanation, it's hard to avoid ${his} retention of ${his} gonads as a possible explanation for ${his} behavioral issues. They certainly contribute to ${his} less than perfectly feminine hormonal balance.`);
		r.toParagraph();

		r.push(`It's time for ${his} routine inspection, and ${he}'s standing before you, nude. ${He} certainly doesn't find ${his} sexually vulnerable position arousing; ${he}'s totally flaccid. The physical manifestations of ${his} disobedience are right in front of you, and quite defenseless.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Threaten ${him} with castration`, threaten),
			new App.Events.Result(`Force obedience using pain`, pain),
			new App.Events.Result(`Geld ${him} gradually`, geld),
		]);

		function threaten() {
			const r = new SpacedTextAccumulator();
			r.push(`You open a drawer of your desk and extract a razor-sharp ceramic-bladed knife.`);
			if (canSee(eventSlave)) {
				r.push(`You make a show of inspecting its edge and then place it on your desk before looking meaningfully at ${his} ballsack. ${He} watches this display with wide eyes`);
			} else {
				r.push(`You describe what it is you took out of your desk and how easily it could be used to remove ${his} ballsack. ${He} cocks ${his} head slightly`);
			}
			r.push(`until ${he} gets your meaning, and then collapses to the ground, almost wetting ${himself}.`);
			if (!canTalk(eventSlave)) {
				r.push(`${He} frantically uses ${his} ${hands} to promise you perfect obedience if you'll only spare ${him} from emasculation.`);
			} else {
				r.push(`${He} begs through tears, "Please no,`);
				if (eventSlave.rudeTitle === 1) {
					r.push(PoliteRudeTitle(eventSlave));
				} else {
					r.push(Master);
				}
				r.addToLast(Spoken(eventSlave, `! Please let me keep them! Please!"`));
			}
			r.push(`You patiently inform ${him} that ${he} can — for now, and so long as ${he} is a good little ${girl}. ${He} flees from the room backwards, bowing, scraping, and profusely thanking you, repeating desperate <span class="trust dec">promises of good behavior.</span>`);
			eventSlave.trust -= 5;
			r.toParagraph();
			return r.container();
		}

		function pain() {
			const r = new SpacedTextAccumulator();
			r.push(`You shove ${his} unresisting`);
			if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				} else {
					r.push(`swollen`);
				}
			}
			r.push(`body over the couch and seize ${his} ballsack. When ${he} feels your tight grip ${he} spasms and tries to pull away reflexively, but goes limp when ${he} feels the agony of a warning squeeze. You fasten a tight rubber ring around the base of ${his} sack, leaving ${him} writhing on the couch in considerable discomfort. After letting ${him} wriggle for a while, you tell ${him} that ${he} can have it off when ${he} gets you off. ${He} scrabbles for your`);
			if (V.PC.dick === 0) {
				r.push(`pussy and desperately starts to perform cunnilingus; after a while you get bored and ride ${his} face. You finally climax`);
			} else {
				r.push(`dick and starts to desperately suck you off`);
				if (V.PC.vagina !== -1) {
					r.push(`and eat you out`);
				}
				r.push(`you let ${him} work for a while before getting bored and adding painful slaps to ${his} cheeks. You blow your load down ${his} throat`);
			}
			r.push(`and then stand,`);
			if (canSee(eventSlave)) {
				r.push(`brandishing the knife.`);
			} else {
				r.push(`swishing the knife through the air.`);
			}
			if (canSee(eventSlave)) {
				r.push(`${His} eyes are huge`);
			} else {
				r.push(`${He} grimaces`);
			}
			r.push(`with terror, but ${he} holds still. ${His} private parts have gone so numb that ${he} has to`);
			if (canSee(eventSlave)) {
				r.push(`look down`);
			} else {
				r.push(`run ${his} hand across ${his} scrotum`);
			}
			r.push(`in trepidation to verify that you cut the rubber, not ${him}. ${He} leaves with the pins and needles working their agonizing way back into ${him} along with the blood flow to ${his} balls, promising tearfully to <span class="trust dec">stay out of trouble.</span>`);
			eventSlave.trust -= 5;
			seX(eventSlave, "oral", V.PC, "penetrative");
			r.toParagraph();
			return r.container();
		}

		function geld() {
			const r = new SpacedTextAccumulator();
			r.push(`You shove ${his} unresisting`);
			if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				} else {
					r.push(`swollen`);
				}
			}
			r.push(`body over the couch and seize ${his} ballsack. When ${he} feels your tight grip ${he} spasms and tries to pull away reflexively, but goes limp when ${he} feels the agony of a warning squeeze. You fasten a tight rubber ring around the base of ${his} sack, leaving ${him} writhing on the couch in considerable discomfort. You add leather mittens to ${his} hands to stop ${him} from removing the rubber, and then observe that this is a method used to geld livestock. ${His} tearful begging goes on until you tire of it and put ${him} out. ${capFirstChar(V.assistant.name)} tracks ${his} agonized, weeping progress around the arcology for the many hours it takes the lack of blood flow to necessitate a trip to the remote surgery. When that time comes, you make ${him} beg you to remove ${his} balls for an hour straight before you do — and ${he}'s so desperate for relief from the pain that ${he} does it. The experience has left ${him} <span class="health dec">slightly injured,</span> <span class="orange">gelded,</span> <span class="flaw gain">thoroughly traumatized,</span> and <span class="trust dec">willing to do anything</span> to avoid any more pain.`);
			eventSlave.behavioralFlaw = "odd";
			eventSlave.trust -= 20;
			eventSlave.balls = 0;
			eventSlave.scrotum = 0;
			surgeryDamage(eventSlave, 10);
			r.toParagraph();
			return r.container();
		}
	}
};
