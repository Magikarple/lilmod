App.Events.SEAssholeKnight = class SEAssholeKnight extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() >= 15,
			() => V.arcologies[0].FSNeoImperialistLaw1 === 1,
			() => V.assholeKnight !== 1
		];
	}

	execute(node) {
		V.assholeKnight = 1;
		V.imperialEventWeek = App.Events.effectiveWeek();

		const assholeKnight = GenerateNewSlave(V.seeDicks > 0 ? "XY" : "XX", {minAge: 22, maxAge: 34, disableDisability: 1});
		assholeKnight.prestige = 1;
		assholeKnight.prestigeDesc = "$He was formerly an Imperial Knight, a highly prestigious position indicating both nobility and exceptional combat prowess. Although $he has had $his coat of arms stripped, many still recognize $him from his former Knighthood.";
		assholeKnight.origin = "$He used to be a Knight within your arcology, until you had $him stripped of $his title and summarily enslaved for cruelly abusing citizens beneath $his stature.";
		assholeKnight.career = "spec ops";
		assholeKnight.devotion = random(-80, -60);
		assholeKnight.muscles = random(50, 75);
		assholeKnight.skill.combat = 100;
		assholeKnight.sexualFlaw = "malicious";
		assholeKnight.behavioralQuirk = "none";
		assholeKnight.trust = random(-30, -20);
		assholeKnight.butt = random(0, 1);
		assholeKnight.natural.height = random(175, 195);
		assholeKnight.height = assholeKnight.natural.height;
		assholeKnight.fetish = "sadist";
		assholeKnight.fetishStrength = 80;
		assholeKnight.preg = 0;
		if (assholeKnight.genes === "XY") {
			assholeKnight.faceShape = "masculine";
			assholeKnight.dick = random(3, 5);
			assholeKnight.balls = random(2, 4);
			assholeKnight.scrotum = assholeKnight.balls;
			assholeKnight.boobs = 150;
		} else {
			assholeKnight.faceShape = "androgynous";
			assholeKnight.vagina = 0;
			assholeKnight.boobs = Math.min(assholeKnight.boobs, 450);
			assholeKnight.natural.boobs = assholeKnight.boobs;
		}
		assholeKnight.accent = random(0, 1);

		const {he, his, him, woman} = getPronouns(assholeKnight);

		App.Events.drawEventArt(node, assholeKnight, "Imperial Plate");

		App.Events.addParagraph(node, [`The group of citizens you hand-picked as your Knights have quickly proven themselves a reliable staple of the Arcology. Being visibly a league above the common citizen with their heavy Imperial Plate decorated with glimmering pendants and marks of their individual, flowery coats of arms, their mere presence is enough to make most common criminals cower and keep merchants selling their wares at fair prices. The tenets of neo-Imperial hierarchy and their own social prestige have already gone to their heads, and many Knights are now recognized immediately by the common citizens as heroic, uncowed citizen-soldiers.`]);

		App.Events.addParagraph(node, [`Despite the noble reputations of many of your Knights, their image as defenders of the downtrodden and honest protectors of the Arcology is not universal. Although you Knighted every last one of them yourself, it seems you might have made a misjudgment on the character of one of your new servants; a stream of minor offenses from one Knight in particular has been building up in your inbox for quite some time, and reviewing the whole dossier now paints a portrait of abuses and misconduct.`]);

		App.Events.addParagraph(node, [`This singular Knight has apparently been using ${his} position to extort and bully the populace, demanding unreasonably steep discounts from merchants and regularly beating the peasantry - often for no reason other than momentary amusement, and treating them as "less than even slaves". A number of frustrated citizens have sent you a petition demanding that you denounce and punish ${him} for ${his} petty offenses - a picture of a woman with her face blurred out and a trail of bruises over every inch of her naked body is attached. No names have been attached to the petition, apparently for fear of what the Knight in question will do to them should their attempts be uncovered. Whatever you decide to do with this ${woman} will undoubtedly set the precedent for how you deal with Knights who abuse their station in the future.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Remove ${his} title and confiscate ${his} weapons`, demTitles));
		choices.push(new App.Events.Result(`Have ${him} publicly flogged, then enslaved`, flogMeat));
		choices.push(new App.Events.Result(`Turn a blind eye`, blindInjustice));
		App.Events.addResponses(node, choices);

		function demTitles() {
			repX(2500, "event");
			return `You have the insolent Knight's plate armor confiscated, ${his} apartment seized and ${his} right to bear a coat of arms redacted. The knight is nothing short of utterly furious, but puts up no fight as your guards seize ${his} advanced weaponry; to do so would be suicidal. While ${he} swears revenge against you for taking away ${his} "noble rights", you receive a letter from a relieved merchant <span class="green">thanking you</span> for putting the jumped-up bandit down.`;
		}

		function flogMeat() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You have the insolent Knight's gear and weapons confiscated, then publicly flog ${him} in the plaza and announce that ${he}'s to be enslaved for crimes against the people of ${V.arcologies[0].name}. Although the watching peasants are clearly <span class="green">relieved</span> that the cruel bully is off the streets, some of them, those who did not feel the fist of the howling ${woman} on their own neck, <span class="red">recoil</span> somewhat at the sudden brutality against a class that most of them idolize and romanticize.`);
			repX(1000, "event");
			r.push(App.UI.newSlaveIntro(assholeKnight));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function blindInjustice() {
			cashX(500, "event");
			repX(-2000, "event");
			return `You opt to ignore the abuses of the cruel knight completely. Every few weeks, you receive another <span class="red">pleading</span> message in your inbox about the Knight, until they simply stop coming as the lower class accepts the random abuse of their betters. A few days later, as you socialize with your upper-class, the Knight in question passes you a <span class="green">full envelope</span> and winks with no further explanation.`;
		}
	}
};
