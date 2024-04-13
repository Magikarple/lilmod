App.Events.PShootResult = class PShootResult extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return []; // always executes if queued
	}

	get eventName() {
		return "Shoot Result";
	}

	execute(node) {
		let r = [];
		const {hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
		r.push(`You are delivered to your host's arcology by hired VTOL limousine. His arcology is flared at the top, to allow a flat space occupied by a classic Georgian mansion surrounded by lawns. After a brief reception for the handful of well-heeled attendees, the host calls for your attention. "Ladies and gentlemen," he says, "I would like to celebrate here today the return of many things which should not have been allowed to lapse."`);
		App.Events.addParagraph(node, r);
		r =[];
		r.push(`He leads the party towards a broad lawn with a long table along one side, and indicates the handsome single-barrel shotguns lined up on the table. He continues, "In a few moments, some really choice livestock are going to be led up onto this lawn. They have been told that if they can run from one side to the other, they'll be freed." He winks. "Those guns are loaded with taser slugs, of course. Whatever you drop and fuck, you get to take home."`);
		App.Events.addParagraph(node, r);
		r =[];
		r.push(`The crowd of nude slaves led up to the lawn and chained to rings along one edge all have pale or light skin — the better to show impacts, perhaps. But besides that, they are extremely varied, and all physically extraordinary in some way. After you and your fellow partiers are ready, your host fires an old-fashioned revolver in the air and the chained slaves are all released at once. You could easily hit any of them, but you only have one shot.`);
		App.Events.addParagraph(node, r);
		IncreasePCSkills('warfare', 2);

		const responses = [];
		responses.push(new App.Events.Result(`Hit the muscular slave about to successfully cross the lawn`, muscle));
		if (V.minimumSlaveAge <= 8) {
			responses.push(new App.Events.Result(`Hit the young slave with the unnaturally wide hips struggling along`, wideHips));
		}
		responses.push(new App.Events.Result(`Hit the plush older slave lagging behind`, plush));

		if (V.seeDicks !== 0 || V.makeDicks !== 0) {
			responses.push(new App.Events.Result(`Hit the slave with the tits, pussy and impressive dick`, dick));
		}

		App.Events.addResponses(node, responses);

		function adjustSkin(slave) {
			switch (slave.race) {
				case "black":
					slave.origSkin = "light brown";
					break;
				case "white":
					slave.origSkin = either("pale", "very pale");
					break;
				case "latina":
				case "indo-aryan":
				case "malay":
				case "middle eastern":
				case "semitic":
					slave.origSkin = "light";
					break;
				case "pacific islander":
				case "amerindian":
					slave.origSkin = "light olive";
					break;
				case "asian":
					slave.origSkin = either("light", "fair", "pale", "very pale");
					break;
				case "southern european":
					slave.origSkin = either("light", "fair");
					break;
				default:
					slave.origSkin = "light";
			}
			applyGeneticColor(slave);
		}

		function muscle() {
			const el = new DocumentFragment();
			let r = [];
			const slave = GenerateNewSlave("XX", {
				disableDisability: 1, ageOverridesPedoMode: 1, minAge: 16, maxAge: 28
			});
			slave.origin = "You won $him at a shotgun match against other arcology owners.";
			adjustSkin(slave);
			slave.lips = random(5, 25);
			slave.anus = 1;
			slave.skill.vaginal = 15;
			slave.skill.oral = 15;
			slave.skill.anal = 15;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 0;
			actX(slave, "vaginal");
			slave.devotion = 25;
			slave.trust = 5;
			slave.oldDevotion = 25;
			slave.face = 0;
			slave.vagina = 1;
			slave.preg = -1;
			slave.muscles = 50;
			slave.weight = 0;
			setHealth(slave, 80, undefined, undefined, undefined, 0);
			slave.boobs = 400;
			slave.natural.boobs = slave.boobs;
			slave.butt = 2;
			slave.waist = 0;
			slave.fetish = "none";
			slave.behavioralFlaw = "arrogant";
			slave.sexualFlaw = "idealistic";
			App.Events.drawEventArt(node, slave);
			newSlave(slave);// skip New Slave Intro
			const {
				He,
				he, his, him, himself, girl
			} = getPronouns(slave);
			r.push(`You decide to stop the athletic slave ${girl} about to win ${his} freedom, and place your taser slug in ${his} muscular buttock. ${He} goes stiff and skids across the grass with a growl. Your taser slug is linked to ${V.assistant.name}, who hits ${him} again whenever ${he} tries to continue running. Fury glints from ${his} eyes, but ${he} apparently knows how to pick ${his} battles. By the time you approach ${him}, ${he}'s already bent over, presenting ${himself}, and from the oily sheen on ${his} privates, it looks like ${he} even managed to get some lube somewhere to make the experience a little easier. It is a strange thing, respecting a slave, but ${he} rises even higher in your estimation as you fuck ${him} on the grass. ${He} does ${his} best to please you, having clearly decided to do ${his} best given ${his} situation. ${He}'s sexually inexpert, but clearly smart enough to know when to submit.`);

			App.Events.addParagraph(node, r);
			return el;
		}
		function wideHips() {
			const el = new DocumentFragment();
			let r = [];
			const slave = GenerateNewSlave("XX", {
				disableDisability: 1, ageOverridesPedoMode: 1, minAge: 8, maxAge: 8
			});
			slave.origin = "You won $him at a shotgun match against other arcology owners.";
			adjustSkin(slave);
			slave.lips = random(5, 25);
			slave.anus = 0;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 0;
			actX(slave, "vaginal");
			slave.devotion = 25;
			slave.trust = 5;
			slave.oldDevotion = 25;
			slave.face = 25;
			slave.vagina = 1;
			slave.preg = 0;
			if (V.precociousPuberty === 1) {
				slave.pubertyXX = 1;
			}
			slave.muscles = 0;
			slave.weight = -10;
			slave.height = 135;
			setHealth(slave, 80, undefined, undefined, undefined, 0);
			slave.boobs = 200;
			slave.butt = 1;
			slave.waist = -50;
			slave.shoulders = -2;
			slave.hips = 3;
			slave.ovaries = 1;
			slave.hipsImplant = 1;
			slave.skill.anal = 0;
			slave.skill.oral = 0;
			slave.skill.vaginal = 0;
			slave.skill.penetrative = 0;
			slave.fetish = "pregnancy";
			slave.fetishStrength = 60;
			slave.behavioralFlaw = "anorexic";
			slave.sexualFlaw = "idealistic";
			newSlave(slave);// skip New Slave Intro
			App.Events.drawEventArt(node, slave);
			const {
				He,
				he, his, him, himself, girl, loli
			} = getPronouns(slave);
			r.push(`You decide to stop the wide-hipped ${loli} struggling to run, and easily place your taser slug in ${his} broad rear. ${He} goes stiff and falls flat on ${his} face. Your taser slug is linked to ${V.assistant.name}, but since the ${girl} can't manage to flip over, let alone stand, shocking ${him} more is unneeded. Fury glints from ${his} eyes, but ${he} fully realizes it's over for ${him}. By the time you approach ${him}, ${he}'s hoisted ${his} overly wide rear upwards, presenting ${himself}, moisture beginning to ooze from ${his} virgin cunt. It looks like ${he} was being groomed to be a breeding slave, and ${he} seems to understand ${his} role quite well, judging by the way ${he} rocks ${his} hips back and forth for you. You thoroughly enjoy ${his} gratifyingly tight pussy, which is so nice that you confine yourself entirely to it despite the appealing sight of ${his} virgin butthole.`);

			App.Events.addParagraph(node, r);
			return el;
		}

		function plush() {
			const el = new DocumentFragment();
			let r = [];
			const slave = GenerateNewSlave("XX", {
				disableDisability: 1, ageOverridesPedoMode: 1, minAge: 36, maxAge: 42
			});
			slave.origin = "You won $him at a shotgun match against other arcology owners.";
			adjustSkin(slave);
			slave.vagina = 1;
			slave.skill.vaginal = 15;
			slave.skill.oral = 15;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 0;
			actX(slave, "vaginal");
			slave.devotion = -60;
			slave.trust = -40;
			slave.oldDevotion = -60;
			slave.face = 15;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.anus = 0;
			slave.skill.anal = 0;
			slave.skill.penetrative = 0;
			slave.muscles = 20;
			slave.weight = 20;
			setHealth(slave, 30, undefined, undefined, undefined, 0);
			if (slave.lips < 10) {
				slave.lips += 10;
			}
			slave.boobs = 1000;
			slave.natural.boobs = slave.boobs;
			slave.butt = 6;
			slave.waist = -15;
			slave.fetish = "none";
			slave.behavioralFlaw = "bitchy";
			slave.sexualFlaw = "hates anal";
			App.Events.drawEventArt(node, slave);
			const {
				He,
				he, his, him
			} = getPronouns(slave);
			r.push(`You decide to drop the luscious specimen in the rear, and place your taser slug in ${his} huge buttock. ${He} goes stiff and slumps to the grass in defeat. Your taser slug is linked to ${V.assistant.name}, who hits ${him} again whenever ${he} tries to rise. Meanwhile, an athletic slave has successfully crossed the lawn, and is sobbing with joy as ${hisU} manumission forms are completed. Disbelief and anger fills your supine prize's eyes, and ${he}'s spitting with rage by the time you reach ${him}. It's a comical sight, since ${his} gyrations only serve to display ${his} magnificent breasts and broad butt. ${He} must have been recently enslaved, and is new enough to slavery that you are obliged to tase ${him} twice more before ${he} presents ${his} holes. The impression of newness to slavery despite ${his} age is reinforced by ${his} gratifyingly tight pussy, which is so nice that you confine yourself entirely to it despite the appealing sight of what is almost certainly a virgin butthole.`);
			newSlave(slave);// skip New Slave Intro

			App.Events.addParagraph(node, r);
			return el;
		}

		function dick() {
			const el = new DocumentFragment();
			let r = [];
			const slave = GenerateNewSlave("XY", {
				disableDisability: 1, ageOverridesPedoMode: 1, minAge: 18, maxAge: 24
			});
			slave.origin = "You won $him at a shotgun match against other arcology owners.";
			adjustSkin(slave);
			slave.skill.vaginal = 15;
			slave.skill.oral = 15;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 0;
			actX(slave, "anal");
			actX(slave, "vaginal");
			slave.devotion = 25;
			slave.trust = 5;
			slave.oldDevotion = 25;
			if (slave.foreskin > 0) {
				slave.foreskin = slave.dick;
			}
			if (slave.balls > 0) {
				slave.scrotum = slave.balls;
			}
			slave.vagina = 1;
			slave.ovaries = 0;
			slave.dick = 6;
			slave.balls = 3;
			slave.face = 0;
			slave.clit = 0;
			slave.preg = -2;
			slave.anus = 2;
			slave.skill.penetrative = 35;
			slave.skill.anal = 35;
			slave.muscles = 0;
			slave.weight = 0;
			setHealth(slave, 30, undefined, undefined, undefined, 0);
			if (slave.lips < 10) {
				slave.lips += 10;
			}
			slave.boobs = 800;
			slave.butt = 4;
			slave.waist = -15;
			slave.fetish = "none";
			slave.sexualFlaw = "none";
			slave.behavioralFlaw = "odd";
			App.Events.drawEventArt(node, slave);
			const {
				He,
				he, his, him
			} = getPronouns(slave);
			r.push(`You decide to drop the really rare specimen, and place your taser slug in ${his} leg. ${He} goes stiff and slumps to the grass, squealing with pain since the taser robbed ${his} ability to break ${his} fall, leading ${him} to land on nearly`);
			if (V.showInches === 2) {
				r.push(`a foot`);
			} else {
				r.push(`thirty centimeters`);
			}
			r.push(`of flaccid cock. Your taser slug is linked to ${V.assistant.name}, who hits ${him} again whenever ${he} tries to rise. Meanwhile, an athletic slave has successfully crossed the lawn, and is sobbing with joy as ${hisU} manumission forms are completed. Apathy fills your supine prize's eyes, and ${he} simply lies face-down and quiescent. ${He} obeys orders to roll over so you can see what you've gotten, however. ${He}'s clearly a work of long and careful hormonal treatment. ${He} has no implants, but sports big breasts, feminine hips, a nice butt, plush lips, and a huge dick. When you fuck ${his} pussy and then ${his} anus, ${he} even gets a massive erection, showing that ${he} isn't even on hormone treatment to maintain this unusual set of attributes.`);
			newSlave(slave);// skip New Slave Intro
			App.Events.addParagraph(node, r);
			return el;
		}
	}
};
